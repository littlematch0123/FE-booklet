# javascript运动系列第一篇——匀速运动

&emsp;&emsp;除了拖拽以外，运动也是javascript动画的一个基本操作。通过CSS属性transition和animation可以实现运动。但是，要进行更精细地操作，javascript运动是必不可少的。本文将详细介绍javascript运动

 

&nbsp;

### 简单运动

&emsp;&emsp;让一个元素在页面中运动起来很简单，设置定时器，改变定位元素的left或top值即可

```
<button id="btn">开始运动</button>
<button id="reset">还原</button>
<div id="test" style="height: 50px;width: 50px;background-color: pink;position:absolute;left:0;"></div>
<script>
var timer;
reset.onclick = function(){history.go();}
btn.onclick = function(){
    timer = setInterval(function(){
        if(test.offsetLeft < 200){
            test.style.left = test.offsetLeft + 10 + 'px';
        }else{
            test.style.left = '200px';
            clearInterval(timer);
        }    
    },30);
}
</script>
```

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/move/linear/l1.html" frameborder="0" width="230" height="240"></iframe>

&nbsp;

### 定时器管理

&emsp;&emsp;上面的代码中没有进行定时器管理。当元素在运动的过程中，多次按下按钮，会开启多个定时器，从而使元素运动速度加快

&emsp;&emsp;有两种定时器管理方式

【1】开启新定时器前，消除旧定时器

&emsp;&emsp;注意:即使没有定时器的情况下，消除定时器也不会报错，只是静默失败

```
<button id="btn">开始运动</button>
<button id="reset">还原</button>
<div id="test" style="height: 50px;width: 50px;background-color: pink;position:absolute;left:0;"></div>
<script>
var timer;
reset.onclick = function(){history.go();}
btn.onclick = function(){
    clearInterval(timer);
    timer = setInterval(function(){
        if(test.offsetLeft < 200){
            test.style.left = test.offsetLeft + 10 + 'px';
        }else{
            test.style.left = '200px';
            clearInterval(timer);
        }    
    },30);
}
</script>
```
<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/move/linear/l2.html" frameborder="0" width="230" height="240"></iframe>


【2】当定时器未停止时，不允许开启新定时器

&emsp;&emsp;注意:由于定时器开启时，其返回值是一个不为0的整数，所以可以通过判断其返回值，来确定是否使用return语句

```
<button id="btn">开始运动</button>
<button id="reset">还原</button>
<div id="test" style="height: 50px;width: 50px;background-color: pink;position:absolute;left:0;"></div>
<script>
var timer;
reset.onclick = function(){history.go();}
btn.onclick = function(){
    if(timer) return;
    timer = setInterval(function(){
        if(test.offsetLeft < 200){
            test.style.left = test.offsetLeft + 10 + 'px';
        }else{
            test.style.left = '200px';
            clearInterval(timer);
        }    
    },30);
}
</script>
```

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/move/linear/l3.html" frameborder="0" width="230" height="240"></iframe>

&nbsp;

### 分享效果

&emsp;&emsp;现在要做一个类似于“分享到”侧边栏的效果

```
<style>
#test{
    width: 100px;
    height: 100px;
    background-color: lightblue;
    text-align:center;
    position:absolute;
    top: 0;
    left: -100px;
}    
#test-in{
    width: 30px;
    height: 60px;
    background-color: orange;
    margin-left: 100px;
    position:relative;
    top: 20px;
}
</style>
<div id="test">
    <div id="test-in">分享到</div>
</div>    
<script>
test.onmouseover = function(){test.style.left = '0px';}
test.onmouseout = function(){test.style.left = '-100px';}
</script>
```
<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/js/move/linear/l4.html" frameborder="0" width="230" height="240"></iframe>

&nbsp;

### 移入移出

&emsp;&emsp;如果把鼠标移入和鼠标移出都增加运动效果，则需要使用运动函数

&emsp;&emsp;但是，有一个很重要的问题需要注意的是，鼠标移入移出的顺序问题

&emsp;&emsp;如果把移入移出事件都加在父元素的身上，则需要做如下处理

&emsp;&emsp;由于鼠标从子元素移动到父元素上时，会触发子元素的移出事件，通过冒泡也会触发父元素移出事件。此时，有两种方法解决该问题。一种是在子元素移出事件中阻止冒泡，另一种是在父元素移出事件设置target判断条件。当target为父元素本身时才执行

