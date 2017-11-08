# 深入理解display属性

 　　display属性在网页布局中非常常见，但经常用到的仅仅是block、inline-block、inline和none等寥寥几个属性值，本文将详细介绍display属性的各个方面

&nbsp;

## 定义

　　display属性用于规定元素生成的框类型，影响显示方式

　　值: none | inline | block | inline-block | list-item | run-in | table | inline-table | table-row-group | table-header-group | table-footer-group | table-row | table-colume-group | table-column | table-cell | table-caption | inherit

　　初始值: inline

　　应用于: 所有元素

　　继承性: 无

　　[注意]IE7-浏览器不支持table类属性值及inherit

&nbsp;

## 分类

### block

**【特征】**

　　[1]不设置宽度时，宽度为父元素宽度

　　[2]独占一行

　　[3]支持宽高

**【标签】**

<div class="cnblogs_code">
<pre>&lt;address&gt;&lt;article&gt;&lt;aside&gt;&lt;blockquote&gt;&lt;body&gt;&lt;dd&gt;&lt;details&gt;&lt;div&gt;&lt;dl&gt;&lt;dt&gt;&lt;fieldset&gt;&lt;figcaption&gt;&lt;figure&gt;&lt;footer&gt;&lt;form&gt;&lt;h1&gt;&lt;header&gt;&lt;hgroup&gt;&lt;hr&gt;&lt;html&gt;&lt;legend&gt;&lt;menuitem&gt;&lt;nav&gt;&lt;ol&gt;&lt;optgroup&gt;&lt;option&gt;&lt;p&gt;&lt;section&gt;&lt;summary&gt;&lt;ul&gt;</pre>
</div>

　　[注意]menuitem标签只有firefox支持

**【不支持的样式】**

　　[1]vertical-align

&nbsp;

### inline

**【特征】**

　　[1]内容撑开宽度

　　[2]非独占一行

　　[3]不支持宽高

　　[4]代码换行被解析成空格

**【标签】**

<div class="cnblogs_code">
<pre>&lt;a&gt;&lt;abbr&gt;&lt;area&gt;&lt;b&gt;&lt;bdi&gt;&lt;bdo&gt;&lt;br&gt;&lt;cite&gt;&lt;code&gt;&lt;del&gt;&lt;dfn&gt;&lt;em&gt;&lt;i&gt;&lt;ins&gt;&lt;kbd&gt;&lt;label&gt;&lt;map&gt;&lt;mark&gt;&lt;output&gt;&lt;pre&gt;&lt;q&gt;&lt;rp&gt;&lt;rt&gt;&lt;ruby&gt;&lt;s&gt;&lt;smap&gt;&lt;small&gt;&lt;span&gt;&lt;strong&gt;&lt;sub&gt;&lt;sup&gt;&lt;time&gt;&lt;u&gt;&lt;var&gt;&lt;wbr&gt;</pre>
</div>

**【不支持的样式】**

　　[1]background-position

　　[2]clear

　　[3]clip

　　[4]height | max-height | min-height

　　[5]width | max-width | min-width

　　[6]overflow

　　[7]text-align

　　[8]text-indent

　　[9]text-overflow

&nbsp;

### inline-block

**【特征】**

　　[1]不设置宽度时，内容撑开宽度

　　[2]非独占一行

　　[3]支持宽高

　　[4]代码换行被解析成空格

**【标签】**

<div class="cnblogs_code">
<pre>&lt;audio&gt;&lt;button&gt;&lt;canvas&gt;&lt;embed&gt;&lt;iframe&gt;&lt;img&gt;&lt;input&gt;&lt;keygen&gt;&lt;meter&gt;&lt;object&gt;&lt;progress&gt;&lt;select&gt;&lt;textarea&gt;&lt;video&gt;</pre>
</div>

**【不支持的样式】**

　　[1]clear

&nbsp;【IE兼容】

　　IE7-浏览器不支持给块级元素设置inline-block样式，解决方法如下：首先将其变成行内元素，使用具有行内元素的特性，然后触发haslayout，使其具有块级元素的特性，如此就可以模拟出inline-block的效果

