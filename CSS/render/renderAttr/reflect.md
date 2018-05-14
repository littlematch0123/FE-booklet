# CSS倒影

&emsp;&emsp;CSS倒影目前只有chrome和safari浏览器支持，且需要添加-webkit-前缀。本文将详细介绍CSS倒影box-reflect

<p>&nbsp;</p>

### 语法

<p><strong>-webkit-box-reflect</strong></p>

&emsp;&emsp;初始值: none

&emsp;&emsp;应用于: 块级元素(包括inline-block)

&emsp;&emsp;继承性: 无

&emsp;&emsp;值: none | `<direction>` `<offset>`? `<mask-box-image>`?

&emsp;&emsp;`<direction>`(必须)表示box-reflect生成倒影的方向，主要包括以下几个值：

    above:表示生成的倒影在对象(原图)的上方；
    below:表示生成的倒影在对象(原图)的下方；
    left:表示生成的倒影在对象(原图)的左侧；
    right:表示生成的倒影在对象(原图)的右侧；

&emsp;&emsp;`<offset>`(可选)用来设置生成倒影与对象（原图）之间的间距，其取值可以是固定的像素值，也可以是百分比值

&emsp;&emsp;`<mask-box-image>`(可选)用来设置倒影的遮罩效果，可以是背景图片，也可以是渐变生成的背景图像



<p>&nbsp;</p>

### DEMO

<iframe style="width: 100%; height: 490px" src="https://demo.xiaohuochai.site/css/reflect/r1.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>