# Boostrap表格

&emsp;&emsp;表格是Bootstrap的一个基础组件之一，Bootstrap为表格提供了**1种基础样式**和**4种附加样式**以及**1个支持响应式的表格**。在使用Bootstrap的表格过程中，只需要添加对应的类名就可以得到不同的表格风格，本文将详细介绍Boostrap表格

&nbsp;

### 基本实例

&emsp;&emsp;Boostrap将表格&lt;table&gt;的样式重置如下

<div>
<pre>table {
    background-color: transparent;
    border-spacing: 0;
    border-collapse: collapse;
}</pre>
</div>
<div>
<pre>&lt;table&gt;
  &lt;caption&gt;Optional table caption.&lt;/caption&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th&gt;#&lt;/th&gt;
      &lt;th&gt;First Name&lt;/th&gt;
      &lt;th&gt;Last Name&lt;/th&gt;
      &lt;th&gt;Username&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;th scope="row"&gt;1&lt;/th&gt;
      &lt;td&gt;Mark&lt;/td&gt;
      &lt;td&gt;Otto&lt;/td&gt;
      &lt;td&gt;@mdo&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;th scope="row"&gt;2&lt;/th&gt;
      &lt;td&gt;Jacob&lt;/td&gt;
      &lt;td&gt;Thornton&lt;/td&gt;
      &lt;td&gt;@fat&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;th scope="row"&gt;3&lt;/th&gt;
      &lt;td&gt;Larry&lt;/td&gt;
      &lt;td&gt;the Bird&lt;/td&gt;
      &lt;td&gt;@twitter&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;    </pre>
</div>

<iframe style="width: 100%; height: 146px;" src="https://demo.xiaohuochai.site/bootstrap/table/t1.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;为任意&lt;table&gt;标签添加`.table`类可以为其赋予基本的样式&mdash;少量的内边距(padding)和水平方向的分隔线&nbsp;

&emsp;&emsp;&ldquo;.table&rdquo;主要有三个作用：

&emsp;&emsp;☑ 给表格设置了margin-bottom:20px以及设置单元内距

&emsp;&emsp;☑ 在thead底部设置了一个2px的浅灰实线

&emsp;&emsp;☑ 每个单元格顶部设置了一个1px的浅灰实线

<div>
<pre>&lt;table class="table"&gt;
  ...
&lt;/table&gt;</pre>
</div>

<iframe style="width: 100%; height: 214px;" src="https://demo.xiaohuochai.site/bootstrap/table/t2.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 条纹状表格

&emsp;&emsp;有时候为了让表格更具阅读性，需要将表格制作成类似于斑马线的效果。简单点说就是让表格带有背景条纹效果。在Bootstrap中实现这种表格效果并不困难，只需要在&lt;table class="table"&gt;的基础上增加类名&ldquo;.table-striped&rdquo;即可

&emsp;&emsp;通过&nbsp;`.table-striped`&nbsp;类可以给&nbsp;&lt;tbody&gt;&nbsp;之内的每一行增加斑马条纹样式。其效果与基础表格相比，仅是在tbody隔行有一个浅灰色的背景色

&emsp;&emsp;注意：条纹状表格是依赖&nbsp;`:nth-child`&nbsp;CSS 选择器实现的，而这一功能不被IE8-支持

<div>
<pre>.table-striped &gt; tbody &gt; tr:nth-of-type(odd) {
    background-color: #f9f9f9;
}</pre>
</div>
<div>
<pre>&lt;table class="table table-striped"&gt;
  ...
&lt;/table&gt;</pre>
</div>

<iframe style="width: 100%; height: 214px;" src="https://demo.xiaohuochai.site/bootstrap/table/t3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 带边框表格

&emsp;&emsp;基础表格仅让表格部分地方有边框，但有时候需要整个表格具有边框效果。Bootstrap出于实际运用，也考虑这种表格效果，即所有单元格具有一条1px的边框

&emsp;&emsp;Bootstrap中带边框的表格使用方法和斑马线表格的使用方法类似，只需要在基础表格&lt;table class="table"&gt;基础上添加一个&ldquo;.table-bordered&rdquo;类名即可

&emsp;&emsp;添加&nbsp;`.table-bordered`&nbsp;类为表格和其中的每个单元格增加边框

<div>
<pre>&lt;table class="table table-bordered"&gt;
  ...
&lt;/table&gt;</pre>
</div>

<iframe style="width: 100%; height: 216px;" src="https://demo.xiaohuochai.site/bootstrap/table/t4.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 鼠标悬停

&emsp;&emsp;当鼠标悬停在表格的行上面有一个高亮的背景色，这样可以时刻告诉用户正在阅读表格哪一行的数据

&emsp;&emsp;通过添加 .table-hover 类可以让 &lt;tbody&gt; 中的每一行对鼠标悬停状态作出响应

<div>
<pre>&lt;table class="table table-hover"&gt;
  ...
