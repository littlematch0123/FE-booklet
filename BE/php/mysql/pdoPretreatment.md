# PDO预处理语句

　　本来要把预处理语句和前面的基础操作写成一篇的。但是，由于博客园的限制，可能是因为长度超出，保存时总是报错，于是再开一篇。另一方面，相较于前面的exec()和query()语句来说，预处理语句更加常用

&nbsp;

### 定义

　　在生成网页时，许多PHP脚本通常都会执行除参数之外，其他部分完全相同的查询语句，针对这种重复执行一个查询，每次迭代使用不同的参数情况，PDO提供了一种名为预处理语句(prepared statement)的机制。它可以将整个SQL命令向数据库服务器发送一次，以后只有参数发生变化，数据库服务器只需对命令的结构做一次分析就够了，即编译一次，可以多次执行。会在服务器上缓存查询的语句和执行过程，而只在服务器和客户端之间传输有变化的列值，以此来消除这些额外的开销。这不仅大大减少了需要传输的数据量，还提高了命令的处理效率。可以有效防止SQL注入，在执行单个查询时快于直接使用query()或exec()的方法，速度快且安全，推荐使用

　　PDO对预处理语句的支持需要使用PDOStatement类对象，但该类的对象并不是通过NEW关键字实例化出来的，而是通过执行PDO对象的prepare()方法，在数据库服务器中准备好一个预处理的SQL语句后直接返回的。如果通过之前执行PDO对象的query()方法返回的PDOStatement类对象，只代表的是一个结果集对象。而如果通过执行PDO对象中的prepare()方法产生的PDOStatement类对象，则为一个查询对象，能定义和执行参数化的SQL命令

&nbsp;

### 准备语句

　　重复执行一个SQL查询，通过每次迭代使用不同的参数，这种情况使用预处理语句运行效率最高。使用预处理语句，首先需要在数据库服务器中先准备好&ldquo;一个SQL语句&rdquo;，但并不需要马上执行。PDO支持使用&ldquo;占位符&rdquo;语法，将变量绑定到这个预处理的SQL语句中。另外，PDO几乎为所支持的所有数据库提供了命令占位符模拟，甚至可以为生来就不支持该概念的数据库模拟预处理语句和绑定参数。这是PHP向前迈进的积极一步，因为这样可以使开发人员能够用PHP编写&ldquo;企业级&rdquo;的数据库应用程序，而不必特别关注数据库平台的能力

　　对于一个准备好的SQL语句，如果在每次执行时都要改变一些列值，这种情况必须使用&ldquo;占位符&rdquo;而不是具体的列值，或者只要有需要使用变量作为值的地方，就先使用占位符替代，准备好一个没有传值的SQL语句，在数据库服务器的缓存区等待处理，然后再去单独赋给占位符具体的值，再通过这个准备好的预处理语句执行。在PDO中有两种使用占位符的语法：&ldquo;命令参数&rdquo;和&ldquo;问号参数&rdquo;，使用哪一种语法看个人的喜好

　　使用命名参数作为占位符的INSERT查询如下所示：

<div class="cnblogs_code">
<pre>$dbh-&gt;prepare("INSERT INTO contactInto(name,address,phone)VALUES (:name,:address,:phone)");</pre>
</div>

　　需要自定义一个字符串作为&ldquo;命名参数&rdquo;，每个命名参数需要冒号(:)开始，参数的命名一定要有意义，最好和对应的字段名称相同

　　使用问号(?)参数作为占位符的INSERT查询如下所示：

<div class="cnblogs_code">
<pre>$dbh-&gt;prepare("INSERT INTO contactInfo(name,address,phone) VALUES (?,?,?)");</pre>
</div>

　　问号参数一定要和字段的位置顺序对应，不管是使用哪一种参数作为占位符构成的查询，或是语句中没有用到占位符，都需要使用PDO对象中的prepare()方法，去准备这个将要用于迭代执行的查询，并返回PDOStatement类对象

&nbsp;

### 绑定参数

　　当SQL语句通过PDO对象中的prepare()方法，在数据库服务器端准备好之后，如果使用了占位符，就需要在每次执行时替换输入的参数。可以通过PDOStatement对象中的bindParam()方法，把参数变量绑定到准备好的占位符上(位置或名字要对应)。方法bindParame()的原型如下所示：

