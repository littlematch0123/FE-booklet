# jQuery节点操作

&emsp;&emsp;DOM节点操作包括[创建节点](http://www.cnblogs.com/xiaohuochai/p/5787459.html#anchor1)、[插入节点](http://www.cnblogs.com/xiaohuochai/p/5787459.html#anchor2)、[移除节点](http://www.cnblogs.com/xiaohuochai/p/5787459.html#anchor3)、[替换节点](http://www.cnblogs.com/xiaohuochai/p/5787459.html#anchor4)和[复制节点](http://www.cnblogs.com/xiaohuochai/p/5787459.html#anchor5)。jQuery也有类似的方法，此外，还扩展了包裹节点。本文将详细介绍jQuery节点操作

&nbsp;

### 创建节点

&emsp;&emsp;创建节点的流程比较简单，包括创建节点、添加属性和添加文本。若应用原生方法，一般地，包括document.createElement()、setAttribute()和innerHTML

<div>
<pre>var ele = document.createElement('div');
ele.innerHTML = '测试内容';
ele.setAttribute('id','test');</pre>
</div>

&emsp;&emsp;在jQuery中，创建元素节点、属性节点和文本节点的过程，只需要一步即可

<div>
<pre>$('&lt;div id="test"&gt;测试内容&lt;/div&gt;')</pre>
</div>

&nbsp;

### 插入节点

&emsp;&emsp;jQuery关于插入节点有多达8个方法

【append()】

&emsp;&emsp;使用append(content[,content])方法在每个匹配元素里面的末尾处插入参数内容，参数可以是DOM元素，DOM元素数组，HTML字符串，或者jQuery对象

&emsp;&emsp;如果插入的节点已经是文档的一部分了，那结果就是将该节点从原来的位置转移到新位置。类似于原生的appendChild()方法

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="box"&gt;Greetings&lt;/div&gt;
&lt;div class="container"&gt;
  &lt;div class="inner"&gt;Hello&lt;/div&gt;
  &lt;div class="inner"&gt;Goodbye&lt;/div&gt;
&lt;/div&gt;
&lt;button id="btn"&gt;增加内容&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('#box').append('&lt;span id="test"&gt;测试内容&lt;/span&gt;');    
    $('.inner').append($('#box'));
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/jquery/nodeset/n1.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;append()方法可以接受多个参数

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="box"&gt;&lt;/div&gt;
&lt;button id="btn"&gt;增加内容&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    var $ele1 = $('&lt;i&gt;1&lt;/i&gt;');
    var $ele2 = $('&lt;i&gt;2&lt;/i&gt;');
    $('#box').append($ele1,$ele2);    
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/nodeset/n2.html" frameborder="0" width="320" height="240"></iframe>

**append(function(index,html))**

&emsp;&emsp;append()方法可接受一个函数作为参数。该函数的index参数表示元素在匹配集合中的索引位置，html参数表示元素上原来的HTML内容。this指向元素集合中的当前元素，返回HTML字符串，DOM元素或jQuery对象　

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="box"&gt;123&lt;/div&gt;
&lt;button id="btn"&gt;增加内容&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('#box').append(function(index,html){
        return '&lt;i&gt;' + (index+1+html/1) + '&lt;/i&gt;';
    });    
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/nodeset/n3.html" frameborder="0" width="320" height="240"></iframe>

【appendTo(target)】

&emsp;&emsp;appendTo()方法的参数可以是一个选择符，元素，HTML字符串，DOM元素数组，或者jQuery对象

&emsp;&emsp;appendTo()方法与append()方法正好相反，append()方法前面是要选择的对象，参数是要在对象内插入的元素内容；而appendTo()方法前面是要插入的元素内容，而参数是要选择的对象

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="box"&gt;&lt;/div&gt;
&lt;button id="btn"&gt;增加内容&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    var $ele1 = $('&lt;i&gt;1&lt;/i&gt;');
    $ele1.appendTo($('#box'))
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/nodeset/n4.html" frameborder="0" width="320" height="240"></iframe>

【insertBefore()】

&emsp;&emsp;javascript存在原生的insertBefore()方法。jQuery也存在insertBefore()方法，但用法不同

**insertBefore(target)**

&emsp;&emsp;insertBefore(target)方法接受一个选择器，元素，HTML字符串或者jQuery对象作为参数，匹配的元素将会被插入在由参数指定的目标前面

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div class="inner"&gt;Hello&lt;/div&gt;
&lt;div class="inner"&gt;Goodbye&lt;/div&gt;
&lt;button id="btn"&gt;增加内容&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('&lt;i&gt;Test&lt;/i&gt;').insertBefore('.inner')
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/jquery/nodeset/n5.html" frameborder="0" width="320" height="240"></iframe>

【insertAfter(target)】

&emsp;&emsp;insertAfter(target)方法与insertBefore()方法相反，该方法接受一个选择器，元素，HTML字符串或者jQuery对象作为参数，匹配的元素将会被插入在由参数指定的目标后面

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div class="inner"&gt;Hello&lt;/div&gt;
&lt;div class="inner"&gt;Goodbye&lt;/div&gt;
&lt;button id="btn"&gt;增加内容&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('&lt;i&gt;Test&lt;/i&gt;').insertAfter('.inner')
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/jquery/nodeset/n6.html" frameborder="0" width="320" height="240"></iframe>

【before(content[,content])】

&emsp;&emsp;before()和insertBefore()实现同样的功能。主要的不同是语法&mdash;&mdash;内容和目标的位置不同。对于before(), 选择器表达式在方法的前面，参数是将要插入的内容。对于insertBefore()刚好相反，内容在方法前面，选择器表达式作为参数&emsp;&emsp;

&emsp;&emsp;before(content[,content])方法可以接受一个或多个DOM元素，元素数组，HTML字符串，或jQuery对象作为参数，插在集合中每个匹配元素前面

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div class="inner"&gt;Hello&lt;/div&gt;
&lt;div class="inner"&gt;Goodbye&lt;/div&gt;
&lt;button id="btn"&gt;增加内容&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('.inner').before('&lt;i&gt;Test&lt;/i&gt;')
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/jquery/nodeset/n7.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;类似地，before()方法也支持多个参数

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div class="inner"&gt;Hello&lt;/div&gt;
&lt;div class="inner"&gt;Goodbye&lt;/div&gt;
&lt;button id="btn"&gt;增加内容&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    var $ele1 = $('&lt;i&gt;1&lt;/i&gt;');
    var $ele2 = $('&lt;i&gt;2&lt;/i&gt;');    
    $('.inner').before($ele1,$ele2);
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/jquery/nodeset/n8.html" frameborder="0" width="320" height="240"></iframe>

**before(function(index,html))**

&emsp;&emsp;before()方法可以接受一个函数作为参数。该函数的index参数表示元素在匹配集合中的索引位置，html参数表示元素上原来的HTML内容。函数中this指向元素集合中的当前元素，返回HTML字符串，DOM元素或jQuery对象

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;divid="box"&gt;123&lt;/div&gt;
&lt;button id="btn"&gt;增加内容&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('#box').before(function(index,html){
        return index+1+html/1;
    });    
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 90px;" src="https://demo.xiaohuochai.site/jquery/nodeset/n9.html" frameborder="0" width="320" height="240"></iframe>

【after()】

&emsp;&emsp;after()和insertAfter()实现同样的功能。主要的不同是语法&mdash;&mdash;特别是内容和目标的位置。 对于after()，选择表达式在函数的前面，参数是将要插入的内容；对于insertAfter()，刚好相反，内容在方法前面，它将被放在参数里元素的后面

**after(content[,content])**

&emsp;&emsp;after(content[,content])方法可以接受一个或多个DOM元素，元素数组，HTML字符串，或jQuery对象作为参数，插在集合中每个匹配元素后面

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div class="inner"&gt;Hello&lt;/div&gt;
&lt;div class="inner"&gt;Goodbye&lt;/div&gt;
&lt;button id="btn"&gt;增加内容&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('.inner').after('&lt;i&gt;Test&lt;/i&gt;')
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/jquery/nodeset/n10.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;类似地，after()方法也支持多个参数

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div class="inner"&gt;Hello&lt;/div&gt;
&lt;div class="inner"&gt;Goodbye&lt;/div&gt;
&lt;button id="btn"&gt;增加内容&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    var $ele1 = $('&lt;i&gt;1&lt;/i&gt;');
    var $ele2 = $('&lt;i&gt;2&lt;/i&gt;');    
    $('.inner').after($ele1,$ele2);
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/jquery/nodeset/n11.html" frameborder="0" width="320" height="240"></iframe>

**after(function(index,html))**

&emsp;&emsp;after()方法可以接受一个函数作为参数。该函数的index参数表示元素在匹配集合中的索引位置，html参数表示元素上原来的HTML内容。函数中this指向元素集合中的当前元素，返回HTML字符串，DOM元素或jQuery对象

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;divid="box"&gt;123&lt;/div&gt;
&lt;button id="btn"&gt;增加内容&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('#box').after(function(index,html){
        return index+1+html/1;
    });    
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/nodeset/n12.html" frameborder="0" width="320" height="240"></iframe>

【prepend()】

&emsp;&emsp;与append()方法相反，prepend()方法将参数内容插入到匹配元素内部的最前面，作为第一个子元素

**prepend(content[,content])**

&emsp;&emsp;prepend()方法接收一个或多个DOM元素，元素数组，HTML字符串，或者jQuery对象作为参数，然后插入到匹配元素前的内容

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div class="inner"&gt;Hello&lt;/div&gt;
&lt;div class="inner"&gt;Goodbye&lt;/div&gt;
&lt;button id="btn"&gt;增加内容&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('.inner').prepend('&lt;i&gt;123&lt;/i&gt;')
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 90px;" src="https://demo.xiaohuochai.site/jquery/nodeset/n13.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;类似地，prepend()方法也支持多个参数

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div class="inner"&gt;Hello&lt;/div&gt;
&lt;div class="inner"&gt;Goodbye&lt;/div&gt;
&lt;button id="btn"&gt;增加内容&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    var $ele1 = $('&lt;i&gt;1&lt;/i&gt;');
    var $ele2 = $('&lt;i&gt;2&lt;/i&gt;');
    $('.inner').prepend($ele1,$ele2);
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 90px;" src="https://demo.xiaohuochai.site/jquery/nodeset/n14.html" frameborder="0" width="320" height="240"></iframe>

**prepend(function(index,html))**

&emsp;&emsp;prepend()方法可以接受一个函数作为参数。该函数的index参数表示元素在匹配集合中的索引位置，html参数表示元素上原来的HTML内容。函数中this指向元素集合中的当前元素，返回HTML字符串，DOM元素或jQuery对象&emsp;&emsp;

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="box"&gt;123&lt;/div&gt;
&lt;button id="btn"&gt;增加内容&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('#box').prepend(function(index,html){
        return index+1+html/1;
    });    
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/nodeset/n15.html" frameborder="0" width="320" height="240"></iframe>

【prependTo()】

&emsp;&emsp;prepend()和prependTo()实现同样的功能，主要的不同是语法，插入的内容和目标的位置不同。 对于prepend()而言，选择器表达式写在方法的前面，作为待插入内容的容器，将要被插入的内容作为方法的参数。而prependTo()正好相反，将要被插入的内容写在方法的前面，可以是选择器表达式或动态创建的标记，待插入内容的容器作为参数

**prependTo(target)**

&emsp;&emsp;prependTo()方法的参数是一个选择器, DOM元素，元素数组，HTML字符串，或者jQuery对象，插入到匹配元素前的内容

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div class="inner"&gt;Hello&lt;/div&gt;
&lt;div class="inner"&gt;Goodbye&lt;/div&gt;
&lt;button id="btn"&gt;增加内容&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('&lt;i&gt;123&lt;/i&gt;').prependTo('.inner')
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 90px;" src="https://demo.xiaohuochai.site/jquery/nodeset/n16.html" frameborder="0" width="320" height="240"></iframe>

### 删除节点

&emsp;&emsp;如果文档中某一个元素多余，那么应将其删除。jQuery提供了三种删除节点的方法，包括detach()、empty()、remove()

【detach()】

&emsp;&emsp;如果我们希望临时删除页面上的节点，但是又不希望节点上的数据与事件丢失，并且能在下一个时间段让这个删除的节点显示到页面，这时候就可以使用detach()方法来处理。detach()方法所绑定的事件、附加的数据等都会保留下来

**detach()**

&emsp;&emsp;当detach()方法没有参数时，将直接删除节点元素。该方法返回被删除的元素

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div class="inner"&gt;Hello&lt;/div&gt;
&lt;div class="inner"&gt;Goodbye&lt;/div&gt;
&lt;button id="btn1"&gt;删除元素&lt;/button&gt;
&lt;button id="btn2"&gt;恢复元素&lt;/button&gt;
&lt;script&gt;
var $div;
$('.inner').click(function(){
    alert(1);
})
$('#btn1').click(function(){
    $div = $('.inner').detach();
})
$('#btn2').click(function(){
    $div.prependTo('body');
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 90px;" src="https://demo.xiaohuochai.site/jquery/nodeset/n17.html" frameborder="0" width="320" height="240"></iframe>

**detach([selector])**

&emsp;&emsp;detach()方法可以接受一个选择表达式作为参数，将需要移除的元素从匹配的元素中过滤出来

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div class="inner"&gt;Hello&lt;/div&gt;
&lt;p class="inner"&gt;Goodbye&lt;/p&gt;
&lt;button id="btn1"&gt;删除元素&lt;/button&gt;
&lt;button id="btn2"&gt;恢复元素&lt;/button&gt;
&lt;script&gt;
var $div;
$('.inner').click(function(){
    alert(1);
})
$('#btn1').click(function(){
    $div = $('.inner').detach('div');
})
$('#btn2').click(function(){
    $div.prependTo('body');
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/jquery/nodeset/n18.html" frameborder="0" width="320" height="240"></iframe>

【empty()】

&emsp;&emsp;empty()方法不接受任何参数。严格来讲，empty()方法并不是删除节点，而是清空节点，它能清空元素中的所有后代节点，但并不删除自身节点。为了避免内存泄漏，jQuery先移除子元素的数据和事件处理函数，然后移除子元素

<div>
<pre>&lt;style&gt;
.inner{height: 30px;width: 100px;background-color: lightblue;}
&lt;/style&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div class="inner"&gt;Hello&lt;/div&gt;
&lt;div class="inner"&gt;Goodbye&lt;/div&gt;
&lt;button id="btn"&gt;清空元素&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('.inner').empty();
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/jquery/nodeset/n19.html" frameborder="0" width="320" height="240"></iframe>

【remove()】

&emsp;&emsp;remove()方法会将元素自身移除，同时也移除元素内部的一切，包括绑定事件及与该元素相关的jQuery数据

&emsp;&emsp;当remove()方法没有参数时，将直接删除节点元素，并返回被删除的元素

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div class="inner"&gt;Hello&lt;/div&gt;
&lt;div class="inner"&gt;Goodbye&lt;/div&gt;
&lt;button id="btn1"&gt;删除元素&lt;/button&gt;
&lt;button id="btn2"&gt;恢复元素&lt;/button&gt;
&lt;script&gt;
var $div;
$('.inner').click(function(){
    alert(1);
})
$('#btn1').click(function(){
    $div = $('.inner').remove();
})
$('#btn2').click(function(){
    $div.prependTo('body');
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 90px;" src="https://demo.xiaohuochai.site/jquery/nodeset/n20.html" frameborder="0" width="320" height="240"></iframe>

**remove([selector])**

&emsp;&emsp;remove()方法可以接受一个选择表达式作为参数，将需要移除的元素从匹配的元素中过滤出来

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div class="inner"&gt;Hello&lt;/div&gt;
&lt;p class="inner"&gt;Goodbye&lt;/p&gt;
&lt;button id="btn1"&gt;删除元素&lt;/button&gt;
&lt;button id="btn2"&gt;恢复元素&lt;/button&gt;
&lt;script&gt;
var $div;
$('.inner').click(function(){
    alert(1);
})
$('#btn1').click(function(){
    $div = $('.inner').remove('div');
})
$('#btn2').click(function(){
    $div.prependTo('body');
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/jquery/nodeset/n21.html" frameborder="0" width="320" height="240"></iframe>

### 复制节点

**clone()**

&emsp;&emsp;clone()方法深度复制所有匹配的元素集合，包括所有匹配元素、匹配元素的下级元素、文字节点

&emsp;&emsp;出于性能方面的考虑，表单元素动态的状态(例如，用户将数据输入到input和textarea，或者用户在select中已经选中某一项)不会被复制到克隆元素。克隆操作将设置这些字段为HTML中指定的默认值

&emsp;&emsp;当clone()方法没有参数(相当于参数为false)，表示不会复制元素上的事件处理函数

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div class="test"&gt;&lt;i&gt;测试&lt;/i&gt;&lt;/div&gt;
&lt;button id="btn"&gt;复制节点&lt;/button&gt;
&lt;script&gt;
$('.test').click(function(){
    alert(1);
})
$('#btn').click(function(){
    $('.test').clone().appendTo('body')
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 90px;" src="https://demo.xiaohuochai.site/jquery/nodeset/n22.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;当clone()方法参数为true时，会复制元素上的事件处理函数

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div class="test"&gt;&lt;i&gt;测试&lt;/i&gt;&lt;/div&gt;
&lt;button id="btn"&gt;复制节点&lt;/button&gt;
&lt;script&gt;
$('.test').click(function(){
    alert(1);
})
$('#btn').click(function(){
    $('.test').clone(true).appendTo('body')
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 90px;" src="https://demo.xiaohuochai.site/jquery/nodeset/n23.html" frameborder="0" width="320" height="240"></iframe>

### 替换节点

&emsp;&emsp;如果要替换某个节点，jQuery提供了相应的方法，即replaceWith()和replaceAll()

【replaceWith()】

&emsp;&emsp;replaceWith()方法用提供的内容替换集合中所有匹配的元素并且返回被删除元素的集合

**replaceWith(newContent)**

&emsp;&emsp;replaceWith(newContent)方法可以接受一个HTML字符串，DOM元素，或者jQuery对象作为参数

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div class="container"&gt;
  &lt;div class="inner first"&gt;Hello&lt;/div&gt;
  &lt;div class="inner second"&gt;And&lt;/div&gt;
  &lt;div class="inner third"&gt;Goodbye&lt;/div&gt;
&lt;/div&gt;
&lt;button id='btn'&gt;替换内容&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    alert($('.inner').replaceWith('&lt;div&gt;div&lt;/div&gt;').html())
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/jquery/nodeset/n24.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;当一个元素是被替换的内容时，替换的元素从老地方移到新位置，而不是复制

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div class="container"&gt;
  &lt;div class="inner first"&gt;Hello&lt;/div&gt;
  &lt;div class="inner second"&gt;And&lt;/div&gt;
  &lt;div class="inner third"&gt;Goodbye&lt;/div&gt;
&lt;/div&gt;
&lt;button id='btn'&gt;替换内容&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    alert($('.third').replaceWith($('.first')).html())
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/jquery/nodeset/n25.html" frameborder="0" width="320" height="240"></iframe>

**replaceWith(function(index,content))**

&emsp;&emsp;replaceWith()方法可以接受一个函数作为参数。该函数的index参数表示元素在匹配集合中的索引位置，content参数表示元素上原来的HTML内容。函数中this指向元素集合中的当前元素，返回HTML字符串，DOM元素或jQuery对象

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div class="container"&gt;
  &lt;div class="inner first"&gt;Hello&lt;/div&gt;
  &lt;div class="inner second"&gt;And&lt;/div&gt;
  &lt;div class="inner third"&gt;Goodbye&lt;/div&gt;
&lt;/div&gt;
&lt;button id='btn'&gt;替换内容&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('.inner').replaceWith(function(index,content){
        return '&lt;div&gt;' + index + content + '&lt;/div&gt;';
    })
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/jquery/nodeset/n26.html" frameborder="0" width="320" height="240"></iframe>

【replaceAll(target)】

&emsp;&emsp;replaceAll()方法与replaceWith()功能一样，但是目标和源相反

&emsp;&emsp;replaceAll()方法接受一个选择器字符串，jQuery对象，DOM元素，或者元素数组为参数，用集合的匹配元素替换每个目标元素

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div class="container"&gt;
  &lt;div class="inner first"&gt;Hello&lt;/div&gt;
  &lt;div class="inner second"&gt;And&lt;/div&gt;
  &lt;div class="inner third"&gt;Goodbye&lt;/div&gt;
&lt;/div&gt;
&lt;button id='btn'&gt;替换内容&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    alert($('&lt;div&gt;div&lt;/div&gt;').replaceAll('.inner').html())
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/jquery/nodeset/n27.html" frameborder="0" width="320" height="240"></iframe>

### 包裹节点

&emsp;&emsp;如果要将某个节点用其他标记包裹起来，jQuery提供了相应的方法，包括wrap()、unwrap()、wrapAll()、wrapInner()

【wrap()】

&emsp;&emsp;wrap()方法可以在每个匹配的元素外层包上一个html元素。它有以下两种使用方法

**wrap(wrappingElement)**　

&emsp;&emsp;wrap()方法中的参数可以是一个HTML片段，选择表达式，jQuery对象，或者DOM元素，用来包在匹配元素的外层

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;i&gt;123&lt;/i&gt;
&lt;button id="btn"&gt;包裹元素&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
$('i').wrap('&lt;div style="height:20px;background:lightblue;"&gt;&lt;/div&gt;')        
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/nodeset/n28.html" frameborder="0" width="320" height="240"></iframe>

**wrap(function(index))**

&emsp;&emsp;wrap()方法的参数可以是一个函数，返回用于包裹匹配元素的HTML内容或jQuery对象。index参数表示匹配元素在集合中的集合。该函数内的this指向集合中的当前元素

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;i&gt;123&lt;/i&gt;
&lt;button id="btn"&gt;包裹元素&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('i').wrap(function(index){
        return '&lt;div style="height:20px;background:lightblue;"&gt;' +  index+ '&lt;/div&gt;'
    })        
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/nodeset/n29.html" frameborder="0" width="320" height="240"></iframe>

【unwrap()】

&emsp;&emsp;unwrap()方法不接受任何参数，与wrap()方法的功能相反，unwrap()方法将匹配元素集合的父级元素删除，保留自身(和兄弟元素，如果存在)在原来的位置

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div style="height:20px;background:lightblue"&gt;&lt;i&gt;123&lt;/i&gt;&lt;/div&gt;
&lt;button id="btn"&gt;删除父元素&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('i').unwrap();
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/nodeset/n30.html" frameborder="0" width="320" height="240"></iframe>

【wrapAll()】

&emsp;&emsp;与wrap()方法不同，wrapAll()方法在所有匹配元素外面包一层HTML结构。参数可以是用来包在外面的HTML片段，选择表达式，jQuery对象或者DOM元素

&emsp;&emsp;注意：如果被包裹的多个元素有其他元素，其他元素会被放到包裹元素之后

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;i&gt;1&lt;/i&gt;&lt;i&gt;2&lt;/i&gt;&lt;b&gt;3&lt;/b&gt;&lt;i&gt;4&lt;/i&gt;&lt;i&gt;5&lt;/i&gt;
&lt;button id="btn"&gt;包裹元素&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('i').wrapAll('&lt;div&gt;&lt;/div&gt;');
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/nodeset/n31.html" frameborder="0" width="320" height="240"></iframe>

【wrapInner()】

&emsp;&emsp;wrapInner()可以在匹配元素里的内容外包一层结构。它有以下两种使用方法

**wrapInner(wrappingElement)**

&emsp;&emsp;wrapInner()方法中的参数可以是用来包在匹配元素的内容外面的HTML片段，选择表达式，jQuery对象或者DOM元素

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div&gt;123&lt;/div&gt;
&lt;button id="btn"&gt;包裹元素&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('div').wrapInner('&lt;i&gt;&lt;/i&gt;');
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/nodeset/n32.html" frameborder="0" width="320" height="240"></iframe>

**wrapInner(function(index))**

&emsp;&emsp;wrapInner()方法的参数可以是一个返回HTML结构的函数，用来包在匹配元素内容的外面。接收集合中元素的索引位置作为参数。在函数中，this指向集合中当前的元素

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div&gt;123&lt;/div&gt;
&lt;button id="btn"&gt;包裹元素&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('div').wrapInner(function(index){
        return '&lt;i&gt;' + index +'&lt;/i&gt;'
    });
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/nodeset/n33.html" frameborder="0" width="320" height="240"></iframe>