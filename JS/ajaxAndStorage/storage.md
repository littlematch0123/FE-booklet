# Web Storage

&emsp;&emsp;Web存储最初作为HTML5的一部分被定义成API形式，但是后来被剥离出来作为独立的一份标准了。Web存储标准所描述的API包含localStorage对象和sessionStorage对象，这两个对象实际上是持久化关联数组，是名值对的映射表，&ldquo;名&rdquo;和&ldquo;值&rdquo;都是字符串。Web存储易于使用、支持大容量(但非无限量)数据存储同时兼容当前所有主流浏览器。本文将详细介绍Web Storage

&nbsp;

### 概述

&emsp;&emsp;Web Storage的目的是克服由cookie带来的一些限制，当数据需要被严格控制在客户端上时，无须持续地将数据发回服务器。Web Storage的两个主要目标是：提供一种在cookie之外存储会话数据的途径以及提供一种存储大量可以跨会话存在的数据的机制

&emsp;&emsp;Web Storage分成两类：sessionStorage和localStorage。sessionStorage保存的数据用于浏览器的一次会话，当会话结束(通常是该窗口关闭)，数据被清空；localStorage保存的数据长期存在，下一次访问该网站的时候，网页可以直接读取以前保存的数据。除了保存期限的长短不同，这两个对象的属性和方法完全一样

&emsp;&emsp;它们很像cookie机制的强化版，能够动用大得多的存储空间。目前，每个域名的存储上限视浏览器而定，Chrome是2.5MB，Firefox和Opera是5MB，IE是10MB。其中，Firefox的存储空间由一级域名决定，而其他浏览器没有这个限制。也就是说，在Firefox中，a.example.com和b.example.com共享5MB的存储空间。另外，与Cookie一样，它们也受同域限制。某个网页存入的数据，只有同域下的网页才能读取

&emsp;&emsp;通过检查window对象是否包含sessionStorage和localStorage属性，可以确定浏览器是否支持这两个对象

&emsp;&emsp;注意：IE浏览器不支持在本地使用storage

&nbsp;

### 存取数据

&emsp;&emsp;sessionStorage和localStorage保存的数据，都以&ldquo;键对&rdquo;的形式存在。也就是说，每一项数据都有一个键名和对应的值。所有的数据都是以文本格式保存

&emsp;&emsp;注意：Storage类型只能存储字符串。非字符串的数据在存储之前会被转换成字符串

【setItem()】

&emsp;&emsp;存入数据使用setItem方法。它接受两个参数，第一个是键名，第二个是保存的数据

&emsp;&emsp;注意：不同的浏览器存入的Storage位置不一样，不能通用

<div>
<pre>sessionStorage.setItem("key","value");
localStorage.setItem("key","value");</pre>
</div>

【getItem()】

&emsp;&emsp;读取数据使用getItem方法。它只有一个参数，就是键名

<div>
<pre>var valueSession = sessionStorage.getItem("key");
var valueLocal = localStorage.getItem("key");</pre>
</div>

&emsp;&emsp;除了使用setItem()和getItem()方法之外，还可以使用属性来存取数据

<div>
<pre>localStorage.setItem("key1","value1");
localStorage.testkey = 'testvalue';
console.log(localStorage.getItem('testkey'));//'testvalue'
console.log(localStorage.key1);//'value1'</pre>
</div>

&nbsp;

### 清除数据

【removeItem()】

&emsp;&emsp;removeItem()方法用于清除某个键名对应的数据

&emsp;&emsp;注意：清除不存在的键名不会报错，只会静默失败

<div>
<pre>sessionStorage.removeItem('key');
localStorage.removeItem('key');</pre>
</div>

&emsp;&emsp;除了使用removeItem()方法，还可以使用delete操作来清除数据

&emsp;&emsp;注意：IE7-浏览器不支持delete操作符来清除storage数据

<div>
<pre>localStorage.setItem("key1","value1");
delete localStorage.key1;
console.log(localStorage.key1);//undefined
console.log(localStorage.getItem('key1'));//null</pre>
</div>

