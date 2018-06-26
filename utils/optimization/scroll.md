# 滚动优化

&emsp;&emsp;scroll 、resize这类事件被触发的频次非常高，间隔很近。如果事件中涉及到大量的位置计算、DOM 操作、元素重绘等工作，且这些工作无法在下一个 scroll 事件触发前完成，就会造成浏览器掉帧。加之用户鼠标滚动往往是连续的，就会持续触发 scroll 事件导致掉帧扩大、浏览器 CPU 使用率增加、用户体验受到影响。本文将详细介绍滚动优化

 

&nbsp;

### 概述

&emsp;&emsp;在滚动事件中绑定回调的应用场景非常多，如图片的懒加载、下滑自动加载数据、侧边浮动导航栏等，用户浏览网页时，拥有平滑滚动经常是被忽视但却是用户体验中至关重要的部分

&emsp;&emsp;网页生成的时候，至少会渲染（Layout+Paint）一次。用户访问的过程中，还会不断重新的重排（reflow）和重绘（repaint）。其中，用户 scroll 和 resize 行为（即是滑动页面和改变窗口大小）会导致页面不断的重新渲染

&emsp;&emsp;滚动页面时，浏览器可能会需要绘制这些层里的一些像素。通过元素分组，当某个层的内容改变时，只需要更新该层的结构，并仅仅重绘和栅格化渲染层结构里变化的那一部分，而无需完全重绘。显然，如果滚动时，像视差网站这样有东西在移动时，有可能在多层导致大面积的内容调整，这会导致大量的绘制工作

 

&nbsp;

### scrollIntoView

&emsp;&emsp;元素的scrollIntoView()方法支持一传入一个options，设置为smooth时，即可实现平滑滚动
```
ele.scrollIntoView({ behavior: 'smooth' })
```
&emsp;&emsp;但是，该效果的兼容性不太好，移动端和IE都不支持

```
<style>
ul{
  padding: 0;
  margin: 0;
  list-style: none;
}

.con{
  width: 260px;
  display: flex;
  justify-content:space-around;
  line-height: 30px;
  background: #333;
  color: #fff;
}
.con li {
  cursor: pointer;
}
.showBox{
  width: 260px;
  height: 100px;
  overflow: hidden;
}
.show li {
  height: 100px;
  text-align: center;
  line-height: 100px;
  
}
</style>
<ul class="con" id="con">
  <li>HTML</li>
  <li>CSS</li>
  <li>JS</li>
</ul> 
<div class="showBox">
  <ul class="show" id="show">
    <li style="background: lightgreen;">HTML</li>
    <li style="background: lightblue;">CSS</li>
    <li style="background: pink;">JS</li>
  </ul> 
</div>
<script>
  const con = document.getElementById('con')
  const show = document.getElementById('show')
  const showChildren = show.children
   Array.prototype.slice.call(con.children).map((item, index) => item.scrollTarget = showChildren[index])
  con.addEventListener('click', e => {
    const { target} = e
    if (target.nodeName === 'LI') {
      target.scrollTarget.scrollIntoView({ behavior: 'smooth' })
    }
  })
</script>
```
&emsp;&emsp;效果如下所示

<iframe src="https://demo.xiaohuochai.site/scroll/s1.html" width="270" height="150"></iframe>

 

&nbsp;

### scroll-behavior

&emsp;&emsp;scroll-behavior是一个新的CSS属性，用简单的一行代码改变整个页面滚动的行为
```
html {
  scroll-behavior: smooth;
}
```
&emsp;&emsp;同样地，该属性的兼容性不太好，移动端和IE都不支持

