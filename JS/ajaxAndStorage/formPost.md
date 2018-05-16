# 深入理解ajax系列第八篇——表单提交

&emsp;&emsp;在以前，网站的用户与后端交互的主要方式是通过HTML表单的使用。表单的引入在1993年，由于其简单性和易用性，直到电子商务出现之前一直保持着重要位置。理解表单提交，对于更深入地理解ajax是有好处的。下面将详细介绍表单形式的交互

&nbsp;

### 建立表单

&emsp;&emsp;表单处理是一个多线程。首先创建一个表单，以供用户输入详细的请求信息。接着，输入的数据被发送到网页服务器，在服务器里这些数据得到编译和错误检测。如果PHP代码标识出一个或多个需要重要输入的字段，则带有相关错误信息的表单会重新显示。当精确的输入信息满足代码的需要时，代码会采取一些调用数据库的行为，如输入购物的细节

&emsp;&emsp;注意：关于HTML表单元素的详细信息[移步至此](http://www.cnblogs.com/xiaohuochai/p/5174891.html)

&emsp;&emsp;要建立一个表单，至少需要以下几个元素：一个form元素、一个指定GET或POST方法的提交类型、一个或多个输入字段，以及表单数据提交的目的地址URL

<div>
<pre>&lt;form action="http://www.w3school.com.cn/demo/welcome.php"&gt;
    &lt;span&gt;Name:&lt;/span&gt;
    &lt;input name="name"&gt;&lt;br&gt;
    &lt;span&gt;Email:&lt;/span&gt;
    &lt;input name="email"&gt;&lt;br&gt;
    &lt;input type="submit"&gt;
&lt;/form&gt;</pre>
</div>

&nbsp;

### 表单处理

&emsp;&emsp;PHP 超全局变量 $_GET 和 $_POST 用于收集表单数据(form-data)

&emsp;&emsp;GET 和 POST 都创建数组(例如，array( key =&gt; value, key2 =&gt; value2, key3 =&gt; value3, ...))。此数组包含键/值对，其中的键是表单控件的名称，而值是来自用户的输入数据。

&emsp;&emsp;GET 和 POST 被视作 $_GET 和 $_POST。它们是超全局变量，这意味着对它们的访问无需考虑作用域，即无需任何特殊代码，能够从任何函数、类或文件访问它们

&emsp;&emsp;$_GET 是通过 URL 参数传递到当前脚本的变量数组

&emsp;&emsp;$_POST 是通过 HTTP POST 传递到当前脚本的变量数组

&emsp;&emsp;通过 GET 方法从表单发送的信息对任何人都是可见的(所有变量名和值都显示在 URL 中)。GET对所发送信息的数量也有限制。限制在大于2000个字符。不过，由于变量显示在 URL 中，把页面添加到书签中也更为方便

&emsp;&emsp;通过 POST 方法从表单发送的信息对其他人是不可见的(所有名称/值会被嵌入 HTTP 请求的主体中)，并且对所发送信息的数量也无限制。此外 POST 支持高阶功能，比如在向服务器上传文件时进行 multi-part 二进制输入。不过，由于变量未显示在 URL 中，也就无法将页面添加到书签。一般地，使用 POST 来发送表单数据

【post】

<div>
<pre>&lt;!-- 提交页 --&gt;
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;form method="post" action="http://www.w3school.com.cn/demo/welcome.php"&gt;
    &lt;span&gt;Name:&lt;/span&gt;
    &lt;input name="name"&gt;&lt;br&gt;
    &lt;span&gt;Email:&lt;/span&gt;
    &lt;input name="email"&gt;&lt;br&gt;
    &lt;input type="submit"&gt;
&lt;/form&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>
<div>
<pre>&lt;!-- 响应页 --&gt;
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    Welcome &lt;?php echo $_POST["name"]; ?&gt;&lt;br&gt;
    Your email address is: &lt;?php echo $_POST["email"]; ?&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>

【get】

&emsp;&emsp;如果不设置form元素的method属性，则默认为get方法

<div>
<pre>&lt;!-- 提交页 --&gt;
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;form action="http://www.w3school.com.cn/demo/welcome_get.php"&gt;
    &lt;span&gt;Name:&lt;/span&gt;
    &lt;input name="name"&gt;&lt;br&gt;
    &lt;span&gt;Email:&lt;/span&gt;
    &lt;input name="email"&gt;&lt;br&gt;
    &lt;input type="submit"&gt;
&lt;/form&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>
<div>
<pre>&lt;!-- 响应页 --&gt;
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    Welcome &lt;?php echo $_GET["name"]; ?&gt;&lt;br&gt;
    Your email address is: &lt;?php echo $_GET["email"]; ?&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>

&nbsp;

### 表单安全

&emsp;&emsp;上面的代码很简单。不过，最重要的内容被漏掉了。需要对表单数据进行验证，以防止脚本出现漏洞

&emsp;&emsp;对 HTML 表单数据进行适当的验证对于防范黑客和垃圾邮件很重要

<div>
<pre>字段          验证规则
Name        　  必需。必须包含字母和空格。
E-mail         必需。必须包含有效的电子邮件地址(包含 @ 和 .)
Website        可选。如果选填，则必须包含有效的 URL。
Comment        可选。多行输入字段(文本框)
Gender         必需。必须选择一项。</pre>
</div>
<div>
<pre>&lt;form method="post" action="&lt;?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?&gt;"&gt;

姓名：
&lt;input type="text" name="name" value=""&gt;
&lt;span class="error"&gt;* &lt;/span&gt;
&lt;br&gt;&lt;br&gt;
电邮：
&lt;input type="text" name="email" value=""&gt;
&lt;span class="error"&gt;* &lt;/span&gt;
&lt;br&gt;&lt;br&gt;
网址：
&lt;input type="text" name="website" value=""&gt;
&lt;span class="error"&gt;&lt;/span&gt;
&lt;br&gt;&lt;br&gt;
&lt;label&gt;
评论：
&lt;textarea name="comment" rows="5" cols="40"&gt;&lt;/textarea&gt;
&lt;br&gt;&lt;br&gt;
性别：
&lt;input type="radio" name="gender" value="female"&gt;女性
&lt;input type="radio" name="gender" value="male"&gt;男性
&lt;span class="error"&gt;* &lt;/span&gt;
&lt;br&gt;&lt;br&gt;
&lt;input type="submit" name="submit" value="提交"&gt; 
&lt;/form&gt;</pre>
</div>

**【$_SERVER["PHP_SELF"]】**

&emsp;&emsp;$_SERVER["PHP_SELF"] 是一种超全局变量，它返回当前执行脚本的文件名。因此，$_SERVER["PHP_SELF"] 将表单数据发送到页面本身，而不是跳转到另一张页面。这样，用户就能够在表单页面获得错误提示信息

**【XSS】**

&emsp;&emsp;$_SERVER["PHP_SELF"] 变量能够被黑客利用。如果页面使用了PHP_SELF，用户能够输入下划线然后执行跨站点脚本(XSS)

&emsp;&emsp;跨站点脚本(Cross-site scripting，XSS)是一种计算机安全漏洞类型，常见于Web应用程序。XSS能够使攻击者向其他用户浏览的网页中输入客户端脚本

&emsp;&emsp;假设"test_form.php" 的页面中有如下表单

<div>
<pre>&lt;form method="post" action="&lt;?php echo $_SERVER["PHP_SELF"];?&gt;"&gt;</pre>
</div>

&emsp;&emsp;现在，如果用户进入的是地址栏中正常的URL："`http://www.example.com/test_form.php`"，上面的代码会转换为：

<div>
<pre>&lt;form method="post" action="test_form.php"&gt;</pre>
</div>

&emsp;&emsp;不过，如果用户在地址栏中键入了如下 URL：

<div>
<pre>http://www.example.com/test_form.php/%22%3E%3Cscript%3Ealert('hacked')%3C/script%3E</pre>
</div>

&emsp;&emsp;在这种情况下，上面的代码会转换为：

<div>
<pre>&lt;form method="post" action="test_form.php"/&gt;&lt;script&gt;alert('hacked')&lt;/script&gt;</pre>
</div>

&emsp;&emsp;这段代码加入了一段脚本和一个提示命令。并且当此页面加载后，就会执行JavaScript代码(用户会看到一个提示框)。这仅仅是一个关于 PHP_SELF 变量如何被利用的简单无害案例

&emsp;&emsp;&lt;script&gt;标签内能够添加任何JavaScript代码，黑客能够把用户重定向到另一台服务器上的某个文件，该文件中的恶意代码能够更改全局变量或将表单提交到其他地址以保存用户数据等

**【htmlspecialchars()】**

&emsp;&emsp;如果避免$_SERVER["PHP_SELF"]被利用？通过使用 htmlspecialchars() 函数能够避免$_SERVER["PHP_SELF"]被利用

&emsp;&emsp;htmlspecialchars()函数把特殊字符转换为 HTML 实体。这意味着 &lt; 和 &gt; 之类的HTML字符会被替换为 &amp;lt; 和 &amp;gt;。这样可防止攻击者通过在表单中注入HTML或JavaScript代码(跨站点脚本攻击)对代码进行利用

&emsp;&emsp;表单代码是这样的：

<div>
<pre>&lt;form method="post" action="&lt;?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?&gt;"&gt;</pre>
</div>

&emsp;&emsp;htmlspecialchars()把特殊字符转换为HTML实体。现在，如果用户试图利用PHP_SELF变量，会导致如下输出

<div>
<pre>&lt;form method="post" action="test_form.php/"&gt;&lt;script&gt;alert('hacked')&lt;/script&gt;"&gt;</pre>
</div>

&emsp;&emsp;所以，验证表单要做的第一件事是通过PHP的htmlspecialchars()函数传递所有变量。在使用htmlspecialchars()函数后，如果用户试图在文本字段中提交以下内容：

<div>
<pre>&lt;script&gt;location.href('http://www.hacked.com')&lt;/script&gt;</pre>
</div>

&emsp;&emsp;代码不会执行，因为会被保存为转义代码，就像这样：

<div>
<pre>&amp;lt;script&amp;gt;location.href('http://www.hacked.com')&amp;lt;/script&amp;gt;</pre>
</div>

&emsp;&emsp;现在这条代码显示在页面上或e-mail中是安全的

&emsp;&emsp;在用户提交该表单时，我们还要做两件事：1、通过PHP的trim()函数去除用户输入数据中不必要的字符(多余的空格、制表符、换行)；2、通过PHP的stripslashes()函数删除用户输入数据中的反斜杠(\)

&emsp;&emsp;接下来我创建一个检查函数，命名为 test_input()，通过test_input()函数检查每个$_POST变量

<div>
<pre>&lt;?php
// 定义变量并设置为空值
$name = $email = $gender = $comment = $website = "";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
$name = test_input($_POST["name"]);
$email = test_input($_POST["email"]);
$website = test_input($_POST["website"]);
$comment = test_input($_POST["comment"]);
$gender = test_input($_POST["gender"]);
}
function test_input($data) {
$data = trim($data);
$data = stripslashes($data);
$data = htmlspecialchars($data);
return $data;
}
?&gt;</pre>
</div>

