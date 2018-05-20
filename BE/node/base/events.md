# nodeJS中的事件机制

&emsp;&emsp;events模块是node的核心模块，几乎所有常用的node模块都继承了events模块，比如http、fs等。本文将详细介绍nodeJS中的事件机制

&nbsp;

### EventEmitter

&emsp;&emsp;多数 Node.js 核心 API 都是采用惯用的异步事件驱动架构，其中某些类型的对象（称为触发器）会周期性地触发命名事件来调用函数对象（监听器）。例如，一个net.Server对象会在每次有新连接时触发一个事件；一个fs.ReadStream 会在文件被打开时触发一个事件；一个stream会在数据可读时触发事件。

【EventEmitter】

&emsp;&emsp;EventEmitter 类由 events 模块定义和开放的，所有能触发事件的对象都是 EventEmitter 类的实例

<div>
<pre>var EventEmitter = require('events');
/*
{ [Function: EventEmitter]
  EventEmitter: [Circular],
  usingDomains: false,
  defaultMaxListeners: [Getter/Setter],
  init: [Function],
  listenerCount: [Function] }
 */
console.log(EventEmitter);</pre>
</div>

&emsp;&emsp;events模块的EventEmitter属性指向该模块本身

<div>
<pre>var events = require('events');
console.log(events.EventEmitter === events);//true</pre>
</div>

&emsp;&emsp;EventEmitter是一个构造函数，可以用来生成事件发生器的实例emitter

<div>
<pre>var EventEmitter = require('events');
var emitter = new EventEmitter();
/*
EventEmitter {
  domain: null,
  _events: {},
  _eventsCount: 0,
  _maxListeners: undefined }
 */
console.log(emitter);</pre>
</div>

&nbsp;

### 方法

【emitter.emit(eventName[, ...args])】

<div>
<pre>eventName &lt;any&gt;
...args &lt;any&gt;</pre>
</div>

&emsp;&emsp;该方法按监听器的注册顺序，同步地调用每个注册到名为eventName事件的监听器，并传入提供的参数。如果事件有监听器，则返回true，否则返回false

<div>
<pre>var EventEmitter = require('events');
var emitter = new EventEmitter();
emitter.on('test1',function(){});
console.log(emitter.emit('test1'));//true
console.log(emitter.emit('test2'));//false</pre>
</div>

【emitter.on(eventName, listener)】

&emsp;&emsp;该方法用于添加listener函数到名为eventName的事件的监听器数组的末尾

<div>
<pre>eventName &lt;any&gt; 事件名
listener &lt;Function&gt; 回调函数</pre>
</div>

&emsp;&emsp;注意：不会检查listener是否已被添加。多次调用并传入相同的eventName和listener会导致listener被添加与调用多次

<div>
<pre>var EventEmitter = require('events');
var emitter = new EventEmitter();
emitter.on('test',function(){
    console.log(1);
});
emitter.on('test',function(){
    console.log(2);
});
emitter.emit('test');//1 2</pre>
</div>

&emsp;&emsp;该方法返回一个 EventEmitter 引用，可以链式调用

<div>
<pre>var EventEmitter = require('events');
var emitter = new EventEmitter();
emitter.on('test',function(){
    console.log(1);
}).on('test',function(){
    console.log(2);
});
emitter.emit('test');//1 2</pre>
</div>

【emitter.addListener(eventName, listener)】

&emsp;&emsp;emitter.on(eventName, listener) 的别名

<div>
<pre>var EventEmitter = require('events');
var emitter = new EventEmitter();
emitter.addListener('test',function(){
    console.log(1);
});
emitter.emit('test');//1</pre>
</div>

【emitter.prependListener()】

&emsp;&emsp;与on()方法不同，prependListener()方法可用于将事件监听器添加到监听器数组的开头

<div>
<pre>var EventEmitter = require('events');
var emitter = new EventEmitter();
emitter.on('test',function(){
    console.log(1);
}).prependListener('test',function(){
    console.log(2);
});
emitter.emit('test');//2 1</pre>
</div>

【emitter.once(eventName, listener)】

&emsp;&emsp;该方法添加一个单次 listener 函数到名为 eventName 的事件。 下次触发 eventName 事件时，监听器会被移除，然后调用

<div>
<pre>eventName &lt;any&gt; 事件名
listener &lt;Function&gt; 回调函数</pre>
</div>
<div>
<pre>var EventEmitter = require('events');
var emitter = new EventEmitter();
emitter.on('test',function(){
    console.log(1);
}).once('test',function(){
    console.log(2);
});
emitter.emit('test');//1 2
emitter.emit('test');//1</pre>
</div>

【emitter.prependOnceListener()&nbsp;】

