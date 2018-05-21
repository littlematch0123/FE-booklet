# MongoDB数据库文档操作

&emsp;&emsp;本文将详细介绍MongoDB数据库关于文档的增删改查

&nbsp;

### 插入文档

&emsp;&emsp;要将数据插入到&nbsp;MongoDB 集合中，需要使用 MongoDB 的&nbsp;`insert()`或`save()`方法，还有insertOne()或insertMany()方法

【insert()】

&emsp;&emsp;`insert()`命令的基本语法如下

<div>
<pre>db.COLLECTION_NAME.insert(document)</pre>
</div>

&emsp;&emsp;在插入的文档中，如果不指定`_id`参数，那么 MongoDB 会为此文档分配一个唯一的ObjectId。`_id`为集合中的每个文档唯一的`12`个字节的十六进制数

&emsp;&emsp;`_id，又称为ObjectId`是一个12字节的`BSON`类型字符串。按照字节顺序依次代表：

&emsp;&emsp;4字节：UNIX时间戳

&emsp;&emsp;3字节：表示运行MongoDB的机器

&emsp;&emsp;2字节：表示生成此_id的进程

&emsp;&emsp;3字节：由一个随机数开始的计数器生成的值

&emsp;&emsp;如果数据库中不存在集合，则MongoDB将创建此集合，然后将文档插入到该集合中


