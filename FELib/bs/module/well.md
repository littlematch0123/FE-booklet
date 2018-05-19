# Bootstrap洼地

&emsp;&emsp;这是一个轻量、灵活的组件，它能延伸至整个浏览器视口来展示网站上的关键内容。本文将详细介绍Bootstrap洼地

&nbsp;

### 概述

&emsp;&emsp;洼地(Well)样式的效果和巨幕jumbotron样式类似，不同点是well样式有了边框设置，并且默认高度是自适应文本的高度。把 Well 用在元素上，就能有嵌入（inset）的简单效果

&emsp;&emsp;Well样式的使用方法非常简单，使用.well类即可

<div>
<pre>.well {
    min-height: 20px;
    padding: 19px;
    margin-bottom: 20px;
    background-color: #f5f5f5;
    border: 1px solid #e3e3e3;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
}</pre>
</div>
<div>
<pre>&lt;div class="well"&gt;小火柴的蓝色理想&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/bootstrap/well/w1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 尺寸

&emsp;&emsp;well样式提供了不同大小的样式，主要是padding和圆角大小，分别是well-lg和well-sm。使用时，直接和well一起应用在同一个元素上即可

<div>
<pre>.well-lg {
    padding: 24px;
    border-radius: 6px;
}
.well-sm {
    padding: 9px;
    border-radius: 3px;
}</pre>
</div>
<div>
<pre>&lt;div class="well"&gt;小火柴的蓝色理想&lt;/div&gt;
&lt;div class="well well-lg"&gt;小火柴的蓝色理想&lt;/div&gt;
&lt;div class="well well-sm"&gt;小火柴的蓝色理想&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 230px;" src="https://demo.xiaohuochai.site/bootstrap/well/w2.html" frameborder="0" width="320" height="240"></iframe>

