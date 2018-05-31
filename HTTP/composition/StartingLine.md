# 前端学HTTP之报文起始行

&emsp;&emsp;如果说HTTP是因特网的信使，那么HTTP报文就是它用来搬东西的包裹了。HTTP报文是在HTTP应用程序之间发送的简单的格式化数据块，每条报文都包含一条来自客户端的请求，或者一条来自服务器的响应。它们由三个部分组成：由起始行、首部和实体的主体部分。本文将主要介绍HTTP报文起始行

![startingLine1](https://pic.xiaohuochai.site/blog/HTTP_startingLine1.jpg)

&nbsp;

### 报文语法

&emsp;&emsp;所有的HTTP报文都可以分为两类：请求报文(request message)和响应报文(response message)。请求报文会向Web服务器请求一个动作，响应报文会将请求的结果返回给客户端。请求和响应报文的基本报文结构相同

![startingLine2](https://pic.xiaohuochai.site/blog/HTTP_startingLine2.jpg)

&emsp;&emsp;请求报文的格式：

<div>
<pre>&lt;method&gt; &lt;request-URL&gt; &lt;version&gt;
&lt;headers&gt;
&lt;entity-body&gt;</pre>
</div>

&emsp;&emsp;响应报文的格式：

<div>
<pre>&lt;version&gt;&lt;status&gt;&lt;reason-phrase&gt;
&lt;headers&gt;
&lt;entity-body&gt;</pre>
</div>

【方法(method)】

&emsp;&emsp;客户端希望服务器对资源执行的动作。是一个单独的词，比如GET、HEAD或POST

【请求 URL(request-URL)】

&emsp;&emsp;命名了所请求资源，或者URL路径组件的完整URL

【版本(version)】

&emsp;&emsp;报文所使用的HTTP版本，格式如下:&nbsp;

<div>
<pre>HTTP/&lt;major&gt;.&lt;minor&gt;</pre>
</div>

&emsp;&emsp;其中主要版本号(major)和次要版本号(minor)都是整数

【状态码(status-code)】

&emsp;&emsp;这三位数字描述了请求过程中所发生的情况。每个状态码的第一位数字都用于描述状态的一般类别(&ldquo;成功&rdquo;、&ldquo;出错&rdquo;等)

【原因短语(reason-phrase)】

&emsp;&emsp;数字状态码的可读版本，包含行终止序列之前的所有文本

【首部(header)】

&emsp;&emsp;可以有零个或多个首部，毎个首部都包含一个名字，后面跟着一个冒号(:)，然后是一个可选的空格，接着是一个值，最后是一个CRLF。首部是由一个空行(CRLF)结束的，表示了首部列表的结束和实体主体部分的开始

【实体的主体部分(entity-body)】

&emsp;&emsp;实体的主体部分包含一个由任意数据组成的数据块。并不是所有的报文都包含实体的主体部分，有时，报文只是以一个CRLF结束

&nbsp;

### 分类

&nbsp;　 &nbsp;所有的HTTP报文都以一个起始行作为开始。请求报文的起始行说明了要做些什么，响应报文的起始行说明发生了什么。下面将详细介绍起始行的内容

**请求行**

&emsp;&emsp;请求报文请求服务器对资源进行一些操作。请求报文的起始行，或称为请求行，包含了一个方法和一个请求URL，这个方法描述了服务器应该执行的操作，请求URL描述了要对哪个资源执行这个方法。请求行中还包含HTTP的版本，用来告知服务器，客户端使用的是哪种HTTP。所有这些字段都由空格符分隔

**响应行**

&emsp;&emsp;响应报文承载了状态信息和操作产生的所有结果数据，将其返回给客户端。响应报文的起始行，或称为响应行，包含了响应报文使用的HTTP版本、数字状态码，以及描述操作状态的文本形式的原因短语。所有这些字段都由空格符进行分隔

&nbsp;

### 方法

&emsp;&emsp;请求的起始行以方法作为开始，方法用来告知服务器要做些什么

&emsp;&emsp;HTTP常用方法共以下8种

<div>
<pre>GET：获取资源
POST：传输实体主体
PUT：传输文件
HEAD：获取报文首部
DELETE：删除文件
OPTIONS：询问支持的方法
TRACE：追踪路径
CONNECT：要求用隧道协议连接代理</pre>
</div>

**GET**

&emsp;&emsp;GET是最常用的方法。通常用于请求服务器发送某个资源

![startingLine3](https://pic.xiaohuochai.site/blog/HTTP_startingLine3.jpg)
![startingLine4](https://pic.xiaohuochai.site/blog/HTTP_startingLine4.jpg)

**HEAD**

&emsp;&emsp;HEAD方法与GET方法的行为很类似，但服务器在响应中只返回首部。不会返回实体的主体部分。这就允许客户端在未获取实际资源的情况下，对资源的首部进行检査。使用HEAD，可以：1、在不获取资源的情况下了解资源的情况(比如，判断其类型)；2、通过査看响应中的状态码，看看某个对象是否存在；3、通过査看首部，测试资源是否被修改

![startingLine5](https://pic.xiaohuochai.site/blog/HTTP_startingLine5.jpg)

![startingLine6](https://pic.xiaohuochai.site/blog/HTTP_startingLine6.jpg)

**PUT**

&emsp;&emsp;与GET从服务器读取文档相反，PUT方法会向服务器写入文档。就像FTP协议的文件上传一样，要求在请求报文的主体中包含文件内容，然后保存到请求URI指定的位置

&emsp;&emsp;但是，由于HTTP/1.1的PUT方法自身不带验证机制，任何人都可以上传文件，存在安全性问题，因此一般的Web网站不使用该方法。若配合Web应用程序的验证机制，或架构设计采用REST(REpresentational State Transfer，表征状态转移)标准的同类Web网站，就可能会开放使用PUT方法

![startingLine7](https://pic.xiaohuochai.site/blog/HTTP_startingLine7.jpg)

**POST**

&emsp;&emsp;POST方法起初是用来向服务器输入数据的。实际上，通常会用它来支持HTML的表单

![startingLine8](https://pic.xiaohuochai.site/blog/HTTP_startingLine8.jpg)

![startingLine9](https://pic.xiaohuochai.site/blog/HTTP_startingLine9.jpg)

**TRACE**

&emsp;&emsp;TRACE请求会在目的服务器端发起一个&ldquo;环回&rdquo;诊断。行程最后一站的服务器会弹回一条TRACE响应，并在响应主体中携带它收到的原始请求报文。这样客户端就可以査看在所有中间HTTP应用程序组成的请求/响应链上，原始报文是否，以及如何被毁坏或修改过

&emsp;&emsp;发送请求时，在Max-Forwards首部字段中填入数值，每经过一个服务器端就将该数字减 1，当数值刚好减到0时，就停止继续传输，最后接收到请求的服务器端则返回状态码 200 OK 的响应

&emsp;&emsp;但是，TRACE方法本来就不怎么常用，再加上它容易引发XST(Cross-Site Tracing，跨站追踪)攻击，通常就更不会用到了

![startingLine10](https://pic.xiaohuochai.site/blog/HTTP_startingLine10.jpg)

**OPTIONS**

&emsp;&emsp;OPTIONS方法请求Web服务器告知其支持的各种功能。可以询问服务器通常支持哪些方法，或者对某些特殊资源支持哪些方法

&emsp;&emsp;这为客户端应用程序提供了一种手段，使其不用实际访问那些资源就能判定访问各种资源的最优方式

![startingLine11](https://pic.xiaohuochai.site/blog/HTTP_startingLine11.jpg)
![startingLine12](https://pic.xiaohuochai.site/blog/HTTP_startingLine12.jpg)

**DELETE**

&emsp;&emsp;DELETE方法所做的事情就是请服务器删除请求URL所指定的资源

&emsp;&emsp;但是，HTTP/1.1 的 DELETE 方法本身和 PUT 方法一样不带验证机制，所以一般的Web网站也不使用DELETE方法。当配合Web应用程序的验证机制，或遵守REST标准时还是有可能会开放使用的

![startingLine13](https://pic.xiaohuochai.site/blog/HTTP_startingLine13.jpg)

**CONNECT**

&emsp;&emsp;CONNECT方法要求在与代理服务器通信时建立隧道，实现用隧道协议进行TCP通信。主要使用SSL(Secure Sockets Layer，安全套接层)和TLS(Transport Layer Security，传输层安全)协议把通信内容加密后经网络隧道传输

**扩展方法**

&emsp;&emsp;HTTP被设计成字段可扩展的，这样新的特性就不会使老的软件失效了。扩展方法指的就是没有在HTTP/1.1规范中定义的方法。服务器会为它所管理的资源实现一些HTTP服务，这些方法为开发者提供了一种扩展这些HTTP服务能力的手段。下面表中列出的这些方法是WebDAV HTTP扩展包含的所有方法，这些方法有助于通过HTTP将Web内容发布到Web服务器上去

![startingLine14](https://pic.xiaohuochai.site/blog/HTTP_startingLine14.jpg)

&nbsp;

### 版本

&emsp;&emsp;HTTP协议有几个版本，HTTP应用程序要尽量强健地处理各种不同的HTTP协议变体

【HTTP/0.9】

&emsp;&emsp;HTTP的1991原型版本称为HTTP/0.9。这个协议有很多严重的设计缺陷，只应该用于与老客户端的交互。HTTP/0.9只支持GET方法，不支持多媒体内容的MIME类型、各种HTTP首部，或者版本号。HTTP/0.9定义的初衷是为了获取简单的HTML对象，它很快就被H1TP/1.0取代了

【HTTP/1.0】

&emsp;&emsp;1.0是第一个得到广泛使用的HTTP版本。HTTP/1.0添加了版本号、各种HTTP首部、一些额外的方法，以及对多媒体对象的处理，HTTP/1.0使得包含生动图片的Web页面和交互式表格成为可能，而这些页面和表格促使万维网为人们广泛地接受。这个规范从未得到良好地说明。在这个HTTP协议的商业演进和学术研究都在快速进行的时代，它集合了一系列的最佳实践

【HTTP/1.0】

&emsp;&emsp;在20世纪90年代中叶，很多流行的Web客户端和服务器都在飞快地向HTTP中添加各种特性，以满足快速扩张且在商业上十分成功的万维网的需要。其中很多特性，包括持久的keep-alive连接，虚拟主机支持，以及代理连接支持都被加入到HTTP之中，并成为非官方的事实标准。这种非正式的HTTP扩展版本通常称为 HTTP/1.0+

【HTTP/1.1】

&emsp;&emsp;HTTP/1.1重点关注的是校正HTTP设计中的结构性缺陷，明确语义，引入重要的性能优化措施，并删除一些不好的特性。HTTP/1.1还包含了对更复杂的Web应用程序和部署方式的支持。HTTP/1.1是当前使用的HTTP版本

【HTTP-NG(又名HTTP/2.0)】

&emsp;&emsp;HTTP-NG是HTTP/1.1后继结构的原型建议，它重点关注的是性能的大幅优化，以及更强大的服务逻辑远程执行框架。在与HTTP/1.1完全语义兼容的基础上，进一步减少了网络延迟

&emsp;&emsp;随着2015年5月14日HTTP/2协议正式版的发布，越来越多的网站和第三方CDN服务开始启用HTTP/2。HTTP/2是新一代的 HTTP，也是HTTP的未来

&nbsp;

### 状态码

&emsp;&emsp;HTTP状态码负责表示客户端HTTP请求的返回结果、标记服务器端的处理是否正常、通知出现的错误等工作。HTTP状态码被分成了五大类，不同的类型代表不同类别的状态码

<div>
<pre>1XX Informational(信息性状态码) 表示接收的请求正在处理
2XX Success(成功状态码) 表示请求正常处理完毕
3XX Redirection(重定向状态码) 表示需要进行附加操作以完成请求
4XX Client Error(客户端错误状态码) 表示服务器无法处理请求
5XX Server Error(服务器错误状态码) 表示服务器处理请求出错</pre>
</div>

&emsp;&emsp;只要遵守状态码类别的定义，即使改变RFC2616中定义的状态码，或服务器端自行创建状态码都没问题

&emsp;&emsp;仅记录在RFC2616上的HTTP状态码就达40种，若再加上WebDAV(Web-based Distributed Authoring and Versioning，基于万维网的分布式创作和版本控制)(RFC4918、5842)和附加HTTP状态码(RFC6585)等扩展，数量就达60余种。但实际上经常使用的大概只有十几种

**【1XX】**

&emsp;&emsp;该部分状态码是信息性状态码，只有两个

```
100 (继续) 请求者应当继续提出请求。 服务器返回此代码表示已收到请求的第一部分，正在等待其余部分。

101 (切换协议) 请求者已要求服务器切换协议，服务器已确认并准备切换
```

**【2XX】**

&emsp;&emsp;客户端发起请求时，这些请求通常是成功的。服务器有一组用来表示成功的状态码，分别对应不同类型的请求

```
200 (成功) 服务器已成功处理了请求。 通常，这表示服务器提供了请求的网页。

201 (已创建) 请求成功并且服务器创建了新的资源。

202 (已接受) 服务器已接受请求，但尚未处理。

203 (非授权信息) 服务器已成功处理了请求，但返回的信息可能来自另一来源。

204 (无内容) 服务器成功处理了请求，但没有返回任何内容。

205 (重置内容) 服务器成功处理了请求，但没有返回任何内容。

206 (部分内容) 服务器成功处理了部分 GET 请求。
```
**【3XX】**

&emsp;&emsp;重定向状态码要么告知客户端使用替代位置来访问他们所感兴趣的资源，要么就提供一个替代的响应而不是资源的内容。如果资源已被移动，可发送一个重定向状态码和一个可选的Location首部来告知客户端资源已被移走，以及现在可以在哪里找到它。这样，浏览器就可以在不打扰使用者的情况下，透明地转入新的位置了

```
300 (多种选择) 针对请求，服务器可执行多种操作。 服务器可根据请求者 (user agent) 选择一项操作，或提供操作列表供请求者选择。

301 (永久移动) 请求的网页已永久移动到新位置。 服务器返回此响应(对 GET 或 HEAD 请求的响应)时，会自动将请求者转到新位置。

302 (临时移动) 服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求。

303 (查看其他位置) 请求者应当对不同的位置使用单独的 GET 请求来检索响应时，服务器返回此代码。

304 (未修改) 自从上次请求后，请求的网页未修改过。 服务器返回此响应时，不会返回网页内容。

305 (使用代理) 请求者只能使用代理访问请求的网页。 如果服务器返回此响应，还表示请求者应使用代理。

307 (临时重定向) 服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求。
```
**【4XX】**

&emsp;&emsp;有时客户端会发送一些服务器无法处理的东西，比如格式错误的请求报文，或者请求一个不存在的URL

&emsp;&emsp;浏览网页时，我们都看到过404 Not Found错误码&mdash;&mdash;这只是服务器在告诉我们，它对我们请求的资源一无所知。很多客户端错误都是由浏览器来处理的。只有少量错误，比如404，还是会穿过浏览器来到用户面前

```
400 (错误请求) 服务器不理解请求的语法。

401 (未授权) 请求要求身份验证。 对于需要登录的网页，服务器可能返回此响应。

403 (禁止) 服务器拒绝请求。

404 (未找到) 服务器找不到请求的网页。

405 (方法禁用) 禁用请求中指定的方法。

406 (不接受) 无法使用请求的内容特性响应请求的网页。

407 (需要代理授权) 此状态代码与 401(未授权)类似，但指定请求者应当授权使用代理。

408 (请求超时) 服务器等候请求时发生超时。

409 (冲突) 服务器在完成请求时发生冲突。 服务器必须在响应中包含有关冲突的信息。

410 (已删除) 如果请求的资源已永久删除，服务器就会返回此响应。

411 (需要有效长度) 服务器不接受不含有效内容长度标头字段的请求。

412 (未满足前提条件) 服务器未满足请求者在请求中设置的其中一个前提条件。

413 (请求实体过大) 服务器无法处理请求，因为请求实体过大，超出服务器的处理能力。

414 (请求的 URI 过长) 请求的 URI(通常为网址)过长，服务器无法处理。

415 (不支持的媒体类型) 请求的格式不受请求页面的支持。

416 (请求范围不符合要求) 如果页面无法提供请求的范围，则服务器会返回此状态代码。

417 (未满足期望值) 服务器未满足"期望"请求标头字段的要求。
```
**【5XX】**

&emsp;&emsp;有时客户端发送了一条有效请求，服务器自身却出错了。这可能是客户端碰上了服务器的缺陷，或者服务器上的子元素，比如某个网关资源出了错。代理尝试着代表客户端与服务器进行交流时，经常会出现问题。代理会发布5XX服务器错误状态码来描述所遇到的问题

```
500 (服务器内部错误) 服务器遇到错误，无法完成请求。

501 (尚未实施) 服务器不具备完成请求的功能。 例如，服务器无法识别请求方法时可能会返回此代码。

502 (错误网关) 服务器作为网关或代理，从上游服务器收到无效响应。

503 (服务不可用) 服务器目前无法使用(由于超载或停机维护)。 通常，这只是暂时状态。

504 (网关超时) 服务器作为网关或代理，但是没有及时从上游服务器收到请求。

505 (HTTP 版本不受支持) 服务器不支持请求中所用的 HTTP 协议版本。
```