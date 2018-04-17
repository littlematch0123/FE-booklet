# HTML标签内容模型

&emsp;&emsp;HTML核心的部分莫过于标签(tag)了。标签是用来描述文档中的各自内容基本单元，不同标签表示着不同的含义，标签之间的嵌套表示了内容之间的结构。

&emsp;&emsp;HTML标签在HTML5中内容模型拓展到了7类，包括元数据型、区块型、标题型、文档流型、语句型、内嵌型、交互型。但即使是这7个类别也没有完全覆盖所有元素的所有情况，元素可以不属于任何一个类别，被称为穿透的；很多元素可能属于不止一个类别，称为混合的

&emsp;&emsp;[HTML标签详细信息见此w3c链接](http://dev.w3.org/html5/spec-author-view/index.html#element-content-categories)

![](https://pic.xiaohuochai.site/blog/HTML_structure_contModel.png)

## 分类

### 元数据型(metadata)

&emsp;&emsp;设置展示、行为、关联文档或其他内容的元数据的元素

&emsp;&emsp;&lt;head&gt;元素包含文档的元素数据，包括&lt;base&gt;、&lt;command&gt;、&lt;link&gt;、&lt;meta&gt;、&lt;noscript&gt;、&lt;script&gt;、&lt;style&gt;和&lt;title&gt;共8个

&emsp;&emsp;[详细信息移步到此](http://www.cnblogs.com/xiaohuochai/p/6214015.html)

&nbsp;

### 区块型(sectioning)

&emsp;&emsp;定义区块内容范围的元素，包括&lt;article&gt;、&lt;aside&gt;、&lt;nav&gt;、&lt;section&gt;四个元素

&emsp;&emsp;[详细信息移步到此](http://www.cnblogs.com/xiaohuochai/p/5087815.html)

&nbsp;

### 标题型(heading)

&emsp;&emsp;定义区块内容标题的元素，包括&lt;h1&gt;到&lt;h6&gt;以及&lt;hgroup&gt;

&emsp;&emsp;[详细信息移步到此](http://www.cnblogs.com/xiaohuochai/p/6216633.html#anchor1)

&nbsp;

### 文档流型(flow)

&emsp;&emsp;大部分文档&lt;body&gt;内的元素，只有部分元数据式元素不属于流式，它们是&lt;base&gt;和&lt;title&gt;

&emsp;&emsp;[详细信息移步至此](http://www.cnblogs.com/xiaohuochai/p/6216633.html)

&nbsp;

### 语句型(phrasing)

&emsp;&emsp;文档里的文字、在段落中标记文字的元素等

&emsp;&emsp;[详细信息移步至此](http://www.cnblogs.com/xiaohuochai/p/5088983.html)

&nbsp;

### 内嵌型(embedded)

&emsp;&emsp;由于HTML本身提供的元素的表达能力有限，允许嵌入内容成为浏览器开发者不得不做的事情，在文档引入另一个资源的元素或者插入文档的另一种语言。嵌入式内容包括&lt;audio&gt;、&lt;canvas&gt;、&lt;embed&gt;、&lt;iframe&gt;、&lt;img&gt;、&lt;math&gt;、&lt;object&gt;、&lt;svg&gt;和&lt;video&gt;九类

&emsp;&emsp;注意：该类元素中，&lt;embed&gt;、&lt;iframe&gt;、&lt;object&gt;这三个元素不设置宽高时，默认宽高为300px*150px

&emsp;&emsp;&lt;img&gt;(&lt;img&gt; -&gt; image 图像)

&emsp;&emsp;[关于图像标签的详细信息移步至此](http://www.cnblogs.com/xiaohuochai/p/5008341.html#anchor1)

&emsp;&emsp;&lt;iframe&gt;

&emsp;&emsp;[关于框架标签的详细信息移步至此](http://www.cnblogs.com/xiaohuochai/p/5047343.html#anchor3)

&emsp;&emsp;&lt;canvas&gt;

&emsp;&emsp;[关于&lt;canvas&gt;的详细信息移步至此](http://www.cnblogs.com/xiaohuochai/p/5058770.html)

&emsp;&emsp;音频和视频

&emsp;&emsp;[关于音频和视频类标签的详细信息移步至此](http://www.cnblogs.com/xiaohuochai/p/5091488.html)

&nbsp;

### 交互型(interactive)

&emsp;&emsp;专门用于用户交互的元素，包括&lt;a&gt;、&lt;audio&gt;、&lt;button&gt;、&lt;details&gt;、&lt;embed&gt;、&lt;iframe&gt;、&lt;img&gt;、&lt;input&gt;、&lt;keygen&gt;、&lt;label&gt;、&lt;menu&gt;、&lt;object&gt;、&lt;select&gt;、&lt;textarea&gt;、&lt;video&gt;

&emsp;&emsp;其中，&lt;details&gt;、&lt;summary&gt;、&lt;command&gt;、&lt;menu&gt;这四个交互元素浏览器的支持性还不太好

&emsp;&emsp;[关于&lt;details&gt;和&lt;summary&gt;的详细信息移步至此](http://www.cnblogs.com/xiaohuochai/p/5090109.html)

