# canvas自适应圆形时钟绘制

&emsp;&emsp;前面介绍过canvas粒子时钟的绘制，本文将详细介绍canvas自适应圆形时钟绘制


&nbsp;

### 效果演示

&emsp;&emsp;最终自适应圆形时钟的效果如下所示

<iframe style="width: 100%; height: 230px;" src="https://demo.xiaohuochai.site/js/canvas/clock/c1.html" frameborder="0" width="230" height="240"></iframe> 


 

&nbsp;

### 功能分析
&emsp;&emsp;下面来分析一下该圆形时钟的功能

&emsp;&emsp;【1】静态背景

&emsp;&emsp;对于时钟来说，背景是不变的，包括外层钟框、内层圆点及数字、以及中心点的固定按扣

&emsp;&emsp;【2】动态时钟

&emsp;&emsp;时态的动态，表现在秒针、分针、时针随着当前时间的变化的变化。开启一个每秒变化1次定时器，秒针与当前的时间的秒数保持一致，分针的变化与当前的秒数和分钟数都有关，时针的变化与当前的分钟数和小时数都有关

&emsp;&emsp;【3】自适应

&emsp;&emsp;要做到时钟自适应，需要将时钟内部的尺寸绘制与时钟整体的宽高相关联，而不能设置为固定值

&emsp;&emsp;下面是一张时钟的简易分析图