&emsp;&emsp;鼠标从父元素移动到子元素的过程中，会按照顺序触发父元素的移出事件、子元素的移入事件以及父元素的移入事件

&emsp;&emsp;为了避免触发移入事件。此时，使用开关变量对移入事件的代码进行限制。移出事件代码完成之前不执行移入事件代码

```
<script>
var testIn = document.getElementById('test-in');
var timer1,timer2;
var onOff = false;
test.onmouseover = function(){
    if(!onOff){    
        clearInterval(timer1);
        timer1 = setInterval(function(){
            if(!onOff){
                if(test.offsetLeft < 0){
                    test.style.left = test.offsetLeft + 10 + 'px';
                }else{
                    test.style.left = '0';
                    clearInterval(timer1);
                    timer1 = 0;
                }                    
            }else{
                clearInterval(timer1);
            }
        },30);
    }
}
test.onmouseout = function(e){
    e = e || event;
    var target = e.target || e.srcElement;
    if(target === test){
        //当触发父元素移出事件时，开启开关
        onOff = true;
        clearInterval(timer2);
        timer2 = setInterval(function(){
            if(test.offsetLeft > -100){
                test.style.left = test.offsetLeft - 10 + 'px';
            }else{
                test.style.left = '-100px';
                clearInterval(timer2);
                timer2 = 0;
                //当运动结束后，关闭开关
                onOff = false;
            }    
        },30);        
    }
}
</script>
```
<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/js/move/linear/l5.html" frameborder="0" width="230" height="240"></iframe>

&nbsp;

### 运动函数

&emsp;&emsp;从上面的代码中，可以看出运动部分的重复代码较多，把运动封装为带参数的函数更合适

```
<style>
#test{width: 100px;height: 100px;background-color:lightblue;text-align:center;position:absolute;top: 0;left: -100px;}    
#test-in{width: 30px;height: 60px;background-color: orange;margin-left: 100px;position:relative;top: 20px;}
</style>
<div id="test">
    <div id="test-in">分享到</div>
</div>    
<script>
var testIn = document.getElementById('test-in');
var timer;
test.onmouseover = function(){move(test,0,10);}
test.onmouseout = function(){move(test,-100,-10)}
function move(obj,target,speed){
    clearInterval(timer);
    timer = setInterval(function(){
        if((obj.offsetLeft - target)*speed < 0){
            obj.style.left = obj.offsetLeft + speed + 'px';
        }else{
            obj.style.left = target + 'px';
            clearInterval(timer);
            timer = 0;
        }                
    },16);        
}    
</script>
```
<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/js/move/linear/l6.html" frameborder="0" width="230" height="240"></iframe>

&emsp;&emsp;由于不仅仅是left值可以做运动，其他属性(如width)也可以。所以，属性attr也应该作为参数提取出来

&emsp;&emsp;这时就无法使用offset类属性，而应该使用计算样式的兼容函数getCSS()

```
function getCSS(obj,style){
    if(window.getComputedStyle){
        return getComputedStyle(obj)[style];
    }
    return obj.currentStyle[style];
}   

function move(obj,attr,target,speed){
    clearInterval(timer);
    timer = setInterval(function(){
        var cur = parseInt(getCSS(obj,attr));
        if((cur - target)*speed < 0){
            obj.style.left = cur + speed + 'px';
        }else{
            obj.style.left = target + 'px';
            clearInterval(timer);
            timer = 0;
        }                
    },30);        
}
```
 

&nbsp;

### 透明度

&emsp;&emsp;透明度是一个比较特殊的样式，因为IE8-浏览器不支持opacity，只能通过滤镜的方式写成filter:alpha(opacity=透明值)

&emsp;&emsp;但是，由于IE浏览器获取计算样式时，可以获得自定义样式，所以虽然opacity属性在IE8-浏览器无法生效，但是可以获得它的值

&emsp;&emsp;如果透明度做运动的话，则需要对运动函数进行重新封装

&emsp;&emsp;注意:由于透明度涉及小数计算，如0.07*100=> 7.000000000000001，所以需要用Math.round()去掉尾巴

