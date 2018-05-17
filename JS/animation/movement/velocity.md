# Velocity.js的使用 

&emsp;&emsp;Velocity是一款优秀的JS动画库，完全可以作为jQuery的animate的替代品。需要动画功能时，使用Velocity是一个好选择。本文将详细介绍Velocity.js的使用

 

&nbsp;

### 概述

&emsp;&emsp;Velocity是一个简单易用、高性能、功能丰富的轻量级JS动画库。它和jQuery的animate()有相同的API， 但它不依赖 jQuery，可单独使用。Velocity不仅包含了$.animate()的全部功能，还拥有：颜色动画、转换动画(transforms)、循环、缓动、SVG动画和滚动动画等特色功能。它比$.animate()更快更流畅，性能甚至高于CSS3 animation，是jQuery和CSS3 transition的最佳组合，它支持所有现代浏览器，最低可兼容到IE8和Android 2.3

【下载】

&emsp;&emsp;可以通过官网直接下载Velocity.js，下载地址

&emsp;&emsp;也可以使用npm安装
```
npm install velocity-animate
``` 

&nbsp;

### 基本用法

&emsp;&emsp;当使用jQuery时，Velocity和jQuery的animate()用法类似

```
$("#test").velocity({
    left: "200px"
}, {
    duration: 450,
    delay: 300
});
```
&emsp;&emsp;不使用jQuery时，写法如下

```
  var oBox = document.getElementById('test');
  Velocity(oBox,{
      left: "200px"
  }, {
      duration: 450,
      delay: 300
  }); 
```
&emsp;&emsp;下面是一个实例

```
<button id="btn">开始运动</button>
<button id="reset">还原</button>
<div id="test" style="height:100px;width:100px;background:pink;position:absolute;left:0;"></div>
<script src="http://files.cnblogs.com/files/xiaohuochai/velocity.min.js"></script>
<script>
reset.onclick = function(){history.go();}
btn.onclick = function(){
  var oBox = document.getElementById('test');
  Velocity(oBox,{
      left: "100px"
  }, {
      duration: 450,
      delay: 300
  }); 
}
</script> 
```


 
<iframe style="width: 100%; height: 160px;" src="https://demo.xiaohuochai.site/js/move/velocity/v1.html" frameborder="0" width="230" height="240"></iframe>

&nbsp;

### 参数设置

&emsp;&emsp;Velocity 接收一组 css 属性键值对 (css map) 作为它的第一个参数，该参数作为动画效果的最终属性。第二个参数是可选参数 为动画的额外配置项。下面为参数的写法：

```
$element.velocity({
    width: "500px",        // 动画属性 宽度到 "500px" 的动画
    property2: value2      // 属性示例
}, {
    /* Velocity 动画配置项的默认值 */
    duration: 400,         // 动画执行时间
    easing: "swing",       // 缓动效果
    queue: "",             // 队列
    begin: undefined,      // 动画开始时的回调函数
    progress: undefined,   // 动画执行中的回调函数（该函数会随着动画执行被不断触发）
    complete: undefined,   // 动画结束时的回调函数
    display: undefined,    // 动画结束时设置元素的 css display 属性
    visibility: undefined, // 动画结束时设置元素的 css visibility 属性
    loop: false,           // 循环
    delay: false,          // 延迟
    mobileHA: true         // 移动端硬件加速（默认开启）
});
```
【单一对象参数写法】

&emsp;&emsp;Velocity 也支持 single-argument 的语法

```
$element.velocity({
    properties: { opacity: 1 },
    options: { duration: 500 }
});

// 或者：
$element.velocity({
    p: { opacity: 1 }, // 可以将 properties 简写成 p
    o: { duration: 500 }
});
```
【逗号分割的参数写法】
```
$element.velocity({ top: 50 }, 1000);
$element.velocity({ top: 50 }, 1000, "swing");
$element.velocity({ top: 50 }, "swing");
$element.velocity({ top: 50 }, 1000, function() { alert("Hi"); });
```
【单位】

&emsp;&emsp;如果不写属性值的单位, Velocity 会将像素(px)作为默认单位

```
// 等同 padding: 1px
$element.velocity({ padding: 1 });

// 等同 padding-left: 1px, padding-right: 1px
$element.velocity({
    paddingLeft: 1,
    paddingRight: 1
});

// 不能这样写！因为这样相当于为 padding 赋了多个值
$element.velocity({ padding: "1 1 1 1" }); // error
```
&emsp;&emsp;Velocity 在 1.2.0+ 版本里增加了对 "px, em, rem, %, deg, vw/vh" 这些单位的支持。如果不填写属性单位，默认单位还是"px"，但 "deg" 用于 rotateZ 属性时可以省略不写

【计算属性】

&emsp;&emsp;Velocity 还支持动态计算属性值，包括 "+, -, *, /"，还可以设置元素在动画执行前的初始值

&emsp;&emsp;注意:"rem" 只支持 IE9+，"vh/vw" 只支持 IE9+ 和 Android 4.4+ 

```
$element.velocity({
    top: 50,                // 等同于 "50px"
    left: "50%",
    width: "+=5rem",        // 每次在当前值上叠加 5rem
    height: "*=2"           // 每次在当前值上叠乘 2
    color: ["#888", "#000"] // 每次动画执行前，color 的初始值都为"#000"（从"#000"过渡成"#888"）
});
```
【链式动画】

