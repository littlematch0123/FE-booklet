# 前端学HTTP之URL

&emsp;&emsp;一般地，URL和URI比较难以区分。接下来，本文以区分URL和URI为引子，详细介绍URL的用法

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

&nbsp;

### 与URI区别

&emsp;&emsp;URI是Uniform Resource Identifier的缩写，称为统一资源标识符。URI是一个通用的概念，由两个主要的子集URL和URN构成，URL是通过描述资源的位置来标识资源的，而URN则是通过名字来识别资源的，与它们当前所处位置无关

&emsp;&emsp;URL是Uniform Resource Locator的缩写，称为统一资源定位符。URL正是使用web浏览器等访问web页面时需要输入的网页地址

&emsp;&emsp;URL是一种强有力的工具。但URL并不完美。它表示的是实际的地址，而不是准确的名字。这种方案的缺点在于如果资源被移走了，URL也就不再有效了。那时，它就无法对对象进行定位了&nbsp;

&emsp;&emsp;如果有了对象的准确名称，则不论其位于何处都可以找到这个对象。就像人一样，只要给定了资源的名称和其他一些情况，无论资源移到何处，都能够追踪到它。为了应对这个问题，因特网工程任务组(Internet Engineering Task Force, IETF) 已经对URN的新标准做了一段时间的研究了。无论对象搬移到什么地方，URN都能为对象提供一个稳定的名称

&emsp;&emsp;但是，从URL转换成URN是一项巨大的工程，支持URN需要进行很多改动&mdash;&mdash;标准主体的一致性，对各种HTTP应用程序的修改等。所以，还要等待更合适的时机才能进行这种转换

&nbsp;

### URL语法

&emsp;&emsp;URL语法建立在由下面9部分构成的通用格式上。其中，URL最重要的3个部分是方案(scheme)、主机(host)和路径(path)

<div>
<pre>&lt;scheme&gt;://&lt;user&gt;:&lt;password&gt;@&lt;host&gt;:&lt;port&gt;/&lt;path&gt;:&lt;params&gt;?&lt;query&gt;#&lt;frag&gt;</pre>
</div>

**【方案】**

&emsp;&emsp;方案实际上是规定如何访问指定资源的主要标识符，它会告诉负责解析URL的应用程序应该使用什么协议

&emsp;&emsp;方案组件必须以一个字母符号开始，由第一个&ldquo;:&rdquo;符号将其与URL的其余部分分隔开来。方案名是大小写无关的，因此URL&ldquo;`http://www.hardware.com`&rdquo;和&ldquo;`HTTP://www.hardware.com`&rdquo; 是等价的

&emsp;&emsp;常见的方案如下

1、HTTP

&emsp;&emsp;HTTP是一种超文本传输协议方案，除了没有用户名和密码之外，与通用的URL格式相符。如果省略了端口，就默认为80

&emsp;&emsp;基本格式：

<div>
<pre>http://&lt;host&gt;:&lt;port&gt;/&lt;path&gt;?&lt;query&gt;#&lt;frag&gt;</pre>
</div>

&emsp;&emsp;示例：

<div>
<pre>http://www.hardware.com/index.html
http://www.hardware.com:80/index.html</pre>
</div>

2、https

&emsp;&emsp;方案https与方案http是一对。唯一的区别在于方案https使用了网景的SSL， SSL为HTTP连接提供了端到端的加密机制。其语法与HTTP的语法相同，默认端口为443

&emsp;&emsp;基本格式：

<div>
<pre>https://&lt;host&gt;:&lt;port&gt;/&lt;path&gt;?&lt;query&gt;#&lt;frag&gt;</pre>
</div>

&emsp;&emsp;示例：

<div>
<pre>https://www.hardware.com/secure.html</pre>
</div>

3、Mailto&nbsp;

&emsp;&emsp;Mailto URL指向的是E-mail地址。由于E-mail的行为与其他方案都有所不同(它并不指向任何可以直接访问的对象)，所以mailto URL的格式与标准URL的格式也有所不同

&emsp;&emsp;示例：

<div>
<pre>mailto:joe@hardware.com</pre>
</div>

4、ftp

&emsp;&emsp;文件传输协议URL可以用来从FTP服务器上下载或向其上传文件，并获取FTP服务器上的目录结构内容的列表

&emsp;&emsp;在Web和URL出现之前，FTP就已经存在了。Web应用程序将FTP作为一种数据访问方案使用

&emsp;&emsp;基本格式：

<div>
<pre>ftp://&lt;user&gt;:&lt;password&gt;@&lt;host&gt;:&lt;port&gt;/&lt;path&gt;;&lt;params&gt;</pre>
</div>

