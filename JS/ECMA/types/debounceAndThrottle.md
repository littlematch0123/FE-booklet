# 深入理解javascript函数进阶系列第三篇——函数节流和函数防抖

&emsp;&emsp;javascript中的函数大多数情况下都是由用户主动调用触发的，除非是函数本身的实现不合理，否则一般不会遇到跟性能相关的问题。但在一些少数情况下，函数的触发不是由用户直接控制的。在这些场景下，函数有可能被非常频繁地调用，而造成大的性能问题。解决性能问题的处理办法就是函数节流和函数防抖。本文将详细介绍函数节流和函数防抖

&nbsp;

### 常见场景

&emsp;&emsp;下面是函数被频繁调用的常见的几个场景

&emsp;&emsp;1、mousemove事件。如果要实现一个拖拽功能，需要一路监听 mousemove 事件，在回调中获取元素当前位置，然后重置 dom 的位置来进行样式改变。如果不加以控制，每移动一定像素而触发的回调数量非常惊人，回调中又伴随着 DOM 操作，继而引发浏览器的重排与重绘，性能差的浏览器可能就会直接假死。

&emsp;&emsp;2、window.onresize事件。为window对象绑定了resize事件，当浏览器窗口大小被拖动而改变的时候，这个事件触发的频率非常之高。如果在window.onresize事件函数里有一些跟DOM节点相关的操作，而跟DOM节点相关的操作往往是非常消耗性能的，这时候浏览器可能就会吃不消而造成卡顿现象

&emsp;&emsp;3、射击游戏的 mousedown/keydown 事件（单位时间只能发射一颗子弹）

&emsp;&emsp;4、搜索联想（keyup事件）

&emsp;&emsp;5、监听滚动事件判断是否到页面底部自动加载更多（scroll事件）

&emsp;&emsp;对于这些情况的解决方案就是函数节流（throttle）或函数去抖（debounce），核心其实就是限制某一个方法的频繁触发

&nbsp;

### 定时器管理

&emsp;&emsp;在介绍函数防抖和函数节流之前，首先要介绍一下定时器管理

&emsp;&emsp;定时器管理有两种机制：

&emsp;&emsp;第一种是只要当前函数没有执行完成，任何新触发的函数都会被忽略，可以实现在持续触发事件的情况下，一段时间内只执行一次事件的效果，即函数节流

&emsp;&emsp;简易代码如下

```
function fn(method, context) {
  //忽略新函数
  if(method.tId){
    return false;
  }
  method.tId = setTimeout(function() {
    method.call(context);
  }, 1000);
}
```
&emsp;&emsp;第二种是只要有新触发的函数，就立即停止执行当前函数，转而执行新函数，可以实现在持续触发事件的情况下，一定在事件触发n秒后执行，如果n秒内又触发了这个事件，则以新的事件的时间为准，还是n秒后执行，即函数防抖，简易代码如下
```
function fn(method, context) {
 //停止当前函数
  clearTimeout(method.tId);
  method.tId = setTimeout(function() {
    method.call(context);
  }, 1000);
}
```
&nbsp;

### 函数防抖

&emsp;&emsp;函数防抖，字面上来说，是利用函数来防止抖动。在执行触发事件的情况下，元素的位置或尺寸属性快速地发生变化，造成页面回流，出现元素抖动的现象。通过函数防抖，使得元素的位置或尺寸属性延迟变化，从而减少页面回流

&emsp;&emsp;简单的防抖函数代码如下，该函数接受2个参数，第一个参数为需要被延迟执行的函数，第二个参数为延迟执行的时间

```
<style>
body {
  margin: 0;
}
.show{
  width: 260px;
  height: 100px;
  font-size: 20px;
  text-align: center;
  line-height: 100px;
  background: lightgreen;
}
</style>
<div class="show" id="show">0</div>
<script>
let count = 0
const oShow = document.getElementById('show')
const changeValue = () => { oShow.innerHTML = count ++ }
const debounce = (fn, wait=30) => {
  return () => {
    clearTimeout(fn.timer)
    fn.timer = setTimeout(fn, wait)
  }
}
oShow.addEventListener('mousemove', debounce(changeValue))
</script>
```
&emsp;&emsp;效果如下：

<iframe src="https://demo.xiaohuochai.site/scroll/s3.html" width="280" height="120"></iframe>

&emsp;&emsp;但是，changeValue()方法中的this指向window，下面来修正this指向

```
const debounce = (fn, wait=30) =>{
  return function() {
    clearTimeout(fn.timer)
    fn.timer = setTimeout(fn.bind(this), wait)
  }
}
```
&emsp;&emsp;还有一个问题，changeValue()方法中的e为undefined，下面来修正e的值
```
const debounce = (fn, wait=30) =>{
  return function() {
    clearTimeout(fn.timer)
    fn.timer = setTimeout(fn.bind(this, ...arguments), wait)
  }
}
```
&emsp;&emsp;或者，使用apply方法
```
const debounce = (fn, wait=30) =>{
  return function() {
    clearTimeout(fn.timer)
    fn.timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, wait)
  }
}
```