&emsp;&emsp;当一个元素连续应用多个velocity()时，动画将以队列的方式执行
```
$element
    /* 先执行宽度变为75px的动画 */
    .velocity({ width: 75 })
    /* 等前面的宽度动画结束后，再执行高度变为0的动画 */
    .velocity({ height: 0 });
```
&emsp;&emsp;下面是一个例子

```
<button id="btn">开始运动</button>
<button id="reset">还原</button>
<div id="test" style="height:100px;width:100px;background:pink;position:absolute;left:0;"></div>
<script src="http://files.cnblogs.com/files/xiaohuochai/jquery-1.10.0.js"></script>
<script src="http://files.cnblogs.com/files/xiaohuochai/velocity.min.js"></script>
<script>
reset.onclick = function(){history.go();}
btn.onclick = function(){
  $('#test').velocity({left:100}, {duration:500,complete:function(el){
    el[0].style.backgroundColor = 'lightblue';
    el[0].innerHTML = '小火柴的蓝色理想';
  }}).velocity({width:150})
}
</script> 
```

<iframe style="width: 100%; height: 160px;" src="https://demo.xiaohuochai.site/js/move/velocity/v2.html" frameborder="0" width="230" height="240"></iframe>
 

&nbsp;

### 配置项

&emsp;&emsp;Velocity 提供了丰富的可选配置项，可以更好的控制动画，也可以利用这些配置做出炫酷复杂的动画特效

【执行时间】

&emsp;&emsp;Velocity 的动画执行时间以毫秒为单位，并支持 jQuery 中的动画速度关键字: "slow","normal","fast"
```
$element.velocity({ opacity: 1 }, { duration: 1000 });

// 支持 jQuery 中的动画速度关键字：
$element.velocity({ opacity: 1 }, { duration: "slow" });
```
【easing缓动效果】

&emsp;&emsp;Velocity默认包含5种缓动效果

&emsp;&emsp;1、jQuery UI的缓动关键字

```
"linear"
"swing"
"spring"
"easeInSine"
"easeOutSine"
"easeInOutSine"
"easeInQuad"
"easeOutQuad"
"easeInOutQuad"
"easeInCubic"
"easeOutCubic"
"easeInOutCubic"
"easeInQuart"
"easeOutQuart"
"easeInOutQuart"
"easeInQuint"
"easeOutQuint"
"easeInOutQuint"
"easeInExpo"
"easeOutExpo"
"easeInOutExpo"
"easeInCirc"
"easeOutCirc"
"easeInOutCirc"
```

<iframe style="width: 100%; height: 500px;" src="https://demo.xiaohuochai.site/js/move/velocity/v3.html" frameborder="0" width="230" height="240"></iframe>

&emsp;&emsp;2、CSS3缓动关键字
```
"ease"
"ease-in"
"ease-out"
"ease-in-out"
```
&emsp;&emsp;3、CSS3 贝塞尔曲线
```
[ 0.17, 0.67, 0.83, 0.67 ]
```
&emsp;&emsp;4、弹簧物理缓动（spring physics）

 &emsp;&emsp;以2位数组的形式 [ tension, friction ]，tension最大值为500，friction 最大值为20

&emsp;&emsp;5、步骤缓动（step easings）

&emsp;&emsp;以1位数组的形式 使动画通过指定的步骤过渡到结束值
```
/* 标准写法 */
$element.velocity({ width: 50 }, { easing: "easeInSine" });

/* 或 */
$element.velocity({ width: 50 }, "easeInSine");
```
```
/* jQuery UI easings */
$element.velocity({ width: 50 }, "easeInSine");

/* CSS3 easings */
$element.velocity({ width: 50 }, "ease-in");

/* 贝塞尔曲线 */
$element.velocity({ width: 50 }, [ 0.17, 0.67, 0.83, 0.67 ]);

/* 弹簧物理 */
$element.velocity({ width: 50 }, [ 250, 15 ]);

/* step easing */
$element.velocity({ width: 50 }, [ 8 ]);
```
&emsp;&emsp;缓动可应用于单个属性

```
$element.velocity({
    borderBottomWidth: [ "2px", "spring" ], // border-bottom 使用 "spring"
    width: [ "100px", [ 250, 15 ] ],        // width 使用 spring physics
    height: "100px"
}, {
    easing: "easeInSine" // 默认所有属性使用 "easeInSine"
});
```
&emsp;&emsp;可以通过函数的形式注册自定义的缓动效果，函数将被扩展到$.Velocity.Easings对象上

```
// p：动画完成的百分比（十进制值）
// opts：传递到触发 .velocity() 调用的选项
// tweenDelta：补间
$.Velocity.Easings.myCustomEasing = function (p, opts, tweenDelta) {
    return 0.5 - Math.cos( p * Math.PI ) / 2;
};
```
 【动画队列】

&emsp;&emsp;可以通过设置queue: false 强制并行执行一个新动画

```
// 执行宽度变为"50px"的动画
$element.velocity({ width: "120px" }, { duration: 3000 });

setTimeout(function() {
    /* 1.5秒后 开始并行执行高度变为"50px"的新动画 */
    $element.velocity({ height: "120px" }, { duration: 1500, queue: false });
}, 1500);
```
&emsp;&emsp;下面是一个例子

