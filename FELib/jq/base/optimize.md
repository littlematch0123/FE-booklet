# jQuery代码优化的9种方法

&emsp;&emsp;本文将详细介绍jQuery代码优化的9种方法

&nbsp;

### 用对选择器

&emsp;&emsp;在jQuery中，可以用多种选择器，选择同一个网页元素。每种选择器的性能是不一样的，应该了解它们的性能差异

&emsp;&emsp;1、最快的选择器：id选择器和元素标签选择器

&emsp;&emsp;举例来说，下面的语句性能最佳：

<div>
<pre>$('#id')
$('form')
$('input')</pre>
</div>

&emsp;&emsp;遇到这些选择器的时候，jQuery内部会自动调用浏览器的原生方法（比如getElementById()），所以它们的执行速度快。

&emsp;&emsp;2、较慢的选择器：class选择器

&emsp;&emsp;$('.className')的性能，取决于不同的浏览器。Firefox、Safari、Chrome、Opera浏览器，都有原生方法getElementByClassName()，所以速度并不慢。但是，IE5-IE8都没有部署这个方法，所以这个选择器在IE中会相当慢

&emsp;&emsp;3、最慢的选择器：伪类选择器和属性选择器

&emsp;&emsp;找出网页中所有的隐藏元素，就要用到伪类选择器：

<div>
<pre>$(':hidden')</pre>
</div>

&emsp;&emsp;属性选择器的例子则是：

<div>
<pre>$('[attribute=value]')</pre>
</div>

&emsp;&emsp;这两种语句是最慢的，因为浏览器没有针对它们的原生方法。但是，一些浏览器的新版本，增加了querySelector()和querySelectorAll()方法，因此会使这类选择器的性能有大幅提高

&nbsp;

### 理解父子关系

&emsp;&emsp;下面六个选择器，都是从父元素中选择子元素

<div>
<pre>$('.child', $parent)
$parent.find('.child')
$parent.children('.child')
$('#parent &gt; .child')
$('#parent .child')
$('.child', $('#parent'))</pre>
</div>

&emsp;&emsp;1、下面这条语句的意思是，给定一个DOM对象，然后从中选择一个子元素。jQuery会自动把这条语句转成$.parent.find('child')，这会导致一定的性能损失。它比最快的形式慢了5%-10%

<div>
<pre>$('.child', $parent)</pre>
</div>

&emsp;&emsp;2、这条是最快的语句。.find()方法会调用浏览器的原生方法（getElementById，getElementByName，getElementByTagName等等），所以速度较快

<div>
<pre>$parent.find('.child')</pre>
</div>

&emsp;&emsp;3、这条语句在jQuery内部，会使用$.sibling()和javascript的nextSibling()方法，一个个遍历节点。它比最快的形式大约慢50%

<div>
<pre>$parent.children('.child')</pre>
</div>

&emsp;&emsp;4、jQuery内部使用Sizzle引擎，处理各种选择器。Sizzle引擎的选择顺序是从右到左，所以这条语句是先选.child，然后再一个个过滤出父元素#parent，这导致它比最快的形式大约慢70%

<div>
<pre>$('#parent &gt; .child')</pre>
</div>

&emsp;&emsp;5、这条语句与上一条是同样的情况。但是，上一条只选择直接的子元素，这一条可以选择多级子元素，所以它的速度更慢，大概比最快的形式慢了77%

<div>
<pre>$('#parent .child')</pre>
</div>

&emsp;&emsp;6、jQuery内部会将这条语句转成$('#parent').find('.child')，比最快的形式慢了23%

<div>
<pre>$('.child', $('#parent'))</pre>
</div>

&emsp;&emsp;所以，最佳选择是$parent.find('.child')。而且，由于$parent往往在前面的操作已经生成，jQuery会进行缓存，所以进一步加快了执行速度

&nbsp;

### 不过度使用jQuery

&emsp;&emsp;jQuery速度再快，也无法与原生的javascript方法相比。所以有原生方法可以使用的场合，尽量避免使用jQuery。

