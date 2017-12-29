# buffer对象

　　在ES6引入[TypedArray](http://www.cnblogs.com/xiaohuochai/p/6534621.html)之前，JavaScript语言没有读取或操作二进制数据流的机制。Buffer类被引入作为Nodejs的API的一部分，使其可以在TCP流和文件系统操作等场景中处理二进制数据流。现在TypedArray已经被添加进ES6中，Buffer类以一种更优与更适合Node.js用例的方式实现了[Uint8Array](http://www.cnblogs.com/xiaohuochai/p/6534621.html#anchor3)。本文将详细介绍buffer对象

&nbsp;

### 概述

　　由于应用场景不同，在Node中，应用需要处理网络协议、操作数据库、处理图片、接收上传文件等，在网络流和文件的操作中，还要处理大量二进制数据，JavaScript自有的字符串远远不能满足这些需求，于是Buffer对象应运而生

　　Buffer是一个典型的JavaScript与C++结合的模块，它将性能相关部分用C++实现，将非性能相关的部分用JavaScript实现。Buffer类的实例类似于整数数组，除了其是大小固定的、且在V8堆外分配物理内存。Buffer的大小在其创建时就已确定，且不能调整大小

　　由于Buffer太过常见，Node在进程启动时就已经加载了它，并将其放在全局对象(global)上。所以在使用Buffer时，无须通过require()即可直接使用

<div class="cnblogs_code">
<pre>/*
{ [Function: Buffer]
  poolSize: 8192,
  from: [Function],
  alloc: [Function],
  allocUnsafe: [Function],
  allocUnsafeSlow: [Function],
  isBuffer: [Function: isBuffer],
  compare: [Function: compare],
  isEncoding: [Function],
  concat: [Function],
  byteLength: [Function: byteLength] }
 */
console.log(Buffer);</pre>
</div>

&nbsp;

### 创建

　　在 Node.js v6之前的版本中，`Buffer`实例是通过`Buffer`构造函数创建的，它根据提供的参数返回不同的&nbsp;Buffer，而新版本的nodejs则提供了对应的方法

　　1、new Buffer(size)。传一个数值作为第一个参数给Buffer()(如new Buffer(10))，则分配一个指定大小的新建的Buffer对象

　　分配给这种Buffer实例的内存是未初始化的(没有用0填充)。虽然这样的设计使得内存的分配非常快，但已分配的内存段可能包含潜在的敏感旧数据

　　这种Buffer实例必须手动地被初始化，可以使用buf.fill(0)或写满这个Buffer。虽然这种行为是为了提高性能而有意为之的，但开发经验表明，创建一个快速但未初始化的Buffer与创建一个慢点但更安全的Buffer之间需要有更明确的区分

<div class="cnblogs_code">
<pre>var buf = new Buffer(5);
console.log(buf);//&lt;Buffer e0 f7 1d 01 00&gt;
buf.fill(0);
console.log(buf);//&lt;Buffer 00 00 00 00 00&gt;</pre>
</div>

　　[注意]当我们为一个Buffer对象分配空间大小后，其长度就是固定的，不能更改

<div class="cnblogs_code">
<pre>var buf = new Buffer(5);
console.log(buf);//&lt;Buffer b8 36 70 01 02&gt;
buf[0] = 1;
console.log(buf);//&lt;Buffer 01 36 70 01 02&gt;
buf[10] = 1;
console.log(buf);//&lt;Buffer 01 79 43 6f 6e&gt;</pre>
</div>

　　【Buffer.allocUnsafe(size)】

&nbsp;　　在新版本中，由Buffer.allocUnsafe(size)方法替代，来分配一个大小为&nbsp;`size`&nbsp;字节的新建的没有用0填充的Buffer。可以使用`buf.fill(0)`初始化`Buffer`实例为0

<div class="cnblogs_code">
<pre>var buf = Buffer.allocUnsafe(10);
console.log(buf);//&lt;Buffer 75 63 74 42 79 4c 65 6e 67 74&gt;
buf.fill(0);
console.log(buf);//&lt;Buffer 00 00 00 00 00 00 00 00 00 00&gt;</pre>
</div>

　　【Buffer.alloc(size[, fill[, encoding]])】

　　在新版本中，使用Buffer.alloc(size)方法可以生成一个安全的buffer对象，参数size &lt;Integer&gt; 新建的 Buffer 期望的长度；fill &lt;String&gt; | &lt;Buffer&gt; | &lt;Integer&gt; 用来预填充新建的 Buffer 的值。 默认: 0；encoding &lt;String&gt; 如果 fill 是字符串，则该值是它的字符编码。 默认: 'utf8'

　　分配一个大小为 size 字节的新建的 Buffer 。 如果 fill 为 undefined ，则该 Buffer 会用 0 填充

<div class="cnblogs_code">
<pre>var buf = Buffer.alloc(5);
console.log(buf);//&lt;Buffer 00 00 00 00 00&gt;</pre>
</div>

　　2、new Buffer(array或buffer)。传一个数组或Buffer作为第一个参数，则将所传对象的数据拷贝到Buffer&nbsp;

<div class="cnblogs_code">
<pre>var buf1 = new Buffer([1, 2, 3, 4, 5]);
console.log(buf1);//&lt;Buffer 01 02 03 04 05&gt;
var buf2 = new Buffer(buf1);
console.log(buf2);//&lt;Buffer 01 02 03 04 05&gt;</pre>
</div>

　　【Buffer.from(array或buffer)】

&nbsp;　　在新版本中，由Buffer.from(array或buffer)方法替代

<div class="cnblogs_code">
<pre>var buf1 = Buffer.from([1, 2, 3, 4, 5]);
console.log(buf1);//&lt;Buffer 01 02 03 04 05&gt;
var buf2 = Buffer.from(buf1);
console.log(buf2);//&lt;Buffer 01 02 03 04 05&gt;</pre>
</div>

　　3、new Buffer(string[, encoding])。第一个参数是字符串，第二个参数是编码方式，默认是'utf-8'

<div class="cnblogs_code">
<pre>var buf1 = new Buffer('this is a t&eacute;st');
console.log(buf1.toString());//this is a t&eacute;st
console.log(buf1.toString('ascii'));//this is a tC)st
var buf2 = new Buffer('7468697320697320612074c3a97374', 'hex');
console.log(buf2.toString());//this is a t&eacute;st</pre>
</div>

　　Node.js 目前支持的字符编码包括：

<div class="cnblogs_code">
<pre>'ascii' - 仅支持 7 位 ASCII 数据。如果设置去掉高位的话，这种编码是非常快的。
'utf8' - 多字节编码的 Unicode 字符。许多网页和其他文档格式都使用 UTF-8 。
'utf16le' - 2 或 4 个字节，小字节序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）。
'ucs2' - 'utf16le' 的别名。
'base64' - Base64 编码。当从字符串创建 Buffer 时，这种编码可接受&ldquo;URL 与文件名安全字母表&rdquo;。
'latin1' - 一种把 Buffer 编码成一字节编码的字符串的方式。
'binary' - 'latin1' 的别名。
'hex' - 将每个字节编码为两个十六进制字符。</pre>
</div>

　　【Buffer.from(string[, encoding])】

　　在新版本中，由Buffer.from(string[, encoding]方法替代

<div class="cnblogs_code">
<pre>var buf1 = Buffer.from('this is a t&eacute;st');
console.log(buf1.toString());//this is a t&eacute;st
console.log(buf1.toString('ascii'));//this is a tC)st
var buf2 = Buffer.from('7468697320697320612074c3a97374', 'hex');
console.log(buf2.toString());//this is a t&eacute;st</pre>
</div>

　　4、new Buffer(arrayBuffer[, byteOffset [, length]])。参数arrayBuffer &lt;ArrayBuffer&gt; 一个 ArrayBuffer，或一个 TypedArray 的 .buffer 属性；byteOffset &lt;Integer&gt; 开始拷贝的索引。默认为 0；length &lt;Integer&gt; 拷贝的字节数。默认为 arrayBuffer.length - byteOffset

<div class="cnblogs_code">
<pre>var arr = new Uint16Array(2);
arr[0] = 5000;
arr[1] = 4000;
var buf = new Buffer(arr.buffer);
console.log(buf);//&lt;Buffer 88 13 a0 0f&gt;
arr[1] = 6000;
console.log(buf);//&lt;Buffer 88 13 70 17&gt;</pre>
</div>

　　【Buffer.from(arrayBuffer[, byteOffset [, length]])】

　　在新版本中，由Buffer.from(arrayBuffer[, byteOffset [, length]])方法替代

<div class="cnblogs_code">
<pre>var arr = new Uint16Array(2);
arr[0] = 5000;
arr[1] = 4000;
var buf = Buffer.from(arr.buffer);
console.log(buf);//&lt;Buffer 88 13 a0 0f&gt;
arr[1] = 6000;
console.log(buf);//&lt;Buffer 88 13 70 17&gt;</pre>
</div>

### 类数组

　　Buffer对象类似于数组，它的元素为16进制的两位数，即0到255的数值

<div class="cnblogs_code">
<pre>console.log(Buffer.from('test'));//&lt;Buffer 74 65 73 74&gt;</pre>
</div>

【长度】

　　不同编码的字符串占用的元素个数各不相同，中文字在UTF-8编码下占用3个元素，字母和半角标点符号占用1个元素

<div class="cnblogs_code">
<pre>var buf = Buffer.from('match');
console.log(buf.length);//5
var buf = Buffer.from('火柴');
console.log(buf.length);//6</pre>
</div>

【下标】

　　Buffer受Array类型的影响很大，可以访问length属性得到长度，也可以通过下标访问元素

<div class="cnblogs_code">
<pre>var buf = Buffer.alloc(10); 
console.log(buf.length); // =&gt; 10</pre>
</div>

　　上述代码分配了一个长10字节的Buffer对象。我们可以通过下标对它进行赋值

<div class="cnblogs_code">
<pre>buf[0] = 100;
console.log(buf[0]); // =&gt; 100</pre>
</div>

　　要注意的是，给元素的赋值如果小于0，就将该值逐次加256，直到得到一个0到255之间的整数。如果得到的数值大于255，就逐次减256，直到得到0~255区间内的数值。如果是小数，舍弃小数部分，只保留整数部分

<div class="cnblogs_code">
<pre>buf[0] = -100;
console.log(buf[0]); // 156
buf[1] = 300;
console.log(buf[1]); // 44
buf[2] = 3.1415;
console.log(buf[2]); // 3</pre>
</div>

【fromcharcode】

　　通常地，创建的buffer对象的内容是其uft-8字符编码

<div class="cnblogs_code">
<pre>var buf = Buffer.from('match'); 
console.log(buf); //&lt;Buffer 6d 61 74 63 68&gt;</pre>
</div>

　　如果要访问其对应的字符，则需要使用字符串的[fromCharCode()方法](http://www.cnblogs.com/xiaohuochai/p/5612962.html#anchor3)

<div class="cnblogs_code">
<pre>console.log(String.fromCharCode(buf[0]));//'m'</pre>
</div>

&nbsp;

### 内存分配

　　Buffer对象的内存分配不是在V8的堆内存中，而是在Node的C++层面实现内存的申请的。因为处理大量的字节数据不能采用需要一点内存就向操作系统申请一点内存的方式，这可能造成大量的内存申请的系统调用，对操作系统有一定压力。为此Node在内存的使用上应用的是在C++层面申请内存、在JavaScript中分配内存的策略

　　为了高效地使用申请来的内存，Node采用了slab分配机制。slab是一种动态内存管理机制，最早诞生于SunOS操作系统(Solaris)中，目前在一些*nix操作系统中有广泛的应用，如FreeBSD和Linux。简单而言，slab就是一块申请好的固定大小的内存区域。slab具有如下3种状态：full：完全分配状态；partial：部分分配状态；empty：没有被分配状态

　　当我们需要一个Buffer对象，可以通过以下方式分配指定大小的Buffer对象：

<div class="cnblogs_code">
<pre>new Buffer(size);//旧
Buffer.alloc(size);//新</pre>
</div>

【poolSize】

　　poolSize属性是用于决定预分配的、内部&nbsp;`Buffer`&nbsp;实例池的大小的字节数。默认地，Node以8KB为界限来区分Buffer是大对象还是小对象：

<div class="cnblogs_code">
<pre>Buffer.poolSize = 8 * 1024;</pre>
</div>

　　这个8KB的值也就是每个slab的大小值，在JavaScript层面，以它作为单位单元进行内存的分配

　　1、分配小Buffer对象

　　如果指定Buffer的大小少于8KB，Node会按照小对象的方式进行分配。Buffer的分配过程中主要使用一个局部变量pool作为中间处理对象，处于分配状态的slab单元都指向它。以下是分配一个全新的slab单元的操作，它会将新申请的SlowBuffer对象指向它：

<div class="cnblogs_code">
<pre>var pool;
function allocPool() {
    pool = new SlowBuffer(Buffer.poolSize);
    pool.used = 0;
}</pre>
</div>

　　构造小Buffer对象时的代码如下：

<div class="cnblogs_code">
<pre>new Buffer(1024);//旧
Buffer.alloc(1024);//新</pre>
</div>

　　这次构造将会去检查pool对象，如果pool没有被创建，将会创建一个新的slab单元指向它：

<div class="cnblogs_code">
<pre>if (!pool || pool.length - pool.used &lt; this.length) allocPool();</pre>
</div>

　　同时当前Buffer对象的parent属性指向该slab，并记录下是从这个slab的哪个位置(offset)开始使用的，slab对象自身也记录被使用了多少字节，代码如下：

<div class="cnblogs_code">
<pre>this.parent = pool; 
this.offset = pool.used; 
pool.used += this.length;
if (pool.used &amp; 7) pool.used = (pool.used + 8) &amp; ~7;</pre>
</div>

　　这时候的slab状态为partial。当再次创建一个Buffer对象时，构造过程中将会判断这个slab的剩余空间是否足够。如果足够，使用剩余空间，并更新slab的分配状态。下面的代码创建了一个新的Buffer对象，它会引起一次slab分配：

<div class="cnblogs_code">
<pre>new Buffer(3000);//旧
Buffer.alloc(3000);//新</pre>
</div>

　　如果slab剩余的空间不够，将会构造新的slab，原slab中剩余的空间会造成浪费。例如，第一次构造1字节的Buffer对象，第二次构造8192字节的Buffer对象，由于第二次分配时slab中的空间不够，所以创建并使用新的slab，第一个slab的8KB将会被第一个1字节的Buffer对象独占。下面的代码一共使用了两个slab单元：

<div class="cnblogs_code">
<pre>new Buffer(1);//旧
Buffer.alloc(1);//新
new Buffer(8192);//旧
Buffer.alloc(8192);//新</pre>
</div>

　　要注意的是，由于同一个slab可能分配给多个Buffer对象使用，只有这些小Buffer对象在作用域释放并都可以回收时，slab的8KB空间才会被回收。尽管创建了1个字节的Buffer对象，但是如果不释放它，实际可能是8KB的内存没有释放

　　2、分配大Buffer对象

　　如果需要超过8KB的Buffer对象，将会直接分配一个SlowBuffer对象作为slab单元，这个slab单元将会被这个大Buffer对象独占

<div class="cnblogs_code">
<pre>// Big buffer, just alloc one
this.parent = new SlowBuffer(this.length); 
this.offset = 0;</pre>
</div>

　　这里的SlowBuffer类是在C++中定义的，虽然引用buffer模块可以访问到它，但是不推荐直接操作它，而是用Buffer替代

　　上面提到的Buffer对象都是JavaScript层面的，能够被V8的垃圾回收标记回收。但是其内部的parent属性指向的SlowBuffer对象却来自于Node自身C++中的定义，是C++层面上的Buffer对象，所用内存不在V8的堆中

　　综上，真正的内存是在Node的C++层面提供的，JavaScript层面只是使用它。当进行小而频繁的Buffer操作时，采用slab的机制进行预先申请和事后分配，使得JavaScript到操作系统之间不必有过多的内存申请方面的系统调用。对于大块的Buffer而言，则直接使用C++层面提供的内存，而无需细腻的分配操作

&nbsp;

### 转换

　　Buffer对象可以与字符串之间相互转换。目前支持的字符串编码类型有如下几种：ASCII、UTF-8、UTF-16LE/UCS-2、Base64、Binary、Hex

【write()】

　　一个Buffer对象可以存储不同编码类型的字符串转码的值，调用write()方法可以实现该目的

<div class="cnblogs_code">
<pre>buf.write(string, [offset], [length], [encoding])</pre>
</div>

　　string &lt;String&gt; 要写入 buf 的字符串

　　offset &lt;Integer&gt; 开始写入 string 的位置。默认: 0

　　length &lt;Integer&gt; 要写入的字节数。默认: buf.length - offset

　　encoding &lt;String&gt; string 的字符编码。默认: 'utf8'；返回: &lt;Integer&gt; 写入的字节数

　　根据 encoding 的字符编码写入 string 到 buf 中的 offset 位置。 length 参数是写入的字节数。 如果 buf 没有足够的空间保存整个字符串，则只会写入 string 的一部分。 只部分解码的字符不会被写入

<div class="cnblogs_code">
<pre>var buf = Buffer.alloc(5); 
console.log(buf); //&lt;Buffer 00 00 00 00 00&gt;
var len = buf.write('test',1,3);
console.log(buf);//&lt;Buffer 00 74 65 73 00&gt;
console.log(len);/3</pre>
</div>

　　由于可以不断写入内容到Buffer对象中，并且每次写入可以指定编码，所以Buffer对象中可以存在多种编码转化后的内容。需要小心的是，每种编码所用的字节长度不同，将Buffer反转回字符串时需要谨慎处理

【toString()】

　　实现Buffer向字符串的转换也十分简单，Buffer对象的toString()可以将Buffer对象转换为字符串

<div class="cnblogs_code">
<pre>buf.toString([encoding], [start], [end])</pre>
</div>

　　encoding - 使用的编码。默认为 'utf8'

　　start - 指定开始读取的索引位置，默认为 0

　　end - 结束位置，默认为缓冲区的末尾

　　返回 - 解码缓冲区数据并使用指定的编码返回字符串

<div class="cnblogs_code">
<pre>var buf =Buffer.alloc(26);
for (var i = 0 ; i &lt; 26 ; i++) {
  buf[i] = i + 97;
}
console.log( buf.toString('ascii'));//abcdefghijklmnopqrstuvwxyz
console.log( buf.toString('ascii',0,5));//abcde
console.log( buf.toString('utf8',0,5));//abcde
console.log( buf.toString(undefined,0,5));//abcde</pre>
</div>

【toJSON()】

　　将 Node Buffer 转换为 JSON 对象

<div class="cnblogs_code">
<pre>buf.toJSON()</pre>
</div>

　　返回&nbsp;`buf`&nbsp;的 JSON 格式

<div class="cnblogs_code">
<pre>var buf = Buffer.from('test');
var json = buf.toJSON(buf);
console.log(json);//{ type: 'Buffer', data: [ 116, 101, 115, 116 ] }</pre>
</div>

【isEncoding()】

　　目前比较遗憾的是，Node的Buffer对象支持的编码类型有限，只有少数的几种编码类型可以在字符串和Buffer之间转换。为此，Buffer提供了一个isEncoding()函数来判断编码是否支持转换

<div class="cnblogs_code">
<pre>Buffer.isEncoding(encoding)</pre>
</div>

　　将编码类型作为参数传入上面的函数，如果支持转换返回值为true，否则为false。很遗憾的是，在中国常用的GBK、GB2312和BIG-5编码都不在支持的行列中

<div class="cnblogs_code">
<pre>console.log(Buffer.isEncoding('utf8'));//true
console.log(Buffer.isEncoding('gbk'));//false</pre>
</div>

&nbsp;

### 类方法

【Buffer.byteLength(string[, encoding])】

　　Buffer.byteLength()方法返回一个字符串的实际字节长度。 这与 String.prototype.length 不同，因为那返回字符串的字符数

　　string &lt;String&gt; | &lt;Buffer&gt; | &lt;TypedArray&gt; | &lt;DataView&gt; | &lt;ArrayBuffer&gt; 要计算长度的值

　　encoding &lt;String&gt; 如果 string 是字符串，则这是它的字符编码。 默认: 'utf8'

　　返回: &lt;Integer&gt; string 包含的字节数

<div class="cnblogs_code">
<pre>var str = '火柴';
var buf = Buffer.from(str);
console.log(str.length);//2
console.log(buf.length);//6
console.log(buf.byteLength);//6</pre>
</div>

【Buffer.compare(buf1, buf2)】

　　该方法用于比较 buf1 和 buf2 ，通常用于 Buffer 实例数组的排序。 相当于调用 buf1.compare(buf2)&nbsp;

　　buf1 &lt;Buffer&gt;

　　buf2 &lt;Buffer&gt;

　　Returns: &lt;Integer&gt;

<div class="cnblogs_code">
<pre>var buf1 = Buffer.from('1234');
var buf2 = Buffer.from('0123');
var arr = [buf1, buf2];
var result = Buffer.compare(buf1,buf2);
console.log(result);//1
console.log(arr.sort());//[ &lt;Buffer 30 31 32 33&gt;, &lt;Buffer 31 32 33 34&gt; ]</pre>
</div>

【Buffer.concat(list[, totalLength])】

　　该方法返回一个合并了 list 中所有 Buffer 实例的新建的 Buffer

　　list &lt;Array&gt; 要合并的 Buffer 实例的数组

　　totalLength &lt;Integer&gt; 合并时 list 中 Buffer 实例的总长度

　　返回: &lt;Buffer&gt;

　　如果 list 中没有元素、或 totalLength 为 0 ，则返回一个新建的长度为 0 的 Buffer 。如果没有提供 totalLength ，则从 list 中的 Buffer 实例计算得到。 为了计算 totalLength 会导致需要执行额外的循环，所以提供明确的长度会运行更快

<div class="cnblogs_code">
<pre>var buf1 = Buffer.alloc(10);
var buf2 = Buffer.alloc(14);
var buf3 = Buffer.alloc(18);
var totalLength = buf1.length + buf2.length + buf3.length;
console.log(totalLength);//42
var bufA = Buffer.concat([buf1, buf2, buf3], totalLength); 
console.log(bufA);//&lt;Buffer 00 00 00 00 ...&gt;
console.log(bufA.length);//42</pre>
</div>

【Buffer.isBuffer(obj)】

　　如果&nbsp;`obj`&nbsp;是一个&nbsp;`Buffer`&nbsp;则返回&nbsp;`true`&nbsp;，否则返回&nbsp;`false`

<div class="cnblogs_code">
<pre>var buf = Buffer.alloc(5);
var str = 'test';
console.log(Buffer.isBuffer(buf));//true
console.log(Buffer.isBuffer(str));//false</pre>
</div>

&nbsp;

### 实例方法

【buf.slice([start[, end]])】

　　该方法返回一个指向相同原始内存的新建的 Buffer，但做了偏移且通过 start 和 end 索引进行裁剪

　　start &lt;Integer&gt; 新建的 Buffer 开始的位置。 默认: 0

　　end &lt;Integer&gt; 新建的 Buffer 结束的位置（不包含）。 默认: buf.length

　　返回: &lt;Buffer&gt;

<div class="cnblogs_code">
<pre>var buffer1 =Buffer.from('test');
console.log(buffer1);//&lt;Buffer 74 65 73 74&gt;
var buffer2 = buffer1.slice(1,3);
console.log(buffer2);//&lt;Buffer 65 73&gt;
console.log(buffer2.toString());//'es'</pre>
</div>

　　[注意]修改这个新建的&nbsp;`Buffer`&nbsp;切片，也会同时修改原始的&nbsp;`Buffer`&nbsp;的内存，因为这两个对象所分配的内存是重叠的

<div class="cnblogs_code">
<pre>var buffer1 =Buffer.from('test');
console.log(buffer1);//&lt;Buffer 74 65 73 74&gt;
var buffer2 = buffer1.slice(1,3);
console.log(buffer2);//&lt;Buffer 65 73&gt;
buffer2[0] = 0;
console.log(buffer1);//&lt;Buffer 74 00 73 74&gt;
console.log(buffer2);//&lt;Buffer 00 73&gt;</pre>
</div>

【buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])】

　　该方法用于拷贝 buf 的一个区域的数据到 target 的一个区域，即便 target 的内存区域与 buf 的重叠

　　target &lt;Buffer&gt; | &lt;Uint8Array&gt; 要拷贝进的 Buffer 或 Uint8Array

　　targetStart &lt;Integer&gt; target 中开始拷贝进的偏移量。 默认: 0

　　sourceStart &lt;Integer&gt; buf 中开始拷贝的偏移量。 当 targetStart 为 undefined 时忽略。 默认: 0

　　sourceEnd &lt;Integer&gt; buf 中结束拷贝的偏移量（不包含）。 当 sourceStart 为 undefined 时忽略。 默认: buf.length

　　返回: &lt;Integer&gt; 被拷贝的字节数

<div class="cnblogs_code">
<pre>var buffer1 =Buffer.from('test');
var buffer2 = Buffer.alloc(5);
var len = buffer1.copy(buffer2,1,3);
console.log(buffer1);//&lt;Buffer 74 65 73 74&gt;
console.log(buffer2);//&lt;Buffer 00 74 00 00 00&gt;
console.log(len);//1</pre>
</div>

【buf.compare(target[, targetStart[, targetEnd[, sourceStart[, sourceEnd]]]])】

　　该方法比较 buf 与 target，返回表明 buf 在排序上是否排在 target 之前、或之后、或相同。 对比是基于各自 Buffer 实际的字节序列

　　target &lt;Buffer&gt; 要比较的 Buffer

　　targetStart &lt;Integer&gt; target 中开始对比的偏移量。 默认: 0

　　targetEnd &lt;Integer&gt; target 中结束对比的偏移量（不包含）。 当 targetStart 为 undefined 时忽略。 默认: target.length

　　sourceStart &lt;Integer&gt; buf 中开始对比的偏移量。 当 targetStart 为 undefined 时忽略。 默认: 0

　　sourceEnd &lt;Integer&gt; buf 中结束对比的偏移量（不包含）。 当 targetStart 为 undefined 时忽略。 默认: buf.length

　　返回: &lt;Integer&gt;

　　如果 target 与 buf 相同，则返回 0&nbsp;

　　如果 target 排在 buf 前面，则返回 1&nbsp;

　　如果 target 排在 buf 后面，则返回 -1&nbsp;

<div class="cnblogs_code">
<pre>var buf1 = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8, 9]);
var buf2 = Buffer.from([5, 6, 7, 8, 9, 1, 2, 3, 4]);

