# 前端学PHP之面向对象系列第五篇——对象操作

&emsp;&emsp;本文主要介绍面向对象中的一些对象操作

&nbsp;

### 对象克隆

&emsp;&emsp;对象复制，又叫对象克隆，可以通过 clone 关键字来完成

&emsp;&emsp;在多数情况下，我们并不需要完全复制一个对象来获得其中属性。但有一个情况下确实需要：如果你有一个窗口对象，该对象持有窗口相关的资源。你可能会想复制一个新的窗口，保持所有属性与原来的窗口相同，但必须是一个新的对象（因为如果不是新的对象，那么一个窗口中的改变就会影响到另一个窗口）。还有一种情况：如果对象 A 中保存着对象 B 的引用，当你复制对象A时，你想其中使用的对象不再是对象 B 而是 B 的一个副本，那么你必须得到对象 A 的一个副本

<div>
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
        function say(){
            echo "我的名字：" .$this-&gt;name."，性别：".$this-&gt;sex."，年龄：".$this-&gt;age."&lt;br&gt;";
        }
    }
    $p1 = new Person('张三','男','20');
    $p2 = clone $p1;
    $p1-&gt;say();//我的名字：张三，性别：男，年龄：20
    $p2-&gt;say();//我的名字：张三，性别：男，年龄：20
?&gt;</pre>
</div>

&nbsp;

### 对象比较

&emsp;&emsp;当使用比较运算符（==）比较两个对象变量时，比较的原则是：如果两个对象的属性和属性值都相等，而且两个对象是同一个类的实例，那么这两个对象变量相等

&emsp;&emsp;而如果使用全等运算符（===），这两个对象变量一定要指向某个类的同一个实例（即同一个对象）

<div>
<pre>&lt;?php
function bool2str($bool)
{
    if ($bool === false) {
        return 'FALSE';
    } else {
        return 'TRUE';
    }
}
function compareObjects(&amp;$o1, &amp;$o2)
{
    echo 'o1 == o2 : ' . bool2str($o1 == $o2) . "\n";
    echo 'o1 != o2 : ' . bool2str($o1 != $o2) . "\n";
    echo 'o1 === o2 : ' . bool2str($o1 === $o2) . "\n";
    echo 'o1 !== o2 : ' . bool2str($o1 !== $o2) . "\n";
}
class Flag
{
    public $flag;
    function Flag($flag = true) {
        $this-&gt;flag = $flag;
    }
}
class OtherFlag
{
    public $flag;
    function OtherFlag($flag = true) {
        $this-&gt;flag = $flag;
    }
}
$o = new Flag();
$p = new Flag();
$q = $o;
$r = new OtherFlag();
/*
Two instances of the same class
o1 == o2 : TRUE
o1 != o2 : FALSE
o1 === o2 : FALSE
o1 !== o2 : TRUE
 */
echo "Two instances of the same class\n";
compareObjects($o, $p);
/*
Two references to the same instance
o1 == o2 : TRUE
o1 != o2 : FALSE
o1 === o2 : TRUE
o1 !== o2 : FALSE
 */
echo "\nTwo references to the same instance\n";
compareObjects($o, $q);
/*
Instances of two different classes
o1 == o2 : FALSE
o1 != o2 : TRUE
o1 === o2 : FALSE
o1 !== o2 : TRUE
 */
echo "\nInstances of two different classes\n";
compareObjects($o, $r);
?&gt;</pre>
</div>

&nbsp;

### 对象串行化

&emsp;&emsp;对象是一种在内存中存储的数据类型，它的寿命通常随着生成该对象的程序终止而终止。有时候可能需要将对象的状态保存下来，需要时再将对象恢复。对象通过写出描述自己状态的数值来记录自己，这个过程称对象的串行化（Serialization）。以下两种情况需要将对象串行化：1、对象需要在网络中传输时，将对象串行化成二进制串即可；2、对象需要持久保存时，将对象串行化后写入文件或数据库

**serialize()**

&emsp;&emsp;serialize() -- 串行化，返回一个包含字节流的字符串

**unserialize()**

&emsp;&emsp;unserialize() -- 反串行化，能够重新把字符串变回php原来的对象值

&emsp;&emsp;串行化一个对象将会保存对象的所有属性变量和类名信息，但是不会保存对象的方法

<div>
<pre>&lt;?php
// classa.inc:
  class A {
      public $one = 1;
      public function show_one() {
          echo $this-&gt;one;
      }
  }
// page1.php:
  include("classa.inc");
  $a = new A;
  $s = serialize($a);
  // 把变量$s保存起来以便文件page2.php能够读到
  file_put_contents('store', $s);
// page2.php:
  include("classa.inc");
  $s = file_get_contents('store');
  $a = unserialize($s);
  // 现在可以使用对象$a里面的函数 show_one()
  $a-&gt;show_one();
?&gt;</pre>
</div>

&nbsp;

### json

**json_encode**

<div>
<pre>string json_encode ( mixed $value [, int $options = 0 [, int $depth = 512 ]] )</pre>
</div>

&emsp;&emsp;json_encode()方法对变量进行 JSON 编码

<div>
<pre>&lt;?php
$arr = array ('a'=&gt;1,'b'=&gt;2,'c'=&gt;3,'d'=&gt;4,'e'=&gt;5);
echo json_encode($arr);//{"a":1,"b":2,"c":3,"d":4,"e":5}
?&gt;</pre>
</div>

**json_decode**

<div>
<pre>mixed json_decode ( string $json [, bool $assoc = false [, int $depth = 512 [, int $options = 0 ]]] )</pre>
</div>

&emsp;&emsp;json_decode()方法对 JSON 格式的字符串进行解码，接受一个 JSON 编码的字符串并且把它转换为 PHP 变量，当assoc参数为 TRUE 时，将返回 array 而非 object

<div>
<pre>&lt;?php
$json = '{"a":1,"b":2,"c":3,"d":4,"e":5}';
/*
object(stdClass)#1 (5) {
    ["a"] =&gt; int(1)
    ["b"] =&gt; int(2)
    ["c"] =&gt; int(3)
    ["d"] =&gt; int(4)
    ["e"] =&gt; int(5)
}
 */
var_dump(json_decode($json));
/*
array(5) {
    ["a"] =&gt; int(1)
    ["b"] =&gt; int(2)
    ["c"] =&gt; int(3)
    ["d"] =&gt; int(4)
    ["e"] =&gt; int(5)
}
 */
var_dump(json_decode($json, true));
?&gt;</pre>
</div>