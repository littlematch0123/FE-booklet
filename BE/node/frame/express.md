# express框架

　　Express是一个简洁、灵活的 node.js Web 应用开发框架, 它提供一系列强大的特性，帮助开发者创建各种 Web 和移动设备应用。本文将详细介绍express框架

&nbsp;

### 概述

　　[官网](http://www.expressjs.com.cn/)对Express的描述，它是一个基于 Node.js 平台，快速、开放、极简的 web 开发框架。优点是易上手、高性能、扩展性强

　　1、易上手：nodejs最初就是为了开发高性能web服务器而被设计出来的，然而相对底层的API会让不少新手望而却步。express对web开发相关的模块进行了适度的封装，屏蔽了大量复杂繁琐的技术细节，让开发者只需要专注于业务逻辑的开发，极大的降低了入门和学习的成本

　　2、高性能：Express仅在web应用相关的nodejs模块上进行了适度的封装和扩展，较大程度避免了过度封装导致的性能损耗

　　3、扩展性强：基于中间件的开发模式，使得express应用的扩展、模块拆分非常简单，既灵活，扩展性又强

【安装】

　　安装express前，首先[安装nodejs](http://www.cnblogs.com/xiaohuochai/p/6223044.html)，接下来为应用创建一个目录，然后进入此目录并将其作为当前工作目录

<div class="cnblogs_code">
<pre>$ mkdir myapp
$ cd myapp</pre>
</div>

　　通过 npm init 命令为应用创建一个 package.json 文件

<div class="cnblogs_code">
<pre>$ npm init</pre>
</div>

　　此命令要求输入几个参数，例如应用的名称和版本。 直接按&ldquo;回车&rdquo;键接受默认设置即可，下面这个除外：

<div class="cnblogs_code">
<pre>entry point: (index.js)</pre>
</div>

　　键入 app.js 或者所希望的名称，这是当前应用的入口文件。如果希望采用默认的 index.js 文件名，只需按&ldquo;回车&rdquo;键即可

　　接下来安装 Express 并将其保存到依赖列表中：

<div class="cnblogs_code">
<pre>$ npm install express --save</pre>
</div>

　　如果只是临时安装 Express，不想将它添加到依赖列表中，只需略去 --save 参数即可：

<div class="cnblogs_code">
<pre>$ npm install express</pre>
</div>

&nbsp;

### 入门实例

　　在项目根目录下，新建一个启动文件，假定叫做index.js，新建一个public文件夹，并在public目录下，新建index.html

<div class="cnblogs_code">
<pre>var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
app.listen(8080);</pre>
</div>

　　运行index.js后，访问`http://localhost:8080`，它会在浏览器中打开public目录的index.html文件

　　当然，也可以在index.js之中，生成动态网页

<div class="cnblogs_code">
<pre>// index.js
var express = require('express');
var app = express();
app.get('/', function (req, res) {
  res.send('Hello world!');
});
app.listen(3000);</pre>
</div>

　　运行index.js文件后，会在本机的3000端口启动一个网站，网页显示Hello World

　　启动脚本index.js的`app.get`方法，用于指定不同的访问路径所对应的回调函数，这叫做&ldquo;路由&rdquo;（routing）。上面代码只指定了根目录的回调函数，因此只有一个路由记录。实际应用中，可能有多个路由记录

<div class="cnblogs_code">
<pre>var express = require('express');
var app = express();
app.get('/', function (req, res) {
  res.send('Hello world!');
});
app.get('/customer', function(req, res){
  res.send('customer page');
});
app.get('/admin', function(req, res){
  res.send('admin page');
});
app.listen(3000);</pre>
</div>

　　这时，最好就把路由放到一个单独的文件中，比如新建一个routes子目录

<div class="cnblogs_code">
<pre>// routes/index.js
module.exports = function (app) {
  app.get('/', function (req, res) {
    res.send('Hello world');
  });
  app.get('/customer', function(req, res){
    res.send('customer page');
  });
  app.get('/admin', function(req, res){
    res.send('admin page');
  });
};</pre>
</div>

　　然后，原来的index.js就变成下面这样

<div class="cnblogs_code">
<pre>// index.js
var express = require('express');
var app = express();
var routes = require('./routes')(app);
app.listen(3000);</pre>
</div>

&nbsp;

### 生成器

　　通过应用生成器工具&nbsp;`express`&nbsp;可以快速创建一个应用的骨架

　　[注意]一定要使用全局模式安装express-generator，否则无法使用express命令

<div class="cnblogs_code">
<pre>$ npm install express-generator -g</pre>
</div>

`　　-h`&nbsp;选项可以列出所有可用的命令行选项：

<div class="cnblogs_code">
<pre>$ express -h
  Usage: express [options] [dir]
  Options:
    -h, --help          output usage information
    -V, --version       output the version number
    -e, --ejs           add ejs engine support (defaults to jade)
        --hbs           add handlebars engine support
    -H, --hogan         add hogan.js engine support
    -c, --css &lt;engine&gt;  add stylesheet &lt;engine&gt; support (less|stylus|compass|sass) (defaults to plain css)
        --git           add .gitignore
    -f, --force         force on non-empty directory</pre>
</div>

　　例如，下面的示例就是在当前工作目录下创建一个命名为&nbsp;_myapp_&nbsp;的应用

<div class="cnblogs_code">
<pre>$ express myapp

   create : myapp
   create : myapp/package.json
   create : myapp/app.js
   create : myapp/public
   create : myapp/public/javascripts
   create : myapp/public/images
   create : myapp/routes
   create : myapp/routes/index.js
   create : myapp/routes/users.js
   create : myapp/public/stylesheets
   create : myapp/public/stylesheets/style.css
   create : myapp/views
   create : myapp/views/index.jade
   create : myapp/views/layout.jade
   create : myapp/views/error.jade
   create : myapp/bin
   create : myapp/bin/www</pre>
</div>

　　然后安装所有依赖包：

<div class="cnblogs_code">
<pre>$ cd myapp 
$ npm instal</pre>
</div>

　　启动这个应用（MacOS 或 Linux 平台）：

<div class="cnblogs_code">
<pre>$ DEBUG=myapp npm start</pre>
</div>

　　Windows 平台使用如下命令：

<div class="cnblogs_code">
<pre>&gt; set DEBUG=myapp &amp; npm start</pre>
</div>

　　然后在浏览器中打开&nbsp;`http://localhost:3000/`&nbsp;网址就可以看到这个应用了。i

　　通过 Express 应用生成器创建的应用一般都有如下目录结构：

<div class="cnblogs_code">
<pre>.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.jade
    ├── index.jade
    └── layout.jade

7 directories, 9 files</pre>
</div>

&nbsp;

### HTTP模块

　　Express框架建立在node.js内置的http模块上。http模块生成服务器的原始代码如下

<div class="cnblogs_code">
<pre>var http = require("http");
var app = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello world!");
});
app.listen(3000, "localhost");</pre>
</div>

　　上面代码的关键是http模块的createServer方法，表示生成一个HTTP服务器实例。该方法接受一个回调函数，该回调函数的参数，分别为代表HTTP请求和HTTP回应的request对象和response对象。

