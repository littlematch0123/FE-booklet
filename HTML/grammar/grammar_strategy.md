# HTML5遵循的5个设计原则

&emsp;&emsp;实际上，html5并不是由w3c直接制定的，w3c的方向是xhtml2，而不是html5。当xhtml2脱离现实，无法付诸实践时，w3c工作组才将研究方向转向html5。为什么xhtml2从未落到实处？因为它违反了一条设计原理，这条设计原理就是著名的伯斯塔尔法则——发送时要保守；接收时要开放。而在html5设计过程中遵循了一系列原则，才使得html5得以快速推广

&nbsp;

### 避免不必要的复杂性

【html4】

```
<!DOCTYPE html PUBLIC "-//W3C/DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
```

【html5】

```
<!DOCTYPE html>
```

&nbsp;

【html4】

```
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
```

【html5】

```
<meta charset="utf-8">
```

&nbsp;

### 支持已有内容

&emsp;&emsp;以下四段代码，在xhtml中只有第一段是正确的；而在html5中，所有的都是正确的

```
<img src="foo" alt="bar" />
<p class="foo">Hello world</p>

<img src="foo" alt="bar">
<p class="foo">Hello world

<IMG SRC="foo" ALT="bar">
<P CLASS="foo">Hello world</P>

<img src=foo alt=bar>
<p class=foo>Hello world</p>
```

&nbsp;

### 解决现实的问题

&emsp;&emsp;在html4中，即使两个块级元素元素有相同的链接地址，也必须分开写，因为内联元素不能包含块级元素

```
<h2><a href="/path/to/resource">Headline text</a></h2>
<p><a href="/path/to/resource">Paragraph text.</a></p>
```

&emsp;&emsp;而在html5中，由于使用了内容模型，`<a>`元素也可以包含块级元素

```
<a href="/path/to/resource">
    <h2>Headline text</h2>
    <p>Paragraph text.</p>
</a>
```

&nbsp;

### 内容模型

&emsp;&emsp;html5新增了多个元素，其中包括：section、article、aside和nav，它们代表了一种新的内容模型——给内容分区。以前人们一直都在用div来组织页面中的内容，但与其他类似的元素一样，div本身并没有语义。但section、article、aside和nav实际上是在明确地告诉你——这一块就像文档中的另一个文档一样。位于这些元素中的任何内容，都可以拥有自己的概要、标题，自己的脚部。

&nbsp;

### 平稳退化

&emsp;&emsp;浏览器在遇到不识别的type值时，会将type的值解释为text

```
input type="number"
input type="search"
input type="range"
input type="email"
input type="date"
input type="url"
```
