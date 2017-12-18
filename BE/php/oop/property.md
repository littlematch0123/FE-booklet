# php三大特性

　　php面向对象编程的三大特性是封装性、继承性和多态性。本文将介绍php的这三大特性

&nbsp;

### 封装

　　封装就是把对象中的成员属性和成员方法加上访问修饰符( public（公有），protected（受保护）或 private（私有）)，使其尽可能隐藏对象的内部细节，以达到对成员的访问控制

　　被定义为公有的类成员可以在任何地方被访问。被定义为受保护的类成员则可以被其自身以及其子类和父类访问。被定义为私有的类成员则只能被其定义所在的类访问

　　类属性必须定义为公有，受保护，私有之一。如果用 var 定义，则被视为公有

<div class="cnblogs_code">
<pre>&lt;?php
class MyClass
{
    public $public = 'Public';
    protected $protected = 'Protected';
    private $private = 'Private';
    function printHello()
    {
        echo $this-&gt;public;
        echo $this-&gt;protected;
        echo $this-&gt;private;
    }
}
$obj = new MyClass();
echo $obj-&gt;public; // 这行能被正常执行
echo $obj-&gt;protected; // 这行会产生一个致命错误
echo $obj-&gt;private; // 这行也会产生一个致命错误
$obj-&gt;printHello(); // 输出 Public、Protected 和 Private
class MyClass2 extends MyClass
{
    // 可以对 public 和 protected 进行重定义，但 private 而不能
    protected $protected = 'Protected2';
    function printHello()
    {
        echo $this-&gt;public;
        echo $this-&gt;protected;
        echo $this-&gt;private;
    }
}
$obj2 = new MyClass2();
echo $obj2-&gt;public; // 这行能被正常执行
echo $obj2-&gt;private; // 未定义 private
echo $obj2-&gt;protected; // 这行会产生一个致命错误
$obj2-&gt;printHello(); // 输出 Public、Protected2 和 Undefined
?&gt;</pre>
</div>

　　类中的方法可以被定义为公有，私有或受保护。如果没有设置这些关键字，则该方法默认为公有

<div class="cnblogs_code">
<pre>&lt;?php
class MyClass
{
    public function __construct() { }
    public function MyPublic() { }
    protected function MyProtected() { }
    private function MyPrivate() { }
    function Foo()
    {
        $this-&gt;MyPublic();
        $this-&gt;MyProtected();
        $this-&gt;MyPrivate();
    }
}
$myclass = new MyClass;
$myclass-&gt;MyPublic(); // 这行能被正常执行
$myclass-&gt;MyProtected(); // 这行会产生一个致命错误
$myclass-&gt;MyPrivate(); // 这行会产生一个致命错误
$myclass-&gt;Foo(); // 公有，受保护，私有都可以执行
class MyClass2 extends MyClass
{
    function Foo2()
    {
        $this-&gt;MyPublic();
        $this-&gt;MyProtected();
        $this-&gt;MyPrivate(); // 这行会产生一个致命错误
    }
}
$myclass2 = new MyClass2;
$myclass2-&gt;MyPublic(); // 这行能被正常执行
$myclass2-&gt;Foo2(); // 公有的和受保护的都可执行，但私有的不行
?&gt;</pre>
</div>

&nbsp;

### 继承

　　继承已为大家所熟知的一个程序设计特性，PHP 的对象模型也使用了继承。继承将会影响到类与类，对象与对象之间的关系

　　当扩展一个类，子类就会继承父类所有公有的和受保护的方法。除非子类覆盖了父类的方法，被继承的方法都会保留其原有功能

　　继承对于功能的设计和抽象是非常有用的，而且对于类似的对象增加新功能就无须重新再写这些公用的功能

**类继承**

　　一个类可以在声明中用 extends 关键字继承另一个类的方法和属性。PHP不支持多重继承，一个类只能继承一个基类

　　被继承的方法和属性可以通过用同样的名字重新声明被覆盖。但是如果父类定义方法时使用了 final，则该方法不可被覆盖

　　当覆盖方法时，参数必须保持一致否则 PHP 将发出 E_STRICT 级别的错误信息。但构造函数例外，构造函数可在被覆盖时使用不同的参数

