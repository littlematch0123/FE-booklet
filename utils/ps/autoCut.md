# 前端工程师技能之photoshop巧用系列扩展篇——自动切图 

&emsp;&emsp;随着photoshop版本的不断升级，软件本身增加了很多新的功能，也为切图工作增加了很多的便利。photoshop最新的版本新增了自动切图功能，本文将详细介绍photoshop的这个新功能

 

&nbsp;

### 初始设置

&emsp;&emsp;当然首先还是要进行一些首选项设置

&emsp;&emsp;【1】在编辑 -> 首选项 -> 增效工具中，选中启用生成器

![autocut1](https://pic.xiaohuochai.site/blog/ps_autocut1.jpg)

&emsp;&emsp;【2】重启photoshop，在文件 -> 生成中，点击图像资源在文件 -> 生成中，点击图像资源

&emsp;&emsp;&emsp;&emsp;注意：只有在photoshop中有文件打开的情况下，该项才可以点击

![autocut2](https://pic.xiaohuochai.site/blog/ps_autocut2.jpg)
 

&nbsp;

### 自动切图

【png】

&emsp;&emsp;比如，我们要将收藏前的小图标切出来，先找到该图标对应的图层或组，再将其重命名。重点是给其添加后缀。如果想要保存png8格式的图片，后缀名写为.png8。类似地，如果要保存png24格式，则后缀名写为.png24

&emsp;&emsp;此时，图像的存放目录下会多出一个assets文件夹，里面会存放刚才保存的图片sc.png

![autocut3](https://pic.xiaohuochai.site/blog/ps_autocut3.gif)

【jpg】

&emsp;&emsp;类似地，jpg格式图片也是如此切法。比如我们要把脚丫的图片切出来

![autocut4](https://pic.xiaohuochai.site/blog/ps_autocut4.gif)

&emsp;&emsp;实际上，jpg格式的图片存储时，是有品质选择的，从0-100。如果我们把后缀名写为.jpg6，则代表品质为60。如果后缀名为.jpg，则表示品质为100

&emsp;&emsp;我们先打开原来切的那张图片，大小为13.6k。将其后缀名改为.jpg5后，大小变成了4.52k

![autocut5](https://pic.xiaohuochai.site/blog/ps_autocut5.gif)

【2倍图】

&emsp;&emsp;如果我们需要适应视网膜屏幕，切出2倍图时，也可以使用自动切图的功能。只需要将其重命名为200% 图片名称 @2x.jpg就可以

&emsp;&emsp;首先，我们先查看脚丫图片的尺寸是200*200，当我们将其设置为200% jy @2x.jpg5后，再查看脚丫图片的尺寸变成了400*400，也就是生成了2倍图

![autocut6](https://pic.xiaohuochai.site/blog/ps_autocut6.gif)

&emsp;&emsp;类似地，3倍图也是相似做法

![autocut7](https://pic.xiaohuochai.site/blog/ps_autocut7.gif)