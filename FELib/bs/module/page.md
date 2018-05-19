# Bootstrap分页

&emsp;&emsp;分页导航几乎在每个网站都可见，好的分页能给用户带来好的用户体验。本文将详细介绍Bootstrap分页

&nbsp;

### 概述

&emsp;&emsp;在Bootstrap框架中提供了两种分页导航：

&emsp;&emsp; ☑&nbsp;&nbsp; 带页码的分页导航

&emsp;&emsp; ☑&nbsp;&nbsp; 带翻页的分页导航

&nbsp;

### 页码分页

&emsp;&emsp;带页码的分页导航，可能是最常见的一种分页导航，特别是在列表页内容超多的时候，会给用户提供分页的导航方式

【默认分页】

&emsp;&emsp;平时很多人喜欢用div&gt;a和div&gt;span结构来制作带页码的分页导航。不过，在Bootstrap框架中使用的是ul&gt;li&gt;a这样的结构，在ul标签上加入pagination方法：

<div>
<pre>&lt;nav aria-label="Page navigation"&gt;
  &lt;ul class="pagination"&gt;
    &lt;li&gt;
      &lt;a href="#" aria-label="Previous"&gt;
        &lt;span aria-hidden="true"&gt;&amp;laquo;&lt;/span&gt;
      &lt;/a&gt;
    &lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;1&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;2&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;3&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;4&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;5&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;
      &lt;a href="#" aria-label="Next"&gt;
        &lt;span aria-hidden="true"&gt;&amp;raquo;&lt;/span&gt;
      &lt;/a&gt;
    &lt;/li&gt;
  &lt;/ul&gt;
&lt;/nav&gt;</pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/bootstrap/page/p1.html" frameborder="0" width="320" height="240"></iframe>

【状态】

&emsp;&emsp;链接在不同情况下可以定制。可以给不能点击的链接添加&nbsp;`.disabled`&nbsp;类、给当前页添加&nbsp;`.active`&nbsp;类

&emsp;&emsp;最好将 active 或 disabled 状态的链接（即&nbsp;&lt;a&gt;&nbsp;标签）替换为&nbsp;&lt;span&gt;&nbsp;标签，或者在向前/向后的箭头处省略&lt;a&gt;&nbsp;标签，这样就可以让其保持需要的样式而不能被点击

<div>
<pre>&lt;nav aria-label="Page navigation"&gt;
  &lt;ul class="pagination"&gt;
    &lt;li class="disabled"&gt;
      &lt;span aria-label="Previous"&gt;
        &lt;span aria-hidden="true"&gt;&amp;laquo;&lt;/span&gt;
      &lt;/span&gt;
    &lt;/li&gt;
    &lt;li class="active"&gt;&lt;span&gt;1&lt;/span&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;2&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;3&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;4&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;5&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;
      &lt;a href="#" aria-label="Next"&gt;
        &lt;span aria-hidden="true"&gt;&amp;raquo;&lt;/span&gt;
      &lt;/a&gt;
    &lt;/li&gt;
  &lt;/ul&gt;
&lt;/nav&gt;</pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/bootstrap/page/p2.html" frameborder="0" width="320" height="240"></iframe>

【尺寸】

&emsp;&emsp;在Bootstrap框架中，可以通过两种不同的情况来设置其大小，类似于按钮一样：

&emsp;&emsp;1、通过&ldquo;pagination-lg&rdquo;让分页导航变大

&emsp;&emsp;2、通过&ldquo;pagination-sm&rdquo;让分页导航变小

<div>
<pre>&lt;nav aria-label="Page navigation"&gt;
  &lt;ul class="pagination pagination-lg"&gt;
    &lt;li&gt;
      &lt;a href="#" aria-label="Previous"&gt;
        &lt;span aria-hidden="true"&gt;&amp;laquo;&lt;/span&gt;
      &lt;/a&gt;
    &lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;1&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;2&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;3&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;4&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;5&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;
      &lt;a href="#" aria-label="Next"&gt;
        &lt;span aria-hidden="true"&gt;&amp;raquo;&lt;/span&gt;
      &lt;/a&gt;
    &lt;/li&gt;
  &lt;/ul&gt;
