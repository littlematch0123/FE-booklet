# 初识webpack——webpack四个基础概念

&emsp;&emsp;webpack是当下最热门的前端资源模块化管理和打包工具。它可以将许多松散的模块按照依赖和规则打包成符合生产环境部署的前端资源。当webpack处理应用程序时，它会递归地构建一个依赖关系图表(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成少量的bundle(通常只有一个)，由浏览器加载。它是高度可配置的，在开始前需要先理解四个核心概念：入口(entry)、输出(output)、加载器(loader)、插件(plugins)。本文将详细介绍webpack的这四个基础概念

&nbsp;

### 入口

&emsp;&emsp;webpack将创建所有应用程序的依赖关系图表。图表的起点被称之为入口起点(entry point)。入口起点告诉 webpack 从哪里开始，并遵循着依赖关系图表知道要打包什么。可以将应用程序的入口起点认为是根上下文或 app 第一个启动文件

&emsp;&emsp;类比于[requirejs](http://www.cnblogs.com/xiaohuochai/p/6847942.html)中的入口文件main.js，最终使用[r.js](http://www.cnblogs.com/xiaohuochai/p/6974240.html)打包时，都打包在main.js里

&emsp;&emsp;在webpack中，使用webpack配置对象中的entry属性来定义入口，包括以下多种方式

【单个入口（简写）语法】

&emsp;&emsp;用法：entry: string|Array&lt;string&gt;

&emsp;&emsp;注意：在设置entry属性时，如果是当前页面，一定要在属性值前面设置为'./'，否则无法识别

<div>
<pre>//webpack.config.js
var config = {
  entry: './path/to/my/entry/file.js'
};</pre>
</div>

&emsp;&emsp;entry属性的单个入口语法，是下面的简写：

<div>
<pre>//webpack.config.js
var config = {
  entry: {
    main: './path/to/my/entry/file.js'
  }
};</pre>
</div>

&emsp;&emsp;向entry传入一个数组时，将创建&ldquo;多个主入口(multi-main entry)&rdquo;

<div>
<pre>entry:['./entry1','./entry2']</pre>
</div>

【对象语法】

&emsp;&emsp;用法：entry: {[entryChunkName: string]: string|Array&lt;string&gt;}

<div>
<pre>//webpack.config.js
var config = {
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  }
};</pre>
</div>

&emsp;&emsp;对象语法会比较繁琐。然而，这是应用程序中定义入口的最可扩展的方式

&emsp;&emsp;从上面的代码可知，webpack从app.js和vendors.js开始创建依赖图表。这些图表是彼此完全分离、互相独立的。这种方式比较常见于，只有一个入口起点(不包括vendor)的单页应用程序(single page application)中

&nbsp;

### 出口

&emsp;&emsp;将所有的资源(assets)归拢在一起后，还需要告诉webpack在哪里打包应用程序。webpack的output属性描述了如何处理归拢在一起的代码(bundled code)

<div>
<pre>//webpack.config.js
var path = require('path');
module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
};</pre>
</div>

&emsp;&emsp;在上面的代码中，我们通过output.filename和output.path属性，来告诉webpack bundle的名称，以及我们想要生成(emit)到哪里

&emsp;&emsp;注意：即使可以存在多个入口起点，但只指定一个输出配置，如下所示output的filename必须为[name]或其类似，不能为确定的名称，否则会提示Conflict: Multiple assets emit to the same filename bundle.js，翻译过来是多入口不能指定出口文件中同样的filename名称

<div>
<pre>  entry: {
    'main': './entry.js',
    'hello':'./hello.js'
  },
  output: {
    path: __dirname,//出口路径
    filename: '[name].js'//出口名称
  }</pre>
</div>

【用法(Usage)】

&emsp;&emsp;在webpack中配置output属性，需要将它的值设置为一个对象，并包含filename和path属性这两个必选项

&emsp;&emsp;filename:编译文件的文件名，首选推荐：main.js||bundle.js||index.js

&emsp;&emsp;path:对应一个绝对路径，此路径是希望一次性打包的目录

<div>
<pre>//webpack.config.js
var config = {
  output: {
    filename: 'bundle.js',
    path: '/home/proj/public/assets'
  }
};
</pre>
</div>

【选项(Options)】

**output.chunkFilename**

&emsp;&emsp;非入口的chunk(non-entry chunk)的文件名，路径相对于output.path目录

