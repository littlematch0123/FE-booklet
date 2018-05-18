# canvas图形处理和进阶用法

&emsp;&emsp;上一篇博客介绍了canvas基础用法，本文将更进一步，介绍canvas的图形处理和进阶用法

 

&nbsp;

### 图形变换

&emsp;&emsp;图形变换是指用数学方法调整所绘形状的物理属性，其实质是坐标变形。所有的变换都依赖于后台的数学矩阵运算。谈到图形变换，不得不得说的三个基本变换方法就是
```
平移变换：translate(x,y)
旋转变换：rotate(deg)
缩放变换：scale(sx,sy)
```
【translate()】

&emsp;&emsp;translate(x,y)：将坐标原点移动到(x,y)。执行这个变换之后，坐标(0,0)会变成之前由(x,y)表示的点

&emsp;&emsp;平移变换，顾名思义，就是一般的图形位移。比如这里想将位于（100，100）的矩形平移至（200，200）点。那么只要在绘制矩形之前加上context.translate(100,100)即可

&emsp;&emsp;下面结合代码来看看效果

```
<canvas id="drawing" style="border:1px solid black">
    <p>The canvas element is not supported!</p>
</canvas>
<script>
var drawing = document.getElementById('drawing');
if(drawing.getContext){
    var context = drawing.getContext('2d'); 

    context.beginPath();
    context.fillStyle = "#00AAAA";
    context.fillRect(0,0,100,50);

    context.fillStyle = "red";
    context.translate(50,50);
    context.fillRect(0,0,100,50);
}
</script>
```
&emsp;&emsp;青蓝色矩形通过调用translate()方法后，将矩形向右移动了(50,50)，并变成了红色，尺寸不改变

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/js/canvas/advance/a1.html" frameborder="0" width="230" height="240"></iframe>

&emsp;&emsp;想把矩形再向右移动(50,50)，应该使用translate(50,50)，还是从最开始算起，使用traslate(100,100)呢？

```
<script>
var drawing = document.getElementById('drawing');
if(drawing.getContext){
    var context = drawing.getContext('2d');
    context.beginPath();
    context.fillStyle = "#00AAAA";
    context.fillRect(0,0,100,50);

    context.fillStyle = "red";
    context.translate(50,50);
    context.fillRect(0,0,100,50);

    context.fillStyle = "lightblue";
    context.translate(50,50);
    context.fillRect(0,0,100,50);
}
</script>
```
&emsp;&emsp;由结果可知，使用translate(50,50)即可实现，依照translate()的定义，第一次进行translate()变换时，已经变换了坐标系的原点，这次是基于新坐标系又一次地变换


<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/js/canvas/advance/a2.html" frameborder="0" width="230" height="240"></iframe>

【状态保存】

&emsp;&emsp;由于多次运行变换后，坐标系可能就乱套了，所以最好以最初状态为参照物。这时就需要用到save()和resore()方法

&emsp;&emsp;save()方法可以保存当前环境的状态，并返回某组属性与变换的组合。所有设置都会进入一个栈结构，得以妥善保管

&emsp;&emsp;restore()方法可以在保存设置的栈结构中向前返回一级，恢复之前保存过的路径状态和属性。连续调用save()方法可以把更多设置保存到栈结构中，之后再连续调用restore()方法可以一级一级返回

 &emsp;&emsp;如果使用状态保存，则代码如下所示

```
<script>
var drawing = document.getElementById('drawing');
if(drawing.getContext){
    var context = drawing.getContext('2d');
    context.beginPath();
    context.fillStyle = "#00AAAA";
    context.fillRect(0,0,100,50);

    context.save();
    context.fillStyle = "red";
    context.translate(50,50);
    context.fillRect(0,0,100,50);
    context.restore();

    context.save();
    context.fillStyle = "lightblue";
    context.translate(100,100);
    context.fillRect(0,0,100,50);
    context.restore();
}
</script>
```
&emsp;&emsp;这样，每次图形变换，都以(0,0)点为基准，不会造成坐标系的混乱

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/js/canvas/advance/a3.html" frameborder="0" width="230" height="240"></iframe>

【rotate()】

&emsp;&emsp;rotate(angle)：围绕原点旋转图像angle弧度

&emsp;&emsp;同画圆弧一样，这里的rotate(deg)传入的参数是弧度，不是角度。同时需要注意的是，这个的旋转是以坐标系的原点(0,0)为圆心进行的顺时针旋转。所以，在使用rotate()之前，通常需要配合使用translate()平移坐标系，确定旋转的圆心。即，旋转变换通常搭配平移变换使用的。

