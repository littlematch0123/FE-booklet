# javascript运算符——关系运算符

&emsp;&emsp;关系运算符用于测试两个值之间的关系，根据关系是否存在而返回true或false，关系表达式总是返回一个布尔值，通常在if、while或for语句中使用关系表达式，用以控制程序的执行流程

&emsp;&emsp;javascript提供了===、!==、==、!=、&lt;、&lt;=、&gt;、&gt;=8个关系运算符，本文将分为4类介绍关系运算符

&nbsp;

### 恒等运算符

&emsp;&emsp;恒等运算符'==='，也叫严格相等运算符，首先计算其操作数的值，然后比较这两个值，比较过程没有任何类型转换，比较过程如下：

&emsp;&emsp;【1】如果两个值的类型不相同，则返回false

<div>
<pre>console.log(1 === '1');//false
console.log(1 === [1]);//false</pre>
</div>

&emsp;&emsp;【2】如果两个值都是Undefined、Null、Boolean、Number、String相同原始类型的值，值相同，就返回true，否则，返回false

<div>
<pre>console.log(undefined === undefined);//true
console.log(null === null);//true</pre>
</div>
<div>
<pre>console.log(true === true);//true
console.log(false === false);//true</pre>
</div>
<div>
<pre>console.log(1 === 1);//true
console.log(2.5 === 2.5);//true</pre>
</div>

&emsp;&emsp;注意：不论什么进制的数字，在进行关系比较时，最终都转换为十进制进行运算

<div>
<pre>console.log(10 === 0xa);//true</pre>
</div>

&emsp;&emsp;在数字Number类型中，有一个值比较特殊，是NaN(not a number)，它与任何值都不相等；此外，数字Number类型中存在着+0和-0，虽然其符号不同，但值相等

<div>
<pre>console.log(NaN === NaN);//false
console.log(+0 === -0);//true</pre>
</div>

&emsp;&emsp;两个相同字符串值表现为：相同的长度和相同的字符对应相同的位置

<div>
<pre>console.log('abc' === 'abc');//true
console.log('abc' === 'acb');//false</pre>
</div>

&emsp;&emsp;【3】如果两个值引用同一个对象，则返回true，否则，返回false

&emsp;&emsp;注意：更详细的解释是，javascript对象的比较是引用的比较，而不是值的比较。对象和其本身是相等的，但和其他任何对象都不相等。如果两个不同的对象具有相同数量的属性，相同的属性名和值，它们依然是不相等的

<div>
<pre>console.log([] === []);//false
console.log({} === {});//false    
console.log(function(){} === function(){});//false</pre>
</div>
<div>
<pre>var a = {};
b = a;
console.log(a === b);//true</pre>
</div>

【恒不等运算符】

&emsp;&emsp;恒不等运算符(!==)又叫严格不等于运算符，操作数的比较过程与恒等运算符相同，结果取反。如果'==='的比较结果是true，则'!=='的比较结果是false；如果'==='的比较结果是false，则'!=='的比较结果是true

<div>
<pre>console.log(1 !== '1');//true
console.log(1 !== 1);//false
console.log(true !== false);//true
console.log({} !== {});//true</pre>
</div>

&nbsp;

### 相等运算符

&emsp;&emsp;相等运算符'=='和恒等运算符相似，但相等运算符的比较并不严格，如果两个操作数不是同一类型，相等运算符会尝试进行一些类型转换，然后再进行比较

&emsp;&emsp;当两个操作数类型相同时，比较规则和恒等运算符规则相同

<div>
<pre>console.log(undefined == undefined);//true
console.log(10 == 0xa);//true
console.log(NaN == NaN);//false
console.log([] == []);//false</pre>
</div>

&emsp;&emsp;当两个操作数类型不同时，相等运算符'=='会遵守如下规则：

&emsp;&emsp;【1】如果一个值是对象类型，另一值是原始类型，则对象类型会先使用valueOf()转换成原始值，如果结果还不是原始值，则再使用toString()方法转换，再进行比较

&emsp;&emsp;注意：日期类只允许使用toString()方法转换为字符串。类似地，时间Date对象进行加法运算时使用toString()转换为字符串，而在其他数学运算，包括减法、乘法、除法、求余等运算中，都是使用Number()转换函数将时间Date对象使用valueOf()转换为数字

&emsp;&emsp;【2】在对象转换为原始值之后，如果两个操作数都是字符串，则进行字符串的比较

<div>
<pre>console.log(new Date() == 'Sat Jun 25 2016 11:07:20 GMT+0800 (中国标准时间)');//true</pre>
</div>

