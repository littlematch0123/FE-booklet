# Linux软件安装

&emsp;&emsp;window里面的软件无法在linux中安装，好处是windows中绝大多数的木马、病毒对Linux没有影响，坏处是软件需要针对linux再次开发。本文将详细介绍Linux软件安装

&nbsp;

### 分类

【1】源码包

&emsp;&emsp;源码包的优点：

&emsp;&emsp;1、开源，如果有足够的能力，可以修改源代码；

&emsp;&emsp;2、可以自由选择所需的功能

&emsp;&emsp;3、软件是编译安装，所以更加适合自己的系统，更加稳定、效率更高；

&emsp;&emsp;4、卸载方便；

&emsp;&emsp;源码包的缺点：

&emsp;&emsp;1、安装过程步骤较多，尤其安装较大的软件集合时（如LAMP环境搭建），容易出现拼写错误

&emsp;&emsp;2、编译过程时间较长，安装比二进制安装时间长

&emsp;&emsp;3、因为是编译安装，安装过程中一旦报错新手很难解决

【2】二进制包（RPM包、系统默认包）

&emsp;&emsp;二进制包是指源码包经过编译之后的包，也就是常说的RPM包

&emsp;&emsp;二进制包的优点：

&emsp;&emsp;1、包管理系统简单，只通过几个命令就可以实现包的安装、升级、查询和卸载

&emsp;&emsp;2、安装速度比源码包快很多

&emsp;&emsp;二进制包的缺点：

&emsp;&emsp;1、经过编译，不能再看到源代码

&emsp;&emsp;2、功能选择不如源码包灵活

&emsp;&emsp;3、依赖性

【3】脚本安装包

&emsp;&emsp;所谓的脚本安装包，就是把复杂的软件包安装过程写成了程序脚本，初学者可以执行程序脚本实现一键安装。但实际安装的还是源码包或二进制包

&emsp;&emsp;优点：安装简单、快捷

&emsp;&emsp;缺点：完全丧失了自定义性

&nbsp;

### RPM

&emsp;&emsp;所有RPM包都在系统光盘的Packages目录中

<div>
<pre>mkdir /mnt/cdrom/
mount /dev/sr0  /mnt/cdrom/
cd /mnt/cdrom/Packages/</pre>
</div>

【命名规则】

<div>
<pre>httpd-2.2.15-15.el6.centsos.1.i686.rpm
</pre>
</div>

&emsp;&emsp;httpd 软件包名

&emsp;&emsp;2.2.15 软件版本

&emsp;&emsp;15 发布的次数

&emsp;&emsp;el6.centos 适合的Linux平台

&emsp;&emsp;i686 适应的硬件平台

&emsp;&emsp;rpm 包扩展名

【依赖性】

&emsp;&emsp;1、树形依赖：a-&gt;b-&gt;c 解决方法：从后往前安装

&emsp;&emsp;2、环形依赖：a-&gt;b-&gt;c-&gt;a 解决方法：放在一条命令中安装即可

&emsp;&emsp;3、模块依赖：库文件依赖，库也叫模块，就是linux中的函数，它有一个典型的特征，就是以【.so.数字】结尾，它依赖的其实是一个文件，而不是软件包。该文件藏身在某一个软件包当中。只要将该文件所在的软件包安装上，该文件也就安装了。解决方法：登录`www.rpmfind.net`网站，输入库文件名称查询到对应的rpm包，然后安装即可

&nbsp;&nbsp;

### RPM安装

【包名】

&emsp;&emsp;包全名：操作的包是没有安装的软件包时，要使用包全名，且要注意路径

&emsp;&emsp;包名：操作已经安装的软件包时，使用包名，是搜索/var/lib/rpm/中的数据库

&emsp;&emsp;比如，httpd-2.2.15-15.el6.centsos.1.i686.rpm是包全名，而httpd是包名

【安装命令】

