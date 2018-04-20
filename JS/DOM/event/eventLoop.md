# 深入理解javascript中的事件循环event-loop 

&emsp;&emsp;本文将详细介绍javascript中的事件循环event-loop

 

&nbsp;

### 线程

&emsp;&emsp;javascript是单线程的语言，也就是说，同一个时间只能做一件事。而这个单线程的特性，与它的用途有关，作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定JavaScript同时有两个线程，一个线程在某个DOM节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？

&emsp;&emsp;为了利用多核CPU的计算能力，HTML5提出Web Worker标准，允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。所以，这个新标准并没有改变JavaScript单线程的本质

【排队】

&emsp;&emsp;单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着
```
var i, t = Date.now()
for (i = 0; i < 100000000; i++) {}
console.log(Date.now() - t) // 238
```
&emsp;&emsp;像上面这样，如果排队是因为计算量大，CPU忙不过来，倒也算了

&emsp;&emsp;但是，如果是网络请求就不合适。因为一个网络请求的资源什么时候返回是不可预知的，这种情况再排队等待就不明智了

 

&nbsp;

### 同步和异步

&emsp;&emsp;于是，任务为分为同步任务和异步任务

【同步】

&emsp;&emsp;如果在函数返回的时候，调用者就能够得到预期结果(即拿到了预期的返回值或者看到了预期的效果)，那么这个函数就是同步的
```
Math.sqrt(2);
console.log('Hi');
```
&emsp;&emsp;第一个函数返回时，就拿到了预期的返回值：2的平方根；第二个函数返回时，就看到了预期的效果：在控制台打印了一个字符串

&emsp;&emsp;所以这两个函数都是同步的

【异步】

&emsp;&emsp;如果在函数返回的时候，调用者还不能够得到预期结果，而是需要在将来通过一定的手段得到，那么这个函数就是异步的
```
fs.readFile('foo.txt', 'utf8', function(err, data) {
    console.log(data);
});
```
&emsp;&emsp;在上面的代码中，我们希望通过fs.readFile函数读取文件foo.txt中的内容，并打印出来。但是在fs.readFile函数返回时，我们期望的结果并不会发生，而是要等到文件全部读取完成之后。如果文件很大的话可能要很长时间

&emsp;&emsp;所以，fs.readFile函数是异步的

&emsp;&emsp;正是由于JavaScript是单线程的，而异步容易实现非阻塞，所以在JavaScript中对于耗时的操作或者时间不确定的操作，使用异步就成了必然的选择

 

&nbsp;

### 异步详解

&emsp;&emsp;从上文可以看出，异步函数实际上很快就调用完成了。但是后面还有执行异步操作、通知主线程、主线程调用回调函数等很多步骤。我们把整个过程叫做异步过程。异步函数的调用在整个异步过程中，只是一小部分

&emsp;&emsp;一个异步过程通常是这样的：主线程发起一个异步请求，异步任务接收请求并告知主线程已收到(异步函数返回)；主线程可以继续执行后面的代码，同时异步操作开始执行；执行完成后通知主线程；主线程收到通知后，执行一定的动作(调用回调函数)

&emsp;&emsp;因此，一个异步过程包括两个要素：注册函数和回调函数，其中注册函数用来发起异步过程，回调函数用来处理结果

&emsp;&emsp;下面的代码中，其中的setTimeout就是异步过程的发起函数，fn是回调函数
```
setTimeout(fn, 1000);
```
&emsp;&emsp;有一个很重要的问题，如何才算是异步操作执行完成呢？对于不同类型的异步任务，操作完成的标准不同

【异步类型】

&emsp;&emsp;一般而言，异步任务有以下三种类型

&emsp;&emsp;1、普通事件，如click、resize等

&emsp;&emsp;2、资源加载，如load、error等

&emsp;&emsp;3、定时器，包括setInterval、setTimeout等

&emsp;&emsp;下面对这三种类型分别举例说明，下面代码中，鼠标点击div时，就代表任务执行完成了
```
div.onclick = () => {
  console.log('click')
}
```
&emsp;&emsp;下面代码中，XHR对象的readyState值为4，即已经接收到全部响应数据了，代表任务执行完成

```
xhr.onreadystatechange = function(){
  if(xhr.readyState == 4){
      if(xhr.status == 200){
          //实际操作
          result.innerHTML += xhr.responseText;
      }
  }
}
```
&emsp;&emsp;下面代码中，过1s后，代表任务执行完成
```
setTimeout(() => {
  console.log('timeout')
},1000)
```
&emsp;&emsp;对于同步任务来说，按顺序执行即可；但是，对于异步任务，各任务执行的时间长短不同，执行完成的时间点也不同，主线程如何调控异步任务呢？这就用到了消息队列

