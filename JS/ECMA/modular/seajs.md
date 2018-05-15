# CMD和seaJS

&emsp;&emsp;CMD(`Common Module Definition)`表示通用模块定义，该规范是国内发展出来的，由阿里的玉伯提出。就像AMD有个[requireJS](http://www.cnblogs.com/xiaohuochai/p/6847942.html)，CMD有个浏览器的实现SeaJS，SeaJS和requireJS一样，都是javascript的模块化解决方案。本文将详细介绍CMD和seaJS

&nbsp;

### CMD

&emsp;&emsp;在Sea.js中，所有JavaScript模块都遵循CMD（[Common Module Definition](https://github.com/cmdjs/specification/blob/master/draft/module.md)）模块定义规范。该规范明确了模块的基本书写格式和基本交互规则


&emsp;&emsp;[AMD规范](http://www.cnblogs.com/xiaohuochai/p/6847942.html#anchor1)简单到只有一个API，即define函数

<div>
<pre>define([module-name?], [array-of-dependencies?], [module-factory-or-object]);</pre>
</div>

&emsp;&emsp;module-name: 模块标识，可以省略

&emsp;&emsp;array-of-dependencies: 所依赖的模块，可以省略

&emsp;&emsp;module-factory-or-object: 模块的实现，或者一个JavaScript对象

&emsp;&emsp;CMD规范也与之类似，只不过第三个参数factory的实现方式不同。在CMD规范中，一个模块就是一个文件。代码的书写格式如下

<div>
<pre>define(id?, deps?, factory)</pre>
</div>

&emsp;&emsp;与AMD规范类似，define是一个全局函数，用来定义模块。字符串&nbsp;`id`&nbsp;表示模块标识，数组&nbsp;`deps`&nbsp;是模块依赖。这两个参数可以省略，通常由构建工具自动生成

&emsp;&emsp;通常地，define()方法的第三个参数factory是一个函数，表示是模块的构造方法。执行该构造方法，可以得到模块向外提供的接口。`factory`&nbsp;方法在执行时，默认会传入三个参数：`require`、`exports`&nbsp;和&nbsp;`module`

&emsp;&emsp;注意:factory()方法的参数如果不需要，可以省略，但不可以修改，如修改为'a'、'b'、'c'，也不可以改变其参数的顺序。在函数内部，也不能对参数名重新赋值，如'var a = require; '

<div>
<pre>define(function(require, exports, module) {
  // 模块代码
});</pre>
</div>

【require】

&emsp;&emsp;`require`&nbsp;是&nbsp;`factory`&nbsp;函数的第一个参数。`require`&nbsp;是一个方法，接受&nbsp;[模块标识](https://github.com/seajs/seajs/issues/258)&nbsp;作为唯一参数，用来获取其他模块提供的接口。通俗地说，通过require()方法来调用其他模块的属性或方法

<div>
<pre>define(function(require, exports, module) {
  // 获取模块 a 的接口
  var a = require('./a');
  // 调用模块 a 的方法
  a.doSomething();
});</pre>
</div>

&emsp;&emsp;这个require()方法的实现和功能都特别类似于[CommonJS](http://www.cnblogs.com/xiaohuochai/p/6847939.html#anchor6)中的require()方法。或许，有人会有疑惑，require()不是一个同步方法吗？在CommonJS中是的，在seaJS中也可以这么说，但并不完整。更合理的说法应该是，模块内的同步加载，实际表现为对模块a进行预下载

&emsp;&emsp;例如下面的代码，即使不点击页面，a.js也会预先下载。点击页面后，控制台依次输出'a'和'a.test'

<div>
<pre>// main.js
define(function(require, exports, module){
    document.onclick = function(){
        var a = require('js/a');
        a.test();
    }    
});
define(function(require, exports, module){
    console.log('a');
    exports.test = function(){
        console.log('a.test');
    }
})</pre>
</div>

&emsp;&emsp;能不能执行时再下载呢？类似于懒加载。有的，使用require.async()方法。`require.async`&nbsp;方法用来在模块内部异步加载模块，并在加载完成后执行指定回调

<div>
<pre>// main.js
define(function(require, exports, module){
    document.onclick = function(){
        require.async('./a',function(a){
            a.test();
        });
    }    
});
//a.js
define(function(require, exports, module){
    console.log('a');
    exports.test = function(){
        console.log('a.test');
    }
})</pre>
</div>

【exports】

&emsp;&emsp;`exports`&nbsp;是一个对象，用来向外提供模块接口。与CommonJS的exports功能类似

<div>
<pre>define(function(require, exports) {
  // 对外提供 foo 属性
  exports.foo = 'bar';
  // 对外提供 doSomething 方法
  exports.doSomething = function() {};
});</pre>
</div>

&emsp;&emsp;除了给&nbsp;`exports`&nbsp;对象增加成员，还可以使用&nbsp;`return`&nbsp;直接向外提供接口，这种方式与requireJS的方式类似

<div>
<pre>define(function(require) {
  // 通过 return 直接提供接口
  return {
    foo: 'bar',
    doSomething: function() {}
  };
});</pre>
</div>

&emsp;&emsp;如果&nbsp;`return`&nbsp;语句是模块中的唯一代码，还可简化为

<div>
<pre>define({
  foo: 'bar',
  doSomething: function() {}
});</pre>
</div>

【module】

&emsp;&emsp;`module`&nbsp;是一个对象，上面存储了与当前模块相关联的一些属性和方法

<div>
<pre>// main.js
define(['./a'],function(require, exports, module){
    console.log(module);
})</pre>
</div>

![seajs1](https://pic.xiaohuochai.site/blog/JS_modular_seajs1.png)

&emsp;&emsp;module.uri表示根据模块系统的路径解析规则得到的模块绝对路径

&emsp;&emsp;module.id是模块的唯一标识，一般情况下没有在define中手写id参数时，module.id的值就是module.uri，两者完全相同

&emsp;&emsp;module.dependencies是一个数组，表示当前模块的依赖

&emsp;&emsp;module.exports是当前模块对外提供的接口。传给factory构造方法的exports参数是module.exports对象的一个引用。只通过exports参数来提供接口，有时无法满足开发者的所有需求。 比如当模块的接口是某个类的实例时，需要通过module.exports来实现

&emsp;&emsp;注意:对`module.exports`的赋值需要同步执行，不能放在回调函数里。下面这样是不行的

<div>
<pre>define(function(require, exports, module) {
  // 错误用法
  setTimeout(function() {
    module.exports = { a: "hello" };
  }, 0);
});</pre>
</div>

&nbsp;

### 入口

&emsp;&emsp;requireJS通过data-main来设置入口，而seaJS则通过sea.use()来设置。sea.js 在下载完成后，会自动加载入口模块

<div>
<pre>seajs.use(id, callback?)</pre>
</div>

&emsp;&emsp;注意:`callback`参数可选，省略时，表示无需回调

<div>
<pre>&lt;script src="sea.js"&gt;&lt;/script&gt;
&lt;script&gt;
  seajs.use('js/main');
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;加载单个依赖，运行以下代码后，控制台输出'test'

<div>
<pre>//index.html
&lt;script src="sea.js"&gt;&lt;/script&gt;
&lt;script&gt;
    seajs.config({
        base: 'js'
    });
    seajs.use("main",function(a){
        a.test();
    });
&lt;/script&gt;
// main.js
define(['./a'],function(require, exports, module){
    return {
        test : function(){
            console.log('test');
        }
    }
})</pre>
</div>

&emsp;&emsp;加载多个依赖

<div>
<pre>//并发加载模块 a 和模块 b，并在都加载完成时，执行指定回调
seajs.use(['./a', './b'], function(a, b) {
  a.init();
  b.init();
});</pre>
</div>

【DOMReady】

&emsp;&emsp;`seajs.use`与`DOM ready`事件没有任何关系。如果某些操作要确保在`DOM ready`后执行，需要使用`jquery`等类库来保证

<div>
<pre>seajs.use(['jquery', './main'], function($, main) {
  $(document).ready(function() {
    main.init();
  });
});</pre>
</div>

【打包】

&emsp;&emsp;引入&nbsp;`sea.js`&nbsp;时，可以把&nbsp;`sea.js`&nbsp;与其他文件打包在一起，可提前合并好，或利用 combo 服务动态合并。无论哪一种方式，为了让&nbsp;`sea.js`&nbsp;内部能快速获取到自身路径，推荐手动加上&nbsp;`id`&nbsp;属性

<div>
<pre>&lt;script src="path/to/sea.js" id="seajsnode"&gt;&lt;/script&gt;</pre>
</div>

&emsp;&emsp;加上&nbsp;`seajsnode`&nbsp;值，可以让&nbsp;`sea.js`&nbsp;直接获取到自身路径，而不需要通过其他机制去自动获取。这对性能和稳定性会有一定提升，推荐默认都加上

&nbsp;

### 配置

【路径】

&emsp;&emsp;如果不配置路径，在requireJS中，默认路径是data-main的所处目录，比如data-main='js/main'，则所处路径是'js'目录下

&emsp;&emsp;而seaJS则不同，它的默认路径是seaJS文件的所处目录，比如seaJS文件所处路径是'demo'目录下，进行如下入口设置后

<div>
<pre>seajs.use('js/main');</pre>
</div>

&emsp;&emsp;说明main.js的目录为'demo/js/main.js'。如果main.js依赖于a.js，且a.js与main.js处于同一目录下，则以下两种写法都正确

&emsp;&emsp;1、'demo' + 'js/a' = 'demo/js/a.js'

<div>
<pre>// main.js
define(['js/a'],function(require, exports, module){

})</pre>
</div>

&emsp;&emsp;2、'./'表示当前目录，即'demo/js'，所以 './a' = 'demo/js/a.js'

<div>
<pre>// main.js
define(['./a'],function(require, exports, module){

})</pre>
</div>

&emsp;&emsp;在requireJS中使用baseUrl来配置基础路径，而在seaJS中使用base。进行如下配置后，真实路径为 'demo' + 'js' + 'main' = 'demo/js/main.js'

<div>
<pre>&lt;script src="sea.js"&gt;&lt;/script&gt;
&lt;script&gt;
    seajs.config({
        base: 'js'
    });
    seajs.use("main");
&lt;/script&gt;</pre>
</div>

【别名】

&emsp;&emsp;当模块标识很长时，可以使用&nbsp;`alias`&nbsp;来简化

<div>
<pre>seajs.config({
  alias: {
    'jquery': 'jquery/jquery/1.10.1/jquery',
    'app/biz': 'http://path/to/app/biz.js',
  }
});</pre>
</div>

【目录】

&emsp;&emsp;当目录比较深，或需要跨目录调用模块时，可以使用&nbsp;`paths`&nbsp;来简化书写

<div>
<pre>seajs.config({
  paths: {
    'gallery': 'https://a.alipayobjects.com/gallery',
    'app': 'path/to/app',
  }
});</pre>
</div>

&nbsp;

### 与AMD区别

&emsp;&emsp;AMD 是 RequireJS 在推广过程中对模块定义的规范化产出，CMD 是 SeaJS 在推广过程中对模块定义的规范化产出。这些规范的实现都能达成浏览器端模块化开发的目的

&emsp;&emsp;AMD与CMD主要有以下两点区别

&emsp;&emsp;1、所依赖模块的执行时机

&emsp;&emsp;对于依赖的模块，AMD是提前执行，CMD是延迟执行

&emsp;&emsp;AMD在加载模块完成后就会执行该模块，所有模块都加载执行完后会进入require的回调函数，执行主逻辑，这样的效果就是依赖模块的执行顺序和书写顺序不一定一致，看网络速度，哪个先下载下来，哪个先执行，但是主逻辑一定在所有依赖加载完成后才执行。不过，新版本的RequireJS也可以延迟执行

&emsp;&emsp;CMD加载完某个依赖模块后并不执行，只是下载而已，在所有依赖模块加载完成后进入主逻辑，遇到require语句的时候才执行对应的模块，这样模块的执行顺序和书写顺序是完全一致的。如果使用require.async()方法，可以实现模块的懒加载，即不执行不下载

&emsp;&emsp;2、CMD推崇依赖就近，AMD推崇依赖前置

<div>
<pre>// CMD
define(function(require, exports, module) { 
    var a = require('./a')
     a.doSomething()  
    // 此处略去 100 行   
    var b = require('./b') // 依赖可以就近书写  
    b.doSomething()   
    // ... 
})</pre>
</div>
<div>
<pre>// AMD
define(['./a', './b'], function(a, b) {  // 依赖必须一开始就写好
    a.doSomething()    
    // 此处略去 100 行    
    b.doSomething()    
    ...
})</pre>
</div>

&emsp;&emsp;当然，AMD也支持CMD的写法，同时还支持将require作为依赖项传递

&nbsp;

## 最后

&emsp;&emsp;[CommonJS](http://www.cnblogs.com/xiaohuochai/p/6847939.html)、[requireJS](http://www.cnblogs.com/xiaohuochai/p/6847942.html)、[seaJS](http://www.cnblogs.com/xiaohuochai/p/6879432.html)这三种模块化方案，并没有高低之分。随着各个方案的不断升级，语言方面相互借鉴，使用差异逐渐变小。以上三种库级别的模块化方案，需要引入额外的库，且所遵循的规范并不是标准组织制定的，权威性不足

&emsp;&emsp;随着ES6在语言层面上开始支持模块化，ES6的模块化写法才是未来的模块化标准