```
<button id="btn">开始运动</button>
<button id="reset">还原</button>
<div id="test" style="height:100px;width:100px;background:pink;position:absolute;left:0;"></div>
<script src="http://files.cnblogs.com/files/xiaohuochai/jquery-1.10.0.js"></script>
<script src="http://files.cnblogs.com/files/xiaohuochai/velocity.min.js"></script>
<script>
$("#reset").click(function(){
  history.go();
})
$("#btn").click(function(){
  // 执行宽度变为"50px"的动画
  $("#test").velocity({ width: "200px" }, { duration: 3000 });  
  setTimeout(function() {
    /* 1.5秒后 开始并行执行高度变为"50px"的新动画 */
    $("#test").velocity({ height: "200px" }, { duration: 1500, queue: false });
  }, 1500);  
})
</script> 
```

<iframe style="width: 100%; height: 160px;" src="https://demo.xiaohuochai.site/js/move/velocity/v4.html" frameborder="0" width="230" height="240"></iframe>

&emsp;&emsp;也可以自定义动画队列，但不会立即执行，需要通过dequeue()方法手动执行动画

```
// 自定义队列，这里并不会立即执行
$("div")
  .velocity({ translateX: 75 }, { queue: "a" })
  .velocity({ width: 50 }, { queue: "b" })
  .velocity({ translateY: 75 }, { queue: "a" })
  .velocity({ height: 0 }, { queue: "b" })

// 2秒后 执行队列"a"的动画
setTimeout(function() {
  $("div").dequeue("a");
}, 2000);

// 4秒后 执行队列"b"的动画
setTimeout(function() {
  $("div").dequeue("b");
}, 4000);
```
&emsp;&emsp;注意:loop循环选项和reverse反向动画指令，不能和队列一起使用

【回调函数】

begin()

&emsp;&emsp;begin为动画开始前的回调函数，但在循环模式下(设置loop选项时)，该函数只会在第一次循环前执行一次
```
$element.velocity({
    opacity: 0
}, {
    begin: function(elements) { console.log(elements); }
});
complete()
```
&emsp;&emsp;complete为动画结束时的回调函数，在无限循环模式下（设置loop: true） 该回调函数将不会执行，但是有规定次数的循环模式下（比如设置loop: 3） 该回调函数将只会在最后一次循环结束后执行一次
```
$element.velocity({
    opacity: 0
}, {
    complete: function(elements) { console.log(elements); }
});
```
```
$element.velocity({
    opacity: 0
}, {
    // 动画循环执行3次
    loop: 3,
    // 回调函数将在第3次循环结束后 执行一次
    complete: function(elements) {
        alert("I am hungry！");
    }
});
```
progress()

&emsp;&emsp;progress为动画执行过程中调用的函数， 有elements、complete、remaining、start、tweenValue5个参数
```
elements：当前执行动画的元素，可以用$(elements)来获取
complete：整个动画过程执行到百分之多少，该值是递增的，注意：该值为一个十进制数值并不带单位(%)
remaining：整个动画过程还剩下多少毫秒，该值是递减的
start：动画开始时的绝对时间 (Unix time)
tweenValue：动画执行过程中 两个动画属性之间的补间值
```
```
$element.velocity({
    opacity: 0,
    tween: 1000 // 可选的
}, {
    duration: 2000,
    progress: function(elements, complete, remaining, start, tweenValue) {
        console.log((complete * 100) + "%");
        console.log(remaining + "ms remaining!");
        console.log("The current tween value is " + tweenValue)
    }
});

// 可以简写这些参数：
$element.velocity({
    tween: [ 0, 1000 ]
}, {
    easing: "spring",
    progress: function(elements, c, r, s, t) {
        console.log("The current tween value is " + t)
    }
});
```
【移动端加速】

&emsp;&emsp;mobileHA可以设置是否开始移动端硬件加速， 默认值为true，也可以通过设置 mobileHA: false关闭硬件加速
```
// 关闭移动端硬件加速
$element.velocity(propertiesMap, { mobileHA: false });
```
【Loop动画循环执行】

&emsp;&emsp;设置loop为一个正整数，比如设置loop: 2，就可以让动画循环执行2次
```
// 循环执行2次（注意：元素height值变化到10em 再从10em变化到初始值 是一次循环）
$element.velocity({ height: "10em" }, { loop: 2 });
```
&emsp;&emsp;如果设置loop: true，可以让动画无限循环执行
```
$element.velocity({ height: "10em" }, { loop: true });
```
【Delay动画延迟执行】

&emsp;&emsp;和 jQuery 的$.delay()方法一样，动画将会延迟所设定的毫秒后执行
```
// 动画将延迟1500毫秒后执行
$element.velocity({ height: "+=10em" }, { delay: 1500 });
```
【display 和 visibility】

&emsp;&emsp;可以在动画执行结束后 动态设置元素的 css 属性display或visibility
```
/* 动画结束后 元素 display 属性设为 "none" */
$element.velocity({ opacity: 0 }, { display: "none" });

/* 动画结束后 元素的 visibility 属性设为 hidden */
$element.velocity({ opacity: 0 }, { visibility: "hidden" });
```
&emsp;&emsp;display 或 visibility 的值可以设为 css 中规定的其他值，比如 display: "inline-block"

&emsp;&emsp;注意:当使用reverse方向动画指令时，display 和 visibility 选项都将被忽略。

 

&nbsp;

### 动画指令