　　Express框架的核心是对http模块的再包装。上面的代码用Express改写如下

<div class="cnblogs_code">
<pre>var express = require('express');
var app = express();
app.get('/', function (req, res) {
  res.send('Hello world!');
});
app.listen(3000);</pre>
</div>

　　比较两段代码，可以看到它们非常接近。原来是用`http.createServer`方法新建一个app实例，现在则是用Express的构造方法，生成一个Epress实例。两者的回调函数都是相同的。Express框架等于在http模块之上，加了一个中间层

&nbsp;

### 中间件

【概述】

　　Express 是一个自身功能极简，完全是由路由和中间件构成一个的 web 开发框架：从本质上来说，一个 Express 应用就是在调用各种中间件

　　简单说，中间件（middleware）就是处理HTTP请求的函数。它最大的特点就是，一个中间件处理完，再传递给下一个中间件。App实例在运行过程中，会调用一系列的中间件

　　每个中间件可以从App实例，接收三个参数，依次为request对象（代表HTTP请求）、response对象（代表HTTP回应），next回调函数（代表下一个中间件）。每个中间件都可以对HTTP请求（request对象）进行加工，并且决定是否调用next方法，将request对象再传给下一个中间件

　　中间件的功能包括：1、执行任何代码；2、修改请求和响应对象；3、终结请求-响应循环；4、调用堆栈中的下一个中间件

　　如果当前中间件没有终结请求-响应循环，则必须调用 next() 方法将控制权交给下一个中间件，否则请求就会挂起

　　一个不进行任何操作、只传递request对象的中间件，就是下面这样

<div class="cnblogs_code">
<pre>function uselessMiddleware(req, res, next) {
  next();
}</pre>
</div>

　　上面代码的next就是下一个中间件。如果它带有参数，则代表抛出一个错误，参数为错误文本

<div class="cnblogs_code">
<pre>function uselessMiddleware(req, res, next) {
  next('出错了！');
}</pre>
</div>

　　抛出错误以后，后面的中间件将不再执行，直到发现一个错误处理函数为止

【分类】

　　Express 应用可使用如下几种中间件：1、应用级中间件；2、路由级中间件；3、错误处理中间件；4、内置中间件；5、第三方中间件

　　1、应用级中间件绑定到 app 对象 使用 app.use() 和 app.METHOD()，其中， METHOD 是需要处理的 HTTP 请求的方法，例如 GET, PUT, POST 等等，全部小写

　　2、路由级中间件绑定的对象为&nbsp;`express.Router()`

　　3、错误处理中间件和其他中间件定义类似，只是要使用 4 个参数，而不是 3 个，其签名如下：&nbsp;`(err, req, res, next)`

<div class="cnblogs_code">
<pre>app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});</pre>
</div>

　　4、`express.static`&nbsp;是 Express 唯一内置的中间件。它基于&nbsp;[serve-static](https://github.com/expressjs/serve-static)，负责在 Express 应用中提托管静态资源

　　5、通过使用第三方中间件从而为 Express 应用增加更多功能。安装所需功能的 node 模块，并在应用中加载，可以在应用级加载，也可以在路由级加载。下面的例子安装并加载了一个解析 cookie 的中间件：&nbsp;`cookie-parser`

<div class="cnblogs_code">
<pre>$ npm install cookie-parser</pre>
</div>
<div class="cnblogs_code">
<pre>var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

// 加载用于解析 cookie 的中间件
app.use(cookieParser());</pre>
</div>

【use方法】

　　use是express注册中间件的方法，它返回一个函数。下面是一个连续调用两个中间件的例子

<div class="cnblogs_code">
<pre>var express = require("express");
var http = require("http");
var app = express();
app.use(function(request, response, next) {
  console.log("In comes a " + request.method + " to " + request.url);
  next();
});
app.use(function(request, response) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Hello world!\n");
});
http.createServer(app).listen(1337);</pre>
</div>

　　上面代码使用`app.use`方法，注册了两个中间件。收到HTTP请求后，先调用第一个中间件，在控制台输出一行信息，然后通过`next`方法，将执行权传给第二个中间件，输出HTTP回应。由于第二个中间件没有调用`next`方法，所以request对象就不再向后传递了。

`　　use`方法内部可以对访问路径进行判断，据此实现简单的路由，根据不同的请求网址，返回不同的网页内容

<div class="cnblogs_code">
<pre>var express = require("express");
var http = require("http");
var app = express();
app.use(function(request, response, next) {
  if (request.url == "/") {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Welcome to the homepage!\n");
  } else {
    next();
  }
});
app.use(function(request, response, next) {
  if (request.url == "/about") {
    response.writeHead(200, { "Content-Type": "text/plain" });
  } else {
    next();
  }
});
app.use(function(request, response) {
  response.writeHead(404, { "Content-Type": "text/plain" });
  response.end("404 error!\n");
});
http.createServer(app).listen(1337);</pre>
</div>

　　上面代码通过`request.url`属性，判断请求的网址，从而返回不同的内容。注意，`app.use`方法一共登记了三个中间件，只要请求路径匹配，就不会将执行权交给下一个中间件。因此，最后一个中间件会返回404错误，即前面的中间件都没匹配请求路径，找不到所要请求的资源。

　　除了在回调函数内部判断请求的网址，use方法也允许将请求网址写在第一个参数。这代表，只有请求路径匹配这个参数，后面的中间件才会生效。无疑，这样写更加清晰和方便

<div class="cnblogs_code">
<pre>app.use('/path', someMiddleware);</pre>
</div>

　　上面代码表示，只对根目录的请求，调用某个中间件。

　　因此，上面的代码可以写成下面的样子

<div class="cnblogs_code">
<pre>var express = require("express");
var http = require("http");
var app = express();
app.use("/home", function(request, response, next) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Welcome to the homepage!\n");
});
app.use("/about", function(request, response, next) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Welcome to the about page!\n");
});
app.use(function(request, response) {
  response.writeHead(404, { "Content-Type": "text/plain" });
  response.end("404 error!\n");
});
http.createServer(app).listen(1337);</pre>
</div>

&nbsp;

### 托管静态资源

　　上面介绍了，&nbsp;`express.static`&nbsp;是 Express 唯一内置的中间件，负责在 Express 应用中提托管静态资源，例如图片、CSS、JavaScript 文件等

**express.static(root, [options])**

参数&nbsp;`root`&nbsp;指提供静态资源的根目录，可选的&nbsp;`options`&nbsp;参数拥有如下属性

