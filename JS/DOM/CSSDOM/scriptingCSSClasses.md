# 深入理解脚本化CSS系列第三篇——脚本化CSS类

&emsp;&emsp;在实际工作中，我们使用javascript操作CSS样式时，如果要改变大量样式，会使用脚本化CSS类的技术，本文将详细介绍脚本化CSS类

&nbsp;

### style

&emsp;&emsp;我们在改变元素的少部分样式时，一般会直接改变其[行间样式](http://www.cnblogs.com/xiaohuochai/p/5837478.html)

<div>
<pre>&lt;div id="test" style="height:100px;width:100px;background-color:blue;"&gt;&lt;/div&gt;
&lt;script&gt;
test.onclick = function(){
    test.style.backgroundColor = 'green';
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/js/CSSClass/c1.html" frameborder="0" width="320" height="240"></iframe>

### cssText

&emsp;&emsp;改变元素的较多样式时，可以使用cssText

<div>
<pre>&lt;div id="test" style="height:100px;width:100px;background-color:blue;"&gt;&lt;/div&gt;
&lt;script&gt;
test.onclick = function(){
    test.style.cssText = 'height:50px;width:50px;background-color:green';
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/js/CSSClass/c2.html" frameborder="0" width="320" height="240"></iframe>

### css类

&emsp;&emsp;更常用的是使用css类，将更改前和更改后的样式提前设置为类名。只要更改其类名即可

<div>
<pre>&lt;style&gt;
.big{
    height:100px;
    width:100px;
    background-color:blue;
}
.small{
    height:50px;
    width:50px;
    background-color:green;
}    
&lt;/style&gt;
&lt;div id="test" class="big"&gt;&lt;/div&gt;
&lt;script&gt;
test.onclick = function(){
    test.className = 'small';
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/js/CSSClass/c3.html" frameborder="0" width="320" height="240"></iframe>

### classList

&emsp;&emsp;如果要改变多个类名，使用[classList](http://www.cnblogs.com/xiaohuochai/p/5797111.html#anchor2)更为方便

&emsp;&emsp;注意：IE9-浏览器不支持

<div>
<pre>&lt;style&gt;
.big{
    height:100px;
    width:100px;
}
.small{
    height:50px;
    width:50px;
}    
.green{
    background-color:green;
}
.blue{
    background-color:blue;
}
&lt;/style&gt;
&lt;div id="test" class="big green"&gt;&lt;/div&gt;
&lt;button id="btn1"&gt;大小变化&lt;/button&gt;
&lt;button id="btn2"&gt;颜色变化&lt;/button&gt;
&lt;script&gt;
btn1.onclick = function(){
    test.classList.toggle('small');
}
btn2.onclick = function(){
    test.classList.toggle('blue');
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/js/CSSClass/c4.html" frameborder="0" width="320" height="240"></iframe>

### 性能

<div>
<pre>&lt;div id="test" style="height:100px;width:100px;background-color:blue;"&gt;&lt;/div&gt;
&lt;script&gt;
test.onclick = function(){
    console.time();
    for(var i = 0; i &lt; 10000; i++){
        test.style.backgroundColor = 'green';
        test.style.height = '50px';    
        test.style.width = '50px';        
    }
    console.timeEnd();//59.937ms
}
&lt;/script&gt;
/*****************************/
&lt;div id="test" style="height:100px;width:100px;background-color:blue;"&gt;&lt;/div&gt;
&lt;script&gt;
test.onclick = function(){
    console.time();
    for(var i = 0; i &lt; 10000; i++){
    test.style.cssText = 'height:50px;width:50px;background-color:green';
    }
    console.timeEnd();//38.065ms
}
&lt;/script&gt;
/*****************************/
&lt;style&gt;
.big{
    height:100px;
    width:100px;
    background-color:blue;
}
.small{
    height:50px;
    width:50px;
    background-color:green;
}    
&lt;/style&gt;
&lt;div id="test" class="big"&gt;&lt;/div&gt;
&lt;script&gt;
test.onclick = function(){
    console.time();
    for(var i = 0; i &lt; 10000; i++){
    test.className = 'small';
    }
    console.timeEnd();//9.534ms
}
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;在1万次循环中，改变style属性中的具体样式花费了59.937ms，改变style属性中的cssText花费了38.065ms，而改变css类名只花费了9.534ms

&emsp;&emsp;由此可见，使用脚本化CSS类的方式可以大大地提高性能

&nbsp;

## 最后

&emsp;&emsp;脚本化CSS的场景非常常见，一直提倡使用脚本化CSS类的方式来操作CSS，以为只是为了方便。感觉脚本化CSS类应该和使用cssText的性能差不多，但没想到最终结果竟然不是同一个数量级的，改变CSS类名的性能竟然提升这么多

&emsp;&emsp;少一点感性认识，多一些理性测试

&emsp;&emsp;欢迎交流