【clear()】

&emsp;&emsp;clear方法用于清除所有保存的数据

<div>
<pre>sessionStorage.clear();
localStorage.clear(); </pre>
</div>

&nbsp;

### 遍历操作

【key()】

&emsp;&emsp;key(index)方法返回index位置处的值的名字

<div>
<pre>sessionStorage.setItem("key1","value1");
sessionStorage.setItem("key2","value2");
console.log(sessionStorage.key(0));//'key1'
console.log(sessionStorage.key(1));//'key2'
console.log(sessionStorage.key(2));//null</pre>
</div>

【length】

&emsp;&emsp;length属性返回名值对儿的个数

<div>
<pre>console.log(sessionStorage.length);//2</pre>
</div>

&emsp;&emsp;利用length属性和key()方法，可以遍历所有的键

<div>
<pre>for(var i = 0; i &lt; localStorage.length; i++){
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
}</pre>
</div>

&emsp;&emsp;还可以使用for-in循环来迭代

<div>
<pre>for(var key in localStorage){
    var value = localStorage.getItem(key);
}</pre>
</div>

&nbsp;

### 存储事件

&emsp;&emsp;首先，要特别注意的是，该事件只发生在window对象上，在document对象上触发无效，且使用DOM0级、DOM2级事件处理函数都可以

&emsp;&emsp;无论对sessionStorage还是localStorage进行操作，都会触发storage事件。当通过属性或setItem()方法保存数据，使用delete操作符或removeItem()删除数据，或者调用clear()方法时，都会发生该事件

&emsp;&emsp;注意：只有当存储数据真正发生改变的时候才会触发存储事件。像给已经存在的存储项设置一个一模一样的值，抑或是删除一个本来就不存在的存储项都是不会触发存储事件的。通过getItem()方法获取数据也不会触发该事件

&emsp;&emsp;一般地，storage事件不在导致数据变化的当前页面触发。如果浏览器同时打开一个域名下面的多个页面，当其中的一个页面改变sessionStorage或localStorage的数据时，其他所有页面的storage事件会被触发，而原始页面并不触发storage事件。可以通过这种机制，实现多个窗口之间的通信

&emsp;&emsp;注意：IE8-浏览器不支持storage事件，IE9+浏览器与其他标准浏览器有所不同，无论数据真实值是否变化，只要对数据进行设置或删除，都会触发该事件，且原始页面和同一域名下的其他页面都会触发

&emsp;&emsp;这个事件的event对象有以下属性

<div>
<pre>url:触发事件的链接地址
key:设置或者删除的键名
newvalue:如果是设置值，则是新值；如果是删除键，则是null
oldValue:键被更改之前的值
storageArea:返回触发事件的对象</pre>
</div>
<div>
<pre>&lt;!-- 原始页面 --&gt;
&lt;div&gt;改变输入框中的值，再点击按钮，会触发storage事件&lt;/div&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;input type="text"  id="test"&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
btn.onclick = function(){
    localStorage.setItem("key",test.value);
}
window.onstorage = function(e){
    e = e || event;
    result.innerHTML = 'key: ' + e.key + '&lt;br&gt;oldValue: ' + e.oldValue + '&lt;br&gt;newValue: ' + e.newValue + '&lt;br&gt;url: ' + e.url + '&lt;br&gt;storageArea: ' + e.storageArea;  
}
&lt;/script&gt;  </pre>
</div>
<div>
<pre>&lt;!-- 其他页面 --&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
window.onstorage = function(e){
    e = e || event;
    result.innerHTML = 'key: ' + e.key + '&lt;br&gt;oldValue: ' + e.oldValue + '&lt;br&gt;newValue: ' + e.newValue + '&lt;br&gt;url: ' + e.url + '&lt;br&gt;storageArea: ' + e.storageArea;  
}
&lt;/script&gt;</pre>
</div>

原始页面：

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/js/storage/s1.html" frameborder="0" width="320" height="240"></iframe>

其他页面：

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/js/storage/s2.html" frameborder="0" width="320" height="240"></iframe>

