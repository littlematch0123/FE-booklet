# CSS中的路径裁剪样式clip-path

&emsp;&emsp;CSS借鉴了[SVG裁剪](http://www.cnblogs.com/xiaohuochai/p/7498428.html)的概念，设置了clip-path样式，本文将详细介绍路径裁剪clip-path

&nbsp;

### 概述

&emsp;&emsp;clip-path属性可以防止部分元素通过定义的剪切区域来显示，仅通过显示的特殊区域。剪切区域是被URL定义的路径代替行内或者外部svg，或者定义路线的方法

&emsp;&emsp;注意：IE浏览器不支持，且低版本webkit内核浏览器需要添加-webkit-前缀

【clip-path】

&emsp;&emsp;值: &lt;clip-source&gt; | [ &lt;basic-shape&gt; || &lt;geometry-box&gt; ] | none

&emsp;&emsp;&lt;clip-source&gt;:&nbsp;url()

&emsp;&emsp;&lt;basic-shape&gt;:&nbsp;&nbsp;inset() | circle() | ellipse() | polygon()&nbsp;

&emsp;&emsp;&lt;geometry-box&gt;:&nbsp;fill-box | stroke-box | view-box | margin-box |&nbsp;border-box |&nbsp;padding-box |&nbsp;content-box&nbsp;

&emsp;&emsp;初始值: none

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 无

&nbsp;

### 简单图形裁剪

【圆形裁剪】

<div class="cnblogs_code">
<pre>&lt;style&gt;
.outer{
  width:100px;
  height: 100px;
  background:orange;
  clip-path: circle(50% at 50% 50%)
}  
&lt;/style&gt;
&lt;div class="outer"&gt;&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/clippath/c1.html" frameborder="0" width="320" height="240"></iframe>

【椭圆裁剪】

<div class="cnblogs_code">
<pre>&lt;style&gt;
.outer{
  width:100px;
  height: 100px;
  background:orange;
  clip-path: ellipse(25% 40% at 50% 50%);
}  
&lt;/style&gt;
&lt;div class="outer"&gt;&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/clippath/c2.html" frameborder="0" width="320" height="240"></iframe>

【矩形裁剪】

<div class="cnblogs_code">
<pre>&lt;style&gt;
.outer{
  width:100px;
  height: 100px;
  background:orange;
  clip-path: inset(5% 20% 15% 10%);
}  
&lt;/style&gt;
&lt;div class="outer"&gt;&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/clippath/c3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 多边形裁剪

【三角形】

<div class="cnblogs_code">
<pre>clip-path: polygon(50% 0%, 0% 100%, 100% 100%);</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/clippath/c4.html" frameborder="0" width="320" height="240"></iframe>

【菱形】

<div class="cnblogs_code">
<pre>clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/clippath/c5.html" frameborder="0" width="320" height="240"></iframe>

【梯形】

<div class="cnblogs_code">
<pre>clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/clippath/c20.html" frameborder="0" width="320" height="240"></iframe>

【平行四边形】

<div class="cnblogs_code">
<pre>clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/clippath/c6.html" frameborder="0" width="320" height="240"></iframe>

【五边形】

<div class="cnblogs_code">
<pre>clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/clippath/c7.html" frameborder="0" width="320" height="240"></iframe>

【六边形】

<div class="cnblogs_code">
<pre>clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/clippath/c8.html" frameborder="0" width="320" height="240"></iframe>

【七边形】

<div class="cnblogs_code">
<pre>clip-path: polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%);</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/clippath/c9.html" frameborder="0" width="320" height="240"></iframe>

【八边形】

<div class="cnblogs_code">
<pre>clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/clippath/c10.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 特殊图形裁剪

【斜角】

<div class="cnblogs_code">
<pre>clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%);</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/clippath/c11.html" frameborder="0" width="320" height="240"></iframe>

【槽口】&nbsp;

<div class="cnblogs_code">
<pre>clip-path: polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%);</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/clippath/c12.html" frameborder="0" width="320" height="240"></iframe>

【左箭头】

<div class="cnblogs_code">
<pre>clip-path: polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%);</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/clippath/c13.html" frameborder="0" width="320" height="240"></iframe>

【右箭头】

<div class="cnblogs_code">
<pre>clip-path: polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%);</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/clippath/c14.html" frameborder="0" width="320" height="240"></iframe>

【星星】

<div class="cnblogs_code">
<pre>clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/clippath/c15.html" frameborder="0" width="320" height="240"></iframe>

【十字架】

<div class="cnblogs_code">
<pre>clip-path: polygon(10% 25%, 35% 25%, 35% 0%, 65% 0%, 65% 25%, 90% 25%, 90% 50%, 65% 50%, 65% 100%, 35% 100%, 35% 50%, 10% 50%);</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/clippath/c16.html" frameborder="0" width="320" height="240"></iframe>

【叉号】

<div class="cnblogs_code">
<pre>clip-path: polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%);</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/clippath/c17.html" frameborder="0" width="320" height="240"></iframe>

【对话框】

<div class="cnblogs_code">
<pre>clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%);</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/clippath/c18.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 变形

&emsp;&emsp;clip-path属性支持transition，但前提是相同的裁剪函数，及相同的参数个数

&emsp;&emsp;下面是一个切角效果向正方形的变形过程

<div class="cnblogs_code">
<pre>.outer{
  width:100px;
  height: 100px;
  background:orange;
  clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%);
  transition:.5s clip-path;
}  
.outer:hover{
  clip-path:polygon(0 0,0 0,100% 0,100% 0,100% 100%,100% 100%,0 100%,0 100%);
}
&lt;div class="outer"&gt;&lt;/div&gt;
 </pre>
</div>

&emsp;&emsp;鼠标移入时开始变形

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/clippath/c19.html" frameborder="0" width="320" height="240"></iframe>

　&nbsp;

### 扩展

&emsp;&emsp;最后，介绍一个工具和一个网站

【工具】

&emsp;&emsp;[clippy](http://bennettfeely.com/clippy/)是一个在线的路径裁剪工具，可以使用clip-path属性裁剪出任意的图形

![clippy](https://pic.xiaohuochai.site/blog/CSS_render_clippy.png)

【网站】

&emsp;&emsp;[species-in-pieces.com](species-in-pieces.com) 是世界一家知名的宣传濒危动物保护网站。，主要使用`clip-path`&nbsp;`polygon`实现了30个动物及30种变换

![speciesInPieces](https://pic.xiaohuochai.site/blog/CSS_render_speciesInPieces.png)

