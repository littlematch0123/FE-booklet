# 深入理解javascript作用域系列第三篇——声明提升(hoisting)

&emsp;&emsp;一般认为，javascript代码在执行时是由上到下一行一行执行的。但实际上这并不完全正确，主要是因为声明提升的存在。本文是深入理解javascript作用域系列第三篇&mdash;&mdash;声明提升(hoisting)

&nbsp;

### 变量声明提升

<div>
<pre>a = 2 ;
var a;
console.log( a );</pre>
</div>

&emsp;&emsp;直觉上，会认为是undefined，因为var a声明在a = 2;之后，可能变量被重新赋值了，因为会被赋予默认值undefined。但是，真正的输出结果是2

<div>
<pre>console.log( a ) ;
var a  =  2 ;</pre>
</div>

&emsp;&emsp;鉴于上面的特点，可能会认为这个代码片段也会同样输出2。但，真正的输出结果是undefined

&emsp;&emsp;所有这些和观感相违背的原因是在于编译器的编译过程

&emsp;&emsp;[第一篇](http://www.cnblogs.com/xiaohuochai/p/5699739.html)介绍过作用域的内部原理。引擎会在解释javascript代码之前首先对其进行编译。编译阶段中的一部分工作就是找到所有的声明，并用合适的作用域将它们关联起来

&emsp;&emsp;包括变量和函数在内的所有声明都会在任何代码被执行前首先被处理

<div>
<pre>var a = 2 ;</pre>
</div>

&emsp;&emsp;这个代码片段实际上包括两个操作：var a 和 a = 2&nbsp;

&emsp;&emsp;第一个定义声明是在编译阶段由编译器进行的。第二个赋值操作会被留在原地等待引擎在执行阶段执行

<div>
<pre>//对变量a的声明提升到最上面后，再执行代码时，控制台输出2
var a;
a = 2 ;
console.log(a);</pre>
</div>

&emsp;&emsp;声明从它们在代码中出现的位置被&ldquo;移动&rdquo;到了最上面，这个过程就叫作提升(hoisting)

&emsp;&emsp;注意：每个作用域都会进行提升操作

<div>
<pre>console.log(a);
var a = 0;
function fn(){
    console.log(b);
    var b = 1;
    function test(){
        console.log(c);
        var c = 2;
    }
    test();
}
fn();</pre>
</div>
<div>
<pre>//变量声明提升后，变成下面这样
var a ;
console.log(a);
a = 0;
function fn(){
    var b;
    console.log(b);
    b = 1;
    function test(){
        var c ;
        console.log(c);
        c = 2;
    }
    test();
}
fn();</pre>
</div>

&nbsp;

### 函数声明提升

&emsp;&emsp;声明包括两种：变量声明和函数声明。不仅变量声明可以提升，函数声明也有提升操作

<div>
<pre>foo();
function foo(){
    console.log(1);//1
}</pre>
</div>

&emsp;&emsp;上面这个代码片段之所以能够在控制台输出1，就是因为foo()函数声明进行了提升，如下所示：

<div>
<pre>function foo(){
    console.log(1);
}
foo();</pre>
</div>

&emsp;&emsp;函数声明会提升，但函数表达式却不会提升&nbsp;

<div>
<pre>foo();
var foo = function(){
    console.log(1);//TypeError: foo is not a function
}</pre>
</div>

&emsp;&emsp;上面这段程序中的变量标识符foo被提升并分配给全局作用域，因此foo()不会导致ReferenceError。但是foo此时并没有赋值，foo()由于对undefined值进行函数调用而导致非法操作，因此会抛出TypeError异常

<div>
<pre>//变量提升后，代码如下所示：
var foo;
foo();
foo = function(){
    console.log(1);
}</pre>
</div>

&emsp;&emsp;即使是具名的函数表达式也无法被提升

<div>
<pre>foo();//TypeError: foo is not a function
var foo = function bar(){
      console.log(1);
};</pre>
</div>
<div>
<pre>//声明提升后，代码变为:
var foo;
foo();//TypeError: foo is not a function
foo = function bar(){
      console.log(1);
};</pre>
</div>

&emsp;&emsp;注意：函数表达式的名称只能在函数体内部使用，而不能在函数体外部使用

<div>
<pre>var bar;
var foo = function bar(){
    console.log(1);
};
bar();//TypeError: bar is not a function</pre>
</div>

&nbsp;

### 函数覆盖

&emsp;&emsp;函数声明和变量声明都会被提升。但是，函数声明会覆盖变量声明

<div>
<pre>var a;
function a(){}
console.log(a);//'function a(){}'</pre>
</div>

&emsp;&emsp;但是，如果变量存在赋值操作，则最终的值为变量的值

<div>
<pre>var a=1;
function a(){}
console.log(a);//1</pre>
</div>
<div>
<pre>var a;
function a(){};
console.log(a);//'function a(){}'
a = 1;
console.log(a);//1</pre>
</div>

&emsp;&emsp;注意：变量的重复声明是无用的，但函数的重复声明会覆盖前面的声明(无论是变量还是函数声明)

&emsp;&emsp;【1】变量的重复声明无用

<div>
<pre>var a = 1;
var a;
console.log(a);//1</pre>
</div>

&emsp;&emsp;【2】由于函数声明提升优先于变量声明提升，所以变量的声明无作用

<div>
<pre>var a;
function a(){
    console.log(1);
}
a();//1</pre>
</div>

&emsp;&emsp;【3】后面的函数声明会覆盖前面的函数声明

<div>
<pre>a();//2
function a(){
    console.log(1);
}
function a(){
    console.log(2);
}</pre>
</div>

&emsp;&emsp;所以，应该避免在同一作用域中重复声明

