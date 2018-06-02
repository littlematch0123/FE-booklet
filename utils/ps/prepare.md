# 前端工程师技能之photoshop巧用系列第一篇——准备篇

&emsp;&emsp;photoshop是前端工程师无法回避的一个软件，这个软件本身很强大，但我们仅仅需要通过这个工具来完成基本的切图工作即可。本文将开始photoshop巧用系列的第一篇&mdash;&mdash;准备篇

&nbsp;

### 作用

&emsp;&emsp;我们为什么要去切图呢？这就需要说到项目流程。一个完整的项目流程是市场进行需求分析，产品做出项目原型，UI根据项目原型出设计图，前端根据设计图制作页面，后端进行数据相关工作，网站经过测试后上线。

&emsp;&emsp;我们常说的切图实际上就是要把UI制作的设计图切成网页需要的素材。具体到网页的哪些地方需要素材呢？主要包括两类：

&emsp;&emsp;【1】HTML中的&lt;img&gt;标签

<div>
<pre>&lt;img src="img/xx.jpg" alt=""&gt;</pre>
</div>

&emsp;&emsp;【2】CSS中的background-image属性

<div>
<pre>{background-image: url(../img/xx.jpg);}</pre>
</div>

&nbsp;

### 初始化

&emsp;&emsp;前端工程师在使用photoshop之前需要进行一些初始化设置，主要包括以下3个

&emsp;&emsp;【1】首选项设置 &lt;ctrl+k&gt;

<div>
<pre>编辑 &gt; 首选项 &gt; 单位与标尺 &gt; 把标尺和文字的单位都改成像素</pre>
</div>

![prepare1](https://pic.xiaohuochai.site/blog/helper_ps_prepare1.jpg)

&emsp;&emsp;【2】面板设置(在窗口菜单下)

&emsp;&emsp;&emsp;&emsp;1、工具(可切换两列或单列布局)

&emsp;&emsp;&emsp;&emsp;2、选项(与当前选中的工具一一对应)

&emsp;&emsp;&emsp;&emsp;3、信息&lt;F8&gt;(颜色、位置、尺寸信息，一般结合矩形选框工具使用)

&emsp;&emsp;&emsp;&emsp;4、图层&lt;F10&gt;(图层操作)

&emsp;&emsp;&emsp;&emsp;5、历史记录(记录历史操作，常用于回退)

![prepare2](https://pic.xiaohuochai.site/blog/helper_ps_prepare2.jpg)　

　【3】辅助视图(在视图菜单下)

&emsp;&emsp;&emsp;&emsp;1、对齐&lt;ctrl+shift+;&gt; (开启对齐后，图层移动到另一个图层或参考线或文档边缘时会有自动吸附功能)

&emsp;&emsp;&emsp;&emsp;2、标尺&lt;ctrl+R&gt;

&emsp;&emsp;&emsp;&emsp;3、参考线&lt;ctrl+;&gt;(视图 &gt; 显示 &gt; 参考线)

&emsp;&emsp;&emsp;&emsp;注意：需勾选显示额外内容，才能看到画布里的参考线和网格

![prepare3](https://pic.xiaohuochai.site/blog/helper_ps_prepare3.jpg)

&nbsp;

### 常用工具

&emsp;&emsp;【1】移动工具&lt;V&gt;(常用于选择图层及移动图片)

&emsp;&emsp;&emsp;&emsp;在选区工具中的选项面板有图层和组两个选项，组一般指的是一个可能包含多个图层的文件夹，而图层仅指图层本身

&emsp;&emsp;&emsp;&emsp;注意：移动工具对应的选项面板上的自动选择一定要勾选上

&emsp;&emsp;【2】矩形选框工具&lt;M&gt;(常用于选择一块区域并配合信息面板查看信息)

&emsp;&emsp;&emsp;&emsp;如果认真观察，会发现矩形选框工具右下角是有一个小三角的，鼠标点击后不松开会弹出多个选项，包括矩形选框工具、椭圆选框工具、单行选框工具和单列选框工具4种。

&emsp;&emsp;&emsp;&emsp;注意：如果使用矩形选框工具的同时，按住shift按键，会生成正方形

&emsp;&emsp;&emsp;&emsp;一般地，使用矩形选框工具都是为了建立一个新选区，但实际上，也可以对选区进行如下操作

&emsp;&emsp;&emsp;&emsp;1、添加到选区: shift

&emsp;&emsp;&emsp;&emsp;2、从选区减去: alt

&emsp;&emsp;&emsp;&emsp;3、与选区交叉: shift + alt

&emsp;&emsp;【3】魔棒工具&lt;W&gt;(抠不规则的图)

&emsp;&emsp;&emsp;&emsp;注意：容差是用来设置颜色取样时的范围，容差为0代表只选取当前的颜色值

&emsp;&emsp;【4】裁剪工具+切片工具&lt;C&gt;(裁剪图片)

&emsp;&emsp;&emsp;&emsp;注意：裁切工具裁的是工作区，不管是多少图层都能裁切下来

&emsp;&emsp;【5】缩放工具&lt;Z&gt;(缩放画布)

&emsp;&emsp;【tips】常用的缩放快捷键

&emsp;&emsp;&emsp;&emsp;1、放大:

&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;a、ctrl+加号

&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;b、alt+滚轮上滚

&emsp;&emsp;&emsp;&emsp;2、缩小:

&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;a、ctrl+减号

&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;b、alt+滚轮下滚

&emsp;&emsp;&emsp;&emsp;3、显示为100%: ctrl+1

&emsp;&emsp;【6】取色器+吸管工具(取色)

&emsp;&emsp;&emsp;&emsp;1、填充前景色: alt+del&nbsp;

&emsp;&emsp;&emsp;&emsp;2、填充背景色: ctrl+del

&emsp;&emsp;&emsp;&emsp;3、切换前景色和背景色: X

&emsp;&emsp;&emsp;&emsp;4、默认前景色和背景色: D

&emsp;&emsp;【7】文字工具&lt;T&gt;(输入及编辑文字)

&emsp;&emsp;【8】抓手工具&lt;空格&gt;(移动可视区域)

&emsp;&emsp;&emsp;&emsp;抓手工具的实际快捷键是H键，单击H键，再点击鼠标左键不松开，图片会以适应屏幕大小的形式显示在屏幕中。当移动鼠标并松开左键后，屏幕会放大显示鼠标所在的图片区域

&nbsp;

![prepare4](https://pic.xiaohuochai.site/blog/helper_ps_prepare4.jpg)

### 快捷键

&emsp;&emsp;除了上面提到的一些快捷键之后，还有一些常用的快捷键也是需要注意的

&emsp;&emsp;【1】单步撤销或前进: ctrl+z

&emsp;&emsp;【2】连续撤销: ctrl+alt+z

&emsp;&emsp;【3】回退到某一步: 点击历史记录面板上相应的步骤

&emsp;&emsp;【4】取消选择: ctrl+d

&emsp;&emsp;【5】变形: ctrl+t

&emsp;&emsp;【6】保存: ctrl+shift+alt+s

&emsp;&emsp;【7】合并图层: ctrl+e

&emsp;&emsp;【8】盖印所见图层: ctrl+shift+alt+e

&emsp;&emsp;注意：对于一些工具来说，需要调用工具的尺寸大小，通用的快捷键是左中括号[和右中括号]

