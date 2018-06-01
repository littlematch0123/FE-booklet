# 前端学Markdown

&emsp;&emsp;我个人理解，Markdown就是一个富文本编辑器语言，类似于sass对于css的功能，Markdown也可以叫做HTML预处理器，只不过它是一门轻量级的标记语言，可以更简单的实现HTML文档。本文将详细介绍Markdown的内容

&nbsp;

### 概述

&emsp;&emsp;Markdown的目标是实现易读易写，一份使用Markdown格式撰写的文件应该可以直接以纯文本发布

&emsp;&emsp;Markdown的语法全由一些符号所组成，它的语法种类很少，只对应HTML标记的一小部分。由于Markdown实际上就是简化版的HTML，所以直接写HTML也是可以的


&nbsp;


### 段落


&emsp;&emsp;不加任何符号的一段字符，就是一个段落。多个段落之间用空行分隔
&emsp;&emsp;注意：在markdown中，多个空行会合并为一个空行显示

    p1   

    p2

    p3


&emsp;&emsp;输出HTML为

    <p>p1</p>
    <p>p2</p>
    <p>p3</p>

&nbsp;



### 换行

&emsp;&emsp;如果段落之间没有空行，则解析为HTML标签`<br>`

    p1
    p2
    p3

&emsp;&emsp;输出HTML为

    <p>p1<br>
       p2<br>
       p3</p>


&nbsp;

### 标题

&emsp;&emsp;#、##、###、####、#####、######分别对应`<h1>`、`<h2>`、`<h3>`、`<h4>`、`<h5>`、`<h6>`。其实我个人感觉，不如直接使用`<h>`标签方便，特别是到标题3以后

    #h1
    ##h2
    ###h3
    ####h4
    #####h5
    ######h6


&emsp;&emsp;输出HTML为

    <h1>h1</h1>
    <h2>h2</h2>
    <h3>h3</h3>
    <h4>h4</h4>
    <h5>h5</h5>
    <h6>h6</h6>

&nbsp;



### 区块

&emsp;&emsp;说起区块，可能听说的人比较少。它用'>'这个符号来表示，对应于HTML中的`<blockquote>`标签，用于引用块元素。《Head first HTML And CSS》一书中，还专门针对`<blockquote>`和`<q>`进行了详细的区分，但实际用的比较少

&emsp;&emsp;但是，markdown对应区块引用的实现上，并不能完整表达`<blockquote>`标签的语义，应该可以引用多个段落，但实际上markdown的'>'符号只能引用一个段落

    >p1

    p2


&emsp;&emsp;输出HTML为

    <blockquote>
        <p>p1</p>
    </blockquote>
    <p>p2</p>



&nbsp;

### 列表

【无序列表】

&emsp;&emsp;无序列表使用星号、加号和减号来做为列表的项目标记

    * red
    * blue
    * green

    + red
    + blue
    + green

    - red
    - blue
    - green

&emsp;&emsp;输出HTML为

    <ul>
        <li>red</li>
        <li>blue</li>
        <li>green</li>
    </ul>

【有序列表】

&emsp;&emsp;有序的列表则是使用一般的数字接着一个英文句点作为项目标记

    1. Red
    2. Green
    3. Blue

&emsp;&emsp;输出HTML为

    <ol>
        <li>red</li>
        <li>blue</li>
        <li>green</li>
    </ol>

&emsp;&emsp;注意：如果在项目之间插入空行，那项目的内容会用`<p>`包起来


&nbsp;

### 分隔线

&emsp;&emsp;可以在一行中用三个以上的星号、减号、底线来建立一个分隔线，行内不能有其他东西。也可以在星号或是减号中间插入空格。下面每种写法都可以建立分隔线

    * * *
    ***
    *****
    - - -
    ---------------------------------------

&emsp;&emsp;输出HTML为

    <hr>
    <hr>
    <hr>
    <hr>
    <hr>


&nbsp;

### 链接

&emsp;&emsp;Markdown支持三种形式的链接语法：行内、参考和自动。行内和参考链接都使用角括号把文字转成链接

&emsp;&emsp;注意：由于Markdown默认产生的链接是当前页打开，且无法实现_blank，所以，就个人而言还是直接使用`<a>`更方便

【行内链接】

