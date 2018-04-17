# HTML基础语法

&emsp;&emsp;HTML文档的后缀一般都是.html，但是在以前，.htm后缀也是不少的，它们都代表html文档，实际上也没有本质的区别。htm是在win32时代，系统只能识别3位扩展名时使用的。现在一般都使用.html

&nbsp;

### 概念

&emsp;&emsp;(Hyper Text Markup Language)超文本标记语言，是用来描述网页的一种语言

&emsp;&emsp;1. 超文本(Hyper Text):不只包括文本，也可以包括图片、链接、音乐、视频等非文本元素

&emsp;&emsp;2. 标记语言(Markup Language):标记语言是一套标记标签，HTML使用标记标签来描述网页

&nbsp;


### 标签

&emsp;&emsp;由尖括号包围的关键词，比如 &lt;html&gt;

&emsp;&emsp;HTML 标签分为单标签和双标签

&emsp;&emsp;1. 双标签：HTML标签通常是成对出现的，比如 &lt;b&gt; 和 &lt;/b&gt;。第一个标签是开始标签，第二个标签是结束标签；开始标签和结束标签也被称为开放标签和闭合标签

&emsp;&emsp;2. 常见的单标签有：&lt;img&gt;&lt;br&gt;&lt;hr&gt;&lt;input&gt;

&emsp;&emsp;注意：HTML标签对大小写不敏感，但要全小写

&nbsp;

### 属性

&emsp;&emsp;HTML标签可以拥有属性，属性提供了有关HTML元素的更多信息。

&emsp;&emsp;属性以名值对(名称/值)的形式出现，且总是在HTML元素的开始标签中规定。

<div>【常见属性】</div>

|属性名 | 属性作用   | 
| :----:  | :----:  |  
| class     |元素类名  | 
| id        |  元素ID   |   
| style        |  元素的行内样式   | 

&nbsp;

### 元素

&emsp;&emsp;从开始标签到结束标签的所有代码

&emsp;&emsp;HTML元素以开始标签起始，以结束标签终止，元素的内容是开始标签与结束标签之间的内容。

&nbsp;

### 文档

&emsp;&emsp;HTML文档被称为网页，由嵌套的HTML元素构成

&emsp;&emsp;注意：浏览器不会显示HTML标签，而是使用标签来解释页面的内容

&nbsp;

### 注释

&emsp;&emsp;注释是在HTML插入的描述性文本，用来解释该代码或提示其他信息。

	<!-- This is a comment -->

&emsp;&emsp;注意：注释只出现在代码中，不会在页面中显示；且注释不可嵌套

&nbsp;

### 实体

&emsp;&emsp;HTML中某些字符是预留的，需要被替换为字符实体

<table class="table">
<tbody>
<tr><th style="width: 20%;">显示结果</th><th style="width: 20%;">描述</th><th style="width: 30%;">实体名称</th><th style="width: 30%;">实体编号</th></tr>
<tr>
<td>&nbsp;</td>
<td>空格</td>
<td>&amp;nbsp;</td>
<td>&amp;#160;</td>
</tr>
<tr>
<td>&lt;</td>
<td>小于号</td>
<td>&amp;lt;</td>
<td>&amp;#60;</td>
</tr>
<tr>
<td>&gt;</td>
<td>大于号</td>
<td>&amp;gt;</td>
<td>&amp;#62;</td>
</tr>
<tr>
<td>&amp;</td>
<td>和号</td>
<td>&amp;amp;</td>
<td>&amp;#38;</td>
</tr>
<tr>
<td>"</td>
<td>引号</td>
<td>&amp;quot;</td>
<td>&amp;#34;</td>
</tr>
<tr>
<td>'</td>
<td>撇号&nbsp;</td>
<td>&amp;apos;&nbsp;</td>
<td>&amp;#39;</td>
</tr>
<tr>
<td>￠</td>
<td>分</td>
<td>&amp;cent;</td>
<td>&amp;#162;</td>
</tr>
<tr>
<td>&pound;</td>
<td>镑</td>
<td>&amp;pound;</td>
<td>&amp;#163;</td>
</tr>
<tr>
<td>&yen;</td>
<td>日圆</td>
<td>&amp;yen;</td>
<td>&amp;#165;</td>
</tr>
<tr>
<td>&euro;</td>
<td>欧元</td>
<td>&amp;euro;</td>
<td>&amp;#8364;</td>
</tr>
<tr>
<td>&sect;</td>
<td>小节</td>
<td>&amp;sect;</td>
<td>&amp;#167;</td>
</tr>
<tr>
<td>&copy;</td>
<td>版权</td>
<td>&amp;copy;</td>
<td>&amp;#169;</td>
</tr>
<tr>
<td>&reg;</td>
<td>注册商标</td>
<td>&amp;reg;</td>
<td>&amp;#174;</td>
</tr>
<tr>
<td>&trade;</td>
<td>商标</td>
<td>&amp;trade;</td>
<td>&amp;#8482;</td>
</tr>
<tr>
<td>&times;</td>
<td>乘号</td>
<td>&amp;times;</td>
<td>&amp;#215;</td>
</tr>
<tr>
<td>&divide;</td>
<td>除号</td>
<td>&amp;divide;</td>
<td>&amp;#247;</td>
</tr>
</tbody>
</table>