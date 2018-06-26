# 使用chrome开发者工具中的performance面板解决性能瓶颈

&emsp;&emsp;使用Chrome DevTools的performance面板可以记录和分析页面在运行时的所有活动。本文将详细介绍如何使用performance面板解决性能瓶颈

 

&nbsp;

### 准备

【匿名模式】

&emsp;&emsp;匿名模式可以保证Chrome在一个相对干净的环境下运行。比如安装了许多chrome插件，这些插件可能会影响我们分析性能表现

&emsp;&emsp;使用快捷键ctrl + shift + N 即可代码匿名模式下的chrome新标签页

![performance](https://pic.xiaohuochai.site/blog/chromePerformance1.png)

【移动设备CPU】

&emsp;&emsp;移动设备的CPU一般比台式机和笔记本弱很多。分析页面时，可以用CPU控制器（CPU Throttling）来模拟移动端设备CPU

&emsp;&emsp;在DevTools中，点击 Performance 的 tab。 确保 Screenshots checkbox 被选中；点击 Capture Settings（⚙️）按钮，DevTools会展示很多设置，来模拟各种状况；对于模拟CPU，选择4x slowdown，于是Devtools就开始模拟4倍低速CPU

![](https://pic.xiaohuochai.site/blog/browserRender5.png)

 

&nbsp;

### 概览

【组成】

&emsp;&emsp;performance面板有如下四个窗格：

&emsp;&emsp;1、controls。开始记录，停止记录和配置记录期间捕获的信息

&emsp;&emsp;2、overview。页面性能的高级汇总

&emsp;&emsp;3、火焰图。 CPU 堆叠追踪的可视化

&emsp;&emsp;4、统计汇总。以图表的形式汇总数据

![chrome](https://pic.xiaohuochai.site/blog/chromePerformance2.png)

【颜色表示】
```
HTML 文件为蓝色
脚本为黄色
样式表为紫色
媒体文件为绿色
其他资源为灰色
```
【做记录】

&emsp;&emsp;打开想要记录的页面，然后重新加载页面。 performance面板会自动记录页面重新加载。

&emsp;&emsp;要记录页面交互，打开 performance 面板，然后按 Record 按钮  或者键入键盘快捷键 Cmd+E (Mac) 或 Ctrl+E(Windows / Linux)，开始记录。记录时，Record 按钮会变成红色。执行页面交互，然后按 Record 按钮或再次键入键盘快捷键停止记录

&emsp;&emsp;完成记录后，DevTools 会猜测哪一部分记录最相关，并自动缩放到那一个部分

 

&nbsp;

### 查看

【Overview】

&emsp;&emsp;Overview 窗格包含以下三个图表：

&emsp;&emsp;1、FPS。每秒帧数。绿色竖线越高，FPS 越高。 FPS 图表上的红色块表示长时间帧，很可能会出现卡顿

&emsp;&emsp;2、CPU。 CPU 资源。此面积图指示消耗 CPU 资源的事件类型

&emsp;&emsp;3、NET。每条彩色横杠表示一种资源。横杠越长，检索资源所需的时间越长。 每个横杠的浅色部分表示等待时间（从请求资源到第一个字节下载完成的时间）

&emsp;&emsp;可以放大显示一部分记录，以便简化分析。使用 Overview 窗格可以放大显示一部分记录。 放大后，火焰图会自动缩放以匹配同一部分

&emsp;&emsp;选择部分后，可以使用 W、A、S 和 D 键调整您的选择。 W 和 S 分别代表放大和缩小。 A 和 D 分别代表左移和右移

【火焰图】

&emsp;&emsp;在火焰图上看到一到三条垂直的虚线。蓝线代表 DOMContentLoaded 事件。 绿线代表首次绘制的时间。 红线代表 load 事件

&emsp;&emsp;在火焰图中选择事件时，Details 窗格会显示与事件相关的其他信息

![detail](https://pic.xiaohuochai.site/blog/details-pane.png)

 

&nbsp;

### 诊断

【JS】

&emsp;&emsp;JavaScript 计算，特别是会触发大量视觉变化的计算会降低应用性能。 不要让时机不当或长时间运行的 JavaScript 影响用户交互

&emsp;&emsp;下面是一些常见 JavaScript 问题

&emsp;&emsp;1、大开销输入处理程序影响响应或动画

&emsp;&emsp;让浏览器尽可能晚地处理触摸和滚动，或者绑定侦听

&emsp;&emsp;2、时机不当的 JavaScript 影响响应、动画、加载

&emsp;&emsp;使用 requestAnimationFrame、使 DOM 操作遍布各个帧、使用网络工作线程

&emsp;&emsp;3、长时间运行的 JavaScript 影响响应

&emsp;&emsp;将纯粹的计算工作转移到web worker中。如果需要 DOM 访问权限，配合使用requestAnimationFrame

【样式】

&emsp;&emsp;样式更改开销较大，在这些更改会影响 DOM 中的多个元素时更是如此。 只要将样式应用到元素，浏览器就必须确定对所有相关元素的影响、重新计算布局并重新绘制

&emsp;&emsp;点击 Recalculate Style 事件（以紫色显示）可以在 Details 窗格中查看更多相关信息。 如果样式更改需要较长时间，对性能的影响会非常大。 如果样式计算会影响大量元素，则需要改进另一个方面

![style](https://pic.xiaohuochai.site/blog/recalculate-style.png)

&emsp;&emsp;要降低 Recalculate Style 事件的影响，使用一些对渲染性能的影响较小的属性。如使用 transform 和 opacity 属性更改来实现动画，使用 will-change 或 translateZ 提升移动的元素

&emsp;&emsp;下面是一些常见的CSS问题

&emsp;&emsp;1、大开销样式计算影响响应或动画

&emsp;&emsp;任何会更改元素几何形状的 CSS 属性，如宽度、高度或位置；浏览器必须检查所有其他元素并重做布局。避免会触发重排的CSS属性

&emsp;&emsp;2、复杂的选择器影响响应或动画

&emsp;&emsp;嵌套选择器强制浏览器了解与所有其他元素有关的全部内容，包括父级和子级。尽量在CSS中引用只有一个类的元素

【重排】

&emsp;&emsp;布局（或重排）是浏览器用来计算页面上所有元素的位置和大小的过程。 网页的布局模式意味着一个元素可能影响其他元素；例如body元素的宽度一般会影响其子元素的宽度以及树中各处的节点等等。这个过程对于浏览器来说可能很复杂。 一般的经验法则是，如果在帧完成前从 DOM 请求返回几何值，将发现会出现“强制同步布局”，在频繁地重复或针对较大的 DOM 树执行操作时这会成为性能的大瓶颈。

&emsp;&emsp;performance面板可以确定页面何时会导致强制同步布局。 这些 Layout 事件使用红色竖线标记

![layout](https://pic.xiaohuochai.site/blog/forced-synchronous-layout.png)

&emsp;&emsp;“布局抖动”是指反复出现强制同步布局情况。 这种情况会在 JavaScript 从 DOM 反复地写入和读取时出现，将会强制浏览器反复重新计算布局

【重绘】

&emsp;&emsp;绘制是填充像素的过程。这经常是渲染流程开销最大的部分。 如果在任何情况下注意到页面出现卡顿现象，很有可能存在绘制问题。

&emsp;&emsp;合成是将页面的已绘制部分放在一起以在屏幕上显示的过程。 大多数情况下，如果坚持仅合成器属性并避免一起绘制，性能会有极大的改进，但是需要留意过多的层计数

&emsp;&emsp;一定不要使用下面的代码
```
* {
  will-change: transform;
  transform: translateZ(0);
}
```
&emsp;&emsp;这是以迂回方式说想要提升页面上的每个元素。此处的问题是创建的每一层都需要内存和管理，而这些并不是免费的。事实上，在内存有限的设备上，对性能的影响可能远远超过创建层带来的任何好处。每一层的纹理都需要上传到 GPU，使 CPU 与 GPU 之间的带宽、GPU 上可用于纹理处理的内存都受到进一步限制

&emsp;&emsp;如果大部分渲染时间花费在绘制上，即表示存在绘制问题

&emsp;&emsp;下面是一些常见的绘制问题

&emsp;&emsp;1、绘制风暴影响响应或动画

&emsp;&emsp;较大的绘制区域或大开销绘制影响了响应或动画，要避免绘制、提升将要移动到自有层的元素，使用变形和不透明度

&emsp;&emsp;2、层数激增影响动画

&emsp;&emsp;使用 translateZ(0) 过度提升过多的元素会严重影响动画性能，要谨慎提升到层，并且仅在了解这样会有切实改进时才提升到层

 