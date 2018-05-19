# Bootstrap排版——HTML元素的样式重定义

&emsp;&emsp;Bootstrap对默认的HTML元素进行了CSS样式定义，使得各种基本结构套用出来的HTML页面更加美观。本文将详细介绍Bootstrap中排版相关的内容

&nbsp;

### 标题

【h】

&emsp;&emsp;HTML 中的所有标题标签，&lt;h1&gt;&nbsp;到&nbsp;&lt;h6&gt;&nbsp;均可使用

&emsp;&emsp;默认情况下，从h1到h6的font-size如下所示

<div>
<pre>2em -&gt; 1.5em -&gt; 1.17em -&gt; 1em -&gt; 0.83em -&gt; 0.67em;</pre>
</div>

&emsp;&emsp;初始情况，1em = 16px，则换算如下&nbsp;

<div>
<pre>32px -&gt; 24px -&gt; 18.72px -&gt; 16px -&gt; 13.28px -&gt; 10.72px;</pre>
</div>

&emsp;&emsp;Boostrap将h1-h6的字体大小font-size重新进行了设置，如下所示

<div>
<pre>36px -&gt; 30px -&gt; 24px -&gt; 18px -&gt; 14px -&gt; 12px;</pre>
</div>

![bs_makeup1](https://pic.xiaohuochai.site/blog/bs_makeup1.png)

&emsp;&emsp;另外，还提供了&nbsp;`.h1`&nbsp;到&nbsp;`.h6`&nbsp;类，为的是给内联（inline）属性的文本赋予标题的样式，除了display属性不同外，其他属性与&lt;h1&gt; 到 &lt;h6&gt;样式相同

<div>
<pre>h1,.h1{
    font-size: 36px;
    margin-top: 20px;
    margin-bottom: 10px;
    font-family: inherit;
    font-weight: 500;
    line-height: 1.1;
    color: inherit;
}</pre>
</div>

&nbsp;【small】

&emsp;&emsp;在标题内还可以包含&nbsp;&lt;small&gt;&nbsp;标签或赋予&nbsp;`.small`&nbsp;类的元素，可以用来标记副标题。&lt;small&gt;标签和.small类的元素的样式相同

<div>
<pre>h1 small,.h1 small, h1 .small, .h1 .small{
    font-size: 65%;
    font-weight: normal;
    line-height: 1;
    color: #777;
}</pre>
</div>
<div>
<pre>&lt;h1&gt;标题一 &lt;small&gt;副标题一&lt;/small&gt;&lt;/h1&gt;
&lt;h2&gt;标题二 &lt;small&gt;副标题二&lt;/small&gt;&lt;/h2&gt;
&lt;h3&gt;标题三 &lt;small&gt;副标题三&lt;/small&gt;&lt;/h3&gt;
&lt;h4&gt;标题四 &lt;small&gt;副标题四&lt;/small&gt;&lt;/h4&gt;
&lt;h5&gt;标题五 &lt;small&gt;副标题五&lt;/small&gt;&lt;/h5&gt;
&lt;h6&gt;标题六 &lt;small&gt;副标题六&lt;/small&gt;&lt;/h6&gt;</pre>
</div>

<iframe style="width: 100%; height: 250px;" src="https://demo.xiaohuochai.site/bootstrap/typeset/t14.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 段落

【body】

&emsp;&emsp;默认情况下，页面font-size为16px，行高line-height(chrome下)为1.334

&emsp;&emsp;Bootstrap 将全局&nbsp;`font-size`&nbsp;设置为&nbsp;14px，`line-height`&nbsp;设置为&nbsp;20px。这些属性直接赋予&nbsp;`<body>`&nbsp;元素和所有段落元素

<div>
<pre>body{
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
    line-height: 20px;
    color: #333;
    background-color: #fff;
&emsp;&emsp; margin:0;
}</pre>
</div>

【p】

&emsp;&emsp;另外，&lt;p&gt;&nbsp;（段落）元素还被设置了等于 1/2 行高（即 10px）的底部外边距（margin）

<div>
<pre>p{
    margin: 0 0 10px;
}</pre>
</div>

【.lead】

&emsp;&emsp;通过添加&nbsp;`.lead`&nbsp;类可以让段落突出显示

<div>
<pre>.lead {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.4;
}</pre>
</div>
<div>
<pre>&lt;p&gt;一般内容&lt;/p&gt;
&lt;p class="lead"&gt;中心内容&lt;/p&gt;
&lt;p&gt;一般内容&lt;/p&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/bootstrap/typeset/t1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 内联文本

【标记文本】

&emsp;&emsp;文本需要标记，使用&lt;mark&gt;标签

<div>
<pre>mark, .mark {
    padding: .2em;
    background-color: #fcf8e3;
}</pre>
</div>

【删除文本】

&emsp;&emsp;对于被删除的文本使用&lt;del&gt;标签

【无用文本】

&emsp;&emsp;对于没用的文本使用 &lt;s&gt; 标签

【插入文本】

&emsp;&emsp;额外插入的文本使用 &lt;ins&gt; 标签

【带下划线的文本】

&emsp;&emsp;为文本添加下划线，使用 &lt;u&gt; 标签

【小号文本】

&emsp;&emsp;对于不需要强调的inline或block类型的文本，使用 &lt;small&gt; 标签包裹，其内的文本将被设置为父容器字体大小的 85%。标题元素中嵌套的 &lt;small&gt; 元素被设置不同的 font-size 。

&emsp;&emsp;还可以为行内元素赋予 .small 类以代替任何 &lt;small&gt; 元素

<div>
<pre>small, .small {
    font-size: 85%;
}</pre>
</div>

【着重】

&emsp;&emsp;通过增加 font-weight 值强调一段文本

【斜体】

&emsp;&emsp;用斜体强调一段文本

&emsp;&emsp;注意：在 HTML5 中可以放心使用 &lt;b&gt; 和 &lt;i&gt; 标签。&lt;b&gt; 用于高亮单词或短语，不带有任何着重的意味；而 &lt;i&gt; 标签主要用于发言、技术词汇等

<div>
<pre>&lt;div&gt;
    You can use the mark tag to &lt;mark&gt;highlight&lt;/mark&gt; text.
&lt;/div&gt;
&lt;div&gt;
    &lt;del&gt;This line of text is meant to be treated as deleted text.&lt;/del&gt;
&lt;/div&gt;
&lt;div&gt;
    &lt;s&gt;This line of text is meant to be treated as no longer accurate.&lt;/s&gt;
&lt;/div&gt;
&lt;div&gt;
    &lt;ins&gt;This line of text is meant to be treated as an addition to the document.&lt;/ins&gt;
&lt;/div&gt;
&lt;div&gt;
    &lt;u&gt;This line of text will render as underlined&lt;/u&gt;
&lt;/div&gt;
&lt;div&gt;
    &lt;small&gt;This line of text is meant to be treated as fine print.&lt;/small&gt;
&lt;/div&gt;
&lt;div&gt;
    &lt;strong&gt;rendered as bold text&lt;/strong&gt;
&lt;/div&gt;
&lt;div&gt;
    &lt;em&gt;rendered as italicized text&lt;/em&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 190px;" src="https://demo.xiaohuochai.site/bootstrap/typeset/t2.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 缩略语

&emsp;&emsp;当鼠标悬停在缩写和缩写词上时就会显示完整内容，Bootstrap 实现了对 HTML 的&nbsp;&lt;abbr&gt;&nbsp;元素的增强样式。缩略语元素带有&nbsp;`title`&nbsp;属性，外观表现为带有较浅的虚线框，鼠标移至上面时会变成带有&ldquo;问号&rdquo;的指针。如想看完整的内容可把鼠标悬停在缩略语上（对使用辅助技术的用户也可见）, 但需要包含 title 属性

【基本缩略语】

<div>
<pre>abbr[title], abbr[data-original-title] {
    cursor: help;
    border-bottom: 1px dotted #777;
}</pre>
</div>

【首字母缩略语】

&emsp;&emsp;为缩略语添加&nbsp;`.initialism`&nbsp;类，可以让 font-size 变得稍微小些

<div>
<pre>.initialism {
    font-size: 90%;
    text-transform: uppercase;
}</pre>
</div>
<div>
<pre>&lt;abbr title="attribute"&gt;attr&lt;/abbr&gt;
&lt;abbr title="HyperText Markup Language" class="initialism"&gt;HTML&lt;/abbr&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/bootstrap/typeset/t3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 地址

&emsp;&emsp;让联系信息以最接近日常使用的格式呈现。在每行结尾添加&nbsp;&lt;br&gt;&nbsp;可以保留需要的样式

<div>
<pre>address {
    margin-bottom: 20px;
    font-style: normal;
    line-height: 1.42857143;
}</pre>
</div>
<div>
<pre>&lt;address&gt;
  &lt;strong&gt;Twitter, Inc.&lt;/strong&gt;&lt;br&gt;
  1355 Market Street, Suite 900&lt;br&gt;
  San Francisco, CA 94103&lt;br&gt;
  &lt;abbr title="Phone"&gt;P:&lt;/abbr&gt; (123) 456-7890
&lt;/address&gt;
&lt;address&gt;
  &lt;strong&gt;Full Name&lt;/strong&gt;&lt;br&gt;
  &lt;a href="mailto:#"&gt;first.last@example.com&lt;/a&gt;
&lt;/address&gt;</pre>
</div>

<iframe style="width: 100%; height: 170px;" src="
https://demo.xiaohuochai.site/bootstrap/typeset/t4.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 引用

【默认样式的引用】&nbsp;

&emsp;&emsp;将任何 HTML 元素包裹在 &lt;blockquote&gt; 中即可表现为引用样式。对于直接引用，建议用 &lt;p&gt; 标签

<div>
<pre>blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
}</pre>
</div>
<div>
<pre>&lt;blockquote&gt;
  &lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.&lt;/p&gt;
