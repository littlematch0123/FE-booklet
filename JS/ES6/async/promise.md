# Promise和异步编程

&emsp;&emsp;JS有很多强大的功能，其中一个是它可以轻松地搞定异步编程。作为一门为Web而生的语言，它从一开始就需要能够响应异步的用户交互，如点击和按键操作等。Node.js用回调函数代替了事件，使异步编程在JS领域更加流行。但当更多程序开始使用异步编程时，事件和回调函数却不能满足开发者想要做的所有事情，它们还不够强大，而Promise就是这些问题的解决方案

&emsp;&emsp;Promise可以实现其他语言中类似Future和Deferred一样的功能，是另一种异步编程的选择，它既可以像事件和回调函数一样指定稍后执行的代码，也可以明确指示代码是否成功执行。基于这些成功或失败的状态，为了让代码更容易理解和调试，可以链式地编写Promise。本文将详细介绍Promise和异步编程

&nbsp;

### 引入

&emsp;&emsp;JS引擎是基于单线程(Single-threaded)事件循环的概念构建的，同一时刻只允许一个代码块在执行，与之相反的是像Java和C++一样的语言，它们允许多个不同的代码块同时执行。对于基于线程的软件而言，当多个代码块同时访问并改变状态时，程序很难维护并保证状态不会出错&nbsp;

&emsp;&emsp;JS引擎同一时刻只能执行一个代码块，所以需要跟踪即将运行的代码，那些代码被放在一个任务队列(job queue)中，每当一段代码准备执行时，都会被添加到任务队列。每当JS引擎中的一段代码结束执行，事件循环(event toop)会执行队列中的下一个任务，它是JS引擎中的一段程序，负责监控代码执行并管理任务队列。队列中的任务会从第一个一直执行到最后一个

【事件模型】

&emsp;&emsp;用户点击按钮或按下键盘上的按键会触发类似onclick这样的事件，它会向任务队列添加一个新任务来响应用户的操作，这是JS中最基础的异步编程形式，直到事件触发时才执行事件处理程序，且执行时上下文与定义时的相同

<div>
<pre>let button = document.getElementById("my-btn");
button.onclick = function(event) {
    console.log("Clicked");
};</pre>
</div>

&emsp;&emsp;在这段代码中，单击button后会执行console.log("clicked")，赋值给onclick的函数被添加到任务队列中，只有当前面的任务都完成后它才会被执行

&emsp;&emsp;事件模型适用于处理简单的交互，然而将多个独立的异步调用连接在一起会使程序更加复杂，因为必须跟踪每个事件的事件目标(如此示例中的button)。此外，必须要保证事件在添加事件处理程序之后才被触发。例如，如果先单击button再给onclick赋值，则任何事情都不会发生。所以，尽管事件模型适用于响应用户交互和完成类似的低频功能，但其对于更复杂的需求来说却不是很灵活

【回调模式】

&emsp;&emsp;Node.js通过普及回调函数来改进异步编程模型，回调模式与事件模型类似，异步代码都会在未来的某个时间点执行，二者的区别是回调模式中被调用的函数是作为参数传入的

<div>
<pre>readFile("example.txt", function(err, contents) {
    if (err) {
        throw err;
    }
    console.log(contents);
});
console.log("Hi!");</pre>
</div>

&emsp;&emsp;此示例使用Node.js传统的错误优先(error-first)回调风格。readFile()函数读取磁盘上的某个文件(指定为第一个参数)，读取结束后执行回调函数(第二个参数)。如果出现错误，错误对象会被赋值给回调函数的err参数；如果一切正常，文件内容会以字符串的形式被赋值给contents参数

&emsp;&emsp;由于使用了回调模式，readFile()函数立即开始执行，当读取磁盘上的文件时会暂停执行。也就是说，调用readFile()函数后，console.log("Hi")语句立即执行并输出"Hi"；当readFile()结束执行时，会向任务队列的末尾添加一个新任务，该任务包含回调函数及相应的参数，当队列前面所有的任务完成后才执行该任务，并最终执行console.log(contents)输出所有内容

&emsp;&emsp;回调模式比事件模型更灵活，因为相比之下，通过回调模式链接多个调用更容易

<div>
<pre>readFile("example.txt", function(err, contents) {
    if (err) {
        throw err;
    }
    writeFile("example.txt", function(err) {
        if (err) {
            throw err;
        }
        console.log("File was written!");
    });
});</pre>
</div>

&emsp;&emsp;在这段代码中，成功调用readFile()函数后会执行writeFile()函数的异步调用。在这两个函数中是通过相同的基本模式来检查err是否存在的。当readFile()函数执行完成后，会向任务队列中添加一个任务，如果没有错误产生，则执行writeFile()函数，然后当writeFile()函数执行结束后也向任务队列中添加一个任务

&emsp;&emsp;虽然这个模式运行效果很不错，但如果嵌套了太多的回调函数，很可能会陷入回调地狱

<div>
<pre>method1(function(err, result) {
    if (err) {
        throw err;
    }
    method2(function(err, result) {
        if (err) {
            throw err;
        }
        method3(function(err, result) {
            if (err) {
                throw err;
            }
            method4(function(err, result) {
                if (err) {
                    throw err;
                }
                method5(result);
            });
        });
    });
});</pre>
</div>

&emsp;&emsp;像示例中这样嵌套多个方法调用，会创建出一堆难以理解和调试的代码。如果想实现更复杂的功能，回调函数的局限性同样也会显现出来。例如，并行执行两个异步操作，当两个操作都结束时通知你；或者同时进行两个异步操作，只取优先完成的操作结果。在这些情况下，需要跟踪多个回调函数并清理这些操作，而Promise就能非常好地改进这样的情况

&nbsp;

### 基础

