# 实现javascript下的模块组织

&emsp;&emsp;java有类文件、Python有import关键词、Ruby有require关键词、C#有using关键词、PHP有include和require、CSS有@import关键词，但是对ES5版本的javascript来说，javascript通过script标签引入代码的方式显得杂乱无章，语言自身毫无组织和约束能力，人们不得不用命令空间等方式人为地约束代码，以求达到安全和易用的目的。本文将详细介绍javascript中的模块组织

&nbsp;

### 反模式

&emsp;&emsp;反模式(Anti-Pattern)指没有使用任何模块系统

&emsp;&emsp;简单地，把不同的函数(以及记录状态的变量)放在一起，就算是一个模块

<div>
<pre>　　function m1(){
　　　　//...
　　}
　　function m2(){
　　　　//...
　　}</pre>
</div>

&emsp;&emsp;上面的函数m1()和m2()，组成一个模块。使用的时候，直接调用就行了。

&emsp;&emsp;这种做法的缺点很明显："污染"了全局变量，无法保证不与其他模块发生变量名冲突，而且模块成员之间看不出直接关系

&nbsp;

### 字面量

&emsp;&emsp;为了解决上面的缺点，可以把模块写成一个字面量，所有的模块成员都放到这个对象里面

<div>
<pre>　　var module1 = new Object({
　　　　_count : 0,
　　　　m1 : function (){
　　　　　　//...
　　　　},
　　　　m2 : function (){
　　　　　　//...
　　　　}
　　});</pre>
</div>

&emsp;&emsp;上面的函数m1()和m2(），都封装在module1对象里。使用的时候，就是调用这个对象的属性

<div>
<pre>module1.m1();</pre>
</div>

&emsp;&emsp;但这种写法会暴露所有模块成员，内部状态可被外部改写。比如，外部代码可以直接改变内部计数器的值

<div>
<pre>module1._count = 5;</pre>
</div>

&nbsp;

### IIFE

&emsp;&emsp;使用"立即执行函数"（Immediately-Invoked Function Expression，IIFE）可以达到不暴露私有成员的目的

<div>
<pre>　　var module1 = (function(){
　　　　var _count = 0;
　　　　var m1 = function(){
　　　　　　//...
　　　　};
　　　　var m2 = function(){
　　　　　　//...
　　　　};
　　　　return {
　　　　　　m1 : m1,
　　　　　　m2 : m2
　　　　};
　　})();</pre>
</div>

&emsp;&emsp;使用上面的写法，外部代码无法读取内部的_count变量

<div>
<pre>console.info(module1._count); //undefined</pre>
</div>

&nbsp;

### IIFE传参

&emsp;&emsp;如果一个模块需要继承另一个模块，则需要IIFE传参

<div>
<pre>　　var module1 = ( function (mod){
　　　　mod.m3 = function () {
　　　　　　//...
　　　　};
　　　　return mod;
　　})(window.module1 || {});</pre>
</div>

&nbsp;

### 命名空间

&emsp;&emsp;如果采用IIFE的方法，随着模块的增多，仍然污染了全局环境。

&emsp;&emsp;而命名空间(Namespace)可以通过只暴露类似于一个'namespace'的全局变量，来实现所有模块的声明，进而解决全局环境的污染问题

<div>
<pre>//math.js
namespace('math', [], function(){
  function add(a, b) { return a + b; }
  function sub(a, b) { return a - b; }
  return {
    add: add,
    sub: sub
  }
})
//calculator.js
namespace('calculator', ['math'], function(m){
  var action = 'add';
  function compute(a,b) {
    return m[action](a, b);
  }
  return {
    compute: compute
  }
})</pre>
</div>
<div>
<pre>var namespace = (function(){
    //缓存所有模块
    var cache = {};
    function createModule(name/*模块名*/,deps/*依赖列表*/,definition/*定义*/){
        //如果只有模块名，则直接输出
        if(arguments.length === 1){
            return cache[name];
        }
        //取得所有模块的依赖
        deps = deps.map(function(depName){
            return namespace(depName); 
        })
        //初始化模块并返回
        cache[name] = definition.apply(null,deps);
        return cache[name];
    }
    return createModule;
})()</pre>
</div>

&nbsp;

## 最后

&emsp;&emsp;虽然，使用命名空间可以解决全局环境污染的问题，但是却无法解决模块依赖管理的问题

&emsp;&emsp;如下图所示，module2依赖于module1和module3，则代码如下

![moduleOrganization1](https://pic.xiaohuochai.site/blog/JS_modular_moduleOrganization1.png)
<div>
<pre>&lt;script src="module1.js"&gt;&lt;/script&gt;
&lt;script src="module3.js"&gt;&lt;/script&gt;
&lt;script src="module2.js"&gt;&lt;/script&gt;</pre>
</div>

&emsp;&emsp;但，如果模块组织如下所示

![moduleOrganization2](https://pic.xiaohuochai.site/blog/JS_modular_moduleOrganization2.png)

&emsp;&emsp;甚至，如下所示

![moduleOrganization3](https://pic.xiaohuochai.site/blog/JS_modular_moduleOrganization3.png)

&emsp;&emsp;这时，手动地处理模块之间的依赖关系就不现实了，需要使用AMD、CMD、ES6 MODULE等来处理

