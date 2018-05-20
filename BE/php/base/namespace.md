# PHP命名空间

&emsp;&emsp;从广义上来说，命名空间是一种封装事物的方法。在很多地方都可以见到这种抽象概念。例如，在操作系统中目录用来将相关文件分组，对于目录中的文件来说，它就扮演了命名空间的角色。这个原理应用到程序设计领域就是命名空间的概念

&emsp;&emsp;在PHP中，命名空间用来解决在编写类库或应用程序时创建可重用的代码如类或函数时碰到的两类问题：一类是用户编写的代码与PHP内部的类/函数/常量或第三方类/函数/常量之间的名字冲突；另一类是为很长的标识符名称(通常是为了缓解第一类问题而定义的)创建一个别名（或简短）的名称，提高源代码的可读性。PHP命名空间提供了一种将相关的类、函数和常量组合到一起的途径。本文将详细介绍PHP的命名空间

&nbsp;

### 定义

&emsp;&emsp;虽然任意合法的PHP代码都可以包含在命名空间中，但只有以下类型的代码受命名空间的影响，它们是：类（包括抽象类和traits）、接口、函数和常量

&emsp;&emsp;命名空间通过关键字namespace来声明。如果一个文件中包含命名空间，它必须在其它所有代码之前声明命名空间，除了一个以外：declare关键字

<div>
<pre>&lt;?php
namespace MyProject;
const CONNECT_OK = 1;
class Connection { /* ... */ }
function connect() { /* ... */  }
?&gt;</pre>
</div>

**子命名空间**

&emsp;&emsp;与目录和文件的关系很象，PHP 命名空间也允许指定层次化的命名空间的名称。因此，命名空间的名字可以使用分层次的方式定义

<div>
<pre>&lt;?php
namespace MyProject\Sub\Level;
const CONNECT_OK = 1;
class Connection { /* ... */ }
function connect() { /* ... */  }
?&gt;</pre>
</div>
<div>
<pre>&lt;?php
    namespace MyProject\Sub\Level;
    const NUM = 1;
    echo NUM;//1
    echo \MyProject\Sub\Level\NUM;//1
?&gt;</pre>
</div>

&nbsp;

### 多命名空间

&emsp;&emsp;可以在同一个文件中定义多个命名空间。在同一个文件中定义多个命名空间有两种语法形式

&emsp;&emsp;在实际的编程实践中，非常不提倡在同一个文件中定义多个命名空间。这种方式的主要用于将多个 PHP 脚本合并在同一个文件中

【1】简单组合语法(不建议使用)

<div>
<pre>&lt;?php
namespace MyProject;
const CONNECT_OK = 1;
class Connection { /* ... */ }
function connect() { /* ... */  }
namespace AnotherProject;
const CONNECT_OK = 1;
class Connection { /* ... */ }
function connect() { /* ... */  }
?&gt;</pre>
</div>

【2】大括号语法

<div>
<pre>&lt;?php
namespace MyProject {
const CONNECT_OK = 1;
class Connection { /* ... */ }
function connect() { /* ... */  }
}
namespace AnotherProject {
const CONNECT_OK = 1;
class Connection { /* ... */ }
function connect() { /* ... */  }
}
?&gt;</pre>
</div>
<div>
<pre>&lt;?php
namespace MyProject {
    const NUM = 1;
}
namespace AnotherProject {
    const NUM = 2;
    echo NUM;//2
    echo \MyProject\NUM;//1
}
?&gt;</pre>
</div>

**全局**

&emsp;&emsp;将全局的非命名空间中的代码与命名空间中的代码组合在一起，只能使用大括号形式的语法。全局代码必须用一个不带名称的 namespace 语句加上大括号括起来　

<div>
<pre>&lt;?php
namespace MyProject {
const CONNECT_OK = 1;
class Connection { /* ... */ }
function connect() { /* ... */  }
}
namespace { // global code
session_start();
$a = MyProject\connect();
echo MyProject\Connection::start();
}
?&gt;</pre>
</div>

