# nodeJS之路径PATH模块

&emsp;&emsp;path模块包含一系列处理和转换文件路径的工具集，通过&nbsp;`require('path')`&nbsp;可用来访问这个模块。本文将详细介绍path模块

&nbsp;

### 路径组成

【path.dirname(p)】

&emsp;&emsp;返回路径p所在的目录

<div>
<pre>var path = require('path');
console.log(path.dirname('/foo/bar/baz/asdf/a.txt'));  // /foo/bar/baz/asdf
console.log(path.dirname('/foo/bar/baz/asdf/'));  // /foo/bar/baz
console.log(path.dirname('C:/test/aaa'));  // C:/test</pre>
</div>

【path.basename(p[, ext])】

&emsp;&emsp;返回路径的最后一个部分，即文件名。参数ext为需要截掉的后缀内容　

<div>
<pre>var path = require('path');
console.log(path.basename('/foo/bar/baz/asdf/a.txt'));  // a.txt
console.log(path.basename('/foo/bar/baz/asdf/a.txt','.txt'));  // a
console.log(path.basename('/foo/bar/baz/asdf/'));  // asdf
console.log(path.basename('C:/test/aaa'));  // aaa</pre>
</div>

【path.extname(p)】

&emsp;&emsp;返回路径p的扩展名，从最后一个'.'到字符串的末尾。如果最后一个部分没有'.'，或者路径是以'.'开头，则返回空字符串

<div>
<pre>var path = require('path');
console.log(path.extname('/foo/bar/baz/asdf/a.txt'));  // .txt
console.log(path.extname('/foo/bar/baz/asdf/a.txt.b'));  // .b
console.log(path.extname('/foo/bar/baz/asdf/a.'));  // .
console.log(path.extname('C:/test/aaa/.'));  // ''
console.log(path.extname('C:/test/aaa'));  // ''</pre>
</div>

&nbsp;

### 分隔符

【path.sep】

&emsp;&emsp;返回对应平台下的文件分隔符，win下为'\'，*nix下为'/'

<div>
<pre>var path = require('path');
console.log(path.sep);  // win下为\，*nix下为/
console.log('foo\\bar\\baz'.split(path.sep));  // [ 'foo', 'bar', 'baz' ]
console.log('foo/bar/baz'.split(path.sep));  // win下返回['foo/bar/baz']，但在*nix系统下会返回['foo','bar','baz']</pre>
</div>

【path.delimiter】

&emsp;&emsp;返回对应平台下的路径分隔符，win下为';'，*nix下为':'

<div>
<pre>var path = require('path');
console.log(path.delimiter); //win下为&ldquo;;&rdquo;，*nix下为&ldquo;:&rdquo;
console.log(path.sep);  // win下为\，*nix下为/</pre>
</div>

&nbsp;

### 规范化

【path.normalize(p)】

&emsp;&emsp;规范化路径，处理冗余的&ldquo;..&rdquo;、&ldquo;.&rdquo;、&ldquo;/&rdquo;字符。发现多个斜杠时，会替换成一个斜杠。当路径末尾包含一个斜杠时，保留。Windows系统使用反斜杠　

<div>
<pre>var path = require('path');
console.log(path.normalize('a/b/c/../user/bin'));//a\b\user\bin
console.log(path.normalize('a/b/c///../user/bin/'));//a\b\user\bin\
console.log(path.normalize('a/b/c/../../user/bin'));//a\user\bin
console.log(path.normalize('a/b/c/.././///../user/bin/..'));//a\user
console.log(path.normalize('a/b/c/../../user/bin/../../'));//a\
console.log(path.normalize('a/../../user/bin/../../'));//..\
console.log(path.normalize('a/../../user/bin/../../../../'));//..\..\..\
console.log(path.normalize('./a/.././user/bin/./'));//user\bin\</pre>
</div>

【path.join([path1], [path2], [...])】

&emsp;&emsp;将多个路径结合在一起，并转换为规范化路径　

<div>
<pre>var path = require('path');
console.log(path.join('////./a', 'b////c', 'user/'));//\a\b\c\user
console.log(path.join('a', '../../', 'user/'));//..\user\</pre>
</div>

&nbsp;

### 绝对和相对

【path.resolve([from ...], to)】

&emsp;&emsp;从源地址 from 到目的地址 to 的绝对路径，类似在shell里执行一系列的cd命令

<div>
<pre>path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile')</pre>
</div>

&emsp;&emsp;类似于:

<div>
<pre>cd foo/bar
cd /tmp/file/
cd ..
cd a/../subfile
pwd</pre>
</div>

&emsp;&emsp;注意：如果某个from或to参数是绝对路径（比如 'E:/abc'，或是以&ldquo;/&rdquo;开头的路径），则将忽略之前的from参数

<div>
<pre>var path = require('path');
console.log(path.resolve('.', 'testFiles/..', 'trdLayer'));//D:\project\trdLayer
console.log(path.resolve('..', 'testFiles', 'a.txt'));//D:\testFiles\a.txt
console.log(path.resolve('D:', 'abc', 'D:/a'));//D:\a
console.log(path.resolve('abc', 'ok.gif'));//D:\project\abc\ok.gif
console.log(path.resolve('abc', '..', 'a/../subfile')); //D:\project\subfile</pre>
</div>

【path.isAbsolute(path)】

&emsp;&emsp;path是一个绝对路径(比如 'E:/abc')，或者是以&ldquo;/&rdquo;开头的路径，二者都会返回true

<div>
<pre>var path = require('path');
console.log(path.isAbsolute('../testFiles/secLayer'));//false
console.log(path.isAbsolute('./join.js'));//false
console.log(path.isAbsolute('temp'));//false
console.log(path.isAbsolute('/temp/../..'));//true
console.log(path.isAbsolute('E:/github/nodeAPI/abc/efg'));//true
console.log(path.isAbsolute('///temp123'));//true</pre>
</div>

【path.relative(from, to)】

&emsp;&emsp;获取从 from 到 to 的相对路径，可以看作 path.resolve 的相反实现

<div>
<pre>path.resolve(from, path.relative(from, to)) == path.resolve(to)</pre>
</div>
<div>
<pre>var path = require('path');
console.log(path.relative('C:\\\test', 'C:\\\impl\\bbb'));//..\impl\bbb
console.log(path.relative('C:/test/aaa', 'C:/bbb'));//..\..\bbb
console.log(path.relative('C:/test/aaa', 'D:/bbb'));//D:\bbb</pre>
</div>

