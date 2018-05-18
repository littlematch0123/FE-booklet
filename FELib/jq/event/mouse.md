# jQuery鼠标事件

&emsp;&emsp;[鼠标事件](http://www.cnblogs.com/xiaohuochai/p/5867195.html)是DOM事件中最常用的事件，jQuery对鼠标事件进行了封装和扩展。本文将详细介绍jQuery鼠标事件

&nbsp;

### 类型

&emsp;&emsp;鼠标事件共10类，包括click、contextmenu、dblclick、mousedown、mouseup、mousemove、mouseover、mouseout、mouseenter和mouseleave

<div>
<pre>click         当用户按下并释放鼠标按键或其他方式&ldquo;激活&rdquo;元素时触发
contextmenu   可以取消的事件，当上下文菜单即将出现时触发。当前浏览器在鼠标右击时显示上下文菜单
dblclick      当用户双击鼠标时触发
mousedown     当用户按下鼠标按键时触发
mouseup       当用户释放鼠标按键时触发
mousemove     当用户移动鼠标时触发
mouseover     当鼠标进入元素时触发
mouseout      当鼠标离开元素时触发
mouseenter    类似mouseover，但不冒泡
mouseleave    类似mouseout，但不冒泡</pre>
</div>

&nbsp;

### 写法

&emsp;&emsp;以上10类鼠标事件，都有对应的写法。下面以click()事件为例，来说明鼠标事件的写法

【1】click(handler(eventObject))

&emsp;&emsp;click()事件是[bind()](http://www.cnblogs.com/xiaohuochai/p/5929283.html#anchor1)事件的简写形式，可以接受一个事件处理函数作为参数

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="box" style="height:30px;width:200px;border:1px solid black"&gt;&lt;/div&gt;
&lt;script&gt;
$('#box').click(function(){
    $(this).css('background','lightblue')
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/jquery/mouse/m1.html" frameborder="0" width="320" height="240"></iframe>

【2】click([eventData],handler(eventObject))

&emsp;&emsp;click()事件可以接受两个参数，第一个参数传递数据，第二个参数是处理函数

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="box" style="height:30px;width:200px;border:1px solid black"&gt;&lt;/div&gt;
&lt;script&gt;
$('#box').click(123,function(event){
    alert(event.data);
})
&lt;/script&gt;    </pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/jquery/mouse/m2.html" frameborder="0" width="320" height="240"></iframe>

【3】click()

&emsp;&emsp;click()事件不带参数时，变成click()方法，是[trigger](http://www.cnblogs.com/xiaohuochai/p/5929283.html#anchor2)('click')的简写形式

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn1"&gt;按钮一&lt;/button&gt;
&lt;button id="btn2"&gt;按钮二&lt;/button&gt;
&lt;script&gt;
$('#btn1').on('click',function(){
    alert(1);
});
$('#btn2').on('click',function(){
   $('#btn1').click();
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/mouse/m3.html" frameborder="0" width="320" height="240"></iframe>

### 合成事件

&emsp;&emsp;jQuery事件对鼠标事件进行了扩展，自定义了两个合成事件&mdash;&mdash;hover()和toggle()

&emsp;&emsp;注意：toggle()事件已经在jQuery1.8版本删除

**hover()**

&emsp;&emsp;hover(enter,leave)事件用于模拟光标悬停事件。鼠标移入时，触发第一个函数参数；鼠标移出时，触发第二个函数参数

&emsp;&emsp;hover()事件实际上是mouseenter事件和mouseleave事件的集合

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="box" style="height:30px;width:200px;border:1px solid black"&gt;&lt;/div&gt;
&lt;script&gt;
$('#box').on('mouseenter',function(event){
    $(this).css('background-color','lightblue');
})
$('#box').on('mouseleave',function(event){
    $(this).css('background-color','transparent');
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/jquery/mouse/m4.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;用hover()事件实现如下

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="box" style="height:30px;width:200px;border:1px solid black"&gt;&lt;/div&gt;
&lt;script&gt;
$('#box').hover(function(){
    $(this).css('background-color','lightblue');
},function(){
    $(this).css('background-color','transparent');
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/jquery/mouse/m5.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;当hover()事件只有一个参数时，该参数为mouseenter和mouseleave事件共同的函数

<div>
<pre>&lt;style&gt;
.active{background-color:lightblue;}
&lt;/style&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="box" style="height:30px;width:200px;border:1px solid black"&gt;&lt;/div&gt;
&lt;script&gt;
$('#box').hover(function(){
    $(this).toggleClass('active')
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/jquery/mouse/m6.html" frameborder="0" width="320" height="240"></iframe>

**toggle()[已删除]**

&emsp;&emsp;toggle()事件用于模拟鼠标连续单击事件。第1次单击，触发第1个函数参数；第2次单击，触发第2个函数函数；如果有更多函数，则依次触发，直到最后一个。随后的每次单击都重复对这几个函数轮番调用

&nbsp;

### 鼠标按键

&emsp;&emsp;事件对象event的which属性用于区分哪个键被按下，敲击鼠标左键which的值是1，敲击鼠标中键which的值是2，敲击鼠标右键which的值是3

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="box" style="height:30px;width:200px;border:1px solid black"&gt;&lt;/div&gt;
&lt;script&gt;
$('#box').mousedown(function(event){
    alert(event.which)
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/jquery/mouse/m7.html" frameborder="0" width="320" height="240"></iframe>

### 修改键

&emsp;&emsp;在按下鼠标时键盘上的某些键的状态可以影响到所要采取的操作，这些修改键就是Shift、Ctrl、Alt和Meta(在Windows键盘中是Windows键，在苹果机中是Cmd键)，它们经常被用来修改鼠标事件的行为

&emsp;&emsp;jQuery参照DOM规定了4个属性，表示这些修改键的状态：shiftKey、ctrlKey、altKey和metaKey。这些属性中包含的都是布尔值，如果相应的键被按下了，则值为true；否则值为false

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="box" style="height:30px;width:200px;border:1px solid black"&gt;&lt;/div&gt;
&lt;script&gt;
$('#box').click(function(event){
    $('#box').html();
    if(event.shiftKey){$('#box').html('shiftKey;') }
    if(event.ctrlKey){$('#box').html('ctrlKey;') }
    if(event.altKey){$('#box').html('altKey;') }
    if(event.metaKey){$('#box').html('metaKey;') }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/jquery/mouse/m8.html" frameborder="0" width="320" height="240"></iframe>

### 坐标位置

&emsp;&emsp;关于坐标位置，DOM事件对象提供了clientX/Y、pageX/Y、screenX/Y、x/y、offsetX/Y、layerX/Y这6对信息，但各浏览器实现情况差异很大

&emsp;&emsp;jQuery关于坐标位置，提供了clientX/Y、offsetX/Y、screenX/Y、pageX/Y这四对信息

**clientX/Y**

&emsp;&emsp;clientX/Y表示鼠标指针在可视区域中的水平和垂直坐标

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="box" style="height:30px;width:200px;border:1px solid black"&gt;&lt;/div&gt;
&lt;script&gt;
$('#box').mousemove(function(event){
    $('#box').html(function(index,oldHtml){
        return 'clientX:' + event.clientX +';clientY:'+event.clientY
    });
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/jquery/mouse/m9.html" frameborder="0" width="320" height="240"></iframe>

**offsetX/Y**

&emsp;&emsp;offsetX/Y表示相对于定位父级的水平和垂直坐标

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="box" style="height:30px;width:400px;border:1px solid black"&gt;&lt;/div&gt;
&lt;script&gt;
$('#box').mousemove(function(event){
    $('#box').html(function(index,oldHtml){
        return 'clientX:' + event.clientX +';clientY:'+event.clientY + 'offsetX:' + event.offsetX +';offsetY:'+event.offsetY
    });
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/jquery/mouse/m10.html" frameborder="0" width="320" height="240"></iframe>

**screenX/Y**

&emsp;&emsp;screenX/Y表示鼠标指针相对于屏幕的水平和垂直坐标

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="box" style="height:30px;width:400px;border:1px solid black"&gt;&lt;/div&gt;
&lt;script&gt;
$('#box').mousemove(function(event){
    $('#box').html(function(index,oldHtml){
        return 'clientX:' + event.clientX +';clientY:'+event.clientY + 'screenX:' + event.screenX +';screenY:'+event.screenY
    });
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/jquery/mouse/m11.html" frameborder="0" width="320" height="240"></iframe>

**pageX/Y**

&emsp;&emsp;pageX/Y表示相对于页面的水平和垂直坐标，它与clientX/clientY的区别是不随滚动条的位置变化

<div>
<pre>&lt;body style="height:2000px;"&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="box" style="height:100px;width:300px;background:pink;"&gt;&lt;/div&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
$('#box').mousemove(function(event){
    $('#result').html(function(index,oldHtml){
        return 'clientX:' + event.clientX +';clientY:'+event.clientY + 'pageX:' + event.pageX +';pageY:'+event.pageY
    });
})
&lt;/script&gt;
&lt;/body&gt; </pre>
</div>

<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/jquery/mouse/m12.html" frameborder="0" width="320" height="240"></iframe>