<div class="cnblogs_code">
<pre>属性        　　类型    　 缺省值 　　　　描述
dotfiles    　　String   &ldquo;ignore&rdquo; 　　是否对外输出文件名以点开头的文件。可选值为allow、deny和ignore
etag        　　Boolean   true 　　　　是否启用 etag 生成
extensions  　　Array    [] 　　　　　　设置文件扩展名备份选项
index        　 Mixed    &ldquo;index.html&rdquo; 发送目录索引文件，设置为 false 禁用目录索引。
lastModified    Boolean  true 　设置Last-Modified头为文件在操作系统上的最后修改日期。可选值为true或false
maxAge          Number   0 　　　　　　以毫秒或者其字符串格式设置 Cache-Control 头的 max-age 属性。
redirect        Boolean  true 　　　　当路径为目录时，重定向至 &ldquo;/&rdquo;。
setHeaders      Function      　　　　设置 HTTP 头以提供文件的函数。</pre>
</div>
<div class="cnblogs_code">
<pre>var options = {
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
}
app.use(express.static('public', options));</pre>
</div>

　　一般地，如果不需要特殊的设置，将静态资源文件所在的目录作为参数传递给&nbsp;`express.static`&nbsp;中间件就可以提供静态资源文件的访问了。例如，假设在&nbsp;`public`&nbsp;目录放置了图片、CSS 和 JavaScript 文件

<div class="cnblogs_code">
<pre>app.use(express.static('public'));</pre>
</div>

　　现在，`public`&nbsp;目录下面的文件就可以访问了

<div class="cnblogs_code">
<pre>http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html</pre>
</div>

　　如果静态资源存放在多个目录下面，可以多次调用&nbsp;`express.static`&nbsp;中间件：

<div class="cnblogs_code">
<pre>app.use(express.static('public'));
app.use(express.static('files'));</pre>
</div>

　　访问静态资源文件时，`express.static`&nbsp;中间件会根据目录添加的顺序查找所需的文件。

　　如果希望所有通过&nbsp;`express.static`&nbsp;访问的文件都存放在一个&ldquo;虚拟（virtual）&rdquo;目录（即目录根本不存在）下面，可以通过为静态资源目录指定一个挂载路径的方式来实现，如下所示：

<div class="cnblogs_code">
<pre>app.use('/static', express.static('public'));</pre>
</div>

　　现在，可以通过带有 &ldquo;/static&rdquo; 前缀的地址来访问&nbsp;`public`&nbsp;目录下面的文件了

<div class="cnblogs_code">
<pre>http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html</pre>
</div>

&nbsp;

### 常用中间件

【cookie-parser()】

　　用于解析cookie的中间件，添加中间后，req具备cookies属性。通过`req.cookies.xxx`可以访问cookie的值

<div class="cnblogs_code">
<pre>$ npm install cookie-parser</pre>
</div>
<div class="cnblogs_code">
<pre>var cookieParser = require('cookie-parser')
app.use(cookieParser(secret, options))</pre>
</div>

`　　secret`&nbsp;是可选参数，用于对cookie进行`签名`&nbsp;，通过它可以判断出客户是否修改了cookie，这是处于安全考虑，这个参数是任意字符串

`　　options`&nbsp;可选参数，是一个json对象，可选项包括path、expires、maxAge、domain、secure、httpOnly

<div class="cnblogs_code">
<pre>var express      = require('express')
var cookieParser = require('cookie-parser')
var app = express()
app.use(cookieParser())
app.get('/', function(req, res) {
  console.log('Cookies: ', req.cookies)
})
app.listen(8080)</pre>
</div>

【express-session】

　　session运行在服务器端，当客户端第一次访问服务器时，可以将客户的登录信息保存。&nbsp;当客户访问其他页面时，可以判断客户的登录状态，做出提示，相当于登录拦截。session可以和Redis或者数据库等结合做持久化操作，当服务器挂掉时也不会导致某些客户信息（购物车）丢失。

　　当浏览器访问服务器并发送第一次请求时，服务器端会创建一个session对象，生成一个类似于key,value的键值对， 然后将key(cookie)返回到浏览器(客户)端，浏览器下次再访问时，携带key(cookie)，找到对应的`session(value)`。客户的信息都保存在session中

<div class="cnblogs_code">
<pre>$ npm install express-session</pre>
</div>
<div class="cnblogs_code">
<pre>var express = require('express')
var session = require('express-session')
var app = express()
app.use(session(options))</pre>
</div>

　　options 常用选项如下：

　　name - 默认'connect.sid'，可自定义

　　store - session 储存器实例

　　secret&nbsp;- 用于对cookie进行`签名`&nbsp;，通过它可以判断出客户是否修改了cookie，这是处于安全考虑，这个参数是任意字符串

　　cookie -&nbsp;对session cookie的设置 。默认值 { path: '/', httpOnly: true, secure: false, maxAge: null }

　　genid - &nbsp;是个函数，调用它来生成一个新的会话ID。 （默认：使用UID2库）

　　rolling - &nbsp;强制对每个响应的Cookie，重置到期日期。 （默认：false）

　　resave - 每一次都重新保存，即使没修改过（默认：true）

　　proxy - ture／false，是否支持`trust proxy`,，需要设置&nbsp;`app.enable('trust proxy');`一般来说，无需设置

　　常用方法如下：

`　　Session.destroy()`&nbsp;:删除session，当检测到客户端关闭时调用

`　　Session.reload()`&nbsp;:当session有修改时，刷新session

`　　Session.regenerate()&nbsp;`：将已有session初始化

`　　Session.save()&nbsp;`：保存session

<div class="cnblogs_code">
<pre>var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser('sessiontest'));
app.use(session({
 secret: 'sessiontest',//与cookieParser中的一致
 resave: true,
 saveUninitialized:true
}));</pre>
</div>
<div class="cnblogs_code">
<pre>//修改router/index.js,第一次请求时保存一条用户信息。
router.get('/', function(req, res, next) {
 var user={
  name:"Chen-xy",
  age:"22",
  address:"bj"
 }
 req.session.user=user;
 res.render('index', {
  title: 'the test for nodejs session' ,
  name:'sessiontest'
 });
});</pre>
</div>
<div class="cnblogs_code">
<pre>//修改router/users.js，判断用户是否登陆。
router.get('/', function(req, res, next) {
 if(req.session.user){
  var user=req.session.user;
  var name=user.name;
  res.send('你好'+name+'，欢迎来到我的家园。');
 }else{
  res.send('你还没有登录，先登录下再试试！');
 }
});</pre>
</div>

【serve-favicon】

　　设置网站的 favicon图标

<div class="cnblogs_code">
<pre>$ npm install serve-favicon</pre>
</div>
<div class="cnblogs_code">
<pre>var express = require('express')
var favicon = require('serve-favicon')
var path = require('path')
var app = express()
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
// Add your routes here, etc. 
app.listen(3000)</pre>
</div>

【body-parser】

　　bodyParser用于解析客户端请求的body中的内容，内部使用JSON编码处理，url编码处理以及对于文件的上传处理

<div class="cnblogs_code">
<pre>$ npm install body-parser</pre>
</div>
<div class="cnblogs_code">
<pre>var bodyParser = require('body-parser')</pre>
</div>

　　1、底层中间件用法：这将拦截和解析所有的请求；也即这种用法是全局的。

<div class="cnblogs_code">
<pre>var express = require('express')
var bodyParser = require('body-parser')
var app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(function (req, res) {
 res.setHeader('Content-Type', 'text/plain')
 res.write('you posted:\n')
 res.end(JSON.stringify(req.body, null, 2))
})</pre>
</div>

