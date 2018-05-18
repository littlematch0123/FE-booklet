# jQuery文本内容

&emsp;&emsp;在javascript中，[描述元素内容](http://www.cnblogs.com/xiaohuochai/p/5823716.html)有5个属性，分别是[innerHTML](http://www.cnblogs.com/xiaohuochai/p/5823716.html#anchor1)、[outerHTML](http://www.cnblogs.com/xiaohuochai/p/5823716.html#anchor2)、[innerText](http://www.cnblogs.com/xiaohuochai/p/5823716.html#anchor3)、[outerText](http://www.cnblogs.com/xiaohuochai/p/5823716.html#anchor4)和[textContent](http://www.cnblogs.com/xiaohuochai/p/5823716.html#anchor5)。这5个属性各自有各自的功能，且兼容性不同。jQuery针对这样的处理提供了3个便捷的方法，分别是：html()、text()和val()。本文将详细介绍jQuery描述文本内容的这3个方法

&nbsp;

### html()

&emsp;&emsp;html()方法类似于javascript中的innerHTML属性，用来获取集合中第一个匹配元素的HTML内容或设置每一个匹配元素的html内容，具体有3种用法：

【1】html()

&emsp;&emsp;html()不传入值可以用来获取集合中第一个匹配元素的HTML内容

&emsp;&emsp;注意：与innerHTML属性的问题相同，IE8-浏览器会将所有标签转换成大写形式，且不包含空白文本节点；而其他浏览器则原样返回

<div>
<pre>&lt;div class="test"&gt;
    &lt;div&gt;Demonstration Box&lt;/div&gt;
&lt;/div&gt;
&lt;div class="test"&gt;
    &lt;div&gt;123&lt;/div&gt;
&lt;/div&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
//'  &lt;div&gt;Demonstration Box&lt;/div&gt;'
console.log($('.test').html());
&lt;/script&gt;</pre>
</div>

【2】html(htmlString)

&emsp;&emsp;html(htmlString)方法设置每一个匹配元素的html内容，这些元素中的任何内容会完全被新的内容取代。此外，用新的内容替换这些元素前，jQuery从子元素删除其他结构，如数据和事件处理程序，这样可以防止内存溢出

<div>
<pre>&lt;div class="demo-container"&gt;
  &lt;div class="demo-box"&gt;Demonstration Box&lt;/div&gt;
&lt;/div&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
//123
$('div.demo-container').html('123');
&lt;/script&gt;</pre>
</div>

【3】html(function(index, oldhtml))&nbsp;

&emsp;&emsp;html(function(index, oldhtml))用来返回设置HTML内容的一个函数。接收元素的索引位置和元素原先的HTML作为参数。jQuery的调用这个函数之前会清空元素，使用oldhtml参数引用先前的内容。在这个函数中，this指向元素集合中的当前元素

<div>
<pre>&lt;div class="demo-container"&gt;123&lt;/div&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
//1230
$('div.demo-container').html(function(index,oldhtml) {
  return oldhtml + index;
});
&lt;/script&gt;</pre>
</div>

**使用范围**

&emsp;&emsp;与innerHTML属性相同，html()方法只能应用于双标签，单标签无效

<div>
<pre>&lt;input id="test" value="123"&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
console.log(test.innerHTML)//''
console.log($('#test').html())//''
&lt;/script&gt;</pre>
</div>

&nbsp;

### text()

&emsp;&emsp;text()方法类似于javascript中的innerText属性，得到匹配元素集合中每个元素的文本内容结合，包括他们的后代，或设置匹配元素集合中每个元素的文本内容为指定的文本内容，具体有3种用法：

【1】text()

&emsp;&emsp;text()方法得到匹配元素集合中每个元素的合并文本，包括他们的后代

<div>
<pre>&lt;p id="test"&gt;This is a &lt;i&gt;simple&lt;/i&gt; document&lt;/p&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
//This is a simple document
console.log($('#test').text());
&lt;/script&gt;</pre>
</div>
<div>
<pre>&lt;div&gt;1&lt;/div&gt;
&lt;div&gt;2&lt;/div&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
//12
console.log($('div').text());
&lt;/script&gt;</pre>
</div>

【2】text(textString)

&emsp;&emsp;text(textString)用来设置匹配元素集合中每个元素的文本内容为指定的文本内容

<div>
<pre>&lt;p id="test"&gt;This is a &lt;i&gt;simple&lt;/i&gt; document&lt;/p&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
$('#test').text('&lt;i&gt;123&lt;/i&gt;');
//'&lt;i&gt;123&lt;/i&gt;'
console.log($('#test').text());
&lt;/script&gt;</pre>
</div>

【3】text(function(index, text))

&emsp;&emsp;text(function(index, text))方法通过使用一个函数来设置文本内容，该函数接收元素的索引位置和文本值作为参数，返回设置的文本内容

<div>
<pre>&lt;p id="test"&gt;This is a &lt;i&gt;simple&lt;/i&gt; document&lt;/p&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
$('#test').text(function(index, text){
    return text + index;
});
//'This is a simple document0'
console.log($('#test').text());
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;该方法常用于数据初始化，使用html()方法也可以实现同样效果

<div>
<pre>&lt;ul&gt;
    &lt;li&gt;&lt;/li&gt;
    &lt;li&gt;&lt;/li&gt;
    &lt;li&gt;&lt;/li&gt;
&lt;/ul&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
$('ul li').text(function(index, text){
    return '内容' + (index+1);
});
//'内容1内容2内容3'
console.log($('li').text());
//'内容1'
console.log($('li').html());
&lt;/script&gt;</pre>
</div>

**使用范围**

&emsp;&emsp;与innerText属性相同，text()方法不能使用在input元素。在IE8-浏览器下，text()方法不能使用在script元素上

&emsp;&emsp;input元素可以使用val()方法获取或设置文本值；script元素可以使用html()方法

<div>
<pre>&lt;input id="test1" value="123"&gt;
&lt;script id="test2"&gt;
var a = 1;
&lt;/script&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
console.log($('#test1').text());//''
//IE8-浏览器返回''，其他浏览器返回'var a = 1;'
console.log($('#test2').text());
console.log($('#test1').val());//'123'
console.log($('#test2').html());//'var a = 1;'
&lt;/script&gt;</pre>
</div>

&nbsp;

### val()

&emsp;&emsp;val()方法类似于javascript中的value属性，主要是用于处理表单元素的值，用于获取匹配的元素集合中第一个元素的当前值或设置匹配的元素集合中每个元素的值

**val()**

&emsp;&emsp;当val()方法没有参数时，表示获取元素的value值

<div>
<pre>&lt;input id="test" value="text"&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
console.log($('#test').val());//'text'
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;注意：通过val()方法从textarea元素中取得的值是不含有回车(\r)字符的。但是如果该值是通过XHR传递给服务器的，回车(\r)字符会被保留(或者是被浏览器添加的，但是在原始数据中并不包含回车(\r))。可以使用下面的valHook方法解决这个问题

<div>
<pre>$.valHooks.textarea = {
  get: function(elem){
    return elem.value.replace(/\r?\n/g,"\r\n");
  }
};</pre>
</div>

&emsp;&emsp;val()方法主要用于获取表单元素的值，比如input，select和textarea。对 &lt;select multiple="multiple"&gt;元素，val()方法返回一个包含每个选择项的数组，如果没有选择性被选中，它返回null

<div>
<pre>&lt;textarea id="test1"&gt;1&lt;/textarea&gt;
&lt;input id="test2" value="2"&gt;
&lt;select id="test3"&gt;
    &lt;option&gt;3&lt;/option&gt;
&lt;/select&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
console.log($('#test1').val());//1
console.log($('#test2').val());//2
console.log($('#test3').val());//3
&lt;/script&gt;</pre>
</div>

**val(value)**

&emsp;&emsp;val(value)用来设置表单元素的value值

<div>
<pre>&lt;input id="test" value="2"&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
btn.onclick = function(){
    var value = $('#test').val();
    $('#test').val('测试'+ value)
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/content/c1.html" frameborder="0" width="320" height="240"></iframe>

**val(function(index, value))**

&emsp;&emsp;val()方法可以接受一个函数作为参数，函数中的this指向当前元素。接收的集合中的元素，旧的值作为参数的索引位置，返回设置的值

<div>
<pre>&lt;input id="test" value="2"&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
btn.onclick = function(){
    $('#test').val(function(index,value){
        return '测试'+index + value;
    })
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/content/c2.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 总结

&emsp;&emsp;html()、text()、val()三种方法都是用来读取选定元素的内容；html()是用来读取元素的html内容，text()用来读取元素的纯文本内容，val()是用来读取表单元素的value值。其中html()和text()方法不能使用在表单元素上，而val()只能使用在表单元素上

&emsp;&emsp;html()和val()方法使用在多个元素上时，只读取第一个元素；而text()方法应用在多个元素上时，将会读取所有选中元素的文本内容

&emsp;&emsp;html(htmlString)、text(textString)和val(value)三种方法都是用来替换选中元素的内容，如果三个方法同时运用在多个元素上时，那么将会替换所有选中元素的内容

&emsp;&emsp;html()、text()、val()都可以使用回调函数的返回值来动态改变多个元素的内容