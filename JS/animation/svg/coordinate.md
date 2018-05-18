# SVG坐标系统及图形变换

&emsp;&emsp;前面介绍过SVG视野后，本文将开始介绍SVG坐标系统及图形变换

 

&nbsp;

### 坐标定位

&emsp;&emsp;对于所有元素，SVG使用的坐标系统或者说网格系统，和Canvas用的差不多（所有计算机绘图都差不多）。这种坐标系统是：以页面的左上角为(0,0)坐标点，坐标以像素为单位，x轴正方向是向右，y轴正方向是向下

![](https://pic.xiaohuochai.site/blog/svg_coord1.png)

&emsp;&emsp;定义一个矩形，即从左上角开始，向右延展100px，向下延展100px，形成一个100*100大的矩形
```
<rect x="0" y="0" width="100" height="100" />
```
 

&nbsp;

### 四个坐标系

&emsp;&emsp;SVG中的四个坐标系包括用户坐标系、自身坐标系、前驱坐标系和参考坐标系。其中，用户坐标系和自身坐标系是客观的坐标系，而前驱坐标系和参考坐标系是相对的坐标系

【用户坐标系】

&emsp;&emsp;SVG的世界是无穷大的，世界里面的坐标系就是用户坐标系

&emsp;&emsp;viewBox的设置就是观察用户坐标系的哪个区域。比如设置viewBox = "0 0 200 150"，即观察用户坐标系里的这个区域

![](https://pic.xiaohuochai.site/blog/svg_coord2.png)

&emsp;&emsp;用户坐标系是最原始的坐标系，其他的坐标系都是基于用户坐标系产生的。因此，用户坐标系也被称为原始坐标系
【自身坐标系】

&emsp;&emsp;自身坐标系是每个SVG图形或图形分组与生俱来的坐标系

&emsp;&emsp;比如一个矩形设置为`<rect x="0" y="0" width="100" height="100"/>`，其位置和尺寸的定义都是基于其自身坐标系来描述的
![](https://pic.xiaohuochai.site/blog/svg_coord3.png)


【前驱坐标系】

&emsp;&emsp;前驱坐标系即该元素的父元素的坐标系

&emsp;&emsp;如下所示，矩形rect的父元素是SVG元素，即其前驱坐标系是用户坐标系
```
<svg version="1.1" width="300" height="70" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="100" height="50"/>
</svg>
```

坐标变换

&emsp;&emsp;所谓坐标变换，指前驱坐标系经过元素的变换后，得到元素的自身坐标系

&emsp;&emsp;如下所示，加入transform属性之后，rect元素就是相对于其前驱坐标系发生了坐标变换，得到了自身坐标系

![](https://pic.xiaohuochai.site/blog/svg_coord4.png)

【参考坐标系】

&emsp;&emsp;使用其他坐标系来观察自身元素坐标位置时使用

&emsp;&emsp;如下所示，rect元素定义的坐标是(0,0)。如果以用户坐标系作为参考坐标系，则rect元素在参考坐标系中的坐标是(50,50)

![](https://pic.xiaohuochai.site/blog/svg_coord5.png)


&nbsp;

### 图形变换

&emsp;&emsp;在SVG中，坐标变换是对一个坐标系到另一个坐标系的变换的描述

&emsp;&emsp;在2D平面上，一般采用线性变换来满足变换的需求。SVG中的线性变换使用transform属性来完成

&emsp;&emsp;SVG中的transform属性与CSS3中的transform样式里面的一些基本的变换类型是一样的，包括：位移translate, 旋转rotate, 缩放scale, 斜切skew以及直接矩阵matrix。但只局限于2D层面的变换。SVG似乎只支持二维变换，且类似translateX, rotateX也都是不支持的

【平移】

&emsp;&emsp;translate()变形方法把元素移动一段距离，可以根据相应的属性定位它
```
<rect x="0" y="0" width="10" height="10" transform="translate(30,40)" />
```
&emsp;&emsp;该示例将呈现一个矩形，移到点(30,40)，而不是出现在点(0,0)

&emsp;&emsp;注意:如果没有指定第二个值，它默认被赋值0

![](https://pic.xiaohuochai.site/blog/svg_coord6.png)


【旋转】

&emsp;&emsp;使用rotate()变形旋转一个元素
```
<rect x="20" y="20" width="20" height="20" transform="rotate(45)" />
```
&emsp;&emsp;该示例显示了一个方形，旋转了45度。rotate()的值是用角度数指定的

![](https://pic.xiaohuochai.site/blog/svg_coord7.png)

【缩放】

&emsp;&emsp;scale()变形改变了元素的尺寸。它需要两个数字，作为比率计算如何缩放。0.5表示收缩到50%。如果第二个数字被忽略了，它默认等于第一个值
```
<rect x="20" y="20" width="20" height="20" transform="scale(0.5)" />
```
![](https://pic.xiaohuochai.site/blog/svg_coord8.png)


【斜切】

&emsp;&emsp;在前面的一些变换中，例如位移、缩放之类是不支持translateX, scaleX这种CSS常见用法的，但是这里的skew却有点不同：不支持skew(x[, y])这种语法，而只能是skewX或者skewY

&emsp;&emsp;利用一个矩形制作一个斜菱形。可用skewX()变形和skewY()变形。每个需要一角度以确定元素斜切到多远
```
<rect x="20" y="20" width="20" height="20" transform="skewX(45)" />
```

【matrix()】

&emsp;&emsp;所有上面的变形可以表达为一个2x3的变形矩阵。组合一些变形，可以直接用matrix(a, b, c, d, e, f)变形设置结果矩阵，利用下面的矩阵，它把来自上一个坐标系统的坐标映射到新的坐标系统：

![](https://pic.xiaohuochai.site/blog/svg_coord9.png)


![](https://pic.xiaohuochai.site/blog/svg_coord10.png)


【变换列表】

&emsp;&emsp;线性变换列表表示为一系列的变换，结果为变换的矩阵的乘积。要特别注意的是，后面的变换要乘在前面

![](https://pic.xiaohuochai.site/blog/svg_coord11.png)


![](https://pic.xiaohuochai.site/blog/svg_coord12.gif)


&nbsp;

### 居中变换

&emsp;&emsp;像缩放、斜切这些SVG变换，想要如CSS transform-origin:50% 50%一样的中心点变换效果，下面有两个思路可供参考

【原始中心位置位于SVG左上角】

&emsp;&emsp;拿45度旋转举例，可以把元素默认就放在中心点和SVG左上角重合的位置上
```
<rect x="-100" y="-50"  width="200" height="100"/>
```

![](https://pic.xiaohuochai.site/blog/svg_coord13.gif)

【viewBox】

&emsp;&emsp;可以把元素默认挂在左上角，然后，通过设置viewBox，让元素呈现的位置并不是真正的左上角，例如应用viewBox='-140 -105 280 210'

![](https://pic.xiaohuochai.site/blog/svg_coord14.png)

&emsp;&emsp;此时，只需要让元素旋转就可以了，无需额外的做translate位移

![](https://pic.xiaohuochai.site/blog/svg_coord15.gif)

&emsp;&emsp;欢迎交流 