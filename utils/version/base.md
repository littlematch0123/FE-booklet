# Git基础

&emsp;&emsp;前面我们介绍了[版本管理](http://www.cnblogs.com/xiaohuochai/p/6650538.html)，当前最流行的版本控制系统当属Git。Git是一个免费开源的分布式版本控制系统(DVCS)。从本文开始，将详细介绍Git的相关内容。本文是Git系列第一篇&mdash;&mdash;Git基础

&nbsp;

### 历史

&emsp;&emsp;Git诞生于一个极富纷争大举创新的年代。Linux内核开源项目有着为数众广的参与者。绝大多数的Linux内核维护工作都花在了提交补丁和保存归档的繁琐事务上(1991－2002年间)。到2002年，整个项目组开始启用分布式版本控制系统BitKeeper来管理和维护代码

&emsp;&emsp;到了2005年，开发BitKeeper的商业公司同Linux内核开源社区的合作关系结束，他们收回了免费使用BitKeeper的权力。这就迫使Linux开源社区(特别是Linux的缔造者Linus Torvalds)不得不吸取教训，只有开发一套属于自己的版本控制系统才不至于重蹈覆辙

&emsp;&emsp;自诞生于2005年以来，Git日臻成熟完善，在高度易用的同时，仍然保留着初期设定的目标。它的速度飞快，极其适合管理大项目，它还有着令人难以置信的非线性分支管理系统，可以应付各种复杂的项目开发需求

&nbsp;

### 优势

&emsp;&emsp;Git有如下优势

&emsp;&emsp;1、速度

&emsp;&emsp;2、设计简单

&emsp;&emsp;3、轻量级的分支操作，允许上千个并行开发的分支，对非线性开发模式的强力支持

&emsp;&emsp;4、有能力高效管理类似Linux内核一样的超大规模项目

&emsp;&emsp;5、Git已经成为事实上的标准，几乎所有优秀的前端项目都通过Git来进行版本控制

&emsp;&emsp;6、社区成熟活跃，git的流行离不开github的贡献

&nbsp;

### 基础

&emsp;&emsp;接下来，介绍Git的基础内容

**直接记录快照，而非差异比较**

&emsp;&emsp;Git和其他版本控制系统的主要差别在于，Git只关心文件数据的整体是否发生变化，而大多数其他系统则只关心文件内容的具体差异。这类系统(CVS，Subversion，Perforce，Bazaar 等等)每次记录有哪些文件作了更新，以及都更新了哪些行的什么内容

![git_base1](https://pic.xiaohuochai.site/blog/git_base1.png)

&emsp;&emsp;Git并不保存这些前后变化的差异数据。实际上，Git 更像是把变化的文件作快照后，记录在一个微型的文件系统中。每次提交更新时，它会纵览一遍所有文件的指纹信息并对文件作一快照，然后保存一个指向这次快照的索引。为提高性能，若文件没有变化，Git不会再次保存，而只对上次保存的快照作一链接。Git工作方式如下所示

![git_base2](https://pic.xiaohuochai.site/blog/git_base2.png)

&emsp;&emsp;这是Git同其他系统的重要区别。它完全颠覆了传统版本控制的套路，并对各个环节的实现方式作了新的设计。Git更像是个小型的文件系统，但它同时还提供了许多以此为基础的超强工具，而不只是一个简单的VCS

**近乎所有操作都是本地执行**

&emsp;&emsp;在Git中的绝大多数操作都只需要访问本地文件和资源，不用连网。但如果用CVCS的话，差不多所有操作都需要连接网络。因为Git在本地磁盘上就保存着所有当前项目的历史更新，所以处理起来速度飞快。

&emsp;&emsp;举个例子，如果要浏览项目的历史更新摘要，Git不用跑到外面的服务器上去取数据回来，而直接从本地数据库读取。所以任何时候都可以马上翻阅，无需等待。如果想要看当前版本的文件和一个月前的版本之间有何差异，Git会取出一个月前的快照和当前文件作一次差异运算，而不用请求远程服务器来做这件事，或是把老版本的文件拉到本地来作比较

&emsp;&emsp;用CVCS的话，没有网络或者断开VPN你就无法做任何事情。但用Git的话，就算在飞机或者火车上，都可以非常愉快地频繁提交更新，等到了有网络的时候再上传到远程仓库。同样，在回家的路上，不用连接VPN也可以继续工作。换作其他版本控制系统，这么做几乎不可能，抑或非常麻烦。比如Perforce，如果不连到服务器，几乎什么都做不了；如果是Subversion或CVS，虽然可以编辑文件，但无法提交更新，因为数据库在网络上。看上去好像这些都不是什么大问题，但实际体验过之后，这其实是会带来很大不同的

**时刻保持数据完整性**

&emsp;&emsp;在保存到Git之前，所有数据都要进行内容的校验和(checksum)计算，并将此结果作为数据的唯一标识和索引。换句话说，不可能在修改了文件或目录之后，Git一无所知。这项特性作为Git的设计哲学，建在整体架构的最底层。所以如果文件在传输时变得不完整，或者磁盘损坏导致文件数据缺失，Git都能立即察觉

&emsp;&emsp;Git使用SHA-1算法计算数据的校验和，通过对文件的内容或目录的结构计算出一个SHA-1哈希值，作为指纹字符串。该字串由40个十六进制字符(0-9及a-f)组成，看起来就像是：

<div>
<pre>24b9da6552252987aa493b52f8696cd6d3b00373</pre>
</div>

&emsp;&emsp;Git的工作完全依赖于这类指纹字串，所以会经常看到这样的哈希值。实际上，所有保存在Git数据库中的东西都是用此哈希值来作索引的，而不是靠文件名

**多数操作仅添加数据**

&emsp;&emsp;常用的Git操作大多仅仅是把数据添加到数据库。因为任何一种不可逆的操作，比如删除数据，都会使回退或重现历史版本变得困难重重。在别的VCS中，若还未提交更新，就有可能丢失或者混淆一些修改的内容，但在Git里，一旦提交快照之后就完全不用担心丢失数据，特别是养成定期推送到其他仓库的习惯的话

&emsp;&emsp;这种高可靠性令我们的开发工作安心不少，尽管去做各种试验性的尝试好了，再怎样也不会弄丢数据

**文件的三种状态**

&emsp;&emsp;对于任何一个文件，在Git内都只有三种状态：已提交(committed)，已修改(modified)和已暂存(staged)。已提交表示该文件已经被安全地保存在本地数据库中了；已修改表示修改了某个文件，但还没有提交保存；已暂存表示把已修改的文件放在下次提交时要保存的清单中

&emsp;&emsp;由此我们看到Git管理项目时，文件流转的三个工作区域：Git的工作目录，暂存区域，以及本地仓库

![git_base3](https://pic.xiaohuochai.site/blog/git_base3.png)

&emsp;&emsp;每个项目都有一个Git目录(如果git clone出来的话，就是其中.git的目录；如果git clone --bare的话，新建的目录本身就是Git目录)，它是Git用来保存元数据和对象数据库的地方。该目录非常重要，每次克隆镜像仓库的时候，实际拷贝的就是这个目录里面的数据

&emsp;&emsp;从项目中取出某个版本的所有文件和目录，用以开始后续工作的叫做工作目录。这些文件实际上都是从Git目录中的压缩对象数据库中提取出来的，接下来就可以在工作目录中对这些文件进行编辑

&emsp;&emsp;所谓的暂存区域只不过是个简单的文件，一般都放在Git目录中。有时候人们会把这个文件叫做索引文件，不过标准说法还是叫暂存区域

&emsp;&emsp;基本的Git工作流程如下：

&emsp;&emsp;1、在工作目录中修改某些文件

&emsp;&emsp;2、对修改后的文件进行快照，然后保存到暂存区域

&emsp;&emsp;3、提交更新，将保存在暂存区域的文件快照永久转储到Git目录中

&emsp;&emsp;所以，我们可以从文件所处的位置来判断状态：如果是Git目录中保存着的特定版本文件，就属于已提交状态；如果作了修改并已放入暂存区域，就属于已暂存状态；如果自上次取出后，作了修改但还没有放到暂存区域，就是已修改状态

&nbsp;

### 安装

&emsp;&emsp;Git主要有两种安装方式：一种是通过编译源代码来安装；另一种是使用为特定平台预编译好的安装包

**从源代码安装**

&emsp;&emsp;若是条件允许，从源代码安装有很多好处，至少可以安装最新的版本。Git的每个版本都在不断尝试改进用户体验，所以能通过源代码自己编译安装最新版本就再好不过了

&emsp;&emsp;Git的工作需要调用curl，zlib，openssl，expat，libiconv等库的代码，所以需要先安装这些依赖工具。在有yum的系统上(比如Fedora)或者有apt-get的系统上(比如Debian体系)，可以用下面的命令安装：

<div>
<pre>$ yum install curl-devel expat-devel gettext-devel \
  openssl-devel zlib-devel
$ apt-get install libcurl4-gnutls-dev libexpat1-dev gettext \
  libz-dev libssl-dev</pre>
</div>

&emsp;&emsp;之后，从下面的Git官方站点下载最新版本源代码：

<div>
<pre>http://git-scm.com/download</pre>
</div>

&emsp;&emsp;然后编译并安装：

<div>
<pre>$ tar -zxf git-1.7.2.2.tar.gz
$ cd git-1.7.2.2
$ make prefix=/usr/local all
$ sudo make prefix=/usr/local install</pre>
</div>

&emsp;&emsp;现在已经可以用git命令了，用git把Git项目仓库克隆到本地，以便日后随时更新：

<div>
<pre>$ git clone git://git.kernel.org/pub/scm/git/git.git</pre>
</div>

**在Linux上安装**

&emsp;&emsp;如果在Linux上安装预编译好的Git二进制安装包，可直接用系统提供的包管理工具。在Fedora上用yum安装

<div>
<pre>$ yum install git-core</pre>
</div>

&emsp;&emsp;在Ubuntu这类Debian体系的系统上，可以用apt-get安装：

<div>
<pre>$ apt-get install git</pre>
</div>

**在Mac上安装**

&emsp;&emsp;在Mac上安装Git有两种方式。最容易的当属使用图形化的Git安装工具

<div>
<pre>http://sourceforge.net/projects/git-osx-installer/</pre>
</div>

![git_base4](https://pic.xiaohuochai.site/blog/git_base4.png)

&emsp;&emsp;另一种是通过MacPorts(`http://www.macports.org`)安装。如果已经装好了MacPorts，用下面的命令安装Git：

<div>
<pre>$ sudo port install git-core +svn +doc +bash_completion +gitweb</pre>
</div>

&emsp;&emsp;这种方式就不需要再自己安装依赖库了，Macports会帮你搞定这些麻烦事。一般上面列出的安装选项已经够用，要是想用Git连接Subversion的代码仓库，还可以加上+svn选项

**在Windows上安装**

&emsp;&emsp;在Windows上安装Git同样轻松，有个叫做msysGit的项目提供了安装包，从https://git-for-windows.github.io下载(网速慢的同学请移步[国内镜像](https://pan.baidu.com/s/1kU5OCOB#list/path=%2Fpub%2Fgit))，然后按默认选项安装即可

&emsp;&emsp;安装完成后，在开始菜单里找到&ldquo;Git&rdquo;-&gt;&ldquo;Git Bash&rdquo;，蹦出一个类似命令行窗口的东西，就说明Git安装成功！

![git_base5](https://pic.xiaohuochai.site/blog/git_base5.png)

&emsp;&emsp;注意：如果在Windows命令行中使用Git时，在参数中间有空格的时候，必须使用双引号将参数括起来(在Linux中是单引号)；另外，如果扬抑符(^)作为参数的结尾，并且作为这一行的最后一个字符，则这个参数也需要用双引号括起来。因为扬抑符在Windows命令行中表示续行(即下一行为这一行命令的继续)&nbsp;

&nbsp;

### 配置

&emsp;&emsp;一般在新的系统上，我们都需要先配置下自己的Git工作环境。配置工作只需一次，以后升级时还会沿用现在的配置。当然，如果需要，你随时可以用相同的命令修改已有的配置

【用户信息】

&emsp;&emsp;第一个要配置的是个人的用户名称和电子邮件地址。这两条配置很重要，每次Git提交时都会引用这两条信息，说明是谁提交了更新，所以会随更新内容一起被永久纳入历史记录：

<div>
<pre>Administrator@bai MINGW64 ~
$ git config --global user.name "match"
Administrator@bai MINGW64 ~
$ git config --global user.email "121631835@qq.com"</pre>
</div>

&emsp;&emsp;如果用了--global选项，那么更改的配置文件就是位于用户主目录下的那个，以后所有的项目都会默认使用这里配置的用户信息。如果要在某个特定的项目中使用其他名字或者电邮，只要去掉--global选项重新配置即可，新的设定保存在当前项目的.git/config文件里

【配置级别】

&emsp;&emsp;git共有三个配置级别

&emsp;&emsp;--local【默认，高优先级】：只影响本仓库，文件为.git/config

&emsp;&emsp;--global【中优先级】：影响到所有当前用户的git仓库，文件为~/.gitconfig

&emsp;&emsp;--system【低优先级】：影响到全系统的git仓库，文件为/etc/gitconfig

【配置文本编辑器】

&emsp;&emsp;Git需要输入一些额外消息的时候，会自动调用一个外部文本编辑器。默认会使用操作系统指定的默认编辑器。如果有其他偏好，比如 EmEditor 的话，可以重新设置

<div>
<pre>$ git config --global core.editor D:/soft/EmEditor/EmEditor.exe</pre>
</div>

【配置别名】

&emsp;&emsp;Git并不会推断你输入的几个字符将会是哪条命令，不过如果想偷懒，少敲几个命令的字符，可以用&nbsp;`git config`&nbsp;为命令设置别名&emsp;&emsp;

<div>
<pre>$ git config --global alias.co checkout
$ git config --global alias.br branch
$ git config --global alias.ci commit
$ git config --global alias.st status</pre>
</div>

&emsp;&emsp;现在，如果要输入`git commit`只需键入`git ci`即可

&emsp;&emsp;使用这种技术还可以创造出新的命令，比方说取消暂存文件时的输入比较繁琐，可以自己设置一下

<div>
<pre>$ git config --global alias.unstage 'reset HEAD --'</pre>
</div>

&emsp;&emsp;这样一来，下面的两条命令完全等同

<div>
<pre>$ git unstage fileA
$ git reset HEAD fileA</pre>
</div>

【查看配置信息】

&emsp;&emsp;要检查已有的配置信息，可以使用git config --list命令

<div>
<pre>Administrator@bai MINGW64 ~
$ git config --list
core.symlinks=false
core.autocrlf=true
core.fscache=true
color.diff=auto
color.status=auto
color.branch=auto
color.interactive=true
help.format=html
http.sslcainfo=D:/Git/mingw64/ssl/certs/ca-bundle.crt
diff.astextplain.textconv=astextplain
rebase.autosquash=true
credential.helper=manager
user.name=match
user.email=121631835@qq.com
filter.lfs.clean=git-lfs clean %f
filter.lfs.smudge=git-lfs smudge %f
filter.lfs.required=true</pre>
</div>

&emsp;&emsp;也可以直接查阅某个环境变量的设定，只要把特定的名字跟在后面即可，像这样：

<div>
<pre>Administrator@bai MINGW64 ~
$ git config user.name
match</pre>
</div>

【获取帮助】

&emsp;&emsp;想了解Git的各式工具该怎么用，可以使用命令$ git help

```
Administrator@bai MINGW64 ~
$ git help
usage: git [--version] [--help] [-C &lt;path&gt;] [-c name=value]
           [--exec-path[=&lt;path&gt;]] [--html-path] [--man-path] [--info-path]
           [-p | --paginate | --no-pager] [--no-replace-objects] [--bare]
           [--git-dir=&lt;path&gt;] [--work-tree=&lt;path&gt;] [--namespace=&lt;name&gt;]
           &lt;command&gt; [&lt;args&gt;]

These are common Git commands used in various situations:

start a working area (see also: git help tutorial)
   clone      Clone a repository into a new directory
   init       Create an empty Git repository or reinitialize an existing one

work on the current change (see also: git help everyday)
   add        Add file contents to the index
   mv         Move or rename a file, a directory, or a symlink
   reset      Reset current HEAD to the specified state
   rm         Remove files from the working tree and from the index

examine the history and state (see also: git help revisions)
   bisect     Use binary search to find the commit that introduced a bug
   grep       Print lines matching a pattern
   log        Show commit logs
   show       Show various types of objects
   status     Show the working tree status

grow, mark and tweak your common history
   branch     List, create, or delete branches
   checkout   Switch branches or restore working tree files
   commit     Record changes to the repository
   diff       Show changes between commits, commit and working tree, etc
   merge      Join two or more development histories together
   rebase     Reapply commits on top of another base tip
   tag        Create, list, delete or verify a tag object signed with GPG

collaborate (see also: git help workflows)
   fetch      Download objects and refs from another repository
   pull       Fetch from and integrate with another repository or a local branch
   push       Update remote refs along with associated objects

'git help -a' and 'git help -g' list available subcommands and some
concept guides. See 'git help &lt;command&gt;' or 'git help &lt;concept&gt;'
to read about a specific subcommand or concept.
```

&emsp;&emsp;比如，要学习 config 命令可以怎么用，运行：

<div>
<pre>$ git help config</pre>
</div>

