# 基于JWT标准的用户认证接口实现

&emsp;&emsp;实现用户登录认证的方式常见的有两种：一种是基于 cookie 的认证，另外一种是基于 token 的认证 。本文以基于cookie的认证为参照，详细介绍JWT标准，并实现基于该标签的用户认证接口

 

&nbsp;

### cookie认证

&emsp;&emsp;传统的基于 cookie 的认证方式基本有下面几个步骤：

&emsp;&emsp;1、用户输入用户名和密码，发送给服务器

&emsp;&emsp;2、服务器验证用户名和密码，正确的话就创建一个会话（ session ），同时会把这个会话的 ID 保存到客户端浏览器中，因为保存的地方是浏览器的 cookie ，所以这种认证方式叫做基于 cookie 的认证方式

&emsp;&emsp;3、后续的请求中，浏览器会发送会话 ID 到服务器，服务器上如果能找到对应 ID 的会话，那么服务器就会返回需要的数据给浏览器

&emsp;&emsp;4、当用户退出登录，会话会同时在客户端和服务器端被销毁

&emsp;&emsp;这种认证方式的不足之处有两点

&emsp;&emsp;1、服务器端要为每个用户保留 session 信息，连接用户多了，服务器内存压力巨大

&emsp;&emsp;2、适合单一域名，不适合第三方请求

&emsp;&emsp;cookie认证的后端典型代码如下所示

```
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const session = require('express-session')
const pug = require('pug');

app.set('view engine', 'pug');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))


app.get('/', function(req, res){
  let currentUser = req.session.username;
  res.render('index', {currentUser});
})

app.get('/login', function(req, res){
  res.sendFile('login.html', {root: 'public'});
})

app.post('/login', function(req, res){
  let username = req.body.username;
  req.session.username = username;
  res.redirect('/');
})

app.get('/logout', function(req, res){
  req.session.destroy();
  res.redirect('/');
})

app.listen(3006, function(){
  console.log('running on port 3006...');
})
```
 

&nbsp;

### token认证

&emsp;&emsp;下面来介绍token认证。详细认证过程如下

&emsp;&emsp;1、用户输入用户名密码，发送给服务器

&emsp;&emsp;2、服务器验证用户名和密码，正确的话就返回一个签名过的 token（ token 可以认为就是个长长的字符串），客户端浏览器拿到这个 token

&emsp;&emsp;3、后续每次请求中，浏览器会把 token 作为 http header 发送给服务器，服务器可以验证一下签名是否有效，如果有效那么认证就成功了，可以返回客户端需要的数据

&emsp;&emsp;4、一旦用户退出登录，只需要客户端销毁一下 token 即可，服务器端不需要有任何操作

&emsp;&emsp;这种方式的特点就是客户端的 token 中自己保留有大量信息，服务器没有存储这些信息，而只负责验证，不必进行数据库查询，执行效率大大提高

 

&nbsp;

### JWT

&emsp;&emsp;上面介绍的token-based 认证过程是通过 JWT 标准来完成的

&emsp;&emsp;JWT 是 JSON Web Token 的简写，它定义了一种在客户端和服务器端安全传输数据的规范。通过 JSON 格式 来传递信息

&emsp;&emsp;让我们来假想一下一个场景。在A用户关注了B用户的时候，系统发邮件给B用户，并且附有一个链接“点此关注A用户”。链接的地址可以是这样的
```
https://your.awesome-app.com/make-friend/?from_user=B&target_user=A
```
&emsp;&emsp;上面这样做有一个弊端，那就是要求用户B一定要先登录。可不可以简化这个流程，让B用户不用登录就可以完成这个操作。JWT允许我们做到这点

【组成】

