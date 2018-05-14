# 移动优先的响应式布局

&emsp;&emsp;随着移动互联网的兴起，不同设备的分辨率相差较大，如果在不同的设置上显示同一个页面，则用户体验差。响应式网页设计是一种方法，使得一个网站能够兼容多个终端，而不用为每个终端制作特定的版本。它使得一个网站可以在任何类型的屏幕上，都可以被轻松地浏览和使用。采用响应式设计，在不同设备中，网站会重新排列，展现出不同的设计风格，以完美的适配任何尺寸的屏幕

 

&nbsp;

### 设计原则

&emsp;&emsp;关于响应式设计，有渐进增加和优雅降级两个设计原则

&emsp;&emsp;渐进增强(progressive enhancement)，是指基本需求得到满足、实现，再根据不同浏览器及不同分辨率设备的特点，利用高级浏览器下的新特性提供更好的体验。比如，圆角、阴影、动画等

&emsp;&emsp;优雅降级(graceful degradation)则正好相反，现有功能已经开发完备，但需要向下兼容版本和不支持该功能的浏览器。虽然兼容性方案的体验不如常规方案，但保证了功能可用性

&emsp;&emsp;移动优先的响应式布局采用的是渐进增强原则，制作响应式网站时，先搞定手机版，然后再去为更大设备去设计和开发更复杂的功能。特征是使用min-width匹配页面宽度。从上到下书写样式时，首先考虑的是移动设备的使用场景，默认查询的是最窄的情况，再依次考虑设备屏幕逐渐变宽的情况

&emsp;&emsp;由简入繁易，由繁入简难。如果是桌面优先，布局端是桌面端代码，只有在media中，才是手机端代码，加载了多余的桌面端代码。如果是图片文件，则下载的无用资源更多

&emsp;&emsp;无论从界面设计还是代码执行效率的角度而言，移动优先都有明显优势

 

&nbsp;

### 三要素
&emsp;&emsp;响应式设计包括三个要素：弹性布局、媒体查询和弹性图片

&emsp;&emsp;弹性布局和媒体查询已经在其他博客中详细介绍，下面来重点介绍下弹性图片

&emsp;&emsp;弹性图片，也称为响应式图片，是指图片能够跟随父容器宽度变化而变化，同时宽度受限于父容器，不可按照图片原始尺寸展现

&emsp;&emsp;因此，最简单的响应式图片设置max-width为100%即可
```
img{
  max-width: 100%;  
}
```
&emsp;&emsp;只有一张图片的情况下，采用上面代码即可。如果提供了高清图，要根据设备大小加载不同的图片，则需要额外的处理。有如下几种处理方式

&emsp;&emsp;1、采用picture元素，IE浏览器、android4.4.4-浏览器不兼容
```
<picture>
  <source media="(min-width:50em)" srcset="img/l.jpg">
  <source media="(min-width:30em)" srcset="img/m.jpg">
  <img src="img/s.jpg" alt="#">
</picture>
```
&emsp;&emsp;2、采用img元素的srcset和sizes属性，IE浏览器、android4.4.4-浏览器不兼容
```
<img
  src="img/480.png"
  srcset="img/480.png 480w,img/800.png 800w, img/1600.png 1600w"
  sizes="(min-width:800px) 800px,100vw"
/>
```
&emsp;&emsp;3、采用js，根据window的resize事件，修改图片的路径

```
function makeImageResponsive(){
    var width = $(window).width();
    var img = $('.content img');
    if(width <=480){
        img.attr('src','img/480.png');
    }else if(width <=800){
        img.attr('src','img/800.png');
    }else{
        img.attr('src','img/1600.png');
    }
}
$(window).on('resize load',makeImageResponsive);
```
&emsp;&emsp;4、后端配置，前端传递给后端当前设备的一些特征，后端通过这些特征决定做怎样的响应。但目录两个后端响应式解决方案Responsive_Images和Adaptive-Images都不再维护

 

&nbsp;

### 优缺点
【优点】

&emsp;&emsp;1、减少工作量，网站、设计、代码、内容都只需要一份

&emsp;&emsp;2、节省时间

&emsp;&emsp;3、解决了设备之间的差异化展示

&emsp;&emsp;4、搜索优化　

&emsp;&emsp;5、更好的用户体验

【缺点】

&emsp;&emsp;1、需要加载更多的样式和脚本资源，加载速度受到影响

&emsp;&emsp;2、设计比较难精确定位和控制

&emsp;&emsp;3、老版本浏览器兼容不好

 

&nbsp;

### 响应模式
&emsp;&emsp;下面介绍四种响应模式

【Column Drop 列下沉】

&emsp;&emsp;手机上每一个大块单独占据一行，随着屏幕尺寸拉伸会在同一行上形成多个 column 列

【Mostly Fulid 基本流体式】

&emsp;&emsp;基本上跟 Column Drop 一样，但是有一点点“固定布局“的特点：当到达一定宽度后，主体内容部分不再变宽，成为固定宽度

【Layout Shifter 变换式】

&emsp;&emsp;变换式，也就是不必遵循原有内容顺序，可以根据最佳展示需要来调整大块顺序

【Off Canvas 抽屉式】

&emsp;&emsp;抽屉式，屏幕不够宽的时候，隐藏，通过按钮呼出。足够宽的屏幕上，始终显示