```
<style>
body {
  margin: 0;
}
ul{
  padding: 0;
  margin: 0;
  list-style: none;
}
a {
  text-decoration: none;
  color: inherit;
}
.con{
  width: 260px;
  display: flex;
  justify-content:space-around;
  line-height: 30px;
  background: #333;
  color: #fff;
}
.con li {
  cursor: pointer;
}
.showBox{
  width: 260px;
  height: 100px;
  overflow: hidden;
  scroll-behavior: smooth;
}
.show li {
  height: 100px;
  text-align: center;
  line-height: 100px;
  
}
</style>
<ul class="con" id="con">
  <li><a href="#html">HTML</a></li>
  <li><a href="#css">CSS</a></li>
  <li><a href="#js">JS</a></li>
</ul> 
<div class="showBox">
  <ul class="show" id="show">
    <li style="background: lightgreen;" id="html">HTML</li>
    <li style="background: lightblue;" id="css">CSS</li>
    <li style="background: pink;" id="js">JS</li>
  </ul> 
</div>
```
&emsp;&emsp;效果如下所示


<iframe src="https://demo.xiaohuochai.site/scroll/s2.html" width="270" height="150"></iframe>
 

&nbsp;

### sticky

&emsp;&emsp;以前，要实现一个“粘性”元素需要编写复杂的滚动处理函数去计算元素的大小。该函数较难处理元素在“黏住”与“不黏住”之间微小的延迟，通常会导致元素抖动的出现

&emsp;&emsp;不久之前，CSS 实现了 position: sticky 属性。只需通过指定（某方向上的）偏移量即可实现想要的效果
```
.element {
  position: sticky;
  top: 50px;
}
```
&emsp;&emsp;android4.4以下及IE浏览器不支持，IOS下需添加-webkit-前缀，下面是一个demo实现

```
<style>
body {
  margin: 0;
}
main {
  height: 3000px;
}
.show{
  position: sticky;
  top: 10px;
  width: 260px;
  height: 100px;
  margin-top: 100px;
  background: lightgreen;
}
</style>
<main>
  <div class="show" id="show"></div>
</main>
</div>
```
&emsp;&emsp;效果如下



<iframe src="https://demo.xiaohuochai.site/scroll/s4.html" width="260" height="240"></iframe>

&nbsp;

### 防抖和节流

&emsp;&emsp;scroll 事件本身会触发页面的重新渲染，同时 scroll 事件的 handler 又会被高频度的触发, 因此事件的 handler 内部不应该有复杂操作，例如 DOM 操作就不应该放在事件处理中

&emsp;&emsp;针对此类高频度触发事件问题（例如页面 scroll ，屏幕 resize，监听用户输入等），下面介绍两种常用的解决方法，防抖和节流

【防抖debouncing】

&emsp;&emsp;函数防抖，字面上来说，是利用函数来防止抖动。在执行触发事件的情况下，元素的位置或尺寸属性快速地发生变化，造成页面回流，出现元素抖动的现象。通过函数防抖，使得元素的位置或尺寸属性延迟变化，从而减少页面回流

```
const debounce = (fn, wait=30) =>{
  return function() {
    clearTimeout(fn.timer)
    fn.timer = setTimeout(fn.bind(this, ...arguments), wait)
  }
}
```
【节流throttle】

&emsp;&emsp;函数节流，即限制函数的执行频率，在持续触发事件的情况下，间断地执行函数

```
const throttle = (fn, wait=100) =>{
  return function() {
    if(fn.timer) return
    fn.timer = setTimeout(() => {
      fn.apply(this, arguments)
      fn.timer = null
    }, wait)
  }
}
```
 

&nbsp;

### IntersectionObserver

&emsp;&emsp;需要实现图片懒加载或者无限滚动时，需要确定元素是否出现在视窗中。这可以在事件监听器中处理，最常见的解决方案是使用 element.getBoundingClientRect() ：

```
window.addEventListener('scroll', () => {
  const rect = elem.getBoundingClientRect();
  const inViewport = rect.bottom > 0 && rect.right > 0 &&
                     rect.left < window.innerWidth &&
                     rect.top < window.innerHeight;
});
```
&emsp;&emsp;上述代码的问题在于每次调用 getBoundingClientRect 时都会触发回流，严重地影响了性能。在事件处理函数中调用getBoundingClientRect尤为糟糕，就算使用了函数节流的技巧也可能对性能没多大帮助

