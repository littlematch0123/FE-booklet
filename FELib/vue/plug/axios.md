# HTTP库Axios

&emsp;&emsp;本文将详细介绍HTTP库Axios

&nbsp;

### 概述

&emsp;&emsp;Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中

【安装】

&emsp;&emsp;在Vue中使用，最好安装两个模块axios 和vue-axios

<div>
<pre>$ npm install axios vue-axios --save</pre>
</div>

&emsp;&emsp;然后引用并使用模块

<div>
<pre>import Axios from 'axios'
import VueAxios from 'vue-axios'</pre>
</div>
<div>
<pre>Vue.use(VueAxios,Axios)</pre>
</div>

&emsp;&emsp;在组件中通过如下方式进行使用

<div>
<pre>this.$http[method]()</pre>
</div>

【特性】

&emsp;&emsp;1、可以从浏览器中创建[XHR对象](http://www.cnblogs.com/xiaohuochai/p/6036475.html)

&emsp;&emsp;2、可以从[nodeJS](http://www.cnblogs.com/xiaohuochai/p/6940560.html)中创建[HTTP](http://www.cnblogs.com/xiaohuochai/p/6392010.html)请求

&emsp;&emsp;3、支持[Promise](http://www.cnblogs.com/xiaohuochai/p/7261905.html) API&nbsp;

&emsp;&emsp;4、可以拦截请求和响应

&emsp;&emsp;5、可以转换请求数据和响应数据

&emsp;&emsp;6、可以取消请求

&emsp;&emsp;7、可以自动转换JSON数据

&emsp;&emsp;8、客户端支持防御XSRF

&nbsp;

### 使用

&emsp;&emsp;下面是一些简单的请求实例

【get请求】

&emsp;&emsp;仅仅向后端请求数据

<div>
<pre>axios.get('index.php')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });</pre>
</div>

&emsp;&emsp;通过URL向后端发送数据，要使用params属性，params属性包含即将与请求一起发送的数据

&emsp;&emsp;运行下列代码后，请求URL变更为index.php?id=12345&amp;text=%E5%B0%8F%E7%81%AB%E6%9F%B4

<div>
<pre>axios.get('index.php',{
  params:{
    id:12345,
&emsp;&emsp; text:'小火柴'
  }
}).then((response)=&gt;{
  console.log(response)
}).catch((error)=&gt;{
  console.log(error)
})</pre>
</div>

&emsp;&emsp;当然，也可以把数据直接写到URL中

<div>
<pre>// 为给定 ID 的 user 创建请求
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

</pre>
</div>

【post请求】

&emsp;&emsp;一般来说，post请求更多的是要提交数据，params属性里的数据会出现在请求主体中

&emsp;&emsp;注意：如果是axios.create()方法中的params属性，则其里面的数据会出现在URL参数中

&emsp;&emsp;但实际上，post方法不需要使用params属性，它的第二个参数就是要发送的数据

<div>
<pre>axios.post('index.php',{
  id:12345,
  text:'小火柴'
}).then((response)=&gt;{
  console.log(response)
}).catch((error)=&gt;{
  console.log(error)
})</pre>
</div>

【多并发请求】

<div>
<pre>function getUserAccount() {
  return axios.get('/user/12345');
}
function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}
axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // acct为第一个请求的结果，perms为第二个请求的结果
  }));</pre>
</div>

&nbsp;

### API

【axios()】

&emsp;&emsp;可以通过向&nbsp;`axios`&nbsp;传递相关配置来创建请求

**axios(config)**

<div>
<pre>// 发送 POST 请求
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});</pre>
</div>

**axios(url[,config])**

<div>
<pre>// 发送 GET 请求（默认的方法）
axios('/user/12345');</pre>
</div>

【别名】

&emsp;&emsp;为方便起见，为所有支持的请求方法提供了别名

<div>
<pre>axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])</pre>
</div>

&emsp;&emsp;注意：在使用别名方法时，&nbsp;`url`、`method`、`data`&nbsp;这些属性都不必在配置中指定

【并发】

