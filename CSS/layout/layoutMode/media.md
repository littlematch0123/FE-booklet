# 深入理解CSS Media媒体查询

&emsp;&emsp;一说到响应式设计，肯定离不开媒体查询media。一般认为媒体查询是CSS3的新增内容，实际上CSS2已经存在了，CSS3新增了媒体属性和使用场景(IE8-浏览器不支持)。本文将详细介绍媒体查询的内容

&nbsp;

### 媒介类型

&emsp;&emsp;在CSS2中，媒体查询只使用于&lt;style&gt;和&lt;link&gt;标签中，以media属性存在

&emsp;&emsp;media属性用于为不同的媒介类型规定不同的样式

<div>
<pre>screen         计算机屏幕（默认值）    
tty            电传打字机以及使用等宽字符网格的类似媒介
tv             电视类型设备（低分辨率、有限的屏幕翻滚能力）
projection     放映机
handheld       手持设备（小屏幕、有限的带宽）
print          打印预览模式 / 打印页
braille        盲人用点字法反馈设备
aural          语音合成器
all            适合所有设备</pre>
</div>

&emsp;&emsp;真正广泛使用且所有浏览器都兼容的媒介类型是'screen'和'all'

<div>
<pre>&lt;style media="screen"&gt;
.box{height: 100px;width: 100px; background-color: lightblue;}    
&lt;/style&gt;
&lt;div class="box"&gt;&lt;/div&gt;    </pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/media/m1.html" frameborder="0" width="320" height="240"></iframe>

### 媒体属性

&emsp;&emsp;媒体属性是CSS3新增的内容，多数媒体属性带有&ldquo;min-&rdquo;和&ldquo;max-&rdquo;前缀，用于表达&ldquo;小于等于&rdquo;和&ldquo;大于等于&rdquo;。这避免了使用与HTML和XML冲突的&ldquo;&lt;&rdquo;和&ldquo;&gt;&rdquo;字符

&emsp;&emsp;注意：媒体属性必须用括号`()`包起来，否则无效

&emsp;&emsp;下表中列出了所有的媒体属性

<div>
<pre>     width | min-width | max-width
     height | min-height | max-height
     device-width | min-device-width | max-device-width
     device-height | min-device-height | max-device-height
     aspect-ratio | min-aspect-ratio | max-aspect-ratio
     device-aspect-ratio | min-device-aspect-ratio | max-device-aspect-ratio
     color | min-color | max-color
     color-index | min-color-index | max-color-index
     monochrome | min-monochrome | max-monochrome
     resolution | min-resolution | max-resolution
     scan | grid</pre>
</div>

【1】颜色（color）

&emsp;&emsp;指定输出设备每个像素单元的比特值。如果设备不支持输出颜色，则该值为0

&emsp;&emsp;向所有能显示颜色的设备应用样式表

<div>
<pre>&lt;style&gt;
@media (color){
    .box{height: 100px;width: 100px;background-color: lightblue;}    
}    
&lt;/style&gt;
&lt;div class="box"&gt;&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/media/m2.html" frameborder="0" width="320" height="240"></iframe>

【2】颜色索引（color-index）

&emsp;&emsp;颜色索引指定了输出设备中颜色查询表中的条目数量，如果没有使用颜色查询表，则值等于0

&emsp;&emsp;向所有使用至少256个索引颜色的设备应用样式表(下列代码无显示，说明返回值为0)

<div>
<pre>&lt;style&gt;
@media (min-color-index: 256){
    .box{height: 100px; width: 100px;background-color: lightgreen;}    
}    
&lt;/style&gt;    
&lt;div class="box"&gt;&lt;/div&gt;</pre>
</div>

【3】宽高比（aspect-ratio）

&emsp;&emsp;宽高比描述了输出设备目标显示区域的宽高比。该值包含两个以&ldquo;/&rdquo;分隔的正整数。代表了水平像素数（第一个值）与垂直像素数（第二个值）的比例

&emsp;&emsp;向可视区域是正方形或者是宽屏的设备应用样式表

<div>
<pre>&lt;style&gt;
@media (min-aspect-ratio: 1/1) {
    .box{height: 100px;width: 100px; background-color: lightgreen; }        
}
&lt;/style&gt;
&lt;div class="box"&gt;&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/media/m3.html" frameborder="0" width="320" height="240"></iframe>