&emsp;&emsp;Velocity 中预定义了几个常用的快捷动画指令

【fade】

&emsp;&emsp;Fade对应为"fadeIn"(淡入) 和"fadeOut"(淡出) 两个动画指令， 和 jQuery 的`$.fadeIn()`和`$.fadeOut()`相似

&emsp;&emsp;Fade 和 Slide 动画指令都会动态设置元素的display属性显示或隐藏。 默认情况下，当元素被显示，如果是块级元素(如`<div>`)，就会被设置成display: block，如果是行级元素(如`<span>`)，就会被设为display: inline。Velocity会根据元素的标签类型设置最适合的值

&emsp;&emsp;如果在配置项中设置了display选项为某值时， 动画结束时该值会覆盖 Fade 和 Slide 所设置的display属性值
```
// 元素会执行平滑淡入的效果
// 当动画结束时 元素的 display 属性会被设置成 "table"
$element.velocity("fadeIn", { display: "table" });
```
&emsp;&emsp;下面是一个例子

```
<button id="btn">开始运动</button>
<button id="reset">还原</button>
<div id="test" style="height:100px;width:100px;background:pink;position:absolute;left:0;"></div>
<script src="http://files.cnblogs.com/files/xiaohuochai/jquery-1.10.0.js"></script>
<script src="http://files.cnblogs.com/files/xiaohuochai/velocity.min.js"></script>
<script>
$("#reset").click(function(){
  history.go();
})
var OnOff = true;
$("#btn").click(function(){
  if(OnOff = !OnOff){
    $("#test").velocity("fadeIn"); 
  }else{
    $("#test").velocity("fadeOut"); 
  } 
})
</script> 
```
<iframe style="width: 100%; height: 160px;" src="https://demo.xiaohuochai.site/js/move/velocity/v5.html" frameborder="0" width="230" height="240"></iframe>

【slide】 

&emsp;&emsp;Slide 对应为:"slideUp"(收起) 和"slideDown"(展开)两个动画指令， 和 jQuery 的$.slideUp(),$.slideDown()方法相似，通过动态调整元素的height属性，让元素 "收起" 或 "下拉"
```
// 元素会先"收起"隐藏，延迟500毫秒后 再"下拉"显示
$element
    .velocity("slideUp", { duration: 1500 })
    .velocity("slideDown", { delay: 500, duration: 1500 });
```    
&emsp;&emsp;下面是一个例子

```
<button id="btn">开始运动</button>
<button id="reset">还原</button>
<div id="test" style="height:100px;width:100px;background:pink;position:absolute;left:0;"></div>
<script src="http://files.cnblogs.com/files/xiaohuochai/jquery-1.10.0.js"></script>
<script src="http://files.cnblogs.com/files/xiaohuochai/velocity.min.js"></script>
<script>
$("#reset").click(function(){
  history.go();
})
var OnOff = false;
$("#btn").click(function(){
  if(OnOff = !OnOff){
    $("#test").velocity("slideUp"); 
  }else{
    $("#test").velocity("slideDown"); 
  } 
})
</script> 
```
<iframe style="width: 100%; height: 160px;" src="https://demo.xiaohuochai.site/js/move/velocity/v6.html" frameborder="0" width="230" height="240"></iframe>

【scroll】 

&emsp;&emsp;1、滚动浏览器内容到目标元素的位置

&emsp;&emsp;"scroll"动画指令，比如常用的回顶动画就可以使用这个指令
```
/* 回顶动画，滚动浏览器内容到 <body> 的顶部 */
$("body").velocity("scroll", { duration: 500, easing: "easeOutQuart" });
```
&emsp;&emsp;下面是一个例子

```
<body style="height:2000px">
<button id="btn" style="position:fixed;right:0;bottom:0">回到顶部</button>
<script src="http://files.cnblogs.com/files/xiaohuochai/jquery-1.10.0.js"></script>
<script src="http://files.cnblogs.com/files/xiaohuochai/velocity.min.js"></script>
<script>
$("#btn").click(function(){
  $(document.documentElement).velocity("scroll", { duration: 500, easing: "easeOutQuart" });
})
</script> 
</body>
```

<iframe style="width: 100%; height: 160px;" src="https://demo.xiaohuochai.site/js/move/velocity/v7.html" frameborder="0" width="230" height="240"></iframe>

&emsp;&emsp;2、滚动元素内容到目标位置

&emsp;&emsp;当一个元素的内容部分溢出产生滚动条，可以使用"scroll"将内容滚动到指定的位置，container选项对应为该元素的选择器
```
/* 让 $("#container") 元素的内容滚动到内部子元素 $("#element3") 所在的位置. */
$("#element3").velocity("scroll", { container: $("#container") });
```
```
<div id="box" style="height:100px;width:200px;overflow:auto">
  <p id="element1">1 element. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.</p>
  <p id="element2">2 element. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud </p>
  <p id="element3">3 element. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.</p>
  <p id="element4">4 element. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.</p>
  <p id="element5">5 element. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.</p>
  <p id="element6">6 element. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud </p> 
</div>
<button id="btn">到第四段</button>
<script src="http://files.cnblogs.com/files/xiaohuochai/jquery-1.10.0.js"></script>
<script src="http://files.cnblogs.com/files/xiaohuochai/velocity.min.js"></script>
<script>
$("#btn").click(function(){
  $("#element4").velocity("scroll", { container: $("#box"), easing: "easeOutQuart" });
})
</script> 
```
<iframe style="width: 100%; height: 160px;" src="https://demo.xiaohuochai.site/js/move/velocity/v8.html" frameborder="0" width="230" height="240"></iframe>

