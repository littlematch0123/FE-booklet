# CSS兼容性详解

&emsp;&emsp;对于前端工程师来说，不想面对又不得不面对的一个问题就是兼容性。在几年之前，处理兼容性，一般地就是处理IE低版本浏览器的兼容性。而近几年，随着移动端的发展，工程师也需要注意手机兼容性了。本文将详细介绍CSS兼容性

&nbsp;&nbsp;

### 盒模型属性

【宽高width/height】

<div>
<pre>(全兼容)
width
height

(IE6-不支持)
min-width
max-width
min-height
max-height</pre>
</div>

【内边距padding】

<div>
<pre>padding</pre>
</div>

【边框border】

<div>
<pre>(全兼容)
border
border-width
border-color
border-style

(IE8-不支持)
border-radius

(IE10-不支持)
border-image
border-image-source
border-image-slice
border-image-width
border-image-outset
border-image-repeat

(只有firefox支持，需要添加-moz-前缀)
border-colors</pre>
</div>

【外边距margin】

<div>
<pre>(全兼容)
margin

(IE不支持，且需要添加webkit或moz前缀)
margin-start
margin-end

(只有chrome和safari支持，且需要添加webkit前缀)
-webkit-margin-before
-webkit-margin-after</pre>
</div>

【轮廓outline】

<div>
<pre>(IE7-不支持)
outline
outline-width
outline-color
outline-style

(IE不支持)
outline-offset</pre>
</div>

【box-sizing】

&emsp;&emsp;注意：只有firefox支持padding-box属性值

<div>
<pre>(IE7-不支持)
box-sizing</pre>
</div>

&nbsp;

### 布局类属性

【display】

&emsp;&emsp;注意：IE7-浏览器不支持table类属性值

<div>
<pre>(全兼容)
display</pre>
</div>

【浮动】

<div>
<pre>(全兼容)
float
clear</pre>
</div>

【定位】

&emsp;&emsp;注意：IE6-不支持固定定位position:fixed

<div>
<pre>(全兼容)
position
left
right
top
bottom
z-index</pre>
</div>

【溢出相关】

<div>
<pre>(全兼容)
overflow
overflow-x
overflow-y
clip
visibility

(IE不支持)
resize</pre>
</div>

【flex】

<div>
<pre>(IE9-不支持)
flex-direction
flex-wrap
flex-flow
justify-content
align-items
align-content
align-self
flex-basis
flex-grow
flex-shrink
flex
order</pre>
</div>

【多列布局】

<div>
<pre>(IE10+和chrome浏览器支持标准写法，firefox、safari浏览器及移动端android、IOS需要添加前缀)
column-width
column-count
column-gap
column-rule
column-span(firefox不支持该属性)
columns

(只有firefox支持带前缀的column-fill属性)
column-fill</pre>
</div>

【grid】

<div>
<pre>(IE9-不支持，IE10+需要添加-ms-前缀，android4.4.4-不支持，IOS10.2-不支持)
grid-template-rows
grid-template-columns
grid-template-areas
grid-column-gap
grid-row-gap
grid-gap
grid-row-start
grid-row-end
grid-row
grid-column-start
grid-column-end
grid-column
grid-area
grid-auto-flow
grid-auto-rows
grid-auto-columns
justify-items
justify-self
align-items
align-self</pre>
</div>

&nbsp;

### 文本类属性

【字体font】

<div>
<pre>(全兼容)
font
font-family
font-size
font-style
font-variant
font-weight
line-height
@font-face</pre>
</div>

【首行缩进text-indent】

<div>
<pre>(全兼容)
text-indent</pre>
</div>

【对齐】

&emsp;&emsp;注意：IE7-浏览器中vertical-align的百分比值不支持小数行高

<div>
<pre>(全兼容)
text-align
vertical-align

(safari浏览器、IOS、androis4.4-浏览器不支持)
text-align-last</pre>
</div>

【间隔】

<div>
<pre>(全兼容)
word-spacing
letter-spacing</pre>
</div>

【大小写text-transform】

<div>
<pre>(全兼容)
text-transform</pre>
</div>

【划线text-decoration】

<div>
<pre>(全兼容)
text-decoration</pre>
</div>

【空白符white-space】

&emsp;&emsp;注意：IE7-浏览器不支持pre-line和pre-wrap这两个属性值

<div>
<pre>(全兼容)
white-space</pre>
</div>

【换行】

&emsp;&emsp;注意1：W3C建议使用overflow-wrap替换word-wrap

&emsp;&emsp;注意2：移动端目前基本都不支持word-break的属性值keep-all　

<div>
<pre>(全兼容)
word-wrap
word-break

(IE不支持)
overflow-wrap</pre>
</div>

【文本方向】

<div>
<pre>(全兼容)
direction
unicode-bidi

(safari和移动端IOS和android需要添加-webkit-前缀；IE浏览器只支持自己的私有属性值)
writing-mode
</pre>
</div>

【文本溢出text-overflow】

<div>
<pre>(全兼容)
text-overflow</pre>
</div>

【文本阴影text-shadow】

<div>
<pre>(IE9-不支持)
text-shadow</pre>
</div>