&emsp;&emsp;最后一点需要注意的是，Canvas是基于状态的绘制，所以每次旋转都是接着上次旋转的基础上继续旋转，所以在使用图形变换的时候必须搭配save()与restore()方法，一方面重置旋转角度，另一方面重置坐标系原点

&emsp;&emsp;下面是一个例子

```
<canvas id="drawing" style="border:1px solid black">
    <p>The canvas element is not supported!</p>
</canvas>
<script>
var drawing = document.getElementById('drawing');
if(drawing.getContext){
    var context = drawing.getContext('2d');
    context.beginPath();
    context.fillStyle = "#00AAAA";
    context.fillRect(0,0,50,50);

    context.save();
    context.fillStyle = "red";
    context.rotate(30*Math.PI/180);
    context.fillRect(0,0,50,50);
    context.restore();  

    context.save();
    context.fillStyle = "green";
    context.rotate(60*Math.PI/180);
    context.fillRect(0,0,50,50);
    context.restore(); 
} 
</script>
```
&emsp;&emsp;由结果可知，元素是围绕原点进行顺时针旋转rotate的

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/js/canvas/advance/a4.html" frameborder="0" width="230" height="240"></iframe>

 &emsp;&emsp;下面以元素左上角为圆心进行旋转

```
<script>
var drawing = document.getElementById('drawing');
if(drawing.getContext){
    var context = drawing.getContext('2d');
    context.beginPath();
    context.fillStyle = "#00AAAA";
    context.fillRect(30,30,50,50);

    context.save();
    context.fillStyle = "red";
    context.translate(30,30);
    context.rotate(30*Math.PI/180);
    context.fillRect(0,0,50,50);
    context.restore();  

    context.save();
    context.fillStyle = "lightgreen";
    context.translate(30,30);
    context.rotate(60*Math.PI/180);
    context.fillRect(0,0,50,50);
    context.restore(); 
}
</script>
```
<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/js/canvas/advance/a5.html" frameborder="0" width="230" height="240"></iframe>

&emsp;&emsp;下面以元素中心点为圆心进行旋转，会出现如下所示神奇的效果

```
<canvas id="drawing" style="border:1px solid black">
    <p>The canvas element is not supported!</p>
</canvas>
<script>
var drawing = document.getElementById('drawing');
if(drawing.getContext){
    var context = drawing.getContext('2d');
    context.beginPath();
    context.fillStyle = "rgba(255,0,0,0)";
    context.fillRect(45,45,50,50);
    for(var i = 1; i <=10; i++){
      context.save();
      context.fillStyle = "rgba(255,0,0,0.25)";
      context.translate(70,70);
      context.rotate(i*36*Math.PI/180);
      context.fillRect(0,0,50,50);
      context.restore();   
    }
}
</script>
```
<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/js/canvas/advance/a6.html" frameborder="0" width="230" height="240"></iframe>

【scale()】

&emsp;&emsp;scale(scaleX,scaleY)：缩放图像，在x方向上乘以scaleX，在Y方向上乘以scaleY。scaleX和scaleY的默认值是1

&emsp;&emsp;context.scale(2,2)就是对图像放大两倍。看上去简单，实际用起来还是有一些问题的。先来看一段代码

```
<canvas id="drawing" style="border:1px solid black">
    <p>The canvas element is not supported!</p>
</canvas>
<script>
var drawing = document.getElementById('drawing');
if(drawing.getContext){
    var context = drawing.getContext('2d');
    context.beginPath();
    context.lineWidth = 3;
    context.strokeRect(10,10,50,50);
    for(var i = 1; i <= 2; i++){
      context.save();
      context.scale(i,i);
      context.strokeRect(20,20,50,50);
      context.restore();
    }
}
</script>
```
&emsp;&emsp;结果如下，左上角顶点的坐标变了，而是线条的粗细也变了

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/js/canvas/advance/a7.html" frameborder="0" width="230" height="240"></iframe>

&emsp;&emsp;因此，对于缩放变换有两点问题需要注意：

&emsp;&emsp;1、缩放时，图形左上角坐标的位置也会对应缩放

&emsp;&emsp;2、缩放时，图像线条的粗细也会对应缩放

 

&nbsp;

### 矩阵变换

&emsp;&emsp;上面所说的坐标变换的三种方式——平移translate()，缩放scale()，以及旋转rotate()都可以通过transform()做到

&emsp;&emsp;在介绍矩阵变换transform()前，先来介绍下什么是变换矩阵

&emsp;&emsp;注意:关于transform的详细介绍，移步CSS3的transform介绍