&emsp;&emsp;3、 设置滚动相对偏移量

&emsp;&emsp;可以设置相对偏移量，单位默认为px
```
$element
    /* 滚动到相对 $element 向下偏移250px的地方 */
    .velocity("scroll", { duration: 750, offset: 250 })
    /* 再滚动到相对 $element 向上偏移50px的地方 */
    .velocity("scroll", { duration: 750, offset: -50 });
```
&emsp;&emsp;另外，当滚动整个浏览器窗口时，如果目标元素为<html>， 可以关闭硬件加速，设置mobileHA: false来避免 iOS 中可能出现的页面闪动问题
```
/* 滚动整个页面到一个任意值 */
$("html").velocity("scroll", { offset: "750px", mobileHA: false });
```
【stop】

&emsp;&emsp;"stop"指令，可以使当前正在执行的动画立即停止，类似 jQuery 的$.stop()方法

```
$element.velocity("stop"); // 停止正在执行的 $element 元素的动画
$element.velocity("stop", "myQueue"); // 停止某自定义队列
$element.velocity({ left: 100 });
// 点击 $("#button")，立即停止当前正在执行的 left 动画
// 并立即反向执行 left 动画 (right 方向运动)
$("#button").on("click", function() {
    $element.velocity("stop").velocity("reverse");
});
```
&emsp;&emsp;设置stop: true, 可以停止并清空当前正在执行的整个动画队列

```
$element
    .velocity({ width: 100 }, 1000)
    .velocity({ height: 200 }, 1000);

// 如果元素正在执行 width 动画，点击 $("#button") 将立即停止当前动画
// 并移除和跳过将要执行的 height 动画队列
$("#button").on("click", function() {
    $element.velocity("stop", true);
});
```
【finish】

&emsp;&emsp;"finish"指令会停止当前正在执行的动画，并直接跳转到动画结束的状态（无过渡）

【reverse】

&emsp;&emsp;"reverse"指令使动画反向执行，就像让一部电影倒着播放。 Reverse 默认会继承之前动画的配置选项（比如duration,easing等）， 但也可以重新设置
```
$element
    .velocity({ left: 200 }, { duration: 500 })
    .velocity("reverse", { duration: 2000 });
```
&emsp;&emsp;下面是一个例子

```
<button id="btn">开始运动</button>
<button id="reset">还原</button>
<div id="test" style="height:100px;width:100px;background:pink;position:absolute;left:0;"></div>
<script src="http://files.cnblogs.com/files/xiaohuochai/jquery-1.10.0.js"></script>
<script src="http://files.cnblogs.com/files/xiaohuochai/velocity.min.js"></script>
<script>
$("#reset").click(function(){
  history.go();
})
$("#btn").click(function(){
  $("#test").velocity({left:100}).velocity("reverse"); 

})
</script> 
```

<iframe style="width: 100%; height: 160px;" src="https://demo.xiaohuochai.site/js/move/velocity/v9.html" frameborder="0" width="230" height="240"></iframe>
 

&nbsp;

### 特色动画

&emsp;&emsp;Velocity 提供了一些特色动画功能

【transform】

&emsp;&emsp;Velocity 支持2D/3D变换动画， 比如translate, scale, rotate, skew等
```
$element.velocity({
    translateX: "200px",
    rotateZ: "45deg"
});
```
&emsp;&emsp;以下列举了所有常用的 transform 相关可用属性：

```
{
    /* translate */
    translateX: 20,     // 等同于"20px"
    translateY: "1.5em",
    translateZ: "20px", // IE10+

    /* scale */
    scale: 0.5,
    scaleX: 0.5,
    scaleY: 0.5,

    /* rotate */
    rotate: 45,       // 等同于"45deg"
    rotateX: "45deg", // IE10+
    rotateY: "45deg", // IE10+
    rotateZ: "45deg",

    /* skew */
    skewX: "30deg",
    skewY: "30deg",
}
```
&emsp;&emsp;注意:浏览器支持：`> IE9`

```
<button id="btn">开始运动</button>
<button id="reset">还原</button>
<div id="test" style="height:100px;width:100px;background:pink;position:absolute;left:0;"></div>
<script src="http://files.cnblogs.com/files/xiaohuochai/jquery-1.10.0.js"></script>
<script src="http://files.cnblogs.com/files/xiaohuochai/velocity.min.js"></script>
<script>
$("#reset").click(function(){
  history.go();
})
$("#btn").click(function(){
  $("#test").velocity({rotateZ: "45deg"}).velocity("reverse"); 
})
</script> 
```
<iframe style="width: 100%; height: 160px;" src="https://demo.xiaohuochai.site/js/move/velocity/v10.html" frameborder="0" width="230" height="240"></iframe>

【colors】

&emsp;&emsp;Velocity颜色动画支持的颜色属性有:color, backgroundColor, borderColor, outlineColor。 属性值支持:rgb, hsla, 十六进制颜色码，但不支持关键词 比如:"green"

