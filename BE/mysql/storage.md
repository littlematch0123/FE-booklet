# mysql存储

　　我们经常会对数据表进行插入、删除、更新及查找的工作，即我们常说的CURD。其实，当我们输入命令时，mysql引擎会按照下图进行操作


![storage1](https://pic.xiaohuochai.site/blog/php_storage1.jpg)

　　如果我们省略了分析和编译的环节，那么执行效率将大大提高。这就需要下面介绍的存储来实现

&nbsp;

### 存储过程

　　存储过程是SQL语句和控制语句的预编译集合，以一个名称存储并作为一个单元处理。存储过程存储在数据库内，可以由应用程序调用执行，允许用户声明明变量以及进行流程控制。存储过程可以接收参数（输入类型参数、输出类型参数），可以存在多个返回值。所以，存储过程的执行效率高于单一SQL命令的执行效率

**优点**

　　1、增强SQL语句的功能和灵活性

　　2、实现较快的执行速度。客户端第一次调用存储过程时，MySQL引擎会对其进行语法分析、编译等操作，然后将编译结果存储到内存中，所以第一次和之前的效率一样，然而以后会直接调用内存中的编译结果，效率提高

　　3、减少网络流量。单条SQL语句字符量较大，而通过调用存储过程则只需要传存储过程的名称及相关参数即可，提交给服务器的数据量相对较少

**语法结构**

<div class="cnblogs_code">
<pre>CREATE
[DEFINER = { user | CURRENT_USER }]  
PROCEDURE sp_name([proc_parameter[,...]])  
[characteristic ...] routine_body</pre>
</div>
<div class="cnblogs_code">
<pre>proc_parameter:
[ IN | OUT | INOUT ] param_name type </pre>
</div>

　　IN表示该参数的值必须在调用存储过程时指定，不能返回 &nbsp; &nbsp;

　　OUT表示该参数的值可以被存储过程改变，并且可以返回 &nbsp; &nbsp;

　　INOUT表示该参数在调用时指定，并且可以被改变和返回

**characteristic(特性)**

<div class="cnblogs_code">
<pre>COMMENT 'string'
|{CONTAINS SQL | NO SQL | READS SQL DATA | MODIFIES SQL DATA }
| SQL SECURITY {DEFINER | INVOKER}</pre>
</div>

　　COMMENT:注释

　　CONTAINS SQL:包含SQL语句，但不包含读或写数据的语句

　　NO SQL:不包含SQL语句

　　READS SQL DATA:包含读数据的语句

　　MODIFIES SQL DATA:包含写数据的语句

　　SQL SECURITY {DEFINER | INVOKER}:指明谁有权限来执行

**过程体**

　　1.过程体由合法的SQL语句构成；

　　2.过程体可以是&ldquo;任意&rdquo;SQL语句（这里的任意主要是指对记录的增删改查，多表连接）；

　　3.过程体如果为复合结构，则使用BEGIN...END语句；

　　4.复合结构可以包含声明，循环，控制结构

**创建没有参数的存储过程**

<div class="cnblogs_code">
<pre>CREATE PROCEDURE sp1() SELECT VERSION();</pre>
</div>

**调用存储过程**

　　方式一：CALL sp_name([parameter[,...]]) 如果存储过程包含参数，则必须有小括号

　　方式二：CALL sp_name[()] 如果存储过程不包含参数，则小括号可有可无


![storage2](https://pic.xiaohuochai.site/blog/php_storage2.jpg)

**修改存储过程**

<div class="cnblogs_code">
<pre>ALTER PROCEDURE sp_name [characteristic ...]
COMMENT 'string'
|{ CONTAINS SQL | NO SQL | READS SQL DATA | MODIFIES SQL DATA }
| SQL SECURITY { DEFINER | INVOKER }</pre>
</div>

　　只能修改存储过程中的注释、当前内容的类型，并不能修改过程体。要修改过程体的话，需要先删除存储过程，然后重建

**删除存储过程**

<div class="cnblogs_code">
<pre>DROP PROCEDURE [IF EXISTS] sp_name</pre>
</div>

**创建带有IN类型的存储过程**

<div class="cnblogs_code">
<pre>DELIMITER //
CREATE PROCEDURE removeUserById(IN p_id INT UNSIGNED)
BEGIN
DELETE FROM users WHERE id = p_id;
END//
DELIMITER;</pre>
</div>

![storage3](https://pic.xiaohuochai.site/blog/php_storage3.jpg)

　　下面来调用存储过程


![storage4](https://pic.xiaohuochai.site/blog/php_storage4.jpg)

**创建带有IN和OUT类型参数的存储过程**

<div class="cnblogs_code">
<pre>DELIMITER //
CREATE PROCEDURE removeAndReturnUsersNums(IN p_id INT UNSIGNED,OUT userNums INT UNSIGNED)
BEGIN
DELETE FROM users WHERE id = p_id;
SELECT count(id) FROM users INTO userNums;
END
//
DELIMITER ;</pre>
</div>

![storage5](https://pic.xiaohuochai.site/blog/php_storage5.jpg)

**mysql变量分类　**

　　1.用户变量：以"@"开始，形式为"@变量名"

　　用户变量跟mysql客户端是绑定的，设置的变量，只对当前用户使用的客户端生效

<div class="cnblogs_code">
<pre>SET @i = 7;</pre>
</div>

　　2.全局变量：定义时，以如下两种形式出现，set GLOBAL 变量名或者set @@global.变量名&nbsp;

　　对所有客户端生效。只有具有super权限才可以设置全局变量

　　3.会话变量：只对连接的客户端有效

　　4.局部变量：作用范围在begin到end语句块之间。在该语句块里设置的变量

　　declare语句专门用于定义局部变量。set语句是设置不同类型的变量，包括会话变量和全局变量

　　下面来调用存储过程

<div class="cnblogs_code">
<pre>CALL removeAndReturnUsersNums(1,@nums);</pre>
</div>

![storage6](https://pic.xiaohuochai.site/blog/php_storage6.jpg)

![storage7](https://pic.xiaohuochai.site/blog/php_storage7.jpg)

**创建带有多个OUT类型参数的存储过程**

<div class="cnblogs_code">
<pre>DELIMITER //
CREATE PROCEDURE removeUserByAgeAndReturnInfos(IN p_age SMALLINT UNSIGNED,OUT deleteUsers SMALLINT UNSIGNED, OUT userCounts SAMLLINT UNSIGNED)
BEGIN
DELETE FROM users WHERE age = p_age;
SELECT ROW_COUNT() INTO deleteUsers;
SELECT COUNT(id) FROM users INTO userCounts;
END
//
DELIMITER ;</pre>
</div>

　　[注意]ROW_COUNT()函数用来得到插入、删除以及更新的被影响的记录总数


![storage8](https://pic.xiaohuochai.site/blog/php_storage8.jpg)

![storage9](https://pic.xiaohuochai.site/blog/php_storage9.jpg)

　　下面来调用存储过程

<div class="cnblogs_code">
<pre>CALL removeUserByAgeAndReturnInfos(20,@a,@b);</pre>
</div>

　　[注意]@a表示删除的记录数，@b表示剩余的记录数

<div class="cnblogs_code">
<pre>SELECT @a,@b;</pre>
</div>

![storage10](https://pic.xiaohuochai.site/blog/php_storage10.jpg)

**存储过程与自定义函数的区别**

　　1.存储过程实现的功能要复杂一些；而函数的针对性更强

　　2.存储过程可以返回多个值；函数只能有一个返回值

　　3.存储过程一般独立的来执行；而函数主要作为其他SQL语句的组成部分来出现

&nbsp;

### 存储引擎

　　MySQL可以将数据以不同的技术存储在文件（内存）中，这种技术就称为存储引擎。每一种存储引擎使用不同的存储机制、索引技巧、锁定水平，最终提供广泛且不同的功能

　　在关系型数据库中，数据的存储是以表的形式来实现的。所以，存储引擎也可以称为表类型。所以，实际上，存储引擎就是一种存储数据、查询数据的技术

　　MySQL支持的存储引擎包括MyISAM、InnoDB、Memory、CSV、Archive

**并发控制**　

　　并发控制是指当多个连接对记录进行修改时保证数据的一致性和完整性

　　例如：两个用户同时登录并操作数据库，其中一个用户删除某条记录，而另一个用户读取该条记录，这就需要并发控制，否则会报错或返回无效信息

　　在处理并发'读'或'写'操作时，MySQL通过锁系统实现并发控制，包括共享锁和排他锁

　　-共享锁(读锁)：在同一时间段内，多个用户可以读取同一个资源，读取过程中数据不会发生任何变化

　　-排他锁(写锁)：在任何时候只能有一个用户写入资源，当进行写锁时会阻塞其他的读锁或者写锁操作

　　锁颗粒(也称为锁力度)是指锁定时的单位。只需要对修改的数据精确加锁就可以，而无需对所有资源都加锁

　　加锁会增加系统开销，所以需要通过锁策略，在锁开销和系统安全之间寻找平衡。mysql锁策略包括表锁和行锁两种策略

　　- 表锁，是一种开销最小的锁策略

　　- 行锁，是一种开销最大的锁策略

**事务处理**

　　事务是数据库区别于文件系统的重要特征之一，事务主要用于保证数据库的完整性

　　事务特性包括：原子性(Atomicity)、一致性(Consistency)、隔离性(Isolation)、持久性(Durability)，简写为ACID

**索引**

　　索引是对数据表中一列或多列的值进行排序的一种结构，使用索引可以快速访问数据表的特定信息。索引是记录快速定位的一种方法，类似于书的目录

　　索引包括普通索引、唯一索引、全文索引、btree之索引、hash索引等

**各种存储引擎的特点**


![storage11](https://pic.xiaohuochai.site/blog/php_storage11.jpg)

　　除了上面这几种存储引擎之外，还有下面几种不太常见的引擎

　　CSV存储引擎不支持索引，逗号分隔值(Comma-Separated Values，CSV，有时也称为字符分隔值，因为分隔字符也可以不是逗号)，其文件以纯文本形式存储表格数据（数字和文本）。纯文本意味着该文件是一个字符序列，不含必须像二进制数字那样被解读的数据。CSV文件由任意数目的记录组成，记录间以某种换行符分隔

　　BlackHole也叫黑洞引擎，写入的数据都会消失，一般用于做数据复制的中继

　　MyISAM引擎适合于事物处理不多的情况

修改存储引擎

　　1、通过修改MySQL的配置文件实现

<div class="cnblogs_code">
<pre>default-storage-engine = engine</pre>
</div>

　　2、通过创建数据表命令实现

<div class="cnblogs_code">
<pre>CREATE TABLE table_name(
  ...
) ENGINE = engine;</pre>
</div>

![storage12](https://pic.xiaohuochai.site/blog/php_storage12.jpg)

　　3、通过修改数据表命令实现

<div class="cnblogs_code">
<pre>ALTER TABLE table_name ENGINE [=] engine_name;</pre>
</div>

![storage13](https://pic.xiaohuochai.site/blog/php_storage13.jpg)
