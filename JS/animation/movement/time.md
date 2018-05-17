# javascript中的时间版运动 

&emsp;&emsp;速度版JS运动是指以速度为参照，随着路程的变化，时间随之变化；而时间版JS运动是指以时间为参照，随着路程的变化，速度随着变化。相较而言，时间版JS运动更为常用。JQ的animate就是时间版运动。本文将详细介绍时间版JS运动

 

&nbsp;

### 速度版运动

&emsp;&emsp;为何速度版JS更容易理解呢？这要归功于定时器setInterval了。最容易想到的运行形式如下所示
```
setInterval(function(){
    s = s + step
},30)
```
&emsp;&emsp;每30ms，路程增加step，实际上就决定了以速度为参照。而step的值如何变化就决定了何种运动形式。以最简单的匀速运动为例

```
<button id="btn">开始运动</button>
<button id="reset">还原</button>
<div id="test" style="height: 50px;width: 50px;position:absolute;left:0;"></div>
<script>
var timer;
reset.onclick = function(){history.go();}
btn.onclick = function(){
    timer = setInterval(function(){
        if(test.offsetLeft < 150){
            test.style.left = test.offsetLeft + 10 + 'px';
        }else{
            test.style.left = '150px';
            clearInterval(timer);
        }    
    },30);
}
</script>
```

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/js/move/time/t1.html" frameborder="0" width="230" height="240"></iframe>

&emsp;&emsp;总路程s为150，每30ms，向前移动10，相当于速度为1000/3=333.3。最终计算得出花费时间t=s/v=150/333.3=0.45s

&emsp;&emsp;当路程发生变化时，仍然以333.3的速度运动，时间也发生相应的变化。这就是速度版运动

 

&nbsp;

### 公式推导

&emsp;&emsp;下面来介绍时间版运动，以匀速运动为例，先假设几个变量

```
距离 c(change position)
初始位置 b(beginning position)
最终位置 p(position)
持续时间 d(duration)
时间 t(time)
速度 v(velocity)
```
&emsp;&emsp;上面几个变量有如下等式

&emsp;&emsp;1、最终运动距离 = 最终位置 - 初始位置
```
c = p - b
```
&emsp;&emsp;2、最终运动距离 = 速度 * 持续时间
```
c = v * d
```
&emsp;&emsp;3、当前运动距离 = 当前位置 - 初始位置
```
c(当前) =  p(当前) - b
```
&emsp;&emsp;4、当前运动距离 = 速度 * 时间
```
c(当前) = v * t
```
&emsp;&emsp;最终要表示为如下函数
```
p(当前) = ƒ(t)
```
&emsp;&emsp;因此，经过整理得出公式如下
```
p(当前) = b + c(当前) = b + v*t = b + c*t/d
```
&emsp;&emsp;最终结果为
```
p = t * c / d + b
```

&nbsp;

### 匀速函数

&emsp;&emsp;下面将时间版匀速运动封装为一个名称为linearMove.js的文件

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

function linearMove(obj,json,times,fn){
  //获取当前毫秒数
  var startTime = +new Date();  
  /*获取初始值*/
  var iCur = {};
  for(var attr in json){
    if(attr == 'opacity'){
      //对当前值的取值进行四舍五入，去除由于javascript小数计数中的bug存在的小尾巴
      iCur[attr] = Math.round(getCSS(obj,attr)*100);
    }else{
      //去掉单位
      iCur[attr] = parseInt(getCSS(obj,attr));
    }
  }
  //清除定时器
  cancelAnimationFrame(obj.timer);
  obj.timer = requestAnimationFrame(function func(){
    //获取t、d参数
    var d = times;
    var t = d - Math.max(0,startTime - (+new Date()) + d);
    for(var attr in json){
      /*获取b、c、p这三个参数*/
      var b = iCur[attr];
      var c = json[attr]-iCur[attr];
      var p = t * ( c / d ) + b;
      /*赋值操作*/
      if(attr == 'opacity'){
        obj.style.opacity = p / 100;
        obj.style.filter = 'alpha(opacity=' + p + ')';
      }else{
        obj.style[attr] = p + 'px';
      }  
    }
      obj.timer = requestAnimationFrame(func);
      /*运行指定时间后*/
      if(t == d){
        //清除定时器
        cancelAnimationFrame(obj.timer);
        //设置回调函数
        fn && fn.call(obj);        
      }    
  });
} 
```
&emsp;&emsp;下面调用自己封装的linearMove.js来制作一个实例

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
<button id="btn">开始运动</button>
<button id="reset">还原</button>
<div id="test1" style="height: 50px;width: 50px;background: pink;position:absolute;left:0;"></div>
<div id="test2" style="height: 100px;width: 100px;background: blue;position:absolute;top:150px;left:0;"></div>
<script src="http://files.cnblogs.com/files/xiaohuochai/linearMove.js"></script>
<script>
reset.onclick = function(){history.go();}
btn.onclick = function(){
   linearMove(test1,{width:200,height:100,left:100},500,function(){
      linearMove(test2,{width:200},500);
   });
   linearMove(test2,{left:100},500)
}
</script>
</body>
</html>
```

