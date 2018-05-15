# ES2017中的async函数

&emsp;&emsp;ES2017标准引入了 async 函数，使得异步操作变得更加方便。本文将详细介绍async函数

&nbsp;

### 概述

&emsp;&emsp;async 函数是 Generator 函数的语法糖

&emsp;&emsp;使用Generator 函数，依次读取两个文件代码如下

<div>
<pre>var fs = require('fs');
var readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};
var gen = function* () {
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};</pre>
</div>

&emsp;&emsp;写成`async`函数，就是下面这样

<div>
<pre>var asyncReadFile = async function () {
  var f1 = await readFile('/etc/fstab');
  var f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};</pre>
</div>

&emsp;&emsp;`async`函数就是将 Generator 函数的星号（`*`）替换成`async`，将`yield`替换成`await`，仅此而已

&emsp;&emsp;`async`函数对 Generator 函数的改进，体现在以下四点

&emsp;&emsp;1、内置执行器

&emsp;&emsp;Generator 函数的执行必须靠执行器，所以才有了`co`模块，而`async`函数自带执行器。也就是说，`async`函数的执行，与普通函数一模一样，只要一行

<div>
<pre>var result = asyncReadFile();</pre>
</div>

&emsp;&emsp;上面的代码调用了`asyncReadFile`函数，然后它就会自动执行，输出最后结果。这完全不像 Generator 函数，需要调用`next`方法，或者用`co`模块，才能真正执行，得到最后结果

&emsp;&emsp;2、更好的语义

&emsp;&emsp;`async`和`await`，比起星号和`yield`，语义更清楚了。`async`表示函数里有异步操作，`await`表示紧跟在后面的表达式需要等待结果

&emsp;&emsp;3、更广的适用性

&emsp;&emsp;`co`模块约定，`yield`命令后面只能是 Thunk 函数或 Promise 对象，而`async`函数的`await`命令后面，可以是Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）

&emsp;&emsp;4、返回值是 Promise

&emsp;&emsp;`async`函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。可以用`then`方法指定下一步的操作。

&emsp;&emsp;进一步说，`async`函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而`await`命令就是内部`then`命令的语法糖

&nbsp;

### 基本用法

&emsp;&emsp;`async`函数返回一个 Promise 对象，可以使用`then`方法添加回调函数。当函数执行的时候，一旦遇到`await`就会先返回，等到异步操作完成，再接着执行函数体内后面的语句

<div>
<pre>async function getStockPriceByName(name) {
  var symbol = await getStockSymbol(name);
  var stockPrice = await getStockPrice(symbol);
  return stockPrice;
}

getStockPriceByName('goog').then(function (result) {
  console.log(result);
});</pre>
</div>

&emsp;&emsp;上面代码是一个获取股票报价的函数，函数前面的`async`关键字，表明该函数内部有异步操作。调用该函数时，会立即返回一个`Promise`对象

&emsp;&emsp;下面是另一个例子，指定多少毫秒后输出一个值

<div>
<pre>function timeout(ms) {
  return new Promise((resolve) =&gt; {
    setTimeout(resolve, ms);
  });
}
async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}
asyncPrint('hello world', 50);</pre>
</div>

&emsp;&emsp;上面代码指定50毫秒以后，输出`hello world`。

&emsp;&emsp;由于`async`函数返回的是Promise对象，可以作为`await`命令的参数。所以，上面例子也可写成下面形式

<div>
<pre>async function timeout(ms) {
  await new Promise((resolve) =&gt; {
    setTimeout(resolve, ms);
  });
}
async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}
asyncPrint('hello world', 50);</pre>
</div>

&emsp;&emsp;async 函数有多种使用形式

<div>
<pre>// 函数声明
async function foo() {}
// 函数表达式
const foo = async function () {};
// 对象的方法
let obj = { async foo() {} };
obj.foo().then(...)
// Class 的方法
class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars');
  }
  async getAvatar(name) {
    const cache = await this.cachePromise;
    return cache.match(`/avatars/${name}.jpg`);
  }
}
const storage = new Storage();
storage.getAvatar('jake').then(&hellip;);
// 箭头函数
const foo = async () =&gt; {};</pre>
</div>

&nbsp;

### 语法

【返回 Promise 对象】

&emsp;&emsp;`async`函数返回一个 Promise 对象

&emsp;&emsp;`async`函数内部`return`语句返回的值，会成为`then`方法回调函数的参数

<div>
<pre>async function f() {
  return 'hello world';
}
f().then(v =&gt; console.log(v))
// "hello world"</pre>
</div>

