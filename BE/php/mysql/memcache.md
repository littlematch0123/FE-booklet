# 前端学PHP之MemCache

&emsp;&emsp;Memcache是一个高性能的分布式的内存对象缓存系统，通过在内存里维护一个统一的巨大的hash表，它能够用来存储各种格式的数据，包括图像、视频、文件以及数据库检索的结果等。简单的说就是将数据调用到内存中，然后从内存中读取，从而大大提高读取速度。本文将详细介绍MemCache的内容

&nbsp;

### 作用

&emsp;&emsp;Memcache是danga的一个项目，最早是LiveJour &nbsp;MemCachenal 服务的，最初为了加速 LiveJournal 访问速度而开发的，后来被很多大型的网站采用

&emsp;&emsp;Memcache是以守护程序方式运行于一个或多个服务器中，随时会接收客户端的连接和操作

&emsp;&emsp;MemCache缓存系统最主要的就是为了提高动态网页应用，分担数据库检索的压力。对于网站流量比较大的，可以使用memcache缓解数据库的压力，主要的焦点集中在以下两个方面：1. 使用MemCache作为中间缓存层减少数据库的压力和2. MemCache分布式的应用

&nbsp;

### 安装

&emsp;&emsp;1、[下载](http://7xpdkf.com1.z0.glb.clouddn.com/memcached.zip)软件，解压后，共以下三个文件

![memcache1](https://pic.xiaohuochai.site/blog/php_memcache1.jpg)


&emsp;&emsp;2、安装到windows服务，打开cmd命令行，进入memcached目录，执行memcached -d install命令，安装服务

&emsp;&emsp;注意：如果在没有安装过的情况下，出现"failed to install service or service already installed"错误，可能是cmd.exe需要用管理员身份运行

![memcache2](https://pic.xiaohuochai.site/blog/php_memcache2.jpg)


&emsp;&emsp;3、启动服务，执行memcached.exe -d start

![memcache3](https://pic.xiaohuochai.site/blog/php_memcache3.jpg)


&emsp;&emsp;最后，在计算机-&gt;管理-&gt;服务中，可以找到memcached服务

![memcache4](https://pic.xiaohuochai.site/blog/php_memcache4.jpg)


&nbsp;

### 管理

&emsp;&emsp;memcache的端口号是11211，在启动memcache服务后进行连接

&emsp;&emsp;注意：telnet在windows下默认是不开启的，所以需要手动开启

<div>
<pre>telnet 127.0.0.1 11211 </pre>
</div>

![memcache5](https://pic.xiaohuochai.site/blog/php_memcache5.jpg)


&emsp;&emsp;进入memcache服务后，输入stats命令，会出现如下所示

![memcache6](https://pic.xiaohuochai.site/blog/php_memcache6.jpg)


&emsp;&emsp;stats命令的功能正如其名：转储所连接的memcached实例的当前统计数据。在下例中，执行 stats 命令显示了关于当前 memcached 实例的信息

<div>
<pre>STAT pid 22459&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 进程ID 
STAT uptime 1027046&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 服务器运行秒数 
STAT time 1273043062&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 服务器当前unix时间戳 
STAT version 1.4.4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 服务器版本 
STAT pointer_size 64&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 操作系统字大小(这台服务器是64位的) 
STAT rusage_user 0.040000&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 进程累计用户时间 
STAT rusage_system 0.260000&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 进程累计系统时间 
STAT curr_connections 10&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 当前打开连接数 
STAT total_connections 82&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 曾打开的连接总数 
STAT connection_structures 13&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 服务器分配的连接结构数 
STAT cmd_get 54&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 执行get命令总数 
STAT cmd_set 34&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 执行set命令总数 
STAT cmd_flush 3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 指向flush_all命令总数 
STAT get_hits 9&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; get命中次数 
STAT get_misses 45&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; get未命中次数 
STAT delete_misses 5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; delete未命中次数 
STAT delete_hits 1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; delete命中次数 
STAT incr_misses 0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; incr未命中次数 
STAT incr_hits 0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; incr命中次数 
STAT decr_misses 0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; decr未命中次数 
STAT decr_hits 0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; decr命中次数 
STAT cas_misses 0&nbsp;&nbsp;&nbsp;                       cas未命中次数 
STAT cas_hits 0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; cas命中次数 
STAT cas_badval 0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 使用擦拭次数 
STAT auth_cmds 0 
STAT auth_errors 0 
STAT bytes_read 15785&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 读取字节总数 
STAT bytes_written 15222&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 写入字节总数 
STAT limit_maxbytes 1048576&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 分配的内存数（字节） 
STAT accepting_conns 1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 目前接受的链接数 
STAT listen_disabled_num 0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
STAT threads 4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 线程数 
STAT conn_yields 0 
STAT bytes 0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 存储item字节数 
STAT curr_items 0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; item个数 
STAT total_items 34&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; item总数 
STAT evictions 0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 为获取空间删除item的总数 </pre>
</div>

&emsp;&emsp;使用命令quit，就可以退出memcache操作界面了

![memcache7](https://pic.xiaohuochai.site/blog/php_memcache7.jpg)


&nbsp;

### 命令

&emsp;&emsp;通过使用memcache.exe -h可以查看memcache支持的命令

![memcache8](https://pic.xiaohuochai.site/blog/php_memcache8.jpg)

<div>
<pre>-p &lt;num&gt;   设置端口号(默认不设置为: 11211)
-U &lt;num&gt;   UDP监听端口(默认: 11211, 0 时关闭) 
-l &lt;ip_addr&gt; 绑定地址(默认:所有都允许,无论内外网或者本机更换IP，有安全隐患，若设置为127.0.0.1就只能本机访问)
-d   独立进程运行
-d start 启动memcached服务 
-d restart 重起memcached服务 
-d stop|shutdown 关闭正在运行的memcached服务 
-d install 安装memcached服务 
-d uninstall 卸载memcached服务 
-u &lt;username&gt; 绑定使用指定用于运行进程&lt;username&gt;
-m &lt;num&gt;  允许最大内存用量，单位M (默认: 64 MB)
-P &lt;file&gt; 将PID写入文件&lt;file&gt;，可以使得后边进行快速进程终止, 需要与-d 一起使用
-M 内存耗尽时返回错误，而不是删除项 
-c  最大同时连接数，默认是1024 
-f 块大小增长因子，默认是1.25 
-n 最小分配空间，key+value+flags默认是48 
-h 显示帮助</pre>
</div>

&emsp;&emsp;一般地，memcache使用以下5个常用的命令

<div>
<pre>stats: 当前所有memcached服务器运行的状态信息
add: 添加一个数据到服务器
set: 替换一个已经存在的数据，如果数据不存在，则和add命令相同。
get: 从服务器端提取指定的数据。
delete: 删除指定的单个数据，如果要清除所有数据，可以使用flush_all指令</pre>
</div>

&emsp;&emsp;关于memcache的错误提示主要有以下三个指令：

<div>
<pre>ERROR -- 普通错误信息，比如指令错误
CLIENT_ERROR &lt;错误信息&gt; -- 客户端错误
SERVER_ERROR &lt;错误信息&gt; --服务器端错误</pre>
</div>

**命令格式**

&emsp;&emsp;格式：&lt;命令&gt; &lt;键&gt; &lt;标记&gt; &lt;有效期&gt; &lt;数据长度&gt;

&emsp;&emsp;命令：add(添加)、set(修改)、delete(删除)、get(获取)

&emsp;&emsp;&lt;键&gt;-key：发送过来指令的key内容

&emsp;&emsp;&lt;标记&gt;-flags：调用set指令保存数据时的flags标记

&emsp;&emsp;有效期：数据在服务器上的有效期限，如果是0，则数据永远有效，单位是秒

&emsp;&emsp;数据的长度：block data 块数据的长度，一般在这个长度结束以后下一行跟着block data数据内容

**返回值**

&emsp;&emsp;发送完数据后，客户端一般等待服务器端的返回，服务器端的返回值包括以下两种：

<div>
<pre>STORED 数据保存成功
NOT_STORED 数据保存失败，是因为服务器端这个数据key已经存在</pre>
</div>

&emsp;&emsp;下面以add one 1 0 5为例，add表示添加数据，one表示键名，1表示标记，0表示有效期永久，5表示长度为5

&emsp;&emsp;回车后输入12345，再回车，表示键值为12345，并保存成功

![memcache9](https://pic.xiaohuochai.site/blog/php_memcache9.jpg)


&emsp;&emsp;通过get one可以找到键名one的相关信息及键值

![memcache10](https://pic.xiaohuochai.site/blog/php_memcache10.jpg)


&emsp;&emsp;然后通过set one将标记改为2

![memcache11](https://pic.xiaohuochai.site/blog/php_memcache11.jpg)


&emsp;&emsp;再通过get one可以找到键名one的相关信息及键值

![memcache12](https://pic.xiaohuochai.site/blog/php_memcache12.jpg)


&emsp;&emsp;通过delete one删除one，再通过get one读取one的信息时为空

![memcache13](https://pic.xiaohuochai.site/blog/php_memcache13.jpg)


&emsp;&emsp;一般地，使用memcache并不常用遍历操作，但可以模拟出遍历的行为。首先，先存入5个数据

![memcache14](https://pic.xiaohuochai.site/blog/php_memcache14.jpg)


&emsp;&emsp;然后，执行stats items命令，可以看到出现很多的items行。执行stats cachedump 1 0命令。这里的1表示上面图中items后面的数字，0标示显示全部的数据，如果是1就标示只显示1条

![memcache15](https://pic.xiaohuochai.site/blog/php_memcache15.jpg)

