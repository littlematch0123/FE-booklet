# 移动端常见问题处理

&emsp;&emsp;本文将详细介绍移动web开发中的常见问题

 

&nbsp;

### Input

【光标颜色】

&emsp;&emsp;默认情况下，光标颜色与字体颜色color相同，但也可以通过caret-color属性来单独设置

```
caret-color: auto;
caret-color: transparent;
caret-color: currentColor;
caret-color: red;
caret-color: #5729e9;
caret-color: rgb(0, 200, 0);
caret-color: hsla(228, 4%, 24%, 0.8);
```
&emsp;&emsp;但是，IOS的光标不支持caret-color，与字体颜色无关，默认为紫蓝色。所以，尽量不要设置蓝色或紫色背景，否则光标看不清楚

【光标高度】

&emsp;&emsp;input域的光标高度与行高line-height相同，所以不要设置太高的行高，可以通过设置上下padding来撑开高度

【放大】

&emsp;&emsp;IOS下，input获取焦点时会放大，meta设置user-scalable=no，可取消放大效果
```
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, shrink-to-fit=no">
```
【自动大写】

&emsp;&emsp;一般地，IOS下默认开启键盘的首字母自动大写功能，这样输入英文的时候，首字母便会自动大写

![大写](https://pic.xiaohuochai.site/blog/cap1.png)


&emsp;&emsp;但是，有些时候并不希望一直是首字母大写的。比如用户名这个字段，如果字段本身就是区分大小写的，首字母自动大写往往会给用户带来麻烦。可以通过在表单元素上可以通过设置autocapitalize="off"来关闭
```
<input type="text" autocapitalize="off">
```
【圆角】

&emsp;&emsp;IOS下，input域只显示底边框时，会出现两个底部底边圆角效果，设置border-radius:0即可
```
border-radius:0
```
【自动保存】

&emsp;&emsp;input域默认会开启自动保存功能，可以使用autocomplete="off"属性将其关闭
```
<input autocomplete="off" />
```
&emsp;&emsp;要特别注意的是，如果使用react框架，需要将autocomplete替换为autoComplete这种小驼峰形式

【轮廓outline】

&emsp;&emsp;android浏览器下，input域处于焦点状态时，默认会有一圈淡黄色的轮廓outline效果

&emsp;&emsp;通过设置outline:none可将其去除
```
outline: none
```
【虚拟键盘】

&emsp;&emsp;IOS弹出虚拟键盘不影响可视区域大小，而android手机弹出虚拟键盘时会影响。所以，最好将包含input域的页面高度设为固定

&emsp;&emsp;在页面初始化时，获取页面高度

```
// app.js
  componentDidMount() {
    const { setWrapSize } = this.props
    const { clientHeight, clientWidth } = document.documentElement
    setWrapSize({ clientHeight, clientWidth })
    window.addEventListener('orientationchange', this.setSize)
  }
```
&emsp;&emsp;然后通过行间样式，将此高度设置到包含input域的页面上
```
// BaseFullScreen
<Wrap className={className} style={{ height: `${wrapHeight}px` }} {...rest}>{children}</Wrap>
```

&nbsp;

### 样式

【点击背景】

&emsp;&emsp;在移动端，点击可点击元素时，android下会出现淡蓝色背景，IOS下会出现灰色背景

![bg](https://pic.xiaohuochai.site/blog/bg.gif)

&emsp;&emsp;可以通过-webkt-tap-hightlight-color属性的设置，取消点击时出现的背景效果
```
* {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
```
【appearance】

&emsp;&emsp;使用appearance:none主要用来去除表单类元素的中浏览器内置样式，如去除data类型input域的叉叉，去除number类型input域的上下箭头等
```
-webkit-appearance: none;
```
【禁止选中】

&emsp;&emsp;有时不希望用户在网站上选择文本，或许是出于版权的原因，如电子书网站。通常使用js来实现

&emsp;&emsp;另一个方案就是，将-webkit-user-select设为none
```
-webkit-user-select：none;
```
【禁止文字缩放】

&emsp;&emsp;部分手机上，切换横竖屏时，会缩放字体。使用如下设置，可以禁止文字缩放
```
* {
  -webkit-text-size-adjust:100%;
}
```
【文本渲染】

&emsp;&emsp;使用text-rendering:optimizeLegibility属性，可以让浏览器在绘制文本时将着重考虑易读性，而不是渲染速度和几何精度.它会使字间距和连字有效
```
text-rendering: optimizeLegibility;
```
&emsp;&emsp;该属性在移动设备上会造成比较明显的性能问题

【文本平滑显示】

&emsp;&emsp;-webkit-font-smoothing属性可以用来控制字体的像素显示是否平滑
```
none 关闭抗锯齿，字体边缘犀利。
antialiased 字体像素级平滑，在深色背景上会让文字看起来更细了
subpixel-antialiased 字体亚像素级平滑，主要为了在非视网膜设备下更好的显示
```
```
body { -webkit-font-smoothing: antialiased; }
```
【轮廓outline】

&emsp;&emsp;input、textarea等表单类标签，在获取焦点的情况下，在andriod系统下，会出现淡黄色轮廓outline，使用outline:none将其去除
```
outline: none
```
【placeholder】

&emsp;&emsp;placeholder默认是浅灰色，如果input域是浅灰色背景，则这时placeholder的文本与背景颜色相近，无法清晰显示，就需要设置placeholder的颜色

&emsp;&emsp;可以通过伪元素来进行设置
```
::placeholder {
    color: #fff;
  }
```
【清除按钮圆角】
```
input,button{
  -webkit-appearance:none;
  border-radius:0;
}
```
【滚动回弹】

&emsp;&emsp;-webkit-overflow-scrolling 属性控制元素在移动设备上是否使用滚动回弹效果
```
auto 使用普通滚动, 当手指从触摸屏上移开，滚动会立即停止
touch 使用具有回弹效果的滚动, 当手指从触摸屏上移开，内容会继续保持一段时间的滚动效果。继续滚动的速度和持续的时间和滚动手势的强烈程度成正比。同时也会创建一个新的堆栈上下文
```
```
body {
  -webkit-overflow-scrolling: touch;
}
```
&emsp;&emsp;一定要设置该属性，否则在IOS下会出现局部滚动不流畅的bug

【1倍行高】

&emsp;&emsp;设置line-height:1，即行高为1时，有的页面会出现文字显示不全的情况，所以行高设置一定要大于1

 

&nbsp;

### 1像素边框

&emsp;&emsp;由于retina屏的原因，1px 的 border 会显示成两个物理像素，所以看起来会感觉很粗，这是一个移动端开发常见的问题

&emsp;&emsp;解决方案有很多，但都有自己的优缺点

&emsp;&emsp;1、0.5px 边框

&emsp;&emsp;从iOS 8开始，iOS 浏览器支持 0.5px 的 border，但是在 Android 上是不支持的，0.5px 会被认为是 0px，所以这种方法，兼容性很差

&emsp;&emsp;2、背景渐变

&emsp;&emsp;CSS3 有了渐变背景，可以通过渐变背景实现 1px 的 border，实现原理是设置 1px 的渐变背景，50% 有颜色，50% 是透明的

```
@mixin commonStyle() {
  background-size: 100% 1px,1px 100% ,100% 1px, 1px 100%;
  background-repeat: no-repeat;
  background-position: top, right top,  bottom, left top;
}
@mixin border($border-color) {
  @include commonStyle();
  background-image:linear-gradient(180deg, $border-color, $border-color 50%, transparent 50%),
  linear-gradient(270deg, $border-color, $border-color 50%, transparent 50%),
  linear-gradient(0deg, $border-color, $border-color 50%, transparent 50%),
  linear-gradient(90deg, $border-color, $border-color 50%, transparent 50%);
}
```
&emsp;&emsp;3、伪类 + transform

&emsp;&emsp;这类方法的实现原理是用伪元素高度设置为1px，然后用 transform缩小到原来的一半

```
div {
  position: relative;
  &::after {
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    transform: scaleY(.5);
    content: '';
  }
`
```
 

&nbsp;

### 布局

【vh】

&emsp;&emsp;页面使用vh来控制元素高度的时候，在安卓端浏览器虚拟键盘弹出时，导致视口高度改变，以至于vh的取值改变
```
// 正常模式下
100vh = document.documentElement.clientHeight;

// 安卓端弹出虚拟键盘情况下
100vh = document.documentElement.clientHeight - 虚拟键盘的高度;
```
&emsp;&emsp;这种情况导致了在虚拟键盘弹出时，页面中使用vh定高的元素的大小被压缩，造成布局错位以及文字溢出

&emsp;&emsp;所以，最好将包含input域的页面高度设为固定

【100%与100vh】

&emsp;&emsp;100vh指的是视口，即屏幕高度的100%，不仅包括浏览器可视高度，还包括浏览器地址栏高度。而100%高度，是页面高度的100%

&emsp;&emsp;所以，在全屏情况下，100vh等于100%高度，否则，100vh大于100%高度

【高度无效】

&emsp;&emsp;在IOS下，设置height:100%，如果父级的flex值为1，而没有设置具体高度，则100%高度设置无效

&emsp;&emsp;处理方法是，在父级通过计算来设置具体高度height，如height: calc(100% - 100px)

 

&nbsp;

### 事件

【鼠标事件】

&emsp;&emsp;由于移动设备没有鼠标，所以与电脑端有一些不同之处

&emsp;&emsp;1、不支持dblclick双击事件。在移动设备中双击浏览器窗口会放大画面

&emsp;&emsp;2、单击元素会触发mousemove事件

&emsp;&emsp;3、两个手指放在屏幕上且页面随手指移动而滚动时会触发mousewheel和scroll事件

【touch事件】

&emsp;&emsp;新版的chrome下，不支持直接给document和body设置touch事件，所以下列代码无效
```
document.addEventListener('touchstart', function(e) {
  e.preventDefault();
})
``` 

&nbsp;

### 图片

【SVG】

&emsp;&emsp;SVG图片由于其矢量的性质，缩放不失真，则代码量较少，大量地应用在小图标上。但在使用的过程中，有一些要注意的地方

&emsp;&emsp;1、在伪类中添加SVG，在IOS下svg不显示

&emsp;&emsp;2、在页面中添加SVG，在android的微信中下会出现设置透明度opacity的元素有的不显示的情况，所以尽量不设置透明度

&emsp;&emsp;3、在mask属性中设置SVG，可以通过background-color给SVG变换颜色

【base64】

&emsp;&emsp;要特别注意的是，图片变化base64格式之后，再添加查询字符串，会报错

【缓存】

&emsp;&emsp;移动端更改同名图片无法清除缓存。所以，还是要在图片命名上做文章

 

&nbsp;

### meta

【shrink-to-fit=no】

&emsp;&emsp;IOS9+系统下，使用Viewport元标记"width=device-width"会导致页面缩小以适应溢出视口边界的内容。可以通过添加"shrink-to-fit=no"到meta标签来覆盖此行为，增加的值将阻止页面缩放以适应视口
```
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no，shrink-to-fit=no">
```
【页面缩放】

&emsp;&emsp;在meta标签中设置了禁止缩放user-scalable=no，可以实现在IOS下input域焦点状态时放大被禁止的效果。但是，仍然无法阻止页面整体的缩放

 【识别规则】

&emsp;&emsp;1、打电话
```
<a href="tel:0755-10086">打电话给:0755-10086</a>
```
&emsp;&emsp;2、发短信，winphone系统无效
```
<a href="sms:10086">发短信给: 10086</a>
```
&emsp;&emsp;3、跳转到地图
```
<a href="iosamap://viewMap?sourceApplication=yukapril&poiname=国宏宾馆&lat=39.905592&lon=116.33604&dev=0">高德地图</a>
<a href="androidamap://viewMap?sourceApplication=yukapril&poiname=国宏宾馆&lat=39.905592&lon=116.33604&dev=0">高德</a>
```
&emsp;&emsp;4、写邮件
```
<a href="mailto:peun@foxmail.com">peun@foxmail.com</a>
```
&emsp;&emsp;5、禁止识别
```
<meta name="format-detection" content="telephone=no,email=no,address=no"/>
```
【爬虫】

&emsp;&emsp; robots(网页搜索引擎索引方式)：对应一组使用逗号(,)分割的值，通常取值：
```
none：搜索引擎将忽略此网页，等同于noindex，nofollow；
noindex：搜索引擎不索引此网页；nofollow：搜索引擎不继续通过此网页的链接索引搜索其它的网页；
all：搜索引擎将索引此网页与继续通过此网页的链接索引，等同于index，follow；
index：搜索引擎索引此网页；follow：搜索引擎继续通过此网页的链接索引搜索其它的网页；
```
&emsp;&emsp;使用下列代码，则网页会被搜索引擎忽略
```
<meta name="robots" content="none"/>
```
【添加到主屏幕】

&emsp;&emsp;在IOS下，在head元素底部，使用下列代码可以实现添加到主屏幕的功能
```
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="apple-mobile-web-app-title" content="Weather PWA">
  <link rel="apple-touch-icon" href="images/icons/icon-152x152.png">
```
【QQ浏览器】

```
// 全屏模式
<meta name="x5-fullscreen" content="true">
// 强制竖屏
<meta name="x5-orientation" content="portrait">
// 强制横屏
<meta name="x5-orientation" content="landscape">
// 应用模式
<meta name="x5-page-mode" content="app">
```
【UC浏览器】

```
// 全屏模式
<meta name="full-screen" content="yes">
// 强制竖屏
<meta name="screen-orientation" content="portrait">
// 强制横屏
<meta name="screen-orientation" content="landscape">
// 应用模式
<meta name="browsermode" content="application">
```