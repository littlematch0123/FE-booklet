# webpack配置之代码优化 

&emsp;&emsp;前面介绍了webpack的基本配置，本文将详细介绍webpack中关于代码优化的配置

 

&nbsp;

### 打包公共代码

&emsp;&emsp;CommonsChunkPlugin 插件，是一个可选的用于建立一个独立文件(又称作 chunk)的功能，这个文件包括多个入口 chunk 的公共模块。通过将公共模块拆出来，最终合成的文件能够在最开始的时候加载一次，便存到缓存中供后续使用。这会带来速度上的提升，因为浏览器会迅速将公共的代码从缓存中取出来，而不是每次访问一个新页面时，再去加载一个更大的文件
```
new webpack.optimize.CommonsChunkPlugin(options)
```
【配置项】

```
{
  name: string, // or
  names: string[],
  // common chunk 的名称

  filename: string,
  // common chunk 的文件名模板。可以包含与 `output.filename` 相同的占位符

  minChunks: number|Infinity|function(module, count) -> boolean,
  // 在传入公共chunk(commons chunk) 之前所需要包含的最少数量的 chunks 。
  // 数量必须大于等于2，或者少于等于 chunks的数量

  chunks: string[],
  // 通过 chunk name 去选择 chunks 的来源。chunk 必须是 公共chunk 的子模块。

  children: boolean,
  // 如果设置为 `true`，所有公共chunk 的子模块都会被选择

  deepChildren: boolean,
  // If `true` all descendants of the commons chunk are selected

  async: boolean|string,
  // 如果设置为 `true`，一个异步的公共chunk 会作为 `options.name` 的子模块，和 `options.chunks` 的兄弟模块被创建。

  minSize: number,
  // 在 公共chunk 被创建立之前，所有公共模块 (common module) 的最少大小。
}
```
【提取公共代码】

```
new webpack.optimize.CommonsChunkPlugin({
  name: "commons",
  // ( 公共chunk(commnons chunk) 的名称)

  filename: "commons.js",
  // ( 公共chunk 的文件名)
})
```
【明确第三方库chunk】

```
entry: {
  vendor: ["jquery", "other-lib"],
  app: "./entry"
},
plugins: [
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    minChunks: Infinity,
  })
]
```
【将公共模块打包进父 chunk】
```
new webpack.optimize.CommonsChunkPlugin({
  children: true,
})
```
【额外的异步公共chunk】

```
new webpack.optimize.CommonsChunkPlugin({
  name: "app",
  // or
  names: ["app", "subPageA"]
  children: true,
  async: true,
  minChunks: 3,
})
```
【wepack4】

&emsp;&emsp;webpack 4 将移除 CommonsChunkPlugin, 取而代之的是两个新的配置项 optimization.splitChunks 和 optimization.runtimeChunk

&emsp;&emsp;通过设置 optimization.splitChunks.chunks: "all" 来启动默认的代码分割配置项

&emsp;&emsp;当满足如下条件时，webpack 会自动打包 chunks:
```
当前模块是公共模块（多处引用）或者模块来自 node_modules
当前模块大小大于 30kb
如果此模块是按需加载，并行请求的最大数量小于等于 5
如果此模块在初始页面加载，并行请求的最大数量小于等于 3
```
&emsp;&emsp;通过设置 optimization.runtimeChunk: true 来为每一个入口默认添加一个只包含 runtime 的 chunk

 

&nbsp;

### 动态导入

&emsp;&emsp;上面介绍的CommonsChunkPlugin可以去重和分离chunk。而本节介绍的动态导入，则是通过模块的内联函数调用来分离代码

&emsp;&emsp;webpack 提供了两个类似的技术。对于动态导入，第一种，也是优先选择的方式是，使用符合 ECMAScript 提案 的 import() 语法。第二种，则是使用 webpack 特定的 require.ensure

&emsp;&emsp;下面来使用import()语法来进行动态导入

```
  const path = require('path');
  const HTMLWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: {
      index: './src/index.js'
    },
    plugins: [
      new HTMLWebpackPlugin({
        title: 'Code Splitting'
     })
    ],
    output: {
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```
&emsp;&emsp;下面来动态导入loadsh

```
 function getComponent() { 
　return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
     var element = document.createElement('div');
     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
     return element;
   }).catch(error => 'An error occurred while loading the component');
  } getComponent().then(component => {
   document.body.appendChild(component);
 })
```
&emsp;&emsp;在注释中使用了 webpackChunkName。这样做会导致bundle 被命名为 lodash.bundle.js ，而不是 [id].bundle.js

 

&nbsp;

### 懒加载

&emsp;&emsp;懒加载或者按需加载，是一种很好的优化网页或应用的方式。这种方式实际上是先把你的代码在一些逻辑断点处分离开，然后在一些代码块中完成某些操作后，立即引用或即将引用另外一些新的代码块。这样加快了应用的初始加载速度，减轻了它的总体体积，因为某些代码块可能永远不会被加载

&emsp;&emsp;上面通过动态导入的loadsh确实会在脚本运行的时候产生一个分离的代码块 lodash.bundle.js ，在技术概念上“懒加载”它。问题是加载这个包并不需要用户的交互 -- 意思是每次加载页面的时候都会请求它

