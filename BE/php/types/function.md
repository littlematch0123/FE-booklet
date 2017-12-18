# php函数

　　PHP 的真正力量来自它的函数：它拥有超过 1000 个内建的函数。本文将详细介绍php函数

　　[注意]关于javascript函数的详细内容[移步至此](http://www.cnblogs.com/xiaohuochai/p/5702813.html)

&nbsp;

### 函数定义

　　除了内建的 PHP 函数，可以创建我们自己的函数。函数是可以在程序中重复使用的语句块。页面加载时函数不会立即执行。函数只有在被调用时才会执行。

　　用户定义的函数声明以关键字 "function" 开头，函数名和 PHP 中的其它标识符命名规则相同。有效的函数名以字母或下划线打头，后面跟字母，数字或下划线

<div class="cnblogs_code">
<pre>function functionName() {
  被执行的代码;
}</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;?php
function writeMsg() {
  echo "Hello world!";
}
writeMsg(); // 调用函数
?&gt;</pre>
</div>

&nbsp;

### 函数参数

　　可以通过参数向函数传递信息，参数类似变量。参数被定义在函数名之后，括号内部。可以添加任意多参数，只要用逗号隔开即可

<div class="cnblogs_code">
<pre>&lt;?php
function familyName($fname) {
  echo "$fname Zhang.&lt;br&gt;";
}

familyName("Li");
familyName("Hong");
familyName("Tao");
familyName("Xiao Mei");
familyName("Jian");
?&gt;</pre>
</div>

**引用传递**

　　默认情况下，函数参数通过值传递。如果希望允许函数修改它的参数值，必须通过引用传递参数

　　如果想要函数的一个参数总是通过引用传递，可以在函数定义中该参数的前面加上符号 &amp;

<div class="cnblogs_code">
<pre>&lt;?php
function add_some_extra(&amp;$string)
{
    $string .= 'and something extra.';
}
$str = 'This is a string, ';
add_some_extra($str);
echo $str;    // outputs 'This is a string, and something extra.'
?&gt;</pre>
</div>

**默认参数**

　　函数可以定义 C++ 风格的标量参数默认值

<div class="cnblogs_code">
<pre>&lt;?php
function setHeight($minheight=50) {
  echo "The height is : $minheight &lt;br&gt;";
}

setHeight(350);
setHeight(); // 将使用默认值 50
setHeight(135);
setHeight(80);
?&gt;</pre>
</div>

　　PHP 还允许使用数组 array 和特殊类型 NULL 作为默认参数

<div class="cnblogs_code">
<pre>&lt;?php
function makecoffee($types = array("cappuccino"), $coffeeMaker = NULL)
{
    $device = is_null($coffeeMaker) ? "hands" : $coffeeMaker;
    return "Making a cup of ".join(", ", $types)." with $device.\n";
}
echo makecoffee();
echo makecoffee(array("cappuccino", "lavazza"), "teapot");
?&gt;</pre>
</div>

　　[注意]当使用默认参数时，任何默认参数必须放在任何非默认参数的右侧；否则，函数将不会按照预期的情况工作

**可变参数**

【func_get_args()】

　　func_get_args()相当于javascript函数中的arguments，以数组形式保存着实参

<div class="cnblogs_code">
<pre>function demo(){
    $arr = func_get_args();
    $sum = 0;
    for($i = 0; $i&lt;count($arr); $i++){
        $sum += $arr[$i];
    }
    return $sum;
}
//45
echo demo(1,2,3,4,5,6,7,8,9);</pre>
</div>

　　此外，还有两个常用的函数func_num_args()和func_get_arg()&nbsp;

　　func_num_args()函数返回参数总数&nbsp;

　　func_get_arg()函数接收一个数字参数，返回指定参数

<div class="cnblogs_code">
<pre>function more_args() {           
    for($i=0; $i&lt;func_num_args(); $i++) { 
        echo "第".$i."个参数是".func_get_arg($i)."&lt;br&gt;";
    }
}
more_args("one", "two", "three", 1, 2, 3); </pre>
</div>

&nbsp;

### 返回值

　　如需使函数返回值，使用 return 语句。如果省略了return，则返回值为 NULL

<div class="cnblogs_code">
<pre>&lt;?php
function sum($x,$y) {
  $z=$x+$y;
  return $z;
}

echo "5 + 10 = " . sum(5,10) . "&lt;br&gt;";
echo "7 + 13 = " . sum(7,13) . "&lt;br&gt;";
echo "2 + 4 = " . sum(2,4);
?&gt;</pre>
</div>

&nbsp;

### 变量函数

　　变量函数也叫可变函数。如果一个变量名后有圆括号，PHP 将寻找与变量的值同名的函数，并且尝试执行它。可变函数可以用来实现包括回调函数，函数表在内的一些用途

　　[注意]可变函数不能用于例如 echo，print，unset()，isset()，empty()，include，require 以及类似的语言结构。需要使用自己的包装函数来将这些结构用作可变函数

<div class="cnblogs_code">
<pre>&lt;?php
function foo() {
    echo "In foo()&lt;br /&gt;\n";
}
function bar($arg = '') {
    echo "In bar(); argument was '$arg'.&lt;br /&gt;\n";
}
// 使用 echo 的包装函数
function echoit($string)
{
    echo $string;
}
$func = 'foo';
$func();        // This calls foo()
$func = 'bar';
$func('test');  // This calls bar()
$func = 'echoit';
$func('test');  // This calls echoit()
?&gt;</pre>
</div>

&nbsp;

### 回调函数

　　回调函数是指将一个函数的函数名作为参数传到另一个函数中

<div class="cnblogs_code">
<pre>function demo($num,$n){
    for($i=0;$i&lt;$num;$i++){
        if($n($i)){
            echo $i.'&lt;br&gt;';
        }
    }
}
function test($i){
    if($i%5){
        return true;
    }
}
demo(20,'test');</pre>
</div>

**call_user_func_array**

　　使用call_user_func_array可以调用回调函数，并把一个数组参数作为回调函数的参数

<div class="cnblogs_code">
<pre>mixed call_user_func_array ( callable $callback , array $param_arr )</pre>
</div>

　　把第一个参数作为回调函数（callback）调用，把参数数组作（param_arr）为回调函数的的参数传入

<div class="cnblogs_code">
<pre>function demo($num,$n){
    for($i=0;$i&lt;$num;$i++){
        if(call_user_func_array($n,array($i))){
            echo $i.'&lt;br&gt;';
        }
    }
}
function test($i){
    if($i%5){
        return true;
    }
}
demo(20,'test');</pre>
</div>

　　实现回调函数时，通常要使用call_user_func_array()函数，而不是变量函数，因为变量函数无法传递对象中的方法或和类中的静态方法

<div class="cnblogs_code">
<pre>function demo($num, $n) {
    for($i=0; $i&lt;$num; $i++) {
        if(call_user_func_array($n, array($i))){
            echo $i."&lt;br&gt;";
        }    
    }
}
class Filter {
    function one($i) {
        if($i%3==0) {
            return true;
        }
    }
    static function two($i) {
        if(preg_match('/3/', $i)) {
            return true;
        }
    }

}
demo(500, array(new Filter(), "one"));
demo(500, array("Filter", "two"));</pre>
</div>

&nbsp;

### 递归函数

　　在函数中调用自己就是递归函数

<div class="cnblogs_code">
<pre>&lt;?php
    function test( $n ) {            
        echo $n; 
        if($n&gt;0){
            test($n-1);                   
        }   
        echo $n; 
    }
    test(5);//543210012345
?&gt;</pre>
</div>

&nbsp;

### 加载函数库

　　使用include()函数来引入外部文件

<div class="cnblogs_code">
<pre>test.php
function one(){
    echo '111';
}
&lt;?php
include ('test.php');
one();//111
?&gt;</pre>
</div>

　　但如果不慎引入多次，使得函数重定义，变量重新赋值，会造成错误

<div class="cnblogs_code">
<pre>test.php
function one(){
    echo '111';
}

&lt;?php
include ('test.php');
include ('test.php');
one();//111
?&gt;</pre>
</div>

　　此时，需要使用include_once()函数，来保证相同的文件只被引入一次

<div class="cnblogs_code">
<pre>test.php
function one(){
    echo '111';
}

&lt;?php
include_once('test.php');
include_once('test.php');
one();//111
?&gt;</pre>
</div>

**require()**

　　引入外部文件，还可以使用require()。include( )与require( )几乎等价，区别在于当处理失败时，include( )产生一个警告而require( )则导致一个致命错误

　　[注意]require_once()与include()_once也类似

&nbsp;

### 匿名函数

　　匿名函数（Anonymous functions），也叫闭包函数（closures），允许临时创建一个没有指定名称的函数。最经常用作回调函数（callback）参数的值

　　其实，php的匿名函数类似于javascript中的函数表达式

　　[注意]匿名函数结尾一定要加分号，否则会报错

<div class="cnblogs_code">
<pre>&lt;?php
$greet = function($name)
{
    printf("Hello %s\r\n", $name);
};

$greet('World');
$greet('PHP');
?&gt;</pre>
</div>

**闭包**

　　PHP闭包实现主要就是靠匿名函数

　　将匿名函数在普通函数中当做参数传入，也可以被返回。这就实现了一个简单的闭包。

　　闭包的两个特点：

　　1、作为一个函数变量的一个引用 - 当函数返回时，其处于激活状态。

　　2、一个闭包就是当一个函数返回时，一个没有释放资源的栈区。

　　其实上面两点可以合成一点，就是闭包函数返回时，该函数内部变量处于激活状态，函数所在栈区依然保留

　　闭包可以从父作用域中继承变量。 任何此类变量都应该用 use 语言结构传递进去

<div class="cnblogs_code">
<pre>$message = 'hello';

$example = function () use ($message) {
    var_dump($message);
};
echo $example();//string 'hello' (length=5)</pre>
</div>
