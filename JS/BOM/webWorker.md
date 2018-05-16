# Web Worker

&emsp;&emsp;客户端javascript其中一个基本的特性就是单线程：比如，浏览器无法同时运行两个事件处理程序，它也无法在一个事件处理程序运行的时候触发一个计时器。Web Worker是HTML5提供的一个javascript多线程解决方案，可以将一些大计算量的代码交由web Worker运行从而避免阻塞用户界面，在执行复杂计算和数据处理时，这个API非常有用。本文将详细介绍Web Worker



&nbsp;

### 前提

&emsp;&emsp;在使用Worker之前，首先要检测浏览器是否支持这个API

&emsp;&emsp;注意:IE9 - 浏览器不支持
```
if (window.Worker) {
  // to do 
}
```
&emsp;&emsp;使用Web Worker有以下几点限制：

&emsp;&emsp;同域限制。子线程加载的脚本文件，必须与主线程的脚本文件在同一个域

&emsp;&emsp;DOM限制。子线程所在的全局对象，与主进程不一样，它无法读取网页的DOM对象，即document、window、parent这些对象，子线程都无法得到。(但是，navigator对象和location对象可以获得。)

&emsp;&emsp;脚本限制。子线程无法读取网页的全局变量和函数，也不能执行alert和confirm方法，不过可以执行setInterval和setTimeout，以及使用XMLHttpRequest对象发出AJAX请求

