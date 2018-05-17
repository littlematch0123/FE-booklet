# javascript运动系列第二篇——变速运动

&emsp;&emsp;前面介绍过匀速运动的实现及注意事项，本文在匀速运动的基础上，更进一步，实现各种变速运动，包括加速运动、减速运动、缓冲运动、重力运动和弹性运动

 

&nbsp;

### 准备工作

【匀速运动】

&emsp;&emsp;在原生javascript中实现运动的主要工具是定时器，通过设置固定的间隔时间，使元素在确定的间隔时间内实现距离的变化。而运动变化的主要表现形式是距离的变化

&emsp;&emsp;例如，定时器频率可如下列代码所示，设置为30ms。每30ms对s的值进行更新，使其增加一个步长step的距离，来实现视觉上的元素运动效果
```
setInterval(function(){
    s = s + step
},30)
```
&emsp;&emsp;而step的值如何变化就决定了何种运动形式
```
s = v * t;
```
&emsp;&emsp;当step是一个恒定的值(如10)，则说明相同时间间隔内，距离变化相同，说明速度是一个恒定的值，该运动为匀速运动

```
<button id="btn">开始运动</button>
<button id="reset">还原</button>
<div id="test" style="height: 50px;width: 50px;background-color: pink;position:absolute;left:0;"></div>
<div style="background-color:red;width:1px;height:50px;position:absolute;left:150px;"></div>
<script>
var timer;
reset.onclick = function(){history.go();}
btn.onclick = function(){
    clearInterval(timer);
    //每30ms，位移变化10px
    var step = 10;
    //声明当前值变量cur
    var cur;
    var target = parseFloat('150px');
    timer = setInterval(function(){
        cur = test.offsetLeft;
        //若步长设置值使得元素超过目标点时，将步长设置值更改为目标点值 - 当前值
        if(cur+step-target>0){
            step = target - cur;
        }
        test.style.left = cur + step + 'px';
        if(step == target - cur){
            clearInterval(timer);
        }
    },20);
}
</script>
```
<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/move/variable/v1.html" frameborder="0" width="230" height="240"></iframe>

【小数解析】

&emsp;&emsp;在CSS解析中，是可以识别小数的；但在javascript中，不同的解析方式对于小数识别有区别

&emsp;&emsp;如果使用getComputedStyle或currentStyle是可以识别小数的，但是使用offset值，则返回对应的四舍五入值

&emsp;&emsp;注意：IE7-浏览器不支持小数
```
<div id="test" style="height: 100px;width: 100.7px;"></div>
<script>
console.log(test.offsetWidth);//101
console.log(getComputedStyle(test).width);//'100.7px'
</script>
```
&emsp;&emsp;在上面的代码中，元素以100.7px的宽度进行渲染；但是，通过offsetWidth获取的值是100.7四舍五入后的值101；通过getComputedStyle计算样式获取的值是实际渲染值100.7px

&emsp;&emsp;所以，为了保证结果准备尽量使用计算样式，而不要使用offset值

```
function getCSS(obj,style){
    if(window.getComputedStyle){
        return getComputedStyle(obj)[style];
    }
    return obj.currentStyle[style];
}  
```
 

&nbsp;

### 加速运动

&emsp;&emsp;说到加速运动，必须要提到一个物理名词——加速度
```
v = v0 + a*t;
s = (v0+v)*t/2 = v0*t + 1/2*a*t*t;
```
&emsp;&emsp;如果v0是初始速度，v1是定时器第n次经过20ms之后元素变化后的速度，v2是定时器第n+1次经过20ms之后元素变化后的速度
```
s1 = v0*t1 + 1/2*a*t1*t1;
s2 = v0*t2 + 1/2*a*t2*t2;
s2 - s1 = (t2-t1)(v0+ 1/2*a*(t2+t1)) = 0.02(v0+a*(0.02n+0.01))
```
&emsp;&emsp;所以，下列代码中的步长step值是0.02(v0+a*(0.02n+0.01))
```
step = 0.02(v0+a*(0.02n+0.01)) = 2/10000(100*v0+a(2n+1))
```
&emsp;&emsp;v0代表初始速度，a代表加速度，n代表定时器执行的次数

