# 深入理解DOM事件机制系列第一篇——事件流

&emsp;&emsp;javascript操作CSS称为[脚本化CSS](http://www.cnblogs.com/xiaohuochai/p/5837478.html)，而javascript与HTML的交互是通过事件实现的。事件就是文档或浏览器窗口中发生的一些特定的交互瞬间，而事件流(又叫事件传播)描述的是从页面中接收事件的顺序。本文将详细介绍该部分的内容

&nbsp;

### 历史

&emsp;&emsp;当浏览器发展到第四代时(IE4及Netscape4)，浏览器开发团队遇到了一个很有意思的问题：页面的哪一部分会拥有某个特定的事件？想象画在一张纸上的一组同心圆。如果把手指放在圆心上，那么手指指向的不是一个圆，而是纸上的所有圆

&emsp;&emsp;两家公司的浏览器开发团队在看待浏览器事件方面还是一致的。如果单击了某个按钮，他们都认为单击事件不仅仅发生在按钮上，甚至也单击了整个页面

&emsp;&emsp;但有意思的是，IE和Netscape开发团队居然提出了差不多是完全相反的事件流的概念。IE的事件流是事件冒泡流，而Netscape的事件流是事件捕获流

&nbsp;

### 事件冒泡

&emsp;&emsp;IE的事件流叫做事件冒泡(event bubbling)，即事件开始时由最具体的元素(文档中嵌套层次最深的那个节点)接收，然后逐级向上传播到较为不具体的节点(文档)

&emsp;&emsp;以下列HTML结构为例，说明事件冒泡、事件捕获及事件流

<div>
<pre>&lt;!DOCTYPE HTML&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;title&gt;Document&lt;/title&gt;
&lt;body&gt;
&lt;div&gt;&lt;/div&gt;
&lt;/body&gt;    
&lt;/html&gt;</pre>
</div>

&emsp;&emsp;如果单击了页面中的&lt;div&gt;元素，那么这个click事件沿DOM树向上传播，在每一级节点上都会发生，按照如下顺序传播：

<div>
<pre>(1)    &lt;div&gt;
(2)    &lt;body&gt;
(3)    &lt;html&gt;
(4)    document</pre>
</div>

&emsp;&emsp;注意：所有现代浏览器都支持事件冒泡，但在具体实现在还是有一些差别。IE9、Firefox、Chrome、Safari将事件一直冒泡到window对象

<div>
<pre>(1)    &lt;div&gt;
(2)    &lt;body&gt;
(3)    &lt;html&gt;
(4)    document
(5)    window</pre>
</div>
<div>
<pre>&lt;!DOCTYPE HTML&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;title&gt;Document&lt;/title&gt;
&lt;body&gt;
&lt;div id="box" style="height:100px;width:300px;background-color:pink;"&gt;&lt;/div&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;script&gt;
//IE8-浏览器返回div body html document
//其他浏览器返回div body html document window
reset.onclick = function(){history.go();}
box.onclick = function(){box.innerHTML += 'div\n';}
document.body.onclick = function(){box.innerHTML += 'body\n';}
document.documentElement.onclick = function(){box.innerHTML += 'html\n';}
document.onclick = function(){box.innerHTML += 'document\n';}
window.onclick = function(){box.innerHTML += 'window\n';}
&lt;/script&gt;
&lt;/body&gt;    
&lt;/html&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/js/eventFlow/e1.html" frameborder="0" width="320" height="240"></iframe>

### 事件捕获

&emsp;&emsp;事件捕获的思想是不太具体的节点应该更早接收到事件，而最具体的节点应该最后接收到事件。事件捕获的用意在于在事件到达预定目标之前就捕获它

&emsp;&emsp;以同样的HTML结构为例，说明事件捕获

<div>
<pre>&lt;!DOCTYPE HTML&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;title&gt;Document&lt;/title&gt;
&lt;body&gt;
&lt;div&gt;&lt;/div&gt;
&lt;/body&gt;    
&lt;/html&gt;</pre>
</div>

&emsp;&emsp;在事件捕获过程中，document对象首先接收到click事件，然后事件沿DOM树依次向下，一直传播到事件的实际目标，即&lt;div&gt;元素

<div>
<pre>(1)    document
(2)    &lt;html&gt;
(3)    &lt;body&gt;
(4)    &lt;div&gt;</pre>
</div>

&emsp;&emsp;注意：IE9、Firefox、Chrome、Safari等现代浏览器都支持事件捕获，但是从window对象开始捕获

<div>
<pre>(1)    window
(2)    document
(3)    &lt;html&gt;
(4)    &lt;body&gt;
(5)    &lt;div&gt;</pre>
</div>

&emsp;&emsp;addEventListener()方法中的第三个参数设置为true时，即为事件捕获阶段

<div>
<pre>&lt;!DOCTYPE HTML&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;title&gt;Document&lt;/title&gt;
&lt;body&gt;
&lt;div id="box" style="height:100px;width:300px;background-color:pink;"&gt;&lt;/div&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;script&gt;
//IE8-浏览器不支持
//其他浏览器返回window document html body div
reset.onclick = function(){history.go();}
box.addEventListener('click',function(){box.innerHTML += 'div\n'},true)
document.body.addEventListener('click',function(){box.innerHTML += 'body\n';},true);
document.documentElement.addEventListener('click',function(){box.innerHTML += 'html\n';},true);
document.addEventListener('click',function(){box.innerHTML += 'document\n';},true);
window.addEventListener('click',function(){box.innerHTML += 'window\n';},true);
&lt;/script&gt;
&lt;/body&gt;    
&lt;/html&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/js/eventFlow/e2.html" frameborder="0" width="320" height="240"></iframe>

### 事件流

&emsp;&emsp;事件流又称为事件传播，DOM2级事件规定的事件流包括三个阶段：事件捕获阶段(capture phase)、处于目标阶段(target phase)和事件冒泡阶段(bubbling phase)

&emsp;&emsp;首先发生的是事件捕获，为截获事件提供了机会。然后是实际的目标接收到事件，最后一个阶段是冒泡阶段，可以在这个阶段对事件做出响应

![eventFlow](https://pic.xiaohuochai.site/blog/JS_DOM_event_eventFlow.jpg)
