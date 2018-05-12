# CSS滚动条

&emsp;&emsp;滚动条在网页中经常见到，却并没有受到足够的重视。只有当因为滚动条的问题需要处理兼容性时，才进行调试操作。本文就滚动条的常见内容进行梳理

&nbsp;

### 条件

&emsp;&emsp;滚动条和overflow是紧密相关的。只有当父级的overflow的值是auto或scroll，并且元素的内容超出元素区域时，才有可能出现滚动条

<iframe style="width: 100%; height: 220px;" src="https://demo.xiaohuochai.site/css/scrollbar/s1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 默认

&emsp;&emsp;无论什么浏览器，默认滚动条均来自&lt;html&gt;，而不是&lt;body&gt;。因为&lt;body&gt;元素默认有8px的margin。若滚动条来自&lt;body&gt;元素，则滚动条与页面则应该有8px的间距，实际上并没有间距，所以滚动条来自&lt;html&gt;元素

&nbsp;

### 尺寸

&emsp;&emsp;通过以下代码可得出滚动条会占用浏览器的可用宽度为：

<div>
<pre>chrome/firefox/IE 17px
safari 21px</pre>
</div>
<div>
<pre>.box{
    width: 400px;
    overflow: scroll;
}
.in{
    *zoom: 1;
}</pre>
</div>
<div>
<pre>&lt;div class="box"&gt;
    &lt;div id="in" class="in"&gt;&lt;/div&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>console.log(400-document.getElementById('in').clientWidth);</pre>
</div>

&nbsp;

### 兼容

【1】默认情况下IE7-浏览器默认有一条纵向滚动条，而其他浏览器则没有

<div>
<pre>//IE7-浏览器 
html{overflow-y: scroll;}
//其他浏览器
html{overflow: auto;}
//去除页面默认滚动条
html{overflow: hidden;}</pre>
</div>

【2】IE7-浏览器与其他浏览器关于滚动条的宽度设定机制不同

<div>
<pre>.box{
    width: 200px;
    height: 100px;
    background-color: pink;
    overflow: scroll;
}
.in{
    width: 100%;
    height: 60px;
    background-color: lightgreen;
}</pre>
</div>
<div>
<pre>&lt;div class="box"&gt;
    &lt;div class="in"&gt;测试文字&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

&emsp;&emsp;父级box出现纵向滚动条，实际上子级in的可用宽度就缩小了。IE7-浏览器的子级宽度忽略了该滚动条的宽度，子级宽度=400*100%=400px，则出现了横向滚动条；而其他浏览器的子级宽度考虑到该滚动条的宽度，子级宽度=(400-滚动条宽度)*100%

&emsp;&emsp;左图为IE7-浏览器，右图为其他浏览器

<img src="https://pic.xiaohuochai.site/blog/CSS_render_scrollbar1.jpg" alt="scrollbar1">
<img src="https://pic.xiaohuochai.site/blog/CSS_render_scrollbar2.jpg" alt="scrollbar2">

【3】水平居中跳动问题

&emsp;&emsp;当一个元素在页面中水平居中时，页面中出现纵向滚动条会发生水平居中的跳出问题。解决方法如下:

<div>
<pre>//IE8-默认
html{overflow-y: scroll}
//IE9+，100vw表示浏览器的宽度，100%表示可用内容的宽度
.container{padding-left: calc(100vw-100%)}</pre>
</div>

&nbsp;

### 自定义

【1】IE

&emsp;&emsp;IE浏览器支持通过CSS样式来改变滚动条的部件的自定义颜色

<div>
<pre>scrollbar-face-color 滚动条凸出部分的颜色
scrollbar-shadow-color 立体滚动条阴影的颜色
scrollbar-highlight-color 滚动条空白部分的颜色
scrollbar-3dlight-color 滚动条亮边的颜色
scrollbar-darkshadow-color 滚动条强阴影的颜色
scrollbar-track-color 滚动条的背景颜色 
scrollbar-arrow-color 上下按钮上三角箭头的颜色 
scrollbar-base-color  滚动条的基本颜色</pre>
</div>

