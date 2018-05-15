# 深入理解闭包系列第二篇——从执行环境角度看闭包

&emsp;&emsp;本文从[执行环境](http://www.cnblogs.com/xiaohuochai/p/5722905.html)的角度来分析闭包，先用一张图开宗明义，然后根据图示内容对代码进行逐行说明，试图对闭包进行更直观的解释

&nbsp;

### 图示

![closure1](https://pic.xiaohuochai.site/blog/JS_ECMA_grammer_closure1.png)

&nbsp;

### 说明

&emsp;&emsp;下面按照代码执行流的顺序对该图示进行详细说明

<div>
<pre>function foo(){
    var a = 2;
    function bar(){
        console.log(a);
    }
    return bar;
}
var baz = foo();
baz();</pre>
</div>

&emsp;&emsp;【1】代码执行流进入全局执行环境，并对全局执行环境中的代码进行[声明提升(hoisting)](http://www.cnblogs.com/xiaohuochai/p/5700590.html)

![closure2](https://pic.xiaohuochai.site/blog/JS_ECMA_grammer_closure2.jpg)

&emsp;&emsp;【2】执行流执行第9行代码var baz = foo();，调用foo()函数，此时执行流进入foo()函数执行环境中，对该执行环境中的代码进行声明提升过程。此时执行环境栈中存在两个执行环境，foo()函数为当前执行流所在执行环境

![closure3](https://pic.xiaohuochai.site/blog/JS_ECMA_grammer_closure3.jpg)

&emsp;&emsp;【3】执行流执行第2行代码var a = 2;，对a进行LHS查询，给a赋值2

![closure4](https://pic.xiaohuochai.site/blog/JS_ECMA_grammer_closure4.jpg)

&emsp;&emsp;【4】执行流执行第7行代码return bar;，将bar()函数作为返回值返回。按理说，这时foo()函数已经执行完毕，应该销毁其执行环境，等待垃圾回收。但因为其返回值是bar函数。bar函数中存在[自由变量](http://www.cnblogs.com/xiaohuochai/p/5722905.html#anchor2)a，需要通过作用域链到foo()函数的执行环境中找到变量a的值，所以虽然foo函数的执行环境被销毁了，但其变量对象不能被销毁，只是从活动状态变成非活动状态；而全局执行环境的变量对象则变成活动状态；执行流继续执行第9行代码var baz = foo();，把foo()函数的返回值bar函数赋值给baz

![closure5](https://pic.xiaohuochai.site/blog/JS_ECMA_grammer_closure5.jpg)

&emsp;&emsp;【5】执行流执行第10行代码baz();，通过在全局执行环境中查找baz的值，baz保存着foo()函数的返回值bar。所以这时执行baz()，会调用bar()函数，此时执行流进入bar()函数执行环境中，对该执行环境中的代码进行声明提升过程。此时执行环境栈中存在三个执行环境，bar()函数为当前执行流所在执行环境

&emsp;&emsp;在声明提升的过程中，由于a是个自由变量，需要通过bar()函数的作用域链bar() -&gt; foo() -&gt; 全局作用域进行查找，最终在foo()函数中也就是代码第2行找到var a = 2;，然后在foo()函数的执行环境中找到a的值是2，所以给a赋值2

![closure6](https://pic.xiaohuochai.site/blog/JS_ECMA_grammer_closure6.jpg)

&emsp;&emsp;【6】执行流执行第5行代码console.log(a);，调用内部对象console，并从console对象中log方法，将a作为参数传递进入。从bar()函数的执行环境中找到a的值是2，所以，最终在控制台显示2

![closure7](https://pic.xiaohuochai.site/blog/JS_ECMA_grammer_closure7.jpg)

&emsp;&emsp;【7】执行流执行第6行代码}，bar()的执行环境被弹出执行环境栈，并被销毁，等待垃圾回收，控制权交还给全局执行环境

![closure8](https://pic.xiaohuochai.site/blog/JS_ECMA_grammer_closure8.jpg)

&emsp;&emsp;【8】当页面关闭时，所有的执行环境都被销毁

&nbsp;

### 总结

&emsp;&emsp;从上述说明的第5步可以看出，由于闭包bar()函数的原因，虽然foo()函数的执行环境销毁了，但其变量对象一直存在于内存中，就是为了能够使得调用bar()函数时，可以通过作用域链访问到父函数foo()，并得到其变量对象中储存的变量值。直到页面关闭，foo()函数的变量对象才会和全局的变量对象一起被销毁，从而释放内存空间

&emsp;&emsp;由于闭包占用内存空间，所以要谨慎使用闭包。尽量在使用完闭包后，及时解除引用，以便更早释放内存

<div>
<pre>//通过将baz置为null，解除引用
function foo(){
    var a = 2;
    function bar(){
        console.log(a);//2
    }
    return bar;
}
var baz = foo();
baz();        
baz = null;
/*后续代码*/</pre>
</div>
