# 引入CSS

&emsp;&emsp;Web早期，HTML是一种很有限的语言，这种语言不关心外观，它只是一种简洁的小型标记机制。随着Mosaic网页浏览器的出现，网站开始到处涌现。对于页面改变外观的需求增加，于是增加了类似&lt;font&gt;和&lt;big&gt;之类的标记元素。几年之后，大多数网站标记几乎完全由表格和font元素组成，且对于所要表现的内容不能传达任何实际含义，使文档可用性降低，且不易于维护。于是1995年，W3C发布了CSS草案，试图解决结构与样式混杂的问题。1996年，W3C正式推出CSS1。1998年，推出CSS2。2001年从CSS3开始，CSS这门语言分割成多个独立的模块，每个模块独立分级，且只包含一小部分功能；2011年开始设计CSS4

&emsp;&emsp;本文将主要介绍引入CSS样式的方式，包括外部样式表、内部样式表和行间样式三种方式

&emsp;&emsp;注意：CSS语法非常简单，但容易忽略的一点是不能省略分号(最后一个样式除外)

&nbsp;

### 外部样式表

【使用link标记】

&emsp;&emsp;在link标记中rel和href属性是必须的，type属性和media属性可省略

<div>
<pre>&lt;link rel="stylesheet" type="text/css" href="sheet1.css" media="all" /&gt;</pre>
</div>
<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;link rel="stylesheet" href="sheet1.css"&gt;
&lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;&lt;/body&gt;    
&lt;/html&gt;    </pre>
</div>
<div>
<pre>body{
    background-color: red;
}</pre>
</div>

&emsp;&emsp;注意：样式表中不能包含HTML标记语言，只能有CSS规则和CSS注释

<div>
<pre>/*若CSS文件中存在除了CSS样式和CSS注释的其他标记，则会导致在该标记后面的CSS样式将无法被识别*/
&lt;style&gt;&lt;/style&gt;
body{
    background-color: red;
}</pre>
</div>

&emsp;&emsp;CSS注释只支持/**/的写法，不支持//的写法

【多个样式表】

&emsp;&emsp;一个文档可能关联多个样式表，如果是这样，文档最初显示时只会使用rel为stylesheet的link标记

<div>
<pre>&lt;link rel="stylesheet" href="sheet1.css" /&gt;
&lt;link rel="stylesheet" href="sheet2.css" /&gt;</pre>
</div>
<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;link rel="stylesheet" href="sheet1.css"&gt;
&lt;link rel="stylesheet" href="sheet2.css"&gt;
&lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;/body&gt;    
&lt;/html&gt;</pre>
</div>
<div>
<pre>/*sheet1*/
body{
    background-color: red;
}</pre>
</div>
<div>
<pre>/*sheet2*/
body{
    height: 100px;
    border: 10px solid black;
}</pre>
</div>

![manyCSS](https://pic.xiaohuochai.site/blog/CSS_grammer_inlineStyle.jpg)

【候选样式表】

&emsp;&emsp;将rel属性的设置为alternate stylesheet可以定义候选样式表，只有在用户选择这个样式表时才会用于文档表现。如果浏览器能使用候选样式表，它会使用link元素的title属性值生成一个候选样式列表，可在菜单栏中查看-&gt;样式中进行选择。(IE和firefox支持)

&emsp;&emsp;注意：若一个候选样式表没有设置title，那么它将无法在候选样式列表中出现，则无法被引用　

<div>
<pre>&lt;link rel="stylesheet" type="text/css" href="sheet1.css" /&gt;
&lt;link rel="alternate stylesheet" type="text/css" href="sheet2.css" title="sheet2"/&gt;</pre>
</div>
<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;link rel="stylesheet" type="text/css" href="sheet1.css" /&gt;
&lt;link rel="alternate stylesheet" type="text/css" href="sheet2.css" title="sheet2"/&gt;
&lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;/body&gt;    
&lt;/html&gt;</pre>
</div>
<div>
<pre>/*sheet1*/
body{
    background-color: red;
}</pre>
</div>
<div>
<pre>/*sheet2*/
body{
    height: 100px;
    border: 10px solid black;
}</pre>
</div>

![alternate](https://pic.xiaohuochai.site/blog/CSS_grammer_alternate.gif)

&nbsp;

### 内部样式表

【使用style元素】

&emsp;&emsp;内部样式表需要使用&lt;style&gt;元素包含样式表，它在文档中单独出现。

<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;style&gt;
body{
    background-color: red;
}    
&lt;/style&gt;
&lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;/body&gt;    
&lt;/html&gt;    </pre>
</div>

【多个style标签】

&emsp;&emsp;文档中可出现多个style标签，且样式规则与层叠样式规则一致

<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;style&gt;
body{
    background-color: red;
}    
&lt;/style&gt;
&lt;style&gt;
body{
    background-color: blue;
    height: 100px;
    border: 10px solid black;
}    
&lt;/style&gt;
&lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;/body&gt;    
&lt;/html&gt;    </pre>
</div>

![manyStyle](https://pic.xiaohuochai.site/blog/CSS_grammer_manyStyle.jpg)

【使用@import指令】

&emsp;&emsp;与link类似，@import指令用于指示Web浏览器加载一个外部样式表，并在表现HTML文档时使用其样式。唯一的区别在于命令的具体语法和位置。@import指令常用于样式表需要使用另一个样式表中的样式的情况。

<div>
<pre>&lt;style&gt;
@import url(sheet2.css);
body{
    background-color: red;
}    
&lt;/style&gt;</pre>
</div>

&emsp;&emsp;注意：@import必须出现在style元素中，且要放在其他CSS规则之前，否则将根本不起作用。

<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;style&gt;
/*将@import放置在CSS规则之后将不起使用*/
body{
    background-color: red;
}    
@import url(sheet2.css);
&lt;/style&gt;
&lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;/body&gt;    
&lt;/html&gt;    </pre>
</div>

【多个@import指令】

&emsp;&emsp;可以使用@import指令导入多个CSS样式表，且可以使用media来限制应用场景。

<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;style&gt;
@import url(sheet1.css) all;    
@import url(sheet2.css);
&lt;/style&gt;
&lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;/body&gt;    
&lt;/html&gt;        </pre>
</div>

&nbsp;

### 行间样式

&emsp;&emsp;如果只是想为单个元素指定一些样式，可以使用HTML的style属性来设置一个行间样式。

<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body style="background-color: red; height: 100px; border: 10px solid black;" style="background-color: red;"&gt;
&lt;/body&gt;    
&lt;/html&gt;    </pre>
</div>

&emsp;&emsp;注意：行间样式若存在多个style属性，只能识别第一个

<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;!-- 只能识别第一个style属性的值，所以页面显示为红色--&gt;
&lt;body style="background-color: red; height: 100px; border: 10px solid black;" style="background-color: blue;"&gt;
&lt;/body&gt;    
&lt;/html&gt;    </pre>
</div>

![inlineStyle](https://pic.xiaohuochai.site/blog/CSS_grammer_inlineStyle.jpg)
<div>&nbsp;</div>

## 最后

&emsp;&emsp;关于CSS的优先级先后问题，与外部、内部、行间这三种引入CSS的方式关系不大，主要与重要性、特殊性和出现顺序有关。在重要性相等的情况下，行间样式的优先级最高，外部样式和内部样式无可比性。关于优先级的详细内容[移步至此](http://www.cnblogs.com/xiaohuochai/p/4984509.html)

&emsp;&emsp;注意：&lt;style&gt;标签和&lt;link&gt;标签可以写在&lt;body&gt;标签里面
