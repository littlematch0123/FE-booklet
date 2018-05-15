# 深入理解闭包系列第四篇——常见的一个循环和闭包的错误详解

&emsp;&emsp;关于常见的一个[循环](http://www.cnblogs.com/xiaohuochai/p/5673241.html#anchor2)和[闭包](http://www.cnblogs.com/xiaohuochai/p/5730085.html)的错误，很多资料对此都有文字解释，但还是难以理解。本文将以[执行环境](http://www.cnblogs.com/xiaohuochai/p/5722905.html)图示的方式来对此进行更直观的解释，以及对此类需求进行推衍，得到更合适的解决办法

&nbsp;

### 犯错

<div>
<pre>function foo(){
    var arr = [];
    for(var i = 0; i &lt; 2; i++){
        arr[i] = function(){
            return i;
        }
    }
    return arr;
}
var bar = foo();
console.log(bar[0]());//2    </pre>
</div>

&emsp;&emsp;以上代码的运行结果是2，而不是预想的0。接下来用执行环境图示的方法，详解到底是哪里出了问题

![commonError1](https://pic.xiaohuochai.site/blog/JS_ECMA_grammer_commonError1.png)

&emsp;&emsp;执行流首先创建并进入全局执行环境，进行[声明提升](http://www.cnblogs.com/xiaohuochai/p/5700590.html)过程。执行流执行到第10行，创建并进入foo()函数执行环境，并进行声明提升。然后执行第2行，将arr赋值为[]。然后执行第3行，给arr[0]和arr[1]都赋值为一个匿名函数。然后执行第8行，以arr的值为返回值退出函数。由于此时有闭包的存在，所以foo()执行环境并不会被销毁

![commonError2](https://pic.xiaohuochai.site/blog/JS_ECMA_grammer_commonError2.jpg)

&emsp;&emsp;执行流进入全局执行环境，继续执行第10行，将函数的返回值arr赋值给bar

![commonError3](https://pic.xiaohuochai.site/blog/JS_ECMA_grammer_commonError3.jpg)

&emsp;&emsp;执行流执行第11行，访问bar的第0个元素并执行。此时，执行流创建并进入匿名函数执行环境，匿名函数中存在[自由变量](http://www.cnblogs.com/xiaohuochai/p/5722905.html#anchor2)i，需要使用其作用域链匿名函数 -&gt; foo()函数 -&gt; 全局作用域进行查找，最终在foo()函数的作用域找到了i，然后在foo()函数的执行环境中找到了i的值2，于是给i赋值2

![commonError4](https://pic.xiaohuochai.site/blog/JS_ECMA_grammer_commonError4.jpg)

&emsp;&emsp;执行流接着执行第5行，以i的值2作为返回值返回。同时销毁匿名函数的执行环境。执行流进入全局执行环境，接着执行第11行，调用内部对象console，并找到其方法log，将bar[0]()的值2作为参数放入该方法中，最终在控制台显示2

&emsp;&emsp;&nbsp;由此我们看出，犯错原因是在循环的过程中，并没有把函数的返回值赋值给数组元素，而仅仅是把函数赋值给了数组元素。这就使得在调用匿名函数时，通过作用域找到的执行环境中储存的变量的值已经不是循环时的瞬时索引值，而是循环执行完毕之后的索引值

&nbsp;

### IIFE

&emsp;&emsp;由此，可以利用[IIFE](http://www.cnblogs.com/xiaohuochai/p/5731016.html)传参和[闭包](http://www.cnblogs.com/xiaohuochai/p/5728577.html)来创建多个执行环境来保存循环时各个状态的索引值。因为[函数传参](http://www.cnblogs.com/xiaohuochai/p/5706289.html#anchor4)是按值传递的，不同参数的函数被调用时，会创建不同的[执行环境](http://www.cnblogs.com/xiaohuochai/p/5722905.html)

<div>
<pre>function foo(){
    var arr = [];
    for(var i = 0; i &lt; 2; i++){
        arr[i] = (function fn(j){
            return function test(){
                return j;
            }
        })(i);
    }
    return arr;
}
var bar = foo();
console.log(bar[0]());//0    </pre>
</div>

![commonError5](https://pic.xiaohuochai.site/blog/JS_ECMA_grammer_commonError5.png)

&nbsp;

### 块作用域

&emsp;&emsp;使用IIFE还是较为复杂，使用块作用域则更为方便

&emsp;&emsp;由于[块作用域](http://www.cnblogs.com/xiaohuochai/p/5701287.html)可以将索引值i重新绑定到了循环的每一个迭代中，确保使用上一个循环迭代结束时的值重新进行赋值，相当于为每一次索引值都创建一个执行环境

<div>
<pre>function foo(){
    var arr = [];
    for(let i = 0; i &lt; 2; i++){
        arr[i] = function(){
            return i;
        }
    }
    return arr;
}
var bar = foo();
console.log(bar[0]());//0    </pre>
</div>

&nbsp;

## 最后

&emsp;&emsp;在编程中，如果实际和预期结果不符，就按照代码顺序一步一步地把执行环境图示画出来，会发现很多时候就是在想当然

&emsp;&emsp;以上

