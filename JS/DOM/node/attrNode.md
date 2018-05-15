# 深入理解DOM节点类型第六篇——特性节点Attribute

&emsp;&emsp;元素的特性在DOM中以Attr类型表示，从技术角度讲，特性是存在于元素的[attributes属性](http://www.cnblogs.com/xiaohuochai/p/5819638.html#anchor4)中的节点。尽管特性是节点，但却不是DOM节点树的一部分。本文将详细介绍该部分内容

&nbsp;

### 特征

&emsp;&emsp;特性节点的三个node属性&mdash;&mdash;&mdash;&mdash;nodeType、nodeName、nodeValue分别是2、特性名称和特性值，其父节点parentNode是null

&emsp;&emsp;注意：关于特性节点是否存在子节点，各个浏览器表现不一致

<div>
<pre>&lt;div id="box"&gt;&lt;/div&gt;
&lt;script&gt;
var oBox = document.getElementById('box');
var oAttr = oBox.attributes;
//(chrome\safari\IE9+\firefox) 2 id box null
//(IE7-) 2 onmsanimationiteration null null
console.log(oAttr[0].nodeType,oAttr[0].nodeName,oAttr[0].value,oAttr[0].parentNode)
//(chrome\firefox) undefined
//(safari) Text
//(IE9+) box
//(IE8-) 报错
console.log(oAttr[0].childNodes[0])
&lt;/script&gt; </pre>
</div>

&nbsp;

### 属性

&emsp;&emsp;Attr特性节点有3个属性：name、value和specified

**name**　

&emsp;&emsp;name是特性名称，与nodeName的值相同

**value**

&emsp;&emsp;value是特性的值，与nodeValue的值相同

**specified**

&emsp;&emsp;specified是一个布尔值，用以区别特性是在代码中指定的，还是默认的。这个属性的值如果为true，则意味着要么是在HTML中指定了相应特性，要么是通过setAttribute()方法设置了该属性。在IE中，所有未设置过的特性的该属性值都为false，而在其他浏览器中，所有设置过的特性的该属性值都是true，未设置过的特性，如果强行为其设置specified属性，则报错。因为undefied没有属性

<div>
<pre>&lt;div class="box" id="box"&gt;&lt;/div&gt;
&lt;script&gt;
var oBox = document.getElementById('box');
var oAttr = oBox.attributes;
//(chrome\safari\IE8+)class class true
//(firefox)id id true
//(IE7-)onmsanimationiteration onmsanimationiteration true
console.log(oAttr[0].name,oAttr[0].nodeName,oAttr[0].name == oAttr[0].nodeName)
//IE7- "null" null false
//其他浏览器 box box true
console.log(oAttr[0].value,oAttr[0].nodeValue,oAttr[0].value == oAttr[0].nodeValue)
//IE7- false
//其他浏览器 true
console.log(oAttr[0].specified)//true
&lt;/script&gt;</pre>
</div>
<div>
<pre>&lt;div class="box" id="box" name="abc" index="123" title="test"&gt;&lt;/div&gt;
&lt;script&gt;    
var oBox = document.getElementById('box');
console.log(oBox.attributes.id.specified)//true
console.log(oBox.attributes.onclick.specified)//在IE7-浏览器下会返回false，在其他浏览器下会报错
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;specified常常用于解决IE7-浏览器显示所有特性的bug

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

### 方法

**createAttribute()**

&emsp;&emsp;createAttribute()方法传入特性名称并创建新的特性节点

**setAttributeNode()**

&emsp;&emsp;setAttributeNode()方法传入特性节点并将特性添加到元素上，无返回值

**getAttributeNode()**

&emsp;&emsp;getAttributeNode()方法传入特性名并返回特性节点

**removeAttributeNode()**

&emsp;&emsp;removeAttributeNode()方法传入特性名删除并返回删除的特性节点，但IE7-浏览器下无法删除

<div>
<pre>&lt;div id="box"&gt;&lt;/div&gt;
&lt;script&gt;
var oBox = document.getElementById('box');
var attr = document.createAttribute('title');
attr.value = "test";
console.log(oBox.setAttributeNode(attr));//null
console.log(oBox.getAttributeNode("title").name,attr.name);//title title
console.log(oBox.getAttributeNode("title").value,attr.value);//test test
//返回删除的节点
console.log(oBox.removeAttributeNode(attr));
//IE7-浏览器下无法删除，其他浏览器返回null
console.log(oBox.getAttributeNode("title"));
&lt;/script&gt;</pre>
</div>

&nbsp;

## 最后

&emsp;&emsp;特性节点在[12种节点类型](http://www.cnblogs.com/xiaohuochai/p/5785189.html)中排行老二，但是其属性和方法并不常用，因为[元素节点](http://www.cnblogs.com/xiaohuochai/p/5819638.html)都有对应的可替代的方法，而且使用起来更为方便

&emsp;&emsp;本文的重点再重复一次：特性是节点，但不存在DOM树中

&emsp;&emsp;以上