&nbsp;

### 错误信息

&emsp;&emsp;在下面的代码中增加了一些新变量：$nameErr、$emailErr、$genderErr以及$websiteErr。这些错误变量会保存被请求字段的错误消息。还为每个$_POST变量添加了一个if else语句。这条语句通过PHP的empty()函数检查$_POST变量是否为空。如果为空，则错误消息会存储于不同的错误变量中。如果不为空，则通过test_input()函数发送用户输入数据

<div>
<pre>&lt;?php
// 定义变量并设置为空值
$nameErr = $emailErr = $genderErr = $websiteErr = "";
$name = $email = $gender = $comment = $website = "";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (empty($_POST["name"])) {
    $nameErr = "Name is required";
  } else {
    $name = test_input($_POST["name"]);
  }
  if (empty($_POST["email"])) {
    $emailErr = "Email is required";
  } else {
    $email = test_input($_POST["email"]);
  }
  if (empty($_POST["website"])) {
    $website = "";
  } else {
    $website = test_input($_POST["website"]);
  }
  if (empty($_POST["comment"])) {
    $comment = "";
  } else {
    $comment = test_input($_POST["comment"]);
  }
  if (empty($_POST["gender"])) {
    $genderErr = "Gender is required";
  } else {
    $gender = test_input($_POST["gender"]);
  }
}
?&gt;</pre>
</div>

