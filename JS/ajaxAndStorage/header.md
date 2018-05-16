# 深入理解ajax系列第六篇——头部信息

&emsp;&emsp;每个HTTP请求和响应都会带有相应的头部信息，其中有的对开发人员有用。XHR对象提供了操作头部信息的方法。本文将详细介绍HTTP的头部信息

&nbsp;

### 默认信息

&emsp;&emsp;默认情况下，在发送XHR请求的同时，还会发送下列头部信息

<div>
<pre>Accept: 浏览器能够处理的内容类型
Accept-Charset: 浏览器能够显示的字符集
Accept-Encoding: 浏览器能够处理的压缩编码
Accept-Language: 浏览器当前设置的语言
Connection: 浏览器与服务器之间连接的类型
Cookie: 当前页面设置的任何Cookie
Host: 发出请求的页面所在的域
User-Agent: 浏览器的用户代理字符串
Referer: 发出请求的页面的URI</pre>
</div>

&emsp;&emsp;注意：HTTP规范将这个头部字段拼错了，而为保证与规范一致，也只能将错就错(正确拼写应该是referrer)

![header](https://pic.xiaohuochai.site/blog/js_ajax_header.png)

&nbsp;

### 设置头部

&emsp;&emsp;使用setRequestHeader()方法可以设置自定义的请求头部信息。这个方法接受两个参数：头部字段的名称头部字段的值。要成功发送请求头部信息，必须在调用open()方法之后且调用send()方法之前调用setRequestHeader()方法&nbsp;

&emsp;&emsp;setRequestHeader()方法的一个常用用途是使用POST请求时，将Content-Type的头部信息设置为表单提交的内容类型

<div>
<pre>xhr.open('post','service.php',true);
xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
xhr.send('data=test123');</pre>
</div>

&emsp;&emsp;注意：尽量使用自定义头部字段名称，不要使用浏览器正常发送的字段名称，否则可能会影响服务器的响应

<div>
<pre>xhr.open('get','test.php',true);
xhr.setRequestHeader('myHeader','myValue');
xhr.send();    </pre>
</div>

&emsp;&emsp;经测试，浏览器无法将自定义的头部字段添加到报文中

&nbsp;

### 获取头部

&emsp;&emsp;调用XHR对象的getResponseHeader()方法并传入头部字段名称，可以取得相应的响应头部信息。而调用getAllResponseHeaders()方法则可以取得一个包含所有头部信息的长字符串

<div>
<pre>var xhr;
if(window.XMLHttpRequest){
    xhr = new XMLHttpRequest();
}else{
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
}
//异步接受响应
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
        if(xhr.status == 200){
             /*
             Date: Wed, 01 Mar 2017 14:00:21 GMT
            Server: Apache/2.4.9 (Win32) PHP/5.5.12
            Connection: Keep-Alive
            X-Powered-By: PHP/5.5.12
            Content-Length: 1134
            Keep-Alive: timeout=5, max=99
            Content-Type: text/html
              */
            console.log(xhr.getAllResponseHeaders());
            console.log(xhr.getResponseHeader('keep-alive'));//timeout=5, max=99
        }else{
            alert('发生错误：' + xhr.status);
        }
    }
}
//发送请求
xhr.open('get','test.php',true);
xhr.send();    </pre>
</div>

&emsp;&emsp;在PHP中，可以调用apache_request_headers()方法来获取请求报文的头部信息

<div>
<pre>/*
array (size=8)
  'Host' =&gt; string '127.0.0.1' (length=9)
  'Connection' =&gt; string 'keep-alive' (length=10)
  'Upgrade-Insecure-Requests' =&gt; string '1' (length=1)
  'User-Agent' =&gt; string 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36' (length=109)
  'Accept' =&gt; string 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8' (length=74)
  'Referer' =&gt; string 'http://127.0.0.1/box.html' (length=25)
  'Accept-Encoding' =&gt; string 'gzip, deflate, sdch, br' (length=23)
  'Accept-Language' =&gt; string 'zh-CN,zh;q=0.8,en;q=0.6' (length=23)
 */
var_dump(apache_request_headers());</pre>
</div>
