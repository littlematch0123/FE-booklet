# jQuery动画队列

&emsp;&emsp;队列实现是jQuery非常棒的一个拓展，使用动画队列可以使动画更容易实现。本文将详细介绍jQuery动画队列

&nbsp;

### queue()

&emsp;&emsp;queue()方法用来显示在匹配的元素上的已经执行的函数队列

**queue([queueName])**

&emsp;&emsp;queue()方法可以接受一个可选参数&mdash;&mdash;一个含有队列名的字符串。该参数默认是'fx'

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;开始动画&lt;/button&gt;
&lt;button id="reset"&gt;恢复&lt;/button&gt;
&lt;span id="result"&gt;&lt;/span&gt;
&lt;div id="box" style="position:relative;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#reset').click(function(){
    history.go();
})
$('#btn').click(function(event){
    setInterval(function(){
        $('#result').html('队列数是:' +$('#box').queue().length)
    },100)
  $('#box').animate({'left':'100px'},1000).animate({'width':'200px'},1000).animate({'left':'0'},1000).animate({'width':'100px'},1000);
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/jquery/queue/q1.html" frameborder="0" width="320" height="240"></iframe>

**queue(callback(next))**

&emsp;&emsp;queue()方法可以接受一个回调函数作为参数，表示将要添加到队列中的新函数

&emsp;&emsp;注意：queue()方法的回调函数中，可以进行样式变换等，但不可以增加动画效果

&emsp;&emsp;由下面代码执行结果可以看出，队列执行完函数后，队列后面的动画效果被停止，这时就需要用到下面要介绍的dequeue()方法

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;开始动画&lt;/button&gt;
&lt;button id="reset"&gt;恢复&lt;/button&gt;
&lt;span id="result"&gt;&lt;/span&gt;
&lt;div id="box" style="position:relative;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#reset').click(function(){
    history.go();
})
$('#btn').click(function(event){
    setInterval(function(){
        $('#result').html('队列数是:' +$('#box').queue().length)
    },100)
  $('#box').animate({'left':'100px'},1000).animate({'width':'200px'},1000);
  $('#box').queue(function(){
      $('#box').css('background','lightgreen');
  })
  $('#box').animate({'left':'0'},1000).animate({'width':'100px'},1000);
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/jquery/queue/q2.html" frameborder="0" width="320" height="240"></iframe>

### dequeue()

&emsp;&emsp;dequeue()方法用来执行匹配元素队列的下一个函数

**dequeue([queueName])**

&emsp;&emsp;dequeue()方法可以接受一个可选参数&mdash;&mdash;一个含有队列名的字符串，默认是fx

&emsp;&emsp;注意：dequeue()方法本身也算队列的一员

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;开始动画&lt;/button&gt;
&lt;button id="reset"&gt;恢复&lt;/button&gt;
&lt;span id="result"&gt;&lt;/span&gt;
&lt;div id="box" style="position:relative;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#reset').click(function(){
    history.go();
})
$('#btn').click(function(event){
    setInterval(function(){
        $('#result').html('队列数是:' +$('#box').queue().length)
    },100)
  $('#box').animate({'left':'100px'},1000).animate({'width':'200px'},1000);
  $('#box').queue(function(){
      $(this).css('background','lightgreen');
      $(this).dequeue();
  })
  $('#box').animate({'left':'0'},1000).animate({'width':'100px'},1000);

});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/jquery/queue/q3.html" frameborder="0" width="320" height="240"></iframe>

### clearQueue()

&emsp;&emsp;与deQueue()方法相反，clearQueue()方法用来从列队中移除所有未执行的项

&emsp;&emsp;注意：clearQueue()并不影响当前动画效果

**clearQueue([queueName])**

&emsp;&emsp;clearQueue()方法可以接受一个可选参数&mdash;&mdash;一个含有队列名的字符串，默认是fx

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;开始动画&lt;/button&gt;
&lt;button id="btn1"&gt;停止动画&lt;/button&gt;
&lt;button id="reset"&gt;恢复&lt;/button&gt;
&lt;span id="result"&gt;&lt;/span&gt;
&lt;div id="box" style="position:relative;height: 100px;width: 300px;background-color: lightblue"&gt;&lt;/div&gt;
&lt;script&gt;
$('#reset').click(function(){
    history.go();
})
$('#btn').click(function(event){
    setInterval(function(){
        $('#result').html('队列数是:' +$('#box').queue().length)
    },100)
  $('#box').animate({'left':'100px'},1000).animate({'width':'200px'},1000);
  $('#box').queue(function(){
      $(this).css('background','lightgreen');
      $(this).dequeue();
  })
  $('#box').animate({'left':'0'},1000).animate({'width':'100px'},1000);
});
$('#btn1').click(function(event){
    $('#box').clearQueue();
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/jquery/queue/q4.html" frameborder="0" width="320" height="240"></iframe>