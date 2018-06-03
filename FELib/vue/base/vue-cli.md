# Vue 命令行工具 vue-cli

&emsp;&emsp;Vue.js 提供一个[官方命令行工具](https://github.com/vuejs/vue-cli)，可用于快速搭建大型单页应用。该工具提供开箱即用的构建工具配置，带来现代化的前端开发流程。只需几分钟即可创建并启动一个带热重载、保存时静态检查以及可用于生产环境的构建配置的项目&nbsp;。本文将详细介绍 Vue 命令行工具 vue-cli

&nbsp;

### 概述

&emsp;&emsp;Vue-cli 是 Vue 官方提供的用于初始化 Vue 项目的脚手架工具。使用 Vue-cli 有以下几大优势

&emsp;&emsp;1、Vue-cli 是一套成熟的 vue 项目架构设计，会跟着 Vue 版本的更迭而更新

&emsp;&emsp;2、Vue-cli 提供了一套本地的热加载的测试服务器

&emsp;&emsp;3、Vue-cli 集成了一套打包上线的方案，可使用 webpack 或 Browserify 等构建工具

&nbsp;

### 安装

&emsp;&emsp;下面来安装 vue-cli

<div>
<pre># 全局安装 vue-cli
$ npm install -g vue-cli</pre>
</div>

&emsp;&emsp;注意：一定要在全局模式下安装 vue-cli，否则无法使用 vue 命令

![vue_base_vueCli1](https://pic.xiaohuochai.site/blog/vue_base_vueCli1.png)

&emsp;&emsp;全局模式下，安装 vue-cli 后，才可以正常使用

![vue_base_vueCli2](https://pic.xiaohuochai.site/blog/vue_base_vueCli2.png)

&emsp;&emsp;输入 vue 命令，会出现如下视图

![vue_base_vueCli3](https://pic.xiaohuochai.site/blog/vue_base_vueCli3.png)

&emsp;&emsp;输入 vue -V 命令，可以看出当前 vue-cli 使用的是 2.8.2 版本。输入 vue list 可以得到推荐的官方模板

![vue_base_vueCli4](https://pic.xiaohuochai.site/blog/vue_base_vueCli4.png)

&nbsp;

### 创建项目

&emsp;&emsp;接下来，创建一个基于 webpack 模板的新项目

<div>
<pre>$ vue init webpack my-project</pre>
</div>

![vue_base_vueCli5](https://pic.xiaohuochai.site/blog/vue_base_vueCli5.png)

&emsp;&emsp;创建项目后，在当前目录下，会新建 my-project 文件夹，里面是 my-project 项目所包含的文件

![vue_base_vueCli6](https://pic.xiaohuochai.site/blog/vue_base_vueCli6.png)

&emsp;&emsp;my-project 中的 package.json 文件中，所依赖的包如下所示

<div>
<pre>{
  "name": "my-project",
  "version": "1.0.0",
  "description": "A Vue.js project",
  "author": "match &lt;121631835@qq.com&gt;",
  "private": true,
  "scripts": {
    "dev": "node build/dev-server.js",
    "start": "node build/dev-server.js",
    "build": "node build/build.js"
  },
  "dependencies": {
    "vue": "^2.4.2",
    "vue-router": "^2.7.0"
  },
  "devDependencies": {
    "autoprefixer": "^7.1.2",
    "babel-core": "^6.22.1",
    "babel-loader": "^7.1.1",
    "babel-plugin-transform-runtime": "^6.22.0",
    "babel-preset-env": "^1.3.2",
    "babel-preset-stage-2": "^6.22.0",
    "babel-register": "^6.22.0",
    "chalk": "^2.0.1",
    "connect-history-api-fallback": "^1.3.0",
    "copy-webpack-plugin": "^4.0.1",
    "css-loader": "^0.28.0",
    "cssnano": "^3.10.0",
    "eventsource-polyfill": "^0.9.6",
    "express": "^4.14.1",
    "extract-text-webpack-plugin": "^2.0.0",
    "file-loader": "^0.11.1",
    "friendly-errors-webpack-plugin": "^1.1.3",
    "html-webpack-plugin": "^2.28.0",
    "http-proxy-middleware": "^0.17.3",
    "webpack-bundle-analyzer": "^2.2.1",
    "semver": "^5.3.0",
    "shelljs": "^0.7.6",
    "opn": "^5.1.0",
    "optimize-css-assets-webpack-plugin": "^2.0.0",
    "ora": "^1.2.0",
    "rimraf": "^2.6.0",
    "url-loader": "^0.5.8",
    "vue-loader": "^13.0.4",
    "vue-style-loader": "^3.0.1",
    "vue-template-compiler": "^2.4.2",
    "webpack": "^2.6.1",
    "webpack-dev-middleware": "^1.10.0",
    "webpack-hot-middleware": "^2.18.0",
    "webpack-merge": "^4.1.0"
  },
  "engines": {
    "node": "&gt;= 4.0.0",
    "npm": "&gt;= 3.0.0"
  },
  "browserslist": [
    "&gt; 1%",
    "last 2 versions",
    "not ie &lt;= 8"
  ]
}</pre>
</div>

&emsp;&emsp;接下来， 进入 my-project 文件夹，并安装依赖包

<div>
<pre>$ cd my-project
$ npm install</pre>
</div>

![vue_base_vueCli7](https://pic.xiaohuochai.site/blog/vue_base_vueCli7.png)

&nbsp;

### 运行项目

&emsp;&emsp;接下来，输入下列代码来运行项目

<div>
<pre>$ npm run dev</pre>
</div>

&emsp;&emsp;以上代码的意思是运行 package.json 中，scripts 脚本中 dev 指代的程序。类比于，运行 node build/dev-server.js

<div>
<pre>  "scripts": {
    "dev": "node build/dev-server.js",
    "start": "node build/dev-server.js",
    "build": "node build/build.js"
  }</pre>
</div>

![vue_base_vueCli8](https://pic.xiaohuochai.site/blog/vue_base_vueCli8.png)

&emsp;&emsp;localhost:8080 的网页自动打开，效果如下

![vue_base_vueCli9](https://pic.xiaohuochai.site/blog/vue_base_vueCli9.png)

&emsp;&emsp;打开 app.vue 文件，在模板中加入&lt;p&gt;小火柴的蓝色理想&lt;/p&gt;&nbsp;这一行代码，并保存

<div>
<pre>&lt;template&gt;
  &lt;div id="app"&gt;
    &lt;img src="./assets/logo.png"&gt;
    &lt;router-view&gt;&lt;/router-view&gt;
    &lt;p&gt;小火柴的蓝色理想&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;</pre>
</div>

&emsp;&emsp;当前浏览器将会自动更新到页面的最新状态，这是 vue-cli 自带的热更新的功能

![vue_base_vueCli10](https://pic.xiaohuochai.site/blog/vue_base_vueCli10.png)

&nbsp;

### 项目部署

&emsp;&emsp;接下来，使用 npm run build 来部署上线的项目

<div>
<pre>npm run build</pre>
</div>

![vue_base_vueCli11](https://pic.xiaohuochai.site/blog/vue_base_vueCli11.png)

&emsp;&emsp;生成的 dist 目录，就是打包构建后的项目目录

![vue_base_vueCli12](https://pic.xiaohuochai.site/blog/vue_base_vueCli12.png)

