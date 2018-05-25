# Git分支

&emsp;&emsp;几乎每一种版本控制系统都以某种形式支持分支。使用分支意味着可以从开发主线上分离开来，然后在不影响主线的同时继续工作。在很多版本控制系统中，这是个昂贵的过程，常常需要创建一个源代码目录的完整副本，对大型项目来说会花费很长时间

&emsp;&emsp;有人把Git的分支模型称为&ldquo;必杀技特性&rdquo;，而正是因为它，将Git从版本控制系统家族里区分出来。Git有何特别之处呢？Git的分支可谓是难以置信的轻量级，它的新建操作几乎可以在瞬间完成，并且在不同分支间切换起来也差不多一样快。和许多其他版本控制系统不同，Git鼓励在工作流程中频繁使用分支与合并，哪怕一天之内进行许多次都没有关系。理解分支的概念并熟练运用后，才会意识到为什么Git是一个如此强大而独特的工具，并从此真正改变开发方式。本文将详细介绍Git分支

&nbsp;

### 定义

&emsp;&emsp;为了理解Git分支的实现方式，我们需要回顾一下Git是如何储存数据的。Git保存的不是文件差异或者变化量，而只是一系列文件快照

&emsp;&emsp;在Git中提交时，会保存一个提交(commit)对象，该对象包含一个指向暂存内容快照的指针，包含本次提交的作者等相关附属信息，包含零个或多个指向该提交对象的父对象指针：首次提交是没有直接祖先的，普通提交有一个祖先，由两个或多个分支合并产生的提交则有多个祖先

&emsp;&emsp;为直观起见，我们假设工作目录中有三个文件，准备将它们暂存后提交。暂存操作会对每一个文件计算校验和，然后把当前版本文件快照保存到Git仓库(Git使用blob类型的对象存储这些快照)，并将校验和加入暂存区域

<div>
<pre>$ git add README test.rb LICENSE
$ git commit -m 'initial commit of my project'</pre>
</div>

&emsp;&emsp;当使用git commit新建一个提交对象前，Git会先计算每一个子目录(本例中就是项目根目录)的校验和，然后在Git仓库中将这些目录保存为树(tree)对象。之后Git创建的提交对象，除了包含相关提交信息以外，还包含着指向这个树对象(项目根目录)的指针，如此它就可以在将来需要的时候，重现此次快照的内容了

&emsp;&emsp;现在，Git仓库中有五个对象：三个表示文件快照内容的blob对象；一个记录着目录树内容及其中各个文件对应blob对象索引的tree对象；以及一个包含指向tree对象(根目录)的索引和其他提交信息元数据的commit对象。概念上来说，仓库中的各个对象保存的数据和相互关系看起来如下图所示

