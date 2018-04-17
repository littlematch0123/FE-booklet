# HTML音频和视频

&emsp;&emsp;多媒体元素(比如视频和音频)存储于媒体文件中，确定媒体类型的最常用的方法是查看文件扩展名。如.swf、.wmv、.mp3、.mp4

&nbsp;

## 媒体格式

### 音频格式

**.mid/.midi**

&emsp;&emsp;MIDI (Musical Instrument Digital Interface) 是一种针对电子音乐设备（比如合成器和声卡）的格式。MIDI 文件不含有声音，但包含可被电子产品（比如声卡）播放的数字音乐指令。因为 MIDI 格式仅包含指令，所以 MIDI 文件极其小巧。大多数流行的网络浏览器都支持 MIDI

**.rm/.ram**

&emsp;&emsp;RealAudio 格式是由 Real Media 针对因特网开发的。该格式也支持视频。该格式允许低带宽条件下的音频流（在线音乐、网络音乐）。由于是低带宽优先的，质量常会降低

**.wav**

&emsp;&emsp;Wave (waveform) 格式是由 IBM 和微软开发的。所有运行 Windows 的计算机和所有网络浏览器（除了 Google Chrome）都支持它

**.wma**

&emsp;&emsp;WMA 格式 (Windows Media Audio)，质量优于 MP3，兼容大多数播放器，除了 iPod。WMA 文件可作为连续的数据流来传输，这使它对于网络电台或在线音乐很实用

**.mp3/.mpga**

&emsp;&emsp;MP3 文件实际上是 MPEG 文件的声音部分。MPEG 格式最初是由运动图像专家组开发的。MP3 是其中最受欢迎的针对音乐的声音格式

&nbsp;

### 视频格式

**.avi**

&emsp;&emsp;AVI (Audio Video Interleave) 格式是由微软开发的。所有运行Windows的计算机都支持AVI格式

**.wmv**

&emsp;&emsp;Windows Media 格式是由微软开发的。Windows Media 在因特网上很常见，但是如果未安装额外组件，就无法播放 Windows Media 电影

**.mpg/.mpeg**

&emsp;&emsp;MPEG (Moving Pictures Expert Group) 格式是因特网上最流行的格式。它是跨平台的，得到了所有最流行的浏览器的支持

**.mov**

&emsp;&emsp;QuickTime 格式是由苹果公司开发的。QuickTime 是因特网上常见的格式，但是QuickTime 电影不能在没有安装额组件的Windows计算机上播放

**.rm/.ram**

&emsp;&emsp;RealVideo 格式是由 Real Media 针对因特网开发的。该格式允许低带宽条件下（在线视频、网络电视）的视频流。由于是低带宽优先的，质量常会降低

**.swf/.flv**

&emsp;&emsp;Flash (Shockwave) 格式是由 Macromedia 开发的。Shockwave 格式需要额外的组件来播放

**.mp4**

&emsp;&emsp;Mpeg-4 (with H.264 video compression) 是一种针对因特网的新格式。越来越多的视频发布者将其作为 Flash 播放器和 HTML5 的因特网共享格式

&nbsp;

## 元素

### 插件元素

&lt;embed&gt;

&emsp;&emsp;用来定义嵌入内容，比如flash插件

&emsp;&emsp;注意：由于移动端设备对flash等浏览器插件支持比较差，IOS设备完全不支持，因此不建议使用flash。如果需要播放音频视频，可以使用video和audio来调用浏览器原生的播放器

【属性】

<div>
<pre>height    设置嵌入内容的高度
width     设置嵌入内容的宽度
src     设置嵌入内容的URL
type     设置嵌入内容的类型    </pre>
</div>
<div>
<pre>&lt;embed src="helloworld.swf" width="200" height="200" type="application/x-shockwave-flash"/&gt;</pre>
</div>

&nbsp;

&lt;object&gt;

&emsp;&emsp;定义一个嵌入的对象

&emsp;&emsp;&lt;后备内容机制&gt;

&emsp;&emsp;object可以嵌套object或其他元素，如果浏览器不能渲染优先的选择就显示后备的内容

【属性】

