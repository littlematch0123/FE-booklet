# canvas动态小球重叠效果

&emsp;&emsp;在javascript运动系列中，详细介绍了各种运动，其中就包括碰壁运动。但是，如果用canvas去实现，却是另一种思路。本文将详细介绍canvas动态小球重叠效果

 

&nbsp;

### 效果展示

<iframe style="width: 100%; height: 330px;" src="https://demo.xiaohuochai.site/js/canvas/ball/b1.html" frameborder="0" width="230" height="240"></iframe> 

&nbsp;

### 静态小球

&emsp;&emsp;首先，生成随机半径、随机位置的10个静态小球

```
<button id="btn">按钮</button>
<canvas id="canvas" width="500" height="300" style="border:1px solid black">当前浏览器不支持canvas，请更换浏览器后再试</canvas>
<script>
var canvas = document.getElementById('canvas');
var H=300,W=500;
btn.onclick = function(){
    getBalls();
}
getBalls();
function getBalls(){
    canvas.height = H;
    if(canvas.getContext){
        var cxt = canvas.getContext('2d');
        for(var i = 0; i < 50; i++){
            var tempR = Math.floor(Math.random()*255);
            var tempG = Math.floor(Math.random()*255);
            var tempB = Math.floor(Math.random()*255);
            cxt.fillStyle = 'rgb(' + tempR + ',' + tempG + ',' + tempB + ')';
            var tempW = Math.floor(Math.random()*W);
            var tempH = Math.floor(Math.random()*H);
            var tempR = Math.floor(Math.random()*50);
            cxt.beginPath();
            cxt.arc(tempW,tempH,tempR,0,Math.PI*2);
            cxt.fill();
        }
    }    
}
</script>    
```
<iframe style="width: 100%; height: 330px;" src="https://demo.xiaohuochai.site/js/canvas/ball/b2.html" frameborder="0" width="230" height="240"></iframe> 


&nbsp;

### 随机运动

&emsp;&emsp;接着，这10个小球做随机运动，需要配合定时器更新小球的运动状态。这时，需要对上面代码进行改写

```
<button id="btn">更新</button>
<canvas id="canvas" width="500" height="300" style="border:1px solid black">当前浏览器不支持canvas，请更换浏览器后再试</canvas>
<script>
btn.onclick = function(){history.go();}
var canvas = document.getElementById('canvas');
//存储画布宽高
var H=300,W=500;
//存储小球个数
var NUM = 50;
//存储小球
var balls = [];
function getBalls(){
    if(canvas.getContext){
        var cxt = canvas.getContext('2d');
        for(var i = 0; i < NUM; i++){
            var tempR = Math.floor(Math.random()*255);
            var tempG = Math.floor(Math.random()*255);
            var tempB = Math.floor(Math.random()*255);
            var tempColor = 'rgb(' + tempR + ',' + tempG + ',' + tempB + ')';
            var tempX = Math.floor(Math.random()*W);
            var tempY = Math.floor(Math.random()*H);
            var tempR = Math.floor(Math.random()*30+20);
            var tempBall = {
                x:tempX,
                y:tempY,
                r:tempR,
                stepX:Math.floor(Math.random() * 4 -2),
                stepY:Math.floor(Math.random() * 4 -2),
                color:tempColor,
                disX:Math.floor(Math.random() * 3 -1),
                disY:Math.floor(Math.random() * 3 -1)
            };
            balls.push(tempBall);
        }
    }    
}
function updateBalls(){
    for(var i = 0; i < balls.length; i++){
        balls[i].stepY += balls[i].disY;
        balls[i].stepX += balls[i].disX;
        balls[i].x += balls[i].stepX;
        balls[i].y += balls[i].stepY;                 
    }
}

function renderBalls(){
    //重置画布高度，达到清空画布的效果
    canvas.height = H;    
    if(canvas.getContext){
        var cxt = canvas.getContext('2d');
        for(var i = 0; i < balls.length; i++){
            cxt.beginPath();
            cxt.arc(balls[i].x,balls[i].y,balls[i].r,0,2*Math.PI);
            cxt.fillStyle = balls[i].color;
            cxt.closePath();
            cxt.fill();   
        }        
    }

}
getBalls();
clearInterval(oTimer);
var oTimer = setInterval(function(){
    //更新小球运动状态
    updateBalls();
    //渲染小球
    renderBalls();
},50);
</script>
```
<iframe style="width: 100%; height: 330px;" src="https://demo.xiaohuochai.site/js/canvas/ball/b3.html" frameborder="0" width="230" height="240"></iframe>

&nbsp;

### 碰壁检测

&emsp;&emsp;下面，增加小球的碰壁检测功能，当小球碰壁时，变为相反方向

