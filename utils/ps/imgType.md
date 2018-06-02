# 前端工程师技能之photoshop巧用系列第四篇——图片格式

&emsp;&emsp;对于前端来说，图片格式是需要重要掌握的知识。本文是photoshop巧用系列第四篇&mdash;&mdash;图片格式

&nbsp;

### 图片格式

&emsp;&emsp;目前在前端的开发中常用的图片格式有jpg、png、gif，png分为png8和png24。最近svg格式也开始流行起来

**gif**

&emsp;&emsp;gif是无损的，具有文件小、支持动画及透明的优点。但gif无法支持半透明，且仅支持8bit的索引色，即在整个图片中，只能存在256种不同的颜色

&emsp;&emsp;但实际上，gif是一种逐渐被抛弃的图片格式。png格式的出现就是为了替代它

&emsp;&emsp;由于gif支持动画的这个&ldquo;一招鲜&rdquo;的本领，在网络中仍然占有一席之地，主要用于一些小图标

**jpg**

&emsp;&emsp;jpg又称为jpeg，是有损的，但采用了直接色，保证了色彩的丰富性。jpg图片支持透明和半透明，所有空白区域填充白色

&emsp;&emsp;jpg格式主要用于高清图、摄影图等大图

**png8**

&emsp;&emsp;png8是无损的，是png的索引色版本。

&emsp;&emsp;前面提到过，png是gif格式的替代者，在相同图片效果下，png8具有更小的文件体积，且支持透明度的调节

&emsp;&emsp;但png8不支持半透明，也不支持动画　

![imgType1](https://pic.xiaohuochai.site/blog/helper_ps_imgType1.png)

**png24**

&emsp;&emsp;png24是无损的，是png的直接色版本。　

&emsp;&emsp;png24支持透明，也支持半透明，但png有文件体积较大的缺点

&emsp;&emsp;png24的目标是替换jpg。但一般而言，png24的文件大小是jpg的5倍之多，但显示效果却只有一点点提升

&emsp;&emsp;所以，一般地，使用半透明效果时，考虑使用png24格式

**svg**

&emsp;&emsp;svg是无损的矢量图。svg与上面这些图片格式最大的不同是，上面的图片格式都是位图，而svg是矢量图，具有无论如何缩放都不会失真的优点

&emsp;&emsp;svg格式非常适用于绘制logo、图标等&emsp;&emsp;

&emsp;&emsp;但由于低版本浏览器支持不足，应用不广泛

![imgType2](https://pic.xiaohuochai.site/blog/helper_ps_imgType2.png)


![imgType3](https://pic.xiaohuochai.site/blog/helper_ps_imgType3.png)

&nbsp;

### 保存设置

&emsp;&emsp;一般地，在对设计图进行修改前，首先要保留一份psd源文本，然后再在其副本上进行修改。

&emsp;&emsp;通过photoshop将设计图切成需要的素材时，涉及到图片格式的设置问题，应注意以下几点：

&emsp;&emsp;【1】当图片色彩丰富且无透明要求时，建议保存为jpg格式并选择合适的品质，一般为60-80

![imgType4](https://pic.xiaohuochai.site/blog/helper_ps_imgType4.jpg)


&emsp;&emsp;【2】当图片色彩不太丰富时无论有无透明要求，保存为PNG8格式(特点是只有256种颜色，文件本身比较小)，保存时选择无仿色，无杂边

![imgType5](https://pic.xiaohuochai.site/blog/helper_ps_imgType5.jpg)

&emsp;&emsp;【3】当图片有半透明要求时，保存PNG24格式(对图片不进行压缩，所有相对比较大)


![imgType6](https://pic.xiaohuochai.site/blog/helper_ps_imgType6.jpg)