<iframe style="width: 100%; height: 260px;" src="https://demo.xiaohuochai.site/js/move/time/t2.html" frameborder="0" width="230" height="240"></iframe>
 

&nbsp;

### Tween算法

&emsp;&emsp;Tween是一个来自flash的运动算法，包含各种经典的动画运动公式，详细列表如下

```
Linear：线性匀速运动效果；
Quadratic(Quad)：二次方的缓动（t^2）；
Cubic：三次方的缓动（t^3）；
Quartic(Quart)：四次方的缓动（t^4）；
Quintic(Quint)：五次方的缓动（t^5）；
Sinusoidal(Sine)：正弦曲线的缓动（sin(t)）；
Exponential(Expo)：指数曲线的缓动（2^t）；
Circular(Circ)：圆形曲线的缓动（sqrt(1-t^2)）；
Elastic：指数衰减的正弦曲线缓动；
Back：超过范围的三次方缓动（(s+1)*t^3 – s*t^2）；
Bounce：指数衰减的反弹缓动。
```
&emsp;&emsp;每个效果都分三个缓动方式，分别是
```
easeIn：从0开始加速的缓动，也就是先慢后快；
easeOut：减速到0的缓动，也就是先快后慢；
easeInOut：前半段从0开始加速，后半段减速到0的缓动
```
&emsp;&emsp;所有的这些缓动算法都离不开下面4个参数，t, b, c, d，含义如下：
```
t  当前时间 (time)
b  初始位置 (beginning position)
c  距离 (change position)
d  持续时间 (duration)
```
&emsp;&emsp;tween的详细算法如下

```
// Tween类
var Tween = {
    Linear: function(t,b,c,d){ return c*t/d + b; },
    Quad: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t + b;
        },
        easeOut: function(t,b,c,d){
            return -c *(t/=d)*(t-2) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t + b;
            return -c/2 * ((--t)*(t-2) - 1) + b;
        }
    },
    Cubic: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t*t + b;
        },
        easeOut: function(t,b,c,d){
            return c*((t=t/d-1)*t*t + 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t*t + b;
            return c/2*((t-=2)*t*t + 2) + b;
        }
    },
    Quart: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t*t*t + b;
        },
        easeOut: function(t,b,c,d){
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        }
    },
    Quint: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t*t*t*t + b;
        },
        easeOut: function(t,b,c,d){
            return c*((t=t/d-1)*t*t*t*t + 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
            return c/2*((t-=2)*t*t*t*t + 2) + b;
        }
    },
    Sine: {
        easeIn: function(t,b,c,d){
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        },
        easeOut: function(t,b,c,d){
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        },
        easeInOut: function(t,b,c,d){
            return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
        }
    },
    Expo: {
        easeIn: function(t,b,c,d){
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        },
        easeOut: function(t,b,c,d){
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
            return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    },
    Circ: {
        easeIn: function(t,b,c,d){
            return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
        },
        easeOut: function(t,b,c,d){
            return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
            return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
        }
    },
    Elastic: {
        easeIn: function(t,b,c,d,a,p){
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        },
        easeOut: function(t,b,c,d,a,p){
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
        },
        easeInOut: function(t,b,c,d,a,p){
            if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
            if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
        }
    },
    Back: {
        easeIn: function(t,b,c,d,s){
            if (s == undefined) s = 1.70158;
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },
        easeOut: function(t,b,c,d,s){
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
        easeInOut: function(t,b,c,d,s){
            if (s == undefined) s = 1.70158; 
            if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        }
    },
    Bounce: {
        easeIn: function(t,b,c,d){
            return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
        },
        easeOut: function(t,b,c,d){
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
            }
        },
        easeInOut: function(t,b,c,d){
            if (t < d/2) return Tween.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
            else return Tween.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
        }
    }
};
```
&emsp;&emsp;tween算法的精简版本如下所示

