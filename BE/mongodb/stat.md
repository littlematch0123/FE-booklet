# MongoDB数据库索引构建情况分析

　　本文将详细介绍MongoDB数据库索引构建情况分析

### 概述

　　创建索引可以加快索引相关的查询，但是会增加磁盘空间的消耗，降低写入性能。这时，就需要评判当前索引的构建情况是否合理。有4种方法可以使用

　　1、mongostat工具

　　2、profile集合介绍

　　3、日志

　　4、explain分析

&nbsp;

### mongostat

　　mongostat是mongodb自带的状态检测工具，在命令行下使用。它会间隔固定时间获取mongodb的当前运行状态，并输出。如果发现数据库突然变慢或者有其他问题的话，首先就要考虑采用mongostat来查看mongo的状态

　　mongostat是查看mongodb运行状态的程序，使用方式如下

<div class="cnblogs_code">
<pre>mongostat -h ip:port</pre>
</div>

【字段说明】

<div class="cnblogs_code">
<pre>　　insert/s : 每秒插入数据库的对象数量，如果是slave，则数值前有*,则表示复制集操作
　　query/s : 每秒的查询操作次数
　　update/s : 每秒的更新操作次数
　　delete/s : 每秒的删除操作次数
　　getmore/s: 每秒查询cursor(游标)时的getmore操作数
　　command: 每秒执行的命令数，在主从系统中会显示两个值(例如 3|0)，分别代表 本地|复制 命令
　　dirty: 脏数据字节的缓存百分比
　　used:正在使用中的缓存百分比
　　flushes:checkpoint的触发次数在一个轮询间隔期间。一般都是0，间断性会是1， 通过计算两个1之间的间隔时间，可以大致了解多长时间flush一次。flush开销是很大的，如果频繁的flush，可能就要找找原因了
　　vsize： 虚拟内存使用量，单位MB 
　　res: 物理内存使用量，单位MB。 res会慢慢的上升，如果res经常突然下降，要查看下是否有别的程序狂吃内存
　　qr: 客户端等待从MongoDB实例读数据的队列长度
　　qw：客户端等待从MongoDB实例写入数据的队列长度
　　ar: 执行读操作的活跃客户端数量
　　aw: 执行写操作的活客户端数量。如果ar或aw数值很大，那么就是DB被堵住了，DB的处理速度不及请求速度。查看是否有开销很大的慢查询。如果查询一切正常，确实是负载很大，就需要加机器了
　　netIn:MongoDB实例的网络进流量
　　netOut：MongoDB实例的网络出流量
　　conn: 打开连接的总数，是qr,qw,ar,aw的总和
　　time:当前时间</pre>
</div>

【实例】

　　插入100000条数据，并打开mongostat查询mongodb运行状态


