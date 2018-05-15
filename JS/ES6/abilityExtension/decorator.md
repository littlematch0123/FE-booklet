# ES2017中的修饰器Decorator

&emsp;&emsp;修饰器（Decorator）是一个函数，用来修改类的行为。本文将详细介绍ES2017中的修饰器Decorator

&nbsp;

### 概述

&emsp;&emsp;ES2017 引入了这项功能，目前 Babel 转码器已经支持Decorator

&emsp;&emsp;首先，安装`babel-core`和`babel-plugin-transform-decorators`。由于后者包括在`babel-preset-stage-0`之中，所以改为安装`babel-preset-stage-0`亦可

<div>
<pre>$ npm install babel-core babel-plugin-transform-decorators</pre>
</div>

&emsp;&emsp;然后，设置配置文件`.babelrc`

<div>
<pre>{
  "plugins": ["transform-decorators"]
}</pre>
</div>

&emsp;&emsp;这时，Babel就可以对Decorator转码了

&emsp;&emsp;脚本中打开的命令如下

<div>
<pre>babel.transform("code", {plugins: ["transform-decorators"]})</pre>
</div>

&nbsp;

### 类修饰

&emsp;&emsp;下面代码中，`@testable`就是一个修饰器。它修改了`MyTestableClass`这个类的行为，为它加上了静态属性`isTestable`

<div>
<pre>@testable
class MyTestableClass {
  // ...
}
function testable(target) {
  target.isTestable = true;
}
MyTestableClass.isTestable // true</pre>
</div>

&emsp;&emsp;基本上，修饰器的行为就是下面这样

<div>
<pre>@decorator
class A {}
// 等同于
class A {}
A = decorator(A) || A;</pre>
</div>

&emsp;&emsp;修饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。这意味着，修饰器能在编译阶段运行代码，也就是说，修饰器本质就是编译时执行的函数

【参数】

&emsp;&emsp;修饰器函数的第一个参数，是所要修饰的目标类

<div>
<pre>function testable(target) {
  // ...
}</pre>
</div>

&emsp;&emsp;如果觉得一个参数不够用，可以在修饰器外面再封装一层函数

<div>
<pre>function testable(isTestable) {
  return function(target) {
    target.isTestable = isTestable;
  }
}
@testable(true)
class MyTestableClass {}
MyTestableClass.isTestable // true
@testable(false)
class MyClass {}
MyClass.isTestable // false</pre>
</div>

&emsp;&emsp;上面代码中，修饰器`testable`可以接受参数，这就等于可以修改修饰器的行为。

&emsp;&emsp;前面的例子是为类添加一个静态属性，如果想添加实例属性，可以通过目标类的`prototype`对象操作

<div>
<pre>function testable(target) {
  target.prototype.isTestable = true;
}
@testable
class MyTestableClass {}
let obj = new MyTestableClass();
obj.isTestable // true</pre>
</div>

【mixins】

&emsp;&emsp;下面是另外一个例子

<div>
<pre>// mixins.js
export function mixins(...list) {
  return function (target) {
    Object.assign(target.prototype, ...list)
  }
}
// main.js
import { mixins } from './mixins'
const Foo = {
  foo() { console.log('foo') }
};
@mixins(Foo)
class MyClass {}
let obj = new MyClass();
obj.foo() // 'foo'</pre>
</div>

&emsp;&emsp;上面代码通过修饰器`mixins`，把`Foo`类的方法添加到了`MyClass`的实例上面。可以用`Object.assign()`模拟这个功能

<div>
<pre>const Foo = {
  foo() { console.log('foo') }
};
class MyClass {}
Object.assign(MyClass.prototype, Foo);
let obj = new MyClass();
obj.foo() // 'foo'</pre>
</div>

&nbsp;

### 方法修饰

&emsp;&emsp;修饰器不仅可以修饰类，还可以修饰类的属性

<div>
<pre>class Person {
  @readonly
  name() { return `${this.first} ${this.last}` }
}</pre>
</div>

&emsp;&emsp;上面代码中，修饰器`readonly`用来修饰&ldquo;类&rdquo;的`name`方法

【参数】

&emsp;&emsp;此时，修饰器函数一共可以接受三个参数，第一个参数是所要修饰的目标对象，第二个参数是所要修饰的属性名，第三个参数是该属性的描述对象

