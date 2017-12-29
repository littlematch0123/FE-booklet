# 数据流stream

　　当内存中无法一次装下需要处理的数据时，或者一边读取一边处理更加高效时，我们就需要用到数据流。NodeJS中通过各种Stream来提供对数据流的操作。本文将详细说明NodeJS中的流stream

&nbsp;

### 概述

　　流(stream)在Nodejs中是处理流数据的抽象接口。stream模块提供了基础的API 。使用这些API可以很容易地来构建实现流接口的对象。Nodejs提供了多种流对象。 例如，HTTP请求和process.stdout都是流的实例

　　流可以是可读的、可写的，或是可读写的。所有的流都是 EventEmitter 的实例。

　　尽管所有的 Node.js 用户都应该理解流的工作方式，这点很重要， 但是 stream 模块本身只对于那些需要创建新的流的实例的开发者最有用处。 对于主要是消费流的开发者来说，他们很少（如果有的话）需要直接使用 stream 模块

【类型】

　　Node.js 中有四种基本的流类型：

<div class="cnblogs_code">
<pre>Readable - 可读的流 (例如 fs.createReadStream()).
Writable - 可写的流 (例如 fs.createWriteStream()).
Duplex - 可读写的流 (例如 net.Socket).
Transform - 在读写过程中可以修改和变换数据的 Duplex 流 (例如 zlib.createDeflate()).</pre>
</div>

　　所有使用 Node.js API 创建的流对象都只能操作 strings 和 Buffer（或 Uint8Array） 对象。但是，通过一些第三方流的实现，依然能够处理其它类型的 JavaScript 值 (除了 null，它在流处理中有特殊意义)。 这些流被认为是工作在 &ldquo;对象模式&rdquo;（object mode）

　　在创建流的实例时，可以通过 objectMode 选项使流的实例切换到对象模式。试图将已经存在的流切换到对象模式是不安全的

【缓冲】

　　Writable和Readable流都会将数据存储到内部的缓存（buffer）中。这些缓存可以通过相应的writable._writableState.getBuffer()或readable._readableState.buffer来获取

　　缓存的大小取决于传递给流构造函数的highWaterMark选项。 对于普通的流，highWaterMark选项指定了总共的字节数。对于工作在对象模式的流，highWaterMark指定了对象的总数

　　当可读流的实现调用stream.push(chunk)方法时，数据被放到缓存中。如果流的消费者没有调用stream.read()方法， 这些数据会始终存在于内部队列中，直到被消费

　　当内部可读缓存的大小达到highWaterMark指定的阈值时，流会暂停从底层资源读取数据，直到当前缓存的数据被消费(也就是说，流会在内部停止调用readable._read()来填充可读缓存)

　　可写流通过反复调用writable.write(chunk)方法将数据放到缓存。当内部可写缓存的总大小小于highWaterMark指定的阈值时，调用writable.write()将返true。 一旦内部缓存的大小达到或超过highWaterMark，调用writable.write()将返回false

　　stream API 的关键目标， 尤其对于 stream.pipe() 方法， 就是限制缓存数据大小，以达到可接受的程度。这样，对于读写速度不匹配的源头和目标，就不会超出可用的内存大小。

　　Duplex和Transform都是可读写的。 在内部，它们都维护了两 相互独立的缓存用于读和写。 在维持了合理高效的数据流的同时，也使得对于读和写可以独立进行而互不影响。 例如， net.Socket就是Duplex的实例，它的可读端可以消费从套接字（socket）中接收的数据， 可写端则可以将数据写入到套接字。 由于数据写入到套接字中的速度可能比从套接字接收数据的速度快或者慢， 在读写两端使用独立缓存，并进行独立操作就显得很重要了

　　几乎所有的 Node.js 应用，不管多么简单，都在某种程度上使用了流。 下面是在 Node.js 应用中使用流实现的一个简单的 HTTP 服务器

<div class="cnblogs_code">
<pre>var http = require('http');
var server = http.createServer((req, res) =&gt; {
  // req 是一个 Readable Stream;res 是一个 Writable Stream
  var body = '';
  req.setEncoding('utf8');
  req.on('data', (chunk) =&gt; {
    body += chunk;
  });
  req.on('end', () =&gt; {
    try {
      var data = JSON.parse(body);
      res.write(typeof data);
      res.end();
    } catch (er) {
      res.statusCode = 400;
      return res.end(`error: ${er.message}`);
    }
  });
});
server.listen(1337);</pre>
</div>

　　Writable 流 (比如例子中的 res) 暴露了一些方法，比如 write() 和 end() 。这些方法可以将数据写入到流中。当流中的数据可以读取时，Readable 流使用 EventEmitter API 来通知应用。 这些数据可以使用多种方法从流中读取。Writable 和 Readable 流都使用了 EventEmitter API ，通过多种方式， 与流的当前状态进行交互。Duplex 和 Transform 都是同时满足 Writable 和 Readable 。对于只是简单写入数据到流和从流中消费数据的应用来说， 不要求直接实现流接口，通常也不需要调用 require('stream')

&nbsp;

### 可写流

　　可写流是对数据流向设备的抽象，用来消费上游流过来的数据，通过可写流程序可以把数据写入设备，常见的是本地磁盘文件或者 TCP、HTTP 等网络响应

<div class="cnblogs_code">
<pre>process.stdin.pipe(process.stdout);</pre>
</div>

　　process.stdout是一个可写流，程序把可读流 process.stdin 传过来的数据写入的标准输出设备

　　Writable(可写流)包括：

<div class="cnblogs_code">
<pre>HTTP requests, on the client
HTTP responses, on the server
fs write streams
[zlib streams][zlib]
crypto streams
TCP sockets
child process stdin
process.stdout, process.stderr</pre>
</div>

