# 前端学PHP之面向对象系列第四篇——关键字

&emsp;&emsp;php实现面向对象的一个显著特征是大量使用关键字，本文将详细介绍关键字

&nbsp;

### public

&emsp;&emsp;public表示公有，它具有最大的访问权限，被定义为公有的类成员可以在任何地方被访问

&emsp;&emsp;如果属性用 var 定义，则被视为公有，如果方法没有设置关键字，则该方法默认为公有

<div>
<pre>&lt;?php
class demo{
    public $public = 1;
    function test($var){
        echo "{$var}000";
    }
}
$d1 = new demo;
$d1-&gt;test($d1-&gt;public);//1000
?&gt;</pre>
</div>

&nbsp;

### protected

&emsp;&emsp;protected表示受保护的，被定义为受保护的类成员则可以被其自身以及其子类和父类访问

<div>
<pre>&lt;?php
class demo{
    protected function fn(){
        echo '111';
    }
}
class demo1 extends demo{
    function test(){
        parent::fn();
    }    
}
$d1 = new demo1;
$d1-&gt;test();//111
?&gt;</pre>
</div>

&nbsp;

### private

&emsp;&emsp;private表示私有的，被定义为私有的类成员则只能被其定义所在的类访问

<div>
<pre>&lt;?php
class demo{
    private $private = 1;
    function test(){
        echo($this-&gt;private);
    }
}
$d1 = new demo;
$d1-&gt;test();//1
?&gt;    </pre>
</div>

&nbsp;

### final

&emsp;&emsp;PHP5新增了final关键字，它只能用来修饰类和方法，不能使用final这个关键字来修饰成员属性，因为final是常量的意思，我们在PHP里定义常量使用的是define()函数和const关键字，所以不能使用final来定义成员属性

&emsp;&emsp;如果父类中的方法被声明为final，则子类无法覆盖该方法。如果一个类被声明为 final，则不能被继承

<div>
<pre>&lt;?php
class BaseClass {
   public function test() {
       echo "BaseClass::test() called\n";
   }
   final public function moreTesting() {
       echo "BaseClass::moreTesting() called\n";
   }
}
class ChildClass extends BaseClass {
   public function moreTesting() {
       echo "ChildClass::moreTesting() called\n";
   }
}
// Results in Fatal error: Cannot override final method BaseClass::moreTesting()
?&gt;</pre>
</div>

&nbsp;

### static

&emsp;&emsp;static关键字表示静态的意思，用于修饰类的成员属性和成员方法（即为静态属性和静态方法）

&emsp;&emsp;类中的静态属性和静态方法不用实例化(new)就可以直接使用类名访问

&emsp;&emsp;注意：静态属性不能通过一个类已实例化的对象来访问，但静态方法可以

&emsp;&emsp;由于静态方法不需要通过对象即可调用，所以伪变量 $this 在静态方法中不可用，静态属性不可以由对象通过 -&gt; 操作符来访问

&emsp;&emsp;用静态方式调用一个非静态方法会导致一个 E_STRICT 级别的错误

&emsp;&emsp;就像其它所有的 PHP 静态变量一样，静态属性只能被初始化为文字或常量，不能使用表达式。所以可以把静态属性初始化为整数或数组，但不能初始化为另一个变量或函数返回值，也不能指向一个对象

<div>
<pre>&lt;?php
class Foo
{
    public static $my_static = 'foo';
    public function staticValue() {
        return self::$my_static;
    }
}
class Bar extends Foo
{
    public function fooStatic() {
        return parent::$my_static;
    }
}
print Foo::$my_static . "\n";//'foo'
$foo = new Foo();
print $foo-&gt;staticValue() . "\n";//'foo'
print $foo::$my_static . "\n";//'foo'
print $foo-&gt;my_static . "\n"; //报错 
?&gt;</pre>
</div>

&emsp;&emsp;static的常用场景是迭代器

<div>
<pre>function test(){
  static $count = 0;
  $count++;
  echo $count.' ';
  if($count&lt;10){
    test();
  }
}
test();</pre>
</div>

&nbsp;

### const

&emsp;&emsp;可以把在类中始终保持不变的值定义为常量。在定义和使用常量的时候不需要使用$符号，而是使用const

&emsp;&emsp;常量的值必须是一个定值，不能是变量，类属性，数学运算的结果或函数调用

<div>
<pre>&lt;?php
class MyClass
{
    const constant = 'constant value';
    function showConstant() {
        echo  self::constant . "\n";
    }
}
echo MyClass::constant . "\n";//'constant value'
$classname = "MyClass";
echo $classname::constant . "\n"; //'constant value'
$class = new MyClass();
$class-&gt;showConstant();//'constant value'
echo $class::constant."\n";//'constant value'
?&gt;</pre>
</div>

&nbsp;

### this

&emsp;&emsp;当一个方法在类定义内部被调用时，有一个可用的伪变量this，特殊对象的引用this就是在对象内部的成员方法中，代表本对象的一个引用，但只能在对象的成员方法中使用，不管是在对象内部使用$this访问自己对象内部成员。还是在对象外部通过对象的引用名称访问对象中的成员，都需要使用特殊的运算符&ldquo;-&gt;&rdquo;来完成访问

&emsp;&emsp;注意：this在静态方法中不可用

<div>
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

&nbsp;

### self

&emsp;&emsp;在类的方法中，不能用this来引用静态变量或静态方法，而需要用self来引用

<div>
<pre>&lt;?php
class MyClass
{
    const constant = 'constant value';
    static function showConstant() {
        echo  self::constant . "\n";
    }
}
$var = new MyClass;
echo $var-&gt;showConstant();//constant value
?&gt;</pre>
</div>

&nbsp;

### parent

&emsp;&emsp;parent用于在子类中调用父类中定义的成员方法或常量

<div>
<pre>&lt;?php
class MyClass{
    function fn(){
        echo('111');
    }
    const A = 'a';
}
class Class1 extends MyClass{
    function test(){
        echo parent::fn().parent::A;
    }
}
$var = new Class1;
$var-&gt;test();//111a
?&gt;</pre>
</div>