　　use方法调用body-parser实例；且use方法没有设置路由路径；这样的body-parser实例就会对该app所有的请求进行拦截和解析

　　2、特定路由下的中间件用法：这种用法是针对特定路由下的特定请求的，只有请求该路由时，中间件才会拦截和解析该请求；也即这种用法是局部的；也是最常用的一个方式

<div class="cnblogs_code">
<pre>var express = require('express')
var bodyParser = require('body-parser')
var app = express()
// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// POST /login gets urlencoded bodies
app.post('/login', urlencodedParser, function (req, res) {
 if (!req.body) return res.sendStatus(400)
 res.send('welcome, ' + req.body.username)
})
// POST /api/users gets JSON bodies
app.post('/api/users', jsonParser, function (req, res) {
 if (!req.body) return res.sendStatus(400)
 // create user in req.body
})</pre>
</div>

　　express的post（或者get）方法调用body-parser实例；且该方法有设置路由路径；这样的body-parser实例就会对该post（或者get）的请求进行拦截和解析

　　3、设置Content-Type 属性；用于修改和设定中间件解析的body内容类型

<div class="cnblogs_code">
<pre>// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' });
// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }));</pre>
</div>

【morgan】

　　Mogran是一个node.js关于http请求的express默认的日志中间件

<div class="cnblogs_code">
<pre>npm install  morgan</pre>
</div>

　　在`basic.js`中添加如下代码

<div class="cnblogs_code">
<pre>var express = require('express');
var app = express();
var morgan = require('morgan');
app.use(morgan('short'));
app.use(function(req, res, next){
    res.send('ok');
});

app.listen(3000);</pre>
</div>

　　`node basic.js`运行程序，并在浏览器里访问&nbsp;[http://127.0.0.1:3000](http://127.0.0.1:3000/)&nbsp;，打印日志如下

<div class="cnblogs_code">
<pre>::1 - GET / HTTP/1.1 200 2 - 3.157 ms
::1 - GET / HTTP/1.1 304 - - 0.784 ms</pre>
</div>

　　morgan支持stream配置项，可以通过它来实现将日志落地的效果，代码如下：

<div class="cnblogs_code">
<pre>var express = require('express');
var app = express();
var morgan = require('morgan');
var fs = require('fs');
var path = require('path');
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
app.use(morgan('short', {stream: accessLogStream}));
app.use(function(req, res, next){
    res.send('ok');
});
app.listen(3000);</pre>
</div>

　　morgan的API非常少，使用频率最高的就是`morgan()`，作用是返回一个express日志中间件

<div class="cnblogs_code">
<pre>morgan(format, options)</pre>
</div>

　　参数说明如下：

　　format：可选，morgan与定义了几种日志格式，每种格式都有对应的名称，比如combined、short等，默认是default

　　options：可选，配置项，包含stream（常用）、skip、immediate

　　stream：日志的输出流配置，默认是process.stdout

　　skip：是否跳过日志记录

　　immediate：布尔值，默认是false。当为true时，一收到请求，就记录日志；如果为false，则在请求返回后，再记录日志

&nbsp;

### 路由

【路由方法】

　　针对不同的请求，Express提供了use方法的一些别名，这些别名是和 HTTP 请求对应的路由方法：&nbsp;`get`、`post`、`put`、`head`、`delete`、`options`、`trace`、`copy`、`lock`、`mkcol`、`move`、`purge`、`propfind`、`proppatch`、`unlock`、`report`、`mkactivity`、`checkout`、`merge`、`m-search`、`notify`、`subscribe`、`unsubscribe`、`patch`、`search`&nbsp;和&nbsp;`connect`

`　　app.all()`&nbsp;是一个特殊的路由方法，没有任何 HTTP 方法与其对应，它的作用是对于一个路径上的所有请求加载中间件

　　有些路由方法名不是合规的 JavaScript 变量名，此时使用括号记法，比如&nbsp;`app['m-search']('/', function ...`

<div class="cnblogs_code">
<pre>var express = require("express");
var http = require("http");
var app = express();
app.all("*", function(request, response, next) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  next();
});
app.get("/", function(request, response) {
  response.end("Welcome to the homepage!");
});
app.get("/about", function(request, response) {
  response.end("Welcome to the about page!");
});
app.get("*", function(request, response) {
  response.end("404!");
});
http.createServer(app).listen(1337);</pre>
</div>

　　上面代码的all方法表示，所有请求都必须通过该中间件，参数中的&ldquo;*&rdquo;表示对所有路径有效。get方法则是只有GET动词的HTTP请求通过该中间件，它的第一个参数是请求的路径。由于get方法的回调函数没有调用next方法，所以只要有一个中间件被调用了，后面的中间件就不会再被调用了

【路由路径】

　　路由方法的第一个参数，都是请求的路径，称为路由路径，它可以是字符串、字符串模式或者正则表达式

　　1、字符串匹配

<div class="cnblogs_code">
<pre>// 匹配 /about 路径的请求
app.get('/about', function (req, res) {
  res.send('about');
});</pre>
</div>

　　2、字符串模式匹配

<div class="cnblogs_code">
<pre>// 匹配 acd 和 abcd
app.get('/ab?cd', function(req, res) {
  res.send('ab?cd');
});</pre>
</div>

　　3、正则表达式匹配

<div class="cnblogs_code">
<pre>// 匹配任何路径中含有 a 的路径：
app.get(/a/, function(req, res) {
  res.send('/a/');
});</pre>
</div>

【路由句柄】

　　可以为请求处理提供多个回调函数，其行为类似中间件。唯一的区别是这些回调函数可能调用&nbsp;`next('route')`&nbsp;方法而略过其他路由回调函数。可以利用该机制为路由定义前提条件，如果在现有路径上继续执行没有意义，则可将控制权交给剩下的路径

　　路由句柄有多种形式，可以是一个函数、一个函数数组，或者是两者混合

　　1、使用一个回调函数处理路由

<div class="cnblogs_code">
<pre>app.get('/example/a', function (req, res) {
  res.send('Hello from A!');
});</pre>
</div>

　　2、使用多个回调函数处理路由

<div class="cnblogs_code">
<pre>app.get('/example/b', function (req, res, next) {
  console.log('response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from B!');
});</pre>
</div>

　　3、使用回调函数数组处理路由

<div class="cnblogs_code">
<pre>var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}
var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}
var cb2 = function (req, res) {
  res.send('Hello from C!');
}
app.get('/example/c', [cb0, cb1, cb2]);</pre>
</div>

　　4、混合使用函数和函数数组处理路由

<div class="cnblogs_code">
<pre>var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}
var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}
app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from D!');
});</pre>
</div>

【链式路由句柄】

　　可使用&nbsp;`app.route()`&nbsp;创建路由路径的链式路由句柄。由于路径在一个地方指定，这样做有助于创建模块化的路由，而且减少了代码冗余和拼写错误

<div class="cnblogs_code">
<pre>app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });</pre>
</div>

&nbsp;

### 路由器实例