&emsp;&emsp;在 HTML 表单中，在每个被请求字段后面增加了一点脚本。如果需要，会生成恰当的错误消息(如果用户未填写必填字段就试图提交表单)

<div>
<pre>&lt;form method="post" action="&lt;?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?&gt;"&gt;
Name: &lt;input type="text" name="name"&gt;
&lt;span class="error"&gt;* &lt;?php echo $nameErr;?&gt;&lt;/span&gt;
&lt;br&gt;&lt;br&gt;
E-mail:
&lt;input type="text" name="email"&gt;
&lt;span class="error"&gt;* &lt;?php echo $emailErr;?&gt;&lt;/span&gt;
&lt;br&gt;&lt;br&gt;
Website:
&lt;input type="text" name="website"&gt;
&lt;span class="error"&gt;&lt;?php echo $websiteErr;?&gt;&lt;/span&gt;
&lt;br&gt;&lt;br&gt;
&lt;label&gt;Comment: &lt;textarea name="comment" rows="5" cols="40"&gt;&lt;/textarea&gt;
&lt;br&gt;&lt;br&gt;
Gender:
&lt;input type="radio" name="gender" value="female"&gt;Female
&lt;input type="radio" name="gender" value="male"&gt;Male
&lt;span class="error"&gt;* &lt;?php echo $genderErr;?&gt;&lt;/span&gt;
&lt;br&gt;&lt;br&gt;
&lt;input type="submit" name="submit" value="Submit"&gt; 
&lt;/form&gt;</pre>
</div>

