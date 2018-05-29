# webpack命令行

&emsp;&emsp;webpack提供了命令行接口（CLI），以便对构建过程进行配置和交互。这对于制定早期原型、轮廓、编写 npm 脚本或者一些个人自定义需求很有用。本文将详细介绍webpack的命令行接口

&nbsp;

### 常用配置

【--help】

&emsp;&emsp;列出命令行所有可用的配置选项

<div>
<pre>webpack --help
webpack -h</pre>
</div>

【--config】

&emsp;&emsp;指定其它的配置文件。配置文件默认为 webpack.config.js，如果想使用其它配置文件，可以加入这个参数

<div>
<pre>webpack --config example.config.js</pre>
</div>

【--progress】

&emsp;&emsp;打印出编译进度的百分比值

<div>
<pre>webpack --progress</pre>
</div>

![webpackCli1](https://pic.xiaohuochai.site/blog/utils_build_webpackCli1.gif)

【--watch】

&emsp;&emsp;观察文件系统的变化

<div>
<pre>webpack --watch
webpack -w</pre>
</div>

【--colors】

&emsp;&emsp;开启/关闭控制台的颜色 [默认值: (supports-color)]

<div>
<pre>webpack --colors
webpack --color</pre>
</div>

【-p】

&emsp;&emsp;压缩混淆脚本

<div>
<pre>webpack -p</pre>
</div>

![webpackCli2](https://pic.xiaohuochai.site/blog/utils_build_webpackCli2.png)

【--profile】

&emsp;&emsp;记录编译的性能数据，并且输出。它会告诉你编译过程中哪些步骤耗时最长，这对于优化构建的性能很有帮助


![webpackCli3](https://pic.xiaohuochai.site/blog/utils_build_webpackCli3.png)

&nbsp;

### 脚本

&emsp;&emsp;package.json文件中有scripts字段，该字段指定了运行脚本命令的npm命令行缩写。因此，我们可以把常用命令制作成脚本

<div>
<pre>//package.json
  "scripts": {
    "w": "webpack --progress  --colors  --watch",
    "p": "webpack -p",
    "dev":"webpack-dev-server"
  }</pre>
</div>

&emsp;&emsp;运行npm run w时，相当于运行webpack --progress --colors --watch，表示运行监视模式，使用彩色字符，并显示出打包的百分比过程

&emsp;&emsp;运行npm run p时，相当于运行webpack -p，表示压缩模块文件

&emsp;&emsp;运行npm run dev时，相当于运行webpack-dev-server，表示运行本地服务器