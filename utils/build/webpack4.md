# 基于Vue cli生成的Vue项目的webpack4升级

&emsp;&emsp;本文将详细介绍从webpack3到webpack4的升级过程

 

&nbsp;

### 概述

&emsp;&emsp;相比于webpack3，webpack4可以零配置运行，打包速度比之前提高了90%，可以直接到ES6的代码进行无用代码剔除，新增的optimization使用简单

&emsp;&emsp;在未来，CSS、HTMl和文件都会成为原生模块

【0配置】

&emsp;&emsp;webpack4 设置了默认值，以便无配置启动项目
```
entry 默认值是 ./src/
output.path 默认值是 ./dist
mode 默认值是 production
```
【模块类型】

&emsp;&emsp;webpack4提供了5种模块类型
```
json: 可通过 require 和 import 导入的 JSON 格式的数据(默认为 .json 的文件)
webassembly: WebAssembly 模块，（目前是 .wasm 文件的默认类型）
javascript/auto: (webpack 3中的默认类型)支持所有的JS模块系统：CommonJS、AMD。
javascript/esm: EcmaScript模块（默认 .mjs 文件）。
javascript/dynamic: 仅支持 CommonJS & AMD
```
&emsp;&emsp;webpack 4 不仅支持本地处理 JSON，还支持对 JSON 的 Tree Shaking。当使用 ESM 语法 import json 时，webpack 会消除掉JSON Module 中未使用的导出。此外，如果要用 loader 转换 json 为 js，需要设置 type 为 javascript/auto
 
&nbsp;

### 模式mode

&emsp;&emsp;相比于webpack3，webpack4新增了一个mode配置选择，用来表示配置模式的选择情况
```
module.exports = {
  mode: 'production'
}
```
&emsp;&emsp;包括生产环境production、开发环境devolopment和自定义none这三个选择可选

【开发模式】

```
浏览器调试工具
注释、开发阶段的详细错误日志和提示
快速和优化的增量构建机制
开启 output.pathinfo 在 bundle 中显示模块信息
开启 NamedModulesPlugin
开启 NoEmitOnErrorsPlugin
```
【生产模式】

```
启用所有优化代码的功能
更小的bundle大小
去除只在开发阶段运行的代码
关闭内存缓存
Scope hoisting 和 Tree-shaking
开启 NoEmitOnErrorsPlugin
开启 ModuleConcatenationPlugin
开启 optimization.minimize
```
【none】

&emsp;&emsp;禁用所有的默认设置

 

&nbsp;

### optimization

&emsp;&emsp;从webpack4开始官方移除了commonchunk插件，改用了optimization属性进行更加灵活的配置，下面来介绍optimization下的一些常用配置项

【minimize】

&emsp;&emsp;利用unglifyjsWebpackPlugin插件来压缩模块，生产环境下该值默认为true
```
  optimization: {
    minimize: false
  }
```
【minimier】

&emsp;&emsp;可以使用其他插件来执行压缩功能

```
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  //...
  optimization: {
    minimizer: [
      new UglifyJsPlugin({ /* your config */ })
    ]
  }
};
```
【splitChunks】

&emsp;&emsp;webpack4默认使用splitChunksPlugin插件来实现代码分割功能，来替代webpack3中的commonChunksPlugin插件

```
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
```
【runtimeChunk】

&emsp;&emsp;通过设置 runtimeChunk: true 来为每一个入口默认添加一个只包含 runtime 的 chunk

&emsp;&emsp;通过提供字符串值，可以使用插件的预设模式
```
signal: 创建一个被所有生成的块共享的runtime文件
multiple: 为共同的块创建多个runtime文件
```
&emsp;&emsp;缺省值为false，表示每个入口块默认内嵌runtime代码
```
    runtimeChunk {
      name: "runtime"
    }
```
【noEmitOnErrors】

&emsp;&emsp;只要在编译时出现错误，就使用noEmitOnErrors属性来跳过emit 阶段，用来替代NoEmitOnErrorsPlugin 插件

【nameModules】

&emsp;&emsp;使用可读的模块标识，方便更好的调试。webpack在开发模式下默认开启，生产模式下默认关闭，用来替代 NamedModulesPlugin 插件

```
module.exports = {
  //...
  optimization: {
    namedModules: true
  }
};
```
 

&nbsp;

### 升级

&emsp;&emsp;下面就基于vue-cli的项目对webpack配置进行升级

&emsp;&emsp;1、升级nodejs

&emsp;&emsp;使用 webpack4 时，必须保证 Node.js 版本 >= 8.9.4，因为 webpack4 使用了大量的ES6语法，这些语法在 nodejs新版 v8 中得到了原生支持