&nbsp;

### 表单验证

&emsp;&emsp;验证规则中，"Name", "E-mail" 以及 "Gender" 字段是必需的。这些字段不能为空且必须在 HTML 表单中填写

【验证名字】

&emsp;&emsp;以下代码检查name字段是否包含字母和空格。如果name字段无效，则存储一条错误消息

<div>
<pre>$name = test_input($_POST["name"]);
if (!preg_match("/^[a-zA-Z ]*$/",$name)) {
  $nameErr = "只允许字母和空格！"; 
}</pre>
</div>

【验证 E-mail】

&emsp;&emsp;以下代码展检查e-mail地址语法是否有效。如果无效则存储一条错误消息

<div>
<pre>$email = test_input($_POST["email"]);
if (!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/",$email)) {
  $emailErr = "无效的 email 格式！"; 
}</pre>
</div>

【验证 URL】

&emsp;&emsp;以下代码检查URL地址语法是否有效。如果 URL 地址语法无效，则存储一条错误消息

<div>
<pre>$website = test_input($_POST["website"]);
if (!preg_match("/\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&amp;@#\/%?=~_|!:,.;]*[-a-z0-9+&amp;@#\/%
=~_|]/i",$website)) {
  $websiteErr = "无效的 URL"; 
}</pre>
</div>

&nbsp;