```
$element.velocity({
    backgroundColor: "#ff0000",
    /* 背景色 RGBA 中的 A 透明度到50%  */
    backgroundColorAlpha: 0.5,
    /* 字体颜色 RGB 中的 Red 到 50% (0.5 * 255) */
    colorRed: "50%",
    /* 字体颜色 RGB 中的 Blue 值叠加50 */
    colorBlue: "+=50",
    /* 字体颜色 RGBA 中的 A 透明度到85% */
    colorAlpha: 0.85
});
```
```
<button id="btn">开始运动</button>
<button id="reset">还原</button>
<div id="test" style="height:100px;width:100px;background:pink;position:absolute;left:0;"></div>
<script src="http://files.cnblogs.com/files/xiaohuochai/jquery-1.10.0.js"></script>
<script src="http://files.cnblogs.com/files/xiaohuochai/velocity.min.js"></script>
<script>
$("#reset").click(function(){
  history.go();
})
$("#btn").click(function(){
  $("#test").velocity({backgroundColor: "#0f0"}).velocity("reverse"); 
})
</script> 
```
<iframe style="width: 100%; height: 160px;" src="https://demo.xiaohuochai.site/js/move/velocity/v11.html" frameborder="0" width="230" height="240"></iframe>

【svg】

&emsp;&emsp;Velocity 支持 SVG 元素动画，包含所有常用 SVG 属性， 例如:x, y, rx, fill, stroke-width, opacity 等

```
$svgRectangle.velocity({
    /* 坐标动画 */
    x: 200,
    r: 25,
    /* 2D 变换动画 */
    translateX: "200px",
    /* 3D 变换动画（非IE浏览器） */
    translateZ: "200px",
    /* 颜色填充动画 "Fill" */
    fill: "#ff0000",
    strokeRed: 255,
    strokeGreen: 0,
    strokeBlue: 0,
    /* 一些标准的 CSS 属性动画 */
    opacity: 1,
    width: "50%"
});
```
&emsp;&emsp;注意:浏览器支持：`>= IE9` 和 `>= Android 3.0`

【Hook】

&emsp;&emsp;Hook 可以设置多个CSS属性中的单独一个值，比如 "boxShadow", "clip"等，作用与 jQuery 的$.css()方法相似
```
$.Velocity.hook($element, "translateX", "500px"); // 值必须写上单位
$.Velocity.hook(elementNode, "textShadowBlur", "10px"); // 值必须写上单位
```
&emsp;&emsp;还可以获取单个 CSS 属性的值
```
$.Velocity.hook($element, "translateX"); // 获取元素的translateX值
$.Velocity.hook(elementNode, "textShadowBlur");
```
【promises】

&emsp;&emsp;Velocity 可以使用 ES6 的 Promises 对象的语法方式

```
/* 使用 Velocity 的公有方法，$element 为dom选择器 可以用jQuery的 或 原生js的 */
$.Velocity.animate($element, { opacity: 0.5 })
    /* 一旦动画执行完成 执行下面.then()中的回调函数（可以写多个.then()）*/
    .then(function(elements) { console.log("Resolved."); })
    /* 捕获错误后的回调函数 */
    .catch(function(error) { console.log("Rejected."); });
```
【Mock】

&emsp;&emsp;如果设置$.Velocity.mock = true; 会强制页面里所有的 Velocity 动画的duration和delay值为0ms，动画会直接跳转到结束状态，这个方法常用于代码调试

&emsp;&emsp;也可以将$.Velocity.mock设置为一个整数，可以加快或减慢页面上所有的 Velocity 动画速度
```
/* 页面里所有 Velocity 动画 将以10为系数减慢 */
$.Velocity.mock = 10;
```
【Utility Function】

&emsp;&emsp;Velocity 的公有方法
```
/* 标准的多参数语法 */
var divs = document.getElementsByTagName("div");
$.Velocity(divs, { opacity: 0 }, { duration: 1500 });
```
&emsp;&emsp;另一种写法：

```
// 可选的单参数语法（idea 来源于 CoffeeScript）
// e：element - 元素，一个dom选择器
// p: properties - 属性map { property1: value1, property2: value2, … }
// o: options - 配置选项
var divs = document.getElementsByTagName("div");
$.Velocity({ e: divs, p: { opacity: 0 }, o: { duration: 1500 });
```
 

&nbsp;

### 高级用法

【函数】

&emsp;&emsp;属性值可通过传递一个函数来设置动画效果
```
// 使 $element 的透明度随机到一个值 的动画，每次执行后 元素透明度都不同
$element.velocity({
    opacity: function() { return Math.random() }
});
```
```
<button id="btn">开始运动</button>
<button id="reset">还原</button>
<div id="test" style="height:100px;width:100px;background:pink;position:absolute;left:0;"></div>
<script src="http://files.cnblogs.com/files/xiaohuochai/jquery-1.10.0.js"></script>
<script src="http://files.cnblogs.com/files/xiaohuochai/velocity.min.js"></script>
<script>
$("#reset").click(function(){
  history.go();
})
$("#btn").click(function(){
  $("#test").velocity({opacity: function() {return Math.random()}});
})
</script> 
```
<iframe style="width: 100%; height: 160px;" src="https://demo.xiaohuochai.site/js/move/velocity/v12.html" frameborder="0" width="230" height="240"></iframe>

【初始值】

&emsp;&emsp;通常，在动画执行前，动画引擎会先查询 DOM 以确定元素的初始值， Velocity 可以让用户自定义元素初始值，这样可以避免 DOM 查询