&emsp;&emsp;以上是Canvas中transform()方法所对应的变换矩阵

【transform()】

&emsp;&emsp;而此方法正是传入图中所示的六个参数，具体为`context.transform(a,b,c,d,e,f)`

&emsp;&emsp;各参数意义对应如下表：

```
参数    意义
a    水平缩放(1)
b    水平倾斜(0)
c    垂直倾斜(0)
d    垂直缩放(1)
e    水平位移(0)
f    垂直位移(0)
```
&emsp;&emsp;建议使用transform()的时候，可以在如下几个情况下使用：

&emsp;&emsp;1、使用context.transform (1,0,0,1,dx,dy)代替context.translate(dx,dy)

&emsp;&emsp;2、使用context.transform(sx,0,0,sy,0,0)代替context.scale(sx, sy)

&emsp;&emsp;3、使用context.transform(1,tany,tanx,1,0,0)来实现倾斜效果

```
<canvas id="drawing" style="border:1px solid black">
    <p>The canvas element is not supported!</p>
</canvas>
<script>
var drawing = document.getElementById('drawing');
if(drawing.getContext){
    var context = drawing.getContext('2d');

    context.beginPath();
    context.lineWidth = 3;
    context.strokeRect(10,10,50,50);

    context.save();
    context.transform (1,0,0,1,30,30);
    context.strokeStyle = 'pink';
    context.strokeRect(0,0,50,50);
    context.restore();

    context.save();
    context.transform(2,0,0,2,0,0)
    context.strokeStyle = 'lightblue';
    context.strokeRect(50,10,50,50);
    context.restore();

    context.save();
    context.transform(1,0,Math.tan(30*Math.PI/180),1,0,0);
    context.strokeStyle = 'lightgreen';
    context.strokeRect(200,10,50,50);
    context.restore();
} 
</script>
```
<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/js/canvas/advance/a8.html" frameborder="0" width="230" height="240"></iframe>

【setTransform()】

&emsp;&emsp;setTransform()：将变换矩阵重置为默认状态，然后再调用transform()

&emsp;&emsp;transform()方法的行为相对于由 rotate(),scale(), translate(), or transform() 完成的其他变换。例如：如果已经将绘图设置为放到两倍，则 transform() 方法会把绘图放大两倍，那么绘图最终将放大四倍。这一点和之前的变换是一样的。

&emsp;&emsp;但是setTransform()不会相对于其他变换来发生行为。它的参数也是六个，context.setTransform(a,b,c,d,e,f)，与transform()一样

&emsp;&emsp;当前面的代码已经使用了多个transform()、translate()、rotate()、scale()等变换方法，无法轻易地从当前的矩阵变化到想要的矩阵时，就可以使用setTransform()方法将矩阵重置为默认状态，然后再调用transform()
```
cxt.transform(1,0,0,1,50,100);
cxt.transform(2,0,0,1.5,0,0);
cxt.transform(1.-0.2,-0.2,1,0,0);
cxt.setTransform(1,0,0,1,100,100);
``` 

&nbsp;

### 全局阴影

&emsp;&emsp;2D上下文会根据以下4个属性的值自动为形状或路径绘制出阴影

&emsp;&emsp;注意:关于CSS阴影box-shadow的详细情况移步至此
```
shadowColor:      用CSS颜色格式表示的阴影颜色(默认为黑色)    
shadowOffsetX:    形状或路径x轴方向的阴影偏移量(默认为0)
shadowOffsetY:    形状或路径y轴方向的阴影偏移量(默认为0)
shadowBlur:       模糊的像素数(默认为0，即不模糊)
```
&emsp;&emsp;这四个属性只要设置了第一个和剩下三个中的任意一个就有阴影效果。不过通常情况下，四个属性都要设置

&emsp;&emsp;注意:要先设置阴影，再绘制图形

&emsp;&emsp;下面代码创建一个向右下方位移各5px的红色阴影，模糊2px

```
<canvas id="drawing" style="border:1px solid black">
    <p>The canvas element is not supported!</p>
</canvas>
<script>
var drawing = document.getElementById('drawing');
if(drawing.getContext){
    var context = drawing.getContext('2d');

    context.shadowColor = "red";
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 5;
    context.shadowBlur= 2;

    context.fillStyle = 'lightblue';
    context.fillRect(10,10,100,100);
} 
</script>
```
<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/js/canvas/advance/a9.html" frameborder="0" width="230" height="240"></iframe>

&emsp;&emsp;下面是一个文字阴影的效果

&emsp;&emsp;注意:关于CSS3属性文本阴影text-shadow的详细情况移步至此

