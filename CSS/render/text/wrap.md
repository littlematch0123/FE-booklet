# 深入理解CSS中的空白符和换行

&emsp;&emsp;CSS3新增了两个换行属性word-wrap和word-break。把空白符和换行放在一起说，是因为实际上空白符是包括换行的，且常用的文本不换行是使用的空白符的属性white-space: nowrap;到底它们还有些什么属性值，以及有什么对应的用法呢？本文就空白符和换行的内容做详细介绍和梳理

&nbsp;

### 空白符

**定义**

&emsp;&emsp;空白符是指空格、制表符和回车；HTML默认已经把所有空白符合并成一个空格

white-space

&emsp;&emsp;值: normal | nowrap | pre | pre-wrap | pre-line | inherit

&emsp;&emsp;初始值: normal

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 有

<div>
<pre>normal: 合并空白符，允许自动换行
nowrap: 合并空白符，不允许自动换行
pre-line: 合并空白符(不包括换行符)，允许自动换行
pre: 不合并空白符，不允许自动换行
pre-wrap: 不合并空白符，允许自动换行(在pre基础上，保留自动换行) </pre>
</div>

&emsp;&emsp;注意：&lt;pre&gt;元素默认带有样式white-space: pre;

&emsp;&emsp;注意：IE7-浏览器不支持pre-line和pre-wrap这两个属性值

<div>
<pre>&lt;div&gt;They can stay 72-hours 
    within the Shandong      province after they have entered China via the Qingdao International Airport.&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 380px;" src="https://demo.xiaohuochai.site/css/wrap/w1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 文本换行

&emsp;&emsp;浏览器自身带有文本自动换行的功能，文本容器的右侧可以实现自动换行

&emsp;&emsp;对于英文来说，浏览器会在半角空格或连字符的地方自动换行，而不会在单词的中间突然换行

&emsp;&emsp;对于中文来说，可以在任何一个文字后面换行，但浏览器碰到标点符号时，通常将标点符号以及其前一个文字作为一个整体进行换行

&emsp;&emsp;所以实际上，white-space解决不了长单词或URL地址的换行问题

word-wrap

&emsp;&emsp;word-wrap属性用来实现长单词或URL地址的自动换行

&emsp;&emsp;值: normal | break-word

&emsp;&emsp;初始值: normal

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 有

<div>
<pre>word-wrap:normal(浏览器只在半角空格或连字符的地方进行换行)
word-wrap:break-word(截断单词换行，长单词从下一行开始)</pre>
</div>

&emsp;&emsp;注意：当white-space的值是nowrap或pre时，word-break和word-wrap属性都失效

&emsp;&emsp;注意：word-wrap在标准中被改为overflow-wrap，但由于兼容问题，一般还是使用word-wrap

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/wrap/w2.html" frameborder="0" width="320" height="240"></iframe>

word-break

&emsp;&emsp;CSS3使用word-break属性来决定自动换行的处理方法。通过具体的属性设置，不仅可以让浏览器实现半角空格或连字符后面的换行，而且还可以让浏览器实现任意位置的换行。

&emsp;&emsp;值: normal | break-all | keep-all

&emsp;&emsp;初始值: normal

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 有

<div>
<pre>normal: 中文到边界上的汉字换行，英文从整个单词换行
break-all: 对于英文长单词来说，会截断单词换行，长单词占据当前行剩余空间。但对于中文的处理，各浏览器不一致
    1]firefox及safari: 中文到边界上的汉字换行，且允许标点置于段首
    2]IE及chrome: 中文到边界上的汉字换行，但不允许标点置于段首
keep-all: 对于英文长文本不能换行，但对于中文的处理，各浏览器不一致
    1]firefox: 在空白符处换行
    2]IE及chrome: 在空白符及标点处换行
    3]safari: 不支持</pre>
</div>

&emsp;&emsp;注意：移动端目前基本都不支持keep-all值&emsp;&emsp;

&emsp;&emsp;注意：当word-break值为break-all时，word-wrap属性失效；否则两个属性都起作用

<iframe style="width: 100%; height: 440px;" src="https://demo.xiaohuochai.site/css/wrap/w3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 表格

&emsp;&emsp;对于表单元格的长文本来说，使用word-wrap或word-break来强制换行需要设置table-layout:fixed

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/wrap/w4.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 伪元素换行

&emsp;&emsp;有一个Unicode字符，是专门代表换行符的:0x000A，在CSS中，写作'\000A'，可以简写为'\A'

&emsp;&emsp;但是，由于浏览器会合并空白符。因此，需要使用pre来阻止空白符的合并

&emsp;&emsp;下面是一个实例

<div>
<pre>&lt;style&gt;
dt,dd{display:inline;}
dd{margin: 0;font-weight:bold;}
dd+dt::before{content:'\A';white-space:pre;}
dd+dd::before{content:',';font-weight:normal;}
&lt;/style&gt;
&lt;dl&gt;
  &lt;dt&gt;姓名:&lt;/dt&gt;
  &lt;dd&gt;小火柴&lt;/dd&gt;
  &lt;dt&gt;邮箱:&lt;/dt&gt;
  &lt;dd&gt;123@qq.com&lt;/dd&gt;
  &lt;dd&gt;123@163.com&lt;/dd&gt;  
&lt;/dl&gt;</pre>
</div>

<iframe style="width: 100%; height: 70px;" src="https://demo.xiaohuochai.site/css/wrap/w5.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

## 最后

&emsp;&emsp;我个人理解，空白符(white-space)最常用的功能是nowrap，即不换行；而CSS3新增的两个属性word-wrap和word-break主要用于解决长文本换行的问题。word-wrap:break-word截断长文本换行，长文本从下一行开始；word-break:break-all也用于截断长文本换行，但长文本会占据当前行剩余空间

&emsp;&emsp;当然，空白符(white-space)除了nowrap，还有其他的一些属性值。word-wrap和word-break也有针对中文的处理。但由于浏览器兼容器问题，用的并不是太多

&emsp;&emsp;欢迎交流