```
var Tween = {
    linear: function (t, b, c, d){  //匀速
        return c*t/d + b;
    },
    easeIn: function(t, b, c, d){  //加速曲线
        return c*(t/=d)*t + b;
    },
    easeOut: function(t, b, c, d){  //减速曲线
        return -c *(t/=d)*(t-2) + b;
    },
    easeBoth: function(t, b, c, d){  //加速减速曲线
        if ((t/=d/2) < 1) {
            return c/2*t*t + b;
        }
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInStrong: function(t, b, c, d){  //加加速曲线
        return c*(t/=d)*t*t*t + b;
    },
    easeOutStrong: function(t, b, c, d){  //减减速曲线
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
        if ((t/=d/2) < 1) {
            return c/2*t*t*t*t + b;
        }
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
        if (t === 0) { 
            return b; 
        }
        if ( (t /= d) == 1 ) {
            return b+c; 
        }
        if (!p) {
            p=d*0.3; 
        }
        if (!a || a < Math.abs(c)) {
            a = c; 
            var s = p/4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },    
    elasticBoth: function(t, b, c, d, a, p){
        if (t === 0) {
            return b;
        }
        if ( (t /= d/2) == 2 ) {
            return b+c;
        }
        if (!p) {
            p = d*(0.3*1.5);
        }
        if ( !a || a < Math.abs(c) ) {
            a = c; 
            var s = p/4;
        }
        else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        if (t < 1) {
            return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
                    Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        }
        return a*Math.pow(2,-10*(t-=1)) * 
                Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
    },
    backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
        if (typeof s == 'undefined') {
           s = 1.70158;
        }
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    backOut: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 3.70158;  //回缩的距离
        }
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    }, 
    backBoth: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 1.70158; 
        }
        if ((t /= d/2 ) < 1) {
            return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        }
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
        return c - Tween['bounceOut'](d-t, 0, c, d) + b;
    },       
    bounceOut: function(t, b, c, d){
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
        }
        return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
    },      
    bounceBoth: function(t, b, c, d){
        if (t < d/2) {
            return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
        }
        return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
    }
}
```
 

&nbsp;

### JQ扩展

&emsp;&emsp;默认地， JQ只有两种运动形式，包括linear和swing

```
jQuery.easing = {
    linear: function( p ) {
        return p;
    },
    swing: function( p ) {
        return 0.5 - Math.cos( p * Math.PI ) / 2;
    },
    _default: "swing"
};
```
<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/js/move/time/t3.html" frameborder="0" width="230" height="240"></iframe>

&emsp;&emsp;可以利用tween算法来扩展JQ的运动形式，JQ源码中关于运动形式的函数如下所示
```
this.pos = eased = jQuery.easing[ this.easing ](
                percent, this.options.duration * percent, 0, 1, this.options.duration
            );
```
&emsp;&emsp;可以看到，它有5个参数，分别对应tween算法中的p、t、d、c、d，因此需要对tween算法中的参数进行修改