　　从Express 4.0开始，路由器功能成了一个单独的组件`Express.Router`。它好像小型的express应用程序一样，有自己的use、get、param和route方法

　　可使用&nbsp;`express.Router`&nbsp;类创建模块化、可挂载的路由句柄。`Router`&nbsp;实例是一个完整的中间件和路由系统，因此常称其为一个 &ldquo;mini-app&rdquo;

【基本用法】

　　首先，`Express.Router`是一个构造函数，调用后返回一个路由器实例。然后，使用该实例的HTTP动词方法，为不同的访问路径，指定回调函数；最后，挂载到某个路径

<div class="cnblogs_code">
<pre>var express = require('express');
var router = express.Router();
router.get('/', function(req, res) {
  res.send('首页');
});
router.get('/about', function(req, res) {
  res.send('关于');
});
app.use('/', router);</pre>
</div>

　　上面代码先定义了两个访问路径，然后将它们挂载到根目录。如果最后一行改为app.use(&lsquo;/app&rsquo;, router)，则相当于为`/app`和`/app/about`这两个路径，指定了回调函数。

　　这种路由器可以自由挂载的做法，为程序带来了更大的灵活性，既可以定义多个路由器实例，也可以为将同一个路由器实例挂载到多个路径

【router.route方法】

　　router实例对象的route方法，可以接受访问路径作为参数

<div class="cnblogs_code">
<pre>var express = require('express');
var router = express.Router();
router.route('/api')
    .post(function(req, res) {
        // ...
    })
    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err) res.send(err);
            res.json(bears);
        });
    });
app.use('/', router);</pre>
</div>

【router中间件】

　　use方法为router对象指定中间件，在数据正式发给用户之前，对数据进行处理。下面是一个中间件的例子

<div class="cnblogs_code">
<pre>router.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();    
});</pre>
</div>

　　上面代码中，回调函数的next参数，表示接受其他中间件的调用。函数体中的next()，表示将数据传递给下一个中间件

　　[注意]中间件放置顺序很重要，等同于执行顺序。而且，中间件必须放在HTTP动词方法之前，否则不会执行

【对路径参数的处理】

　　router对象的param方法用于路径参数的处理

<div class="cnblogs_code">
<pre>router.param('name', function(req, res, next, name) {
    // 对name进行验证或其他处理&hellip;&hellip;
    console.log(name);
    req.name = name;
    next();    
});
router.get('/hello/:name', function(req, res) {
    res.send('hello ' + req.name + '!');
});</pre>
</div>

　　上面代码中，get方法为访问路径指定了name参数，param方法则是对name参数进行处理

　　[注意]param方法必须放在HTTP动词方法之前

【实例】

　　下面的实例程序创建了一个路由模块，并加载了一个中间件，定义了一些路由，并且将它们挂载至应用路径上

　　在 app 目录下创建名为&nbsp;`birds.js`&nbsp;的文件，内容如下：

<div class="cnblogs_code">
<pre>var express = require('express');
var router = express.Router();
// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// 定义网站主页的路由
router.get('/', function(req, res) {
  res.send('Birds home page');
});
// 定义 about 页面的路由
router.get('/about', function(req, res) {
  res.send('About birds');
});
module.exports = router;</pre>
</div>

　　然后在应用中加载路由模块：

<div class="cnblogs_code">
<pre>var birds = require('./birds');
...
app.use('/birds', birds);</pre>
</div>

　　应用即可处理发自&nbsp;`/birds`&nbsp;和&nbsp;`/birds/about`&nbsp;的请求，并且调用为该路由指定的&nbsp;`timeLog`&nbsp;中间件

&nbsp;

### 响应方法

　　response对象包含以下9个方法，response对象的方法向客户端返回响应，终结请求响应的循环。如果在路由句柄中一个方法也不调用，来自客户端的请求会一直挂起

<div class="cnblogs_code">
<pre>方法    　　　　　　　描述
res.download()    提示下载文件。
res.end()     　　 终结响应处理流程。
res.json()    　　 发送一个 JSON 格式的响应。
res.jsonp()    　　发送一个支持 JSONP 的 JSON 格式的响应。
res.redirect()    重定向请求。
res.render()    　渲染视图模板。
res.send()    　　 发送各种类型的响应。
res.sendFile()    以八位字节流的形式发送文件。
res.sendStatus()  设置响应状态代码，并将其以字符串形式作为响应体的一部分发送。</pre>
</div>

　　1、response.download方法

<div class="cnblogs_code">
<pre>//下载路径为'/report-12345.pdf'的文件
res.download('/report-12345.pdf');
//下载路径为'/report-12345.pdf'的文件，并将文件命名为 'report.pdf'
res.download('/report-12345.pdf', 'report.pdf');
//下载路径为'/report-12345.pdf'的文件，将文件命名为 'report.pdf'，并且回调
res.download('/report-12345.pdf', 'report.pdf', function(err){
  if (err) {
  } else {
  }
});</pre>
</div>

　　2、response.end方法

<div class="cnblogs_code">
<pre>//终结响应处理流程
res.end();
//设置响应码为404，并终结响应处理流程
res.status(404).end();</pre>
</div>

　　3、response.json方法

<div class="cnblogs_code">
<pre>res.json(null)
res.json({ user: 'tobi' })
res.status(500).json({ error: 'message' })</pre>
</div>

　　4、response.jsonp方法

<div class="cnblogs_code">
<pre>res.jsonp(null)
res.jsonp({ user: 'tobi' })
res.status(500).jsonp({ error: 'message' })</pre>
</div>

　　5、response.redirect方法

<div class="cnblogs_code">
<pre>res.redirect('/foo/bar');
res.redirect('http://example.com');
res.redirect(301, 'http://example.com');
res.redirect('../login');</pre>
</div>

　　6、response.render方法

<div class="cnblogs_code">
<pre>res.render('index');
res.render('index', function(err, html) {
  res.send(html);
});
res.render('user', { name: 'Tobi' }, function(err, html) {
  // ...
});</pre>
</div>

　　7、response.send方法

<div class="cnblogs_code">
<pre>res.send(new Buffer('whoop'));
res.send({ some: 'json' });
res.send('&lt;p&gt;some html&lt;/p&gt;');
res.status(404).send('Sorry, we cannot find that!');
res.status(500).send({ error: 'something blew up' });</pre>
</div>

　　8、response.sendFile方法

<div class="cnblogs_code">
<pre>response.sendFile("/path/to/anime.mp4");</pre>
</div>

　　9、response.sendStatus方法

<div class="cnblogs_code">
<pre>res.sendStatus(200); // 'OK'
res.sendStatus(403); // 'Forbidden'
res.sendStatus(404); // 'Not Found'
res.sendStatus(500); // 'Internal Server Error'</pre>
</div>

&nbsp;

### 请求方法

【req.params】

<div class="cnblogs_code">
<pre>// GET /user/tj
req.params.name
// =&gt; "tj"

// GET /file/javascripts/jquery.js
req.params[0]
// =&gt; "javascripts/jquery.js"</pre>
</div>

【req.query】