&emsp;&emsp;示例：

<div>
<pre>ftp://anonymous:joe%40hardware.com@prep.ai.mit.edu:21/pub/gnu/</pre>
</div>

5、rtsp,rtspu

&emsp;&emsp;RTSP URL是可以通过实时流传输协议(Real Time Streaming Protocol)解析的音/视频媒体资源的标识符

&emsp;&emsp;方案rtspu中的u表示它是使用UDP协议来获取资源的

&emsp;&emsp;基本格式：

<div>
<pre>rtsp://&lt;user&gt;:&lt;password&gt;@&lt;host&gt;:&lt;port&gt;/&lt;path&gt;
rtspu://&lt;user&gt;:&lt;password&gt;@&lt;host&gt;:&lt;port&gt;/&lt;path&gt;</pre>
</div>

&emsp;&emsp;示例：

<div>
<pre>rtsp://www.hardware.com:554/interview/cto_video</pre>
</div>

6、file

&emsp;&emsp;方案file表示一台指定主机(通过本地磁盘、网络文件系统或其他一些文件共享系统)上可直接访问的文件。各字段都遵循通用格式。如果省略了主机名，就默认为正在使用URL的本地主机

&emsp;&emsp;基本格式：

<div>
<pre>file ://&lt;host&gt;/&lt;path&gt;</pre>
</div>

&emsp;&emsp;示例：

<div>
<pre>file://OFFICE-FS/policies/casual-fridays.doc</pre>
</div>

7、telnet

&emsp;&emsp;方案telnet用于访问交互式业务。它表示的不是对象自身，而是可通过telnet协议访问的交互式应用程序(资源)

&emsp;&emsp;基本格式：

<div>
<pre>telnet://&lt;user&gt;:&lt;password&gt;@&lt;host&gt;:&lt;port&gt;/</pre>
</div>

&emsp;&emsp;示例：

<div>
<pre>telnet://slurp:webhound@joes-hardware.com:23/</pre>
</div>

