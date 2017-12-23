# PDO基础操作

　　PDO(php data object)扩展类库为php访问数据库定义了轻量级的、一致性的接口，它提供了一个数据库访问抽象层，这样，无论使用什么数据库，都可以通过一致的函数执行查询和获取数据，大大简化了数据库的操作，并能够屏蔽不同数据库之间的差异，使用PDO可以很方便地进行跨数据库程序的开发，以及不同数据库间的移植，是将来php在数据库处理方面的主要发展方向，它可以支持mysql、postgresql、oracle、mssql等多种数据库

&nbsp;

### 创建PDO对象

　　使用PDO在与不同数据库管理系统之间交互时，PDO对象中的成员方法是统一各种数据库的访问接口，所以在使用PDO与数据库进行交互之前，首先要创建一个PDO对象。在通过构造方法创建对象的同时，需要建立一个与数据库服务器的连接，并选择一个数据库

　　PDO的构造方法原型如下

<div class="cnblogs_code">
<pre>__construct ( string $dsn [,string $username [,string $password [,array $driver_options ]]] )</pre>
</div>

　　在构造方法中，第一个必选的参数是数据源名(dsn)，用来定义一个确定的数据库和必须用到的驱动程序。DSN的PDO命名惯例为PDO驱动程序的名称，后面为一个冒号，再后面是可选的驱动程序的数据库连接变量信息，如主机名、端口和数据库名

　　构造方法中的第二个参数username和第三个参数password分别指定用于连接数据库的用户名和密码。最后一个参数driver_options需要一个数组，用来指定连接所需的所有额外选项，传递附加的调优参数到PDO或底层驱动程序

<div class="cnblogs_code">
<pre>/*连接如果失败，使用异常处理模式进行捕获 */
$dsn = 'mysql:dbname=pdotest;host=127.0.0.1'; //连接MySQL数据库的DSN 
$user = 'root'; //MySQL数据库的用户名
$password = '*****'; //MySQL数据库的密码
try { 
     $dbh = new PDO($dsn, $user, $password); 
} catch (PDOException $e) { 
      echo '数据库连接失败： ' . $e-&gt;getMessage(); 
}</pre>
</div>

　　在创建PDO对象时，有一些与数据库连接相关的选项，可以将必要的几个选项组成数据传递给构造方法的第四个参数driver_opts中，用来传递附加的调优参数到PDO或底层驱动程序

<div class="cnblogs_code">
<pre> PDO::ATTR_AUTOCOMMIT): PDO是否关闭自动提交功能
 PDO::ATTR_ERRMODE): 当前PDO的错误处理的模式 
 PDO::ATTR_CASE): 表字段字符的大小写转： 
 PDO::ATTR_CONNECTION_STATUS): 与连接状态相关特有信息： 
 PDO::ATTR_ORACLE_NULLS): 空字符串转换为SQL的null 
 PDO::ATTR_PERSISTENT): 应用程序提前获取数据大 
 PDO::ATTR_SERVER_INFO): 与数据库特有的服务器信 
 PDO::ATTR_SERVER_VERSION): 数据库服务器版本号信息
 PDO::ATTR_CLIENT_VERSION): 数据库客户端版本号信息 </pre>
</div>
<div class="cnblogs_code">
<pre>//设置持久连接的选项数组作为最后一个参数,可以一起设置多个元素 
$opt = array(PDO::ATTR_PERSISTENT =&gt; true);　　 
try { 
       $db = new PDO('mysql:dbname=pdotest;host=127.0.0.1'，'root'，'*****',$opt); 
} catch (PDOException $e) { 
       echo "数据库连接失败： " .$e-&gt;getMessage(); 
}</pre>
</div>

&nbsp;

### 使用PDO对象

**调整PDO的行为属性**

　　在PDO对象中有很多属性用来调整PDO的行为或获取底层驱动程序状态。如果在创建PDO对象时，没有在构造方法中最后一个参数过属性选项，也可以在对象创建完成之后，通过PDO对象中的setAttribute()和getAttribute()方法设置和获取这些属性的值

**PDO::getAttribute()**

　　PDO::getAttribute()用于取回一个数据库连接的属性

<div class="cnblogs_code">
<pre>mixed PDO::getAttribute ( int $attribute )</pre>
</div>

**PDO::setAttribute()**

　　PDO::setAttribute()用于设置属性

