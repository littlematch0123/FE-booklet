# javascript运动系列第六篇——轨迹和投掷 

&emsp;&emsp;一般地，不同的运动形式会产生不同的轨迹。但仅凭肉眼去识别运动轨迹，其实并不是很直观。因此，在页面中显示运动轨迹，是一个重要的问题。物体初始态时，受到外力大小不同，则初速度不同。如何在网页中模拟投掷效果，也需要解决。接下来，将详细介绍轨迹和投掷

 

&nbsp;

### 运动轨迹

&emsp;&emsp;元素在运动过程中，不同的运动形式会产生不同的轨迹。如果不把轨迹表示出来，我们只能通过肉眼来区分运动形式。表示轨迹通常有两种方式：创建小元素和使用canvas

创建小元素

&emsp;&emsp;创建小元素原理上比较简单，但是性能较差。在元素移动时，创建一个2px*2px的小元素，并添加到页面上。以最简单的匀速运动为例

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Document</title>
<style>
.track{
    width: 2px;
    height: 2px;
    background-color:#000;
    position:absolute;
}
</style>
</head>
<body>
<button id="btn1">开始运动</button>
<button id="btn2">删除轨迹</button>
<button id="reset">还原</button>
<div id="test" style="height: 50px;width: 50px;background:pink;position:absolute;top:40px;left:0;"></div>
<script>
function getCSS(obj,style){
    if(window.getComputedStyle){
        return getComputedStyle(obj)[style];
    }
    return obj.currentStyle[style];
} 
function move(obj,attr,target,step,fn){
    //如果没有建立定时器对象，则在obj下建立定时器对象
    if(!obj.timers){obj.timers = {};}
    //清除定时器
    clearInterval(obj.timers[attr]);
    //声明当前值变量cur
    var cur;
    //判断步长step的正负值
    step = parseInt(getCSS(obj,attr)) < target ? step : -step;
    //开启定时器
    obj.timers[attr] = setInterval(function(){
        //获取样式当前值并赋值给cur
        cur = parseFloat(getCSS(obj,attr));
        ////若步长设置值使得元素超过目标点时，将步长设置值更改为目标点值 - 当前值
        if((cur + step - target)*step > 0){
            step = target - cur;
        }
        //将合适的步长值赋值给元素的样式
        obj.style[attr] = cur + step + 'px';
        //设置轨迹
        createTracks(obj.offsetLeft,obj.offsetTop)
        //当元素到达目标点后，停止定时器
        if(step == target - cur){
            clearInterval(obj.timers[attr]);
            obj.timers[attr] = 0;
            fn && fn.call(obj);    
        }       
    },20);        
} 
function createTracks(x,y){
    var ele = document.createElement('div');
    ele.className = 'track';
    ele.style.left = x + 'px';
    ele.style.top = y + 'px';
    document.body.appendChild(ele);
}
function deleteTracks(){
    var eles = document.getElementsByTagName('div');
    for(var i = 0 ;i < eles.length; i++){
        if(eles[i].className == 'track'){
            document.body.removeChild(eles[i]);
            i--;
        }
    }
}
btn1.onclick = function(){
    move(test,'left',150,10)
} 
btn2.onclick = function(){
    deleteTracks()
}     
reset.onclick = function(){
    history.go();
}
</script>
</body>
</html> 
```
<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/move/track/t1.html" frameborder="0" width="230" height="240"></iframe>

使用canvas

&emsp;&emsp;使用canvas也可以实现运动轨迹，且性能较好，只不过需要掌握canvas的一些基础知识

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Document</title>
</head>
<body>
<button id="btn1">开始运动</button>
<button id="btn2">删除轨迹</button>
<button id="reset">还原</button>
<div id="test" style="height: 50px;width: 50px;background:pink;position:absolute;top:40px;left:0;"></div>
<canvas id="drawing" style="position:absolute;left:0;top:0;z-index:-1"></canvas>
<script>
var context;
backupCanvas();
function backupCanvas(){
    var drawing = document.getElementById('drawing');
    drawing.setAttribute('width',document.documentElement.clientWidth);
    drawing.setAttribute('height',document.documentElement.clientHeight);
    if(drawing.getContext){
        context = drawing.getContext('2d');
        context.beginPath();
        context.moveTo(test.offsetLeft,test.offsetTop);
    }
}
function getCSS(obj,style){
    if(window.getComputedStyle){
        return getComputedStyle(obj)[style];
    }
    return obj.currentStyle[style];
} 
function move(obj,attr,target,step,fn){
    //如果没有建立定时器对象，则在obj下建立定时器对象
    if(!obj.timers){obj.timers = {};}
    //清除定时器
    clearInterval(obj.timers[attr]);
    //声明当前值变量cur
    var cur;
    //判断步长step的正负值
    step = parseInt(getCSS(obj,attr)) < target ? step : -step;
    //开启定时器
    obj.timers[attr] = setInterval(function(){
        //获取样式当前值并赋值给cur
        cur = parseFloat(getCSS(obj,attr));
        ////若步长设置值使得元素超过目标点时，将步长设置值更改为目标点值 - 当前值
        if((cur + step - target)*step > 0){
            step = target - cur;
        }
        //将合适的步长值赋值给元素的样式
        obj.style[attr] = cur + step + 'px';
        createCanvasTracks(obj.offsetLeft,obj.offsetTop);
        //当元素到达目标点后，停止定时器
        if(step == target - cur){
            clearInterval(obj.timers[attr]);
            obj.timers[attr] = 0;
            fn && fn.call(obj);    
        }       
    },20);        
} 
function createCanvasTracks(x,y){
    context.lineTo(x,y);
    context.stroke();        
}
function deleteCanvasTracks(){
    drawing.height = drawing.height;
}
btn1.onclick = function(){
    move(test,'left',150,10)
} 
btn2.onclick = function(){
    deleteCanvasTracks()
}     
reset.onclick = function(){
    history.go();
}
</script>
</body>
</html>
```
<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/move/track/t2.html" frameborder="0" width="230" height="240"></iframe>


