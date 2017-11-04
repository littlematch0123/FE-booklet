# HTML5设计原则

 　　实际上，html5并不是由w3c直接制定的，w3c的方向是xhtml2，而不是html5。当xhtml2脱离现实，无法付诸实践时，w3c工作组才将研究方向转向html5。为什么xhtml2从未落到实处？因为它违反了一条设计原理，这条设计原理就是著名的伯斯塔尔法则&mdash;&mdash;发送时要保守；接收时要开放。而在html5设计过程中遵循了一系列原则，才使得html5得以快速推广

&nbsp;

### 避免不必要的复杂性

　　html4

<div class="cnblogs_code">
<pre>&lt;!DOCTYPE html PUBLIC "-//W3C/DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd"&gt;</pre>
</div>

　　html5

<div class="cnblogs_code">
<pre>&lt;!DOCTYPE html&gt;</pre>
</div>

&nbsp;

　　html4

<div class="cnblogs_code">
<pre>&lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8"&gt;</pre>
</div>

　　html5

<div class="cnblogs_code">
<pre>&lt;meta charset="utf-8"&gt;</pre>
</div>

&nbsp;

### 支持已有内容

　　以下四段代码，在xhtml中只有第一段是正确的；而在html5中，所有的都是正确的

<div class="cnblogs_code">
<pre>&lt;img src="foo" alt="bar" /&gt;
&lt;p class="foo"&gt;Hello world&lt;/p&gt;

&lt;img src="foo" alt="bar"&gt;
&lt;p class="foo"&gt;Hello world

&lt;IMG SRC="foo" ALT="bar"&gt;
&lt;P CLASS="foo"&gt;Hello world&lt;/P&gt;

&lt;img src=foo alt=bar&gt;
&lt;p class=foo&gt;Hello world&lt;/p&gt;</pre>
</div>

&nbsp;

### 解决现实的问题

 　　在html4中，即使两个块级元素元素有相同的链接地址，也必须分开写，因为内联元素不能包含块级元素

<div class="cnblogs_code">
<pre>&lt;h2&gt;&lt;a href="/path/to/resource"&gt;Headline text&lt;/a&gt;&lt;/h2&gt;
&lt;p&gt;&lt;a href="/path/to/resource"&gt;Paragraph text.&lt;/a&gt;&lt;/p&gt;</pre>
</div>

 　　而在html5中，由于使用了内容模型，&lt;a&gt;元素也可以包含块级元素

<div class="cnblogs_code">
<pre>&lt;a href="/path/to/resource"&gt;
    &lt;h2&gt;Headline text&lt;/h2&gt;
    &lt;p&gt;Paragraph text.&lt;/p&gt;
&lt;/a&gt;</pre>
</div>

&nbsp;

### 内容模型

　　html5新增了多个元素，其中包括：section、article、aside和nav，它们代表了一种新的内容模型&mdash;&mdash;给内容分区。以前人们一直都在用div来组织页面中的内容，但与其他类似的元素一样，div本身并没有语义。但section、article、aside和nav实际上是在明确地告诉你&mdash;&mdash;这一块就像文档中的另一个文档一样。位于这些元素中的任何内容，都可以拥有自己的概要、标题，自己的脚部。

&nbsp;

### 平稳退化

　　浏览器在遇到不识别的type值时，会将type的值解释为text

<div class="cnblogs_code">
<pre>input type="number"
input type="search"
input type="range"
input type="email"
input type="date"
input type="url"</pre>
</div>
