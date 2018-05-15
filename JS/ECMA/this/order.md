# 深入理解this机制系列第二篇——this绑定优先级

&emsp;&emsp;上一篇介绍过this的[绑定规则](http://www.cnblogs.com/xiaohuochai/p/5735901.html)，那如果在函数的调用位置上同时存在两种以上的绑定规则应该怎么办呢？本文将介绍this绑定的优先级

&nbsp;

### 显式绑定 pk 隐式绑定

&emsp;&emsp;显式绑定胜出

<div>
<pre>function foo() {
    console.log( this.a );
}
var obj1 = {
    a: 2,
    foo: foo
};
var obj2 = {
    a: 3,
    foo: foo
};
obj1.foo(); // 2
obj2.foo(); // 3
//在该语句中，显式绑定call(obj2)和隐式绑定obj1.foo同时出现，最终结果为3，说明被绑定到了obj2中
obj1.foo.call( obj2 ); // 3
obj2.foo.call( obj1 ); // 2</pre>
</div>

&nbsp;

### new绑定 pk 隐式绑定

&emsp;&emsp;new绑定胜出

<div>
<pre>function foo(something) {
    this.a = something;
}
var obj1 = {foo: foo};
var obj2 = {};
obj1.foo( 2 );
console.log( obj1.a ); // 2
obj1.foo.call(obj2,3);
console.log( obj2.a ); // 3
//在下列代码中，隐式绑定obj1.foo和new绑定同时出现。最终obj1.a结果是2，而bar.a结果是4，说明this被绑定在bar上
var bar = new obj1.foo( 4 );
console.log( obj1.a ); // 2
console.log( bar.a ); // 4</pre>
</div>

&nbsp;

### new绑定 pk 显式绑定

&emsp;&emsp;new绑定胜出

<div>
<pre>function foo(something) {
    this.a = something;
}
var obj1 = {};
//先将obj1绑定到foo函数中，此时this值为obj1
var bar = foo.bind( obj1 );
bar( 2 );
console.log(obj1.a); // 2
//通过new绑定，此时this值为baz
var baz = new bar( 3 );
console.log( obj1.a ); // 2
//说明使用new绑定时，在bar函数内，无论this指向obj1有没有生效，最终this都指向新创建的对象baz
console.log( baz.a ); // 3</pre>
</div>

&nbsp;

### 顺序

&emsp;&emsp;【1】是否是new绑定？如果是，this绑定的是新创建的对象

<div>
<pre>var bar = new foo();</pre>
</div>

&emsp;&emsp;【2】是否是显式绑定？如果是，this绑定的是指定的对象

<div>
<pre>var bar = foo.call(obj2);</pre>
</div>

&emsp;&emsp;【3】是否是隐式绑定？如果是，this绑定的是属于的对象

<div>
<pre>var bar = obj1.foo(); </pre>
</div>

&emsp;&emsp;【4】如果都不是，则使用默认绑定

<div>
<pre>var bar = foo();</pre>
</div>

