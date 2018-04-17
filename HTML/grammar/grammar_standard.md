# HTML规范

&emsp;&emsp;HTML是描述网页结构的超文本标记语言，HTML规范能够使HTML代码风格保持一致，使得HTML更容易理解和维护。本文将详细介绍HTML规范

&nbsp;

### 整体结构

【页面头部】

&emsp;&emsp;1、文件应以`<!DOCTYPE...>`首行顶格开始，推荐使用`<!DOCTYPE html>`

```
<!DOCTYPE html>
```

&emsp;&emsp;2、必须声明文档的编码charset，且与文件本身编码保持一致，指定字符编码的&nbsp;`meta`&nbsp;必须是&nbsp;`head`&nbsp;的第一个直接子元素。推荐使用UTF-8编码<meta charset="utf-8">

```
<meta charset="utf-8">
```

&emsp;&emsp;3、根据页面内容和需求填写适当的keywords和description

```
<meta name="description" content="不超过150个字符">
<meta name="keywords" content="">
```

&emsp;&emsp;4、页面title是不可缺少的一项，`title`&nbsp;必须作为&nbsp;`head`&nbsp;的直接子元素，并紧随&nbsp;`charset`&nbsp;声明之后

```
<head>
    <meta charset="UTF-8">
    <title>页面标题</title>
</head>
```

【资源引入】

&emsp;&emsp;1、保证&nbsp;`favicon`&nbsp;可访问

```
<link rel="shortcut icon" href="path/to/favicon.ico">
```

&emsp;&emsp;2、引入&nbsp;`CSS`&nbsp;和&nbsp;`JavaScript`&nbsp;时无须指明&nbsp;`type`&nbsp;属性

&emsp;&emsp;3、引入&nbsp;`CSS`&nbsp;时必须指明&nbsp;`rel="stylesheet"`

```
<link rel="stylesheet" href="page.css">
```

&emsp;&emsp;4、使用link将css文件引入，并置于head中；使用script将js文件引入，并置于body底部

&emsp;&emsp;5、移动环境或只针对现代浏览器设计的 Web 应用，如果引用外部资源的&nbsp;`URL`&nbsp;协议部分与页面相同，建议省略协议前缀。这是因为使用&nbsp;`protocol-relative URL`&nbsp;引入 CSS，在&nbsp;`IE7/8`&nbsp;下，会发两次请求。是否使用&nbsp;`protocol-relative URL`&nbsp;应充分考虑页面针对的环境

```
<script src="//s1.bdstatic.com/jquery.js"></script>
```

【结构优化】

&emsp;&emsp;1、尽量遵循 HTML 标准和语义，但是不要以牺牲实用性为代价。任何时候都要尽量使用最少的标签并保持最小的复杂度

&emsp;&emsp;2、结构顺序和视觉顺序基本保持一致，按照从上至下、从左到右的视觉顺序书写HTML结构。有时为了便于搜索引擎抓取，也会将重要内容在HTML结构顺序上提前

&emsp;&emsp;3、结构、表现、行为三者分离，避免内联

&emsp;&emsp;4、每一个块级元素都另起一行，每一行都使用Tab缩进对齐（head和body的子元素不需要缩进）。删除冗余的行尾空格

&emsp;&emsp;5、对于内容较为简单的表格，建议将tr写成单行

&emsp;&emsp;6、可以在大的模块之间用空行隔开，使模块更清晰

【语义化】

&emsp;&emsp;浏览器会根据标签的语义给定一个默认的样式。判断网页标签语义化是否良好的一个简单方法：去掉样式，看网页结构是否组织良好有序，是否仍然有很好的可读性

&emsp;&emsp;1、尽可能少地使用无语义标签span和div

&emsp;&emsp;2、在语义不明显，既可以使用p也可以使用div的地方，尽量用p

&emsp;&emsp;3、在既可以使用div也可以使用section的地方，尽量用section

&emsp;&emsp;4、不要使用纯样式标签，如b、u等，而改用CSS设置

&nbsp;

### 代码格式

【缩进】

&emsp;&emsp;使用2个空格代替1个Tab（大多数编辑器中可设置）

```
<ul>
    <li>first</li>
    <li>second</li>
</ul>
```

【命名】

&emsp;&emsp;1、class 必须单词全字母小写，单词间以 - 分隔

&emsp;&emsp;2、class 必须代表相应模块或部件的内容或功能，不得以样式信息进行命名

```
<!-- good -->
<div class="sidebar"></div>

<!-- bad -->
<div class="left"></div>
```

&emsp;&emsp;3、同一页面，应避免使用相同的&nbsp;`name`&nbsp;与&nbsp;`id。`因为IE7-浏览器会混淆元素的 id 和 name 属性， document.getElementById 可能获得不期望的元素。所以在对元素的 id 与 name 属性的命名需要非常小心

【标签】

&emsp;&emsp;1、标签名必须使用小写字母

&emsp;&emsp;2、对于无需自闭合的标签，不需要自闭合

&emsp;&emsp;3、对&nbsp;`HTML5`&nbsp;中规定允许省略的闭合标签，不允许省略闭合标签

