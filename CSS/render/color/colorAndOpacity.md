# 理解CSS前景色和透明度

&emsp;&emsp;颜色的出现让网页不再只是黑白，运用好颜色设计，能让网页增色不少。一个网页给人们留下的第一印象实际上就是它的整体颜色。关于如何设置颜色，[请移步CSS的6种颜色模式](http://www.cnblogs.com/xiaohuochai/p/5204448.html)。实际上，颜色的应用主要分为前景色、背景色和透明三个部分。本文主要介绍前景色和透明度。

&nbsp;

### color

&emsp;&emsp;color前景色

&emsp;&emsp;值: &lt;color&gt; | inherit

&emsp;&emsp;初始值: 用户代理特定的值

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 有

【影响边框】

&emsp;&emsp;一般来说，前景是元素的文本，不过前景还包括元素周围的边框。有两种方式直接影响一个元素的前景色，可以使用color属性，也可以使用属性border-color设置边框颜色

<iframe style="width: 100%; height: 400px;" src="https://demo.xiaohuochai.site/css/colorAndOpacity/c1.html" frameborder="0" width="320" height="240"></iframe>

【继承颜色】

&emsp;&emsp;color是可以继承的，可以把文档中的所有正常文本设置为某种颜色，如通过声明body{color:red;}设置为红色。这会把所有没有其他样式的文本变成红色(如锚就不包含在内，锚有其自己的颜色样式)。但浏览器对表单类元素有预定义的颜色，使body颜色无法继承到表单类元素中

<iframe style="width: 100%; height: 400px;" src="https://demo.xiaohuochai.site/css/colorAndOpacity/c2.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### opacity

&emsp;&emsp;opacity是CSS3中专门用来设置透明度的一个属性，opacity只能给整个元素设置一个透明度，并且其透明度直接会继承给其后代元素

&emsp;&emsp;值: value | inherit

&emsp;&emsp;value:默认值是1，可以取0-1的任意浮点数。其中，1表示完全不透明，0表示完全透明

&emsp;&emsp;初始值: 1

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 无

【兼容性】

&emsp;&emsp;IE8-浏览器不支持opacity透明属性，可以使用其专用的滤镜来实现opacity透明属性的透明效果

&emsp;&emsp;filter:alpha(opacity=透明值)，该透明值是0-100之间的任意整数

<div class="cnblogs_code">
<pre>opacity: 0.8;
filter:alpha(opacity=80);</pre>
</div>

<iframe style="width: 100%; height: 240px;" src="https://demo.xiaohuochai.site/css/colorAndOpacity/c3.html" frameborder="0" width="320" height="240"></iframe>

