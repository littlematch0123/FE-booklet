# 前端学PHP之字符串函数

&emsp;&emsp;字符串的处理和分析在任何编程语言中都是一个重要的基础，往往是简单而重要的。信息的分类、解析、存储和显示，以及网络中的数据都需要操作字符串来完成。尤其在web开发中更为重要，程序员大部分工作都是在操作字符串，本文将详细介绍php中的字符串函数

&emsp;&emsp;注意：关于javascript中字符串的属性和方法[移步至此](http://www.cnblogs.com/xiaohuochai/p/5612962.html)

&nbsp;

### 特点

&emsp;&emsp;因为php是弱类型语言，所以其他类型的数据一般都可以直接应用于字符串操作函数中，而自己转换成字符串类型进行处理

<div>
<pre>echo substr( "1234567", 2, 4 );  //将字串用函数substr()处理，输出子字符串 345
echo substr( 123456, 2, 4 );     //将整型用字串函数处理，输出同样是字符串 345
echo hello;           //先找hello常量，找不到就会将常名看作是字符串使用</pre>
</div>

&emsp;&emsp;字符串貌似数组，可以使用中括号语法，但由于无法与真正的数组进行区别，带来二义性，所以最好使用功能相同的花括号

<div>
<pre>$str = "lamp";       
echo $str."&lt;br&gt;";       
echo $str{0};//输出字符串$str中第一个字符l
echo $str[1];//输出字符串$str中第二个字符a，[]也可以，不过已过时</pre>
</div>

&emsp;&emsp;在处理变量解析时，如果在字符串中遇到美元符号，解析器会尽可能多地取得后面的字符以组成一个合法的变量名，如果想明确指定名字的结束，用花括号把变量名括起来

<div>
<pre>    $lamp = array('os'=&gt;'Linux');
    //可以解析
    echo "A OS is $lamp[os].";
    //不能解析，如果在对关联数组下标使用引号就必须使用花括号，否则将出错
    echo "A OS is $lamp['os'].";
    //可以解析，如果在对关联数组下标使用引号就必须使用花括号，否则将出错
    echo "A OS is {$lamp['os']}.";
    //可以解析，注意PHP将数组下标看作常量名，常量不存在时将常量名称转为字符串，效率低
    echo "A OS is {$lamp[os]}.";</pre>
</div>

&emsp;&emsp;注意：在php中，一个GB2312编码的汉字占2个字节，一个UTF-8编码的汉字占3个字节

&nbsp;

### 输出

**echo()**

<div>
<pre>void echo ( string $arg1 [, string $... ] )</pre>
</div>

&emsp;&emsp;echo()函数用来输出一个或多个字符串，它会输出所有参数，且不会换行，没有返回值

&emsp;&emsp;echo不是一个函数， 因此不一定要使用小括号来指明参数，单引号，双引号都可以。另外，如果想给echo 传递多个参数，就不能使用小括号

<div>
<pre>&lt;?php
echo "Hello World";
$foo = "foobar";
echo "foo is $foo"; // foo is foobar
echo $foo;          // foobar
?&gt;</pre>
</div>

**print()**

<div>
<pre>int print ( string $arg )</pre>
</div>

&emsp;&emsp;print()函数用来输出字符串，且总是返回 1

<div>
<pre>&lt;?php
print("Hello World");
$foo = "foobar";
print "foo is $foo"; // foo is foobar
print $foo;          // foobar
?&gt;</pre>
</div>
<div>
<pre>var_dump(echo('123'));//报错
var_dump(print('123'));//int 1</pre>
</div>

&emsp;&emsp;echo可以接受多个参数(不可以加括号)，而print不可以

<div>
<pre>&lt;?php
echo '1','2','3';//123
print 'a','b','c';//报错
?&gt;</pre>
</div>

**exit()**

&emsp;&emsp;exit()函数用来输出一个消息并且退出当前脚本，没有返回值，同名函数为die()

<div>
<pre>void exit ([ string $status ] )
void exit ( int $status )</pre>
</div>

&emsp;&emsp;如果 status 是一个字符串，在退出之前该函数会打印status；如果 status 是一个 integer，该值会作为退出状态码，并且不会被打印输出。退出状态码应该在范围0至254，不应使用被PHP保留的退出状态码255。 状态码0用于成功中止程序

<div>
<pre>&lt;?php
exit('0');//0
exit(0);//无返回值
?&gt;</pre>
</div>

**printf**

&emsp;&emsp;printf()函数用于输出格式化字符串

<div>
<pre>int printf ( string $format [, mixed $args [, mixed $... ]] )</pre>
</div>

**sprintf**

&emsp;&emsp;sprintf()函数用于把格式化的字符串写入一个变量中

<div>
<pre>string sprintf ( string $format [, mixed $args [, mixed $... ]] )</pre>
</div>

&emsp;&emsp;字符串转换格式如下

<div>
<pre>%%    返回百分比符号
%b    二进制数
%c    依照ASCII值的字符
%d    带符号十进制数
%e    科学计数法（如1.5e3）
%u    无符号十进制数
%f或%F     浮点数
%o        八进制数
%s        字符串
%x或%X    十六进制数</pre>
</div>
<div>
<pre>&lt;?php
$var = 10;
printf("%%,%b,%c,%d,%e,%u,%o,%f,%s,%x",$var,$var,$var,$var,$var,$var,$var,$var,$var,$var);//%,1010, ,10,1.000000e+1,10,12,10.000000,10,a
$result = sprintf("%%,%b,%c,%d,%e,%u,%o,%f,%s,%x",$var,$var,$var,$var,$var,$var,$var,$var,$var,$var);
var_dump($result);//string '%,1010, ,10,1.000000e+1,10,12,10.000000,10,a' (length=44)
?&gt;</pre>
</div>

&emsp;&emsp;上面的两个函数不仅可以设置转换类型，还可以设置精确度、填充符和对齐方式

<div>
<pre>%15&emsp;&emsp; 将结果填充到15位
%.2&emsp;&emsp; 将结果保留小数点后两位
%#&emsp;&emsp;  在结果前面填充#号
%-&emsp;&emsp;　左对齐</pre>
</div>
<div>
<pre>printf("%'#10.3f",123);//###123.000
printf("%10.3f",123);// 123.000(右对齐)
printf("%-10.3f",123);//123.000   (左对齐)</pre>
</div>

&nbsp;

### 空格

**trim()**

&emsp;&emsp;trim()函数用于去除字符串首尾处的空白字符（或者其他字符），过滤后的字符串

<div>
<pre>string trim ( string $str [, string $charlist = " \t\n\r\0\x0B" ] )</pre>
</div>

&emsp;&emsp;此函数返回字符串str去除首尾空白字符后的结果。如果不指定第二个参数，trim() 将去除这些字符：

<div>
<pre>" " (ASCII 32 (0x20))，普通空格符
"\t" (ASCII 9 (0x09))，制表符
"\n" (ASCII 10 (0x0A))，换行符
"\r" (ASCII 13 (0x0D))，回车符
"\0" (ASCII 0 (0x00))，空字节符
"\x0B" (ASCII 11 (0x0B))，垂直制表符</pre>
</div>

&emsp;&emsp;charlist为可选参数，过滤字符也可由charlist参数指定。一般要列出所有希望过滤的字符，也可以使用 &ldquo;..&rdquo; 列出一个字符范围

**ltrim()**

&emsp;&emsp;ltrim函数用于删除字符串开头的空白字符（或其他字符）

**rtrim()**

&emsp;&emsp;rtrim函数用于删除字符串末端的空白字符（或者其他字符）　

<div>
<pre>&lt;?php
$text  = "   \t\tHello World a1a1a1    ";
$trimmed = trim($text);
var_dump($trimmed);//string 'Hello World a1a1a1' (length=18)
$trimmed = trim($text, "a1 ");
var_dump($trimmed);//string '        Hello World' (length=13)
$trimmed = trim($text, "1..e ");//string '        Hello Worl' (length=12)
var_dump($trimmed);
$ltrimmed = ltrim($text);
var_dump($ltrimmed);//string 'Hello World a1a1a1    ' (length=22)
$rtrimmed = rtrim($text);
var_dump($rtrimmed);//string '           Hello World a1a1a1' (length=23)
?&gt;</pre>
</div>

**str_pad()**

&emsp;&emsp;str_pad()函数使用另一个字符串填充字符串为指定长度

<div>
<pre>string str_pad ( string $input , int $pad_length [, string $pad_string = " " [, int $pad_type = STR_PAD_RIGHT ]] )</pre>
</div>

&emsp;&emsp;该函数返回input被从左端、右端或者同时两端被填充到制定长度后的结果。如果可选的 pad_string 参数没有被指定，input 将被空格字符填充，否则它将被 pad_string 填充到指定长度

&emsp;&emsp;注意：如果pad_length的值是负数，小于或者等于输入字符串的长度，不会发生任何填充

<div>
<pre>&lt;?php
$input = "Alien";
echo str_pad($input, 10); // 输出 "Alien     "
echo str_pad($input, 10, "-=", STR_PAD_LEFT); // 输出 "-=-=-Alien"
echo str_pad($input, 10, "_", STR_PAD_BOTH); // 输出 "__Alien___"
echo str_pad($input, 6 , "___");// 输出 "Alien_"
?&gt;</pre>
</div>

&nbsp;

### 大小写

**strtolower()**

&emsp;&emsp;strtolower &mdash; 将字符串转化为小写

**strtoupper()**

&emsp;&emsp;strtoupper &mdash; 将字符串转化为大写

**ucfirst()**

&emsp;&emsp;ucfirst &mdash; 将字符串的首字母转换为大写

**ucwords()**

&emsp;&emsp;ucwords &mdash; 将字符串中每个单词的首字母转换为大写

<div>
<pre>&lt;?php
$foo = 'hello world!';
var_dump(ucwords($foo));//string 'Hello World!' (length=12)
var_dump(ucfirst($foo));//string 'Hello world!' (length=12)
var_dump(strtoupper($foo));//string 'HELLO WORLD!' (length=12)
var_dump(strtolower($foo));//string 'hello world!' (length=12)
?&gt;</pre>
</div>

&nbsp;

### HTML

**nl2br()**

&emsp;&emsp;nl2br &mdash; 在字符串所有新行之前插入 HTML 换行标记

<div>
<pre>string nl2br ( string $string [, bool $is_xhtml = true ] )</pre>
</div>
<div>
<pre>&lt;?php
/*
foo isn't&lt;br /&gt;
 bar
 */
echo nl2br("foo isn't\n bar");
?&gt;</pre>
</div>

**htmlspecialchars()**

<div>
<pre>string htmlspecialchars ( string $string [, int $flags = ENT_COMPAT | ENT_HTML401 [, string $encoding = ini_get("default_charset") [, bool $double_encode = true ]]] )</pre>
</div>

&emsp;&emsp;htmlspecialchars - 把指定特殊符号转换成实体

<div>
<pre>&amp; (ampersand)            &amp;amp;
" (double quote)        &amp;quot;, unless ENT_NOQUOTES is set
' (single quote)        &amp;#039; or &amp;apos;
&lt; (less than)            &amp;lt;
&gt; (greater than)        &amp;gt;</pre>
</div>
<div>
<pre>&lt;?php
$new ="&lt;script&gt;alert(1)&lt;/script&gt;";
echo $new;//弹出1
$new = htmlspecialchars("&lt;script&gt;alert(1)&lt;/script&gt;");
echo $new; //显示字符串"&lt;script&gt;alert(1)&lt;/script&gt;"
?&gt;</pre>
</div>
<div>
<pre>&lt;?php
    $str = "&lt;B&gt;WebServer:&lt;/B&gt; &amp; 'Linux' &amp; 'Apache'";//常有HTML标记和单引号的字符串
    echo htmlspecialchars($str, ENT_COMPAT);//转换HTML标记和转换双引号
    echo "&lt;br&gt;\n";
    echo htmlspecialchars($str, ENT_QUOTES);//转换HTML标记和转换两种引号
    echo "&lt;br&gt;\n";
    echo htmlspecialchars($str, ENT_NOQUOTES);//转换HTML标记和不对引号转换
?&gt;</pre>
</div>

**htmlentities()**

<div>
<pre>string htmlentities ( string $string [, int $flags = ENT_COMPAT | ENT_HTML401 [, string $encoding = ini_get("default_charset") [, bool $double_encode = true ]]] )</pre>
</div>

&emsp;&emsp;htmlentities - 将所有的非ASCII码转换成对应实体代码

&emsp;&emsp;htmlentities()和htmlspecialchars()的功能都是转换字符为HTML字符编码，特别是url和代码字符串，防止字符标记被浏览器执行。htmlentities转换所有的html标记，htmlspecialchars只格式化&amp; ' " &lt; 和 &gt; 这几个特殊符号

<div>
<pre>&lt;?php
$str = "&lt;p&gt;123&lt;/p&gt;";
echo $str;//显示段落123
echo htmlentities($str);//'123'
echo htmlspecialchars($str);//'123'
?&gt;</pre>
</div>

**strip_tags()**

&emsp;&emsp;strip_tags &mdash; 尝试返回给定的字符串 str 去除空字符、HTML 和 PHP 标记后的结果

<div>
<pre>string strip_tags ( string $str [, string $allowable_tags ] )</pre>
</div>

&emsp;&emsp;使用可选的第二个参数allowable_tags指定不被去除的字符列表

<div>
<pre>&lt;?php
$text = '&lt;p&gt;Test paragraph.&lt;/p&gt;&lt;!-- Comment --&gt; &lt;a href="#fragment"&gt;Other text&lt;/a&gt;';
echo strip_tags($text);//'Test paragraph. Other text'
echo "\n";
echo strip_tags($text, '&lt;p&gt;').'&lt;br&gt;';//&lt;p&gt;Test paragraph.&lt;/p&gt; Other text
$text = '&lt;div&gt;&lt;b&gt;123&lt;/b&gt;&lt;/div&gt;';
echo strip_tags($text);//'123'
?&gt;</pre>
</div>

**addslashes()**

&emsp;&emsp;addslashes &mdash; 使用反斜线引用字符串，返回字符串，该字符串为了数据库查询语句等的需要在某些字符前加上了反斜线。这些字符是单引号（'）、双引号（"）、反斜线（\）与 NUL（NULL 字符）

<div>
<pre>string addslashes ( string $str )</pre>
</div>
<div>
<pre>&lt;?php
$str = "Is your name O'reilly?";
echo addslashes($str);// "Is your name O\'reilly?"
?&gt;</pre>
</div>

**stripslashes()**

&emsp;&emsp;stripslashes &mdash; 反引用一个引用字符串

<div>
<pre>string stripslashes ( string $str )</pre>
</div>
<div>
<pre>&lt;?php
$str = "Is your name O\'reilly?";
echo stripslashes($str);//"Is your name O'reilly?"
?&gt;</pre>
</div>

&nbsp;

### 格式化

**strrev()**

&emsp;&emsp;strrev &mdash; 反转字符串

<div>
<pre>string strrev ( string $string )</pre>
</div>
<div>
<pre>&lt;?php
echo strrev("Hello world!"); // 输出 "!dlrow olleH"
?&gt;</pre>
</div>

**strlen()**

&emsp;&emsp;strlen &mdash; 获取字符串长度

<div>
<pre>int strlen ( string $string )</pre>
</div>
<div>
<pre>&lt;?php
$str = 'abcdef';
echo strlen($str); // 6
$str = ' ab cd ';
echo strlen($str); // 7
?&gt;</pre>
</div>

**md5()**

&emsp;&emsp;md5 &mdash; 计算字符串的 MD5 散列值

<div>
<pre>string md5 ( string $str [, bool $raw_output = false ] )</pre>
</div>

&emsp;&emsp;如果可选的raw_output被设置为TRUE，那么MD5报文摘要将以16字节长度的原始二进制格式返回

<div>
<pre>&lt;?php
$str = 'apple';
if (md5($str) === '1f3870be274f6c49b3e31a0c6728957f') {
    echo "Would you like a green or red apple?";
}
?&gt;</pre>
</div>

&nbsp;

### 比较

**strcmp()**

&emsp;&emsp;strcmp &mdash; 字符串比较，如果 str1 小于 str2 返回 &lt; 0； 如果 str1 大于 str2 返回 &gt; 0；如果两者相等，返回 0

<div>
<pre>int strcmp ( string $str1 , string $str2 )</pre>
</div>
<div>
<pre>&lt;?php
$var1 = "Hello";
$var2 = "hello";
if (strcmp($var1, $var2) !== 0) {
    echo '$var1 is not equal to $var2 in a case sensitive string comparison';
}
?&gt;</pre>
</div>

**strncmp()**

&emsp;&emsp;strncmp &mdash; 限定字符串长度的字符串比较

<div>
<pre>int strncmp ( string $str1 , string $str2 , int $len )</pre>
</div>

&emsp;&emsp;如果 str1 小于 str2 返回 &lt; 0； 如果 str1 大于 str2 返回 &gt; 0；如果两者相等，返回 0

<div>
<pre>&lt;?php 
echo strncmp("xybc","a3234",0); // 0 
echo strncmp("xybc","a3234",1); // 1 
?&gt;</pre>
</div>

**strcasecmp()**

&emsp;&emsp;strcasecmp &mdash; 字符串比较（不区分大小写），如果 str1 小于 str2 返回 &lt; 0； 如果 str1 大于 str2 返回 &gt; 0；如果两者相等，返回 0

<div>
<pre>int strcasecmp ( string $str1 , string $str2 )</pre>
</div>
<div>
<pre>&lt;?php
$var1 = "Hello";
$var2 = "hello";
if (strcasecmp($var1, $var2) == 0) {
    echo '$var1 is equal to $var2 in a case-insensitive string comparison';
}
?&gt;</pre>
</div>

**strnatcmp()**

&emsp;&emsp;strnatcmp &mdash; 使用自然排序算法比较字符串

<div>
<pre>int strnatcmp ( string $str1 , string $str2 )</pre>
</div>

&emsp;&emsp;如果 str1 小于 str2 返回 &lt; 0； 如果 str1 大于 str2 返回 &gt; 0；如果两者相等，返回 0

<div>
<pre>&lt;?php
$arr1 = $arr2 = array("img12.png", "img10.png", "img2.png", "img1.png");
usort($arr1, "strcmp");
print_r($arr1);//Array ( [0] =&gt; img1.png [1] =&gt; img10.png [2] =&gt; img12.png [3] =&gt; img2.png )
usort($arr2, "strnatcmp");//Array ( [0] =&gt; img1.png [1] =&gt; img2.png [2] =&gt; img10.png [3] =&gt; img12.png )
print_r($arr2);
?&gt;</pre>
</div>

&nbsp;

### 位置

**strstr()**

&emsp;&emsp;strstr()查找字符串的首次出现，返回haystack字符串从needle第一次出现的位置开始到haystack结尾的字符串

<div>
<pre>string strstr ( string $haystack , mixed $needle [, bool $before_needle = false ] )</pre>
</div>

&emsp;&emsp;before_needle若为TRUE，strstr()将返回needle在haystack中的位置之前的部分

<div>
<pre>&lt;?php
$email  = 'name@example.com';
$domain = strstr($email, '@');
echo $domain; // @example.com
$user = strstr($email, '@', true); 
echo $user; //name
?&gt;</pre>
</div>

**strpos()**

&emsp;&emsp;strpos()查找字符串首次出现的位置

<div>
<pre>mixed strpos ( string $haystack , mixed $needle [, int $offset = 0 ] )</pre>
</div>
<div>
<pre>&lt;?php
// 忽视位置偏移量之前的字符进行查找
$newstring = 'abcdef abcdef';
$pos = strpos($newstring, 'a', 1); // $pos = 7, 不是 0
?&gt;</pre>
</div>

**strrpos()**

&emsp;&emsp;strrpos()计算指定字符串在目标字符串中最后一次出现的位置

<div>
<pre>int strrpos ( string $haystack , string $needle [, int $offset = 0 ] )</pre>
</div>
<div>
<pre>&lt;?php
$foo = "0123456789a123456789b123456789c";
var_dump(strrpos($foo, '7', -5));  // 从尾部第 5 个位置开始查找
                                   // 结果: int(17)
var_dump(strrpos($foo, '7', 20));  // 从第 20 个位置开始查找
                                   // 结果: int(27)
var_dump(strrpos($foo, '7', 28));  // 结果: bool(false)
?&gt;</pre>
</div>

&nbsp;

### 子串

**substr()**

&emsp;&emsp;substr()返回字符串的子串

<div>
<pre>string substr ( string $string , int $start [, int $length ] )</pre>
</div>
<div>
<pre>&lt;?php
$rest = substr("abcdef", -1);    // 返回 "f"
$rest = substr("abcdef", -2);    // 返回 "ef"
$rest = substr("abcdef", -3, 1); // 返回 "d"
?&gt;
&lt;?php
$rest = substr("abcdef", 0, -1);  // 返回 "abcde"
$rest = substr("abcdef", 2, -1);  // 返回 "cde"
$rest = substr("abcdef", 4, -4);  // 返回 ""
$rest = substr("abcdef", -3, -1); // 返回 "de"
?&gt;</pre>
</div>

&nbsp;

### 替换

**str_replace()**

&emsp;&emsp;str_replace()返回一个字符串或者数组。该字符串或数组是将 subject 中全部的 search 都被 replace 替换之后的结果

<div>
<pre>mixed str_replace ( mixed $search , mixed $replace , mixed $subject [, int &amp;$count ] )</pre>
</div>

&emsp;&emsp;如果count被指定，它的值将被设置为替换发生的次数

<div>
<pre>&lt;?php
// 赋值: &lt;body text='black'&gt;
$bodytag = str_replace("%body%", "black", "&lt;body text='%body%'&gt;");
// 赋值: Hll Wrld f PHP
$vowels = array("a", "e", "i", "o", "u", "A", "E", "I", "O", "U");
$onlyconsonants = str_replace($vowels, "", "Hello World of PHP");
// 赋值: You should eat pizza, beer, and ice cream every day
$phrase  = "You should eat fruits, vegetables, and fiber every day.";
$healthy = array("fruits", "vegetables", "fiber");
$yummy   = array("pizza", "beer", "ice cream");
$newphrase = str_replace($healthy, $yummy, $phrase);
// 赋值: 2
$str = str_replace("ll", "", "good golly miss molly!", $count);
echo $count;
?&gt;</pre>
</div>

&nbsp;

### 分割

【explode()】

&emsp;&emsp;explode()使用一个字符串分割另一个字符串，返回由字符串组成的数组，每个元素都是string的一个子串，它们被字符串delimiter作为边界点分割出来

<div>
<pre>array explode ( string $delimiter , string $string [, int $limit ] )</pre>
</div>

&emsp;&emsp;如果设置了limit参数并且是正数，则返回的数组包含最多limit个元素，而最后那个元素将包含string的剩余部分；如果limit参数是负数，则返回除了最后的-limit个元素外的所有元素；如果limit是0，则会被当做1

<div>
<pre>&lt;?php
// 示例 1
$pizza  = "piece1 piece2 piece3 piece4 piece5 piece6";
$pieces = explode(" ", $pizza);
echo $pieces[0]; // piece1
echo $pieces[1]; // piece2
// 示例 2
$data = "foo:*:1023:1000::/home/foo:/bin/sh";
list($user, $pass, $uid, $gid, $gecos, $home, $shell) = explode(":", $data);
echo $user; // foo
echo $pass; // *
?&gt;</pre>
</div>

【implode()】

&emsp;&emsp;implode()将一个一维数组的值转化为字符串

<div>
<pre>string implode ( string $glue , array $pieces )
string implode ( array $pieces )</pre>
</div>
<div>
<pre>&lt;?php
$array = array('lastname', 'email', 'phone');
$comma_separated = implode(",", $array);
echo $comma_separated; // lastname,email,phone
// Empty string when using an empty array:
var_dump(implode('hello', array())); // string(0) ""
?&gt;</pre>
</div>