&emsp;&emsp;由于n的值是以+1的形式递增，当a为正数时，step值不断增加，则为加速运动；当a为负数时，step值不断减小，则为减速运动

&emsp;&emsp;假设初始速度v0等于0，加速度a等于200，则step = 0.04(2n+1)
```
setInterval(function(){
    s = s + step
},20)
```
```
<button id="btn">开始运动</button>
<button id="reset">还原</button>
<div id="test" style="height: 50px;width: 50px;background-color: pink;position:absolute;left:0;"></div>
<div style="background-color:red;width:1px;height:50px;position:absolute;left:200px;"></div>
<script>
function getCSS(obj,style){
    if(window.getComputedStyle){
        return getComputedStyle(obj)[style];
    }
    return obj.currentStyle[style];
}  
reset.onclick = function(){history.go();}
btn.onclick = function(){
    //声明定时器运行次数
    var index=-1;
    //声明步长值step
    var step;
    //声明当前值cur
    var cur;
    //声明目标值
    var target = parseFloat('200px');
    clearInterval(test.timer);
    test.timer = setInterval(function(){
        //更新定时器的工作次数
        index++;
        //更新步长值
        step = 0.04*(2*index+1);
        //更新当前值
        cur = parseFloat(getCSS(test,'left'));
        //若步长设置值使得元素超过目标点时，将步长设置值更改为目标点值 - 当前值
        if(cur+step-target>0){
            step = target - cur;
        }
        //更新left值
        test.style.left = cur + step + 'px';
        //当元素到达目标点时，停止定时器
        if(step == target - cur){
            clearInterval(test.timer);
        }    
    },20);
}
</script>
```

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/move/variable/v2.html" frameborder="0" width="230" height="240"></iframe>

&nbsp;

### 重力运动

&emsp;&emsp;重力运动是加速运动的特殊情况，相当于初始速度为0，加速度为9.8m/s2的特值情况

&emsp;&emsp;这时，涉及到长度单位m变换为像素单位px的过程
```
1cm = 37.8px
1m = 100cm
```
&emsp;&emsp;所以9.6m = 9.6*37.8*100px = 36288px

&emsp;&emsp;step = 0.02(v0+a*(0.02n+0.01)) = 2/10000(100*v0+a(2n+1))

&emsp;&emsp;当v0=0，a=36288时，step = 7.2576(2n+1)

&emsp;&emsp;这里，我们把运动的距离设置为300px，实际上，转换为常用长度单位时，只有8cm。如果，我们要以300px模拟8m的重力效果，则可以粗略地将加速度缩小为原来的1/100

&emsp;&emsp;此时，修正过的step值为0.072576(2n+1)

```
<button id="btn">开始运动</button>
<button id="reset">还原</button>
<div id="test" style="height: 100px;width: 100px;background-color: pink;position:absolute;top:30px;"></div>
<div style="background-color:red;height:1px;width:100px;position:absolute;top:300px;"></div>
<script>
function getCSS(obj,style){
    if(window.getComputedStyle){
        return getComputedStyle(obj)[style];
    }
    return obj.currentStyle[style];
}  
reset.onclick = function(){history.go();}
btn.onclick = function(){
    //声明定时器运行次数
    var index=-1;
    //声明步长值step
    var step;
    //声明当前值cur
    var cur;
    //声明目标值
    var target = parseFloat('300px');
    clearInterval(test.timer);
    test.timer = setInterval(function(){
        //更新定时器的工作次数
        index++;
        //更新步长值
        step = 0.072576*(2*index+1);
        //更新当前值
        cur = parseFloat(getCSS(test,'top'));
        //若步长设置值使得元素超过目标点时，将步长设置值更改为目标点值 - 当前值
        if(cur+step-target>0){
            step = target - cur;
        }
        //更新top值
        test.style.top = cur + step + 'px';
        //当元素到达目标点时，停止定时器
        if(step == target - cur){
            clearInterval(test.timer);
        }    
    },20);
}
</script>
```
<iframe style="width: 100%; height: 430px;" src="https://demo.xiaohuochai.site/js/move/variable/v3.html" frameborder="0" width="230" height="240"></iframe>