【消息队列】

&emsp;&emsp;有些文章把消息队列称为任务队列，或者叫事件队列，总之是和异步任务相关的队列

&emsp;&emsp;可以确定的是，它是队列这种先入先出的数据结构，和排队是类似的，哪个异步操作完成的早，就排在前面。不论异步操作何时开始执行，只要异步操作执行完成，就可以到消息队列中排队

&emsp;&emsp;这样，主线程在空闲的时候，就可以从消息队列中获取消息并执行

&emsp;&emsp;消息队列中放的消息具体是什么东西？消息的具体结构当然跟具体的实现有关。但是为了简单起见，可以认为：消息就是注册异步任务时添加的回调函数。

 

&nbsp;

### 可视化描述

&emsp;&emsp;人们把javascript调控同步和异步任务的机制称为事件循环，首先来看事件循环机制的可视化描述

![dataStructure](https://pic.xiaohuochai.site/blog/dataStructure.svg)

【栈】

&emsp;&emsp;函数调用形成了一个栈帧

```
function foo(b) {
  var a = 10;
  return a + b + 11;
}
function bar(x) {
  var y = 3;
  return foo(x * y);
}
console.log(bar(7));
```
&emsp;&emsp;当调用bar时，创建了第一个帧 ，帧中包含了bar的参数和局部变量。当bar调用foo时，第二个帧就被创建，并被压到第一个帧之上，帧中包含了foo的参数和局部变量。当foo返回时，最上层的帧就被弹出栈（剩下bar函数的调用帧 ）。当bar返回的时候，栈就空了

【堆】

&emsp;&emsp;对象被分配在一个堆中，即用以表示一个大部分非结构化的内存区域

【队列】

&emsp;&emsp;一个 JavaScript 运行时包含了一个待处理的消息队列。每一个消息都与一个函数相关联。当栈拥有足够内存时，从队列中取出一个消息进行处理。这个处理过程包含了调用与这个消息相关联的函数（以及因而创建了一个初始堆栈帧）。当栈再次为空的时候，也就意味着消息处理结束

 

&nbsp;

### 事件循环

&emsp;&emsp;下面来详细介绍事件循环。下图中，主线程运行的时候，产生堆和栈，栈中的代码调用各种外部API，异步操作执行完成后，就在消息队列中排队。只要栈中的代码执行完毕，主线程就会去读取消息队列，依次执行那些异步任务所对应的回调函数

![eventloop](https://pic.xiaohuochai.site/blog/JS_eventloop2.png)

&emsp;&emsp;详细步骤如下：

&emsp;&emsp;1、所有同步任务都在主线程上执行，形成一个执行栈

&emsp;&emsp;2、主线程之外，还存在一个"消息队列"。只要异步操作执行完成，就到消息队列中排队

&emsp;&emsp;3、一旦执行栈中的所有同步任务执行完毕，系统就会按次序读取消息队列中的异步任务，于是被读取的异步任务结束等待状态，进入执行栈，开始执行

&emsp;&emsp;4、主线程不断重复上面的第三步

【循环】

&emsp;&emsp;从代码执行顺序的角度来看，程序最开始是按代码顺序执行代码的，遇到同步任务，立刻执行；遇到异步任务，则只是调用异步函数发起异步请求。此时，异步任务开始执行异步操作，执行完成后到消息队列中排队。程序按照代码顺序执行完毕后，查询消息队列中是否有等待的消息。如果有，则按照次序从消息队列中把消息放到执行栈中执行。执行完毕后，再从消息队列中获取消息，再执行，不断重复。

&emsp;&emsp;由于主线程不断的重复获得消息、执行消息、再取消息、再执行。所以，这种机制被称为事件循环

&emsp;&emsp;用代码表示大概是这样：
```
while (queue.waitForMessage()) {
  queue.processNextMessage();
}
```

&emsp;&emsp;如果当前没有任何消息queue.waitForMessage 会等待同步消息到达

【事件】

&emsp;&emsp;为什么叫事件循环？而不叫任务循环或消息循环。究其原因是消息队列中的每条消息实际上都对应着一个事件

&emsp;&emsp;DOM操作对应的是DOM事件，资源加载操作对应的是加载事件，而定时器操作可以看做对应一个“时间到了”的事件

 

&nbsp;

### 实例

&emsp;&emsp;下面以一个实例来解释事件循环机制
```
console.log(1)
div.onclick = () => {console.log('click')}
console.log(2)
setTimeout(() => {console.log('timeout')},1000)
```
&emsp;&emsp;1、执行第一行代码，第一行是一个同步任务，控制台显示1

&emsp;&emsp;2、执行第二行代码，第二行是一个异步任务，发起异步请求，可以在任意时刻执行鼠标点击的异步操作

&emsp;&emsp;3、执行第三行代码，第三行是一个同步任务，控制台显示2

&emsp;&emsp;4、执行第四行代码，第四行是一个异步任务，发起异步请求，1s后执行定时器任务

&emsp;&emsp;5、假设从执行第四行代码的1s内，执行了鼠标点击，则鼠标任务在消息队列中排到首位

&emsp;&emsp;6、从执行第四行代码1s后，定时器任务到消息队列中排到第二位

&emsp;&emsp;7、现在同步任务已经执行完毕，则从消息队列中按照次序把异步任务放到执行栈中执行

&emsp;&emsp;8、则控制台依次显示'click‘、'timeout'

&emsp;&emsp;9、过了一段时间后，又执行了一次鼠标点击，由于消息队列中已经空了，则鼠标任务在消息队列中排到首位

&emsp;&emsp;10、同步任务执行完毕后，再从消息队列中按照次序把异步任务放到执行栈中执行

&emsp;&emsp;11、 则控制台显示'click'

【异步过程】

&emsp;&emsp;下面以一个实例来解释一次完整的异步过程
```
div.onclick = function fn(){console.log('click')}
```
&emsp;&emsp;1、主线程通过调用异步函数div.onclick发起异步请求

&emsp;&emsp;2、在某一时刻，执行异步操作，即鼠标点击

&emsp;&emsp;3、接着，回调函数fn到消息队列中排队

&emsp;&emsp;4、主线程从消息队列中读取fn到执行栈中

&emsp;&emsp;5、然后在执行栈中执行fn里面的代码console.log('click')

&emsp;&emsp;6、于是，控制台显示'click'

 

&nbsp;

### 同步变异步

&emsp;&emsp;每一个消息完整的执行后，其它消息才会被执行。这点提供了一些优秀的特性，包括每当一个函数运行时，它就不能被抢占，并且在其他代码运行之前完全运行

&emsp;&emsp;这个模型的一个缺点在于当一个消息需要太长时间才能完成，Web应用无法处理用户的交互，例如点击或滚动

&emsp;&emsp;于是，对于这种情况的常见优化是同步变异步

&emsp;&emsp;一个例子是创建WebQQ的QQ好友列表。列表中通常会有成百上千个好友，如果一个好友用一个节点来表示，在页面中渲染这个列表的时候，可能要一次性往页面中创建成百上千个节点

&emsp;&emsp;在短时间内往页面中大量添加DOM节点显然也会让浏览器吃不消，看到的结果往往就是浏览器的卡顿甚至假死。代码如下：

```
var ary = [];
for ( var i = 1; i <= 1000; i++ ){
  ary.push( i );    // 假设 ary 装载了 1000 个好友的数据
};
var renderFriendList = function( data ){
  for ( var i = 0, l = data.length; i < l; i++ ){
    var div = document.createElement( 'div' );
    div.innerHTML = i;
    document.body.appendChild( div );
  }
};
renderFriendList( ary );
```
&emsp;&emsp;这个问题的解决方案之一是数组分块技术，下面的timeChunk函数让创建节点的工作分批进行，比如把1秒钟创建1000个节点，改为每隔200毫秒创建8个节点

```
function chunk(array,process,context){
    setTimeout(function(){
        //取出下一个条目并处理
        var item = array.shift();
        process.call(context,item);
        //若还有条目，再设置另一个定时器
        if(array.length > 0){
            setTimeout(arguments.callee,100);
        }
    },100);    
}
```
```
var data = [1,2,3,4,5,6,7,8,9,0];
function printValue(item){
    var div = document.getElementById('myDiv');
    div.innerHTML += item + '<br>';
}
chunk(data.concat(),printValue);
```
&emsp;&emsp;数组分块的重要性在于它可以将多个项目的处理在消息队列上分开，在每个项目处理之后，给予其他的异步任务的执行机会，这样就可能避免长时间运行脚本的错误。一旦某个函数需要花50ms以上的时间完成，那么最好看看能否将任务分割为一系列可以使用定时器的小任务