&emsp;&emsp;Promise相当于异步操作结果的占位符，它不会去订阅一个事件，也不会传递一个回调函数给目标函数，而是让函数返回一个Promise

<div>
<pre>// readFile 承诺会在将来某个时间点完成
let promise = readFile("example.txt");</pre>
</div>

&emsp;&emsp;在这段代码中，readFile()不会立即开始读取文件，函数会先返回一个表示异步读取操作的Promise对象，未来对这个对象的操作完全取决于Promise的生命周期

【Promise的生命周期】

&emsp;&emsp;每个Promise都会经历一个短暂的生命周期：先是处于进行中(pending)的状态，此时操作尚未完成，所以它也是未处理(unsettled)的；一旦异步操作执行结束，Promise则变为已处理(settled)的状态

&emsp;&emsp;在之前的示例中，当readFile()函数返回promise时它变为pending状态，操作结束后，Promise可能会进入到以下两个状态中的其中一个

&emsp;&emsp;1、Fulfilled

&emsp;&emsp;Promise异步操作成功完成

&emsp;&emsp;2、Rejected

&emsp;&emsp;由于程序错误或一些其他原因，Promise异步操作未能成功

&emsp;&emsp;内部属性[[PromiseState]]被用来表示Promise的3种状态："pending"、"fulfilled"及"rejected"。这个属性不暴露在Promise对象上，所以不能以编程的方式检测Promise的状态，只有当Promise的状态改变时，通过then()方法来采取特定的行动

&emsp;&emsp;所有Promise都有then()方法，它接受两个参数：第一个是当Promise的状态变为fulfilled时要调用的函数，与异步操作相关的附加数据都会传递给这个完成函数(fulfillment function)；第二个是当Promise的状态变为rejected时要调用的函数，其与完成时调用的函数类似，所有与失败状态相关的附加数据都会传递给这个拒绝函数(rejection function)

&emsp;&emsp;注意：如果一个对象实现了上述的then()方法，那这个对象我们称之为thenable对象。所有的Promise都是thenable对象，但并非所有thenable对象都是Promise

&emsp;&emsp;then()的两个参数都是可选的，所以可以按照任意组合的方式来监听Promise，执行完成或被拒绝都会被响应

<div>
<pre>let promise = readFile("example.txt");
promise.then(function(contents) {
    // 完成
    console.log(contents);
}, function(err) {
    // 拒绝
    console.error(err.message);
});
promise.then(function(contents) {
    // 完成
    console.log(contents);
});
promise.then(null, function(err) {
    // 拒绝
    console.error(err.message);
});</pre>
</div>

&emsp;&emsp;上面这3次then()调用操作的是同一个Promise。第一个同时监听了执行完成和执行被拒；第二个只监听了执行完成，错误时不报告；第三个只监听了执行被拒，成功时不报告

&emsp;&emsp;Promise还有一个catch()方法，相当于只给其传入拒绝处理程序的then()方法

<div>
<pre>promise.catch(function(err) {
    // 拒绝
    console.error(err.message);
});
// 等同于：
promise.then(null, function(err) {
    // 拒绝
    console.error(err.message);
});</pre>
</div>

&emsp;&emsp;then()方法和catch()方法一起使用才能更好地处理异步操作结果。这套体系能够清楚地指明操作结果是成功还是失败，比事件和回调函数更好用。如果使用事件，在遇到错误时不会主动触发；如果使用回调函数，则必须要记得每次都检查错误参数。如果不给Promise添加拒绝处理程序，那所有失败就自动被忽略了，所以一定要添加拒绝处理程序，即使只在函数内部记录失败的结果也行

&emsp;&emsp;如果一个Promise处于己处理状态，在这之后添加到任务队列中的处理程序仍将执行。所以无论何时都可以添加新的完成处理程序或拒绝处理程序，同时也可以保证这些处理程序能被调用

<div>
<pre>let promise = readFile("example.txt");
    // 原始的完成处理函数
    promise.then(function(contents) {
        console.log(contents);
        // 现在添加另一个
        promise.then(function(contents) {
            console.log(contents);
        });
});</pre>
</div>

&emsp;&emsp;在这段代码中，一个完成处理程序被调用时向同一个Promise添加了另一个完成处理程序，此时这个Promise已完成，所以新的处理程序会被添加到任务队列中，前面的任务完成后其才被调用。这对拒绝处理程序也同样适用

&emsp;&emsp;注意：每次调用then()方法或catch()方法都会创建一个新任务，当Promise被解决(resolved)时执行。这些任务最终会被加入到一个为Promise量身定制的独立队列中

【创建未完成的Promise】

&emsp;&emsp;用Promise构造函数可以创建新的Promise，构造函数只接受一个参数：包含初始化Promise代码的执行器(executor)函数。执行器接受两个参数，分别是resolve()函数和reject()函数。执行器成功完成时调用resolve()函数，反之，失败时则调用reject()函数

<div>
<pre>// Node.js 范例
let fs = require("fs");
function readFile(filename) {
    return new Promise(function(resolve, reject) {
        // 触发异步操作
        fs.readFile(filename, { encoding: "utf8" }, function(err, contents) {
            // 检查错误
            if (err) {
                reject(err);
                return;
            }
            // 读取成功
            resolve(contents);
        });
    });
}
let promise = readFile("example.txt");
// 同时监听完成与拒绝
promise.then(function(contents) {
    // 完成
    console.log(contents);
}, function(err) {
    // 拒绝
    console.error(err.message);
});</pre>
</div>

&emsp;&emsp;在这个示例中，用Promise包裹了一个原生Node.js的fs.readFile()异步调用。如果失败，执行器向reject()函数传递错误对象；如果成功，执行器向resolve()函数传递文件内容