![stat1](https://pic.xiaohuochai.site/blog/mongo_stat1.png)


　　由下图看出，插入值insert值在插入数据时大量增加，在插入完毕后变成0。flush两个1之间的间隔时间很长，说明性能还不错；res在慢慢上升，没有出现突然下降的情况，说明没有其他的程序大量占用内容的情况；qrw及arw数据很小，说明数据库读写状态正常，负载较小。总体而言，mongodb数据库运行状态良好


![stat2](https://pic.xiaohuochai.site/blog/mongo_stat2.png)


&nbsp;

### profile

　　mongodb可以通过profile来监控数据，进行优化

【级别】

　　首先，要查看当前是否开启profile功能

　　使用下面的命令会返回level等级，值为0|1|2，0代表关闭，即不记录任何操作；1代表记录慢命令(默认值为100ms)，即记录运行时间超过100ms的操作；2代表全部，即记录任何操作

<div class="cnblogs_code">
<pre>db.getProfilingLevel() </pre>
</div>

　　使用下面的命令可以设置level等级

<div class="cnblogs_code">
<pre>db.setProfilingLevel() </pre>
</div>

　　如下图所示，默认地，profile关闭。使用setProfilingLevel()方法以50ms慢命令的方式开启profile


![stat3](https://pic.xiaohuochai.site/blog/mongo_stat3.png)


【状态】

　　操作被记录到system.profile集合中


![stat4](https://pic.xiaohuochai.site/blog/mongo_stat4.png)


　　通过db.system.profile.find() 查看当前的监控日志


![stat5](https://pic.xiaohuochai.site/blog/mongo_stat5.png)


![stat6](https://pic.xiaohuochai.site/blog/mongo_stat6.png)

<div class="cnblogs_code">
<pre>op:操作类型
ns:命名空间
query:查询字符串
responseLength:返回长度
ts:时间
mills:执行耗时</pre>
</div>

【使用】

　　在系统中开启profile之后，如果profile记录的数据非常大，会比较明显的降低系统的性能。因此，profile的使用场景一般是新系统上线之前的测试阶段，以及刚上线时的观察阶段，查看数据库的设计及应用程序的使用是否正常。如果profile记录了大量的字段，需要调整系统附在、调整索引等，减小它的大小

&nbsp;

### 日志

　　在配置日志文件时，可以使用verbose参数来配置日志详细程度，参数值从'v'到'vvvvv'，'v'越多，详细度越高

　　日志会记录mongodb的运行状态，包括连接时间、当前正在进行的操作等


![stat7](https://pic.xiaohuochai.site/blog/mongo_stat7.png)


&nbsp;

### explain

　　MongoDB&nbsp;提供了一个&nbsp;explain&nbsp;命令让我们获知系统如何处理查询请求。利用&nbsp;explain&nbsp;命令，可以很好地观察系统如何使用索引来加快检索，同时可以针对性优化索引

　　explain有三种模式，分别是：queryPlanner、executionStats、allPlansExecution。现实开发中，常用的是executionStats模式

　　首先，插入10万条数据


![stat8](https://pic.xiaohuochai.site/blog/mongo_stat8.png)


　　在time字段上建立索引


![stat9](https://pic.xiaohuochai.site/blog/mongo_stat9.png)


　　接着，寻找time范围在100和200之间的文档，并使用explain()

　　结果分为queryPlanner、executionStats和serverInfo三个部分。接下来，将分别对这三个部分的结果进行详细分析

【queryPlanner】


![stat10](https://pic.xiaohuochai.site/blog/mongo_stat10.png)


　　queryPlanner.plannerVersion: 版本

　　queryPlanner.namespace: 查询的表

　　queryPlanner.indexFilterSet: 针对该query是否有indexfilter

　　queryPlanner.parsedQuery: 查询条件

　　queryPlanner.winningPlan: 查询优化器针对该query所返回的最优执行计划的详细内容

　　queryPlanner.winningPlan.stage: 最优执行计划的stage

　　queryPlanner.winningPlan.inputStage: 用来描述子stage，并且为其父stage提供文档和索引关键字。

　　queryPlanner.winningPlan.inputstage.stage，此处是IXSCAN，表示进行的是index&nbsp;scanning

　　queryPlanner.winningPlan.inputstage.keyPattern: 索引键值对

　　queryPlanner.winningPlan.inputstage.indexName：索引名称

　　queryPlanner.winningPlan.inputstage.isMultiKey: 是否是Multikey，此处返回是false，如果索引建立在array上，此处将是true

　　queryPlanner.winningPlan.inputstage.direction：查询顺序，此处是forward，如果用了.sort({time:-1})将显示backward

　　queryPlanner.winningPlan.inputstage.indexBounds: 所扫描的索引范围

　　queryPlanner.rejectedPlans：其他执行计划

【executionStats】


![stat11](https://pic.xiaohuochai.site/blog/mongo_stat11.png)


　　executionStats.executionSuccess: 是否成功

　　executionStats.nReturned: 查询返回条目个数

　　executionStats.totalKeysExamined: 索引扫描条目个数

　　executionStats.totalDocsExamined: 文档扫描条目个数

　　executionStats.executionStages.stage: 扫描类型

　　executionStats.executionTimeMillis: 整体查询时间

　　executionStats.executionStages.executionTimeMillisEstimate: 根据索引检索文档获得数据的时间

　　executionStats.executionStages.inputStage.executionTimeMillisEstimate: 扫描索引所用时间

【serverInfo】


![stat12](https://pic.xiaohuochai.site/blog/mongo_stat12.png)


　　serverInfo.host: 主机名

　　serverInfo.port: 端口

　　serverInfo.version: 版本

　　serverInfo.gitVersion: git版本

【性能分析】

　　1、执行时间

　　executionTimeMillis值越小越好

　　2、条目数量

　　最理想的状态是： &nbsp;nReturned=totalKeysExamined=totalDocsExamined

　　3、stage类型

　　stage的类型列举如下：

<div class="cnblogs_code">
<pre>COLLSCAN：全表扫描
IXSCAN：索引扫描
FETCH：根据索引去检索指定document
SHARD_MERGE：将各个分片返回数据进行merge
SORT：表明在内存中进行了排序
LIMIT：使用limit限制返回数
SKIP：使用skip进行跳过
IDHACK：针对_id进行查询
SHARDING_FILTER：通过mongos对分片数据进行查询
COUNT：利用db.coll.explain().count()之类进行count运算
COUNTSCAN：count不使用Index进行count时的stage返回
COUNT_SCAN：count使用了Index进行count时的stage返回
SUBPLA：未使用到索引的$or查询的stage返回
TEXT：使用全文索引进行查询时候的stage返回
PROJECTION：限定返回字段时候stage的返回</pre>
</div>

　　不希望看到包含如下的stage：

<div class="cnblogs_code">
<pre>COLLSCAN(全表扫描)
SORT(使用sort但是无index)
不合理的SKIP
SUBPLA(未用到index的$or)
COUNTSCAN(不使用index进行count)</pre>
</div>
