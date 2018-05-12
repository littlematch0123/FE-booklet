# 移动web开发之像素和DPR

&emsp;&emsp;像素在web开发中几乎天天用到，但到底什么是像素，移动端和桌面端的像素有区别吗，缩放对像素有影响吗，视网膜屏幕和像素有什么关系？关于这些问题，可能就不清楚了。本文将介绍关于像素的相关知识

&nbsp;

### 定义

&emsp;&emsp;像素，又称画素，是图像显示的基本单位，译自英文&ldquo;pixel&rdquo;，pix是英语单词picture的常用简写，加上英语单词&ldquo;元素&rdquo;element，就得到pixel，故&ldquo;像素&rdquo;表示&ldquo;图像元素&rdquo;之意，有时亦被称为pel(picture element)

&emsp;&emsp;像素是网页布局的基础。一个像素就是计算机能够显示一种特定颜色的最小区域。当设备尺寸相同但像素变得更密集时，屏幕能显示的画面的过渡更细致，网站看起来更明快。

&emsp;&emsp;//ppi是指屏幕上每英寸可以显示的像素点的数量，即屏幕像素密度

![mobile_dpr1](https://pic.xiaohuochai.site/blog/mobile_dpr1.jpg)

&nbsp;

### 分类

&emsp;&emsp;实际上像素分为两种：设备像素和CSS像素

&emsp;&emsp;1、设备像素(device independent pixels): 设备屏幕的物理像素，任何设备的物理像素的数量都是固定的

&emsp;&emsp;2、CSS像素(CSS pixels):&nbsp;又称为逻辑像素，是为web开发者创造的，在CSS和javascript中使用的一个抽象的层

&emsp;&emsp;每一个CSS声明和几乎所有的javascript属性都使用CSS像素，因此实际上从来用不上设备像素 ，唯一的例外是screen.width/height

```
//我们通过CSS和javascript代码设置的像素都是逻辑像素
width:300px;
font-size:16px;
```

&nbsp;

### 缩放

&emsp;&emsp;在桌面端，css的1个像素往往都是对应着电脑屏幕的1个物理像素。

&emsp;&emsp;//一个CSS像素完全覆盖了一个设备像素　

![mobile_dpr2](https://pic.xiaohuochai.site/blog/mobile_dpr2.gif)

&emsp;&emsp;而在手机端，由于屏幕尺寸的限制，缩放是经常性的操作。

&emsp;&emsp;//设备像素(深蓝色背景)、CSS像素(半透明背景)

&emsp;&emsp;//左图表示当用户进行缩小操作时，一个设备像素覆盖了多个CSS像素

&emsp;&emsp;//右图表示当用户进行放大操作时，一个CSS像素覆盖了多个设备像素

<table border="0">
<tbody>
<tr>
<td>

![mobile_dpr3](https://pic.xiaohuochai.site/blog/mobile_dpr3.gif)

</td>
<td>

![mobile_dpr4](https://pic.xiaohuochai.site/blog/mobile_dpr4.gif)

</td>

</tr>

</tbody>

</table>

&emsp;&emsp;不论我们进行缩小或放大操作，元素设置的CSS像素(如width:300px)是始终不变的，而一个CSS像素对应多少个设备像素是根据当前的缩放比例来决定的

&nbsp;

### DPR

&emsp;&emsp;设备像素比DPR(devicePixelRatio)是默认缩放为100%的情况下，设备像素和CSS像素的比值

```
DPR = 设备像素 / CSS像素(某一方向上)
```

&emsp;&emsp;在早先的移动设备中，并没有DPR的概念。随着技术的发展，移动设备的屏幕像素密度越来越高。从iphone4开始，苹果公司推出了所谓的retina视网膜屏幕。之所以叫做视网膜屏幕，是因为屏幕的PPI(屏幕像素密度)太高，人的视网膜无法分辨出屏幕上的像素点。iphone4的分辨率提高了一倍，但屏幕尺寸却没有变化，这意味着同样大小的屏幕上，像素多了一倍，于是DPR = 2

&emsp;&emsp;实际上，此时的CSS像素对应着以后要提到的理想视口，其对应的javascript属性是screen.width/screen.height

&emsp;&emsp;而对于设备像素比DPR也有对应的javascript属性window.devicePixelRatio

&emsp;&emsp;以iphone5为例，iphone5的CSS像素为`320px*568px`，DPR是2，所以其设备像素为`640px*1136px`

```
    640(px) / 320(px)  = 2
    1136(px) / 568(px) = 2
    640(px)*1136(px) /  320(px)*568(px) = 4
```

![mobile_dpr5](https://pic.xiaohuochai.site/blog/mobile_dpr5.gif)
