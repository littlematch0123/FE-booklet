# 前端学HTTP之实体和编码

&emsp;&emsp;每天都有各种媒体对象经由HTTP传送，如图像、文本、影片以及软件程序等。HTTP要确保它的报文被正确传送，识别、提取以及适当处理。为了实现这些目标，HTTP使用了完善的标签来描述承载内容的实体。本文将详细介绍HTTP的实体和编码

&nbsp;

### 实体介绍

&emsp;&emsp;如果把HTTP报文想象成因特网货运系统中的箱子，那么HTTP实体就是报文中实际的货物。下图展示了一个简单的实体，装在HTTP响应报文中

![coding1](https://pic.xiaohuochai.site/blog/HTTP_coding1.jpg)

&emsp;&emsp;实体首部指出这是一个纯文本文档(Content-Type : text/plain)，它只有18个字节长(Content-Length: 18)。和往常一样，一个空白行(CRLF)把首部字段同主体的开始部分分隔开来

&emsp;&emsp;HTTP实体首部描述了HTTP报文的内容。HTTP/1.1版定义了以下10个基本字体首部字段

<div>
<pre>Content-Type         &emsp;&emsp; 实体中所承载对象的类型
Content-Length        &emsp;&emsp;所传送实体主体的长度或大小
Content-Language    &emsp;&emsp;  与所传送对象最相配的语言
Content-Encoding    &emsp;&emsp;  对象数据所做的任意变换(比如，压缩)
Content-Location    &emsp;&emsp;  一个备用位置，请求时可通过它获得对象
Content-Range       &emsp;&emsp;  如果这是部分实体，这个首部说明它是整体的哪部分
Content-MD5              实体主体内容的校验和
Last-Modified        　 　所传输内容在服务器上创建或最后修改的日期时间
Expires                  实体数据将要失效的日期时间
Allow                　 　该资源所允许的各种请求方法，如GET和HEAD
ETag                &emsp;&emsp; 这份文档特定实例的唯一验证码
Cache-Control        &emsp;&emsp;指出应该如何缓存该文档</pre>
</div>

&emsp;&emsp;注意：ETag和Cache-Control首部没有正式定义为实体首部，但它对许多涉及实体的操作来说，是很重要的

【实体主体】

&emsp;&emsp;实体主体中就是原始货物。任何其他描述性的信息都包含在首部中。因为货物(也就是实体主体)只是原始数据，所以需要实体首部来描述数据的意义。例如，Content-Type实体首部告诉我们如何去解释数据(是图像还是文本等)，而Content-Encoding实体首部告诉我们数据是不是已被压缩或者重编码

&emsp;&emsp;首部字段以一个空白的CRLF行结束，随后就是实体主体的原始内容。不管内容是什么，文本或二进制的、文档或图像、压缩的或未压缩的、英语、法语或日语，都紧随这个CRLF之后

&emsp;&emsp;下图展示了两个实际的HTTP报文的例子。一个携带着文本实体，另一个承载的是图像实体。十六进制的数值中展示的是报文的实际内容

![coding2](https://pic.xiaohuochai.site/blog/HTTP_coding2.jpg)

&emsp;&emsp;在图a中，实体主体从第65个字节开始，紧随首部末尾的CRLF。实体主体中包含了&ldquo;Hi! I&rsquo;m a message!&rdquo;这句话的ASCII编码字符

&emsp;&emsp;在图b中，实体主体从第67字节开始。实体主体包含了一个GIF格式图像的二进制内容。GIF文件以6个字节的版本标志开头，后面是16位的宽度和16位的髙度，可以在实体主体中直接看到这3项内容

&nbsp;

### 实体大小

&emsp;&emsp;Content-Length首部指示出报文中实体主体的字节大小。这个大小是包含了所有内容编码的。比如，对文本文件进行了gzip压缩的话，Content-Length首部就是压缩后的大小，而不是原始大小

&emsp;&emsp;除非使用了分块编码，否则Content-Length首部就是带有实体主体的报文必须使用的。使用Content-Length首部是为了能够检测出服务器崩溃而导致的报文截尾，并对共享持久连接的多个报文进行正确分段

&emsp;&emsp;HTTP的早期版本采用关闭连接的办法来划定报文的结束。但是，没有Content-Length的话，客户端无法区分到底是报文结束时正常的连接关闭，还是报文传输中由于服务器崩溃而导致的连接关闭。客户端需要通过Content-Length来检测报文截尾

&emsp;&emsp;报文截尾的问题对缓存代理服务器来说尤其严重。如果缓存服务器收到被截尾的报文却没有识别出截尾的话，它可能会存储不完整的内容并多次使用它来提供服务。缓存代理服务器通常不会为没有显式Content-Length首部的HTTP主体做缓存，以此来减小缓存已截尾报文的风险

&emsp;&emsp;错误的Content-Length比缺少Content-Length还要糟糕。因为某些早期的客户端和服务器在Content-Length计算上存在一些众所周知的错误，有些客户端、服务器以及代理中就包含了特别的算法，用来检测和纠正与有缺陷服务器的交互过程。HTTP/1.1规定用户Agent代理应该在接收且检测到无效长度时通知用户

&emsp;&emsp;Content-Length首部对于持久连接是必不可少的。如果响应通过持久连接传送，就可能有另一条HTTP响应紧随其后。客户端通过Content-Length首部就可以知道报文在何处结束，下一条报文从何处开始。因为连接是持久的，客户端无法依赖连接关闭来判别报文的结束。如果没有Content-Length首部，HTTP应用程序就不知道某个实体主体在哪里结束，下一条报文从哪里开始

&emsp;&emsp;有一种情况下，使用持久连接时可以没有Content-Length首部，即采用分块编码(chunked encoding)时。在分块编码的情况下，数据是分为一系列的块来发送的，每块都有大小说明。哪怕服务器在生成首部的时候不知道整个实体的大小(通常是因为实体是动态生成的)，仍然可以使用分块编码传输若干已知大小的块

&emsp;&emsp;HTTP允许对实体主体的内容进行编码，比如可以使之更安全或进行压缩以节省空间。如果主体进行了内容编码，Content-Length首部说明的就是编码后(encoded)的主体的字节长度，而不是未编码的原始主体的长度

&emsp;&emsp;某些HTTP应用程序在这方面搞错了，发送的是数据编码之前的大小，这会导致严重的错误，尤其是用在持久连接上。不幸的是，HTTP/1.1规范中没有首部可以用来说明原始的、未编码的主体的长度，这就让客户端难以验证解码过程的完整性

【确定规则】

&emsp;&emsp;下面列出的规则说明了在若干不同的情况下如何正确计算主体的长度和结束位置。这些规则应当按顺序应用，谁先匹配就用谁

&emsp;&emsp;1、如果特定的HTTP报文类型中不允许带有主体，就忽略Content-Length首部，它是对没有实际发送出来的主体进行计算的。这种情况下，Content-Length首部是提示性的，并不说明实际的主体长度

&emsp;&emsp;最重要的例子就是HEAD响应。HEAD方法请求服务器发送等价的GET请求中会出现的首部，但不要包括主体。因为对GET的响应会带有Content-Length首部，所以HEAD响应里面也有，但和GET响应不同的是，HEAD响应中不会有主体。1XX、204以及304响应也可以有提示性的Content-Length首部，但是也都没有实体主体。那些规定不能带有实体主体的报文，不管带有什么首部字段，都必须在首部之后的第一个空行终止

&emsp;&emsp;2、如果报文中含有描述传输编码的Transfer-Encoding首部(不采用默认的 HTTP&ldquo;恒等&rdquo;编码)，那实体就应由一个称为&ldquo;零字节块&rdquo;(zero-byte chunk)的特殊模式结束，除非报文已经因连接关闭而结束

&emsp;&emsp;3、如果报文中含有Content-Length首部(并且报文类型允许有实体主体)，而且没有非恒等的Transfer-Encoding首部字段，那么Content-Length的值就是主体的长度。如果收到的报文中既有Content-Length首部字段又有非恒等的Transfer-Encoding首部字段，那就必须忽略Content-Length，因为传输编码会改变实体主体的表示和传输方式(因此可能就会改变传输的字节数)

&emsp;&emsp;4、如果报文使用了multipart/byteranges(多部分/字节范围)媒体类型，并且没有用Content-Length首部指出实体主体的长度，那么多部分报文中的每个部分都要说明它自己的大小。这种多部分类型是唯一的一种自定界的实体主体类型，因此除非发送方知道接收方可以解析它，否则就不能发送这种媒体类型

&emsp;&emsp;5、如果上面的规则都不匹配，实体就在连接关闭的时候结束。实际上，只有服务器可以使用连接关闭来指示报文的结束。客户端不能用关闭连接来指示客户端报文的结束，因为这样会使服务器无法发回响应

&emsp;&emsp;为了和使用HTTP/1.0的应用程序兼容，任何带有实体主体的HTTP/1.1请求都必须带有正确的Content-Length首部字段(除非已经知道服务器兼容HTTP/1.1)

&emsp;&emsp;HTTP/1.1规范中建议对于带有主体但没有Content-Length首部的请求，服务器如果无法确定报文的长度，就应当发送400 Bad Request响应或411 Length Required响应，后一种情况表明服务器要求收到正确的Content-Length首部

&nbsp;

### 实体摘要

&emsp;&emsp;尽管HTTP通常都是在像TCP/IP这样的可靠传输协议之上实现的，但仍有很多因素会导致报文的一部分在传输过程中被修改，比如有不兼容的转码代理，或者中间代理有误等等。为检测实体主体的数据是否被不经意地修改，发送方可以在生成初始的主体时，生成一个数据的校验和，这样接收方就可以通过检査这个校验和来捕获所有意外的实体修改了

&emsp;&emsp;服务器使用Content-MD5首部发送对实体主体运行MD5算法的结果。只有产生响应的原始服务器可以计算并发送Content-MD5首部。中间代理和缓存不应当修改或添加这个首部，否则就会与验证端到端完整性的这个最终目的相冲突。Content-MD5首部是在对内容做了所有需要的内容编码之后，还没有做任何传输编码之前，计算出来的。为了验证报文的完整性，客户端必须先进行传输编码的解码，然后计算所得到的未进行传输编码的实体主体的MD5

&emsp;&emsp;如果一份文档使用gzip算法进行压缩，然后用分块编码发送，那么就对整个经gzip压缩的主体进行MD5计算

&emsp;&emsp;除了检査报文的完整性之外，MD5还可以当作散列表的关键字，用来快速定位文档并消除不必要的重复内容存储。除了这些可能的用法，一般不常用到Content-MD5首部

&emsp;&emsp;作为对HTTP的扩展，在IETF的草案中提出了其他一些摘要算法。这些扩展建议增加新的Want-Digest首部，它允许客户端说明期望响应中使用的摘要类型，并使用质量值来建议多种摘要算法并说明优先顺序

&nbsp;

### 媒体类型

&emsp;&emsp;Content-Type首部字段说明了实体主体的MIME类型。MIME类型是标准化的名字，用以说明作为货物运载实体的基本媒体类型(比如：HTML文件、Microsoft Word文档或是MPEG视频等)。客户端应用程序使用MIME类型来解释和处理其内容

&emsp;&emsp;Content-Type的值是标准化的MIME类型，都在互联网号码分配机构(Internet Assigned Numbers Authority，简称IANA)中注册。MIME类型由一个主媒体类型(比如：text、image或audio等)后面跟一条斜线以及一个子类型组成，子类型用于进一步描述媒体类型

&emsp;&emsp;注意：要访问完整的MIME媒体类型注册列表[请移步至此](http://www.iana.org/assignments/media-types/media-types.xhtml)

&emsp;&emsp;下表中列出了一些Content-Type首部中常用的MIME类型

<div>
<pre>媒体类型            &emsp;&emsp;描 述
text/html             实体主体是HTML文档
text/plain            实体主体是纯文本文档
image/gif             实体主体是GIF格式的图像
image/jpeg        &emsp;&emsp;实体主体是JPEG格式的图像
audio/x-wav    &emsp;&emsp;&emsp;&emsp;实体主体包含WAV格式声音数据
model/vrml    &emsp;&emsp;&emsp;&emsp; 实体主体是三维的VRML模型
applicaiion/vnd.ms-powerpoint  实体主体是Microsoft PowerPoint演示文档
multipart/byteranges    &emsp;&emsp;&emsp;&emsp; 实体主体有若干部分，每个部分都包含了完整文档中不同的字节范围
message/http    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;　实体主体包含完整的HTTP报文(参见TRACE)        </pre>
</div>

&emsp;&emsp;要着重注意的是，Content-Type首部说明的是原始实体主体的媒体类型。如果实体经过内容编码的话，Content-Type首部说明的仍是编码之前的实体主体的类型

&emsp;&emsp;Content-Type首部还支持可选的参数来进一步说明内容的类型。charset(字符集)参数就是个例子，它说明把实体中的比特转换为文本文件中的字符的方法：

<div>
<pre>Content-Type: text/html; charset=iso-8859-4</pre>
</div>

&emsp;&emsp;MIME中的multipart(多部分)电子邮件报文中包含多个报文，它们合在一起作为单一的复杂报文发送。每一部分都是独立的，有各自的描述其内容的集，不同的部分之间用分界字符串连接在一起

&emsp;&emsp;HTTP也支持多部分主体。不过，通常只用在下列两种情形之一：提交填写好的表格，或是作为承载若干文档片段的范围响应

【多部分表格提交】

&emsp;&emsp;当提交填写的HTTP表格时，变长的文本字段和上传的对象都作为多部分主体里面独立的部分发送，这样表格中就可以填写各种不同类型和长度的值。比如，可能选择用昵称和小照片来填写询问你的名字和介绍信息的表格，而你的朋友可能填了她的全名并在介绍信息表内抱怨了一堆大众汽车的修理问题

&emsp;&emsp;HTTP使用Content-Type:multipart/form-data或Content-Type:multipart/ mixed这样的首部以及多部分主体来发送这种请求，举例如下：

<div>
<pre>Content-Type: multipart/form-data;boundary=[abcdefghijklmnopqrstuvwxyz]</pre>
</div>

&emsp;&emsp;其中的boundary参数说明了分割主体中不同部分所用的字符串

&emsp;&emsp;下面的例子展示了multipart/form-data编码。假设我们有这样的表格：

<div>
<pre>&lt;form action="http://server.com/cgi/handle" enctype="multipart/form-data" method="post"&gt;
&lt;p&gt;What is your name?&lt;input type="text" name="submit-name"&gt;&lt;br&gt; What files are you sending?&lt;input type="file" name="files"&gt;&lt;/p&gt;
&lt;input type="submit" value="Send"&gt;&lt;input type="reset"&gt;
&lt;/form&gt;</pre>
</div>

&emsp;&emsp;如果用户在文本输入字段中键入Sally，并选择了文本文件essayfile.txt，用户Agent代理可能会发回下面这样的数据：

![coding3](https://pic.xiaohuochai.site/blog/HTTP_coding3.jpg)

&emsp;&emsp;如果用户还选了另一个(图像)文件imagefile.gif，用户Agent代理可能像下面这样构造这个部分：

![coding4](https://pic.xiaohuochai.site/blog/HTTP_coding4.jpg)

![coding5](https://pic.xiaohuochai.site/blog/HTTP_coding5.jpg)

【多部分范围响应】

&emsp;&emsp;HTTP对范围请求的响应也可以是多部分的。这样的响应中有Content-Type: multipart/byteranges首部和带有不同范围的多部分主体。下面是一个例子，展示了对文档不同范围的请求产生的响应：

![coding6](https://pic.xiaohuochai.site/blog/HTTP_coding6.jpg)

&nbsp;

### 内容编码

&emsp;&emsp;HTTP应用程序有时在发送之前需要对内容进行编码。例如，在把很大的HTML文档发送给通过慢速连接连上来的客户端之前，服务器可能会对它进行压缩，这样有助于减少传输实体的时间。服务器还可以把内容搅乱或加密，以此来防止未经授权的第三方看到文档的内容

&emsp;&emsp;这种类型的编码是在发送方应用到内容之上的。当内容经过内容编码之后，编好码的数据就放在实体主体中，像往常一样发送给接收方

【内容编码过程】

&emsp;&emsp;内容编码的过程如下所述

&emsp;&emsp;1、网站服务器生成原始响应报文，其中有原始的Content-Type和Content- Length首部

&emsp;&emsp;2、内容编码服务器(也可能就是原始的服务器或下行的代理)创建编码后的报文。编码后的报文有同样的Content-Type但Content-Length可能不同(比如主体被压缩了)。内容编码服务器在编码后的报文中增加Content-Encoding首部，这样接收的应用程序就可以进行解码了

&emsp;&emsp;3、接收程序得到编码后的报文，进行解码，获得原始报文

&emsp;&emsp;下图给出了内容编码的梗概示例

![coding7](https://pic.xiaohuochai.site/blog/HTTP_coding7.jpg)

&emsp;&emsp;在这个例子中，通过gzip内容编码函数对HTML页面处理之后，得到一个更小的、压缩的主体。经过网络发送的是压缩的主体，并打上了gzip压缩的标志。接收的客户端使用gzip解码器对实体进行解压缩

&emsp;&emsp;下面给出的响应片段是另一个编码响应的例子(一个压缩的图像)：

<div>
<pre>HTTP/1.1 200 OK
Date: Fri, 05 Nov 2016 22:35:15 GMT
Server: Apache/1.2.4
Content-Length: 6096
Content-Type: image/gif
Content-Encoding: gzip
[...]</pre>
</div>

&emsp;&emsp;注意，Content-Type首部可以且还应当出现在报文中。它说明了实体的原始格式，一旦实体被解码，要显示的时候，可能还是需要该信息才行的。记住，Content-Length首部现在代表的是编码之后的主体长度

【内容编码类型】

&emsp;&emsp;HTTP定义了一些标准的内容编码类型，并允许用扩展编码的形式增添更多的编码。 由互联网号码分配机构(IANA)对各种编码进行标准化，它给每个内容编码算法分配了唯一的代号。Content-Encoding首部就用这些标准化的代号来说明编码时使用的算法

&emsp;&emsp;下表列出了一些常用的内容编码代号

<div>
<pre>Content-Encoding值       描述
gzip                   表明实体采用GNU zip编码
compress               表明实体采用Unix的文件压缩程序
deflate                表明实体是用zlib的格式压缩的
identity               表明没有对实体进行编码。当没有Content-Encoding首部时，就默认为这种情况</pre>
</div>

&emsp;&emsp;gzip、compress以及deflate编码都是无损压缩算法，用于减少传输报文的大小，不会导致信息损失。这些算法中，gzip通常是效率最高的，使用最为广泛

【Accept-Encoding 首部】

&emsp;&emsp;毫无疑问，我们不希望服务器用客户端无法解码的方式来对内容进行编码。为了避免服务器使用客户端不支持的编码方式，客户端就把自己支持的内容编码方式列表放在请求的Accept-Encoding首部里发出去。如果HTTP请求中没有包含Accept-Encoding首部，服务器就可以假设客户端能够接受任何编码方式(等价于发送Accept-Encoding:*)

&emsp;&emsp;下图展示HTTP事务中的Accept-Encoding首部

![coding8](https://pic.xiaohuochai.site/blog/HTTP_coding8.jpg)

&emsp;&emsp;Accept-Encoding字段包含用逗号分隔的支持编码的列表，下面是一些例子

<div>
<pre>Accept-Encoding: compress, gzip
Accept-Encoding: *
Accept-Encoding: compress;q=0.5, gzip; q=1.0 
Accept-Encoding: gzip;q=l.0, identity; q=0.5, *;q=0</pre>
</div>

&emsp;&emsp;客户端可以给每种编码附带Q(质值参数来说明编码的优先级。Q值的范围从0.0到1.0，0.0说明客户端不想接受所说明的编码，1.0则表明最希望使用的编码。"*"表示&ldquo;任何其他方法&rdquo;。决定在响应中回送什么内容给客户端是个更通用的过程，而选择使用何种内容编码则是此过程的一部分

&emsp;&emsp;identity编码代号只能在Accept-Encoding首部中出现，客户端用它来说明相对于其他内容编码算法的优先级

&nbsp;

### 传输编码

&emsp;&emsp;内容编码，是对报文的主体进行的可逆变换。内容编码是和内容的具体格式细节紧密相关的。例如，可能会用gzip压缩文本文件，但不是JPEG文件，因为JPEG这类东西用gzip压缩的不够好

&emsp;&emsp;传输编码也是作用在实体主体上的可逆变换，但使用它们是由于架构方面的原因，同内容的格式无关。使用传输编码是为了改变报文中的数据在网络上传输的方式

![coding9](https://pic.xiaohuochai.site/blog/HTTP_coding9.jpg)

【可靠传输】

&emsp;&emsp;长久以来，在其他一些协议中会用传输编码来保证报文经过网络时能得到&ldquo;可靠传输&rdquo;。在HTTP协议中，可靠传输关注的焦点有所不同，因为底层的传输设施已经标准化并且容错性更好。在HTTP中，只有少数一些情况下，所传输的报文主体可能会引发问题，其中两种情况如下所述

&emsp;&emsp;1、未知的尺寸

&emsp;&emsp;如果不先生成内容，某些网关应用程序和内容编码器就无法确定报文主体的最终大小。通常，这些服务器希望在知道大小之前就开始传输数据。因为HTTP协议要求Content-Length首部必须在数据之前，有些服务器就使用传输编码来发送数据，并用特別的结束脚注表明数据结束

&emsp;&emsp;2、安全性

&emsp;&emsp;可以用传输编码来把报文内容扰乱，然后在共享的传输网络上发送。不过，由于像SSL这样的传输层安全体系的流行，就很少需要靠传输编码来实现安全性了

【Transfer-Encoding首部】

&emsp;&emsp;HTTP协议中只定义了下面两个首部来描述和控制传输编码

<div>
<pre>Transfer-Encoding         告知接收方为了可靠地传输报文，已经对其进行了何种编码
TE                        用在请求首部中，告知服务器可以使用哪些传输编码扩展</pre>
</div>

&emsp;&emsp;下面的例子中，请求使用了TE首部来告诉服务器它可以接受分块编码(如果是HTTP/1.1应用程序的话，这就是必须的)并且愿意接受附在分块编码的报文结尾上的拖挂：

<div>
<pre>GET /new_products-html HTTP/1.1
Host: www.joes-hardware.com
User-Agent: Mozilla/4.61 [en] (WinNT; I)
TE: trailers, chunked</pre>
</div>

&emsp;&emsp;对它的响应中包含Transfer-Encoding首部，用于告诉接收方已经用分块编码对报文进行了传输编码：

<div>
<pre>HTTP/1.1 200 OK
Transfer-Encoding: chunked
Server: Apache/3.0</pre>
</div>

&emsp;&emsp;在这个起始首部之后，报文的结构就将发生改变

&emsp;&emsp;传输编码的值都是大小写无关的。HTTP/1.1规定在TE首部和Transfer-Encoding首部中使用传输编码值。最新的HTTP规范只定义了一种传输编码，就是分块编码

&emsp;&emsp;与Accept-Encoding首部类似，TE首部也可以使用Q值来说明传输编码的优先顺序。不过，HTTP/1.1规范中禁止将分块编码关联的Q值设为0.0

&emsp;&emsp;HTTP将来的扩展可能会推动对更多传输编码的需求。如果真的如此，那分块编码仍应始终作用在其他传输编码之上，这样就保证数据可以像隧道那样&ldquo;穿透&rdquo;那些只理解分块编码但不理解其他传输编码的HTTP/1.1应用程序

【分块编码】

&emsp;&emsp;分块编码把报文分割为若干个大小已知的块。块之间是紧挨着发送的，这样就不需要在发送之前知道整个报文的大小了

&emsp;&emsp;要注意的是，分块编码是一种传输编码，因此是报文的属性，而不是主体的属性

&emsp;&emsp;1、分块与持久连接

&emsp;&emsp;若客户端和服务器之间不是持久连接，客户端就不需要知道它正在读取的主体的长度，而只需要读到服务器关闭主体连接为止

&emsp;&emsp;当使用持久连接时，在服务器写主体之前，必须知道它的大小并在Content-Length首部中发送。如果服务器动态创建内容，就可能在发送之前无法知道主体的长度

&emsp;&emsp;分块编码为这种困难提供了解决方案，只要允许服务器把主体逐块发送，说明每块的大小就可以了。因为主体是动态创建的，服务器可以缓冲它的一部分，发送其大小和相应的块，然后在主体发送完之前重复这个过程。服务器可以用大小为0的块作为主体结束的信号，这样就可以继续保持连接，为下一个响应做准备

&emsp;&emsp;分块编码是相当简单的，下图展示了一个分块编码报文的基本结构。它由起始的HTTP响应首部块开始，随后就是一系列分块。每个分块包含一个长度值和该分块的数据。长度值是十六进制形式并将CRLF与数据分隔开。分块中数据的大小以字节计算，不包括长度值与数据之间的CRLF序列以及分块结尾的CRLF序列。最后一个块有点特别，它的长度值为0，表示&ldquo;主体结束&rdquo;

![coding10](https://pic.xiaohuochai.site/blog/HTTP_coding10.jpg)

&emsp;&emsp;客户端也可以发送分块的数据给服务器。因为客户端事先不知道服务器是否接受分块编码(这是因为服务器不会在给客户端的响应中发送TE首部)，所以客户端必须做好服务器用411 Length Required(需要Content-Length首部)响应来拒绝分块请求的准备

&emsp;&emsp;2、分块报文的拖挂

&emsp;&emsp;如果客户端的TE首部中说明它可以接受拖挂的话，就可以在分块的报文最后加上拖挂。产生原始响应的服务器也可以在分块的报文最后加上拖挂。拖挂的内容是可选的无数据，客户端不一定需要理解和使用，客户端可以忽略并丢弃拖挂中的内容

&emsp;&emsp;拖挂中可以包含附带的首部字段，它们的值在报文开始的时候可能是无法确定(例如，必须要先生成主体的内容)。Content-MD5首部就是一个可以在拖挂中发送的首部，因为在文档生成之前，很难算出它的MD5。上图中展示了拖挂的使用方式。报文首部中包含一个Trailer首部，列出了跟报文之后的首部列表。在Trailer首部中列出的首部就紧接在最后一个分块之后

&emsp;&emsp;除了Transfer-Encoding、Trailer以及Content-Length首部之外，其他HTTP首部都可以作为拖挂发送

&emsp;&emsp;内容编码与传输编码可以同时使用。例如，下图展示了发送方如何用内容编码压缩HTML文件，再使用传输编码分块发送。接收方&ldquo;重构&rdquo;主体的过程和发送方相反

![coding11](https://pic.xiaohuochai.site/blog/HTTP_coding11.jpg)

【传输编码的规则】

&emsp;&emsp;对报文主体使用传输编码时，必须遵守以下规则：传输编码集合中必须包括&ldquo;分块&rdquo;。唯一的例外是使用关闭连接来结束报文；当使用分块传输编码时，它必须是最后一个作用到报文主体之上的；分块传输编码不能多次作用到一个报文主体上。这些规则使得接收方能够确定报文的传输长度。

&emsp;&emsp;传输编码是HTTP1.1版中引入的一个相对较新的特性。实现传输编码的服务器必须特别注意不要把经传输编码后的报文发送给非HTTP/1.1的应用程序。同样地，如果服务器收到无法理解的经过传输编码的报文，它应当用501 Unimplemented状态码来回复。不过，所有的HTTP/1.1应用程序至少都必须支持分块编码

&nbsp;

### 实例操控

&emsp;&emsp;网站对象并不是静态的。同样的URL会随着时间变化而指向对象的不同版本。以CNN的主页为例，同一天里多次访问`http://www.cnn.com`，可能每次得到的返回页面都会略有不同

&emsp;&emsp;可以把CNN的主页当作一个对象来考虑，其不同版本就可以看作这个对象的不同实例。在下图中，客户端多次请求同一个资源(URL)，但得到的是该资源的不同实例，因为它是随时间而变化的。在时间(a)和时间(b)具有相同的实例，而在时间(c)则是不同的实例

![coding12](https://pic.xiaohuochai.site/blog/HTTP_coding12.jpg)

&emsp;&emsp;HTTP协议规定了称为实例操控(instance manipulations)的一系列请求和响应操作，用以操控对象的实例。两个主要的实例操控方法是范围请求和差异编码。这两种方法都要求客户端能够标识它所拥有(如果有的话)的资源的特定副本，并在一定的条件下请求新的实例

【新鲜度】

&emsp;&emsp;现在再回顾上图，客户端起初没有该资源的副本，因此它发送请求给服务器要求得到一份。服务器用该资源的版本1给以响应。客户端现在可以缓存这份副本，但是要缓存多长时间呢？

&emsp;&emsp;当文档在客户端&ldquo;过期&rdquo;之后(也就是说，客户端不再认为该副本有效)，客户端必须从服务器请求一份新的副本。不过，如果该文档在服务器上并未发生改变，客户端也就不需要再接收一次了&mdash;&mdash;继续使用缓存的副本即可

&emsp;&emsp;这种特殊的请求，称为有条件的请求(conditional request)，要求客户端使用验证码(validator)来告知服务器它当前拥有的版本号，并仅当它的当前副本不再有效时才要求发送新的副本

&emsp;&emsp;服务器应当告知客户端能够将内容缓存多长时间，在这个时间之内就是新鲜的。服务器可以用这两个首部之一来提供这种信息：Expires(过期) 和Cache-Control(缓存控制)

&emsp;&emsp;Expires首部规定文档&ldquo;过期&rdquo;的具体时间&mdash;&mdash;此后就不应当认为它还是最新的。Expires首部的语法如下：

<div>
<pre>Expires: Sun Mar 18 23:59:59 GMT 2016</pre>
</div>

&emsp;&emsp;客户端和服务器为了能正确使用Expires首部，它们的时钟必须同步。这并不总是很容易的，因为它们可能都没有运行像NetworkTimeProtocol(网络时间协议，NTP)这样的时钟同步协议。用相对时间来定义过期的机制会更有用。Cache-Control首部可以用秒数来规定文档最长使用期&mdash;&mdash;从文档离开服务器之后算起的总计时间。使用期不与时钟同步，因此可以给出更精确的结果

&emsp;&emsp;实际上，Cache-Control首部功能很强大。服务器和客户端都可以用它来说明新鲜度，并且除了使用期或过期时间之外，还有很多指令可用。下表列出了Cache-Control首部的一些指令

![coding13](https://pic.xiaohuochai.site/blog/HTTP_coding13.jpg)

![coding14](https://pic.xiaohuochai.site/blog/HTTP_coding14.jpg)

【验证码】

&emsp;&emsp;当请求缓存服务器中的副本时，如果它不再新鲜，缓存服务器就需要保证它有一个新鲜的副本。缓存服务器可以向原始服务器获取当前的副本。但在很多情况下，原始服务器上的文档仍然与缓存中已过期的副本相同。缓存的副本或许已经过期了，但原始服务器上的内容与缓存的内容仍然相同。如果服务器上的文档和已过期的缓存副本相同，而缓存服务器还是要从原始服务器上取文档的话，那缓存服务器就是在浪费网络带宽，给缓存服务器和原始服务器增加不必要的负载，使所有事情都变慢了

&emsp;&emsp;为了避免这种情况，HTTP为客户端提供了一种方法，仅当资源改变时才请求副本，这种特殊请求称为有条件的请求。有条件的请求是标准的HTTP请求报文，但仅当某个特定条件为真时才执行。例如，某个缓存服务器可能发送下面的有条件GET报文给服务器，仅当文件/announce.html从2016年6月29日(这是缓存的文档最后被作者修改的时间)之后发生改变的情况下才发送它：

<div>
<pre>GET /announce.html HTTP/1.0
If-Modified-Since: Sat, 29 Jun 2016, 14:30:00 GMT</pre>
</div>

&emsp;&emsp;有条件的请求是通过以&ldquo;If-&rdquo;开头的有条件的首部来实现的。在上面的例子中，有条件的首部是If-Modified-Since(如果-从&hellip;&hellip;之后-修改过)。有条件的首部使得方法仅在条件为真时才执行。如果条件不满足，服务器就发回一个HTTP错误码&emsp;&emsp;

&emsp;&emsp;每个有条件的请求都通过特定的验证码来发挥作用。验证码是文档实例的一个特殊属性，用它来测试条件是否为真。从概念上说，你可以把验证码看作文件的序列号、版本号，或者最后发生改变的日期时间

&emsp;&emsp;有条件的首部If-Modified-Since测试的是文档实例最后被修改的日期时间，因此我们说最后被修改的日期时间就是验证码。有条件的首部If-None-Match测试的是文档的ETag值，它是与实体相关联的一个特殊的关键字，或者说是版本识别标记。Last-Modified和ETag是HTTP使用的两种主要验证码。下表中列出了用于有条件请求的4种HTTP首部。每个有条件的首部之后就是这种首部所用的验证码类型

![coding15](https://pic.xiaohuochai.site/blog/HTTP_coding15.jpg)

&emsp;&emsp;HTTP把验证码分为两类：弱验证码(weak validators)和强验证码(strong validators)。弱验证码不一定能唯一标识资源的一个实例，而强验证码必须如此。弱验证码的一个例子是对象的大小字节数。有可能资源的内容改变了，而大小还保持不变，因此假想的字节计数验证码与改变是弱相关的。而资源内容的加密校验和(比如MD5)就是强验证码，当文档改变时它总是会改变

&emsp;&emsp;最后修改时间被当作弱验证码，因为尽管它说明了资源最后被修改的时间，但它的描述精度最大就是1秒。因为资源在1秒内可以改变很多次，而且服务器每秒可以处理数千个请求，最后修改日期时间并不总能反应变化情况。ETag首部被当作强验证码，因为每当资源内容改变时，服务器都可以在ETag首部放置不同的值。版本号和摘要校验和也是很好的ETag首部候选，但它们不能带有任意的文本。ETag首部很灵活，它可以带上任意的文本值(以标记的形式)，这样就可以用来设计出各种各样的客户端和服务器验证策略

&emsp;&emsp;有时候，客户端和服务器可能需要采用不那么精确的实体标记验证方法。例如，某服务器可能想对一个很大、被广泛缓存的文档进行一些美化修饰，但不想在缓存服务器再验证时产生很大的传输流量。在这种情况下，该服务器可以在标记前面加上&ldquo;W/&rdquo;前缀来广播一个&ldquo;弱&rdquo;实体标记。对于弱实体标记来说，只有当关联的实体在语义上发生了重大改变时，标记才会变化。而强实体标记则不管关联的实体发生了什么性质的变化，标记都一定会改变

&emsp;&emsp;下面的例子展示了客户端如何用弱实体标记向服务器请求再验证。服务器仅当文档的内容从版本4.0算起发生了显著变化时，才返回主体：

<div>
<pre>GET /announce.html HTTP/1.1
If-None-Match: W/"v4.0"</pre>
</div>

&emsp;&emsp;当客户端多次访问同一个资源时，首先需要判断它当前的副本是不是仍然新鲜。如果不再新鲜，它们就必须从服务器获取最新的版本。为了避免在资源没有改变的情况下收到一份相同的副本，客户端可以向服务器发送有条件的请求，说明能唯一标识客户端当前副本的验证码。只在资源和客户端的副本不同的情况下服务器才会发送其副本

【范围请求】

&emsp;&emsp;关于客户端如何要求服务器只在资源的客户端副本不再有效的情况下才发送其副本，前面已经清楚地解释了。HTTP还进一步锦上添花：它允许客户端实际上只请求文档的一部分，或者说某个范围

&emsp;&emsp;假设正通过慢速的调制解调器连接下载最新的热门软件，已经下了四分之三，忽然因为一个网络故障，连接中断了。你已经为等待下载完成耽误了很久，而现在被迫要全部重头再来，祈祷着别再发生这样的倒霉事了

&emsp;&emsp;有了范围请求，HTTP客户端可以通过请求曾获取失败的实体的一个范围(或者说一部分)，来恢复下载该实体。当然这有一个前提，那就是从客户端上一次请求该实体到这次发出范围请求的时段内，该对象没有改变过

<div>
<pre>GET /bigfile.html HTTP/1.1
Host: www.joes-hardware.com 
Range: bytes=4000-
User-Agent: Mozilla/4.61 [en] (WinNT; I)</pre>
</div>

&emsp;&emsp;在本例中，客户端请求的是文档开头4000字节之后的部分(不必给出结尾字节数，因为请求方可能不知道文档的大小)。在客户端收到了开头的4000字节之后就失败的情况下，可以使用这种形式的范围请求。还可以用Range首部来请求多个范围(这些范围可以按任意顺序给出，也可以相互重叠)

&emsp;&emsp;例如，假设客户端同时连接到多个服务器，为了加速下载文档而从不同的服务器下载同一个文档的不同部分。对于客户端在一个请求内请求多个不同范围的情况，返回的响应也是单个实体，它有一个多部分主体及Content-Type:multipart/byteranges首部

&emsp;&emsp;并不是所有服务器都接受范围请求，但很多服务器可以。服务器可以通过在响应中包含Accept-Ranges首部的形式向客户端说明可以接受的范围请求。这个首部的值是计算范围的单位，通常是以字节计算的。例如：

<div>
<pre>HTTP/1.1 200 0K
Date: Fri, 05 Nov 2016 22:35:15 GMT
Server: Apache/1.2.4
Accept-Ranges: bytes</pre>
</div>

![coding16](https://pic.xiaohuochai.site/blog/HTTP_coding16.jpg)

&emsp;&emsp;Range首部在流行的点对点(Peer-to-Peer，P2P)文件共享客户端软件中得到广泛应用，它们从不同的对等实体同时下载多媒体文件的不同部分

&emsp;&emsp;注意，范围请求也属于一类实例操控，因为它们是在客户端和服务器之间针对特定的对象实例来交换信息的。也就是说，客户端的范围请求仅当客户端和服务器拥有文档的同一个版本时才有意义

【差异编码】

&emsp;&emsp;我们曾把网站页面的不同版本看作页面的不同实例。如果客户端有一个页面的已过期副本，就要请求页面的最新实例。如果服务器有该页面更新的实例，就要把它发给客户端，哪怕页面上只有一小部分发生了改变，也要把完整的新页面实例发给客户端

&emsp;&emsp;若改变的地方比较少，与其发送完整的新页面给客户端，客户端更愿意服务器只发送页面发生改变的部分，这样就可以更快地得到最新的页面。差异编码是HTTP协议的一个扩展，它通过交换对象改变的部分而不是完整的对象来优化传输性能。差异编码也是一类实例操控，因为它依赖客户端和服务器之间针对特定的对象实例来交换信息。RFC 3229描述了差异编码

&emsp;&emsp;下图清楚地展示了差异编码的结构，包括请求、生成、接收和装配文档的全过程。客户端必须告诉服务器它有页面的哪个版本，它愿意接受页面最新版的差异(delta)，它懂得哪些将差异应用于现有版本的算法。服务器必须检査它是否有这个页面的客户端现有版本，计算客户端现有版本与最新版之间的差异(有若干算法可以计算两个对象之间的差异)。然后服务器必须计算差异，发送给客户端，告知客户端所发送的是差异，并说明最新版页面的新标识(ETag)，因为客户端将差异应用于其老版本之后就会得到这个版本

![coding17](https://pic.xiaohuochai.site/blog/HTTP_coding17.jpg)

&emsp;&emsp;客户端在If-None-Match首部中使用的是它所持有页面版本的唯一标识，这个标识是服务器之前响应客户端时在ETag首部中发送的。客户端是在对服务器说：&ldquo;如果你那里页面的最新版本标识和这个ETag不同，就把这个页面的最新版本发给我。&rdquo;如果只有If-None-Match首部，服务器将会把该页面的最新版本完整地发给客户端。(假设最新版和客户端持有的版本不同)

&emsp;&emsp;不过，如果客户端想告诉服务器它愿意接受该页面的差异，只要发送A-IM首部就可以了。A-IM是Accept-Instance-Manipulation(接受实例操控)的缩写。形象比喻的话，客户端相当于这样说：&ldquo;哦对了，我能接受某些形式的实例操控，如果你会其中一种的话，就不用发送完整的文档给我了。&rdquo;在A-IM首部中，客户端会说明它知道哪些算法可以把差异应用于老版本而得到最新版本。服务端发送回下面这些内容：一个特殊的响应代码&mdash;&mdash;226 IM Used，告知客户端它正在发送的是所请求对象的实例操控，而不是那个完整的对象自身；一个IM(Instance-Manipulation的缩写)首部，说明用于计算差异的算法，新的ETag首部和Delta-Base首部，说明用于计算差异的基线文档的ETag(理论上，它应该和客户端之前请求里的if-None-Match首部中的ETag相同)

&emsp;&emsp;下表总结了差异编码使用的首部

![coding18](https://pic.xiaohuochai.site/blog/HTTP_coding18.jpg)

&emsp;&emsp;客户端可以使用A-IM首部说明可以接受的一些实例操控的类型。服务器在IM首部中说明使用的是何种实例操控。不过到底哪些实例操控类型是可接受的呢？它们又是做什么的呢？下表中列出了一些在IANA注册的实例操控类型

![coding19](https://pic.xiaohuochai.site/blog/HTTP_coding19.jpg)

&emsp;&emsp;上图中，服务器侧的&ldquo;差异生成器&rdquo;根据基线文档和该文档的最新实例，用客户端在A-IM首部中指明的算法计算它们之间的差异。客户端侧的&ldquo;差异应用器&rdquo;得到差异，将其应用于基线文档，得到文档的最新实例。例如，如果产生差异的算法是Unix系统的diff-e命令，客户端就可以用Unix系统中的文本编辑器ed提供的功能来应用差异，因为diff-e &lt;file1&gt; &lt;file2&gt;产生了一系列ed命令来把&lt;file1&gt;转化为&lt;file2&gt;。ed是一个非常简单的编辑器，支持一些命令。上图的例子中，5c说明要删除基线文档的第5行，而chisels.&lt;cr&gt;.说明要添加chisels.，就这么简单。对于更大的改动，会产生更复杂的指令。Unix系统的diff-e算法是对文件进行逐行比较的，这对于文本文件没问题，但并不适合二进制文件。vcdiff算法更强大，对于非文本文件也适用，并且产生的差异比diff-e要小

&emsp;&emsp;差异编码的规范中详细定义了A-IM和IM首部的格式。在这里，我们只要知道这些首部中可以说明多个实例操控(并可以带有相关的质量值)就够了，在返回给客户端之前，文档可以经过多种实例操控，这样可以获得最大程度的压缩。例如，用vcdiff算法产生的差异随后可以再用gzip算法压缩。于是服务器的响应中就含有IM:vcdiff，gzip首部。客户端应当先对内容进行gunzip，再把得到的差异应用到自己的基线页面上，这样才能生成最终的文档

&emsp;&emsp;差异编码可以减少传输次数，但实现起来可能比较麻烦。设想一下页面改动频繁，而且有很多不同的人都在访问的情形。支持差异编码的服务器必须保存页面随时间变化的所有不同版本，这样才能指出最新版本与所请求的客户端持有的任意版本之间的差异

&emsp;&emsp;如果文档变化频繁，而且有很多客户端都在请求文档，那它们就会获得文档的不同实例。随后当它们再向服务器发起请求时，它们将请求它们所持有的版本与最新版本之间的差异。为了能够只向它们发送变化的部分，服务器必须保存所有客户端曾经持有过的版本

&emsp;&emsp;要降低提交文档时的延迟时间，服务器必须增加磁盘空间来保存文档的各种旧的实例。实现差异编码所需的额外磁盘空间可能很快就会将减少传输量获得的好处抵消掉

