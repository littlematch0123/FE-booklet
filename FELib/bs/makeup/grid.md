# Bootstrap栅格系统

&emsp;&emsp;Bootstrap 提供了一套响应式、移动设备优先的流式栅格系统，随着屏幕或视口（viewport）尺寸的增加，系统会自动分为最多12列。栅格系统没有官方的定义，但根据网上的各种描述，可以这样定义，以规则的网格阵列来指导和规范网页中的版面布局以及信息分布。本文将详细介绍Bootstrap栅格系统

&nbsp;

### 实现原理

&emsp;&emsp;网格系统的实现原理非常简单，仅仅是通过定义容器大小，平分12份(也有平分成24份或32份，但12份是最常见的)，再调整内外边距，最后结合媒体查询，就制作出了强大的响应式网格系统。Bootstrap框架中的网格系统就是将容器平分成12份

&emsp;&emsp;栅格系统用于通过一系列的行（row）与列（column）的组合来创建页面布局，内容可以放入这些创建好的布局中。下面就介绍一下 Bootstrap 栅格系统的工作原理：

&emsp;&emsp;1、&ldquo;行（row）&rdquo;必须包含在 .container （固定宽度）或 .container-fluid （100% 宽度）中，以便为其赋予合适的排列（aligment）和内边距（padding）

<div>
<pre>&lt;div class="container"&gt;
    &lt;div class="row"&gt;&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

&emsp;&emsp;2、通过&ldquo;行（row）&rdquo;在水平方向创建一组&ldquo;列（column）&rdquo;

&emsp;&emsp;3、内容应当放置于&ldquo;列（column）&rdquo;内，并且，只有&ldquo;列（column）&rdquo;可以作为行（row）&rdquo;的直接子元素

&emsp;&emsp;4、类似 .row 和 .col-xs-4 这种预定义的类，可以用来快速创建栅格布局。Bootstrap 源码中定义的 mixin 也可以用来创建语义化的布局

<div>
<pre>&lt;div class="container"&gt;
  &lt;div class="row"&gt;
    &lt;div class="col-md-4"&gt;.col-md-4&lt;/div&gt;
    &lt;div class="col-md-8"&gt;.col-md-8&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

&emsp;&emsp;5、通过为&ldquo;列（column）&rdquo;设置 padding 属性，从而创建列与列之间的间隔（gutter）。通过为 .row 元素设置负值 margin 从而抵消掉为 .container 元素设置的 padding，也就间接为&ldquo;行（row）&rdquo;所包含的&ldquo;列（column）&rdquo;抵消掉了padding

&emsp;&emsp;6、栅格系统中的列是通过指定1到12的值来表示其跨越的范围。例如，三个等宽的列可以使用三个 .col-xs-4 来创建

<div>
<pre>&lt;div class="container"&gt;
  &lt;div class="row"&gt;
    &lt;div class="col-md-4"&gt;.col-md-4&lt;/div&gt;
    &lt;div class="col-md-4"&gt;.col-md-4&lt;/div&gt;
    &lt;div class="col-md-4"&gt;.col-md-4&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

&emsp;&emsp;7、如果一&ldquo;行（row）&rdquo;中包含了的&ldquo;列（column）&rdquo;大于 12，多余的&ldquo;列（column）&rdquo;所在的元素将被作为一个整体另起一行排列

&emsp;&emsp;8、栅格类适用于与屏幕宽度大于或等于分界点大小的设备 ， 并且针对小屏幕设备覆盖栅格类。 因此，在元素上应用任何 .col-md-* 栅格类适用于与屏幕宽度大于或等于分界点大小的设备 ， 并且针对小屏幕设备覆盖栅格类。 因此，在元素上应用任何 .col-lg-* 不存在， 也影响大屏幕设备

&nbsp;

### 媒体查询

&emsp;&emsp;在栅格系统中，我们在 Less或Sass 文件中使用以下媒体查询（media query）来创建关键的分界点阈值。

<div>
<pre>/* 小屏幕（平板，大于等于 768px） */
@media (min-width: @screen-sm-min) { ... }
/* 中等屏幕（桌面显示器，大于等于 992px） */
@media (min-width: @screen-md-min) { ... }
/* 大屏幕（大桌面显示器，大于等于 1200px） */
@media (min-width: @screen-lg-min) { ... }</pre>
</div>

