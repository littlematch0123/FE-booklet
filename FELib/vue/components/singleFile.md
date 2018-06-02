# Vue单文件组件

&emsp;&emsp;本文将详细介绍Vue单文件组件

&nbsp;

### 概述

&emsp;&emsp;在很多 Vue 项目中，使用 `Vue.component` 来定义全局组件，紧接着用 `new Vue({ el: '#container '})` 在每个页面内指定一个容器元素。

&emsp;&emsp;这种方式在很多中小规模的项目中运作的很好，在这些项目里 JavaScript 只被用来加强特定的视图。但当在更复杂的项目中，或者前端完全由 JavaScript 驱动的时候，下面这些缺点将变得非常明显：

&emsp;&emsp;1、**全局定义 (Global definitions)** 强制要求每个 component 中的命名不得重复

&emsp;&emsp;2、**字符串模板 (String templates)** 缺乏语法高亮，在 HTML 有多行的时候，需要用到丑陋的 `\`

&emsp;&emsp;3、**不支持 CSS (No CSS support)** 意味着当 HTML 和 JavaScript 组件化时，CSS 明显被遗漏

&emsp;&emsp;4、**没有构建步骤 (No build step)** 限制只能使用 HTML 和 ES5 JavaScript, 而不能使用预处理器，如 Pug (formerly Jade) 和 Babel

&emsp;&emsp;文件扩展名为 `.vue` 的 **single-file components(单文件组件)** 为以上所有问题提供了解决方法，并且还可以使用 Webpack 或 Browserify 等构建工具

&emsp;&emsp;下面是一个文件名为 `Hello.vue` 的简单实例：

&nbsp;

![vue-component](https://pic.xiaohuochai.site/blog/vue_component.png)

&emsp;&emsp;通过单文件组合，现在我们获得：

<div>
<pre>1、完整语法高亮
2、CommonJS 模块
3、组件化的 CSS</pre>
</div>

&emsp;&emsp;还可以使用预处理器来构建简洁和功能更丰富的组件，比如 Pug，Babel (with ES2015 modules)，和 Stylus。

![vue-component-with-preprocessors](https://pic.xiaohuochai.site/blog/vue_component2.png)

&emsp;&emsp;这些特定的语言只是例子，可以只是简单地使用 Babel，TypeScript，SCSS，PostCSS - 或者其他任何能够帮助提高生产力的预处理器。如果搭配`vue-loader`使用Webpack，它也是把CSS Modules当作第一公民对待

【关注点分离】

&emsp;&emsp;一个重要的事情值得注意，关注点分离不等于文件类型分离。在现代 UI 开发中，已经发现相比于把代码库分离成三个大的层次并将其相互交织起来，把它们划分为松散耦合的组件再将其组合起来更合理一些。在一个组件里，其模板、逻辑和样式是内部耦合的，并且把它们搭配在一起实际上使得组件更加内聚且更可维护。

&emsp;&emsp;即便不喜欢单文件组件，仍然可以把 JavaScript、CSS 分离成独立的文件然后做到热重载和预编译

<div>
<pre>&lt;!-- my-component.vue --&gt;
&lt;template&gt;
  &lt;div&gt;This will be pre-compiled&lt;/div&gt;
&lt;/template&gt;
&lt;script src="./my-component.js"&gt;&lt;/script&gt;
&lt;style src="./my-component.css"&gt;&lt;/style&gt;</pre>
</div>

&nbsp;

### 起步

&emsp;&emsp;有了 `.vue` 组件，就进入了高级 JavaScript 应用领域

&emsp;&emsp;最好参考 [webpack-simple](https://github.com/vuejs-templates/webpack-simple)。只要遵循指示，就能很快地运行一个用到 `.vue` 组件，ES2015 和 热重载 (hot-reloading) 的 Vue 项目。这个模板使用 [Webpack](https://webpack.github.io/)，一个能将多个模块打包成最终应用的模块打包工具

&emsp;&emsp;在 Webpack 中，每个模块被打包到 bundle 之前都由一个相应的 &ldquo;loader&rdquo; 来转换，Vue 也提供 [vue-loader](https://github.com/vuejs/vue-loader) 插件来执行 `.vue` 单文件组件 的转换。这个 [webpack-simple](https://github.com/vuejs-templates/webpack-simple) 模板已经为你准备好了所有的东西

&emsp;&emsp;无论更钟情Webpack或是Browserify，简单的或更复杂的项目都可参考一些文档模板。浏览[github.com/vuejs-templates](https://github.com/vuejs-templates)，找到需要的部分，然后参考 README 中的说明，使用 [vue-cli](https://github.com/vuejs/vue-cli) 工具生成新的项目

&emsp;&emsp;模板中使用 [Webpack](https://webpack.js.org/)，一个模块加载器加载多个模块然后构建成最终应用

