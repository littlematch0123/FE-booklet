# canvas粒子时钟

&emsp;&emsp;本文将使用canvas实现粒子时钟效果

 

&nbsp;

### 效果展示

<iframe style="width: 100%; height: 70px;" src="https://demo.xiaohuochai.site/js/canvas/digitClock/d1.html" frameborder="0" width="230" height="240"></iframe> 

&nbsp;

### 点阵数字

&emsp;&emsp;digit.js是一个三维数组，包含的是0到9以及冒号(digit[10])的二维点阵。每个数字的点阵表示是7*10大小的二维数组

&emsp;&emsp;通过遍历数字点阵的二维数组，当该位置的值为1时，则绘制一个粒子，否则不绘制

![](https://pic.xiaohuochai.site/blog/canvas_digit1.png)

&emsp;&emsp;将绘制数字的函数命名为renderDigit()。在该函数中，将粒子绘制为一个小圆。小圆的半径为R，小圆所占据的矩形宽(高)为2(R+1)。由于数字点阵是`10*7`的二维数组，所以一个数字的宽度为14(R+1)，高度为20(R+1)

&emsp;&emsp;假设数字的高度为100px，则小圆的半径R=4

```
<div id="test">
    <button>1</button>
    <button>2</button>
    <button>3</button>
    <button>4</button>
    <button>5</button>
    <button>6</button>
    <button>7</button>
    <button>8</button>
    <button>9</button>
    <button>10</button>
</div>
<canvas id="canvas">当前浏览器不支持canvas，请更换浏览器后再试</canvas>
<script src="http://files.cnblogs.com/files/xiaohuochai/digit.js"></script>    
<script>
var canvas = document.getElementById('canvas');
if(canvas.getContext){
    var cxt = canvas.getContext('2d');
    function renderDigit(num){
        //重置画布宽度，达到清空画布的效果
        canvas.height = 100;
        var R = canvas.height/20-1;
        for(var i = 0; i < digit[num].length; i++){
            for(var j = 0; j < digit[num][i].length; j++){
                if(digit[num][i][j] == 1){
                    cxt.beginPath();
                    cxt.arc(j*2*(R+1)+(R+1),i*2*(R+1)+(R+1),R,0,2*Math.PI);
                    cxt.closePath();
                    cxt.fill();
                }
            }
        }        
    }
    var test = document.getElementById('test');
    test.onclick = function(e){
        e = e || event;
        var target = e.target || e.srcElement;
        if(!isNaN(target.innerHTML)){
            renderDigit(target.innerHTML);
        }
        
    }    
}
</script>
```
<iframe style="width: 100%; height: 150px;" src="https://demo.xiaohuochai.site/js/canvas/digitClock/d2.html" frameborder="0" width="230" height="240"></iframe> 

&nbsp;

### 时钟实现

&emsp;&emsp;在上一步的点阵数字的基础上，实现一个粒子时钟。将时钟实现的函数命名为digitTime()，时钟实现由获取时间数据和渲染时钟两部分组成

【时间数据】

&emsp;&emsp;最简单的时钟形式由两位的小时、两位的分钟和两位的秒钟组成，中间用冒号隔开。通过日期对象Date来获取当前时间，以及当前的小时、分钟和秒钟。但是，最终需要得到的是数字表示的时钟

&emsp;&emsp;比如12:02:36的时间数据的表示形式为data[1,2,10,0,2,10,3,6]

【渲染时钟】

&emsp;&emsp;获取到时间数据后，通过循环使用renderDigit()来渲染时钟中的每一个数字。此时，有一个需要改变的地方是arc()函数中的x坐标，否则它们将叠加在一起

&emsp;&emsp;为了将时钟数字表示更加清晰在每个数字之间增加一定的间距。每个数字的宽度是14(R+1)，假设data数组中7个数字的索引为index，则每个数字的起始X坐标可以等于14(R+2)*index

&emsp;&emsp;最后通过定时器每间隔一段时间后更新时间

```
<canvas id="canvas" style="width:400px;">当前浏览器不支持canvas，请更换浏览器后再试</canvas>
<script src="http://files.cnblogs.com/files/xiaohuochai/digit.js"></script>    
<script>
var canvas = document.getElementById('canvas');
if(canvas.getContext){
    var cxt = canvas.getContext('2d');
    canvas.height = 100;
    canvas.width = 700;
    function renderDigit(index,num){
        var R = canvas.height/20-1;
        for(var i = 0; i < digit[num].length; i++){
            for(var j = 0; j < digit[num][i].length; j++){
                if(digit[num][i][j] == 1){
                    cxt.beginPath();
                    cxt.arc(14*(R+2)*index + j*2*(R+1)+(R+1),i*2*(R+1)+(R+1),R,0,2*Math.PI);
                    cxt.closePath();
                    cxt.fill();
                }
            }
        }        
    }
    function digitTime(){
        /*获取时间数据*/
        var temp = /(\d)(\d):(\d)(\d):(\d)(\d)/.exec(new Date());
        //存储时间数字，由十位小时、个位小时、冒号、十位分钟、个位分钟、冒号、十位秒钟、个位秒钟这7个数字组成
        var data = [];
        data.push(temp[1],temp[2],10,temp[3],temp[4],10,temp[5],temp[6]);
        /*渲染时钟*/
        //重置画布宽度，达到清空画布的效果
        canvas.height = 100;
        for(var i = 0; i < data.length; i++){
            renderDigit(i,data[i]);
        }
    }
    digitTime();
    clearInterval(oTimer);
    var oTimer = setInterval(function(){
        digitTime();
    },500);    
}
</script>
```
<iframe style="width: 100%; height: 70px;" src="https://demo.xiaohuochai.site/js/canvas/digitClock/d3.html" frameborder="0" width="230" height="240"></iframe> 

&nbsp;

### 随机抛物线

&emsp;&emsp;这节的随机抛物线运动是下节粒子动画的预备节。以DOM节点的投掷碰壁为基础，利用canvas实现一个小球的随机抛物线运动

&emsp;&emsp;将小球的运动拆分为x轴和y轴运动。x轴做匀速运动，y轴先做向上的减速运动，再做向下的加速运动。当小球离开画布区域时，停止定时器

```
<button id="btn">按钮</button>
<canvas id="canvas" style="border:1px solid black">当前浏览器不支持canvas，请更换浏览器后再试</canvas>
<script>
var canvas = document.getElementById('canvas');
if(canvas.getContext){
    var cxt = canvas.getContext('2d');
    //声明canvas的宽高
    var H = 100,W = 200;
    canvas.height = H;
    canvas.width = W;    
    var R = canvas.height/20-1;
    var numArray = [1,2,3,4];
    var colorArray =  ["#3BE","#09C","#A6C","#93C","#9C0","#690","#FB3","#F80","#F44","#C00"];
    btn.onclick = function(){
        //声明x、y轴坐标
        var x=Math.floor(Math.random() * 60 + 10);
        var y=Math.floor(Math.random() * 60 + 10);
        //声明x、y轴的步长值
        var stepY = -3*numArray[Math.floor(Math.random()*numArray.length)];
        var stepX = Math.floor(Math.random() * 10 -5);
        //声明y轴变化值
        var disY = numArray[Math.floor(Math.random()*numArray.length)];
        var color =colorArray[Math.floor(Math.random()*colorArray.length)];
        clearInterval(oTimer);
        var oTimer = setInterval(function(){
            stepY += disY;
            x += stepX;
            y += stepY;
            canvas.height = 100;
            cxt.beginPath();
            cxt.arc(x,y,R,0,2*Math.PI);
            cxt.fillStyle = color;
            cxt.closePath();
            cxt.fill();    
            if(x > W + R || y > H + R){
                clearInterval(oTimer);
            }    
        },50);
    }    
}
</script>
```
<iframe style="width: 100%; height: 150px;" src="https://demo.xiaohuochai.site/js/canvas/digitClock/d4.html" frameborder="0" width="230" height="240"></iframe> 

&nbsp;

### 粒子动画

&emsp;&emsp;下面来实现粒子动画。在时间数字变化的瞬间，由众多的粒子组成的新数字上重复生成相同的粒子，并且新生成的粒子做随机的抛物线运动

&emsp;&emsp;所以，第一步是先要判断是哪个或哪些数字在时间更新时发生了变化。然后，通过这些变化信息，生成要运动的小球。在定时器的运行间隔内，对运动小球的状态进行更新。最后，对时钟和运行的小球进行统一渲染

```
<canvas id="canvas" style="width:500px;">当前浏览器不支持canvas，请更换浏览器后再试</canvas>
<script src="http://files.cnblogs.com/files/xiaohuochai/digit.js"></script>    
<script>
var canvas = document.getElementById('canvas');
if(canvas.getContext){
    var cxt = canvas.getContext('2d');
    //声明canvas的宽高
    var H = 100,W = 700;
    canvas.height = H;
    canvas.width = W;
    //存储时间数据
    var data = [];
    //存储运动的小球
    var balls = [];
    //设置粒子半径
    var R = canvas.height/20-1;
    (function(){
        var temp = /(\d)(\d):(\d)(\d):(\d)(\d)/.exec(new Date());
        //存储时间数字，由十位小时、个位小时、冒号、十位分钟、个位分钟、冒号、十位秒钟、个位秒钟这7个数字组成
        data.push(temp[1],temp[2],10,temp[3],temp[4],10,temp[5],temp[6]);    
    })();

    /*生成点阵数字*/
    function renderDigit(index,num){
        for(var i = 0; i < digit[num].length; i++){
            for(var j = 0; j < digit[num][i].length; j++){
                if(digit[num][i][j] == 1){
                    cxt.beginPath();
                    cxt.arc(14*(R+2)*index + j*2*(R+1)+(R+1),i*2*(R+1)+(R+1),R,0,2*Math.PI);
                    cxt.closePath();
                    cxt.fill();
                }
            }
        }        
    }

    /*更新时钟*/
    function updateDigitTime(){
        var changeNumArray = [];
        var temp = /(\d)(\d):(\d)(\d):(\d)(\d)/.exec(new Date());
        var NewData = [];
        NewData.push(temp[1],temp[2],10,temp[3],temp[4],10,temp[5],temp[6]);
        for(var i = data.length-1; i >=0 ; i--){
            //时间发生变化 
            if(NewData[i] !== data[i]){
                //将变化的数字值和在data数组中的索引存储在changeNumArray数组中
                changeNumArray.push(i+'_'+(Number(data[i])+1)%10);
            }
        }
        //增加小球
        for(var i = 0; i< changeNumArray.length; i++){
            addBalls.apply(this,changeNumArray[i].split('_'));
        }    
        data = NewData.concat();
    }

    /*更新小球状态*/
    function updateBalls(){
        for(var i = 0; i < balls.length; i++){
            balls[i].stepY += balls[i].disY;
            balls[i].x += balls[i].stepX;
            balls[i].y += balls[i].stepY;    
            if(balls[i].x > W + R || balls[i].y > H + R){
                balls.splice(i,1);
                i--;
            }                
        }
    }

    /*增加要运动的小球*/
    function addBalls(index,num){
        var numArray = [1,2,3];
        var colorArray =  ["#3BE","#09C","#A6C","#93C","#9C0","#690","#FB3","#F80","#F44","#C00"];
        for(var i = 0; i < digit[num].length; i++){
            for(var j = 0; j < digit[num][i].length; j++){
                if(digit[num][i][j] == 1){
                    var ball = {
                        x:14*(R+2)*index + j*2*(R+1)+(R+1),
                        y:i*2*(R+1)+(R+1),
                        stepX:Math.floor(Math.random() * 4 -2),
                        stepY:-2*numArray[Math.floor(Math.random()*numArray.length)],
                        color:colorArray[Math.floor(Math.random()*colorArray.length)],
                        disY:1
                    };
                    balls.push(ball);            
                }
            }
        }    
    }

    /*渲染*/
    function render(){
        //重置画布宽度，达到清空画布的效果
        canvas.height = 100;
        //渲染时钟
        for(var i = 0; i < data.length; i++){
            renderDigit(i,data[i]);
        }        
        //渲染小球
        for(var i = 0; i < balls.length; i++){
            cxt.beginPath();
            cxt.arc(balls[i].x,balls[i].y,R,0,2*Math.PI);
            cxt.fillStyle = balls[i].color;
            cxt.closePath();
            cxt.fill();                
        }
    }

    clearInterval(oTimer);
    var oTimer = setInterval(function(){
        //更新时钟
        updateDigitTime();
        //更新小球状态
        updateBalls();
        //渲染
        render();
    },50);    
}
</script>
```
