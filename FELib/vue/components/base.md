# Vue组件基础用法

&emsp;&emsp;组件(Component)是Vue.js最强大的功能之一。组件可以扩展HTML元素，封装可重用的代码。根据项目需求，抽象出一些组件，每个组件里包含了展现、功能和样式。每个页面，根据自己所需，使用不同的组件来拼接页面。这种开发模式使前端页面易于扩展，且灵活性高，而且组件之间也实现了解耦。本文将详细介绍Vue组件基础用法

![vue_components_base1](https://pic.xiaohuochai.site/blog/vue_components_base1.png)


&nbsp;

### 概述

&emsp;&emsp;在 Vue 里，一个组件本质上是一个拥有预定义选项的一个 Vue 实例

&emsp;&emsp;组件是一个自定义元素或称为一个模块，包括所需的模板、逻辑和样式。在HTML模板中，组件以一个自定义标签的形式存在，起到占位符的功能。通过Vue.js的声明式渲染后，占位符将会被替换为实际的内容

&emsp;&emsp;下面是一个最简单的模块示例

<div>
<pre>&lt;div id="app"&gt;
    &lt;xiaohuochai&gt;&lt;/xiaohuochai&gt;
&lt;/div&gt;</pre>
</div>

![vue_components_base2](https://pic.xiaohuochai.site/blog/vue_components_base2.png)


&nbsp;

### 注册组件

&emsp;&emsp;组件注册包括全局注册和局部注册两种

【全局注册】

&emsp;&emsp;要注册一个全局组件，可以使用&nbsp;`Vue.component(tagName, options)`

<div>
<pre>Vue.component('my-component', {
  // 选项
})</pre>
</div>

&emsp;&emsp;组件在注册之后，便可以在父实例的模块中以自定义元素&nbsp;`<my-component></my-component>`&nbsp;的形式使用

&emsp;&emsp;注意：要确保在初始化根实例之前注册了组件

<div>
<pre>&lt;div id="example"&gt;
  &lt;my-component&gt;&lt;/my-component&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
// 注册
Vue.component('my-component', {
  template: '&lt;div&gt;A custom component!&lt;/div&gt;'
})
// 创建根实例
new Vue({
  el: '#example'
})
&lt;/script&gt;</pre>
</div>

![vue_components_base3](https://pic.xiaohuochai.site/blog/vue_components_base3.png)


【局部注册】

&emsp;&emsp;通过使用组件实例选项components注册，可以使组件仅在另一个实例/组件的作用域中可用

<div>
<pre>&lt;div id="example"&gt;
  &lt;my-component&gt;&lt;/my-component&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
// 注册
var Child = {
  template: '&lt;div&gt;A custom component!&lt;/div&gt;'
};
// 创建根实例
new Vue({
  el: '#example',
    components: {
    // &lt;my-component&gt; 将只在父模板可用
    'my-component': Child
  }  
})
&lt;/script&gt;</pre>
</div>

![vue_components_base4](https://pic.xiaohuochai.site/blog/vue_components_base4.png)


**组件树**

&emsp;&emsp;使用组件实例选项components注册，可以实现组件树的效果

<div>
<pre>&lt;div id="example"&gt;
  &lt;my-component&gt;&lt;/my-component&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
// 注册
var headerTitle = {
    template: '&lt;p&gt;我是标题&lt;/p&gt;',
};
var headerContent = {
    template: '&lt;p&gt;我是内容&lt;/p&gt;',
};
var header = {
  template: `
      &lt;div class="hd"&gt;
            &lt;header-content&gt;&lt;/header-content&gt;
            &lt;header-title&gt;&lt;/header-title&gt;
      &lt;/div&gt;
  `,
    components: {
    'header-content': headerContent,
    'header-title': headerTitle
  }   
};
// 创建实例
new Vue({
  el: '#example',
    components: {
    'my-component': header
  }  
})
&lt;/script&gt;</pre>
</div>

![vue_components_base5](https://pic.xiaohuochai.site/blog/vue_components_base5.png)


&emsp;&emsp;对于大型应用来说，有必要将整个应用程序划分为组件，以使开发可管理。一般地组件应用模板如下所示

<div>
<pre>&lt;div id="app"&gt;
  &lt;app-nav&gt;&lt;/app-nav&gt;
  &lt;app-view&gt;
    &lt;app-sidebar&gt;&lt;/app-sidebar&gt;
    &lt;app-content&gt;&lt;/app-content&gt;
  &lt;/app-view&gt;
&lt;/div&gt;</pre>
</div>

【v-once】

&emsp;&emsp;尽管在 Vue 中渲染 HTML 很快，不过当组件中包含**大量**静态内容时，可以考虑使用 `v-once` 将渲染结果缓存起来

<div>
<pre>Vue.component('my-component', {
  template: '&lt;div v-once&gt;hello world!...&lt;/div&gt;'
})</pre>
</div>

&nbsp;

### 模板分离

&emsp;&emsp;在组件注册中，使用template选项中拼接HTML元素比较麻烦，这也导致了HTML和JS的高耦合性。庆幸的是，Vue.js提供了两种方式将定义在JS中的HTML模板分离出来

【script】

&emsp;&emsp;在script标签里使用 `text/x-template` 类型，并且指定一个 id

<div>
<pre>&lt;script type="text/x-template" id="hello-world-template"&gt;
  &lt;p&gt;Hello hello hello&lt;/p&gt;
&lt;/script&gt;</pre>
</div>
<div>
<pre>Vue.component('hello-world', {
  template: '#hello-world-template'
})</pre>
</div>

&emsp;&emsp;上面的代码等价于

<div>
<pre>Vue.component('hello-world', {
  template: '&lt;p&gt;Hello hello hello&lt;/p&gt;'
})</pre>
</div>

&emsp;&emsp;下面是一个简单示例

<div>
<pre>&lt;div id="example"&gt;
  &lt;my-component&gt;&lt;/my-component&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script type="text/x-template" id="hello-world-template"&gt;
  &lt;div&gt;hello world!&lt;/div&gt;  
&lt;/script&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
Vue.component('my-component', {
  template: '#hello-world-template'
})
new Vue({
  el: '#example'
})
&lt;/script&gt;</pre>
</div>

![vue_components_base6](https://pic.xiaohuochai.site/blog/vue_components_base6.png)


【template】

&emsp;&emsp;如果使用`<template>`标签，则不需要指定type属性

<div>
<pre>&lt;div id="example"&gt;
  &lt;my-component&gt;&lt;/my-component&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;template id="hello-world-template"&gt;
  &lt;div&gt;hello world!&lt;/div&gt;  
&lt;/template&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
// 注册
Vue.component('my-component', {
  template: '#hello-world-template'
})
// 创建根实例
new Vue({
  el: '#example'
})
&lt;/script&gt;</pre>
</div>

![vue_components_base7](https://pic.xiaohuochai.site/blog/vue_components_base7.png)


&nbsp;

### 命名约定

&emsp;&emsp;对于组件的命名，W3C规范是字母小写且包含一个中划线(-)，虽然Vue没有强制要求，但最好遵循规范　&nbsp;

<div>
<pre>&lt;!-- 在HTML模版中始终使用 kebab-case --&gt;
&lt;kebab-cased-component&gt;&lt;/kebab-cased-component&gt;
&lt;camel-cased-component&gt;&lt;/camel-cased-component&gt;
&lt;pascal-cased-component&gt;&lt;/pascal-cased-component&gt;</pre>
</div>

&emsp;&emsp;当注册组件时，使用中划线、小驼峰、大驼峰这三种任意一种都可以

<div>
<pre>// 在组件定义中
components: {
  // 使用 中划线 形式注册
  'kebab-cased-component': { /* ... */ },
  // 使用 小驼峰 形式注册
  'camelCasedComponent': { /* ... */ },
  // 使用 大驼峰 形式注册
  'PascalCasedComponent': { /* ... */ }
}</pre>
</div>

&nbsp;

### 嵌套限制

&emsp;&emsp;并不是所有的元素都可以嵌套模板，因为要受到HTML元素嵌套规则的限制，尤其像`<ul>`，`<ol>`，`<table>`，`<select>`&nbsp;限制了能被它包裹的元素，而一些像&nbsp;`<option>`&nbsp;这样的元素只能出现在某些其它元素内部

&emsp;&emsp;注意：关于HTML标签的详细嵌套规则[移步至此](http://www.cnblogs.com/xiaohuochai/p/5433698.html)

&emsp;&emsp;在自定义组件中使用这些受限制的元素时会导致一些问题，例如

<div>
<pre>&lt;table id="example"&gt;
  &lt;my-row&gt;...&lt;/my-row&gt;
&lt;/table&gt;</pre>
</div>

&emsp;&emsp;自定义组件&nbsp;`<my-row>`&nbsp;被认为是无效的内容，因此在渲染的时候会导致错误

<div>
<pre>&lt;script&gt;
// 注册
var header = {
  template: '&lt;div class="hd"&gt;我是标题&lt;/div&gt;'  
};
// 创建实例
new Vue({
  el: '#example',
    components: {
    'my-row': header
  }  
})
&lt;/script&gt;</pre>
</div>

![vue_components_base8](https://pic.xiaohuochai.site/blog/vue_components_base8.png)


【is属性】

&nbsp;&emsp;&emsp;变通的方案是使用特殊的&nbsp;`is`&nbsp;属性

<div>
<pre>&lt;table id="example"&gt;
  &lt;tr is="my-row"&gt;&lt;/tr&gt;
&lt;/table&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
// 注册
var header = {
  template: '&lt;div class="hd"&gt;我是标题&lt;/div&gt;'
};
// 创建实例
new Vue({
  el: '#example',
    components: {
    'my-row': header
  }  
})
&lt;/script&gt;</pre>
</div>

![vue_components_base9](https://pic.xiaohuochai.site/blog/vue_components_base9.png)


&nbsp;

### 根元素

&emsp;&emsp;Vue强制要求每一个Vue实例(组件本质上就是一个Vue实例)需要有一个根元素

&emsp;&emsp;如下所示，则会报错

<div>
<pre>&lt;div id="example"&gt;
  &lt;my-component&gt;&lt;/my-component&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
// 注册
Vue.component('my-component', {
  template: `
    &lt;p&gt;第一段&lt;/p&gt;
    &lt;p&gt;第二段&lt;/p&gt;
  `,
})
// 创建根实例
new Vue({
  el: '#example'
})
&lt;/script&gt;</pre>
</div>

![vue_components_base10](https://pic.xiaohuochai.site/blog/vue_components_base10.png)


&emsp;&emsp;需要改写成如下所示

<div>
<pre>&lt;script&gt;
// 注册
Vue.component('my-component', {
  template: `
    &lt;div&gt;
      &lt;p&gt;第一段&lt;/p&gt;
      &lt;p&gt;第二段&lt;/p&gt;
    &lt;/div&gt;  
  `,
})
// 创建根实例
new Vue({
  el: '#example'
})
&lt;/script&gt;</pre>
</div>

![vue_components_base11](https://pic.xiaohuochai.site/blog/vue_components_base11.png)


&nbsp;

### data数据

&emsp;&emsp;一般地，我们在Vue实例对象或Vue组件对象中，我们通过data来传递数据

<div>
<pre>&lt;div id="example"&gt;
  &lt;my-component&gt;&lt;/my-component&gt;
  &lt;my-component&gt;&lt;/my-component&gt;
  &lt;my-component&gt;&lt;/my-component&gt;
&lt;/div&gt;</pre>
</div>
<!-- {% raw %} -->
<div>
<pre>&lt;script&gt;
// 注册
Vue.component('my-component', {
  template: '&lt;div&gt;{{message}}&lt;/div&gt;',
  data:{
      message: 'hello'
  }
})
// 创建根实例
new Vue({
  el: '#example'
})
&lt;/script&gt;</pre>
</div>
<!-- {% endraw %} -->
&emsp;&emsp;运行上面的代码，会使Vue停止执行，并在控制台发出错误提示，告诉你在组件中&nbsp;`data`&nbsp;必须是一个函数

![vue_components_base12](https://pic.xiaohuochai.site/blog/vue_components_base12.png)


&emsp;&emsp;可以用如下方式来绕开Vue的错误提示
<!-- {% raw %} -->
<div>
<pre>&lt;script&gt;
// 注册
var data = {counter: 0}
Vue.component('my-component', {
  template: '&lt;button v-on:click="counter += 1"&gt;{{ counter }}&lt;/button&gt;',
  data:function(){
      return data;
  }
})
// 创建根实例
new Vue({
  el: '#example'
})
&lt;/script&gt;</pre>
</div>
<!-- {% endraw %} -->
<iframe src="https://demo.xiaohuochai.site/vue/module/m1.html" frameborder="0" width="320" height="40"></iframe>

&emsp;&emsp;由于这三个组件共享了同一个&nbsp;`data`，因此增加一个 counter 会影响所有组件

&emsp;&emsp;当一个组件被定义，&nbsp;`data`&nbsp;需要声明为返回一个初始数据对象的函数，因为组件可能被用来创建多个实例。如果&nbsp;`data`&nbsp;仍然是一个纯粹的对象，则所有的实例将共享引用同一个数据对象。通过提供&nbsp;`data`&nbsp;函数，每次创建一个新实例后，能够调用&nbsp;`data`&nbsp;函数，从而返回初始数据的一个全新副本数据对象

&emsp;&emsp;因此，可以通过为每个组件返回全新的 data 对象来解决这个问题：&nbsp;
<!-- {% raw %} -->
<div>
<pre>&lt;script&gt;
// 注册
Vue.component('my-component', {
  template: '&lt;button v-on:click="counter += 1"&gt;{{ counter }}&lt;/button&gt;',
  data:function(){
      return {counter: 0};
  }
})
// 创建根实例
new Vue({
  el: '#example'
})
&lt;/script&gt;</pre>
</div>
<!-- {% endraw %} -->
&emsp;&emsp;现在每个 counter 都有它自己内部的状态了

<iframe src="https://demo.xiaohuochai.site/vue/module/m2.html" frameborder="0" width="320" height="40"></iframe>

&nbsp;

### 原生事件

&emsp;&emsp;有时候，可能想在某个组件的根元素上监听一个原生事件。直接使用v-bind指令是不生效的
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;my-component @click="doTheThing"&gt;&lt;/my-component&gt;
  &lt;p&gt;{{message}}&lt;/p&gt;
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
Vue.component('my-component', {
  template: '&lt;button&gt;按钮&lt;/button&gt;',
})
new Vue({
  el: '#example',
  data:{
    message:0
  },
  methods:{
    doTheThing(){
      this.message++;
    }
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 90px;" src="https://demo.xiaohuochai.site/vue/module/m3.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;可以使用&nbsp;`.native`&nbsp;修饰&nbsp;`v-on指令即可`
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;my-component @click.native="doTheThing"&gt;&lt;/my-component&gt;
  &lt;p&gt;{{message}}&lt;/p&gt;
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
Vue.component('my-component', {
  template: '&lt;button&gt;按钮&lt;/button&gt;',
})
new Vue({
  el: '#example',
  data:{
    message:0
  },
  methods:{
    doTheThing(){
      this.message++;
    }
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 90px;" src="https://demo.xiaohuochai.site/vue/module/m4.html" frameborder="0" width="320" height="240"></iframe>

