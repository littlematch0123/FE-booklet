# mysql拓展函数

　　mysql由于其体积小、速度快、总体拥有成本低，尤其是具有开放源码这一特点，许多中小型网站为了减低网站总体拥有成本而选择了mysql作为网站数据库。而使用mysql数据库管理系统与php脚本语言相结合的数据库系统解决方案，正被越来越多的网站所采用，其中以LAMP(linux+apche+mysql+php)模式最为流行

　　PHP有标准的函数用来操作数据库，mysqli是PHP5中新加的，是对mysql扩展的改进。但由于历史遗留问题，好多老项目是在PHP4中使用mysql拓展开发的，如果在原有的项目上进行二次开发，都要求使用mysql拓展函数。如果是新设计的项目，推荐使用mysqli拓展或PDO技术。本文主要介绍PHP中的mysql拓展函数

&nbsp;

### 总括

　　在PHP脚本中操作MySQL数据库的的几个步骤如下：

　　1、连接MySQL数据库服务器，并判断是否连接正确

　　2、选择数据库，并设置字符集(可选)

　　3、执行SQL命令

　　4、处理结果集

　　5、关闭数据库连接

&nbsp;

### 连接MySQL数据库服务器，并判断是否连接正确

**mysql_connect()**

　　mysql_connect()函数用来打开一个到 MySQL 服务器的连接。如果成功则返回一个资源， 或者在失败时返回FALSE

<div class="cnblogs_code">
<pre>resource mysql_connect ([ string $server [, string $username [, string $password [, bool $new_link [, int $client_flags ]]]]] )</pre>
</div>

**mysql_errno()**

　　mysql_errno()函数用于返回上一个 MySQL 操作中的错误信息的数字编码

<div class="cnblogs_code">
<pre>int mysql_errno ([ resource $link_identifier ] )</pre>
</div>

**mysql_error()**

　　mysql_error()函数用于返回上一个 MySQL 操作产生的文本错误信息。如果没有指定连接资源号，则使用上一个成功打开的连接从 MySQL 服务器提取错误信息

<div class="cnblogs_code">
<pre>string mysql_error ([ resource $link_identifier ] )</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;?php
$link = mysql_connect('localhost','root','123456');
var_dump($link);//resource(3, mysql link)
if(!$link){
    die('连接失败：'.mysql_error());
}
?&gt;</pre>
</div>

&nbsp;

### 选择数据库，并设置字符集(可选)

　　通常，数据库的创建工作都是先由数据库管理员(DBA)建立，再由PHP程序员在脚本中使用。例如，创建一个名为bookstore的数据库


![mysqlSpread1](https://pic.xiaohuochai.site/blog/php_mysqlSpread1.jpg)


　　使用PHP脚本建立与mysql服务器的连接之后，为了避免每次调用PHP的mysql扩展函数都指定目标数据库，最好先用mysql_select_db()函数为后续操作选定一个默认数据库，这个函数与SQL命令"USE bookstore"功能相似

**mysql_select_db()**

　　mysql_select_db()函数用于选择 MySQL 数据库

<div class="cnblogs_code">
<pre>bool mysql_select_db ( string $database_name [, resource $ link_identifier ] )</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;?php
$link = mysql_connect('localhost','root','zhiaihebe0123');
var_dump($link);//resource(3, mysql link)
if(!$link){
    die('连接失败：'.mysql_error());
}
mysql_select_db('bookstore',$link) or die('不能选定数据库bookstore:' .mysql_error());

mysql_query('set names utf8');//设置字符集(一般不常用)
?&gt;</pre>
</div>

&nbsp;

### 执行SQL命令

　　首先，在bookstore数据库中创建一张books数据表

<div class="cnblogs_code">
<pre>CREATE TABLE books(
    id INT NOT NULL AUTO_INCREMENT,
    bookname VARCHAR(80) NOT NULL DEFAULT '',
    publisher VARCHAR(60) NOT NULL DEFAULT '',
    author VARCHAR(20) NOT NULL DEFAULT '',
    price DOUBLE(5,2) NOT NULL DEFAULT 0.00,
    ptime INT NOT NULL DEFAULT 0,
    pic CHAR(24) NOT NULL DEFAULT '',
    detail TEXT,
    PRIMARY KEY(id));
));</pre>
</div>

