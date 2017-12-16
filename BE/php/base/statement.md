# PHP语句

　　任何 PHP 脚本都是由一系列语句构成的。一条语句可以是一个赋值语句，一个函数调用，一个循环，一个条件语句或者甚至是一个什么也不做的语句（空语句）。语句通常以分号结束。此外，还可以用花括号将一组语句封装成一个语句组。语句组本身可以当作是一行语句。本文将详细介绍各种语句类型

&nbsp;

### if语句

　　if 结构是很多语言包括PHP在内最重要的特性之一，它允许按照条件执行代码片段

<div class="cnblogs_code">
<pre>if (条件) {
  当条件为 true 时执行的代码;
}
if (条件) {
  条件为 true 时执行的代码;
} else {
  条件为 false 时执行的代码;
}
if (条件) {
  条件为 true 时执行的代码;
} elseif (条件) {
  条件为 true 时执行的代码;
} else {
  条件为 false 时执行的代码;
}</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;?php
$t=date("H");
if ($t&lt;"10") {
  echo "Have a good morning!";
} elseif ($t&lt;"20") {
  echo "Have a good day!";
} else {
  echo "Have a good night!";
}
?&gt;</pre>
</div>

&nbsp;

### switch语句

　　switch语句类似于具有同一个表达式的一系列 if 语句。很多场合下需要把同一个变量（或表达式）与很多不同的值比较，并根据它等于哪个值来执行不同的代码。这正是 switch 语句的用途

　　[注意]switch/case做的是松散比较

<div class="cnblogs_code">
<pre>switch (expression)
{
case label1:
  code to be executed if expression = label1;
  break;  
case label2:
  code to be executed if expression = label2;
  break;
default:
  code to be executed
  if expression is different 
  from both label1 and label2;
}</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;?php
switch ($x)
{
case 1:
  echo "Number 1";
  break;
case 2:
  echo "Number 2";
  break;
case 3:
  echo "Number 3";
  break;
default:
  echo "No number between 1 and 3";
}
?&gt;</pre>
</div>

&nbsp;

### while语句

　　while 循环是 PHP 中最简单的循环类型。while语句的含意很简单，它告诉 PHP 只要 while 表达式的值为 TRUE 就重复执行嵌套中的循环语句。表达式的值在每次开始循环时检查，所以即使这个值在循环语句中改变了，语句也不会停止执行，直到本次循环结束。有时候如果 while 表达式的值一开始就是 FALSE，则循环语句一次都不会执行

<div class="cnblogs_code">
<pre>while (expr)
    statement</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;?php
$i = 1;
while ($i &lt;= 10) {
    echo $i++; 
}
$i = 1;
while ($i &lt;= 10):
    print $i;
    $i++;
endwhile;
?&gt;</pre>
</div>

&nbsp;

### do-while

　　do-while 循环和 while 循环非常相似，区别在于表达式的值是在每次循环结束时检查而不是开始时。和一般的 while 循环主要的区别是 do-while 的循环语句保证会执行一次（表达式的真值在每次循环结束后检查）

<div class="cnblogs_code">
<pre>do {
  要执行的代码;
} while (条件为真);</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;?php
$i = 0;
do {
   echo $i;
} while ($i &gt; 0);
?&gt;</pre>
</div>

&nbsp;

### for语句

　　for 循环是 PHP 中最复杂的循环结构。for循环语句中，初始化在循环开始前无条件求值一次，循环条件在每次循环开始前求值。如果值为true，则继续循环，执行循环体语句；如果值为false,则终止循环。递增语句在每次循环后执行

<div class="cnblogs_code">
<pre>for (init counter; test counter; increment counter) {
  code to be executed;
}   </pre>
</div>
<div class="cnblogs_code">
<pre>&lt;?php 
for ($x=0; $x&lt;=10; $x++) {
  echo "数字是：$x &lt;br&gt;";
} 
?&gt;</pre>
</div>

&nbsp;

### foreach

　　foreach语法结构提供了遍历数组的简单方式。foreach 仅能够应用于数组和对象，如果尝试应用于其他数据类型的变量，或者未初始化的变量将发出错误信息

　　每进行一次循环迭代，当前数组元素的值就会被赋值给$value变量，并且数组指针会逐一移动，直到到达最后一个数组元素。一般有两种方式：不取下标、取下标

　　【1】只取值，不取下标

<div class="cnblogs_code">
<pre>foreach ($array as $value) {
  code to be executed;
}    
&lt;?php 
$colors = array("red","green","blue","yellow"); 
foreach ($colors as $value) {
  echo "$value &lt;br&gt;";
}
?&gt;</pre>
</div>

　　【2】同时取下标和值

<div class="cnblogs_code">
<pre>foreach ($array as $index =&gt; $value) {
  code to be executed;
} </pre>
</div>
<div class="cnblogs_code">
<pre>&lt;?php 
$colors = array(
  "r"=&gt;"red",
  "g"=&gt;"green",
  "b"=&gt;"blue",
  "y"=&gt;"yellow"); 
/*
r:red
g:green
b:blue
y:yellow
*/
foreach ($colors as $key =&gt; $value) {
  echo $key.":".$value."&lt;br&gt;";
}
?&gt;</pre>
</div>

&nbsp;

### break

　　break 结束当前 for，foreach，while，do-while 或者 switch 结构的执行

　　break 可以接受一个可选的数字参数来决定跳出几重循环

<div class="cnblogs_code">
<pre>$i = 0;
while (++$i) {
    switch ($i) {
    case 5:
        echo "At 5&lt;br /&gt;\n";
        break 1;  /* 只退出 switch. */
    case 10:
        echo "At 10; quitting&lt;br /&gt;\n";
        break 2;  /* 退出 switch 和 while 循环 */
    default:
        break;
    }
}</pre>
</div>

&nbsp;

### continue

　　continue 在循环结构用用来跳过本次循环中剩余的代码并在条件求值为真时开始执行下一次循环

　　continue 接受一个可选的数字参数来决定跳过几重循环到循环结尾。默认值是 1，即跳到当前循环末尾

<div class="cnblogs_code">
<pre>$i = 0;
while ($i++ &lt; 5) {
    echo "Outer&lt;br /&gt;\n";
    while (1) {
        echo "Middle&lt;br /&gt;\n";
        while (1) {
            echo "Inner&lt;br /&gt;\n";
            continue 3;
        }
        echo "This never gets output.&lt;br /&gt;\n";
    }
    echo "Neither does this.&lt;br /&gt;\n";
}</pre>
</div>

&nbsp;

### goto

　　goto 操作符可以用来跳转到程序中的另一位置。该目标位置可以用目标名称加上冒号来标记，而跳转指令是 goto 之后接上目标位置的标记。PHP 中的 goto 有一定限制，目标位置只能位于同一个文件和作用域，也就是说无法跳出一个函数或类方法，也无法跳入到另一个函数。也无法跳入到任何循环或者 switch 结构中。可以跳出循环或者 switch，通常的用法是用 goto 代替多层的 break

<div class="cnblogs_code">
<pre>&lt;?php
goto a;
echo 'Foo';

a:
//'Bar'
echo 'Bar';
?&gt;</pre>
</div>
