# BOM之location对象

&emsp;&emsp;location提供了与当前窗口中加载的文档有关的信息，还提供了一些导航功能。location是一个很特别的对象，因为它既是window对象的属性，也是document对象的属性，而且还可以单独使用。本文将详细介绍location对象

<div>
<pre>//Location {hash: "", search: "", pathname: "/", port: "8080", hostname: "127.0.0.1"&hellip;}
console.log(window.location);
//Location {hash: "", search: "", pathname: "/", port: "8080", hostname: "127.0.0.1"&hellip;}
console.log(document.location);
//Location {hash: "", search: "", pathname: "/", port: "8080", hostname: "127.0.0.1"&hellip;}
console.log(location);</pre>
</div>

&nbsp;

### 属性

&emsp;&emsp;location将URL解析成独立的片段，让开发人员可以通过不同的属性访问这些片段

![location](https://pic.xiaohuochai.site/blog/JS_BOM_location.jpg)

<div>
<pre>var URL = 'http://localhost:8080/index.html#text?q=test';
console.log(location.hash);//#text?q=test
console.log(location.host);//localhost:8080
console.log(location.hostname);//localhost
console.log(location.href);//http://localhost:8080/index.html#text?q=test
console.log(location.pathname);///index.html
console.log(location.port);//8080
console.log(location.protocol);//http:
console.log(location.search);''</pre>
</div>

&emsp;&emsp;如果URL中'?'之前有一个'#'，比如'#text?q=test'，那么，location.search得到的就是空字符串''，因为location.search只有取到'?'后面和'#'前面的内容

<div>
<pre>var URL = 'http://localhost:8080/index.html?q=test#text';
console.log(location.hash);//#text
console.log(location.search);//?q=test</pre>
</div>

&emsp;&emsp;尽管location.search返回从问号到URL末尾的所有内容，但却没有办法逐个访问其中的每个查询字符串参数。为此，创建一个函数，用以解析查询字符串，然后返回包含所有参数的一个对象:

<div>
<pre>function getQueryStringArgs(){
    //取得查询字符串并去掉开头的问号
    var qs = location.search.length &gt; 0  ? location.search.substring(1) : "";
    //保存数据的对象
    var args = {};
    //取得每一项
    var items = qs.length ? qs.split("&amp;") : [];
    var item,name,value;
    var len = items.length;
    //逐个将每一项添加到args对象中
    for(var i = 0; i &lt; len; i++){
        item = items[i].split("=");
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if(name.length){
            args[name] = value;
        }
    }
    return args;
}
location.search = "?name=abc&amp;password=123&amp;callback=fn";
console.log(getQueryStringArgs());//[name: "abc", password: "123", callback: "fn"]</pre>
</div>

&nbsp;

### 方法

&emsp;&emsp;使用location对象可以通过很多方式来改变浏览器的位置

【1】assign()

&emsp;&emsp;使用assign()方法并为其传递一个URL，可以立即打开新URL并在浏览器的历史记录中生成一条记录。如果是将location.href或window.location设置为一个URL值，相当于调用assign()方法。

<div>
<pre>location.assign("http://baidu.com");
window.location = "http://baidu.com";
document.location = "http://baidu.com";
location.href = "http://baidu.com";//最常用</pre>
</div>

&emsp;&emsp;每当修改location的属性(hash除外)，页面都会以新URL重新加载

<div>
<pre>//修改hash值
location.hash = "#section1";
//修改查询字符串
location.search = "?q=javascript";
//修改主机名
location.hostname = "www.baidu.com"
//修改路径
location.pathname = "mydir"
//修改端口号
location.port = "8080"</pre>
</div>

【2】replace()

&emsp;&emsp;通过上述任意一种方式修改URL后，浏览器的历史记录都会生成一条新记录，因此用户通过单击后退按钮会导航到前一个页面

&emsp;&emsp;而要禁用这种行为，可以使用replace()方法，该方法接收一个参数即要导航到的URL，结果虽然会导致浏览器位置改变，但不会在历史记录中生成新记录，也就是说用户不能回到前一个页面

&emsp;&emsp;注意：只有chrome下有效

<div>
<pre>location.replace("http://baidu.com")</pre>
</div>

【3】reload()

&emsp;&emsp;reload()方法用于重新加载当前显示的页面。如果调用reload()方法时不传递任何参数，页面会以最有效的方式重新加载。也就是说，如果页面自上次请求以来并没有改变过，页面就会从浏览器缓存中重新加载。如果要强制从服务器重新加载，则需要传递参数true

&emsp;&emsp;位于reload()调用之后的代码可能会也可能不会执行，这要取决于网络延迟或系统资源等因素，为此，最好将reload()放在代码的最后一行

<div>
<pre>//有可能从缓存中加载
location.reload();</pre>
</div>
<div>
<pre>//从服务器重新加载
location.reload(true);</pre>
</div>

&emsp;&emsp;注意：千万不要在页面中直接使用location.reload()方法，此方法会造成页面的无限刷新。因为页面刚加载完成，遇到该方法，则重新加载页面，又遇到该方法，则又加载页面，从而造成页面的无限刷新

&nbsp;

### 事件

&emsp;&emsp;HTML5新增了hashchange事件，以便在URL的参数列表(及URL中&ldquo;#&rdquo;号后面的所有字符串)发生变化时通知开发人员。之所以新增这个事件，是因为在Ajax应用中，开发人员经常要利用URL参数列来保存状态或导航信息

&emsp;&emsp;注意：IE7-浏览器不支持haschange事件

&emsp;&emsp;必须要把hashchange事件处理程序添加给window对象，然后URL参数列表只要变化就会调用它。此时的event对象应该额外包含两个属性：oldURL和newURL。这两个属性分别保存着参数列表变化前后的完整URL

&emsp;&emsp;注意：所有IE浏览器都不支持oldURL和newURL这两个属性

<div>
<pre>window.onhashchange = function(e){
    e = e || event;
    console.log(e.oldURL,e.newURL);
}</pre>
</div>

&emsp;&emsp;对于不支持这两个属性的IE浏览器，可以通过定期检查location.hash属性来模拟

<div>
<pre>(function(window) {
  if ( "onhashchange" in window.document.body ) { return; }
  var location = window.location;
  var oldURL = location.href;
  var oldHash = location.hash;
  // 每隔100毫秒检查一下URL的hash
  setInterval(function() {
    var newURL = location.href;
    var newHash = location.hash;
    if ( newHash != oldHash &amp;&amp; typeof window.onhashchange === "function" ) {
      window.onhashchange({
        type: "hashchange",
        oldURL: oldURL,
        newURL: newURL
      });
      oldURL = newURL;
      oldHash = newHash;
    }
  }, 100);

})(window);</pre>
</div>


