# jQuery动画控制

&emsp;&emsp;jQuery动画可以使用fade、hide、slide等方法实现[基本动画效果](http://www.cnblogs.com/xiaohuochai/p/5932616.html)，可以使用animate实现[自定义动画](http://www.cnblogs.com/xiaohuochai/p/5955136.html)，甚至可以使用queue实现[动画队列](http://www.cnblogs.com/xiaohuochai/p/5958082.html)。但是，却缺少了对动画控制的介绍。动画产生后，描述动画状态、进行动画延迟、操作动画暂停等都是很重要的功能。本文将详细介绍jQuery动画控制

&nbsp;

### 动画状态

&emsp;&emsp;当用户快速在某个元素多次执行动画时，会造成动画累积的现象。这时，就需要引入动画状态这个概念。判断元素是否处于动画状态中，如果处于，则不添加新动画

**is(':animated')**

&emsp;&emsp;使用is(':animated')方法来判断元素是否处于动画状态

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn1"&gt;按钮一&lt;/button&gt;
&lt;button id="btn2"&gt;按钮二&lt;/button&gt;
&lt;button id="reset"&gt;恢复&lt;/button&gt;
&lt;div id="box" style="position:relative;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#reset').click(function(){
    history.go();
})
$('#btn1').click(function(event){
  $('#box').animate({'left':'+=100px'});
});
$('#btn2').click(function(event){
    if(!$('#box').is(':animated')){
        $('#box').animate({'left':'+=100px'});        
    }
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/jquery/control/c1.html" frameborder="0" width="320" height="240"></iframe>

### 停止动画

【stop()】

&emsp;&emsp;stop()方法用于停止匹配元素当前正在运行的动画

**stop([queue][,clearQueue][,jumpToEnd])**

&emsp;&emsp;stop()方法可以接受3个可选参数，第一个参数queue表示停止动画队列的名称；第二个参数clearQueue表示是否清空队列中的动画，默认值为false；第三个参数jumpToEnd表示是否当前动画立即完成，默认值为false

【1】当stop()方法不接受任何参数时，将立刻停止当前动画

&emsp;&emsp;对于hover动画效果来说，经常出现用户把光标移入元素时出发触发动画效果，但当前动画没有结束时，用户已经将光标移出元素。这样移入移出过快会导致动画效果延迟

&emsp;&emsp;此时，只要在光标移入、移出动画之前加入stop()方法就可以结束当前动画，并立即执行队列中下一个动画

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="reset"&gt;恢复&lt;/button&gt;
&lt;div id="box" style="position:relative;height: 100px;width: 300px;background-color: lightblue"&gt;未设置stop的hover动画效果&lt;/div&gt;
&lt;div id="box1" style="position:relative;height: 100px;width: 300px;background-color: lightgreen"&gt;设置stop的hover动画效果&lt;/div&gt;
&lt;script&gt;
$('#reset').click(function(){
    history.go();
})
$('#box').hover(function(event){
    $(this).animate({'width':'400px'})
},function(){
    $(this).animate({'width':'300px'})
});
$('#box1').hover(function(event){
    $(this).stop().animate({'width':'400px'})
},function(){
    $(this).stop().animate({'width':'300px'})
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 240px;" src="https://demo.xiaohuochai.site/jquery/control/c2.html" frameborder="0" width="320" height="240"></iframe>

【2】stop()参数clearQueue表示是否清空队列中的动画，默认值为false

&emsp;&emsp;当设置该参数为true时，则不仅停止当前动画，而且会清空队列中动画

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;开始动画&lt;/button&gt;
&lt;button id="btn1"&gt;停止当前动画&lt;/button&gt;
&lt;button id="btn2"&gt;停止当前及后续动画&lt;/button&gt;
&lt;button id="reset"&gt;恢复&lt;/button&gt;
&lt;div id="box" style="position:relative;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#reset').click(function(){
    history.go();
})
$('#btn').click(function(event){
  $('#box').animate({'left':'100px'},1000).animate({'width':'200px'},1000);
  $('#box').animate({'left':'0'},1000).animate({'width':'100px'},1000);
});
$('#btn1').click(function(event){
    $('#box').stop();
})
$('#btn2').click(function(event){
    $('#box').stop(true);
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/jquery/control/c3.html" frameborder="0" width="320" height="240"></iframe>

【3】stop()参数jumpToEnd表示是否当前动画立即完成，默认值为false

&emsp;&emsp;当该参数设置为true时，当前动画立即完成

&emsp;&emsp;stop()相当于stop(false,false)表示停止执行当前动画，后续动画接着进行

&emsp;&emsp;stop(true,false)表示停止执行当前动画，后续动画不再进行

&emsp;&emsp;stop(false,true)表示当前动画立即完成，后续动画接着进行

&emsp;&emsp;stop(true,true)表示当前动画立即完成，后续动画不再进行

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;input id="btn" type="button" value="开始动画"&gt;
&lt;button&gt;stop()&lt;/button&gt;
&lt;button&gt;stop(true,false)&lt;/button&gt;
&lt;button&gt;stop(false,true)&lt;/button&gt;
&lt;button&gt;stop(true,true)&lt;/button&gt;
&lt;input id="reset" type="button" value="恢复"&gt;
&lt;div id="box" style="position:relative;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#reset').click(function(){
    history.go();
})
$('#btn').click(function(event){
  $('#box').animate({'left':'100px'},1000).animate({'width':'200px'},1000);
  $('#box').animate({'left':'0'},1000).animate({'width':'100px'},1000);
});
$('button').click(function(event){
    jQuery.globalEval("$('#box')." + $(this).html());
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/jquery/control/c4.html" frameborder="0" width="320" height="240"></iframe>

【finish()】

&emsp;&emsp;finish()方法是另一种停止动画的方法，它可以停止当前正在运行的动画，删除所有排队的动画，并完成匹配元素所有的动画

**finish([queue])**

&emsp;&emsp;finish()方法可以接受一个可选参数queue表示停止动画队列的名称

&emsp;&emsp;finish()方法和stop(true,true)很相似，stop(true,true)将清除队列，并且目前的动画跳转到其最终值。但是，不同的是，finish()会导致所有排队的动画的CSS属性跳转到他们的最终值

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;input id="btn" type="button" value="开始动画"&gt;
&lt;button&gt;finish()&lt;/button&gt;
&lt;button&gt;stop(true,true)&lt;/button&gt;
&lt;input id="reset" type="button" value="恢复"&gt;
&lt;div id="box" style="position:relative;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#reset').click(function(){
    history.go();
})
$('#btn').click(function(event){
  $('#box').animate({'left':'100px'},1000).animate({'width':'200px'},1000);
  $('#box').animate({'left':'0'},1000).animate({'width':'100px'},1000);
});
$('button').click(function(event){
    jQuery.globalEval("$('#box')." + $(this).html());
})
&lt;/script&gt;    </pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/jquery/control/c5.html" frameborder="0" width="320" height="240"></iframe>

### 动画延迟

&emsp;&emsp;delay()方法可以用来设置一个延时来推迟执行队列中后续的项

**delay(duration[,queueName])**

&emsp;&emsp;duration是delay()方法的必须参数，用于设定下个队列推迟执行的时间，持续时间是以毫秒为单位的，默认值为'normal'，代码400毫秒的延时；'fast'和'slow'分别代表200和600毫秒的延时

&emsp;&emsp;queueName是delay()方法的可选参数，它是一个队列名的字符串，默认是动画队列fx

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn1"&gt;开始动画&lt;/button&gt;
&lt;button id="reset"&gt;恢复&lt;/button&gt;
&lt;div id="box" style="position:relative;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#reset').click(function(){
    history.go();
})
$('#btn1').click(function(event){
  $('#box').animate({'left':'300px'}).delay(500).animate({'width':'100px'});
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/jquery/control/c6.html" frameborder="0" width="320" height="240"></iframe>

### 全局控制

【jQuery.fx.off】

&emsp;&emsp;jQuery.fx.off属性可以用来对jQuery动画进行全局控制，默认为undefined，当这个属性设置为true的时候，调用时所有动画方法将立即设置元素为他们的最终状态，而不是显示效果

&emsp;&emsp;当然，动画可以通过设置这个属性为false重新打开

&emsp;&emsp;注意：由于该属性是全局性的，因此在没有动画正在运行或停止所有动画时，此属性的变化才能生效

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn1"&gt;开始动画&lt;/button&gt;
&lt;button id="btn2"&gt;开闭动画&lt;/button&gt;
&lt;button id="reset"&gt;恢复&lt;/button&gt;
&lt;div id="box" style="position:relative;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#reset').click(function(){
    history.go();
})
$('#btn1').click(function(event){
  $('#box').animate({'left':'300px'},1000).animate({'width':'100px'},1000);
});
$('#btn2').click(function(){
    $.fx.off = !$.fx.off;
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/jquery/control/c7.html" frameborder="0" width="320" height="240"></iframe>

【jQuery.fx.interval】

&emsp;&emsp;jQuery.fx.interval属性可以改变动画的频率，以毫秒为单位

&emsp;&emsp;这个属性可以设置动画每秒运行帧数，默认是13毫秒。该属性值越小，在速度较快的浏览器中，动画执行的越流畅，但是会影响程序的性能并且占用更多的CPU资源

&emsp;&emsp;注意：由于该属性是全局性的，因此在没有动画正在运行或停止所有动画时，此属性的变化才能生效

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn1"&gt;开始动画&lt;/button&gt;
&lt;button id="btn2"&gt;改变动画频率&lt;/button&gt;
&lt;button id="reset"&gt;恢复&lt;/button&gt;
&lt;div id="box" style="position:relative;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#reset').click(function(){
    history.go();
})
$('#btn1').click(function(event){
  $('#box').animate({'left':'300px'},1000).animate({'width':'100px'},1000);
});
$('#btn2').click(function(){
    $.fx.interval = 100;
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/jquery/control/c8.html" frameborder="0" width="320" height="240"></iframe>