```
<script>
var drawing = document.getElementById('drawing');
if(drawing.getContext){
    var context = drawing.getContext('2d');

    context.shadowColor = "rgba(0,0,0,0.5)";
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 5;
    context.shadowBlur= 2;
    context.font= '30px 微软雅黑';
    context.fillText("小火柴的蓝色理想",40,60); 
} 
</script>
```
<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/js/canvas/advance/a10.html" frameborder="0" width="230" height="240"></iframe>

 

&nbsp;

### 全局透明

&emsp;&emsp;全局透明globalAlpha是一个介于0和1之间的属性值(包括0和1)，用于指定所有绘制的透明度(默认值为1)。如果后续所有操作都基于相同透明度，可以先把globalAlpha设置为适当值，然后绘制，最后再设置回默认值1

&emsp;&emsp;注意:全局透明globalAlpha也是一个基于状态的属性，所以需要先设置该属性，再绘制图形

```
<script>
var drawing = document.getElementById('drawing');
if(drawing.getContext){
    var context = drawing.getContext('2d');
 
    context.fillStyle = 'lightblue';
    context.fillRect(10,10,100,100);

    context.globalAlpha = 0.5;
    context.fillStyle = 'lightblue';
    context.fillRect(120,10,100,100);
    context.globalAlpha = 1;
}
</script>
```
<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/js/canvas/advance/a11.html" frameborder="0" width="230" height="240"></iframe>


 

&nbsp;

### 图形合成

&emsp;&emsp;两个图形重合的时候，就涉及到了对这两个图形的合成处理

&emsp;&emsp;globalCompositeOperation表示后绘制的图形怎样与先绘制的图形结合，属性值是字符串，可能值如下：

```
source-over(默认)：后绘制的图形位于先绘制的图形上方
source-in:后绘制的图形与先绘制的图形重叠的部分可见，两者其他部分完全透明
source-out:后绘制的图形与先绘制的图形不重叠的部分可见，先绘制的图形完全透明
source-atop:后绘制的图形与先绘制的图形重叠的部分可见，先绘制的图形不受影响
destination-over:后绘制的图形位于先绘制的图形下方，只有之前透明像素下的部分才可见
destination-in:后绘制的图形位于先绘制的图形下方，两者不重叠的部分完全透明
destination-out:后绘制的图形擦除与先绘制的图形重叠的部分
destination-atop:后绘制的图形位于先绘制的图形下方，在两者不重叠的地方，先绘制的图形会变透明
lighter:后绘制的图形与先绘制的图形重叠部分的值相加，使该部分变亮
copy:后绘制的图形完全替代与之重叠的先绘制图形 
xor:后绘制的图形与先绘制的图形重叠的部分执行"异或"操作
```
&emsp;&emsp;注意:合成操作只能写在两个图形之间

<iframe style="width: 100%; height: 455px;" src="https://demo.xiaohuochai.site/js/canvas/advance/a12.html" frameborder="0" width="230" height="240"></iframe>

 

&nbsp;

### 裁剪区域

&emsp;&emsp;使用Canvas绘制图像的时候，经常会想要只保留图像的一部分，这时可以使用canvas API再带的图像裁剪功能clip()来实现这一想法

&emsp;&emsp;Canvas API的图像裁剪功能是指，在画布内使用路径，只绘制该路径内所包含区域的图像，不会只路径外的图像。这有点像Flash中的图层遮罩

&emsp;&emsp;使用图形上下文的不带参数的clip()方法来实现Canvas的图像裁剪功能。该方法使用路径来对Canvas设置一个裁剪区域。因此，必须先创建好路径。创建完整后，调用clip()方法来设置裁剪区域

&emsp;&emsp;注意:裁剪是对画布进行的，裁切后的画布不能恢复到原来的大小，也就是说画布是越切越小的，要想保证最后仍然能在canvas最初定义的大小下绘图需要注意save()和restore()

```
<button id="btn">裁剪</button>
<canvas id="drawing" style="border:1px solid black">
    <p>The canvas element is not supported!</p>
</canvas>
<script>
var drawing = document.getElementById('drawing');
if(drawing.getContext){
    var context = drawing.getContext('2d');
    drawing.style.background = '#333';
    var oBtn =document.getElementById('btn');
    oBtn.onclick = function(){
      context.arc(50,50,40,0,2*Math.PI,false);
      context.fillStyle = '#fff';
      context.fill(); 
      context.clip();      
    }
} 
</script>
```
<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/js/canvas/advance/a13.html" frameborder="0" width="230" height="240"></iframe>