&emsp;&emsp;下面来增加一个交互，当用户点击按钮的时候用 console 打印一些文字。但是会等到第一次交互的时候再加载那个代码块（print.js）
```
//print.js
console.log('The print.js module has loaded! See the network tab in dev tools...');
export default () => {
  console.log('Button Clicked: Here\'s "some text"!');
}
```
```
//index.js
 import _ from 'lodash';
 function component() {
   var element = document.createElement('div');
   var button = document.createElement('button');
   var br = document.createElement('br');
   button.innerHTML = 'Click me and look at the console!';
   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
   element.appendChild(br);
   element.appendChild(button);
   button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
     var print = module.default;
     print();
   });
    return element;
  }
 document.body.appendChild(component());
```
 

&nbsp;

### 剔除无用代码

&emsp;&emsp;tree shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。它依赖于 ES2015 模块系统中的静态结构特性，例如 import 和 export。这个术语和概念实际上是兴起于 ES2015 模块打包工具 rollup

【JS】

&emsp;&emsp;JS的tree shaking主要通过uglifyjs插件来完成
```
npm install --save-dev uglifyjs-webpack-plugin
```
```
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
 },
  plugins: [
   new UglifyJSPlugin()
  ]
};
```
【CSS】

&emsp;&emsp;CSS的tree shaking主要通过purify CSS来实现的
```
npm i -D purifycss-webpack purify-css
```
```
const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');

module.exports = {
  entry: {...},
  output: {...},
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader'
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].[contenthash].css'),
    // Make sure this is after ExtractTextPlugin!
    new PurifyCSSPlugin({
      // Give paths to parse for rules. These should be absolute!
      paths: glob.sync(path.join(__dirname, 'app/*.html')),
    })
  ]
};
```
&emsp;&emsp;如果要设置多路径，则需要将glob换成glob-all
```
const glob = require('glob-all');
paths: glob.sync([
  path.join(__dirname, '.php'),
  path.join(__dirname, 'partials/.php')
])
```

&nbsp;

### 模块热更新

&emsp;&emsp;模块热更新，又称为模块热替换，HMR(Hot Module Replacement)。在应用程序运行过程中替换、添加或删除模块，无需重新加载页面，极大地加速了开发时间

&emsp;&emsp;启用此功能实际上相当简单。而我们要做的，就是更新 webpack-dev-server 的配置，和使用 webpack 内置的 HMR 插件。此外，还添加了NamedModulesPlugin，以便更容易查看要修补(patch)的依赖

```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
     app: './src/index.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```
 

&nbsp;

### 长缓存优化

【使用chunkhash】

&emsp;&emsp;将hash替换为chunkhash，这样当chunk不变时，缓存依然有效

```
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Caching'
    })
  ],
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  }
};
```
【提取模板】

&emsp;&emsp;CommonsChunkPlugin 可以用于将模块分离到单独的文件中。还能够在每次修改后的构建结果中，将 webpack 的样板(boilerplate)和 manifest 提取出来。通过指定 entry 配置中未用到的名称，此插件会自动将我们需要的内容提取到单独的包中

```
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Caching'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    })
  ],
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  }
};
```
&emsp;&emsp;将第三方库(library)（例如 lodash 或 react）提取到单独的 vendor chunk 文件中，是比较推荐的做法，这是因为，它们很少像本地的源代码那样频繁修改。因此通过实现以上步骤，利用客户端的长效缓存机制，可以通过命中缓存来消除请求，并减少向服务器获取资源，同时还能保证客户端代码和服务器端代码版本一致。这可以通过使用新的 entry(入口) 起点，以及再额外配置一个 CommonsChunkPlugin 实例的组合方式来实现

```
var path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
    vendor: [
      'lodash'
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Caching'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    })
  ],
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  }
};
```
&emsp;&emsp;注意：CommonsChunkPlugin 的 'vendor' 实例，必须在 'manifest' 实例之前引入

【使用Name而不是id】

&emsp;&emsp;每个 module.id 会基于默认的解析顺序(resolve order)进行增量。也就是说，当解析顺序发生变化，ID 也会随之改变

&emsp;&emsp;下面来使用两个插件解决这个问题。第一个插件是 NamedModulesPlugin，将使用模块的路径，而不是数字标识符。虽然此插件有助于在开发过程中输出结果的可读性，然而执行时间会长一些。第二个选择是使用 HashedModuleIdsPlugin，推荐用于生产环境构建

```
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
    vendor: [
      'lodash'
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Caching'
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    })
  ],
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  }
};
```
 

&nbsp;

### 公用代码内联

&emsp;&emsp;使用html-webpack-inline-chunk-plugin插件将mainfest.js内联到html文件中
```
$ npm install html-webpack-inline-chunk-plugin --save-dev
```
```
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkWebpackPlugin = require('html-webpack-inline-chunk-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
    vendor: [
      'lodash'
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Caching',
      inlineSource: '.(js|css)$'
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new InlineChunkWebpackPlugin({
        inlineChunks: ['manifest']
    })
  ],
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  }
};
```
 

