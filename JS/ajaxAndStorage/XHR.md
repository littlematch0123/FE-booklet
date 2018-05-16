# 深入理解ajax系列第一篇——XHR对象

&emsp;&emsp;1999年，微软公司发布IE5，第一次引入新功能：允许javascript脚本向服务器发起HTTP请求。这个功能当时并没有引起注意，直到2004年Gmail发布和2005年Google Map发布，才引起广泛重视。2005年2月，ajax这个词第一次正式提出，指围绕这个功能进行开发的一整套做法。从此，ajax成为脚本发起HTTP通信的代名词，W3C也在2006年发布了它的国际标准。本文是ajax系列的第一篇&mdash;&mdash;XHR对象

&nbsp;

### 概述

&emsp;&emsp;ajax是asynchronous javascript and XML的简写，中文翻译是异步的javascript和XML，这一技术能够向服务器请求额外的数据而无须卸载页面，会带来更好的用户体验。虽然名字中包含XML，但ajax通信与数据格式无关

&emsp;&emsp;ajax包括以下几步骤：1、创建AJAX对象；2、发出HTTP请求；3、接收服务器传回的数据；4、更新网页数据

&emsp;&emsp;概括起来，就是一句话，ajax通过原生的`XMLHttpRequest`对象发出HTTP请求，得到服务器返回的数据后，再进行处理

&nbsp;

### 创建

&emsp;&emsp;ajax技术的核心是XMLHttpRequest对象(简称XHR)，这是由微软首先引入的一个特性，其他浏览器提供商后来都提供了相同的实现。XHR为向服务器发送请求和解析服务器响应提供了流畅的接口，能够以异步方式从服务器取得更多信息，意味着用户单击后，可以不必刷新页面也能取得新数据

&emsp;&emsp;IE5是第一款引入XHR对象的浏览器。在IE5中，XHR对象是通过MSXML库中的一个ActiveX对象实现的，而IE7+及其他标准浏览器都支持原生的XHR对象

&emsp;&emsp;创建一个XHR对象，也叫实例化一个XHR对象，因为XMLHTTPRequest()是一个构造函数。下面是创建XHR对象的兼容写法

<div>
<pre>var xhr;
if(window.XMLHttpRequest){
    xhr = new XMLHttpRequest();
}else{
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
}</pre>
</div>

&emsp;&emsp;注意：如果要建立N个不同的请求，就要使用N个不同的XHR对象。当然可以重用已存在的XHR对象，但这会终止之前通过该对象挂起的任何请求

&nbsp;

### 发送请求

**open()**

&emsp;&emsp;在使用XHR对象时，要调用的第一个方法是open()，如下所示，该方法接受3个参数

<div>
<pre>xhr.open("get","example.php", false);</pre>
</div>

&emsp;&emsp;1、open()方法的第一个参数用于指定发送请求的方式，这个字符串，不区分大小写，但通常使用大写字母。"GET"和"POST"是得到广泛支持的

&emsp;&emsp;"GET"用于常规请求，它适用于当URL完全指定请求资源，当请求对服务器没有任何副作用以及当服务器的响应是可缓存的情况下

&emsp;&emsp;"POST"方法常用于HTML表单。它在请求主体中包含额外数据且这些数据常存储到服务器上的数据库中。相同URL的重复POST请求从服务器得到的响应可能不同，同时不应该缓存使用这个方法的请求

&emsp;&emsp;除了"GET"和"POST"之外，参数还可以是"HEAD"、"OPTIONS"、"PUT"。而由于安全风险的原因，"CONNECT"、"TRACE"、"TRACK"被禁止使用

