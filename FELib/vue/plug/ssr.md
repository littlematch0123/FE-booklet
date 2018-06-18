# 基于vue现有项目的服务器端渲染SSR改造

&emsp;&emsp;不论是官网教程，还是官方DEMO，都是从0开始的服务端渲染配置。对于现有项目的服务器端渲染SSR改造，特别是基于vue cli生成的项目，没有特别提及。本文就小火柴的前端小站这个前台项目进行SSR改造

 

&nbsp;

### 效果

&emsp;&emsp;下面是经过SSR改造后的[前端小站xiaohuochai.cc](https://xiaohuochai.cc)的网站效果，[github源码地址](https://github.com/littlematch0123/blog-client)


<iframe style="width: 100%; height: 600px;" src="https://www.xiaohuochai.cc" frameborder="0" width="260" height="600"></iframe>

&nbsp;

### 概述

【定义】

&emsp;&emsp;服务器渲染的Vue应用程序被认为是"同构"或"通用"，因为应用程序的大部分代码都可以在服务器和客户端上运行

【优点】

&emsp;&emsp;与传统SPA相比，服务器端渲染(SSR)的优势主要在于：

&emsp;&emsp;1、更好的 SEO，搜索引擎爬虫抓取工具可以直接查看完全渲染的页面

&emsp;&emsp;截至目前，Google 和 Bing 可以很好对同步 JavaScript 应用程序进行索引。但如果应用程序初始展示 loading 菊花图，然后通过 Ajax 获取内容，抓取工具并不会等待异步完成后再行抓取页面内容

&emsp;&emsp;2、更快的内容到达时间，特别是对于缓慢的网络情况或运行缓慢的设备

&emsp;&emsp;无需等待所有的 JavaScript 都完成下载并执行，才显示服务器渲染的标记，所以用户将会更快速地看到完整渲染的页面，通常可以产生更好的用户体验

 

&nbsp;

### 思路

&emsp;&emsp;下面以官方的SSR服务器端渲染流程图为例，进行概要说明

![ssr](https://pic.xiaohuochai.site/blogssr1.png)

&emsp;&emsp;1、universal Application Code是服务器端和浏览器端通用的代码

&emsp;&emsp;2、app.js是应用程序的入口entry，对应vue cli生成的项目的main.js文件

&emsp;&emsp;3、entry-client.js是客户端入口，仅运行于浏览器，entry-server.js是服务器端入口，仅运行于服务器

&emsp;&emsp;4、entry-client和entry-server这两个文件都需要通过webpack构建，其中entry-client需要通过webpack.server.config.js文件打包，entry-server需要通过webpack.server.config.js文件打包

&emsp;&emsp;5、entry-client构建后的client Bundle打包文件是vue-ssr-client-manifest.json，entry-server构建后的server Bundle打包文件是vue-ssr-server-bundle.json

&emsp;&emsp;6、server.js文件将客户端打包文件vue-ssr-client-manifest.json、服务器端打包文件vue-ssr-server-bundle.json和HTML模板混合，渲染成HTML

 

&nbsp;

### webpack配置

&emsp;&emsp;基于vue-cli生成的项目的build目录结构如下

```
build
    - build.js
    - check-versions.js
    - utils.js
    - vue-loader.conf.jd
    - webpack.base.conf.js
    - webpack.dev.conf.js
    - webpack.prod.conf.js
```
&emsp;&emsp;前面3个文件无需修改，只需修改*.*.conf.js文件

&emsp;&emsp;1、修改vue-loader.conf.js，将extract的值设置为false，因为服务器端渲染会自动将CSS内置。如果使用该extract，则会引入link标签载入CSS，从而导致相同的CSS资源重复加载
```
-    extract: isProduction
+    extract: false
```
&emsp;&emsp;2、修改webpack.base.conf.js

&emsp;&emsp;只需修改entry入门配置即可

```
...
module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    - app: './src/main.js'
    + app: './src/entry-client.js'
  },
...
```
&emsp;&emsp;3、修改webpack.prod.conf.js

&emsp;&emsp;包括应用vue-server-renderer、去除HtmlWebpackPlugin、增加client环境变量

```
'use strict'
...
+ const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const webpackConfig = merge(baseWebpackConfig, {
  ...
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env,
+     'process.env.VUE_ENV': '"client"'
    }),
    ...// generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
-    new HtmlWebpackPlugin({
-      filename: config.build.index,
-      template: 'index.html',
-      inject: true,
-      minify: {
-        removeComments: true,
-        collapseWhitespace: true,
-        removeAttributeQuotes: true
-        // more options:
-        // https://github.com/kangax/html-minifier#options-quick-reference
-      },
-      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
-      chunksSortMode: 'dependency'
-    }),
 &emsp;&emsp;...// copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
+    new VueSSRClientPlugin()
  ]
})
...
module.exports = webpackConfig
```
&emsp;&emsp;4、新增webpack.server.conf.js

```
const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.base.conf.js')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(baseConfig, {
  entry: './src/entry-server.js',
  target: 'node',
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2'
  },
  externals: nodeExternals({
    whitelist: /\.css$/
  }),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRServerPlugin()
  ]
})
```
 

&nbsp;

### 入口配置

&emsp;&emsp;在浏览器端渲染中，入口文件是main.js，而到了服务器端渲染，除了基础的main.js，还需要配置entry-client.js和entry-server.js

&emsp;&emsp;1、修改main.js

```
import Vue from 'vue'
import Vuex from 'vuex'
-  import '@/assets/style.css'
import App from './App'
-  import router from './router'
+ import createRouter from './router'
-  import store from './store'
+ import createStore from './store'
import async from './utils/async'
Vue.use(async)
- new Vue({
+ export default function createApp() {
+  const router = createRouter()
+  const store = createStore()
+  const app = new Vue({
-   el: '#app',
    router,
    store,
-   components: { App },
-   template: '<App/>'
+   render: h => h(App)
  })
+　return { app, router, store }
+}
```
&emsp;&emsp;2、新增entry-client.js

&emsp;&emsp;后面会介绍到asyncData方法，但是asyncData方法只能用于路由绑定的组件，如果是初始数据则可以直接在entry-client.js中获取

```
/* eslint-disable */
import Vue from 'vue'
import createApp from './main'

Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

const { app, router, store } = createApp()

/* 获得初始数据 */
import { LOAD_CATEGORIES_ASYNC } from '@/components/Category/module'
import { LOAD_POSTS_ASYNC } from '@/components/Post/module'
import { LOAD_LIKES_ASYNC } from '@/components/Like/module'
import { LOAD_COMMENTS_ASYNC } from '@/components/Comment/module'
import { LOAD_USERS_ASYNC } from '@/components/User/module'
(function getInitialData() {
  const { postCount, categoryCount, userCount, likeCount, commentCount } = store.getters
  const { dispatch } = store
  // 获取类别信息
  !categoryCount && dispatch(LOAD_CATEGORIES_ASYNC),
  // 获取文章信息
  !postCount && dispatch(LOAD_POSTS_ASYNC),
  // 获取点赞信息
  !likeCount && dispatch(LOAD_LIKES_ASYNC),
  // 获取评论信息
  !commentCount && dispatch(LOAD_COMMENTS_ASYNC),
  // 获取用户信息
  !userCount && dispatch(LOAD_USERS_ASYNC)
})()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    if (!activated.length) {
      return next()
    }
    Promise.all(activated.map(c => {
      if (c.asyncData) {
        return c.asyncData({ store, route: to })
      }
    })).then(() => {
      next()
    }).catch(next)
  })
  app.$mount('#root')
})
```
&emsp;&emsp;3、新增entry-sever.js

```
/* eslint-disable */
import createApp from './main'

export default context => new Promise((resolve, reject) => {
  const { app, router, store } = createApp()
  router.push(context.url)
  router.onReady(() => {
    const matchedComponents = router.getMatchedComponents()
    if (!matchedComponents.length) {
      return reject({ code: 404 })
    }
    Promise.all(matchedComponents.map(Component => {
      if (Component.asyncData) {
        return Component.asyncData({
          store,
          route: router.currentRoute
        })
      }
    })).then(() => {
      context.state = store.state
      resolve(app)
    }).catch(reject)
  }, reject)
})
```
 

&nbsp;

### 组件修改

&emsp;&emsp;由于代码需要在服务器端和浏览器端共用，所以需要修改组件，使之在服务器端运行时不会报错

&emsp;&emsp;1、修改router路由文件，给每个请求一个新的路由router实例

```
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
+ export default function createRouter() {
- export default new Router({
+   return new Router({
  &emsp;&emsp; mode: 'history',
  &emsp;&emsp; routes: [
    &emsp;&emsp; {
      &emsp;&emsp; path: '/',
      &emsp;&emsp;　component: () => import(/* webpackChunkName:'home' */ '@/components/Home/Home'),
      &emsp;&emsp;　name: 'home',
      &emsp;&emsp;　meta: { index: 0 }
    &emsp;&emsp;　},
&emsp;&emsp;&emsp;&emsp;...
  &emsp;&emsp; ]
&emsp;&emsp;})
+}
```
&emsp;&emsp;2、修改状态管理vuex文件，给每个请求一个新的vuex实例

```
import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/components/User/module'
...

Vue.use(Vuex)
+ export default function createStore() {
- export default new Vuex.Store({
+   return new Vuex.Store({
  &emsp;&emsp;modules: {
    &emsp;&emsp;auth,
&emsp;&emsp; &emsp;&emsp;...
  &emsp;&emsp;}
&emsp;&emsp;})
+}
```
&emsp;&emsp;3、使用asyncData方法来获取异步数据

&emsp;&emsp;要特别注意的是，由于asyncData只能通过路由发生作用，使用是非路由组件的异步数据获取最好移动到路由组件中

&emsp;&emsp;如果要通过asyncData获取多个数据，可以使用Promise.all()方法

```
asyncData({ store }) {
    const { dispatch } = store
    return Promise.all([
      dispatch(LOAD_CATEGORIES_ASYNC),
      dispatch(LOAD_POSTS_ASYNC)
    ])
}
```
&emsp;&emsp;如果该异步数据是全局通用的，可以在entry-client.js方法中直接获取

&emsp;&emsp;将TheHeader.vue通用头部组件获取异步数据的代码移动到entry-client.js方法中进行获取

```
// TheHeader.vue
  computed: {
    ...
-    ...mapGetters([
-      'postCount',
-      'categoryCount',
-      'likeCount',
-      'commentCount',
-      'userCount'
-    ])
  },
-  mounted() {
    // 获取异步信息
-    this.loadAsync()
&emsp;&emsp;...
-  },
...
  methods: {
-    loadAsync() {
-      const { postCount, categoryCount, userCount, likeCount, commentCount } = this
-      const { dispatch } = this.$store
-      // 获取类别信息
-      !categoryCount && dispatch(LOAD_CATEGORIES_ASYNC)
-      // 获取文章信息
-      !postCount && dispatch(LOAD_POSTS_ASYNC)
-      // 获取点赞信息
-      !likeCount && dispatch(LOAD_LIKES_ASYNC)
-      // 获取评论信息
-      !commentCount && dispatch(LOAD_COMMENTS_ASYNC)
-     // 获取用户信息
-      !userCount && dispatch(LOAD_USERS_ASYNC)
-    },
```
&emsp;&emsp;将Post.vue中的异步数据通过asyncData进行获取

```
// post.vue
...
export default {
+  asyncData({ store, route }) {
+    return store.dispatch(LOAD_POST_ASYNC, { id: route.params.postid })
+  },
...
-  mounted() {
-    this.$store.dispatch(LOAD_POST_ASYNC, { id: this.postId })
-  },
...
```
&emsp;&emsp;4、将全局css从main.js移动到App.vue的内联style样式中，因为main.js中未设置css文件解析

```
// main.js
- import '@/assets/style.css'
// App.vue
...
<style module lang="postcss">
...
</style>
```
&emsp;&emsp;5、由于post组件的模块module.js中需要对数据通过window.atob()方法进行base64解析，而nodeJS环境下无window对象，会报错。于是，代码修改如下
```
// components/Post/module
- text: decodeURIComponent(escape(window.atob(doc.content))) 
+ text: typeof window === 'object' ? decodeURIComponent(escape(window.atob(doc.content))) : ''
```

&nbsp;

### 服务器配置

&emsp;&emsp;1、在根目录下，新建server.js文件

&emsp;&emsp;由于在webpack中去掉了HTMLWebpackPlugin插件，而是通过nodejs来处理模板，同时也就缺少了该插件设置的HTML文件压缩功能

&emsp;&emsp;需要在server.js文件中安装html-minifier来实现HTML文件压缩

```
const express = require('express')
const fs = require('fs')
const path = require('path')
const { createBundleRenderer } = require('vue-server-renderer')
const { minify } = require('html-minifier')
const app = express()
const resolve = file => path.resolve(__dirname, file)

const renderer = createBundleRenderer(require('./dist/vue-ssr-server-bundle.json'), {
  runInNewContext: false,
  template: fs.readFileSync(resolve('./index.html'), 'utf-8'),
  clientManifest: require('./dist/vue-ssr-client-manifest.json'),
  basedir: resolve('./dist')
})
app.use(express.static(path.join(__dirname, 'dist')))
app.get('*', (req, res) => {
  res.setHeader('Content-Type', 'text/html')
  const handleError = err => {
    if (err.url) {
      res.redirect(err.url)
    } else if (err.code === 404) {
      res.status(404).send('404 | Page Not Found')
    } else {
      res.status(500).send('500 | Internal Server Error')
      console.error(`error during render : ${req.url}`)
      console.error(err.stack)
    }
  }

  const context = {
    title: '小火柴的前端小站',
    url: req.url
  }
  renderer.renderToString(context, (err, html) => {
    console.log(err)
    if (err) {
      return handleError(err)
    }
    res.send(minify(html, { collapseWhitespace: true, minifyCSS: true}))
  })
})

app.on('error', err => console.log(err))
app.listen(8080, () => {
  console.log(`vue ssr started at localhost: 8080`)
})
```
&emsp;&emsp;2、修改package.json文件
```
-     "build": "node build/build.js",
+    "build:client": "node build/build.js",
+    "build:server": "cross-env NODE_ENV=production webpack --config build/webpack.server.conf.js --progress --hide-modules",
+    "build": "rimraf dist && npm run build:client && npm run build:server"
```
&emsp;&emsp;3、修改index.html文件

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
    <link rel="shortcut icon" href="/static/favicon.ico">
    <title>小火柴的蓝色理想</title>
  </head>
  <body>
     <!--vue-ssr-outlet-->
  </body>
</html>
```
&emsp;&emsp;4、取消代理

&emsp;&emsp;如果继续使用代理如/api代理到后端接口，则可能会报如下错误
```
error：connect ECONNREFUSED 127.0.0.1：80
```
&emsp;&emsp;直接写带有http的后端接口地址即可
```
const API_HOSTNAME = 'http://192.168.1.103:4000'
```

&nbsp;

### 测试

&emsp;&emsp;1、安装依赖包
```
cnpm install --save-dev vue-server-renderer
```
&emsp;&emsp;2、构建
```
npm run build
```
&emsp;&emsp;3、运行
```
node server.js
```
&emsp;&emsp;点击右键，查看网页源代码。结果如下，说明网站已经实现了服务器端渲染

![ssr](https://pic.xiaohuochai.site/blog/blogssr2.png)
 

&nbsp;

### 部署

【pm2】

&emsp;&emsp;由于该网站需要守护nodejs程序，使用pm2部署较为合适

&emsp;&emsp;在项目根目录下，新建一个ecosystem.json文件，内容如下

```
{
  "apps" : [{
    "name"      : "blog-www",
    "script"    : "./index.js",
    "env": {
      "COMMON_VARIABLE": "true"
    },
    "env_production" : {
      "NODE_ENV": "production"
    }
  }],
  "deploy" : {
    "production" : {
      "user" : "xxx",
      "host" : ["1.2.3.4"],
      "port" : "22",
      "ref"  : "origin/master",
      "repo" : "git@github.com:littlematch0123/blog-client.git",
      "path" : "/home/xxx/www/mall",
      "post-deploy" : "source ~/.nvm/nvm.sh && cnpm install && pm2 startOrRestart ecosystem.json --env production",
      "ssh_options": "StrictHostKeyChecking=no",
      "env"  : {
        "NODE_ENV": "production"
      }
    }
  }
}
```
【CDN】

&emsp;&emsp;由于项目实际上既有静态资源，也有nodeJS程序。因此，最好把静态资源上传到七牛CDN上

&emsp;&emsp;自行选择服务器的一个目录，新建upload.js文件

```
var fs = require('fs');
var qiniu = require('qiniu');
var accessKey = 'xxx';
var secretKey = 'xxx';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var staticPath = '/home/www/blog/client/source/';
var prefix = 'client/static';
var bucket = 'static';

var config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z1;
var formUploader = new qiniu.form_up.FormUploader(config);
var putExtra = new qiniu.form_up.PutExtra();
putExtra = null; // 一定要将putExtra设置为null，否则会出现所有文件类别都被识别为第一个文件的类型的情况
// 文件上传方法
function uploadFile (localFile) {
  // 配置上传到七牛云的完整路径
  const key = localFile.replace(staticPath, prefix)
  const options = {
     scope: bucket + ":" + key,
 }
  const putPolicy = new qiniu.rs.PutPolicy(options)
  // 生成上传凭证
  const uploadToken = putPolicy.uploadToken(mac)
  // 上传文件
  formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr, respBody, respInfo) {
    if (respErr) throw respErr
  if (respInfo.statusCode == 200) {
    console.log(respBody);
  } else {
    console.log(respInfo.statusCode);
    console.log(respBody);
  }  
})
}
// 目录上传方法
function uploadDirectory (dirPath) {
  fs.readdir(dirPath, function (err, files) {
    if (err) throw err
    // 遍历目录下的内容
    files.forEach(item => {
      let path = `${dirPath}/${item}`
      fs.stat(path, function (err, stats) {
        if (err) throw err
        // 是目录就接着遍历 否则上传
         if (stats.isDirectory())  uploadDirectory(path)
         else  uploadFile(path, item)
      })
    })
  })
}
fs.exists(staticPath, function (exists) {
  if (!exists) {
    console.log('目录不存在！')
  }
  else {
    console.log('开始上传...')
    uploadDirectory(staticPath)
  }
})
```
【post-deploy】

&emsp;&emsp;然后，修改ecosystem.json文件中的post-deploy项
```
"source ~/.nvm/nvm.sh && cnpm install && npm run build && node /home/xiaohuochai/blog/client/upload.js&& pm2 startOrRestart ecosystem.json --env production"
```
&emsp;&emsp;但是，经过实际测试，在服务器端进行构建build，极其容易造成服务器死机。于是，还是在本地构建完成后，上传dist文件到服务器再进行相关操作
```
"source ~/.nvm/nvm.sh && cnpm install && node /home/xiaohuochai/blog/client/upload.js&& pm2 startOrRestart ecosystem.json --env production"
```
&emsp;&emsp;修改项目的静态资源地址为CDN地址，API地址为服务器API地址
```
// config/index.js
assetsPublicPath: 'https://static.xiaohuochai.site/client/'

