# javascript运算符语法概述

&emsp;&emsp;javascript中的运算符大多由标点符号表示，少数由关键字表示，它们的语法言简意赅，它们的数量却着实不少。运算符始终都遵循着一些固定语法，只有了解并掌握这些内容，才能正确使用运算符。本文将主要介绍javascript运算符语法概述

&nbsp;

### 操作数个数

&emsp;&emsp;javascript的运算符总共有46个，如果根据其操作数的个数进行分类，则大多数是二元运算符(binary operator)，它们的操作数都是两个，它们将两个表达式合并成复杂表达式

<div>
<pre>1 + 2;
true || false;</pre>
</div>

&emsp;&emsp;javascript中的一元运算符(unary operator)将一个表达式转换为另一个稍复杂的表达式，主要包括以下9个：

<div>
<pre>++ -- - + ~ ! delete typeof void</pre>
</div>
<div>
<pre>a++;
typeof true;</pre>
</div>

&emsp;&emsp;javascript只有一个三元运算符(ternary operator)，是条件判断运算符?:，它将三个表达式合并成一个表达式

<div>
<pre>2&gt;1 ? 2 : 1;</pre>
</div>

&nbsp;

### 优先级

&emsp;&emsp;运算符优先级控制着运算符的执行顺序，优先级高的运算符的执行总是先于优先级运算符低的运算符

&emsp;&emsp;46个运算符总共分为14级的优先级，从高到低依次是：

<div>
<pre>1  ++ -- - + ~ ! delete typeof void
2  * / %
3  + -
4  &lt;&lt; &gt;&gt; &gt;&gt;&gt;
5  &lt; &lt;= &gt; &gt;= instanceof in
6  == != === !==
7  &amp;
8  ^
9  |
10 &amp;&amp;
11 ||
12 ?:
13 = *= /= %= += -= &amp;= ^= |= &lt;&lt;= &gt;&gt;= &gt;&gt;&gt;=
14 ,</pre>
</div>

&emsp;&emsp;由这14级的运算符优先级等级可以看出：

<div>
<pre>一元运算符 &gt; 算术运算符 &gt; 比较运算符 &gt; 逻辑运算符 &gt; 三元运算符 &gt; 赋值运算符 &gt; 逗号运算符</pre>
</div>

&emsp;&emsp;[注意]逻辑取反运算符属于一元运算符，其优先级最高

**例子**

<div>
<pre>!2&lt;1&amp;&amp;4*3+1;</pre>
</div>

&emsp;&emsp;像上面这种情况就比较复杂，逐步来分解其运算顺序

&emsp;&emsp;先计算一元运算符!，!2;//false

<div>
<pre>//于是表达式变为
false &lt; 1 &amp;&amp; 4*3 + 1;</pre>
</div>

&emsp;&emsp;计算算术运算符4*3+1;//13

<div>
<pre>//于是表达式变为
false &lt; 1 &amp;&amp; 13;</pre>
</div>

&emsp;&emsp;计算比较运算符&lt;，false&lt;1;//true

<div>
<pre>//于是表达式变为:
true &amp;&amp; 13;//13</pre>
</div>

&emsp;&emsp;可以使用圆括号来强行指定运算次序

<div>
<pre>2+3*5;//17
(2+3)*5;//25;</pre>
</div>

&nbsp;

### 结合性

&emsp;&emsp;运算符具有两种结合性，一种是从左向右结合，记号为L，一种是从右向左结合，记号为R。结合性指定了在多个具有同样优先级的运算符表达式中的运算顺序

&emsp;&emsp;多数运算符都具有从左向右的结合性，只有一元运算符、条件运算符和赋值运算符具有从右向左的结合性

<div>
<pre>w = x + y + z;
//等价于:
w = ((x + y)+ z);</pre>
</div>
<div>
<pre>w = x = y = z;
//等价于:
w = (x = (y = z));</pre>
</div>
<div>
<pre>q = a ? b : c ? d : e ? f : g;
//等价于:
q = a ? b : (c ? d : (e ? f : g));    </pre>
</div>

&emsp;&emsp;运算符的优先级和结合性决定了它们在复杂表达式中的运算顺序，但子表达式相互有影响时，顺序会发生变化

**例子**

<div>
<pre>a = 1;
b = a++ + a-- * a++;</pre>
</div>

