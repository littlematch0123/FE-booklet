# AMD及requireJS

&emsp;&emsp;由[CommonJS](http://www.cnblogs.com/xiaohuochai/p/6847939.html)组织提出了许多新的JavaScript架构方案和标准，希望能为前端开发提供统一的指引。AMD规范就是其中比较著名一个，全称是Asynchronous Module Definition，即异步模块加载机制，完整描述了模块的定义，依赖关系，引用关系以及加载机制。而AMD规范的作者亲自实现了符合AMD规范的requireJS。本文将详细介绍AMD及requireJS

&nbsp;

### AMD规范

&emsp;&emsp;AMD(Asynchronous Module Definition)翻译为异步模块定义。异步强调的是，在加载模块以及模块所依赖的其它模块时，都采用异步加载的方式，避免模块加载阻塞了网页的渲染进度

&emsp;&emsp;AMD作为一个规范，只需定义其语法API，而不关心其实现。AMD规范简单到只有一个API，即define函数

<div>
<pre>define([module-name?], [array-of-dependencies?], [module-factory-or-object]);</pre>
</div>

&emsp;&emsp;module-name: 模块标识，可以省略

&emsp;&emsp;array-of-dependencies: 所依赖的模块，可以省略

&emsp;&emsp;module-factory-or-object: 模块的实现，或者一个JavaScript对象

&emsp;&emsp;define函数具有异步性。当define函数执行时，首先会异步的去调用第二个参数中列出的依赖模块，当所有的模块被载入完成之后，如果第三个参数是一个回调函数则执行；然后告诉系统模块可用，也就通知了依赖于自己的模块自己已经可用

&nbsp;

### 加载

&emsp;&emsp;使用require.js的第一步，是先去官方网站[下载最新版本](http://requirejs.org/docs/release/2.3.3/minified/require.js)。下载后，假定把它放在js子目录下面，就可以加载了

<div>
<pre>&lt;script src="js/require.js"&gt;&lt;/script&gt;</pre>
</div>

&emsp;&emsp;HTML中的[script标签](http://www.cnblogs.com/xiaohuochai/p/6214015.html#anchor7)在加载和执行过程中会阻塞网页的渲染，所以一般要求尽量将script标签放置在body元素的底部，以便加快页面显示的速度，还有一种方式就是通过异步加载的方式来加载js文件，这样可以避免js文件对html渲染的阻塞

<div>
<pre>&lt;script src="js/require.js" defer async&gt;&lt;/script&gt;</pre>
</div>

&nbsp;

### 入口文件

&emsp;&emsp;require.js在加载的时候会检查data-main属性，当requireJS自身加载执行后，就会再次异步加载data-main属性指向的main.js。这个main.js是当前网页所有逻辑的入口，理想情况下，整个网页只需要这一个script标记，利用requireJS加载依赖的其它文件

<div>
<pre>&lt;script data-main="scripts/main" src="js/require.js"&gt;&lt;/script&gt;</pre>
</div>

&emsp;&emsp;注意：在main.js中所设置的脚本是异步加载的。所以如果在页面中配置了其它JS加载，则不能保证它们所依赖的JS已经加载成功

<div>
<pre>&lt;script data-main="scripts/main" src="js/require.js"&gt;&lt;/script&gt;
&lt;script src="js/other.js"&gt;&lt;/script&gt;</pre>
</div>

【内部机制】

&emsp;&emsp;在RequireJS内部，会使用head.appendChild()将每一个模块依赖加载为一个script标签。RequireJS等待所有的依赖加载完毕，计算出模块定义函数正确调用顺序，然后依次调用它们

&nbsp;

### 模块

&emsp;&emsp;模块不同于传统的脚本文件，它良好地定义了一个作用域来避免全局名称空间污染。它可以显式地列出其依赖关系，并以函数(定义此模块的那个函数)参数的形式将这些依赖进行注入，而无需引用全局变量。RequireJS的模块是模块模式的一个扩展，其好处是无需全局地引用其他模块

&emsp;&emsp;RequireJS的模块语法允许它尽快地加载多个模块，虽然加载的顺序不定，但依赖的顺序最终是正确的。同时因为无需创建全局变量，甚至可以做到在同一个页面上同时加载同一模块的不同版本

&emsp;&emsp;一个文件应该只定义1个模块。多个模块可以使用内置优化工具将其组织打包

&emsp;&emsp;如果我们的代码不依赖任何其他模块，那么可以直接写入javascript代码

<div>
<pre>//main.js
console.log(1);</pre>
</div>

![requirejs1](https://pic.xiaohuochai.site/blog/JS_modular_requirejs1.png)

&emsp;&emsp;但这样的话，就没必要使用require.js了。真正常见的情况是，主模块依赖于其他模块，这时就要使用AMD规范定义的的require()函数

<div>
<pre>// main.js
require(['moduleA'], function(a){
    console.log(a);
});
//moduleA.js
define(function(){
    return 1;
})</pre>
</div>

![requirejs2](https://pic.xiaohuochai.site/blog/JS_modular_requirejs1.png)

&emsp;&emsp;这里抛出一个问题，为什么主模块使用的是require()函数，而模块moduleA使用define()函数呢？因为define()定义的模块可以被调用，而require()不可以。主模块main.js是入口文件，需要调用别的模块，而不需要被别的模块调用，所以使用require()或define()都可以。而moduleA需要被调用，所以只能使用define()

&emsp;&emsp;如果把moduleA.js中的define()方法改为require()方法，则返回undefined

<div>
<pre>// main.js
require(['moduleA'], function(a){
    console.log(a);
});
//moduleA.js
require(function(){
    return 1;
})</pre>
</div>

![requirejs3](https://pic.xiaohuochai.site/blog/JS_modular_requirejs3.png)

【简单的值对】

&emsp;&emsp;上面的模块moduleA中，回调函数返回了一个数字。而实际上，模块可以有多种形式，比如一个简单的值对

<div>
<pre>define({
    color: "black",
    size: "unisize"
});</pre>
</div>

&emsp;&emsp;返回的结果如下：

![requirejs4](https://pic.xiaohuochai.site/blog/JS_modular_requirejs4.png)

【函数式定义】

&emsp;&emsp;如果一个模块没有任何依赖，但需要一个做setup工作的函数，则在define()中定义该函数，并将其传给define()

<div>
<pre>define(function () {
    //Do setup work here
    return {
        color: "black",
        size: "unisize"
    }
});</pre>
</div>

&emsp;&emsp;返回的结果如下：

![requirejs5](https://pic.xiaohuochai.site/blog/JS_modular_requirejs4.png)

【存在依赖的函数式定义】

&emsp;&emsp;如果模块存在依赖：则第一个参数是依赖的名称数组；第二个参数是函数，在模块的所有依赖加载完毕后，该函数会被调用来定义该模块，因此该模块应该返回一个定义了本模块的object。依赖关系会以参数的形式注入到该函数上，参数列表与依赖名称列表一一对应

<div>
<pre>//moduleA.js
define(['moduleB'], function(b) {
    var num = 10;
    return b.add(num);
    }
);
////moduleB.js
define({
    add: function(n){
        return n+1;
    }
});</pre>
</div>

![requirejs6](https://pic.xiaohuochai.site/blog/JS_modular_requirejs6.png)

【命名模块】

&emsp;&emsp;define()中可以包含一个模块名称作为首个参数

<div>
<pre>//moduleA.js
define("moduleA",['moduleB'], function(b) {
    var num = 10;
    return b.add(num);
    }
);</pre>
</div>

&emsp;&emsp;这些常由优化工具生成。也可以自己显式指定模块名称，但这使模块更不具备移植性&mdash;&mdash;就是说若将文件移动到其他目录下，就得重命名。一般最好避免对模块硬编码，而是交给优化工具去生成。优化工具需要生成模块名以将多个模块打成一个包，加快到浏览器的载入速度

&nbsp;

### 路径配置

&emsp;&emsp;html中的[base元素](http://www.cnblogs.com/xiaohuochai/p/6214015.html#anchor4)用于指定文档里所有相对URL地址的基础URL，requireJS的baseUrl跟这个base元素起的作用是类似的，由于requireJS总是动态地请求依赖的JS文件，所以必然涉及到一个JS文件的路径解析问题，requireJS默认采用一种baseUrl + moduleID的解析方式，requireJS对它的处理遵循如下规则：

&emsp;&emsp;1、在没有使用data-main和config的情况下，baseUrl默认为当前页面的目录

&emsp;&emsp;2、在有data-main的情况下，main.js前面的部分就是baseUrl，比如上面的js/

&emsp;&emsp;3、在有config的情况下，baseUrl以config配置的为准

&emsp;&emsp;上述三种方式，优先级由低到高排列

&emsp;&emsp;RequireJS以一个相对于baseUrl的地址来加载所有的代码。页面顶层script标签含有一个特殊的属性data-main，require.js使用它来启动脚本加载过程，而baseUrl一般设置到与该属性相一致的目录

<div>
<pre>&lt;script data-main="js/main.js" src="scripts/require.js"&gt;&lt;/script&gt;</pre>
</div>

&emsp;&emsp;在模块章节的示例中，代码如下所示

<div>
<pre>// main.js
require(['moduleA'], function(a){
    console.log(a);
});
//moduleA.js
define(function(){
    return 1;
})</pre>
</div>

&emsp;&emsp;入口文件main.js依赖于moduleA，直接写成['moduleA']，默认情况下，require.js假定moduleA与main.js在同一个目录，即'js/moduleA.js'，文件名为moduleA.js，然后自动加载

![requirejs7](https://pic.xiaohuochai.site/blog/JS_modular_requirejs7.png)

&emsp;&emsp;使用require.config()方法，我们可以对模块的加载行为进行自定义。require.config()就写在主模块（main.js）的头部。参数就是一个对象，这个对象的paths属性指定各个模块的加载路径

&emsp;&emsp;下面在demo文件夹下新建一个test文件夹，并在test文件夹下新建一个moduleA.js文件，内容如下

<div>
<pre>//moduleA.js
define(function(){
    return 2;
})</pre>
</div>

&emsp;&emsp;而在原来的js文件夹下，依然存在一个moduleA.js文件，内容如下

<div>
<pre>//moduleA.js
define(function() {
    return 1;
});</pre>
</div>

&emsp;&emsp;当js文件夹下的main.js进行config配置时

<div>
<pre>// main.js
require.config({
    baseUrl: 'test'
})
require(['moduleA'], function(a){
    console.log(a);
});</pre>
</div>

&emsp;&emsp; 结果为2，说明识别的是'test/moduleA.js'文件

![requirejs8](https://pic.xiaohuochai.site/blog/JS_modular_requirejs8.png)

&emsp;&emsp;当js文件夹下的main.js不进行config配置时

<div>
<pre>// main.js
require(['moduleA'], function(a){
    console.log(a);
});</pre>
</div>

&emsp;&emsp;结果为1，说明识别的是'js/moduleA.js'文件

![requirejs9](https://pic.xiaohuochai.site/blog/JS_modular_requirejs9.png)

&emsp;&emsp;RequireJS默认假定所有的依赖资源都是js脚本，因此无需在module ID上再加".js"后缀，RequireJS在进行module ID到path的解析时会自动补上后缀&nbsp;

&emsp;&emsp;如果一个模块的路径比较深，或者文件名特别长，比如'js/lib/moduleA.min.js'，则可以使用config配置对象中的paths属性

<div>
<pre>// main.js
require.config({
    paths:{
        'moduleA':'lib/moduleA.min'
    }
})
require(['moduleA'], function(a){
    console.log(a);
});
//moduleA-min.js
define(function(){
    return 3;
})</pre>
</div>

&emsp;&emsp;结果为3

![requirejs10](https://pic.xiaohuochai.site/blog/JS_modular_requirejs10.png)

&emsp;&emsp;要注意的是，这里的paths的'moduleA'设置的是'lib/moduleA.min'，而不是'js/lib/moduleA.min'，是因为requireJS中的文件解析是一个"baseUrl + paths"的解析过程

&emsp;&emsp;在index.html的入口文件设置的是'js/main'，所以baseURL是'js'。因此'baseUrl + paths' = 'js/lib/moduleA.min'

<div>
<pre>&lt;script src="require.js" data-main="js/main" defer async&gt;&lt;/script&gt;</pre>
</div>

&emsp;&emsp;如果在config配置对象中设置了baseUrl，则以此为准

<div>
<pre>// main.js
require.config({
    baseUrl: 'js/lib',
    paths:{
        'moduleA':'moduleA.min'
    }
})
require(['moduleA'], function(a){
    console.log(a);
});</pre>
</div>

&emsp;&emsp;结果同样为3，baseURL是'js/lib'，paths是'moduleA.min'。因此'baseUrl + paths' = 'js/lib/moduleA.min'

![requirejs11](https://pic.xiaohuochai.site/blog/JS_modular_requirejs10.png)

&emsp;&emsp;如果一个module ID符合下述规则之一，其ID解析会避开常规的"baseUrl + paths"配置，而是直接将其加载为一个相对于当前HTML文档的脚本：1、以 ".js" 结束；2、包含 URL 协议，如 "http:" or "https:"

&emsp;&emsp;如下所示，require()函数所依赖的模块路径为'js/moduleA.js'

<div>
<pre>// main.js
require.config({
    baseUrl: 'js/lib',
    paths:{
        'moduleA':'moduleA.min'
    }
})
require(['js/moduleA.js'], function(a){
    console.log(a);
});</pre>
</div>

&emsp;&emsp;而该文件的代码如下，路径为'js/moduleA.js'，而不是'js/lib/moduleA.min'，所以，最终结果为1

<div>
<pre>//moduleA.js
define(function() {
    return 1;
});</pre>
</div>

&emsp;&emsp;一般来说，最好还是使用baseUrl及"paths" config去设置module ID。它会带来额外的灵活性，如便于脚本的重命名、重定位等。 同时，为了避免凌乱的配置，最好不要使用多级嵌套的目录层次来组织代码，而是要么将所有的脚本都放置到baseUrl中，要么分置为项目库/第三方库的一个扁平结构，如下

<div>
<pre>www/
    index.html
    js/
        app/
            sub.js
        lib/
            jquery.js
            canvas.js
        main.js</pre>
</div>

&nbsp;

### CommonJS

&emsp;&emsp;前面提到过，[commonJS](http://www.cnblogs.com/xiaohuochai/p/6847939.html)主要应用于服务器端编程，如nodejs。使用打包工具[Browserify](http://www.cnblogs.com/xiaohuochai/p/6850977.html)可以对CommonJS进行格式转换，使其可以在浏览器端进行

&emsp;&emsp;而requireJS支持一种简单包装CommonJS的方式，只要在commonJS代码的外层简单包裹一层函数，就可以在浏览器端直接运行

<div>
<pre>define(function(require, exports, module) {
});</pre>
</div>

&emsp;&emsp;如果该模块还依赖其他模块，如依赖模块moduleA，则代码如下

<div>
<pre>define(['moduleA'],function(require, exports, module) {
});</pre>
</div>

&emsp;&emsp;a.js和b.js的commonJS形式的代码如下

<div>
<pre>// a.js
var a = 100;
module.exports.a = a;
// b.js
var result = require('./a');
console.log(result.a);</pre>
</div>

&emsp;&emsp;index.html直接引用b.js会报错，提示require没有被定义

<div>
<pre>&lt;script src="b.js"&gt;&lt;/script&gt; </pre>
</div>

&emsp;&emsp;将a.js和b.js进行改造之后，代码如下

<div>
<pre>// a.js
define(function(require, exports, module) {
    var a = 100;
    module.exports.a = a;
});
// b.js
define(function(require, exports, module) {
    var result = require('./a');
    console.log(result.a);
});</pre>
</div>

&emsp;&emsp;index.html将入口文件设置为'js/b'，则结果为100

<div>
<pre>&lt;script src="require.js" data-main="js/b" defer async&gt;&lt;/script&gt;</pre>
</div>

&nbsp;

### 懒加载

&emsp;&emsp;有如下例子，入口文件main.js代码如下

<div>
<pre>// main.js
require(['a'], function(a){
    console.log('main');
    document.onclick = function(){
        a.test();
    }
});</pre>
</div>

&emsp;&emsp;所依赖的模块a.js的代码如下

<div>
<pre>define(function(){
    console.log('a');
    return {
        test : function(){
            console.log('a.test');
        }
    }
})</pre>
</div>

&emsp;&emsp;在浏览器端执行时，即使不点击页面，浏览器也会下载a.js文件。这个性能消耗是不容忽视的

![requirejs12](https://pic.xiaohuochai.site/blog/JS_modular_requirejs12.png)

&emsp;&emsp;AMD保留了commonjs中的require、exprots、module这三个功能。可以不把依赖罗列在dependencies数组中。而是在代码中用require来引入

&emsp;&emsp;重写后的代码如下

<div>
<pre>// main.js
define(function(){
    console.log('main');
    document.onclick = function(){
        require(['a'],function(a){
            a.test();
        });
    }
});
//a.js
define(function(){
    console.log('a');
    return {
        test : function(){
            console.log('a.test');
        }
    }
})</pre>
</div>

&emsp;&emsp;在浏览器端执行时，如果不点击页面，浏览器就不会下载a.js文件，这样就实现懒加载

![requirejs13](https://pic.xiaohuochai.site/blog/JS_modular_requirejs13.png)

&nbsp;

### 其他配置

&emsp;&emsp;在requireJS中，除了路径配置之外，还有一些其他配置

【配置设置】

&emsp;&emsp;在前面的例子中，我们配置requireJS中的路径是通过入口文件main.js中的config对象来配置的。实际上，不通过入口文件，也可以进行requireJS的配置

&emsp;&emsp;1、在index.html文件嵌入javascript代码

&emsp;&emsp;在HTML文件中，加载requireJS文件之后，立即对requireJS进行配置，相当于将main.js文件变为内嵌的javascript文件

<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;script src="require.js"&gt;&lt;/script&gt;
&lt;script&gt;
require.config({
    baseUrl: 'js/lib',
    paths:{
        'moduleA':'moduleA.min'
    }
})    
require(['moduleA'], function(a){
    console.log(a);
});
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>

&emsp;&emsp;2、将配置作为全局变量"require"在require.js加载之前进行定义，它会被自动应用

&emsp;&emsp;这里有一个问题是，如果require作为全局变量被提前定义，则data-main入口文件，是以baseUrl为基础进行设置的

&emsp;&emsp;注意：使用 var require = {} 的形式而不是 window.require = {}的形式。后者在IE中运行不正常

<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;script&gt;
var require = {
    baseUrl: 'js/lib',
    paths:{
        'moduleA':'moduleA.min'
    }    
}    
&lt;/script&gt;
&lt;script src="require.js" data-main="../main"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>

【shim】

&emsp;&emsp;shim属性为那些没有使用define()来声明依赖关系、设置模块的"浏览器全局变量注入"型脚本做依赖和导出配置，即加载非规范的模块

&emsp;&emsp;举例来说，underscore和backbone这两个库，都没有采用AMD规范编写。如果要加载它们的话，必须先定义它们的特征。具体来说，每个模块要定义（1）exports值（输出的变量名），表明这个模块外部调用时的名称；（2）deps数组，表明该模块的依赖性

&emsp;&emsp;通过如下配置后，现在可以通过_调用underscore的api，使用Backbone来调用backbone的api

<div>
<pre>   require.config({
　　　　shim: {

　　　　　　'underscore':{
　　　　　　　　exports: '_'
　　　　　　},
　　　　　　'backbone': {
　　　　　　　　deps: ['underscore', 'jquery'],
　　　　　　　　exports: 'Backbone'
　　　　　　}
　　　　}
　　});</pre>
</div>

&emsp;&emsp;jQuery的插件可以如下这样定义，现在可以通过jQuery.fn.scroll来调用该插件的api

<div>
<pre>　　shim: {
　　　　'jquery.scroll': {
　　　　　　deps: ['jquery'],
　　　　　　exports: 'jQuery.fn.scroll'
　　　　}
　　}</pre>
</div>

&nbsp;

### 插件

&emsp;&emsp;require.js还提供一系列[插件](https://github.com/jrburke/requirejs/wiki/Plugins)，实现一些特定的功能

【dom ready】　

&emsp;&emsp;RequireJS加载模块速度很快，很有可能在页面DOM Ready之前脚本已经加载完毕。需要与DOM交互的工作应等待DOM Ready。现代的浏览器通过DOMContentLoaded事件来知会

&emsp;&emsp;但是，不是所有的浏览器都支持DOMContentLoaded。[domReady模块](https://raw.github.com/requirejs/domReady/latest/domReady.js)实现了一个跨浏览器的方法来判定何时DOM已经ready

<div>
<pre>// main.js
require(['domready!'], function(){
    console.log('ready');
});</pre>
</div>

【text】

&emsp;&emsp;[text插件](https://raw.github.com/requirejs/text/latest/text.js)可以用来加载如.html、.css等文本文件，可以通过该插件来实现完整组件(结构+逻辑+样式)的组件化开发

<div>
<pre>require(["some/module", "text!some/module.html", "text!some/module.css"],
    function(module, html, css) {
    }
);</pre>
</div>
