# 深入理解DOM事件机制系列第四篇——事件模拟

&emsp;&emsp;事件是网页中某个特别的瞬间，经常由用户操作或通过其他浏览器功能来触发。但实际上，也可以使用javascript在任意时刻来触发特定的事件，而此时的事件就如同浏览器创建的事件一样。本文将详细介绍事件模拟

&nbsp;

### 引入

&emsp;&emsp;以下面的实际需求为例，来详细说明事件模拟的使用。按钮一的点击效果是弹出1。而我们通过新增按钮二来模拟按钮一的效果

<div>
<pre>&lt;button id="btn1"&gt;按钮一&lt;/button&gt;
&lt;script&gt;
btn1.onclick = function(){
    alert(1);
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/eventImitate/e1.html" frameborder="0" width="320" height="240"></iframe>

**事件复制**

&emsp;&emsp;通过调用相同的事件处理函数，来完成相同的功能

<div>
<pre>&lt;button id="btn1"&gt;按钮一&lt;/button&gt;
&lt;button id="btn2"&gt;按钮二&lt;/button&gt;
&lt;script&gt;
btn1.onclick=function(){
    alert(1);
}
btn2.onclick = btn1.onclick;
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/eventImitate/e2.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;但是，有一个问题，在不知道按钮一的事件处理函数以及以何种调用形式调用时，这种方法是危险的

&emsp;&emsp;下面这种情况将无法正确模拟

<div>
<pre>&lt;button id="btn1"&gt;按钮一&lt;/button&gt;
&lt;button id="btn2"&gt;按钮二&lt;/button&gt;
&lt;script&gt;
if(btn1.addEventListener){
    btn1.addEventListener('click',function(){alert(1);})
}else{
    btn1.attachEvent('onclick',function(){alert(1);})
}
btn2.onclick = btn1.onclick;
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/eventImitate/e3.html" frameborder="0" width="320" height="240"></iframe>

**click()方法**

&emsp;&emsp;使用click()方法，则无论使用何种事件处理程序都可以实现模拟效果

<div>
<pre>&lt;button id="btn1"&gt;按钮一&lt;/button&gt;
&lt;button id="btn2"&gt;按钮二&lt;/button&gt;
&lt;script&gt;
if(btn1.addEventListener){
    btn1.addEventListener('click',function(){alert(1);})
}else{
    btn1.attachEvent('onclick',function(){alert(1);})
}
btn2.onclick = function(){
    btn1.click();
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/eventImitate/e4.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;虽然click()方法可以完美模拟click事件，但是对于其他事件并没有相应的模拟方法，就需要用到下面要介绍的事件模拟了。好吧，我承认这个引入比较长。但是，我不知道如何再缩短了&nbsp;

&nbsp;

### 模拟机制

&emsp;&emsp;事件模拟包括3个部分：创建事件、初始化以及触发事件。某些情况下，初始化与创建事件一起进行。最终，通过dispatchEvent()方法或fireEvent()方法来触发事件

&emsp;&emsp;对于不同的事件类型，有不同的创建方法。下面以mouseover事件为例

**MouseEvent()**

&emsp;&emsp;使用MouseEvent()方法可以创建鼠标事件。实际上，MouseEvent()方法在创建事件的同时，也包括了初始化的操作

&emsp;&emsp;注意：IE浏览器和safari浏览器不支持

&emsp;&emsp;最后使用dispatchEvent()方法在当前节点上触发指定事件。该方法返回一个布尔值，只要有一个监听函数调用了Event.preventDefault()，则返回值为false，否则为true

&emsp;&emsp;注意：IE8-浏览器不支持

<div>
<pre>function simulateMouseOver(obj) {
  var event = new MouseEvent('mouseover', {
    'bubbles': true,
    'cancelable': true
  });
  obj.dispatchEvent(event);
}</pre>
</div>
<div>
<pre>&lt;button id="btn1"&gt;按钮一&lt;/button&gt;
&lt;button id="btn2"&gt;按钮二&lt;/button&gt;
&lt;script&gt;
if(btn1.addEventListener){
    btn1.addEventListener('mouseover',function(){alert(1);})
}else{
    btn1.attachEvent('onmouseover',function(){alert(1);})
}
function simulateMouseOver(obj) {
  var event = new MouseEvent('mouseover', {
    'bubbles': true,
    'cancelable': true
  });
  obj.dispatchEvent(event);
}
btn2.onmouseover = function(){
    simulateMouseOver(btn1);
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/eventImitate/e5.html" frameborder="0" width="320" height="240"></iframe>

**creatEvent()**

&emsp;&emsp;在document对象上使用createEvent()方法可以用来创建event对象。这个方法接收一个参数，表示要创建的事件类型的字符串

&emsp;&emsp;注意：IE8-浏览器不支持createEvent()方法

&emsp;&emsp;在使用document.createElement创建事件之后，还需要使用与事件有关的信息对其进行初始化，每种不同类型的事件都有不同的初始化方法

<div>
<pre>事件类型                事件初始化方法
UIEvents               event.initUIEvent
MouseEvents            event.initMouseEvent
MutationEvents         event.initMutationEvent
HTMLEvents             event.initEvent
Event                  event.initEvent
CustomEvent            event.initCustomEvent
KeyboardEvent          event.initKeyEvent</pre>
</div>

&emsp;&emsp;下面是initMouseEvent()方法的参数，它们与鼠标事件的event对象所包含的属性一一对应。其中，前4个参数对正确地激发事件至关重要，因为浏览器要用到这些参数；而剩下的所有参数只有在事件处理程序中才会用到

&emsp;&emsp;注意：IE8-浏览器不支持initMouseEvent()方法

&emsp;&emsp;type(字符串):表示要触发的事件类型，例如"click"

&emsp;&emsp;bubbles(布尔值):表示事件是否应该冒泡。为精确地模拟鼠标事件，应该把这个参数设置为true

&emsp;&emsp;cancelable(布尔值):表示事件是否可以取消。为精确地模拟鼠标事件，应该把这个参数设置为crue

&emsp;&emsp;view(AbstractView):与事件关联的视图。这个参数几乎总是要设置为document.defaultView

&emsp;&emsp;detail(整数):与事件有关的详细信息。这个值一般只有事件处理程序使用，但通常都设置为0

&emsp;&emsp;screenx(整数):事件相对于屏幕的X坐标

&emsp;&emsp;screenY(整数):事件相对于屏幕的Y坐标

&emsp;&emsp;clientX(整数):事件相对于视口的X坐标

&emsp;&emsp;clientY(整数):事件相对于视口的Y坐标

&emsp;&emsp;ctrlKey(布尔值):表示是否按下Ctrl键。默认值为false

&emsp;&emsp;altkey(布尔值):表示是否按下了Alt键。默认值为false

&emsp;&emsp;shiftKey(布尔值):表示是否按下了Shift键。默认值为false

&emsp;&emsp;metaKey(布尔值):表示是否按下了Meta键。默认值为false

&emsp;&emsp;button(整数):表示按下了哪一个鼠标键。默认值为0

&emsp;&emsp;relatedTarget(对象):表示与事件相关的对象。这个参数只在模拟mouseover或mouseout时使用

【写法一】createEvent()方法使用MouseEvents参数

<div>
<pre>function simulateMouseOver(obj) {
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('mouseover',true,true,document.defaultView,0,0,0,0,0,false,false,false,false,0,null);        
     obj.dispatchEvent(event);
}    </pre>
</div>
<div>
<pre>&lt;button id="btn1"&gt;按钮一&lt;/button&gt;
&lt;button id="btn2"&gt;按钮二&lt;/button&gt;
&lt;script&gt;
if(btn1.addEventListener){
    btn1.addEventListener('mouseover',function(){alert(1);})
}else{
    btn1.attachEvent('onmouseover',function(){alert(1);})
}
function simulateMouseOver(obj) {
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('mouseover',true,true,document.defaultView,0,0,0,0,0,false,false,false,false,0,null);    
     obj.dispatchEvent(event);
}
btn2.onmouseover = function(){
    simulateMouseOver(btn1);
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/eventImitate/e6.html" frameborder="0" width="320" height="240"></iframe>

【写法二】createEvent()方法使用Event参数

<div>
<pre>function simulateMouseOver(obj) {
    var event = document.createEvent('Event');
    event.initEvent('mouseover',true,true,document.defaultView,0,0,0,0,0,false,false,false,false,0,null);        
     obj.dispatchEvent(event);
}    </pre>
</div>
<div>
<pre>&lt;button id="btn1"&gt;按钮一&lt;/button&gt;
&lt;button id="btn2"&gt;按钮二&lt;/button&gt;
&lt;script&gt;
if(btn1.addEventListener){
    btn1.addEventListener('mouseover',function(){alert(1);})
}else{
    btn1.attachEvent('onmouseover',function(){alert(1);})
}
function simulateMouseOver(obj) {
    var event = document.createEvent('Event');
    event.initEvent('mouseover',true,true,document.defaultView,0,0,0,0,0,false,false,false,false,0,null);        
     obj.dispatchEvent(event);
}    
btn2.onmouseover = function(){
    simulateMouseOver(btn1);
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/eventImitate/e7.html" frameborder="0" width="320" height="240"></iframe>

**createEventObject()**

&emsp;&emsp;在IE10-浏览器中可以使用document.createEventObject()方法创建event对象。这个方法不接受参数，结果会返回一个通用的event对象

&emsp;&emsp;IE浏览器不支持初始化事件，需要手动为这个对象添加所有必要的信息

&emsp;&emsp;IE8-浏览器不支持dispatchEvent()事件。在IE8-浏览器中触发事件需要调用fireEvent()方法，这个方法接受两个参数：事件处理程序的名称和event对象。在调用fireEvent()方法时，会自动为event对象添加srcElement和type属性

<div>
<pre>function simulateMouseOver(obj) {
    var event = document.createEventObject();
    event.bubbles = true;
    event.cancelable = true;
     obj.fireEvent('onmouseover',event);
}    </pre>
</div>

**兼容**

&emsp;&emsp;下面使用document.createEvent()方法和createEventObject()来实现兼容　

<div>
<pre>function simulateMouseOver(obj) {
    var event;
    if(document.createEvent){
        event = document.createEvent('Event');
        event.initEvent('mouseover',true,true,document.defaultView,0,0,0,0,0,false,false,false,false,0,null);        
    }else{
        event = document.createEventObject();
        event.bubbles = true;
        event.cancelable = true;
         obj.fireEvent('onmouseover',event);
    }
}    </pre>
</div>
<div>
<pre>&lt;button id="btn1"&gt;按钮一&lt;/button&gt;
&lt;button id="btn2"&gt;按钮二&lt;/button&gt;
&lt;script&gt;
if(btn1.addEventListener){
    btn1.addEventListener('mouseover',function(){alert(1);})
}else{
    btn1.attachEvent('onmouseover',function(){alert(1);})
}
function simulateMouseOver(obj) {
    var event;
    if(document.createEvent){
        event = document.createEvent('Event');
        event.initEvent('mouseover',true,true,document.defaultView,0,0,0,0,0,false,false,false,false,0,null);        
         obj.dispatchEvent(event);    
    }else{
        event = document.createEventObject();
        event.bubbles = true;
        event.cancelable = true;
         obj.fireEvent('mouseover',event);
    }
}        
btn2.onmouseover = function(){
    simulateMouseOver(btn1);
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/eventImitate/e8.html" frameborder="0" width="320" height="240"></iframe>

### 自定义事件

&emsp;&emsp;自定义事件不是由DOM原生触发的，它的目的是让开发人员创建自己的事件

**Event()**

&emsp;&emsp;最简单的就是使用Event()构造函数

&emsp;&emsp;注意：IE和safari浏览器不支持

<div>
<pre>&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
function customEvent(obj){
    var event = new Event('changeColor');
    obj.addEventListener('changeColor',function(){
        this.style.backgroundColor = 'lightblue';
    })
    return event;
}
btn.onclick = function(){
    this.dispatchEvent(customEvent(this));    
}    
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/eventImitate/e9.html" frameborder="0" width="320" height="240"></iframe>

**CustomEvent()**

&emsp;&emsp;如果需要在触发事件的同时，传入指定的数据，需要使用CustomEvent构造函数生成自定义的事件对象　

<div>
<pre>&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
function customEvent(obj){
    var event = new CustomEvent('changeColor', { 'detail': 'hello' });
    obj.addEventListener('changeColor',function(e){
        e = e || event;
        this.style.backgroundColor = 'lightblue';
        this.innerHTML = e.detail;
    })
    return event;
}
btn.onclick = function(){
    this.dispatchEvent(customEvent(this));    
}    
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/eventImitate/e10.html" frameborder="0" width="320" height="240"></iframe>

**createEvent()**

&emsp;&emsp;要创建新的自定义事件，可以调用createEvent("CustomEvent")。返回的对象有一个名为initCustomEvent()的方法，接收如下4个参数

&emsp;&emsp;type(字符串)：触发的事件类型，例如"keydown"

&emsp;&emsp;bubbles(布尔值)：表示事件是否应该冒泡

&emsp;&emsp;cancelable(布尔值)：表示事件是否可以取消

&emsp;&emsp;detail(对象)：任意值，保存在event对象的detail属性中

&emsp;&emsp;注意：IE8-浏览器不支持

<div>
<pre>&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
function customEvent(obj){
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent('changeColor',true,true,'hello');
    obj.addEventListener('changeColor',function(e){
        e = e || event;
        this.style.backgroundColor = 'lightblue';
        this.innerHTML = e.detail;
    })
    return event;
}
btn.onclick = function(){
    this.dispatchEvent(customEvent(this));    
}    
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/eventImitate/e11.html" frameborder="0" width="320" height="240"></iframe>

## 最后

&emsp;&emsp;事件模拟是用来触发自定义的事件函数的，而不是来触发浏览器默认行为的

&emsp;&emsp;所以，试图通过事件模拟的形式来触发浏览器默认行为是不可行的。比如点击鼠标右键实现键盘backspace键的删除效果是不可行的

