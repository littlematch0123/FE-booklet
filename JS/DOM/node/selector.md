# 深入理解javascript选择器API系列第三篇——HTML5新增的3种selector方法

&emsp;&emsp;尽管DOM作为API已经非常完善了，但是为了实现更多的功能，DOM仍然进行了扩展，其中一个重要的扩展就是对选择器API的扩展。人们对jQuery的称赞，很多是由于jQuery方便的元素选择器。除了前面已经介绍过的[getElementsByClassName()方法](http://www.cnblogs.com/xiaohuochai/p/5797111.html)外，DOM拓展了querySelectorAll()、querySelector()和matchesSelector()这3种方法，通过CSS选择符查询DOM文档取得元素的引用的功能变成了原生的API，解析和树查询操作在浏览器内部通过编译后的代码来完成，极大地改善了性能。本文将详细介绍html5新增的3种selector方法

&nbsp;

### 方法

**querySelector()**

&emsp;&emsp;querySelector()方法接收一个CSS选择符，返回与该模式匹配的第一个元素，如果没有找到匹配的元素，返回null。该方法既可用于文档document类型，也可用于元素element类型。关于CSS选择器的详细内容[移步至此](http://www.cnblogs.com/xiaohuochai/p/4979514.html)

&emsp;&emsp;注意：IE7-浏览器不支持

<div>
<pre>&lt;body style="height: 100%;"&gt;
&lt;div class="box" id="box" style="height: 200px;"&gt;
&lt;ul class="list" style="height:100px"&gt;
        &lt;li class="in" style="height: 30px;"&gt;1&lt;/li&gt;
        &lt;li class="in" style="height: 30px;" title="test"&gt;2&lt;/li&gt;
        &lt;li class="in" style="height: 30px;"&gt;3&lt;/li&gt;
    &lt;/ul&gt;    
&lt;/div&gt;
&lt;script&gt;
//因为没有.null类名，所以返回null
var oNull = document.querySelector('.null');
console.log(oNull);//null
//通过&lt;body&gt;标签取得元素
var body = document.querySelector("body");
console.log(body.style.height);//100%
//通过id属性取得元素
var oBox = document.querySelector('#box');
console.log(oBox.style.height);//200px
//通过结合元素的类选择器取得元素
var oList = document.querySelector('ul.list');
console.log(oList.style.height);//100px
//通过类名取得元素
var oIn = document.querySelector('.in');
console.log(oIn.innerHTML);//1
//通过属性选择器取得元素
var oTest = body.querySelector('[title="test"]');
console.log(oTest.innerHTML);//2
&lt;/script&gt;
&lt;/body&gt; </pre>
</div>

**querySelectorAll()**

&emsp;&emsp;querySelectorAll()接收一个CSS选择符，返回一个类数组对象[NodeList](http://www.cnblogs.com/xiaohuochai/p/5827389.html#anchor1)的实例。具体来说，返回的值实际上是带有所有属性和方法的NodeList，而其底层实现则类似于一组元素的快照，而非不断对文档进行搜索的动态查询。这样实现可以避免使用NodeList对象通常会引起的大多数性能问题。只要传给querySelectorAll()方法的CSS选择符有效，该方法都会返回一个NodeList对象，而不管找到多少匹配的元素

&emsp;&emsp;没有匹配元素时，返回空的类数组对象，而不是null

&emsp;&emsp;注意：IE7-浏览器不支持

<div>
<pre>&lt;body style="height: 100%;"&gt;
&lt;div class="box" id="box" style="height: 200px;"&gt;
&lt;ul class="list" style="height:100px"&gt;
        &lt;li class="in" style="height: 30px;"&gt;1&lt;/li&gt;
        &lt;li class="in" style="height: 30px;" title="test"&gt;2&lt;/li&gt;
        &lt;li class="in" style="height: 30px;"&gt;3&lt;/li&gt;
    &lt;/ul&gt;    
&lt;/div&gt;
&lt;script&gt;
//返回[]
var oNull = document.querySelectorAll('.null');
console.log(oNull);
//取得body元素
var body = document.querySelectorAll("body")[0];
console.log(body.style.height);//100%
//取得所有class为"in"的元素
var oIn = document.querySelectorAll('.in');
for(var i = 0 ; i &lt; oIn.length; i++){
    console.log(oIn[i].innerHTML);//1,2,3    
}
//取得title属性为test的元素
var oTest = body.querySelectorAll('[title="test"]');
console.log(oTest);//[li.in]
&lt;/script&gt;
&lt;/body&gt;</pre>
</div>

**matchesSelector()**

&emsp;&emsp;matchesSelector()方法接收一个CSS选择符参数，如果调用元素与该选择符相匹配，返回true；否则返回false

<div>
<pre>&lt;body id="test"&gt;
&lt;script&gt;
    //Uncaught TypeError: document.body.matchesSelector is not a function
    console.log(document.body.matchesSelector('#test'));
&lt;/script&gt;
&lt;/body&gt;</pre>
</div>

&emsp;&emsp;由于兼容性问题，现在各个浏览器都只支持加前缀的方法。IE9+浏览器支持msMatchesSelector()方法，firefox支持mozMatchesSelector()方法，safari和chrome支持webkitMatchesSelector()方法。所以兼容写法为:

<div>
<pre>function matchesSelector(element,selector){
    if(element.matchesSelector){
        return element.matchesSelector(selector);
    }
    if(element.msMatchesSelector){
        return element.msMatchesSelector(selector);
    }
    if(element.mozMatchesSelector){
        return element.mozMatchesSelector(selector);
    }
    if(element.webkitMatchesSelector){
        return element.webkitMatchesSelector(selector);
    }            
}</pre>
</div>
<div>
<pre>&lt;body id="test"&gt;
&lt;script&gt;
console.log(matchesSelector(document.body,'#test'));//true
&lt;/script&gt;
&lt;/body&gt;</pre>
</div>

&nbsp;

### 非实时

&emsp;&emsp;与getElementById()和getElementsByTagName()方法不同，querySelector()和querySelectorAll()方法得到的类数组对象是非动态实时的

<div>
<pre>&lt;div id="container"&gt;
    &lt;div&gt;1&lt;/div&gt;
    &lt;div&gt;2&lt;/div&gt;
&lt;/div&gt;
&lt;script&gt;
var container = document.getElementById('container');
var divOne = container.querySelector('div:last-child');
var divAll = container.querySelectorAll('div');
console.log(container.children.length);//2
console.log(divOne.innerHTML);//2
console.log(divAll.length);//2
var newDiv = document.createElement('div');
newDiv.innerHTML = 3;
container.appendChild(newDiv);
console.log(container.children.length);//3
//由于querySelector不是实时的，所以其保存的仍然是原来第二个div的值
console.log(divOne.innerHTML);//2
//由于querySelectorAll不是实时的，所以仍然只保存了两个div元素
console.log(divAll.length);//2
console.log(container.querySelector('div:last-child').innerHTML);//3
console.log(container.querySelectorAll('div').length);//3
&lt;/script&gt;</pre>
</div>

&nbsp;

### 缺陷

&emsp;&emsp;selector类方法在元素上调用时，指定的选择器仍然在整个文档中进行匹配，然后过滤出结果集，以便它只包含指定元素的后代元素。这看起来是违反常规的，因为它意味着选择器字符串能包含元素的祖先而不仅仅是所匹配的元素&nbsp;

<div>
<pre>&lt;div id="container"&gt;
    &lt;div&gt;1&lt;/div&gt;
    &lt;div&gt;2&lt;/div&gt;
&lt;/div&gt;
&lt;script&gt;
var container = document.getElementById('container');
console.log(container.querySelectorAll('div div'));//[div div]
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;按照正常理解，控制台应该返回空的类数组对象，因为id为container的div元素的子元素中，不存在div元素嵌套的情况

&emsp;&emsp;但是，该方法实际返回[div div]。这是因为参数中的选择器包含了元素的祖先

&emsp;&emsp;所以，如果出现后代选择器，为了防止该问题，可以在参数中显式地添加当前元素的选择器

<div>
<pre>&lt;div id="container"&gt;
    &lt;div&gt;1&lt;/div&gt;
    &lt;div&gt;2&lt;/div&gt;
&lt;/div&gt;
&lt;script&gt;
var container = document.getElementById('container');
console.log(container.querySelectorAll('#container div div'));//[]
console.log(container.querySelectorAll('#container div'));//[div div]
console.log(container.querySelectorAll('div'));//[div div]
&lt;/script&gt;</pre>
</div>

&nbsp;

## 最后

&emsp;&emsp;虽然存在着非实时和参数缺陷的问题，但是瑕不掩瑜，selector类方法的出现极大地简化了查找元素的繁琐操作。而且，它们支持IE8浏览器

&emsp;&emsp;javascript选择器API系列写完了，欢迎交流