&emsp;&emsp;【3】在对象转换为原始值之后，如果至少有一个操作数不是字符串，则两个操作数都将通过Number()转型函数转换成数字进行数值比较

<div>
<pre>console.log(true == 1);//true
console.log(true == 0);//false
console.log(false == '1');//false
console.log(false == '0');//true
console.log(true == 'true');//false，相当于1 == NaN

console.log([1] == 1);//true，相当于1 == 1
console.log([1] == '1');//true，相当于'1' == '1'
console.log([] == 0);//true，相当于0 == 0
console.log([] == '0');//false，相当于'' == '0'

console.log([] == true);//false，相当于0 == 1
console.log([1] == true);//true，相当于1 == 1</pre>
</div>
<div>
<pre>var a = {
    valueOf:function(){
        return 1;
    },
    toString:function(){
        return '2';
    }
} 
console.log( a == '1');//true，相当于1 == 1
var a = {
    valueOf:function(){
        return {};
    },
    toString:function(){
        return '1';
    }
} 
console.log( a == 1);//true，相当于1 == 1</pre>
</div>

&emsp;&emsp;注意：如果一个值是null，另一个值是undefined，则返回true。虽然Number(null)是0，但null和0并不相等

<div>
<pre>console.log(null == undefined);//true
console.log(null == 0);//false</pre>
</div>

&emsp;&emsp;注意：空字符串或空格字符串会转成0

<div>
<pre>console.log(null == []);//false
console.log(null == '');//false
console.log([] == ' ');//false，相当于'' == ' '
console.log([] == '');//true，相当于'' == ''
console.log(0 == '');//true</pre>
</div>

&nbsp;【不相等运算符】

&emsp;&emsp;不相等运算符(!=)的操作数比较过程与相等运算符相同，结果取反。如果'=='的比较结果是true，则'!='的比较结果是false；如果'=='的比较结果是false，则'!='的比较结果是true

<div>
<pre>console.log(1 != '1');//false，相当于1 != 1
console.log(true != '1');//false，相当于1 != 1
console.log('true' != 1);//true，相当于NaN != 1
console.log([1] != '1');//false，相当于'1' != '1'
console.log([1] != true);//false，相当于1 != 1</pre>
</div>

&nbsp;

### 大于运算符

&emsp;&emsp;大于运算符(&gt;)用于比较两个操作数，如果第一个操作数大于第二个操作数，则大于运算符的计算结果为true，否则为false

&emsp;&emsp;大于运算符的操作数可能是任意类型，然而，只有数字和字符串才能真正执行比较操作，因此那些不是数字和字符串的操作数都将进行类型转换，类型转换规则如下：

&emsp;&emsp;【1】如果操作数是对象，则这个对象将先使用valueOf()转换成原始值，如果结果还不是原始值，则再使用toString()方法转换

&emsp;&emsp;注意：实际上，在原生对象中，使用valueOf()方法转换为原始值的，只有转换为数字Number类型的时间Date对象，其他对象都通过toString()方法转换为字符串

&emsp;&emsp;【2】在对象转换为原始值之后，如果两个操作数都是字符串，则按照字母表的顺序对两个字符串进行比较，这里提到的字母表顺序是指组成这个字符串的16位unicode字符的索引顺序

