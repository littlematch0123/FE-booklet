# 使用Browserify来实现CommonJS的浏览器加载

&emsp;&emsp;[Nodejs的模块](http://www.cnblogs.com/xiaohuochai/p/6847939.html)是基于CommonJS规范实现的，可不可以应用在浏览器环境中呢？

<div>
<pre>var math = require('math');
math.add(2, 3);</pre>
</div>

&emsp;&emsp;第二行math.add(2, 3)，在第一行require('math')之后运行，因此必须等math.js加载完成。也就是说，如果加载时间很长，整个应用就会停在那里等。这对服务器端不是一个问题，因为所有的模块都存放在本地硬盘，可以同步加载完成，等待时间就是硬盘的读取时间。但是，对于浏览器，这却是一个大问题，因为模块都放在服务器端，等待时间取决于网速的快慢，可能要等很长时间，浏览器处于"假死"状态

&emsp;&emsp;而browserify这样的一个工具，可以把nodejs的模块编译成浏览器可用的模块，解决上面提到的问题。本文将详细介绍Browserify

&nbsp;

### 实现

&emsp;&emsp;Browserify是目前最常用的CommonJS格式转换的工具

&emsp;&emsp;请看一个例子，b.js模块加载a.js模块

<div>
<pre>// a.js
var a = 100;
module.exports.a = a;
// b.js
var result = require('./a');
console.log(result.a);</pre>
</div>

&emsp;&emsp;index.html直接引用b.js会报错，提示require没有被定义

<div>
<pre>//index.html
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;script src="b.js"&gt;&lt;/script&gt;    
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>

![Browserify1](https://pic.xiaohuochai.site/blog/JS_modular_Browserify1.png)

&emsp;&emsp;这时，就要使用Browserify了

【安装】

&emsp;&emsp;使用下列命令安装browserify

<div>
<pre>npm install -g browserify</pre>
</div>

【转换】

&emsp;&emsp;使用下面的命令，就能将b.js转为浏览器可用的格式bb.js

<div>
<pre>$ browserify b.js &gt; bb.js</pre>
</div>

&emsp;&emsp;查看bb.js，browserify将a.js和b.js这两个文件打包为bb.js，使其在浏览器端可以运行

<div>
<pre>(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&amp;&amp;require;if(!u&amp;&amp;a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&amp;&amp;require;for(var o=0;o&lt;r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var a = 100;
module.exports.a = a;
},{}],2:[function(require,module,exports){
var result = require('./a');
console.log(result.a);
},{"./a":1}]},{},[2]);</pre>
</div>

&emsp;&emsp;index.html引用bb.js，控制台显示100

<div>
<pre>//index.html
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;script src="bb.js"&gt;&lt;/script&gt;    
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>

![Browserify2](https://pic.xiaohuochai.site/blog/JS_modular_Browserify2.png)

&nbsp;

### 原理

&emsp;&emsp;Browserify到底做了什么？安装一下browser-unpack，就能清楚原理了

<div>
<pre>$ npm install browser-unpack -g</pre>
</div>

&emsp;&emsp;然后，使用下列命令，将前面生成的bb.js解包

<div>
<pre>$ browser-unpack &lt; bb.js</pre>
</div>

![Browserify3](https://pic.xiaohuochai.site/blog/JS_modular_Browserify3.png)

&emsp;&emsp;可以看到，browerify将所有模块放入一个数组，id属性是模块的编号，source属性是模块的源码，deps属性是模块的依赖

&emsp;&emsp;因为b.js里面加载了a.js，所以deps属性就指定./a对应1号模块。执行的时候，浏览器遇到require('./a')语句，就自动执行1号模块的source属性，并将执行后的module.exports属性值输出

&emsp;&emsp;browerify将a.js和b.js打包，并生成bb.js，browser-unpack将bb.js解包，是一个逆向的过程。但实际上，bb.js依然存在

