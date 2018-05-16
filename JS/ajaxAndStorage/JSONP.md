# JSONP

&emsp;&emsp;JSONP是JSON with padding(填充式JSON或参数式JSON)的简写，是应用JSON的一种新方法，常用于服务器与客户端跨源通信，在后来的Web服务中非常流行。本文将详细介绍JSONP

&nbsp;

### 基础

&emsp;&emsp;JSONP的基本思想是，网页通过添加一个&lt;script&gt;元素，向服务器请求JSON数据，这种做法不受同源政策限制；服务器收到请求后，将数据放在一个指定名字的回调函数里传回来

&emsp;&emsp;当通过&lt;script&gt;元素调用数据时，响应内容必须用javascript函数名和圆括号包裹起来。而不是发送这样一段JSON数据，这就是JSONP中P的意义所在

<div>
<pre>[1, 2, {"buckle": "my shoe"}]</pre>
</div>

&emsp;&emsp;JSONP看起来与JSON差不多，只不过是被包含在函数调用中的JSON，它会发送这样一个包裹后的JSON响应：

<div>
<pre>handleResponse([l, 2, {"buckle": "my shoe"}])</pre>
</div>

&emsp;&emsp;包裹后的响应会成为&lt;script&gt;元素的内容，它先判断JSON编码后的数据，然后把它传递给handleResponse()函数

&emsp;&emsp;在实践中，支持JSONP的服务不会强制指定客户端必须实现的回调函数名称，比如handleResponse。相反，它们使用査询参数的值，允许客户端指定一个函数名，然后使用函数名去填充响应。许多支持JSONP的服务都能分辨出这个参数名。另一个常见的参数名称是callback，为了让使用到的服务支持类似特殊的需求，就需要在代码上做一些修改了

&emsp;&emsp;JSONP由两部分组成：回调函数和数据。回调函数是当响应到来时应该在页面中调用的函数。回调函数的名字一般是在请求中指定的。而数据就是传入回调函数中的JSON数据

<div>
<pre>http://freegeoip.net/json/?callback=handleResponse</pre>
</div>

&emsp;&emsp;这个URL是在请求一个JSONP地理定位服务。通过査询字符串来指定JSONP服务的回调参数是很常见的，就像上面的URL所示，这里指定的回调函数的名字叫handleResponse()

&emsp;&emsp;JSONP是通过动态&lt;script&gt;元素来使用的，使用时可以为src属性指定一个跨域URL。这里的&lt;script&gt;元素与&lt;img&gt;元素类似，都有能力不受限制地从其他域加载资源。因为JSONP是有效的javascript代码，所以在请求完成后，即在JSONP响应加载到页面中以后，就会立即执行

<div>
<pre>function handleResponse(response){
    alert ("You're at IP address " + response.ip + ", which is in " + response.city + ", "+ response.region_name);
}
var script = document.createElement("script");
script.src = "http://freegeoip.net/json/?callback=handLeResponse"; document.body.insertBefore(script, document.body.firstChild);</pre>
</div>

&emsp;&emsp;JSONP之所以在开发人员中极为流行，主要原因是它非常简单易用，老式浏览器全部支持，服务器改造非常小。与图像Ping相比，它的优点在于能够直接访问响应文本，支持在浏览器与服务器之间双向通信

&emsp;&emsp;使用&lt;script&gt;元素进行Ajax传输，不受同源策略的影响，因此可以使用它们从其他的服务器请求数据；而且，包含JSON编码数据的响应体会自动解码(即执行)

&emsp;&emsp;不过，JSONP也有两点不足：首先，JSONP是从其他域中加载代码执行。如果其他域不安全，很可能会在响应中夹带一些恶意代码，而此时除了完全放弃JSONP调用之外，没有办法追究。因此在使用不是自己运维的Web服务时，一定得保证它安全可靠；其次，要确定JSONP请求是否失败并不容易。虽然HTML5给&lt;script&gt;元素新增了一个onerror事件处理程序，但目前还没有得到任何浏览器支持。为此，开发人员不得不使用计时器检测指定时间内是否接收到了响应。但就算这样也不能尽如人意，毕竟不是每个用户上网的速度和带宽都一样

&nbsp;

### 简易示例