![](https://pic.xiaohuochai.site/blog/canvas_clock1.png)

 

&nbsp;

### 静态时钟

&emsp;&emsp;下面来实现静态的时钟背景，包括外层钟框、内层圆点及数字、以及中心点的固定按扣，以时钟尺寸为`200*200`为基准，则半径为100，通过`translate()`将圆心点调整为`(0,0)`点

【初始设置】

&emsp;&emsp;由于外面经常要用到R和cxt.lineWidth，所以将其保存为变量
```
var cxt = drawing.getContext('2d');
var W = drawing.width = 400;
var H = drawing.height = 400;
var R = W / 2;
var cw = cxt.lineWidth = 0.1*R;
```
【外层钟框】

&emsp;&emsp;为了将外层钟框不超出canvas区域，则其半径设置为R-cw/2，线条宽度与半径成比例
```
cxt.translate(R,R);
cxt.beginPath();
cxt.arc(0,0,R-cw/2,0,2*Math.PI,false);
cxt.stroke();  
```
【内层数字】

&emsp;&emsp;在距离圆心点0.8R-cw/2处，绘制12个数字，表示当前的分钟数，数字的字体大小与半径成比例

```
cxt.beginPath();   
cxt.font = 0.2 * R + 'px 宋体';
cxt.textAlign = 'center';
cxt.textBaseline = 'middle';  
var r1 = 0.8*R  - cw/2;   
for(var i = 12; i > 0; i--){
    var radius = 2*Math.PI/12 * i + 1.5*Math.PI;
    var x = Math.cos(radius) * r1;
    var y = Math.sin(radius) * r1;
    cxt.fillText(i,x,y);
}
```
【内层原点】

&emsp;&emsp;在距离圆心点0.9R-cw/2处，绘制60个圆点，表示当前的秒数，当前秒数与分钟数处于同一角度时，表示为大圆点(半径为cx/5)，否则为小圆点(半径为cx/8)

```
cxt.beginPath();
var r2 = 0.9*R - cw/2;
for(var i = 0; i < 60; i++){
    var radius = 2*Math.PI/60*i + 1.5*Math.PI;
    var x = Math.cos(radius) * r2;
    var y = Math.sin(radius) * r2;
    cxt.beginPath();
    if(i%5 === 0){
      cxt.arc(x,y,cw/5,0,2*Math.PI,false);
    }else{
      cxt.arc(x,y,cw/8,0,2*Math.PI,false);
    }
    cxt.fill();
}
```
【绘制中心点的固定按扣】
```
cxt.beginPath();
cxt.arc(0,0,cw/3,0,2*Math.PI,false);
cxt.fill();
```
&emsp;&emsp;最终，静态背景封装为函数drawStatics()，代码如下

```
<canvas id="drawing" style="border:1px solid black"></canvas>
<script>
var drawing = document.getElementById('drawing');
if(drawing.getContext){
    var cxt = drawing.getContext('2d');
    var W = drawing.width = 200;
    var H = drawing.height = 200;
    var R = W / 2;
    var cw = cxt.lineWidth = 0.1*R;
    function drawStatics(){
        cxt.translate(R,R);
        cxt.beginPath();
        cxt.lineWidth = 0.1*R;
        cxt.arc(0,0,R-cw/2,0,2*Math.PI,false);
        cxt.stroke(); 
                      
        cxt.beginPath();   
        cxt.font = 0.2 * R + 'px 宋体';
        cxt.textAlign = 'center';
        cxt.textBaseline = 'middle';  
        var r1 = 0.8*R  - cw/2;   
        for(var i = 12; i > 0; i--){
            var radius = 2*Math.PI/12 * i + 1.5*Math.PI;
            var x = Math.cos(radius) * r1;
            var y = Math.sin(radius) * r1;
            cxt.fillText(i,x,y);
        }

        cxt.beginPath();
        var r2 = 0.9*R - cw/2;
        for(var i = 0; i < 60; i++){
            var radius = 2*Math.PI/60*i + 1.5*Math.PI;
            var x = Math.cos(radius) * r2;
            var y = Math.sin(radius) * r2;
            cxt.beginPath();
            if(i%5 === 0){
              cxt.arc(x,y,cw/5,0,2*Math.PI,false);
            }else{
              cxt.arc(x,y,cw/8,0,2*Math.PI,false);
            }
            cxt.fill();
        }

        cxt.beginPath();
        cxt.arc(0,0,cw/3,0,2*Math.PI,false);
        cxt.fill();
    }
    function draw(){
      cxt.clearRect(0,0,W,H);
      drawStatics();
    }
    draw();
}
</script> 
```
&emsp;&emsp;静态效果如下


<iframe style="width: 100%; height: 230px;" src="https://demo.xiaohuochai.site/js/canvas/clock/c2.html" frameborder="0" width="230" height="240"></iframe> 
 

&nbsp;

### 动态效果

&emsp;&emsp;下面来分为时针、分针、秒针来进行动态效果

【秒针】

&emsp;&emsp;开启一个每秒变化1次定时器，秒针与当前的时间的秒数保持一致

```
function drawSecond(second){
    cxt.save();
    cxt.translate(R,R);
    cxt.beginPath();
    var radius = 2*Math.PI/60 * second;
    cxt.rotate(radius);
    cxt.lineWidth = 2;
    cxt.moveTo(0,cw*2);
    cxt.lineTo(0,-0.8*R);
    cxt.strokeStyle = 'red';
    cxt.stroke();
    cxt.restore();
}
```
【分针】

&emsp;&emsp;分针的变化与当前的秒数和分钟数都有关

```
function drawMinute(minute,second){
    cxt.save();
    cxt.translate(R,R);
    cxt.beginPath();
    var radius = 2*Math.PI/60 * minute;
    var sRaiuds = 2*Math.PI/60/60 * second;
    cxt.rotate(radius + sRaiuds);
    cxt.lineWidth = 4;
    cxt.lineCap = 'round';
    cxt.moveTo(0,cw);
    cxt.lineTo(0,-(0.8*R - cw/2));
    cxt.stroke();
    cxt.restore();
}
```
【时针】

&emsp;&emsp;时针的变化与当前的分钟数和小时数都有关

```
function drawHour(hour,minute){
    cxt.save();
    cxt.translate(R,R);
    cxt.beginPath();
    var radius = 2*Math.PI/12 * hour;
    var mRaiuds = 2*Math.PI/12/60 * minute;
    cxt.rotate(radius + mRaiuds);
    cxt.lineWidth = 6;
    cxt.lineCap = 'round';
    cxt.moveTo(0,cw/2);
    cxt.lineTo(0,-(0.8*R - cw*2));
    cxt.stroke();
    cxt.restore();
}    
```
 

&nbsp;

### 完整代码

&emsp;&emsp;现在，需要对代码进行调整，因为canvas是按照代码顺序进行绘制的，所以代码顺序应该是，静态背景(时钟外框、圆点及数字) -> 动态效果(秒针、分针、时针) -> 中心按扣

&emsp;&emsp;因此，需要将中心按扣的代码从静态背景函数drawStatics()中分离出来，并重新安排代码顺序

&emsp;&emsp;由于浏览器的定时器存在误差，因此设置为1000ms并不合适，由于系统卡顿等原因，可能会跳过某次效果，因此，设置为500ms

&emsp;&emsp;最终完整代码如下所示

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
<canvas id="drawing"></canvas>
<script>
var drawing = document.getElementById('drawing');
if(drawing.getContext){
    var cxt = drawing.getContext('2d');
    var W = drawing.width = 200;
    var H = drawing.height = 200;
    var R = W / 2;
    var cw = cxt.lineWidth = 0.1*R;
    function drawStatics(){
        cxt.save();
        cxt.translate(R,R);
        cxt.beginPath();
        cxt.lineWidth = 0.1*R;
        cxt.arc(0,0,R-cw/2,0,2*Math.PI,false);
        cxt.stroke(); 
                      
        cxt.beginPath();   
        cxt.font = 0.2 * R + 'px 宋体';
        cxt.textAlign = 'center';
        cxt.textBaseline = 'middle';  
        var r1 = 0.8*R  - cw/2;   
        for(var i = 12; i > 0; i--){
            var radius = 2*Math.PI/12 * i + 1.5*Math.PI;
            var x = Math.cos(radius) * r1;
            var y = Math.sin(radius) * r1;
            cxt.fillText(i,x,y);
        }

        cxt.beginPath();
        var r2 = 0.9*R - cw/2;
        for(var i = 0; i < 60; i++){
            var radius = 2*Math.PI/60*i + 1.5*Math.PI;
            var x = Math.cos(radius) * r2;
            var y = Math.sin(radius) * r2;
            cxt.beginPath();
            if(i%5 === 0){
              cxt.arc(x,y,cw/5,0,2*Math.PI,false);
            }else{
              cxt.arc(x,y,cw/8,0,2*Math.PI,false);
            }
            cxt.fill();
        }
        cxt.restore();
    }
    function drawDot(){
        cxt.save();
        cxt.translate(R,R);        
        cxt.beginPath();
        cxt.arc(0,0,cw/3,0,2*Math.PI,false);
        cxt.fillStyle = '#fff';
        cxt.fill();
        cxt.restore();
    }
    function drawSecond(second){
        cxt.save();
        cxt.translate(R,R);
        cxt.beginPath();
        var radius = 2*Math.PI/60 * second;
        cxt.rotate(radius);
        cxt.lineWidth = 2;
        cxt.moveTo(0,cw*2);
        cxt.lineTo(0,-0.8*R);
        cxt.strokeStyle = 'red';
        cxt.stroke();
        cxt.restore();
    }
    function drawMinute(minute,second){
        cxt.save();
        cxt.translate(R,R);
        cxt.beginPath();
        var radius = 2*Math.PI/60 * minute;
        var sRaiuds = 2*Math.PI/60/60 * second;
        cxt.rotate(radius + sRaiuds);
        cxt.lineWidth = 4;
        cxt.lineCap = 'round';
        cxt.moveTo(0,cw);
        cxt.lineTo(0,-(0.8*R - cw/2));
        cxt.stroke();
        cxt.restore();
    }
    function drawHour(hour,minute){
        cxt.save();
        cxt.translate(R,R);
        cxt.beginPath();
        var radius = 2*Math.PI/12 * hour;
        var mRaiuds = 2*Math.PI/12/60 * minute;
        cxt.rotate(radius + mRaiuds);
        cxt.lineWidth = 6;
        cxt.lineCap = 'round';
        cxt.moveTo(0,cw/2);
        cxt.lineTo(0,-(0.8*R - cw*2));
        cxt.stroke();
        cxt.restore();
    }    
    function draw(){
        cxt.clearRect(0,0,W,H);
        drawStatics();
        var now = new Date();
        drawHour(now.getHours(),now.getMinutes());
        drawMinute(now.getMinutes(),now.getSeconds());   
        drawSecond(now.getSeconds());
        drawDot();    
    }
    draw();
    setInterval(draw,500);
}
</script>  
</body>
</html>
```
 