&emsp;&emsp;可以使用clip()实现类似于探照灯的效果

 

&nbsp;

### 图像绘制

&emsp;&emsp;把一幅图像绘制到画布上可以使用drawImage()方法，根据期望的最终结果的不同，调用这个方法时，可以使用三种不同的参数组合

&emsp;&emsp;1、最简单的调用方式是传入一个`<img>`元素，以及绘制该图像的起点的x和y坐标
```
context.drawImage(img,10,10);
```
&emsp;&emsp;2、若想要改变绘制的图像的大小，可以多传入两个参数，分别表示目标宽度和目标高度
```
context.drawImage(img,50,10,20,30);
```
&emsp;&emsp;3、还可以选择把图像中的某个区域绘制到上下文中。drawImage()方法的这种调用方式总共需要传入9个参数：要绘制的图像、源图像的x坐标、源图像的y坐标、源图像的宽度、源图像的高度、目标图像的x坐标、目标图像的y坐标、目标图像的宽度、目标图像的高度
```
context.drawImage(img,0,10,50,50,0,100,40,60);
```
&emsp;&emsp;注意:在引入图像时，要先使用onload()事件，等图像加载完成后，再进行操作
```
var image = new Image();
image.src="xx/xxx.jpg";
image.onload = function(){
    cxt.drawImage(image,0,0);
}
```
&emsp;&emsp;除了给drawImage()方法传入<img>元素外，还可以传入另一个<canvas>元素作为其第一个参数

&emsp;&emsp;使用toDataURL()方法可以导出在canvas元素上绘制的图像。这个方法接受一个参数，即图像的MIME类型格式，而且适合用于创建图像的任何上下文

&emsp;&emsp;注意:toDataURL()方法只可以在服务器端使用，在本地无效，且不可跨域
```
var imgURI = drawing.toDataURL('image/png');
var image = document.createElement('img');
image.src=imgURI;
```
&emsp;&emsp;下面是一个实例，把一幅图像绘制到画布上

```
<script>
var drawing = document.getElementById('drawing');
if(drawing.getContext){
    var context = drawing.getContext('2d');
    var image = new Image();
    image.src="http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/chunfen.jpg";
    image.onload = function(){
        context.drawImage(image,0,0);
    }
}
</script>
```

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/js/canvas/advance/a14.html" frameborder="0" width="230" height="240"></iframe>

&emsp;&emsp;接下来，绘制路径， 并使用clip()裁剪，只在裁剪区域内显示图片

```
<canvas id="drawing" style="border:1px solid black">
    <p>The canvas element is not supported!</p>
</canvas>
<script>
var drawing = document.getElementById('drawing');
if(drawing.getContext){
    var context = drawing.getContext('2d');

    context.arc(80,60,50,0,2*Math.PI,false);
    context.fillStyle = '#fff';
    context.fill(); 
    context.clip(); 

    var image = new Image();
    image.src="http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/chunfen.jpg";
    image.onload = function(){
        context.drawImage(image,0,0);
    }
} 
</script>
```

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/js/canvas/advance/a15.html" frameborder="0" width="230" height="240"></iframe>
 

&nbsp;

### 使用图像数据

【获取】

&emsp;&emsp;2D上下文可以通过getImageData()取得原始图像数据。这个方法接收4个参数：画面区域的x和y坐标以及该区域的像素宽度和高度

&emsp;&emsp;例如，要取得左上角坐标为(10,5)、大小为50*50像素的区域的图像数据，可以使用以下代码：
```
var imageData = context.getImageData(10,5,50,50);
```
&emsp;&emsp;返回的对象是ImageData的实例，每个ImageData对象有3个属性：width\height\data

&emsp;&emsp;1、width：表示imageData对角的宽度

&emsp;&emsp;2、height：表示imageData对象的高度

&emsp;&emsp;3、data是一个数组，保存着图像中每一个像素的数据。在data数组中，每一个像素用4个元素来保存，分别表示red、green、blue、透明度

&emsp;&emsp;注意:图像中有多少像素，data的长度就等于像素个数乘以4

```
//第一个像素如下
var data = imageData.data;
var red = data[0];
var green = data[1]; 
var blue = data[2];
var alpha = data[3];
```
&emsp;&emsp;数组中每个元素的值是在0-255之间，能够直接访问到原始图像数据，就能够以各种方式来操作这些数据

&emsp;&emsp;下面来获取canvas中某一点的原始图像数据

&emsp;&emsp;注意:如果要使用getImageData()获取的canvas中包含drawImage()方法，则该方法中的URL不能跨域