&emsp;&emsp;上面代码中，函数`f`内部`return`命令返回的值，会被`then`方法回调函数接收到

&emsp;&emsp;`async`函数内部抛出错误，会导致返回的 Promise 对象变为`reject`状态。抛出的错误对象会被`catch`方法回调函数接收到

<div>
<pre>async function f() {
  throw new Error('出错了');
}
f().then(
  v =&gt; console.log(v),
  e =&gt; console.log(e)
)
// Error: 出错了</pre>
</div>

【Promise 对象的状态变化】

&emsp;&emsp;`async`函数返回的 Promise 对象，必须等到内部所有`await`命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到`return`语句或者抛出错误。也就是说，只有`async`函数内部的异步操作执行完，才会执行`then`方法指定的回调函数

<div>
<pre>async function getTitle(url) {
  let response = await fetch(url);
  let html = await response.text();
  return html.match(/&lt;title&gt;([\s\S]+)&lt;\/title&gt;/i)[1];
}
getTitle('https://tc39.github.io/ecma262/').then(console.log)
// "ECMAScript 2018 Language Specification"</pre>
</div>

&emsp;&emsp;上面代码中，函数`getTitle`内部有三个操作：抓取网页、取出文本、匹配页面标题。只有这三个操作全部完成，才会执行`then`方法里面的`console.log`

【`await`命令】

&emsp;&emsp;正常情况下，`await`命令后面是一个 Promise 对象。如果不是，会被转成一个立即`resolve`的 Promise 对象

<div>
<pre>async function f() {
  return await 123;
}
f().then(v =&gt; console.log(v)) // 123</pre>
</div>

&emsp;&emsp;上面代码中，`await`命令的参数是数值`123`，它被转成 Promise 对象，并立即`resolve`。

&emsp;&emsp;`await`命令后面的 Promise 对象如果变为`reject`状态，则`reject`的参数会被`catch`方法的回调函数接收到

<div>
<pre>async function f() {
  await Promise.reject('出错了');
}
f()
.then(v =&gt; console.log(v))
.catch(e =&gt; console.log(e))// 出错了</pre>
</div>

&emsp;&emsp;上面代码中，`await`语句前面没有`return`，但是`reject`方法的参数依然传入了`catch`方法的回调函数。这里如果在`await`前面加上`return`，效果是一样的

&emsp;&emsp;只要一个`await`语句后面的 Promise 变为`reject`，那么整个`async`函数都会中断执行

<div>
<pre>async function f() {
  await Promise.reject('出错了');
  await Promise.resolve('hello world'); // 不会执行
}</pre>
</div>

&emsp;&emsp;上面代码中，第二个`await`语句是不会执行的，因为第一个`await`语句状态变成了`reject`。

&emsp;&emsp;有时，希望即使前一个异步操作失败，也不要中断后面的异步操作。这时可以将第一个`await`放在`try...catch`结构里面，这样不管这个异步操作是否成功，第二个`await`都会执行

<div>
<pre>async function f() {
  try {
    await Promise.reject('出错了');
  } catch(e) {
  }
  return await Promise.resolve('hello world');
}
f().then(v =&gt; console.log(v))// hello world</pre>
</div>

&emsp;&emsp;另一种方法是`await`后面的 Promise 对象再跟一个`catch`方法，处理前面可能出现的错误

<div>
<pre>async function f() {
  await Promise.reject('出错了')
    .catch(e =&gt; console.log(e));
  return await Promise.resolve('hello world');
}
f()
.then(v =&gt; console.log(v))
// 出错了
// hello world</pre>
</div>

【错误处理】

&emsp;&emsp;如果`await`后面的异步操作出错，那么等同于`async`函数返回的 Promise 对象被`reject`

<div>
<pre>async function f() {
  await new Promise(function (resolve, reject) {
    throw new Error('出错了');
  });
}
f()
.then(v =&gt; console.log(v))
.catch(e =&gt; console.log(e))
// Error：出错了</pre>
</div>

&emsp;&emsp;上面代码中，`async`函数`f`执行后，`await`后面的 Promise 对象会抛出一个错误对象，导致`catch`方法的回调函数被调用，它的参数就是抛出的错误对象

&emsp;&emsp;防止出错的方法，也是将其放在`try...catch`代码块之中

<div>
<pre>async function f() {
  try {
    await new Promise(function (resolve, reject) {
      throw new Error('出错了');
    });
  } catch(e) {
  }
  return await('hello world');
}</pre>
</div>

