# 深入理解DOM节点类型第一篇——12种DOM节点类型概述

&emsp;&emsp;DOM是javascript操作网页的接口，全称为文档对象模型(Document Object Model)。它的作用是将网页转为一个javascript对象，从而可以使用javascript对网页进行各种操作(比如增删内容)。浏览器会根据DOM模型，将HTML文档解析成一系列的节点，再由这些节点组成一个树状结构。DOM的最小组成单位叫做节点(node)，文档的树形结构(DOM树)由12种类型的节点组成。本文将主要说明DOM节点类型

&nbsp;

### 总括

&emsp;&emsp;一般地，节点至少拥有nodeType、nodeName和nodeValue这三个基本属性。节点类型不同，这三个属性的值也不相同

**nodeType**

&emsp;&emsp;nodeType属性返回节点类型的常数值。不同的类型对应不同的常数值，12种类型分别对应1到12的常数值

<div>
<pre>元素节点             Node.ELEMENT_NODE(1)
属性节点            　　Node.ATTRIBUTE_NODE(2)
文本节点            　　Node.TEXT_NODE(3)
CDATA节点             Node.CDATA_SECTION_NODE(4)
实体引用名称节点    　　 Node.ENTRY_REFERENCE_NODE(5)
实体名称节点        　　Node.ENTITY_NODE(6)
处理指令节点        　　Node.PROCESSING_INSTRUCTION_NODE(7)
注释节点            　 Node.COMMENT_NODE(8)
文档节点            　 Node.DOCUMENT_NODE(9)
文档类型节点        　　Node.DOCUMENT_TYPE_NODE(10)
文档片段节点        　　Node.DOCUMENT_FRAGMENT_NODE(11)
DTD声明节点            Node.NOTATION_NODE(12)</pre>
</div>

&emsp;&emsp;DOM定义了一个Node接口，这个接口在javascript中是作为Node类型实现的，而在IE8-浏览器中的所有DOM对象都是以COM对象的形式实现的。所以，IE8-浏览器并不支持Node对象的写法

<div>
<pre>//在标准浏览器下返回1，而在IE8-浏览器中报错，提示Node未定义
console.log(Node.ELEMENT_NODE);//1</pre>
</div>

**nodeName**

&emsp;&emsp;nodeName属性返回节点的名称

**nodeValue**

&emsp;&emsp;nodeValue属性返回或设置当前节点的值，格式为字符串

&emsp;&emsp;接下来，将按照节点类型的常数值对应顺序，从1到12进行详细说明

&nbsp;

### 元素节点

