# javascript动画系列第一篇——模拟拖拽

&emsp;&emsp;从本文开始，介绍javascript动画系列。javascript本身是具有原生拖放功能的，但是由于兼容性问题，以及功能实现的方式，用的不是很广泛。javascript动画广泛使用的还是模拟拖拽。本文将详细介绍该内容

 

&nbsp;

### 原理介绍

&emsp;&emsp;模拟拖拽最终效果和在桌面上移动文件夹的效果类似

![](https://pic.xiaohuochai.site/blog/JS_simulation1.gif)


&emsp;&emsp;鼠标按下时，拖拽开始。鼠标移动时，被拖拽元素跟着鼠标一起移动。鼠标抬起时，拖拽结束

&emsp;&emsp;所以，拖拽的重点是确定被拖拽元素是如何移动的


![](https://pic.xiaohuochai.site/blog/js_simulation2.png)

&emsp;&emsp;假设，鼠标按下时，鼠标对象的clientX和clientY分别为x1和y1。元素距离视口左上角x轴和y轴分别为x0和y0

&emsp;&emsp;鼠标移动的某一时刻，clientX和clientY分别为x2和y2

&emsp;&emsp;所以，元素移动的x轴和y轴距离分别为x2-x1和y2-y1

&emsp;&emsp;元素移动后，元素距离视口左上角x轴和y轴的位置分别为
```
  X = x0 + (x2-x1)
  Y = y0 + (y2-y1)
``` 

&nbsp;

### 代码实现

&emsp;&emsp;将上面的原理用代码实现如下

&emsp;&emsp;鼠标按下时，初始态的x0和y0分别用offsetLeft和offsetTop表示

&emsp;&emsp;鼠标移动时，瞬时态的x和y分别赋值为定位后元素的left和top

```
<div id="test" style="height:100px;width:100px;background:pink;position:absolute;top:0;left:0;"></div>
<script>
test.onmousedown = function(e){
    e = e || event;
    //获取元素距离定位父级的x轴及y轴距离
    var x0 = this.offsetLeft;
    var y0 = this.offsetTop;
    //获取此时鼠标距离视口左上角的x轴及y轴距离
    var x1 = e.clientX;
    var y1 = e.clientY;

    test.onmousemove = function(e){
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
    }

    test.onmouseup = function(e){
        //当鼠标抬起时，拖拽结束，则将onmousemove赋值为null即可
        test.onmousemove = null;
    }
}
</script>
```
<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/js/dnd/simulation/s1.html" frameborder="0" width="230" height="240"></iframe>

【另一种实现】

&emsp;&emsp;由于使用上面的DOM0级事件处理程序时，将只能绑定一个函数，将不利于扩展。所以，将其改写为DOM2级事件处理程序及IE事件处理程序的兼容写法

```
<div id="test" style="height:100px;width:100px;background:pink;position:absolute;top:0;left:0;"></div>
<script>
function addEvent(target,type,handler){
    if(target.addEventListener){
        target.addEventListener(type,handler,false);
    }else{
        target.attachEvent('on'+type,function(event){
            return handler.call(target,event);
        });
    }
}
(function(){
    var x0,y0,x1,y1,isMoving;
    var ele = document.getElementById('test');

var mousedownHandler = function(e){
    e = e || event;
    //获取元素距离定位父级的x轴及y轴距离
    x0 = this.offsetLeft;
    y0 = this.offsetTop;
    //获取此时鼠标距离视口左上角的x轴及y轴距离
    x1 = e.clientX;
    y1 = e.clientY;
    //按下鼠标时，表示正在运动
    isMoving = true;
}
var mousemoveHandler = function(e){
    //如果没有触发down事件，而直接触发move事件，则函数直接返回
    if(!isMoving){
        return;
    }
    e = e || event;
    //获取此时鼠标距离视口左上角的x轴及y轴距离
    var x2 = e.clientX;
    var y2 = e.clientY;    
    //计算此时元素应该距离视口左上角的x轴及y轴距离
    var X = x0 + (x2 - x1);
    var Y = y0 + (y2 - y1);
    //将X和Y的值赋给left和top，使元素移动到相应位置
    ele.style.left = X + 'px';
    ele.style.top = Y + 'px';
}
var mouseupHandler = function(e){
    //鼠标抬起时，表示停止运动
    isMoving = false;
}

addEvent(ele,'mousedown',mousedownHandler);
addEvent(ele,'mousemove',mousemoveHandler)
addEvent(ele,'mouseup',mouseupHandler)

})();
</script>
```
<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/js/dnd/simulation/s2.html" frameborder="0" width="230" height="240"></iframe>

&nbsp;

### 代码优化

&emsp;&emsp;使用上面的代码时，会出现一个问题。当鼠标拖动的太快，比mousemove事件的触发间隔还要快时，鼠标就会从元素上离开。这样就停止了元素的拖拽过程

&emsp;&emsp;此时，如果把mousemove和mouseup事件都加在document上时，即可解决

```
<div id="test" style="height:100px;width:100px;background:pink;position:absolute;top:0;left:0;"></div>
<script>
function addEvent(target,type,handler){
    if(target.addEventListener){
        target.addEventListener(type,handler,false);
    }else{
        target.attachEvent('on'+type,function(event){
            return handler.call(target,event);
        });
    }
}
(function(){
    var x0,y0,x1,y1,isMoving;
    var ele = document.getElementById('test');

var mousedownHandler = function(e){
    e = e || event;
    //获取元素距离定位父级的x轴及y轴距离
    x0 = this.offsetLeft;
    y0 = this.offsetTop;
    //获取此时鼠标距离视口左上角的x轴及y轴距离
    x1 = e.clientX;
    y1 = e.clientY;
    //按下鼠标时，表示正在运动
    isMoving = true;
}
var mousemoveHandler = function(e){
    //如果没有触发down事件，而直接触发move事件，则函数直接返回
    if(!isMoving){
        return;
    }
    e = e || event;
    //获取此时鼠标距离视口左上角的x轴及y轴距离
    var x2 = e.clientX;
    var y2 = e.clientY;    
    //计算此时元素应该距离视口左上角的x轴及y轴距离
    var X = x0 + (x2 - x1);
    var Y = y0 + (y2 - y1);
    //将X和Y的值赋给left和top，使元素移动到相应位置
    ele.style.left = X + 'px';
    ele.style.top = Y + 'px';
}
var mouseupHandler = function(e){
    //鼠标抬起时，表示停止运动
    isMoving = false;
}

addEvent(ele,'mousedown',mousedownHandler);
addEvent(ele,'mousemove',mousemoveHandler)
addEvent(ele,'mouseup',mouseupHandler)

})();
</script>
```

<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/js/dnd/simulation/s3.html" frameborder="0" width="230" height="240"></iframe>

&nbsp;

### 拖拽冲突

&emsp;&emsp;由于文字和图片默认支持原生拖放，如果将原生拖放和模拟拖拽掺杂在一起，将造成与预想效果不符的情况

&emsp;&emsp;如果拖放的元素内容存在文字，且文字被选中会触发文字的原生拖放效果

&emsp;&emsp;在文字上面双击鼠标，即可选中文字，再移动鼠标时，会触发文字的原生拖放效果，如下所示

<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/js/dnd/simulation/s4.html" frameborder="0" width="230" height="240"></iframe>

&emsp;&emsp;只要在mousedown事件阻止浏览器的默认行为即可

```
<div id="test" style="height:100px;width:100px;background:pink;position:absolute;top:0;left:0;">测试文字</div>
<script>
function addEvent(target,type,handler){
    if(target.addEventListener){
        target.addEventListener(type,handler,false);
    }else{
        target.attachEvent('on'+type,function(event){
            return handler.call(target,event);
        });
    }
}
(function(){
    var x0,y0,x1,y1,isMoving;
    var ele = document.getElementById('test');

var mousedownHandler = function(e){
    e = e || event;
    //获取元素距离定位父级的x轴及y轴距离
    x0 = this.offsetLeft;
    y0 = this.offsetTop;
    //获取此时鼠标距离视口左上角的x轴及y轴距离
    x1 = e.clientX;
    y1 = e.clientY;
    //按下鼠标时，表示正在运动
    isMoving = true;
}
var mousemoveHandler = function(e){
    //如果没有触发down事件，而直接触发move事件，则函数直接返回
    if(!isMoving){
        return;
    }
    e = e || event;
    //获取此时鼠标距离视口左上角的x轴及y轴距离
    var x2 = e.clientX;
    var y2 = e.clientY;    
    //计算此时元素应该距离视口左上角的x轴及y轴距离
    var X = x0 + (x2 - x1);
    var Y = y0 + (y2 - y1);
    //将X和Y的值赋给left和top，使元素移动到相应位置
    ele.style.left = X + 'px';
    ele.style.top = Y + 'px';
}
var mouseupHandler = function(e){
    //鼠标抬起时，表示停止运动
    isMoving = false;
}
var preventDefaultHandler = function(e){
    e = e || event;
    if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }
}
addEvent(ele,'mousedown',mousedownHandler);
addEvent(ele,'mousedown',preventDefaultHandler);
addEvent(document,'mousemove',mousemoveHandler)
addEvent(document,'mouseup',mouseupHandler)

})();
</script>
```

<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/js/dnd/simulation/s5.html" frameborder="0" width="230" height="240"></iframe>

&nbsp;

### IE兼容

&emsp;&emsp;以上代码在IE8-浏览器中仍然无法阻止默认行为。此时，为了实现IE兼容，需要使用全局捕获setCapture()和释放捕获releaseCapture()

&emsp;&emsp;首先，先看一下全局捕获的效果

&emsp;&emsp;下面代码中，开启全局捕获之后，页面中的所有点击效果，都相当于针对按钮一的点击效果。释放捕获后，效果消失

&emsp;&emsp;注意:IE浏览器完全支持全局捕获；chrome不支持，使用全局捕获会报错；firefox不报错，但静默失败

```
<button id="btn1">按钮一</button>
<button id="btn2">开启按钮一的全局捕获</button>
<script>
btn1.onclick = function(){
    alert(1);
}
btn2.onclick = function(){
    if(btn1.setCapture){
        if(btn2.innerHTML.charAt(0) == '开'){
            btn1.setCapture();
            btn2.innerHTML = '关闭按钮一的全局捕获';
        }else{
            btn1.releaseCapture();
            btn2.innerHTML = '开启按钮一的全局捕获';    
        }
    }
}
</script>
```
<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/dnd/simulation/s6.html" frameborder="0" width="230" height="240"></iframe>


&emsp;&emsp;通过在IE浏览器设置全局捕获来达到取消文字原生拖放的默认行为

```
<div id="test" style="height: 100px;width: 100px;background:pink;position:absolute;top:0;left:0;">测试文字</div>
<script>
function addEvent(target,type,handler){
    if(target.addEventListener){
        target.addEventListener(type,handler,false);
    }else{
        target.attachEvent('on'+type,function(event){
            return handler.call(target,event);
        });
    }
}
(function(){
    var x0,y0,x1,y1,isMoving;
    var ele = document.getElementById('test');

var mousedownHandler = function(e){
    e = e || event;
    //获取元素距离定位父级的x轴及y轴距离
    x0 = this.offsetLeft;
    y0 = this.offsetTop;
    //获取此时鼠标距离视口左上角的x轴及y轴距离
    x1 = e.clientX;
    y1 = e.clientY;
    //按下鼠标时，表示正在运动
    isMoving = true;
}
var mousemoveHandler = function(e){
    //如果没有触发down事件，而直接触发move事件，则函数直接返回
    if(!isMoving){
        return;
    }
    e = e || event;
    //获取此时鼠标距离视口左上角的x轴及y轴距离
    var x2 = e.clientX;
    var y2 = e.clientY;    
    //计算此时元素应该距离视口左上角的x轴及y轴距离
    var X = x0 + (x2 - x1);
    var Y = y0 + (y2 - y1);
    //将X和Y的值赋给left和top，使元素移动到相应位置
    ele.style.left = X + 'px';
    ele.style.top = Y + 'px';
}
var mouseupHandler = function(e){
    //鼠标抬起时，表示停止运动
    isMoving = false;
    //释放全局捕获
    if(ele.releaseCapture){
        ele.releaseCapture();
    }    
}
var preventDefaultHandler = function(e){
    e = e || event;
    if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }
    //IE8-浏览器阻止默认行为
    if(ele.setCapture){
        ele.setCapture();
    }
}
addEvent(ele,'mousedown',mousedownHandler);
addEvent(ele,'mousedown',preventDefaultHandler);
addEvent(document,'mousemove',mousemoveHandler)
addEvent(document,'mouseup',mouseupHandler)

})();
</script>
```


<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/js/dnd/simulation/s7.html" frameborder="0" width="230" height="240"></iframe>