&lt;/blockquote&gt;</pre>
</div>

<iframe style="width: 100%; height: 95px;" src="https://demo.xiaohuochai.site/bootstrap/typeset/t5.html" frameborder="0" width="320" height="240"></iframe>

【多种引用样式】

&emsp;&emsp;对于标准样式的 &lt;blockquote&gt;，可以通过几个简单的变体就能改变风格和内容

&emsp;&emsp;1、命名来源

&emsp;&emsp;添加 &lt;footer&gt; 用于标明引用来源。来源的名称可以包裹进 &lt;cite&gt;标签中

<div>
<pre>&lt;blockquote&gt;
  &lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.&lt;/p&gt;
  &lt;footer&gt;Someone famous in &lt;cite title="Source Title"&gt;Source Title&lt;/cite&gt;&lt;/footer&gt;
&lt;/blockquote&gt;</pre>
</div>

&emsp;&emsp;2、另一种展示风格

&emsp;&emsp;通过赋予 .blockquote-reverse 类可以让引用呈现内容右对齐的效果

<div>
<pre>&lt;blockquote class="blockquote-reverse"&gt;
  &lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.&lt;/p&gt;
  &lt;footer&gt;Someone famous in &lt;cite title="Source Title"&gt;Source Title&lt;/cite&gt;&lt;/footer&gt;