<div class="cnblogs_code">
<pre>// GET /search?q=tobi+ferret
req.query.q
// =&gt; "tobi ferret"
// GET /shoes?order=desc&amp;shoe[color]=blue&amp;shoe[type]=converse
req.query.order
// =&gt; "desc"
req.query.shoe.color
// =&gt; "blue"
req.query.shoe.type
// =&gt; "converse"</pre>
</div>

【req.body】

<div class="cnblogs_code">
<pre>// POST user[name]=tobi&amp;user[email]=tobi@learnboost.com
req.body.user.name
// =&gt; "tobi"
req.body.user.email
// =&gt; "tobi@learnboost.com"
// POST { "name": "tobi" }
req.body.name
// =&gt; "tobi"</pre>
</div>

【req.param(name)】

<div class="cnblogs_code">
<pre>// ?name=tobi
req.param('name')
// =&gt; "tobi"
// POST name=tobi
req.param('name')
// =&gt; "tobi"
// /user/tobi for /user/:name 
req.param('name')
// =&gt; "tobi"</pre>
</div>

【req.cookies】

<div class="cnblogs_code">
<pre>// Cookie: name=tj
req.cookies.name
// =&gt; "tj"</pre>
</div>

【req.ip】

<div class="cnblogs_code">
<pre>req.ip
// =&gt; "127.0.0.1"</pre>
</div>

【req.path】

<div class="cnblogs_code">
<pre>// example.com/users?sort=desc
req.path
// =&gt; "/users"</pre>
</div>

【req.host】

<div class="cnblogs_code">
<pre>// Host: "example.com:3000"
req.host
// =&gt; "example.com"</pre>
</div>

&nbsp;

### app方法

【set方法】

　　set方法用于指定变量的值

<div class="cnblogs_code">
<pre>app.set("views", __dirname + "/views");
app.set("view engine", "jade");</pre>
</div>

　　上面代码使用set方法，为系统变量&ldquo;views&rdquo;和&ldquo;view engine&rdquo;指定值

【get方法】

　　除了作为use()方法的别名用法外，get方法还用于获取变量的值，与set方法相对应

<div class="cnblogs_code">
<pre>app.get('title');
// =&gt; undefined

app.set('title', 'My Site');
app.get('title');
// =&gt; "My Site"</pre>
</div>

【app.enable(name)】

　　将设置项 name 的值设为 true&nbsp;

<div class="cnblogs_code">
<pre>app.enable('trust proxy');
app.get('trust proxy');
// =&gt; true</pre>
</div>

【app.disable(name)】

　　将设置项 name 的值设为 false&nbsp;

<div class="cnblogs_code">
<pre>app.disable('trust proxy');
app.get('trust proxy');
// =&gt; false</pre>
</div>

【app.enabled(name)】

　　检查设置项 name 是否已启用

<div class="cnblogs_code">
<pre>app.enabled('trust proxy');
// =&gt; false

app.enable('trust proxy');
app.enabled('trust proxy');
// =&gt; true</pre>
</div>

【app.disabled(name)】

　　检查设置项 name 是否已禁用

<div class="cnblogs_code">
<pre>app.disabled('trust proxy');
// =&gt; true

app.enable('trust proxy');
app.disabled('trust proxy');
// =&gt; false</pre>
</div>

【app.engine(ext, callback)】

　　注册模板引擎的 callback 用来处理 ext 扩展名的文件

　　默认情况下, 根据文件扩展名 require() 加载相应的模板引擎。 比如想渲染一个 &ldquo;foo.jade&rdquo; 文件，Express 会在内部执行下面的代码，然后会缓存 require() ，这样就可以提高后面操作的性能

<div class="cnblogs_code">
<pre>app.engine('jade', require('jade').__express);</pre>
</div>

　　那些没有提供 .__express 的或者想渲染一个文件的扩展名与模板引擎默认的不一致的时候，也可以用这个方法。比如想用EJS模板引擎来处理 &ldquo;.html&rdquo; 后缀的文件:

<div class="cnblogs_code">
<pre>app.engine('html', require('ejs').renderFile);</pre>
</div>

　　这个例子中 EJS 提供了一个 .renderFile() 方法和 Express 预期的格式: (path, options, callback) 一致, 因此可以在内部给这个方法取一个别名 ejs.__express ，这样就可以使用 &ldquo;.ejs&rdquo; 扩展而不需要做任何改动

　　有些模板引擎没有遵循这种转换， 这里有一个小项目 consolidate.js专门把所有的node流行的模板引擎进行了包装，这样它们在 Express 内部看起来就一样了。

<div class="cnblogs_code">
<pre>var engines = require('consolidate');
app.engine('haml', engines.haml);
app.engine('html', engines.hogan);</pre>
</div>

【app.locals】

　　应用程序本地变量会附加给所有的在这个应用程序内渲染的模板。这是一个非常有用的模板函数，就像应用程序级数据一样

<div class="cnblogs_code">
<pre>app.locals.title = 'My App';
app.locals.strftime = require('strftime');</pre>
</div>

　　app.locals 对象是一个 JavaScript Function，执行的时候它会把属性合并到它自身，提供了一种简单展示已有对象作为本地变量的方法。

<div class="cnblogs_code">
<pre>app.locals({
  title: 'My App',
  phone: '1-250-858-9990',
  email: 'me@myapp.com'
});
app.locals.title
// =&gt; 'My App'
app.locals.email
// =&gt; 'me@myapp.com'</pre>
</div>

　　app.locals 对象最终会是一个 Javascript 函数对象，不可以使用 Functions 和 Objects 内置的属性，比如 name、apply、bind、call、arguments、length、constructor。

<div class="cnblogs_code">
<pre>app.locals({name: 'My App'});

app.locals.name
// =&gt; 返回 'app.locals' 而不是 'My App' (app.locals 是一个函数 !)
// =&gt; 如果 name 变量用在一个模板里，则返回一个 ReferenceError </pre>
</div>

　　默认情况下Express只有一个应用程序级本地变量，它是 settings

<div class="cnblogs_code">
<pre>app.set('title', 'My App');
// 在 view 里使用 settings.title</pre>
</div>

【app.render(view, [options], callback)】

　　渲染 view ， 回调函数 callback 用来处理返回的渲染后的字符串。这个是 res.render() 的应用程序级版本，它们的行为是一样的。

<div class="cnblogs_code">
<pre>app.render('email', function(err, html){
    // ...
});
app.render('email', { name: 'Tobi' }, function(err, html){
    // ...
});</pre>
</div>

【app.listen()】

　　在给定的主机和端口上监听请求，这个和 node 文档中的 http.Server#listen() 是一致的。

<div class="cnblogs_code">
<pre>var express = require('express');
var app = express();
app.listen(3000);</pre>
</div>

　　express() 返回的 app 实际上是一个 JavaScript Function，它被设计为传给 node 的 http servers 作为处理请求的回调函数。因为 app 不是从 HTTP 或者 HTTPS 继承来的，它只是一个简单的回调函数，可以以同一份代码同时处理 HTTP 和 HTTPS 版本的服务。

