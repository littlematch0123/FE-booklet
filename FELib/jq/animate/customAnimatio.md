# jQuery自定义动画animate

&emsp;&emsp;很多情况下，前面介绍的[jQuery动画的简单效果](http://www.cnblogs.com/xiaohuochai/p/5932616.html)无法满足用户的各种需求，那么就需要对动画有更多的限制，需要采取一些高级的自定义动画来解决这些问题。本文将详细介绍jQuery的自定义动画animate

&nbsp;

### 属性对象

&emsp;&emsp;animate()方法的常规使用和之前介绍的3种常见动画的使用方法类似

**animate(properties[,duration][,easing][,complete])**

&emsp;&emsp;animate()方法的第一个参数是一个必须参数，表示一个CSS属性和值的对象，动画将根据这组对象移动

&emsp;&emsp;所有用于动画的属性必须是数字的，除非另有说明；这些属性如果不是数字的将不能使用基本的jQuery功能。例如，width、height或者left可以执行动画，但是background-color不能

&emsp;&emsp;当然，除了样式属性，一些非样式的属性，如scrollTop、scrollLeft以及自定义属性，也可应用于动画

&emsp;&emsp;下面以元素向右移动100px为例，此时需要将元素设置为定位元素

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;button id="reset"&gt;恢复&lt;/button&gt;
&lt;div id="box" style="position:relative;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#reset').click(function(){
    history.go();
})
$('#btn').click(function(event){
  $('#box').animate({'left':'100px'});
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/jquery/anim/a1.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;CSS简写属性(如font、background、border)没有得到充分的支持，只支持单一数值属性

&emsp;&emsp;注意：中划线和小驼峰两种形式都可以使用

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn1"&gt;按钮一&lt;/button&gt;
&lt;button id="btn2"&gt;按钮二&lt;/button&gt;
&lt;button id="reset"&gt;恢复&lt;/button&gt;
&lt;div id="box" style="height: 100px;width: 300px;background-color: lightblue;border:1px solid black;"&gt;测试文字&lt;/div&gt;
&lt;script&gt;
$('#reset').click(function(){
    history.go();
})
$('#btn1').click(function(event){
  $('#box').animate({'border-left-width':'20px'});
});
$('#btn2').click(function(event){
  $('#box').animate({'borderLeftWidth':'20px'});
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/jquery/anim/a2.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;除了定义数值，每个属性能使用'show'、'hide'和'toggle'，这些快捷方式允许定制隐藏和显示动画用来控制元素的显示或隐藏

<div>
<pre>animate({opacity:'show'}) 相当于 fadeIn()
animate({opacity:'hide'}) 相当于 fadeOut()
animate({opacity:'toggle'}) 相当于 fadeToggle()
animate({opacity:'0.5'}) 相当于 fadeTo(0.5)</pre>
</div>
<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn1"&gt;Toggle1&lt;/button&gt;
&lt;button id="btn2"&gt;Toggle2&lt;/button&gt;
&lt;div id="box" style="height: 100px;width: 300px;background-color: lightblue;border:1px solid black;"&gt;测试文字&lt;/div&gt;
&lt;script&gt;
$('#btn1').click(function(event){
  $('#box').animate({'opacity':'toggle'});
});
$('#btn2').click(function(event){
  $('#box').fadeToggle();
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/jquery/anim/a3.html" frameborder="0" width="320" height="240"></iframe>

<div>
<pre>animate({height:'show'}) 相当于 slideDown()
animate({height:'hide'}) 相当于 slideUp()
animate({height:'toggle'}) 相当于 slideToggle()</pre>
</div>
<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn1"&gt;Toggle1&lt;/button&gt;
&lt;button id="btn2"&gt;Toggle2&lt;/button&gt;
&lt;div id="box" style="height: 100px;width: 300px;background-color: lightblue;border:1px solid black;"&gt;测试文字&lt;/div&gt;
&lt;script&gt;
$('#btn1').click(function(event){
  $('#box').animate({'height':'toggle'});
});
$('#btn2').click(function(event){
  $('#box').slideToggle();
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 150px;" src="https://demo.xiaohuochai.site/jquery/anim/a4.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;show()、hide()、toggle()方法不添加参数时，将没有动画效果

<div>
<pre>animate({height:'show',width:'show',opacity:'show'}) 相当于show(400)
animate({height:'hide',width:'hide',opacity:'hide'}) 相当于hide(400)
animate({height:'toggle',width:'toggle',opacity:'toggle'}) 相当于toggle(400)</pre>
</div>
<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn1"&gt;Toggle1&lt;/button&gt;
&lt;button id="btn2"&gt;Toggle2&lt;/button&gt;
&lt;div id="box" style="height: 100px;width: 300px;background-color: lightblue;border:1px solid black;"&gt;测试文字&lt;/div&gt;
&lt;script&gt;
$('#btn1').click(function(event){
  $('#box').animate({height:'toggle',width:'toggle',opacity:'toggle'}) ;
});
$('#btn2').click(function(event){
  $('#box').toggle(400);
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 150px;" src="https://demo.xiaohuochai.site/jquery/anim/a5.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;动画属性也可以是一个相对值。如果提供一个以+= 或 -=开始的值，那么目标值就是以这个属性的当前值加上或者减去给定的数字来计算的

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn1"&gt;增加&lt;/button&gt;
&lt;button id="btn2"&gt;减少&lt;/button&gt;
&lt;button id="reset"&gt;恢复&lt;/button&gt;
&lt;div id="box" style="position:relative;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#reset').click(function(){
    history.go();
})
$('#btn1').click(function(event){
  $('#box').animate({'width':'+=100'});
});
$('#btn2').click(function(event){
  $('#box').animate({'width':'-=100'});
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/jquery/anim/a6.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;如果第一个参数对象中存在多种值，则表示该元素将同时执行多个动画

&emsp;&emsp;注意：属性值的单位默认是像素px，其他单位如em和%需要指定使用

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;button id="reset"&gt;恢复&lt;/button&gt;
&lt;div id="box" style="position:relative;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#reset').click(function(){
    history.go();
})
$('#btn').click(function(event){
  $('#box').animate({'left':'100px','width':'100'});
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 150px;" src="https://demo.xiaohuochai.site/jquery/anim/a7.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;如果要按照顺序执行多个动画，而不是同时执行动画，则只需要把代码拆开，然后按照顺序写就可以了

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;button id="reset"&gt;恢复&lt;/button&gt;
&lt;div id="box" style="position:relative;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#reset').click(function(){
    history.go();
})
$('#btn').click(function(event){
  $('#box').animate({'left':'100px'});
  $('#box').animate({'width':'100px'});
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 150px;" src="https://demo.xiaohuochai.site/jquery/anim/a8.html" frameborder="0" width="320" height="240"></iframe>

### 可选参数

&emsp;&emsp;animate(properties[,duration][,easing][,complete])方法中除了第一个属性对象是必需参数，其余参数都是可选参数。接下来，介绍animate()方法的可选参数

**持续时间**

&emsp;&emsp;animate()方法的第二个参数持续时间，用一个字符串或者数字决定动画将运行多久。默认值为"normal"，有三种预定速度的字符串"slow"、"normal"、"fast"分别表示600ms、400ms和200ms

&emsp;&emsp;注意：如果要自定义持续时间，需要设置为数字(如400)，而不要设置为字符串'400'，否则将不生效

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;style&gt;
li{text-decoration: underline; margin-top: 2px;}
&lt;/style&gt;
&lt;ul id="con" style="display:inline-block;width:100px;cursor:pointer;margin:0;padding: 0;list-style:none;"&gt;
    &lt;li&gt;fast&lt;/li&gt;
    &lt;li&gt;normal&lt;/li&gt;
    &lt;li&gt;slow&lt;/li&gt;
    &lt;li&gt;100&lt;/li&gt;
    &lt;li&gt;1000&lt;/li&gt;
&lt;/ul&gt;
&lt;button id="reset"&gt;恢复&lt;/button&gt;
&lt;div id="box" style="position:relative;display:inline-block;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#reset').click(function(){
    history.go();
})
$('#con li').click(function(){
    var value = $(this).html();
    $('#box').animate({left:100},isNaN(Number(value)) ? value:Number(value))
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/jquery/anim/a9.html" frameborder="0" width="320" height="240"></iframe>

**动画效果**

&emsp;&emsp;动画效果easing是第二个可选参数，表示过渡使用哪种缓动函数。jQuery自身提供"linear"和"swing"，其他可以使用相关的插件，其中默认值为swing

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;style&gt;
li{text-decoration: underline; margin-top: 2px;}
&lt;/style&gt;
&lt;ul id="con" style="display:inline-block;width:100px;cursor:pointer;margin:0;padding: 0;list-style:none;"&gt;
    &lt;li&gt;swing&lt;/li&gt;
    &lt;li&gt;linear&lt;/li&gt;
&lt;/ul&gt;
&lt;button id="reset"&gt;恢复&lt;/button&gt;
&lt;div id="box" style="position:relative;display:inline-block;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#reset').click(function(){
    history.go();
})
$('#con li').click(function(){
    $('#box').animate({'left':'200'},1000,$(this).html())
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/jquery/anim/a10.html" frameborder="0" width="320" height="240"></iframe>

**回调函数**

&emsp;&emsp;回调函数是第三个可选参数，表示动画完成时执行的函数

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;button id="reset"&gt;恢复&lt;/button&gt;
&lt;div id="box" style="position:relative;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#reset').click(function(){
    history.go();
})
$('#btn').click(function(event){
  $('#box').animate({'left':'100px'},function(){
      alert(1);
  });
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/jquery/anim/a11.html" frameborder="0" width="320" height="240"></iframe>

### 选项参数

&emsp;&emsp;animate()方法的另一种用法是使用选项参数options

**animate(properties,options)**

&emsp;&emsp;使用选项参数时，animate()方法的第一个参数仍然是属性对象，第二个参数是一组包含动画选项的值的集合。支持以下选项:

【1】duration(default:400)

&emsp;&emsp;duration参数表示一个字符串或者数字决定动画将运行多久

【2】easing(default:swing)

&emsp;&emsp;easing参数表示过渡使用哪种缓动函数

【3】complete

&emsp;&emsp;complete参数表示在动画完成时执行的函数

【4】queue(default:true)

&emsp;&emsp;queue参数表示是否将动画放置在效果队列中，如果为false时，将立即开始动画

&emsp;&emsp;从jQuery1.7开始，该项也可以接受一个字符串，表示动画被添加到由该字符串表示的队列中

【5】specialEasing

&emsp;&emsp;specialEasing参数表示由animate()方法的第一个参数properties定义的一个或多个CSS属性，及其相应的缓动函数组成的键值对map

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;button id="reset"&gt;恢复&lt;/button&gt;
&lt;div id="box" style="position:relative;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#reset').click(function(){
    history.go();
})
$('#btn').click(function(event){
  $('#box').animate({'left':'100px','width':'100px'},{
      specialEasing:{
          left:'linear',
          width:'swing'
      }
  });
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/jquery/anim/a12.html" frameborder="0" width="320" height="240"></iframe>

【6】step

&emsp;&emsp;step参数表示每个动画元素的每个动画属性将调用的函数

&emsp;&emsp;step参数接受两个参数(now和fx)，this表示当前正在执行动画的DOM元素集合

&emsp;&emsp;其中，now表示每一步动画属性的数字值，而fx是jQuery.fx原型对象的一个引用，其中包含了多项属性，比如elem表示前正在执行动画的元素，start和end分别为动画属性的第一个和最后一个的值，prop为进行中的动画属性

&emsp;&emsp;注意：step函数被每个动画元素的每个动画属性调用

&emsp;&emsp;以下代码中，通过设置第0个div元素的step参数，使其余div元素也进行相同的运动&nbsp;

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;button id="reset"&gt;恢复&lt;/button&gt;
&lt;div id="box" style="position:relative;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;div style="position:relative;height: 100px;width: 300px;background-color: lightyellow"&gt;&lt;/div&gt;
&lt;div style="position:relative;height: 100px;width: 300px;background-color: lightgreen"&gt;&lt;/div&gt;
&lt;script&gt;
$('#reset').click(function(){
    history.go();
})
$('#btn').click(function(event){
  $('#box').animate({'left':'100px'},
      {
          step:function(now,fx){
              $('div').css('left',now)
          }
      });
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 340px;" src="https://demo.xiaohuochai.site/jquery/anim/a13.html" frameborder="0" width="320" height="240"></iframe>