&emsp;&emsp;如果有多个`await`命令，可以统一放在`try...catch`结构中

<div>
<pre>async function main() {
  try {
    var val1 = await firstStep();
    var val2 = await secondStep(val1);
    var val3 = await thirdStep(val1, val2);
    console.log('Final: ', val3);
  }
  catch (err) {
    console.error(err);
  }
}</pre>
</div>

&emsp;&emsp;下面的例子使用`try...catch`结构，实现多次重复尝试

<div>
<pre>const superagent = require('superagent');
const NUM_RETRIES = 3;
async function test() {
  let i;
  for (i = 0; i &lt; NUM_RETRIES; ++i) {
    try {
      await superagent.get('http://google.com/this-throws-an-error');
      break;
    } catch(err) {}
  }
  console.log(i); // 3
}

test();</pre>
</div>

&emsp;&emsp;上面代码中，如果`await`操作成功，就会使用`break`语句退出循环；如果失败，会被`catch`语句捕捉，然后进入下一轮循环

【注意事项】

&emsp;&emsp;`1、await`命令后面的`Promise`对象，运行结果可能是`rejected`，所以最好把`await`命令放在`try...catch`代码块中

<div>
<pre>async function myFunction() {
  try {
    await somethingThatReturnsAPromise();
  } catch (err) {
    console.log(err);
  }
}
// 另一种写法
async function myFunction() {
  await somethingThatReturnsAPromise()
  .catch(function (err) {
    console.log(err);
  });
}</pre>
</div>

&emsp;&emsp;2、多个`await`命令后面的异步操作，如果不存在继发关系，最好让它们同时触发

<div>
<pre>let foo = await getFoo();
let bar = await getBar();</pre>
</div>

&emsp;&emsp;上面代码中，`getFoo`和`getBar`是两个独立的异步操作（即互不依赖），被写成继发关系。这样比较耗时，因为只有`getFoo`完成以后，才会执行`getBar`，完全可以让它们同时触发

<div>
<pre>// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);
// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;</pre>
</div>

&emsp;&emsp;上面两种写法，`getFoo`和`getBar`都是同时触发，这样就会缩短程序的执行时间

&emsp;&emsp;3、`await`命令只能用在`async`函数之中，如果用在普通函数，就会报错

<div>
<pre>async function dbFuc(db) {
  let docs = [{}, {}, {}];
  // 报错
  docs.forEach(function (doc) {
    await db.post(doc);
  });
}</pre>
</div>

&emsp;&emsp;上面代码会报错，因为`await`用在普通函数之中了。但是，如果将`forEach`方法的参数改成`async`函数，也有问题

<div>
<pre>function dbFuc(db) { //这里不需要 async
  let docs = [{}, {}, {}];
  // 可能得到错误结果
  docs.forEach(async function (doc) {
    await db.post(doc);
  });
}</pre>
</div>

&emsp;&emsp;上面代码可能不会正常工作，原因是这时三个`db.post`操作将是并发执行，也就是同时执行，而不是继发执行。正确的写法是采用`for`循环

<div>
<pre>async function dbFuc(db) {
  let docs = [{}, {}, {}];
  for (let doc of docs) {
    await db.post(doc);
  }
}</pre>
</div>

&emsp;&emsp;如果确实希望多个请求并发执行，可以使用`Promise.all`方法。当三个请求都会`resolved`时，下面两种写法效果相同

<div>
<pre>async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) =&gt; db.post(doc));
  let results = await Promise.all(promises);
  console.log(results);
}

// 或者使用下面的写法

async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) =&gt; db.post(doc));
  let results = [];
  for (let promise of promises) {
    results.push(await promise);
  }
  console.log(results);
}</pre>
</div>

&nbsp;

### 实现原理

&emsp;&emsp;async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里

<div>
<pre>async function fn(args) {
  // ...
}
// 等同于
function fn(args) {
  return spawn(function* () {
    // ...
  });
}</pre>
</div>

&emsp;&emsp;所有的`async`函数都可以写成上面的第二种形式，其中的`spawn`函数就是自动执行器。

&emsp;&emsp;下面给出`spawn`函数的实现，基本就是前文自动执行器的翻版