&emsp;&emsp;2、升级webpack主要部件，包括webpack、webpack-bundle-analyzer、webpack-dev-server、webpack-merge

&emsp;&emsp;升级的操作很简单，先删除，再安装即可。但要注意的是webpack4版本中 cli 工具分离成了 webpack 核心库 与 webpack-cli 命令行工具两个模块，需要使用 CLI，必安装 webpack-cli 至项目中
```
cnpm uninstall -D webpack webpack-bundle-analyzer webpack-dev-server webpack-merge
cnpm install -D webpack webpack-cli webpack-bundle-analyzer webpack-dev-server webpack-merge
```
&emsp;&emsp;3、升级webpack相关插件，包括copy-webpack-plugin、css-loader、eslint-loader、file-loader、html-webpack-plugin、url-loader、friendly-errors-webpack-plugin、optimize-css-assets-webpack-plugin、uglifyjs-webpack-plugin
```
cnpm uninstall -D copy-webpack-plugin css-loader eslint-loader file-loader html-webpack-plugin url-loader  friendly-errors-webpack-plugin optimize-css-assets-webpack-plugin uglifyjs-webpack-plugin
cnpm install -D copy-webpack-plugin css-loader eslint-loader file-loader html-webpack-plugin url-loader  friendly-errors-webpack-plugin optimize-css-assets-webpack-plugin uglifyjs-webpack-plugin
```
&emsp;&emsp;4、升级vue-loader

&emsp;&emsp;由于vue-loader升级到版本15后，配置有较多的变化，稳妥起见，可以只将vue-loader升级到14.4.2
```
cnpm uninstall -D vue-loader
cnpm uninstall -D vue-loader@14.4.2
```
&emsp;&emsp;5、替换webpack相关插件，extract-text-webpack-plugin替换为mini-css-extract-plugin
```
cnpm uninstall -D extract-text-webpack-plugin
cnpm install -D mini-css-extract-plugin
```

&nbsp;

### 配置

&emsp;&emsp;下面对配置文件的修改进行详细说明：

&emsp;&emsp;1、webpack.base.conf.js文件

&emsp;&emsp;增加node:process.env.NODE_ENV即可
```
module.exports = {
+  mode: process.env.NODE_ENV,
...
```
&emsp;&emsp;2、webpack.prop.conf.js文件

&emsp;&emsp;该文件的配置项较为复杂

&emsp;&emsp;（1）将ExtractTextPlugin替换为MiniCssExtraPlugin

```
+ const MiniCssExtractPlugin = require("mini-css-extract-plugin")
- const ExtractTextPlugin = require('extract-text-webpack-plugin')

...
-    new ExtractTextPlugin({
+    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      allChunks: true,
    }),
...
```
&emsp;&emsp;（2）删除UglifyJsPlugin配置项

```
- const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
...
- new UglifyJsPlugin({
-      uglifyOptions: {
-        compress: {
-          warnings: false
-        }
-      },
-      sourceMap: config.build.productionSourceMap,
-      parallel: true
- })
```
&emsp;&emsp;（3）删除CommonsChunkPlugin配置项

```
- new webpack.optimize.CommonsChunkPlugin({
-      name: 'vendor',
-      minChunks (module) {
-        return (
-          module.resource &&
-          /\.js$/.test(module.resource) &&
-          module.resource.indexOf(
-            path.join(__dirname, '../node_modules')
-          ) === 0
-        )
-      }
-    }),
-    new webpack.optimize.CommonsChunkPlugin({
-     name: 'manifest',
-      minChunks: Infinity
-    }),
-    new webpack.optimize.CommonsChunkPlugin({
-      name: 'app',
-      async: 'vendor-async',
-      children: true,
-      minChunks: 3
-    }), 
...
```
&emsp;&emsp;（4）添加optimization配置项

```
+  optimization: {
+    splitChunks: {
+      chunks: 'async',
+      minSize: 30000,
+      minChunks: 1,
+      maxAsyncRequests: 5,
+      maxInitialRequests: 3,
+      automaticNameDelimiter: '~',
+      name: true,
+      cacheGroups: {
+        vendors: {
+          test: /[\\/]node_modules[\\/]/,
+          priority: -10
+        },
+        default: {
+          minChunks: 2,
+          priority: -20,
+          reuseExistingChunk: true
+        }
+      }
+    },
+    runtimeChunk: { name: 'runtime' }
+  },
```
&emsp;&emsp;详细配置移步[前端小站源码](https://github.com/littlematch0123/blog-client)

 