// src/constants/API.js
const API_HOSTNAME = 'https://api.xiaohuochai.cc'
```
【nginx】

&emsp;&emsp;如果要使用域名对项目进行访问，还需要进行nginx配置

```
upstream client {
        server 127.0.0.1:3002;
}
server{
        listen 80;
        server_name www.xiaohuochai.cc xiaohuochai.cc;
    return 301 https://www.xiaohuochai.cc$request_uri;
}
server{
        listen 443 http2;
        server_name www.xiaohuochai.cc xiaohuochai.cc;
        ssl on;
        ssl_certificate /home/blog/client/crt/www.xiaohuochai.cc.crt;
        ssl_certificate_key /home/blog/client/crt/www.xiaohuochai.cc.key;
        ssl_session_timeout 5m;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_prefer_server_ciphers on;
    if ($host = 'xiaohuochai.cc'){
        rewrite ^/(.*)$ http://www.xiaohuochai.cc/$1 permanent;
    }
    location / {
        expires 7d;
        add_header Content-Security-Policy "default-src 'self' https://static.xiaohuochai.site; connect-src https://api.xiaohuochai.cc; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.xiaohuochai.site ; img-src 'self' data: https://pic.xiaohuochai.site https://static.xiaohuochai.site; style-src 'self' 'unsafe-inline' https://static.xiaohuochai.site; frame-src https://demo.xiaohuochai.site https://xiaohuochai.site https://www.xiaohuochai.site;";
        proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $http_host;
                proxy_set_header X-Nginx-Proxy true;
                proxy_pass http://client;
                proxy_redirect off;

    }
} 
```
 # 基于vue现有项目的服务器端渲染SSR改造

&emsp;&emsp;不论是官网教程，还是官方DEMO，都是从0开始的服务端渲染配置。对于现有项目的服务器端渲染SSR改造，特别是基于vue cli生成的项目，没有特别提及。本文就小火柴的前端小站这个前台项目进行SSR改造

 

&nbsp;

### 效果

&emsp;&emsp;下面是经过SSR改造后的[前端小站xiaohuochai.cc](https://xiaohuochai.cc)的网站效果，[github源码地址](https://github.com/littlematch0123/blog-client)


<iframe style="width: 100%; height: 600px;" src="https://www.xiaohuochai.cc" frameborder="0" width="260" height="600"></iframe>

&nbsp;

### 概述

【定义】

&emsp;&emsp;服务器渲染的Vue应用程序被认为是"同构"或"通用"，因为应用程序的大部分代码都可以在服务器和客户端上运行

【优点】

&emsp;&emsp;与传统SPA相比，服务器端渲染(SSR)的优势主要在于：

&emsp;&emsp;1、更好的 SEO，搜索引擎爬虫抓取工具可以直接查看完全渲染的页面

&emsp;&emsp;截至目前，Google 和 Bing 可以很好对同步 JavaScript 应用程序进行索引。但如果应用程序初始展示 loading 菊花图，然后通过 Ajax 获取内容，抓取工具并不会等待异步完成后再行抓取页面内容

&emsp;&emsp;2、更快的内容到达时间，特别是对于缓慢的网络情况或运行缓慢的设备

&emsp;&emsp;无需等待所有的 JavaScript 都完成下载并执行，才显示服务器渲染的标记，所以用户将会更快速地看到完整渲染的页面，通常可以产生更好的用户体验

 

&nbsp;

### 思路

&emsp;&emsp;下面以官方的SSR服务器端渲染流程图为例，进行概要说明

![ssr](https://pic.xiaohuochai.site/blogssr1.png)

&emsp;&emsp;1、universal Application Code是服务器端和浏览器端通用的代码

&emsp;&emsp;2、app.js是应用程序的入口entry，对应vue cli生成的项目的main.js文件

&emsp;&emsp;3、entry-client.js是客户端入口，仅运行于浏览器，entry-server.js是服务器端入口，仅运行于服务器

&emsp;&emsp;4、entry-client和entry-server这两个文件都需要通过webpack构建，其中entry-client需要通过webpack.server.config.js文件打包，entry-server需要通过webpack.server.config.js文件打包

&emsp;&emsp;5、entry-client构建后的client Bundle打包文件是vue-ssr-client-manifest.json，entry-server构建后的server Bundle打包文件是vue-ssr-server-bundle.json

&emsp;&emsp;6、server.js文件将客户端打包文件vue-ssr-client-manifest.json、服务器端打包文件vue-ssr-server-bundle.json和HTML模板混合，渲染成HTML

 

&nbsp;

### webpack配置

&emsp;&emsp;基于vue-cli生成的项目的build目录结构如下

```
build
    - build.js
    - check-versions.js
    - utils.js
    - vue-loader.conf.jd
    - webpack.base.conf.js
    - webpack.dev.conf.js
    - webpack.prod.conf.js
