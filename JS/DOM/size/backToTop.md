# 5种回到顶部的写法从实现到增强

&emsp;&emsp;本文先详细介绍回到顶部的5种写法，然后对其实现功能增加，最后得到最终实现

&nbsp;

### 写法

【1】锚点

&emsp;&emsp;使用锚点链接是一种简单的返回顶部的功能实现。该实现主要在页面顶部放置一个指定名称的锚点链接，然后在页面下方放置一个返回到该锚点的链接，用户点击该链接即可返回到该锚点所在的顶部位置

&emsp;&emsp;注意：关于锚点的详细信息[移步至此](http://www.cnblogs.com/xiaohuochai/p/5007282.html)

<div>
<pre>&lt;body style="height:2000px;"&gt;
    &lt;div id="topAnchor"&gt;&lt;/div&gt;
    &lt;a href="#topAnchor" style="position:fixed;right:0;bottom:0"&gt;回到顶部&lt;/a&gt;
&lt;/body&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/backToTop/b1.html" frameborder="0" width="320" height="240"></iframe>

【2】scrollTop

&emsp;&emsp;scrollTop属性表示被隐藏在内容区域上方的像素数。元素未滚动时，scrollTop的值为0，如果元素被垂直滚动了，scrollTop的值大于0，且表示元素上方不可见内容的像素宽度

&emsp;&emsp;由于scrollTop是可写的，可以利用scrollTop来实现回到顶部的功能

&emsp;&emsp;注意：关于页面的scrollTop的兼容问题详细内容[移步至此](http://www.cnblogs.com/xiaohuochai/p/5831640.html#anchor4)

<div>
<pre>&lt;body style="height:2000px;"&gt;
    &lt;button id="test" style="position:fixed;right:0;bottom:0"&gt;回到顶部&lt;/button&gt;
    &lt;script&gt;
        test.onclick = function(){
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
    &lt;/script&gt;
&lt;/body&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/backToTop/b2.html" frameborder="0" width="320" height="240"></iframe>

【3】scrollTo()

&emsp;&emsp;scrollTo(x,y)方法滚动当前window中显示的文档，让文档中由坐标x和y指定的点位于显示区域的左上角

&emsp;&emsp;设置scrollTo(0,0)可以实现回到顶部的效果

<div>
<pre>&lt;body style="height:2000px;"&gt;
    &lt;button id="test" style="position:fixed;right:0;bottom:0"&gt;回到顶部&lt;/button&gt;
    &lt;script&gt;
        test.onclick = function(){
            scrollTo(0,0);
        }
    &lt;/script&gt;
&lt;/body&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/backToTop/b3.html" frameborder="0" width="320" height="240"></iframe>

【4】scrollBy()

&emsp;&emsp;scrollBy(x,y)方法滚动当前window中显示的文档，x和y指定滚动的相对量

&emsp;&emsp;只要把当前页面的滚动长度作为参数，逆向滚动，则可以实现回到顶部的效果

<div>
<pre>&lt;body style="height:2000px;"&gt;
    &lt;button id="test" style="position:fixed;right:0;bottom:0"&gt;回到顶部&lt;/button&gt;
    &lt;script&gt;
        test.onclick = function(){
            var top = document.body.scrollTop || document.documentElement.scrollTop
            scrollBy(0,-top);
        }
    &lt;/script&gt;
&lt;/body&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/backToTop/b4.html" frameborder="0" width="320" height="240"></iframe>

【5】scrollIntoView()

&emsp;&emsp;Element.scrollIntoView方法滚动当前元素，进入浏览器的可见区域　

&emsp;&emsp;该方法可以接受一个布尔值作为参数。如果为true，表示元素的顶部与当前区域的可见部分的顶部对齐（前提是当前区域可滚动）；如果为false，表示元素的底部与当前区域的可见部分的尾部对齐（前提是当前区域可滚动）。如果没有提供该参数，默认为true

&emsp;&emsp;使用该方法的原理与使用锚点的原理类似，在页面最上方设置目标元素，当页面滚动时，目标元素被滚动到页面区域以外，点击回到顶部按钮，使目标元素重新回到原来位置，则达到预期效果

<div>
<pre>&lt;body style="height:2000px;"&gt;
    &lt;div id="target"&gt;&lt;/div&gt;
    &lt;button id="test" style="position:fixed;right:0;bottom:0"&gt;回到顶部&lt;/button&gt;
    &lt;script&gt;
        test.onclick = function(){
            target.scrollIntoView();
        }
    &lt;/script&gt;
&lt;/body&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/backToTop/b5.html" frameborder="0" width="320" height="240"></iframe>

### 增强

&emsp;&emsp;下面对回到顶部的功能进行增强

【1】显示增强

&emsp;&emsp;使用[CSS画图](http://www.cnblogs.com/xiaohuochai/p/5028101.html)，将&ldquo;回到顶部&rdquo;变成可视化的图形(如果兼容IE8-浏览器，则用图片代替)

&emsp;&emsp;使用CSS[伪元素](http://www.cnblogs.com/xiaohuochai/p/5021121.html)及[伪类](http://www.cnblogs.com/xiaohuochai/p/5518943.html)hover效果，当鼠标移动到该元素上时，显示回到顶部的文字，移出时不显示

<div>
<pre>&lt;style&gt;
.box{
    position:fixed;
    right:10px;
    bottom: 10px;
    height:30px;
    width: 50px;    
    text-align:center;
    padding-top:20px;    
    background-color: lightblue;
    border-radius: 20%;
    overflow: hidden;
}
.box:hover:before{
    top:50%
}
.box:hover .box-in{
    visibility: hidden;
}
.box:before{
    position: absolute;
    top: -50%;
    left: 50%;
    transform: translate(-50%,-50%);
    content:'回到顶部';
    width: 40px;
    color:peru;
    font-weight:bold;
}    
.box-in{
    visibility: visible;
    display:inline-block;
    height:20px;
    width: 20px;
    border: 3px solid black;
    border-color: white transparent transparent white;
    transform:rotate(45deg);
}
&lt;/style&gt;
&lt;body style="height:2000px;"&gt;
&lt;div id="box" class="box"&gt;
    &lt;div class="box-in"&gt;&lt;/div&gt;
&lt;/div&gt;    
&lt;/body&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/backToTop/b6.html" frameborder="0" width="320" height="240"></iframe>

【2】动画增强

&emsp;&emsp;为回到顶部增加动画效果，滚动条以一定的速度回滚到顶部

&emsp;&emsp;动画有两种：一种是CSS动画，需要有样式变化配合[transition](http://www.cnblogs.com/xiaohuochai/p/5347930.html)；一种是javascript动画，使用[定时器](http://www.cnblogs.com/xiaohuochai/p/5773183.html)来实现

&emsp;&emsp;在上面的5种实现中，scrollTop、scrollTo()和scrollBy()方法可以增加动画，且由于无样式变化，只能增加javascript动画

&emsp;&emsp;定时器又有[setInterval](http://www.cnblogs.com/xiaohuochai/p/5773183.html#anchor2)、[setTimeout](http://www.cnblogs.com/xiaohuochai/p/5773183.html#anchor1)和[requestAnimationFrame](http://www.cnblogs.com/xiaohuochai/p/5777186.html)这三种可以使用，下面使用性能最好的定时器requestAnimationFrame来实现

&emsp;&emsp;注意：IE9-浏览器不支持该方法，可以使用setTimeout来兼容

&emsp;&emsp;1、增加scrollTop的动画效果

&emsp;&emsp;使用定时器，将scrollTop的值每次减少50，直到减少到0，则动画完毕

<div>
<pre>&lt;script&gt;
var timer  = null;
box.onclick = function(){
    cancelAnimationFrame(timer);
    timer = requestAnimationFrame(function fn(){
        var oTop = document.body.scrollTop || document.documentElement.scrollTop;
        if(oTop &gt; 0){
            document.body.scrollTop = document.documentElement.scrollTop = oTop - 50;
            timer = requestAnimationFrame(fn);
        }else{
            cancelAnimationFrame(timer);
        }    
    });
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/js/backToTop/b7.html" frameborder="0" width="320" height="240"></iframe>

　【时间版运动】

&emsp;&emsp;但是，上面的代码有一个问题，就是当页面内容较多时，回到顶部的动画效果将持续很长时间。因此，使用[时间版的运动](http://www.cnblogs.com/xiaohuochai/p/7400210.html)更为合适，假设回到顶部的动画效果共运动500ms，则代码如下所示

<div>
<pre>&lt;body style="height: 2000px;"&gt;
&lt;button id="test" style="position:fixed;right:10px;bottom:10px;"&gt;回到顶部&lt;/button&gt;
&lt;script&gt;
var timer  = null;
test.onclick = function(){
    cancelAnimationFrame(timer);
    //获取当前毫秒数
    var startTime = +new Date();     
    //获取当前页面的滚动高度
    var b = document.body.scrollTop || document.documentElement.scrollTop;
    var d = 500;
    var c = b;
    timer = requestAnimationFrame(function func(){
        var t = d - Math.max(0,startTime - (+new Date()) + d);
        document.documentElement.scrollTop = document.body.scrollTop = t * (-c) / d + b;
        timer = requestAnimationFrame(func);
        if(t == d){
          cancelAnimationFrame(timer);
        }
    });
}
&lt;/script&gt;
&lt;/body&gt;</pre>
</div>

<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/js/backToTop/b8.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;2、增加scrollTo()动画效果

&emsp;&emsp;将scrollTo(x,y)中的y参数通过scrollTop值获取，每次减少50，直到减少到0，则动画完毕

<div>
<pre>&lt;script&gt;
var timer  = null;
box.onclick = function(){
    cancelAnimationFrame(timer);
    timer = requestAnimationFrame(function fn(){
        var oTop = document.body.scrollTop || document.documentElement.scrollTop;
        if(oTop &gt; 0){
            scrollTo(0,oTop-50);
            timer = requestAnimationFrame(fn);
        }else{
            cancelAnimationFrame(timer);
        }    
    });
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/js/backToTop/b9.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;3、增加scrollBy()动画效果

&emsp;&emsp;将scrollBy(x,y)中的y参数设置为-50，直到scrollTop为0，则回滚停止

<div>
<pre>&lt;script&gt;
var timer  = null;
box.onclick = function(){
    cancelAnimationFrame(timer);
    timer = requestAnimationFrame(function fn(){
        var oTop = document.body.scrollTop || document.documentElement.scrollTop;
        if(oTop &gt; 0){
            scrollBy(0,-50);
            timer = requestAnimationFrame(fn);
        }else{
            cancelAnimationFrame(timer);
        }    
    });
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/js/backToTop/b10.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 实现

&emsp;&emsp;由于scrollTop、scrollBy()和scrollTo()方法，都以scrollTop值是否减少为0作为动画停止的参照，且三个动画的原理和实现都基本相似，性能也相似。最终，以最常用的scrollTop属性实现动画增强效果

&emsp;&emsp;当然，如果觉得500ms的时间不合适，可以根据实际情况进行调整

<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;title&gt;Document&lt;/title&gt;
&lt;style&gt;
.box{
    position:fixed;
    right:10px;
    bottom: 10px;
    height:30px;
    width: 50px;    
    text-align:center;
    padding-top:20px;    
    background-color: lightblue;
    border-radius: 20%;
    overflow: hidden;
}
.box:hover:before{
    top:50%
}
.box:hover .box-in{
    visibility: hidden;
}
.box:before{
    position: absolute;
    top: -50%;
    left: 50%;
    transform: translate(-50%,-50%);
    content:'回到顶部';
    width: 40px;
    color:peru;
    font-weight:bold;
}    
.box-in{
    visibility: visible;
    display:inline-block;
    height:20px;
    width: 20px;
    border: 3px solid black;
    border-color: white transparent transparent white;
    transform:rotate(45deg);
}
&lt;/style&gt;
&lt;/head&gt;
&lt;body style="height:2000px;"&gt;
&lt;div id="box" class="box"&gt;
    &lt;div class="box-in"&gt;&lt;/div&gt;
&lt;/div&gt;    
&lt;script&gt;
var timer  = null;
box.onclick = function(){
    cancelAnimationFrame(timer);
    //获取当前毫秒数
    var startTime = +new Date();     
    //获取当前页面的滚动高度
    var b = document.body.scrollTop || document.documentElement.scrollTop;
    var d = 500;
    var c = b;
    timer = requestAnimationFrame(function func(){
        var t = d - Math.max(0,startTime - (+new Date()) + d);
        document.documentElement.scrollTop = document.body.scrollTop = t * (-c) / d + b;
        timer = requestAnimationFrame(func);
        if(t == d){
          cancelAnimationFrame(timer);
        }
    });
}
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>

<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/js/backToTop/b11.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;欢迎交流