### 保留值

&emsp;&emsp;如果需要在用户点击提交按钮后在输入字段中显示值，我们在以下输入字段的value属性中增加了一小段 PHP 脚本：name、email 以及 website。在 comment 文本框字段中，把脚本放到了 &lt;textarea&gt; 与 &lt;/textarea&gt; 之间。这些脚本输出$name、$email、$website 和 $comment 变量的值

&emsp;&emsp;然后，还需要显示选中了哪个单选按钮。对此，必须操作 checked 属性(而非单选按钮的 value 属性)

<div>
<pre>Name: &lt;input type="text" name="name" value="&lt;?php echo $name;?&gt;"&gt;
E-mail: &lt;input type="text" name="email" value="&lt;?php echo $email;?&gt;"&gt;
Website: &lt;input type="text" name="website" value="&lt;?php echo $website;?&gt;"&gt;
Comment: &lt;textarea name="comment" rows="5" cols="40"&gt;&lt;?php echo $comment;?&gt;&lt;/textarea&gt;
Gender:
&lt;input type="radio" name="gender"
&lt;?php if (isset($gender) &amp;&amp; $gender=="female") echo "checked";?&gt;
value="female"&gt;Female
&lt;input type="radio" name="gender"
&lt;?php if (isset($gender) &amp;&amp; $gender=="male") echo "checked";?&gt;
value="male"&gt;Male</pre>
</div>

&nbsp;

### 表单发送

&emsp;&emsp;HTML网页的&lt;form&gt;元素能够以四种格式，向服务器发送数据

&emsp;&emsp;使用POST方法，将enctype属性设为application/x-www-form-urlencoded，这是默认方法

<div>
<pre>&lt;form action="register.php" method="post" onsubmit="AJAXSubmit(this); return false;"&gt;&lt;/form&gt;</pre>
</div>

&emsp;&emsp;使用POST方法，将enctype属性设为text/plain

<div>
<pre>&lt;form action="register.php" method="post" enctype="text/plain" onsubmit="AJAXSubmit(this); return false;"&gt;&lt;/form&gt;</pre>
</div>

&emsp;&emsp;使用POST方法，将enctype属性设为multipart/form-data

<div>
<pre>&lt;form action="register.php" method="post" enctype="multipart/form-data" onsubmit="AJAXSubmit(this); return false;"&gt;&lt;/form&gt;</pre>
</div>

&emsp;&emsp;使用GET方法，enctype属性将被忽略

<div>
<pre>&lt;form action="register.php" method="get" onsubmit="AJAXSubmit(this); return false;"&gt;&lt;/form&gt;</pre>
</div>

&emsp;&emsp;某个表单有两个字段，分别是foo和baz，其中foo字段的值等于bar，baz字段的值是一个分为两行的字符串。上面四种方法，都可以将这个表单发送到服务器

&emsp;&emsp;第一种方法是默认方法，POST发送，Encoding type为application/x-www-form-urlencoded

<div>
<pre>Content-Type: application/x-www-form-urlencoded
foo=bar&amp;baz=The+first+line.&amp;#37;0D%0AThe+second+line.%0D%0A</pre>
</div>

&emsp;&emsp;第二种方法是POST发送，Encoding type为text/plain

<div>
<pre>Content-Type: text/plain

foo=bar
baz=The first line.
The second line.</pre>
</div>

&emsp;&emsp;第三种方法是POST发送，Encoding type为multipart/form-data

<div>
<pre>Content-Type: multipart/form-data; boundary=---------------------------314911788813839
-----------------------------314911788813839
Content-Disposition: form-data; name="foo"
bar
-----------------------------314911788813839
Content-Disposition: form-data; name="baz"
The first line.
The second line.
-----------------------------314911788813839--</pre>
</div>

&emsp;&emsp;第四种方法是GET请求

<div>
<pre>?foo=bar&amp;baz=The%20first%20line.%0AThe%20second%20line</pre>
</div>