```
$element.velocity({
    /* translateX 初始值永远为0 动画结束值为500px */
    translateX: [ 500, 0 ],
    /* opacity 初始值永远为0 动画结束值为1 缓动效果为"easeInSine" */
    opacity: [ 0, "easeInSine", 1 ]
});
```
```
$element
    /* 对于这个链式动画，在每次动画开始前 元素的 translateX 初始值还是0 */
    .velocity({ translateX: [ 500, 0 ] })
    .velocity({ translateX: 1000 });
```
&emsp;&emsp;下面是一个例子

```
<button id="btn">开始运动</button>
<button id="reset">还原</button>
<div id="test" style="height:100px;width:100px;background:pink;position:absolute;left:0;"></div>
<script src="http://files.cnblogs.com/files/xiaohuochai/jquery-1.10.0.js"></script>
<script src="http://files.cnblogs.com/files/xiaohuochai/velocity.min.js"></script>
<script>
$("#reset").click(function(){
  history.go();
})
$("#btn").click(function(){
  $("#test").velocity({ left: [ 100, 50 ] }).velocity("reverse");
  })
</script> 
```

<iframe style="width: 100%; height: 160px;" src="https://demo.xiaohuochai.site/js/move/velocity/v13.html" frameborder="0" width="230" height="240"></iframe>
 

&nbsp;

### UI插件

&emsp;&emsp;velocity.ui.js 是 velocity.js 的 动画插件，可以用它快速创建炫酷的动画特效，它依赖于velocity.js

&emsp;&emsp;velocity.ui 有2个重要方法:`$.Velocity.RegisterEffect()`和 `$.Velocity.RunSequence()`

&emsp;&emsp;前者将多个 Velocity 动画合并存储到一个自定义数组里，可以通过引用该数组的名称在项目中复用， 后者能改进嵌套的动画序列使得更易于管理

【$.Velocity.RunSequence()】

&emsp;&emsp;如果嵌套动画的嵌套层次很多时，会难以管理
```
$element1.velocity({ translateX: 100 }, 1000, function() {
    $element2.velocity({ translateX: 200 }, 1000, function() {
        $element3.velocity({ translateX: 300 }, 1000);
    });
});
```
&emsp;&emsp;如何解决上面的问题？直接用$.Velocity.RunSequence()对上面代码进行重写：
```
e：element - 表示元素
p：properties - 属性集
o：options - 配置选项
```
```
// 将嵌套动画序列储存到一个数组里，很清晰的显示了它们的执行顺序
var mySequence = [
    { e: $element1, p: { translateX: 100 }, o: { duration: 1000 } },
    { e: $element2, p: { translateX: 200 }, o: { duration: 1000 } },
    { e: $element3, p: { translateX: 300 }, o: { duration: 1000 } }
];

// 调用这个自定义的序列名称 还可以在其他地方复用
$.Velocity.RunSequence(mySequence);
```
【内置特效】

&emsp;&emsp;Velocity.ui.js 内置了很多常用的动画特效，分为 callout.* 和 transition.* 两类，下面是所有的特效名：

```
callout.bounce
callout.shake
callout.flash
callout.pulse
callout.swing
callout.tada
transition.fadeIn
transition.fadeOut
transition.flipXIn
transition.flipXOut
transition.flipYIn
transition.flipYOut
transition.flipBounceXIn
transition.flipBounceXOut
transition.flipBounceYIn
transition.flipBounceYOut
transition.swoopIn
transition.swoopOut
transition.whirlIn
transition.whirlOut
transition.shrinkIn
transition.shrinkOut
transition.expandIn
transition.expandOut
transition.bounceIn
transition.bounceUpIn
transition.bounceUpOut
transition.bounceDownIn
transition.bounceDownOut
transition.bounceLeftIn
transition.bounceLeftOut
transition.bounceRightIn
transition.bounceRightOut
transition.slideUpIn
transition.slideUpOut
transition.slideDownIn
transition.slideDownOut
transition.slideLeftIn
transition.slideLeftOut
transition.slideRightIn
transition.slideRightOut
transition.slideUpBigIn
transition.slideUpBigOut
transition.slideDownBigIn
transition.slideDownBigOut
transition.slideLeftBigIn
transition.slideLeftBigOut
transition.slideRightBigIn
transition.slideRightBigOut
transition.perspectiveUpIn
transition.perspectiveUpOut
transition.perspectiveDownIn
transition.perspectiveDownOut
transition.perspectiveLeftIn
transition.perspectiveLeftOut
transition.perspectiveRightIn
transition.perspectiveRightOut
```

<iframe style="width: 100%; height: 700px;" src="https://demo.xiaohuochai.site/js/move/velocity/v14.html" frameborder="0" width="230" height="240"></iframe>

【stagger, drag 和 backwards 选项】 

&emsp;&emsp;velocity.ui 有stagger,drag,backwards 三个可选配置项

&emsp;&emsp;注意:这些选项只在调用内置动画特效时才起作用

stagger

&emsp;&emsp;中文译为"错开"，当遍历一组元素时 (each)， 设置 stagger 为一个毫秒数 (ms) 能让每个元素依次延迟该毫秒数执行动画，产生一种错开的运动节奏感
```
// 默认情况下，三个元素会同时运动
// 这里设置了 stagger 为 300 后，每个元素会依次延迟300ms执行动画
$(".box-stagger").velocity("transition.slideLeftBigIn", { stagger: 300 });
```
&emsp;&emsp;下面是一个例子