```
&emsp;&emsp;前面3个文件无需修改，只需修改*.*.conf.js文件

&emsp;&emsp;1、修改vue-loader.conf.js，将extract的值设置为false，因为服务器端渲染会自动将CSS内置。如果使用该extract，则会引入link标签载入CSS，从而导致相同的CSS资源重复加载
```
-    extract: isProduction
+    extract: false
```
&emsp;&emsp;2、修改webpack.base.conf.js

&emsp;&emsp;只需修改entry入门配置即可

```
...
module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    - app: './src/main.js'
    + app: './src/entry-client.js'
  },
...
```
&emsp;&emsp;3、修改webpack.prod.conf.js

&emsp;&emsp;包括应用vue-server-renderer、去除HtmlWebpackPlugin、增加client环境变量

```
'use strict'
...
+ const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const webpackConfig = merge(baseWebpackConfig, {
  ...
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env,
+     'process.env.VUE_ENV': '"client"'
    }),
    ...// generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
-    new HtmlWebpackPlugin({
-      filename: config.build.index,
-      template: 'index.html',
-      inject: true,
-      minify: {
-        removeComments: true,
-        collapseWhitespace: true,
-        removeAttributeQuotes: true
-        // more options:
-        // https://github.com/kangax/html-minifier#options-quick-reference
-      },
-      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
-      chunksSortMode: 'dependency'
-    }),
 &emsp;&emsp;...// copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