```
<style>
#test{width: 100px;height: 100px;background-color:lightblue;text-align:center;position:absolute;top: 0;left: 0;}    
#test-in{width: 30px;height: 60px;background-color: orange;margin-left: 100px;position:relative;top: 20px;}
</style>
<div id="test">
    <div id="test-in">分享到</div>
</div>    
<script>
var testIn = document.getElementById('test-in');
var timer;
test.onmouseover = function(){move(test,'opacity',0.1,-0.05);}
test.onmouseout = function(){move(test,'opacity',1,0.05)}
function getCSS(obj,style){
    if(window.getComputedStyle){
        return getComputedStyle(obj)[style];
    }
    return obj.currentStyle[style];
}   
function move(obj,attr,target,speed){
    clearInterval(timer);
    var cur;
    timer = setInterval(function(){
        if(attr == 'opacity'){
            cur = Math.round(getCSS(obj,attr)*100);
            if((cur - target*100)*speed < 0){
                obj.style.opacity = (cur + speed*100)/100;
                obj.style.filter = 'alpha(opacity=' + (cur + speed*100) + ')';
            }else{
                obj.style.opacity = target;
                obj.filter = 'alpha(opacity=' + target + ')';
                clearInterval(timer);
                timer = 0;
            }
        }else{
            cur = parseInt(getCSS(obj,attr));
            if((cur - target)*speed < 0){
                obj.style[attr] = cur + speed + 'px';
            }else{
                obj.style[attr] = target + 'px';
                clearInterval(timer);
                timer = 0;
            }    
        }
                
    },30);        
}    
</script>
```
<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/js/move/linear/l7.html" frameborder="0" width="230" height="240"></iframe>

&nbsp;

### 多值

&emsp;&emsp;如果一个元素有多个值同时运动时，像下面这样直接调用move()函数是有问题的
```
move(test,'opacity',0.1,-0.05);
move(test,'left',-100,-1);
```
&emsp;&emsp;因为函数里面定时器的变量timer是一个公共变量，当一个运动停止时，会清除定时器。这时另一个运动即使没有完成，定时器已经停止了，就无法继续运动了

&emsp;&emsp;所以，合适的做法是在参数对象obj下面设置一个自定义属性timers，timers为一个空对象，然后将定时器返回值储存在timers对象下的attr属性中，此时两个定时器不会相互干扰

```
<style>
#test{width: 100px;height: 100px;background-color: lightblue;text-align:center;position:absolute;top: 0;left: -100px;opacity:1;}    
#test-in{width: 30px;height: 60px;background-color: orange;margin-left: 100px;position:relative;top: 20px;}
</style>
<div id="test">
    <div id="test-in">分享到</div>
</div>    
<script>
test.onmouseover = function(){
    move(test,'opacity',0.1,-0.05);
    move(test,'left',0,10);
}
test.onmouseout = function(){
    move(test,'opacity',1,0.05);
    move(test,'left',-100,-10);
}
function getCSS(obj,style){
    if(window.getComputedStyle){
        return getComputedStyle(obj)[style];
    }
    return obj.currentStyle[style];
}   
function move(obj,attr,target,speed){
    if(!obj.timers){
        obj.timers = {};
    }
    clearInterval(obj.timers[attr]);
    var cur;
    obj.timers[attr] = setInterval(function(){
        if(attr == 'opacity'){
            cur = Math.round(getCSS(obj,attr)*100);
            if((cur - target*100)*speed < 0){
                obj.style.opacity = (cur + speed*100)/100;
                obj.style.filter = 'alpha(opacity=' + (cur + speed*100) + ')';
            }else{
                obj.style.opacity = target;
                obj.filter = 'alpha(opacity=' + target + ')';
                clearInterval(obj.timers[attr]);
                obj.timers[attr] = 0;
            }
        }else{
            cur = parseInt(getCSS(obj,attr));
            if((cur - target)*speed < 0){
                obj.style[attr] = cur + speed + 'px';
            }else{
                obj.style[attr] = target + 'px';
                clearInterval(obj.timers[attr]);
                obj.timers[attr] = 0;
            }    
        }        
    },30);        
}    
</script>
```

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/js/move/linear/l8.html" frameborder="0" width="230" height="240"></iframe>

&nbsp;

### 多物体

&emsp;&emsp;如果在页面中有多个元素利用运动函数进行运动。由于定时器返回值在不同元素不同属性中都不会受影响。所以，上面的运动函数可以直接使用

