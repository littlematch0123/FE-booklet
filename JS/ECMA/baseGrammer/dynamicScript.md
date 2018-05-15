# 动态脚本

&emsp;&emsp;动态脚本是指在页面加载时不存在，但将来的某一时刻通过修改DOM动态添加的脚本。和操作HTML元素一样，创建动态脚本也有两种方式：插入外部文件和直接插入内部javascript代码。下面将详细介绍这两种情况

&nbsp;

### 外部脚本

<div>
<pre>//script.js里面的内容
box.style.color = "red";</pre>
</div>
<div>
<pre>var script = document.createElement("script");
script.type = "text/javascript";
script.src = "script.js";
document.body.appendChild(script);</pre>
</div>

&emsp;&emsp;使用函数封装如下：

<div>
<pre>&lt;div id="box"&gt;测试文字&lt;/div&gt;
&lt;button id="btn"&gt;动态添加脚本&lt;/button&gt;
&lt;script&gt;
function loadScript(url){
    loadScript.mark = 'load';
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.body.appendChild(script);
}
btn.onclick = function(){
    if(loadScript.mark != 'load'){
        loadScript("js/script.js");        
    }
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/js/active/a1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 内部脚本

&emsp;&emsp;另一种插入动态脚本的方式是插入内部脚本，如下所示

<div>
<pre>&lt;script&gt;
    box.style.color = "red";
&lt;/script&gt;</pre>
</div>
<div>
<pre>var script = document.createElement("script");
script.innerHTML = 'box.style.color = "red"';
document.body.appendChild(script);</pre>
</div>

&emsp;&emsp;使用函数封装如下：

<div>
<pre>&lt;div id="box"&gt;测试文字&lt;/div&gt;
&lt;button id="btn"&gt;动态添加样式&lt;/button&gt;
&lt;script&gt;
function loadScript(str){
    loadScript.mark = 'load';
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = str;
    document.body.appendChild(script);
}
btn.onclick = function(){
    if(loadScript.mark != 'load'){
        loadScript("box.style.color = 'red'");        
    }
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/js/active/a2.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;在标准浏览器下，上面代码可以正常运行。但是，在IE8-浏览器下却报错。这是因为IE8-浏览器将&lt;script&gt;元素视为一个特殊的元素，不允许DOM访问其子节点，使用appendChild()方法或innerHTML属性都会报错

&nbsp;

### 兼容写法

&emsp;&emsp;动态插入内部脚本存在兼容问题，可使用&lt;script&gt;元素的text属性替代innerHTML属性来指定javascript代码

<div>
<pre>&lt;div id="box"&gt;测试文字&lt;/div&gt;
&lt;button id="btn"&gt;动态添加样式&lt;/button&gt;
&lt;script&gt;
function loadScript(str){
    loadScript.mark = 'load';
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.text = str;
    document.body.appendChild(script);
}
btn.onclick = function(){
    if(loadScript.mark != 'load'){
        loadScript("box.style.color = 'red'");        
    }
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/js/active/a3.html" frameborder="0" width="320" height="240"></iframe>

