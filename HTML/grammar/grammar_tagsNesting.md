# HTML标签嵌套规则

 　　在html5中，&lt;a&gt;元素的子元素可以是块级元素，这在以前是被认为不符合规则的。本文将详细介绍html5的标签嵌套规则

&nbsp;

### 分类

 　　html5出现之前，经常把元素按照block、inline、inline-block来区分。在html5中，元素不再按照display属性来区分，而是按照[内容模型](http://www.cnblogs.com/xiaohuochai/p/5046584.html)来区分，分为元数据型(metadata content)、区块型(sectioning content)、标题型(heading content)、文档流型(flow content)、语句型(phrasing content)、内嵌型(embedded content)、交互型(interactive content)。元素不属于任何一个类别，被称为穿透的；元素可能属于不止一个类别，称为混合的。

![标签嵌套]({{book.pic}}/blog/HTML_grammar_tagsNesting.png)

&nbsp;

**元数据元素**(metadata content)是可以被用于说明其他内容的表现或行为，或者在当前文档和其他文档之间建立联系的元素

<div class="cnblogs_code">
<pre>base link meta noscript script style template title</pre>
</div>

**流元素**(flow content)是在应用程序和文档的主体部分中使用的大部分元素

<div class="cnblogs_code">
<pre>a abbr address area(如果它是map元素的子元素) article aside audio b bdi bdo blockquote br button canvas cite code data datalist del dfn div dl em embed fieldset figure footer form h1 h2 h3 h4 h5 h6 header hr i iframe img input ins kbd keygen label main map mark math meter nav noscript object ol output p pre progress q ruby s samp script section select small span strong sub sup svg table template textarea time u ul var video wbr text</pre>
</div>

**区块型元素**(sectioning content)是用于定义标题及页脚范围的元素

<div class="cnblogs_code">
<pre>article aside nav section</pre>
</div>

**标题型元素**(heading content)定义一个区块/章节的标题

<div class="cnblogs_code">
<pre>h1 h2 h3 h4 h5 h6</pre>
</div>

**语句型元素**(phrasing content)是用于标记段落级文本的元素

<div class="cnblogs_code">
<pre>a abbr area (如果它是map元素的子级) audio b bdi bdo br button canvas cite code data datalist del dfn em embed i iframe img input ins kbd keygen label map mark math meter noscript object output progress q ruby s samp script select small span strong sub sup svg template textarea time u var video wbr text</pre>
</div>

**嵌入型元素**(embedded content)是引用或插入到文档中其他资源的元素

<div class="cnblogs_code">
<pre>audio canvas embed iframe img math object svg video</pre>
</div>

**交互型元素**(interactive content)是专门用于与用户交互的元素

<div class="cnblogs_code">
<pre>a audio(如果设置了controls属性) button embed iframe img(如果设置了usemap属性) input(如果type属性不为hidden) keygen label object(如果设置了usemap属性) select textarea video (如果设置了controls属性)</pre>
</div>

&nbsp;

### 子元素

【1】子元素是流元素

<div class="cnblogs_code">
<pre>&lt;article&gt;、&lt;section&gt;、&lt;blockquote&gt;、&lt;li&gt;、&lt;dd&gt;、&lt;figcaption&gt;、&lt;div&gt;、&lt;main&gt;、&lt;td&gt;</pre>
</div>

　　【1.1】子元素是流元素，不包括&lt;main&gt;元素

<div class="cnblogs_code">
<pre>&lt;aside&gt;、&lt;nav&gt;</pre>
</div>

　　【1.2】子元素是流元素，但不包括&lt;table&gt;元素

<div class="cnblogs_code">
<pre>&lt;caption&gt;</pre>
</div>

　　【1.3】子元素是流元素，但不包括&lt;form&gt;元素

<div class="cnblogs_code">
<pre>&lt;form&gt;</pre>
</div>

　　【1.4】子元素是流元素，但不包括&lt;header&gt;、&lt;footer&gt;、&lt;main&gt;元素

<div class="cnblogs_code">
<pre>&lt;header&gt;、&lt;footer&gt;、&lt;main&gt;</pre>
</div>

　　【1.5】子元素是流元素，但不包括&lt;header&gt;、&lt;footer&gt;、区块型元素(sectioning content)、标题型元素(heading content)

<div class="cnblogs_code">
<pre>&lt;dt&gt;、&lt;th&gt;</pre>
</div>

　　【1.6】子元素是流元素，但不包括&lt;header&gt;、&lt;footer&gt;、&lt;address&gt;、区块型元素(sectioning content)、标题型元素(heading content)

<div class="cnblogs_code">
<pre>&lt;address&gt;</pre>
</div>

　　【1.7】子元素是一个&lt;figcaption&gt;元素，紧跟着流元素

<div class="cnblogs_code">
<pre>&lt;figure&gt;</pre>
</div>

　　【1.8】子元素是一个&lt;legend&gt;元素，紧跟着流元素

<div class="cnblogs_code">
<pre>&lt;filedset&gt;</pre>
</div>

&nbsp;

【2】子元素是语句型元素

<div class="cnblogs_code">
<pre>&lt;h1&gt;、&lt;h2&gt;、&lt;h3&gt;、&lt;h4&gt;、&lt;h5&gt;、&lt;h6&gt;、&lt;p&gt;、&lt;pre&gt;、&lt;em&gt;、&lt;strong&gt;、&lt;small&gt;、&lt;s&gt;、&lt;cite&gt;、&lt;q&gt;、&lt;abbr&gt;、&lt;data&gt;、&lt;time&gt;、&lt;code&gt;、&lt;var&gt;、&lt;samp&gt;</span>、&lt;kbd&gt;、&lt;sub&gt;、&lt;sup&gt;、&lt;i&gt;、&lt;b&gt;、&lt;u&gt;、&lt;mark&gt;、&lt;bdi&gt;、&lt;bdo&gt;、&lt;span&gt;、&lt;input&gt;、&lt;output&gt;、&lt;legend&gt;、&lt;label&gt;</pre>
</div>

　　【2.1】子元素是语句型元素，但不包括和自身相同的元素

<div class="cnblogs_code">
<pre>&lt;dfn&gt;、&lt;progress&gt;、&lt;meter&gt;</pre>
</div>

　　【2.2】子元素是语句型元素，但不包括交互型元素(interactive content)

<div class="cnblogs_code">
<pre>&lt;button&gt;</pre>
</div>

&nbsp;

【3】子元素是transparent(以它的父元素允许的子元素为准)

<div class="cnblogs_code">
<pre>&lt;ins&gt;、&lt;del&gt;、&lt;map&gt;</pre>
</div>

　　【3.1】子元素是transparent(以它的父元素允许的子元素为准)，但不包括交互型元素(interactive content)

<div class="cnblogs_code">
<pre>&lt;a&gt;</pre>
</div>

　　【3.2】子元素可以没有、可以是&lt;param&gt;元素，也可以是transparent(以它的父元素允许的子元素为准)

<div class="cnblogs_code">
<pre>&lt;object&gt;</span></pre>
</div>

&nbsp;

【4】无子元素

<div class="cnblogs_code">
<pre>&lt;hr&gt;、&lt;br&gt;、&lt;wbr&gt;、&lt;img&gt;、&lt;embed&gt;、&lt;param&gt;、&lt;source&gt;、&lt;track&gt;、&lt;area&gt;、&lt;col&gt;、&lt;keygen&gt;</pre>
</div>

　　【4.1】子元素可以没有、可以是&lt;li&gt;元素，也可以是&lt;script&gt;、&lt;template&gt;元素

<div class="cnblogs_code">
<pre>&lt;ol&gt;、&lt;ul&gt;</pre>
</div>

　　【4.2】子元素可以没有、可以是&lt;dt&gt;和&lt;dd&gt;元素，也可以是&lt;script&gt;、&lt;template&gt;元素

<div class="cnblogs_code">
<pre>&lt;dl&gt;</pre>
</div>

　　【4.3】子元素可以没有，可以是&lt;option&gt;、&lt;optgroup&gt;，也可以是&lt;script&gt;、&lt;template&gt;元素

<div class="cnblogs_code">
<pre>&lt;select&gt;</span></pre>
</div>

　　【4.4】子元素可以没有，可以是&lt;option&gt;，也可以是&lt;script&gt;、&lt;template&gt;元素

<div class="cnblogs_code">
<pre>&lt;optgroup&gt;</pre>
</div>

　　【4.5】子元素可以没有、可以是&lt;option&gt;元素

<div class="cnblogs_code">
<pre>&lt;datalist&gt;</pre>
</div>

　　【4.6】子元素可以没有、也可以是&lt;track&gt;元素，也可以是&lt;source&gt;元素

<div class="cnblogs_code">
<pre>&lt;audio&gt;、&lt;video&gt;</pre>
</div>

　　【4.7】子元素可以没有，也可以是&lt;col&gt;、&lt;template&gt;元素

<div class="cnblogs_code">
<pre>&lt;colgroup&gt;</pre>
</div>

　　【4.8】子元素可以没有，可以是&lt;tr&gt;，也可以是&lt;script&gt;、&lt;template&gt;元素

<div class="cnblogs_code">
<pre>&lt;tbody&gt;、&lt;thead&gt;、&lt;tfoot&gt;</pre>
</div>

　　【4.9】子元素可以没有，可以是&lt;tr&gt;、&lt;th&gt;，也可以是&lt;script&gt;、&lt;template&gt;元素

<div class="cnblogs_code">
<pre>&lt;tr&gt;</pre>
</div>

&nbsp;

【5】子元素是&lt;caption&gt;、&lt;colgroup&gt;、&lt;thead&gt;、&lt;tfoot&gt;、&lt;tbody&gt;，也可以是&lt;script&gt;、&lt;template&gt;元素

<div class="cnblogs_code">
<pre>&lt;table&gt;</pre>
</div>

&nbsp;

【6】子元素是文本内容

<div class="cnblogs_code">
<pre>&lt;textarea&gt;</pre>
</div>

　　【6.1】子元素可以没有，也可以是文本内容

<div class="cnblogs_code">
<pre>&lt;option&gt;</pre>
</div>

&nbsp;

### 总结

 　　关于每个元素的详细嵌套规则，上部分已经详细介绍。这部分主要对常用标签的嵌套规则进行总结


【1】&lt;h1&gt;、&lt;h2&gt;、&lt;h3&gt;、&lt;h4&gt;、&lt;h5&gt;、&lt;h6&gt;、&lt;p&gt;的子元素是<span style="background-color: #888888;" title="a abbr area (如果它是map元素的子级) audio b bdi bdo br button canvas cite code data datalist del dfn em embed i iframe img input ins kbd keygen label map mark math meter noscript object output progress q ruby s samp script select small span strong sub sup svg template textarea time u var video wbr text">语句型元素</span>

【2】&lt;header&gt;、&lt;footer&gt;不可嵌套&lt;header&gt;、&lt;footer&gt;

【3】&lt;a&gt;的子元素是transparent(以它的父元素允许的子元素为准)，但不包括<span style="background-color: #888888;" title="a audio(如果设置了controls属性) button embed iframe img(如果设置了usemap属性) input(如果type属性不为hidden) keygen label object(如果设置了usemap属性) select textarea video (如果设置了controls属性)">交互型元素</span>(interactive content)

【4】&lt;form&gt;不可嵌套&lt;form&gt;

【5】&lt;button&gt;子元素是<span style="background-color: #888888;" title="a abbr area (如果它是map元素的子级) audio b bdi bdo br button canvas cite code data datalist del dfn em embed i iframe img input ins kbd keygen label map mark math meter noscript object output progress q ruby s samp script select small span strong sub sup svg template textarea time u var video wbr text">语句型元素</span>，不可嵌套<span style="background-color: #888888;" title="a audio(如果设置了controls属性) button embed iframe img(如果设置了usemap属性) input(如果type属性不为hidden) keygen label object(如果设置了usemap属性) select textarea video (如果设置了controls属性)">交互型元素</span>(interactive content)

【6】&lt;caption&gt;不可嵌套&lt;table&gt;

【7】&lt;dt&gt;、&lt;th&gt;不可嵌套&lt;header&gt;、&lt;footer&gt;、<span style="background-color: #888888;" title="article aside nav section">区块型元素</span>(sectioning content)、<span style="background-color: #888888;" title="h1 h2 h3 h4 h5 h6">标题型元素</span>(heading content)

