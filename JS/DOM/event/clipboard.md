# 深入理解DOM事件类型系列第四篇——剪贴板事件

&emsp;&emsp;剪贴板操作看起来不起眼，但却十分有用，可以增强用户体验，方便用户操作。本文将详细介绍剪贴板事件

&nbsp;

### 定义

&emsp;&emsp;剪贴板操作包括剪切(cut)、复制(copy)和粘贴(paste)这三个操作，快捷键分别是ctrl+x、ctrl+c、ctrl+v。当然也可以使用鼠标右键菜单进行操作

&emsp;&emsp;关于这3个操作共对应下列6个剪贴板事件

&emsp;&emsp;copy：在发生复制操作时触发

&emsp;&emsp;cut：在发生剪切操作时触发

&emsp;&emsp;paste：在发生粘贴操作时触发

&emsp;&emsp;IE浏览器只有在文本中选定字符时，copy和cut事件才会发生。且在非文本框中(如div元素)只能发生copy事件

&emsp;&emsp;firfox浏览器只有焦点在文本框中才会发生paste事件

<div>
<pre>&lt;input value="text" id="test"&gt;
&lt;script&gt;
test.onpaste= test.oncopy = test.oncut = function(e){
    e = e || event;
    test.value = e.type;
    return false;
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/clipboard/c1.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;beforecopy：在发生复制操作前触发

&emsp;&emsp;beforecut：在发生剪切操作前触发

&emsp;&emsp;beforepaste：在发生粘贴操作前触发

<div>
<pre>&lt;input value="text" id="test"&gt;
&lt;script&gt;
test.onbeforepaste= test.onbeforecopy = test.onbeforecut = function(e){
    e = e || event;
    test.value = e.type;
    return false;
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/clipboard/c2.html" frameborder="0" width="320" height="240"></iframe>

### 对象方法

&emsp;&emsp;剪贴板中的数据存储在clipboardData对象中。对于IE浏览器来说，这个对象是window对象的属性；对于其他浏览器来说，这个对象是事件对象的属性

<div>
<pre>    e = e || event;
    var clipboardData = e.clipboardData || window.clipboardData;</pre>
</div>

&emsp;&emsp;这个对象有三个方法：getData()、setData()和clearData ()

**getData()**

&emsp;&emsp;getData()方法用于从剪贴板中取得数据，它接受一个参数，即要取得的数据的格式。在IE中，有两种数据格式："text" 和 "URL"。在其他浏览器中，这个参数是一种MIME类型；不过，可以用"text"代表

&emsp;&emsp;注意：在IE浏览器中，cut和copy事件中的getData()方法始终返回null；而其他浏览器始终返回空字符串''。但如果和setDada()方法配合，就可以正常使用

<div>
<pre>&lt;input id="test" value="123"&gt;
&lt;script&gt;
test.onpaste=function(e){
    e = e || event;
    var clipboardData = e.clipboardData || window.clipboardData;
    test.value = '测试' + clipboardData.getData('text');
    return false;
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/clipboard/c3.html" frameborder="0" width="320" height="240"></iframe>

**setData()**

&emsp;&emsp;setData()方法的第一个参数也是数据类型，第二个参数是要放在剪贴板中的文本。对于第一个参数的规则与getData()相同

&emsp;&emsp;在IE浏览器中，该方法在成功将文本放到剪贴板中后，返回true，否则返回false；而其他浏览器中，该方法无返回值

&emsp;&emsp;注意：在paste事件中，只有IE浏览器可以正常使用setData()方法，chrome浏览器会静默失败，而firefox浏览器会报错

<div>
<pre>&lt;input id="test" value="123"&gt;
&lt;script&gt;
test.oncopy=function(e){
    e = e || event;
    var clipboardData = e.clipboardData || window.clipboardData;
    clipboardData.setData('text','测试');
    test.value = clipboardData.getData('text');
    return false;
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/clipboard/c4.html" frameborder="0" width="320" height="240"></iframe>

**clearData()**

&emsp;&emsp;clearData()方法用于从剪贴板中删除数据，它接受一个参数，即要取得的数据的格式。在IE中，有两种数据格式："text"和"URL"。在其他浏览器中，这个参数是一种MIME类型；不过，可以用"text"表示

&emsp;&emsp;在IE浏览器中，该方法在成功将文本放到剪贴板中后，返回true，否则返回false；而其他浏览器该方法的返回值为undefined

&emsp;&emsp;注意：在paste事件中，chrome浏览器和IE浏览器可以正常使用setData()方法，而firefox浏览器会报错

<div>
<pre>&lt;input id="test" value="123"&gt;
&lt;script&gt;
test.oncopy=function(e){
    e = e || event;
    var clipboardData = e.clipboardData || window.clipboardData;
    test.value = clipboardData.clearData('text');
    return false;
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/clipboard/c5.html" frameborder="0" width="320" height="240"></iframe>

### 应用

【1】屏蔽剪贴板

&emsp;&emsp;通过阻止默认行为来屏蔽剪贴板。对于一些受保护的文档来说是一种选择

<div>
<pre>&lt;input value="text"&gt;
&lt;button id="test"&gt;屏蔽剪贴板&lt;/button&gt;
&lt;script&gt;
test.onclick = function(){
    document.oncopy=document.oncut = document.onpaste = function(e){
        e = e || event;
        alert('该文档不允许复制剪贴操作，谢谢配合')
        return false;
    }    
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/clipboard/c6.html" frameborder="0" width="320" height="240"></iframe>【2】过滤字符

&emsp;&emsp;如果确保粘贴到文本框中的文本中包含某些字符，或者符合某种形式时，可以使用剪贴板事件。比如只允许粘贴数字

<div>
<pre>&lt;input id="test"&gt;
&lt;script&gt;
test.onpaste = function(e){
    e = e || event;
    var clipboardData = e.clipboardData || window.clipboardData;
    if(!/^\d+$/.test(clipboardData.getData('text')))
        return false;
    }    
}
&lt;/script&gt;    </pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/clipboard/c7.html" frameborder="0" width="320" height="240"></iframe>

