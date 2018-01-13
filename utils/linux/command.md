# Linux常用命令

　　自以为前端工程师可能用不到Linux命令。但在学习Git时，发现除了Git命令，还有好多是需要Linux命令来配合的。所以，Linux命令需要系统的学习并进行总结，本文将详细介绍Linux常用命令

&nbsp;

### 特殊字符

　　特殊字符对shell具有特殊含义，不要把它们当作普通字符使用。某些特殊字符用于[正则表达式](http://www.cnblogs.com/xiaohuochai/p/5608807.html)匹配

<div class="cnblogs_code">
<pre>&amp; ; | * ? ' " ` [ ] ( ) $ &lt; &gt; { } # / \ ! ~</pre>
</div>

**空白符**

　　尽管RETURN、SPACE、TAB都不是特殊字符，但它们对shell具有特殊含义

　　RETURN键通常用于结束命令行并开始命令的执行

　　SPACE键和TAB键则用作命令行上的分隔符

**转义字符**

　　要将特殊字符当作普通字符使用，可对它们转义引用

![linux_com1](https://pic.xiaohuochai.site/blog/linux_com1.png)

　　[注意]斜杠(/)无法被转义，它总是表示路径名中的分隔符

　　在特殊字符前加反斜杠(\)即可将将、特殊字符转义。要将连续的两个或多个特殊字符转义，必须在每个字符前面加一个反斜杠(\)

　　另一种将特殊字符转义的方法是使用单引号将它们引起来('**')，也可以将特殊字符和普通字符一起用一对单引号引起来

![linux_com2](https://pic.xiaohuochai.site/blog/linux_com2.png)

【echo】

<div class="cnblogs_code">
<pre>echo [选项] [输出内容]
选项：
　　-e: 支持反斜线控制的字符转换</pre>
</div>

**管道符**

【多命令顺序执行】

![linux_com3](https://pic.xiaohuochai.site/blog/linux_com3.png)

【管道符】

<div class="cnblogs_code">
<pre>命令1 | 命令2
#命令1的正确输出作为命令2的操作对象</pre>
</div>

![linux_com4](https://pic.xiaohuochai.site/blog/linux_com4.png)

![linux_com5](https://pic.xiaohuochai.site/blog/linux_com5.png)

**通配符**

![linux_com6](https://pic.xiaohuochai.site/blog/linux_com6.png)

**其他特殊符号**

![linux_com7](https://pic.xiaohuochai.site/blog/linux_com7.png)

&nbsp;&nbsp;

### 目录相关

**显示目录路径**

【pwd】 显示当前目录

　　[注意]如果使用Windows系统，为了避免遇到各种莫名其妙的问题，请确保目录名(包括父目录)不包含中文

![linux_com8](https://pic.xiaohuochai.site/blog/linux_com8.png)

**切换目录**

【cd】 切换到另一个工作目录，参数direction为要指定为新工作目录的目录路径名

<div class="cnblogs_code">
<pre>cd [options] [direction]</pre>
</div>

![linux_com9](https://pic.xiaohuochai.site/blog/linux_com9.png)

　　如果不带任何参数，或使用波浪号(~)，切换到主目录

![linux_com10](https://pic.xiaohuochai.site/blog/linux_com10.png)

　　使用连字符(-)来切换到前一次的工作目录

　　使用点(.)表示当前目录

　　使用双句点(..)来返回到当前目录下的上一级目录

　　[注意]cd和符号之间一定要有空格，否则会提示未找到命令

![linux_com11](https://pic.xiaohuochai.site/blog/linux_com11.png)

**创建目录**

【mkdir】创建目录，如果已经存在同名目录，则无法创建成功

<div class="cnblogs_code">
<pre>mkdir [option] directory-list</pre>
</div>

　[注意]如果存在-p命令，则为递归创建

　　下面代码中，先创建了test目录，然后在test目录下，创建了abc目录

<div class="cnblogs_code">
<pre>mkdir -p test/abc</pre>
</div>

**删除目录**

【rmdir】删除目录，如果不是空目录，则无法删除成功

<div class="cnblogs_code">
<pre>rmdir directory-list</pre>
</div>

![linux_com12](https://pic.xiaohuochai.site/blog/linux_com12.png)

【rm -rf】删除目录及目录里的文件

　　[注意]如果使用"rm -rf /"，会删除所有文件

&nbsp;

### 文件相关

**显示所有文件**

【ls】 类似于dos下的dir命令，用于显示一个或多个文件的相关信息

　　默认情况下，ls按照文件名的字母顺序列出文件的信息

<div class="cnblogs_code">
<pre>ls [options] [file-list]</pre>
</div>

　　options有很多选项，常用选项如下

<div class="cnblogs_code">
<pre>ls &ndash;a 显示所有文件，包括隐藏文件
ls &ndash;F 在文件的后面添加表示文件类型的符号。*表示可执行，/表示目录，@表示连结文件
ls &ndash;l 列出每个文件更详细的信息
ls -ld 查看当前目录属性
ls -lh 文件大小以K为单位
ls -R 递归地列出子目录的内容
ls -t 按最后一次修改时间的顺序显示文件
ls -i 显示iNode号</pre>
</div>

　　[注意]ls -l命令可以简写成ll命令

![linux_com13](https://pic.xiaohuochai.site/blog/linux_com13.png)

　　file-list包含目录时，ls将显示该目录的内容

<div class="cnblogs_code">
<pre>ls mygit 显示mygit目录下的文件
ls g* 显示所有以g字母开头的文件</pre>
</div>

![linux_com14](https://pic.xiaohuochai.site/blog/linux_com14.png)

**显示文件内容**

【cat】 显示文本文件的内容，类似于dos下的type命令

<div class="cnblogs_code">
<pre>cat [options] [direction]</pre>
</div>
<div class="cnblogs_code">
<pre>cat file1 显示file1文件内容
cat file1 file2 依次显示file1,file2的内容
cat file1 file2 &gt; file3 把file1,file2的内容结合起来，再重定向(&gt;)到file3文件中</pre>
</div>

　　"&gt;"是右重定向符，表示将左边命令结果当成右边命令的输入。如果右侧文件是一个已存在文件，其原有内容将会被清空，而变成左侧命令输出内容。如果希望以追加方式写入，请改用"&gt;&gt;"重定向符

![linux_com15](https://pic.xiaohuochai.site/blog/linux_com15.png)

**重写文件**

　　如果"&gt;"左边没有指定文件，如： cat &gt;file1，将会等用户输入，输入完毕后再按[Ctrl]+[d]，就会将用户的输入内容写入file1

![linux_com16](https://pic.xiaohuochai.site/blog/linux_com16.png)

**删除文件**

【rm】 删除文件，与dos下的del/erase命令相似

<div class="cnblogs_code">
<pre>rm [options] file-list</pre>
</div>

　　options有很多选项，常用选项如下

<div class="cnblogs_code">
<pre>rm &ndash;i 系统在删除文件之前会先询问确认，用户回复y或Y之后，文件才会真的被删除
rm &ndash;r 递归删除指定目录的内容，包含所有子目录和目录自身
rm &ndash;f 和-i参数相反，-f表示强制删除
rm -v 显示被删除的每个文件的文件名</pre>
</div>

![linux_com17](https://pic.xiaohuochai.site/blog/linux_com17.png)

**复制文件**

【cp】 复制文件

<div class="cnblogs_code">
<pre>cp [options] source-file destination-file
cp [options] source-file-list destination-directory</pre>
</div>

　　使用cp命令可以生成一个文件的一个副本

![linux_com18](https://pic.xiaohuochai.site/blog/linux_com18.png)

　　使用cp命令也可以把一个或者多个文件复制到某个目录

![linux_com19](https://pic.xiaohuochai.site/blog/linux_com19.png)

![linux_com20](https://pic.xiaohuochai.site/blog/linux_com20.png)

　　cp -R 递归地复制包含普通文件的目录层次结构

![linux_com21](https://pic.xiaohuochai.site/blog/linux_com21.png)

[注意]如果使用ls -a命令，则不仅文件内容，所有的文件属性也相同，如文件创建时间等

**移动文件或重命名**

【mv】重命名或移动文件

<div class="cnblogs_code">
<pre>mv [options] existing-file new-filename
mv [options] existing-file-list direction
mv [options] existing-direction new-direction</pre>
</div>

　　使用mv命令可以重命名文件

![linux_com22](https://pic.xiaohuochai.site/blog/linux_com22.png)

　　使用mv命令可以将一个文件移动到另一个目录

![linux_com23](https://pic.xiaohuochai.site/blog/linux_com23.png)

　　使用mv命令可以将一个文件移动到另一个目录，并改名

![linux_com24](https://pic.xiaohuochai.site/blog/linux_com24.png)

　　使用mv命令也可以移动目录

![linux_com25](https://pic.xiaohuochai.site/blog/linux_com25.png)

**新建文件**

【touch】 新建文件，或改变文件的访问和修改时间

<div class="cnblogs_code">
<pre>touch [options] file-list</pre>
</div>

　　同名文件不存在时，touch用于新建文件

![linux_com26](https://pic.xiaohuochai.site/blog/linux_com26.png)

　　同名文件存在时，touch用于修改文件的访问和修改时间

![linux_com27](https://pic.xiaohuochai.site/blog/linux_com27.png)

&nbsp;

### 文件链接

　　通过ln命令来生成链接文件，-s选项表示生成软链接，没有选项则表示生成硬链接

<div class="cnblogs_code">
<pre>ln -s [原文件] [目标文件]</pre>
</div>

　　硬链接包括以下特征：

　　1、拥有相同的i节点和存储block块，可以看做是同一个文件

　　2、可通过i节点识别

　　3、不能跨分区

　　4、不能针对目录使用

　　软链接包含以下特征：

　　1、类似windows快捷方式

　　2、软链接拥有自己的I节点和Block块，但是数据块中只保存原文件的文件名和I节点号，并没有实际的文件数据

　　3、修改任意文件，另一个都改变

　　4、删除原文件，软链接不能使用

　　5、软链接文件权限都为rwxrwxrwx

　　6、软链接的原文件一定要写绝对路径

&nbsp;

### 文件搜索

【locate】

　　该命令搜索速度非常快，因为其在后台数据库中按文件名搜索，格式如下

<div class="cnblogs_code">
<pre>locate 文件名</pre>
</div>

　　后台数据库的地址如下

<div class="cnblogs_code">
<pre>/var/lib/mlocate</pre>
</div>

　　后台数据库一般1天更新一次，所以当天新建的文件不会被放到数据库中，但可以通过updatadb命令来强制更新数据库

<div class="cnblogs_code">
<pre>updatedb</pre>
</div>

　　locate命令的缺点是只可以按照文件名来搜索

　　locate是按照/etc/updatedb.conf配置文件来搜索的

<div class="cnblogs_code">
<pre>PRUNE_BIND_MOUNTS = "yes" #开启搜索限制
PRUNEFS =  #搜索时，不搜索的文件系统
PRUNENAMES = #搜索时，不搜索的文件类型
PRUNEPATHS = #搜索时，不搜索的路径</pre>
</div>

**命令搜索**

【whereis】

　　搜索该命令的所在路径及帮助文档所在位置

![linux_com28](https://pic.xiaohuochai.site/blog/linux_com28.png)

<div class="cnblogs_code">
<pre>-b 只查找可执行文件
-m 只查找帮助文件</pre>
</div>

【which】

　　搜索命令的所在路径及可能存在的别名

![linux_com29](https://pic.xiaohuochai.site/blog/linux_com29.png)

【PATH环境变量】

　　PATH环境变量定义的是系统搜索命令的路径

![linux_com30](https://pic.xiaohuochai.site/blog/linux_com30.png)

【find】

　　在Linux中，最强大的搜索命令是find命令，该命令会把所有文件都搜索一遍

<div class="cnblogs_code">
<pre>find [搜索范围] [搜索条件]
#搜索文件
find / -name install.log
#避免大范围搜索，会非常耗费系统资源
#find是在系统之中搜索符合条件的文件名</pre>
</div>
<div>　　如果要模糊匹配，需要使用通配符匹配，通配符是完全匹配</div>
<div class="cnblogs_code">
<pre>find /root -iname install.log
#不区分大小写
find /root -user root
#按照所有者搜索
find /root -nouser
#查找没有所有者的文件</pre>
</div>
<div class="cnblogs_code">
<pre>find /var/log -mtime +10
#查找10天前修改的文件
-10 10天内修改的文件
10 第10天修改的文件
+10 10天前修改的文件
atime 文件访问时间
ctime 改变文件属性
mtime 修改文件内容</pre>
</div>
<div class="cnblogs_code">
<pre>find . -size 25k
#查找文件大小是25KB的文件
-25K 小于25KB的文件
25K 等于25KB的文件
+25K 大于25KB的文件
find . -inum 262422
#查找i节点是262422的文件</pre>
</div>
<div class="cnblogs_code">
<pre>find /etc -size +20K -a -size -50K
#查找/etc/目录下，大于20KB并且小于50KB的文件
-a and 逻辑与，两个条件都满足
-o or 逻辑或，两个条件满足一个即可
find /etc -size +20K -a -size -50K -exec ls -lh {} \;
#查找/etc/目录下，大于20KB并且小于50KB的文件，并显示详细信息
#-exec/-ok 命令{} \; 对搜索结果执行操作</pre>
</div>

【grep】

　　该命令是搜索字符串的命令

<div class="cnblogs_code">
<pre>grep [选项] 字符串 文件名
#在文件当中匹配符合条件的字符串
-i 忽略大小写
-v 排除指定字符串</pre>
</div>

　　find命令是在系统当中探索符合条件的文件名，如果需要匹配，使用通配符匹配，通配符是完全匹配

　　grep命令是在文件当中搜索符合条件的字符串，如果需要匹配，使用正则表达式进行匹配，正则表达式是包含匹配

&nbsp;

### 文件比较

【cmp】 逐字节地比较两个文件，如果两个文件相同，则cmp不显示任何内容；否则，cmp将显示第1个不同处对应的字节数和行号

<div class="cnblogs_code">
<pre>cmp [options] file1 [file2 [skip1 [skip2]]]</pre>
</div>

![linux_com31](https://pic.xiaohuochai.site/blog/linux_com31.png)

**显示不同**

【diff】 按行显示两个文本文件的不同。默认情况下，可以按照diff显示的不同来编辑其中的一个文件，使之与另一个文件相同

<div class="cnblogs_code">
<pre>diff [options] file1 file2
diff [options] file1 directory
diff [options] directory file2
diff [options] directory1 directory2</pre>
</div>

　　file1和file2为diff要比较的普通文本文件的路径名。当file2被directory参数替换时，diff将在directory目录下查找与file1同名的文件；类似地，当file1被directory替换，diff将在directory目录下查找与file2同名的文件；当指定两个目录参数时，diff将比较directory1目录下与directory2目录下具有相同的简单文件名的两个文件

![linux_com32](https://pic.xiaohuochai.site/blog/linux_com32.png)

　　1c1表示更改a.txt的第1行，使之与b.txt的第一行相同

**统计**

【wc】 显示行数、单词数和字节数

<div class="cnblogs_code">
<pre>wc [options] [file-list]</pre>
</div>

![linux_com33](https://pic.xiaohuochai.site/blog/linux_com33.png)

&nbsp;

### 帮助命令

【man】

<div class="cnblogs_code">
<pre>man 命令
#获取指定命令的帮助
man ls
#查看ls的帮助</pre>
</div>

**man级别**

<div class="cnblogs_code">
<pre>1：查看命令帮助
2：查看可被内核调用的函数的邦族
3：查看函数和函数库的帮助
4：查看特殊文件的帮助(主要是/dev目录下的文件)
5：查看配置文件的帮助
6：查看游戏的帮助
7：查看其他杂项
8：查看系统管理员可用的命令帮助
9：查看和内核相关的文件帮助</pre>
</div>
<div class="cnblogs_code">
<pre>man -f 命令
相当于
whatis 命令</pre>
</div>

![linux_com34](https://pic.xiaohuochai.site/blog/linux_com34.png)

【help】

<div class="cnblogs_code">
<pre>命令 --help
#获取命令选项的帮助</pre>
</div>
<div class="cnblogs_code">
<pre>help shell内部命令
#获取shell内部命令的帮助</pre>
</div>
<div class="cnblogs_code">
<pre>whereis cd
#确定是否是shell内部命令
help cd
#获取内部命令帮助</pre>
</div>

【info】

<div class="cnblogs_code">
<pre>info 命令
-回车 进入子帮助页面(带有*号标记)
-u 进入上层页面
-n 进入下一个帮助小节
-p 进入上一个帮助小节
-q 退出</pre>
</div>

&nbsp;

### 压缩命令

　　5种常用的压缩格式: .zip .gz .bz2 .tar.gz .tar.bz2

【zip】

<div class="cnblogs_code">
<pre>zip 压缩文件名 源文件
#压缩文件

zip -r 压缩文件名 源目录
#压缩目录

upzip 压缩文件
#解压缩.zip文件</pre>
</div>

【gz】

　　可在windows中解压缩，但是windows中的rar格式不能在Linux中解压

<div class="cnblogs_code">
<pre>gzip 源文件
#压缩为.gz格式的压缩文件，源文件会消失
gzip -c 源文件 &gt; 压缩文件 
#利用&gt;输出重定向，将源文件保留（没有太大的意义）
gzip -r 目录
#压缩目录下所有的子文件，但是不能压缩目录
gzip -d 压缩文件
#解压缩
gunzip 压缩文件
#解压缩</pre>
</div>

【bz2】

<div class="cnblogs_code">
<pre>bzip2 源文件
#压缩为.bz2格式，不保留源文件
bzip2 -k 源文件
#压缩之后保留源文件
bzip2 -d 压缩文件
#解压缩，-k保留压缩文件
bunzip2 压缩文件
#解压缩，-k保留压缩文件</pre>
</div>

　　[注意]bzip2命令不能压缩目录

【tar】

<div class="cnblogs_code">
<pre>tar -cvf 打包文件名 源文件
选项：
-c 打包
-v 显示过程
-f 指定打包后的文件名</pre>
</div>
<div class="cnblogs_code">
<pre>tar -xvf 打包文件名
选项：
    -x: 解打包</pre>
</div>

　　其实，.tar.gz格式是先打包为.tar格式，再压缩为.gz格式

<div class="cnblogs_code">
<pre>tar -zcvf 压缩包名.tar.gz 源文件
选项：
    -z: 压缩为.tar.gz格式
tar -zxvf 压缩包名.tar.gz
选项：
    -x: 解压缩.tar.gz格式</pre>
</div>
<div class="cnblogs_code">
<pre>tar -jcvf 压缩包名.tar.bz2 源文件
选项：
    -z: 压缩为.tar.bz2格式
tar -jxvf 压缩包名.tar.bz2
选项：
    -x: 解压缩.tar.bz2格式</pre>
</div>

【tar.xz】

　　对于tar.xz文件来说，解压缩命令如下所示

<div class="cnblogs_code">
<pre>$xz -d ***.tar.xz
$tar -xvf  ***.tar</pre>
</div>

【tgz】

　　对于taz文件来说，解压缩命令如下所示

<div class="cnblogs_code">
<pre>$tar -zxvf  ***.tgz</pre>
</div>

&nbsp;

### 挂载命令

　　挂载就是指分配盘符

【查询与自动挂载】

<div class="cnblogs_code">
<pre>mount
#查询系统中已经挂载的设备

mount -a
#依据配置文件/etc/fstab的内容，自动挂载</pre>
</div>

【挂载命令格式】

<div class="cnblogs_code">
<pre>mount [-t 文件系统] [-o 特殊选项] 设备文件名 挂载点
选项：
-t 文件系统： 加入文件系统类型来指定挂载的类型，可以ext3、ext4、iso9660等文件系统
-o 特殊选项： 可以指定挂载的额外选项</pre>
</div>

![linux_com35](https://pic.xiaohuochai.site/blog/linux_com35.png)

【挂载光盘】

<div class="cnblogs_code">
<pre>mkdir /mnt/cdrom/
#建立挂载点

mount -t iso9660 /dev/cdrom /mnt/cdrom/
#挂载光盘

mount /dev/sr0 /mnt/cdrom/</pre>
</div>

&nbsp;【卸载光盘】

<div class="cnblogs_code">
<pre>umount 设备名或挂载点

umount /mnt/cdrom</pre>
</div>

【U盘挂载】

<div class="cnblogs_code">
<pre>fdist -l
#查看U盘设备文件名
mount -t vfat /dev/sdb1 /mnt/usb/</pre>
</div>

　　[注意]Linux默认是不支持NTFS文件系统的

&nbsp;

### 别名

【alias】

<div class="cnblogs_code">
<pre>alias
#查看系统中所有的命令别名
alias 别名= '原命令'
#设定命令别名</pre>
</div>

![linux_com36](https://pic.xiaohuochai.site/blog/linux_com36.png)

　　&nbsp;一般地，别名在用户注销或重新登录时就会失效。如果在长期使用，则需要将其写入环境变量配置文件中

<div class="cnblogs_code">
<pre>vi ~/.bashrc
#写入环境变量配置文件

unallias 别名
#删除别名</pre>
</div>

　　[注意]如果要彻底删除别名，需要修改配置文件

【命令生效顺序】

　　1、执行用绝对路径或相对路径执行的命令

　　2、执行别名

　　3、执行bash的内部命令

　　4、执行按照$PASH环境变量定义的目录查找顺序找到的第一个命令

&nbsp;

### 历史命令

【history】

<div class="cnblogs_code">
<pre>history [选项] [历史命令保存文件]
选项：
    -c: 清空历史命令
    -w: 把缓存中的历史命令写入历史命令保存文件~/.bash_history</pre>
</div>

【历史命令的调用】

　　使用上下箭头调用以前的历史命令

　　使用"!n"重复执行第n条历史命令

　　使用"!!"重复执行上一条命令

　　使用"!字串"重复执行最后一条以该字串开头的命令

&nbsp;

### 快捷键

<div class="cnblogs_code">
<pre>ctrl+l 清屏
ctrl+c 强制终止当前命令
ctrl+a 光标移动到命令行首
ctrl+e 光标移动到命令行尾
ctrl+u 从光标所在位置删除到行首
ctrl+z 把命令放入后台
ctrl+r 在历史命令中搜索
一次tab 补全
两次tab 提示
shift+pageup 向上翻页
shift+pagedown 向下翻页</pre>
</div>

