# javascript动画系列第五篇——模拟滚动条 

&emsp;&emsp;当元素内容溢出元素尺寸范围时，会出现滚动条。但由于滚动条在各浏览器下表现不同，兼容性不好。所以，模拟滚动条也是很常见的应用。本文将详细介绍滚动条模拟

 

&nbsp;

### 原理介绍

&emsp;&emsp;滚动条模拟实际上和元素模拟拖拽类似。仅仅通过范围限定，使元素只可以在单一方向上拖拽

```
<div id="box" style="height: 200px;width: 16px;background-color:#F5F5F5;border-radius:10px;box-shadow:inset 0 0 6px rgba(0,0,0,0.3);position:relative;">
    <div id="test" style="height: 60px;width: 16px;background-color:#555;box-shadow:inset 0 0 6px rgba(0,0,0,.3);border-radius:10px;position:absolute;"></div>
</div>
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
    var y0,y1,isMoving;
    var ele = document.getElementById('test');

    var mousedownHandler = function(e){
        e = e || event;
        y0 = ele.offsetTop;
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
        var y2 = e.clientY;   
        var Y = y0 + (y2 - y1);
        if(Y < 0){Y = 0;}
        var YMax = parseInt(ele.parentNode.clientHeight) - ele.offsetHeight;
        if(Y > YMax){Y = YMax;}
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
    addEvent(document,'mousemove',mousemoveHandler);
    addEvent(document,'mouseup',mouseupHandler);

})();
</script>    
```

<iframe style="width: 100%; height: 220px;" src="https://demo.xiaohuochai.site/js/dnd/scrollbar/s1.html" frameborder="0" width="230" height="240"></iframe>


&emsp;&emsp;通过将上面代码封装成函数，可以实现横向和纵向两种滚动条

```
<div id="box1" style="height: 200px;width: 16px;background-color:#F5F5F5;border-radius:10px;box-shadow:inset 0 0 6px rgba(0,0,0,0.3);position:relative;">
    <div id="test1" style="height: 60px;width: 16px;background-color:#555;box-shadow:inset 0 0 6px rgba(0,0,0,.3);border-radius:10px;position:absolute;"></div>
</div>
<div id="box2" style="height: 16px;width: 200px;background-color:#F5F5F5;border-radius:10px;box-shadow:inset 0 0 6px rgba(0,0,0,0.3);position:relative;">
    <div id="test2" style="height: 16px;width: 60px;background-color:#D62929;box-shadow:inset 0 0 6px rgba(0,0,0,.3);border-radius:10px;position:absolute;"></div>
</div>
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
function scrollbar(ele,str){
    var x0,x1,y0,y1,isMoving;

    var mousedownHandler = function(e){
        e = e || event;
        x0 = ele.offsetLeft;
        y0 = ele.offsetTop;
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
        if(str == 'x'){
            var x2 = e.clientX;   
            var X = x0 + (x2 - x1);
            if(X < 0){X = 0;}
            var XMax = parseInt(ele.parentNode.clientWidth) - ele.offsetWidth;
            if(X > XMax){X = XMax;}
            ele.style.left = X + 'px';    
        }else{
            var y2 = e.clientY;   
            var Y = y0 + (y2 - y1);
            if(Y < 0){Y = 0;}
            var YMax = parseInt(ele.parentNode.clientHeight) - ele.offsetHeight;
            if(Y > YMax){Y = YMax;}
            ele.style.top = Y + 'px';            
        }

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
    addEvent(document,'mousemove',mousemoveHandler);
    addEvent(document,'mouseup',mouseupHandler);

};

scrollbar(test1);
scrollbar(test2,'x');
</script>    
```

<iframe style="width: 100%; height: 240px;" src="https://demo.xiaohuochai.site/js/dnd/scrollbar/s2.html" frameborder="0" width="230" height="240"></iframe>

&nbsp;

## 应用

&emsp;&emsp;下面来介绍通过滚动条实现的几个应用

&nbsp;

### 数字加减

