# php类和对象

　　面向对象程序设计(OOP)是一种计算机编程架构。计算机程序由单个能够起到子程序作用的单元或对象组成，为了实现整体运算，每个对象都能接收信息、处理数据和向其他对象发送信息。OOP达到了软件工程的三个目标：重用性、灵活性和扩展性，使编程的代码更简洁、更易于维护，并且具有更强的可重用性。PHP主要通过类和对象来实现面向对象的程序设计，本文将详细介绍php的类和对象

　　通过了解PHP的类和对象，对深入理解javascript的继承有促进作用，关于javascript继承的详细信息[移步至此](http://www.cnblogs.com/xiaohuochai/p/5753952.html)

&nbsp;

### 类

　　类与对象的关系就如模具和铸件的关系，类的实例化结果就是对象，而对象的抽象就是类。类描述了一组有相同特性（属性）和相同行为（方法）的对象。在开发时，要先抽象类再用该类去创建对象，而在程序中直接使用的是对象而不是类

　　类是一个独立的程序单位，是具有相同属性和服务的一组对象集合。它为属于该类的所有对象提供了统一抽象描述，其内部包括成员属性和服务方法两个主要部分

　　每个类的定义都以关键字class开头，后面跟着类名，后面跟着一对花括号，里面包含类的属性与方法的定义

　　一个类可以包含有属于自己的常量，变量(称为&ldquo;属性&rdquo;)以及函数(称为&ldquo;方法&rdquo;)

　　[注意]使用-&gt;操作符时，变量$var前面的美元符号$是要省略的

<div class="cnblogs_code">
<pre>&lt;?php
class SimpleClass
{
    //成员属性
    public $var = 'a default value';
    //成员方法
    public function displayVar() {
        echo $this-&gt;var;
    }
}
?&gt;</pre>
</div>

&nbsp;

### 成员属性

　　类的变量成员叫做&ldquo;属性&rdquo;，或者叫&ldquo;字段&rdquo;、&ldquo;特征&rdquo;。属性声明是由关键字public、protected或private开头，然后跟一个普通的变量声明来组成。属性中的变量可以初始化，但是初始化的值必须是最终的值，而不应是带运算符的表达式、变量、方法或函数调用

　　如果直接使用 var 声明属性，而没有用 public，protected 或 private 之一，PHP5会将其视为 public

<div class="cnblogs_code">
<pre>public $var3 = 1+2;             //错误格式
public $var4 = self::myStaticMethod();     //错误格式
public $var5 = $myVar;             //错误格式

public $var6 = 100; //普通数值(4个标量：整数、浮点数、布尔、字串)
public $var6 = myConstant;         //常量
public $var7 = self::classConstant;     //静态属性
public $var8 = array(true, false);      //数组</pre>
</div>

&nbsp;

### 成员方法

<div class="cnblogs_code">
<pre>[修饰符] function 方法名(参数..){
    [方法体]
    [return 返回值]
}</pre>
</div>

　　成员方法的修饰符包括：public、protected、private、static、abstract、final

　　声明的成员方法必须和对象相关，不能是一些没有意义的操作

<div class="cnblogs_code">
<pre>public function say(){   
    echo "说话";      
}       
public function run(){    
    echo "走路";      
}</pre>
</div>

&nbsp;

### 对象

　　在客观世界里，所有的事物都是由对象和对象之间的联系组成的。对象是系统中用来描述客观事物的一个实体，它是构成系统的一个基本单位

　　要创建一个对象，也就是实例化一个类，必须使用new关键字

　　如果在new之后跟着的是一个包含有类名的字符串，则该类的一个实例同样被创建

<div class="cnblogs_code">
<pre>&lt;?php
$instance = new SimpleClass();

// 也可以这样做：
$className = 'Foo';
$instance = new $className(); // Foo()
?&gt;</pre>
</div>

&nbsp;

### 成员访问

　　类中包含成员属性与成员方法两个部分，可以使用&ldquo;new&rdquo;关键字来创建一个对象，即：$引用名 = new 类名(构造参数)；可以使用特殊运算符&ldquo;-&gt;&rdquo;来访问对象中的成员属性或成员方法

<div class="cnblogs_code">
<pre>$引用名 = new 类名(构造参数)；
$引用名-&gt;成员属性=赋值；   //对象属性赋值    
echo $引用名-&gt;成员属性；   //输出对象的属性    
$引用名-&gt;成员方法(参数)；//调用对象的方法</pre>
</div>

　　[注意]如果对象中的成员不是静态的，那么这是唯一的访问方式

　　当把一个对象已经创建的实例赋给一个新变量时，新变量会访问同一个实例，就和用该对象赋值一样。此行为和给函数传递入实例时一样。可以用克隆给一个已创建的对象建立一个新实例

<div class="cnblogs_code">
<pre>&lt;?php
class SimpleClass{}
$instance = new SimpleClass();
$assigned   =  $instance;
$reference  =&amp; $instance;
$instance-&gt;var = '$assigned will have this value';
$instance = null; 

var_dump($instance);//null
var_dump($reference);//null
/*
object(SimpleClass)[1]
  public 'var' =&gt; string '$assigned will have this value' (length=30)
 */
var_dump($assigned);
?&gt;</pre>
</div>

&nbsp;

### this

　　当一个方法在类定义内部被调用时，有一个可用的伪变量this，特殊对象的引用this就是在对象内部的成员方法中，代表本对象的一个引用，但只能在对象的成员方法中使用，不管是在对象内部使用$this访问自己对象内部成员。还是在对象外部通过对象的引用名称访问对象中的成员，都需要使用特殊的运算符&ldquo;-&gt;&rdquo;来完成访问

<div class="cnblogs_code">
<pre>&lt;?php
class A
{
    function foo()
    {
        if (isset($this)) {
            echo '$this is defined (';
            echo get_class($this);
            echo ")\n";
        } else {
            echo "\$this is not defined.\n";
        }
    }
}
class B
{
    function bar()
    {
        // Note: the next line will issue a warning if E_STRICT is enabled.
        A::foo();
    }
}
$a = new A();
$a-&gt;foo();//$this is defined (A) 
A::foo();//$this is not defined. 
$b = new B();
$b-&gt;bar();//$this is defined (B) 
B::bar();//$this is not defined.
?&gt;</pre>
</div>
