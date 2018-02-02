# 电脑常见问题处理

　　作为程序员，每天与电脑打交道的时间可能比家人还多。所以，掌握一些电脑常识，处理棘手问题是必备技能

&nbsp;

### 删除文件

　　一些文件由于各种原因，无法直接删除。例如，我在卸载git时，安装目录下有一个git_shell_ext64.dll文件无法删除

　　解决办法是修改其后缀名，如git_shell_ext64.txt，然后重启电脑，即可删除


![helper_common1](https://pic.xiaohuochai.site/blog/helper_common1.gif)


### 新建点文件

　　现在，许多软件都需要使用点文件，如.jshintrc、.editorconfig等。而window系统不支持新建点文件


![helper_common2](https://pic.xiaohuochai.site/blog/helper_common2.gif)


&nbsp;　　解决方法有以下三种

　　1、使用sublime等代码编辑工具新建

　　2、使用shell命令，如touch .a

　　3、最简单的一种，是文件命名为.a.，则windows系统将自动识别为.a


![helper_common3](https://pic.xiaohuochai.site/blog/helper_common3.gif)


&nbsp;

### 网站搜索

　　一般地，我们使用搜索引擎来搜索内容

【site:网址】

　　如果，想针对指定网站搜索内容是有简单办法的，格式如下

<div class="cnblogs_code">
<pre>　　site:网站域名  要搜索的内容</pre>
</div>

　　以博客园搜索小火柴为例

<div class="cnblogs_code">
<pre>　　site:cnblogs.com 小火柴</pre>
</div>

![helper_common4](https://pic.xiaohuochai.site/blog/helper_common4.png)


【intitle:关键词】

　　这个搜索指令是想告诉搜索引擎，搜索出来的结果，标题一定要包含输入的关键词。不然有时候搜索网页里面也会包括所输入的关键词


![helper_common5](https://pic.xiaohuochai.site/blog/helper_common5.png)


【关键词】

　　1、双引号

　　把关键词放在双引号里面，是想告诉搜索引擎，搜索出来的结果，必须包含双号里面的所有词语，且顺序一个也不能打乱


![helper_common6](https://pic.xiaohuochai.site/blog/helper_common6.png)


　　2、中划线

　　使用中划线可以告诉搜索引擎，搜索出来的结果不能带有中划线后的关键词。使用"-推广链接"可以去掉百度中的广告


![helper_common7](https://pic.xiaohuochai.site/blog/helper_common7.png)


【filetype:文件格式】

　　这个搜索指令是想告诉搜索引擎，结果只显示关键词为某类文件格式的链接


![helper_common8](https://pic.xiaohuochai.site/blog/helper_common8.png)


### vscode

　　有时，vscode会出现CPU利用率100%的情况，两个rg.exe占用了全部的CPU。解决办法如下

　　文件&gt;首选项&gt;设置, 搜索设置 search.followSymlinks ：false；

&nbsp;