![git_branch1](https://pic.xiaohuochai.site/blog/git_branch1.png)


&emsp;&emsp;做些修改后再次提交，那么这次的提交对象会包含一个指向上次提交对象的指针(即下图中的parent对象)。两次提交后，仓库历史会变成下图的样子

![git_branch2](https://pic.xiaohuochai.site/blog/git_branch2.png)


&emsp;&emsp;现在来谈分支。Git中的分支，其实本质上仅仅是个指向commit对象的可变指针。Git会使用master作为分支的默认名字。在若干次提交后，其实已经有了一个指向最后一次提交对象的master分支，它在每次提交的时候都会自动向前移动

![git_branch3](https://pic.xiaohuochai.site/blog/git_branch3.png)


&emsp;&emsp;那么，Git又是如何创建一个新的分支的呢？答案很简单，创建一个新的分支指针。比如新建一个testing分支，可以使用git branch命令：

<div>
<pre>$ git branch testing</pre>
</div>

&emsp;&emsp;这会在当前commit对象上新建一个分支指针

![git_branch4](https://pic.xiaohuochai.site/blog/git_branch4.png)


&emsp;&emsp;那么，Git是如何知道你当前在哪个分支上工作的呢？其实答案也很简单，它保存着一个名为HEAD的特别指针。请注意它和你熟知的许多其他版本控制系统(比如Subversion或CVS)里的HEAD概念大不相同。在Git中，它是一个指向你正在工作中的本地分支的指针(可以将HEAD想象为当前分支的别名)。运行git branch命令，仅仅是建立了一个新的分支，但不会自动切换到这个分支中去，所以在这个例子中，我们依然还在master分支里工作

![git_branch5](https://pic.xiaohuochai.site/blog/git_branch5.png)


&emsp;&emsp;要切换到其他分支，可以执行git checkout命令。我们现在转换到新建的testing分支

<div>
<pre>$ git checkout testing</pre>
</div>

&emsp;&emsp;这样HEAD就指向了testing分支

![git_branch6](https://pic.xiaohuochai.site/blog/git_branch6.png)


&emsp;&emsp;这样的实现方式会给我们带来什么好处呢？好吧，现在不妨再提交一次：

<div>
<pre>$ git commit -a -m 'made a change'</pre>
</div>

![git_branch7](https://pic.xiaohuochai.site/blog/git_branch7.png)


&emsp;&emsp;非常有趣，现在testing分支向前移动了一格，而master分支仍然指向原先git checkout时所在的commit对象。现在我们回到master分支看看

<div>
<pre>$ git checkout master</pre>
</div>

![git_branch8](https://pic.xiaohuochai.site/blog/git_branch8.png)


&emsp;&emsp;这条命令做了两件事。它把HEAD指针移回到master分支，并把工作目录中的文件换成了master分支所指向的快照内容。也就是说，现在开始所做的改动，将始于本项目中一个较老的版本。它的主要作用是将testing分支里作出的修改暂时取消，这样你就可以向另一个方向进行开发

<div>
<pre>$ git commit -a -m 'made other changes'</pre>
</div>

&emsp;&emsp;现在我们的项目提交历史产生了分叉，因为刚才我们创建了一个分支，转换到其中进行了一些工作，然后又回到原来的主分支进行了另外一些工作。这些改变分别孤立在不同的分支里：我们可以在不同分支里反复切换，并在时机成熟时把它们合并到一起。而所有这些工作，仅仅需要branch和checkout这两条命令就可以完成

![git_branch9](https://pic.xiaohuochai.site/blog/git_branch9.png)


&emsp;&emsp;由于Git中的分支实际上仅是一个包含所指对象校验和(40个字符长度SHA-1字串)的文件，所以创建和销毁一个分支就变得非常廉价。说白了，新建一个分支就是向一个文件写入41个字节(外加一个换行符)那么简单，当然也就很快了

&emsp;&emsp;这和大多数版本控制系统形成了鲜明对比，它们管理分支大多采取备份所有项目文件到特定目录的方式，所以根据项目文件数量和大小不同，可能花费的时间也会有相当大的差别，快则几秒，慢则数分钟。而Git的实现与项目复杂度无关，它永远可以在几毫秒的时间内完成分支的创建和切换。同时，因为每次提交时都记录了祖先信息(即parent对象)，将来要合并分支时，寻找恰当的合并基础(即共同祖先)的工作其实已经自然而然地摆在那里了，所以实现起来非常容易。Git鼓励开发者频繁使用分支，正是因为有着这些特性作保障

&emsp;&emsp;接下来看看，我们为什么应该频繁使用分支

&nbsp;

### 新建与合并

&emsp;&emsp;现在让我们来看一个简单的分支与合并的例子，实际工作中大体也会用到这样的工作流程：

&emsp;&emsp;1、开发某个网站

&emsp;&emsp;2、为实现某个新的需求，创建一个分支

&emsp;&emsp;3、在这个分支上开展工作

&emsp;&emsp;假设此时，突然接到一个电话说有个很严重的问题需要紧急修补，那么可以按照下面的方式处理：

&emsp;&emsp;1、返回到原先已经发布到生产服务器上的分支

&emsp;&emsp;2、为这次紧急修补建立一个新分支，并在其中修复问题

&emsp;&emsp;3、通过测试后，回到生产服务器所在的分支，将修补分支合并进来，然后再推送到生产服务器上。

&emsp;&emsp;4、切换到之前实现新需求的分支，继续工作

【新建与切换】

&emsp;&emsp;假设你正在项目中愉快地工作，并且已经提交了几次更新

![git_branch10](https://pic.xiaohuochai.site/blog/git_branch10.png)


&emsp;&emsp;现在，决定要修补问题追踪系统上的#53问题。顺带说明下，Git并不同任何特定的问题追踪系统打交道。这里为了说明要解决的问题，才把新建的分支取名为iss53。要新建并切换到该分支，运行git checkout并加上-b参数

<div>
<pre>$ git checkout -b iss53
Switched to a new branch 'iss53'</pre>
</div>
<div>
<pre>$ git branch iss53
$ git checkout iss53</pre>
</div>

![git_branch11](https://pic.xiaohuochai.site/blog/git_branch11.png)


&emsp;&emsp;接着开始尝试修复问题，在提交了若干次更新后，iss53分支的指针也会随着向前推进，因为它就是当前分支(换句话说，当前的HEAD指针正指向iss53)

<div>
<pre>$ git commit -a -m 'added a new footer [issue 53]'</pre>
</div>

![git_branch12](https://pic.xiaohuochai.site/blog/git_branch12.png)


&emsp;&emsp;现在你就接到了那个网站问题的紧急电话，需要马上修补。有了Git，我们就不需要同时发布这个补丁和iss53里作出的修改，也不需要在创建和发布该补丁到服务器之前花费大力气来复原这些修改。唯一需要的仅仅是切换回master分支

&emsp;&emsp;不过在此之前，留心你的暂存区或者工作目录里，那些还没有提交的修改，它会和你即将检出的分支产生冲突从而阻止Git为你切换分支。切换分支的时候最好保持一个清洁的工作区域。稍后会介绍几个绕过这种问题的办法(分别叫做stashing和commitamending)。目前已经提交了所有的修改，所以接下来可以正常转换到master分支：

<div>
<pre>$ git checkout master
Switched to branch 'master'</pre>
</div>

&emsp;&emsp;此时工作目录中的内容和你在解决问题#53之前一模一样，你可以集中精力进行紧急修补。这一点值得牢记：Git会把工作目录的内容恢复为检出某分支时它所指向的那个提交对象的快照。它会自动添加、删除和修改文件以确保目录的内容和你当时提交时完全一样

&emsp;&emsp;接下来，你得进行紧急修补。我们创建一个紧急修补分支hotfix来开展工作，直到搞定

<div>
<pre>$ git checkout -b hotfix
Switched to a new branch 'hotfix'</pre>
</div>
<div>
<pre>$ git commit -a -m 'fixed the broken email address'
[hotfix 3a0874c] fixed the broken email address
 1 files changed, 1 deletion(-)</pre>
</div>

![git_branch13](https://pic.xiaohuochai.site/blog/git_branch13.png)


&emsp;&emsp;有必要作些测试，确保修补是成功的，然后回到master分支并把它合并进来，然后发布到生产服务器。用git merge命令来进行合并

<div>
<pre>$ git checkout master
$ git merge hotfix
Updating f42c576..3a0874c
Fast-forward
 README | 1 -
 1 file changed, 1 deletion(-)</pre>
</div>

&emsp;&emsp;请注意，合并时出现了&ldquo;Fast forward&rdquo;的提示。由于当前master分支所在的提交对象是要并入的hotfix分支的直接上游，Git只需把master分支指针直接右移。换句话说，如果顺着一个分支走下去可以到达另一个分支的话，那么Git在合并两者时，只会简单地把指针右移，因为这种单线的历史分支不存在任何需要解决的分歧，所以这种合并过程可以称为快进(Fast forward)

&emsp;&emsp;现在最新的修改已经在当前master分支所指向的提交对象中了，可以部署到生产服务器上去了

![git_branch14](https://pic.xiaohuochai.site/blog/git_branch14.png)


&emsp;&emsp;在那个超级重要的修补发布以后，你想要回到被打扰之前的工作。由于当前hotfix分支和master都指向相同的提交对象，所以hotfix已经完成了历史使命，可以删掉了。使用git branch 的-d选项执行删除操作

<div>
<pre>$ git branch -d hotfix
Deleted branch hotfix (was 3a0874c).</pre>
</div>

&emsp;&emsp;现在回到之前未完成的#53问题修复分支上继续工作

<div>
<pre>$ git checkout iss53
Switched to branch 'iss53'</pre>
</div>
<div>
<pre>$ git commit -a -m 'finished the new footer [issue 53]'
[iss53 ad82d7a] finished the new footer [issue 53]
 1 file changed, 1 insertion(+)</pre>
</div>

![git_branch15](https://pic.xiaohuochai.site/blog/git_branch15.png)


&emsp;&emsp;值得注意的是之前hotfix分支的修改内容尚未包含到iss53中来。如果需要纳入此次修补，可以用git merge master把master分支合并到iss53；或者等iss53完成之后，再将iss53分支中的更新并入master

【分支的合并】

&emsp;&emsp;在问题#53相关的工作完成之后，可以合并回master分支。实际操作同前面合并hotfix分支差不多，只需回到master分支，运行git merge命令指定要合并进来的分支：

<div>
<pre>$ git checkout master
$ git merge iss53
Auto-merging README
Merge made by the 'recursive' strategy.
 README | 1 +
 1 file changed, 1 insertion(+)</pre>
</div>

&emsp;&emsp;请注意，这次合并操作的底层实现，并不同于之前hotfix的并入方式。因为这次你的开发历史是从更早的地方开始分叉的。由于当前master分支所指向的提交对象(C4)并不是iss53分支的直接祖先，Git不得不进行一些额外处理。就此例而言，Git会用两个分支的末端(C4和C5)以及它们的共同祖先(C2)进行一次简单的三方合并计算。下图用红框标出了Git用于合并的三个提交对象

![git_branch16](https://pic.xiaohuochai.site/blog/git_branch16.png)


&emsp;&emsp;这次，Git没有简单地把分支指针右移，而是对三方合并后的结果重新做一个新的快照，并自动创建一个指向它的提交对象(C6)。这个提交对象比较特殊，它有两个祖先(C4和C5)

&emsp;&emsp;值得一提的是Git可以自己裁决哪个共同祖先才是最佳合并基础；这和CVS或Subversion(1.5以后的版本)不同，它们需要开发者手工指定合并基础。所以此特性让Git的合并操作比其他系统都要简单不少

![git_branch17](https://pic.xiaohuochai.site/blog/git_branch17.png)


&emsp;&emsp;既然之前的工作成果已经合并到master了，那么iss53也就没用了。你可以就此删除它，并在问题追踪系统里关闭该问题

<div>
<pre>$ git branch -d iss53</pre>
</div>

【遇到冲突时的分支合并】

&emsp;&emsp;有时候合并操作并不会如此顺利。如果在不同的分支中都修改了同一个文件的同一部分，Git就无法干净地把两者合到一起(逻辑上说，这种问题只能由人来裁决)。如果你在解决问题#53的过程中修改了hotfix中修改的部分，将得到类似下面的结果

<div>
<pre>$ git merge iss53
Auto-merging index.html
CONFLICT (content): Merge conflict in index.html
Automatic merge failed; fix conflicts and then commit the result.</pre>
</div>

&emsp;&emsp;Git作了合并，但没有提交，它会停下来等你解决冲突。要看看哪些文件在合并时发生冲突，可以用git status查阅：

<div>
<pre>$ git status
On branch master
You have unmerged paths.
  (fix conflicts and run "git commit")
Unmerged paths:
  (use "git add &lt;file&gt;..." to mark resolution)
        both modified:      index.html
no changes added to commit (use "git add" and/or "git commit -a")</pre>
</div>

&emsp;&emsp;任何包含未解决冲突的文件都会以未合并(unmerged)的状态列出。Git会在有冲突的文件里加入标准的冲突解决标记，可以通过它们来手工定位并解决这些冲突。可以看到此文件包含类似下面这样的部分：

<div>
<pre>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD
&lt;div id="footer"&gt;contact : email.support@github.com&lt;/div&gt;
=======
&lt;div id="footer"&gt;
  please contact us at support@github.com
&lt;/div&gt;
&gt;&gt;&gt;&gt;&gt;&gt;&gt; iss53</pre>
</div>

&emsp;&emsp;可以看到=======隔开的上半部分，是HEAD(即master分支，在运行merge命令时所切换到的分支)中的内容，下半部分是在iss53分支中的内容。解决冲突的办法无非是二者选其一或者由你亲自整合到一起。比如你可以通过把这段内容替换为下面这样来解决：

<div>
<pre>&lt;div id="footer"&gt;
please contact us at email.support@github.com
&lt;/div&gt;</pre>
</div>

&emsp;&emsp;这个解决方案各采纳了两个分支中的一部分内容，而且我还删除了&lt;&lt;&lt;&lt;&lt;&lt;&lt;，=======和&gt;&gt;&gt;&gt;&gt;&gt;&gt;这些行。在解决了所有文件里的所有冲突后，运行git add将把它们标记为已解决状态(实际上就是将一次快照保存到暂存区域)。因为一旦暂存，就表示冲突已经解决。如果你想用一个有图形界面的工具来解决这些问题，不妨运行git mergetool，它会调用一个可视化的合并工具并引导你解决所有冲突：

<div>
<pre>$ git mergetool
This message is displayed because 'merge.tool' is not configured.
See 'git mergetool --tool-help' or 'git help config' for more details.
'git mergetool' will now attempt to use one of the following tools:
opendiff kdiff3 tkdiff xxdiff meld tortoisemerge gvimdiff diffuse diffmerge ecmerge p4merge araxis bc3 codecompare vimdiff emerge
Merging:
index.html
Normal merge conflict for 'index.html':
  {local}: modified file
  {remote}: modified file
Hit return to start merge resolution tool (opendiff):</pre>
</div>

&emsp;&emsp;如果不想用默认的合并工具，你可以在上方"merge tool candidates"里找到可用的合并工具列表，输入你想用的工具名

&emsp;&emsp;退出合并工具以后，Git会询问你合并是否成功。如果回答是，它会为你把相关文件暂存起来，以表明状态为已解决

&emsp;&emsp;再运行一次git status来确认所有冲突都已解决：

<div>
<pre>$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD &lt;file&gt;..." to unstage)
        modified:   index.html</pre>
</div>

&emsp;&emsp;如果觉得满意了，并且确认所有冲突都已解决，也就是进入了暂存区，就可以用git commit来完成这次合并提交。提交的记录差不多是这样：

<div>
<pre>Merge branch 'iss53'
Conflicts:
  index.html
#
# It looks like you may be committing a merge.
# If this is not correct, please remove the file
#       .git/MERGE_HEAD
# and try again.
#</pre>
</div>

&emsp;&emsp;如果想给将来看这次合并的人一些方便，可以修改该信息，提供更多合并细节。比如你都作了哪些改动，以及这么做的原因。有时候裁决冲突的理由并不直接或明显，有必要略加注解

&nbsp;

### 分支管理

&emsp;&emsp;git branch命令不仅仅能创建和删除分支，如果不加任何参数，它会给出当前所有分支的清单

<div>
<pre>$ git branch
  iss53
* master
  testing</pre>
</div>

&emsp;&emsp;注意看master分支前的*字符：它表示当前所在的分支。也就是说，如果现在提交更新，master分支将随着开发进度前移。若要查看各个分支最后一个提交对象的信息，运行git branch -v：

<div>
<pre>$ git branch -v
  iss53   93b412c fix javascript issue
* master  7a98805 Merge branch 'iss53'
  testing 782fd34 add scott to the author list in the readmes</pre>
</div>

&emsp;&emsp;要从该清单中筛选出你已经(或尚未)与当前分支合并的分支，可以用--merged和--no-merged选项(Git1.5.6以上版本)。比如用git branch --merged查看哪些分支已被并入当前分支，也就是说哪些分支是当前分支的直接上游

<div>
<pre>$ git branch --merged
  iss53
* master</pre>
</div>

&emsp;&emsp;之前我们已经合并了iss53，所以在这里会看到它。一般来说，列表中没有*的分支通常都可以用git branch -d来删掉。原因很简单，既然已经把它们所包含的工作整合到了其他分支，删掉也不会损失什么

&emsp;&emsp;另外可以用git branch --no-merged查看尚未合并的分支

<div>
<pre>$ git branch --no-merged
  testing</pre>
</div>

&emsp;&emsp;它会显示还未合并进来的分支。由于这些分支中还包含着尚未合并进来的工作成果，所以简单地用 git branch -d删除该分支会提示错误，因为那样做会丢失数据：

<div>
<pre>$ git branch -d testing
error: The branch 'testing' is not fully merged.
If you are sure you want to delete it, run 'git branch -D testing'.</pre>
</div>

&emsp;&emsp;不过，如果你确实想要删除该分支上的改动，可以用大写的删除选项-D强制执行，就像上面提示信息中给出的那样

&nbsp;

### 工作流程

&emsp;&emsp;由于分支管理的便捷，衍生出了这类典型的工作模式，可以根据项目的实际情况进行选择

【长期分支】

&emsp;&emsp;由于Git使用简单的三方合并，所以就算在较长一段时间内，反复多次把某个分支合并到另一分支，也不是什么难事。也就是说，你可以同时拥有多个开放的分支，每个分支用于完成特定的任务，随着开发的推进，你可以随时把某个特性分支的成果并到其他分支中

&emsp;&emsp;许多使用Git的开发者都喜欢用这种方式来开展工作，比如仅在master分支中保留完全稳定的代码，即已经发布或即将发布的代码。与此同时，他们还有一个名为develop或next的平行分支，专门用于后续的开发，或仅用于稳定性测试&mdash;当然并不是说一定要绝对稳定，不过一旦进入某种稳定状态，便可以把它合并到master里。这样，在确保这些已完成的特性分支(短期分支，比如之前的iss53分支)能够通过所有测试，并且不会引入更多错误之后，就可以并到主干分支中，等待下一次的发布。

&emsp;&emsp;本质上我们刚才谈论的，是随着提交对象不断右移的指针。稳定分支的指针总是在提交历史中落后一大截，而前沿分支总是比较靠前

![git_branch18](https://pic.xiaohuochai.site/blog/git_branch18.png)


&emsp;&emsp;或者把它们想象成工作流水线，或许更好理解一些，经过测试的提交对象集合被遴选到更稳定的流水线

![git_branch19](https://pic.xiaohuochai.site/blog/git_branch19.png)


&emsp;&emsp;你可以用这招维护不同层次的稳定性。某些大项目还会有个proposed(建议)或pu(proposed updates，建议更新)分支，它包含着那些可能还没有成熟到进入next或master的内容。这么做的目的是拥有不同层次的稳定性：当这些分支进入到更稳定的水平时，再把它们合并到更高层分支中去。再次说明下，使用多个长期分支的做法并非必需，不过一般来说，对于特大型项目或特复杂的项目，这么做确实更容易管理

【特性分支】

&emsp;&emsp;在任何规模的项目中都可以使用特性(Topic)分支。一个特性分支是指一个短期的，用来实现单一特性或与其相关工作的分支。可能你在以前的版本控制系统里从未做过类似这样的事情，因为通常创建与合并分支消耗太大。然而在Git中，一天之内建立、使用、合并再删除多个分支是常见的事

&emsp;&emsp;我们在上节的例子里已经见过这种用法了。我们创建了iss53和hotfix这两个特性分支，在提交了若干更新后，把它们合并到主干分支，然后删除。该技术允许你迅速且完全的进行语境切换&mdash;&mdash;因为你的工作分散在不同的流水线里，每个分支里的改变都和它的目标特性相关，浏览代码之类的事情因而变得更简单了。你可以把作出的改变保持在特性分支中几分钟，几天甚至几个月，等它们成熟以后再合并，而不用在乎它们建立的顺序或者进度

&emsp;&emsp;现在我们来看一个实际的例子，如下图所示，由下往上，起先我们在master工作到C1，然后开始一个新分支iss91尝试修复91号缺陷，提交到C6的时候，又冒出一个解决该问题的新办法，于是从之前C4的地方又分出一个分支iss91v2，干到C8的时候，又回到主干master中提交了C9和C10，再回到iss91v2继续工作，提交C11，接着，又冒出个不太确定的想法，从master的最新提交C10处开了个新的分支dumbidea做些试验

![git_branch20](https://pic.xiaohuochai.site/blog/git_branch20.png)


&emsp;&emsp;现在，假定两件事情：我们最终决定使用第二个解决方案，即iss91v2中的办法；另外，我们把dumbidea分支拿给同事们看了以后，发现它竟然是个天才之作。所以接下来，我们准备抛弃原来的iss91分支(实际上会丢弃C5和C6)，直接在主干中并入另外两个分支。最终的提交历史将变成如下图所示

![git_branch21](https://pic.xiaohuochai.site/blog/git_branch21.png)


&emsp;&emsp;请务必牢记这些分支全部都是本地分支，这一点很重要。当你在使用分支及合并的时候，一切都是在你自己的Git仓库中进行的&mdash;&mdash;完全不涉及与服务器的交互

&nbsp;

### 远程分支

&emsp;&emsp;远程分支(remote branch)是对远程仓库中的分支的索引。它们是一些无法移动的本地分支；只有在Git进行网络交互时才会更新。远程分支就像是书签，提醒着你上次连接远程仓库时上面各分支的位置

&emsp;&emsp;我们用(远程仓库名)/(分支名)这样的形式表示远程分支。比如我们想看看上次同origin仓库通讯时master分支的样子，就应该查看origin/master分支。如果你和同伴一起修复某个问题，但他们先推送了一个iss53分支到远程仓库，虽然你可能也有一个本地的iss53分支，但指向服务器上最新更新的却应该是origin/iss53分支

&emsp;&emsp;可能有点乱，我们不妨举例说明。假设你们团队有个地址为git.ourcompany.com的Git服务器。如果你从这里克隆，Git会自动为你将此远程仓库命名为origin，并下载其中所有的数据，建立一个指向它的master分支的指针，在本地命名为origin/master，但你无法在本地更改其数据。接着，Git建立一个属于你自己的本地master分支，始于origin上master分支相同的位置，你可以就此开始工作：

![git_branch22](https://pic.xiaohuochai.site/blog/git_branch22.png)


&emsp;&emsp;如果你在本地master分支做了些改动，与此同时，其他人向git.ourcompany.com推送了他们的更新，那么服务器上的master分支就会向前推进，而与此同时，你在本地的提交历史正朝向不同方向发展。不过只要你不和服务器通讯，你的origin/master指针仍然保持原位不会移动

![git_branch23](https://pic.xiaohuochai.site/blog/git_branch23.png)


&emsp;&emsp;可以运行git fetch origin来同步远程服务器上的数据到本地。该命令首先找到origin是哪个服务器(本例为`git.ourcompany.com`)，从上面获取你尚未拥有的数据，更新你本地的数据库，然后把origin/master的指针移到它最新的位置上

![git_branch24](https://pic.xiaohuochai.site/blog/git_branch24.png)


&emsp;&emsp;为了演示拥有多个远程分支(在不同的远程服务器上)的项目是如何工作的，我们假设你还有另一个仅供你的敏捷开发小组使用的内部服务器`git.team1.ourcompany.com`。可以用git remote add命令把它加为当前项目的远程分支之一。我们把它命名为teamone，以便代替完整的Git URL以方便使用

![git_branch25](https://pic.xiaohuochai.site/blog/git_branch25.png)


&emsp;&emsp;现在你可以用git fetch teamone来获取小组服务器上你还没有的数据了。由于当前该服务器上的内容是你origin服务器上的子集，Git不会下载任何数据，而只是简单地创建一个名为teamone/master的远程分支，指向teamone服务器上master分支所在的提交对象31b8e

![git_branch26](https://pic.xiaohuochai.site/blog/git_branch26.png)


【推送本地分支】

&emsp;&emsp;要想和其他人分享某个本地分支，你需要把它推送到一个你拥有写权限的远程仓库。你创建的本地分支不会因为你的写入操作而被自动同步到你引入的远程服务器上，你需要明确地执行推送分支的操作。换句话说，对于无意分享的分支，你尽管保留为私人分支好了，而只推送那些协同工作要用到的特性分支

&emsp;&emsp;如果你有个叫serverfix的分支需要和他人一起开发，可以运行git push (远程仓库名) (分支名)：

<div>
<pre>$ git push origin serverfix
Counting objects: 20, done.
Compressing objects: 100% (14/14), done.
Writing objects: 100% (15/15), 1.74 KiB, done.
Total 15 (delta 5), reused 0 (delta 0)
To git@github.com:schacon/simplegit.git
 * [new branch]      serverfix -&gt; serverfix</pre>
</div>

&emsp;&emsp;这里其实走了一点捷径。Git自动把serverfix分支名扩展为refs/heads/serverfix:refs/heads/serverfix，意为&ldquo;取出我在本地的serverfix分支，推送到远程仓库的serverfix分支中去&rdquo;

&emsp;&emsp;不过一般使用的时候都可以省略它。也可以运行git push origin serverfix:serverfix来实现相同的效果，它的意思是&ldquo;上传我本地的serverfix分支到远程仓库中去，仍旧称它为serverfix分支&rdquo;。通过此语法，你可以把本地分支推送到某个命名不同的远程分支：若想把远程分支叫作awesomebranch，可以用git push origin serverfix:awesomebranch来推送数据

&emsp;&emsp;接下来，当你的协作者再次从服务器上获取数据时，他们将得到一个新的远程分支origin/serverfix，并指向服务器上serverfix所指向的版本：

<div>
<pre>$ git fetch origin
remote: Counting objects: 20, done.
remote: Compressing objects: 100% (14/14), done.
remote: Total 15 (delta 5), reused 0 (delta 0)
Unpacking objects: 100% (15/15), done.
From git@github.com:schacon/simplegit
 * [new branch]      serverfix    -&gt; origin/serverfix</pre>
</div>

&emsp;&emsp;值得注意的是，在fetch操作下载好新的远程分支之后，你仍然无法在本地编辑该远程仓库中的分支。换句话说，在本例中，你不会有一个新的serverfix分支，有的只是一个你无法移动的origin/serverfix指针

&emsp;&emsp;如果要把该远程分支的内容合并到当前分支，可以运行git merge origin/serverfix。如果想要一份自己的serverfix来开发，可以在远程分支的基础上分化出一个新的分支来：

<div>
<pre>$ git checkout -b serverfix origin/serverfix
Branch serverfix set up to track remote branch serverfix from origin.
Switched to a new branch 'serverfix'</pre>
</div>

&emsp;&emsp;这会切换到新建的serverfix本地分支，其内容同远程分支origin/serverfix一致，这样就可以在里面继续开发了

【跟踪远程分支】

&emsp;&emsp;从远程分支checkout出来的本地分支，称为跟踪分支(tracking branch)。跟踪分支是一种和某个远程分支有直接联系的本地分支。在跟踪分支里输入git push，Git会自行推断应该向哪个服务器的哪个分支推送数据。同样，在这些分支里运行git pull会获取所有远程索引，并把它们的数据都合并到本地分支中来。

&emsp;&emsp;在克隆仓库时，Git通常会自动创建一个名为master的分支来跟踪origin/master。这正是git push和git pull一开始就能正常工作的原因。当然，你可以随心所欲地设定为其它跟踪分支，比如origin上除了master之外的其它分支。刚才我们已经看到了这样的一个例子：git checkout -b [分支名] [远程名]/[分支名]。如果你有1.6.2以上版本的 Git，还可以用--track选项简化：

<div>
<pre>$ git checkout --track origin/serverfix
Branch serverfix set up to track remote branch serverfix from origin.
Switched to a new branch 'serverfix'</pre>
</div>

&emsp;&emsp;要为本地分支设定不同于远程分支的名字，只需在第一个版本的命令里换个名字：

<div>
<pre>$ git checkout -b sf origin/serverfix
Branch sf set up to track remote branch serverfix from origin.
Switched to a new branch 'sf'</pre>
</div>

&emsp;&emsp;现在你的本地分支sf会自动将推送和抓取数据的位置定位到origin/serverfix了

【删除远程分支】

&emsp;&emsp;如果不再需要某个远程分支了，比如搞定了某个特性并把它合并进了远程的master分支(或任何其他存放稳定代码的分支)，可以用这个非常无厘头的语法来删除它：git push [远程名] :[分支名]。如果想在服务器上删除serverfix分支，运行下面的命令

<div>
<pre>$ git push origin :serverfix
To git@github.com:schacon/simplegit.git
 - [deleted]         serverfix</pre>
</div>

&emsp;&emsp;服务器上的分支没了。有种方便记忆这条命令的方法：记住我们不久前见过的 git push [远程名] [本地分支]:[远程分支] 语法，如果省略 [本地分支]，那就等于是在说&ldquo;在这里提取空白然后把它变成[远程分支]&rdquo;

&nbsp;

### 分支衍合

&emsp;&emsp;把一个分支中的修改整合到另一个分支的办法有两种：merge 和 rebase(rebase的翻译为&ldquo;衍合&rdquo;或变基)

【基本的衍合操作】

&emsp;&emsp;在分支合并一节中，开发进程分叉到两个不同分支，又各自提交了更新

![git_branch27](https://pic.xiaohuochai.site/blog/git_branch27.png)


&emsp;&emsp;最容易的整合分支的方法是merge命令，它会把两个分支最新的快照(C3和C4)以及二者最新的共同祖先(C2)进行三方合并，合并的结果是产生一个新的提交对象(C5)

![git_branch28](https://pic.xiaohuochai.site/blog/git_branch28.png)


&emsp;&emsp;其实，还有另外一个选择：你可以把在C3里产生的变化补丁在C4的基础上重新打一遍。在Git里，这种操作叫做衍合(rebase)。有了rebase命令，就可以把在一个分支里提交的改变移到另一个分支里重放一遍

<div>
<pre>$ git checkout experiment
$ git rebase master
First, rewinding head to replay your work on top of it...
Applying: added staged command</pre>
</div>

&emsp;&emsp;它的原理是回到两个分支最近的共同祖先，根据当前分支(也就是要进行衍合的分支experiment)后续的历次提交对象(这里只有一个C3)，生成一系列文件补丁，然后以基底分支(也就是主干分支master)最后一个提交对象(C4)为新的出发点，逐个应用之前准备好的补丁文件，最后会生成一个新的合并提交对象(C3')，从而改写experiment的提交历史，使它成为master分支的直接下游

![git_branch29](https://pic.xiaohuochai.site/blog/git_branch29.png)


&emsp;&emsp;现在回到master分支，进行一次快进合并

![git_branch30](https://pic.xiaohuochai.site/blog/git_branch30.png)


&emsp;&emsp;现在的C3'对应的快照，其实和普通的三方合并，即上个例子中的C5对应的快照内容一模一样了。虽然最后整合得到的结果没有任何区别，但衍合能产生一个更为整洁的提交历史。如果视察一个衍合过的分支的历史记录，看起来会更清楚：仿佛所有修改都是在一根线上先后进行的，尽管实际上它们原本是同时并行发生的

&emsp;&emsp;一般我们使用衍合的目的，是想要得到一个能在远程分支上干净应用的补丁&mdash;&mdash;比如某些项目你不是维护者，但想帮点忙的话，最好用衍合：先在自己的一个分支里进行开发，当准备向主项目提交补丁的时候，根据最新的origin/master进行一次衍合操作然后再提交，这样维护者就不需要做任何整合工作(实际上是把解决分支补丁同最新主干代码之间冲突的责任，化转为由提交补丁的人来解决)，只需根据你提供的仓库地址作一次快进合并，或者直接采纳你提交的补丁

&emsp;&emsp;注意：合并结果中最后一次提交所指向的快照，无论是通过衍合，还是三方合并，都会得到相同的快照内容，只不过提交历史不同罢了。衍合是按照每行的修改次序重演一遍修改，而合并是把最终结果合在一起

【有趣的衍合】

&emsp;&emsp;衍合也可以放到其他分支进行，并不一定非得根据分化之前的分支。以下图为例，我们为了给服务器端代码添加一些功能而创建了特性分支server，然后提交C3和C4。然后又从C3的地方再增加一个client分支来对客户端代码进行一些相应修改，所以提交了C8和C9。最后，又回到server分支提交了C10

![git_branch31](https://pic.xiaohuochai.site/blog/git_branch31.png)


&emsp;&emsp;假设在接下来的一次软件发布中，我们决定先把客户端的修改并到主线中，而暂缓并入服务端软件的修改(因为还需要进一步测试)。这个时候，我们就可以把基于client分支而非server分支的改变(即C8和C9)，跳过server直接放到master分支中重演一遍，但这需要用git rebase的--onto选项指定新的基底分支master

<div>
<pre>$ git rebase --onto master server client</pre>
</div>

&emsp;&emsp;这好比在说：&ldquo;取出client分支，找出client分支和server分支的共同祖先之后的变化，然后把它们在master上重演一遍&rdquo;

&emsp;&emsp;虽然client里的C8,C9在C3之后，但这仅表明时间上的先后，而非在C3修改的基础上进一步改动，因为server和client这两个分支对应的代码应该是两套文件，虽然这么说不是很严格，但应理解为在C3时间点之后，对另外的文件所做的C8，C9修改，放到主干重演

![git_branch32](https://pic.xiaohuochai.site/blog/git_branch32.png)


&emsp;&emsp;现在可以快进master分支了

<div>
<pre>$ git checkout master
$ git merge client</pre>
</div>

![git_branch33](https://pic.xiaohuochai.site/blog/git_branch33.png)


&emsp;&emsp;现在我们决定把server分支的变化也包含进来。我们可以直接把server分支衍合到master，而不用手工切换到server分支后再执行衍合操作&mdash;&mdash;git rebase [主分支] [特性分支]命令会先取出特性分支server，然后在主分支master上重演

<div>
<pre>$ git rebase master server</pre>
</div>

&emsp;&emsp;于是，server的进度应用到master的基础上，如下图所示

![git_branch34](https://pic.xiaohuochai.site/blog/git_branch34.png)


&emsp;&emsp;然后就可以快进主干分支master了

<div>
<pre>$ git checkout master
$ git merge server</pre>
</div>

&emsp;&emsp;现在client和server分支的变化都已经集成到主干分支来了，可以删掉它们了。最终我们的提交历史如下图所示

![git_branch35](https://pic.xiaohuochai.site/blog/git_branch35.png)


【衍合的风险】

&emsp;&emsp;要用衍合得遵守一条准则：一旦分支中的提交对象发布到公共仓库，就千万不要对该分支进行衍合操作

&emsp;&emsp;在进行衍合的时候，实际上抛弃了一些现存的提交对象而创造了一些类似但不同的新的提交对象。如果你把原来分支中的提交对象发布出去，并且其他人更新下载后在其基础上开展工作，而稍后你又用git rebase抛弃这些提交对象，把新的重演后的提交对象发布出去的话，你的合作者就不得不重新合并他们的工作，这样当你再次从他们那里获取内容时，提交历史就会变得一团糟

&emsp;&emsp;下面我们用一个实际例子来说明为什么公开的衍合会带来问题。假设你从一个中央服务器克隆然后在它的基础上搞了一些开发，提交历史如下图所示

![git_branch36](https://pic.xiaohuochai.site/blog/git_branch36.png)


&emsp;&emsp;现在，某人在C1的基础上做了些改变，并合并他自己的分支得到结果C6，推送到中央服务器。当你抓取并合并这些数据到你本地的开发分支中后，会得到合并结果C7

![git_branch37](https://pic.xiaohuochai.site/blog/git_branch37.png)


&emsp;&emsp;接下来，那个推送C6上来的人决定用衍合取代之前的合并操作；继而又用git push --force覆盖了服务器上的历史，得到C4'。而之后当你再从服务器上下载最新提交后，会得到

![git_branch38](https://pic.xiaohuochai.site/blog/git_branch38.png)


&emsp;&emsp;下载更新后需要合并，但此时衍合产生的提交对象C4'的SHA-1校验值和之前C4完全不同，所以Git会把它们当作新的提交对象处理，而实际上此刻你的提交历史C7中早已经包含了C4的修改内容，于是合并操作会把C7和C4'合并为C8

![git_branch39](https://pic.xiaohuochai.site/blog/git_branch39.png)


&emsp;&emsp;C8这一步的合并是迟早会发生的，因为只有这样你才能和其他协作者提交的内容保持同步。而在C8之后，你的提交历史里就会同时包含C4和C4'，两者有着不同的SHA-1校验值，如果用git log查看历史，会看到两个提交拥有相同的作者日期与说明，令人费解。而更糟的是，当你把这样的历史推送到服务器后，会再次把这些衍合后的提交引入到中央服务器，进一步困扰其他人

&emsp;&emsp;这个例子中，出问题的责任方是那个发布了C6后又用衍合发布C4'的人，其他人会因此反馈双重历史到共享主干，从而混淆大家的视听

&emsp;&emsp;如果把衍合当成一种在推送之前清理提交历史的手段，而且仅仅衍合那些尚未公开的提交对象，就没问题。如果衍合那些已经公开的提交对象，并且已经有人基于这些提交对象开展了后续开发工作的话，就会出现叫人沮丧的麻烦

&nbsp;

### 保存现场

&emsp;&emsp;软件开发中，bug就像家常便饭一样。有了bug就需要修复，在Git中，由于分支是如此的强大，所以，每个bug都可以通过一个新的临时分支来修复，修复后，合并分支，然后将临时分支删除。

&emsp;&emsp;当你接到一个修复一个代号101的bug的任务时，很自然地，你想创建一个分支`issue-101`来修复它，但是，等等，当前正在`dev`上进行的工作还没有提交：

<div>
<pre>$ git status
# On branch dev
# Changes to be committed:
#   (use "git reset HEAD &lt;file&gt;..." to unstage)
#
#       new file:   hello.py
#
# Changes not staged for commit:
#   (use "git add &lt;file&gt;..." to update what will be committed)
#   (use "git checkout -- &lt;file&gt;..." to discard changes in working directory)
#
#       modified:   readme.txt
#</pre>
</div>

&emsp;&emsp;并不是不想提交，而是工作只进行到一半，还没法提交，预计完成还需1天时间。但是，必须在两个小时内修复该bug，怎么办？

&emsp;&emsp;幸好，Git还提供了一个`stash`功能，可以把当前工作现场&ldquo;储藏&rdquo;起来，等以后恢复现场后继续工作

<div>
<pre>$ git stash
Saved working directory and index state WIP on dev: 6224937 add merge
HEAD is now at 6224937 add merge</pre>
</div>

&emsp;&emsp;现在，用`git status`查看工作区，就是干净的（除非有没有被Git管理的文件），因此可以放心地创建分支来修复bug。

&emsp;&emsp;首先确定要在哪个分支上修复bug，假定需要在`master`分支上修复，就从`master`创建临时分支

<div>
<pre>$ git checkout master
Switched to branch 'master'
Your branch is ahead of 'origin/master' by 6 commits.
$ git checkout -b issue-101
Switched to a new branch 'issue-101'</pre>
</div>

&emsp;&emsp;现在修复bug，需要把&ldquo;Git is free software ...&rdquo;改为&ldquo;Git is a free software ...&rdquo;，然后提交

<div>
<pre>$ git add readme.txt 
$ git commit -m "fix bug 101"
[issue-101 cc17032] fix bug 101
 1 file changed, 1 insertion(+), 1 deletion(-)</pre>
</div>

&emsp;&emsp;修复完成后，切换到`master`分支，并完成合并，最后删除`issue-101`分支

<div>
<pre>$ git checkout master
Switched to branch 'master'
Your branch is ahead of 'origin/master' by 2 commits.
$ git merge --no-ff -m "merged bug fix 101" issue-101
Merge made by the 'recursive' strategy.
 readme.txt |    2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
$ git branch -d issue-101
Deleted branch issue-101 (was cc17032).</pre>
</div>

&emsp;&emsp;现在，是时候接着回到`dev`分支

<div>
<pre>$ git checkout dev
Switched to branch 'dev'
$ git status
# On branch dev
nothing to commit (working directory clean)</pre>
</div>

&emsp;&emsp;工作区是干净的，刚才的工作现场存到哪去了？用`git stash list`命令看看：

<div>
<pre>$ git stash list
stash@{0}: WIP on dev: 6224937 add merge</pre>
</div>

&emsp;&emsp;一是用`git stash apply`恢复，但是恢复后，stash内容并不删除，你需要用`git stash drop`来删除；

&emsp;&emsp;另一种方式是用`git stash pop`，恢复的同时把stash内容也删了

<div>
<pre>$ git stash pop
# On branch dev
# Changes to be committed:
#   (use "git reset HEAD &lt;file&gt;..." to unstage)
#
#       new file:   hello.py
#
# Changes not staged for commit:
#   (use "git add &lt;file&gt;..." to update what will be committed)
#   (use "git checkout -- &lt;file&gt;..." to discard changes in working directory)
#
#       modified:   readme.txt
#
Dropped refs/stash@{0} (f624f8e5f082f2df2bed8a4e09c12fd2943bdd40)</pre>
</div>

&emsp;&emsp;再用`git stash list`查看，就看不到任何stash内容了

<div>
<pre>$ git stash list</pre>
</div>

&emsp;&emsp;可以多次stash，恢复的时候，先用`git stash list`查看，然后恢复指定的stash，用命令

<div>
<pre>$ git stash apply stash@{0}</pre>
</div>

&emsp;&emsp;总结一下，修复bug时，我们会通过创建新的bug分支进行修复，然后合并，最后删除；当手头工作没有完成时，先把工作现场`git stash`一下，然后去修复bug，修复后，再`git stash pop`，回到工作现场