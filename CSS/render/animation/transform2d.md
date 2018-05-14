# CSS变形transform(2d)

&emsp;&emsp;CSS变形transform是一些效果的集合，主要是移动、旋转、缩放和倾斜这四种基本操作，还可以通过设置matrix矩阵来实现更复杂的效果。变形transform可以实现2D和3D两种效果。2D变形涉及的属性主要有transform变形函数和transform-origin变形原点。本文将详细介绍变形transform2d的相关知识。为了更清楚地说明变形的整个过程，本文的DEMO中大量使用了CSS过渡transition。[关于CSS过渡transition的详细情况移步至此](http://www.cnblogs.com/xiaohuochai/p/5347930.html)

&nbsp;

### 变形原点(2维)

&emsp;&emsp;变形原点transform-origin是指变形操作所依据的基点。默认情况下，变形原点位于元素的中心点

transform-origin

&emsp;&emsp;值: x轴 y轴 z轴

&emsp;&emsp;初始值: 50% 50%

&emsp;&emsp;应用于: 非inline元素(包括block、inline-block、table、table-cell等)

&emsp;&emsp;继承性: 无

&emsp;&emsp;注意：IE9-浏览器不支持，safari3.1-8、android2.1-4.4.4、IOS3.2-8.4都需要添加前缀，其他更高版本浏览器可使用标准写法

&emsp;&emsp;2维的变形原点transform-origin是由x轴和y轴两个轴的值共同确定的(不考虑3维的情况，z轴的值默认为0)

<div>
<pre>x轴: left | center | right | &lt;length&gt; | &lt;percentage&gt;
y轴: top | center | bottom | &lt;length&gt; | &lt;percentage&gt;</pre>
</div>

【1】关键字

<div>
<pre>x轴
left: 0%  center: 50%  right: 100%
y轴
top: 0%  center: 50%  bottom: 100%</pre>
</div>

![transform2dKeywords](https://pic.xiaohuochai.site/blog/CSS_render_transform2dKeywords.jpg)

<div>//以rotate()旋转函数来说明变形原点。rotate(90deg)表示元素沿顺时针旋转90角度</div>

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/transform2d/t1.html" frameborder="0" width="320" height="240"></iframe>

【2】数值

&emsp;&emsp;x轴数值表示在x轴上离0点(元素边框外侧左上角)的偏移量；y轴数值表示在y轴上离0点的偏移量

//以rotate()旋转函数来说明变形原点。rotate(90deg)表示元素沿顺时针旋转90角度

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/transform2d/t2.html" frameborder="0" width="320" height="240"></iframe>

【3】百分比

&emsp;&emsp;其中x轴的百分比相对于元素的宽度和(width+横向padding+横向border)，即包含块的宽度；而y轴的百分比相对于元素的高度和(height+纵向padding+纵向border)，即包含块的高度

//以rotate()旋转函数来说明变形原点。rotate(90deg)表示元素沿顺时针旋转90角度

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/transform2d/t3.html" frameborder="0" width="320" height="240"></iframe>

【4】单个值

&emsp;&emsp;当只有一个值时，默认第二个值为center

//以rotate()旋转函数来说明变形原点。rotate(90deg)表示元素沿顺时针旋转90角度

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/transform2d/t4.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 变形函数(2维)

&emsp;&emsp;变形transform是一系列变形函数的集合

transform

&emsp;&emsp;值: none | &lt;transform-function&gt;+

&emsp;&emsp;初始值: none

&emsp;&emsp;应用于: 非inline元素(包括block、inline-block、table、table-cell等)

&emsp;&emsp;继承性: 无

<div>
<pre>&lt;transform-function&gt;: translate | scale | rotate | skew | matrix</pre>
</div>

&emsp;&emsp;注意：transform中出现多个变形函数时用空格分隔

&emsp;&emsp;注意：位移、缩放、旋转和倾斜这四个操作中除了位移与变形原点无关，其余三个都与变形原点有关

**矩阵matrix**

&emsp;&emsp;实际上，位移、缩放、旋转和倾斜这四个操作都是通过矩阵matrix实现的

&emsp;&emsp;matrix(a,b,c,d,e,f)函数有a,b,c,d,e,f这6个参数。而x和y是变形前元素的任意点。通过以下矩阵变换，生成对应的新坐标x'和y'。

![transformMatrix1](https://pic.xiaohuochai.site/blog/CSS_render_transformMatrix.png)

<div>
<pre>x' = ax + cy + e;
y' = bx + dy + f;</pre>
</div>

&emsp;&emsp;由此可得到默认a、d为1，b、c、e、f为0。a和d控制缩放，且不可为0；c和b控制倾斜；而e和f控制位移

&emsp;&emsp;注意：matrix()方法的最后两个参数，对于chrome浏览器来说，默认是px单位，可以不写单位。但是，在firefox浏览器下，需要添加单位

<iframe style="width: 100%; height: 390px;" src="https://demo.xiaohuochai.site/css/transform2d/t5.html" frameborder="0" width="320" height="240"></iframe>

**镜像对称**

&emsp;&emsp;对称轴一定通过元素变换的中心点，k是对称轴的斜率

![transformMatrix2](https://pic.xiaohuochai.site/blog/CSS_render_transformMatrix2.png)

<div>
<pre>matrix((1-k*k)/(1+k*k),2k/(1+k*k),2k/(1+k*k),(k*k-1)/(1+k*k),0,0)</pre>
</div>

**位移**

&emsp;&emsp;translate位移函数可以使元素从原来的位置上移动指定的位移。涉及位移的2d函数共3种，分别是translate()、translateX()、translateY()

&emsp;&emsp;注意：元素发生位移后，元素的x轴和y轴跟着也一并移动，若元素再进行其他的变形操作，则要沿着改变后的x轴和y轴进行变形

translate(x[,y]?)

&emsp;&emsp;x表示元素在x轴方向上的位移；y表示元素在y轴方向上的位移

&emsp;&emsp;注意：当y不存在时，相当于y=0

translateX(x) 相当于 translate(x,0)

&emsp;&emsp;x表示元素在x轴方向上的位移

translateY(y) 相当于 translate(0,y)

&emsp;&emsp;y表示元素在y轴方向上的位移

&emsp;&emsp;注意：位移函数相当于matrix(1,0,0,1,x,y)

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/transform2d/t6.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;位移函数还可以接受百分比。其中x%相对于元素水平方向的宽度和，y%相对于元素垂直方向的高度和

&emsp;&emsp;注意：IE10浏览器有bug，元素的位移函数的百分比是相对于元素的可视宽高(不包括边框)而言的

<div>
<pre>//元素的主要样式为width:100px;height:100px;padding:10px;border:10px solid black;</pre>
</div>

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/transform2d/t7.html" frameborder="0" width="320" height="240"></iframe>

**缩放**

&emsp;&emsp;scale缩放函数可以让元素根据变形原点进行缩放，默认缩放值为1。涉及缩放的2d函数共3种，分别是scale()、scaleX()、scaleY()

&emsp;&emsp;注意：当元素被缩放后，若元素要进行位移，数值类型的位移值要乘以该缩放比例；百分比类型的位移值乘以原来的宽度和或高度和转换成数值类型后，再乘以缩放比例

scale(x,[,y]?)

&emsp;&emsp;x表示元素在x轴方向上的缩放比例；y表示元素在y轴方向上的缩放比例

&emsp;&emsp;注意：当y不存在时，相当于y=x

&emsp;&emsp;注意：当x或y的值为负值时，元素先翻转再缩放

scaleX(x) 相当于 scale(x,1)

&emsp;&emsp;x表示元素在x轴方向上的缩放比例

scaleY(y) 相当于 scale(1,y)

&emsp;&emsp;y表示元素在y轴方向上的缩放比例

&emsp;&emsp;注意：缩放函数相当于matrix(x,0,0,y,0,0)

<iframe style="width: 100%; height: 370px;" src="https://demo.xiaohuochai.site/css/transform2d/t8.html" frameborder="0" width="320" height="240"></iframe>

**倾斜**

&emsp;&emsp;skew倾斜函数可以让元素以其变形原点围绕x轴和y轴进行一定角度的倾斜。涉及倾斜的2d函数共3种，分别是skew()、skewX()、skewY()

&emsp;&emsp;注意：元素倾斜后，x轴和y轴发生倾斜，若元素要进行其他变形操作，则沿着倾斜后的x轴和y轴进行变形

skew(xdeg,[,ydeg]?)

&emsp;&emsp;x表示y轴向x轴倾斜的角度，y表示x轴向y轴倾斜的角度

&emsp;&emsp;注意：当y不存在时，相当于y=0

&emsp;&emsp;注意：x&gt;0时，表示y轴向x轴正方向倾斜；x&lt;0时，表示y轴向x轴负方向倾斜

&emsp;&emsp;注意：y&gt;0时，表示x轴向y轴正方向倾斜；y&lt;0时，表示x轴向y轴负方向倾斜

skewX(x) 相当于 skew(x,0)

&emsp;&emsp;x表示y轴向x轴倾斜的角度

skewY(y) 相当于 skew(0,y)

&emsp;&emsp;y表示x轴向y轴倾斜的角度

&emsp;&emsp;注意：倾斜函数相当于matrix(1,tany,tanx,1,0,0)

<iframe style="width: 100%; height: 370px;" src="https://demo.xiaohuochai.site/css/transform2d/t9.html" frameborder="0" width="320" height="240"></iframe>

**旋转**

&emsp;&emsp;rotate旋转函数可以让元素通过指定的角度(deg)根据变形原点进行顺时针旋转，默认为0deg。与skew不同的是，rotate不会改变元素的形状。涉及到旋转的2d函数只有一个，就是rotate()

&emsp;&emsp;注意：元素旋转后，元素的x轴和y轴也跟着发生旋转。若元素要进行其他变形操作，则沿着旋转后的x轴和y轴进行变形

rotate(Ndeg)

&emsp;&emsp;注意：当N为正数时，元素进行顺时针旋转；当N为负数时，元素进行逆时针旋转

&emsp;&emsp;注意：旋转函数相当于matrix(cosN,sinN,-sinN,cosN,0,0)

<iframe style="width: 100%; height: 360px;" src="https://demo.xiaohuochai.site/css/transform2d/t10.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 多值

&emsp;&emsp;transform变形可以接受多值，出现多个变形函数时用空格分隔，并且按照从前往后的顺序执行。

<div>
<pre>transform: &lt;transform-function1&gt; &lt;transform-function2&gt; &lt;transform-function3&gt;...</pre>
</div>

【1】多个变形函数的先后关系可以转换为多个元素的嵌套关系

<div>
<pre>&lt;div style="transform:rotate(45deg) translateX(100px)"&gt;&lt;/div&gt;
相当于
&lt;div style="transform:rotate(45deg)"&gt;
  &lt;div style="transform:translateX(100px)"&gt;&lt;/div&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>.box{
  width: 100px;
} 
.in{
  background-color: pink;
  height: 100px;
}
.out{
  background-color: lightblue;
  height: 100px;
}</pre>
</div>
<div>
<pre>&lt;div class="box"&gt;
    &lt;div class="out" style="-webkit-transform:rotate(45deg) translateX(100px);transform:rotate(45deg) translateX(100px);"&gt;&lt;/div&gt;
    &lt;div style="-webkit-transform:rotate(45deg);transform:rotate(45deg)"&gt;
      &lt;div class="in" style="-webkit-transform:translateX(100px);transform:translateX(100px)"&gt;&lt;/div&gt;
    &lt;/div&gt;    
&lt;/div&gt;</pre>
</div>

<iframe style="line-height: 1.5; width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/transform2d/t11.html" frameborder="0" width="320" height="240"></iframe>

【2】变形transform中的多个变形函数的执行顺序是从前向后依次执行

<div>
<pre>//第一种情况:旋转45deg后，元素的x轴正向变成右下45deg，所以元素接下来的位移向这个方向移动
//第二种情况:元素向右移动100px后，元素的原点跟着元素一起平移，并一直在元素的中心位置，所以元素接下来的旋转是原地旋转</pre>
</div>

<iframe style="width: 100%; height: 380px;" src="https://demo.xiaohuochai.site/css/transform2d/t12.html" frameborder="0" width="320" height="240"></iframe>
