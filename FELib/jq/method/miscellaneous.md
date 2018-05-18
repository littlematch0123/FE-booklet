# jQuery杂项方法

&emsp;&emsp;杂项方法其实也是工具类方法，但由于其不是定义在jQuery构造函数上的方法，所以不能称为工具方法。本文将详细介绍jQuery中的杂项方法

&nbsp;

### 数据操作

【data()】

&emsp;&emsp;该方法用于在匹配元素上存储任意相关数据或返回匹配的元素集合中的第一个元素的给定名称的数据存储的值

<div>
<pre>data( key, value )
data( obj )
data( key )
data()</pre>
</div>
<div>
<pre>$("body").data("foo", 52);
$("body").data("bar", { myType: "test", count: 40 });
$("body").data({ baz: [ 1, 2, 3 ] });
console.log($("body").data("foo"));//52
console.log($("body").data());//{foo: 52, bar: Object, baz: Array(3)}</pre>
</div>

&emsp;&emsp;如果使用原生javascript，相当于

<div>
<pre>document.body.foo = 52;
console.log(document.body.foo);//52</pre>
</div>

【removeData()】

&emsp;&emsp;removeData()方法允许移除用.data()绑定的值。当带name参数调用的时候，.removeData()将删除那个特有的值，当不带任何参数的时候，所有的值将被移除。从jQuery的内部.data() 缓存不影响任何在文档中的HTML5的data-属性，使用.removeAttr()可以移除这些属性

&emsp;&emsp;当使用.removeData("name")时，如果没有这个属性名字是在内部数据缓存，jQuery将试图在元素上找到一个 data-的属性。为了避免重复查询 data- 属性，将这个名称设置为无论是null 或 undefined的值(例如 .data("name", undefined))，而不是使用.removeData()

<div>
<pre>removeData( [name] ) // [name]:String 要移除的存储数据名
removeData( [list] ) // [list]:Array,String 一个数组或空间分隔的字符串命名要删除的数据块</pre>
</div>
<div>
<pre>$('body').data("test1", "VALUE-1")
         .data("test2", "VALUE-2");
console.log($('body').data());//{test1: "VALUE-1", test2: "VALUE-2"}
$('body').removeData("test1");
console.log($('body').data());//{test1: "VALUE-1", test2: "VALUE-2"}</pre>
</div>

&emsp;&emsp;如果使用原生javascript，相当于

<div>
<pre>document.body.foo = 52;
console.log(document.body.foo);//52
delete document.body.foo;
console.log(document.body.foo);</pre>
</div>

&nbsp;

### 队列操作

【queue()】

&emsp;&emsp;显示或操作匹配的元素上已经执行的函数队列

<div>
<pre>queue( [queueName ] ) //queueName : String 一个含有队列名的字符串。默认是 fx，标准的动画队列
queue( [queueName ], newQueue ) //newQueue:Array 一个替换当前列队内容的函数数组
queue( [queueName ], callback( next ) )//callback( next ):Function() 将要添加到队列中的新函数。当该函数被调用时，会从弹出队列中的下一个元素</pre>
</div>
<div>
<pre>var div = $("div");
div.show("slow");
div.animate({left:'+=200'},2000);
var n = div.queue('fx');
console.log(n.length);//2</pre>
</div>

【clearQueue()】

&emsp;&emsp;从列队中移除所有未执行的项

<div>
<pre>clearQueue( [queueName ] )</pre>
</div>

&nbsp;

### 集合操作

【each()】

&emsp;&emsp;遍历一个jQuery对象，为每个匹配元素执行一个函数