　　[注意]上面的某些例子事实上是 Duplex 流，只是实现了 Writable 接口

　　所有 Writable 流都实现了 stream.Writable 类定义的接口。尽管特定的 Writable 流的实现可能略有差别， 所有的 Writable streams 都可以按一种基本模式进行使用

<div class="cnblogs_code">
<pre>var myStream = getWritableStreamSomehow();
myStream.write('some data');
myStream.write('some more data');
myStream.end('done writing data');</pre>
</div>

【'close' 事件】

　　'close'事件将在流或其底层资源（比如一个文件）关闭后触发。'close'事件触发后，该流将不会再触发任何事件

　　[注意]不是所有可写流都会触发 'close' 事件

【'drain' 事件】

　　如果调用 stream.write(chunk) 方法返回 false，流将在适当的时机触发 'drain' 事件，这时才可以继续向流中写入数据

<div class="cnblogs_code">
<pre>// 向可写流中写入数据一百万次。
// 需要注意背压（back-pressure）
function writeOneMillionTimes(writer, data, encoding, callback) {
  let i = 1000000;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 0) {
        // 最后 一次
        writer.write(data, encoding, callback);
      } else {
        // 检查是否可以继续写入。 
        // 这里不要传递 callback， 因为写入还没有结束！ 
        ok = writer.write(data, encoding);
      }
    } while (i &gt; 0 &amp;&amp; ok);
    if (i &gt; 0) {
      // 这里提前停下了， 
      // 'drain' 事件触发后才可以继续写入  
      writer.once('drain', write);
    }
  }
}</pre>
</div>

【'error' 事件】

　　'error' 事件在写入数据出错或者使用管道出错时触发。事件发生时，回调函数仅会接收到一个 Error 参数

　　[注意]'error' 事件发生时，流并不会关闭

【'finish' 事件】

　　在调用了 stream.end() 方法，且缓冲区数据都已经传给底层系统（underlying system）之后， 'finish' 事件将被触发

<div class="cnblogs_code">
<pre>const writer = getWritableStreamSomehow();
for (let i = 0; i &lt; 100; i++) {
  writer.write(`hello, #${i}!\n`);
}
writer.end('This is the end\n');
writer.on('finish', () =&gt; {
  console.error('All writes are now complete.');
});</pre>
</div>

【'pipe' 事件】

<div class="cnblogs_code">
<pre>src &lt;stream.Readable&gt; 输出到目标可写流（writable）的源流（source stream）</pre>
</div>

　　在可读流（readable stream）上调用 stream.pipe() 方法，并在目标流向 (destinations) 中添加当前可写流 ( writable ) 时，将会在可写流上触发 'pipe' 事件

<div class="cnblogs_code">
<pre>const writer = getWritableStreamSomehow();
const reader = getReadableStreamSomehow();
writer.on('pipe', (src) =&gt; {
  console.error('something is piping into the writer');
  assert.equal(src, reader);
});
reader.pipe(writer);</pre>
</div>

【'unpipe' 事件】

<div class="cnblogs_code">
<pre>src &lt;Readable Stream&gt; unpiped 当前可写流的源流</pre>
</div>

　　在 Readable 上调用 stream.unpipe() 方法，从目标流向中移除当前 Writable 时，将会触发 'unpipe' 事件

<div class="cnblogs_code">
<pre>const writer = getWritableStreamSomehow();
const reader = getReadableStreamSomehow();
writer.on('unpipe', (src) =&gt; {
  console.error('Something has stopped piping into the writer.');
  assert.equal(src, reader);
});
reader.pipe(writer);
reader.unpipe(writer);</pre>
</div>

【writable.cork()】

　　调用 writable.cork() 方法将强制所有写入数据都内存中的缓冲区里。 直到调用 stream.uncork() 或 stream.end() 方法时，缓冲区里的数据才会被输出

　　在向流中写入大量小块数据（small chunks of data）时，内部缓冲区（internal buffer）可能失效，从而导致性能下降。writable.cork() 方法主要就是用来避免这种情况。 对于这种情况， 实现了 writable._writev() 方法的流可以对写入的数据进行缓冲，从而提高写入效率

【writable.end([chunk][, encoding][, callback])】

<div class="cnblogs_code">
<pre>chunk &lt;string&gt; | &lt;Buffer&gt; | &lt;Uint8Array&gt; | &lt;any&gt; </pre>
</div>
<div class="cnblogs_code">
<pre>chunk &lt;string&gt; | &lt;Buffer&gt; | &lt;Uint8Array&gt; | &lt;any&gt; 可选的，需要写入的数据。对于非对象模式下的流， chunk 必须是字符串、或 Buffer、或 Uint8Array。对于对象模式下的流， chunk 可以是任意的 JavaScript 值，除了 null。
encoding &lt;string&gt; 如果 chunk 是字符串，这里指定字符编码。
callback &lt;Function&gt; 可选的，流结束时的回调函数</pre>
</div>

　　调用 writable.end() 方法表明接下来没有数据要被写入 Writable。通过传入可选的 chunk 和 encoding 参数，可以在关闭流之前再写入一段数据。如果传入了可选的 callback 函数，它将作为 'finish' 事件的回调函数。

　　[注意]在调用了 stream.end() 方法之后，再调用 stream.write() 方法将会导致错误

<div class="cnblogs_code">
<pre>// 写入 'hello, ' ，并用 'world!' 来结束写入
const file = fs.createWriteStream('example.txt');
file.write('hello, ');
file.end('world!');
// 后面不允许再写入数据！</pre>
</div>

