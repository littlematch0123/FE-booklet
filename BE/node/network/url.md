# nodeJS中的URL

&emsp;&emsp;在[HTTP](http://www.cnblogs.com/xiaohuochai/p/6392010.html)部分，详细介绍了[URL](http://www.cnblogs.com/xiaohuochai/p/6144157.html)的相关知识。而nodejs中的url模块提供了一些实用函数，用于URL处理与解析。本文将详细介绍nodeJS中的URL

&nbsp;

### URL对象

&emsp;&emsp;解析 URL 对象有以下内容，依赖于他们是否在 URL 字符串里存在。任何不在 URL 字符串里的部分，都不会出现在解析对象里

<div>
<pre>'http://user:pass@host.com:8080/p/a/t/h?query=string#hash'</pre>
</div>
<div>
<pre>┌─────────────────────────────────────────────────────────────────────────────┐
│                                    href                                     │
├──────────┬┬───────────┬─────────────────┬───────────────────────────┬───────┤
│ protocol ││   auth    │      host       │           path            │ hash  │
│          ││           ├──────────┬──────┼──────────┬────────────────┤       │
│          ││           │ hostname │ port │ pathname │     search     │       │
│          ││           │          │      │          ├─┬──────────────┤       │
│          ││           │          │      │          │ │    query     │       │
"  http:   // user:pass @ host.com : 8080   /p/a/t/h  ?  query=string   #hash "
│          ││           │          │      │          │ │              │       │
└──────────┴┴───────────┴──────────┴──────┴──────────┴─┴──────────────┴───────┘</pre>
</div>

&emsp;&emsp;【href】: 准备解析的完整的 URL，包含协议和主机（小写）

<div>
<pre>'http://user:pass@host.com:8080/p/a/t/h?query=string#hash'</pre>
</div>

&emsp;&emsp;【protocol】: 请求协议， 小写

<div>
<pre>'http:'</pre>
</div>

&emsp;&emsp;【slashes】: 协议要求的斜杠（冒号后）

<div>
<pre>true 或 false</pre>
</div>

&emsp;&emsp;【host】: 完整的 URL 小写 主机部分，包含端口信息

<div>
<pre>'host.com:8080'</pre>
</div>

&emsp;&emsp;【auth】: url 中的验证信息

<div>
<pre>'user:pass'</pre>
</div>

&emsp;&emsp;【hostname】: 域名中的小写主机名

<div>
<pre>'host.com'</pre>
</div>

&emsp;&emsp;【port】: 主机的端口号

<div>
<pre>'8080'</pre>
</div>

&emsp;&emsp;【pathname】: URL 中的路径部分，在主机名后，查询字符前，包含第一个斜杠

<div>
<pre>'/p/a/t/h'</pre>
</div>

&emsp;&emsp;【search】: URL 中的查询字符串，包含开头的问号

<div>
<pre>'?query=string'</pre>
</div>

&emsp;&emsp;【path】: pathname 和 search 连在一起

<div>
<pre>'/p/a/t/h?query=string'</pre>
</div>

&emsp;&emsp;【query】: 查询字符串中得参数部分，或者使用 querystring.parse() 解析后返回的对象

<div>
<pre>'query=string' or {'query':'string'}</pre>
</div>

&emsp;&emsp;【hash】: URL 的 &ldquo;#&rdquo; 后面部分（包括 # 符号）

<div>
<pre>'#hash'</pre>
</div>

&nbsp;

### URL方法

&emsp;&emsp;URL模块包含分析和解析 URL 的工具。调用 require('url') 来访问模块

<div>
<pre>var url = require('url');
/*
{ parse: [Function: urlParse],
  resolve: [Function: urlResolve],
  resolveObject: [Function: urlResolveObject],
  format: [Function: urlFormat],
  Url: [Function: Url] }
 */
console.log(url);</pre>
</div>

【url.parse(urlStr[, parseQueryString][, slashesDenoteHost])】

&emsp;&emsp;输入 URL 字符串，返回一个对象

&emsp;&emsp;第二个参数parseQueryString（默认为false），如为false，则urlObject.query为未解析的字符串，比如author=%E5%B0%8F%E7%81%AB%E6%9F%B4，且对应的值不会decode；如果parseQueryString为true，则urlObject.query为object，比如{ author: '小火柴' }，且值会被decode

&emsp;&emsp;第三个参数slashesDenoteHos（默认为false），如果为true，可以正确解析不带协议头的URL，类似//foo/bar里的foo就会被认为是hostname；如果为false，则foo被认为是pathname的一部分

<div>
<pre>var url = require('url');
var str = 'http://user:pass@host.com:8080/p/a/t/h?author=%E5%B0%8F%E7%81%AB%E6%9F%B4#hash';
/*
Url {
  protocol: 'http:',
  slashes: true,
  auth: 'user:pass',
  host: 'host.com:8080',
  port: '8080',
  hostname: 'host.com',
  hash: '#hash',
  search: '?author=%E5%B0%8F%E7%81%AB%E6%9F%B4',
  query: 'author=%E5%B0%8F%E7%81%AB%E6%9F%B4',
  pathname: '/p/a/t/h',
  path: '/p/a/t/h?author=%E5%B0%8F%E7%81%AB%E6%9F%B4',
  href: 'http://user:pass@host.com:8080/p/a/t/h?author=%E5%B0%8F%E7%81%AB%E6%9F%B4#hash' }
 */
console.log(url.parse(str));</pre>
</div>
<div>
<pre>var url = require('url');
var str = 'http://user:pass@host.com:8080/p/a/t/h?author=%E5%B0%8F%E7%81%AB%E6%9F%B4#hash';
/*
Url {
  protocol: 'http:',
  slashes: true,
  auth: 'user:pass',
  host: 'host.com:8080',
  port: '8080',
  hostname: 'host.com',
  hash: '#hash',
  search: '?author=%E5%B0%8F%E7%81%AB%E6%9F%B4',
  query: { author: '小火柴' },
  pathname: '/p/a/t/h',
  path: '/p/a/t/h?author=%E5%B0%8F%E7%81%AB%E6%9F%B4',
  href: 'http://user:pass@host.com:8080/p/a/t/h?author=%E5%B0%8F%E7%81%AB%E6%9F%B4#hash' }
  */
console.log(url.parse(str,true));</pre>
</div>
<div>
<pre>var url = require('url');
var str = '//foo/bar';
var result1 = url.parse(str,true);
var result2 = url.parse(str,true,true);
console.log(result1.path);//'//foo/bar'
console.log(result1.pathname);//'//foo/bar'
console.log(result1.hostname);//null
console.log(result2.path);//'/bar'
console.log(result2.pathname);//'/bar'
console.log(result2.hostname);//'foo'</pre>
</div>

【url.format(urlObject)】

&emsp;&emsp;url.parse(str)的反向操作，输入一个解析过的 URL 对象，返回格式化过的字符串

&emsp;&emsp;urlObject包含了很多字段，比如protocol、slashes、protocol等，且不一定需要全部传，所以有一套解析逻辑

&emsp;&emsp;格式化的工作流程如下

<div>
<pre>href 会被忽略
protocol 无论是否有末尾的 : (冒号)，会同样的处理
http, https, ftp, gopher, file 协议会被添加后缀://
mailto, xmpp, aim, sftp, foo, 等协议添加后缀:
slashes 如果协议需要 ://，设置为 true
仅需对之前列出的没有斜杠的协议，比如议 mongodb://localhost:8000/
auth 如果出现将会使用.
hostname 仅在缺少 host 时使用
port 仅在缺少 host 时使用
host 用来替换 hostname 和 port
pathname 无论结尾是否有 / 将会同样处理
search 将会替代 query属性
无论前面是否有 / 将会同样处理
query (对象; 参见 querystring) 如果没有 search,将会使用
hash 无论前面是否有#，都会同样处理</pre>
</div>
<div>
<pre>var url = require('url');
var obj = {
  protocol: 'http:',
  auth: 'user:pass',
  host: 'host.com:8080',
  hash: '#hash',
  query: { author: '小火柴' }
}
//http://user:pass@host.com:8080?author=%E5%B0%8F%E7%81%AB%E6%9F%B4#hash
console.log(url.format(obj));</pre>
</div>

【url.resolve(from, to)】

&emsp;&emsp;url.resolve()方法以一种浏览器解析超链接的方式把一个目标URL解析成相对于一个基础URL，参数如下

<div>
<pre>from &lt;String&gt; 解析时相对的基本 URL。
to &lt;String&gt; 要解析的超链接 URL。</pre>
</div>
<div>
<pre>var url = require('url');
console.log(url.resolve('/one/two/three', 'four'));         // '/one/two/four'
console.log(url.resolve('http://example.com/', '/one'));    // 'http://example.com/one'
console.log(url.resolve('http://example.com/one', '/two')); // 'http://example.com/two'</pre>
</div>

