# javascript运动系列第八篇——碰壁运动 

&emsp;&emsp;碰撞运动可能是运动系列里面比较复杂的运动了。碰撞可以分为碰壁和互碰两种形式，而碰撞前后的运动形式也可以分为变速和匀速两种，如果再涉及到阻力，具有速度损耗的话，就更加复杂了。本文先介绍碰壁运动

 

&nbsp;

### 匀速碰壁

&emsp;&emsp;碰壁是一种常见的碰撞形式，匀速碰壁是最简单的碰撞运动

&emsp;&emsp;假设一个密闭空间内一个弹性小球，小球有一个随机方向随机大小的初始速度。当小球碰壁时，速度不损失，而是做反向的匀速运动

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<div id="test" style="height: 100px;width: 100px;background:lightblue;position:absolute;top:60px;left:20px;border-radius:50%;"></div>

<button id="btn1">开始运动</button>
<button id="btn2">停止运动</button>
<span>游戏说明：当小球开始运动后，点击小球一次得一分</span>
<div id="result"></div>
<script>
var timer,i=0;
//声明得分
var key = 0;
var arr = ['orange','lightgreen','lightcoyal','pink','lightcyan','lightgray','lightseagreen','lightsteelblue'];

function changeColor(){
    i++;
    if(i == arr.length){
        i = 0;
    }
    test.style.background = arr[i];    
}
document.onmousemove = function(){
    return false;
}
test.onclick = function(){
    //当小球开始运动后，开始记分
    if(test.timer){
        result.innerHTML = '当前得分为:' + ++key + '分'
    }
    changeColor();
}
btn1.onclick = function(){
    result.innerHTML = ''
    //将分数清零
    key = 0;
    collisionMove({
        obj:test
    })
    clearInterval(timer);
    timer = setInterval(function(){
        changeColor();
    },500);
}
btn2.onclick = function(){
    clearInterval(timer);
    clearInterval(test.timer);
    test.timer = 0;
    result.innerHTML = '你得到:' + key + '分，再接再厉！'
}
function getCSS(obj,style){
    if(window.getComputedStyle){
        return getComputedStyle(obj)[style];
    }
    return obj.currentStyle[style];
}  
function collisionMove(json){
    var obj = json.obj;
    var fn = json.fn;
    //声明x、y轴的当前值
    var curX = parseFloat(getCSS(obj,'left'));
    var curY = parseFloat(getCSS(obj,'top'));
    //声明x、y轴的步长值
    var stepX = json.stepX;
    var stepY = json.stepY;
    //步长值默认值为[-25,-20,-15,-10,-5,0,5,10,15,20]中的一个随机数
    stepX = Number(stepX) || 5*Math.floor(Math.random() * 10 - 5);
    stepY = Number(stepY) || 5*Math.floor(Math.random() * 10 - 5);
    //声明x、y轴方向
    var dirX = json.dirX;
    var dirY = json.dirY;
    dirX = stepX > 0 ? '+' : '-';
    dirY = stepY > 0 ? '+' : '-';
    //声明offset宽高
    var offsetWidth = obj.offsetWidth;
    var offsetHeight = obj.offsetHeight;
    //声明元素活动区域宽高
    var activeWidth = json.activeWidth;
    var activeHeight = json.activeHeight;
    //元素获取区域宽高默认值为可视区域宽高
    activeWidth = Number(activeWidth) || document.documentElement.clientWidth;
    activeHeight = Number(activeHeight) || document.documentElement.clientHeight;
    //声明left、top样式值
    var left;
    var top;
    //清除定时器
    if(obj.timer){return;}
     //开启定时器
    obj.timer = setInterval(function(){
        //获取x、y轴的当前值
        curX = parseFloat(getCSS(obj,'left'));
        curY = parseFloat(getCSS(obj,'top'));
        //更新left、top值
        left = curX + stepX;
        top = curY + stepY;
        //右侧碰壁前一刻，步长大于剩余距离，且元素向右运动时
        if((left > activeWidth - offsetWidth) && (dirX == '+')){
            left = activeWidth - offsetWidth;
        }
        //左侧碰壁前一刻，步长大于剩余距离，且元素向左运动时
        if((Math.abs(stepX) > curX) && (dirX == '-')){
            left = curX;
        }
        //下侧碰壁前一刻，步长大于剩余距离，且元素向下运动时
        if((top > activeHeight - offsetHeight) && (dirY == '+')){
            top = activeHeight - offsetHeight;
        }
        //上侧碰壁前一刻，步长大于剩余距离，且元素向上运动时
        if((Math.abs(stepY) > curY) && (dirY == '-')){
            top = curY;
        }
        obj.style.left= left + 'px';
        obj.style.top = top + 'px';
        //左侧或右侧碰撞瞬间
        if(left == activeWidth - offsetWidth || left == curX){
            stepX = -stepX;
        }
        //上侧或下侧碰撞瞬间
        if(top == activeHeight - offsetHeight || top == curY){
            stepY = -stepY;
        }
        //更新运动方向
        dirX = stepX > 0 ? '+' : '-';
        dirY = stepY > 0 ? '+' : '-';
    },20);            
}
</script>    
</body>
</html>
```

<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/js/move/collision/c1.html" frameborder="0" width="230" height="240"></iframe>

&nbsp;

### 自由落体

&emsp;&emsp;元素在实际运动中，并不是保持匀速运动的，更多的是变速运动，而且会有速度损耗。典型的场景是自由落体运动，物体落地之后会反方向弹几下，最终停在地上

&emsp;&emsp;自由落体运动可以看做是重力与阻力合作的结果。在空中运动时，向下运动时，做匀加速运动；向上运动时，做匀减速运动。与地面碰撞的瞬间，产生速度损耗

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<div id="test" style="height:50px;width: 50px;background:lightblue;position:absolute;top:60px;border-radius:50%;"></div>
<button id="btn1">开始运动</button>
<button id="btn2">还原</button>
<script>
document.onmousedown = function(){
    return false;
}
btn1.onclick = function(){
    collisionMove({
        obj:test
    })
}
btn2.onclick = function(){
    history.go();
}
function getCSS(obj,style){
    if(window.getComputedStyle){
        return getComputedStyle(obj)[style];
    }
    return obj.currentStyle[style];
}  
function collisionMove(json){
    var obj = json.obj;
    var fn = json.fn;
    //声明y轴的当前值
    var curY = parseFloat(getCSS(obj,'top'));
    //声明offset高
    var offsetHeight = obj.offsetHeight;
    //声明元素活动区域高
    var activeHeight = json.activeHeight;
    //元素获取区域宽高默认值为可视区域高
    activeHeight = Number(activeHeight) || document.documentElement.clientHeight;
    //声明y轴的步长值
    var stepY = 0;
    //声明top样式值
    var top;
    //声明减速系数
    var k = 0.8;
    //声明碰撞次数
    var i = 0;
    //清除定时器
    if(obj.timer){return;}
     //开启定时器
    obj.timer = setInterval(function(){
        //获取y轴的当前值
        curY = parseFloat(getCSS(obj,'top'));
        //更新步长值stepY
        stepY+= 5;
        //更新top值
        top = curY + stepY;
        //下侧碰壁前一刻，步长大于剩余距离，且元素向下运动时
        if(top > activeHeight - offsetHeight){
            top = activeHeight - offsetHeight;
        }
        obj.style.top = top + 'px';
        //下侧碰撞瞬间，改变运动方向，并产生速度损耗
        if(top == activeHeight - offsetHeight){
            //若碰撞10次后，则停止运动
            i++;
            if(i== 10){
                clearInterval(obj.timer)
                obj.timer = 0;
                fn && fn.call(obj);
            }
            stepY = -stepY * k;
        }
    },20);            
}
</script>    
</body>
</html>
```

