# Github托管

&emsp;&emsp;本文将主要介绍如何使用Github来托管Git服务

&nbsp;

### SSH

&emsp;&emsp;大多数Git服务器都会选择使用SSH公钥来进行授权。系统中的每个用户都必须提供一个公钥用于授权

&emsp;&emsp;首先先确认一下是否已经有一个公钥了。SSH公钥默认储存在账户的主目录下的~/.ssh目录

&emsp;&emsp;有.pub后缀的文件就是公钥，另一个文件则是密钥

![git_trusteeship1](https://pic.xiaohuochai.site/blog/git_trusteeship1.png)


&emsp;&emsp;假如没有这些文件，或者干脆连.ssh目录都没有，可以用ssh-keygen来创建

&emsp;&emsp;现在，删除.ssh目录，对SSH重新生成

![git_trusteeship2](https://pic.xiaohuochai.site/blog/git_trusteeship2.png)


&emsp;&emsp;下面使用ssh-keygen命令来创建SSH，这里需要把邮件地址换成自己的邮件地址，然后一路回车，使用默认值即可，由于这个Key也不是用于军事目的，所以也无需设置密码

![git_trusteeship3](https://pic.xiaohuochai.site/blog/git_trusteeship3.png)


&emsp;&emsp;如果一切顺利的话，可以在用户主目录里找到`.ssh`目录，里面有`id_rsa`和`id_rsa.pub`两个文件，这两个就是SSH Key的秘钥对，`id_rsa`是私钥，不能泄露出去，`id_rsa.pub`是公钥，可以放心地告诉任何人

![git_trusteeship4](https://pic.xiaohuochai.site/blog/git_trusteeship4.png)


&emsp;&emsp;SSH的公钥如下所示：

![git_trusteeship5](http://images2015.cnblogs.com/blog/740839/201704/740839-20170412083800876-24345898.png)


&emsp;&emsp;接下来，登陆GitHub，打开&ldquo;Settings&rdquo;，&ldquo;SSH Keys&rdquo;页面

![git_trusteeship6](https://pic.xiaohuochai.site/blog/git_trusteeship6.png)


&emsp;&emsp;然后，点&ldquo;New&nbsp;SSH Key&rdquo;，填上任意Title，在Key文本框里粘贴`id_rsa.pub`文件的内容

![git_trusteeship7](https://pic.xiaohuochai.site/blog/git_trusteeship7.png)


&emsp;&emsp;点击"Add SSH key"按钮后，结果如下所示：

![git_trusteeship8](https://pic.xiaohuochai.site/blog/git_trusteeship8.png)


&emsp;&emsp;为什么GitHub需要SSH Key呢？因为GitHub需要识别出你推送的提交确实是你推送的，而不是别人冒充的，而Git支持SSH协议，所以，GitHub只要知道了你的公钥，就可以确认只有你自己才能推送

&emsp;&emsp;当然，GitHub允许你添加多个Key。假定你有若干电脑，一会儿在公司提交，一会儿在家里提交，只要把每台电脑的Key都添加到GitHub，就可以在每台电脑上往GitHub推送了

&emsp;&emsp;在GitHub上托管的Git仓库，任何人都可以看到，但是只有你自己才能修改。所以，不要把敏感信息放进去

&nbsp;

### 添加本地库

&emsp;&emsp;下面添加一个名称为'mygit'的本地库，工作目录下有一个名称为'a.txt'的文件，其内容是'111'，并被提交

![git_trusteeship9](https://pic.xiaohuochai.site/blog/git_trusteeship9.png)

![git_trusteeship10](https://pic.xiaohuochai.site/blog/git_trusteeship10.png)


&nbsp;

### 添加远程库

&emsp;&emsp;现在的情景是，你已经在本地创建了一个Git仓库后，又想在GitHub创建一个Git仓库，并且让这两个仓库进行远程同步，这样，GitHub上的仓库既可以作为备份，又可以让其他人通过该仓库来协作

&emsp;&emsp;下面要建立一个名称为'learngit'的仓库，由于事先已经添加过了。所以，先把其删除

&emsp;&emsp;进入'learngit'的仓库界面，找到'Settings'按钮

![git_trusteeship11](https://pic.xiaohuochai.site/blog/git_trusteeship11.png)


&emsp;&emsp;在页面最下方，找到'Delete this repository'按钮

![git_trusteeship12](https://pic.xiaohuochai.site/blog/git_trusteeship12.png)


&emsp;&emsp;点击该按钮后，输入要删除的仓库名称，点击'I understand the consequences, delete this reposiytory'按钮即可删除

![git_trusteeship13](https://pic.xiaohuochai.site/blog/git_trusteeship13.png)


&emsp;&emsp;接下来，重新添加名称为'learngit'的仓库。点击右上角'+'号弹出的'New repository'

![git_trusteeship14](https://pic.xiaohuochai.site/blog/git_trusteeship14.png)


&emsp;&emsp;输入仓库名称Repository name为'learngit'，仓库介绍Description为'learn git'，点击'Create repository'按钮，即可添加成功

![git_trusteeship15](https://pic.xiaohuochai.site/blog/git_trusteeship15.png)


&emsp;&emsp;添加成功后，弹出如下界面。目前，在GitHub上的这个'learngit'仓库还是空的，GitHub告诉我们，可以从这个仓库克隆出新的仓库，也可以把一个已有的本地仓库与之关联，然后，把本地仓库的内容推送到GitHub仓库

![git_trusteeship16](https://pic.xiaohuochai.site/blog/git_trusteeship16.png)


&emsp;&emsp;接下来，需要对远程库'learngit'和本地库'mygit'进行关联

<div>
<pre>$ git remote add origin git@github.com:【GitHub帐号名】/【远程库的名称】.git</pre>
</div>

&emsp;&emsp;添加后，远程库的名字就是`origin`，这是Git默认的叫法，也可以改成别的，但是`origin`这个名字一看就知道是远程库

&emsp;&emsp;如果已经进行了关联，或者关联错了，则需要先删除关联

<div>
<pre>$ git remote rm origin</pre>
</div>

&emsp;&emsp;删除后，重新添加关联

![git_trusteeship17](https://pic.xiaohuochai.site/blog/git_trusteeship17.png)


&emsp;&emsp;接下来，把本地库'mygit'里的所有内容推送到远程库'learngit'中

&emsp;&emsp;把本地库的内容推送到远程，用`git push`命令，实际上是把当前分支`master`推送到远程

&emsp;&emsp;由于远程库是空的，我们第一次推送`master`分支时，加上了`-u`参数，Git不但会把本地的`master`分支内容推送到远程新的`master`分支，还会把本地的`master`分支和远程的`master`分支关联起来，在以后的推送或者拉取时就可以简化命令

![git_trusteeship18](https://pic.xiaohuochai.site/blog/git_trusteeship18.png)


&emsp;&emsp;推送成功后，可以立刻在GitHub页面中看到远程库的内容已经和本地一模一样

![git_trusteeship19](https://pic.xiaohuochai.site/blog/git_trusteeship19.png)


&emsp;&emsp;从现在起，只要本地作了提交，就可以通过以下命令，把本地`master`分支的最新修改推送至GitHub

<div>
<pre>$ git push origin master</pre>
</div>

&nbsp;

### 克隆远程库

&emsp;&emsp;前面我们介绍先有本地库，后有远程库的情况。现在，假设我们从零开发，那么最好的方式是先创建远程库，然后，从远程库克隆

&emsp;&emsp;首先，登陆GitHub，创建一个新的仓库，名字叫`gitskills`

![git_trusteeship20](https://pic.xiaohuochai.site/blog/git_trusteeship20.png)


&emsp;&emsp;勾选`Initialize this repository with a README`，这样GitHub会自动为我们创建一个`README.md`文件。创建完毕后，可以看到`README.md`文件

![git_trusteeship21](https://pic.xiaohuochai.site/blog/git_trusteeship21.png)


&emsp;&emsp;现在，远程库已经准备好了，下一步是用命令`git clone`克隆一个本地库

<div>
<pre>$ git clone git@github.com:【GitHub用户名】/【Github远程库名称】.git</pre>
</div>

&emsp;&emsp;在本地电脑的D盘新建一个名称为'b'的目录，然后将远程库克隆到本地

![git_trusteeship22](https://pic.xiaohuochai.site/blog/git_trusteeship22.png)


&emsp;&emsp;此时，本地已经有gitskills目录，在该目录下已经有README.md文件了

![git_trusteeship23](https://pic.xiaohuochai.site/blog/git_trusteeship23.png)


&emsp;&emsp;如果有多个人协作开发，那么每个人各自从远程克隆一份就可以了