<div>
<pre>rpm -ivh 包全名
选项：
    -i(install) 安装
    -v(verbose) 显示详细信息
    -h(hash) 显示进度
    --nodeps 不检测依赖性</pre>
</div>

【升级命令】

<div>
<pre>rpm -Uvh 包全名
选项：
    -U(upgrade) 升级</pre>
</div>

【卸载命令】

&emsp;&emsp;注意：卸载命令使用的是包名，而且不一定要在安装目录下

<div>
<pre>rpm -e 包名
选项：
    -e(erase) 卸载
    --nodeps 不检查依赖性</pre>
</div>

&nbsp;

### 查询与检验

【查询是否安装】

<div>
<pre>rpm -q 包名
#查询包是否安装
&emsp;&emsp;-q  查询(query)
rpm -qa
#查询所有已经安装的rpm包
&emsp;&emsp;-a  所有(all) </pre>
</div>
<div>
<pre>rpm -qa | grep httpd</pre>
</div>

【查询软件包详细信息】

<div>
<pre>rpm -qi 包名
    -i 查询软件信息(information) 
    -p 查询未安装包(package)</pre>
</div>

【查询包中文件安装位置】

<div>
<pre>rpm -ql 包名
    -l   列表(list)
    -p   查询未安装包信息(package)</pre>
</div>

&emsp;&emsp;RPM包默认安装路径如下