&nbsp;

### 修饰类属性

【背景background】

<div>
<pre>(全兼容)
background
background-color
background-image
background-repeat
background-position

(IE8-不支持)
background-attachment
background-clip
background-size</pre>
</div>

【前景和透明度】

<div>
<pre>(全兼容)
color

(IE8-不支持)
opacity</pre>
</div>

【颜色模式】

&emsp;&emsp;注意：IE7-不支持color:transparent，但支持background-color: transparent和border-color: transparent

<div>
<pre>(全兼容)
命名颜色
16进制
RGB

(IE8-不支持)
currentColor
RGBA
HSL
HSLA</pre>
</div>

【光标cursor】

&emsp;&emsp;注意：IE7-不支持拓展样式

<div>
<pre>(全兼容)
cursor</pre>
</div>

【过渡transition】&nbsp;

<div>
<pre>(IE9-不支持，safari3.1-6、IOS3.2-6.1、android2.1-4.3需要添加-webkit-前缀)
transition-property
transition-duration
transiton-timing-function
transition-delay
transition</pre>
</div>

【变形transform】

<div>
<pre>(IE9-不支持，safari3.1-8、android2.1-4.4.4、IOS3.2-8.4都需要添加前缀)
transform
transform-origin
transform-style
perspective
perspective-origin
backface-visibility
</pre>
</div>

【渐变gradient】

&emsp;&emsp;IE9-不支持，safari4-5、IOS3.2-4.3、android2.1-3只支持线性渐变，且需要添加-webkit-；safari5.1-6、IOS5.1-6.1、android4-4.3支持线性和径向渐变，且需要添加-webkit-

【动画animation】

<div>
<pre>(IE9-不支持；safari4-8、IOS3.2-8.4、android2.1-4.4.4需要添加-webkit-前缀)
animation
animation-name
animation-duration
animation-timing-function
animation-delay
animation-iteration-count
animation-direction
animation-play-state
animation-fill-mode</pre>
</div>

【混合模式】

<div>
<pre>(IE浏览器、android4.4-不支持，safari和IOS需要添加-webkit-前缀)
mix-blend-mode
background-blend-mode
isolation</pre>
</div>

【滤镜filter】

<div>
<pre>(IE浏览器及android4.3-浏览器不支持，android4.4+需要添加-webkit-前缀)
filter</pre>
</div>

【倒影box-reflect】

&emsp;&emsp;只有chrome和safari浏览器支持，且需要添加-webkit-前缀

【will-change】

<div>
<pre>(IE13+、chrome49+、safari9.1+、IOS9.3+、Android52+)
will-change</pre>
</div>

&nbsp;

### 其他类属性

【表格】

<div>
<pre>(全兼容)
border-collapse
table-layout
caption-side

(IE7-不支持)
border-spacing
empty-cells</pre>
</div>

【分页】

<div>
<pre>(全兼容)
page-break-after
page-break-before
page-break-inside

(IE7-不支持)
orphans

(IE及手机端不支持)
windows</pre>
</div>

【选择器】

<div>
<pre>(全兼容)
通配选择器   *
元素选择器   div
类选择器     .box
ID选择器     #box
后代选择器   div a
分组选择器   h1,p

(IE6-不支持)
属性选择器    h1[class]
子元素选择器  ul &gt; li
相邻兄弟选择器 div + p

(IE7-不支持)
通用兄弟选择器 div ~ p</pre>
</div>

【伪类】

<div>
<pre>(全兼容)
:link
:visited

(IE6-不支持给&lt;a&gt;以外的其他元素设置伪类)
:hover
:active  

(IE7-不支持)
:focus
:lang()　

(IE8-不支持)
:target
:enabled   
:disabled   
:checked 
:nth-child(n)
:nth-last-child(n)
:first-child
:last-child
:only-child
:nth-of-type(n)
:nth-last-of-type(n)
:first-of-type
:last-of-type
:only-of-type
:root
:not
:empty
:target</pre>
</div>

【伪元素】

<div>
<pre>(只有当选择器部分和左大括号之间有空格时，IE6-浏览器才支持)
:first-letter
:first-line

(IE7-不支持)
:before
:after

(IE8-不支持)
::selection</pre>
</div>

【关键字】

<div>
<pre>(IE7-浏览器不支持)
inherit

(IE浏览器不支持)
initial

(IE不支持，safari9-不支持，ios9.2-不支持，android4.4.4-不支持)
unset
all

(只有safari9.1+和ios9.3+支持)
revert</pre>
</div>

【calc】　

&emsp;&emsp;注意：android4.4-4.4.4只支持加法和减法。IE9不支持用于backround-position

<div>
<pre>(IE8-、safari5.1-、ios5.1-、android4.3-不支持)
calc</pre>
</div>

【单位】

<div>
<pre>(全兼容)
px
in
cm
mm
q
pt
pc
em
ex
ch

(IE8-不支持)
rem

(IE8-浏览器不支持，IOS7.1-不支持，android4.3-不支持，对于vmax所有IE浏览器都不支持)
vh
vw
vmin
vmax</pre>
</div>



