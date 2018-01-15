# 移动web开发之屏幕三要素

　　实际上，并没有人提过屏幕三要素这个词，仅是我关于移动web开发屏幕相关部分总结归纳的术语。屏幕三要素包括屏幕尺寸、屏幕分辨率和屏幕像素密度。

&nbsp;

### 屏幕尺寸

　　我们常常听说5.5英寸大屏幕手机，实际上屏幕尺寸是指屏幕的对角线长度。常见的屏幕尺寸有3.5、4、4.3、4.8、5.0、5.2、5.5、6.0等

　　对于英寸没有什么概念，可以通过转换公式转换成常用的厘米

<div class="cnblogs_code">
<pre>1英寸 = 2.54厘米</pre>
</div>
<div class="cnblogs_code">
<pre>3.5in = 3.5*2.54cm = 8.89cm
4.0in = 4.0*2.54cm = 10.16cm
4.3in = 4.3*2.54cm = 10.922cm
4.8in = 4.8*2.54cm = 12.192cm
5.0in = 5.0*2.54cm = 12.7cm
5.2in = 5.2*2.54cm = 13.208cm
5.5in = 5.5*2.54cm = 13.97cm
6.0in = 6.0*2.54cm = 15.24cm</pre>
</div>

![mobile_screen1](https://pic.xiaohuochai.site/blog/mobile_screen1.jpg)

&nbsp;

### 屏幕分辨率

　　屏幕分辨率是指屏幕的像素点数，一般以`纵向像素*横向像素`来表示分辨率。显示常用分辨率有如`800*600`、`1024*768`、`1280*720`、`1600*900`、`1920*1080`，单位是px

　　[注意][关于像素的相关知识移步至此](http://www.cnblogs.com/xiaohuochai/p/5494624.html)

　　若存在retina视网膜屏幕，要注意的是屏幕分辨率指的是设备像素，而不是理想视口

【HD和4K】

　　现在移动设备、智能电视宣传最多的两个关键词估计就是HD、4K，这二者都是用来描述显示设备分辨率的标准，到底二者之间有什么区别？

　　HD: 没有固定的标准，基本上只要宽度为720px的都算是HD

　　full HD(全高清): `1920*1080`分辨率

　　4K: 4k也叫QHD或UHD(超高清)，最小分辨率是`3840*2160`，主要是现在高端电视的分辨率；其还有一个更高的`4096*2160`的标准，主要用于电影放映机或者专业相机。

![mobile_screen2](https://pic.xiaohuochai.site/blog/mobile_screen2.png)

【关于相机像素】

　　我们常常听过相机支持1000万像素。相机所说的像素，其实是最大像素的意思，像素是分辨率的单位，这个像素值仅仅是相机所支持的有效最大分辨率。

<div class="cnblogs_code">
<pre>640*480 = 307200 = 30万像素
1600*1200 = 1920000 = 200万像素
3264*2488 = 8120832 = 800万像素
4536*3024 = 13716864 = 1400万像素</pre>
</div>

&nbsp;

### DPI和PPI

 　　DPI（Dots Per Inch）是印刷行业中用来度量空间点密度用的，这个值是打印机每英寸可以喷的墨汁点数。计算机显示设备从打印机中借鉴了DPI的概念，由于计算机显示设备中的原子单位不是墨汁点而是像素，所以就创造了PPI（Pixels Per Inch），这个值是屏幕每英寸的像素数量，即像素密度（Screen density）。由于各种原因，目前PPI(主要是iOS)和DPI(比如在Android中)都会用在计算机显示设备的参数描述中，不过二者的意思是一样的，都是代表屏幕像素密度。

　　屏幕像素密度(DPI或PPI) =&nbsp;对角线分辨率 / 屏幕尺寸

![mobile_screen3](https://pic.xiaohuochai.site/blog/mobile_screen3.jpg)

　　勾股定理算出对角线的分辨率：&radic;(1920&sup2;+1080&sup2;)&asymp;2203

　　对角线分辨率除以屏幕尺寸：2203/5&asymp;440dpi

<div class="cnblogs_code">
<pre>DPI = 对角线分辨率 / 屏幕尺寸</pre>
</div>

　　以iphone3s和iphone4为例，二者屏幕尺寸一样，屏幕分辨率相差一倍，屏幕像素密度也相差一倍

![mobile_screen4](https://pic.xiaohuochai.site/blog/mobile_screen4.jpg)

　　Google官方指定按照下列标准区分不同设备的dpi

![mobile_screen5](https://pic.xiaohuochai.site/blog/mobile_screen5.jpg)

　　苹果的区分则更为简单：非高清屏、高清屏、超高清屏

![mobile_screen6](https://pic.xiaohuochai.site/blog/mobile_screen6.jpg)

![mobile_screen7](https://pic.xiaohuochai.site/blog/mobile_screen7.jpg)

<div class="cnblogs_code">
<pre>//1242*0.87=1080 2208*0.87=1920 3*0.87=2.61</pre>
</div>

　　从数值上看，苹果和安卓有这样的对应关系

![mobile_screen8](https://pic.xiaohuochai.site/blog/mobile_screen8.jpg)

