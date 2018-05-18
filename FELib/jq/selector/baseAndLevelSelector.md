# jQuery基础选择器和层级选择器

&emsp;&emsp;选择器是jQuery的根基，在jQuery中，对事件处理、遍历DOM以及ajax操作都依赖于选择器。jQuery选择器完全继承了CSS的风格，两者的写法十分相似，只不过两者的作用效果不同。[CSS选择器](http://www.cnblogs.com/xiaohuochai/p/4979514.html)找到元素后添加样式，而jQuery选择器找到元素后添加行为。jQuery选择器可以分为基础选择器、层级选择器、过滤选择器和表单选择器四类。对于每类选择器，除了给出jQuery选择器的写法，也会给出相应的CSS选择器和DOM选择器的写法。有所比较，才能理解得更深。本文是jQuery选择器系列第一篇&mdash;&mdash;基础选择器和层级选择器

&nbsp;

## 基础选择器

&emsp;&emsp;基础选择器是jQuery中最常用选择器，也是最简单的选择器，它通过元素id、class和标签名等来查找DOM元素

### id选择器

&emsp;&emsp;id选择器$('#id')通过给定的id匹配一个元素，返回单个元素

<div>
<pre>&lt;div id="test"&gt;测试元素&lt;/div&gt;
&lt;script&gt;
//选择id为test的元素并设置其字体颜色为红色
$('#test').css('color','red');
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/selector/s1.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;对应CSS的[id选择器](http://www.cnblogs.com/xiaohuochai/p/4979514.html#anchor4)

<div>
<pre>#test{color:red}
</pre>
</div>

&emsp;&emsp;对应DOM的[getElementById()方法](http://www.cnblogs.com/xiaohuochai/p/5795796.html#anchor1)，而jQuery内部也使用该方法来处理ID的获取

<div>
<pre>document.getElementById('test').style.color = 'red';</pre>
</div>

&nbsp;

### 元素选择器

&emsp;&emsp;元素选择器$('element')根据给定的元素名匹配元素，并返回符合条件的集合元素

<div>
<pre>&lt;div&gt;1&lt;/div&gt;
&lt;div&gt;2&lt;/div&gt;
&lt;script&gt;
//选择标签名为div的元素并设置其字体颜色为红色
$('div').css('color','red');
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/selector/s2.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;对应CSS的[元素选择器](http://www.cnblogs.com/xiaohuochai/p/4979514.html#anchor2)

<div>
<pre>div{color:red}
</pre>
</div>

&emsp;&emsp;对应DOM的[getElementsByTagName()方法](http://www.cnblogs.com/xiaohuochai/p/5795796.html#anchor2)，而jQuery内部也使用该方法来处理元素名的获取

<div>
<pre>Array.prototype.forEach.call(document.getElementsByTagName('div'),function(item,index,arr){
    item.style.color = 'red';
});</pre>
</div>

&nbsp;

### 类选择器

&emsp;&emsp;类选择器$('.class')根据给定的类名匹配元素，并返回符合条件的集合元素

<div>
<pre>&lt;div class="test"&gt;1&lt;/div&gt;
&lt;div class="test"&gt;2&lt;/div&gt;
&lt;script&gt;
//选择class为test的元素并设置其字体颜色为红色
$('.test').css('color','red');
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/selector/s3.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;对应CSS的[类选择器](http://www.cnblogs.com/xiaohuochai/p/4979514.html#anchor3)

<div>
<pre>.test{color:red}
</pre>
</div>

&emsp;&emsp;对应DOM的[getElementsByClassName()方法](http://www.cnblogs.com/xiaohuochai/p/5797111.html)，而jQuery内部也使用该方法来处理类名的获取

<div>
<pre>Array.prototype.forEach.call(document.getElementsByClassName('test'),function(item,index,arr){
    item.style.color = 'red';
});</pre>
</div>

&nbsp;

### 通配选择器

&emsp;&emsp;通配选择器$('*')匹配文档中所有的元素，并返回集合元素

<div>
<pre>$('*').css('margin','0');</pre>
</div>

&emsp;&emsp;对应CSS的[通配选择器](http://www.cnblogs.com/xiaohuochai/p/4979514.html#anchor1)

<div>
<pre>* {margin:0}
</pre>
</div>

&emsp;&emsp;对应DOM的[document.all集合](http://www.cnblogs.com/xiaohuochai/p/5795796.html#anchor4)

<div>
<pre>Array.prototype.forEach.call(document.all,function(item,index,arr){
    item.style.margin = 0;
});</pre>
</div>

&emsp;&emsp;或者参数为通配符*的[getElementsByTagName()方法](http://www.cnblogs.com/xiaohuochai/p/5795796.html#anchor2)

<div>
<pre>Array.prototype.forEach.call(document.getElementsByTagName('*'),function(item,index,arr){
    item.style.margin = 0;
});</pre>
</div>

&nbsp;

### 群组选择器

&emsp;&emsp;群组选择器$('selector1,selector2,...')将每一个选择器匹配到的元素合并后一起，并返回集合元素

<div>
<pre>&lt;div class="a"&gt;1&lt;/div&gt;
&lt;span id="b"&gt;2&lt;/span&gt;
&lt;a href="#"&gt;3&lt;/a&gt;
&lt;script&gt;
//选择符合条件的元素并设置其字体颜色为红色
$('.a,#b,a').css('color','red');
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/selector/s4.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;对应CSS的[群组选择器](http://www.cnblogs.com/xiaohuochai/p/4979514.html#anchor6)

<div>
<pre>.a,#b,a{color:red}
</pre>
</div>

&emsp;&emsp;对应DOM的[querySelectorAll()选择器](http://www.cnblogs.com/xiaohuochai/p/5798014.html#anchor1)

<div>
<pre>Array.prototype.forEach.call(document.querySelectorAll('.a,#b,a'),function(item,index,arr){
    item.style.color = 'red';
});</pre>
</div>

&nbsp;

## 层级选择器

&emsp;&emsp;如果想通过[DOM元素之间的层级关系](http://www.cnblogs.com/xiaohuochai/p/5785297.html)来获取特定元素，层级选择器是一个非常好的选择。层级共包括后代元素、子元素、相邻元素和同级元素四种

### 后代选择器

&emsp;&emsp;后代选择器$('ancestor descendant')选择给定的祖先元素的所有后代元素，并返回集合元素

<div>
<pre>&lt;div id="test"&gt;
    &lt;div&gt;
        &lt;div&gt;1&lt;/div&gt;
        &lt;div&gt;2&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
&lt;script&gt;
$('#test div').css('margin','10px');
console.log($('#test div').length);//3
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;对应CSS的[后代选择器](http://www.cnblogs.com/xiaohuochai/p/4979514.html#anchor7)

<div>
<pre>#test div{margin: 10px}
</pre>
</div>

&emsp;&emsp;对应DOM的getElement类方法

<div>
<pre>Array.prototype.forEach.call(document.getElementById('test').getElementsByTagName('div'),function(item,index,arr){
    item.style.margin = '10px';
});</pre>
</div>

&emsp;&emsp;或者使用querySelectorAll()方法

<div>
<pre>Array.prototype.forEach.call(document.querySelectorAll('#test div'),function(item,index,arr){
    item.style.margin = '10px';
});</pre>
</div>

**子元素选择器**

&emsp;&emsp;子元素选择器$('parent &gt; child')选择所有指定'parent'元素中指定的'child'的直接子元素，并返回集合元素

<div>
<pre>&lt;div id="test"&gt;
    &lt;div&gt;
        &lt;div&gt;1&lt;/div&gt;
        &lt;div&gt;2&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
&lt;script&gt;
$('#test &gt; div').css('margin','10px');
console.log($('#test &gt; div').length);//1
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;对应CSS的[子元素选择器](http://www.cnblogs.com/xiaohuochai/p/4979514.html#anchor7)

<div>
<pre>#test &gt; div{margin: 10px}
</pre>
</div>

&emsp;&emsp;对应DOM的querySelectorAll()方法

<div>
<pre>Array.prototype.forEach.call(document.querySelectorAll('#test &gt; div'),function(item,index,arr){
    item.style.margin = '10px';
});</pre>
</div>

&nbsp;

### 一般兄弟选择器

&emsp;&emsp;一般兄弟选择器$('prev ~ siblings')选择'prev'元素之后的所有同级的'siblings'元素，并返回集合元素

<div>
<pre>&lt;ul&gt;
    &lt;li id="test"&gt;1&lt;/li&gt;
    &lt;li&gt;2&lt;/li&gt;
    &lt;li&gt;3&lt;/li&gt;
&lt;/ul&gt;
&lt;script&gt;
$('#test ~ li').css('color','red');
console.log($('#test ~ li').length);//2
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/jquery/selector/s5.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;对应CSS的[一般兄弟选择器](http://www.cnblogs.com/xiaohuochai/p/4979514.html#anchor8)

<div>
<pre>#test ~ li{color:red;}</pre>
</div>

&emsp;&emsp;对应DOM的querySelectorAll()方法

<div>
<pre>Array.prototype.forEach.call(document.querySelectorAll('#test ~ li'),function(item,index,arr){
    item.style.color = 'red';
});</pre>
</div>

**相邻兄弟选择器**

&emsp;&emsp;相邻兄弟选择器$('prev + next')选择所有紧跟在'prev'元素后的'next'元素，并返回集合元素

<div>
<pre>&lt;ul&gt;
    &lt;li id="test"&gt;1&lt;/li&gt;
    &lt;li&gt;2&lt;/li&gt;
    &lt;li&gt;3&lt;/li&gt;
&lt;/ul&gt;
&lt;script&gt;
$('#test + li').css('color','red');
console.log($('#test + li').length);//1
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/jquery/selector/s6.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;对应CSS的[相邻兄弟选择器](http://www.cnblogs.com/xiaohuochai/p/4979514.html#anchor8)

<div>
<pre>#test + li{color:red;}</pre>
</div>

&emsp;&emsp;对应DOM的querySelectorAll()方法

<div>
<pre>Array.prototype.forEach.call(document.querySelectorAll('#test + li'),function(item,index,arr){
    item.style.color = 'red';
});</pre>
</div>