&nbsp;

### 减速运动

&emsp;&emsp;相对于加速运动来说，减速运动有一个临界点的问题。如果元素运动到指定的位置前，速度已经减到0，则停到当前速度为0的位置

&emsp;&emsp;同样以定时器20ms的频率为例，位移变化的step值是0.02(v0+a*(0.02n+0.01))

&emsp;&emsp;假设初始速度v0为100px/s，加速度为-10，则step = 0.02(99.9-0.2n)

```
<button id="btn">开始运动</button>
<button id="reset">还原</button>
<div id="test" style="height: 100px;width: 100px;background-color: pink;position:absolute;left:0;"></div>
<div style="background-color:red;width:1px;height:100px;position:absolute;left:500px;"></div>
<script>
function getCSS(obj,style){
    if(window.getComputedStyle){
        return getComputedStyle(obj)[style];
    }
    return obj.currentStyle[style];
}  
reset.onclick = function(){history.go();}
btn.onclick = function(){
    //声明定时器运行次数
    var index=-1;
    //声明步长值step
    var step;
    //声明当前值cur
    var cur;
    //声明目标值
    var target = parseFloat('500px');
    clearInterval(test.timer);
    test.timer = setInterval(function(){
        //更新定时器的工作次数
        index++;
        //更新步长值
        step = 0.02*(99.9-0.2*index);
        if(step < 0){
            clearInterval(test.timer);
        }
        //更新当前值
        cur = parseFloat(getCSS(test,'left'));
        //若步长设置值使得元素超过目标点时，将步长设置值更改为目标点值 - 当前值
        if(cur+step-target>0){
            step = target - cur;
        }
        //更新left值
        test.style.left = cur + step + 'px';
        console.log(index,cur,step,target,test.style.left)
        //当元素到达目标点时，停止定时器
        if(step == target - cur){
            clearInterval(test.timer);
        }    
    },20);
}
</script>
```
<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/move/variable/v4.html" frameborder="0" width="230" height="240"></iframe>

&nbsp;

### 缓冲运动

&emsp;&emsp;缓冲运动是减速运动的一种特殊形式，指元素做减速运动，速度减到0时，恰好停在目标点位置

&emsp;&emsp;以定时器20ms的频率为例
```
step = 0.02(v0+a*(0.02n+0.01)) = 2/10000(100*v0+a(2n+1))
```
&emsp;&emsp;假设初始速度v0为100px/s，最终的v为0
```
v = v0 - a*t
s = (v0+v)/2*t
```
&emsp;&emsp;所以，a = -5000/s ，step = 2 - (2n+1)/s

```
<button id="btn">开始运动</button>
<button id="reset">还原</button>
<div id="test" style="height: 50px;width: 50px;background-color: pink;position:absolute;left:0;"></div>
<div style="background-color:red;width:1px;height:50px;position:absolute;left:150px;"></div>
<script>
function getCSS(obj,style){
    if(window.getComputedStyle){
        return getComputedStyle(obj)[style];
    }
    return obj.currentStyle[style];
}  
reset.onclick = function(){history.go();}
btn.onclick = function(){
    //声明定时器运行次数
    var index=-1;
    //声明步长值step
    var step;
    //声明当前值cur
    var cur;
    //声明目标值
    var target = parseFloat('150px');
    clearInterval(test.timer);
    test.timer = setInterval(function(){
        //更新定时器的工作次数
        index++;
        //更新步长值
        step = 2 - (2*index+1)/target;
        //更新当前值
        cur = parseFloat(getCSS(test,'left'));
        //若步长设置值使得元素超过目标点时，将步长设置值更改为目标点值 - 当前值
        if((cur+step-target)*step>0){
            step = target - cur;
        }
        //更新left值
        test.style.left = cur + step + 'px';
        //当元素到达目标点时，停止定时器
        if(step == target - cur){
            clearInterval(test.timer);
        }    
    },20);
}
</script>
```

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/move/variable/v5.html" frameborder="0" width="230" height="240"></iframe>

