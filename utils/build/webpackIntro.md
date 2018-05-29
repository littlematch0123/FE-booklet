# webpack入门

&emsp;&emsp;webpack 是一个模块打包器(module bundler)（例如，Browserify 或 Brunch）。它不是一个任务执行器(task runner)（例如，Make, Grunt 或者 Gulp ）。任务执行器就是用来自动化处理常见的开发任务，例如项目的检查(lint)、构建(build)、测试(test)。相对于打包器(bundler)，任务执行器则聚焦在偏重上层的问题上面。可以得益于使用上层的工具，而将打包部分的问题留给 webpack

&emsp;&emsp;打包器(bundler)帮助你取得准备用于部署的 JavaScript 和样式表，将它们转换为适合浏览器的可用格式。例如，JavaScript可以压缩、拆分 chunk 和懒加载，以提高性能。打包是 web 开发中最重要的挑战之一，解决此问题可以消除开发过程中的大部分痛点

&emsp;&emsp;webpack的内容丰富且杂乱，对于新手并不友好。本文以一个实例的形式，对webpack的重要概念进行介绍，并着重说明如何使用webpack

&nbsp;

### 概述

&emsp;&emsp;webpack是一个模块打包器。

【特点】

&emsp;&emsp;webpack有以下特点

**代码拆分**

&emsp;&emsp;webpack 有两种组织模块依赖的方式，同步和异步。异步依赖作为分割点，形成一个新的块。在优化了依赖树后，每一个异步区块都作为一个文件被打包。

**Loader**

&emsp;&emsp;Webpack 本身只能处理原生的 JavaScript 模块，但是 loader 转换器可以将各种类型的资源转换成 JavaScript 模块。这样，任何资源都可以成为 Webpack 可以处理的模块。

**智能解析**

&emsp;&emsp;Webpack 有一个智能解析器，几乎可以处理任何第三方库，无论它们的模块形式是 CommonJS、 AMD 还是普通的 JS 文件。甚至在加载依赖的时候，允许使用动态表达式 require("./templates/" + name + ".jade")。

**插件系统**

&emsp;&emsp;Webpack 还有一个功能丰富的插件系统。大多数内容功能都是基于这个插件系统运行的，还可以开发和使用开源的 Webpack 插件，来满足各式各样的需求。

**快速运行**

&emsp;&emsp;Webpack 使用异步 I/O 和多级缓存提高运行效率，这使得 Webpack 能够以令人难以置信的速度快速增量编译

【安装】

&emsp;&emsp;用 npm 安装 Webpack

<div>
<pre>$ npm install webpack</pre>
</div>

&emsp;&emsp;一个常见的问题是：安装webpack后，无法使用webpack命令

&emsp;&emsp;这是因为只进行了本地安装，没有全局安装，输入如下代码进行全局安装后即可运行

<div>
<pre>$ npm install webpack -g</pre>
</div>

&emsp;&emsp;如果热衷于使用最新版本的 webpack，可以使用以下命令，直接从 webpack 的仓库中安装

```
npm install webpack@beta
```

&emsp;&emsp;安装最新体验版本时要小心！它们可能仍然包含 bug，因此不应该用于生产环境

&nbsp;

### 使用

&emsp;&emsp;首先创建一个静态页面index.html和一个JS入口文件entry.js

<div>
<pre>&lt;!-- index.html --&gt;
&lt;html&gt;
&lt;head&gt;
  &lt;meta charset="utf-8"&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;script src="bundle.js"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>
<div>
<pre>// entry.js
document.write('It works.')</pre>
</div>

&emsp;&emsp;然后编译 entry.js 并打包到 bundle.js：

<div>
<pre>$ webpack entry.js bundle.js</pre>
</div>

&emsp;&emsp;打包过程会显示日志：

<div>
<pre>Hash: f47511e706e3de8f2417
Version: webpack 2.6.1
Time: 47ms
    Asset     Size  Chunks             Chunk Names
bundle.js  2.66 kB       0  [emitted]  main
   [0] ./entry.js 27 bytes {0} [built]</pre>
</div>

&emsp;&emsp;用浏览器打开&nbsp;`index.html`&nbsp;将会看到&nbsp;`It works.`&nbsp;

