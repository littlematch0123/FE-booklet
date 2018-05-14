# 深入理解CSS线性渐变linear-gradient

&emsp;&emsp;在CSS3出现之前，渐变效果只能通过图形软件设计图片来实现，可拓展性差，还影响性能。如今已经进入CSS3标准的渐变可以很轻松的完成渐变效果。渐变实际上分为线性渐变和径向渐变两种，本文介绍线性渐变。

&nbsp;

### 定义

&emsp;&emsp;渐变实际上是两种或多种颜色之间的平滑过渡。而线性渐变是多种颜色沿着一条直线(称为渐变线)过渡。渐变的实现由两部分组成：渐变线和色标。渐变线用来控制发生渐变的方向；色标包含一个颜色值和一个位置，用来控制渐变的颜色变化。浏览器从每个色标的颜色淡出到下一个，以创建平滑的渐变，通过确定多个色标可以制作多色渐变效果。

&emsp;&emsp;注意：safari4-5、IOS3.2-4.3、android2.1-3只支持线性渐变，且需要添加-webkit-；safari5.1-6、IOS5.1-6.1、android4-4.3支持线性和径向渐变，且需要添加-webkit-；IE10+及其他高版本浏览器支持标准写法

<div>
<pre>&lt;linear-gradient&gt; = linear-gradient([ [ &lt;angle&gt; | to &lt;side-or-corner&gt; ] ,]? &lt;color-stop&gt;[, &lt;color-stop&gt;]+)
&lt;side-or-corner&gt; = [left | right] || [top | bottom]</pre>
</div>

&nbsp;

### 渐变线

&emsp;&emsp;渐变线从渐变框中心向两个方向进行拓展，起点和终点是渐变线与经过渐变框的一个角的垂直线的相交点

