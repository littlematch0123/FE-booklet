# 深入理解定时器系列第二篇——被誉为神器的requestAnimationFrame

&emsp;&emsp;与[setTimeout](http://www.cnblogs.com/xiaohuochai/p/5773183.html#anchor1)和[setInterval](http://www.cnblogs.com/xiaohuochai/p/5773183.html#anchor2)不同，requestAnimationFrame不需要设置时间间隔。这有什么好处呢？为什么requestAnimationFrame被称为神器呢？本文将详细介绍HTML5新增的定时器requestAnimationFrame

&nbsp;

### 引入

&emsp;&emsp;计时器一直是javascript动画的核心技术。而编写动画循环的关键是要知道延迟时间多长合适。一方面，循环间隔必须足够短，这样才能让不同的动画效果显得平滑流畅；另一方面，循环间隔还要足够长，这样才能确保浏览器有能力渲染产生的变化

&emsp;&emsp;大多数电脑显示器的刷新频率是60Hz，大概相当于每秒钟重绘60次。大多数浏览器都会对重绘操作加以限制，不超过显示器的重绘频率，因为即使超过那个频率用户体验也不会有提升。因此，最平滑动画的最佳循环间隔是1000ms/60，约等于16.6ms

&emsp;&emsp;而setTimeout和setInterval的问题是，它们都不精确。它们的内在[运行机制](http://www.cnblogs.com/xiaohuochai/p/5773183.html#anchor3)决定了时间间隔参数实际上只是指定了把动画代码添加到浏览器UI线程队列中以等待执行的时间。如果队列前面已经加入了其他任务，那动画代码就要等前面的任务完成后再执行

&emsp;&emsp;requestAnimationFrame采用系统时间间隔，保持最佳绘制效率，不会因为间隔时间过短，造成过度绘制，增加开销；也不会因为间隔时间太长，使用动画卡顿不流畅，让各种网页动画效果能够有一个统一的刷新机制，从而节省系统资源，提高系统性能，改善视觉效果

&nbsp;

### 特点

&emsp;&emsp;【1】requestAnimationFrame会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率

&emsp;&emsp;【2】在隐藏或不可见的元素中，requestAnimationFrame将不会进行重绘或回流，这当然就意味着更少的CPU、GPU和内存使用量

&emsp;&emsp;【3】requestAnimationFrame是由浏览器专门为动画提供的API，在运行时浏览器会自动优化方法的调用，并且如果页面不是激活状态下的话，动画会自动暂停，有效节省了CPU开销

&nbsp;

### 使用

&emsp;&emsp;requestAnimationFrame的用法与settimeout很相似，只是不需要设置时间间隔而已。requestAnimationFrame使用一个回调函数作为参数，这个回调函数会在浏览器重绘之前调用。它返回一个整数，表示定时器的编号，这个值可以传递给cancelAnimationFrame用于取消这个函数的执行

<div>
<pre>requestID = requestAnimationFrame(callback); </pre>
</div>
<div>
<pre>//控制台输出1和0
var timer = requestAnimationFrame(function(){
    console.log(0);
}); 
console.log(timer);//1</pre>
</div>

&emsp;&emsp;cancelAnimationFrame方法用于取消定时器

<div>
<pre>//控制台什么都不输出
var timer = requestAnimationFrame(function(){
    console.log(0);
}); 
cancelAnimationFrame(timer);</pre>
</div>

&emsp;&emsp;也可以直接使用返回值进行取消

<div>
<pre>var timer = requestAnimationFrame(function(){
    console.log(0);
}); 
cancelAnimationFrame(1);</pre>
</div>

&nbsp;

### 兼容

&emsp;&emsp;IE9-浏览器不支持该方法，可以使用setTimeout来兼容

【简单兼容】

<div>
<pre>if (!window.requestAnimationFrame) {
    requestAnimationFrame = function(fn) {
        setTimeout(fn, 17);
    };    
}</pre>
</div>

【严格兼容】

<div>
<pre>if(!window.requestAnimationFrame){
    var lastTime = 0;
    window.requestAnimationFrame = function(callback){
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0,16.7-(currTime - lastTime));
        var id  = window.setTimeout(function(){
            callback(currTime + timeToCall);
        },timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    }
}</pre>
</div>
<div>
<pre>if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}</pre>
</div>

&nbsp;

### 应用

&emsp;&emsp;现在分别使用setInterval、setTimeout和requestAnimationFrame这三个方法制作一个简单的进制度效果

【1】setInterval

<div>
<pre>&lt;div id="myDiv" style="background-color: lightblue;width: 0;height: 20px;line-height: 20px;"&gt;0%&lt;/div&gt;
&lt;button id="btn"&gt;run&lt;/button&gt;
&lt;script&gt;
var timer;
btn.onclick = function(){
    clearInterval(timer);
    myDiv.style.width = '0';
    timer = setInterval(function(){
        if(parseInt(myDiv.style.width) &lt; 500){
            myDiv.style.width = parseInt(myDiv.style.width) + 5 + 'px';
            myDiv.innerHTML =     parseInt(myDiv.style.width)/5 + '%';    
        }else{
            clearInterval(timer);
        }        
    },16);
}
&lt;/script&gt;</pre>
</div>

<iframe style="line-height: 1.5; width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/js/requestAnimationFrame/r1.html" frameborder="0" width="320" height="240"></iframe>

【2】setTimeout

<div>
<pre>&lt;div id="myDiv" style="background-color: lightblue;width: 0;height: 20px;line-height: 20px;"&gt;0%&lt;/div&gt;
&lt;button id="btn"&gt;run&lt;/button&gt;
&lt;script&gt;
var timer;
btn.onclick = function(){
    clearTimeout(timer);
    myDiv.style.width = '0';
    timer = setTimeout(function fn(){
        if(parseInt(myDiv.style.width) &lt; 500){
            myDiv.style.width = parseInt(myDiv.style.width) + 5 + 'px';
            myDiv.innerHTML =     parseInt(myDiv.style.width)/5 + '%';
            timer =&nbsp;setTimeout(fn,16);
        }else{
            clearTimeout(timer);
        }    
    },16);
}
&lt;/script&gt;</pre>
</div>

<iframe style="line-height: 1.5; width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/js/requestAnimationFrame/r2.html" frameborder="0" width="320" height="240"></iframe>

【3】requestAnimationFrame

<div>
<pre>&lt;div id="myDiv" style="background-color: lightblue;width: 0;height: 20px;line-height: 20px;"&gt;0%&lt;/div&gt;
&lt;button id="btn"&gt;run&lt;/button&gt;
&lt;script&gt;
var timer;
btn.onclick = function(){
    myDiv.style.width = '0';
    cancelAnimationFrame(timer);
    timer = requestAnimationFrame(function fn(){
        if(parseInt(myDiv.style.width) &lt; 500){
            myDiv.style.width = parseInt(myDiv.style.width) + 5 + 'px';
            myDiv.innerHTML =     parseInt(myDiv.style.width)/5 + '%';
            timer =&nbsp;requestAnimationFrame(fn);
        }else{
            cancelAnimationFrame(timer);
        }    
    });
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/js/requestAnimationFrame/r3.html" frameborder="0" width="320" height="240"></iframe>