&emsp;&emsp;readFile()方法被调用时执行器会立刻执行，在执行器中，无论是调用resolve()还是reject()，都会向任务队列中添加一个任务来解决这个Promise。如果曾经使用过setTimeout()或setInterval()函数，应该熟悉这种名为任务编排(job schedhling)的过程。当编排任务时，会向任务队列中添加一个新任务，并明确指定将任务延后执行。例如，使用setTimeout()函数可以指定将任务添加到队列前的延时

<div>
<pre>// 在 500 毫秒之后添加此函数到作业队列
setTimeout(function() {
    console.log("Timeout");
}, 500);
console.log("Hi!");</pre>
</div>

&emsp;&emsp;这段代码编排了一个500 ms后才被添加到任务队列的任务，两次console.log()调用分别输出以下内容

<div>
<pre>Hi!
Timeout</pre>
</div>

&emsp;&emsp;由于有500ms的延时，因而传入setTimeout()的函数在console.log("Hi!")输出"Hi"之后才输出"Timeout"

&emsp;&emsp;Promise具有类似的工作原理，Promise的执行器会立即执行，然后才执行后续流程中的代码

<div>
<pre>let promise = new Promise(function(resolve, reject) {
    console.log("Promise");
    resolve();
});
console.log("Hi!");</pre>
</div>

&emsp;&emsp;这段代码的输出内容是

<div>
<pre>promise
Hi !</pre>
</div>

&emsp;&emsp;调用resolve()后会触发一个异步操作，传入then()和catch()方法的函数会被添加到任务队列中并异步执行

<div>
<pre>let promise = new Promise(function(resolve, reject) {
    console.log("Promise");
    resolve();
});
promise.then(function() {
    console.log("Resolved.");
});
console.log("Hi!");</pre>
</div>

&emsp;&emsp;这个示例的输出内容为

<div>
<pre>promise
Hi !
Resolved</pre>
</div>

&emsp;&emsp;即使在代码中then()调用位于console.log("Hi!")之前，但其与执行器不同，它并没有立即执行。这是因为，完成处理程序和拒绝处理程序总是在执行器完成后被添加到任务队列的末尾

【创建已处理的Promise】

&emsp;&emsp;创建未处理Promise的最好方法是使用Promise的构造函数，这是由于Promise执行器具有动态性。但如果想用Promise来表示一个已知值，则编排一个只是简单地给resolve()函数传值的任务并无实际意义，反倒是可以用以下两种方法根据特定的值来创建己解决Promise

**使用Promise.resolve()**

&emsp;&emsp;Promise.resolve()方法只接受一个参数并返回一个完成态的Promise，也就是说不会有任务编排的过程，而且需要向Promise添加一至多个完成处理程序来获取值

<div>
<pre>let promise = Promise.resolve(42);
promise.then(function(value) {
    console.log(value); // 42
});</pre>
</div>

&emsp;&emsp;这段代码创建了一个已完成Promise，完成处理程序的形参value接受了传入值42，由于该Promise永远不会存在拒绝状态，因而该Promise的拒绝处理程序永远不会被调用

**使用Promise.reject()**

&emsp;&emsp;也可以通过Promise.reject()方法来创建已拒绝Promise，它与Promise.resolve()很像，唯一的区别是创建出来的是拒绝态的Promise

<div>
<pre>let promise = Promise.reject(42);
promise.catch(function(value) {
    console.log(value); // 42
});</pre>
</div>

&emsp;&emsp;任何附加到这个Promise的拒绝处理程序都将被调用，但却不会调用完成处理程序

&emsp;&emsp;注意：如果向Promise.resolve()方法或Promise.reject()方法传入一个Promise，那么这个Promise会被直接返回

**非Promise的Thenable对象**

&emsp;&emsp;Promise.resolve()方法和Promise.reject()方法都可以接受非Promise的Thenable对象作为参数。如果传入一个非Promise的Thenable对象，则这些方法会创建一个新的Promise，并在then()函数中被调用

&emsp;&emsp;拥有then()方法并且接受resolve和reject这两个参数的普通对象就是非Promise的Thenable对象

<div>
<pre>let thenable = {
    then: function(resolve, reject) {
        resolve(42);
    }
};</pre>
</div>

&emsp;&emsp;在此示例中，Thenable对象和Promise之间只有then()方法这一个相似之处，可以调用Promise.resolve()方法将Thenable对象转换成一个已完成Promise

<div>
<pre>let thenable = {
    then: function(resolve, reject) {
        resolve(42);
    }
};
let p1 = Promise.resolve(thenable);
p1.then(function(value) {
    console.log(value); // 42
});</pre>
</div>

&emsp;&emsp;在此示例中，Promise.resolve()调用的是thenable.then()，所以Promise的状态可以被检测到。由于是在then()方法内部调用了resolve(42)，因此Thenable对象的Promise状态是已完成。新创建的已完成状态Promise p1从Thenable对象接受传入的值(也就是42)，p1的完成处理程序将42赋值给形参value

&emsp;&emsp;可以使用与Promise.resolve()相同的过程创建基于Thenable对象的已拒绝Promise

<div>
<pre>let thenable = {
    then: function(resolve, reject) {
        reject(42);
    }
};
let p1 = Promise.resolve(thenable);
p1.catch(function(value) {
    console.log(value); // 42
});</pre>
</div>

&emsp;&emsp;此示例与前一个相比，除了Thenable对象是已拒绝状态外，其余部分比较相似。执行thenable.then()时会用值42创建一个己拒绝状态的Promise，这个值随后会被传入p1的拒绝处理程序

