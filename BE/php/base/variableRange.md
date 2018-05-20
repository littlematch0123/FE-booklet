# php变量范围

&emsp;&emsp;变量范围即它定义的上下文背景（也就是它的生效范围）。在javascript中，并没有变量范围这一概念，相似的可能是[作用域](http://www.cnblogs.com/xiaohuochai/p/5699739.html)。但是，由于javscript使用的是[词法作用域](http://www.cnblogs.com/xiaohuochai/p/5700095.html)，指变量声明时的位置；而php并不存在变量声明，变量在第一次赋值时相当于声明了变量。所以，二者并不相同。本文将详细介绍php中的变量范围

&nbsp;

### 范围跨度


&emsp;&emsp;大部分的PHP变量只有一个单独的范围。这个单独的范围跨度同样包含了include和require引入的文件

&emsp;&emsp;这里变量$a将会在包含文件b.inc中生效

<div>
<pre>&lt;?php
$a = 1;
include 'b.inc';
?&gt;</pre>
</div>

&nbsp;

### 函数范围

&emsp;&emsp;在用户自定义函数中，一个局部函数范围将被引入。任何用于函数内部的变量按缺省情况将被限制在局部函数范围内

&emsp;&emsp;下面这个脚本不会有任何输出，因为echo语句引用了一个局部版本的变量 $a，而且在这个范围内，它并没有被赋值

<div>
<pre>&lt;?php
$a = 1; /* global scope */
function Test()
{
    echo $a; /* reference to local scope variable */
}
Test();
?&gt;</pre>
</div>

&nbsp;

### global关键字

&emsp;&emsp;以下脚本的输出将是&ldquo;3&rdquo;。在函数中声明了全局变量$a和$b之后，对任一变量的所有引用都会指向其全局版本。对于一个函数能够声明的全局变量的最大个数，PHP没有限制

<div>
<pre>&lt;?php
$a = 1;
$b = 2;
function Sum()
{
    global $a, $b;
    $b = $a + $b;
}
Sum();
echo $b;//3
?&gt;</pre>
</div>

&emsp;&emsp;在全局范围内访问变量的第二个办法，是用特殊的PHP自定义$GLOBALS数组

&emsp;&emsp;GLOBALS是一个关联数组，每一个变量为一个元素，键名对应变量名，值对应变量的内容。GLOBALS之所以在全局范围内存在，是因为GLOBALS是一个超全局变量

<div>
<pre>&lt;?php
$a = 1;
$b = 2;
function Sum()
{
    $GLOBALS['b'] = $GLOBALS['a'] + $GLOBALS['b'];
}
Sum();
echo $b;//3
?&gt;</pre>
</div>

&nbsp;

### 预定义变量

&emsp;&emsp;对于全部脚本而言，PHP提供了大量的预定义变量。这些变量将所有的外部变量表示成内建环境变量，并且将错误信息表示成返回头

&emsp;&emsp;下面是预定义变量的列表

<div>
<pre>超全局变量 &mdash; 超全局变量是在全部作用域中始终可用的内置变量
$GLOBALS &mdash; 引用全局作用域中可用的全部变量
$_SERVER &mdash; 服务器和执行环境信息
$_GET &mdash; HTTP GET 变量
$_POST &mdash; HTTP POST 变量
$_FILES &mdash; HTTP 文件上传变量
$_REQUEST &mdash; HTTP Request 变量
$_SESSION &mdash; Session 变量
$_ENV &mdash; 环境变量
$_COOKIE &mdash; HTTP Cookies
$php_errormsg &mdash; 前一个错误信息
$HTTP_RAW_POST_DATA &mdash; 原生POST数据
$http_response_header &mdash; HTTP 响应头
$argc &mdash; 传递给脚本的参数数目
$argv &mdash; 传递给脚本的参数数组</pre>
</div>

&emsp;&emsp;大多数的预定义变量并不是超全局变量，它们需要用'global' 关键字来使它们在函数的本地区域中有效

&nbsp;

### 超全局变量

&emsp;&emsp;超全局变量在任何范围内都有效，它们并不需要'global'声明

&emsp;&emsp;下面是超全局变量的列表

<div>
<pre>$GLOBALS
$_SERVER
$_GET
$_POST
$_FILES
$_COOKIE
$_SESSION
$_REQUEST
$_ENV</pre>
</div>
<div>
<pre>&lt;?php
function test_global()
{
    //预定义变量
    global $HTTP_POST_VARS;
    echo $HTTP_POST_VARS['name'];
    //超全局变量
    echo $_POST['name'];
}
?&gt;</pre>
</div>