&emsp;&emsp;以最简单的选择器为例，document.getElementById("foo")要比$("#foo")快10多倍

&emsp;&emsp;再来看一个例子，为a元素绑定一个处理点击事件的函数：

<div>
<pre>$('a').click(function(){
  alert($(this).attr('id'));
});</pre>
</div>

&emsp;&emsp;这段代码的意思是，点击a元素后，弹出该元素的id属性。为了获取这个属性，必须连续两次调用jQuery，第一次是$(this)，第二次是attr('id')。

&emsp;&emsp;事实上，这种处理完全不必要。更正确的写法是，直接采用javascript原生方法，调用`this.id`：

<div>
<pre>$('a').click(function(){
  alert(this.id);
});</pre>
</div>

&emsp;&emsp;根据测试，this.id的速度比$(this).attr('id')快了20多倍

&nbsp;

### 做好缓存

&emsp;&emsp;选中某一个网页元素，是开销很大的步骤。所以，使用选择器的次数应该越少越好，并且尽可能缓存选中的结果，便于以后反复使用。

&emsp;&emsp;比如，下面这样的写法就是糟糕的写法：

<div>
<pre>jQuery('#top').find('p.classA');
jQuery('#top').find('p.classB');</pre>
</div>

&emsp;&emsp;更好的写法是：

<div>
<pre>var cached = jQuery('#top');
cached.find('p.classA');
cached.find('p.classB');</pre>
</div>

&emsp;&emsp;根据测试，缓存比不缓存，快了2-3倍

&emsp;&emsp;jQuery的一大特点，就是允许使用链式写法

<div>
<pre>$('div').find('h3').eq(2).html('Hello');</pre>
</div>

&emsp;&emsp;采用链式写法时，jQuery自动缓存每一步的结果，因此比非链式写法要快。根据测试，链式写法比（不使用缓存的）非链式写法，大约快了25%

&nbsp;

### 事件委托

&emsp;&emsp;javascript的事件模型，采用"冒泡"模式，也就是说，子元素的事件会逐级向上"冒泡"，成为父元素的事件。

&emsp;&emsp;利用这一点，可以大大简化事件的绑定。比如，有一个表格（table元素），里面有100个格子（td元素），现在要求在每个格子上面绑定一个点击事件（click），请问是否需要将下面的命令执行100次？

<div>
<pre>$("td").on("click", function(){
  $(this).toggleClass("click");
});</pre>
</div>

&emsp;&emsp;回答是不需要，我们只要把这个事件绑定在table元素上面就可以了，因为td元素发生点击事件之后，这个事件会"冒泡"到父元素table上面，从而被监听到

&emsp;&emsp;因此，这个事件只需要在父元素绑定1次即可，而不需要在子元素上绑定100次，从而大大提高性能。这就叫事件的"委托处理"，也就是子元素"委托"父元素处理这个事件

<div>
<pre>$("table").on("click", "td", function(){
$(this).toggleClass("click");
});</pre>
</div>

&emsp;&emsp;更好的写法，则是把事件绑定在document对象上面

<div>
<pre>$(document).on("click", "td", function(){
$(this).toggleClass("click");
});</pre>
</div>

&emsp;&emsp;如果要取消事件的绑定，就使用off()方法

<div>
<pre>$(document).off("click", "td");</pre>
</div>

&nbsp;

### 少改动DOM

&emsp;&emsp;1、改动DOM结构开销很大，因此不要频繁使用.append()、.insertBefore()和.insetAfter()这样的方法

&emsp;&emsp;如果要插入多个元素，就先把它们合并，然后再一次性插入。根据测试，合并插入比不合并插入，快了将近10倍

&emsp;&emsp;2、如果要对一个DOM元素进行大量处理，应该先用.detach()方法，把这个元素从DOM中取出来，处理完毕以后，再重新插回文档。根据测试，使用.detach()方法比不使用时，快了60%