【writable.setDefaultEncoding(encoding)】

<div class="cnblogs_code">
<pre>encoding &lt;string&gt; 新的默认编码
返回： this</pre>
</div>

　　writable.setDefaultEncoding() 用于为 Writable 设置 encoding

【writable.uncork()】

　　writable.uncork() 将输出在 stream.cork() 方法被调用之后缓冲在内存中的所有数据

　　如果使用 writable.cork() 和 writable.uncork() 来管理写入缓存，建议使用 process.nextTick() 来延迟调用 writable.uncork() 方法。通过这种方式，可以对单个 Node.js 事件循环中调用的所有 writable.write() 方法进行批处理

<div class="cnblogs_code">
<pre>stream.cork();
stream.write('some ');
stream.write('data ');
process.nextTick(() =&gt; stream.uncork());</pre>
</div>

　　如果一个流多次调用了 writable.cork() 方法，那么也必须调用同样次数的 writable.uncork() 方法以输出缓冲区数据

<div class="cnblogs_code">
<pre>stream.cork();
stream.write('some ');
stream.cork();
stream.write('data ');
process.nextTick(() =&gt; {
  stream.uncork();
  // 之前的数据只有在 uncork() 被二次调用后才会输出
  stream.uncork();
});</pre>
</div>

【writable.write(chunk[, encoding][, callback])】

<div class="cnblogs_code">
<pre>chunk &lt;string&gt; | &lt;Buffer&gt; | &lt;Uint8Array&gt; | &lt;any&gt; 要写入的数据。可选的。 For streams not operating in object mode, chunk must be a string, Buffer or Uint8Array. For object mode streams, chunk may be any JavaScript value other than null.
encoding &lt;string&gt; 如果 chunk 是字符串，这里指定字符编码
callback &lt;Function&gt; 缓冲数据输出时的回调函数
返回： &lt;boolean&gt; 如果流需要等待 'drain' 事件触发才能继续写入数据，这里将返回 false ； 否则返回 true。</pre>
</div>

　　writable.write() 方法向流中写入数据，并在数据处理完成后调用 callback 。如果有错误发生， callback不一定会接收到这个错误作为第一个参数。要确保可靠地检测到写入错误，应该监听 'error' 事件。

　　在确认了 chunk 后，如果内部缓冲区的大小小于创建流时设定的 highWaterMark 阈值，函数将返回 true 。 如果返回值为 false ，应该停止向流中写入数据，直到 'drain' 事件被触发。

　　当一个流不处在 drain 的状态， 对 write() 的调用会缓存数据块， 并且返回 false。 一旦所有当前所有缓存的数据块都排空了（被操作系统接受来进行输出）， 那么 'drain' 事件就会被触发。 我们建议， 一旦 write() 返回 false， 在 'drain' 事件触发前， 不能写入任何数据块。 然而，当流不处在 'drain' 状态时， 调用 write() 是被允许的， Node.js 会缓存所有已经写入的数据块， 直到达到最大内存占用， 这时它会无条件中止。 甚至在它中止之前， 高内存占用将会导致差的垃圾回收器的性能和高的系统相对敏感性 （即使内存不在需要，也通常不会被释放回系统）。 如果远程的另一端没有读取数据， TCP sockets 可能永远也不会 drain ， 所以写入到一个不会drain的socket可能会导致远程可利用的漏洞。

　　对于一个 Transform, 写入数据到一个不会drain的流尤其成问题， 因为 Transform 流默认被暂停， 直到它们被pipe或者被添加了 'data' 或 'readable' event handler。

　　如果将要被写入的数据可以根据需要生成或者取得，我们建议将逻辑封装为一个 Readable 流并且使用 stream.pipe()。 但是如果调用 write() 优先, 那么可以使用 'drain' 事件来防止回压并且避免内存问题:

<div class="cnblogs_code">
<pre>function write(data, cb) {
  if (!stream.write(data)) {
    stream.once('drain', cb);
  } else {
    process.nextTick(cb);
  }
}

// Wait for cb to be called before doing any other write.
write('hello', () =&gt; {
  console.log('write completed, do more writes now');
});</pre>
</div>

　　[注意]对象模式的写入流将忽略 encoding 参数

【writable.destroy([error])】

　　销毁流，并释放已传递的错误。在这之后，可写的流已经结束了。实现者不应该覆盖此方法，而是实现writable._destroy

&nbsp;

### 可读流

　　可读流（Readable streams）是对提供数据的源头（source）的抽象，是生产数据用来供程序消费的流。我们常见的数据生产方式有读取磁盘文件、读取网络请求内容等

<div class="cnblogs_code">
<pre>const rs = fs.createReadStream(filePath);</pre>
</div>

　　rs就是一个可读流，其生产数据的方式是读取磁盘的文件，我们常见的控制台process.stdin也是一个可读流

<div class="cnblogs_code">
<pre>process.stdin.pipe(process.stdout);</pre>
</div>

　　通过简单的一句话可以把控制台的输入打印出来，process.stdin 生产数据的方式是读取用户在控制台的输入

　　可读流的例子包括：

<div class="cnblogs_code">
<pre>HTTP responses, on the client
HTTP requests, on the server
fs read streams
[zlib streams][zlib]
crypto streams
TCP sockets
child process stdout and stderr
process.stdin</pre>
</div>

　　[注意]所有的 Readable 都实现了 stream.Readable 类定义的接口

【两种模式】

　　可读流事实上工作在下面两种模式之一：flowing 和 paused 。

　　在flowing模式下，可读流自动从系统底层读取数据，并通过EventEmitter接口的事件尽快将数据提供给应用

