# CSS规范

&emsp;&emsp;CSS是网页样式的描述语言，CSS规范能够使CSS代码风格保持一致，使得CSS更容易理解和维护。本文将详细介绍CSS规范

&nbsp;

### 代码风格

【选择器】

&emsp;&emsp;1、`选择器`&nbsp;与&nbsp;`{`&nbsp;之间包含空格

<div>
<pre>.selector {}</pre>
</div>

&emsp;&emsp;2、`&gt;`、`+`、`~`&nbsp;选择器的两边各保留一个空格

<div>
<pre>/* good */
main &gt; nav{}
/* bad */
main&gt;nav {}</pre>
</div>

【属性风格】

&emsp;&emsp;1、`属性名`&nbsp;与之后的&nbsp;`:`&nbsp;之间不包含空格，&nbsp;`:`&nbsp;与&nbsp;`属性值`&nbsp;之间包含空格

<div>
<pre>margin: 0;</pre>
</div>

&emsp;&emsp;2、对于以逗号分隔的属性值，每个逗号后面都应该插入一个空格

<div>
<pre>font-family: Arial, sans-serif;</pre>
</div>

&emsp;&emsp;3、对于**只包含一条声明**的样式，为了易读性和便于快速编辑，建议将语句放在同一行。对于带有多条声明的样式，应当将声明分为多行

<div>
<pre>.selector {
    margin: 0;
    padding: 0;
}
.selector { margin: 0;}</pre>
</div>

&emsp;&emsp;4、最后一个属性值也以分号结尾，这样可以减少修改、添加和维护代码时不必要的失误和麻烦

<div>
<pre>/* good */
.selector {
    margin: 0;
    padding: 0;
}
/* bad */
.selector {
    margin: 0;
    padding: 0
}</pre>
</div>

【引号】

&emsp;&emsp;1、文本内容用双引号包围

<div>
<pre>html[lang|="zh"] q:before {
    font-family: "Microsoft YaHei", sans-serif;
    content: "&ldquo;";
}</pre>
</div>

&emsp;&emsp;2、`url()`&nbsp;函数中的路径不加引号

<div>
<pre>body {background: url(bg.png);}</pre>
</div>

【省略】

&emsp;&emsp;1、对于属性值或颜色参数，省略小于 1 的小数前面的 0&nbsp;

<div>
<pre>panel {opacity: .8}</pre>
</div>

&emsp;&emsp;2、省略值为0时的单位，为节省不必要的字节同时也使阅读方便，将0px、0em、0%等值缩写为0

<div>
<pre>.m-box{margin:0 10px;background-position:50% 0;}</pre>
</div>

【缩写】

&emsp;&emsp;1、尽量使用简写形式的十六进制值，例如，用&nbsp;`#fff`&nbsp;代替&nbsp;`#ffffff`

&emsp;&emsp;2、十六进制值应该全部小写，例如，`#fff`。在扫描文档时，小写字符易于分辨，因为他们的形式更易于区分

&emsp;&emsp;3、在可以使用缩写的情况下，尽量使用属性缩写，它最大的好处就是节省了字节，便于维护，并使阅读更加一目了然

<div>
<pre>/* good */
.post {
    font: 12px/1.5 arial, sans-serif;
}
/* bad */
.post {
    font-family: arial, sans-serif;
    font-size: 12px;
    line-height: 1.5;
}</pre>
</div>

【媒体查询】

&emsp;&emsp;将媒体查询@media放在尽可能相关规则的附近。不要将它们打包放在一个单一样式文件中或者放在文档底部。如果把它们分开了，将来更容易被遗忘

<div>
<pre>.element { ... }
.element-avatar { ... }
.element-selected { ... }

@media (min-width: 480px) {
  .element { ...}
  .element-avatar { ... }
  .element-selected { ... }
}</pre>
</div>

&nbsp;

### 注释

【单行注释】

&emsp;&emsp;星号与内容之间保留一个空格，以确保即使在编码错误的情况下也可以正确解析样式

<div>
<pre>/* 单行注释 */</pre>
</div>

【块状注释】

