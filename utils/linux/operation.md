# Linux常见操作

&emsp;&emsp;本文将详细介绍Linux常见操作

&nbsp;

### 基本概念

&emsp;&emsp;Linux严格区分大小写，所有内容以文件形式保存，包括硬件

&emsp;&emsp;Linux没有扩展名的概念，不靠扩展名来区分文件类型。但有一些约定俗成的扩展名

<div>
<pre>压缩包: .gz .bz2 .tar.bz2 .tgz
二进制软件包：.rpm
网页文件： .html .php
脚本文件： .sh
配置文件： .conf</pre>
</div>

&emsp;&emsp;注意：windows下的程序不能直接在linux中安装和运行

&emsp;&emsp;Linux字符界面的优势如下：

&emsp;&emsp;1、占用的系统资源更少

&emsp;&emsp;2、减少了出错、被攻击的可能性

【分区类型】

&emsp;&emsp;主分区：最多只能有4个

&emsp;&emsp;扩展分区：最多只能有1个，主分区加扩展分区最多有4个，不能写入数据，只能包含逻辑分区

【硬件设置文件名】

<div>
<pre>硬件  设置文件名
IDE硬盘 /dev/hd[a-d]
SCSI/SATA/USB硬盘 /dev/sd[a-p]
光驱  /dev/cdrom 或/dev/hdc
软盘  /dev/fd[0-1]
打印机(25针)  /dev/1p[0-2]
打印机(USB)  /dev/usb/1p[0-15]
鼠标  /dev/mouse</pre>
</div>

【挂载】

<div>
<pre>必须分区
/ (根分区)
swap分区 (交换分区，内存2倍，不超过2GB)
推荐分区
/boot (启动分区，200MB)</pre>
</div>

&nbsp;

### 显示

【起始标识】

<div>
<pre>[root@bogon ~]#</pre>
</div>

&emsp;&emsp;root表示当前登录用户为管理员

&emsp;&emsp;bogon表示主机名

&emsp;&emsp;~表示当前所在目录

&emsp;&emsp;#是管理员的提示符

&emsp;&emsp;$是普通用户的提示符

&nbsp;【命令格式】

&emsp;&emsp;当有多个选项时，可以写在一起

&emsp;&emsp;选项包括简化选项与完整选择如-a 等于 --all

<div>
<pre>命令 [选项] [参数]</pre>
</div>

&emsp;&emsp;注意：个别命令使用不遵循此格式

&nbsp;

### 文件

【文件类型】

&emsp;&emsp;Linux包括以下7种文件类型，以文件位第一位来表示文件类型

<div>
<pre>- 文件
d 目录
l 软链接文件</pre>
</div>