　　在paused模式下，必须显式调用 stream.read() 方法来从流中读取数据片段。

　　所有初始工作模式为 paused 的 Readable 流，可以通过下面三种途径切换到 flowing 模式：

<div class="cnblogs_code">
<pre>监听 'data' 事件。
调用 stream.resume() 方法。
调用 stream.pipe() 方法将数据发送到 Writable。</pre>
</div>

　　可读流可以通过下面途径切换到 paused 模式：

<div class="cnblogs_code">
<pre>如果不存在管道目标（pipe destination），可以通过调用 stream.pause() 方法实现。
如果存在管道目标，可以通过取消 'data' 事件监听，并调用 stream.unpipe() 方法移除所有管道目标来实现。</pre>
</div>

　　可读流需要先为其提供消费或忽略数据的机制，才能开始提供数据。如果消费机制被禁用或取消，可读流将尝试停止生成数据。

　　为了向后兼容，取消 'data' 事件监听并不会自动将流暂停。同时，如果存在管道目标（pipe destination），且目标状态变为可以接收数据（drain and ask for more data），调用了 stream.pause() 方法也并不保证流会一直 保持 暂停状态。

　　如果 Readable 切换到 flowing 模式，且没有消费者处理流中的数据，这些数据将会丢失。比如，调用了 readable.resume() 方法却没有监听 'data' 事件，或是取消了 'data' 事件监听，就有可能出现这种情况

【三种状态】

　　可读流的&ldquo;两种操作模式&rdquo;是一种简单抽象。它抽象了在可读流实现（Readable stream implementation）内部发生的复杂的状态管理过程。

　　在任意时刻，任意可读流应确切处于下面三种状态之一：

<div class="cnblogs_code">
<pre>readable._readableState.flowing = null
readable._readableState.flowing = false
readable._readableState.flowing = true</pre>
</div>

　　若 readable._readableState.flowing 为 null，由于不存在数据消费者，可读流将不会产生数据。

　　如果监听 'data' 事件，调用 readable.pipe() 方法，或者调用 readable.resume() 方法， readable._readableState.flowing 的值将会变为 true 。这时，随着数据生成，可读流开始频繁触发事件。

　　调用 readable.pause() 方法， readable.unpipe() 方法， 或者接收 &ldquo;背压&rdquo;（back pressure）， 将导致 readable._readableState.flowing 值变为 false。 这将暂停事件流，但 不会 暂停数据生成。

　　当 readable._readableState.flowing 值为 false 时， 数据可能堆积到流的内部缓存中

　　可读流 API 的演化贯穿了多个 Node.js 版本，提供了多种方法来消费流数据。通常开发者应该选择其中一种来消费数据，而不应该在单个流使用多种方法来消费数据

　　对于大多数用户，建议使用readable.pipe()方法来消费流数据，因为它是最简单的一种实现。开发者如果要精细地控制数据传递和产生的过程，可以使用EventEmitter 和 readable.pause()/readable.resume() 提供的 API&nbsp;

【'close' 事件】

　　'close'事件将在流或其底层资源(比如一个文件)关闭后触发。'close'事件触发后，该流将不会再触发任何事件

　　[注意]不是所有 Readable 都会触发 'close' 事件

【'data' 事件】

<div class="cnblogs_code">
<pre>chunk &lt;Buffer&gt; | &lt;string&gt; | &lt;any&gt; 数据片段。对于非对象模式的可读流，这是一个字符串或者 Buffer。 对于对象模式的可读流，这可以是除 null 以外的任意类型 JavaScript 值。</pre>
</div>

　　'data' 事件会在流将数据传递给消费者时触发。当流转换到 flowing 模式时会触发该事件。调用 readable.pipe()， readable.resume() 方法，或为 'data' 事件添加回调可以将流转换到 flowing 模式。 'data' 事件也会在调用 readable.read() 方法并有数据返回时触发。

　　在没有明确暂停的流上添加'data'事件监听会将流转换为flowing模式。数据会在可用时尽快传递给下个流程

　　如果调用 readable.setEncoding() 方法明确为流指定了默认编码，回调函数将接收到一个字符串，否则接收到的数据将是一个 Buffer 实例

<div class="cnblogs_code">
<pre>const readable = getReadableStreamSomehow();
readable.on('data', (chunk) =&gt; {
  console.log(`Received ${chunk.length} bytes of data.`);
});</pre>
</div>

【'end' 事件】

　　'end' 事件将在流中再没有数据可供消费时触发。

　　[注意]'end' 事件只有在数据被完全消费后才会触发 。 可以在数据被完全消费后，通过将流转换到 flowing 模式， 或反复调用 stream.read() 方法来实现这一点

<div class="cnblogs_code">
<pre>const readable = getReadableStreamSomehow();
readable.on('data', (chunk) =&gt; {
  console.log(`Received ${chunk.length} bytes of data.`);
});
readable.on('end', () =&gt; {
  console.log('There will be no more data.');
});</pre>
</div>

【'error' 事件】

　　'error' 事件可以在任何时候在可读流实现（Readable implementation）上触发。 通常，这会在底层系统内部出错从而不能产生数据，或当流的实现试图传递错误数据时发生。

　　回调函数将接收到一个 Error 对象

【'readable' 事件】

　　'readable' 事件将在流中有数据可供读取时触发。在某些情况下，为 'readable' 事件添加回调将会导致一些数据被读取到内部缓存中

<div class="cnblogs_code">
<pre>const readable = getReadableStreamSomehow();
readable.on('readable', () =&gt; {
  // 有一些数据可读了
});</pre>
</div>

　　当到达流数据尾部时， 'readable' 事件也会触发。触发顺序在 'end' 事件之前。

