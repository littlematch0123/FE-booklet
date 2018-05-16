# 图像Ping

&emsp;&emsp;在CORS出现以前，要实现跨域Ajax通信颇费一些周折。开发人员想出了一些办法，利用DOM中能够执行跨域清求的功能，在不依赖XHR对象的情况下也能发送某种请求。虽然CORS技术已经无处不在，但开发人员自己发明的这些技术仍然被广泛使用，毕竞这样不需要修改服务器端代码。本文将详细介绍图像Ping

&nbsp;

### 基础

&emsp;&emsp;图像Ping跨域请求技术是使用&lt;img&gt;标签。一个网页可以从任何网页中加载图像，不用担心跨域不跨域。这也是在线广告跟踪浏览量的主要方式。也可以动态地创建图像，使用它们的onload和onerror事件处理程序来确定是否接收到了响应

&emsp;&emsp;动态创建图像经常用于图像Ping：图像Ping是与服务器进行简单、单向的跨域通信的一种方式。 请求的数据是通过査询字符串形式发送的，而响应可以是任意内容，但通常是像素图或204响应。通过图像Ping，浏览器得不到任何具体的数据，但通过侦听load和error事件，它能知道响应是什么时候接收到的

<div>
<pre>var img = new Image();
img.onload = img.onerror = function(){
    alert("Done!");
};
img.src = "test.html?sum=a";</pre>
</div>

&emsp;&emsp;这里创建了一个Image的实例，然后将onload和onerror事件处理程序指定为同一个函数。这样无论是什么响应，只要请求完成，就能得到通知。请求从设置src属性那一刻开始，而这个例子在请求中发送了一个sum参数

&nbsp;

### 示例

&emsp;&emsp;图像Ping最常用于跟踪用户点击页面或动态广告曝光次数。图像Ping有两个主要的缺点，一是只能发送GET请求，二是无法访问服务器的响应文本。因此，图像Ping只能用于浏览器与服务器间的单向通信

&emsp;&emsp;下面是一个图片Ping的示例

<div>
<pre>&lt;input id="btn" type="button" value="跨域请求"&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
var add = (function(){
    var counter = 0;
    return function(){
        return ++counter;
    }
})();
btn.onclick = function(){
    var sum = add();
    var img = result.getElementsByTagName('img')[0];
    if(!img){
        var img = new Image();        
    }
    img.height="100";
    img.onload = img.onerror = function(){
        result.appendChild(img);
        var oSpan = document.getElementById('sum');
        if(!oSpan){
            oSpan = document.createElement('span');
            oSpan.id="sum";
        }
        oSpan.innerHTML = '发送请求的次数：' + sum;
        result.appendChild(oSpan);
    };    
    if(sum%2){
        img.src = "http://7xpdkf.com1.z0.glb.clouddn.com/eg_bulboff.gif?sum="+sum;    
    }else{
        img.src = "http://7xpdkf.com1.z0.glb.clouddn.com/eg_bulbon.gif?sum="+sum;    
    }
}
&lt;/script&gt;    </pre>
</div>

<iframe style="width: 100%; height: 150px;" src="https://demo.xiaohuochai.site/js/imgPing/i1.html" frameborder="0" width="320" height="240"></iframe>

