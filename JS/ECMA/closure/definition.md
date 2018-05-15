# 深入理解闭包系列第一篇——到底什么才是闭包

&emsp;&emsp;闭包已经成为近乎神话的概念，它非常重要又难以掌握，而且还难以定义。本文就从闭包的定义说开去

&nbsp;

### 古老定义

&emsp;&emsp;闭包(closure)，是指函数变量可以保存在函数作用域内，因此看起来是函数将变量&ldquo;包裹&rdquo;了起来

&emsp;&emsp;那这样说来，包含变量的函数就是闭包

<div>
<pre>//按照古老定义，包含变量n的函数foo就是闭包
function foo() {
    var n = 0;
}
console.log(n)//Uncaught ReferenceError: n is not defined</pre>
</div>

&nbsp;

### 定义一

&emsp;&emsp;闭包是指可以访问其所在作用域的函数

&emsp;&emsp;那这样说来，需要通过作用域链查找变量的函数就是闭包

<div>
<pre>//按照定义一的说法，需要通过作用域链在全局环境中查找变量n的函数foo()就是闭包
var n = 0;
function foo() {
    console.log(n)//0
}
foo();</pre>
</div>

&nbsp;

### 定义二

&emsp;&emsp;闭包是指有权访问另一个函数作用域中的变量的函数

&emsp;&emsp;那这样说来，访问上层函数的作用域的内层函数就是闭包

<div>
<pre>//按照定义二的说法，嵌套在foo函数里的bar函数就是闭包
function foo(){
    var a = 2;
    function bar(){
        console.log(a); // 2
    }
    bar();
}
foo();</pre>
</div>

&nbsp;

### 定义三

&emsp;&emsp;闭包是指在函数声明时的作用域以外的地方被调用的函数

&emsp;&emsp;在函数声明时的作用域以外的地方调用函数，需要通过将该函数作为返回值或者作为参数被传递

【1】返回值

<div>
<pre>//按照定义三的说法，在foo()函数的作用域中声明，在全局环境的作用域中被调用的bar()函数是闭包
function foo(){
    var a = 2;
    function bar(){
        console.log(a); //2
    }
    return bar;
}
foo()();</pre>
</div>

&emsp;&emsp;可以简写为如下表示：

<div>
<pre>function foo(){
    var a = 2;
    return function(){
        console.log(a);//2
    }
}
foo()();</pre>
</div>

【2】参数

<div>
<pre>//按照定义三的说法，在foo()函数的作用域中声明，在bar()函数的作用域中被调用的baz()函数是闭包
function foo(){
    var a = 2;
    function baz(){
        console.log(a); //2
    }
    bar(baz);
}
function bar(fn){
    fn();
}</pre>
</div>

&emsp;&emsp;因此，无论通过何种手段，只要将内部函数传递到所在的词法作用域以外，它都会持有对原始作用域的引用，无论在何处执行这个函数都会使用闭包

&nbsp;

### IIFE

&emsp;&emsp;IIFE是不是闭包呢？

&emsp;&emsp;foo()函数在全局作用域定义，也在全局作用域被立即调用，如果按照定义一的说法来说，它是闭包。如果按照定义二和定义三的说法，它又不是闭包

<div>
<pre>var a = 2;
(function foo(){
    console.log(a);//2
})();</pre>
</div>

&emsp;&emsp;还有一个更重要的原因是，在requireJS出现之前，实现模块化编程主要通过IIFE，而在IIFE中常见的操作就是通过window.fn = fn来暴露接口，而这个fn就是闭包，而IIFE只是一个包含闭包的函数调用

<div>
<pre>(function(){
    var a = 0;
    function fn(){
        console.log(a); 
    }
    window.fn = fn;
})()
fn();</pre>
</div>

&nbsp;

## 最后

&emsp;&emsp;闭包定义之所以混乱，我觉得与经典书籍的不同解读有关。经典定义是犀牛书的原话，定义二是高程的原话

&emsp;&emsp;但，归纳起来就是关于一个函数要成为一个闭包到底需要满意几个条件

&emsp;&emsp;严格来说，闭包需要满足三个条件：【1】访问所在作用域；【2】函数嵌套；【3】在所在作用域外被调用

&emsp;&emsp;有些人觉得只满足条件1就可以，所以IIFE是闭包；有些人觉得满足条件1和2才可以，所以被嵌套的函数才是闭包；有些人觉得3个条件都满足才可以，所以在作用域以外的地方被调用的函数才是闭包

&emsp;&emsp;问题是，谁是权威呢？

