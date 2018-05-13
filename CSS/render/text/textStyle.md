# CSS中常见的6种文本样式

&emsp;&emsp;CSS文本样式是相对于内容进行的样式修饰。由于在[层叠关系](http://www.cnblogs.com/xiaohuochai/p/5304619.html#anchor2)中，内容要高于背景。所以文本样式相对而言更加重要。有些人对文本和[字体样式](http://www.cnblogs.com/xiaohuochai/p/4986285.html)之间的不同不太了解，简单地讲，文本是内容，而字体则用于显示这个内容。本文将详细介绍文本相关样式

&nbsp;

### 首行缩进

**定义**

&emsp;&emsp;首行缩进是将段落的第一行缩进，这是常用的文本格式化效果。一般地，中文写作时开头空两格，类似于此

&emsp;&emsp;注意：该属性可以为负值

text-indent

&emsp;&emsp;值: &lt;length&gt; | &lt;percentage&gt; | inherit

&emsp;&emsp;初始值: 0

&emsp;&emsp;应用于: 块级元素(包括block和inline-block)

&emsp;&emsp;继承性: 有

&emsp;&emsp;百分数: 相对于包含块的宽度

<iframe style="width: 100%; height: 323px;" src="https://demo.xiaohuochai.site/css/text/t1.html" frameborder="0" width="320" height="240"></iframe>

**应用**

【悬挂缩进】

<div>
<pre>div{
    width: 200px;
    border: 1px solid black;
    text-indent: -1em;//关键代码
    padding-left: 1em;//关键代码
}
</pre>
</div>

<iframe src="https://demo.xiaohuochai.site/css/text/t2.html" frameborder="0" width="320" height="210"></iframe>

&nbsp;【首字下沉】

<div>
<pre>div{
    width: 200px;
    border: 1px solid black;
    text-indent: 0.5em;
}
div:first-letter{
    font-size: 30px;
    float: left;
}  </pre>
</div>

<iframe src="https://demo.xiaohuochai.site/css/text/t3.html" frameborder="0" width="320" height="230"></iframe>

### 水平对齐

**定义**

&emsp;&emsp;水平对齐是影响一个元素中的文本的水平对齐方式

text-align

&emsp;&emsp;值: left | center | right | justify | inherit

&emsp;&emsp;初始值: left

&emsp;&emsp;应用于: 块级元素(包括block和inline-block)

&emsp;&emsp;继承性: 有

<iframe style="width: 100%; height: 258px;" src="https://demo.xiaohuochai.site/css/text/t4.html" frameborder="0" width="320" height="240"></iframe>

**两端对齐**

&emsp;&emsp;当水平对齐方式为两端对齐时，word-spacing可能会调整，以便文本在整行中正好放下。如果为letter-spacing指定一个长度值，则letter-spacing不会受两端对齐影响，除非letter-spacing值为normal

<iframe style="width: 100%; height: 274px;" src="https://demo.xiaohuochai.site/css/text/t5.html" frameborder="0" width="320" height="240"></iframe>

**IE兼容**

&emsp;&emsp;对于IE7-浏览器来说，使用text-align不仅会改变文本的水平对齐方式，也会改变后代块级元素的水平对齐方式

<div>
<pre>.box{
    width: 200px;
    height: 200px;
    background-color: pink;
    border: 1px solid black;
    text-align: right;
}    
.in{
    height: 100px;
    width: 100px;
    background-color: lightgreen;
}</pre>
</div>
<div>
<pre>&lt;div class="box"&gt;
    &lt;div class="in"&gt;测试文字&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

![textAlignOfIE](https://pic.xiaohuochai.site/blog/CSS_layout_textAlignOfIE.gif)

### 字间隔

&emsp;&emsp;字间隔是指单词间距，用来设置文字或单词之间的间距。实际上，"字"表示的是任何非空白符字符组成的串，并由某种空白符包围

&emsp;&emsp;注意：单词之间用空格分开，单词之间的间距 = word-spacing + 空格大小

&emsp;&emsp;注意：字间隔可为负值

word-spacing

&emsp;&emsp;值: &lt;length&gt; | normal | inherit

&emsp;&emsp;初始值: normal(默认为0)

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 有

<iframe style="width: 100%; height: 268px;" src="https://demo.xiaohuochai.site/css/text/t6.html" frameborder="0" width="320" height="240"></iframe>

### 字母间隔

&emsp;&emsp;字母间隔是指字符间距

&emsp;&emsp;注意：字母间隔可为负值

letter-spacing

&emsp;&emsp;值: &lt;length&gt; | normal | inherit

&emsp;&emsp;初始值: normal(默认为0)

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 有

<iframe style="width: 100%; height: 268px;" src="https://demo.xiaohuochai.site/css/text/t7.html" frameborder="0" width="320" height="240"></iframe>

### 文本转换

&emsp;&emsp;文本转换用于处理英文的大小写转换

text-transform

&emsp;&emsp;值: uppercase(全大写) | lowercase(全小写) | capitalize(首字母大写) | none | inherit

&emsp;&emsp;初始值: none

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 有

<iframe style="width: 100%; height: 319px;" src="https://demo.xiaohuochai.site/css/text/t8.html" frameborder="0" width="320" height="240"></iframe>

### 文本修饰

**定义**

&emsp;&emsp;文本修饰用于为文本提供修饰线

&emsp;&emsp;注意：文本修饰线的颜色与文本颜色相同

text-decoration

&emsp;&emsp;值: none | [underline(下划线) || overline(上划线) || line-through(中划线)] | inherit

&emsp;&emsp;初始值: none

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 无

**继承**

&emsp;&emsp;文本修饰属性无法继承，意味着子元素文本上的任何修饰线与父元素的颜色相同。子元素文本上的修饰线实际上是父元素的，只是正好"经过"而已。

<iframe style="width: 100%; height: 268px;" src="https://demo.xiaohuochai.site/css/text/t9.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;注意：互不冲突的文本修饰线可出现多条

<iframe style="width: 100%; height: 321px;" src="https://demo.xiaohuochai.site/css/text/t10.html" frameborder="0" width="320" height="240"></iframe>

## 最后

&emsp;&emsp;在首行缩进(text-index)、水平对齐(text-align)、字间隔(word-spacing)、字母间隔(letter-spacing)、文本转换(text-transform)、文本修饰(text-decoration)这6种文本样式中，首行缩进(text-index)和水平对齐(text-align)只能够应用于块级元素(包括block和inline-block)，这是最应该注意的地方