　　事实上， 'readable' 事件表明流有了新的动态：要么是有了新的数据，要么是到了流的尾部。 对于前者， stream.read() 将返回可用的数据。而对于后者， stream.read() 将返回 null。 例如，下面的例子中的 foo.txt 是一个空文件：　　

<div class="cnblogs_code">
<pre>const fs = require('fs');
const rr = fs.createReadStream('foo.txt');
rr.on('readable', () =&gt; {
  console.log('readable:', rr.read());
});
rr.on('end', () =&gt; {
  console.log('end');
});</pre>
</div>

　　[注意]通常情况下， 应该使用 readable.pipe() 方法和 'data' 事件机制，而不是 'readable' 事件

【readable.isPaused()】

<div class="cnblogs_code">
<pre>返回： &lt;boolean&gt;</pre>
</div>

　　readable.isPaused() 方法返回可读流的当前操作状态。 该方法主要是在 readable.pipe() 方法的底层机制中用到。大多数情况下，没有必要直接使用该方法

<div class="cnblogs_code">
<pre>const readable = new stream.Readable();

readable.isPaused(); // === false
readable.pause();
readable.isPaused(); // === true
readable.resume();
readable.isPaused(); // === false</pre>
</div>

【readable.pause()】

<div class="cnblogs_code">
<pre>　　返回： this</pre>
</div>

　　readable.pause() 方法将会使 flowing 模式的流停止触发 'data' 事件， 进而切出 flowing 模式。任何可用的数据都将保存在内部缓存中

<div class="cnblogs_code">
<pre>const readable = getReadableStreamSomehow();
readable.on('data', (chunk) =&gt; {
  console.log(`Received ${chunk.length} bytes of data.`);
  readable.pause();
  console.log('There will be no additional data for 1 second.');
  setTimeout(() =&gt; {
    console.log('Now data will start flowing again.');
    readable.resume();
  }, 1000);
});</pre>
</div>

【readable.pipe(destination[, options])】

<div class="cnblogs_code">
<pre>    destination &lt;stream.Writable&gt; 数据写入目标
    options &lt;Object&gt; Pipe 选项
        end &lt;boolean&gt; 在 reader 结束时结束 writer 。默认为 true。</pre>
</div>

　　readable.pipe() 绑定一个 Writable 到 readable 上， 将可写流自动切换到 flowing 模式并将所有数据传给绑定的 Writable。数据流将被自动管理。这样，即使是可读流较快，目标可写流也不会超负荷（overwhelmed）。

　　下面例子将 readable 中的所有数据通过管道传递给名为 file.txt 的文件

<div class="cnblogs_code">
<pre>const readable = getReadableStreamSomehow();
const writable = fs.createWriteStream('file.txt');
// readable 中的所有数据都传给了 'file.txt'
readable.pipe(writable);</pre>
</div>

　　可以在单个可读流上绑定多个可写流。

　　readable.pipe() 方法返回目标流的引用，这样就可以对流进行链式地管道操作：

<div class="cnblogs_code">
<pre>const r = fs.createReadStream('file.txt');
const z = zlib.createGzip();
const w = fs.createWriteStream('file.txt.gz');
r.pipe(z).pipe(w);</pre>
</div>

　　默认情况下，当源可读流(the source Readable stream)触发'end'事件时，目标流也会调用stream.end()方法从而结束写入。要禁用这一默认行为， end选项应该指定为false，这将使目标流保持打开， 如下所示：

<div class="cnblogs_code">
<pre>reader.pipe(writer, { end: false });
reader.on('end', () =&gt; {
  writer.end('Goodbye\n');
});</pre>
</div>

　　如果可读流在处理时发生错误，目标可写流不会自动关闭。 如果发生错误，需要手动关闭所有流以避免内存泄漏。

　　[注意]不管对 process.stderr 和 process.stdout 指定什么选项，它们都是直到 Node.js 进程退出才关闭

【readable.read([size])】

<div class="cnblogs_code">
<pre>size &lt;number&gt; Optional argument to specify how much data to read.
Return &lt;string&gt; | &lt;Buffer&gt; | &lt;null&gt;</pre>
</div>

　　readable.read（）方法从内部缓冲区中抽出并返回一些数据。 如果没有可读的数据，返回null。readable.read()方法默认数据将作为&ldquo;Buffer&rdquo;对象返回 ，除非已经使用readable.setEncoding（）方法设置编码或流运行在对象模式。

　　可选的size参数指定要读取的特定数量的字节。如果size字节不可读，将返回null除非流已经结束，在这种情况下所有保留在内部缓冲区的数据将被返回（即使它超过size 字节 ）

　　如果没有指定size参数，则内部缓冲区包含的所有数据将返回。

　　readable.read()方法只应该在暂停模式下的可读流上运行。在流模式下，readable.read()自动调用直到内部缓冲区的数据完全耗尽

<div class="cnblogs_code">
<pre>const readable = getReadableStreamSomehow();
readable.on('readable', () =&gt; {
  let chunk;
  while (null !== (chunk = readable.read())) {
    console.log(`Received ${chunk.length} bytes of data.`);
  }
});</pre>
</div>

　　一般来说，避免使用'readable'事件和readable.read（）方法，使用readable.pipe()或'data'事件代替

　　无论size参数的值是什么，对象模式中的可读流将始终返回调用readable.read(size)的单个项目。

　　[注意]如果readable.read()方法返回一个数据块，那么一个'data'事件也将被发送。在已经被发出的'end'事件后调用stream.read（[size]）事件将返回null。不会抛出运行时错误

【readable.resume()】

<div class="cnblogs_code">
<pre>Returns: this</pre>
</div>