【4】设备宽高比（device-aspect-ratio）

&emsp;&emsp;设备宽高比描述了输出设备的宽高比。该值包含两个以&ldquo;/&rdquo;分隔的正整数。代表了水平像素数（第一个值）与垂直像素数（第二个值）的比例

&emsp;&emsp;向宽高比为16:9的特殊宽屏设备应用样式表

<div>
<pre>&lt;style&gt;
@media (device-aspect-ratio:16/9) {
    .box{ height: 100px;width: 100px; background-color: pink;}        
}
&lt;/style&gt;
&lt;div class="box"&gt;&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/media/m4.html" frameborder="0" width="320" height="240"></iframe>

【5】设备高度（device-height）

&emsp;&emsp;设备高度描述了输出设备的高度

&emsp;&emsp;向显示在最小高度1000px的屏幕上的文档应用样式表

<div>
<pre>&lt;style&gt;
@media (min-device-height: 1000px) {
    .box{ height: 100px;width: 100px; background-color: pink;}        
}
&lt;/style&gt;
&lt;div class="box"&gt;&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/media/m5.html" frameborder="0" width="320" height="240"></iframe>

【6】设备宽度（device-width）

&emsp;&emsp;设备宽度描述了输出设备的宽度&nbsp;

&emsp;&emsp;向显示在最小宽度1000px的屏幕上的文档应用样式表

<div>
<pre>&lt;style&gt;
@media (min-device-width: 1000px) {
    .box{ height: 100px; width: 100px;background-color: lightblue; }        
}
&lt;/style&gt;
&lt;div class="box"&gt;&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/media/m6.html" frameborder="0" width="320" height="240"></iframe>

【7】网格（grid）

&emsp;&emsp;网格判断输出设备是网格设备还是位图设备。如果设备是基于网格的（例如电传打字机终端或只能显示一种字形的电话），该值为1，否则为0

&emsp;&emsp;向非网格设备应用样式表

<div>
<pre>&lt;style&gt;
@media (grid:0) {
    .box{height: 100px;width: 100px; background-color: lightgreen;}        
}
&lt;/style&gt;
&lt;div class="box"&gt;&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/media/m7.html" frameborder="0" width="320" height="240"></iframe>

【8】高度（height）

&emsp;&emsp;高度描述了输出设备渲染区域（如可视区域的高度或打印机纸盒的高度）的高度

&emsp;&emsp;向高度大于800px的可视区域的设备应用样式表

<div>
<pre>&lt;style&gt;
@media (min-height:800px) {
    .box{ height: 100px; width: 100px;background-color: lightgreen; }        
}
&lt;/style&gt;
&lt;div class="box"&gt;&lt;/div&gt;</pre>
</div>

【9】宽度（width）

&emsp;&emsp;宽度描述了输出设备渲染区域的宽度

&emsp;&emsp;向宽度大于800px的可视区域的设备应用样式表

<div>
<pre>&lt;style&gt;
@media (min-width:800px) {
    .box{ height: 100px;width: 100px; background-color: lightgreen;}        
}
&lt;/style&gt;
&lt;div class="box"&gt;&lt;/div&gt;</pre>
</div>

【10】黑白（monochrome）

&emsp;&emsp;黑白指定了一个黑白（灰度）设备每个像素的比特数。如果不是黑白设备，值为0

&emsp;&emsp;向非黑白设备应用样式表

<div>
<pre>&lt;style&gt;
@media (monochrome:0) {
    .box{height: 100px; width: 100px; background-color: lightgreen;}        
}
&lt;/style&gt;
&lt;div class="box"&gt;&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/media/m8.html" frameborder="0" width="320" height="240"></iframe>

【11】方向（orientation）

&emsp;&emsp;方向指定了设备处于横屏（宽度大于宽度）模式还是竖屏（高度大于宽度）模式

&emsp;&emsp;值：landscape(横屏) | portrait(竖屏)

&emsp;&emsp;向竖屏设备应用样式表

<div>
<pre>&lt;style&gt;
@media (orientation: portrait) {
    .box{height: 100px;width: 100px;background-color: lightgreen; }        
}
&lt;/style&gt;
&lt;div class="box"&gt;&lt;/div&gt;</pre>
</div>

【12】分辨率（resolution）

