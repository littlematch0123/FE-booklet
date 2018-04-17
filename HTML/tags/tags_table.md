# 深入理解HTML表格

&emsp;&emsp;在CSS出现之前，table元素常常用来布局。这种做法在HTML4之后不再推荐使用。而现在有些矫枉过正，使用table展示数据都可能会被说不规范。本文将详细介绍HTML表格table

&nbsp;

### table

【默认样式】

<div>
<pre>//IE7-浏览器不支持border-spacing
table{
　　border-collapse: separate;
　　border-spacing: 2px;
　　border: 1px solid gray;
}</pre>
</div>

【属性】

&emsp;&emsp;1、border(在html5中，border只能为"1"或" ")(html5已废弃)

<div>
<pre>border="0"//没有边框
border="8"//8像素宽的边框</pre>
</div>

&emsp;&emsp;2、cellpadding(px/%)(html5已废弃)

&emsp;&emsp;&emsp;规定单元边界与单元内容之间的间距

&emsp;&emsp;3、cellspacing(px/%)(html5已废弃)

&emsp;&emsp;&emsp;规定单元格之间的间距

&emsp;&emsp;4、summary(html5已废弃)

&emsp;&emsp;&emsp;表格内容的摘要

&emsp;&emsp;5、width(html5已废弃)

&emsp;&emsp;&emsp;表格宽度

<div>
<pre>&lt;table border="2" cellpadding="5" cellspacing="3" summary="测试表格" width="300"&gt;
    &lt;tr&gt;
        &lt;td&gt;row 1, cell 1&lt;/td&gt;
        &lt;td&gt;row 1, cell 2&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
        &lt;td&gt;row 2, cell 1&lt;/td&gt;
        &lt;td&gt;row 2, cell 2&lt;/td&gt;
    &lt;/tr&gt;
&lt;/table&gt;    </pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/html/table/t1.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;6、frame(IE7-浏览器不能正常显示)(html5已废弃)

<table class="table">
<tbody>
<tr><th>值</th><th>描述</th></tr>
<tr>
<td>void</td>
<td>不显示外侧边框。</td>
</tr>
<tr>
<td>above</td>
<td>显示上部的外侧边框。</td>
</tr>
<tr>
<td>below</td>
<td>显示下部的外侧边框。</td>
</tr>
<tr>
<td>hsides</td>
<td>显示上部和下部的外侧边框。</td>
</tr>
<tr>
<td>vsides</td>
<td>显示左边和右边的外侧边框。</td>
</tr>
<tr>
<td>lhs</td>
<td>显示左边的外侧边框。</td>
</tr>
<tr>
<td>rhs</td>
<td>显示右边的外侧边框。</td>
</tr>
<tr>
<td>box</td>
<td>在所有四个边上显示外侧边框。</td>
</tr>
<tr>
<td>border</td>
<td>在所有四个边上显示外侧边框。</td>
</tr>
</tbody>
</table>

&emsp;&emsp;7、rules(IE7-浏览器不能正常显示)(html5已废弃)

<table class="table">
<tbody>
<tr><th>值</th><th>描述</th></tr>
<tr>
<td>none</td>
<td>没有线条。</td>
</tr>
<tr>
<td>groups</td>
<td>位于行组和列组之间的线条。</td>
</tr>
<tr>
<td>rows</td>
<td>位于行之间的线条。</td>
</tr>
<tr>
<td>cols</td>
<td>位于列之间的线条。</td>
</tr>
<tr>
<td>all</td>
<td>位于行和列之间的线条。</td>
</tr>
</tbody>
</table>

&nbsp;

&emsp;&emsp;&lt;演示框&gt;点击下列相应属性值可进行演示

<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/html/table/t2.html" frameborder="0" width="320" height="240"></iframe>

【样式】

&emsp;&emsp;1、border-spacing(可替代HTML属性cellspaing，IE7-不支持)

&emsp;&emsp;注意：只有当border-collapse值为separate时，该样式才有效

<div>
<pre>border-spacing: x y
//x:水平间距 y:垂直间距。若只有一个值，则水平间距和垂直间距相等。注意，不可为负值。</pre>
</div>

&emsp;&emsp;2、empty-cells(IE7-不支持)&nbsp;

<div>
<pre>empty-cells: hide 不在空单元格周围绘制边框和背景，类似于hidden效果
empty-cells: show(默认) 在空单元格周围绘制边框和背景</pre>
</div>

&emsp;&emsp;3、CSS实际上有两种截然不同的边框模型。按布局术语来说，如果单元格相互之间是分隔的，是分隔边框模型在起作用；另一种是合并边框模型，单元格边框会相互合并。

<div>
<pre>border-collapse:separate;</pre>
</div>

&emsp;&emsp;注意：在分隔边框模型中，不能为行、行组、列和列组设置边框。

