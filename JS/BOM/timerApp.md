# 深入理解定时器系列第三篇——定时器应用(时钟、倒计时、秒表和闹钟)

&emsp;&emsp;本文属于定时器的应用部分，分别用于实现与时间相关的四个应用，包括时钟、倒计时、秒表和闹钟。与时间相关需要用到时间和日期对象Date，详细情况[移步至此](http://www.cnblogs.com/xiaohuochai/p/5663102.html)

&nbsp;

### 时钟

&emsp;&emsp;最简单的时钟制作办法是通过[正则表达式](http://www.cnblogs.com/xiaohuochai/p/5608807.html)的[exec()方法](http://www.cnblogs.com/xiaohuochai/p/5612230.html#anchor4)，将时间对象的字符串中的时间部分截取出来，使用定时器刷新即可

<div>
<pre>&lt;div id="myDiv"&gt;&lt;/div&gt;
&lt;script&gt;
myDiv.innerHTML = /\d\d:\d\d:\d\d/.exec(new Date().toString())[0];
setInterval(function(){
    myDiv.innerHTML = /\d\d:\d\d:\d\d/.exec(new Date().toString())[0];    
},500);
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/timerApp/t1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 倒计时

【1】简易倒计时

&emsp;&emsp;简易倒计时就是每1s通过setInterval将设置的时间减去1来达到要求

<div>
<pre>&lt;div id="myDiv"&gt;
    &lt;label for="set"&gt;&lt;input type="number" id="set" step="1" value="0"&gt;秒&lt;/label&gt;
    &lt;button id="btn"&gt;确定&lt;/button&gt;
    &lt;button id="reset"&gt;重置&lt;/button&gt;    
&lt;/div&gt;
&lt;script&gt;
var timer;
reset.onclick = function(){
    history.go();
}
btn.onclick = function(){
    if(timer) return;
    set.setAttribute('disabled','disabled');
    timer = setInterval(function(){
        if(Number(set.value) === 0){
            clearInterval(timer);
            timer = 0;
            set.removeAttribute('disabled');
            return;
        }
        set.value = Number(set.value) - 1;
    },1000);
}    
&lt;/script&gt;</pre>
</div>

<iframe style="line-height: 1.5; width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/timerApp/t2.html" frameborder="0" width="320" height="240"></iframe>

【2】精确倒计时

&emsp;&emsp;由定时器的[运行机制](http://www.cnblogs.com/xiaohuochai/p/5773183.html#anchor3)，我们知道每间隔1000ms去改变时间的作法并不可靠。更精确地做法，应该是与系统的运行时间作为参照，倒计时的时间变化与系统的时间变化同步，达到精确倒计时的效果　

&emsp;&emsp;注意：此部分中，需要通过[取模运算](http://www.cnblogs.com/xiaohuochai/p/5589785.html#anchor9)和[除法运算](http://www.cnblogs.com/xiaohuochai/p/5589785.html#anchor8)进行时、分、秒的计算，详细情况[移步至此](http://www.cnblogs.com/xiaohuochai/p/5663214.html#anchor6)

<div>
<pre>&lt;div id="myDiv"&gt;
    &lt;label for="hour"&gt;&lt;input type="number" id="hour" min="0" max="23" step="1" value="0" /&gt;时&lt;/label&gt;
    &lt;label for="minute"&gt;&lt;input type="number" id="minute" min="0" max="59" step="1" value="0" /&gt;分&lt;/label&gt;
    &lt;label for="second"&gt;&lt;input type="number" id="second" min="0" max="23" step="1" value="0" /&gt;秒&lt;/label&gt;
    &lt;button id="btn"&gt;确定&lt;/button&gt;
    &lt;button id="reset"&gt;重置&lt;/button&gt;
&lt;/div&gt;
&lt;script&gt;
var timer;
//输入限制
hour.onchange = function(){
    if(Number(this.value) !== Number(this.value)) this.value = 0;
    if(this.value &gt; 23) this.value = 23;
    if(this.value &lt; 0) this.value = 0;
}
second.onchange = minute.onchange = function(){
    if(Number(this.value) !== Number(this.value)) this.value = 0;
    if(this.value &gt; 59) this.value = 59;
    if(this.value &lt; 0) this.value = 0;
}
reset.onclick = function(){
    history.go();
}
btn.onclick = function(){
    if(timer) return;
    for(var i = 0; i &lt; 3; i++){
        myDiv.getElementsByTagName('input')[i].setAttribute('disabled','disabled');
    }
    //原始储存值
    var setOri = hour.value*3600 + minute.value*60 + second.value*1;
    //原始系统时间值
    var timeOri = (new Date()).getTime();
    //现在所剩时间值
    var setNow;
    cancelAnimationFrame(timer);
    timer = requestAnimationFrame(function fn(){
        //当前系统时间值
        var timeNow = (new Date()).getTime();
        //使系统时间的差值与设置时间的差值相等，来获得正常的时间变化
        setNow = setOri - Math.floor((timeNow - timeOri)/1000);
        hour.value = Math.floor((setNow%86400)/3600);
        minute.value = Math.floor((setNow%3600)/60);
        second.value = Math.floor(setNow%60);
        timer = requestAnimationFrame(fn);
        if(setNow==0){
            cancelAnimationFrame(timer);
            timer = 0;
            btn.innerHTML = '计时结束';
            for(var i = 0; i &lt; 3; i++){
                myDiv.getElementsByTagName('input')[i].removeAttribute('disabled');
            }
            setTimeout(function(){
                btn.innerHTML = '确定';
            },1000)            
        }
    })
}
&lt;/script&gt;</pre>
</div>

<iframe style="line-height: 1.5; width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/timerApp/t3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 秒表

【1】简易秒表

&emsp;&emsp;秒表与倒计时的思路相同，相比而言，更加简单。每间隔100ms增加100ms即可

<div>
<pre>&lt;div id="myDiv"&gt;
    &lt;label for="set"&gt;&lt;input id="set" value="0"&gt;&lt;/label&gt;
    &lt;button id="btn"&gt;开始&lt;/button&gt;
    &lt;button id="reset"&gt;重置&lt;/button&gt;    
&lt;/div&gt;
&lt;script&gt;
var timer;
var con = 'off';
var num = 0;
reset.onclick = function(){
    history.go();
}
btn.onclick = function(){
    if(con === 'off'){
        set.setAttribute('disabled','disabled');
        con = 'on';
        btn.innerHTML = '暂停';
        timer = setInterval(function(){
            num+= 100;
            var minute = Math.floor(num/1000/60);
            var second = Math.floor(num/1000);
            var ms = Math.floor(num%1000)/100;
            set.value = minute + ' : ' + second + ' . ' + ms; 
        },100);
    }else{
        clearInterval(timer);
        con = 'off';
        btn.innerHTML = '开始';    
    }
}    
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/timerApp/t4.html" frameborder="0" width="320" height="240"></iframe>

【2】精确秒表

&emsp;&emsp;与倒计时类似，使用计时器的时间间隔作为时间变化的参照是不准确的。更精确的做法，应该是使用系统的时间变化作为秒表的变化的参照

<div>
<pre>&lt;div id="myDiv"&gt;
    &lt;label for="set"&gt;&lt;input id="set" value="0"&gt;&lt;/label&gt;
    &lt;button id="btn"&gt;开始&lt;/button&gt;
    &lt;button id="reset"&gt;重置&lt;/button&gt;    
&lt;/div&gt;
&lt;script&gt;
var timer;
var con = 'off';
//ori表示初始的系统时间
var ori;
//dis表示当前运行时的秒数(动态)
var dis = 0;
//last储存暂停时的秒数(静态)
var last = 0;
reset.onclick = function(){
    history.go();
}
btn.onclick = function(){
    if(con === 'off'){
        set.setAttribute('disabled','disabled');
        con = 'on';
        btn.innerHTML = '暂停';
        //保留已经走过的秒数的系统时间
        ori = (new Date()).getTime() - last; 
        timer = requestAnimationFrame(function fn(){
            dis = (new Date()).getTime() - ori;
            cancelAnimationFrame(timer);
            timer = requestAnimationFrame(fn);
            var minute = Math.floor(dis/1000/60);
            var second = Math.floor(dis/1000);
            var ms = Math.floor(dis%1000);
            set.value = minute + ' : ' + second + ' . ' + ms; 
        });
    }else{
        cancelAnimationFrame(timer);
        btn.innerHTML = '开始';    
        con = 'off';
        last = dis;
    }
}    
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/timerApp/t5.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 闹钟

&emsp;&emsp;闹钟其实就是在时钟的基础上增加一个预定时间设置，闹钟设置需要将设置时间转换成距离1970年1月1日的毫秒数，然后再算出与当前时间的差值。随着当前时间的不断增加，当差值为0时，闹钟响起

<div>
<pre>&lt;div id="myDiv"&gt;&lt;/div&gt;
&lt;div id="con"&gt;
    &lt;label for="hour"&gt;&lt;input type="number" id="hour" min="0" max="23" step="1" value="0" /&gt;时&lt;/label&gt;
    &lt;label for="minute"&gt;&lt;input type="number" id="minute" min="0" max="59" step="1" value="0" /&gt;分&lt;/label&gt;
    &lt;label for="second"&gt;&lt;input type="number" id="second" min="0" max="23" step="1" value="0" /&gt;秒&lt;/label&gt;
    &lt;button id="btn"&gt;确定&lt;/button&gt;
    &lt;button id="reset"&gt;重置&lt;/button&gt;
&lt;/div&gt;
&lt;div id="show"&gt;&lt;/div&gt;
&lt;script&gt;
var timer;
//所剩时间
var dis;
myDiv.innerHTML = /\d\d:\d\d:\d\d/.exec(new Date().toString())[0];
setInterval(function(){
    myDiv.innerHTML = /\d\d:\d\d:\d\d/.exec(new Date().toString())[0];    
},100);
reset.onclick = function(){
    history.go();
}
btn.onclick = function(){
    //原始储存值
    var setOri = hour.value*3600 + minute.value*60 + second.value*1;
    //原始值转换为1970年的毫秒数
    var setMs = +new Date(new Date().toDateString()) + setOri*1000;
    //如果设置的时间早于当前时间，则设置无效
    if(setMs &lt; +new Date()){
        return;
    }
    for(var i = 0; i &lt; 3; i++){
        con.getElementsByTagName('input')[i].setAttribute('disabled','disabled');
    }
    cancelAnimationFrame(timer);
    timer = requestAnimationFrame(function fn(){
        //算出设置时间与当前时间的差值
        dis = Math.ceil((setMs - (new Date()).getTime())/1000);
        var showHour = Math.floor((dis%86400)/3600);
        var showMinute = Math.floor((dis%3600)/60);
        var showSecond = Math.floor(dis%60);
        timer = requestAnimationFrame(fn);
        show.innerHTML = '距离预定时间还有 ' + showHour + '小时 ' + showMinute + '分 ' + showSecond + '秒';
        //当差值为0时，时间到
        if(dis==0){
            cancelAnimationFrame(timer);
            btn.innerHTML = '时间到了';
            for(var i = 0; i &lt; 3; i++){
                con.getElementsByTagName('input')[i].removeAttribute('disabled');
            }
            timer = setTimeout(function(){
                btn.innerHTML = '确定';
            },1000)            
        }
    });
}
&lt;/script&gt;</pre>
</div>

<iframe style="line-height: 1.5; width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/js/timerApp/t6.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

## 最后

&emsp;&emsp;作为定时器来说，最麻烦的地方是定时器管理。如果，定时器只开启不关闭，则会造成定时器叠加效果，使得运行越来越快。所以，先关闭再启用定时器是一个好习惯

&emsp;&emsp;上面四个应用加上之前的[日历效果](http://www.cnblogs.com/xiaohuochai/p/5662213.html)，基本囊括了关于日期和时间的应用。基本原理都类似，剩下的就是CSS美化和js代码优化问题

&emsp;&emsp;欢迎交流

