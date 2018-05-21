# mysql数据库基础操作

&emsp;&emsp;SQL是一门用于访问和处理数据库的ANSI的标准计算机语言。但是，存在着很多不同版本的SQL语言，为了与ANSI(美国国家标准学会)标准相兼容，它们必须以相似的方式共同地来支持一些主要的关键词(如 SELECT、UPDATE、DELETE、INSERT、WHERE等)

&emsp;&emsp;RDBMS指的是关系型数据库管理系统，RDBMS是SQL的基础，同样也是所有现代数据库系统的基础，比如Oracle、MySQL和Access。RDBMS中的数据存储在被称为表(tables)的数据库对象中。表是相关的数据项的集合，它由列和行组成

&emsp;&emsp;下面将介绍mysql数据库的基础操作

&nbsp;

### 登录退出

&emsp;&emsp;操作数据库的第一步是登录数据库，通常需要提供一个MySQL用户名和密码。如果服务器运行在登录服务器之外的其它机器上，还需要指定主机名

&emsp;&emsp;注意：在退出数据库之后，cmd清空屏幕的操作是输入cls(相当于clear screen)

<div>
<pre>参数           描述
-D            (database)打开指定数据库
-h            (host)服务器名称
-p            (password)密码
-P            (port)端口号
-u            (user)用户名
-V            (version)输出版本信息并退出</pre>
</div>

![base1](https://pic.xiaohuochai.site/blog/mysql_base1.jpg)

&emsp;&emsp;mysql数据库退出有三种方式，分别是exit;、quit;、\q;。任选一种即可

![base2](https://pic.xiaohuochai.site/blog/mysql_base2.jpg)

<div>&nbsp;</div>

### 语句规范

&emsp;&emsp;在操作数据库之前，要先了解数据库的语句规范，主要有以下三条

&emsp;&emsp;1、关键字与函数名称全部大写

&emsp;&emsp;2、数据库名称、表名称、字段名称全部小写

&emsp;&emsp;3、SQL语句必须以分号结尾

&nbsp;

### 常用命令

&emsp;&emsp;mysql数据库有以下三个常用命令

<div>
<pre>SELECT VERSION();         显示当前服务器版本
SELECT NOW();             显示当前日期时间
SELECT USER();            显示当前用户</pre>
</div>

![base3](https://pic.xiaohuochai.site/blog/mysql_base3.jpg)

&emsp;&emsp;注意：使用DELEMITER语句可以修改结束符

<div>
<pre>//结束符为两条斜线
DELEMITER //
//结束符为一个点号
DELEMITER .</pre>
</div>

&nbsp;

### 数据库操作

&emsp;&emsp;数据库操作的第一步是创建数据库

<div>
<pre>CREATE {DATABASE | SCHEMA} [IF NOT EXISTS] db_name [DEFAULT] CHARACTER SET [=] charset_name</pre>
</div>

![base4](https://pic.xiaohuochai.site/blog/mysql_base4.jpg)

&emsp;&emsp;创建数据库并不表示选定并使用它，必须明确地操作，所以数据库操作的第二步是选择数据库

<div>
<pre>USE db_name</pre>
</div>

![base5](https://pic.xiaohuochai.site/blog/mysql_base5.jpg)

&emsp;&emsp;下面，我们来查看下服务器下的数据库列表

<div>
<pre>SHOW {DATABASES | SCHEMAS} [LIKE 'pattern' | WHERE expr] </pre>
</div>

![base6](https://pic.xiaohuochai.site/blog/mysql_base6.jpg)

&emsp;&emsp;有时，我们需要修改数据库

<div>
<pre>ALTER {DATABASE | SCHEMA} [db_name] [DEFAULT] CHARACTER SET [=] charset_name</pre>
</div>

![base7](https://pic.xiaohuochai.site/blog/mysql_base7.jpg)

&emsp;&emsp;最后，是删除数据库的操作

<div>
<pre>DROP {DATABASE | SCHEMA} [IF EXISTS] db_name</pre>
</div>

![base8](https://pic.xiaohuochai.site/blog/mysql_base8.jpg)

&emsp;&emsp;再查看下服务器下的数据库列表

![base9](https://pic.xiaohuochai.site/blog/mysql_base9.jpg)
