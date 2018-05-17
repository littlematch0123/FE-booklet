# javascript运动系列第五篇——缓冲运动和弹性运动 

&emsp;&emsp;缓冲运动指的是减速运动，减速到0的时候，元素正好停在目标点。而弹性运动同样是减速运动，但元素并不是直接停在目标点，而是在目标点附近弹几下再停止。本文将以一种新的思路来详细介绍缓冲运动和弹性运动

 

&nbsp;

### 缓冲运动

&emsp;&emsp;在变速运动中，曾经用物理学的知识实现过缓冲运动。缓冲运动实际上就是减速运动的一种特殊形式，指元素做减速运动，速度减到0时，恰好停在目标点位置，学名叫加速度恒定的匀减速运动

&emsp;&emsp;现在使用另一种思路，样式值等于当前值加上步长值，步长值的变化决定了运动的形式
```
test.style.left = cur + step + 'px';
```
&emsp;&emsp;元素距离目标点越近，速度越小，所以step可以写成如下公式
```
step = (target - cur)*k;
```
&emsp;&emsp;k表示减速系数，k不能随便取值，当k值过大时，效果将很不明显。因为step取值过大，使得定时器仅仅工作几次，元素就达到了目标点

&emsp;&emsp;当k值过小时，也会出现问题。cur值取得的值是当前的计算样式，而计算样式的值由于计算机存储的限制，并不能储存全部小数位数，IE9+浏览器可以储存2位小数，IE8-浏览器不可以储存小数，其他浏览器可以储存3位小数。这样，在计算中，当step值为0.0009(chrome)，或0.009(IE9+)，或0.1(IE8-)时，test.style.left = cur + step + 'px'将不起作用，样式值将不会改变

&emsp;&emsp;这时，只要将当前值向上取整(当前值为负数时，向下取整)即可

```
<button id="btn1">匀速运动</button>
<button id="btn2">缓冲运动</button>
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
function easyMove(json){
    var obj = json.obj;
    var attr = json.attr;
    //样式默认值为'left'
    attr = attr || 'left';
    var value = json.value;
    var target = json.target;
    //目标点默认值为'200'
    target = Number(target) || 200;
    //声明步长值step
    var step;
    //声明当前值cur
    var cur = parseFloat(getCSS(test,'left'));
    var type = json.type;
    var fn = json.fn;
    //如果没有建立定时器对象，则在obj下建立定时器对象
    if(!obj.timers){obj.timers = {};}
    //清除定时器
    if(obj.timers[attr]){return;}
     //开启定时器
    obj.timers[attr] = setInterval(function(){
        //更新当前值
        cur = parseFloat(getCSS(test,'left'));
        switch(type){
            case 'linear':
                step = Number(value) || 10;
                break;
            case 'buffer':
                //处理到不了目标点的问题
                cur = cur > 0 ? Math.ceil(cur) : Math.floor(cur); 
                value = Number(value) || 0.1;
                //更新步长值
                step = (target - cur)*0.1; 
                break;
            default:
                step = 10;                         
        }
        //若步长设置值使得元素超过目标点时，将步长设置值更改为目标点值 - 当前值
        if((cur + step - target)*step > 0){
            step = target - cur;
        }
        //将合适的步长值赋值给元素的样式
        obj.style[attr] = cur + step + 'px';
        //当元素到达目标点时，停止定时器
        if(step == target - cur){
            clearInterval(obj.timers[attr]);
            obj.timers[attr] = 0;
            fn && fn.call(obj);    
        }    
    },20);            
}
reset.onclick = function(){history.go();}
btn1.onclick = function(){
  easyMove({obj:test,target:150})
}
btn2.onclick = function(){
  easyMove({obj:test,target:150,type:'buffer'})
}
</script>    
```
<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/move/elastic/e1.html" frameborder="0" width="230" height="240"></iframe>

&nbsp;

### 弹性运动

