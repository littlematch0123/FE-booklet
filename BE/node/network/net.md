# net模块

　　TCP服务在网络应用中十分常见，目前大多数的应用都是基于TCP搭建而成的。net模块提供了一个异步网络包装器，用于TCP网络编程，它包含了创建服务器和客户端的方法。本文将详细介绍nodeJS中的net模块

&nbsp;

### IP测试

【net.isIP(input)】

　　测试是否输入的为 IP 地址。字符串无效时返回 0。 IPV4 情况下返回 4， IPV6情况下返回 6

<div class="cnblogs_code">
<pre>var net = require('net');
console.log(net.isIP('1.1.1.1'));//4
console.log(net.isIP('1.1'));//0
console.log(net.isIP('AD80::ABAA:0000:00C2:0002'));//6</pre>
</div>

【net.isIPv4(input)】

　　如果输入的地址为 IPV4， 返回 true，否则返回 false

<div class="cnblogs_code">
<pre>var net = require('net');
console.log(net.isIPv4('1.1.1.1'));//true
console.log(net.isIPv4('1.1'));//false</pre>
</div>

【net.isIPv6(input)】

　　如果输入的地址为 IPV6， 返回 true，否则返回 false

<div class="cnblogs_code">
<pre>var net = require('net');
console.log(net.isIPv6('1.1.1.1'));//true
console.log(net.isIPv6('AD80::ABAA:0000:00C2:0002'));//true</pre>
</div>

&nbsp;

### 服务器

【net.createServer([options][, connectionListener])】

　　创建一个 TCP 服务器，参数如下

<div class="cnblogs_code">
<pre>options
    allowHalfOpen: false(默认)，如果为true，当另一端socket发送FIN包时socket不会自动发送FIN包。socket变为不可读但可写(半关闭)
    pauseOnConnect: false(默认)，如果为true，当连接到来的时候相关联的socket将会暂停。它允许在初始进程不读取数据情况下，让连接在进程间传递。调用resume()从暂停的socket里读取数据
connectionListener 自动给 'connection' 事件创建监听器</pre>
</div>
<div class="cnblogs_code">
<pre>var server = net.createServer(function() {
});</pre>
</div>

【server.listen(port[, host][, backlog][, callback])】

　　开始接受指定端口port和主机host的连接。如果忽略主机host，服务器将会接受任何IPv4地址(INADDR_ANY)的直接连接。端口为0，则会分配一个随机端口

　　积压量(Backlog)为连接等待队列的最大长度。实际长度由操作系统通过sysctl设定，比如linux上的tcp_max_syn_backlog和somaxconn。这个参数默认值是511

　　当服务器被绑定时会触发'listening'事件。最后一个参数callback将会作为'listening'事件的监听器

　　有些用户会遇到EADDRINUSE错误，它表示另外一个服务器已经运行在所请求的端口上。处理这个情况的办法是等一段时间后再重试

<div class="cnblogs_code">
<pre>server.listen(6000);</pre>
</div>

【server.close([callback])】

　　服务器停止接收新的连接，保持现有连接。当所有连接结束的时候服务器会关闭，并会触发'close'事件。你可以传一个回调函数来监听'close'事件。如果存在，将会调用回调函数，错误(如果有)作为唯一参数

【server.address()】

　　操作系统返回绑定的地址、协议族名和服务器端口。查找哪个端口已经被系统绑定时，非常有用

　　[注意]在 'listening' 事件触发前，不要调用 server.address()

<div class="cnblogs_code">
<pre>server.listen(function() {
    //{ address: '::', family: 'IPv6', port: 53806 }
    console.log(server.address());
});</pre>
</div>

【server.maxConnections】

　　设置这个选项后，当服务器连接数超过数量时拒绝新连接

　　一旦已经用 child_process.fork() 方法将 socket 发送给子进程， 就不推荐使用这个选项

【server.getConnections(callback)】

　　异步获取服务器当前活跃连接的数量。当 socket 发送给子进程后才有效；

　　回调函数有 2 个参数 err 和 count

<div class="cnblogs_code">
<pre>server.getConnections(function(err,count){
    console.log(count);//0
})</pre>
</div>

【事件listening】

　　当服务器调用 server.listen 绑定后会触发

【事件connection】

<div class="cnblogs_code">
<pre>{Socket object} 连接对象</pre>
</div>

