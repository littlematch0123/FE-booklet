# 深入理解定时器系列第一篇——理解setTimeout和setInterval

&emsp;&emsp;很长时间以来，定时器一直是javascript动画的核心技术。但是，关于定时器，人们通常只了解如何使用setTimeout()和setInterval()，对它们的内在运行机制并不理解，对于与预想不同的实际运行状况也无法解决。本文将详细介绍定时器的相关内容

&nbsp;

### setTimeout()

&emsp;&emsp;setTimeout()方法用来指定某个函数或字符串在指定的毫秒数之后执行。它返回一个整数，表示定时器的编号，这个值可以传递给clearTimeout()用于取消这个函数的执行

&emsp;&emsp;以下代码中，控制台先输出0，大概过1000ms即1s后，输出定时器setTimeout()方法的返回值1

<div>
<pre>var Timer = setTimeout(function(){
    console.log(Timer);
},1000);
console.log(0);</pre>
</div>

&emsp;&emsp;也可以写成字符串参数的形式，由于这种形式会造成javascript引擎两次解析，降低性能，故不建议使用

<div>
<pre>var Timer = setTimeout('console.log(Timer);',1000);
console.log(0);</pre>
</div>

&emsp;&emsp;如果省略setTimeout的第二个参数，则该参数默认为0

&emsp;&emsp;以下代码中，控制台出现0和1，但是0却在前面，后面会解释这个疑问

<div>
<pre>var Timer = setTimeout(function(){
    console.log(Timer);
});
console.log(0);</pre>
</div>