<div class="cnblogs_code">
<pre>bool PDO::setAttribute ( int $attribute , mixed $value )</pre>
</div>
<div class="cnblogs_code">
<pre>$dbh-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//$dbh-&gt;setAttribute(3,2); 
$dbh-&gt;setAttribute(PDO::ATTR_AUTOCOMMIT,0);//$dbh-&gt;setAttribute(0,0); 
$dbh-&gt;setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
//$dbh-&gt;setAttribute(19,2); 

echo "\nPDO是否关闭自动提交功能：". $dbh-&gt;getAttribute(PDO::ATTR_AUTOCOMMIT);
echo "\n当前PDO的错误处理的模式：". $dbh-&gt;getAttribute(PDO::ATTR_ERRMODE); 
echo "\n表字段字符的大小写转换： ". $dbh-&gt;getAttribute(PDO::ATTR_CASE); 
echo "\n与连接状态相关特有信息： ". $dbh-&gt;getAttribute(PDO::ATTR_CONNECTION_STATUS); 
echo "\n空字符串转换为SQL的null：". $dbh-&gt;getAttribute(PDO::ATTR_ORACLE_NULLS); 
echo "\n应用程序提前获取数据大小：".$dbh-&gt;getAttribute(PDO::ATTR_PERSISTENT); 
echo "\n与数据库特有的服务器信息：".$dbh-&gt;getAttribute(PDO::ATTR_SERVER_INFO); 
echo "\n数据库服务器版本号信息：". $dbh-&gt;getAttribute(PDO::ATTR_SERVER_VERSION);
echo "\n数据库客户端版本号信息：". $dbh-&gt;getAttribute(PDO::ATTR_CLIENT_VERSION); </pre>
</div>

**错误处理**

　　PDO一共提供了三种不同的错误处理模式，不仅可以满足不同风格的编程，也可以调整扩展处理错误的方式

**PDO:ERRORMODE_SILENT**

　　这是默认模式，在错误发生时不进行任何操作，PDO将只设置错误代码。开发人员可以通过PDO对象中的errorCode()和errorInfo()方法对语句和数据库对象进行检查。如果错误是由于对语句对象的调用而产生的，那么可以在那个语句对象上调用errorCode()或errorInfo()方法。如果错误是由于调用数据库对象而产生的，那么可以在那个数据库对象上调用上述两个方法

**PDO:ERRMODE_WARNING**

　　除了设置错误代码以外，PDO还将发出一条PHP传统的E_WARNING消息，可以使用常规的PHP错误处理程序捕获该警告。如果只是想看看发生了什么问题，而无意中断应用程序的流程，那么在调试或测试中这种设置很有用

<div class="cnblogs_code">
<pre>$dbh-&gt;setAttrbute(PDO::ATTR_ERRMODE,PDO::ERRMODE_WARNING);//设置警告模式处理错误</pre>
</div>

**PDO:ERRMODE_EXCEPTION**

　　除了设置错误代码以外，PDO还将抛出一个PDOException，并设置其属性，以反映错误代码和错误信息。这种设置在调试中也很有用，因为它会放大脚本中产生错误的地方，从而可以非常快速地指出代码中有问题的潜在区域。异常模式另一个有用的地方是，与传统的PHP风格的警告相比，可以更清晰地构造自己的错误处理，而且，比起以寂静方式及显式检查每个数据库调用的返回值，异常模式代码及嵌套代码也更少

<div class="cnblogs_code">
<pre>$dbh-&gt;setAttrbute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);//设置异常模式处理错误</pre>
</div>

**执行SQL语句**

　　在使用PDO执行查询数据之前，先提供一组相关的数据。创建PDO对象并通过mysql驱动连接mysql数据库服务器，创建一个以'testdb'命名的数据库，并在该数据库中创建一个联系人信息表contactInfo

<div class="cnblogs_code">
<pre>CREATE TABLE contactInfo(
    uid MEDIUMINT(8) UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    departmentID CHAR(3) NOT NULL,
    address VARCHAR(80) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(20),
    PRIMARY KEY(uid)
);</pre>
</div>

　　数据表contactInfo建立之后，向表中插入多行记录

<div class="cnblogs_code">
<pre>INSERT INTO contactInfo(name,departmentID,address,phone,email) VALUES ('张三','D01','朝阳','15011111234','zs@aaa.com'),('李四','D02','朝阳','15011112345','ls@aaa.com'),('王五','D02','海淀','15011113456','ww@aaa.com'),('赵四','D01','海淀','15011114567','zx@aaa.com');</pre>
</div>