![gtOperator](https://pic.xiaohuochai.site/blog/JS_ECMA_grammer_gtOperator.gif)

<div>
<pre>console.log('b' &gt; 'a');//true
console.log('B' &gt; 'a');//false

console.log({} &gt; '[a]');//true，相当于'[object Object]' &gt; '[a]'
console.log({} &gt; '[p]');//false，相当于'[object Object]' &gt; '[p]'

console.log(['a'] &gt; ['b']);//false，相当于'a' &gt; 'b'
console.log([2] &gt; [11]);//true，相当于'2' &gt; '11'</pre>
</div>

&emsp;&emsp;注意：在字母表中大写字母在小写字母的前面，所以大写字母 &lt; 小写字母；但字符串String对象有一个字符串比较的方法[localeCompare()方法](http://www.cnblogs.com/xiaohuochai/p/5612962.html#anchor10)会考虑自然语言的排序情况，把'B'排在'a'的后面，如果字符串在字母表中排在其参数之前时，则该方法返回一个负数；字符串在字母表中排在其参数之后时，返回一个正数

<div>
<pre>console.log('B'.localeCompare('a'));//1
console.log('B' &gt; 'a');//false
console.log('b'.localeCompare('a'));//1
console.log('b' &gt; 'a');//true</pre>
</div>

&emsp;&emsp;【3】在对象转换为原始值之后，如果至少有一个操作数不是字符串，则两个操作数都转换成数字进行比较

&emsp;&emsp;注意：在等于操作符中，时间Date()对象只允许通过toString()方法转换为字符串，而不允许通过valueOf()方法转换为数字；而在大于操作符中，时间Date()对象允许优先使用valueOf()方法转换为数字&nbsp;

<div>
<pre>console.log(new Date() &gt; 100);//true，相当于1466826928667 &gt; 100
console.log(true &gt; [0]);//true，相当于 1 &gt; 0

console.log(2 &gt; 1);//true
console.log(11 &gt; '2');//true，相当于11 &gt; 2

console.log(NaN &gt; 1);//false
console.log(1 &gt; NaN);//false
console.log({} &gt; true);//false，相当于 NaN &gt; 1</pre>
</div>

&emsp;&emsp;注意：null == 0的结果为false，这是因为javascript将null == undefined的结果设为true。在大于运算中，null和undefined进行Number()转型函数转换分别转换为0和NaN

<div>
<pre>console.log(undefined &gt; -1);//false，相当于NaN &gt; -1
console.log(null &gt; -1);//true，相当于0 &gt; -1
console.log(undefined &gt; 0);//false，相当于NaN &gt; 0
console.log(null &gt; 0);//false，相当于0 &gt; 0    </pre>
</div>

&emsp;&emsp;对于数字和字符串来说，加号运算符和比较运算符的行为有所不同，加号运算符更偏爱字符串，如果它的一个操作数是字符串，就进行字符串连接。而比较运算符则更偏爱数字，只有在两个操作数都是字符串时，才进行字符串的比较

<div>
<pre>console.log(1 + 2);//3
console.log('1' + '2');//'12'
console.log('1' + 2);//'12'，相当于 '1' + '2'

console.log(2 &gt; 1);//true
console.log('2' &gt; '1');//true
console.log('2' &gt; 1);//true，相当于 2 &gt; 1</pre>
</div>

【小于等于运算符】

&emsp;&emsp;小于等于运算符(&lt;=)并不依赖于小于或等于运算符的比较规则，而是遵循大于运算符的比较规则，结果取反。如果'&gt;'的比较结果是true，则'&lt;='的比较结果是false；如果'&gt;'的比较结果是false，则'&lt;='的比较结果是true

<div>
<pre>console.log(1 &lt;= '0');//false，相当于1 &lt;= 0
console.log(true &lt;= '0');//false，相当于1 &lt;= 0
console.log('true' &lt;= 0);//false，相当于NaN &lt;= 0
console.log([1] &lt;= '0');//false，相当于'1' &lt;= '0'
console.log([0] &lt;= true);//true，相当于0 &lt;= 1
console.log(1 &lt;= 1);//true</pre>
</div>

&nbsp;

### 小于运算符

&emsp;&emsp;小于运算符(&lt;)用于比较两个操作数，如果第一个操作数小于第二个操作数，则小于运算符的计算结果为true，否则为false

&emsp;&emsp;小于运算符与大于运算符的类型转换规则类似，就不再赘述

【大于等于运算符】

&emsp;&emsp;同样地，大于等于运算符(&gt;=)并不依赖于大于或等于运算符的比较规则，而是遵循小于运算符的比较规则，结果取反。如果'&lt;'的比较结果是true，则'&gt;='的结果是false；如果'&lt;'的比较结果是false，则'&gt;='的结果是true

&nbsp;

## 参考资料

【1】 ES5/关系运算符 [https://www.w3.org/html/ig/zh/wiki/ES5/expressions](https://www.w3.org/html/ig/zh/wiki/ES5/expressions#.E5.85.B3.E7.B3.BB.E8.BF.90.E7.AE.97.E7.AC.A6)

【2】 阮一峰Javascript标准参考教程&mdash;&mdash;语法&mdash;&mdash;比较运算符 [http://javascript.ruanyifeng.com](http://javascript.ruanyifeng.com/grammar/operator.html#toc6)

【3】 W3School-Javascript高级教程&mdash;&mdash;ECMAScript关系运算符 [http://www.w3school.com.cn](http://www.w3school.com.cn/js/pro_js_operators_relational.asp)

【4】《javascript权威指南(第6版)》第4章 表达式和运算符

【5】《javascript高级程序设计(第3版)》第3章 基本概念 

【6】《javascript DOM编程艺术(第2版)》第2章 Javascript语法

