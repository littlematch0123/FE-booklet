# gitbook简明学习

&emsp;&emsp;gitbook功能强大，可以自动实现搜索及翻页等功能，上手容易，用markdown书写即可，且可以自动生成响应式网站。本文将详细介绍如何使用gitbook

&nbsp;

### 安装

&emsp;&emsp;1、使用npm全局安装gitbook-cli

<div>
<pre>npm install gitbook-cli -g</pre>
</div>

![helper_gitbook1](https://pic.xiaohuochai.site/blog/helper_gitbook1.png)


&emsp;&emsp;2、使用gitbook --version来查看gitbook的版本

<div>
<pre>gitbook --version</pre>
</div>

![helper_gitbook2](https://pic.xiaohuochai.site/blog/helper_gitbook2.png)


&emsp;&emsp;3、接下来对gitbook进行基础配置，创建并进入一个笔记文件夹

<div>
<pre>mkdir myNote
cd myNode</pre>
</div>

&emsp;&emsp;4、初始化gitbook，会自动生成两个文件。README.md用于书籍介绍，SUMMARY.md用于设置书籍的目录

<div>
<pre>gitbook init</pre>
</div>

![helper_gitbook3](https://pic.xiaohuochai.site/blog/helper_gitbook3.png)


&emsp;&emsp;5、接着，使用gitbook serve命令来启动gitbook本地服务器，预览默认的书籍内容

<div>
<pre>gitbook serve</pre>
</div>

![helper_gitbook4](https://pic.xiaohuochai.site/blog/helper_gitbook4.png)


&emsp;&emsp;6、打开localhost:4000，会出现如下页面


![helper_gitbook5](https://pic.xiaohuochai.site/blog/helper_gitbook5.png)


&emsp;&emsp;7、使用gitbook install命令来安装插件

<div>
<pre>gitbook install</pre>
</div>

&emsp;&emsp;8、生成静态网页

&emsp;&emsp;使用gitbook build命令，gitbook把md文件构建成静态网页

<div>
<pre>gitbook build #生成静态网页</pre>
</div>

&nbsp;

### 目录结构

&emsp;&emsp;GitBook 基本的目录结构如下所示

<div>
<pre>.
├── book.json
├── README.md
├── SUMMARY.md
├── chapter-1/
|   ├── README.md
|   └── something.md
└── chapter-2/
    ├── README.md
    └── something.md</pre>
</div>

【`book.json`】

&emsp;&emsp;该文件用于存放配置信息

【`Glossary.md`】

&emsp;&emsp;允许指定要显示为注释的术语及其各自的定义。根据这些条款，GitBook将自动构建一个索引并突出显示这些术语

&emsp;&emsp;该`GLOSSARY.md`格式是列表`h2`的标题，以及描述项一起

<div>
<pre>## Term
Definition for this term
## Another term
With it's definition, this can contain bold text
and all other kinds of inline markup ...</pre>
</div>

【`README.md`】

&emsp;&emsp;书本的第一页内容是从文件&nbsp;`README.md`&nbsp;中提取的。如果这个文件名没有出现在&nbsp;`SUMMARY`&nbsp;中，那么它会被添加为章节的第一个条目

【`.bookignore`】

&emsp;&emsp;GitBook将读取`.gitignore`，`.bookignore`以及`.ignore`文件以获得文件和文件夹跳过列表

【`SUMMARY.md`】

&emsp;&emsp;该文件用于存放GitBook的文件目录信息，左侧的目录就是根据这个文件来生成的，默认对应的文件是&nbsp;`SUMMARY.md`，可以在&nbsp;`book.json`&nbsp;重新定义该文件的对应值。它通过Markdown中的列表语法来表示文件的父子关系

&emsp;&emsp;注意：不被`SUMMARY.md`包含的文件不会被`gitbook`处理

&emsp;&emsp;该文件基本的写法如下

```
# Summary

* [Part I](part1/README.md)
    * [Writing is nice](part1/writing.md)
    * [GitBook is nice](part1/gitbook.md)
* [Part II](part2/README.md)
    * [We love feedback](part2/feedback_please.md)
    * [Better tools for authors](part2/better_tools.md)
```

&emsp;&emsp;目录中的章节可以使用锚点指向文件的特定部分

```
# Summary

### Part I

* [Part I](part1/README.md)
    * [Writing is nice](part1/README.md#writing)
    * [GitBook is nice](part1/README.md#gitbook)
* [Part II](part2/README.md)
    * [We love feedback](part2/README.md#feedback)
    * [Better tools for authors](part2/README.md#tools)
```

&emsp;&emsp;目录可以分为以标题或水平线分隔的部分

```
# Summary

### Part I

* [Writing is nice](part1/writing.md)
* [GitBook is nice](part1/gitbook.md)

### Part II

* [We love feedback](part2/feedback_please.md)
* [Better tools for authors](part2/better_tools.md)

----

* [Last part without title](part3/title.md)
```

&nbsp;

### 配置

&emsp;&emsp;下面是book.json中的一些配置信息

【title】

&emsp;&emsp;书本的标题

<div>
<pre>"title" : "小火柴的前端小册子"</pre>
</div>

【author】

&emsp;&emsp;作者的相关信息

<div>
<pre>"author" : "xiaohuochai"</pre>
</div>

【description】

&emsp;&emsp;本书的简单描述

<div>
<pre>"description" : "小火柴的前端学习记录"</pre>
</div>

【language】

&emsp;&emsp;Gitbook使用的语言

<div>
<pre>"language" : "zh-hans",</pre>
</div>

【root】

&emsp;&emsp;指定存放 GitBook 文件（除了 book.json）的根目录

&emsp;&emsp;如果目录结构如下

<div>
<pre>.
├── book.json
└── docs/
    ├── README.md
    └── SUMMARY.md</pre>
</div>

&emsp;&emsp;则可以这样设置

<div>
<pre>"root": "./docs"</pre>
</div>

【structure】

&emsp;&emsp;指定自述文件，摘要，词汇表等的路径

<div>
<pre>变量   描述
structure.readme     自述文件名（默认为README.md）
structure.summary    摘要文件名（默认为SUMMARY.md）
structure.glossary   词汇表文件名（默认为GLOSSARY.md）
structure.languages  语言文件名（默认为LANGS.md）</pre>
</div>

【variables】

&emsp;&emsp;可以通过{{book.value}}来获取变量，变量会从书本内容中寻找对应的值

<div>
<pre>     "variables": {
        "value": "Hello World"
    }   </pre>
</div>

【转义】

&emsp;&emsp;如果想要输出任何特殊的目标标签，可以使用raw，任何在其中的内容都会原样输出
```
{% raw %}
  这 {{ 不会被处理 }}
{% endraw %}
```
【link】

&emsp;&emsp;插件中的链接(null: default, false: remove, string: new value)

<div>
<pre>  "links": {
        // Custom links at top of sidebar
        "sidebar": {
            "Custom link name": "https://xiaohuochai.site"
        },
        // Sharing links
        "sharing": {
            "google": null,
            "facebook": null,
            "twitter": null,
            "weibo": null,
            "all": null
        }
    }</pre>
</div>

&nbsp;

### 插件

<div>
<pre>plugins         要加载的插件列表
pluginsConfig　  插件配置</pre>
</div>

&emsp;&emsp;gitbook默认带有6个插件

<div>
<pre>highlight
search
sharing
font-settings
livereload
lunr</pre>
</div>

&emsp;&emsp;如果要去除自带的插件， 可以在插件名称前面加`-`

<div>
<pre>"plugins": [
    "-search"
]</pre>
</div>

&emsp;&emsp;下面来介绍一些常用的插件

【打赏功能：donate】

<div>
<pre>{
    "plugins": ["donate"],
    "pluginsConfig": {
        "donate": {
          "wechat": "例：/images/qr.png",
          "alipay": "http://blog.willin.wang/static/images/qr.png",
          "title": "默认空",
          "button": "默认值：Donate",
          "alipayText": "默认值：支付宝捐赠",
          "wechatText": "默认值：微信捐赠"
        }
    }
}</pre>
</div>

【中文搜索：search-plus】

<div>
<pre>{
    plugins: ["-lunr", "-search", "search-plus"]
}</pre>
</div>

【广告功能：ad】

<div>
<pre>{
  "plugins": ["ad"],
  "pluginsConfig": {
    "ad": {
      "contentTop": "&lt;div&gt;Ads at the top of the page&lt;/div&gt;",
      "contentBottom": "%3Cdiv%3EAds%20at%20the%20bottom%20of%20the%20page%3C/div%3E"
    }
  }
}

// note: contentBottom is escape('&lt;div&gt;Ads at the bottom of the page&lt;/div&gt;')</pre>
</div>

【目录宽度可调节：splitter】

<div>
<pre>{
    "plugins": ["splitter"]
}</pre>
</div>

【github图标】

<div>
<pre>{
    "plugins": [ "github" ],
    "pluginsConfig": {
        "github": {
            "url": "https://github.com/your/repo"
        }
    }
}</pre>
</div>

【自定义页脚：tbfed-pagefooter】

<div>
<pre>{
    "plugins": [ "tbfed-pagefooter" ],
    "pluginsConfig": {
        "tbfed-pagefooter": {
             "copyright":"&amp;copy Taobao FED Team",
             "modify_label": "该文件修订时间：",
             "modify_format": "YYYY-MM-DD HH:mm:ss"
        }
    }
}    </pre>
</div>

【目录章节可折叠：`expandable-chapters`】

<div>
<pre>{
    {
        plugins: ["expandable-chapters"]
    }
    {
        "pluginsConfig": {
            "expandable-chapters":{}
        }
    }
}</pre>
</div>

【畅言评论：changyan】

<div>
<pre>{
    "plugins": [
        "changyan"
    ],
    "pluginsConfig": {
        "changyan": {
            "appid": "your changyan's appid",
            "conf": "the conf in the code generate by changyan"
        }
    }
}</pre>
</div>

【返回顶部：back-to-top-button】&nbsp;

<div>
<pre>{
    "plugins" : [ "back-to-top-button" ]
}</pre>
</div>

【更换ico：favicon】

&emsp;&emsp;注意：favicon只支持本地路径，不支持网络路径

<div>
<pre>{
    "plugins": [
        "favicon"
    ],
    "pluginsConfig": {
        "favicon": {
            "shortcut": "assets/images/favicon.ico",
            "bookmark": "assets/images/favicon.ico",
            "appleTouch": "assets/images/apple-touch-icon.png",
            "appleTouchMore": {
                "120x120": "assets/images/apple-touch-icon-120x120.png",
                "180x180": "assets/images/apple-touch-icon-180x180.png"
            }
        }
    }
}</pre>
</div>

&nbsp;

### 主题

&emsp;&emsp;目前 GitBook 提供了三类文档： Book 文档、API文档、FAQ文档。常用的是 Book 文档模式，如果需要使用 API 文档模式或者 FAQ 文档模式，只需引入文档对应的主题插件即可

【Book】

&nbsp;&emsp;&emsp;Book 是常用的模式，大部分插件也都是针对这个模式做的。

&emsp;&emsp;`theme-default`&nbsp;是默认的 Book 主题。将&nbsp;`showLevel`&nbsp;设为&nbsp;`true`， 就可以显示标题前面的数字索引，默认不显示

<div>
<pre>{
    "theme-default": {
        "showLevel": true
    }
}</pre>
</div>

&emsp;&emsp;them-comscore是另一个Book主题，可以为标题添加颜色

<div>
<pre>{
"plugins": [
        "theme-comscore"
    ]
}</pre>
</div>

【API】

&emsp;&emsp;GitBook 同样可以编写 API 文档，只需要引入&nbsp;`theme-api`&nbsp;插件，引入之后会替换默认的样式

<div>
<pre>{
    "plugins": ["theme-api"],
    "pluginsConfig": {
        "theme-api": {
            "theme": "dark"
        }
    }
}</pre>
</div>

【FAQ】

&emsp;&emsp;`theme-faq`&nbsp;插件主要用来制作知识库或者帮助中心，GitBook 的&nbsp;帮助中心&nbsp;就是使用的该主题。为了支持中文搜索需要引入&nbsp;`search-pro`&nbsp;包

<div>
<pre>{
    "plugins": [
        "theme-faq",
        "-lunr",
        "search-pro@^2.0.2"
    ]
}</pre>
</div>

&emsp;&emsp;编写帮助中心很简单，在&nbsp;`Summary`&nbsp;里配置问题以及答案所在的文件，在对应文件中写入问题的答案即可

&emsp;&emsp;注意：由于FAQ主题默认会调用maxcdn里的bootstrap和fontawesome，所以对于国内用户来说，可访问性不是很好

```
# Summary

## HTML
* [介绍](README.md)
* [语法介绍](introduce.md)
* [结构](struct.md)

## HTTP
*  [HTTP](HTTP.md)

## CSS
* [display](display.md)
* [float](float.md)
* [absolute](absolute.md)
* [relative](relative.md)
```

&nbsp;

### 修改内容

&emsp;&emsp;下面在初始化的gitbook的基础上修改内容，并制作一个简单的电子书

&emsp;&emsp;注意：gitbook需要掌握markdown语法，详细信息[移步至此](http://www.cnblogs.com/xiaohuochai/p/6211447.html)

&emsp;&emsp;修改目录文件`SUMMARY.md`

```
# Summary

* [前言](README.md)
* [HTML](HTML.md)
* [CSS](CSS.md)
* [JS](JS.md)
* [HTTP](HTTP.md)
* [前端框架](FELib.md)
* [后端相关](BELib.md)
* [辅助工具](helper.md)
* [参考资料](Resources.md)
```

&emsp;&emsp;修改book.json文件

<div>
<pre>{
  "title": "FE-booklet",
  "description": "小火柴的前端小册子",
  "author": "xiaohuochai",
  "language": "zh-hans",
  "links": {
    "sidebar": {
      "小火柴的博客": "https://cnblogs.com/xiaohuochai"
    }
  },
  "styles":{
    "website":"style.css"
  },
  "variables": {
    "cdn": "://static.xiaohuochai.site/"
  },
  "plugins": [
    "-lunr",
    "-search",
    "-livereload",
    "-sharing",
    "expandable-chapters",
    "search-plus",
    "splitter",
    "github",
    "tbfed-pagefooter","back-to-top-button",
  ],
  "pluginsConfig": {
    "github": {
      "url": "https://github.com/littlematch0123/FE-booklet"
    },
    "tbfed-pagefooter": {
      "copyright": "&amp;copy; xiaohuochai",
      "modify_label": "文件修订时间：",
      "modify_format": "YYYY-MM-DD HH:mm:ss"
    },
  }
}</pre>
</div>

&emsp;&emsp;最终效果如下

 <iframe src="https://www.xiaohuochai.site" width="600" height="700"></iframe>

