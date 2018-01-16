# 移动web开发之移动端真机测试

　　chrome的开发者工具可以很好地做好模拟工作，但毕竟模拟和实际还是有差别的。所以，真机测试是一定要做的，如何高效地进行真机测试呢。个人感觉，还是[BrowserSync](http://www.browsersync.cn/)用得比较称手。本文将详细介绍如何应用BrowserSync进行移动端真机测试

&nbsp;

### 特性

 　　BrowserSync能让PC、各移动设备上的页面同时实时地响应文件的更改，而不用刷新操作。而且，当在其他一个设备上进行点击等行为时，该行为也会同步到其他浏览器中

![mobile_phoneTest1](https://pic.xiaohuochai.site/blog/mobile_phoneTest1.gif)

&nbsp;

### 安装

　　BrowserSync是基于Node.js的，是一个Node模块，所以需要先安装nodejs

【nodejs安装】

　　虽然[nodejs官网](https://nodejs.org)提供了node的msi文件，但本人在window7系统下多次尝试，均无法安装成功，且会有your system has not been modified...的提示。最终本人使用了另一种方法成功安装了nodejs

　　【1】下载[node.exe](http://nodejs.org/dist/v0.10.26/x64/node.exe)

　　【2】下载最新版本的[npm zip格式压缩包](http://nodejs.org/dist/npm/)

　　【3】在硬盘某个位置，如D盘下建立一个文件nodejs，把上面两个下载的东西都放在这里，npm要解压

　　【4】配置两个环境变量：一个是PATH上增加node.exe的目录D:\nodejs，一个是增加环境变量NODE_PATH，值为D:\nodejs\node_modules

![mobile_phoneTest2](https://pic.xiaohuochai.site/blog/mobile_phoneTest2.jpg)

<table border="0">
<tbody>
<tr>
<td>

![mobile_phoneTest3](https://pic.xiaohuochai.site/blog/mobile_phoneTest3.jpg)

</td>
<td>

![mobile_phoneTest4](https://pic.xiaohuochai.site/blog/mobile_phoneTest4.jpg)

</td>
</tr>
</tbody>
</table>

　　【5】安装express：打开cmd命令行(在nodejs目录下，先按住shift按键，再点击右键，出现"在此处打开命令窗口"选项并点击)，使用命令行定位到这Node目录下，键入指令npm install express

　　【6】安装完成后，在命令行里面输入node -v如果输出nodejs的版本则安装成功

&nbsp;

### 设置

　　nodejs安装完成后，需要对BrowserSync进行些简单设置，包括安装与监听

　　【1】BrowserSync安装

　　打开一个终端窗口，运行以下命令：

<div class="cnblogs_code">
<pre>npm install -g browser-sync</pre>
</div>

　　【2】BrowserSync监听

　　files 路径是相对于运行该命令的项目（目录）。如果需要监听多个类型的文件，需要用逗号隔开

<div class="cnblogs_code">
<pre>browser-sync start --server --files "css/*.css, *.html"</pre>
</div>

　　【3】在nodejs目录下新建一个index.html的文件，并设置如下代码

<div class="cnblogs_code">
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;title&gt;Document&lt;/title&gt;
&lt;style&gt;
div{
    height: 100px;
    width: 100px;
    background-color: lightblue;
}    
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div&gt;测试文字&lt;/div&gt;    
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>

　　桌面端页面打开如下：

![mobile_phoneTest5](https://pic.xiaohuochai.site/blog/mobile_phoneTest5.jpg)

　　[注意]如果网页中显示Cannot get/，是因为在项目目录下找不到默认首页index.html


### 移动端设置

　　若使用移动端则首先先保证移动端设备和桌面端设备处于同一局域网(一般地，都连入一个路由器即可)。而且，移动端无法访问localhost，需要查找电脑的内网ip。通过在命令行中输入ipconfig，查看ip地址为192.168.1.100。所以手机端访问的地址为`http://192.168.1.100:3000`

![mobile_phoneTest6](https://pic.xiaohuochai.site/blog/mobile_phoneTest6.jpg)

　　则移动端显示如下:

![mobile_phoneTest7](https://pic.xiaohuochai.site/blog/mobile_phoneTest7.jpg)

　　当把html文件修改为如下代码时

<div class="cnblogs_code">
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;title&gt;Document&lt;/title&gt;
&lt;style&gt;
html{
    background-color: pink;
}
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div&gt;测试文字&lt;/div&gt;    
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>

　　无需刷新，移动端的网页自动变化为如下显示:

![mobile_phoneTest8](https://pic.xiaohuochai.site/blog/mobile_phoneTest8.jpg)

　　这样，就可以开始轻松地测试移动端设备了。

