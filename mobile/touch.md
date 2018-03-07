# 移动web开发之touch事件 

　　iOS版Safari为了向开发人员传达一些特殊信息，新增了一些专有事件。因为iOS设备既没有鼠标也没有键盘，所以在为移动Safari开发交互性网页时，常规的鼠标和键盘事件根本不够用。随着Android 中的WebKit的加入，很多这样的专有事件变成了事实标准，导致W3C开始制定Touch Events规范。本文将详细介绍移动端touch事件

&nbsp;

### 概述

　　包含iOS 2.0软件的iPhone 3G发布时，也包含了一个新版本的Safari浏览器。这款新的移动Safari提供了一些与触摸(touch)操作相关的新事件。后来，Android上的浏览器也实现了相同的事件。触摸事件会在用户手指放在屏幕上面时、在屏幕上滑动时或从屏幕上移开时触发。具体来说，有以下几个触摸事件
```
touchstart:当手指触摸屏幕时触发；即使已经有一个手指放在了屏幕上也会触发
touchmove:当手指在屏幕上滑动时连续地触发。在这个事件发生期间，调用preventDefault()可以阻止滚动
touchend:当手指从屏幕上移开时触发
touchcancel:当系统停止跟踪触摸时触发(不常用)。关于此事件的确切触发时间，文档中没有明确说明
```
【touchenter 和 touchleave】

　　触摸事件规范中曾经包含touchenter和touchleave事件，这两个事件在用户手指移入或移出某个元素时触发。但是这两个事件从来没有被实现。微软有这两个事件的替代事件，但是只有IE浏览器支持。某些情况下可以知道用户手指滑入滑出某个元素是素是非常有用的，所以希望这两个事件可以重返规范

　　在触摸事件中，常用的是touchstart、touchumove和touchend这三个事件，与鼠标事件的对应如下
```
鼠标         触摸          
mousedown   touchstart 
mousemove   touchmove   
mouseup     touchend  
```   
 　　[注意]touch事件在chrome模拟器下部分版本使用DOM0级事件处理程序的方式来添加事件无效

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    #test{height:200px;width:200px;background:lightblue;}
  </style>
</head>
<body>
<div id="test"></div>
<script>
  (function(){ 
    var 
      stateMap = {
        touchstart_index : 0,
        touchmove_index  : 0,
        touchend_index   : 0
      },
      elesMap = {
        touch_obj: document.getElementById('test')
      },
      showIndex, handleTouch;

    showIndex = function ( type ) {
      elesMap.touch_obj.innerHTML = type + ':' + (++stateMap[type + '_index']);
    };

    handleTouch = function ( event ) {
      showIndex( event.type );
    };

    elesMap.touch_obj.addEventListener('touchstart', function(event){handleTouch(event);}); 
    elesMap.touch_obj.addEventListener('touchmove', function(event){handleTouch(event);});
    elesMap.touch_obj.addEventListener('touchend', function(event){handleTouch(event);});
  })(); 

</script>
</body>
</html>
```
<iframe src="https://demo.xiaohuochai.site/mobile/m1.html" width="320" height="240"></iframe>

 

&nbsp;

### 300ms

　　300ms问题是指在某个元素执行它的功能和执行touch事件之间有一个300毫秒的间隔。鼠标事件、焦点事件、浏览器默认行为等相较于touch事件，都存在着300ms的延迟

【点透】

　　因为300ms的存在，会造成常见的点透问题。先来看例子

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    #test {position: absolute;top: 0;left: 0;opacity: 0.5;height: 200px;width: 200px;background: lightblue;}
  </style>
</head>
<body>
  <a href="https://baidu.com">百度</a>
  <div id="test"></div>
  <script>
    (function () {
      var
        elesMap = {
          touchObj: document.getElementById('test')
        },
        fnHide, onTouch;
      fnHide = function (type) {
        elesMap.touchObj.style.display = 'none';
      };
      onTouch = function (event) {
        fnHide();
      };
      elesMap.touchObj.addEventListener('touchstart', function(event){onTouch(event);});
    })(); 
  </script>
</body>
</html>
```
　　浅蓝色的半透明div被点击(触发touch事件)后，如果点击位置正好位于链接的上方，则会触发链接跳转的默认行为。详细解释是，点击页面后，浏览器会记录所点击的页面坐标，300ms后，在该坐标找到元素。在该元素上触发点击行为。因此，如果300ms内同一页面坐标的上层元素消失后，300ms后在下层元素上触发点击行为。这就造成了点透问题

<iframe src="https://demo.xiaohuochai.site/mobile/m2.html" width="320" height="240"></iframe>

　　造成这个问题，是因为触摸屏幕的行为被重载(overload)了。在手指触摸屏幕的瞬间，浏览器无法预知用户是在轻触(Tap)、双触(Double-Tap)、滑动(Swipe)、按住不放(Hold)还是其他什么操作。唯一保险的做法就是等上一会儿看接下来会发生什么

　　问题是在于双触(Double-Tap)。即便是浏览器检测出手指离开了屏幕，它仍然无法判断接下来做什么。因为浏览器无法知道手指是会再次回到屏幕，还是就此结束触发轻触事件以及事件级联。为了确定这一点，浏览器不得不等待一小段时间。浏览器开发者找到一个最佳时间间隔，就是300毫秒

【解决办法】

　　1、在touch事件的事件处理程序中增加300ms的延迟