&emsp;&emsp;通过移动滚动条来实现数字的加减。比例关系为：
```
滚动条已移动距离/滚动条可移动距离= 数字当前值/数字最大值
```
```
<div id="box" style="height: 16px;width: 200px;display:inline-block;background-color:#F5F5F5;border-radius:10px;box-shadow:inset 0 0 6px rgba(0,0,0,0.3);position:relative;">
    <div id="test" style="height: 16px;width: 60px;background-color:#D62929;box-shadow:inset 0 0 6px rgba(0,0,0,.3);border-radius:10px;position:absolute;"></div>
</div>
<span id="result">0</span>
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
function scrollbar(ele,str,max){
    var x0,x1,y0,y1,isMoving,radio;

    var mousedownHandler = function(e){
        e = e || event;
        x0 = ele.offsetLeft;
        y0 = ele.offsetTop;
        x1 = e.clientX;
        y1 = e.clientY;
        //按下鼠标时，表示正在运动
        isMoving = true;
        //x轴方向
        if(str == 'x'){
            ratio = max/(ele.parentNode.offsetWidth - ele.offsetWidth);
        //否则为y轴方向
        }else{
            var disY = e.clientY - ele.offsetTop;
            ratio =max/(ele.parentNode.offsetHeight - ele.offsetHeight);
        }
    }
    var mousemoveHandler = function(e){
        //如果没有触发down事件，而直接触发move事件，则函数直接返回
        if(!isMoving){
            return;
        }
        e = e || event;
        if(str == 'x'){
            var x2 = e.clientX;   
            var X = x0 + (x2 - x1);
            if(X < 0){X = 0;}
            var XMax = parseInt(ele.parentNode.clientWidth) - ele.offsetWidth;
            if(X > XMax){X = XMax;}
            ele.style.left = X + 'px';    
            result.innerHTML = Math.round(ratio * X);
        }else{
            var y2 = e.clientY;   
            var Y = y0 + (y2 - y1);
            if(Y < 0){Y = 0;}
            var YMax = parseInt(ele.parentNode.clientHeight) - ele.offsetHeight;
            if(Y > YMax){Y = YMax;}
            ele.style.top = Y + 'px';
            result.innerHTML = Math.round(ratio * Y);             
        }

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
    addEvent(document,'mousemove',mousemoveHandler);
    addEvent(document,'mouseup',mouseupHandler);

};

scrollbar(test,'x',100);
</script>    
```

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/dnd/scrollbar/s3.html" frameborder="0" width="230" height="240"></iframe>

&nbsp;

### 元素尺寸

&emsp;&emsp;通过拖动滚动条来实现元素尺寸的变化，以改变元素宽度为例。比例关系为：
```
滚动条已移动距离/滚动条可移动距离= 元素当前宽度/元素最大宽度
```
```
<div id="box" style="height: 16px;width: 200px;display:inline-block;background-color:#F5F5F5;border-radius:10px;box-shadow:inset 0 0 6px rgba(0,0,0,0.3);position:relative;">
    <div id="test" style="height: 16px;width: 60px;background-color:#D62929;box-shadow:inset 0 0 6px rgba(0,0,0,.3);border-radius:10px;position:absolute;"></div>
</div>
<span id="result" style="width: 1px;height: 50px;background-color:pink;display:inline-block;"></span>
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
function scrollbar(ele,str,max){
    var x0,x1,y0,y1,isMoving,radio;

    var mousedownHandler = function(e){
        e = e || event;
        x0 = ele.offsetLeft;
        y0 = ele.offsetTop;
        x1 = e.clientX;
        y1 = e.clientY;
        //按下鼠标时，表示正在运动
        isMoving = true;
        //x轴方向
        if(str == 'x'){
            ratio = max/(ele.parentNode.offsetWidth - ele.offsetWidth);
        //否则为y轴方向
        }else{
            var disY = e.clientY - ele.offsetTop;
            ratio =max/(ele.parentNode.offsetHeight - ele.offsetHeight);
        }
    }
    var mousemoveHandler = function(e){
        //如果没有触发down事件，而直接触发move事件，则函数直接返回
        if(!isMoving){
            return;
        }
        e = e || event;
        if(str == 'x'){
            var x2 = e.clientX;   
            var X = x0 + (x2 - x1);
            if(X < 0){X = 0;}
            var XMax = parseInt(ele.parentNode.clientWidth) - ele.offsetWidth;
            if(X > XMax){X = XMax;}
            ele.style.left = X + 'px';    
            result.style.width = Math.round(ratio * X) + 'px';
        }else{
            var y2 = e.clientY;   
            var Y = y0 + (y2 - y1);
            if(Y < 0){Y = 0;}
            var YMax = parseInt(ele.parentNode.clientHeight) - ele.offsetHeight;
            if(Y > YMax){Y = YMax;}
            ele.style.top = Y + 'px';
            result.style.width = Math.round(ratio * Y) + 'px';             
        }

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
    addEvent(document,'mousemove',mousemoveHandler);
    addEvent(document,'mouseup',mouseupHandler);

};

scrollbar(test,'x',100);
</script>
```

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/js/dnd/scrollbar/s4.html" frameborder="0" width="230" height="240"></iframe>

