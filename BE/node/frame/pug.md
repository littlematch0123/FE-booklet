# pug模板引擎(原jade)

&emsp;&emsp;为什么要引入pug，pug有什么特别之处呢？有一些嵌套层次较深的页面，可能会出现巢状嵌套，如下图所示


![pug1](https://pic.xiaohuochai.site/blog/nodejs_pug1.png)


&emsp;&emsp;在后期维护和修改时，一不小心少了一个尖括号，或者某个标签的开始和闭合没有对应上，就会导致DOM结构的混乱甚至是错误。所以，有人发明了HAML，它最大的特色就是使用缩进排列来代替成对标签。受HAML的启发，pug进行了javascript的实现。

&emsp;&emsp;[Pug](https://pugjs.org/api/getting-started.html)原名不叫Pug，是大名鼎鼎的jade，后来由于商标的原因，改为Pug，哈巴狗。其实只是换个名字，语法都与jade一样。丑话说在前面，Pug有它本身的缺点&mdash;&mdash;可移植性差，调试困难，性能并不出色，但使用它可以加快开发效率。本文将详细介绍pug模板引擎

&nbsp;

### 安装

&emsp;&emsp;使用npm安装pug

<div>
<pre>$ npm install pug</pre>
</div>

&emsp;&emsp;但运行pug命令时，提示pug命令未找到


![pug2](https://pic.xiaohuochai.site/blog/nodejs_pug2.png)


&emsp;&emsp;这时，需要安装pug命令行工具pug-cli

&emsp;&emsp;注意：一定要全局安装pug-cli，否则无法正常编译

<div>
<pre>npm install  pug-cli -g</pre>
</div>

&emsp;&emsp;再运行pug命令时，正常执行


![pug3](https://pic.xiaohuochai.site/blog/nodejs_pug3.png)


&nbsp;

### 命令行

&emsp;&emsp;在学习pug基础语法之前，首先要了解pug的命令行的使用

【基础编译】

&emsp;&emsp;将如下内容输入文件中，并命名为index.pug

<div>
<pre>html
    head
        title aaa
    body</pre>
</div>

&emsp;&emsp;在命令行中敲入pug index.pug即可实现基础编译


![pug4](https://pic.xiaohuochai.site/blog/nodejs_pug4.png)


&emsp;&emsp;在当前目录下生成一个index.html，是index.pug编译后的结果


![pug5](https://pic.xiaohuochai.site/blog/nodejs_pug5.png)


【sublime两列设置】

&emsp;&emsp;但是，这样查看并不方便。下面将sublime设置为两列放置，将index.pug和index.html分别放置在左右两列，方便查看


![pug6](https://pic.xiaohuochai.site/blog/nodejs_pug6.gif)


【自动编译】

&emsp;&emsp;使用pug -w功能可以实现自动编译


![pug7](https://pic.xiaohuochai.site/blog/nodejs_pug7.png)


&emsp;&emsp;更改index.pug文件并保存后，index.html文件会实时更新为最新的编译的文件


![pug8](https://pic.xiaohuochai.site/blog/nodejs_pug8.gif)


【标准版HTML】

&emsp;&emsp;如上所示，默认地，pug编译出的HTML文件是压缩版的。如果要编译标准版的HTML文件，需要设置-P参数

<div>
<pre>pug index.html -P</pre>
</div>

【路径设置】

&emsp;&emsp;如果并不希望在当前目录下输入编译后的HTML文件，而是有自定义目录的需求，则需要设置-o参数

&emsp;&emsp;如下设置，index.html将输入到a目录下面，如果a目录不存在，则会新建a目录

<div>
<pre>pug index.pug -o a</pre>
</div>

【重命名】

&emsp;&emsp;默认地，编译后的HTML与pug文件同名。如果需要重命名，则可以进行如下设置

&emsp;&emsp;通过如下设置，可以同时设置路径和名称

&emsp;&emsp;注意：这里的路径必须提前建立好，否则不会成功

<div>
<pre>pug &lt;xx.pug&gt; &lt;xx/xx.html&gt;</pre>
</div>

&emsp;&emsp;最终，test.html文件被保存到templates目录下


![pug9](https://pic.xiaohuochai.site/blog/nodejs_pug9.png)


【批量编译】

&emsp;&emsp;假设，编译href目录下所有的pug文件


![pug10](https://pic.xiaohuochai.site/blog/nodejs_pug10.png)


&nbsp;

## 结构语法

&emsp;&emsp;下面介绍关于结构的基础语法

### 标签

【树状】

&emsp;&emsp;在默认情况下，在每行文本的开头（或者紧跟白字符的部分）书写这个 HTML 标签的名称。使用缩进来表示标签间的嵌套关系，这样可以构建一个 HTML 代码的树状结构&emsp;&emsp;

<div>
<pre>ul
  li Item A
  li Item B
  li Item C</pre>
</div>

![pug11](https://pic.xiaohuochai.site/blog/nodejs_pug11.png)


【内联】

&emsp;&emsp;为了节省空间， Pug 嵌套标签提供了一种内联式语法

<div>
<pre>a: img</pre>
</div>

![pug12](https://pic.xiaohuochai.site/blog/nodejs_pug12.png)


【自闭合】

&emsp;&emsp;Pug知道哪些元素是自闭合的，也可以通过在标签后加上 `/` 来明确声明此标签是自闭合的

<div>
<pre>img
input
img/
input/</pre>
</div>

![pug13](https://pic.xiaohuochai.site/blog/nodejs_pug13.png)


【DOCTYPE】

&emsp;&emsp;&nbsp;HTML5的DOCTYPE书写如下

<div>
<pre>doctype html</pre>
</div>

![pug14](https://pic.xiaohuochai.site/blog/nodejs_pug14.png)


&emsp;&emsp;也可以自定义一个 doctype 字面值　

<div>
<pre>doctype html PUBLIC "-//W3C//DTD XHTML Basic 1.1//EN"</pre>
</div>

![pug15](https://pic.xiaohuochai.site/blog/nodejs_pug15.png)


&nbsp;

### 内容

&emsp;&emsp;&nbsp;Pug 提供了三种常用的方式来放置内容

【管道文本】

&emsp;&emsp;这是最简单的向模板添加纯文本的方法。只需要在每行前面加一个 `|` 字符，这个字符在类 Unix 系统下常用作&ldquo;管道&rdquo;功能，因此得名

<div>
<pre>| 纯文本当然也可以包括 &lt;strong&gt;HTML&lt;/strong&gt; 内容。
p
  | 但它必须单独起一行。</pre>
</div>

![pug16](https://pic.xiaohuochai.site/blog/nodejs_pug16.png)


【标签内文本】

&emsp;&emsp;这实际上是最常见的情况，文本只需要和标签名隔开一个空格即可

<div>
<pre>p 纯文本当然也可以包括 &lt;strong&gt;HTML&lt;/strong&gt; 内容。</pre>
</div>

![pug17](https://pic.xiaohuochai.site/blog/nodejs_pug17.png)


【嵌入大段文本】

&emsp;&emsp;有时可能想要写一个大段文本块。比如嵌入脚本或者样式。只需在标签后面接一个 `.`即可

&emsp;&emsp;注意：不要有空格

<div>
<pre>script.
  if (usingPug)
    console.log('这是明智的选择。')
  else
    console.log('请用 Pug。')</pre>
</div>

![pug18](https://pic.xiaohuochai.site/blog/nodejs_pug18.png)


&nbsp;

### 属性

&emsp;&emsp;标签属性和 HTML 语法非常相似，它们的值就是普通的 JavaScript 表达式。可以用逗号作为属性分隔符，也可以不加逗号

<div>
<pre>a(href='baidu.com') 百度
= '\n'
a(class='button' href='baidu.com') 百度
= '\n'
a(class='button', href='baidu.com') 百度</pre>
</div>

![pug19](https://pic.xiaohuochai.site/blog/nodejs_pug19.png)

【多行属性】

</div>

&emsp;&emsp;如果有很多属性，可以把它们分几行写

<div>
<pre>input(
  type='checkbox'
  name='agreement'
  checked
)</pre>
</div>

![pug20](https://pic.xiaohuochai.site/blog/nodejs_pug20.png)


【长属性】

&emsp;&emsp;如果有一个很长的属性，并且JavaScript运行时引擎支持ES2015模板字符串，可以使用它来写属性值

<div>
<pre>input(data-json=`
  {
    "非常": "长的",
    "数据": true
  }
`)</pre>
</div>

![pug21](https://pic.xiaohuochai.site/blog/nodejs_pug21.png)


【特殊字符】

&emsp;&emsp;如果属性名称中含有某些奇怪的字符，可能会与 JavaScript 语法产生冲突的话，可以将它们使用 `""` 或者 `''` 括起来。还可以使用逗号来分割不同的属性

<div>
<pre>div(class='div-class', (click)='play()')
div(class='div-class' '(click)'='play()')</pre>
</div>

![pug22](https://pic.xiaohuochai.site/blog/nodejs_pug22.png)


【转义属性】

&emsp;&emsp;默认情况下，所有的属性都经过转义（即把特殊字符转换成转义序列）来防止诸如跨站脚本攻击之类的攻击方式。如果要使用特殊符号，需要使用 `!=` 而不是 `=`

&emsp;&emsp;注意：未经转义的缓存代码十分危险。必须正确处理和过滤用户的输入来避免跨站脚本攻击

<div>
<pre>div(escaped="&lt;code&gt;")
div(unescaped!="&lt;code&gt;")</pre>
</div>

![pug23](https://pic.xiaohuochai.site/blog/nodejs_pug23.png)


【布尔值】

&emsp;&emsp;在Pug中，布尔值属性是经过映射的，这样布尔值(`true`和`false)`就能接受了。没有指定值时，默认是`true`

<div>
<pre>input(type='checkbox' checked)
= '\n'
input(type='checkbox' checked=true)
= '\n'
input(type='checkbox' checked=false)
= '\n'
input(type='checkbox' checked=true.toString())</pre>
</div>

![pug24](https://pic.xiaohuochai.site/blog/nodejs_pug24.png)


【行内样式】

&emsp;&emsp;`style`（样式）属性可以是一个字符串（就像其他普通的属性一样）还可以是一个对象

<div>
<pre>a(style={color: 'red', background: 'green'})</pre>
</div>

![pug25](https://pic.xiaohuochai.site/blog/nodejs_pug25.png)


【类和ID】

&emsp;&emsp;类可以使用 `.classname` 语法来定义，ID 可以使用 `#idname` 语法来定义

&emsp;&emsp;考虑到使用 `div` 作为标签名这种行为实在是太常见了，所以如果省略掉标签名称的话，它就是默认值

<div>
<pre>a.button
.content
="\n"
a#main-link
#content</pre>
</div>

![pug26](https://pic.xiaohuochai.site/blog/nodejs_pug26.png)


&nbsp;

### 标签嵌入

&emsp;&emsp;标签支持一种标签嵌入的写法，形式如下

<div>
<pre>#[标签名(标签属性)  标签内容]</pre>
</div>

&emsp;&emsp;对于内联标签来说，这种写法比较简单

<div>
<pre>p.
  这是一个很长很长而且还很无聊的段落，还没有结束，是的，非常非常地长。
  突然出现了一个 #[strong 充满力量感的单词]，这确实让人难以 #[em 忽视]。</pre>
</div>

![pug27](https://pic.xiaohuochai.site/blog/nodejs_pug27.png)


【空格调整】

&emsp;&emsp;Pug 默认会去除一个标签前后的所有空格，而标签嵌入功能可以在需要嵌入的位置上处理前后空格

<div>
<pre>p
  | 如果我不用嵌入功能来书写，一些标签比如
  strong strong
  | 和
  em em
  | 可能会产生意外的结果。
p.
  如果用了嵌入，在 #[strong strong] 和 #[em em] 旁的空格就会让我舒服多了。</pre>
</div>

![pug28](https://pic.xiaohuochai.site/blog/nodejs_pug28.png)


&nbsp;&nbsp;

### 注释

【单行注释】

&emsp;&emsp;单行注释和 JavaScript 类似，但是必须独立一行

<div>
<pre>// 一些内容
p foo
p bar</pre>
</div>

![pug29](https://pic.xiaohuochai.site/blog/nodejs_pug29.png)


【不输出注释】

&emsp;&emsp;只需要加上一个横杠，就可以使用不输出注释

<div>
<pre>//- 这行不会出现在结果里
p foo
p bar</pre>
</div>

![pug30](https://pic.xiaohuochai.site/blog/nodejs_pug30.png)


【块注释】

<div>
<pre>body
  //
    随便写多少字
    都没关系。</pre>
</div>

![pug31](https://pic.xiaohuochai.site/blog/nodejs_pug31.png)


【条件注释】

&emsp;&emsp;Pug 没有特殊的语法来表示条件注释（conditional comments）。不过因为所有以 `&lt;` 开头的行都会被当作纯文本，因此直接写一个 HTML 风格的条件注释也是没问题的

<div>
<pre>&lt;!--[if IE 8]&gt;
&lt;html lang="en" class="lt-ie9"&gt;
&lt;![endif]--&gt;
&lt;!--[if gt IE 8]&gt;&lt;!--&gt;
&lt;html lang="en"&gt;
&lt;!--&lt;![endif]--&gt;</pre>
</div>

![pug34](https://pic.xiaohuochai.site/blog/nodejs_pug34.png)


&nbsp;

## 逻辑语法

&emsp;&emsp;以下是关于模板逻辑的语法

### JS代码

【不输出的代码】

&emsp;&emsp;用 `-` 开始一段不直接进行输出的代码

<div>
<pre>- for (var x = 0; x &lt; 3; x++)
  li item</pre>
</div>

![pug35](https://pic.xiaohuochai.site/blog/nodejs_pug35.png)


【输出的代码】

&emsp;&emsp;用`=`开始一段带有输出的代码，它应该是可以被求值的一个JavaScript表达式。为安全起见，它将被HTML转义

<div>
<pre>p
  = '这个代码被 &lt;转义&gt; 了！'
p= '这个代码被 &lt;转义&gt; 了！'</pre>
</div>

![pug36](https://pic.xiaohuochai.site/blog/nodejs_pug36.png)


【不转义的输出代码】

&emsp;&emsp;用 `!=` 开始一段不转义的，带有输出的代码。这将不会做任何转义，所以用于执行用户的输入将会不安全

<div>
<pre>p
  != '这段文字 &lt;strong&gt;没有&lt;/strong&gt; 被转义！'
p!= '这段文字' + ' &lt;strong&gt;没有&lt;/strong&gt; 被转义！'</pre>
</div>

![pug37](https://pic.xiaohuochai.site/blog/nodejs_pug37.png)


&nbsp;

### 变量

【内容变量】

&emsp;&emsp;使用=或#{}来进行变量的真实值替换

<div>
<pre>- var title = "On Dogs: Man's Best Friend";
- var author = "enlore";
- var theGreat = "&lt;span&gt;转义!&lt;/span&gt;";

h1= title
p #{author} 笔下源于真情的创作。
p 这是安全的：#{theGreat}</pre>
</div>

![pug38](https://pic.xiaohuochai.site/blog/nodejs_pug38.png)


&emsp;&emsp;在&nbsp;`#{`&nbsp;和&nbsp;`}`&nbsp;里面的代码也会被求值、转义，并最终嵌入到模板的渲染输出中

<div>
<pre>- var msg = "not my inside voice";
p This is #{msg.toUpperCase()}</pre>
</div>

![pug39](https://pic.xiaohuochai.site/blog/nodejs_pug39.png)


&emsp;&emsp;Pug 足够聪明来分辨到底哪里才是嵌入表达式的结束，所以不用担心表达式中有&nbsp;`}`，也不需要额外的转义

<div>
<pre>p 不要转义 #{'}'}！</pre>
</div>

![pug40](https://pic.xiaohuochai.site/blog/nodejs_pug40.png)


&emsp;&emsp;如果需要表示一个&nbsp;`#{`&nbsp;文本，可以转义它，也可以用嵌入功能来生成

<div>
<pre>p Escaping works with \#{interpolation}
p Interpolation works with #{'#{interpolation}'} too!</pre>
</div>

![pug41](https://pic.xiaohuochai.site/blog/nodejs_pug41.png)


&emsp;&emsp;使用!{}嵌入没有转义的文本进入模板中

<div>
<pre>- var riskyBusiness = "&lt;em&gt;我希望通过外籍教师 Peter 找一位英语笔友。&lt;/em&gt;";
.quote
  p 李华：!{riskyBusiness}</pre>
</div>

![pug42](https://pic.xiaohuochai.site/blog/nodejs_pug42.png)


&emsp;&emsp;注意：如果直接使用用户提供的数据，未进行转义的内容可能会带来安全风险

【属性变量】

&emsp;&emsp;如果要在属性当中使用变量的话，需要进行如下操作

<div>
<pre>- var url = 'pug-test.html';
a(href='/' + url) 链接
= '\n'
- url = 'https://example.com/'
a(href=url) 另一个链接</pre>
</div>

![pug43](https://pic.xiaohuochai.site/blog/nodejs_pug43.png)


&emsp;&emsp;如果JavaScript运行时支持 ECMAScript 2015 模板字符串，还可以使用下列方式来简化属性值

<div>
<pre>- var btnType = 'info'
- var btnSize = 'lg'
button(type='button' class='btn btn-' + btnType + ' btn-' + btnSize)
= '\n'
button(type='button' class=`btn btn-${btnType} btn-${btnSize}`)</pre>
</div>

![pug44](https://pic.xiaohuochai.site/blog/nodejs_pug44.png)


&emsp;&emsp;`&attributes`&nbsp;语法可以将一个对象转化为一个元素的属性列表

<div>
<pre>div#foo(data-bar="foo")&amp;attributes({'data-foo': 'bar'})
- var attributes = {};
- attributes.class = 'baz';
div#foo(data-bar="foo")&amp;attributes(attributes)</pre>
</div>

![pug45](https://pic.xiaohuochai.site/blog/nodejs_pug45.png)


【变量来源】

&emsp;&emsp;变量来源有三种，分别是pug文件内部、命令行参数和外部JSON文件

&emsp;&emsp;1、pug文件内部


![pug46](https://pic.xiaohuochai.site/blog/nodejs_pug46.png)


&emsp;&emsp;2、命令行参数

&emsp;&emsp;使用--obj参数，就可以跟随一个对象形式的参数


![pug47](https://pic.xiaohuochai.site/blog/nodejs_pug47.png)


![pug48](https://pic.xiaohuochai.site/blog/nodejs_pug48.png)


&emsp;&emsp;3、外部JSON文件

&emsp;&emsp;使用-O，跟随一个JSON文件的路径即可


![pug49](https://pic.xiaohuochai.site/blog/nodejs_pug49.png)


![pug50](https://pic.xiaohuochai.site/blog/nodejs_pug50.png)


&emsp;&emsp;这三种方式，pug文件内部的变量优先级最多，而外部JSON文件和命令行传参优先级相同

&emsp;&emsp;如下所示，外部JSON文件和命令行传参两种方式都存在，由于--obj写在-w后面，最终以命令行传参为准


![pug51](https://pic.xiaohuochai.site/blog/nodejs_pug51.png)


&nbsp;

### 条件

&emsp;&emsp;Pug 的条件判断的一般形式的括号是可选的，所以可以省略掉开头的 `-`，效果完全相同。类似一个常规的 JavaScript 语法形式

【if else】

<div>
<pre>- var user = { description: 'foo bar baz' }
- var authorised = false
#user
  if user.description
    h2.green 描述
    p.description= user.description
  else if authorised
    h2.blue 描述
    p.description.
      用户没有添加描述。
      不写点什么吗&hellip;&hellip;
  else
    h2.red 描述
    p.description 用户没有描述</pre>
</div>

![pug52](https://pic.xiaohuochai.site/blog/nodejs_pug52.png)


&emsp;&emsp;Pug 同样也提供了它的反义版本 `unless`

<div>
<pre>unless user.isAnonymous
  p 您已经以 #{user.name} 的身份登录。</pre>
</div>

![pug53](https://pic.xiaohuochai.site/blog/nodejs_pug53.png)


【switch】

&emsp;&emsp;`case` 是 JavaScript 的 `switch` 指令的缩写，并且它接受如下的形式

<div>
<pre>- var friends = 10
case friends
  when 0
    p 您没有朋友
  when 1
    p 您有一个朋友
  default
    p 您有 #{friends} 个朋友</pre>
</div>

![pug54](https://pic.xiaohuochai.site/blog/nodejs_pug54.png)


&emsp;&emsp;在某些情况下，如果不想输出任何东西的话，可以明确地加上一个原生的 `break` 语句

<div>
<pre>- var friends = 0
case friends
  when 0
    - break
  when 1
    p 您的朋友很少
  default
    p 您有 #{friends} 个朋友</pre>
</div>

![pug55](https://pic.xiaohuochai.site/blog/nodejs_pug55.png)


&emsp;&emsp;也可以使用块展开的语法

<div>
<pre>- var friends = 1
case friends
  when 0: p 您没有朋友
  when 1: p 您有一个朋友
  default: p 您有 #{friends} 个朋友</pre>
</div>

![pug56](https://pic.xiaohuochai.site/blog/nodejs_pug56.png)


&nbsp;

### 循环

&emsp;&emsp;Pug 目前支持两种主要的迭代方式： `each` 和 `while`

【each】

&emsp;&emsp;这是 Pug 的首选迭代方式

<div>
<pre>ul
  each val in [1, 2, 3, 4, 5]
    li= val</pre>
</div>

![pug57](https://pic.xiaohuochai.site/blog/nodejs_pug57.png)


&emsp;&emsp;可以在迭代时获得索引值

<div>
<pre>ul
  each val, index in ['〇', '一', '二']
    li= index + ': ' + val</pre>
</div>

![pug58](https://pic.xiaohuochai.site/blog/nodejs_pug58.png)


&emsp;&emsp;能够迭代对象中的键值

<div>
<pre>ul
  each val, index in {1:'一',2:'二',3:'三'}
    li= index + ': ' + val</pre>
</div>

![pug59](https://pic.xiaohuochai.site/blog/nodejs_pug59.png)


&emsp;&emsp;用于迭代的对象或数组仅仅是个 JavaScript 表达式，因此它可以是变量、函数调用的结果，又或者其他

<div>
<pre>- var values = [];
ul
  each val in values.length ? values : ['没有内容']
    li= val</pre>
</div>

![pug60](https://pic.xiaohuochai.site/blog/nodejs_pug60.png)


&emsp;&emsp;还能添加一个 `else` 块，这个语句块将会在数组与对象没有可供迭代的值时被执行

<div>
<pre>- var values = [];
ul
  each val in values
    li= val
  else
    li 没有内容</pre>
</div>

![pug61](https://pic.xiaohuochai.site/blog/nodejs_pug61.png)


&emsp;&emsp;注意：也可以使用 `for` 作为 `each` 的别称

【while】

&emsp;&emsp;也可以使用 `while` 来创建一个循环

<div>
<pre>- var n = 0;
ul
  while n &lt; 4
    li= n++</pre>
</div>

![pug62](https://pic.xiaohuochai.site/blog/nodejs_pug62.png)


&nbsp;

### 混入

&emsp;&emsp;混入是一种允许在 Pug 中重复使用一整个代码块的方法

<div>
<pre>//- 定义
mixin list
  ul
    li foo
    li bar
    li baz
//- 使用
+list
+list</pre>
</div>

![pug63](https://pic.xiaohuochai.site/blog/nodejs_pug63.png)


&emsp;&emsp;混入可以被编译成函数形式，并传递一些参数

<div>
<pre>mixin pet(name)
  li.pet= name
ul
  +pet('猫')
  +pet('狗')
  +pet('猪')</pre>
</div>

![pug64](https://pic.xiaohuochai.site/blog/nodejs_pug64.png)


&emsp;&emsp;混入也可以把一整个代码块像内容一样传递进来

<div>
<pre>mixin article(title)
  .article
    .article-wrapper
      h1= title
      if block
        block
      else
        p 没有提供任何内容。
+article('Hello world')
+article('Hello world')
  p 这是我
  p 随便写的文章</pre>
</div>

![pug65](https://pic.xiaohuochai.site/blog/nodejs_pug65.png)


&emsp;&emsp;混入也可以隐式地，从&ldquo;标签属性&rdquo;得到一个参数 `attributes`


![pug66](https://pic.xiaohuochai.site/blog/nodejs_pug66.png)


&emsp;&emsp;也可以直接用 `&attributes` 方法来传递 `attributes` 参数

<div>
<pre>mixin link(href, name)
  a(class!=attributes.class href=href)= name
+link('/foo', 'foo')(class="btn")</pre>
</div>

![pug67](https://pic.xiaohuochai.site/blog/nodejs_pug67.png)


&emsp;&emsp;注意：`+link(class="btn")`&nbsp;等价于&nbsp;`+link()(class="btn")`，因为 Pug 会判断括号内的内容是属性还是参数。但最好使用后面的写法，明确地传递空的参数，确保第一对括号内始终都是参数列表

&emsp;&emsp;可以用剩余参数（rest arguments）语法来表示参数列表最后传入若干个长度不定的参数

<div>
<pre>mixin list(id, ...items)
  ul(id=id)
    each item in items
      li= item
+list('my-list', 1, 2, 3, 4)</pre>
</div>

![pug68](https://pic.xiaohuochai.site/blog/nodejs_pug68.png)


&nbsp;

### 文件包含

&emsp;&emsp;包含（include）功能允许把另外的文件内容插入进来

<div>
<pre>//- index.pug
doctype html
html
  include includes/head.pug
  body
    h1 我的网站
    p 欢迎来到我这简陋得不能再简陋的网站。
    include includes/foot.pug</pre>
</div>
<div>
<pre>//- includes/head.pug
head
  title 我的网站
  script(src='/javascripts/jquery.js')
  script(src='/javascripts/app.js')</pre>
</div>
<div>
<pre>//- includes/foot.pug
footer#footer
  p Copyright (c) foobar</pre>
</div>

![pug69](https://pic.xiaohuochai.site/blog/nodejs_pug69.png)


&emsp;&emsp;被包含的如果不是 Pug 文件，那么就只会当作文本内容来引入

<div>
<pre>//- index.pug
doctype html
html
  head
    style
      include style.css
  body
    h1 我的网站
    p 欢迎来到我这简陋得不能再简陋的网站。
    script
      include script.js</pre>
</div>
<div>
<pre>/* style.css */
h1 {
  color: red;
}</pre>
</div>
<div>
<pre>// script.js
console.log('真了不起！');</pre>
</div>

![pug70](https://pic.xiaohuochai.site/blog/nodejs_pug70.png)


&nbsp;

### 文件继承

【覆盖】

&emsp;&emsp;Pug 支持使用 `block` 和 `extends` 关键字进行模板的继承。一个称之为&ldquo;块&rdquo;（block）的代码块，可以被子模板覆盖、替换。这个过程是递归的。

&emsp;&emsp;Pug 的块可以提供一份默认内容，当然这是可选的

<div>
<pre>//- layout.pug
html
  head
&emsp;&emsp; meta(charset="UTF-8")
    title 我的站点 - #{title}
    block scripts
      script(src='/jquery.js')
  body
    block content
    block foot
      #footer
        p 一些页脚的内容</pre>
</div>

&emsp;&emsp;现在来扩展这个布局：只需要简单地创建一个新文件，并如下所示用一句 `extends` 来指出这个被继承的模板的路径。现在可以定义若干个新的块来覆盖父模板里对应的&ldquo;父块&rdquo;。值得注意的是，因为这里的 `foot` 块 _没有_ 被重定义，所以会依然输出&ldquo;一些页脚的内容&rdquo;

<div>
<pre>//- pet.pug
p= petName</pre>
</div>
<div>
<pre>//- page-a.pug
extends layout.pug
block scripts
  script(src='/jquery.js')
  script(src='/pets.js')
block content
  h1= title
  - var pets = ['猫', '狗']
  each petName in pets
    include pet.pug</pre>
</div>

![pug71](https://pic.xiaohuochai.site/blog/nodejs_pug71.png)


&emsp;&emsp;同样，也可以覆盖一个块并在其中提供一些新的块。如下所示，`content` 块现在暴露出两个新的块 `sidebar` 和 `primary` 用来被扩展。当然，它的子模板也可以把整个 `content` 给覆盖掉

<div>
<pre>//- sub-layout.pug
extends layout.pug
block content
  .sidebar
    block sidebar
      p 什么都没有
  .primary
    block primary
      p 什么都没有</pre>
</div>
<div>
<pre>//- page-b.pug
extends sub-layout.pug
block content
  .sidebar
    block sidebar
      p 什么都没有
  .primary
    block primary
      p 什么都没有</pre>
</div>

![pug72](https://pic.xiaohuochai.site/blog/nodejs_pug72.png)


【扩展】

&emsp;&emsp;Pug 允许去替换（默认的行为）、`prepend`（向头部添加内容），或者 `append`（向尾部添加内容）一个块。 假设有一份默认的脚本要放在 `head` 块中，而且希望将它应用到 _每一个页面_，可以进行如下操作

<div>
<pre>//- layout.pug
html
  head
    block head
      script(src='/vendor/jquery.js')
      script(src='/vendor/caustic.js')
  body
    block content</pre>
</div>

&emsp;&emsp;现在假设有一个页面，那是一个 JavaScript 编写的游戏。希望把一些游戏相关的脚本也像默认的那些脚本一样放进去，那么只要简单地 `append` 这个块：

<div>
<pre>//- page.pug
extends layout.pug
block prepend head
  script(src='/vendor/three.js')
block append head
  script(src='/game.js')</pre>
</div>

&emsp;&emsp;当使用 `block append` 或者 `block prepend` 时，`block` 关键字是可省略的：

<div>
<pre>//- page.pug
extends layout.pug
prepend head
  script(src='/vendor/three.js')
append head
  script(src='/game.js')</pre>
</div>

![pug73](https://pic.xiaohuochai.site/blog/nodejs_pug73.png)


&nbsp;

### 简易模板

<div>
<pre>//- index.pug
doctype html
html
    head
        meta(charset="UTF-8")
        title= documentTitle
        each val in srcStyles
            link(href= baseStyle +'/' + val)
    body
        header.hd
            nav.hd-navbar.m-navbar.m-navbar_primary
                .hd-navbar-tel 联系方式: #{tel}
            ul.hd-navbar-nav
                each val in mainNavItem
                    li.Hnn-item.m-btn.m-btn_info
                        a(href="#")= val
        section.main
            h1.main-title 我的文档
            p.main-content.
                这是一个很长很长而且还很无聊的段落，还没有结束，是的，非常非常地长。
                突然出现了一个 #[strong 充满力量感的单词]，这确实让人难以 #[em 忽视]。
        footer.ft
            p Copyright (c) 小火柴的蓝色理想
        each val in srcScripts
            script(src=baseScript + '/' + val)</pre>
</div>
<div>
<pre>//- data.json
{
    "documentTitle":"测试文档",
    "tel":"400-888-8888",
    "mainNavItem":['登录','注册','关于','帮助'],
    "baseStyle":'style',
    "srcStyles":['bootstrap.css','main.css'],
    "baseScript":'/js',
    "srcScripts":['jquery.js','app.js']
}</pre>
</div>

![pug74](https://pic.xiaohuochai.site/blog/nodejs_pug74.png)


![pug75](https://pic.xiaohuochai.site/blog/nodejs_pug75.png)