<div class="cnblogs_code">
<pre>&lt;?php
class foo
{
    public function printItem($string) 
    {
        echo 'Foo: ' . $string . PHP_EOL;
    }
    public function printPHP()
    {
        echo 'PHP is great.' . PHP_EOL;
    }
}
class bar extends foo
{
    public function printItem($string)
    {
        echo 'Bar: ' . $string . PHP_EOL;
    }
}

$foo = new foo();
$bar = new bar();
$foo-&gt;printItem('baz'); // Output: 'Foo: baz'
$foo-&gt;printPHP();       // Output: 'PHP is great' 
$bar-&gt;printItem('baz'); // Output: 'Bar: baz'
$bar-&gt;printPHP();       // Output: 'PHP is great'
?&gt;</pre>
</div>

　　在子类中，使用parent访问父类中的被覆盖的属性和方法

<div class="cnblogs_code">
<pre>&lt;?php
    class Person {                      
        protected $name;            
        protected $sex;                     
        public function __construct($name=&ldquo;&rdquo;, $sex=&ldquo;男&rdquo;) { }
        public function say(){}   
    }
   class Student extends Person {  
        private $school;            
        public function __construct($name="", $sex="男", $school="") {   
            parent::__construct($name,$sex); 
            $this-&gt;school = $school;
        }
        public function say( ) {
            parent::say();     
            echo "在".$this-&gt;school."学校上学&lt;br&gt;";
        }   
    }
$student = new Student("张三","男",20, "edu"); 
$student-&gt;say(); </pre>
</div>

**抽象**

　　在面向对象语言中，一个类可以有一个或多个子类，而每个类都有至少一个公有方法作为外部代码访问其的接口。而抽象方法就是为了方便继承而引入的

　　当类中有一个方法，他没有方法体，也就是没有花括号，直接分号结束，像这种方法我们叫抽象方法，必须使用关键字abstract定义

<div class="cnblogs_code">
<pre>public abstract function fun();</pre>
</div>

　　包含这种方法的类必须是抽象类也要使用关键字abstract加以声明

　　定义为抽象的类不能被实例化。任何一个类，如果它里面至少有一个方法是被声明为抽象的，那么这个类就必须被声明为抽象的。被定义为抽象的方法只是声明了其调用方式（参数），不能定义其具体的功能实现

　　抽象方法的作用就是规定了子类必须有这个方法的实现，功能交给子类，只写出结构， 而没有具体实现，实现交给具体的子类按自己的功能去实现；抽象类的作用是要求子类的结构，所以抽象类就是一个规范

　　继承一个抽象类的时候，子类必须定义父类中的所有抽象方法；另外，这些方法的访问控制必须和父类中一样（或者更为宽松）。例如某个抽象方法被声明为受保护的，那么子类中实现的方法就应该声明为受保护的或者公有的，而不能定义为私有的。此外方法的调用方式必须匹配，即类型和所需参数数量必须一致。例如，子类定义了一个可选参数，而父类抽象方法的声明里没有，则两者的声明并无冲突

<div class="cnblogs_code">
<pre>&lt;?php
    abstract class Person {
        public $name;
        public $age;
        abstract function say();        
        abstract function eat();
        function run() {
            echo "11111111111111&lt;br&gt;";
        }
        function sleep() {
            echo "2222222222222222&lt;br&gt;";
        }
    }
    class StudentCn extends Person {
        function say() {
            echo "中文&lt;br&gt;";
        }
        function eat() {
            echo "筷子";
        }
    }
    class StudentEn extends Person {
        function say() {
            echo "english&lt;br&gt;";
        }
        function eat() {
            echo "刀叉";
        }
    }
    $s1 = new StudentEn();
    $s1 -&gt; say();//english
    $s1 -&gt; eat();//刀叉
?&gt;</pre>
</div>

**接口**

　　PHP与大多数面向对象编程语言一样，不支持多重继承，也就是说每个类只能继承一个父类。为了解决这个这个问题，PHP引入了接口，接口的思想是指定了一个实现了该接口的类必须实现的一系列函数

　　使用接口（interface），可以指定某个类必须实现哪些方法，但不需要定义这些方法的具体内容。接口是通过interface关键字来定义的，就像定义一个标准的类一样，但其中定义所有的方法都是空的

