# jQuery属性选择器

&emsp;&emsp;属性过滤选择器的过滤规则是通过元素的属性来获取相应的元素，对应于CSS中的[属性选择器](http://www.cnblogs.com/xiaohuochai/p/4979514.html#anchor5)。属性过滤选择器可分为简单属性选择器、具体属性选择器和条件属性选择器三种。本文将详细该部分内容

&nbsp;

### 简单属性选择器

**[attribute]**

&emsp;&emsp;[attribute]选择器选择拥有该属性的元素，返回集合元素

<div>
<pre>//选择拥有title属性的所有元素
$('[title]')
//选择拥有title属性的所有span元素
$('span[title]')
//选择同时拥有title属性和id属性的所有span元素
$('span[id][title]')</pre>
</div>
<div>
<pre>&lt;button id="btn1" style="color: red;"&gt;$('[title]')&lt;/button&gt;
&lt;button id="btn2" style="color: blue;"&gt;$('span[title]')&lt;/button&gt;
&lt;button id="btn3" style="color: green;"&gt;$('span[id][title]')&lt;/button&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;div&gt;
    &lt;span title="span0"&gt;span0&lt;/span&gt;
    &lt;span&gt;span1&lt;/span&gt;
    &lt;span title="span2"&gt;span2&lt;/span&gt;
    &lt;i title="i0"&gt;i0&lt;/i&gt;
    &lt;span id="span3" title="span3"&gt;span3&lt;/span&gt;
    &lt;i&gt;i1&lt;/i&gt;
&lt;/div&gt;
&lt;script&gt;
reset.onclick = function(){history.go();}
//选择拥有title属性的所有元素，结果是span0、span2、i0、span3
btn1.onclick = function(){$('[title]').css('color','red');}
//选择拥有title属性的所有span元素，结果是span0、span2、span3
btn2.onclick = function(){$('span[title]').css('color','blue');}
//选择同时拥有title属性和id属性的所有span元素，结果是span3
btn3.onclick = function(){$('span[id][title]').css('color','green');}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/selector/s20.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;对应于CSS的[简单属性选择器](http://www.cnblogs.com/xiaohuochai/p/4979514.html#anchor5)&nbsp;

<div>
<pre>[title]{color:red;}
span[title]{color:blue;}
span[id][title]{color:green;}</pre>
</div>

&emsp;&emsp;如果使用javascript实现类似$('span[id][title]').css('color','green')的效果

<div>
<pre>var spans = document.getElementsByTagName('span');
for(var i = 0; i &lt; spans.length; i++){
    if((spans[i].id != '') &amp;&amp; (spans[i].title != '')){
        spans[i].style.color = 'green';
    }
}</pre>
</div>

&nbsp;

### 具体属性选择器

**[attribute=value]**

&emsp;&emsp;[attribute=value]选择器选择属性值为value的元素，返回集合元素

<div>
<pre>//选择class值为test的元素
$('[class="test"]')
//选择class值为test的span元素
$('span[class="test"]')
//选择class值为test span的span元素
$('span[class="test span"]')
//选择class值为span test的span元素
$('span[class="span test"]')</pre>
</div>

**严格匹配**

&emsp;&emsp;注意：具体属性选择器的匹配属于严格匹配

&emsp;&emsp;【1】$('[class="test"]')匹配class属性只有test值的情况；而class="test test1"将不会被匹配

&emsp;&emsp;【2】[class="a1 a2"]和[class="a2 a1"]并不相同，它们分别只严格匹配class="a1 a2"和class="a2 a1"的元素

<div>
<pre>&lt;button id="btn1" style="color: red;"&gt;$('[class="test"]')&lt;/button&gt;
&lt;button id="btn2" style="color: blue;"&gt;$('span[class="test"]')&lt;/button&gt;
&lt;button id="btn3" style="color: green;"&gt;$('span[class="test span"]')&lt;/button&gt;
&lt;button id="btn4" style="color: pink;" &gt;$('span[class="span test"]')&lt;/button&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;div&gt;
    &lt;span class="test"&gt;span0&lt;/span&gt;
    &lt;span&gt;span1&lt;/span&gt;
    &lt;span class="span test"&gt;span2&lt;/span&gt;
    &lt;i class="test"&gt;i0&lt;/i&gt;
    &lt;span class="test span"&gt;span3&lt;/span&gt;
    &lt;i&gt;i1&lt;/i&gt;
&lt;/div&gt;
&lt;script&gt;
reset.onclick = function(){history.go();}
//选择class属性只是'test'的所有元素，结果是span0、i0
btn1.onclick = function(){$('[class="test"]').css('color','red');}
//选择class属性只是'test'的所有span元素，结果是span0
btn2.onclick = function(){$('span[class="test"]').css('color','blue');}
//选择class属性是'test span'的所有span元素，结果是span3
btn3.onclick = function(){$('span[class="test span"]').css('color','green');}
//选择class属性是'span test'的所有span元素，结果是span2
btn4.onclick = function(){$('span[class="span test"]').css('color','pink');}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/selector/s21.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;对应于CSS选择器的[具体属性选择器](http://www.cnblogs.com/xiaohuochai/p/4979514.html#anchor5)

<div>
<pre>[class="test"]{color:red;}
span[class="test"]{color:blue;}
span[class="test span"]{color:green;}
span[class="span test"]{color:pink;}</pre>
</div>

&emsp;&emsp;如果使用javascript实现类似$('span[class="span test"]').css('color','pink')的功能

<div>
<pre>var spans = document.getElementsByTagName('span');
for(var i = 0; i &lt; spans.length; i++){
    if(spans[i].className == 'span test'){
        spans[i].style.color = 'pink';
    }
}</pre>
</div>

**id选择器**

&emsp;&emsp;在CSS选择器，id选择器和id属性选择器并不相同，因为它们的优先级不同。而jQuery选择器，并没有优先级的概念，如果两个选择器对相同id属性同时设置，则后面覆盖前面

<div>
<pre>&lt;button id="btn1"&gt;$('#test')在后&lt;/button&gt;
&lt;button id="btn2"&gt;$('[id="test"]')在后&lt;/button&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;div id="test" style="height:20px;"&gt;测试内容&lt;/div&gt;
&lt;script&gt;
reset.onclick = function(){history.go();}
btn1.onclick = function(){
    $('[id="test"]').css('color','blue');        
    $('#test').css('color','red');
}
btn2.onclick = function(){
    $('#test').css('color','red');
    $('[id="test"]').css('color','blue');    
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/selector/s22.html" frameborder="0" width="320" height="240"></iframe>

### 条件属性选择器

&emsp;&emsp;条件属性选择器共包括6种，其中`[attribute!=value]`选择器是jQuery自己拓展的选择器

**`[attribute!=value]`**

&emsp;&emsp;`[attribute!=value]`选择器选择属性值不等于value的元素，返回集合元素

&emsp;&emsp;注意：class="test test1"的元素也符合$('[class!="test"]')的情况，因为属性选择器的严格匹配机制

**`[attribute^=value]`**

&emsp;&emsp;`[attribute^=value]`选择器选择属性值以value开始的元素，返回集合元素

**`[attribute$=value]`**

&emsp;&emsp;`[attribute$=value]`选择器选择属性值以value结束的元素，返回集合元素

**`[attribute*=value]`**

&emsp;&emsp;`[attribute*=value]`选择器选择属性值包含value的元素，返回集合元素

**`[attribute|=value]`**

&emsp;&emsp;`[attribute|=value]`选择器选择属性值等于value或以value-开头的元素，返回集合元素

**`[attribute~=value]`**

&emsp;&emsp;`[attribute~=value]`选择器选择属性值用空格分隔的值中包含value的元素，返回集合元素

&emsp;&emsp;注意：$('[class~="test"]')选择器包含class="test"的元素的情况

<div>
<pre>&lt;button id="btn1" style="color: red;"&gt;!=&lt;/button&gt;
&lt;button id="btn2" style="color: blue;"&gt;^=&lt;/button&gt;
&lt;button id="btn3" style="color: green;"&gt;$=&lt;/button&gt;
&lt;button id="btn4" style="color: pink;" &gt;*=&lt;/button&gt;
&lt;button id="btn5" style="color: gray;" &gt;|=&lt;/button&gt;
&lt;button id="btn6" style="color: orange;" &gt;~=&lt;/button&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;div&gt;
    &lt;span&gt;1&lt;/span&gt;
    &lt;span class="test"&gt;2&lt;/span&gt;
    &lt;span class="test1"&gt;3&lt;/span&gt;
    &lt;span class="is-test"&gt;4&lt;/span&gt;
    &lt;span class="test test1"&gt;5&lt;/span&gt;
    &lt;span class="test-1"&gt;6&lt;/span&gt;
&lt;/div&gt;
&lt;script&gt;
reset.onclick = function(){history.go();}

//选择class属性不是'test'的所有元素，结果是1、3、4、5、6
btn1.onclick = function(){$('div [class!="test"]').css('color','red');}
//选择class属性以'test'开始的所有元素，结果是2、3、5、6
btn2.onclick = function(){$('div [class^="test"]').css('color','blue');}
//选择class属性以'test'结束的所有元素，结果是2、4
btn3.onclick = function(){$('div [class$="test"]').css('color','green');}
//选择class属性包含'test'的所有元素，结果是2、3、4、5、6
btn4.onclick = function(){$('div [class*="test"]').css('color','pink');}
//选择class属性等于'test'或以'test-'开头的所有元素，结果是2、6
btn5.onclick = function(){$('div [class|="test"]').css('color','gray');}
//选择class属性在用空格分隔的值包含'test'的所有元素，结果是2、5
btn6.onclick = function(){$('div [class~="test"]').css('color','orange');}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/selector/s23.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;对应于CSS选择器中的[部分属性选择器](http://www.cnblogs.com/xiaohuochai/p/4979514.html#anchor5)

&emsp;&emsp;注意：由于[attribute!=value]是jQuery自己拓展的，所以并没有对应的CSS选择器

<div>
<pre>[class^="test"]{color:blue;}
[class$="test"]{color:green;}
[class*="test"]{color:pink;}
[class!="test"]{color:gray;}
[class~="test"]{color:orange;}</pre>
</div>

&emsp;&emsp;如果使用javascript实现类似$('span[class~="test"]').css('color','orange')的功能

<div>
<pre>var spans = document.getElementsByTagName('span');
for(var i = 0; i &lt; spans.length; i++){
    if(/^test\s|\stest\s|\stest$|^test$/.test(spans[i].className)){
        spans[i].style.color = 'orange';
    }
}</pre>
</div>

&nbsp;

## 最后

&emsp;&emsp;属性选择器的功能十分强大，特别是条件属性选择器，基本覆盖属性值的各种情况。但在实际中，使用属性选择器却寥寥，可能是因为使用javascript或jQuery多用于改变元素属性值，所以使用属性值作为选择标准并不稳定

&emsp;&emsp;欢迎交流