　　readable.resume()方法使一个显式暂停的可读流恢复发出&ldquo;数据&rdquo;事件，将流转换为流模式。&nbsp;

　　readable. resume()方法可用于从流中完全地使用数据，而不需要实际处理任何数据，如以下示例所示:

<div class="cnblogs_code">
<pre>getReadableStreamSomehow()
  .resume()
  .on('end', () =&gt; {
    console.log('Reached the end, but did not read anything.');
  });</pre>
</div>

【readable.setEncoding(encoding)】

<div class="cnblogs_code">
<pre>encoding &lt;string&gt; 要使用的编码
Returns: this</pre>
</div>

　　readble.setEncoding() 方法会为从可读流读入的数据设置字符编码

　　By default, no encoding is assigned and stream data will be returned as Buffer objects. 设置编码会使得该流数据返回指定编码的字符串而不是Buffer对象。例如，调用readable.setEncoding('utf-8')会使得输出数据作为UTF-8数据解析，并作为字符串返回。调用readable.setEncoding('hex')使得数据被编码成16进制字符串格式。

　　可读流会妥善处理多字节字符，如果仅仅直接从流中取出Buffer对象，很可能会导致错误解码

<div class="cnblogs_code">
<pre>const readable = getReadableStreamSomehow();
readable.setEncoding('utf8');
readable.on('data', (chunk) =&gt; {
  assert.equal(typeof chunk, 'string');
  console.log('got %d characters of string data', chunk.length);
});</pre>
</div>

【readable.unpipe([destination])】

<div class="cnblogs_code">
<pre>destination &lt;stream.Writable&gt;  可选的特定流到unpipe</pre>
</div>

　　unpipe()方法通过使用stream. pipe()方法来分离之前附加的可写流。

　　如果没有指定目的地，则所有管道都是独立的。如果指定了目的地，但是没有设置管道，则什么都不做

<div class="cnblogs_code">
<pre>const readable = getReadableStreamSomehow();
const writable = fs.createWriteStream('file.txt');
// All the data from readable goes into 'file.txt',
// but only for the first second
readable.pipe(writable);
setTimeout(() =&gt; {
  console.log('Stop writing to file.txt');
  readable.unpipe(writable);
  console.log('Manually close the file stream');
  writable.end();
}, 1000);
</pre>
</div>

【readable.unshift(chunk)】

<div class="cnblogs_code">
<pre>chunk &lt;Buffer&gt; | &lt;Uint8Array&gt; | &lt;string&gt; | &lt;any&gt; 将数据块移到读队列上。对于不以对象模式操作的流，块必须是字符串、缓冲区或Uint8Array。对于对象模式流，块可能是除了null之外的任何JavaScript值。</pre>
</div>

　　unshift()方法将数据块返回到内部缓冲区中。这在某些情况下是有用的，因为在某些情况下，流被需要&ldquo;不消耗&rdquo;一些数据的代码所消耗，而这些数据是乐观地从源代码中提取出来的，这样数据就可以传递给其他的一方。
　　[注意]在&ldquo;end&rdquo;事件发出或将抛出运行时错误之后，不能调用流。使用stream. unshift()的开发人员通常应该考虑改用转换流

<div class="cnblogs_code">
<pre>// Pull off a header delimited by \n\n
// use unshift() if we get too much
// Call the callback with (error, header, stream)
const StringDecoder = require('string_decoder').StringDecoder;
function parseHeader(stream, callback) {
  stream.on('error', callback);
  stream.on('readable', onReadable);
  const decoder = new StringDecoder('utf8');
  let header = '';
  function onReadable() {
    let chunk;
    while (null !== (chunk = stream.read())) {
      const str = decoder.write(chunk);
      if (str.match(/\n\n/)) {
        // found the header boundary
        const split = str.split(/\n\n/);
        header += split.shift();
        const remaining = split.join('\n\n');
        const buf = Buffer.from(remaining, 'utf8');
        stream.removeListener('error', callback);
        // remove the readable listener before unshifting
        stream.removeListener('readable', onReadable);
        if (buf.length)
          stream.unshift(buf);
        // now the body of the message can be read from the stream.
        callback(null, header, stream);
      } else {
        // still reading the header.
        header += str;
      }
    }
  }
}</pre>
</div>

【readable.destroy([error])】

　　销毁流，并发出&ldquo;错误&rdquo;。调用后，可读流将释放任何内部资源。实现者不应该覆盖此方法，而是实现readable._destroy

&nbsp;

### 读写流

　　读写流又叫双工流，就是同时实现了 Readable 和 Writable 的流，即可以作为上游生产数据，又可以作为下游消费数据，这样可以处于数据流动管道的中间部分

<div class="cnblogs_code">
<pre>rs.pipe(rws1).pipe(rws2).pipe(rws3).pipe(ws);</pre>
</div>

　　在 NodeJS 中双工流常用的有两种：Duplex和Transform

【stream.Duplex】

　　双工流（Duplex streams）是同时实现了 Readable and Writable 接口

<div class="cnblogs_code">
<pre>const Duplex = require('stream').Duplex;

const myDuplex = new Duplex({
  read(size) {
    // ...
  },
  write(chunk, encoding, callback) {
    // ...
  }
});</pre>
</div>

　　Duplex 实例内同时包含可读流和可写流，在实例化 Duplex 类的时候可以传递几个参数

<div class="cnblogs_code">
<pre>readableObjectMode : 可读流是否设置为 ObjectMode，默认 false
writableObjectMode : 可写流是否设置为 ObjectMode，默认 false
allowHalfOpen : 默认 true， 设置成 false 的话，当写入端结束的时，流会自动的结束读取端，反之亦然。</pre>
</div>