【前端】

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
function loadScript(url){
    loadScript.mark = 'load';
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    script.onload = function(){
        img.style.display = 'none';
        btn.removeAttribute('disabled');
    }
    document.body.appendChild(script);
}
function test(data){
    var sum = add() - 1;
    if(sum &lt; data.length ){
      result.innerHTML += data[sum];    
    }
}
btn.onclick = function(){
    img.style.display = 'inline-block';
    btn.setAttribute('disabled','');
    loadScript('https://www.webhuochai.com/test/getData.php?callback=test');
}
&lt;/script&gt;   </pre>
</div>

【后端】

<div>
<pre>&lt;?php
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
$arr = [1,2,3,4,5];
echo test_input($_GET['callback']) ."(" .json_encode($arr) .");";
?&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://xiaohuochai.site/test/jsonp/j1.html" frameborder="0" width="320" height="240"></iframe>

### 百度搜索框

&emsp;&emsp;百度搜索框就是使用了JSONP的技术，在百度搜索的URL中，有用的查询如下&nbsp;

<div>
<pre>https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=123&amp;&amp;cb=a</pre>
</div>

&emsp;&emsp;结果为：

<div>
<pre>a({q:"123",p:false,s:["12306","12306铁路客户服务中心","12308汽车订票官网","12306火车票网上订票官网","12333","12315","12345","12333社保查询网","123网址之家","12366"]});</pre>
</div>

&emsp;&emsp;所以，wd为关键词，cb用来JSONP的函数名。在获取的数据中，s为以关键词开始的数据组成的数据

&emsp;&emsp;百度搜索的关键URL如下

<div>
<pre>https://www.baidu.com/s?wd=a</pre>
</div>

&emsp;&emsp;wd为关键词，当wd=a时，将打开关键词为a的网页

<div>
<pre>&lt;style&gt;
body{margin: 0;}
ul{margin: 0;padding: 0;list-style: none;}
a{color:inherit;text-decoration: none;}
input{padding: 0;border: 0;}
.box{width: 340px;height: 38px;border: 2px solid gray;}
.con{overflow: hidden;}
.input{float: left;width: 300px;height: 38px;}
.search{width: 38px;height: 38px;float: right;background: url('http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/search.png') 0 -38px;}
.list{position: absolute;width: 298px;border: 1px solid #e6e8e9; overflow: hidden;}
.in{line-height: 30px;border-bottom: 1px solid lightblue;cursor:pointer;text-indent: 1em;}
.list .in:last-child{margin-bottom: -1px;}
.in:hover{background-color: #f9f9f9;}
&lt;/style&gt;
&lt;div class="box" id="box"&gt;
    &lt;div class="con"&gt;
        &lt;input class="input" id="search"&gt;
        &lt;a target="_blank" id="btn" href="javascript:;" class="search"&gt;&lt;/a&gt;
    &lt;/div&gt;
    &lt;ul class="list" id="list"&gt;&lt;/ul&gt;        
&lt;/div&gt; 
&lt;script&gt;
function loadScript(url){
    loadScript.mark = 'load';
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.body.appendChild(script);
}
function callback(data){
    if(data){
        var arr = data.s;
        var html = '';
        for(var i = 0,len = arr.length; i &lt; len; i++){
            html+= "&lt;li class='in'&gt;&lt;a href='https://www.baidu.com/s?wd="+ arr[i]+"' target='_blank' style='display:block'&gt;" + arr[i]+ "&lt;/a&gt;&lt;/li&gt;"
        }
        list.innerHTML = html;        
    }
}
search.onkeyup = function(e){
    e = e || event;
    if(e.keyCode == '13'){
       window.open('https://www.baidu.com/s?wd=' + this.value);
    }
    if(this.value){
        if(search.data != this.value){
            btn.setAttribute('href','https://www.baidu.com/s?wd=' + this.value);
            var that = this;
            loadScript("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + that.value + "&amp;&amp;cb=callback");
        }
    }else{
        list.innerHTML = '';
    }
    search.data = this.value;
}
search.onclick = function(e){
    e = e || event;
    list.style.display = 'block';
    if(e.stopPropagation){
        e.stopPropagation();
    }else{
        e.cancelBubble = true;
    }
}
document.onclick = function(){
     list.style.display = 'none';
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 360px;" src="https://xiaohuochai.site/test/jsonp/j2.html" frameborder="0" width="320" height="240"></iframe>

## 最后

&emsp;&emsp;如果在jQuery中使用jsonp技术，需要使用ajax()方法，将datatype设置为'jsonp'，将jsonp设置为函数名，如'callback'

&emsp;&emsp;以上