# 深入理解this机制系列第三篇——箭头函数

&emsp;&emsp;[this机制](http://www.cnblogs.com/xiaohuochai/p/5735901.html)与[函数调用](http://www.cnblogs.com/xiaohuochai/p/5702813.html#anchor3)有关，而[作用域](http://www.cnblogs.com/xiaohuochai/p/5699739.html)则与[函数定义](http://www.cnblogs.com/xiaohuochai/p/5702813.html#anchor1)有关。有没有什么是可以将this机制和作用域联系起来的呢？本文将介绍ES6新增的内容&mdash;&mdash;箭头函数

&nbsp;

### 痛点

&emsp;&emsp;对于[闭包](http://www.cnblogs.com/xiaohuochai/p/5728577.html)的痛点在于，闭包的this默认绑定到window对象，但又常常需要访问嵌套函数的this，所以常常在嵌套函数中使用var that = this，然后在闭包中使用that替代this，使用作用域查找的方法来找到嵌套函数的this值

<div>
<pre>var a = 0;
function foo(){
    function test(){
        console.log(this.a);
    }
    return test;
};
var obj = {
    a : 2,
    foo:foo
}
obj.foo()();//0</pre>
</div>
<div>
<pre>var a = 0;
function foo(){
    var that = this;
    function test(){
        console.log(that.a);
    }
    return test;
};
var obj = {
    a : 2,
    foo:foo
}
obj.foo()();//2</pre>
</div>

&nbsp;

### 解决

&emsp;&emsp;而箭头函数的出现就可以很好的解决该问题。箭头函数根据当前的[词法作用域](http://www.cnblogs.com/xiaohuochai/p/5700095.html)而不是根据[this机制顺序](http://www.cnblogs.com/xiaohuochai/p/5737435.html)来决定this，所以，箭头函数会继承外层函数调用的this绑定，而无论this绑定到什么

<div>
<pre>var test = () =&gt; {
    console.log(this.a);
}
//形式上等价于
var test = function(){
    console.log(this.a);
}
//实质上等价于
function fn(){
    var that = this;
    var test = function(){
        console.log(that.a);
    }
}</pre>
</div>
<div>
<pre>var a = 0;
function foo(){
    var test = () =&gt; {
        console.log(this.a);
    }
    return test;
};
var obj = {
    a : 2,
    foo:foo
}
obj.foo()();//2</pre>
</div>

&nbsp;

### 基本用法

&emsp;&emsp;ES6允许使用&ldquo;箭头&rdquo;(=&gt;)定义函数，一般称为胖箭头

<div>
<pre>var f = v =&gt; v;
console.log(f(1));//1
//等同于
var f = function(v) {
  return v;
};
console.log(f(1));//1</pre>
</div>

&emsp;&emsp;如果箭头函数不需要[参数](http://www.cnblogs.com/xiaohuochai/p/5706289.html)或需要多个参数，就使用一个圆括号代表参数部分

<div>
<pre>var f = () =&gt; 5;
// 等同于
var f = function () { return 5 };
var sum = (num1, num2) =&gt; num1 + num2;
// 等同于
var sum = function(num1, num2) {
  return num1 + num2;
};</pre>
</div>

&emsp;&emsp;如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来

<div>
<pre>var sum = (num1, num2) =&gt; { 
    var restult = num1 + num2;
    return result; 
}</pre>
</div>

&emsp;&emsp;由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号

<div>
<pre>var getTempItem = id =&gt; ({ id: id, name: "Temp" });</pre>
</div>

&nbsp;

### 回调函数

&emsp;&emsp;箭头函数最常用于回调函数，如事件处理器或定时器中

<div>
<pre>function foo() {
    setTimeout(() =&gt; {
        console.log( this.a );
    },100);
}
var obj = {
    a: 2
};
foo.call( obj ); // 2</pre>
</div>
<div>
<pre>//等价于
function foo() {
    var that = this; 
    setTimeout( function(){
        console.log( that.a );
    }, 100 );
}
var obj = {
    a: 2
};
foo.call( obj ); // 2</pre>
</div>

&nbsp;

### 注意事项

&emsp;&emsp;【1】this在箭头函数中被绑定，4种[绑定规则](http://www.cnblogs.com/xiaohuochai/p/5735901.html)中的无论哪种都无法改变其绑定

<div>
<pre>var a = 0;
function foo(){
    var test = () =&gt; {
        console.log(this.a);
    }
    return test;
};
var obj1 = {
    a : 1,
    foo:foo
}
var obj2 = {
    a : 2,
    foo:foo    
}
obj1.foo()();//1
var bar = foo.call(obj1);
//由于上一条语句已经把this绑定到obj1上，且无法修改。所以本条语句call(obj2)无效，返回的值是obj1.a的值1
bar.call(obj2);//1</pre>
</div>

&emsp;&emsp;【2】箭头函数不可以当作构造函数，也就是不可以使用new命令，否则会报错

<div>
<pre>var foo = () =&gt;{return 1;}
foo();//1
var obj = new foo();//Uncaught TypeError: foo is not a constructor</pre>
</div>

&emsp;&emsp;【3】箭头函数中不存在[arguments对象](http://www.cnblogs.com/xiaohuochai/p/5706289.html#anchor1)

<div>
<pre>var foo = () =&gt;{
    console.log(arguments);//Uncaught ReferenceError: arguments is not defined
    return 1;
}
foo();</pre>
</div>

&nbsp;

## 最后

&emsp;&emsp;虽然箭头函数可以把[作用域](http://www.cnblogs.com/xiaohuochai/p/5699739.html)和this机制联系起来，但是却容易混淆，使代码难以维护。应该在作用域和this机制中二选一，否则它们就真的汇成一锅粥了。或者只使用[词法作用域](http://www.cnblogs.com/xiaohuochai/p/5700095.html#anchor1)，或者只使用this机制，必要时使用bind()。尽量避免使用that=this和箭头函数


&emsp;&emsp;this机制系列介绍完了。最重要的还是第一篇this机制的[绑定原则](http://www.cnblogs.com/xiaohuochai/p/5735901.html)，第二篇this机制的[优先级](http://www.cnblogs.com/xiaohuochai/p/5737435.html)属于要点，而本篇则是拓展部分。如有不妥之处，欢迎交流

&emsp;&emsp;以上
