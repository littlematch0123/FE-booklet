# 数据库设计

&emsp;&emsp;本文将详细介绍数据库设计的相关知识

&nbsp;

### 设计范式

&emsp;&emsp;数据库设计共有三大范式：

&emsp;&emsp;第一范式：无重复的列

&emsp;&emsp;第二范式：属性完全依赖于主键

&emsp;&emsp;第三范式：属性不能依赖于主属性

&emsp;&emsp;下面将分别对这三个范式进行详细介绍

&nbsp;

### 第一范式

&emsp;&emsp;数据库表中的每一列都是不可分割的基本数据项，同一列中不能有多个值。具体而言，有以下两条要求

&emsp;&emsp;1、每一列属性都是不可再分的，确保每一列的原子性

&emsp;&emsp;2、两列的属性相近或相似或一样，尽量合并属性一样的列， 确保不产生冗余数据

&emsp;&emsp;以考勤表设计为例，考勤表用来记录每天学生的考勤情况

&emsp;&emsp;最简单的情况是，每一天都建立一张表。字段是每个学生的姓名，列值表示是否签到。这样，可以很方便的存储当天的考勤情况。但是，这也导致了每天都需要在数据库里新建一张考勤表。而且，这种做法违反了第一范式，这张考勤表的字段的属性含义都是一样的，都是记录学员的考勤情况。因此，这些字段是需要合并的

![design1](https://pic.xiaohuochai.site/blog/mysql_design1.png)

&emsp;&emsp;更优化的设计是，第一字段是学生姓名，第二字段是0101表示`1月1日，第三字段是0102表示1月2日，以此类推。这种做法，不再需要设计那么多表，将学生的姓名列合并成了一个姓名列。但是，同样它没有遵循第一范式，1年365天，&nbsp;代码除了学生姓名列外，还需要设置365个字段。而且，这些列的含义都是一样的，记录当天的考勤。因此，这些字段也是需要合并的

![design2](https://pic.xiaohuochai.site/blog/mysql_design2.png)

&emsp;&emsp;下面是优化的情况，把所有的日期合并成一个日期字段，新增一个考勤状态字段，如下所示，完全遵循了第一范式，没有重复的列，且每一列都是可拆分的。

![design3](https://pic.xiaohuochai.site/blog/mysql_design3.png)

&emsp;&emsp;总而言之，用第一范式设计数据库时，就是分解数据，并将属性相似的列合并

&nbsp;

### 第二范式

&emsp;&emsp;第二范式需要遵循以下要求：

&emsp;&emsp;1、一个表表必须有一个主键

&emsp;&emsp;2、没有包含在主键中的列必须完全依赖于主键，而不能只 依赖于主键的一部分

&emsp;&emsp;以下面购物车表为例，用户ID和商品ID构成了商品的主键，数量列依赖于用户购买商品的数量，单价和商品名称只依赖于商品ID。因此，这张表不满足第二范式

![design4](https://pic.xiaohuochai.site/blog/mysql_design4.png)

&emsp;&emsp;优化后，修改如下

![design5](https://pic.xiaohuochai.site/blog/mysql_design5.png)

&nbsp;

### 第三范式

&emsp;&emsp;非主键列必须直接依赖于主键，不能存在传递依赖。第三范式，相较于第二范式而言，强调的是直接依赖，而不能是传递依赖

&emsp;&emsp;关于传递依赖，以下面的中奖信息表为例，中奖金额依赖于中奖等级，而中将等级及依赖于用户ID，这就是传递依赖

![design6](https://pic.xiaohuochai.site/blog/mysql_design6.png)

&emsp;&emsp;要遵循第三范式，就要消除传递依赖

![design7](https://pic.xiaohuochai.site/blog/mysql_design7.png)

### 新闻系统

&emsp;&emsp;下面尝试利用三个范式，来设计新闻系统数据库。包括以下要点：

&emsp;&emsp;1、用户名、密码、是否是管理员

&emsp;&emsp;2、新闻标题、新闻内容、作者、新闻时间、是否上线

&emsp;&emsp;3、评论人、评论内容、评论时间、评论源

&emsp;&emsp;分别对应用户表、新闻表和评论表

&emsp;&emsp;一般来说，用户名长度不超过20个字符，密码长度不超过20个字符，新闻标题长度不超过30个字符，新闻内容长度不超过5000个字符，评论内容长度不超过300个字符

&emsp;&emsp;用户表详细如下

![design8](https://pic.xiaohuochai.site/blog/mysql_design8.png)

&emsp;&emsp;新闻表详细如下

![design9](https://pic.xiaohuochai.site/blog/mysql_design9.png)

&emsp;&emsp;评论表详细如下

![design10](https://pic.xiaohuochai.site/blog/mysql_design10.png)

&nbsp;

## 最后

&emsp;&emsp;在设计数据库时，只需满足以上三个范式，就可以设计既合理又满足需求的数据库