&emsp;&emsp;处理并发请求的助手函数

<div>
<pre>axios.all(iterable)
axios.spread(callback)</pre>
</div>

&nbsp;

### 实例方法

【创建实例】

&emsp;&emsp;可以使用自定义配置新建一个 axios 实例

<div>
<pre>axios.create([config])</pre>
</div>
<div>
<pre>var instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});</pre>
</div>

【实例方法】

&emsp;&emsp;以下是可用的实例方法。指定的配置将与实例的配置合并

<div>
<pre>axios#request(config)
axios#get(url[, config])
axios#delete(url[, config])
axios#head(url[, config])
axios#post(url[, data[, config]])
axios#put(url[, data[, config]])
axios#patch(url[, data[, config]])</pre>
</div>

【请求配置】

&emsp;&emsp;这些是创建请求时可以用的配置选项。只有&nbsp;`url`&nbsp;是必需的。如果没有指定&nbsp;`method`，请求将默认使用&nbsp;`get`&nbsp;方法

```
{
  // `url` 是用于请求的服务器 URL
  url: '/user',

  // `method` 是创建请求时使用的方法
  method: 'get', // 默认是 get

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: 'https://some-domain.com/api/',

  // `transformRequest` 允许在向服务器发送前，修改请求数据，只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法。后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data) {
    // 对 data 进行任意转换处理
    return data;
  }],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    return data;
  }],

  // `headers` 是即将被发送的自定义请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` 是即将与请求一起发送的 URL 参数，必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params: {
    ID: 12345
  },

  // `paramsSerializer` 是一个负责 `params` 序列化的函数(e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // `data` 是作为请求主体被发送的数据，只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  // 在没有设置 `transformRequest` 时，必须是以下类型之一：string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParam，浏览器专属：FormData, File, Blob，Node 专属： Stream
  data: {
    firstName: 'Fred'
  },

  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)，如果请求花费了超过 `timeout` 的时间，请求将被中断
  timeout: 1000,

  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // 默认的

  // `adapter` 允许自定义处理请求，以使测试更轻松，返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
  adapter: function (config) {
    /* ... */
  },

  // `auth` 表示应该使用 HTTP 基础验证，并提供凭据，这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

  // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // 默认的

  // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` 是承载 xsrf token 的值的 HTTP 头的名称
  xsrfHeaderName: 'X-XSRF-TOKEN', // 默认的

  // `onUploadProgress` 允许为上传处理进度事件
  onUploadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },

  // `onDownloadProgress` 允许为下载处理进度事件
  onDownloadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },

  // `maxContentLength` 定义允许的响应内容的最大尺寸
  maxContentLength: 2000,

  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
  validateStatus: function (status) {
    return status &gt;= 200 &amp;&amp; status &lt; 300; // 默认的
  },

  // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目，如果设置为0，将不会 follow 任何重定向
  maxRedirects: 5, // 默认的

  // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。`keepAlive` 默认没有启用
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // 'proxy' 定义代理服务器的主机名称和端口，`auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据。这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: : {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // `cancelToken` 指定用于取消请求的 cancel token
  cancelToken: new CancelToken(function (cancel) {
  })
}　
```

&emsp;&emsp;下面是一个实例

<div>
<pre>let HTTP = axios.create({
  baseURL: 'http://localhost/',
  timeout:1000,
  headers:{
    'author':'xiaohuochai'
  }
})
HTTP.post('index.php',{
  id:12345,
  text:'小火柴'
}).then((response)=&gt;{
  console.log(response)
}).catch((error)=&gt;{
  console.log(error)
})</pre>
</div>

&emsp;&emsp;结果如下

![axios1](https://pic.xiaohuochai.site/blog/axios1.png)

&nbsp;

### 响应结构

&emsp;&emsp;某个请求的响应包含以下信息

<div>
<pre>{
  // `data` 由服务器提供的响应
  data: {},
  // `status` 来自服务器响应的 HTTP 状态码
  status: 200,
  // `statusText` 来自服务器响应的 HTTP 状态信息
  statusText: 'OK',
  // `headers` 服务器响应的头
  headers: {},
  // `config` 是为请求提供的配置信息
  config: {}
}</pre>
</div>

&emsp;&emsp;使用&nbsp;`then`&nbsp;时，将接收下面这样的响应：

<div>
<pre>  .then(function(response) {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });</pre>
</div>

&nbsp;

### 配置默认值

&emsp;&emsp;可以指定将被用在各个请求的配置默认值

【全局的axios默认值】

<div>
<pre>axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';</pre>
</div>

【自定义实例默认值】

<div>
<pre>// 创建实例时设置配置的默认值
var instance = axios.create({
  baseURL: 'https://api.example.com'
});
// 在实例已创建后修改默认值
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;</pre>
</div>

【配置优先顺序】

&emsp;&emsp;配置会以一个优先顺序进行合并。这个顺序是：在&nbsp;`lib/defaults.js`&nbsp;找到的库的默认值，然后是实例的&nbsp;`defaults`&nbsp;属性，最后是请求的&nbsp;`config`&nbsp;参数。后者将优先于前者

<div>
<pre>// 使用由库提供的配置的默认值来创建实例
// 此时超时配置的默认值是 `0`
var instance = axios.create();
// 覆写库的超时默认值
// 现在，在超时前，所有请求都会等待 2.5 秒
instance.defaults.timeout = 2500;
// 为已知需要花费很长时间的请求覆写超时设置
instance.get('/longRequest', {
  timeout: 5000
});</pre>
</div>

&nbsp;

### 拦截器

&emsp;&emsp;在请求或响应被&nbsp;`then`&nbsp;或&nbsp;`catch`&nbsp;处理前拦截它们

<div>
<pre>// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });</pre>
</div>

&emsp;&emsp;如果想在稍后移除拦截器，可以这样：

<div>
<pre>var myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);</pre>
</div>

&emsp;&emsp;可以为自定义 axios 实例添加拦截器

<div>
<pre>var instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});</pre>
</div>

&nbsp;

### 错误处理

<div>
<pre>axios.get('/user/12345')
  .catch(function (error) {
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });</pre>
</div>

&emsp;&emsp;可以使用&nbsp;`validateStatus`&nbsp;配置选项定义一个自定义 HTTP 状态码的错误范围

<div>
<pre>axios.get('/user/12345', {
  validateStatus: function (status) {
    return status &lt; 500; // 状态码在大于或等于500时才会 reject
  }
})</pre>
</div>

&nbsp;

### 取消

&emsp;&emsp;可以使用&nbsp;`CancelToken.source`&nbsp;工厂方法创建 cancel token，像这样：

<div>
<pre>var CancelToken = axios.CancelToken;
var source = CancelToken.source();
axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function(thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // 处理错误
  }
});
// 取消请求（message 参数是可选的）
source.cancel('Operation canceled by the user.');</pre>
</div>

&emsp;&emsp;还可以通过传递一个 executor 函数到&nbsp;`CancelToken`&nbsp;的构造函数来创建 cancel token

<div>
<pre>var CancelToken = axios.CancelToken;
var cancel;
axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // executor 函数接收一个 cancel 函数作为参数
    cancel = c;
  })
});
// 取消请求
cancel();</pre>
</div>

&emsp;&emsp;注意：&nbsp;可以使用同一个 cancel token 取消多个请求

&emsp;&emsp;下面是一个实例

<div>
<pre>let CancelToken = axios.CancelToken;
let source = CancelToken.source();
let HTTP = axios.create({
  baseURL: 'http://localhost/',
  params:{
    a:123
  },
})
HTTP.post('index.php',{
  id:12345,
  text:'小火柴'
},{
  cancelToken: source.token,
}).then((response)=&gt;{
  commit('fnChangeList',{listData:response.data})
}).catch(function(thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    console.log('err');
  }
});
source.cancel('Operation canceled by the user.'); </pre>
</div>

&emsp;&emsp;最终在控制台中打印出如下信息

<div>
<pre>Request canceled Operation canceled by the user.</pre>
</div>