　　当新连接创建后会被触发。socket 是 net.Socket实例

【事件close】

　　服务器关闭时会触发

　　[注意]如果存在连接，这个事件不会被触发直到所有的连接关闭

【事件error】

　　发生错误时触发

&nbsp;

### 客户端

【net.connect(options[, connectionListener])】

【net.createConnection(options[, connectionListener])】

　　connect()的别名是createConnection()方法

　　该方法返回一个新的 'net.Socket'，并连接到指定的地址和端口。当 socket 建立的时候，将会触发 'connect' 事件。和'net.Socket'有相同的方法

　　对于 TCP sockets，参数options如下

<div class="cnblogs_code">
<pre>port: 客户端连接到 Port 的端口（必须）
host: 客户端要连接到得主机。默认 'localhost'
localAddress: 网络连接绑定的本地接口
localPort: 网络连接绑定的本地端口
family : IP 栈版本。默认 4</pre>
</div>

　　对于本地域socket，参数options如下

<div class="cnblogs_code">
<pre>path: 客户端连接到得路径(必须)</pre>
</div>
<div class="cnblogs_code">
<pre>var client = net.connect({port: 5000}, function() {});</pre>
</div>

&nbsp;

### Socket

【new net.Socket([options])】

　　构造一个新的 socket 对象

　　options 对象有以下默认值:

<div class="cnblogs_code">
<pre>{ fd: null
  allowHalfOpen: false,
  readable: false,
  writable: false
}</pre>
</div>

　　参数fd允许指定一个存在的文件描述符。将readable和(或)writable设为true，允许在这个socket上读或写(仅在参数fd有效时)

【socket.connect(port[, host][, connectListener])】

【socket.connect(path[, connectListener])】

　　使用传入的socket打开一个连接。如果指定了端口port和主机host，TCP socket将打开socket。如果忽略参数host，则默认为localhost。如果指定了path，socket将会被指定路径的unix socket 打开

　　参数 connectListener 将会作为监听器添加到 'connect' 事件

【socket.write(data[, encoding][, callback])】

　　在socket上发送数据。第二个参数指定了字符串的编码，默认是UTF8编码

　　如果所有数据成功刷新到内核缓冲区，返回true。如果数据全部或部分在用户内存里，返回false。当缓冲区为空的时候会触发'drain'

　　当数据最终被完整写入的的时候，可选的callback参数会被执行，但不一定会马上执行

【socket.end([data][, encoding])】

　　半关闭socket。例如，它发送一个FIN包。可能服务器仍在发送数据。

　　如果参数data不为空，等同于调用socket.write(data,encoding)后再调用socket.end()

【socket.destroy()】

　　确保没有 I/O 活动在这个套接字上。只有在错误发生情况下才需要

【socket.pause()】

　　暂停读取数据。就是说，不会再触发 data 事件。对于控制上传非常有用

【socket.resume()】

　　调用 pause() 后想恢复读取数据

【socket.setTimeout(timeout[, callback])】

　　socket 闲置时间超过 timeout 毫秒后 ，将 socket 设置为超时。触发空闲超时事件时，socket 将会收到 'timeout'事件，但是连接不会被断开。用户必须手动调用 end() 或 destroy() 这个socket。

　　如果 timeout = 0, 那么现有的闲置超时会被禁用。可选的 callback 参数将会被添加成为 'timeout' 事件的一次性监听器

【socket.setNoDelay([noDelay])】

　　禁用纳格（Nagle）算法。默认情况下 TCP 连接使用纳格算法，在发送前他们会缓冲数据。将 noDelay 设置为 true 将会在调用 socket.write() 时立即发送数据。noDelay 默认值为 true

【socket.setKeepAlive([enable][, initialDelay])】

　　禁用/启用长连接功能，在发送第一个在闲置socket上的长连接probe之前，可选地设定初始延时。默认false

　　设定initialDelay（毫秒），来设定收到的最后一个数据包和第一个长连接probe之间的延时。将 initialDelay 设为0，将会保留默认（或者之前）的值。默认值为0

【socket.address()】

　　操作系统返回绑定的地址，协议族名和服务器端口。返回的对象有 3 个属性，比如{ port: 12346, family: 'IPv4', address: '127.0.0.1' }

【socket.remoteAddress】

　　远程的 IP 地址字符串

【socket.remoteFamily】

　　远程IP协议族字符串

