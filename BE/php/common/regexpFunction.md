# 前端学PHP之正则表达式函数

&emsp;&emsp;正则表达式不能独立使用，它只是一种用来定义字符串的规则模式，必须在相应的正则表达式函数中应用，才能实现对字符串的匹配、查找、替换及分割等操作。前面介绍了正则表达式的[基础语法](http://www.cnblogs.com/xiaohuochai/p/6081666.html)，本文将详细介绍正则表达式函数

&nbsp;

### 匹配与查找

【preg_match()】

&emsp;&emsp;preg_match()函数用来执行一个正则表达式匹配，搜索subject与pattern给定的正则表达式的一个匹配。返回pattern的匹配次数。它的值将是0次（不匹配）或1次，因为preg_match()在第一次匹配后将会停止搜索。preg_match_all()不同于此，它会一直搜索subject直到到达结尾。如果发生错误preg_match()返回FALSE

<div>
<pre>int preg_match ( string $pattern , string $subject [, array &amp;$matches [, int $flags = 0 [, int $offset = 0 ]]] )</pre>
</div>

&emsp;&emsp;pattern表示要搜索的模式，字符串类型

&emsp;&emsp;subject表示输入字符串

&emsp;&emsp;如果提供了参数matches，它将被填充为搜索结果。$matches[0]将包含完整模式匹配到的文本， $matches[1] 将包含第一个捕获子组匹配到的文本，以此类推

&emsp;&emsp;flags可以被设置为以下标记：1、PREG_OFFSET_CAPTURE。如果传递了这个标记，对于每一个出现的匹配返回时会附加字符串偏移量(相对于目标字符串的)。注意：这会改变填充到matches参数的数组，使其每个元素成为一个由第0个元素是匹配到的字符串，第1个元素是该匹配字符串在目标字符串subject中的偏移量；2、offset。通常，搜索从目标字符串的开始位置开始。可选参数offset用于指定从目标字符串的某个未知开始搜索(单位是字节)

<div>
<pre>&lt;?php
//从URL中获取主机名称
preg_match('@^(?:http://)?([^/]+)@i',
    "http://www.php.net/index.html", $matches);
$host = $matches[1];
//获取主机名称的后面两部分
preg_match('/[^.]+\.[^.]+$/', $host, $matches);
//domain name is: php.net
echo "domain name is: {$matches[0]}\n";
?&gt;</pre>
</div>
<div>
<pre>&lt;?php 
$pattern = '/www\.[^\.\/]+\.com/i';
$subject = 'www.baidu.com,www.qq.com,www.cnblogs.com';
preg_match($pattern,$subject,$matches);
/*
array (size=1)
  0 =&gt; string 'www.baidu.com' (length=13)
 */
var_dump($matches);
?&gt;</pre>
</div>

【preg_match_all()】

&emsp;&emsp;preg_match_all()与preg_match()类似，不同的是preg_match()在第一次匹配之后就会停止搜索，而函数preg_match_all()则会一直搜索到指定字符串的结尾，可以获取到所有匹配到的结果

<div>
<pre>int preg_match_all ( string $pattern , string $subject [, array &amp;$matches [, int $flags = PREG_PATTERN_ORDER [, int $offset = 0 ]]] )</pre>
</div>
<div>
<pre>&lt;?php 
$pattern = '/www\.[^\.\/]+\.com/i';
$subject = 'www.baidu.com,www.qq.com,www.cnblogs.com';
preg_match_all($pattern,$subject,$matches);
/*
array (size=1)
  0 =&gt; 
    array (size=3)
      0 =&gt; string 'www.baidu.com' (length=13)
      1 =&gt; string 'www.qq.com' (length=10)
      2 =&gt; string 'www.cnblogs.com' (length=15)
 */
var_dump($matches);
?&gt;</pre>
</div>

【preg_grep()】

&emsp;&emsp;preg_grep()返回给定数组input中与模式pattern 匹配的元素组成的数组

<div>
<pre>array preg_grep ( string $pattern , array $input [, int $flags = 0 ] )</pre>
</div>

&emsp;&emsp;如果flags设置为PREG_GREP_INVERT，这个函数返回输入数组中与 给定模式pattern不匹配的元素组成的数组

<div>
<pre>&lt;?php 
$pattern = '/www\.[^\.\/]+\.com/i';
$subject = ['baidu.com','www.qq.com','www.cnblogs.com'];
var_dump (preg_grep($pattern,$subject));
/*
array (size=2)
  1 =&gt; string 'www.qq.com' (length=10)
  2 =&gt; string 'www.cnblogs.com' (length=15)
 */
?&gt;</pre>
</div>

&nbsp;

### 替换

【preg_replace()】

&emsp;&emsp;preg_replace()执行一个正则表达式的搜索替换，搜索subject匹配pattern的部分，以replacement进行替换

<div>
<pre>mixed preg_replace ( mixed $pattern , mixed $replacement , mixed $subject [, int $limit = -1 [, int &amp;$count ]] )</pre>
</div>

&emsp;&emsp;replacement表示用于替换的字符串或字符串数组。如果这个参数是一个字符串，并且pattern是一个数组，那么所有的模式都使用这个字符串进行替换。如果pattern和replacement都是数组，每个pattern使用replacement中对应的元素进行替换。如果replacement中的元素比pattern中的少，多出来的pattern使用空字符串进行替换

<div>
<pre>&lt;?php
$string = 'April 15, 2016';
$pattern = '/(\w+) (\d+), (\d+)/i';
$replacement = '${1}1,$3';
//April1,2016
echo preg_replace($pattern, $replacement, $string);
?&gt;</pre>
</div>
<div>
<pre>&lt;?php
$string = 'The quick brown fox jumped over the lazy dog.';
$patterns = array();
$patterns[0] = '/quick/';
$patterns[1] = '/brown/';
$patterns[2] = '/fox/';
$replacements = array();
$replacements[2] = 'bear';
$replacements[1] = 'black';
$replacements[0] = 'slow';
//The bear black slow jumped over the lazy dog.
echo preg_replace($patterns, $replacements, $string);
?&gt;</pre>
</div>

【preg_replace_callback()】

&emsp;&emsp;preg_replace_callback()执行一个正则表达式搜索并且使用一个回调进行替换

<div>
<pre>mixed preg_replace_callback ( mixed $pattern , callable $callback , mixed $subject [, int $limit = -1 [, int &amp;$count ]] )</pre>
</div>
<div>
<pre>&lt;?php
// 将文本中的年份增加一年.
$text = "April fools day is 04/01/2002\n";
$text.= "Last christmas was 12/24/2001\n";
// 回调函数
function next_year($matches)
{
  // 通常: $matches[0]是完成的匹配
  // $matches[1]是第一个捕获子组的匹配
  // 以此类推
  return $matches[1].($matches[2]+1);
}
/*
April fools day is 04/01/2003
Last christmas was 12/24/2002
 */
echo preg_replace_callback(
            "|(\d{2}/\d{2}/)(\d{4})|",
            "next_year",
            $text);

?&gt;</pre>
</div>

【preg_filter()】

&emsp;&emsp;preg_filter() 执行一个正则表达式搜索和替换，等价于preg_replace()除了它仅仅返回(可能经过转化)与目标匹配的结果

<div>
<pre>mixed preg_filter ( mixed $pattern , mixed $replacement , mixed $subject [, int $limit = -1 [, int &amp;$count ]] )</pre>
</div>
<div>
<pre>&lt;?php
$subject = array('1', 'a', '2', 'b', '3', 'A', 'B', '4'); 
$pattern = array('/\d/', '/[a-z]/', '/[1a]/'); 
$replace = array('A:$0', 'B:$0', 'C:$0'); 
/*
Array
(
    [0] =&gt; A:C:1
    [1] =&gt; B:C:a
    [2] =&gt; A:2
    [3] =&gt; B:b
    [4] =&gt; A:3
    [7] =&gt; A:4
)
 */
print_r(preg_filter($pattern, $replace, $subject)); 

/*
Array
(
    [0] =&gt; A:C:1
    [1] =&gt; B:C:a
    [2] =&gt; A:2
    [3] =&gt; B:b
    [4] =&gt; A:3
    [5] =&gt; A
    [6] =&gt; B
    [7] =&gt; A:4
)
 */
print_r(preg_replace($pattern, $replace, $subject)); 
?&gt;</pre>
</div>

&nbsp;

### 分割

【preg_split()】

&emsp;&emsp;preg_split()通过一个正则表达式分隔字符串

<div>
<pre>array preg_split ( string $pattern , string $subject [, int $limit = -1 [, int $flags = 0 ]] )</pre>
</div>

&emsp;&emsp;如果指定limit，将限制分隔得到的子串最多只有limit个，返回的最后一个子串将包含所有剩余部分。limit值为-1，0或null时都代表"不限制"；可以使用null跳过对flags的设置

&emsp;&emsp;flags可以是任何下面标记的组合(以位或运算 | 组合)：PREG_SPLIT_NO_EMPTY&mdash;&mdash;如果这个标记被设置，preg_split()将进返回分隔后的非空部分；PREG_SPLIT_DELIM_CAPTURE&mdash;&mdash;如果这个标记设置了，用于分隔的模式中的括号表达式将被捕获并返回；PREG_SPLIT_OFFSET_CAPTURE&mdash;&mdash;如果这个标记被设置，对于每一个出现的匹配返回时将会附加字符串偏移量。注意：这将会改变返回数组中的每一个元素，使其每个元素成为一个由第0个元素为分隔后的子串，第1个元素为该子串在subject中的偏移量组成的数组

<div>
<pre>&lt;?php
//使用逗号或空格(包含" ", \r, \t, \n, \f)分隔短语
$keywords = preg_split("/[\s,]+/", "hypertext language, programming");
/*
Array
(
    [0] =&gt; hypertext
    [1] =&gt; language
    [2] =&gt; programming
)
 */
print_r($keywords);
?&gt;</pre>
</div>

&nbsp;

### 转义

【preg_quote()】

&emsp;&emsp;preg_quote()转义正则表达式字符

<div>
<pre>string preg_quote ( string $str [, string $delimiter = NULL ] )</pre>
</div>

&emsp;&emsp;正则表达式特殊字符有： . \ + * ? [ ^ ] $ ( ) { } = ! &lt; &gt; | : -

<div>
<pre>&lt;?php
$keywords = '$40 for a g3/400';
$keywords = preg_quote($keywords, '/');
echo $keywords; // 返回 \$40 for a g3\/400
?&gt;</pre>
</div>
