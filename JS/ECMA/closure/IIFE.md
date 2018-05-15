# 深入理解闭包系列第三篇——IIFE

&emsp;&emsp;严格来讲，IIFE并不是[闭包](http://www.cnblogs.com/xiaohuochai/p/5728577.html)，因为它并不满足函数成为闭包的三个条件。但一般地，人们认为IIFE就是闭包，毕竟闭包有多个定义。本文将详细介绍IIFE的实现和用途

&nbsp;

### 实现

&emsp;&emsp;函数跟随一对圆括号()表示函数调用

<div>
<pre>//函数声明语句写法
function test(){};
test();

//函数表达式写法
var test = function(){};
test();</pre>
</div>

&emsp;&emsp;但有时需要在定义函数之后，立即调用该函数。这种函数就叫做立即执行函数，全称为立即调用的函数表达式IIFE(Imdiately Invoked Function Expression)

&emsp;&emsp;注意：javascript引擎规定，如果function关键字出现在行首，一律解释成函数声明语句

&emsp;&emsp;【1】函数声明语句需要一个函数名，由于没有函数名，所以报错

<div>
<pre>//SyntaxError: Unexpected token (
function(){}();</pre>
</div>

&emsp;&emsp;【2】函数声明语句后面加上一对圆括号，只是函数声明语句与[分组操作符](http://www.cnblogs.com/xiaohuochai/p/5669107.html#anchor4)的组合而已。由于分组操作符不能为空，所以报错

<div>
<pre>//SyntaxError: Unexpected token )
function foo(){}();
//等价于
function foo(){};
();//SyntaxError: Unexpected token )</pre>
</div>

&emsp;&emsp;【3】函数声明语句加上一对有值的圆括号，也仅仅是函数声明语句与不报错的分组操作符的组合而已

<div>
<pre>function foo(){}(1);
//等价于
function foo(){};
(1);</pre>
</div>

&emsp;&emsp;所以，解决方法就是不要让function出现在行首，让引擎将其理解成一个表达式

**最常用的两种办法**

<div>
<pre>(function(){ /* code */ }()); 
(function(){ /* code */ })(); </pre>
</div>

**其他写法**

<div>
<pre>var i = function(){ return 10; }();
true &amp;&amp; function(){ /* code */ }();
0, function(){ /* code */ }();
!function(){ /* code */ }();
~function(){ /* code */ }();
-function(){ /* code */ }();
+function(){ /* code */ }();
new function(){ /* code */ };
new function(){ /* code */ }(); </pre>
</div>

&nbsp;

### 作用域

&emsp;&emsp;对于IIFE来说，通过作用域链来查找变量与普通函数有一些不同的地方

【with】

&emsp;&emsp;with语句中的IIFE会先在with语句中查找，然后再向上查找。在下列代码中，标准浏览器下f()函数和IIFE都返回'bar'，但IE10-浏览器中的f()函数返回'abc'

<div>
<pre>var foo = "abc";
with({
    foo:"bar"
}){
    function f(){
        console.log(foo);
    };
    (function(){
        console.log(foo);
    })();
    f();
}</pre>
</div>

【try-catch】

&emsp;&emsp;在下列代码中，标准浏览器下f()函数和IIFE都返回'error'，但IE10-浏览器中的f()函数返回'10'

<div>
<pre>try{
    var e = 10;
    throw new Error();
}catch(e){
    function f(){
        console.log(e);
    }
    (function (){
        console.log(e);
    })();
    f();
}</pre>
</div>

【具名函数表达式】

&emsp;&emsp;在下列代码中，标准浏览器下a()函数返回1，而IIFE返回a函数代码；但IE8-浏览器中，二者都返回1

<div>
<pre>function a(){
    a = 1;
    console.log(a);
};
a();
(function a(){
    a = 1;
    console.log(a);
})();</pre>
</div>

&nbsp;

### 用途

&emsp;&emsp;IIFE一般用于构造私有变量，避免全局空间污染

&emsp;&emsp;接下来用一个需求实现来更直观地说明IIFE的用途。假设有一个需求，每次调用函数，都返回加1的一个数字(数字初始值为0)

【1】全局变量

&emsp;&emsp;一般情况下，我们会使用全局变量来保存该数字状态

<div>
<pre>var a = 0;
function add(){
    return ++a;
}
console.log(add());//1
console.log(add());//2</pre>
</div>

【2】自定义属性

&emsp;&emsp;但上面的方法中，变量a实际上只和add函数相关，却声明为全局变量，不太合适。

&emsp;&emsp;将变量a更改为函数的自定义属性更为恰当

<div>
<pre>function add(){
    return ++add.count;
}
add.count = 0;
console.log(add());//1
console.log(add());//2</pre>
</div>

【3】IIFE

&emsp;&emsp;其实这样做，还是有问题。有些代码可能会无意中将add.count重置

&emsp;&emsp;使用IIFE把计数器变量保存为私有变量更安全，同时也可以减少对全局空间的污染

<div>
<pre>var add = (function(){
    var counter = 0;
    return function(){
        return ++counter; 
    }
})();
console.log(add())//1
console.log(add())//2    </pre>
</div>

&nbsp;

### 注意事项

&emsp;&emsp;执行如下代码会报错，提示此时的a是undefined

<div>
<pre>var a = function(){
    return 1;
}
(function(){
    console.log(a());//报错
})();</pre>
</div>

&emsp;&emsp;这是因为没有加分号，浏览器将上面代码解释成如下所示

<div>
<pre>var a = function(){
    return 1;
}(function(){
    console.log(a());//报错
})();</pre>
</div>

&emsp;&emsp;如果加上分号，就不会出错了

<div>
<pre>var a = function(){
    return 1;
};
(function(){
    console.log(a());//1
})();</pre>
</div>
