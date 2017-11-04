# HTML内联元素

 　　用于标记段落里的文本和其他内容组的元素种类很多，本文将这些文本级元素进行简单分类，便于整理和记忆

&nbsp;

### 通用容器

　　&lt;span&gt;元素是短语内容的通用行内容器，并没有任何特殊语义。可以使用它来编组元素以达到某种样式意图(通过使用类或者Id属性)，或者这些元素有着共同的属性，比如lang。应该在没有其他合适的语义元素时才使用它。&lt;span&gt;与&lt;div&gt;元素很相似，但&lt;div&gt;是一个块元素而&lt;span&gt;则是行内元素

<div class="cnblogs_code">
<pre>&lt;p&gt;Some &lt;span&gt;text&lt;/span&gt;&lt;/p&gt;</pre>
</div>

&nbsp;

### 强调重要

 　　虽然浏览器通常用斜体和粗体来显示em和strong，但这些元素不应用作加粗和斜体。这两个元素分别用来提升包含内容的强调程度和重要性

&lt;em&gt; 　　 　 &nbsp;表示强调，`&lt;em&gt;`元素是可以嵌套的，嵌套层次越深，则其包含的内容被认定为越需要着重阅读

<span>&lt;strong&gt; 　　 表示重要


<div class="cnblogs_code">
<pre>&lt;p&gt;I am &lt;em&gt;very&lt;/em&gt; worried!&lt;/p&gt;
&lt;strong&gt;warning&lt;/strong&gt;</pre>
</div>

&nbsp;

### 文字间隔

 　　i和b元素历来是用来展示粗体和斜体字体的，但在HTML5中，它们有了新的语义

&lt;i&gt;

 　　[1]表示不同情绪或声音的文本，如内心对白

<div class="cnblogs_code">
<pre>&lt;p&gt;Simon smirked,"Yes,I'm happy to take the garbage out." &lt;i&gt;Ugh,I &lt;em&gt;really&lt;/em&gt; don't want to !&lt;/i&gt; he thought as he picked up the garbage bag.&lt;/p&gt;</pre>
</div>

 　　[2]表示外来语、分类学名和技术术语等

<div class="cnblogs_code">
<pre>&lt;i lang="fr"&gt;Oh la la!&lt;/i&gt;    </pre>
</div>

&nbsp;

&lt;b&gt;

 　　[1]用于分隔文字

<div class="cnblogs_code">
<pre>&lt;p&gt;After bringing &lt;b&gt;water&lt;/b&gt; to a boil, add &lt;b&gt;potatoes&lt;/b&gt; and &lt;b&gt;carrots&lt;/b&gt;&lt;/p&gt;</pre>
</div>

 　　[2]用于文章或故事的引言

<div class="cnblogs_code">
<pre>&lt;p&gt;&lt;b class="lede"&gt;Meteorologists predict more sunshine and scorching temperatures for the upcoming week, prompting area farmers to install irrigation systems.&lt;/b&gt;&lt;/p&gt;</pre>
</div>

&nbsp;

### 不精确文字

&lt;s&gt; 　　 在HTML5中重新定义为有错的、过时的、不被建议使用的文本，常用于表示价格变动等

<div class="cnblogs_code">
<pre>&lt;p&gt;价格&lt;s&gt;￥1298&lt;/s&gt;￥998！&lt;/p&gt;
&lt;p&gt;&lt;s&gt;37度&lt;/s&gt; &lt;strong&gt;41度&lt;/strong&gt;&lt;/p&gt;    </pre>
</div>

&nbsp;

### 高亮显示

&lt;mark&gt;　　 表示高亮或用于引用而标记的文字

<div class="cnblogs_code">
<pre>&lt;p&gt;&lt;mark&gt;We're all hoping it rains soon&lt;/mark&gt;, some farmers have installed irrigation systems, at &lt;em&gt;considerable&lt;/em&gt; expense&lt;/p&gt;</pre>
</div>

