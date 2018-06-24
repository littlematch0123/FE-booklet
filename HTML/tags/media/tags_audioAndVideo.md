# audio和video

&emsp;&emsp;HTML5新增了两个与媒体相关的标签，让开发人员不必依赖任何插件就能在网页中嵌入跨浏览器的音频和视频内容，这两个标签是&lt;audio&gt;和&lt;video&gt;，且不被IE8-浏览器支持

&emsp;&emsp;以视频文件举例，它包含了音频轨道、视频轨道和其他一些元数据(封面、标题、子标题、字幕等)

![audioAndVideo](https://pic.xiaohuochai.site/blog/HTML_tags_audioAndVideo.jpg)

## HTML元素

&emsp;&emsp;使用这两个元素至少要在标签中包含src属性。位于开始和结束标签之间的任何内容都将作为后备内容，在浏览器不支持这两个媒体元素的情况下显示

### &lt;audio&gt;

<div>
<pre>autoplay         自动播放
controls         显示控件
loop             循环播放
preload          音频在页面加载时进行加载，并预备播放(若使用autoplay,则忽略该属性)
src              要播放的音频的URL        </pre>
</div>
<div>
<pre>&lt;audio controls autoplay loop muted src="song.mp3"&gt; 
  &lt;source src="song.mp3" type="audio/mp3" /&gt;
&lt;/audio&gt;    </pre>
</div>

&emsp;&emsp;注意：&lt;audio&gt;元素不支持播放wma格式的文件

&emsp;&emsp;&lt;演示框&gt;点击下列相应属性值可进行演示

<iframe style="width: 100%; height: 150px;" src="https://demo.xiaohuochai.site/html/movie/m2.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### &lt;video&gt;

<div>
<pre>autoplay            自动播放
controls            显示控件
height         　　　播放器高度
width         　　　 播放器宽度
loop                循环播放
preload             视频在页面加载时进行加载，并预备播放(若使用autoplay,则忽略该属性)
preload="none"     //当页面加载后不载入视频
preload="auto"     //当页面加载后载入整个视频
preload="meta"     //当页面加载后只载入元数据
src                 要播放的视频的URL
poster        　　　 规定视频下载时显示的图像，或者在用户点击播放按钮前显示的图像    </pre>
</div>
<div>
<pre>&lt;video id="test" src="movie.mp4" width="280" height="200" poster="diejia.jpg"&gt;&lt;/video&gt;</pre>
</div>

&emsp;&emsp;&lt;演示框&gt;点击下列相应属性值可进行演示

<iframe style="width: 100%; height: 320px;" src="https://demo.xiaohuochai.site/html/movie/m33.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### &lt;source&gt;

&emsp;&emsp;为&lt;video&gt;和&lt;audio&gt;提供媒介资源

<div>
<pre>media     规定媒体资源的类型(没有浏览器支持)
src     　规定媒体文件的URL
type      规定媒体资源的MIME类型</pre>
</div>

&emsp;&emsp;常用类型

&emsp;&emsp;&emsp;视频 [1]video/ogg [2]video/mp4 [3]video/webm

&emsp;&emsp;&emsp;音频 [1]audio/ogg [2]audio/mpeg

&emsp;&emsp;使用&lt;audio&gt;和&lt;video&gt;至少要在标签中包含src属性。位于开始和结束标签之间的任何内容都将作为后备内容，在浏览器不支持这两个媒体元素的情况下显示

<div>
<pre>&lt;video src="#"&gt;
    video player not available.
&lt;/video&gt;</pre>
</div>
<div>
<pre>&lt;audio src="#"&gt;
    audio player not available.
&lt;/audio&gt;</pre>
</div>

&emsp;&emsp;因为并非所有浏览器都支持所有媒体格式，所以可以指定多个不同的媒体来源。为此，不用在标签中指定src属性，而是使用一个或多个&lt;source&gt;元素

<div>
<pre>&lt;video&gt;
    &lt;source src="video.webm" type="video/webm; codecs='vp8,vorbis'"&gt;
    &lt;source src="video.ogg" type="video/ogg; codecs='theora,vorbis'"&gt;
    &lt;source src="video.mp4"&gt;
    video player not available.
&lt;/video&gt;</pre>
</div>
<div>
<pre>&lt;audio&gt;
    &lt;source src="audio.ogg" type="audio/ogg"&gt;
    &lt;source src="audio.mp3" type="audio/mp3"&gt;
    audio player not available.
&lt;/audio&gt;</pre>
</div>

&emsp;&emsp;因为并非所有浏览器都支持&lt;audio&gt;和&lt;video&gt;标签，所以更好的解决办法是有备选内容

<div>
<pre>&lt;audio controls="controls" height="100" width="100"&gt;
    &lt;source src="song.mp3" type="audio/mp3" /&gt;
    &lt;embed height="100" width="100" src="song.mp3" /&gt;
&lt;/audio&gt;</pre>
</div>
<div>
<pre>&lt;video width="320" height="240" controls="controls"&gt;
  &lt;source src="movie.mp4" type="video/mp4" /&gt;
  &lt;object data="movie.mp4" width="320" height="240"&gt;
    &lt;embed src="movie.mp4" width="320" height="240" /&gt;
  &lt;/object&gt;
&lt;/video&gt;</pre>
</div>

&nbsp;

### &lt;track&gt;

&emsp;&emsp;&lt;track&gt;元素被当作媒体元素&mdash;&lt;audio&gt;和&lt;video&gt;的子元素来使用。它允许指定计时字幕（或者基于事件的数据），例如自动处理字幕

&emsp;&emsp;track&nbsp;给媒体元素添加的数据的类型在kind属性中设置，属性值可以是&nbsp;subtitles,&nbsp;captions,&nbsp;descriptions,&nbsp;chapters&nbsp;或&nbsp;metadata。该元素指向当用户请求额外的数据时浏览器公开的包含定时文本的源文件。一个media元素的任意两个track子元素不能有相同的&nbsp;kind、srclang和&nbsp;label属性

【default】

&emsp;&emsp;default属性规定该轨道是默认的，假如没有选择任何轨道

【kind】

&emsp;&emsp;kind属性表示轨道属于什么文本类型

<div>
<pre>captions 　　　　该轨道定义将在播放器中显示的简短说明
chapters    　　该轨道定义章节，用于导航媒介资源
descriptions   该轨道定义描述，用于通过音频描述媒介的内容，假如内容不可播放或不可见
metadata    　　该轨道定义脚本使用的内容
subtitles    　该轨道定义字幕，用于在视频中显示字幕</pre>
</div>

【label】

&emsp;&emsp;label属性表示轨道的标签或标题

【url】

&emsp;&emsp;URL属性表示字幕文件的URL

【srclang】

&emsp;&emsp;srclang属性表示轨道的语言，若 kind 属性值是 "subtitles"，则该属性必需的。中文为"zh"，英文为"en"

&emsp;&emsp;字幕文件书写格式如下所示，注意，毫秒位的3个0不能省略

<div>
<pre>WEBVTT

1
00:00:01.000 --&gt; 00:00:08.000
欢迎来到小火柴的个人网站</pre>
</div>
<div>
<pre>&lt;video width="320" height="240" controls="controls"&gt;
  &lt;source src="mov.mp4" type="video/mp4" /&gt;
  &lt;track src="cn_track.vtt" srclang="zh" default kind="captions" label="欢迎你"&gt;
  &lt;object data="mov.mp4" width="320" height="240"&gt;
    &lt;embed src="mov.mp4" width="320" height="240" /&gt;
  &lt;/object&gt;
&lt;/video&gt;</pre>
</div>

![track](https://pic.xiaohuochai.site/blog/HTML_tags_track.gif)

## API

&emsp;&emsp;HTML5 DOM为&lt;audio&gt;和&lt;video&gt;元素提供了方法、属性和事件

### 方法

1、canPlayType()

&emsp;&emsp;检测浏览器是否能播放指定的音频或视频类型，返回值为下列之一：

<div>
<pre>'probable':浏览器最可能支持该类型
'maybe':浏览器也许支持该类型
'':浏览器不支持该类型</pre>
</div>
<div>
<pre>//常用值
video/ogg
video/mp4
video/webm
audio/mpeg
audio/ogg
audio/mp4
video/ogg;codecs="theora,vorbis"
video/mp4;codecs="avc1.4D401E,mp4a.40.2"
video/webm;codecs="vp8.0,vorbis"
audio/ogg;codecs="vorbis"
audio/mp4;codecs="mp4a.40.5"</pre>
</div>
<div>
<pre>&lt;audio id="audio" src="song.mp3"&gt;&lt;/audio&gt;    
&lt;script&gt;
var audio = document.getElementById('audio');
//probably
console.log(audio.canPlayType('video/ogg;codecs="theora,vorbis"'));
&lt;/script&gt;</pre>
</div>

2、load()

&emsp;&emsp;重新加载音频或视频元素，用于在更改src来源或其他设置后对音频或视频元素进行更新

<div>
<pre>&lt;audio id="audio" src="song.mp3" autoplay controls&gt;&lt;/audio&gt;    
&lt;script&gt;
    var audio = document.getElementById('audio');
    audio.src = 'myocean.mp3';
    audio.load();
&lt;/script&gt;</pre>
</div>

3、play()

&emsp;&emsp;开始播放音频或视频

4、pause()

&emsp;&emsp;暂停当前播放的音频或视频

<div>
<pre>&lt;button onclick = 'audio.play();'&gt;播放&lt;/button&gt;
&lt;button onclick = 'audio.pause();'&gt;暂停&lt;/button&gt;
&lt;audio id="audio" src="myocean.mp3" controls&gt;&lt;/audio&gt;    </pre>
</div>

&emsp;&emsp;&lt;演示框&gt;点击下列相应属性值可进行演示

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/html/movie/m4.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 属性

&emsp;&emsp;注意：所有属性中，只有videoWidth和videoHeight是立即可用的，在音视频的元数据加载后，其他属性才可用

【只读】

1、buffered

<div>
<pre>buffered.length//获取已缓冲范围的数量
buffered.start(index)//获取某个已缓冲范围的开始位置
buffered.end(index)//获取某个已缓冲范围的结束位置
buffered.end(0)//获取当前已缓冲的秒数</pre>
</div>
<div>
<pre>&lt;button&gt;获取缓冲时间&lt;/button&gt;
&lt;audio id="audio" src="https://demo.xiaohuochai.site/myocean.mp3" controls&gt;&lt;/audio&gt;
&lt;script&gt;
var oBtn = document.getElementsByTagName('button')[0];
oBtn.onclick = function(){
    alert(audio.buffered.end(0));
}
&lt;/script&gt;    </pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/html/movie/m5.html" frameborder="0" width="320" height="240"></iframe>

2、currentSrc

&emsp;&emsp;返回当前音频或视频的URL

<div>
<pre>&lt;audio id="audio" src="https://demo.xiaohuochai.site/myocean.mp3" controls&gt;&lt;/audio&gt;
&lt;script&gt;
var audio = document.getElementById('audio');
//https://demo.xiaohuochai.site/myocean.mp3
setInterval(function(){
    console.log(audio.currentSrc);    
},1000); 
&lt;/script&gt;    </pre>
</div>

3、ended

&emsp;&emsp;返回音频或视频是否已结束

<div>
<pre>&lt;audio id="audio" src="https://demo.xiaohuochai.site/myocean.mp3" controls&gt;&lt;/audio&gt;
&lt;script&gt;
document.onclick = function(){
    console.log(audio.ended);
}    
&lt;/script&gt;</pre>
</div>

4、duration

&emsp;&emsp;返回当前音频或视频的长度(以秒计)，如果未设置则返回NaN

<div>
<pre>&lt;audio id="audio" src="https://demo.xiaohuochai.site/myocean.mp3" controls&gt;&lt;/audio&gt;
&lt;script&gt;
//NaN
<span>console.log(audio.duration);
//317.022041
<span>setTimeout(function(){
    console.log(audio.duration);
},1000);</pre>
</div>

5、networkState

&emsp;&emsp;返回音频或视频当前网络状态

<div>
<pre>networkState:0(尚未初始化)
networkState:1(已选取资源，但并未使用网络)
networkState:2(正在下载数据)
networkState:3(未找到资源来源)</pre>
</div>
<div>
<pre>&lt;audio id="audio" src="https://demo.xiaohuochai.site/myocean.mp3" controls&gt;&lt;/audio&gt;
&lt;script&gt;
//3
console.log(audio.networkState)
//1
document.onclick = function(){
    console.log(audio.networkState);
}
&lt;/script&gt;    </pre>
</div>

6、paused

&emsp;&emsp;返回音频或视频是否已暂停

<div>
<pre>paused:true;(已暂停)
paused:false;(未暂停)    </pre>
</div>
<div>
<pre>&lt;audio id="audio" src="https://demo.xiaohuochai.site/myocean.mp3" controls&gt;&lt;/audio&gt;
&lt;script&gt;
console.log(audio.paused)
document.onclick = function(){
    console.log(audio.paused);
}
&lt;/script&gt;    </pre>
</div>

7、played

&emsp;&emsp;已播范围是指音频或视频的时间范围。如果用户在音频或视频中跳跃，会获得多个播放范围

<div>
<pre>played.length(获得音频或视频已播放范围的数量)
played.start(index)(获得某个已播范围的开始位置)
played.end(index)(获得某个已播范围的结束位置)</pre>
</div>

&emsp;&emsp;注意：首段已播范围的下标是0

<div>
<pre>&lt;audio id="audio" src="https://demo.xiaohuochai.site/myocean.mp3" controls&gt;&lt;/audio&gt;
&lt;script&gt;
document.onclick = function(){
    console.log(audio.played.end(0));
}
&lt;/script&gt;</pre>
</div>

8、readyState

&emsp;&emsp;返回音频或视频的当前就绪状态

<div>
<pre>readyState:0(没有关于音频或视频是否就绪的信息)
readyState:1(关于音频或视频就绪的元数据)
readyState:2(关于当前播放位置的数据是可用的，但没有足够的数据来播放下一帧)
readyState:3(当前及至少下一帧的数据是可用的)
readyState:4(可用数据足以开始播放)</pre>
</div>
<div>
<pre>&lt;audio id="audio" src="https://demo.xiaohuochai.site/myocean.mp3" controls&gt;&lt;/audio&gt;
&lt;script&gt;
//0
console.log(audio.readyState);
//4
document.onclick = function(){
    console.log(audio.readyState);
}
&lt;/script&gt;    </pre>
</div>

9、seekable

&emsp;&emsp;返回可寻址范围，可寻址范围是指用户在视频或音频中可寻址(移动播放位置)的时间范围。对于流视频，通常可以寻址到视频中的任何位置，即使其尚未完成缓冲

<div>
<pre>seekable.length(获得音频或视频中可寻址范围的数量)
seekable.start(index)(获得可寻址范围的开始位置)
seekable.end(index)(获得可寻址范围的结束位置)</pre>
</div>
<div>
<pre>&lt;audio id="audio" src="https://demo.xiaohuochai.site/myocean.mp3" controls&gt;&lt;/audio&gt;
&lt;script&gt;
document.onclick = function(){
    console.log(audio.seekable.end(0));
}
&lt;/script&gt;</pre>
</div>

10、seeking

<div>
<pre>seeking:true(用户正在寻址)
seeking:false(用户没有在寻址)</pre>
</div>
<div>
<pre>&lt;audio id="audio" src="https://demo.xiaohuochai.site/myocean.mp3" controls&gt;&lt;/audio&gt;
&lt;script&gt;
audio.onseeking = function(){
    console.log(audio.seeking);    
}    
&lt;/script&gt;</pre>
</div>

【可读写】

1、autoplay

<div>
<pre>autoplay:false(默认，不自动播放)
autoplay:true(自动播放)</pre>
</div>

2、controls

<div>
<pre>controls:false(默认，不显示控件)
controls:true(显示控件)</pre>
</div>

3、crossOrigin

&emsp;&emsp;设置或返回CORS设置

4、currentTime

&emsp;&emsp;设置或返回音频或视频的当前位置(以秒计)

<div>
<pre>&lt;audio id="audio" src="https://demo.xiaohuochai.site/myocean.mp3" controls&gt;&lt;/audio&gt;
&lt;script&gt;
var audio = document.getElementById('audio');
document.onclick = function(){
    console.log(audio.currentTime);    
    audio.currentTime = 5;
    console.log(audio.currentTime);
}; 
&lt;/script&gt;</pre>
</div>

5、defaultMuted(只有chrome支持)

<div>
<pre>defaultMuted:true(初始静音)
defaultMuted:false(默认，初始不静音)</pre>
</div>
<div>
<pre>audio.defaultMuted = true;</pre>
</div>

6、muted

<div>
<pre>muted:true(静音)
muted:false(不静音)</pre>
</div>
<div>
<pre>&lt;button onclick="audio.muted = !audio.muted"&gt;音量开关&lt;/button&gt;
&lt;audio id="audio" src="https://demo.xiaohuochai.site/myocean.mp3" controls&gt;&lt;/audio&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/html/movie/m6.html" frameborder="0" width="320" height="240"></iframe>

7、defaultPlaybackRate

<div>
<pre>defaultPlaybackRate:1(正常速度)
defaultPlaybackRate:0.5(半速)
defaultPlaybackRate:2(倍速)
defaultPlaybackRate:-1(向后正常速度)
defaultPlaybackRate:-0.5(向后半速)</pre>
</div>
<div>
<pre>var audio = document.getElementById('audio');
setTimeout(function(){
    audio.defaultPlaybackRate = 0.5;
    audio.load();    
},1000);</pre>
</div>

8、playbackRate

<div>
<pre>playbackRate:1(正常速度)
playbackRate:0.5(半速)
playbackRate:2(倍速)
playbackRate:-1(向后正常速度)
playbackRate:-0.5(向后半速)</pre>
</div>
<div>
<pre>&lt;audio id="audio" src="https://demo.xiaohuochai.site/myocean.mp3" controls&gt;&lt;/audio&gt;
&lt;script&gt;
var array = [-1,-0.5,0.5,1,2];
var i = 0;
var audio = document.getElementById('audio');
document.onclick = function(){
    audio.playbackRate = array[i];
    console.log(audio.playbackRate);
    i++;
    i=i%5;
}</pre>
</div>

9、loop

<div>
<pre>loop:true(循环播放)
loop:false(默认，不循环播放)</pre>
</div>

10、preload

&emsp;&emsp;设置或返回是否在页面加载后立即加载音频或视频

<div>
<pre>preload:auto;(一旦页面加载，则开始加载音频或视频)
preload:metadata;(当页面加载后仅加载音频或视频的元数据)
preload:none;(页面加载后不加载音频或视频)</pre>
</div>

&emsp;&emsp;注意：当设置autoplay时，该属性无效

11、src

&emsp;&emsp;设置或返回音频或视频的当前来源

<div>
<pre>&lt;audio id="audio" src="https://demo.xiaohuochai.site/myocean.mp3" controls&gt;&lt;/audio&gt;
&lt;script&gt;
console.log(audio.src);
document.onclick = function(){
    console.log(audio.src);
    audio.src = 'https://demo.xiaohuochai.site/song.mp3';
    audio.load();
    console.log(audio.src);
}    
&lt;/script&gt;</pre>
</div>

12、volume

&emsp;&emsp;设置或返回音频或视频的当前音量

<div>
<pre>volume(取得为0-1，0为静音，1为最大，默认为1)    </pre>
</div>
<div>
<pre>&lt;button onclick = "if(audio.volume&lt;=0.9)audio.volume+=0.1;"&gt;增大音量&lt;/button&gt;
&lt;button onclick = "if(audio.volume&gt;=0.1)audio.volume-=0.1;"&gt;减小音量&lt;/button&gt;
&lt;audio id="audio" src="https://demo.xiaohuochai.site/myocean.mp3" controls&gt;&lt;/audio&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/html/movie/m7.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 事件

&emsp;&emsp;当音频或视频正在加载过程中，会依次发生以下事件：

<div>
<pre>loadstart:提示浏览器开始寻找指定的音频或视频
progress:提示浏览器正在下载指定的音频或视频
durationchange:提示音频或视频的时长已改变
loadedmetadata:提示音频或视频的元数据已加载
loadeddata:提示音频或视频的当前帧已加载，但没有足够数据播放下一帧
canplay:提示浏览器能够开始播放指定的音频或视频
canplaythrough:提示音频或视频能够不停顿地一直播放
progress:提示浏览器正在下载指定的音频或视频</pre>
</div>
<div>
<pre>&lt;audio id="audio" src="https://demo.xiaohuochai.site/myocean.mp3" controls&gt;&lt;/audio&gt;
&lt;script&gt;    
audio.onloadstart = function(){
    console.log('loadstart');
}
audio.ondurationchange = function(){
    console.log('durationchange');
}    
audio.onloadedmetadata = function(){
    console.log('loadedmetadata');
}    
audio.onloadeddata = function(){
    console.log('loadeddata');
}    
audio.onprogress = function(){
    console.log('progress');
}    
audio.oncanplay = function(){
    console.log('canplay');
}    
audio.oncanplaythrough = function(){
    console.log('canplaythrough');
}    
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;影响音频或视频数据加载的事件有以下几个：

<div>
<pre>abort:在音频或视频终止加载时触发
error:在音频或视频加载发生错误时触发
stalled:在浏览器尝试获取媒体数据，但数据不可用时触发
suspend:在音频或视频数据被阻止加载时触发(可以是完成加载后触发，或者因为被暂停)
empted:在发生故障并且文件突然不可用时触发
</pre>
</div>
<div>
<pre>&lt;video id="video" src="https://demo.xiaohuochai.site/movie.mp4" controls&gt;&lt;/video&gt;
&lt;script&gt;
setTimeout(function(){
    video.src='';
},2000);    
video.onabort = function(){
    console.log('abort');
}
video.onerror = function(){
    console.log('error');
}    
video.onstalled = function(){
    console.log('stalled');
}    
video.onsuspend = function(){
    console.log('suspend');
}    
video.onemptied = function(){
    console.log('emptied');
}
&lt;/script&gt;</pre>
</div>


![process](https://pic.xiaohuochai.site/blog/HTML_tags_progress.jpg)


![abort](https://pic.xiaohuochai.site/blog/HTML_tags_abort.jpg)



&emsp;&emsp;音频或视频控制按钮发生改变时触发以下事件:

<div>
<pre>play:音频或视频文件已经就绪可以开始播放时触发
playing:音频或视频已开始播放时触发
ended:音频或视频文件播放完毕后触发
pause:音频或视频文件暂停时触发
ratechange:播放速度改变进触发
seeked:指示定位已结束时触发
seeking:正在进行指示定位时触发
timeupdate:播放位置改变时触发[注意:播放和调整指示定位时都会触发]
volumechange:音量改变时触发
waiting:需要缓冲下一帧而停止时触发</pre>
</div>
<div>
<pre>&lt;audio id="audio" src="/honey.mp3" controls&gt;&lt;/audio&gt;
&lt;script&gt;    
var i = 1;
document.onclick = function(){
    i+=0.1;
    audio.playbackRate = i;
}
audio.onended = function(){
    console.log('ended');
}
audio.onpause = function(){
    console.log('pause');
}    
audio.onplay = function(){
    console.log('play');
}    
audio.onplaying = function(){
    console.log('playing');
}    
audio.onratechange = function(){
    console.log('ratechange');
}    
audio.onseeked = function(){
    console.log('seeked');
}    
audio.onseeking = function(){
    console.log('seeking');
}    
audio.ontimeupdate = function(){
    console.log('timeupdate');
}    
audio.onvolumechange = function(){
    console.log('volumechange');
}    
audio.onwaiting = function(){
    console.log('waiting');
}    
&lt;/script&gt;</pre>
</div>

&nbsp;

### audio专有

&emsp;&emsp;&lt;audio&gt;元素在一个原生的javascript构造函数Audio，可以在任何时候播放音频。Audio和Image很像，但Audio不用像Image那样必须插入到文档中，只要创建一个新实例，并传入音频源文件即可

<div>
<pre>var audio = new Audio('test.mp3');    </pre>
</div>
<div>
<pre>&lt;script&gt;
var audio = new Audio('https://demo.xiaohuochai.site/honey.mp3');
audio.oncanplaythrough = function(){
    audio.controls = true;
    document.body.appendChild(audio);
}
// 为兼容IOS
audio.load()
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;特别注意的是，IOS不能直接使用oncanplaythrough事件，需要添加audio.load()方法，否则该事件不生效
