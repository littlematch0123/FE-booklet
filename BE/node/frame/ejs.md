# EJS

　　nodejs的模板引擎有很多， EJS是比较简单和容易上手的。本文将详细介绍EJS

&nbsp;

### 概述

　　EJS是一个简单高效的模板语言，通过数据和模板，可以生成HTML标记文本。可以说EJS是一个JavaScript库，EJS可以同时运行在客户端和服务器端，客户端安装直接引入文件即可，服务器端用npm包安装

【安装】

　　ejs可以配合express框架使用，或直接在node中/浏览器中使用

<div class="cnblogs_code">
<pre>$ npm install ejs</pre>
</div>

【特点】

　　1、快速编译和渲染

　　2、简单的模板标签

　　3、自定义标记分隔符

　　4、支持文本包含

　　5、支持浏览器端和服务器端

　　6、模板静态缓存

　　7、支持express视图系统

&nbsp;

### 用法

<div class="cnblogs_code">
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div id="div1"&gt;&lt;/div&gt;
&lt;script src="ejs.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
    var html = ejs.render('&lt;%=123 %&gt;','');
    document.getElementById('div1').innerHTML = html;
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>

![ejs1](https://pic.xiaohuochai.site/blog/nodejs_ejs1.png)

&nbsp;

### 方法

【ejs.compile(str,[option])】

　　编译字符串得到模板函数，参数如下

<div class="cnblogs_code">
<pre>str：需要解析的字符串模板
option：配置选项</pre>
</div>
<div class="cnblogs_code">
<pre>var template = ejs.compile('&lt;%=123 %&gt;');
var result = template();
console.log(result);//123</pre>
</div>

【ejs.render(str,data,[option])】

　　直接渲染字符串并生成html，参数如下

<div class="cnblogs_code">
<pre>str：需要解析的字符串模板
data：数据
option：配置选项</pre>
</div>
<div class="cnblogs_code">
<pre>var result = ejs.render('&lt;%=123 %&gt;');
console.log(result);//123</pre>
</div>

　　两个函数包括的配置选项参数options如下：

<div class="cnblogs_code">
<pre>cache 缓存编译后的函数(ejs.compile(..) ,需要 filename参数作为缓存的key
filename 用于缓存的key，和include
context 函数的执行上下文
compileDebug 输出compile的信息来跟踪调试
client 返回编译后的函数
delimiter &lt;% .. %&gt; 指这里的%
debug 输出ejs.compile()得到函数的函数体
strict ejs.compile()返回的函数是否执行在严格模式
_with 是否使用 with(){..} 来访问本地变量
localsName 保存本地变量的对象名，默认为locals
rmWhitespace 移除多余空格</pre>
</div>

&nbsp;

### 常用标签

【js】

　　所有使用 &lt;% %&gt; 括起来的内容都会被编译成 Javascript，可以在模版文件中像写js一样Coding

<div class="cnblogs_code">
<pre>//test.ejs
&lt;% var a = 123 %&gt;
&lt;% console.log(a); %&gt;
//test.js
var ejs = require('ejs');
var fs = require('fs');
var data = fs.readFileSync('test.ejs');
var result = ejs.render(data.toString());
console.log(result);//123</pre>
</div>

　　或者，像下面这样写

<div class="cnblogs_code">
<pre>var ejs = require('ejs');
var result = ejs.render('&lt;% var a = 123 %&gt;&lt;%console.log(a); %&gt;');
console.log(result);//123</pre>
</div>

【变量】

　　用&lt;%=...%&gt;输出变量，变量若包含 '&lt;' '&gt;' '&amp;'等字符会被转义

<div class="cnblogs_code">
<pre>var ejs = require('ejs');
var result = ejs.render('&lt;%=a%&gt;',{a:'&lt;div&gt;123&lt;/div&gt;'});
console.log(result);//&amp;lt;div&amp;gt;123&amp;lt;/div&amp;gt;</pre>
</div>

　　如果不希望变量值的内容被转义，那就这么用&lt;%-... %&gt;输出变量

<div class="cnblogs_code">
<pre>var ejs = require('ejs');
var result = ejs.render('&lt;%-a%&gt;',{a:'&lt;div&gt;123&lt;/div&gt;'});
console.log(result);//&lt;div&gt;123&lt;/div&gt;</pre>
</div>

【注释】

　　用&lt;%# some comments %&gt;来注释，不执行不输出

【include】

　　include 可以引用绝对路径或相对路径的模板文件

<div class="cnblogs_code">
<pre>//test.ejs
&lt;% var a = 123 %&gt;
&lt;% console.log(a); %&gt;
//test.js
var ejs = require('ejs');var result = ejs.render('&lt;% include test.ejs %&gt;');
//throw new Error('`include` use relative path requires the \'filename\' option.');
console.log(result);</pre>
</div>

　　由上面的提示可知，使用相对路径时，必须设置'filename'选项

<div class="cnblogs_code">
<pre>//test.ejs
&lt;% var a = 123 %&gt;
&lt;% console.log(a); %&gt;
//test.js
var ejs = require('ejs');var result = ejs.render('&lt;% include test.ejs %&gt;',{filename:'test.ejs'});
console.log(result);//123</pre>
</div>

　&nbsp;

### 缓存

　　EJS默认是开启模版缓存。这样在一个页面中多次请求模版文件时，只会请求一次

　　可以通过代码设置是否开启缓存：EJS.config({cache: false});//关闭缓存

