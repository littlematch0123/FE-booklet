# HTML块级元素

&emsp;&emsp;在HTML5出现之前，人们一般把元素分为块级、内联和内联块元素。本文将详细介绍HTML块级元素


<p>&nbsp;</p>




### h

&emsp;&emsp;标题(Heading)元素有六个不同的级别，`<h1>`是最高级的，而`<h6>`则是最低的。一个标题元素能简要描述该节的主题

&emsp;&emsp;从`<h1>`到`<h6>`，重要性逐渐减小，字体大小也逐渐减小。在使用标题元素时，要注意以下几点

&emsp;&emsp;1、不要为了减小标题的字体而使用低级别的标题，而是使用CSS的font-size样式

&emsp;&emsp;2、避免跳过某级标题：始终要从`<h1>`开始，接下来使用`<h2>` 等等

&emsp;&emsp;3、使用`<section>` 元素时，为了方便起见，避免重复在一个页面上使用`<h1>`，`<h1>`应该用来表示页面的标题，其他的标题当从`<h2>`开始。使用`<section>`时，应当每个 section都使用一个`<h2>`

【默认样式】

    //从h1到h6
    margin: 0.67em 0 -> 0.83em 0 -> 1em 0 -> 1.33em 0 -> 1.67em 0 -> 2.33em 0;
    font-size: 2em -> 1.5em -> 1.17em -> 1em -> 0.83em -> 0.67em;
    font-weight: bold;

<iframe width="300" height="315" src="https://demo.xiaohuochai.site/html/block/b1.html" frameborder="0"></iframe> 


&emsp;&emsp;HTML5新增了`<hgroup>`标签，它表示标题组，用于组合标题，只在区块需要有多个级别的标题时使用　

    <hgroup>
        <h1>水果</h1>
        <h2>苹果</h2>
    </hgroup>



<p>&nbsp;</p>


### p

&emsp;&emsp;`<p>`元素(paragraph)表示文本的一个段落，该元素通常表现为一整块与相邻文本分离的文本，或以垂直的空白隔离或以首行缩进

【默认样式】

    margin: 16px 0;

    <p>段落1</p>
    <p>段落2</p>
    <p>段落3</p>

<iframe width="300" height="130" src="https://demo.xiaohuochai.site/html/block/b2.html" frameborder="0"></iframe> 

<p>&nbsp;</p>


### div

&emsp;&emsp;`<div>`元素(divide)(或HTML文档分区元素)是一个通用型的流内容容器，它在语义上不代表任何特定类型的内容，它可以被用来对其它元素进行分组，一般用于样式化相关的需求(使用class或id特性)或者对具有相同特性的一组元素进行分组(比如lang)，它应该在没有任何其它语义元素可用时才使用(比如`<article>`或`<nav>`)
   
<p>&nbsp;</p>

### hr

&emsp;&emsp;`<hr>`元素表示段落级元素之间的主题转换(例如，一个故事中的场景的改变，或一个章节的主题的改变)。在HTML的早期版本中，它是一个水平线。现在它仍能在可视化浏览器中表现为水平线，但目前被定义为语义上的，而不是表现层面上

&emsp;&emsp;`<hr>`用于段落级元素之间的分割，区块之间不需要使用`<hr>`进行分割

    <p>段落1</p>
    <hr>
    <p>段落2</p>

<iframe width="300" height="130" src="https://demo.xiaohuochai.site/html/block/b3.html" frameborder="0"></iframe> 


【默认样式】

    margin: 8px 0;
    border-style: inset;
    border-width: 1px;



<p>&nbsp;</p>

### pre

&emsp;&emsp;`<pre>`元素表示预定义格式文本。在该元素中的文本通常按照原文件中的编排，以等宽字体的形式展现出来，文本中的空白符(比如空格和换行符)都会显示出来，通常表示已排版的内容，如代码块和字符画等

    <pre>
    body {
      color:red;
    }
    </pre>

<iframe width="300" height="80" src="https://demo.xiaohuochai.site/html/block/b4.html" frameborder="0"></iframe> 

【默认样式】

    margin: 1em 0;
    white-space: pre;


<p>&nbsp;</p>

### blockquote

&emsp;&emsp;`<blockquote>`元素(或者HTML块级引用元素)，代表其中的文字是引用内容。通常在渲染时，这部分的内容会有一定的缩进。若引文来源于网络，则可以将原内容的出处URL地址设置到cite特性上，若要以文本的形式告知读者引文的出处时，可以通过`<cite>`元素


&emsp;&emsp;[注意]引用的署名必须在引用外部定义

    <blockquote cite="http://baike.baidu.com/view/921793.htm">
    　　<p>横眉冷对千夫指,俯首甘为孺子牛</p>
    </blockquote>    
    <p>鲁迅</p>

<iframe width="300" height="150" src="https://demo.xiaohuochai.site/html/block/b5.html" frameborder="0"></iframe> 

【默认样式】

    margin: 1em  40px;


<p>&nbsp;</p>

### address

&emsp;&emsp;`<address>`元素可以让作者为它最近的`<article>`或者`<body>`祖先元素提供联系信息。在后一种情况下，它应用于整个文档

&emsp;&emsp;当表示一个和联系信息无关的任意的地址时，使用`<p>`元素而不是`<address>`元素。这个元素不能包含除了联系信息之外的任何信息，比如出版日期(这应该包含在`<time>`元素中)。通常，`<address>`元素可以放在当前section的`<footer>`元素中，如果存在的话

【默认样式】

    font-style: italic;


<p>&nbsp;</p>


### 其他

&emsp;&emsp;除了上面介绍的`<div>`、`<h>`、`<p>`、`<hr>`、`<blockquote>`、`<address>`标签外，还有一些前面已经介绍过的标签属于块级标签


&emsp;&emsp;包括<a href="http://www.cnblogs.com/xiaohuochai/p/6216649.html" target="_blank">骨架类</a>标签(`<html>`、`<body>`)，<a href="http://www.cnblogs.com/xiaohuochai/p/5046656.html" target="_blank">列表类</a>标签(`<ul>`、`<ol>`、`<dl>`、`<dd>`、`<dt>`)，<a href="http://www.cnblogs.com/xiaohuochai/p/5174891.html" target="_blank">表单类</a>标签(`form`、`<fieldset>`、`<output>`、`<legend>`、`<optgroup>`、`<option>`)，HTML5新增的<a href="http://www.cnblogs.com/xiaohuochai/p/5087815.html" target="_blank">结构</a>标签(`<article>`、`<aside>`、`<header>`、`<footer>`、`<nav>`、`<section>`)，HTML5新增的<a href="http://www.cnblogs.com/xiaohuochai/p/5008341.html" target="_blank">多媒体</a>标签(`<figure>`、`<figcaption>`)，HTML5新增的<a href="http://www.cnblogs.com/xiaohuochai/p/5090109.html" target="_blank">功能性</a>标签(`<summary>`、`<details>`)



<p>&nbsp;</p>


## 最后

&emsp;&emsp;可能有人会觉得`<br>`标签应该是一个块级元素，因为它有换行，与块级元素的特征很相似。但它实际上是一个内联元素，它的用途是在文本中产生一个换行

