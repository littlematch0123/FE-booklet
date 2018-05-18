# SVG裁切和蒙版

&emsp;&emsp;本文将详细介绍SVG裁切和蒙版

 

&nbsp;

### 裁剪

&emsp;&emsp;SVG中的`<clipPath>`的元素，专门用来定义剪裁路径。必须设置的属性是id属性，被引用时使用

&emsp;&emsp;下面是一个圆形
```
<svg height="70" version="1.1" xmlns="http://www.w3.org/2000/svg" >
  <circle cx="25" cy="25" r="25" fill="#34538b" />
</svg>
```
<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/clip/c1.html" frameborder="0" width="230" height="240"></iframe>

&emsp;&emsp;通过引用clipPath进行路径裁剪后，如下所示

```
<svg height="70" version="1.1" xmlns="http://www.w3.org/2000/svg" >
  <defs>
      <clipPath id="clipPath1">
        <rect x="0" y="0" width="20" height="20" />
      </clipPath>   
  </defs>
  <circle cx="25" cy="25" r="25" fill="#34538b" clip-path="url(#clipPath1)"/>
</svg>
```
<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/clip/c2.html" frameborder="0" width="230" height="240"></iframe>

&emsp;&emsp;当然了， `<clipPath>`元素里面除了rect元素, 还可以是circle、ellipse、line、polyline、polygon等等，甚至是text文本

```
<svg height="70" version="1.1" xmlns="http://www.w3.org/2000/svg" >
  <defs>
      <clipPath id="clipPath1">
        <text y="20" style="font-size: 12px;">小火柴的蓝色理想</text>
      </clipPath>   
  </defs>
  <rect x="0" y="0" width="100" height="30" fill="#cd0" clip-path="url(#clipPath1)"/>
</svg>
```
<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/clip/c3.html" frameborder="0" width="230" height="240"></iframe>

&nbsp;

### 遮罩

&emsp;&emsp;与裁剪`<clipPath>`元素相比，遮罩`<mask>`元素所包含的子元素无须只具有线条性质的元素，可以包含任何可视化元素，甚至是`<g>`元素。这些可视化的子元素都必须带上透明度的定义，因为`<mask>`元素是通过透明度来控制图像与背景的遮罩效果的

&emsp;&emsp;蒙版中黑色代表不可见（opacity: 0），白色代表可见（opacity: 100%）

&emsp;&emsp;下面来使用黑白蒙版来制作一轮弯月

&emsp;&emsp;首先制作黑白蒙版
```
<svg height="70" style="background:gray" version="1.1" xmlns="http://www.w3.org/2000/svg" >
  <circle cx="25" cy="25" r="25" fill="white"/>
  <circle cx="40" cy="15" r="25" fill="black"/>
</svg>
```
<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/clip/c4.html" frameborder="0" width="230" height="240"></iframe>


&emsp;&emsp;接下来，将上面的两个circle元素制作为蒙版，并应用在一个圆形上，制作出一轮弯月

```
<svg height="70" style="background:gray" version="1.1" xmlns="http://www.w3.org/2000/svg" >
  <mask id="moon-mask">
    <circle cx="25" cy="25" r="25" fill="white"/>
    <circle cx="40" cy="15" r="25" fill="black"/>    
  </mask>
  <circle cx="25" cy="25" r="25" fill="yellow" mask="url(#moon-mask)"/>
</svg>
```
<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/clip/c5.html" frameborder="0" width="230" height="240"></iframe>

&emsp;&emsp;那么黑白之间的灰色代表什么呢？从0%到100%是一个线性的变化，所以黑白中间的灰色会是半透明，而且不同灰度代表不同程度的半透明，越趋近白色可见度越高。在蒙版中的黑白渐变，应用到彩色图层上就会产生透明度的渐变

```
<svg height="70"  version="1.1" xmlns="http://www.w3.org/2000/svg" >
  <defs>
    <linearGradient id="Gradient1">
      <stop offset="0" stop-color="white"/>
      <stop offset="100%" stop-color="black"/>
    </linearGradient>
    <mask id="mask1">
      <rect x="0" y="0" width="100" height="50" fill="url(#Gradient1)"  />  
    </mask>       
  </defs>
  <rect x="0" y="0" width="100" height="50" fill="red" mask="url(#mask1)"/>
</svg>
```

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/clip/c6.html" frameborder="0" width="230" height="240"></iframe>

&emsp;&emsp;如果在当前矩形下，再叠加一个其他颜色的矩形，则会出现两种颜色渐变的效果

```
<svg height="70"  version="1.1" xmlns="http://www.w3.org/2000/svg" >
  <defs>
    <linearGradient id="Gradient1">
      <stop offset="0" stop-color="white"/>
      <stop offset="100%" stop-color="black"/>
    </linearGradient>
    <mask id="mask1">
      <rect x="0" y="0" width="100" height="50" fill="url(#Gradient1)"  />  
    </mask>       
  </defs>
  <rect x="0" y="0" width="100" height="50" fill="green"/>
  <rect x="0" y="0" width="100" height="50" fill="red" mask="url(#mask1)"/>
</svg>
```
&emsp;&emsp;注意:如果绿色的矩形放在红色矩形后面，则不会出现以下这种效果

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/clip/c7.html" frameborder="0" width="230" height="240"></iframe>