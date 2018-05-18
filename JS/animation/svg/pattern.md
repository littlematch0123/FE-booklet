# SVG图案

&emsp;&emsp;给SVG元素应用填充和描边，除了使用纯色和渐变外，还可以使用图案。本文将详细介绍SVG图案

 

&nbsp;

### 概述

&emsp;&emsp;`<pattern>`可以实现重复的效果，在canvas中被翻译为模式，而在SVG中被翻译为图案或笔刷

&emsp;&emsp;SVG图案一般用于SVG图形对象的填充fill或描边stroke。这个图形可以是一个SVG元素，也可以是位图图像，通过`<pattern>`元素在x轴或y轴方向以固定的间隔平铺。

&emsp;&emsp;在pattern元素内部可以包含任何之前包含过的其它基本形状，并且每个形状都可以使用任何样式样式化，包括渐变和半透明

&emsp;&emsp;可以在`<pattern>`元素内定义图案，然后通过id引用

&emsp;&emsp;下面是一个简单的示例

```
<svg height="70" version="1.1" xmlns="http://www.w3.org/2000/svg" >
  <defs>
      <pattern id="pattern1"width=0.2 height=0.2>
        <circle cx="2" cy="2" r="2" stroke="none" fill="#393" />
      </pattern>
  </defs>
  <rect id="rect1" x="10" y="10" width="50" height="50" stroke="#630" fill="url(#pattern1)"/>
</svg>
```


<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/pattern/p1.html" frameborder="0" width="230" height="240"></iframe>

&nbsp;

### 尺寸设置

&emsp;&emsp;从上面的例子中，可以看出width和height是必须的属性，用来表示每一个图案在图形中占据的比例。如上所示，width、height值为0.25，则占据25%的比例，则每行可以有5个图案，每列也可以有5个图案

&emsp;&emsp;如果设置width、height值为0.5，则每行每列都有2个图案

```
<svg height="70" version="1.1" xmlns="http://www.w3.org/2000/svg" >
  <defs>
      <pattern id="pattern1" width=0.5 height=0.5>
        <circle cx="2" cy="2" r="2" stroke="none" fill="#393" />
      </pattern>
  </defs>
  <rect id="rect1" x="10" y="10" width="50" height="50" stroke="#630" fill="url(#pattern1)"/>
</svg>
```
<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/pattern/p2.html" frameborder="0" width="230" height="240"></iframe>

【图案内的图形尺寸】

&emsp;&emsp;如果对图案内的图形尺寸进行设置，将会显示出不同的效果

```
<svg height="70" version="1.1" xmlns="http://www.w3.org/2000/svg" >
  <defs>
      <pattern id="pattern1" width=0.2 height=0.2>
        <circle cx="5" cy="5" r="5" stroke="none" fill="#393" />
      </pattern>
  </defs>
  <rect id="rect1" x="10" y="10" width="50" height="50" stroke="#630" fill="url(#pattern1)"/>
</svg>
```
&emsp;&emsp;下面例子中，则图案width、height值为0.2，即图形每行每列都包含5个图案。因此，每个图案的尺寸是10*10，而图案中的图形circle的半径为5，圆点为(5,5)，则正好可以放下一个圆

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/pattern/p3.html" frameborder="0" width="230" height="240"></iframe>

 

&nbsp;

### 坐标系统

&emsp;&emsp;patternUnits，定义pattern的坐标系统。它的可能值有两个，userSpaceOnUse和objectBoundingBox

&emsp;&emsp;userSpaceOnUse:x、y、width和height表示的值都是当前用户坐标系统的值。也就是说，这些值没有缩放，都是绝对值

&emsp;&emsp;objectBoundingBox（默认值）:x、y、width和height表示的值都是外框的坐标系统（包裹pattern的元素）。也就是说，图案的单位进行了一个缩放，比如：pattern中为1的值，会变成和包裹元素的外框的width和height一样的大小

&emsp;&emsp;与渐变不同，pattern有第二个属性patternContentUnits，它描述了pattern元素基于基本形状使用的单元系统。它的可能值也有两个，userSpaceOnUse(默认值)和objectBoundingBox

&emsp;&emsp;注意:patternContentUnits的默认值是userSpaceOnUse

&emsp;&emsp;下面是默认值的情况

