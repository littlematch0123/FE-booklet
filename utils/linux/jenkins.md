# 使用jenkins进行前端项目自动部署

&emsp;&emsp;后端的nodeJS项目可以使用pm2进行自动部署，由于前端项目打包后是静态资源，不需要进程守护。一般地，前端项目使用jenkins来进行自动部署，包括打包、测试等一系列流程。本文将详细介绍jenkins的使用

 

&nbsp;

### 安装

&emsp;&emsp;Jenkins 是一款业界流行的开源持续集成工具，广泛用于项目开发，具有自动化构建、测试和部署等功能。由于 jenkins是基于java环境运行的，所以首先需要安装java环境

&emsp;&emsp;1、安装依赖包，使得add-apt-repository命令可以进行
```
apt-get install software-properties-common
```
&emsp;&emsp;2、通过add-apt-repository加载第三方的开源软件源
```
sudo add-apt-repository ppa:webupd8team/java
```
&emsp;&emsp;3、更新软件包列表，并安装jdk
```
sudo apt-get update
sudo apt-get install oracle-java8-installer
```
&emsp;&emsp;安装器会提示同意 oracle 的服务条款，选择 ok，然后选择yes 即可

&emsp;&emsp;4、通过查看java版本，来测试java环境是否安装成功
```
xiaohuochai@iZbp13p7zpoi6363d01pugZ:~$ java -version
java version "1.8.0_171"
Java(TM) SE Runtime Environment (build 1.8.0_171-b11)
Java HotSpot(TM) 64-Bit Server VM (build 25.171-b11, mixed mode)
```
&emsp;&emsp;5、接下来，按照官网的操作要求，安装jenkins
```
wget -q -O - https://pkg.jenkins.io/debian/jenkins-ci.org.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt-get update
sudo apt-get install jenkins
```
&emsp;&emsp;6、安装完成后，jenkins的文件目录如下所示
```
安装目录：/var/lib/jenkins  
日志目录：/var/log/jenkins/jenkins.log 
```
&emsp;&emsp;7、接下来，就可以启动jenkins了
```
service jenkins start
```
&emsp;&emsp;在jenkins启动过程中，可能会遇到如下问题
```
Job for jenkins.service failed
```
&emsp;&emsp;这是因为java环境，没有安装成功，按照上面的步骤重新安装java即可

&emsp;&emsp;还可能会出现如下警告
```
java.net.UnknownHostException: yonghu: yonghu: 未知的名称或服务
```
&emsp;&emsp;直接修改hosts文件(vi /etc/hosts)，将原127.0.0.1替换成127.0.0.1 localhost centos-a即可
```
127.0.0.1 localhost yonghu
```
&emsp;&emsp;因为jenkins默认使用8080端口，如果使用阿里云，还需要在安全组中开放8080端口

 

&nbsp;

### 初始化

&emsp;&emsp;启动jenkins服务后，可以在8080端口访问到jenkins

