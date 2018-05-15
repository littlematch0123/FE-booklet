# javascript运算符——位运算符

&emsp;&emsp;位运算符是非常底层的运算，由于其很不直观，所以并不常用。但是，其速度极快，且合理使用能达到很好的效果。本文将介绍javascript中常常被忽视的运算符&mdash;&mdash;位运算符

&nbsp;

### 二进制表示

&emsp;&emsp;ECMAScript中的所有数值都以IEEE-754 64位格式存储，但位操作符并不直接操作64位的值，而是以32位带符号的整数进行运算的，并且返回值也是一个32位带符号的整数

&emsp;&emsp;这种位数转换使得在对特殊的NaN和Infinity值应用位操作时，这两个值都会被当成0来处理

&emsp;&emsp;如果对非数值应用位操作符，会先使用Number()将该值转换成数值再应用位操作，得到的结果是一个数值

<div>
<pre>//'|'表示按位或，一个整数与0按位或运算可以得到它本身，一个小数与0按位或运算可以得到取整效果
console.log( 1.3 | 0);//1
console.log( 1.8 | 0);//1
console.log( Infinity | 0);//0
console.log( -Infinity | 0);//0
console.log( NaN | 0);//0
console.log('12px' | 0);//0
console.log('12' | 0);//12</pre>
</div>

&emsp;&emsp;有符号整数使用32位中的前31位表示整数数值，用第32位表示整数符号，0表示正数，1表示负数。表示符号的位叫做符号位，符号位的值决定了其他位数值的格式。其中，正数以纯二进制格式存储，31位中的每一位都表示2的幂。第一位(叫做位0)表示2的0次，第二位表示2的1次，以此类推。没有用到的位以0填充，即忽略不计

&emsp;&emsp;例如，数值18的二进制表示是00000000000000000000000000010010，或者更简洁的10010。这是5个有效位，这5位本身就决定了实际的值