&emsp;&emsp;有了Promise.resolve()方法和Promise.reject()方法，可以更轻松地处理非Promise的Thenable对象。在ES6引入Promise对象之前，许多库都使用了Thenable对象，所以如果要向后兼容之前已有的库，则将Thenable对象转换为正式Promise的能力就显得至关重要了。如果不确定某个对象是不是Promise对象，那么可以根据预期的结果将其传入promise.resolve()方法中或Promise.reject()方法中，如果它是Promise对象，则不会有任何变化

【执行器错误】

&emsp;&emsp;如果执行器内部抛出一个错误，则Promise的拒绝处理程序就会被调用

<div>
<pre>let promise = new Promise(function(resolve, reject) {
    throw new Error("Explosion!");
});
promise.catch(function(error) {
    console.log(error.message); // "Explosion!"
});</pre>
</div>

&emsp;&emsp;在这段代码中，执行器故意抛出了一个错误，每个执行器中都隐含一个try-catch块，所以错误会被捕获并传入拒绝处理程序。此例等价于

<div>
<pre>let promise = new Promise(function(resolve, reject) {
    try {
        throw new Error("Explosion!");
    } catch (ex) {
        reject(ex);
    }
});
promise.catch(function(error) {
    console.log(error.message); // "Explosion!"
});</pre>
</div>

&emsp;&emsp;为了简化这种常见的用例，执行器会捕获所有抛出的错误，但只有当拒绝处理程序存在时才会记录执行器中抛出的错误，否则错误会被忽略掉。在早期的时候，开发人员使用Promise会遇到这种问题，后来，JS环境提供了一些捕获己拒绝Promise的钩子函数来解决这个问题

【利用promise实现一个休眠函数】

```
function sleep(time){
  return new Promise(function(resolve, reject){
    setTimeout(resolve, time)
  })
}
sleep(100).then(function() {
  console.log('113')
})
```
&nbsp;

### 拒绝处理

&emsp;&emsp;有关Promise的其中一个最具争议的问题是，如果在没有拒绝处理程序的情况下拒绝一个Promise，那么不会提示失败信息，这是JS语言中唯一一处没有强制报错的地方，一些人认为这是标准中最大的缺陷

&emsp;&emsp;Promise的特性决定了很难检测一个Promise是否被处理过

<div>
<pre>let rejected = Promise.reject(42);
    // 在此刻 rejected 不会被处理
    // 一段时间后&hellip;&hellip;
rejected.catch(function(value) {
    // 现在 rejected 已经被处理了
    console.log(value);
});</pre>
</div>

&emsp;&emsp;任何时候都可以调用then()方法或catch()方法，无论Promise是否已解决，这两个方法都可以正常运行，但这样就很难知道一个Promise何时被处理。在此示例中，Promise被立即拒绝，但是稍后才被处理

&emsp;&emsp;尽管这个问题在未来版本的ES中可能会被解决，但是Node和和浏览器环境都已分别做出了一些改变来解决开发者的这个痛点，这些改变不是ES6标准的一部分，不过使用Promise时它们确实是非常有价值的工具

【Node.js环境的拒绝处理】

&emsp;&emsp;在Node.js中，处理Promise拒绝时会触发process对象上的两个事件

&emsp;&emsp;1、unhandledRejection

&emsp;&emsp;在一个事件循环中，当Promise被拒绝，并且没有提供拒绝处理程序时被调用

&emsp;&emsp;2、rejectionHandled

&emsp;&emsp;在一个事件循环后，当Promise被拒绝，并且没有提供拒绝处理程序时被调用

&emsp;&emsp;设计这些事件是用来识别那些被拒绝却又没被处理过的Promise的

&emsp;&emsp;拒绝原因(通常是一个错误对象)及被拒绝的Promise作为参数被传入unhandledRejection事件处理程序中

<div>
<pre>let rejected;
process.on("unhandledRejection", function(reason, promise) {
    console.log(reason.message); // "Explosion!"
    console.log(rejected === promise); // true
});
rejected = Promise.reject(new Error("Explosion!"));</pre>
</div>

&emsp;&emsp;这个示例创建了一个已拒绝Promise和一个错误对象，并监听了unhandledRejection事件，事件处理程序分别接受错误对象和Promise作为它的两个参数

&emsp;&emsp;rejectionHandled事件处理程序只有一个参数，也就是被拒绝的Promise

<div>
<pre>let rejected;
process.on("rejectionHandled", function(promise) {
    console.log(rejected === promise); // true
});
rejected = Promise.reject(new Error("Explosion!"));
// 延迟添加拒绝处理函数
setTimeout(function() {
    rejected.catch(function(value) {
        console.log(value.message); // "Explosion!"
    });
}, 1000);</pre>
</div>

&emsp;&emsp;这里的rejectionHandled事件在拒绝处理程序最后被调用时触发，如果在创建rejected之后直接添加拒绝处理程序，那么rejectionHandled事件不会被触发，因为rejected创建的过程与拒绝处理程序的调用在同一个事件循环中，此时rejectionHandled事件尚未生效

&emsp;&emsp;通过事件rejectionHandled和事件unhandledRejection将潜在未处理的拒绝存储为一个列表，等待一段时间后检查列表便能够正确地跟踪潜在的未处理拒绝。例如下面这个简单的未处理拒绝跟踪器

<div>
<pre>let possiblyUnhandledRejections = new Map();
// 当一个拒绝未被处理，将其添加到 map
process.on("unhandledRejection", function(reason, promise) {
    possiblyUnhandledRejections.set(promise, reason);
});
process.on("rejectionHandled", function(promise) {
    possiblyUnhandledRejections.delete(promise);
});
setInterval(function() {
    possiblyUnhandledRejections.forEach(function(reason, promise) {
        console.log(reason.message ? reason.message : reason);
        // 做点事来处理这些拒绝
        handleRejection(promise, reason);
    });
    possiblyUnhandledRejections.clear();
}, 60000);</pre>
</div>