```
<script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
<script>
;(function($){
   $.extend(jQuery.easing,{
    linear: function (p,t, b, c, d){  //匀速
      return c*t/d + b;
    },
    easeIn: function(p,t, b, c, d){  //加速曲线
      return c*(t/=d)*t + b;
    },
    easeOut: function(p,t, b, c, d){  //减速曲线
      return -c *(t/=d)*(t-2) + b;
    },
    easeBoth: function(p,t, b, c, d){  //加速减速曲线
      if ((t/=d/2) < 1) {
        return c/2*t*t + b;
      }
      return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInStrong: function(p,t, b, c, d){  //加加速曲线
      return c*(t/=d)*t*t*t + b;
    },
    easeOutStrong: function(p,t, b, c, d){  //减减速曲线
      return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeBothStrong: function(p,t, b, c, d){  //加加速减减速曲线
      if ((t/=d/2) < 1) {
        return c/2*t*t*t*t + b;
      }
      return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    elasticIn: function(p,t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
      if (t === 0) { 
        return b; 
      }
      if ( (t /= d) == 1 ) {
        return b+c; 
      }
      if (!p) {
        p=d*0.3; 
      }
      if (!a || a < Math.abs(c)) {
        a = c; 
        var s = p/4;
      } else {
        var s = p/(2*Math.PI) * Math.asin (c/a);
      }
      return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    elasticOut: function(p,t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
      if (t === 0) {
        return b;
      }
      if ( (t /= d) == 1 ) {
        return b+c;
      }
      if (!p) {
        p=d*0.3;
      }
      if (!a || a < Math.abs(c)) {
        a = c;
        var s = p / 4;
      } else {
        var s = p/(2*Math.PI) * Math.asin (c/a);
      }
      return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },    
    elasticBoth: function(p,t, b, c, d, a, p){
      if (t === 0) {
        return b;
      }
      if ( (t /= d/2) == 2 ) {
        return b+c;
      }
      if (!p) {
        p = d*(0.3*1.5);
      }
      if ( !a || a < Math.abs(c) ) {
        a = c; 
        var s = p/4;
      }
      else {
        var s = p/(2*Math.PI) * Math.asin (c/a);
      }
      if (t < 1) {
        return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
            Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
      }
      return a*Math.pow(2,-10*(t-=1)) * 
          Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
    },
    backIn: function(p,t, b, c, d, s){     //回退加速（回退渐入）
      if (typeof s == 'undefined') {
         s = 1.70158;
      }
      return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    backOut: function(p,t, b, c, d, s){
      if (typeof s == 'undefined') {
        s = 3.70158;  //回缩的距离
      }
      return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    }, 
    backBoth: function(p,t, b, c, d, s){
      if (typeof s == 'undefined') {
        s = 1.70158; 
      }
      if ((t /= d/2 ) < 1) {
        return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
      }
      return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    bounceIn: function(p,t, b, c, d){    //弹球减振（弹球渐出）
      return c - this['bounceOut'](p,d-t, 0, c, d) + b;
    },       
    bounceOut: function(p,t, b, c, d){
      if ((t/=d) < (1/2.75)) {
        return c*(7.5625*t*t) + b;
      } else if (t < (2/2.75)) {
        return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
      } else if (t < (2.5/2.75)) {
        return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
      }
      return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
    },      
    bounceBoth: function(p,t, b, c, d){
      if (t < d/2) {
        return this['bounceIn'](p,t*2, 0, c, d) * 0.5 + b;
      }
      return this['bounceOut'](p,t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
    }
  }); 
})(jQuery);
</script>
```
&emsp;&emsp;下面利用扩展后的JQ插件来进行JQ的自定义运动
```
<button id="btn">开始运动</button>
<button id="reset">还原</button>
<div id="test" style="height: 100px;width: 100px;background-color: pink;position:absolute;left:0;"></div>
```
```
<script>
reset.onclick = function(){history.go();}
btn.onclick = function(){
   $(test).animate({width:300},1000,'bounceBoth')
} 
</script>
```

<iframe style="width: 100%; height: 230px;" src="https://demo.xiaohuochai.site/js/move/time/t4.html" frameborder="0" width="230" height="240"></iframe>
 

&nbsp;

### Tween函数

