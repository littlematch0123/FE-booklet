# 深入理解CSS元素可见性visibility

&emsp;&emsp;visibility属性常见于与display属性的比较中。但实际上，该属性有自己的一些有趣的用途。本文就visibility属性做详细整理和说明

&nbsp;

### 定义

visibility

&emsp;&emsp;值: visible | hidden | collapse | inherit

&emsp;&emsp;初始值: visible

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 有

<iframe style="width: 100%; height: 260px;" src="https://demo.xiaohuochai.site/css/visibility/v1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 属性

&emsp;&emsp;visible：元素可见

&emsp;&emsp;hidden：元素不可见，但元素还是会影响文档的布局

&emsp;&emsp;注意：可以将一个hidden元素的后代元素置为visible，这会使该后代元素正常出现

<iframe style="width: 100%; height: 260px;" src="https://demo.xiaohuochai.site/css/visibility/v2.html" frameborder="0" width="320" height="240"></iframe>

　collapse：在表格中&lt;col&gt;或&lt;colgroup&gt;中使用，表示该列或列组的所有单元格不显示。如果用于非表格元素，collapse与hidden含义相同

&emsp;&emsp;注意：webkit内核浏览器不支持给&lt;col&gt;或&lt;colgroup&gt;元素使用collapse属性

<iframe style="width: 100%; height: 260px;" src="https://demo.xiaohuochai.site/css/visibility/v3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### display

&emsp;&emsp;visibility:hidden与display:none作为隐藏元素的两种方式，常常被人们拿来比较。其实区别很简单，前者不脱离文档流，保留隐藏之前元素占据的物理区域；而后者则脱离文档流，如果重新显示则需要页面的重新绘制。还有一点区别却很少人提到，如果父级设置display:none;子级设置display:block也不会显示；而如果父级设置visibility:hidden;子级设置visibility:visible时子级会显示出来

<iframe style="width: 100%; height: 260px;" src="https://demo.xiaohuochai.site/css/visibility/v4.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### JS

&emsp;&emsp;当元素通过设置visibiliy:hidden之后，虽然还占据物理区域，但已经不可以接受js效果

&emsp;&emsp;//js效果:当鼠标移入元素时，父级的背景颜色变成黑色；移出时背景颜色恢复初始值

<iframe style="width: 100%; height: 260px;" src="https://demo.xiaohuochai.site/css/visibility/v5.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### transition

&emsp;&emsp;其实visibility是离散步骤，在0到1数字范围之内，0表示隐藏，1表示显示。visibility:hidden可以看成visibility:0；visibility:visible可以看成visibility:1。于是，visibility应用transition等同于0~1之间的过渡效果。实际上，只要visibility的值大于0就是显示的。由于这个现象，我们可以利用transition实现元素的延时显示隐藏

<div>
<pre>#oShow{
    visibility: visible;
    transition: visibility 0.2s  0.5s;
}
#oShow:hover{
    visibility: hidden;
}</pre>
</div>

<iframe style="width: 100%; height: 260px;" src="https://demo.xiaohuochai.site/css/visibility/v6.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;visibility配合opacity和transtion可以实现真正的元素淡入淡出。如果只用opacity时，即使最后元素opacity变为0，但实现上该图片还是可以覆盖其他元素以及可以接受js效果。所以使用visibility可以实现元素真正的隐藏

<div>
<pre>#oShow{
    visibility: visible;
    opacity: 1;
    transition: 1s;
}
#oShow:hover{
    visibility: hidden;
    opacity: 0;
}</pre>
</div>

<iframe style="width: 100%; height: 260px;" src="https://demo.xiaohuochai.site/css/visibility/v7.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### API

&emsp;&emsp;当前浏览器大部分都是多tab页(多标签页)的模式，但这些页面性能却参差不齐。对于某些性能很差的页面，当用户从其他tab页切换回来时，有可能出现由于页面性能差出现页面错乱、页面卡死甚至浏览器卡死的情况

&emsp;&emsp;HTML5新增了页面可见性API。该API有两个属性，一个事件

&emsp;&emsp;注意：IE9-和safari浏览器不支持。所以可以通过document.hidden !== 'undefined'来做浏览器的识别

&emsp;&emsp;document.hidden: 表示当前页面是否可见

&emsp;&emsp;当前tab页处于激活态时，document.hidden的属性值是false，否则是true

&emsp;&emsp;document.visibilityState: 返回当前页面的可见状态

<div>
<pre>hidden: 当浏览器最小化、切换tab、电脑锁屏时
visible: 用户正在查看当前页面时
prerender: 文档加载离屏或者不可见
unloaded: 当文档将要被unload时</pre>
</div>

&emsp;&emsp;注意：prerender和undloaded不是所有浏览器都支持，用的也不多

&emsp;&emsp;visibilitychange事件: 当document.visibilityState状态变化时触发该事件

**应用场景**

&emsp;&emsp;1、当页面属性是hidden时，停止页面中选项卡的定时器或页面中的动画等，减少内存占用

&emsp;&emsp;2、当通过页面状态的切换，来控制音乐或视频的播放或停止

&emsp;&emsp;3、...

&nbsp;

### DEMO

【1】页面为非激活页时，暂停页面中的动画；重新激活时，继续动画效果

<div>
<pre>.box{
    width: 500px;
    background-color: lightgreen;
    border: 1px solid black;
}
@keyframes loop{
    0%{
        width: 100px;
    }
    100%{
        width: 500px;
    }
}
#div{
    width: 100px;
    height: 100px;
    background-color: pink;
    animation: loop 200s alternate infinite linear;
}    </pre>
</div>
<div>
<pre>&lt;div class="box"&gt;
    &lt;div id="div"&gt;&lt;/div&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>function getCSS(obj,style){
    if(window.getComputedStyle){
        return getComputedStyle(obj)[style];
    }
    return obj.currentStyle[style];
};
var oTimer = setInterval(function(){
    document.title=div.innerHTML = parseInt(getCSS(div,'width'));
},100);
document.addEventListener('visibilitychange',function(){
    if(document.hidden){
        div.style.animationPlayState = 'paused';
    }else{
        div.style.animationPlayState = 'running';
    }
},false);</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/visibility/v8.html" frameborder="0" width="320" height="240"></iframe>

【2】页面切换来控制音乐的播放和暂停

<div>
<pre>&lt;audio id="audio" src="http://7xpdkf.com1.z0.glb.clouddn.com/myocean.mp3" controls &gt;&lt;/audio&gt;</pre>
</div>
<div>
<pre>var mark;
document.addEventListener('visibilitychange',function(){
    if(document.hidden){
        //如果用户在切换页面前，自己点了暂停
        if(audio.paused){
            mark = false;
        }else{
            audio.pause();
            mark = true;
        }    
    }else{
        //当暂停是因为页面切换造成的，则返回当前页面时，继续播放
        if(mark){
            audio.play();
        }    
    }
},false);</pre>
</div>

<iframe style="line-height: 1.5; width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/visibility/v9.html" frameborder="0" width="320" height="240"></iframe>