&emsp;&emsp;这段代码使用Map集合来存储Promise及其拒绝原因，每个Promise键都有一个拒绝原因的相关值。每当触发unhandledRejection事件时，会向Map集合中添加一组Promise及拒绝原因；每当触发rejectionHandled事件时，已处理的Promise会从Map集合中移除。结果是，possiblyUnhandledRejections会随着事件调用不断扩充或收缩。setInterval()调用会定期检查列表，将可能未处理的拒绝输出到控制台(实际上会通过其他方式记录或者直接处理掉这个拒绝)。在这个示例中使用的是Map集合而不是WeakMap集合，这是因为需要定期检查Map集合来确认一个Promise是否存在，而这是WeakMap无法实现的

&emsp;&emsp;尽管这个示例针对Node.js设计，但是浏览器也实现了一套类似的机制来提示开发者哪些拒绝还没有被处理

【浏览器环境的拒绝处理】

&emsp;&emsp;浏览器也是通过触发两个事件来识别未处理的拒绝的，虽然这些事件是在window对象上触发的，但实际上与Node.js中的完全等效

&emsp;&emsp;1、unhandledrejection

&emsp;&emsp;在一个事件循环中，当promise被拒绝，并且没有提供拒绝处理程序时被调用

&emsp;&emsp;2、rejectionhandled

&emsp;&emsp;在一个事件循环后，当promise被拒绝，并且没有提供拒绝处理程序时被调用

&emsp;&emsp;在Node.js实现中，事件处理程序接受多个独立参数：而在浏览器中，事件处理程序接受一个有以下属性的事件对象作为参数

<div>
<pre>type  事件名称 ("unhandledrejection"或"rejectionhandled")
promise 被拒绝的promise对象
reason 来自promise的拒绝值</pre>
</div>

&emsp;&emsp;浏览器实现中的另一处不同是，在两个事件中都可以使用拒绝值(reason)

<div>
<pre>let rejected;
window.onunhandledrejection = function(event) {
    console.log(event.type); // "unhandledrejection"
    console.log(event.reason.message); // "Explosion!"
    console.log(rejected === event.promise); // true
};
window.onrejectionhandled = function(event) {
    console.log(event.type); // "rejectionhandled"
    console.log(event.reason.message); // "Explosion!"
    console.log(rejected === event.promise); // true
};
rejected = Promise.reject(new Error("Explosion!"));</pre>
</div>

&emsp;&emsp;这段代码用DOM0级记法的onunhandledrejection和onrejectionhandled给两个事件处理程序赋值，当然也可以使用addEventListener("unhandledrejection") 和addEventListener("rejectionhandled")，每个事件处理程序接受一个含有被拒绝Promise信息的事件对象，该对象的属性type、promise和reason在这两个事件处理程序中均可使用

&emsp;&emsp;在浏览器中，跟踪未处理拒绝的代码也与Node.js中的非常相似

<div>
<pre>let possiblyUnhandledRejections = new Map();
// 当一个拒绝未被处理，将其添加到 map
window.onunhandledrejection = function(event) {
    possiblyUnhandledRejections.set(event.promise, event.reason);
};
window.onrejectionhandled = function(event) {
    possiblyUnhandledRejections.delete(event.promise);
};
setInterval(function() {
    possiblyUnhandledRejections.forEach(function(reason, promise) {
        console.log(reason.message ? reason.message : reason);
        // 做点事来处理这些拒绝
        handleRejection(promise, reason);
    });
    possiblyUnhandledRejections.clear();
}, 60000);</pre>
</div>

&emsp;&emsp;浏览器中的实现与Node.js中的几乎完全相同，二者都是用同样的方法将promise及其拒绝值存储在Map集合中，然后再进行检索。唯一的区别是，在事件处理程序中检索信息的位置不同

&nbsp;

### 串联

&emsp;&emsp;至此，看起来好像Promise只是将回调函数和setTimeout()函数结合起来，并在此基础上做了一些改进。但Promise所能实现的远超我们目之所及，尤其是很多将Promise串联起来实现更复杂的异步特性的方法

&emsp;&emsp;每次调用then()方法或catch()方法时实际上创建并返回了另一个Promise，只有当第一个Promise完成或被拒绝后，第二个才会被解决

<div>
<pre>let p1 = new Promise(function(resolve, reject) {
    resolve(42);
});
p1.then(function(value) {
    console.log(value);
}).then(function() {
    console.log("Finished");
});</pre>
</div>

&emsp;&emsp;这段代码输出以下内容

<div>
<pre>42
Finished</pre>
</div>

&emsp;&emsp;调用p1.then()后返回第二个Promise，紧接着又调用了它的then()方法，只有当第一个Promise被解决之后才会调用第二个then()方法的完成处理程序。如果将这个示例拆解开，看起来是这样的

<div>
<pre>let p1 = new Promise(function(resolve, reject) {
    resolve(42);
});
let p2 = p1.then(function(value) {
    console.log(value);
})
p2.then(function() {
    console.log("Finished");
});</pre>
</div>

&emsp;&emsp;在这个非串联版本的代码中，调用p1.then()的结果被存储在了p2中，然后p2.then()被调用来添加最终的完成处理程序

【捕获错误】

&emsp;&emsp;在之前的示例中，完成处理程序或拒绝处理程序中可能发生错误，而Promise链可以用来捕获这些错误

<div>
<pre>let p1 = new Promise(function(resolve, reject) {
    resolve(42);
});
p1.then(function(value) {
    throw new Error("Boom!");
}).catch(function(error) {
    console.log(error.message); // "Boom!"
});</pre>
</div>

