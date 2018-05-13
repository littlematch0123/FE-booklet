# CSS字体

### 字体系列

【1】5种通用字体系列：拥有相似外观的字体系列

&emsp;&emsp;serif字体:字体成比例，且有上下短线(衬线字体)，包括Times\Georgia\New century Schoolbook

&emsp;&emsp;sans-serif字体:字体成比例，且没有上下短线(无衬线字体)，包括Helvetica\Geneva\Verdana\Arial\Univers

&emsp;&emsp;Monospace字体:字体不成比例，等宽字体，包括Courier\Courier New\Andale Mono

&emsp;&emsp;Cursive字体:手写体，包括Zapf Chancery\Author\Comic Sans

&emsp;&emsp;Fantasy字体:无法归类的字体，包括Western\Woodblock\Klingon

【2】特定字体系列：具体的字体系列

<div>
<pre>font-family:"宋体";
font-family:"arial";</pre>
</div>

【3】默认字体系列

&emsp;&emsp;chrome/opera:"宋体"

&emsp;&emsp;firefox:"微软雅黑"

&emsp;&emsp;safari/IE:Times,"宋体"

<div>
<pre>font-family:字体系列1,字体系列2 &hellip;&hellip;
//【注意】若浏览器识别第一个字体，则以第一个字体显示；如果不识别，则尝试下一个。    
font-family: arial，&ldquo;宋体&rdquo;,&ldquo;微软雅黑&rdquo;;
//【注意】若写英文字体，一定要把英文字体写在前面，英文字体会影响到英文、数字和标点符号。
font-family: Times, 'New Century Schoolbook','New York', serif;
//【注意】若字体名中有一个或多个空格，要添加引号</pre>
</div>

【4】中文字体

&emsp;&emsp;对于中文字体来说，常见的是宋体和微软雅黑。宋体是衬线字体，而微软雅黑是无衬线字体。衬线字体常用于排版印刷，而无衬线字体则常用于网页中

&emsp;&emsp;一般地，一行中有30-40个文字时，行高为1.5时，有较好的阅读体验。对于标题来说，&nbsp;更好的样式是取消其加粗设置，并改变其颜色，增加页面的层次感

&nbsp;

### 字体加粗

【1】常用值

<div>
<pre>font-weight: normal(正常，默认)
font-weight: bold(加粗)</pre>
</div>

【2】所有值

&emsp;&emsp;normal(正常)/bold(粗体)/bolder(更粗)/lighter(更细)

&emsp;&emsp;100/200/300/400/500/600/700/800/900 (100为最细，900为最粗)

&nbsp;

### 字体大小

【1】绝对字体大小

&emsp;&emsp;xx-small/x-small/small/medium/large/x-large/xx-large

【2】相对字体大小

&emsp;&emsp;smaller/larger

【3】em/%

&emsp;&emsp;1em = 100%

【4】默认字体大小

&emsp;&emsp;chrome/firefox/opera/IE/safari:16px

【5】最小字体大小

&emsp;&emsp;chrome:12px

&emsp;&emsp;opera:9px

&emsp;&emsp;safari/IE/firefox:无

**font-size**

&emsp;&emsp;font-size字体大小设置的是字体中字符em框的高度，实际的字符字形通常比字符em框要矮，与字体类型有关

&emsp;&emsp;值: xx-small | x-small | small | medium | large | x-large | xx-large | smaller | larger | &lt;length&gt; | &lt;percentage&gt; | inherit

&emsp;&emsp;初始值: medium

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 有

&emsp;&emsp;百分数: 相对于父元素的字体大小font-size

<iframe style="width: 100%; height: 264px;" src="https://demo.xiaohuochai.site/css/font/f1.html" frameborder="0" width="320" height="240"></iframe>

### 字体风格

<div>
<pre>font-style: normal(默认)
font-style: italic(斜体)
font-style: oblique(倾斜)</pre>
</div>

&nbsp;

### 字体变形

<div>
<pre>font-variant:normal(默认)
font-variant:small-caps(小型大写字母)</pre>
</div>

&nbsp;

### 行高

<div>
<pre>line-height: normal(默认)
line-height: 具体值</pre>
</div>

