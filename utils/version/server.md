# 服务器上的Git

&emsp;&emsp;如果想与他人使用，除了使用Git来完成日常工作之外，还需要一个远程的Git仓库。尽管从技术上可以从个人的仓库里推送和拉取修改内容，但并不鼓励这样做，因为一不留心就很容易弄混其他人的进度。因此，更好的合作方式是建立一个大家都可以访问的共享仓库，从那里推送和拉取数据。我们将这个仓库称为"Git服务器"；代理一个Git仓库只需要花费很少的资源，几乎从不需要整个服务器来支持它的运行

&emsp;&emsp;远程仓库通常只是一个裸仓库(bare repository)&mdash;&mdash;即一个没有当前工作目录的仓库。因为该仓库只是一个合作媒介，所以不需要从硬盘上取出最新版本的快照；仓库里存放的仅仅是Git的数据。简单地说，裸仓库就是你工作目录中.git子目录内的内容

&emsp;&emsp;本文将详细介绍服务器上的Git

&nbsp;

### 协议

&emsp;&emsp;Git可以使用四种主要的协议来传输数据：本地传输，SSH协议，Git协议和HTTP协议。下面分别介绍一下哪些情形应该使用(或避免使用)这些协议

&emsp;&emsp;值得注意的是，除了HTTP协议外，其他所有协议都要求在服务器端安装并运行Git

【本地协议】

&emsp;&emsp;最基本的就是本地协议(Local protocol)，所谓的远程仓库在该协议中的表示，就是硬盘上的另一个目录。这常见于团队每一个成员都对一个共享的文件系统(例如NFS)拥有访问权，或者比较少见的多人共用同一台电脑的情况。后面一种情况并不安全，因为所有代码仓库实例都储存在同一台电脑里，增加了灾难性数据损失的可能性

&emsp;&emsp;$ git init ~/git-server --bare &nbsp;将当前的仓库初始化为一个裸仓库，裸仓库的意思是没有工作目录。中央服务器并不需要工作目录，它是一个被动的接收作用，如果有工作目录的话，反而会造成错乱

&emsp;&emsp;如果你使用一个共享的文件系统，就可以在一个本地文件系统中克隆仓库，推送和获取。克隆的时候只需要将远程仓库的路径作为URL使用

<div>
<pre>$ git clone /opt/git/project.git</pre>
</div>

&emsp;&emsp;或者这样：

<div>
<pre>$ git clone file:///opt/git/project.git</pre>
</div>

&emsp;&emsp;如果在URL开头明确使用file://，那么Git会以一种略微不同的方式运行。如果你只给出路径，Git会尝试使用硬链接或直接复制它所需要的文件。如果使用了file://，Git会调用它平时通过网络来传输数据的工序，而这种方式的效率相对较低。使用file://前缀的主要原因是当你需要一个不包含无关引用或对象的干净仓库副本的时候&mdash;&mdash;一般指从其他版本控制系统导入的，或类似情形。我们这里仅仅使用普通路径，这样更快

&emsp;&emsp;要添加一个本地仓库作为现有Git项目的远程仓库，可以这样做

<div>
<pre>$ git remote add local_proj /opt/git/project.git</pre>
</div>

&emsp;&emsp;然后就可以像在网络上一样向这个远程仓库推送和获取数据了

&emsp;&emsp;基于文件仓库的优点在于它的简单，同时保留了现存文件的权限和网络访问权限。如果你的团队已经有一个全体共享的文件系统，建立仓库就十分容易了。你只需把一份裸仓库的副本放在大家都能访问的地方，然后像对其他共享目录一样设置读写权限就可以了

&emsp;&emsp;这也是从别人工作目录中获取工作成果的快捷方法。假如你和你的同事在一个项目中合作，他们想让你检出一些东西的时候，运行类似git pull /home/john/project通常会比他们推送到服务器，而你再从服务器获取简单得多

&emsp;&emsp;这种方法的缺点是，与基本的网络连接访问相比，难以控制从不同位置来的访问权限。如果你想从家里的笔记本电脑上推送，就要先挂载远程硬盘，这和基于网络连接的访问相比更加困难和缓慢

&emsp;&emsp;另一个很重要的问题是该方法不一定就是最快的，尤其是对于共享挂载的文件系统。本地仓库只有在你对数据访问速度快的时候才快。在同一个服务器上，如果二者同时允许Git访问本地硬盘，通过NFS访问仓库通常会比SSH慢

【SSH协议】

&emsp;&emsp;Git使用的传输协议中最常见的可能就是SSH了。这是因为大多数环境已经支持通过SSH对服务器的访问&mdash;即便还没有，架设起来也很容易。SSH也是唯一一个同时支持读写操作的网络协议。另外两个网络协议(HTTP和Git)通常都是只读的，所以虽然二者对大多数人都可用，但执行写操作时还是需要SSH。SSH同时也是一个验证授权的网络协议；而因为其普遍性，一般架设和使用都很容易

&emsp;&emsp;通过SSH克隆一个Git仓库，可以像下面这样给出ssh://的URL：

<div>
<pre>$ git clone ssh://user@server/project.git</pre>
</div>

&emsp;&emsp;或者不指明某个协议&mdash;&mdash;这时Git会默认使用SSH：

<div>
<pre>$ git clone user@server:project.git</pre>
</div>

&emsp;&emsp;如果不指明用户，Git会默认使用当前登录的用户名连接服务器

&emsp;&emsp;使用SSH的好处有很多。首先，如果你想拥有对网络仓库的写权限，基本上不可能不使用SSH。其次，SSH架设相对比较简单&mdash;&mdash;SSH守护进程很常见，很多网络管理员都有一些使用经验，而且很多操作系统都自带了它或者相关的管理工具。再次，通过SSH进行访问是安全的&mdash;&mdash;所有数据传输都是加密和授权的。最后，和Git及本地协议一样，SSH也很高效，会在传输之前尽可能压缩数据

&emsp;&emsp;SSH的限制在于你不能通过它实现仓库的匿名访问。即使仅为读取数据，人们也必须在能通过SSH访问主机的前提下才能访问仓库，这使得SSH不利于开源的项目。如果你仅仅在公司网络里使用，SSH可能是你唯一需要使用的协议。如果想允许对项目的匿名只读访问，那么除了为自己推送而架设SSH协议之外，还需要支持其他协议以便他人访问读取

【Git协议】