<div>
<pre>border-collapse:collapse;</pre>
</div>

&emsp;&emsp;在合并边框模型中，表格无法设置内边距padding，且单元格边框之间也没有间距。单元格之间的边框会在单元格间的假想表格线上居中，且表格宽度只包含表格边框的一半

【边框合并的规则】

&emsp;&emsp;a、某个合并边框的border-style为hidden，它会优先于所有其他合并边框。这个位置上的所有边框都隐藏

&emsp;&emsp;b、某个合并边框的border-style为none，它的优先级最低

&emsp;&emsp;c、宽边框优先于窄边框

&emsp;&emsp;d、若宽度相同，double\solid\dashed\dotted\ridge\outset\groove\inset，优先级逐渐降低

&emsp;&emsp;e、若样式也相同，cell\row\row group\column\column group\table，优先级逐渐降级

&emsp;&emsp;&lt;演示框&gt;点击下列相应属性值可进行border-style的演示

<iframe style="width: 100%; height: 440px;" src="https://demo.xiaohuochai.site/html/table/t3.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;4、table-layout

<div>
<pre>table-layout:auto//自动宽度布局</pre>
</div>

【自动布局的步骤】

&emsp;&emsp;a、对于一列中的单元格，计算最小和最大单元格宽度

&emsp;&emsp;b、对于各一列，计算最小和最大列宽

&emsp;&emsp;c、若单元格跨列，最小列宽之和要等于跨列单元格最小单元格宽度

<div>
<pre>table-layout:fixed//固定宽度布局</pre>
</div>

&emsp;&emsp;注意：对于表单元格的长文本来说，使用word-wrap或word-break来强制换行，使用text-overflow实现文本溢出控制都需要设置table-layout:fixed

【固定布局的步骤】

&emsp;&emsp;a、width属性值不是auto的所有列元素会根据width值设置该列的宽度

&emsp;&emsp;b、如果一个列的宽度为auto，则根据该单元格设置此列宽度，如果跨多列，则宽度平均分配

&emsp;&emsp;c、如果列宽度仍为auto，则自动确定其大小，使其宽度尽可能相等

&emsp;&emsp;注意：使用固定宽度布局，用户代理可以更快地计算出表格的布局

&emsp;&emsp;5、vertical-align

<div>
<pre>vertical-align: top;//顶端对齐
vertical-align: bottom;//底端对齐
vertical-align: middle;//中间对齐
vertical-align: baseline(默认);//基线对齐</pre>
</div>

&emsp;&emsp;注意：vertical-align:sub\super\text-top\text-bottom应用到表格单元格时会被忽略

&nbsp;

### 行

【&lt;tr&gt;&lt;th&gt;&lt;td&gt;】

<div>
<pre>  &lt;tr&gt;行 table row 
  &lt;th&gt;表头 table head
  &lt;td&gt;表格数据 table data</pre>
</div>

【默认样式】

<div>
<pre>th{
    padding: 1px;
    text-align: center;
    font-weight: bold;
}
td{
    padding: 1px;
}</pre>
</div>

【属性】

&emsp;&emsp;1、colspan

&emsp;&emsp;&emsp;规定单元格可横跨的列数

&emsp;&emsp;2、rowspan

&emsp;&emsp;&emsp;规定单元格可横跨的行数

&emsp;&emsp;注意：关于行的表格元素生成矩形框，这些框有内容、内边距和边框，但是没有外边距margin。表头呈现为居中的粗体文本

&emsp;&emsp;&nbsp;&lt;演示框&gt;点击下列相应属性值可进行演示

<iframe style="width: 100%; height: 230px;" src="https://demo.xiaohuochai.site/html/table/t4.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 列

【&lt;col&gt;&lt;colgroup&gt;】

&emsp;&emsp;&lt;col&gt; -&gt; column 列

&emsp;&emsp;&emsp;为表格中一个或多个列定义属性值

&emsp;&emsp;&lt;colgroup&gt; -&gt; column group 列组

&emsp;&emsp;&emsp;对表格中的列进行组合，以便对其进行格式化

【属性】

&emsp;&emsp;span

&emsp;&emsp;&emsp;规定col元素应该横跨的列数

【样式】

&emsp;&emsp;1、visibility:collapse

&emsp;&emsp;&emsp;该列或列组的所有单元格不显示(设置为其他值则无效)

&emsp;&emsp;2、border

&emsp;&emsp;&emsp;只有当border-collapse:collapse时，才能设置border

&emsp;&emsp;3、background

&emsp;&emsp;&emsp;只有当单元格及其行有透明背景时，列或列组的背景才可见

&emsp;&emsp;4、width

&emsp;&emsp;&emsp;定义列或列组的最小宽度

