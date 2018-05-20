# 文件系统

&emsp;&emsp;fs文件系统用于对系统文件及目录进行读写操作，本文将详细介绍nodejs中的文件系统

&nbsp;

### 概述

&emsp;&emsp;文件 I/O 是由简单封装的标准 POSIX 函数提供的。 通过 require('fs') 使用该模块。 所有的方法都有异步和同步的形式。

&emsp;&emsp;异步形式始终以完成回调作为它最后一个参数。 传给完成回调的参数取决于具体方法，但第一个参数总是留给异常。 如果操作成功完成，则第一个参数会是 null 或 undefined

<div>
<pre>//异步示例
var fs = require('fs');
fs.unlink('/tmp/hello', function(err){
  if (err) throw err;
  console.log('successfully deleted /tmp/hello');
});</pre>
</div>

&emsp;&emsp;当使用同步形式时，任何异常都会被立即抛出。 可以使用 try/catch 来处理异常，或让它们往上冒泡

<div>
<pre>//同步示例
var fs = require('fs');
fs.unlinkSync('/tmp/hello');
console.log('successfully deleted /tmp/hello');</pre>
</div>

&emsp;&emsp;异步方法不保证执行顺序。 所以下面的例子容易出错

<div>
<pre>fs.rename('/tmp/hello', '/tmp/world', function(err){
  if (err) throw err;
  console.log('renamed complete');
});
fs.stat('/tmp/world', function(err, stats){
  if (err) throw err;
  console.log('stats: ${JSON.stringify(stats)}');
});</pre>
</div>

&emsp;&emsp;`fs.stat`&nbsp;可能在&nbsp;`fs.rename`&nbsp;之前执行。正确的方法是把回调链起来

<div>
<pre>fs.rename('/tmp/hello', '/tmp/world', function(err){
  if (err) throw err;
  fs.stat('/tmp/world', function(err, stats){
    if (err) throw err;
    console.log('stats: ${JSON.stringify(stats)}');
  });
});</pre>
</div>

&emsp;&emsp;推荐开发者使用这些函数的异步版本。 同步版本会阻塞整个进程，直到它们完成（停止所有连接）

&nbsp;

### 底层操作

1、打开文件【fs.open(path, flags[, mode], callback)】

&emsp;&emsp;参数如下：

<div>
<pre>path &lt;String&gt; | &lt;Buffer&gt;
flags &lt;String&gt; | &lt;Number&gt;
mode &lt;Integer&gt; 设置文件模式（权限和 sticky 位），但只有当文件被创建时才有效。默认为&nbsp;`0666`，可读写
callback &lt;Function&gt; 该回调有两个参数&nbsp;`(err错误, fd文件标识，与定时器标识类似)`</pre>
</div>

&emsp;&emsp;flags可以是：

<div>
<pre>'r' - 以读取模式打开文件。如果文件不存在则发生异常。
'r+' - 以读写模式打开文件。如果文件不存在则发生异常。
'rs+' - 以同步读写模式打开文件。命令操作系统绕过本地文件系统缓存。
'w' - 以写入模式打开文件。文件会被创建(如果文件不存在)或截断(如果文件存在)。
'wx' - 类似 'w'，但如果 path 存在，则失败。
'w+' - 以读写模式打开文件。文件会被创建(如果文件不存在)或截断(如果文件存在)。
'wx+' - 类似 'w+'，但如果 path 存在，则失败。
'a' - 以追加模式打开文件。如果文件不存在，则会被创建。
'ax' - 类似于 'a'，但如果 path 存在，则失败。
'a+' - 以读取和追加模式打开文件。如果文件不存在，则会被创建。
'ax+' - 类似于 'a+'，但如果 path 存在，则失败。</pre>
</div>

&emsp;&emsp;注意：使用'rs+'模式不会使fs.open()进入同步阻塞调用。如果那是你想要的，则应该使用fs.openSync()

