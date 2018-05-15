# 深入理解DOM节点类型第四篇——文档片段节点DocumentFragment

&emsp;&emsp;在所有节点类型中，只有文档片段节点DocumentFragment在文档中没有对应的标记。DOM规定文档片段(document fragment)是一种&ldquo;轻量级&rdquo;的文档，可以包含和控制节点，但不会像完整的文档那样占用额外的资源

&nbsp;

### 特征

&emsp;&emsp;创建文档片段，要使用document.createDocumentFragment()方法。文档片段继承了Node的所有方法，通常用于执行那些针对文档的DOM操作

&emsp;&emsp;文档片段节点的三个node属性&mdash;&mdash;nodeType、nodeName、nodeValue分别是11、'#document-fragment'和null，文档片段节点没有父节点parentNode

<div>
<pre>var frag = document.createDocumentFragment();
console.log(frag.nodeType);//11
console.log(frag.nodeValue);//null
console.log(frag.nodeName);//'#document-fragment'
console.log(frag.parentNode);//null</pre>
</div>

&nbsp;

### 作用

&emsp;&emsp;我们经常使用javascript来操作DOM元素，比如使用appendChild()方法。每次调用该方法时，浏览器都会重新渲染页面。如果大量的更新DOM节点，则会非常消耗性能，影响用户体验

&emsp;&emsp;javascript提供了一个文档片段DocumentFragment的机制。如果将文档中的节点添加到文档片段中，就会从文档树中移除该节点。把所有要构造的节点都放在文档片段中执行，这样可以不影响文档树，也就不会造成页面渲染。当节点都构造完成后，再将文档片段对象添加到页面中，这时所有的节点都会一次性渲染出来，这样就能减少浏览器负担，提高页面渲染速度

<div>
<pre>&lt;ul id="list1"&gt;&lt;/ul&gt;
&lt;script&gt;
var list1 = document.getElementById('list1');
console.time("time");
var fragment = document.createDocumentFragment();
for(var i = 0; i &lt; 500000; i++){
    fragment.appendChild(document.createElement('li'));
}
list1.appendChild(fragment);
console.timeEnd('time');
&lt;/script&gt;
&lt;ul id="list"&gt;&lt;/ul&gt;
&lt;script&gt;
var list = document.getElementById('list');
console.time("time");
for(var i = 0; i &lt; 500000; i++){
    list.appendChild(document.createElement('li'));
}
console.timeEnd('time');
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;循环50万次的各浏览器结果

<div>
<pre>               使用文档片段        　　不使用文档片段
firefox        402.04ms              469.31ms
chrome         429.800ms             729.634ms</pre>
</div>

&emsp;&emsp;循环10万次的各浏览器结果

<div>
<pre>            　　使用文档片段        　　不使用文档片段
IE11        　　2382.15ms             2204.47ms
IE10        　　2404.239ms            2225.721ms
IE9             2373ms                 2255ms
IE8             4464ms                 4210ms
IE7             5887ms                 5394ms</pre>
</div>

&emsp;&emsp;由以上结果可以看出，若使用IE浏览器，则使用文档片段DocumentFragment的性能并不会更好，反而变差；若使用chrome和firefox浏览器，使用文档片段DocumentFragment可以提升性能

&nbsp;

## 最后

&emsp;&emsp;由于文档片段的优点在IE浏览器下并不明显，反而可能成为多此一举。所以，该类型的节点并不常用

