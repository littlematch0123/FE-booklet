# 深入理解DOM节点类型第五篇——元素节点Element

&emsp;&emsp;元素节点Element非常常用，是DOM文档树的主要节点；元素节点是HTML标签元素的DOM化结果。元素节点主要提供了对元素标签名、子节点及特性的访问，本文将详细介绍元素节点的主要内容

&nbsp;

### 特征

&emsp;&emsp;元素节点的三个node属性&mdash;&mdash;nodeType、nodeName、nodeValue分别是1、元素的大写标签名和null，其父节点parentNode指向包含该元素节点的元素节点Element或文档节点Document

&emsp;&emsp;注意：要访问元素的标签名可以使用nodeName，也可以使用tagName属性，这两个属性会返回相同的值

<div>
<pre>&lt;div id="test"&gt;123&lt;/div&gt;
&lt;script&gt;
console.log(test.nodeType);//1
console.log(test.nodeName);//'DIV'
console.log(test.nodeValue);//null
console.log(test.parentNode);//&lt;body&gt;
console.log(test.childNodes);//[text]
console.log(test.tagName,test.tagName === test.nodeName);//'DIV' true
&lt;/script&gt;</pre>
</div>

&nbsp;

### 子节点

&emsp;&emsp;元素可以有任意数目的子节点和后代节点，因为元素可以是其他元素的子节点。元素的childNodes属性中包含了它的所有子节点，这些子节点可能是元素、[文本](http://www.cnblogs.com/xiaohuochai/p/5815193.html)、[注释](http://www.cnblogs.com/xiaohuochai/p/5815801.html#anchor1)、处理指令节点

<div>
<pre>&lt;ul class="list" id="list"&gt;
    &lt;li class="in"&gt;&lt;/li&gt;
    &lt;li class="in"&gt;&lt;/li&gt;
&lt;/ul&gt;
&lt;script&gt;
var oList = document.getElementById('list');
//IE8-浏览器返回2,其他浏览器返回5。因为IE8-浏览器子节点中不包含空白文本节点
//关于空白文本节点的详细内容[移步至此](http://www.cnblogs.com/xiaohuochai/p/5815193.html#anchor2)
console.log(oList.childNodes.length)
&lt;/script&gt;</pre>
</div>

**兼容**

&emsp;&emsp;可以通过检查nodeType属性来只获取元素节点

<div>
<pre>&lt;ul class="list" id="list"&gt;
    &lt;li class="in"&gt;&lt;/li&gt;
    &lt;li class="in"&gt;&lt;/li&gt;
&lt;/ul&gt;
&lt;script&gt;
var oList = document.getElementById('list');
var children = oList.childNodes;
var num = 0;
for(var i = 0; i &lt; children.length; i++){
    if(children[i].nodeType == 1){
        num++;
    }
}
console.log(num);//2   
&lt;/script&gt;</pre>
</div>

&nbsp;

### 特性操作

&emsp;&emsp;每个元素都有一个或多个特性，这些特性的用途是给出相应元素或其内容的附加信息。操作特性的DOM方法主要有hasAttribute()、getAttribute()、setAttribute()、removeAttribute()四个，可以针对任何特性使用，包括那些以HTMLElement类型属性的形式定义的特性

**hasAttribute()**

&emsp;&emsp;hasAttribute()方法返回一个布尔值，表示当前元素节点是否包含指定属性

&emsp;&emsp;注意：IE7-浏览器不支持hasAttribute()方法

<div>
<pre>&lt;div id="test" class="class1"&gt;&lt;/div&gt;
&lt;script&gt;
console.log(test.hasAttribute('class'));//true
console.log(test.hasAttribute('title'));//false
&lt;/script&gt;</pre>
</div>

**getAttribute()**

&emsp;&emsp;getAttribute()方法用于取得特性的值，如果给定名称的特性不存在或无参数则返回null

<div>
<pre>&lt;div id="test" class="class1"&gt;&lt;/div&gt;
&lt;script&gt;
console.log(test.getAttribute('class'));//'class1'
console.log(test.getAttribute('title'));//null
console.log(test.getAttribute('b'));//null
console.log(test.getAttribute(''));//null
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;注意：元素特性和对象属性并不相同，二者的区别详细情况[移步至此](http://www.cnblogs.com/xiaohuochai/p/5817608.html)

**setAttribute()**

&emsp;&emsp;setAttribute()方法接受两个参数：要设置的特性名和值，如果已经存在，则替换现有的值。如果特性不存在，setAttribute()则创建该属性并设置相应的值。该方法无返回值

<div>
<pre>&lt;div id="box"&gt;123&lt;/div&gt;
&lt;script&gt;
var oBox = document.getElementById('box');
oBox.setAttribute("id","test");
//注意获取oBox.id时并不会报错，因为oBox保存的是当时id为box的对象，也就是现在id为test的对象
console.log(oBox.id);//test
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;注意：通过setAttrbute()方法设置的特性名会统一转换成小写形式

<div>
<pre>&lt;div id="box"&gt;123&lt;/div&gt;
&lt;script&gt;
var oBox = document.getElementById('box');
oBox.setAttribute("ABC","test");
console.log(oBox.getAttribute("ABC"));//test
console.log(oBox.getAttribute("abc"));//test
&lt;/script&gt;</pre>
</div>

**bug**

&emsp;&emsp;IE7-浏览器设置class、style、for、cellspacing、cellpadding、tabindex、readonly、maxlength、rowspan、colspan、usemap、frameborder、contenteditable这13个特性没有任何效果

<div>
<pre>&lt;style&gt;
.testClass{
    font-size: 30px;
}
&lt;/style&gt;    

&lt;div id="box"&gt;123&lt;/div&gt;
&lt;script&gt;
//IE7-浏览器下没有任何效果，其他浏览器出现红色背景及30px的文字大小
var oBox = document.getElementById('box');
oBox.setAttribute("class","testClass");
oBox.setAttribute("style","height: 100px; background: red;")
&lt;/script&gt;     </pre>
</div>

&emsp;&emsp;可以利用IE7-浏览器下对象属性和元素特性的[混淆bug](http://www.cnblogs.com/xiaohuochai/p/5817608.html#anchor6)来设置

<div>
<pre>&lt;style&gt;
.testClass{
    font-size: 30px;
}
&lt;/style&gt;    
&lt;div id="box"&gt;123&lt;/div&gt;
&lt;script&gt;
var oBox = document.getElementById('box');
oBox.setAttribute("class","testClass");
oBox.setAttribute("style","height: 100px; background: red;");
//IE7下oBox.className的值为undefined
if(!oBox.className){
    oBox.setAttribute("className","testClass");
    oBox.style.setAttribute("cssText","height: 100px; background: red;");
}
&lt;/script&gt; </pre>
</div>

**removeAttribute()**

&emsp;&emsp;removeAttribute()方法用于彻底删除元素的特性，这个方法不仅会彻底删除元素的特性值，还会删除元素特性。该方法无返回值

<div>
<pre>&lt;div class="box" id="box"&gt;&lt;/div&gt;
&lt;script&gt;
var oBox = document.getElementById('box');
console.log(oBox.getAttribute("id"));//box
console.log(oBox.removeAttribute("id"));//undefined
console.log(oBox.getAttribute("id"));//null    
&lt;/script&gt;</pre>
</div>

&nbsp;

### attributes属性

&emsp;&emsp;元素节点Element是唯一一个使用attributes属性的DOM节点类型。attributes属性中包含一个NamedNodeMap，与NodeList类似，也是一个动态的集合。元素的每一个特性都由一个Attr节点表示，每个节点都保存在NamedNodeMap对象中，每个节点的nodeName就是特性的名称，节点的nodeValue就是特性的值

&emsp;&emsp;attributes属性包含以下四个方法

**getNamedItem(name)**

&emsp;&emsp;getNamedItem(name)方法返回nodeName属性等于name的节点

<div>
<pre>&lt;div class="box" id="box" name="abc" index="123" title="test"&gt;&lt;/div&gt;
&lt;script&gt;
var oBox = document.getElementById('box');
console.log(oBox.attributes);//NamedNodeMap {0: class, 1: id, 2: name, 3: index, 4: title}
console.log(oBox.attributes.getNamedItem("index"));//index='123'
console.log(oBox.attributes.getNamedItem("index").nodeName);//'index'
console.log(oBox.attributes.getNamedItem("index").nodeValue);//'123'
console.log(oBox.attributes.index);//index='123'
&lt;/script&gt;</pre>
</div>

**removeNamedItem(name)**

&emsp;&emsp;removeNamedItem(name)方法从列表中移除nodeName属性等于name的节点，并返回该节点

<div>
<pre>&lt;div class="box" id="box" name="abc" index="123" title="test"&gt;&lt;/div&gt;
&lt;script&gt;
var oBox = document.getElementById('box');
console.log(oBox.attributes);//NamedNodeMap {0: class, 1: id, 2: name, 3: index, 4: title}
console.log(oBox.attributes.getNamedItem("index"));//index='123'
console.log(oBox.attributes.removeNamedItem("index"));//index='123'
console.log(oBox.attributes.getNamedItem("index"));//null
&lt;/script&gt;</pre>
</div>

**setNamedItem(node)**

&emsp;&emsp;setNamedItem(node)方法向列表中添加节点，该方法无返回值

<div>
<pre>&lt;div class="box" id="box" name="abc" index="123" title="test"&gt;&lt;/div&gt;
&lt;script&gt;
var oBox = document.getElementById('box');
console.log(oBox.attributes);//NamedNodeMap {0: class, 1: id, 2: name, 3: index, 4: title}
var oldItem = oBox.attributes.removeNamedItem("index");
console.log(oBox.attributes.getNamedItem("index"));//null
console.log(oldItem);//index='123'
console.log(oBox.attributes.setNamedItem(oldItem));//null
console.log(oBox.attributes.getNamedItem("index"));//index='123'
&lt;/script&gt;</pre>
</div>

**item(pos)**

&emsp;&emsp;item(pos)方法返回位于数字pos位置处的节点，也可以用方括号法[]简写

<div>
<pre>&lt;div class="box" id="box" name="abc" index="123" title="test"&gt;&lt;/div&gt;
&lt;script&gt;
var oBox = document.getElementById('box');
console.log(oBox.attributes);//NamedNodeMap {0: class, 1: id, 2: name, 3: index, 4: title}
console.log(oBox.attributes.item(2));//name="abc"
console.log(oBox.attributes[2]);//name="abc"
&lt;/script&gt;</pre>
</div>

**遍历**

&emsp;&emsp;attributes属性主要用于特性遍历。在需要将DOM结构序列化为HTML字符串时，多数都会涉及遍历元素特性

<div>
<pre>function outputAttributes(element){
    var pairs = new Array(),attrName,attrValue,i,len;
    for(i = 0,len=element.attributes.length;i&lt;len;i++){
        attrName = element.attributes[i].nodeName;
        attrValue = element.attributes[i].nodeValue;
        pairs.push(attrName +"=\"" + attrValue + "\"");
    }
    return pairs.join(" ");
}</pre>
</div>

&emsp;&emsp;针对attributes对象中的特性，不同浏览器返回的顺序不同

<div>
<pre>&lt;div class="box" id="box" name="abc" index="123" title="test"&gt;&lt;/div&gt;
&lt;script&gt;
function outputAttributes(element){
    var pairs = new Array(),attrName,attrValue,i,len;
    for(i = 0,len=element.attributes.length;i&lt;len;i++){
        attrName = element.attributes[i].nodeName;
        attrValue = element.attributes[i].nodeValue;
        pairs.push(attrName +"=\"" + attrValue + "\"");
    }
    return pairs.join(" ");
}
//(chrome\safari)class="box" id="box" name="abc" index="123" title="test"
//(firefox)title="test" index="123" name="abc" id="box" class="box"
//(IE8+)title="test" class="box" id="box" index="123" name="abc"
//(IE7-)输出所有的特性
console.log(outputAttributes(document.getElementById("box")))
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;由上面结果看出，IE7-浏览器会返回HTML元素中所有可能的特性，包括没有指定的特性

**specified**

&emsp;&emsp;可以利用特性节点的specified属性来解决IE7-浏览器的这个问题。如果specified属性的值为true，则意味着该属性被设置过。在IE中，所有未设置过的特性的该属性值都是false。而在其他浏览器中，任何特性节点的specified值始终为true

<div>
<pre>&lt;div id="box" name="abc" index="123" title="test"&gt;&lt;/div&gt;
&lt;script&gt;
var oBox = document.getElementById('box');
var yesItem = oBox.attributes.getNamedItem("index");
var noItem = oBox.attributes.getNamedItem("onclick");
//所有浏览器浏览器都返回true
console.log(yesItem.specified);
//IE7-浏览器返回false，而其他浏览器报错，noItem不存在
console.log(noItem.specified);
&lt;/script&gt;</pre>
</div>
<div>
<pre>&lt;div class="box" id="box" name="abc" index="123" title="test"&gt;&lt;/div&gt;
&lt;script&gt;
function outputAttributes(element){
    var pairs = new Array(),attrName,attrValue,i,len;
    for(i = 0,len=element.attributes.length;i&lt;len;i++){
        attrName = element.attributes[i].nodeName;
        attrValue = element.attributes[i].nodeValue;
        if(element.attributes[i].specified){
            pairs.push(attrName +"=\"" + attrValue + "\"");    
        }
    }
    return pairs.join(" ");
}
//所有浏览器下都返回title="test" class="box" id="box" index="123" name="abc"(顺序不一样)
console.log(outputAttributes(document.getElementById("box")))
&lt;/script&gt; </pre>
</div>

&nbsp;

## 最后

&emsp;&emsp;如果从头到尾看完这篇博文，会发现全篇篇幅最多的内容是特性的设置。特性设置不是应该在特性节点上吗？特性节点可以设置，但是使用元素节点来操作特性更方便。元素节点的内容还包括元素节点的操作，但是由于在[节点操作博文](http://www.cnblogs.com/xiaohuochai/p/5787459.html)中已经详细介绍过，就不再赘述

&emsp;&emsp;下一篇将介绍特性节点

&emsp;&emsp;欢迎交流