![mysqlSpread2](https://pic.xiaohuochai.site/blog/php_mysqlSpread2.jpg)


　　在PHP中，只要把SQL命令作为一个字符串传递给mysql_query()函数，就会将其发送到MYSQL服务器并执行

**mysql_query()**

　　mysql_query()函数用于发送一条 MySQL 查询。mysql_query() 仅对 SELECT，SHOW，DESCRIBE, EXPLAIN 和其他语句返回一个resource，如果查询出现错误则返回 FALSE；对于其它类型的 SQL 语句，比如INSERT, UPDATE, DELETE, DROP 之类， mysql_query() 在执行成功时返回 TRUE，出错时返回 FALSE

<div class="cnblogs_code">
<pre>resource mysql_query ( string $query [, resource $link_identifier = NULL ] )</pre>
</div>

　　将要插入的3条INSERT语句声明为一个字符串

<div class="cnblogs_code">
<pre>$insert = "insert into books(bookname, publisher, author, price, detail) values
('PHP','电子工业出版社','张三','80.00','PHP相关'),
('ASP','电子工业出版社','李四','90.00','ASP相关'),
('JSP','电子工业出版社','王五','70.00','JSP相关')";</pre>
</div>

　　使用mysql_query()函数发送INSERT语句，如果成功返回true，失败则返回false

<div class="cnblogs_code">
<pre>$result = mysql_query($insert);
var_dump($result);</pre>
</div>

![mysqlSpread3](https://pic.xiaohuochai.site/blog/php_mysqlSpread3.jpg)


**mysql_affected_rows()**

　　mysql_affected_rows()函数用于取得前一次 MySQL 操作所影响的记录行数。执行成功则返回受影响的行的数目，如果最近一次查询失败的话，函数返回 -1

<div class="cnblogs_code">
<pre>int mysql_affected_rows ([ resource $link_identifier = NULL ] )</pre>
</div>
<div class="cnblogs_code">
<pre>var_dump(mysql_affected_rows());//int3 </pre>
</div>

　　通常通过判断mysql_affected_rows()函数的值是否大于0来确定数据操作是否成功

**mysql_insert_id()**

　　mysql_insert_id()函数用来取得上一步 INSERT 操作产生的 ID

<div class="cnblogs_code">
<pre>int mysql_insert_id ([ resource $link_identifier ] )</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;?php
$insert = "insert into books(bookname, publisher, author, price, detail) values
('PHP','电子工业出版社','张三','80.00','PHP相关'),
('ASP','电子工业出版社','李四','90.00','ASP相关'),
('JSP','电子工业出版社','王五','70.00','JSP相关')";
$result = mysql_query($insert);
if($result &amp;&amp; mysql_affected_rows() &gt; 0){
    //刷新页面两次后，相当于插入了两次数据。页面显示数据记录插入成功，最后一条插入的数据记录id为:4
    echo "数据记录插入成功，最后一条插入的数据记录id为:".mysql_insert_id()."&lt;br&gt;";
}else{
    //若在数据表删除后，则显示数据记录插入失败，错误号：1146，错误原因：La table 'bookstore.books' n'existe pas
    echo "数据记录插入失败，错误号：".mysql_errno()."，错误原因：".mysql_error()."&lt;br&gt;";
}
?&gt;</pre>
</div>

　　实际上，最后一个id应该为6，但是由于4、5、6三条语句是同时插入的，这时显示的是第一个id为4


![mysqlSpread4](https://pic.xiaohuochai.site/blog/php_mysqlSpread4.jpg)


　　下面，将id为4的记录的作者修改为小白

<div class="cnblogs_code">
<pre>$result = mysql_query("UPDATE books SET author='小白' WHERE id='4'");
if($result &amp;&amp; mysql_affected_rows() &gt; 0){

    echo "数据记录修改成功&lt;br&gt;";
}else{
    echo "数据记录修改失败，错误号：".mysql_errno()."，错误原因：".mysql_error()."&lt;br&gt;";
}</pre>
</div>

![mysqlSpread5](https://pic.xiaohuochai.site/blog/php_mysqlSpread5.jpg)


　　下面，删除作者为李四的记录

<div class="cnblogs_code">
<pre>$result = mysql_query("DELETE FROM books WHERE author='李四'");
if($result &amp;&amp; mysql_affected_rows() &gt; 0){

    echo "数据记录删除成功&lt;br&gt;";
}else{
    echo "数据记录删除失败，错误号：".mysql_errno()."，错误原因：".mysql_error()."&lt;br&gt;";
}</pre>
</div>

![mysqlSpread6](https://pic.xiaohuochai.site/blog/php_mysqlSpread6.jpg)


&nbsp;

### 处理结果集

　　在PHP脚本中执行SELECT查询命令，也是调用mysql_query()函数，但和执行DML不同的是，执行SELECT命令之后，mysql_query()函数的返回值是一个PHP资源的引用指针(结果集)。这个返回值可以在各种结果集处理函数中，对结果数据表的各个字段进行处理

**mysql_num_fields()**

　　mysql_num_fields()函数取得结果集中字段的数目

<div class="cnblogs_code">
<pre>int mysql_num_fields ( resource $result )</pre>
</div>

**mysql_num_rows()**

　　mysql_num_rows()函数取得结果集中行的数目

<div class="cnblogs_code">
<pre>int mysql_num_rows ( resource $result )</pre>
</div>
<div class="cnblogs_code">
<pre>$result = mysql_query("SELECT * FROM books");
$rows = mysql_num_rows($result);
$cols = mysql_num_fields($result);
var_dump($rows,$cols);//int 4 int 8</pre>
</div>

　　从结果中可以看出，该结果集总共有4行8列

![mysqlSpread7](https://pic.xiaohuochai.site/blog/php_mysqlSpread7.jpg)


　　如果需要访问结果集中的数据，可以选用mysql_fetch_row()、mysql_fetch_assoc()、mysql_fetch_array()、mysql_fetch_object()这4个函数中的任意一个

**mysql_fetch_row()**

　　mysql_fetch_row()函数从结果集中取得一行作为枚举数组

<div class="cnblogs_code">
<pre>array mysql_fetch_row ( resource $result )</pre>
</div>

　　如果需要访问结果集中的数据，可以选用mysql_fetch_row()、mysql_fetch_assoc()、mysql_fetch_array()、mysql_fetch_object()这4个函数中的任意一个

**mysql_fetch_row()**

　　mysql_fetch_row()函数从结果集中取得一行作为枚举数组

<div class="cnblogs_code">
<pre>array mysql_fetch_row ( resource $result )</pre>
</div>
<div class="cnblogs_code">
<pre>$result = mysql_query("SELECT * FROM books");
$row = mysql_fetch_row($result);
//Array ( [0] =&gt; 1 [1] =&gt; PHP [2] =&gt; 电子工业出版社 [3] =&gt; 张三 [4] =&gt; 80.00 [5] =&gt; 0 [6] =&gt; [7] =&gt; PHP相关 )
print_r($row);
$row = mysql_fetch_row($result);
//Array ( [0] =&gt; 3 [1] =&gt; JSP [2] =&gt; 电子工业出版社 [3] =&gt; 王五 [4] =&gt; 70.00 [5] =&gt; 0 [6] =&gt; [7] =&gt; JSP相关 )
print_r($row);</pre>
</div>

**mysql_fetch_assoc()**

　　mysql_fetch_assoc()函数从结果集中取得一行作为关联数组

<div class="cnblogs_code">
<pre>array mysql_fetch_assoc ( resource $result )</pre>
</div>
<div class="cnblogs_code">
<pre>$result = mysql_query("SELECT * FROM books");
$assoc = mysql_fetch_assoc($result);
//Array ( [id] =&gt; 1 [bookname] =&gt; PHP [publisher] =&gt; 电子工业出版社 [author] =&gt; 张三 [price] =&gt; 80.00 [ptime] =&gt; 0 [pic] =&gt; [detail] =&gt; PHP相关 )
print_r($assoc);
$assoc = mysql_fetch_assoc($result);
//Array ( [id] =&gt; 3 [bookname] =&gt; JSP [publisher] =&gt; 电子工业出版社 [author] =&gt; 王五 [price] =&gt; 70.00 [ptime] =&gt; 0 [pic] =&gt; [detail] =&gt; JSP相关 )
print_r($assoc);</pre>
</div>

**mysql_fetch_array()**

　　mysql_fetch_array()函数从结果集中取得一行作为关联数组，或数字数组，或二者兼有。mysql_fetch_array() 中可选的第二个参数 result_type 是一个常量，可以接受以下值：MYSQL_ASSOC，MYSQL_NUM 和 MYSQL_BOTH，默认值是 MYSQL_BOTH

<div class="cnblogs_code">
<pre>array mysql_fetch_array ( resource $result [, int $ result_type ] )</pre>
</div>
<div class="cnblogs_code">
<pre>$result = mysql_query("SELECT * FROM books");
$array = mysql_fetch_array($result);
//Array ( [0] =&gt; 1 [id] =&gt; 1 [1] =&gt; PHP [bookname] =&gt; PHP [2] =&gt; 电子工业出版社 [publisher] =&gt; 电子工业出版社 [3] =&gt; 张三 [author] =&gt; 张三 [4] =&gt; 80.00 [price] =&gt; 80.00 [5] =&gt; 0 [ptime] =&gt; 0 [6] =&gt; [pic] =&gt; [7] =&gt; PHP相关 [detail] =&gt; PHP相关 )
print_r($array);
$array = mysql_fetch_array($result);
// Array ( [0] =&gt; 3 [id] =&gt; 3 [1] =&gt; JSP [bookname] =&gt; JSP [2] =&gt; 电子工业出版社 [publisher] =&gt; 电子工业出版社 [3] =&gt; 王五 [author] =&gt; 王五 [4] =&gt; 70.00 [price] =&gt; 70.00 [5] =&gt; 0 [ptime] =&gt; 0 [6] =&gt; [pic] =&gt; [7] =&gt; JSP相关 [detail] =&gt; JSP相关 )
print_r($array);</pre>
</div>

**mysql_fetch_object()**

　　mysql_fetch_object()函数从结果集中取得一行作为对象

<div class="cnblogs_code">
<pre>object mysql_fetch_object ( resource $result )</pre>
</div>
<div class="cnblogs_code">
<pre>$result = mysql_query("SELECT * FROM books");
$object = mysql_fetch_object($result);
//stdClass Object ( [id] =&gt; 1 [bookname] =&gt; PHP [publisher] =&gt; 电子工业出版社 [author] =&gt; 张三 [price] =&gt; 80.00 [ptime] =&gt; 0 [pic] =&gt; [detail] =&gt; PHP相关 )
print_r($object);
$object = mysql_fetch_object($result);
//stdClass Object ( [id] =&gt; 3 [bookname] =&gt; JSP [publisher] =&gt; 电子工业出版社 [author] =&gt; 王五 [price] =&gt; 70.00 [ptime] =&gt; 0 [pic] =&gt; [detail] =&gt; JSP相关 )
print_r($object);</pre>
</div>

　　对于上面的四个函数来说，默认指针都指向第一行记录。在获取一行记录后，指针会自动下移。如果是最后一委，则函数返回false。一般地，mysql_fetch_assoc()这种返回关联数组形式的函数较常用

**mysql_data_seek()**

　　mysql_data_seek()函数可以移动内部结果的指针

　　[注意]$row_number从0开始

<div class="cnblogs_code">
<pre>bool mysql_data_seek ( resource $result , int $row_number )</pre>
</div>
<div class="cnblogs_code">
<pre>$result = mysql_query("SELECT * FROM books");
$assoc = mysql_fetch_assoc($result);
mysql_data_seek($result , 2);
$assoc = mysql_fetch_assoc($result);
Array ( [id] =&gt; 4 [bookname] =&gt; PHP [publisher] =&gt; 电子工业出版社 [author] =&gt; 小白 [price] =&gt; 80.00 [ptime] =&gt; 0 [pic] =&gt; [detail] =&gt; PHP相关 )
print_r($assoc);
mysql_data_seek($result , 0);
$assoc = mysql_fetch_assoc($result);
//Array ( [id] =&gt; 1 [bookname] =&gt; PHP [publisher] =&gt; 电子工业出版社 [author] =&gt; 张三 [price] =&gt; 80.00 [ptime] =&gt; 0 [pic] =&gt; [detail] =&gt; PHP相关 )
print_r($assoc);</pre>
</div>

　　下面使用while循环和mysql_fetch_assoc()函数将结果集以表格的形式显示出来

<div class="cnblogs_code">
<pre>&lt;style&gt;
.table{
    border:1px solid black;
    border-collapse:collapse;
    table-layout:fixed;
}
&lt;/style&gt;

$result = mysql_query("SELECT id,bookname,publisher,author,price FROM books");
echo '&lt;table border="1" width="800" class="table"&gt;';
echo '&lt;tr&gt;';
echo '&lt;th&gt;编号&lt;/th&gt;';
echo '&lt;th&gt;书名&lt;/th&gt;';
echo '&lt;th&gt;出版社&lt;/th&gt;';
echo '&lt;th&gt;作者&lt;/th&gt;';
echo '&lt;th&gt;价格&lt;/th&gt;';
echo '&lt;/tr&gt;';
while($assoc = mysql_fetch_assoc($result)) {
    echo '&lt;tr&gt;';
    echo "&lt;td&gt;{$assoc['id']}&lt;/td&gt;";
    echo "&lt;td&gt;{$assoc['bookname']}&lt;/td&gt;";
    echo "&lt;td&gt;{$assoc['publisher']}&lt;/td&gt;";
    echo "&lt;td&gt;{$assoc['author']}&lt;/td&gt;";
    echo "&lt;td&gt;{$assoc['price']}&lt;/td&gt;";
    echo '&lt;/tr&gt;';
}
echo '&lt;/table&gt;';</pre>
</div>

![mysqlSpread8](https://pic.xiaohuochai.site/blog/php_mysqlSpread8.jpg)


**mysql_free_result()**

　　mysql_free_result()函数用于释放结果内存

<div class="cnblogs_code">
<pre>bool mysql_free_result ( resource $result )</pre>
</div>

　　mysql_free_result() 仅需要在考虑到返回很大的结果集时会占用多少内存时调用。在脚本结束后所有关联的内存都会被自动释放

&nbsp;

### 关闭数据库连接

**mysql_close()**

　　mysql_close()函数用于关闭 MySQL 连接

<div class="cnblogs_code">
<pre>bool mysql_close ([ resource $link_identifier = NULL ] )</pre>
</div>

　　mysql_close() 关闭指定的连接标识所关联的到 MySQL 服务器的非持久连接。如果没有指定 link_identifier，则关闭上一个打开的连接

　　所以，一个比较完整的php操作数据库扩展函数的程序如下所示

<div class="cnblogs_code">
<pre>&lt;?php
//连接数据库
$link = mysql_connect('localhost','root','******');
if(!$link){
    die('连接失败：'.mysql_error());
}
//选择数据库
mysql_select_db('bookstore',$link) or die('不能选定数据库bookstore:' .mysql_error());

//执行SQL命令
$insert = "insert into books(bookname, publisher, author, price, detail) values
('PHP','电子工业出版社','张三','80.00','PHP相关'),
('ASP','电子工业出版社','李四','90.00','ASP相关'),
('JSP','电子工业出版社','王五','70.00','JSP相关')";
$result = mysql_query($insert);

//操作结果集
$result = mysql_query("SELECT id,bookname,publisher,author,price FROM books");
echo '&lt;table border="1" width="800" class="table"&gt;';
echo '&lt;tr&gt;';
echo '&lt;th&gt;编号&lt;/th&gt;';
echo '&lt;th&gt;书名&lt;/th&gt;';
echo '&lt;th&gt;出版社&lt;/th&gt;';
echo '&lt;th&gt;作者&lt;/th&gt;';
echo '&lt;th&gt;价格&lt;/th&gt;';
echo '&lt;/tr&gt;';
while($assoc = mysql_fetch_assoc($result)) {
    echo '&lt;tr&gt;';
    echo "&lt;td&gt;{$assoc['id']}&lt;/td&gt;";
    echo "&lt;td&gt;{$assoc['bookname']}&lt;/td&gt;";
    echo "&lt;td&gt;{$assoc['publisher']}&lt;/td&gt;";
    echo "&lt;td&gt;{$assoc['author']}&lt;/td&gt;";
    echo "&lt;td&gt;{$assoc['price']}&lt;/td&gt;";
    echo '&lt;/tr&gt;';
}
echo '&lt;/table&gt;';

//释放结果集
mysql_free_result($result);
//关闭数据库连接
mysql_close($link);
?&gt;</pre>
</div>
