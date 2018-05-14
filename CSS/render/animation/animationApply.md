# 动画animation的三个应用

&emsp;&emsp;前面介绍过[动画animation](http://www.cnblogs.com/xiaohuochai/p/5391663.html)的详细用法，本文主要介绍动画animation的三个效果

&nbsp;

### 漂浮的白云

**【效果演示】**

<iframe style="width: 100%; height: 320px;" src="https://demo.xiaohuochai.site/css/animationApply/a1.html" frameborder="0" width="320" height="240"></iframe>

【简要介绍】

 &emsp;&emsp;漂浮的白云主要通过远景白云和近景白云来实现立体漂浮效果。远景和近景分别使用两张背景图片，通过改变其背景定位来实现白云移动效果，通过设置不同的动画持续时间来实现交错漂浮的效果

【主要代码】

<div class="cnblogs_code">
<pre>.box{
    position: relative;
    height: 300px;
    width: 500px;
}    
.in1,.in2{
    position: absolute;
    height: 100%;
    width: 100%;
    background-size:cover;
    animation: move 100s infinite linear alternate;
}
@keyframes move{
    100%{background-position: 500% 0;}
}
.in1{
    background-image: url('http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/cloud.png');   
}
.in2{
    background-image: url('http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/cloud1.png');
    animation-duration: 10s;
}</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;div class="box"&gt;
    &lt;div class="in1"&gt;&lt;/div&gt;
    &lt;div class="in2"&gt;&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

[源码查看](http://runjs.cn/code/oktm6myl)

&nbsp;

### 旋转的星球

**【效果演示】**

<iframe style="width: 100%; height: 430px;" src="https://demo.xiaohuochai.site/css/animationApply/a2.html" frameborder="0" width="320" height="240"></iframe>

** 【简要介绍】**

&emsp;&emsp;旋转的星球主要通过rotate()旋转函数来实现。实际上，蓝色的地球和黑色的月球并没有发生旋转，只是其父级旋转形成的视觉上的旋转效果

**【代码演示】**

<div class="cnblogs_code">
<pre>.box{
    transform: scale(0.5);
    position: relative;
    padding: 1px;
    height: 300px;
    width: 300px;
}    
.sunline{
    position:relative;
    height: 400px;
    width: 400px;
    border: 2px solid black;
    border-radius: 50%;
    margin: 50px 0 0 50px;
    display: flex;
    animation: rotate 10s infinite linear;
}
.sun{
    height: 100px;
    width: 100px;
    margin: auto;
    background-color: red;
    border-radius: 50%;
    box-shadow: 5px 5px 10px red,-5px -5px 10px red,5px -5px 10px red,-5px 5px 10px red;
}
.earthline{
    position: absolute;
    right: 0;
    top: 50%;
    height: 200px;
    width: 200px;
    margin: -100px -100px 0 0;
    border: 1px solid black;
    border-radius: 50%;
    display: flex;
    animation: rotate 2s infinite linear;
}
.earth{
    margin: auto;
    height: 50px;
    width: 50px;
    background-color: blue;
    border-radius: 50%;
}
.moon{
    position: absolute;
    left: 0;
    top: 50%;
    height: 20px;
    width: 20px;
    margin: -10px 0 0 -10px;
    background-color: black;
    border-radius: 50%;
}
@keyframes rotate{
    100%{transform:rotate(360deg);}
}</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;div class="box"&gt;
    &lt;div class="sunline"&gt;
        &lt;div class="sun"&gt;&lt;/div&gt;
        &lt;div class="earthline"&gt;
            &lt;div class="earth"&gt;&lt;/div&gt;
            &lt;div class="moon"&gt;&lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

[源码查看](http://runjs.cn/code/luovzwqz)&nbsp;

【进阶使用】

&emsp;&emsp;如果要在内侧旋转的球内放文本，并且文本不跟着旋转，则代码如下

<div class="cnblogs_code">
<pre>@keyframes spin{100%{transform:rotate(1turn);}}
.outer{width: 100px;height: 100px;background-color: pink;border-radius: 50%;animation: spin 3s linear infinite;animation-play-state:running;text-align: center;}
.inner{width: 40px;height: 40px;line-height:40px;background-color: tan;border-radius: 50%;animation: inherit;animation-direction:reverse;}
div:hover,div:focus{
  animation-play-state:paused;
}</pre>
</div>

&emsp;&emsp;鼠标移入后，动画停止；移出时，动画继续

<iframe style="width: 100%; height: 160px;" src="https://demo.xiaohuochai.site/css/animationApply/a3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 正方体合成

**【效果演示】**

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/animationApply/a4.html" frameborder="0" width="320" height="240"></iframe>

**【简要介绍】**

&emsp;&emsp;该效果主要通过设置计算后的延迟时间来达到正方体的各个边顺序动画的效果。一次动画结束后，通过触发animationend事件重置animation-name来实现重复动画的效果

**【代码演示】**

<div class="cnblogs_code">
<pre>ul{
    margin: 0;
    padding: 0;
    list-style: none;
}
.box{
    height: 100px;
    width: 100px;
    perspective: 500px;
    margin: 50px 0 0 50px;
}    
.list{
    position: relative;
    height: 100px;
    width: 100px;
    background-color: blue;
    transform-style: preserve-3d;
    transform-origin: 0 0 0;
    animation: rotate 1s  10s 3 both linear;
}
.in{
    position: absolute;
    height: 100px;
    width: 100px;
}
.list .in:nth-child(6){
    background-color: pink;
    transform-origin: top;
    animation: in6 2s both;
}
.list .in:nth-child(5){
    background-color: lightgreen;
    transform-origin: right;
    animation: in5 2s 2s both;
}
.list .in:nth-child(4){
    background-color: lightblue;
    transform-origin: bottom;
    animation: in4 2s 4s both;
}
.list .in:nth-child(3){
    background-color: lightcoral;
    transform-origin: left;
    animation: in3 2s 6s both;
}
.list .in:nth-child(2){
    background-color: lightcyan;
    animation: in2 2s 8s both;
}
.list .in:nth-child(1){background-color: lightsalmon;}
.box:hover .list{animation-play-state: paused;}
.box:hover .in{animation-play-state: paused;}
@keyframes in6{100%{transform: rotateX(90deg);}}
@keyframes in5{100%{transform: rotateY(90deg);}}
@keyframes in4{100%{transform: rotateX(-90deg);}}
@keyframes in3{100%{transform: rotateY(-90deg);}}
@keyframes in2{100%{transform: translateZ(100px);}}
@keyframes rotate{100%{transform: rotate3d(1,1,1,360deg);}}</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;div class="box"&gt;
    &lt;ul class="list" id="list"&gt;
        &lt;li class="in"&gt;&lt;/li&gt;
        &lt;li class="in"&gt;&lt;/li&gt;
        &lt;li class="in"&gt;&lt;/li&gt;
        &lt;li class="in"&gt;&lt;/li&gt;
        &lt;li class="in"&gt;&lt;/li&gt;
        &lt;li class="in"&gt;&lt;/li&gt;
    &lt;/ul&gt;
&lt;/div&gt;</pre>
</div>
<div class="cnblogs_code">
<pre>list.addEventListener('animationend',function(e){
    e = e || event;
    var target = e.target || e.srcElement;
    if(target.nodeName == 'UL'){
        list.style.animationName = 'none';
        var children = list.getElementsByTagName('li');
        for(var i = 0; i &lt; children.length;i++){
            children[i].style.animationName = 'none';
        }
        setTimeout(function(){
            list.style.animationName = 'rotate';
            var children = list.getElementsByTagName('li');
            for(var i = 0; i &lt; children.length;i++){
                children[i].style.animationName = 'in' + (i+1);
            }        
        },100);        
    }
},false);</pre>
</div>

[源码查看](http://runjs.cn/code/fpg2ht6q)