&nbsp;

### 完整代码

<div>
<pre>&lt;!DOCTYPE HTML&gt; 
&lt;html&gt;
&lt;head&gt;
&lt;style&gt;
.error {color: #FF0000;}
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt; 
&lt;?php
// 定义变量并设置为空值
$nameErr = $emailErr = $genderErr = $websiteErr = "";
$name = $email = $gender = $comment = $website = "";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
   if (empty($_POST["name"])) {
     $nameErr = "姓名是必填的";
   } else {
     $name = test_input($_POST["name"]);
     // 检查姓名是否包含字母和空白字符
     if (!preg_match("/^[a-zA-Z ]*$/",$name)) {
       $nameErr = "只允许字母和空格"; 
     }
   }
   if (empty($_POST["email"])) {
     $emailErr = "电邮是必填的";
   } else {
     $email = test_input($_POST["email"]);
     // 检查电子邮件地址语法是否有效
     if (!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/",$email)) {
       $emailErr = "无效的 email 格式"; 
     }
   }
   if (empty($_POST["website"])) {
     $website = "";
   } else {
     $website = test_input($_POST["website"]);
     // 检查 URL 地址语法是否有效（正则表达式也允许 URL 中的斜杠）
     if (!preg_match("/\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&amp;@#\/%?=~_|!:,.;]*[-a-z0-9+&amp;@#\/%=~_|]/i",$website)) {
       $websiteErr = "无效的 URL"; 
     }
   }
   if (empty($_POST["comment"])) {
     $comment = "";
   } else {
     $comment = test_input($_POST["comment"]);
   }
   if (empty($_POST["gender"])) {
     $genderErr = "性别是必选的";
   } else {
     $gender = test_input($_POST["gender"]);
   }
}
function test_input($data) {
   $data = trim($data);
   $data = stripslashes($data);
   $data = htmlspecialchars($data);
   return $data;
}
?&gt;
&lt;p&gt;&lt;span class="error"&gt;* 必需的字段&lt;/span&gt;&lt;/p&gt;
&lt;form method="post" action="&lt;?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?&gt;"&gt; 
   姓名：&lt;input type="text" name="name" value="&lt;?php echo $name;?&gt;"&gt;
   &lt;span class="error"&gt;* &lt;?php echo $nameErr;?&gt;&lt;/span&gt;
   &lt;br&gt;&lt;br&gt;
   电邮：&lt;input type="text" name="email" value="&lt;?php echo $email;?&gt;"&gt;
   &lt;span class="error"&gt;* &lt;?php echo $emailErr;?&gt;&lt;/span&gt;
   &lt;br&gt;&lt;br&gt;
   网址：&lt;input type="text" name="website" value="&lt;?php echo $website;?&gt;"&gt;
   &lt;span class="error"&gt;&lt;?php echo $websiteErr;?&gt;&lt;/span&gt;
   &lt;br&gt;&lt;br&gt;
   评论：&lt;textarea name="comment" rows="5" cols="40"&gt;&lt;?php echo $comment;?&gt;&lt;/textarea&gt;
   &lt;br&gt;&lt;br&gt;
   性别：
    &lt;input type="radio" name="gender"
    &lt;?php if (isset($gender) &amp;&amp; $gender=="female") echo "checked";?&gt;
    value="female"&gt;女性
    &lt;input type="radio" name="gender"
    &lt;?php if (isset($gender) &amp;&amp; $gender=="male") echo "checked";?&gt;
    value="male"&gt;男性
   &lt;span class="error"&gt;* &lt;?php echo $genderErr;?&gt;&lt;/span&gt;
   &lt;br&gt;&lt;br&gt;
   &lt;input type="submit" name="submit" value="提交"&gt; 
&lt;/form&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>

<iframe src="https://www.xiaohuochai.site/test/formPost/f1.php" frameborder="0" width="500" height="370"></iframe>
