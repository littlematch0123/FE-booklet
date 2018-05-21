# mysql记录操作

&emsp;&emsp;本文将详细介绍mysql关于记录的增删改查

&nbsp;

### 插入记录

<div>
<pre>INSERT [INTO] tbl_name [(col_name,...)] {VALUES|VALUE} ({expr|DEFAULT},...),(...),...</pre>
</div>

&emsp;&emsp;首先，创建一个简单的数据表

![info1](https://pic.xiaohuochai.site/blog/php_info1.jpg)

&emsp;&emsp;如果省略col_name，则意味着所有的字段按照顺序依次赋值。因为id字段是自动编号的，该字段可以赋值为NULL或DEFAULT

![info2](https://pic.xiaohuochai.site/blog/php_info2.jpg)

![info3](https://pic.xiaohuochai.site/blog/php_info3.jpg)

&emsp;&emsp;通过逗号分隔，可以一次性写入多条记录；而且，值可以使用表达式表示

![info4](https://pic.xiaohuochai.site/blog/php_info4.jpg)

&emsp;&emsp;数据库并没有布尔类型BOOLEAN，如果声明类型为BOOLEAN，则会被转换为TINYINT类型，true转换为1，false转换为0

![info5](https://pic.xiaohuochai.site/blog/php_info5.jpg)

&nbsp;

**方法二**
<div>
<pre>INSERT [INTO] tb1_name SET col_name={expr|DEFAULT},...</pre>
</div>

&emsp;&emsp;与第一种方法的区别在于，此方法可以使用子查询(SubQuery)，以及一次性只能插入一条记录

![info6](https://pic.xiaohuochai.site/blog/php_info6.jpg)

&nbsp;

**方法三**

<div>
<pre>INSERT [INTO] tb1_name [(col_name,...)] SELECT ...</pre>
</div>

&emsp;&emsp;此方法可以将查询结果插入到指定数据表

&nbsp;

### 更新记录

<div>
<pre>UPDATE [LOW_PRIORITY][IGNORE] table_reference SET col_name1={expr1|DEFAULT}[,col_name2={expr2|DEFAULT}]...[WHERE where_condition]</pre>
</div>

&emsp;&emsp;可以一次更新多条记录；当省略WHERE条件时，所有记录的值将会更新

&emsp;&emsp;下面将所有人的年龄都增加5岁

![info7](https://pic.xiaohuochai.site/blog/php_info7.jpg)

&emsp;&emsp;下面将所有人的年龄更新为原有年龄减去其id值，将所有人的性别改成0

![info8](https://pic.xiaohuochai.site/blog/php_info8.jpg)

&emsp;&emsp;下面将所有id值为偶数的人的年龄加10岁

![info9](https://pic.xiaohuochai.site/blog/php_info9.jpg)
<div>&nbsp;</div>

### 删除记录

<div>
<pre>DELETE FROM tbl_name [WHERE where_condition]</pre>
</div>

![info10](https://pic.xiaohuochai.site/blog/php_info10.jpg)

&emsp;&emsp;注意：删除某条记录后，再插入一条新的记录，自动编号不会补到删除记录的编号上，而是基于原有记录最大编号继续增加

![info11](https://pic.xiaohuochai.site/blog/php_info11.jpg)
<div>&nbsp;</div>

### 查询表达式

<div>
<pre>SELECT select_expr [,select_expr...]
[
FROM tbl_references
[WHERE where_condition]
[GROUP BY {col_name | position} [ASC | DESC],...]
[HAVING where_condition]
[ORDER BY {col_name | expo | position}  [ASC | DESC],...]
[LIMIT {[offset,] row_count | row_count OFFSET offset}]
]</pre>
</div>

&emsp;&emsp;查询表达式的每个表达式表示想要查找的一列，必须有至少一个。多个列之间以英文逗号分开

![info12](https://pic.xiaohuochai.site/blog/php_info12.jpg)

&emsp;&emsp;查询表达式的顺序可以和原表中字段的顺序不一致

![info13](https://pic.xiaohuochai.site/blog/php_info13.jpg)

&emsp;&emsp;在使用多表连接时，可能会出现不同的表中存在名称相同的字段，如果直接写字段，分不清到底是哪张数据表的字段。在字段名前加上数据表可以分辨出隶属于哪张数据表

![info14](https://pic.xiaohuochai.site/blog/php_info14.jpg)

&emsp;&emsp;星号*号表示所有的列。tbl_name.*可以表示命名表的所有列

![info15](https://pic.xiaohuochai.site/blog/php_info15.jpg)

&emsp;&emsp;查询表达式可以使用[AS] alias_name为其赋予别名，别名可用于GROUP BY, ORDER BY, HAVING字句

![info16](https://pic.xiaohuochai.site/blog/php_info16.jpg)

&emsp;&emsp;注意：在使用查询表达式设置别名查询，AS可以使用，也可以不使用。但如果不使用，可能会出现二义性情况

<div>
<pre>SELECT id username FROM users;</pre>
</div>

&emsp;&emsp;mysql会把上面的语句解析为username作为id的别名

&nbsp;

### 结果处理

<div>
<pre>[GROUP BY {col_name | position} [ASC | DESC],...]</pre>
</div>

&emsp;&emsp;查询结果分组(GROUP BY)的参数中，ASC是升序，是默认的；DESC是降序

![info17](https://pic.xiaohuochai.site/blog/php_info17.jpg)

&emsp;&emsp;col_name代表字段名，position以数字代表位置，如1代表SELECT语句中第一次出现的字段

![info18](https://pic.xiaohuochai.site/blog/php_info18.jpg)

**分组条件**

<div>
<pre>[HAVING where_condition]</pre>
</div>

&emsp;&emsp;在设置分组(HAVING)时，一定要保证分组条件(where_condition)要么是聚合函数(max,min,avg,count,sum)，要么其中的字段必须是SELECT中的一个查询字段，否则会报错

![info19](https://pic.xiaohuochai.site/blog/php_info19.jpg)

**分组排序**

<div>
<pre>[ORDER BY {col_name | expo | position}  [ASC | DESC],...]
</pre>
</div>

&emsp;&emsp;可以使用分组排序(order by)对查询结果进行排序

![info20](https://pic.xiaohuochai.site/blog/php_info20.jpg)

&emsp;&emsp;同时可以用几个条件来排序，按输入顺序来进行优先级的选择

![info22](https://pic.xiaohuochai.site/blog/php_info22.jpg)

**限制结果**

<div>
<pre>[LIMIT {[offset,] row_count | row_count OFFSET offset}]</pre>
</div>

&emsp;&emsp;限制查询结果(LIMIT)默认情况下，返回所有查找到的结果

![info21](https://pic.xiaohuochai.site/blog/php_info21.jpg)

&emsp;&emsp;如果LIMIT后面只有一个数字，表示从第一条开始返回，并返回相应数字个数的记录

![info23](https://pic.xiaohuochai.site/blog/php_info23.jpg)

&emsp;&emsp;SELECT语句默认从0开始编号，如果想从第三条开始返回，则需要offset参数和row_count参数一起使用

![info24](https://pic.xiaohuochai.site/blog/php_info24.jpg)

【补充】

<div>
<pre>INSERT [INTO] tbl_name [(col_name,...] SELECT ...</pre>
</div>

&emsp;&emsp;与一开始介绍的插入记录的方法不同，现在这种方法可以将查找的结果存储到指定的数据表

![info25](https://pic.xiaohuochai.site/blog/php_info25.jpg)
