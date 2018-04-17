# HTML5结构元素

&emsp;&emsp;几年前，用于网页布局一般都用div元素，但语义化并不好。HTML5引入了大量新的块级元素来帮助提升网页的语义，使页面具有逻辑性结构、容易维护，并且对数据挖掘服务更友好。本文将详细介绍HTML5结构元素

&nbsp;

### 概述

&emsp;&emsp;结构元素，又称为区块型元素，是用来定义区块内容范围的元素。之前，区块型元素只有&lt;div&gt;一个，HTML5新增了7个语义化结构元素，包括&lt;article&gt;、&lt;aside&gt;、&lt;nav&gt;、&lt;section&gt;、&lt;header&gt;、&lt;footer&gt;、&lt;main&gt;

&nbsp;

### section

&emsp;&emsp;Section元素(&lt;section&gt;)表示文档中的一个区域(或节)，是区块级通用元素。比如，内容中的一个专题组，一般来说会有包含一个标题(heading)。一般通过是否包含一个标题(&lt;h1&gt;-&lt;h6&gt; element)作为子节点，来辨识每一个&lt;section&gt;

&emsp;&emsp;注意：如果元素内容可以分为几个部分的话，应该使用&lt;article&gt;而不是&lt;section&gt;；再有，不要把&lt;section&gt;元素作为一个普通的容器来使用，这是本应该是&lt;div&gt;的用法。 一般来说，一个&lt;section&gt;应该出现在文档大纲中

&nbsp;

### article

&emsp;&emsp;&lt;article&gt;元素表示文档、页面、应用或网站中的独立结构，其意在成为可独立分配的或可复用的结构。可能是论坛帖子、杂志或新闻文章、博客、用户提交的评论、交互式组件，或者其他独立的内容项目。当&lt;article&gt;元素嵌套使用时，则该元素代表与外层元素有关的文章。例如，代表博客评论的&lt;article&gt;元素可嵌套在代表博客文章的&lt;article&gt;元素中

&emsp;&emsp;&lt;article&gt;元素的作者信息可通过&lt;address&gt;元素提供，但是不适用于嵌套的&lt;article&gt;元素；&lt;article&gt;元素的发布日期和时间可通过&lt;time&gt;元素的pubdate属性表示

&emsp;&emsp;注意：对于&lt;article&gt;和&lt;section&gt;来说，是必须要加上标题的

&nbsp;

### aside

&emsp;&emsp;&lt;aside&gt;元素表示一个和其余页面内容几乎无关的部分，被认为是独立于该内容的一部分并且可以被单独的拆分出来而不会使整体受影响。一般用于表示不直接相关内容的侧边栏，&lt;aside&gt;里面的内容与它所关联的内容相互独立，谁缺了谁都不影响各自文本含义的理解。如一篇文章的广告、相关背景和引述内容等

&nbsp;

### nav

&emsp;&emsp;HTML导航栏(&lt;nav&gt;)描绘一个含有多个超链接的区域，这个区域包含转到其他页面，或者页面内部其他部分的链接列表

&emsp;&emsp;并不是所有的链接都必须使用&lt;nav&gt;元素，它只用来将一些热门的链接放入导航栏，例如&lt;footer&gt;元素就常用来在页面底部包含一个不常用到，没必要加入&lt;nav&gt;的链接列表

&emsp;&emsp;一个网页也可能含有多个&lt;nav&gt;元素，例如一个是网站内的导航列表，另一个是本页面内的导航列表

&nbsp;

### header

&emsp;&emsp;&lt;header&gt;元素表示页面头部或区块头部，用于将介绍内容和区块的辅助导航分组到一起，所以它有可能包含区块的标题元素以及其他的介绍内容(目录、logo等)

&emsp;&emsp;&nbsp;注意：由于&lt;header&gt;和&lt;footer&gt;元素不是分节内容，所以不会引入新的分节到大纲中

&nbsp;

### footer

&emsp;&emsp;&lt;footer&gt;元素表示最近一个章节内容或者根节点(sectioning root)元素的页脚。一个页脚通常包含该章节作者、版权数据或者与文档相关的链接等信息

&emsp;&emsp;注意：&lt;footer&gt;元素内的作者信息应包含在&lt;address&gt;元素中

