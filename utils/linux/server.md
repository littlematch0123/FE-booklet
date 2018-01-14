# Linux云服务器常用设置

　　由于在云服务器上配置自己的网站，将Linux里的常用设置记录如下

&nbsp;

### 更改shell

　　默认地，&nbsp;ubuntu系统默认的shell是dash，但更常用的shell是bash

　　通过下面命令可以将dash更改为bash

<div class="cnblogs_code">
<pre>dpkg-reconfigure dash</pre>
</div>

　　然后选&lt;No&gt;


![linux_server1](https://pic.xiaohuochai.site/blog/linux_server1.png)


　　执行ls -l /bin/sh命令，查看shell类型已经修改为bash

<div class="cnblogs_code">
<pre>ls -l /bin/sh</pre>
</div>

![linux_server2](https://pic.xiaohuochai.site/blog/linux_server2.png)


&nbsp;

### 帐号权限

　　为了提高服务器安全性，需要设置一个高权限的账号来代替root执行常规操作

　　首先，新建一个用户

<div class="cnblogs_code">
<pre>useradd test</pre>
</div>

　　[注意]在centos系统下，使用useradd会默认在home目录下，新增一个与用户名同名的目录。如果是ubuntu系统，默认不创建目录，如果需要则添加-m参数

<div class="cnblogs_code">
<pre>useradd test -m</pre>
</div>

　　设置用户密码

<div class="cnblogs_code">
<pre>passwd test</pre>
</div>

　　将test用户添加到sudo组中，操作命令前加sudo命令，即可实现root权限

<div class="cnblogs_code">
<pre>gpasswd -a test sudo</pre>
</div>

　　然后使用su test，即切换到test帐号下

<div class="cnblogs_code">
<pre>su test</pre>
</div>

&nbsp;

### 无密码登录

　　SSH是网络上两台机器互联的一套协议，默认需要22端口

　　使用ssh test@1.2.3.4可以以test用户名来登录1.2.3.4服务器，按下ctrl+d可以退出登录

　　下面通过添加SSH key的方式来进行无密码登录

　　首先，在本地机器上执行下列指令

<div class="cnblogs_code">
<pre>$ ssh-keygen</pre>
</div>

　　会出现几个问题，都直接回车取默认值就可以了


![linux_server3](https://pic.xiaohuochai.site/blog/linux_server3.png)


![linux_server4](https://pic.xiaohuochai.site/blog/linux_server4.png)


　　id_rsa 是私钥，是要严格保密的，id_rsa.pub是公钥，需要上传到服务器的`/home/test/.ssh/authorized_keys`文件中

　　可以手动拷贝文件，也进入本地的.ssh目录下，然后执行以下命令

<div class="cnblogs_code">
<pre>ssh-copy-id test@1.2.3.4</pre>
</div>

![linux_server5](https://pic.xiaohuochai.site/blog/linux_server5.png)

　　这样，以后登录就不用再输入密码了

</div>

&nbsp;

### 配置git

　　一般地，服务器要从github等代码托管平台获取最新的代码，所以配置git是必不可少的操作

　　首先，更新apt-get软件包的列表

<div class="cnblogs_code">
<pre>apt-get update</pre>
</div>

　　接下来，安装git

<div class="cnblogs_code">
<pre>apt-get install git</pre>
</div>

　　关于apt-get的常用命令如下

<div class="cnblogs_code">
<pre>apt-get update #更新软件包列表
apt-get install packagename #安装一个新软件包
apt-get remove packagename #卸载一个已安装的软件包（保留配置文档）
apt-get remove --purge packagename #卸载一个已安装的软件包（删除配置文档）
apt-get autoremove packagename #删除包及其依赖的软件包
apt-get autoremove --purge packagname #删除包及其依赖的软件包+配置文件</pre>
</div>

　　然后，就可以从git地址克隆代码了

<div class="cnblogs_code">
<pre>git clone git@git.xxx/xxx.git</pre>
</div>

　　当代码有改动时，先进入项目目录，如mall，然后使用git pull即可获取最新的代码了

<div class="cnblogs_code">
<pre>cd mall
git pull</pre>
</div>

&nbsp;

### 修改端口

　　默认地，SSH端口是22。将其修改为其他端口，可以缩小被扫描和猜测的概率，增加服务器安全性

　　[注意]该操作要在root用户下进行，否则会出现一些不容易解决的问题

　　1、修改/etc/ssh/sshd_config文件里面的port端口为1024以上的任意端口


![linux_server6](https://pic.xiaohuochai.site/blog/linux_server6.png)

　　2、然后，执行下列命令重启ssh服务

</div>
<div class="cnblogs_code">
<pre>sudo service ssh restart</pre>
</div>

　　3、在阿里云安全规则中添加2000端口


![linux_server7](https://pic.xiaohuochai.site/blog/linux_server7.png)


&nbsp;

### 设置防火墙

　　在/etc目录下，新建iptables.up.rules文件，内容如下

```
*filter

#allow all connections
-A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

#allow out traffic
-A OUTPUT -j ACCEPT

#allow http https
-A INPUT -p tcp --dport 443 -j ACCEPT

-A INPUT -p tcp --dport 80 -j ACCEPT

#allow ssh port login
-A INPUT -p tcp -m state --state NEW --dport 2000 -j ACCEPT

#allow ping
-A INPUT -p icmp -m icmp --icmp-type 8 -j ACCEPT

#log denied calls
-A INPUT -m limit --limit 5/min -j LOG --log-prefix "iptables denied:" --log-level 7

#drop incoming sensitive connetions
-A INPUT -p tcp --dport 80 -i eth0 -m state --state NEW -m recent --set
-A INPUT -p tcp --dport 80 -i eth0 -m state --state NEW -m recent --update --seconds 60 --hitcount 150 -j DROP
#reject all other inbound
-A INPUT -j REJECT
-A FORWARD -j REJECT

COMMIT
```

　　接着，使用下列命令使防火墙规则生效

<div class="cnblogs_code">
<pre>iptables-restore &lt; /etc/iptables.up.rules</pre>
</div>

　　使用ufw status命令来查看防火墙状态，并使用ufw enable来开启防火墙


![linux_server8](https://pic.xiaohuochai.site/blog/linux_server8.png)


　　下面来设置防火墙开机自动启动，在/etc/network/if-up.d目录下，新建一个iptables脚本文件

<div class="cnblogs_code">
<pre>vi /etc/network/if-up.d/iptables</pre>
</div>

　　文件内容如下

<div class="cnblogs_code">
<pre>#!/bin/sh
iptables-restore /etc/iptables.up.rules</pre>
</div>

　　将该脚本文件赋予执行权限

<div class="cnblogs_code">
<pre>chmod +x /etc/network/if-up.d/iptables</pre>
</div>

&nbsp;

### 配置nginx

　　如果服务器只需要放置一个网站程序，解析网站到服务器的网站，网站程序监听80端口就可以了。如果服务器有很多应用，借助nginx不仅可以实现端口的代理，还可以实现负载均衡

【卸载nginx】

　　在介绍如何安装nginx之前，先要介绍如何卸载nginx。因为nginx不正确的安装，导致无法正常运行，所以需要卸载nginx

<div class="cnblogs_code">
<pre>sudo apt-get remove nginx nginx-common # 卸载删除除了配置文件以外的所有文件
sudo apt-get purge nginx nginx-common # 卸载所有东东，包括删除配置文件
sudo apt-get autoremove # 在上面命令结束后执行，主要是卸载删除Nginx的不再被使用的依赖包
sudo apt-get remove nginx-full nginx-common #卸载删除两个主要的包</pre>
</div>

【安装nginx】

　　首先，更新包列表

<div class="cnblogs_code">
<pre>sudo apt-get update</pre>
</div>

　　然后，一定要在sudo下安装nginx

<div class="cnblogs_code">
<pre>sudo apt-get install nginx</pre>
</div>

![linux_server9](https://pic.xiaohuochai.site/blog/linux_server9.png)

　　下面在/etc/nginx/conf.d下新建一个配置文件，命名为test-8081.conf，内容如下

　　[注意]一般以域名-端口号来命名配置文件

<div class="cnblogs_code">
<pre>upstream xiaohuochai {
        server 127.0.0.1:8081;
}
server{
        listen 80;
        server_name 1.2.3.4;
        location / {
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $http_host;
                proxy_set_header X-Nginx-Proxy true;
                proxy_pass http://test;
                proxy_redirect off;
        }
}</pre>
</div>

　　下面使用sudo nginx -t来测试配置文件是否格式正确

![linux_server10](https://pic.xiaohuochai.site/blog/linux_server10.png)

　　如果不想让报文显示server的详细信息，需要将`/etc/nginx/nginx.conf`主配置文件中的server_tockens off前面的注释取消即可

![linux_server11](https://pic.xiaohuochai.site/blog/linux_server11.png)

　　接着，重启nginx服务

<div class="cnblogs_code">
<pre>sudo nginx -s reload</pre>
</div>

![linux_serveradd](https://pic.xiaohuochai.site/blog/linux_serveradd.png)

&nbsp;

### 域名解析

　　一般地，使用dnspod.cn来进行域名解析。

　　在原域名注册商设置dnspod的DNS解析

<div class="cnblogs_code">
<pre> f1g1ns1.dnspod.net
 f1g1ns2.dnspod.net</pre>
</div>

![linux_server12](https://pic.xiaohuochai.site/blog/linux_server12.png)


　　在dnspod.cn的域名解析页面填入要解析的域名


![linux_server13](https://pic.xiaohuochai.site/blog/linux_server13.png)


　　添加域名后，下面来添加记录即可


![linux_server14](https://pic.xiaohuochai.site/blog/linux_server14.png)


&nbsp;

### 配置SSL

　　我个人是在七牛申请并设置的SSL证书，非常方便

&nbsp;　　首先，进入七牛的SSL证书购买界面，选择免费证书进行购买


![linux_server15](https://pic.xiaohuochai.site/blog/linux_server15.png)


　　然后，点击确认支付


![linux_server16](https://pic.xiaohuochai.site/blog/linux_server16.png)


　　然后，填入域名信息及其他详细信息。注意，一定要选择文件验证，经个人经验，选择DNS验证后很长时间不能生效


![linux_server17](https://pic.xiaohuochai.site/blog/linux_server17.png)


　　信息填写完成后，会出来如下界面，订单状态为待确认，点击详情


![linux_server18](https://pic.xiaohuochai.site/blog/linux_server18.png)


　　在服务器根目录下，创建`/.well-known/pki-validation`目录，里面创建fileauth.txt文件，内容如下图所示


![linux_server19](https://pic.xiaohuochai.site/blog/linux_server19.png)


　　当浏览器能够通过`http://static.xiaohuochai.site/.well-known/pki-validation/fileauth.txt`，成功访问，并输出上述内容时，即配置成功

　　等待几分钟，证书便会下发


![linux_server20](https://pic.xiaohuochai.site/blog/linux_server20.png)


&nbsp;

### PM2部署

　　【1】安装

　　为了让nodejs程序常驻，也为了实现自动化部署，需要使用PM2。使用npm全局安装pm2

　　[注意]一定要全局安装，否则pm2无法使用

<div class="cnblogs_code">
<pre>cnpm install pm2 -g</pre>
</div>

　　pm2常用命令如下

<div class="cnblogs_code">
<pre> pm2 start app.js #启动app.js应用程序
 pm2 start app.js --watch # 当文件变化时自动重启应用
 pm2 list # 列表 PM2 启动的所有的应用程序
 pm2 monit # 显示每个应用程序的CPU和内存占用情况
 pm2 show [app-name] # 显示应用程序的所有信息
 pm2 logs # 显示所有应用程序的日志
 pm2 stop all # 停止所有的应用程序
 pm2 stop 0 # 停止 id为 0的指定应用程序
 pm2 restart all # 重启所有应用
 pm2 delete all # 关闭并删除所有应用
 pm2 delete 0 # 删除指定应用 id 0
 pm2 startup # 创建开机自启动命令</pre>
</div>

　　【2】部署

　　[注意]官网有详细的部署流程，详细情况[移步至此](http://pm2.keymetrics.io/docs/usage/deployment/)

　　首先，在服务器用户目录下，新建一个www目录，用于存放后端代码

<div class="cnblogs_code">
<pre>mkdir www</pre>
</div>

　　然后，在本地后端项目目录下，如/server，新建一个ecosystem.json文件，内容如下

<div class="cnblogs_code">
<pre>{
  "apps" : [{
    "name"      : "mall",
    "script"    : "./bin/www",
    "env": {
      "COMMON_VARIABLE": "true"
    },
    "env_production" : {
      "NODE_ENV": "production"
    }
  }],
  "deploy" : {
    "production" : {
      "user" : "xxx",
      "host" : ["1.2.3.4"],
      "port" : "22",
      "ref"  : "origin/master",
      "repo" : "git@git.coding.net:ehuo0123/mall.git",
      "path" : "/home/xxx/www/mall",
      "post-deploy" : "source ~/.nvm/nvm.sh &amp;&amp; cd server &amp;&amp; cnpm install &amp;&amp; pm2 startOrRestart ecosystem.json --env production",
      "ssh_options": "StrictHostKeyChecking=no",
      "env"  : {
        "NODE_ENV": "production"
      }
    }
  }
}</pre>
</div>

　　然后，在本地git目录下，更新git

<div class="cnblogs_code">
<pre>git add .
git commit -m 'change ecosystem'
git push origin master</pre>
</div>

　　接着，在本机的/server目录下，执行下列命令

<div class="cnblogs_code">
<pre>pm2 deploy ecosystem.json production setup</pre>
</div>

　　出现如下标识，表示设置成功


![linux_server21](https://pic.xiaohuochai.site/blog/linux_server21.png)


　　接着，使用如下代码，使服务器从git代码托管平台获取最新的代码，且使用pm2自动部署

<div class="cnblogs_code">
<pre>pm2 deploy ecosystem.json production</pre>
</div>

　　出现如下代码，表示部署成功


![linux_server22](https://pic.xiaohuochai.site/blog/linux_server22.png)


&nbsp;

### mongodb设置

　　【1】修改mongodb的27017端口

　　为了提高服务器的安装，修改mongodb数据库默认的27017端口，为其他端口，如20000

　　打开/etc/mongod.conf文件

<div class="cnblogs_code">
<pre>sudo vi /etc/mongod.conf</pre>
</div>

　　修改27017端口为20000


![linux_server23](https://pic.xiaohuochai.site/blog/linux_server23.png)


　　如果想让本地电脑访问mongodb服务器，则需要注释bindIp，因为bindIp:127.0.0.1表示只允许主机访问，即只允许服务器访问

　　然后，重启mongod服务即可

<div class="cnblogs_code">
<pre>sudo service mongod restart</pre>
</div>

　　【2】创建管理员

　　下面为mongodb创建管理员及为每一个数据库创建一个用户

　　首先，切换到admin数据库，创建管理员

<div class="cnblogs_code">
<pre>db.createUser({user: "admin",pwd: "123456",roles:[{role: "root",db: "admin"}]})</pre>
</div>

　　然后，验证管理员权限

<div class="cnblogs_code">
<pre>db.auth("admin","123456")</pre>
</div>

　　接着，进入mall数据库，并为mall数据库创建一个mall用户

<div class="cnblogs_code">
<pre>use mall;
db.createUser({user: "mall",pwd: "123456",roles:[{role: "dbOwner",db: "mall"}]})</pre>
</div>

　　然后在当前mall数据库下，对创建的用户进行权限认证


![linux_server24](https://pic.xiaohuochai.site/blog/linux_server24.png)


　　更改mongob.conf里的内容

<div class="cnblogs_code">
<pre>security:
    authorization: 'enabled'</pre>
</div>

　　然后，重启mongod服务

<div class="cnblogs_code">
<pre>sudo service mongod restart</pre>
</div>

　　使用用户名和密码来登录mongo客户端

<div class="cnblogs_code">
<pre>mongo 127.0.0.1:20000/mall -u mall -p 123456</pre>
</div>

　　【3】数据备份

　　在用户目录下，建立backup目录，进入backup目录

<div class="cnblogs_code">
<pre>mkdir backup
cd backup</pre>
</div>

　　创建一个名称为backup.sh的脚本，来对数据库进行定时备份

```
#!/bin/sh

backUpFolder=/home/xxx/backup
date_now=`date +%Y_%m_%d_%H%M`
backFileName=mall_$date_now

cd $backUpFolder
mkdir -p $backFileName

mongodump -h 127.0.0.1:20000 -d mall -u mall -p 123456 -o $backFileName

tar zcvf $backFileName.tar.gz $backFileName

rm -rf $backFileName
```

　　然后在backup目录下，执行sh backup.sh命令来执行脚本文件

<div class="cnblogs_code">
<pre>sh backup.sh</pre>
</div>

　　结果如下图所示


![linux_server25](https://pic.xiaohuochai.site/blog/linux_server25.png)


　　输入date，可以查看当前系统时间


![linux_server26](https://pic.xiaohuochai.site/blog/linux_server26.png)


　　下面来创建定时任务，输入crontab -e来开启定时任务，然后选择2

　　[注意]一定要在root权限下设置，否则不生效

<div class="cnblogs_code">
<pre>sudo crontab -e</pre>
</div>

![linux_server27](https://pic.xiaohuochai.site/blog/linux_server27.png)


　　在打开的nano编辑器中输入如下命令，表示在01:46分，执行如下脚本。

<div class="cnblogs_code">
<pre>46 01 * * * sh /home/xiaohuochai/backup/backup.sh</pre>
</div>

　　然后，按下ctrl+X，按下shif+Y，回车，即可完成定时任务的设置

　　由下图可知，01:46分确实生成了一个包文件


![linux_server28](https://pic.xiaohuochai.site/blog/linux_server28.png)


　　【4】上传到七牛云

　　下面将备份的包文件上传到七牛云进行存储

　　1、首先，修改backup.sh文件

```
#!/bin/sh

backUpFolder=/home/xxx/backup
date_now=`date +%Y_%m_%d_%H%M`
backFileName=mall_$date_now

cd $backUpFolder
mkdir -p $backFileName

mongodump -h 127.0.0.1:20000 -d mall -u mall -p 123456 -o $backFileName

tar zcvf $backFileName.tar.gz $backFileName

rm -rf $backFileName

NODE_ENV=$backUpFolder@$backFileName node /home/xxx/backup/upload.js
```

　　2、在backup目录下，安装七牛模块

　　[注意]一定要本地安装，而不能全局安装

<div class="cnblogs_code">
<pre>npm install qiniu</pre>
</div>

　　3、在backup目录下，创建upload.js文件，内容如下

```
var qiniu = require("qiniu");

var accessKey = '你的accesskey';
var secretKey = '你的secrestkey';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

var bucket = '存储空间的名称';
var options = {
  scope: bucket,
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken=putPolicy.uploadToken(mac);

var config = new qiniu.conf.Config();
//不同的区域，取值不同，华东为z0
config.zone = qiniu.zone.Zone_z0;

var parts = process.env.NODE_ENV.split('@');
var key =  parts[1] + '.tar.gz';
var localFile =  parts[0] + '/' + key;

var formUploader = new qiniu.form_up.FormUploader(config);
var putExtra = new qiniu.form_up.PutExtra();
formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
  respBody, respInfo) {
  if (respErr) {
    throw respErr;
  }
  if (respInfo.statusCode == 200) {
    console.log(respBody);
  } else {
    console.log(respInfo.statusCode);
    console.log(respBody);
  }
});
```

　　4、运行backup.sh文件

<div class="cnblogs_code">
<pre>sudo sh ./backup.sh</pre>
</div>

　　5、查看七牛云，发现备份文件已经成功上传


![linux_server29](https://pic.xiaohuochai.site/blog/linux_server29.png)