&lt;/table&gt;</pre>
</div>
<div>
<pre>.table-hover &gt; tbody &gt; tr:hover {
    background-color: #f5f5f5;
}</pre>
</div>

<iframe style="width: 100%; height: 216px;" src="https://demo.xiaohuochai.site/bootstrap/table/t5.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 紧缩表格

&emsp;&emsp;紧凑型表格，或者叫紧缩表格，简单理解，就是单元格没内边距或者内边距较其他表格的内边距更小。换句话说，要实现紧凑型表格只需要重置表格单元格的内边距padding的值

&emsp;&emsp;通过添加 .table-condensed 类可以让表格更加紧凑，单元格中的内补（padding）均会减半

<div>
<pre>&lt;table class="table table-condensed"&gt;
  ...
&lt;/table&gt;</pre>
</div>

<iframe style="width: 100%; height: 190px;" src="https://demo.xiaohuochai.site/bootstrap/table/t6.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 状态类

&emsp;&emsp;通过这些状态类可以为行或单元格设置颜色

![bs_makeup2](https://pic.xiaohuochai.site/blog/bs_makeup2.png)

<div>
<pre>&lt;table class="table"&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th&gt;#&lt;/th&gt;
      &lt;th&gt;Column heading&lt;/th&gt;
      &lt;th&gt;Column heading&lt;/th&gt;
      &lt;th&gt;Column heading&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr class="active"&gt;
      &lt;th scope="row"&gt;1&lt;/th&gt;
      &lt;td&gt;Column content&lt;/td&gt;
      &lt;td&gt;Column content&lt;/td&gt;
      &lt;td&gt;Column content&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr class="success"&gt;
      &lt;th scope="row"&gt;2&lt;/th&gt;
      &lt;td&gt;Column content&lt;/td&gt;
      &lt;td&gt;Column content&lt;/td&gt;
      &lt;td&gt;Column content&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr class="info"&gt;
      &lt;th scope="row"&gt;3&lt;/th&gt;
      &lt;td&gt;Column content&lt;/td&gt;
      &lt;td&gt;Column content&lt;/td&gt;
      &lt;td&gt;Column content&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr class="warning"&gt;
      &lt;th scope="row"&gt;4&lt;/th&gt;
      &lt;td&gt;Column content&lt;/td&gt;
      &lt;td&gt;Column content&lt;/td&gt;
      &lt;td&gt;Column content&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr class="danger"&gt;
      &lt;th scope="row"&gt;5&lt;/th&gt;
      &lt;td&gt;Column content&lt;/td&gt;
      &lt;td&gt;Column content&lt;/td&gt;
      &lt;td&gt;Column content&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;th scope="row"&gt;6&lt;/th&gt;
      &lt;td&gt;Column content&lt;/td&gt;
      &lt;td&gt;Column content&lt;/td&gt;
      &lt;td&gt;Column content&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;</pre>
</div>

<iframe style="width: 100%; height: 290px;" src="https://demo.xiaohuochai.site/bootstrap/table/t7.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 响应式表格

&emsp;&emsp;将任何 .table 元素包裹在 .table-responsive 元素内，即可创建响应式表格，其会在小屏幕设备上（小于768px）水平滚动。当屏幕大于 768px 宽度时，水平滚动条消失

<div>
<pre>&lt;div class="table-responsive"&gt;
  &lt;table class="table"&gt;
    &lt;thead&gt;
      &lt;tr&gt;
        &lt;th&gt;#&lt;/th&gt;
        &lt;th&gt;Table heading&lt;/th&gt;
        &lt;th&gt;Table heading&lt;/th&gt;
        &lt;th&gt;Table heading&lt;/th&gt;
      &lt;/tr&gt;
    &lt;/thead&gt;
    &lt;tbody&gt;
      &lt;tr&gt;
        &lt;th scope="row"&gt;1&lt;/th&gt;
        &lt;td&gt;Table cell&lt;/td&gt;
        &lt;td&gt;Table cell&lt;/td&gt;
        &lt;td&gt;Table cell&lt;/td&gt;
      &lt;/tr&gt;
      &lt;tr&gt;
        &lt;th scope="row"&gt;2&lt;/th&gt;
        &lt;td&gt;Table cell&lt;/td&gt;
        &lt;td&gt;Table cell&lt;/td&gt;
        &lt;td&gt;Table cell&lt;/td&gt;
      &lt;/tr&gt;
      &lt;tr&gt;
        &lt;th scope="row"&gt;3&lt;/th&gt;
        &lt;td&gt;Table cell&lt;/td&gt;
        &lt;td&gt;Table cell&lt;/td&gt;
        &lt;td&gt;Table cell&lt;/td&gt;
      &lt;/tr&gt;
    &lt;/tbody&gt;
  &lt;/table&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/bootstrap/table/t8.html" frameborder="0" width="320" height="240"></iframe>

