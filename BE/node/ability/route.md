# nodeJS实现路由功能

&emsp;&emsp;本文将使用NodeJS实现较复杂应用的路由功能

&nbsp;

### 结构

&emsp;&emsp;项目结构如下

![route1](https://pic.xiaohuochai.site/blog/nodejs_route1.png)


&emsp;&emsp;代码如下

![route2](https://pic.xiaohuochai.site/blog/nodejs_route2.png)


&nbsp;

### 功能

【router.js】

<div>
<pre>// 加载所需模块
var http = require('http');
var url = require('url');
var fs = require('fs');
var host = '127.0.0.1';
var port = 8080;
http.createServer(function(req,res){
    var pathname = url.parse(req.url).pathname;
    console.log('Request for ' + pathname + ' received.');
        function showPaper(path,status){
            var content = fs.readFileSync(path);
            res.writeHead(status, { 'Content-Type': 'text/html;charset=utf-8' });
            res.write(content);
            res.end();
        }
        switch(pathname){
        //'首页'
        case '/':
        case '/home':
            showPaper('./view/home.html',200);
            break;
        //'about页'
        case '/about':
            showPaper('./view/about.html',200);   
            break;
        //'404页'
        default:
            showPaper('./view/404.html',404);
            break;                            
    }    
}).listen(port, host);</pre>
</div>

【404.html】

<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
404    
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>

【about.html】

<div>
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

【home.html】

<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
home    
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>

&nbsp;

### 演示

![route3](https://pic.xiaohuochai.site/blog/nodejs_route3.png)

![route4](https://pic.xiaohuochai.site/blog/nodejs_route4.png)

![route5](https://pic.xiaohuochai.site/blog/nodejs_route5.png)

![route6](https://pic.xiaohuochai.site/blog/nodejs_route6.png)


