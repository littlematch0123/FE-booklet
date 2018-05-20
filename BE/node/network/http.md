# nodeJS之Http模块

&emsp;&emsp;[H](http://www.cnblogs.com/xiaohuochai/p/6392010.html)[TTP](http://www.cnblogs.com/xiaohuochai/p/6392010.html)不是基于特定语言的，是一个通用的应用层协议，不同语言有不同的实现细节，但是万变不离其宗，思想是相同的。NodeJS作为一个宿主运行环境，以[JavaScript](http://www.cnblogs.com/xiaohuochai/p/5613593.html)为宿主语言，它也有自己实现的一套标准，本文将详细介绍nodeJS中的Http模块

&nbsp;

### Agent

【new Agent([options])】

<div>
<pre>options &lt;Object&gt; 代理的配置选项。有以下字段：
    keepAlive &lt;boolean&gt; 保持 socket 可用即使没有请求，以便它们可被将来的请求使用而无需重新建立一个 TCP 连接。默认为 false。
    keepAliveMsecs &lt;number&gt; 当使用了 keepAlive 选项时，该选项指定 TCP Keep-Alive 数据包的 初始延迟。 当 keepAlive 选项为 false 或 undefined 时，该选项无效。 默认为 1000。
    maxSockets &lt;number&gt; 每个主机允许的最大 socket 数量。 默认为 Infinity。
    maxFreeSockets &lt;number&gt; 在空闲状态下允许打开的最大 socket 数量。 仅当 keepAlive 为 true 时才有效。 默认为 256</pre>
</div>

&emsp;&emsp;http.request() 使用的默认 http.globalAgent 的选项均为各自的默认值

&emsp;&emsp;若要配置其中任何一个，则需要创建自定义的 http.Agent 实例

【agent.createConnection(options[, callback])】

<div>
<pre>options &lt;Object&gt; 包含连接详情的选项
callback &lt;Function&gt; 接收被创建的 socket 的回调函数。callback 有 (err, stream) 参数
返回: &lt;net.Socket&gt;</pre>
</div>

&emsp;&emsp;创建一个用于 HTTP 请求的 socket 或流

&emsp;&emsp;默认情况下，函数类似于net.createConnection()。但如果期望更大的灵活性，自定义代理可重写该方法

&emsp;&emsp;socket 或流可以通过以下两种方式获取：从该函数返回或传入callback

【agent.destroy()】

&emsp;&emsp;销毁当前正被代理使用的任何socket

&emsp;&emsp;通常不需要这么做。但是如果使用的代理启用了keepAlive，则当确定它不再被使用时，最好显式地关闭代理。 否则，在服务器终止它们之前，socket 可能还会长时间保持打开

【agent.freeSockets】

&emsp;&emsp;返回一个对象，包含当前正在等待被启用了 keepAlive 的代理使用的 socket 数组。不要修改该属性

【agent.getName(options)】

<div>
<pre>options &lt;Object&gt; 为名称生成程序提供信息的选项。
    host &lt;string&gt; 请求发送至的服务器的域名或 IP 地址。
    port &lt;number&gt; 远程服务器的端口。
    localAddress &lt;string&gt; 当发送请求时，为网络连接绑定的本地接口。
返回: &lt;string&gt;</pre>
</div>

&emsp;&emsp;为请求选项的集合获取一个唯一的名称，用来判断一个连接是否可以被复用。 对于 HTTP 代理，返回 host:port:localAddress。 对于 HTTPS 代理，名称会包含 CA、证书、密码、以及其他 HTTPS/TLS 特有的用于判断 socket 复用性的选项

【agent.maxFreeSockets】

&emsp;&emsp;默认为 256。 对于已启用 keepAlive 的代理，该属性可设置要保留的空闲 socket 的最大数量

【agent.maxSockets】

&emsp;&emsp;默认为不限制。 该属性可设置代理为每个来源打开的并发 socket 的最大数量。 来源是一个 'host:port' 或 'host:port:localAddress' 组合

【agent.requests】

&emsp;&emsp;返回一个对象，包含还未被分配到 socket 的请求队列。 不要修改

【agent.sockets】

&emsp;&emsp;返回一个对象，包含当前正被代理使用的 socket 数组。 不要修改

&nbsp;

### Request

【http.ClientRequest】

&emsp;&emsp;该对象在http.request()内部被创建并返回。它表示着一个正在处理的请求，其请求头已进入队列。请求头仍可使用setHeader(name, value)、getHeader(name) 和 removeHeader(name) API 进行修改。实际的请求头会与第一个数据块一起发送或当关闭连接时发送

&emsp;&emsp;要获取响应，需为 'response' 事件添加一个监听器到请求对象上。当响应头被接收到时，'response' 事件会从请求对象上被触发 。 'response'事件被执行时带有一个参数，该参数是一个 http.IncomingMessage 实例。在 'response' 事件期间，可以添加监听器到响应对象上，比如监听 'data' 事件

&emsp;&emsp;如果没有添加 'response' 事件处理函数，则响应会被整个丢弃。如果添加了 'response' 事件处理函数，则必须消耗完响应对象的数据，可通过调用 response.read()、或添加一个 'data' 事件处理函数、或调用.resume() 方法。数据被消耗完时会触发'end' 事件。在数据被读取完之前会消耗内存，可能会造成 'process out of memory' 错误

&emsp;&emsp;注意：Node.js 不会检查 Content-Length 与已传输的请求主体的长度是否相等

<div>
<pre>var http = require('http');
var server = http.createServer(function(req, res){
    console.log(req.url );//'/'
    console.log(req.httpVersion );//1.1
    console.log(req.method );//GET
    //{"host":"127.0.0.1:5000","connection":"keep-alive","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36","accept":"image/webp,image/*,*/*;q=0.8","referer":"http://127.0.0.1:5000/","accept-encoding":"gzip, deflate, sdch, br","accept-language":"zh-CN,zh;q=0.8,en;q=0.6"}
    console.log(JSON.stringify(req.headers) );
    res.end('ok');
});
server.listen(5000);</pre>
</div>

【abort事件】

&emsp;&emsp;当请求已被客户端终止时触发。 该事件仅在首次调用 abort() 时触发

【aborted事件】

&emsp;&emsp;当请求已被服务器终止且网络 socket 已关闭时触发

【connect事件】

<div>
<pre>response &lt;http.IncomingMessage&gt;
socket &lt;net.Socket&gt;
head &lt;Buffer&gt;</pre>
</div>

&emsp;&emsp;当服务器响应CONNECT请求时触发。 如果该事件未被监听，则接收到CONNECT方法的客户端会关闭连接

【continue事件】

&emsp;&emsp;当服务器发送了一个 100 Continue 的 HTTP 响应时触发，通常是因为请求包含 Expect: 100-continue。 这是客户端将要发送请求主体的指令

【response 事件】

<div>
<pre>response &lt;http.IncomingMessage&gt;</pre>
</div>

&emsp;&emsp;当请求的响应被接收到时触发。 该事件只触发一次

【socket 事件】

<div>
<pre>socket &lt;net.Socket&gt;</pre>
</div>

&emsp;&emsp;当 socket 被分配到请求后触发

【upgrade事件】

<div>
<pre>response &lt;http.IncomingMessage&gt;
socket &lt;net.Socket&gt;
head &lt;Buffer&gt;</pre>
</div>

&emsp;&emsp;每当服务器响应 upgrade 请求时触发。 如果该事件未被监听，则接收到 upgrade 请求头的客户端会关闭连接

【request.abort()】

&emsp;&emsp;标记请求为终止。 调用该方法将使响应中剩余的数据被丢弃且 socket 被销毁

【request.aborted】

&emsp;&emsp;如果请求已被终止，则该属性的值为请求被终止的时间，从 1 January 1970 00:00:00 UTC 到现在的毫秒数

【request.end([data][, encoding][, callback])】

<div>
<pre>data &lt;string&gt; | &lt;Buffer&gt;
encoding &lt;string&gt;
callback &lt;Function&gt;</pre>
</div>

&emsp;&emsp;结束发送请求。 如果部分请求主体还未被发送，则会刷新它们到流中。 如果请求是分块的，则会发送终止字符 '0\r\n\r\n'。

&emsp;&emsp;如果指定了 data，则相当于调用 response.write(data, encoding) 之后再调用 request.end(callback)。

&emsp;&emsp;如果指定了 callback，则当请求流结束时会被调用

【request.flushHeaders()】

&emsp;&emsp;刷新请求头

&emsp;&emsp;出于效率的考虑，Node.js 通常会缓存请求头直到 request.end() 被调用或第一块请求数据被写入。 然后 Node.js 会将请求头和数据打包成一个单一的 TCP 数据包。通常那是期望的（因为它节省了 TCP 往返），除非第一个数据块很长时间之后才被发送。 request.flushHeaders() 可以绕过最优选择并提前开始请求

【request.setNoDelay([noDelay])】

<div>
<pre>noDelay &lt;boolean&gt;</pre>
</div>

&emsp;&emsp;一旦 socket 被分配给请求且已连接，socket.setNoDelay() 会被调用

【request.setSocketKeepAlive([enable][, initialDelay])】

<div>
<pre>enable &lt;boolean&gt;
initialDelay &lt;number&gt;</pre>
</div>

&emsp;&emsp;一旦 socket 被分配给请求且已连接，socket.setKeepAlive() 会被调用

【request.setTimeout(timeout[, callback])】

<div>
<pre>timeout &lt;number&gt; 请求被认为是超时的毫秒数。
callback &lt;Function&gt; 可选的函数，当超时发生时被调用。等同于绑定到 timeout 事件
返回 request</pre>
</div>

&emsp;&emsp;一旦 socket 被分配给请求且已连接，socket.setTimeout() 会被调用

【request.write(chunk[, encoding][, callback])】

<div>
<pre>chunk &lt;string&gt; | &lt;Buffer&gt;
encoding &lt;string&gt; encoding 参数是可选的，仅当 chunk 是一个字符串时才有效。默认为 'utf8'
callback &lt;Function&gt; callback 参数是可选的，当数据块被刷新时调用
返回 request</pre>
</div>

&emsp;&emsp;发送请求主体的一个数据块。 通过多次调用该方法，一个请求主体可被发送到一个服务器，在这种情况下，当创建请求时，建议使用 ['Transfer-Encoding', 'chunked'] 请求头

&nbsp;

### Server

&emsp;&emsp;大多数nodejs开发者都是冲着开发web server的目的选择了nodejs。借助http模块，可以几行代码就搞定一个超迷你的web server

【http.createServer([requestListener])】

&emsp;&emsp;该方法创建并返回一个HTTP服务器对象

&emsp;&emsp;requestListener表示监听到客户端连接的回调函数

<div>
<pre>var server = http.createServer(function(req,res){});</pre>
</div>

【server.listen(port[, hostname][, backlog][, callback])】

&emsp;&emsp;该方法在指定的的端口和主机名上开始接收连接

&emsp;&emsp;port表示要监听的端口，若不设置，则端口由系统自动分配

&emsp;&emsp;若忽略主机名hostname，服务器将会接收指向任意IPv4的地址(INADDR_ANY)

&emsp;&emsp;若监听一个unix socket，需要提供一个文件名而不是主机名和端口

&emsp;&emsp;若积压量backlog为等待连接队列的最大长度，即允许多少个客户端在队列中存在。实际的长度由操作系统的sysctl设置决定。默认参数值为511

&emsp;&emsp;最后一个参数callback是异步函数，会作为事件监听器添加到listening事件

<div>
<pre>server.listen(5000);</pre>
</div>

【request事件】

&emsp;&emsp;当有客户端发送请求到该主机和端口的请求的时候触发

&emsp;&emsp;参数request : http.IncomingMessage的一个实例，通过他我们可以获取到这次请求的一些信息，比如头信息，数据等

&emsp;&emsp;参数response : http.ServerResponse的一个实例，通过他我们可以向该次请求的客户端输出返回响应

<div>
<pre>server.on('request',function(request,response){
    console.log('收到信息');
})</pre>
</div>

&emsp;&emsp;由于createServer()的参数是requestListener，所以可以把request事件中的回调函数写为createServer()的参数

<div>
<pre>var server = http.createServer(function(req,res){
    console.log('收到信息');
});</pre>
</div>

&emsp;&emsp;于是，利用上面几个方法就可以创建一个简单的server

<div>
<pre>var http = require('http');
var server = http.createServer(function(req,res){
    console.log('收到信息');
});
server.listen(5000);</pre>
</div>

&emsp;&emsp;在浏览器地址栏中输入127.0.0.1:5000，控制台会显示'收到信息'这4个字

【checkContinue事件】

<div>
<pre>request &lt;http.IncomingMessage&gt;
response &lt;http.ServerResponse&gt;</pre>
</div>

&emsp;&emsp;每当接收到一个带有 HTTP Expect: 100-continue 请求头的请求时触发。 如果该事件未被监听，则服务器会自动响应 100 Continue

&emsp;&emsp;处理该事件时，如果客户端应该继续发送请求主体，则调用 response.writeContinue()，否则生成一个适当的 HTTP 响应（例如 400 错误请求）。

&emsp;&emsp;注意：当该事件被触发且处理后，request 事件不会被触发

【checkExpectation事件】

<div>
<pre>request &lt;http.ClientRequest&gt;
response &lt;http.ServerResponse&gt;</pre>
</div>

&emsp;&emsp;每当接收到一个带有 HTTP Expect 请求头（值不为 100-continue）的请求时触发。 如果该事件未被监听，则服务器会自动响应 417 Expectation Failed。

&emsp;&emsp;注意：当该事件被触发且处理后，request 事件不会被触发

【clientError事件】

<div>
<pre>exception &lt;Error&gt;
socket &lt;net.Socket&gt; socket 参数是发生错误的 net.Socket 对象</pre>
</div>

&emsp;&emsp;如果客户端触发了一个error事件，则它会被传递到这里。该事件的监听器负责关闭或销毁底层的socket。例如，用户可能希望更温和地用HTTP '400 Bad Request'响应关闭 socket，而不是突然地切断连接

&emsp;&emsp;默认情况下，请求异常时会立即销毁 socket

<div>
<pre>var http = require('http');
var server = http.createServer((req, res) =&gt; {
  res.end();
});
server.on('clientError', (err, socket) =&gt; {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(8000);</pre>
</div>

&emsp;&emsp;当 'clientError' 事件发生时，不会有 request 或 response 对象，所以发送的任何 HTTP 响应，包括响应头和内容，必须被直接写入到 socket 对象。 注意，确保响应是一个被正确格式化的 HTTP 响应消息

【close事件】

&emsp;&emsp;当服务器关闭时触发

【connect事件】

<div>
<pre>request &lt;http.IncomingMessage&gt; HTTP 请求，同 request 事件。
socket &lt;net.Socket&gt; 服务器与客户端之间的网络 socket。
head &lt;Buffer&gt; 流的第一个数据包，可能为空。</pre>
</div>

&emsp;&emsp;当客户端发送HTTP CONNECT请求时触发。 如果该事件未被监听，则发送CONNECT请求的客户端会关闭连接

&emsp;&emsp;当该事件被触发后，请求的 socket 上没有 data 事件监听器，这意味着需要绑定 data 事件监听器，用来处理 socket 上被发送到服务器的数据

【connection 事件】

<div>
<pre>socket &lt;net.Socket&gt;</pre>
</div>

&emsp;&emsp;当一个新的 TCP 流被建立时触发。 socket 是一个 net.Socket 类型的对象。 通常用户无需访问该事件。 注意，因为协议解析器绑定到 socket 的方式，socket 不会触发 'readable' 事件。 socket 也可以通过 request.connection 访问

【upgrade事件】

<div>
<pre>request &lt;http.IncomingMessage&gt; HTTP 请求，同 'request' 事件。
socket &lt;net.Socket&gt; 服务器与客户端之间的网络 socket。
head &lt;Buffer&gt; 流的第一个数据包，可能为空。</pre>
</div>

&emsp;&emsp;每当客户端发送HTTP upgrade请求时触发。 如果该事件未被监听，则发送upgrade请求的客户端会关闭连接

&emsp;&emsp;当该事件被触发后，请求的 socket 上没有 'data' 事件监听器，这意味着需要绑定 'data' 事件监听器，用来处理 socket 上被发送到服务器的数据

【server.close([callback])】

&emsp;&emsp;停止服务端接收新的连接

【server.listening】

<div>
<pre>&lt;boolean&gt;</pre>
</div>

&emsp;&emsp;返回一个布尔值，表示服务器是否正在监听连接

【server.maxHeadersCount】

<div>
<pre>&lt;number&gt; 默认为 2000</pre>
</div>

&emsp;&emsp;限制请求头的最大数量，默认为 2000。 如果设为 0，则没有限制

【server.setTimeout([msecs][, callback])】

<div>
<pre>msecs &lt;number&gt; 默认为 120000 (2 分钟)。
callback &lt;Function&gt;
返回 server</pre>
</div>

&emsp;&emsp;设置socket的超时时间。 如果发生超时，则触发服务器对象的'timeout'事件，并传入socket作为一个参数

&emsp;&emsp;默认情况下，服务器的超时时间是 2 分钟，且超时后的 socket 会被自动销毁。 但是，如果你为服务器的 'timeout' 事件分配了一个回调函数，则超时必须被显式地处理

【server.timeout】

<div>
<pre>&lt;number&gt; 超时时间，以毫秒为单位。默认为 120000 (2 分钟)</pre>
</div>

&emsp;&emsp;socket 被认定为超时的空闲毫秒数。值设为 0 可禁用请求连接的超时行为

&emsp;&emsp;注意：socket 的超时逻辑是在连接上设定的，所以改变这个值只影响服务器新建的连接，而不会影响任何已存在的连接

&nbsp;

### response

&emsp;&emsp;该对象在 HTTP 服务器内部被创建。 它作为第二个参数被传入 'request' 事件。这个类实现了（而不是继承自）可写流接口

<div>
<pre>var http = require('http');
var server = http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
    res.end('小火柴');
});
server.listen(8000);</pre>
</div>

![http1](https://pic.xiaohuochai.site/blog/nodejs_http1.png)


【close事件】

&emsp;&emsp;当底层连接在 response.end() 被调用或能够刷新之前被终止时触发

【finish事件】

&emsp;&emsp;当响应已被发送时触发。 更具体地说，当响应头和响应主体的最后一部分已被交给操作系统通过网络进行传输时，触发该事件。 这并不意味着客户端已接收到任何东西。该事件触发后，响应对象上不再触发其他事件

【response.addTrailers(headers)】

<div>
<pre>headers &lt;Object&gt;</pre>
</div>

&emsp;&emsp;该方法会添加 HTTP 尾部响应头（一种在消息尾部的响应头）到响应。

&emsp;&emsp;仅当响应使用分块编码时，尾部响应头才会被发送；否则（比如请求为 HTTP/1.0），尾部响应头会被丢弃。

&emsp;&emsp;注意：发送尾部响应头之前，需先发送 Trailer 响应头，并在值里带上尾部响应头字段的列表

<div>
<pre>response.writeHead(200, { 'Content-Type': 'text/plain',
                          'Trailer': 'Content-MD5' });
response.write(fileData);
response.addTrailers({'Content-MD5': '7895bf4b8828b55ceaf47747b4bca667'});
response.end();</pre>
</div>

&emsp;&emsp;如果尾部响应头字段的名称或值包含无效字符，则抛出 TypeError 错误

【response.end([data][, encoding][, callback])】

<div>
<pre>data &lt;string&gt; | &lt;Buffer&gt;
encoding &lt;string&gt; 如果指定了 data，则相当于调用 response.write(data, encoding) 之后再调用 response.end(callback)
callback &lt;Function&gt; 如果指定了 callback，则当响应流结束时被调用</pre>
</div>

&emsp;&emsp;该方法会通知服务器，所有响应头和响应主体都已被发送，即服务器将其视为已完成。 每次响应都必须调用 response.end() 方法

【response.finished】

<div>
<pre>&lt;boolean&gt;</pre>
</div>

&emsp;&emsp;返回一个布尔值，表示响应是否已完成。 默认为 false。 执行 response.end() 之后，该值会变为 true

【response.getHeader(name)】

<div>
<pre>name &lt;string&gt;
返回: &lt;string&gt;</pre>
</div>

&emsp;&emsp;读取一个已入队列但尚未发送到客户端的响应头

&emsp;&emsp;注意：名称不区分大小写

<div>
<pre>var contentType = response.getHeader('content-type');</pre>
</div>

【response.getHeaderNames()】

&emsp;&emsp;返回响应头名称的数组

<div>
<pre>response.setHeader('Foo', 'bar');
response.setHeader('Set-Cookie', ['foo=bar', 'bar=baz']);
var headerNames = response.getHeaderNames();
// headerNames === ['foo', 'set-cookie']</pre>
</div>

【response.getHeaders()】

&emsp;&emsp;返回响应头数组

<div>
<pre>response.setHeader('Foo', 'bar');
response.setHeader('Set-Cookie', ['foo=bar', 'bar=baz']);
var headers = response.getHeaders();
// headers === { foo: 'bar', 'set-cookie': ['foo=bar', 'bar=baz'] }</pre>
</div>

【response.hasHeader(name)】

&emsp;&emsp;是否包含当前响应头

<div>
<pre>var hasContentType = response.hasHeader('content-type');</pre>
</div>

【response.headersSent】

&emsp;&emsp;返回一个布尔值（只读）。 如果响应头已被发送则为 true，否则为 false

【response.removeHeader(name)】

&emsp;&emsp;从隐式发送的队列中移除一个响应头

<div>
<pre>response.removeHeader('Content-Encoding');</pre>
</div>

【response.sendDate】

&emsp;&emsp;当为 true 时，如果响应头里没有日期响应头，则日期响应头会被自动生成并发送。默认为 true。

&emsp;&emsp;该属性只可在测试时被禁用，因为 HTTP 响应需要包含日期响应头

【response.setHeader(name, value)】

<div>
<pre>name &lt;string&gt;
value &lt;string&gt; | &lt;string[]&gt;</pre>
</div>

&emsp;&emsp;为一个隐式的响应头设置值。 如果该响应头已存在，则值会被覆盖。 如果要发送多个名称相同的响应头，则使用字符串数组

<div>
<pre>response.setHeader('Content-Type', 'text/html');
response.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);</pre>
</div>

&emsp;&emsp;如果响应头字段的名称或值包含无效字符，则抛出 TypeError 错误

&emsp;&emsp;response.setHeader()设置的响应头与response.writeHead()设置的响应头合并，response.writeHead()优先

【response.setTimeout(msecs[, callback])】

<div>
<pre>msecs &lt;number&gt;
callback &lt;Function&gt;
返回 response</pre>
</div>

&emsp;&emsp;设置socket的超时时间为msecs。如果提供了回调函数，它会作为监听器被添加到响应对象的'timeout'事件

&emsp;&emsp;如果没有 'timeout' 监听器被添加到请求、响应或服务器，则 socket 会在超时后被销毁。 如果在请求、响应或服务器的 'timeout' 事件上分配了回调函数，则超时的 socket 必须被显式地处理

【response.statusCode】

&emsp;&emsp;当使用隐式的响应头时（没有显式地调用 response.writeHead()），该属性控制响应头刷新时将被发送到客户端的状态码

<div>
<pre>response.statusCode = 404;</pre>
</div>

&emsp;&emsp;响应头被发送到客户端后，该属性表示被发出的状态码

【response.statusMessage】

&emsp;&emsp;当使用隐式的响应头时（没有显式地调用 response.writeHead()），该属性控制响应头刷新时将被发送到客户端的状态信息。 如果该值为 undefined，则使用状态码的标准信息

<div>
<pre>response.statusMessage = 'Not found';</pre>
</div>

&emsp;&emsp;响应头被发送到客户端后，该属性表示被发出的状态信息

【response.write(chunk[, encoding][, callback])】

<div>
<pre>chunk &lt;string&gt; | &lt;Buffer&gt;
encoding &lt;string&gt;
callback &lt;Function&gt;
返回: &lt;boolean&gt;</pre>
</div>

&emsp;&emsp;如果该方法被调用且 response.writeHead() 没有被调用，则它会切换到隐式响应头模式并刷新隐式响应头。

&emsp;&emsp;该方法会发送一块响应主体。 它可被多次调用，以便提供连续的响应主体片段

&emsp;&emsp;chunk 可以是一个字符串或一个 buffer。 如果 chunk 是一个字符串，则第二个参数指定如何将它编码成一个字节流。 encoding 默认为 'utf8'。 当数据块被刷新时，callback 会被调用。

&emsp;&emsp;注意：这是原始的 HTTP 主体，且与可能被使用的高级主体编码无关

【response.write()】

&emsp;&emsp;首次被调用时，会发送缓冲的响应头信息和响应主体的第一块数据到客户端。 response.write() 第二次被调用时，Node.js 会以流的形式处理数据，并将它们分别发送。 也就是说，响应会被缓冲到响应主体的第一个数据块。

&emsp;&emsp;如果全部数据被成功刷新到内核缓冲区，则返回 true。 如果全部或部分数据还在内存中排队，则返回 false。 当缓冲区再次空闲时，则触发 'drain' 事件

【response.writeContinue()】

&emsp;&emsp;发送一个 HTTP/1.1 100 Continue 消息到客户端，表示请求主体可以开始发送

【response.writeHead(statusCode[, statusMessage][, headers])】

<div>
<pre>statusCode &lt;number&gt; &nbsp;状态码是一个三位数的 HTTP 状态码，如 404
statusMessage &lt;string&gt; statusMessage 是可选的状态描述
headers &lt;Object&gt; headers 是响应头</pre>
</div>

&emsp;&emsp;发送一个响应头给请求

<div>
<pre>var body = 'hello world';
response.writeHead(200, {
  'Content-Length': Buffer.byteLength(body),
  'Content-Type': 'text/plain' });</pre>
</div>

&emsp;&emsp;该方法在消息中只能被调用一次，且必须在 response.end() 被调用之前调用。

&emsp;&emsp;如果在调用该方法之前调用 response.write() 或 response.end()，则隐式的响应头会被处理并调用该函数。

&emsp;&emsp;response.setHeader() 设置的响应头会与 response.writeHead() 设置的响应头合并，且 response.writeHead() 的优先

<div>
<pre>// 返回 content-type = text/plain
var server = http.createServer((req, res) =&gt; {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('ok');
});</pre>
</div>

![http2](https://pic.xiaohuochai.site/blog/nodejs_http2.png)


&emsp;&emsp;注意：Content-Length 是以字节（而不是字符）为单位的。如果响应主体包含高级编码的字符，则应使用 Buffer.byteLength() 来确定在给定编码中的字节数。 Node.js 不会检查 Content-Length 与已发送的响应主体的长度是否相同。

&emsp;&emsp;如果响应头字段的名称或值包含无效字符，则抛出 TypeError 错误

&nbsp;

### IncomingMessage

&emsp;&emsp;IncomingMessage 对象由 http.Server 或 http.ClientRequest 创建，并作为第一个参数分别递给 'request' 和 'response' 事件。 它可以用来访问响应状态、消息头、以及数据。它实现了 可读流 接口

【aborted事件】

&emsp;&emsp;当请求已被客户端终止且网络 socket 已关闭时触发

【close事件】

&emsp;&emsp;当底层连接被关闭时触发。 同 end 事件一样，该事件每个响应只触发一次

【message.destroy([error])】

&emsp;&emsp;调用接收到 IncomingMessage 的 socket 上的 destroy() 方法。 如果提供了 error，则触发 error 事件，且把 error 作为参数传入事件的监听器

【message.headers】

<div>
<pre>&lt;Object&gt;</pre>
</div>

&emsp;&emsp;请求头或响应头的对象

&emsp;&emsp;头信息的名称与值的键值对。 头信息的名称为小写

<div>
<pre>// { 'user-agent': 'curl/7.22.0',
//   host: '127.0.0.1:8000',
//   accept: '*/*' }
console.log(request.headers);</pre>
</div>

【message.httpVersion】

<div>
<pre>&lt;string&gt;</pre>
</div>

&emsp;&emsp;在服务器请求中，该属性返回客户端发送的 HTTP 版本。在客户端响应中，该属性返回连接到的服务器的 HTTP 版本。 可能的值有 '1.1' 或 '1.0'

&emsp;&emsp;message.httpVersionMajor 返回 HTTP 版本的第一个整数值，message.httpVersionMinor 返回 HTTP 版本的第二个整数值

【message.method】

&emsp;&emsp;返回一个字符串，表示请求的方法。 该属性只读。 例如：'GET'、'DELETE'。

&emsp;&emsp;注意：仅在 http.Server 返回的请求中有效。

【message.rawHeaders】

<div>
<pre>&lt;Array&gt;</pre>
</div>

&emsp;&emsp;接收到的原始的请求头或响应头列表。

&emsp;&emsp;注意：键和值在同一个列表中。 偶数位的是键，奇数位的是对应的值。

&emsp;&emsp;头信息的名称不会被转换为小写，重复的也不会被合并

<div>
<pre>// [ 'user-agent',
//   'this is invalid because there can be only one',
//   'User-Agent',
//   'curl/7.22.0',
//   'Host',
//   '127.0.0.1:8000',
//   'ACCEPT',
//   '*/*' ]
console.log(request.rawHeaders);</pre>
</div>

【message.rawTrailers】

<div>
<pre>&lt;Array&gt;</pre>
</div>

&emsp;&emsp;接收到的原始的 Trailer 请求头或响应头的的键和值。 只在 'end' 事件时被赋值

【message.setTimeout(msecs, callback)】

<div>
<pre>msecs &lt;number&gt;
callback &lt;Function&gt;
返回 message</pre>
</div>

&emsp;&emsp;调用 message.connection.setTimeout(msecs, callback)

【message.socket】

<div>
<pre>&lt;net.Socket&gt;</pre>
</div>

&emsp;&emsp;返回与连接关联的 net.Socket 对象。

&emsp;&emsp;通过 HTTPS 的支持，使用 request.socket.getPeerCertificate() 获取客户端的认证信息

【message.statusCode】

<div>
<pre>&lt;number&gt;</pre>
</div>

&emsp;&emsp;返回一个三位数的 HTTP 响应状态码。 如 404

&emsp;&emsp;注意：仅在 http.ClientRequest 返回的响应中有效。

【message.statusMessage】

<div>
<pre>&lt;string&gt;</pre>
</div>

&emsp;&emsp;仅在 http.ClientRequest 返回的响应中有效。

&emsp;&emsp;返回 HTTP 响应状态消息（原因描述）。 如 OK 或 Internal Server Error

【message.trailers】

<div>
<pre>&lt;Object&gt;</pre>
</div>

&emsp;&emsp;返回 Trailer 请求头或响应头对象。 只在 'end' 事件时被赋值

【message.url】

<div>
<pre>&lt;string&gt;</pre>
</div>

&emsp;&emsp;返回请求的 URL 字符串。 仅包含实际 HTTP 请求中的 URL

&emsp;&emsp;注意：仅在 http.Server 返回的请求中有效

&nbsp;

### HTTP

【http.METHODS】

<div>
<pre>&lt;Array&gt;</pre>
</div>

&emsp;&emsp;返回解析器支持的 HTTP 方法的列表

【http.STATUS_CODES】

<div>
<pre>&lt;Object&gt;</pre>
</div>

&emsp;&emsp;返回标准的 HTTP 响应状态码的集合，以及各自的简短描述

<div>
<pre>http.STATUS_CODES[404] === 'Not Found'</pre>
</div>

【http.createServer([requestListener])】

<div>
<pre>requestListener &lt;Function&gt; requestListener 是一个函数，会被自动添加到 'request' 事件

返回: &lt;http.Server&gt;</pre>
</div>

&emsp;&emsp;返回一个新建的 http.Server 实例

【http.get(options[, callback])】

<div>
<pre>options &lt;Object&gt; | &lt;string&gt; 
callback &lt;Function&gt;
返回: &lt;http.ClientRequest&gt;</pre>
</div>

&emsp;&emsp;因为大多数请求都是 GET 请求且不带请求主体，所以 Node.js 提供了该便捷方法。 该方法与 http.request() 唯一的区别是它设置请求方法为 GET 且自动调用 req.end()。 注意，响应数据必须在回调中被消耗

&emsp;&emsp;callback 被调用时只传入一个参数，该参数是 http.IncomingMessage 的一个实例

<div>
<pre>var http = require('http');
http.get('http://127.0.0.1:3000', function(res){
    console.log(res.statusCode);//200
});</pre>
</div>

【http.globalAgent】

<div>
<pre>&lt;http.Agent&gt;</pre>
</div>

&emsp;&emsp;Agent 的全局实例，作为所有 HTTP 客户端请求的默认 Agent

【http.request(options[, callback])】

<div>
<pre>options &lt;Object&gt; | &lt;string&gt; options是一个对象或字符串。如果是一个字符串，它会被自动使用url.parse()解析
    protocol &lt;string&gt; 使用的协议。默认为 http:。
    host &lt;string&gt; 请求发送至的服务器的域名或 IP 地址。默认为 localhost。
    hostname &lt;string&gt; host 的别名。为了支持 url.parse()，hostname 优于 host。
    family &lt;number&gt; 当解析host和hostname时使用的IP地址族。 有效值是4或6。当未指定时，则同时使用IPv4和v6
    port &lt;number&gt; 远程服务器的端口。默认为 80。
    localAddress &lt;string&gt; 为网络连接绑定的本地接口。
    socketPath &lt;string&gt; Unix 域 Socket（使用 host:port 或 socketPath）。
    method &lt;string&gt; 指定 HTTP 请求方法的字符串。默认为 'GET'。
    path &lt;string&gt; 请求的路径。默认为 '/'。 应包括查询字符串（如有的话）。如 '/index.html?page=12'。 当请求的路径中包含非法字符时，会抛出异常。 目前只有空字符会被拒绝，但未来可能会变化。
    headers &lt;Object&gt; 包含请求头的对象。
    auth &lt;string&gt; 基本身份验证，如 'user:password' 用来计算 Authorization 请求头。
    agent &lt;http.Agent&gt; | &lt;boolean&gt; 控制 Agent 的行为。 可能的值有：
        undefined (默认): 对该主机和端口使用 http.globalAgent。
        Agent 对象：显式地使用传入的 Agent。
        false: 创建一个新的使用默认值的 Agent。
    createConnection &lt;Function&gt; 当不使用 agent 选项时，为请求创建一个 socket 或流。 这可以用于避免仅仅创建一个自定义的 Agent 类来覆盖默认的 createConnection 函数。详见 agent.createConnection()。
    timeout &lt;number&gt;: 指定 socket 超时的毫秒数。 它设置了 socket 等待连接的超时时间。
callback &lt;Function&gt; 可选的 callback 参数会作为单次监听器被添加到 'response' 事件</pre>
</div>

&emsp;&emsp;Node.js 为每台服务器维护多个连接来进行 HTTP 请求。 该函数允许显式地发出请求。http.request() 返回一个 http.ClientRequest 类的实例。 ClientRequest 实例是一个可写流。 如果需要通过 POST 请求上传一个文件，则写入到 ClientRequest 对象

&nbsp;

### https

&emsp;&emsp;HTTPS 是 HTTP 基于 TLS/SSL 的版本。在 Node.js 中，它被实现为一个独立的模块

【server.setTimeout([msecs][, callback])】

<div>
<pre>msecs &lt;number&gt; Defaults to 120000 (2 minutes).
callback &lt;Function&gt;</pre>
</div>

【server.timeout】

<div>
<pre>&lt;number&gt; Defaults to 120000 (2 minutes)</pre>
</div>

【server.keepAliveTimeout】

<div>
<pre>&lt;number&gt; Defaults to 5000 (5 seconds)</pre>
</div>

【server.close([callback])】

<div>
<pre>callback &lt;Function&gt;</pre>
</div>

【server.listen([port][, host][, backlog][, callback])】

<div>
<pre>port &lt;number&gt;
hostname &lt;string&gt;
backlog &lt;number&gt;
callback &lt;Function&gt;</pre>
</div>

【https.createServer(options[, requestListener])】

<div>
<pre>options &lt;Object&gt;
requestListener &lt;Function&gt; </pre>
</div>

【https.get(options[, callback])】

<div>
<pre>options &lt;Object&gt; | &lt;string&gt; `options`是一个对象或是字符串。如果是字符串, 它自动被`url.parse()`所解析
callback &lt;Function&gt;</pre>
</div>

&emsp;&emsp;类似 http.get()，但是用于 HTTPS

&emsp;&emsp;参数 options 可以是一个对象或是一个字符串。 如果参数 options 是一个字符串, 它自动被 url.parse() 所解析

【https.globalAgent】

&emsp;&emsp;https.Agent的全局实例，用于所有HTTPS客户端请求

【https.request(options[, callback])】

<div>
<pre>options &lt;Object&gt; | &lt;string&gt; 
    protocol Defaults to https:
    port Defaults to 443.
    agent Defaults to https.globalAgent.
callback &lt;Function&gt;</pre>
</div>

&emsp;&emsp;向一个安全的服务器发起一个请求

&emsp;&emsp;参数options可以是一个对象或是一个字符串。如果一个字符串，它自动被 url.parse()所解析

&nbsp;

### 应用

【简单的GET请求】

<div>
<pre>var https = require('https');
https.get('https://www.cnblogs.com/', function(res){
    var data = '';
    res.setEncoding('utf8');
    res.on('data', function(chunk){
        data += chunk;
    });
    res.on('end', function(){
        console.log(data);
    });
});</pre>
</div>

【简单的POST请求】

<div>
<pre>var http = require('http');
var querystring = require('querystring');
var createClientPostRequest = function(){
    var options = {
        method: 'POST',
        protocol: 'http:',
        hostname: '127.0.0.1',
        port: '3000',
        path: '/post',
        headers: {
            "connection": "keep-alive",
            "content-type": "application/x-www-form-urlencoded"
        }    
    };
    // 发送给服务端的数据
    var postBody = {
        a: '1'
    };
    // 创建客户端请求
    var client = http.request(options, function(res){
        // 最终输出：Server got client data: nick=chyingp
        res.pipe(process.stdout);  
    });
    // 发送的报文主体，记得先用 querystring.stringify() 处理下
    client.write( querystring.stringify(postBody) );
    client.end();
};
// 服务端程序，只是负责回传客户端数据
var server = http.createServer(function(req, res){
    res.write('Server got client data: ');
    req.pipe(res);
});
server.listen(3000, createClientPostRequest);</pre>
</div>