　　双工流（Duplex streams） 的例子包括:

<div class="cnblogs_code">
<pre>tcp sockets
zlib streams
crypto streams</pre>
</div>

&nbsp;

### 转换流

【stream.Transform】

　　转换流（Transform streams） 是双工 Duplex 流，它的输出是从输入计算得来。 它实现了Readable 和 Writable 接口

<div class="cnblogs_code">
<pre> transform.prototype._transform = function (data, encoding, callback) {
  this.push(data);
  callback();
};

transform.prototype._transform = function (data, encoding, callback) {
  callback(null, data);
};</pre>
</div>

　　Transform 同样是双工流，看起来和 Duplex 重复了，但两者有一个重要的区别：Duplex 虽然同时具备可读流和可写流，但两者是相对独立的；Transform 的可读流的数据会经过一定的处理过程自动进入可写流。

　　虽然会从可读流进入可写流，但并不意味这两者的数据量相同，上面说的一定的处理逻辑会决定如果 tranform 可读流，然后放入可写流，transform 原义即为转变，很贴切的描述了 Transform 流作用。

　　我们最常见的压缩、解压缩用的 zlib 即为 Transform 流，压缩、解压前后的数据量明显不同，而流的作用就是输入一个 zip 包，输入一个解压文件或反过来。我们平时用的大部分双工流都是 Transform。

　　转换流（Transform streams） 的例子包括:

<div class="cnblogs_code">
<pre>zlib streams
crypto streams</pre>
</div>

【socket】

　　net 模块可以用来创建 socket，socket 在 NodeJS 中是一个典型的 Duplex

<div class="cnblogs_code">
<pre>var net = require('net');

//创建客户端
var client = net.connect({port: 1234}, function() {
    console.log('已连接到服务器');
    client.write('Hi!');
});

//data事件监听。收到数据后，断开连接
client.on('data', function(data) {
    console.log(data.toString());
    client.end();
});

//end事件监听，断开连接时会被触发
client.on('end', function() {
    console.log('已与服务器断开连接');
});</pre>
</div>

　　可以看到 client 就是一个 Duplex，可写流用于向服务器发送消息，可读流用于接受服务器消息，两个流内的数据并没有直接的关系

【gulp】

　　gulp 非常擅长处理代码本地构建流程

<div class="cnblogs_code">
<pre>gulp.src('client/templates/*.jade')
  .pipe(jade())
  .pipe(minify())
  .pipe(gulp.dest('build/minified_templates'));</pre>
</div>

　　其中 jada() 和 minify() 就是典型的 Transform，处理流程大概是

<div class="cnblogs_code">
<pre>.jade 模板文件 -&gt; jade() -&gt; html 文件 -&gt; minify -&gt; 压缩后的 html</pre>
</div>

　　可以看出，jade() 和 minify() 都是对输入数据做了些特殊处理，然后交给了输出数据。

　　在平时使用的时候，当一个流同时面向生产者和消费者服务的时候我们会选择 Duplex，当只是对数据做一些转换工作的时候我们便会选择使用Tranform

&nbsp;

### 用途

　　写程序需要读取某个配置文件 config.json，这时候简单分析一下

<div class="cnblogs_code">
<pre>数据：config.json 的内容
方向：设备（物理磁盘文件） -&gt; NodeJS 程序</pre>
</div>

　　我们应该使用 readable 流来做此事

<div class="cnblogs_code">
<pre>const fs = require('fs');
const FILEPATH = '...';
const rs = fs.createReadStream(FILEPATH);</pre>
</div>

　　通过 fs 模块提供的 createReadStream() 方法我们轻松的创建了一个可读的流，这时候 config.json 的内容从设备流向程序。我们并没有直接使用 Stream 模块，因为 fs 内部已经引用了 Stream 模块，并做了封装。

　　有了数据后我们需要处理，比如需要写到某个路径 DEST ，这时候我们遍需要一个 writable 的流，让数据从程序流向设备

<div class="cnblogs_code">
<pre>const ws = fs.createWriteStream(DEST);</pre>
</div>

　　两种流都有了，也就是两个数据加工器，那么我们如何通过类似 Unix 的管道符号 | 来链接流呢？在 NodeJS 中管道符号就是 pipe() 方法。

<div class="cnblogs_code">
<pre>const fs = require('fs');
const FILEPATH = '...';

const rs = fs.createReadStream(FILEPATH);
const ws = fs.createWriteStream(DEST);

rs.pipe(ws);</pre>
</div>

　　这样我们利用流实现了简单的文件复制功能，有个值得注意的地方是，数据必须是从上游 pipe 到下游，也就是从一个 readable 流 pipe 到 writable 流

　　如果有个需求，把本地一个 package.json 文件中的所有字母都改为小写，并保存到同目录下的 package-lower.json 文件下

　　这时候我们就需要用到双向的流了，假定我们有一个专门处理字符转小写的流 lower，那么代码写出来大概是这样的

<div class="cnblogs_code">
<pre>const fs = require('fs');
const rs = fs.createReadStream('./package.json');
const ws = fs.createWriteStream('./package-lower.json');
rs.pipe(lower).pipe(ws);</pre>
</div>
<div class="cnblogs_code">
<pre>rs -&gt; lower：lower 在下游，所以 lower 需要是个 writable 流
lower -&gt; ws：相对而言，lower 又在上游，所以 lower 需要是个 readable 流</pre>
</div>

　　当然如果我们还有额外一些处理动作，比如字母还需要转成 ASCII 码

<div class="cnblogs_code">
<pre>rs.pipe(lower).pipe(acsii).pipe(ws);</pre>
</div>