&lt;/blockquote&gt;</pre>
</div>
<div>
<pre>.blockquote-reverse, blockquote.pull-right {
    padding-right: 15px;
    padding-left: 0;
    text-align: right;
    border-right: 5px solid #eee;
    border-left: 0;
}</pre>
</div>

<iframe style="width: 100%; height: 220px;" src="https://demo.xiaohuochai.site/bootstrap/typeset/t6.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 列表

【无序列表】

&emsp;&emsp;排列顺序无关紧要的一列元素&nbsp;

<div>
<pre>ul,
ol {
  margin-top: 0;
  margin-bottom: 10px;
}
ul ul,
ol ul,
ul ol,
ol ol {
  margin-bottom: 0;
}</pre>
</div>
<div>
<pre>&lt;ul&gt;
  &lt;li&gt;Lorem ipsum dolor sit amet&lt;/li&gt;
  &lt;li&gt;Consectetur adipiscing elit&lt;/li&gt;
  &lt;li&gt;Integer molestie lorem at massa&lt;/li&gt;
  &lt;li&gt;Facilisis in pretium nisl aliquet&lt;/li&gt;
  &lt;li&gt;Nulla volutpat aliquam velit
    &lt;ul&gt;
      &lt;li&gt;Phasellus iaculis neque&lt;/li&gt;
      &lt;li&gt;Purus sodales ultricies&lt;/li&gt;
      &lt;li&gt;Vestibulum laoreet porttitor sem&lt;/li&gt;
      &lt;li&gt;Ac tristique libero volutpat at&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/li&gt;
  &lt;li&gt;Faucibus porta lacus fringilla vel&lt;/li&gt;
  &lt;li&gt;Aenean sit amet erat nunc&lt;/li&gt;
  &lt;li&gt;Eget porttitor lorem&lt;/li&gt;
&lt;/ul&gt;</pre>
</div>

<iframe style="width: 100%; height: 270px;" src="https://demo.xiaohuochai.site/bootstrap/typeset/t7.html" frameborder="0" width="320" height="240"></iframe>

【有序列表】

&emsp;&emsp;顺序至关重要的一组元素。&nbsp;