![linux_soft1](https://pic.xiaohuochai.site/blog/linux_soft1.png)


【查询系统文件属于哪个RPM包】

<div>
<pre>rpm -qf 系统文件名
&emsp;&emsp;-f 查询系统文件属于哪个软件包(file)</pre>
</div>

【查询软件包的依赖性】

<div>
<pre>rpm -qR 包名
    -R 查询软件包的依赖性(requires)
    -p 查询未安装包信息(package)</pre>
</div>

【校验】

<div>
<pre>rpm -V 已安装的包名
    -V: 校验指定RPM包中的文件(verify)</pre>
</div>

&emsp;&emsp;执行 rpm -V httpd 后，无任何提示，代表该文件没有被做任何修改。因此，判断本地的apache与官方给出的是否一致, 从而判断是否被修改

&emsp;&emsp;修改文件 `/etc/httpd/conf/httpd.conf` , 在注释行添加任意内容后, 再次执行rpm -V httpd 后，有如下提示

<div>
<pre>S.5....T. c /etc/httpd/conf/httpd.conf</pre>
</div>

&emsp;&emsp;验证内容中的8个信息的具体内容如下

<div>
<pre>S : 文件大小是否改变
M : 文件的类型或文件的权限( rwx )是否被改变
5 : 文件MD5校验和是否改变( 可以看成文件内容是否改变 )
D : 设备的主从代码是否改变
L : 文件路径是否改变
U : 文件的属主( 所有者 ) 是否改变
G : 文件的属组是否改变
T : 文件的修改时间是否改变 </pre>
</div>

【RPM包中的文件提取】

&emsp;&emsp;rpm2cpio表示将rpm包转换为cpio格式的命令

&emsp;&emsp;cpio是一个标签工具，它用于创建软件档案文件和从档案文件中提取文件

<div>
<pre>rpm2cpio 包全名 | cpio -idv .文件绝对路径</pre>
</div>
<div>
<pre>cpio选项 &lt; [文件|设备]
选项
    -i: copy-in模式，还原
    -d:还原时自动新建目录
    -v:显示还原过程</pre>
</div>

&nbsp;

### YUM

&emsp;&emsp;使用yum安装的好处在于，所有软件包都在官方服务器上，当进行yum在线安装时，可以自动解决依赖性问题

&emsp;&emsp;注意：redhat的yum在线装需要付费，centOS不需要

【yum源文件】

&emsp;&emsp;在/etc/yum.repos.d/目录中，默认有4个yum源文件，其中CentOS-Base.repo是基本yum源文件，如果能上网，那它是默认生效的，而其他的都是默认不生效的

<div>
<pre>[base]：容器名称，一定要放在[]中，名字可以随便起
name：容器说明，名字也是随便起
mirrorlist：镜像站点，这个可以注释掉
baseurl：yum源服务器的地址，默认是CentOS官方的yum源服务器。如果觉得慢，可以修改为其他yum源地址
enabled：如果不写或写成enable=1则生效，写成enable=0则不生效。默认最后一个容器不生效，其他容器都生效
gpgcheck：如果是1，则RPM的数字证书生效，0则不生效。一般都要开启，开启后安装时会验证rpm包是否是官方的，以保证系统安全
gpgkey：数字证书的公钥文件保存位置，不用修改</pre>
</div>

&emsp;&emsp;默认系统安装后，在目录/etc/pki/rpm-gpg下都会存在数字证书。前面的`file://`表示文件协议，后面的/etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7是数字证书的位置


![linux_soft2](https://pic.xiaohuochai.site/blog/linux_soft2.png)


【光盘yum源搭建】

&emsp;&emsp;1、挂载光盘

<div>
<pre>mkdir /mnt/cdrom
#建立挂载点
mount /dev/sr0 /mnt/cdrom
#挂载光盘</pre>
</div>

&emsp;&emsp;2、使网络yum源失效

&emsp;&emsp;判断yum源是根据后缀名repo来实现的，修改后缀名则可以使该yum源失效

<div>
<pre>cd/etc/yum.repos.d/
#进入yum源目录
mv CentOS-Base.repo CentOS-Base.repo.bak
#修改Yum源文件后缀名，使其失效</pre>
</div>

&emsp;&emsp;3、使光盘yum源生效

<div>
<pre>vim CentOS-Media.repo</pre>
</div>

&emsp;&emsp;`baseurl=file:///mnt/cdrom`：地址为光盘挂载地址，如果有多余的光盘挂载点，需要注释掉不存在或不需要使用的光盘挂载地址

&emsp;&emsp;注意：注释的时候，一定要把引号写在行首，否则不生效

&emsp;&emsp;`enabled=1`：把enabled=0改为enabled=1，使该yum源配置生效

&emsp;&emsp;4、命令

&emsp;&emsp;yum list：该命令可验证目前使用的yum源有哪些可用的rpm包

【yum命令】

【查询】

<div>
<pre>yun list
#查询所有可用软件包列表
yum search 关键字
#搜索服务器上所有和关键字相关的包</pre>
</div>

【安装】

&emsp;&emsp;yum安装只写包名即可

<div>
<pre>yum -y install 包名
&emsp;&emsp;选项：
&emsp;&emsp;-install 安装
&emsp;&emsp;-y  (自动回答yes)</pre>
</div>

【gcc安装】

&emsp;&emsp;gcc是C语言的编译器，gdk是java的编译器，bash是linux命令行的编译器

<div>
<pre>yum -y install gcc</pre>
</div>

【升级】

&emsp;&emsp;如果不写包名，只写yum -y update会导致系统直接崩溃

<div>
<pre>yum -y update 包名
    -update：升级
    -y：自动回答yes</pre>
</div>

【卸载】

&emsp;&emsp;服务器使用最小化安装，用什么软件安装什么，尽量不要卸载

<div>
<pre>yum -y remove 包名
    -remove：卸载
    -y：自动回答yes</pre>
</div>

【组管理命令】

<div>
<pre>yum grouplist
#列出所有可用的软件列表
yum groupinstall 软件组名
#安装指定软件组，组名可以由grouplist查询出来
yum gourpremove 软件组名
#卸载指定软件组</pre>
</div>

&emsp;&emsp;注意：groupinstall中的软件组名只支持英文&nbsp;

【语言设置】

<div>
<pre>LANG=en_US：切换至英文（临时生效）
LANG=zh_CN.utf8：切换至中文（临时生效）</pre>
</div>

&nbsp;

### 源码包安装

&emsp;&emsp;源码包和RPM包在安装之后，最主要的区别在于安装位置的不同

&emsp;&emsp;源码包是不能使用service命令来启动服务，因为源码包的安装位置由用户指定，放在哪并不统一，一般将其放在&ldquo;/usr/local/软件名&rdquo;目录下；而rpm包安装后，启动文件通常都是放在/etc/rc.d/init.d目录中的，而service命令执行时，会自动搜索该目录，所以rpm包安装的服务可以使用service命令

<div>
<pre>service httpd start</pre>
</div>

&emsp;&emsp;因为源码包安装的服务不能被服务器管理命令管理，所以只能使用绝对路径进行服务的管理

<div>
<pre>/usr/local/apache2/bin/apachectl start</pre>
</div>

&emsp;&emsp;当然，如果将源码包安装后的启动程序复制到/etc/rc.d/init.d目录下，也可以使用service命令执行

【安装准备】

&emsp;&emsp;1、安装gcc

&emsp;&emsp;由于源码包都是c语言写的，所以要先安装c语言编译器：gcc

&emsp;&emsp;2、源码包下载

&emsp;&emsp;从官方网站下载源码包，若是下载到了windows上面，可以使用winSCP等软件传到linux上

&emsp;&emsp;&nbsp;注意：若已安装了二进制包，则源码包也是可以继续安装的，因为两者安装目录不一样。但是，并不建议这样做，因为端口会冲突

&emsp;&emsp;对于要求效率的软件，要安装源码包版本，因为是本机编译，更具有兼容性和效率，而rpm包是软件开发者提供的大众版本，可用于不注重效率的应用

【注意事项】

&emsp;&emsp;源代码保存位置：/usr/local/src/

&emsp;&emsp;软件保存位置： /usr/local/

&emsp;&emsp;如何确定安装过程报错：安装过程停止，并出现error、warning或no的提示

【安装】

&emsp;&emsp;源码包的安装过程和安装顺序是固定的，下面以安装apache2为例，解压缩后的目录为httpd-2.2.31

&emsp;&emsp;1、安装时必须进入到解压缩后的目录httpd-2.2.31中

&emsp;&emsp;2、configure命令用于软件配置与检查（基本上每个源码包都会有该命令，即使个别的没有该命令，也会提供相关替代命令）

&emsp;&emsp;它有以下几点功能：

&emsp;&emsp;a、定义需要的功能选项；

&emsp;&emsp;b、检测系统环境是否符合安装要求

&emsp;&emsp;c、把a中定义好的功能选项和b中检测系统环境的信息都写入Makefile文件，用于后续的编辑(后续的'make'和'make install'命令都会依赖该文件)

&emsp;&emsp;执行命令 ./configure --prefix=/usr/local/apache2，该命令用于指定安装位置为：/usr/local/apache2 (其中的'apache2'目录不需要提前创建，'make install'命令执行时会自动创建)。命令执行后，会在当前目录生成Makefile文件

&emsp;&emsp;3、执行&lsquo;make&rsquo;命令，编译源码(这一步通常比较耗时)

&emsp;&emsp;如果在编译过程中报错，则执行make clean命令来清除缓存、临时文件等，使安装环境恢复到未安装状态

&emsp;&emsp;4、执行make install命令，安装程序，此时会创建/usr/local/apache2目录

&emsp;&emsp;若在安装过程中报错，则需要删除/usr/local/apache2目录，并且执行make clean命令

&nbsp;

### 脚本安装

&emsp;&emsp;所谓的一键安装包，实际上还是安装的源码包与RPM包，只是把安装过程写成了脚本，便于初学者安装。优点是简单、快速、方便。缺点是不能定义安装软件的版本，不能定义所需要的软件功能，源码包的优势丧失

&emsp;&emsp;下面以安装LNMP（`http://lnmp.org/download.html`）为例

【准备工作】

&emsp;&emsp;1、先停止之前安装的apache和mysql服务（最好将源码包安装的apache目录'/usr/local/apache2'也删除

<div>
<pre>service apache stop
service httpd stop</pre>
</div>

&emsp;&emsp;2、保证yum源正常：可以使用"yum list"命令测试。若是光盘yum源，记得挂载光盘

&emsp;&emsp;3、关闭SELinux和防火墙

&emsp;&emsp;a、永久关闭SELinux的方法：编辑文件"/etc/selinux/config"，将"SELINUX=enforcing"改为"SELINUX=disabled"，然后重启系统即可

&emsp;&emsp;b、永久关闭防火墙的方法："chkconfig iptables off"，开启为："chkconfig iptables on"；

&emsp;&emsp;临时关闭防火墙的方法："service iptables stop"，开启为："service iptables start"

【开始安装】

&emsp;&emsp;1、将lnmp.org网站的一键安装包上传到服务器根目录下

&emsp;&emsp;2、解压缩安装包

<div>
<pre>tar -zxvf lnmp1.4-full.tar.gz</pre>
</div>

&emsp;&emsp;3、进入安装目录

<div>
<pre>cd lnmp1.4</pre>
</div>

&emsp;&emsp;4、执行install.sh脚本

<div>
<pre>./install.sh</pre>
</div>

【安装过程】

&emsp;&emsp;运行上述LNMP安装命令后，会出现如下提示：


![linux_soft3](https://pic.xiaohuochai.site/blog/linux_soft3.png)


&emsp;&emsp;目前提供了较多的MySQL、MariaDB版本和不安装数据库的选项，需要**注意的是MySQL 5.6,5.7及MariaDB 10必须在1G以上内存的更高配置上才能选择**！输入对应MySQL或MariaDB版本前面的序号，回车进入下一步.


![linux_soft4](https://pic.xiaohuochai.site/blog/linux_soft4.png)


&emsp;&emsp;需要设置MySQL的root密码（不输入直接回车将会设置为root）如果输入有错误需要删除时，可以按住Ctrl再按Backspace键进行删除(个别情况下是只需要Backspace键)。输入后回车进入下一步，如下图所示：


![linux_soft5](https://pic.xiaohuochai.site/blog/linux_soft5.png)


&emsp;&emsp;询问是否需要启用MySQL InnoDB，InnoDB引擎默认为开启，一般建议开启，直接回车或输入 y ，如果确定确实不需要该引擎可以输入 n，输入完成，回车进入下一步。注意：选择PHP7等高版本时需要自行确认是否与自己的程序兼容。


![linux_soft6](https://pic.xiaohuochai.site/blog/linux_soft6.png)


&emsp;&emsp;输入要选择的PHP版本的序号，回车进入下一步，选择是否安装内存优化：


![linux_soft7](https://pic.xiaohuochai.site/blog/linux_soft7.png)


&emsp;&emsp;可以选择不安装、Jemalloc或TCmalloc，输入对应序号回车，直接回车为默认为不安装

&emsp;&emsp;接着，会提示"Press any key to install...or Press Ctrl+c to cancel"后，按回车键确认开始安装。&nbsp;LNMP脚本就会自动安装编译Nginx、MySQL、PHP、phpMyAdmin、Zend Optimizer这几个软件。安装时间可能会几十分钟到几个小时不等，主要是机器的配置网速等原因会造成影响

&emsp;&emsp;界面如下，表示安装完成


![linux_soft8](https://pic.xiaohuochai.site/blog/linux_soft8.png)


【错误处理】

&emsp;&emsp;如果安装卡在了"php-fpm"那里，通常表示已安装成功，只是"php-fpm"那里卡住了（物理机少见，但虚拟机比较常见），解决的方法就是：使用命令"pkill -9 php-fpm"杀掉"php-fpm"进程，然后重新启动该进程"/etc/rc.d/init.d/php-fpm start"即可

