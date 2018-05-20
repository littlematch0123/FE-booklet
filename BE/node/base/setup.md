# nodejs安装

&emsp;&emsp;搜索了好多文档后，才成功地安装了sublime text3的nodejs插件。为了存档，也为了方便有同样需求的朋友，将其安装过程详细记录如下

&nbsp;

### 安装nodejs

&emsp;&emsp;虽然[nodejs官网](https://nodejs.org)提供了node的msi文件，但本人在win7系统下多次尝试，均无法安装成功，且会有your system has not been modified...的提示。最终本人使用了另一种方法成功安装了nodejs

&emsp;&emsp;1、下载[node.exe](http://nodejs.org/dist/v0.10.26/x64/node.exe)

&emsp;&emsp;2、下载最新版本的[npm zip格式压缩包](http://nodejs.org/dist/npm/)

&emsp;&emsp;3、在硬盘某个位置，如D盘下建立一个文件nodejs，把上面两个下载的东西都放在这里，npm要解压

&emsp;&emsp;4、配置两个环境变量：一个是PATH上增加node.exe的目录D:\nodejs，一个是增加环境变量NODE_PATH，值为D:\nodejs\node_modules

![nodejs_setup1](https://pic.xiaohuochai.site/blog/nodejs_setup1.jpg)

![nodejs_setup2](https://pic.xiaohuochai.site/blog/nodejs_setup2.jpg)

![nodejs_setup3](https://pic.xiaohuochai.site/blog/nodejs_setup3.jpg)

&emsp;&emsp;5、安装express：打开cmd命令行(在nodejs目录下，先按住shift按键，再点击右键，出现"在此处打开命令窗口"选项并点击)，使用命令行定位到这Node目录下，键入指令npm install express

&emsp;&emsp;6、安装完成后，在命令行里面输入node -v如果输出nodejs的版本则安装成功

&nbsp;

### 下载并设置nodejs插件

&emsp;&emsp;[下载地址](https://github.com/tanepiper/SublimeText-Nodejs)为https://github.com/tanepiper/SublimeText-Nodejs

![nodejs_setup4](https://pic.xiaohuochai.site/blog/nodejs_setup4.png)

&emsp;&emsp;下载zip压缩包后解压，文件名改为Nodejs

![nodejs_setup5](https://pic.xiaohuochai.site/blog/CSS_grammer_alternate.gif)

&emsp;&emsp;打开Sublime Text3，点击菜单“Perferences” =>“Browse Packages”打开“Packages”文件夹，并将上一步的Nodejs文件夹剪切进来

![nodejs_setup6](https://pic.xiaohuochai.site/blog/nodejs_setup6.gif)

&nbsp;

### 配置参数

&emsp;&emsp;1、打开文件“Nodejs.sublime-build”，将代码 `"encoding": "cp1252"` 改为 `"encoding": "utf8"`，将代码 `"cmd": ["taskkill /F /IM node.exe & node", "$file"] `改为`"cmd": ["node", "$file"]`，保存文件

![nodejs_setup7](https://pic.xiaohuochai.site/blog/nodejs_setup7.gif)

&emsp;&emsp;2、先找到nodejs安装路径，我电脑nodejs的安装路径为"d:\nodejs"。然后打开文件“Nodejs.sublime-settings”，将代码`"node_command": false`改为 `"node_command": "D:\nodejs\node.exe"`，将代码`"npm_command": false`改为`"npm_command": "D:\nodejs\npm.cmd"`，保存文件

![nodejs_setup8](https://pic.xiaohuochai.site/blog/nodejs_setup8.gif)

&nbsp;

### 测试

&emsp;&emsp;编写一个测试文件test.js，按"ctrl+B"运行代码，运行结果如下所示

![nodejs_setup9](https://pic.xiaohuochai.site/blog/nodejs_setup9.gif)