<div>
<pre>var fs = require('fs');
fs.open('a.txt','r',function(err,fs){
    console.log(err);//null
    console.log(fs);//3
})</pre>
</div>
<div>
<pre>var fs = require('fs');
fs.open('b.txt','r',function(err,fs){
/*
{ Error: ENOENT: no such file or directory, open 'D:\project\b.txt'
    at Error (native)
  errno: -4058,
  code: 'ENOENT',
  syscall: 'open',
  path: 'D:\\project\\b.txt' }
 */
    console.log(err);
    console.log(fs);//undefined
})</pre>
</div>

&emsp;&emsp;文件的回调函数中的第二个参数fd代表文件标识，与定时器标识类似，用于标识文件，且随着文件的打开顺序递增

<div>
<pre>var fs = require('fs');
fs.open('1.txt','r',function(err,fs){
    console.log(fs);//3
})
fs.open('2.txt','r',function(err,fs){
    console.log(fs);//4
})</pre>
</div>

【fs.openSync(path, flags[, mode])】

&emsp;&emsp;fs.open() 的同步版本。 返回一个表示文件描述符的整数

<div>
<pre>var fs = require('fs');
var result = fs.openSync('1.txt','r');
console.log(result);//3</pre>
</div>

2、读取文件【fs.read(fd, buffer, offset, length, position, callback)】

&emsp;&emsp;参数如下：

<div>
<pre>fd &lt;Integer&gt; 通过 fs.open() 方法返回的文件描述符
buffer &lt;String&gt; | &lt;Buffer&gt; 数据将被写入到buffer
offset &lt;Integer&gt; buffer中开始写入的偏移量
length &lt;Integer&gt; 指定要读取的字节数(整数)
position &lt;Integer&gt; 指定从文件中开始读取的位置(整数)。 如果position为null，则数据从当前文件位置开始读取
callback &lt;Function&gt; 回调有三个参数 (err, bytesRead, buffer)。err为错误信息，bytesRead表示读取的字节数，buffer为缓冲区对象</pre>
</div>

&emsp;&emsp;由于使用read()方法，会将文件内容读取buffer对象中，所以需要提前先准备一个buffer对象

<div>
<pre>var fs = require('fs');
fs.open('1.txt','r',function(err,fd){
    if(err){
        console.log('文件打开失败');
    }else{
        var bf = Buffer.alloc(5);
        fs.read(fd,bf,0,3,null,function(err,len,buffer){
            console.log(err);//null
            console.log(len);//3
            console.log(buffer);//&lt;Buffer 61 61 61 00 00&gt;
        })
    }
});</pre>
</div>

【fs.readSync(fd, buffer, offset, length, position)】

&emsp;&emsp;fs.read() 的同步版本，返回 bytesRead 的数量

<div>
<pre>var fs = require('fs');
var fd = fs.openSync('1.txt','r');
var bf = Buffer.alloc(5);
var result = fs.readSync(fd,bf,0,3,null);
console.log(result);//3</pre>
</div>

3、写入文件【fs.write(fd, buffer, offset, length[, position], callback)】

&emsp;&emsp;参数如下

<div>
<pre>fd &lt;Integer&gt;  文件标识
buffer &lt;String&gt; | &lt;Buffer&gt; 要将buffer中的数据写入到文件中
offset &lt;Integer&gt; buffer对象中要写入的数据的起始位置
length &lt;Integer&gt; length是一个整数，指定要写入的字节数
position &lt;Integer&gt; 指定从文件开始写入数据的位置的偏移量。 如果 typeof position !== 'number'，则数据从当前位置写入
callback &lt;Function&gt; 回调有三个参数(err, written, buffer)，其中written指定从buffer写入了多少字节</pre>
</div>

&emsp;&emsp;注意：多次对同一文件使用fs.write且不等待回调，是不安全的。对于这种情况，强烈推荐使用 fs.createWriteStream

&emsp;&emsp;当我们要对打开的文件进行写操作的时候，打开文件的模式应该是读写模式

<div>
<pre>var fs = require('fs');
fs.open('1.txt','r+',function(err,fd){
    if(err){
        console.log('文件打开失败');
    }else{
        var bf = Buffer.from('test');
        fs.write(fd,bf,0,3,null,function(err,len,buffer){
            console.log(err);//null
            console.log(len);//3
            console.log(buffer);//&lt;Buffer 74 65 73 74&gt;
        })
    }
});</pre>
</div>