&emsp;&emsp;要理解弹性运动，可以想象一个被拉伸的弹性绳子绑住的小球，小球向绑绳子的木桩运动，并围绕木桩左右运动，最终由于空气阻力的影响，停在木桩处

![](https://pic.xiaohuochai.site/blog/js_elastic1.jpg)

&emsp;&emsp;接下来，我们对小球的运动过程进行详细分析

&emsp;&emsp;【1】小球在起始点时，受到绳子的弹力f=k*s，k为弹性系数，s=max为小球和木桩的距离。于是，小球向右运动

&emsp;&emsp;【2】小球在向右运动的过程中，由于距离木桩的距离s逐渐变小，f=k*s，所以弹力逐渐变小，而小球受到的阻力fx是恒定的。所以，小球做加速度减小的加速运动(加得越来越慢)

&emsp;&emsp;【3】当f = fx时，小球此时的加速度为0。此后，小球开始向右做加速度增大的减速运动(减得越来越快)

&emsp;&emsp;【4】当小球运动到木桩处时，弹力突然消失。这时，只剩余空气阻力

&emsp;&emsp;【5】小球继续向右运动，小球有反向的弹力和阻力。阻力一直不变，而弹力越来越大。所以，小球做加速度增大的减速运动(减得越来越快)

&emsp;&emsp;【6】最终，小球运动到右边最远处时，速度减成0。此时，小球不受阻力，只受到反向的弹力。于是，小球开始向左做加速度减小的加速运动

&emsp;&emsp;【7】在向左运动的过程中，小球受到了向右的阻力，于是，加速度继续减小

&emsp;&emsp;【8】在某一时刻，阻力等于弹力，加速度减成0。此后，阻力将大于弹力，小球将做减速运动

&emsp;&emsp;【9】若小球运动到木桩处，速度减成0，则运动停止。否则，小球将继续向左做减速运动

&emsp;&emsp;【10】在某一时刻，小球速度减成0。此后，小球向右做先加速再减速的运动。若小球运动到木桩处，速度减成0，则运动停止。否则，小球将继续向右做减速运动。接下来，将重复第6步的内容

&emsp;&emsp;如果要按照物理学公式实现弹性运动时，元素的运动涉及到变加速运动，需要用到微积分的知识，处理起来相对复杂

 

&nbsp;

### 距离分析

&emsp;&emsp;下面用一个简单的思路来实现弹性运动。如果以距离来分析，弹性运动就是每一次运动距离不断减小的运动

&emsp;&emsp;例如，元素刚开始时距离目标点为100。第一次运动向右运动150，到达150处；第二次运动向左运动75，到达75处；第三次运动向右运动37.5，到达112.5处；第四次运动向左运动18.75，到达93.75。以此反复，最终无限接近于目标点100
```
    set =  init + target + len*k;
    k*=0.5;
```    
&emsp;&emsp;其中init为样式初始值，target为目标值，len为弹性最远值，k为衰减系数

&emsp;&emsp;由于利用距离分析实现的弹性运动，实际上是一个无限接近于目标点的运动，需要为其设置停止条件，并将其位置置于目标点

&emsp;&emsp;当len*k的四舍五入值等于0时，停止运动
```
    if(Math.round(len*k)  == 0){
        obj.style[attr] = target + 'px';
        clearInterval(obj.timer);
    }
```
```
<button id="btn">弹性运动</button>
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
function elasticMove(json){
    var obj = json.obj;
    var attr = json.attr;
    //样式默认值为'left'
    attr = attr || 'left';
    var target = json.target;
    //目标点默认值为'200'
    target = Number(target) || 200;
    //声明元素从目标点到最远点的距离
    var len = json.len;
    //默认值为target的1/5
    len =  len || target/5;
    //声明初始值init
    var init = parseFloat(getCSS(obj,attr));
    //如果初始值等于目标点，则返回
    if(init == target) return;
    var fn = json.fn;
    //声明当前设置值
    var set = 0;
    //声明衰减系数
    var k = 1;
    //如果没有建立定时器对象，则在obj下建立定时器对象
    if(!obj.timers){obj.timers = {};}
    //清除定时器
    if(obj.timers[attr]){return;}
     //开启定时器
    obj.timers[attr] = setInterval(function(){
        //更新当前值
        set =  init + target + len*k;
        k*=-0.5;
        obj.style[attr] = init + set + 'px';
        //当元素到达目标点时，停止定时器
        if(Math.round(len*k) == 0){
            obj.style[attr] = target + 'px';
            clearInterval(obj.timers[attr]);
            obj.timers[attr] = 0;
            fn && fn.call(obj);    
}    
    },50);            
}
reset.onclick = function(){history.go();}
btn.onclick = function(){
  elasticMove({obj:test,target:150})
}
</script>    
</body>
</html>
```
<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/move/elastic/e2.html" frameborder="0" width="230" height="240"></iframe>

&nbsp;

### 步长分析

&emsp;&emsp;弹性运动的另一种方法是使用步长分析法

&emsp;&emsp;步长分析法是分析定时器每一次运行时样式的变化值。我们可以将弹性运动分解为受弹力影响的运动和受阻力影响的运动

&emsp;&emsp;由于受到弹力的影响，所以元素距离目标点越远，速度越大；由于受到阻力的影响，所以元素每次运动都会有速度损耗

```
    //声明弹性距离
    var len;
    //声明弹性系数
    var k;
    //声明损耗系数
    var z;
    //获取当前样式值cur
    cur =  parseFloat(getCSS(obj,attr));
    //更新弹性距离
    len = target - cur;
    //弹力影响
    step += len*k;
    //阻力影响
    step = step*z;
    obj.style[attr] = cur + step + 'px';
    //当元素的步长值接近于0，并且弹性距离接近于0时，停止定时器
    if(Math.round(step) == 0 && Math.round(len) == 0){
        obj.style[attr] = target + 'px';
        clearInterval(obj.timers[attr]);
        obj.timers[attr] = 0;
        fn && fn.call(obj);    
    } 
```
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<button id="btn">弹性运动</button>
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
function elasticMove(json){
    var obj = json.obj;
    var attr = json.attr;
    //样式默认值为'left'
    attr = attr || 'left';
    var target = json.target;
    //目标点默认值为'200'
    target = Number(target) || 200;
    var fn = json.fn;
    //声明步长值
    var step = 0;
    //声明弹性距离
    var len = target;
    //声明弹性系数
    var k=json.k;
    //默认值为0.7
    k = Number(k) || 0.7;
    //声明损耗系数
    var z=json.z;
    //默认值为0.7
    z = Number(z) || 0.7;
    //声明当前值
    var cur = parseFloat(getCSS(obj,attr));
    //如果没有建立定时器对象，则在obj下建立定时器对象
    if(!obj.timers){obj.timers = {};}
    //清除定时器
    if(obj.timers[attr]){return;}
     //开启定时器
    obj.timers[attr] = setInterval(function(){
        //获取当前样式值cur
        cur =  parseFloat(getCSS(obj,attr));
        //更新弹性距离
        len = target - cur;
        //弹力影响
        step += len*k;
        //阻力影响
        step = step*z;
        obj.style[attr] = cur + step + 'px';
        //当元素的步长值接近于0，并且弹性距离接近于0时，停止定时器
        if(Math.round(step) == 0 && Math.round(len) == 0){
            obj.style[attr] = target + 'px';
            clearInterval(obj.timers[attr]);
            obj.timers[attr] = 0;
            fn && fn.call(obj);    
        }    
    },20);            
}
reset.onclick = function(){history.go();}
btn.onclick = function(){
  elasticMove({obj:test,target:150})
}
</script>    
</body>
</html>
```
<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/move/elastic/e3.html" frameborder="0" width="230" height="240"></iframe>

&nbsp;

### 弹性过界

&emsp;&emsp;IE8-浏览器存在弹性过界问题，当宽度width或高度height等不能出现负值的样式出现负值时将会报错。所以，需要判断样式为高度或宽度时，样式值小于0时，等于0

&emsp;&emsp;把弹性运动封装成elasticMove.js

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<button id="btn">弹性运动</button>
<button id="reset">还原</button>
<div id="test" style="height: 100px;width: 100px;background-color: pink;position:absolute;left:0;"></div>
<script>
function getCSS(obj,style){
    if(window.getComputedStyle){
        return getComputedStyle(obj)[style];
    }
    return obj.currentStyle[style];
}  
function elasticMove(json){
    var obj = json.obj;
    var attr = json.attr;
    //样式默认值为'left'
    attr = attr || 'left';
    var target = json.target;
    //目标点默认值为200
    if(isNaN(Number(target))){
        target = 200;
    }else{
        target = Number(target);
    }
    var fn = json.fn;
    //声明步长值
    var step = 0;
    //声明弹性距离
    var len = target;
    //声明弹性系数
    var k=json.k;
    //默认值为0.7
    k = Number(k) || 0.7;
    //声明损耗系数
    var z=json.z;
    //默认值为0.7
    z = Number(z) || 0.7;
    //声明当前值
    var cur = parseFloat(getCSS(obj,attr));
    //如果没有建立定时器对象，则在obj下建立定时器对象
    if(!obj.timers){obj.timers = {};}
    //清除定时器
    if(obj.timers[attr]){return;}
     //开启定时器
    obj.timers[attr] = setInterval(function(){
        //获取当前样式值cur
        cur =  parseFloat(getCSS(obj,attr));
        //更新弹性距离
        len = target - cur;
        //弹力影响
        step += len*k;
        //阻力影响
        step = step*z;
        //防止弹性过界
        if((attr == 'height' || attr == 'width') && (cur + step) < 0){
            obj.style[attr] = 0;
        }else{
            obj.style[attr] = cur + step + 'px';
        }
        //当元素的步长值接近于0，并且弹性距离接近于0时，停止定时器
        if(Math.round(step) == 0 && Math.round(len) == 0){
            obj.style[attr] = target + 'px';
            clearInterval(obj.timers[attr]);
            obj.timers[attr] = 0;
            fn && fn.call(obj);    
        }    
    },20);            
}
reset.onclick = function(){history.go();}
btn.onclick = function(){
  elasticMove({obj:test,attr:'width',target:20})
}
</script>    
</body>
</html>
```
<iframe style="width: 100%; height: 160px;" src="https://demo.xiaohuochai.site/js/move/elastic/e4.html" frameborder="0" width="230" height="240"></iframe>

&nbsp;

### 弹性菜单

&emsp;&emsp;下面利用封装的elasticMove.js来实现一个弹性菜单的应用

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Document</title>
<base href="http://www.cnblogs.com/" target="_blank">
<style>
#nav{
    list-style:none;
    padding: 0;
    text-align:center;
    color:white;
    font-weight:bold;
    background-color: #25517A;
    cursor:pointer;
    overflow:hidden;
    width: 200px;
}    
.navItem{
    line-height: 30px;
    float:left;
    width:40px;
    text-decoration: none;
    color:inherit;
}
#navActive{
    width: 40px;
    height: 30px;
    background-color: rgba(0,0,0,0.3);
    position:absolute;
    margin-top: -30px;
    cursor:pointer;
}
</style>
</head>
<body>
<nav id="nav">
    <a class="navItem" href="/">首页</a>
    <a class="navItem" href="/pick/">精华</a>
    <a class="navItem" href="/candidate/">候选</a>
    <a class="navItem" href="/news/">新闻</a>
    <a class="navItem" href="/following">关注</a>