&emsp;&emsp;该方法用于将事件监听器添加到监听器数组开头。下次触发eventName事件时，监听器会被移除，然后调用

<div>
<pre>var EventEmitter = require('events');
var emitter = new EventEmitter();
emitter.on('test',function(){
    console.log(1);
}).prependOnceListener('test',function(){
    console.log(2);
});
emitter.emit('test');//2 1
emitter.emit('test');//1</pre>
</div>

【emitter.removeAllListeners([eventName])】

<div>
<pre>eventName &lt;any&gt;</pre>
</div>

&emsp;&emsp;移除全部或指定 eventName 的监听器，返回一个 EventEmitter 引用，可以链式调用

&emsp;&emsp;注意：在代码中移除其他地方添加的监听器是一个不好的做法，尤其是当 EventEmitter 实例是其他组件或模块（如 socket 或文件流）创建的

<div>
<pre>var EventEmitter = require('events');
var emitter = new EventEmitter();
emitter.on('test',function(){
    console.log(1);
}).removeAllListeners('test');
emitter.emit('test');//''</pre>
</div>

【emitter.removeListener(eventName, listener)】

<div>
<pre>eventName &lt;any&gt;
listener &lt;Function&gt;</pre>
</div>

&emsp;&emsp;从名为 eventName 的事件的监听器数组中移除指定的 listener

<div>
<pre>var EventEmitter = require('events');
var emitter = new EventEmitter();
function show(){
    console.log(1);
}
emitter.on('test',show).removeListener('test',show);
emitter.emit('test');//''</pre>
</div>

&emsp;&emsp;注意：removeListener最多只会从监听器数组里移除一个监听器实例。如果任何单一的监听器被多次添加到指定eventName的监听器数组中，则必须多次调用removeListener才能移除每个实例

<div>
<pre>var EventEmitter = require('events');
var emitter = new EventEmitter();
function show(){
    console.log(1);
}
emitter.on('test',show).on('test',show).removeListener('test',show);
emitter.emit('test');//'1'</pre>
</div>

&emsp;&emsp;注意：一旦一个事件被触发，所有绑定到它的监听器都会按顺序依次触发。这意味着，在事件触发后、最后一个监听器完成执行前，任何 removeListener() 或 removeAllListeners() 调用都不会从 emit() 中移除它们。 随后的事件会像预期的那样发生

&emsp;&emsp;因为监听器是使用内部数组进行管理的，所以调用它会改变在监听器被移除后注册的任何监听器的位置索引。 虽然这不会影响监听器的调用顺序，但意味着由 emitter.listeners() 方法返回的监听器数组副本需要被重新创建

<div>
<pre>var EventEmitter = require('events');
var emitter = new EventEmitter();
function show1(){
    console.log(1);
    emitter.removeListener('test',show2);
}
function show2(){
    console.log(2);
}
emitter.on('test',show1).on('test',show2);
emitter.emit('test');//1 2
emitter.emit('test');//1</pre>
</div>

&nbsp;

### 设置

【emitter.eventNames()】

&emsp;&emsp;返回一个列出触发器已注册监听器的事件的数组。 数组中的值为字符串或符号

<div>
<pre>var EventEmitter = require('events');
var emitter = new EventEmitter();
emitter.addListener('test1',function(){console.log(1);});
emitter.addListener('test2',function(){console.log(2);});
console.log(emitter.eventNames());//[ 'test1', 'test2' ]</pre>
</div>

【emitter.listenerCount(eventName)】

<div>
<pre>eventName &lt;any&gt; 正在被监听的事件名</pre>
</div>

&emsp;&emsp;返回正在监听名为 eventName 的事件的监听器的数量

<div>
<pre>var EventEmitter = require('events');
var emitter = new EventEmitter();
emitter.addListener('test',function(){console.log(1);});
emitter.addListener('test',function(){console.log(1);});
console.log(emitter.listenerCount('test'));//2</pre>
</div>

【emitter.listeners(eventName)】

<div>
<pre>eventName &lt;any&gt;</pre>
</div>

&emsp;&emsp;返回名为 eventName 的事件的监听器数组的副本

<div>
<pre>var EventEmitter = require('events');
var emitter = new EventEmitter();
emitter.addListener('test',function(){console.log(1);});
emitter.addListener('test',function(){console.log(2);});
console.log(emitter.listeners('test'));//[ [Function], [Function] ]
emitter.listeners('test')[0]();//1</pre>
</div>

【emitter.getMaxListeners()】

&emsp;&emsp;返回 EventEmitter 当前的最大监听器限制值