&nbsp;

### 内容滚动

&emsp;&emsp;通过拖动滚动条来实现内容滚动，比例关系为：
```
滚动条已移动距离/滚动条可移动距离= 内容已移动距离/内容可移动距离
```
```
<div id="box" style="height: 200px;width: 16px;display:inline-block;background-color:#F5F5F5;border-radius:10px;box-shadow:inset 0 0 6px rgba(0,0,0,0.3);position:relative;vertical-align:middle;">
    <div id="test" style="height: 60px;width: 16px;background-color:#D62929;box-shadow:inset 0 0 6px rgba(0,0,0,.3);border-radius:10px;position:absolute;"></div>
</div>
<span id="result" style="width: 100px;height: 200px;background-color:pink;display:inline-block;line-height:30px;vertical-align:middle;position:relative;overflow:hidden;"><div id="resultIn" style="position:absolute;top:0;">测试文字<br>测试文字<br>测试文字<br>测试文字<br>测试文字<br>测试文字<br>测试文字<br>测试文字<br>测试文字<br>测试文字<br>测试文字<br>测试文字<br></div></span>
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
function scrollbar(ele,str,max){
    var x0,x1,y0,y1,isMoving,radio;
    var max = result.offsetHeight - resultIn.offsetHeight;
    var mousedownHandler = function(e){
        e = e || event;
        x0 = ele.offsetLeft;
        y0 = ele.offsetTop;
        x1 = e.clientX;
        y1 = e.clientY;
        //按下鼠标时，表示正在运动
        isMoving = true;
        //x轴方向
        if(str == 'x'){
            ratio = max/(ele.parentNode.offsetWidth - ele.offsetWidth);
        //否则为y轴方向
        }else{
            var disY = e.clientY - ele.offsetTop;
            ratio =max/(ele.parentNode.offsetHeight - ele.offsetHeight);
        }
    }
    var mousemoveHandler = function(e){
        //如果没有触发down事件，而直接触发move事件，则函数直接返回
        if(!isMoving){
            return;
        }
        e = e || event;
        if(str == 'x'){
            var x2 = e.clientX;   
            var X = x0 + (x2 - x1);
            if(X < 0){X = 0;}
            var XMax = parseInt(ele.parentNode.clientWidth) - ele.offsetWidth;
            if(X > XMax){X = XMax;}
            ele.style.left = X + 'px';    
            resultIn.style.left = Math.round(ratio * X) + 'px';
        }else{
            var y2 = e.clientY;   
            var Y = y0 + (y2 - y1);
            if(Y < 0){Y = 0;}
            var YMax = parseInt(ele.parentNode.clientHeight) - ele.offsetHeight;
            if(Y > YMax){Y = YMax;}
            ele.style.top = Y + 'px';
            resultIn.style.top = Math.round(ratio * Y) + 'px';        
        }

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
    addEvent(document,'mousemove',mousemoveHandler);
    addEvent(document,'mouseup',mouseupHandler);

};

scrollbar(test);
</script>
```
<iframe style="width: 100%; height: 230px;" src="https://demo.xiaohuochai.site/js/dnd/scrollbar/s5.html" frameborder="0" width="230" height="240"></iframe>