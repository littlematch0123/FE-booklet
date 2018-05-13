# CSS光标cursor

&emsp;&emsp;在浏览器中，光标对于提供交互反馈很有用。通过在不同的场景中改变光标，就能赋予其不同的含义

&nbsp;

### 定义

&emsp;&emsp;cursor光标

&emsp;&emsp;值: [&lt;uri&gt;,]*[auto | default | pointer | crosshair | move | e-resize | ne-resize | nw-resize | n-resize | se-resize | sw-resize | s-resize | w-resize | text | wait | help | progress]] | inherit

&emsp;&emsp;初始值: auto

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 有

&nbsp;

### 标准样式

&emsp;&emsp;CSS2提供了相对较少的选择

<div>
<pre>url: 自定义光标的URL
default: 默认光标，通常是一个箭头
auto: 浏览器自动识别的光标
crosshair : 十字线
pointer: 手型指针
move: 移动指针
e-resize: 向东移动指针
ne-resize: 向东北移动指针
nw-resize: 向西北移动指针
n-resize: 向北移动指针
se-resize: 向东南移动指针
sw-resize: 向西南移动指针
s-resize: 向南移动指针
w-resize: 向西移动指针
text: 文本指针
wait: 指示程序正忙
help: 帮助指针</pre>
</div>

<iframe style="width: 100%; height: 320px;" src="https://demo.xiaohuochai.site/css/cursor/c1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 拓展样式

&emsp;&emsp;CSS3增加了更多的cursor的样式值

&emsp;&emsp;注意：所有拓展样式IE7-浏览器都不支持

<div>
<pre>cursor:none (not IE8, Safari)
cursor:context-menu (not Safari,Firefox,Chrome)
cursor:cell (not Safari)
cursor:alias (not Safari)
cursor:copy (not IE,Safari)
cursor:grab (not IE,Safari,Chrome)
cursor:grabbing (not IE,Safari,Chrome)
cursor:zoom-in (not IE,Safari)
cursor:zoom-out (not IE,Safari)
cursor:vertical-text
cursor:no-drop
cursor:not-allowed
cursor:all-scroll
cursor:ew-resize
cursor:ns-resize
cursor:nesw-resize
cursor:nwse-resize
cursor:col-resize
cursor:row-resize</pre>
</div>

<iframe style="width: 100%; height: 400px;" src="https://demo.xiaohuochai.site/css/cursor/c2.html" frameborder="0" width="320" height="240"></iframe>

### 私有样式

&emsp;&emsp;有些浏览器还提供了增加浏览器前缀的私有样式

&emsp;&emsp;注意：safari将-webkit-grab和-webkit-grabbing都解释为default

<div>
<pre>cursor:-webkit-grab; cursor: -moz-grab;
cursor:-webkit-grabbing; cursor: -moz-grabbing;
cursor:-webkit-zoom-in; cursor: -moz-zoom-in;
cursor:-webkit-zoom-out; cursor: -moz-zoom-out;    </pre>
</div>

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/cursor/c3.html" frameborder="0" width="320" height="240"></iframe>

### 自定义样式

&emsp;&emsp;所有浏览器都支持使用后缀名为.cur的文件，chrome、firefox、safari还支持使用普通图片制作光标

&emsp;&emsp;注意：使用URL自定义样式，后面必须跟有一个逗号和某个通用关键字

<div>
<pre>//错误
cursor: url('m.cur');
//正确
cursor: url('m.cur'),auto;</pre>
</div>

<iframe style="width: 100%; height: 280px;" src="https://demo.xiaohuochai.site/css/cursor/c44.html" frameborder="0" width="320" height="240"></iframe>

### 常见应用

&emsp;&emsp;链接的默认光标是手型指针pointer，通过光标的变化可以让访问者清楚的知道该元素是可点击的

&emsp;&emsp;元素的title属性用来提供元素的额外信息，配合help光标可以得到更好的表现方式

<div>
<pre>span[title]{
    cursor: help;
    border-bottom: 1px solid gray;
}</pre>
</div>
<div>
<pre>&lt;div&gt;&lt;span title="Cascading Style Sheets"&gt;CSS&lt;/span&gt; is much too interesting&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/css/cursor/c5.html" frameborder="0" width="320" height="240"></iframe>
