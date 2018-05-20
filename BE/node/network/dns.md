# nodeJS之域名解析模块DNS

&emsp;&emsp;本文将详细介绍域名解析模块DNS

&nbsp;

### 工作原理

&emsp;&emsp;打开浏览器，在上方地址栏输入网址的那一刻，这个回车按了之后，发生了很多事情。首先，计算机只懂0和1，也就是说人类的字母网址计算机是不懂的，它只认识IP地址，如果是IPV4那就是4组8位的二进制数字。为了人类方便，需要有一个把网址翻译成IP地址的服务，就是DNS

&emsp;&emsp;DNS整个获取过程是被层层缓存的


![dns1](https://pic.xiaohuochai.site/blog/nodejs_dns1.png)


&emsp;&emsp;1、浏览器搜索自身的DNS缓存

&emsp;&emsp;浏览器DNS缓存的时间跟DNS服务器返回的TTL值无关。

&emsp;&emsp;浏览器在获取网站域名的实际IP地址后会对其IP进行缓存，减少网络请求的损耗。每种浏览器都有一个固定的DNS缓存时间，其中Chrome的过期时间是1分钟，在这个期限内不会重新请求DNS

&emsp;&emsp;Chrome浏览器看本身的DNS缓存时间比较方便，在地址栏输入

<div>
<pre>chrome://net-internals/#dns</pre>
</div>

![dns2](https://pic.xiaohuochai.site/blog/nodejs_dns2.png)


&emsp;&emsp;2、搜索操作系统自身的DNS缓存

&emsp;&emsp;3、读取本地的HOST文件，Windows下路径一般为

<div>
<pre>c:\Windows\System32\drivers\etc\hosts</pre>
</div>

![dns3](https://pic.xiaohuochai.site/blog/nodejs_dns3.png)


&emsp;&emsp;4、向宽带运营商ISP发起一个DNS的系统调用，ISP服务器查看本身缓存

&emsp;&emsp;5、如果还没有找到，ISP服务器会代替本地计算机发起一个迭代DNS解析的请求

&emsp;&emsp;6、如果仍然不成功，则解析失败

&nbsp;

### 本地解析

&emsp;&emsp;dns模块包含两个类型的函数，其中一种是使用底层操作系统工具进行域名解析的函数，并不须要进行网络通信。这类函数只有一个：dns.lookup()

【dns.lookup(hostname[, options], callback)】

&emsp;&emsp;该方法将域名(比如`cnblogs.com`)解析为第一条找到的记录 A (IPV4)或 AAAA(IPV6)。参数 options可以是一个对象或整数。如果没有提供 options，IP v4 和 v6 地址都可以。如果 options 是整数，则必须是 4 或 6

&emsp;&emsp;options参数包含以下属性

<div>
<pre>family:地址协议族，必须为4或6的整数
hints:设置getaddrinfo的标志，dns.ADDRCONFIG 或者 dns.V4MAPPED（ipv4映射成ipv6）
all:false（默认），布尔值，如设置为true，则返回IP数组，否则返回单个IP地址</pre>
</div>
<div>
<pre>{
  family: 4,
  hints: dns.ADDRCONFIG | dns.V4MAPPED
}</pre>
</div>

&emsp;&emsp;回调函数包含参数 (err, address, family)。 address参数表示 IP v4 或 v6 地址。family 参数是4 或 6，表示 address 家族(不一定是之前传入 lookup 的值)。出错时，参数 err 是 Error 对象，err.code是错误代码

&emsp;&emsp;注意：err.code等于'ENOENT'，可能是因为域名不存在，还有可能是其他原因，如没有可用文件描述符

<div>
<pre>var dns = require('dns');
dns.lookup('www.cnblogs.com', function(err, address, family){
    console.log(err);//null
    console.log(address);//218.11.2.249
    console.log(family);//4
});</pre>
</div>

&emsp;&emsp;同一个域名，可能对应多个不同的ip。可以通过设置options = {all: true}来获取

<div>
<pre>var dns = require('dns');
dns.lookup('www.qq.com',{all:true}, function(err, address, family){
    console.log(err);//null
/*
[ { address: '125.39.240.113', family: 4 },
  { address: '61.135.157.156', family: 4 } ]
 */
    console.log(address);
    console.log(family);//undefined
});</pre>
</div>

【dns.lookupService(address, port, callback)】

&emsp;&emsp;与lookup相对应，lookupService()方法进行从ip地址和端口到域名的反向解析

&emsp;&emsp;该方法的回调函数的参数是 (err, hostname, service)。 hostname 和 service 都是字符串 (比如 'localhost' 和 'http'）。出错时，参数err 是 Error 对象，err.code是错误代码

<div>
<pre>var dns = require('dns');
dns.lookupService('127.0.0.1',80,function(err, hostname, service){
    console.log(err);//null
    console.log(hostname);//bai
    console.log(service);//http
});</pre>
</div>

&nbsp;

### 网络解析

&emsp;&emsp;除dns.lookup()以外的所有dns模块中的函数，都需要连接到实际DNS服务器进行域名解析的函数，并且始终使用网络执行DNS查询

【dns.resolve(hostname[, rrtype], callback)】

&emsp;&emsp;该方法将一个域名（如 `cnblogs.com`）解析为一个 rrtype 指定记录类型的数组

&emsp;&emsp;有效的 rrtypes 值为:

<div>
<pre>'A' (IPV4 地址, 默认)
'AAAA' (IPV6 地址)
'MX' (邮件交换记录)
'TXT' (text 记录)
'SRV' (SRV 记录)
'PTR' (用来反向 IP 查找)
'NS' (域名服务器 记录)
'CNAME' (别名 记录)
'SOA' (授权记录的初始值)</pre>
</div>

&emsp;&emsp;回调参数为&nbsp;`(err, addresses)`. 其中&nbsp;`addresses`&nbsp;中每一项的类型都取决于记录类型。出错时，参数`err`&nbsp;是&nbsp;`Error`&nbsp;对象，`err.code`是错误代码

<div>
<pre>var dns = require('dns');
//IPV4
dns.resolve('www.qq.com',function(err,address){
    console.log(address);//[ '125.39.240.113', '61.135.157.156' ]
});
//IPV6
dns.resolve('www.qq.com','AAAA',function(err,address){
    console.log(address);//[ '240e:e1:8100:28::2:16' ]
});
//别名
dns.resolve('www.qq.com','CNAME',function(err,address){
    console.log(address);//undefined
});</pre>
</div>

【dns.resolve4(hostname, callback)】

&emsp;&emsp;和 dns.resolve() 类似，仅能查询 IPv4 (A 记录）

<div>
<pre>var dns = require('dns');
dns.resolve4('www.qq.com',function(err,address){
    console.log(address);//[ '125.39.240.113', '61.135.157.156' ]
});</pre>
</div>

【dns.reverse(ip, callback)】

&emsp;&emsp;该方法用于反向解析 IP 地址，返回指向该 IP 地址的域名数组。回调函数参数 (err, hostnames)。出错时，参数err 是 Error 对象，err.code是错误代码

<div>
<pre>var dns = require('dns');
dns.reverse('114.114.114.114',function(err,hostnames){
    console.log(hostnames);//'public1.114dns.com'
});</pre>
</div>