// 输出: 0(buf2中的1234对比buf2中的1234)
console.log(buf1.compare(buf2, 5, 9, 0, 4));

// 输出: -1(buf2中的567891对比buf1中的56789)
console.log(buf1.compare(buf2, 0, 6, 4));

// 输出: 1(buf2中的1对比buf2中的6789)
console.log(buf1.compare(buf2, 5, 6, 5));</pre>
</div>

【buf.equals(otherBuffer)】

　　如果 buf 与 otherBuffer 具有完全相同的字节，则返回 true，否则返回 false

　　otherBuffer &lt;Buffer&gt; 要比较的 Buffer

　　返回: &lt;Boolean&gt;

<div class="cnblogs_code">
<pre>var buf1 = Buffer.from('ABC');
var buf2 = Buffer.from('ABC');
var buf3 = Buffer.from('abc');
console.log(buf1.equals(buf2));//true
console.log(buf1.equals(buf3));//false</pre>
</div>

【buf.fill(value[, offset[, end]][, encoding])】

　　value &lt;String&gt; | &lt;Buffer&gt; | &lt;Integer&gt; 用来填充 buf 的值

　　offset &lt;Integer&gt; 开始填充 buf 的位置。默认: 0

　　end &lt;Integer&gt; 结束填充 buf 的位置（不包含）。默认: buf.length

