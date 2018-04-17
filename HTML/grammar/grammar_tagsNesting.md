# HTML标签嵌套规则

&emsp;&emsp;在html5中，`<a>`元素的子元素可以是块级元素，这在以前是被认为不符合规则的。本文将详细介绍html5的标签嵌套规则

&nbsp;

### 分类

&emsp;&emsp;html5出现之前，经常把元素按照block、inline、inline-block来区分。在html5中，元素不再按照display属性来区分，而是按照[内容模型](http://www.cnblogs.com/xiaohuochai/p/5046584.html)来区分，分为元数据型(metadata content)、区块型(sectioning content)、标题型(heading content)、文档流型(flow content)、语句型(phrasing content)、内嵌型(embedded content)、交互型(interactive content)。元素不属于任何一个类别，被称为穿透的；元素可能属于不止一个类别，称为混合的。

![标签嵌套](https://pic.xiaohuochai.site/blog/HTML_grammar_tagsNesting.png)

&nbsp;

**元数据元素**(metadata content)是可以被用于说明其他内容的表现或行为，或者在当前文档和其他文档之间建立联系的元素

```
base link meta noscript script style template title
```

**流元素**(flow content)是在应用程序和文档的主体部分中使用的大部分元素

```
a abbr address area(如果它是map元素的子元素) article aside audio b bdi bdo blockquote br button canvas cite code data datalist del dfn div dl em embed fieldset figure footer form h1 h2 h3 h4 h5 h6 header hr i iframe img input ins kbd keygen label main map mark math meter nav noscript object ol output p pre progress q ruby s samp script section select small span strong sub sup svg table template textarea time u ul var video wbr text
```

**区块型元素**(sectioning content)是用于定义标题及页脚范围的元素

```
article aside nav section
```

**标题型元素**(heading content)定义一个区块/章节的标题

```
h1 h2 h3 h4 h5 h6
```

**语句型元素**(phrasing content)是用于标记段落级文本的元素

```
a abbr area (如果它是map元素的子级) audio b bdi bdo br button canvas cite code data datalist del dfn em embed i iframe img input ins kbd keygen label map mark math meter noscript object output progress q ruby s samp script select small span strong sub sup svg template textarea time u var video wbr text
```

**嵌入型元素**(embedded content)是引用或插入到文档中其他资源的元素

```
audio canvas embed iframe img math object svg video
```

**交互型元素**(interactive content)是专门用于与用户交互的元素

```
a audio(如果设置了controls属性) button embed iframe img(如果设置了usemap属性) input(如果type属性不为hidden) keygen label object(如果设置了usemap属性) select textarea video (如果设置了controls属性)
```

&nbsp;

### 子元素

【1】子元素是流元素

```
<article>、<section>、<blockquote>、<li>、<dd>、<figcaption>、<div>、<main>、<td>
```

　　【1.1】子元素是流元素，不包括`<main>`元素

```
<aside>、<nav>
```

　　【1.2】子元素是流元素，但不包括`<table>`元素

```
<caption>
```

　　【1.3】子元素是流元素，但不包括`<form>`元素

```
<form>
```

　　【1.4】子元素是流元素，但不包括`<header>`、`<footer>`、`<main>`元素

```
<header>、<footer>、<main>
```

　　【1.5】子元素是流元素，但不包括`<header>`、`<footer>`、区块型元素(sectioning content)、标题型元素(heading content)

```
<dt>、<th>
```

　　【1.6】子元素是流元素，但不包括`<header>`、`<footer>`、`<address>`、区块型元素(sectioning content)、标题型元素(heading content)

```
<address>
```

　　【1.7】子元素是一个`<figcaption>`元素，紧跟着流元素

```
<figure>
```

　　【1.8】子元素是一个`<legend>`元素，紧跟着流元素

```
<filedset>
```

&nbsp;

【2】子元素是语句型元素

```
<h1>、<h2>、<h3>、<h4>、<h5>、<h6>、<p>、<pre>、<em>、<strong>、<small>、<s>、<cite>、<q>、<abbr>、<data>、<time>、<code>、<var>、<samp></span>、<kbd>、<sub>、<sup>、<i>、<b>、<u>、<mark>、<bdi>、<bdo>、<span>、<input>、<output>、<legend>、<label>
```

　　【2.1】子元素是语句型元素，但不包括和自身相同的元素

```
<dfn>、<progress>、<meter>
```

　　【2.2】子元素是语句型元素，但不包括交互型元素(interactive content)

```
<button>
```

&nbsp;

【3】子元素是transparent(以它的父元素允许的子元素为准)

```
<ins>、<del>、<map>
```

　　【3.1】子元素是transparent(以它的父元素允许的子元素为准)，但不包括交互型元素(interactive content)

```
<a>
```

　　【3.2】子元素可以没有、可以是`<param>`元素，也可以是transparent(以它的父元素允许的子元素为准)

```
<object></span>
```

&nbsp;

【4】无子元素

```
<hr>、<br>、<wbr>、<img>、<embed>、<param>、<source>、<track>、<area>、<col>、<keygen>
```

　　【4.1】子元素可以没有、可以是`<li>`元素，也可以是`<script>`、`<template>`元素

```
<ol>、<ul>
```

　　【4.2】子元素可以没有、可以是`<dt>`和`<dd>`元素，也可以是`<script>`、`<template>`元素

```
<dl>
```

　　【4.3】子元素可以没有，可以是`<option>`、`<optgroup>`，也可以是`<script>`、`<template>`元素

```
<select></span>
```

　　【4.4】子元素可以没有，可以是`<option>`，也可以是`<script>`、`<template>`元素

```
<optgroup>
```

　　【4.5】子元素可以没有、可以是`<option>`元素

```
<datalist>
```

　　【4.6】子元素可以没有、也可以是`<track>`元素，也可以是`<source>`元素

```
<audio>、<video>
```

　　【4.7】子元素可以没有，也可以是`<col>`、`<template>`元素

```
<colgroup>
```

　　【4.8】子元素可以没有，可以是`<tr>`，也可以是`<script>`、`<template>`元素

```
<tbody>、<thead>、<tfoot>
```

　　【4.9】子元素可以没有，可以是`<tr>`、`<th>`，也可以是`<script>`、`<template>`元素

```
<tr>
```

&nbsp;

【5】子元素是`<caption>`、`<colgroup>`、`<thead>`、`<tfoot>`、`<tbody>`，也可以是`<script>`、`<template>`元素

```
<table>
```

&nbsp;

【6】子元素是文本内容

```
<textarea>
```

　　【6.1】子元素可以没有，也可以是文本内容

```
<option>
```

&nbsp;

### 总结

&emsp;&emsp;关于每个元素的详细嵌套规则，上部分已经详细介绍。这部分主要对常用标签的嵌套规则进行总结


【1】`<h1>`、`<h2>`、`<h3>`、`<h4>`、`<h5>`、`<h6>`、`<p>`的子元素是<span style="background-color: #888888;" title="a abbr area (如果它是map元素的子级) audio b bdi bdo br button canvas cite code data datalist del dfn em embed i iframe img input ins kbd keygen label map mark math meter noscript object output progress q ruby s samp script select small span strong sub sup svg template textarea time u var video wbr text">语句型元素</span>

【2】`<header>`、`<footer>`不可嵌套`<header>`、`<footer>`

【3】`<a>`的子元素是transparent(以它的父元素允许的子元素为准)，但不包括<span style="background-color: #888888;" title="a audio(如果设置了controls属性) button embed iframe img(如果设置了usemap属性) input(如果type属性不为hidden) keygen label object(如果设置了usemap属性) select textarea video (如果设置了controls属性)">交互型元素</span>(interactive content)

【4】`<form>`不可嵌套`<form>`

【5】`<button>`子元素是<span style="background-color: #888888;" title="a abbr area (如果它是map元素的子级) audio b bdi bdo br button canvas cite code data datalist del dfn em embed i iframe img input ins kbd keygen label map mark math meter noscript object output progress q ruby s samp script select small span strong sub sup svg template textarea time u var video wbr text">语句型元素</span>，不可嵌套<span style="background-color: #888888;" title="a audio(如果设置了controls属性) button embed iframe img(如果设置了usemap属性) input(如果type属性不为hidden) keygen label object(如果设置了usemap属性) select textarea video (如果设置了controls属性)">交互型元素</span>(interactive content)

【6】`<caption>`不可嵌套`<table>`

【7】`<dt>`、`<th>`不可嵌套`<header>`、`<footer>`、<span style="background-color: #888888;" title="article aside nav section">区块型元素</span>(sectioning content)、<span style="background-color: #888888;" title="h1 h2 h3 h4 h5 h6">标题型元素</span>(heading content)