&emsp;&emsp;在这段代码中，p1的完成处理程序抛出了一个错误，链式调用第二个Promise的catch()方法后，可以通过它的拒绝处理程序接收这个错误。如果拒绝处理程序抛出错误，也可以通过相同的方式接收到这个错误

<div>
<pre>let p1 = new Promise(function(resolve, reject) {
    throw new Error("Explosion!");
});
p1.catch(function(error) {
    console.log(error.message); // "Explosion!"
    throw new Error("Boom!");
}).catch(function(error) {
    console.log(error.message); // "Boom!"
});</pre>
</div>

&emsp;&emsp;此处的执行器抛出错误并触发Promise p1的拒绝处理程序，这个处理程序又抛出另外一个错误，并且被第二个Promise的拒绝处理程序捕获。链式Promise调用可以感知到链中其他Promise的错误

&emsp;&emsp;注意：务必在Promise链的末尾留有一个拒绝处理程序以确保能够正确处理所有可能发生的错误

【Promise链的返回值】

&emsp;&emsp;Promise链的另一个重要特性是可以给下游Promise传递数据，已经知道了从执行器resolve()处理程序到Promise完成处理程序的数据传递过程，如果在完成处理程序中指定一个返回值，则可以沿着这条链继续传递数据

<div>
<pre>let p1 = new Promise(function(resolve, reject) {
    resolve(42);
});
p1.then(function(value) {
    console.log(value); // "42"
    return value + 1;
}).then(function(value) {
    console.log(value); // "43"
});</pre>
</div>

&emsp;&emsp;执行器传入的value为42，p1的完成处理程序执行后返回value+1也就是43。这个值随后被传给第二个Promise的完成处理程序并输出到控制台

&emsp;&emsp;在拒绝处理程序中也可以做相同的事情，当它被调用时可以返回一个值，然后用这个值完成链条中后续的Promise

<div>
<pre>let p1 = new Promise(function(resolve, reject) {
    reject(42);
});
p1.catch(function(value) {
    // 第一个完成处理函数
    console.log(value); // "42"
    return value + 1;
}).then(function(value) {
    // 第二个完成处理函数
    console.log(value); // "43"
});</pre>
</div>

&emsp;&emsp;在这个示例中，执行器调用reject()方法向Promise的拒绝处理程序传入值42，最终返回value+1。拒绝处理程序中返回的值仍可用在下一个Promise的完成处理程序中，在必要时，即使其中一个Promise失败也能恢复整条链的执行

【在Promise链中返回Promise】

&emsp;&emsp;在Promise间可以通过完成和拒绝处理程序中返回的原始值来传递数据，但如果返回的是Promise对象，会通过一个额外的步骤来确定下一步怎么走

<div>
<pre>let p1 = new Promise(function(resolve, reject) {
    resolve(42);
});
let p2 = new Promise(function(resolve, reject) {
    resolve(43);
});
p1.then(function(value) {
    // 第一个完成处理函数
    console.log(value); // 42
    return p2;
}).then(function(value) {
    // 第二个完成处理函数
    console.log(value); // 43
});</pre>
</div>

&emsp;&emsp;在这段代码中，p1编排的任务解决并传入42，然后p1的完成处理程序返回一个已解决状态的Promise p2，由于p2已经被完成，因此第二个完成处理程序被调用。如果p2被拒绝，则调用拒绝处理程序

&emsp;&emsp;关于这个模式，最需要注意的是，第二个完成处理程序被添加到了第三个Promise而不是p2

<div>
<pre>let p1 = new Promise(function(resolve, reject) {
    resolve(42);
});
let p2 = new Promise(function(resolve, reject) {
    resolve(43);
});
let p3 = p1.then(function(value) {
    // 第一个完成处理函数
    console.log(value); // 42
    return p2;
});
p3.then(function(value) {
    // 第二个完成处理函数
    console.log(value); // 43
});</pre>
</div>

&emsp;&emsp;很明显的是，此处第二个完成处理程序被添加到p3而非p2，这个差异虽小但非常重要，如果p2被拒绝那么第二个完成处理程序将不会被调用

<div>
<pre>let p1 = new Promise(function(resolve, reject) {
    resolve(42);
});
let p2 = new Promise(function(resolve, reject) {
    reject(43);
});
p1.then(function(value) {
    // 第一个完成处理函数
    console.log(value); // 42
    return p2;
}).then(function(value) {
    // 第二个完成处理函数
    console.log(value); // 永不被调用
});</pre>
</div>

&emsp;&emsp;在这个示例中，由于p2被拒绝了，因此完成处理程序永远不会被调用。不管怎样，还是可以添加一个拒绝处理程序

<div>
<pre>let p1 = new Promise(function(resolve, reject) {
    resolve(42);
});
let p2 = new Promise(function(resolve, reject) {
    reject(43);
});
p1.then(function(value) {
    // 第一个完成处理函数
    console.log(value); // 42
    return p2;
}).catch(function(value) {
    // 拒绝处理函数
    console.log(value); // 43
});</pre>
</div>

&emsp;&emsp;p2被拒绝后，拒绝处理程序被调用并传入p2的拒绝值43

&emsp;&emsp;在完成或拒绝处理程序中返回Thenable对象不会改变Promise执行器的执行时机，先定义的Promise的执行器先执行，后定义的后执行，以此类推。返回Thenable对象仅允许为这些promise结果定义额外的响应。在完成处理程序中创建新的Promise可以推迟完成处理程序的执行

<div>
<pre>let p1 = new Promise(function(resolve, reject) {
    resolve(42);
});
p1.then(function(value) {
    console.log(value); // 42
    // 创建一个新的 promise
    let p2 = new Promise(function(resolve, reject) {
        resolve(43);
    });
    return p2
}).then(function(value) {
    console.log(value); // 43
});</pre>
</div>

