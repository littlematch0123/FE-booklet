# queryString

　　无论是前端还是后端，经常出现的应用场景是URL中参数的处理。nodeJS的queryString模块提供了一些处理 query strings 的工具。本文将详细介绍nodeJS中的queryString

<div class="cnblogs_code">
<pre>var querystring = require('querystring');
/*
{ unescapeBuffer: [Function],
  unescape: [Function: qsUnescape],
  escape: [Function],
  encode: [Function],
  stringify: [Function],
  decode: [Function],
  parse: [Function] }
 */
console.log(querystring);</pre>
</div>

&nbsp;

### 序列化

【querystring.parse(str[, sep[, eq[, options]]])】

　　querystring.parse()方法能把一个URL查询字符串(str)解析成一个键值对的集合，参数如下

<div class="cnblogs_code">
<pre>str &lt;String&gt; 要解析的 URL 查询字符串。
sep &lt;String&gt; 用于界定查询字符串中的键值对的子字符串。默认为 '&amp;'。
eq &lt;String&gt; 用于界定查询字符串中的键与值的子字符串。默认为 '='。
options &lt;Object&gt;
    decodeURIComponent &lt;Function&gt; 当解码查询字符串中百分号编码的字符时使用的函数。默认为 querystring.unescape()   
maxKeys &lt;number&gt; 指定要解析的键的最大数量。默认为 1000。指定为 0 则移除键数的限制</pre>
</div>
<div class="cnblogs_code">
<pre>var querystring = require('querystring');
var str = 'foo=bar&amp;abc=xyz&amp;abc=123';
console.log(querystring.parse(str));//'{ foo: 'bar', abc: [ 'xyz', '123' ] }'</pre>
</div>

　　第二个参数用于界定查询字符串中的键值对的子字符串

<div class="cnblogs_code">
<pre>var querystring = require('querystring');
var str = 'foo=bar&amp;abc=xyz&amp;abc=123';
console.log(querystring.parse(str,'a'));//{ foo: 'b', 'r&amp;': '', bc: [ 'xyz&amp;', '123' ] }</pre>
</div>

　　第三个参数用于界定查询字符串中的键与值的子字符串

<div class="cnblogs_code">
<pre>var querystring = require('querystring');
var str = 'foo=bar&amp;abc=xyz&amp;abc=123';
console.log(querystring.parse(str,'&amp;','c'));//{ 'foo=bar': '', ab: [ '=xyz', '=123' ] }</pre>
</div>

　　[注意]querystring.parse()方法返回的对象不继承自 JavaScript 的 Object。 这意味着典型的 Object 方法如 obj.toString()、obj.hasOwnProperty() 等没有被定义且无法使用

　　默认情况下，查询字符串中的百分号编码的字符会被认为使用了 UTF-8 编码。 如果使用的是另一种字符编码，则 decodeURIComponent 选项需要被指定

<div class="cnblogs_code">
<pre>var querystring = require('querystring');
//{ w: '����', foo: 'bar' }
console.log(querystring.parse('w=%D6%D0%CE%C4&amp;foo=bar', null, null,{ decodeURIComponent: 'gbkDecodeURIComponent' }));</pre>
</div>

【querystring.stringify(obj[, sep][, eq][, options])】

　　querystring.stringify()方法是querystring.parse()方法的逆向操作，通过遍历对象的自有属性，从一个给定的obj产生一个URL查询字符串，参数如下

<div class="cnblogs_code">
<pre>obj &lt;Object&gt; 要序列化成一个 URL 查询字符串的对象
sep &lt;String&gt; 用于界定查询字符串中的键值对的子字符串。默认为 '&amp;'
eq &lt;String&gt; 用于界定查询字符串中的键与值的子字符串。默认为 '='
options
    encodeURIComponent &lt;Function&gt; 当把对URL不安全的字符转换成查询字符串中的百分号编码时使用的函数。默认为 querystring.escape()</pre>
</div>
<div class="cnblogs_code">
<pre>var querystring = require('querystring');
//'foo=bar&amp;baz=qux&amp;baz=quux&amp;corge='
console.log(querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' }));</pre>
</div>
<div class="cnblogs_code">
<pre>var querystring = require('querystring');
//'foo:bar;baz:qux'
console.log(querystring.stringify({foo: 'bar', baz: 'qux'}, ';', ':'));</pre>
</div>

&nbsp;

### 编码

【querystring.escape(str)】

　　querystring.escape()方法对给定的str执行URL百分号编码，与encodeURIComponent方法一样

　　querystring.escape()方法是供querystring.stringify()使用的，且通常不被直接使用。它之所以对外开放，是为了在需要时可以通过给querystring.escape赋值一个函数来重写编码的实现

<div class="cnblogs_code">
<pre>var querystring = require('querystring');
console.log(encodeURIComponent('测试'));//%E6%B5%8B%E8%AF%95
console.log(querystring.escape('测试'));//%E6%B5%8B%E8%AF%95</pre>
</div>

【querystring.unescape(str)】

　　querystring.unescape() 方法对给定的 str 上的 URL 百分号编码的字符执行解码

　　querystring.unescape()方法是供querystring.parse()使用的，且通常不被直接使用。它之所以对外开放，是为了在需要时可以通过给querystring.unescape赋值一个函数来重写解码的实现。

　　querystring.unescape()方法默认使用JavaScript内置的decodeURIComponent() 方法来解码

<div class="cnblogs_code">
<pre>var querystring = require('querystring');
console.log(decodeURIComponent('%E6%B5%8B%E8%AF%95'));//'测试'
console.log(querystring.unescape('%E6%B5%8B%E8%AF%95'));//'测试'</pre>
</div>

&nbsp;

### GET

　　get请求的数据保存在URL中

<div class="cnblogs_code">
<pre>http://127.0.0.1:8080/home/test?a=1&amp;b=2</pre>
</div>
<div class="cnblogs_code">
<pre>var http = require('http');
var url = require('url');
var querystring = require('querystring');
http.createServer(function(req,res){
    var urlObj = url.parse(req.url);
    var query = urlObj.query;
    var queryObj = querystring.parse(query);
    console.log(req.url);//'/home/test?a=1&amp;b=2'
    console.log(query);//'a=1&amp;b=2'
    console.log(queryObj);//{ a: '1', b: '2' }
}).listen(8080);</pre>
</div>

&nbsp;

### POST

　　post请求的数据会被写入缓冲区中，需要通过request的data事件和end事件来进行数据拼接处理

<div class="cnblogs_code">
<pre>var http = require('http');
var url = require('url');
var querystring = require('querystring');
http.createServer(function(req,res){
    var str = '';  
    req.on('data', function(thunk){
        str += thunk;
    });
    req.on('end', function(){
        console.log(str);//'name=a&amp;email=b%40b.com'
        var queryObj = querystring.parse(str);
        console.log(queryObj);//{ name: 'a', email: 'b%40b.com' }
    }); 

}).listen(8080);</pre>
</div>

![querystring](https://pic.xiaohuochai.site/blog/nodejs_querystring.png)
