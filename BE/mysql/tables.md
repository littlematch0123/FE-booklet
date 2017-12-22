# mysql数据表操作

　　mysql数据库中的数据存储在被称为表(tables)的数据库对象中。表是相关的数据项的集合，它由列(字段)和行(记录)组成。下面将详细介绍数据表操作

&nbsp;

### 准备工作

　　在进行数据表操作之前，需要先登录mysql服务器，创建一个数据库，并使用创建好的数据库

![tables1](https://pic.xiaohuochai.site/blog/mysql_tables1.jpg)

<div>&nbsp;</div>

### 创建数据表

　　下面在db1数据库中创建数据表tb1

<div class="cnblogs_code">
<pre>CREATE TABLE [IF NOT EXISTS] table_name(column_name data_type,...)</pre>
</div>

　　在下面的数据表tb1中，创建一个VARCHAR(20)的变长字符型的username字段；创建一个TINYINT UNSIGNED的一个字节长度的无符号(0-255)整型的age字段；创建一个salary FLOAT(8,2) UNSIGNED的数字总长度为8，小数位数为2的无符号浮点数的salary字段

![tables2](https://pic.xiaohuochai.site/blog/mysql_tables2.jpg)

<div>&nbsp;</div>

### 查看数据表

<div class="cnblogs_code">
<pre>SHOW TABLES [FROM db_name] [LIKE 'pattern' | WHERE expr]</pre>
</div>

**查看数据表的列项**

<div class="cnblogs_code">
<pre>SHOW COLUMNS FORM tbl_name</pre>
</div>

![tables3](https://pic.xiaohuochai.site/blog/mysql_tables3.jpg)

<div>&nbsp;</div>

### 记录操作

　　记录操作的第一步是写入记录

　　在写入记录时，要注意的是，如果没有省略的字段，则按照参数顺序直接赋值即可；如果有省略的字段，则字段名和参数值都需要写出来

<div class="cnblogs_code">
<pre>INSERT [INTO] tbl_name [(col_name,...)] VALUES(VAL,...)</pre>
</div>

![tables4](https://pic.xiaohuochai.site/blog/mysql_tables4.jpg)

　　下面来查找记录

<div class="cnblogs_code">
<pre>SELECT EXPR,...FROM tbl_name</pre>
</div>

![tables6](https://pic.xiaohuochai.site/blog/mysql_tables6.jpg)

<div>&nbsp;</div>

### 记录约束

**空值**

<div class="cnblogs_code">
<pre>NULL         字段值可以为空
NOT NULL     字段值禁止为空</pre>
</div>

　　首先，创建一个数据表tb2，username字段禁止为空，而age字段可以为空。插入记录时，如果username字段为空，则提示错误

![tables5](https://pic.xiaohuochai.site/blog/mysql_tables5.jpg)

**主键**

　　每张数据表只能存在一个主键(PRIMARY KEY)，主键保证记录的唯一性，且自动为NOT NULL

<div>　　主键可以写为KEY或PRIMARY KEY</div>

![tables7](https://pic.xiaohuochai.site/blog/mysql_tables7.jpg)

**自动编号**

　　自动编号(AUTO_INCREMENT)必须与主键组合使用，默认情况下，起始值为1，每次增量为1

![tables8](https://pic.xiaohuochai.site/blog/mysql_tables8.jpg)

**唯一**

　　唯一约束(UNIQUE KEY)是指选定的记录中不可以存在相同值的情况，这样可以保证记录的唯一性，唯一约束的字段可以为空值NULL，每张数据表可以存在多个唯一约束

　　下面记录中对username字段进行唯一约束限制，添加username为'Tom'记录后，不允许再添加username为'Tom'记录

![tables9](https://pic.xiaohuochai.site/blog/mysql_tables9.jpg)

**默认值**

　　当插入记录时，如果没有明确为字段赋值，则自动赋予默认值(DEFAULT)

![tables10](https://pic.xiaohuochai.site/blog/mysql_tables10.jpg)

**外键**

　　外键约束(FOREIGN KEY)用来保持数据一致性和完整性，实现一对一或一对多的关系

　　外键列是指加入(FOREIGN KEY)的列，外键列参照的那一列叫做参照列，外键列和参数列必须具有相似的数据类型。其中数字的长度或是否有符号位必须相同；而字符的长度则可以不同

　　索引是一种特殊的文件，在InnoDB数据表上的索引是表空间的一个组成部分，它们包含着对数据表中所有记录的引用指针。外键列和参照列必须创建索引，如果参照列不存在索引的话，MySQL将自动创建索引

　　子表指有外键列的表，子表所参照的表叫做父表。父表和子表必须使用相同的存储引擎，而且禁止使用临时表。数据表的存储引擎只能是InnoDB

　　所以，首先需要修改mysql配置文件my.ini中的默认存储引擎

<div class="cnblogs_code">
<pre>default-storage-engine = INNODB</pre>
</div>

　　创建父表provices，参照列为id

![tables11](https://pic.xiaohuochai.site/blog/mysql_tables11.jpg)

　　创建子表users，外键列为pid

![tables12](https://pic.xiaohuochai.site/blog/mysql_tables12.jpg)

　　父表provices的参照列id为主键列，主键在创建的同时，会自动创建索引

　　下面来查看父表provices的索引

![tables13](https://pic.xiaohuochai.site/blog/mysql_tables13.jpg)

　　下面来查看子表users的索引

![tables14](https://pic.xiaohuochai.site/blog/mysql_tables14.jpg)

　　外键约束的参照操作中，一共存在四个选项。用来设置更新父表时，子表是否也进行相应操作

　　1、CASCADE: 从父表删除或更新且自动删除或更新子表中匹配的行

　　2、SET NULL: 从父表删除或更新行，并设置子表中的外键列为NULL。如果使用该选项，必须保证子表列没有指定NOT NULL

　　3、RESTRICT: 拒绝对父表的删除或更新操作

　　4、NO ACTION: 标准SQL的关键字，在MYSQL中与RESTRICT相同

　　首先，创建父表provinces

![tables15](https://pic.xiaohuochai.site/blog/mysql_tables15.jpg)

　　创建子表users1，并设置选项cascade

![tables16](https://pic.xiaohuochai.site/blog/mysql_tables16.jpg)

　　在父表中插入记录'A'、'B'、'C'

![tables17](https://pic.xiaohuochai.site/blog/mysql_tables17.jpg)

　　在子表中，插入名字'a1'、'a2'、'a3'、'a4'

![tables18](https://pic.xiaohuochai.site/blog/mysql_tables18.jpg)

　　删除父表中id为2的记录，并查看删除后父表和子表的结果

![tables19](https://pic.xiaohuochai.site/blog/mysql_tables19.jpg)

　　在实际的开发过程中，我们很少使用物理的外键约束，很多都去使用逻辑的外键约束，因为物理的外键约束只有INNODB这种引擎才会支持，像我们另外的一种引擎MYISAM则不支持，反过来说，如果要创建的数据表，假设存储引擎为MYISAM，而且又想使用外键约束的话，其实是不可能实现的，所以说，在实际的项目开发中，并不去定义物理的外键，所谓的逻辑外键指的是在定义两张表的结构的时候，按照存在的某种结构的方式去定义，但是不去使用FOREIGN KEY这个关键词来定义

【表级约束和列级约束】

　　约束除了按照功能，分为上面介绍过的5种约束外，也可以按照作用范围分为表级约束和列级约束

　　对一个数据列建立的约束，称为列级约束，对多个数据列建立的约束，称为表级约束。列级约束既可以在列定义时声明，也可以在列定义后声明。而表级约束只能在列定义后声明

　　在实际开发中，用列级约束比较多，表级约束很少用，除此之外，在所有的约束中，并不是说每种约束都存在着表级或列级约束，其中，NOT NULL 非空约束，DEFAULT约束这两种约束就不存在表级约束，它们只有列级约束，而对于其他的三种，像主键、唯一、外键约束，它们都可以存在表级和列级约束

&nbsp;

### 列操作

**添加单列**

<div class="cnblogs_code">
<pre>ALTER TABLE tb!_name ADD[COLUMN] col_name column_definition [FIRST|AFTER col_name];</pre>
</div>

　　添加单列有三个位置选择，位于起始处，位于指定列的后面和位于最后

　　first加入的放在整张表最前面，after放在指定列后面，不填则放在整张表最后

![tables20](https://pic.xiaohuochai.site/blog/mysql_tables20.jpg)

**添加多列**

<div class="cnblogs_code">
<pre>ALTER TABLE tb1_name ADD[COLUMN] (col_name column_definition,...);</pre>
</div>

　　添加多列只能位于最后

**删除单列**

<div class="cnblogs_code">
<pre>ALTER TABLE tb1_name DROP [COLUMN] col_name</pre>
</div>

![tables21](https://pic.xiaohuochai.site/blog/mysql_tables21.jpg)

**删除多列**

<div class="cnblogs_code">
<pre>ALTER TABLE tb1_name DROP col1_name, DROP col2_name, ...</pre>
</div>

![tables22](https://pic.xiaohuochai.site/blog/mysql_tables22.jpg)

<div>&nbsp;</div>

### 约束操作

**添加主键约束**

<div class="cnblogs_code">
<pre>ALTER TABLE tb1_name ADD [CONSTRAINT[symbol]] PRIMARY KEY [index_type](index_col_name,...)</pre>
</div>

　　在未添加主键前，表users2有'username'、'pid'和'id'三个field

![tables23](https://pic.xiaohuochai.site/blog/mysql_tables23.jpg)

　　向字段'id'添加主键约束

![tables24](https://pic.xiaohuochai.site/blog/mysql_tables24.jpg)

**添加唯一约束**

　　唯一约束与主键约束的不同之处在于，唯一约束可以存在多个字段，而主键约束只能有一个

<div class="cnblogs_code">
<pre>ALTER TABLE tb1_name ADD [CONSTRAINT[symbol]] UNIQUE [INDEX|KEY] [index_name] [index_type]</pre>
</div>

![tables25](https://pic.xiaohuochai.site/blog/mysql_tables25.jpg)

**添加外键约束**

<div class="cnblogs_code">
<pre>ALTER TABLE tb1_name ADD [CONSTRAINT[symbol]] FOREIGN KEY [index_name] (index_col_name,...) reference_definition</pre>
</div>

![tables26](https://pic.xiaohuochai.site/blog/mysql_tables26.jpg)

**添加或删除默认约束**

<div class="cnblogs_code">
<pre>ALTER TABLE tb1_name ALTER [COLUMN] col_name {SET DEFAULT literal | DROP DEFAULT}</pre>
</div>

![tables27](https://pic.xiaohuochai.site/blog/mysql_tables27.jpg)

![tables28](https://pic.xiaohuochai.site/blog/mysql_tables28.jpg)

![tables29](https://pic.xiaohuochai.site/blog/mysql_tables29.jpg)

**删除主键约束**

<div class="cnblogs_code">
<pre>ALTER TABLE tbl_name DROP PRIMARY KEY</pre>
</div>

![tables30](https://pic.xiaohuochai.site/blog/mysql_tables30.jpg)

**删除唯一约束**

<div class="cnblogs_code">
<pre>ALTER TABLE tbl_name DROP {INDEX|KEY} index_name</pre>
</div>

![tables31](https://pic.xiaohuochai.site/blog/mysql_tables31.jpg)

![tables32](https://pic.xiaohuochai.site/blog/mysql_tables32.jpg)

**删除外键约束**

<div class="cnblogs_code">
<pre>ALTER TABLE tbl_name DROP FOREIGN KEY fk_symbol</pre>
</div>

![tables33](https://pic.xiaohuochai.site/blog/mysql_tables33.jpg)

![tables34](https://pic.xiaohuochai.site/blog/mysql_tables34.jpg)

　　删除外键约束后，如果索引也不要，可以接着删除之索引

![tables35](https://pic.xiaohuochai.site/blog/mysql_tables35.jpg)

<div>&nbsp;</div>

### 修改列

**修改列定义**

　　修改列定义指修改列的类型或位置

<div class="cnblogs_code">
<pre>ALTER TALBE tb1_name MODIFY [COLUMN] col_name column_definition [FIRST|AFTER col_name]</pre>
</div>

![tables36](https://pic.xiaohuochai.site/blog/mysql_tables36.jpg)

　　下面将字段'id'的位置调整到第一个

![tables37](https://pic.xiaohuochai.site/blog/mysql_tables37.jpg)

　　下面，将字段'id'的类型由smallint转换为tinyint

　　[注意]在由大范围的类型转换为小范围类型时，可能会造成数据丢失

![tables38](https://pic.xiaohuochai.site/blog/mysql_tables38.jpg)

**修改列名称**

　　使用下面的CHANGE语法，比MODIFY语法更加强大，可以在修改列名称的同时，修改列类型

<div class="cnblogs_code">
<pre>ALTER TABLE tb1_name CHANGE [COLUMN] old_col_name new_col_name column_definition [FIRST|AFTER col_name]</pre>
</div>

![tables39](https://pic.xiaohuochai.site/blog/mysql_tables39.jpg)

<div>&nbsp;</div>

### 数据表更名

**方法一&nbsp;**

<div class="cnblogs_code">
<pre>ALTER TABLE tb1_name RENAME [TO|AS] new_tb1_name</pre>
</div>

![tables40](https://pic.xiaohuochai.site/blog/mysql_tables40.jpg)

**方法二**

　　使用RENAME方法可以为多张数据表更名

<div class="cnblogs_code">
<pre>RENAME TABLE tb1_name TO new_tbl_name [,tbl_name2 TO new_tbl_name2] ...</pre>
</div>

![tables41](https://pic.xiaohuochai.site/blog/mysql_tables41.jpg)

　　[注意]不要随意改变数据列和数据表的名字