&emsp;&emsp;我们偶尔也会在媒体查询代码中包含&nbsp;`max-width`&nbsp;从而将 CSS 的影响限制在更小范围的屏幕大小之内

<div>
<pre>@media (max-width: @screen-xs-max) { ... }
@media (min-width: @screen-sm-min) and (max-width: @screen-sm-max) { ... }
@media (min-width: @screen-md-min) and (max-width: @screen-md-max) { ... }
@media (min-width: @screen-lg-min) { ... }</pre>
</div>

&emsp;&emsp;通过下表可以详细查看 Bootstrap 的栅格系统是如何在多种屏幕设备上工作的

&emsp;&emsp;lg英文是large，表示大的；md英文是middle，表示中等的；sm英文是small，表示小的；xs英文是extra small，表示特小的。与衣服尺码也是对应的

![bs_makeup5](https://pic.xiaohuochai.site/blog/bs_makeup5.png)

&nbsp;

### 基本用法

&emsp;&emsp;网格系统用来布局，其实就是列的组合

&emsp;&emsp;列组合简单理解就是更改数字来合并列（原则：列总和数不能超12），有点类似于表格的colspan属性

&emsp;&emsp;实现列组合方式非常简单，只涉及两个CSS两个特性：浮动与宽度百分比

<div>
<pre>.col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12 {
    float: left;
 }</pre>
</div>
<div>
<pre>  .col-md-12 {
    width: 100%;
  }
  .col-md-11 {
    width: 91.66666667%;
  }
  .col-md-10 {
    width: 83.33333333%;
  }
  .col-md-9 {
    width: 75%;
  }
  .col-md-8 {
    width: 66.66666667%;
  }
  .col-md-7 {
    width: 58.33333333%;
  }
  .col-md-6 {
    width: 50%;
  }
  .col-md-5 {
    width: 41.66666667%;
  }
  .col-md-4 {
    width: 33.33333333%;
  }
  .col-md-3 {
    width: 25%;
  }
  .col-md-2 {
    width: 16.66666667%;
  }
  .col-md-1 {
    width: 8.33333333%;
  }</pre>
</div>
<div>
<pre>&lt;div class="container"&gt;
  &lt;div class="row"&gt;
    &lt;div class="col-xs-4"&gt;.col-xs-4&lt;/div&gt;
    &lt;div class="col-xs-8"&gt;.col-xs-8&lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="row"&gt;
    &lt;div class="col-xs-4"&gt;.col-xs-4&lt;/div&gt;
    &lt;div class="col-xs-4"&gt;.col-xs-4&lt;/div&gt;
    &lt;div class="col-xs-4"&gt;.col-xs-4&lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="row"&gt;
    &lt;div class="col-xs-3"&gt;.col-xs-3&lt;/div&gt;
    &lt;div class="col-xs-6"&gt;.col-xs-6&lt;/div&gt;
    &lt;div class="col-xs-3"&gt;.col-xs-3&lt;/div&gt;
 &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/bootstrap/grid/g1.html" frameborder="0" width="320" height="240"></iframe>

【流式布局容器】&nbsp;

&emsp;&emsp;将最外面的布局元素&nbsp;`.container`&nbsp;修改为&nbsp;`.container-fluid`，就可以将固定宽度的栅格布局转换为 100% 宽度的布局

<div>
<pre>.container-fluid {
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
}</pre>
</div>

&nbsp;

### 列偏移

&emsp;&emsp;使用列偏移非常简单，只需要在列元素上添加类名&ldquo;col-md-offset-*&rdquo;(其中星号代表要偏移的列组合数)，那么具有这个类名的列就会向右偏移。例如，在列元素上添加&ldquo;col-md-offset-4&rdquo;，表示该列向右移动4个列的宽度

&emsp;&emsp;实现原理非常简单，利用十二分之一(1/12)的margin-left。有多少个offset，就有多少个margin-left

<div>
<pre> .col-md-offset-12 {
   margin-left: 100%;
  }
  .col-md-offset-11 {
    margin-left: 91.66666667%;
  }
  .col-md-offset-10 {
    margin-left: 83.33333333%;
  }
  .col-md-offset-9 {
    margin-left: 75%;
  }
  .col-md-offset-8 {
    margin-left: 66.66666667%;
  }
  .col-md-offset-7 {
    margin-left: 58.33333333%;
  }
  .col-md-offset-6 {
    margin-left: 50%;
  }
  .col-md-offset-5 {
    margin-left: 41.66666667%;
  }
  .col-md-offset-4 {
    margin-left: 33.33333333%;
  }
  .col-md-offset-3 {
    margin-left: 25%;
  }
  .col-md-offset-2 {
    margin-left: 16.66666667%;
  }
  .col-md-offset-1 {
    margin-left: 8.33333333%;
  }
  .col-md-offset-0 {
    margin-left: 0;
  }</pre>
</div>

&emsp;&emsp;不过有一个细节需要注意，使用&rdquo;col-md-offset-*&rdquo;对列进行向右偏移时，要保证列与偏移列的总数不超过12，不然会致列断行显示

<div>
<pre>&lt;div class="container"&gt;
  &lt;div class="row"&gt;
    &lt;div class="col-xs-4"&gt;.col-xs-4&lt;/div&gt;
    &lt;div class="col-xs-4 col-xs-offset-4"&gt;.col-xs-4 .col-xs-offset-4&lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="row"&gt;
    &lt;div class="col-xs-2"&gt;.col-xs-2&lt;/div&gt;
    &lt;div class="col-xs-4 col-xs-offset-4"&gt;.col-xs-4 .col-xs-offset-4&lt;/div&gt;
    &lt;div class="col-xs-4"&gt;.col-xs-4&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 90px;" src="https://demo.xiaohuochai.site/bootstrap/grid/g2.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 列排序

&emsp;&emsp;列排序其实就是改变列的方向，就是改变左右浮动，并且设置浮动的距离。在Bootstrap框架的网格系统中是通过添加类名&ldquo;col-md-push-*&rdquo;和&ldquo;col-md-pull-*&rdquo; (其中星号代表移动的列组合数)。

&emsp;&emsp;Bootstrap仅通过设置left和right来实现定位效果

<div>
<pre>.col-md-pull-12 {
    right: 100%;
  }
  .col-md-pull-11 {
    right: 91.66666667%;
  }
  .col-md-pull-10 {
    right: 83.33333333%;
  }
  .col-md-pull-9 {
    right: 75%;
  }
  .col-md-pull-8 {
    right: 66.66666667%;
  }
  .col-md-pull-7 {
    right: 58.33333333%;
  }
  .col-md-pull-6 {
    right: 50%;
  }
  .col-md-pull-5 {
    right: 41.66666667%;
  }
  .col-md-pull-4 {
    right: 33.33333333%;
  }
  .col-md-pull-3 {
    right: 25%;
  }
  .col-md-pull-2 {
    right: 16.66666667%;
  }
  .col-md-pull-1 {
    right: 8.33333333%;
  }
  .col-md-pull-0 {
    right: 0;
  }
  .col-md-push-12 {
    left: 100%;
  }
  .col-md-push-11 {
    left: 91.66666667%;
  }
  .col-md-push-10 {
    left: 83.33333333%;
  }
  .col-md-push-9 {
    left: 75%;
  }
  .col-md-push-8 {
    left: 66.66666667%;
  }
  .col-md-push-7 {
    left: 58.33333333%;
  }
  .col-md-push-6 {
    left: 50%;
  }
  .col-md-push-5 {
    left: 41.66666667%;
  }
  .col-md-push-4 {
    left: 33.33333333%;
  }
  .col-md-push-3 {
    left: 25%;
  }
  .col-md-push-2 {
    left: 16.66666667%;
  }
  .col-md-push-1 {
    left: 8.33333333%;
  }
  .col-md-push-0 {
    left: 0;
  }</pre>
</div>
<div>
<pre>&lt;div class="container"&gt;
    &lt;div class="row"&gt;
      &lt;div class="col-md-9 col-md-push-3"&gt;.col-md-9 .col-md-push-3&lt;/div&gt;
      &lt;div class="col-md-3 col-md-pull-9"&gt;.col-md-3 .col-md-pull-9&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/bootstrap/grid/g3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 列嵌套

&emsp;&emsp;为了使用内置的栅格系统将内容再次嵌套，可以通过添加一个新的&nbsp;`.row`&nbsp;元素和一系列&nbsp;`.col-sm-*`&nbsp;元素到已经存在的&nbsp;`.col-sm-*`&nbsp;元素内。被嵌套的行（row）所包含的列（column）的个数不能超过12

<div>
<pre>&lt;div class="container"&gt;
    &lt;div class="row"&gt;
        &lt;div class="col-xs-8"&gt;
        我的里面嵌套了一个网格
            &lt;div class="row"&gt;
            &lt;div class="col-xs-6"&gt;col-xs-6&lt;/div&gt;
            &lt;div class="col-xs-6"&gt;col-xs-6&lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;
    &lt;div class="col-xs-4"&gt;col-xs-4&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="row"&gt;
        &lt;div class="col-xs-4"&gt;.col-xs-4&lt;/div&gt;
        &lt;div class="col-xs-8"&gt;
        我的里面嵌套了一个网格
            &lt;div class="row"&gt;
              &lt;div class="col-xs-4"&gt;col-xs-4&lt;/div&gt;
              &lt;div class="col-xs-4"&gt;col-xs-4&lt;/div&gt;
              &lt;div class="col-xs-4"&gt;col-xs-4&lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/bootstrap/grid/g4.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 复杂应用

&emsp;&emsp;在bootstrap中，.col-xs-应用于(&lt;768px)的情况，.col-sm-应用于(&ge;768px and &lt;992px)的情况，.col-md-应用于(&ge;992px and &lt;1200px)的情况，.col-lg-应用于(&ge;1200px)的情况

&emsp;&emsp;而.col-xs-、.col-sm-、.col-md-、.col-lg-是可以用混合使用的

&emsp;&emsp;比如，要实现&ge;992px的时候分四列一排，(&ge;768px and &lt;992px)的时候两列一排，(&lt;768px)的时候一列一排

<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;title&gt;Document&lt;/title&gt;
&lt;link href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.css" rel="stylesheet"&gt;
&lt;style&gt;
.row div{border:1px solid black;}    
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div class="container-fluid"&gt;
    &lt;div class="row"&gt;
      &lt;div class="col-md-3 col-sm-6"&gt;aaa&lt;/div&gt;
      &lt;div class="col-md-3 col-sm-6"&gt;bbb&lt;/div&gt;
      &lt;div class="col-md-3 col-sm-6"&gt;ccc&lt;/div&gt;
      &lt;div class="col-md-3 col-sm-6"&gt;ddd&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>

![bs_makeup6](https://pic.xiaohuochai.site/blog/bs_makeup6.gif)

### 显示隐藏

&emsp;&emsp;为了加快对移动设备友好的页面开发工作，利用媒体查询功能并使用下面这些工具类可以方便的针对不同设备展示或隐藏页面内容

![bs_makeup7](https://pic.xiaohuochai.site/blog/bs_makeup7.png)

&emsp;&emsp;形如`.visible-*-*`的类针对每种屏幕大小都有三种变体，每个针对 CSS 中不同的`display`属性，如下所示&nbsp;

![bs_makeup8](https://pic.xiaohuochai.site/blog/bs_makeup8.png)

&emsp;&emsp;因此，以超小屏幕（`xs`）为例，可用的&nbsp;`.visible-*-*`&nbsp;类是：`.visible-xs-block`、`.visible-xs-inline`&nbsp;和&nbsp;`.visible-xs-inline-block`

&emsp;&emsp;比如，要实现&ge;992px时存在三列，(&ge;768px and &lt;992px)的时候存在两列，(&lt;768px)的时候只存在一列　

<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;title&gt;Document&lt;/title&gt;
&lt;link href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.css" rel="stylesheet"&gt;
&lt;style&gt;
.row div{border:1px solid black;}    
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div class="container-fluid"&gt;
    &lt;div class="row"&gt;
      &lt;div class="col-md-4 col-sm-6"&gt;aaa&lt;/div&gt;
      &lt;div class="col-md-4 col-sm-6 hidden-xs"&gt;bbb&lt;/div&gt;
      &lt;div class="col-md-4 hidden-sm hidden-xs"&gt;ccc&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>

![bs_makeup9](https://pic.xiaohuochai.site/blog/bs_makeup9.gif)