【socket.remotePort】

　　远程端口，数字表示

【socket.localAddress】

　　远程客户端正在连接的本地IP地址，字符串表示

【socket.localPort】

　　本地端口地址，数字表示

【socket.bytesRead】

　　接收的字节数

【socket.bytesWritten】

　　发送的字节数

【事件lookup】

　　在解析域名后，但在连接前，触发这个事件。对 UNIX sokcet 不适用

<div class="cnblogs_code">
<pre>err {Error | Null} 错误对象
address {String} IP 地址。
family {String | Null} 地址类型</pre>
</div>

【事件connect】

　　当成功建立 socket 连接时触发、

【事件data】

<div class="cnblogs_code">
<pre>{Buffer object}</pre>
</div>

　　当接收到数据时触发。参数 data 可以是 Buffer 或 String

　　当 Socket 触发一个 'data' 事件时，如果没有监听器，数据将会丢失

【事件end】

　　当 socket 另一端发送 FIN 包时，触发该事件

【事件timeout】

　　当 socket 空闲超时时触发，仅是表明 socket 已经空闲。用户必须手动关闭连接

【事件drain】

　　当写缓存为空得时候触发。可用来控制上传

【事件error】

　　错误发生时触发

【事件close】

<div class="cnblogs_code">
<pre>had_error {Boolean} 如果 socket 传输错误，为 true</pre>
</div>

　　当 socket 完全关闭时触发。参数 had_error 是 boolean，它表示是否因为传输错误导致 socket 关闭

&nbsp;

### 简易服务器

【服务器】

<div class="cnblogs_code">
<pre>//server.js
var net = require('net') ;
var server = net.createServer(function(socket) { 
    socket.write("Hi!\n");
    socket.on("data", function(data) {
      console.log(data.toString());
    });
    socket.on("end", function() {
      console.log('有客户机下线了！！！');
    });
    socket.on('error', function() {
      console.log('发生意外错误！！！');
    });
}) ;
server.listen(8080) ;</pre>
</div>

【客户机】

<div class="cnblogs_code">
<pre>//client.js
var net = require('net') ;
var client = net.connect({port: 8080},function(){
    client.name = '客户机1';
    client.write(client.name + ' 上线了！\n');
    client.end(client.name + ' 下线了！\n');
    client.on("data", function(data) {
        console.log(data.toString());
    });
});</pre>
</div>

![net1](https://pic.xiaohuochai.site/blog/nodejs_net1.png)

&nbsp;

### 简易聊天室

【服务器】

<div class="cnblogs_code">
<pre>//chatServer.js
var net = require('net');
var i = 0;
//保存客户机
var clientList = [];
var server = net.createServer(function(socket) {
    socket.name = '用户' + (++i);
    socket.write('【聊天室提示】欢迎' + socket.name + '\n');
    //更新客户机数组
    clientList.push(socket); 
    function showClients(){
        console.log('【当前在线用户】：');
        for(var i=0;i&lt;clientList.length;i++) { 
            console.log(clientList[i].name);
        }        
    }
    showClients();
    socket.on("data", function(data) {
        //把当前连接的客户机的信息转发到其他客户机  
        for(var i=0;i&lt;clientList.length;i++) { 
            if(socket !== clientList[i]) {      
                clientList[i].write('【' + socket.name + '】：' + data);   
            }  
        }
    });
    socket.on("close", function() {
        //当前客户机下线时，将其从客户机数组中移除
        clientList.splice(clientList.indexOf(socket), 1);
        showClients();
    });
    socket.on('error', function(err) {
        console.log(socket.name + '退出');
    });
});
server.listen(8080) ;</pre>
</div>

【客户机】

<div class="cnblogs_code">
<pre>//chatClient.js
var net = require('net');
process.stdin.resume();
process.stdin.setEncoding('utf8');
var client = net.connect({port: 8080},function(){
    console.log('【本机提示】登录到聊天室');
    process.stdin.on('data',function(data){
        client.write(data);
    })
    client.on("data", function(data) {
        console.log(data.toString());
    });
    client.on('end', function() {
        console.log('【本机提示】退出聊天室');
        process.exit();
    });
    client.on('error', function() {
        console.log('【本机提示】聊天室异常');
        process.exit();
    });
});</pre>
</div>

![net2](https://pic.xiaohuochai.site/blog/nodejs_net2.png)