<div class="cnblogs_code">
<pre>bool PDOStatement::bindParam ( mixed $parameter , mixed &amp;$variable [, int $data_type = PDO::PARAM_STR [, int $length [, mixed $driver_options ]]] )</pre>
</div>

　　绑定一个PHP变量到用作预处理的SQL语句中的对应命名占位符或问号占位符。不同于 PDOStatement::bindValue()，此变量作为引用被绑定，并只在PDOStatement::execute()被调用的时候才取其值

　　parameter表示参数标识符(必须项)。对于使用命名占位符的预处理语句，应是类似:name形式的参数名。对于使用问号占位符的预处理语句，应是以1开始索引的参数位置

　　variable(必须项)表示绑定到 SQL 语句参数的 PHP 变量名

　　data_type(可选项)表示使用PDO::PARAM_*常量明确地指定参数的类型。要从一个存储过程中返回一个INOUT参数，需要为data_type参数使用按位或操作符去设置PDO::PARAM_INPUT_OUTPUT位，可以为以下值

<div class="cnblogs_code">
<pre>PDO:PARAM_BOOL:表示boolean数据类型
PDO:PARAM_NULL:表示NULL数据类型
PDO:PARAM_INT:表示INT数据类型
PDO:PARAM_STR:表示字符串数据类型
PDO:PARAM_LOB:表示大对象数据类型</pre>
</div>

　　length(可选项)表示数据类型的长度。为表明参数是一个存储过程的OUT参数，必须明确地设置此长度

　　使用bindParam()方法分别绑定上对应的参数。查询中使用名字参数的绑定如下所示

<div class="cnblogs_code">
<pre>$query = "INSERT INTO contactInfo (name,address,phone) VALUES (:name,:address,:phone)";
$stmt = $dbh-&gt;prepare($query);
$stmt-&gt;bindParam(":name",$name);
$stmt-&gt;bindParam(":address",$address);
$stmt-&gt;bindParam(":phone",$phone);
$name = '爱新觉罗';
$address = '东城';
$phone = '88888';</pre>
</div>

　　查询中使用问号?参数的绑定如下所示

<div class="cnblogs_code">
<pre>$query = "INSERT INTO contactInfo (name,address,phone) VALUES (?,?,?)";
$stmt = $dbh-&gt;prepare($query);
$stmt-&gt;bindParam("1",$name);
$stmt-&gt;bindParam("2",$address);
$stmt-&gt;bindParam("3",$phone);
$name = '司马';
$address = '西城';
$phone = '666';</pre>
</div>

&nbsp;

### 执行查询

　　当准备好查询并绑定了相应的参数后，就可以通过调用PDOStatement类对象中的execute()方法，反复执行在数据库缓存区准备好的语句了。在下面的示例中，向前面提供的contactInfo表中，使用预处理方式连续执行同一个INSERT语句，通过改变不同的参数添加两条记录

<div class="cnblogs_code">
<pre>&lt;?php
try {
    //创建对象
    $dbh = new PDO("mysql:host=localhost;dbname=testdb", "root", "***");
}catch(PDOException $e) {
    echo "数据库连接失败：".$e-&gt;getMessage();
    exit;
}
$query = "INSERT INTO contactInfo (name,address,phone) VALUES (?,?,?)";
$stmt = $dbh-&gt;prepare($query);
$stmt-&gt;bindParam("1",$name);
$stmt-&gt;bindParam("2",$address);
$stmt-&gt;bindParam("3",$phone);
$name = '司马';
$address = '西城';
$phone = '666';
$stmt-&gt;execute();

$name = '曹操';
$address = '平谷';
$phone = '1';
$stmt-&gt;execute();
?&gt;</pre>
</div>