&nbsp;

### 次要评论

&lt;small&gt; 　　 表示旁注，可用于免责声明、使用条款和版权信息等需要小字体的场景

<div class="cnblogs_code">
<pre>&lt;small&gt;图片仅供参考，请以实物为准&lt;/small&gt;
&lt;small&gt;Chris Elhorn | The city Press&lt;/small&gt;</pre>
</div>

&nbsp;

### 术语处理

&lt;dfn&gt; 　　用来定义术语

<div class="cnblogs_code">
<pre>&lt;p&gt;The term &lt;dfn&gt;organic food&lt;/dfn&gt; refers to food produced without synthetic chemicals&lt;/p&gt;</pre>
</div>

&nbsp;

&lt;abbr&gt;　　 缩写词，可以配合&lt;dfn&gt;定义术语

<div class="cnblogs_code">
<pre>&lt;p&gt;The &lt;dfn&gt;&lt;abbr title="Garage Door Operner"&gt;GDO&lt;/abbr&gt;&lt;/dfn&gt; id a device allows off-world teams to open the iris.&lt;/p&gt;</pre>
</div>

&nbsp;

### 引用

&lt;cite&gt;　　 表示作品标题的引用，可以是书影音画等

<div class="cnblogs_code">
<pre>&lt;p&gt;我最喜欢的电影是&lt;cite&gt;千与千寻&lt;/cite&gt;&lt;/p&gt;</pre>
</div>

&nbsp;

&lt;q&gt;　　 表示短引用，常用于引用别人说的话，用引号可以表达等价语义

<div class="cnblogs_code">
<pre>&lt;p&gt;The judge said &lt;q&gt;You can drink water form the fish tank&lt;/q&gt; but advised against it.&lt;/p&gt;</pre>
</div>

&nbsp;

### 换行

&lt;br&gt; 　　换行

　　[注意]&lt;br&gt;标签是文本级语义元素，可以设置行高和字体大小，但设置宽高无效

<div class="cnblogs_code">
<pre>&lt;p&gt;
    &lt;b&gt;The City Press&lt;/b&gt;&lt;br /&gt;
    123 General Street &lt;br /&gt;
    Springfield, OH 45501
&lt;/p&gt;</pre>
</div>

&lt;wbr&gt;　　 需要时指定单词可以换行的位置

<div class="cnblogs_code">
<pre>&lt;i&gt;Irrigation&lt;wbr /&gt; Direct&lt;/i&gt;</pre>
</div>

&nbsp;

### 上标下标

 　　这两个标签在数学等式、科学符号和化学公式中非常有用

&lt;sup&gt;　　 表示上标

<div class="cnblogs_code">
<pre>&lt;p&gt;
    a&lt;sup&gt;2&lt;/sup&gt;
    +
    b&lt;sup&gt;2&lt;/sup&gt;
    =
    c&lt;sup&gt;2&lt;/sup&gt;
&lt;/p&gt;</pre>
</div>

&nbsp;

&lt;sub&gt;　　 表示下标

<div class="cnblogs_code">
<pre>&lt;p&gt;
    H&lt;sub&gt;2&lt;/sub&gt;
    SO&lt;sub&gt;4&lt;/sub&gt;
&lt;/p&gt;</pre>
</div>

&nbsp;

### 文本删改

 　　如果要表示文档的增删改记录，则应该使用ins和del标签

&lt;ins&gt;　　 文档中插入的内容

&lt;del&gt; 　　文档中删除的内容

 　　[注意]&lt;ins&gt;和&lt;del&gt;可以嵌套任何元素

　　&lt;属性&gt;

　　[1]datetime:用于标明编辑的日期和可选的时间

　　[2]cite:用于指定说明编辑的文档网址