&emsp;&emsp;接下来是Git协议。这是一个包含在Git软件包中的特殊守护进程；它会监听一个提供类似于SSH服务的特定端口(9418)，而无需任何授权。打算支持Git协议的仓库，需要先创建git-daemon-export-ok文件，它是协议进程提供仓库服务的必要条件，但除此之外该服务没有什么安全措施。要么所有人都能克隆Git仓库，要么谁也不能。这也意味着该协议通常不能用来进行推送。你可以允许推送操作；然而由于没有授权机制，一旦允许该操作，网络上任何一个知道项目URL的人将都有推送权限。不用说，这是十分罕见的情况

&emsp;&emsp;Git协议是现存最快的传输协议。如果你在提供一个有很大访问量的公共项目，或者一个不需要对读操作进行授权的庞大项目，架设一个Git守护进程来供应仓库是个不错的选择。它使用与SSH协议相同的数据传输机制，但省去了加密和授权的开销

&emsp;&emsp;Git协议消极的一面是缺少授权机制。用Git协议作为访问项目的唯一方法通常是不可取的。一般的做法是，同时提供SSH接口，让几个开发者拥有推送(写)权限，其他人通过git://拥有只读权限。Git协议可能也是最难架设的协议。它要求有单独的守护进程，需要定制，需要设定xinetd或类似的程序，而这些工作就没那么轻松了。该协议还要求防火墙开放9418端口，而企业级防火墙一般不允许对这个非标准端口的访问。大型企业级防火墙通常会封锁这个少见的端口

【HTTP/S协议】

&emsp;&emsp;最后还有HTTP协议。HTTP或HTTPS协议的优美之处在于架设的简便性。基本上，只需要把Git的裸仓库文件放在HTTP的根目录下，配置一个特定的post-update挂钩(hook)就可以搞定。此后，每个能访问Git仓库所在服务器上web服务的人都可以进行克隆操作。下面的操作可以允许通过HTTP对仓库进行读取：

<div>
<pre>$ cd /var/www/htdocs/
$ git clone --bare /path/to/git_project gitproject.git
$ cd gitproject.git
$ mv hooks/post-update.sample hooks/post-update
$ chmod a+x hooks/post-update</pre>
</div>

&emsp;&emsp;Git附带的post-update挂钩会默认运行合适的命令(git update-server-info)来确保通过HTTP的获取和克隆正常工作。这条命令在你用SSH向仓库推送内容时运行；之后，其他人就可以用下面的命令来克隆仓库：

<div>
<pre>$ git clone http://example.com/gitproject.git</pre>
</div>

&emsp;&emsp;在本例中，我们使用了Apache设定中常用的/var/www/htdocs路径，不过你可以使用任何静态web服务&mdash;&mdash;把裸仓库放在它的目录里就行。 Git的数据是以最基本的静态文件的形式提供的

&emsp;&emsp;通过HTTP进行推送操作也是可能的，不过这种做法不太常见，并且牵扯到复杂的WebDAV设定。通过HTTP推送的好处之一是你可以使用任何WebDAV服务器，不需要为Git设定特殊环境；所以如果主机提供商支持通过WebDAV更新网站内容，你也可以使用这项功能

&emsp;&emsp;使用HTTP协议的好处是易于架设。几条必要的命令就可以让全世界读取到仓库的内容。花费不过几分钟。HTTP协议不会占用过多服务器资源。因为它一般只用到静态的HTTP服务提供所有数据，普通的Apache服务器平均每秒能支撑数千个文件的并发访问&mdash;&mdash;哪怕让一个小型服务器超载都很难

&emsp;&emsp;你也可以通过HTTPS提供只读的仓库，这意味着你可以加密传输内容；你甚至可以要求客户端使用特定签名的SSL证书。一般情况下，如果到了这一步，使用SSH公共密钥可能是更简单的方案；不过也存在一些特殊情况，这时通过HTTPS使用带签名的SSL证书或者其他基于HTTP的只读连接授权方式是更好的解决方案

&emsp;&emsp;HTTP还有个额外的好处：HTTP是一个如此常见的协议，以至于企业级防火墙通常都允许其端口的通信

&emsp;&emsp;HTTP协议的消极面在于，相对来说客户端效率更低。克隆或者下载仓库内容可能会花费更多时间，而且HTTP传输的体积和网络开销比其他任何一个协议都大。因为它没有按需供应的能力，传输过程中没有服务端的动态计算，因而HTTP协议经常会被称为傻瓜(dumb)协议

&nbsp;

### 服务器部署

&emsp;&emsp;开始架设Git服务器前，需要先把现有仓库导出为裸仓库&mdash;&mdash;即一个不包含当前工作目录的仓库。做法直截了当，克隆时用--bare选项即可。裸仓库的目录名一般以.git结尾，像这样

<div>
<pre>$ git clone --bare my_project my_project.git
Cloning into bare repository 'my_project.git'...
done.</pre>
</div>

&emsp;&emsp;clone操作基本上相当于git init加git fetch，所以这里出现的其实是git init的输出，先由它建立一个空目录，而之后传输数据对象的操作并无任何输出，只是悄悄在幕后执行。现在my_project.git目录中已经有了一份Git目录数据的副本

&emsp;&emsp;整体上的效果大致相当于：

<div>
<pre>$ cp -Rf my_project/.git my_project.git</pre>
</div>

&emsp;&emsp;但在配置文件中有若干小改动，不过对用户来讲，使用方式都一样，不会有什么影响。它仅取出Git仓库的必要原始数据，存放在该目录中，而不会另外创建工作目录

【把裸仓库移到服务器上】

&emsp;&emsp;有了裸仓库的副本后，剩下的就是把它放到服务器上并设定相关协议。假设一个域名为git.example.com的服务器已经架设好，并可以通过 SSH 访问，打算把所有 Git 仓库储存在 /opt/git 目录下。只要把裸仓库复制过去

<div>
<pre>$ scp -r my_project.git user@git.example.com:/opt/git</pre>
</div>

&emsp;&emsp;现在，所有对该服务器有SSH访问权限，并可读取/opt/git目录的用户都可以用下面的命令克隆该项目

<div>
<pre>$ git clone user@git.example.com:/opt/git/my_project.git</pre>
</div>

&emsp;&emsp;如果某个SSH用户对/opt/git/my_project.git目录有写权限，那他就有推送权限。如果到该项目目录中运行git init命令，并加上--shared选项，那么Git会自动修改该仓库目录的组权限为可写

&emsp;&emsp;实际上，--shared可以指定其他行为，只是默认为将组权限改为可写并执行g+sx，所以最后会得到rws

