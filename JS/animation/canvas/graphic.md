# canvas图形绘制

&emsp;&emsp;前面分别介绍了canvas的基础用法和进阶用法，本文将使用canvas的各种语法进行图形绘制

 

&nbsp;

### 绘制线条
【绘制线条】

&emsp;&emsp;下面来尝试绘制一段线条

```
<canvas id="drawing" style="border:1px solid black">
    <p>The canvas element is not supported!</p>
</canvas>
<script>
var drawing = document.getElementById('drawing');
if(drawing.getContext){
    var context = drawing.getContext('2d');
    //开始绘制
    context.beginPath();
    //将光标移动到(10,10)位置
    context.moveTo(10,10);
    //从(10,10)点开始绘制一条直线，到(100,100)为止
    context.lineTo(100,100);
    //线条宽度为5
    context.lineWidth = 5;
    //线条颜色为浅绿
    context.strokeStyle = "lightgreen";
    //绘制线条
    context.stroke();    
} 
</script>
```

![](https://pic.xiaohuochai.site/blog/canvas_graphic1.png)

【绘制折线】

&emsp;&emsp;下面，更进一步，绘制多条折线

```
<canvas id="drawing" style="border:1px solid black">
    <p>The canvas element is not supported!</p>
</canvas>
<script>
var drawing = document.getElementById('drawing');
if(drawing.getContext){
    var context = drawing.getContext('2d');
    context.beginPath();
    context.moveTo(10,10);
    context.lineTo(50,50);
    context.lineTo(10,100);
    context.lineWidth = 5;
    context.strokeStyle = "lightgreen";
    context.stroke();

    context.beginPath();
    context.moveTo(60,10);
    context.lineTo(100,50);
    context.lineTo(60,100);
    context.lineWidth = 5;
    context.strokeStyle = "lightblue";
    context.stroke();

    context.beginPath();
    context.moveTo(110,10);
    context.lineTo(150,50);
    context.lineTo(110,100);
    context.lineWidth = 5;
    context.strokeStyle = "pink";
    context.stroke();
} 
</script>
```
<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/js/canvas/graphic/g1.html" frameborder="0" width="230" height="240"></iframe>

【绘制闭合图形】

 &emsp;&emsp;下面绘制四条线条，组合成一个闭合图形

```
<canvas id="drawing" style="border:1px solid black">
    <p>The canvas element is not supported!</p>
</canvas>
<script>
var drawing = document.getElementById('drawing');
if(drawing.getContext){
    var context = drawing.getContext('2d');
    context.beginPath();
    context.moveTo(10,10);
    context.lineTo(110,10);
    context.lineTo(110,110);
    context.lineTo(10,110);
    context.lineTo(10,10);
    context.lineWidth = 10;
    context.strokeStyle = "lightgreen";
    context.stroke();    
} 
</script>
```
&emsp;&emsp;结果如下所示，最后一笔闭合的时候有问题，导致左上角有一个缺口。这种情况是设置了lineWidth导致的。如果默认1笔触的话，是没有问题的。但是笔触越大，线条越宽

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/js/canvas/graphic/g2.html" frameborder="0" width="230" height="240"></iframe>

&emsp;&emsp;这时，需要使用clothPath()来闭合图形，而最后一笔可以不画出来

```
<script>
var drawing = document.getElementById('drawing');
if(drawing.getContext){
    var context = drawing.getContext('2d');
    context.beginPath();
    context.moveTo(10,10);
    context.lineTo(110,10);
    context.lineTo(110,110);
    context.lineTo(10,110);
    context.closePath();
    context.lineWidth = 10;
    context.strokeStyle = "lightgreen";
    context.stroke();    
} 
</script>
```

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/js/canvas/graphic/g3.html" frameborder="0" width="230" height="240"></iframe>

&emsp;&emsp;当然，如果只是画矩形，使用rect()或fillRect()方法更简单 

 

&nbsp;

### 绘制矩形

&emsp;&emsp;下面来绘制一个背景颜色为红色，尺寸为100*100，位置为(0,0)点的矩形

```
<canvas id="drawing" style="border:1px solid black">
    <p>The canvas element is not supported!</p>
</canvas>
<script>
var drawing = document.getElementById('drawing');
if(drawing.getContext){
    var context = drawing.getContext('2d');
&emsp;&emsp; context.fillStyle = 'red';
&emsp;&emsp; context.fillRect(0,0,100,100);
}
</script>
```
![](https://pic.xiaohuochai.site/blog/canvas_graphic2.png)

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
![](https://pic.xiaohuochai.site/blog/canvas_graphic3.png)

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

![](https://pic.xiaohuochai.site/blog/canvas_graphic4.gif)


&nbsp;

### 绘制弧形

【绘制圆】

```
<canvas id="canvas">
    <p>The canvas element is not supported!</p>
</canvas>
<script>
var canvas = document.getElementById('canvas');
if(canvas.getContext){
    canvas.width = 1000;
    canvas.height = 200;
    canvas.style.width = '400px';    
    var context = canvas.getContext('2d');
    context.lineWidth = 5;
    context.strokeStyle = '#058';
    for(var i = 0; i < 10; i++){
        context.beginPath();
        context.arc(50+i*100,60,40,0,2*Math.PI*(i+1)/10);
        context.closePath();
        context.stroke();
    }    
}
</script>    
```

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/canvas/graphic/g4.html" frameborder="0" width="230" height="240"></iframe>

【绘制圆角矩形】

&emsp;&emsp;圆角矩形的示意图如下所示

![](https://pic.xiaohuochai.site/blog/canvas_graphic5.png)

```
<canvas id="canvas" style="border:1px solid black">
    <p>The canvas element is not supported!</p>
</canvas>
<script>
var canvas = document.getElementById('canvas');
if(canvas.getContext){
    var cxt = canvas.getContext('2d');
    var W = 300,H = 150;
    drawRoundRect(cxt,0,0,W,H,50); 
    cxt.lineWidth = 10;
    cxt.stroke();       
    function drawRoundRect(cxt, x, y, w, h, r){  
        cxt.beginPath();
        //左上角
        cxt.arc(x+r,y+r,r,Math.PI,Math.PI*3/2);
        //上侧
        cxt.lineTo(x+w-r,y);
        //右上角
        cxt.arc(x+w-r,y+r,r,Math.PI*3/2,Math.PI*2);
        //右侧
        cxt.lineTo(x+w,y+h-r);
        //右下角
        cxt.arc(x+w-r,y+h-r,r,0,Math.PI/2);
        //下侧
        cxt.lineTo(x+r,y+h);
        //左下角
        cxt.arc(x+r,y+h-r,r,Math.PI/2,Math.PI);
        cxt.closePath();
    }
}
</script>   
```
<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/js/canvas/graphic/g5.html" frameborder="0" width="230" height="240"></iframe>


【绘制弯月】

&emsp;&emsp;下面是一轮弯月的计算示意图

![](https://pic.xiaohuochai.site/blog/canvas_graphic6.png)

&emsp;&emsp;下面将上面的视图变成更通用的函数封装，代码如下

```
<canvas id="drawing" style="border:1px solid black">
    <p>The canvas element is not supported!</p>
</canvas>
<script>
if(drawing.getContext){
  var W = drawing.width = 200;
  var H = drawing.height = 200;
  var cxt = drawing.getContext('2d');
  function dis(x1,y1,x2,y2){
    return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
  }
  function fillMoon(cxt,d,x,y,r,rot){
    cxt.save();
    cxt.translate(x,y);
    cxt.rotate(rot*Math.PI/180);
    cxt.scale(r,r);
    cxt.beginPath();
    cxt.arc(0,0,1,0.5*Math.PI,1.5*Math.PI,true);
    cxt.moveTo(0,-1);
    cxt.arcTo(d,0,0,1,dis(0,-1,d,0)/d);
    cxt.closePath();
    cxt.restore();
  }
  fillMoon(cxt,2,100,100,100,0)
  cxt.fillStyle = '#fb5';
  cxt.fill();
}
</script>
```

<iframe style="width: 100%; height: 230px;" src="https://demo.xiaohuochai.site/js/canvas/graphic/g6.html" frameborder="0" width="230" height="240"></iframe>
 

&nbsp;

### 复杂图形

&emsp;&emsp;下面基于线条、矩形和弧形，来绘制复杂图形

【绘制魔性图案】

&emsp;&emsp;设置为正方形的魔性图案，当坐标位置x或y变化1px时，宽度或高度需要变化2px

&emsp;&emsp;于是，得到下面代码

```
<canvas id="canvas" width=300 height=300 style="border: 1px solid #aaaaaa;">
    <p>The canvas element is not supported!</p>
</canvas>
<script>
var canvas = document.getElementById("canvas");
if(canvas.getContext){
  var context = canvas.getContext("2d");  
  for(var i=0; i<=20; i++){
    drawRect(context, 0 + 15 * i, 0 + 15 * i, 300 - 30 * i, 300 - 30 * i);
  }
  function drawRect(cxt,x,y,width,height){
    cxt.beginPath();
    cxt.rect(x, y, width, height);
    cxt.lineWidth = 5;
    cxt.strokeStyle = "blue";
    cxt.stroke();    
  }
}
</script>
```
<iframe style="width: 100%; height: 330px;" src="https://demo.xiaohuochai.site/js/canvas/graphic/g7.html" frameborder="0" width="230" height="240"></iframe>

【绘制五角星】

&emsp;&emsp;五角星可分为大圆和小圆两部分。大圆控制外侧5个点的坐标位置，小圆控制内侧5个点的坐标位置。下面是详细的角度分析

![](https://pic.xiaohuochai.site/blog/canvas_graphic7.png) 


```
<canvas id="canvas">
    <p>The canvas element is not supported!</p>
</canvas>
<script>
var canvas = document.getElementById('canvas');
if(canvas.getContext){
    var cxt = canvas.getContext('2d');
    var H = 100,W = 200;
    canvas.height = H;
    canvas.width = W;    
    function drawStar(cxt,r,R,x,y,rotate){
        if(rotate == undefined){
            rotate = 0;
        }
        cxt.beginPath();
        for(var i = 0; i < 5; i++){
            cxt.lineTo(Math.cos((18 + i*72 - rotate)/180*Math.PI)*R + x,-Math.sin((18+i*72 - rotate)/180 * Math.PI) * R + y);
            cxt.lineTo(Math.cos((54 + i*72 - rotate)/180*Math.PI)*r + x,-Math.sin((54+i*72 - rotate)/180 * Math.PI) * r + y);
        }
        cxt.closePath();
        cxt.stroke();
    }  
    drawStar(cxt,30,50,50,50);    
}
</script>    
```

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/js/canvas/graphic/g8.html" frameborder="0" width="230" height="240"></iframe>

【绘制螺旋线】

&emsp;&emsp;下面是制作螺旋线的示意图

![](https://pic.xiaohuochai.site/blog/canvas_graphic8.jpg)

&emsp;&emsp;从圆心点开始，按照圆的公式向外移动，每次移动时，圆心角逐渐增大，半径逐渐增大

```
<canvas id="drawing" width="100" height="100"></canvas>
<script>
var drawing = document.getElementById('drawing');
if(drawing.getContext){
    var context = drawing.getContext('2d');
    var x = drawing.width/2;
    var y = drawing.height/2;
    var deg = 0;
    var r = 1;
    context.strokeStyle = 'red';
    context.lineWidth = 2;
    context.moveTo(x,y);
    for(var i = 0; i < 4800; i++){
        deg++;
        r+=0.01;
        context.lineTo(x+Math.cos(deg * Math.PI/180)*r,y+Math.sin(deg * Math.PI/180)*r);
    }
    context.stroke();
}
</script>
```

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/js/canvas/graphic/g9.html" frameborder="0" width="230" height="240"></iframe>