&emsp;&emsp;[关于行高的详细信息移步至此](http://www.cnblogs.com/xiaohuochai/p/5271217.html#anchor1)&nbsp;

&nbsp;

### 字体

&emsp;&emsp;font: [[&lt;font-style&gt; || &lt;font-variant&gt; || &lt;font-weight&gt;]? &lt;font-size&gt;[/&lt;line-height&gt;?&lt;font-family&gt;]

&emsp;&emsp;注意:对于font-size，百分数相对于父元素来计算；对于line-height，百分数相对于元素的font-size来计算

&nbsp;

### 关键字

&emsp;&emsp;CSS标准定义了6个系统字体关键字：

```
caption: 由标题控件使用的字体样式，如按钮和下拉控件

icon: 系统图标所用的字体样式，如文件夹和文件图标

menu: 下拉菜单和菜单列表中文本使用的字体样式

message-box: 对话框中文本使用的字体样式

small-caption: 由标题小控件的标签使用的字体样式

status-bar: 窗口状态条中文本使用的字体样式
```

<iframe style="width: 100%; height: 222px;" src="https://demo.xiaohuochai.site/css/font/f2.html" frameborder="0" width="320" height="240"></iframe>

### font-face

<div>
<pre>@font-face {
    font-family: 自定义名称;
    src: url(../font/test.eot);
    src: url(../font/test.eot?#iefix) format("embedded-opentype"),
         url(../font/test.woff) format("woff"), 
         url(../font/test.ttf) format("truetype"),
         url(../font/test.svg#jq) format("svg");
}
//EOT:IE专用；WOFF:标准；TTF:最常见(safari/android/ios)；SVG:图形格式(IE和firefox不支持)</pre>
</div>

**两种调用字体的方法**

&emsp;&emsp;【1】html(&amp;#x + 小图标对应的unicode编码)

<div>
<pre>div{
    font-family: 自定义名称;
    -webkit-font-smoothing:antialiased;//字体抗锯齿、光滑度属性
    -mox-osx-font-smoothing: grayscale;//字体抗锯齿、光滑度属性
}
&lt;div&gt;&amp;#xf048&lt;/div&gt;</pre>
</div>

&emsp;&emsp;【2】css(\ + 小图标对应的unicode编码)(不兼容IE7-浏览器)

<div>
<pre>div{
    font-family: 自定义名称;
    -webkit-font-smoothing:antialiased;//字体抗锯齿、光滑度属性
    -mox-osx-font-smoothing: grayscale;//字体抗锯齿、光滑度属性
}
div:before{
    content: "\f048";
}
&lt;div&gt;&lt;/div&gt;</pre>
</div>

【实例】

&emsp;&emsp;下面以一个实例来说明如何使用字体图标，最终的效果如下

<div><iframe src="https://demo.xiaohuochai.site/css/font/f3.html" frameborder="0" width="320" height="40"></iframe></div>

&emsp;&emsp;一般地，使用国内的[iconfont](http://www.iconfont.cn/)网站来寻找需要的字体图标，如晴、阴、雨、雪图标，将其新建为一个项目，并将项目文件下载到本地。下载的文件中包含了需要的字体文件及使用范例

![iconfont](https://pic.xiaohuochai.site/blog/CSS_layout_iconfont.png)

&emsp;&emsp;最终代码如下

<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;style&gt;
@font-face {
  font-family: 'iconfont';  
  src: url('font/iconfont.eot');
  src: url('font/iconfont.eot?#iefix') format('embedded-opentype'),
  url('font/iconfont.woff') format('woff'),
  url('font/iconfont.ttf') format('truetype'),
  url('font/iconfont.svg#iconfont') format('svg');
}
.weatherBox input{
    position: absolute;
    clip: rect(0,0,0,0);
    pointer-events: none;
}
.weatherBox label{
    font-family: 'iconfont';
    -webkit-font-smoothing:antialiased;//字体抗锯齿、光滑度属性
    -mox-osx-font-smoothing: grayscale;//字体抗锯齿、光滑度属性
}
.weatherBox label + label{
    margin-left:10px;
}
.weatherBox label:hover{
    color: lightblue;
}
.icon-sunny:before { content: "\e601"; }
.icon-snowy:before { content: "\e603"; }
.icon-cloudy:before { content: "\e605"; }
.icon-rainy:before { content: "\e606"; }
&lt;/style&gt;    
&lt;/head&gt;
&lt;body&gt;
&lt;div class="weatherBox"&gt;
    &lt;label class="icon-sunny"&gt;
        &lt;input type="radio" name="weather" id="sunny"&gt;晴
    &lt;/label&gt;
    &lt;label  class="icon-cloudy"&gt;
        &lt;input type="radio" name="weather" id="cloudy"&gt;阴
    &lt;/label&gt;
    &lt;label  class="icon-rainy"&gt;
        &lt;input type="radio" name="weather" id="rainy"&gt;雨
    &lt;/label&gt;
    &lt;label  class="icon-snowy"&gt;
        &lt;input type="radio" name="weather" id="snowy"&gt;雪
    &lt;/label&gt;    
&lt;/div&gt;    
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>