![file1](https://pic.xiaohuochai.site/blog/nodejs_file1.png)

【fs.write(fd, data[, position[, encoding]], callback)】

&emsp;&emsp;该方法写入data到fd指定的文件。如果data不是一个Buffer实例，则该值将被强制转换为一个字符串

&emsp;&emsp;不同于写入 buffer，该方法整个字符串必须被写入。不能指定子字符串，这是因为结果数据的字节偏移量可能与字符串的偏移量不同

<div>
<pre>fd  &lt;Integer&gt; 文件标识
data &lt;String&gt; | &lt;Buffer&gt; 要将string或buffer中的数据写入到文件中
position &lt;Integer&gt; 指向从文件开始写入数据的位置的偏移量。 如果 typeof position !== 'number'，则数据从当前位置写入
encoding &lt;String&gt; 期望的字符串编码
callback &lt;Function&gt; 回调有三个参数(err, written, str)，其中written指定从str写入了多少字节</pre>
</div>
<div>
<pre>var fs = require('fs');
fs.open('1.txt','r+',function(err,fd){
    if(err){
        console.log('文件打开失败');
    }else{
        fs.write(fd,'12345',function(err,len,str){
            console.log(err);//null
            console.log(len);//5
            console.log(str);//&lt;Buffer 74 65 73 74&gt;
        })
    }
});</pre>
</div>

![file2](https://pic.xiaohuochai.site/blog/nodejs_file2.png)

【fs.writeSync()】

&emsp;&emsp;fs.write() 的同步版本。返回写入的字节数

<div>
<pre>var fs = require('fs');
var fd = fs.openSync('1.txt','r+');
var bf = Buffer.alloc(5);
var result = fs.writeSync(fd,bf,0,3,null);
console.log(result);//3</pre>
</div>

![file3](https://pic.xiaohuochai.site/blog/nodejs_file3.png)

4、关闭文件【fs.close(fd, callback)】

&emsp;&emsp;一个文件被操作后，要及时将该文件关闭

&emsp;&emsp;参数如下：

<div>
<pre>fd - 通过 fs.open() 方法返回的文件描述符。
callback - 回调函数，没有参数。</pre>
</div>
<div>
<pre>var fs = require('fs');
fs.open('1.txt','r+',function(err,fd){
    if(err){
        console.log('文件打开失败');
    }else{
        fs.close(fd, function(err){
            if (err){
                console.log(err);
            } 
            console.log("文件关闭成功");
        });
    }
});</pre>
</div>

【fs.closeSync(fd)】

&emsp;&emsp;fs.close(fd, callback)的同步版本，返回undefined

<div>
<pre>var fs = require('fs');
var fd = fs.openSync('1.txt','r+');
fs.closeSync(fd);</pre>
</div>

&nbsp;

### File操作

&emsp;&emsp;上一部分介绍的都是些底层的操作，接下来将介绍一些更便捷的文件操作。使用下列方法的时候，不需要再打开和关闭文件，直接操作即可

1、写入文件

【fs.writeFile(file, data[, options], callback)】

&emsp;&emsp;异步的将数据写入一个文件，如果文件不存在则新建，如果文件原先存在，会被替换

&emsp;&emsp;参数如下：

<div>
<pre>file - 文件名或文件描述符。
data - 要写入文件的数据，可以是 String(字符串) 或 Buffer(流) 对象。
options - 该参数是一个对象，包含 {encoding, mode, flag}。默认编码为 utf8, 模式为 0666 ， flag 为 'w'
callback - 回调函数，回调函数只包含错误信息参数(err)，在写入失败时返回。</pre>
</div>
<div>
<pre>var fs = require('fs');
var filename = '1.txt';
fs.writeFile(filename,'hello',function(err){
    console.log(err);//null
})</pre>
</div>

![file4](https://pic.xiaohuochai.site/blog/nodejs_file4.png)

【fs.writeFileSync(file, data[, options])】

&emsp;&emsp;fs.writeFile() 的同步版本。返回 undefined

<div>
<pre>var fs = require('fs');
var filename = '1.txt';
fs.writeFileSync(filename,'abc');</pre>
</div>

![file5](https://pic.xiaohuochai.site/blog/nodejs_file5.png)

2、追加文件

【fs.appendFile(filename, data, [options], callback)】

&emsp;&emsp;异步地追加数据到一个文件，如果文件不存在则创建文件。 data 可以是一个字符串或 buffer

&emsp;&emsp;参数如下

<div>
<pre>file - 文件名或文件描述符。
data - 要写入文件的数据，可以是 String(字符串) 或 Buffer(流) 对象。
options - 该参数是一个对象，包含 {encoding, mode, flag}。默认编码为 utf8, 模式为 0666 ， flag 为 'w'
callback - 回调函数，回调函数只包含错误信息参数(err)，在写入失败时返回。</pre>
</div>
<div>
<pre>var fs = require('fs');
var filename = '1.txt';
fs.appendFile(filename,' world',function(err){
    console.log(err);//null
})</pre>
</div>

![file6](https://pic.xiaohuochai.site/blog/nodejs_file6.png)

【fs.appendFileSync(file, data[, options])】

&emsp;&emsp;fs.appendFile()的同步版本。返回undefined

<div>
<pre>var fs = require('fs');
var filename = '1.txt';
fs.appendFileSync(filename,' lalala');</pre>
</div>

![file7](https://pic.xiaohuochai.site/blog/nodejs_file7.png)

3、读取文件

【fs.readFile(file[, options], callback)】

&emsp;&emsp;参数如下

<div>
<pre>file - 文件名或文件描述符
options - 该参数是一个对象，包含 {encoding, flag}。默认编码为null，即如果字符编码未指定，则返回原始的 buffer；flag默认为'r'
callback - 回调函数，回调有两个参数 (err, data)，其中data是文件的内容（buffer对象），err是错误信息参数，在写入失败时返回</pre>
</div>
<div>
<pre>var fs = require('fs');
var filename = '1.txt';
fs.readFile(filename,function(err,data){
    if(err){
        console.log('文件读取失败');
    }else{
        console.log(data);//&lt;Buffer 61 62 63 20 77 6f 72 6c 64 20 6c 61 6c 61 6c 61&gt;
        console.log(data.toString());//'abc world lalala'
    }
});</pre>
</div>

【fs.readFileSync(file[, options])】

&emsp;&emsp;fs.readFile的同步版本。返回file的内容

&emsp;&emsp;如果指定了encoding选项，则该函数返回一个字符串，否则返回一个buffer

<div>
<pre>var fs = require('fs');
var filename = '1.txt';
var result = fs.readFileSync(filename);
console.log(result);//&lt;Buffer 61 62 63 20 77 6f 72 6c 64 20 6c 61 6c 61 6c 61&gt;
console.log(result.toString());'abc world lalala'</pre>
</div>

4、删除文件

【fs.unlink(path, callback)】

&emsp;&emsp;参数如下：

<div>
<pre>path - 文件路径。
callback - 回调函数，没有参数。</pre>
</div>
<div>
<pre>var fs = require('fs');
var filename = '1.txt';
fs.unlink(filename, function(err) {
   if (err) {
       return console.log('删除失败');
   }
   console.log("删除成功");
});</pre>
</div>

![file8](https://pic.xiaohuochai.site/blog/nodejs_file8.png)

【fs.unlinkSync(path)】

&emsp;&emsp;fs.unlink(path, callback)的同步版本，返回值为undefined

<div>
<pre>var fs = require('fs');
var filename = '1.txt';
fs.unlink(filename);</pre>
</div>

5、重命名

【fs.rename(oldPath, newPath, callback)】

&emsp;&emsp;参数如下：

<div>
<pre>oldPath &lt;String&gt; | &lt;Buffer&gt;
newPath &lt;String&gt; | &lt;Buffer&gt;
callback &lt;Function&gt; 回调只有一个可能的异常参数</pre>
</div>
<div>
<pre>var fs = require('fs');
var filename = 'a.txt';
fs.rename(filename,'2.new.txt',function(err){
    console.log(err);//null
})</pre>
</div>

【fs.renameSync(oldPath, newPath)】

&emsp;&emsp;fs.rename(oldPath, newPath, callback)的同步版本，返回undefined

<div>
<pre>var fs = require('fs');
var filename = '2.new.txt';
var result = fs.renameSync(filename,'a.txt');</pre>
</div>

6、文件信息

【fs.stat(path, callback)】

&emsp;&emsp;fs.stat()执行后，会将stats类的实例返回给其回调函数。可通过stats类中的提供方法判断文件的相关属性

&emsp;&emsp;参数如下：

<div>
<pre>path - 文件路径。
callback - 回调函数，带有两个参数如：(err, stats), stats 是 fs.Stats 对象</pre>
</div>
<div>
<pre>var fs = require('fs');
var filename = 'a.txt';
fs.stat(filename,function(err,stats){
    console.log(err);//null
/*
{ dev: 223576,
  mode: 33206,
  nlink: 1,
  uid: 0,
  gid: 0,
  rdev: 0,
  blksize: undefined,
  ino: 7599824371527537,
  size: 0,
  blocks: undefined,
  atime: 2017-06-03T14:18:15.370Z,
  mtime: 2017-06-03T14:18:15.370Z,
  ctime: 2017-06-03T16:32:05.776Z,
  birthtime: 2017-06-03T14:18:15.370Z }
 */    
    console.log(stats);
});</pre>
</div>

&emsp;&emsp;stats类中的方法有

<div>
<pre>stats.isFile()  如果是文件返回 true，否则返回 false。
stats.isDirectory() 如果是目录返回 true，否则返回 false。
stats.isBlockDevice()   如果是块设备返回 true，否则返回 false。
stats.isCharacterDevice()   如果是字符设备返回 true，否则返回 false。
stats.isSymbolicLink()  如果是软链接返回 true，否则返回 false。
stats.isFIFO()  如果是FIFO，返回true，否则返回false。FIFO是UNIX中的一种特殊类型的命令管道。
stats.isSocket()    如果是 Socket 返回 true，否则返回 false。</pre>
</div>
<div>
<pre>var fs = require('fs');
var filename = 'a.txt';
fs.stat(filename,function(err,stats){
    console.log(stats.isFile());//true
});</pre>
</div>

【fs.statSync(path)】

&emsp;&emsp;fs.stat(path, callback)方法的同步版本，返回一个&nbsp;`fs.Stats`&nbsp;实例

<div>
<pre>var fs = require('fs');
var filename = 'a.txt';
var result = fs.statSync(filename);
/*
{ dev: 223576,
  mode: 33206,
  nlink: 1,
  uid: 0,
  gid: 0,
  rdev: 0,
  blksize: undefined,
  ino: 7599824371527537,
  size: 0,
  blocks: undefined,
  atime: 2017-06-03T14:18:15.370Z,
  mtime: 2017-06-03T14:18:15.370Z,
  ctime: 2017-06-03T16:32:05.776Z,
  birthtime: 2017-06-03T14:18:15.370Z }
 */
console.log(result);</pre>
</div>

7、监听

【fs.watch(filename[, options][, listener])】

&emsp;&emsp;该方法用于监视filename的变化，filename可以是一个文件或一个目录。返回的对象是一个fs.FSWatcher

&emsp;&emsp;参数如下

<div>
<pre>filename &lt;String&gt; | &lt;Buffer&gt;
options &lt;String&gt; | &lt;Object&gt; 参数可选，如果options是一个字符串，则它指定了encoding。否则options应该以一个对象传入
    persistent &lt;Boolean&gt; 指明如果文件正在被监视，进程是否应该继续运行。默认为true
    recursive &lt;Boolean&gt; 指明是否全部子目录应该被监视，或只是当前目录。 适用于当一个目录被指定时，且只在支持的平台。默认为false
    encoding &lt;String&gt; 指定用于传给监听器的文件名的字符编码。默认为'utf8'
listener &lt;Function&gt; 回调函数有两个参数 (eventType, filename)。 eventType可以是'rename'或'change'，filename是触发事件的文件的名称</pre>
</div>

&emsp;&emsp;回调中提供的&nbsp;`filename`&nbsp;参数仅在 Linux 和 Windows 系统上支持。 即使在支持的平台中，`filename`&nbsp;也不能保证提供。 因此，不要以为&nbsp;`filename`&nbsp;参数总是在回调中提供，如果它是空的，需要有一定的后备逻辑

<div>
<pre>fs.watch('somedir', (eventType, filename) =&gt; {
  console.log(`事件类型是: ${eventType}`);
  if (filename) {
    console.log(`提供的文件名: ${filename}`);
  } else {
    console.log('未提供文件名');
  }
});</pre>
</div>
<div>
<pre>var fs = require('fs');
var filename = '1.txt';
fs.watch(filename,function(eventType, _filename){
    console.log(eventType);//change
    if(_filename){
        console.log(_filename + '发生了改变');//'1.txt发生了改变'
    }else{
        console.log('...');
    }

})</pre>
</div>

&emsp;&emsp;注意：当一个文件出现或消失在一个目录里时，'rename'也会被触发

&nbsp;

### 目录操作

1、创建

【fs.mkdir(path[, mode], callback)】

&emsp;&emsp;参数如下：

<div>
<pre>path - 文件路径。
mode - 设置目录权限，默认为 0777。
callback - 回调函数，回调只有一个可能的异常参数</pre>
</div>
<div>
<pre>var fs = require('fs');
fs.mkdir('./1',function(err){
    console.log(err);//null
})</pre>
</div>

【fs.mkdirSync(path[, mode])】

&emsp;&emsp;fs.mkdir(path[, mode], callback)的同步版本，返回undefined

<div>
<pre>var fs = require('fs');
fs.mkdirSync('./2');</pre>
</div>

2、删除

【fs.rmdir(path, callback)】

&emsp;&emsp;参数如下：

<div>
<pre>path - 文件路径。
callback - 回调函数，回调只有一个可能的异常参数</pre>
</div>
<div>
<pre>var fs = require('fs');
fs.rmdir('./1',function(err){
    console.log(err);//null
})</pre>
</div>

【fs.rmdirSync(path, callback)】

&emsp;&emsp;fs.rmdir(path, callback)的同步版本，返回undefined

<div>
<pre>var fs = require('fs');
fs.rmdirSync('./2');</pre>
</div>

3、读取

【fs.readdir(path[, options], callback)】

&emsp;&emsp;参数如下：

<div>
<pre>path &lt;String&gt; | &lt;Buffer&gt;
options &lt;String&gt; | &lt;Object&gt; 可选的 options 参数用于传入回调的文件名，它可以是一个字符串并指定一个字符编码，或是一个对象且由一个 encoding 属性指定使用的字符编码。 如果 encoding 设为 'buffer'，则返回的文件名会被作为 Buffer 对象传入
    encoding &lt;String&gt; 默认 = 'utf8'
callback &lt;Function&gt; 回调有两个参数 (err, files)，其中 files 是目录中不包括 '.' 和 '..' 的文件名的数组</pre>
</div>
<div>
<pre>var fs = require('fs');
fs.readdir('./',function(err,data){
    console.log(err);//null
/*
[ '.csslintrc',
  '.jshintrc',
  'a.txt',
  'dist',
  'Gruntfile.js',
  'Gruntfile1.js',
  'index.html',
  'main.js',
  'node_modules',
  'package.json',
  'src' ]
 */
    console.log(data);
})</pre>
</div>
<div>
<pre>var fs = require('fs');
fs.readdir('./',function(err,data){
    data.forEach(function(item,index,arr){
        fs.stat(item,function(err,stats){
            if(stats.isFile()){
                console.log('文件：' + item);
            }
            if(stats.isDirectory()){
                console.log('目录：' + item);
            }
        });    
    })

})
/*
文件：.jshintrc
文件：.csslintrc
目录：dist
文件：Gruntfile.js
文件：index.html
文件：Gruntfile1.js
文件：main.js
目录：node_modules
文件：package.json
文件：a.txt
目录：src
 */</pre>
</div>

【fs.readdirSync(path[, options], callback)】

&emsp;&emsp;fs.readdir(path[, options], callback)的同步版本，返回一个不包括&nbsp;`'.'`&nbsp;和&nbsp;`'..'`&nbsp;的文件名的数组

<div>
<pre>var fs = require('fs');
var result = fs.readdirSync('./');
/*
[ '.csslintrc',
  '.jshintrc',
  'a.txt',
  'dist',
  'Gruntfile.js',
  'Gruntfile1.js',
  'index.html',
  'main.js',
  'node_modules',
  'package.json',
  'src' ]
 */
console.log(result);</pre>
</div>

&nbsp;

### 遍历目录

&emsp;&emsp;遍历目录是操作文件时的一个常见需求。比如写一个程序，需要找到并处理指定目录下的所有JS文件时，就需要遍历整个目录

&emsp;&emsp;遍历目录时一般使用递归算法，否则就难以编写出简洁的代码。递归算法与数学归纳法类似，通过不断缩小问题的规模来解决问题

<div>
<pre>function factorial(n) {
    if (n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}</pre>
</div>

&emsp;&emsp;上边的函数用于计算N的阶乘（N!）。可以看到，当N大于1时，问题简化为计算N乘以N-1的阶乘。当N等于1时，问题达到最小规模，不需要再简化，因此直接返回1

&emsp;&emsp;目录是一个树状结构，在遍历时一般使用深度优先+先序遍历算法。深度优先，意味着到达一个节点后，首先接着遍历子节点而不是邻居节点。先序遍历，意味着首次到达了某节点就算遍历完成，而不是最后一次返回某节点才算数。因此使用这种遍历方式时，下边这棵树的遍历顺序是A &gt; B &gt; D &gt; E &gt; C &gt; F

<div>
<pre>          A
         / \
        B   C
       / \   \
      D   E   F</pre>
</div>

&emsp;&emsp;了解了必要的算法后，我们可以简单地实现以下目录遍历函数

<div>
<pre>function travel(dir, callback) {
    fs.readdirSync(dir).forEach(function (file) {
        var pathname = path.join(dir, file);
        if (fs.statSync(pathname).isDirectory()) {
            travel(pathname, callback);
        } else {
            callback(pathname);
        }
    });
}</pre>
</div>

&emsp;&emsp;可以看到，该函数以某个目录作为遍历的起点。遇到一个子目录时，就先接着遍历子目录。遇到一个文件时，就把文件的绝对路径传给回调函数。回调函数拿到文件路径后，就可以做各种判断和处理。因此假设有以下目录

<div>
<pre>- /home/user/
    - foo/
        x.js
    - bar/
        y.js
    z.css</pre>
</div>

&emsp;&emsp;使用以下代码遍历该目录时，得到的输入如下

<div>
<pre>travel('/home/user', function (pathname) {
    console.log(pathname);
});
------------------------
/home/user/foo/x.js
/home/user/bar/y.js
/home/user/z.css</pre>
</div>

&emsp;&emsp;如果读取目录或读取文件状态时使用的是异步API，目录遍历函数实现起来会有些复杂，但原理完全相同。`travel`函数的异步版本如下

<div>
<pre>function travel(dir, callback, finish) {
    fs.readdir(dir, function (err, files) {
        (function next(i) {
            if (i &lt; files.length) {
                var pathname = path.join(dir, files[i]);
                fs.stat(pathname, function (err, stats) {
                    if (stats.isDirectory()) {
                        travel(pathname, callback, function () {
                            next(i + 1);
                        });
                    } else {
                        callback(pathname, function () {
                            next(i + 1);
                        });
                    }
                });
            } else {
                finish &amp;&amp; finish();
            }
        }(0));
    });
}</pre>
</div>