&emsp;&emsp;在此示例中，在p1的完成处理程序里创建了一个新的Promise，直到p2被完成才会执行第二个完成处理程序。如果想在一个Promise被解决后触发另个promise，那么这个模式会很有帮助

&nbsp;

### 响应多个

&emsp;&emsp;如果想通过监听多个Promise来决定下一步的操作，可以使用ES6提供的Promise.all()和Promise.race()这两个方法

【Promise.all()】

&emsp;&emsp;Promise.all()方法只接受一个参数并返回一个Promise，该参数是一个含有多个受监视Promise的可迭代对象(如一个数组)，只有当可迭代对象中所有Promise都被解决后返回的Promise才会被解决，只有当可迭代对象中所有Promise都被完成后返回的Promise才会被完成

<div>
<pre>let p1 = new Promise(function(resolve, reject) {
    resolve(42);
});
let p2 = new Promise(function(resolve, reject) {
    resolve(43);
});
let p3 = new Promise(function(resolve, reject) {
    resolve(44);
});
let p4 = Promise.all([p1, p2, p3]);
p4.then(function(value) {
    console.log(Array.isArray(value)); // true
    console.log(value[0]); // 42
    console.log(value[1]); // 43
    console.log(value[2]); // 44
});</pre>
</div>

&emsp;&emsp;在这段代码中，每个Promise解决时都传入一个数字，调用Promise.all()方法创建Promise p4，最终当Promise p1、p2和p3都处于完成状态后p4才被完成。传入p4完成处理程序的结果是一个包含每个解决值(42.43和44)的数组，这些值按照Promise被解决的顺序存储，所以可以根据每个结果来匹配对应的Promise

&emsp;&emsp;所有传入Promise.all()方法的Promise只要有一个被拒绝，那么返回的Promise没等所有Promise都完成就立即被拒绝

<div>
<pre>let p1 = new Promise(function(resolve, reject) {
    resolve(42);
});
let p2 = new Promise(function(resolve, reject) {
    reject(43);
});
let p3 = new Promise(function(resolve, reject) {
    resolve(44);
});
let p4 = Promise.all([p1, p2, p3]);
p4.catch(function(value) {
    console.log(Array.isArray(value)) // false
    console.log(value); // 43
});</pre>
</div>

&emsp;&emsp;在这个示例中，p2被拒绝并传入值43，没等p1或p3结束执行，p4的拒绝处理程序就立即被调用。(p1和p3的执行过程会结束，只是p4并未等待)

&emsp;&emsp;拒绝处理程序总是接受一个值而非数组，该值来自被拒绝Promise的拒绝值。在本示例中，传入拒绝处理程序的43表示该拒绝来自p2

【Promise.race()】

&emsp;&emsp;Promise.race()方法监听多个Promise的方法稍有不同：它也接受含多个受监视Promise的可迭代对象作为唯一参数并返回一个Promise，但只要有一个Promise被解决返回的Promise就被解决，无须等到所有Promise都被完成。一旦数组中的某个Promise被完成，Promise.race()方法也会像Promise.all()方法一样返回一个特定的Promise

<div>
<pre>let p1 = Promise.resolve(42);
let p2 = new Promise(function(resolve, reject) {
    resolve(43);
});
let p3 = new Promise(function(resolve, reject) {
    resolve(44);
});
let p4 = Promise.race([p1, p2, p3]);
p4.then(function(value) {
    console.log(value); // 42
});</pre>
</div>

&emsp;&emsp;在这段代码中，p1创建时便处于已完成状态，其他Promise用于编排任务。随后，p4的完成处理程序被调用并传入值42，其他Promise则被忽略。实际上，传给Promise.race()方法的Promise会进行竞选，以决出哪一个先被解决，如果先解决的是已完成Promise，则返回己完成Promise；如果先解决的是已拒绝Promise，则返回已拒绝Promise

<div>
<pre>let p1 = new Promise(function(resolve, reject) {
    resolve(42);
});
let p2 = Promise.reject(43);
let p3 = new Promise(function(resolve, reject) {
    resolve(44);
});
let p4 = Promise.race([p1, p2, p3]);
p4.catch(function(value) {
    console.log(value); // 43
});</pre>
</div>

&emsp;&emsp;此时，由于p2己处于被拒绝状态，因而当Promise.race()方法被调用时p4也被拒绝了，尽管p1和p3最终被完成，但由于是发生在p2被拒后，因此它们的结果被忽略掉

&nbsp;

### 继承

&emsp;&emsp;Promise与其他内建类型一样，也可以作为基类派生其他类，所以可以定义自己的Promise变量来扩展内建Promise的功能。例如，假设创建一个既支持then()方法和catch()方法又支持success()方法和failure()方法的Promise，则可以这样创建该Promise类型

<div>
<pre>class MyPromise extends Promise {
    // 使用默认构造器
    success(resolve, reject) {
        return this.then(resolve, reject);
}
    failure(reject) {
        return this.catch(reject);
    }
}
let promise = new MyPromise(function(resolve, reject) {
    resolve(42);
});
promise.success(function(value) {
    console.log(value); // 42
}).failure(function(value) {
    console.log(value);
});</pre>
</div>

&emsp;&emsp;在这个示例中，派生自Promise的MyPromise扩展了另外两个方法模仿resolve()的success()方法以及模仿reject()的failure()方法

&emsp;&emsp;这两个新增方法都通过this来调用它模仿的方法，派生Promise与内建Promise的功能一样，只不过多了success()和failure()这两个可以调用的方法

&emsp;&emsp;由于静态方法会被继承，因此派生的Promise也拥有MyPromise.resolve()、MyPromise.reject()、MyPromise.race()和MyPromise. all() 这 4 个方法，后二者与内建方法完全一致，而前二者却稍有不同