&emsp;&emsp;[元素节点element](http://www.cnblogs.com/xiaohuochai/p/5819638.html)对应网页的HTML标签元素。元素节点的节点类型nodeType值是1，节点名称nodeName值是大写的标签名，nodeValue值是null

&emsp;&emsp;以body元素为例

<div>
<pre>// 1 'BODY' null
console.log(document.body.nodeType,document.body.nodeName,document.body.nodeValue)
console.log(Node.ELEMENT_NODE === 1);//true</pre>
</div>

&nbsp;

### 特性节点

&emsp;&emsp;元素[特性节点attribute](http://www.cnblogs.com/xiaohuochai/p/5820076.html)对应网页中HTML标签的属性，它只存在于元素的attributes属性中，并不是DOM文档树的一部分。特性节点的节点类型nodeType值是2，节点名称nodeName值是属性名，nodeValue值是属性值

&emsp;&emsp;现在，div元素有id="test"的属性

<div>
<pre>&lt;div id="test"&gt;&lt;/div&gt;
&lt;script&gt;
var attr = test.attributes.id;
//2 'id' 'test'
console.log(attr.nodeType,attr.nodeName,attr.nodeValue)
console.log(Node.ATTRIBUTE_NODE === 2);//true    
&lt;/script&gt;</pre>
</div>

&nbsp;

### 文本节点

&emsp;&emsp;[文本节点text](http://www.cnblogs.com/xiaohuochai/p/5815193.html)代表网页中的HTML标签内容。文本节点的节点类型nodeType值是3，节点名称nodeName值是'#text'，nodeValue值是标签内容值

&emsp;&emsp;现在，div元素内容为'测试'

<div>
<pre>&lt;div id="test"&gt;测试&lt;/div&gt;
&lt;script&gt;
var txt = test.firstChild;
//3 '#text' '测试'
console.log(txt.nodeType,txt.nodeName,txt.nodeValue)
console.log(Node.TEXT_NODE === 3);//true    
&lt;/script&gt;</pre>
</div>

&nbsp;

### CDATA节点

&emsp;&emsp;CDATASection类型只针对基于XML的文档，只出现在XML文档中，表示的是CDATA区域，格式一般为

<div>
<pre>&lt;![CDATA[
]]&gt;</pre>
</div>

&emsp;&emsp;该类型节点的节点类型nodeType的值为4，节点名称nodeName的值为'#cdata-section'，nodevalue的值是CDATA区域中的内容

&nbsp;

### 实体引用名称节点

&emsp;&emsp;实体是一个声明，指定了在XML中取代内容或标记而使用的名称。 实体包含两个部分， 首先，必须使用实体声明将名称绑定到替换内容。 实体声明是使用 &lt;!ENTITY name "value"&gt; 语法在文档类型定义(DTD)或XML架构中创建的。其次，在实体声明中定义的名称随后将在 XML 中使用。 在XML中使用时，该名称称为实体引用。

&emsp;&emsp;实体引用名称节点entry_reference的节点类型nodeType的值为5，节点名称nodeName的值为实体引用的名称，nodeValue的值为null

<div>
<pre>//实体名称
&lt;!ENTITY publisher "Microsoft Press"&gt;
//实体名称引用
&lt;pubinfo&gt;Published by &amp;publisher;&lt;/pubinfo&gt;</pre>
</div>

&nbsp;

### 实体名称节点

&emsp;&emsp;上面已经详细解释过，就不再赘述

&emsp;&emsp;该节点的节点类型nodeType的值为6，节点名称nodeName的值为实体名称，nodeValue的值为null

&nbsp;

### 处理指令节点

&emsp;&emsp;处理指令节点ProcessingInstruction的节点类型nodeType的值为7，节点名称nodeName的值为target，nodeValue的值为entire content excluding the target

&nbsp;

### 注释节点

&emsp;&emsp;[注释节点comment](http://www.cnblogs.com/xiaohuochai/p/5815801.html#anchor1)表示网页中的HTML注释。注释节点的节点类型nodeType的值为8，节点名称nodeName的值为'#comment'，nodeValue的值为注释的内容

&emsp;&emsp;现在，在id为myDiv的div元素中存在一个&lt;!-- 我是注释内容 --&gt;

<div>
<pre>&lt;div id="myDiv"&gt;&lt;!-- 我是注释内容 --&gt;&lt;/div&gt;
&lt;script&gt;
var com = myDiv.firstChild;
//8 '#comment' '我是注释内容'
console.log(com.nodeType,com.nodeName,com.nodeValue)
console.log(Node.COMMENT_NODE === 8);//true    
&lt;/script&gt;</pre>
</div>

&nbsp;

### 文档节点

&emsp;&emsp;[文档节点document](http://www.cnblogs.com/xiaohuochai/p/5821803.html)表示HTML文档，也称为根节点，指向document对象。文档节点的节点类型nodeType的值为9，节点名称nodeName的值为'#document'，nodeValue的值为null

<div>
<pre>&lt;script&gt;
//9 "#document" null
console.log(document.nodeType,document.nodeName,document.nodeValue)
console.log(Node.DOCUMENT_NODE === 9);//true    
&lt;/script&gt;</pre>
</div>

&nbsp;

### 文档类型节点

&emsp;&emsp;[文档类型节点DocumentType](http://www.cnblogs.com/xiaohuochai/p/5815801.html#anchor2)包含着与文档的doctype有关的所有信息。文档类型节点的节点类型nodeType的值为10，节点名称nodeName的值为doctype的名称，nodeValue的值为null

<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;script&gt;
var nodeDocumentType = document.firstChild;
//10 "html" null
console.log(nodeDocumentType.nodeType,nodeDocumentType.nodeName,nodeDocumentType.nodeValue);
console.log(Node.DOCUMENT_TYPE_NODE === 10);
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>

&nbsp;

### 文档片段节点

&emsp;&emsp;[文档片段节点DocumentFragment](http://www.cnblogs.com/xiaohuochai/p/5816048.html)在文档中没有对应的标记，是一种轻量级的文档，可以包含和控制节点，但不会像完整的文档那样占用额外的资源。该节点的节点类型nodeType的值为11，节点名称nodeName的值为'#document-fragment'，nodeValue的值为null

<div>
<pre>&lt;script&gt;
var nodeDocumentFragment = document.createDocumentFragment();    
//11 "#document-fragment" null
console.log(nodeDocumentFragment.nodeType,nodeDocumentFragment.nodeName,nodeDocumentFragment.nodeValue);
console.log(Node.DOCUMENT_FRAGMENT_NODE === 11);//true
&lt;/script&gt;</pre>
</div>

&nbsp;

### DTD声明节点

&emsp;&emsp;DTD声明节点notation代表DTD中声明的符号。该节点的节点类型nodeType的值为12，节点名称nodeName的值为符号名称，nodeValue的值为null

&nbsp;

## 最后

&emsp;&emsp;在这12种DOM节点类型中，有一些适用于XML文档，有一些是不常用的类型。而对于常用类型，后面会陆续进行详细介绍，本文对这12种节点类型只做概述