　　encoding &lt;String&gt; 如果 value 是一个字符串，则这是它的字符编码。 默认: 'utf8'

　　返回: &lt;Buffer&gt; buf 的引用

　　如果未指定 offset 和 end，则填充整个 buf。 这个简化使得一个Buffer的创建与填充可以在一行内完成

<div class="cnblogs_code">
<pre>var b = Buffer.allocUnsafe(10).fill('h');
console.log(b.toString());//hhhhhhhhhh</pre>
</div>

【buf.indexOf(value[, byteOffset][, encoding])】

　　value &lt;String&gt; | &lt;Buffer&gt; | &lt;Integer&gt; 要搜索的值

　　byteOffset &lt;Integer&gt; buf 中开始搜索的位置。默认: 0

　　encoding &lt;String&gt; 如果 value 是一个字符串，则这是它的字符编码。 默认: 'utf8'

　　返回: &lt;Integer&gt; buf 中 value 首次出现的索引，如果 buf 没包含 value 则返回 -1

　　如果value是字符串，则 value 根据 encoding 的字符编码进行解析；如果value是Buffer，则value会被作为一个整体使用。如果要比较部分 Buffer 可使用 buf.slice()；如果value是数值，则 value 会解析为一个 0 至 255 之间的无符号八位整数值

