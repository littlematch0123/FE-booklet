# CORS

&emsp;&emsp;通过XHR实现Ajax通信的一个主要限制，来源于跨域安全策略。默认情况下，XHR对象只能访问与包含它的页面位于同一个域中的资源。这种安全策略可以预防某些恶意行为。但是，实现合理的跨域请求对开发某些浏览器应用程序也是至关重要的。CORS(Cross-Origin Resource Sharing)跨源资源共享是W3C的一个工作草案，定义了在必须访问跨源资源时，浏览器与服务器应该如何沟通。它允许浏览器向跨源服务器，发出XMLHttpRequest请求，从而克服了AJAX只能同源使用的限制。本文将详细介绍CORS的内容

&nbsp;

### 简单请求

&emsp;&emsp;浏览器将CORS请求分成两类：简单请求(simple request)和非简单请求(not-so-simple request)

&emsp;&emsp;只要同时满足以下两大条件，就属于简单请求

&emsp;&emsp;1、请求方法是以下三种方法之一：HEAD、GET、POST

&emsp;&emsp;2、HTTP的头信息不超出以下几种字段：Accept、Accept-Language、Content-Language、Last-Event-ID、(Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain)

&emsp;&emsp;凡是不同时满足上面两个条件，就属于非简单请求

&emsp;&emsp;CORS背后的基本思想，就是使用自定义的HTTP头部让浏览器与服务器进行沟通，从而决定请求或响应是应该成功，还是应该失败

&emsp;&emsp;对于简单请求，浏览器直接发出CORS请求。具体来说，就是在头信息之中，需要给它附加一个额外的origin头部，其中包含请求页面的源信息(协议、域名和端口)，以便服务器根据这个头部信息来决定是否给予响应

&emsp;&emsp;浏览器如果发现跨源AJAX请求是简单请求，就自动在头信息之中，添加一个Origin字段