&nbsp;

### 名称解析

&emsp;&emsp;非限定名称Unqualified name是指名称中不包含命名空间分隔符的标识符，例如 Foo

&emsp;&emsp;限定名称Qualified name是指名称中含有命名空间分隔符的标识符，例如 Foo\Bar

&emsp;&emsp;完全限定名称Fully qualified name是指名称中包含命名空间分隔符，并以命名空间分隔符开始的标识符，例如 \Foo\Bar。 namespace\Foo 也是一个完全限定名称

&emsp;&emsp;如果要动态访问元素(例如，变量函数)，必须使用完全限定名称

<div>
<pre>&lt;?php
namespace MyProject;
    function test(){
        echo '111';
    }
    $var1 = 'test';
    $var2 = '\MyProject\test';
    $var1();//报错
    $var2();/111
?&gt;</pre>
</div>

&nbsp;

### 访问内部元素

&emsp;&emsp;PHP支持两种抽象的访问当前命名空间内部元素的方法，__NAMESPACE__ 魔术常量和namespace关键字

&emsp;&emsp;常量__NAMESPACE__的值是包含当前命名空间名称的字符串。在全局的，不包括在任何命名空间中的代码，它包含一个空的字符串

<div>
<pre>&lt;?php
namespace MyProject;
    function test(){
        echo '111';
    }
    $var = __NAMESPACE__.'\test';
    $var();//111
?&gt;</pre>
</div>

&emsp;&emsp;关键字 namespace 可用来显式访问当前命名空间或子命名空间中的元素。它等价于类中的 self 操作符

<div>
<pre>&lt;?php
namespace MyProject;
    function test(){
        echo '111';
    }
    test();//111
    __NAMESPACE__.test();//111
    namespace\test();//111
?&gt;</pre>
</div>

&nbsp;

### 全局空间

&emsp;&emsp;如果没有定义任何命名空间，所有的类与函数的定义都是在全局空间，与 PHP 引入命名空间概念前一样。在名称前加上前缀 \ 表示该名称是全局空间中的名称，即使该名称位于其它的命名空间中时也是如此

<div>
<pre>&lt;?php
namespace A\B\C;
/* 这个函数是 A\B\C\fopen */
function fopen() { 
     /* ... */
     $f = \fopen(...); // 调用全局的fopen函数
     return $f;
} 
?&gt;</pre>
</div>

&nbsp;

### 别名和导入

&emsp;&emsp;php允许通过别名引用或导入外部的完全限定名称，是命名空间的一个重要特征。这有点类似于在类unix文件系统中可以创建对其它的文件或目录的符号连接

&emsp;&emsp;所有支持命名空间的PHP版本支持三种别名或导入方式：为类名称使用别名、为接口使用别名或为命名空间名称使用别名

&emsp;&emsp;在PHP中，别名是通过操作符&nbsp;`_use_`&nbsp;来实现的

**别名**

<div>
<pre>&lt;?php
namespace hello\world\test;
use hello\world\test  as  t;//用t来替代hello\world\test
function demo(){
    echo '111';
}
t\demo();//111
?&gt;</pre>
</div>

&emsp;&emsp;as可以省略

<div>
<pre>&lt;?php
namespace hello\world\test;
use hello\world\test;//用test来替代hello\world\test
function demo(){
    echo '111';
}
test\demo();//111
?&gt;</pre>
</div>

**导入**

<div>
<pre>&lt;?php
use \ArrayObject;
$a = new ArrayObject([]);//若不使用"use \ArrayObject" ，则实例化一个 foo\ArrayObject 对象
?&gt;</pre>
</div>

&emsp;&emsp;为了简化，一行中可以包含多个use语句

<div>
<pre>&lt;?php
use My\Full\Classname as Another, My\Full\NSname;
$obj = new Another; // 实例化 My\Full\Classname 对象
NSname\subns\func(); // 调用函数 My\Full\NSname\subns\func
?&gt;</pre>
</div>
