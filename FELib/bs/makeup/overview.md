# Bootstrap概述

&emsp;&emsp;Bootstrap是简单、灵活的用于搭建WEB页面的HTML、CSS、Javascript的工具集。Bootstrap基于HTML5和CSS3，具有漂亮的设计、友好的学习曲线、卓越的兼容性，还有12列响应式栅格结构，丰富的组件等等。按照官网的宣传来说，Bootstrap 是最受欢迎的 HTML、CSS 和 JS 框架，用于开发响应式布局、移动设备优先的 WEB 项目。本文将介绍Bootstrap概述

&nbsp;

### 引入

&emsp;&emsp;在传统前端开发过程中，常常出现重复、复杂、无意义地命名，结构冗余、胡乱嵌套，页面错乱等问题

&emsp;&emsp;2011年，twitter的&ldquo;一小撮&rdquo;工程师为了提高他们内部的分析和管理能力，用业余时间为他们的产品构建了一套易用、优雅、灵活、可扩展的前端工具集--BootStrap。Bootstrap由MARK OTTO和Jacob Thornton所设计和建立，在github上开源之后，迅速成为该站上最多人watch&amp;fork的项目。大量工程师踊跃为该项目贡献代码，社区惊人地活跃，代码版本进化非常快速，官方文档质量极其高(可以说是优雅)，同时涌现了许多基于Bootstrap建设的网站：界面清新、简洁，要素排版利落大方

&emsp;&emsp;Bootstrap最新版本是Bootstrap4，稳定版本是Bootstrap3，兼容低版本IE的版本是Bootstrap2　

&emsp;&emsp;Bootstrap基于HTML5和CSS3，其大量的JavaScript插件都依赖 jQuery，且jQuery的版本不能低于1.9.1版本

&nbsp;

### 特性

&emsp;&emsp;Bootstrap主要具有以下特性：

&emsp;&emsp;响应式设计

&emsp;&emsp;栅格布局

&emsp;&emsp;完整的类库

&emsp;&emsp;jQuery插件

&emsp;&emsp;不同的使用场景

&nbsp;

### 包含文件

&emsp;&emsp;Bootstrap 提供了两种形式的压缩包，在下载下来的压缩包内可以看到以下目录和文件，这些文件按照类别放到了不同的目录内，并且提供了压缩与未压缩两种版本。&nbsp;

【预编译版】

&emsp;&emsp;下载压缩包之后，将其解压缩到任意目录即可看到以下（压缩版的）目录结构：

<div>
<pre>bootstrap/
├── css/
│   ├── bootstrap.css
│   ├── bootstrap.css.map
│   ├── bootstrap.min.css
│   ├── bootstrap.min.css.map
│   ├── bootstrap-theme.css
│   ├── bootstrap-theme.css.map
│   ├── bootstrap-theme.min.css
│   └── bootstrap-theme.min.css.map
├── js/
│   ├── bootstrap.js
│   └── bootstrap.min.js
└── fonts/
    ├── glyphicons-halflings-regular.eot
    ├── glyphicons-halflings-regular.svg
    ├── glyphicons-halflings-regular.ttf
    ├── glyphicons-halflings-regular.woff
    └── glyphicons-halflings-regular.woff2</pre>
</div>

&emsp;&emsp;上面展示的就是 Bootstrap 的基本文件结构：预编译文件可以直接使用到任何 web 项目中。提供了编译好的 CSS 和 JS (`bootstrap.*`) 文件，还有经过压缩的 CSS 和 JS (`bootstrap.min.*`) 文件。同时还提供了 CSS&nbsp;[源码映射表](https://developer.chrome.com/devtools/docs/css-preprocessors)&nbsp;(`bootstrap.*.map`) ，可以在某些浏览器的开发工具中使用。同时还包含了来自 Glyphicons 的图标字体，在附带的 Bootstrap 主题中使用到了这些图标

【Bootstrap 源码】

&emsp;&emsp;Bootstrap 源码包含了预先编译的 CSS、JavaScript 和图标字体文件，并且还有 LESS、JavaScript 和文档的源码。具体来说，主要文件组织结构如下：

<div>
<pre>bootstrap/
├── less/
├── js/
├── fonts/
├── dist/
│   ├── css/
│   ├── js/
│   └── fonts/
└── docs/
    └── examples/</pre>
</div>

&emsp;&emsp;`less/`、`js/`&nbsp;和&nbsp;`fonts/`&nbsp;目录分别包含了 CSS、JS 和字体图标的源码。`dist/`&nbsp;目录包含了上面所说的预编译 Bootstrap 包内的所有文件。`docs/`&nbsp;包含了所有文档的源码文件，`examples/`&nbsp;目录是 Bootstrap 官方提供的实例工程。除了这些，其他文件还包含 Bootstrap 安装包的定义文件、许可证文件和编译脚本等。

&nbsp;

### 基本模板

<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="zh-CN"&gt;
  &lt;head&gt;
    &lt;!-- utf-8编码--&gt;
    &lt;meta charset="utf-8"&gt;
    &lt;!-- 在IE运行最新的渲染模式--&gt;
    &lt;meta http-equiv="X-UA-Compatible" content="IE=edge"&gt;
    &lt;!--视口viewport设置--&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;
    &lt;!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ --&gt;
    &lt;title&gt;Bootstrap 101 Template&lt;/title&gt;
    &lt;!-- 引入Bootstrap --&gt;
    &lt;link href="css/bootstrap.min.css" rel="stylesheet"&gt;
    &lt;!-- 在IE8-浏览器中，支持HTML5新标签和媒体查询@media--&gt;
    &lt;!--[if lt IE 9]&gt;
      &lt;script src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"&gt;&lt;/script&gt;
      &lt;script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"&gt;&lt;/script&gt;
    &lt;![endif]--&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;你好，世界！&lt;/h1&gt;
    &lt;!-- 先引入jQurey，再引入bootstrap插件 --&gt;
    &lt;script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
    &lt;script src="js/bootstrap.min.js"&gt;&lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;</pre>
</div>

&nbsp;