<div class="cnblogs_code">
<pre>&lt;p&gt;一打有 &lt;del datetime="2015-12-30T00:00Z" cite="edit.html"&gt;二十&lt;/del&gt; &lt;ins&gt;十二&lt;/ins&gt; 件。&lt;/p&gt;</pre>
</div>

&nbsp;

### 特定时间

&lt;time&gt; 　　表示日期或时间

　　&lt;属性&gt;

　　[1]datatime表示确切的时间，遵循格式YYYY-MM-DDThh:mm:ssTZD，表示年-月-天-分割符T-时-分-秒-时区

　　[2]pubdate表示&lt;time&gt;元素中的日期或时间是文档的发布日期

<div class="cnblogs_code">
<pre>&lt;p&gt;我们在每天早上 &lt;time&gt;9:00&lt;/time&gt; 开始营业。&lt;/p&gt;
&lt;p&gt;我在&lt;time datetime="2008-02-14"&gt;情人节&lt;/time&gt;有个约会。&lt;/p&gt;
&lt;small&gt;Posted &lt;time datetime="2015-12-30T00:00:00UTC+08:00"&gt;&lt;/time&gt;&lt;/small&gt;</pre>
</div>

&nbsp;

### 注音标识

 　　ruby标签定义注音标识，多用于CJK文字，CJK是指中日韩统一表意文字(Chinese、Japanese、Korean)

&lt;ruby&gt; 　 &nbsp; 　表示ruby标记

&lt;rt&gt; 　　　 　表示ruby标记文字

&lt;rp&gt; 　　　　表示ruby标记括号

<div class="cnblogs_code">
<pre>&lt;ruby&gt;
 漢 &lt;rt&gt; ㄏㄢˋ &lt;/rt&gt;
&lt;/ruby&gt;</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;ruby&gt;
    汉
    &lt;rp&gt;(&lt;/rp&gt;
    &lt;rt&gt;h&agrave;n&lt;/rt&gt;
    &lt;rp&gt;)&lt;/rp&gt;
    语
    &lt;rp&gt;(&lt;/rp&gt;
    &lt;rt&gt;yǔ&lt;/rt&gt;
    &lt;rp&gt;)&lt;/rp&gt;    
&lt;/ruby&gt;</pre>
</div>

&nbsp;

### 文字方向

&lt;bdi&gt;　　 忽略周围文字方向的文字
&lt;bdo&gt;　　	覆盖两种方向的设置，允许显式设置方向，并覆盖所有其他当前方向

<div class="cnblogs_code">
<pre>&lt;p&gt;When rendered by a browser, &lt;bdo dir="rtl"&gt;these words&lt;/bdo&gt; will appear as 'sdroweseht'&lt;/p&gt;</pre>
</div>

&nbsp;

### 代码

&lt;code&gt; 　　　&nbsp;表示计算机代码
&lt;kbd&gt;	　　　 &nbsp;定义键盘码
&lt;samp&gt;	　　 &nbsp; 定义计算机例子代码
&lt;tt&gt;	　　　　 &nbsp;定义打字机代码
&lt;var&gt;　　　　	定义变量

<div class="cnblogs_code">
<pre>&lt;p&gt;
    &lt;code&gt;Computer code&lt;/code&gt;
    &lt;br /&gt;
    &lt;kbd&gt;Keyboard input&lt;/kbd&gt;
    &lt;br /&gt;
    &lt;tt&gt;Teletype text&lt;/tt&gt;
    &lt;br /&gt;
    &lt;samp&gt;Sample text&lt;/samp&gt;
    &lt;br /&gt;
    &lt;var&gt;Computer variable&lt;/var&gt;
    &lt;br /&gt;
&lt;/p&gt;</pre>
</div>

&nbsp;

### 例子演示

　　&nbsp;&lt;演示框&gt;点击下列相应标签名可进行演示

<iframe src="http://demo.xiaohuochai.site/html/inline/i111.html" frameborder="0" width="100%" height="350"></iframe>