![linearRradientPoint](https://pic.xiaohuochai.site/blog/CSS_render_linearRradientPoint.png)

&emsp;&emsp;渐变的第一个参数用于指定渐变线，默认是to bottom。有两种方式指定渐变线方向

【1】使用角度

&emsp;&emsp;0deg表示沿着元素的中心线由下向上的方向(类似于y轴)，且正角度表示顺时针旋转

&emsp;&emsp;注意：对于-webkit-旧版本浏览器，如windows系统下的safari浏览器来说，0deg表示沿着元素中心线从左向右的方向(类似于x轴)，且正角度表示逆时针旋转

&emsp;&emsp;所以-webkit-旧版本浏览器与标准浏览器的之间线性渐变的角度关系为

<div>
<pre>-webkit-浏览器 = 90deg - 标准浏览器</pre>
</div>
<div>
<pre>相当于
-webkit-linear-gradient(90deg,red,blue) = linear-gradient(0deg,red,blue)</pre>
</div>

&emsp;&emsp;注意：对于webkit内核的浏览器来说，使用javascript改变元素的样式。当带-webkit-的私有样式和不带-webkit-的标准样式同时存在的时候，并不一定是后面覆盖前面。所以如果两种写法产生的效果相同，但参数不同时，要使用浏览器识别来分别写不同的情况。

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/linearGradient/l2.html" frameborder="0" width="320" height="240"></iframe>

【2】使用关键字

<div>
<pre>to top -&gt; 0deg
to right -&gt; 90deg
to bottom -&gt; 180deg
to left -&gt; -90deg(或270deg)
to top left -&gt; -45deg(或315deg)
to top right -&gt; 45deg
to bottom left -&gt; -135deg(或225deg)
to bottom right -&gt; 135deg</pre>
</div>

&emsp;&emsp;注意：window系统的safari浏览器并不支持'to'加方向的关键字，如to left。它只支持方向关键字，如left。当然了left 和 to left 方向是正好相反的

<iframe style="width: 100%; height: 420px;" src="https://demo.xiaohuochai.site/css/linearGradient/l3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 色标

 &emsp;&emsp;浏览器对于色标并没有默认值，且必须设置至少两个色标。色标由颜色和位置组成。颜色使用任何一种颜色模式都可以，而位置可以使用百分比或数值。

&emsp;&emsp;注意：颜色的位置也可以设置负值

【1】必须是颜色在前，位置在后

<div>
<pre>//正确
background-image: linear-gradient(red 0%,blue 100%);
//错误
background-image: linear-gradient(0% red,100% blue);</pre>
</div>

【2】位置可以省略，浏览器默认会把第一个颜色的位置设置为0%，把最后一个颜色的位置设置为100%

<div>
<pre>background-image: linear-gradient(red 0%,blue 100%);
//等价于上一个
background-image: linear-gradient(red,blue);</pre>
</div>

【3】若渐变只有两种颜色，且第一个颜色的位置设置为n%，第二个颜色的位置设置为m%。则浏览器会将0%-n%的范围设置为第一个颜色的纯色，n%-m%的范围设置为第一个颜色到第二个颜色的过渡，m%-100%的范围设置为第二个颜色的纯色

<div>
<pre>background-image: linear-gradient(red 30%,blue 60%);
//等价于上一个
background-image: linear-gradient(red 0%,red 30%,blue 60%,blue 100%);</pre>
</div>

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/linearGradient/l4.html" frameborder="0" width="320" height="240"></iframe>

【4】若渐变颜色没有指定位置，则它们会均匀分布

<div>
<pre>background-image: linear-gradient(red,yellow,green,blue);</pre>
</div>

<iframe style="width: 100%; height: 220px;" src="https://demo.xiaohuochai.site/css/linearGradient/l5.html" frameborder="0" width="320" height="240"></iframe>

【5】若多色占据同一个位置，例a、b、c三色均占据n%这一位置，则0%-n%为前一种颜色与a颜色的颜色渐变；然后是n%-n%的a颜色与c颜色的颜色突变；n%-100%是c颜色与后一种颜色的颜色渐变。因此，中间的b是无用的

<div>
<pre>background-image: linear-gradient(red,yellow 50%,white 50%,black 50%,blue);
//等价于上一个
background-image: linear-gradient(red,yellow 50%,black 50%,blue);</pre>
</div>

<iframe style="width: 100%; height: 220px;" src="https://demo.xiaohuochai.site/css/linearGradient/l6.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 重复渐变

&emsp;&emsp;重复渐变可以实现线性渐变的重复效果，使色标在渐变线方向上无限重复，实现一些特殊的效果

&emsp;&emsp;注意：只有当首尾两颜色位置不在0%或100%时，重复渐变才生效

<div>
<pre>background-image: -webkit-repeating-linear-gradient(blue 20%,green 50%);
background-image: repeating-linear-gradient(blue 20%,green 50%);</pre>
</div>

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/linearGradient/l7.html" frameborder="0" width="320" height="240"></iframe>

**纸张效果**

&emsp;&emsp;使用重复渐变可以实现横线纸张效果

<div>
<pre>div{
    height: 200px;
    width:200px;
    font: 14px/20px '宋体';
    text-indent: 2em;
    background-image: -webkit-repeating-linear-gradient(#f9f9f9,#f9f9f9 9%,#ccc 10%);
    background-image: repeating-linear-gradient(#f9f9f9,#f9f9f9 9%,#ccc 10%);
}</pre>
</div>

<iframe style="width: 100%; height: 220px;" src="https://demo.xiaohuochai.site/css/linearGradient/l8.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 多背景

&emsp;&emsp;使用多背景属性，利用带有透明度的渐变颜色给图片添加渐变的透明效果

<div>
<pre>background: linear-gradient(rgba(255,255,255,0),rgba(255,255,255,0.8)),url('http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/img1.gif');</pre>
</div>

<iframe style="width: 100%; height: 220px;" src="https://demo.xiaohuochai.site/css/linearGradient/l9.html" frameborder="0" width="320" height="240"></iframe>

<div>
<pre>&lt;style&gt;
div{width: 200px;height: 200px;display: inline-block;}
.test1,.test2{background-image: linear-gradient(45deg,red 25%,transparent 25%),linear-gradient(-45deg,red 25%,transparent 25%),linear-gradient(45deg,transparent 75%,red 75%),linear-gradient(-45deg,transparent 75%,red 75%);}
.test2{
    background-size: 20% 20%;
}    
&lt;/style&gt;
&lt;div class="test1"&gt;&lt;/div&gt;    
&lt;div class="test2"&gt;&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 220px;" src="https://demo.xiaohuochai.site/css/linearGradient/l10.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 应用场景

&emsp;&emsp;在CSS样式中，渐变相当于背景图片，在理论上可在任何使用url()值的地方采用。比如最常见的background-image、list-style-image以及border-image。但目前为止，仅在背景图片中得到完美的支持

【1】background-image

<div>
<pre>background-image: -webkit-linear-gradient(pink,lightblue,lightgreen);
background-image: linear-gradient(pink,lightblue,lightgreen);</pre>
</div>

&emsp;&emsp;注意：渐变框的大小由[background-size](http://www.cnblogs.com/xiaohuochai/p/5221936.html#anchor8)决定，默认是padding box

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/linearGradient/l11.html" frameborder="0" width="320" height="240"></iframe>

【2】list-style-image

<div>
<pre>list-style-image: -webkit-linear-gradient(red,blue);
list-style-image: linear-gradient(red,blue);
font-size: 50px;</pre>
</div>

　　注意：渐变框的大小由font-size决定，默认是1em&nbsp;

　　注意：firefox不支持在list-style-image中设置

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/linearGradient/l12.html" frameborder="0" width="320" height="240"></iframe>

【3】border-image

<div>
<pre>-webkit-border-image:  -webkit-linear-gradient(black,green) 1/10px;    
border-image:  linear-gradient(black,green) 1/10px;</pre>
</div>

&emsp;&emsp;注意：渐变框的大小由borer-width决定，safari浏览器始终实现的都是带有fill参数的表现

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/linearGradient/l1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### IE兼容

&emsp;&emsp;IE9-浏览器并不支持该属性，但可以使用IE准专有的滤镜语法来实现兼容

<div>
<pre>filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr='#color', endColorstr='#color');</pre>
</div>
<div>
<pre>GradientType代表渐变线方向，0为垂直(默认)，1为水平
#color代表色标，格式是#aarrggbb，其中aa为透明度，rrggbb为rgb模式的颜色
startColorstr的默认值是#ff0000ff 
endColorstr的默认值是#ff000000</pre>
</div>

&emsp;&emsp;注意：由于IE滤镜只支持首尾两个位置，且方向只可以为垂直和水平，所以有很大的局限性

<div>
<pre>filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr='#ff0000ff', endColorstr='#ffff00ff');</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/linearGradient/l13.html" frameborder="0" width="320" height="240"></iframe>