<div>
<pre>[id] 被chunk的id替换
[name] 被chunk的name替换（或者，在chunk没有name时使用id替换）
[hash] 被compilation生命周期的hash替换
[chunkhash] 被chunk的hash替换</pre>
</div>

**output.crossOriginLoading**

&emsp;&emsp;此选项可以启用跨域加载(cross-origin loading)chunk，可选的值有：

<div>
<pre>false - 禁用跨域加载(默认值)
"anonymous" - 启用跨域加载。当使用 anonymous 时，发送不带凭据(credential)的请求。
"use-credentials" - 启用跨域加载。发送带凭据(credential)的请求</pre>
</div>

**output.devtoolLineToLine**

&emsp;&emsp;所有指定模块启用行到行映射(line-to-line mapped)模式。行到行映射模式使用一个简单的SourceMap，即生成资源(generated source)的每一行都映射到原始资源(original source)的同一行。这是一个可做性能优化之处。当需要更好的性能，并且只要确保输入行(input line)和生成行(generated line)匹配时，才会考虑启用

<div>
<pre>true 在所有模块启用（不推荐）
{test, include, exclude} 对象，对特定文件启用（类似于 module.loaders）
默认值：false</pre>
</div>

**output.filename**

&emsp;&emsp;指定硬盘每个输出文件的名称。在这里不能指定为绝对路径。output.path选项规定了文件被写入硬盘的位置。filename仅用于命名每个文件

<div>
<pre>//单个入口
{
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/build'
  }
}</pre>
</div>
<div>
<pre>//多个入口
{
  entry: {
    app: './src/app.js',
    search: './src/search.js'
  },
  output: {
    filename: '[name].js',//被 chunk 的 name 替换
    path: __dirname + '/build'
  }
}</pre>
</div>

**output.hotUpdateChunkFilename**

&emsp;&emsp;热更新chunk(Hot Update Chunk)的文件名。它们在output.path目录中

<div>
<pre>[id] 被chunk的id替换
[hash] 被compilation生命周期的hash替换。（最后一个hash存储在记录中）
默认值："[id].[hash].hot-update.js"</pre>
</div>

**output.hotUpdateFunction**

&emsp;&emsp;webpack中用于异步加载(async load)热更新(hot update)chunk的JSONP函数

<div>
<pre>默认值："webpackHotUpdate"</pre>
</div>

**output.hotUpdateMainFilename**

&emsp;&emsp;热更新主文件(hot update main file)的文件名

<div>
<pre>[hash] 被compilation生命周期的hash替换。（最后一个hash存储在记录中）
默认值："[hash].hot-update.json"</pre>
</div>

**output.jsonpFunction**

&emsp;&emsp;webpack中用于异步加载(async loading)chunk的JSONP函数

&emsp;&emsp;较短的函数可能会减少文件大小。当单页有多个webpack实例时，请使用不同的标识符(identifier)

<div>
<pre>默认值："webpackJsonp"</pre>
</div>

**output.library**

&emsp;&emsp;如果设置此选项，会将bundle导出为library。output.library是library的名称。

&emsp;&emsp;如果正在编写library，并且需要将其发布为单独的文件，请使用此选项

**output.libraryTarget**

&emsp;&emsp;library的导出格式

<div>
<pre>"var" - 导出为一个变量：var Library = xxx（默认）
"this" - 导出为 this 的一个属性：this["Library"] = xxx
"commonjs" - 导出为 exports 的一个属性：exports["Library"] = xxx
"commonjs2" - 通过 module.exports：module.exports = xxx 导出
"amd" - 导出为 AMD（可选命名 - 通过 library 选项设置名称）
"umd" - 导出为 AMD，CommonJS2 或者导出为 root 的属性
</pre>
</div>

&emsp;&emsp;如果output.library未设置，但是output.libraryTarget被设置为var以外的值，则「所导出对象」的每个属性都被复制到「对应的被导出对象」上（除了amd，commonjs2和umd）

**output.publicPath**

&emsp;&emsp;一般地，publicPath用于设置上线地址，在开发过程中，该值不需要设置

<div>
<pre>output: {
    filename:'main.js'
    path: "/home/proj/public/assets",
    publicPath: "http://cdn.com"
}</pre>
</div>

&emsp;&emsp;以上面代码为例，最终main.js的线上地址是`http://cdn.com/home/proj/public/assets/main.js`

**output.path**

&emsp;&emsp;导出目录为绝对路径（必选项）

