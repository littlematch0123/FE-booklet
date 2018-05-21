# mysql子查询

&emsp;&emsp;查询数据库，当查询条件比较复杂时，常常需要用到子查询。子查询(Subquery)是指出现在其他SQL语句内的SELECT子句。本文将详细介绍子查询

&nbsp;

### 定义

&emsp;&emsp;子查询(Subquery)是指出现在其他SQL语句内的SELECT子句

<div>
<pre>SELECT * FROM t1 WHERE col1 = (SELECT col2 FROM t2);</pre>
</div>

&emsp;&emsp;其中，SELECT * FROM t1，称为外层查询(Outer Query/Outer Statement)，SELECT col2 FROM t2，称为子查询(SubQuery)

&emsp;&emsp;在使用子查询时，需要注意的是

&emsp;&emsp;1、子查询指嵌套在查询内部，且必须始终出现在圆括号内

&emsp;&emsp;2、子查询语句中可以包含多个关键字或条件，如DISTINCT、GROUP BY、ORDER BY、LIMIT、函数等

&emsp;&emsp;3、子查询的外层查询可以是：SELECT、INSERT、UPDATE、SET或DO

&emsp;&emsp;4、子查询返回值可以是：标量、一行、一列或者子查询

&nbsp;

### 比较运算符

&emsp;&emsp;使用比较符是其中一类子查询

<div>
<pre>operand comparison_operator subquery</pre>
</div>

&emsp;&emsp;比较运算符包括=、!=、&lt;&gt;、&lt;=&gt; 、&gt;、&lt;、&gt;=、&lt;=

**数据准备**

&emsp;&emsp;下载[数据文件](http://7xpdkf.com1.z0.glb.clouddn.com/sqlData.txt)，建立数据库，数据表，并存入相应记录

![subquery1](https://pic.xiaohuochai.site/blog/php_subquery1.jpg)

![subquery2](https://pic.xiaohuochai.site/blog/php_subquery2.jpg)

&emsp;&emsp;求所有电脑产品的平均价格,并且保留两位小数，AVG、MAX、MIN、COUNT、SUM为聚合函数

&emsp;&emsp;注意：AVG()是一个用来求平均值的函数

![subquery3](https://pic.xiaohuochai.site/blog/php_subquery3.jpg)

&emsp;&emsp;查询所有价格大于平均价格的商品

<div>
<pre>SELECT goods_id,goods_name,goods_price FROM tdb_goods WHERE goods_price &gt; 5391.30;</pre>
</div>

![subquery4](https://pic.xiaohuochai.site/blog/php_subquery4.jpg)

&emsp;&emsp;通过子查询来实现相同的需求

<div>
<pre>SELECT goods_id,goods_name,goods_price FROM tdb_goods WHERE goods_price &gt; (SELECT ROUND(AVG(goods_price),2) FROM tdb_goods);</pre>
</div>

![subquery5](https://pic.xiaohuochai.site/blog/php_subquery5.jpg)

&emsp;&emsp;查询类型为&ldquo;超记本&rdquo;的商品价格

![subquery6](https://pic.xiaohuochai.site/blog/php_subquery6.jpg)

![subquery7](https://pic.xiaohuochai.site/blog/php_subquery7.jpg)

&emsp;&emsp;查询价格大于或等于"超级本"价格的商品

![subquery8](https://pic.xiaohuochai.site/blog/php_subquery8.jpg)

&emsp;&emsp;系统提示错误，子查询返回的多于一行，因为子查询有3条结果，SELECT无法知道要大于子查询中3条结果中的哪一个。所以，这时就需要用到接下来要介绍的修饰关键字

&nbsp;

### 修饰关键字

&emsp;&emsp;修饰关键字包括ANY、SOME、ALL三个，如果子查询返回多个值时，可以使用它们

<div>
<pre>operand comparison_operator  ANY（子查询）
operand comparison_operator  SOME（子查询）
operand comparison_operator  ALL（子查询）</pre>
</div>

![subquery9](https://pic.xiaohuochai.site/blog/php_subquery9.jpg)

**情况处理**

&emsp;&emsp;1、运算符为&gt;或&gt;=，使用ANY关键字时，表示大于子查询结果中的最小值

<div>
<pre>SELECT goods_id,goods_name,goods_price FROM tdb_goods WHERE goods_price &gt;  ANY (SELECT goods_price FROM tdb_goods WHERE goods_cate = '超级本');</pre>
</div>

&emsp;&emsp;由结果可知，返回的都大于4299的值，即最小值

![subquery10](https://pic.xiaohuochai.site/blog/php_subquery10.jpg)

![subquery11](https://pic.xiaohuochai.site/blog/php_subquery11.jpg)

&emsp;&emsp;2、运算符为&gt;或&gt;=，使用ALL关键字时，表示大于子查询结果中的最大值

![subquery12](https://pic.xiaohuochai.site/blog/php_subquery12.jpg)

&emsp;&emsp;3、运算符为&lt;或&lt;=，使用ANY或SOME关键字时，表示小于子查询结果中的最大值；使用ALL关键字时，表示小于子查询结果中的最小值

![subquery13](https://pic.xiaohuochai.site/blog/php_subquery13.jpg)

![subquery14](https://pic.xiaohuochai.site/blog/php_subquery14.jpg)

&emsp;&emsp;4、运算符为=，使用ANY或SOME关键字时，表示等于子查询结果中的任意值；使用ALL关键字时，则返回空

![subquery15](https://pic.xiaohuochai.site/blog/php_subquery15.jpg)

&nbsp;

### [NOT]IN

<div>
<pre>operand comparison_operator [NOT] IN (subquery)</pre>
</div>

&emsp;&emsp;第二种子查询是由IN 或 NOT IN引发的子查询，与比较运算符使用的方法基本相同&nbsp;

<div>
<pre>其中，= ANY 运算符与 IN 等效，!= ALL或 &lt;&gt; ALL运算符与 NOT IN 等效</pre>
</div>

![subquery16](https://pic.xiaohuochai.site/blog/php_subquery16.jpg)

**[NOT] EXISTS**

&emsp;&emsp;第三种子查询是由EXISTS 或 NOT EXISTS引发的子查询。如果子查询返回任何行，EXISTS将返回TRUE；否则返回FALSE

&nbsp;

### 存储查询结果

&emsp;&emsp;我们可以把查询结果统一存储到一个新的数据表中，而不需要一条一条地录入

&emsp;&emsp;下面，先创建一个&ldquo;商品分类&rdquo;空表

![subquery17](https://pic.xiaohuochai.site/blog/php_subquery17.jpg)

&nbsp;&emsp;&emsp;然后，查询tdb_goods表的所有记录，并且按"类别"分组

![subquery18](https://pic.xiaohuochai.site/blog/php_subquery18.jpg)

&emsp;&emsp;将分组结果写入到&ldquo;商品分类&rdquo;数据表中

<div>
<pre>INSERT [INTO] tbl_name [(col_name),...)] SELECT...;</pre>
</div>

![subquery19](https://pic.xiaohuochai.site/blog/php_subquery19.jpg)

![subquery20](https://pic.xiaohuochai.site/blog/php_subquery20.jpg)

![subquery21](https://pic.xiaohuochai.site/blog/php_subquery21.jpg)