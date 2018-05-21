# MongoDB安全及身份认证

&emsp;&emsp;本文将详细介绍MongoDB安全相关的内容

&nbsp;

### 概述

&emsp;&emsp;MongoDB安全主要包括以下4个方面

&emsp;&emsp;1、物理隔离

&emsp;&emsp;系统不论设计的多么完善，在实施过程中，总会存在一些漏洞。如果能够把不安全的使用方与MongoDB数据库做物理上的隔离，即通过任何手段都不能连接到数据库，这是最安全的防护。但，通常这是不现实的。一些重要的数据可能会保存下来，放置到物理隔离的机房中

&emsp;&emsp;2、网络隔离

&emsp;&emsp;许多公司的开发机处于内网环境中。即使数据库存在漏洞，外部环境也没有机会利用，因为根本无法访问内网

&emsp;&emsp;3、防火墙隔离

&emsp;&emsp;可以利用防火墙配置IP白名单，只允许某些IP访问数据库，也可以从一定程度上增加MongoDB的安全性

&emsp;&emsp;4、用户名密码鉴权

&emsp;&emsp;相对于以上3种方式，用户名密码鉴权机制是最常见的MongoDB安全措施。如果密码设置的比较简单，或者连接环境不是加密环境，很可能被第三方获取到用户名和密码，从而造成MongoDB数据库的危险

&nbsp;

### 权限认证

&emsp;&emsp;mongodb存储所有的用户信息在admin数据库的集合system.users中，保存用户名、密码和数据库信息。mongodb默认不启用权限认证，只要能连接到该服务器，就可连接到mongod。若要启用安全认证，需要更改配置文件参数authorization，也可以简写为auth。