```
<style>
div{height: 50px;width: 50px;position: absolute;left: 0;}
#test1{background-color: pink;top: 40px;}
#test2{background-color: lightblue;top: 100px;}
</style>
<div id="test1">元素一</div>
<div id="test2">元素二</div>
<button id="btn">开始运动</button>
<button id="reset">还原</button>    
<script>
reset.onclick = function(){history.go();}
btn.onclick = function(){
    move(test1,'width',100,10);
    move(test1,'left',150,10);
    move(test2,'width',150,20);
    move(test2,'left',100,10);
}
function getCSS(obj,style){
    if(window.getComputedStyle){
        return getComputedStyle(obj)[style];
    }
    return obj.currentStyle[style];
}   
function move(obj,attr,target,speed){
    if(!obj.timers){
        obj.timers = {};
    }
    clearInterval(obj.timers[attr]);
    var cur;
    obj.timers[attr] = setInterval(function(){
        if(attr == 'opacity'){
            cur = Math.round(getCSS(obj,attr)*100);
            if((cur - target*100)*speed < 0){
                obj.style.opacity = (cur + speed*100)/100;
                obj.style.filter = 'alpha(opacity=' + (cur + speed*100) + ')';
            }else{
                obj.style.opacity = target;
                obj.filter = 'alpha(opacity=' + target + ')';
                clearInterval(obj.timers[attr]);
                obj.timers[attr] = 0;
            }
        }else{
            cur = parseInt(getCSS(obj,attr));
            if((cur - target)*speed < 0){
                obj.style[attr] = cur + speed + 'px';
            }else{
                obj.style[attr] = target + 'px';
                clearInterval(obj.timers[attr]);
                obj.timers[attr] = 0;
            }    
        }        
    },30);        
}    
</script>
```
<iframe style="width: 100%; height: 160px;" src="https://demo.xiaohuochai.site/js/move/linear/l9.html" frameborder="0" width="230" height="240"></iframe>

&nbsp;

### 回调

&emsp;&emsp;物体的多个属性可能不是同时运动，可能是一个属性运动完成之后，另一个属性再运动。如果要完成这种需求，就需要用到回调函数

&emsp;&emsp;在运动函数中，定时器停止时，再调用运动函数，就可以接续运动效果

```
<style>
div{height: 50px;width: 50px;position: absolute;left: 0;}
#test{background-color: pink;top: 40px;}
</style>
<div id="test">元素</div>
<button id="btn">开始运动</button>
<button id="reset">还原</button>    
<script>
reset.onclick = function(){history.go();}
btn.onclick = function(){
    move(test,'left',100,20,function(){
        move(test,'width',150,10)
    });
}
function getCSS(obj,style){
    if(window.getComputedStyle){
        return getComputedStyle(obj)[style];
    }
    return obj.currentStyle[style];
}   
function move(obj,attr,target,speed,fn){
    if(!obj.timers){obj.timers = {};}
    clearInterval(obj.timers[attr]);
    var cur;
    obj.timers[attr] = setInterval(function(){
        if(attr == 'opacity'){
            cur = Math.round(getCSS(obj,attr)*100);
            if((cur - target*100)*speed < 0){
                obj.style.opacity = (cur + speed*100)/100;
                obj.style.filter = 'alpha(opacity=' + (cur + speed*100) + ')';
            }else{
                obj.style.opacity = target;
                obj.filter = 'alpha(opacity=' + target + ')';
                clearInterval(obj.timers[attr]);
                obj.timers[attr] = 0;
                fn && fn.call(obj);
            }
        }else{
            cur = parseInt(getCSS(obj,attr));
            if((cur - target)*speed < 0){
                obj.style[attr] = cur + speed + 'px';
            }else{
                obj.style[attr] = target + 'px';
                clearInterval(obj.timers[attr]);
                obj.timers[attr] = 0;
                fn && fn.call(obj);
            }    
        }        
    },30);        
}    
</script>
```
<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/move/linear/l10.html" frameborder="0" width="230" height="240"></iframe>


&nbsp;

### 函数完善

【速度参数】

&emsp;&emsp;上面封装的函数中，传递速度参数时，需要在速度参数前添加正负号作为方向标识。实际上，这步可以写在函数的程序内，而只传递正的速度参数即可

speed = parseInt(getCSS(obj,attr)) < target ? speed : -speed;
【拉回操作】

