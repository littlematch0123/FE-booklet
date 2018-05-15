# Commonjs规范及Node模块实现

&emsp;&emsp;Node在实现中并非完全按照CommonJS规范实现，而是对模块规范进行了一定的取舍，同时也增加了少许自身需要的特性。本文将详细介绍NodeJS的模块实现

&nbsp;

### 引入

&emsp;&emsp;nodejs是区别于javascript的，在javascript中的顶层对象是window，而在node中的顶层对象是global

&emsp;&emsp;注意:实际上，javascript也存在global对象，只是其并不对外访问，而使用window对象指向global对象而已

&emsp;&emsp;在javascript中，通过var a = 100；是可以通过window.a来得到100的

![commonjs1](https://pic.xiaohuochai.site/blog/JS_modular_commonjs1.png)

&emsp;&emsp;但在nodejs中，是不能通过global.a来访问，得到的是undefined

![commonjs2](https://pic.xiaohuochai.site/blog/JS_modular_commonjs2.png)

&emsp;&emsp;这是因为var a = 100;这个语句中的变量a，只是模块范围内的变量a，而不是global对象下的a

&emsp;&emsp;在nodejs中，一个文件就是一个模块，每个模块都有自己的作用域。使用var来声明的一个变量，它并不是全局的，而是属于当前模块下

&emsp;&emsp;如果要在全局作用域下声明变量，则如下所示

![commonjs3](https://pic.xiaohuochai.site/blog/JS_modular_commonjs3.png)

&nbsp;

### 概述

&emsp;&emsp;Node中模块分为两类：一类是Node提供的模块，称为核心模块；另一类是用户编写的模块，称为文件模块

&emsp;&emsp;核心模块部分在Node源代码的编译过程中，编译进了二进制执行文件。在Node进程启动时，部分核心模块就被直接加载进内存中，所以这部分核心模块引入时，文件定位和编译执行这两个步骤可以省略掉，并且在路径分析中优先判断，所以它的加载速度是最快的

&emsp;&emsp;文件模块则是在运行时动态加载，需要完整的路径分析、文件定位、编译执行过程，速度比核心模块慢

&emsp;&emsp;接下来，我们展开详细的模块加载过程

&nbsp;

### 模块加载

&emsp;&emsp;在javascript中，加载模块使用script标签即可，而在nodejs中，如何在一个模块中，加载另一个模块呢？

&emsp;&emsp;使用require()方法来引入

![commonjs4](https://pic.xiaohuochai.site/blog/JS_modular_commonjs4.gif)

【缓存加载】

&emsp;&emsp;再展开介绍require()方法的标识符分析之前，需要知道，与前端浏览器会缓存静态脚本文件以提高性能一样，Node对引入过的模块都会进行缓存，以减少二次引入时的开销。不同的地方在于，浏览器仅仅缓存文件，而Node缓存的是编译和执行之后的对象

&emsp;&emsp;不论是核心模块还是文件模块，require()方法对相同模块的二次加载都一律采用缓存优先的方式，这是第一优先级的。不同之处在于核心模块的缓存检查先于文件模块的缓存检查

【标识符分析】

&emsp;&emsp;require()方法接受一个标识符作为参数。在Node实现中，正是基于这样一个标识符进行模块查找的。模块标识符在Node中主要分为以下几类：[1]核心模块，如http、fs、path等；[2].或..开始的相对路径文件模块；[3]以/开始的绝对路径文件模块；[4]非路径形式的文件模块，如自定义的connect模块

&emsp;&emsp;根据参数的不同格式，`require`命令去不同路径寻找模块文件

&emsp;&emsp;1、如果参数字符串以&ldquo;/&rdquo;开头，则表示加载的是一个位于绝对路径的模块文件。比如，`require('/home/marco/foo.js')`将加载`/home/marco/foo.js`

&emsp;&emsp;2、如果参数字符串以&ldquo;./&rdquo;开头，则表示加载的是一个位于相对路径（跟当前执行脚本的位置相比）的模块文件。比如，`require('./circle')`将加载当前脚本同一目录的`circle.js`

&emsp;&emsp;3、如果参数字符串不以&ldquo;./&ldquo;或&rdquo;/&ldquo;开头，则表示加载的是一个默认提供的核心模块（位于Node的系统安装目录中），或者一个位于各级node_modules目录的已安装模块（全局安装或局部安装）

&emsp;&emsp;注意:如果是当前路径下的文件模块，一定要以./开头，否则nodejs会试图去加载核心模块，或node_modules内的模块

<div>
<pre>//a.js
console.log('aaa');
//b.js
require('./a');//'aaa'
require('a');//报错</pre>
</div>

【文件扩展名分析】

&emsp;&emsp;require()在分析标识符的过程中，会出现标识符中不包含文件扩展名的情况。CommonJS模块规范也允许在标识符中不包含文件扩展名，这种情况下，Node会先查找是否存在没有后缀的该文件，如果没有，再按.js、.json、.node的次序补足扩展名，依次尝试

&emsp;&emsp;在尝试的过程中，需要调用fs模块同步阻塞式地判断文件是否存在。因为Node是单线程的，所以这里是一个会引起性能问题的地方。小诀窍是：如果是.node和.json文件，在传递给require()的标识符中带上扩展名，会加快一点速度。另一个诀窍是：同步配合缓存，可以大幅度缓解Node单线程中阻塞式调用的缺陷

【目录分析和包】

&emsp;&emsp;在分析标识符的过程中，require()通过分析文件扩展名之后，可能没有查找到对应文件，但却得到一个目录，这在引入自定义模块和逐个模块路径进行查找时经常会出现，此时Node会将目录当做一个包来处理

&emsp;&emsp;在这个过程中，Node对CommonJS包规范进行了一定程度的支持。首先，Node在当前目录下查找package.json(CommonJS包规范定义的包描述文件)，通过JSON.parse()解析出包描述对象，从中取出main属性指定的文件名进行定位。如果文件名缺少扩展名，将会进入扩展名分析的步骤

&emsp;&emsp;而如果main属性指定的文件名错误，或者压根没有package.json文件，Node会将index当做默认文件名，然后依次查找index.js、index.json、index.node

&emsp;&emsp;如果在目录分析的过程中没有定位成功任何文件，则自定义模块进入下一个模块路径进行查找。如果模块路径数组都被遍历完毕，依然没有查找到目标文件，则会抛出查找失败的异常

&nbsp;

### 访问变量

&emsp;&emsp;如何在一个模块中访问另外一个模块中定义的变量呢？

【global】

&emsp;&emsp;最容易想到的方法，把一个模块定义的变量复制到全局环境global中，然后另一个模块访问全局环境即可

<div>
<pre>//a.js
var a = 100;
global.a = a;

//b.js
require('./a');
console.log(global.a);//100</pre>
</div>

&emsp;&emsp;这种方法虽然简单，但由于会污染全局环境，不推荐使用

【module】

&emsp;&emsp;而常用的方法是使用nodejs提供的模块对象Module，该对象保存了当前模块相关的一些信息

<div>
<pre>function Module(id, parent) {
    this.id = id;
    this.exports = {};
    this.parent = parent;
    if (parent &amp;&amp; parent.children) {
        parent.children.push(this);
    }
    this.filename = null;
    this.loaded = false;
    this.children = [];
}</pre>
</div>
<div>
<pre>module.id 模块的识别符，通常是带有绝对路径的模块文件名。
module.filename 模块的文件名，带有绝对路径。
module.loaded 返回一个布尔值，表示模块是否已经完成加载。
module.parent 返回一个对象，表示调用该模块的模块。
module.children 返回一个数组，表示该模块要用到的其他模块。
module.exports 表示模块对外输出的值。</pre>
</div>

![commonjs5](https://pic.xiaohuochai.site/blog/JS_modular_commonjs5.png)

【exports】

&emsp;&emsp;`module.exports`属性表示当前模块对外输出的接口，其他文件加载该模块，实际上就是读取`module.exports`变量

<div>
<pre>//a.js
var a = 100;
module.exports.a = a;

//b.js
var result = require('./a');
console.log(result);//'{ a: 100 }'</pre>
</div>

&emsp;&emsp;为了方便，Node为每个模块提供一个exports变量，指向module.exports。造成的结果是，在对外输出模块接口时，可以向exports对象添加方法

<div>
<pre>console.log(module.exports === exports);//true</pre>
</div>

&emsp;&emsp;注意:不能直接将exports变量指向一个值，因为这样等于切断了`exports`与`module.exports`的联系

&nbsp;

### 模块编译

&emsp;&emsp;编译和执行是模块实现的最后一个阶段。定位到具体的文件后，Node会新建一个模块对象，然后根据路径载入并编译。对于不同的文件扩展名，其载入方法也有所不同，具体如下所示

&emsp;&emsp;js文件&mdash;&mdash;通过fs模块同步读取文件后编译执行

&emsp;&emsp;node文件&mdash;&mdash;这是用C/C++编写的扩展文件，通过dlopen()方法加载最后编译生成的文件

&emsp;&emsp;json文件&mdash;&mdash;通过fs模块同步读取文件后，用JSON.parse()解析返回结果

&emsp;&emsp;其余扩展名文件&mdash;&mdash;它们都被当做.js文件载入

&emsp;&emsp;每一个编译成功的模块都会将其文件路径作为索引缓存在Module._cache对象上，以提高二次引入的性能

&emsp;&emsp;根据不同的文件扩展名，Node会调用不同的读取方式，如.json文件的调用如下：

<div>
<pre>// Native extension for .json
Module._extensions['.json'] = function(module, filename) {
    var content = NativeModule.require('fs').readFileSync(filename, 'utf8'); 
    try {
        module.exports = JSON.parse(stripBOM(content));
    } catch (err) {
        err.message = filename + ': ' + err.message;
        throw err;
    }
};</pre>
</div>

&emsp;&emsp;其中，Module._extensions会被赋值给require()的extensions属性，所以通过在代码中访问require.extensions可以知道系统中已有的扩展加载方式。编写如下代码测试一下：

<div>
<pre>console.log(require.extensions);</pre>
</div>

&emsp;&emsp;得到的执行结果如下：

<div>
<pre>{ '.js': [Function], '.json': [Function], '.node': [Function] }</pre>
</div>

&emsp;&emsp;在确定文件的扩展名之后，Node将调用具体的编译方式来将文件执行后返回给调用者

【JavaScript模块的编译】

&emsp;&emsp;回到CommonJS模块规范，我们知道每个模块文件中存在着require、exports、module这3个变量，但是它们在模块文件中并没有定义，那么从何而来呢？甚至在Node的API文档中，我们知道每个模块中还有filename、dirname这两个变量的存在，它们又是从何而来的呢？如果我们把直接定义模块的过程放诸在浏览器端，会存在污染全局变量的情况

&emsp;&emsp;事实上，在编译的过程中，Node对获取的JavaScript文件内容进行了头尾包装。在头部添加了(function(exports, require, module, filename, dirname) {\n，在尾部添加了\n});

&emsp;&emsp;一个正常的JavaScript文件会被包装成如下的样子

<div>
<pre>(function (exports, require, module,  filename,  dirname) {
    var math = require('math');
    exports.area = function (radius) {
        return Math.PI * radius * radius;
    };
});</pre>
</div>

&emsp;&emsp;这样每个模块文件之间都进行了作用域隔离。包装之后的代码会通过vm原生模块的runInThisContext()方法执行(类似eval，只是具有明确上下文，不污染全局)，返回一个具体的function对象。最后，将当前模块对象的exports属性、require()方法、module(模块对象自身)，以及在文件定位中得到的完整文件路径和文件目录作为参数传递给这个function()执行

&emsp;&emsp;这就是这些变量并没有定义在每个模块文件中却存在的原因。在执行之后，模块的exports属性被返回给了调用方。exports属性上的任何方法和属性都可以被外部调用到，但是模块中的其余变量或属性则不可直接被调用

&emsp;&emsp;至此，require、exports、module的流程已经完整，这就是Node对CommonJS模块规范的实现

【C/C++模块的编译】

&emsp;&emsp;Node调用process.dlopen()方法进行加载和执行。在Node的架构下，dlopen()方法在Windows和*nix平台下分别有不同的实现，通过libuv兼容层进行了封装

&emsp;&emsp;实际上，.node的模块文件并不需要编译，因为它是编写C/C++模块之后编译生成的，所以这里只有加载和执行的过程。在执行的过程中，模块的exports对象与.node模块产生联系，然后返回给调用者

&emsp;&emsp;C/C++模块给Node使用者带来的优势主要是执行效率方面的，劣势则是C/C++模块的编写门槛比JavaScript高

【JSON文件的编译】

&emsp;&emsp;.json文件的编译是3种编译方式中最简单的。Node利用fs模块同步读取JSON文件的内容之后，调用JSON.parse()方法得到对象，然后将它赋给模块对象的exports，以供外部调用

&emsp;&emsp;JSON文件在用作项目的配置文件时比较有用。如果你定义了一个JSON文件作为配置，那就不必调用fs模块去异步读取和解析，直接调用require()引入即可。此外，你还可以享受到模块缓存的便利，并且二次引入时也没有性能影响

&nbsp;

### CommonJS

&emsp;&emsp;在介绍完Node的模块实现之后，回过头来再学习下CommonJS规范，相对容易理解

&emsp;&emsp;CommonJS规范的提出，主要是为了弥补当前javascript没有标准的缺陷，使其具备开发大型应用的基础能力，而不是停留在小脚本程序的阶段

&emsp;&emsp;CommonJS对模块的定义十分简单，主要分为模块引用、模块定义和模块标识3个部分

【模块引用】

<div>
<pre>var math = require('math');</pre>
</div>

&emsp;&emsp;在CommonJS规范中，存在require()方法，这个方法接受模块标识，以此引入一个模块的API到当前上下文中

【模块定义】

&emsp;&emsp;在模块中，上下文提供require()方法来引入外部模块。对应引入的功能，上下文提供了exports对象用于导出当前模块的方法或者变量，并且它是唯一导出的出口。在模块中，还存在一个module对象，它代表模块自身，而exports是module的属性。在Node中，一个文件就是一个模块，将方法挂载在exports对象上作为属性即可定义导出的方式：

<div>
<pre>// math.js
exports.add = function () {
    var sum = 0, i = 0,args = arguments, l = args.length;
    while (i &lt; l) {
        sum += args[i++];
    }
    return sum;
};</pre>
</div>

&emsp;&emsp;在另一个文件中，我们通过require()方法引入模块后，就能调用定义的属性或方法了

<div>
<pre>// program.js
var math = require('math');
exports.increment = function (val) {
    return math.add(val, 1);
};</pre>
</div>

【模块标识】

&emsp;&emsp;模块标识其实就是传递给require()方法的参数，它必须是符合小驼峰命名的字符串，或者以.、..开头的相对路径，或者绝对路径。它可以没有文件名后缀.js

&emsp;&emsp;模块的定义十分简单，接口也十分简洁。它的意义在于将类聚的方法和变量等限定在私有的作用域中，同时支持引入和导出功能以顺畅地连接上下游依赖。每个模块具有独立的空间，它们互不干扰，在引用时也显得干净利落