<div>
<pre>$ ssh user@git.example.com
$ cd /opt/git/my_project.git
$ git init --bare --shared</pre>
</div>

&emsp;&emsp;值得注意的是，这的确是架设一个少数人具有连接权的Git服务的全部，只要在服务器上加入可以用SSH登录的帐号，然后把裸仓库放在大家都有读写权限的地方

【小型安装】

&emsp;&emsp;如果设备较少或者只想在小型开发团队里尝试Git，那么一切都很简单。架设Git服务最复杂的地方在于账户管理。如果需要仓库对特定的用户可读，而给另一部分用户读写权限，那么访问和许可的安排就比较困难

**SSH连接**

&emsp;&emsp;如果已经有了一个所有开发成员都可以用SSH访问的服务器，架设第一个服务器将变得异常简单，几乎什么都不用做。如果需要对仓库进行更复杂的访问控制，只要使用服务器操作系统的本地文件访问许可机制就行了

&emsp;&emsp;如果需要团队里的每个人都对仓库有写权限，又不能给每个人在服务器上建立账户，那么提供SSH连接就是唯一的选择了。我们假设用来共享仓库的服务器已经安装了SSH服务，而且你通过它访问服务器

&emsp;&emsp;有好几个办法可以让团队的每个人都有访问权。第一个办法是给每个人建立一个账户，直截了当但略过繁琐。反复运行adduser并给所有人设定临时密码可不是好玩的

&emsp;&emsp;第二个办法是在主机上建立一个git账户，让每个需要写权限的人发送一个SSH公钥，然后将其加入git账户的~/.ssh/authorized_keys文件。这样一来，所有人都将通过git账户访问主机。这丝毫不会影响提交的数据，访问主机用的身份不会影响提交对象的提交者信息

&emsp;&emsp;另一个办法是让SSH服务器通过某个LDAP服务，或者其他已经设定好的集中授权机制，来进行授权。只要每个人都能获得主机的shell访问权，任何可用的SSH授权机制都能达到相同效果

&nbsp;

### 生成SSH公钥

&emsp;&emsp;大多数Git服务器都会选择使用SSH公钥来进行授权。系统中的每个用户都必须提供一个公钥用于授权，没有的话就要生成一个。生成公钥的过程在所有操作系统上都差不多。首先先确认一下是否已经有一个公钥了。SSH公钥默认储存在账户的主目录下的~/.ssh目录

<div>
<pre>$ cd ~/.ssh
$ ls
authorized_keys2 id_dsa known_hosts
config id_dsa.pub</pre>
</div>

&emsp;&emsp;关键是看有没有用something和something.pub来命名的一对文件，这个something通常就是id_dsa或id_rsa。有.pub后缀的文件就是公钥，另一个文件则是密钥。假如没有这些文件，或者干脆连.ssh目录都没有，可以用ssh-keygen来创建。该程序在Linux/Mac系统上由SSH包提供，而在Windows上则包含在MSysGit包里：

<div>
<pre>$ ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/schacon/.ssh/id_rsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /Users/schacon/.ssh/id_rsa.
Your public key has been saved in /Users/schacon/.ssh/id_rsa.pub.
The key fingerprint is:
43:c5:5b:5f:b1:f1:50:43:ad:20:a6:92:6a:1f:9a:3a schacon@agadorlaptop.local</pre>
</div>

&emsp;&emsp;它先要求你确认保存公钥的位置(.ssh/id_rsa)，然后它会让你重复一个密码两次，如果不想在使用公钥的时候输入密码，可以留空

&emsp;&emsp;现在，所有做过这一步的用户都得把它们的公钥给你或者Git服务器的管理员(假设SSH服务被设定为使用公钥机制)。他们只需要复制.pub文件的内容然后发邮件给管理员。公钥的样子大致如下

<div>
<pre>$ cat ~/.ssh/id_rsa.pub
ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAklOUpkDHrfHY17SbrmTIpNLTGK9Tjom/BWDSU
GPl+nafzlHDTYW7hdI4yZ5ew18JH4JW9jbhUFrviQzM7xlELEVf4h9lFX5QVkbPppSwg0cda3
Pbv7kOdJ/MTyBlWXFCR+HAo3FXRitBqxiX1nKhXpHAZsMciLq8V6RjsNAQwdsdMFvSlVK/7XA
t3FaoJoAsncM1Q9x5+3V0Ww68/eIFmb1zuUFljQJKprrX88XypNDvjYNby6vw/Pb0rwert/En
mZ+AW4OZPnTPI89ZPmVMLuayrD2cE86Z/il8b+gw3r3+1nKatmIkjn2so1d01QraTlMqVSsbx
NrRFi9wrf+M7Q== schacon@agadorlaptop.local</pre>
</div>

&nbsp;

### 架设服务器

&emsp;&emsp;现在我们过一边服务器端架设SSH访问的流程。本例将使用authorized_keys方法来给用户授权。我们还将假定使用类似Ubuntu这样的标准Linux发行版。首先，创建一个名为'git'的用户，并为其创建一个.ssh目录

<div>
<pre>$ sudo adduser git
$ su git
$ cd
$ mkdir .ssh</pre>
</div>

&emsp;&emsp;接下来，把开发者的 SSH 公钥添加到这个用户的 authorized_keys 文件中。假设你通过电邮收到了几个公钥并存到了临时文件里。重复一下，公钥大致看起来是这个样子：

<div>
<pre>$ cat /tmp/id_rsa.john.pub
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCB007n/ww+ouN4gSLKssMxXnBOvf9LGt4L
ojG6rs6hPB09j9R/T17/x4lhJA0F3FR1rP6kYBRsWj2aThGw6HXLm9/5zytK6Ztg3RPKK+4k
Yjh6541NYsnEAZuXz0jTTyAUfrtU3Z5E003C4oxOj6H0rfIF1kKI9MAQLMdpGW1GYEIgS9Ez
Sdfd8AcCIicTDWbqLAcU4UpkaX8KyGlLwsNuuGztobF8m72ALC/nLF6JLtPofwFBlgc+myiv
O7TCUSBdLQlgMVOFq1I2uPWQOkOWQAHukEOmfjy2jctxSDBQ220ymjaNsHT4kgtZg2AYYgPq
dAv8JggJICUvax2T9va5 gsg-keypair</pre>
</div>

&emsp;&emsp;只要把它们逐个追加到authorized_keys文件尾部即可：