![PDOBase1](https://pic.xiaohuochai.site/blog/php_pdobase1.jpg)

**PDO::exec()**

　　PDO::exec()函数执行一条SQL语句，并返回受影响的行数

<div class="cnblogs_code">
<pre>int PDO::exec ( string $statement )</pre>
</div>

　　当执行INSERT、UPDATE、DELETET等没有结果集的查询时，使用PDO对象中的exec()方法去执行。该方法成功执行后，将返回受影响的行数

<div class="cnblogs_code">
<pre>&lt;?php
try {
    //创建对象
    $dbh = new PDO("mysql:host=localhost;dbname=testdb", "root", "zhiaihebe0123");
}catch(PDOException $e) {
    echo "数据库连接失败：".$e-&gt;getMessage();
    exit;
}

$query = "UPDATE contactInfo SET phone='12345678900' WHERE name='张三'";
$affected = $dbh-&gt;exec($query);
if($affected){
    //数据表contactInfo中受影响的行数为:1
    echo '数据表contactInfo中受影响的行数为:' .$affected;
}else{
    print_r($dbh-&gt;errorInfo());
}
$query = "UPDATE contactInfo SET phone='123456789' WHERE (uid%2 = 0)";
$affected = $dbh-&gt;exec($query);
if($affected){
    //数据表contactInfo中受影响的行数为:2
    echo '数据表contactInfo中受影响的行数为:' .$affected;
}else{
    print_r($dbh-&gt;errorInfo());
}
?&gt;</pre>
</div>

![PDOBase2](https://pic.xiaohuochai.site/blog/php_pdobase2.jpg)

**PDO::lastInsertId()**

　　PDO::lastInsertId()函数用于返回最后插入行的ID或序列值

<div class="cnblogs_code">
<pre>string PDO::lastInsertId ([ string $name = NULL ] )</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;?php
try {
    //创建对象
    $dbh = new PDO("mysql:host=localhost;dbname=testdb", "root", "zhiaihebe0123");
}catch(PDOException $e) {
    echo "数据库连接失败：".$e-&gt;getMessage();
    exit;
}

try{
    $query = "INSERT INTO contactInfo(name,departmentID,phone,email) VALUES ('诸葛','D03','120120120','zg@aaa.com')";
    $affected = $dbh-&gt;exec($query);    
    echo $affected."&lt;br&gt;";//1
    echo $dbh-&gt;lastInsertId();//5
}catch(PDOException $e){
    echo "错误：" .$e-&gt;getMessage();
}
?&gt;</pre>
</div>

![PDOBase3](https://pic.xiaohuochai.site/blog/php_pdobase3.jpg)

**PDO::query()**

　　当执行返回结果集的SELECT查询时，或者所影响的行数无关紧要时，应当使用PDO对象中的query()方法。如果该方法成功执行指定的查询，则返回一个PDOStatement对象。如果使用了query()方法，并想了解获取的数据行总数，可以使用PDOStatement对象中的rowCount()方法获取

**PDOStatement::rowCount()**

　　PDOStatement::rowCount()函数返回受上一个 SQL 语句影响的行数

<div class="cnblogs_code">
<pre>int PDOStatement::rowCount ( void )</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;?php
try {
    //创建对象
    $dbh = new PDO("mysql:host=localhost;dbname=testdb", "root", "zhiaihebe0123");
}catch(PDOException $e) {
    echo "数据库连接失败：".$e-&gt;getMessage();
    exit;
}
$query = "SELECT name,phone,email FROM contactInfo WHERE departmentId='D01'";
try{
    $pdostatement = $dbh-&gt;query($query);    
    echo "一共从表中获取到".$pdostatement-&gt;rowCount()."条记录:&lt;br&gt;";
    foreach($pdostatement as $row){
        echo $row['name'] ."\t";
        echo $row['phone'] ."\t";
        echo $row['email'] ."&lt;br&gt;";
    }
}catch (PDOException $e){
    echo $e-&gt;getMessage();
}
?&gt;</pre>
</div>

![PDOBase4](https://pic.xiaohuochai.site/blog/php_pdobase4.jpg)

&nbsp;

### 事务处理

　　事务是确保数据库一致的机制，是一个或一系列的查询，作为一个单元的一组有序的数据库操作。如果组中的所有SQL语句都操作成功，则认为事务成功，事务则被提交，其修改将作用于所有其他数据库进程。即使在事务的组中只有一个环节操作失败，事务也不成功，则整个事务将被回滚，该事务中所有操作都被取消。事务功能是企业级数据库的一个重要部分，因为很多业务过程都包括多个步骤。如果任何一个步骤失败，则所有步骤都不应发生。事务处理有4个特征：原子性(Atomicity)、一致性(Consistency)、独立性(Isolation)和持久性(Durability)，即ACID。对于在一个事务中执行的任何工作，即使它是分阶段进行的，也一定可以保证该工作会安全地应用于数据库，并且在工作被提交时，不会受到其他连接的影响

　　MySQL目前只有InnoDB和BDB两个数据库表类型才支持事务，两个表类型具有相同的特性，InnoDB表类型具有比BDB还丰富的特性，速度更快，因此建议使用InnoDB表类型。创建InnoDB类型的表实际上与创建任何其他类型表的过程没有区别，如果数据库没有设置为默认的表类型，只要在创建时显式指定要将表创建为InnoDB类型

　　要实现事务处理，首先要使用InnoDB引擎

<div class="cnblogs_code">
<pre>ALTER TABLE contactInfo engine=innodb;</pre>
</div>

![PDOBase5](https://pic.xiaohuochai.site/blog/php_pdobase5.jpg)

　　在默认的情况下，MySQL是以自动提交(autocommit)模式运行的，这就意味着所执行的每一个语句都将立即写入数据库中。但如果使用事务安全的表格类型，是不希望有自动 提交的行为的，所以要在当前的会话中关闭自动提交

<div class="cnblogs_code">
<pre>SET AUTOCOMMIT = 0;//在当前的会话中关闭自动提交</pre>
</div>

　　如果提交被打开了，必须开启一个事务；如果自动提交是关闭的，则不需要使用这条命令，因为输入一个SQL命令时，一个事务将自动启动

<div class="cnblogs_code">
<pre>START TRANSACTION;//开启一个事务</pre>
</div>

　　在完成了一组事务的语句输入后，需要提交一个事务，该事务才能在其他会话中被其他用户所见

<div class="cnblogs_code">
<pre>COMMIT;//提交一个事务给数据库</pre>
</div>

　　如果改变注意，可以回滚到以前的状态

<div class="cnblogs_code">
<pre>ROOLBACK;//事务被回滚，所有操作都被取消</pre>
</div>

　　事务处理完成后，再次开启自动提交

<div class="cnblogs_code">
<pre>SET AUTOCOMMIT = 1;</pre>
</div>

![PDOBase6](https://pic.xiaohuochai.site/blog/php_pdobase6.jpg)

　　下面在PHP中进行事务处理操作，对张三和李四进行部门交换来轮岗培养

<div class="cnblogs_code">
<pre>&lt;?php
try {
    //创建对象
    $dbh = new PDO("mysql:host=localhost;dbname=testdb", "root", "zhiaihebe0123");
    //设置错误使用异常的模式
    $dbh -&gt; setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //关闭自动提交
    $dbh-&gt; setAttribute(PDO::ATTR_AUTOCOMMIT, 0);
}catch(PDOException $e) {
    echo "数据库连接失败：".$e-&gt;getMessage();
    exit;
}
try {
    //开启一个事务
    $dbh -&gt; beginTransaction();
    $affected_rows = $dbh-&gt;exec("UPDATE contactInfo set departmentID = 'D02' where uid=1");
    if($affected_rows &gt; 0) {
        echo "张三转岗成功!&lt;br&gt;";
    } else {
        throw new PDOException("张三转岗失败！&lt;br&gt;");
    }
    $affected_rows = $dbh-&gt; exec("UPDATE contactInfo set departmentID = 'D01' where uid=2");
    if($affected_rows) {
        echo "李四转岗成功!&lt;br&gt;";
    }else {
        throw new PDOException("李四转岗失败！&lt;br&gt;");
    }
    echo "轮岗成功!&lt;br&gt;";
    //提交以上的操作
    $dbh-&gt;commit();    
}catch(PDOException $e) {
    echo "错误：".$e-&gt;getMessage();
    echo "转岗失败!&lt;br&gt;";
    //撤销所有操作
    $dbh -&gt; rollback();
}
//运行完成以后， 最后开启自动提交
$dbh-&gt; setAttribute(PDO::ATTR_AUTOCOMMIT, 1);
?&gt;</pre>
</div>

![PDOBase7](https://pic.xiaohuochai.site/blog/php_pdobase7.jpg)
