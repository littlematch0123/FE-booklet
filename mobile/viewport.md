# 移动web开发之视口viewport

&emsp;&emsp;在CSS标准文档中，视口viewport被称为初始包含块。这个初始包含块是所有CSS百分比宽度推算的根源，它给CSS布局限制了一个最大宽度。在桌面上，视口的宽度和浏览器窗口的宽度一致。而在移动端，视口分为布局视口(layout viewport)、视觉视口(visual viewport)和理想视口(ideal viewport)

&nbsp;

### 布局视口

&emsp;&emsp;移动端设备的问题是，如果使视口的宽度和浏览器窗口宽度一样会导致很丑陋的结果。移动端浏览器通常的宽度是240到640像素，且大多数设计给桌面的网站的宽度至少是800px。因此网站内容在手机上看起来会非常窄

&emsp;&emsp;//下图是新浪网在手机端的显示状态，如果不进行缩放操作的话，文字几乎是无法看清的

![mobile_viewport1](https://pic.xiaohuochai.site/blog/mobile_viewport1.jpg)


&emsp;&emsp;在手机上，视口与移动端浏览器屏幕宽度不再相关联，而是完全独立的。我们称它为布局视口&mdash;&mdash;CSS布局会根据它来计算，并被它约束

![mobile_viewport2](https://pic.xiaohuochai.site/blog/mobile_viewport2.png)


&emsp;&emsp;为了容纳为桌面浏览器设计的网站，移动设备默认的布局视口宽度远大于屏幕的宽度，设置为980px或1024px（也可能是其它值，这个是由设备自己决定的），但带来的后果就是浏览器会出现横向滚动条，因为浏览器可视区域的宽度是比这个默认的viewport的宽度要小的。下图列出了一些设备上浏览器的默认viewport的宽度

![mobile_viewport3](https://pic.xiaohuochai.site/blog/mobile_viewport3.png)


&emsp;&emsp;document.documentElement.clientWidth/Height返回的是布局视口的尺寸

![mobile_viewport4](https://pic.xiaohuochai.site/blog/mobile_viewport4.jpg)


### 视觉视口

&emsp;&emsp;虽然独立布局视口的创造很大程度地帮助了桌面网站到手机上的转移，但我们不能完全无视移动端设备的屏幕尺寸。一些CSS声明与用户见到的东西有关，而与CSS的初始包含块无关。并且，有时候知道用户看到了网站的哪些部分对web开发者会有帮助

&emsp;&emsp;视觉视口是用户正在看到的网站的区域，对于的javascript属性是window.innerWidth/Height

&emsp;&emsp;注意：安卓webkit2和代理浏览器存在兼容问题

![mobile_viewport5](https://pic.xiaohuochai.site/blog/mobile_viewport5.png)


&emsp;&emsp;缩放会影响视觉视口的大小。当缩放程度是100%时，视觉视口与设备屏幕一样宽。放大使视觉视口变得更小，因为屏幕上显示的CSS像素更小了，而缩小会让视觉视口更大，因为屏幕上的CSS像素更多了。因此缩放程度和视觉视口的大小是逆相关的：放得越大，视觉视口越小　

&emsp;&emsp;以iphone5为例，浏览器布局视口的宽度默认是1024px，屏幕宽度只有640个设备像素，DPR为2，所以CSS像素是320px。现在用户从100%放大到200%，CSS像素被放大，直到屏幕上只有160个CSS像素。但是，布局视口仍然保持在1024px，所以页面中的元素并没有改变大小。

&emsp;&emsp;注意：当用户缩放时，只有视觉视口的尺寸会发生改变，布局视口不会改变。移动端的缩放不会导致CSS布局被重新计算。由于在手机上会经常发生缩放，并且手机的处理器工作得很慢，电池消耗地很快，因此不重新进行布局对性能来说有很大的好处

&emsp;&emsp;//以下代码表示3秒后，页面缩放从100%到200%

<div>
<pre>&lt;script&gt;
test.innerHTML = '屏幕宽度:' + screen.width + '&lt;br&gt;视觉视口:' + window.innerWidth;
setTimeout(function(){
    var meta = document.getElementsByTagName('meta')[1];
    meta.setAttribute('content','initial-scale=2');
    test.innerHTML = '屏幕宽度:' + screen.width + '&lt;br&gt;视觉视口:' + window.innerWidth;
},3000);
&lt;/script&gt;</pre>
</div>

![mobile_viewport6](https://pic.xiaohuochai.site/blog/mobile_dpr6.gif)


### 理想视口

&emsp;&emsp;默认情况下，一个手机或平板浏览器的布局宽度是980或1024像素。虽然这能让桌面网站不被压扁，但是这并不理想，尤其对于手机用户，因为在狭窄的屏幕上更适合一个狭窄的网站

&emsp;&emsp;换句话说，布局视口的默认宽度并不是一个理想的宽度。这就是为什么苹果和其他效仿苹果的浏览器厂商，会引进理想视口。它是对设备来说，最理想的布局视口尺寸。显示在理想视口中的网站拥有最理想的浏览和阅读的宽度，用户刚进入页面时也不再需要缩放

<table border="0">
<tbody>
<tr>
<td>

![mobile_viewport12](https://pic.xiaohuochai.site/blog/mobile_viewport12.png)

</td>
<td>

![mobile_viewport13](https://pic.xiaohuochai.site/blog/mobile_viewport13.png)

</td>
</tr>
</tbody>
</table>

&emsp;&emsp;只有当网站是为手机准备的时候才应该使用理想视口。只有主动地往页面里添加meta视口标签时理想视口才会生效。如果没有meta视口标签声明，那么布局视口将会维持它的默认宽度，理想视口只有当显式地使用它的时候才会产生影响

<div>
<pre>//这一行代码告诉浏览器，布局视口的宽度应该与理想视口的宽度一致
&lt;meta name="device" content="width=device-width"&gt;</pre>
</div>

&emsp;&emsp;定义理想视口是浏览器的工作，而不是设备或操作系统的工作。因此，同一设备上的不同浏览器拥有不同的理想视口。例如，三星galaxy pocket上的安卓webkit的理想视口是`320*427px`，而opera mobile12的则是`240*320px`。但是，浏览器的理想视口的大小也取决于它所处的设备。三星galaxy s4上的chrome的理想视口是`360*640px`，但是在nexus7上，则是`601*962px`。原因很明显：Nexus7是一个平板，它拥有更宽的屏幕，因此理想视口也应该更宽

&emsp;&emsp;screen.width/height返回是理想视口的尺寸

&emsp;&emsp;注意：当设备方向改变时，iphone中理想视口screen.width/height的值并不会改变，但安卓设备会改变。而布局视口document.documentElement.clientWidth和视觉视口window.innerWidth的值，苹果和安卓都会改变

![mobile_viewport7](https://pic.xiaohuochai.site/blog/mobile_viewport7.jpg)


### meta视口

&emsp;&emsp;meta视口标签存在的主要目的是让布局视口的尺寸和理想视口的尺寸匹配。它由apple发明，其他手机和平板复制了它的大部分内容。桌面浏览器不支持，也不需要它，因为它们没有理想视口的概念。IE是一个例外：在手机上它支持meta视口标签，但最好使用@-ms-viewport

&emsp;&emsp;meta视口标签应该被放在HTML文档的&lt;head&gt;中，并且按以下格式书写:

<div>
<pre>&lt;meta name="viewport" content="name=value,name=value"&gt;</pre>
</div>

&emsp;&emsp;每一个名/值对都是一个给浏览器发号命令的指令。它们被逗号分隔，共有6个

&emsp;&emsp;1、width:设置布局视口的宽度为特定的值

&emsp;&emsp;2、initial-scale:设置页面的初始缩放程度和布局视口的宽度

&emsp;&emsp;3、minimum-scale:设置了最小缩放程度(用户可缩小的程度)

&emsp;&emsp;4、maximum-scale:设置了最大缩放程度(用户可放大的程度)

&emsp;&emsp;5、user-scalable:是否阻止用户进行缩放

&emsp;&emsp;6、height:设置布局视口的高度(未被实现)

**width**

&emsp;&emsp;【0】不设置宽度

&emsp;&emsp;例如，iPhone4S如果不设置viewport，他就会默认是980px，就像把屏幕分成980份。如果设置一个元素为100px*100px，看起来就是屏幕的100/980

![mobile_viewport8](https://pic.xiaohuochai.site/blog/mobile_viewport8.jpg)


&emsp;&emsp;【1】把布局视口的尺寸设为一个理想的值

<div>
<pre>&lt;meta name="viewport" content="width=device-width"&gt;</pre>
</div>

&emsp;&emsp;假如，iPhone4S如果设置viewport width=device-width，他就会是320px，就像把屏幕分成320份。如果设置一个元素为`100px*100px`，看起来就是屏幕的100/320

![mobile_viewport9](https://pic.xiaohuochai.site/blog/mobile_viewport9.jpg)


&emsp;&emsp;【2】把布局视口的尺寸设为固定宽度

<div>
<pre>&lt;meta name="viewport" content="width=400"&gt;</pre>
</div>

&emsp;&emsp;浏览器支持的最大值是10000个像素，最小值约为理想视口的20%，安卓webkit不允许任何小于布局视口的宽度。如果你指定了一个这样的值，它会自动转换为默认布局视口，通常是980px。IE10不允许任何超出480px的值，超出的话会自动转换为布局视口的默认宽度1024px

**initial-scale**

&emsp;&emsp;initial-scale指令设置了页面的初始缩放程度。1代表100%，2代表200%。缩放程度是根据理想视口来计算的

<div>
<pre>当前缩放值 = 理想视口宽度 &nbsp;/ 视觉视口宽度</pre>
</div>

&emsp;&emsp;注意：安卓自带的webkit浏览器只有在 initial-scale = 1 以及没有设置width属性时才表现正常

&emsp;&emsp;缩放程度与视觉视口的宽度是逆相关的，越高的缩放程度意味着视觉视口越小。所以initial-scale=1时视觉视口尺寸和理想视口尺寸是一样的。initial-scale=2会放大到200%，因此视觉视口的高宽是理想视口的一半

【默认值】

&emsp;&emsp;安卓设备上的initial-scale并没有默认值，而在iphone和ipad上，无论viewport设置的宽度是多少，如果没有指定默认的缩放值，则iphone和ipad会自动计算这个缩放值，以达到当前页面不会出现横向滚动条(或者说viewport的宽度就是屏幕的宽度)的目的　

【1】width=device-width,initial-scale=1

&emsp;&emsp;IE10中当initial-scale为1时，它在横屏模式下宽度保持着320px，但width=device-width时它会从320px变为480px

&emsp;&emsp;所以为了在所有浏览器上解决这个问题，需要使用

<div>
<pre>&lt;meta name="viewport" content="width=device-width,initial-scale=1"&gt;</pre>
</div>

![mobile_viewport10](https://pic.xiaohuochai.site/blog/mobile_viewport10.jpg)


【2】width=400,initial-scale=1

<div>
<pre>&lt;meta name="viewport" content="width=400,initial-scale=1"&gt;</pre>
</div>

&emsp;&emsp;把布局视口的宽度设为400px，然后再把它设为理想视口的宽度。结果浏览器选择了每个方向最大的尺寸。因此早期的iphone手机在竖屏模式下的布局视口宽度是400px(320px和400px中较大的值)，在横屏模式下是480px(480px和400px较大的值)

![mobile_viewport11](https://pic.xiaohuochai.site/blog/mobile_viewport11.gif)


&emsp;&emsp;因此，可以给布局视口设置一个最小宽度，并在设备和方向上有需求时允许浏览器将布局视口设得更宽

**minimum-scale和maximum-scale**

&emsp;&emsp;没有这些指令的时候，浏览器允许用户的缩放级别达到5(20%-500%);有这些指令的时候，范围可扩大到10(10%到1000%)。更高的缩放程度不被支持，因此设置maximum-scale=20和设置maximum-scale=10的效果是一样的。安卓webkit不支持minimum-scale。同样，它的缩放范围是4(25%-400%)，并且不支持改变这个范围

**user-scalable**

&emsp;&emsp;user-scalable=no表示禁止缩放

【改变meta视口标签】

&emsp;&emsp;在大多数浏览器中，可以改变meta视口标签，假设meta视口是文档中的第一个meta标签

<div>
<pre>var meta = document.getElementsByTagName('meta')[0];
meta.setAttribute('content','width=400');</pre>
</div>

&emsp;&emsp;我们无法通过移除meta标签来使布局视口变回它默认的宽度。但可以把它设为一个固定的值。例如，如果想提供"切换到桌面布局"的功能，可以把宽度设为980px或1024px

【常用meta视口标签】

<div>
<pre>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"&gt;</pre>
</div>

&emsp;&emsp;该meta标签的作用是让当前viewport的宽度等于设备的宽度，同时不允许用户手动缩放

&nbsp;

### 总结

&emsp;&emsp;在桌面浏览器中，浏览器窗口就是约束CSS布局的视口。而在手机端，布局视口会限制CSS布局；视觉视口表示浏览器的可视区域，决定用户看到什么；理想视口是对于特定设备的特定浏览器的布局视口的一个理想尺寸