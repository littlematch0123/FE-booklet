# javascript动画系列第三篇——碰撞检测

&emsp;&emsp;前面分别介绍了拖拽模拟和磁性吸附，当可视区域内存在多个可拖拽元素，就出现碰撞检测的问题，这也是javascript动画的一个经典问题。本篇将详细介绍碰撞检测

 

&nbsp;

### 原理介绍

&emsp;&emsp;碰撞检测的方法有很多，接下来使用九宫格分析法

&emsp;&emsp;假设黄色元素要与红色元素进行碰撞。将红色元素所处的区域分为9部分，自身处于第9部分，周围还存在8个部分。只要黄色元素进入红色元素的第9部分，就算碰撞。否则，都算未碰撞

![](https://pic.xiaohuochai.site/blog/js_impact.jpg)

&emsp;&emsp;总共分为以下5种情况：

&emsp;&emsp;1、处于上侧未碰撞区域——1、2、3区域

&emsp;&emsp;2、处于右侧未碰撞区域——3、4、5区域

&emsp;&emsp;3、处于下侧未碰撞区域——5、6、7区域

&emsp;&emsp;4、处于左侧未碰撞区域——1、7、8区域

&emsp;&emsp;5、处于碰撞区域——9区域

 

&nbsp;

### 代码实现

&emsp;&emsp;我们把上面的原理用代码实现

```
function bump(obj,objOther,bgColor){

    /***被碰元素***/
    //被碰元素左侧距离可视区域左侧的距离
    var L0 = obj.offsetLeft;
    //被碰元素上侧距离可视区域上侧的距离
    var T0 = obj.offsetTop;
    //被碰元素右侧距离可视区域右侧的距离
    var R0 = obj.offsetLeft + obj.offsetWidth;
    //被碰元素下侧距离可视区域下侧的距离
    var B0 = obj.offsetTop + obj.offsetHeight;
    /**侵入元素**/
    var L = objOther.offsetLeft;
    var T = objOther.offsetTop;
    var R = objOther.offsetLeft + objOther.offsetWidth;
    var B = objOther.offsetTop + objOther.offsetHeight;    

    /*******碰撞检测*******/
    //上侧区域if(B < T0)
    //左侧区域if(R < L0)
    //右侧区域if(L > R0)
    //下侧区域if(T > B0)
    
    //碰撞区域
    if(B >= T0 && R >= L0 && L <= R0 && T <= B0){
        obj.style.backgroundColor = 'red';
    }else{
        obj.style.backgroundColor = bgColor;
    }
}
```
 

&nbsp;

### 完整效果

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/js/dnd/impact/i1.html" frameborder="0" width="230" height="240"></iframe>

```
<div id="test1" style="height: 100px;width: 100px;background:pink;position:absolute;top:0;left:0;">元素一</div>
<div id="test2" style="height: 100px;width: 100px;background:orange;position:absolute;top:150px;left:150px;">元素二</div>
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
function getCSS(obj,style){
    if(window.getComputedStyle){
        return getComputedStyle(obj)[style];
    }
    return obj.currentStyle[style];
}    
function bump(obj,objOther){
    bump.objBGColor = (bump.objBGColor === undefined) ? getCSS(obj,'backgroundColor') : bump.objBGColor;
    bump.objOtherBGColor = (bump.objOtherBGColor === undefined) ? getCSS(objOther,'backgroundColor') : bump.objOtherBGColor;    
    /***被碰元素***/
    //被碰元素左侧距离可视区域左侧的距离
    var L0 = obj.offsetLeft;
    //被碰元素上侧距离可视区域上侧的距离
    var T0 = obj.offsetTop;
    //被碰元素右侧距离可视区域右侧的距离
    var R0 = obj.offsetLeft + obj.offsetWidth;
    //被碰元素下侧距离可视区域下侧的距离
    var B0 = obj.offsetTop + obj.offsetHeight;
    /**侵入元素**/
    var L = objOther.offsetLeft;
    var T = objOther.offsetTop;
    var R = objOther.offsetLeft + objOther.offsetWidth;
    var B = objOther.offsetTop + objOther.offsetHeight;    

    /*******碰撞检测*******/
    //上侧区域if(B < T0)
    //左侧区域if(R < L0)
    //右侧区域if(L > R0)
    //下侧区域if(T > B0)
    
    //碰撞区域
    if(B >= T0 && R >= L0 && L <= R0 && T <= B0){
        obj.style.backgroundColor = objOther.style.backgroundColor ='red';
    }else{
        obj.style.backgroundColor = bump.objBGColor;
        objOther.style.backgroundColor = bump.objOtherBGColor;

    }
}

function drag(ele){
    var x0,y0,x1,y1,isMoving;
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

        bump(test2,test1);
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

};

drag(test1);
drag(test2);
</script>    
```