# javascript类型系统——数组array

&emsp;&emsp;除了对象之外，数组Array类型可能是javascript中最常用的类型了。而且，javascript中的数组与其他多数语言中的数组有着相当大的区别。本文将介绍javascript中的数组Array类型

&nbsp;

### 创建数组

&emsp;&emsp;有两种创建数组的方法：使用字面量语法和使用Array()构造函数

**【字面量】**

&emsp;&emsp;使用数组字面量是创建数组最简单的方法，在方括号中将数组元素用逗号隔开即可

<div>
<pre>var empty = [];                    //没有元素的数组
var primes = [2,3,5,7,11];         //有5个数值的数组
</pre>
</div>

&emsp;&emsp;虽然javascript数组与其他语言中的数组都是数据的有序列表，但与其他语言不同的是，javascript数组的每一项可以保存任何类型的数据

<div>
<pre>var misc = [1.1,true, "a"];           //3个不同类型的元素</pre>
</div>

&emsp;&emsp;数组字面量中的值不一定要是常量，它们可以是任意的表达式

<div>
<pre>var base = 1024;
var table = [base,base+1,base+2,base+3];</pre>
</div>

&emsp;&emsp;它可以包含对象字面量或其他数组字面量

<div>
<pre>var b = [ [1,{x:1,y:2}],[2,{x:3,y:4}] ];</pre>
</div>

&emsp;&emsp;如果数组的元素还是数组，就形成了多维数组

<div>
<pre>var a = [[1, 2], [3, 4]];</pre>
</div>

&emsp;&emsp;注意：使用数字字面量表示法时，不会调用Array构造函数

**【构造函数】**

&emsp;&emsp;有三种方式调用构造函数

&emsp;&emsp;【1】没有参数，创建一个空数组

<div>
<pre>//该方法创建一个没有任何元素的空数组，等同于数组直接量[]
var a = new Array();</pre>
</div>

&emsp;&emsp;【2】有一个数值参数，该参数用于指定数组的长度

<div>
<pre>var a  = new Array(10);
console.log(a);//[]
console.log(a[0],a.length);//undefined 10</pre>
</div>

&emsp;&emsp;注意：若存在一个其他类型的参数，则会创建包含那个值的只有一项的数组

<div>
<pre>var a  = new Array('10');
console.log(a);//['10']
console.log(a[0],a.length);//10 1</pre>
</div>

&emsp;&emsp;【3】有多个参数时，参数表示为数组的具体元素

<div>
<pre>var a = new Array(1,2,3);
console.log(a);//[1,2,3]
console.log(a[0],a[1],a[2]);//1 2 3</pre>
</div>

&emsp;&emsp;使用Array()构造函数时，可以省略new操作符

<div>
<pre>var a1 = Array();
var a2 = Array(10);
var a3 = Array(1,2,3);
console.log(a1,a2,a3);//[] [] [1,2,3]</pre>
</div>

&nbsp;

### 数组本质

&emsp;&emsp;数组是按次序排列的一组值，本质上，数组是一种特殊的对象

<div>
<pre>typeof [1, 2, 3] // "object"</pre>
</div>

&emsp;&emsp;数组的特殊性体现在，它的键名是按次序排列的一组整数(0，1，2&hellip;)。由于数组成员的键名是固定的，因此数组不用为每个元素指定键名，而对象的每个成员都必须指定键名

<div>
<pre>var arr = ['a', 'b', 'c'];
console.log(Object.keys(arr));// ["0", "1", "2"]
var obj = {
    name1: 'a',
    name2: 'b',
    name3: 'c'
};</pre>
</div>

&emsp;&emsp;数组是对象的特殊形式，使用方括号访问数组元素就像用方括号访问对象的属性一样

&emsp;&emsp;javascript语言规定，对象的键名一律为字符串，所以，数组的键名其实也是字符串。之所以可以用数值读取，是因为非字符串的键名会被转为字符串，然后将其作为属性名来使用

<div>
<pre>o={};       //创建一个普通的对象
o[1]="one"; //用一个整数来索引它
//数值键名被自动转成字符串
var arr = ['a', 'b', 'c'];
arr['0'] // 'a'
arr[0] // 'a'</pre>
</div>

&emsp;&emsp;但是，一定要区分数组索引和对象的属性名：所有的索引都是属性名，但只有在0~2<sup>32</sup>-2(4294967294)之间的整数属性名才是索引

