# jQuery伪子元素选择器

&emsp;&emsp;本文是[子元素选择器](http://www.cnblogs.com/xiaohuochai/p/5804664.html)的续篇，主要介绍关于nth-of-type()选择器的内容。该部分内容并非没有出现在《锋利的jQuery》一书中，nth-of-type()选择器参照CSS中的nth-of-type选择器，于1.9版本新增，本文将详细介绍该内容

&nbsp;

### 通用形式

:nth-of-type()

&emsp;&emsp;个人认为，:nth-of-type()选择器不应该归类于子元素选择器，也不完全等同[索引选择器](http://www.cnblogs.com/xiaohuochai/p/5807292.html)，因为其索引是指特定元素的索引，但索引是从1开始的，而且返回的是集合元素。所以，我把其称之为伪子元素选择器

<div>
<pre>$('div span:nth-of-type(2)').css('color','red');</pre>
</div>

&emsp;&emsp;对应于CSS的:nth-of-type()选择器

<div>
<pre>div span:nth-of-type(2){color:red;}</pre>
</div>

&emsp;&emsp;如果使用javascript实现类似效果

<div>
<pre>var divs = document.getElementsByTagName('div');
for(var i = 0; i &lt; divs.length; i++){
    var span2 = divs[i].getElementsByTagName('span')[1];
    if(span2){
        span2.style.color = 'red';
    }
}</pre>
</div>
<div>
<pre>&lt;button id='btn1' style="color:red"&gt;$('div span:nth-of-type(2)')&lt;/button&gt;
&lt;button id='btn2' style="color:blue"&gt;$('div span:nth-child(2)')&lt;/button&gt;
&lt;button id='btn3' style="color:green"&gt;$('div span:eq(1)')&lt;/button&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;div&gt;
    &lt;i&gt;1.1&lt;/i&gt;
    &lt;span&gt;1.2&lt;/span&gt;
    &lt;span&gt;1.3&lt;/span&gt;    
&lt;/div&gt;
&lt;div&gt;
    &lt;i&gt;2.1&lt;/i&gt;
    &lt;span&gt;2.2&lt;/span&gt;
    &lt;span&gt;2.3&lt;/span&gt;
&lt;/div&gt;
&lt;script&gt;
reset.onclick = function(){history.go();}
btn1.onclick = function(){
    //选择所有父元素为div元素的第2个出现的span元素，所以结果为1.3、2.3
    $('div span:nth-of-type(2)').css('color','red');
}
btn2.onclick = function(){
    //选择所有父元素为div元素的第2个子元素，且该子元素是span元素，所以结果是1.2、2.2
    $('div span:nth-child(2)').css('color','blue');
}
btn3.onclick = function(){
    //选择首次出现的父元素为div元素的第1个出现的span元素(索引从0开始)，所以结果是1.3
    $('div span:eq(1)').css('color','green');
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 90px;" src="https://demo.xiaohuochai.site/jquery/selector/s32.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;当然$(':nth-of-type(index)')选择器作为通用形式，可以有多种参数选择

&emsp;&emsp;【1】$(':nth-of-type(even)') 选取所有索引值为偶数的元素

&emsp;&emsp;【2】$(':nth-of-type(odd)') 选取所有索引值为奇数的元素

&emsp;&emsp;【3】$(':nth-of-type(3n+1)') 选取所有索引值为(3n+1)的元素

<div>
<pre>&lt;button id="btn1" style="color: red;"&gt;$(':nth-of-type(even)')&lt;/button&gt;
&lt;button id="btn2" style="color: blue;"&gt;$(':nth-of-type(odd)')&lt;/button&gt;
&lt;button id="btn3" style="color: green;"&gt;$(':nth-of-type(3n+1)')&lt;/button&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;div&gt;
    &lt;i&gt;1&lt;/i&gt;
    &lt;span&gt;2&lt;/span&gt;
    &lt;span&gt;3&lt;/span&gt;    
    &lt;i&gt;4&lt;/i&gt;
    &lt;span&gt;5&lt;/span&gt;
    &lt;span&gt;6&lt;/span&gt;
&lt;/div&gt;
&lt;script src="jquery-3.1.0.js"&gt;&lt;/script&gt;
&lt;script&gt;
reset.onclick = function(){history.go();}
//匹配每个父元素为div的索引为偶数的元素，结果是3(第2个span)、6(第4个span)、4(第2个i)
btn1.onclick = function(){$('div :nth-of-type(even)').css('color','red');}
//匹配每个父元素为div的索引为奇数的元素，结果是1(第1个i)、2(第1个span)、5(第3个span)
btn2.onclick = function(){$('div :nth-of-type(odd)').css('color','blue');}
//匹配每个父元素为div的索引为(3n+1)的元素，索引可以是1、4。所以结果是1(第1个i)、2(第1个span)、6(第4个span)
btn3.onclick = function(){$('div :nth-of-type(3n+1)').css('color','green');}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/selector/s33.html" frameborder="0" width="320" height="240"></iframe>

### 反向形式

**:nth-last-of-type()**

&emsp;&emsp;:nth-last-of-type()选择器选择所有第n个元素，但计数从最后一个元素到第一个

<div>
<pre>$('div :nth-last-of-type(even)').css('color','red');</pre>
</div>

&emsp;&emsp;对应的CSS选择器是:nth-last-of-type()

<div>
<pre>div :nth-last-of-type(even){color:red;}</pre>
</div>

&emsp;&emsp;如果使用javascript实现类似效果

<div>
<pre>var divs = document.getElementsByTagName('div');
for(var i = 0; i &lt; divs.length; i++){
    var children = divs[i].children;
    var lastName = '';
    //从后往前数
    for(var j = children.length; j &gt; -1; j--){
        //标签第一次出现或奇数次出现
        if(children[j].nodeName != lastName){
            children[j].style.color = 'red';
            lastName = children[j].nodeName;
        //标签第二次出现或偶数次出现
        }else{
            lastName = '';
        }
    }
}</pre>
</div>
<div>
<pre>&lt;button id="btn1" style="color: red;"&gt;$(':nth-last-of-type(even)')&lt;/button&gt;
&lt;button id="btn2" style="color: blue;"&gt;$(':nth-last-of-type(odd)')&lt;/button&gt;
&lt;button id="btn3" style="color: green;"&gt;$(':nth-last-of-type(3n+1)')&lt;/button&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;div&gt;
    &lt;i&gt;1&lt;/i&gt;
    &lt;span&gt;2&lt;/span&gt;
    &lt;span&gt;3&lt;/span&gt;    
    &lt;i&gt;4&lt;/i&gt;
    &lt;span&gt;5&lt;/span&gt;
    &lt;span&gt;6&lt;/span&gt;
&lt;/div&gt;
&lt;script src="jquery-3.1.0.js"&gt;&lt;/script&gt;
&lt;script&gt;
reset.onclick = function(){history.go();}
//匹配每个父元素为div的索引为偶数的元素(从后往前数)，结果是5(倒数第2个span)、2(倒数第4个span)、1(倒数第2个i)
btn1.onclick = function(){$('div :nth-last-of-type(even)').css('color','red');}
//匹配每个父元素为div的索引为奇数的元素(从后往前数)，结果是4(倒数第1个i)、6(倒数第1个span)、3(倒数第3个span)
btn2.onclick = function(){$('div :nth-last-of-type(odd)').css('color','blue');}
//匹配每个父元素为div的索引为(3n+1)的元素(从后往前数)，索引可以是1、4(从后往前数)。所以结果是4(倒数第1个i)、6(倒数第1个span)、2(倒数第4个span)
btn3.onclick = function(){$('div :nth-last-of-type(3n+1)').css('color','green');}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/selector/s34.html" frameborder="0" width="320" height="240"></iframe>

### 首尾元素

**$(':first-of-type')**

&emsp;&emsp;:first-of-type选择器是:nth-of-type(1)选择器的简写形式，选取所有相同元素中的首个元素

**$(':last-of-type')**

&emsp;&emsp;类似地，$(':last-of-type')选择器选取所有相同元素中的最后一个元素

<div>
<pre>&lt;button id="btn1" style="color: red;"&gt;$('div :first-of-type')&lt;/button&gt;
&lt;button id="btn2" style="color: blue;"&gt;$('div :last-of-type')&lt;/button&gt;
&lt;button id="btn3" style="color: green;"&gt;$('div span:first-of-type')&lt;/button&gt;
&lt;button id="btn4" style="color: pink;"&gt;$('div span:last-of-type')&lt;/button&gt;
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
//匹配每个div元素为父元素的索引为1的元素，结果是1.1、1.2、3.1、3.2
btn1.onclick = function(){$('div :first-of-type').css('color','red');}
//匹配每个div元素为父元素的索引为1的元素(从后向前数)，结果同上
btn2.onclick = function(){$('div :last-of-type').css('color','blue');}
//匹配每个div元素为父元素的索引为1的span元素，结果是1.2、3.1
btn3.onclick = function(){$('div span:first-of-type').css('color','green');}
//匹配每个div元素为父元素的索引为1的span元素(从后向前数)，结果是同上
btn4.onclick = function(){$('div span:last-of-type').css('color','pink');}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/jquery/selector/s35.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;首尾伪子元素选择器分别对应于CSS中的:first-of-type和:last-of-type

&emsp;&emsp;如果要完成同样的功能，选择器格式分别为：&nbsp;

<div>
<pre>div :first-of-type{color:red;}
div :last-of-type{color:blue;}
div span:first-of-type{color:green;}
div span:last-of-type{color:pink;}</pre>
</div>

&emsp;&emsp;如果使用javascript选择器要完成上面的最后一个功能，则如下所示

<div>
<pre>var divs = document.getElementsByTagName('div');
for(var i = 0; i &lt; divs.length; i++){
    var spans = divs[i].getElementsByTagName('span');
    spans[spans.length-1].style.color = 'pink';
}</pre>
</div>

&nbsp;

### 唯一元素

**:only-of-type()**

&emsp;&emsp;:only-of-type()选择器选择出所有没有具有相同名称的兄弟元素的元素

<div>
<pre>$('div span:only-of-type').css('color','green');</pre>
</div>

&emsp;&emsp;对应于CSS的:only-of-type选择器

<div>
<pre>div span:only-of-type{color:green;}</pre>
</div>

&emsp;&emsp;如果使用javascript实现，则如下所示

<div>
<pre>var divs = document.getElementsByTagName('div');
for(var i = 0; i &lt; divs.length; i++){
    var spans = divs[i].getElementsByTagName('span');
    if(spans.length == 1){
        divs[i].spans[0].color = 'green';
    }
}</pre>
</div>
<div>
<pre>&lt;button id="btn1" style="color: green;"&gt;$('div span:only-of-type')&lt;/button&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;div&gt;
    &lt;span&gt;1.1&lt;/span&gt;
    &lt;span&gt;1.2&lt;/span&gt;
    &lt;i&gt;1.3&lt;/i&gt;
&lt;/div&gt;
&lt;div&gt;
    &lt;span&gt;2.1&lt;/span&gt;
    &lt;i&gt;2.2&lt;/i&gt;
&lt;/div&gt;
&lt;script src="jquery-3.1.0.js"&gt;&lt;/script&gt;
&lt;script&gt;
reset.onclick = function(){history.go();}
//第2个div中只存在一个&lt;span&gt;元素，所以结果是2.1
btn1.onclick = function(){$('div span:only-of-type').css('color','green');}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 90px;" src="https://demo.xiaohuochai.site/jquery/selector/s36.html" frameborder="0" width="320" height="240"></iframe>

## 最后

&emsp;&emsp;终于把jQuery选择器系列完结了，与[原生javascript选择器](http://www.cnblogs.com/xiaohuochai/p/5795796.html)相比，内容多了不少。jQuery选择器主要基于[CSS选择器](http://www.cnblogs.com/xiaohuochai/p/4979514.html)，并有所拓展。但实际上，选择器太过丰富也增加了选择的代价，同时也提出了各种选择器选用的性能问题

&emsp;&emsp;如果只有一条路，这条路再难，也得咬牙走下去。如果有10条路，如果时间充足，则可以把10条路都走一遍，找出最轻松的路，也就是性能最好的路；如果时间不足，只能挑一条熟悉的路，但总感觉没选到最轻松的路

&emsp;&emsp;就像[索引选择器](http://www.cnblogs.com/xiaohuochai/p/5807292.html):eq()、[子元素选择器](http://www.cnblogs.com/xiaohuochai/p/5804664.html):nth-child()和[伪子元素选择器](http://www.cnblogs.com/xiaohuochai/p/5813357.html):nth-of-type()。方法多了，容易混淆，使用时有多种选择，但要注意区分

&emsp;&emsp;丰富是好事，也是坏事

&emsp;&emsp;库是好事，也是坏事

&emsp;&emsp;以上