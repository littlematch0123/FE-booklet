# php常量

　　常量在javascript中并不存在，在php中却是与变量并列的重要内容。常量类似变量，但常量一旦被定义就无法更改或撤销定义。常量最主要的作用是可以避免重复定义，篡改变量值，提高代码可维护性。下面将详细介绍php中的常量

&nbsp;

### 定义常量

　　常量是一个简单值的标识符。如同其名称所暗示的，在脚本执行期间一个常量一旦被定义，就不能再改变或取消定义。常量默认为大小写敏感。按照惯例常量标识符总是大写的

　　常量名和其它任何PHP标签遵循同样的命名规则。合法的常量名以字母或下划线开始，后面跟着任何字母，数字或下划线

　　和[超全局变量](http://www.cnblogs.com/xiaohuochai/p/6039493.html#anchor5)一样，常量的范围是全局的。不用管作用区域就可以在脚本的任何地方访问常量

　　常量只能包含标量数据(boolean、integer、float和string)。可以定义resource常量，但应尽量避免，因为会造成不可预料的结果

**define()函数**

　　定义常量使用define()函数，它使用三个参数：首个参数定义常量的名称，第二个参数定义常量的值，可选的第三个参数规定常量名是否对大小写敏感，默认是false

<div class="cnblogs_code">
<pre>bool define ( string name, mixed value [, bool case_insensitive] )</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;?php
$p = 'PI0';
define('PI',3.14);
define('PI',3.15);//无效，因为常量无法被修改定义
define($p,3.14);
echo PI;//3.14
echo "&lt;br&gt;";
echo PI0;//3.14
?&gt;</pre>
</div>

**const**

　　在PHP5.3.0以后，可以使用const关键字在类定义之外定义常量

　　使用const关键字定义常量必须处于最顶端的作用区域，因为用此方法是在编译时定义的。这就意味着不能在函数内，循环内以及if语句之内用const来定义常量

<div class="cnblogs_code">
<pre>&lt;?php
// 以下代码在 PHP 5.3.0 后可以正常工作
const CONSTANT = 'Hello World';
echo CONSTANT;
?&gt;</pre>
</div>

&nbsp;

### 常量检测

　　对于常量来说，通常要检测常量是否定义或检测常量的值，涉及到defined()函数和constant()函数

**defined()函数**

　　defined()函数用来判断一个常量是否已经定义，其语法格式为：

<div class="cnblogs_code">
<pre>bool defined(string constants_name)</pre>
</div>

　　若存在则返回true，否则返回false

　　如果常量被重复定义后，PHP解析器会发出"Constant XXX already defined"的警告，提醒该常量已被定义过

<div class="cnblogs_code">
<pre>&lt;?php 
define("PI1",3.14);
$p = "PI1";
$is1 = defined($p);
$is2 = defined("PI2");
var_dump($is1);//bool(true)
var_dump($is2);//bool(false)
?&gt;</pre>
</div>

**constant()函数**

　　constant()函数用来返回一个常量的值，语法格式为：

<div class="cnblogs_code">
<pre>mixed constant(string constant_name)</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;?php
$p;
define("PI1",3.14);
define("PI2",3.142);
$height = "中";
if($height == "中"){
    $p = "PI1";
}else{
    $p = "PI2";
}
$r = 1;
$area = constant("PI") * $r * $r;
echo $area;
?&gt;</pre>
</div>

&nbsp;

### 系统常量

　　在php中，除了可以自己定义常量外，还预定义了一系列系统常量，可以在程序中直接使用来完成一些特殊功能。下面是一些在系统中常见的预定义常量

<div class="cnblogs_code">
<pre>PHP_OS        UNIX或WINNT等     执行PHP解析的操作系统名称
PHP_VERSION   5.2.6等          当前PHP的版本号
E_ERROR       1                错误，导致PHP脚本运行停止
E_WARNING     2                警告，不会导致PHP脚本运行停止
E_PARSE       4                解析错误，帽程序解析器报告
E_NOTICE      8                非关键的错误，例如变量未初始化
M_PI          3.1415926535898  数学中的PI值   </pre>
</div>

　　完整的系统常量列表[移步至此](http://php.net/manual/zh/reserved.constants.php)

<div class="cnblogs_code">
<pre>&lt;?php
echo PHP_VERSION;//5.5.12
echo "&lt;br /&gt;";
echo PHP_OS;//WINNT
echo "&lt;br /&gt;";
?&gt;</pre>
</div>

&nbsp;

### 魔术常量

　　PHP中有8个系统常量会根据它们使用的位置改变而改变，这样的常量被称为魔术常量

<div class="cnblogs_code">
<pre>__LINE__        文件中的当前行号。
__FILE__        文件的完整路径和文件名。如果用在被包含文件中，则返回被包含的文件名。自PHP 4.0.2起，__FILE__ 总是包含一个绝对路径（如果是符号连接，则是解析后的绝对路径），而在此之前的版本有时会包含一个相对路径
__DIR__         文件所在的目录。如果用在被包括文件中，则返回被包括的文件所在的目录。除非是根目录，否则目录中名不包括末尾的斜杠。（PHP 5.3.0新增）
__FUNCTION__    函数名称（PHP 4.3.0新加）。自PHP5起本常量返回该函数被定义时的名字（区分大小写）。在PHP4中该值总是小写字母。
__CLASS__       类的名称（PHP 4.3.0新加）。自PHP5起本常量返回该类被定义时的名字（区分大小写）。在PHP4中该值总是小写字母。类名包括其被声明的作用区域（例如 Foo\Bar）
__TRAIT__       Trait 的名字（PHP 5.4.0新加）。自PHP 5.4起此常量返回 trait 被定义时的名字（区分大小写）。Trait 名包括其被声明的作用区域（例如 Foo\Bar）
__METHOD__      类的方法名（PHP 5.0.0 新加）。返回该方法被定义时的名字（区分大小写）
__NAMESPACE__   当前命名空间的名称（区分大小写）。此常量是在编译时定义的（PHP 5.3.0 新增）</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;?php
echo __FILE__;//D:\wamp\www\1.php
echo "&lt;br /&gt;";
echo __LINE__;//11
?&gt;</pre>
</div>