![pdopre1](https://pic.xiaohuochai.site/blog/php_pdopre1.jpg)

<div class="cnblogs_code">
<pre>&lt;?php
try {
    //创建对象
    $dbh = new PDO("mysql:host=localhost;dbname=testdb", "root", "***");
}catch(PDOException $e) {
    echo "数据库连接失败：".$e-&gt;getMessage();
    exit;
}
$query = "INSERT INTO contactInfo (name,address,phone) VALUES (:name,:address,:phone)";
$stmt = $dbh-&gt;prepare($query);
$stmt-&gt;bindParam(":name",$name);
$stmt-&gt;bindParam(":address",$address);
$stmt-&gt;bindParam(":phone",$phone);
$name = '爱新觉罗';
$address = '东城';
$phone = '88888';
$stmt-&gt;execute();
?&gt;</pre>
</div>

![pdopre2](https://pic.xiaohuochai.site/blog/php_pdopre2.jpg)


　　如果只是要传递输入参数，并且有许多这样的参数要传递，那么通过在execute()方法中提供一个可选参数，该参数是由准备查询中的命名参数占位符组成的数组，这是第二种为预处理查询在执行中替换输入参数的方式。此语法可以活动对bindParam()的调用

<div class="cnblogs_code">
<pre>&lt;?php
try {
    //创建对象
    $dbh = new PDO("mysql:host=localhost;dbname=testdb", "root", "***");
}catch(PDOException $e) {
    echo "数据库连接失败：".$e-&gt;getMessage();
    exit;
}
$query = "INSERT INTO contactInfo (name,address,phone) VALUES (?,?,?)";
$stmt = $dbh-&gt;prepare($query);
$stmt-&gt;execute(array("张飞",'延庆','3'));

$query = "INSERT INTO contactInfo (name,address,phone) VALUES (:name,:address,:phone)";
$stmt = $dbh-&gt;prepare($query);
$stmt-&gt;execute(array(":name"=&gt;"关羽",":address"=&gt;"密云",":phone"=&gt;"2"));
?&gt;</pre>
</div>

![pdopre3](https://pic.xiaohuochai.site/blog/php_pdopre3.jpg)


　　如果执行的是INSERT语句，并且数据表有自动增长的ID字段，可以使用PDO对象中的lastInsertId()方法获取最后插入数据表中的记录ID。如果需要查看其他DML语句是否执行成功，可以通过PDOStatement类对象中的rowCount()方法获取影响记录的行数

<div class="cnblogs_code">
<pre>&lt;?php
try {
    //创建对象
    $dbh = new PDO("mysql:host=localhost;dbname=testdb", "root", "***");
}catch(PDOException $e) {
    echo "数据库连接失败：".$e-&gt;getMessage();
    exit;
}
$query = "INSERT INTO contactInfo (name,address,phone) VALUES (?,?,?)";
$stmt = $dbh-&gt;prepare($query);
$stmt-&gt;execute(array("孙权",'通州','123456'));
echo $dbh-&gt;lastInsertId();

$query = "UPDATE contactInfo SET name=? WHERE uid=?";
$stmt = $dbh-&gt;prepare($query);
$stmt-&gt;execute(array("天使","6"));
echo $stmt-&gt;rowCount();//1

$query = "DELETE FROM contactInfo  WHERE name= ?";
$stmt = $dbh-&gt;prepare($query);
$stmt-&gt;execute(["孙权"]);
echo $stmt-&gt;rowCount();//11
?&gt;</pre>
</div>

![pdopre4](https://pic.xiaohuochai.site/blog/php_pdopre4.jpg)


&nbsp;

### 获取数据

　　PDO的数据获取方法与其他数据库扩展都非常类似，只要成功执行SELECT查询，都会有结果集对象生成。不管是使用PDO对象中的query()方法，还是使用prepare()和execute()等方法结合的预处理语句，执行SELECT查询都会得到相同的结果集对象PDOStatement，都需要通过PDOStatement类对象中的方法将数据遍历出来

**fetch()**

　　PDOStatement类中的fetch()方法可以将结果集中当前行的记录以某种方式返回，并将结果集指针移到下一行，当到达结果集末尾时返回FALSE，该方法的原型如下：

<div class="cnblogs_code">
<pre>mixed PDOStatement::fetch ([ int $fetch_style [, int $cursor_orientation = PDO::FETCH_ORI_NEXT [, int $cursor_offset = 0 ]]] )</pre>
</div>

　　第一个参数fetch_style(可选项)，用于控制下一行如何返回给调用者。此值必须是 PDO::FETCH_* 系列常量中的一个，缺省为 PDO::ATTR_DEFAULT_FETCH_MODE 的值(默认为 PDO::FETCH_BOTH)

<div class="cnblogs_code">
<pre>PDO::FETCH_ASSOC：返回一个索引为结果集列名的数组
PDO::FETCH_BOTH(默认)：返回一个索引为结果集列名和以0开始的列号的数组
PDO::FETCH_BOUND：返回 TRUE ，并分配结果集中的列值给 PDOStatement::bindColumn() 方法绑定的 PHP 变量。
PDO::FETCH_CLASS：返回一个请求类的新实例，映射结果集中的列名到类中对应的属性名。如果 fetch_style 包含 PDO::FETCH_CLASSTYPE（例如：PDO::FETCH_CLASS | PDO::FETCH_CLASSTYPE），则类名由第一列的值决定
PDO::FETCH_INTO：更新一个被请求类已存在的实例，映射结果集中的列到类中命名的属性
PDO::FETCH_LAZY：结合使用PDO::FETCH_BOTH和PDO::FETCH_OBJ，创建供用来访问的对象变量名
PDO::FETCH_NUM：返回一个索引为以0开始的结果集列号的数组
PDO::FETCH_OBJ：返回一个属性名对应结果集列名的匿名对象</pre>
</div>

　　第二个参数cursor_orientation(可选项)表示对于一个PDOStatement对象表示的可滚动游标，该值决定了哪一行将被返回给调用者。此值必须是 PDO::FETCH_ORI_* 系列常量中的一个，默认为 PDO::FETCH_ORI_NEXT。要想让 PDOStatement 对象使用可滚动游标，必须在用 PDO::prepare() 预处理SQL语句时，设置 PDO::ATTR_CURSOR 属性为 PDO::CURSOR_SCROLL

　　第三个参数offset(可选项)表示对于一个cursor_orientation参数设置为PDO::FETCH_ORI_ABS的PDOStatement对象代表的可滚动游标，此值指定结果集中想要获取行的绝对行号

　　对于一个 cursor_orientation 参数设置为 PDO::FETCH_ORI_REL 的PDOStatement 对象代表的可滚动游标，此值指定想要获取行相对于调用 PDOStatement::fetch() 前游标的位置

<div class="cnblogs_code">
<pre>&lt;?php
try {
    //创建对象
    $dbh = new PDO("mysql:host=localhost;dbname=testdb", "root", "***");
}catch(PDOException $e) {
    echo "数据库连接失败：".$e-&gt;getMessage();
    exit;
}
$query = "SELECT uid,name,address,phone,email FROM contactInfo";
$stmt = $dbh-&gt;prepare($query);
$stmt-&gt;execute();
//Array ( [uid] =&gt; 1 [0] =&gt; 1 [name] =&gt; 张三 [1] =&gt; 张三 [address] =&gt; 朝阳 [2] =&gt; 朝阳 [phone] =&gt; 123 [3] =&gt; 123 [email] =&gt; zs@aaa.com [4] =&gt; zs@aaa.com ) 
print_r($stmt-&gt;fetch());
echo "&lt;br&gt;";
//Array ( [uid] =&gt; 2 [0] =&gt; 2 [name] =&gt; 李四 [1] =&gt; 李四 [address] =&gt; 朝阳 [2] =&gt; 朝阳 [phone] =&gt; 123456789 [3] =&gt; 123456789 [email] =&gt; ls@aaa.com [4] =&gt; ls@aaa.com ) 
print_r($stmt-&gt;fetch());
echo "&lt;br&gt;";
?&gt;</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;?php
try {
    //创建对象
    $dbh = new PDO("mysql:host=localhost;dbname=testdb", "root", "***");
}catch(PDOException $e) {
    echo "数据库连接失败：".$e-&gt;getMessage();
    exit;
}
$query = "SELECT uid,name,address,phone,email FROM contactInfo";
$stmt = $dbh-&gt;prepare($query);
$stmt-&gt;execute();
/*
Array ( [0] =&gt; 1 [1] =&gt; 张三 [2] =&gt; 朝阳 [3] =&gt; 123 [4] =&gt; zs@aaa.com ) 
Array ( [0] =&gt; 2 [1] =&gt; 李四 [2] =&gt; 朝阳 [3] =&gt; 123456789 [4] =&gt; ls@aaa.com ) 
Array ( [0] =&gt; 3 [1] =&gt; 王五 [2] =&gt; 海淀 [3] =&gt; 15011113456 [4] =&gt; ww@aaa.com ) 
Array ( [0] =&gt; 4 [1] =&gt; 赵四 [2] =&gt; 海淀 [3] =&gt; 123456789 [4] =&gt; zx@aaa.com ) 
Array ( [0] =&gt; 5 [1] =&gt; 诸葛 [2] =&gt; [3] =&gt; 120120120 [4] =&gt; zg@aaa.com ) 
Array ( [0] =&gt; 6 [1] =&gt; 天使 [2] =&gt; [3] =&gt; 222 [4] =&gt; zg2@aaa.com ) 
Array ( [0] =&gt; 7 [1] =&gt; 司马 [2] =&gt; 西城 [3] =&gt; 666 [4] =&gt; ) 
Array ( [0] =&gt; 8 [1] =&gt; 曹操 [2] =&gt; 平谷 [3] =&gt; 1 [4] =&gt; ) 
Array ( [0] =&gt; 9 [1] =&gt; 爱新觉罗 [2] =&gt; 东城 [3] =&gt; 88888 [4] =&gt; ) 
Array ( [0] =&gt; 10 [1] =&gt; 张飞 [2] =&gt; 延庆 [3] =&gt; 3 [4] =&gt; ) 
Array ( [0] =&gt; 11 [1] =&gt; 关羽 [2] =&gt; 密云 [3] =&gt; 2 [4] =&gt; ) 
 */
while($row = $stmt-&gt;fetch(PDO::FETCH_NUM)){
    print_r($row);
    echo "&lt;br&gt;";    
}
?&gt;</pre>
</div>

　　下面以表格的形式输出结果集

<div class="cnblogs_code">
<pre>&lt;?php
try {
    //创建对象
    $dbh = new PDO("mysql:host=localhost;dbname=testdb", "root", "***");
}catch(PDOException $e) {
    echo "数据库连接失败：".$e-&gt;getMessage();
    exit;
}
$query = "SELECT uid,name,address,phone,email FROM contactInfo";
$stmt = $dbh-&gt;prepare($query);
$stmt-&gt;execute();
echo '&lt;table border="1" &gt;';
echo "&lt;th&gt;编号&lt;/th&gt;";
echo "&lt;th&gt;姓名&lt;/th&gt;";
echo "&lt;th&gt;地址&lt;/th&gt;";
echo "&lt;th&gt;电话&lt;/th&gt;";
echo "&lt;th&gt;邮箱&lt;/th&gt;";
while(list($uid, $name, $address, $phone, $email) = $stmt -&gt; fetch(PDO::FETCH_NUM)) {
    echo '&lt;tr&gt;';
    echo '&lt;td&gt;'.$uid.'&lt;/td&gt;';
    echo '&lt;td&gt;'.$name.'&lt;/td&gt;';
    echo '&lt;td&gt;'.$address.'&lt;/td&gt;';
    echo '&lt;td&gt;'.$phone.'&lt;/td&gt;';
    echo '&lt;td&gt;'.$email.'&lt;/td&gt;';
    echo '&lt;/tr&gt;';
}
echo '&lt;/table&gt;';
?&gt;</pre>
</div>

![pdopre5](https://pic.xiaohuochai.site/blog/php_pdopre5.jpg)


**fetchAll()**

　　fetchAll()方法与上一个方法fetch()类似，但是该方法只需要调用一次就可以获取结果集中的所有行，并赋给返回的二维数组。该方法的原型如下：

<div class="cnblogs_code">
<pre>fetchAll([int fetch_style [,int column_index]])</pre>
</div>

　　第一个参数fetch_style是可选项，以何种方式引用所获取的列取决于该参数。默认值为PDO::FETCH_BOTH，所有可用的值可以参考在fetch()方法中介绍的第一个参数的列表，还可以指定PDO::FETCH_COLUMN值，从结果集中返回一个包含单列的所有值

　　第二个参数column_index是可选项，需要提供一个整数索引，当在fetchAll()方法的第一个参数中指定PDO::FETCH_COLUMN值时，从结果集中返回通过该参数提供的索引所指定列的所有值

<div class="cnblogs_code">
<pre>/*
Array ( [0] =&gt; Array ( [uid] =&gt; 1 [0] =&gt; 1 [name] =&gt; 张三 [1] =&gt; 张三 [address] =&gt; 朝阳 [2] =&gt; 朝阳 [phone] =&gt; 123 [3] =&gt; 123 [email] =&gt; zs@aaa.com [4] =&gt; zs@aaa.com ) [1] =&gt; Array ( [uid] =&gt; 2 [0] =&gt; 2 [name] =&gt; 李四 [1] =&gt; 李四 [address] =&gt; 朝阳 [2] =&gt; 朝阳 [phone] =&gt; 123456789 [3] =&gt; 123456789 [email] =&gt; ls@aaa.com [4] =&gt; ls@aaa.com ) [2] =&gt; Array ( [uid] =&gt; 3 [0] =&gt; 3 [name] =&gt; 王五 [1] =&gt; 王五 [address] =&gt; 海淀 [2] =&gt; 海淀 [phone] =&gt; 15011113456 [3] =&gt; 15011113456 [email] =&gt; ww@aaa.com [4] =&gt; ww@aaa.com ) [3] =&gt; Array ( [uid] =&gt; 4 [0] =&gt; 4 [name] =&gt; 赵四 [1] =&gt; 赵四 [address] =&gt; 海淀 [2] =&gt; 海淀 [phone] =&gt; 123456789 [3] =&gt; 123456789 [email] =&gt; zx@aaa.com [4] =&gt; zx@aaa.com ) [4] =&gt; Array ( [uid] =&gt; 5 [0] =&gt; 5 [name] =&gt; 诸葛 [1] =&gt; 诸葛 [address] =&gt; [2] =&gt; [phone] =&gt; 120120120 [3] =&gt; 120120120 [email] =&gt; zg@aaa.com [4] =&gt; zg@aaa.com ) [5] =&gt; Array ( [uid] =&gt; 6 [0] =&gt; 6 [name] =&gt; 天使 [1] =&gt; 天使 [address] =&gt; [2] =&gt; [phone] =&gt; 222 [3] =&gt; 222 [email] =&gt; zg2@aaa.com [4] =&gt; zg2@aaa.com ) [6] =&gt; Array ( [uid] =&gt; 7 [0] =&gt; 7 [name] =&gt; 司马 [1] =&gt; 司马 [address] =&gt; 西城 [2] =&gt; 西城 [phone] =&gt; 666 [3] =&gt; 666 [email] =&gt; [4] =&gt; ) [7] =&gt; Array ( [uid] =&gt; 8 [0] =&gt; 8 [name] =&gt; 曹操 [1] =&gt; 曹操 [address] =&gt; 平谷 [2] =&gt; 平谷 [phone] =&gt; 1 [3] =&gt; 1 [email] =&gt; [4] =&gt; ) [8] =&gt; Array ( [uid] =&gt; 9 [0] =&gt; 9 [name] =&gt; 爱新觉罗 [1] =&gt; 爱新觉罗 [address] =&gt; 东城 [2] =&gt; 东城 [phone] =&gt; 88888 [3] =&gt; 88888 [email] =&gt; [4] =&gt; ) [9] =&gt; Array ( [uid] =&gt; 10 [0] =&gt; 10 [name] =&gt; 张飞 [1] =&gt; 张飞 [address] =&gt; 延庆 [2] =&gt; 延庆 [phone] =&gt; 3 [3] =&gt; 3 [email] =&gt; [4] =&gt; ) [10] =&gt; Array ( [uid] =&gt; 11 [0] =&gt; 11 [name] =&gt; 关羽 [1] =&gt; 关羽 [address] =&gt; 密云 [2] =&gt; 密云 [phone] =&gt; 2 [3] =&gt; 2 [email] =&gt; [4] =&gt; ) )
 */
print_r($stmt-&gt;fetchAll());</pre>
</div>

　　下面以表格的形式输出结果集

<div class="cnblogs_code">
<pre>&lt;?php
try {
    //创建对象
    $dbh = new PDO("mysql:host=localhost;dbname=testdb", "root", "***");
}catch(PDOException $e) {
    echo "数据库连接失败：".$e-&gt;getMessage();
    exit;
}
$query = "SELECT uid,name,address,phone,email FROM contactInfo";
$stmt = $dbh-&gt;prepare($query);
$stmt-&gt;execute();

echo '&lt;table border="1" &gt;';
echo "&lt;th&gt;编号&lt;/th&gt;";
echo "&lt;th&gt;姓名&lt;/th&gt;";
echo "&lt;th&gt;地址&lt;/th&gt;";
echo "&lt;th&gt;电话&lt;/th&gt;";
echo "&lt;th&gt;邮箱&lt;/th&gt;";
$allRows = $stmt-&gt;fetchAll(PDO::FETCH_ASSOC);
foreach($allRows as $row){
    echo '&lt;tr&gt;';
    echo '&lt;td&gt;'.$row['uid'].'&lt;/td&gt;';
    echo '&lt;td&gt;'.$row['name'].'&lt;/td&gt;';
    echo '&lt;td&gt;'.$row['address'].'&lt;/td&gt;';
    echo '&lt;td&gt;'.$row['phone'].'&lt;/td&gt;';
    echo '&lt;td&gt;'.$row['email'].'&lt;/td&gt;';
    echo '&lt;/tr&gt;';
}
echo '&lt;/table&gt;';
?&gt;</pre>
</div>

![pdopre6](https://pic.xiaohuochai.site/blog/php_pdopre6.jpg)


　　下面使用fetchAll()方法输出所有的姓名数组

<div class="cnblogs_code">
<pre>$query = "SELECT uid,name,address,phone,email FROM contactInfo";
$stmt = $dbh-&gt;prepare($query);
$stmt-&gt;execute();
$row=$stmt-&gt;fetchAll(PDO::FETCH_COLUMN,1);
echo '所有联系人的姓名：';
//所有联系人的姓名：Array ( [0] =&gt; 张三 [1] =&gt; 李四 [2] =&gt; 王五 [3] =&gt; 赵四 [4] =&gt; 诸葛 [5] =&gt; 天使 [6] =&gt; 司马 [7] =&gt; 曹操 [8] =&gt; 爱新觉罗 [9] =&gt; 张飞 [10] =&gt; 关羽 )
print_r($row);</pre>
</div>

**setFetchMode()**

　　PDOStatement对象中的fetch()和fetchAll()两个方法，获取结果数据的引用方式默认是一样的，既按列名索引又按列在行中的数值偏移(从0开始)索引的值数组，因为它们的默认模式都被设置为PDO::FETCH_BOTH值，如果计划使用其他模式来改变这个默认设置，可以在fetch()或fetchAll()方法中提供需要的模式参数。但如果多次使用这两个方法，在每次调用时都需要设置新的模式来改变默认的模式。这时就可以使用PDOStatement类对象中的setFetchMode()方法，在脚本页面的顶部设置一次模式，以后所有fetch()和fetchAll()方法的调用都将生成相应引用的结果集，减少了多次在调用fetch()方法时的参数录入

<div class="cnblogs_code">
<pre>$query = "SELECT uid,name,address,phone,email FROM contactInfo";
$stmt = $dbh-&gt;prepare($query);
$stmt-&gt;execute();
$stmt-&gt;setFetchMode(PDO::FETCH_ASSOC);
echo '&lt;table border="1" &gt;';
echo "&lt;th&gt;编号&lt;/th&gt;";
echo "&lt;th&gt;姓名&lt;/th&gt;";
echo "&lt;th&gt;地址&lt;/th&gt;";
echo "&lt;th&gt;电话&lt;/th&gt;";
echo "&lt;th&gt;邮箱&lt;/th&gt;";
$allRows = $stmt-&gt;fetchAll();
foreach($allRows as $row){
    echo '&lt;tr&gt;';
    echo '&lt;td&gt;'.$row['uid'].'&lt;/td&gt;';
    echo '&lt;td&gt;'.$row['name'].'&lt;/td&gt;';
    echo '&lt;td&gt;'.$row['address'].'&lt;/td&gt;';
    echo '&lt;td&gt;'.$row['phone'].'&lt;/td&gt;';
    echo '&lt;td&gt;'.$row['email'].'&lt;/td&gt;';
    echo '&lt;/tr&gt;';
}
echo '&lt;/table&gt;';</pre>
</div>

**bindColumn()**

　　使用该方法可以将一个列和一个指定的变量名绑定，这样在每次使用fetch()方法获取各行记录时，会自动将相应的列值赋给该变量，但必须是在fetch()方法的第一个参数设置为PDO::FETCH_BOTH值时。bindColumn()方法的原型如下所示：

<div class="cnblogs_code">
<pre>bindColumn(mixed column,mixed $param[,int type]);//设置绑定列值到变量上</pre>
</div>

　　第一个参数column为必选项，可以使用整数的列偏移位置索引(索引值从1开始)，或是列的名称字符串。第二个参数param也是必选项，需要传递一个引用，所以必须提供一个相应的变量名。第三个参数type是可选项，通过设置变量的类型来限制变量值，该参数支持的值和介绍bindParam()方法时提供的一样

<div class="cnblogs_code">
<pre>&lt;?php
try {
    //创建对象
    $dbh = new PDO("mysql:host=localhost;dbname=testdb", "root", "***");
}catch(PDOException $e) {
    echo "数据库连接失败：".$e-&gt;getMessage();
    exit;
}
$query = "SELECT * FROM contactInfo";
$stmt = $dbh-&gt;prepare($query);
$stmt-&gt;execute();
$stmt-&gt;bindColumn(1,$uid);
$stmt-&gt;bindColumn(2,$name);
$stmt-&gt;bindColumn(3,$departmentID);
$stmt-&gt;bindColumn('address',$address);
$stmt-&gt;bindColumn('phone',$phone);
$stmt-&gt;bindColumn(6,$email);

$stmt-&gt;setFetchMode(PDO::FETCH_ASSOC);
echo '&lt;table border="1" &gt;';
echo "&lt;th&gt;编号&lt;/th&gt;";
echo "&lt;th&gt;姓名&lt;/th&gt;";
echo "&lt;th&gt;部门&lt;/th&gt;";
echo "&lt;th&gt;地址&lt;/th&gt;";
echo "&lt;th&gt;电话&lt;/th&gt;";
echo "&lt;th&gt;邮箱&lt;/th&gt;";
while($stmt-&gt;fetch()){
    echo '&lt;tr&gt;';
    echo '&lt;td&gt;'.$uid.'&lt;/td&gt;';
    echo '&lt;td&gt;'.$name.'&lt;/td&gt;';
    echo '&lt;td&gt;'.$departmentID.'&lt;/td&gt;';
    echo '&lt;td&gt;'.$address.'&lt;/td&gt;';
    echo '&lt;td&gt;'.$phone.'&lt;/td&gt;';
    echo '&lt;td&gt;'.$email.'&lt;/td&gt;';
    echo '&lt;/tr&gt;';
}
echo '&lt;/table&gt;';
?&gt;</pre>
</div>

　　除了可以通过上面几种方式获取数据表中记录信息外，还可以使用PDOStatement类对象的columnCount()方法获取数据表中字段的数量，并且可以通过PDOStatement类对象的getColumnMeta()方法获取具体列的属性信息

**PDOStatement::getColumnMeta**

　　PDOStatement::getColumnMeta &mdash; 返回结果集中一列的元数据。参数column表示结果集中以0开始索引的列

<div class="cnblogs_code">
<pre>array PDOStatement::getColumnMeta ( int $column )</pre>
</div>
<div class="cnblogs_code">
<pre>$query = "SELECT * FROM contactInfo";
$stmt = $dbh-&gt;prepare($query);
$stmt-&gt;execute();
echo $stmt-&gt;columnCount();//6
/*
array (size=7)
  'native_type' =&gt; string 'INT24' (length=5)
  'pdo_type' =&gt; int 2
  'flags' =&gt; 
    array (size=2)
      0 =&gt; string 'not_null' (length=8)
      1 =&gt; string 'primary_key' (length=11)
  'table' =&gt; string 'contactInfo' (length=11)
  'name' =&gt; string 'uid' (length=3)
  'len' =&gt; int 8
  'precision' =&gt; int 0
 */
var_dump($stmt-&gt;getColumnMeta(0));</pre>
</div>

&nbsp;

### 大数据对象

　　在进行项目开发时，有时会需要在数据库中在存储&ldquo;大型&rdquo;数据。大型对象可以是文本数据，也可以是二进制的图片、电影等。PDO允许在bindParam()或bindColumn()调用中通过使用PDO::PARAM_LOB类型代码来使用大型数据类型。PDO::PARAM_LOB告诉PDO将数据映射为流，所以可以使用PHP中的文件处理函数来操纵这样的数据

　　下面将上传的图像插入到一个数据库

<div class="cnblogs_code">
<pre>    $stmt =$dbh-&gt;prepare("insert into images(mimetype, data) values(?, ?)");
    $stmt-&gt;bindParam(1, $_FILES['pic']['type']);
    $fp = fopen($_FILES['pic']['tmp_name'], "rb");
    //直接使用文件资源就可以入库，而不用读出文件，再插入
    $stmt-&gt;bindparam(2, $fp, PDO::PARAM_LOB);
    $stmt-&gt;execute();
    fclose($fp);</pre>
</div>

　　下面从数据库中读出一幅图像

<div class="cnblogs_code">
<pre>    $stmt = $dbh-&gt;prepare("select mimetype, data from images where id=?");
    $stmt -&gt; execute(array(1));
    list($mimetype, $data) = $stmt-&gt;fetch(PDO::FETCH_NUM);
    header("Content-Type: {$mimetype}");
    echo $data;</pre>
</div>
