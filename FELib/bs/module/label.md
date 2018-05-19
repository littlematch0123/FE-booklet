# Bootstrap提示信息

&emsp;&emsp;在Bootstrap中，有一些组件用于提示信息，如&nbsp;标签、徽章、巨幕和页头。本文将详细介绍Bootstrap提示信息

&nbsp;

### 标签

&emsp;&emsp;在一些Web页面中常常会添加一个标签用来告诉用户一些额外的信息，比如说在导航上添加了一个新导航项，可能就会加一个&ldquo;new&rdquo;标签，来告诉用户

&emsp;&emsp;在Bootstrap框架中特意将这样的效果提取出来成为一个标签组件，并且以&ldquo;.label&rdquo;样式来实现高亮显示

&emsp;&emsp;使用方法很简单，可以在使用span这样的行内标签

<div>
<pre>&lt;h3&gt;Example heading &lt;span class="label label-default"&gt;New&lt;/span&gt;&lt;/h3&gt;</pre>
</div>

<iframe style="width: 100%; height: 90px;" src="https://demo.xiaohuochai.site/bootstrap/label/l1.html" frameborder="0" width="320" height="240"></iframe>

【自动隐藏】

&emsp;&emsp;当没有内容的时候，自动隐藏

<div>
<pre>.label:empty {
    display: none;
}</pre>
</div>
<div>
<pre>&lt;h3&gt;Example heading &lt;span class="label label-default"&gt;&lt;/span&gt;&lt;/h3&gt;</pre>
</div>

<iframe style="width: 100%; height: 86px;" src="https://demo.xiaohuochai.site/bootstrap/label/l2.html" frameborder="0" width="320" height="240"></iframe>

【颜色设置】

&emsp;&emsp;和按钮元素button类似，label样式也提供了多种颜色：

&emsp;&emsp;☑&nbsp;&nbsp; label-default:默认标签，深灰色

&emsp;&emsp;☑&nbsp;&nbsp; label-primary：主要标签，深蓝色

&emsp;&emsp;☑&nbsp;&nbsp; label-success：成功标签，绿色

&emsp;&emsp;☑&nbsp;&nbsp; label-info：信息标签，浅蓝色

&emsp;&emsp;☑&nbsp;&nbsp; label-warning：警告标签，橙色

&emsp;&emsp;☑&nbsp;&nbsp; label-danger：错误标签，红色

&emsp;&emsp;主要是通过这几个类名来修改背景颜色和文本颜色

<div>
<pre>&lt;span class="label label-default"&gt;Default&lt;/span&gt;
&lt;span class="label label-primary"&gt;Primary&lt;/span&gt;
&lt;span class="label label-success"&gt;Success&lt;/span&gt;
&lt;span class="label label-info"&gt;Info&lt;/span&gt;
&lt;span class="label label-warning"&gt;Warning&lt;/span&gt;
&lt;span class="label label-danger"&gt;Danger&lt;/span&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/bootstrap/label/l3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 徽章

&emsp;&emsp;从某种意义上来说，徽章效果和前面介绍的标签效果极其相似。也用来做一些提示信息使用。常出现的是一些系统发出的信息，比如系统提示有多少信息未读&nbsp;

&emsp;&emsp;在Bootstrap框架中，把这种效果称作为徽章效果，使用&ldquo;badge&rdquo;样式来实现

&emsp;&emsp;可以像标签一样，使用span标签来制作，然后加入`badge`类

<div>
<pre>&lt;a href="#"&gt;Inbox &lt;span class="badge"&gt;42&lt;/span&gt;&lt;/a&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/bootstrap/label/l4.html" frameborder="0" width="320" height="240"></iframe>

【自动隐藏】

&emsp;&emsp;如果没有新的或未读的信息条目，也就是说不包含任何内容，徽章组件能够自动隐藏（通过CSS的&nbsp;`:empty`&nbsp;选择符实现)&nbsp;&nbsp;

<div>
<pre>.badge:empty {
    display: none;
}</pre>
</div>
<div>
<pre>&lt;a href="#"&gt;Inbox &lt;span class="badge"&gt;&lt;/span&gt;&lt;/a&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/bootstrap/label/l5.html" frameborder="0" width="320" height="240"></iframe>

【按钮徽章】

&emsp;&emsp;徽章在按钮元素button和胶囊形导航nav-pills也有类似的样式，只不过颜色不同

<div>
<pre>&lt;ul class="nav nav-pills" role="tablist"&gt;
  &lt;li role="presentation" class="active"&gt;&lt;a href="#"&gt;Home &lt;span class="badge"&gt;42&lt;/span&gt;&lt;/a&gt;&lt;/li&gt;
  &lt;li role="presentation"&gt;&lt;a href="#"&gt;Profile&lt;/a&gt;&lt;/li&gt;
  &lt;li role="presentation"&gt;&lt;a href="#"&gt;Messages &lt;span class="badge"&gt;3&lt;/span&gt;&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;
&lt;button class="btn btn-primary" type="button"&gt;<span style="color: #000000;">
  Messages &lt;span class="badge"&gt;4&lt;/span&gt;
&lt;/button&gt;</pre>
</div>

<iframe style="width: 100%; height: 104px;" src="https://demo.xiaohuochai.site/bootstrap/label/l6.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 巨幕

&emsp;&emsp;这是一个轻量、灵活的组件，它能延伸至整个浏览器视口来展示网站上的关键内容

<div>
<pre>&lt;div class="jumbotron"&gt;
  &lt;h1&gt;小火柴的蓝色理想&lt;/h1&gt;
  &lt;p&gt;好的代码像粥一样，都是用时间熬出来的&lt;/p&gt;
  &lt;p&gt;&lt;a class="btn btn-primary btn-lg" href="#" role="button"&gt;Learn more&lt;/a&gt;&lt;/p&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 270px;" src="https://demo.xiaohuochai.site/bootstrap/label/l7.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;如果为巨幕组件添加圆角，把此组件放在&nbsp;`.container`&nbsp;元素的里面即可

<div>
<pre>&lt;div class="container"&gt;
    &lt;div class="jumbotron"&gt;
        &lt;h1&gt;小火柴的蓝色理想&lt;/h1&gt;
        &lt;p&gt;好的代码像粥一样，都是用时间熬出来的&lt;/p&gt;
        &lt;p&gt;&lt;a class="btn btn-primary btn-lg" href="#" role="button"&gt;Learn more&lt;/a&gt;&lt;/p&gt;
    &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 270px;" src="https://demo.xiaohuochai.site/bootstrap/label/l8.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 页头

&emsp;&emsp;页头组件能够为&nbsp;`h1`&nbsp;标签增加适当的空间，并且与页面的其他部分形成一定的分隔。它支持&nbsp;`h1`&nbsp;标签内内嵌&nbsp;`small`&nbsp;元素的默认效果，还支持大部分其他组件（需要增加一些额外的样式）

<div>
<pre>.page-header {
    padding-bottom: 9px;
    margin: 40px 0 20px;
    border-bottom: 1px solid #eee;
}</pre>
</div>
<div>
<pre>&lt;div class="page-header"&gt;
  &lt;h1&gt;Example page header &lt;small&gt;Subtext for header&lt;/small&gt;&lt;/h1&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 150px;" src="https://demo.xiaohuochai.site/bootstrap/label/l9.html" frameborder="0" width="320" height="240"></iframe>