<div>
<pre>$ cat /tmp/id_rsa.john.pub &gt;&gt; ~/.ssh/authorized_keys
$ cat /tmp/id_rsa.josie.pub &gt;&gt; ~/.ssh/authorized_keys
$ cat /tmp/id_rsa.jessica.pub &gt;&gt; ~/.ssh/authorized_keys</pre>
</div>

&emsp;&emsp;现在可以用--bare选项运行git init来建立一个裸仓库，这会初始化一个不包含工作目录的仓库

<div>
<pre>$ cd /opt/git
$ mkdir project.git
$ cd project.git
$ git --bare init</pre>
</div>

&emsp;&emsp;这时，Join，Josie或者Jessica就可以把它加为远程仓库，推送一个分支，从而把第一个版本的项目文件上传到仓库里了。值得注意的是，每次添加一个新项目都需要通过shell登入主机并创建一个裸仓库目录。我们不妨以gitserver作为git用户及项目仓库所在的主机名。如果在网络内部运行该主机，并在DNS中设定gitserver指向该主机，那么以下这些命令都是可用的：

<div>
<pre># 在 John 的电脑上
$ cd myproject
$ git init
$ git add .
$ git commit -m 'initial commit'
$ git remote add origin git@gitserver:/opt/git/project.git
$ git push origin master</pre>
</div>

&emsp;&emsp;这样，其他人的克隆和推送也一样变得很简单：

<div>
<pre>$ git clone git@gitserver:/opt/git/project.git
$ cd project
$ vim README
$ git commit -am 'fix for the README file'
$ git push origin master</pre>
</div>

&emsp;&emsp;用这个方法可以很快捷地为少数几个开发者架设一个可读写的Git服务

&emsp;&emsp;作为一个额外的防范措施，你可以用Git自带的git-shell工具限制git用户的活动范围。只要把它设为git用户登入的shell，那么该用户就无法使用普通的bash或者csh什么的shell程序。编辑/etc/passwd文件

<div>
<pre>$ sudo vim /etc/passwd</pre>
</div>

&emsp;&emsp;在文件末尾，你应该能找到类似这样的行

<div>
<pre>git:x:1000:1000::/home/git:/bin/sh</pre>
</div>

&emsp;&emsp;把bin/sh改为/usr/bin/git-shell，或者用which git-shell查看它的实际安装路径。该行修改后的样子如下

<div>
<pre>git:x:1000:1000::/home/git:/usr/bin/git-shell</pre>
</div>

&emsp;&emsp;现在git用户只能用SSH连接来推送和获取Git仓库，而不能直接使用主机shell。尝试普通SSH登录的话，会看到下面这样的拒绝信息

<div>
<pre>$ ssh git@gitserver
fatal: What do you think I am? A shell?
Connection to gitserver closed.</pre>
</div>

&nbsp;

### 公共访问

&emsp;&emsp;匿名的读取权限该怎么实现呢？也许除了内部私有的项目之外，你还需要托管一些开源项目。或者因为要用一些自动化的服务器来进行编译，或者有一些经常变化的服务器群组，而又不想整天生成新的SSH密钥。总之，你需要简单的匿名读取权限

&emsp;&emsp;或许对小型的配置来说最简单的办法就是运行一个静态web服务，把它的根目录设定为Git仓库所在的位置，然后开启post-update挂钩。这里继续使用之前的例子。假设仓库处于/opt/git目录，主机上运行着Apache服务。重申一下，任何web服务程序都可以达到相同效果；作为范例，我们将用一些基本的Apache设定来展示大体需要的步骤

&emsp;&emsp;首先，开启挂钩：

<div>
<pre>$ cd project.git
$ mv hooks/post-update.sample hooks/post-update
$ chmod a+x hooks/post-update</pre>
</div>

&emsp;&emsp;post-update挂钩是做什么的呢？其内容大致如下：

<div>
<pre>$ cat .git/hooks/post-update
#!/bin/sh
#
# An example hook script to prepare a packed repository for use over
# dumb transports.
#
# To enable this hook, rename this file to "post-update".
#

exec git-update-server-info</pre>
</div>

&emsp;&emsp;意思是当通过SSH向服务器推送时，Git将运行这个git-update-server-info命令来更新匿名HTTP访问获取数据时所需要的文件

&emsp;&emsp;接下来，在Apache配置文件中添加一个VirtualHost条目，把文档根目录设为Git项目所在的根目录。这里我们假定DNS服务已经配置好，会把对.gitserver的请求发送到这台主机：

<div>
<pre>&lt;VirtualHost *:80&gt;
ServerName git.gitserver
DocumentRoot /opt/git
&lt;Directory /opt/git/&gt;
Order allow, deny
allow from all
&lt;/Directory&gt;
&lt;/VirtualHost&gt;</pre>
</div>

&emsp;&emsp;另外，需要把/opt/git目录的Unix用户组设定为www-data，这样web服务才可以读取仓库内容，因为运行CGI脚本的Apache实例进程默认就是以该用户的身份起来的：

<div>
<pre>$ chgrp -R www-data /opt/git</pre>
</div>

&emsp;&emsp;重启Apache之后，就可以通过项目的URL来克隆该目录下的仓库了

<div>
<pre>$ git clone http://git.gitserver/project.git</pre>
</div>

&emsp;&emsp;这一招可以让你在几分钟内为相当数量的用户架设好基于HTTP的读取权限。另一个提供非授权访问的简单方法是开启一个Git守护进程，不过这将要求该进程作为后台进程常驻

&nbsp;

### GitWeb

&emsp;&emsp;现在我们的项目已经有了可读可写和只读的连接方式，不过如果能有一个简单的web界面访问就更好了。Git自带一个叫做GitWeb的CGI脚本，运行效果可以到http://git.kernel.org这样的站点体验下