+    new VueSSRClientPlugin()
  ]
})
...
module.exports = webpackConfig
```
&emsp;&emsp;4、新增webpack.server.conf.js

```
const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.base.conf.js')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(baseConfig, {
  entry: './src/entry-server.js',
  target: 'node',
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2'
  },
  externals: nodeExternals({
    whitelist: /\.css$/
  }),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRServerPlugin()
  ]
})
```
 

&nbsp;

### 入口配置

&emsp;&emsp;在浏览器端渲染中，入口文件是main.js，而到了服务器端渲染，除了基础的main.js，还需要配置entry-client.js和entry-server.js

&emsp;&emsp;1、修改main.js

```
import Vue from 'vue'
import Vuex from 'vuex'
-  import '@/assets/style.css'
import App from './App'
-  import router from './router'
+ import createRouter from './router'
-  import store from './store'
+ import createStore from './store'
import async from './utils/async'
Vue.use(async)
- new Vue({
+ export default function createApp() {
+  const router = createRouter()
+  const store = createStore()
+  const app = new Vue({
-   el: '#app',
    router,
    store,
-   components: { App },
-   template: '<App/>'
+   render: h => h(App)
  })
+　return { app, router, store }
+}
```
&emsp;&emsp;2、新增entry-client.js

&emsp;&emsp;后面会介绍到asyncData方法，但是asyncData方法只能用于路由绑定的组件，如果是初始数据则可以直接在entry-client.js中获取

```
/* eslint-disable */
import Vue from 'vue'
import createApp from './main'

Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

const { app, router, store } = createApp()

/* 获得初始数据 */
import { LOAD_CATEGORIES_ASYNC } from '@/components/Category/module'
import { LOAD_POSTS_ASYNC } from '@/components/Post/module'
import { LOAD_LIKES_ASYNC } from '@/components/Like/module'
import { LOAD_COMMENTS_ASYNC } from '@/components/Comment/module'
import { LOAD_USERS_ASYNC } from '@/components/User/module'
(function getInitialData() {
  const { postCount, categoryCount, userCount, likeCount, commentCount } = store.getters
  const { dispatch } = store
  // 获取类别信息
  !categoryCount && dispatch(LOAD_CATEGORIES_ASYNC),
  // 获取文章信息
  !postCount && dispatch(LOAD_POSTS_ASYNC),
  // 获取点赞信息
  !likeCount && dispatch(LOAD_LIKES_ASYNC),
  // 获取评论信息
  !commentCount && dispatch(LOAD_COMMENTS_ASYNC),
  // 获取用户信息
  !userCount && dispatch(LOAD_USERS_ASYNC)
})()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    if (!activated.length) {
      return next()
    }
    Promise.all(activated.map(c => {
      if (c.asyncData) {
        return c.asyncData({ store, route: to })
      }
    })).then(() => {
      next()
    }).catch(next)
  })
  app.$mount('#root')
})
```
&emsp;&emsp;3、新增entry-sever.js

```
/* eslint-disable */
import createApp from './main'