```
    (function () {
      var
        elesMap = {
          touchObj: document.getElementById('test')
        },
        fnHide, onTouch;
      fnHide = function (type) {
        elesMap.touchObj.style.display = 'none';
      };
      onTouch = function (event) {
        setTimeout(function(){
          fnHide();
        },300);
      };
      elesMap.touchObj.addEventListener('touchstart', function (event) { onTouch(event); });
    })(); 
```
　　2、使用缓动动画，增加300ms的过渡效果，注意display属性无法使用transition

　　3、加入中间层的dom元素，让中间层接受这个穿透事件，稍后隐藏

　　4、上下两级都使用tap事件，但默认行为不可避免

　　5、在document上的touchstart事件，阻止默认行为。
```
document.addEventListener('touchstart',function(e){
    e.preventDefault();
})
```
　　接着，添加a标签的跳转行为
```
a.addEventListener('touchstart',function(){
  window.location.href = 'https://cnblogs.com';  
})
```
　　但是，这种方法有副作用，会造成页面无法滚动、文本无法选中等。如果在某个元素上，需要恢复文本选中的行为，则可以使用阻止冒泡来恢复
```
el.addEventListener('touchstart',function(e){
    e.stopPropagation();
})
```

&nbsp;

### 事件对象

【基础信息】

　　每个触摸事件的event对象都提供了在鼠标事件中常见的属性，包括事件类型、事件目标对象、事件冒泡、事件流、默认行为等

 　　以touchstart为例，示例代码如下

```
  <script>
    (function () {
      var
        elesMap = {
          touchObj: document.getElementById('test')
        },
        onTouch;
      onTouch = function (e) {
          console.log(e)
    };
      elesMap.touchObj.addEventListener('touchstart', function (event) { onTouch(event); });
    })(); 
  </script>
```
　　1、currentTarget属性返回事件正在执行的监听函数所绑定的节点

　　2、target属性返回事件的实际目标节点

　　3、srcElement属性与target属性功能一致

```
//当前目标
currentTarget:[object HTMLDivElement]
//实际目标
target:[object HTMLDivElement]
//实际目标
srcElement:[object HTMLDivElement]
```
　　4、eventPhase属性返回一个整数值，表示事件目前所处的事件流阶段。0表示事件没有发生，1表示捕获阶段，2表示目标阶段，3表示冒泡阶段

　　5、bubbles属性返回一个布尔值，表示当前事件是否会冒泡。该属性为只读属性

　　6、cancelable属性返回一个布尔值，表示事件是否可以取消。该属性为只读属性

```
//事件流
eventPhase: 2
//可冒泡
bubbles: true
//默认事件可取消
cancelable: true
```
【touchList】

　　除了常见的DOM属性外，触摸事件对象有一个touchList数组属性，其中包含了每个触摸点的信息。如果用户使用四个手指触摸屏幕，这个数组就会有四个元素。一共有三个这样的数组

　　1、touches：当前触摸屏幕的触摸点数组（至少有一个触摸在事件目标元素上）

　　2、changedTouches ：导致触摸事件被触发的触摸点数组

　　3、targetTouches：事件目标元素上的触摸点数组

　　如果用户最后一个手指离开屏幕触发touchend事件，这最后一个触摸点信息不会出现在targetTouches和touches数组中，但是会出现在changedTouched数组中。因为是它的离开触发了touchend事件，所以changedTouches数组中仍然包含它。上面三个数组中，最常用的是changedTouches数组

```
    (function () {
      var
        elesMap = {
          touchObj: document.getElementById('test')
        },
        onTouch;
      onTouch = function (e) {
          elesMap.touchObj.innerHTML = 'touches:' + e.touches.length
                                    + '<br>changedTouches:' + e.changedTouches.length
                                    + '<br>targetTouches:' + e.targetTouches.length;
      };
      elesMap.touchObj.addEventListener('touchstart', function (event) { onTouch(event); });
    })(); 
```
<iframe src="https://demo.xiaohuochai.site/mobile/m3.html" width="320" height="240"></iframe>

【事件坐标】

　　上面这些触摸点数组中的元素可以像普通数组那样用数字索引。数组中的元素包含了触摸点的有用信息，尤其是坐标信息。每个Touch对象包含下列属性

```
clientx:触摸目标在视口中的x坐标
clientY:触摸目标在视口中的y坐标
identifier:标识触摸的唯一ID
pageX:触摸目标在页面中的x坐标（包含滚动）
pageY:触摸目标在页面中的y坐标（包含滚动）
screenX:触摸目标在屏幕中的x坐标
screenY:触摸目标在屏幕中的y坐标
target:触摸的DOM节点目标
```
　　changedTouches数组中的第一个元素就是导致事件触发的那个触摸点对象(通常这个触摸点数组不包含其他对象)。这个触摸点对象含有clientX/Y和pageX/Y坐标信息。除此之外还有screenX/Y和x/y，这些坐标在浏览器间不太一致，不建议使用

　　clientX/Y和pageX/Y的区别在于前者相对于视觉视口的左上角，后者相对于布局视口的左上角。布局视口是可以滚动的

```
    (function () {
      var
        elesMap = {
          touchObj: document.getElementById('test')
        },
        onTouch;
      onTouch = function (e) {
        var touch = e.changedTouches[0];
        elesMap.touchObj.innerHTML = 'clientX:' + touch.clientX + '<br>clientY:' + touch.clientY
          + '<br>pageX:' + touch.pageX + '<br>pageY:' + touch.pageY
          + '<br>screenX:' + touch.screenX + '<br>screenY:' + touch.screenY
      };
      elesMap.touchObj.addEventListener('touchstart', function (event) { onTouch(event); });
    })(); 
```

<iframe src="https://demo.xiaohuochai.site/mobile/m4.html" width="320" height="240"></iframe>


 