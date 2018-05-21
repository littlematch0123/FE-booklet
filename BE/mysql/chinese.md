# mysql中文乱码问题

&emsp;&emsp;由于编码错误，造成的数据库中文识别成乱码或问号的问题非常常见，本文将详细说明解决办法

&nbsp;

### 配置文件

&emsp;&emsp;解决中文识别问题的第一步是修改mysql的配置文件my.ini

&emsp;&emsp;在client下添加

<div>
<pre>default-character-set = utf8</pre>
</div>

&emsp;&emsp;在mysqld下添加

<div>
<pre>character-set-server = utf8</pre>
</div>

&emsp;&emsp;然后重新启动服务

&nbsp;

### 数据库编码

&emsp;&emsp;首先，新建一个数据库

![chinese1](https://pic.xiaohuochai.site/blog/php_chinese1.jpg)

&emsp;&emsp;通过下列代码查看数据库的编码类型

![chinese2](https://pic.xiaohuochai.site/blog/php_chinese2.jpg)

&emsp;&emsp;查看编码类型是否是utf8，如果不是，则使用下列代码修改为utf8

![chinese3](https://pic.xiaohuochai.site/blog/php_chinese3.jpg)
<div>&nbsp;</div>

### 数据表编码

&emsp;&emsp;新建一个数据表

![chinese4](https://pic.xiaohuochai.site/blog/php_chinese4.jpg)

&emsp;&emsp;通过下列代码查看数据表的编码类型

![chinese5](https://pic.xiaohuochai.site/blog/php_chinese5.jpg)

&emsp;&emsp;查看编码类型是否是utf8，如果不是，则使用下列代码修改为utf8

![chinese6](https://pic.xiaohuochai.site/blog/php_chinese6.jpg)

&nbsp;

### 中文记录

&emsp;&emsp;下面添加一条带中文的记录

![chinese7](https://pic.xiaohuochai.site/blog/php_chinese7.jpg)

&emsp;&emsp;通过SELECT语句将记录读出来

![chinese8](https://pic.xiaohuochai.site/blog/php_chinese8.jpg)

&emsp;&emsp;中文正确的显示出来了

&emsp;&emsp;欢迎交流

