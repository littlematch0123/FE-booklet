# Git协作

&emsp;&emsp;本文将详细介绍Git多人协作的具体内容

&nbsp;

### 远程仓库

&emsp;&emsp;当你从远程仓库克隆时，实际上Git自动把本地的master分支和远程的master分支对应起来了，并且，远程仓库的默认名称是origin。

&emsp;&emsp;要查看远程库的信息，用git remote：

![git_cooperation1](https://pic.xiaohuochai.site/blog/git_cooperation1.png)


&emsp;&emsp;或者，用git remote -v显示更详细的信息：

![git_cooperation2](https://pic.xiaohuochai.site/blog/git_cooperation2.png)


&emsp;&emsp;上面显示了可以抓取和推送的`origin`的地址。如果没有推送权限，就看不到push的地址

&nbsp;

### 推送分支

&emsp;&emsp;推送分支，就是把该分支上的所有本地提交推送到远程库。推送时，要指定本地分支，这样，Git就会把该分支推送到远程库对应的远程分支上

<div>
<pre>$ git push origin master</pre>
</div>

![git_cooperation3](https://pic.xiaohuochai.site/blog/git_cooperation3.png)


&emsp;&emsp;如果要推送其他分支，比如dev，就改成：

<div>
<pre>$ git push origin dev</pre>
</div>

&emsp;&emsp;但是，并不是一定要把本地分支往远程推送，那么，哪些分支需要推送，哪些不需要呢？

&emsp;&emsp;master分支是主分支，因此要时刻与远程同步；

&emsp;&emsp;dev分支是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同步；

&emsp;&emsp;bug分支只用于在本地修复bug，就没必要推到远程了，除非老板要看看你每周到底修复了几个bug；

&emsp;&emsp;feature分支是否推到远程，取决于你是否和你的小伙伴合作在上面开发

&nbsp;

### 抓取分支

&emsp;&emsp;多人协作时，大家都会往master和dev分支上推送各自的修改

&emsp;&emsp;现在，模拟一个你的小伙伴，可以在另一台电脑(注意要把SSH Key添加到GitHub)或者同一台电脑的另一个目录下克隆：

![git_cooperation4](https://pic.xiaohuochai.site/blog/git_cooperation4.png)

![git_cooperation5](https://pic.xiaohuochai.site/blog/git_cooperation5.png)


&emsp;&emsp;当你的小伙伴从远程库clone时，默认情况下，你的小伙伴只能看到本地的master分支

![git_cooperation6](https://pic.xiaohuochai.site/blog/git_cooperation6.png)


&emsp;&emsp;现在，你的小伙伴要在`dev`分支上开发，就必须创建远程`origin`的`dev`分支到本地，于是他用这个命令创建本地`dev`分支：

<div>
<pre>$ git checkout -b dev origin/dev</pre>
</div>

![git_cooperation7](https://pic.xiaohuochai.site/blog/git_cooperation7.png)


&emsp;&emsp;现在，他就可以在`dev`上继续修改，然后，时不时地把`dev`分支`push`到远程：

![git_cooperation8](https://pic.xiaohuochai.site/blog/git_cooperation8.png)


&emsp;&emsp;你的小伙伴已经向`origin/dev`分支推送了他的提交，而碰巧你也对同样的文件作了修改，并试图推送

![git_cooperation9](https://pic.xiaohuochai.site/blog/git_cooperation9.png)


&emsp;&emsp;推送失败，因为你的小伙伴的最新提交和你试图推送的提交有冲突，解决办法也很简单，Git已经提示我们，先用`git pull`把最新的提交从`origin/dev`抓下来，然后，在本地合并，解决冲突，再推送：

![git_cooperation10](https://pic.xiaohuochai.site/blog/git_cooperation10.png)


&emsp;&emsp;`git pull`也失败了，原因是没有指定本地`dev`分支与远程`origin/dev`分支的链接，根据提示，设置`dev`和`origin/dev`的链接

![git_cooperation11](https://pic.xiaohuochai.site/blog/git_cooperation11.png)


&emsp;&emsp;再pull：

![git_cooperation12](https://pic.xiaohuochai.site/blog/git_cooperation12.png)


&emsp;&emsp;这回`git pull`成功，但是合并有冲突，需要手动解决，解决的方法和分支管理中的解决冲突完全一样。解决后，提交，再push：

![git_cooperation13](https://pic.xiaohuochai.site/blog/git_cooperation13.png)


&nbsp;

### fetch和pull

&emsp;&emsp;要获取服务器远程分支的数据有两条命令可以使用除了上面使用过的pull命令之外，还有fetch命令

&emsp;&emsp;<span style="color: #888888;">$ git fetch origin</span>&nbsp;同步远程服务器origin上master分支的数据到本地

&emsp;&emsp;使用fetch命令，只是将origin的数据下载到了本地，但本地的工作目录只有使用merge合并，才能更新为最新的内容

&emsp;&emsp;<span style="color: #888888;">$ git merge origin/master</span> 合并远程服务器上的远程分支master到本地分支master

&emsp;&emsp;而如果使用pull命令，则相当于fetch和merge这两个命令的合并

&emsp;&emsp;<span style="color: #888888;">$ git pull origin</span>&nbsp;同步远程服务器origin上master分支的数据到本地，并合并到本地分支master

&emsp;&emsp;如果不是默认的master分支，而是其他分支，比如dev分支，则可以使用

<div>
<pre>$ git pull origin dev</pre>
</div>

&emsp;&emsp;相当于

<div>
<pre>$ git fetch origin dev
$ git merge origin</span>/dev</pre>
</div>

&nbsp;

### 总结

&emsp;&emsp;因此，多人协作的工作模式通常是这样：

1.  首先，可以试图用git push origin &lt;branchname&gt;&nbsp;推送自己的修改；

2.  如果推送失败，则因为远程分支比你的本地更新，需要先用`git pull`试图合并；

3.  如果合并有冲突，则解决冲突，并在本地提交；

4.  没有冲突或者解决掉冲突后，再用`git push origin branch-name`推送就能成功

&emsp;&emsp;如果`git pull`提示&ldquo;no tracking information&rdquo;，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream branch-name origin/branch-name`
