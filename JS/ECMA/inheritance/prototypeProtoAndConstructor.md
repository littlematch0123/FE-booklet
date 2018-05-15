# 一张图理解prototype、proto和constructor的三角关系

&emsp;&emsp;javascript里的关系又多又乱。作用域链是一种单向的链式关系，还算简单清晰；this机制的调用关系，稍微有些复杂；而关于原型，则是prototype、proto和constructor的三角关系。本文先用一张图开宗明义，然后详细解释原型的三角关系

&nbsp;

### 图示

![proto](https://pic.xiaohuochai.site/blog/JS_ECMA_grammer_proto.png)
&nbsp;

### 概念

&emsp;&emsp;上图中的复杂关系，实际上来源就两行代码

<div>
<pre>function Foo(){};
var f1 = new Foo;</pre>
</div>

【构造函数】

&emsp;&emsp;用来初始化新创建的对象的函数是构造函数。在例子中，Foo()函数是构造函数

【实例对象】

&emsp;&emsp;通过构造函数的new操作创建的对象是实例对象。可以用一个构造函数，构造多个实例对象

<div>
<pre>function Foo(){};
var f1 = new Foo;
var f2 = new Foo;
console.log(f1 === f2);//false</pre>
</div>

【原型对象及prototype】

&emsp;&emsp;构造函数有一个prototype属性，指向实例对象的原型对象。通过同一个构造函数实例化的多个对象具有相同的原型对象。经常使用原型对象来实现继承

<div>
<pre>function Foo(){};
Foo.prototype.a = 1;
var f1 = new Foo;
var f2 = new Foo;
console.log(Foo.prototype.a);//1
console.log(f1.a);//1
console.log(f2.a);//1</pre>
</div>

【constructor】

&emsp;&emsp;原型对象有一个constructor属性，指向该原型对象对应的构造函数

<div>
<pre>function Foo(){};
console.log(Foo.prototype.constructor === Foo);//true</pre>
</div>

&emsp;&emsp;由于实例对象可以继承原型对象的属性，所以实例对象也拥有constructor属性，同样指向原型对象对应的构造函数

<div>
<pre>function Foo(){};
var f1 = new Foo;
console.log(f1.constructor === Foo);//true</pre>
</div>

【proto】

&emsp;&emsp;实例对象有一个proto属性，指向该实例对象对应的原型对象

<div>
<pre>function Foo(){};
var f1 = new Foo;
console.log(f1.__proto__ === Foo.prototype);//true</pre>
</div>

&nbsp;

### 说明

&emsp;&emsp;概念介绍完了，现在对图示的关系进行详细说明

<div>
<pre>function Foo(){};
var f1 = new Foo;</pre>
</div>

&nbsp;

【第一部分： Foo】

![proto1](https://pic.xiaohuochai.site/blog/JS_ECMA_grammer_proto1.jpg)

&emsp;&emsp;实例对象f1是通过构造函数Foo()的new操作创建的。构造函数Foo()的原型对象是Foo.prototype；实例对象f1通过__proto__属性也指向原型对象Foo.prototype

<div>
<pre>function Foo(){};
var f1 = new Foo;
console.log(f1.__proto === Foo.prototype);//true</pre>
</div>

&emsp;&emsp;实例对象f1本身并没有constructor属性，但它可以继承原型对象Foo.prototype的constructor属性

<div>
<pre>function Foo(){};
var f1 = new Foo;
console.log(Foo.prototype.constructor === Foo);//true
console.log(f1.constructor === Foo);//true
console.log(f1.hasOwnProperty('constructor'));//false</pre>
</div>

&emsp;&emsp;下图是实例对象f1的控制台效果

![proto2](https://pic.xiaohuochai.site/blog/JS_ECMA_grammer_proto2.jpg)

<div>&nbsp;</div>
<div>【第二部分： Object】</div>

![proto3](https://pic.xiaohuochai.site/blog/JS_ECMA_grammer_proto3.jpg)

&emsp;&emsp;Foo.prototype是f1的原型对象，同时它也是实例对象。实际上，任何对象都可以看做是通过Object()构造函数的new操作实例化的对象

&emsp;&emsp;所以，Foo.prototype作为实例对象，它的构造函数是Object()，原型对象是Object.prototype。相应地，构造函数Object()的prototype属性指向原型对象Object.prototype；实例对象Foo.prototype的proto属性同样指向原型对象Object.prototype

<div>
<pre>function Foo(){};
var f1 = new Foo;
console.log(Foo.prototype.__proto__ === Object.prototype);//true</pre>
</div>

&emsp;&emsp;实例对象Foo.prototype本身具有constructor属性，所以它会覆盖继承自原型对象Object.prototype的constructor属性

<div>
<pre>function Foo(){};
var f1 = new Foo;
console.log(Foo.prototype.constructor === Foo);//true
console.log(Object.prototype.constructor === Object);//true
console.log(Foo.prototype.hasOwnProperty('constructor'));//true</pre>
</div>

&emsp;&emsp;下图是实例对象Foo.prototype的控制台效果


![proto4](https://pic.xiaohuochai.site/blog/JS_ECMA_grammer_proto4.jpg)

&emsp;&emsp;如果Object.prototype作为实例对象的话，其原型对象是什么，结果是null。私以为，这可能也是typeof null的结果是'object'的原因之一吧
<div>
<pre>console.log(Object.prototype.__proto__ === null);//true</pre>
</div>

&nbsp;

【第三部分： Function】

![proto5](https://pic.xiaohuochai.site/blog/JS_ECMA_grammer_proto5.jpg)

<div>&nbsp;</div>

&emsp;&emsp;前面已经介绍过，函数也是对象，只不过是具有特殊功能的对象而已。任何函数都可以看做是通过Function()构造函数的new操作实例化的结果

&emsp;&emsp;如果把函数Foo当成实例对象的话，其构造函数是Function()，其原型对象是Function.prototype；类似地，函数Object的构造函数也是Function()，其原型对象是Function.prototype

<div>
<pre>function Foo(){};
var f1 = new Foo;
console.log(Foo.__proto__ === Function.prototype);//true
console.log(Object.__proto__ === Function.prototype);//true</pre>
</div>

&emsp;&emsp;原型对象Function.prototype的constructor属性指向构造函数Function()；实例对象Object和Foo本身没有constructor属性，需要继承原型对象Function.prototype的constructor属性

<div>
<pre>function Foo(){};
var f1 = new Foo;
console.log(Function.prototype.constructor === Function);//true
console.log(Foo.constructor === Function);//true
console.log(Foo.hasOwnProperty('constructor'));//false
console.log(Object.constructor === Function);//true
console.log(Object.hasOwnProperty('constructor'));//false</pre>
</div>

&emsp;&emsp;所有的函数都可以看成是构造函数Function()的new操作的实例化对象。那么，Function可以看成是调用其自身的new操作的实例化的结果

&emsp;&emsp;所以，如果Function作为实例对象，其构造函数是Function，其原型对象是Function.prototype

<div>
<pre>console.log(Function.__proto__ === Function.prototype);//true
console.log(Function.prototype.constructor === Function);//true
console.log(Function.prototype === Function.prototype);//true</pre>
</div>

&emsp;&emsp;如果Function.prototype作为实例对象的话，其原型对象是什么呢？和前面一样，所有的对象都可以看成是Object()构造函数的new操作的实例化结果。所以，Function.prototype的原型对象是Object.prototype，其原型函数是Object()

<div>
<pre>console.log(Function.prototype.__proto__ === Object.prototype);//true</pre>
</div>

&emsp;&emsp;第二部分介绍过，Object.prototype的原型对象是null

<div>
<pre>console.log(Object.prototype.__proto__ === null);//true</pre>
</div>

&nbsp;

### 总结

&emsp;&emsp;【1】函数(Function也是函数)是new Function的结果，所以函数可以作为实例对象，其构造函数是Function()，原型对象是Function.prototype

&emsp;&emsp;【2】对象(函数也是对象)是new Object的结果，所以对象可以作为实例对象，其构造函数是Object()，原型对象是Object.prototype

&emsp;&emsp;【3】Object.prototype的原型对象是null