```
<script>
var drawing = document.getElementById('drawing');
if(drawing.getContext){
    var context = drawing.getContext('2d');
    var image = new Image();
    image.src="chunfen.jpg";
    image.onload = function(){
        context.drawImage(image,0,0);
      var imageData = context.getImageData(10,5,50,50);
      var data = imageData.data
      //42 189 209 255
      console.log(data[0],data[1],data[2],data[3]);     
    }
} 
</script>
```
&emsp;&emsp;从代码中可知，(10,5)点坐标的红色值为42，绿色值为189，蓝色值为209，透明度为255（即不透明）

【创建】

&emsp;&emsp;createImageData(width,height)方法创建新的空白ImageData对象。新对象的默认像素值 transparent black，相当于rgba(0,0,0,0)
```
var imgData = context.createImageData(100,100);
```
【修改】

&emsp;&emsp;putImageData()方法将图像数据从指定的ImageData对象放回画布上，该方法共有以下参数

```
imgData：要放回画布的ImageData对象(必须)
x：imageData对象的左上角的x坐标(必须)
y：imageData对象的左上角的y坐标(必须)
dirtyX：在画布上放置图像的水平位置(可选)
dirtyY：在画布上放置图像的垂直位置(可选)
dirtyWidth：在画布上绘制图像所使用的宽度(可选)
dirtyHeight：在画布上绘制图像所使用的高度(可选)
```
&emsp;&emsp;注意:参数3到7要么都没有，要么都存在
```
context.putImageData(imgData,0,0);    
context.putImageData(imgData,0,0,50,50,200,200);
```
&emsp;&emsp;下面利用上面的方法来实现一个灰阶过滤效果，通过getImageData()取得每个像素的红、绿、蓝三种颜色的色值后，计算出它们的平均值，再把这个平均值设置为每个颜色的值，再调用putImageData()把图像绘制到画布上