<div>
<pre>&lt;table border="1" style="border-collapse: collapse"&gt;
  &lt;colgroup span="2" style="width:100px; background-color: red"&gt;&lt;/colgroup&gt;
  &lt;col style="background-color: green; width:200px; border: 3px solid blue;" &gt;
  &lt;tr&gt;
    &lt;td&gt;数字&lt;/td&gt;
    &lt;td&gt;中文&lt;/td&gt;
    &lt;td&gt;英文&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;1&lt;/td&gt;
    &lt;td&gt;一&lt;/td&gt;
    &lt;td&gt;a&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;2&lt;/td&gt;
    &lt;td&gt;二&lt;/td&gt;
    &lt;td&gt;b&lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/html/table/t5.html" frameborder="0" width="320" height="240"></iframe>

### 其他表格元素

【&lt;thead&gt;&lt;tbody&gt;&lt;tfoot&gt;】

<div>
<pre>&lt;thead&gt;表格页眉
&lt;tbody&gt;表格主体
&lt;tfoot&gt;表格页脚</pre>
</div>

&emsp;&emsp;注意：它们的出现次序是：thead、tfoot、tbody，这样浏览器就可以在收到所有数据前呈现页脚

【&lt;caption&gt;表格标题】

【默认样式】

<div>
<pre>caption{
    text-align: center;
}</pre>
</div>

【样式】

<div>
<pre>caption-side: top(默认)
caption-side: bottom</pre>
</div>

&emsp;&emsp;注意：&lt;caption&gt;标签必须紧随&lt;table&gt;标签之后，且只能对每个表格定义一个标题

<div>
<pre>&lt;table border="1" &gt;
　 &lt;caption style="caption-side:bottom"&gt;北京天气&lt;/caption&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th&gt;地区&lt;/th&gt;
      &lt;th&gt;天气&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tfoot&gt;
    &lt;tr&gt;
      &lt;td&gt;北京&lt;/td&gt;
      &lt;td&gt;都雾霾&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tfoot&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;td&gt;城八区&lt;/td&gt;
      &lt;td&gt;雾霾&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;郊区&lt;/td&gt;
      &lt;td&gt;雾霾&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;</pre>
</div>

<iframe style="width: 100%; height: 170px;" src="https://demo.xiaohuochai.site/html/table/t6.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### display

<div>
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

&emsp;&emsp;注意：IE7-浏览器不支持为HTML元素设置与表格有关的display值

&nbsp;

### 匿名表格对象

&emsp;&emsp;CSS定义了一种机制，将遗漏的组件作为匿名对象插入。详细插入规则如下：

&emsp;&emsp;1、如果table-cell元素的父元素不是table-row元素，则插入匿名table-row对象

&emsp;&emsp;2、如果table-row元素的父元素不是table、inline-table或table-row-group元素，则插入匿名table元素

&emsp;&emsp;3、如果table-column元素父元素不是table、inline-table或table-row-group元素，则插入匿名table元素

&emsp;&emsp;4、如果table-row-group、table-header-group、table-footer-group、table-column-group或table-caption的父元素不是table元素，则插入匿名table元素

&emsp;&emsp;5、如果table元素或inline-table元素的子元素不是table-row-group、table-header-group、table-footer-group、table-column-group或table-caption，则插入匿名table-row元素

&emsp;&emsp;6、如果table-row-group、table-header-group、table-footer-group元素的子元素不是table-row元素，则插入匿名table-row元素

&emsp;&emsp;7、如果table-row元素的子元素不是table-cell元素，则插入匿名tabel-cell元素

![table1](https://pic.xiaohuochai.site/blog/HTML_tags_table1.gif)

&nbsp;

### 表格层

&emsp;&emsp;CSS定义了6个不同的层，对应表各个方面的样式都在其各自的层上绘制。默认地，所有元素背景都是透明的，如果单元格、行、列等没有自己的背景，则table元素的背景将透明这些内部元素可见。

![table2](https://pic.xiaohuochai.site/blog/HTML_tags_table2.jpg)

&emsp;&emsp;&lt;演示框&gt;点击下列相应属性值可进行演示

<iframe style="width: 100%; height: 320px;" src="https://demo.xiaohuochai.site/html/table/t7.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 边距设置

【&lt;table&gt;】

&emsp;&emsp;若处于分隔边框模型，margin和padding都可设置

&emsp;&emsp;若处于合并边框模型，只可设置margin

【&lt;thead&gt;&lt;tbody&gt;&lt;tfoot&gt;&lt;tr&gt;&lt;col&gt;&lt;colgroup&gt;】

&emsp;&emsp;margin和padding都不可设置

【&lt;td&gt;&lt;th&gt;】

&emsp;&emsp;不可设置margin，但可以设置padding

【&lt;caption&gt;】

&emsp;&emsp;margin和padding都可设置