<div class="cnblogs_code">
<pre>var buf = Buffer.from('this is a buffer');

// 输出: 0
console.log(buf.indexOf('this'));

// 输出: 2
console.log(buf.indexOf('is'));

// 输出: 8
console.log(buf.indexOf(Buffer.from('a buffer')));

// 输出: 8
// (97 是 'a' 的十进制 ASCII 值)
console.log(buf.indexOf(97));

// 输出: -1
console.log(buf.indexOf(Buffer.from('a buffer example')));

// 输出: 8
console.log(buf.indexOf(Buffer.from('a buffer example').slice(0, 8)));</pre>
</div>

【buf.lastIndexOf(value[, byteOffset][, encoding])】

　　与 buf.indexOf() 类似，除了 buf 是从后往前搜索而不是从前往后

<div class="cnblogs_code">
<pre>var buf = Buffer.from('this buffer is a buffer');

// 输出: 0
console.log(buf.lastIndexOf('this'));

// 输出: 17
console.log(buf.lastIndexOf('buffer'));

// 输出: 17
console.log(buf.lastIndexOf(Buffer.from('buffer')));

// 输出: 15
// (97 是 'a' 的十进制 ASCII 值)
console.log(buf.lastIndexOf(97));

// 输出: -1
console.log(buf.lastIndexOf(Buffer.from('yolo')));