&emsp;&emsp;还有一个可以升级的地方，就是拉回操作。通过判断元素是否到达目标点，如果超过目标点后，将元素拉回到目标点位置

```
cur = parseInt(getCSS(obj,attr));
if((cur - target)*speed < 0){
    obj.style[attr] = cur + speed + 'px';
}else{
    obj.style[attr] = target + 'px';
    clearInterval(obj.timers[attr]);
    obj.timers[attr] = 0;
    fn && fn.call(obj);
} 
```
&emsp;&emsp;更合理的操作，应该是元素肯定不能超过目标点

&emsp;&emsp;所以应该把判断条件用来处理speed，当speed是一个合适的值时，再赋值给obj.style[attr]，可更改如下

```
cur = parseInt(getCSS(obj,attr));
//若速度设置值使得元素超过目标点时，将速度设置值更改为目标点值 - 当前值
if((cur +speed - target)*speed > 0){
    speed = target - cur;    
}
//将合适的speed值赋值给元素的样式
obj.style[attr] = cur + speed + 'px';

//当元素到达目标点后，停止定时器
if(speed == target - cur){
    clearInterval(obj.timers[attr]);
    obj.timers[attr] = 0;
    fn && fn.call(obj);    
}
```
【使用步长】

&emsp;&emsp;其实，把元素的位移变化命名为速度并不合适，只是因为约定俗成的关系才如此起名，将其命名为步长step更为合适，定时器每运行一次，该元素前进一步

 

&nbsp;

### Interval函数

&emsp;&emsp;以move.js的名字对该运动函数进行保存，在线地址

```
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
        //如果样式是透明度
        if(attr == 'opacity'){
            //对当前值的取值进行四舍五入，去除由于javascript小数计数中的bug存在的小尾巴
            cur = Math.round(getCSS(obj,attr)*100);
            if((cur - target*100)*step < 0){
                //设置透明度
                obj.style.opacity = (cur + step*100)/100;
                //IE兼容
                obj.style.filter = 'alpha(opacity=' + (cur + step*100) + ')';
            //透明度到达指定目标时
            }else{
                obj.style.opacity = target;
                obj.filter = 'alpha(opacity=' + target + ')';
                //清除定时器
                clearInterval(obj.timers[attr]);
                obj.timers[attr] = 0;
                //设置回调函数
                fn && fn.call(obj);
            }
        //当样式不是透明度时
        }else{
            //获取样式当前值并赋值给cur
            cur = parseFloat(getCSS(obj,attr));
            ////若步长设置值使得元素超过目标点时，将步长设置值更改为目标点值 - 当前值
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
        }        
    },30);        
}  
```
【实例】