<div class="cnblogs_code">
<pre>var express = require('express');
var https = require('https');
var http = require('http');
var app = express();

http.createServer(app).listen(80);
https.createServer(options, app).listen(443);</pre>
</div>

　　app.listen() 方法只是一个快捷方法，如果想使用 HTTPS ，或者同时提供 HTTP 和 HTTPS ，可以使用上面的代码。

<div class="cnblogs_code">
<pre>app.listen = function(){
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
};</pre>
</div>

&nbsp;

### HTTPS

　　使用Express搭建HTTPS加密服务器很简单

<div class="cnblogs_code">
<pre>var fs = require('fs');
var options = {
  key: fs.readFileSync('E:/ssl/myserver.key'),
  cert: fs.readFileSync('E:/ssl/myserver.crt'),
  passphrase: '1234'
};
var https = require('https');
var express = require('express');
var app = express();
app.get('/', function(req, res){
  res.send('Hello World Expressjs');
});
var server = https.createServer(options, app);
server.listen(8084);
console.log('Server is running on port 8084');</pre>
</div>

&nbsp;

### 模板引擎

　　需要在应用中进行如下设置才能让 Express 渲染模板文件：

　　views, 放模板文件的目录，比如： app.set('views', './views')

　　view engine, 模板引擎，比如： app.set('view engine', 'jade')

　　然后安装相应的模板引擎 npm 软件包

<div class="cnblogs_code">
<pre>$ npm install jade --save</pre>
</div>

　　一旦&nbsp;`view engine`&nbsp;设置成功，就不需要显式指定引擎，或者在应用中加载模板引擎模块，Express 已经在内部加载，如下所示

<div class="cnblogs_code">
<pre>app.set('view engine', 'jade');</pre>
</div>

　　在&nbsp;`views`&nbsp;目录下生成名为&nbsp;`index.jade`&nbsp;的 Jade 模板文件，内容如下：

<div class="cnblogs_code">
<pre>html
  head
    title!= title
  body
    h1!= message</pre>
</div>

　　然后创建一个路由渲染&nbsp;`index.jade`&nbsp;文件。如果没有设置&nbsp;`view engine`，需要指明视图文件的后缀，否则就会遗漏它

<div class="cnblogs_code">
<pre>app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});</pre>
</div>

　　此时向主页发送请求，&ldquo;index.jade&rdquo; 会被渲染为 HTML

&nbsp;

### 数据库

　　为 Express 应用添加连接数据库的能力，只需要加载相应数据库的 Node.js 驱动即可。这里简要介绍如何为 Express 应用添加和使用一些常用的数据库 Node 模块

【mysql】

<div class="cnblogs_code">
<pre>$ npm install mysql</pre>
</div>
<div class="cnblogs_code">
<pre>var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'dbuser',
  password : 's3kreee7'
});
connection.connect();
connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;
  console.log('The solution is: ', rows[0].solution);
});
connection.end();</pre>
</div>

【MongoDB】

<div class="cnblogs_code">
<pre>$ npm install mongoskin</pre>
</div>
<div class="cnblogs_code">
<pre>var db = require('mongoskin').db('localhost:27017/animals');
db.collection('mamals').find().toArray(function(err, result) {
  if (err) throw err;
  console.log(result);
});</pre>
</div>

&nbsp;

### 上传文件

　　首先，在网页插入上传文件的表单

<div class="cnblogs_code">
<pre>&lt;form action="/pictures/upload" method="POST" enctype="multipart/form-data"&gt;
  Select an image to upload:
  &lt;input type="file" name="image"&gt;
  &lt;input type="submit" value="Upload Image"&gt;
&lt;/form&gt;</pre>
</div>

　　然后，服务器脚本建立指向`/upload`目录的路由。这时可以安装multer模块，它提供了上传文件的许多功能

<div class="cnblogs_code">
<pre>var express = require('express');
var router = express.Router();
var multer = require('multer');
var uploading = multer({
  dest: __dirname + '../public/uploads/',
  // 设定限制，每次最多上传1个文件，文件大小不超过1MB
  limits: {fileSize: 1000000, files:1},
})
router.post('/upload', uploading, function(req, res) {})
module.exports = router</pre>
</div>

　　上面代码是上传文件到本地目录。下面是上传到Amazon S3的例子。

　　首先，在S3上面新增CORS配置文件

<div class="cnblogs_code">
<pre>&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"&gt;
  &lt;CORSRule&gt;
    &lt;AllowedOrigin&gt;*&lt;/AllowedOrigin&gt;
    &lt;AllowedMethod&gt;GET&lt;/AllowedMethod&gt;
    &lt;AllowedMethod&gt;POST&lt;/AllowedMethod&gt;
    &lt;AllowedMethod&gt;PUT&lt;/AllowedMethod&gt;
    &lt;AllowedHeader&gt;*&lt;/AllowedHeader&gt;
  &lt;/CORSRule&gt;
&lt;/CORSConfiguration&gt;</pre>
</div>

　　上面的配置允许任意电脑向你的bucket发送HTTP请求。

　　然后，安装aws-sdk

<div class="cnblogs_code">
<pre>$ npm install aws-sdk --save</pre>
</div>

　　下面是服务器脚本

<div class="cnblogs_code">
<pre>var express = require('express');
var router = express.Router();
var aws = require('aws-sdk');
router.get('/', function(req, res) {
  res.render('index')
})
var AWS_ACCESS_KEY = 'your_AWS_access_key'
var AWS_SECRET_KEY = 'your_AWS_secret_key'
var S3_BUCKET = 'images_upload'
router.get('/sign', function(req, res) {
  aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
  var s3 = new aws.S3()
  var options = {
    Bucket: S3_BUCKET,
    Key: req.query.file_name,
    Expires: 60,
    ContentType: req.query.file_type,
    ACL: 'public-read'
  }
  s3.getSignedUrl('putObject', options, function(err, data){
    if(err) return res.send('Error with S3')
    res.json({
      signed_request: data,
      url: 'https://s3.amazonaws.com/' + S3_BUCKET + '/' + req.query.file_name
    })
  })
})
module.exports = router</pre>
</div>

　　上面代码中，用户访问`/sign`路径，正确登录后，会收到一个JSON对象，里面是S3返回的数据和一个暂时用来接收上传文件的URL，有效期只有60秒。

　　浏览器代码如下

<div class="cnblogs_code">
<pre>// HTML代码为
// &lt;br&gt;Please select an image
// &lt;input type="file" id="image"&gt;
// &lt;br&gt;
// &lt;img id="preview"&gt;
document.getElementById("image").onchange = function() {
  var file = document.getElementById("image").files[0]
  if (!file) return
  sign_request(file, function(response) {
    upload(file, response.signed_request, response.url, function() {
      document.getElementById("preview").src = response.url
    })
  })
}
function sign_request(file, done) {
  var xhr = new XMLHttpRequest()
  xhr.open("GET", "/sign?file_name=" + file.name + "&amp;file_type=" + file.type)
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 &amp;&amp; xhr.status === 200) {
      var response = JSON.parse(xhr.responseText)
      done(response)
    }
  }
  xhr.send()
}
function upload(file, signed_request, url, done) {
  var xhr = new XMLHttpRequest()
  xhr.open("PUT", signed_request)
  xhr.setRequestHeader('x-amz-acl', 'public-read')
  xhr.onload = function() {
    if (xhr.status === 200) {
      done()
    }
  }
  xhr.send(file)
}</pre>
</div>