&emsp;&emsp;分辨率指定输出设备的分辨率（像素密度）。分辨率可以用每英寸（dpi）或每厘米（dpcm）的点数来表示

&emsp;&emsp;注意：关于屏幕三要素(屏幕尺寸、分辨率、像素密度)的相关内容[移步至此](http://www.cnblogs.com/xiaohuochai/p/5494654.html)

&emsp;&emsp;向每英寸至少90点的设备应用样式

<div>
<pre>&lt;style&gt;
@media (min-resolution: 90dpi) {
    .box{height: 100px;width: 100px; background-color: lightgreen; }        
}
&lt;/style&gt;
&lt;div class="box"&gt;&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/media/m9.html" frameborder="0" width="320" height="240"></iframe>

【13】扫描（scan）

&emsp;&emsp;扫描描述了电视输出设备的扫描过程

&emsp;&emsp;值： progressive | interlace

&nbsp;

### 语法

&emsp;&emsp;媒体查询包含了一个CSS2已有的媒介类型(或称为媒体类型)和CSS3新增的包含一个或多个表达式的媒体属性，这些媒体属性会被解析成真或假

&emsp;&emsp;当媒体查询为真时，相关的样式表或样式规则就会按照正常的级联规则被应用。即使媒体查询返回假， &lt;link&gt; 标签上带有媒体查询的样式表仍将被下载（只不过不会被应用）

<div>
<pre>&lt;link rel="stylesheet" href="style.css" media="print"&gt;

&lt;div class="box"&gt;&lt;/div&gt;    </pre>
</div>

&emsp;&emsp;media并不是'print'，所以媒体查询为假。但是，style.css文件依然被下载

![mediaPrint](https://pic.xiaohuochai.site/blog/CSS_layout_mediaPrint.jpg)

**逻辑操作符**

&emsp;&emsp;操作符not、and、only和逗号(,)可以用来构建复杂的媒体查询

**and**

&emsp;&emsp;and操作符用来把多个媒体属性组合起来，合并到同一条媒体查询中。只有当每个属性都为真时，这条查询的结果才为真

&emsp;&emsp;注意：在不使用not或only操作符的情况下，媒体类型是可选的，默认为all

&emsp;&emsp;满足横屏以及最小宽度为700px的条件应用样式表

<div>
<pre>@media all and (min-width: 700px) and (orientation: landscape) { ... }</pre>
</div>

&emsp;&emsp;由于不使用not或only操作符的情况下，媒体类型是可选的，默认为 all，所以可以简写为

<div>
<pre>@media (min-width: 700px) and (orientation: landscape) { ... }</pre>
</div>

**or**

&emsp;&emsp;将多个媒体查询以逗号分隔放在一起；只要其中任何一个为真，整个媒体语句就返回真，相当于or操作符

&emsp;&emsp;满足最小宽度为700像素或是横屏的手持设备应用样式表

<div>
<pre>@media (min-width: 700px), handheld and (orientation: landscape) { ... }</pre>
</div>

**not**

&emsp;&emsp;not操作符用来对一条媒体查询的结果进行取反

&emsp;&emsp;注意：not关键字仅能应用于整个查询，而不能单独应用于一个独立的查询

<div>
<pre>@media not all and (monochrome) { ... }
//等价于
@media not (all and (monochrome)) { ... }</pre>
</div>

**only**

&emsp;&emsp;only操作符表示仅在媒体查询匹配成功时应用指定样式。可以通过它让选中的样式在老式浏览器中不被应用

<div>
<pre>media="only screen and (max-width:1000px)"{...}</pre>
</div>

&emsp;&emsp;上面这行代码，在老式浏览器中被解析为media="only"，因为没有一个叫only的设备，所以实际上老式浏览器不会应用样式

<div>
<pre>media="screen and (max-width:1000px)"{...}</pre>
</div>

&emsp;&emsp;上面这行代码，在老式浏览器中被解析为media="screen"，它把后面的逻辑表达式忽略了。所以老式浏览器会应用样式

&emsp;&emsp;所以，在使用媒体查询时，only最好不要忽略

&nbsp;

### 方法

&emsp;&emsp;window.matchMedia()方法用来检查CSS的mediaQuery语句

&emsp;&emsp;注意：IE9-浏览器不支持，可以使用第三方函数库[matchMedia.js](https://github.com/paulirish/matchMedia.js/)

**属性**

&emsp;&emsp;window.matchMedia()方法接受一个mediaQuery语句的字符串作为参数，返回一个MediaQueryList对象。该对象有media和matches两个属性

<div>
<pre>media：返回所查询的mediaQuery语句字符串
matches：返回一个布尔值，表示当前环境是否匹配查询语句</pre>
</div>
<div>
<pre>var result = window.matchMedia('(min-width: 600px)');
console.log(result.media); //'(min-width: 600px)'
console.log(result.matches); // true</pre>
</div>

&emsp;&emsp;可以根据matchMedia()方法的matches属性的不同结果，进行对应的设置

<div>
<pre>var result = window.matchMedia('(min-width: 600px)');
if (result.matches) {
  //
}else{
 //
}</pre>
</div>

&emsp;&emsp;注意：如果window.matchMedia无法解析mediaQuery参数，matches属性返回的总是false，而不是报错

<div>
<pre>var result = window.matchMedia('123');
console.log(result.matches);//false</pre>
</div>

**事件**

&emsp;&emsp;window.matchMedia方法返回的MediaQueryList对象有两个方法，用来监听事件：addListener方法和removeListener方法

<div>
<pre>// 指定回调函数
mql.addListener(mqCallback);
// 撤销回调函数
mql.removeListener(mqCallback);</pre>
</div>

&emsp;&emsp;注意，只有mediaQuery查询结果发生变化时，才调用指定的回调函数

&emsp;&emsp;所以，如果想要mediaQuery查询未变化时，就显示相应效果，需要提前调用一次函数

&emsp;&emsp;下面这个例子是当页面宽度小于1000px时，页面背景颜色为品红色；否则为淡蓝色

<div>
<pre>var mql = window.matchMedia("(min-width: 1000px)");
mqCallback(mql);
mql.addListener(mqCallback);
function mqCallback(mql) {
  if (mql.matches) {
    document.body.background = 'pink';
  }else{
      document.body.background = 'lightblue';
  }
}</pre>
</div>

&emsp;&emsp;[打开mediaQuery的DEMO](https://demo.xiaohuochai.site/css/media/matchMedia.html)

&nbsp;

### 打印样式

&emsp;&emsp;媒体查询的一个常用功能是打印样式的设置，主要是背景清除、字体颜色变黑等

<div>
<pre>@media print{
    *,*:before,*:after{
        background:transparent!important;
        color:#000 !important;
        box-shadow: none !important;
        text-shadow: none !important;
    }
    a,a:visited{
        text-decoration: underline;
    }
    a[href]:after{
        content:"(" attr(href) ")";
    }
    abbr[title]:after{
        content:"(" attr(title) ")";
    }
    a[href^="#"]:after,a[href^="javascript:;"]:after{
        content:"";
    }
    pre,blockquote{
        border: 1px solid #999;
        /*只有opera浏览器起作用，避免在元素内部插入分页符*/
        page-break-inside:avoid;
    }
    thead{
        display:table-header-group;
    }
    tr,img{
        page-break-inside:avoid;
    }
    img{
        max-width:100%!important;
    }
    p,h2,h3{
        /*元素内部发生分页时，最少保留3行*/
        orphans:3;
        /*元素内部发生分页时，元素顶部最少保留3行*/
        windows:3;
    }
    h2,h3{
        /*避免在元素后面插入一个分页符*/
        page-break-after:avoid;
    }
}</pre>
</div>

&nbsp;

### 相对单位

&emsp;&emsp;如果媒体查询@media使用的是相对单位，如rem，这里有一个坑需要着重强调一下

&emsp;&emsp;一般而言，rem是相对于HTML的字体大小的。但是，由于媒体查询的级别非常高，它并不是HTML的子元素，不是相对于HTML，而是相对于浏览器的，而浏览器的默认字体大小是16px

&emsp;&emsp;如果HTML设置字体大小为12px，设置如下媒体查询

<div>
<pre>media="only screen and (max-width:1rem)"</pre>
</div>

&emsp;&emsp;实际上，max-width等于16px，而不是12px

&emsp;&emsp;而正是由于媒体查询是相对于浏览器的， 所以使用rem就没有必要，完全可以使用em来替代

<div>
<pre>media="only screen and (max-width:1em)"</pre>
</div>