![git_server1](https://pic.xiaohuochai.site/blog/git_server1.png)

&emsp;&emsp;如果想看看自己项目的效果，不妨用Git自带的一个命令，可以使用类似lighttpd或webrick这样轻量级的服务器启动一个临时进程。如果是在Linux主机上，通常都预装了lighttpd，可以到项目目录中键入git instaweb来启动。如果用的是Mac，Leopard预装了Ruby，所以webrick应该是最好的选择。如果要用lighttpd以外的程序来启动git instaweb，可以通过--httpd选项指定：

<div>
<pre>$ git instaweb --httpd=webrick
[2009-02-21 10:02:21] INFO WEBrick 1.3.1
[2009-02-21 10:02:21] INFO ruby 1.8.6 (2008-03-03) [universal-darwin9.0]</pre>
</div>

&emsp;&emsp;这会在1234端口开启一个HTTPD服务，随之在浏览器中显示该页，十分简单。关闭服务时，只需在原来的命令后面加上--stop选项就可以了

<div>
<pre>$ git instaweb --httpd=webrick --stop</pre>
</div>

&emsp;&emsp;如果需要为团队或者某个开源项目长期运行GitWeb，那么CGI脚本就要由正常的网页服务来运行。一些Linux发行版可以通过apt或yum安装一个叫做gitweb的软件包，不妨首先尝试一下。我们将快速介绍一下手动安装GitWeb的流程。首先，你需要Git的源码，其中带有GitWeb，并能生成定制的CGI脚本

<div>
<pre>$ git clone git://git.kernel.org/pub/scm/git/git.git
$ cd git/
$ make GITWEB_PROJECTROOT="/opt/git" \
prefix=/usr gitweb
$ sudo cp -Rf gitweb /var/www/</pre>
</div>

&emsp;&emsp;注意，通过指定GITWEB_PROJECTROOT变量告诉编译命令Git仓库的位置。然后，设置Apache以CGI方式运行该脚本，添加一个VirtualHost配置：

<div>
<pre>&lt;VirtualHost *:80&gt;
ServerName gitserver
DocumentRoot /var/www/gitweb
&lt;Directory /var/www/gitweb&gt;
Options ExecCGI +FollowSymLinks +SymLinksIfOwnerMatch
AllowOverride All
order allow,deny
Allow from all
AddHandler cgi-script cgi
DirectoryIndex gitweb.cgi
&lt;/Directory&gt;
&lt;/VirtualHost&gt;</pre>
</div>

&emsp;&emsp;不难想象，GitWeb可以使用任何兼容CGI的网页服务来运行；如果偏向使用其他web服务器，配置也不会很麻烦。现在，通过`http://gitserver`就可以在线访问仓库了，在`http://git.server`上还可以通过HTTP克隆和获取仓库的内容

&nbsp;

### Gitosis

&emsp;&emsp;把所有用户的公钥保存在authorized_keys文件的做法，只能凑和一阵子，当用户数量达到几百人的规模时，管理起来就会十分痛苦。每次改删用户都必须登录服务器不去说，这种做法还缺少必要的权限管理，每个人都对所有项目拥有完整的读写权限

&emsp;&emsp;幸好我们还可以选择应用广泛的Gitosis项目。简单地说，Gitosis就是一套用来管理authorized_keys文件和实现简单连接限制的脚本。有趣的是，用来添加用户和设定权限的并非通过网页程序，而只是管理一个特殊的Git仓库。你只需要在这个特殊仓库内做好相应的设定，然后推送到服务器上，Gitosis就会随之改变运行策略，听起来就很酷

&emsp;&emsp;Gitosis 的安装算不上傻瓜化，但也不算太难。用Linux服务器架设起来最简单。以下例子中，我们使用装有Ubuntu 8.10系统的服务器

&emsp;&emsp;Gitosis的工作依赖于某些Python工具，所以首先要安装Python的setuptools包，在Ubuntu上称为python-setuptools

<div>
<pre>$ apt-get install python-setuptools</pre>
</div>

&emsp;&emsp;接下来，从Gitosis项目主页克隆并安装：

<div>
<pre>$ git clone https://github.com/tv42/gitosis.git
$ cd gitosis
$ sudo python setup.py install</pre>
</div>

&emsp;&emsp;这会安装几个供Gitosis使用的工具。默认Gitosis会把/home/git作为存储所有Git仓库的根目录，这没什么不好，不过我们之前已经把项目仓库都放在/opt/git里面了，所以为方便起见，我们可以做一个符号连接，直接划转过去，而不必重新配置：

<div>
<pre>$ ln -s /opt/git /home/git/repositories</pre>
</div>

&emsp;&emsp;Gitosis将会帮我们管理用户公钥，所以先把当前控制文件改名备份，以便稍后重新添加，准备好让Gitosis自动管理authorized_keys文件：

<div>
<pre>$ mv /home/git/.ssh/authorized_keys /home/git/.ssh/ak.bak</pre>
</div>

&emsp;&emsp;接下来，如果之前把git用户的登录shell改为git-shell命令的话，先恢复'git'用户的登录shell。改过之后，大家仍然无法通过该帐号登录，因为authorized_keys文件已经没有了。不过不用担心，这会交给Gitosis来实现。所以现在先打开/etc/passwd文件，把这行：

<div>
<pre>git:x:1000:1000::/home/git:/usr/bin/git-shell</pre>
</div>

&emsp;&emsp;改回:

<div>
<pre>git:x:1000:1000::/home/git:/bin/sh</pre>
</div>

&emsp;&emsp;好了，现在可以初始化Gitosis了。你可以用自己的公钥执行gitosis-init命令，要是公钥不在服务器上，先临时复制一份：

<div>
<pre>$ sudo -H -u git gitosis-init &lt; /tmp/id_dsa.pub
Initialized empty Git repository in /opt/git/gitosis-admin.git/
Reinitialized existing Git repository in /opt/git/gitosis-admin.git/</pre>
</div>

&emsp;&emsp;这样该公钥的拥有者就能修改用于配置Gitosis的那个特殊Git仓库了。接下来，需要手工对该仓库中的post-update脚本加上可执行权限：

<div>
<pre>$ sudo chmod 755 /opt/git/gitosis-admin.git/hooks/post-update</pre>
</div>

&emsp;&emsp;基本上就算是好了。如果设定过程没出什么差错，现在可以试一下用初始化Gitosis的公钥的拥有者身份SSH登录服务器，应该会看到类似下面这样：

<div>
<pre>$ ssh git@gitserver
PTY allocation request failed on channel 0
ERROR:gitosis.serve.main:Need SSH_ORIGINAL_COMMAND in environment.
Connection to gitserver closed.</pre>
</div>

&emsp;&emsp;说明Gitosis认出了该用户的身份，但由于没有运行任何Git命令，所以它切断了连接。那么，现在运行一个实际的Git命令&mdash;&mdash;克隆Gitosis的控制仓库：

<div>
<pre># 在你本地计算机上
$ git clone git@gitserver:gitosis-admin.git</pre>
</div>

&emsp;&emsp;这会得到一个名为gitosis-admin的工作目录，主要由两部分组成：

<div>
<pre>$ cd gitosis-admin
$ find .
./gitosis.conf
./keydir
./keydir/scott.pub</pre>
</div>

&emsp;&emsp;gitosis.conf文件是用来设置用户、仓库和权限的控制文件。keydir目录则是保存所有具有访问权限用户公钥的地方&mdash;&mdash;每人一个。在keydir里的文件名(比如上面的scott.pub)应该跟你的不一样&mdash;&mdash;Gitosis会自动从使用gitosis-init脚本导入的公钥尾部的描述中获取该名字

&emsp;&emsp;看一下gitosis.conf文件的内容，它应该只包含与刚刚克隆的gitosis-admin相关的信息：

<div>
<pre>$ cat gitosis.conf
[gitosis]
[group gitosis-admin]
members = scott
writable = gitosis-admin</pre>
</div>

&emsp;&emsp;它显示用户scott&mdash;&mdash;初始化Gitosis公钥的拥有者&mdash;&mdash;是唯一能管理gitosis-admin项目的人

&emsp;&emsp;现在我们来添加一个新项目。为此我们要建立一个名为mobile的新段落，在其中罗列手机开发团队的开发者，以及他们拥有写权限的项目。由于'scott'是系统中的唯一用户，我们把他设为唯一用户，并允许他读写名为iphone_project的新项目：

<div>
<pre>[group mobile]
members = scott
writable = iphone_project</pre>
</div>

&emsp;&emsp;修改完之后，提交gitosis-admin里的改动，并推送到服务器使其生效：

<div>
<pre>$ git commit -am 'add iphone_project and mobile group'
[master 8962da8] add iphone_project and mobile group
1 file changed, 4 insertions(+)
$ git push origin master
Counting objects: 5, done.
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 272 bytes | 0 bytes/s, done.
Total 3 (delta 0), reused 0 (delta 0)
To git@gitserver:gitosis-admin.git
fb27aec..8962da8 master -&gt; master</pre>
</div>

&emsp;&emsp;在新工程iphone_project里首次推送数据到服务器前，得先设定该服务器地址为远程仓库。但你不用事先到服务器上手工创建该项目的裸仓库&mdash;&mdash;Gitosis会在第一次遇到推送时自动创建：

<div>
<pre>$ git remote add origin git@gitserver:iphone_project.git
$ git push origin master
Initialized empty Git repository in /opt/git/iphone_project.git/
Counting objects: 3, done.
Writing objects: 100% (3/3), 230 bytes | 0 bytes/s, done.
Total 3 (delta 0), reused 0 (delta 0)
To git@gitserver:iphone_project.git
* [new branch] master -&gt; master</pre>
</div>

&emsp;&emsp;请注意，这里不用指明完整路径(实际上，如果加上反而没用)，只需要一个冒号加项目名字即可&mdash;&mdash;Gitosis会自动帮你映射到实际位置

&emsp;&emsp;要和朋友们在一个项目上协同工作，就得重新添加他们的公钥。不过这次不用在服务器上一个一个手工添加到~/.ssh/authorized_keys文件末端，而只需管理keydir目录中的公钥文件。文件的命名将决定在gitosis.conf中对用户的标识。现在我们为John，Josie和Jessica添加公钥：

<div>
<pre>$ cp /tmp/id_rsa.john.pub keydir/john.pub
$ cp /tmp/id_rsa.josie.pub keydir/josie.pub
$ cp /tmp/id_rsa.jessica.pub keydir/jessica.pub</pre>
</div>

&emsp;&emsp;然后把他们都加进'mobile'团队，让他们对iphone_project具有读写权限：

<div>
<pre>[group mobile]
members = scott john josie jessica
writable = iphone_project</pre>
</div>

&emsp;&emsp;如果你提交并推送这个修改，四个用户将同时具有该项目的读写权限

&emsp;&emsp;Gitosis也具有简单的访问控制功能。如果想让John只有读权限，可以这样做：

<div>
<pre>[group mobile]
members = scott josie jessica
writable = iphone_project

[group mobile_ro]
members = john
readonly = iphone_project</pre>
</div>

&emsp;&emsp;现在John可以克隆和获取更新，但Gitosis不会允许他向项目推送任何内容。像这样的组可以随意创建，多少不限，每个都可以包含若干不同的用户和项目。甚至还可以指定某个组为成员之一(在组名前加上@ 前缀)，自动继承该组的成员：

<div>
<pre>[group mobile_committers]
members = scott josie jessica
[group mobile]
members = @mobile_committers
writable = iphone_project
[group mobile_2]
members = @mobile_committers john
writable = another_iphone_project</pre>
</div>

&emsp;&emsp;如果遇到意外问题，试试看把loglevel=DEBUG加到[gitosis]的段落(把日志设置为调试级别，记录更详细的运行信息)。如果一不小心搞错了配置，失去了推送权限，也可以手工修改服务器上的/home/git/.gitosis.conf文件&mdash;&mdash;Gitosis实际是从该文件读取信息的。它在得到推送数据时，会把新的gitosis.conf存到该路径上。所以如果你手工编辑该文件的话，它会一直保持到下次向gitosis-admin推送新版本的配置内容为止

&nbsp;

### Gitolite

&emsp;&emsp;Gitolite是在Git之上的一个授权层，依托sshd或者httpd来进行认证

&emsp;&emsp;认证是确定用户是谁，授权是决定该用户是否被允许做他想做的事情

&emsp;&emsp;Gitolite允许你定义访问许可而不只作用于仓库，而同样于仓库中的每个branch和tag name。你可以定义确切的人(或一组人)只能push特定的"refs"(或者branches或者tags)而不是其他人。

【安装】

&emsp;&emsp;安装Gitolite非常简单，甚至不用读自带的那一大堆文档。你需要一个unix服务器上的账户；许多linux变种和solaris 10都已经试过了。不需要root访问，假设git，perl，和一个openssh兼容的ssh服务器已经装好了。在下面的例子里，我们会用git账户在gitserver进行

&emsp;&emsp;Gitolite是不同于&ldquo;服务&rdquo;的软件&mdash;&mdash;其通过ssh访问，而且每个在服务器上的userid都是一个潜在的&ldquo;gitolite主机&rdquo;。我们在这里描述最简单的安装方法

&emsp;&emsp;开始，在你的服务器上创建一个名为git的用户，然后以这个用户登录。从你的工作站拷贝你的SSH公钥(也就是你用ssh-keygen默认生成的~/.ssh/id_dsa.pub文件)，重命名为&lt;yourname&gt;.pub(我们这里使用scott.pub作为例子)。然后执行下面的命令：

<div>
<pre>$ git clone git://github.com/sitaramc/gitolite
$ gitolite/install -ln
# assumes $HOME/bin exists and is in your $PATH
$ gitolite setup -pk $HOME/scott.pub</pre>
</div>

&emsp;&emsp;最后一个命令在服务器上创建了一个名为gitolite-admin的Git仓库

&emsp;&emsp;最后，回到你的工作站，执行git clone git@gitserver:gitolite-admin。然后你就完成了！Gitolite现在已经安装在了服务器上，在你的工作站上，你也有一个名为gitolite-admin的新仓库。你可用通过更改这个仓库以及推送到服务器上来管理你的Gitolite配置。

【配置文件和访问规则】

&emsp;&emsp;安装结束后，你切换到gitolite-admin仓库(放在你的HOME目录)然后看看都有啥：

<div>
<pre>$ cd ~/gitolite-admin/
$ ls
conf/ keydir/
$ find conf keydir -type f
conf/gitolite.conf
keydir/scott.pub
$ cat conf/gitolite.conf
repo gitolite-admin
RW+ = scott
repo testing
RW+ = @all</pre>
</div>

&emsp;&emsp;注意"scott"(之前用gl-setup命令时候的pubkey名称)有读写权限而且在gitolite-admin仓库里有一个同名的公钥文件

&emsp;&emsp;添加用户很简单。为了添加一个名为alice的用户，获取她的公钥，命名为alice.pub，然后放到在你工作站上的gitolite-admin克隆的keydir目录。添加，提交，然后推送更改。这样用户就被添加了

&emsp;&emsp;gitolite配置文件的语法在conf/example.conf里，我们只会提到一些主要的。

&emsp;&emsp;你可以给用户或者仓库分组。分组名就像一些宏；定义的时候，无所谓他们是工程还是用户；区别在于你使用&ldquo;宏&rdquo;的时候

<div>
<pre>@oss_repos = linux perl rakudo git gitolite
@secret_repos = fenestra pear
@admins = scott
@interns = ashok
@engineers = sitaram dilbert wally alice
@staff = @admins @engineers @interns</pre>
</div>

&emsp;&emsp;你可以控制许可在&rdquo;ref&ldquo;级别。在下面的例子里，实习生可以push "int"分支。工程师可以push任何有"eng-"开头的branch，还有refs/tags下面用"rc"开头的后面跟数字的。而且管理员可以随便更改(包括rewind)对任何参考名

<div>
<pre>repo @oss_repos
RW int$ = @interns
RW eng- = @engineers
RW refs/tags/rc[0-9] = @engineers
RW+ = @admins</pre>
</div>

&emsp;&emsp;在RWorRW+之后的表达式是正则表达式(regex)对应着后面的push用的参考名字(ref)。所以我们叫它&ldquo;参考正则&rdquo;(refex)

&emsp;&emsp;同样，你可能猜到了，Gitolite字头refs/heads/是一个便捷句法如果参考正则没有用refs/开头

&emsp;&emsp;一个这个配置文件语法的重要功能是，所有的仓库的规则不需要在同一个位置。你能报所有普通的东西放在一起，就像上面的对所有oss_repos的规则那样，然后建一个特殊的规则对后面的特殊案例，就像：

<div>
<pre>repo gitolite
RW+ = sitaram</pre>
</div>

&emsp;&emsp;那条规则刚刚加入规则集的gitolite仓库

&emsp;&emsp;这次你可能会想要知道访问控制规则是如何应用的，我们简要介绍一下

&emsp;&emsp;在gitolite里有两级访问控制。第一是在仓库级别；如果你已经读或者写访问过了任何在仓库里的参考，那么你已经读或者写访问仓库了

&emsp;&emsp;第二级，应用只能写访问，通过在仓库里的branch或者tag。用户名如果尝试过访问(W或+)，参考名被更新为已知。访问规则检查是否出现在配置文件里，为这个联合寻找匹配(但是记得参考名是正则匹配的，不是字符串匹配的)。如果匹配被找到了，push就成功了。不匹配的访问会被拒绝。

【带&ldquo;拒绝&rdquo;的高级访问控制】

&emsp;&emsp;目前，我们只看过了许可是R,RW,或者RW+这样子的。但是gitolite还允许另外一种许可："-"代表&ldquo;拒绝&rdquo;。这个给了你更多的能力，当然也有一点复杂，因为不匹配并不是唯一的拒绝访问的方法，因此规则的顺序变得无关了

&emsp;&emsp;在前面的情况中，我们想要工程师可以rewind任意branch除了master和integ。这里是如何做到的

<div>
<pre>RW master integ = @engineers
- master integ = @engineers
RW+ = @engineers</pre>
</div>

&emsp;&emsp;你再一次简单跟随规则从上至下知道你找到一个匹配你的访问模式的，或者拒绝。非rewind push到master或者integ 被第一条规则允许。一个rewind push到那些refs不匹配第一条规则，掉到第二条，因此被拒绝。任何push(rewind或非rewind)到参考或者其他master或者integ不会被前两条规则匹配，即被第三条规则允许

【通过改变文件限制 push】

&emsp;&emsp;此外限制用户push改变到哪条branch的，你也可以限制哪个文件他们可以碰的到。比如，可能Makefile (或者其他哪些程序) 真的不能被任何人做任何改动，因为好多东西都靠着它呢，或者如果某些改变刚好不对就会崩溃。你可以告诉 gitolite:

<div>
<pre>repo foo
RW = @junior_devs @senior_devs
- VREF/NAME/Makefile = @junior_devs</pre>
</div>

&emsp;&emsp;这是一个强力的功能写在 conf/example.conf里

【个人分支】

&emsp;&emsp;Gitolite也支持一个叫&ldquo;个人分支&rdquo;的功能 (或者叫&ldquo;个人分支命名空间&rdquo;)在合作环境里非常有用。

&emsp;&emsp;在git世界里许多代码交换通过"pull"请求发生。然而在合作环境里，委任制的访问是&ldquo;绝不&rdquo;，一个开发者工作站不能认证，你必须push到中心服务器并且叫其他人从那里pull

&emsp;&emsp;这个通常会引起一些branch名称簇变成像VCS里一样集中化，加上设置许可变成管理员的苦差事

&emsp;&emsp;Gitolite让你定义一个&ldquo;个人的&rdquo;或者&ldquo;乱七八糟的&rdquo;命名空间字首给每个开发人员(比如，refs/personal/&lt;devname&gt;/*)；看在doc/3-faq-tips-etc.mkd里的"personal branches"一段获取细节

【&ldquo;通配符&rdquo;仓库】

&emsp;&emsp;Gitolite允许你定义带通配符的仓库(其实还是perl正则式)，比如随便整个例子的话`assignments/s[0-9][0-9]/a[0-9][0-9]`。这是一个非常有用的功能，需要通过设置$GL_WILDREPOS = 1; 在rc文件中启用。允许你安排一个新许可模式("C")允许用户创建仓库基于通配符，自动分配拥有权对特定用户&mdash;&mdash;创建者，允许他交出R和RW许可给其他合作用户等等。这个功能在doc/4-wildcard-repositories.mkd文档里

【其他功能】

&emsp;&emsp;我们用一些其他功能的例子结束这段讨论，这些以及其他功能都在"faqs, tips, etc"和其他文档里

&emsp;&emsp;记录：Gitolite记录所有成功的访问。如果你太放松给了别人rewind许可(RW+)和其他孩子弄没了"master"，记录文件会救你的命，如果其他简单快速的找到SHA都不管用。

&emsp;&emsp;访问权报告：另一个方便的功能是你尝试用ssh连接到服务器的时候发生了什么。Gitolite告诉你哪个 repos你访问过，那个访问可能是什么。这里是例子：

<div>
<pre>hello scott, this is git@git running gitolite3 v3.01-18-g9609868 on git 1.7.4.4
R anu-wsd
R entrans
R W git-notes
R W gitolite
R W gitolite-admin
R indic_web_input
R shreelipi_converter</pre>
</div>

&emsp;&emsp;委托：真正的大安装，你可以把责任委托给一组仓库给不同的人然后让他们独立管理那些部分。这个减少了主管理者的负担，让他瓶颈更小。这个功能在他自己的文档目录里的doc/下面

&emsp;&emsp;镜像：Gitolite可以帮助你维护多个镜像，如果主服务器挂掉的话在他们之间很容易切换

&nbsp;

### Git守护进程

&emsp;&emsp;对于提供公共的，非授权的只读访问，我们可以抛弃HTTP协议，改用Git自己的协议，这主要是出于性能和速度的考虑。Git协议远比HTTP协议高效，因而访问速度也快，所以它能节省很多用户的时间

&emsp;&emsp;重申一下，这一点只适用于非授权的只读访问。如果建在防火墙之外的服务器上，那么它所提供的服务应该只是那些公开的只读项目。如果是在防火墙之内的服务器上，可用于支撑大量参与人员或自动系统(用于持续集成或编译的主机)只读访问的项目，这样可以省去逐一配置SSH公钥的麻烦

&emsp;&emsp;但不管哪种情形，Git协议的配置设定都很简单。基本上，只要以守护进程的形式运行该命令即可：

<div>
<pre>git daemon --reuseaddr --base-path=/opt/git/ /opt/git/</pre>
</div>

&emsp;&emsp;这里的--reuseaddr选项表示在重启服务前，不等之前的连接超时就立即重启。而--base-path选项则允许克隆项目时不必给出完整路径。最后面的路径告诉Git守护进程允许开放给用户访问的仓库目录。假如有防火墙，则需要为该主机的9418端口设置为允许通信

&emsp;&emsp;以守护进程的形式运行该进程的方法有很多，但主要还得看用的是什么操作系统。在Ubuntu主机上，可以用Upstart脚本达成。编辑该文件：

<div>
<pre>/etc/event.d/local-git-daemon</pre>
</div>

&emsp;&emsp;加入以下内容：

<div>
<pre>start on startup
stop on shutdown
exec /usr/bin/git daemon \
--user=git --group=git \
--reuseaddr \
--base-path=/opt/git/ \
/opt/git/
respawn</pre>
</div>

&emsp;&emsp;出于安全考虑，强烈建议用一个对仓库只有读取权限的用户身份来运行该进程&mdash;&mdash;只需要简单地新建一个名为git-ro的用户

&emsp;&emsp;新建用户默认对仓库文件不具备写权限，但这取决于仓库目录的权限设定。务必确认git-ro对仓库只能读不能写，并用它的身份来启动进程。这里为了简化，后面我们还是用之运行Gitosis的用户'git'

&emsp;&emsp;这样一来，当你重启计算机时，Git进程也会自动启动。要是进程意外退出或者被杀掉，也会自行重启。在设置完成后，不重启计算机就启动该守护进程，可以运行：

<div>
<pre>initctl start local-git-daemon</pre>
</div>

&emsp;&emsp;而在其他操作系统上，可以用xinetd，或者sysvinit系统的脚本，或者其他类似的脚本&mdash;&mdash;只要能让那个命令变为守护进程并可监控

&emsp;&emsp;接下来，我们必须告诉Gitosis哪些仓库允许通过Git协议进行匿名只读访问。如果每个仓库都设有各自的段落，可以分别指定是否允许Git进程开放给用户匿名读取。比如允许通过Git协议访问iphone_project，可以把下面两行加到gitosis.conf文件的末尾：

<div>
<pre>[repo iphone_project]
daemon = yes</pre>
</div>

&emsp;&emsp;在提交和推送完成后，运行中的Git守护进程就会响应来自9418端口对该项目的访问请求。

&emsp;&emsp;如果不考虑Gitosis，单单起了Git守护进程的话，就必须到每一个允许匿名只读访问的仓库目录内，创建一个特殊名称的空文件作为标志：

<div>
<pre>$ cd /path/to/project.git
$ touch git-daemon-export-ok</pre>
</div>

&emsp;&emsp;该文件的存在，表明允许 Git 守护进程开放对该项目的匿名只读访问。

&emsp;&emsp;Gitosis还能设定哪些项目允许放在GitWeb上显示。打开GitWeb的配置文件/etc/gitweb.conf，添加以下四行

<div>
<pre>$projects_list = "/home/git/gitosis/projects.list";
$projectroot = "/home/git/repositories";
$export_ok = "git-daemon-export-ok";
@git_base_url_list = ('git://gitserver');</pre>
</div>

&emsp;&emsp;接下来，只要配置各个项目在Gitosis中的gitweb参数，便能达成是否允许GitWeb用户浏览该项目。比如，要让iphone_project项目在GitWeb里出现，把repo的设定改成下面的样子：

<div>
<pre>[repo iphone_project]
daemon = yes
gitweb = yes</pre>
</div>

&emsp;&emsp;在提交并推送过之后，GitWeb就会自动开始显示iphone_project项目的细节和历史