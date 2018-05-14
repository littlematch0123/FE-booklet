# animate.css的使用

&emsp;&emsp;[animate.css](https://daneden.me/animate/)是一个使用CSS3的[animation](http://www.cnblogs.com/xiaohuochai/p/5391663.html)制作的动画效果的CSS集合，里面预设了很多种常用的动画，且使用非常简单。本文将详细介绍animate.css的使用

&nbsp;

### 引入

&emsp;&emsp;animate.css的最新版本是3.5.2，引入animate.css很容易，有以下几种方法

&emsp;&emsp;1、从官网下载

&emsp;&emsp;[https://raw.github.com/daneden/animate.css/master/animate.css](https://raw.github.com/daneden/animate.css/master/animate.css)

&emsp;&emsp;2、通过npm安装

<div>
<pre>$ npm install animate.css</pre>
</div>

&emsp;&emsp;3、使用在线cdn

<div>
<pre>https://unpkg.com/animate.css@3.5.2/animate.min.css</pre>
</div>

&nbsp;

### 效果演示

&emsp;&emsp;animate.css的使用非常简单，因为它是把不同的动画绑定到了不同的类里，所以想要使用哪种动画，只需要把通用类animated和相应的类添加到元素上就行了

&emsp;&emsp;下面来详细介绍animate.css里面的类，主要包括Attention(晃动效果)、bounce(弹性缓冲效果)、fade(透明度变化效果)、flip(翻转效果)、rotate(旋转效果)、slide(滑动效果)、zoom(变焦效果)、special(特殊效果)这8类

【Attention(晃动效果)】

<div>
<pre>bounce
flash
pulse
rubberBand
shake
headShake
swing
tada
wobble
jello</pre>
</div>

&emsp;&emsp;以在div上使用bounce为例

<div>
<pre>&lt;div class="animated bounce"&gt;&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 400px;" src="https://demo.xiaohuochai.site/css/animate/a1.html" frameborder="0" width="320" height="240"></iframe>

【bounce(弹性缓冲效果)】

<div>
<pre>bounceIn
bounceInDown
bounceInLeft
bounceInRight
bounceInUp
bounceOut
bounceOutDown
bounceOutLeft
bounceOutRight
bounceOutUp</pre>
</div>

<iframe style="width: 100%; height: 400px;" src="https://demo.xiaohuochai.site/css/animate/a2.html" frameborder="0" width="320" height="240"></iframe>

【fade(透明度变化效果)】

<div>
<pre>fadeIn
fadeInDown
fadeInDownBig
fadeInLeft
fadeInLeftBig
fadeInRight
fadeInRightBig
fadeInUp
fadeInUpBig
fadeOut
fadeOutDown
fadeOutDownBig
fadeOutLeft
fadeOutLeftBig
fadeOutRight
fadeOutRightBig
fadeOutUp
fadeOutUpBig</pre>
</div>

<iframe style="width: 100%; height: 536px;" src="https://demo.xiaohuochai.site/css/animate/a3.html" frameborder="0" width="320" height="240"></iframe>

【flip(翻转效果)】

<div>
<pre>flip
flipInX
flipInY
flipOutX
flipOutY</pre>
</div>

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/animate/a4.html" frameborder="0" width="320" height="240"></iframe>

【rotate(旋转效果)】&nbsp;

<div>
<pre>rotateIn
rotateInDownLeft
rotateInDownRight
rotateInUpLeft
rotateInUpRight
rotateOut
rotateOutDownLeft
rotateOutDownRight
rotateOutUpLeft
rotateOutUpRight</pre>
</div>

<iframe style="width: 100%; height: 400px;" src="https://demo.xiaohuochai.site/css/animate/a5.html" frameborder="0" width="320" height="240"></iframe>

【slide(滑动效果)】&nbsp;

<div>
<pre>slideInDown
slideInLeft
slideInRight
slideInUp
slideOutDown
slideOutLeft
slideOutRight
slideOutUp</pre>
</div>

<iframe style="width: 100%; height: 320px;" src="https://demo.xiaohuochai.site/css/animate/a6.html" frameborder="0" width="320" height="240"></iframe>

【zoom(变焦效果)】

<div>
<pre>zoomIn
zoomInDown
zoomInLeft
zoomInRight
zoomInUp
zoomOut
zoomOutDown
zoomOutLeft
zoomOutRight
zoomOutUp</pre>
</div>

<iframe style="width: 100%; height: 400px;" src="https://demo.xiaohuochai.site/css/animate/a7.html" frameborder="0" width="320" height="240"></iframe>

【special(特殊效果)】&nbsp;

<div>
<pre>hinge
rollIn
rollOut
lightSpeedIn
lightSpeedOut</pre>
</div>

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/animate/a8.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 实际应用

&emsp;&emsp;在一般的使用中，直接在元素上添加animated和对应的类名即可

<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;title&gt;Document&lt;/title&gt;
&lt;link rel="stylesheet" href="https://unpkg.com/animate.css@3.5.2/animate.min.css"&gt;
&lt;style&gt;
.box{height: 100px;width: 100px;background-color: lightblue}
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div class="box animated flash"&gt;&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>

![animate](https://pic.xiaohuochai.site/blog/CSS_render_animate.gif)

&emsp;&emsp;通过给JS添加或删除class，可以实现动态效果

<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;title&gt;Document&lt;/title&gt;
&lt;link rel="stylesheet" href="https://unpkg.com/animate.css@3.5.2/animate.min.css"&gt;
&lt;style&gt;
.box{height: 100px;width: 100px;background-color: lightblue}
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;button id="btn1"&gt;添加&lt;/button&gt;
&lt;button id="btn2"&gt;移除&lt;/button&gt;
&lt;div id="box" class="box"&gt;&lt;/div&gt;
&lt;script&gt;
var oBtn1 = document.getElementById('btn1');
var oBtn2 = document.getElementById('btn2');
var oBox = document.getElementById('box');
oBtn1.onclick = function(){
  oBox.classList.add('animated');
  oBox.classList.add('flash');
}
oBtn2.onclick = function(){
  oBox.classList.remove('flash');
}
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/css/animate/a9.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;至于动画的配置参数，比如动画持续时间，动画的执行次数等等，可以在元素上自行定义，覆盖掉animate.css里面所定义的就行了&nbsp;

<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;title&gt;Document&lt;/title&gt;
&lt;link rel="stylesheet" href="https://unpkg.com/animate.css@3.5.2/animate.min.css"&gt;
&lt;style&gt;
.box{height: 100px;width: 100px;background-color: lightblue}
.infinite{animation-iteration-count:infinite;}
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;button id="btn1"&gt;添加循环的动画效果&lt;/button&gt;
&lt;button id="btn2"&gt;移除&lt;/button&gt;
&lt;div id="box" class="box"&gt;&lt;/div&gt;
&lt;script&gt;
var oBtn1 = document.getElementById('btn1');
var oBtn2 = document.getElementById('btn2');
var oBox = document.getElementById('box');
oBtn1.onclick = function(){
  oBox.classList.add('animated');
  oBox.classList.add('flash');
  oBox.classList.add('infinite');
}
oBtn2.onclick = function(){
  oBox.classList.remove('flash');
}
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/css/animate/a10.html" frameborder="0" width="320" height="240"></iframe>