![bit1](https://pic.xiaohuochai.site/blog/JS_ECMA_grammer_bit1.gif)

<div>
<pre>console.log((18).toString(2));//"10010"
console.log(0b00000000000000000000000000010010);//18</pre>
</div>

![bit2](https://pic.xiaohuochai.site/blog/JS_ECMA_grammer_bit2.gif)

&emsp;&emsp;负数同样以二进制存储，但使用的格式是二进制补码。计算一个数值的二进制补码，需要经过下列3个步骤：

&emsp;&emsp;【1】求这个数值绝对值的二进制码

&emsp;&emsp;【2】求二进制反码，即将0替换成1，将1替换成0

&emsp;&emsp;【3】得到的二进制反码加1

&emsp;&emsp;例如，要确定-18的二进制表示，首先必须得到18的二进制表示，如下所示：

<div>
<pre>0000 0000 0000 0000 0000 0000 0001 0010</pre>
</div>

&emsp;&emsp;接下来，计算二进制反码，如下所示：

<div>
<pre>1111 1111 1111 1111 1111 1111 1110 1101</pre>
</div>

&emsp;&emsp;最后，在二进制反码上加 1，如下所示：

<div>
<pre>1111 1111 1111 1111 1111 1111 1110 1101
                                      1
---------------------------------------
1111 1111 1111 1111 1111 1111 1110 1110</pre>
</div>

&emsp;&emsp;因此，-18 的二进制表示即 1111 1111 1111 1111 1111 1111 1110 1110

&emsp;&emsp;ECMAScript会尽力向我们隐藏所有这些信息，在以二进制字符串形式输出一个负数时，我们看到的只是这个负数绝对值的二进制码前面加上了一个负号

<div>
<pre>var num = -18;
console.log(num.toString(2));//'-10010'</pre>
</div>

&emsp;&emsp;位运算符可以进行7种运算，包括按位非(NOT)、按位与(AND)、按位或(OR)、按位异或(XOR)、左移、有符号右移和无符号右移

&nbsp;

### 按位非(NOT)

&emsp;&emsp;按位非操作符由一个波浪线(~)表示，执行按位非的结果就是返回数值的反码。其本质是操作数的负值减1

<div>
<pre>var num1 = 25;
var num2 = ~num1;
console.log(num2);//-26</pre>
</div>

&emsp;&emsp;对一个整数两次按位非，可以得到它本身；对一个小数两次按位非，可以得到取整效果

<div>
<pre>console.log(~~3);//3
console.log(~~3.1);//3
console.log(~~3.9);//3</pre>
</div>

&nbsp;

### 按位与(AND)

&emsp;&emsp;按位与操作符由一个和号符号(&amp;)表示，它有两个操作符数。从本质上讲，按位与操作就是将两个数值的每一位对齐，然后根据下表中的规则，对相同位置上的两个数执行AND操作

<div>
<pre>第一个数值的位        第二个数值的位         结果
1                        1                1
1                        0                0
0                        1                0
0                        0                0</pre>
</div>

&emsp;&emsp;按位与操作只有在两个数值的对应位都是1时才返回1，任何一位是0，结果都是0

<div>
<pre>var iResult = 25 &amp; 3;
console.log(iResult);//"1"</pre>
</div>
<div>
<pre>//分析如下
 25 = 0000 0000 0000 0000 0000 0000 0001 1001
  3 = 0000 0000 0000 0000 0000 0000 0000 0011
---------------------------------------------
AND = 0000 0000 0000 0000 0000 0000 0000 0001</pre>
</div>

&nbsp;

### 按位或(OR)

&emsp;&emsp;按位或操作符由一个竖线符号(|)表示，同样也有两个操作数，按位或操作遵循下面这个真值表

<div>
<pre>第一个数值的位        第二个数值的位         结果
1                        1                1
1                        0                1
0                        1                1
0                        0                0</pre>
</div>

&emsp;&emsp;按位或操作在有一个位是1的情况下就返回1，而只有在两个位都是0的情况下才返回0

<div>
<pre>var iResult = 25 | 3;
console.log(iResult);//"27"</pre>
</div>
<div>
<pre>//分析如下
25 = 0000 0000 0000 0000 0000 0000 0001 1001
 3 = 0000 0000 0000 0000 0000 0000 0000 0011
--------------------------------------------
OR = 0000 0000 0000 0000 0000 0000 0001 1011</pre>
</div>

一个整数与0按位或运算可以得到它本身，一个小数与0按位或运算可以得到取整效果

<div>
<pre>console.log(3.1 | 0);//3
console.log(3.9 | 0);//3</pre>
</div>

&nbsp;

### 按位异或(XOR)

&emsp;&emsp;按位异或操作符由一个插入符号(^)表示，也有两个操作数。以下是按位异或的真值表

<div>
<pre>第一个数值的位        第二个数值的位         结果
1                        1                0
1                        0                1
0                        1                1
0                        0                0</pre>
</div>

&emsp;&emsp;按位异或的两个数值相同时返回0，不同时返回1

<div>
<pre>var iResult = 25 ^ 3;
console.log(iResult);//"26"</pre>
</div>
<div>
<pre>//分析如下
 25 = 0000 0000 0000 0000 0000 0000 0001 1001
  3 = 0000 0000 0000 0000 0000 0000 0000 0011
---------------------------------------------
XOR = 0000 0000 0000 0000 0000 0000 0001 1010</pre>
</div>

&emsp;&emsp;&ldquo;异或运算&rdquo;有一个特殊运用，连续对两个数a和b进行三次异或运算，a&circ;=b, b&circ;=a, a&circ;=b，可以互换它们的值。这意味着，使用&ldquo;异或运算&rdquo;可以在不引入临时变量的前提下，互换两个变量的值

<div>
<pre>var a=10,b=9;
a ^= b, b ^= a, a ^= b;
console.log(a,b);//9,10</pre>
</div>
<div>
<pre>//分析如下
  a = 0000 0000 0000 0000 0000 0000 0000 1010
  b = 0000 0000 0000 0000 0000 0000 0000 1001
---------------------------------------------
 a1 = 0000 0000 0000 0000 0000 0000 0000 0011
</pre>
<pre>
 a1 = 0000 0000 0000 0000 0000 0000 0000 0011 
  b = 0000 0000 0000 0000 0000 0000 0000 1001
---------------------------------------------
 b1 = 0000 0000 0000 0000 0000 0000 0000 1010
</pre>
<pre>
 b1 = 0000 0000 0000 0000 0000 0000 0000 1010 
 a1 = 0000 0000 0000 0000 0000 0000 0000 0011 
---------------------------------------------
 a2 = 0000 0000 0000 0000 0000 0000 0000 1001
//a=a2=10;b=b1=9
</pre>
</div>

&emsp;&emsp;一个整数与0按位异或可以保持其自身，一个小数与0按位异或可以取整

<div>
<pre>console.log(3.1 ^ 0);//3
console.log(3.9 ^ 0);//3</pre>
</div>

&nbsp;

### 左移

&emsp;&emsp;左移操作符由两个小于号(&lt;&lt;)表示，这个操作符会将数值的所有位向左移动指定的位数

&emsp;&emsp;例如，如果将数值2(二进制码为10)向左移动5位，结果就是64(1000000)

![bit3](https://pic.xiaohuochai.site/blog/JS_ECMA_grammer_bit3.gif)

<div>
<pre>var oldValue = 2;
var newValue = oldValue&lt;&lt;5;
console.log(newValue);//64</pre>
</div>

&emsp;&emsp;左移不会影响操作数的符号位。换句话说，如果将-2向左移动5位，结果将是-64

<div>
<pre>var oldValue = -2;
var newValue = oldValue&lt;&lt;5;
console.log(newValue);//-64</pre>
</div>

&emsp;&emsp;左移0位可以实现取整效果

<div>
<pre>console.log(3.1 &lt;&lt; 0);//3
console.log(3.9 &lt;&lt; 0);//3</pre>
</div>

&nbsp;

### 有符号右移

&emsp;&emsp;有符号的右移操作符由两个大于号(&gt;&gt;)表示，这个操作符会将数值向右移动，但保留符号位(即正负号标记)。有符号的右移操作与左移操作正好相反，即如果将64向右移动5位，结果将变回2

<div>
<pre>var oldValue = 64;
var newValue = oldValue&gt;&gt;5;
console.log(newValue);//2</pre>
</div>

&emsp;&emsp;同样，在移位过程中，原数值中也会出现空位。只不过这次的空位出现在原数值的左侧、符号位的右侧。而此时ECMAScript会用符号位的值来填充所有空位，以便得到一个完整的值

&emsp;&emsp;右移可以模拟2的整除运算

<div>
<pre>console.log(5&gt;&gt;1);//2
console.log(15&gt;&gt;1);//7</pre>
</div>

&nbsp;

### 无符号右移

&emsp;&emsp;无符号右移操作符由3个大于号(&gt;&gt;&gt;)表示，这个操作符会将数值的所有32位都向右移动。对正数来说，无符号右移的结果与有符号右移相同。仍以前面有符号右移为便，如果将64无符号右移5位，结果仍然是2

<div>
<pre>var oldValue = 64;
var newValue = oldValue&gt;&gt;&gt;5;
console.log(newValue);//2</pre>
</div>

&emsp;&emsp;但是，对负数就不一样了。首先，无符号右移是以0来填充空位，而不是像有符号右移那样以符号位的值来填充空位。所以，对正数的无符号右移与有称号右移结果相同，但对负数的结果就不同了。其次，无符号右移操作符会把负数的二进制码当成正数的二进制码。而且，由于负数以其绝对值的二进制补码形式表示，因此就会导致无符号右移后的结果非常之大

<div>
<pre>var oldValue = -64;
var newValue = oldValue&gt;&gt;&gt;5;
console.log(newValue)//134217726</pre>
</div>

&emsp;&emsp;要确定-64的二进制表示，首先必须得到64的二进制表示，如下所示：

<div>
<pre>0000 0000 0000 0000 0000 0000 0100 0000</pre>
</div>

&emsp;&emsp;接下来，计算二进制反码，如下所示：

<div>
<pre>1111 1111 1111 1111 1111 1111 1011 1111</pre>
</div>

&emsp;&emsp;最后，在二进制反码上加 1，如下所示

<div>
<pre>1111 1111 1111 1111 1111 1111 1011 1111
                                      1
---------------------------------------
1111 1111 1111 1111 1111 1111 1100 0000</pre>
</div>

&emsp;&emsp;向右移动5位后，如下所示：

<div>
<pre>0000 0111 1111 1111 1111 1111 1111 1110</pre>
</div>
<div>
<pre>console.log(0b00000111111111111111111111111110);//134217726</pre>
</div>

&nbsp;

### 常见应用

【1】乘法运算

&emsp;&emsp;利用左移(&lt;&lt;)来实现乘法运算

<div>
<pre>console.log(2 &lt;&lt; 1);//4
console.log(3 &lt;&lt; 1);//6
console.log(4 &lt;&lt; 1);//8</pre>
</div>

【2】除法运算

&emsp;&emsp;利用有符号右移(&gt;&gt;)来模拟2的整除运算

<div>
<pre>console.log(2 &gt;&gt; 1);//1
console.log(5 &gt;&gt; 1);//2
console.log(8 &gt;&gt; 1);//4
console.log(9 &gt;&gt; 1);//4</pre>
</div>

【3】值互换

&emsp;&emsp;利用异或操作(^)可以实现值互换的效果

<div>
<pre>var a=10,b=9;
a ^= b, b ^= a, a ^= b;
console.log(a,b);//9,10</pre>
</div>

【4】小数取整

&emsp;&emsp;利用取两次按位非、与0按位或、与0按位异或、左移0位、右移0位都可以实现小数取整效果

<div>
<pre>console.log(~~3.1);//3
console.log(3.1|0);//3
console.log(3.1^0);//3
console.log(3.1&lt;&lt;0);//3
console.log(3.1&gt;&gt;0);//3</pre>
</div>

【5】开关

&emsp;&emsp;位运算符可以用作设置对象属性的开关。假定某个对象有四个开关，每个开关都是一个变量。那么，可以设置一个四位的二进制数，它的每个位对应一个开关

<div>
<pre>var FLAG_A = 1; // 0001
var FLAG_B = 2; // 0010
var FLAG_C = 4; // 0100
var FLAG_D = 8; // 1000</pre>
</div>

&emsp;&emsp;上面代码设置A、B、C、D四个开关，每个开关分别占有一个二进制位

&emsp;&emsp;现在假设需要打开ABD三个开关，我们可以构造一个掩码变量

<div>
<pre>var mask = FLAG_A | FLAG_B | FLAG_D;
// 0001 | 0010 | 1000 =&gt; 1011</pre>
</div>

&emsp;&emsp;上面代码对ABD三个变量进行&ldquo;或运算&rdquo;，得到掩码值为二进制的1011

<div>
<pre>//&ldquo;或运算&rdquo;可以确保打开指定的开关
flags = flags | mask;</pre>
</div>
<div>
<pre>//&ldquo;与运算&rdquo;可以将当前设置中凡是与开关设置不一样的项，全部关闭
flags = flags &amp; mask;</pre>
</div>
<div>
<pre>//&ldquo;异或运算&rdquo;可以切换（toggle）当前设置，即第一次执行可以得到当前设置的相反值，再执行一次又得到原来的值
flags = flags ^ mask;</pre>
</div>
<div>
<pre>//&ldquo;否运算&rdquo;可以翻转当前设置，即原设置为0，运算后变为1；原设置为1，运算后变为0
flags = ~flags;</pre>
</div>

&nbsp;

## 参考资料

【1】 ES5/位运算移位运算符 [https://www.w3.org/html/ig/zh/wiki/ES5/expressions](https://www.w3.org/html/ig/zh/wiki/ES5/expressions#.E7.A7.BB.E4.BD.8D.E8.BF.90.E7.AE.97.E7.AC.A6)

【2】 阮一峰Javascript标准参考教程&mdash;&mdash;运算符 [http://javascript.ruanyifeng.com/grammar/operator.html#toc16](http://javascript.ruanyifeng.com/grammar/operator.html#toc16)

【3】《javascript权威指南(第6版)》第4章 表达式和运算符

【4】《javascript高级程序设计(第3版)》 第3章 基本概念
