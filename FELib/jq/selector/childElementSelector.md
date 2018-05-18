# jQuery子元素选择器

&emsp;&emsp;在[上一篇](http://www.cnblogs.com/xiaohuochai/p/5800164.html)中已经介绍过基础选择器和层级选择器，本文开始介绍过滤选择器。过滤选择器是jQuery选择器中最为庞大也是最为出彩的一部分。以[CSS结构伪类选择器](http://www.cnblogs.com/xiaohuochai/p/5518943.html#anchor3)为基础，jQuery过滤选择器增加了很多扩展功能。本文先从与CSS选择器最相近的子元素过滤选择器开始说起

&nbsp;

### 通用形式

**$(':nth-child(index)')**

&emsp;&emsp;$(':nth-child(index)')选择每个父元素的第index个子元素(index从1算起)，返回集合元素

<div>
<pre>$(':nth-child(1)') &emsp;&emsp;&emsp;&emsp;&emsp;&emsp; 每个父元素下第1个子元素
$('span:nth-child(1)') &emsp;&emsp;&emsp;&emsp;每个父元素下第1个子元素，且该子元素为span元素
$('div span:nth-child(1)')    每个为div元素的父元素下第1个子元素，且该子元素为span元素</pre>
</div>
<div>
<pre>&lt;button id="btn1" style="color: red;"&gt;$(':nth-child(1)')&lt;/button&gt;
&lt;button id="btn2" style="color: blue;"&gt;$('span:nth-child(1)')&lt;/button&gt;
&lt;button id="btn3" style="color: green;"&gt;$('div span:nth-child(1)')&lt;/button&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;div id="t1"&gt;
    &lt;i&gt;1.1&lt;/i&gt;
    &lt;span&gt;1.2&lt;/span&gt;
&lt;/div&gt;
&lt;p  id="t2"&gt;
    &lt;span&gt;2.1&lt;/span&gt;
    &lt;i&gt;2.2&lt;/i&gt;
&lt;/p&gt;
&lt;div id="t3"&gt;
    &lt;span&gt;3.1&lt;/span&gt;
    &lt;i&gt;3.2&lt;/i&gt;
&lt;/div&gt;
&lt;script src="jquery-3.1.0.js"&gt;&lt;/script&gt;
&lt;script&gt;
reset.onclick = function(){history.go();}
//匹配每个父元素的第1个子元素，结果是1.1、2.1和3.1
//注意：实际上，&lt;head&gt;元素作为&lt;html&gt;元素的第1个子元素，也被设置为color:red
btn1.onclick = function(){$(':nth-child(1)').css('color','red');}
//匹配每个父元素的第1个子元素，且该子元素是span元素，结果是2.1和3.1
btn2.onclick = function(){$('span:nth-child(1)').css('color','blue');}
//匹配每个div元素为父元素的第1个子元素，且该子元素是span元素，结果是3.1
btn3.onclick = function(){$('div span:nth-child(1)').css('color','green');}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/jquery/selector/s10.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;对应于CSS的结构伪类选择器nth-child(n)

&emsp;&emsp;nth-child(n)选择器用于选择每个父元素下的第n个子元素(n从1开始)

&emsp;&emsp;如果要完成同样的上面三个功能，选择器格式分别为：

<div>
<pre>:nth-child(1){color:red;}
span:nth-child(1){color:blue;}
div span:nth-child(1){color:green;}</pre>
</div>

&emsp;&emsp;如果上面的第三个功能要使用javascript实现，则表现如下：

<div>
<pre>var divs = document.getElementsByTagName('div');
for(var i = 0; i &lt; divs.length; i++){
    var firstChild = divs[i].firstElementChild;
        if(firstChild.nodeName == 'SPAN'){
            firstChild.style.color = 'green';
        }
}</pre>
</div>

**参数**

&emsp;&emsp;当然$(':nth-child(index)')选择器作为通用的子元素过滤选择器，可以有多种参数选择

&emsp;&emsp;【1】$(':nth-child(even)')  选取每个父元素下的索引值为偶数的元素

&emsp;&emsp;【2】$(':nth-child(odd)')  选取每个父元素下的索引值为奇数的元素

&emsp;&emsp;【3】$(':nth-child(3n+1)')  选取每个父元素下的索引值为(3n+1)的元素

<div>
<pre>&lt;button id="btn1" style="color: red;"&gt;$(':nth-child(even)')&lt;/button&gt;
&lt;button id="btn2" style="color: blue;"&gt;$(':nth-child(odd)')&lt;/button&gt;
&lt;button id="btn3" style="color: green;"&gt;$(':nth-child(3n+1)')&lt;/button&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;ul&gt;
    &lt;li&gt;1&lt;/li&gt;
    &lt;li&gt;2&lt;/li&gt;
    &lt;li&gt;3&lt;/li&gt;
    &lt;li&gt;4&lt;/li&gt;
    &lt;li&gt;5&lt;/li&gt;
&lt;/ul&gt;
&lt;script src="jquery-3.1.0.js"&gt;&lt;/script&gt;
&lt;script&gt;
reset.onclick = function(){history.go();}
//匹配每个父元素为ul的偶数个元素，结果是2、4
btn1.onclick = function(){$('ul :nth-child(even)').css('color','red');}
//匹配每个父元素为ul的奇数个元素，结果是1、3、5
btn2.onclick = function(){$('ul :nth-child(odd)').css('color','blue');}
//匹配每个父元素为ul的(3n+1)个元素，结果是1、4
btn3.onclick = function(){$('ul :nth-child(3n+1)').css('color','green');}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 170px;" src="https://demo.xiaohuochai.site/jquery/selector/s11.html" frameborder="0" width="320" height="240"></iframe>

### 反向形式

**$(':nth-last-child(index)')**

&emsp;&emsp;$(':nth-last-child(index)')选择器选择每个父元素的反向第index个子元素(index从最后一个元素计数到第一个元素为止)，返回集合元素

<div>
<pre>&lt;button id="btn1" style="color: red;"&gt;$(':nth-last-child(even)')&lt;/button&gt;
&lt;button id="btn2" style="color: blue;"&gt;$(':nth-last-child(odd)')&lt;/button&gt;
&lt;button id="btn3" style="color: green;"&gt;$(':nth-last-child(3n+1)')&lt;/button&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;ul&gt;
    &lt;li&gt;1&lt;/li&gt;
    &lt;li&gt;2&lt;/li&gt;
    &lt;li&gt;3&lt;/li&gt;
    &lt;li&gt;4&lt;/li&gt;
    &lt;li&gt;5&lt;/li&gt;
    &lt;li&gt;6&lt;/li&gt;
&lt;/ul&gt;
&lt;script src="jquery-3.1.0.js"&gt;&lt;/script&gt;
&lt;script&gt;
reset.onclick = function(){history.go();}
//匹配每个父元素为ul的偶数个元素(从后往前数)，所以结果为5(倒数第2个)、3(倒数第4个)、1(倒数第6个)
btn1.onclick = function(){$('ul :nth-last-child(even)').css('color','red');}
//匹配每个父元素为ul的奇数个元素(从后往前数)，所以结果为6(倒数第1个)、4(倒数第3个)、2(倒数第5个)
btn2.onclick = function(){$('ul :nth-last-child(odd)').css('color','blue');}
//匹配每个父元素为ul的反向的(3n+1)个元素，即1、4，所以结果是6(倒数第1个)、3(倒数第4个)
btn3.onclick = function(){$('ul :nth-last-child(3n+1)').css('color','green');}
&lt;/script&gt;</pre>
</div>

<iframe style="line-height: 1.5; width: 100%; height: 190px;" src="https://demo.xiaohuochai.site/jquery/selector/s12.html" frameborder="0" width="320" height="240"></iframe>

### 首尾子元素

&emsp;&emsp;为了方便，jQuery还定义了第一个子元素和最后一个子元素的获取方式

**$(':first-child')**

&emsp;&emsp;:first-child选择器是:nth-child(1)选择器的简写形式，选取每个父元素的第1个子元素

**$(':last-child')**

&emsp;&emsp;类似地，$(':last-child')选择器选取每个父元素的最后1个子元素

<div>
<pre>&lt;button id="btn1" style="color: red;"&gt;$('div :first-child')&lt;/button&gt;
&lt;button id="btn2" style="color: blue;"&gt;$('div :last-child')&lt;/button&gt;
&lt;button id="btn3" style="color: green;"&gt;$('div span:first-child')&lt;/button&gt;
&lt;button id="btn4" style="color: pink;"&gt;$('div span:last-child')&lt;/button&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;div id="t1"&gt;
    &lt;i&gt;1.1&lt;/i&gt;
    &lt;span&gt;1.2&lt;/span&gt;
&lt;/div&gt;
&lt;p  id="t2"&gt;
    &lt;span&gt;2.1&lt;/span&gt;
    &lt;i&gt;2.2&lt;/i&gt;
&lt;/p&gt;
&lt;div id="t3"&gt;
    &lt;span&gt;3.1&lt;/span&gt;
    &lt;i&gt;3.2&lt;/i&gt;
&lt;/div&gt;
&lt;script src="jquery-3.1.0.js"&gt;&lt;/script&gt;
&lt;script&gt;
reset.onclick = function(){history.go();}
//匹配每个div元素为父元素的第1个子元素，结果是1.1和3.1
btn1.onclick = function(){$('div :first-child').css('color','red');}
//匹配每个div元素为父元素的最后1个子元素，结果是1.2和3.2
btn2.onclick = function(){$('div :last-child').css('color','blue');}
//匹配每个div元素为父元素的第1个子元素，且该子元素是span元素，结果是3.1
btn3.onclick = function(){$('div span:first-child').css('color','green');}
//匹配每个div元素为父元素的最后1个子元素，且该子元素是span元素，结果是1.2
btn4.onclick = function(){$('div span:last-child').css('color','pink');}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/jquery/selector/s13.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;首尾子元素选择器分别对应于CSS中的:first-child和:last-child

&emsp;&emsp;如果要完成同样的功能，选择器格式分别为：

<div>
<pre>div :first-child{color:red;}
div :last-child{color:blue;}
div span:first-child{color:green;}
div span:last-child{color:pink;}</pre>
</div>

&emsp;&emsp;如果使用javascript选择器要完成上面的最后一个功能，则如下所示

<div>
<pre>var divs = document.getElementsByTagName('div');
for(var i = 0; i &lt; divs.length; i++){
    var lastChild = divs[i].lastElementChild;
        if(lastChild.nodeName == 'SPAN'){
            lastChild.style.color = 'pink';
        }
}</pre>
</div>

&nbsp;

### 唯一子元素

**$(':only-child')**

&emsp;&emsp;$(':only-child')选择器的匹配规则为：如果某个元素是它父元素中的唯一的子元素，才会被匹配

<div>
<pre>$('div span:only-child').css('color','green');</pre>
</div>

&emsp;&emsp;对应于CSS的:only-child选择器

<div>
<pre>div span:only-child{color:green;}</pre>
</div>

&emsp;&emsp;如果使用javascript实现，则如下所示

<div>
<pre>var divs = document.getElementsByTagName('div');
for(var i = 0; i &lt; divs.length; i++){
    var children = divs[i].children;
    if(children.length == 1 &amp;&amp; children[0].nodeName == 'SPAN'){
        children[0].style.color = 'green';
    }
}</pre>
</div>
<div>
<pre>&lt;button id="btn1" style="color: green;"&gt;$('div span:only-child')&lt;/button&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;div&gt;
    &lt;span&gt;1.1&lt;/span&gt;
&lt;/div&gt;
&lt;div&gt;
    &lt;span&gt;2.1&lt;/span&gt;
    &lt;i&gt;2.2&lt;/i&gt;
&lt;/div&gt;
&lt;script src="jquery-3.1.0.js"&gt;&lt;/script&gt;
&lt;script&gt;
reset.onclick = function(){history.go();}
//虽然第2个div中只存在一个&lt;span&gt;元素，但由于它并不是唯一的子元素，所以无法被匹配
btn1.onclick = function(){$('div span:only-child').css('color','green');}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 90px;" src="https://demo.xiaohuochai.site/jquery/selector/s14.html" frameborder="0" width="320" height="240"></iframe>

## 最后

&emsp;&emsp;在CSS结构伪类选择器中，nth-child(n)和nth-of-type(n)选择器经常容易混淆，需要小心区分才能避免出错。类似地，在jQuery过滤选择器中，子元素选择器和索引选择器也是非常相近，容易混淆。在选择器系列下一篇中，将类比于本文的子元素选择器，详细介绍索引选择器

&emsp;&emsp;欢迎交流