&emsp;&emsp;在必要的情况下，可以使用块状注释，块状注释保持统一的缩进对齐。星号要一列对齐，星号与内容之间保留一个空格

<div>
<pre>/**
 * 多行注释1
 * 多行注释2
 */</pre>
</div>

【文件注释】

&emsp;&emsp;文件顶部必须包含文件注释，星号要一列对齐，星号与内容之间保留一个空格，标识符冒号与内容之间保留一个空格

&emsp;&emsp;用 @name 标识文件说明，@author标识作者，@description为文件或模块描述，@update为可选项，建议每次改动都更新一下

<div>
<pre>/**
 * @name: 文件名或模块名
 * @description: 文件或模块描述
 * @author: author-name(mail-name@qq.com)
 *          author-name2(mail-name2@qq.com)
 * @update: 2017-07-14 00:00
 */</pre>
</div>

&nbsp;

### 声明顺序

&emsp;&emsp;1、私有在前，标准在后，即先写带有浏览器私有标志的，后写W3C标准的

<div>
<pre>.m-box {
    -webkit-box-shadow: 0 0 0 #000;
    -moz-box-shadow: 0 0 0 #000;
    box-shadow: 0 0 0 #000;
}</pre>
</div>

&emsp;&emsp;2、相关的属性声明应当归为一组，并按照（布局类属性-&gt;盒模型属性-&gt;文本类属性-&gt;修饰类属性）顺序排列

&emsp;&emsp;布局属性处在第一位，是因为它可以使一个元素脱离正常文本流，并且覆盖盒模型相关的样式。盒模型紧跟其后，因为它决定了一个组件的大小和位置。其他属性只在组件内部起作用或者不会对前面两种情况的结果产生影响，所以它们排在后面

<div>
<pre>布局类属性     position / top / right / bottom / left / float / display / overflow 等
盒模型属性   border / margin / padding / width / height 等
文本类属性     font / line-height / text-align / word-wrap 等
修饰类属性     background / color / transition / list-style 等</pre>
</div>

&emsp;&emsp;另外，如果包含&nbsp;`content`&nbsp;属性，应放在最前面

<div>
<pre>.sidebar {
    /* formatting model */
    position: absolute;
    top: 50px;
    left: 0;
    overflow-x: hidden;
    /* box model */
    width: 200px;
    padding: 5px;
    border: 1px solid #ddd;
    /* typographic */
    font-size: 14px;
    line-height: 20px;
    /* visual */
    background: #f5f5f5;
    color: #333;
    -webkit-transition: color 1s;
       -moz-transition: color 1s;
            transition: color 1s;
}</pre>
</div>

&nbsp;

### 避免使用

&emsp;&emsp;1、尽量不使用&nbsp;`!important`&nbsp;声明。&nbsp;当需要强制指定样式且不允许任何场景覆盖时，通过标签内联和&nbsp;`!important`&nbsp;定义样式

&emsp;&emsp;2、避免耗性能的属性，如express和filter。不过有时候需求大于一切

<div>
<pre>/* expression */
.class {width: expression(this.width&gt;100?'100px':'auto');}
/* filter */
.class {filter: alpha(opacity=50);}</pre>
</div>

&emsp;&emsp;3、避免使用&nbsp;`@import，`与&nbsp;`&lt;link&gt;`&nbsp;标签相比，`@import`&nbsp;指令要慢很多，不光增加了额外的请求次数，还会导致不可预料的问题

&emsp;&emsp;4、避免sass中不必要的嵌套,这是因为虽然可以使用嵌套，但是并不意味着应该使用嵌套。只有在必须将样式限制在父元素内（也就是后代选择器），并且存在多个需要嵌套的元素时才使用嵌套

&emsp;&emsp;5、尽量避免使用hack，由于浏览器自身缺陷，无法避开的时候，可以允许使用适当的Hack。统一使用&ldquo;*&rdquo;和&ldquo;_&rdquo;分别对IE7和6进行Hack

<div>
<pre>/* IE7会显示灰色#888，IE6会显示白色#fff，其他浏览器显示黑色#000 */
.m-list{
    color:#000;
    *color:#888;
    _color:#fff;
}</pre>
</div>