&emsp;&emsp;现在可以通过使用 Intersection Observer 这一 API 来解决问题。它允许追踪目标元素与其祖先元素或视窗的交叉状态。此外，尽管只有一部分元素出现在视窗中，哪怕只有一像素，也可以选择触发回调函数：
```
const observer = new IntersectionObserver(callback, options);
observer.observe(element)
```
&emsp;&emsp;移动端及IE浏览器不支持同，不过可以使用polyfill

 

&nbsp;

### 连锁滚动

&emsp;&emsp;当用户滚动到（弹框或下拉列表）末尾（后再继续滚动时），整个页面都会开始滚动

![scroll](https://pic.xiaohuochai.site/blog/scorllGood1.gif)

&emsp;&emsp;当滚动元素到达底部时，可以通过改变页面的 overflow 属性或在滚动元素的滚动事件处理函数中取消默认行为来解决这问题

```
function handleOverscroll(event) {
  const delta = -event.deltaY;
  if (delta < 0 && elem.offsetHeight - delta > elem.scrollHeight - elem.scrollTop) {
    elem.scrollTop = elem.scrollHeight;
    event.preventDefault();
    return false;
  }
  if (delta > elem.scrollTop) {
    elem.scrollTop = 0;
    event.preventDefault();
    return false;
  }
  return true;
}
```
&emsp;&emsp;不幸的是，这个解决方案不太可靠。同时可能对页面性能产生负面影响，过度滚动对移动端的影响尤为严重

&emsp;&emsp;CSS 通过 overscroll-behavior 这个新属性解决问题。它通过控制元素滚动到尽头时的行为来解决下拉刷新与连锁滚动所带来的问题，它的属性值中也包含针对不同平台特殊值：安卓的 glow 与 苹果系统中的 rubber band

&emsp;&emsp;现在，上面 GIF 中的问题，在 Chrome、Opera 或 Firefox 中可以通过以下一行代码来解决：
```
.element {
  overscroll-behavior: contain;
}
```
&emsp;&emsp;该属性只有最新的chrome和firefox浏览器支持

 

&nbsp;

### 惯性滚动

&emsp;&emsp;苹果公司开创了“惯性”滚动并拥有它的专利 。它迅速地成为了用户交互的标准并且我们对此已习以为常

&emsp;&emsp;这里有一个 CSS 的解决方案，但看起来更像是个 hack
```
.element {
  -webkit-overflow-scrolling: touch;
}
```
&emsp;&emsp;首先，它只能在支持webkit前缀的浏览器上才能工作。其次，它只适用于触屏设备。最后，如果浏览器不支持的话，你就这样置之不理吗？但无论如何，这总归是一个解决方案

 

&nbsp;

### passive

&emsp;&emsp;浏览器虽然知道如何使得滚动变得平滑，但为确认滚动事件处理函数中是否执行了 Event.preventDefault() 以取消默认行为，有时仍可能需要花费500毫秒来等待事件处理函数执行完毕

&emsp;&emsp;即使是一个空的事件监听器，从不取消任何行为，鉴于浏览器仍会期待 preventDefault 的调用，也会对性能造成负面影响

&emsp;&emsp;为了准确地告诉浏览器不必担心事件处理函数中取消了默认行为，在 WHATWG 的 DOM 标准中存在着一个不太显眼的特性能解决这问题。它就是Passive event listeners

&emsp;&emsp;IE浏览器、andriod4.4-、IOS9.3-不支持该特性

&emsp;&emsp;事件监听函数新接受一个可选的对象作为参数，告诉浏览器当事件触发时，事件处理函数永远不会取消默认行为。当然，添加此参数后，在事件处理函数中调用 preventDefault 将不再产生效果
```
element.addEventListener('touchstart', e => {
  /* doSomething */
}, { passive: true });
```
&emsp;&emsp;针对不支持该参数的浏览器，可以使用polyfill