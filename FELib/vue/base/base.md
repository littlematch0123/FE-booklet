# Vue入门基础

&emsp;&emsp;[Vue中文文档](https://cn.vuejs.org/)写得很好，界面清爽，内容翔实。但文档毕竟不是教程，文档一上来出现了大量的新概念，对于新手而言，并不友好。个人还是比较喜欢类似于《JS高级程序设计》的风格，从浅入深，娓娓道来

&emsp;&emsp;于是，还是按照自己的思路，对Vue的知识体系从浅入深的开始学习，并把学习记录总结成博客，也是希望能够帮助到同样入门Vue的朋友，本文将详细介绍Vue入门基础

&nbsp;

### 概述

&emsp;&emsp;Vue.js（读音 /vjuː/，类似于 **view**） 是一套构建用户界面的**渐进式框架**。Vue 采用自底向上增量开发的设计，核心库只关注视图层，它不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与单文件组件和 Vue 生态系统支持的库结合使用时，Vue 也完全能够为复杂的单页应用程序提供驱动

&emsp;&emsp;注意：由于Vue使用getter/setter等ES5特性，所以兼容到IE9

![vue_base_base1](https://pic.xiaohuochai.site/blog/vue_base_base1.png)

&emsp;&emsp;下面来解释下，何为渐进式框架，如上图所示　

&emsp;&emsp;如果只使用Vue最基础的声明式渲染的功能，则完全可以把Vue当做一个模板引擎来使用

&emsp;&emsp;如果想以组件化开发方式进行开发，则可以进一步使用Vue里面的组件系统

&emsp;&emsp;如果要制作SPA(单页应用)，则使用Vue里面的客户端路由功能

&emsp;&emsp;如果组件越来越多，需要共享一些数据，则可以使用Vue里的状态管理

&emsp;&emsp;如果想在团队里执行统一的开发流程或规范，则使用构建工具

&emsp;&emsp;所以，可以根据项目的复杂度来自主选择使用Vue里面的功能

&nbsp;

### 安装

&emsp;&emsp;Vue.js有三种获取方式

1、[官网](https://cn.vuejs.org/)直接下载

&emsp;&emsp;[开发版本](https://vuejs.org/js/vue.js)：包含完整的警告和调试模式

&emsp;&emsp;[生产版本](https://vuejs.org/js/vue.min.js)：删除了警告，28.96kb min+gzip

2、CDN

&emsp;&emsp;使用[https://unpkg.com/vue](https://unpkg.com/vue)这个在线CDN

3、NPM

<div>
<pre># 最新稳定版
$ npm install vue</pre>
</div>

&nbsp;&emsp;&emsp;获取Vue后，直接使用script标签引入即可使用

<div>
<pre>&lt;script src="vue.js"&gt;&lt;/script&gt;    </pre>
</div>
<div>
<pre>&lt;script src="https://unpkg.com/vue"&gt;&lt;/script&gt;</pre>
</div>

&nbsp;

### 模板插值

&emsp;&emsp;前面介绍过，对于Vue最简单的应用就是将其当作一个模板引擎，也就是采用模板语法把数据渲染进 DOM。Vue使用双大括号语法来进行文本插值，下面的message相当于一个变量或占位符，最终会表示为真正的文本内容
<!-- {% raw %} -->
```
<div id="app">
  {{ message }}
</div>
```
<!-- {% endraw %} -->
&nbsp;

### 构造器

&emsp;&emsp;每个Vue.js应用都是通过构造函数&nbsp;`Vue`&nbsp;创建一个&nbsp;Vue 的根实例启动的，经常使用&nbsp;`vm`&nbsp;(ViewModel 的简称) 这个变量名表示Vue实例

<div>
<pre>var vm = new Vue({
  // 选项
})</pre>
</div>

&emsp;&emsp;在实例化Vue时，需要传入一个选项对象，它可以包含数据、模板、挂载元素、方法、生命周期钩子等选项

<div>
<pre>var vm = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})</pre>
</div>

&emsp;&emsp;上面为Vue()构造函数传入了一个对象，对象中包括el和data这两个参数

【el】

&emsp;&emsp;参数el，是element的缩写，用于提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标

&emsp;&emsp;参数值有两种类型，包括string | HTMLElement

&emsp;&emsp;上例中， el : "#app"表示挂载目标为id为"app"的元素，也可以写为 el : document.getElementById('app')

【data】

&emsp;&emsp;参数data表示Vue实例的数据对象

&emsp;&emsp;上例中，data: {&nbsp; message: 'Hello Vue!'&nbsp;} 表示变量message所代表的真实值为"Hello Vue!"

&nbsp;

### 简单实例

&emsp;&emsp;下面将Vue的模板插值和构造器结合起来，制作一个简单实例
<!-- {% raw %} -->
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<div id="app">
  {{ message }}
</div>
<script src="vue.js"></script>    
<script>
var vm = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
</script>
</body>
</html>
```
<!-- {% endraw %} -->
&emsp;&emsp;得到如下所示的结果

![vue_base_base2](https://pic.xiaohuochai.site/blog/vue_base_base2.png)

【数据绑定】

&emsp;&emsp;看起来上面的例子跟单单渲染一个字符串模板非常类似，但是Vue在背后做了大量工作。现在数据和 DOM 已经被绑定在一起，所有的元素都是响应式的

&emsp;&emsp;在控制台中修改app.message的值，可看到DOM元素相应的更新

![vue_base_base3](https://pic.xiaohuochai.site/blog/vue_base_base3.gif)

&nbsp;

## 最后

&emsp;&emsp;当然，Vue学习的前提是要掌握[ES6](http://www.cnblogs.com/xiaohuochai/p/7233392.html)、[nodejs](http://www.cnblogs.com/xiaohuochai/p/6940560.html)以及[webpack](http://www.cnblogs.com/xiaohuochai/p/6666415.html#anchor2)

&emsp;&emsp;欢迎交流

