# Git版本切换

&emsp;&emsp;本文将以一个简单实例的形式来介绍Git版本切换

&nbsp;

### 初始版本

&emsp;&emsp;首先，在一个自定义的位置，创建目录a，比如在D盘下

&emsp;&emsp;注意：本文会用到一些常用的Linux的Shell命令，详细信息[移步至此](http://www.cnblogs.com/xiaohuochai/p/6657396.html)

&emsp;&emsp;先使用cd d:命令，切换到d盘，然后使用mkdir a命令，在d盘下新建一个名称为a的文件夹。最后，使用ls命令，查看d盘下的所有文件及文件夹，发现a是存在的，所以操作成功


![git_changeVersion1](https://pic.xiaohuochai.site/blog/git_changeVersion1.png)


&emsp;&emsp;然后，使用cd a命令，进入d盘下的a文件夹


![git_changeVersion2](https://pic.xiaohuochai.site/blog/git_changeVersion2.png)


&emsp;&emsp;接下来，使用git init命令，初始化一个Git仓库。创建仓库的本质就是在当前文件夹下创建一个.git文件夹


![git_changeVersion3](https://pic.xiaohuochai.site/blog/git_changeVersion3.png)


![git_changeVersion4](https://pic.xiaohuochai.site/blog/git_changeVersion4.png)


&emsp;&emsp;然后使用git status命令，查看当前的文件状态


![git_changeVersion5](https://pic.xiaohuochai.site/blog/git_changeVersion5.png)


&emsp;&emsp;接下来，在a文件夹下，使用touch 1.txt命令，新建一个1.txt文本文件，再使用git status命令，查看当前的文件状态。在状态报告中可以看到新建的1.txt文件出现在&ldquo;Untracked files&rdquo;下面，表示该文件为未跟踪的文件


![git_changeVersion6](https://pic.xiaohuochai.site/blog/git_changeVersion6.png)


&emsp;&emsp;接着，使用git add 1.txt命令，跟踪该文件。此时再运行git status命令，会看到1.txt文件已被跟踪，并处于暂存状态。只要在&ldquo;Changes to be committed&rdquo;这行下面的，就说明是已暂存状态


![git_changeVersion7](https://pic.xiaohuochai.site/blog/git_changeVersion7.png)


&emsp;&emsp;再运行提交命令git commit -m 'add 1.txt'，提交文件1.txt。提交后它会提示，当前是在哪个分支(master)提交的，本次提交的完整SHA-1校验和是什么(beac21a)，以及在本次提交中，有1个文件修订过，0行添改，0行删改过

&emsp;&emsp;再运行命令git status时，因为文件已经被提交了，所以提示没有什么可供提交的了，工作目录很干净


![git_changeVersion8](https://pic.xiaohuochai.site/blog/git_changeVersion8.png)


&nbsp;

### 新版本

&emsp;&emsp;接下来，我们使用cat &gt; 1.txt命令，将1.txt文件的内容从无内容修改为'1'。使用git status时，提示当前文件没有放置在暂存区


![git_changeVersion9](https://pic.xiaohuochai.site/blog/git_changeVersion9.png)


&emsp;&emsp;使用git add 1.txt命令，放置在暂存区，再使用git status时，提示1.txt文件已被跟踪，并处于暂存状态


![git_changeVersion10](https://pic.xiaohuochai.site/blog/git_changeVersion10.png)


&emsp;&emsp;使用git commit -m 'alter to 1'命令，来提交文件1.txt。提交后它会提示，本次提交的完整SHA-1校验和是f73e651，以及在本次提交中，有1个文件修订过，1行添改过


![git_changeVersion11](https://pic.xiaohuochai.site/blog/git_changeVersion11.png)


&emsp;&emsp;接下来，照猫画虎，创建1.txt的第三个版本，将其内容修改为'2'并提交。本次提交的完整SHA-1校验和是74833f8，以及在本次提交中，有1个文件修订过，1行添改过、1行删改过


![git_changeVersion12](https://pic.xiaohuochai.site/blog/git_changeVersion12.png)


&nbsp;

### 查看版本

&emsp;&emsp;现在，我们总共把三个版本的1.txt文件提交到Git仓库中了

<div>
<pre>版本1:空内容
版本2:'1'
版本3:'2'</pre>
</div>

&emsp;&emsp;当然了，在实际工作中，我们处理的文件比较复杂，并不能记得每次都改了什么内容。在Git中，我们用git log命令查看提交历史

&emsp;&emsp;git log命令显示从最近到最远的提交日志，我们可以看到3次提交，最近的一次是alter t0 2，上一次是alter to 1，最早的一次是add 1.txt


![git_changeVersion13](https://pic.xiaohuochai.site/blog/git_changeVersion13.png)


&emsp;&emsp;如果嫌输出信息太多，可以加上--pretty=oneline参数


![git_changeVersion14](https://pic.xiaohuochai.site/blog/git_changeVersion14.png)


&emsp;&emsp;git log有许多选项，下表列出了一些常用的选项及其释义

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

&emsp;&emsp;我们常用-p选项展开显示每次提交的内容差异。可以看到，最近一次更新和上一次更新的区别是将1修改为2。上一次和上上一次更新的区别是从空内容变成内容为1


![git_changeVersion15](https://pic.xiaohuochai.site/blog/git_changeVersion15.png)


&emsp;&emsp;有时候图形化工具更容易展示历史提交的变化，随Git一同发布的gitk就是这样一种工具。它是用Tcl/Tk写成的，基本上相当于git log命令的可视化版本，凡是git log可以用的选项也都能用在gitk上。在项目工作目录中输入gitk命令后，就会启动下图所示的界面


![git_changeVersion16](https://pic.xiaohuochai.site/blog/git_changeVersion16.png)


&nbsp;

### 版本切换

&emsp;&emsp;现在，我们准备把1.txt回退到上一个版本，也就是内容为'1'的那个版本

&emsp;&emsp;首先，Git必须知道当前版本是哪个版本，在Git中，用HEAD表示当前版本，也就是最新的提交(74833f8172d219dbf755dff7cdc64356bff39aad)，上一个版本就是HEAD^，上上一个版本就是HEAD^^，当然往上100个版本写100个^比较容易数不过来，所以写成HEAD~100

&emsp;&emsp;现在，我们要把当前版本&ldquo;alter to 2&rdquo;回退到上一个版本&ldquo;alter to 1&rdquo;，就可以使用git reset命令

&emsp;&emsp;首先，使用cat 1.txt命令查看该文件的内容为'2'，接着使用命令git reset --hard HEAD^，将文件返回到上一个版本，再使用cat 1.txt命令查看该文件的内容为'1'


![git_changeVersion17](https://pic.xiaohuochai.site/blog/git_changeVersion17.png)


&emsp;&emsp;我们用git log再看看现在版本库的状态，发现最新的那个版本&ldquo;alter to 2&rdquo;已经看不到了


![git_changeVersion18](https://pic.xiaohuochai.site/blog/git_changeVersion18.png)


&emsp;&emsp;如果想返回到最新的版本，可以使用命令git reset --hard commit_id来实现

&emsp;&emsp;但是，如果找到最新版本的1.txt的commit id呢？Git提供了一个命令git reflog，该命令按照之前经过的所有的commit路径按序来排列，用来记录你的每一次命令


![git_changeVersion19](https://pic.xiaohuochai.site/blog/git_changeVersion19.png)


&emsp;&emsp;从git reflog命令返回的结果中发现，第五行的beac21a是上上个版本的1.txt文件的是commit id，第四行的f73e651是上个版本的，第三行的74833f8就是最新版本的

&emsp;&emsp;下面使用git reset命令，将文件恢复到最新版本


![git_changeVersion20](https://pic.xiaohuochai.site/blog/git_changeVersion20.png)


&nbsp;

### 总结

&emsp;&emsp;Git允许我们使用命令git reset --hard commit_id在版本的历史之间切换

&emsp;&emsp;HEAD可以用来替换commit_id，HEAD指向的版本是当前版本，上一个版本就是HEAD^，上上一个版本就是HEAD^^，往上100个版本写成HEAD~100

&emsp;&emsp;当然了，^和~这两个特殊符号，除了用在HEAD上外，还可以用在&lt;branchName&gt;上或Commit ID上。如master^，代表master的上一个版本；1f2f476~1代表Commit ID为1f2f476的上一个版本

&emsp;&emsp;可以用git log可以查看提交历史，或者用git reflog查看命令历史，以便确定要切换的版本的版本号