# jQuery索引选择器

&emsp;&emsp;上一篇介绍了过滤选择器中的[子元素选择器](http://www.cnblogs.com/xiaohuochai/p/5804664.html)部分，本文开始介绍极易与之混淆的索引选择器

&nbsp;

### 通用形式

**$(':eq(index)')**

&emsp;&emsp;$(':eq(index)')选择器选择索引等于index的元素(index从0开始)，返回单个元素

**索引**

&emsp;&emsp;注意：索引选择器的索引和子元素选择器的索引有明显的不同

&emsp;&emsp;【1】索引选择器索引从0开始，而子元素选择器索引从1开始

&emsp;&emsp;【2】索引选择器的索引是指定元素的索引，而子元素选择器的索引是所有子元素的索引

<div>
<pre>&lt;div&gt;
    &lt;i&gt;0&lt;/i&gt;
    &lt;span&gt;1&lt;/span&gt;
    &lt;i&gt;2&lt;/i&gt;
    &lt;span&gt;3&lt;/span&gt;
&lt;/div&gt;</pre>
</div>

&emsp;&emsp;如果要选择&lt;span&gt;1&lt;span&gt;元素，若使用子元素选择器，则设置为

<div>
<pre>//选择父元素为div元素下的第二个子元素，且该子元素是span元素(索引从1开始)
$('div span:nth-child(2)').css('color','red');</pre>
</div>

&emsp;&emsp;若使用索引选择器，则设置为

<div>
<pre>//选择父元素为div元素下的最先出现的span元素(索引从0开始)
$('div span:eq(0)').css('color','blue');</pre>
</div>
<div>
<pre>&lt;button id='btn1'&gt;$('div span:nth-child(2)')&lt;/button&gt;
&lt;button id='btn2'&gt;$('div span:eq(0)')&lt;/button&gt;
&lt;div&gt;
    &lt;i&gt;0&lt;/i&gt;
    &lt;span&gt;1&lt;/span&gt;
    &lt;i&gt;2&lt;/i&gt;
    &lt;span&gt;3&lt;/span&gt;
&lt;/div&gt;
&lt;script&gt;
btn1.onclick = function(){
    $('div span:nth-child(2)').css('color','red');
}
btn2.onclick = function(){
    $('div span:eq(0)').css('color','blue');
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/selector/s15.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;在CSS中，与:nth-child(n)选择器相似的选择器是:nth-of-type(n)，:nth-of-type(n)选择器返回索引等于n的元素(索引从1开始)

&emsp;&emsp;&nbsp;如果要使用:nth-child(n)选择器选择上述代码中的&lt;span&gt;1&lt;span&gt;元素，则设置为

<div>
<pre>div span:nth-child(2){color:red;}</pre>
</div>

&emsp;&emsp;若使用:nth-of-type(n)选择器，则设置为：

<div>
<pre>div span:nth-of-type(1){color:blue;}</pre>
</div>

&emsp;&emsp;所以CSS选择器:nth-of-type(n)与jQuery中的索引选择器$(':eq(index)')相似，相同的地方是索引是指的指定元素的索引

&emsp;&emsp;而不同之处有两处

&emsp;&emsp;【1】CSS选择器:nth-of-type(n)的索引从1开始，而jQuery中的索引选择器$(':eq(index)')的索引从0开始

&emsp;&emsp;【2】CSS选择器:nth-of-type(n)返回多个元素，而jQuery中的索引选择器$(':eq(index)')返回的是单个元素

<div>
<pre>$(':eq(0)') 选择第一个索引等于0的元素
$('span:eq(0)') 选择第一个索引等于0的span元素
$('div span:eq(0)') 选择第一个div元素为父元素下索引等于0的span元素</pre>
</div>
<div>
<pre>&lt;button id="btn1" style="color: red;"&gt;$(':eq(0)')&lt;/button&gt;
&lt;button id="btn2" style="color: blue;"&gt;$('span:eq(0)')&lt;/button&gt;
&lt;button id="btn3" style="color: green;"&gt;$('div span:eq(0)')&lt;/button&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;p id="t1"&gt;
    &lt;i&gt;1.0&lt;/i&gt;
    &lt;span&gt;1.1&lt;/span&gt;
&lt;/p&gt;
&lt;p  id="t2"&gt;
    &lt;span&gt;2.0&lt;/span&gt;
    &lt;i&gt;2.1&lt;/i&gt;
&lt;/p&gt;
&lt;div id="t3"&gt;
    &lt;i&gt;3.0&lt;/i&gt;
    &lt;span&gt;3.1&lt;/span&gt;
&lt;/div&gt;
&lt;script&gt;
reset.onclick = function(){history.go();}
//选择第一个索引等于0的元素，结果为&lt;html&gt;。由于字体颜色可以继承，所以所有的子元素的字体颜色都是红色
btn1.onclick = function(){$(':eq(0)').css('color','red');}
//选择第一个索引等于0的span元素，结果为&lt;span&gt;1.1&lt;/span&gt;
btn2.onclick = function(){$('span:eq(0)').css('color','blue');}
//选择第一个div元素为父元素下索引等于0的span元素，结果是&lt;span&gt;3.1&lt;/span&gt;
btn3.onclick = function(){$('div span:eq(0)').css('color','green');}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 150px;" src="https://demo.xiaohuochai.site/jquery/selector/s16.html" frameborder="0" width="320" height="240"></iframe>

### 首尾索引元素选择器

&emsp;&emsp;为了方便，jQuery还定义了第一个索引元素和最后一个索引元素的获取方式

**$(':first')**

&emsp;&emsp;$(':first')选择器选择最先出现的第1个索引元素，返回单个元素　

**$(':last')**

&emsp;&emsp;$(':last')选择器选择最后出现的最后1个索引元素，返回单个元素

<div>
<pre>&lt;button id="btn1" style="color: red;"&gt;$('div :first')&lt;/button&gt;
&lt;button id="btn2" style="color: blue;"&gt;$('div :last')&lt;/button&gt;
&lt;button id="btn3" style="color: green;"&gt;$('div span:first')&lt;/button&gt;
&lt;button id="btn4" style="color: pink;"&gt;$('div span:last')&lt;/button&gt;
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
//匹配最先出现的父元素为div元素的第1个索引元素，结果是1.1
btn1.onclick = function(){$('div :first').css('color','red');}
//匹配最后出现的父元素为div元素的最后1个索引元素，结果是3.2
btn2.onclick = function(){$('div :last').css('color','blue');}
//匹配最先出现的父元素为div元素的第1个span索引元素，结果是1.2
btn3.onclick = function(){$('div span:first').css('color','green');}
//匹配最后出现的父元素为div元素的最后1个span索引元素，结果是3.1
btn4.onclick = function(){$('div span:last').css('color','pink');}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/jquery/selector/s17.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;首尾索引选择器并不对应于CSS中的:first-of-type和:last-of-type。因为首尾索引选择器只选择单个元素，而CSS选择器会选择多个元素

&emsp;&emsp;如果要使用javascript实现类似$('div span:last').css('color','pink')的功能

<div>
<pre>var divs = document.getElementsByTagName('div');
for(var i = divs.length-1; i&gt;-1;i--){
    var spans = divs[i].getElementsByTagName('span');
    if(spans){
        spans[spans.length-1].style.color = 'pink';
        break;
    }    
}</pre>
</div>

&nbsp;

### 奇偶索引元素选择器

&emsp;&emsp;除了前面介绍的:eq(index)、:first和:last之外，其他的索引元素选择器返回的都是集合元素。接下来介绍奇偶索引元素选择器

**:even**

&emsp;&emsp;:even选取索引是偶数的所有元素，返回集合元素

**:odd**

&emsp;&emsp;:odd选取索引是奇数的所有元素，返回集合元素

<div>
<pre>&lt;button id="btn1" style="color: red;"&gt;$('div :even')&lt;/button&gt;
&lt;button id="btn2" style="color: blue;"&gt;$('div :odd')&lt;/button&gt;
&lt;button id="btn3" style="color: green;"&gt;$('div span:even')&lt;/button&gt;
&lt;button id="btn4" style="color: pink;"&gt;$('div span:odd')&lt;/button&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;div&gt;
    &lt;span&gt;0:span0&lt;/span&gt;
    &lt;span&gt;1:span1&lt;/span&gt;
    &lt;span&gt;2:span2&lt;/span&gt;
    &lt;i&gt;3:i0&lt;/i&gt;
    &lt;i&gt;4:i1&lt;/i&gt;
    &lt;i&gt;5:i2&lt;/i&gt;
    &lt;span&gt;6:span3&lt;/span&gt;
    &lt;span&gt;7:span4&lt;/span&gt;
&lt;/div&gt;
&lt;script&gt;
reset.onclick = function(){history.go();}
//匹配父元素为div元素的索引为偶数的元素，结果序号是0、2、4、6
btn1.onclick = function(){$('div :even').css('color','red');}
//匹配父元素为div元素的索引为奇数的元素，结果序号是1、3、5
btn2.onclick = function(){$('div :odd').css('color','blue');}
//匹配父元素为div元素的span元素索引为偶数的元素，结果序号是0、2、7
btn3.onclick = function(){$('div span:even').css('color','green');}
//匹配父元素为div元素的span元素索引为奇数的元素，结果序号是1、6
btn4.onclick = function(){$('div span:odd').css('color','pink');}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/selector/s18.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;&emsp;&emsp;子元素过滤选择器中也存在类似的奇偶选择器，分别是:nth-child(even)和:nth-child(odd)。由于它们的索引开始不同，索引表示也不同，所以类似的表示，结果却不同

<div>
<pre>&lt;button id="btn1" style="color: red;"&gt;$('div :nth-child(even)')&lt;/button&gt;
&lt;button id="btn2" style="color: blue;"&gt;$('div :nth-child(odd)')&lt;/button&gt;
&lt;button id="btn3" style="color: green;"&gt;$('div span:nth-child(even)')&lt;/button&gt;
&lt;button id="btn4" style="color: pink;"&gt;$('div span:nth-child(odd)')&lt;/button&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;div&gt;
    &lt;span&gt;0:span0&lt;/span&gt;
    &lt;span&gt;1:span1&lt;/span&gt;
    &lt;span&gt;2:span2&lt;/span&gt;
    &lt;i&gt;3:i0&lt;/i&gt;
    &lt;i&gt;4:i1&lt;/i&gt;
    &lt;i&gt;5:i2&lt;/i&gt;
    &lt;span&gt;6:span3&lt;/span&gt;
    &lt;span&gt;7:span4&lt;/span&gt;
&lt;/div&gt;
&lt;script&gt;
reset.onclick = function(){history.go();}
//匹配父元素为div元素的索引为偶数的元素，因为索引是从1开始的，结果序号是1、3、5、7(对应的索引是2、4、6、8)
btn1.onclick = function(){$('div :nth-child(even)').css('color','red');}
//匹配父元素为div元素的索引为奇数的元素，因为索引是从1开始的，结果序号是0、2、4、6(对应的索引是1、3、5、7)
btn2.onclick = function(){$('div :nth-child(odd)').css('color','blue');}
//匹配父元素为div元素的索引为偶数的元素，且该元素是span元素，结果序号是1、5(对应的索引是2、6)
btn3.onclick = function(){$('div span:nth-child(even)').css('color','green');}
//匹配父元素为div元素的索引为奇数的元素，且该元素是span元素，结果序号是0、2、6(对应的索引是1、3、7)
btn4.onclick = function(){$('div span:nth-child(odd)').css('color','pink');}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/selector/s19.html" frameborder="0" width="320" height="240"></iframe>

### 范围索引元素选择器

**:lt(index)**

&emsp;&emsp;:lt(index)选择器选取索引小于index的元素，返回集合元素

**:gt(index)**

&emsp;&emsp;:gt(index)选择器选取索引大于index的元素，返回集合元素

<div>
<pre>&lt;button id="btn1" style="color: red;"&gt;$('div :lt(4)')&lt;/button&gt;
&lt;button id="btn2" style="color: blue;"&gt;$('div span:lt(4)')&lt;/button&gt;
&lt;button id="btn3" style="color: green;"&gt;$('div gt(3)')&lt;/button&gt;
&lt;button id="btn4" style="color: pink;"&gt;$('div span:gt(3)')&lt;/button&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;div&gt;
    &lt;span&gt;0:span0&lt;/span&gt;
    &lt;span&gt;1:span1&lt;/span&gt;
    &lt;span&gt;2:span2&lt;/span&gt;
    &lt;i&gt;3:i0&lt;/i&gt;
    &lt;i&gt;4:i1&lt;/i&gt;
    &lt;i&gt;5:i2&lt;/i&gt;
    &lt;span&gt;6:span3&lt;/span&gt;
    &lt;span&gt;7:span4&lt;/span&gt;
&lt;/div&gt;
&lt;script&gt;
reset.onclick = function(){history.go();}
//匹配父元素为div元素的索引小于4的元素，结果序号是0、1、2、3
btn1.onclick = function(){$('div :lt(4)').css('color','red');}
//匹配父元素为div元素的span元素的索引小于4的元素，结果序号是0、1、2、6
btn2.onclick = function(){$('div span:lt(4)').css('color','blue');}
//匹配父元素为div元素的索引大于1的元素，结果序号是2、3、4、5、6、7
btn3.onclick = function(){$('div :gt(1)').css('color','green');}
//匹配父元素为div元素的span元素的索引大于1的元素，结果序号是2、6、7
btn4.onclick = function(){$('div span:gt(1)').css('color','pink');}
&lt;/script&gt;</pre>
</div>

&nbsp;

## 最后

&emsp;&emsp;索引选择器借鉴于CSS的nth-of-type()选择器，但又有变化和拓展之处。变化表现在索引选择器的索引是指的特定元素的索引顺序，且从0开始。拓展表现在新增了范围索引选择器。还有一点值得注意的是:first、:last和:eq()返回的是单个元素，而其他索引选择器返回的是集合元素

&emsp;&emsp;欢迎交流