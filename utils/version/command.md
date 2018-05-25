# Git常用命令

&emsp;&emsp;前面几篇博文分别介绍[Git基础知识](http://www.cnblogs.com/xiaohuochai/p/6652792.html)、[Git基本操作](http://www.cnblogs.com/xiaohuochai/p/6654374.html)、[Git分支](http://www.cnblogs.com/xiaohuochai/p/6670731.html)、[Git版本切换](http://www.cnblogs.com/xiaohuochai/p/6685402.html)、[Git托管](http://www.cnblogs.com/xiaohuochai/p/6697476.html)、[Git协作](http://www.cnblogs.com/xiaohuochai/p/6721515.html)、[Git标签](http://www.cnblogs.com/xiaohuochai/p/6722039.html)等知识。本文把其中涉及到的Git常用命令做一个总结归纳

&nbsp;

### 配置

&emsp;&emsp;$ git config &nbsp;Git相关配置

<div>
<pre>$ git config --global user.name "match"
$ git config --global user.email "121631835@qq.com"
$ git config --global core.editor D:/soft/EmEditor/EmEditor.exe
$ git config --global alias.co checkout</pre>
</div>

&emsp;&emsp;$ git help &lt;command&gt; &nbsp;获取帮助，也可以写成$ git &lt;command&gt; --help

<div>
<pre>$ git help config</pre>
</div>

&nbsp;

### 基本操作

【初始化】

&emsp;&emsp;$ git init &nbsp;初始化仓库

&emsp;&emsp;$ git init ~/git-server --bare&nbsp;&nbsp;将当前的仓库初始化为一个裸仓库，裸仓库的意思是没有工作目录。中央服务器并不需要工作目录，它是一个被动的接收作用，如果有工作目录的话，反而会造成错乱

【增加】

&emsp;&emsp;$ git add &lt;file&gt; 跟踪新文件，或者把已跟踪的文件放到暂存区

&emsp;&emsp;$ git add . &nbsp;批量跟踪所有工作目录下未被跟踪的文件

【删除】

&emsp;&emsp;$ git rm --cached &lt;file&gt; 仅从暂存区删除

&emsp;&emsp;$ git rm &lt;file&gt; 从暂存区和工作目录删除

&emsp;&emsp;$ git rm \*~　递归删除当前目录及其子目录中所有 ~ 结尾的文件

&emsp;&emsp;$&nbsp;git rm $(git ls-files --deleted)&nbsp; 删除所有被跟踪，但在工作目录被删除的文件

【提交】&emsp;&emsp;

&emsp;&emsp;$ git commit&nbsp; 把文件提交到仓库，这种方式会启动文本编辑器以便输入本次提交的说明

&emsp;&emsp;$ git commit -m 'wrote a file'&nbsp; -m参数后跟提交说明的方式，在一行命令中提交更新

&emsp;&emsp;$ git commit -am 'wrote a file'&nbsp; 把所有已经跟踪过的文件暂存起来一并提交

【查看】

&emsp;&emsp;$ git status&nbsp; 检查当前文件状态

&emsp;&emsp;$ git diff&nbsp; 查看工作目录与暂存区的差异

&emsp;&emsp;$ git diff --cached&nbsp; 查看暂存区与某次提交的差异，默认为HEAD

&emsp;&emsp;$ git diff id1 id2&nbsp; 查看两次提交之间的差异

&emsp;&emsp;$ git log&nbsp; 查看提交历史，git log有许多选项，下表列出了一些常用的选项及其释义

<div>
<pre>选项 &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;说明
-p    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;  按补丁格式显示每个更新之间的差异
--word-diff       按 word diff 格式显示差异
--stat    &emsp;&emsp;　   显示每次更新的文件修改统计信息
--shortstat       只显示 --stat 中最后的行数修改添加移除统计
--name-only       仅在提交信息后显示已修改的文件清单
--name-status     显示新增、修改、删除的文件清单
--abbrev-commit   仅显示 SHA-1 的前几个字符，而非所有的 40 个字符
--relative-date   使用较短的相对时间显示(比如，&ldquo;2 weeks ago&rdquo;)
--graph    &emsp;&emsp;&emsp;&emsp;显示 ASCII 图形表示的分支合并历史
--pretty    &emsp;&emsp;　 使用其他格式显示历史提交信息可用的选项包括oneline，short，full，fuller 和format(后跟指定格式)
--oneline        `--pretty=oneline --abbrev-commit` 的简化用法</pre>
</div>

【撤销】

&emsp;&emsp;$ git commit --amend&nbsp; 修改最后一次提交，可以添加漏掉的文件，或者重写提交信息

&emsp;&emsp;$ git reset HEAD &lt;file&gt;&nbsp; 取消暂存

&emsp;&emsp;$ git checkout -- &lt;file&gt;&nbsp; 恢复文件内容

&emsp;&emsp;$ git checkout HEAD -- &lt;file&gt;&nbsp; 取消暂存，并恢复文件内容

&nbsp;

### 分支操作

【查看】

&emsp;&emsp;$ git branch 列出所示分支，当前分支前面会标一个*号

&emsp;&emsp;$ git branch -v 查看各分支最后一个提交对象的信息

&emsp;&emsp;$ git branch -a 查看各分支情况，包括远程分支

&emsp;&emsp;$ git branch --merged 查看哪些分支被并入当前分支

&emsp;&emsp;$ git branch --no-merged 查看哪些分支没有被并入当前分支

&emsp;&emsp;$ git cat-file -t &nbsp;&lt;git对象&gt; 查看Git对象的类型，主要的git对象包括tree、commit、parent和blob等

&emsp;&emsp;$ git cat-file -p &nbsp;&lt;git对象&gt; 查看Git对象的内容

【新建】

&emsp;&emsp;$ git branch &lt;branchName&gt; 新建分支&emsp;&emsp;

【删除】

&emsp;&emsp;$ git branch -d &lt;branchName&gt; 删除分支

&emsp;&emsp;$ git branch -D &lt;branchName&gt;&nbsp;强制删除分支，用于删除没有合并过的分支

【切换】

&emsp;&emsp;$ git checkout &lt;branchName&gt; &nbsp;用于分支切换，将HEAD移动到目标分支，并将工作目录中的文件换成目标分支所指向的快照内容

&emsp;&emsp;$ git checkout -b &lt;branchName&gt; 创建新分支并将HEAD移动到该目标分支

&emsp;&emsp;$ git checkout - &nbsp;将HEAD移动到上一分支

【合并】

&emsp;&emsp;$ git merge &lt;branchName&gt; 将目标分支合并到当前分支

&emsp;&emsp;$ git merge --no-ff -m "commit描述" &lt;branchName&gt; 合并分支，强制禁用Fast forward快进模式，Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息。因为本次合并要创建一个新的commit，所以加上-m参数，把commit描述写进去

&emsp;&emsp;$ git log --graph 查看分支合并情况

【衍合(rebase)】

&emsp;&emsp;衍合是按照每行的修改次序重演一遍修改，而合并是把最终结果合在一起

&emsp;&emsp;$ git rebase master 把当前分支的改变移到master分支里重放一遍

&emsp;&emsp;$ git rebase --onto master server client 取出client分支，找出client分支和server分支的共同祖先之后的变化，然后把它们在master上重演一遍

【保存现场】

&emsp;&emsp;$ git stash 保存目录的工作目录和暂存区状态，并返回到干净的工作空间

&emsp;&emsp;$ git stash save "push to stash area" 保存目录的工作目录和暂存区状态，返回到干净的工作空间，并保存"push to stash area"信息

&emsp;&emsp;$ git stash list 查看stash栈中保存的记录列表

&emsp;&emsp;$ git stash apply stash@{0} 将stash栈中保存的stash@{0}内容重新恢复到工作目录中

&emsp;&emsp;$ git stash drop stash@{0} 删除stash栈中保存的stash@{0}内容

&emsp;&emsp;$ git stash pop 相当于apply和drop的合体，它将stash栈中最顶端的记录取出到工作目录中，这也意味着包含删除stash栈中对应内容的操作

&nbsp;

### 版本切换

【回退】

&emsp;&emsp;$ git reset --mixed &lt;commit&gt; (默认)将当前分支回退到历史某个版本，提交的内容会复制到暂存区

&emsp;&emsp;$ git reset --hard &lt;commit&gt; 将当前分支回退到历史某个版本，提交的内容会复制到暂存区和工作目录

&emsp;&emsp;$ git reset --soft &lt;commit&gt; 将当前分支回退到历史某个版本，工作目录和暂存区不会在任何变化

【查看】

&emsp;&emsp;$ git reflog 按照之前经过的所有的commit路径按序来排列，用来记录每一次命令

&nbsp;

### 远程操作

【查看】

&emsp;&emsp;$ git remote &nbsp;查看当前配置有哪些远程仓库

&emsp;&emsp;$ git remote -v &nbsp;(v为--verbose的简写，中文意思是冗长的)，显示远程仓库对应的克隆地址

&emsp;&emsp;$ git remote show origin &nbsp;查看远程仓库origin详细信息

【关联】

&emsp;&emsp;$ git remote add [shortname] [url]&nbsp; 添加一个新的远程仓库，可指定一个名字，以便引用，一般为origin

&emsp;&emsp;$ git remote rename pb paul&nbsp; 将远程库的名称从pb改为paul

&emsp;&emsp;$ git remote rm [shortname]&nbsp; 取消对该远程库的关联

【获取】

&emsp;&emsp;$ git clone &lt;address&gt; Git会自动将此远程仓库命名为origin，并下载其中所有的数据，建立一个指向它的master分支的指针，在本地命名为origin/master

&emsp;&emsp;$ git fetch origin 同步远程服务器origin上master分支的数据到本地的master分支

&emsp;&emsp;$ git fetch origin &lt;branchName&gt; 获取远程服务器origin上&lt;branchName&gt;分支的数据到本地的&lt;branchName&gt;分支

&emsp;&emsp;$ git merge origin/master 使用fetch命令，只是将origin的数据下载到了本地，但本地的工作目录只有使用merge合并，才能更新为最新的内容

&emsp;&emsp;$ git pull origin &lt;branchName&gt; 相当于fetch和merge命令的合体

【跟踪远程分支】

&emsp;&emsp;$ git checkout -b serverfix origin/serverfix 把远程分支serverfix的内容合并到当前分支serverfix。这会切换到新建的serverfix本地分支，其内容同远程分支origin/serverfix一致，这样就可以在里面继续开发了

&emsp;&emsp;$ git checkout --track origin/serverfix 用--track选项简化$ git checkout -b serverfix origin/serverfix命令

&emsp;&emsp;$ git checkout -b a1 origin/a2 把远程分支a2的内容合并到当前分支a1

【推送】

&emsp;&emsp;$ git push origin &lt;branchName&gt; 取出在本地的&lt;branchName&gt;分支，推送到远程仓库的&lt;branchName&gt;分支

&emsp;&emsp;$ git push origin serverfix:somebranch 取出在本地的serverfix分支，推送到远程仓库的somebranch分支

【删除】

&emsp;&emsp;$ git push origin :serverfix 在服务器上删除serverfix分支

&nbsp;

### 标签管理

【新建】

&emsp;&emsp;$ git tag &lt;tagname&gt;&nbsp; 新建一个轻量级标签，默认为HEAD

&emsp;&emsp;$ git tag &lt;tagname&gt; &lt;commit id&gt;&nbsp; 为指定的commit ID新建一个轻量级标签

&emsp;&emsp;$ git tag -a &lt;tagname&gt; -m &lt;标签信息&gt;&nbsp; 新建一个带有标签信息的附注标签

【签名】

&emsp;&emsp;$ git tag -s &lt;tagname&gt; -m &lt;标签信息&gt;&nbsp; 新建一个GPG签名标签

&emsp;&emsp;$ git tag -v &lt;tagname&gt;&nbsp; 验证一个GPG签名标签

【查看】

&emsp;&emsp;$ git tag 查看所有标签

&emsp;&emsp;$ git show &lt;tagname&gt;&nbsp; 查看标签详细信息

【删除】

&emsp;&emsp;$ git tag -d &lt;tagname&gt;&nbsp; 删除本地标签

&emsp;&emsp;$ git push origin :refs/tags/&lt;tagname&gt;&nbsp; 删除远程标签

【推送】

&emsp;&emsp;$ git push origin &lt;tagname&gt;&nbsp; 推送标签到远端仓库

&emsp;&emsp;$ git push origin --tags&nbsp; 一次性推送全部尚未推送到远程的本地标签

