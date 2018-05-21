# mysql函数

&emsp;&emsp;mysql数据库中的函数根据功能可以划分为字符函数、数值运算符与函数、比较运算符与函数、日期时间函数、信息函数、聚合函数、加密函数以及自定义函数等。下面将详细介绍数据库中的函数

&nbsp;

### 字符函数


![function1](https://pic.xiaohuochai.site/blog/php_function1.jpg)


![function2](https://pic.xiaohuochai.site/blog/php_function2.jpg)


**CONCAT()**

&emsp;&emsp;CONCAT()函数用于字符连接


![function3](https://pic.xiaohuochai.site/blog/php_function3.jpg)


&emsp;&emsp;CONCAT()函数也可用于将一个数据表中的两个字段的所有记录进行字符连接


![function4](https://pic.xiaohuochai.site/blog/php_function4.jpg)


**CONCAT_WS()**

&emsp;&emsp;CONCAT_WS()函数使用指定的分隔符进行字符连接，该函数的第一个参数是指定分隔符


![function5](https://pic.xiaohuochai.site/blog/php_function5.jpg)


**FORMAT()**

&emsp;&emsp;FORMAT()函数主要用于数字格式化，最终返回一个字符型数字。第一个参数为待格式化的数字，第二个参数为要保留的小数位数　


![function6](https://pic.xiaohuochai.site/blog/php_function6.jpg)


**LOWER()**

&emsp;&emsp;LOWER()函数将字符转换成大写字母

**UPPER()**

&emsp;&emsp;UPPER()函数将字符转换成小写字母


![function7](https://pic.xiaohuochai.site/blog/php_function7.jpg)


**LEFT()**

&emsp;&emsp;LEFT()函数用于获取左侧字符

**RIGHT()**

&emsp;&emsp;RIGHT()函数用于获取右侧字符


![function8](https://pic.xiaohuochai.site/blog/php_function8.jpg)


**LENGTH()**

&emsp;&emsp;LENGTH()函数用于获取字符串长度


![function9](https://pic.xiaohuochai.site/blog/php_function9.jpg)


**LTRIM()**

&emsp;&emsp;LTRIM()函数用于删除前导空格

**RTRIM()**

&emsp;&emsp;RTRIM()函数用于删除后续空格

**TRIM()**

&emsp;&emsp;TRIM()函数用于删除前导和后续空格


![function10](https://pic.xiaohuochai.site/blog/php_function10.jpg)


**REPLACE()**

&emsp;&emsp;REPLACE()函数用于字符串替换


![function11](https://pic.xiaohuochai.site/blog/php_function11.jpg)


**SUBSTRING()**

&emsp;&emsp;SUBSTRING()函数用于字符串截取，第一个参数是开始截取的起始位置，第二个参数是截取的字符数目

&emsp;&emsp;注意：这里是从1开始计数的，而不是从0开始的


![function12](https://pic.xiaohuochai.site/blog/php_function12.jpg)


&emsp;&emsp;如果省略第二个参数，则一直截取到字符串的结尾


![function13](https://pic.xiaohuochai.site/blog/php_function13.jpg)


**`[NOT]` LIKE**

&emsp;&emsp;`[NOT]` LIKE用于模式匹配，其中%代表0个或多个字符，_代表任意1个字符。返回1表示匹配，0表示不匹配


![function14](https://pic.xiaohuochai.site/blog/php_function14.jpg)


&nbsp;

### 数值运算符


![function15](https://pic.xiaohuochai.site/blog/php_function15.jpg)


**CEIL()**

&emsp;&emsp;CEIL()函数主要用于进一取整(向上取整)


![function16](https://pic.xiaohuochai.site/blog/php_function16.jpg)


**FLOOR()**

&emsp;&emsp;FLOOR()函数主要用于舍一取整(向下取整)


![function17](https://pic.xiaohuochai.site/blog/php_function17.jpg)


**ROUND()**

&emsp;&emsp;ROUND()函数主要用于四舍五入，两个参数分别为浮点数和保留的小数位数


![function18](https://pic.xiaohuochai.site/blog/php_function18.jpg)


**DIV**

&emsp;&emsp;DIV主要用于整数除法


![function19](https://pic.xiaohuochai.site/blog/php_function19.jpg)


**MOD**

&emsp;&emsp;MOD主要用于取余数(取模)，等同于% ，可以是整数也可以是小数


![function20](https://pic.xiaohuochai.site/blog/php_function20.jpg)


**POWER()**

&emsp;&emsp;POWER()函数主要用于幂运算


![function21](https://pic.xiaohuochai.site/blog/php_function21.jpg)


**TRUNCATE()**

&emsp;&emsp;TRUNCATE()函数主要用于数字截取，两个参数分别为数值和截断到小数点后n位


![function22](https://pic.xiaohuochai.site/blog/php_function22.jpg)


&nbsp;

### 比较运算符


![function23](https://pic.xiaohuochai.site/blog/php_function23.jpg)


**`[NOT]` BETWEEN...AND...**

&emsp;&emsp;`[NOT]` BETWEEN...AND...表示[不]在范围之内


![function24](https://pic.xiaohuochai.site/blog/php_function24.jpg)


**`[NOT]` IN()**

&emsp;&emsp;`[NOT]` IN()表示[不]在列出值范围内


![function25](https://pic.xiaohuochai.site/blog/php_function25.jpg)


**IS `[NOT]` NULL**

&emsp;&emsp;IS `[NOT]` NULL表示不为空


![function26](https://pic.xiaohuochai.site/blog/php_function26.jpg)

<div>&nbsp;</div>

### 日期时间


![function27](https://pic.xiaohuochai.site/blog/php_function27.jpg)


**NOW()**

&emsp;&emsp;NOW()函数返回当前日期和时间


![function28](https://pic.xiaohuochai.site/blog/php_function28.jpg)


**CURDATE()**

&emsp;&emsp;CURDATE()函数返回当前日期


![function29](https://pic.xiaohuochai.site/blog/php_function29.jpg)


**CURTIME()**

&emsp;&emsp;CURTIME()函数返回当前时间


![function30](https://pic.xiaohuochai.site/blog/php_function30.jpg)


**DATE_ADD()**

&emsp;&emsp;DATE_ADD()函数日期变化，可以增加，也可以减少


![function31](https://pic.xiaohuochai.site/blog/php_function31.jpg)


&nbsp;**DATEDIFF()**

&emsp;&emsp;DATEDIFF()函数日期差值，两个日期的差值


![function32](https://pic.xiaohuochai.site/blog/php_function32.jpg)


**DATE_FORMAT()**

&emsp;&emsp;DATE_FORMAT()函数进行日期格式化


![function33](https://pic.xiaohuochai.site/blog/php_function33.jpg)


&nbsp;

### 信息函数


![function34](https://pic.xiaohuochai.site/blog/php_function34.jpg)

**CONNECTION_ID()**

&emsp;&emsp;CONNECTION_ID()返回连接ID(线程ID)


![function35](https://pic.xiaohuochai.site/blog/php_function35.jpg)


**DATEBASE()**

&emsp;&emsp;DATEBASE()返回当前数据库名称


![function36](https://pic.xiaohuochai.site/blog/php_function36.jpg)


**LAST_INSERT_ID()**

&emsp;&emsp;LAST_INSERT_ID()返回最后插入记录的ID，当一次性写入多条记录时，函数返回的ID为第一条记录的ID


![function37](https://pic.xiaohuochai.site/blog/php_function37.jpg)


![function38](https://pic.xiaohuochai.site/blog/php_function38.jpg)


**USER()**

&emsp;&emsp;USER()返回当前用户

**VERSION()**

&emsp;&emsp;VERSION()返回版本信息


![function39](https://pic.xiaohuochai.site/blog/php_function39.jpg)

<div>&nbsp;</div>

### 聚合函数


![function40](https://pic.xiaohuochai.site/blog/php_function40.jpg)

&emsp;&emsp;聚合函数只能用于数据表，不能用于单个数值的计算


![function41](https://pic.xiaohuochai.site/blog/php_function41.jpg)


&emsp;&emsp;下面建立一个test数据表用来测试数据


![function42](https://pic.xiaohuochai.site/blog/php_function42.jpg)

<div>
<pre>AVG()：平均值
COUNT()：计数 
MAX()：最大值 
MIN()：最小值
SUM()：求和</pre>
</div>

![function43](https://pic.xiaohuochai.site/blog/php_function43.jpg)

<div>&nbsp;</div>

### 加密函数


![function44](https://pic.xiaohuochai.site/blog/php_function44.jpg)

**MD5()**

&emsp;&emsp;MD5()：信息摘要算法，为以后的Web页面做准备，尽量使用MD5()

**PASSWORD()**

&emsp;&emsp;PASSWORD()：密码算法，通过PASSWORD()修改当前用户和其他用户的密码，修改客户端自己的密码


![function45](https://pic.xiaohuochai.site/blog/php_function45.jpg)

<div>&nbsp;</div>

### 自定义函数

&emsp;&emsp;函数可以返回任意类型的值，同样可以接收这些类型的参数。函数参数和返回值之前没有必然的联系

&emsp;&emsp;注意：一个函数最多可以有1024个参数

&emsp;&emsp;用户自定义函数(user-defined function,UDF)是一种对MySQL扩展的途径，其用法与内置函数相同

&emsp;&emsp;自定义函数的两个必要条件：1、参数；2、返回值

**创建自定义函数**

<div>
<pre>CREATE FUNCTION function_name
RETURNS
{STRING|INTEGER|REAL|DECIMAL}
routine_body</pre>
</div>

&emsp;&emsp;关于自定义函数的函数体

&emsp;&emsp;1.函数体可以由合法的SQL语句构成；

&emsp;&emsp;2.函数体可以是简单的SELECT或INSERT语句；

&emsp;&emsp;3.函数体如果为复合结构则使用BEGIN...END语句；

&emsp;&emsp;4.复合结构可以包含声明、循环、控制结构。

**创建不带参数的自定义函数**

<div>
<pre>CREATE FUNCTION f1() RETURNS VARCHAR(30)
RETURN DATE_FORMAT(NOW(),'%Y年%m月%d日 %H点:%i分:%s秒');</pre>
</div>

![function46](https://pic.xiaohuochai.site/blog/php_function46.jpg)


**创建带参数的自定义函数**

<div>
<pre>CREATE FUNCTION f2(num1 SMALLINT UNSIGNED,num2 SMALLINT UNSIGNED) RETURNS FLOAT(10,2) UNSIGNED RETURN  (num1+num2)/2;</pre>
</div>

![function47](https://pic.xiaohuochai.site/blog/php_function47.jpg)


&emsp;&emsp;注意：如果自定义函数存在符合结构的多个语句，函数体要包含在BEGIN...END内，同时，需要通过DELIMITER将默认的结束符 ; 修改成其他符号，如：// &nbsp; $$ &nbsp;，以免函数由于语句结尾的 ; 号导致中断

**删除函数**

<div>
<pre>DROP FUNCTION [IF EXISTS] function_name</pre>
</div>