　　接口中定义的所有方法都必须是公有，这是接口的特性。要实现一个接口，使用 implements 操作符。类中必须实现接口中定义的所有方法，否则会报一个致命错误。类可以实现多个接口，用逗号来分隔多个接口的名称。接口中也可以定义常量。接口常量和类常量的使用完全相同，但是不能被子类或子接口所覆盖

<div class="cnblogs_code">
<pre>//实现一个接口
&lt;?php
interface iTemplate
{
    public function setVariable($name, $var);
    public function getHtml($template);
}
class Template implements iTemplate
{
    private $vars = array();
    public function setVariable($name, $var)
    {
        $this-&gt;vars[$name] = $var;
    }
    public function getHtml($template)
    {
        foreach($this-&gt;vars as $name =&gt; $value) {
            $template = str_replace('{' . $name . '}', $value, $template);
        }
        return $template;
    }
}
?&gt;</pre>
</div>
<div class="cnblogs_code">
<pre>//常量不能被覆盖
&lt;?php
interface a
{
    const b = 'Interface constant';
}
echo a::b;
// 错误写法，因为常量不能被覆盖。接口常量的概念和类常量是一样的。
class b implements a
{
    const b = 'Class constant';
}
?&gt;</pre>
</div>
<div class="cnblogs_code">
<pre>//继承多个接口
&lt;?php
interface a
{
    public function foo();
}
interface b
{
    public function bar();
}
interface c extends a, b
{
    public function baz();
}
?&gt;</pre>
</div>

&nbsp;

### 多态

　　对象的多态性是指在父类中定义的属性或行为被子类继承之后，可以具有不同的数据类型或表现出不同的行为。这使得同一个属性或行为在父类及其各个子类中具有不同的语义。例如："几何图形"的"绘图"方法，"椭圆"和"多边形"都是"几何图"的子类，其"绘图"方法功能不同

**单态**

　　说到多态，首先要提到单态设计模式，单态模式的主要作用是保证在面向对象编程设计中，一个类只能有一个实例对象存在

<div class="cnblogs_code">
<pre>&lt;?php
    class DB {
        private static $obj = null;          
        private function __construct() {  
            echo "连接数据库成功&lt;br&gt;";
        }   
        public static function getInstance() {   
            if(is_null(self::$obj))                
                self::$obj = new self();           
            return self::$obj;                     
        }
        public function query($sql) {     
            echo $sql;
        }
    }
    $db = DB::getInstance();                 
    $db -&gt; query("select * from user");   
?&gt;</pre>
</div>

　　多态展现了动态绑定的功能，也称为&ldquo;同名异式&rdquo;，多态可以让软件在开发和维护时，达到充分的延伸性

　　在php中，多态性就是指方法的重写，一个子类可中可以重新修改父类中的某些方法，使其具有自己的特征。重写要求子类的方法和父类的方法名称相同，这可以通过声明抽象类或是接口来规范

<div class="cnblogs_code">
<pre>&lt;?php
    interface USB {
        const WIDTH = 12;
        const HEIGHT = 3;            
        function load();
        function run();
        function stop();    
    }
    class Cumputer {
        function useUSB(USB $usb) {
            $usb -&gt; load();
            $usb -&gt; run();
            $usb -&gt; stop();        
        }
    }
    class Mouse implements USB{
        function load() {
            echo "加载鼠标成功!&lt;br&gt;";
        }
        function run() {
            echo "运行鼠标功能!&lt;br&gt;";
        }
        function stop() {
            echo "鼠标工作结束!&lt;br&gt;";
        }
    }
    class KeyPress implements USB {
        function load() {
            echo "加载键盘成功!&lt;br&gt;";
        }
        function run() {
            echo "运行键盘成功!&lt;br&gt;";
        }
        function stop() {
            echo "停止键盘使用!&lt;br&gt;";
        }
    }
    class Worker {
        function work() {
            $c = new Cumputer();
            $m = new Mouse;
            $k = new KeyPress;
            $c-&gt;useUSB($k);
            $c-&gt;useUSB($m);
        }
    }
    $w = new Worker;
    $w -&gt; work();
?&gt;</pre>
</div>
