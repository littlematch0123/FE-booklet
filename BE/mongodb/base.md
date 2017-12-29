# MongoDB数据库基础

　　为了保存网站的用户数据和业务数据，通常需要一个数据库。MongoDB和Node.js特别般配，因为Mongodb是基于文档的非关系型数据库，文档是按BSON（JSON的轻量化二进制格式）存储的，增删改查等管理数据库的命令和JavaScript语法很像。本文将详细介绍MongoDB数据库

&nbsp;

### 数据库

　　数据库，顾名思义，是数据存储的仓库，主要功能有两个

　　1、有组织地存放数据

　　与在磁盘上自己存放文件不同，数据库替用户组织了数据的存储形式，用户只需要按照数据库提供的接口将数据写入，数据便会按照标准的格式被存储起来

　　2、按照不同的需求进行查询

　　数据库不仅要能写入数据，还支持数据查询，并且能够按照不同的需求进行查询。因为存储是有组织的，因此查询上可以更规范化，查询速度也会快很多

　　不同的数据库的区别就是存放数据的组织不同，同时提供了不同种类的查询。用户可以按照自己的需求，选择合适的数据库

【分类】

　　数据库的分类有很多种，按照对SQL语言的支持，可以分为以下两种：

　　1、SQL数据库，比如Oracle、Mysql等

　　2、NoSQL数据库，比如Redis、MongoDB等

　　随着在规模互联网应用的出现，传统的SQL数据库遇到了一些设计上的弊端。比如，SQL对表的定义使应用不够灵活，横向扩展比较困难。与一些特性难以满足相比，反而是SQL数据库的很多特性没有用武之地。比如，在很多场景下，及时存取并不是必要的，也没有特别多的事务需求，而这些额外的特性消耗着SQL数据库的性能

　　因此NoSQL数据库应运而生，NoSQL全称是Not Only SQL，意即"不仅仅是SQL"。但事实上，绝大多数NoSQL数据库都放弃了对SQL语言的支持。与SQL关系型数据库相比，NoSQL非关系型数据库大多放弃了一些特性。比如，放弃了实时一致性、对事务的完整支持以及多表查询等。听起来缺点很多，但收益也明显，NoSQL数据库简单便捷、方便扩展，并且有更好的性能

&nbsp;

### 概述

　　MongoDB是一个开源的NoSQL数据库，在国内被称为芒果数据库。Linux、Apache、MySQL和PHP组成了非常有名的LAMP架构。现在，有人提议将LAMP中的代表M的MySQL替换为MongoDB

　　NoSQL数据库有很多，为什么要选择MongoDB呢？

　　MongoDB 是一个基于分布式文件存储的数据库。由 C++ 语言编写，旨在为 WEB 应用提供可扩展的高性能数据存储解决方案。MongoDB使用集合（collection）和文档（document）来描述和存储数据，集合（collection）就相当于表，文档（document）相当于行，字段相当于列，不像MySQL之类的关系型数据库，表结构是固定的，比如某一行由若干列组成，行行都一样，而MongoDB不同，一个集合里的多个文档可以有不同的结构，更灵活一些

　　MongoDB有自己很鲜明的特色，总结起来有以下4条

　　1、没有表结构的限制

　　传统SQL数据库中，对每张表都需要定义表结构。如果有新的存储需求，往往需要添加新的字段，更改表结构。在一些场景下，会显得很不方便，而对于MongoDB，这不再是问题。因为它没有表结构这个概念，在使用一张表之前，不需要对这张表进行任何初始化操作。MongoDB的这种特性对快捷开发和多变的业务需求是很合适的

　　2、完全的索引支持

　　有些NoSQL数据库，比如redis，它是内存数据库，速度很快。但是，做为键值数据库，只支持一种按键查询的方式。灵活性、使用范围和易用性都受到影响；再比如hbase，写入速度很快。但是，同样查询受限，它只支持单索引，二级索引需要自己实现