![](https://pic.xiaohuochai.site/blog/mongodb_jwt1.png)

&emsp;&emsp;一个JWT实际上就是一个字符串，它由三部分组成，第一段是 header （头部），第二段是 payload （主体信息或称为载荷），第三段是 signature（数字签名）
```
aaaaaaaaaa.bbbbbbbbbbb.cccccccccccc
```
&emsp;&emsp;头部用于描述关于该JWT的最基本的信息，例如其类型以及签名所用的算法等。这可以被表示成一个JSON对象
```
{
  "typ": "JWT",
  "alg": "HS256"
}
```
&emsp;&emsp;将上面的添加好友的操作描述成一个JSON对象。其中添加了一些其他的信息，帮助今后收到这个JWT的服务器理解这个JWT

```
{
    "iss": "John Wu JWT",
    "iat": 1441593502,
    "exp": 1441594722,
    "aud": "www.example.com",
    "sub": "jrocket@example.com",
    "from_user": "B",
    "target_user": "A"
}
```
&emsp;&emsp;将上面的JSON对象进行[base64编码]可以得到下面的字符串。这个字符串称作JWT的Payload（载荷）
```
eyJpc3MiOiJKb2huIFd1IEpXVCIsImlhdCI6MTQ0MTU5MzUwMiwiZXhwIjoxNDQxNTk0NzIyLCJhdWQiOiJ3d3cuZXhhbXBsZS5jb20iLCJzdWIiOiJqcm9ja2V0QGV4YW1wbGUuY29tIiwiZnJvbV91c2VyIjoiQiIsInRhcmdldF91c2VyIjoiQSJ9
```
&emsp;&emsp;将上面的两个编码后的字符串都用句号.连接在一起（头部在前）
```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcm9tX3VzZXIiOiJCIiwidGFyZ2V0X3VzZXIiOiJBIn0
```
&emsp;&emsp;最后，我们将上面拼接完的字符串用HS256算法进行加密。在加密的时候，我们还需要提供一个密钥（secret）。如果我们用mystar作为密钥的话，那么就可以得到我们加密后的内容。这一部分叫做签名
```
rSWamyAYwuHCo7IFAgd1oRpSP7nzL7BF5t7ItqpKViM
```
&emsp;&emsp;最后将这一部分签名也拼接在被签名的字符串后面，我们就得到了完整的JWT
```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcm9tX3VzZXIiOiJCIiwidGFyZ2V0X3VzZXIiOiJBIn0.rSWamyAYwuHCo7IFAgd1oRpSP7nzL7BF5t7ItqpKViM
```
&emsp;&emsp;于是，我们就可以将邮件中的URL改成
```
https://your.awesome-app.com/make-friend/?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcm9tX3VzZXIiOiJCIiwidGFyZ2V0X3VzZXIiOiJBIn0.rSWamyAYwuHCo7IFAgd1oRpSP7nzL7BF5t7ItqpKViM
```
&emsp;&emsp;再强调一下数字签名的运算过程
```
var encodedString = base64UrlEncode(header) + "." + base64UrlEncode(payload);

HMACSHA256(encodedString, 'secret');
```
&emsp;&emsp;签名是由服务器完成的，secret 是服务器上存储的密钥，信息签名后整个 token 会发送给浏览器，每次浏览器 发送请求中都包含 secret。所以可以跟服务器达成互信，完成认证过程

![](https://pic.xiaohuochai.site/blog/mongodb_jwt2.png)

&nbsp;

### 认证接口

&emsp;&emsp;新建 server/routes.js 文件，导入 User 模型并赋值给 User 变量：
```
let User = require('./models/user')
```
&emsp;&emsp;接下来定义用户认证接口，将实现的接口名称为 /auth/login：

```
module.exports = app => {
  app.post('/auth/login', (req, res) => {
    User.findOne({ username: req.body.username }, (err, user) => {
      if (err) return console.log(err)
      if (!user) return res.status(403).json({ error: '用户名不存在！' })
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (err) return console.log(err)
        if (!isMatch) return res.status(403).json({ error: '密码无效！' })
        return res.json({
          token: generateToken({ name: user.username }),
          user: { name: user.username }
        })
      })
    })
  })
}
```
&emsp;&emsp;用户从客户端向服务器提交用户名和密码，服务器端通过body-parser中间件把客户端传送过的数据抽取出来并存放到 req.body 中，这样就可以通过 req.body.username 获取到用户名。然后在 MongoDB 数据库中查找这个用户，若查找过程中出错，则打印错误信息到终端；若数据库中不存在这个用户，则向客户端响应错误信息；若数据库中存在这个用户，则验证客户端提交的密码 req.body.password 是否与用户保存在数据库中的密码匹配。若密码不匹配，则向客户端返回错误信息；若密码匹配，则给客户端返回用户信息

&emsp;&emsp;使用NPM安装jsonwebtoken包，jsonwebtoken 包可以生成、验证和解码 JWT 认证码
```
npm install --save jsonwebtoken
```
&emsp;&emsp;打开 server/routes.js 文件，导入 jsonwebtoken 模块：
```
let jwt = require('jsonwebtoken')
```
&emsp;&emsp;然后，定义生成 JWT 的 generateToken 方法
```
let generateToken = (user) => {
  return jwt.sign(user, 'xiaohuochai', { expiresIn: 3000 })
}
```
&emsp;&emsp;调用 jsonwebtoken 模块提供的 sign() 接口生成 JWT。 其中，xiaohuochai 是生成 JWT 认证码的秘钥，为了安全，最好把秘钥放到配置文件中。 user 是要传递给前端的信息，前端可以利用工具解码 JWT 认证码，从而得到 user 数据。 expiresIn 选项用来指定认证码自生成到失效的时间间隔（过期间隔），上述代码中数字 3000 的单位是秒，意思说这个认证码自生成后，再过50分钟就失效了。认证码失效之后，客户端就不能使用失效的认证码访问服务器端的受保护资源了

&emsp;&emsp;完整代码如下

```
let User = require('./models/user')
let jwt = require('jsonwebtoken')
let secret = require('./config.js').secret
let generateToken = (user) => {
  return jwt.sign(user, secret, { expiresIn: 3000 })
}
module.exports = app => {
  app.post('/auth/login', (req, res) => {
    User.findOne({ username: req.body.username }, (err, user) => {
      if (err) return console.log(err)
      if (!user) return res.status(403).json({ error: '用户名不存在！' })
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (err) return console.log(err)
        if (!isMatch) return res.status(403).json({ error: '密码无效！' })
        return res.json({
          token: generateToken({ name: user.username }),
          user: { name: user.username }
        })
      })
    })
  })
}
```
&emsp;&emsp;最后在index.js中引入并使用routes
```
let routes = require('./routes.js')
routes(app)
```
&emsp;&emsp;使用postman来测试接口，已经在数据库中存了用户名为admin，密码为123456的用户。测试结果如下

![](https://pic.xiaohuochai.site/blog/mongodb_jwt3.png)

 

&nbsp;

## 最后
&emsp;&emsp;JWT适合于应用在『无状态的REST API』，也就是说适用于Android/iOS等移动端，或前后端分离的WEB前端。关于JWT的更多资源移步官网