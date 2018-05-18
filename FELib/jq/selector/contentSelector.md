# jQuery内容选择器

&emsp;&emsp;本文介绍过滤选择器中的内容选择器。内容选择器的过滤规则主要体现在它所包含的子元素或文本内容上

&nbsp;

### :contains(text)

&emsp;&emsp;:contains(text)选择器选择含有文本内容为'text'的元素，返回集合元素

<div>
<pre>//返回所有文本内容包含'test'的元素
$(':contains("test")')
//返回所有文本内容包含'test'的span元素
$('span:contains("test")')</pre>
</div>

&emsp;&emsp;该选择器并没有对应的CSS选择器，如果使用javascript实现类似$('span:contains("test")').css('color','red')的效果

<div>
<pre>var spans = document.getElementsByTagName('span');
for(var i = 0; i &lt; spans.length; i++){
    if(/test/.test(spans[i].innerHTML)){
        spans[i].style.color = 'red';
    }
}</pre>
</div>

&emsp;&emsp;注意：如果:contains(text)选择器中的文本内容text包含在子元素中也可以，但是要小心使用

&emsp;&emsp;【1】$('div span:contains("test")').css('color','blue')可以匹配&lt;div&gt;&lt;span&gt;&lt;i&gt;test&lt;/i&gt;&lt;/span&gt;&lt;/div&gt;，但实际上匹配的是&lt;span&gt;元素，&lt;i&gt;元素由于是&lt;span&gt;元素的子元素，所以i元素的文本颜色变为蓝色

&emsp;&emsp;【2】$('div :contains("test")').css('color','red')也可以匹配&lt;div&gt;&lt;span&gt;&lt;i&gt;test&lt;/i&gt;&lt;/span&gt;&lt;/div&gt;，但直接匹配的是&lt;i&gt;元素，所以i元素的文本元素变为红色。如果两个选择器同时存在，则文本元素为红色。因为直接给元素设置颜色比通过父级继承颜色的优先级高

<div>
<pre>&lt;button id="btn1" style="color: red;"&gt;$('div :contains("test")')&lt;/button&gt;
&lt;button id="btn2" style="color: blue;"&gt;$('div span:contains("test")')&lt;/button&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;div&gt;
    &lt;span&gt;test1&lt;/span&gt;
    &lt;span&gt;test2&lt;/span&gt;
    &lt;span&gt;&lt;i&gt;test3&lt;/i&gt;&lt;/span&gt;
    &lt;i&gt;&lt;span&gt;test4&lt;/span&gt;&lt;/i&gt;
    &lt;i&gt;test5&lt;/i&gt;
    &lt;i&gt;1&lt;/i&gt;
&lt;/div&gt;
&lt;script&gt;
reset.onclick = function(){history.go();}
//对于test3，就是上面讨论的直接给元素设置颜色比通过父级继承颜色的优先级高的情况
btn1.onclick = function(){$('div :contains("test")').css('color','red');}  
btn2.onclick = function(){$('div span:contains("test")').css('color','blue');}  
&lt;/script&gt; </pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/selector/s24.html" frameborder="0" width="320" height="240"></iframe>

### :empty

&emsp;&emsp;:empty选择器选择不包含子元素或文本的空元素，返回集合元素

<div>
<pre>$('div :empty').css('color','red');</pre>
</div>

&emsp;&emsp;对应的CSS选择器是:empty选择器，该选择器选择没有子元素的元素，而且该元素也不包含任何文本节点

<div>
<pre>:empty{color:red;}</pre>
</div>

&emsp;&emsp;如果使用javascript实现类似效果

<div>
<pre>var divs = document.getElementsByTagName('div');
for(var i = 0; i &lt; divs.length; i++){
    if(divs[i].innerHTML == ''){
        divs[i].style.color = 'red';
    }
}</pre>
</div>

&nbsp;

### :parent

&emsp;&emsp;与:empty选择器正好相反，:parent选择器选择含有子元素或文本的元素，返回集合元素

<div>
<pre>$('div :parent').css('color','red');</pre>
</div>

&emsp;&emsp;该选择器并没有对应的CSS选择器，如果使用javascript实现类似效果

<div>
<pre>var divs = document.getElementsByTagName('div');
for(var i = 0; i &lt; divs.length; i++){
    if(divs[i].innerHTML != ''){
        divs[i].style.color = 'red';
    }
}  </pre>
</div>
<div>
<pre>&lt;style&gt; 
div div{height: 20px;width: 20px;}
&lt;/style&gt;
&lt;button id="btn1" style="color: red;"&gt;$('div :empty')&lt;/button&gt;
&lt;button id="btn2" style="color: blue;"&gt;$('div :parent')&lt;/button&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;div&gt;
    &lt;div&gt;&lt;/div&gt;
    &lt;div&gt;1&lt;/div&gt;
    &lt;div&gt;2&lt;/div&gt;
    &lt;div&gt;3&lt;/div&gt;
&lt;/div&gt;
&lt;script&gt;
reset.onclick = function(){history.go();}
btn1.onclick = function(){$('div :empty').css('backgroundColor','red');}  
btn2.onclick = function(){$('div :parent').css('backgroundColor','blue');}  
&lt;/script&gt; </pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/jquery/selector/s25.html" frameborder="0" width="320" height="240"></iframe>

### :has(selector)

&emsp;&emsp;:has(selector)选择器选择含有选择器所匹配的元素的父元素，返回集合元素

&emsp;&emsp;注意：该选择器匹配的实际上是父元素　

<div>
<pre>//选择拥有.test的子元素的父元素
$(:has(.test))
//选择拥有.test的子元素的父元素，且该父元素是div元素
$(div:has(.test))</pre>
</div>

