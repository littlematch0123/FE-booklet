# nodeJS之process对象

&emsp;&emsp;process对象是一个全局对象，在任何地方都能访问到它，通过这个对象提供的属性和方法，使我们可以对当前运行的程序的进程进行访问和控制。本文将详细介绍process对象

&nbsp;

### 概述

&emsp;&emsp;process是一个全局对象，即global对象的属性，可以在任何地方直接访问到它而无需引入额外模块

<div>
<pre>console.log(process === global.process);//true</pre>
</div>
<div>
<pre>console.log(process);</pre>
</div>

![process1](https://pic.xiaohuochai.site/blog/nodejs_process1.png)


&nbsp;

### 属性

【process.argv】

&emsp;&emsp;包含命令行参数的数组。第一个元素会是'node'，第二个元素将是.js文件的名称，接下来的参数依次是命令行参数

<div>
<pre>console.log(process.argv);//[ 'D:\\nodejs\\node.exe', 'D:\\project\\main.js' ]</pre>
</div>

![process2](https://pic.xiaohuochai.site/blog/nodejs_process2.png)


【process.execArgv】

&emsp;&emsp;启动进程所需的 node 命令行参数。这些参数不会在 process.argv 里出现，并且不包含 node 执行文件的名字，或者任何在名字之后的参数。这些用来生成子进程，使之拥有和父进程有相同的参数

<div>
<pre>console.log(process.execArgv);</pre>
</div>

![process3](https://pic.xiaohuochai.site/blog/nodejs_process3.png)


【process.execPath】

&emsp;&emsp;开启当前进程的执行文件的绝对路径

<div>
<pre>console.log(process.execPath);//D:\nodejs\node.exe</pre>
</div>

【process.env】

&emsp;&emsp;获取当前系统环境信息的对象，常规可以用来进一步获取环境变量、用户名等系统信息

<div>
<pre>/*
{ PROCESSOR_ARCHITEW6432: 'AMD64',
  PROCESSOR_LEVEL: '6',
  COMMONPROGRAMW6432: 'C:\\Program Files\\Common Files',
  PROMPT: '$P$G',
  PSMODULEPATH: 'C:\\WINDOWS\\system32\\WindowsPowerShell\\v1.0\\Modules\\',
  APPDATA: 'C:\\Users\\Administrator\\AppData\\Roaming',
  COMPUTERNAME: 'BAI',
  COMSPEC: 'C:\\WINDOWS\\system32\\cmd.exe',
  FPS_BROWSER_APP_PROFILE_STRING: 'Internet Explorer',
  USERPROFILE: 'C:\\Users\\Administrator',
  HOMEDRIVE: 'C:',
  USERNAME: 'Administrator',
  FP_NO_HOST_CHECK: 'NO',
  WINDIR: 'C:\\WINDOWS',
  PROCESSOR_REVISION: '3c03',
  FPS_BROWSER_USER_PROFILE_STRING: 'Default',
  TMP: 'C:\\Users\\ADMINI~1\\AppData\\Local\\Temp',
  _DFX_INSTALL_UNSIGNED_DRIVER: '1',
  PUBLIC: 'C:\\Users\\Public',
  'COMMONPROGRAMFILES(X86)': 'C:\\Program Files (x86)\\Common Files',
  NUMBER_OF_PROCESSORS: '8',
  SYSTEMROOT: 'C:\\WINDOWS',
  TEMP: 'C:\\Users\\ADMINI~1\\AppData\\Local\\Temp',
  PROCESSOR_ARCHITECTURE: 'x86',
  LOCALAPPDATA: 'C:\\Users\\Administrator\\AppData\\Local',
  VISUALSVN_SERVER: 'D:\\soft\\svn1\\',
  COMMONPROGRAMFILES: 'C:\\Program Files (x86)\\Common Files',
  NODE_PATH: 'D:\\nodejs\\node_modules',
  ALLUSERSPROFILE: 'C:\\ProgramData',
  HOMEPATH: '\\Users\\Administrator',
  USERDOMAIN: 'BAI',
  WINDOWS_TRACING_LOGFILE: 'C:\\BVTBin\\Tests\\installpackage\\csilogfile.log',
  PROGRAMFILES: 'C:\\Program Files (x86)',
  VBOX_MSI_INSTALL_PATH: 'D:\\soft\\va\\',
  SYSTEMDRIVE: 'C:',
  PATH: 'C:\\WINDOWS\\system32;C:\\WINDOWS;C:\\WINDOWS\\System32\\Wbem;C:\\WINDOWS\\System32\\WindowsPowerShell\\v1.0\\;C:\\Program Files\\WIDCOMM\\Bluetooth Software\\;C:\\Program Files\\WIDCOMM\\Bluetooth Software\\syswow64;C:\\Program Files (x86)\\Microsoft SQL Server\\80\\Tools\\Binn\\;d:\\;D:\\nodejs;D:\\nodejs\\;D:\\Git\\cmd;D:\\soft\\svn1\\bin;D:\\soft\\svn2\\bin;C:\\Ruby23\\bin;D:\\soft\\Sublime Text 3\\less.js-windows-master;C:\\Users\\Administrator\\AppData\\Local\\Microsoft\\WindowsApps;D:\\wamp\\bin\\mysql\\mysql5.6.17\\bin;C:\\Users\\Administrator\\AppData\\Roaming\\npm',
  PROGRAMW6432: 'C:\\Program Files',
  PATHEXT: '.COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.MSC',
  WINDOWS_TRACING_FLAGS: '3',
  PROCESSOR_IDENTIFIER: 'Intel64 Family 6 Model 60 Stepping 3, GenuineIntel',
  USERDOMAIN_ROAMINGPROFILE: 'BAI',
  LOGONSERVER: '\\\\BAI',
  PROGRAMDATA: 'C:\\ProgramData',
  SESSIONNAME: 'Console',
  'PROGRAMFILES(X86)': 'C:\\Program Files (x86)',
  OS: 'Windows_NT' }
 */
console.log(process.env);</pre>
</div>
<div>
<pre>console.log(process.env.USERNAME);//Administrator</pre>
</div>

【process.version】

&emsp;&emsp;一个暴露编译时存储版本信息的内置变量NODE_VERSION的属性

<div>
<pre>console.log(process.version);//v6.9.2</pre>
</div>

【process.versions】

&emsp;&emsp;一个暴露存储node以及其依赖包版本信息的属性

<div>
<pre>/*
{ http_parser: '2.7.0',
  node: '6.9.2',
  v8: '5.1.281.88',
  uv: '1.9.1',
  zlib: '1.2.8',
  ares: '1.10.1-DEV',
  icu: '57.1',
  modules: '48',
  openssl: '1.0.2j' }
 */
console.log(process.versions);</pre>
</div>

【process.pid】

&emsp;&emsp;当前进程的 PID

<div>
<pre>setInterval(function(){
    console.log(process.pid);//11204
}, 5000);</pre>
</div>

![process4](https://pic.xiaohuochai.site/blog/nodejs_process4.png)


【process.arch】

&emsp;&emsp;返回当前CPU的架构('arm'、'ia32' 或者 'x64')

<div>
<pre>console.log(process.arch);//ia32</pre>
</div>

【process.platform】

&emsp;&emsp;运行程序所在的平台系统 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'

<div>
<pre>console.log(process.platform); //win32</pre>
</div>

&nbsp;

### 方法

【process.cwd】

&emsp;&emsp;&nbsp;返回当前进程的工作目录

<div>
<pre>console.log(process.cwd());//D:\project</pre>
</div>

【process.chdir(directory)】

&emsp;&emsp;改变当前工作进程的目录，如果操作失败抛出异常

<div>
<pre>console.log(process.cwd());//D:\project
try {
  process.chdir('./dist');
  console.log(process.cwd());//D:\project\dist
}
catch (err) {
  console.log('chdir: ' + err);
}</pre>
</div>

【process.memoryUsage()】

&emsp;&emsp;返回一个对象，它描述了Node进程的内存使用情况，其单位是bytes

<div>
<pre>console.log(process.memoryUsage()); //{ rss: 18894848, heapTotal: 7274496, heapUsed: 3263160 }</pre>
</div>

&nbsp;【process.uptime()】

&emsp;&emsp;返回 Node 程序已运行的秒数

<div>
<pre>console.log(process.uptime());//0.139
var arr = new Array(200000000);
var s = arr.join(',');
console.log(process.uptime());//0.212</pre>
</div>

【process.hrtime()】

&emsp;&emsp;返回当前的高分辨时间，形式为 [秒，纳秒] 的元组数组。它是相对于在过去的任意时间。该值与日期无关，因此不受时钟漂移的影响。主要用途是可以通过精确的时间间隔，来衡量程序的性能

<div>
<pre>var t1 = process.hrtime();
var arr = new Array(200000000),
    s = arr.join(',');
var t2 = process.hrtime();
//处理数组共花费了0秒，详细为64756416纳秒
console.log('处理数组共花费了%d秒，详细为%d纳秒', (t2[0] - t1[0]), (t2[1] - t1[1]));</pre>
</div>

【process.kill(pid, [signal])】

&emsp;&emsp;结束对应某pid的进程并发送一个信号（若没定义信号值则默认为'SIGTERM'）

<div>
<pre>console.log(process.pid);//19960
process.kill(process.pid, 'SIGTERM');
console.log(process.pid);//''</pre>
</div>

【process.abort()】

&emsp;&emsp;触发node的abort事件，退出当前进程

<div>
<pre>process.abort();
console.log('在输出这句话之前就退出了');</pre>
</div>

【process.exit([code])】

&emsp;&emsp;终止当前进程并返回给定的code。如果省略了code，退出时会默认返回成功的状态码('success' code) 也就是0

<div>
<pre>process.exit(); //[Finished in 0.2s]</pre>
</div>
<div>
<pre>process.exit(1); //[Finished in 0.2s with exit code 1]</pre>
</div>

&emsp;&emsp;更多的返回状态码可参考下方列表

<div>
<pre>1 未捕获的致命异常(Uncaught Fatal Exception) - There was an uncaught exception, and it was not handled by a domain or an uncaughtException event handler.
2 - 未使用(Unused) (reserved by Bash for builtin misuse)
3 解析错误(Internal JavaScript Parse Error) - The JavaScript source code internal in Node's bootstrapping process caused a parse error. This is extremely rare, and generally can only happen during development of Node itself.
4 评估失败(Internal JavaScript Evaluation Failure) - The JavaScript source code internal in Node's bootstrapping process failed to return a function value when evaluated. This is extremely rare, and generally can only happen during development of Node itself.
5 致命错误(Fatal Error) - There was a fatal unrecoverable error in V8. Typically a message will be printed to stderr with the prefix FATAL ERROR.
6 未正确的异常处理(Non-function Internal Exception Handler) - There was an uncaught exception, but the internal fatal exception handler function was somehow set to a non-function, and could not be called.
7 异常处理函数运行时失败(Internal Exception Handler Run-Time Failure) - There was an uncaught exception, and the internal fatal exception handler function itself threw an error while attempting to handle it. This can happen, for example, if a process.on('uncaughtException') or domain.on('error') handler throws an error.
8 - 未使用(Unused). In previous versions of Node, exit code 8 sometimes indicated an uncaught exception.
9 - 无效的参数(Invalid Argument) - Either an unknown option was specified, or an option requiring a value was provided without a value.
10 运行时失败(Internal JavaScript Run-Time Failure) - The JavaScript source code internal in Node's bootstrapping process threw an error when the bootstrapping function was called. This is extremely rare, and generally can only happen during development of Node itself.
12 无效的调试参数(Invalid Debug Argument) - The --debug and/or --debug-brk options were set, but an invalid port number was chosen.
&gt;128 信号退出(Signal Exits) - If Node receives a fatal signal such as SIGKILL or SIGHUP, then its exit code will be 128 plus the value of the signal code. This is a standard Unix practice, since exit codes are defined to be 7-bit integers, and signal exits set the high-order bit, and then contain the value of the signal code.</pre>
</div>

【process.exitCode】

&emsp;&emsp;可以自定义退出进程时node shell捕获到的状态码（必须是正常结束进程或者使用process.exit()指令退出）

&emsp;&emsp;注意：如果指明了 process.exit(code) 中退出的错误码 (code)，则会覆盖掉 process.exitCode 的设置

<div>
<pre>process.exitCode = 4;
process.exit();//[Finished in 0.2s with exit code 4]</pre>
</div>
<div>
<pre>process.exitCode = 4;
process.exit(2);//[Finished in 0.2s with exit code 2]</pre>
</div>

&nbsp;

### 输入输出流

【process.stdout】

&emsp;&emsp;一个指向标准输出流(stdout)的可写的流(Writable Stream)

<div>
<pre>/*
这是一行数据
这是第二行数据
 */
process.stdout.write('这是一行数据\n这是第二行数据');</pre>
</div>

【process.stderr】

&emsp;&emsp;一个指向标准错误流(stderr)的 可写的流(Writable Stream)

<div>
<pre>//输出一行标准错误流，效果跟stdout没差[Finished in 0.2s]
process.stderr.write('输出一行标准错误流，效果跟stdout没差');</pre>
</div>

【process.stdin】

&emsp;&emsp;一个指向标准输入流(stdin)的可读流(Readable Stream)。标准输入流默认是暂停(pause)的，所以必须要调用process.stdin.resume()来恢复(resume)接收

<div>
<pre>process.stdin.resume();
var a,b;
process.stdout.write('请输入a的值: ');
process.stdin.on('data',function(data){
    if(a == undefined){
        a = Number(data);
        process.stdout.write('请输入b的值: ');
    }else{    
        b = Number(data);
        process.stdout.write('结果是: ' + (a+b));
        process.exit();
    }

})</pre>
</div>

![process5](https://pic.xiaohuochai.site/blog/nodejs_process5.png)


&nbsp;

### 事件

【事件'exit'】

&emsp;&emsp;当进程将要退出时触发。这是一个在固定时间检查模块状态（如单元测试）的好时机。需要注意的是 'exit' 的回调结束后，主事件循环将不再运行，所以计时器也会失效

<div>
<pre>/*
1
退出前执行
 */
process.on('exit', function() {
    // 设置一个延迟执行
    setTimeout(function() {
        console.log('主事件循环已停止，所以不会执行');
    }, 0);
    console.log('退出前执行');
});
setTimeout(function() {
    console.log('1');
}, 500);</pre>
</div>

【事件'uncaughtException'】

&emsp;&emsp;捕获那些没有try catch的异常错误

<div>
<pre>//捕获到一个异常
process.on('uncaughtException', function() {
    console.log('捕获到一个异常');
});
var a = '123';
a.a(); //触发异常事件
console.log('这句话不会显示出来');</pre>
</div>

【事件'SIGINT'】

&emsp;&emsp;捕获当前进程接收到的信号（如按下了 ctrl + c）

<div>
<pre>process.on('SIGINT', function() {
    console.log('收到 SIGINT 信号。');
});
console.log('试着按下 ctrl + C');
setTimeout(function() {
    console.log('end');
}, 50000);</pre>
</div>

![process6](https://pic.xiaohuochai.site/blog/nodejs_process6.png)

<div>&nbsp;</div>

### nextTick

【process.nextTick(callback)】

&emsp;&emsp;该方法算是 process 对象最重要的一个属性方法了，表示在事件循环（EventLoop）的下一次循环中调用 callback 回调函数。这不是 setTimeout(fn, 0) 函数的一个简单别名，因为它的效率高多了。该函数能在任何 I/O 事前之前调用回调函数。如果想要在对象创建之后而I/O操作发生之前执行某些操作，那么这个函数就十分重要了

&emsp;&emsp;Node.js是单线程的，除了系统IO之外，在它的事件轮询过程中，同一时间只会处理一个事件。可以把事件轮询想象成一个大的队列，在每个时间点上，系统只会处理一个事件。即使电脑有多个CPU核心，也无法同时并行的处理多个事件。但也就是这种特性使得node.js适合处理I／O型的应用。在每个I／O型的应用中，只需要给每一个输入输出定义一个回调函数即可，他们会自动加入到事件轮询的处理队列里。当I／O操作完成后，这个回调函数会被触发。然后系统会继续处理其他的请求

&emsp;&emsp;在这种处理模式下，process.nextTick()的意思就是定义出一个动作，并且让这个动作在下一个事件轮询的时间点上执行

<div>
<pre>function foo() {
    console.error('foo');
}
process.nextTick(foo);
console.error('bar');
/*
bar
foo
*/</pre>
</div>

&emsp;&emsp;也可以使用setTimeout()函数来达到貌似同样的执行效果

<div>
<pre>setTimeout(foo, 0);
console.log('bar');</pre>
</div>

&emsp;&emsp;但在内部的处理机制上，process.nextTick()和setTimeout(fn, 0)是不同的，process.nextTick()不是一个单纯的延时，它有更多的特性。更精确的说，process.nextTick()定义的调用会创建一个新的子堆栈。在当前的栈里，可以执行任意多的操作。但一旦调用nextTick，函数就必须返回到父堆栈。然后事件轮询机制又重新等待处理新的事件，如果发现nextTick的调用，就会创建一个新的栈。

&emsp;&emsp;在下面的例子里有一个compute()，我们希望这个函数尽可能持续的执行，来进行一些运算密集的任务。但与此同时，我们还希望系统不要被这个函数堵塞住，还需要能响应处理别的事件。这个应用模式就像一个单线程的web服务server。在这里我们就可以使用process.nextTick()来交叉执行compute()和正常的事件响应

<div>
<pre>var http = require('http');
function compute() {
        // performs complicated calculations continuously
        process.nextTick(compute);
}
http.createServer(function(req, res) {
       res.writeHead(200, {'Content-Type': 'text/plain'});
       res.end('Hello World');
}).listen(5000, '127.0.0.1');
compute();</pre>
</div>

&emsp;&emsp;在这种模式下，我们不需要递归的调用compute()，只需要在事件循环中使用process.nextTick()定义compute()在下一个时间点执行即可。在这个过程中，如果有新的http请求进来，事件循环机制会先处理新的请求，然后再调用compute()。反之，如果把compute()放在一个递归调用里，那系统就会一直阻塞在compute()里，无法处理新的http请求了

&emsp;&emsp;当然，我们无法通过process.nextTick()来获得多CPU下并行执行的真正好处，这只是模拟同一个应用在CPU上分段执行而已

【总结】

&emsp;&emsp;Nodejs的特点是事件驱动，异步I/O产生的高并发，产生此特点的引擎是事件循环，事件被分门别类地归到对应的事件观察者上，比如idle观察者，定时器观察者，I/O观察者等等，事件循环每次循环称为Tick，每次Tick按照先后顺序从事件观察者中取出事件进行处理

&emsp;&emsp;调用setTimeout()或setInterval()时创建的计时器会被放入定时器观察者内部的红黑树中，每次Tick时，会从该红黑树中检查定时器是否超过定时时间，超过的话，就立即执行对应的回调函数。setTimeout()和setInterval()都是当定时器使用，他们的区别在于后者是重复触发，而且由于时间设的过短会造成前一次触发后的处理刚完成后一次就紧接着触发

&emsp;&emsp;由于定时器是超时触发，这会导致触发精确度降低，比如用setTimeout设定的超时时间是5秒，当事件循环在第4秒循到了一个任务，它的执行时间3秒的话，那么setTimeout的回调函数就会过期2秒执行，这就是造成精度降低的原因。并且由于采用红黑树和迭代的方式保存定时器和判断触发，较为浪费性能

&emsp;&emsp;使用process.nextTick()所设置的所有回调函数都会放置在数组中，会在下一次Tick时所有的都立即被执行，该操作较为轻量，时间精度高

&emsp;&emsp;setImmediate()设置的回调函数也是在下一次Tick时被调用，其和process.nextTick()的区别在于两点：

&emsp;&emsp;1、所属的观察者被执行的优先级不一样，process.nextTick()属于idle观察者，setImmediate()属于check观察者，idle的优先级&gt;check

&emsp;&emsp;2、setImmediate()设置的回调函数是放置在一个链表中，每次Tick只执行链表中的一个回调。这是为了保证每次Tick都能快速地被执行