<iframe style="width: 100%; height: 330px;" src="https://demo.xiaohuochai.site/css/scrollbar/s2.html" frameborder="0" width="320" height="240"></iframe>

【2】webkit

&emsp;&emsp;webkit内核的浏览器支持滚动条自定义样式，但和IE不同，webkit是通过伪类来实现的

**组成**

<div>
<pre>::-webkit-scrollbar 滚动条整体部分
::-webkit-scrollbar-thumb 滚动滑块
::-webkit-scrollbar-track 外层轨道
::-webkit-scrollbar-track-piece 内层轨道
::-webkit-scrollbar-corner 边角
::-webkit-scrollbar-button 两端按钮</pre>
</div>

&emsp;&emsp;注意：当为滚动条设置宽高样式为百分比值时，是相对视窗大小来说的

<iframe style="width: 100%; height: 650px;" src="https://demo.xiaohuochai.site/css/scrollbar/s3.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;注意：滚动条的层叠关系为scrollbar在最底层，往上依次是track外层轨道，track-piece内层轨道。而button按钮、corner边角和thumb滑块有最顶层

**伪类相关**

<div>
<pre>:horizontal
//horizontal伪类适用于任何水平方向上的滚动条

:vertical
//vertical伪类适用于任何垂直方向的滚动条

:decrement
//decrement伪类适用于按钮和轨道碎片。表示递减的按钮或轨道碎片，例如可以使区域向上或者向右移动的区域和按钮

:increment
//increment伪类适用于按钮和轨道碎片。表示递增的按钮或轨道碎片，例如可以使区域向下或者向左移动的区域和按钮

:start
//start伪类适用于按钮和轨道碎片。表示对象（按钮 轨道碎片）是否放在滑块的前面

:end
//end伪类适用于按钮和轨道碎片。表示对象（按钮 轨道碎片）是否放在滑块的后面

:double-button
//double-button伪类适用于按钮和轨道碎片。判断轨道结束的位置是否是一对按钮。也就是轨道碎片紧挨着一对在一起的按钮。

:single-button
//single-button伪类适用于按钮和轨道碎片。判断轨道结束的位置是否是一个按钮。也就是轨道碎片紧挨着一个单独的按钮。

:no-button
no-button伪类表示轨道结束的位置没有按钮。

:corner-present
//corner-present伪类表示滚动条的角落是否存在。

:window-inactive
//适用于所有滚动条，表示包含滚动条的区域，焦点不在该窗口的时候。

::-webkit-scrollbar-track-piece:start {
/*滚动条上半边或左半边*/
}

::-webkit-scrollbar-thumb:window-inactive {
/*当焦点不在当前区域滑块的状态*/
}

::-webkit-scrollbar-button:horizontal:decrement:hover {
/*当鼠标在水平滚动条下面的按钮上的状态*/
}</pre>
</div>

**常用设置**

<div>
<pre>
.box{
    width: 200px;
    height: 100px;
    background-color: pink;
    overflow: scroll;
    font-size: 20px;
    line-height: 40px;
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
.box::-webkit-scrollbar
{
    width: 16px;
    height: 16px;
    background-color: #F5F5F5;
}
/*定义滚动条轨道 内阴影+圆角*/
.box::-webkit-scrollbar-track
{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
}
/*定义滑块 内阴影+圆角*/
.box::-webkit-scrollbar-thumb
{
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #555;
}</pre>
</div>
<div>
<pre>&lt;div class="box"&gt;我是特别长特别长特别长特别长特别长特别长特别长特别长特别长特别长特别长特别长的测试文字&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/scrollbar/s4.html" frameborder="0" width="320" height="240"></iframe>

**样式类举**

<iframe style="width: 100%; height: 600px;" src="https://demo.xiaohuochai.site/css/scrollbar/s5.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;[自定义滚动条源码](http://runjs.cn/code/81kh9c6p)

