# 深入理解CSS六种颜色模式

&emsp;&emsp;赏心悦目的颜色搭配让人感到舒服，修改元素颜色的功能让人趋之若鹜。但颜色规划不当，会让网站用户无所适从。颜色从&lt;font color=""&gt;发展至今，保留了很多内容，也增加了新的内容，本文将介绍关于颜色模式的内容

![colorTable](https://pic.xiaohuochai.site/blog/CSS_render_colorTable.jpg)

&nbsp;

## 颜色模式

&emsp;&emsp;以前主要采用关键字、16进制和RGB这三种设置颜色的方式。CSS3出现后，增加了RGBA、HSL、HSLA这三种模式，极大地丰富了CSS颜色设置的方式

### 关键字

&emsp;&emsp;CSS颜色关键字包括命名颜色、transparent、currentColor属性值

**命名颜色**

&emsp;&emsp;直接使用的名字的颜色值称为命名颜色

&emsp;&emsp;CSS支持17种合法命名颜色(标准颜色):

<div>
<pre>aqua fuchsia lime olive red white black gray maroon orange silver yellow blue green navy purple teal</pre>
</div>

&emsp;&emsp;注意：浏览器支持140种颜色

**transparent**

&emsp;&emsp;color: transparent用来表示文本的颜色纯透明，可以近似认为是rgba(0,0,0,0)

&emsp;&emsp;注意：IE7-不支持color:transparent，但支持background-color: transparent和border-color: transparent

**currentColor**

&emsp;&emsp;currentColor顾名思义指当前颜色，准确来讲指当前的文字颜色

&emsp;&emsp;注意：IE8-不支持该属性值

<iframe style="width: 100%; height: 400px;" src="https://demo.xiaohuochai.site/css/colorMode/c1.html" frameborder="0" width="320" height="240"></iframe>

### 16进制

&emsp;&emsp;16进制是设置颜色值的常用方式，将三个介于00-FF的十六进制数连接起来，若16进制的3组数各自成对，则可简写为3位

<div>
<pre>#abcdef
#aabbcc &lt;=&gt; #abc</pre>
</div>

&lt;安全颜色&gt;

&emsp;&emsp;web安全颜色是指在256色计算机系统上总能避免抖动的颜色，表示为RGB值20%和51(相应的16进制值为33)的倍数。因此，采用16进制时，使用00\33\66\99\cc\ff认为是Web安全色，一共6*6*6=216种

<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/css/colorMode/c2.html" frameborder="0" width="320" height="240"></iframe>

### RGB模式

&emsp;&emsp;通过组合不同的红色、绿色、蓝色分量创造出的颜色成为RGB模式的颜色。显示器是由一个个像素构成，利用电子束来表现色彩。像素把光的三原色:红色(R)、绿色(G)、蓝色(B)组合起来。每像素包含8位元色彩的信息量，有0-255的256个单元，其中0是完全无光状态，255是最亮状态

![rgb](https://pic.xiaohuochai.site/blog/CSS_render_rgb.gif)

<div>
<pre>rgb(x%,y%,z%)
　　rgb(a,b,c)</pre>
</div>

&emsp;&emsp;注意：若数值小于最小值0,则默认调整为0;若数值大小最大值255,则默认调整为255

<iframe style="width: 100%; height: 250px;" src="https://demo.xiaohuochai.site/css/colorMode/c3.html" frameborder="0" width="320" height="240"></iframe>

### RGBA模式

&emsp;&emsp;rgba模式是在RGB基础上增加了alpha通道，用来设置颜色的透明度，其中这个通道值的范围是0-1。0代表完全透明，1代表完全不透明

&emsp;&emsp;注意：IE8-浏览器不支持

<div>
<pre>    rgba(r,g,b,a)</pre>
</div>

&lt;IE滤镜&gt;

&emsp;&emsp;IE8-浏览器对新增的颜色模式并不支持，需要使用gradient滤镜。gradient滤镜的前两位表示Alpha透明度值(00-ff)，其中00表示全透明，ff表示完全不透明。后六位代表的是RGB模式

&emsp;&emsp;如果使用#A6DADC并且透明度为0.6的透明色(0.6*255=153，转换成16进制是99)，用gradient滤镜表示为

<div>
<pre>filter:progid:DXImageTransform.Microsoft.gradient(enabled = 'true',startColorstr="#99A6DADC",endColorstr="#99A6DADC")</pre>
</div>

&emsp;&emsp;注意：IE滤镜只能兼容背景色，而不能兼容前景色

<iframe style="width: 100%; height: 260px;" src="https://demo.xiaohuochai.site/css/colorMode/c4.html" frameborder="0" width="320" height="240"></iframe>

### HSL模式

&emsp;&emsp;HSL模式是通过对色调(H)、饱和度(S)、亮度(L)三个颜色通道的变化以及它们相互的叠加得到各式各样的颜色。HSL标准几乎可以包括人类视力所能感知的所有颜色

&emsp;&emsp;注意：IE8-浏览器不支持

<div>
<pre>    hsl(h,s,l)</pre>
</div>

&emsp;&emsp;h:色调(hue)可以为任意整数。0(或360或-360)表示红色，60表示黄色，120表示绿色，180表示青色，240表示蓝色，300表示洋红(当h值大于360时，实际的值等于该值模360后的值)

&emsp;&emsp;s:饱和度(saturation)，就是指颜色的深浅度和鲜艳程度。取0-100%范围的值，其中0表示灰度(没有该颜色)，100%表示饱和度最高(颜色最鲜艳)

&emsp;&emsp;l:亮度(lightness)，取0-100%范围的值，其中0表示最暗(黑色)，100%表示最亮(白色)

![hsl1](https://pic.xiaohuochai.site/blog/CSS_render_hsl1.jpg)
![hsl2](https://pic.xiaohuochai.site/blog/CSS_render_hsl2.jpg)

<iframe style="width: 100%; height: 250px;" src="https://demo.xiaohuochai.site/css/colorMode/c5.html" frameborder="0" width="320" height="240"></iframe>

### HSLA模式

&emsp;&emsp;HSLA模式是HSL的扩展模式，在HSL的基础上增加一个透明通道alpha来设置透明度

&emsp;&emsp;注意：IE8-浏览器不支持

<div>
<pre>    hsla(&lt;length&gt;,&lt;percentage&gt;,&lt;percentage&gt;,&lt;opacity&gt;)</pre>
</div>

<iframe style="width: 100%; height: 260px;" src="https://demo.xiaohuochai.site/css/colorMode/c6.html" frameborder="0" width="320" height="240"></iframe>

