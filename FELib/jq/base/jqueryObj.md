# jQuery对象$

&emsp;&emsp;如果要比喻jQuery和原生javascript的关系，我个人认为是自动档和手动档汽车的区别。使用原生javascript，可以知道离合器以及档位的作用；而使用jQuery，则把离合器和手动档位封装到函数，直接前进、后退或驻车即可。所以，熟练使用原生javascript，再去使用jQuery是一个很自然的步骤。从本文开始，将陆续介绍jQuery的相关内容，并给出相关的原生javascript实现。接下来，将详细介绍jQuery对象$

&nbsp;

### $对象

&emsp;&emsp;说起jQuery，最明显的标志，毫无疑问，就是美元符号$，美元符号$其实是jquery的简写。而使用$()包装的对象就是jQuery对象

&emsp;&emsp;与jQuery对象相对应的就是DOM对象，DOM对象其实就是DOM元素节点对象

&emsp;&emsp;如果直接写document，则指的是document的DOM元素对象

<div>
<pre>document.onclick = function(){
    alert('dom');
}</pre>
</div>

&emsp;&emsp;而如果用$()包括起来，如$(document)，是jQuery(document)的简写形式，则指的是jQuery对象

<div>
<pre>&lt;script src="jquery-3.1.0.js"&gt;&lt;/script&gt;    
&lt;script&gt;
    console.log(jQuery(document));//[document]
    console.log($(document));//[document]
    console.log(document);//#document
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;注意：jQuery对象无法使用DOM对象的方法，DOM对象也无法使用jQuery对象的方法

<div>
<pre>&lt;script src="jquery-3.1.0.js"&gt;&lt;/script&gt;    
&lt;script&gt;
    //无反应
    $(document).onclick = function(){
        alert(0);
    };
    //Uncaught TypeError: document.click is not a function
    document.click(function(){
        alert(1);
    });
&lt;/script&gt;</pre>
</div>

&nbsp;

### 转换

【1】DOM转jQuery对象

&emsp;&emsp;对于一个jQuery对象，只需要用$()把DOM对象包装起来，就可以获得一个jQuery对象

【2】jQuery转DOM对象

&emsp;&emsp;jQuery是一个类数组对象，可以通过[index]或get(index)的方法得到相应的DOM对象

<div>
<pre>console.log(document === $(document)[0]);//true
console.log(document === $(document).get(0));//true</pre>
</div>

&nbsp;

### 共存

&emsp;&emsp;如果jQuery对象和DOM对象指向同一对象，绑定不同函数，则函数会按照顺序依次执行

<div>
<pre>//先弹出0，再弹出1
document.onclick = function(){
    alert(0);
}
$(document).click(function(){
    alert(1);
});</pre>
</div>

&nbsp;

### 不报错

&emsp;&emsp;如果使用DOM对象，为不存在的DOM对象设置样式会报错

<div>
<pre>//Uncaught TypeError: Cannot read property 'style' of null
document.getElementById('test').style.color = 'red';</pre>
</div>

&emsp;&emsp;而使用jQuery对象，为不存在的jQuery对象设置样式不会报错

<div>
<pre>$('#test').css('color','red');</pre>
</div>

&nbsp;

### 判断存在

&emsp;&emsp;一般地，DOM对象在使用之前需要判断存在，防止出错

<div>
<pre>if(document.getElementById('#test')){
    document.getElementById('#test').style.color = 'red';
}</pre>
</div>

&emsp;&emsp;对于jQuery对象来说，因为$()获取到的永远是对象，即使网页上没有该元素。所以不能采用下面方式判断

<div>
<pre>if($(#test)){
    //
}</pre>
</div>

&emsp;&emsp;应该根据获取到元素的长度来判断

<div>
<pre>if($(#test).length){
    //
}</pre>
</div>

&emsp;&emsp;或者转换成DOM对象来判断

<div>
<pre>if($(#test)[0]){
    //
}</pre>
</div>

&nbsp;

## 最后

&emsp;&emsp;最后要提一下jQuery的版本问题。jQuery从2.0版本开始不再支持IE8-浏览器，且去掉了一些过时的API，从而使体积更小，运行速率更高。所以，如果有兼容IE8-浏览器的需求，需要使用jQuery1.*版本