export default context => new Promise((resolve, reject) => {
  const { app, router, store } = createApp()
  router.push(context.url)
  router.onReady(() => {
    const matchedComponents = router.getMatchedComponents()
    if (!matchedComponents.length) {
      return reject({ code: 404 })
    }
    Promise.all(matchedComponents.map(Component => {
      if (Component.asyncData) {
        return Component.asyncData({
          store,
          route: router.currentRoute
        })
      }
    })).then(() => {
      context.state = store.state
      resolve(app)
    }).catch(reject)
  }, reject)
})
```
 

&nbsp;

### 组件修改

&emsp;&emsp;由于代码需要在服务器端和浏览器端共用，所以需要修改组件，使之在服务器端运行时不会报错

&emsp;&emsp;1、修改router路由文件，给每个请求一个新的路由router实例

```
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
+ export default function createRouter() {
- export default new Router({
+   return new Router({
  &emsp;&emsp; mode: 'history',
  &emsp;&emsp; routes: [
    &emsp;&emsp; {
      &emsp;&emsp; path: '/',
      &emsp;&emsp;　component: () => import(/* webpackChunkName:'home' */ '@/components/Home/Home'),
      &emsp;&emsp;　name: 'home',
      &emsp;&emsp;　meta: { index: 0 }
    &emsp;&emsp;　},
&emsp;&emsp;&emsp;&emsp;...
  &emsp;&emsp; ]
&emsp;&emsp;})
+}
```
&emsp;&emsp;2、修改状态管理vuex文件，给每个请求一个新的vuex实例

```
import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/components/User/module'
...

Vue.use(Vuex)
+ export default function createStore() {
- export default new Vuex.Store({
+   return new Vuex.Store({
  &emsp;&emsp;modules: {
    &emsp;&emsp;auth,
&emsp;&emsp; &emsp;&emsp;...
  &emsp;&emsp;}
&emsp;&emsp;})
+}
```
&emsp;&emsp;3、使用asyncData方法来获取异步数据

&emsp;&emsp;要特别注意的是，由于asyncData只能通过路由发生作用，使用是非路由组件的异步数据获取最好移动到路由组件中

&emsp;&emsp;如果要通过asyncData获取多个数据，可以使用Promise.all()方法

```
asyncData({ store }) {
    const { dispatch } = store
    return Promise.all([
      dispatch(LOAD_CATEGORIES_ASYNC),
      dispatch(LOAD_POSTS_ASYNC)
    ])
}
```
&emsp;&emsp;如果该异步数据是全局通用的，可以在entry-client.js方法中直接获取

&emsp;&emsp;将TheHeader.vue通用头部组件获取异步数据的代码移动到entry-client.js方法中进行获取

```
// TheHeader.vue
  computed: {
    ...
-    ...mapGetters([
-      'postCount',
-      'categoryCount',
-      'likeCount',
-      'commentCount',
-      'userCount'
-    ])
  },
-  mounted() {
    // 获取异步信息
-    this.loadAsync()
&emsp;&emsp;...
-  },
...
  methods: {
-    loadAsync() {
-      const { postCount, categoryCount, userCount, likeCount, commentCount } = this
-      const { dispatch } = this.$store
-      // 获取类别信息
-      !categoryCount && dispatch(LOAD_CATEGORIES_ASYNC)
-      // 获取文章信息
-      !postCount && dispatch(LOAD_POSTS_ASYNC)
-      // 获取点赞信息
-      !likeCount && dispatch(LOAD_LIKES_ASYNC)
-      // 获取评论信息
-      !commentCount && dispatch(LOAD_COMMENTS_ASYNC)
-     // 获取用户信息
-      !userCount && dispatch(LOAD_USERS_ASYNC)
-    },
```
&emsp;&emsp;将Post.vue中的异步数据通过asyncData进行获取

```
// post.vue
...
export default {
+  asyncData({ store, route }) {
+    return store.dispatch(LOAD_POST_ASYNC, { id: route.params.postid })
+  },
...
-  mounted() {
-    this.$store.dispatch(LOAD_POST_ASYNC, { id: this.postId })
-  },
...
```
&emsp;&emsp;4、将全局css从main.js移动到App.vue的内联style样式中，因为main.js中未设置css文件解析

```
// main.js
- import '@/assets/style.css'
// App.vue
...
<style module lang="postcss">
...
</style>
```
&emsp;&emsp;5、由于post组件的模块module.js中需要对数据通过window.atob()方法进行base64解析，而nodeJS环境下无window对象，会报错。于是，代码修改如下
```
// components/Post/module
- text: decodeURIComponent(escape(window.atob(doc.content))) 
+ text: typeof window === 'object' ? decodeURIComponent(escape(window.atob(doc.content))) : ''
```

&nbsp;

### 服务器配置

&emsp;&emsp;1、在根目录下，新建server.js文件

&emsp;&emsp;由于在webpack中去掉了HTMLWebpackPlugin插件，而是通过nodejs来处理模板，同时也就缺少了该插件设置的HTML文件压缩功能

&emsp;&emsp;需要在server.js文件中安装html-minifier来实现HTML文件压缩

```
const express = require('express')
const fs = require('fs')
const path = require('path')
const { createBundleRenderer } = require('vue-server-renderer')
const { minify } = require('html-minifier')
const app = express()
const resolve = file => path.resolve(__dirname, file)

const renderer = createBundleRenderer(require('./dist/vue-ssr-server-bundle.json'), {
  runInNewContext: false,
  template: fs.readFileSync(resolve('./index.html'), 'utf-8'),
  clientManifest: require('./dist/vue-ssr-client-manifest.json'),
  basedir: resolve('./dist')
})
app.use(express.static(path.join(__dirname, 'dist')))
app.get('*', (req, res) => {
  res.setHeader('Content-Type', 'text/html')
  const handleError = err => {
    if (err.url) {
      res.redirect(err.url)
    } else if (err.code === 404) {
      res.status(404).send('404 | Page Not Found')
    } else {
      res.status(500).send('500 | Internal Server Error')
      console.error(`error during render : ${req.url}`)
      console.error(err.stack)
    }
  }

  const context = {
    title: '小火柴的前端小站',
    url: req.url
  }
  renderer.renderToString(context, (err, html) => {
    console.log(err)
    if (err) {
      return handleError(err)
    }
    res.send(minify(html, { collapseWhitespace: true, minifyCSS: true}))
  })
})

app.on('error', err => console.log(err))
app.listen(8080, () => {
  console.log(`vue ssr started at localhost: 8080`)
})
```
&emsp;&emsp;2、修改package.json文件
```
-     "build": "node build/build.js",
+    "build:client": "node build/build.js",
+    "build:server": "cross-env NODE_ENV=production webpack --config build/webpack.server.conf.js --progress --hide-modules",
+    "build": "rimraf dist && npm run build:client && npm run build:server"
```
&emsp;&emsp;3、修改index.html文件

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
    <link rel="shortcut icon" href="/static/favicon.ico">
    <title>小火柴的蓝色理想</title>
  </head>
  <body>
     <!--vue-ssr-outlet-->
  </body>
</html>
```
&emsp;&emsp;4、取消代理

&emsp;&emsp;如果继续使用代理如/api代理到后端接口，则可能会报如下错误
```
error：connect ECONNREFUSED 127.0.0.1：80
```
&emsp;&emsp;直接写带有http的后端接口地址即可
```
const API_HOSTNAME = 'http://192.168.1.103:4000'
```

&nbsp;

### 测试

&emsp;&emsp;1、安装依赖包
```
cnpm install --save-dev vue-server-renderer
```
&emsp;&emsp;2、构建
```
npm run build
```
&emsp;&emsp;3、运行
```
node server.js
```
&emsp;&emsp;点击右键，查看网页源代码。结果如下，说明网站已经实现了服务器端渲染

![ssr](https://pic.xiaohuochai.site/blog/blogssr2.png)
 

&nbsp;

### 部署

【pm2】

&emsp;&emsp;由于该网站需要守护nodejs程序，使用pm2部署较为合适

&emsp;&emsp;在项目根目录下，新建一个ecosystem.json文件，内容如下

```
{
  "apps" : [{
    "name"      : "blog-www",
    "script"    : "./index.js",
    "env": {
      "COMMON_VARIABLE": "true"
    },
    "env_production" : {
      "NODE_ENV": "production"
    }
  }],
  "deploy" : {
    "production" : {
      "user" : "xxx",
      "host" : ["1.2.3.4"],
      "port" : "22",
      "ref"  : "origin/master",
      "repo" : "git@github.com:littlematch0123/blog-client.git",
      "path" : "/home/xxx/www/mall",
      "post-deploy" : "source ~/.nvm/nvm.sh && cnpm install && pm2 startOrRestart ecosystem.json --env production",
      "ssh_options": "StrictHostKeyChecking=no",
      "env"  : {
        "NODE_ENV": "production"
      }
    }
  }
}
```
【CDN】

&emsp;&emsp;由于项目实际上既有静态资源，也有nodeJS程序。因此，最好把静态资源上传到七牛CDN上

&emsp;&emsp;自行选择服务器的一个目录，新建upload.js文件

```
var fs = require('fs');
var qiniu = require('qiniu');
var accessKey = 'xxx';
var secretKey = 'xxx';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var staticPath = '/home/www/blog/client/source/';
var prefix = 'client/static';
var bucket = 'static';

var config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z1;
var formUploader = new qiniu.form_up.FormUploader(config);
var putExtra = new qiniu.form_up.PutExtra();
putExtra = null; // 一定要将putExtra设置为null，否则会出现所有文件类别都被识别为第一个文件的类型的情况
// 文件上传方法
function uploadFile (localFile) {
  // 配置上传到七牛云的完整路径
  const key = localFile.replace(staticPath, prefix)
  const options = {
     scope: bucket + ":" + key,
 }
  const putPolicy = new qiniu.rs.PutPolicy(options)
  // 生成上传凭证
  const uploadToken = putPolicy.uploadToken(mac)
  // 上传文件
  formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr, respBody, respInfo) {
    if (respErr) throw respErr
  if (respInfo.statusCode == 200) {
    console.log(respBody);
  } else {
    console.log(respInfo.statusCode);
    console.log(respBody);
  }  
})
}
// 目录上传方法
function uploadDirectory (dirPath) {
  fs.readdir(dirPath, function (err, files) {
    if (err) throw err
    // 遍历目录下的内容
    files.forEach(item => {
      let path = `${dirPath}/${item}`
      fs.stat(path, function (err, stats) {
        if (err) throw err
        // 是目录就接着遍历 否则上传
         if (stats.isDirectory())  uploadDirectory(path)
         else  uploadFile(path, item)
      })
    })
  })
}
fs.exists(staticPath, function (exists) {
  if (!exists) {
    console.log('目录不存在！')
  }
  else {
    console.log('开始上传...')
    uploadDirectory(staticPath)
  }
})
```
【post-deploy】

&emsp;&emsp;然后，修改ecosystem.json文件中的post-deploy项
```
"source ~/.nvm/nvm.sh && cnpm install && npm run build && node /home/xiaohuochai/blog/client/upload.js&& pm2 startOrRestart ecosystem.json --env production"
```
&emsp;&emsp;但是，经过实际测试，在服务器端进行构建build，极其容易造成服务器死机。于是，还是在本地构建完成后，上传dist文件到服务器再进行相关操作
```
"source ~/.nvm/nvm.sh && cnpm install && node /home/xiaohuochai/blog/client/upload.js&& pm2 startOrRestart ecosystem.json --env production"
```
&emsp;&emsp;修改项目的静态资源地址为CDN地址，API地址为服务器API地址
```
// config/index.js
assetsPublicPath: 'https://static.xiaohuochai.site/client/'

// src/constants/API.js
const API_HOSTNAME = 'https://api.xiaohuochai.cc'
```
【nginx】

&emsp;&emsp;如果要使用域名对项目进行访问，还需要进行nginx配置

```
upstream client {
        server 127.0.0.1:3002;
}
server{
        listen 80;
        server_name www.xiaohuochai.cc xiaohuochai.cc;
    return 301 https://www.xiaohuochai.cc$request_uri;
}
server{
        listen 443 http2;
        server_name www.xiaohuochai.cc xiaohuochai.cc;
        ssl on;
        ssl_certificate /home/blog/client/crt/www.xiaohuochai.cc.crt;
        ssl_certificate_key /home/blog/client/crt/www.xiaohuochai.cc.key;
        ssl_session_timeout 5m;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_prefer_server_ciphers on;
    if ($host = 'xiaohuochai.cc'){
        rewrite ^/(.*)$ http://www.xiaohuochai.cc/$1 permanent;
    }
    location / {
        expires 7d;
        add_header Content-Security-Policy "default-src 'self' https://static.xiaohuochai.site; connect-src https://api.xiaohuochai.cc; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.xiaohuochai.site ; img-src 'self' data: https://pic.xiaohuochai.site https://static.xiaohuochai.site; style-src 'self' 'unsafe-inline' https://static.xiaohuochai.site; frame-src https://demo.xiaohuochai.site https://xiaohuochai.site https://www.xiaohuochai.site;";
        proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $http_host;
                proxy_set_header X-Nginx-Proxy true;
                proxy_pass http://client;
                proxy_redirect off;

    }
} 
```

&nbsp;

### 浏览器渲染

&emsp;&emsp;官网的代码中，如果使用开发环境development，则需要进行相当复杂的配置

&emsp;&emsp;能否应用当前的webpack.dev.conf.js来进行开发呢？完全可以，开发环境中使用浏览器端渲染，生产环境中使用服务器端渲染

&emsp;&emsp;需要做出如下三点更改：

&emsp;&emsp;1、更改API地址，开发环境使用webpack代理，生产环境使用上线地址

```
// src/constants/API
let API_HOSTNAME
if (process.env.NODE_ENV === 'production') {
  API_HOSTNAME = 'https://api.xiaohuochai.cc'
} else {
  API_HOSTNAME = '/api'
}
```
&emsp;&emsp;2、在index.html同级目录下，新建一个index.template.html文件，index.html是开发环境的模板文件，index.template.html是生产环境的模板文件

```
// index.html
  <body>
    <div id="root"></div>
  </body>

// index.template.html
  <body>
     <!--vue-ssr-outlet-->
  </body>
```
&emsp;&emsp;3、更改服务器端入口文件server.js的模板文件为index.template.html

```
// server.js
const renderer = createBundleRenderer(require('./dist/vue-ssr-server-bundle.json'), {
  runInNewContext: false,
  template: fs.readFileSync(resolve('./index.template.html'), 'utf-8'),
  clientManifest: require('./dist/vue-ssr-client-manifest.json'),
  basedir: resolve('./dist')
})
```
&emsp;&emsp;经过简单的更改，即可实现开发环境使用浏览器端渲染，生产环境使用服务器端渲染的效果