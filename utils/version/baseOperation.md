# Git基本操作

&emsp;&emsp;git有数以百计的命令，我们基本上不可能使用所有的命令。当我们在命令行工具中敲入git并回车时，git实际上已经把一些常用的命令列了出来，绝大多数时间里用到的也就是这几个命令。本文将详细介绍Git的基本操作


![git_baseOperation1](https://pic.xiaohuochai.site/blog/git_baseOperation1.png)


&nbsp;

### 取得仓库

&emsp;&emsp;有两种取得Git项目仓库的方法。第一种是在现存的目录下，通过导入所有文件来创建新的Git仓库。第二种是从已有的Git仓库克隆出一个新的镜像仓库来

【初始化新仓库】

&emsp;&emsp;要对现有的某个项目开始用Git管理，只需到此项目所在的目录，执行：

<div>
<pre>$ git init</pre>
</div>

&emsp;&emsp;初始化后，在当前目录下会出现一个名为.git的目录，所有Git需要的数据和资源都存放在这个目录中。不过目前，仅仅是按照既有的结构框架初始化好了里边所有的文件和目录，但还没有开始跟踪管理项目中的任何一个文件


![git_baseOperation2](https://pic.xiaohuochai.site/blog/git_baseOperation2.png)


&emsp;&emsp;如果当前目录下有几个文件想要纳入版本控制，首先需要先用git add命令告诉Git开始对这些文件进行跟踪

<div>
<pre>$ git add a.txt</pre>
</div>

![git_baseOperation3](https://pic.xiaohuochai.site/blog/git_baseOperation3.png)


&emsp;&emsp;执行上面的命令，没有任何显示，这就对了。Unix的哲学是&ldquo;没有消息就是好消息&rdquo;，说明添加成功

&emsp;&emsp;要注意的是，所有的版本控制系统，其实只能跟踪文本文件的改动，比如TXT文件，网页，所有的程序代码等等，Git也不例外。版本控制系统可以告诉你每次的改动，比如在第5行加了一个单词&ldquo;Linux&rdquo;，在第8行删了一个单词&ldquo;Windows&rdquo;。而图片、视频这些二进制文件，虽然也能由版本控制系统管理，但没法跟踪文件的变化，只能把二进制文件每次改动串起来，也就是只知道图片从100KB改成了120KB，但到底改了啥，版本控制系统不知道，也没法知道

&emsp;&emsp;不幸的是，Microsoft的Word格式是二进制格式，因此，版本控制系统是没法跟踪Word文件的改动的，前面我们举的例子只是为了演示，如果要真正使用版本控制系统，就要以纯文本方式编写文件

&emsp;&emsp;因为文本是有编码的，比如中文有常用的GBK编码，日文有Shift_JIS编码，如果没有历史遗留问题，强烈建议使用标准的UTF-8编码，所有语言使用同一种编码，既没有冲突，又被所有平台所支持

&emsp;&emsp;使用Windows的同学要特别注意，千万不要使用Windows自带的**记事本**编辑任何文本文件。原因是Microsoft开发记事本的团队使用了一个非常弱智的行为来保存UTF-8编码的文件，他们自作聪明地在每个文件开头添加了0xefbbbf(十六进制)的字符，你会遇到很多不可思议的问题，比如，网页第一行可能会显示一个&ldquo;?&rdquo;，明明正确的程序一编译就报语法错误等等，都是由记事本的弱智行为带来的

&emsp;&emsp;然后使用命令git commit告诉Git，把文件提交到仓库

<div>
<pre>$ git commit -m 'wrote a file'</pre>
</div>

&emsp;&emsp;-m后面输入的是本次提交的说明，可以输入任意内容，当然最好是有意义的，这样就能从历史记录里方便地找到改动记录


![git_baseOperation4](https://pic.xiaohuochai.site/blog/git_baseOperation4.png)


&emsp;&emsp;git commit命令执行成功后会提示，1个文件被改动，插入了2行内容

【克隆现有仓库】

&emsp;&emsp;如果想对某个开源项目出一份力，可以先把该项目的Git仓库复制一份出来，这就需要用到git clone命令。如果熟悉其他的VCS比如Subversion，可能已经注意到这里使用的是clone而不是checkout。这是个非常重要的差别，Git收取的是项目历史的所有数据(每一个文件的每一个版本)，服务器上有的数据克隆之后本地也都有了。实际上，即便服务器的磁盘发生故障，用任何一个克隆出来的客户端都可以重建服务器上的仓库，回到当初克隆时的状态

&emsp;&emsp;克隆仓库的命令格式为git clone [url]。比如，要克隆VUE的Git代码仓库 vue，可以用下面的命令：

<div>
<pre>$ git clone git://github.com/vuejs/vue.git</pre>
</div>

&emsp;&emsp;这会在当前目录下创建一个名为vue的目录，其中包含一个.git的目录，用于保存下载下来的所有版本记录，然后从中取出最新版本的文件拷贝。如果进入这个新建的vue目录，会看到项目中的所有文件已经在里边了，准备好后续开发和使用。如果希望在克隆的时候，自己定义要新建的项目目录名称，可以在上面的命令末尾指定新的名字

<div>
<pre>$ git clone git://github.com/vuejs/vue.git myvue</pre>
</div>

![git_baseOperation5](https://pic.xiaohuochai.site/blog/git_baseOperation5.png)


&emsp;&emsp;Git支持许多数据传输协议。之前的例子使用的是`git://`协议，不过也可以用`http(s)://`或者`user@server:/path.git`表示的SSH传输协议

&nbsp;

### 仓库更新记录

&emsp;&emsp;现在手上已经有了一个真实项目的Git仓库，并从这个仓库中取出了所有文件的工作拷贝。接下来，对这些文件作些修改，在完成了一个阶段的目标之后，提交本次更新到仓库

&emsp;&emsp;工作目录下面的所有文件都不外乎这两种状态：已跟踪或未跟踪。已跟踪的文件是指本来就被纳入版本控制管理的文件，在上次快照中有它们的记录，工作一段时间后，它们的状态可能是未更新，已修改或者已放入暂存区。而所有其他文件都属于未跟踪文件。它们既没有上次更新时的快照，也不在当前的暂存区域。初次克隆某个仓库时，工作目录中的所有文件都属于已跟踪文件，且状态为未修改

&emsp;&emsp;在编辑过某些文件之后，Git将这些文件标为已修改。我们逐步把这些修改过的文件放到暂存区域，直到最后一次性提交所有这些暂存起来的文件，如此重复。所以使用Git时的文件状态变化周期如下图所示


![git_baseOperation6](https://pic.xiaohuochai.site/blog/git_baseOperation6.png)


【检查当前文件状态】

&emsp;&emsp;要确定哪些文件当前处于什么状态，可以用git status命令

<div>
<pre>$ git status</pre>
</div>

&emsp;&emsp;如果在取得仓库之后立即执行此命令，会看到类似这样的输出


![git_baseOperation7](https://pic.xiaohuochai.site/blog/git_baseOperation7.png)


&emsp;&emsp;这说明现在的工作目录相当干净。换句话说，所有已跟踪文件在上次提交后都未被更改过。此外，上面的信息还表明，当前目录下没有出现任何处于未跟踪的新文件，否则Git会在这里列出来。最后，该命令还显示了当前所在的分支是master，这是默认的分支名称

&emsp;&emsp;现在创建一个新文件README，保存退出后运行git status会看到该文件出现在未跟踪文件列表中


![git_baseOperation8](https://pic.xiaohuochai.site/blog/git_baseOperation8.png)


&emsp;&emsp;在状态报告中可以看到新建的README文件出现在&ldquo;Untracked files&rdquo;下面。未跟踪的文件意味着Git在之前的快照(提交)中没有这些文件；Git不会自动将之纳入跟踪范围，除非告诉它&ldquo;我需要跟踪该文件&rdquo;，因而不用担心把临时文件什么的也归入版本管理。不过现在的例子中，我们确实想要跟踪管理README这个文件

【跟踪新文件】

&emsp;&emsp;使用命令git add开始跟踪一个新文件。所以，要跟踪README文件，运行

<div>
<pre>$ git add README.txt</pre>
</div>

&emsp;&emsp;使用命令git add .会批量跟踪所有工作目录下未被跟踪的文件

<div>
<pre>$ git add .</pre>
</div>

&emsp;&emsp;此时再运行git status命令，会看到README文件已被跟踪，并处于暂存状态：


![git_baseOperation9](https://pic.xiaohuochai.site/blog/git_baseOperation9.png)


&emsp;&emsp;只要在&ldquo;Changes to be committed&rdquo;这行下面的，就说明是已暂存状态。如果此时提交，那么该文件此时此刻的版本将被留存在历史记录中

&emsp;&emsp;之前我们使用git init后就运行了git add命令，开始跟踪当前目录下的文件。在git add后面可以指明要跟踪的文件或目录路径。如果是目录的话，就说明要递归跟踪该目录下的所有文件

&emsp;&emsp;其实git add的潜台词就是把目标文件快照放入暂存区域，也就是add file into staged area，同时未曾跟踪过的文件标记为需要跟踪

【暂存已修改文件】

&emsp;&emsp;现在我们修改下之前已跟踪过的文件README.txt，将其内容修改为hello 回车换行 world

&emsp;&emsp;然后再次运行status命令，会看到这样的状态报告：


![git_baseOperation10](https://pic.xiaohuochai.site/blog/git_baseOperation10.png)


&emsp;&emsp;文件README.txt出现在 &ldquo;Changes not staged for commit&rdquo; 这行下面，说明已跟踪文件的内容发生了变化，但还没有放到暂存区。要暂存这次更新，需要运行git add命令

&emsp;&emsp;git add命令是个多功能命令，根据目标文件的状态不同，此命令的效果也不同：可以用它开始跟踪新文件，或者把已跟踪的文件放到暂存区，还能用于合并时把有冲突的文件标记为已解决状态等

&emsp;&emsp;现在运行git add将README.txt放到暂存区，然后再看看git status的输出：


![git_baseOperation11](https://pic.xiaohuochai.site/blog/git_baseOperation11.png)


&emsp;&emsp;现在README.txt文件已暂存，下次提交时就会记录到仓库。假设此时，想要在README.txt里再加条注释，重新编辑存盘后，准备好提交。不过且慢，再运行git status看看：


![git_baseOperation12](https://pic.xiaohuochai.site/blog/git_baseOperation12.png)


&emsp;&emsp;实际上Git只不过暂存了运行git add命令时的版本，如果现在提交，那么提交的是添加注释前的版本，而非当前工作目录中的版本。所以，运行git add之后又做了修订的文件，需要重新运行git add把最新版本重新暂存起来


![git_baseOperation13](https://pic.xiaohuochai.site/blog/git_baseOperation13.png)


【忽略某些文件】

&emsp;&emsp;一般我们总会有些文件无需纳入Git的管理，也不希望它们总出现在未跟踪文件列表。通常都是些自动生成的文件，比如日志文件，或者编译过程中创建的临时文件等。我们可以创建一个名为.gitignore的文件，列出要忽略的文件模式


![git_baseOperation14](https://pic.xiaohuochai.site/blog/git_baseOperation14.png)


&emsp;&emsp;第一行告诉Git忽略所有以.o或.a结尾的文件。一般这类对象文件和存档文件都是编译过程中出现的，我们用不着跟踪它们的版本

&emsp;&emsp;第二行告诉Git忽略所有以波浪符(~)结尾的文件，许多文本编辑软件都用这样的文件名保存副本

&emsp;&emsp;此外，可能还需要忽略log，tmp或者pid目录，以及自动生成的文档等等。要养成一开始就设置好.gitignore文件的习惯，以免将来误提交这类无用的文件

&emsp;&emsp;文件 .gitignore 的格式规范如下：

&emsp;&emsp;1、所有空行或者以注释符号 ＃ 开头的行都会被 Git 忽略

&emsp;&emsp;2、可以使用标准的glob模式匹配

&emsp;&emsp;3、匹配模式最后跟反斜杠(/)说明要忽略的是目录

&emsp;&emsp;4、要忽略指定模式以外的文件或目录，可以在模式前加上叹号(!)取反

&emsp;&emsp;所谓的glob模式是指shell所使用的简化了的正则表达式。星号(*)匹配零个或多个任意字符；[abc]匹配任何一个列在方括号中的字符(这个例子要么匹配一个a，要么匹配一个b，要么匹配一个c)；问号(?)只匹配一个任意字符；如果在方括号中使用短划线分隔两个字符，表示所有在这两个字符范围内的都可以匹配(比如[0-9]表示匹配所有0到9的数字)

<div>
<pre># 此为注释 &ndash; 将被 Git 忽略
# 忽略所有 .a 结尾的文件
*.a
# 但 lib.a 除外
!lib.a
# 仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO
/TODO
# 忽略 build/ 目录下的所有文件
build/
# 会忽略 doc/notes.txt 但不包括 doc/server/arch.txt
doc/*.txt
# ignore all .txt files in the doc/ directory
doc/**/*.txt</pre>
</div>

【查看已暂存和未暂存的更新】

&emsp;&emsp;实际上git status的显示比较简单，仅仅是列出了修改过的文件，如果要查看具体修改了什么地方，可以用git diff命令

&emsp;&emsp;现在，它已经能回答我们的两个问题了：当前做的哪些更新还没有暂存？有哪些更新已经暂存起来准备好了下次提交？git diff会使用文件补丁的格式显示具体添加和删除的行

&emsp;&emsp;假如再次修改README文件后暂存，运行status命令将会看到：


![git_baseOperation15](https://pic.xiaohuochai.site/blog/git_baseOperation15.png)


&emsp;&emsp;要查看尚未暂存的文件更新了哪些部分，不加参数直接输入git diff：


![git_baseOperation16](https://pic.xiaohuochai.site/blog/git_baseOperation16.png)


&emsp;&emsp;若要看已经暂存起来的文件和上次提交时的快照之间的差异，可以用git diff--cached命令 &nbsp;


![git_baseOperation17](https://pic.xiaohuochai.site/blog/git_baseOperation17.png)


&emsp;&emsp;注意：单单git diff不过是显示还没有暂存起来的改动，而不是这次工作和上次提交之间的差异。所以有时候一下子暂存了所有更新过的文件后，运行git diff后却什么也没有，就是这个原因

【提交更新】

&emsp;&emsp;现在的暂存区域已经准备妥当可以提交了。在此之前，请一定要确认还有什么修改过的或新建的文件还没有git add过，否则提交的时候不会记录这些还没暂存起来的变化。所以，每次准备提交前，先用git status看下，是不是都已暂存起来了，然后再运行提交命令git commit：

<div>
<pre>$ git commit</pre>
</div>

&emsp;&emsp;这种方式会启动文本编辑器以便输入本次提交的说明，编辑器会显示类似下面的文本信息


![git_baseOperation18](https://pic.xiaohuochai.site/blog/git_baseOperation18.png)


&emsp;&emsp;可以看到，默认的提交消息包含最后一次运行git status的输出，放在注释行里，另外开头还有一空行，供你输入提交说明。完全可以去掉这些注释行，不过留着也没关系，多少能帮助回想起这次更新的内容有哪些。退出编辑器时，Git会丢掉注释行，将说明内容和本次更新提交到仓库

&emsp;&emsp;另外也可以用-m参数后跟提交说明的方式，在一行命令中提交更新


![git_baseOperation19](https://pic.xiaohuochai.site/blog/git_baseOperation19.png)


&emsp;&emsp;现在已经创建了第一个提交！可以看到，提交后它会提示，当前是在哪个分支(master)提交的，本次提交的完整SHA-1校验和是什么(714666c)，以及在本次提交中，有多少文件修订过，多少行添改和删改过

&emsp;&emsp;注意：提交时记录的是放在暂存区域的快照，任何还未暂存的仍然保持已修改状态，可以在下次提交时纳入版本管理。每一次运行提交操作，都是对项目作一次快照，以后可以回到这个状态，或者进行比较

【跳过使用暂存区域】

&emsp;&emsp;尽管使用暂存区域的方式可以精心准备要提交的细节，但有时候这么做略显繁琐。Git提供了一个跳过使用暂存区域的方式，只要在提交的时候，给git commit加上-a选项，Git就会自动把所有已经跟踪过的文件暂存起来一并提交，从而跳过git add步骤

&emsp;&emsp;跳过git add步骤，不等于完全不使用git add。因为git commit -a是将所有跟踪过的文件暂存起来并提交，只是省略了暂存这一步。但一个未跟踪状态的文件需要使用git add命令来使其变成已跟踪状态


![git_baseOperation20](https://pic.xiaohuochai.site/blog/git_baseOperation20.png)


&emsp;&emsp;关于git commit -a 与git commit -am的区别的详细信息[移步至此](http://www.cnblogs.com/xiaohuochai/p/6664451.html)

【移除文件】

&emsp;&emsp;要从Git中移除某个文件，就必须要从已跟踪文件清单中移除(确切地说，是从暂存区域移除)，然后提交。可以用git rm命令完成此项工作，并连带从工作目录中删除指定的文件，这样以后就不会出现在未跟踪文件清单中了

&emsp;&emsp;如果只是简单地从工作目录中手工删除文件，运行git status时就会在&ldquo;Changes not staged for commit&rdquo;部分(也就是未暂存清单)看到


![git_baseOperation21](https://pic.xiaohuochai.site/blog/git_baseOperation21.png)


&emsp;&emsp;运行git rm记录此次移除文件的操作


![git_baseOperation22](https://pic.xiaohuochai.site/blog/git_baseOperation22.png)


&emsp;&emsp; 由上图可知，直接从工作目录中手工删除文件a.txt，虽然文件被删除，但其快照仍然处于未暂存区域，这时就需要使用git rm将a.txt从暂存区域移除


![git_baseOperation23](https://pic.xiaohuochai.site/blog/git_baseOperation23.png)


&emsp;&emsp;最后提交的时候，该文件就不再纳入版本管理了。如果删除之前修改过并且已经放到暂存区域的话，则必须要用强制删除选项-f(即force的首字母)，以防误删除文件后丢失修改的内容


![git_baseOperation24](https://pic.xiaohuochai.site/blog/git_baseOperation24.png)


&emsp;&emsp;另外一种情况是，我们想把文件从Git仓库中删除(亦即从暂存区域移除)，但仍然希望保留在当前工作目录中。换句话说，仅是从跟踪清单中删除。比如一些大型日志文件或者一堆.a编译文件，不小心纳入仓库后，要移除跟踪但不删除文件，以便稍后在.gitignore文件中补上，用--cached选项即可：

<div>
<pre>$ git rm --cached a.txt</pre>
</div>

![git_baseOperation25](https://pic.xiaohuochai.site/blog/git_baseOperation25.png)


&emsp;&emsp;以下代码会递归删除当前目录及其子目录中所有&nbsp;`~`&nbsp;结尾的文件

<div>
<pre>$ git rm \*~</pre>
</div>

&emsp;&emsp;以下代码会删除所有被跟踪，但在工作目录被删除的文件

<div>
<pre>$ git rm $(git ls-files --deleted)</pre>
</div>

【移动文件】

&emsp;&emsp;不像其他的VCS系统，Git并不跟踪文件移动操作。如果在Git中重命名了某个文件，仓库中存储的元数据并不会体现出这是一次改名操作。不过Git非常聪明，它会推断出究竟发生了什么

&emsp;&emsp;要在Git中对文件改名，可以这么做：

<div>
<pre>$ git mv file_from file_to</pre>
</div>

![git_baseOperation26](https://pic.xiaohuochai.site/blog/git_baseOperation26.png)


&nbsp;

### 查看提交历史

&emsp;&emsp;在提交了若干更新之后，又或者克隆了某个项目，想回顾下提交历史，可以使用`git log`命令查看

&emsp;&emsp;接下来的例子会用我专门用于演示的 simplegit 项目，运行下面的命令获取该项目源代码：

<div>
<pre>git clone git://github.com/schacon/simplegit-progit.git</pre>
</div>

&emsp;&emsp;然后在此项目中运行`git log`，应该会看到下面的输出：


![git_baseOperation27](https://pic.xiaohuochai.site/blog/git_baseOperation27.png)


&emsp;&emsp;默认不用任何参数的话，git log会按提交时间列出所有的更新，最近的更新排在最上面

&emsp;&emsp;每次更新都有一个SHA-1校验和、作者的名字和电子邮件地址、提交时间，最后缩进一个段落显示提交说明

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

&emsp;&emsp;接下来介绍些最常用的选项

&emsp;&emsp;我们常用-p选项展开显示每次提交的内容差异，用-2则仅显示最近的两次更新


![git_baseOperation28](https://pic.xiaohuochai.site/blog/git_baseOperation28.png)


&emsp;&emsp;该选项除了显示基本信息之外，还在附带了每次commit的变化。当进行代码审查，或者快速浏览某个搭档提交的commit的变化的时候，这个参数就非常有用了

&emsp;&emsp;某些时候，单词层面的对比，比行层面的对比，更加容易观察。Git提供了--word-diff选项。我们可以将其添加到git log -p命令的后面，从而获取单词层面上的对比。在程序代码中进行单词层面的对比常常是没什么用的。不过需要在书籍、论文这种很大的文本文件上进行对比的时候，这个功能就显出用武之地了


![git_baseOperation29](https://pic.xiaohuochai.site/blog/git_baseOperation29.png)


&emsp;&emsp;如上图所示，这里并没有平常看到的添加行或者删除行的信息。这里的对比显示在行间。新增加的单词被{+ +}括起来，被删除的单词被[- -]括起来。在进行单词层面的对比的时候，可能希望上下文(context)行数从默认的3行，减为1行，那么可以使用-U1选项。上面的例子中，我们就使用了这个选项

&emsp;&emsp;另外，git log还提供了许多摘要选项可以用，比如--stat，仅显示简要的增改行数统计：


![git_baseOperation30](https://pic.xiaohuochai.site/blog/git_baseOperation30.png)


&emsp;&emsp;每个提交都列出了修改过的文件，以及其中添加和移除的行数，并在最后列出所有增减行数小计。 还有个常用的--pretty选项，可以指定使用完全不同于默认格式的方式展示提交历史。比如用oneline将每个提交放在一行显示，这在提交数很大时非常有用。另外还有short，full和fuller可以用，展示的信息或多或少有些不同


![git_baseOperation31](https://pic.xiaohuochai.site/blog/git_baseOperation31.png)


&emsp;&emsp;最有意思的是format，可以定制要显示的记录格式，这样的输出便于后期编程提取分析


![git_baseOperation32](https://pic.xiaohuochai.site/blog/git_baseOperation32.png)


&emsp;&emsp;下表中列出了常用的格式占位符写法及其代表的意义

<div>
<pre>选项        说明
%H         提交对象(commit)的完整哈希字串
%h         提交对象的简短哈希字串
%T         树对象(tree)的完整哈希字串
%t         树对象的简短哈希字串
%P         父对象(parent)的完整哈希字串
%p         父对象的简短哈希字串
%an        作者(author)的名字
%ae        作者的电子邮件地址
%ad        作者修订日期(可以用 -date= 选项定制格式)
%ar        作者修订日期，按多久以前的方式显示
%cn        提交者(committer)的名字
%ce        提交者的电子邮件地址
%cd        提交日期
%cr        提交日期，按多久以前的方式显示
%s         提交说明  </pre>
</div>

&emsp;&emsp;作者(author)和提交者(committer)之间究竟有何差别，其实作者指的是实际作出修改的人，提交者指的是最后将此工作成果提交到仓库的人。所以，当你为某个项目发布补丁，然后某个核心成员将你的补丁并入项目时，你就是作者，而那个核心成员就是提交者

【限制输出长度】

&emsp;&emsp;除了定制输出格式的选项之外，git log还有许多非常实用的限制输出长度的选项，也就是只输出部分提交信息。比如使用-2，它只显示最近的两条提交，实际上，这是-&lt;n&gt;选项的写法，其中的n可以是任何自然数，表示仅显示最近的若干条提交。不过实践中我们是不太用这个选项的，Git在输出所有提交时会自动调用分页程序(less)，要看更早的更新只需翻到下页即可

&emsp;&emsp;另外还有按照时间作限制的选项，比如--since和--until。下面的命令列出所有最近两周内的提交

<div>
<pre>$ git log --since=2.weeks</pre>
</div>

&emsp;&emsp;可以给出各种时间格式，比如说具体的某一天(&ldquo;2008-01-15&rdquo;)，或者是多久以前(&ldquo;2 years 1 day 3 minutes ago&rdquo;)

&emsp;&emsp;还可以给出若干搜索条件，列出符合的提交。用--author选项显示指定作者的提交，用--grep选项搜索提交说明中的关键字。(请注意，如果要得到同时满足这两个选项搜索条件的提交，就必须用--all-match选项。否则，满足任意一个条件的提交都会被匹配出来)

&emsp;&emsp;另一个真正实用的git log选项是路径(path)，如果只关心某些文件或者目录的历史提交，可以在git log 选项的最后指定它们的路径。因为是放在最后位置上的选项，所以用两个短划线(--)隔开之前的选项和后面限定的路径名

&emsp;&emsp;下表还列出了其他常用的类似选项

<div>
<pre>选项    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;  说明
-(n)    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; 仅显示最近的 n 条提交
--since, --after      仅显示指定时间之后的提交
--until, --before     仅显示指定时间之前的提交
--author    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;仅显示指定作者相关的提交
--committer    &emsp;&emsp;&emsp;&emsp;仅显示指定提交者相关的提交</pre>
</div>

【使用图形化工具查阅提交历史】

&emsp;&emsp;有时候图形化工具更容易展示历史提交的变化，随Git一同发布的gitk就是这样一种工具。它是用Tcl/Tk写成的，基本上相当于git log命令的可视化版本，凡是git log可以用的选项也都能用在gitk上。在项目工作目录中输入gitk命令后，就会启动下图所示的界面


![git_baseOperation33](https://pic.xiaohuochai.site/blog/git_baseOperation33.png)


&emsp;&emsp;上半个窗口显示的是历次提交的分支祖先图谱，下半个窗口显示当前点选的提交对应的具体差异

&nbsp;

### 撤销操作

&emsp;&emsp;任何时候，都有可能需要撤消刚才所做的某些操作。接下来，介绍一些基本的撤消操作相关的命令。请注意，有些撤销操作是不可逆的，所以请务必谨慎小心，一旦失误，就有可能丢失部分工作成果

【修改最后一次提交】

&emsp;&emsp;有时候我们提交完了才发现漏掉了几个文件没有加，或者提交信息写错了。想要撤消刚才的提交操作，可以使用--amend选项重新提交：

<div>
<pre>$ git commit --amend</pre>
</div>

&emsp;&emsp;此命令将使用当前的暂存区域快照提交。如果刚才提交完没有作任何改动，直接运行此命令的话，相当于有机会重新编辑提交说明，但将要提交的文件快照和之前的一样

&emsp;&emsp;启动文本编辑器后，会看到上次提交时的说明，编辑它确认没问题后保存退出，就会使用新的提交说明覆盖刚才失误的提交

&emsp;&emsp;如果刚才提交时忘了暂存某些修改，可以先补上暂存操作，然后再运行 --amend 提交：

<div>
<pre>$ git commit -m 'initial commit'
$ git add forgotten_file
$ git commit --amend</pre>
</div>

&emsp;&emsp;上面的三条命令最终只是产生一个提交，第二个提交命令修正了第一个的提交内容

【取消已经暂存的文件】

&emsp;&emsp;下面将演示如何取消暂存区域中的文件，以及如何取消工作目录中已修改的文件。查看文件状态的时候就提示了该如何撤消，所以不需要死记硬背

&emsp;&emsp;来看下面的例子，有两个修改过的文件，我们想要分开提交，但不小心用git add.全加到了暂存区域。该如何撤消暂存其中的一个文件呢？其实，git status的命令输出已经告诉了我们该怎么做：


![git_baseOperation34](https://pic.xiaohuochai.site/blog/git_baseOperation34.png)


&emsp;&emsp;在&ldquo;Changes to be committed&rdquo;下面，括号中有提示，可以使用git reset HEAD &lt;file&gt;...的方式取消暂存


![git_baseOperation35](https://pic.xiaohuochai.site/blog/git_baseOperation35.png)


【取消对文件的修改】

&emsp;&emsp;如果觉得刚才对a.txt的修改完全没有必要，该如何取消修改，回到之前的状态(也就是修改之前的版本)呢？git status同样提示了具体的撤消方法，接着上面的例子，现在未暂存区域看起来像这样：

<div>
<pre>Changes not staged for commit:
  (use "git add &lt;file&gt;..." to update what will be committed)
  (use "git checkout -- &lt;file&gt;..." to discard changes in working directory)
        modified:   a.txt</pre>
</div>

&emsp;&emsp;在第二个括号中，我们看到了抛弃文件修改的命令


![git_baseOperation36](https://pic.xiaohuochai.site/blog/git_baseOperation36.png)


&emsp;&emsp;可以看到，该文件已经恢复到修改前的版本

&emsp;&emsp;这条命令有些危险，所有对文件的修改都没有了，因为我们刚刚把之前版本的文件复制过来重写了此文件。所以在用这条命令前，请务必确定真的不再需要保留刚才的修改。如果只是想回退版本，同时保留刚才的修改以便将来继续工作，以后会介绍

【总结】

&emsp;&emsp;当文件被提交后(git commit)，就无法撤销了，只能使用--amend命令来修改提交说明，或增加要提交的文件

&emsp;&emsp;当文件被提交前，如果想恢复文件内容，如果文件处于暂存区(stage)，则需要先使用git reset HEAD &lt;file&gt;的方式取消暂存，然后再使用git checkout -- &lt;file&gt;的方式来恢复文件内容

&nbsp;

### 使用远程仓库

&emsp;&emsp;要参与任何一个Git项目的协作，必须要了解该如何管理远程仓库。远程仓库是指托管在网络上的项目仓库，可能会有好多个，其中有些你只能读，另外有些可以写。同他人协作开发某个项目时，需要管理这些远程仓库，以便推送或拉取数据，分享各自的工作进展。管理远程仓库的工作，包括添加远程库，移除废弃的远程库，管理各式远程库分支，定义是否跟踪这些分支等等

【查看当前的远程库】

&emsp;&emsp;要查看当前配置有哪些远程仓库，可以用git remote命令，它会列出每个远程库的简短名字。在克隆完某个项目后，至少可以看到一个名为origin的远程库，Git默认使用这个名字来标识你所克隆的原始仓库：

![git_baseOperationadd](https://pic.xiaohuochai.site/blog/git_baseOperationadd.png)

&emsp;&emsp;也可以加上 -v 选项(v为--verbose的简写，中文意思是冗长的)，显示对应的克隆地址：


![git_baseOperation37](https://pic.xiaohuochai.site/blog/git_baseOperation37.png)


&emsp;&emsp;如果有多个远程仓库，此命令将全部列出

<div>
<pre>$ cd grit
$ git remote -v
bakkdoor  git://github.com/bakkdoor/grit.git
cho45     git://github.com/cho45/grit.git
defunkt   git://github.com/defunkt/grit.git
koke      git://github.com/koke/grit.git
origin    git@github.com:mojombo/grit.git</pre>
</div>

&emsp;&emsp;这样一来，就可以非常轻松地从这些用户的仓库中，拉取他们的提交到本地。请注意，上面列出的地址只有origin用的是SSH URL链接，所以也只有这个仓库我能推送数据上去

【添加远程仓库】

&emsp;&emsp;添加一个新的远程仓库，可以指定一个名字，以便将来引用，运行`git remote add [shortname] [url]`


![git_baseOperation38](https://pic.xiaohuochai.site/blog/git_baseOperation38.png)


&emsp;&emsp;现在可以用字符串pb指代对应的仓库地址了。比如说，要抓取所有Paul有的，但本地仓库没有的信息，可以运行git fetch pb：


![git_baseOperation39](https://pic.xiaohuochai.site/blog/git_baseOperation39.png)


&emsp;&emsp;现在，Paul 的主干分支(master)已经完全可以在本地访问了，对应的名字是&nbsp;`pb/master`，你可以将它合并到自己的某个分支，或者切换到这个分支，看看有些什么有趣的更新

【从远程仓库抓取数据】

&emsp;&emsp;正如之前所看到的，可以用下面的命令从远程仓库抓取数据到本地：

<div>
<pre>$ git fetch [remote-name]</pre>
</div>

&emsp;&emsp;此命令会到远程仓库中拉取所有你本地仓库中还没有的数据。运行完成后，你就可以在本地访问该远程仓库中的所有分支，将其中某个分支合并到本地，或者只是取出某个分支，一探究竟

&emsp;&emsp;如果克隆了一个仓库，此命令会自动将远程仓库归于origin名下。所以，git fetch origin会抓取从你上次克隆以来别人上传到此远程仓库中的所有更新(或是上次fetch以来别人提交的更新)。有一点很重要，fetch命令只是将远端的数据拉到本地仓库，并不自动合并到当前工作分支，只有当你确实准备好了，才能手工合并

&emsp;&emsp;如果设置了某个分支用于跟踪某个远端仓库的分支，可以使用git pull命令自动抓取数据下来，然后将远端分支自动合并到本地仓库中当前分支。在日常工作中我们经常这么用，既快且好。实际上，默认情况下git clone命令本质上就是自动创建了本地的master分支用于跟踪远程仓库中的master分支(假设远程仓库确实有master分支)。所以一般我们运行git pull，目的都是要从原始克隆的远端仓库中抓取数据后，合并到工作目录中的当前分支

【推送数据到远程仓库】

&emsp;&emsp;项目进行到一个阶段，要同别人分享目前的成果，可以将本地仓库中的数据推送到远程仓库。实现这个任务的命令很简单：`git push [remote-name] [branch-name]`。如果要把本地的master分支推送到origin服务器上(再次说明下，克隆操作会自动使用默认的master和origin名字)，可以运行下面的命令

<div>
<pre>$ git push origin master</pre>
</div>

&emsp;&emsp;只有在所克隆的服务器上有写权限，或者同一时刻没有其他人在推数据，这条命令才会如期完成任务。如果在你推数据前，已经有其他人推送了若干更新，那你的推送操作就会被驳回。你必须先把他们的更新抓取到本地，合并到自己的项目中，然后才可以再次推送

【查看远程仓库信息】

&emsp;&emsp;我们可以通过命令`git remote show [remote-name]`查看某个远程仓库的详细信息，比如要看所克隆的origin仓库，可以运行：


![git_baseOperation40](https://pic.xiaohuochai.site/blog/git_baseOperation40.png)


&emsp;&emsp;除了对应的克隆地址外，它还给出了许多额外的信息。它友善地告诉你如果是在master分支，就可以用git pull命令抓取数据合并到本地。另外还列出了所有处于跟踪状态中的远端分支

&emsp;&emsp;上面的例子非常简单，而随着使用Git的深入，git remote show给出的信息可能会像这样：

<div>
<pre>$ git remote show origin
* remote origin
  URL: git@github.com:defunkt/github.git
  Remote branch merged with 'git pull' while on branch issues
    issues
  Remote branch merged with 'git pull' while on branch master
    master
  New remote branches (next fetch will store in remotes/origin)
    caching
  Stale tracking branches (use 'git remote prune')
    libwalker
    walker2
  Tracked remote branches
    acl
    apiv2
    dashboard2
    issues
    master
    postgres
  Local branch pushed with 'git push'
    master:master</pre>
</div>

&emsp;&emsp;它告诉我们，运行git push时缺省推送的分支是什么(最后两行)。它还显示了有哪些远端分支还没有同步到本地(第六行的caching分支)，哪些已同步到本地的远端分支在远端服务器上已被删除(Stale tracking branches下面的两个分支)，以及运行git pull时将自动合并哪些分支(前四行中列出的issues和master分支)

【远程仓库的删除和重命名】

&emsp;&emsp;在新版Git中可以用git remote rename命令修改某个远程仓库在本地的简称，比如想把pb改成paul，可以这么运行：

<div>
<pre>$ git remote rename pb paul</pre>
</div>

![git_baseOperation41](https://pic.xiaohuochai.site/blog/git_baseOperation41.png)


&emsp;&emsp;注意：对远程仓库的重命名，也会使对应的分支名称发生变化，原来的pb/master分支现在成了paul/master

&emsp;&emsp;碰到远端仓库服务器迁移，或者原来的克隆镜像不再使用，又或者某个参与者不再贡献代码，那么需要移除对应的远端仓库，可以运行git remote rm命令：

<div>
<pre>$ git remote rm paul</pre>
</div>

![git_baseOperation42](https://pic.xiaohuochai.site/blog/git_baseOperation42.png)