&emsp;&emsp;下面基于上面的tween算法，对tween里面的所有运动形式进行封装，名称为tweenMove.js

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
// Tween类
var Tween = {
    Linear: function(t,b,c,d){ return c*t/d + b; },
    Quad: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t + b;
        },
        easeOut: function(t,b,c,d){
            return -c *(t/=d)*(t-2) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t + b;
            return -c/2 * ((--t)*(t-2) - 1) + b;
        }
    },
    Cubic: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t*t + b;
        },
        easeOut: function(t,b,c,d){
            return c*((t=t/d-1)*t*t + 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t*t + b;
            return c/2*((t-=2)*t*t + 2) + b;
        }
    },
    Quart: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t*t*t + b;
        },
        easeOut: function(t,b,c,d){
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        }
    },
    Quint: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t*t*t*t + b;
        },
        easeOut: function(t,b,c,d){
            return c*((t=t/d-1)*t*t*t*t + 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
            return c/2*((t-=2)*t*t*t*t + 2) + b;
        }
    },
    Sine: {
        easeIn: function(t,b,c,d){
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        },
        easeOut: function(t,b,c,d){
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        },
        easeInOut: function(t,b,c,d){
            return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
        }
    },
    Expo: {
        easeIn: function(t,b,c,d){
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        },
        easeOut: function(t,b,c,d){
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
            return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    },
    Circ: {
        easeIn: function(t,b,c,d){
            return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
        },
        easeOut: function(t,b,c,d){
            return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
            return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
        }
    },
    Elastic: {
        easeIn: function(t,b,c,d,a,p){
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        },
        easeOut: function(t,b,c,d,a,p){
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
        },
        easeInOut: function(t,b,c,d,a,p){
            if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
            if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
        }
    },
    Back: {
        easeIn: function(t,b,c,d,s){
            if (s == undefined) s = 1.70158;
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },
        easeOut: function(t,b,c,d,s){
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
        easeInOut: function(t,b,c,d,s){
            if (s == undefined) s = 1.70158; 
            if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        }
    },
    Bounce: {
        easeIn: function(t,b,c,d){
            return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
        },
        easeOut: function(t,b,c,d){
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
            }
        },
        easeInOut: function(t,b,c,d){
            if (t < d/2) return Tween.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
            else return Tween.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
        }
    }
};  
function tweenMove(obj,json,times,fx,fn){
  //获取当前毫秒数
  var startTime = +new Date();  
  /*获取初始值*/
  var iCur = {};
  for(var attr in json){
    if(attr == 'opacity'){
      //对当前值的取值进行四舍五入，去除由于javascript小数计数中的bug存在的小尾巴
      iCur[attr] = Math.round(getCSS(obj,attr)*100);
    }else{
      //去掉单位
      iCur[attr] = parseInt(getCSS(obj,attr));
    }
  }
  //清除定时器
  cancelAnimationFrame(obj.timer);
  obj.timer = requestAnimationFrame(function func(){
    //获取t、d参数
    var d = times;
    var t = d - Math.max(0,startTime - (+new Date()) + d);
    for(var attr in json){
      /*获取b、c、p这三个参数*/
      var b = iCur[attr];
      var c = json[attr]-iCur[attr];
      var fxArr = fx.split('-');
      if(fxArr.length == 2){
        var p = Tween[fxArr[0]][fxArr[1]](t,b,c,d);
      }else{
        var p = Tween[fx](t,b,c,d);
      }     
      /*赋值操作*/
      if(attr == 'opacity'){
        obj.style.opacity = p / 100;
        obj.style.filter = 'alpha(opacity=' + p + ')';
      }else{
        obj.style[attr] = p + 'px';
      }  
    }
      obj.timer = requestAnimationFrame(func);
      /*运行指定时间后*/
      if(t == d){
        //清除定时器
        cancelAnimationFrame(obj.timer);
        //设置回调函数
        fn && fn.call(obj);        
      }    
  });
} 
```
&emsp;&emsp;下面是一个实例演示

```
<button id="btn">开始运动</button>
<button id="reset">还原</button>
<div id="test1" style="height: 100px;width: 100px;background-color: pink;position:absolute;left:0;"></div>
<div id="test2" style="height: 100px;width: 100px;background-color: blue;position:absolute;left:0;top: 140px;"></div>
<script src="https://demo.xiaohuochai.site/backup/tweenMove.js"></script>
<script>
reset.onclick = function(){history.go();}
btn.onclick = function(){
   tweenMove(test1,{width:50,height:50},500,'Bounce-easeInOut',function(){
    tweenMove(test2,{width:150},500,'Linear');
   });
   tweenMove(test2,{left:100},500,'Linear');
   
}
</script> 
```


<iframe style="width: 100%; height: 260px;" src="https://demo.xiaohuochai.site/js/move/time/t5.html" frameborder="0" width="230" height="240"></iframe>

&nbsp;

### Tween演示

&emsp;&emsp;下面利用封装好的运动框架tweenMove.js对tween算法中所有的运动形式进行演示

 <iframe style="width: 100%; height: 610px;" src="https://demo.xiaohuochai.site/js/move/time/t6.html" frameborder="0" width="230" height="240"></iframe>