&nbsp;

### 拖拽轨迹

&emsp;&emsp;物体在拖拽的时候，同样也存在着拖拽轨迹。由于拖拽的运动形式不固定，因此轨迹也不固定

&emsp;&emsp;同样地，拖拽轨迹也有创建小元素和使用canvas两种方法

【创建小元素】

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Document</title>
<style>
.track{
    width: 2px;
    height: 2px;
    background-color:#000;
    position:absolute;
}
</style>
</head>
<body>
<button id="btn">删除轨迹</button>
<button id="reset">还原</button>
<div id="test" style="height: 50px;width: 50px;background:pink;position:absolute;top:40px;left:0;"></div>

<script>
function createTracks(x,y){
    var ele = document.createElement('div');
    ele.className = 'track';
    ele.style.left = x + 'px';
    ele.style.top = y + 'px';
    document.body.appendChild(ele);
}
function deleteTracks(){
    var eles = document.getElementsByTagName('div');
    for(var i = 0 ;i < eles.length; i++){
        if(eles[i].className == 'track'){
            document.body.removeChild(eles[i]);
            i--;
        }
    }
}
btn.onclick = function(){
    deleteTracks()
}     
reset.onclick = function(){
    history.go();
}
test.onmousedown = function(e){
    e = e || event;
    //获取元素距离定位父级的x轴及y轴距离
    var x0 = this.offsetLeft;
    var y0 = this.offsetTop;
    //获取此时鼠标距离视口左上角的x轴及y轴距离
    var x1 = e.clientX;
    var y1 = e.clientY;
    document.onmousemove = function(e){
        e = e || event;
        //获取此时鼠标距离视口左上角的x轴及y轴距离
        x2 = e.clientX;
        y2 = e.clientY;    
        //计算此时元素应该距离视口左上角的x轴及y轴距离
        var X = x0 + (x2 - x1);
        var Y = y0 + (y2 - y1);
        //将X和Y的值赋给left和top，使元素移动到相应位置
        test.style.left = X + 'px';
        test.style.top = Y + 'px';
        //创建轨迹
        createTracks(X,Y);
    }

    document.onmouseup = function(e){
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

<iframe style="width: 100%; height: 160px;" src="https://demo.xiaohuochai.site/js/move/track/t3.html" frameborder="0" width="230" height="240"></iframe>


【使用canvas】

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Document</title>
</head>
<body>
<button id="btn">删除轨迹</button>
<button id="reset">还原</button>
<div id="test" style="height: 50px;width: 50px;background:pink;position:absolute;top:40px;left:0;"></div>
<canvas id="drawing" style="position:absolute;left:0;top:0;z-index:-1"></canvas>
<script>
var context;
backupCanvas();
function backupCanvas(){
    var drawing = document.getElementById('drawing');
    drawing.setAttribute('width',document.documentElement.clientWidth);
    drawing.setAttribute('height',document.documentElement.clientHeight);
    if(drawing.getContext){
        context = drawing.getContext('2d');
        context.beginPath();
        context.moveTo(test.offsetLeft,test.offsetTop);
    }
}
function createCanvasTracks(x,y){
    context.lineTo(x,y);
    context.stroke();        
}
function deleteCanvasTracks(){
    drawing.height = drawing.height;
}
btn.onclick = function(){
    deleteCanvasTracks()
}     
reset.onclick = function(){
    history.go();
}
test.onmousedown = function(e){
    e = e || event;
    //获取元素距离定位父级的x轴及y轴距离
    var x0 = this.offsetLeft;
    var y0 = this.offsetTop;
    //获取此时鼠标距离视口左上角的x轴及y轴距离
    var x1 = e.clientX;
    var y1 = e.clientY;
    document.onmousemove = function(e){
        e = e || event;
        //获取此时鼠标距离视口左上角的x轴及y轴距离
        x2 = e.clientX;
        y2 = e.clientY;    
        //计算此时元素应该距离视口左上角的x轴及y轴距离
        var X = x0 + (x2 - x1);
        var Y = y0 + (y2 - y1);
        //将X和Y的值赋给left和top，使元素移动到相应位置
        test.style.left = X + 'px';
        test.style.top = Y + 'px';
        //创建轨迹
        createCanvasTracks(X,Y);
    }

    document.onmouseup = function(e){
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
<iframe style="width: 100%; height: 160px;" src="https://demo.xiaohuochai.site/js/move/track/t4.html" frameborder="0" width="230" height="240"></iframe>

&nbsp;

### 投掷

&emsp;&emsp;如何使用javascript模拟出投掷的效果呢？javascript里面并没有力的概念。我们可以使用投掷速度为基准，当投掷速度快时，元素的速度也快；投掷速度慢时，元素速度同样也慢

&emsp;&emsp;问题来了，投掷速度如何确定。在javascript中模拟运动通常是使用一定频率的定时器来实现，投掷速度也同样如此。速度就相当于是一定时间的位移(或称为步长)。在定时器频率确定的情况下同，位移的确定其实就是找起始点和结束点这两个点的坐标位置

&emsp;&emsp;拖拽共涉及到三个鼠标事件：mousedown、mousemove和mouseup。结束点的位置是mouseup事件的鼠标位置(注意：mouseup事件的鼠标位置和最后一次mousemove事件的鼠标位置是相同的)，而开始点的位置可以是mousemove事件倒数第二次的鼠标位置。这两个位置是拖拽运动的最后两个运动位置，通过确定他们就可以确定投掷步长了

&emsp;&emsp;下面以匀速运动为例，来进行实现

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Document</title>
</head>
<body>
<button id="reset">还原</button>
<div id="test" style="height: 50px;width: 50px;background:pink;position:absolute;top:40px;left:0;"></div>
<script>
function getCSS(obj,style){
    if(window.getComputedStyle){
        return getComputedStyle(obj)[style];
    }
    return obj.currentStyle[style];
} 
function move(obj,attr,target,step,fn){
    //如果没有建立定时器对象，则在obj下建立定时器对象
    if(!obj.timers){obj.timers = {};}
    //清除定时器
    clearInterval(obj.timers[attr]);
    //声明当前值变量cur
    var cur;
    //判断步长step的正负值
    step = parseInt(getCSS(obj,attr)) < target ? step : -step;
    //开启定时器
    obj.timers[attr] = setInterval(function(){
        //获取样式当前值并赋值给cur
        cur = parseFloat(getCSS(obj,attr));
        //若步长设置值使得元素超过目标点时，将步长设置值更改为目标点值 - 当前值
        if((cur + step - target)*step > 0){
            step = target - cur;
        }
        //将合适的步长值赋值给元素的样式
        obj.style[attr] = cur + step + 'px';
        //当元素到达目标点后，停止定时器
        if(step == target - cur){
            clearInterval(obj.timers[attr]);
            obj.timers[attr] = 0;
            fn && fn.call(obj);    
        }       
    },30);        
}  
reset.onclick = function(){
    history.go();
}
test.onmousedown = function(e){
    e = e || event;
    //声明投掷步长值
    var stepX,stepY;
    //声明上一次mousemove事件的坐标位置
    var lastX2 = e.clientX;
    var lastY2 = e.clientY;
    //获取元素距离定位父级的x轴及y轴距离
    var x0 = this.offsetLeft;
    var y0 = this.offsetTop;
    //获取此时鼠标距离视口左上角的x轴及y轴距离
    var x1 = e.clientX;
    var y1 = e.clientY;
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
        //将X和Y的值赋给left和top，使元素移动到相应位置
        test.style.left = X + 'px';
        test.style.top = Y + 'px';
    }
    document.onmouseup = function(e){
        e = e || event;
        var maxHeight = document.documentElement.clientHeight - test.offsetHeight;
        var maxWidth = document.documentElement.clientWidth - test.offsetWidth;
        //以设置的投掷速度来进行匀速运动
        //向右投掷
        if(stepX > 0){
             move(test,'left',maxWidth,stepX);           
        //向左投掷
        }else{
            move(test,'left',0,stepX); 
        }
        //向下投掷
        if(stepY > 0){
            move(test,'top',maxHeight,stepY);            
        //向上投掷
        }else{
            move(test,'top',0,stepY);  
        }
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

<iframe style="width: 100%; height: 160px;" src="https://demo.xiaohuochai.site/js/move/track/t5.html" frameborder="0" width="230" height="240"></iframe>