# 网站PWA升级

&emsp;&emsp;渐进式网络应用 ( Progressive Web Apps )，即我们所熟知的 PWA，是 Google 提出的用前沿的 Web 技术为网页提供 App 般使用体验的一系列方案。PWA 本质上是 Web App，借助一些新技术也具备了 Native App 的一些特性。本文将详细介绍针对现有网站的PWA升级

 

&nbsp;

### 效果演示

&emsp;&emsp;以前端小站[xiaohuochai.cc](https://www.xiaohuochai.cc/)的PWA效果做演示，[github移步至此](https://github.com/littlematch0123/blog-client)

【添加到桌面】

![pwa](https://pic.xiaohuochai.site/blog/pwa1.gif)
【离线缓存】

&emsp;&emsp;由于手机录屏选择无法进行离线录制，改由模拟器模拟离线效果

![pwa](https://pic.xiaohuochai.site/blog/pwa2.gif)

 

&nbsp;

### 概述

&emsp;&emsp;PWA 的主要特点包括下面三点：

&emsp;&emsp;1、可靠 - 即使在不稳定的网络环境下，也能瞬间加载并展现

&emsp;&emsp;2、体验 - 快速响应，并且有平滑的动画响应用户的操作

&emsp;&emsp;3、粘性 - 像设备上的原生应用，具有沉浸式的用户体验，用户可以添加到桌面

&emsp;&emsp;主要功能包括站点可添加至主屏幕、全屏方式运行、支持离线缓存、消息推送等

【PRPL模式】

&emsp;&emsp;“PRPL”（读作 “purple”）是 Google 的工程师提出的一种 web 应用架构模式，它旨在利用现代 web 平台的新技术以大幅优化移动 web 的性能与体验，对如何组织与设计高性能的 PWA 系统提供了一种高层次的抽象

&emsp;&emsp;“PRPL”实际上是 Push/Preload、Render、Precache、Lazy-Load 的缩写

&emsp;&emsp;1、PUSH/PRELOAD，推送/预加载初始 URL 路由所需的关键资源

&emsp;&emsp;2、RENDER，渲染初始路由，尽快让应用可被交互

&emsp;&emsp;3、PRE-CACHE，用 Service Worker 预缓存剩下的路由

&emsp;&emsp;4、LAZY-LOAD 按需懒加载、懒实例化剩下的路由

【Service workers】

&emsp;&emsp;Service Workers 是谷歌 chrome 团队提出并大力推广的一项 web 技术。在 2015 年，它加入到 W3C 标准，进入草案阶段

&emsp;&emsp;PWA 的关键在于 Service Workers 。就其核心来说，Service Workers 只是后台运行的 worker 脚本。它们是用 JavaScript 编写的，只需短短几行代码，它们便可使开发者能够拦截网络请求，处理推送消息并执行许多其他任务

&emsp;&emsp;Service Worker 中用到的一些全局变量:
```
self: 表示 Service Worker 作用域, 也是全局变量
caches: 表示缓存
skipWaiting: 表示强制当前处在 waiting 状态的脚本进入 activate 状态
clients: 表示 Service Worker 接管的页面
```
&emsp;&emsp;Service Worker 的工作机制大致如下：用户访问一个具有 Service Worker 的页面，浏览器就会下载这个 Service Worker 并尝试安装、激活。一旦激活，Service Worker 就到后台开始工作。接下来用户访问这个页面或者每隔一个时段浏览器都会下载这个 Service Worker，如果监测到 Service Worker 有更新，就会重新安装并激活新的 Service Worker，同时 revoke 掉旧的 Service Worker，这就是 SW 的生命周期

&emsp;&emsp;因为 Service Worker 有着最近的权限接触数据，因此 Service Worker 只能被安装在 HTTPS 加密的页面中，虽然无形当中提高了 PWA 的门槛，不过也是为了安全做考虑

 

&nbsp;

### 离线缓存

&emsp;&emsp;下面来通过service worker实现离线缓存

&emsp;&emsp;一般地，通过sw-precache-webpack-plugin插件来实现动态生成service worker文件的效果

&emsp;&emsp;不过，首先要在index.html中引用service worker

```
    <script>
      (function() {
        if('serviceWorker' in navigator) {
          navigator.serviceWorker.register('/service-worker.js');
        }
      })()
    </script>
```
【SPA】

&emsp;&emsp;通过create-react-app生成的react SPA应用默认就进行了sw-precache-webpack-plugin的设置。但是，其只对静态资源进行了设置

&emsp;&emsp;如果是接口资源，则一般的处理是优先通过网络访问，如果网络不通，再通过service worker的缓存进行访问

&emsp;&emsp;webpack.config.prod.js文件的配置如下

```
    const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
    new SWPrecacheWebpackPlugin({
      // By default, a cache-busting query parameter is appended to requests
      // used to populate the caches, to ensure the responses are fresh.
      // If a URL is already hashed by Webpack, then there is no concern
      // about it being stale, and the cache-busting can be skipped.
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) {
          // This message occurs for every build and is a bit too noisy.
          return;
        }
        if (message.indexOf('Skipping static resource') === 0) {
          // This message obscures real errors so we ignore it.
          // https://github.com/facebookincubator/create-react-app/issues/2612
          return;
        }
        console.log(message);
      },
      minify: true,
      // For unknown URLs, fallback to the index page
      navigateFallback: publicUrl + '/index.html',
      // Ignores URLs starting from /__ (useful for Firebase):
      // https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      // Don't precache sourcemaps (they're large) and build asset manifest:
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
      runtimeCaching: [{
          urlPattern: '/',
          handler: 'networkFirst'
        },
        {
          urlPattern: /\/api/,
          handler: 'networkFirst'
        }
      ]
    })
```
【SSR】

&emsp;&emsp;如果是服务器端渲染的应用，则配置基本类似。但由于无法使用代理，则需要设置网站实际路径，且由于静态资源已经存到CDN，则缓存不再通过service worker处理

&emsp;&emsp;配置如下

```
    new SWPrecacheWebpackPlugin({
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) {
          return;
        }
        if (message.indexOf('Skipping static resource') === 0) {
          return;
        }
        console.log(message);
      },
      navigateFallback: 'https://www.xiaohuochai.cc',
      minify: true,
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      dontCacheBustUrlsMatching: /./,
      staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
      runtimeCaching: [{
          urlPattern: '/',
          handler: 'networkFirst'
        },
        {
          urlPattern: /\/(posts|categories|users|likes|comments)/,
          handler: 'networkFirst'
        },
      ]
    })
  ]
```
 

&nbsp;

### 添加到屏幕

&emsp;&emsp;没人愿意多此一举地在移动设备键盘上输入长长的网址。通过添加到屏幕的功能，用户可以像从应用商店安装本机应用那样，选择为其设备添加一个快捷链接，并且过程要顺畅得多

【配置项说明】

&emsp;&emsp;使用manifest.json文件来实现添加到屏幕的功能，下面是该文件内的配置项

```
short_name: 应用展示的名字
icons: 定义不同尺寸的应用图标
start_url: 定义桌面启动的 URL
description: 应用描述
display: 定义应用的显示方式，有 4 种显示方式，分别为：
&emsp;&emsp;fullscreen: 全屏
&emsp;&emsp;standalone: 应用
&emsp;&emsp;minimal-ui: 类似于应用模式，但比应用模式多一些系统导航控制元素，但又不同于浏览器模式
&emsp;&emsp;browser: 浏览器模式，默认值
name: 应用名称
orientation: 定义默认应用显示方向，竖屏、横屏
prefer_related_applications: 是否设置对应移动应用，默认为 false
related_applications: 获取移动应用的方式
background_color: 应用加载之前的背景色，用于应用启动时的过渡
theme_color: 定义应用默认的主题色
dir: 文字方向，3 个值可选 ltr(left-to-right), rtl(right-to-left) 和 auto(浏览器判断)，默认为 auto
lang: 语言
scope: 定义应用模式下的路径范围，超出范围会以浏览器方式显示
```
&emsp;&emsp;下面是一份常规的manifest.json文件的配置

```
{
  "name": "小火柴的前端小站",
  "short_name": "前端小站",
  "start_url": "/",
  "display": "standalone",
  "description": "",
  "theme_color": "#fff",
  "background_color": "#d8d8d8",
  "icons": [{
      "src": "./logo_32.png",
      "sizes": "32x32",
      "type": "image/png"
    },
    {
      "src": "./logo_48.png",
      "sizes": "48x48",
      "type": "image/png"
    },
    {
      "src": "./logo_96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "./logo_144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "./logo_192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "./logo_256.png",
      "sizes": "256x256",
      "type": "image/png"
    }
  ]
}
```
【注意事项】

&emsp;&emsp;1、在 Chrome 上首选使用 short_name，如果存在，则优先于 name 字段使用

&emsp;&emsp;2、图标的类型最好是png，，且存在144px的尺寸，否则会得到如下提示

```
Site cannot be installed: a 144px square PNG icon is required, but no supplied icon meets this requirement
```
&emsp;&emsp;3、start_url表示项目启动路径

&emsp;&emsp;如果是'/'，则启动路径为

```
localhost:3000/
```
&emsp;&emsp;如果是'/index.html'，则启动路径为
```
localhost:3000/index.html
```
&emsp;&emsp;所以，最好填写'/'

【HTML引用】

&emsp;&emsp;在HTML文档中通过link标签来引用manifest.json文件
```
<link rel="manifest" href="/manifest.json">
```
&emsp;&emsp;要特别注意manifest文件路径问题，要将该文件放到静态资源目录下，否则，会找不到该文件，控制台显示如下提示
```
Manifest is not valid JSON. Line: 1, column: 1, Unexpected token
```
&emsp;&emsp;如果index.html也位于静态资源目录，则设置如下
```
<link rel="manifest" href="/manifest.json">
```
&emsp;&emsp;如果index.html位于根目录，而静态资源目录为static，则设置如下
```
<link rel="manifest" href="/static/manifest.json" />
```
【meta标签】

&emsp;&emsp;为了更好地SEO，需要通过meta标签设置theme-color
```
<meta name="theme-color" content="#fff"/>
```
【SSR】

&emsp;&emsp;如果是服务器端配置，需要在server.js文件中配置manifest.json、logo、icon等文件的静态路径
```
app.use(express.static(path.join(__dirname, 'dist')))
app.use('/manifest.json', express.static(path.join(__dirname, 'manifest.json')))
app.use('/logo', express.static(path.join(__dirname, 'logo')))
app.use('/service-worker.js', express.static(path.join(__dirname, 'dist/service-worker.js')))
```