&nbsp;

### 加减速运动

&emsp;&emsp;加减速运动是加速运动和减速运动的结合。前半段运动时，做加速运动。到达指定点时，做减速运动，最终到达终点停止

&emsp;&emsp;step = 0.02(v0+a*(0.02n+0.01)) = 2/10000(100*v0+a(2n+1))

&emsp;&emsp;假设v0=0，最终速度v=100，距离s = 200

&emsp;&emsp;所以a = v*v/(2*s) = 5000/s = 25

&emsp;&emsp;则加速运动的step = (2n+1)/s =(2n+1)/200

&emsp;&emsp;在加速运动中，s=1/2*a*t*t;

&emsp;&emsp;所以加速运动总时间t = s/50 = 4，定时器运行次数n = t/0.02=200次

&emsp;&emsp;减速运动的step=0.02(v0-(2n+1))，此时的v0相应于加速运动结束时的瞬时速度100，a= -5000/s = -25

&emsp;&emsp;所以，减速运动的step=2-(2n+1)/s = 2-(2n+1)/200

```
<button id="btn">开始运动</button>
<button id="reset">还原</button>
<div id="test" style="height: 50px;width: 50px;background-color: pink;position:absolute;left:0;"></div>
<div style="background-color:blue;width:1px;height:50px;position:absolute;left:100px;"></div>
<div style="background-color:red;width:1px;height:50px;position:absolute;left:200px;"></div>
<script>
function getCSS(obj,style){
    if(window.getComputedStyle){
        return getComputedStyle(obj)[style];
    }
    return obj.currentStyle[style];
}  
reset.onclick = function(){history.go();}
btn.onclick = function(){
    //声明定时器运行次数
    var index=-1;
    //声明步长值step
    var step;
    //声明当前值cur
    var cur;
    //声明目标值
    var target = parseFloat('200px');
    clearInterval(test.timer);
    test.timer = setInterval(function(){
        //更新定时器的工作次数
        index++;
        //当index为100时，说明进行完一次运动，则将index置0
        if(index == 100){
            index = 0;
        };     
        //更新当前值
        cur = parseFloat(getCSS(test,'left'));
        //更新步长值
        //加速运动
        if(cur < 100){
            step =(2*index+1)/(target/2);    
        }else{
        //减速运动
            step = 2-(2*index+1)/(target/2);
        }
        //若步长设置值使得元素超过目标点时，将步长设置值更改为目标点值 - 当前值
        if((cur+step-target)*step>0){
            step = target - cur;
        }
        //更新left值
        test.style.left = cur + step + 'px';
        //当元素到达目标点时，停止定时器
        if(step == target - cur){
            clearInterval(test.timer);
        }    
    },20);
}
</script>
```
<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/move/variable/v6.html" frameborder="0" width="230" height="240"></iframe>


&nbsp;

### 往复运动

&emsp;&emsp;往复运动相当于加减速运动的升级版。元素先加速后减速，当减速到0时，元素并不停止，而是做反向的先加速后减速运动，如此反复

&emsp;&emsp;加速运动和减速运动的公式与加减速运动的公式相同

&emsp;&emsp;加速运动:step = (2n+1)/s =(2n+1)/200

&emsp;&emsp;减速运动:step = 2-(2n+1)/s = 2-(2n+1)/200