<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/js/move/collision/c2.html" frameborder="0" width="230" height="240"></iframe>

&nbsp;

### 投掷碰壁

&emsp;&emsp;如果一个物体向空中投掷出去，会呈现一个抛物线的效果，最终经过与地面碰撞多次后停止

&emsp;&emsp;投掷碰撞效果是x轴和y轴的合效果。x轴做匀速运动，当物体碰到地面后，x轴速度发生损耗；y轴做匀加速运动，当物体碰到地面后，y轴速度同样发生损耗

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<div id="test" style="height: 50px;width: 50px;background:lightblue;position:absolute;top:200px;left:20px;border-radius:50%;"></div>
<button id="btn1">开始运动</button>
<button id="btn2">还原</button>
<script>
document.onmousedown = function(){
    return false;
}
btn1.onclick = function(){
    collisionMove({
        obj:test
    })
}
btn2.onclick = function(){
    history.go();
}
function getCSS(obj,style){
    if(window.getComputedStyle){
        return getComputedStyle(obj)[style];
    }
    return obj.currentStyle[style];
}  
function collisionMove(json){
    var obj = json.obj;
    var fn = json.fn;
    //声明y轴的当前值
    var curY = parseFloat(getCSS(obj,'top'));
    //声明offset高
    var offsetHeight = obj.offsetHeight;
    //声明元素活动区域高
    var activeHeight = json.activeHeight;
    //元素获取区域宽高默认值为可视区域高
    activeHeight = Number(activeHeight) || document.documentElement.clientHeight;
    //声明x、y轴的步长值
    var stepY = -50;
    var stepX = 10;
    //声明top、left样式值
    var top;
    var left;
    //声明减速系数
    var k = 0.8;
    //声明碰撞次数
    var i = 0;
    //清除定时器
    if(obj.timer){return;}
     //开启定时器
    obj.timer = setInterval(function(){
        //获取x、y轴的当前值
        curX = parseFloat(getCSS(obj,'left'));
        curY = parseFloat(getCSS(obj,'top'));
        //更新步长值stepY
        stepY+= 5;
        //更新top、left值
        top = curY + stepY;
        left = curX + stepX;
        //下侧碰壁前一刻，步长大于剩余距离，且元素向下运动时
        if(top > activeHeight - offsetHeight){
            top = activeHeight - offsetHeight;
        }
        obj.style.top = top + 'px';
        obj.style.left = left + 'px';
        //下侧碰撞瞬间，改变运动方向，并产生速度损耗
        if(top == activeHeight - offsetHeight){
            //若碰撞10次后，则停止运动
            i++;
            if(i== 10){
                clearInterval(obj.timer)
                obj.timer = 0;
                fn && fn.call(obj);
            }
            //速度损耗
            stepY = -stepY * k;
            stepX = stepX * k;
        }
    },20);            
}
</script>    
</body>
</html>
```
<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/js/move/collision/c3.html" frameborder="0" width="230" height="240"></iframe>


&nbsp;

### 拖拽碰壁

&emsp;&emsp;实际情况下，一个物体默认具有重力效果。物体的重力效果是时时刻刻都在发生的，相当于定时器的每次运动，都有向下的匀加速运动

&emsp;&emsp;如果投掷速度不同，则运动速度也不相同。在碰壁的情况下，速度会有损耗，并且发生速度方向变化。最终，物体会落到地上

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<div id="test" style="height: 100px;width: 100px;border-radius:50%;background:pink;position:absolute;top:40px;left:0;"></div>
<script>
//声明元素投掷步长值
var stepX=0,stepY=0;
//默认情况下，也存在重力效果
collisionMove({
    obj:test,
    stepX:stepX,
    stepY:stepY
})
function getCSS(obj,style){
    if(window.getComputedStyle){
        return getComputedStyle(obj)[style];
    }
    return obj.currentStyle[style];
} 
//碰撞运动函数
function collisionMove(json){
    var obj = json.obj;
    var fn = json.fn;
    //声明x、y轴的当前值
    var curX = parseFloat(getCSS(obj,'left'));
    var curY = parseFloat(getCSS(obj,'top'));
    //声明x、y轴的步长值
    var stepX = json.stepX;
    var stepY = json.stepY;
       //声明元素的重要加速度
       var g = json.g || 3;
    //步长值默认值为10
    if(isNaN(Number(stepX))){
        stepX = 10;
    }else{
        stepX = Number(stepX);
    }
    if(isNaN(Number(stepY))){
        stepY = 10;
    }else{
        stepY = Number(stepY);
    }
    //声明x、y轴方向
    var dirX = json.dirX;
    var dirY = json.dirY;
    dirX = stepX > 0 ? '+' : '-';
    dirY = stepY > 0 ? '+' : '-';
    //声明offset宽高
    var offsetWidth = obj.offsetWidth;
    var offsetHeight = obj.offsetHeight;
    //声明元素活动区域宽高
    var activeWidth = json.activeWidth;
    var activeHeight = json.activeHeight;
    //元素获取区域宽高默认值为可视区域宽高
    activeWidth = Number(activeWidth) || document.documentElement.clientWidth;
    activeHeight = Number(activeHeight) || document.documentElement.clientHeight;
    //声明left、top样式值
    var left;
    var top;
    //声明减速系数
    var k = 0.8;
    //声明碰撞次数
    var i = 0;
    //清除定时器
    if(obj.timer){return;}
     //开启定时器
    obj.timer = setInterval(function(){
        //获取x、y轴的当前值
        curX = parseFloat(getCSS(obj,'left'));
        curY = parseFloat(getCSS(obj,'top'));
        //受到重力影响，更新步长值stepY
        stepY += g;
        //更新left、top值
        left = curX + stepX;
        top = curY + stepY;
        //右侧碰壁前一刻，步长大于剩余距离，且元素向右运动时
        if((left > activeWidth - offsetWidth) && (dirX == '+')){
            left = activeWidth - offsetWidth;
        }
        //左侧碰壁前一刻，步长大于剩余距离，且元素向左运动时
        if((Math.abs(stepX) > curX) && (dirX == '-')){
            left = curX;
        }
        //下侧碰壁前一刻，步长大于剩余距离，且元素向下运动时
        if((top > activeHeight - offsetHeight) && (dirY == '+')){
            top = activeHeight - offsetHeight;
        }
        //上侧碰壁前一刻，步长大于剩余距离，且元素向上运动时
        if((Math.abs(stepY) > curY) && (dirY == '-')){
            top = curY;
        }
        obj.style.left= left + 'px';
        obj.style.top = top + 'px';
        //左侧或右侧碰撞瞬间
        if(left == activeWidth - offsetWidth || left == curX){
            //x轴方向速度损耗，并发生方向变化
            stepX = -stepX * k;
        }
        //上侧或下侧碰撞瞬间
        if(top == activeHeight - offsetHeight || top == curY){
            //y轴方向速度损耗，并发生方向变化
            stepY = -stepY * k;
            //x轴方向速度损耗
            stepX = stepX * k;
        }
        //元素与地面碰撞10次后，则停止运动
        if(top == activeHeight - offsetHeight){
            i++;
            if(i== 10){
                clearInterval(obj.timer)
                obj.timer = 0;
                fn && fn.call(obj);
            }            
        }
        //更新运动方向
        dirX = stepX > 0 ? '+' : '-';
        dirY = stepY > 0 ? '+' : '-';
    },20);            
}    
//初始抛掷
test.onmousedown = function(e){
    e = e || event;
    //声明上一次mousemove事件的坐标位置
    var lastX2 = e.clientX;
    var lastY2 = e.clientY;
    //获取元素距离定位父级的x轴及y轴距离
    var x0 = this.offsetLeft;
    var y0 = this.offsetTop;
    //获取此时鼠标距离视口左上角的x轴及y轴距离
    var x1 = e.clientX;
    var y1 = e.clientY;
    //鼠标按下时，获得此时的页面区域
    var L0 = 0;
    var R0 = document.documentElement.clientWidth;
    var T0 = 0;
    var B0 = document.documentElement.clientHeight;
    //鼠标按下时，获得此时的元素宽高
    var EH = this.offsetHeight;
    var EW = this.offsetWidth;
    document.onmousemove = function(e){
        e = e || event;
        //获取此时鼠标距离视口左上角的x轴及y轴距离
        var x2 = e.clientX;
        var y2 = e.clientY; 
        stepX = x2 - lastX2;
        stepY = y2 - lastY2;  
        lastX2 = e.clientX;
        lastY2 = e.clientY;
        //计算此时元素应该距离视口左上角的x轴及y轴距离
        var X = x0 + (x2 - x1);
        var Y = y0 + (y2 - y1);
        /******范围限定*******/
        //获取鼠标移动时元素四边的瞬时值
        var L = X;
        var R = X + EW;
        var T = Y;
        var B = Y + EH;
        //在将X和Y赋值给left和top之前，进行范围限定
        //只有在范围内时，才进行相应的移动
        //如果脱离左侧范围，则left置L0
        if(L < L0){X = L0;}
        //如果脱离右侧范围，则left置为R0
        if(R > R0){X = R0 - EW;}
        //如果脱离上侧范围，则top置T0
        if(T < T0){Y = T0;}
        //如果脱离下侧范围，则top置为B0
        if(B > B0){Y = B0 - EH;}
        //将X和Y的值赋给left和top，使元素移动到相应位置
        test.style.left = X + 'px';
        test.style.top = Y + 'px';
    }
    document.onmouseup = function(e){
        e = e || event;
        var maxHeight = document.documentElement.clientHeight - test.offsetHeight;
        var maxWidth = document.documentElement.clientWidth - test.offsetWidth;
        //以设置的投掷速度来进行碰撞运动
        collisionMove({
            obj:test,
            stepX:stepX,
            stepY:stepY
        })
        //当鼠标抬起时，拖拽结束，则将onmousemove赋值为null即可
        document.onmousemove = null;
        //释放全局捕获
        if(test.releaseCapture){
            test.releaseCapture();
        }
    }
    //阻止默认行为
    return false;
    //IE8-浏览器阻止默认行为
    if(test.setCapture){
        test.setCapture();
    }
}
</script>
</body>
</html>
```

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/js/move/collision/c4.html" frameborder="0" width="230" height="240"></iframe>