```
function bumpTest(ele){
    //左侧
    if(ele.x <= ele.r){
        ele.x = ele.r;
        ele.stepX = -ele.stepX;
    }
    //右侧
    if(ele.x >= W - ele.r){
        ele.x = W - ele.r;
        ele.stepX = -ele.stepX;
    }
    //上侧
    if(ele.y <= ele.r){
        ele.y = ele.r;
        ele.stepY = -ele.stepY;
    }
    //下侧
    if(ele.y >= H - ele.r){
        ele.y = H - ele.r;
        ele.stepY = -ele.stepY;
    }
}
```
```
<button id="btn">更新</button>
<canvas id="canvas" width="500" height="300" style="border:1px solid black">当前浏览器不支持canvas，请更换浏览器后再试</canvas>
<script>
btn.onclick = function(){history.go();}
var canvas = document.getElementById('canvas');
//存储画布宽高
var H=300,W=500;
//存储小球个数
var NUM = 30;
//存储小球
var balls = [];
function getBalls(){
    if(canvas.getContext){
        var cxt = canvas.getContext('2d');
        for(var i = 0; i < NUM; i++){
            var tempR = Math.floor(Math.random()*255);
            var tempG = Math.floor(Math.random()*255);
            var tempB = Math.floor(Math.random()*255);
            var tempColor = 'rgb(' + tempR + ',' + tempG + ',' + tempB + ')';
            var tempR = Math.floor(Math.random()*30+20);
            var tempX = Math.floor(Math.random()*(W-tempR) + tempR);
            var tempY = Math.floor(Math.random()*(H-tempR) + tempR);
            
            var tempBall = {
                x:tempX,
                y:tempY,
                r:tempR,
                stepX:Math.floor(Math.random() * 13 -6),
                stepY:Math.floor(Math.random() * 13 -6),
                color:tempColor
            };
            balls.push(tempBall);
        }
    }    
}
function updateBalls(){
    for(var i = 0; i < balls.length; i++){
        balls[i].x += balls[i].stepX;
        balls[i].y += balls[i].stepY; 
        bumpTest(balls[i]);
    }
}
function bumpTest(ele){
    //左侧
    if(ele.x <= ele.r){
        ele.x = ele.r;
        ele.stepX = -ele.stepX;
    }
    //右侧
    if(ele.x >= W - ele.r){
        ele.x = W - ele.r;
        ele.stepX = -ele.stepX;
    }
    //上侧
    if(ele.y <= ele.r){
        ele.y = ele.r;
        ele.stepY = -ele.stepY;
    }
    //下侧
    if(ele.y >= H - ele.r){
        ele.y = H - ele.r;
        ele.stepY = -ele.stepY;
    }
}
function renderBalls(){
    //重置画布高度，达到清空画布的效果
    canvas.height = H;    
    if(canvas.getContext){
        var cxt = canvas.getContext('2d');
        for(var i = 0; i < balls.length; i++){
            cxt.beginPath();
            cxt.arc(balls[i].x,balls[i].y,balls[i].r,0,2*Math.PI);
            cxt.fillStyle = balls[i].color;
            cxt.closePath();
            cxt.fill();   
        }        
    }

}
getBalls();
clearInterval(oTimer);
var oTimer = setInterval(function(){
    //更新小球运动状态
    updateBalls();
    //渲染小球
    renderBalls();
},50);
</script>    
```
<iframe style="width: 100%; height: 330px;" src="https://demo.xiaohuochai.site/js/canvas/ball/b4.html" frameborder="0" width="230" height="240"></iframe>

&nbsp;

### 重叠效果

&emsp;&emsp;canvas的合成属性globalCompositeOperation表示后绘制的图形怎样与先绘制的图形结合，属性值是字符串，可能值如下：

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

<iframe style="width: 100%; height: 455px;" src="https://demo.xiaohuochai.site/js/canvas/advance/a12.html" frameborder="0" width="230" height="240"></iframe>

&emsp;&emsp;增加小球的重叠效果为'xor'，即为最终的效果展示 

```
<button id="btn">变换</button>
<canvas id="canvas" width="500" height="300" style="border:1px solid black">当前浏览器不支持canvas，请更换浏览器后再试</canvas>
<script>
btn.onclick = function(){history.go();}
var canvas = document.getElementById('canvas');
//存储画布宽高
var H=300,W=500;
//存储小球个数
var NUM = 30;
//存储小球
var balls = [];
function getBalls(){
    if(canvas.getContext){
        var cxt = canvas.getContext('2d');
        for(var i = 0; i < NUM; i++){
            var tempR = Math.floor(Math.random()*255);
            var tempG = Math.floor(Math.random()*255);
            var tempB = Math.floor(Math.random()*255);
            var tempColor = 'rgb(' + tempR + ',' + tempG + ',' + tempB + ')';
            var tempR = Math.floor(Math.random()*30+20);
            var tempX = Math.floor(Math.random()*(W-tempR) + tempR);
            var tempY = Math.floor(Math.random()*(H-tempR) + tempR);
            
            var tempBall = {
                x:tempX,
                y:tempY,
                r:tempR,
                stepX:Math.floor(Math.random() * 21 -10),
                stepY:Math.floor(Math.random() * 21 -10),
                color:tempColor
            };
            balls.push(tempBall);
        }
    }    
}
function updateBalls(){
    for(var i = 0; i < balls.length; i++){
        balls[i].x += balls[i].stepX;
        balls[i].y += balls[i].stepY; 
        bumpTest(balls[i]);
    }
}
function bumpTest(ele){
    //左侧
    if(ele.x <= ele.r){
        ele.x = ele.r;
        ele.stepX = -ele.stepX;
    }
    //右侧
    if(ele.x >= W - ele.r){
        ele.x = W - ele.r;
        ele.stepX = -ele.stepX;
    }
    //上侧
    if(ele.y <= ele.r){
        ele.y = ele.r;
        ele.stepY = -ele.stepY;
    }
    //下侧
    if(ele.y >= H - ele.r){
        ele.y = H - ele.r;
        ele.stepY = -ele.stepY;
    }
}
function renderBalls(){
    //重置画布高度，达到清空画布的效果
    canvas.height = H;    
    if(canvas.getContext){
        var cxt = canvas.getContext('2d');
        for(var i = 0; i < balls.length; i++){
            cxt.beginPath();
            cxt.arc(balls[i].x,balls[i].y,balls[i].r,0,2*Math.PI);
            cxt.fillStyle = balls[i].color;
            cxt.globalCompositeOperation = 'xor';
            cxt.closePath();
            cxt.fill();   
        }        
    }

}
getBalls();
clearInterval(oTimer);
var oTimer = setInterval(function(){
    //更新小球运动状态
    updateBalls();
    //渲染小球
    renderBalls();
},50);
</script>    
```
