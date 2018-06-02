# 前端工程师技能之photoshop巧用系列第三篇——切图篇

&emsp;&emsp;前端工程师除了使用photoshop进行测量之外，更重要的是要使用该软件进行切图。本文是photoshop巧用系列的第三篇&mdash;&mdash;切图篇

&nbsp;

### 切图信息

&emsp;&emsp;在网页制作中有哪些图片是需要被切出来的呢？主要分为两类，一类是修饰性图片，另一类是内容性图片

&emsp;&emsp;【1】修饰性图片

&emsp;&emsp;修饰性图片主要对网页内容进行修饰，一般会被制作为雪碧图，用在background属性中，通常保存为png24(IE6不支持半透明)和png8格式。修饰性图片主要包括以下几类：

&emsp;&emsp;&emsp;&emsp;1、图标、logo

&emsp;&emsp;&emsp;&emsp;2、有特殊效果的按钮、文字等(如果设计师设计的字体不太常见的话，把文字当图片来切出来)

&emsp;&emsp;&emsp;&emsp;3、非纯色的背景

&emsp;&emsp;【2】内容性图片

&emsp;&emsp;一图胜千言，这里的&ldquo;一图&rdquo;就是指内容性图片，主要为网页提供内容，一般用在&lt;img&gt;标签中。内容性图片颜色较丰富，一般存为JPG格式，且需要一定的压缩。内容性图片主要包括以下几类：

&emsp;&emsp;&emsp;&emsp;　1、Banner、广告图片

&emsp;&emsp;&emsp;&emsp;　2、文章中的配图

&emsp;&emsp;&emsp;&emsp;注意：有些内容性图片是服务器数据，不用切图，只用&lt;img&gt;占位即可

&nbsp;

### 切图步骤

【1】**隐藏文字只留背景**

&emsp;&emsp;若文字上有特殊效果，无法用代码写出，则把文字和背景一起切出来

&emsp;&emsp;**1、若文字为独立图层，则隐藏文字图片**

&emsp;&emsp;&emsp;&emsp;首先找到文字图层，然后去掉眼睛图标