&emsp;&emsp;注意：除了以上常见的7种方案之外，如果要查看全部的URI方案列表，请[移步至此](https://www.w3.org/Addressing/schemes.html)

**【主机和端口】**

&emsp;&emsp;要想在因特网上找到资源，应用程序要知道是哪台机器装载了资源，以及在那台机器的什么地方可以找到能对目标资源进行访问的服务器。URL的主机和端口组件提供了这两组信息

&emsp;&emsp;主机组件标识了因特网上能够访问资源的宿主机器。可以用上述主机名(`www.hardware.com`)或者IP地址来表示主机名

&emsp;&emsp;注意：IP地址可以是192.168.1.1这类IPv4地址名，还可以是[0:0:0:0:0:0:0:1]这样用括号括起来的IPv6地址名

&emsp;&emsp;比如，下面两个URL就指向同一个资源&mdash;&mdash;第一个URL通过主机名，第二个通过IP地址指向服务器：

<div>
<pre>http://www.hardware.com:80/index.html 
http://161.58.228.45:80/index.html</pre>
</div>

&emsp;&emsp;端口组件标识了服务器正在监听的网络端口。对下层使用了TCP协议的HTTP来说，默认端口号为80

**【用户名和密码】**

&emsp;&emsp;很多服务器都要求输入用户名和密码才会允许用户访问数据。FTP服务器就是这样一个常见的实例

<div>
<pre>ftp://ftp.prep.ai.mit.edu/pub/gnu
ftp://anonymous@ftp.prep.ai.mit.edu/pub/gnu
ftp://anonymous:my_passwd@ftp.prep.ai.mit.edu/pub/gnu 
http://joe:joespasswd@www.joes-hardware.com/sales_info.txt</pre>
</div>

&emsp;&emsp;第一个例子没有用户或密码组件，只有标准的方案、主机和路径。如果某应用程序使用的URL方案要求输入用户名和密码，比如FTP，但用户没有提供，它通常会插入一个默认的用户名和密码。比如，如果向浏览器提供一个FTP URL，但没有指定用户名和密码，它就会插入anonymous(匿名用户)作为你的用户名，并发送一个默认的密码(IE会发送IEUser)

&emsp;&emsp;第二个例子显示了一个指定为anonymous的用户名。这个用户名与主机组件组合在一起，看起来就像E-mail地址一样。字符将用户和密码组件与URL的其余部分分隔开来

&emsp;&emsp;在第三个例子中，指定了用户名(anonymous)和密码(my_passwd)，两者之间由字符&ldquo;:&rdquo;分隔

**【路径】**

&emsp;&emsp;URL的路径组件说明了资源位于服务器的什么地方。路径通常很像一个分级的文件系统路径

<div>
<pre>http://www.hardware.com:80/seasonal/index-fall.html </pre>
</div>

&emsp;&emsp;这个URL中的路径为/seasonal/index-fall.html，很像UNIX文件系统中的文件系统路径。路径是服务器定位资源时所需的信息。可以用字符&ldquo;/&rdquo;将HTTP URL的路径组件划分成一些路径段(path segment)，每个路径段都有自己的参数(param)组件

**【参数】**

&emsp;&emsp;对很多方案来说，只有简单的主机名和到达对象的路径是不够的。除了服务器正在监听的端口，以及是否能够通过用户名和密码访问资源外，很多协议都还需要更多的信息才能工作

&emsp;&emsp;负责解析URL的应用程序需要这些协议参数来访问资源。否则，另一端的服务器可能就不会为请求提供服务，或者更糟糕的是，提供错误的服务。比如，像FTP这样的协议，有两种传输模式：二进制和文本形式。肯定不希望以文本形式来传送二进制图片，这样的话，二进制图片可能会变得一团糟

&emsp;&emsp;为了向应用程序提供它们所需的输入参数，以便正确地与服务器进行交互，URL中有一个参数组件。这个组件就是URL中的名值对列表，由字符&ldquo;;&rdquo;将其与URL的其余部分(以及各名值对)分隔开来。它们为应用程序提供了访问资源所需的所有附加信息。比如：

<div>
<pre>ftp://prep.ai.mit.edu/pub/gnu;type=d</pre>
</div>

&emsp;&emsp;在这个例子中，有一个参数type=d，参数名为type，值为d

&emsp;&emsp;如前所述，HTTP URL的路径组件可以分成若干路径段。每段都可以有自己的参数。比如：

<div>
<pre>http://www.hardware.com/hammers;sale=false/index.html;graphics=true</pre>
</div>

&emsp;&emsp;这个例子就有两个路径段，hammers和index.html。hammers路径段有参数sale，其值为false。index.html段有参数graphics，其值为true

**【查询字符串】**

&emsp;&emsp;很多资源，比如数据库服务，都是可以通过提问题或进行査询来缩小所请求资源类型范围的。假设数据库中维护着一个未售货物的清单，并可以对淸单进行査询，以判断产品是否有货，那就可以用下列URL来査询Web数据库网关，看看编号为12731、颜色为blue、尺寸为large的条目是否有货：

<div>
<pre>http://www.hardware.com/inventory-check.cgi?item=12731&amp;color=blue&amp;size=large</pre>
</div>

&emsp;&emsp;这个URL的大部分都与我们见过的其他URL类似。只有问号(?)右边的内容是新出现的。这部分被称为查询(query)组件。URL的査询组件和标识网关资源的URL路径组件一起被发送给网关资源

&emsp;&emsp;除了有些不合规则的字符需要特别处理之外，对査询组件的格式没什么要求。按照常规，很多网关都希望査询字符串以一系列&ldquo;名/值&rdquo;对的形式出现，名值对之间用字符&ldquo;&amp;&rdquo;分隔

**【片段】**

&emsp;&emsp;有些资源类型，比如HTML，除了资源级之外，还可以做进一步的划分。比如，对一个带有章节的大型文本文档来说，资源的URL会指向整个文本文档，但理想的情况是，能够指定资源中的那些章节

&emsp;&emsp;为了引用部分资源或资源的一个片段，URL支持使用片段(frag)组件来表示一个资源内部的片段。比如，URL可以指向HTML文档中一个特定的图片或小节

&emsp;&emsp;片段挂在URL的右手边，最前面有一个字符&ldquo;#&rdquo;。比如：

<div>
<pre>http://www.hardware.com/tools.html#drills</pre>
</div>

&emsp;&emsp;在这个例子中，片段drills引用了Web服务器上页面/tools.html中的一个部分。这部分的名字叫做drills

&emsp;&emsp;HTTP服务器通常只处理整个对象，而不是对象的片段，客户端不能将片段传送给服务器。浏览器从服务器获得了整个资源之后，会根据片段来显示感兴趣的那部分资源

&nbsp;

### 字符

&emsp;&emsp;URL的设计者们认识到有时人们可能会希望URL中包含除通用的安全字母表之外的二进制数据或字符。因此，需要有一种转义机制，能够将不安全的字符编码为安全字符，再进行传输

&emsp;&emsp;人们设计了一种编码机制，用来在URL中表示各种不安全的字符。这种编码机制就是通过一种&ldquo;转义&rdquo;表示法来表示不安全字符的，这种转义表示法包含一个百分号(%)，后面跟着两个表示字符ASCII码的十六进制数

&emsp;&emsp;下面是一些例子

![url1](https://pic.xiaohuochai.site/blog/HTTP_url1.jpg)

&emsp;&emsp;在URL中，有几个字符被保留起来，有着特殊的含义。有些字符不在定义的US- ASCII可打印字符集中。还有些字符会与某些因特网网关和协议产生混淆，因此不赞成使用

&emsp;&emsp;下面列出了保留及受限的字符

![url2](https://pic.xiaohuochai.site/blog/HTTP_url2.jpg)
<div>&nbsp;</div>

### 编码方法

【encodeURI()】

&emsp;&emsp;encodeURI()函数把字符串作为URI进行编码，实际上enchodeURI()函数只把参数中的空格编码为%20，其余特殊字符均不会转换

&emsp;&emsp;encodeURI()的不编码字符有82个:

<div>
<pre>! # $ &amp; ' ( ) * + , - . / : ; = ? @ _ ~ 0-9 a-z A-Z</pre>
</div>
<div>
<pre>//'http://www.w3school.com.cn&lt;br /&gt;'
console.log(encodeURI("http://www.w3school.com.cn")+ "&lt;br /&gt;")

//'`http://www.w3school.com.cn/My%20first/`'
console.log(encodeURI("`http://www.w3school.com.cn/My first/`"))
//',/?:@&amp;=+$#'
console.log(encodeURI(",/?:@&amp;=+$#"))</pre>
</div>

&emsp;&emsp;注意：encodeURI()可以编码中文

<div>
<pre>//'%E6%B5%8B%E8%AF%95'
console.log(encodeURI('测试'));</pre>
</div>

【decodeURI()】

&emsp;&emsp;decodeURI()函数可对encodeURI()函数编码过的URI进行解码。实际上，decodeURI()仅仅会把%20转换为空格显示

<div>
<pre>//"http://www.w3school.com.cn/My first/"
console.log(decodeURI("http://www.w3school.com.cn/My%20first/"));</pre>
</div>

【encodeURIComponent()】

&emsp;&emsp;encodeURIComponent()函数可把字符串作为URI组件进行编码。该方法主要对;/?:@&amp;=+$,#等这些用于分隔URI组件的字符以及中文进行编码

&emsp;&emsp;encodeURIComponent不编码字符有71个：

<div>
<pre>!， '，(，)，*，-，.，_，~，0-9，a-z，A-Z</pre>
</div>

&emsp;&emsp;由于此方法对:/都进行了编码，所以不能用它来对网址进行编码，而适合对URI中的参数进行编码

&emsp;&emsp;注意：encodeURIComponent()可以编码中文

<div>
<pre>var uri = "http://www.wrox.com/illegal value.htm#start";
//'`http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.htm%23start`'
console.log(encodeURIComponent(uri));
//'%E6%B5%8B%E8%AF%95'
console.log(encodeURIComponent('测试'));</pre>
</div>

【decodeURIComponent()】

&emsp;&emsp;decodeURIComponent()函数可对encodeURIComponent()函数编码的URI进行解码

<div>
<pre>var uri = 'http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.htm%23start';
//'http://www.wrox.com/illegal value.htm#start'
console.log(decodeURIComponent(uri));</pre>
</div>

【escape()】

&emsp;&emsp;escape()函数对字符串进行编码，将字符的unicode编码转化为16进制序列

&emsp;&emsp;ES3中反对escape()的使用，并建议用encodeURI和encodeURIComponent代替，不过escape()依然被广泛的用于cookie的编码，因为escape()恰好编码了cookie中的非法字符并且对路径中常出现的&ldquo;/&rdquo;不进行编码

&emsp;&emsp;escape()的不编码字符有69个:

<div>
<pre>* + - . / @ _ 0-9 a-z A-Z</pre>
</div>

&emsp;&emsp;注意：escape()可以编码中文

<div>
<pre>var uri = "http://www.wrox.com/illegal value.htm#start";
//'http%3A//www.wrox.com/illegal%20value.htm%23start'
console.log(escape(uri));
//%u6D4B%u8BD5
console.log(escape('测试'));</pre>
</div>

【unescape()】

&emsp;&emsp;unescape()函数用于对escape()函数编码的URI进行解码

<div>
<pre>//http://www.wrox.com/illegal value.htm#start
console.log(unescape('http%3A//www.wrox.com/illegal%20value.htm%23start'));
//'测试'
console.log(unescape('%u6D4B%u8BD5'));</pre>
</div>