```
<svg height="70" version="1.1" xmlns="http://www.w3.org/2000/svg" >
  <defs>
      <pattern id="pattern1" width=0.2 height=0.2 patternUnits="objectBoundingBox" patternContentUnits="userSpaceOnUse">
        <circle cx="5" cy="5" r="5" stroke="none" fill="#393" />
      </pattern>
  </defs>
  <rect id="rect1" x="10" y="10" width="50" height="50" stroke="#630" fill="url(#pattern1)"/>
</svg>
```
<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/pattern/p4.html" frameborder="0" width="230" height="240"></iframe>

&emsp;&emsp;如果使用patternUnits和patternContentUnits都使用objectBoundingBox，要保持原图案，则需要进行如下设置

```
<svg height="70" version="1.1" xmlns="http://www.w3.org/2000/svg" >
  <defs>
      <pattern id="pattern1" width=0.2 height=0.2 patternUnits="objectBoundingBox" patternContentUnits="objectBoundingBox">
        <circle cx="0.1" cy="0.1" r="0.1" stroke="none" fill="#393" />
      </pattern>
  </defs>
  <rect id="rect1" x="10" y="10" width="50" height="50" stroke="#630" fill="url(#pattern1)"/>
</svg>
```

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/pattern/p5.html" frameborder="0" width="230" height="240"></iframe>

&emsp;&emsp;如果使用patternUnits和patternContentUnits都使用userSpaceOnUse，要保持原图案，则需要进行如下设置

```
<svg height="70" version="1.1" xmlns="http://www.w3.org/2000/svg" >
  <defs>
      <pattern id="pattern1" width=10 height=10 patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
        <circle cx="5" cy="5" r="5" stroke="none" fill="#393" />
      </pattern>
  </defs>
  <rect id="rect1" x="10" y="10" width="50" height="50" stroke="#630" fill="url(#pattern1)"/>
</svg>
```
<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/pattern/p6.html" frameborder="0" width="230" height="240"></iframe>

&emsp;&emsp;如果使用patternUnits使用userSpaceOnUse，patternContentUnits使用objectBoundingBox，要保持原图案，则需要进行如下设置

```
<svg height="70" version="1.1" xmlns="http://www.w3.org/2000/svg" >
  <defs>
      <pattern id="pattern1" width=10 height=10 patternUnits="userSpaceOnUse" patternContentUnits="objectBoundingBox">
        <circle cx="0.1" cy="0.1" r="0.1" stroke="none" fill="#393" />
      </pattern>
  </defs>
  <rect id="rect1" x="10" y="10" width="50" height="50" stroke="#630" fill="url(#pattern1)"/>
</svg>
```

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/pattern/p7.html" frameborder="0" width="230" height="240"></iframe>
 

&nbsp;

### 位置设置

&emsp;&emsp;SVG图案使用x、y属性来进行位置设置。默认地，x、y属性为0，即图案从左上角开始绘制

```
<svg height="70" version="1.1" xmlns="http://www.w3.org/2000/svg" >
  <defs>
      <pattern id="pattern1" width=0.2 height=0.2 x=0 y=0  >
        <circle cx="5" cy="5" r="5" stroke="none" fill="#393" />
      </pattern>
  </defs>
  <rect id="rect1" x="10" y="10" width="50" height="50" stroke="#630" fill="url(#pattern1)"/>
</svg>
```
<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/pattern/p8.html" frameborder="0" width="230" height="240"></iframe>

&emsp;&emsp;改变x、y的值，如设置为0.1，则从圆心处开始绘制

```
<svg height="70" version="1.1" xmlns="http://www.w3.org/2000/svg" >
  <defs>
      <pattern id="pattern1" width=0.2 height=0.2 x=0.1 y=0.1  >
        <circle cx="5" cy="5" r="5" stroke="none" fill="#393" />
      </pattern>
  </defs>
  <rect id="rect1" x="10" y="10" width="50" height="50" stroke="#630" fill="url(#pattern1)"/>
</svg>
```
<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/pattern/p9.html" frameborder="0" width="230" height="240"></iframe>

&emsp;&emsp;如果使用userSpaceOnUse坐标系统，要保持原图案，则需要进行如下设置