&emsp;&emsp;文件限制。子线程无法读取本地文件，即子线程无法打开本机的文件系统(file://)，它所加载的脚本，必须来自网络



&nbsp;

### 主线程

【新建】

&emsp;&emsp;主线程采用new命令，调用Worker构造函数，可以新建一个子线程
```
var worker = new Worker('work.js');
```
&emsp;&emsp;Worker构造函数的参数是一个脚本文件，这个文件就是子线程所要完成的任务，上面代码中是work.js

&emsp;&emsp;这行代码会导致浏览器下载work.js，但只有Worker接收到消息才会实际执行文件中的代码

&emsp;&emsp;由于子线程不能读取本地文件系统，所以这个脚本文件必须来自网络端。如果下载没有成功，比如出现404错误，这个子线程就会默默地失败

【传递消息】

&emsp;&emsp;要给Worker传递消息，可以使用postMessage()方法。postMessage()方法的参数，就是主线程传给子线程的信号。它可以是一个字符串，也可以是一个对象

&emsp;&emsp;一般来说，可以序列化为JSON结构的任何值都可以作为参数传递给postMessage() 。换句话说，这就意味着传入的值是被复制到Worker中，而非直接传过去的
```
worker.postMessage("Hello World");
worker.postMessage({ method: 'echo', args: ['Work'] });
```
&emsp;&emsp;只要符合父线程的同源政策，Worker线程自己也能新建Worker线程。Worker线程可以使用XMLHttpRequest进行网络I / O，但是XMLHttpRequest对象的responseXML和channel属性总是返回null

【事件监听】

&emsp;&emsp;主线程使用onmessage事件来监听子线程发来的信息。来自子线程Worker的数据保存在event.data中。Worker返回的数据也可以是任何能够被序列化的值
```
worker.addEventListener('message', function (e) {
  //对数据进行处理
  console.log(e.data);
}, false);
```
【错误处理】

&emsp;&emsp;如果子线程发生错误，会触发主线程的error事件。error事件的事件对象中包含三个属性：filename、lineno和message，分别表示发生错误的文件名、代码行号和完整的错误消息
```
worker.onerror = function (event) {
  console.log("ERROR:" + event.filename + "(" + event.lineno + "):" + event.message);
};
```
&emsp;&emsp;建议在使用Web Worker时，始终都要使用onerror事件处理程序，即使这个函数除了把错误记录到日志中什么也不做都可以。否则，Worker就会在发生错误时，悄无声息地失败了

【停止子线程】

&emsp;&emsp;任何时候，只要调用terminate()方法就可以停止Worker的工作。而且，Worker中的代码会立即停止执行，后续的所有过程都不会再发生(包括error和message事件也不会再触发)
```
worker.terminate();//立即停止 Worker 的工作
```

&nbsp;

### 子线程

【作用域】

&emsp;&emsp;关于子线程Web Worker，最重要的是要知道它所执行的javascript代码完全在另一个作用域中，与当前网页中的代码不共享作用域。在Web Worker中，同样有一个全局对象和其他对象以及方法

&emsp;&emsp;Web Worker中的全局对象是worker对象本身。也就是说，在这个特殊的全局作用域中，this和self引用的都是worker对象。为便于处理数据，Web Worker本身也是一个最小化的运行环境，包括以下：

&emsp;&emsp;1、最小化的navigator对象，包括onLine、appName、appVersion、userAgent和platform属性

&emsp;&emsp;2、只读的location对象

&emsp;&emsp;3、setTimeout() 、setInterval() 、clearTimeout()和clearInterval()方法

&emsp;&emsp;4、XMLHttpReguest构造函数

&emsp;&emsp;显然，Web Worker的运行环境与页面环境相比，功能是相当有限的

【事件监听】

&emsp;&emsp;当主线程在worker对象上调用postMessage()时，数据会以异步方式被传递给子线程worker，进而触发子线程worker中的message事件。为了处理来自页面的数据，同样也需要创建一个onmessage事件处理程序

&emsp;&emsp;self代表子线程自身，self.addEventListener表示对子线程的message事件指定回调函数(直接指定onmessage属性的值也可) 。回调函数的参数是一个事件对象，它的data属性包含主线程发来的信号
```
/* File: work.js */
self.addEventListener('message', function (e) {
  var data = event.data;
  //处理数据
}, false);
```
【传递消息】

&emsp;&emsp;子线程使用postMessage()方法向主线程传递信息

```
/* File: work.js */
self.onmessage = function (e) {
  var data = e.data;
  //处理数据
  var method = data.method;
  var args = data.args;
  var reply = doSomething(args);
  self.postMessage({ method: method, reply: reply });
};
```
【包含脚本】

&emsp;&emsp;无法在子线程Worker中动态创建新的 < script > 元素，但可以调用importScripts()方法来向Worker中添加其他脚本。这个方法接收一个或多个指向javascript文件的URL。每个加载过程都是异步进行的，因此所有脚本加载并执行之后，importScripts()才会执行
```
/* File: work.js */
importScripts("file1.js", "file2.js");
```
&emsp;&emsp;即使file2.js先于file1.js下载完，执行的时候仍然会按照先后顺序执行。而且，这些脚本是在子线程Worker的全局作用域中执行，如果脚本中包含与页面有关的javascript代码，那么脚本可能无法正确运行。请记住，Worker中的脚本一般都具有特殊的用途，不会像页面中的脚本那么功能宽泛

【停止子线程】

&emsp;&emsp;在子线程Worker中，调用close()方法也可以停止工作。就像在主线程中调用terminate()方法一样，子线程Worker停止工作后就不会再有事件发生了
```
/* File: work.js */
self.close();
```

&nbsp;

### 同页面

&emsp;&emsp;通常情况下，子线程载入的是一个单独的javascript文件，但是也可以载入与主线程在同一个网页的代码

&emsp;&emsp;假设网页代码如下：

```
  <!DOCTYPE html>
    <body>
      <script id="worker" type="app/worker">
        &emsp;&emsp;addEventListener('message', function() {
          &emsp;&emsp;&emsp;&emsp;postMessage('Im reading Tech.pro');
        &emsp;&emsp;}, false);
</script>
    </body>
</html>
```
&emsp;&emsp;我们可以读取页面中的script，用worker来处理
```
var blob = new Blob([document.querySelector('#worker').textContent]);
```
&emsp;&emsp;这里需要把代码当作二进制对象读取，所以使用Blob接口。然后，这个二进制对象转为URL，再通过这个URL创建worker
```
var url = window.URL.createObjectURL(blob);
var worker = new Worker(url);
```
&emsp;&emsp;部署事件监听代码
```
worker.addEventListener('message', function (e) {
  console.log(e.data);
}, false);
```
&emsp;&emsp;最后，启动worker
```
worker.postMessage('');
```
&emsp;&emsp;整个页面的代码如下：

```
  <!DOCTYPE html>
    <body>
      <script id="worker" type="app/worker">
          addEventListener('message', function() {
              postMessage('Work done!');
          }, false);
</script>
      <script>
        (function() {
    var blob = new Blob([document.querySelector('#worker').textContent]);
        var url = window.URL.createObjectURL(blob);
        var worker = new Worker(url);
    worker.addEventListener('message', function(e) {
            console.log(e.data);
          }, false);
      
        worker.postMessage('');
      })();
</script>
    </body>
</html>
```
&emsp;&emsp;可以看到，主线程和子线程的代码都在同一个网页上面



&nbsp;

### 应用

&emsp;&emsp;上面的段落介绍了如何使用Web Worker，那么它到底有什么用，可以帮我们解决那些实现问题呢？

&emsp;&emsp;Web Worker的一个优势在于能够执行处理器密集型的运算而不会阻塞UI线程，下面来看一个斐波那契(fibonacci)数列的例子

&emsp;&emsp;在数学上，fibonacci数列被以递归的方法定义：
```
F0 = 0，F1 = 1，Fn = F(n - 1) + F(n - 2)(n >= 2，n∈N *)
```
&emsp;&emsp;javascript的常用实现为：
```
var fibonacci = function (n) {
  return n < 2 ? n : arguments.callee(n - 1) + arguments.callee(n - 2);
};
```
&emsp;&emsp;在chrome中用该方法进行40的fibonacci数列执行时间为13084.775毫秒，由于javascript是单线程执行的，在求数列的过程中浏览器不能执行其它javascript脚本，UI渲染线程也会被挂起，从而导致浏览器进入僵死状态

```
<script>
var fibonacci = function (n) {
  return n < 2 ? n : arguments.callee(n - 1) + arguments.callee(n - 2);
};
var t0 = window.performance.now();
fibonacci(40);
var t1 = window.performance.now();
//fibonacci函数执行了13084.775毫秒
console.log("fibonacci函数执行了" + (t1 - t0) + "毫秒")
</script>
```
&emsp;&emsp;使用web worker将数列的计算过程放入一个新线程里去执行将避免这种情况的出现

```
  <!DOCTYPE HTML>
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>web worker fibonacci</title>
      </head>
      <body>
        <script>
          if(window.Worker){
    var worker = new Worker('fibonacci.js');
    worker.onmessage = function(e){    
        var t1 = window.performance.now();
          //fibonacci函数执行了11741.900000000001毫秒
          console.log("fibonacci函数执行了" + (t1 - t0) + "毫秒")
      }
    worker.onerror = function(e){
            console.log("ERROR:" + e.filename + "(" + e.lineno + "):" + e.message);
          };
          worker.postMessage(40);
          var t0 = window.performance.now();
      }
</script>
      </body>
    </html>
```
```
//fibonacci.js
var fibonacci = function (n) {
  return n < 2 ? n : arguments.callee(n - 1) + arguments.callee(n - 2);
};
self.onmessage = function (e) {
  self.postMessage(fibonacci(e.data));
};
```
&emsp;&emsp;虽然fibonacci数列的计算时间并没有缩短多少，但由于其完全在自己独立的线程中计算，只是在计算完成之后将结果发回主线程。所以并不会影响到主线程的代码执行

&emsp;&emsp;因此，利用web worker我们可以在前端执行一些复杂的大量运算而不会影响页面的展示