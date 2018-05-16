# IE userData

&emsp;&emsp;IE浏览器实现了它专属的客户端存储机制&mdash;&mdash;&ldquo;userData&rdquo;。userData可以实现一定量的字符串数据存储，可以将其用做是Web存储的替代方案。本文将详细介绍IE userData

&nbsp;

### 概述

&emsp;&emsp;在IE5.0中，微软通过一个自定义行为引入了持久化用户数据的概念。用户数据允许每个文档最多128KB数据，每个域名最多1MB数据

&emsp;&emsp;注意：IE9+浏览器不支持

&emsp;&emsp;要使用持久化用户数据，首先必须如下所示，使用CSS在某个元素上指定userData行为

<div>
<pre>&lt;div style="behavior:url(#default#userData)" id="dataStore"&gt;&lt;/div&gt;</pre>
</div>

&emsp;&emsp;或者使用动态生成元素的方式

<div>
<pre>var memory = document.createElement("div");    // 创建一个元素
memory.id = "_memory";    // 设定一个id名
memory.style.display = "none";    // 将其隐藏
memory.style.behavior = "url('#default#userData')";//附加userData行为 document.body.appendChild(memory);    // 将其添加到document元素中</pre>
</div>

&nbsp;

### 保存数据

&emsp;&emsp;一旦该元素使用了userData行为，那么就可以使用setAttribute()方法在上面保存数据了。为了将数据提交到浏览器缓存中，还必须调用save()方法并告诉它要保存到的数据空间的名字。数据空间名字可以完全任意，仅用于区分不同的数据集

<div>
<pre>var dataStore = document.getElementById("dataStore");
dataStore.setAttribute("name", "Nicholas");
dataStore.setAttribute("book", "Professional JavaScript");
dataStore.save("BookInfo");</pre>
</div>

&emsp;&emsp;在这段代码中，&lt;div&gt;元素上存入了两部分信息。在用setAttribute()存储了数据之后，调用了save()方法，指定了数据空间的名称为BookInfo

&nbsp;

### 读取数据

&emsp;&emsp;load()方法用于载入存储的数据。使用它的时候必须传递一个字符串作为参数&mdash;&mdash;类似于一个文件名，该参数用来指定要载入的存储数据。当数据载入后，就可以通过该元素的属性来访问这些名/值对形式的数据，可以使用getAttribute()来査询这些数据，如下所示

<div>
<pre>dataStore.load("BookInfo")；
console.log(dataStore.getAttribute("name"));//"Nicholas"
console.log(dataStore.getAttribute("book"));//"Professional JavaScript"</pre>
</div>

&emsp;&emsp;对load()的调用获取了BookInfo数据空间中的所有信息，并且使数据可以通过元素访问；只有到载入确切完成之后数据方能使用。如果getAttribute()调用了不存在的名称或者是尚未载入的名称，则返回null

&emsp;&emsp;注意：IE11浏览器报错，IE9、10浏览器返回null

&nbsp;

### 删除数据

&emsp;&emsp;可以通过removeAttribute()方法明确指定要删除某元素数据，只要指定属性名称。删除之后，必须像下面这样再次调用save()来提交更改

<div>
<pre>dataStore.removeAttribute("name");
dataStore.removeAttribute("book");
dataStore.save("BookInfo");</pre>
</div>

&emsp;&emsp;这段代码删除了两个数据属性，然后将更改保存到缓存中

&nbsp;

### 有效期

&emsp;&emsp;默认情况下，通过userData存储的数据，除非手动去删除它否则永不失效。但是，也可以通过设置expires属性来指定它的过期时间。比如，可以给存储的数据设置时长100天的有效期，如下所示：

<div>
<pre>var now = (new Date()).getTime();
var expires = now + 100 * 24 * 60 * 60 * 1000;
expires = new Date(expires).toUTCString();
memory.expires = expires;</pre>
</div>

&emsp;&emsp;IE userData的作用域限制在和当前文档同目录的文档中。作用域没有cookie宽泛，cookie对其所在目录下的子目录也有效。userData的机制并没有像cookie那样，通过设置path和domain属性来控制或者改变其作用域的方式

&emsp;&emsp;userData允许存储的数据量要比cookie大，但是却比localStorage以及sessionStorage允许存储的数据量要小

&nbsp;

## 最后

&emsp;&emsp;由于上述代码只在IE浏览器下有效，最好使用IE条件注释来避免其他浏览器载入上述代码

<div>
<pre>&lt;!--[if IE]&gt;
&lt;![endif]--&gt;</pre>
</div>