&emsp;&emsp;3、如果要在DOM元素上储存数据，不要写成下面这样：

<div>
<pre>var elem = $('#elem');
elem.data(key,value);</pre>
</div>

&emsp;&emsp;而要写成

<div>
<pre>var elem = $('#elem');
$.data(elem[0],key,value);</pre>
</div>

&emsp;&emsp;根据测试，后一种写法要比前一种写法，快了将近10倍。因为elem.data()方法是定义在jQuery函数的prototype对象上面的，而$.data()方法是定义jQuery函数上面的，调用的时候不从复杂的jQuery对象上调用，所以速度快得多

&emsp;&emsp;4、插入html代码的时候，浏览器原生的innterHTML()方法比jQuery对象的html()更快

&nbsp;

### 尽量少生成jQuery对象

&emsp;&emsp;每当使用一次选择器（比如$('#id')），就会生成一个jQuery对象。jQuery对象是一个很庞大的对象，带有很多属性和方法，会占用不少资源。所以，尽量少生成jQuery对象

&emsp;&emsp;举例来说，许多jQuery方法都有两个版本，一个是供jQuery对象使用的版本，另一个是供jQuery函数使用的版本。下面两个例子，都是取出一个元素的文本，使用的都是text()方法

&emsp;&emsp;既可以使用针对jQuery对象的版本：

<div>
<pre>var $text = $("#text");
var $ts = $text.text();</pre>
</div>

&emsp;&emsp;也可以使用针对jQuery函数的版本：

<div>
<pre>var $text = $("#text");
var $ts = $.text($text);</pre>
</div>

&emsp;&emsp;由于后一种针对jQuery函数的版本不通过jQuery对象操作，所以相对开销较小，速度比较快

&nbsp;

### 选择作用域链最短的方法

&emsp;&emsp;严格地说，这一条原则对所有Javascript编程都适用，而不仅仅针对jQuery

&emsp;&emsp;我们知道，Javascript的变量采用链式作用域。读取变量的时候，先在当前作用域寻找该变量，如果找不到，就前往上一层的作用域寻找该变量。这样的设计，使得读取局部变量比读取全局变量快得多

&emsp;&emsp;请看下面两段代码，第一段代码是读取全局变量：

<div>
<pre>var a = 0;
function x(){
a += 1;
}</pre>
</div>

&emsp;&emsp;第二段代码是读取局部变量：

<div>
<pre>function y(){
var a = 0;
a += 1;
}</pre>
</div>

&emsp;&emsp;第二段代码读取变量a的时候，不用前往上一层作用域，所以要比第一段代码快五六倍

&emsp;&emsp;同理，在调用对象方法的时候，closure模式要比prototype模式更快

&emsp;&emsp;prototype模式：

<div>
<pre>var X = function(name){ this.name = name; }
X.prototype.get_name = function() { return this.name; };</pre>
</div>

&emsp;&emsp;closure模式：

<div>
<pre>var Y = function(name) {
var y = { name: name };
return { 'get_name': function() { return y.name; } };
};</pre>
</div>

&emsp;&emsp;同样是get_name()方法，closure模式更快

&nbsp;

### 使用Pub/Sub模式管理事件

&emsp;&emsp;当发生某个事件后，如果要连续执行多个操作，最好不要写成下面这样：

<div>
<pre>function doSomthing{
doSomethingElse();
doOneMoreThing();
}</pre>
</div>

&emsp;&emsp;而要改用事件触发的形式：

<div>
<pre>function doSomething{
$.trigger("DO_SOMETHING_DONE");
}
$(document).on("DO_SOMETHING_DONE", function(){
doSomethingElse(); 
   });</pre>
</div>

&emsp;&emsp;还可以考虑使用deferred对象

<div>
<pre>function doSomething(){
var dfd = new $.Deferred();
//Do something async, then... 
//dfd.resolve();
return dfd.promise();
}
function doSomethingElse(){
$.when(doSomething()).then(//The next thing);
}</pre>
</div>

&nbsp;