![doc1](https://pic.xiaohuochai.site/blog/mongo_doc1.png)


&emsp;&emsp;要在单个查询中插入多个文档，可以在`insert()`命令中传递文档数组

&emsp;&emsp;注意：使用insert()插入多个文档时，很容易出现问题。最好使用insertMany()方法插入


![doc2](https://pic.xiaohuochai.site/blog/mongo_doc2.png)


&emsp;&emsp;可以使用js语法，插入多个文档


![doc3](https://pic.xiaohuochai.site/blog/mongo_doc3.png)


【save()】

&emsp;&emsp;插入文档也可以使用`db.post.save(document)`。 如果不在文档中指定`_id`，那么`save()`方法将与`insert()`方法一样自动分配ID的值。如果指定`_id`，则将以`save()`方法的形式替换包含`_id`的文档的全部数据。

&nbsp;&emsp;&emsp;也就是说save()方法和insert()方法的区别是，save()方法可以复写或修改，而insert()方法不可以

<div>
<pre>db.post.save(document)</pre>
</div>

![doc4](https://pic.xiaohuochai.site/blog/mongo_doc4.png)


![doc5](https://pic.xiaohuochai.site/blog/mongo_doc5.png)


【insertOne()】

&emsp;&emsp;使用`db.collection.insertOne()`方法可以将单个文档插入到集合中


![doc6](https://pic.xiaohuochai.site/blog/mongo_doc6.png)


【insertMany()】

&emsp;&emsp;使用`db.collection.insertMany()`方法可以将多个文档插入到集合中


![doc7](https://pic.xiaohuochai.site/blog/mongo_doc7.png)


&nbsp;

### 查询文档

【find()】

&emsp;&emsp;要从MongoDB集合查询数据，需要使用MongoDB的`find()`方法，默认返回结果中的前**20**条文档，输入"it"显示接下来的20条文档。

&emsp;&emsp;`find()`命令的基本语法如下：

<div>
<pre>db.COLLECTION_NAME.find(document)</pre>
</div>

&emsp;&emsp;`find()`方法将以非结构化的方式显示所有文档


![doc8](https://pic.xiaohuochai.site/blog/mongo_doc8.png)


&emsp;&emsp;可以限定查询条件


![doc9](https://pic.xiaohuochai.site/blog/mongo_doc9.png)


&emsp;&emsp;可以通过find 的第二个参数来指定返回的键，值为1或true表示显示该键，值为0或false表示不显示该键


![doc10](https://pic.xiaohuochai.site/blog/mongo_doc10.png)


&emsp;&emsp;find()方法下的count()方法可以显示符合条件的文档数量


![doc11](https://pic.xiaohuochai.site/blog/mongo_doc11.png)


【findOne()】

&emsp;&emsp;`findOne()`方法只返回一个文档，该文档是最早被添加的文档


![doc12](https://pic.xiaohuochai.site/blog/mongo_doc12.png)


【比较操作符】

<div>
<pre>小于    &emsp;&emsp;  {&lt;key&gt;:{$lt:&lt;value&gt;}}    
小于或等于    {&lt;key&gt;:{$lte:&lt;value&gt;}}    
大于    &emsp;&emsp;  {&lt;key&gt;:{$gt:&lt;value&gt;}}    
大于或等于    {&lt;key&gt;:{$gte:&lt;value&gt;}}    
不等于    &emsp;&emsp;{&lt;key&gt;:{$ne:&lt;value&gt;}}
等于     &emsp;&emsp; {&lt;key&gt;:{$eq:&lt;value&gt;}}</pre>
</div>

&emsp;&emsp;取得x小于2的值


![doc13](https://pic.xiaohuochai.site/blog/mongo_doc13.png)


&emsp;&emsp;取得x大于等于2的值


![doc14](https://pic.xiaohuochai.site/blog/mongo_doc14.png)


&emsp;&emsp;取得x不等于2的值


![doc15](https://pic.xiaohuochai.site/blog/mongo_doc15.png)


【逻辑操作符】

&emsp;&emsp;可以使用逻辑操作符$and、$or来表示与、或

<div>
<pre>{ $and: [ { &lt;expression1&gt; }, { &lt;expression2&gt; } , ... , { &lt;expressionN&gt; } ] }
{ $nor: [ { &lt;expression1&gt; }, { &lt;expression2&gt; }, ... { &lt;expressionN&gt; } ] }
</pre>
</div>

![doc16](https://pic.xiaohuochai.site/blog/mongo_doc16.png)


【正则表达式】

&emsp;&emsp;文档查询可以使用正则表达式，但只支持字符串类型的数据


![doc17](https://pic.xiaohuochai.site/blog/mongo_doc17.png)


【$where】

&emsp;&emsp;$where操作符功能强大而且灵活，它可以使用任意的JavaScript作为查询的一部分，包含JavaScript表达式的字符串或者JavaScript函数


![doc18](https://pic.xiaohuochai.site/blog/mongo_doc18.png)


&emsp;&emsp;使用字符串


![doc19](https://pic.xiaohuochai.site/blog/mongo_doc19.png)


&emsp;&emsp;使用函数


![doc20](https://pic.xiaohuochai.site/blog/mongo_doc20.png)


&nbsp;

### 限制与跳过

【limit()】

&emsp;&emsp;如果需要在MongoDB中读取指定数量的数据记录，可以使用MongoDB的Limit方法，limit()方法接受一个数字参数，该参数指定从MongoDB中读取的记录条数

&emsp;&emsp;默认返回结果中的前**20**条文档，输入"it"显示接下来的20条文档

&emsp;&emsp;如果没有指定limit()方法中的参数则显示集合中的所有数据

<div>
<pre>db.COLLECTION_NAME.find().limit(NUMBER)</pre>
</div>

![doc21](https://pic.xiaohuochai.site/blog/mongo_doc21.png)


【skip()】

&emsp;&emsp;可以使用skip()方法来跳过指定数量的数据，skip方法同样接受一个数字参数作为跳过的记录条数

<div>
<pre>db.COLLECTION_NAME.find().skip(NUMBER)</pre>
</div>

![doc22](https://pic.xiaohuochai.site/blog/mongo_doc22.png)


&nbsp;

### 排序

【sort()】

&emsp;&emsp;在MongoDB中使用sort()方法对数据进行排序，sort()方法可以通过参数指定排序的字段，并使用 1 和 -1 来指定排序的方式，其中 1 为升序排列，而-1是用于降序排列

<div>
<pre>db.COLLECTION_NAME.find().sort({KEY:1})</pre>
</div>

![doc23](https://pic.xiaohuochai.site/blog/mongo_doc23.png)


&nbsp;

### 更新文档

&emsp;&emsp;MongoDB 使用update()或save()方法来更新集合中的文档

【update()】

&emsp;&emsp;update() 方法用于更新已存在的文档。语法格式如下：&nbsp;

<div>
<pre>db.collection.update(&lt;query&gt;,&lt;update&gt;,{upsert:&lt;boolean&gt;, multi: &lt;boolean&gt;,writeConcern:&lt;document&gt;})</pre>
</div>
<div>
<pre>query : update的查询条件，类似sql update查询内where后面的
update : update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的
upsert : 可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入
multi : 可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新
writeConcern :可选，抛出异常的级别</pre>
</div>

&emsp;&emsp;注意：经过测试，upsert参数无法设置为true或者false，都可以插入新的字段


![doc24](https://pic.xiaohuochai.site/blog/mongo_doc24.png)


&emsp;&emsp;mongodb默认只更新找到的第一条记录，将x:1，更新为x:10


![doc25](https://pic.xiaohuochai.site/blog/mongo_doc25.png)


&emsp;&emsp;要特别注意的是，如果不使用$set，则将文档的内容替换为x:10


![doc26](https://pic.xiaohuochai.site/blog/mongo_doc26.png)


&emsp;&emsp;更新全部记录，将x:10，更新为x:1


![doc27](https://pic.xiaohuochai.site/blog/mongo_doc27.png)


&emsp;&emsp;mongodb默认只添加到更新找到的第一条记录，将x:1的记录，添加z:1


![doc28](https://pic.xiaohuochai.site/blog/mongo_doc28.png)


&emsp;&emsp;将找到的x:2的全部记录，添加z:2


![doc29](https://pic.xiaohuochai.site/blog/mongo_doc29.png)


【save()】

&nbsp;&emsp;&emsp;save()方法可以插入或更新文档，如果参数中的文档的_id与集合中所存在的_id都不同，则插入；如果相同，则更新


![doc30](https://pic.xiaohuochai.site/blog/mongo_doc30.png)


&nbsp;

### 删除文档

&emsp;&emsp;MongoDB remove()函数是用来移除集合中的数据

【remove()】

&emsp;&emsp;默认地，mongodb删除符合条件的所有文档

<div>
<pre>db.collection.remove(&lt;query&gt;,{justOne: &lt;boolean&gt;, writeConcern: &lt;document&gt;})</pre>
</div>
<div>
<pre>query :删除的文档的条件。
justOne : （可选）如果设为 true 或 1，则只删除一个文档。
writeConcern :（可选）抛出异常的级别。</pre>
</div>

&emsp;&emsp;只删除符合条件的第一个文档　


![doc31](https://pic.xiaohuochai.site/blog/mongo_doc31.png)


&emsp;&emsp;删除符合条件的所有文档　


![doc32](https://pic.xiaohuochai.site/blog/mongo_doc32.png)


