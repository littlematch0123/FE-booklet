# 深入理解DOM事件类型系列第六篇——加载事件

&emsp;&emsp;提到加载事件，可能想到了window.onload，但实际上，加载事件是一大类事件，本文将详细介绍加载事件

&nbsp;

### load

&emsp;&emsp;load事件是最常用的一个事件，当页面完全加载后(包括所有图像、javascript文件、CSS文件等外部资源)，就会触发window上的load事件

&emsp;&emsp;注意：IE8-浏览器不会为该事件设置srcElement属性，而其他浏览器的target属性指向document

<div>
<pre>window.onload = function(e){
    e = e || event;
    var target = e.target || e.srcElement;
    //IE8-浏览器返回null，其他浏览器返回document
    console.log(target);
}</pre>
</div>

&emsp;&emsp;load事件不仅发生在document对象，还发生在各种外部资源上面。浏览网页就是一个加载各种资源的过程，图像(image)、样式表(style sheet)、脚本(script)、视频(video)、音频(audio)、Ajax请求(XMLHttpRequest)等等。这些资源和document对象、window对象、XMLHttpRequestUpload对象，都会触发load事件

&emsp;&emsp;注意：如果页面从浏览器缓存加载，并不会触发load事件

&emsp;&emsp;[图像](http://www.cnblogs.com/xiaohuochai/p/5008341.html)和[框架iframe](http://www.cnblogs.com/xiaohuochai/p/5047343.html)也可以触发load事件

&emsp;&emsp;注意：要在指定图像的src属性之前先指定事件，图像是从设置src属性之后开始下载

<div>
<pre>var img = new Image();
img.onload = function(){
    document.body.appendChild(img);
}
img.src="http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/chunfen.jpg";</pre>
</div>
<div>
<pre>&lt;iframe id="test" src="http://cnblogs.com" frameborder="0"&gt;&lt;/iframe&gt;
&lt;script&gt;
test.onload = function(){
    console.log(666);
}
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;[script元素](http://www.cnblogs.com/xiaohuochai/p/6214015.html#anchor7)也可以触发load事件，以便开发人员确定动态加载的javascript文件是否加载完毕。与图像不同，只有在设置了script元素的src属性并将该元素添加到文档后，才会开始下载javascript文件。换句话说，指定src属性和指定事件处理程序的先后顺序不重要

&emsp;&emsp;注意：IE8-浏览器不支持该用法

<div>
<pre>var script = document.createElement('script');
script.onload = function(){
    console.log(666);
}
document.body.appendChild(script);
script.src="http://files.cnblogs.com/files/xiaohuochai/excanvas.js";</pre>
</div>

&emsp;&emsp;类似地，[link元素](http://www.cnblogs.com/xiaohuochai/p/6214015.html#anchor5)可以触发load事件，且无兼容性问题。与script类似，在未指定href属性并将link元素添加到文档之前也不会开始下载样式表

<div>
<pre>var link = document.createElement('link');
link.rel="stylesheet";
link.onload = function(){
    console.log(666);
}
document.getElementsByTagName('head')[0].appendChild(link);
link.href="http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/style.css";</pre>
</div>

&nbsp;

### error

&emsp;&emsp;load事件在加载成功时触发，而error事件与之正相反，在加载失败时触发。凡是可以触发load事件的元素，同样可以触发error事件

&emsp;&emsp;任何没有通过try-catch处理的错误都会触发window对象的error事件

&emsp;&emsp;error事件可以接收三个参数：错误消息、错误所在的URL和行号。多数情况下，只有错误消息有用，因为URL只是给出了文档的位置，而行号所指的代码行既可能出自嵌入的javascript代码，也可能出自外部的文件

&emsp;&emsp;要指定onerror事件处理程序，可以使用DOM0级技术，也可以使用DOM2级事件的标准格式

<div>
<pre>//DOM0级
window.onerror = function(message,url,line){
    alert(message);
}
//DOM2级
window.addEventListener("error",function(message,url,line){
    alert(message);
});</pre>
</div>

&emsp;&emsp;浏览器是否显示标准的错误消息，取决于onerror的返回值。如果返回值为false，则在控制台中显示错误消息；如果返回值为true，则不显示

<div>
<pre>//控制台显示错误消息
window.onerror = function(message,url,line){
    alert(message);
    return false;
}
a;
//控制台不显示错误消息
window.onerror = function(message,url,line){
    alert(message);
    return true;
}
a;</pre>
</div>

&emsp;&emsp;这个事件处理程序是避免浏览器报告错误的最后一道防线。理想情况下，只要可能就不应该使用它。只要能够适当地使用try-catch语句，就不会有错误交给浏览器，也就不会触发error事件

&emsp;&emsp;图像也支持error事件。只要图像的src特性中的URL不能返回可以被识别的图像格式，就会触发error事件。此时的error事件遵循DOM格式，会返回一个以图像为目标的event对象

&emsp;&emsp;发生error事件时，图像下载过程已经结束，也就是不能再重新下载了。但是，可以在error事件中，重新设置图像的src属性，指向备用图像的地址

<div>
<pre>var image = new Image();
document.body.appendChild(image);
image.onerror = function(e){
    image.src = 'smileBackup.gif';
}
image.src = 'smilex.gif';</pre>
</div>

&nbsp;

### abort

&emsp;&emsp;元素加载中止时，(如加载过程中按下ESC键，停止加载)，触发该事件，常用于图片加载

&emsp;&emsp;注意：只有IE浏览器支持

<div>
<pre>var image = new Image();
image.onabort = function(){
    console.log(111);
}
document.body.appendChild(image);
image.src = 'http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/chunfen.jpg';</pre>
</div>

&nbsp;

### unload

&emsp;&emsp;与load事件对应的是unload事件，该事件在文档被完全卸载后触发。刷新页面时，也会触发该事件

&emsp;&emsp;chrome/firefox/safari浏览器会阻止alert等[对话框](http://www.cnblogs.com/xiaohuochai/p/5780977.html)，IE浏览器会阻止console.log()等控制台显示

<div>
<pre>window.onunload = function(e){
    //chrome报错，firefox静默失败，IE弹出666
    alert(666);
}</pre>
</div>
<div>
<pre>window.onunload = function(e){
    //chrome和firefox控制台显示666，IE静默失败
    console.log(666);
}</pre>
</div>

&emsp;&emsp;在卸载页面的时候，会导致&ldquo;空事件处理程序&rdquo;的发生。&ldquo;空事件处理程序&rdquo;是指内存中存留的过时不用的事件处理程序，它们是造成Web应用程序内存与性能问题的主要原因。一般来说，最好的做法是在页面卸载之前，先通过onunload事件处理程序移除所有事件处理程序。因此，只要是通过onload事件处理程序添加的东西，最后都应该通过onunload事件处理程序将它们移除

&nbsp;

### beforeunload

&emsp;&emsp;beforeunload事件在关闭网页或刷新网页时触发。它一般地用来防止用户不小心关闭网页

&emsp;&emsp;如果要让beforeunload事件生效，必须满足以下两个条件之一：1、事件处理程序返回一个真值；2、事件对象event.returnValue返回一个真值。如果两个条件同时满足，则以第一个条件为准

&emsp;&emsp;chrome/safari/firefox在对话框中不显示指定文本，只显示默认文本。而IE浏览器会在对话框中显示返回值或returnValue值

<div>
<pre>window.onbeforeunload = function(e){
    e = e || event;
    //IE浏览器显示指定文本，其他浏览器显示默认文本
    e.returnValue = '要离开吗？';    
}</pre>
</div>

&nbsp;

### DOMContentLoaded

&emsp;&emsp;window的onload事件会在页面中的一切都加载完毕时触发，但这个过程可能会因为要加载的外部资源过多而颇费周折。而DOMContentLoaded事件则在形成完整的DOM树之后就会触发，而不理会图像、javascript文件、CSS文件或其他资源是否下载完毕。与load事件不同，DOMContentLoaded支持在页面下载的早期添加事件处理程序，这也就意味着用户能够尽早地与页面进行交互

&emsp;&emsp;注意：网页的javascript脚本是同步执行的，所以定义DOMContentLoaded事件的监听函数，应该放在所有脚本的最前面。否则脚本一旦发生堵塞，将推迟触发DOMContentLoaded事件

&emsp;&emsp;要处理DOMContentLoaded事件，可以为document或window添加相应的事件处理程序，尽管这个事件会冒泡到window，但它的目标实际上是document

&emsp;&emsp;注意：IE8-浏览器不支持该事件

<div>
<pre>window.addEventListener('DOMContentLoaded',function(e){
    console.log(1);
})</pre>
</div>

&emsp;&emsp;对于不支持该事件的浏览器如IE8-浏览器，可以在页面加载期间设置一个时间为0毫秒的超时调用，且必须作为页面的第一个超时调用

<div>
<pre>setTimeout(function(){
    console.log(1);    
},0)</pre>
</div>

&nbsp;

### readystatechange

&emsp;&emsp;readystatechange事件发生在Document对象和XMLHttpRequest对象，它们的readyState属性发生变化时触发

&emsp;&emsp;这个事件的目的是提供与文档或元素的加载状态有关的信息。支持readystatechange事件的每个对象都有一个readyState属性，可能包含下列5个值中的一个

<div>
<pre>uninitialized(未初始化)：对象存在但尚未初始化&emsp;
loading(正在加载)：对象正在加载数据
loaded(加载完毕)：对象加载数据完成
interactive(交互)：可以操作对象了，但还没有完全加载
complete(完成)：对象已经加载完毕</pre>
</div>

&emsp;&emsp;这些状态看起来很直观，但并非所有对象都会经历readyState的这几个阶段。换句话说，如果某个阶段不适用某个对象，则该对象完全可能跳过该阶段；并没有规定哪个阶段适用于哪个对象。显然，这意味着readystatechange事件经常会少于4次，而readyState属性的值也不总是连续的

&emsp;&emsp;对于document而言，值为"interactive"的readyState会在与DOMContentLoaded大致相同的时刻触发readystatechange事件。此时，DOM树已经加载完毕，可以安全地操作它了，因此就会进入交互(interactive)阶段。但与此同时，图像及其他外部文件不一定可用

<div>
<pre>//'interactive'  'complete'
document.onreadystatechange = function(e){
    if(document.readyState == 'uninitialized'){
        console.log('uninitialized');
    }
    if(document.readyState == 'loading'){
        console.log('loading');
    }
    if(document.readyState == 'loaded'){
        console.log('loaded');
    }
    if(document.readyState == 'interactive'){
        console.log('interactive');
    }
    if(document.readyState == 'complete'){
        console.log('complete');
    }    
}</pre>
</div>

&emsp;&emsp;在与load事件一起使用时，无法预测两个事件触发的先后顺序。在包含较多或较大的外部资源的页面中，会在load事件触发之前先进入交互阶段；而在包含较少或较小的外部资源的页面中，则很难说readystatechange事件会发生在load事件前面

&emsp;&emsp;让问题变得更复杂的是，交互阶段可能会早于也可能会晚于完成阶段出现，无法确保顺序。在包含较多外部资源的页面中，交互阶段更有可能早于完成阶段出现；而在页面中包含较少外部资源的情况下，完成阶段先于交互阶段出现的可能性更大。因此，为了尽可能抢到先机，有必要同时检测交互和完成阶段

<div>
<pre>document.onreadystatechange = function(){
    if(document.readyState == 'interactive' || document.readyState == 'complete'){
        console.log('loaded');
        document.onreadystatechange = null;
    }
}</pre>
</div>

&emsp;&emsp;对于上面的代码来说，当readystatechange事件触发时，会检测document.readyState的值，看当前是否已经进入交互阶段或完成阶段。如果是，则移除相应的事件处理程序以免在其他阶段再执行

&emsp;&emsp;另外，IE10-浏览器支持给script元素和link元素触发readystatechange事件，用来确定外部的javascript或css文件是否已经加载完成

<div>
<pre>var script  = document.createElement('script');
script.onreadystatechange = function(){
    if( script.readyState == 'loaded'  || script.readyState == 'complete'){
        console.log('loaded');
        script.onreadystatechange = null;
    }
}
script.src="js/digit.js";
document.body.appendChild(script);</pre>
</div>
<div>
<pre>var link  = document.createElement('link');
link.rel="stylesheet";
link.onreadystatechange = function(){
    if( link.readyState == 'loaded'  || link.readyState == 'complete'){
        console.log('loaded');
        link.onreadystatechange = null;
    }
}
link.href="test.css";
document.getElementsByTagName('body')[0].appendChild(link);</pre>
</div>
