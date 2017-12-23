# mysql中文乱码问题

　　由于编码错误，造成的数据库中文识别成乱码或问号的问题非常常见，本文将详细说明解决办法

&nbsp;

### 配置文件

　　解决中文识别问题的第一步是修改mysql的配置文件my.ini

　　在[client]下添加

<div class="cnblogs_code">
<pre>default-character-set = utf8</pre>
</div>

　　在[mysqld]下添加

<div class="cnblogs_code">
<pre>character-set-server = utf8</pre>
</div>

　　然后重新启动服务

&nbsp;

### 数据库编码

　　首先，新建一个数据库

![chinese1](https://pic.xiaohuochai.site/blog/php_chinese1.jpg)

　　通过下列代码查看数据库的编码类型

![chinese2](https://pic.xiaohuochai.site/blog/php_chinese2.jpg)

　　查看编码类型是否是utf8，如果不是，则使用下列代码修改为utf8

![chinese3](https://pic.xiaohuochai.site/blog/php_chinese3.jpg)
<div>&nbsp;</div>

### 数据表编码

　　新建一个数据表

![chinese4](https://pic.xiaohuochai.site/blog/php_chinese4.jpg)

　　通过下列代码查看数据表的编码类型

![chinese5](https://pic.xiaohuochai.site/blog/php_chinese5.jpg)

　　查看编码类型是否是utf8，如果不是，则使用下列代码修改为utf8

![chinese6](https://pic.xiaohuochai.site/blog/php_chinese6.jpg)

&nbsp;

### 中文记录

　　下面添加一条带中文的记录

![chinese7](https://pic.xiaohuochai.site/blog/php_chinese7.jpg)

　　通过SELECT语句将记录读出来

![chinese8](https://pic.xiaohuochai.site/blog/php_chinese8.jpg)

　　中文正确的显示出来了

　　欢迎交流

