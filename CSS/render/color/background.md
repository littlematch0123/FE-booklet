# 深入理解CSS背景

&emsp;&emsp;背景和字体一样，是一个复合属性，而且它是一个使用频率很高的属性。在CSS3中，背景属性在保持以前用法的同时，增加了新的相关属性。本文将详细介绍关于背景的知识

&nbsp;

### 背景颜色

&emsp;&emsp;背景色background接受所有合法的颜色，还可以接受一个使背景透明的关键字。[关于颜色的设置请移步至此](http://www.cnblogs.com/xiaohuochai/p/5204448.html)。背景颜色不能继承。其默认值是transparent，如果一个元素没有指定的颜色，那么背景就应当是透明的，这样其祖先元素的背景才能可见。

&emsp;&emsp;值: &lt;color&gt; | transparent | inherit

&emsp;&emsp;初始值: transparent

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 无

<iframe style="width: 100%; height: 400px;" src="https://demo.xiaohuochai.site/css/background/b1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 背景图像

&emsp;&emsp;背景图像background-image会放在所指定的背景颜色之上。不过对于有alpha通道的图像格式，如PNG，可能会部分或完全透明，这会导致图像与背景色结合。另外，如果出于某种原因无法加载图像，背景色会取代图像

&emsp;&emsp;值: &lt;url&gt; | none | inherit

&emsp;&emsp;初始值: none

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 无

<iframe style="width: 100%; height: 240px;" src="https://demo.xiaohuochai.site/css/background/b2.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 背景平铺

&emsp;&emsp;背景图像默认从一个元素的左上角padding-box开始平铺(background-repeat)，但其从各个方向朝外面平铺，包括border区域。背景平铺的属性值中space和round是CSS3新增的值。space表示背景图像的两端对齐平铺，多出来的空间用空白代替；round也表示背景图像的两端对齐平铺，但多出来的空间通过自身拉伸来填充

&emsp;&emsp;注意：space和round这两个新增属性值firefox、safari和IE9-浏览器不支持

&emsp;&emsp;注意：背景平铺可以写空格间隔的两个值，分别代表横轴值和纵轴值，但这种写法IE8-浏览器不支持。写法为background-repeat: repeat no-repeat

&emsp;&emsp;值:&nbsp;repeat | repeat-x | repeat-y | no-repeat | space | round | inherit

&emsp;&emsp;初始值: repeat

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 无

<iframe style="width: 100%; height: 310px;" src="https://demo.xiaohuochai.site/css/background/b3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 背景定位

&emsp;&emsp;背景定位background-position

&emsp;&emsp;值: [[&lt;percentage] | &lt;length&gt; | left | center | right] [&lt;percentage&gt;] | &lt;length&gt; | top | center | bottom ] ? ] || [[left | center | right] || [top | center | bottom]] | inherit

&emsp;&emsp;初始值: 0% 0%

&emsp;&emsp;应用于: 全部元素

&emsp;&emsp;继承性: 无

&emsp;&emsp;百分数: 相对于元素和原图像的相应点

【写法】

【1】关键字

　x(水平方向):

&emsp;&emsp;left: 图的左侧和元素左侧对齐

&emsp;&emsp;center:图的中间和元素中间对齐

&emsp;&emsp;right:图的右侧和元素右侧对齐

　y(垂直方向):

&emsp;&emsp;top: 图的顶部和元素顶部对齐

&emsp;&emsp;center:图的中间和元素中间对齐

&emsp;&emsp;bottom:图的底部和元素底部对齐

&emsp;&emsp;注意：单一关键字：当某一方向的关键字为center时可省略

<iframe style="width: 100%; height: 570px;" src="https://demo.xiaohuochai.site/css/background/b4.html" frameborder="0" width="320" height="240"></iframe>

【2】具体值

　x(水平方向)：

&emsp;&emsp;正值从左向右移动，负值从右向左移动

　y(垂直方向)：

&emsp;&emsp;正值从上向下移动，负值从下向上移动

