# 不常见但很有用的chrome调试工具使用方法

&emsp;&emsp;对于chrome调试工具，常用的是elements标签、console标签、sources标签和network标签。但实际上，还有一些不太常见但相当实用的方法可以提高网页调试效率。本文将详细介绍那些不常见的chrome调试工具使用方法

<p>&nbsp;</p>

### 控制台

&emsp;&emsp;在控制台直接输入代码，按下回车键，代码就会被执行。其返回值也会在控制台中被打印出来

&emsp;&emsp;通过上下箭头键，可以随时从相关列表中找回已经执行过的命令，并在控制台中重新执行它们

&emsp;&emsp;通常情况下，控制台只提供单行输入，我们可以用分号做分割符来执行多个javascript语句；而如果需要多行代码的话，可以通过组合键shift+enter来实现换行，在这种情况下代码不会被立即执行


<p>&nbsp;</p>

### 刷新

&emsp;&emsp;一般地，人们对于刷新的印象只是停留在使用F5快捷键上。但实际上，刷新包括三种。在开发者调试工具打开的情况下，长按刷新按钮，会出现这三种刷新选项

<div><img src="https://pic.xiaohuochai.site/blog/helper_chrome1.png" alt="#"></div>



<p>&nbsp;</p>


### 搜索


&emsp;&emsp;在elements标签下使用ctrl+f搜索功能，可以使用css选择器，如'.test'，所以搜索到所有类名为test的元素


<div><img src="https://pic.xiaohuochai.site/blog/helper_chrome2.png" alt="#"></div>


<p>&nbsp;</p>


### 计算样式

&emsp;&emsp;通过点击elements标签右侧的computed子标签，可以查看元素计算后的样式



<div><img src="https://pic.xiaohuochai.site/blog/helper_chrome3.png" alt="#"></div>


<p>&nbsp;</p>


### 资源映射

&emsp;&emsp;使用chrome浏览器的sourcemap功能可以将本地的文件和服务器上的文件关联起来。这样，通过chrome的开发者工具调试网页(如更改一个css属性值)时，本地文件的内容也会相应地发生变化并保存。如果再使用sass的watch命令， 在调试sass文件时，就可以实时保存文件并通过浏览器看到效果

&emsp;&emsp;如下图所示，点击map to network resource，把本地文件关联到服务器上相应文件。浏览器会智能地把项目目录下的其他css文件和html文件和服务器上对应的文件都关联起来

<div><img src="https://pic.xiaohuochai.site/blog/helper_chrome4.png" alt="#"></div>

<div><img src="https://pic.xiaohuochai.site/blog/helper_chrome5.gif" alt="#"></div>

<p>&nbsp;</p>

### 当前位置

&emsp;&emsp;在elements标签下，选择元素节点，点击右键菜单中的scroll into view，可以滚动浏览器到元素所处位置

<div><img src="https://pic.xiaohuochai.site/blog/helper_chrome6.png" alt="#"></div>

<p>&nbsp;</p>

### 代码反压缩

&emsp;&emsp;一般地，线上的javascript代码都是经过压缩的，基本上无法直接阅读。点击下方的大括号｛｝图标，浏览器会反压缩过重新排版美化当前的javascript代码

<div><img src="https://pic.xiaohuochai.site/blog/helper_chrome7.gif" alt="#"></div>

<p>&nbsp;</p>

### 断点调试

【按钮介绍】


<div><img src="https://pic.xiaohuochai.site/blog/helper_chrome8.png" alt="#"></div>

    第一个按钮(F8)：断点间调试
    第二个按钮(F10)：单步调试
    第三个按钮(F11)：进入函数
    第四个按钮(shift+F11)：离开函数
    第五个按钮(ctrl+F8)：取消全部断点

【文件搜索】

&emsp;&emsp;搜索要进行断点调试的文件，使用ctrl+o即可调出搜索框

<div><img src="https://pic.xiaohuochai.site/blog/helper_chrome9.gif" alt="#"></div>

【添加watch】

&emsp;&emsp;要将变量或函数添加到watch中，只需进行如下操作


<div><img src="https://pic.xiaohuochai.site/blog/helper_chrome10.gif" alt="#"></div>

【删除全部断点】

&emsp;&emsp;在右侧断点区域(breakpoints)点击鼠标右键，选择(remove all breakpoints)即可

<div><img src="https://pic.xiaohuochai.site/blog/helper_chrome11.gif" alt="#"></div>