```
<button id="btn">开始运动</button>
<button id="reset">还原</button>
<div id="test" style="height: 50px;width: 50px;background-color: pink;position:absolute;left:0;"></div>
<div style="background-color:green;width:1px;height:50px;position:absolute;left:0px;"></div>
<div style="background-color:blue;width:1px;height:50px;position:absolute;left:100px;"></div>
<div style="background-color:red;width:1px;height:50px;position:absolute;left:200px;"></div>
<script>
function getCSS(obj,style){
    if(window.getComputedStyle){
        return getComputedStyle(obj)[style];
    }
    return obj.currentStyle[style];
}  
reset.onclick = function(){history.go();}
btn.onclick = function(){
    //声明定时器运行次数
    var index=-1;
    //声明步长值step
    var step;
    //声明当前值cur
    var cur;
    //声明目标值
    var target = parseFloat('200px');
    //声明运动的次数，一个方向的加速和减速运动总共算一个运动
    var num=0;
    clearInterval(test.timer);
    test.timer = setInterval(function(){
        //更新定时器的工作次数
        index++;
        //当index为100时，说明进行完一次运动，则将index置0
        if(index == 100){
            index = 0;
            num += 0.5;
        };     
        //更新当前值
        cur = parseFloat(getCSS(test,'left'));
        //更新步长值
        if(Math.floor(num)%2 == 0){
            //加速运动
            if(cur < 100){
                step =(2*index+1)/100;    
            }else{
            //减速运动
                step = 2-(2*index+1)/100;
            }
        }else{
            //加速运动
            if(cur > 100){
                step =-(2*index+1)/100;    
            }else{
            //减速运动
                step = (2*index+1)/100-2;
            }    
        }    
        //更新left值
        test.style.left = cur + step + 'px';
    },20);
}
</script>
```
<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/move/variable/v7.html" frameborder="0" width="230" height="240"></iframe>

&nbsp;

### 变速函数

&emsp;&emsp;以上介绍的各种变速运动其中大部分代码相同，只是步长公式不同而已。所以，我们可以把变速运动也封装成一个函数形式，命名为varMove.js

