# jQuery特性操作

&emsp;&emsp;每个元素都有一个或者多个特性，这些特性的用途就是给出相应元素或者其内容的附加信息。[操作特性](http://www.cnblogs.com/xiaohuochai/p/5819638.html#anchor3)的DOM方法主要有3个：getAttribute()方法、setAttribute()方法和removeAttribute()方法，而在jQuery中用一个attr()与removeAttr()就可以全部搞定了，包括兼容问题。本文将介绍jQuery中的特性操作

&nbsp;

### 获取特性

&emsp;&emsp;jQuery中用attr()方法来获取和设置特性，attr是attribute(特性)的缩写，在jQuery DOM操作中会经常用到attr()方法

**attr(attributeName)**

&emsp;&emsp;attr(传入特性名)：获取特性的值，相当于DOM中的getAttribute()

<div>
<pre>&lt;div id="test"&gt;&lt;/div&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
console.log(test.getAttribute('id'));//'test'    
console.log($('#test').attr('id'));//'test'
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;注意：attr()方法只获取第一个匹配元素的属性值。要获取每个单独的元素的属性值，我们依靠jQuery的.each()或者.map()方法循环

<div>
<pre>&lt;div class="test" id="ele1"&gt;元素一&lt;/div&gt;
&lt;div class="test" id="ele2"&gt;元素二&lt;/div&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
console.log($('.test').attr('id'));//'test'
$('.test').each(function(index) {
  console.log(index+":"+$(this).attr('id'));//'1:ele1 2:ele2'
});
&lt;/script&gt;</pre>
</div>

**prop()**

&emsp;&emsp;属性(property)和特性(attribute)是不同的。属性是DOM节点的属性，而特性是HTML标签的特性

&emsp;&emsp;注意：关于属性和特性的区别的详细信息[移步至此](http://www.cnblogs.com/xiaohuochai/p/5817608.html)

<div>
<pre>&lt;div id="test" data="abc"&gt;&lt;/div&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
test.data = 123;
//IE8-浏览器返回123，其他浏览器返回'abc'
console.log(test.getAttribute('data'))
console.log(test.data)//123
//IE8-浏览器返回123，其他浏览器返回'abc'
console.log($('#test').attr('data'))
console.log($('#test').prop('data'))//123
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;由上面代码可知，jQuery并没有解决低版本IE浏览器[属性和特性混淆](http://www.cnblogs.com/xiaohuochai/p/5817608.html#anchor6)的问题

&nbsp;

### 设置特性

&emsp;&emsp;设置特性虽然依然使用attr()方法，但却有3种方式

【1】attr(attributeName,value)

&emsp;&emsp;attr(特性名, 特性值)：设置特性的值，相当于DOM中的setAttribute()

<div>
<pre>&lt;div id="test"&gt;&lt;/div&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
test.setAttribute('title','abc');
console.log(test.getAttribute('title'))//'abc'
$('#test').attr('title','123');    
console.log($('#test').attr('title'));//'123'
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;jQuery禁止改变一个&lt;input&gt;或&lt;button&gt;元素的type特性，会静默失败。因为IE8-不会允许改变&lt;input&gt;或者&lt;button&gt;元素的type特性，静默失败

<div>
<pre>&lt;input id="test" type="text"&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
test.setAttribute('type','button');
$('#test').attr('type','button');    
&lt;/script&gt;</pre>
</div>

【2】attr(attributes)

&emsp;&emsp;attr(attributes)：给指定元素设置多个特性值，即{特性名一: &ldquo;特性值一&rdquo;,特性名二:&ldquo;特性值二&rdquo;,&hellip;}

&emsp;&emsp;当设置多个特性，包裹特性名的引号是可选的

<div>
<pre>&lt;div id="test"&gt;&lt;/div&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
test.setAttribute('title','abc');
test.setAttribute('a','abc');
console.log(test.getAttribute('title'))//'abc'
console.log(test.getAttribute('a'))//'abc'
$('#test').attr({
    title: '123',
    a: '123'
});    
console.log($('#test').attr('title'));//'123'
console.log($('#test').attr('a'));//'123'
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;注意：设置样式名&ldquo;class&rdquo;特性时，必须使用引号。否则IE8-浏览器下会报错

<div>
<pre>&lt;div id="test"&gt;&lt;/div&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
$('#test').attr({
    class: 'test'
});    
//IE8-浏览器会报错，其他浏览器输出'test'
console.log($('#test').attr('class'));
&lt;/script&gt;</pre>
</div>

【3】attr(attributeName,function(index,attr))

&emsp;&emsp;attr(特性名,函数值)：通过使用一个函数来设置属性，可以根据该元素上的其它属性值返回最终所需的属性值

&emsp;&emsp;函数中的index表示元素在匹配集合中的索引位置，html表示元素原来的HTML内容，this指向当前的元素，函数返回用来设置的值

<div>
<pre>&lt;div class="test" id="ele1" title="元素"&gt;元素一&lt;/div&gt;
&lt;div class="test" id="ele2" title="元素" &gt;元素二&lt;/div&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
$('.test').attr('title',function(index,attr){
    return attr + this.className +index
})
console.log($('#ele1').attr('title'));//元素test0
console.log($('#ele2').attr('title'));//元素test1
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;如果用javascript实现类似的效果，实际上就是字符串连接

&emsp;&emsp;注意：IE8-浏览器不支持[getElementsByClassName()方法](http://www.cnblogs.com/xiaohuochai/p/5797111.html)

<div>
<pre>&lt;div class="test" id="ele1" title="元素"&gt;元素一&lt;/div&gt;
&lt;div class="test" id="ele2" title="元素" &gt;元素二&lt;/div&gt;
&lt;script&gt;
var classTest = document.getElementsByClassName('test');
for(var i = 0; i &lt; classTest.length; i++){
    classTest[i].title = classTest[i].title + classTest[i].className + i;
}
console.log(ele1.title);//元素test0
console.log(ele2.title);//元素test1
&lt;/script&gt;</pre>
</div>

&nbsp;

### 删除特性

**removeAttr(attributeName)**

&emsp;&emsp;removeAttr()方法使用原生的removeAttribute()函数，但是它的优点是可以直接在一个jQuery 对象上调用该方法，并且它解决了跨浏览器的特性名不同的问题

&emsp;&emsp;要移除的属性名从1.7版本开始，可以是一个空格分隔的属性列表

<div>
<pre>&lt;div id="ele1" title="元素" data="value"&gt;元素&lt;/div&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
console.log($('#ele1').attr('title'));//'元素'
console.log($('#ele1').attr('data'));//'value'
$('#ele1').removeAttr('title data');
console.log($('#ele1').attr('title'));//undefined
console.log($('#ele1').attr('data'));//undefined
&lt;/script&gt;</pre>
</div>