&emsp;&emsp;由于MyPromise.resolve()方法和MyPromise.reject()方法通过Symbol.species属性来决定返回Promise的类型，故调用这两个方法时无论传入什么值都会返回一个MyPromise的实例。如果将内建Promise作为参数传入其他方法，则这个Promise将被解决或拒绝，然后该方法将会返回一个新的MyPromise，于是就可以给它的成功处理程序及失败处理程序赋值

<div>
<pre>let p1 = new Promise(function(resolve, reject) {
    resolve(42);
});
let p2 = MyPromise.resolve(p1);
p2.success(function(value) {
    console.log(value); // 42
});
console.log(p2 instanceof MyPromise); // true</pre>
</div>

&emsp;&emsp;这里的p1是一个内建Promise，被传入MyPromise.resolve()方法后得到结果p2，它是MyPromise的一个实例，来自p1的解决值被传入完成处理程序

&emsp;&emsp;传入MyPromise.resolve()方法或MyPromise.reject()方法的MyPromise实例未经解决便直接返回。在其他方面，这两个方法的行为与Promise.resolve()和Promise.reject()很像

&nbsp;

### 异步

&emsp;&emsp;之前，介绍过生成器并展示了如何在异步任务执行中使用它

<div>
<pre>let fs = require("fs");
function run(taskDef) {
    // 创建迭代器，让它在别处可用
    let task = taskDef();
    // 开始任务
    let result = task.next();
    // 递归使用函数来保持对 next() 的调用
    function step() {
        // 如果还有更多要做的
        if (!result.done) {
            if (typeof result.value === "function") {
                result.value(function(err, data) {
                    if (err) {
                        result = task.throw(err);
                        return;
                    }
                    result = task.next(data);
                    step();
                });
            } else {
                result = task.next(result.value);
                step();
            }
        }
    }
    // 开始处理过程
    step();
}
// 定义一个函数来配合任务运行器使用
function readFile(filename) {
    return function(callback) {
        fs.readFile(filename, callback);
    };
}
// 运行一个任务
run(function*() {
    let contents = yield readFile("config.json");
    doSomethingWith(contents);
    console.log("Done");
});</pre>
</div>

&emsp;&emsp;这个实现会导致一些问题。首先，在返回值是函数的函数中包裹每一个函数会令人感到困惑，这句话本身也是如此；其次，无法区分用作任务执行器回调函数的返回值和一个不是回调函数的返回值

&emsp;&emsp;只要每个异步操作都返回Promise，就可以极大地简化并通用化这个过程。以Promise作为通用接口用于所有异步代码可以简化任务执行器

<div>
<pre>let fs = require("fs");
function run(taskDef) {
    // 创建迭代器
    let task = taskDef();
    // 启动任务
    let result = task.next();
    // 递归使用函数来进行迭代
    (function step() {
        // 如果还有更多要做的
        if (!result.done) {
            // 决议一个 Promise ，让任务处理变简单
            let promise = Promise.resolve(result.value);
            promise.then(function(value) {
                result = task.next(value);
                step();
            }).catch(function(error) {
                result = task.throw(error);
                step();
            });
        }
    }());
}
// 定义一个函数来配合任务运行器使用
function readFile(filename) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filename, function(err, contents) {
            if (err) {
                reject(err);
            } else {
                resolve(contents);
            }    
        });
    });
}
// 运行一个任务
run(function*() {
    let contents = yield readFile("config.json");
    doSomethingWith(contents);
    console.log("Done");
});</pre>
</div>

&emsp;&emsp;在这个版本的代码中，一个通用的run()函数执行生成器创建了一个迭代器，它调用task.next()方法来启动任务并递归调用step()方法直到迭代器完成

&emsp;&emsp;在step()函数中，如果有更多任务，那么result.done的值为false，此时的result.value应该是一个Promise，调用Promise.resolve()是为了防止函数不返回Promise。(传入Promise.resolve()的Promise直接通过，传入的非Promise会被包裹成一个Promise)接下来，添加完成处理程序提取Promise的值并将其传回迭代器。然后在step()函数调用自身之前结果会被赋值给下一个生成的结果

&emsp;&emsp;拒绝处理程序将所有拒绝结果存储到一个错误对象中，然后通过task.throw()方法将错误对象传回迭代器，如果在任务中捕获到错误，结果会被赋值给下一个生成结果。最后继续在catch()内部调用step()函数

&emsp;&emsp;这个run()函数可以运行所有使用yield实现异步代码的生成器，而且不会将Promise或回调函数暴露给开发者。事实上，由于函数调用的返回值总会被转换成一个Promise，因此可以返回一些非Promise的值，也就是说，用yield调用同步或异步方法都可以正常运行，永远不需要检查返回值是否为Promise

&emsp;&emsp;唯一需要关注的是像readFile()这样的异步函数，其返回的是一个能被正确识别状态的Promise，所以调用Node.js的内建方法时不能使用回调函数，须将其转换为返回Promise的函数

【未来的异步任务执行】

&emsp;&emsp;JS正在引入一种用于执行异步任务的更简单的语法，例如，await语法致力于替代基于Promise的示例。其基本思想是用async标记的函数代替生成器，用await代替yield来调用函数

<div>
<pre>(async function() {
    let contents = await readFile("config.json");
    doSomethingWith(contents);
    console.log("Done");
});</pre>
</div>

&emsp;&emsp;在函数前添加关键字async表示该函数以异步模式运行，await关键字表示调用readFile("config.json")的函数应该返回一个Promise，否则，响应应该被包裹在Promise中。如果Promise被拒绝则await应该抛出错误，否则通过Promise来返回值。最后的结果是，可以按照同步方式编写异步代码，唯一的开销是一个基于迭代器的状态机

