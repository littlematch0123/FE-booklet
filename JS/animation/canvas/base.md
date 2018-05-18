# canvas基础语法

&emsp;&emsp;canvas顾名思义是定义在浏览器中的画布。它不仅是一个普通的元素，更是一个强大的编程工具。它的出现已然超过了web基于文档的设计初衷，将网页这一形态的应用推向了另一个高度。利用canvas，可以开发出复杂的动画、动态图表、游戏等。关于canvas，有这样一句话——canvas就像是一场文艺复兴，将编程工作者彻底释放出创造力。本文将详细介绍canvas基础知识

 

&nbsp;

### 添加canvas

&emsp;&emsp;在HTML中添加Canvas非常简单，只需要在HTML的`<body>`部分，添加上`<canvas>`标签就可以了
```
<canvas>
    <p>The canvas element is not supported!</p>
</canvas>
```
&emsp;&emsp;现在，页面是一个完完全全的空白页面。Canvas的本意是画布，画布在HTML5中是透明的，是不可见的

【HTML属性】

&emsp;&emsp;在网页上使用canvas元素时，它会创建一块矩形区域。默认情况下，canvas的宽为300px，高为150px

![](https://pic.xiaohuochai.site/blog/canvas_base1.png)

&emsp;&emsp;canvas支持HTML属性高度height和宽度width，可以在开始和结束标签之间加入HTML来提供后备内容
```
height    高度
width     宽度
```
```
<canvas width="600" height="300">
    <p>The canvas element is not supported!</p>
</canvas>
```
![](https://pic.xiaohuochai.site/blog/canvas_base3.png)

&emsp;&emsp;注意:重置canvas的宽或高可以达到清空画布的效果

【CSS样式】

&emsp;&emsp;同大多数HTML元素一样，canvas元素也可以通过应用CSS的样式来增加边框，设置内外边距等。而且一些CSS属性还可以被canvas内的元素继承。比如字体样式，在canvas内添加的文字，默认同canvas元素本身是一样的。此外，在canvas中为绘图上下文设置属性同样要遵循CSS语法

![](https://pic.xiaohuochai.site/blog/canvas_base4.gif)

&emsp;&emsp;注意:通过CSS样式设置的宽高，是canvas元素的实际占据宽高；通过属性值设置的宽度，是canvas内部编程的设置宽高；如果没有通过CSS样式设置宽度，则canvas元素实际占据宽高等于内容编程设置宽度

&emsp;&emsp;如果按照如下进行设置，则canvas的最终宽高为`400*100`，相当于内部元素宽度缩小2.5倍，高度缩小2倍

```
  canvas.width = 1000;
  canvas.height = 200;
  canvas.style.width = '400px';  
  canvas.style.height = '100px'; 
```
&emsp;&emsp;如果按照如下进行设置，则canvas的最终宽高为`400*40`，相当于内部元素宽度和高度等比例缩小2.5倍

```
canvas.width = 1000;
canvas.height = 200;
canvas.style.width = '400px';  
```

&nbsp;

### 绘图上下文

&emsp;&emsp;要在canvas上绘图，需要以下三个步骤

&emsp;&emsp;1、布置画布：通过添加`<canvas>`标签，添加canvas元素

&emsp;&emsp;2、获取画布：通过`<canvas>`标签的id，获得canvas对象

&emsp;&emsp;3、取得绘图上下文：通过canvas对象的getContext("2d")方法，获得2D环境；如果要获取三维上下文，使用"webgl"

&emsp;&emsp;上面的三个步骤对应如下代码

```
<canvas id="canvas"></canvas>
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d")
```

【canvas坐标】

&emsp;&emsp;使用2D上下文提供的方法可以绘制简单的2D图形，比如矩形、弧线和路径。2D上下文坐标开始于canvas元素的左上角，原点坐标是(0,0)。所有坐标值都基于这个原点计算，x值越大表示越靠右，y值越大表示越靠下。默认情况下，width和height表示水平和垂直两个方向上可用的像素数目


![](https://pic.xiaohuochai.site/blog/canvas_base2.jpg)


&nbsp;

### 填充和描边

&emsp;&emsp;2D上下文的两种基本绘图操作是填充和描边

&emsp;&emsp;填充是指用指定的样式(颜色、渐变和图像)填充图形；描边是只在图形的边缘画线

&emsp;&emsp;大多数2D上下文操作都会细分为填充和描边两个操作，而操作的结果取决于两个属性:fillStyle和strokeStyle。这两个属性的值可以是字符串表示的颜色、渐变对象或模式对象，它们的默认值都是#000
```
var context = drawing.getContext('2d');
context.strokeStyle="red";
context.fillStyle="#00f";
```
&emsp;&emsp;关于渐变和模式对象，稍后介绍

 

&nbsp;

### 绘制矩形

&emsp;&emsp;下面先从最简单的矩形绘制开始说起，矩形是唯一一种可以直接在2D上下文中绘制的形状，与矩形相关的方法包括fillRect()、strokeRect()、clearRect()。这三个方法都能接收4个参数：矩形的x坐标、矩形的y坐标、矩形宽度和矩形高度。这些参数的单位都是像素
```
fillRect(x,y,w,h):画布上绘制的矩形会填充通过fillStyle属性指定的颜色
strokeRect(x,y,w,h):画布上绘制的矩形会使用通过strokeStyle属性指定描边颜色    
clearRect(x,y,w,h):用于清除画布上的矩形区域。本质上这个方法可以把绘制上下文中的某一矩形区域变透明。通过绘制形状然后再清除指定区域，就可以生成有意思的效果
```
&emsp;&emsp;下面来绘制一个背景颜色为红色，尺寸为100*100，位置为(0,0)点的矩形

```
<canvas id="drawing" style="border:1px solid black">
    <p>The canvas element is not supported!</p>
</canvas>
<script>
var drawing = document.getElementById('drawing');
//确定浏览器支持<canvas>元素
if(drawing.getContext){
    var context = drawing.getContext('2d');
    context.fillRect(0,0,100,100);
    context.fillStyle = 'red';
} 
</script>
```
&emsp;&emsp;结果如下，背景颜色为黑色。这是因为，使用fillRect()方法时，会使用当前的fillStyle值。由于当前还没有设置，所以会使用默认的黑色值

![](https://pic.xiaohuochai.site/blog/canvas_base5.png)

&emsp;&emsp;进行如下修改后，结果符合预期

```
<script>
var drawing = document.getElementById('drawing');
if(drawing.getContext){
    var context = drawing.getContext('2d');
&emsp;&emsp; context.fillStyle = 'red';
&emsp;&emsp; context.fillRect(0,0,100,100);
}
</script>
```
![](https://pic.xiaohuochai.site/blog/canvas_base6.png)

&emsp;&emsp;下面来绘制一个半透明的蓝色描边矩形，尺寸为100*100，位置在(0,0)点

```
<script>
var drawing = document.getElementById('drawing');
if(drawing.getContext){
    var context = drawing.getContext('2d');
&emsp;&emsp; context.strokeStyle = 'rgba(0,0,255,0.5)';
&emsp;&emsp; context.strokeRect(0,0,100,100);
}
</script>
```
![](https://pic.xiaohuochai.site/blog/canvas_base7.png)

&emsp;&emsp;接下来，在(0,0)点绘制尺寸为`100*100`背景为半透明红色的矩形， 1s后在(50,50)点绘制尺寸为`100*100`，描边为半透明蓝色的矩形，1s后使用clearRect()清除矩形

```
<canvas id="drawing" style="border:1px solid black">
    <p>The canvas element is not supported!</p>
</canvas>
<script>
var drawing = document.getElementById('drawing');
if(drawing.getContext){
    var context = drawing.getContext('2d');
    context.fillStyle = 'rgba(255,0,0,0.5)';
    context.fillRect(0,0,100,100);
    setTimeout(function(){
      context.strokeStyle = 'rgba(0,0,255,0.5)';
      context.strokeRect(50,50,100,100);  
    },1000);
    setTimeout(function(){
      context.clearRect(0,0,300,150);
    },2000);    
} 
</script>
```
![](https://pic.xiaohuochai.site/blog/canvas_base8.gif)

&nbsp;

### 绘制文本

&emsp;&emsp;绘制文本主要有两个方法：fillText()和strokeText()，fillText()方法使用fillStyle属性绘制文本，strokeText()方法使用strokeStyle属性为文本描边

&emsp;&emsp;这两个方法都可以接收4个参数：要绘制的文本字符串、x坐标、y坐标和可选的最大像素宽度

&emsp;&emsp;若传入的字符串大于最大宽度时，则绘制的文本字符的高度正确，而宽度会收缩以适应最大宽度。而且这两个方法都以下列3个属性为基础：font、textAlign、textBaseline
```
font(与font集合样式写法相同)
textAlign(start\end\center)不建议使用left\right，默认为start
textBaseline(top\hanging\middle\alphabetic\ideographic\bottom)，默认为alphabetic
```

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/js/canvas/base/b1.html" frameborder="0" width="230" height="240"></iframe>

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/js/canvas/base/b2.html" frameborder="0" width="230" height="240"></iframe>

【measureText()】

&emsp;&emsp;由于绘制文本比较复杂，特别是需要把文本控制在某一区域的时候，因此提供了辅助确定文本大小的方法measureText()方法。该方法接收一个参数，即要绘制的文本，返回一个TextMetrics对象，该对象只有一个width属性。measureText()方法利用font、textAlign、textBaseline的当前值计算指定文本的大小

&emsp;&emsp;假设想在一个100px宽的矩形区域中绘制文本"小火柴"，下面代码从50px字体大小开始递减，最终会找到合适的字体大小

```
<script>
var drawing = document.getElementById('drawing');
if(drawing.getContext){
    var context = drawing.getContext('2d');
    var fontSize = 50;
    context.font= fontSize + 'px arial';
    while(context.measureText('小火柴').width > 100){
        fontSize--;
        context.font= fontSize + 'px arial';
    }
    context.fillText('小火柴',10,30);
    context.fillText('字体大小是' + fontSize + 'px' ,10,80);    
} 
</script>
```
![](https://pic.xiaohuochai.site/blog/canvas_base9.png)

 

&nbsp;

### 描边线条

&emsp;&emsp;关于描边线条有4个常用属性分别是lineWidth、lineCap、lineJoin和miterLimit
```
lineWidth：描边线条宽度(默认为1)
lineCap：描边线条末端形状是平头、圆头还是方头(butt、round、square)(默认为butt)
lineJoin：描边线条相交方式是圆交、斜交还是斜接(round、bevel、miter)(默认为miter)
miterLimit：描边线条的最大斜接长度
```
&emsp;&emsp;斜接长度是指两条交汇处内角和外角之间的距离，边角的角度越小，斜接长度就越大，为了避免斜接长度过长，可以使得miterLimit属性，如果斜接长度超过miterLimit的值，边角会以lineJoin的"bevel"类型来显示

&emsp;&emsp;注意:只有当lineJoin属性为"miter"时，miterLimit才有效


![](https://pic.xiaohuochai.site/blog/canvas_base10.jpg)

![](https://pic.xiaohuochai.site/blog/canvas_base10.jpg)


<iframe style="width: 100%; height: 480px;" src="https://demo.xiaohuochai.site/js/canvas/base/b3.html" frameborder="0" width="230" height="240"></iframe> 

&nbsp;

### 渐变

&emsp;&emsp;填充和描边除了可以取颜色值之外，还可以取渐变值，渐变由canvasGradient实例表示

【创建渐变】

&emsp;&emsp;渐变分为线性渐变和径向渐变

&emsp;&emsp;调用createLinearGradient()方法创建线性渐变，这个方法接收4个参数：起点的x坐标、y坐标，终点的x坐标、y坐标

&emsp;&emsp;调用createRadialGradient()方法创建径向渐变，这个方法接收6个参数，对应两个圆的圆心和半径。前三个参数指定起点圆的圆心(x和y)及半径。后三个参数指定终点圆的圆心(x和y)及半径。可以把径向渐变想象成一个长圆桶，而这6个参数定义的正是这个桶的两个圆形开口的位置

&emsp;&emsp;注意:如果想从某个形状的中心点开始创建一个向外扩散的径向渐变效果，要将两个圆定义为同心圆

【指定色标】

&emsp;&emsp;接下来使用addColorStop()方法来指定色标。这个方法接收两个参数：色标位置和CSS颜色值。色标位置是一个0(开始的颜色)到1(结束的颜色)之间的数字

&emsp;&emsp;最后将渐变对象实例赋值给fillStyle或strokeStyle，进而可以绘制图形

&emsp;&emsp;下面来创建一个垂直方向的从品红到浅蓝色的线性渐变

```
<canvas id="drawing" style="border:1px solid black">
    <p>The canvas element is not supported!</p>
</canvas>
<script>
var drawing = document.getElementById('drawing');
if(drawing.getContext){
    var context = drawing.getContext('2d');
    var linearGradient = context.createLinearGradient(0,0,0,100);    
    linearGradient.addColorStop(0,'pink');
    linearGradient.addColorStop(1,'lightblue');
    context.strokeStyle = linearGradient;
    context.fillStyle = linearGradient;
    context.fillRect(10,10,100,100);
    context.strokeRect(120,10,100,100);
    context.font="20px/50px 宋体";
    context.textAlign = 'end';
    context.textBaseline = 'top';
    context.strokeText("小火柴",290,10);    
} 
</script>
```
![](https://pic.xiaohuochai.site/blog/canvas_base12.png)

&emsp;&emsp;下面来创建一个从品红到浅蓝色的径性渐变

```
<canvas id="drawing" style="border:1px solid black">
    <p>The canvas element is not supported!</p>
</canvas>
<script>
var drawing = document.getElementById('drawing');
if(drawing.getContext){
    var context = drawing.getContext('2d');
    var radialGradient = context.createRadialGradient(50,50,0,50,50,50);    
    radialGradient.addColorStop(0,'pink');
    radialGradient.addColorStop(1,'lightblue');
    context.fillStyle = radialGradient;
    context.fillRect(0,0,100,100);    
} 
</script>
```

![](https://pic.xiaohuochai.site/blog/canvas_base13.png)

&nbsp;

### 绘制路径
&emsp;&emsp;绘制路径包括开始绘制、实际绘制和结束绘制三个步骤

【开始绘制】

&emsp;&emsp;要绘制路径，首先必须调用beginPath()方法，表示要开始绘制新路径

&emsp;&emsp;注意:beginPath()之后的strokeStyle或fillStyle用于当前路径

【实际绘制】

&emsp;&emsp;实际绘制路径时可以使用以下方法：

&emsp;&emsp;1、moveTo(x,y)：将绘图游标移动到(x,y)，不画线。如果其他方法需要使用上一点的坐标，一定要先使用moveTo(x,y)确定坐标
```
context.moveTo(100,100)
```
&emsp;&emsp;表示移动画笔至(100,100)这个点（单位是px）

&emsp;&emsp;2、lineTo(x,y)：从上一点开始绘制一条直线，到(x,y)为止
```
context.lineTo(600,600)
```
&emsp;&emsp;表示从上一笔的停止点绘制到(600,600)

&emsp;&emsp;3、arcTo(x1,y1,x2,y2,radius)：从上一点开始绘制一条弧线到(x2,y2)为止，并以给定半径radius穿过(x1,y1)
```
context.arcTo(30,80,100,100,60);
```
&emsp;&emsp;表示从上一点开始绘制一条弧线到(100,100)为止，该弧线穿过(30,80)，且半径为60

&emsp;&emsp;4、arc(x,y,radius,startAngle,endAngle,counterclockwise)：以(x,y)为圆心绘制一条弧线，弧线半径为radius，起始和结束角度(用弧度表示)分别为startAngle和endAngle。最后一个参数表示startAngle和endAngle是否按逆时针方向计算。默认值为false表示按顺时针方向计算

![](https://pic.xiaohuochai.site/blog/canvas_base14.png)

```
context.arc(50,50,40,0,2*Math.PI,false);
```

&emsp;&emsp;表示以(50,50)为圆心绘制一条弧线，半径为40，起始和结束角度分别为0和2PI，按顺时针方向计算

&emsp;&emsp;5、bezierCurveTo(c1x,c1y,c2x,c2y,x,y)：从上一点开始绘制一条曲线，到(x,y)为止，并且以(c1x,c1y)和(c2x,c2y)为控制点
```
context.bezierCurveTo(0,50,100,50,100,0);
```
&emsp;&emsp;表示从上一点开始绘制一条曲线，到(100,0)为止，并且以(0,50)和(100,50)为控制点

&emsp;&emsp;6、quadraticCurveTo(cx,cy,x,y)：从上一点开始绘制一条二次曲线，到(x,y)为止，并且以(cx,cy)为控制点
```
context.quadraticCurveTo(50,50,0,100);
```
&emsp;&emsp;表示从上一点开始绘制一条二次曲线，到(0,100)为止，并且以(50,50)为控制点

&emsp;&emsp;7、rect(x,y,width,height)：从点(x,y)开始绘制一个矩形，宽度和高度分别由width和height指定。这个方法绘制的是矩形路径，而不是strokeRect()和fillRect()所绘制的独立的形状
```
context.rect(20,20,50,50);
```
&emsp;&emsp;表示从(20,20)开始绘制一个矩形，宽高分别是50和50

<iframe style="width: 100%; height: 440px;" src="https://demo.xiaohuochai.site/js/canvas/base/b4.html" frameborder="0" width="230" height="240"></iframe> 

【结束绘制】

&emsp;&emsp;创建路径后有以下4种选择

&emsp;&emsp;1、用fillStyle填充，调用fill()方法

&emsp;&emsp;2、用strokeStyle描边，调用stroke()方法

&emsp;&emsp;注意:如果fill()和stroke()同时使用，应该先使用fill()，后使用stroke()。否则，fill()会覆盖stroke()的部分线条宽度

&emsp;&emsp;3、在路径上创建一个剪切区域，调用clip()方法

&emsp;&emsp;注意:canvas中的clip()方法用于从原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切区域内(不能访问画布上的其他区域)。也可以在使用clip()方法前通过使用save()方法对当前画布区域进行保存，并在以后任意时间通过restore()方法对其进行恢复。可以使用clip()实现类似于探照灯效果

&emsp;&emsp;4、绘制一条连接到路径起点的线条，调用closePath()方法

&emsp;&emsp;在2D绘图上下文中，路径是一种主要的绘图方式，因为路径能为要绘制的图形提供更多控制。由于路径的使用很频繁，所以有一个isPointInPath()方法，接收x和y坐标作为参数，用于在路径被关闭之前确定画布上的某一点是否位于路径上
```
if(context.isPointInPath(100,100)){
    console.log('this point is in the path');
}
```