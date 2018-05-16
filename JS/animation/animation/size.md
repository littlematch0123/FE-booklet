# javascript动画系列第四篇——拖拽改变元素大小

&emsp;&emsp;拖拽可以让元素移动，也可以改变元素大小。本文将详细介绍拖拽改变元素大小的效果实现

 

&nbsp;

### 原理简介

&emsp;&emsp;拖拽让元素移动，是改变定位元素的left和top值实现的。而拖拽改变元素大小，则还需要改变元素的宽高

![](https://pic.xiaohuochai.site/blog/js_size1.gif)

 
&nbsp;

### 范围圈定

&emsp;&emsp;我们把改变元素大小的范围圈定在距离相应边10px的范围内

&emsp;&emsp;左侧边界L = obj.offsetLeft + 10

&emsp;&emsp;右侧边界R = obj.offsetLeft + obj.offsetWidth - 10

&emsp;&emsp;上侧边界T = obj.offsetTop + 10

&emsp;&emsp;下侧边界B = obj.offsetTop + obj.offsetHeight - 10

![](https://pic.xiaohuochai.site/blog/js_size2.jpg)

```
<div id="test" style="height: 100px;width: 100px;background-color: pink;">测试文字</div>
<script>
test.onmousemove = function(e){
    e = e || event;
    //元素边界确定
    var L0 = this.offsetLeft;
    var R0 = this.offsetLeft + this.offsetWidth;
    var T0 = this.offsetTop;
    var B0 = this.offsetTop + this.offsetHeight;
    //范围边界确定
    var L = L0 + 10;
    var R = R0 - 10;
    var T = T0 + 10;
    var B = B0 - 10;
    //范围确定
    var areaL = e.clientX < L;
    var areaR = e.clientX > R;
    var areaT = e.clientY < T;
    var areaB = e.clientY > B;
    //左侧范围
    if(areaL){
        this.style.cursor = 'w-resize';
    }
    //右侧范围
    if(areaR){
        this.style.cursor = 'e-resize';
    }
    //上侧范围
    if(areaT){
        this.style.cursor = 'n-resize';
    }    
    //下侧范围
    if(areaB){
        this.style.cursor = 's-resize';
    }    
    //左上范围
    if(areaL && areaT){
        this.style.cursor = 'nw-resize';
    }    
    //右上范围
    if(areaR && areaT){
        this.style.cursor = 'ne-resize';
    }    
    //左下范围
    if(areaL && areaB){
        this.style.cursor = 'sw-resize';
    }    
    //右下范围
    if(areaR && areaB){
        this.style.cursor = 'se-resize';
    }    
    //中间范围    
    if(!areaL && !areaR && !areaT && !areaB){
        this.style.cursor = 'default';
    }
}
</script>
```
<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/js/dnd/size/s1.html" frameborder="0" width="230" height="240"></iframe>


&nbsp;

### 大小改变

&emsp;&emsp;处于左侧范围时，改变元素的left和width值

&emsp;&emsp;处于右侧范围时，改变元素的left值

&emsp;&emsp;处于上侧范围时，改变元素的top和height值

&emsp;&emsp;处于下侧范围时，改变元素的height值

&emsp;&emsp;注意：元素改变前的状态是指按下鼠标的瞬时元素的状态

```
<div id="test" style="height: 100px;width: 100px;background-color: pink;position:absolute;top:100px;left:200px;">测试文字</div>
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
    var x0,y0,x1,y1,EW,EH,isChanging;
    var ele = document.getElementById('test');
    var mousedownHandler = function(e){
        e = e || event;
        //获取元素距离定位父级的x轴及y轴距离
        x0 = ele.offsetLeft;
        y0 = ele.offsetTop;
        //获取此时鼠标距离视口左上角的x轴及y轴距离
        x1 = e.clientX;
        y1 = e.clientY;
        //获取此时元素的宽高
        EW = ele.offsetWidth;
        EH = ele.offsetHeight;        
        //按下鼠标时，表示正在改变尺寸
        isChanging = true;
    }
    var mousemoveHandler = function(e){
        e = e || event;
        //元素边界确定
        var L0 = ele.offsetLeft;
        var R0 = ele.offsetLeft + ele.offsetWidth;
        var T0 = ele.offsetTop;
        var B0 = ele.offsetTop + ele.offsetHeight;
        //范围边界确定
        var L = L0 + 10;
        var R = R0 - 10;
        var T = T0 + 10;
        var B = B0 - 10;
        //范围确定
        var areaL = e.clientX < L;
        var areaR = e.clientX > R;
        var areaT = e.clientY < T;
        var areaB = e.clientY > B;
        //左侧范围
        if(areaL){ele.style.cursor = 'w-resize';}
        //右侧范围
        if(areaR){ele.style.cursor = 'e-resize';}
        //上侧范围
        if(areaT){ele.style.cursor = 'n-resize';}    
        //下侧范围
        if(areaB){ele.style.cursor = 's-resize';}    
        //左上范围
        if(areaL && areaT){ele.style.cursor = 'nw-resize';}
        //右上范围
        if(areaR && areaT){ele.style.cursor = 'ne-resize';}
        //左下范围
        if(areaL && areaB){ele.style.cursor = 'sw-resize';}
        //右下范围
        if(areaR && areaB){ele.style.cursor = 'se-resize';}
        //中间范围    
        if(!areaL && !areaR && !areaT && !areaB){ele.style.cursor = 'default';}

        //获取此时鼠标距离视口左上角的x轴及y轴距离
        var x2 = e.clientX;
        var y2 = e.clientY;   
        //如果改变元素尺寸功能开启
        if(isChanging){
            //处于左侧范围
            if(areaL){
                ele.style.left = x0 + (x2 - x1)  + 'px';
                ele.style.width = EW + (x1 - x2) + 'px'; 
            }
            //处于右侧范围
            if(areaR){ele.style.width = EW + (x2 - x1)+ 'px';}
            //处于上侧范围
            if(areaT){
                ele.style.top = y0 + (y2 - y1) + 'px';
                ele.style.height = EH + (y1 - y2) + 'px';
            }
            //处于下侧范围
            if(areaB){ele.style.height = EH + (y2 - y1) + 'px'; }               
        } 
    }
    var mouseupHandler = function(e){
        //鼠标抬起时，表示停止运动
        isChanging = false;
    }
    addEvent(ele,'mousedown',mousedownHandler);
    addEvent(ele,'mousemove',mousemoveHandler);
    addEvent(ele,'mouseup',mouseupHandler)

})();
</script>    
```

<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/js/dnd/size/s2.html" frameborder="0" width="230" height="240"></iframe>

&nbsp;

### 代码优化

&emsp;&emsp;与拖拽移动元素一样，拖拽改变元素大小也存在同样的问题

&emsp;&emsp;问题一：文字及图片具有原生的拖放行为，通过取消默认行为可解决。IE8-浏览器不支持，使用全局捕获来实现IE兼容

&emsp;&emsp;问题二：拖放过快，鼠标移动速度快于mousemove触发速度时，鼠标脱离元素，使后续事件无法发生。把mousemove事件加在document上，即可解决

&emsp;&emsp;问题三：元素大小改变需要有范围限制

```
<div id="test" style="height: 100px;width: 100px;background-color: pink;position:absolute;top:50px;left:50px;">测试文字</div>
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
    var x0,y0,x1,y1,EW,EH,isChanging;
    var ele = document.getElementById('test');
    var mousedownHandler = function(e){
        e = e || event;
        //获取元素距离定位父级的x轴及y轴距离
        x0 = ele.offsetLeft;
        y0 = ele.offsetTop;
        //获取此时鼠标距离视口左上角的x轴及y轴距离
        x1 = e.clientX;
        y1 = e.clientY;
        //获取此时元素的宽高
        EW = ele.offsetWidth;
        EH = ele.offsetHeight;        
        //按下鼠标时，表示正在改变尺寸
        isChanging = true;
    }
    var mousemoveHandler = function(e){
        e = e || event;
        //元素边界确定
        var L0 = ele.offsetLeft;
        var R0 = ele.offsetLeft + ele.offsetWidth;
        var T0 = ele.offsetTop;
        var B0 = ele.offsetTop + ele.offsetHeight;
        //范围边界确定
        var L = L0 + 10;
        var R = R0 - 10;
        var T = T0 + 10;
        var B = B0 - 10;
        //范围确定
        var areaL = e.clientX < L;
        var areaR = e.clientX > R;
        var areaT = e.clientY < T;
        var areaB = e.clientY > B;
        //左侧范围
        if(areaL){ele.style.cursor = 'w-resize';}
        //右侧范围
        if(areaR){ele.style.cursor = 'e-resize';}
        //上侧范围
        if(areaT){ele.style.cursor = 'n-resize';}    
        //下侧范围
        if(areaB){ele.style.cursor = 's-resize';}    
        //左上范围
        if(areaL && areaT){ele.style.cursor = 'nw-resize';}
        //右上范围
        if(areaR && areaT){ele.style.cursor = 'ne-resize';}
        //左下范围
        if(areaL && areaB){ele.style.cursor = 'sw-resize';}
        //右下范围
        if(areaR && areaB){ele.style.cursor = 'se-resize';}
        //中间范围    
        if(!areaL && !areaR && !areaT && !areaB){ele.style.cursor = 'default';}

        //获取此时鼠标距离视口左上角的x轴及y轴距离
        var x2 = e.clientX;
        var y2 = e.clientY;   
        //如果改变元素尺寸功能开启
        if(isChanging){
            //处于左侧范围
            if(areaL){
                var eleL = x0 + (x2 - x1)  + 'px';
                var eleW = EW + (x1 - x2) + 'px'; 
            }
            //处于右侧范围
            if(areaR){var eleW = EW + (x2 - x1)+ 'px';}
            //处于上侧范围
            if(areaT){
                var eleT = y0 + (y2 - y1) + 'px';
                var eleH = EH + (y1 - y2) + 'px';
            }
            //处于下侧范围
            if(areaB){var eleH = EH + (y2 - y1) + 'px'; }  
            //范围限定
            if(parseInt(eleW) < 60){eleW = '60px';}    
            if(parseInt(eleH) < 60){eleH = '60px';}
            //赋值
            if(eleW != undefined){ele.style.width = eleW;}
            if(eleH != undefined){ele.style.height = eleH;}
            if(eleT != undefined){ele.style.top = eleT;}
            if(eleL != undefined){ele.style.left = eleL;}              
        } 
    }
    var mouseupHandler = function(e){
      //鼠标抬起时，表示停止运动
      isChanging = false;
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
<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/js/dnd/size/s3.html" frameborder="0" width="230" height="240"></iframe>