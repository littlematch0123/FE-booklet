# PHP基础语法

&emsp;&emsp;PHP是一种创建动态交互性站点的强有力的服务器端脚本语言。PHP能够包含文本、HTML、CSS以及PHP代码，在服务器上执行，结果以纯文本返回浏览器。PHP是从C和Perl发展而来的一种非常简单的语言，但是它看上去更像Java，同时也非常灵活，但学习其语法和结构需要一些规则。本文将详细介绍PHP的基础语法

&nbsp;

### 代码标识

&emsp;&emsp;PHP代码以&lt;?php 开头，以?&gt;结尾，且可以放置在文档中的任何位置

&emsp;&emsp;注意：PHP也允许使用短标记 &lt;? 和 ?&gt;，但不鼓励使用。只有通过激活php.ini中的 short_open_tag 配置指令或者在编译PHP时使用了配置选项--enable-short-tags时才能使用短标记

<div>
<pre>&lt;?php
  //
?&gt;</pre>
</div>

&emsp;&emsp;如果文件内容是纯PHP代码，最好在文件末尾删除PHP结束标记。这可以避免在PHP结束标记之后万一意外加入了空格或者换行符，会导致PHP开始输出这些空白，而脚本中此时并无输出的意图

&nbsp;

### 分号

&emsp;&emsp;PHP的每一条语句都要以分号(;)结尾，PHP代码块的关闭标签也会自动表明分号。在PHP编程中最容易犯的错误就是忘记加上分号，这会导致PHP将多行语句看成是一条语句，从而使PHP无法理解，此时系统会给出&ldquo;解析错误&rdquo;的信息

<div>
<pre>&lt;?php
    echo "Hello World!";
?&gt;</pre>
</div>

&nbsp;

### 注释

&emsp;&emsp;PHP支持三种注释，包括两种单行注释和一种多行注释

&emsp;&emsp;注意：注释不能嵌套

<div>
<pre>&lt;?php
// 这是单行注释

#这也是单行注释
/*
这是多行注释块
它横跨多行
*/
?&gt;</pre>
</div>

&nbsp;

### 输出

&emsp;&emsp;在PHP中，有两种基本的输出方法：echo和print

&emsp;&emsp;print只能输出一个字符串，并始终返回1

&emsp;&emsp;echo能够输出一个以上的字符串，echo比print稍快，因为它不返回任何值&emsp;&emsp;

&emsp;&emsp;注意：echo和print都是语言结构，有无括号都可以使用echo或echo()，以及print或print()，且echo或print关键字与字符串之间至少要有一个空格

<div>
<pre>&lt;?php
    echo "&lt;h2&gt;PHP is fun!&lt;/h2&gt;";
    echo "Hello world!&lt;br&gt;";
    echo "I'm about to learn PHP!&lt;br&gt;";
    echo "This", " string", " was", " made", " with multiple parameters.";
?&gt;</pre>
</div>
<div>
<pre>&lt;?php
    print "&lt;h2&gt;PHP is fun!&lt;/h2&gt;";
    print "Hello world!&lt;br&gt;";
    print "I'm about to learn PHP!&lt;br&gt;";
    //该行出错，因为print只能输出1个字符串
    print "This", " string", " was", " made", " with multiple parameters.";
?&gt;</pre>
</div>

&nbsp;

### 计算表达式

&emsp;&emsp;不同于HTML和CSS，在PHP中可以写计算表达式

<div>
<pre>&lt;?php
    //36
    echo 12*3;
?&gt;</pre>
</div>

&nbsp;

### 大小写

&emsp;&emsp;在PHP中，所有用户定义的函数、类和关键词都对大小写不敏感，但所有变量都对大小写敏感

<div>
<pre>&lt;?php
    //Hello World!
    ECHO "Hello World!&lt;br&gt;";
    //Hello World!
    echo "Hello World!&lt;br&gt;";
    //Hello World!
    EcHo "Hello World!&lt;br&gt;";
?&gt;</pre>
</div>

&emsp;&emsp;注意： .号代表字符串连接，在其他的编程语言中，一般用+号

<div>
<pre>&lt;?php
    $color="red";
    //My car is red
    echo "My car is " . $color . "&lt;br&gt;";
    //My house is 
    echo "My house is " . $COLOR . "&lt;br&gt;";
    //My boat is
    echo "My boat is " . $coLOR . "&lt;br&gt;";
?&gt;</pre>
</div>

&nbsp;

### 空白符

&emsp;&emsp;一般来说，空白符(包括空格、制表符tab、换行)在php中无关紧要，会被php引擎忽略。可以将一个语句展开成任意行，或者将语句紧缩在一起，通过空格与空行的合理运用可以增强程序代码的清晰性和可读性

【1】使用两个空行的情况

&emsp;&emsp;1、一个源文件的两个代码片段之间

&emsp;&emsp;2、两个类的声明之间

【2】使用一个空行的情况　

&emsp;&emsp;1、两个函数声明之间

&emsp;&emsp;2、函数内的局部变量和函数的第一条语句之间

&emsp;&emsp;3、块注释或单行注释之前

&emsp;&emsp;4、一个函数内的两个逻辑代码段之间，用来提高可读性

【3】使用空格的情况

&emsp;&emsp;1、空格一般用于关键字与括号之间，但函数名称与左括号之间不应该用空格分开

&emsp;&emsp;2、一般在函数的参数列表中的逗号后面插入空格

&emsp;&emsp;3、数学算式的操作数与运算符之间应该用添加空格(二进制运算与一元运算符除外)

&emsp;&emsp;4、for语句中的表达式应该用逗号分开，后面添加空格

&emsp;&emsp;5、强制类型转换语句中的强制类型的右括号与表达式之间应该用逗号隔开，添加空格