![linux_command1](https://pic.xiaohuochai.site/blog/linux_command1.png)


&emsp;&emsp;除了上面这3种，还有块设备文件、字符设备文件、套接字文件和管道文件。这4种文件都是linux系统中的特殊文件

【文件身份】

&emsp;&emsp;文件位共有10位组成，除了第1位表示文件类型外，后9位每3位为一组，表示文件的所有者、所属组和其他人

【文件权限】

<div>
<pre>r读
w写
x执行</pre>
</div>

&emsp;&emsp;下面这个例子中，表示这是一个文件，所有者有读写权限，而所属组和其他人只有读权限


![linux_command2](https://pic.xiaohuochai.site/blog/linux_command2.png)


&emsp;&emsp;一般地，用户在自己主目录下拥有写权限，主目录之外只有读权限。如果一定在要不具有写权限的目录下操作文件，如新建文件。则可以使用sudo命令，变身管理员，然后输入管理员的密码来执行这个操作

<div>
<pre> sudo touch aaa</pre>
</div>

【文件信息】

&emsp;&emsp;上面的例子中，两个root之后，分别代码文件大小、文件最后一次修改时间及文件名称

&emsp;&emsp;注意：linux中文件名以.开头的文件是隐藏文件

【修改文件权限】

&emsp;&emsp;比如，将a.txt文件的权限变更为读写权限

<div>
<pre>chmod 666 a.txt</pre>
</div>

![linux_command3](https://pic.xiaohuochai.site/blog/linux_command3.png)


&emsp;&emsp;实际中使用 chmod 命令最多的一种情形可能是给自己写的脚本加一个执行权限

<div>
<pre>chmod +x a.sh</pre>
</div>

【常用一级目录作用】&nbsp;

<div>
<pre>/ 根目录
/bin 存放系统命令
/sbin 存放只有管理员才能执行的系统命令 
/usr 系统资源保存目录，包含了一般不需要修改的应用程序，命令程序文件、程序库、手册和其它文档
/usr/bin 存放系统命令 
/usr/sbin 存放只有管理员才能执行的系统命令</pre>
</div>
<div>
<div>
<pre>/boot 存放内核以及启动所需的文件等 
/dev 存放设备文件 
/etc 存放系统的配置文件 
/lib 存放函数库
/home 用户文件的主目录，用户数据存放在此目录中
/root 管理员的主目录</pre>
</div>
</div>
<div>
<pre>/mnt 空目录，存放临时的映射文件系统，常把软驱和光驱挂装在这里的floppy和cdrom子目录下
/media 空目录，存放临时的映射文件系统，老式linux无该目录
/misc 空目录，存放临时的映射文件系统，老式linux无该目录
/proc 不能直接操作，存放存储进程和系统信息 
/sys 不能直接操作，存放存储进程和系统信息
/tmp 存放临时文件的目录 
/var 包含系统产生的经常变化的文件</pre>
</div>

&nbsp;

### 关机

【shutdown】

<div>
<pre>shutdown [选项] 时间
选项：
    -c: 取消前一个关机命令
    -h: 关机
    -r: 重启</pre>
</div>
<div>
<pre>shutdown -h now 立刻关机</pre>
</div>

【其他关机命令】

<div>
<pre>halt
poweroff
init 0</pre>
</div>

【其他重启命令】

<div>
<pre>reboot
init 6</pre>
</div>

【运行级别】

&emsp;&emsp;系统运行级别包括以下7个

<div>
<pre>0 关机
1 单用户，安全模式
2 不完全多用户，不含nfs服务
3 完全多用户
4 未分配
5 图形界面
6 重启</pre>
</div>
<div>
<pre>cat /etc/inittab
#修改系统默认运行级别
id:3:initdefault:
runlevel
#查询系统运行级别</pre>
</div>

&nbsp;

### 登录

【查看登录用户信息】

![linux_command4](https://pic.xiaohuochai.site/blog/linux_command4.png)


![linux_command5](https://pic.xiaohuochai.site/blog/linux_command5.png)


【退出登录】

<div>
<pre>logout</pre>
</div>

【who】

![linux_command6](https://pic.xiaohuochai.site/blog/linux_command6.png)


![linux_command7](https://pic.xiaohuochai.site/blog/linux_command7.png)


【查询当前登录和过去登录的用户信息】


![linux_command8](https://pic.xiaohuochai.site/blog/linux_command8.png)


![linux_command9](https://pic.xiaohuochai.site/blog/linux_command9.png)


【查看所有用户的最后一次登录时间】


![linux_command10](https://pic.xiaohuochai.site/blog/linux_command10.png)


### shell

&emsp;&emsp;shell是一个命令行解释器，它为用户提供了一个向Linux内核发送请求以便运行程序的界面系统级程序，用户可以用shell来启动、挂起、停止甚至是编写一些程序

&emsp;&emsp;shell还是一个功能非常强大的编程语言，易编写，易调试，灵活性较强。shell是解释执行的脚本语言，在shell中可以直接调用linux系统命令


![linux_command11](https://pic.xiaohuochai.site/blog/linux_command11.png)



【语法类型】

<div>
<pre>Bourne Shell:    主文件名为  sh
语法类型：sh、ksh、Bash、psh、zsh
C Shell  :  主要在BSD版的Unix系统中使用
语法类型：  csh、 tcsh</pre>
</div>

【查看当前系统的SHELL类型】


![linux_command12](https://pic.xiaohuochai.site/blog/linux_command12.png)


【编辑脚本】

<div>
<pre>vi hellp.sh</pre>
</div>

![linux_command13](https://pic.xiaohuochai.site/blog/linux_command13.png)


【退出脚本】

&emsp;&emsp;在vim中编辑好之后，按esc键，回到一般模式，再输入&ldquo;:wq&rdquo;，回车执行

【脚本执行】

&emsp;&emsp;1、赋予执行权限，直接运行

<div>
<pre>chmod 755 hello.sh
./hello.sh</pre>
</div>

&emsp;&emsp;2、或者，可以通过bash调用执行脚本

<div>
<pre>bash hello.sh</pre>
</div>

![linux_command14](https://pic.xiaohuochai.site/blog/linux_command14.png)


&nbsp;

### 输入输出

![linux_command15](https://pic.xiaohuochai.site/blog/linux_command15.png)


【输出重定向】


![linux_command16](https://pic.xiaohuochai.site/blog/linux_command16.png)


![linux_command17](https://pic.xiaohuochai.site/blog/linux_command17.png)


【输入重定向】

<div>
<pre>wc [选项] [文件名]
    选项：
        -c  统计字节数
        -w  统计单词数
        -l  统计行数</pre>
</div>

&emsp;&emsp;命令&lt;文件把文件作为命令的输入

&emsp;&emsp;命令&lt;&lt;标识符把标识符之间的内容作为命令的输入

&nbsp;

### 进程管理

&emsp;&emsp;Linux 系统上有一个命令ps用来报告系统当前的进程状态

<div>
<pre>$ ps aux</pre>
</div>

&emsp;&emsp;上面指令可以查看系统当前所有进程

<div>
<pre>$ kill 1234</pre>
</div>

&emsp;&emsp;上面指令可以强制关闭进程号为1234的进程

<div>
<pre>$ bg</pre>
</div>

&emsp;&emsp;上面指令让程序变成后台执行

<div>
<pre>$ fg</pre>
</div>

&emsp;&emsp;上面指令让程序回到前台

&nbsp;

### 磁盘管理

【df】查看磁盘分区使用状况

<div>
<pre>-I 仅显示本地磁盘(默认)
-a 显示所有文件系统的磁盘使用情况
-h 以1024进制计算最合适的单位显示磁盘容量
-H 以1000进制计算最合适的单位显示磁盘容量(新购买的U盘实际容量小于标识容量，是因为工业生产使用1000进制，而不是1024进制)
-T 显示磁盘分区类型
-t 显示指定类型文件系统的磁盘分区
-x 不显示指定类型文件系统的磁盘分区</pre>
</div>

![linux_command18](https://pic.xiaohuochai.site/blog/linux_command18.png)


【du】统计磁盘上的文件大小

<div>
<pre>-b 以Byte为单位统计文件
-k 以KB为单位统计文件
-m 以MB为单位统计文件
-h 按照1024进制以最适合的单位统计文件
-H 按照1000进制以最适合的单位统计文件
-s 指定统计目标</pre>
</div>

![linux_command19](https://pic.xiaohuochai.site/blog/linux_command19.png)


【MBR分区】

<div>
<pre>fdisk -l 查看当前磁盘分区</pre>
</div>

![linux_command20](https://pic.xiaohuochai.site/blog/linux_command20.png)

<div>
<pre>fdisk /dev/sdb 进入分区模式</pre>
</div>

![linux_command21](https://pic.xiaohuochai.site/blog/linux_command21.png)


&emsp;&emsp;通过下面的命令为磁盘分得一个3GB的主分区


![linux_command22](https://pic.xiaohuochai.site/blog/linux_command22.png)


&emsp;&emsp;分配结束后，输入p命令来查看分区信息


![linux_command23](https://pic.xiaohuochai.site/blog/linux_command23.png)


&emsp;&emsp;最后输入w来保存并结束当前分区结果


![linux_command24](https://pic.xiaohuochai.site/blog/linux_command24.png)


&nbsp;【GPT分区】

&emsp;&emsp;MBR分区的限制在于主分区不超过4个，单个分区容量最大为2TB。而GPT分区最多支持128个分区，单个分区容量最大为18EB

<div>
<pre>1EB = 1024PB
1PB = 1024TB
1TB = 1024GB</pre>
</div>

&emsp;&emsp;GPT分区中，不适合安装X86架构的系统，即32位操作系统

&emsp;&emsp;fdisk命令只适合于MBR分区，而parted命令同时适合于MBR分区和GPT分区

&emsp;&emsp;注意：下面分区从1M开始是为了保持4K对齐


![linux_command25](https://pic.xiaohuochai.site/blog/linux_command25.png)


【分区格式化】

&emsp;&emsp;先使用ll /dev/sdb*来查看sdb的分区情况


![linux_command26](https://pic.xiaohuochai.site/blog/linux_command26.png)


&emsp;&emsp;使用mkfs命令来进行分区格式化

&emsp;&emsp;注意：扩展分区不能进行分区格式化

<div>
<pre>mkfs .ext4 /dev/sdb1</pre>
</div>

【挂载】

&emsp;&emsp;格式化后的分区必须进行挂载操作，才能使用。一般地，挂载在mnt目录下

&emsp;&emsp;下面代码中，将sdb1挂载到mnt目录下的sdb1目录中

<div>
<pre>mkdir -p /mnt/sdb1
mount /dev/sdb1 /mnt/sdb1</pre>
</div>

&emsp;&emsp;通过mount命令挂载的分区不具有永久性，关机后失效。更好的方式是需要编辑etc目录下的fstab文件

<div>
<pre>vim +  /etc/fstab</pre>
</div>

![linux_command27](https://pic.xiaohuochai.site/blog/linux_command27.png)


&emsp;&emsp;这样一来，即使系统重启，也会进行自动挂载

【swap交换分区】

&emsp;&emsp;在linux中添加swap交换分区的步骤如下

&emsp;&emsp;1、先建立一个linux普通分区 (用MBR建立)输入fdisk /dev/sdb

&emsp;&emsp;2、修改分区类型的16进制：输入t，再输入该硬盘的分区号如6，再输入16进制的编码L。修改编码83，改为82（swap类型）输入w保存退出

&emsp;&emsp;3、格式交换分区 mkswap /dev/sdb6

&emsp;&emsp;4、启动分区 swapon /dev/sdb6

&emsp;&emsp;5、关闭分区 swapoff /dev/sdb6

&nbsp;

### 用户管理

&emsp;&emsp;linux允许多个用户在同一个时间登录同一个操作系统

【group】

<div>
<pre>/etc/group 存储当前系统中所有的用户组信息</pre>
</div>
<div>
<pre>  Group:      x    : 123  :abc,def,xyz
  组名称:组密码占位符:组编号:组中用户名列表</pre>
</div>

&emsp;&emsp;当用户组名称与用户名相同时，可以省略用户名列表的信息

&emsp;&emsp;组编号0为root，1-499为系统保留组编号，一般用于安装在系统中的软件或服务；用户手动创建的用户组从500开始


![linux_command28](https://pic.xiaohuochai.site/blog/linux_command28.png)


【gshadow】

<div>
<pre>/etc/gshadow 存储当前系统中用户组的密码信息</pre>
</div>
<div>
<pre>Group:   *  :       : abc,def,xyz
组名称:组密码:组管理者:组中用户名列表</pre>
</div>

&emsp;&emsp;该文件中的内容与group里面的内容一一对应


![linux_command29](https://pic.xiaohuochai.site/blog/linux_command29.png)


【passwd】

<div>
<pre>/etc/passwd 存储当前系统中所有用户的信息</pre>
</div>
<div>
<pre> user:     x    :  123  :    456  :  xxxxxxx :/home/user:/bin/bash
用户名:密码占位符:用户编号:用户组编号:用户注释信息:用户主目录:shell类型</pre>
</div>

![linux_command30](https://pic.xiaohuochai.site/blog/linux_command30.png)

<div>
<pre>/etc/shadow存储当前系统中所有用户的密码信息</pre>
</div>
<div>
<pre> user :vf;/Zu8sdf...:::::
用户名:     密码    :::::</pre>
</div>

![linux_command31](https://pic.xiaohuochai.site/blog/linux_command31.png)


&emsp;&emsp;由于系统运行过程中，group和passwd这两个文件经常需要被读取，而密码又属于敏感数据，于是单独设置了gshadow和shadow来保存密码

【基本命令】

<div>
<pre>groupadd  用户组名 #创建用户组
groupmod -n 新组名 原组名 #修改用户组名    
groupmod -g 组编号 组名称 #修改组编号
groupadd -g 组编号 组名称 #创建用户组并指定组编号
groupdel 组名称 #删除用户组

useradd -g 用户组 用户 #向指定用户组中添加用户
useradd -d 文件夹 用户 #创建用户并指定用户的个人文件夹
usermod -c 备注信息 用户 #给用户添加备注信息
usermod -l 新用户 原用户 #修改用户名
usermod -g 目标用户组名 用户 #切换用户组
userdel 用户名 #删除用户
userdel -r 用户名 #删除用户及对应的个人文件夹
touch /etc/nologin #禁止除root外的用户登录服务器
passwd abc #给用户adc设置密码</pre>
</div>

&emsp;&emsp;注意：在centos系统下，使用useradd会默认在home目录下，新增一个与用户名同名的目录。如果是ubuntu系统，默认不创建目录，如果需要则添加-m参数

【进阶命令】

<div>
<pre>passwd -l 用户名 #锁定用户 禁用
passwd -u 用户名 #解锁用户
passwd -d 用户名 #清除用户密码，可以无密码登录</pre>
</div>

&emsp;&emsp;用户可以同时属于多个组，一个是主要组，其他的为附属组

<div>
<pre>gpasswd -a 用户名 附属组，附属组，..... #添加附属组</pre>
</div>

&emsp;&emsp;用户创建的文件默认为主要组；需要以附属组创建文件的，需将身份切换到附属组

<div>
<pre>newgrp 附属组名称 #切换附属组</pre>
</div>

&emsp;&emsp;注意：需要用户登录后，自己执行，切换，组密码是在组切换时用的，如果有，会要求输入组密码

<div>
<pre>gpasswd -d 用户名 附属组 #删除附属组</pre>
</div>
<div>
<pre>useradd -g group1 -G group2,group3,.... #创建用户同时指定主要组和附属组</pre>
</div>
<div>
<pre>gpasswd 用户组 #设定组密码</pre>
</div>

&emsp;&emsp;注意：输入后回车，会有提示让输入密码

<div>
<pre>su username #切换当前用户身份，su后不加参数切换到root
sudo su #切换到root用户
whoami #显示当前登录用户名
id 用户名 #显示制定用户信息，包括用户编号，用户名，主要组编号及名称，附属组列表
groups 用户名 #显示用户所在的所有组
chfn 用户名 #设置用户资料
finger 用户名  #显示用户详细资料</pre>
</div>

&nbsp;

### 端口设置

&emsp;&emsp;查看某个端口被占用情况

<div>
<pre>lsof -i:8081</pre>
</div>

![linux_command32](https://pic.xiaohuochai.site/blog/linux_command32.png)


&emsp;&emsp;然后使用kill -9命令来结束进程

<div>
<pre>kill -9 18446</pre>
</div>