&emsp;&emsp;注意：页面左上角为原点(0,0)点

&emsp;&emsp;注意：背景图像移出到元素范围外的部分不显示

<iframe style="width: 100%; height: 210px;" src="https://demo.xiaohuochai.site/css/background/b5.html" frameborder="0" width="320" height="240"></iframe>

【3】百分比

　x%(水平方向)：

&emsp;&emsp;背景图像的x%对应元素的x%

　y%(垂直方向)：

&emsp;&emsp;背景图像的y%对应元素的y%

&emsp;&emsp;注意：若只写了一个值，另一个值将是50%

<iframe style="width: 100%; height: 210px;" src="https://demo.xiaohuochai.site/css/background/b6.html" frameborder="0" width="320" height="240"></iframe>

【新用法】

&emsp;&emsp;在CSS2.1中，背景定位只支持以左上角为参照进行定位，在CSS3中新增了可以选择参照方向的定位。第一个和第三个参数为要参照的方向，第二个和第四个参数为偏移值

<iframe style="width: 100%; height: 400px;" src="https://demo.xiaohuochai.site/css/background/b7.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 背景关联

&emsp;&emsp;background-attachment背景关联

&emsp;&emsp;值: scroll | fixed | inherit

&emsp;&emsp;初始值: scroll

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 无

&emsp;&emsp;scroll：背景图片会随着页面其余部分的滚动而移动。但如果它自己是可以滚动的元素，背景图不会随元素内容的滚动而滚动(默认值)

&emsp;&emsp;fixed：原图像不会随文档滚动，且原图像的放置由可视区的大小确定，而不是由包含该图像的元素的大小 或在可视区中的位置决定。在浏览器中，随着用户调整浏览器窗口的大小，可视区可能会改变。这会导致背景的原图像随着窗口大小的改变移动位置。所以某种意义上说，图像并不是固定的，它只是在可视区大小不改变的情况下保持固定

&emsp;&emsp;注意：IE6-浏览器无法处理非body元素上的固定关系

&emsp;&emsp;local：背景图片会随着页面其余部分的滚动而移动。但如果它自己是可以滚动的元素，背景图会随元素内容的滚动而滚动

&emsp;&emsp;注意：local属性值IE8-浏览器不支持

<iframe style="width: 100%; height: 400px;" src="https://demo.xiaohuochai.site/css/background/b8.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 背景原点

 &emsp;&emsp;背景原点(background-origin)属性主要用来决定背景定位属性的参考原点，即决定背景图片定位的起点。在默认情况下，背景图片的背景定位属性总是以元素左上角为坐标原点对背景图片进行背景定位。而背景原点属性可以根据自己的需求来改变背景图片的背景定位起始位置

&emsp;&emsp;注意：IE8-浏览器不支持

&emsp;&emsp;background-origin: padding-box || border-box || content-box

&emsp;&emsp;padding-box: 默认值，决定背景定位起始位置从padding的外边缘开始显示背景图片

&emsp;&emsp;border-box: 决定背景定位起始位置从border的外边缘开始显示背景图片

&emsp;&emsp;content-box: 决定背景定位起始位置从content的外边缘开始显示背景图片

&emsp;&emsp;注意：如果将background-attachment设置为fixed，background-origin将不起任何作用

<iframe style="width: 100%; height: 400px;" src="https://demo.xiaohuochai.site/css/background/b9.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 背景裁切

&emsp;&emsp;背景裁切(background-clip)属性用来定义背景图像的裁剪区域。同背景原点的属性有几分相似

&emsp;&emsp;注意：IE8-浏览器不支持

&emsp;&emsp;background-clip: padding-box || border-box || content-box

&emsp;&emsp;在webkit内核下支持text属性

&emsp;&emsp;-webkit-background-clip: text;

&emsp;&emsp;配合-webkit-text-fill-color: transparent;的属性可以使文字颜色呈现背景图像的效果

<iframe style="width: 100%; height: 420px;" src="https://demo.xiaohuochai.site/css/background/b10.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 背景尺寸

