# javascript中关于value的一个小知识点(value既是属性也是变量)

&emsp;&emsp;今天在学习input的value值时，发现这么一个小知识点，以前理解不太透彻

&nbsp;

&emsp;&emsp;【1】以下这种情况是常见情况，会弹出&ldquo;测试内容&rdquo;

<div>
<pre>&lt;input type="button" value="测试内容" onclick = "alert(value)"&gt;</pre>
</div>

&nbsp;

&emsp;&emsp;【2】这种情况下value找不到，沿着作用域链应该到document了，应该弹出&ldquo;123"，但情况是弹出空

<div>
<pre>&lt;script&gt;
var value=123;
&lt;/script&gt;
&lt;input type="button" onclick = "alert(value)"&gt;</pre>
</div>

&nbsp;

&emsp;&emsp;【3】value确实是找不到吗？是找的到的。在调试工具下，查看了this的属性，里面有一条是 &lsquo;&nbsp;value:"" &rsquo; 。它的值就是空字符串

<div>
<pre>&lt;input type="button" onclick = "console.log(this)"&gt;</pre>
</div>

&nbsp;

&emsp;&emsp;【4】所以value作为input的属性一直存在，不存在找不到的情况，赋值了value就是被赋的值，没赋值value就是空字符串

&nbsp;

&emsp;&emsp;【5】看一例拓展，value伪装兄弟val。val先在input对象上找，没有找到，沿着作用域链在document对象上找，找到弹出123

<div>
<pre>&lt;script&gt;
var val=123;
&lt;/script&gt;
&lt;input type="button" onclick = "console.log(val)"&gt;</pre>
</div>

&nbsp;

&emsp;&emsp;【6】还有就是不论val=123被写在前面，而是后面，都能访问到，因为onclick只是事件绑定，等事件真正发生的时候页面早就解析了后面`var val=123`的代码了。所以不会出错

<div>
<pre>&lt;input type="button" onclick = "console.log(val)"&gt;
&lt;script&gt;
var val=123;
&lt;/script&gt;</pre>
</div>

&nbsp;

&emsp;&emsp;【7】是这样吗？但其实把声明放在后面是不靠谱的，如果之间还有其他&lt;script&gt;代码，由于网络原因无法访问到，由于&lt;script&gt;有阻塞作用，会阻塞后面代码，会报错

<div>
<pre>&lt;input type="button" onclick = "alert(val)"&gt;
&lt;script src="http://www.qq.com/test.js"&gt;&lt;/script&gt;
&lt;script&gt;
var val=123;
&lt;/script&gt;</pre>
</div>

&nbsp;

&emsp;&emsp;【8】最后一个拓展。如果是一个表单元素，则它的作用域链是 this -&gt; this.form -&gt; document 。先从&lt;input type="button"&gt;对象中寻找username属性，发现没有。然后找到它的父级form，form的username可以找到&lt;input type="text"&gt;元素(表单元素可以直接通过name值访问)，然后找到其value值123后弹出

<div>
<pre>&lt;form action="#"&gt;
    &lt;input type="text" name="username" value="123"&gt;
    &lt;input type="button" value="btn" onclick = "alert(username.value)"&gt;
&lt;/form&gt;</pre>
</div>