&nbsp;

### 函数节流

&emsp;&emsp;函数节流，即限制函数的执行频率，在持续触发事件的情况下，间断地执行函数；实现方法对应定时器管理的第一种策略，只要当前函数没有执行完成，任何新触发的函数都会被忽略

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

### 数组分块

&emsp;&emsp;在前面关于函数节流和函数防抖的讨论中，提供了限制函数被频繁调用的解决方案。下面将遇到另外一个问题，某些函数确实是用户主动调用的，但因为一些客观的原因，这些函数会严重地影响页面性能

&emsp;&emsp;一个例子是创建WebQQ的QQ好友列表。列表中通常会有成百上千个好友，如果一个好友用一个节点来表示，在页面中渲染这个列表的时候，可能要一次性往页面中创建成百上千个节点

&emsp;&emsp;在短时间内往页面中大量添加DOM节点显然也会让浏览器吃不消，看到的结果往往就是浏览器的卡顿甚至假死。代码如下：

<div>
<pre>var ary = [];
for ( var i = 1; i &lt;= 1000; i++ ){
  ary.push( i );    // 假设 ary 装载了 1000 个好友的数据
};
var renderFriendList = function( data ){
  for ( var i = 0, l = data.length; i &lt; l; i++ ){
    var div = document.createElement( 'div' );
    div.innerHTML = i;
    document.body.appendChild( div );
  }
};
renderFriendList( ary );</pre>
</div>

&emsp;&emsp;这个问题的解决方案之一是数组分块技术，下面的timeChunk函数让创建节点的工作分批进行，比如把1秒钟创建1000个节点，改为每隔200毫秒创建8个节点

&emsp;&emsp;数组分块是一种使用定时器分割循环的技术，为要处理的项目创建一个队列，然后使用定时器取出下一个要处理的项目进行处理，接着再设置另一个定时器

&emsp;&emsp;在数组分块模式中，array变量本质上就是一个&ldquo;待办事宜&rdquo;列表，它包含了要处理的项目。使用shift()方法可以获取队列中下一个要处理的项目，然后将其传递给某个函数。如果在队列中还有其他项目，则设置另一个定时器，并通过arguments.callee调用同一个匿名函数

&emsp;&emsp;数组分块的重要性在于它可以将多个项目的处理在执行队列上分开，在每个项目处理之后，给予其他的浏览器处理机会运行，这样就可能避免长时间运行脚本的错误。一旦某个函数需要花50ms以上的时间完成，那么最好看看能否将任务分割为一系列可以使用定时器的小任务

&emsp;&emsp;下面是数组分块模式的简易代码

<div>
<pre>function chunk(array,process,context){
    setTimeout(function(){
        //取出下一个条目并处理
        var item = array.shift();
        process.call(context,item);
        //若还有条目，再设置另一个定时器
        if(array.length &gt; 0){
            setTimeout(arguments.callee,100);
        }
    },100);    
}</pre>
</div>
<div>
<pre>var data = [1,2,3,4,5,6,7,8,9,0];
function printValue(item){
    var div = document.getElementById('myDiv');
    div.innerHTML += item + '&lt;br&gt;';
}
chunk(data.concat(),printValue);</pre>
</div>

&emsp;&emsp;下面是数组分块的详细代码，timeChunk函数接受3个参数，第1个参数是创建节点时需要用到的数据，第2个参数是封装了创建节点逻辑的函数，第3个参数表示每一批创建的节点数量

<div>
<pre>var timeChunk = function( ary, fn, count ){ 
  var obj,t;
  var len = ary.length;
  var start = function(){
    for ( var i = 0; i &lt; Math.min( count || 1, ary.length ); i++ ){ 
      var obj = ary.shift();
      fn( obj );
    }
  };
  return function(){
    t = setInterval(function(){
      if ( ary.length === 0 ){ // 如果全部节点都已经被创建好
        return clearInterval( t );
      }
      start();
    }, 200 );    // 分批执行的时间间隔，也可以用参数的形式传入
  };
};</pre>
</div>

&emsp;&emsp;最后进行一些小测试，假设有1000个好友的数据，利用timeChunk函数，每一批只往页面中创建8个节点

<div>
<pre>var ary = [];
for ( var i = 1; i &lt;= 1000; i++ ){ 
  ary.push( i );
};
var renderFriendList = timeChunk( ary, function( n ){ 
  var div = document.createElement( 'div' ); 
  div.innerHTML = n;
  document.body.appendChild( div );
}, 8 );
renderFriendList();</pre>
</div>

