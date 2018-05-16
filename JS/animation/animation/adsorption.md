# javascript动画系列第二篇——磁性吸附

&emsp;&emsp;上一篇，我们介绍了元素拖拽的实现。但在实际应用中，常常需要为拖拽的元素限定范围。而通过限定范围，再增加一些辅助的措施，就可以实现磁性吸附的效果

 

&nbsp;

### 范围限定

&emsp;&emsp;如果我们限定元素只可以在可视范围内移动，那么就需要对其进行范围限定

&emsp;&emsp;首先，先要搞清楚是可视区域限定被拖拽元素

&emsp;&emsp;左侧范围L0 = 0

&emsp;&emsp;右侧范围R0 = document.documentElement.clientWidth

&emsp;&emsp;上侧范围T0 = 0

&emsp;&emsp;下侧范围B0 = document.documentElement.clientHeight

&emsp;&emsp;元素的上下左右四边分别为

&emsp;&emsp;左侧边 L = offsetLeft

&emsp;&emsp;右侧边 R = offsetLeft + offsetWidth

&emsp;&emsp;上侧边 T = offsetTop

&emsp;&emsp;下侧边 B = offsetTop + offsetHeight

```
function limitedRange(obj,fn){
    var L0 = 0;
    var R0 = document.documentElement.clientWidth;
    var T0 = 0;
    var B0 = document.documentElement.clientHeight;
    var L = obj.offsetLeft;
    var R = obj.offsetLeft + obj.offsetWidth;
    var T = obj.offsetTop;
    var B = obj.offsetTop + obj.offsetHeight;

    if(L >= L0 && R <= R0 && T >= T0 && B <= B0){
        fn(obj);
    }
}
```
 

&nbsp;

### 拖拽范围

&emsp;&emsp;如果将范围限定在拖拽元素上，则需要一些改变

&emsp;&emsp;首先，限定条件并不是在范围内执行什么，而是不在范围内时，应该执行什么

&emsp;&emsp;由于在拖拽实现中，已经获取了元素距离可视区域左上角的X轴和Y轴的距离，所以不需要再通过offsetLeft和offsetTop进行重新获取

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
    var L0,R0,T0,B0,EH,EW;

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
        //鼠标按下时，获得此时的页面区域
        L0 = 0;
        R0 = document.documentElement.clientWidth;
        T0 = 0;
        B0 = document.documentElement.clientHeight;
        //鼠标按下时，获得此时的元素宽高
        EH = ele.offsetHeight;
        EW = ele.offsetWidth;
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
        /******范围限定*******/
        //获取鼠标移动时元素四边的瞬时值
        var L = X;
        var R = X + EW;
        var T = Y;
        var B = Y + EH;
        //在将X和Y赋值给left和top之前，进行范围限定。只有在范围内时，才进行相应的移动
        //如果脱离左侧范围，则left置L0
        if(L < L0){X = L0;}
        //如果脱离右侧范围，则left置为R0
        if(R > R0){X = R0 - EW;}
        //如果脱离上侧范围，则top置T0
        if(T < T0){Y = T0;}
        //如果脱离下侧范围，则top置为B0
        if(B > B0){Y = B0 - EH;}

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

<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/js/dnd/adsorption/a1.html" frameborder="0" width="230" height="240"></iframe>

&nbsp;

### 磁性吸附

&emsp;&emsp;磁性吸附只需要在范围限定的基础上，做一些修改即可

&emsp;&emsp;下列代码中，只要元素的四边，距离可视区域范围的四边小于50px，则元素将直接吸附对应的边上

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
    var L0,R0,T0,B0,EH,EW;

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
        //鼠标按下时，获得此时的页面区域
        L0 = 0;
        R0 = document.documentElement.clientWidth;
        T0 = 0;
        B0 = document.documentElement.clientHeight;
        //鼠标按下时，获得此时的元素宽高
        EH = ele.offsetHeight;
        EW = ele.offsetWidth;
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
        /******磁性吸附*******/
        //获取鼠标移动时元素四边的瞬时值
        var L = X;
        var R = X + EW;
        var T = Y;
        var B = Y + EH;
        //在将X和Y赋值给left和top之前，进行范围限定。只有在范围内时，才进行相应的移动
        //如果到达左侧的吸附范围，则left置L0
        if(L - L0 < 50){X = L0;}
        //如果到达右侧的吸附范围，则left置为R0
        if(R0 - R < 50){X = R0 - EW;}
        //如果到达上侧的吸附范围，则top置T0
        if(T - T0 < 50){Y = T0;}
        //如果到达右侧的吸附范围，则top置为B0
        if(B0 - B < 50){Y = B0 - EH;}

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
<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/js/dnd/adsorption/a2.html" frameborder="0" width="230" height="240"></iframe>