　　上面代码首先监听file控件的change事件，一旦有变化，就先向服务器要求一个临时的上传URL，然后向该URL上传文件

&nbsp;

### 开发实例

【静态网页模板】

　　在项目目录之中，建立一个子目录views，用于存放网页模板。

　　假定这个项目有三个路径：根路径（/）、自我介绍（/about）和文章（/article）。那么，app.js可以这样写：

<div class="cnblogs_code">
<pre>var express = require('express');
var app = express();
app.get('/', function(req, res) {
   res.sendfile('./views/index.html');
});
app.get('/about', function(req, res) {
   res.sendfile('./views/about.html');
});
app.get('/article', function(req, res) {
   res.sendfile('./views/article.html');
});
app.listen(3000);</pre>
</div>

　　上面代码表示，三个路径分别对应views目录中的三个模板：index.html、about.html和article.html。另外，向服务器发送信息的方法，从send变成了sendfile，后者专门用于发送文件。

　　假定index.html的内容如下：

<div class="cnblogs_code">
<pre>&lt;html&gt;
&lt;head&gt;
   &lt;title&gt;首页&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;h1&gt;Express Demo&lt;/h1&gt;
&lt;header&gt;
&lt;p&gt;
   &lt;a href="/"&gt;首页&lt;/a&gt; - &lt;a href="/about"&gt;自我介绍&lt;/a&gt; - &lt;a href="/article"&gt;文章&lt;/a&gt;
&lt;/p&gt;
&lt;/header&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>

　　about.html内容如下

<div class="cnblogs_code">
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
about
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>

　　article.html内容如下

<div class="cnblogs_code">
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    article
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>

　　运行app.js后，访问`http://localhost:3000/`结果如下

![express1](https://pic.xiaohuochai.site/blog/nodejs_express1.gif)


&nbsp;【动态网页模板】

　　下面来制作一个动态网页网站，以使用ejs引擎为例

<div class="cnblogs_code">
<pre>  npm install ejs</pre>
</div>

　　将view engine修改为ejs，并将模板的后缀修改为.html

<div class="cnblogs_code">
<pre>var express = require('express');
var app = express();
var ejs = require('ejs');
// 指定模板文件的后缀名为html
app.set('view engine', 'html');
//运行ejs引擎读取html文件
app.engine('.html', ejs.__express);
app.get('/', function (req, res){
    res.render('index');
});
app.get('/about', function(req, res) {
    res.render('about');
});
app.get('/article', function(req, res) {
    res.render('article');
});</pre>
</div>

　　接下来，新建数据脚本。渲染是指将数据代入模板的过程。实际运用中，数据都是保存在数据库之中的，这里为了简化问题，假定数据保存在一个脚本文件中

　　在项目目录中，新建一个文件blog.js，用于存放数据。blog.js的写法符合CommonJS规范，使得它可以被require语句加载

<div class="cnblogs_code">
<pre>// blog.js文件
var entries = [
    {"id":1, "title":"第一篇", "body":"正文", "published":"7/2/2017"},
    {"id":2, "title":"第二篇", "body":"正文", "published":"7/3/2017"},
    {"id":3, "title":"第三篇", "body":"正文", "published":"7/4/2017"},
    {"id":4, "title":"第四篇", "body":"正文", "published":"7/5/2017"},
    {"id":5, "title":"第五篇", "body":"正文", "published":"7/10/2017"},
    {"id":6, "title":"第六篇", "body":"正文", "published":"7/12/2017"}
];
exports.getBlogEntries = function (){
   return entries;
}
exports.getBlogEntry = function (id){
   for(var i=0; i &lt; entries.length; i++){
      if(entries[i].id == id) return entries[i];
   }
}</pre>
</div>

　　新建header.html和footer.html

<div class="cnblogs_code">
<pre>&lt;!-- views/header.html文件 --&gt;
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;&lt;%=title %&gt;&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;!-- views/footer.html文件 --&gt;
   &lt;footer&gt;
      &lt;p&gt;
         &lt;a href="/"&gt;首页&lt;/a&gt;
         &lt;a href="/about"&gt;自我介绍&lt;/a&gt;
      &lt;/p&gt;
   &lt;/footer&gt;      
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>

　　接着，新建模板文件index.html

<div class="cnblogs_code">
<pre>&lt;!-- views/index.html文件 --&gt;
&lt;% include header.html %&gt;
&lt;h1&gt;文章列表&lt;/h1&gt;
&lt;% for(var i=0; i &lt; entries.length; i++){  %&gt;
    &lt;p&gt;
        &lt;a href="/article/&lt;%=entries[i].id %&gt;"&gt;&lt;%=entries[i].title %&gt;&lt;/a&gt;
        &lt;br&gt;
          &lt;span&gt;时间: &lt;%=entries[i].published %&gt;&lt;/span&gt;        
    &lt;/p&gt;
&lt;% } %&gt;  
&lt;% include footer.html %&gt;</pre>
</div>

　　新建模板文件about.html

<div class="cnblogs_code">
<pre>&lt;!-- views/about.html文件 --&gt;
&lt;% include header.html %&gt;
&lt;h1&gt;&lt;%=title %&gt; &lt;/h1&gt;
&lt;p&gt;正文&lt;/p&gt;
&lt;% include footer.html %&gt;</pre>
</div>

　　新建模板文件article.html

<div class="cnblogs_code">
<pre>&lt;!-- views/article.html文件 --&gt;
&lt;% include header.html %&gt;
&lt;h1&gt;&lt;%=blog.title %&gt;&lt;/h1&gt;
&lt;p&gt;时间: &lt;%=blog.published %&gt;&lt;/p&gt;
&lt;p&gt;&lt;%=blog.body %&gt;&lt;/p&gt;
&lt;% include footer.html %&gt;</pre>
</div>

　　最后，改写app.js文件

<div class="cnblogs_code">
<pre>var express = require('express');
var app = express();
var ejs = require('ejs');
// 加载数据模块
var blogEngine = require('./blog');
app.set('view engine', 'html');
app.engine('html', ejs.__express);
app.get('/', function(req, res) {
   res.render('index',{title:"最近文章", entries:blogEngine.getBlogEntries()});
});
app.get('/about', function(req, res) {
   res.render('about', {title:"自我介绍"});
});
app.get('/article/:id', function(req, res) {
   var entry = blogEngine.getBlogEntry(req.params.id);
   res.render('article',{title:entry.title, blog:entry});
});
app.listen(3000);</pre>
</div>

　　上面代码中的render方法，现在加入了第二个参数，表示模板变量绑定的数据。

　　现在重启node服务器，然后访问`http://127.0.0.1:3000`来查看结果

![express2](https://pic.xiaohuochai.site/blog/nodejs_express2.gif)

