# MongoDB数据库的数据类型和$type操作符

&emsp;&emsp;本文将详细介绍MongoDB数据库的数据类型和$type操作符

&nbsp;

### 数据类型

&emsp;&emsp;MongoDB支持以下数据类型

<div>
<pre>类型        数字          备注
Double        1         双精度浮点数 - 此类型用于存储浮点值
String        2         字符串 - 这是用于存储数据的最常用的数据类型。MongoDB中的字符串必须为UTF-8
Object        3         对象 - 此数据类型用于嵌入式文档
Array         4         数组 - 此类型用于将数组或列表或多个值存储到一个键中
Binary data   5         二进制数据 - 此数据类型用于存储二进制数据
Undefined     6         已废弃
Object id     7         对象ID - 此数据类型用于存储文档的ID
Boolean       8         布尔类型 - 此类型用于存储布尔值(true / false)值
Date          9         日期 - 此数据类型用于以UNIX时间格式存储当前日期或时间。可以通过创建日期对象并将日，月，年的日期进行指定自己需要的日期时间
Null          10        Null - 此类型用于存储Null值
Regular       11        正则表达式 - 此数据类型用于存储正则表达式
JavaScript    13        代码 - 此数据类型用于将JavaScript代码存储到文档中
Symbol        14        符号 - 该数据类型与字符串相同；但是，通常保留用于使用特定符号类型的语言
JavaScript (with scope)  15     代码 - 此数据类型用于将带作用域的JavaScript代码存储到文档中
32-bit integer           16     32位整型 - 此类型用于存储数值
Timestamp                17     时间戳 - 当文档被修改或添加时，可以方便地进行录制
64-bit integer           18     64位整型 - 此类型用于存储数值
Min key                  255    最小键 - 此类型用于将值与最小BSON元素进行比较    
Max key                  127    最大键 - 此类型用于将值与最大BSON元素进行比较</pre>
</div>

&nbsp;

### $type

&emsp;&emsp;$type操作符是基于BSON类型来检索集合中匹配的数据类型，并返回结果


![types1](https://pic.xiaohuochai.site/blog/mongo_types1.png)


&emsp;&emsp;查找值类型为数字的x，数字的$type为1


![types2](https://pic.xiaohuochai.site/blog/mongo_types2.png)


&emsp;&emsp;查找值类型为字符串的x，字符串的$type为2


![types3](https://pic.xiaohuochai.site/blog/mongo_types3.png)


&emsp;&emsp;查找值类型为布尔值的x，布尔值的$type为8


![types4](https://pic.xiaohuochai.site/blog/mongo_types4.png)