　　同样 ascii 也必须是双向的流。这样处理的逻辑是非常清晰的

　　有个用户需要在线看视频的场景，假定我们通过 HTTP 请求返回给用户电影内容

<div class="cnblogs_code">
<pre>const http = require('http');
const fs = require('fs');

http.createServer((req, res) =&gt; {
   fs.readFile(moviePath, (err, data) =&gt; {
      res.end(data);
   });
}).listen(8080);</pre>
</div>

　　这样的代码有两个明显的问题

　　1、电影文件需要读完之后才能返回给客户，等待时间超长

　　2、电影文件需要一次放入内存中，相似动作多了，内存吃不消

　　用流可以将电影文件一点点的放入内存中，然后一点点的返回给客户（利用了 HTTP 协议的 Transfer-Encoding: chunked 分段传输特性），用户体验得到优化，同时对内存的开销明显下降

<div class="cnblogs_code">
<pre>const http = require('http');
const fs = require('fs');
http.createServer((req, res) =&gt; {
   fs.createReadStream(moviePath).pipe(res);
}).listen(8080);</pre>
</div>

　　除了上述好处，代码优雅了很多，拓展也比较简单。比如需要对视频内容压缩，我们可以引入一个专门做此事的流，这个流不用关心其它部分做了什么，只要是接入管道中就可以了

<div class="cnblogs_code">
<pre>const http = require('http');
const fs = require('fs');
const oppressor = require(oppressor);
http.createServer((req, res) =&gt; {
   fs.createReadStream(moviePath)
      .pipe(oppressor)
      .pipe(res);
}).listen(8080);</pre>
</div>

　　可以看出来，使用流后，我们的代码逻辑变得相对独立，可维护性也会有一定的改善

【文件复制】

　　下面以流stream来实现文件复制

<div class="cnblogs_code">
<pre>var fs = require('fs');
var readStream = fs.createReadStream('a.txt');
var writeStream = fs.createWriteStream('aa.txt');
//读取数据
readStream.on('data',function(chunk){
    //如果读取的数据还在缓存区，还没有被写入
    if(writeStream.write(chunk) === false){
        //停止读数据
        readStream.pause();
    }
});
//如果数据读取完成
readStream.on('end',function(chunk){
    //停止写入数据
    writeStream.end();
});
//如果缓存区的数据被消耗完
writeStream.on('drain',function(){
    //接着读取数据
    readStream.resume();
});</pre>
</div>

　　使用pipe()方法进行简化

<div class="cnblogs_code">
<pre>var fs = require('fs');
var readStream = fs.createReadStream('a.txt');
var writeStream = fs.createWriteStream('aa.txt');
readStream.pipe(writeStream);</pre>
</div>

【远程访问文件】

<div class="cnblogs_code">
<pre>var http = require('http');
var fs = require('fs');
http.createServer(function(req,res){
    fs.readFile('./a.txt',function(err,data){
        if(err){
            res.end('file not exist!');
        }else{
            res.writeHeader(200,{'Context-Type':'text/html'});
            res.end(data);
        }
    })
}).listen(8000);</pre>
</div>

　　如果使用pipe()方法，则简单很多

<div class="cnblogs_code">
<pre>var http = require('http');
var fs = require('fs');
http.createServer(function(req,res){
    fs.createReadStream('./a.txt').pipe(res);
}).listen(8000);</pre>
</div>

　　甚至可以加载网上的文件，使用插件request

![stream1](https://pic.xiaohuochai.site/blog/nodejs_stream1.png)

<div class="cnblogs_code">
<pre>var http = require('http');
var fs = require('fs');
var request = require('request');
http.createServer(function(req,res){
    request('https://www.cnblogs.com/images/logo_small.gif').pipe(res);
}).listen(8000);</pre>
</div>

![stream2](https://pic.xiaohuochai.site/blog/nodejs_stream2.png)


【自定义输入输出】

<div class="cnblogs_code">
<pre>var stream = require('stream');
var Readable = stream.Readable;
var Writable = stream.Writable;
var readStream = new Readable();
var writeStream = new Writable();
readStream.push('I ');
readStream.push('Love ');
readStream.push('NodeJS\n');
readStream.push(null);
writeStream._write = function(chunk,encode,cb){
    console.log(chunk.toString());
    cb();
}
//I 
//Love 
//NodeJS
readStream.pipe(writeStream);</pre>
</div>

&nbsp;【使用转换流进行功能定制】

<div class="cnblogs_code">
<pre>var stream = require('stream');
var util = require('util');
function ReadStream(){
    stream.Readable.call(this);
}
util.inherits(ReadStream,stream.Readable);
ReadStream.prototype._read = function(){
    this.push('I ');
    this.push('Love ');
    this.push('NodeJS\n');
    this.push(null);    
}
function WriteStream(){
    stream.Writable.call(this);
    this._cached = Buffer.from('');
}
util.inherits(WriteStream,stream.Writable);
WriteStream.prototype._write = function(chunk,encode,cb){
    console.log(chunk.toString());
    cb();
}
function TransformStream(){
    stream.Transform.call(this);
}
util.inherits(TransformStream,stream.Transform);
TransformStream.prototype._transform = function(chunk,encode,cb){
    this.push(chunk);
    cb();
}
TransformStream.prototype._flush = function(cb){
    this.push('Oh Yeah!');
    cb();
}
var readStream = new ReadStream();
var writeStream = new WriteStream();
var transformStream = new TransformStream();
//I 
//Love 
//NodeJS
//
//Oh Yeah!
readStream.pipe(transformStream).pipe(writeStream);</pre>
</div>

