# php运算符

&emsp;&emsp;运算符是可以通过给出的一或多个表达式来产生另一个表达式的东西。与javascript类似，php也拥有类似的运算符语法，本文将详细介绍php运算符

&emsp;&emsp;注意：关于javascript运算符语法[移步至此](http://www.cnblogs.com/xiaohuochai/p/5666530.html)

&nbsp;

### 总括

&emsp;&emsp;运算符可按照其能接受几个值来分组。一元运算符只能接受一个值，例如 !（逻辑取反运算符）或 ++（递增运算符）。二元运算符可接受两个值，例如熟悉的算术运算符 +（加）和 -（减），大多数 PHP 运算符都是这种。最后是唯一的三元运算符 ? :，可接受三个值；通常就简单称之为&ldquo;三元运算符&rdquo;

&emsp;&emsp;运算符优先级指定了两个表达式绑定得有多&ldquo;紧密&rdquo;。例如，表达式 1 + 5 * 3 的结果是 16 而不是 18 是因为乘号（&ldquo;*&rdquo;）的优先级比加号（&ldquo;+&rdquo;）高。必要时可以用括号来强制改变优先级。例如：(1 + 5) * 3 的值为 18

&emsp;&emsp;如果运算符优先级相同，那运算符的结合方向决定了该如何运算。例如，"-"是左联的，那么 1 - 2 - 3 就等同于 (1 - 2) - 3 并且结果是 -4. 另外一方面，"="是右联的，所以 `$a` = `$b` = `$c` 等同于 `$a` = (`$b` = `$c`)

&emsp;&emsp;注意：没有结合的相同优先级的运算符不能连在一起使用，例如 1 &lt; 2 &gt; 1 在PHP是不合法的。但另外一方面表达式 1 &lt;= 1 == 1 是合法的, 因为 == 的优先级低于 &lt;=

**优先级**

<div>
<pre>结合方向           运算符            附加信息
无                clone new        clone 和 new
左                [                array()
右                ++ -- ~         类型和递增／递减
无                instanceof        类型
右                !                逻辑运算符
左                * / %            算术运算符
左                + - .            算术运算符和字符串运算符
左                &lt;&lt; &gt;&gt;            位运算符
无                &lt; &lt;= &gt; &gt;=        比较运算符
无                == != === !== &lt;&gt; &lt;=&gt;    比较运算符
左                &amp;                位运算符和引用
左                ^                位运算符
左                |                位运算符
左                &amp;&amp;                逻辑运算符
左                ||                逻辑运算符
左                ??                比较运算符
左                ? :    ternary
右                = += -= *= **= /= .= %= &amp;= |= ^= &lt;&lt;= &gt;&gt;=    赋值运算符
左                and                逻辑运算符
左                xor                逻辑运算符
左                or                逻辑运算符</pre>
</div>

&nbsp;

### 算术运算符

<div>
<pre>-$a                取反    $a 的负值。
$a + $b            加法    $a 和 $b 的和。
$a - $b            减法    $a 和 $b 的差。
$a * $b            乘法    $a 和 $b 的积。
$a / $b            除法    $a 除以 $b 的商。
$a % $b            取模    $a 除以 $b 的余数</pre>
</div>

&emsp;&emsp;除法运算符总是返回浮点数。只有在下列情况例外：两个操作数都是整数（或字符串转换成的整数）并且正好能整除，这时它返回一个整数

&emsp;&emsp;取模运算符的操作数在运算之前都会转换成整数（除去小数部分）

&emsp;&emsp;取模运算符 % 的结果和被除数的符号（正负号）相同。即 a % b 的结果和 a 的符号相同

<div>
<pre>&lt;?php
echo (5 % 3)."\n";           // prints 2
echo (5 % -3)."\n";          // prints 2
echo (-5 % 3)."\n";          // prints -2
echo (-5 % -3)."\n";         // prints -2
?&gt;</pre>
</div>

&nbsp;

### 赋值运算符

&emsp;&emsp;基本的赋值运算符是&ldquo;=&rdquo;，它实际上意味着把右边表达式的值赋给左边的运算数

&emsp;&emsp;赋值运算表达式的值也就是所赋的值。也就是说，&ldquo;$a = 3&rdquo;的值是 3

<div>
<pre>&lt;?php
$a = ($b = 4) + 5; // $a 现在成了 9，而 $b 成了 4。
?&gt;</pre>
</div>

&emsp;&emsp;在基本赋值运算符之外，还有适合于所有二元算术，数组集合和字符串运算符的&ldquo;组合运算符&rdquo;，这样可以在一个表达式中使用它的值并把表达式的结果赋给它

<div>
<pre>x = y
x += y
x -= y
x *= y
x /= y
x %= y</pre>
</div>
<div>
<pre>&lt;?php
$a = 3;
$a += 5; // $a = $a + 5;
$b = "Hello ";
$b .= "There!"; //$b = $b . "There!";
?&gt;</pre>
</div>

**引用赋值**

&emsp;&emsp;PHP 支持引用赋值，引用赋值意味着两个变量指向了同一个数据，没有拷贝任何东西

<div>
<pre>&lt;?php
$a = 3;
$b = &amp;$a; // $b 是 $a 的引用
print "$a\n"; // 输出 3
print "$b\n"; // 输出 3
$a = 4; // 修改 $a
print "$a\n"; // 输出 4
print "$b\n"; // 也输出 4，因为 $b 是 $a 的引用，因此也被改变
?&gt;</pre>
</div>

**递增／递减**

<div>
<pre>例子     名称    效果
++$a    前加    $a 的值加一，然后返回 $a
$a++    后加    返回 $a，然后将 $a 的值加一
--$a    前减    $a 的值减一， 然后返回 $a
$a--    后减    返回 $a，然后将 $a 的值减一</pre>
</div>
<div>
<pre>&lt;?php
$x=10; 
echo ++$x; // 输出 11
$y=10; 
echo $y++; // 输出 10
$z=5;
echo --$z; // 输出 4
$i=5;
echo $i--; // 输出 5
?&gt;</pre>
</div>

&nbsp;

### 位运算符

&emsp;&emsp;位运算符允许对整型数中指定的位进行求值和操作

<div>
<pre>例子            &emsp;&emsp;名称                   结果
$a &amp; $b            And（按位与）           将把 $a 和 $b 中都为 1 的位设为 1
$a | $b            Or（按位或）            将把 $a 和 $b 中任何一个为 1 的位设为 1
$a ^ $b            Xor（按位异或）         将把 $a 和 $b 中一个为 1 另一个为 0 的位设为 1
~ $a            &emsp;&emsp;Not（按位取反）         将 $a 中为 0 的位设为 1，反之亦然
$a &lt;&lt; $b        &emsp;&emsp;Shift left（左移）     将 $a 中的位向左移动 $b 次（每一次移动都表示&ldquo;乘以 2&rdquo;）
$a &gt;&gt; $b        &emsp;&emsp;Shift right（右移）    将 $a 中的位向右移动 $b 次（每一次移动都表示&ldquo;除以 2&rdquo;）</pre>
</div>

&nbsp;

### 比较运算符

&emsp;&emsp;比较运算符，如同它们名称所暗示的，允许对两个值进行比较

<div>
<pre>例子                  名称                结果
$a == $b             等于                TRUE，如果类型转换后 $a 等于 $b
$a === $b            全等                TRUE，如果 $a 等于 $b，并且它们的类型也相同
$a != $b             不等                TRUE，如果类型转换后 $a 不等于 $b
$a &lt;&gt; $b             不等                TRUE，如果类型转换后 $a 不等于 $b
$a !== $b            不全等              TRUE，如果 $a 不等于 $b，或者它们的类型不同
$a &lt; $b              小与                TRUE，如果 $a 严格小于 $b
$a &gt; $b              大于                TRUE，如果 $a 严格大于 $b
$a &lt;= $b             小于等于            TRUE，如果 $a 小于或者等于 $b
$a &gt;= $b             大于等于            TRUE，如果 $a 大于或者等于 $b</pre>
</div>

&emsp;&emsp;如果比较一个数字和字符串或者比较涉及到数字内容的字符串，则字符串会被转换为数值并且比较按照数值来进行。此规则也适用于 switch 语句。当用 === 或 !== 进行比较时则不进行类型转换，因为此时类型和数值都要比对

<div>
<pre>&lt;?php
var_dump(0 == "a"); // 0 == 0 -&gt; true
var_dump("1" == "01"); // 1 == 1 -&gt; true
var_dump("10" == "1e1"); // 10 == 10 -&gt; true
var_dump(100 == "1e2"); // 100 == 100 -&gt; true
switch ("a") {
case 0:
    echo "0";//输出0
    break;
case "a": 
    echo "a";
    break;
}
?&gt;</pre>
</div>

**比较多种类型**

<div>
<pre>运算数 1 类型                运算数 2 类型                结果
null 或 string              string                     将 NULL 转换为 ""，进行数字或词汇比较
bool 或 null                任何其它类型                 转换为 bool，FALSE &lt; TRUE
object                      object                     内置类可以定义自己的比较，不同类不能比较string、resource、number    string、resource、number    将字符串和资源转换成数字，按普通数学比较
array                       array                      具有较少成员的数组较小，如果运算数 1 中的键不存在于运算数 2 中则数组无法比较，否则挨个值比较
object                      任何其它类型                 object 总是更大
array                       任何其它类型                 array 总是更大</pre>
</div>

**三元运算符**

&emsp;&emsp;"?:"三元运算符是一个比较运算符，对于表达式(expr1)?(expr2):(expr3)，如果expr1的值为true，则此表达式的值为expr2，否则为expr3

<div>
<pre>&lt;?php 
    $a = 78;//成绩
    $b = $a &gt;=60?"及格":"不及格";
    echo $b;//及格
?&gt;</pre>
</div>

&nbsp;

### 错误控制运算符

&emsp;&emsp;PHP 支持一个错误控制运算符：@。当将其放置在一个 PHP 表达式之前，该表达式可能产生的任何错误信息都被忽略掉

&emsp;&emsp;注意：错误控制前缀@运算符只对表达式有效，@不会屏蔽解析错误的信息，不能把它放在函数或类的定义之前，也不能用于条件结构如if和foreach等

<div>
<pre>&lt;?php
$a = 1;
echo @ $a;//1
$b;
echo @ $b;//不报错
?&gt;</pre>
</div>

&nbsp;

### 逻辑运算符

<div>
<pre>例子          名称              结果
$a and $b    And（逻辑与）      TRUE，如果 $a 和 $b 都为 TRUE
$a or $b     Or（逻辑或）       TRUE，如果 $a 或 $b 任一为 TRUE
$a xor $b    Xor（逻辑异或）    TRUE，如果 $a 或 $b 任一为 TRUE，但不同时是
! $a         Not（逻辑非）      TRUE，如果 $a 不为 TRUE
$a &amp;&amp; $b     And（逻辑与）      TRUE，如果 $a 和 $b 都为 TRUE
$a || $b     Or（逻辑或）       TRUE，如果 $a 或 $b 任一为 TRUE</pre>
</div>
<div>
<pre>&lt;?php
// foo() 根本没机会被调用，被运算符&ldquo;短路&rdquo;了
$a = (false &amp;&amp; foo());
$b = (true  || foo());
$c = (false and foo());
$d = (true  or  foo());
// --------------------
// "||" 比 "or" 的优先级高
// 表达式 (false || true) 的结果被赋给 $e
// 等同于：($e = (false || true))
$e = false || true;
// 常量 false 被赋给 $f，true 被忽略
// 等同于：(($f = false) or true)
$f = false or true;
var_dump($e, $f);//bool(true) bool(false)
// --------------------
// "&amp;&amp;" 比 "and" 的优先级高
// 表达式 (true &amp;&amp; false) 的结果被赋给 $g
// 等同于：($g = (true &amp;&amp; false))
$g = true &amp;&amp; false;
// 常量 true 被赋给 $h，false 被忽略
// 等同于：(($h = true) and false)
$h = true and false;
var_dump($g, $h);//bool(false) bool(true)
?&gt;</pre>
</div>

&nbsp;

### 字符串运算符

&emsp;&emsp;有两个字符串运算符。第一个是连接运算符（&ldquo;.&rdquo;），它返回其左右参数连接后的字符串。第二个是连接赋值运算符（&ldquo;.=&rdquo;），它将右边参数附加到左边的参数之后

<div>
<pre>&lt;?php
$a = "Hello ";
$b = $a . "World!"; // now $b contains "Hello World!"
$a = "Hello ";
$a .= "World!";     // now $a contains "Hello World!"
?&gt;</pre>
</div>

&nbsp;

### 数组运算符

<div>
<pre>例子         名称     结果
$a + $b     联合     $a 和 $b 的联合
$a == $b    相等     如果 $a 和 $b 具有相同的键／值对则为 TRUE
$a === $b   全等     如果 $a 和 $b 具有相同的键／值对并且顺序和类型都相同则为 TRUE
$a != $b    不等     如果 $a 不等于 $b 则为 TRUE
$a &lt;&gt; $b    不等     如果 $a 不等于 $b 则为 TRUE
$a !== $b   不全等   如果 $a 不全等于 $b 则为 TRUE</pre>
</div>
<div>
<pre>&lt;?php
$x = array("a" =&gt; "red", "b" =&gt; "green"); 
$y = array("c" =&gt; "blue", "d" =&gt; "yellow"); 
$z = $x + $y; 
var_dump($z);//array(4) { ["a"]=&gt; string(3) "red" ["b"]=&gt; string(5) "green" ["c"]=&gt; string(4) "blue" ["d"]=&gt; string(6) "yellow" } 
echo "&lt;br&gt;";
var_dump($x == $y);//bool(false)
echo "&lt;br&gt;";
var_dump($x === $y);//bool(false)
echo "&lt;br&gt;";
var_dump($x != $y);//bool(true)
echo "&lt;br&gt;";
var_dump($x &lt;&gt; $y);//bool(true)
echo "&lt;br&gt;";
var_dump($x !== $y);//bool(true)
?&gt; </pre>
</div>
