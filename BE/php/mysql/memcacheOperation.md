# 前端学PHP之PHP操作memcache

&emsp;&emsp;和访问mysql服务器类似，PHP也是作为客户端API访问memcached服务器的，所以同样需要为PHP程序安装memcache的扩展接口，比较常用的有memcache和memcached两种扩展。而memcached和memcache的守护进程memcached同名，比较容易引起混淆，甚至提到memcached，有些人第一想到的是后台的守护进程，这里还是有必要分析一下两者之间的区别。memcache是完全在PHP框架内开发的，而memecached是使用libmemcached的。从手册上看，memcached 会比 memcache 多几个方法，使用方式上都差不多。memcache是原生实现的，但是使用libmemcached的memached只支持OO接口，而 memcache则是OO和非OO两套接口并存，以后随着memcached服务器端的改进，这个lib也必定会马上跟进的。而memcache却不一定能做到按时跟进。memcached，还有个非常称赞的地方，就是flag不是在操作的时候设置了。而是有一个统一的setOption()。memcached 实现了更多的 memcached 协议(毕竟是基于 libmemcached库)。本文选择较简单的memcache扩展作介绍

&nbsp;

### 安装

&emsp;&emsp;在window系统下安装memcache扩展比较简单，[下载](http://pecl.php.net/package/memcache/3.0.8/windows)一个与PHP版本一致的memcache扩展库即可

&emsp;&emsp;将下载的php_memcache.dll文件保存到PHP的应用程序扩展ext目录中

&emsp;&emsp;在php.ini文件添加扩展的位置，加入一行"extension=php_memcache.dll"

![memcacheOpe1](https://pic.xiaohuochai.site/blog/php_memcacheOpe1.jpg)


&emsp;&emsp;重新启动apache服务器即可，通过phpInfo()可以找到memcache服务已经安装

![memcacheOpe2](https://pic.xiaohuochai.site/blog/php_memcacheOpe2.jpg)


&nbsp;

### 连接

&emsp;&emsp;PHP的Memcache应用程序接口既然是作为memcached服务器的客户端，就需要先连接到memcached服务器。Memcache::connect()方法就用于连接到一个memcached服务器，如果连接成功则返回true，否则返回false

<div>
<pre>bool Memcache::connect ( string $host [, int $port [, int $timeout ]] )</pre>
</div>

&emsp;&emsp;该方法有三个参数。第一个参数host(必须项)表示memcached服务端监听主机地址；第二个参数port表示memcached服务端监听端口(可选项)，默认值为11211；第三个参数timeout表示连接持续(超时)时间，单位秒。默认值1秒

&emsp;&emsp;注意：过长的连接持续时间可能会导致失去所有的缓存优势

&emsp;&emsp;使用Memcache::connect()连接到memcached服务器，并完成操作后，可以使用Memcache::close()方法关闭连接，完成一些会话过程。如果需要以长连接方式连接memcached服务器，可以使用Memcache::pconnect()方法实现，该方法的调用方法和Memcache::connect()完全相同，但长连接不能被Memcache::close()方法关闭

<div>
<pre>//实例化对象
$memcache = new Memcache;
//连接memcache服务器
$memcache-&gt;connect('localhost');
/*其他操作*/
//关闭连接
$memcache-&gt;close();</pre>
</div>

&nbsp;

### 增删改查

**增加**

&emsp;&emsp;连接memcached服务器成功后，就可以添加一个要缓存的数据(add)，通过Memcache::add()来完成

<div>
<pre>bool Memcache::add ( string $key , mixed $var [, int $flag [, int $expire ]] )</pre>
</div>

&emsp;&emsp;在add()方法中，参数key表示将要分配给变量的key；参数var表示将要被存储的变量。字符串和整型被以原文存储，其他类型序列化后存储；参数flag(可选项)表示使用MEMCACHE_COMPRESSED标记对数据进行压缩(使用zlib)；参数expire(可选项)表示当前写入缓存的数据的失效时间。如果此值设置为0表明此数据永不过期。你可以设置一个UNIX时间戳或 以秒为单位的整数(从当前算起的时间差)来说明此数据的过期时间，但是在后一种设置方式中，不能超过2592000秒(30天)

<div>
<pre>$memcache-&gt;add('id1','11111');</pre>
</div>

![memcacheOpe3](https://pic.xiaohuochai.site/blog/php_memcacheOpe3.jpg)


**删除**

**Memcache::delete()**

&emsp;&emsp;Memcache::delete &mdash; 从服务端删除一个元素

<div>
<pre>bool Memcache::delete ( string $key [, int $timeout = 0 ] )</pre>
</div>

&emsp;&emsp;在delete方法中，有两个参数。参数key表示要删除的元素的key；参数timeout表示删除该元素的执行时间。如果值为0,则该元素立即删除，如果值为30,元素会在30秒内被删除

<div>
<pre>$memcache-&gt;delete('id1');</pre>
</div>

![memcacheOpe4](https://pic.xiaohuochai.site/blog/php_memcacheOpe4.jpg)


**Memcache::flush**

&emsp;&emsp;Memcache::flush &mdash; 清洗（删除）已经存储的所有的元素。成功时返回 TRUE， 或者在失败时返回 FALSE

<div>
<pre>bool Memcache::flush ( void )</pre>
</div>

&emsp;&emsp;注意：Memcache::flush()立即使所有已经存在的元素失效。方法Memcache::flush()并不会真正的释放任何资源，而是仅仅标记所有元素都失效了，因此已经被使用的内存会被新的元素复写

**修改**

**Memcache::set**

&emsp;&emsp;Memcache::set &mdash; 设置一个指定key的缓存内容

<div>
<pre>bool Memcache::set ( string $key , mixed $var [, int $flag [, int $expire ]] )</pre>
</div>

&emsp;&emsp;注意：set()有一个别名是replace()

<div>
<pre>$memcache-&gt;set('id1','12345');</pre>
</div>

![memcacheOpe5](https://pic.xiaohuochai.site/blog/php_memcacheOpe5.jpg)


**查看**

**Memcache::get**

&emsp;&emsp;Memcache::get &mdash; 从服务端检回一个元素，返回key对应的存储元素的字符串值或者在失败或key未找到的时候返回FALSE

&emsp;&emsp;get()有以下两种用法

<div>
<pre>string Memcache::get ( string $key [, int &amp;$flags ] )
array Memcache::get ( array $keys [, array &amp;$flags ] )</pre>
</div>

&emsp;&emsp;如果服务端之前有以key作为key存储的元素，Memcache::get()方法此时返回之前存储的值；也可以给Memcache::get()方法传递一个数组(多个key)来获取一个数组的元素值，返回的数组仅仅包含从服务端查找到的key-value对

&emsp;&emsp;get方法包括两个参数。第一个参数key表示要获取值的key或key数组；第二个参数为flags，如果给定这个参数(以引用方式传递)，该参数会被写入一些key对应的信息。这些标记和Memcache::set()方法中的同名参数 意义相同。用int值的低位保留了pecl/memcache的内部用法(比如：用来说明压缩和序列化状态)

<div>
<pre>$memcache-&gt;set('id1','11111');
$memcache-&gt;add('id2','22222');
echo $memcache-&gt;get('id1') ."&lt;br&gt;";//11111
echo $memcache-&gt;get(['id1','id2'])['id2'];//22222</pre>
</div>

&nbsp;

### 分布式

&emsp;&emsp;如果有多台memcached服务器端，最好使用Memcache::addServer()来连接服务器，而不是使用Memcache::connect()去连接memcached服务器，因为PHP客户端是利用服务器池，根据"crc32(key) % current_server_num"哈希算法将key哈希到不同的服务器中。Memcache::addServer()方法的格式如下所示

<div>
<pre>bool Memcache::addServer ( string $host [, int $port = 11211 [, bool $persistent [, int $weight [, int $timeout [, int $retry_interval [, bool $status [, callback $failure_callback [, int $timeoutms ]]]]]]]] )</pre>
</div>

&emsp;&emsp;Memcache::addServer()增加一个服务器到连接池中。通过Memcache::addServer()打开的连接将会在脚本执行结束后自动关闭，也可以使用Memcache::close()进行手动关闭，也可以使用memcache_add_server()来添加服务器

&emsp;&emsp;当使用这个方法时(与Memcache::connect()和Memcache::pconnect()相反)，网络连接并不会立刻建立，而是直到真正使用的时候才建立。因此在加入大量服务器到连接池中时也是没有开销的，因为它们可能并不会被使用

&emsp;&emsp;故障转移可能在方法的任何一个层次发生，通常只要其他服务器可用，用户就不会感受到。任何的socket或memcache服务器级别的错误(比如内存溢出)都可能导致故障转移。而一般的客户端错误比如使用Memcache::add尝试增加一个已经存在的key则不会导致故障转移

&emsp;&emsp;参数host表示要连接的memcached服务端监听的主机位置。这个参数通常指定其他类型的传输比如Unix域套接字使用 unix:///path/to/memcached.sock，这种情况下参数port 必须设置为0

&emsp;&emsp;参数port表示要连接的memcached服务端监听的端口。当使用UNIX域套接字连接时设置为0

&emsp;&emsp;参数persistent用来控制是否使用持久化连接。默认TRUE

&emsp;&emsp;参数weight表示为此服务器创建的桶的数量，用来控制此服务器被选中的权重，单个服务器被选中的概率是相对于所有服务器weight总和而言的

&emsp;&emsp;参数timeout表示连接持续(超时)时间(单位秒)，默认值1秒

&emsp;&emsp;参数retry_interval表示服务器连接失败时重试的间隔时间，默认值15秒。如果此参数设置为-1表示不重试。此参数和persistent参数在扩展以dl()函数动态加载的时候无效

&emsp;&emsp;每个失败的连接结构有自己的超时时间，并且在它失效之前选择后端服务请求时该结构会被跳过。一旦一个连接失效，它将会被成功重新连接或被标记为失败连接以在下一个retry_interval秒重连。典型的影响是每个web服务子进程在服务于一个页面时将会每retry_interval秒尝试重新连接一次

&emsp;&emsp;参数status用来控制此服务器是否可以被标记为在线状态。设置此参数值为FALSE并且retry_interval参数设置为-1时，允许将失败的服务器保留在一个池中以免影响key的分配算法。对于这个服务器的请求会进行故障转移或者立即失败，这受限于memcache.allow_failover参数的设置。该参数默认TRUE，表明允许进行故障转移

&emsp;&emsp;参数failure_callback表示允许用户指定一个运行时发生错误后的回调函数。回调函数会在故障转移之前运行。回调函数会接受到两个参数，分别是失败主机的主机名和端口号

<div>
<pre>&lt;?php
//实例化对象
$memcache = new Memcache;
//连接memcache服务器
$memcache-&gt;addServer('localhost');
$memcache-&gt;addServer('192.168.1.2');
$memcache-&gt;addServer('192.168.1.3');
for($i=0;$i&lt;100;$i++){
    $memcache-&gt;set('key'.$i,md5($i),0,60);
}
//关闭连接
$memcache-&gt;close();
?&gt;</pre>
</div>

&nbsp;

### 状态

**Memcache::getStats**

&emsp;&emsp;Memcache::getStats &mdash; 获取服务器统计信息

<div>
<pre>array Memcache::getStats ([ string $type [, int $slabid [, int $limit = 100 ]]] )</pre>
</div>

&emsp;&emsp;Memcache::getStats()返回一个关联数据的服务器统计信息。数组key是统计信息名， 值就是统计信息的值。同样可以使用函数memcache_get_stats()

&emsp;&emsp;参数type表示期望抓取的统计信息类型，可以使用的值有{reset, malloc, maps, cachedump, slabs, items, sizes}。通过memcached协议指定这些附加参数是为了方便memcache开发者(检查其中的变动)

&emsp;&emsp;参数slabid用于与参数type联合从指定slab分块拷贝数据，cachedump命令会完全占用服务器通常用于比较严格的调试。

&emsp;&emsp;参数limit用于和参数type联合来设置cachedump时从服务端获取的实体条数

<div>
<pre>&lt;?php
//实例化对象
$memcache = new Memcache;
//连接memcache服务器
$memcache-&gt;addServer('localhost');
/*
Array ( [pid] =&gt; 6268 [uptime] =&gt; 3054571472 [time] =&gt; 240596173 [version] =&gt; 1.4.4-14-g9c660c0 [pointer_size] =&gt; 64 [curr_connections] =&gt; 13 [total_connections] =&gt; 24 [connection_structures] =&gt; 14 [cmd_get] =&gt; 37 [cmd_set] =&gt; 526 [cmd_flush] =&gt; 1 [get_hits] =&gt; 31 [get_misses] =&gt; 6 [delete_misses] =&gt; 0 [delete_hits] =&gt; 2 [incr_misses] =&gt; 0 [incr_hits] =&gt; 0 [decr_misses] =&gt; 0 [decr_hits] =&gt; 0 [cas_misses] =&gt; 0 [cas_hits] =&gt; 0 [cas_badval] =&gt; 0 [auth_cmds] =&gt; 0 [auth_errors] =&gt; 0 [bytes_read] =&gt; 27834 [bytes_written] =&gt; 9658 [limit_maxbytes] =&gt; 67108864 [accepting_conns] =&gt; 1 [listen_disabled_num] =&gt; 0 [threads] =&gt; 4 [conn_yields] =&gt; 0 [bytes] =&gt; 10655 [curr_items] =&gt; 105 [total_items] =&gt; 518 [evictions] =&gt; 0 )
 */
print_r($memcache-&gt;getStats()); 
//关闭连接
$memcache-&gt;close();
?&gt;</pre>
</div>

**Memcache::getExtendedStats**

&emsp;&emsp;Memcache::getExtendedStats &mdash; 缓存服务器池中所有服务器统计信息

<div>
<pre>array Memcache::getExtendedStats ([ string $type [, int $slabid [, int $limit = 100 ]]] )</pre>
</div>

&emsp;&emsp;Memcache::getExtendedStats() 返回一个二维关联数据的服务器统计信息。数组的key由host:port方式组成，无效的服务器返回的统计信息被设置为false，同样的，可以使用函数memcache_get_extended_stats()

&emsp;&emsp;参数type表示期望抓取的统计信息类型，可以使用的值有{reset, malloc, maps, cachedump, slabs, items, sizes}。 通过memcached协议指定这些附加参数是为了方便memcache开发者(检查其中的变动)

&emsp;&emsp;参数slabid用于与参数type联合从指定slab分块拷贝数据，cachedump命令会完全占用服务器通常用于 比较严格的调试

&emsp;&emsp;参数limit用于和参数type联合来设置cachedump时从服务端获取的实体条数

<div>
<pre>&lt;?php
    $memcache_obj = new Memcache;
    $memcache_obj-&gt;addServer('memcache_host', 11211);
    $memcache_obj-&gt;addServer('failed_host', 11211);
    $stats = $memcache_obj-&gt;getExtendedStats();
/*
Array
(
    [memcache_host:11211] =&gt; Array
        (
            [pid] =&gt; 3756
            [uptime] =&gt; 603011
            [time] =&gt; 1133810435
            [version] =&gt; 1.1.12
            [rusage_user] =&gt; 0.451931
            [rusage_system] =&gt; 0.634903
            [curr_items] =&gt; 2483
            [total_items] =&gt; 3079
            [bytes] =&gt; 2718136
            [curr_connections] =&gt; 2
            [total_connections] =&gt; 807
            [connection_structures] =&gt; 13
            [cmd_get] =&gt; 9748
            [cmd_set] =&gt; 3096
            [get_hits] =&gt; 5976
            [get_misses] =&gt; 3772
            [bytes_read] =&gt; 3448968
            [bytes_written] =&gt; 2318883
            [limit_maxbytes] =&gt; 33554432
        )
    [failed_host:11211] =&gt; false
)
 */    
    print_r($stats);
?&gt;</pre>
</div>

&nbsp;

### 安全

&emsp;&emsp;访问MYSQL数据库服务器时必须通过用户验证后才能进入，而访问memcached服务器则是通过客户端连接后直接操作，没有任何的验证过程。这样如果服务器直接暴露在互联网上的话是比较危险，轻则数据泄露被其他无关人员查看，重则服务器被入侵。为了安全起见，有以下两点安全措施

&emsp;&emsp;**1、内网访问**

&emsp;&emsp;最好把两台服务器之间的访问设置为内网形态的，一般在Web服务器跟Memcache服务器之间。普遍的服务器都是有两块网卡，一块指向互联网，一块指向内网，那么就让Web服务器通过内网的网卡来访问Memcache服务器，Memcache服务器启动时，就监听内网的IP地址和端口，内网间的访问能够有效阻止其他非法的访问

<div>
<pre># memcached -d -m 1024 -u root -l 192.168.0.200 -p 11211 -c 1024 start</pre>
</div>

&emsp;&emsp;Memcache服务器端设置监听通过内网的192.168.0.200的ip的11211端口，占用1024MB内存，并且允许最大1024个并发连接

&emsp;&emsp;**2、设置防火墙**

&emsp;&emsp;防火墙是简单有效的方式，如果memcache和web Server在同一台机器上，或通过外网IP来访问Memcache的话，就需要使用防火墙或者代理程序来过滤非法访问

&emsp;&emsp;一般在Linux下可以使用iptables或者FreeBSD下的ipfw来指定一些规则防止一些非法的访问，比如可以设置只允许Web服务器来访问Memcache服务器，同时阻止其他的访问

<div>
<pre># iptables -F
# iptables -P INPUT DROP
# iptables -A INPUT -p tcp -s 192.168.0.2 &ndash;dport 11211 -j ACCEPT
# iptables -A INPUT -p udp -s 192.168.0.2 &ndash;dport 11211 -j ACCEPT</pre>
</div>

&emsp;&emsp;上面的iptables规则是只允许192.168.0.2这台Web服务器对Memcache服务器的访问，能够有效的阻止一些非法访问，相应的也可以增加一些其他的规则来加强安全性，这个可以根据自己的需要来做

&nbsp;

### 应用

&emsp;&emsp;在项目中最常见的memcache应用，是缓存从数据库中查询的数据结果，以及保存会话控制信息。会话控制将在以后介绍。下面主要介绍如何将数据库查询出来的结果使用memcache服务器进行缓存，以减少频繁的数据库连接及大量的查询对数据库造成的压力。设计的原则是只要数据库中的记录没有被改变，就不需要重新连接数据库并反复执行重复的查询语句，相同的查询结果都应该从缓存服务器中获取

<div>
<pre>&lt;?php 
function select($sql,MemCache $memcache){
    $key=md5($sql);
    $data = $memcache-&gt;get($key);
    if(!$data) {
        try {
            $pdo = new PDO("mysql:host=localhost;dbname=xsphp", "root", "123456");
        }catch(PDOException $e) {
            die("数据库连接失败:".$e-&gt;getMessage());
        }
        $stmt = $pdo -&gt; prepare($sql);
        $stmt -&gt; execute();
        $data = $stmt -&gt; fetchAll(PDO::FETCH_ASSOC);
        $memcache -&gt; add($key, $data, MEMCACHE_COMPRESSED, 0);
    }
    return $data;
}
$memcache = new Memcache;
$memcache -&gt; connect("localhost", 11211);
$data = select("SELECT * FROM user",$memcache);
var_dump($data);
$memcache -&gt; close();
?&gt;</pre>
</div>