&emsp;&emsp;注意：关于HTTP协议8种常用方法的详细介绍[移步至此](http://www.cnblogs.com/xiaohuochai/p/6156435.html#anchor3)

&emsp;&emsp;2、open()方法的第二个参数是URL，该URL相对于执行代码的当前页面，且只能向同一个域中使用相同端口和协议的URL发送请求。如果URL与启动请求的页面有任何差别，都会引发安全错误

&emsp;&emsp;3、open()方法的第三个参数是表示是否异步发送请求的布尔值，如果不填写，默认为true，表示异步发送

&emsp;&emsp;4、如果请求一个受密码保护的URL，把用于认证的用户名和密码作为第4和第5个参数传递给open()方法

**send()**

&emsp;&emsp;send()方法接收一个参数，即要作为请求主体发送的数据。调用send()方法后，请求被分派到服务器

&emsp;&emsp;如果是GET方法，send()方法无参数，或参数为null；如果是POST方法，send()方法的参数为要发送的数据

<div>
<pre>xhr.open("get", "example.txt", false);
xhr.send(null);</pre>
</div>

&nbsp;

### 接收响应

&emsp;&emsp;一个完整的HTTP响应由状态码、响应头集合和响应主体组成。在收到响应后，这些都可以通过XHR对象的属性和方法使用，主要有以下4个属性

<div>
<pre>responseText: 作为响应主体被返回的文本(文本形式)
responseXML: 如果响应的内容类型是'text/xml'或'application/xml'，这个属性中将保存着响应数据的XML DOM文档(document形式)
status: HTTP状态码(数字形式)
statusText: HTTP状态说明(文本形式)</pre>
</div>

&emsp;&emsp;在接收到响应后，第一步是检查status属性，以确定响应已经成功返回。一般来说，可以将HTTP状态码为200作为成功的标志。此时，responseText属性的内容已经就绪，而且在内容类型正确的情况下，responseXML也可以访问了。此外，状态码为304表示请求的资源并没有被修改，可以直接使用浏览器中缓存的版本；当然，也意味着响应是有效的

&emsp;&emsp;无论内容类型是什么，响应主体的内容都会保存到responseText属性中，而对于非XML数据而言，responseXML属性的值将为null

<div>
<pre>if((xhr.status &gt;=200 &amp;&amp; xhr.status &lt; 300) || xhr.status == 304){
    alert(xhr.responseText);
}else{
    alert('request was unsuccessful:' + xhr.status);
}</pre>
</div>

&nbsp;

### 同步

&emsp;&emsp;如果接受的是同步响应，则需要将open()方法的第三个参数设置为false，那么send()方法将阻塞直到请求完成。一旦send()返回，仅需要检查XHR对象的status和responseText属性即可

&emsp;&emsp;同步请求是吸引人的，但应该避免使用它们。客户端javascript是单线程的，当send()方法阻塞时，它通常会导致整个浏览器UI冻结。如果连接的服务器响应慢，那么用户的浏览器将冻结

<div>
<pre>&lt;button id="btn"&gt;获取信息&lt;/button&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
btn.onclick = function(){
    //创建xhr对象
    var xhr;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    //发送请求
    xhr.open('get','/uploads/rs/26/ddzmgynp/message.xml',false);
    xhr.send();
    //同步接受响应
    if(xhr.readyState == 4){
        if(xhr.status == 200){
            //实际操作
            result.innerHTML += xhr.responseText;
        }
    }
}
&lt;/script&gt;    </pre>
</div>
<div>
<pre>//message.xml
&lt;p&gt;hello world&lt;/p&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/xhr/x1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 异步

&emsp;&emsp;如果需要接收的是异步响应，这就需要检测XHR对象的readyState属性，该属性表示请求/响应过程的当前活动阶段。这个属性可取的值如下：

<div>
<pre>0(UNSENT):未初始化。尚未调用open()方法
1(OPENED):启动。已经调用open()方法，但尚未调用send()方法
2(HEADERS_RECEIVED):发送。己经调用send()方法，且接收到头信息
3(LOADING):接收。已经接收到部分响应主体信息
4(DONE):完成。已经接收到全部响应数据，而且已经可以在客户端使用了</pre>
</div>

&emsp;&emsp;理论上，只要readyState属性值由一个值变成另一个值，都会触发一次readystatechange事件。可以利用这个事件来检测每次状态变化后readyState的值。通常，我们对readyState值为4的阶段感兴趣，因为这时所有数据都已就绪

&emsp;&emsp;注意：必须在调用open()之前指定onreadystatechange 事件处理程序才能确保跨浏览器兼容性，否则将无法接收readyState属性为0和1的情况

<div>
<pre>xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
        if(xhr.status == 200){
            alert(xhr.responseText);
        }
    }
}</pre>
</div>
<div>
<pre>&lt;button id="btn"&gt;获取信息&lt;/button&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
btn.onclick = function(){
    //创建xhr对象
    var xhr;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    //异步接受响应
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                //实际操作
                result.innerHTML += xhr.responseText;
            }
        }
    }
    //发送请求
    xhr.open('get','message.xml',true);
    xhr.send();
}
&lt;/script&gt;    </pre>
</div>
<div>
<pre>//message.xml
&lt;p&gt;hello world&lt;/p&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/xhr/x2.html" frameborder="0" width="320" height="240"></iframe>

### 超时

&emsp;&emsp;XHR对象的timeout属性等于一个整数，表示多少毫秒后，如果请求仍然没有得到结果，就会自动终止。该属性默认等于0，表示没有时间限制

&emsp;&emsp;如果请求超时，将触发ontimeout事件

&emsp;&emsp;注意：IE8-浏览器不支持该属性

<div>
<pre>xhr.open('post','test.php',true);
xhr.ontimeout = function(){
    console.log('The request timed out.');
}
xhr.timeout = 1000;
xhr.send();</pre>
</div>

&nbsp;

### 优化

&emsp;&emsp;使用AJAX接收数据时，由于网络和数据大小的原因，并不是立刻就可以在页面中显示出来。所以，更好的做法是，在接受数据的过程中，显示一个类似loading的小图片，并且禁用按钮；当数据完全接收后，再隐藏该图片，并启用按钮

<div>
<pre>&lt;button id="btn"&gt;获取信息&lt;/button&gt;
&lt;img id="img" height="16" style="display:none" src="data:image/gif;base64,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" alt="loading"&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
var add = (function(){
    var counter = 0;
    return function(){
        return ++counter;
    }
})();
btn.onclick = function(){
    img.style.display = 'inline-block';
    btn.setAttribute('disabled','');
    //创建xhr对象
    var xhr;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    //异步接受响应
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
              img.style.display = 'none';
              btn.removeAttribute('disabled');
              var data = JSON.parse(xhr.responseText);
              var sum = add() - 1;
              if(sum &lt; data.length){
                result.innerHTML += data[sum];    
              }
            }
        }
    }
    //发送请求
    xhr.open('get','data.php',true);
    xhr.send();
}
&lt;/script&gt;      </pre>
</div>
<div>
<pre>&lt;?php
echo json_encode([1,2,3,4,5]);
?&gt;</pre>
</div>

<iframe src="https://www.xiaohuochai.site/test/ajaxyouhua.html" frameborder="0" width="320" height="60"></iframe>

&nbsp;

## 最后

&emsp;&emsp;通过实例的演示发现，ajax前端本身的内容并不难。但是，由于ajax涉及到一些后端及网络的知识，使得学起来不是很容易。以后的博文将逐步深入地介绍ajax的重点内容