<div>
<pre>&lt;ol&gt;
  &lt;li&gt;Lorem ipsum dolor sit amet&lt;/li&gt;
  &lt;li&gt;Consectetur adipiscing elit&lt;/li&gt;
  &lt;li&gt;Integer molestie lorem at massa&lt;/li&gt;
  &lt;li&gt;Facilisis in pretium nisl aliquet&lt;/li&gt;
  &lt;li&gt;Nulla volutpat aliquam velit&lt;/li&gt;
  &lt;li&gt;Faucibus porta lacus fringilla vel&lt;/li&gt;
  &lt;li&gt;Aenean sit amet erat nunc&lt;/li&gt;
  &lt;li&gt;Eget porttitor lorem&lt;/li&gt;
&lt;/ol&gt;</pre>
</div>

<iframe style="width: 100%; height: 190px;" src="https://demo.xiaohuochai.site/bootstrap/typeset/t8.html" frameborder="0" width="320" height="240"></iframe>

【无样式列表】

&emsp;&emsp;移除了默认的 list-style 样式和左侧外边距的一组元素（只针对直接子元素）。这是针对直接子元素的，也就是说，你需要对所有嵌套的列表都添加这个类才能具有同样的样式&nbsp;

<div>
<pre>.list-unstyled {
    padding-left: 0;
    list-style: none;
}</pre>
</div>
<div>
<pre>&lt;ul class="list-unstyled"&gt;
  &lt;li&gt;Lorem ipsum dolor sit amet&lt;/li&gt;
  &lt;li&gt;Consectetur adipiscing elit&lt;/li&gt;
  &lt;li&gt;Integer molestie lorem at massa&lt;/li&gt;
  &lt;li&gt;Facilisis in pretium nisl aliquet&lt;/li&gt;
  &lt;li&gt;Nulla volutpat aliquam velit
    &lt;ul&gt;
      &lt;li&gt;Phasellus iaculis neque&lt;/li&gt;
      &lt;li&gt;Purus sodales ultricies&lt;/li&gt;
      &lt;li&gt;Vestibulum laoreet porttitor sem&lt;/li&gt;
      &lt;li&gt;Ac tristique libero volutpat at&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/li&gt;
  &lt;li&gt;Faucibus porta lacus fringilla vel&lt;/li&gt;
  &lt;li&gt;Aenean sit amet erat nunc&lt;/li&gt;
  &lt;li&gt;Eget porttitor lorem&lt;/li&gt;
&lt;/ul&gt;</pre>
</div>

<iframe style="width: 100%; height: 270px;" src="https://demo.xiaohuochai.site/bootstrap/typeset/t9.html" frameborder="0" width="320" height="240"></iframe>

【内联列表】

&emsp;&emsp;通过设置 display: inline-block; 并添加少量的内边距（padding），将所有元素放置于同一行&nbsp;

<div>
<pre>.list-inline {
padding-left: 0;
margin-left: -5px;
list-style: none;
}
.list-inline &gt; li {
display: inline-block;
padding-right: 5px;
padding-left: 5px;
}</pre>
</div>
<div>
<pre>&lt;ul class="list-inline"&gt;
  &lt;li&gt;Lorem ipsum&lt;/li&gt;
  &lt;li&gt;Phasellus iaculis&lt;/li&gt;
  &lt;li&gt;Nulla volutpat&lt;/li&gt;
&lt;/ul&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/bootstrap/typeset/t10.html" frameborder="0" width="320" height="240"></iframe>

【定义列表】&nbsp;

&emsp;&emsp;带有描述的短语列表。

<div>
<pre>dl {
    margin-top: 0;
    margin-bottom: 20px;
}
dt {
    font-weight: bold;
}
dt, dd {
    line-height: 1.42857143;
}
dd {
    margin-left: 0;
}</pre>
</div>
<div>
<pre>&lt;dl&gt;
  &lt;dt&gt;Description lists&lt;/dt&gt;
  &lt;dd&gt;A description list is perfect for defining terms.&lt;/dd&gt;
  &lt;dt&gt;Euismod&lt;/dt&gt;
  &lt;dd&gt;Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.&lt;/dd&gt;
  &lt;dd&gt;Donec id elit non mi porta gravida at eget metus.&lt;/dd&gt;
  &lt;dt&gt;Malesuada porta&lt;/dt&gt;
  &lt;dd&gt;Etiam porta sem malesuada magna mollis euismod.&lt;/dd&gt;
&lt;/dl&gt;</pre>
</div>

<iframe style="width: 100%; height: 170px;" src="https://demo.xiaohuochai.site/bootstrap/typeset/t11.html" frameborder="0" width="320" height="240"></iframe>