　　而MongoDB支持单键索引、多键索引、全文索引和地理位置索引。所以MongoDB是功能非常完善的NoSQL数据库，也被称为最接近关系数据库的非关系数据库

　　3、良好的数据安全性和方便的规模扩展

　　MongoDB使用复制集做多副本存储，以保证数据的安全性。同时，MongoDB内置的分片技术可以很方便地进行数据规模的扩展。分片技术是很新颖的一个特性，它包含了自动数据接口，动态扩容和缩容等一系列在其他数据库中需要大量人工操作的工作，同时提供了对数据库的统一访问入口，不需要在应用层再进行分发，显著减少了人工成本

　　4、完善的文档支持和驱动支持

&nbsp;

### 安装

　　首先，在官网的下载页面选择合适的MongoDB版本进行下载


![base1](https://pic.xiaohuochai.site/blog/mongo_base1.png)


　　然后，一步一步进行安装即可


![base2](https://pic.xiaohuochai.site/blog/mongo_base2.png)


![base3](https://pic.xiaohuochai.site/blog/mongo_base3.png)


　　默认情况下，安装到C盘的Program Files文件夹下的MongoDB文件夹中


![base4](https://pic.xiaohuochai.site/blog/mongo_base4.png)


![base5](https://pic.xiaohuochai.site/blog/mongo_base5.png)


&nbsp;

### 服务器配置

【搭建服务器】

　　搭建服务器，需要进行以下几个步骤

　　1、创建data文件夹存储数据库的数据文件；创建log文件夹存储数据库的日志文件；创建bin文件夹存储数据库的可执行文件；创建conf文件夹来存储数据库的配置文件

　　2、在windows系统下需要设置环境变量，否则在命令行中会提示mongod命令不可用

　　在环境变量的path中，添加mongod.exe文件的目录


![base6](https://pic.xiaohuochai.site/blog/mongo_base6.png)


　　3、接下来，有两种方式启动mongoDB服务，一种如下所示，设置dppath参数值为自定义的目录路径

<div class="cnblogs_code">
<pre>mongod --dbpath=D:/app/mongo/data</pre>
</div>

　　由下图看出，mongodb的默认端口是27017


![base7](https://pic.xiaohuochai.site/blog/mongo_base7.png)


　　4、另一种是在conf文件夹下新建mongod.conf文件，在这个文件中将设置mongodb启动的配置参数

<div class="cnblogs_code">
<pre>dbpath = data
logpath = log/mongod.log</pre>
</div>
<div class="cnblogs_code">
<pre>mongod -f conf/mongod.conf</pre>
</div>

　　这种方法在命令行工具中没有任何提示，因为记录已经保存到日志文件中，此时mongodb服务已经正常开启


![base8](https://pic.xiaohuochai.site/blog/mongo_base8.png)


【连接服务器】

　　在搭建好mongodb服务器之后，需要使用客户端mongo进行连接，才能进行下一步的操作

　　因为是使用mongo连接mongodb服务器，所以需要保证启动mongodb服务器的命令行工具不被关闭，新开一个命令行工具，并输入mongo 127.0.0.1/test，test为数据库的名称


![base9](https://pic.xiaohuochai.site/blog/mongo_base9.png)


【关闭mongod服务】

　　首先切换到admin数据库(use admin)，然后使用db.shutdownServer()命令来关闭服务


![base10](https://pic.xiaohuochai.site/blog/mongo_base10.png)


&nbsp;

### 数据库操作

【默认】

　　MongoDB 中默认的数据库为 test，如果没有创建新的数据库，集合将存放在 test 数据库中

【查看】

　　使用show dbs来查看数据库

<div class="cnblogs_code">
<pre>show dbs</pre>
</div>

![base11](https://pic.xiaohuochai.site/blog/mongo_base11.png)


【创建/切换】

&nbsp;　　使用use命令来切换/创建数据库，会发现创建的数据库并不在数据库的列表中， 要显示它，需要向数据库插入一些数据

<div class="cnblogs_code">
<pre>use db_name</pre>
</div>

![base12](https://pic.xiaohuochai.site/blog/mongo_base12.png)


【显示当前数据库】

　　使用db命令来显示当前数据库

<div class="cnblogs_code">
<pre>db</pre>
</div>

![base13](https://pic.xiaohuochai.site/blog/mongo_base13.png)


【将数据写入集合中】

　　使用db.集合名.insert(文档)来将文档的数据写入集合中，文档的格式为JSON。而所有存储在集合中的数据都是BSON格式。BSON是一种类json的一种二进制形式的存储格式，简称Binary JSON。

<div class="cnblogs_code">
<pre>db.collection_name.insert()</pre>
</div>

![base14](https://pic.xiaohuochai.site/blog/mongo_base14.png)


【查看集合】

　　上面的插入操作，会自动创建集合db1_coll1，使用show collections命令可以查看当前数据库中的所有集合


![base15](https://pic.xiaohuochai.site/blog/mongo_base15.png)


【删除数据库】

　　这将删除当前所选数据库。 如果没有选择任何数据库，那么它将删除默认的&rsquo;`test`&lsquo;数据库

<div class="cnblogs_code">
<pre>db.dropDatabase()</pre>
</div>

![base16](https://pic.xiaohuochai.site/blog/mongo_base16.png)


&nbsp;

### 集合操作

　　集合类似于SQL数据库中的数据表，标识为collection

【查看集合】

　　&nbsp;可以使用命令`show collections`检查创建的集合

　　[注意]也可以使用show tables来查看集合


![base17](https://pic.xiaohuochai.site/blog/mongo_base17.png)


【创建集合】

　　在插入文档时，MongoDB首先检查上限集合`capped`字段的大小，然后检查`max`字段

<div class="cnblogs_code">
<pre>db.createCollection(name, {capped: &lt;Boolean&gt;, autoIndexId: &lt;Boolean&gt;, size: &lt;number&gt;, max &lt;number&gt;} )</pre>
</div>

　　name:集合的名字

　　capped:是否启用集合限制，如果开启需要制定一个限制条件，默认为不启用，这个参数没有实际意义

　　max:集合中最大条数限制，默认为没有限制

　　size:限制集合使用空间的大小，默认为没有限制，size的优先级比max要高

　　autoIndexId:是否使用_id作为索引，默认为使用(true或false)


![base18](https://pic.xiaohuochai.site/blog/mongo_base18.png)


　　[注意]向集合中插入文档时，如果集合不存在，则会自动创建集合


![base19](https://pic.xiaohuochai.site/blog/mongo_base19.png)


【删除集合】

　　MongoDB 的&nbsp;`db.collection_name.drop()`&nbsp;用于从数据库中删除集合。如果选定的集合成功删除，`drop()`方法将返回`true`，否则返回`false`


![base20](https://pic.xiaohuochai.site/blog/mongo_base20.png)


&nbsp;

### 数据导入

　　在mongoimport的安装目录下，可以使用如下命令导入数据文件

　　使用window自带的CMD，使用反斜杠

<div class="cnblogs_code">
<pre>mongoimport -h 192.168.1.106:27017 -d db1 -c users --file D:\app\vue\imooc\resource\dumall-users</pre>
</div>

　　使用bash工具时，使用正斜杠


![base21](https://pic.xiaohuochai.site/blog/mongo_base21.png)


　　mongoimport的详细命令如下


![base22](https://pic.xiaohuochai.site/blog/mongo_base22.png)


&nbsp;

### 关闭服务

　　如果想关闭mongodb服务，可以使用mongo来实现

<div class="cnblogs_code">
<pre>mongo 192.168.1.105:27017
use admin
db.shutdownServer()</pre>
</div>

&nbsp;　　也可以直接使用mongod来实现

<div class="cnblogs_code">
<pre>mongod --shutdown</pre>
</div>

