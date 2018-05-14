# 深入理解CSS动画animation

&emsp;&emsp;[transition](http://www.cnblogs.com/xiaohuochai/p/5347930.html)过渡是通过初始和结束两个状态之间的平滑过渡实现简单动画的；而animation则是通过关键帧@keyframes来实现更为复杂的动画效果。本文将介绍关于animation动画的相关知识

&nbsp;

### 定义

&emsp;&emsp;和transition类似，animation也是一个复合属性，包括animation-name、animation-duration、animation-timing-function、animation-delay、animation-iteration-count、animation-direction、animation-play-state、animation-fill-mode共8个子属性

&emsp;&emsp;注意：IE9-不支持；safari4-8、IOS3.2-8.4、android2.1-4.4.4需要添加-webkit-前缀

<div>
<pre>animation-name: 动画名称(默认值为none)
animation-duration: 持续时间(默认值为0)
animation-timing-function: 时间函数(默认值为ease)
animation-delay: 延迟时间(默认值为0)
animation-iteration-count: 循环次数(默认值为1)
animation-direction: 动画方向(默认值为normal)
animation-play-state: 播放状态(默认值为running)
animation-fill-mode: 填充模式(默认值为none)</pre>
</div>
<div>
<pre>div{
    width: 300px;
    height: 100px;
    background-color: pink;
    animation-name: test;
    animation-duration: 3s;
    animation-timing-function: ease;
    animation-delay: 0s;
    animation-iteration-count: infinite;
    animation-direction: normal;
    animation-play-state: running;
    animation-fill-mode: none;
}
/* 关于keyframes关键帧的内容稍后介绍     */
@keyframes test{
    0%{background-color: lightblue;}
    30%{background-color: lightgreen;}
    60%{background-color: lightgray;}
    100%{background-color: black;}
}</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/animation/a1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 关键帧

&emsp;&emsp;animation制作动画效果需要两步，首先用关键帧声明动画，再用animation调用动画

&emsp;&emsp;关键帧的语法是以@keyframes开头，后面紧跟着动画名称animation-name。from等同于0%，to等同于100%。百分比跟随的花括号里面的代码，代表此时对应的样式

<div>
<pre>@keyframes animation-name{
    from | 0%{}
    n%{}
    to | 100%{}
}</pre>
</div>

【1】百分比顺序不一定非要从0%到100%排列，最终浏览器会自动按照0%-100%的顺序进行解析

&emsp;&emsp;注意：0%不可以省略百分号

<div>
<pre>@keyframes test{
    100%{background-color: black;}
    60%{background-color: lightgray;}
    30%{background-color: lightgreen;}
    0%{background-color: lightblue;}
}</pre>
</div>
<div>
<pre>div{
    width: 300px;
    height: 100px;
    background-color: pink;
    animation-name: test;
    animation-duration: 3s;
    animation-iteration-count: infinite;
}</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/animation/a2.html" frameborder="0" width="320" height="240"></iframe>

 【2】如果存在负百分数或高于100%的百分数，则该关键帧将被忽略

<div>
<pre>/* -20%和120%对应的代码无效*/
@keyframes test{
    -20%{background-color: red;}
    0%{background-color: lightblue;}
    30%{background-color: lightgreen;}
    60%{background-color: lightgray;}
    100%{background-color: black;}
    120%{background-color: yellow;}
}</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/animation/a3.html" frameborder="0" width="320" height="240"></iframe>

 【3】如果0%或100%不指定关键帧，将使用该元素默认的属性值

<div>
<pre>/* 0%和100%对应的颜色是默认值pink*/
@keyframes test{
    30%{background-color: lightgreen;}
    60%{background-color: lightgray;}
}</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/animation/a4.html" frameborder="0" width="320" height="240"></iframe>

【4】若存在多个@keyframes，浏览器只识别最后一个@keyframes里面的值&nbsp;

<div>
<pre>/* 后面覆盖前面 */
@keyframes test{
    0%{background-color: lightblue;}
    30%{background-color: lightgreen;}
    60%{background-color: lightgray;}
    100%{background-color: black;}
}
@keyframes test{
    0%{background-color: blue;}
    30%{background-color: green;}
    60%{background-color: gray;}
    100%{background-color: black;}
}</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/animation/a5.html" frameborder="0" width="320" height="240"></iframe>

【5】空的keyframes规则是有效的，它们会覆盖前面有效的关键帧规则

<div>
<pre>/* 后面覆盖前面 */
@keyframes test{
    0%{background-color: lightblue;}
    30%{background-color: lightgreen;}
    60%{background-color: lightgray;}
    100%{background-color: black;}
}
@keyframes test{
}</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/animation/a6.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 动画属性

**动画名称**

animation-name

&emsp;&emsp;值: none | &lt;single-animation-name&gt; [, &lt;single-animation-name&gt; ]*

&emsp;&emsp;初始值: none

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 无

<div>
<pre>&lt;single-animation-name&gt;: none | 自定义动画名称</pre>
</div>

【1】如果多个动画试图修改相同的属性，那么动画列表的后面覆盖前面

<div>
<pre>/* animation-name的顺序是test1,test2，且它们修改的是同样的属性，后面覆盖前面，所以test2有效，test1无效 */
div{
    width: 300px;
    height: 100px;
    background-color: pink;
    animation-name: test1,test2;
    animation-duration: 3s;
    animation-iteration-count: infinite;
}
@keyframes test2{
    0%{background-color: blue;}
    30%{background-color: green;}
    60%{background-color: gray;}
    100%{background-color: black;}
}
@keyframes test1{
    0%{background-color: lightblue;}
    30%{background-color: lightgreen;}
    60%{background-color: lightgray;}
    100%{background-color: black;}
}</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/animation/a7.html" frameborder="0" width="320" height="240"></iframe>

【2】如果动画的其他7个子属性和动画名称的长度不同，动画名称列表的长度决定最终的长度，多余的值无余，缺少的值按照顺序进行重复

<div>
<pre>div{
    width: 300px;
    height: 100px;
    position: relative;
    background-color: pink;
    animation-name: test1,test2,test3;
    animation-duration: 3s,1s;
    animation-iteration-count: infinite;
}
@keyframes test1{
    0%{background-color: lightblue;}
    30%{background-color: lightgreen;}
    60%{background-color: lightgray;}
    100%{background-color: black;}
}
@keyframes test2{
    0%{font-size: 20px;}
    30%{font-size: 30px;}
    60%{font-size: 40px;}
    100%{font-size: 50px;}
}
@keyframes test3{
    0%{left: 0px;}
    30%{left: 30px;}
    60%{left: 40px;}
    100%{left: 50px;}
}</pre>
</div>
<div>
<pre>&lt;div&gt;测试文字&lt;/div&gt;    </pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/animation/a8.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

**持续时间**

&emsp;&emsp;持续时间指完成动画的时间

animation-duration

&emsp;&emsp;值: &lt;time&gt; [, &lt;time&gt;]*

&emsp;&emsp;初始值: 0s

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 无

<div>
<pre>animation-duration: &lt;time&gt;[,&lt;time&gt;]*</pre>
</div>

&emsp;&emsp;0s意味着动画没有时间，持续时间不能为负值

<div>
<pre>animation-name: test1,test2;
/*test1的持续时间设置为负值，将使得整个动画持续时间都失效，因此test2也将没有动画效果 */
animation-duration: -1s,1s;</pre>
</div>

&nbsp;

**时间函数**

animation-timing-function

&emsp;&emsp;值: &lt;single-timing-function&gt; [, &lt;single-timing-function&gt;]*

&emsp;&emsp;初始值: ease

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 无

&emsp;&emsp;animation的时间函数类似于[transition的时间函数](http://www.cnblogs.com/xiaohuochai/p/5347930.html#anchor5)。时间函数可以应用于整个动画中，也可以应用于关键帧的某两个百分比之间

<div>
<pre>div{
    width: 300px;
    height: 100px;
    position: relative;
    background-color: pink;
    animation-name: test;
    animation-duration: 5s;
    animation-iteration-count: infinite;
}
@keyframes test{
    0%{left: 0px;animation-timing-function: ease;}
    20%{left: 50px;animation-timing-function: linear;}
    40%{left: 100px;animation-timing-function: ease-in;}
    60%{left: 150px;animation-timing-function: ease-out;}
    80%{left: 200px;animation-timing-function: step-start;}
    100%{left: 250px;animation-timing-function: step-end;}
}</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/animation/a9.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

**循环次数**

animation-iteration-count

&emsp;&emsp;值: infinite | &lt;number&gt;[,infinite | &lt;number&gt;]*

&emsp;&emsp;初始值: 1

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 无

&emsp;&emsp;默认为1，可以是整数也可以小数，但不能是0和负数。如果为infinite则表示无限次动画

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/animation/a10.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

**动画方向**

&emsp;&emsp;动画方向用来定义是否动画需要反向播放

animation-direction

&emsp;&emsp;值: &lt;single-animation-direction&gt;[,&lt;single-animation-direction&gt; ]*

&emsp;&emsp;初始值: normal

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 无

<div>
<pre>&lt;single-animation-direction&gt; = normal | reverse | alternate | alternate-reverse
normal: 正向播放
reverse: 反向播放
alternate: 若动画只播放一次，则和正向播放一样。若播放两次以上，偶数次效果为反向播放
alternate-reverse: 若动画只播放一次，则和反向播放一样。若播放两次以上，偶数次效果为正向播放</pre>
</div>

&emsp;&emsp;注意：safari浏览器不支持reverse属性和alternate-reverse属性

<iframe style="width: 100%; height: 350px;" src="https://demo.xiaohuochai.site/css/animation/a11.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

**动画状态**

animation-play-state

&emsp;&emsp;值:running | paused[,running | paused]*

&emsp;&emsp;初始值: running

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 无

&emsp;&emsp;running表示播放中，paused表示动画暂停

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/animation/a12.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

**延迟时间**

&emsp;&emsp;定义延迟多少时间后动画开始播放

animation-delay

&emsp;&emsp;值: &lt;single-animation-delay&gt;[,&lt;single-animation-delay&gt; ]*

&emsp;&emsp;初始值: 0s

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 无

<div>
<pre>&lt;single-animation-delay&gt;= &lt;time&gt;[,&lt;time&gt;]*</pre>
</div>

&emsp;&emsp;注意：该延迟时间是指整个动画的延迟时间，而不是每个循环的延迟时间，只在动画开始时进行一次时间延迟

&emsp;&emsp;如果该值是负值，则表示动画的起始时间从0s变为延迟时间的绝对值

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/animation/a13.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

**填充模式**

&emsp;&emsp;定义动画开始帧之前和结束帧之后的动作

&emsp;&emsp;注意：android2.1-3不支持animation-fill-mode

animation-fill-mode

&emsp;&emsp;值: &lt;single-animation-fill-mode&gt;[,&lt;single-animation-fill-mode&gt; ]*

&emsp;&emsp;初始值: none

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 无

<div>
<pre>&lt;single-animation-fill-mode&gt; = none | forwards | backwards | both</pre>
</div>
<div>
<pre>none: 动画结束后，元素移动到初始状态
    注意：初始状态并不是指0%的元素状态，而是元素本身属性值
forwards: 元素停在动画结束时的位置
    注意：动画结束时的位置并不一定是100%定义的位置，因为动画有可能反向运动，也有可能动画的次数是小数
backwards:在animation-delay的时间内，元素立刻移动到动画开始时的位置。若元素无animation-delay时，与none的效果相同
    注意：动画开始时的位置也不一定是0%定义的位置，因为动画有可能反向运动。
both: 同时具有forwards和backwards的效果</pre>
</div>

&emsp;&emsp;注意：当持续时间animation-duration为0s时，animation-fill-mode依然适用，当animation-fill-mode的值为backwards时，动画填充在任何animation-delay的阶段。当animation-fill-mode的值为forwards时，动画将保留在100%的关键帧上

<iframe style="width: 100%; height: 550px;" src="https://demo.xiaohuochai.site/css/animation/a14.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 多值

animation

&emsp;&emsp;值: &lt;single-animation&gt;[,&lt;single-animation&gt; ]*

&emsp;&emsp;初始值: 无

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 无

<div>
<pre>&lt;single-animation&gt; = &lt;single-animation-name&gt; || &lt;single-animation-duration&gt; || &lt;single-animation-timing-function&gt; || &lt;single-animation-delay&gt; || &lt;single-animation-iteration-count&gt; || &lt;single-animation-direction&gt; || &lt;single-animation-fill-mode&gt; || &lt;single-animation-play-state&gt;</pre>
</div>

&emsp;&emsp;注意：持续时间在前，延迟时间在后，若只存在一个时间，则是持续时间

<div>
<pre>div{
    width: 300px;
    height: 100px;
    background-color: pink;
    animation: 1s test1,infinite test2 2s 1s;
}
@keyframes test1{
    30%{background-color: red;}
    60%{background-color: blue;}
    100%{background-color: green;}
}
@keyframes test2{
    100%{color: white;}
}</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/css/animation/a15.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### API

&emsp;&emsp;animation涉及到的事件有animationstart、animationend、animationiteration三个。这三个事件的bubbles都是yes，cancelable都是no

&emsp;&emsp;注意：对于safari浏览器，animation的事件为webkitAnimationStart、webkitAnimationEnd、webkitAnimationIteration

&emsp;&emsp;注意：动画事件只支持DOM2级事件处理程序的写法

animationstart

&emsp;&emsp;发生在动画开始时

&emsp;&emsp;【1】如果存在delay，且delay为正值，则元素等待延迟完毕后，再触发该事件

&emsp;&emsp;【2】如果delay为负值，则元素先将初始值变为delay的绝对值时，再触发该事件

<div>
<pre>oSb.addEventListener('animationstart',function(){
    this.innerHTML = '动画开始';
    this.style.background = 'lightgreen';
},false);</pre>
</div>

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/animation/a16.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

animationend

&emsp;&emsp;发生在动画结束时

<div>
<pre>test.addEventListener('animationend',function(){
    this.style.background="lightgreen";
    this.innerHTML = '动画结束';
},false);</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/css/animation/a17.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

animationiteration

&emsp;&emsp;发生在动画的一次循环结束时，只有当iteration-count循环次数大于1时，触发该事件

<div>
<pre>var i = 0;
oSb.addEventListener('animationiteration',function(){
    i++;
    this.innerHTML = i;
},false);</pre>
</div>

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/animation/a18.html" frameborder="0" width="320" height="240"></iframe>

【补充】

&emsp;&emsp;只有改变animation-name时，才会使animation动画效果重新触发

<div>
<pre>oSb.style.animationName = 'none';
setTimeout(function(){
    oSb.style.animationName = 'test';
},100);</pre>
</div>

**属性**

&emsp;&emsp;这三个事件的事件对象，都有animationName和elapsedTime属性这两个私有属性

<div>
<pre>animationName属性:返回产生过渡效果的CSS属性名
elapsedTime属性:动画已经运行的秒数</pre>
</div>

&emsp;&emsp;注意：对于animationstart事件，elapsedTime属性等于0，除非animation-delay属性等于负值

<div>
<pre>&lt;style&gt;
#test{height:100px;width:300px;background-color:lightblue;animation:anim 2s 3;}
@keyframes anim{
    0%{height: 100px;}
    50%{height: 50px;}
    100%{height: 0;}
}
&lt;/style&gt;

&lt;button id='reset'&gt;还原&lt;/button&gt;
&lt;div id="test"&gt;&lt;/div&gt;
&lt;script&gt;
reset.onclick = function(){
    history.go();
}
test.addEventListener("animationstart", listener, false);
test.addEventListener("animationend", listener, false);
test.addEventListener("animationiteration", listener, false);
function listener(e){
    e = e || event;
    var li = document.createElement("li");
    switch(e.type) {
    case "animationstart":
      li.innerHTML = "Started: elapsed time is " + e.elapsedTime;
      break;
    case "animationend":
      li.innerHTML = "Ended: elapsed time is " + e.elapsedTime;
      break;
    case "animationiteration":
      li.innerHTML = "New loop started at time " + e.elapsedTime;
      break;
    }
    test.appendChild(li);
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 170px;" src="https://demo.xiaohuochai.site/css/animation/a19.html" frameborder="0" width="320" height="240"></iframe>

