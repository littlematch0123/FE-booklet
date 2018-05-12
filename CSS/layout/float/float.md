# 深入理解CSS浮动

&emsp;&emsp;浮动最早的使用是出自&lt;img src="#" align="right"&gt;，用于文本环绕图片的排版处理。如今浮动作为CSS中常用的布局方式，本文将就浮动内容做详细介绍和梳理

&nbsp;

### 定义

**float 浮动**

&emsp;&emsp;浮动元素脱离普通流，然后按照指定方向，向左或者向右移动，碰到父级边界或者另外一个浮动元素停止

&emsp;&emsp;值: left | right | none | inherit

&emsp;&emsp;初始值: none

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 无

&nbsp;

### 特性

&emsp;&emsp;【1】浮动流

&emsp;&emsp;正常流中元素一个接一个排列；浮动元素也构成浮动流

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/float/f1.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;【2】块级框

&emsp;&emsp;浮动元素自身会生成一个块级框，而不论这个元素本身是什么，使浮动元素周围的外边距不会合并

<iframe style="width: 100%; height: 483px;" src="https://demo.xiaohuochai.site/css/float/f2.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;【3】包裹性

&emsp;&emsp;浮动元素的包含块是指其最近的块级祖先元素，后代浮动元素不应该超出包含块的上、左、右边界。若不设置包含块的高度，包含块若浮动，则包含块会延伸，进而包含其所有后代浮动元素；若不设置包含块的宽度，包含块若浮动，则包含块宽度由后代浮动元素撑开

<iframe style="width: 100%; height: 307px;" src="https://demo.xiaohuochai.site/css/float/f3.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;【4】破坏性

&emsp;&emsp;浮动元素脱离正常流，并破坏了自身的行框属性，使其包含块元素的高度塌陷，使浮动框旁边的行框被缩短，从而给浮动框留出空间，行框围绕浮动框重新排列

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/float/f4.html" frameborder="0" width="320" height="240"></iframe>

### 表现

&emsp;&emsp;1、浮动元素的左(或右)外边界必须是源文档中之前出现的左浮动(或右浮动)元素的右(左)外边界。除非后出现浮动元素的顶端在先出现浮动元素的底端下面

&emsp;&emsp;2、左浮动元素的右外边界不会在其右边右浮动元素的左外边界的右边。右浮动元素的左外边界也不会在其左边任何左浮动元素的右外边界的左边

&emsp;&emsp;3、左(或右)浮动元素左边(右边)有另一个浮动元素，前者右外边界不能在其包含块右(左)边界的右边(左边)

&emsp;&emsp;4、浮动元素的左(或右)外边界不能超出其包含块的左(或右)内边界

&emsp;&emsp;5、一个浮动元素的顶端不能比其父元素的内顶端更高。如果一个浮动元素在两个合并外边距之间，放置这个浮动元素时就好像在两个元素之间有一个块级父元素

&emsp;&emsp;6、浮动元素的顶端不能比之前所有浮动元素或块级元素的顶端更高

&emsp;&emsp;7、如果源文档中一个浮动元素之前出现另一个元素，浮动元素的顶端不能比包含该元素所生成框的任何行框的顶端要高

&emsp;&emsp;8、浮动元素必须尽可能高地放置

&emsp;&emsp;9、左浮动元素必须向左尽可能远，右浮动元素则必须向右尽可能远。位置越高，就会向右或向左浮动得越远

<iframe style="width: 100%; height: 416px;" src="https://demo.xiaohuochai.site/css/float/f5.html" frameborder="0" width="320" height="240"></iframe>

### 重叠

&emsp;&emsp;浮动元素超出父元素边界的方法有两种：一种是浮动元素的宽度大于父元素的宽度，另一种就是设置负外边距。如果浮动元素存在负外边距，且浮动元素与正常流元素重叠

&emsp;&emsp;【1】行内框与一个浮动元素重叠时，其边框、背景和内容都在该浮动元素之上显示

&emsp;&emsp;【2】块框与一个浮动元素重叠时，其边框和背景在该浮动元素之下显示，而内容在浮动元素之上显示

<iframe style="width: 100%; height: 301px;" src="https://demo.xiaohuochai.site/css/float/f6.html" frameborder="0" width="320" height="240"></iframe>