&emsp;&emsp;该选择器没有对应的CSS选择器，如果使用javascript实现类似$(div:has(.test)).css('color','red')的效果

<div>
<pre>var divs = document.getElementsByTagName('div');
for(var i = 0; i &lt; divs.length; i++){
    var tags = divs[i].getElementsByTagName('*');
    for(var j = 0; j &lt; tags.length; j++){
        if(tags[j].className == 'test'){
            divs[i].style.color = 'red';
            break;
        }
    }
} </pre>
</div>

&nbsp;

### :not(selector)

&emsp;&emsp;:not(selector)选择器去除所有选择器所匹配的元素，返回集合元素

<div>
<pre>//选择去除.test后的所有span元素
$(span:not(.test))
//选择父元素为div元素下的去除.test后的所有span元素
$(div span:not(.test))</pre>
</div>
<div>&emsp;&emsp;该选择器没有对应的CSS选择器，如果使用javascript实现类似$(div span:not(.test)).css('color','red')的效果</div>
<div>
<div>
<pre>var divs = document.getElementsByTagName('div');
for(var i = 0; i &lt; divs.length; i++){
    var spans = divs[i].getElementsByTagName('span');
    for(var j = 0; j &lt; spans.length; j++){
        if(spans[j].className != 'test'){
            divs[i].spans[j].style.color = 'red';
        }
    }
}</pre>
</div>
</div>
<div>
<pre>&lt;style&gt; 
div{height: 40px;width: 30px;}
&lt;/style&gt;
&lt;button id="btn1" style="color: red;"&gt;$('div:has(.test)')&lt;/button&gt;
&lt;button id="btn2" style="color: blue;"&gt;$('span:has(.test)')&lt;/button&gt;
&lt;button id="btn3" style="color: green;"&gt;$('span:not(.test)')&lt;/button&gt;
&lt;button id="btn4" style="color: pink;"&gt;$('div:not(.test)')&lt;/button&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;div&gt;
    &lt;span class="test"&gt;1.1&lt;/span&gt;
    &lt;span&gt;1.2&lt;/span&gt;
&lt;/div&gt;
&lt;div&gt;
    &lt;span&gt;2.1&lt;/span&gt;
    &lt;span&gt;2.2&lt;/span&gt;
&lt;/div&gt;
&lt;script&gt;
reset.onclick = function(){history.go();}
//选择含有.test子元素的div父元素，则第1个div的字体颜色变红
btn1.onclick = function(){$('div:has(.test)').css('backgroundColor','red');} 
//选择含有.test子元素的span父元素，结果span元素下并没有子元素，所以无变化
btn2.onclick = function(){$('span:has(.test)').css('backgroundColor','blue');}
//选择去除.test的span元素，则结果是1.2、2.1、2.2
btn3.onclick = function(){$('span:not(.test)').css('backgroundColor','green');} 
//选择 去除.test的div元素，由于两个div元素都没有.test，所以全部选中
btn4.onclick = function(){$('div:not(.test)').css('backgroundColor','pink');}  
&lt;/script&gt; </pre>
</div>

<iframe style="line-height: 1.5; width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/jquery/selector/s26.html" frameborder="0" width="320" height="240"></iframe>

### :header

&emsp;&emsp;:header选择器选取所有的标题元素

<div>
<pre>&lt;button id="btn1"&gt;$(':header')&lt;/button&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;h3&gt;h3&lt;/h3&gt;
&lt;h4&gt;h4&lt;/h4&gt;
&lt;p&gt;p&lt;/p&gt;
&lt;script&gt;
reset.onclick = function(){history.go();}
btn1.onclick = function(){$(':header').css('color','red');} 
&lt;/script&gt; </pre>
</div>

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/jquery/selector/s27.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;该选择器并没有对应的CSS选择器，如果使用javascript实现类似$(':header').css('color','red')效果

<div>
<pre>var tags = document.getElementsByTagName('*');
for(var i = 0; i &lt; tags.length; i++){
    if(/H[1-6]/.test(tags[i].nodeName)){
        tags[i].style.color = 'red';
    }
}</pre>
</div>

&nbsp;

### :lang

&emsp;&emsp;:lang选择器选择指定语言的所有元素

<div>
<pre>//选择&lt;div lang="en"&gt;或&lt;div lang="en-us"&gt;
$('div:lang(en)').css('color','red');</pre>
</div>

&emsp;&emsp;lang属性是HTML元素的[全局属性](http://www.cnblogs.com/xiaohuochai/p/5033039.html)，详细情况[移步至此](http://www.cnblogs.com/xiaohuochai/p/5033039.html#anchor5)

&emsp;&emsp;CSS选择器有类似的:lang()选择器，用于匹配某个语言

<div>
<pre>div:lang(en){color:red;}</pre>
</div>

&emsp;&emsp;如果使用javascript实现类似效果

<div>
<pre>var divs = document.getElementsByTagName('div');
for(var i = 0; i &lt; divs.length; i++){
    if(/^\s*en\s*$|^\s*en-/.test(divs[i].lang)){
        divs[i].style.color = 'red';
    }
}</pre>
</div>

&nbsp;

### :root

&emsp;&emsp;:root选择器选择元素的根元素

<div>
<pre>$(':root').css('color','red');</pre>
</div>

&emsp;&emsp;CSS也有对应的:root选择器

<div>
<pre>:root{color:red;}</pre>
</div>

&emsp;&emsp;在javascript中，所有节点都有一个ownerDocument的属性，指向表示整个文档的文档节点document