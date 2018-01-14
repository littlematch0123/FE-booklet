# sublime简要笔记

### 选中单词

　　[1]选中当前单词 　　　　ctrl+d

　　[2]跳过当前单词 　　　　ctrl+k ctrl+d

　　[3]选中相同的所有单词 　alt+f3

　　[4]多行游标 按住shift，然后按住鼠标右键向下拖动

![helper_sublime1](https://pic.xiaohuochai.site/blog/helper_sublime1.gif)

&nbsp;

### 行操作

　　[1]选中当前行 　　　　ctrl+l

　　[2]复制当前行　　　　 ctrl+shift+d

　　[3]删除当前行　　　　 ctrl+shift+k

　　[4]和下一行合并 　　　ctrl+j

　　[5]当前行上下移动 　　ctrl+shift+up、ctrl+shift+down

　　[6]在上行添加空行 　　ctrl+shift+enter

　　[7]在下行添加空行　　 ctrl+enter

![helper_sublime2](https://pic.xiaohuochai.site/blog/CSS_grammer_alternate.gif)

&nbsp;

### 删除

　　[1]删除后一个单词 　　　　　　ctrl+delete

　　[2]删除前一个单词　　　　　　 ctrl+backspace

　　[3]删除该行后面的所有单词 　　连按两次ctrl+k　　

　　[4]删除该行前面的所有单词 　　连按ctrl+k ctrl+backspace

　　[5]删除当前行 　　　　　　 　 &nbsp;ctrl+shift+k

![helper_sublime3](https://pic.xiaohuochai.site/blog/helper_sublime3.gif)

&nbsp;

### goto(ctrl+p)

　　[1]文件名 　　要打开的文件&nbsp;

　　[2]:行 　　　 &nbsp;具体行(ctrl+g)

　　[3]@名称 　　CSS选择器、HTMLID名及ID值、js事件及函数名(ctrl+r)

　　[4]#关键字 　&nbsp;具体的关键字(ctrl+;)

<div class="cnblogs_code">
<pre>:20    　　20行
@body 　　找出body选择器
#a 　　　　找出页面中带有a的单词</pre>
</div>

![helper_sublime4](https://pic.xiaohuochai.site/blog/helper_sublime4.gif)

&nbsp;

### 缩进&nbsp;

　　[1]向前缩进 tab、ctrl+[

　　[2]向后缩进 tab+shift、ctrl+]

&nbsp;

### 注释

　　[1]注释和取消注释单行 ctrl+/

　　[2]注释和取消注释大段代码 ctrl+shift+/

&nbsp;

### 查找和正则

　　[1]查找 ctrl+f

　　[2]替换 ctrl+h

　　[3]正则 在查找或替换面板中点击*号，或者alt+r

&nbsp;

### 折叠

　　[1]折叠代码 ctrl+shift+[

　　[2]展开代码 ctrl+shif+]

&nbsp;

### 代码大小写

　　[1]代码大写 连按ctrl+k ctrl+u

　　[2]代码小写 连按ctrl+k ctrl+l

&nbsp;

### 其他

　　命令面板 　　　　　　　　ctrl+shift+p(可以进行模糊匹配)

　　侧边栏 　　　　　　　　　ctrl+k ctrl+b

　　粘贴代码保持缩进格式 　　ctrl+shift+v

　　闭合标签　　　　　　　　 alt+.

　　选中光标所在的首尾标签 &nbsp; &nbsp;ctrl+shif+'

　　ctrl+,&nbsp;　　　　　　　　　按一次选中当前标签，按两次加选同级标签，按三次加选父级标签，以此类推

　　ctrl+shif+;&nbsp;　　　　　　去掉父级元素，使自身提升一级，可连按，以此类推

&nbsp;

### 插件

**package control安装**

　　代码地址：[https://packagecontrol.io/installation](https://packagecontrol.io/installation)

<div class="cnblogs_code">
<pre>//TEXT3
import urllib.request,os,hashlib; h = '2915d1851351e5ee549c20394736b442' + '8bc59f460fa1548d1514676163dafc88'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)</pre>
</div>
<div class="cnblogs_code">
<pre>//TEXT2
import urllib2,os,hashlib; h = '2915d1851351e5ee549c20394736b442' + '8bc59f460fa1548d1514676163dafc88'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); os.makedirs( ipp ) if not os.path.exists(ipp) else None; urllib2.install_opener( urllib2.build_opener( urllib2.ProxyHandler()) ); by = urllib2.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); open( os.path.join( ipp, pf), 'wb' ).write(by) if dh == h else None; print('Error validating download (got %s instead of %s), please try manual install' % (dh, h) if dh != h else 'Please restart Sublime Text to finish installation')</pre>
</div>

　　安装步骤：ctrl+`(或者view -&gt; show console) 打开控制台，将上面的代码复制到控制台并回车

&nbsp;

**emmet**

　　[1]! 　　-&gt; 自动生成骨架结构

　　[2]#foo -&gt; ID为'foo'

　　[3].foo &nbsp;-&gt; 类名为'foo'

　　[4]+&nbsp;　 -&gt; 同级元素

　　[5]*3&nbsp;　-&gt; 生成3个元素

　　[6]w100 -&gt; width:100px

　　[7]m5e &nbsp; -&gt; margin: 5em

　　[8]@f&nbsp;　 &nbsp;-&gt;@font-face

　　[9]$　　-&gt;从1开始的递增值

　　[10]{}&nbsp;　-&gt;元素内容

　![helper_sublime5](https://pic.xiaohuochai.site/blog/helper_sublime5.gif)

### 代码段

Sublime中的代码叫snippets，位于Preferences-&gt;Browse Packages中的User文件夹下的snippnets文件夹中

里面存放着自定义的各种代码段

![helper_sublime6](https://pic.xiaohuochai.site/blog/helper_sublime6.png)

一般地，人们常用markdown语言来编写网络文档，但我觉得markdown语言生成的html文件不太干净。使用sublime配合代码段就可以生成比较干净的html文件

以生成一个首行缩进的段落为例

使用Tools-Developer-New Snippet来新建一个代码段，如下所示

![helper_sublime7](https://pic.xiaohuochai.site/blog/helper_sublime7.gif)

然后进行如下设置，\${1}和\${2}分别代表着代码生成时出现的位置，以及按Tab按键后出现的位置；tabTrigger元素的内容p2代表该snippet的快捷键，输入p2，再按住tab按键，则出现自定义的代码

<div class="cnblogs_code">
<pre>&lt;snippet&gt;
    &lt;content&gt;&lt;![CDATA[
&lt;p style="text-indent:2em"&gt;${1}&lt;/p&gt;
${2}
]]&gt;&lt;/content&gt;
    &lt;!-- Optional: Set a tabTrigger to define how to trigger the snippet --&gt;
    &lt;tabTrigger&gt;p2&lt;/tabTrigger&gt;
    &lt;!-- Optional: Set a scope to limit where the snippet will trigger --&gt;
    &lt;!-- &lt;scope&gt;source.python&lt;/scope&gt; --&gt;
&lt;/snippet&gt;    </pre>
</div>

![helper_sublime9](https://pic.xiaohuochai.site/blog/helper_sublime9.gif)

&nbsp;

### 命令行启动

　　如果要在命令行中使用subl命令启动sublime，只需要将sublime的安装目录添加到环境变量即可

![helper_sublime10](https://pic.xiaohuochai.site/blog/helper_sublime10.png)

　　使用命令行工具，新建一个a.js

![helper_sublime11](https://pic.xiaohuochai.site/blog/helper_sublime11.gif)