&emsp;&emsp;先分析该表达式中，根据优先级的顺序，分别运算递增运算符、乘法运算符、加法运算符和赋值运算符

&emsp;&emsp;先计算第一个a++;//结果为1，a为2

<div>
<pre>//表达式变成
b = 1 + a-- * a++;</pre>
</div>

&emsp;&emsp;计算a--;//结果为2，a为1

<div>
<pre>//表达式变成
b = 1 + 2 * a++;</pre>
</div>

&emsp;&emsp;计算第二个a++;//结果为1，a为2

<div>
<pre>//表达式变成
b = 1 + 2 * 1;</pre>
</div>

&emsp;&emsp;所以，最终a = 2; b = 3;

<div>
<pre>a = 1;
b = a++ + a-- * a++;
console.log(a,b);//2 3</pre>
</div>
<div>
<pre>//类似地
a = 1;
b = a-- * a++ + a++;
console.log(a,b);//2,1</pre>
</div>

&nbsp;

### 类型

&emsp;&emsp;一些运算符可以作用于任何数据类型，但仍然希望它们的操作数是指定类型的数据，并且大多数运算符返回一个特定类型的值，在下面的运算符规则表中，箭头前为运算符操作数的类型，箭头后为运算结果的类型

【左值】

&emsp;&emsp;左值(lvalue)是一个古老的术语，指表达式只能出现在运算符的左侧

&emsp;&emsp;在javascript中，变量、对象属性和数组元素都是左值

&emsp;&emsp;递增运算符++、递减运算符--和赋值运算符的操作数类型是左值

<div>
<pre>var a = 3;
a++;//3
3--;//报错
({}).a += '1';//'undefined1'
'test' -= 'test';//报错</pre>
</div>

&nbsp;

### 运算符规则表

<div>
<pre>**运算符**             **操作**                 **类型
**++                增量                 lval-&gt;num
--                减量                 lval-&gt;num
-                 求反                 num-&gt;num
+                 转换为数字            num-&gt;num
~                 按位求反              int-&gt;int
!                 逻辑非                bool-&gt;bool
delete            删除属性              lval-&gt;bool
typeof            检测类型              any-&gt;str
void              返回undefined         any-&gt;undef
******************************************************
* \ %             乘、除、求余           num,num-&gt;num
******************************************************
+ -               加、减                num,num-&gt;num
+                 字符串连接             str,str-&gt;str
******************************************************
&lt;&lt;                左移位                int,int-&gt;int
&gt;&gt;                有符号右移位           int,int-&gt;int
&gt;&gt;&gt;               无符号右移位           int,int-&gt;int
******************************************************
&lt; &lt;= &gt; &gt;=         比较数字顺序           num,num-&gt;bool
&lt; &lt;= &gt; &gt;=         比较字母表顺序         str,str-&gt;bool
instanceof        测试对象类            obj,func-&gt;bool
in                测试属性              str,obj-&gt;bool
******************************************************
==                判断相等              any,any-&gt;bool
!=                判断不等              any,any-&gt;bool
===               判断恒等              any,any-&gt;bool
!==               判断非恒等            any,any-&gt;bool
******************************************************
&amp;                 按位与                int,int-&gt;int
******************************************************
^                 按位异或              int,int-&gt;int
******************************************************
|                 按位或                int,int-&gt;int
******************************************************
&amp;&amp;                逻辑与                any,any-&gt;any
******************************************************
||                逻辑或                any,any-&gt;any
******************************************************
?:                条件运算符             bool,any,any-&gt;any
******************************************************
=                  赋值                 lval,any-&gt;any
*= /= %=
+= -= &amp;=          运算且赋值             lval,any-&gt;any
^= |= &lt;&lt;=
&gt;&gt;= &gt;&gt;&gt;=
******************************************************
,                 忽略第一个操作数，       any,any-&gt;any
                  返回第二个操作数</pre>
</div>

&nbsp;

## 参考资料

【1】 阮一峰Javascript标准参考教程&mdash;&mdash;运算符 [http://javascript.ruanyifeng.com/grammar/operator.html#toc29](http://javascript.ruanyifeng.com/grammar/operator.html#toc29)

【2】《javascript权威指南(第6版)》第4章 表达式和运算符

