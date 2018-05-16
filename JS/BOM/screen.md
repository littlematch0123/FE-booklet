# BOM之screen对象

&emsp;&emsp;screen对象在javascript编程中，比较冷门，不太常用。screen对象用来表明客户端的能力，其中包括浏览器窗口外部的显示器的信息，如像素高度和宽度等。本文将详细介绍screen对象

&nbsp;

### 总括

&emsp;&emsp;每个浏览器中的screen对象都包含着各不相同的属性，其中chrome包含9个属性，firefox包含10个，IE8-浏览器包含14个，IE9+浏览器包含17个。下面将这17个属性概述如下

<div>
<pre>属性              说明

height            屏幕的像素高度
width             屏幕的像素宽度
availHeight       屏幕的像素高度减去系统部件高度之后的值(只读)
availWidth        屏幕的像素宽度减去系统部件宽度之后的值(只读)
left              当前屏幕距左边的像素距离[firefox返回0，chrome和IE不支持]
top               当前屏幕距上方的像素距离[firefox返回0，chrome和IE不支持]
availLeft         未被系统部件占用的最左侧的像素值(只读)[chrome和firefox返回0，IE不支持]
availTop          未被系统部件占用的最上方的像素值(只读)[chrome和firefox返回0，IE不支持]
bufferDepth       读、写用于呈现屏外位图的位数[IE返回0，chrome和firefox不支持]
colorDepth        用于表现颜色的位数(只读)[IE8-返回32，其他浏览器返回24]
pixelDepth        屏幕的位深(只读)[IE8-不支持，其他浏览器返回24]
deviceXDPI        屏幕实际的水平DPI(只读)[IE返回96，chrome和firefox不支持]
deviceYDPI        屏幕实际的垂直DPI(只读)[IE返回96，chrome和firefox不支持]
logicalXDPI       屏幕逻辑的水平DPI(只读)[IE返回96，chrome和firefox不支持]
logicalYDPI       屏幕逻辑的垂直DPI(只读)[IE返回96，chrome和firefox不支持]
updateInterval      读、写以毫秒表示的屏幕刷新时间间隔[IE返回0，chrome和firefox不支持]
fontSmoothingEnabled     是否启用了字体平滑(只读)[IE返回true，chrome和firefox不支持]</pre>
</div>

&nbsp;

### 常用

【availHeight】

&emsp;&emsp;屏幕的像素高度减去系统部件高度之后的值(只读)，代表屏幕可用高度，单位为像素

【availHeight】

&emsp;&emsp;屏幕的像素宽度减去系统部件宽度之后的值(只读)，代表屏幕可用宽度，单位为像素

<div>
<pre>console.log(screen.availHeight);//1040
console.log(screen.availWidth);//1920</pre>
</div>

【height】

&emsp;&emsp;屏幕的像素高度

【width】

&emsp;&emsp;屏幕的像素宽度

<div>
<pre>console.log(screen.width);//1920
console.log(screen.height);//1080</pre>
</div>

&emsp;&emsp;screen.height和screen.width两个属性，一般用来了解设备的分辨率。除非调整显示器的分辨率，否则这两个值可以看作常量，不会发生变化。显示器的分辨率与浏览器设置无关，缩放网页并不会改变分辨率

&emsp;&emsp;可以根据屏幕分辨率，将用户导向不同网页

<div>
<pre>if ((screen.width &lt;= 800) &amp;&amp; (screen.height &lt;= 600)) {
window.location.replace('small.html');
} else {
window.location.replace('wide.html');
}</pre>
</div>
