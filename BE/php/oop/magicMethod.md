# php魔术方法

　　php在面向对象部分有很多相关的魔术方法，这些方法为面向对象实现提供了便利，本文将详细介绍魔术方法

&nbsp;

### 构造方法

　　大多数类都有一种称为构造函数的特殊方法。当创建一个对象时，它将自动调用构造函数，通常用它执行一些有用的初始化任务

　　构造函数的声明与其它操作的声明一样，只是其名称必须是两个下划线__construct( )。这是PHP5中的变化；PHP4的版本中，构造函数的名称必须与类名相同。为了向下兼容，如果一个类中没有名为__construct( )的方法，PHP将搜索一个与类名相同的方法

<div class="cnblogs_code">
<pre>void __construct ([ mixed $args [, $... ]] )</pre>
</div>

　　如果子类中定义了构造函数则不会隐式调用其父类的构造函数。要执行父类的构造函数，需要在子类的构造函数中调用 parent::__construct()。如果子类没有定义构造函数则会如同一个普通的类方法一样从父类继承（假如没有被定义为 private 的话）

<div class="cnblogs_code">
<pre>&lt;?php
class BaseClass {
   function __construct() {
       print "In BaseClass constructor\n";
   }
}
class SubClass extends BaseClass {
   function __construct() {
       parent::__construct();
       print "In SubClass constructor\n";
   }
}
class OtherSubClass extends BaseClass {
}
// In BaseClass constructor
$obj = new BaseClass();
// In BaseClass constructor
// In SubClass constructor
$obj = new SubClass();
// In BaseClass constructor
$obj = new OtherSubClass();
?&gt;</pre>
</div>

&nbsp;

### 析构方法

　　与构造方法相对的就是析构方法。析构方法是PHP5新添加的内容，在PHP4中没有析构方法。析构方法是在对象被销毁之前自动调用的方法，主要执行一些特定的操作，例如关闭文件，释放结果集等

　　与构造方法类似，一个类的析构方法名称必须是两个下划线 __destruct( )。析构函数不能带有任何参数

<div class="cnblogs_code">
<pre>&lt;?php
class MyDestructableClass {
   function __construct() {
       print "In constructor\n";
       $this-&gt;name = "MyDestructableClass";
   }
   function __destruct() {
       print "Destroying " . $this-&gt;name . "\n";
   }
}
//In constructor Destroying MyDestructableClass
$obj = new MyDestructableClass();
?&gt;</pre>
</div>

&nbsp;

### 不可访问属性

**get()**

　　读取不可访问属性(protected、private)时，__get()会被调用，并将属性名以第一个参数(string)传进此方法中

<div class="cnblogs_code">
<pre>public mixed __get ( string $name )</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;?php
class demo{
    protected $protected = 1;
    public $public = 2;
    private $private = 3;
    function __get($name){
        echo "111{$name}111&lt;br&gt;";
    }
}
$d1 = new demo;
$d1-&gt;protected;//111protected111
$d1-&gt;public;
$d1-&gt;private;//111private111
?&gt;</pre>
</div>

**set()**

　　在给不可访问属性(protected、private)赋值时，__set() 会被调用，并将属性名以第一个参数(string)，值作为第二参数(mixed)传进此方法中

<div class="cnblogs_code">
<pre>public void __set ( string $name , mixed $value )</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;?php
class demo{
    protected $protected = 1;
    public $public = 2;
    private $private = 3;
    function __set($name,$value){
        echo "0{$name}0{$value}&lt;br&gt;";
    }
}
$d1 = new demo;
$d1-&gt;protected = '1';//0protected01
$d1-&gt;public = '2';
$d1-&gt;private = '3';//0private03
?&gt;</pre>
</div>

**isset()**

　　当对不可访问属性(protected、private)调用 isset() 或 empty() 时，__isset() 会被调用

<div class="cnblogs_code">
<pre>public bool __isset ( string $name )</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;?php
class demo{
    protected $protected = 1;
    public $public = 2;
    private $private = 3;
    function __isset($name){
        echo "0{$name}0&lt;br&gt;";
    }
}
$d1 = new demo;
empty($d1-&gt;protected);//0protected0
empty($d1-&gt;public);
empty($d1-&gt;private);//0private0
?&gt;</pre>
</div>

**unset()**

　　当对不可访问属性(protected、private)调用unset()时，__unset()会被调用

<div class="cnblogs_code">
<pre>public void __unset ( string $name )</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;?php
class demo{
    protected $protected = 1;
    public $public = 2;
    private $private = 3;
    function __unset($name){
        echo "0{$name}0&lt;br&gt;";
    }
}
$d1 = new demo;
unset($d1-&gt;protected);//0protected0
unset($d1-&gt;public);
unset($d1-&gt;private);//0private0
?&gt;</pre>
</div>

&nbsp;

### 对象复制

**clone()**

　　在对象克隆时会自动调用clone()方法，这方法不需要任何参数，可以通过该方法对克隆后的副本重新初始化

　　clone()方法会自动包含this和that两个对象的引用，this是副本对象的引用，that是原本对象的引用

<div class="cnblogs_code">
<pre>&lt;?php
    class Person{
        private $name;
        private $sex;
        private $age;
        function __construct($name="",$sex="",$age=1){
            $this-&gt;name= $name;
            $this-&gt;sex = $sex;
            $this-&gt;age = $age;
        }
        function __clone(){
            $this-&gt;name = $this-&gt;name."的副本";
        }
        function say(){
            echo "我的名字：" .$this-&gt;name."，性别：".$this-&gt;sex."，年龄：".$this-&gt;age."&lt;br&gt;";
        }
    }
    $p1 = new Person('张三','男','20');
    $p2 = clone $p1;
    $p1-&gt;say();//我的名字：张三，性别：男，年龄：20
    $p2-&gt;say();//我的名字：张三的副本，性别：男，年龄：20
