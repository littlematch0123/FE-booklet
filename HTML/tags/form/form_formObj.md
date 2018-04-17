# 深入理解表单脚本系列第一篇——表单对象

&emsp;&emsp;javascript最初的一个应用就是分担服务器处理表单的责任，打破处处依赖服务器的局面。尽管目前的web和javascript已经有了长足的发展，但web表单的变化并不明显。由于web表单没有为许多常见任务提供现成的解决方法，很多开发人员不仅会在验证表单时使用javascript，而且还增强了一些标准表单控件的默认行为。本文是表单脚本系列第一篇&mdash;&mdash;表单对象

&nbsp;

### 表单属性

&emsp;&emsp;在HTML中，表单由form元素表示，而在javascript中，表单对应的则是HTMLFormElement类型，HTMLFormElement继承了HTMLElement，但也有自己独有的属性和方法

&emsp;&emsp;acceptCharset&emsp;&emsp;服务器能够处理的字符集；等价于HTML中的accept-charset特性

&emsp;&emsp;关于accept-charset属性的详细情况[移步至此](http://www.cnblogs.com/xiaohuochai/p/5174891.html#anchor2)

&emsp;&emsp;action&emsp;&emsp;接受请求的URL；等价于HTML中的action特性

&emsp;&emsp;关于action属性的详细情况[移步至此](http://www.cnblogs.com/xiaohuochai/p/5174891.html#anchor3)

&emsp;&emsp;enctype&emsp;&emsp;请求的编码类型；等价于HTML中的enctype特性

&emsp;&emsp;关于enctype属性的详细情况[移步至此](http://www.cnblogs.com/xiaohuochai/p/5174891.html#anchor5)

<div>
<pre>&lt;form name="form" action="#"&gt;&lt;/form&gt;
&lt;script&gt;
var form = document.form;
console.log(form.acceptCharset);//''
console.log(form.action);//"file:///C:/Users/Administrator/Desktop/iframe.html#"
console.log(form.enctype);//application/x-www-form-urlencoded
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;elements&emsp;&emsp;表单中所有控件的集合(HTMLCollection)

&emsp;&emsp;length&emsp;&emsp;表单中控件的数量

<div>
<pre>&lt;form name="form" action="#"&gt;
    &lt;input type="text"&gt;
    &lt;textarea&gt;&lt;/textarea&gt;
&lt;/form&gt;    
&lt;script&gt;
var form = document.form;
console.log(form.elements)//[input,textarea]
console.log(form.length)//2
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;method&emsp;&emsp;要发送的HTTP请求类型，通常是"get"或"post"；等价于HTML的method特性

&emsp;&emsp;关于method属性的详细情况[移步至此](http://www.cnblogs.com/xiaohuochai/p/5174891.html#anchor6)

&emsp;&emsp;name&emsp;&emsp;表单的名称；等价于HTML的name特性

&emsp;&emsp;关于name属性的详细情况[移步至此](http://www.cnblogs.com/xiaohuochai/p/5174891.html#anchor1)

&emsp;&emsp;target&emsp;&emsp;用于发送请求和接收响应的窗口名称；等价于HTML的target特性

&emsp;&emsp;关于target属性的详细情况[移步至此](http://www.cnblogs.com/xiaohuochai/p/5174891.html#anchor4)

<div>
<pre>&lt;form name="form" action="#"&gt;&lt;/form&gt;
&lt;script&gt;
var form = document.form;
console.log(form.method);//get
console.log(form.name);//form
console.log(form.target);//''
&lt;/script&gt;</pre>
</div>

&nbsp;

### 表单事件

&emsp;&emsp;reset事件&emsp;&emsp;将所有表单域重置为默认值

&emsp;&emsp;submit事件&emsp;&emsp;提交表单

<div>
<pre>&lt;form name="form" action="#"&gt;
    &lt;input name="test" value="1"&gt;
    &lt;input type="reset"&gt;
    &lt;input type="submit"&gt;
&lt;/form&gt;
&lt;script&gt;
var form = document.form;
form.onreset = function(){
    form.test.value = "2";
    //若不使用return false阻止默认事件，那么reset将会把form.test的value重新置成1
    return false;
}
form.onsubmit = function(){
    form.test.value = "3";
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/formobj/f1.html" frameborder="0" width="320" height="240"></iframe>

### 表单方法

**submit()方法**

&emsp;&emsp;在javascript中，以编程方式调用submit()方法也可以提交表单。而且，这种方式无需表单包含提交按钮，任何时候都可以正常提交表单

&emsp;&emsp;调用submit()方法提交表单时，不会触发submit事件

**reset()方法**

&emsp;&emsp;在用户单击重置按钮时，表单会被重置。使用type特性值为"reset"的&lt;input&gt;或&lt;button&gt;都可以创建重置按钮

&emsp;&emsp;注意：元素重置时，不再触发元素上的change和input事件

<div>
<pre>&lt;input type="reset" value="Reset Form"&gt;
&lt;button type="reset"&gt;Reset Form&lt;/button&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/html/formobj/f2.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;与调用submit()方法不同，调用reset()方法会像单击重置按钮一样触发reset事件

&emsp;&emsp;点击外部提交按钮后，浏览器URL变成`file:///C:/inetpub/wwwroot/test.html?test=1#`，且没有触发onreset事件，input的value值没有变化

&emsp;&emsp;点击外部重置按钮后，触发reset事件，input的value值变成2

<div>
<pre>&lt;form name="form" action="#"&gt;
    &lt;input name="test" value="1"&gt;
&lt;/form&gt;
&lt;button id="btn1"&gt;外部提交&lt;/button&gt;
&lt;button id="btn2"&gt;外部重置&lt;/button&gt;
&lt;script&gt;
var form = document.form;
form.onreset = function(){
    form.test.value = "2";
    return false;
}
form.onsubmit = function(){form.test.value = "3";}
btn1.onclick = function(){form.submit();}
btn2.onclick = function(){form.reset();}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/html/formobj/f3.html" frameborder="0" width="320" height="240"></iframe>