<div>
<pre>each( function(index, function(index, Element)) )</pre>
</div>
<div>
<pre>$( "li" ).each(function( index ) {
  console.log( index + ": "" + $(this).text() );
});</pre>
</div>

【add()】

&emsp;&emsp;add()方法添加元素到匹配的元素集合。add()方法的参数可以几乎接受任何的$()，包括一个jQuery选择器表达式，DOM元素，或HTML片段引用

<div>
<pre>add( selector )
add( elements )
add( html )
add( jQuery object )
add( selector, context )</pre>
</div>
<div>
<pre>$('li').add('p')
$('li').add('&lt;p id="new"&gt;new paragraph&lt;/p&gt;')</pre>
</div>
<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;ul&gt;
  &lt;li&gt;list item 1&lt;/li&gt;
  &lt;li&gt;list item 2&lt;/li&gt;
  &lt;li&gt;list item 3&lt;/li&gt;
&lt;/ul&gt;
&lt;div&gt;div&lt;/div&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('li').add('div').css('background', 'lightgreen');
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 160px;" src="https://demo.xiaohuochai.site/jquery/method/m1.html" frameborder="0" width="320" height="240"></iframe>

【get()】

&emsp;&emsp;通过检索匹配jQuery对象得到对应的DOM元素

<div>
<pre>get( [index ] ) index:Number 从0开始计数，用来确定获取哪个元素
</pre>
</div>
<div>
<pre>$( "li" ).get( 0 )</pre>
</div>

【index()】

&emsp;&emsp;从匹配的元素中搜索给定元素的索引值，从0开始计数

<div>
<pre>index( [selector或element] )</pre>
</div>

&emsp;&emsp;如果不传递任何参数给 .index() 方法，则返回值就是jQuery对象中第一个元素相对于它同辈元素的位置

&emsp;&emsp;如果在一组元素上调用 .index() ，并且参数是一个DOM元素或jQuery对象， .index() 返回值就是传入的元素相对于原先集合的位置。

&emsp;&emsp;如果参数是一个选择器， .index() 返回值就是原先元素相对于选择器匹配元素的位置。如果找不到匹配的元素，则 .index() 返回 -1

<div>
<pre>$('#bar').index();
listItem.index('li');
$('li').index($('li:gt(0)'));</pre>
</div>

【toArray()】

&emsp;&emsp;返回一个包含jQuery对象集合中的所有DOM元素的数组

<div>
<pre>toArray() 这个方法不接受任何参数</pre>
</div>
<div>
<pre>//[&lt;li id="foo"&gt;, &lt;li id="bar"&gt;]
alert($('li').toArray());</pre>
</div>

&nbsp;

### 索引过滤

&emsp;&emsp;[索引选择器](http://www.cnblogs.com/xiaohuochai/p/5807292.html)是jQuery过滤选择器的一部分。与此同时，也存在功能相似的索引相关的方法，包括eq()、first()、last()

【eq()】

&emsp;&emsp;eq()方法匹配元素的集合为指定的索引的哪一个元素。eq()方法可以接受一个整数作为参数，以0为基数。若整数为负数，则从集合中的最后一个元素开始计数　

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;ul&gt;
    &lt;li&gt;list item 1&lt;/li&gt;
    &lt;li&gt;list item 2&lt;/li&gt;
    &lt;li&gt;list item 3&lt;/li&gt;
    &lt;li&gt;list item 4&lt;/li&gt;
    &lt;li&gt;list item 5&lt;/li&gt;
&lt;/ul&gt;
&lt;button id="btn1"&gt;按钮一&lt;/button&gt;
&lt;button id="btn2"&gt;按钮二&lt;/button&gt;
&lt;button id="btn3"&gt;按钮三&lt;/button&gt;
&lt;script&gt;
$('#btn1').click(function(){
    $('li').eq(0).css('border','1px solid red');  
})
$('#btn2').click(function(){
    $('li').eq(-1).css('border','1px solid blue');    
})
$('#btn3').click(function(){
    $('li').eq(2).css('border','1px solid green');    
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/jquery/method/m2.html" frameborder="0" width="320" height="240"></iframe>

【first()】

&emsp;&emsp;first()方法获取匹配元素集合中第一个元素，该方法不接受参数

【last()】

&emsp;&emsp;last()方法获取匹配元素集合中最后一个元素，该方法不接受参数

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;ul&gt;
    &lt;li&gt;list item 1&lt;/li&gt;
    &lt;li&gt;list item 2&lt;/li&gt;
    &lt;li&gt;list item 3&lt;/li&gt;
    &lt;li&gt;list item 4&lt;/li&gt;
    &lt;li&gt;list item 5&lt;/li&gt;
&lt;/ul&gt;
&lt;button id="btn1"&gt;按钮一&lt;/button&gt;
&lt;button id="btn2"&gt;按钮二&lt;/button&gt;
&lt;script&gt;
$('#btn1').click(function(){
    $('li').first().css('border','1px solid red');    
})
$('#btn2').click(function(){
    $('li').last().css('border','1px solid blue');    
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 170px;" src="https://demo.xiaohuochai.site/jquery/method/m3.html" frameborder="0" width="320" height="240"></iframe>

【end()】

&emsp;&emsp;终止在当前链的最新过滤操作，并返回匹配的元素的以前状态

<div>
<pre>end() 这个方法不接受任何参数</pre>
</div>

&emsp;&emsp;end() 方法主要用于 jQuery 的链式属性中。当没有使用链式用法时，我们通常只是调用变量名上的前一个对象，所以我们不需要操作栈。使用 end() 时，我们可以一次性调用所有需要的方法

<div>
<pre>$('ul.first').find('.foo').css('background-color', 'red')
  .end().find('.bar').css('background-color', 'green');</pre>
</div>

&emsp;&emsp;在上面的代码中，首先在链式用法中只在第一个列表中查找样式为 foo 的项目，并将其背景色变成红色。然后 end() 返回调用 find() 之前的状态。因此，第二次 find() 将只会查找 &lt;ul class="first"&gt; 中的 '.bar'，而不是继续在 &lt;li class="foo"&gt; 中进行查找，结果是将匹配到的元素的背景色变成绿色

&nbsp;

### 内容过滤

&emsp;&emsp;jQuery选择器中包括[内容过滤选择器](http://www.cnblogs.com/xiaohuochai/p/5810908.html)，而jQuery中也存在功能类似的内容过滤的方法，包括has()、filter()、is()、not()、map()、slice()

【has()】

&emsp;&emsp;has()方法用于筛选匹配元素集合中有相匹配的选择器或DOM元素的后代元素的父元素

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;ul&gt;
    &lt;li&gt;list item 1&lt;/li&gt;
    &lt;li&gt;list item 2
    &lt;ul&gt;
      &lt;li&gt;list item 2-a&lt;/li&gt;
      &lt;li&gt;list item 2-b&lt;/li&gt;
    &lt;/ul&gt;
    &lt;/li&gt;
    &lt;li&gt;list item 3&lt;/li&gt;
&lt;/ul&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('li').has('ul').css('border', '1px solid lightblue');
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 170px;" src="https://demo.xiaohuochai.site/jquery/method/m4.html" frameborder="0" width="320" height="240"></iframe>

【map()】

&emsp;&emsp;map()方法通过一个函数匹配当前集合中的每个元素

&emsp;&emsp;作为参数的函数有两个参数，第一个参照是匹配集合中的元素索引，第二个参数是当前索引的DOM元素对象

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;input value="text"&gt;
&lt;input value="text"&gt;
&lt;input value="text"&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('input').map(function(index,dom){
        dom.value += index;
    });
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/method/m5.html" frameborder="0" width="320" height="240"></iframe>

【filter()】

&emsp;&emsp;filter()方法从匹配的元素集合中筛选出指定的元素，参数可以是一个选择器字符串、一个或多个DOM元素、jQuery对象或一个函数&emsp;&emsp;

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;ul&gt;
    &lt;li&gt;list item 1&lt;/li&gt;
    &lt;li&gt;list item 2&lt;/li&gt;
    &lt;li&gt;list item 3&lt;/li&gt;
    &lt;li&gt;list item 4&lt;/li&gt;
    &lt;li&gt;list item 5&lt;/li&gt;
&lt;/ul&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('li').filter(':even').css('border','1px solid lightgreen')
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/jquery/method/m6.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;filter()方法中作为参数的函数有两个参数，第一个参照是匹配集合中的元素索引，第二个参数是当前索引的DOM元素对象。如果函数返回值为true，则该元素保留；否则，该元素在匹配集合中被去除&nbsp;

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;ul&gt;
    &lt;li&gt;list item 1&lt;/li&gt;
    &lt;li&gt;list item 2&lt;/li&gt;
    &lt;li&gt;list item 3&lt;/li&gt;
    &lt;li&gt;list item 4&lt;/li&gt;
    &lt;li&gt;list item 5&lt;/li&gt;
&lt;/ul&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('li').filter(function(index,dom){
        if(!(index % 3)){
            $(dom).css('border','1px solid lightgreen')
            return true;
        }
    })
})
&lt;/script&gt;    </pre>
</div>

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/jquery/method/m7.html" frameborder="0" width="320" height="240"></iframe>

【not()】

&emsp;&emsp;not()方法与filter()方法正好相反，它从匹配的元素集合中移除指定的元素，参数可以是一个选择器字符串、一个或多个DOM元素、jQuery对象或一个函数　

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;ul&gt;
    &lt;li&gt;list item 1&lt;/li&gt;
    &lt;li&gt;list item 2&lt;/li&gt;
    &lt;li&gt;list item 3&lt;/li&gt;
    &lt;li&gt;list item 4&lt;/li&gt;
    &lt;li&gt;list item 5&lt;/li&gt;
&lt;/ul&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('li').not(':even').css('border','1px solid lightgreen')
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/jquery/method/m8.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;not()方法中作为参数的函数有两个参数，第一个参照是匹配集合中的元素索引，第二个参数是当前索引的DOM元素对象。如果函数返回值为true，则该元素被去除；否则，该元素在匹配集合中保留

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;ul&gt;
    &lt;li&gt;list item 1&lt;/li&gt;
    &lt;li&gt;list item 2&lt;/li&gt;
    &lt;li&gt;list item 3&lt;/li&gt;
    &lt;li&gt;list item 4&lt;/li&gt;
    &lt;li&gt;list item 5&lt;/li&gt;
&lt;/ul&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('li').not(function(index,dom){
        if(!(index % 3)){
            $(dom).css('border','1px solid lightgreen')
            return true;
        }
    })
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/jquery/method/m9.html" frameborder="0" width="320" height="240"></iframe>

【is()】

&emsp;&emsp;is()方法用于判断当前元素是否与参数相匹配，如果匹配，则返回true；否则，返回false。参数可以是一个选择器，DOM元素，jQuery对象或函数

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;ul&gt;
    &lt;li&gt;list item 1&lt;/li&gt;
    &lt;li&gt;list item 2&lt;/li&gt;
    &lt;li&gt;list item 3&lt;/li&gt;
    &lt;li&gt;list item 4&lt;/li&gt;
    &lt;li&gt;list item 5&lt;/li&gt;
&lt;/ul&gt;
&lt;script&gt;
$('li').click(function(){
    if($(this).is(':contains("2")')){
        $(this).css('border','1px solid black')
    }
})
&lt;/script&gt;    </pre>
</div>

<iframe style="width: 100%; height: 160px;" src="https://demo.xiaohuochai.site/jquery/method/m10.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;is()方法中作为参数的函数有两个参数，第一个参照是匹配集合中的元素索引，第二个参数是当前索引的DOM元素对象。如果函数返回true，is()方法也返回true，如果函数返回false，is()方法也返回false

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;ul&gt;
    &lt;li&gt;list item 1&lt;/li&gt;
    &lt;li&gt;list item 2&lt;/li&gt;
    &lt;li&gt;list item 3&lt;/li&gt;
    &lt;li&gt;list item 4&lt;/li&gt;
    &lt;li&gt;list item 5&lt;/li&gt;
&lt;/ul&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
var i = 0;
$('li').click(function(){
    ++i;
    if($(this).is(function(index,dom){
        $('#result').html(dom.innerHTML);
        if(i%2){
            return true;    
        }
    })){
         $(this).css('border','1px solid black')
    }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 170px;" src="https://demo.xiaohuochai.site/jquery/method/m11.html" frameborder="0" width="320" height="240"></iframe>

【slice()】

&emsp;&emsp;slice()方法根据指定的下标范围，过滤匹配的元素集合，并生成一个新的jQuery对象　

&emsp;&emsp;slice(start[,end])方法接受两个参数：start和end

&emsp;&emsp;start是一个整数，从0开始计数的下标。代表将要被选择的元素的起始下标。如果指定的下标是一个负数，那么代表从末尾开始计数

&emsp;&emsp;end是一个整数，从0开始计数的下标。代表将要被选择的元素的结束下标。如果指定的下标是一个负数，那么代表从末尾开始计数。如果忽略此参数，则选择的范围是从start开始，一直到最后

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;ul&gt;
  &lt;li&gt;list item 1&lt;/li&gt;
  &lt;li&gt;list item 2&lt;/li&gt;
  &lt;li&gt;list item 3&lt;/li&gt;
  &lt;li&gt;list item 4&lt;/li&gt;
  &lt;li&gt;list item 5&lt;/li&gt;
&lt;/ul&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('li').slice(2,4).css('background', 'red');
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 170px;" src="https://demo.xiaohuochai.site/jquery/method/m12.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;