# HTML内联元素

&emsp;&emsp;用于标记段落里的文本和其他内容组的元素种类很多，本文将这些文本级元素进行简单分类，便于整理和记忆

&nbsp;

### 通用容器

&emsp;&emsp;`<span>`元素是短语内容的通用行内容器，并没有任何特殊语义。可以使用它来编组元素以达到某种样式意图(通过使用类或者Id属性)，或者这些元素有着共同的属性，比如`lang`。应该在没有其他合适的语义元素时才使用它。`<span>`与`<div>`元素很相似，但`<div>`是一个块元素而<span>则是行内元素

```
<p>Some <span>text</span></p>
```

&nbsp;

### 强调重要

&emsp;&emsp;虽然浏览器通常用斜体和粗体来显示`em`和`strong`，但这些元素不应用作加粗和斜体。这两个元素分别用来提升包含内容的强调程度和重要性

`<em>`&emsp;&emsp;表示强调，`<em>`元素是可以嵌套的，嵌套层次越深，则其包含的内容被认定为越需要着重阅读

`<strong>`&emsp;&emsp;表示重要


```
<p>I am <em>very</em> worried!</p>
<strong>warning</strong>
```

&nbsp;

### 文字间隔

&emsp;&emsp;`i`和`b`元素历来是用来展示粗体和斜体字体的，但在HTML5中，它们有了新的语义

`<i>`

&emsp;&emsp;1、表示不同情绪或声音的文本，如内心对白

```
<p>Simon smirked,"Yes,I'm happy to take the garbage out." <i>Ugh,I <em>really</em> don't want to !</i> he thought as he picked up the garbage bag.</p>
```

&emsp;&emsp;2、表示外来语、分类学名和技术术语等

```
<i lang="fr">Oh la la!</i>
```

&nbsp;

`<b>`

&emsp;&emsp;1、用于分隔文字

```
<p>After bringing <b>water</b> to a boil, add <b>potatoes</b> and <b>carrots</b></p>
```

&emsp;&emsp;2、用于文章或故事的引言

```
<p><b class="lede">Meteorologists predict more sunshine and scorching temperatures for the upcoming week, prompting area farmers to install irrigation systems.</b></p>
```

&nbsp;

### 不精确文字

`<s>`&emsp;&emsp;在HTML5中重新定义为有错的、过时的、不被建议使用的文本，常用于表示价格变动等

```
<p>价格<s>￥1298</s>￥998！</p>
<p><s>37度</s> <strong>41度</strong></p>    
```

&nbsp;

### 高亮显示

`<mark>`&emsp;&emsp;表示高亮或用于引用而标记的文字

```
<p><mark>We're all hoping it rains soon</mark>, some farmers have installed irrigation systems, at <em>considerable</em> expense</p>
```

&nbsp;

### 次要评论

`<small>`&emsp;&emsp;表示旁注，可用于免责声明、使用条款和版权信息等需要小字体的场景

```
<small>图片仅供参考，请以实物为准</small>
<small>Chris Elhorn | The city Press</small>
```

&nbsp;

### 术语处理

`<dfn>`&emsp;&emsp;用来定义术语

```
<p>The term <dfn>organic food</dfn> refers to food produced without synthetic chemicals</p>
```

&nbsp;

`<abbr>`&emsp;&emsp;缩写词，可以配合`<dfn>`定义术语

```
<p>The <dfn><abbr title="Garage Door Operner">GDO</abbr></dfn> id a device allows off-world teams to open the iris.</p>
```

&nbsp;

### 引用

`<cite>`&emsp;&emsp;表示作品标题的引用，可以是书影音画等

```
<p>我最喜欢的电影是<cite>千与千寻</cite></p>
```

&nbsp;

`<q>`&emsp;&emsp;表示短引用，常用于引用别人说的话，用引号可以表达等价语义

```
<p>The judge said <q>You can drink water form the fish tank</q> but advised against it.</p>
```

&nbsp;

### 换行

`<br>`&emsp;&emsp;换行

&emsp;&emsp;注意：`<br>`标签是文本级语义元素，可以设置行高和字体大小，但设置宽高无效