&emsp;&emsp;使用背景尺寸(background-size)属性可以指定背景图片的尺寸，可以控制背景图片在水平和垂直两个方向的缩放，也可以控制图片拉伸覆盖背景区域的方式，甚至还可以截取背景图片。背景图片能够自适应元素盒子的大小，实现与模块大小完全适应的背景图片，避免了因区块尺寸不同而需要设计不同的背景图片

&emsp;&emsp;注意：IE8-浏览器不支持

&emsp;&emsp;背景尺寸的特性有如下用途:在流体布局或者响应式布局中，确保背景图像能够始终适配容器大小；对于平铺的重复性背景图像，可以确保背景图像不会有截断效果；在流体布局中缩放背景图像来伪造出多列分栏效果；解决Retina屏幕双倍像素下背景图像模糊问题；使用链接或者列表元素的背景图像能和文本一起进行缩放

&emsp;&emsp;当背景尺寸属性为固定数值或百分比值时可以设置两个值，也可以设置一个值。只取一个值时，指定了背景图片的宽度，第二个值相当于auto，也就是指定了高度。在这种情况下，auto值设定之后能够让背景图片的高度自动地按照比例缩放

&emsp;&emsp;background-size: auto || &lt;length&gt; || &lt;percentage&gt; || cover || contain

&emsp;&emsp;auto: 默认值，将保持背景图片的原始高度和宽度

&emsp;&emsp;&lt;length&gt;: 取具体的整数值

&emsp;&emsp;&lt;percentage&gt;: 取百分比，相对于元素的宽度和padding的总和来计算

&emsp;&emsp;cover: 将背景图片放大，以适合铺满整个容器。但这种方法会致使背景图片失真。常与background-position: center配合来制作满屏背景效果。缺点是需要制作一张足够大的背景图片，否则在较大分辨率浏览器下会使背景图片失真

&emsp;&emsp;contain: 保持背景图像本身的宽度比例，将背景图像缩放到宽度或高度正好适应所定义背景容器的区域

<iframe style="width: 100%; height: 420px;" src="https://demo.xiaohuochai.site/css/background/b11.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 多背景

&emsp;&emsp;在使用CSS3之前，每个容器只能指定一张背景图像，因此每当需要增加一张背景图像时，必须至少添加一个容器来容纳它。使用伪元素显示附加图片其实就是嵌套HTML标签实现多背景图像的变身，通过:after和:before等伪元素生成附加元素来放置背景图像，表面上比直接嵌套HTML标签更干净一些，但其实是换汤不换药

&emsp;&emsp;注意：IE8-浏览器不支持

&emsp;&emsp;通过CSS3的多背景属性，HTML标记就不需要任何修改，在CSS的background-image或者background属性中列出需要使用的所有背景图像，用逗号分隔开。而且每张图片都具有background中的属性

&emsp;&emsp;CSS3多背景有层次之分，按照浏览器中显示时图像叠放的顺序从上到下指定，最先声明的背景图像将会居于最上层，最后指定的背景图像将置于最底层

<iframe style="width: 100%; height: 420px;" src="https://demo.xiaohuochai.site/css/background/b12.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;除了背景颜色之外，其他的属性都可以设置多个属性值，前提是元素有多个背景图像存在

&emsp;&emsp;对于不兼容多背景的浏览器来说，多背景属性写在单一背景属性的后面，而且还要确保这张单一背景图像确实可用。这是处理兼容CSS3多背景特性兼容的常用方案

&emsp;&emsp;background: [background-image] | [background-color] | [background-position][/background-size] | [background-repeat] | [background-attachment] | [background-origin] | [background-clip],*

&emsp;&emsp;注意：若background在background-origin和background-clip中仅存在一个值，则该值为background-clip；若存在两个值，则前面为background-origin，后面为background-clip

<iframe style="width: 100%; height: 760px;" src="https://demo.xiaohuochai.site/css/background/b13.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;注意：所有背景属性都不能继承

