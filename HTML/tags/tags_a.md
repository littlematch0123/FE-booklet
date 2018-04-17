# 了解HTML锚点

### 概念

&emsp;&emsp;&lt;a&gt;元素&nbsp;(或HTML锚元素, Anchor Element)通常用来表示一个锚点/链接。但严格来说，&lt;a&gt;元素不是一个链接，而是超文本锚点，可以链接到一个新文件、用id属性指向任何元素。如果没有&lt;a&gt;元素没有href属性的话，可以作为原本链接位置的占位符，常用于home链接

&emsp;&emsp;注意：任何文档流内容都可以被嵌套，只要不是交互内容类别(如按钮、链接等)

&nbsp;

## 属性

### href

&emsp;&emsp;href属性表示地址，共包括以下3种：

&emsp;&emsp;1、链接地址

<div>
<pre>&lt;a href="http://www.baidu.com"&gt;百度&lt;/a&gt;</pre>
</div>

![链接地址](https://pic.xiaohuochai.site/blog/HTML_tags_a_linkHref.gif)

&emsp;&emsp;2、下载地址

<div>
<pre>&lt;a href="test.zip"&gt;下载测试&lt;/a&gt;</pre>
</div>

![下载地址](https://pic.xiaohuochai.site/blog/HTML_tags_a_downloadHref.gif)

&emsp;&emsp;3、锚点

&emsp;&emsp;（1）href:#id名

<div>
<pre>&lt;a href="#test"&gt;目录&lt;/a&gt;
&lt;br&gt;&lt;br&gt;&lt;br&gt;&lt;br&gt;&lt;br&gt;&lt;br&gt;&lt;br&gt;&lt;br&gt;&lt;br&gt;&lt;br&gt;&lt;br&gt;&lt;br&gt;&lt;br&gt;&lt;br&gt;&lt;br&gt;&lt;br&gt;&lt;br&gt;&lt;br&gt;&lt;br&gt;
&lt;div id="test" style="height: 200px;width: 200px; border: 1px solid black;margin-bottom: 300px;"&gt;内容&lt;/div&gt;</pre>
</div>

![锚点](https://pic.xiaohuochai.site/blog/HTML_tags_a_anchor.gif)

&emsp;&emsp;（2）href:页面地址#id名

<div>
<pre>&lt;a href="http://baike.baidu.com/view/2202.htm#2"&gt;足球比赛规则&lt;/a&gt;</pre>
</div>

![页面地址](https://pic.xiaohuochai.site/blog/HTML_tags_a_Pageanchor.gif)

　　
**href与src的区别**

&emsp;&emsp;href(hypertext reference)指超文本引用，表示当前页面引用了别处的内容

&emsp;&emsp;src(source)表示来源地址，表示把别处的内容引入到当前页面

&emsp;&emsp;所以&lt;img&gt;、&lt;script&gt;、&lt;iframe&gt;等应该使用src，而&lt;a&gt;和&lt;map&gt;应该使用href

&emsp;&emsp;注意：href属性一定不要留空，若暂时不需要写地址，则写`#`或`javascript:;`。若href留空，会刷新页面

![null](https://pic.xiaohuochai.site/blog/HTML_tags_a_null.gif)

&emsp;&emsp;4、手机号码

&emsp;&emsp;在移动端，使用&lt;a href="tel:15012345678&gt;15012345678&lt;/a&gt;可以唤出手机拨号盘

&nbsp;

### target

&emsp;&emsp;target属性表示链接打开方式

&emsp;&emsp;1、_self&emsp;&emsp;当前窗口（默认）

&emsp;&emsp;2、_blank&emsp;&emsp;新窗口

&emsp;&emsp;3、_parent&emsp;&emsp;父框架集

&emsp;&emsp;4、_top&emsp;&emsp;整个窗口

&emsp;&emsp;5、_framename&emsp;&emsp;指定框架

```
//外层框架
<frameset cols = "20%, *">
    <frame src="left.html">
    <frame src="right.html">
</frameset>
//里层框架
<frameset rows = "50%,*">
    <frame src="top.html">
    <frame src="bottom.html" name="bottom">        
</frameset>
//锚点页
<ul class="list">
    <li class="in"><a href="chap1.html" target="_self">chap1(_self)</a></li>
    <li class="in"><a href="chap2.html" target="_blank">chap2(_blank)</a></li>
    <li class="in"><a href="chap3.html" target="_parent">chap3(_parent)</a></li>
    <li class="in"><a href="chap4.html" target="_top">chap4(_top)</a></li>    
    <li class="in"><a href="chap5.html" target="bottom">chap5(framename)</a></li>
</ul>
```

![frame](https://pic.xiaohuochai.site/blog/HTML_tags_a_frame.gif)

### download

&emsp;&emsp;download属性用来设置下载文件的名称(firefox/chrome/opera支持)

<div>
<pre>&lt;a href="test.zip" download="gogo"&gt;test&lt;/a&gt;</pre>
</div>

![download](https://pic.xiaohuochai.site/blog/HTML_tags_a_download.gif)

### rel

&emsp;&emsp;rel属性表示表示链接间的关系

<div>
<pre>alternate   相较于当前文档可替换的呈现
author      链接到当前文档或文章的作者
bookmark    链接最近的父级区块的永久链接
help        与当前上下文相关的帮助链接
license     当前文档的许可证
next        后一篇文档
prev        前一篇文档
nofollow    当前文档的原始作者不推荐超链接指向的文档
noreferer   访问时链接时不发送referer字段
prefetch    预加载链接指向的页面(对于chrome使用prerender)
search      用于搜索当前文档或相关文档的资源
tag         给当前文档打上标签</pre>
</div>

&emsp;&emsp;【应用】当一篇篇幅很长的文章需要多页显示时，配合next或prev可以实现前后页面导航的预加载

<div>
<pre>&lt;a href="prev.html" rel="prev prefetch prerender"&gt;前一页&lt;/a&gt;
&lt;a href="next.html" rel="next prefetch prerender"&gt;后一页&lt;/a&gt;
    //当然prefetch也可以用于预加载其他类型的资源
&lt;link rel="prefetch prerender" href="test.img"&gt;</pre>
</div>

&nbsp;

### 注意事项

&emsp;&emsp;1、&lt;a&gt;标签的文本颜色只能自身进行设置，从父级继承不到

&emsp;&emsp;2、&lt;a&gt;标签的下划线颜色跟随文本颜色进行变化

&emsp;&emsp;3、&lt;a&gt;标签不可嵌套&lt;a&gt;标签

<div>
<pre>&lt;div style="color: red;"&gt;
    &lt;a href="#"&gt;[1]从父级继承不到红色字体&lt;/a&gt;
    &lt;br&gt;
    &lt;a href="#" style="color: green"&gt;[2]下划线颜色与文本同色&lt;/a&gt;
    &lt;br&gt;
    &lt;a href="#"&gt;前面&lt;a href="#"&gt;[3]a标签不可嵌套&lt;/a&gt;&lt;/a&gt;
&lt;/div&gt;</pre>
</div>