<div>
<pre>height    设置嵌入对象的高度
width     设置嵌入对象的宽度
type     设置嵌入对象的类型    
name    设置对象的名称，以便在脚本中使用
data     设置对象的URL
usemap    设置与对象一同使用的客户端图像映射的URL
form     规定对象所属的一个或多个表单(将object作为表单的一部分是为了解决让插件发送数据到服务器的需要)
typemustmatch    检测资源类型和type属性是否相符(data和type同时设置的情况下)</pre>
</div>

&nbsp;

&lt;param&gt;

&emsp;&emsp;用来给内嵌的插件传递参数

【属性】

<div>
<pre>name    定义参数的名称
value    规定参数的值
type    规定参数的MIME类型
valuetype    规定值的MIME类型(data/ref/object)</pre>
</div>
<div>
<pre>&lt;object width="400" height="40" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0"&gt;
&lt;param name="SRC" value="bookmark.swf"&gt;
　　&lt;embed src="bookmark.swf" width="400" height="40"&gt;&lt;/embed&gt;
&lt;/object&gt;</pre>
</div>

&nbsp;

### HTML5元素

&emsp;&emsp;HTML5新增了两个与媒体相关的标签，让开发人员不必依赖任何插件就能在网页中嵌入跨浏览器的音频和视频内容，这两个标签是&lt;audio&gt;和&lt;video&gt;，且不被IE8-浏览器支持

&emsp;&emsp;这两个标签支持的类型为：

&emsp;&emsp;&emsp;视频 [1]video/ogg [2]video/mp4 [3]video/webm

&emsp;&emsp;&emsp;音频 [1]audio/ogg [2]audio/mpeg

&emsp;&emsp;关于&lt;audio&gt;和&lt;video&gt;标签的详细信息[移步至此](http://www.cnblogs.com/xiaohuochai/p/5064854.html)

&nbsp;

### HTML音频

&emsp;&emsp;在HTML中播放音频的方法有很多种

【1】&lt;embed&gt;

<div>
<pre>&lt;embed  height="80" width="300" src="song.mp3" /&gt;</pre>
</div>

【2】&lt;object&gt;

<div>
<pre>&lt;object height="80" width="300" data="song.mp3"&gt;&lt;/object&gt;</pre>
</div>

【3】&lt;audio&gt;

<div>
<pre>&lt;audio controls="controls"&gt;
  &lt;source src="song.mp3" type="audio/mp3" /&gt;
&lt;/audio&gt;</pre>
</div>

【4】&lt;a&gt;

<div>
<pre>&lt;a href="song.mp3"&gt;Play the sound&lt;/a&gt;</pre>
</div>

【5】更好的解决办法

<div>
<pre>&lt;audio controls="controls" height="100" width="100"&gt;
    &lt;source src="song.mp3" type="audio/mp3" /&gt;
    &lt;embed height="100" width="100" src="song.mp3" /&gt;
&lt;/audio&gt;</pre>
</div>

&nbsp;

### HTML视频

&emsp;&emsp;在HTML中播放视频的方法也有好多种

【1】&lt;embed&gt;

<div>
<pre>&lt;embed  height="240" width="320" src="movie.mp4" /&gt;</pre>
</div>

【2】&lt;object&gt;

<div>
<pre>&lt;object height="240" width="320" data="movie.mp4"&gt;&lt;/object&gt;</pre>
</div>

【3】&lt;video&gt;

<div>
<pre>&lt;video controls="controls"&gt;
  &lt;source src="movie.mp4" type="video/mp4" /&gt;
&lt;/video&gt;</pre>
</div>

【4】&lt;a&gt;

<div>
<pre>&lt;a href="movie.mp4"&gt;Play the video&lt;/a&gt;</pre>
</div>

【5】更好的解决办法

<div>
<pre>&lt;video width="320" height="240" controls="controls"&gt;
  &lt;source src="movie.mp4" type="video/mp4" /&gt;
  &lt;object data="movie.mp4" width="320" height="240"&gt;
    &lt;embed src="movie.mp4" width="320" height="240" /&gt;
  &lt;/object&gt;
&lt;/video&gt;</pre>
</div>

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/html/movie/m1.html" frameborder="0" width="320" height="240"></iframe>

