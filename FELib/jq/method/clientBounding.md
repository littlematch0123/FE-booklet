# jQuery元素尺寸和位置操作

&emsp;&emsp;对于javascript来说，元素尺寸有[scroll](http://www.cnblogs.com/xiaohuochai/p/5831640.html)、[offset](http://www.cnblogs.com/xiaohuochai/p/5828369.html)、[client](http://www.cnblogs.com/xiaohuochai/p/5830053.html)三大属性，以及一个强大的[getBoundingClientRect()](http://www.cnblogs.com/xiaohuochai/p/5832712.html#anchor1)方法。而jQuery有着对应的更为简便的方法。本文将详细介绍jQuery中的元素尺寸和位置操作

&nbsp;

### 尺寸设置

&emsp;&emsp;在CSS中，宽高有三种表示，分别是content-box、padding-box和border-box里的三种宽高。可以分别对应于jQuery中height()/width()、innerHeight()/innerWidth()和outerHeight()/outerWidth()

&emsp;&emsp;注意：对于原生javascript来说，offsetWidth类属性无法获取隐藏元的值，而jQuery这三个获取宽高的方法可以

【1】设置宽高

**height()/width()**

&emsp;&emsp;当height()/width()方法中不包含任何参数时，可以获取设置宽高值

&emsp;&emsp;css(width)和width()之间的区别在于width()返回一个没有单位的数值(如400)，而css(width)返回带有完整单位的字符串(400px)。当然，高度也类似

<div>
<pre>&lt;div id="test" style="height:30px;width:10em"&gt;测试内容&lt;/div&gt;
&lt;button id="btn"&gt;获取宽高&lt;/button&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('#result').html('css()获取的高度:' + $('#test').css('height') + ';css()获取的宽度:' + $('#test').css('width') + ';height()获取的高度:' + $('#test').height() + ';width()获取的宽度:' + $('#test').width());
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 90px;" src="https://demo.xiaohuochai.site/jquery/pos/p1.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;这个方法同样能计算出window和document的宽高

<div>
<pre>$(window).width();
$(document).width();
$(window).height();
$(document).height();</pre>
</div>
<div>
<pre>&lt;div id="test"&gt;测试内容&lt;/div&gt;
&lt;button id="btn"&gt;获取宽高&lt;/button&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('#result').html('内容宽:' + $(this).width() +';内容高:' + $(this).height() +　';页面宽:' + $(document).width() +';页面高:' + $(document).height() +　';window宽:' + $(window).width() +';window高:' + $(window).height()　)
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 90px;" src="https://demo.xiaohuochai.site/jquery/pos/p2.html" frameborder="0" width="320" height="240"></iframe>

**height(value)/width(value)**

&emsp;&emsp;当height()/width()方法中包含一个参数时，可以设置宽高值。这个参数可以是一个正整数代表的像素数，或是整数和一个可选的附加单位(默认是px)

<div>
<pre>&lt;div id="test" style="background-color:pink"&gt;测试内容&lt;/div&gt;
&lt;button id="btn"&gt;设置宽高&lt;/button&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('#test').height(30).width(100);
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 90px;" src="https://demo.xiaohuochai.site/jquery/pos/p3.html" frameborder="0" width="320" height="240"></iframe>

**height(function(index,currentHeight))/width(function(index,currentWidth))**

&emsp;&emsp;height()/width()方法也可以以一个函数作为参数，该函数接受两个参数，index参数表示元素在集合中的位置，currentHeight/currentWidth参数表示原来的宽高。在这个函数中，this指向元素集合中的当前元素，最终返回设置的宽高

<div>
<pre>&lt;button id="btn"&gt;设置宽高&lt;/button&gt;
&lt;div&gt;1&lt;/div&gt;
&lt;div&gt;2&lt;/div&gt;
&lt;div&gt;3&lt;/div&gt;
&lt;div&gt;4&lt;/div&gt;
&lt;div&gt;5&lt;/div&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt; 
&lt;script&gt;
$("#btn").click(function(){
    $('div').height(30).css('background-color','orange').width(function(index,currentWidth){
            return currentWidth*(index+1)/10
    })
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 190px;" src="https://demo.xiaohuochai.site/jquery/pos/p4.html" frameborder="0" width="320" height="240"></iframe>

【2】客户区宽高

&emsp;&emsp;客户区宽高指设置宽高加上padding值。在javascript中，客户区宽高用clientWidth/clientHeight表示。而在jQuery中，用innerHeight()和innerWidth()方法表示

**innerHeight()/innerWidth()**

&emsp;&emsp;innerHeight()/innerWidth()方法不适用于window和document对象，可以使用height()/width()代替

<div>
<pre>&lt;div id="test" style="width:100px;height:30px;padding:2px;"&gt;测试内容&lt;/div&gt;
&lt;button id="btn"&gt;设置宽高&lt;/button&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('#result').html('设置高:' + $('#test').height() + ';设置宽:' + $('#test').width() + ';客户区高:' + $('#test').innerHeight() + ';客户区宽:' + $('#test').innerWidth())
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 90px;" src="https://demo.xiaohuochai.site/jquery/pos/p5.html" frameborder="0" width="320" height="240"></iframe>

【3】全宽高

&emsp;&emsp;全宽高指设置宽高再加上padding、border、margin(可选)

&emsp;&emsp;如果获取border-box的宽高，javascript使用offsetwidth/offsetHeight获取。而在jQuery中，有着功能更强大的outerWidth()/outerHeight()方法

**outerWidth()/outerHeight()**

&emsp;&emsp;outerWidth()/outerHeight()方法用来获取元素集合中第一个元素的当前计算宽高值，包括padding，border和选择性的margin。返回一个整数(不包含px)表示的值

&emsp;&emsp;当参数为false或无参数时，表示不包括margin，否则包括margin

&emsp;&emsp;注意：如果在一个空集合上调用该方法，则会返回null

&emsp;&emsp;outerWidth()/outerHeight()方法不适用于window和document对象，可以使用height()/width()代替

<div>
<pre>&lt;div id="test" style="width:100px;height:30px;padding:2px;border:1px solid black;margin:10px"&gt;测试内容&lt;/div&gt;
&lt;button id="btn"&gt;设置宽高&lt;/button&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('#result').html('border-box的宽度' + $('#test').outerWidth() + ';border-box的高度' + $('#test').outerHeight() + ';margin-box的宽度' + $('#test').outerWidth(true) + ';margin-box的高度' + $('#test').outerHeight(true))
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/jquery/pos/p6.html" frameborder="0" width="320" height="240"></iframe>

### 位置设置

【1】offsetParent()

&emsp;&emsp;jQuery通过offsetParent()找到元素的定位父级

&emsp;&emsp;jQuery与javascript有些不同，规则如下

&emsp;&emsp;1、当元素本身不是fixed定位，且父级元素存在经过定位的元素，offsetParent()的结果为离自身元素最近的经过定位的父级元素

&emsp;&emsp;2、当元素本身具有fixed定位，或父级元素都未经过定位，则offsetParent()的结果为html

&emsp;&emsp;3、body元素的offsetParent()的结果也是html

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="box" style="position:relative;"&gt;
    &lt;div id="test1" style="position:absolute;"&gt;&lt;/div&gt;
    &lt;div id="test2" style="position:fixed;"&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;script&gt;
console.log($('#test1').offsetParent());//'&lt;div id="box&gt;'
console.log($('#test2').offsetParent());//'&lt;html&gt;'
console.log($('#box').offsetParent());//'&lt;html&gt;'
console.log($('body').offsetParent());//'&lt;html&gt;'
&lt;/script&gt;</pre>
</div>

【2】position()

&emsp;&emsp;position()方法不接受参数，用来获取匹配元素中第一个元素的相对于定位父级的坐标

&emsp;&emsp;position()返回一个包含top和left属性的对象，相当于javascript中的offsetTop和offsetLeft

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="box" style="position:relative;"&gt;
    &lt;div id="test1" style="position:absolute;"&gt;&lt;/div&gt;
    &lt;div id="test2" style="position:fixed;"&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;script&gt;
console.log($('#test1').position().top,$('#test1').position().left);//0 0 
console.log($('#test2').position().top,$('#test2').position().left);//8 8 
&lt;/script&gt;</pre>
</div>

【3】offset()

**offset()**

&emsp;&emsp;当offset()方法没有参数时，在匹配的元素集合中，获取的第一个元素的当前坐标，坐标相对于文档&emsp;&emsp;

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="box" style="position:relative;"&gt;
    &lt;div id="test1" style="position:absolute;"&gt;&lt;/div&gt;
    &lt;div id="test2" style="position:fixed;"&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;script&gt;
console.log($('#test1').offset().top,$('#test1').offset().left);//8 8
console.log($('#test2').offset().top,$('#test2').offset().left);//8 8 
&lt;/script&gt;</pre>
</div>

**offset(coordinates)**

&emsp;&emsp;offset()方法可以接受一个包含top和left属性的对象，用整数指明元素的新顶部和左边坐标

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;改变按钮位置&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $(this).offset({top:20,left:20})
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/pos/p7.html" frameborder="0" width="320" height="240"></iframe>

**offset(function(index,coords))**

&emsp;&emsp;offset()方法可以接受一个函数作为参数。在函数中，元素在匹配的元素集合中的索引位置作为第一个参数，当前坐标作为第二个参数。这个函数返回一个包含top和left属性的对象

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;改变按钮位置&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $(this).offset(function(index,coords){
        return {left: coords.left + 10, top:coords.top}
    })
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/pos/p8.html" frameborder="0" width="320" height="240"></iframe>

【4】scrollTop()/scrollLeft()

**scrollTop()/scrollLeft()**

&emsp;&emsp;scrollTop()/scrollLeft()方法不带参数时，用来获取匹配元素集合中第一个元素的当前水平或垂直滚动条位置

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;    
&lt;div id="test" style="width: 100px;height: 100px;padding: 10px;margin: 10px;border: 1px solid black;overflow:scroll;font-size:20px;line-height:200px;"&gt;
    内容&lt;/div&gt;
&lt;button id='btn'&gt;点击&lt;/button&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('#result').html('scrollTop:' + $('#test').scrollTop() + ';scrollLeft:' + $('#test').scrollLeft())
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/jquery/pos/p9.html" frameborder="0" width="320" height="240"></iframe>

**scrollLeft(value)/scrollTop(value)**

&emsp;&emsp;scrollTop()/scrollLeft()方法可以接受一个用来设置滚动条水平或垂直位置的正整数

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;    
&lt;div id="test" style="width: 100px;height: 100px;padding: 10px;margin: 10px;border: 1px solid black;overflow:scroll;font-size:20px;line-height:200px;"&gt;
    内容&lt;/div&gt;
&lt;button id='btn1'&gt;向下滚动&lt;/button&gt;
&lt;button id='btn2'&gt;向上滚动&lt;/button&gt;
&lt;script&gt;
$('#btn1').click(function(){
    $('#test').scrollTop($('#test').scrollTop() + 10);
})
$('#btn2').click(function(){
    $('#test').scrollTop($('#test').scrollTop() - 10);
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/jquery/pos/p10.html" frameborder="0" width="320" height="240"></iframe>

## 最后

&emsp;&emsp;关于元素的位置和尺寸操作，jQuery把javascript中的scroll、offset、client和getBoundingClientRect()重新整合。对于常用的宽高尺寸设置了width/height、innerWidth/innerHeight、outerWidth/outerHeight这6个方法；而对于位置操作，则设置了position()、offset()/offsetParent()、scrollLeft()/scrollTop()这5个方法

&emsp;&emsp;欢迎交流