?&gt;</pre>
</div>

&nbsp;

### 字符串

**toString()**

　　__toString()方法用于一个类被当成字符串时应怎样回应，它是快速获取对象的字符串表示的最便捷的方式，是直接输出对象引用时自动调用的方法

<div class="cnblogs_code">
<pre>&lt;?php
class TestClass
{
    public $foo;
    public function __construct($foo) 
    {
        $this-&gt;foo = $foo;
    }
    public function __toString() {
        return $this-&gt;foo;
    }
}
$class = new TestClass('Hello');
echo $class;//Hello
?&gt;</pre>
</div>

&nbsp;

### 对象不存在

**call()**

　　在对象中调用一个不可访问方法时，__call()会被调用

**callStatic()**

　　在静态上下文中调用一个不可访问方法时，__callStatic()会被调用

<div class="cnblogs_code">
<pre>&lt;?php
class MethodTest 
{
    public function __call($name, $arguments) 
    {
        echo "Calling object method '$name' "
             . implode(', ', $arguments). "\n";
    }
    public static function __callStatic($name, $arguments) 
    {
        echo "Calling static method '$name' "
             . implode(', ', $arguments). "\n";
    }
}
$obj = new MethodTest;
//Calling object method 'runTest' in object context
$obj-&gt;runTest('in object context');
//Calling static method 'runTest' in static context
MethodTest::runTest('in static context');  
?&gt;</pre>
</div>

&nbsp;

### 自动加载类

**autoload()**

　　在PHP5中，可以定义一个__autoload()函数，它会在试图使用尚未被定义的类时自动调用。通过调用此函数，脚本引擎在PHP出错失败前有了最后一个机会加载所需的类

<div class="cnblogs_code">
<pre>&lt;?php
function __autoload($class_name) {
    require_once $class_name . '.php';
}

$obj  = new MyClass1();
$obj2 = new MyClass2();
?&gt;</pre>
</div>

&nbsp;

### 串行化

**sleep()**

　　在调用serialize()函数将对象串行化时，检查类中是否存在一个魔术方法 __sleep()。如果存在，该方法会先被调用，然后才执行序列化操作。此功能可以用于清理对象，并返回一个包含对象中所有应被序列化的变量名称的数组。如果该方法未返回任何内容，则 NULL 被序列化，并产生一个 E_NOTICE 级别的错误

　　__sleep()函数不需要接受任何参数，但需要返回一个数组，在数组中包含需要串行化的属性。未被包含在数组中的属性将在串行化时被忽略。如果没有在类中声明__sleep()方法，对象中的所有属性都将被串行化

**wakeup()**

　　在调用unserialize()函数将对象反串行化对象时，则会自动调用对象中的__wakeup()方法，用来在二进制串重新组成一个对象时，为新对象中的成员属性重新初始化

　　wakeup()经常用在反序列化操作中，例如重新建立数据库连接，或执行其它初始化操作

<div class="cnblogs_code">
<pre>&lt;?php
class Connection 
{
    protected $link;
    private $server, $username, $password, $db;  
    public function __construct($server, $username, $password, $db)
    {
        $this-&gt;server = $server;
        $this-&gt;username = $username;
        $this-&gt;password = $password;
        $this-&gt;db = $db;
        $this-&gt;connect();
    }
    private function connect()
    {
        $this-&gt;link = mysql_connect($this-&gt;server, $this-&gt;username, $this-&gt;password);
        mysql_select_db($this-&gt;db, $this-&gt;link);
    }
    public function __sleep()
    {
        return array('server', 'username', 'password', 'db');
    }
    public function __wakeup()
    {
        $this-&gt;connect();
    }
}
?&gt;</pre>
</div>

&nbsp;

### 函数调用

**invoke()**

　　当尝试以调用函数的方式调用一个对象时，__invoke()方法会被自动调用

<div class="cnblogs_code">
<pre>&lt;?php
class CallableClass 
{
    function __invoke($x) {
        var_dump($x);
    }
}
$obj = new CallableClass;
$obj(5);//int(5)
var_dump(is_callable($obj));//bool(true)
?&gt;</pre>
</div>

【补充】

**set_state()**

　　当调用var_export()导出类时，set_state()方法会被调用，本方法的唯一参数是一个数组，其中包含按 array('property' =&gt; value, ...) 格式排列的类属性

　　[注意]var_export()返回关于传递给该函数的变量的结构信息，它和var_dump()类似，不同的是其返回的表示是合法的PHP代码，也就是说，var_export返回的代码，可以直接当作php代码赋给一个变量。 而这个变量就会取得和被var_export一样的类型的值

<div class="cnblogs_code">
<pre>&lt;?php
class A
{
    public $var1;
    public $var2;
    public static function __set_state($an_array) 
    {
        $obj = new A;
        $obj-&gt;var1 = $an_array['var1'];
        $obj-&gt;var2 = $an_array['var2'];
        return $obj;
    }
}
$a = new A;
$a-&gt;var1 = 5;
$a-&gt;var2 = 'foo';
eval('$b = ' . var_export($a, true) . ';'); 
/*
object(A)[2]
  public 'var1' =&gt; int 5
  public 'var2' =&gt; string 'foo' (length=3)
 */
var_dump($b);
?&gt;</pre>
</div>