```
function getCSS(obj,style){
    if(window.getComputedStyle){
        return getComputedStyle(obj)[style];
    }
    return obj.currentStyle[style];
} 
function varMove(json){
    var obj = json.obj;
    var attr = json.attr;
    var target = json.target;
    var type = json.type;
    var value = json.value;
    var fn = json.fn;
    //如果没有建立定时器对象，则在obj下建立定时器对象
    if(!obj.timers){obj.timers = {};}
    //清除定时器
       if(obj.timers[attr]){return;}
    //声明定时器运行次数
    var index=-1;
    //声明当前值变量cur
    var cur = parseFloat(getCSS(obj,attr));
    //声明距离为distance
    var distance= target - cur;
    //声明运动的次数，一个方向的加速和减速运动总共算一个运动
    var num=0;
    //开启定时器
    obj.timers[attr] = setInterval(function(){
    //更新定时器的工作次数
    index++;     
    //获取样式当前值并赋值给cur
    cur = parseFloat(getCSS(obj,attr));
    //根据不同的type值来设置步长
     switch(type){
         //如果type设置为'linear'，则为匀速运动
         case 'linear':
             //linear的value值为步长step
             step = Number(value) || 10;
             break;
         //如果type设置为'speedup'，则为加速运动
         case 'speedup':
             //'speedup'的value值为总时间t
             value = Number(value) || 2;
             step = (4*distance/(value*value*10000))*(2*index+1)
             break;
         //如果type设置为'gravity'，则为重力运动
         case 'gravity':
             step = 0.072576*(2*index+1);
             break;
         //如果type设置为'speeddown'，则为减速运动
         //'speeddown'的value值为初始速度v0
         case 'speeddown':
             value = Number(value) || 100;
             step = (2/10000)*(100*value-(value*value)/(2*distance)*(2*index+1))
             break;
         //如果type设置为'speedupAndDown'，则为先加速后减速运动
         //'speedupAndDown'的value值为总时间t
         case 'speedupAndDown':
             value = Number(value) || 2;
            //当index为25*value时，说明进行完一次运动，则将index置0
            if(index == 25*value){
                index = 0;
            };  
            //加速运动
            if(cur < distance/2){
                step =8*distance/(10000*value*value)*(2*index+1);    
            }else{
            //减速运动
                step = distance/(25*value)-8*distance/(10000*value*value)*(2*index+1);
            }
             break;
         //如果type设置为'repeat'，则为往复运动
         //'repeat'的value值为一次运动(一次加速和一次减速)的时间
         case 'repeat':
            value = Number(value) || 2;
            //当index为25*value时，说明进行完一次运动，则将index置0
            if(index == 25*value){
                index = 0;
                num += 0.5;
            };  
            if(Math.floor(num)%2 == 0){
                //加速运动
                if(cur < distance/2){
                    step =8*distance/(10000*value*value)*(2*index+1);    
                }else{
                //减速运动
                    step = distance/(25*value)-8*distance/(10000*value*value)*(2*index+1);
                }
            }else{
                //加速运动
                if(cur > distance/2){
                    step =-8*distance/(10000*value*value)*(2*index+1);    
                }else{
                //减速运动
                    step = 8*distance/(10000*value*value)*(2*index+1)-distance/(25*value);
                }    
            }    
             break;
         //如果没有设置，则默认为'linear'匀速运动
         default: 
             step = 10;        
     }
    //若步长设置值使得元素超过目标点时，将步长设置值更改为目标点值 - 当前值
    if(((cur + step - target)*step > 0) && type != 'repeat'){
        step = target - cur;
    }
    //将合适的步长值赋值给元素的样式
    obj.style[attr] = cur + step + 'px';
    //当元素到达目标点后，停止定时器
    if((step == target - cur) && type != 'repeat'){
        clearInterval(obj.timers[attr]);
        obj.timers[attr] = 0;
        fn && fn.call(obj);    
    }     
    },20);        
}  
```
&emsp;&emsp;下面以varMove函数为基础，进行一些简单应用

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Document</title>
<style>
#box{
    margin-bottom:10px;
}
#test{
    height: 50px;
    width: 50px;
    background-color:lightblue;
    border-radius: 50%;
    position: absolute;
    left:0;
}
.backup{
    height: 50px;
    width: 1px;
    position: absolute;
}
.backup:nth-child(1){
    left:0px;
    background-color:red;
}
.backup:nth-child(2){
    left:100px;
    background-color:green;
}
.backup:nth-child(3){
    left:200px;
    background-color:blue;
}
</style>
</head>
<body>
<div id="box">
    <button id="btn1">匀速运动</button>
    <button id="btn2">加速运动</button>
    <button id="btn3">减速运动</button>
    <button id="btn4">加减速运动</button>
    <button id="btn5">往复运动</button>
    <button id="reset">还原</button>    
</div>
<div id="test"></div>
<div>
    <div class="backup"></div>
    <div class="backup"></div>
    <div class="backup"></div>    
</div>
<script src="http://files.cnblogs.com/files/xiaohuochai/varMove.js"></script>
<script>
reset.onclick = function(){history.go();}
btn1.onclick = function(){
    varMove({obj:test,attr:'left',target:'200'
    })
}
btn2.onclick = function(){
    varMove({obj:test,attr:'left',target:'200',type:'speedup'
    })
}
btn3.onclick = function(){
    varMove({obj:test,attr:'left',target:'200',type:'speeddown'
    })
}
btn4.onclick = function(){
    varMove({obj:test,attr:'left',target:'200',type:'speedupAndDown'
    })
}
btn5.onclick = function(){
    varMove({obj:test,attr:'left',target:'200',type:'repeat'
    })
}
</script>
</body>
</html>
```

<iframe style="width: 100%; height: 150px;" src="https://demo.xiaohuochai.site/js/move/variable/v8.html" frameborder="0" width="230" height="240"></iframe>