<div class="cnblogs_code">
<pre>div{
    display:inline-block;
    *display: inline;
    zoom: 1;</pre>
</div>

　　[注意][关于inline-block元素底部空隙的问题移步到此](http://www.cnblogs.com/xiaohuochai/p/5271217.html#anchor2)

&nbsp;

### none

**【特征】**

　　隐藏元素并脱离文档流

**【标签】**

<div class="cnblogs_code">
<pre>&lt;base&gt;&lt;link&gt;&lt;meta&gt;&lt;title&gt;&lt;datalist&gt;&lt;dialog&gt;&lt;param&gt;&lt;script&gt;&lt;source&gt;&lt;style&gt;</pre>
</div>

&nbsp;

### list-item

**【特征】**

　　[1]不设置宽度时，宽度撑满一行

　　[2]独占一行

　　[3]支持宽高

&nbsp;

### run-in

　　run-in是一个有意思的块/行内元素混合，可以使某些块级元素成为下一个元素的行内部分。如果一个元素生成run-in框，而且该框后面是一个块级框，那么该run-in元素将成为块级框开始处的一个行内框，run-in框格式化成另一个元素中的行内框，但它们仍从文档中的父元素继承属性

　　[注意]只有safari和IE8+支持

<div class="cnblogs_code">
<pre>&lt;h3 style="display:run-in"&gt;run-in test&lt;/h3&gt;
&lt;p&gt;paragraph&lt;/p&gt;</pre>
</div>

![runIn](https://pic.xiaohuochai.site/blog/CSS_layout_runIn.jpg)

　　若run-in框后面不是块级框时，run-in框本身将成为块级框

<div class="cnblogs_code">
<pre>&lt;span style="display:run-in"&gt;run-in test&lt;/span&gt;
&lt;span&gt;paragraph&lt;/span&gt;</pre>
</div>

![runIn2](https://pic.xiaohuochai.site/blog/CSS_layout_runIn2.jpg)

<div>&nbsp;</div>

## 表格类元素

<div class="cnblogs_code">
<pre>table{display: table;}
thead{display: table-header-group;}
tbody{display: table-row-group;}
tfoot{display: table-footer-group;}
tr{display: table-row;}
td,th{display: table-cell;}
col{display: table-column;}
colgroup{display: table-column-group;}
caption{display: table-caption;}</pre>
</div>

　　表格类元素的display共有以上几种，&lt;thead&gt;&lt;tbody&gt;&lt;tfoot&gt;&lt;tr&gt;&lt;col&gt;&lt;colgroup&gt;因为无法设置margin和padding用的较少，下面将着重介绍下&lt;table&gt;、&lt;td&gt;、&lt;th&gt;、&lt;caption&gt;这四个标签对应的display属性

&nbsp;

### table

**【特征】**

　　[1]不设置宽度时，宽度由内容撑开

　　[2]独占一行

　　[3]支持宽高

　　[4]默认具有表格特征，可设置table-layout、border-collapse、border-spacing等表格专有属性

　　[注意]对于display为table和inline-table，若处于分隔边框模型即border-collapse:separate;，margin和padding都可设置；若处于合并边框模型即border-collapse:collapse，只可设置margin

&nbsp;

### inline-table

**【特征】**

　　[1]不设置宽度时，宽度由内容撑开

　　[2]非独占一行

　　[3]支持宽高

　　[4]默认具有表格特征，可设置table-layout、border-collapse、border-spacing等表格专有属性

&nbsp;

### table-cell

**【特征】**

　　[1]不设置宽度时，宽度由内容撑开

　　[2]非独占一行

　　[3]支持宽高

　　[4]垂直对齐

　　[5]同级等高

　　[注意]display:table-cell的元素不可以设置margin，但可以设置padding

&nbsp;

### table-caption

**【特征】**

　　[1]不设置宽度时，宽度由内容撑开

　　[2]独占一行

　　[3]支持宽高

　　[注意]display:table-caption的元素margin和padding都可设置&nbsp;

&nbsp;

## 注意事项

【1】如果一个元素是绝对定位元素，float的值设置为none，对于浮动元素或绝对定位元素，计算值由声明值确定

![considerations](https://pic.xiaohuochai.site/blog/CSS_layout_considerations.jpg)

【2】对于根元素，如果声明为值inline-table或table，都会得到计算值table，声明为none时则会得到同样的计算值none，所有其他display值都计算为block

