# canvas探照灯效果

&emsp;&emsp;canvas中的clip()方法用于从原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内(不能访问画布上的其他区域)

&emsp;&emsp;也可以在使用clip()方法前通过使用save()方法对当前画布区域进行保存，并在以后的任意时间通过restore()方法对其进行恢复

&emsp;&emsp;接下来使用clip()方法实现一个探照灯效果

<iframe style="width: 100%; height: 260px;" src="https://demo.xiaohuochai.site/js/canvas/clip/c1.html" frameborder="0" width="230" height="240"></iframe> 


```
<button id="btn">变换</button>
<button id="con">暂停</button>
<canvas id="canvas" width="400" height="290" style="border:1px solid black">当前浏览器不支持canvas，请更换浏览器后再试</canvas>
<script>
btn.onclick = function(){history.go();}
con.onclick = function(){
    if(this.innerHTML == '暂停'){
        this.innerHTML = '恢复';
        clearInterval(oTimer);
    }else{
        this.innerHTML = '暂停'; 
        oTimer = setInterval(fnInterval,50);
    }
}
var canvas = document.getElementById('canvas');
//存储画布宽高
var H=290,W=400;
//存储探照灯
var ball = {};
//存储照片
var IMG;
//存储照片地址
var URL = 'http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/chunfen.jpg';
function initial(){
    if(canvas.getContext){
        var cxt = canvas.getContext('2d');
        var tempR = Math.floor(Math.random()*30+20);
        var tempX = Math.floor(Math.random()*(W-tempR) + tempR);
        var tempY = Math.floor(Math.random()*(H-tempR) + tempR)        
        ball = {
            x:tempX,
            y:tempY,
            r:tempR,
            stepX:Math.floor(Math.random() * 21 -10),
            stepY:Math.floor(Math.random() * 21 -10)
        };
        IMG = document.createElement('img');
        IMG.src=URL;
        IMG.onload = function(){
            cxt.drawImage(IMG,0,0);
        }   
    }    
}
function update(){
    ball.x += ball.stepX;
    ball.y += ball.stepY; 
    bumpTest(ball);
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
function render(){
    //重置画布高度，达到清空画布的效果
    canvas.height = H;    
    if(canvas.getContext){
        var cxt = canvas.getContext('2d');
        cxt.save();
        //将画布背景涂黑
        cxt.beginPath();
        cxt.fillStyle = '#000';
        cxt.fillRect(0,0,W,H);
        //渲染探照灯
        cxt.beginPath();
        cxt.arc(ball.x,ball.y,ball.r,0,2*Math.PI);
        cxt.fillStyle = '#000';
        cxt.fill(); 
        cxt.clip();      
        //由于使用了clip()，画布背景图片会出现在clip()区域内
        cxt.drawImage(IMG,0,0);
        cxt.restore();
    }

}
initial();
clearInterval(oTimer);
function fnInterval(){
    //更新运动状态
    update();
    //渲染
    render();    
}
var oTimer = setInterval(fnInterval,50);
</script>    
```