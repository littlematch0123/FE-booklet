# javascript运动系列第四篇——抖动

&emsp;&emsp;在运动系列中，前面分别介绍了匀速运动、变速运动和曲线运动。下面介绍一种特殊的运动形式——抖动

 

&nbsp;

### 原理介绍

&emsp;&emsp;抖动其实是往复运动的一种特殊形式，只不过往复运动是一种无摩擦力的无限运动，且以速度为参照依据；而抖动以位置作为参照依据，最终停在起始点

&emsp;&emsp;在网页中最常见的一种抖动效果应该是窗口抖动提示了

![](https://pic.xiaohuochai.site/blog/js_shake1.gif)

&emsp;&emsp;抖动元素从起始点开始，先向右移动最大距离len，然后移动到对称的左边位置；然后再向右移动稍微小一点的距离，再移动到对称的左边位置；以此循环，最终元素停止在起始点

 

&nbsp;

### 代码实现

&emsp;&emsp;抖动在代码实现上，无非就是通过定时器，每隔一段时间让left或top值进行变化

&emsp;&emsp;在运动实现中，有两种距离变化的思路

思路一
```
div.style.left = div.offsetLeft + value;
```
&emsp;&emsp;每次都获取元素的当前样式，再与变化的value值进行运算

思路二
```
left = div.offsetLeft;
......
div.style.left = left + value;
```
&emsp;&emsp;在定时器开启之前，获取元素的初始样式，再与变化的value值进行运算

&emsp;&emsp;从抖动实现上来说，使用第二种方法，把距离变化完全交给value值变化来实现较为简单

&emsp;&emsp;所以，代码实现的关键就是了解value是如何变化的

&emsp;&emsp;假设最远距离为目标target，同方向的距离间隔为步长step。如果用数字更直观的表示，value的值类似于4、-4、2、-2、0。所以还需要一个变量dir来控制起始抖动方向，定时器每运动一次都要对dir进行更改

```
//定时器开启前的变量声明
dir = 1;
step = 0;
left = div.offsetLeft
//定时器里面的代码
value = dir*(target - step);
if(step >= target){
    step = target
}
div.style.left = left + value + 'px';
if(dir === -1){
    step++;    
}
dir = -dir;
```
&emsp;&emsp;将抖动效果封装为shakeMove.js

```
function getCSS(obj,style){
    if(window.getComputedStyle){
        return getComputedStyle(obj)[style];
    }
    return obj.currentStyle[style];
} 
function shakeMove(json){
    //声明要进行抖动的元素
    var obj = json.obj;
    //声明元素抖动的最远距离
    var target = json.target;
    //默认值为20
    target = Number(target) || 20;
    //声明元素的变化样式
    var attr = json.attr;
    //默认为'left' 
    attr = attr || 'left'; 
    //声明元素的起始抖动方向
    var dir = json.dir;
    //默认为'1'，表示开始先向右抖动
    dir = Number(dir) || '1';
    //声明元素每次抖动的变化幅度
    var stepValue = json.stepValue;
    stepValue = Number(stepValue) || 2;
    //声明回调函数 
    var fn = json.fn;
    //声明步长step
    var step = 0;
    //保存样式初始值
    var attrValue = parseFloat(getCSS(obj,attr));
    //声明参照值value
    var value;
    //清除定时器
    if(obj.timer){return;}
    //开启定时器
    obj.timer = setInterval(function(){
        //抖动核心代码
        value = dir*(target - step);
        //当步长值大于等于最大距离值target时
        if(step >= target){
            step = target
        }
        //更新样式值
        obj.style[attr] = attrValue + value + 'px';
        //当元素到达起始点时，停止定时器
        if(step == target){
            clearInterval(obj.timer);
            obj.timer = 0;
            //设置回调函数
            fn && fn.call(obj);    
        }  
        //如果此时为反向运动，则步长值变化
        if(dir === -1){
            step = step + stepValue;    
        }
        //改变方向
        dir = -dir; 

    },50);        
} 
```
 

&nbsp;

### 实例应用

&emsp;&emsp;下面利用封装的shakeMove来实现一些简单的抖动应用

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Document</title>
<style>
.test{
    height: 50px;
    width: 50px;
    position: absolute;
    top: 50px;
}    
</style>
</head>
<body>
<div id="box">
    <div class="test" style="left:10px;background:lightblue"></div>
    <div class="test" style="left:70px;background:lightgreen"></div>
    <div class="test" style="left:130px;background:pink"></div>
    <div class="test" style="left:190px;background:lightcoral"></div>
</div>
<script src="http://files.cnblogs.com/files/xiaohuochai/shakeMove.js"></script>
<script>
var aDiv = box.getElementsByTagName('div');
for(var i = 0; i < aDiv.length; i++){
    aDiv[i].onmouseover = function(){
        shakeMove({obj:this,attr:'top'});
    }
}
</script>
</body>
</html>
```
<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/js/move/shake/s1.html" frameborder="0" width="230" height="240"></iframe>