&emsp;&emsp;4、`HTML`&nbsp;标签的使用应该遵循标签的语义，且要符合标签嵌套规则

```
<!-- good -->
<p>Hello StyleGuide!</p>
<!-- bad -->
<P>Hello StyleGuide!</P>

<!-- good -->
<input type="text" name="title">
<!-- bad -->
<input type="text" name="title" </>

<!-- good -->
<ul>
    <li>first</li>
    <li>second</li>
</ul>
<!-- bad -->
<ul>
    <li>first
    <li>second
</ul>
```

【注释】

&emsp;&emsp;采用类似标签闭合的写法，与HTML统一格式；注释文案两头空格，与CSS注释统一格式

&emsp;&emsp;开始注释：<!-- 注释文案 -->（文案两头空格）

&emsp;&emsp;结束注释：<!-- /注释文案 -->（文案前加&ldquo;/&rdquo;符号，类似标签的闭合）

&emsp;&emsp;允许只有开始注释

```
<!-- 头部 -->
<div class="g-hd">
    <!-- LOGO -->
    <h1 class="m-logo"><a href="#">LOGO</a></h1>
    <!-- /LOGO -->
    <!-- 导航 -->
    <ul class="m-nav">
        <li><a href="#">NAV1</a></li>
        <li><a href="#">NAV2</a></li>
        <!-- 更多导航项 -->
    </ul>
    <!-- /导航 -->
</div>
<!-- /头部 -->
```

【属性】

&emsp;&emsp;1、属性和值全部小写

&emsp;&emsp;2、属性值必须用双引号包围

&emsp;&emsp;3、布尔类型的属性，建议不添加属性值

&emsp;&emsp;4、自定义属性建议以&nbsp;`xxx-`&nbsp;为前缀，推荐使用&nbsp;`data-`

&emsp;&emsp;5、可以省略style标签和script标签的type属性

```
<!-- good -->
<table cellspacing="0">...</table>
<!-- bad -->
<table cellSpacing="0">...</table>

<!-- good -->
<script src="esl.js"></script>
<!-- bad -->
<script src='esl.js'></script>
<script src=esl.js></script>
```

【属性顺序】

&emsp;&emsp;HTML 属性应该按照特定的顺序出现以保证易读性

```
id
class
name
data-xxx
src, for, type, href
title, alt
aria-xxx, role
```

&nbsp;

### 特殊元素

【图片】

&emsp;&emsp;1、禁止&nbsp;`img`&nbsp;的&nbsp;`src`&nbsp;取值为空，否则会导致部分浏览器重新加载一次当前页面

&emsp;&emsp;2、为图片添加&nbsp;`alt`&nbsp;属性，提高图片加载失败时的用户体验

&emsp;&emsp;3、避免为&nbsp;`img`&nbsp;添加不必要的&nbsp;`title`&nbsp;属性，多余的 title 影响看图体验，并且增加了页面尺寸

&emsp;&emsp;4、为图片添加&nbsp;`width`&nbsp;和&nbsp;`height`&nbsp;属性，以避免页面抖动

```
<img src="#" alt="#" width="#" height="#">
```

&emsp;&emsp;5、有下载需求的图片采用&nbsp;`img`&nbsp;标签实现，无下载需求的图片采用&nbsp;`CSS`&nbsp;背景图实现

&emsp;&emsp;产品 logo、用户头像、用户产生的图片等有潜在下载需求的图片，以 img 形式实现，能方便用户下载

&emsp;&emsp;无下载需求的图片，比如：icon、背景、代码使用的图片等，尽可能采用 css 背景图实现

【表单】

&emsp;&emsp;1、有文本标题的控件使用&nbsp;`label`&nbsp;标签将其与其标题相关联。最好将控件置于 label 内，以减少不必要的 id

```
<label><input type="checkbox" name="confirm" value="on"> 我已确认上述条款</label>
```

&emsp;&emsp;2、使用&nbsp;`button`&nbsp;元素时必须指明&nbsp;`type`&nbsp;属性值。因为button 元素的默认 type 为 submit，如果被置于 form 元素中，点击后将导致表单提交

```
<button type="submit">提交</button>
<button type="button">取消</button>
```

&emsp;&emsp;3、在针对移动设备开发的页面时，根据内容类型指定输入框的&nbsp;`type`&nbsp;属性，能获得友好的输入体验

```
<input type="date">
```

【多媒体】

&emsp;&emsp;1、在支持&nbsp;`HTML5`&nbsp;的浏览器中优先使用&nbsp;`audio`&nbsp;和&nbsp;`video`&nbsp;标签来定义音视频元素，并使用退化到插件的方式来对多浏览器进行支持

```
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
    <object width="100" height="50" data="audio.mp3">
        <embed width="100" height="50" src="audio.swf">
    </object>
</audio>

<video width="100" height="50" controls>
    <source src="video.mp4" type="video/mp4">
    <source src="video.ogg" type="video/ogg">
    <object width="100" height="50" data="video.mp4">
        <embed width="100" height="50" src="video.swf">
    </object>
</video>
```

&emsp;&emsp;2、只在必要的时候开启音视频的自动播放
