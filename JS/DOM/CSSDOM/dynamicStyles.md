# 深入理解脚本化CSS系列第五篇——动态样式

&emsp;&emsp;很多时候，DOM操作比较简单明了，因此用javascript生成那些通常原本是HTML代码生成的内容并不麻烦。但由于浏览器充斥着隐藏的陷阱和不兼容问题，处理DOM中的某些部分时要复杂一些，比如动态样式就相对较复杂

&emsp;&emsp;所谓动态样式，是指在页面加载时并不存在，在页面加载完成后动态添加到页面的样式

&emsp;&emsp;动态样式包括两种情况：一种是通过&lt;link&gt;元素插入外部样式表，另一种是通过&lt;style&gt;元素插入内部样式。下面将详细介绍这两种情况

&nbsp;

### 外部样式

<div>
<pre>/*style.css里面的内容*/
.box{height:100px;width:100px;background-color: pink;}</pre>
</div>
<div>
<pre>var link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";
link.href = "style.css";
var head = document.getElementsByTagName('head')[0];
head.appendChild(link);</pre>
</div>

&emsp;&emsp;使用函数封装如下：

<div>
<pre>&lt;div class="box"&gt;测试文字&lt;/div&gt;
&lt;button id="btn"&gt;动态添加样式&lt;/button&gt;
&lt;script&gt;
function loadStyles(url){
    loadStyles.mark = 'load';
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = url;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(link); 
}
btn.onclick = function(){
    if(loadStyles.mark != 'load'){
        loadStyles("style.css");        
    }
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/js/dynamicStyles/d1.html" frameborder="0" width="320" height="240"></iframe>

### 内部样式

<div>
<pre>var style = document.createElement("style");
style.type = "text/css";
style.innerHTML = ".box{height:100px;width:100px;background-color: pink;}";
var head = document.getElementsByTagName('head')[0];
head.appendChild(style); </pre>
</div>

&emsp;&emsp;使用函数封装如下：

<div>
<pre>&lt;div class="box"&gt;测试文字&lt;/div&gt;
&lt;button id="btn"&gt;动态添加样式&lt;/button&gt;
&lt;script&gt;
function loadStyles(str){
    loadStyles.mark = 'load';
    var style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = str;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(style); 
}
btn.onclick = function(){
    if(loadStyles.mark != 'load'){
        loadStyles(".box{height:100px;width:100px;background-color: pink;}");        
    }
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/js/dynamicStyles/d2.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;注意：该方法在IE8-浏览器中报错，因为IE8-浏览器将&lt;style&gt;视为当作特殊的节点，不允许访问其子节点或设置[innerHTML属性](http://www.cnblogs.com/xiaohuochai/p/5823716.html#anchor1)

&nbsp;

### 兼容写法

&emsp;&emsp;动态插入内部样式时，存在兼容问题，下面有两种兼容处理办法

**兼容一**

&emsp;&emsp;IE浏览器支持访问并修改元素的CSSStyleSheet对象的cssText属性，通过修改该属性可实现类似效果

<div>
<pre>&lt;div class="box"&gt;测试文字&lt;/div&gt;
&lt;button id="btn"&gt;动态添加样式&lt;/button&gt;
&lt;script&gt;
function loadStyles(str){
    loadStyles.mark = 'load';
    var style = document.createElement("style");
    style.type = "text/css";
    try{
        style.innerHTML = str;
    }catch(ex){
        style.styleSheet.cssText = str;
    }
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(style); 
}
btn.onclick = function(){
    if(loadStyles.mark != 'load'){
        loadStyles(".box{height:100px;width:100px;background-color: pink;}");        
    }
}
&lt;/script&gt;    </pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/js/dynamicStyles/d3.html" frameborder="0" width="320" height="240"></iframe>

**兼容二**

&emsp;&emsp;作用域元素是微软自己的一个定义，一般来说页面中看到的元素是有作用域的元素，页面中看不到的元素就是无作用域的元素&nbsp;

&emsp;&emsp;在IE8-浏览器中，&lt;style&gt;元素是一个没有作用域的元素，如果通过innerHTML插入的字符串开头就是一个无作用域的元素，那么IE8-浏览器会在解析这个字符串前先删除该元素

&emsp;&emsp;所以，下面这段代码是无效的

<div>
<pre>div.innerHTML = '&lt;style&gt;div{height:100px;}&lt;/style&gt;';</pre>
</div>

&emsp;&emsp;于是，可以通过增加一个'_'文本节点，然后再删除使之有效

<div>
<pre>    div.innerHTML = "_&lt;style&gt;div{height:100px;}&lt;/style&gt;";
    div.removeChild(div.firstChild);</pre>
</div>
<div>
<pre>&lt;div class="box"&gt;测试文字&lt;/div&gt;
&lt;button id="btn"&gt;动态添加样式&lt;/button&gt;
&lt;script&gt;
function loadStyles(str){
    loadStyles.mark = 'load';
    var div = document.createElement("div");
    div.innerHTML = '_' + '&lt;style&gt;' + str+'&lt;/style&gt;';
    div.removeChild(div.firstChild);
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(div.firstChild); 
    div = null;
}
btn.onclick = function(){
    if(loadStyles.mark != 'load'){
        loadStyles(".box{height:100px;width:100px;background-color: pink;}");        
    }
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/js/dynamicStyles/d4.html" frameborder="0" width="320" height="240"></iframe>

