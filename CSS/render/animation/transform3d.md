# 深入理解CSS变形transform(3d)

&emsp;&emsp;本文将详细介绍关于transform变形3D的内容，但需以了解[transform变形2D](http://www.cnblogs.com/xiaohuochai/p/5350254.html)为基础。3D变形涉及的属性主要是transform-origin、transform、transform-style、perspective、perspective-origin、backface-visibility

&nbsp;

### 坐标轴

&emsp;&emsp;在了解透视之前，首先要先了解坐标轴。3D变形与2D变形最大的不同就在于其参考的坐标轴不同。2D变形的坐标轴是平面的，只存在x轴和y轴，而3D变形的坐标轴则是x、y、z三条轴组成的立体空间，x轴正向、y轴正向、z轴正向分别朝向右、下和屏幕外

![axis3d](https://pic.xiaohuochai.site/blog/CSS_render_axis3d.png)

### 透视

&emsp;&emsp;透视是transform变形3D中最重要的内容。如果不设置透视，元素的3D变形效果将无法实现。

<div>
<pre>//下面以rotateX()旋转函数为例，rotateX(45deg)表示元素以X轴方向为轴沿顺时针旋转45角度
//左图是无变形和透视样式的原始效果，中图是设置变形和透视样式的效果，右图是设置变形但未设置透视样式的效果</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/transform3d/t1.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;由以上三个图可说明，如果不设置透视，那么浏览器会将元素的3D变形操作投射垂直到2D视平面上，最终呈现出来的只是元素的宽高变化

&emsp;&emsp;要深入了解透视，需要了解观察者、被透视元素和变形元素这几个概念。

&emsp;&emsp;首先是变形元素，顾名思义，就是进行transform3D变形的元素，主要进行transform、transform-origin、backface-visibility等属性的设置

&emsp;&emsp;观察者是浏览器模拟出来的用来观察被透视元素的一个没有尺寸的点，观察者发出视线，类似于一个点光源发出光线

&emsp;&emsp;被透视元素也就是被观察者观察的元素，根据属性设置的不同，它有可能是变形元素本身，也可能是它的父级或祖先元素(后面会详细介绍)，主要进行perspective、perspective-origin等属性的设置

![perspactive0](https://pic.xiaohuochai.site/blog/CSS_render_perspactive0.jpg)

**透视距离**

&emsp;&emsp;透视距离perspective是指观察者沿着平行于z轴的视线与屏幕之间的距离，简称视距

![perspactive](https://pic.xiaohuochai.site/blog/CSS_render_perspactive.jpg)

perspective

&emsp;&emsp;值: none | &lt;length&gt;

&emsp;&emsp;初始值: none

&emsp;&emsp;应用于: 非inline元素(包括block、inline-block、table、table-cell等)

&emsp;&emsp;继承性: 无

&emsp;&emsp;注意：透视perspective不可为0和负数，因为观察者与屏幕距离为0时或者在屏幕背面时是不可以观察到被透视元素的正面的

&emsp;&emsp;注意：透视perspective不可取百分比，因为百分比需要相对的元素，但z轴并没有可相对的元素尺寸

【1】一般地，物体离得越远，显得越小。反映在perspective属性上，就是该属性值越大，元素的3d效果越不明显。(就像离一个人很近，甚至可以看到他的毛孔；如果离一个人很远，可能只看到一个轮廓)

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/transform3d/t2.html" frameborder="0" width="320" height="240"></iframe>

【2】设置透视perspective属性的元素就是被透视元素。一般地，该属性只能设置在变形元素的父级或祖先级。因为浏览器会为其子级的变形产生透视效果，但并不会为其自身产生透视效果

<div>
<pre>&lt;!-- 在本身元素上设置透视无效果 --&gt;
&lt;div style="float:left;margin-right: 10px;border:2px solid gray;"&gt;
    &lt;div style="perspective: 200px;width: 100px;height: 100px;border:1px solid black;background-color: pink;transform: rotateX(45deg);"&gt;&lt;/div&gt;
&lt;/div&gt;

&lt;!-- 在父级元素上设置透视有效果 --&gt;
&lt;div style="perspective: 200px; float:left;margin-right: 10px;border:2px solid gray;"&gt;
    &lt;div style="width: 100px;height: 100px;border:1px solid black;background-color: lightblue;transform: rotateX(45deg);"&gt;&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="line-height: 1.5; width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/transform3d/t3.html" frameborder="0" width="320" height="240"></iframe>

**透视原点**

&emsp;&emsp;透视原点perspective-origin是指观察者的位置，一般地，观察者位于与屏幕平行的另一个平面上，观察者始终是与屏幕垂直的。观察者的活动区域是被观察元素的盒模型区域

![perspectiveOrigin](https://pic.xiaohuochai.site/blog/CSS_render_perspactiveOrigin.jpg)

perspective-origin

&emsp;&emsp;值: x轴 y轴

&emsp;&emsp;初始值: 50% 50%

&emsp;&emsp;应用于: 非inline元素(包括block、inline-block、table、table-cell等)

&emsp;&emsp;继承性: 无

<div>
<pre>x轴: left | right | center | &lt;percentage&gt; | &lt;length&gt;
y轴: top | bottom | center | &lt;percentage&gt; | &lt;length&gt;</pre>
</div>

【1】关键字

<div>
<pre>x轴
    left: 0% center: 50% right: 100%
y轴
    top: 0% center: 50% bottom: 100%</pre>
</div>

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/transform3d/t4.html" frameborder="0" width="320" height="240"></iframe>

【2】数值

&emsp;&emsp;x轴数值表示在x轴上离0点(元素边框外侧左上角)的偏移量；y轴数值表示在y轴上离0点的偏移量

<iframe style="width: 100%; height: 340px;" src="https://demo.xiaohuochai.site/css/transform3d/t5.html" frameborder="0" width="320" height="240"></iframe>

【3】百分比

&emsp;&emsp;其中x轴的百分比相对于被透视元素的宽度和(width+横向padding+横向border)，而y轴的百分比相对于被透视元素的高度和(height+纵向padding+纵向border)

<iframe style="width: 100%; height: 340px;" src="https://demo.xiaohuochai.site/css/transform3d/t6.html" frameborder="0" width="320" height="240"></iframe>

【4】单个值

&emsp;&emsp;当只有一个值时，默认第二个值为center

&emsp;&emsp;注意：perspective-origin必须定义在设置perspective的元素上，也就是说必须设置在元素的父元素或祖先元素上

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/transform3d/t7.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 变形函数

&emsp;&emsp;介绍完透视之后，接下来详细介绍关于变形3d的变形函数和变形原点。上篇博文详细介绍了[2d变形函数](http://www.cnblogs.com/xiaohuochai/p/5350254.html#anchor2)。而3d变形函数也类似，包括位移、旋转和缩放，没有倾斜。

&emsp;&emsp;注意：倾斜skew()是二维变形，不能在三维空间变形，元素可能会在x轴和y轴倾斜，但不能在z轴倾斜

**矩阵matrix3d**

&emsp;&emsp;3d变形函数位移、旋转和缩放都是通过矩阵设置不同的参数而实现的。相比于2d矩阵martrix()的6个参数而言，3d矩阵matrix3d却有12个参数。其变形规则与2dmatrix()类似，只不过是从3*3矩阵，变成了4*4矩阵

<div>
<pre>matrix3d(a,b,c,0,d,e,f,0,g,h,i,0,j,k,l,1)</pre>
</div>

![matrix3d](https://pic.xiaohuochai.site/blog/CSS_render_matrix3d.jpg)

**3d位移**

&emsp;&emsp;3d位移函数主要包括traslateZ()和translate3d()

translate3d(x,y,z)

&emsp;&emsp;注意：其中，x和y可以是长度值，也可以是百分比，百分比是相对于其本身元素水平方向的宽度和垂直方向的高度和；z只能设置长度值

&emsp;&emsp;traslateZ(z)相当于translate3d(0,0,z)

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/transform3d/t8.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;注意：常用-webkit-transform: translateZ(0);来开启硬件加速

&emsp;&emsp;注意：3d位移函数相当于matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,x,y,z,1)&nbsp;

**3d缩放**

&emsp;&emsp;3d缩放函数主要包括scaleZ()和scale3d()

scale3d(x,y,z)

&emsp;&emsp;默认值为scale3d(1,1,1)，当参数为负值时，先翻转再缩放

scaleZ(z)相当于scale3d(1,1,z)

&emsp;&emsp;注意：3d缩放函数相当于matrix3d(x,0,0,0,0,y,0,0,0,0,z,0,0,0,0,1)

&emsp;&emsp;注意：scaleZ()和scale3d()单独使用时没有任何效果

<div>
<pre>.box1 .in{
    transform: translateZ(-500px);
}
.box2 .in{
    transform: translateZ(-100px);
}
.box3 .in{
    transform: scaleZ(5) translateZ(-100px);
}</pre>
</div>
<div>
<pre>//下图中从左到右分别是box1,box2,box3。由此得知，box3也相当于向z轴移动了-500px</pre>
</div>

&emsp;&emsp;所以transform: scaleZ(5) translateZ(-100px)和transform: translateZ(-500px)是等价的

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/transform3d/t9.html" frameborder="0" width="320" height="240"></iframe>

**3d旋转**

&emsp;&emsp;3d旋转函数主要包括rotateX()、rotateY()、rotateZ()、rotate3d()

rotate3d(x,y,z,Ndeg)

&emsp;&emsp;x、y、z分别用来描述围绕x、y、z轴旋转的矢量值。最终变形元素沿着由(0,0,0)和(x,y,z)这两个点构成的直线为轴，进行旋转。当N为正数时，元素进行顺时针旋转；当N为负数时，元素进行逆时针旋转

&emsp;&emsp;注意：safari浏览器不支持keyframes中改变rotate3d()

&emsp;&emsp;rotateX(Ndeg)相当于rotate3d(1,0,0,Ndeg)

&emsp;&emsp;rotateY(Ndeg)相当于rotate3d(0,1,0,Ndeg)

&emsp;&emsp;rotateZ(Ndeg)相当于rotate3d(0,0,1,Ndeg)

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/transform3d/t10.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 透视函数

&emsp;&emsp;上面详细介绍了透视属性perspective，但透视属性应用在变形元素的父级或祖先级。而透视函数perspective()是transform变形函数的一个属性值，应用于变形元素本身

&emsp;&emsp;注意：由于透视原点perspective-origin只能设置在设置了perspective透视属性的元素。若为元素设置透视函数perspective()，则透视原点不起使用，观察者使用默认位置，即元素中心点对应的平面上

perspective(&lt;length&gt;)

&emsp;&emsp;透视函数perspective(&lt;length&gt;)的参数只能是长度值，长度值只能是正数

&emsp;&emsp;注意：由于transform属性是从前向后的顺序解析属性值的，所以一定要把perspective()函数写在其他变形函数前面，否则将没有透视效果&nbsp;

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/transform3d/t11.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 变形原点

&emsp;&emsp;[2d变形原点](http://www.cnblogs.com/xiaohuochai/p/5350254.html#anchor1)由于没有z轴，所以z轴的值默认为0。而3d变形原点的z轴是一个可以设置的变量

transform-origin

&emsp;&emsp;值: x轴 y轴 z轴

&emsp;&emsp;初始值: 50% 50%

&emsp;&emsp;应用于: 非inline元素(包括block、inline-block、table、table-cell等)

&emsp;&emsp;继承性: 无

&emsp;&emsp;注意：IE9-浏览器不支持，safari3.1-8、android2.1-4.4.4、IOS3.2-8.4都需要添加前缀，其他更高版本浏览器可使用标准写法

<div>
<pre>x轴: left | center | right | &lt;length&gt; | &lt;percentage&gt;
y轴: top | center | bottom | &lt;length&gt; | &lt;percentage&gt;
z轴: &lt;length&gt;</pre>
</div>

&emsp;&emsp;对于x轴和y轴来说，可以设置关键字和百分比，分别相对于其本身元素水平方向的宽度和垂直方向的高度和；z只能设置长度值

//变形元素默认样式是 transform:rotate3d(1,1,1,45deg);

<iframe style="width: 100%; height: 440px;" src="https://demo.xiaohuochai.site/css/transform3d/t12.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 背景可见

&emsp;&emsp;元素的背面默认是可见的。但有时需要让元素背面不可见，这就要用到属性backface-visibility

&emsp;&emsp;backface-visibility: 设置元素背面是否可见

<div>
<pre>visible:可见，默认
hidden:不可见</pre>
</div>

//设置一个元素包含两个半透明子元素绝对定位重叠，内容分别为A和B，来表示一个元素的正面和背面

&emsp;&emsp;注意：若一个元素覆盖于另一个元素上，不仅仅是正面覆盖，背面也是覆盖的

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/transform3d/t13.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 变形风格

&emsp;&emsp;变形风格transform-style允许变形元素及其子元素在3d空间中呈现。变形风格有两个值。flat是默认值，表示2d平面；而perserve-3d表示3d空间

&emsp;&emsp;注意：当设置了overflow:非visible或clip:非auto时，transform-style:preserve-3d失效

<div>
<pre>transform-style: flat | preserve-3d</pre>
</div>

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/transform3d/t14.html" frameborder="0" width="320" height="240"></iframe>