```
<style>
.box-stagger{width: 100px;height: 100px;border:1px solid black;background:lightgreen;line-height: 100px;color:white;text-align: center;} 
</style>

<button id="btn">开始运动</button>
<button id="reset">还原</button>
<div class="box-stagger">1</div>
<div class="box-stagger">2</div>
<div class="box-stagger">3</div>

<script>
$("#reset").click(function(){
  history.go();
})
$("#btn").click(function(){
  $(".box-stagger").velocity("transition.slideLeftBigIn", { stagger: 300 });
})
</script> 
```

<iframe style="width: 100%; height: 350px;" src="https://demo.xiaohuochai.site/js/move/velocity/v15.html" frameborder="0" width="230" height="240"></iframe>

drag

&emsp;&emsp;遍历一组元素时 (each)，当设置drag: true， 最后一个元素会产生一种类似缓冲的效果，但它和其他元素的动画的duration是一样的
```
// 最后一个元素产生缓冲效果
$(".box-drag").velocity("transition.slideLeftBigIn", { drag: true });
```
&emsp;&emsp;下面是一个例子

```
<style>
.box-drag{width: 100px;height: 100px;border:1px solid black;background:lightgreen;line-height: 100px;color:white;text-align: center;} 
</style>

<button id="btn">开始运动</button>
<button id="reset">还原</button>
<div class="box-drag">1</div>
<div class="box-drag">2</div>
<div class="box-drag">3</div>

<script>
$("#reset").click(function(){
  history.go();
})
$("#btn").click(function(){
  $(".box-drag").velocity("transition.slideLeftBigIn", { drag: true });
})
</script> 

```
<iframe style="width: 100%; height: 350px;" src="https://demo.xiaohuochai.site/js/move/velocity/v16.html" frameborder="0" width="230" height="240"></iframe>

backwards

&emsp;&emsp;中文译为"向后的"，这个选项通常和drag一起使用， 元素会从最后一个开始依次延迟执行动画
```
$('.box-backwards').velocity('transition.slideLeftBigIn', {
    stagger: 300,
    backwards: true
});
```
&emsp;&emsp;下面是一个例子

```
<style>
.box-backwards{width: 100px;height: 100px;border:1px solid black;background:lightgreen;line-height: 100px;color:white;text-align: center;} 
</style>

<button id="btn">开始运动</button>
<button id="reset">还原</button>
<div class="box-backwards">1</div>
<div class="box-backwards">2</div>
<div class="box-backwards">3</div>

<script>
$("#reset").click(function(){
  history.go();
})
$("#btn").click(function(){
  $('.box-backwards').velocity('transition.slideLeftBigIn', {
    stagger: 300,
    backwards: true
  });
})
</script> 
```
<iframe style="width: 100%; height: 350px;" src="https://demo.xiaohuochai.site/js/move/velocity/v17.html" frameborder="0" width="230" height="240"></iframe>

【 $.Velocity.RegisterEffect()】 

&emsp;&emsp;$.Velocity.RegisterEffect()方法允许注册自定义动画特效，以便在项目中复用

```
// name：动画特效名称 为字符串类型
// defaultDuration：默认动画执行时间 单位为毫秒(ms)
// calls：动画队列数组，property - 动画属性，durationPercentage - 当前动画所占总时间的百分比 (写成浮点数)，option - 选项
// reset：设置元素在动画开始时的初始值
$.Velocity.RegisterEffect(name, {
    defaultDuration: duration,
    calls: [
        [ { property: value }, durationPercentage, { options } ],
        [ { property: value }, durationPercentage, { options } ]
    ],
    reset: { property: value, property: value }
});
```
&emsp;&emsp;下面是一个使用$.Velocity.RegisterEffect()的例子

```
$.Velocity.RegisterEffect("callout.customPulse", {
    defaultDuration: 900,
    calls: [
        [ { scaleX: 1.5 }, 0.50 ], // 0.50 为 动画总时间的50%
        [ { scaleX: 1 }, 0.50 ]
    ]
});

// 调用
$element.velocity("callout.customPulse");
```
```
<div id="test" style="height: 100px;width: 100px;background:lightgreen;border-radius: 50%;"></div>
<script>
$.Velocity.RegisterEffect("callout.customPulse", {
    defaultDuration: 900,
    calls: [
        [ { scaleX: 1.5 }, 0.50 ],
        [ { scaleX: 1 }, 0.50 ]
    ]
});
$("#test").click(function(){
  $(this).velocity("callout.customPulse");
})
</script> 
```
<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/js/move/velocity/v18.html" frameborder="0" width="230" height="240"></iframe>

&emsp;&emsp;还可以使用链式的写法注册一系列自定义动画

```
$.Velocity
    .RegisterEffect("transition.customFlipXIn", {
        defaultDuration: 700,
        calls: [
            [ { opacity: 1, rotateY: [ 0, -55 ] } ]
        ]
    });
    .RegisterEffect("transition.customFlipXOut", {
        defaultDuration: 700,
        calls: [
            [ { opacity: 0, rotateY: 55 } ]
        ],
        reset: { rotateY: 0 }
    });

// 调用
$element
    .velocity("transition.customFlipXIn")
    .velocity("transition.customFlipXOut", { delay: 1000, display: "none" });
```