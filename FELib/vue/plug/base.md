# Vue插件plugins的基本操作

&emsp;&emsp;本文将详细介绍Vue插件plugins的基本操作

&nbsp;

### 开发插件

&emsp;&emsp;插件通常会为 Vue 添加全局功能。插件的范围没有限制&mdash;&mdash;一般有下面几种：

&emsp;&emsp;1、添加全局方法或者属性，如: [vue-custom-element](https://github.com/karol-f/vue-custom-element)

&emsp;&emsp;2、添加全局资源：指令/过滤器/过渡等，如 [vue-touch](https://github.com/vuejs/vue-touch)

&emsp;&emsp;3、通过全局 mixin 方法添加一些组件选项，如: [vue-router](https://github.com/vuejs/vue-router)

&emsp;&emsp;4、添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现

&emsp;&emsp;5、一个库，提供自己的 API，同时提供上面提到的一个或多个功能，如 [vue-router](https://github.com/vuejs/vue-router)

&emsp;&emsp;Vue.js 的插件应当有一个公开方法 `install` 。这个方法的第一个参数是 `Vue` 构造器，第二个参数是一个可选的选项对象：

<div>
<pre>MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }
  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })
  // 3. 注入组件
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })
  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}</pre>
</div>

&nbsp;

### 使用插件

&emsp;&emsp;通过全局方法 Vue.use() 使用插件：

<div>
<pre>// 调用 `MyPlugin.install(Vue)`
Vue.use(MyPlugin)</pre>
</div>

&emsp;&emsp;也可以传入一个选项对象：

<div>
<pre>Vue.use(MyPlugin, { someOption: true })</pre>
</div>

&emsp;&emsp;Vue.use 会自动阻止注册相同插件多次，届时只会注册一次该插件

&emsp;&emsp;Vue.js 官方提供的一些插件 (例如 `vue-router`) 在检测到 `Vue` 是可访问的全局变量时会自动调用 `Vue.use()`。然而在例如 CommonJS 的模块环境中，应该始终显式地调用 `Vue.use()`：

<div>
<pre>// 用 Browserify 或 webpack 提供的 CommonJS 模块环境时
var Vue = require('vue')
var VueRouter = require('vue-router')
// 不要忘了调用此方法
Vue.use(VueRouter)</pre>
</div>

&emsp;&emsp;[awesome-vue](https://github.com/vuejs/awesome-vue#components--libraries) 集合了来自社区贡献的数以千计的插件和库