```
<p>
    <b>The City Press</b><br />
    123 General Street <br />
    Springfield, OH 45501
</p>
```

`<wbr>`&emsp;&emsp;需要时指定单词可以换行的位置

```
<i>Irrigation<wbr /> Direct</i>
```

&nbsp;

### 上标下标

&emsp;&emsp;这两个标签在数学等式、科学符号和化学公式中非常有用

`<sup>`&emsp;&emsp;表示上标

```
<p>
    a<sup>2</sup>
    +
    b<sup>2</sup>
    =
    c<sup>2</sup>
</p>
```

&nbsp;

`<sub>`&emsp;&emsp;表示下标

```
<p>
    H<sub>2</sub>
    SO<sub>4</sub>
</p>
```

&nbsp;

### 文本删改

&emsp;&emsp;如果要表示文档的增删改记录，则应该使用ins和del标签

`<ins>`&emsp;&emsp;文档中插入的内容

`<del>`&emsp;&emsp;文档中删除的内容

&emsp;&emsp;注意：`<ins>`和`<del>`可以嵌套任何元素

【属性】

&emsp;&emsp;1、`datetime`:用于标明编辑的日期和可选的时间

&emsp;&emsp;2、`cite`:用于指定说明编辑的文档网址

```
<p>一打有 <del datetime="2015-12-30T00:00Z" cite="edit.html">二十</del> <ins>十二</ins> 件。</p>
```

&nbsp;

### 特定时间

`<time>`&emsp;&emsp;表示日期或时间

【属性】

&emsp;&emsp;1、`datatime`表示确切的时间，遵循格式YYYY-MM-DDThh:mm:ssTZD，表示年-月-天-分割符T-时-分-秒-时区

&emsp;&emsp;2、`pubdate`表示`<time>`元素中的日期或时间是文档的发布日期

```
<p>我们在每天早上 <time>9:00</time> 开始营业。</p>
<p>我在<time datetime="2008-02-14">情人节</time>有个约会。</p>
<small>Posted <time datetime="2015-12-30T00:00:00UTC+08:00"></time></small>
```

&nbsp;

### 注音标识

&emsp;&emsp;`ruby`标签定义注音标识，多用于CJK文字，CJK是指中日韩统一表意文字(Chinese、Japanese、Korean)

`<ruby>`&emsp;&emsp;表示ruby标记

`<rt>`&emsp;&emsp;表示ruby标记文字

`<rp>`&emsp;&emsp;表示ruby标记括号

```
<ruby>
 漢 <rt> ㄏㄢˋ </rt>
</ruby>
```
```
<ruby>
  汉
  <rp>(</rp>
  <rt>hàn</rt>
  <rp>)</rp>
  语
  <rp>(</rp>
  <rt>yǔ</rt>
  <rp>)</rp>    
</ruby>
```

&nbsp;

### 文字方向

`<bdi>`&emsp;&emsp;忽略周围文字方向的文字

`<bdo>`&emsp;&emsp;覆盖两种方向的设置，允许显式设置方向，并覆盖所有其他当前方向

```
<p>When rendered by a browser, <bdo dir="rtl">these words</bdo> will appear as 'sdroweseht'</p>
```

&nbsp;

### 代码

`<code>`&emsp;&emsp;表示计算机代码

`<kbd>`&emsp;&emsp;定义键盘码

`<samp>`&emsp;&emsp;定义计算机例子代码

`<tt>`&emsp;&emsp;定义打字机代码

`<var>`&emsp;&emsp;定义变量

```
<p>
  <code>Computer code</code>
  <br />
  <kbd>Keyboard input</kbd>
  <br />
  <tt>Teletype text</tt>
  <br />
  <samp>Sample text</samp>
  <br />
  <var>Computer variable</var>
  <br />
</p>
```

&nbsp;

### 例子演示

&emsp;&emsp;【演示框】点击下列相应标签名可进行演示

<iframe src="https://demo.xiaohuochai.site/html/inline/i111.html" frameborder="0" width="100%" height="350"></iframe>