<div>
<pre>Accept:*/*
Accept-Encoding:gzip, deflate, br
Accept-Language:zh-CN,zh;q=0.8,en;q=0.6
Connection:keep-alive
Content-Length:0
Host:www.webhuochai.com
Origin:http://127.0.0.1
Referer:http://127.0.0.1/cors.html
User-Agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.98 Safari/537.36</pre>
</div>

&emsp;&emsp;上面的头信息中，Origin字段用来说明，本次请求来自哪个源(协议 + 域名 + 端口)。服务器根据这个值，决定是否同意这次请求

&emsp;&emsp;如果服务器认为这个请求可以接受，就在Access-Control-Allow-Origin头部中回发相同的源信息(如果是公共资源，可以回发" *" )

<div>
<pre>Request URL:https://www.webhuochai.com/test/iecors.php
Request Method:POST
Status Code:200 OK
Remote Address:218.247.93.253:443
Referrer Policy:no-referrer-when-downgrade</pre>
</div>

&emsp;&emsp;如果Origin指定的源，不在许可范围内，服务器会返回一个正常的HTTP回应。浏览器发现，这个回应的头信息没有包含Access-Control-Allow-Origin字段，就知道出错了，从而抛出一个错误，被XMLHttpRequest的onerror回调函数捕获。但是，这种错误无法通过状态码识别，因为HTTP回应的状态码有可能是200

&emsp;&emsp;注意：请求和响应都不包含cookie信息

&nbsp;

### 原生支持

&emsp;&emsp;标准浏览器都通过XMLHttpRequest对象实现了对CORS的原生支持。在尝试打开不同来源的资源时，无需额外编写代码就可以触发这个行为。要请求位于另一个域中的资源，使用标准的XHR对象并在open()方法中传入绝对URL即可

&emsp;&emsp;注意：IE9-浏览器不支持

<div>
<pre>&lt;input id="btn" type="button" value="跨域请求"&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
btn.onclick = function(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if ((xhr.status &gt;= 200 &amp;&amp; xhr.status &lt; 300)|| xhr.status == 304){
                result.innerHTML = xhr.responseText;
            }else{
                alert("Request was unsuccessful: " + xhr.status);
            }    
        }
    };
    xhr.open("post", "https://www.webhuochai.com/test/iecors.php", true);
    xhr.send(null);    
}
&lt;/script&gt;    </pre>
</div>

&emsp;&emsp;CORS主要需要在后端进行设置，以PHP为例

&emsp;&emsp;通过设置header()方法，&ldquo;*&rdquo;号表示允许任何域向服务端提交请求：

<div>
<pre>header( " Access-Control-Allow-Origin: * " );</pre>
</div>

&emsp;&emsp;也可以设置指定的域名，如域名"`https://www.webhuochai.com`"，那么就允许来自这个域名的请求

<div>
<pre>header( " Access-Control-Allow-Origin: https://www.webhuochai.com" );</pre>
</div>

&emsp;&emsp;通过跨域XHR对象可以访问status和statusText属性，而且还支持同步请求。跨域XHR对象也有一些限制，但为了安全这些限制是必需的

&emsp;&emsp;1、不能使用setRequestHeader()设置自定义头部

&emsp;&emsp;2、不能发送和接收cookie

&emsp;&emsp;3、调用getAllResponseHeaders()方法总会返回空字符串

&emsp;&emsp;由于无论同源请求还是跨源请求都使用相同的接口，因此对于本地资源，最好使用相对URL，在访问远程资源时再使用绝对URL。这样做能消除歧义，避免出现限制访问头部或本地cookie信息等问题

&nbsp;

### IE实现

&emsp;&emsp;微软引入了XDR(XDomainRquest)类型。这个对象与XHR类似，但能实现安全可靠的跨域通信。XDR对象的安全机制部分实现了W3C的CORS规范

&emsp;&emsp;注意：IE11浏览器不支持

&emsp;&emsp;以下是XDR与XHR的一些不同之处

&emsp;&emsp;1、cookie不会随请求发送，也不会随响应返回

&emsp;&emsp;2、只能设置请求头部信息中的Content-Type字段

&emsp;&emsp;3、不能访问响应头部信息

&emsp;&emsp;4、只支持GET和POST请求

&emsp;&emsp;这些变化使CSRF(Cross-Site Request Forgery)跨站点请求伪造和XSS(Cross-Site Scripting)跨站点脚本的问题得到了缓解。被请求的资源可以根据它认为合适的任意数据(用户代理、来源页面等)来决定是否设置Access-Control-Allow-Origin头部。作为请求的一部分，Origin头部的值表示请求的来源域，以便远程资源明确地识别XDR请求

&emsp;&emsp;XDR对象的使用方法与XHR对象非常相似。也是创建一个XDomainRequest的实例，调用open()方法，再调用send()方法。但与XHR对象的open()方法不同，XDR对象的open()方法只接收两个参数：请求的类型和URL

&emsp;&emsp;所有XDR请求都是异步执行的，不能用它来创建同步请求。请求返回之后，会触发load事件，响应的数据也会保存在responseText属性中，如下所示

<div>
<pre>&lt;input id="btn" type="button" value="跨域请求"&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
btn.onclick = function(){
    var xdr = new XDomainRequest();
    xdr.onload = function(){
        result.innerHTML = xdr.responseText;
    };
    xdr.open("get", "https://www.webhuochai.com/test/iecors.php");
    xdr.send(null);
}
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;注意：在IE浏览器中，不支持http与https之间，即不同协议间的跨域请求，会提示SCRIPT5: 拒绝访问

&emsp;&emsp;在接收到响应后，只能访问响应的原始文本；没有办法确定响应的状态代码。而且，只要响应有效就会触发load事件，如果失败(包括响应中缺少Access-Control-Allow-Origin头部)就会触发error事件。遗憾的是，除了错误本身之外，没有其他信息可用，因此唯一能够确定的就只有请求未成功了

<div>
<pre>var xdr = new XDomainRequest();
xdr.onload = function(){
    alert(xdr.responseText)；
};
xdr.onerror = function(){
    alert("An error occurred.");
}
xdr.open("get", "https://www.webhuochai.com/test/iecors.php");
xdr.send(null);</pre>
</div>

&emsp;&emsp;鉴于导致XDR请求失败的因素很多，因此建议不要忘记通过onerror事件处理程序来捕获该事件；否则，即使请求失败也不会有任何提示

&emsp;&emsp;在请求返回前调用abort()方法可以终止请求

<div>
<pre>xdr.abort(); //终止请求</pre>
</div>

&emsp;&emsp;与XHR一样，XDR对象也支持timeout属性以及ontimeout事件处理程序

<div>
<pre>var xdr = new XDomainRequest();
xdr.onload = function(){
    alert(xdr.responseText);
};
xdr.timeout = 1000;
xdr.ontimeout = function(){
    alert("Request took too long.");
};
xdr.open("get", "https://www.webhuochai.com/test/iecors.php");
xdr.send(null);</pre>
</div>

&emsp;&emsp;这个例子会在运行1秒钟后超时，并随即调用ontimeout事件处理程序

&emsp;&emsp;为支持POST请求，XDR对象提供了contentType属性，用来表示发送数据的格式

<div>
<pre>var xdr = new XDomainRequest();
xdr.onload = function(){
    alert(xdr.responseText);
};
xdr.onerror = function(){
    alert("An error occurred.");
};
xdr.open("post", "https://www.webhuochai.com/test/iecors.php");
xdr.contentType = "application/x-www-form-urlencoded";
xdr.send("name1=value1&amp;name2=value2");</pre>
</div>

&emsp;&emsp;这个属性是通过XDR对象影响头部信息的唯一方式

&nbsp;

### Preflight

&emsp;&emsp;CORS通过一种叫做Preflighted Requests(预检请求)的透明服务器验证机制支持开发人员使用自定义的头部、GET或POST之外的方法，以及不同类型的主体内容

&emsp;&emsp;注意：IE10-浏览器不支持

&emsp;&emsp;在使用下列高级选项来发送请求时，就会向服务器发送一个Preflight请求。这种请求使用OPTIONS方法，发送下列头部

&emsp;&emsp;1、Origin:与简单的请求相同

&emsp;&emsp;2、Access-Control-Request-Method:请求自身使用的方法

&emsp;&emsp;3、Access-Control-Request-Headers:(可选)自定义的头部信息，多个头部以逗号分隔

&emsp;&emsp;以下是一个带有自定义头部NCZ的使用POST方法发送的请求

<div>
<pre>Origin: http://www.nczonline.net
Access-Control-Request-MeChod: POST
Access-Control-Request-Headers: NCZ</pre>
</div>

&emsp;&emsp;发送这个请求后，服务器可以决定是否允许这种类型的请求。服务器通过在响应中发送如下头部与浏览器进行沟通

&emsp;&emsp;1、Access-Control-Allow-Origin:与简单的请求相同

&emsp;&emsp;2、Access-Control-Allow-Methods:允许的方法，多个方法以逗号分隔

&emsp;&emsp;3、Access-Control-Allow-Headers:允许的头部，多个头部以逗号分隔

&emsp;&emsp;4、Access-Control-Max-Age:应该将这个Preflight请求缓存多长时间(以秒表示)

<div>
<pre>Access-Control-Allow-Origin: http://www.nczonline.net
Access-Control-Allow-Methods: POST, GET
Access-Control-Allow-Headers: NCZ
Access-Control-Max-Age: 1728000</pre>
</div>

&emsp;&emsp;Preflight请求结束后，结果将按照响应中指定的时间缓存起来。而为此付出的代价只是第一次发送这种请求时会多一次HTTP请求

&nbsp;

### 带凭据请求

&emsp;&emsp;默认情况下，跨源请求不提供凭据(cookie、HTTP认证及客户端SSL证明等)。通过将withCredentials属性设置为true，可以指定某个请求应该发送凭据

&emsp;&emsp;注意：IE10-浏览器不支持

&emsp;&emsp;如果服务器接受带凭据的请求，会用下面的HTTP头部来响应

<div>
<pre>Access-Control-Allow-Credentials: true</pre>
</div>

&emsp;&emsp;开发者必须在AJAX请求中打开withCredentials属性

<div>
<pre>var xhr = new XMLHttpRequest();
xhr.withCredentials = true;</pre>
</div>

&emsp;&emsp;否则，即使服务器同意发送Cookie，浏览器也不会发送。或者，服务器要求设置Cookie，浏览器也不会处理

&emsp;&emsp;但是，如果省略withCredentials设置，有的浏览器还是会一起发送Cookie。这时，可以显式关闭withCredentials

<div>
<pre>xhr.withCredentials = false;</pre>
</div>

&emsp;&emsp;如果发送的是带凭据的请求，但服务器的响应中没有包含这个头部，那么浏览器就不会把响应交给javascript(于是，responseText中将是空字符串，status的值为0，而且会调用onerror()事件处理程序)。另外，服务器还可以在Preflight响应中发送这个HTTP头部，表示允许源发送带凭据的请求

&emsp;&emsp;需要注意的是，如果要发送Cookie，Access-Control-Allow-Origin就不能设为星号，必须指定明确的、与请求网页一致的域名。同时，Cookie依然遵循同源政策，只有用服务器域名设置的Cookie才会上传，其他域名的Cookie并不会上传，且(跨源)原网页代码中的document.cookie也无法读取服务器域名下的Cookie

&nbsp;

### 跨浏览器

&emsp;&emsp;即使浏览器对CORS的支持程度并不都一样，但所有浏览器都支持简单的(非Preflight和不带凭据的)请求，因此有必要实现一个跨浏览器的方案。检测XHR是否支持CORS的最简单方式，就是检査是否存在withCredentials属性。再结合检测XDomainRequest对象是否存在，就可以兼顾所有浏览器了

<div>
<pre>function createCORSRequest(method, url){
    var xhr = new XMLHttpRequest();
    //标准浏览器
    if("withCredentials" in xhr){
        xhr.open(method, url, true);
    //IE10-浏览器
    }else if(typeof XDomainRequest != "undefined"){
        xhr = new XDomainRequest();
        xhr.open(method, url); 
    } 
    return xhr;
}</pre>
</div>

&emsp;&emsp;非IE浏览器中的XMLHttpRequest对象与IE中的XDomainRequest对象类似，都提供了够用的接口，因此以上模式还是相当有用的。这两个对象共同的属性/方法如下

&emsp;&emsp;1、abort():用于停止正在进行的请求

&emsp;&emsp;2、onerror:用于替代 onreadystatechange 检测错误

&emsp;&emsp;3、onload:用于替代 onreadystatechange 检测成功

&emsp;&emsp;4、responseText:用于取得响应内容

&emsp;&emsp;5、send():用于发送请求