<div>
<pre>//config.js
output: {
    path: "/home/proj/public/assets",
    publicPath: "/assets/"
}
//index.html
&lt;head&gt;
  &lt;link href="/assets/spinner.gif"/&gt;
&lt;/head&gt;</pre>
</div>
<div>
<pre>//config.js
output: {
    path: "/home/proj/cdn/assets/[hash]",
    publicPath: "http://cdn.example.com/assets/[hash]/"
}</pre>
</div>

&emsp;&emsp;注意：在编译时不知道最终输出文件的 publicPath 的情况下，publicPath 可以留空，并且在入口起点文件运行时动态设置。如果你在编译时不知道 publicPath，你可以先忽略它，并且在入口起点设置 __webpack_public_path__

<div>
<pre> __webpack_public_path__ = myRuntimePublicPath</pre>
</div>

**output.sourceMapFilename**

&emsp;&emsp;JavaScript 文件的 SourceMap 的文件名

<div>
<pre>[file] 被 JavaScript 文件的文件名替换
默认值："[file].map"</pre>
</div>

&nbsp;

### 加载器

&emsp;&emsp;webpack的目标是，让webpack聚焦于项目中的所有资源(asset)，而浏览器不需要关注考虑这些。webpack把每个文件(.css,.html,.scss,.jpg,etc.)都作为模块处理。然而webpack只理解JavaScript。webpack loader会将这些文件转换为模块，而转换后的文件会被添加到依赖图表中

&emsp;&emsp;loader可以使你在require()或"加载"模块时预处理文件。因此，loader类似于其他构建工具中&ldquo;任务(task)&rdquo;，并提供了处理前端构建步骤的强大方法

&emsp;&emsp;webpack的配置要能识别出(identify)应该被对应的loader进行转换(transform)的那些文件。由于进行过文件转换，所以能够将被转换的文件添加到依赖图表(并且最终添加到bundle中)(use属性)

&emsp;&emsp;常见的加载器loader包括以下三类：

&emsp;&emsp;1、编译相关：babel-loader、ts-loader

&emsp;&emsp;2、样式相关：style-loader、css-loader、less-loader、postcss-loader

&emsp;&emsp;3、文件相关：file-loader、url-loader

<div>
<pre>var path = require('path');
var config = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      {test: /\.(js|jsx)$/, use: 'babel-loader'}
    ]
  }
};
module.exports = config;</pre>
</div>

&emsp;&emsp;以上配置中，对一个单独的module对象定义了rules属性，里面包含两个必须属性：test和use。相当于告诉webpack compiler，碰到「在require()/import语句中被解析为'.js'或'.jsx'的路径」时，在把它们添加并打包之前，要先使用babel-loader去转换&rdquo;

&emsp;&emsp;注意：在webpack配置中定义loader时，要定义在module.rules中，而不是rules。在定义错误时webpack会给出严重的警告

【示例】

&emsp;&emsp;例如，使用loader加载CSS文件，或将TypeScript转为JavaScript。首先，安装对应的loader：

<div>
<pre>npm install --save-dev css-loader
npm install --save-dev ts-loader</pre>
</div>

&emsp;&emsp;其次，配置webpack.config.js，对每个.css文件使用css-loader，然后类似地，对每个.ts文件使用ts-loader：

<div>
<pre>//webpack.config.js
module.exports = {
  module: {
    rules: [
      {test: /\.css$/, use: 'css-loader'},
      {test: /\.ts$/, use: 'ts-loader'}
    ]
  }
};</pre>
</div>

&emsp;&emsp;注意：根据配置选项，下面的规范定义了同等的loader用法：

<div>
<pre>{test: /\.css$/, loader: 'css-loader'}
// 等同于
{test: /\.css$/, use: 'css-loader'}
// 等同于
{test: /\.css$/, use: {
  loader: 'css-loader',
  options: {}
}}</pre>
</div>

【配置】

&emsp;&emsp;在应用程序中，有三种使用 loader 的方式：1、通过配置；2、在 require 语句中显示使用；3、通过 CLI

**通过配置**

&emsp;&emsp;module.rules允许在webpack配置中指定几个loader。 这是展示loader的一种简明的方式，并且有助于使代码变得简洁。而且对每个相应的loader有一个完整的概述

<div>
<pre>module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        { loader: 'style-loader'},
        {
          loader: 'css-loader',
          options: {
            modules: true
          }
        }
      ]
    }
  ]
}</pre>
</div>

**通过require**