<div>
<pre>function readonly(target, name, descriptor){
  // descriptor对象原来的值如下
  // {
  //   value: specifiedFunction,
  //   enumerable: false,
  //   configurable: true,
  //   writable: true
  // };
  descriptor.writable = false;
  return descriptor;
}
readonly(Person.prototype, 'name', descriptor);
// 类似于
Object.defineProperty(Person.prototype, 'name', descriptor);</pre>
</div>

&emsp;&emsp;上面代码说明，修饰器（readonly）会修改属性的描述对象（descriptor），然后被修改的描述对象再用来定义属性。

&emsp;&emsp;下面是另一个例子，修改属性描述对象的`enumerable`属性，使得该属性不可遍历

<div>
<pre>class Person {
  @nonenumerable
  get kidCount() { return this.children.length; }
}
function nonenumerable(target, name, descriptor) {
  descriptor.enumerable = false;
  return descriptor;
}</pre>
</div>

【日志应用】

&emsp;&emsp;下面的`@log`修饰器，可以起到输出日志的作用

<div>
<pre>class Math {
  @log
  add(a, b) {
    return a + b;
  }
}
function log(target, name, descriptor) {
  var oldValue = descriptor.value;
  descriptor.value = function() {
    console.log(`Calling "${name}" with`, arguments);
    return oldValue.apply(null, arguments);
  };
  return descriptor;
}
const math = new Math();
// passed parameters should get logged now
math.add(2, 4);</pre>
</div>

&emsp;&emsp;上面代码中，`@log`修饰器的作用就是在执行原始的操作之前，执行一次`console.log`，从而达到输出日志的目的。

&emsp;&emsp;修饰器有注释的作用

<div>
<pre>@testable
class Person {
  @readonly
  @nonenumerable
  name() { return `${this.first} ${this.last}` }
}</pre>
</div>

&emsp;&emsp;从上面代码中，我们一眼就能看出，`Person`类是可测试的，而`name`方法是只读和不可枚举的

【执行顺序】

&emsp;&emsp;如果同一个方法有多个修饰器，会像剥洋葱一样，先从外到内进入，然后由内向外执行

<div>
<pre>function dec(id){
    console.log('evaluated', id);
    return (target, property, descriptor) =&gt; console.log('executed', id);
}
class Example {
    @dec(1)
    @dec(2)
    method(){}
}
// evaluated 1
// evaluated 2
// executed 2
// executed 1</pre>
</div>

&emsp;&emsp;上面代码中，外层修饰器`@dec(1)`先进入，但是内层修饰器`@dec(2)`先执行

&emsp;&emsp;除了注释，修饰器还能用来类型检查。所以，对于类来说，这项功能相当有用。从长期来看，它将是JS代码静态分析的重要工具

&nbsp;

### 注意事项

&emsp;&emsp;修饰器只能用于类和类的方法，不能用于函数，因为存在函数提升

<div>
<pre>var counter = 0;
var add = function () {
  counter++;
};
@add
function foo() {
}</pre>
</div>

&emsp;&emsp;上面的代码，意图是执行后`counter`等于1，但是实际上结果是`counter`等于0。因为函数提升，使得实际执行的代码是下面这样

<div>
<pre>@add
function foo() {
}
var counter;
var add;
counter = 0;
add = function () {
  counter++;
};</pre>
</div>

&emsp;&emsp;下面是另一个例子

<div>
<pre>var readOnly = require("some-decorator");
@readOnly
function foo() {
}</pre>
</div>

&emsp;&emsp;上面代码也有问题，因为实际执行是下面这样

<div>
<pre>var readOnly;

@readOnly
function foo() {
}
readOnly = require("some-decorator");</pre>
</div>

&emsp;&emsp;总之，由于存在函数提升，使得修饰器不能用于函数。类是不会提升的，所以就没有这方面的问题。

&emsp;&emsp;另一方面，如果一定要修饰函数，可以采用高阶函数的形式直接执行

<div>
<pre>function doSomething(name) {
  console.log('Hello, ' + name);
}
function loggingDecorator(wrapped) {
  return function() {
    console.log('Starting');
    const result = wrapped.apply(this, arguments);
    console.log('Finished');
    return result;
  }
}
const wrapped = loggingDecorator(doSomething);</pre>
</div>