<div>
<pre>var a = [];
//索引
a['1000'] = 'abc';
a[1000] // 'abc'
//索引
a[1.00] = 6;
a[1] // 6</pre>
</div>

&emsp;&emsp;注意：单独的数值不能作为[标识符](http://www.cnblogs.com/xiaohuochai/p/5549833.html#anchor2)(identifier)。所以，数组成员只能用方括号法表示

<div>
<pre>var arr = [1, 2, 3];
arr[0];//1
arr.0;//SyntaxError</pre>
</div>

&emsp;&emsp;可以使用负数或非整数来索引数组。但由于其不在0~2的32次方-2的范围内，所以其只是数组的属性名，而不是数组的索引，明显的特征是不改变数组的长度

<div>
<pre>var a = [1,2,3];
//属性名
a[-1.23]=true;
console.log(a.length);//3
//索引
a[10] = 5;
console.log(a.length);//11
//属性名
a['abc']='testing';
console.log(a.length);//11</pre>
</div>

&nbsp;

### 稀疏数组

&emsp;&emsp;稀疏数组就是包含从0开始的不连续索引的数组

&emsp;&emsp;【1】制造稀疏数组最直接的方法就是使用delete操作符

<div>
<pre>var a = [1,2,3,4,5];
delete a[1];
console.log(a[1]);//undefined
console.log(1 in a);//false</pre>
</div>

&emsp;&emsp;【2】数组的逗号之间可以省略元素值，通过省略元素值也可以制造稀疏数组

<div>
<pre>var a =[1,,3,4,5];
console.log(a[1]);//undefined
console.log(1 in a);//false</pre>
</div>

&emsp;&emsp;注意：省略的元素值和值为undefined的元素值是有区别的

<div>
<pre>var a =[1,,3,4,5];
console.log(a[1]);//undefined
console.log(1 in a);//false
var a =[1,undefined,3,4,5];
console.log(a[1]);//undefined
console.log(1 in a);//true</pre>
</div>

&emsp;&emsp;如果在数组的末尾使用逗号时，浏览器之间是有差别的。标准浏览器会忽略该逗号，而IE8-浏览器则会在末尾添加undefined值

<div>
<pre>//标准浏览器输出[1,2]，而IE8-浏览器输出[1,2,undefined]
var a = [1,2,];
console.log(a);
//标准浏览器输出2，而IE8-浏览器输出3
var a = [,,];
console.log(a.length);</pre>
</div>

&emsp;&emsp;足够稀疏的数组通常在实现上比稠密的数组更慢，内存利用率更高，在这样的数组中查找元素的时间与常规对象属性的查找时间一样长

&nbsp;

### 数组长度

&emsp;&emsp;每个数组有一个length属性，就是这个属性使其区别于常规的javascript对象。针对稠密(也就是非稀疏)数组，length属性值代表数组中元素的个数，其值比数组中最大的索引大1

<div>
<pre>[].length     //=&gt;0:数组没有元素
['a','b','c'].length   //=&gt;3:最大的索引为2，length为3</pre>
</div>

&emsp;&emsp;当数组是稀疏数组时，length属性值大于元素的个数，同样地，其值比数组中最大的索引大1

<div>
<pre>[,,,].length; //3
(Array(10)).length;//10
var a = [1,2,3];
console.log(a.length);//3
delete a[1];
console.log(a.length);//3</pre>
</div>

&emsp;&emsp;数组的特殊性主要体现在数组长度是可以动态调整的：

&emsp;&emsp;【1】如果为一个数组元素赋值，索引i大于等于现有数组的长度时，length属性的值将设置为i+1

<div>
<pre>var arr = ['a', 'b'];
arr.length // 2
arr[2] = 'c';
arr.length // 3
arr[9] = 'd';
arr.length // 10
arr[1000] = 'e';
arr.length // 1001</pre>
</div>

&emsp;&emsp;【2】设置length属性为小于当前长度的非负整数n时，当前数组索引值大于等于n的元素将从中删除

<div>
<pre>a=[1,2,3,4,5];   //从5个元素的数组开始
a.length = 3;    //现在a为[1,2,3]
a.length = 0;    //删除所有的元素。a为[]
a.length = 5;    //长度为5，但是没有元素，就像new Array(5)</pre>
</div>

&emsp;&emsp;注意：将数组清空的一个有效方法，就是将length属性设为0

<div>
<pre>var arr = [ 'a', 'b', 'c' ];
arr.length = 0;
arr // []    </pre>
</div>

&emsp;&emsp;【3】将数组的length属性值设置为大于其当前的长度。实际上这不会向数组中添加新的元素，它只是在数组尾部创建一个空的区域

<div>
<pre>var a = ['a'];
a.length = 3;
console.log(a[1]);//undefined
console.log(1 in a);//false</pre>
</div>

&emsp;&emsp;如果人为设置length为不合法的值(即0&mdash;&mdash;2<sup>32</sup>-2范围以外的值)，javascript会报错

<div>
<pre>// 设置负值
[].length = -1// RangeError: Invalid array length
// 数组元素个数大于等于2的32次方
[].length = Math.pow(2,32)// RangeError: Invalid array length
// 设置字符串
[].length = 'abc'// RangeError: Invalid array length</pre>
</div>

&emsp;&emsp;由于数组本质上是对象，所以可以为数组添加属性，但是这不影响length属性的值

<div>
<pre>var a = [];
a['p'] = 'abc';
console.log(a.length);// 0
a[2.1] = 'abc';
console.log(a.length);// 0</pre>
</div>

&nbsp;

### 数组遍历

&emsp;&emsp;使用for循环遍历数组元素是最常见的方法

<div>
<pre>var a = [1, 2, 3];
for(var i = 0; i &lt; a.length; i++) {
  console.log(a[i]);
}</pre>
</div>

&emsp;&emsp;当然，也可以使用while循环

<div>
<pre>var a = [1, 2, 3];
var i = 0;
while (i &lt; a.length) {
  console.log(a[i]);
  i++;
}
var l = a.length;
while (l--) {
  console.log(a[l]);
}</pre>
</div>

&emsp;&emsp;但如果数组是稀疏数组时，使用for循环，就需要添加一些条件

<div>
<pre>//跳过不存在的元素
var a = [1,,,2];
for(var i = 0; i &lt; a.length; i++){
    if(!(i in a)) continue;
    console.log(a[i]);
}</pre>
</div>

&emsp;&emsp;还可以使用for/in循环处理稀疏数组。循环每次将一个可枚举的属性名（包括数组索引）赋值给循环变量。不存在的索引将不会遍历到

<div>
<pre>var a = [1,,,2];
for(var i in a){
    console.log(a[i]);
}</pre>
</div>

&emsp;&emsp;由于for/in循环能够枚举继承的属性名，如添加到Array.prototype中的方法。由于这个原因，在数组上不应该使用for/in循环，除非使用额外的检测方法来过滤不想要的属性

<div>
<pre>var a = [1,,,2];
a.b = 'b';
for(var i in a){
    console.log(a[i]);//1 2 'b'
}</pre>
</div>
<div>
<pre>//跳过不是非负整数的i
var a = [1,,,2];
a.b = 'b';
for(var i in a){
    if(String(Math.floor(Math.abs(Number(i)))) !== i) continue;
    console.log(a[i]);//1 2
}</pre>
</div>

&emsp;&emsp;javascript规范允许for/in循环以不同的顺序遍历对象的属性。通常数组元素的遍历实现是升序的，但不能保证一定是这样的。特别地，如果数组同时拥有对象属性和数组元素，返回的属性名很可能是按照创建的顺序而非数值的大小顺序。如果算法依赖于遍历的顺序，那么最好不要使用for/in而用常规的for循环

&nbsp;

### 类数组

&emsp;&emsp;拥有length属性和对应非负整数属性的对象叫做类数组(array-like object)

<div>
<pre>//类数组演示
var a = {};
var i = 0;
while(i &lt; 10){
    a[i] = i*i;
    i++;
}
a.length = i;
var total = 0;
for(var j = 0; j &lt; a.length; j++){
    total += a[j];
}</pre>
</div>

&emsp;&emsp;有三个常见的类数组对象：

&emsp;&emsp;【1】arguments对象

<div>
<pre>// arguments对象
function args() { return arguments }
var arrayLike = args('a', 'b');
arrayLike[0] // 'a'
arrayLike.length // 2
arrayLike instanceof Array // false</pre>
</div>

&emsp;&emsp;【2】DOM方法(如document.getElementsByTagName()方法)返回的对象

<div>
<pre>// DOM元素
var elts = document.getElementsByTagName('h3');
elts.length // 3
elts instanceof Array // false</pre>
</div>

&emsp;&emsp;【3】字符串

<div>
<pre>// 字符串
'abc'[1] // 'b'
'abc'.length // 3
'abc' instanceof Array // false</pre>
</div>

&emsp;&emsp;注意：字符串是不可变值，故当把它们作为数组看待时，它们是只读的。如push()、sort()、reverse()、splice()等数组方法会修改数组，它们在字符串上是无效的，且会报错

<div>
<pre>var str = 'abc';
Array.prototype.forEach.call(str, function(chr) {
  console.log(chr);//a b c
});

Array.prototype.splice.call(str,1);
console.log(str);//TypeError: Cannot delete property '2' of [object String]</pre>
</div>

&emsp;&emsp;数组的slice方法将类数组对象变成真正的数组

<div>
<pre>var arr = Array.prototype.slice.call(arrayLike);</pre>
</div>

&emsp;&emsp;javascript数组方法是特意定义为通用的，因此它们不仅应用在真正的数组而且在类数组对象上都能正确工作。在ECMAScript5中，所有的数组方法都是通用的。在ECMAScript3中，除了toString()和toLocaleString()以外的所有方法也是通用的

<div>
<pre>var a = {'0':'a','1':'b','2':'c',length:3};
Array.prototype.join.call(a,'+');//'a+b+c'
Array.prototype.slice.call(a,0);//['a','b','c']
Array.prototype.map.call(a,function(x){return x.toUpperCase();});//['A','B','C']</pre>
</div>

&nbsp;

### 数组乱序

&emsp;&emsp;数组乱序的英文为shuffle，也称为洗牌。一般地，有如下两种方法

&emsp;&emsp;1、给数组原生的sort()方法传入一个函数，此函数随机返回1或-1，达到随机排列数组元素的目的

<div>
<pre>var array = [1,2,3,4,5];
console.log(array.sort(function(){return Math.random() - 0.5}));//[2,1,5,4,3]</pre>
</div>

&emsp;&emsp;如果打乱100000个元素的数组，则需要100ms左右

<div>
<pre>var arr = [];
var NUM = 100000;
for(var i = 0; i &lt; NUM; i++){
  arr.push(i);
}
var startTime = +new Date();
arr.sort(function(){return Math.random() - 0.5});
console.log(+new Date() - startTime);//100</pre>
</div>

&emsp;&emsp;2、第二种方法是依次遍历数组中的每个元素，遍历到的元素与一个随机位置的元素交换值

<div>
<pre>var arr = [1,2,3,4,5];
for(var i = 0 ; i &lt; arr.length; i++){
  var randomIndex = Math.floor(Math.random()*arr.length);
  [arr[i],arr[randomIndex]] = [arr[randomIndex],arr[i]];
}
console.log(arr);//[2, 3, 1, 4, 5]</pre>
</div>

&emsp;&emsp;如果打乱100000个元素的数组，需要13ms左右，因此第二种方法效率较高

<div>
<pre>var arr = [];
var NUM = 100000;
for(var i = 0; i &lt; NUM; i++){
  arr.push(i);
}
var startTime = +new Date();
for(var i = 0 ; i &lt; arr.length; i++){
  var randomIndex = Math.floor(Math.random()*arr.length);
  [arr[i],arr[randomIndex]] = [arr[randomIndex],arr[i]];
}
console.log(+new Date() - startTime);//13</pre>
</div>

&emsp;&emsp;注意：如果不使用ES6的语法，则可以使用位运算来实现变量值的互换

```
var a=10,b=9;
a ^= b, b ^= a, a ^= b;
console.log(a,b);//9,10
```  

&nbsp;

## 参考资料

【1】 ES5/array对象 [https://www.w3.org/html/ig/zh/wiki/ES5/builtins#Array_.E5.AF.B9.E8.B1.A1](https://www.w3.org/html/ig/zh/wiki/ES5/builtins#Array_.E5.AF.B9.E8.B1.A1)

【2】 阮一峰Javascript标准参考教程&mdash;&mdash;基本语法 [http://javascript.ruanyifeng.com/grammar/array.html](http://javascript.ruanyifeng.com/grammar/array.html)

【3】《javascript权威指南(第6版)》第7章 数组

【4】《javascript高级程序设计(第3版)》第5章 引用类型

【5】《javascript DOM编程艺术(第2版)》第2章 javascript语法

【6】《javascript语句精粹》第6章 数组
