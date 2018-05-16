# iframe跨域

&emsp;&emsp;script、image、iframe的src都不受同源策略的影响。所以可以借助这一特点，实现跨域。例如，前面介绍的[jsonp](http://www.cnblogs.com/xiaohuochai/p/6568039.html)是使用script标签，[imgPing](http://www.cnblogs.com/xiaohuochai/p/6567712.html)是使用image标签，而本文将介绍使用iframe标签实现跨域

&nbsp;

### 引入

&emsp;&emsp;1995年，同源政策由 Netscape 公司引入浏览器。目前，所有浏览器都实行这个政策。最初，它的含义是指，A 网页设置的 Cookie，B 网页不能打开，除非这两个网页&ldquo;同源&rdquo;。所谓&ldquo;同源&rdquo;指的是&rdquo;三个相同&ldquo;：1、协议相同；2、域名相同；3、端口相同

&emsp;&emsp;举例来说，`http://www.example.com/dir/page.html`这个网址，协议是`http://`，域名是`www.example.com`，端口是`80`（默认端口可以省略）。它的同源情况如下

<div>
<pre>http://www.example.com/dir2/other.html：同源
http://example.com/dir/other.html：不同源（域名不同）
http://v2.www.example.com/dir/other.html：不同源（域名不同）
http://www.example.com:81/dir/other.html：不同源（端口不同）
https://www.example.com/dir/page.html：不同源（协议不同）</pre>
</div>

&emsp;&emsp;同源政策的目的，是为了保证用户信息的安全，防止恶意的网站窃取数据。

&emsp;&emsp;设想这样一种情况：A 网站是一家银行，用户登录以后，又去浏览其他网站。如果其他网站可以读取 A 网站的 Cookie，会发生什么？很显然，如果 Cookie 包含隐私（比如存款总额），这些信息就会泄漏。更可怕的是，Cookie 往往用来保存用户的登录状态，如果用户没有退出登录，其他网站就可以冒充用户，为所欲为。因为浏览器同时还规定，提交表单不受同源政策的限制。

&emsp;&emsp;由此可见，&ldquo;同源政策&rdquo;是必需的，否则 Cookie 可以共享，互联网就毫无安全可言了

&emsp;&emsp;随着互联网的发展，&ldquo;同源政策&rdquo;越来越严格。目前，如果非同源，共有三种行为受到限制

&emsp;&emsp;1、Cookie、LocalStorage 和 IndexedDB 无法读取

&emsp;&emsp;2、DOM 无法获得

&emsp;&emsp;3、AJAX 请求无效（可以发送，但浏览器会拒绝接受响应）

&emsp;&emsp;虽然这些限制是必要的，但是有时很不方便，合理的用途也受到影响

&nbsp;

### iframe

&emsp;&emsp;`iframe`元素可以在当前网页之中，嵌入其他网页。每个`iframe`元素形成自己的窗口，即有自己的`window`对象。`iframe`窗口之中的脚本，可以获得父窗口和子窗口。但是，只有在同源的情况下，父窗口和子窗口才能通信；如果跨域，就无法拿到对方的DOM

&emsp;&emsp;注意：关于iframe的详细信息[移步至此](http://www.cnblogs.com/xiaohuochai/p/5047343.html#anchor6)

&emsp;&emsp;比如，父窗口和子窗口的代码如下所示，都处于localhost域下

<div>
<pre>&lt;!-- 父窗口test.html--&gt;
&lt;body&gt;
  &lt;iframe id="myIFrame" src="iframe.html"&gt;&lt;/iframe&gt;
  &lt;script&gt;
    var iframe = document.getElementById("myIFrame");
    iframe.onload = function(){
      var doc = iframe.contentWindow.document;
      console.log(doc.getElementById('test').innerHTML);//'xiaohuochai'
      console.log(document.cookie);//'name=match'
    }
  &lt;/script&gt;
&lt;/body&gt;
&lt;!-- 子窗口iframe.html--&gt;
&lt;body&gt;
  &lt;div id="test"&gt;xiaohuochai&lt;/div&gt;
  &lt;script&gt;
  document.cookie = 'name=match';
  &lt;/script&gt;
&lt;/body&gt;</pre>
</div>

&emsp;&emsp;如果`iframe`窗口不是同源，如处于文件域下`（file:///C:/Users/Administrator/Desktop/demo/js/test.html）`，就会报错

<div>
<pre>  &lt;iframe id="myIFrame" src="iframe.html"&gt;&lt;/iframe&gt;
  &lt;script&gt;
    var iframe = document.getElementById("myIFrame");
    iframe.onload = function(){
  　　//Uncaught DOMException: Blocked a frame with origin "null" from accessing a cross-origin frame.
      console.log(iframe.contentWindow.document);
    }
  &lt;/script&gt;</pre>
</div>

&emsp;&emsp;上面命令中，父窗口想获取子窗口的DOM，因为跨域导致报错。

&emsp;&emsp;反之亦然，子窗口获取主窗口的DOM也会报错。

<div>
<pre>window.parent.document.body
// 报错</pre>
</div>

&emsp;&emsp;这种情况不仅适用于`iframe`窗口，还适用于`window.open`方法打开的窗口，只要跨域，父窗口与子窗口之间就无法通信

&nbsp;

### domain属性

&emsp;&emsp;如果两个窗口一级域名相同，只是二级域名不同，可以通过设置`document.domain`来使其通信

&emsp;&emsp;父窗口地址为`https://static.xiaohuochai.site/test/test.html`

&emsp;&emsp;子窗口地址为`https://demo.xiaohuochai.site/test/iframe.html`

&emsp;&emsp;代码如下

<div>
<pre>&lt;!-- 父窗口test.html--&gt;
&lt;body&gt;
  &lt;iframe id="myIFrame" src="https://demo.xiaohuochai.site/test/iframe.html"&gt;&lt;/iframe&gt;
  &lt;script&gt;
    var iframe = document.getElementById("myIFrame");
    iframe.onload = function(){
      var doc = iframe.contentWindow.document;
      console.log(doc.getElementById('test').innerHTML);//'xiaohuochai'
      console.log(document.cookie);
    }
  &lt;/script&gt;
&lt;/body&gt;
&lt;!-- 子窗口iframe.html--&gt;
&lt;body&gt;
  &lt;div id="test"&gt;xiaohuochai&lt;/div&gt;
  &lt;script&gt;
  document.cookie = 'name=match';
  &lt;/script&gt;
&lt;/body&gt;</pre>
</div>

&emsp;&emsp;由结果所示，通过设置document.domain只能获取DOM，而Cookie、LocalStorage 和 IndexedDB 无法读取

&nbsp;

### 锚点值

&emsp;&emsp;锚点值，又称为片段标识符（fragment identifier），指的是URL的`#`号后面的部分，比如`http://example.com/x.html#fragment`的`#fragment`。如果只是改变片段标识符，页面不会重新刷新

&emsp;&emsp;父窗口可以把信息，写入子窗口的锚点值

<div>
<pre>var src = originURL + '#' + data;
document.getElementById('myIFrame').src = src;</pre>
</div>

&emsp;&emsp;子窗口通过监听`hashchange`事件得到通知

<div>
<pre>window.onhashchange = checkMessage;
function checkMessage() {
  var message = window.location.hash;
  // ...
}</pre>
</div>

&emsp;&emsp;同样的，子窗口也可以改变父窗口的片段标识符

<div>
<pre>parent.location.href= target + '#' + hash;</pre>
</div>

&emsp;&emsp;下面是具体代码

<div>
<pre>&lt;!-- 父窗口test.html--&gt;
&lt;body&gt;
  &lt;iframe id="myIFrame" src="iframe.html"&gt;&lt;/iframe&gt;
  &lt;script&gt;
    var iframe = document.getElementById("myIFrame");
    window.onhashchange = function (e) {
      console.log(/.*#(.*)/g.exec(e.newURL)[1])//'xiaohuochai'  
    } 
  &lt;/script&gt;
&lt;/body&gt;
&lt;!-- 子窗口iframe.html--&gt;
&lt;body&gt;
  &lt;div id="test"&gt;xiaohuochai&lt;/div&gt;
  &lt;script&gt;
    parent.location.href = 'test.html' + '#' + test.innerHTML;
  &lt;/script&gt;
&lt;/body&gt;</pre>
</div>

&nbsp;

### XDM

&emsp;&emsp;上面两种方法都属于破解，HTML5为了解决这个问题，引入了一个全新的API：跨文档通信 API

&emsp;&emsp;注意：IE8-浏览器不支持

&emsp;&emsp;跨文档消息传送（cross-document messaging)，有时候简称为XDM，指的是在来自不同域的页面间传递消息。例如，www.wrox.com域中的页面与位于一个内嵌框架中的p2p.wrox.com域中的页面通信。 在XDM机制出现之前，要稳妥地实现这种通信需要花很多工夫。XDM把这种机制规范化，让我们能既稳妥又简单地实现跨文档通信

&emsp;&emsp;XDM的核心是postMessage ()方法。在HTML5规范中，除了 XDM部分之外的其他部分也会提到这个方法名，但都是为了同一个目的：向另一个地方传递数据。对于XDM而言，&ldquo;另一个地方&rdquo;指的是包含在当前页面中的&lt;iframe&gt;元素，或者由当前页面弹出的窗口

&emsp;&emsp;postMessage()方法接收两个参数：一条消息和一个表示消息接收方来自哪个域的字符串。第二个参数对保障安全通信非常重要，可以防止浏览器把消息发送到不安全的地方

&emsp;&emsp;来看下面的例子。

<div>
<pre>//注意：所有支持XDM的浏览器也支持ifraaie的contentWindow属性
var iframeWindow = document.getElementById("rayframe").contentWindow,
iframeWindow.postMessage( "A secret', "http://www.wrox.com")；</pre>
</div>

&emsp;&emsp;最后一行代码尝试向内嵌框架中发送一条消息，并指定框架中的文档必须来源于"`http://www.wrox.com`"域。如果来源匹配，消息会传递到内嵌框架中；否则，postMessage()什么也不做。 这一限制可以避免窗口中的位置在你不知情的情况下发生改变。如果传给postMessage()的第二个参数是"*"，则表示可以把消息发送给来自任何域的文档，但不推荐这样做

&emsp;&emsp;接收到XDM消息时，会触发window对象的message事件。这个事件是以异步形式触发的，因此从发送消息到接收消息（触发接收窗口的message事件）可能要经过一段时间的延迟。触发message事件后，传递给onmessage处理程序的事件对象包含以下三方面的重要信息

<div>
<pre>data:作为postMessage()第一个参数传入的字符串数据
origin:发送消息的文档所在的域，例如"http://www.wrox.com"。 
source:发送消息的文档的window对象的代理。这个代理对象主要用于在发送上一条消息的窗口中调用postMessage()方法。如果发送消息的窗口来自同一个域，那这个对象就是window</pre>
</div>

&emsp;&emsp;接收到消息后验证发送窗口的来源是至关重要的。就像给postMessage()方法指定第二个参数， 以确保浏览器不会把消息发送给未知页面一样，在onmessage处理程序中检测消息来源可以确保传入的消息来自已知的页面。基本的检测模式如下

<div>
<pre>window.onmessage = function(e){
  if(e.origin == 'http://www.wrox.com'){
    //处理接收到的数据
    processMessage(e.data);
    //可选：向来源窗口发送回执
    e.source.postMessage("Received!", "http//p2p.wrox.com");
  }
}</pre>
</div>

&emsp;&emsp;注意：event.source大多数情况下只是window对象的代理，并非实际的window对象。换句话说，不能通过这个代理对象访问window对象的其他任何信息。只通过这个代理调用 postMessage()就好，这个方法永远存在，永远可以调用

&emsp;&emsp;XDM还有一些怪异之处

&emsp;&emsp;postMessage()的第一个参数最早是作为&ldquo;永远都是字符串&rdquo;来实现的。但后来这个参数的定义改了，改成允许传入任何数据结构。可是，并非所有浏览器都实现了这一变化。为保险起见，使用postMessage()时，最好还是只传字符串。如果想传入结构化的数据，最佳选择是先在要传入的数据上调用JSON.stringify()，通过postMessage()传入得到的字符串，然 后再在onmessage事件处理程序中调用JSON.parse()

&emsp;&emsp;在通过内嵌框架加载其他域的内容时，使用XDM是非常方便的。因此，在混搭（mashup)和社交网络应用中，这种传递消息的方法极为常用。有了XDM，包含&lt;iframe&gt;的页面可以确保自身不受恶意内容的侵扰，因为它只通过XDM与嵌入的框架通信。而XDM也可以在来自相同域的页面间使用

&emsp;&emsp;下面是一个实例

&emsp;&emsp;父窗口地址为`https://static.xiaohuochai.site/test/test_1.html`

&emsp;&emsp;子窗口地址为`https://demo.xiaohuochai.site/test/iframe_1.html`

&emsp;&emsp;代码如下

<div>
<pre>&lt;!-- 父窗口test_1.html--&gt;
&lt;body&gt;
  &lt;iframe id="myIFrame" src="https://demo.xiaohuochai.site/test/iframe_1.html"&gt;&lt;/iframe&gt;
  &lt;script&gt;
    window.onmessage = function (e) {
      if(e.origin === 'https://demo.xiaohuochai.site'){
        console.log(e.data);//'xiaohuochai'
      }
    }
  &lt;/script&gt;
&lt;/body&gt;
&lt;!-- 子窗口iframe_1.html--&gt;
&lt;body&gt;
  &lt;script&gt;
  if (window.parent !== window.self) {
    window.parent.postMessage('xiaohuochai', 'https://static.xiaohuochai.site');
  }
  &lt;/script&gt;
&lt;/body&gt;</pre>
</div>