&nbsp;

### main

&emsp;&emsp;&lt;main&gt;元素放在最后说，是因为&lt;main&gt;不常用，最主要的原因是IE浏览器都不支持

&emsp;&emsp;main元素(&lt;main&gt;)呈现了文档&lt;body&gt;或应用的主体部分。主体部分由与文档直接相关，或者扩展于文档的中心主题、应用的主要功能部分的内容组成。这部分内容在文档中应当是独一无二的，不包含任何在一系列文档中重复的内容

&emsp;&emsp;&lt;main&gt;标签不能是以下元素的继承，包括&lt;article&gt;、&lt;aside&gt;、&lt;footer&gt;、&lt;header&gt;、或&lt;nav&gt;。 在一个文档中不能出现一个以上的 &lt;main&gt;标签

&emsp;&emsp;所以，一个正常的最外层布局应该是下面这样

<div>
<pre>&lt;header&gt;&lt;/header&gt;
&lt;main&gt;
  &lt;section&gt;&lt;/section&gt;
  &lt;section&gt;&lt;/section&gt;
  &lt;section&gt;&lt;/section&gt;
&lt;/main&gt;
&lt;footer&gt;&lt;/footer&gt;</pre>
</div>

&emsp;&emsp;但现在，一般地，布局如下&nbsp;

<div>
<pre>&lt;header&gt;&lt;/header&gt;
&lt;section&gt;&lt;/section&gt;
&lt;section&gt;&lt;/section&gt;
&lt;section&gt;&lt;/section&gt;
&lt;footer&gt;&lt;/footer&gt;</pre>
</div>

&nbsp;

### 案例说明

&emsp;&emsp;想找一个规范使用html5新标签的网站不是很容易，国内大多数网站由于各种各样的原因，依然还是div布局，最终，案例选择使用苹果官网

![apple](https://pic.xiaohuochai.site/blog/HTML_structure_eleStruc.jpg)

<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;title&gt;苹果首页&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;nav&gt;
  &lt;ul&gt;
    &lt;li&gt;&lt;a href="#"&gt;Apple&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;Mac&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;iPad&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;iPhone&lt;/a&gt;&lt;/li&gt; 
    &lt;li&gt;&lt;a href="#"&gt;Watch&lt;/a&gt;&lt;/li&gt; 
    &lt;li&gt;&lt;a href="#"&gt;Music&lt;/a&gt;&lt;/li&gt; 
    &lt;li&gt;&lt;a href="#"&gt;技术支持&lt;/a&gt;&lt;/li&gt; 
    &lt;li&gt;&lt;a href="#"&gt;搜索&lt;/a&gt;&lt;/li&gt; 
    &lt;li&gt;&lt;a href="#"&gt;购物袋&lt;/a&gt;&lt;/li&gt;           
  &lt;/ul&gt;
&lt;/nav&gt;
&lt;article&gt;
  &lt;section&gt;展示1&lt;/section&gt;
  &lt;section&gt;展示2&lt;/section&gt;
  &lt;section&gt;展示3&lt;/section&gt;
  &lt;section&gt;展示4&lt;/section&gt;
  &lt;nav&gt;
    &lt;ul&gt;
      &lt;li&gt;按钮1&lt;/li&gt;
      &lt;li&gt;按钮2&lt;/li&gt;
      &lt;li&gt;按钮3&lt;/li&gt;
      &lt;li&gt;按钮4&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/nav&gt;
&lt;/article&gt;
&lt;aside&gt;
  &lt;ul&gt;
    &lt;li&gt;&lt;a href="#"&gt;Watch&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;Pencil&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;iPad&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;MacBook&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/aside&gt;
&lt;footer&gt;
  &lt;nav&gt;
    &lt;div&gt;选购及了解&lt;/div&gt;
    &lt;div&gt;商店&lt;/div&gt;
    &lt;div&gt;应用&lt;/div&gt;
    &lt;div&gt;账户&lt;/div&gt;
    &lt;div&gt;关于&lt;/div&gt;
  &lt;/nav&gt;
  &lt;section&gt;
    &lt;div&gt;其他杂项&lt;/div&gt;
  &lt;/section&gt;
&lt;/footer&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>