![cut1](https://pic.xiaohuochai.site/blog/helper_ps_cut1.jpg)

![cut2](https://pic.xiaohuochai.site/blog/helper_ps_cut2.jpg)


&emsp;&emsp;**2、若文字和背景合并，平铺背景覆盖文字**

&emsp;&emsp;&emsp;&emsp;a、若背景是可以拉伸的，用矩形选框工具在背景上画一个小的矩形框，用自由变换工具(ctrl+t)拉伸背景，将文字覆盖，然后双击或按回车键

![cut3](https://pic.xiaohuochai.site/blog/helper_ps_cut3.jpg)

![cut4](https://pic.xiaohuochai.site/blog/helper_ps_cut4.jpg)

![cut5](https://pic.xiaohuochai.site/blog/helper_ps_cut5.jpg)

![cut6](https://pic.xiaohuochai.site/blog/helper_ps_cut6.jpg)

![cut7](https://pic.xiaohuochai.site/blog/helper_ps_cut7.jpg)

![cut8](https://pic.xiaohuochai.site/blog/helper_ps_cut8.jpg)


&emsp;&emsp;&emsp;&emsp;b、若背景有纹理，不可以拉伸，用矩形选框工具在背景上画一个小的矩形框，用移动工具&lt;v&gt;+alt来复制当前图层，一次次地按下方向键或用鼠标移动(鼠标移动时，按住shift键时可以保证图层按照直线移动)，最终将文字全部覆盖为止

![cut9](https://pic.xiaohuochai.site/blog/helper_ps_cut9.jpg)

![cut10](https://pic.xiaohuochai.site/blog/helper_ps_cut10.jpg)

![cut11](https://pic.xiaohuochai.site/blog/helper_ps_cut11.jpg)

![cut12](https://pic.xiaohuochai.site/blog/helper_ps_cut12.jpg)

![cut13](https://pic.xiaohuochai.site/blog/helper_ps_cut13.jpg)

![cut14](https://pic.xiaohuochai.site/blog/helper_ps_cut14.jpg)


【2】**移动工具选中所需图层(ctrl+点击图层的矩形区域)，出现蚂蚁线**

【3】**合并图层(ctrl+e)(可选)**

&emsp;&emsp;勾选自动选择，然后将需要的多个图层合并

【4】**复制图层(ctrl+c) -&gt;新建文件(ctrl+n)，并按确定 -&gt; 粘贴图层(ctrl+v)**

![cut15](https://pic.xiaohuochai.site/blog/helper_ps_cut15.jpg)

![cut16](https://pic.xiaohuochai.site/blog/helper_ps_cut16.jpg)

![cut17](https://pic.xiaohuochai.site/blog/helper_ps_cut17.jpg)

![cut18](https://pic.xiaohuochai.site/blog/helper_ps_cut18.jpg)

![cut19](https://pic.xiaohuochai.site/blog/helper_ps_cut19.jpg)

![cut20](https://pic.xiaohuochai.site/blog/helper_ps_cut20.jpg)

&nbsp;

### 实战

&emsp;&emsp;下面将从切不同类型的图片的角度出发来进行实战说明

【切png8】

&emsp;&emsp;因为png8图片不支持半透明，所以需要带背景切

&emsp;&emsp;1、合并可见图层(shift+ctrl+e)

&emsp;&emsp;2、矩形选框工具选择一个大的区域

&emsp;&emsp;3、魔棒工具去除多余部分(从选区中减去: 按住alt)

![cut21](https://pic.xiaohuochai.site/blog/helper_ps_cut21.jpg)

![cut22](https://pic.xiaohuochai.site/blog/helper_ps_cut22.jpg)

![cut23](https://pic.xiaohuochai.site/blog/helper_ps_cut23.jpg)

&nbsp;

【切不规则小图标】

&emsp;&emsp;切法和png8的切法类似

&emsp;&emsp;&emsp;&emsp;注意：选择镂空小图标时，一定要取消[连续]

![cut24](https://pic.xiaohuochai.site/blog/helper_ps_cut24.jpg)

![cut25](https://pic.xiaohuochai.site/blog/helper_ps_cut25.jpg)

&nbsp;

【切可平铺背景】

&emsp;&emsp;1、用矩形选框工具选取一块区域

&emsp;&emsp;2、复制粘贴到新文件中(平铺内容充满文件的宽(x轴)或高(y轴))

&emsp;&emsp;&emsp;&emsp;　若沿x轴平铺，则铺满x轴；若沿y轴平铺，则铺满y轴

![cut26](https://pic.xiaohuochai.site/blog/helper_ps_cut26.jpg)

【切片工具一刀切】

&emsp;&emsp;适用于可以一刀切的活动页

&emsp;&emsp;1、拉参考线

&emsp;&emsp;2、选择切片工具

&emsp;&emsp;3、点击基于参考线的切片按钮

&emsp;&emsp;4、从切片工具切换到切片选择工具(在同一个按钮下)

&emsp;&emsp;5、双击切片，更改需要的名称

&emsp;&emsp;6、保存

&emsp;&emsp;注意：全选切片不可用ctrl+a，只能拖动矩形框来选中所有切片，选中后颜色变亮，然后统一设置存储格式

![cut27](https://pic.xiaohuochai.site/blog/helper_ps_cut27.jpg)

![cut28](https://pic.xiaohuochai.site/blog/helper_ps_cut28.jpg)

![cut29](https://pic.xiaohuochai.site/blog/helper_ps_cut29.jpg)

![cut30](https://pic.xiaohuochai.site/blog/helper_ps_cut30.jpg)

![cut31](https://pic.xiaohuochai.site/blog/helper_ps_cut31.jpg)

![cut32](https://pic.xiaohuochai.site/blog/helper_ps_cut32.jpg)