<div>
<pre>var EventEmitter = require('events');
var emitter = new EventEmitter();
console.log(emitter.getMaxListeners());//10</pre>
</div>

【emitter.setMaxListeners(n)】

&emsp;&emsp;默认情况下，如果为特定事件添加了超过 10 个监听器，则 EventEmitter 会打印一个警告。 此限制有助于寻找内存泄露。 但是，并不是所有的事件都要被限为 10 个。 emitter.setMaxListeners() 方法允许修改指定的 EventEmitter 实例的限制。 值设为 Infinity（或 0）表明不限制监听器的数量。返回一个 EventEmitter 引用，可以链式调用

<div>
<pre>var EventEmitter = require('events');
var emitter = new EventEmitter();
emitter.on('a',function(){}).on('a',function(){}).on('a',function(){}).on('a',function(){}).on('a',function(){}).on('a',function(){}).on('a',function(){}).on('a',function(){}).on('a',function(){}).on('a',function(){}).on('a',function(){});
/*
Warning: Possible EventEmitter memory leak detected. 11 a listeners added. Use emitter.setMaxListeners() to increase limit
 */</pre>
</div>
<div>
<pre>var EventEmitter = require('events');
var emitter = new EventEmitter();
emitter.setMaxListeners(11);
emitter.on('a',function(){}).on('a',function(){}).on('a',function(){}).on('a',function(){}).on('a',function(){}).on('a',function(){}).on('a',function(){}).on('a',function(){}).on('a',function(){}).on('a',function(){}).on('a',function(){});</pre>
</div>

【EventEmitter.defaultMaxListeners】

&emsp;&emsp;每个事件默认可以注册最多10个监听器。单个EventEmitter实例的限制可以使用emitter.setMaxListeners(n)方法改变。所有EventEmitter实例的默认值可以使用EventEmitter.defaultMaxListeners属性改变

&emsp;&emsp;注意：设置 EventEmitter.defaultMaxListeners 要谨慎，因为会影响所有EventEmitter 实例，包括之前创建的。因而，调用 emitter.setMaxListeners(n) 优先于 EventEmitter.defaultMaxListeners

<div>
<pre>var EventEmitter = require('events');
var emitter = new EventEmitter();
EventEmitter.defaultMaxListeners = 11;
emitter.on('a',function(){}).on('a',function(){}).on('a',function(){}).on('a',function(){}).on('a',function(){}).on('a',function(){}).on('a',function(){}).on('a',function(){}).on('a',function(){}).on('a',function(){}).on('a',function(){});</pre>
</div>

&nbsp;

### 事件

【'newListener' 事件】

<div>
<pre>eventName &lt;any&gt; 要监听的事件的名称
listener &lt;Function&gt; 事件的句柄函数</pre>
</div>

&emsp;&emsp;EventEmitter 实例会在一个监听器被添加到其内部监听器数组之前触发自身的 'newListener' 事件

&emsp;&emsp;注册了 'newListener' 事件的监听器会传入事件名与被添加的监听器的引用。事实上，在添加监听器之前触发事件有一个微妙但重要的副作用： 'newListener' 回调中任何额外的被注册到相同名称的监听器会在监听器被添加之前被插入&nbsp;

<div>
<pre>var EventEmitter = require('events');
var emitter = new EventEmitter();
emitter.on('newListener',function(){
    console.log(2);
})
emitter.on('test',function(){
    console.log(1);
})

emitter.emit('test');//2 1</pre>
</div>
<div>
<pre>var EventEmitter = require('events');
var emitter = new EventEmitter();
emitter.on('test',function(){
    console.log(1);
})
emitter.on('newListener',function(){
    console.log(2);
})
emitter.emit('test');//1</pre>
</div>

【'removeListener' 事件】

<div>
<pre>eventName &lt;any&gt; 事件名
listener &lt;Function&gt; 事件句柄函数</pre>
</div>

&emsp;&emsp;'removeListener' 事件在 listener 被移除后触发

<div>
<pre>var EventEmitter = require('events');
var emitter = new EventEmitter();
function show(){
    console.log(1);
}
emitter.on('removeListener',function(){
    console.log(2);//2
})
emitter.on('test',show).removeListener('test',show);</pre>
</div>
<div>
<pre>var EventEmitter = require('events');
var emitter = new EventEmitter();
function show(){
    console.log(1);
}
emitter.on('test',show).removeListener('test',show);
emitter.on('removeListener',function(){
    console.log(2);//''
})</pre>
</div>
<div>
<pre>var EventEmitter = require('events');
var emitter = new EventEmitter();
function show(){
    console.log(1);
}
emitter.removeListener('test',show);
emitter.on('removeListener',function(){
    console.log(2);//''
})</pre>
</div>