```
<svg height="70" version="1.1" xmlns="http://www.w3.org/2000/svg" >
  <defs>
      <pattern id="pattern1" width=10 height=10 x=5 y=5  patternUnits="userSpaceOnUse" >
        <circle cx="5" cy="5" r="5" stroke="none" fill="#393" />
      </pattern>
  </defs>
  <rect id="rect1" x="10" y="10" width="50" height="50" stroke="#630" fill="url(#pattern1)"/>
</svg>
```
<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/pattern/p10.html" frameborder="0" width="230" height="240"></iframe>


 

&nbsp;

### 描边

&emsp;&emsp;当然了，图案pattern除了用于填充，还可以用于描边

```
<svg height="70" version="1.1" xmlns="http://www.w3.org/2000/svg" >
  <defs>
      <pattern id="pattern1" width=20 height=20  patternUnits="userSpaceOnUse" >
        <circle cx="5" cy="5" r="5" stroke="none" fill="#393" />
      </pattern>
  </defs>
  <rect id="rect1" x="10" y="10" width="50" height="50" stroke="url(#pattern1)" stroke-width="10"/>
</svg>
```
<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/pattern/p11.html" frameborder="0" width="230" height="240"></iframe>


&emsp;&emsp;如果图案pattern的宽高设置的恰当，则会出现在边界线的两侧

```
<svg height="70" version="1.1" xmlns="http://www.w3.org/2000/svg" >
  <defs>
      <pattern id="pattern1" width=10 height=10  patternUnits="userSpaceOnUse" >
        <circle cx="5" cy="5" r="5" stroke="none" fill="#393" />
      </pattern>
  </defs>
  <rect id="rect1" x="10" y="10" width="50" height="50" stroke="url(#pattern1)" stroke-width="10"/>
</svg>
```

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/pattern/p12.html" frameborder="0" width="230" height="240"></iframe>
 

&nbsp;

### 使用图片

&emsp;&emsp;上次所有的实例中，都是使用SVG图形来创建图案。下面将使用一个图像作为SVG图案，该图像宽为50px，高为50px，是两个绿色的正方形组成的棋盘图案

![](https://pic.xiaohuochai.site/blog/svg_pattern1.png)


&emsp;&emsp;这里使用了一个`<image>`元素，然后通过xlink:href属性引用图像

```
<svg height="70" version="1.1" xmlns="http://www.w3.org/2000/svg" >
  <defs>
      <pattern id="pattern1" width=0.2 height=0.2  >
        <image xlink:href="http://7xpdkf.com1.z0.glb.clouddn.com/runjs/img/wpid-pattern-50.png" width=10 height=10></image>
      </pattern>
  </defs>
  <rect id="rect1" x="0" y="0" width="50" height="50" fill="url(#pattern1)" />
</svg>
```
<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/pattern/p13.html" frameborder="0" width="230" height="240"></iframe>

 

&nbsp;

### 图案引用

&emsp;&emsp;使用xlink:href属性，可以在SVG文档中引用另一个图案

```
<svg height="70" version="1.1" xmlns="http://www.w3.org/2000/svg" >
  <defs>
      <pattern id="pattern1" width=0.2 height=0.2>
        <image xlink:href="http://7xpdkf.com1.z0.glb.clouddn.com/runjs/img/wpid-pattern-50.png" width=10 height=10></image>
      </pattern>
      <pattern id="pattern2" xlink:href="#pattern1" x=0.1>
      </pattern>      
  </defs>
  <rect id="rect1" x="0" y="0" width="50" height="50" fill="url(#pattern2)" />
</svg>
```
<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/pattern/p14.html" frameborder="0" width="230" height="240"></iframe>

&emsp;&emsp;可以通过在一个图案中的图形中引用另一个图案来实现图案嵌套的效果

```
<svg height="70" version="1.1" xmlns="http://www.w3.org/2000/svg" >
  <defs>
      <pattern id="pattern1" width=0.2 height=0.2>
        <image xlink:href="http://7xpdkf.com1.z0.glb.clouddn.com/runjs/img/wpid-pattern-50.png" width=2.5 height=2.5></image>
      </pattern>
      <pattern id="pattern2" width=0.2 height=0.2>
        <circle cx=5 cy=5 r=5 fill="url(#pattern1)"></circle>
      </pattern>      
  </defs>
  <rect id="rect1" x="0" y="0" width="50" height="50" fill="url(#pattern2)" />
</svg>
```
<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/pattern/p15.html" frameborder="0" width="230" height="240"></iframe>