</nav>
<div id="navActive"></div>
<script src="http://files.cnblogs.com/files/xiaohuochai/elasticMove.js"></script>
<script>
//navActive默认处于导航栏最左侧
navActive.style.left = nav.offsetLeft + 'px';
navActive.target =    nav.getElementsByTagName('a')[0];
nav.onmousemove = function(e){
    e = e || event;
    navActive.target = e.target || e.srcElement;
    elasticMove({obj:navActive,attr:'left',target:navActive.target.offsetLeft})
}
//点击navActive触发其所在位置的点击事件
navActive.onclick = function(e){
    navActive.target.click();
}
</script>
</body>
</html>
```

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/move/elastic/e5.html" frameborder="0" width="230" height="240"></iframe>


&nbsp;

### 弹性拖拽

&emsp;&emsp;弹性运动的另一个常见应用是弹性拖拽效果。例如，iphone手机上滑屏时的缓动效果就是利用弹性拖拽实现的

&emsp;&emsp;下面利用封装的elasticMove.js来实现一个弹性拖拽的应用

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Document</title>
<style>
#box{
    width: 200px;
    height: 200px;
    border: 2px solid black;
    cursor:pointer;
    position:relative;
    overflow:hidden;
}
#list{
    width: 1000px;
    height: 200px;
    margin: 0;
    padding: 0;
    list-style:none;
    text-align: center;
    font-size:30px;
    position:absolute;
    left:0;
}
.listItem{
    float: left;
    width: 200px;
    line-height: 200px;
}
</style>
</head>
<body>
<div id="box">
    <ul id="list" class="clear">
        <li class="listItem" style="background-color:lightblue">第一屏</li>
        <li class="listItem" style="background-color:lightgreen">第二屏</li>
        <li class="listItem" style="background-color:lightseagreen">第三屏</li>
        <li class="listItem" style="background-color:lightgrey">第四屏</li>
        <li class="listItem" style="background-color:lightcoral">第五屏</li>
    </ul>    
</div>
<script src="http://files.cnblogs.com/files/xiaohuochai/elasticMove.js"></script>
<script>
//表示当前屏幕处于第几屏，默认为第0屏
var index = 0;
//获取屏幕的宽度
var baseWidth = parseFloat(getCSS(box,'width'));
list.onmousedown = function(e){
    e = e || event;
     //获取元素距离定位父级的x轴及y轴距离
    var x0 = this.offsetLeft;
    //获取此时鼠标距离视口左上角的x轴距离
    var x1 = e.clientX;
    //如果拖拽时，弹性运动还没有走完，则拖拽操作无效
    if(list.timers){
        if(list.timers.left){
            return;
        }
    }
    document.onmousemove = function(e){
        e = e || event;
        //获取此时鼠标距离视口左上角的x轴距离
        var x2 = e.clientX;  
        //计算此时元素应该距离视口左上角的x轴距离
        var X = x0 + x2 - x1;
        //将X的值赋给left，使元素移动到相应位置
        list.style.left = X + 'px';
    }
    document.onmouseup = function(e){
        //当鼠标抬起时，拖拽结束，则将onmousemove赋值为null即可
        document.onmousemove = null;
        //释放全局捕获
        if(list.releaseCapture){
            list.releaseCapture();
        }
        e =  e || event;
        var x3 = e.clientX;
        //向右滑动
        if(x3 > x1){
            index--;
            if(index < 0){
                index = 0;
            }
            elasticMove({
                obj:list,
                target:-1*baseWidth*index
            })  
        }
        //向左滑动
        if(x3 < x1)
        {
            index++;
            if(index > 4){
                index = 4;
            }
            elasticMove({
                obj:list,
                target:-1*baseWidth*index
            })
        }
    }
    //阻止默认行为
    return false;
    //IE8-浏览器阻止默认行为
    if(list.setCapture){
        list.setCapture();
    }
}
//防止无关文字被选中
document.onmousedown = function(){
    return false;
}
</script>    
</body>
</html>
```

<iframe style="width: 100%; height: 230px;" src="https://demo.xiaohuochai.site/js/move/elastic/e6.html" frameborder="0" width="230" height="240"></iframe>