&emsp;&emsp;下面以一个实例来说明move函数的应用，点击document即可查看效果

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Document</title>
<style>
div{
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
    background-color:lightblue;
}
div:nth-child(odd){
    background-color:pink;
}
</style>
</head>
<body>
<script src="http://files.cnblogs.com/files/xiaohuochai/move.js"></script>
<script>
var str = '';
var len = 5;
var timer;
var num = 0;
for(var i = 0; i < len; i++){
    str+= '<div style="left:'+60*i+'px;"></div>';
}
document.body.innerHTML = str;
document.onclick = function(){
    var aDiv = document.getElementsByTagName('div');
    if(timer) return;
    timer = setInterval(function(){
        move(aDiv[num++],'top', 150,10,function(){
            var _this = this;
            setTimeout(function(){
                move(_this,'top', 0,10);
            },1000)
        });
        if(num == len){
            clearInterval(timer);
            num = 0;
            setTimeout(function(){
                timer = 0;
            },2000);
        }
    },100);
}
</script>    
</body>
</html>
```

<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/js/move/linear/l11.html" frameborder="0" width="230" height="240"></iframe>
 

&nbsp;

### Frame函数

&emsp;&emsp;使用setInterval()的问题在于，定时器代码可能在代码再次被添加到队列之前还没有完成执行，结果导致定时器代码连续运行好几次，而之间没有任何停顿。而JS引擎对这个问题的解决是：当使用setInterval()时，仅当没有该定时器的任何其他代码实例时，才将定时器代码添加到队列中。这确保了定时器代码加入到队列中的最小时间间隔为指定间隔

&emsp;&emsp;但是，这样会导致两个问题：1、某些间隔被跳过；2、多个定时器的代码执行之间的间隔可能比预期的小

&emsp;&emsp;为了避免setInterval()定时器的问题，可以使用链式requestAnimationFrame()调用，IE9-浏览器可以使用setTimeout()兼容

&emsp;&emsp;以frameMove.js的名称保存该js文件

```
if (!window.requestAnimationFrame) {
    requestAnimationFrame = function(fn) {
        setTimeout(fn, 17);
    };    
}
if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}
function getCSS(obj,style){
    if(window.getComputedStyle){
        return getComputedStyle(obj)[style];
    }
    return obj.currentStyle[style];
}   
function move(obj,attr,target,step,fn){
  //如果没有建立定时器对象，则在obj下建立定时器对象
  if(!obj.timers){
    obj.timers = {};
  }
  //清除定时器
  cancelAnimationFrame(obj.timers[attr]);
  //声明当前值变量cur
  var cur;
  //判断步长step的正负值
  step = parseInt(getCSS(obj,attr)) < target ? step : -step;  
  //开启定时器
  obj.timers[attr] = requestAnimationFrame(function func(){
    //如果样式是透明度
    if(attr == 'opacity'){
        //对当前值的取值进行四舍五入，去除由于javascript小数计数中的bug存在的小尾巴
        cur = Math.round(getCSS(obj,attr)*100);
        if((cur - target*100)*step < 0){
            //设置透明度
            obj.style.opacity = (cur + step*100)/100;
            //IE兼容
            obj.style.filter = 'alpha(opacity=' + (cur + step*100) + ')';
            //递归调用定时器
            obj.timers[attr] = requestAnimationFrame(func);
        //透明度到达指定目标时    
        }else{
            obj.style.opacity = target;
            obj.filter = 'alpha(opacity=' + target + ')';
            //清除定时器
            cancelAnimationFrame(obj.timers[attr]);
            obj.timers[attr] = 0;
            //设置回调函数
            fn && fn.call(obj);
        }
    //当样式不是透明度时    
    }else{         
      //获取样式当前值并赋值给cur
      cur = parseInt(getCSS(obj,attr));
      //若步长设置值使得元素超过目标点时，将步长设置值更改为目标点值 - 当前值
      if((cur + step - target)*step > 0){
          step = target - cur;
      }
      //将合适的步长值赋值给元素的样式
      obj.style[attr] = cur + step + 'px';
      //递归调用定时器
      obj.timers[attr] = requestAnimationFrame(func);
      //当元素到达目标点后，停止定时器
      if(step == target - cur){
        cancelAnimationFrame(obj.timers[attr]);
        obj.timers[attr] = 0;
        fn && fn.call(obj);        
      }
    }   
  });  
}  
```
 

&nbsp;

### 浏览器问题

&emsp;&emsp;不论是Interval版本的运动函数，还是requestAnimationFrame版本的运动函数，语法都没有问题。但浏览器却有问题。为了节电，对于那些不处于当前窗口的页面，浏览器会将时间间隔扩大到1000毫秒。另外，如果笔记本电脑处于电池供电状态，Chrome和IE10+浏览器，会将时间间隔切换到系统定时器，大约是16.6毫秒

&emsp;&emsp;定时器时间间隔的变化，得到运动不能按照预期进行，很多时间会出现预想不到的bug

&emsp;&emsp;比如，还是上面的例子，它是以iframe内联框架的形式引入页面的。如果元素在运动过程中，拖动滚动条，使可视区域展示其他内容。过几秒钟后，再移回来时，发现运动的元素已经出现了bug

![](https://pic.xiaohuochai.site/blog/js_linear.gif)

&emsp;&emsp;关于以上情况的解决办法是，只要页面不处于活动状态，定时器就停止运行，回到活动状态时，再恢复运行。可以使用window的onblur和onfocus事件来解决

```
  window.onblur = function(){
    //清除定时器
    cancelAnimationFrame(timer);
  }
  window.onfocus = function(){
    //开启定时器
    timer = requestAnimationFrame(func)
  }
```
&emsp;&emsp;注意:只能使用window.onblur的形式，而不能使用window.addEventListener的形式

&emsp;&emsp;但是，当出现多个定时器时，此问题仍然不好解决。更好的办法是使用时间版运动