&emsp;&emsp;可以在require语句（或define,require.ensure,等语句）中指定loader。使用!将资源中的loader分开。分开的每个部分都相对于当前目录解析

<div>
<pre>require('style-loader!css-loader?modules!./styles.css');</pre>
</div>

&emsp;&emsp;通过前置所有规则及使用!，可以对应覆盖到配置中的任意loader

&emsp;&emsp;选项可以传递查询参数，就像在web中那样（?key=value&amp;foo=bar）。也可以使用JSON对象（?{"key":"value","foo":"bar"}）

**通过CLI**

<div>
<pre>webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'</pre>
</div>

&emsp;&emsp;这会对 .jade 文件使用 jade-loader，对 .css 文件使用 style-loader 和 css-loader

【特性】

&emsp;&emsp;loader 支持链式传递。能够对资源使用流水线(pipeline)。loader 链式地按照先后顺序进行编译。loader 链中的第一个 loader 返回值给下一个 loader。在最后一个 loader，返回 webpack 所预期的 JavaScript

&emsp;&emsp;loader 可以是同步或异步函数。loader 运行在 Node.js 中，并且能够执行任何可能的操作

&emsp;&emsp;loader 接收查询参数。用于 loader 间传递配置。loader 也能够使用 options 对象进行配置

&emsp;&emsp;除了使用 package.json 常见的 main 属性，还可以将普通的 npm 模块导出为 loader，做法是在 package.json 里定义一个 loader 字段

&emsp;&emsp;插件(plugin)可以为 loader 带来更多特性。loader 能够产生额外的任意文件。

&emsp;&emsp;loader 通过（loader）预处理函数，为 JavaScript 生态系统提供了更多有力功能。用户现在可以更加灵活的引入细粒度逻辑，例如压缩(compression)、打包(package)、语言翻译(language translation)和其他更多

【解析】

&emsp;&emsp;loader 遵循标准的模块解析。多数情况下，loader 将从模块路径（通常将模块路径认为是 npm install, node_modules）解析。

&emsp;&emsp;loader 模块需要导出为一个函数，并且使用 Node.js 兼容的 JavaScript 编写。在通常情况下，可以使用 npm 来管理 loader，也可以将 loader 模块作为应用程序中的文件。按照约定，loader 通常被命名为 xxx-loader（例如 json-loader）

&nbsp;

### 插件

&emsp;&emsp;插件是wepback的支柱功能。在使用webpack配置时，webpack自身也构建于同样的插件系统上。插件目的在于解决loader无法实现的其他事情。由于loader仅在每个文件的基础上执行转换，而插件(plugins)最常用于（但不限于）在打包模块的&ldquo;compilation&rdquo;和&ldquo;chunk&rdquo;生命周期执行操作和自定义功能，包括打包优化压缩及配置编译时的变量等功能。webpack的插件系统极其强大和可定制化。

&emsp;&emsp;常用的plugin插件包括以下两类：

&emsp;&emsp;1、优化相关：commonsChunkPlugin、UglifyjsWbpackPlugin

&emsp;&emsp;2、功能相关：ExtractTextWebpackPlugin、HtmlWebpackPlugin、HotModuleReplacementPlugin、CopyWebpackPlugin

&emsp;&emsp;想要使用一个插件，只需要require()它，然后把它添加到plugins数组中。多数插件可以通过选项(option)自定义。也可以在一个配置文件中因为不同目的而多次使用同一个插件，需要使用new创建实例来调用它

【剖析】

&emsp;&emsp;webpack插件是一个具有apply属性的JavaScript对象。apply属性会被webpack compiler调用，并且compiler对象可在整个compilation生命周期访问

<div>
<pre>//ConsoleLogOnBuildWebpackPlugin.js
function ConsoleLogOnBuildWebpackPlugin() {};
ConsoleLogOnBuildWebpackPlugin.prototype.apply = function(compiler) {
  compiler.plugin('run', function(compiler, callback) {
    console.log("webpack 构建过程开始！！！");
    callback();
  });
};</pre>
</div>

【用法】

&emsp;&emsp;由于plugin可以携带参数/选项，必须在wepback配置中，向plugins属性传入new实例

<div>
<pre>var HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
var webpack = require('webpack'); //访问内置的插件
var path = require('path');
var config = {
  entry: './path/to/my/entry/file.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
module.exports = config;</pre>
</div>

&emsp;&emsp;最后，介绍两个webpack中常见的名词：chunk和bundle。chunk是指代码块，而bundle是指打包后的代码