![webpackIntro1](https://pic.xiaohuochai.site/blog/utils_build_webpackIntro1.png)

&emsp;&emsp;接下来添加一个模块&nbsp;`module.js`&nbsp;并修改入口&nbsp;`entry.js`：&nbsp;

<div>
<pre>// module.js
module.exports = 'It works from module.js.'</pre>
</div>
<div>
<pre>// entry.js
document.write('It works.')
document.write(require('./module.js')) // 添加模块</pre>
</div>

&emsp;&emsp;重新打包&nbsp;`webpack entry.js bundle.js`&nbsp;后刷新页面看到变化&nbsp;`It works.It works from module.js.`

![webpackIntro2](https://pic.xiaohuochai.site/blog/utils_build_webpackIntro2.png)

<div>
<pre>Hash: 09733456f2c5b24a4845
Version: webpack 2.6.1
Time: 61ms
    Asset     Size  Chunks             Chunk Names
bundle.js  2.83 kB       0  [emitted]  main
   [0] ./module.js 43 bytes {0} [built]
   [1] ./entry.js 75 bytes {0} [built]</pre>
</div>

&emsp;&emsp;Webpack会分析入口文件，解析包含依赖关系的各个文件。这些文件（模块）都打包到 bundle.js 。Webpack 会给每个模块分配一个唯一的 id 并通过这个 id 索引和访问模块。在页面启动时，会先执行 entry.js 中的代码，其它模块会在运行&nbsp;`require`&nbsp;的时候再执行

&nbsp;

### Loader

&emsp;&emsp;Webpack 本身只能处理 JavaScript 模块，如果要处理其他类型的文件，就需要使用 loader 进行转换。

&emsp;&emsp;Loader 可以理解为是模块和资源的转换器，它本身是一个函数，接受源文件作为参数，返回转换的结果。详细信息[移步至此](http://www.cnblogs.com/xiaohuochai/p/7002344.html#anchor3)&emsp;&emsp;　

&emsp;&emsp;接上面的例子，我们要在页面中引入一个CSS文件style.css，要使用require("!style-loader!css-loader!./style.css")代码，代码读取顺序从右向左，表示首页将 style.css 也看成是一个模块，先加载style.css，然后用&nbsp;`css-loader`&nbsp;来读取它，再用&nbsp;`style-loader`&nbsp;把它插入到页面中

<div>
<pre>/* style.css */
body { background: yellow; }</pre>
</div>

&emsp;&emsp;修改 entry.js：

<div>
<pre>require("style-loader!css-loader!./style.css") 
document.write('It works.')
document.write(require('./module.js'))</pre>
</div>

&emsp;&emsp;安装 loader：

<div>
<pre>npm install css-loader style-loader</pre>
</div>

&emsp;&emsp;重新编译打包，刷新页面，就可以看到黄色的页面背景了

&emsp;&emsp;如果每次&nbsp;`require`&nbsp;CSS 文件的时候都要写 loader 前缀，是一件很繁琐的事情。我们可以根据模块类型（扩展名）来自动绑定需要的 loader。

&emsp;&emsp;将 entry.js 中的&nbsp;`require("!style-loader!css-loader!./style.css")`&nbsp;修改为&nbsp;`require("./style.css")`&nbsp;，然后执行

<div>
<pre>$ webpack entry.js bundle.js --module-bind 'css=style-loader!css-loader'</pre>
</div>

&emsp;&emsp;显然，这两种使用 loader 的方式，效果是一样的

![webpackIntro3](https://pic.xiaohuochai.site/blog/utils_build_webpackIntro3.png)

&nbsp;

### 配置

&emsp;&emsp;Webpack 在执行的时候，除了在命令行传入参数，还可以通过指定的配置文件来执行。默认情况下，会搜索当前目录的&nbsp;`webpack.config.js`&nbsp;文件，这个文件是一个 node.js 模块，返回一个 json 格式的配置信息对象，或者通过&nbsp;`--config`选项来指定配置文件。

&emsp;&emsp;继续我们的案例，在根目录创建&nbsp;`package.json`&nbsp;来添加 webpack 需要的依赖：

<div>
<pre>{
  "name": "project",
  "version": "1.0.0",
  "devDependencies": {
    "css-loader": "^0.28.4",
    "style-loader": "^0.18.2",
    "webpack": "^2.6.1"
  }
}</pre>
</div>

&emsp;&emsp;别忘了运行&nbsp;`npm install`。然后创建一个配置文件&nbsp;`webpack.config.js`，在下面的配置中，对一个单独的module对象定义了rules属性，里面包含两个必须属性：test和use。相当于告诉webpack compiler，碰到「在require()/import语句中被解析为'.css'的路径」时，在把它们添加并打包之前，要先使用css-loader后使用style-loader去转换

<div>
<pre>var webpack = require('webpack');
module.exports = {
  entry: './entry.js', //入口文件
  output: {
    path: __dirname,//出口路径
    filename: 'bundle.js'//出口名称
  },
  module: {
    rules: [
      {test: /\.css$/,use: [ 'style-loader', 'css-loader' ]}
    ]
  }
}</pre>
</div>

&emsp;&emsp;同时简化&nbsp;`entry.js`&nbsp;中的&nbsp;`style.css`&nbsp;加载方式：

<div>
<pre>require('./style.css');</pre>
</div>

&emsp;&emsp;最后运行&nbsp;`webpack`，可以看到 webpack 通过配置文件执行的结果和上一节通过命令行&nbsp;`webpack entry.js bundle.js --module-bind 'css=style!css'`&nbsp;执行的结果是一样的

&emsp;&emsp;如果配置文件并不叫做默认的webpack.config.js，而是其他的名称，如test.js，则需要设置如下命令进行打包

<div>
<pre>webpack --config test.js</pre>
</div>

&nbsp;

### 插件

&emsp;&emsp;插件可以完成更多 loader 不能完成的功能。插件的使用一般是在 webpack 的配置信息&nbsp;`plugins`&nbsp;选项中指定。Webpack 本身内置了一些常用的插件，还可以通过 npm 安装第三方插件。详细信息[移步至此](http://www.cnblogs.com/xiaohuochai/p/7002344.html#anchor4)

&emsp;&emsp;想要使用一个插件，只需要require()它，然后把它添加到plugins数组中。内置插件则不需要require，直接使用即可

&emsp;&emsp;接下来，我们利用一个最简单的&nbsp;`BannerPlugin`&nbsp;内置插件来实践插件的配置和运行，这个插件的作用是给输出的文件头部添加注释信息。

&emsp;&emsp;修改&nbsp;`webpack.config.js`，添加&nbsp;`plugins`：

<div>
<pre>var webpack = require('webpack');
module.exports = {
  entry: './entry.js', //入口文件
  output: {
    path: __dirname,//出口路径
    filename: 'bundle.js'//出口名称
  },
  module: {
    rules: [
      {test: /\.css$/,use: [ 'style-loader', 'css-loader' ]}
    ]
  },
  plugins: [
    new webpack.BannerPlugin('This file is created by xiaohuochai')
  ]
}</pre>
</div>

&emsp;&emsp;然后运行&nbsp;`webpack`，打开&nbsp;`bundle.js`，可以看到文件头部出现了我们指定的注释信息：

<div>
<pre>/*! This file is created by xiaohuochai */
/******/ (function(modules) { // webpackBootstrap
/******/  // The module cache
/******/  var installedModules = {};
// 后面代码省略</pre>
</div>

&nbsp;

### 开发环境

&emsp;&emsp;当项目逐渐变大，webpack 的编译时间会变长，可以通过参数让编译的输出内容带有进度和颜色

<div>
<pre>$ webpack --progress --colors</pre>
</div>

&emsp;&emsp;如果不想每次修改模块后都重新编译，那么可以启动监听模式。开启监听模式后，没有变化的模块会在编译后缓存到内存中，而不会每次都被重新编译，所以监听模式的整体速度是很快的

<div>
<pre>$ webpack --progress --colors --watch</pre>
</div>

&emsp;&emsp;比如，执行以上命令后，修改'style.css'的body的背景颜色为红色，不用重新编译，刷新页面后，页面即发生改变

![webpackIntro4](https://pic.xiaohuochai.site/blog/utils_build_webpackIntro4.png)

&emsp;&emsp;当然，使用&nbsp;`webpack-dev-server`&nbsp;开发服务是一个更好的选择。它将在 localhost:8080 启动一个 express 静态资源 web 服务器，并且会以监听模式自动运行 webpack，在浏览器打开`http://localhost:8080/`或`http://localhost:8080/webpack-dev-server/`可以浏览项目中的页面和编译后的资源输出，并且通过一个 `socket.io` 服务实时监听它们的变化并自动刷新页面

<div>
<pre># 安装
$ npm install webpack-dev-server -g
# 运行
$ webpack-dev-server --progress --colors</pre>
</div>

&emsp;&emsp;比如，执行以上命令后，修改'style.css'的body的背景颜色为蓝色，不用重新编译，也不用刷新页面，页面即发生改变

![webpackIntro5](https://pic.xiaohuochai.site/blog/utils_build_webpackIntro5.png)

