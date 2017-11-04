# HTML16个全局属性

  在HTML中，属性能表达相当丰富的语义，而且属性也会额外提供很多实用的功能，HTML共支持16个常见的全局属性

&nbsp;

## HTML原有属性

### accesskey

　　作用：浏览器用来创建激活或聚焦元素的快捷键

　　值：一个键盘字符如 O

　　范围：支持该属性的元素有&lt;a&gt;、&lt;area&gt;、&lt;button&gt;、&lt;input&gt;、&lt;label&gt;、&lt;legend&gt;、&lt;textarea&gt;

　　注意：使用该属性可能在新窗口打开链接时可能会被浏览器屏蔽

<div class="cnblogs_code">
<pre>&lt;div&gt;
    &lt;a href="</span>https://www.baidu.com" accesskey="b"&gt;百度&lt;/a&gt;
    &lt;a href="https://www.taobao.com" accesskey="a"&gt;阿里&lt;/a&gt;
    &lt;a href="https://www.qq.com" accesskey="t"&gt;腾讯&lt;/a&gt;    
    &lt;p&gt;快捷键(alt+b)可以跳转到百度；快捷键(alt+a)可以跳转到阿里；快捷键(alt+t)可以跳转到腾讯&lt;/p&gt;
&lt;/div&gt;</pre>
</div>

<iframe src="https://demo.xiaohuochai.site/html/16attr/h1.html" frameborder="0" width="320" height="155"></iframe>

### class

　　作用：规定元素的一个或多个类名

　　值：多个类名用空格分隔

　　注意：类名不能以数字开头

&nbsp;

### dir

　　作用：文字的方向

　　值：ltr/rtl/auto

<iframe src="https://demo.xiaohuochai.site/html/16attr/h22.html" frameborder="0" width="300" height="200"></iframe>

### id

　　作用：规定元素的唯一标识

　　注意：若浏览器中出现多个id名的情况，CSS样式对所以该id名的元素都生效，但javascript脚本仅对第一个出现该id名的元素生效

![id](https://pic.xiaohuochai.site/blog/HTML_grammar_id.gif)

### lang

　　作用：规定元素内容的语言

<div class="cnblogs_code">
<pre>en:英文
zh:中文
zh-CN：简体中文</pre>
</div>

<div>　　zh 是中文，代表的是宏语言（Macrolanguage），zh 单独用表示中文整体，可以是方言、文言文、简繁体等混合内容。理论上 zh-CN 表示的是中国大陆中文，包含方言和简繁体，但默认指简体普通话。为了精准性，应该用独立语种替换，包括但不仅限于普通话和七大方言：</div>

<div class="cnblogs_code">
<pre>cmn 普通话（官话、国语）
wuu 吴语（江浙话、上海话）、czh 徽语（徽州话、严州话、吴语-徽严片）
hak 客家语
yue 粤语（广东话）
nan 闽南语（福建话、台语）、cpx 莆仙话（莆田话、兴化语）、cdo 闽东语、mnp 闽北语、zco 闽中语
gan 赣语（江西话）
hsn 湘语（湖南话）
cjy 晋语（山西话、陕北话）
</span></pre>
</div>

　　以下所有 zh 开头写法已于 2009 年废弃，因为在语言学的分类上，中国语言学者多认为吴语、粤语、闽语等是汉语的方言，而西方学者多认为这些语言是一门和汉语同级关系的单独语种

　　以下两种写法均正确，后者描述更精准，但目前浏览器和操作系统都只支持前者，使用新标准可能会造成无法匹配浏览器用户定义字体、网页翻译、程序语言自动切换等功能，为了兼容性推荐使用前者

<div class="cnblogs_code">
<pre>zh-CN 中文 (简体, 中国大陆) 对应 cmn-Hans-CN 普通话 (简体, 中国大陆)
zh-SG 中文 (简体, 新加坡)   对应 cmn-Hans-SG 普通话 (简体, 新加坡)
zh-HK 中文 (繁体, 香港)     对应 cmn-Hant-HK 普通话 (繁体, 香港)
zh-MO 中文 (繁体, 澳门)     对应 cmn-Hant-MO 普通话 (繁体, 澳门)
zh-TW 中文 (繁体, 台湾)     对应 cmn-Hant-TW 普通话 (繁体, 台湾)
</pre>
</div>

&nbsp;



### style

 　　作用：设置元素的行间样式</span>

&nbsp;

### tabindex

　　作用：规定元素的tab键次序

　　值：&lt;number&gt;(1是第一个)

<div class="cnblogs_code">
<pre>&lt;div&gt;
    &lt;a href="https://www.baidu.com" tabindex="3"&gt;百度&lt;/a&gt;
    &lt;a href="https://www.taobao.com" tabindex="2"&gt;阿里&lt;/a&gt;
    &lt;a href="https://www.qq.com" tabindex="1"&gt;腾讯&lt;/a&gt;   
&lt;/div&gt;</pre>
</div>

<iframe src="https://demo.xiaohuochai.site/html/16attr/h3.html" frameborder="0" width="300" height="200"></iframe>

### title

　　作用：规定关于元素的额外信息，鼠标移到元素上时显示一段提示文本

![title](https://pic.xiaohuochai.site/blog/HTML_grammar_title.gif)　

&nbsp;

## HTML5新增属性

### contenteditable

　　作用：指定是否可以在浏览器里编辑内容

　　值：true/false

　　注意：设置document.designMode ='on'时，页面的任意位置都可以编辑；使用contenteditable ='true'则只对具体元素和其包含的元素起作用

　　移动端：移动端ios5以及android3之后才支持该属性
![contenteditable](https://pic.xiaohuochai.site/blog/HTML_grammar_contenteditable.gif)

<iframe src="https://demo.xiaohuochai.site/html/16attr/h4.html" frameborder="0" width="300" height="200"></iframe>

　　&lt;演示框&gt;</span>选中文字后，点击下列相应属性值可进行演示</span>

<iframe src="https://demo.xiaohuochai.site/html/16attr/h5.html" frameborder="0" width="300" height="200"></iframe>

### contextmenu(没有浏览器支持)

　　作用：跟元素关联的右键菜单

　　值：&lt;menu&gt;元素中唯一ID

&nbsp;

### data-*

　　作用：用于存储页面或应用程序的私有定制数据

　　注意：属性名不应包含任何大写字母，且在前缀"data-"之后必须有至少一个字符；属性值可以是任意字符串

　　使用：可以在所有浏览器中使用getAttribute方法来获取data-*属性的值，也可以使用javascript中dataset属性访问data-*属性的值，不过IE10-浏览器不支持dataset

&nbsp;

### draggable(IE8-不支持)

　　作用：用户是否可以拖动元素

　　值：true/false/auto

　　注意：链接和图像默认是可拖动的

&nbsp;

### dropzone(所有浏览器都不支持)

　　作用：规定在拖动被拖动数据时是否进行复制、移动或链接

　　值：copy拷贝/move移动/link指向原始数据链接

&nbsp;

### hidden(IE7-不支持)

　　作用：显示或隐藏该元素(与display:none的作用一样)

　　值：hidden="" || hidden= "hidden"

&nbsp;

### spellcheck(IE9-不支持)　

　　作用：规定是否对元素进行拼写和语法检查，对拼写错误的单词会在其下方出现红线

　　范围：可编辑区域（表单或contenteditable元素）

　　值：true/false

　　注意：移动端支持不好



### translate(所有浏览器都不支持)

　作用：规定是否应该翻译元素内容

　值：yes/no

