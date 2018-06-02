# fetch简明学习

&emsp;&emsp;Fetch API 提供了一个 JavaScript接口，用于访问和操纵HTTP管道的部分，例如请求和响应。它还提供了一个全局 fetch()方法，该方法提供了一种简单，合乎逻辑的方式来跨网络异步获取资源。本文将详细介绍fetch的相关内容

 

&nbsp;

### 概述

&emsp;&emsp;跨网络异步获取资源的功能以前是使用 XMLHttpRequest实现的。Fetch提供了一个更好的替代方法，可以很容易地被其他技术使用，例如 Service Workers。Fetch还提供了单个逻辑位置来定义其他HTTP相关概念，例如 CORS和HTTP的扩展

&emsp;&emsp;fetch 规范与 jQuery.ajax() 主要有两种方式的不同

&emsp;&emsp;1、当接收到一个代表错误的 HTTP 状态码时，从 fetch()返回的 Promise 不会被标记为 reject， 即使该 HTTP 响应的状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve （但是会将 resolve 的返回值的 ok 属性设置为 false ）， 仅当网络故障时或请求被阻止时，才会标记为 reject

&emsp;&emsp;2、默认情况下, fetch 不会从服务端发送或接收任何 cookies，如果站点依赖于用户 session，则会导致未经认证的请求（要发送 cookies，必须设置 credentials 选项）

 

&nbsp;

### fetch请求

&emsp;&emsp;一个基本的 fetch请求设置起来很简单。这里我们通过网络获取一个图像并将其插入到一个 `<img>` 元素中。最简单的用法是只提供一个参数用来指明想fetch到的资源路径，然后返回一个包含响应结果的promise(一个 Response 对象)

```
let myImage = document.querySelector('img');

fetch('flowers.jpg')
.then(function(response) {
    return response.blob();
})
.then(function(myBlob) {
    let objectURL = URL.createObjectURL(myBlob);
    myImage.src = objectURL;
});
```
 

&nbsp;

### 自定义参数

&emsp;&emsp;fetch() 接受第二个可选参数，一个可以控制不同配置的 init 对象：

```
var myHeaders = new Headers();

var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

fetch('flowers.jpg',myInit)
.then(function(response) {
  return response.blob();
})
.then(function(myBlob) {
  var objectURL = URL.createObjectURL(myBlob);
  myImage.src = objectURL;
});
```
 

&nbsp;

### post

```
// 通过fetch获取百度的错误提示页面
fetch('https://www.baidu.com/search/error.html', {
    method: 'POST',
    body: JSON.stringify({a:1}),
　  headers: { ...new Headers(headers), 'Content-Type': 'application/json' }
  })
  .then((res)=>{
    return res.text()
  })
  .then((res)=>{
    console.log(res)
  })
```
 

&nbsp;

### JSON数据

```
// 通过fetch获取百度的错误提示页面
fetch('https://www.baidu.com/rec?platform=wise&ms=1&rset=rcmd&word=123&qid=11327900426705455986&rq=123&from=844b&baiduid=A1D0B88941B30028C375C79CE5AC2E5E%3AFG%3D1&tn=&clientWidth=375&t=1506826017369&r=8255', { // 在URL中写上传递的参数
    method: 'GET',
    headers: new Headers({
      'Accept': 'application/json' // 通过头指定，获取的数据类型是JSON
    })
  })
  .then((res)=>{
    return res.json() // 返回一个Promise，可以解析成JSON
  })
  .then((res)=>{
    console.log(res) // 获取JSON数据
  })
```
 

&nbsp;

### 检测成功

&emsp;&emsp;如果遇到网络故障，fetch() promise 将会 reject，带上一个 TypeError 对象。虽然这个情况经常是遇到了权限问题或类似问题——比如 404 不是一个网络故障。想要精确的判断 fetch() 是否成功，需要包含 promise resolved 的情况，此时再判断 Response.ok 是不是为 true

```
fetch('flowers.jpg').then(function(response) {
  if(response.ok) {
    response.blob().then(function(myBlob) {
      var objectURL = URL.createObjectURL(myBlob);
      myImage.src = objectURL;
    });
  } else {
    console.log('Network response was not ok.');
  }
})
.catch(function(error) {
  console.log('There has been a problem with your fetch operation: ' + error.message);
});
```
 

&nbsp;

### Headers

&emsp;&emsp;使用 Headers 的接口，可以通过 Headers() 构造函数来创建一个自己的 headers 对象。一个 headers 对象是一个简单的多名值对：
```
var content = "Hello World";
var myHeaders = new Headers();
myHeaders.append("Content-Type", "text/plain");
myHeaders.append("Content-Length", content.length.toString());
myHeaders.append("X-Custom-Header", "ProcessThisImmediately");
```
&emsp;&emsp;也可以传一个多维数组或者对象字面量：
```
myHeaders = new Headers({
  "Content-Type": "text/plain",
  "Content-Length": content.length.toString(),
  "X-Custom-Header": "ProcessThisImmediately",
});
```
&emsp;&emsp;它的内容可以被获取：

```
console.log(myHeaders.has("Content-Type")); // true
console.log(myHeaders.has("Set-Cookie")); // false
myHeaders.set("Content-Type", "text/html");
myHeaders.append("X-Custom-Header", "AnotherValue");
 
console.log(myHeaders.get("Content-Length")); // 11
console.log(myHeaders.getAll("X-Custom-Header")); // ["ProcessThisImmediately", "AnotherValue"]
 
myHeaders.delete("X-Custom-Header");
console.log(myHeaders.getAll("X-Custom-Header")); // [ ]
```
 

&nbsp;

### 封装

&emsp;&emsp;下面是笔者在react中对fetch的精简版封装

```
import { showLoading, hideLoading, showAlertText, hideAlertText } from '@/components/Alert/module'
import { logout } from '@/components/Auth/module'

const async = ({ dispatch, url, method, data, headers, success, fail, doHideAlert }) => {
  // 显示loading
  dispatch(showLoading())
  let fetchObj = {}
  if (method) {
    fetchObj = {
      method,
      body: JSON.stringify(data),
      headers: new Headers({ ...headers, 'Content-Type': 'application/json' })
    }
  }
  fetch(url, fetchObj).then(res => {
    // 关闭loading
    dispatch(hideLoading())
    return res.json()
  }).then(json => {
    // 成功
    if (json.code === 0) {
      !doHideAlert && dispatch(showAlertText(json.message))
      setTimeout(() => {
        dispatch(hideAlertText())
      }, 1000)
      success && success(json.result)
      // 自定义错误
    } else if (json.code === 1) {
      dispatch(showAlertText(json.message))
      // 系统错误
    } else if (json.code === 2) {
      dispatch(showAlertText(json.message))
      fail && fail(json.err)
      // 认证失败
    } else if (json.code === 3) {
      dispatch(showAlertText(json.message))
      dispatch(logout)
    }
  }).catch(() => {
    dispatch(showAlertText('服务器故障'))
  })
}

export default async
```