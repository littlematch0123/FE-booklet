# Linux环境下安装NodeJS和mongoDB

&emsp;&emsp;本文将详细介绍如何下Linux环境下安装NodeJS和mongoDB

&nbsp;

### NodeJS

【1】使用二进制包安装

&emsp;&emsp;1、在[官网](https://npm.taobao.org/mirrors/node/v8.6.0/node-v8.6.0-linux-x64.tar.xz)下载Linux环境下的NodeJS安装包

&emsp;&emsp;2、通过xftp软件将安装包上传到服务器

&emsp;&emsp;3、解压缩.tar.xz后缀的安装包

<div>
<pre>$xz -d ***.tar.xz
$tar -xvf  ***.tar</pre>
</div>

&emsp;&emsp;4、解压后，当前目录下出现node-v8.6.0-linux-x64目录，node被安装在bin目录中


![linux_nodejs1](https://pic.xiaohuochai.site/blog/linux_nodejs1.png)


&emsp;&emsp;5、查找node-v8.6.0-linux-x64目录所在的当前目录，并以绝对路径设置软链接


![linux_nodejs2](https://pic.xiaohuochai.site/blog/linux_nodejs2.png)


&emsp;&emsp;6、验证


![linux_nodejs3](https://pic.xiaohuochai.site/blog/linux_nodejs3.png)


&emsp;&emsp;7、设置cnpm

&emsp;&emsp;使用命令cnpm来实现镜像安装

<div>
<pre>npm install -g cnpm --registry=https://registry.npm.taobao.org</pre>
</div>

&emsp;&emsp;设置软链接

<div>
<pre>ln -s /root/node-v8.6.0-linux-x64/bin/cnpm /usr/local/bin/cnpm</pre>
</div>

&emsp;&emsp;【2】使用nvm安装(好处在于不用设置软链接)

&emsp;&emsp;1、安装wget工具

<div>
<pre>apt-get install wget</pre>
</div>

&emsp;&emsp;2、使用wget安装nvm

<div>
<pre>wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash</pre>
</div>

&emsp;&emsp;安装完成后，提示重新打开命令行窗口进行操作


![linux_nodejs4](https://pic.xiaohuochai.site/blog/linux_nodejs4.png)


&emsp;&emsp;3、重新打开命令行窗口后，使用nvm安装nodejs，版本为6.11.5

<div>
<pre>nvm install v6.11.5</pre>
</div>

&emsp;&emsp;下图表示安装成功


![linux_nodejs5](https://pic.xiaohuochai.site/blog/linux_nodejs5.png)


&emsp;&emsp;4、安装cnpm

<div>
<pre>npm install -g cnpm --registry=https://registry.npm.taobao.org</pre>
</div>

&emsp;&emsp;5、设置文件监控数目

&emsp;&emsp;由于在npm早期时代，深度依赖的模块文件数量，在服务器上，会突破文件的监听数量，可能导致服务器启动失败，因此现在部署项目的时候，会首先修改下这个默认配置，避免这种可能性

<div>
<pre>echo fs.inotify.max_user_watches=524288 | tee -a /etc/sysctl.conf &amp;&amp; sysctl -p
</pre>
</div>

&nbsp;

### MongoDB

&emsp;&emsp;【1】安装二进制包

&emsp;&emsp;1、在[官网](https://www.mongodb.com/download-center?jmp=nav#atlas)下载安装包

&emsp;&emsp;2、上传到服务器

&emsp;&emsp;3、解压缩

<div>
<pre>$tar -zxvf  mongodb-linux-x86_64.3.4.9.tgz</pre>
</div>

&emsp;&emsp;注意：如果解压缩的过程中出现错误，可以将压缩包改名后，再进行压缩

&emsp;&emsp;4、将解压包拷贝到指定目录

<div>
<pre>mv mongodb-linux-x86_64-3.4.9 /usr/local/mongodb</pre>
</div>

&emsp;&emsp;5、将MongoDB的可执行文件位于bin目录下，将其添加到&nbsp;**PATH**&nbsp;路径中

<div>
<pre>export PATH=/usr/local/mongodb/bin:$PATH</pre>
</div>

&emsp;&emsp;6、创建数据库目录

&emsp;&emsp;MongoDB的数据存储在data目录的db目录下，但是这个目录在安装过程不会自动创建，所以需要手动创建data目录，并在data目录中创建db目录。以下实例中将data目录创建于根目录下(/)

&emsp;&emsp;注意：/data/db 是 MongoDB 默认的启动的数据库路径(--dbpath)

<div>
<pre>mkdir -p /data/db</pre>
</div>

&emsp;&emsp;7、在&nbsp;/usr/local/mongodb/ 下添加conf目录，并添加mongodb.conf配置文件

<div>
<pre>mkdir conf
cd conf 
vi mongodb.conf</pre>
</div>

&emsp;&emsp;8、配置mongodb.conf文件

<div>
<pre>dbpath=/data/db
port=27017
logappend=true
journal=true
quiet=true
logpath=/usr/local/mongodb/logs/mongodb.log</pre>
</div>

&emsp;&emsp;9、在/usr/local/mongodb/目录下创建日志文件

<div>
<pre>mkdir logs
cd logs
touch mongodb.log</pre>
</div>

&emsp;&emsp;10、设置软链接

<div>
<pre>ln -s /usr/local/mongodb/bin/mongod /usr/local/bin/mongod
ln -s /usr/local/mongodb/bin/mongo /usr/local/bin/mongo
ln -s /usr/local/mongodb/bin/mongodump /usr/local/bin/mongodump</pre>
</div>

&emsp;&emsp;11、防火墙开放端口27017，并重启防火墙

<div>
<pre>firewall-cmd --permanent --zone=public --add-port=27017/tcp
firewall-cmd --reload</pre>
</div>

&emsp;&emsp;如果使用iptables防火墙，则进行如下设置

<div>
<pre>-A INPUT -s 127.0.0.1 -p tcp --destination-port 27017 -m state --state NEW,ESTABLISHED -j ACCEPT
-A OUTPUT -d 127.0.0.1 -p tcp --source-port 27017 -m state --state ESTABLISHED -j ACCEPT</pre>
</div>

&emsp;&emsp;12、开启mongodb服务

<div>
<pre>mongod -f /usr/local/mongodb/conf/mongodb.conf</pre>
</div>

&emsp;&emsp;【2】使用apt-get安装(好处在于不用设置软链接，且开启的mongodb是后台常驻服务)

&emsp;&emsp;注意：官网有详细安装流程，详细情况[移步至此](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

&emsp;&emsp;1、导入包管理系统使用的公钥

<div>
<pre>sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6</pre>
</div>

&emsp;&emsp;2、为mongodb创建一个列表文件

&emsp;&emsp;ubuntu的14.04系统运行下列指令

<div>
<pre>echo "deb [ arch=amd64 ] http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list</pre>
</div>

&emsp;&emsp;ubuntu的16.04系统运行下列指令

<div>
<pre>echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list</pre>
</div>

&emsp;&emsp;3、更新服务器的apt-get列表

<div>
<pre>sudo apt-get update</pre>
</div>

&emsp;&emsp;4、安装最新的稳定版本的mongodb

<div>
<pre>sudo apt-get install -y mongodb-org</pre>
</div>

&emsp;&emsp;这样mongodb就安装成功了。mongodb的数据目录位于/var/lib/mongodb，日志目录位于/var/log/mongodb，配置文件位于/etc/mongod.conf

&emsp;&emsp;下面是mongodb的一些常用命令

<div>
<pre>sudo service mongod start #开启服务
sudo service mongod stop #停止服务
sudo service mongod restart #重启服务</pre>
</div>

&emsp;&emsp;通过使用mongo命令来开启实例，可以验证mongod服务已经开启


![linux_nodejs6](https://pic.xiaohuochai.site/blog/linux_nodejs6.png)


