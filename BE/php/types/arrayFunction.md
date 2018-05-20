# 前端学PHP之数组函数

&emsp;&emsp;PHP中的数组功能非常强大，数组处理函数有着强大、灵活、高效的特点。PHP5提供了近100个操作数组的系统函数，包括排序函数、替换函数、数组计算函数等。下面将详细介绍数组函数

&emsp;&emsp;注意：关于javascript数组的22种方法[移步至此](http://www.cnblogs.com/xiaohuochai/p/5682621.html)

&nbsp;

### 键值操作

&emsp;&emsp;数组的每个元素都是由键值对组成，通过元素的键名来访问对应的键值。关于键值操作有array_values()、array_keys()、in_array()、array_flip()和array_reverse()这5个常用函数

**array_values**

&emsp;&emsp;array_values() 返回 input 数组中所有的值并给其建立数字索引

<div>
<pre>array array_values ( array $input )</pre>
</div>
<div>
<pre>&lt;?php
$array = array("size" =&gt; "XL", "color" =&gt; "gold");
//Array ( [0] =&gt; XL [1] =&gt; gold )
print_r(array_values($array));
?&gt;</pre>
</div>

**array_keys**

&emsp;&emsp;array_keys() 返回 input 数组中的数字或者字符串的键名

<div>
<pre>array array_keys ( array $array [, mixed $search_value [, bool $strict = false ]] )</pre>
</div>

&emsp;&emsp;如果指定了可选参数 search_value，则只返回该值的键名。否则 input 数组中的所有键名都会被返回

&emsp;&emsp;如果指定了可选参数 strict，表示判断在搜索的时候是否该使用严格的比较（===）

<div>
<pre>&lt;?php
$array = array(0 =&gt; 100, "color" =&gt; "red");
//Array ( [0] =&gt; 0 [1] =&gt; color ) 
print_r(array_keys($array));
$array = array("blue", "red", "green", "blue", "blue");
// Array ( [0] =&gt; 0 [1] =&gt; 3 [2] =&gt; 4 ) 
print_r(array_keys($array, "blue"));
$array = array("color" =&gt; array("blue", "red", "green"),
               "size"  =&gt; array("small", "medium", "large"));
Array ( [0] =&gt; color [1] =&gt; size )
print_r(array_keys($array));
?&gt;</pre>
</div>

**in_array**

&emsp;&emsp;in_array &mdash; 检查数组中是否存在某个值

<div>
<pre>bool in_array ( mixed $needle , array $haystack [, bool $strict = FALSE ] )</pre>
</div>

&emsp;&emsp;如果第三个参数 strict 的值为 TRUE 则 in_array() 函数还会检查 needle 的类型是否和 haystack 中的相同

<div>
<pre>&lt;?php
$os = array("Mac", "NT", "Irix", "Linux");
if (in_array("Irix", $os)) {
    //Got Irix
    echo "Got Irix";
}
if (in_array("mac", $os)) {
    echo "Got mac";
}
?&gt;</pre>
</div>

**array_flip**

&emsp;&emsp;array_flip &mdash; 交换数组中的键和值，成功时返回交换后的数组，如果失败返回 NULL

<div>
<pre>array array_flip ( array $trans )</pre>
</div>

&emsp;&emsp;array_flip() 返回一个反转后的 array，例如 trans 中的键名变成了值，而 trans 中的值成了键名

&emsp;&emsp;如果同一个值出现了多次，则最后一个键名将作为它的值，所有其它的都丢失了

&emsp;&emsp;注意：trans中的值需要能够作为合法的键名，例如需要是 integer 或者 string。如果值的类型不对将发出一个警告，并且有问题的键／值对将不会反转

<div>
<pre>&lt;?php
$trans = array("a" =&gt; 1, "b" =&gt; 1, "c" =&gt; 2);
$trans = array_flip($trans);
//Array ( [1] =&gt; b [2] =&gt; c )
print_r($trans);
?&gt;</pre>
</div>

**array_reverse**

&emsp;&emsp;array_reverse &mdash; 返回一个单元顺序相反的数组

<div>
<pre>array array_reverse ( array $array [, bool $preserve_keys = false ] )</pre>
</div>

&emsp;&emsp;如果参数preserve_keys设置为 TRUE 会保留数字的键。非数字的键则不受这个设置的影响，总是会被保留

<div>
<pre>&lt;?php
$input  = array("php", 4.0, array("green", "red"));
$result = array_reverse($input);
/*
array (size=3)
  0 =&gt; 
    array (size=2)
      0 =&gt; string 'green' (length=5)
      1 =&gt; string 'red' (length=3)
  1 =&gt; float 4
  2 =&gt; string 'php' (length=3)
 */
var_dump($result);
$result_keyed = array_reverse($input, true);
/*
array (size=3)
  2 =&gt; 
    array (size=2)
      0 =&gt; string 'green' (length=5)
      1 =&gt; string 'red' (length=3)
  1 =&gt; float 4
  0 =&gt; string 'php' (length=3)
 */
var_dump($result_keyed);
?&gt;</pre>
</div>

&nbsp;

### 记数

**count**

&emsp;&emsp;count &mdash; 计算数组中的单元数目或对象中的属性个数

<div>
<pre>int count ( mixed $var [, int $mode = COUNT_NORMAL ] )</pre>
</div>

&emsp;&emsp;如果可选的 mode 参数设为 COUNT_RECURSIVE（或 1），count() 将递归地对数组计数。对计算多维数组的所有单元尤其有用。mode 的默认值是 0。count() 识别不了无限递归

<div>
<pre>&lt;?php
$a[0] = 1;
$a[1] = 3;
$a[2] = 5;
$result = count($a);
// $result == 3
$b[0]  = 7;
$b[5]  = 9;
$b[10] = 11;
$result = count($b);
// $result == 3
$result = count(null);
// $result == 0
$result = count(false);
// $result == 1
?&gt;</pre>
</div>
<div>
<pre>&lt;?php
$food = array('fruits' =&gt; array('orange', 'banana', 'apple'),
              'veggie' =&gt; array('carrot', 'collard', 'pea'));
echo count($food, COUNT_RECURSIVE); // output 8
echo count($food); // output 2
?&gt;</pre>
</div>

**array_count_values**

&emsp;&emsp;array_count_values &mdash; 统计数组中所有的值出现的次数

<div>
<pre>array array_count_values ( array $input )</pre>
</div>
<div>
<pre>&lt;?php
$array = array(1, "hello", 1, "world", "hello");
//Array ( [1] =&gt; 2 [hello] =&gt; 2 [world] =&gt; 1 )
print_r(array_count_values($array));
?&gt;</pre>
</div>

**array_unique**

&emsp;&emsp;array_unique &mdash; 移除数组中重复的值

<div>
<pre>array array_unique ( array $array [, int $sort_flags = SORT_STRING ] )</pre>
</div>

&emsp;&emsp;注意：键名保留不变。array_unique() 先将值作为字符串排序，然后对每个值只保留第一个遇到的键名，接着忽略所有后面的键名。这并不意味着在未排序的 array 中同一个值的第一个出现的键名会被保留

<div>
<pre>&lt;?php
$input = array("a" =&gt; "green", "red", "b" =&gt; "green", "blue", "red");
$result = array_unique($input);
//Array ( [a] =&gt; green [0] =&gt; red [1] =&gt; blue )
print_r($result);
?&gt;</pre>
</div>

**array_sum**

&emsp;&emsp;array_sum &mdash; 计算数组中所有值的和

&emsp;&emsp;array_sum() 将数组中的所有值的和以整数或浮点数的结果返回

<div>
<pre>&lt;?php
$a = array(2, 4, 6, 8);
//sum(a) = 20
echo "sum(a) = " . array_sum($a) . "\n";
$b = array("a" =&gt; 1.2, "b" =&gt; 2.3, "c" =&gt; 3.4);
//sum(b) = 6.9
echo "sum(b) = " . array_sum($b) . "\n";
?&gt;</pre>
</div>

&nbsp;

### 回调函数

**array_filter**

&emsp;&emsp;array_filter &mdash; 用回调函数过滤数组中的单元

<div>
<pre>array array_filter ( array $array [, callable $callback [, int $flag = 0 ]] )</pre>
</div>

&emsp;&emsp;依次将 array 数组中的每个值传递到 callback 函数。如果 callback 函数返回 TRUE，则 input 数组的当前值会被包含在返回的结果数组中。数组的键名保留不变

&emsp;&emsp;注意：如果没有提供 callback 函数， 将删除 input 中所有等值为 FALSE 的条目

<div>
<pre>&lt;?php
$entry = array(0 =&gt; 'foo',1 =&gt; false,2 =&gt; -1,3 =&gt; null,4 =&gt; '');
//Array ( [0] =&gt; foo [2] =&gt; -1 )
print_r(array_filter($entry));
?&gt;</pre>
</div>
<div>
<pre>&lt;?php
function odd($var)
{
    return($var &amp; 1);
}
function even($var)
{
    return(!($var &amp; 1));
}
$array1 = array("a"=&gt;1, "b"=&gt;2, "c"=&gt;3, "d"=&gt;4, "e"=&gt;5);
$array2 = array(6, 7, 8, 9, 10, 11, 12);
//Odd : Array ( [a] =&gt; 1 [c] =&gt; 3 [e] =&gt; 5 ) 
echo "Odd :\n";
print_r(array_filter($array1, "odd"));
//Even: Array ( [0] =&gt; 6 [2] =&gt; 8 [4] =&gt; 10 [6] =&gt; 12 )
echo "Even:\n";
print_r(array_filter($array2, "even"));
?&gt;</pre>
</div>

**array_walk**

&emsp;&emsp;array_walk &mdash; 使用用户自定义函数对数组中的每个元素做回调处理

<div>
<pre>bool array_walk ( array &amp;$array , callable $callback [, mixed $userdata = NULL ] )</pre>
</div>

&emsp;&emsp;将用户自定义函数 funcname 应用到 array 数组中的每个单元。array_walk() 不会受到 array 内部数组指针的影响。array_walk() 会遍历整个数组而不管指针的位置

&emsp;&emsp;典型情况下 callback 接受两个参数。array 参数的值作为第一个，键名作为第二个

&emsp;&emsp;如果提供了可选参数 userdata，将被作为第三个参数传递给 callback funcname

<div>
<pre>&lt;?php
$fruits = array("d" =&gt; "lemon", "a" =&gt; "orange", "b" =&gt; "banana", "c" =&gt; "apple");
function test_alter(&amp;$item1, $key, $prefix)
{
    $item1 = "$prefix: $item1";
}
function test_print($item2, $key)
{
    echo "$key. $item2\n";
}
//Before ...: d. lemon a. orange b. banana c. apple
echo "Before ...:\n";
array_walk($fruits, 'test_print');

array_walk($fruits, 'test_alter', 'fruit');
echo "... and after:\n";
//... and after: d. fruit: lemon a. fruit: orange b. fruit: banana c. fruit: apple
array_walk($fruits, 'test_print');
?&gt;</pre>
</div>

**array_map**

&emsp;&emsp;array_map &mdash; 将回调函数作用到给定数组的单元上

<div>
<pre>array array_map ( callable $callback , array $arr1 [, array $... ] )</pre>
</div>

&emsp;&emsp;array_map() 返回一个数组，该数组包含了 arr1 中的所有单元经过 callback 作用过之后的单元。callback 接受的参数数目应该和传递给 array_map() 函数的数组数目一致

<div>
<pre>&lt;?php
function cube($n)
{
    return($n * $n * $n);
}
$a = array(1, 2, 3, 4, 5);
$b = array_map("cube", $a);
//Array ( [0] =&gt; 1 [1] =&gt; 8 [2] =&gt; 27 [3] =&gt; 64 [4] =&gt; 125 )
print_r($b);
?&gt;</pre>
</div>

&nbsp;

### 组合

**array_slice**

&emsp;&emsp;array_slice &mdash; 从数组中取出一段

<div>
<pre>array array_slice ( array $array , int $offset [, int $length = NULL [, bool $preserve_keys = false ]] )</pre>
</div>

&emsp;&emsp;array_slice() 返回根据 offset 和 length 参数所指定的 array 数组中的一段序列

&emsp;&emsp;注意：array_slice()默认会重新排序并重置数组的数字索引。可以通过将 preserve_keys 设为 TRUE 来改变此行为

<div>
<pre>&lt;?php
$input = array("a", "b", "c", "d", "e");
// returns "c", "d", and "e"
$output = array_slice($input, 2);  
// returns "d" 
$output = array_slice($input, -2, 1); 
// returns "a", "b", and "c"
$output = array_slice($input, 0, 3); 
//Array ( [0] =&gt; c [1] =&gt; d )
print_r(array_slice($input, 2, -1));
//Array ( [2] =&gt; c [3] =&gt; d )
print_r(array_slice($input, 2, -1, true));
?&gt;</pre>
</div>

**array_splice**

&emsp;&emsp;array_splice &mdash; 把数组中的一部分去掉并用其它值取代，返回一个包含有被移除单元的数组，而原数组为变化后的数组

<div>
<pre>array array_splice ( array &amp;$input , int $offset [, int $length = 0 [, mixed $replacement ]] )</pre>
</div>

&emsp;&emsp;把 input 数组中由 offset 和 length 指定的单元去掉，如果提供了 replacement 参数，则用其中的单元取代

&emsp;&emsp;注意：input 中的数字键名不被保留

<div>
<pre>&lt;?php
$input = array("red", "green", "blue", "yellow");
print_r(array_splice($input, 2));//Array ( [0] =&gt; blue [1] =&gt; yellow )
print_r($input);//Array ( [0] =&gt; red [1] =&gt; green )
$input = array("red", "green", "blue", "yellow");
print_r(array_splice($input, -1, 1, array("black", "maroon")));// Array ( [0] =&gt; yellow )
print_r($input);//Array ( [0] =&gt; red [1] =&gt; green [2] =&gt; blue [3] =&gt; black [4] =&gt; maroon )
?&gt;</pre>
</div>

**array_combine**

&emsp;&emsp;array_combine &mdash; 创建一个数组，用一个数组的值作为其键名，另一个数组的值作为其值

<div>
<pre>array array_combine ( array $keys , array $values )</pre>
</div>

&emsp;&emsp;注意：如果作为keys的数组和作为values的数组的元素个数不一样，将会抛出一个警告错误

<div>
<pre>&lt;?php
$a = array('green', 'red', 'yellow');
$b = array('avocado', 'apple', 'banana');
$c = array_combine($a, $b);
//Array ( [green] =&gt; avocado [red] =&gt; apple [yellow] =&gt; banana )
print_r($c);
?&gt;</pre>
</div>

**array_merge**

&emsp;&emsp;array_merge &mdash; 合并一个或多个数组

<div>
<pre>array array_merge ( array $array1 [, array $... ] )</pre>
</div>

&emsp;&emsp;array_merge() 将一个或多个数组的单元合并起来，一个数组中的值附加在前一个数组的后面。返回作为结果的数组

&emsp;&emsp;如果输入的数组中有相同的字符串键名，则该键名后面的值将覆盖前一个值。然而，如果数组包含数字键名，后面的值将不会覆盖原来的值，而是附加到后面

&emsp;&emsp;如果只给了一个数组并且该数组是数字索引的，则键名会以连续方式重新索引

<div>
<pre>&lt;?php
$array1 = array("color" =&gt; "red", 2, 4);
$array2 = array("a", "b", "color" =&gt; "green", "shape" =&gt; "trapezoid", 4);
$result = array_merge($array1, $array2);
//Array ( [color] =&gt; green [0] =&gt; 2 [1] =&gt; 4 [2] =&gt; a [3] =&gt; b [shape] =&gt; trapezoid [4] =&gt; 4 )
print_r($result);
?&gt;</pre>
</div>

【+】

&emsp;&emsp;如果想完全保留原有数组并只想新的数组附加到后面，用 + 运算符

&emsp;&emsp;注意：如果输入的数组中有相同的字符串键名，则该键名前面的值将覆盖后面的值

<div>
<pre>&lt;?php
$array1 = array(0 =&gt; 'zero_a', 2 =&gt; 'two_a', 3 =&gt; 'three_a');
$array2 = array(1 =&gt; 'one_a', 2 =&gt; 'three_a', 3 =&gt; 'four_a');
$result = $array1 + $array2;
//Array ( [0] =&gt; zero_a [2] =&gt; two_a [3] =&gt; three_a [1] =&gt; one_a )
print_r($result);
?&gt;</pre>
</div>

**array_intersect**

&emsp;&emsp;array_intersect &mdash; 计算数组的交集

<div>
<pre>array array_intersect ( array $array1 , array $array2 [, array $ ... ] )</pre>
</div>

&emsp;&emsp;array_intersect() 返回一个数组，该数组包含了所有在 array1 中也同时出现在所有其它参数数组中的值

&emsp;&emsp;注意：键名保留不变

<div>
<pre>&lt;?php
$array1 = array("a" =&gt; "green", "red", "blue");
$array2 = array("b" =&gt; "green", "yellow", "red");
$result = array_intersect($array1, $array2);
//Array ( [a] =&gt; green [0] =&gt; red )
print_r($result);
?&gt;</pre>
</div>

**array_diff**

&emsp;&emsp;array_diff &mdash; 计算数组的差集

<div>
<pre>array array_diff ( array $array1 , array $array2 [, array $... ] )</pre>
</div>

&emsp;&emsp;对比返回在 array1 中但是不在 array2 及任何其它参数数组中的值

<div>
<pre>&lt;?php
$array1 = array("a" =&gt; "green", "red", "blue", "red");
$array2 = array("b" =&gt; "green", "yellow", "red");
$result = array_diff($array1, $array2);
//Array ( [1] =&gt; blue )
print_r($result);
?&gt;</pre>
</div>

**array_fill**

&emsp;&emsp;array_fill &mdash; 用给定的值填充数组，返回填充后的数组

<div>
<pre>array array_fill ( int $start_index , int $num , mixed $value )</pre>
</div>

&emsp;&emsp;array_fill() 用 value 参数的值将一个数组填充 num 个条目，键名由 start_index 参数指定的开始

<div>
<pre>?php
$a = array_fill(5, 6, 'banana');
$b = array_fill(-2, 4, 'pear');
//Array ( [5] =&gt; banana [6] =&gt; banana [7] =&gt; banana [8] =&gt; banana [9] =&gt; banana [10] =&gt; banana )
print_r($a);
//Array ( [-2] =&gt; pear [0] =&gt; pear [1] =&gt; pear [2] =&gt; pear )
print_r($b);
?&gt;</pre>
</div>

**range**

&emsp;&emsp;range &mdash; 建立一个包含指定范围单元的数组，返回的数组中从 start 到 limit 的单元，包括它们本身

<div>
<pre>array range ( mixed $start , mixed $limit [, number $step = 1 ] )</pre>
</div>

&emsp;&emsp;如果给出了 step 的值，它将被作为单元之间的步进值。step 应该为正值。如果未指定，step 则默认为 1

<div>
<pre>&lt;?php
// array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12)
foreach (range(0, 12) as $number) {
    echo $number;
}
// array(0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100)
foreach (range(0, 100, 10) as $number) {
    echo $number;
}
// array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i');
foreach (range('a', 'i') as $letter) {
    echo $letter;
}
// array('c', 'b', 'a');
foreach (range('c', 'a') as $letter) {
    echo $letter;
}
?&gt;</pre>
</div>

&nbsp;

### 栈和队列

**array_pop**

&emsp;&emsp;array_pop &mdash; 将数组最后一个单元弹出（出栈）

<div>
<pre>mixed array_pop ( array &amp;$array )</pre>
</div>

&emsp;&emsp;array_pop() 弹出并返回 array 数组的最后一个单元，并将数组 array 的长度减一。如果 array 为空（或者不是数组）将返回 NULL

<div>
<pre>&lt;?php
$stack = array("orange", "banana", "apple", "raspberry");
$fruit = array_pop($stack);
//Array ( [0] =&gt; orange [1] =&gt; banana [2] =&gt; apple )
print_r($stack);
?&gt;</pre>
</div>

**array_push**

&emsp;&emsp;array_push &mdash; 将一个或多个单元压入数组的末尾（入栈），返回处理之后数组的元素个数

<div>
<pre>int array_push ( array &amp;$array , mixed $var [, mixed $... ] )</pre>
</div>

&emsp;&emsp;array_push() 将 array 当成一个栈，并将传入的变量压入 array 的末尾。array 的长度将根据入栈变量的数目增加

<div>
<pre>&lt;?php
$stack = array("orange", "banana");
array_push($stack, "apple", "raspberry");
//Array ( [0] =&gt; orange [1] =&gt; banana [2] =&gt; apple [3] =&gt; raspberry )
print_r($stack);
?&gt;</pre>
</div>

**array_shift**

&emsp;&emsp;array_shift &mdash; 将数组开头的单元移出数组

<div>
<pre>mixed array_shift ( array &amp;$array )</pre>
</div>

&emsp;&emsp;array_shift() 将 array 的第一个单元移出并作为结果返回，将 array 的长度减一并将所有其它单元向前移动一位。所有的数字键名将改为从零开始计数，文字键名将不变

<div>
<pre>&lt;?php
$stack = array("orange", "banana", "apple", "raspberry");
$fruit = array_shift($stack);
//Array ( [0] =&gt; banana [1] =&gt; apple [2] =&gt; raspberry )
print_r($stack);
?&gt;</pre>
</div>

**array_unshift**

&emsp;&emsp;array_unshift &mdash; 在数组开头插入一个或多个单元，返回 array 数组新的单元数目

<div>
<pre>int array_unshift ( array &amp;$array , mixed $var [, mixed $... ] )</pre>
</div>

&emsp;&emsp;array_unshift() 将传入的单元插入到 array 数组的开头。注意单元是作为整体被插入的，因此传入单元将保持同样的顺序。所有的数值键名将修改为从零开始重新计数，所有的文字键名保持不变

<div>
<pre>&lt;?php
$queue = array("orange", "banana");
array_unshift($queue, "apple", "raspberry");
//Array ( [0] =&gt; apple [1] =&gt; raspberry [2] =&gt; orange [3] =&gt; banana )
print_r($queue);
?&gt;</pre>
</div>

&nbsp;

### 顺序

**array_rand**

&emsp;&emsp;array_rand &mdash; 从数组中随机取出一个或多个单元，并返回随机条目的一个或多个键

<div>
<pre>mixed array_rand ( array $input [, int $num_req = 1 ] )</pre>
</div>

&emsp;&emsp;注意：如果只取出一个，array_rand() 返回一个随机单元的键名，否则就返回一个包含随机键名的数组

<div>
<pre>&lt;?php
$input = array("Neo", "Morpheus", "Trinity", "Cypher", "Tank");
$rand_keys = array_rand($input, 2);
//Neo 
echo $input[$rand_keys[0]] . "\n";
//Cypher
echo $input[$rand_keys[1]] . "\n";
?&gt;</pre>
</div>

**shuffle**

&emsp;&emsp;shuffle &mdash; 将数组打乱，成功时返回 TRUE， 或者在失败时返回 FALSE

<div>
<pre>bool shuffle ( array &amp;$array )</pre>
</div>
<div>
<pre>&lt;?php
$numbers = range(1, 20);
shuffle($numbers);
//20 11 19 4 7 13 16 8 12 1 9 6 15 3 2 18 10 14 17 5
foreach ($numbers as $number) {
    echo "$number ";
}
?&gt;</pre>
</div>