&emsp;&emsp;行内形式是直接在后面用括号直接接上链接

    This is an [example link](http://cnblogs.com/)

&emsp;&emsp;输出HTML为

    <p>This is an<a href="http://cnblogs.com/">example link</a></p>    


【参考链接】

&emsp;&emsp;参考形式的链接可以为链接定一个名称，之后可以在文件的其他地方定义该链接的内容。title属性是选择性的，链接名称可以用字母、数字和空格，但是不分大小写

    I get 10 times more traffic from [Google][1] than from [Yahoo][2] or [MSN][3].

    [1]: http://google.com/ "Google"
    [2]: http://search.yahoo.com/ "Yahoo Search"
    [3]: http://search.msn.com/ "MSN Search"

&emsp;&emsp;输出HTML为

    <p>I get 10 times more traffic from <a href="http://google.com/"
    title="Google">Google</a> than from <a href="http://search.yahoo.com/"
    title="Yahoo Search">Yahoo</a> or <a href="http://search.msn.com/"
    title="MSN Search">MSN</a>.</p>

【直接链接】

&emsp;&emsp;Markdown支持比较简短的自动链接形式来处理网址和电子邮件信箱，只要是用方括号包起来，Markdown就会自动把它转成链接，链接的文字就和链接位置一样

&emsp;&emsp;注意：在网址前一定要加http://，否则将不会被识别为URL

    <http://cnblogs.com/>

&emsp;&emsp;输出HTML为

    <a href="http://cnblogs.com/">http://cnblogs.com/</a>



&nbsp;


### 图片

&emsp;&emsp;图片的语法和链接很像。先是一个惊叹号!，接着一个方括号，里面放上图片的替代文字，接着一个普通括号，里面放上图片的网址，最后还可以用引号包住并加上选择性的'title'文字


【行内形式】

    ![alt text](/path/to/img.jpg "Title")

【参考形式】

    ![alt text][id]

    [id]: /path/to/img.jpg "Title"

&emsp;&emsp;上面两种方法都会输出HTML为：

    <img src="/path/to/img.jpg" alt="alt text" title="Title" /> 



&nbsp;

### 代码

【code】

&emsp;&emsp;使用反引号\`来标记代码区段`<code>`，区段内的&、<和>都会被自动的转换成HTML实体
    
    `<p>`段落`</p>`

&emsp;&emsp;输出HTML为

    <code><p></code>段落<code></p></code>

【pre】

&emsp;&emsp;如果要建立一个已经格式化好的代码区块，只要每行都缩进 4 个空格或是一个 tab 就可以了，而 &、< 和 > 也一样会自动转成 HTML 实体


    <blockquote>
    <p>For example.</p>
    </blockquote>

&emsp;&emsp;现在更简单的方法是在代码的起始行和结束行都使用三个反引号作为标记

&emsp;&emsp;输出HTML为

    <pre><code>&lt;blockquote&gt;&lt;p&gt;For example.&lt;/p&gt;&lt;/blockquote&gt;</code></pre>


&nbsp;


### 强调

&emsp;&emsp;Markdown 使用星号\*和底线\_作为标记强调字词的符号，被\*或\_ 包围的字词会被转成用 `<em>`标签包围，用两个\* 或\_包起来的话，则会被转成`<strong>`

&emsp;&emsp;如果\* 和 \_ 两边都有空白的话，它们就只会被当成普通的符号。如果要在文字前后直接插入普通的星号或底线，可以用反斜线：

    *em*  **strong**

&emsp;&emsp;输出HTML为

    <em>em</em><strong>strong</strong>



&nbsp;


### 转义

&emsp;&emsp;在markdown中，有一些符号具有特殊的用途，如\\、\*等，如果要使用它们的本意，则需要在前面加一个反斜杠\\来实现

&emsp;&emsp;Markdown 支持以下这些符号前面加上反斜杠来帮助插入普通的符号

    \   反斜线
    `   反引号
    *   星号
    _   底线
    {}  花括号
    []  方括号
    ()  括弧
    #   井字号
    +   加号
    -   减号
    .   英文句点
    !   惊叹号


&nbsp;


### 表格

&emsp;&emsp;绘制表格，需要使用竖线和横线的方式，竖线之间的内容为表格的单元格的内容，第一行为表头，第二行控制对齐方式，第三行及以后为表格主体

        |左对齐(默认)  | 右对齐   |  居中对齐  |
        | :---   | ----:  | :----:  |
        | 计算机      | $1600   |   5     |
        | 手机        |   $12   |   12   |
        | 管线        |    $1    |  234  |

&emsp;&emsp;输出HTML为

    <table>
        <thead>
            <tr>
                <th style="text-align:left">左对齐(默认)</th>
                <th style="text-align:right">右对齐</th>
                <th style="text-align:center">居中对齐</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="text-align:left">计算机</td>
                <td style="text-align:right">$1600</td>
                <td style="text-align:center">5</td>
            </tr>
            <tr>
                <td style="text-align:left">手机</td>
                <td style="text-align:right">$12</td>
                <td style="text-align:center">12</td>
            </tr>
            <tr>
                <td style="text-align:left">管线</td>
                <td style="text-align:right">$1</td>
                <td style="text-align:center">234</td>
            </tr>
    </tbody>
    </table>
    
&nbsp;

### 空两格

&emsp;&emsp;使用markdown排版时，很常用的需求是实现首行缩进，一般使用两个全角空格`&emsp$emsp`来实现


&nbsp;


### 注意

&emsp;&emsp;在博客园中使用markdown写博客时，由于没有即时显示的功能，经常因为多敲了几个空格，而被解析为`<br>`的情况