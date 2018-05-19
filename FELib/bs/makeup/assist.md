# Bootstrap辅助类

&emsp;&emsp;Bootstrap提供了一组工具类，用于辅助项目的开发。本文将详细介绍Bootstrap辅助类

&nbsp;

### 文本色

&emsp;&emsp;通过颜色来展示意图，Bootstrap 提供了一组工具类。这些类可以应用于链接，并且在鼠标经过时颜色可以还可以加深，就像默认的链接一样

<div>
<pre>.text-muted：提示，使用浅灰色（#777）
.text-primary：主要，使用蓝色（#337ab7）
.text-success：成功，使用浅绿色(#3c763d)
.text-info：通知信息，使用浅蓝色（#31708f）
.text-warning：警告，使用黄色（#8a6d3b）
.text-danger：危险，使用褐色（#a94442）</pre>
</div>
<div>
<pre>&lt;div&gt;
    &lt;p class="text-muted"&gt;Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.&lt;/p&gt;
    &lt;p class="text-primary"&gt;Nullam id dolor id nibh ultricies vehicula ut id elit.&lt;/p&gt;
    &lt;p class="text-success"&gt;Duis mollis, est non commodo luctus, nisi erat porttitor ligula.&lt;/p&gt;
    &lt;p class="text-info"&gt;Maecenas sed diam eget risus varius blandit sit amet non magna.&lt;/p&gt;
    &lt;p class="text-warning"&gt;Etiam porta sem malesuada magna mollis euismod.&lt;/p&gt;
    &lt;p class="text-danger"&gt;Donec ullamcorper nulla non metus auctor fringilla.&lt;/p&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/bootstrap/assist/a1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 背景色

&emsp;&emsp;和情境文本颜色类一样，使用任意情境背景色类就可以设置元素的背景。链接组件在鼠标经过时颜色会加深，就像上面所讲的情境文本颜色类一样

<div>
<pre>.bg-primary：主要，使用蓝色（#337ab7）
.bg-success：成功，使用浅绿色(#dff0d8)
.bg-info：通知信息，使用浅蓝色（#d9edf7）
.bg-warning：警告，使用浅黄色（#fcf8e3）
.bg-danger：危险，使用浅紫色（#f2dede）</pre>
</div>
<div>
<pre>&lt;div&gt;   
    &lt;p class="bg-primary"&gt;Nullam id dolor id nibh ultricies vehicula ut id elit.&lt;/p&gt;
    &lt;p class="bg-success"&gt;Duis mollis, est non commodo luctus, nisi erat porttitor ligula.&lt;/p&gt;
    &lt;p class="bg-info"&gt;Maecenas sed diam eget risus varius blandit sit amet non magna.&lt;/p&gt;
    &lt;p class="bg-warning"&gt;Etiam porta sem malesuada magna mollis euismod.&lt;/p&gt;
    &lt;p class="bg-danger"&gt;Donec ullamcorper nulla non metus auctor fringilla.&lt;/p&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/bootstrap/assist/a2.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 文本对齐

&emsp;&emsp;通过文本对齐类，可以简单方便的将文字重新对齐

<div>
<pre>.text-left {
    text-align: left;
}
.text-center {
    text-align: center;
}
.text-right {
    text-align: right;
}
.text-justify {
    text-align: justify;
}
.text-nowrap {
    white-space: nowrap;
}</pre>
</div>
<div>
<pre>&lt;p class="text-left"&gt;Left aligned text.&lt;/p&gt;
&lt;p class="text-center"&gt;Center aligned text.&lt;/p&gt;
&lt;p class="text-right"&gt;Right aligned text.&lt;/p&gt;
&lt;p class="text-justify"&gt;Justified text.&lt;/p&gt;
&lt;p class="text-nowrap"&gt;No wrap text.&lt;/p&gt;</pre>
</div>

<iframe style="width: 100%; height: 170px;" src="https://demo.xiaohuochai.site/bootstrap/assist/a3.html" frameborder="0" width="320" height="240"></iframe>

【居中】

&emsp;&emsp;为任意元素设置&nbsp;`display: block`&nbsp;属性并通过&nbsp;`margin`&nbsp;属性让其中的内容居中

<div>
<pre>&lt;div class="center-block" style="width:100px;"&gt;center&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 30px;" src="https://demo.xiaohuochai.site/bootstrap/assist/a4.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 大小写

&emsp;&emsp;通过这几个类可以改变文本的大小写

<div>
<pre>.text-lowercase {
    text-transform: lowercase;
}
.text-uppercase {
    text-transform: uppercase;
}
.text-capitalize {
    text-transform: capitalize;
}</pre>
</div>
<div>
<pre>&lt;p class="text-lowercase"&gt;Lowercased text.&lt;/p&gt;
&lt;p class="text-uppercase"&gt;Uppercased text.&lt;/p&gt;
&lt;p class="text-capitalize"&gt;Capitalized text.&lt;/p&gt;</pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/bootstrap/assist/a5.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 按钮和符号

【关闭按钮】

&emsp;&emsp;通过使用一个象征关闭的图标，可以让模态框和警告框消失

<div>
<pre>&lt;button type="button" class="close" aria-label="Close"&gt;&lt;span aria-hidden="true"&gt;&amp;times;&lt;/span&gt;</pre>
</div>

<iframe style="width: 100%; height: 30px;" src="https://demo.xiaohuochai.site/bootstrap/assist/a66.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;【三角符号】

&emsp;&emsp;通过使用三角符号可以指示某个元素具有下拉菜单的功能

<div>
<pre>&lt;span class="caret"&gt;&lt;/span&gt;</pre>
</div>
<div>
<pre>.caret {
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 2px;
    vertical-align: middle;
    border-top: 4px dashed;
    border-top: 4px solid \9;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
}</pre>
</div>

<iframe style="width: 100%; height: 30px;" src="https://demo.xiaohuochai.site/bootstrap/assist/a8.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 浮动

&emsp;&emsp;通过添加一个类，可以将任意元素向左或向右浮动。`!important`&nbsp;被用来明确 CSS 样式的优先级

&emsp;&emsp;注意：排列导航条中的组件时可以使用`.navbar-left`&nbsp;或&nbsp;`.navbar-right`

【清除浮动】

&emsp;&emsp;通过为父元素添加&nbsp;`.clearfix`&nbsp;类可以很容易地清除浮动（`float`）&nbsp;

<div>
<pre>.pull-left {
  float: left !important;
}
.pull-right {
  float: right !important;
}</pre>
</div>
<div>
<pre>.clearfix() {
  &amp;:before,
  &amp;:after {
    content: " ";
    display: table;
  }
  &amp;:after {
    clear: both;
  }
}</pre>
</div>
<div>
<pre>&lt;div class="clearfix"&gt;
    &lt;div class="pull-left"&gt;left&lt;/div&gt;
    &lt;div class="pull-right"&gt;right&lt;/div&gt;
&lt;/div&gt;
&lt;div&gt;aaa&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/bootstrap/assist/a9.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 隐藏

【显示隐藏内容】

&emsp;&emsp;`.show`&nbsp;和&nbsp;`.hidden`&nbsp;类可以强制任意元素显示或隐藏(对于屏幕阅读器也能起效)。这些类通过&nbsp;`!important`&nbsp;来避免 CSS 样式优先级问题

&emsp;&emsp;另外，`.invisible`&nbsp;类可以被用来仅仅影响元素的可见性，也就是说，元素的&nbsp;`display`&nbsp;属性不被改变，并且这个元素仍然能够影响文档流的排布

&emsp;&emsp;注意：这些类只对块级元素起作用

<div>
<pre>.show {
  display: block !important;
}
.hidden {
  display: none !important;
}
.invisible {
  visibility: hidden;
}</pre>
</div>
<div>
<pre>&lt;div class="show"&gt;show&lt;/div&gt;
&lt;div class="hidden"&gt;hidden&lt;/div&gt;
&lt;div class="invisible"&gt;invisible&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/bootstrap/assist/a10.html" frameborder="0" width="320" height="240"></iframe>

【屏幕阅读器】&nbsp;

&emsp;&emsp;`.sr-only`&nbsp;类可以对屏幕阅读器以外的设备隐藏内容。`.sr-only`&nbsp;和&nbsp;`.sr-only-focusable`&nbsp;联合使用的话可以在元素有焦点的时候再次显示出来（例如，使用键盘导航的用户）

<div>
<pre>&lt;a class="sr-only sr-only-focusable" href="#content"&gt;Skip to main content&lt;/a&gt;</pre>
</div>

&emsp;&emsp;按tab键时，下面的控件会出现内容

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/bootstrap/assist/a11.html" frameborder="0" width="320" height="240"></iframe>

【图片替换】

&emsp;&emsp;使用&nbsp;`.text-hide`&nbsp;类或对应的 mixin 可以用来将元素的文本内容替换为一张背景图。

<div>
<pre>.text-hide {
    font: 0/0 a;
    color: transparent;
    text-shadow: none;
    background-color: transparent;
    border: 0;
}</pre>
</div>
<div>
<pre>&lt;h1 class="text-hide" style="height:30px;background:url('http://via.placeholder.com/30x30') no-repeat;"&gt;Custom heading&lt;/h1&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/bootstrap/assist/a12.html" frameborder="0" width="320" height="240"></iframe>

