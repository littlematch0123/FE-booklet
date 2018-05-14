# 深入理解CSS径向渐变radial-gradient

&emsp;&emsp;上篇介绍了[线性渐变](http://www.cnblogs.com/xiaohuochai/p/5370446.html)，本文接着介绍径向渐变的内容

&nbsp;

### 定义

&emsp;&emsp;径向渐变，实际上就是椭圆渐变，圆只是一种特殊的椭圆而已。径向渐变从圆心点以椭圆形状向外扩散，渐变的实现由两部分组成：椭圆和色标。椭圆部分用来控制径向渐变的位置、大小和形状等。而色标部分包含一个颜色值和一个位置，用来控制渐变的颜色变化

&emsp;&emsp;注意：safari4-5、IOS3.2-4.3、android2.1-3只支持线性渐变，且需要添加-webkit-；safari5.1-6、IOS5.1-6.1、android4-4.3支持线性和径向渐变，且需要添加-webkit-；IE10+及其他高版本浏览器支持标准写法

<div>
<pre>//标准写法
radial-gradient([[&lt;shape&gt;||&lt;size&gt;]?[at &lt;position&gt;,]?&lt;color-stop&gt;[,&lt;color-stop&gt;]+)
//-webkit-老版本径向渐变的写法
-webkit-radial-gradient([&lt;position&gt;||&lt;angle&gt;,]? [&lt;shape&gt;||&lt;size&gt;,]&gt;?&lt;color-stop&gt;[,&lt;color-stop&gt;]+)</pre>
</div>

&nbsp;

### 椭圆

&emsp;&emsp;径向渐变方式主要由&lt;position&gt;、&lt;shape&gt;、&lt;size&gt;这三个参数影响，分别控制椭圆的圆心、形状和大小

**position**

&emsp;&emsp;定义渐变的圆心，默认是center center

<div>
<pre>&lt;position&gt;: x轴 y轴</pre>
</div>
<div>
<pre>x轴:&lt;length&gt; | &lt;percentage&gt; | left | center | right
y轴:&lt;length&gt; | &lt;percentage&gt; | top | center | bottom</pre>
</div>

&emsp;&emsp;注意：和线性渐变类似，旧版本-webkit-内核浏览器并不支持at &lt;position&gt;的写法，只支持&lt;position&gt;的写法

【1】关键字

<div>
<pre>x轴
    left: 0% center: 50% right: 100%
y轴
    top: 0% center: 50% bottom: 100%</pre>
</div>

<iframe style="line-height: 1.5; width: 100%; height: 360px;" src="https://demo.xiaohuochai.site/css/radialGradient/r1.html" frameborder="0" width="320" height="240"></iframe>

【2】数值

&emsp;&emsp;x轴数值表示在x轴上离0点(渐变框左上角)的偏移量；y轴数值表示在y轴上离0点的偏移量

<iframe style="width: 100%; height: 320px;" src="https://demo.xiaohuochai.site/css/radialGradient/r2.html" frameborder="0" width="320" height="240"></iframe>

【3】百分比

&emsp;&emsp;其中x轴的百分比相对于渐变框的宽度，而y轴的百分比相对于渐变框的高度。渐变框的宽高由[background-size](http://www.cnblogs.com/xiaohuochai/p/5221936.html#anchor8)决定

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/radialGradient/r3.html" frameborder="0" width="320" height="240"></iframe>

【4】单个值

&emsp;&emsp;当只有一个值时，默认第二个值为center

<iframe style="width: 100%; height: 420px;" src="https://demo.xiaohuochai.site/css/radialGradient/r4.html" frameborder="0" width="320" height="240"></iframe>

**shape**

&emsp;&emsp;定义渐变的形状是圆circle或椭圆ellipse。默认是椭圆

<div>
<pre>&lt;shape&gt;: circle | ellipse</pre>
</div>

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/radialGradient/r5.html" frameborder="0" width="320" height="240"></iframe>

**size**

&emsp;&emsp;定义渐变的大小。默认是farthest-corner

【1】关键字

<div>
<pre>&lt;size&gt;: closest-side | closest-corner | farthest-side | farthest-corner</pre>
</div>
<div>
<pre>closest-side:半径为从圆心到最近边
closest-corner:半径为从圆心到最近角
farthest-side:半径为从圆心到最远边
farthest-side:半径为从圆心到最远角</pre>
</div>

//左上为最近角，右上为最近边；左下为最远角，右下为最远边

<table border="0">
<tbody>
<tr>
<td>
<img src="https://pic.xiaohuochai.site/blog/CSS_render_corner1.jpg" alt="corner1"></td>
<td>
<img src="https://pic.xiaohuochai.site/blog/CSS_render_corner2.jpg" alt="corner2"></td>
</tr>
<tr>
<td>
<img src="https://pic.xiaohuochai.site/blog/CSS_render_corner3.jpg" alt="corner3"></td>
<td>
<img src="https://pic.xiaohuochai.site/blog/CSS_render_corner4.jpg" alt="corner4"></td>
</tr>
</tbody>
</table>

<iframe style="width: 100%; height: 370px;" src="https://demo.xiaohuochai.site/css/radialGradient/r6.html" frameborder="0" width="320" height="240"></iframe>

【2】圆

&emsp;&emsp;如果&lt;shape&gt;是circle，则&lt;size&gt;可以设置为&lt;length&gt;，表示直径，0%表示圆心，100%表示距离圆心为半径的点

&emsp;&emsp;注意：不能为负值也不可以设置百分比

&emsp;&emsp;注意：webkit内核浏览器支持使用CSS设置圆的&lt;length&gt;型的&lt;size&gt;，但并不支持javascript改变其值；对于safari浏览器来说，只有半径写在circle关键字前面才识别

//以下DEMO只有IE10+及firefox可以正常运行

<iframe style="width: 100%; height: 350px;" src="https://demo.xiaohuochai.site/css/radialGradient/r7.html" frameborder="0" width="320" height="240"></iframe>

【3】椭圆

&emsp;&emsp;如果&lt;shape&gt;是ellipse或不设置时，则&lt;size&gt;可以设置为&lt;length&gt;或&lt;percentage&gt;，第一个值表示水平直径，第二个值表示垂直直径。百分比相对于径向渐变容器的尺寸

&emsp;&emsp;注意：若只有一个值，则表示水平和垂直直径相同，因为圆是特殊的椭圆，所以一个值时不可以为百分比

&emsp;&emsp;注意：和圆类似，&lt;size&gt;值不能为负值，因为其表示的是直径

&emsp;&emsp;重要：由于webkit浏览器在使用circle或ellipse关键字时渲染不正常，所以若使用circle时，可以不写shape(默认为ellipse)，用水平和垂直直径相同的椭圆替代

<iframe style="width: 100%; height: 480px;" src="https://demo.xiaohuochai.site/css/radialGradient/r8.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 色标

&emsp;&emsp;与[线性渐变的色标](http://www.cnblogs.com/xiaohuochai/p/5370446.html#anchor3)相同的部分不再重复，这里只说明不同的部分。由于位置处于100%的色标有时并不会占满渐变区域，则浏览器会默认使用最后一个色标的颜色铺满渐变区域

<div>
<pre>&lt;color-stop&gt; = &lt;color&gt; [ &lt;percentage&gt; | &lt;length&gt; ]?</pre>
</div>

<iframe style="width: 100%; height: 570px;" src="https://demo.xiaohuochai.site/css/radialGradient/r9.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 重复渐变

&emsp;&emsp;重复渐变可以实现径向渐变的重复效果，使色标在椭圆方向上无限重复，实现一些特殊的效果

&emsp;&emsp;注意：只有当首尾两颜色位置不在0%或100%时，重复渐变才生效

<div>
<pre>background-image: -webkit-repeating-radial-gradient(blue 20%,green 50%);
background-image: repeating-radial-gradient(blue 20%,green 50%);</pre>
</div>

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/radialGradient/r10.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 其他

&emsp;&emsp;关于线性渐变的[多背景](http://www.cnblogs.com/xiaohuochai/p/5370446.html#anchor5)和[应用场景](http://www.cnblogs.com/xiaohuochai/p/5370446.html#anchor6)，径向渐变与之类似。但径向渐变无法实现IE兼容。

