# 深入理解javascript对象系列第二篇——属性操作

&emsp;&emsp;对于[对象](http://www.cnblogs.com/xiaohuochai/p/5741616.html)来说，属性操作是绕不开的话题。类似于&ldquo;增删改查&rdquo;的基本操作，属性操作分为属性查询、属性设置、属性删除，还包括属性继承。本文是对象系列的第二篇&mdash;&mdash;属性操作

&nbsp;

### 属性查询

&emsp;&emsp;属性查询一般有两种方法，包括点运算符和方括号运算符

<div>
<pre>var o = {
  p: 'Hello World'
};
o.p // "Hello World"
o['p'] // "Hello World"</pre>
</div>

&emsp;&emsp;注意：变量中可以存在中文，因为中文相当于字符，与英文字符同样对待，因此可以写成`person.白`或`person['白']`

<div>
<pre>var person = {
    白 : 1
}
person.白;//1
person['白'];//1</pre>
</div>

【点运算符】

&emsp;&emsp;点运算符是很多面向对象语句的通用写法，由于其比较简单，所以较方括号运算符相比，更常用

&emsp;&emsp;由于javascript是弱类型语言，在任何对象中都可以创建任意数量的属性。但当通过点运算符(.)访问对象的属性时，属性名用一个标识符来表示，标识符要符合[变量命名规则](http://www.cnblogs.com/xiaohuochai/p/5549833.html#anchor2)。标识符必须直接出现在javascript程序中，它们不是数据类型，因此程序无法修改它们

<div>
<pre>var o = {
    a:1,
    1:2
};
console.log(o.a);//1
//由于变量不可以以数字开头，所以o.1报错
console.log(o.1);//Uncaught SyntaxError: missing ) after argument list</pre>
</div>

【方括号运算符】

&emsp;&emsp;当通过方括号运算符`[]`来访问对象的属性时，属性名通过字符串来表示。字符串是javascript的数据类型，在程序运行中可以修改和创建它们

&emsp;&emsp;使用方括号运算符有两个优点

&emsp;&emsp;【1】可以通过变量来访问属性

<div>
<pre>var a = 1;
var o = {
    1: 10
}
o[a];//10</pre>
</div>

&emsp;&emsp;【2】属性名称可以为javascript无效标识符

<div>
<pre>var myObject = {
    123:'zero',
    class:'foo'
};
console.log(myObject['123'],myObject['class']);//'zero' 'foo'
console.log(myObject.123);//报错</pre>
</div>

&emsp;&emsp;方括号中的值若是非字符串类型会使用[String()](http://www.cnblogs.com/xiaohuochai/p/5599529.html#anchor5)隐式转换成字符串再输出；如果是字符串类型，若有引号则原值输出，否则会被识别为变量，若变量未定义，则报错

<div>
<pre>var person = {};
person[0];  //[]中的数字不会报错，而是自动转换成字符串
person[a];  //[]中符合变量命名规则的元素会被当成变量，变量未被定义，而报错
person['']; //[]中的空字符串不会报错，是实际存在的且可以调用，但不会在控制台右侧的集合中显示
person[undefined];//不会报错，而是自动转换成字符串
person[null];//不会报错，而是自动转换成字符串
person[true];//不会报错，而是自动转换成字符串
person[false];//不会报错，而是自动转换成字符串</pre>
</div>

**可计算属性名**

&emsp;&emsp;在方括号运算符内部可以使用表达式

<div>
<pre>var a = 1;
var person = {
    3: 'abc'
};
person[a + 2];//'abc'</pre>
</div>

&emsp;&emsp;但如果要在对象字面量内部对属性名使用表达式，则需要使用ES6的可计算属性名

<div>
<pre>var a = 1;
//Uncaught SyntaxError: Unexpected token +
var person = {
    a + 3: 'abc'
};</pre>
</div>

&emsp;&emsp;ES6增加了可计算属性名，可以在文字中使用[]包裹一个表达式来当作属性名

<div>
<pre>var a = 1;
var person = {
    [a + 3]: 'abc'
};
person[4];//'abc'</pre>
</div>

**属性查询错误**

&emsp;&emsp;【1】查询一个不存在的属性不会报错，而是返回undefined

<div>
<pre>var person = {};
console.log(person.a);//undefined</pre>
</div>

&emsp;&emsp;【2】如果对象不存在，试图查询这个不存在的对象的属性会报错

<div>
<pre>console.log(person.a);//Uncaught ReferenceError: person is not defined</pre>
</div>

&emsp;&emsp;可以利用这一点，来检查一个全局变量是否被声明

<div>
<pre>// 检查a变量是否被声明
if (a) {...} // 报错</pre>
</div>
<div>
<pre>//所有全局变量都是window对象的属性。window.a的含义就是读取window对象的a属性，如果该属性不存在，就返回undefined，并不会报错
if (window.a) {...} // 不报错</pre>
</div>

&nbsp;

### 属性设置

&emsp;&emsp;属性设置又称为属性赋值，与属性查询相同，具有点运算符和方括号运算符这两种方法

<div>
<pre>o.p = 'abc';
o['p'] = 'abc';</pre>
</div>

&emsp;&emsp;在给对象设置属性之前，一般要先检测对象是否存在

<div>
<pre>var len = undefined;
if(book){
    if(book.subtitle){
        len = book.subtitle.length;
    }
}</pre>
</div>

&emsp;&emsp;上面代码可以简化为

<div>
<pre>var len = book &amp;&amp; book.subtitle &amp;&amp; book.subtitle.length;</pre>
</div>

&emsp;&emsp;注意：关于[逻辑与&amp;&amp;运算符](http://www.cnblogs.com/xiaohuochai/p/5616992.html#anchor2)的应用移步至此

&emsp;&emsp;[null](http://www.cnblogs.com/xiaohuochai/p/5665637.html#anchor3)和[undefined](http://www.cnblogs.com/xiaohuochai/p/5665637.html#anchor2)不是对象，给它们设置属性会报错

<div>
<pre>null.a = 1;//Uncaught TypeError: Cannot set property 'a' of null
undefined.a = 1;//Uncaught TypeError: Cannot set property 'a' of undefined</pre>
</div>

&emsp;&emsp;由于[string](http://www.cnblogs.com/xiaohuochai/p/5599529.html)、[number](http://www.cnblogs.com/xiaohuochai/p/5586166.html)和[boolean](http://www.cnblogs.com/xiaohuochai/p/5616641.html)有对应的[包装对象](http://www.cnblogs.com/xiaohuochai/p/5584647.html)，所以给它们设置属性不会报错

<div>
<pre>'abc'.a = 1;//1
(1).a = 1;//1
true.a = 1;//1</pre>
</div>

&nbsp;

### 属性删除

&emsp;&emsp;使用delete运算符可以删除对象属性(包括[数组](http://www.cnblogs.com/xiaohuochai/p/5679605.html)元素)

<div>
<pre>var o = {
    a : 1
};
console.log(o.a);//1
console.log('a' in o);//true
console.log(delete o.a);//true
console.log(o.a);//undefined
console.log('a' in o);//false</pre>
</div>

&emsp;&emsp;注意：给对象属性置null或undefined，并没有删除该属性

<div>
<pre>var o = {
    a : 1
};
o.a = undefined;
console.log(o.a);//undefined
console.log('a' in o);//true
console.log(delete o.a);//true
console.log(o.a);//undefined
console.log('a' in o);//false</pre>
</div>

&emsp;&emsp;使用delete删除数组元素时，不会改变[数组长度](http://www.cnblogs.com/xiaohuochai/p/5679605.html#anchor4)

<div>
<pre>var a = [1,2,3];
delete a[2];
2 in a;//false
a.length;//3</pre>
</div>

&emsp;&emsp;delete运算符只能删除自有属性，不能删除继承属性(要删除继承属性必须从定义这个属性的原型对象上删除它，而且这会影响到所有继承自这个原型的对象)

<div>
<pre>var o  = {
    a:1
}
var obj = Object.create(o);
obj.a = 2;

console.log(obj.a);//2
console.log(delete obj.a);//true
console.log(obj.a);//1
console.log(delete obj.a);//true
console.log(obj.a);//1</pre>
</div>

**返回值**

&emsp;&emsp;delete操作符的返回值是个布尔值true或false

&emsp;&emsp;【1】当使用delete操作符删除对象属性或数组元素删除成功时，返回true

<div>
<pre>var o = {a:1};
var arr = [1];
console.log(delete o.a);//true
console.log(delete arr[0]);//true</pre>
</div>

&emsp;&emsp;【2】当使用delete操作符删除不存在的属性或非[左值](http://www.cnblogs.com/xiaohuochai/p/5666530.html#anchor4)时，返回true

<div>
<pre>var o = {};
console.log(delete o.a);//true
console.log(delete 1);//true
console.log(delete {});//true</pre>
</div>

&emsp;&emsp;【3】当使用delete操作符删除变量时，返回false，严格模式下会抛出ReferenceError错误

<div>
<pre>var a = 1;
console.log(delete a);//false
console.log(a);//1
'use strict';
var a = 1;
//Uncaught SyntaxError: Delete of an unqualified identifier in strict mode
console.log(delete a);</pre>
</div>

&emsp;&emsp;【4】当使用delete操作符删除不可配置的属性时，返回false，严格模式下会抛出TypeError错误

<div>
<pre>var obj = {};
Object.defineProperty(obj,'a',{configurable:false});
console.log(delete obj.a);//false

'use strict';
var obj = {};
Object.defineProperty(obj,'a',{configurable:false});
//Uncaught TypeError: Cannot delete property 'a' of #&lt;Object&gt;
console.log(delete obj.a);</pre>
</div>

&nbsp;

### 属性继承

&emsp;&emsp;每一个javascript对象都和另一个对象相关联。&ldquo;另一个对象&rdquo;就是我们熟知的原型，每一个对象都从原型继承属性。所有通过对象直接量创建的对象都具有同一个原型对象，并可以通过Object.prototype获得对原型对象的引用

<div>
<pre>var obj = {};
console.log(obj.__proto__ === Object.prototype);//true</pre>
</div>

&emsp;&emsp;注意：Object.prototype的原型对象是null，所以它不继承任何属性

<div>
<pre>console.log(Object.prototype.__proto__ === null);//true</pre>
</div>

&emsp;&emsp;对象本身具有的属性叫自有属性(own property)，从原型对象继承而来的属性叫继承属性

<div>
<pre>var o = {a:1};
var obj = Object.create(o);
obj.b = 2;
//继承自原型对象o的属性a
console.log(obj.a);//1
//自有属性b
console.log(obj.b);//2</pre>
</div>

**in**

&emsp;&emsp;in操作符可以判断属性在不在该对象上，但无法区别自有还是继承属性

<div>
<pre>var o = {a:1};
var obj = Object.create(o);
obj.b = 2;
console.log('a' in obj);//true
console.log('b' in obj);//true
console.log('b' in o);//false</pre>
</div>

**for-in**

&emsp;&emsp;通过[for-in循环](http://www.cnblogs.com/xiaohuochai/p/5673241.html#anchor2)可以遍历出该对象中所有可枚举属性　

<div>
<pre>var o = {a:1};
var obj = Object.create(o);
obj.b = 2;
for(var i in obj){
    console.log(obj[i]);//2 1
}</pre>
</div>

**hasOwnProperty()**

&emsp;&emsp;通过hasOwnProperty()方法可以确定该属性是自有属性还是继承属性

<div>
<pre>var o = {a:1};
var obj = Object.create(o);
obj.b = 2;
console.log(obj.hasOwnProperty('a'));//false
console.log(obj.hasOwnProperty('b'));//true</pre>
</div>

**Object.keys()**

&emsp;&emsp;Object.keys()方法返回所有可枚举的自有属性

<div>
<pre>var o = {a:1};
var obj = Object.create(o,{
    c:{value:3,configurable: false}
});
obj.b = 2;
console.log(Object.keys(obj));//['b']</pre>
</div>

**Object.getOwnPropertyNames()**

&emsp;&emsp;与Object.keys()方法不同，Object.getOwnPropertyNames()方法返回所有自有属性(包括不可枚举的属性)

<div>
<pre>var o = {a:1};
var obj = Object.create(o,{
    c:{value:3,configurable: false}
});
obj.b = 2;
console.log(Object.getOwnPropertyNames(obj));//['c','b']</pre>
</div>

&nbsp;

## 参考资料

【1】 W3School-Javascript高级教程&mdash;&mdash;对象应用 [http://www.w3school.com.cn/js/](http://www.w3school.com.cn/js/pro_js_object_working_with.asp)

【2】  阮一峰Javascript标准参考教程&mdash;&mdash;对象 [http://javascript.ruanyifeng.com/grammar/object.html](http://javascript.ruanyifeng.com/grammar/object.html)

【3】《javascript权威指南(第6版)》第6章 对象

【4】《javascript高级程序设计(第3版)》第6章 面向对象的程序设计

【5】《javascript语句精粹》第3章 对象

【6】《javascript面向对象精要》 第3章 理解对象

【7】《你不知道的javascript上卷》第3章 对象

【8】《ECMAScript6入门》 第7章 对象的扩展