![auth1](https://pic.xiaohuochai.site/blog/mongo_auth1.png)


&emsp;&emsp;然后，重启mongod。查看日志文件，发现权限认证已经开启


![auth2](https://pic.xiaohuochai.site/blog/mongo_auth2.png)


&emsp;&emsp;但是，不使用用户名和密码依然可以连接到数据库。这是因为，我们还没有创建用户。在用户创建，并且开启权限认证之后，如果不使用用户名和密码将不能够连接到数据库

&nbsp;

### 角色管理

&emsp;&emsp;在进行用户管理之前，首先要先了解角色管理

&emsp;&emsp;MongoDB支持基于角色的访问控制（RBAC）来管理对MongoDB系统的访问。一个用户可以被授权一个或者多个:ref:<cite>角色 &lt;roles&gt;</cite>&nbsp;以决定该用户对数据库资源和操作的访问权限。在权限以外，用户是无法访问系统的

&emsp;&emsp;数据库角色在创建用户中的role参数中设置。角色分为内建角色和自定义角色

【内建角色】

&emsp;&emsp;MongoDB内建角色包括以下几类

&emsp;&emsp;1、数据库用户角色

<div>
<pre>read：允许用户读取指定数据库
readWrite：允许用户读写指定数据库</pre>
</div>

&emsp;&emsp;2、数据库管理员角色

<div>
<pre>dbAdmin：允许用户进行索引创建、删除，查看统计或访问system.profile，但没有角色和用户管理的权限
userAdmin：提供了在当前数据库中创建和修改角色和用户的能力
dbOwner： 提供对数据库执行任何管理操作的能力。这个角色组合了readWrite、dbAdmin和userAdmin角色授予的特权。</pre>
</div>

&emsp;&emsp;3、集群管理角色

<div>
<pre>clusterAdmin ： 提供最强大的集群管理访问。组合clusterManager、clusterMonitor和hostManager角色的能力。还提供了dropDatabase操作
clusterManager ： 在集群上提供管理和监视操作。可以访问配置和本地数据库，这些数据库分别用于分片和复制
clusterMonitor ： 提供对监控工具的只读访问，例如MongoDB云管理器和Ops管理器监控代理。
hostManager ： 提供监视和管理服务器的能力。</pre>
</div>

&emsp;&emsp;4、备份恢复角色

<div>
<pre>backup ： 提供备份数据所需的能力，使用MongoDB云管理器备份代理、Ops管理器备份代理或使用mongodump
restore ： 提供使用mongorestore恢复数据所需的能力</pre>
</div>

&emsp;&emsp;5、所有数据库角色

<div>
<pre>readAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读权限 
readWriteAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读写权限 
userAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的userAdmin权限 
dbAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的dbAdmin权限。 </pre>
</div>

&emsp;&emsp;6、超级用户角色

<div>
<pre>root：提供对readWriteAnyDatabase、dbAdminAnyDatabase、userAdminAnyDatabase、clusterAdmin、restore和backup的所有资源的访问</pre>
</div>

&emsp;&emsp;7、内部角色

<div>
<pre>__system : 提供对数据库中任何对象的任何操作的特权</pre>
</div>

【自定义角色】

&emsp;&emsp;除了使用内建的角色之外，MongoDB还支持使用db.createRole()方法来自定义角色

&emsp;&emsp;注意：只能在admin数据库中创建角色，否则会失败

&emsp;&emsp;role: 自定义角色的名称

&emsp;&emsp;privileges: 权限操作　

&emsp;&emsp;roles：继承的角色。如果没有继承的角色，可以设置为空数组&emsp;&emsp;

<div>
<pre>use admin
db.createRole(
   {
     role: "myClusterwideAdmin",
     privileges: [
       { resource: { cluster: true }, actions: [ "addShard" ] },
       { resource: { db: "config", collection: "" }, actions: [ "find", "update", "insert", "remove" ] },
       { resource: { db: "users", collection: "usersCollection" }, actions: [ "update", "insert", "remove" ] },
       { resource: { db: "", collection: "" }, actions: [ "find" ] }
     ],
     roles: [
       { role: "read", db: "admin" }
     ]
   },
   { w: "majority" , wtimeout: 5000 }
)</pre>
</div>

![auth3](https://pic.xiaohuochai.site/blog/mongo_auth3.png)


&nbsp;

### 用户管理

【创建用户】

&emsp;&emsp;使用createUser命令来创建用户

&emsp;&emsp;user: 用户名 &nbsp;pwd: 密码

&emsp;&emsp;customData: 对用户名密码的说明(可选项)

&emsp;&emsp;roles: {role:继承自什么角色类型，db:数据库名称}

<div>
<pre>db.createUser({user: "...",pwd: "...",customDate:"...",roles:[{role: "...",db: "..."}]})</pre>
</div>

&emsp;&emsp;1、创建管理员用户

&emsp;&emsp;MongoDB没有默认管理员账号，所以要先添加管理员账号。切换到admin数据库，添加的账号才是管理员账号

&emsp;&emsp;在admin数据库中，添加一个用户并赋予`userAdminAnyDatabase`角色

<div>
<pre>db.createUser({user: "admin",pwd: "123456",roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]})</pre>
</div>

![auth4](https://pic.xiaohuochai.site/blog/mongo_auth4.png)


&nbsp;&emsp;&emsp;2、重新登录数据库，并验证权限

&emsp;&emsp;如果auth()方法返回0则代表授权失败，返回1代表授权成功

<div>
<pre>db.auth()</pre>
</div>

![auth5](https://pic.xiaohuochai.site/blog/mongo_auth5.png)


&emsp;&emsp;3、添加普通用户

&emsp;&emsp;一旦经过认证的用户管理员，可以使用`db.createUser()`去创建额外的用户。&nbsp;可以分配mongodb内置的角色或用户自定义的角色给用户

&emsp;&emsp;注意：在当前数据库下，新建用户才有效


![auth6](https://pic.xiaohuochai.site/blog/mongo_auth6.png)


&emsp;&emsp;由于该用户只有读权限，所以会写入数据失败


![auth7](https://pic.xiaohuochai.site/blog/mongo_auth7.png)


&emsp;&emsp;4、创建超级用户


![auth8](https://pic.xiaohuochai.site/blog/mongo_auth8.png)


【查看用户】

<div>
<pre>db.system.users.find()</pre>
</div>

![auth9](https://pic.xiaohuochai.site/blog/mongo_auth9.png)

【删除用户】

&emsp;&emsp;注意：在当前数据库下，删除用户才有效

<div>
<pre>db.dropUser()</pre>
</div>

![auth10](https://pic.xiaohuochai.site/blog/mongo_auth10.png)


【添加用户权限】

<div>
<pre>db.grantRolesToUser()</pre>
</div>

&emsp;&emsp;给在db1数据库中只读的x用户，添加写权限


![auth11](https://pic.xiaohuochai.site/blog/mongo_auth11.png)


【修改密码】

<div>
<pre>db.changeUserPassword()</pre>
</div>

![auth12](https://pic.xiaohuochai.site/blog/mongo_auth12.png)


&emsp;&emsp;注意：一定要知道的是，无论是新增用户、还是删除用户或者修改权限或密码，一定要在当前数据库下才有效

