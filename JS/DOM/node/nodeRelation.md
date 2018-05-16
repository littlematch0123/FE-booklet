# 深入理解DOM节点关系

&emsp;&emsp;DOM可以将任何HTML描绘成一个由多层节点构成的结构。节点分为12种不同[类型](http://www.cnblogs.com/xiaohuochai/p/5785189.html)，每种类型分别表示文档中不同的信息及标记。每个节点都拥有各自的特点、数据和方法，也与其他节点存在某种关系。节点之间的关系构成了层次，而所有页面标记则表现为一个以特定节点为根节点的树形结构。本文将详细描述DOM间的节点关系

![nodeRelation](https://pic.xiaohuochai.site/blog/JS_DOM_node_nodeRelation.jpg)

&emsp;&emsp;节点中的各种关系可以用传统的家族关系来描述，相当于把文档树比喻成家谱。接下来，将把DOM节点关系分为属性和方法两部分进行详细说明

&nbsp;

## 属性

### 父级属性

**parentNode**

&emsp;&emsp;每个节点都有一个parentNode属性，该属性指向文档树中的父节点。对于一个节点来说，它的父节点只可能是三种类型：element节点、document节点和documentfragment节点。如果不存在，则返回null

<div>
<pre>&lt;div id="myDiv"&gt;&lt;/div&gt;
&lt;script&gt;
console.log(myDiv.parentNode);//body
console.log(document.body.parentNode);//html
console.log(document.documentElement.parentNode);//document
console.log(document.parentNode);//null
&lt;/script&gt;</pre>
</div>
<div>
<pre>&lt;div id="myDiv"&gt;&lt;/div&gt;
&lt;script&gt;
var myDiv = document.getElementById('myDiv');
console.log(myDiv.parentNode);//body
var fragment = document.createDocumentFragment();
fragment.appendChild(myDiv);
console.log(myDiv.parentNode);//document-fragment
&lt;/script&gt;</pre>
</div>

**parentElement**

&emsp;&emsp;与parentNode属性不同的是，parentElement返回的是父元素节点

<div>
<pre>&lt;div id="myDiv"&gt;&lt;/div&gt;
&lt;script&gt;
console.log(myDiv.parentElement);//body
console.log(document.body.parentElement);//html
console.log(document.documentElement.parentElement);//null
console.log(document.parentElement);//null
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;&nbsp;注意：在IE浏览器中，只有[Element元素节点](http://www.cnblogs.com/xiaohuochai/p/5819638.html)才有该属性，其他浏览器则是所有类型的节点都有该属性

<div>
<pre>&lt;div id="test"&gt;123&lt;/div&gt;
&lt;script&gt;
//IE浏览器返回undefined，其他浏览器返回&lt;div id="test"&gt;123&lt;/div&gt;
console.log(test.firstChild.parentElement);
//所有浏览器都返回&lt;body&gt;
console.log(test.parentElement);
&lt;/script&gt;</pre>
</div>

&nbsp;

### 子级属性

**childNodes**

&emsp;&emsp;childNodes是一个只读的类数组对象[NodeList对象](http://www.cnblogs.com/xiaohuochai/p/5827389.html#anchor1)，它保存着该节点的第一层子节点

<div>
<pre>&lt;ul id="myUl"&gt;&lt;li&gt;&lt;div&gt;&lt;/div&gt;&lt;/li&gt;&lt;/ul&gt;
&lt;script&gt;
var myUl = document.getElementById('myUl');
//结果是只包含一个li元素的类数组对象[li]
console.log(myUl.childNodes);
&lt;/script&gt;</pre>
</div>

**children**

&emsp;&emsp;children是一个只读的类数组对象[HTMLCollection对象](http://www.cnblogs.com/xiaohuochai/p/5827389.html#anchor2)，但它保存的是该节点的第一层元素子节点

<div>
<pre>&lt;div id="myDiv"&gt;123&lt;/div&gt;
&lt;script&gt;
var myDiv = document.getElementById('myDiv');
//childNodes包含所有类型的节点，所以输出[text]
console.log(myDiv.childNodes);
//children只包含元素节点，所以输出[]
console.log(myDiv.children);
&lt;/script&gt;</pre>
</div>

**childElementCount**

&emsp;&emsp;返回子元素节点的个数，相当于children.length

&emsp;&emsp;注意：IE8-浏览器不支持

<div>
<pre>&lt;ul id="myUl"&gt;
    &lt;li&gt;&lt;/li&gt;
    &lt;li&gt;&lt;/li&gt;
&lt;/ul&gt;
&lt;script&gt;
var myUl = document.getElementById('myUl');
console.log(myUl.childNodes.length);//5，IE8-浏览器返回2，因为不包括空文本节点
console.log(myUl.children.length);//2
console.log(myUl.childElementCount);//2，IE8-浏览器返回undefined
&lt;/script&gt;</pre>
</div>

**firstChild**

&emsp;&emsp;第一个子节点

**lastChild**

&emsp;&emsp;最后一个子节点

**firstElementChild**

&emsp;&emsp;第一个元素子节点

**lastElementChild**

&emsp;&emsp;最后一个元素子节点　

&emsp;&emsp;上面四个属性，IE8-浏览器和标准浏览器的表现并不一致。IE8-浏览器不考虑空白文本节点，且不支持firstElementChild和lastElementChild

<div>
<pre>//ul标签和li标签之间有两个空白文本节点，所以按照标准来说，ul的子节点包括[空白文本节点、li元素节点、空白文本节点]。但在IE8-浏览器中，ul的子节点只包括[li元素节点]
&lt;ul&gt;
    &lt;li&gt;&lt;/li&gt;
&lt;/ul&gt;</pre>
</div>
<div>
<pre>&lt;ul id="list"&gt;
    &lt;li&gt;1&lt;/li&gt;
    &lt;li&gt;2&lt;/li&gt;
    &lt;li&gt;3&lt;/li&gt;
&lt;/ul&gt;
&lt;script&gt;
console.log(list.firstChild);//标准浏览器中返回空白文本节点，IE8-浏览器中返回&lt;li&gt;1&lt;/li&gt;
console.log(list.lastChild);//标准浏览器中返回空白文本节点，IE8-浏览器中返回&lt;li&gt;3&lt;/li&gt;
console.log(list.firstElementChild);//标准浏览器中&lt;li&gt;1&lt;/li&gt;，IE8-浏览器中返回undefined
console.log(list.lastElementChild);//标准浏览器中&lt;li&gt;3&lt;/li&gt;，IE8-浏览器中返回undefined
&lt;/script&gt;</pre>
</div>

&nbsp;

### 同级属性

**nextSibling**

&emsp;&emsp;后一个节点

**previousSibling**

&emsp;&emsp;前一个节点

**nextElementSibling**

&emsp;&emsp;后一个元素节点

**previousElementSibling**

&emsp;&emsp;前一个元素节点

&emsp;&emsp;与子级属性类似，上面四个属性，IE8-浏览器和标准浏览器的表现并不一致。IE8-浏览器不考虑空白文本节点，且不支持nextElementSibling和previousElementSibling

<div>
<pre>&lt;ul&gt;
    &lt;li&gt;1&lt;/li&gt;
    &lt;li id="myLi"&gt;2&lt;/li&gt;
    &lt;li&gt;3&lt;/li&gt;
&lt;/ul&gt;
&lt;script&gt;
var myLi = document.getElementById('myLi');
console.log(myLi.nextSibling);//空白节点，IE8-浏览器返回&lt;li&gt;3&lt;/li&gt;
console.log(myLi.nextElementSibling);//&lt;li&gt;3&lt;/li&gt;，IE8-浏览器返回undefined
console.log(myLi.previousSibling);//空白节点，IE8-浏览器返回&lt;li&gt;1&lt;/li&gt;
console.log(myLi.previousElementSibling);//&lt;li&gt;1&lt;/li&gt;，IE8-浏览器返回undefined
&lt;/script&gt;</pre>
</div>

&nbsp;

## 方法

### 包含方法

**hasChildNodes()**

&emsp;&emsp;hasChildNodes()方法在包含一个或多个子节点时返回true，比查询childNodes列表的length属性更简单

<div>
<pre>&lt;div id="myDiv"&gt;123&lt;/div&gt;
&lt;script&gt;
var myDiv = document.getElementById('myDiv');
console.log(myDiv.childNodes.length);//1
console.log(myDiv.hasChildNodes());//true
&lt;/script&gt;</pre>
</div>
<div>
<pre>&lt;div id="myDiv"&gt;&lt;/div&gt;
&lt;script&gt;
var myDiv = document.getElementById('myDiv');
console.log(myDiv.childNodes.length);//0
console.log(myDiv.hasChildNodes());//false
&lt;/script&gt;</pre>
</div>

**contains()**

&emsp;&emsp;contains方法接受一个节点作为参数，返回一个布尔值，表示参数节点是否为当前节点的后代节点。参数为后代节点即可，不一定是第一层子节点　

<div>
<pre>&lt;div id="myDiv"&gt;
    &lt;ul id="myUl"&gt;
        &lt;li id="myLi"&gt;&lt;/li&gt;
        &lt;li&gt;&lt;/li&gt;
    &lt;/ul&gt;
&lt;/div&gt;
&lt;script&gt;
console.log(myDiv.contains(myLi));//true
console.log(myDiv.contains(myUl));//true
console.log(myDiv.contains(myDiv));//true
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;注意：IE和safari不支持document.contains()方法，只支持元素节点的contains()方法

<div>
<pre>//IE和safari报错，其他浏览器返回true
console.log(document.contains(document.body));</pre>
</div>

&nbsp;

### 关系方法

**compareDocumentPosition()**

&emsp;&emsp;compareDocumentPosition方法用于确定节点间的关系，返回一个表示该关系的位掩码

<div>
<pre>000000    0     两个节点相同
000001    1     两个节点不在同一个文档（即有一个节点不在当前文档）
000010    2     参数节点在当前节点的前面
000100    4     参数节点在当前节点的后面
001000    8     参数节点包含当前节点
010000    16    当前节点包含参数节点
100000    32    浏览器的私有用途</pre>
</div>
<div>
<pre>&lt;div id="myDiv"&gt;
    &lt;ul id="myUl"&gt;
        &lt;li id="myLi1"&gt;&lt;/li&gt;
        &lt;li id="myLi2"&gt;&lt;/li&gt;
    &lt;/ul&gt;
&lt;/div&gt;
&lt;script&gt;
//20=16+4，因为myUl节点被myDiv节点包含，也位于myDiv节点的后面
console.log(myDiv.compareDocumentPosition(myUl));
//10=8+2，因为myDiv节点包含myUl节点，也位于myUl节点的前面
console.log(myUl.compareDocumentPosition(myDiv));
//0，两个节点相同
console.log(myDiv.compareDocumentPosition(myDiv));
//4，myLi2在myLi1节点的后面
console.log(myLi1.compareDocumentPosition(myLi2));
//2，myLi1在myLi2节点的前面
console.log(myLi2.compareDocumentPosition(myLi1));
&lt;/script&gt;</pre>
</div>

**isSameNode()和isEqualNode()**

&emsp;&emsp;这两个方法都接受一个节点参数，并在传入节点与引用节点相同或相等时返回true

&emsp;&emsp;所谓相同(same)，指的是两个节点引用的是同一个对象

&emsp;&emsp;所谓相等(equal)，指的是两个节点是相同的类型，具有相等的属性(nodeName、nodeValue等等)，而且它们的attributes和childNodes属性也相等(相同位置包含相同的值)

&emsp;&emsp;注意：firefox不支持isSameNode()方法，而IE8-浏览器两个方法都不支持

<div>
<pre>&lt;script&gt;
var div1 = document.createElement('div');
div1.setAttribute("title","test");
var div2 = document.createElement('div');
div2.setAttribute("title","test");
console.log(div1.isSameNode(div1));//true
console.log(div1.isEqualNode(div2));//true
console.log(div1.isSameNode(div2));//false
&lt;/script&gt;</pre>
</div>