![timer1](https://pic.xiaohuochai.site/blog/JS_BOM_timer1.jpg)

&emsp;&emsp;实际上，除了前两个参数，setTimeout()方法还允许添加更多的参数，它们将被传入定时器中的函数中

&emsp;&emsp;以下代码中，控制台大概过1000ms即1s后，输出2，而IE9-浏览器只允许setTimeout有两个参数，不支持更多的参数，会在控制台输出NaN

<div>
<pre>setTimeout(function(a,b){
  console.log(a+b);
},1000,1,1);</pre>
</div>

&emsp;&emsp;可以使用IIFE传参来兼容IE9-浏览器的函数传参

<div>
<pre>setTimeout((function(a,b){
    return function(){
        console.log(a+b);
    }
})(1,1),1000);</pre>
</div>

&emsp;&emsp;或者将函数写在定时器外面，然后函数在定时器中的匿名函数中带参数调用

<div>
<pre>function test(a,b){
    console.log(a+b);
}
setTimeout(function(){
    test(1,1);
},1000);</pre>
</div>

&emsp;&emsp;注意：IE8-浏览器不允许向定时器中传递事件对象event，如果要使用事件对象中的某些属性，可以将其保存在变量中传递进去

<div>
<pre>div.onclick = function(e){
    e = e || event;
    var type = e.type;
    setTimeout(function(){
        console.log(type);//click
        console.log(e.type);//报错
    })
}</pre>
</div>

**this指向**

&emsp;&emsp;在[this机制系列](http://www.cnblogs.com/xiaohuochai/p/5735901.html)已经详细介绍过this指向的4种绑定规则，由于定时器中的this存在[隐式丢失](http://www.cnblogs.com/xiaohuochai/p/5735901.html#anchor3)的情况，且极易出错，因此在这里再次进行说明

<div>
<pre>var a = 0;
function foo(){
    console.log(this.a);
};
var obj = {
    a : 2,
    foo:foo
}
setTimeout(obj.foo,100);//0</pre>
</div>
<div>
<pre>//等价于
var a = 0;
setTimeout(function foo(){
    console.log(this.a);
},100);//0</pre>
</div>

&emsp;&emsp;若想获得obj对象中的a属性值，可以将obj.foo函数放置在定时器中的匿名函数中进行[隐式绑定](http://www.cnblogs.com/xiaohuochai/p/5735901.html#anchor2)

<div>
<pre>var a = 0;
function foo(){
    console.log(this.a);
};
var obj = {
    a : 2,
    foo:foo
}
setTimeout(function(){
    obj.foo();
},100);//2</pre>
</div>

&emsp;&emsp;或者也可以使用bind方法将foo()方法的this绑定到obj上

<div>
<pre>var a = 0;
function foo(){
    console.log(this.a);
};
var obj = {
    a : 2,
    foo:foo
}
setTimeout(obj.foo.bind(obj),100);//2</pre>
</div>

**clearTimeout()**

&emsp;&emsp;setTimeout函数返回一个表示计数器编号的整数值，将该整数传入clearTimeout函数，取消对应的定时器

<div>
<pre>//过100ms后，控制台输出setTimeout()方法的返回值1
var Timer = setTimeout(function(){
    console.log(Timer);
},100);</pre>
</div>

&emsp;&emsp;于是可以利用这个值来取消对应的定时器

<div>
<pre>var Timer = setTimeout(function(){
    console.log(Timer);
},100);
clearTimeout(Timer);</pre>
</div>

&emsp;&emsp;或者直接使用返回值作为参数

<div>
<pre>var Timer = setTimeout(function(){
    console.log(Timer);
},100);
clearTimeout(1);</pre>
</div>

&emsp;&emsp;一般来说，setTimeout返回的整数值是连续的，也就是说，第二个setTimeout方法返回的整数值比第一个的整数值大1

<div>
<pre>//控制台输出1、2、3
var Timer1 = setTimeout(function(){
    console.log(Timer1);
},100);
var Timer2 = setTimeout(function(){
    console.log(Timer2);
},100);
var Timer3 = setTimeout(function(){
    console.log(Timer3);
},100);</pre>
</div>

&nbsp;

### setInterval()

&emsp;&emsp;setInterval的用法与setTimeout完全一致，区别仅仅在于setInterval指定某个任务每隔一段时间就执行一次，也就是无限次的定时执行

<div>
<pre>&lt;button id="btn"&gt;0&lt;/button&gt;
&lt;script&gt;
var timer = setInterval(function(){
    btn.innerHTML = Number(btn.innerHTML) + 1;
},1000);
btn.onclick = function(){
    clearInterval(timer);
    btn.innerHTML = 0;
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/setTimeoutAndSetInterval/s1.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;注意：HTML5标准规定，setTimeout的最短时间间隔是4毫秒；setInterval的最短间隔时间是10毫秒，也就是说，小于10毫秒的时间间隔会被调整到10毫秒

&emsp;&emsp;大多数电脑显示器的刷新频率是60HZ，大概相当于每秒钟重绘60次。因此，最平滑的动画效的最佳循环间隔是1000ms/60，约等于16.6ms

&emsp;&emsp;为了节电，对于那些不处于当前窗口的页面，浏览器会将时间间隔扩大到1000毫秒。另外，如果笔记本电脑处于电池供电状态，Chrome和IE10+浏览器，会将时间间隔切换到系统定时器，大约是16.6毫秒

&nbsp;

### 运行机制

&emsp;&emsp;下面来解释前面部分遗留的疑问，为什么下面代码的控制台结果中，0出现在1的前面呢？

<div>
<pre>setTimeout(function(){
    console.log(1);
});
console.log(0);</pre>
</div>

&emsp;&emsp;实际上，把setTimeout的第二个参数设置为0s，并不是立即执行函数的意思，只是把函数放入异步队列。浏览器先执行完同步队列里的任务，才会去执行异步队列中的任务

&emsp;&emsp;在下面这个例子中，给一个按钮btn设置了一个事件处理程序。事件处理程序设置了一个250ms后调用的定时器。点击该按钮后，首先将onclick事件处理程序加入队列。该程序执行后才设置定时器，再有250ms后，指定的代码才被添加到队列中等待执行

<div>
<pre>btn.onclick = function(){
    setTimeout(function(){
        console.log(1);
    },250);
}</pre>
</div>

&emsp;&emsp;如果上面代码中的onclick事件处理程序执行了300ms，那么定时器的代码至少要在定时器设置之后的300ms后才会被执行。队列中所有的代码都要等到javascript进程空闲之后才能执行，而不管它们是如何添加到队列中的

![](http://images2015.cnblogs.com/blog/740839/201608/740839-20160815202409890-566459084.jpg)

&emsp;&emsp;如图所示，尽管在255ms处添加了定时器代码，但这时候还不能执行，因为onclick事件处理程序仍在运行。定时器代码最早能执行的时机是在300ms处，即onclick事件处理程序结束之后

**setInterval()的问题**

&emsp;&emsp;使用setInterval()的问题在于，定时器代码可能在代码再次被添加到队列之前还没有完成执行，结果导致定时器代码连续运行好几次，而之间没有任何停顿。而javascript引擎对这个问题的解决是：当使用setInterval()时，仅当没有该定时器的任何其他代码实例时，才将定时器代码添加到队列中。这确保了定时器代码加入到队列中的最小时间间隔为指定间隔

&emsp;&emsp;但是，这样会导致两个问题：1、某些间隔被跳过；2、多个定时器的代码执行之间的间隔可能比预期的小

&emsp;&emsp;假设，某个onclick事件处理程序使用setInterval()设置了200ms间隔的定时器。如果事件处理程序花了300ms多一点时间完成，同时定时器代码也花了差不多的时间，就会同时出现跳过某间隔的情况

![setInterval](https://pic.xiaohuochai.site/blog/JS_BOM_setInterval.jpg)

&emsp;&emsp;例子中的第一个定时器是在205ms处添加到队列中的，但是直到过了300ms处才能执行。当执行这个定时器代码时，在405ms处又给队列添加了另一个副本。在下一个间隔，即605ms处，第一个定时器代码仍在运行，同时在队列中已经有了一个定时器代码的实例。结果是，在这个时间点上的定时器代码不会被添加到队列中

**迭代setTimeout**

&emsp;&emsp;为了避免setInterval()定时器的问题，可以使用链式setTimeout()调用

<div>
<pre>setTimeout(function fn(){
    setTimeout(fn,interval);
},interval);</pre>
</div>

&emsp;&emsp;这个模式链式调用了setTimeout()，每次函数执行的时候都会创建一个新的定时器。第二个setTimeout()调用当前执行的函数，并为其设置另外一个定时器。这样做的好处是，在前一个定时器代码执行完之前，不会向队列插入新的定时器代码，确保不会有任何缺失的间隔。而且，它可以保证在下一次定时器代码执行之前，至少要等待指定的间隔，避免了连续的运行

&emsp;&emsp;使用setInterval()

<div>
<pre>&lt;div id="myDiv" style="height: 100px;width: 100px;background-color: pink;position:absolute;left:0;"&gt;&lt;/div&gt;
&lt;script&gt;
myDiv.onclick = function(){
    var timer = setInterval(function(){
        if(parseInt(myDiv.style.left) &gt; 200){
            clearInterval(timer);
            return false;
        }
        myDiv.style.left = parseInt(myDiv.style.left) + 5 + 'px';
    },16);    
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/js/setTimeoutAndSetInterval/s2.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;使用链式setTimeout()

<div>
<pre>&lt;div id="myDiv" style="height: 100px;width: 100px;background-color: pink;position:absolute;left:0;"&gt;&lt;/div&gt;
&lt;script&gt;
myDiv.onclick = function(){
    setTimeout(function fn(){
        if(parseInt(myDiv.style.left) &lt;= 200){
            setTimeout(fn,16);    
        }else{
            return false;
        }
        myDiv.style.left = parseInt(myDiv.style.left) + 5 + 'px';    
    },16);    
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/js/setTimeoutAndSetInterval/s3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;


### 应用

&emsp;&emsp;使用定时器来调整事件发生顺序

&emsp;&emsp;【1】网页开发中，某个事件先发生在子元素，然后冒泡到父元素，即子元素的事件回调函数，会早于父元素的事件回调函数触发。如果，我们先让父元素的事件回调函数先发生，就要用到setTimeout(f, 0)

&emsp;&emsp;正常情况下，点击div元素，先弹出0，再弹出1

<div>
<pre>&lt;div id="myDiv" style="height: 100px;width: 100px;background-color: pink;"&gt;&lt;/div&gt;
&lt;script&gt;
myDiv.onclick = function(){
    alert(0);
}
document.onclick = function(){
    alert(1);
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/js/setTimeoutAndSetInterval/s4.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;如果进行想让document的onclick事件先发生，即点击div元素，先弹出1，再弹出0。则进行如下设置

<div>
<pre>&lt;div id="myDiv" style="height: 100px;width: 100px;background-color: pink;"&gt;&lt;/div&gt;
&lt;script&gt;
myDiv.onclick = function(){
    setTimeout(function(){
        alert(0);
    })
}
document.onclick = function(){
    alert(1);
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/js/setTimeoutAndSetInterval/s5.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;【2】用户自定义的回调函数，通常在浏览器的默认动作之前触发。比如，用户在输入框输入文本，keypress事件会在浏览器接收文本之前触发。因此，下面的回调函数是达不到目的

<div>
<pre>&lt;input type="text" id="myInput"&gt;
&lt;script&gt;
myInput.onkeypress = function(event) {
  this.value = this.value.toUpperCase();
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/setTimeoutAndSetInterval/s6.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;上面代码想在用户输入文本后，立即将字符转为大写。但是实际上，它只能将上一个字符转为大写，因为浏览器此时还没接收到文本，所以this.value取不到最新输入的那个字符

&emsp;&emsp;只有用setTimeout改写，上面的代码才能发挥作用

<div>
<pre>&lt;input type="text" id="myInput"&gt;
&lt;script&gt;
myInput.onkeypress = function(event) {
    setTimeout(function(){
        myInput.value = myInput.value.toUpperCase();
    });
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/setTimeoutAndSetInterval/s7.html" frameborder="0" width="320" height="240"></iframe>