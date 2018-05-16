# 深入理解javascript中的动态集合——NodeList、HTMLCollection和NamedNodeMap

&emsp;&emsp;一说起动态集合，多数人可能都有所了解。但是，如果再深入些，有哪些动态集合，以及这些动态集合有什么表现、区别和联系？可能好多人就要摇头了。本文就javascript中的动态集合做详细介绍

&nbsp;

### NodeList

&emsp;&emsp;NodeList实例对象是一个类数组对象，它的成员是节点对象，包括childNodes和[querySelectorAll()方法](http://www.cnblogs.com/xiaohuochai/p/5798014.html#anchor1)返回值

<div>
<pre>&lt;div id="test"&gt;&lt;/div&gt;
&lt;script&gt;
console.log(test.childNodes);//[]
//IE7-浏览器并未定义NodeList对象，会报错，其他浏览器返回true
console.log(test.childNodes instanceof NodeList)
&lt;/script&gt;</pre>
</div>
<div>
<pre>&lt;div id="test"&gt;&lt;/div&gt;
&lt;script&gt;
console.log(document.querySelectorAll('div'));//[div#test]
//IE8-浏览器不支持querySelectorAll()方法，返回false，其他浏览器返回true
console.log(document.querySelectorAll('div') instanceof NodeList)
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;动态集合是指DOM结构的变化能够自动反映到所保存的对象中

<div>
<pre>&lt;div id="test"&gt;&lt;/div&gt;
&lt;script&gt;
var childN = test.childNodes;
console.log(childN);//[]
test.appendChild(document.createElement('div'));
console.log(childN);//[div]
&lt;/script&gt;</pre>
</div>

**静态**

&emsp;&emsp;注意：NodeList并不都是动态集合，其中querySelectorAll()返回值就是静态集合NodeStaticList

<div>
<pre>&lt;div id="test"&gt;&lt;/div&gt;
&lt;script&gt;
var seles = test.querySelectorAll('div');
console.log(seles);//[]
test.appendChild(document.createElement('div'));
console.log(seles);//[]
console.log(test.querySelectorAll('div'));//[div]
&lt;/script&gt;</pre>
</div>

**数组**

&emsp;&emsp;由于NodeList是类数组对象，并不是真正的[数组](http://www.cnblogs.com/xiaohuochai/p/5679605.html)对象，可以使用slice()方法将其变成真正的数组

<div>
<pre>&lt;div id="test"&gt;&lt;/div&gt;
&lt;script&gt;
var childN = test.childNodes;
console.log(childN instanceof Array);//false
var childNew = Array.prototype.slice.call(childN);
console.log(childNew instanceof Array);//true
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;但是，由于IE8-浏览器将NodeList实现为一个COM对象，不能使用Array.prototype.slice()方法，必须手动枚举所有成员

<div>
<pre>&lt;div id="test"&gt;&lt;/div&gt;
&lt;script&gt;
var childN = test.childNodes;
console.log(childN instanceof Array);//false
function convertToArray(nodes){
    var array = null;
    try{
        array = Array.prototype.slice.call(nodes)
    }catch(ex){
        array = [];
        var len = nodes.length;
        for(var i = 0; i &lt; len; i++){
            array.push(nodes[i]);
        }
    }
    return array;
}
var childNew = convertToArray(childN);
console.log(childNew instanceof Array);//true
&lt;/script&gt;</pre>
</div>

&nbsp;

### HTMLCollection

&emsp;&emsp;HTMLCollection对象与NodeList对象类似，也是节点的集合，返回一个类数组对象。但二者有不同之处

&emsp;&emsp;NodeList集合主要是Node节点的集合，而HTMLCollection集合主要是Element元素节点的集合。Node节点共有12种，Element元素节点只是其中一种。关于12种节点类型的详细信息[移步至此](http://www.cnblogs.com/xiaohuochai/p/5785189.html)

&emsp;&emsp;HTMLCollection集合包括getElementsByTagName()、getElementsByClassName()、getElementsByName()等方法的返回值，以及children、document.links、document.forms等元素集合

<div>
<pre>&lt;div id="test"&gt;&lt;/div&gt;
&lt;script&gt;
var childN = test.children;
//IE7-浏览器并未定义HTMLCollection对象，会报错，其他浏览器返回true
console.log(childN instanceof HTMLCollection);
var tags =test.getElementsByTagName('div');
//IE7-浏览器并未定义HTMLCollection对象，会报错，其他浏览器返回true
console.log(tags instanceof HTMLCollection);
&lt;/script&gt;    </pre>
</div>

**动态**

&emsp;&emsp;与NodeList对象不同，所有的HTMLCollection对象都是动态的

<div>
<pre>&lt;div id="test"&gt;&lt;/div&gt;
&lt;script&gt;
var childN = test.children;
var tags =test.getElementsByTagName('div');
console.log(childN,tags);//[]、[]
test.innerHTML = '&lt;div&gt;&lt;/div&gt;';
console.log(childN,tags);//[div]、[div]
&lt;/script&gt;    </pre>
</div>

&emsp;&emsp;注意：与NodeList对象类似，要想变成真正的数组Array对象，需要使用slice()方法，在IE8-浏览器中，则必须手动枚举所有成员

&nbsp;

### NamedNodeMap

&emsp;&emsp;可能一些人没有听过NamedNodeMap对象，该对象的常见实例对象是[attributes属性](http://www.cnblogs.com/xiaohuochai/p/5819638.html#anchor4)

<div>
<pre>&lt;div id="test"&gt;&lt;/div&gt;
&lt;script&gt;
var attrs = test.attributes;
console.log(attrs instanceof NamedNodeMap);//true
&lt;/script&gt;</pre>
</div>

**动态**

&emsp;&emsp;该对象也是一个动态集合

<div>
<pre>&lt;div id="test"&gt;&lt;/div&gt;
&lt;script&gt;
var attrs = test.attributes;
console.log(attrs);//NamedNodeMap {0: id, length: 1}
test.setAttribute('title','123');
console.log(attrs);//NamedNodeMap {0: id, 1: title, length: 2}
&lt;/script&gt;</pre>
</div>

&nbsp;

### 注意事项

&emsp;&emsp;动态集合是个很实用的概念，但在使用循环时一定要千万小心。可能会因为忽略集合的动态性，造成死循环

<div>
<pre>var divs = document.getElementsByTagName("div");
for(var i = 0 ; i &lt; divs.length; i++){
    document.body.appendChild(document.createElement("div"));
}</pre>
</div>

&emsp;&emsp;在上面代码中，由于divs是一个HTMLElement集合，divs.length会随着appendChild()方法，而一直增加，于是变成一个死循环

&emsp;&emsp;为了避免此情况，一般地，可以写为下面形式

<div>
<pre>var divs = document.getElementsByTagName("div");
for(var i = 0,len = divs.length; i &lt; len; i++){
    document.body.appendChild(document.createElement("div"));
}</pre>
</div>

&emsp;&emsp;一般地，要尽量减少访问NodeList、HTMLCollection、NamedNodeMap的次数。因为每次访问它们，都会运行一次基于文档的查询。所以，可以考虑将它们的值缓存起来

&nbsp;

## 最后

&emsp;&emsp;NodeList是节点的集合，HTMLCollection是[元素节点](http://www.cnblogs.com/xiaohuochai/p/5819638.html)的集合，NamedNodeMap是[特性节点](http://www.cnblogs.com/xiaohuochai/p/5820076.html)的集合，它们都是类数组对象

&emsp;&emsp;对了，还有一个更经典的类数组对象&mdash;&mdash;[函数](http://www.cnblogs.com/xiaohuochai/p/5702813.html)内部的[arguments](http://www.cnblogs.com/xiaohuochai/p/5706289.html#anchor1)，它也具有动态性

&emsp;&emsp;欢迎交流

