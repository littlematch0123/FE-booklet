# Linux系统centOS7在虚拟机下的安装

　　本文将详细介绍Linux系统centOS7在虚拟机下的安装

&nbsp;

### 准备工作

【系统下载】

　　在安装centOS7之前，首先在[官网](http://isoredirect.centos.org/centos/7/isos/x86_64/CentOS-7-x86_64-DVD-1708.iso)下载合适的版本

![linux_centos1](https://pic.xiaohuochai.site/blog/linux_centos1.png)


　　然后，选择一个链接下载即可

【虚拟机配置】

　　接下来，需要对虚拟机进行配置

　　1、新建虚拟机

　　打开虚拟机VMware后，点击新建虚拟机

![linux_centos2](https://pic.xiaohuochai.site/blog/linux_centos2.png)

　　2、典型配置

　　出现如下画面后，选择典型，单击下一步

![linux_centos3](https://pic.xiaohuochai.site/blog/linux_centos3.png)


　　3、创建空白硬盘

　　选择&ldquo;稍后安装操作系统&rdquo;，点击&ldquo;下一步&rdquo;

![linux_centos4](https://pic.xiaohuochai.site/blog/linux_centos4.png)


　　4、选择操作系统版本

　　&ldquo;客户机操作系统&rdquo;选择&ldquo;Linux&rdquo;，&ldquo;版本&rdquo;选择&ldquo;CentOS 64位&rdquo;，然后点击&ldquo;下一步&rdquo;

![linux_centos5](https://pic.xiaohuochai.site/blog/linux_centos5.png)


　　5、安装位置

　　输入自定义的&ldquo;虚拟机名称&rdquo;，点击&ldquo;浏览&rdquo;按钮，选择虚拟机文件保存的位置，点击&ldquo;下一步&rdquo;

![linux_centos6](https://pic.xiaohuochai.site/blog/linux_centos6.png)


　　6、磁盘容量

　　设置最大磁盘容量为20G，并设置将磁盘拆分为多个文件，点击&ldquo;下一步&rdquo;

![linux_centos7](https://pic.xiaohuochai.site/blog/linux_centos7.png)


　　7、自定义硬件

　　出现如下界面后，点击自定义硬件，来配置硬件

![linux_centos8](https://pic.xiaohuochai.site/blog/linux_centos8.png)


　　8、网卡设置

　　将选项卡切换到网络适配器，将网络模式设置为桥接模式，并勾选复制物理网络连接状态

![linux_centos9](https://pic.xiaohuochai.site/blog/linux_centos9.png)


　　9、ISO设置

　　将选项卡切换到CD/DVD(IDE)，选择使用ISO映像文件，找到下载的ISO文件地址

![linux_centos10](https://pic.xiaohuochai.site/blog/linux_centos10.png)


　　10、点击完成即可

&nbsp;

### 系统安装

　　1、开启虚拟机电源

　　点击开启此虚拟机按钮

![linux_centos11](https://pic.xiaohuochai.site/blog/linux_centos11.png)


　　2、选择安装

　　鼠标移动到虚拟机显示的区域，等鼠标变成手形时点击左键，使虚拟机获得焦点。使用键盘的上下箭头按钮，选择&ldquo;Install CentOS 7&rdquo;选项，字体颜色为白色为选中，按回车键进行安装

![linux_centos12](https://pic.xiaohuochai.site/blog/linux_centos12.png)


　　3、语言选择

　　接下来会显示语言选择界面，选择简体中文，并点击继续

![linux_centos13](https://pic.xiaohuochai.site/blog/linux_centos13.png)


　　4、安装信息

　　接下来，进入安装信息摘要界面，点击软件选择

![linux_centos14](https://pic.xiaohuochai.site/blog/linux_centos14.png)


　　5、软件选择

　　如果用于云服务器的配置，最好选择基础设施服务器，点击完成

![linux_centos15](https://pic.xiaohuochai.site/blog/linux_centos15.png)


　　6、安装位置

　　回到安装信息摘要界面，点击安装位置

![linux_centos16](https://pic.xiaohuochai.site/blog/linux_centos16.png)


　　7、自动分区

　　选择本地标准磁盘，并选择自动分区，点击完成

![linux_centos17](https://pic.xiaohuochai.site/blog/linux_centos17.png)


　　8、网络和主机名

　　回到安装信息摘要界面，点击网络和主机名

![linux_centos18](https://pic.xiaohuochai.site/blog/linux_centos18.png)


　　9、网络配置

　　将网络从关闭切换为打开后，点击完成

![linux_centos19](https://pic.xiaohuochai.site/blog/linux_centos19.png)


　　10、开始安装

　　回到安装信息摘要界面后，点击开始安装即可

![linux_centos20](https://pic.xiaohuochai.site/blog/linux_centos20.png)


　　11、用户设置

　　进入用户设置界面，ROOT密码不能立即设置，需要等到底部安装条进度完成时才可以

![linux_centos21](https://pic.xiaohuochai.site/blog/linux_centos21.png)


　　12、ROOT密码

　　点击ROOT密码进入ROOT密码界面，输入密码后，点击完成

![linux_centos22](https://pic.xiaohuochai.site/blog/linux_centos22.png)


　　13、自动安装

　　返回该界面后，耐心等待系统的安装

![linux_centos23](https://pic.xiaohuochai.site/blog/linux_centos23.png)


　　12、安装完成

　　安装完成后，出现如下界面，点击重启

![linux_centos24](https://pic.xiaohuochai.site/blog/linux_centos24.png)


　　13、自动进入

　　重启后，会出现两个操作系统供选择，可以选择第一项，也可以等待一段时间后，自动进入第一项。

![linux_centos25](https://pic.xiaohuochai.site/blog/linux_centos25.png)


　　14、输入用户名、密码

　　进入后，输入用户名、密码。用户名为root，密码为自己设置的密码

![linux_centos26](https://pic.xiaohuochai.site/blog/linux_centos26.png)


　　　15、输入ifconfig来查看该Linux所在主机的IP地址。

![linux_centos27](https://pic.xiaohuochai.site/blog/linux_centos27.png)


　　至此，Linux系统安装完成，也可以正常上网

&nbsp;

### XShell配置

　　接下来，进行xshell的配置，通过xshell来远程连接该主机。由于xshell软件安装较简单，此处就不再赘述

　　1、打开软件后，点击文件下的新建，来新建连接

![linux_centos28](https://pic.xiaohuochai.site/blog/linux_centos28.png)


　　2、配置

　　名称为自定义的名称，主机地址输入Linux系统下通过ifconfig获得的IP地址，端口号保持22，点击确定

![linux_centos29](https://pic.xiaohuochai.site/blog/linux_centos29.png)


　　3、连接

　　然后，出现如下窗口，选中刚才新建的会话名称，点击连接

![linux_centos30](https://pic.xiaohuochai.site/blog/linux_centos30.png)


　　4、输入用户名root

![linux_centos31](https://pic.xiaohuochai.site/blog/linux_centos31.png)


　　5、输入密码

![linux_centos32](https://pic.xiaohuochai.site/blog/linux_centos32.png)


　　6、连接成功后，出现如下界面

![linux_centos33](https://pic.xiaohuochai.site/blog/linux_centos33.png)


　　这样，就可以通过Xshell软件来对服务器进行远程操作了

&nbsp;

### 常见问题

　　问题：centOS7使用setup没有网络配置选项

　　解释：centOS 7里面，setup已经没有网络设置的功能了。要进行网络配置非常简单，在安装界面已经有过截图，只要将网络连接从关闭切换到开启即可

![linux_centos34](https://pic.xiaohuochai.site/blog/linux_centos34.png)


　　当然，也可以通过nmtui来安装

　　1、使用nmtui命令，进入网络配置

![linux_centos35](https://pic.xiaohuochai.site/blog/linux_centos35.png)


　　2、根据界面，点编辑，进入

![linux_centos36](https://pic.xiaohuochai.site/blog/linux_centos36.png)


　　3、设置为自动获取

![linux_centos37](https://pic.xiaohuochai.site/blog/linux_centos37.png)


　　4、点击back回到网络编辑界面，然后激活这个链接

![linux_centos38](https://pic.xiaohuochai.site/blog/linux_centos38.png)


