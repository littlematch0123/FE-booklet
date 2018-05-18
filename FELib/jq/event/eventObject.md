# jQuery事件对象

&emsp;&emsp;在触发DOM上的某个事件时，会产生一个[事件对象event](http://www.cnblogs.com/xiaohuochai/p/5862775.html)，这个对象中包含着所有与事件有关的信息。所有浏览器都支持event对象，但支持方式不同。jQuery在遵循W3C规范的情况下，对事件对象的常用属性进行了封装，使得事件处理在各个浏览器下都可以正常运行而不需要进行浏览器类型判断，本文将详细介绍jQuery事件对象

&nbsp;

### 获取

&emsp;&emsp;对于DOM事件对象来说，标准浏览器和IE8-浏览器的事件对象获取方式不一致。标准浏览器的事件对象是事件处理程序中的第一个参数，而IE8-浏览器的事件对象是直接使用event变量

&emsp;&emsp;jQuery采用了标准写法，并兼容低版本IE浏览器&nbsp;

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="box" style="height:30px;width:200px;background:pink;"&gt;&lt;/div&gt;
&lt;script&gt;
$('#box').click(function(event){
    $(this).html(event.type);
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/jquery/e/e1.html" frameborder="0" width="320" height="240"></iframe>

### 事件类型

&emsp;&emsp;事件有很多类型，事件对象中的type属性表示被触发的事件的类型

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="box" style="height:30px;width:200px;background:pink;"&gt;&lt;/div&gt;
&lt;script&gt;
$('#box').on('click mouseover mouseout',function(event){
    $(this).html(event.type);
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/jquery/e/e2.html" frameborder="0" width="320" height="240"></iframe>

### 事件目标

&emsp;&emsp;事件目标target属性返回事件当前所在的节点，即正在执行的监听函数所绑定的那个节点

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;ul id="box"&gt;
    &lt;li class="in"&gt;1&lt;/li&gt;
    &lt;li class="in"&gt;2&lt;/li&gt;
&lt;/ul&gt;    
&lt;script&gt;
$('#box').on('mousemove',function(event){
    $(event.target).css('background-color','lightblue');
})
$('#box').on('mouseout',function(event){
    $(event.target).css('background-color','transparent');
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/e/e3.html" frameborder="0" width="320" height="240"></iframe>

### 当前元素

&emsp;&emsp;currentTarget属性始终指向事件绑定的当前DOM元素，与this值始终相等

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;ul id="box"&gt;
    &lt;li class="in"&gt;1&lt;/li&gt;
    &lt;li class="in"&gt;2&lt;/li&gt;
&lt;/ul&gt;    
&lt;script&gt;
$('#box').on('mousemove',function(event){
    $(event.currentTarget).css('background-color','lightblue');
})
$('#box').on('mouseout',function(event){
    $(event.currentTarget).css('background-color','transparent');
})
&lt;/script&gt;    </pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/e/e4.html" frameborder="0" width="320" height="240"></iframe>

### 事件冒泡

&emsp;&emsp;[DOM事件流](http://www.cnblogs.com/xiaohuochai/p/5859476.html)分为三个阶段：事件捕获、处于目标和事件冒泡，由于IE8-浏览器不支持事件捕获。jQuery也不支持事件捕获

**stopPropagation()**

&emsp;&emsp;jQuery采用标准写法stopPropagation()来实现阻止事件冒泡

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn1"&gt;按钮&lt;/button&gt;
&lt;button id="btn2"&gt;阻止冒泡&lt;/button&gt;
&lt;script&gt;
$('#btn1').on('click',function(){
    alert(1);
});
$(document).on('click',function(){
    alert(0);
});
$('#btn2').on('click',function(event){
    event.stopPropagation();
    $('#btn1').on('click',function(event){
        event.stopPropagation();
    });
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/e/e5.html" frameborder="0" width="320" height="240"></iframe>

**isPropagationStopped()**

&emsp;&emsp;event.isPropagationStopped()方法用来检测事件对象中是否调用过event.stopPropagation()

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="box" style="height: 30px;background:lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#box').click(function(event){
   alert(event.isPropagationStopped());//false
   event.stopPropagation();
   alert(event.isPropagationStopped());//true
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/jquery/e/e6.html" frameborder="0" width="320" height="240"></iframe>

**stopImmediatePropagation()**

&emsp;&emsp;stopImmediatePropagation()方法不仅可以取消事件的进一步冒泡，而且可以阻止同一个事件的其他监听函数被调用

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn1"&gt;按钮一&lt;/button&gt;
&lt;button id="btn2"&gt;按钮二&lt;/button&gt;
&lt;script&gt;
$('#btn1').on('click',function(event){
    event.stopImmediatePropagation();
    alert(1);
});
$('#btn1').on('click',function(){
    alert(2);
});
$('#btn2').on('click',function(event){
    alert(1);
    event.stopPropagation();
});
$('#btn2').on('click',function(){
    alert(2);
});
$(document).on('click',function(){
    alert(0);
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/e/e7.html" frameborder="0" width="320" height="240"></iframe>

**isImmediatePropagationStopped()**

&emsp;&emsp;isImmediatePropagationStopped()方法用来检测事件对象中是否调用过stopImmediatePropagation()

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="box" style="height: 30px;background:lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#box').click(function(event){
   alert(event.isImmediatePropagationStopped());//false
   event.stopImmediatePropagation();
   alert(event.isImmediatePropagationStopped());//true
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/jquery/e/e8.html" frameborder="0" width="320" height="240"></iframe>

### 默认行为

&emsp;&emsp;jQuery使用event.preventDefault()方法来阻止默认行为

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="box" style="height: 30px;background:lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#box').contextmenu(function(event){
   event.preventDefault();
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/jquery/e/e9.html" frameborder="0" width="320" height="240"></iframe>

**isDefaultPrevented()**

&emsp;&emsp;event.isDefaultPrevented()方法可以用来检测当前事件是否阻止默认行为

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="box" style="height: 30px;background:lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#box').contextmenu(function(event){
   alert(event.isDefaultPrevented());//false
   event.preventDefault();
   alert(event.isDefaultPrevented());//true
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/jquery/e/e10.html" frameborder="0" width="320" height="240"></iframe>

### 命名空间

&emsp;&emsp;event.namespace属性返回事件的命名空间

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="box" style="height: 30px;background:lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#box').bind('test.abc',function(event){
  alert(event.namespace);//abc
});
$('#box').click(function(){
    $('#box').trigger('test.abc');
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/jquery/e/e11.html" frameborder="0" width="320" height="240"></iframe>

### 返回值

&emsp;&emsp;event.result是事件被触发的一个事件处理程序的最后返回值

&emsp;&emsp;注意：当使用return false时，既可以阻止冒泡，也可以阻止默认行为

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="box" style="height: 30px;background:lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#box').click(function(event){
  return 123;
});
$('#box').click(function(event){
    $('#box').html(event.result);
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/jquery/e/e12.html" frameborder="0" width="320" height="240"></iframe>

### 键值

&emsp;&emsp;鼠标事件中需要判断左键、右键还是滚轮。键盘事件中需要判断按下键盘的哪个按键

&emsp;&emsp;jQuery使用事件对象event.whitch属性来确定鼠标事件和键盘事件键值

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="box" style="height: 30px;width: 50px;background:lightblue"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#box').on('keydown mousedown',function(event){
  $(this).html(event.which);
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/jquery/e/e13.html" frameborder="0" width="320" height="240"></iframe>