<div>
<pre>function spawn(genF) {
  return new Promise(function(resolve, reject) {
    var gen = genF();
    function step(nextF) {
      try {
        var next = nextF();
      } catch(e) {
        return reject(e);
      }
      if(next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }
    step(function() { return gen.next(undefined); });
  });
}</pre>
</div>

&nbsp;

### 异步比较

&emsp;&emsp;通过一个例子，来看 async 函数与 Promise、Generator 函数的比较。

&emsp;&emsp;假定某个 DOM 元素上面，部署了一系列的动画，前一个动画结束，才能开始后一个。如果当中有一个动画出错，就不再往下执行，返回上一个成功执行的动画的返回值

【Promise】

&emsp;&emsp;首先是 Promise 的写法

<div>
<pre>function chainAnimationsPromise(elem, animations) {
  // 变量ret用来保存上一个动画的返回值
  var ret = null;
  // 新建一个空的Promise
  var p = Promise.resolve();
  // 使用then方法，添加所有动画
  for(var anim of animations) {
    p = p.then(function(val) {
      ret = val;
      return anim(elem);
    });
  }
  // 返回一个部署了错误捕捉机制的Promise
  return p.catch(function(e) {
    /* 忽略错误，继续执行 */
  }).then(function() {
    return ret;
  });

}</pre>
</div>

&emsp;&emsp;虽然 Promise 的写法比回调函数的写法大大改进，但是一眼看上去，代码完全都是 Promise 的 API（`then`、`catch`等等），操作本身的语义反而不容易看出来

【Generator】

&emsp;&emsp;接着是 Generator 函数的写法

<div>
<pre>function chainAnimationsGenerator(elem, animations) {
  return spawn(function*() {
    var ret = null;
    try {
      for(var anim of animations) {
        ret = yield anim(elem);
      }
    } catch(e) {
      /* 忽略错误，继续执行 */
    }
    return ret;
  });

}</pre>
</div>

&emsp;&emsp;上面代码使用 Generator 函数遍历了每个动画，语义比 Promise 写法更清晰，用户定义的操作全部都出现在`spawn`函数的内部。这个写法的问题在于，必须有一个任务运行器，自动执行 Generator 函数，上面代码的`spawn`函数就是自动执行器，它返回一个 Promise 对象，而且必须保证`yield`语句后面的表达式，必须返回一个 Promise

【async】

&emsp;&emsp;最后是 async 函数的写法

<div>
<pre>async function chainAnimationsAsync(elem, animations) {
  var ret = null;
  try {
    for(var anim of animations) {
      ret = await anim(elem);
    }
  } catch(e) {
    /* 忽略错误，继续执行 */
  }
  return ret;
}</pre>
</div>

&emsp;&emsp;可以看到Async函数的实现最简洁，最符合语义，几乎没有语义不相关的代码。它将Generator写法中的自动执行器，改在语言层面提供，不暴露给用户，因此代码量最少。如果使用Generator写法，自动执行器需要用户自己提供

&nbsp;

### 实例

&emsp;&emsp;实际开发中，经常遇到一组异步操作，需要按照顺序完成。比如，依次远程读取一组 URL，然后按照读取的顺序输出结果

【Promise】

&emsp;&emsp;Promise 的写法如下

<div>
<pre>function logInOrder(urls) {
  // 远程读取所有URL
  const textPromises = urls.map(url =&gt; {
    return fetch(url).then(response =&gt; response.text());
  });
  // 按次序输出
  textPromises.reduce((chain, textPromise) =&gt; {
    return chain.then(() =&gt; textPromise)
      .then(text =&gt; console.log(text));
  }, Promise.resolve());
}</pre>
</div>

&emsp;&emsp;上面代码使用`fetch`方法，同时远程读取一组 URL。每个`fetch`操作都返回一个 Promise 对象，放入`textPromises`数组。然后，`reduce`方法依次处理每个 Promise 对象，然后使用`then`，将所有 Promise 对象连起来，因此就可以依次输出结果

【async】

&emsp;&emsp;上面这种写法不太直观，可读性比较差。下面是 async 函数实现

<div>
<pre>async function logInOrder(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    console.log(await response.text());
  }
}</pre>
</div>

&emsp;&emsp;上面代码确实大大简化，问题是所有远程操作都是继发。只有前一个URL返回结果，才会去读取下一个URL，这样做效率很差，非常浪费时间。我们需要的是并发发出远程请求

<div>
<pre>async function logInOrder(urls) {
  // 并发读取远程URL
  const textPromises = urls.map(async url =&gt; {
    const response = await fetch(url);
    return response.text();
  });
  // 按次序输出
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}</pre>
</div>

&emsp;&emsp;上面代码中，虽然`map`方法的参数是`async`函数，但它是并发执行的，因为只有`async`函数内部是继发执行，外部不受影响。后面的`for..of`循环内部使用了`await`，因此实现了按顺序输出

