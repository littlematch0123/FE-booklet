# javascript类型系统——布尔Boolean类型

&emsp;&emsp;布尔值Boolean类型可能是三种包装对象Number、String和Boolean中最简单的一种。[Number](http://www.cnblogs.com/xiaohuochai/p/5586166.html)和[String](http://www.cnblogs.com/xiaohuochai/p/5612962.html)对象拥有大量的实例属性和方法，Boolean却很少。从某种意义上说，为计算机设计程序就是与布尔值打交道，作为最基本的事实，所有的电子电路只能识别和使用布尔数据。本文将介绍布尔Boolean类型

&nbsp;

### 定义

&emsp;&emsp;布尔Boolean类型表示逻辑实体，它只有两个值，保留字true和false，分别代表真和假这两个状态

&emsp;&emsp;Boolean包装类型是与布尔值对应的引用类型，在布尔表达式中使用Boolean对象容易造成误解

<div>
<pre>var b1 = true;
var b2 = new Boolean(true);
console.log(b1,typeof b1);//true 'boolean'
console.log(b2,typeof b2);//Boolean{[[PrimitiveValue]]: true}  'object'
console.log(b1.valueOf(), typeof b1.valueOf());//true 'boolean'
console.log(b2.valueOf(), typeof b2.valueOf());//true 'boolean'</pre>
</div>

&nbsp;

### 应用场景

&emsp;&emsp;布尔类型主要应用于如下场景：

&emsp;&emsp;【1】条件和循环语句

&emsp;&emsp;布尔值主要应用于条件和循环语句的条件部分。比如，if语句中，如果布尔值为true执行第一段逻辑，如果为false执行另一段逻辑。通常将一个创建布尔值的比较直接与使用这个比较的语句结合在一起

<div>
<pre>if(a &gt; 1){
    //条件为true时，执行此处
}else{
    //条件为false时，执行此处
}</pre>
</div>

&emsp;&emsp;【2】逻辑运算符

&emsp;&emsp;逻辑运算符又叫布尔运算符。逻辑非运算符总是返回布尔值，而逻辑或和逻辑与操作并非如此

&emsp;&emsp;同时使用两个逻辑非操作符，可以将类型转换为布尔型

<div>
<pre>console.log(!!1);//true
console.log(!!0);//false
console.log(!!' ');//true
console.log(!!'');//false</pre>
</div>

&emsp;&emsp;【3】关系运算符

&emsp;&emsp;[关系运算符](http://www.cnblogs.com/xiaohuochai/p/5615445.html)用于测试两个值之间的关系，根据关系是否存在而返回true或false，关系表达式总是返回一个布尔值，通常在if、while或for语句中使用关系表达式，用以控制程序的执行流程

<div>
<pre>console.log( 1 &gt; 2);//false
console.log( 1 &lt; 2);//true</pre>
</div>

&nbsp;

### 转为布尔

&emsp;&emsp;将一个值转为布尔值可使用Boolean()转型函数

**假值**

&emsp;&emsp;转换成false的值称为假值(falsy value)，这7个值包括undefined、null、+0、-0、NaN、false、""(空字符串)

<div>
<pre>console.log(Boolean(undefined));//false
console.log(Boolean(null));//false
console.log(Boolean(0));//false
console.log(Boolean(-0));//false
console.log(Boolean(NaN));//false
console.log(Boolean(''));//false
console.log(Boolean(false));//false</pre>
</div>

&emsp;&emsp;注意：在Number()方法中空字符串和空白字符串都转换为0，而在Boolean方法中，空字符串""转换为false，而空白字符串" "转换为true

<div>
<pre>console.log(Number(''));//0
console.log(Number(' '));//0

console.log(Boolean(''));//false
console.log(Boolean(' '));//true</pre>
</div>

&emsp;&emsp;除了这7个假值外，其他的值转换为布尔值都是true，也称为真值(truthy value)

&emsp;&emsp;注意：所有对象(包括空对象)的转换结果都是true，甚至连false对应的布尔对象new Boolean(false)也是true

<div>
<pre>console.log(Boolean({}));//true
console.log(Boolean([]));//true
console.log(Boolean(new Boolean(false)));//true
console.log(Boolean(false));//false
console.log(Boolean(new Boolean(null)));//true
console.log(Boolean(null));//false</pre>
</div>

&nbsp;

### 实例方法

&emsp;&emsp;Boolean对象是与布尔值对应的包装类型，继承了Object对象的通用方法toString()、toLocaleString()、valueOf()这三个方法

【toString()】

&emsp;&emsp;toString()方法返回Boolean的字符串值('true'或'false')

【toLocaleString()】

&emsp;&emsp;toLocaleString()方法返回Boolean的字符串值('true'或'false')

【valueOf()】

&emsp;&emsp;valueOf()方法返回Boolean的原始布尔值(true或false)

<div>
<pre>console.log(true.valueOf());//true
console.log(true.toString());//'true'
console.log(true.toLocaleString());//'true'
console.log((new Boolean(false)).valueOf());//false
console.log((new Boolean(false)).toString());//'false'
console.log((new Boolean(false)).toLocaleString());//'false'</pre>
</div>

&nbsp;

## 参考资料

【1】 ES5/Boolean对象 [https://www.w3.org/html/ig/zh/wiki/ES5/builtins](https://www.w3.org/html/ig/zh/wiki/ES5/builtins#Boolean_.E5.AF.B9.E8.B1.A1)

【2】 阮一峰Javascript标准参考教程&mdash;&mdash;语法概述 [http://javascript.ruanyifeng.com/](http://javascript.ruanyifeng.com/grammar/basic.html#toc24)

【3】 W3School-Javascript高级教程&mdash;&mdash;Boolean对象 [http://www.w3school.com.cn/](http://www.w3school.com.cn/jsref/jsref_obj_boolean.asp)

【4】《javascript权威指南(第6版)》第3章 类型、值和变量

【5】《javascript高级程序设计(第3版)》第3章 基本概念 

【6】《javascript DOM编程艺术(第2版)》第2章 Javascript语法

【7】《javascript启示录》 第12章 Boolean()