&lt;/nav&gt;
&lt;nav aria-label="Page navigation"&gt;
  &lt;ul class="pagination"&gt;
    &lt;li&gt;
      &lt;a href="#" aria-label="Previous"&gt;
        &lt;span aria-hidden="true"&gt;&amp;laquo;&lt;/span&gt;
      &lt;/a&gt;
    &lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;1&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;2&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;3&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;4&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;5&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;
      &lt;a href="#" aria-label="Next"&gt;
        &lt;span aria-hidden="true"&gt;&amp;raquo;&lt;/span&gt;
      &lt;/a&gt;
    &lt;/li&gt;
  &lt;/ul&gt;
&lt;/nav&gt;
&lt;nav aria-label="Page navigation"&gt;
  &lt;ul class="pagination pagination-sm"&gt;
    &lt;li&gt;
      &lt;a href="#" aria-label="Previous"&gt;
        &lt;span aria-hidden="true"&gt;&amp;laquo;&lt;/span&gt;
      &lt;/a&gt;
    &lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;1&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;2&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;3&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;4&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;5&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;
      &lt;a href="#" aria-label="Next"&gt;
        &lt;span aria-hidden="true"&gt;&amp;raquo;&lt;/span&gt;
      &lt;/a&gt;
    &lt;/li&gt;
  &lt;/ul&gt;
&lt;/nav&gt;</pre>
</div>

<iframe style="width: 100%; height: 275px;" src="https://demo.xiaohuochai.site/bootstrap/page/p3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 翻页

&emsp;&emsp;Bootstrap框架除了提供带页码的分页导航之外还提供了翻页导航。这种分页导航常常在一些简单的网站上看到，比如说个人博客，杂志网站等。这种分页导航是看不到具体的页码，只会提供一个&ldquo;上一页&rdquo;和&ldquo;下一页&rdquo;的按钮

【默认用法】

&emsp;&emsp;在实际使用中，翻页分页导航和带页码的分页导航类似，为ul标签加入`pager`类

<div>
<pre>&lt;ul class="pager"&gt;
   &lt;li&gt;&lt;a href="#"&gt;&amp;laquo;上一页&lt;/a&gt;&lt;/li&gt;
   &lt;li&gt;&lt;a href="#"&gt;下一页&amp;raquo;&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;</pre>
</div>

<iframe style="width: 100%; height: 72px;" src="https://demo.xiaohuochai.site/bootstrap/page/p4.html" frameborder="0" width="320" height="240"></iframe>

【对齐设置】

&emsp;&emsp;默认情况之下，翻页分页导航是居中显示，但有的时候我们需要一个居左，一个居右。Bootstrap框架提供了两个样式：

&emsp;&emsp;☑&nbsp;&nbsp;&nbsp;previous：让&ldquo;上一步&rdquo;按钮居左

&emsp;&emsp;☑&nbsp;&nbsp;&nbsp;next：让&ldquo;下一步&rdquo;按钮居右

&emsp;&emsp;具体使用的时候，只需要在`li`标签上添加对应类名即可

&emsp;&emsp;实现原理很简单，就是一个进行了左浮动，一个进行了右浮动

<div>
<pre>.pager .next &gt; a,
.pager .next &gt; span {
float: right;
}
.pager .previous &gt; a,
.pager .previous &gt; span {
float: left;
}</pre>
</div>
<div>
<pre>&lt;ul class="pager"&gt;
   &lt;li class="previous"&gt;&lt;a href="#"&gt;&amp;larr;上一页&lt;/a&gt;&lt;/li&gt;
   &lt;li class="next"&gt;&lt;a href="#"&gt;下一页&amp;rarr;&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;</pre>
</div>

<iframe style="width: 100%; height: 72px;" src="https://demo.xiaohuochai.site/bootstrap/page/p5.html" frameborder="0" width="320" height="240"></iframe>

【状态设置】

&emsp;&emsp;和带页码分页导航一样，如果在li标签上添加了disabled类名的时候，分页按钮处于禁用状态，但同样不能禁止其点击功能。可以通过js来处理，或将`a`标签换成`span`标签

<div>
<pre>.pager .disabled &gt; a,
.pager .disabled &gt;a:hover,
.pager .disabled &gt;a:focus,
.pager .disabled &gt; span {
  color: #999;
  cursor: not-allowed;
  background-color: #fff;
}</pre>
</div>
<div>
<pre>&lt;ul class="pager"&gt;
  &lt;li class="disabled"&gt;&lt;span&gt;&amp;laquo;上一页&lt;/span&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href="#"&gt;下一页&amp;raquo;&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;</pre>
</div>

<iframe style="width: 100%; height: 72px;" src="https://demo.xiaohuochai.site/bootstrap/page/p6.html" frameborder="0" width="320" height="240"></iframe>