// 输出: 5
console.log(buf.lastIndexOf('buffer', 5));

// 输出: -1
console.log(buf.lastIndexOf('buffer', 4));</pre>
</div>

【buf.includes(value[, byteOffset][, encoding])】

　　该方法相当于 buf.indexOf() !== -1

　　value &lt;String&gt; | &lt;Buffer&gt; | &lt;Integer&gt; 要搜索的值

　　byteOffset &lt;Integer&gt; buf 中开始搜索的位置。默认: 0

　　encoding &lt;String&gt; 如果 value 是一个字符串，则这是它的字符编码。 默认: 'utf8'

　　返回: &lt;Boolean&gt; 如果 buf 找到 value，则返回 true，否则返回 false

<div class="cnblogs_code">
<pre>var buf = Buffer.from('this is a buffer');

// 输出: true
console.log(buf.includes('this'));

// 输出: true
console.log(buf.includes('is'));

// 输出: true
console.log(buf.includes(Buffer.from('a buffer')));

// 输出: true
// (97 是 'a' 的十进制 ASCII 值)
console.log(buf.includes(97));

// 输出: false
console.log(buf.includes(Buffer.from('a buffer example')));

// 输出: true
console.log(buf.includes(Buffer.from('a buffer example').slice(0, 8)));

// 输出: false
console.log(buf.includes('this', 4));</pre>
</div>

