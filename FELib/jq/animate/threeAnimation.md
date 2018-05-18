# jQuery三种常见动画效果

&emsp;&emsp;动画效果是jQuery吸引人的地方。通过jQuery的动画方法，能够轻松地为网页添加视觉效果，给用户一种全新的体验。jQuery动画是一个大的系列，本文将详细介绍jQuery的三种常见动画效果&mdash;&mdash;显隐效果、高度变化及淡入淡出

&nbsp;

### 显隐

&emsp;&emsp;在CSS中，总结过实现[元素显隐的9种思路](http://www.cnblogs.com/xiaohuochai/p/5466971.html)。而jQuery中的show()和hide()方法是通过改变display属性来实现元素显隐效果，它们是jQuery中最基本的动画方法

【hide()】

&emsp;&emsp;hide()方法是隐藏元素的最简单方法。如果没有参数，匹配的元素将被立即隐藏，没有动画。这大致相当于调用.css('display', 'none')

&emsp;&emsp;display属性值保存在jQuery的数据缓存中，所以display可以方便以后可以恢复到其初始值。如果一个元素的display属性值为inline，那么隐藏再显示时，这个元素将再次显示inline

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="box"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#box').click(function(event){
  $(this).hide();
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/animate/a1.html" frameborder="0" width="320" height="240"></iframe>

**hide([duration])**

&emsp;&emsp;当提供一个持续时间参数，hide()就变成了一个动画方法。hide()方法将为匹配元素的宽度、高度及不透明度同时执行动画。一旦透明度达到0，display样式属性将被设置为none，这个元素将不再在页面中影响布局

&emsp;&emsp;持续时间是以毫秒为单位的，数值越大，动画越慢。默认值为'normal'，代码400毫秒的延时；'fast'和'slow'分别代表200和600毫秒的延时

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
&lt;div id="box" style="display:inline-block;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#reset').click(function(){
    $('#box').show();
})
$('#con li').click(function(){
    var value = $(this).html();
    $('#box').hide(isNaN(Number(value)) ? value:Number(value))
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/jquery/animate/a2.html" frameborder="0" width="320" height="240"></iframe>

**hide([duration][,easing])**

&emsp;&emsp;hide()方法可以接受一个可选参数easing，表示过渡使用哪种缓动函数。jQuery自身提供"linear"和"swing"，其他可以使用相关的插件，其中默认值为swing

&emsp;&emsp;linear表示匀速直线运动，而swing则表示变速运动，如下图所示

**linear**

![jq_animate1](https://pic.xiaohuochai.site/blog/jq_animate1.jpg)

**swing**

![jq_animate2](https://pic.xiaohuochai.site/blog/jq_animate2.jpg)
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
&lt;div id="box" style="display:inline-block;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#reset').click(function(){
    $('#box').show();
})
$('#con li').click(function(){
    $('#box').hide(2000,$(this).html())
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/jquery/animate/a3.html" frameborder="0" width="320" height="240"></iframe>

**hide([duration][,easing][,callback])**

&emsp;&emsp;hide()方法可以接受第三个参数，该参数也是可选参数，该参数是回调函数，表示动画完成时执行的函数

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="box"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#box').click(function(event){
  $(this).hide(1000,function(){
      alert('动画完成');
&emsp;&emsp;　 $(this).show();
  });
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/animate/a4.html" frameborder="0" width="320" height="240"></iframe>

【show()】

&emsp;&emsp;show()方法用于显示元素，与hide()方法用途正好相反，但用法相似

&emsp;&emsp;注意：如果选择的元素是可见的，这个方法将不会改变任何东西

&emsp;&emsp;如果没有参数，匹配的元素将被立即显示，没有动画

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;div id="test" style="height: 30px;width: 100px;background:lightblue;display:none;"&gt;&lt;/div&gt;
&lt;script&gt;
$('#btn').click(function(event){
  $('#test').show();
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 70px;" src="https://demo.xiaohuochai.site/jquery/animate/a5.html" frameborder="0" width="320" height="240"></iframe>

**show([duration])**

&emsp;&emsp;与hide()方法类似，当提供一个持续时间参数，show()就变成了一个动画方法。show()方法将为匹配元素的宽度、高度及不透明度同时执行动画

&emsp;&emsp;持续时间是以毫秒为单位的，数值越大，动画越慢。默认值为'normal'，代码400毫秒的延时；'fast'和'slow'分别代表200和600毫秒的延时

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
&lt;div id="box" style="display:inline-block;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#box').hide();
$('#reset').click(function(){
    $('#box').hide();
})
$('#con li').click(function(){
    $('#box').show($(this).html())
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/jquery/animate/a6.html" frameborder="0" width="320" height="240"></iframe>

**show([duration][,easing])**

&emsp;&emsp;show()方法可以接受一个可选参数easing，表示过渡使用哪种缓动函数。jQuery自身提供"linear"和"swing"，默认值为swing

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
&lt;div id="box" style="display:inline-block;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#box').hide();
$('#reset').click(function(){
    $('#box').hide();
})
$('#con li').click(function(){
    var value = $(this).html();
    $('#box').show(isNaN(Number(value)) ? value:Number(value))
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/jquery/animate/a7.html" frameborder="0" width="320" height="240"></iframe>

**show([duration][,easing][,callback])**

&emsp;&emsp;show()方法可以接受第三个参数，该参数也是可选参数，该参数是回调函数，表示动画完成时执行的函数

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;div id="box" style="display:none;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#btn').click(function(event){
  $('#box').show(1000,function(){
      alert('动画完成')
  });
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/jquery/animate/a8.html" frameborder="0" width="320" height="240"></iframe>

【toggle()】

&emsp;&emsp;show()与hide()是一对互斥的方法。需要对元素进行显示隐藏的互斥切换，通常情况是需要先判断元素的display状态，然后调用其对应的处理方法。比如显示的元素，那么就要调用hide，反之亦然。 对于这样的操作行为，jQuery提供了一个便捷方法toggle()用于切换显示或隐藏匹配元素

&emsp;&emsp;如果没有参数，toggle()方法是最简单的方法来切换一个元素可见性

&emsp;&emsp;通过改变CSS的display属性，匹配的元素将被立即显示或隐藏，没有动画。如果元素是最初显示，它会被隐藏，如果隐藏的，它会显示出来。display属性将被储存并且需要的时候可以恢复。如果一个元素的display值为inline，然后是隐藏和显示，这个元素将再次显示inline

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;div id="box" style="height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#btn').click(function(event){
  $('#box').toggle();
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/jquery/animate/a9.html" frameborder="0" width="320" height="240"></iframe>

**toggle([duration])**

&emsp;&emsp;当提供一个持续时间参数，toggle()成为一个动画方法。toggle()方法将为匹配元素的宽度、高度及不透明度，同时进行动画。当一个隐藏动画后，高度值达到0的时候，display样式属性被设置为none，以确保该元素不再影响页面布局

&emsp;&emsp;持续时间是以毫秒为单位的，数值越大，动画越慢。默认值为'normal'，代码400毫秒的延时；'fast'和'slow'分别代表200和600毫秒的延时

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
&lt;div id="box" style="display:inline-block;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#con li').click(function(){
    var value = $(this).html();
    $('#box').toggle(isNaN(Number(value)) ? value:Number(value))
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/jquery/animate/a10.html" frameborder="0" width="320" height="240"></iframe>

**toggle([duration][,easing])**

&emsp;&emsp;toggle()方法可以接受一个可选参数easing，表示过渡使用哪种缓动函数。jQuery自身提供"linear"和"swing"，默认值为swing

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;style&gt;
li{text-decoration: underline; margin-top: 2px;}
&lt;/style&gt;
&lt;ul id="con" style="display:inline-block;width:100px;cursor:pointer;margin:0;padding: 0;list-style:none;"&gt;
    &lt;li&gt;swing&lt;/li&gt;
    &lt;li&gt;linear&lt;/li&gt;
&lt;/ul&gt;
&lt;div id="box" style="display:inline-block;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#con li').click(function(){
    $('#box').toggle(2000,$(this).html())
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/jquery/animate/a11.html" frameborder="0" width="320" height="240"></iframe>

**toggle([duration][,easing][,callback])**

&emsp;&emsp;toggle()方法可以接受第三个参数，该参数也是可选参数，表示回调函数，即动画完成时执行的函数

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;div id="box" style="display:none;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#btn').click(function(event){
  $('#box').toggle(1000,function(){
      alert('动画完成')
  });
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/jquery/animate/a12.html" frameborder="0" width="320" height="240"></iframe>

### 高度变化

&emsp;&emsp;使用show()/hide()实现动画效果时，宽度、高度及透明度会同时变化。若只想让高度发生变化，则需要使用slideUp()方法和slideDown()方法

【slideUp()】

&emsp;&emsp;slideUp()方法将元素由下到上缩短隐藏

&emsp;&emsp;注意：没有参数时，持续时间默认为400毫秒

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;div id="box" style="height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#btn').click(function(event){
  $('#box').slideUp();
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/jquery/animate/a13.html" frameborder="0" width="320" height="240"></iframe>

**slideUp([duration])**

&emsp;&emsp;slideUp()方法可以接受一个持续时间参数

&emsp;&emsp;持续时间是以毫秒为单位的，数值越大，动画越慢。默认值为'normal'，代码400毫秒的延时；'fast'和'slow'分别代表200和600毫秒的延时

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
&lt;div id="box" style="display:inline-block;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#reset').click(function(){
    $('#box').show();
})
$('#con li').click(function(){
    var value = $(this).html();
    $('#box').slideUp(isNaN(Number(value)) ? value:Number(value))
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/jquery/animate/a14.html" frameborder="0" width="320" height="240"></iframe>

**slideUp([duration][,easing])**

&emsp;&emsp;slideUp()方法可以接受一个可选参数easing，表示过渡使用哪种缓动函数。jQuery自身提供"linear"和"swing"，默认值为swing，其他可以使用相关的插件

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
&lt;div id="box" style="display:inline-block;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#reset').click(function(){
    $('#box').show();
})
$('#con li').click(function(){
    $('#box').slideUp(2000,$(this).html())
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/jquery/animate/a15.html" frameborder="0" width="320" height="240"></iframe>

**slideUp([duration][,easing][,callback])**

&emsp;&emsp;slideUp()方法可以接受第三个参数，该参数也是可选参数，该参数是回调函数，表示动画完成时执行的函数

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="box"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#box').click(function(event){
  $(this).slideUp(1000,function(){
      alert('动画完成')
      $(this).show();
  });
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/animate/a16.html" frameborder="0" width="320" height="240"></iframe>

【slideDown()】

&emsp;&emsp;与slideUp()方法相反，slideDown()方法使元素由上到下延伸显示

&emsp;&emsp;注意：没有参数时，持续时间默认为400毫秒

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;div id="box" style="display:none;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#btn').click(function(event){
  $('#box').slideDown();
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/jquery/animate/a17.html" frameborder="0" width="320" height="240"></iframe>

**slideDown([duration])**

&emsp;&emsp;slideDown()方法可以接受一个持续时间参数

&emsp;&emsp;持续时间是以毫秒为单位的，数值越大，动画越慢。默认值为'normal'，代码400毫秒的延时；'fast'和'slow'分别代表200和600毫秒的延时

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
&lt;div id="box" style="display:inline-block;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#box').hide();
$('#reset').click(function(){
    $('#box').hide();
})
$('#con li').click(function(){
    $('#box').slideDown($(this).html())
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/jquery/animate/a18.html" frameborder="0" width="320" height="240"></iframe>

**slideDown([duration][,easing])**

&emsp;&emsp;slideDown()方法可以接受一个可选参数easing，表示过渡使用哪种缓动函数。jQuery自身提供"linear"和"swing"，默认值为swing，其他可以使用相关的插件

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
&lt;div id="box" style="display:inline-block;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#box').hide();
$('#reset').click(function(){
    $('#box').hide();
})
$('#con li').click(function(){
    var value = $(this).html();
    $('#box').slideDown(isNaN(Number(value)) ? value:Number(value))
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/jquery/animate/a19.html" frameborder="0" width="320" height="240"></iframe>

**slideDown([duration][,easing][,callback])**

&emsp;&emsp;slideDown()方法可以接受第三个参数，该参数也是可选参数，表示回调函数，即动画完成时执行的函数

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;div id="box" style="display:none;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#btn').click(function(event){
  $('#box').slideDown(1000,function(){
      alert('动画完成')
      $('#box').hide();
  });
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/jquery/animate/a20.html" frameborder="0" width="320" height="240"></iframe>

【slideToggle()】

&emsp;&emsp;slideDown与slideUp是一对相反的方法。需要对元素进行上下拉卷效果的切换，jQuery提供了一个便捷方法slideToggle()用滑动动画显示或隐藏一个匹配元素

&emsp;&emsp;注意：没有参数时，持续时间默认为400毫秒

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;div id="box" style="height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#btn').click(function(event){
  $('#box').slideToggle();
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/jquery/animate/a21.html" frameborder="0" width="320" height="240"></iframe>

**slideToggle([duration])**

&emsp;&emsp;当提供一个持续时间参数，slideToggle()成为一个动画方法

&emsp;&emsp;持续时间是以毫秒为单位的，数值越大，动画越慢。默认值为'normal'，代码400毫秒的延时；'fast'和'slow'分别代表200和600毫秒的延时

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
&lt;div id="box" style="display:inline-block;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#con li').click(function(){
    var value = $(this).html();
    $('#box').slideToggle(isNaN(Number(value)) ? value:Number(value))
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/jquery/animate/a22.html" frameborder="0" width="320" height="240"></iframe>

**slideToggle([duration][,easing])**

&emsp;&emsp;slideToggle()方法可以接受一个可选参数easing，表示过渡使用哪种缓动函数。jQuery自身提供"linear"和"swing"，默认值为swing　

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;style&gt;
li{text-decoration: underline; margin-top: 2px;}
&lt;/style&gt;
&lt;ul id="con" style="display:inline-block;width:100px;cursor:pointer;margin:0;padding: 0;list-style:none;"&gt;
    &lt;li&gt;swing&lt;/li&gt;
    &lt;li&gt;linear&lt;/li&gt;
&lt;/ul&gt;
&lt;div id="box" style="display:inline-block;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#con li').click(function(){
    $('#box').slideToggle(2000,$(this).html())
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/jquery/animate/a23.html" frameborder="0" width="320" height="240"></iframe>

**slideToggle([duration][,easing][,callback])**

<div>
<pre>slideToggle()方法可以接受第三个参数，该参数也是可选参数，表示回调函数，即动画完成时执行的函数
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;div id="box" style="display:none;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#btn').click(function(event){
  $('#box').slideToggle(1000,function(){
      alert('动画完成')
  });
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/jquery/animate/a24.html" frameborder="0" width="320" height="240"></iframe>

### 淡入淡出

&emsp;&emsp;让元素在页面不可见，常用的办法就是通过设置样式的display:none。除此之外还可以一些类似的办法可以达到这个目的设置元素透明度为0，可以让元素不可见，透明度的参数是0~1之间的值，通过改变这个值可以让元素有一个透明度的效果。常见的淡入淡出动画fadeIn()和fadeOut()方法正是这样的原理

【fadeIn()】

&emsp;&emsp;fadeIn()方法通过淡入的方式显示匹配元素

&emsp;&emsp;注意：没有参数时，持续时间默认为400毫秒

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;div id="box" style="display:none;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#btn').click(function(event){
  $('#box').fadeIn();
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/jquery/animate/a25.html" frameborder="0" width="320" height="240"></iframe>

**fadeIn([duration])**

&emsp;&emsp;fadeIn()方法可以接受一个持续时间参数

&emsp;&emsp;持续时间是以毫秒为单位的，数值越大，动画越慢。默认值为'normal'，代码400毫秒的延时；'fast'和'slow'分别代表200和600毫秒的延时

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
&lt;div id="box" style="display:inline-block;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#box').hide();
$('#reset').click(function(){
    $('#box').hide();
})
$('#con li').click(function(){
    var value = $(this).html();
    $('#box').fadeIn(isNaN(Number(value)) ? value:Number(value))
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/jquery/animate/a26.html" frameborder="0" width="320" height="240"></iframe>

**fadeIn([duration][,easing])**

&emsp;&emsp;fadeIn()方法可以接受一个可选参数easing，表示过渡使用哪种缓动函数。jQuery自身提供"linear"和"swing"，默认值为swing，其他可以使用相关的插件

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
&lt;div id="box" style="display:inline-block;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#box').hide();
$('#reset').click(function(){
    $('#box').hide();
})
$('#con li').click(function(){
    $('#box').fadeIn(2000,$(this).html())
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/jquery/animate/a27.html" frameborder="0" width="320" height="240"></iframe>

**fadeIn([duration][,easing][,callback])**

&emsp;&emsp;fadeIn()方法可以接受第三个参数，该参数也是可选参数，该参数是回调函数，表示动画完成时执行的函数

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;div id="box" style="display:none;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#btn').click(function(event){
  $('#box').fadeIn(1000,function(){
      alert('动画完成')
      $('#box').hide();
  });
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/jquery/animate/a28.html" frameborder="0" width="320" height="240"></iframe>

【fadeOut()】

&emsp;&emsp;fadeOut()方法与fadeIn()方法正好相反，可以通过淡出的方式隐藏匹配元素

&emsp;&emsp;注意：没有参数时，持续时间默认为400毫秒

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;div id="box" style="height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#btn').click(function(event){
  $('#box').fadeOut();
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/jquery/animate/a29.html" frameborder="0" width="320" height="240"></iframe>

**fadeOut([duration])**

&emsp;&emsp;fadeOut()方法可以接受一个持续时间参数，持续时间是以毫秒为单位的，数值越大，动画越慢。默认值为'normal'，代码400毫秒的延时；'fast'和'slow'分别代表200和600毫秒的延时

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
&lt;div id="box" style="display:inline-block;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#reset').click(function(){
    $('#box').show();
})
$('#con li').click(function(){
    var value = $(this).html();
    $('#box').fadeOut(isNaN(Number(value)) ? value:Number(value))
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/jquery/animate/a30.html" frameborder="0" width="320" height="240"></iframe>

**fadeOut([duration][,easing])**

&emsp;&emsp;fadeOut()方法可以接受一个可选参数easing，表示过渡使用哪种缓动函数。jQuery自身提供"linear"和"swing"，默认值为swing，其他可以使用相关的插件

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
&lt;div id="box" style="display:inline-block;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#reset').click(function(){
    $('#box').show();
})
$('#con li').click(function(){
    $('#box').fadeOut(2000,$(this).html())
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/jquery/animate/a31.html" frameborder="0" width="320" height="240"></iframe>

**fadeOut([duration][,easing][,callback])**

&emsp;&emsp;fadeOut()方法可以接受第三个参数，该参数也是可选参数，该参数是回调函数，表示动画完成时执行的函数

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="box"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#box').click(function(event){
  $(this).fadeOut(1000,function(){
      alert('动画完成')
      $(this).show();
  });
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/animate/a32.html" frameborder="0" width="320" height="240"></iframe>

【fadeToggle()】

&emsp;&emsp;fadeToggle()方法通过匹配的元素的不透明度动画，来显示或隐藏它们

&emsp;&emsp;注意：没有参数时，持续时间默认为400毫秒

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;div id="box" style="height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#btn').click(function(event){
  $('#box').fadeToggle();
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/jquery/animate/a33.html" frameborder="0" width="320" height="240"></iframe>

**fadeToggle([duration])**

&emsp;&emsp;当提供一个持续时间参数，fadeToggle()成为一个动画方法

&emsp;&emsp;持续时间是以毫秒为单位的，数值越大，动画越慢。默认值为'normal'，代码400毫秒的延时；'fast'和'slow'分别代表200和600毫秒的延时

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
&lt;div id="box" style="display:inline-block;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#con li').click(function(){
    var value = $(this).html();
    $('#box').fadeToggle(isNaN(Number(value)) ? value:Number(value))
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/jquery/animate/a34.html" frameborder="0" width="320" height="240"></iframe>

**fadeToggle([duration][,easing])**

&emsp;&emsp;fadeToggle()方法可以接受一个可选参数easing，表示过渡使用哪种缓动函数。jQuery自身提供"linear"和"swing"，默认值为swing

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;style&gt;
li{text-decoration: underline; margin-top: 2px;}
&lt;/style&gt;
&lt;ul id="con" style="display:inline-block;width:100px;cursor:pointer;margin:0;padding: 0;list-style:none;"&gt;
    &lt;li&gt;swing&lt;/li&gt;
    &lt;li&gt;linear&lt;/li&gt;
&lt;/ul&gt;
&lt;div id="box" style="display:inline-block;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#con li').click(function(){
    $('#box').fadeToggle(2000,$(this).html())
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/jquery/animate/a35.html" frameborder="0" width="320" height="240"></iframe>

**fadeToggle([duration][,easing][,callback])**

&emsp;&emsp;fadeToggle()方法可以接受第三个参数，该参数也是可选参数，表示回调函数，即动画完成时执行的函数

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;div id="box" style="display:none;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#btn').click(function(event){
  $('#box').fadeToggle(1000,function(){
      alert('动画完成')
  });
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 150px;" src="https://demo.xiaohuochai.site/jquery/animate/a36.html" frameborder="0" width="320" height="240"></iframe>

【fadeTo()】

&emsp;&emsp;淡入淡出fadeIn与fadeOut都是修改元素样式的opacity属性，但是他们都有个共同的特点，变化的区间要么是0，要么是1。如果要让元素保持动画效果，执行opacity = 0.5的效果时，要如何处理？jQuery提供了fadeTo()方法，可以让改变透明度一步到位

**fadeTo(duration,opacity)**

&emsp;&emsp;fadeTo()方法有两个必需的参数duration和opacity

&emsp;&emsp;duration表示持续时间，持续时间是以毫秒为单位的，数值越大，动画越慢。默认值为'normal'，代码400毫秒的延时；'fast'和'slow'分别代表200和600毫秒的延时

&emsp;&emsp;opacity为0和1之间的数字表示元素的不透明度

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
&lt;div id="box" style="display:inline-block;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#reset').click(function(){
    $('#box').css('opacity','1');
})
$('#con li').click(function(){
    var value = $(this).html();
    $('#box').fadeTo(isNaN(Number(value)) ? value:Number(value),0.5)
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/jquery/animate/a37.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;可以为元素设置随机的不透明度

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;div id="box" style="height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#btn').click(function(event){
  $('#box').fadeTo('fast',Math.random());
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 150px;" src="https://demo.xiaohuochai.site/jquery/animate/a38.html" frameborder="0" width="320" height="240"></iframe>

**fadeTo(duration,opacity[,easing])**

&emsp;&emsp;fadeTo()方法可以接受一个可选参数easing，表示过渡使用哪种缓动函数。jQuery自身提供"linear"和"swing"，默认值为swing

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
&lt;div id="box" style="display:inline-block;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#reset').click(function(){
    $('#box').css('opacity','1');
})
$('#con li').click(function(){
    $('#box').fadeTo('1000','0.1',$(this).html())
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/jquery/animate/a39.html" frameborder="0" width="320" height="240"></iframe>

**fadeTo(duration,opacity[,callback])**

&emsp;&emsp;fadeTo()方法还可以接受一个可选参数，该参数表示回调函数，即动画完成时执行的函数

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;div id="box" style="height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#btn').click(function(event){
  $('#box').fadeTo(1000,'0.1',function(){
      alert('动画完成');
      $('#box').css('opacity','1');
  });
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 150px;" src="https://demo.xiaohuochai.site/jquery/animate/a40.html" frameborder="0" width="320" height="240"></iframe>