![jenkins](https://pic.xiaohuochai.site/blog/jenkins1.png)

&emsp;&emsp;然后在服务器的指定目录找到密码登录
```
/var/lib/jenkins/secrets/initialAdminPassword
```
&emsp;&emsp;按照默认配置安装插件

![jenkins](https://pic.xiaohuochai.site/blog/jenkins2.png)

&emsp;&emsp;等待插件安装完成

![jenkins](https://pic.xiaohuochai.site/blog/jenkins3.png)

&emsp;&emsp;创建一个管理员账户，完成配置后，就可以登录 Jenkins 了

![jenkins](https://pic.xiaohuochai.site/blog/jenkins4.png)
 

&nbsp;

### 安装插件

&emsp;&emsp;下面来安装nodejs插件

![jenkins](https://pic.xiaohuochai.site/blog/jenkins6.png)

&emsp;&emsp;可以看到，Jenkins提供了丰富的插件供开发者使用，找到需要的`[NodeJS Plugin]`，勾选后点击安装即可

![jenkins](https://pic.xiaohuochai.site/blog/jenkins7.png)

&emsp;&emsp;3、安装完毕后，选择系统管理->全局工具配置，配置node下载及安装

![jenkins](https://pic.xiaohuochai.site/blog/jenkins8.png)
 

&nbsp;

### git钩子

&emsp;&emsp;为了能够与 GitHub 配合，需要进入对 GitHub 进行一些设置

&emsp;&emsp;在github中进入博客所在的repo，并点击settings。在设置界面单击左侧的Integrations & services，并选择add service。从下拉菜单中，选中Jenkins(Github plugin)

![jenkins](https://pic.xiaohuochai.site/blog/jenkins10.png)
 

&emsp;&emsp;从下拉菜单中，选中Jenkins (GitHub plugin)。在新打开的界面，填写Jenkins的信息

![jenkins](https://pic.xiaohuochai.site/blog/jenkins11.png)

&emsp;&emsp;完整的地址为`http://xx.xx.xx.xx:8080/GitHub-webhook/`。把这里的xx换成实际的IP地址或者域名即可。需要注意的是，网址末尾的斜杠一定不能省略

&emsp;&emsp;填写好信息以后保存，GitHub就配置好了

 

&nbsp;

### 配置任务

&emsp;&emsp;1、安装好github钩子以及nodejs插件后，接下来开始配置任务

&emsp;&emsp;点击创建一个新任务，填写任务名称，构建的项目类型可根据实际情况进行选择，本次选择第一种即可

![jenkins](https://pic.xiaohuochai.site/blog/jenkins5.png)

&emsp;&emsp;2、配置基础信息

![jenkins](https://pic.xiaohuochai.site/blog/jenkins12.png)

&emsp;&emsp;3、往下拉，看到源码管理，点选Git，依然填写博客对应的Repo地址

![jenkins](https://pic.xiaohuochai.site/blog/jenkins13.png)

&emsp;&emsp;4、继续往下拉，在构建触发器单击增加构建步骤，在弹出的下拉菜单中选择Execute shell。勾选GitHub hook trigger for GITScm polling。构建环境选择nodejs

![jenkins](https://pic.xiaohuochai.site/blog/jenkins14.png)
 

&nbsp;

### 构建过程

&emsp;&emsp;一般地，构建过程，输入如下
```
npm install &&
npm run build
```
&emsp;&emsp;但是，经过实际测试，在服务器上使用npm install会使服务器卡死。于是，变通的方法是，在本地直接构建，并将构建后的文件上传到github，然后通过jenkins取得。于是，构建过程如下所示
```
cp -r ./dist /home/xiaohuochai/blog/admin
```
&emsp;&emsp;把dist目录下的内部复制到/home/xiaohuochai/blog/admin下，并且如果文件名相同，就会直接覆盖

【修改权限】

&emsp;&emsp;由于Jenkins在安装的时候，会自动创建一个名为jenkins的普通账号，这个账号没有管理员权限。jenkins执行命令的时候，它也会使用这个账号。但是由于admin这个文件夹是用户xiaohuochai创建的，所以jenkins账号默认是没有权限读写这个文件夹的。现在需要给jenkins账号授予权限。使用xiaohuochai这个账号登录服务器，使用以下命令给jenkins赋予权限，让它可以读写admin文件夹：
```
sudo chown -R jenkins:jenkins /home/xiaohuochai/blog/admin
```
&emsp;&emsp;执行完成这一行命令以后，jenkins才可以把其他地方的文件复制到这个文件夹里面

【将静态资源上传到七牛云上】

&emsp;&emsp;在dist目录下存在着HTML文件和其他静态资源。除了HTML文件外，其他的静态资源一般都存放在CDN上，以上传到七牛云为例

&emsp;&emsp;在admin目录下，新建一个upload.js脚本，注意一定要在本地安装qiniu插件

```
var fs = require('fs');
var qiniu = require('qiniu');
var accessKey = 'xxx';
var secretKey = 'xxx';

var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var staticPath = 'xxx';
var prefix = 'client/static';
var bucket = 'static';

var config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z1;
var formUploader = new qiniu.form_up.FormUploader(config);
var putExtra = new qiniu.form_up.PutExtra();
putExtra = null; // 一定要将putExtra设置为null，否则会出现所有文件类别都被识别为第一个文件的类型的情况
// 文件上传方法
function uploadFile (localFile) {
  // 配置上传到七牛云的完整路径
  const key = localFile.replace(staticPath, prefix)
  const options = {
     scope: bucket + ":" + key,
 }
  const putPolicy = new qiniu.rs.PutPolicy(options)
  // 生成上传凭证
  const uploadToken = putPolicy.uploadToken(mac)
  // 上传文件
  formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr, respBody, respInfo) {
    if (respErr) throw respErr
  if (respInfo.statusCode == 200) {
    console.log(respBody);
  } else {
    console.log(respInfo.statusCode);
    console.log(respBody);
  }  
})
}
// 目录上传方法
function uploadDirectory (dirPath) {
  fs.readdir(dirPath, function (err, files) {
    if (err) throw err
    // 遍历目录下的内容
    files.forEach(item => {
      let path = `${dirPath}/${item}`
      console.log(dirPath, item, path)
      fs.stat(path, function (err, stats) {
        if (err) throw err
        // 是目录就接着遍历 否则上传
         if (stats.isDirectory())  uploadDirectory(path)
         else  uploadFile(path, item)
      })
    })
  })
}

fs.exists(staticPath, function (exists) {
  if (!exists) {
    console.log('目录不存在！')
  }
  else {
    console.log('开始上传...')
    uploadDirectory(staticPath)
  }
})
```
&emsp;&emsp;然后，在jenkins构建过程中配置如下代码即可
```
cp -r ./dist /home/xiaohuochai/blog/admin
node /home/xiaohuochai/blog/admin/upload.js
```
 

&nbsp;

### 邮件提醒

&emsp;&emsp;在系统设置中找到Jenkins Locaction项填入Jenkins URL和系统管理员邮件地址，系统管理员邮件地址一定要配置，否则发不了邮件通知。因为邮件通知都是由系统管理员的邮箱发出来的

![jenkins](https://pic.xiaohuochai.site/blog/jenkins15.png)

&emsp;&emsp;找到邮件通知项，填入SMTP服务器信息及用户名、密码等认证信息

![jenkins](https://pic.xiaohuochai.site/blog/jenkins16.png)

&emsp;&emsp;找到Extended E-mail Notification项，填入类似信息

![jenkins](https://pic.xiaohuochai.site/blog/jenkins17.png)

&emsp;&emsp;进行新建的pull-blog项目中，在构建后操作新增Editable Email Notification

![jenkins](https://pic.xiaohuochai.site/blog/jenkins18.png)

&emsp;&emsp;在advances setting中选择always，意思是无论什么情况任务执行完就发邮件

![jenkins](https://pic.xiaohuochai.site/blog/jenkins19.png)
 

&nbsp;

### 测试

&emsp;&emsp;按照上面步骤部署完成后，点击立即构建

![jenkins](https://pic.xiaohuochai.site/blog/jenkins20.png)

&emsp;&emsp;点击35号任务的小三角，选择控制台输出

![jenkins](https://pic.xiaohuochai.site/blog/jenkins21.png)

&emsp;&emsp;输出如下记录

```
Started by user xiaohuochai
Building in workspace /var/lib/jenkins/workspace/pull_blog
 > git rev-parse --is-inside-work-tree # timeout=10
Fetching changes from the remote Git repository
 > git config remote.origin.url https://github.com/littlematch0123/blog-admin.git # timeout=10
Fetching upstream changes from https://github.com/littlematch0123/blog-admin.git
 > git --version # timeout=10
 > git fetch --tags --progress https://github.com/littlematch0123/blog-admin.git +refs/heads/*:refs/remotes/origin/*
 > git rev-parse refs/remotes/origin/master^{commit} # timeout=10
 > git rev-parse refs/remotes/origin/origin/master^{commit} # timeout=10
Checking out Revision 21ff1aa59ffb4ffad648f9f80193f300947a98fb (refs/remotes/origin/master)
 > git config core.sparsecheckout # timeout=10
 > git checkout -f 21ff1aa59ffb4ffad648f9f80193f300947a98fb
Commit message: "本地构建"
 > git rev-list --no-walk 21ff1aa59ffb4ffad648f9f80193f300947a98fb # timeout=10
No emails were triggered.
[pull_blog] $ /bin/sh -xe /tmp/jenkins4130757344876690584.sh
+ cp -r ./build ./config-overrides.js ./LICENSE ./package.json ./public ./README.md ./src /home/xiaohuochai/www/blog/admin/source
Email was triggered for: Always
Sending email for trigger: Always
Sending email to: 121631835@qq.com
Finished: SUCCESS
```
&emsp;&emsp;与此同时，邮箱也收到了通知

![jenkins](https://pic.xiaohuochai.site/blog/jenkins23.png)
 