```
<canvas id="drawing1" style="border:1px solid black">
    <p>The canvas element is not supported!</p>
</canvas>
<canvas id="drawing2" style="border:1px solid black">
    <p>The canvas element is not supported!</p>
</canvas>
<script>
var drawing1 = document.getElementById('drawing1');
if(drawing1.getContext){
  var cxt1 = drawing1.getContext('2d');
  var img = new Image();
  img.src="chunfen.jpg";
  img.onload = function(){
      cxt1.drawImage(img,0,0);
      var imageData = cxt1.getImageData(0,0,img.width,img.height); 
      setImage(imageData);
  }
} 
var drawing2 = document.getElementById('drawing2');
if(drawing2.getContext){
  var cxt2 = drawing2.getContext('2d');
  function setImage(imageData){
    var data = imageData.data;
    for(var i = 0, len = data.length; i < len; i+=4){
        var red = data[i];
        var green = data[i+1];
        var blue = data[i+2];
        var alpha = data[i+3];
        var average = Math.floor((red+green+blue)/3);
        data[i] = data[i+1] = data[i+2] = average;
    }
    imageData.data = data;
    cxt2.putImageData(imageData,0,0);
  }    
} 
</script>
```
![](https://pic.xiaohuochai.site/blog/canvas_advance1.png)

&emsp;&emsp;实现颜色反转效果也是类似的原理，将每个色值重新赋值为255-当前值即可

```
<canvas id="drawing1" style="border:1px solid black">
    <p>The canvas element is not supported!</p>
</canvas>
<canvas id="drawing2" style="border:1px solid black">
    <p>The canvas element is not supported!</p>
</canvas>
<script>
var drawing1 = document.getElementById('drawing1');
if(drawing1.getContext){
  var cxt1 = drawing1.getContext('2d');
  var img = new Image();
  img.src="data:image/gif;base64,R0lGODlhIAAgAPcAAP91AafK42iOqf+9RP/Kkv/x5P+TPP/Ah5C20P+NIv/ss/+6e+Du9/+ZAP/qyv/iv32ivP+bSP+8X//eqP/8+bW4uf+LAP+lIv/x2LrV6P/chP+0Of+bEP+nWqfE2f++Wf/Udf99EIOrxv/gtP+LEP/Xhf+oP//ll//sz/+sIf+eJ/+2S/+/Uv/MZmuUsf+CAP/17Z3A2e34///Pc7PG1P/dlf+lEP+UAP+iAP+xUf+sJ//x3v/di//LhP/npXOcuP/Ga//VeYGow/+tSMfa54uwyv+hF//WiqrN5f/tvf+uO//Me/+YQv+3Qv/Jcf/Nav/pv/+kB7jL2P+TIf96AP/00//GXP/js/+ZM//env+sVP///3GXsf+UB//orv/GVP/69v+zJ/+DDP/45v/GY/+OCf+EDpy93v/bff/14P+fCYquyP/erf/moLO8wf+aFf+JGf/Mjv+7SP+nKv+1If/xxf/pwv+2XMTW4/+4M//WlP/Ubv+wXP+BGP/Jff+dNv+sG/+PJ7nN2wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAHAP8ALAAAAAAgACAAAAj/ALcIHEiwoMGDCBMqXJjQwYwNgHAA2jDDAcOEGFhE2Yijo0cWGC4WvJJiQxM5cvKECZPCRkcbV0QKnKCDxYwjR4I8+TJgQJ6WDRpMEIkiBYsjV+zY8VIjSAsrPMPYaKAGxcUmSpxcwTAmjQOmaPa0iDpVCcMHHJocsTNmC4wqSdrwQIPmiZUmOrp0GbFQAocVR6CkgTEGro8TGjQ4ZbHByI0PC990adKDjQMMGOooaHOCx9w9dy/ceKNwjIUuSoDU8JIkiYLDnnloAEFGzpwuFmBgtFBmzoclNXwI7xx7NpkVc8pYCImwAO85K1oEiU1dNm3kynUjpPDihYohVmaU/qjuucQMK0NUWHixEMuLKSY+AAmigXwQIB9MTHmBZeGBFyT8sQIZ4o0Xm3nH/UHCCwssVIAYVMAn3xIlGFjCEvjpR8ULBTB0ABVmYDGEBE6UkMWJeiwhwRBYmEFFgwxR0AEAcPyRgx9ZXKFjFj3c8QccAERAgUgUMAFAAlrEMYIDTI4QBx+BBAmGTFuAYUAIHRDwwA4w7PAAAR30wcSUVLrlwg9CIBAAEjGsAQEXApBZ5hYVoKkmm25y4cacA7kQQwYMyMAAER4UIYIAfAokhZ1rtvkmDYlu4SegghJqKKKJLppmo3lCGukPlA5aKBeRCiTIpnhCIEWpAxHRKB6sA7IaEAA7";
  img.onload = function(){
      cxt1.drawImage(img,0,0);
      var imageData = cxt1.getImageData(0,0,img.width,img.height); 
      setImage(imageData);
  }    
} 
var drawing2 = document.getElementById('drawing2');
if(drawing2.getContext){
  var cxt2 = drawing2.getContext('2d');
  function setImage(imageData){   
    var data = imageData.data;
    var len = data.length;
    for(var i = 0; i < len; i++){
        if((i+1)%4==0){
            data[i] = 255;
        }else{
            data[i] = 255- data[i];
        }    
    }
    imageData.data = data;
    cxt2.putImageData(imageData,0,0);
  }
}
</script>
```
<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/js/canvas/advance/a16.html" frameborder="0" width="230" height="240"></iframe>

&emsp;&emsp;

&nbsp;

### 模式

&emsp;&emsp;模式其实就是重复的图像，可以用来填充或描边图形

【createPattern()】

&emsp;&emsp;调用createPattern()方法创建模式，该方法接收两个参数：一个`<img>`或`<canvas>`或`<video>`元素和一个表示如何重复的字符串。其中，第二个参数的值与CSS的background-repeat的属性值相同，包括repeat\repeat-x\repeat-y\no-repeat

&emsp;&emsp;注意:模式与渐变一样，都是从画布的原点(0,0)开始的，将填充样式fillStyle设置为模式对象，只表示在某个特定的区域内显示重复的图像，而不是要从某个位置开始绘制重复的图像

```
var img = document.images[0];
img.onload = function(){
    if(drawing.getContext){
        var context = drawing.getContext('2d');
        var pattern = context.createPattern(img,'repeat');
        context.fillStyle = pattern;
        context.fillRect(0,0,500,500);
    }
}
```

<iframe style="width: 100%; height: 310px;" src="https://demo.xiaohuochai.site/js/canvas/advance/a17.html" frameborder="0" width="230" height="240"></iframe>
 

&nbsp;

### 非零环绕

&emsp;&emsp;在一个区域里取一个点，并向外引一条射线。这条射线会与组成这个区域的线条相交。而区域的线条都是有方向的，假设射线与一个方向的线条相交为+1，与另一个方向相交为-1。如果射线与所有方向的相交的结果的和为非0，则射线的起始点处于多边形的里面；如果为0，则处于多边形的外面

![](https://pic.xiaohuochai.site/blog/canvas_advance2.png)

&emsp;&emsp;一般地，很少会绘制上图中无规律的图形。但是，在绘制空心图形，如圆环等，非零环绕原则也是适用的

![](https://pic.xiaohuochai.site/blog/canvas_advance3.png)

```
<canvas id="canvas" height="80" width="80">当前浏览器不支持canvas，请更换浏览器后再试</canvas>
<script>
var canvas = document.getElementById('canvas');
var H = 80,W=80;
if(canvas.getContext){
  var cxt = canvas.getContext('2d');  
  cxt.beginPath();
  cxt.arc(40,40,30,0,Math.PI*2,false);
  cxt.arc(40,40,15,0,Math.PI*2,true);
  cxt.fillStyle = '#058';
  cxt.shadowColor = 'gray';
  cxt.shadowOffsetX = 3;
  cxt.shadowOffsetY = 3;
  cxt.shadowBlur = 3;
  cxt.fill();    
}
</script>  
```
<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/canvas/advance/a18.html" frameborder="0" width="230" height="240"></iframe>

&emsp;&emsp;接下来，利用非零环绕原则和阴影来绘制一个镂空的剪纸效果

```
<canvas id="drawing" style="border:1px solid black">
    <p>The canvas element is not supported!</p>
</canvas>
<script>
var canvas = document.getElementById('drawing');
if(drawing.getContext){
    var cxt = drawing.getContext('2d');
    cxt.fillStyle = "#FFF";
    cxt.fillRect(0,0,300,150);
    cxt.beginPath();
    cxt.rect(0,0,300,150);
    drawPathRect(cxt, 10, 10, 200, 80);
    drawPathTriangle(cxt, 10, 140,30, 100,  50, 140);
    cxt.arc(150, 120, 20, 0, Math.PI * 2, true);
    cxt.closePath();
    cxt.fillStyle = "#058";
    cxt.shadowColor = "gray";
    cxt.shadowOffsetX = 10;
    cxt.shadowOffsetY = 10;
    cxt.shadowBlur = 10;
    cxt.fill();
    //逆时针绘制矩形
    function drawPathRect(cxt, x, y, w, h){
        cxt.moveTo(x, y);
        cxt.lineTo(x, y + h);
        cxt.lineTo(x + w, y + h);
        cxt.lineTo(x + w, y);
        cxt.lineTo(x, y);
    }
    //逆时针绘制三角形
    function drawPathTriangle(cxt, x1, y1, x2, y2, x3, y3){
        cxt.moveTo(x1,y1);
        cxt.lineTo(x3,y3);
        cxt.lineTo(x2,y2);
        cxt.lineTo(x1,y1);
    }
} 
</script>  
```


<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/js/canvas/advance/a19.html" frameborder="0" width="230" height="240"></iframe>

&nbsp;

### 交互

&emsp;&emsp;canvas有一个交互性很强的API——isPointInPath()，isPointInPath(x,y)方法用来检测指定点是在路径内还是在路径外。如果在当前路径中，则返回true，否则返回false

&emsp;&emsp;下面是一个canvas交互的实例，点击蓝色的小圆，可变成红色

```
<canvas id="drawing" style="border:1px solid black">
    <p>The canvas element is not supported!</p>
</canvas>
<script>
var drawing = document.getElementById('drawing');
if(drawing.getContext){
    var cxt = drawing.getContext('2d');
    var H=150,W=300;
    var balls = [];
    var NUM = 5;
    for(var i = 0; i < NUM; i++){
        var tempBall = {
            x:Math.floor(Math.random()*W),
            y:Math.floor(Math.random()*H),
            r:Math.floor(Math.random()*40+20)
        }
        balls[i] = tempBall;
        draw();
        drawing.addEventListener('click',fnDetect);
    }
    function draw(){
        for(var i = 0; i < balls.length; i++){
            cxt.beginPath();
            cxt.arc(balls[i].x,balls[i].y,balls[i].r,0,Math.PI*2);
            cxt.fillStyle = '#058';
            cxt.fill();
        }
    }
    function fnDetect(e){
        e = e || event;
        var x = e.clientX - drawing.getBoundingClientRect().left;
        var y = e.clientY - drawing.getBoundingClientRect().top;
        for(var i = 0; i < balls.length; i++){
            cxt.beginPath();
            cxt.arc(balls[i].x,balls[i].y,balls[i].r,0,Math.PI*2);
            if(cxt.isPointInPath(x,y)){
                cxt.fillStyle = 'red';
                cxt.fill();
            }
        }
    }
} 
</script>
```

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/js/canvas/advance/a20.html" frameborder="0" width="230" height="240"></iframe>