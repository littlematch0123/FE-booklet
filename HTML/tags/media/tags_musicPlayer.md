# 使用余弦定理制作磁盘形状h5音乐播放器

### 功能实现

&emsp;&emsp;1、歌曲播放进度转换成视觉的旋转角度

&emsp;&emsp;2、点击磁盘任意位置歌曲跳转到相应进度

&nbsp;

### 效果展示

<iframe src="https://demo.xiaohuochai.site/html/movie/m8.html" frameborder="0" width="320" height="200"></iframe>

&nbsp;

### 原理说明

【1】旋转原理

![musicRotate](https://pic.xiaohuochai.site/blog/HTML_tags_musicRotate.gif)

【2】余弦定理

![musicCos](https://pic.xiaohuochai.site/blog/HTML_tags_musicCos.jpg)

### 代码实现

**HTML**

<div>
<pre>&lt;div class="outer"&gt;
    &lt;img src="img/huochai.jpg" alt="match" width="122" height="122"&gt;
    &lt;div id="player" class="box"&gt;
        &lt;div class="box-in"&gt;
            &lt;div class="box-in-in"&gt;&lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="box-con"&gt;&lt;/div&gt;
    &lt;/div&gt;    
&lt;/div&gt;
&lt;audio id="audio" src="myocean.mp3"&gt;&lt;/audio&gt;</pre>
</div>

**CSS**

<div>
<pre>body{
    margin: 0;
}
img{
    display: block;
    border: none;
}
.outer{
    position: relative;
    width: 122px;
    height: 122px;
    margin: 30px auto;    
    overflow: hidden;
    border-radius: 50%;
}
.box{
    position: absolute;
    top: 0;
    left: 0; 
    width: 122px;
    height: 122px;
    background: url('img/music.png');
}
.box-in{
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 100%;
    overflow: hidden;
}
.box-in-in{
    position: absolute;
    margin-left: -61px;
    width: 61px;
    height: 100%;
    background: black url('img/music.png');
    transform-origin: right;
    transform:rotate(0deg);    
}
.box-con{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    height: 40px;
    width: 40px;
    font: 14px/40px "iconfont";
    color: black;
    text-align: center;
    cursor:pointer;
    background-color: white;
    border-radius: 50%;
}
@font-face {font-family: 'iconfont';
    src: url('font/iconfont.eot'); /* IE9*/
    src: url('font/iconfont.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('font/iconfont.woff') format('woff'), /* chrome、firefox */
    url('font/iconfont.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
    url('font/iconfont.svg#iconfont') format('svg'); /* iOS 4.1- */
}</pre>
</div>

**JS**

<div>
<pre>/*
功能实现
1、播放、暂停
2、调整定位指示
 */    
var player = document.getElementById('player');
var control = player.getElementsByClassName('box-con')[0];
var rotate =  player.getElementsByClassName('box-in-in')[0];
var hidden =  player.getElementsByClassName('box-in')[0];
//作为歌曲是否加载完毕的标记
var mark = false;
//作为鼠标是否移入控制按钮区域的标记
var enter = false;
//记录按钮的上一个值
var lastBtn = '&amp;#xe61d;';
//当歌曲可以开始不停顿地一直播放时，显示播放按钮
audio.oncanplaythrough = function(){
    mark = true;
    control.innerHTML = '&amp;#xe61d;'
};    
//当歌曲在播放过程中
audio.ontimeupdate = function(){
    //播放按钮记录当前进度百分比
    if(!enter){
        control.innerHTML = Math.floor(audio.currentTime/audio.duration*100) + '%';
    }else{
        control.innerHTML = lastBtn;
    }
    //旋转相应度数
    rotate.style.transform = 'rotate('+ audio.currentTime/audio.duration*360 + 'deg)';
    if((audio.currentTime/audio.duration)&lt;=0.5){
        hidden.style.cssText = 'overflow:hidden;background:transparent';        
    }else{
        hidden.style.cssText = 'overflow:visible;background:black url("img/music.png") 61px 0';
    }    
}
//当鼠标点击光盘时，歌曲进度变化到对应进度，div旋转到对应角度
player.onclick = function(e){
    if(mark){
        var e = e || event;
        var n1 = e.clientX-this.parentNode.offsetLeft; 
        var n2 = e.clientY-this.parentNode.offsetTop;
        var a = 61;
        var b = Math.sqrt(Math.pow(n1-61,2)+Math.pow(n2-61,2));    
        var c = Math.sqrt(Math.pow(n1-61,2)+Math.pow(n2,2));
        var radial = Math.acos((a*a + b*b - c*c)/(2*a*b));
        //记录鼠标点击磁盘时旋转的角度
        var result = 0;
        if(n1 &gt;= 61){
            result = radial*180/Math.PI;
        }else{
            result = 360-radial*180/Math.PI;
        }
        audio.currentTime = audio.duration*result/360;        
    }    
}
//当歌曲播放完毕后
audio.onended = function(){
    //重新加载歌曲
    audio.load();
    //将hidden的样式恢复起始值
    hidden.style.cssText = 'overflow:hidden;background:transparent';
    rotate.style.transform ='rotate(0);';
    //将播放按钮置为'暂停按钮'
    control.innerHTML = '&amp;#xe61d;';
}
//给control添加点击事件
control.onclick = function(e){
    var e = e || event;
    if(e.stopPropagation){
        e.stopPropagation();
    }else{
        e.cancelBubble = true;
    }
    if(mark){
        if(audio.paused){
            audio.play();
            this.innerHTML = '&amp;#xe662;';
        }else{
            audio.pause();
            this.innerHTML = '&amp;#xe61d;';
        }    
        lastBtn = control.innerHTML;    
    }
};    
//当鼠标移入control时，标记enter为true
control.onmouseover = function(){
    if(mark){
        enter = true;
    }
}    
//当鼠标移出control时，标记enter为false
control.onmouseout = function(){
    if(mark){
        enter = false;
    }
}    </pre>
</div>
