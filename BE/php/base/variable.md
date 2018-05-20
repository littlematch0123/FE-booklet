# php变量

&emsp;&emsp;变量是用于临时存储值的容器。这些值可以是数字、文本，或者复杂得多的排列组合。变量在任何编程语言中都居于核心地位，理解它们是使用php的关键所在。下面将详细介绍php中的变量

&emsp;&emsp;注意：关于javascript中的变量部分[移步至此](http://www.cnblogs.com/xiaohuochai/p/5549833.html)

&nbsp;

### 变量定义

&emsp;&emsp;php的特性之一就是它不要求在使用变量之前声明变量，当第一次给一个变量赋值时，才创建了这个变量

&emsp;&emsp;变量以$符号开头，其后是变量的名称。这使得PHP语言解析速度更快，因为解析器只要碰见这个符号就会立即知道接下来的是一个变量

&emsp;&emsp;变量名称必须以字母或下划线开头，对大小写敏感。

<div>
<pre>&lt;?php
$x=5;
echo $x;//5
echo $X;//报错
?&gt;</pre>
</div>

&emsp;&emsp;注意：内置结构和关键字以及用户自定义的类名和函数名是不区分大小写的，比如echo、while、函数名称等都可以任意大小写

<div>
<pre>&lt;?php
  //输出123
    echo 1;
    Echo 2;
    eCho 3;
?&gt;</pre>
</div>

&nbsp;

### 关键字

&emsp;&emsp;php中有一些是系统定义的，也称为关键字，是php语言的组成部分、因此不能使用它们中的任何一个作为常量、函数名或类名。但是和其他语言不同的是，系统关键字可以在php中作为变量名称使用，不过这样容易混淆，所以最好还是不要以php关键字作为变量名称

<div>
<pre>&lt;?php
  //输出123
  $echo = 123;
  echo $echo;
?&gt;  </pre>
</div>

&emsp;&emsp;下面是常用的php关键词列表

<div>
<pre>abstract  and  array  as  break  callable case  catch class  cloneconst continue  declare
default  diedo  echo  else  elseif  emptyenddeclare  endfor  endforeach  endif
endswitchendwhile  eval  exit  extends  final  finally  for  foreach  function  global
goto  if  implements  include  instanceof  insteadof  interface  isset  list  namespace
new  or  print  private  protectedpublic  require return  static  switchthrow  trait
try  unset  usevar  while  xor   yield   </pre>
</div>

&nbsp;

### 变量赋值

&emsp;&emsp;一般地，变量总是传值赋值，也就是说，将一个表达式的值赋予一个变量时，整个原始表达式的值被赋值到目标变量。这意味着，一个变量的值赋予另外一个变量时，改变其中一个变量的值，将不会影响到另外一个变量

&emsp;&emsp;注意：虽然在PHP中并不需要初始化变量，但对变量进行初始化是个好习惯。未初始化的变量具有其类型的默认值&mdash;&mdash;布尔类型的变量默认值是FALSE，整型和浮点型变量默认值是0，字符串型变量默认值是空字符串，数组变量的默认值是空数组

<div>
<pre>&lt;?php
  $a1 = 123;
  $a2 = $a1;
  $a1 = 234;
  //输出234
  echo $a1;
  echo '&lt;br&gt;';
  //输出123
  echo $a2;
?&gt;   </pre>
</div>

&emsp;&emsp;php中提供了另外一种方式给变量赋值：引用赋值。这意味着新的变量简单地引用了原始变量。改动新的变量将影响到原始变量，反之亦然

&emsp;&emsp;使用引用赋值，简单地将一个'&amp;'符号加到源变量前即可

<div>
<pre>&lt;?php
  $a1 = 123;
  $a2 = &amp;$a1;
  $a1 = 234;
  //输出234
  echo $a1;
  echo '&lt;br&gt;';
  //输出234
  echo $a2;
?&gt;  </pre>
</div>

&nbsp;

### 可变变量

&emsp;&emsp;一个变量的变量名可以动态地设置和使用。一个普通的变量通过声明来设置，而一个可变变量获取了一个普通变量的值作为这个可变变量的变量名

<div>
<pre>&lt;?php
  $hi = 'hello';
  $$hi = 'world';
  echo "$hi $hello";//'hello world'
  echo "$hi ${$hi}";//'hello world'
?&gt;</pre>
</div>

&nbsp;

### 变量函数

&emsp;&emsp;变量函数数量众多，一些函数会在后面博文再做相关介绍。现在，主要介绍isset()、unset()和var_dump()这三个函数

&emsp;&emsp;var_dump()函数用来返回变量的类型和值

<div>
<pre>&lt;?php
$p = 3.14;
var_dump($p);//float 3.14
$p = 'abc';
var_dump($p);//string 'abc' (length=3)
?&gt;</pre>
</div>

&emsp;&emsp;unset()函数用来释放指定的变量

<div>
<pre>&lt;?php
$p = 'abc';
echo $p;//'abc'
unset($p);
echo $p;//报错
?&gt;</pre>
</div>

&emsp;&emsp;isset()函数用来检测变量是否设置，当一个变量被设置为NULL或被释放，则返回false，否则返回true

&emsp;&emsp;注意：对于表单控件type="radio"或select控件，可以使用isset()函数来判断值是否为空。如果是type="text"的输入框，则需要使用empty()来判断

<div>
<pre>&lt;?php
$p = 'abc';
var_dump(isset($p));//boolean true
$p = NULL;
var_dump(isset($p));//boolean false
unset($p);
var_dump(isset($p));//boolean false
?&gt;</pre>
</div>
