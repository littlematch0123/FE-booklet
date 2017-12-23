# mysql多表操作

　　上一篇博文中介绍了[子查询](http://www.cnblogs.com/xiaohuochai/p/6077677.html)的相关内容，最后我们将查询结果存储到一个新的数据表中。下面我们将接着子查询的案例，详细介绍数据库中的多表操作

&nbsp;

### 准备工作

　　在上一篇博文，我们将[详细数据](http://7xpdkf.com1.z0.glb.clouddn.com/sqlData.txt)存储到tdb_goods数据表中，将详细数据中的类别信息存储到tdb_goods_cates数据表中

![multilist1](https://pic.xiaohuochai.site/blog/php_multilist1.jpg)

　　接下来，我们要研究如何通过tdb_goods_cates数据表来更新tdb_goods表

&nbsp;

### 多表更新

　　多表更新类似于单表更新

<div class="cnblogs_code">
<pre>UPDATE table_references SET col_name1={expr1|DEFAULT}
[,col_name2={expr2|DEFAULT}]...
[WHERE where_condition]</pre>
</div>

　　表的参照关系如下：

<div class="cnblogs_code">
<pre>table_reference
{[INNER | CROSS] JOIN |{LEFT|RIGHT} [OUTER] JOIN}
table_reference
ON conditional_expr</pre>
</div>

　　从结果中看出，tdb_goods数据表中goods_cate列中的值已经更新为tdb_goods_cates数据表中对应的cate_id的值。这样一来，用数字替代字符串，极大地节省了存储空间

![multilist2](https://pic.xiaohuochai.site/blog/php_multilist2.jpg)

&nbsp;

### 两步更新

　　在上面的多表更新的操作中，实际上我们经过了两个步骤，先创建了一个空表，将原数据表的查询结果写入空表，再利用写入结果的表反向更新原数据表

　　如果使用CREATE SELECT语句将可以实现两步更新，在创建数据表同时将查询结果写入到数据表(合并了CREATE和INSERT...SELECT两个操作步骤)，再利用写入结果的表反向更新原数据表

<div class="cnblogs_code">
<pre>CREATE TABLE [IF NOT EXISTS] tbl_name
[(create_definition,...)]
select_statement</pre>
</div>

　　下面来处理原数据表tdb_goods中的品牌信息，首先查询tdb_goods表的"品牌"，并分组

<div class="cnblogs_code">
<pre>SELECT brand_name FROM tdb_goods GROUP BY brand_name;</pre>
</div>

![multilist3](https://pic.xiaohuochai.site/blog/php_multilist3.jpg)

　　将品牌信息放入新表tdb_goods_brands中

<div class="cnblogs_code">
<pre>  CREATE TABLE tdb_goods_brands (
    brand_id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    brand_name VARCHAR(40) NOT NULL
  ) SELECT brand_name FROM tdb_goods GROUP BY brand_name;</pre>
</div>


![multilist4](https://pic.xiaohuochai.site/blog/php_multilist4.jpg)

　　再参照品牌表，更新原商品数据表

![multilist5](https://pic.xiaohuochai.site/blog/php_multilist5.jpg)

　　这里要注意的是，两张表中，同时存在brand_name这个字段。要区分它们，需要给它们起不同的别名或在字段前面加入表名

![multilist6](https://pic.xiaohuochai.site/blog/php_multilist6.jpg)

　　查看商品数据表的列结构，我们发现，虽然数据被修改为了数字，但数据类型仍然是字符型


![multilist7](https://pic.xiaohuochai.site/blog/php_multilist7.jpg)

　　下面修改商品数据表中goods_cate和brand_name的列名称和列类型


![multilist8](https://pic.xiaohuochai.site/blog/php_multilist8.jpg)

　　这样，我们已经将一个大的数据表分为小的数据表进行存储了。现在，分别在tdb_goods_cates和tdb_goods_brands表再插入几条新的记录

<div class="cnblogs_code">
<pre>INSERT tdb_goods_cates(cate_name) VALUES('路由器'),('交换机'),('网卡');
INSERT tdb_goods_brands(brand_name) VALUES('海尔'),('清华同方'),('神舟');</pre>
</div>

　　在tdb_goods数据表也写入新的记录

<div class="cnblogs_code">
<pre> INSERT tdb_goods(goods_name,cate_id,brand_id,goods_price) VALUES(' LaserJet Pro P1606dn 黑白激光打印机','12','4','1849');</pre>
</div>

![multilist9](https://pic.xiaohuochai.site/blog/php_multilist9.jpg)

&nbsp;

### 连接

　　通过上面的操作，已经把重复的数据分散到不同的数据表中进行存储了，尽可能的节省存储空间了。但是，显示时，却需要把原来的数据显示出来，这就需要使用下面要介绍的概念&mdash;&mdash;连接

**语法结构**

　　MySQL在SELECT语句、多表更新、多表删除语句中支持连接(JOIN)操作

<div class="cnblogs_code">
<pre>table_reference
{[INNER | CROSS] JOIN |{LEFT|RIGHT} [OUTER] JOIN}
table_reference
ON conditional_expr</pre>
</div>

　　数据表参照(table_reference)时，数据表可以使用tbl_name AS alias_name 或tbl_name alias_name赋予别名

　　table_subquery可以作为子查询使用在FROM子句中，这样的子查询必须为其赋予别名

<div class="cnblogs_code">
<pre>tbl_name[[AS] alias] | table_subquery [AS] alias</pre>
</div>

**连接类型**

　　连接类型主要包括内连接(INNER JOIN)、左外连接(LEFT [OUTER] JOIN)、右外连接(RIGHT [OUTER] JOIN)

　　在mysql中，JOIN、CROSS JOIN 和 INNER JOIN是等价的

**连接条件**

　　使用ON关键字来设定连接条件，也可以使用WHERE来代替。一般地，使用ON关键字来设定连接条件，使用WHERE关键字进行结果集记录的过滤

**内连接**

　　内连接显示左表及右表符合连接条件的记录


![multilist10](https://pic.xiaohuochai.site/blog/php_multilist10.jpg)

　　下面通过内连接来查询所有商品的详细信息，原来商品表中有24件商品，但只显示出23件，因为那一件不符合连接条件

![multilist11](https://pic.xiaohuochai.site/blog/php_multilist11.jpg)

![multilist12](https://pic.xiaohuochai.site/blog/php_multilist12.jpg)　　

　　关于内连接，有以下注意：使用内连接查找的记录在连接数据表中不存在，并且在WHERE子句中尝试一下操作：column_name IS NULL 。如果 column_name 被指定为 NOT NULL，MySQL将在找到符合连接着条件的记录后停止搜索更多的行(查找冲突)

**左外连接**

　　左外连接指显示左表的全部记录及右表符合连接条件的记录


![multilist13](https://pic.xiaohuochai.site/blog/php_multilist13.jpg)

　　下面通过左外连接来查询所有商品的详细信息，原来商品表中有24件商品，现在也显示出24件，但最后一件商品的分类为NULL，这是因为右表的这一个分类不符合条件，所以显示为NULL

![multilist14](https://pic.xiaohuochai.site/blog/php_multilist14.jpg)

**右外连接**

　　右外连接指显示右表的全部记录及左表符合连接条件的记录


![multilist15](https://pic.xiaohuochai.site/blog/php_multilist15.jpg)

　　下面通过右外连接来查询所有商品的详细信息，原来商品表中有24件商品，现在显示出26件，多出来的是符合右表但不符合左表的记录

![multilist16](https://pic.xiaohuochai.site/blog/php_multilist16.jpg)

　　关于外连接，有以下几点注意，以左外连接为例

<div class="cnblogs_code">
<pre>A LEFT JOIN B join_condition</pre>
</div>

　　数据表B的结果集依赖于数据表A，数据表A的结果集根据左连接条件依赖所有数据表(B表除外)

　　左外连接条件决定如何检索数据表B(在没有指定WHERE条件的情况下)

　　如果数据表A的某条记录符合WHERE条件，但是在数据表B不存在符合连接条件的记录，将生成一个所有列为空的额外的B行

**多表连接**

　　三张表以上的连接称为多表连接，原理与两张表的连接相同

　　下面通过内连接实现查询所有商品的详细信息

![multilist17](https://pic.xiaohuochai.site/blog/php_multilist17.jpg)

&nbsp;

### 无限级表


![multilist18](https://pic.xiaohuochai.site/blog/php_multilist18.jpg)

　　上图中是tdb_goods_cates表的记录。但实际的分类并非这10类，而是无限分类。下面来介绍无限分类的数据表的实现

　　无限级表至少需要三个列，一个是类型id，一个类型名称，一个是父级id

<div class="cnblogs_code">
<pre>CREATE TABLE tdb_goods_types(
 type_id   SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
 type_name VARCHAR(20) NOT NULL,
 parent_id SMALLINT UNSIGNED NOT NULL DEFAULT 0
); </pre>
</div>

　　然后，写入[给定数据](http://7xpdkf.com1.z0.glb.clouddn.com/sqlData2.txt)


![multilist19](https://pic.xiaohuochai.site/blog/php_multilist19.jpg)

**自身连接**

　　自身连接指同一个数据表对其自身进行连接。为作区分，需要添加别名。字表别名定义为s，父表别名定义为p

　　下面来查找所有分类及其父类

![multilist20](https://pic.xiaohuochai.site/blog/php_multilist20.jpg)

　　下面来查找所有分类及其子类

![multilist21](https://pic.xiaohuochai.site/blog/php_multilist21.jpg)

　　下面来查找所有分类及其子类的数目

![multilist22](https://pic.xiaohuochai.site/blog/php_multilist22.jpg)

**删除重复项**

　　从记录中，可以看出24条记录中存在重复的项，现在要想办法把重复的项删除

![multilist23](https://pic.xiaohuochai.site/blog/php_multilist23.jpg)

　　首先，先查找到重复的项

![multilist24](https://pic.xiaohuochai.site/blog/php_multilist24.jpg)

　　然后，需要使用多表删除来实现删除操作

<div class="cnblogs_code">
<pre>DELETE tbl_name[.*][,tbl_name[.*]]...
FROM table_references
[WHERE where_condition]</pre>
</div>

![multilist25](https://pic.xiaohuochai.site/blog/php_multilist25.jpg)