【水平排列的定义列表】

&emsp;&emsp;.dl-horizontal 可以让 &lt;dl&gt; 内的短语及其描述排在一行。开始是像 &lt;dl&gt; 的默认样式堆叠在一起，随着导航条逐渐展开而排列在一行

<div>
<pre>.dl-horizontal dt {
    float: left;
    width: 160px;
    overflow: hidden;
    clear: left;
    text-align: right;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.dl-horizontal dd {
    margin-left: 180px;
}</pre>
</div>
<div>
<pre>&lt;dl class="dl-horizontal"&gt;
  &lt;dt&gt;Description lists&lt;/dt&gt;
  &lt;dd&gt;A description list is perfect for defining terms.&lt;/dd&gt;
  &lt;dt&gt;Euismod&lt;/dt&gt;
  &lt;dd&gt;Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.&lt;/dd&gt;
  &lt;dd&gt;Donec id elit non mi porta gravida at eget metus.&lt;/dd&gt;
  &lt;dt&gt;Malesuada porta&lt;/dt&gt;
  &lt;dd&gt;Etiam porta sem malesuada magna mollis euismod.&lt;/dd&gt;
  &lt;dt&gt;Felis euismod semper eget lacinia&lt;/dt&gt;
  &lt;dd&gt;Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.&lt;/dd&gt;
&lt;/dl&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/bootstrap/typeset/t12.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 代码

【内联代码】

&nbsp;&emsp;&emsp;通过 &lt;code&gt; 标签包裹内联样式的代码片段。

<div>
<pre>code {
    padding: 2px 4px;
    font-size: 90%;
    color: #c7254e;
    background-color: #f9f2f4;
    border-radius: 4px;
}</pre>
</div>

【用户输入】

&emsp;&emsp;通过 &lt;kbd&gt; 标签标记用户通过键盘输入的内容。

<div>
<pre>kbd {
    padding: 2px 4px;
    font-size: 90%;
    color: #fff;
    background-color: #333;
    border-radius: 3px;
    -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .25);
    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .25);
}</pre>
</div>

【代码块】

&emsp;&emsp;多行代码可以使用 &lt;pre&gt; 标签。为了正确的展示代码，注意将尖括号做转义处理。

<div>
<pre>pre {
    display: block;
    padding: 9.5px;
    margin: 0 0 10px;
    font-size: 13px;
    line-height: 1.42857143;
    color: #333;
    word-break: break-all;
    word-wrap: break-word;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 4px;
}</pre>
</div>

&emsp;&emsp;还可以使用&nbsp;`.pre-scrollable`&nbsp;类，其作用是设置 max-height 为 350px ，并在垂直方向展示滚动条。

<div>
<pre>.pre-scrollable {
    max-height: 340px;
    overflow-y: scroll;
}</pre>
</div>

【变量】

&emsp;&emsp;通过 &lt;var&gt; 标签标记变量

【程序输出】

&emsp;&emsp;通过 &lt;samp&gt; 标签来标记程序输出的内容

<div>
<pre>&lt;div&gt;
    For example, &lt;code&gt;&amp;lt;section&amp;gt;&lt;/code&gt; should be wrapped as inline.
&lt;/div&gt;
&lt;div&gt;
    To switch directories, type &lt;kbd&gt;cd&lt;/kbd&gt; followed by the name of the directory.&lt;br&gt;
    To edit settings, press &lt;kbd&gt;&lt;kbd&gt;ctrl&lt;/kbd&gt; + &lt;kbd&gt;,&lt;/kbd&gt;&lt;/kbd&gt;
&lt;/div&gt;
&lt;div&gt;
    &lt;pre&gt;&amp;lt;p&amp;gt;Sample text here...&amp;lt;/p&amp;gt;&lt;/pre&gt;
&lt;/div&gt;
&lt;div&gt;
    &lt;pre class="pre-scrollable"&gt;&amp;lt;p&amp;gt;Sample text here...&amp;lt;/p&amp;gt;&lt;/pre&gt;
&lt;/div&gt;
&lt;div&gt;
    &lt;var&gt;y&lt;/var&gt; = &lt;var&gt;m&lt;/var&gt;&lt;var&gt;x&lt;/var&gt; + &lt;var&gt;b&lt;/var&gt;
&lt;/div&gt;
&lt;div&gt;
    &lt;samp&gt;This text is meant to be treated as sample output from a computer program.&lt;/samp&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 230px;" src="https://demo.xiaohuochai.site/bootstrap/typeset/t13.html
" frameborder="0" width="320" height="240"></iframe>

