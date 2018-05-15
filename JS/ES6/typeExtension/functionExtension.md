# ES6函数扩展

&emsp;&emsp;函数是所有编程语言的重要组成部分，在ES6出现前，JS的函数语法一直没有太大的变化，从而遗留了很多问题，导致实现一些基本的功能经常要编写很多代码。ES6大力度地更新了函数特性，在ES5的基础上进行了许多改进，使用JS编程可以更少出错，同时也更加灵活。本文将详细介绍ES6函数扩展

&nbsp;

### 形参默认值

&emsp;&emsp;Javascript函数有一个特别的地方，无论在函数定义中声明了多少形参，都可以传入任意数量的参数，也可以在定义函数时添加针对参数数量的处理逻辑，当已定义的形参无对应的传入参数时为其指定一个默认值

【ES5模拟】

&emsp;&emsp;在ES5中，一般地，通过下列方式创建函数并为参数设置默认值

```
function makeRequest(url, timeout, callback) {
    timeout = timeout || 2000;
    callback = callback || function() {};
    // 函数的剩余部分
}
```

&emsp;&emsp;在这个示例中，timeout和callback为可选参数，如果不传入相应的参数系统会给它们赋予一个默认值。在含有逻辑或操作符的表达式中，前一个操作数的值为false时，总会返回后一个值。对于函数的命名参数，如果不显式传值，则其值默认为undefined

&emsp;&emsp;因此我们经常使用逻辑或操作符来为缺失的参数提供默认值

&emsp;&emsp;然而这个方法也有缺陷，如果我们想给makeRequest函数的第二个形参timeout传入值0，即使这个值是合法的，也会被视为一个false值，并最终将timeout赋值为2000

&emsp;&emsp;在这种情况下，更安全的选择是通过typeof检查参数类型，如下所示

```
function makeRequest(url, timeout, callback) {
    timeout = (typeof timeout !== "undefined") ? timeout : 2000;
    callback = (typeof callback !== "undefined") ? callback : function() {};
    // 函数的剩余部分
}
```

&emsp;&emsp;虽然这种方法更安全，但依然为实现一个基本需求而书写了额外的代码。它代表了一种常见的模式，而流行的 JS 库中都充斥着类似的模式进行默认补全

【ES6默认参数】

&emsp;&emsp;ES6简化了为形参提供默认值的过程，如果没为参数传入值则为其提供一个初始值

```
function makeRequest(url, timeout = 2000, callback = function() {}) {
    // 函数的剩余部分
}
```

&emsp;&emsp;在这个函数中，只有第一个参数被认为总是要为其传入值的，其他两个参数都有默认值，而且不需要添加任何校验值是否缺失的代码，所以函数代码比较简洁

&emsp;&emsp;如果调用make Request()方法时传入3个参数，则不使用默认值

```
// 使用默认的 timeout 与 callback
makeRequest("/foo");
// 使用默认的 callback
makeRequest("/foo", 500);
// 不使用默认值
makeRequest("/foo", 500, function(body) {
    doSomething(body);
});
```

【触发默认值】

&emsp;&emsp;声明函数时，可以为任意参数指定默认值，在已指定默认值的参数后可以继续声明无默认值参数

```
function makeRequest(url, timeout = 2000, callback) {
    console.log(url);
    console.log(timeout);
    console.log(callback);
}
```

&emsp;&emsp;在这种情况下，只有当不为第二个参数传入值或主动为第二个参数传入undefined时才会使用timeout的默认值

&emsp;&emsp;注意:如果传入`undefined`，将触发该参数等于默认值，`null`则没有这个效果

```
function makeRequest(url, timeout = 2000, callback) {
    console.log(timeout);
}
makeRequest("/foo");//2000
makeRequest("/foo", undefined);//2000
makeRequest("/foo", null);//null
makeRequest("/foo", 100);//100
```

&emsp;&emsp;上面代码中，timeout参数对应`undefined`，结果触发了默认值，`y`参数等于`null`，就没有触发默认值

&emsp;&emsp;使用参数默认值时，函数不能有同名参数

```
// SyntaxError: Duplicate parameter name not allowed in this context
function foo(x, x, y = 1) {
  // ...
}
```

&emsp;&emsp;另外，一个容易忽略的地方是，参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的

```
let x = 99;
function foo(p = x + 1) {
  console.log(p);
}
foo() // 100
x = 100;
foo() // 101
```

&emsp;&emsp;上面代码中，参数`p`的默认值是`x+1`。这时，每次调用函数`foo`，都会重新计算`x+1`，而不是默认`p`等于100

【length属性】

&emsp;&emsp;指定了默认值以后，函数的`length`属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，`length`属性将失真

```
(function (a) {}).length // 1
(function (a = 5) {}).length // 0
(function (a, b, c = 5) {}).length // 2
```

&emsp;&emsp;这是因为`length`属性的含义是，该函数预期传入的参数个数。某个参数指定默认值以后，预期传入的参数个数就不包括这个参数了。同理，rest 参数也不会计入`length`属性

```
(function(...args) {}).length // 0
```

&emsp;&emsp;如果设置了默认值的参数不是尾参数，那么`length`属性也不再计入后面的参数了

```
(function (a = 0, b, c) {}).length // 0
(function (a, b = 1, c) {}).length // 1
```

【arguments】

&emsp;&emsp;当使用默认参数值时，arguments对象的行为与以往不同。在ES5非严格模式下，函数命名参数的变化会体现在arguments对象中

```
function mixArgs(first, second) {
    console.log(first === arguments[0]);//true
    console.log(second === arguments[1]);//true
    first = "c";
    second = "d";
    console.log(first === arguments[0]);//true
    console.log(second === arguments[1]);//true
}
mixArgs("a", "b");
```

&emsp;&emsp;在非严格模式下，命名参数的变化会同步更新到arguments对象中，所以当first和second被赋予新值时，arguments[0]和arguments[1]相应更新，最终所有===全等比较的结果为true

&emsp;&emsp;然而，在ES5的严格模式下，取消了arguments对象的这个令人感到困惑的行为，无论参数如何变化，arguments对象不再随之改变

```
function mixArgs(first, second) {
    "use strict";
    console.log(first === arguments[0]);//true
    console.log(second === arguments[1]);//true
    first = "c";
    second = "d"
    console.log(first === arguments[0]);//false
    console.log(second === arguments[1]);//false
}
mixArgs("a", "b");
```

&emsp;&emsp;这一次更改 first 与 second 就不会再影响 arguments 对象，因此输出结果符合通常的期望

&emsp;&emsp;在ES6中，如果一个函数使用了默认参数值，则无论是否显式定义了严格模式，arguments对象的行为都将与ES5严格模式下保持一致。默认参数值的存在使得arguments对象保持与命名参数分离，这个微妙的细节将影响使用arguments对象的方式

```
// 非严格模式
function mixArgs(first, second = "b") {
    console.log(first);//a
    console.log(second);//b
    console.log(arguments.length);//1
    console.log(arguments[0]);//a
    console.log(arguments[1]);//undefined
    first = 'aa';
    arguments[1] = 'b';
    console.log(first);//aa
    console.log(second);//b
    console.log(arguments.length);//1
    console.log(arguments[0]);//a
    console.log(arguments[1]);//b
}
mixArgs("a");
```

&emsp;&emsp;在这个示例中，只给mixArgs()方法传入一个参数，arguments. Iength 的值为 1, arguments[1] 的值为 undefined, first与arguments[0]全等，改变first和second并不会影响arguments对象

【默认参数表达式】

&emsp;&emsp;关于默认参数值，最有趣的特性可能是非原始值传参了。可以通过函数执行来得到默认参数的值

```
function getValue() {
    return 5;
}
function add(first, second = getValue()) {
    return first + second;
}
console.log(add(1, 1)); // 2
console.log(add(1)); // 6
```

&emsp;&emsp;在这段代码中，如果不传入最后一个参数，就会调用getvalue()函数来得到正确的默认值。切记，初次解析函数声明时不会调用getvalue()方法，只有当调用add()函数且不传入第二个参数时才会调用

```
let value = 5;
function getValue() {
    return value++;
}
function add(first, second = getValue()) {
    return first + second;
}
console.log(add(1, 1)); // 2
console.log(add(1)); // 6
console.log(add(1)); // 7
```

&emsp;&emsp;在此示例中，变量value的初始值为5，每次调用getvalue()时加1。第一次调用add(1)返回6，第二次调用add(1)返回7，因为变量value已经被加了1。因为只要调用add()函数就有可能求second的默认值，所以任何时候都可以改变那个值

&emsp;&emsp;正因为默认参数是在函数调用时求值，所以可以使用先定义的参数作为后定义参数的默认值

```
function add(first, second = first) {
    return first + second;
}
console.log(add(1, 1)); // 2
console.log(add(1)); // 2
```

&emsp;&emsp;在上面这段代码中，参数second的默认值为参数first的值，如果只传入一个参数，则两个参数的值相同，从而add(1,1)返回2，add(1)也返回2

```
function getValue(value) {
    return value + 5;
}
function add(first, second = getValue(first)) {
    return first + second;
}
console.log(add(1, 1)); // 2
console.log(add(1)); // 7
```

&emsp;&emsp;在上面这个示例中，声明second=getvalue(first)，所以尽管add(1,1)仍然返回2，但是add(1)返回的是(1+6)也就是7

&emsp;&emsp;在引用参数默认值的时候，只允许引用前面参数的值，即先定义的参数不能访问后定义的参数

```
function add(first = second, second) {
    return first + second;
}
console.log(add(1, 1)); // 2
console.log(add(undefined, 1)); // 抛出错误
```

&emsp;&emsp;调用add(undefined,1)会抛出错误，因为second比first晚定义，因此其不能作为first的默认值

【临时死区】

&emsp;&emsp;在介绍[块级作用域](http://www.cnblogs.com/xiaohuochai/p/7226375.html)时提到过[临时死区TDZ](http://www.cnblogs.com/xiaohuochai/p/7226375.html#anchor4)，其实默认参数也有同样的临时死区，在这里的参数不可访问。与let声明类似，定义参数时会为每个参数创建一个新的标识符绑定，该绑定在初始化之前不可被引用，如果试图访问会导致程序抛出错误。当调用函数时，会通过传入的值或参数的默认值初始化该参数

```
function getValue(value) {
    return value + 5;
}
function add(first, second = getValue(first)) {
    return first + second;
}
console.log(add(1, 1)); // 2
console.log(add(1)); // 7
```

&emsp;&emsp;调用add(1,1)和add(1)时实际上相当于执行以下代码来创建first和second参数值

```
// JS 调用 add(1, 1) 可表示为
let first = 1;
let second = 1;
// JS 调用 add(1) 可表示为
let first = 1;
let second = getValue(first);
```

&emsp;&emsp;当初次执行函数add()时，first和second被添加到一个专属于函数参数的临时死区(与let的行为类似)。由于初始化second时first已经被初始化，所以它可以访问first的值，但是反过来就错了

```
function add(first = second, second) {
    return first + second;
}
console.log(add(1, 1)); // 2
console.log(add(undefined, 1)); // 抛出错误
```

&emsp;&emsp;在这个示例中，调用add(1,1)和add(undefined,1)相当于在引擎的背后做了如下事情

```
// JS 调用 add(1, 1) 可表示为
let first = 1;
let second = 1;
// JS 调用 add(1) 可表示为
let first = second;
let second = 1;
```

&emsp;&emsp;在这个示例中，调用add(undefined,1)函数，因为当first初始化时second尚未初始化，所以会导致程序抛出错误，此时second尚处于临时死区中，所有引用临时死区中绑定的行为都会报错

【形参与自由变量】

&emsp;&emsp;下列代码中，y是形参，需要考虑临时死区的问题；而x是自由变量，不需要考虑。所以调用函数时，由于未传入参数，执行y=x，x是自由变量，通过作用域链，在全局作用域找到x=1，并赋值给y，于是y取值1

```
let x = 1;
function f(y = x) {}
f() // 1
```

&emsp;&emsp;下列代码中，x和y是形参，需要考虑临时死区的问题。因为没有自由变量，所以不考虑作用域链寻值的问题。调用函数时，由于未传入参数，执行y=x，由于x正处于临时死区内，所有引用临时死区中绑定的行为都会报错

```
let x = 1;
function f(y = x,x) {}
f()// ReferenceError: x is not defined
```

&emsp;&emsp;类似地，下列代码也报错

```
let x = 1;
function foo(x = x) {}
foo() // ReferenceError: x is not defined
```

&nbsp;

### 不定参数

&emsp;&emsp;无论函数已定义的命名参数有多少，都不限制调用时传入的实际参数数量，调用时总是可以传入任意数量的参数。当传入更少数量的参数时，默认参数值的特性可以有效简化函数声明的代码；当传入更多数量的参数时，ES6同样也提供了更好的方案。

【ES5】

&emsp;&emsp;早先，Javascript提供arguments对象来检查函数的所有参数，从而不必定义每一个要用的参数。尽管arguments对象检査在大多数情况下运行良好，但是实际使用起来却有些笨重

```
function pick(object) {
    let result = Object.create(null);
    // 从第二个参数开始处理
    for (let i = 1, len = arguments.length; i < len; i++) {
        result[arguments[i]] = object[arguments[i]];
    }
    return result;
}
let book = {
    title: "ES6",
    author: "huochai",
    year: 2017
};
let bookData = pick(book, "author", "year");
console.log(bookData.author); // "huochai"
console.log(bookData.year); // 2017
```

&emsp;&emsp;这个函数模仿了Underscore.js库中的pick()方法，返回一个给定对象的副本，包含原始对象属性的特定子集。在这个示例中只定义了一个参数，第一个参数传入的是被复制属性的源对象，其他参数为被复制属性的名称

&emsp;&emsp;关于pick()函数应该注意这样几件事情：首先，并不容易发现这个函数可以接受任意数量的参数，当然，可以定义更多的参数，但是怎么也达不到要求；其次，因为第一个参数为命名参数且已被使用，要查找需要拷贝的属性名称时，不得不从索引1而不是索引0开始遍历arguments对象

【ES6】

&emsp;&emsp;在ES6中，通过引入不定参数(rest parameters)的特性可以解决这些问题，不定参数也称为剩余参数或rest参数

&emsp;&emsp;在函数的命名参数前添加三个点(...)就表明这是一个不定参数，该参数为一个数组，包含着自它之后传入的所有参数，通过这个数组名即可逐一访问里面的参数

```
function pick(object, ...keys) {
    let result = Object.create(null);
    for (let i = 0, len = keys.length; i < len; i++) {
        result[keys[i]] = object[keys[i]];
    }
    return result;
}
```

&emsp;&emsp;在这个函数中，不定参数keys包含的是object之后传入的所有参数，而arguments对象包含的则是所有传入的参数，包括object。这样一来，就可以放心地遍历keys对象了。这种方法还有另一个好处，只需看一眼函数就可以知道该函数可以处理的参数数量

【使用限制】

&emsp;&emsp;不定参数有两条使用限制

&emsp;&emsp;1、每个函数最多只能声明一个不定参数，而且一定要放在所有参数的末尾

```
// 语法错误：不能在剩余参数后使用具名参数
function pick(object, ...keys, last) {
    let result = Object.create(null);
    for (let i = 0, len = keys.length; i < len; i++) {
        result[keys[i]] = object[keys[i]];
    }
    return result;
}
```

&emsp;&emsp;2、不定参数不能在对象字面量的 setter 属性中使用

```
let object = {
    // 语法错误：不能在 setter 中使用剩余参数
    set name(...value) {
        // 一些操作
    }
};
```

&emsp;&emsp;之所以存在这条限制，是因为对象字面量setter的参数有且只能有一个。而在不定参数的定义中，参数的数量可以无限多，所以在当前上下文中不允许使用不定参数

【arguments】

&emsp;&emsp;不定参数的设计初衷是代替JS的arguments对象。起初，在ES4草案中，arguments对象被移除并添加了不定参数的特性，从而可以传入不限数量的参数。但是ES4从未被标准化，这个想法被搁置下来，直到重新引入了ES6标准，唯一的区别是arguments对象依然存在

```
function checkArgs(n,...args) {
    console.log(args.length);//2
    console.log(arguments.length);//3
    console.log(args);//['b','c']
    console.log(arguments);//['a','b','c']
}
checkArgs("a", "b", "c");
```

【应用】

&emsp;&emsp;不定参数中的变量代表一个数组，所以数组特有的方法都可以用于这个变量

```
// arguments变量的写法
function sortNumbers() {
  return Array.prototype.slice.call(arguments).sort();
}

// 不定参数的写法
const sortNumbers = (...numbers) => numbers.sort();
```

&emsp;&emsp;上面代码的两种写法，比较后可以发现，不定参数的写法更自然也更简洁

&nbsp;

### 展开运算符

&emsp;&emsp;在所有的新功能中，与不定参数最相似的是展开运算符。不定参数可以指定多个各自独立的参数，并通过整合后的数组来访问；而展开运算符可以指定一个数组，将它们打散后作为各自独立的参数传入函数。JS内建的Math.max()方法可以接受任意数量的参数并返回值最大的那一个

```
let value1 = 25,
value2 = 50;
console.log(Math.max(value1, value2)); // 50
```

&emsp;&emsp;如上例所示，如果只处理两个值，那么Math.max()非常简单易用。传入两个值后返回更大的那一个。但是如果想从一个数组中挑选出最大的那个值应该怎么做呢?Math.max()方法不允许传入数组，所以在ES5中，可能需要手动实现从数组中遍历取值，或者使用apply()方法

```
let values = [25, 50, 75, 100]
console.log(Math.max.apply(Math, values)); // 100
```

&emsp;&emsp;这个解决方案确实可行，但却让人很难看懂代码的真正意图

&emsp;&emsp;使用ES6中的展开运算符可以简化上述示例，向Math.max()方法传入一个数组，再在数组前添加不定参数中使用的...符号，就无须再调用apply()方法了。JS引擎读取这段程序后会将参数数组分割为各自独立的参数并依次传入

```
let values = [25, 50, 75, 100]
// 等价于 console.log(Math.max(25, 50, 75, 100));
console.log(Math.max(...values)); // 100
```

&emsp;&emsp;使用apply()方法需要手动指定this的绑定，如果使用展开运算符可以使这种简单的数学运算看起来更加简洁

&emsp;&emsp;可以将展开运算符与其他正常传入的参数混合使用。假设限定Math.max()返回的最小值为0，可以单独传入限定值，其他的参数仍然使用展开运算符得到

```
let values = [-25, -50, -75, -100]
console.log(Math.max(...values, 0)); // 0
```

&emsp;&emsp;在这个示例中，Math.max()函数先用展开运算符传入数组中的值，又传入了参数0

&emsp;&emsp;展开运算符可以简化使用数组给函数传参的编码过程，在大多数使用apply()方法的情况下展开运算符可能是一个更合适的方案

&nbsp;

### 严格模式

&emsp;&emsp;从 ES5 开始，函数内部可以设定为严格模式

```
function doSomething(a, b) {
  'use strict';
  // code
}
```

&emsp;&emsp;ES7做了一点修改，规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错

```
// 报错
function doSomething(a, b = a) {
  'use strict';
  // code
}

// 报错
const doSomething = function ({a, b}) {
  'use strict';
  // code
};

// 报错
const doSomething = (...a) => {
  'use strict';
  // code
};

const obj = {
  // 报错
  doSomething({a, b}) {
    'use strict';
    // code
  }
};
```

&emsp;&emsp;这样规定的原因是，函数内部的严格模式，同时适用于函数体和函数参数。但是，函数执行的时候，先执行函数参数，然后再执行函数体。这样就有一个不合理的地方，只有从函数体之中，才能知道参数是否应该以严格模式执行，但是参数却应该先于函数体执行

```
// 报错
function doSomething(value = 070) {
  'use strict';
  return value;
}
```

&emsp;&emsp;上面代码中，参数`value`的默认值是八进制数`070`，但是严格模式下不能用前缀`0`表示八进制，所以应该报错。但是实际上，JS引擎会先成功执行`value = 070`，然后进入函数体内部，发现需要用严格模式执行，这时才会报错

&emsp;&emsp;虽然可以先解析函数体代码，再执行参数代码，但是这样无疑就增加了复杂性。因此，标准索性禁止了这种用法，只要参数使用了默认值、解构赋值、或者扩展运算符，就不能显式指定严格模式。

&emsp;&emsp;两种方法可以规避这种限制：

&emsp;&emsp;1、设定全局性的严格模式

```
'use strict';
function doSomething(a, b = a) {
  // code
}
```

&emsp;&emsp;2、把函数包在一个无参数的立即执行函数里面

```
const doSomething = (function () {
  'use strict';
  return function(value = 42) {
    return value;
  };
}());
```

&nbsp;

### 构造函数

&emsp;&emsp;Function构造函数是JS语法中很少被用到的一部分，通常我们用它来动态创建新的函数。这种构造函数接受字符串形式的参数，分别为函数参数及函数体

```
var add = new Function("first", "second", "return first + second");
console.log(add(1, 1)); // 2
```

&emsp;&emsp;ES6增强了Function构造函数的功能，支持在创建函数时定义默认参数和不定参数。唯一需要做的是在参数名后添加一个等号及一个默认值

```
var add = new Function("first", "second = first","return first + second");
console.log(add(1, 1)); // 2
console.log(add(1)); // 2
```

&emsp;&emsp;在这个示例中，调用add(1)时只传入一个参数，参数second被赋值为first的值。这种语法与不使用Function声明函数很像

&emsp;&emsp;定义不定参数，只需在最后一个参数前添加...

```
var pickFirst = new Function("...args", "return args[0]");
console.log(pickFirst(1, 2)); // 1
```

&emsp;&emsp;在这段创建函数的代码中，只定义了一个不定参数，函数返回传入的第一个参数。对于Function构造函数，新增的默认参数和不定参数这两个特性使其具备了与声明式创建函数相同的能力

&nbsp;&nbsp;

### 参数尾逗号

&emsp;&emsp;ES8允许函数的最后一个参数有尾逗号（trailing comma）。

&emsp;&emsp;此前，函数定义和调用时，都不允许最后一个参数后面出现逗号

```
function clownsEverywhere(
  param1,
  param2
) { /* ... */ }

clownsEverywhere(
  'foo',
  'bar'
);
```

&emsp;&emsp;上面代码中，如果在`param2`或`bar`后面加一个逗号，就会报错。

&emsp;&emsp;如果像上面这样，将参数写成多行（即每个参数占据一行），以后修改代码的时候，想为函数`clownsEverywhere`添加第三个参数，或者调整参数的次序，就势必要在原来最后一个参数后面添加一个逗号。这对于版本管理系统来说，就会显示添加逗号的那一行也发生了变动。这看上去有点冗余，因此新的语法允许定义和调用时，尾部直接有一个逗号

```
function clownsEverywhere(
  param1,
  param2,
) { /* ... */ }

clownsEverywhere(
  'foo',
  'bar',
);
```

&emsp;&emsp;这样的规定使得函数参数与数组和对象的尾逗号规则保持一致了

&nbsp;

### name属性

&emsp;&emsp;由于在JS中有多种定义函数的方式，因而辨别函数就是一项具有挑战性的任务。此外，匿名函数表达式的广泛使用更是加大了调试的难度，开发者们经常要追踪难以解读的栈记录。为了解决这些问题，ES6为所有函数新增了name属性

&emsp;&emsp;ES6中所有的函数的name属性都有一个合适的值&nbsp;

```
function doSomething() {
    // ...
}
var doAnotherThing = function() {
    // ...
};
console.log(doSomething.name); // "doSomething"
console.log(doAnotherThing.name); // "doAnotherThing"
```

&emsp;&emsp;在这段代码中，dosomething()函数的name属性值为"dosomething"，对应着声明时的函数名称；匿名函数表达式doAnotherThing()的name属性值为"doAnotherThing"，对应着被赋值为该匿名函数的变量的名称

【特殊情况】

&emsp;&emsp;尽管确定函数声明和函数表达式的名称很容易，ES6还是做了更多的改进来确保所有函数都有合适的名称

```
var doSomething = function doSomethingElse() {
    // ...
};
var person = {
    get firstName() {
        return "huochai"
    },
    sayName: function() {
        console.log(this.name);
    }
}
console.log(doSomething.name); // "doSomethingElse"
console.log(person.sayName.name); // "sayName"
var descriptor = Object.getOwnPropertyDescriptor(person, "firstName");
console.log(descriptor.get.name); // "get firstName"
```

&emsp;&emsp;在这个示例中，dosomething.name的值为"dosomethingElse"，是由于函数表达式有一个名字，这个名字比函数本身被赋值的变量的权重高

&emsp;&emsp;person.sayName()的name属性的值为"sayName"，因为其值取自对象字面量。与之类似，person.firstName实际上是一个getter函数，所以它的名称为"get firstName"，setter函数的名称中当然也有前缀"set"

&emsp;&emsp;还有另外两个有关函数名称的特例：通过bind()函数创建的函数，其名称将带有"bound"前缀；通过Function构造函数创建的函数，其名称将带有前缀"anonymous"

```
var doSomething = function() {
    // ...
};
console.log(doSomething.bind().name); // "bound doSomething"
console.log((new Function()).name); // "anonymous"
```

&emsp;&emsp;绑定函数的name属性总是由被绑定函数的name属性及字符串前缀"bound"组成，所以绑定函数dosomething()的name属性值为"bound&nbsp;dosomething"

&emsp;&emsp;注意:函数name属性的值不一定引用同名变量，它只是协助调试用的额外信息，所以不能使用name属性的值来获取对于函数的引用

&nbsp;

### 判断调用

&emsp;&emsp;ES5中的函数结合new使用，函数内的this值将指向一个新对象，函数最终会返回这个新对象

```
function Person(name) {
    this.name = name;
}
var person = new Person("huochai");
var notAPerson = Person("huochai");
console.log(person); // "[Object object]"
console.log(notAPerson); // "undefined"
```

&emsp;&emsp;给notAperson变量赋值时，没有通过new关键字来调用person()，最终返回undefined(如果在非严格模式下，还会在全局对象中设置一个name属性)。只有通过new关键字调用person()时才能体现其能力，就像常见的JS程序中显示的那样

&emsp;&emsp;而在ES6中，函数混乱的双重身份终于将有一些改变

&emsp;&emsp;JS函数有两个不同的内部方法：[[Call]]和[[Construct]]

&emsp;&emsp;当通过new关键字调用函数时，执行的是[[construct]]函数，它负责创建一个通常被称作实例的新对象，然后再执行函数体，将this绑定到实例上

&emsp;&emsp;如果不通过new关键字调用函数，则执行[[call]]函数，从而直接执行代码中的函数体

&emsp;&emsp;具有[[construct]]方法的函数被统称为构造函数

&emsp;&emsp;注意:不是所有函数都有[[construct]]方法，因此不是所有函数都可以通过new来调用

【ES5判断函数被调用】

&emsp;&emsp;在ES5中，如果想确定一个函数是否通过new关键字被调用，或者说，判断该函数是否作为构造函数被调用，最常用的方式是使用instanceof操作符

```
function Person(name) {
    if (this instanceof Person) {
        this.name = name; // 使用 new
    } else {
        throw new Error("You must use new with Person.")
    }
}
var person = new Person("huochai");
var notAPerson = Person("huochai"); // 抛出错误
```

&emsp;&emsp;在这段代码中，首先检查this的值，看它是否为构造函数的实例，如果是，则继续正常执行。如果不是，则抛出错误。由于[[construct]]方法会创建一个person的新实例，并将this绑定到新实例上，通常来讲这样做是正确的

&emsp;&emsp;但这个方法也不完全可靠，因为有一种不依赖new关键字的方法也可以将this绑定到person的实例上

```
function Person(name) {
    if (this instanceof Person) {
        this.name = name; // 使用 new
    } else {
        throw new Error("You must use new with Person.")
    }
}
var person = new Person("huochai");
var notAPerson = Person.call(person, "huochai"); // 不报错
```

&emsp;&emsp;调用person.call()时将变量person传入作为第一个参数，相当于在person函数里将this设为了person实例。对于函数本身，无法区分是通过person.call()(或者是person.apply())还是new关键字调用得到的person的实例

【元属性new.target】

&emsp;&emsp;为了解决判断函数是否通过new关键字调用的问题，ES6引入了new.target这个元属性。元属性是指非对象的属性，其可以提供非对象目标的补充信息(例如new)。当调用函数的[[construct]]方法时，new.target被赋值为new操作符的目标，通常是新创建对象实例，也就是函数体内this的构造函数；如果调用[[call]]方法，则new.target的值为undefined

&emsp;&emsp;有了这个元属性，可以通过检查new.target是否被定义过，检测一个函数是否是通过new关键字调用的

```
function Person(name) {
    if (typeof new.target !== "undefined") {
        this.name = name; // 使用 new
    } else {
        throw new Error("You must use new with Person.")
    }
}
var person = new Person("huochai");
var notAPerson = Person.call(person, "match"); // 出错！
```

&emsp;&emsp;也可以检查new.target是否被某个特定构造函数所调用

```
function Person(name) {
    if (new.target === Person) {
        this.name = name; // 使用 new
    } else {
        throw new Error("You must use new with Person.")
    }
}
function AnotherPerson(name) {
    Person.call(this, name);
}
var person = new Person("huochai");
var anotherPerson = new AnotherPerson("huochai"); // 出错！
```

&emsp;&emsp;在这段代码中，如果要让程序正确运行，new.target一定是person。当调用 new Anotherperson("huochai") 时, 真正的调用Person. call(this,name)没有使用new关键字，因此new.target的值为undefined会抛出错误

&emsp;&emsp;注意:在函数外使用new.target是一个语法错误

### 块级函数

&emsp;&emsp;在ES3中，在代码块中声明一个函数(即块级函数)严格来说应当是一个语法错误， 但所有的浏览器都支持该语法。不幸的是，每个浏览器对这个特性的支持都稍有不同，所以最好不要在代码块中声明函数，更好的选择是使用函数表达式

&emsp;&emsp; 为了遏制这种不兼容行为， ES5的严格模式为代码块内部的函数声明引入了一个错误

```
"use strict";
if (true) {
    // 在 ES5 会抛出语法错误， ES6 则不会
    function doSomething() {
        // ...
    }
}
```

&emsp;&emsp;在ES5中，代码会抛出语法错误。而在ES6中，会将dosomething()函数视为一个块级声明，从而可以在定义该函数的代码块内访问和调用它

```
"use strict";
if (true) {
    console.log(typeof doSomething); // "function"
    function doSomething() {
        // ...
    }
    doSomething();
}
console.log(typeof doSomething); // "undefined"
```

&emsp;&emsp;在定义函数的代码块内，块级函数会被提升至顶部，所以typeof dosomething的值为"function"，这也佐证了，即使在函数定义的位置前调用它，还是能返回正确结果。但是一旦if语句代码块结束执行，dosomething()函数将不再存在

【使用场景】

&emsp;&emsp;块级函数与let函数表达式类似，一旦执行过程流出了代码块，函数定义立即被移除。二者的区别是，在该代码块中，块级函数会被提升至块的顶部，而用let定义的函数表达式不会被提升

```
"use strict";
if (true) {
    console.log(typeof doSomething); // 抛出错误
    let doSomething = function () {
        // ...
    }
    doSomething();
}
console.log(typeof doSomething);
```

&emsp;&emsp;在这段代码中，当执行到typeof dosomething时，由于此时尚未执行let声明语句，dosomething()还在当前块作用域的临时死区中，因此程序被迫中断执行

&emsp;&emsp;因此，如果需要函数提升至代码块顶部，则选择块级函数；如果不需要，则选择let表达式

【非严格模式】

&emsp;&emsp;在ES6中，即使处于非严格模式下，也可以声明块级函数，但其行为与严格模式下稍有不同。这些函数不再提升到代码块的顶部，而是提升到外围函数或全局作用域的顶部

```
// ES6 behavior
if (true) {
    console.log(typeof doSomething); // "function"
    function doSomething() {
        // ...
    }
    doSomething();
}
console.log(typeof doSomething); // "function"
```

&emsp;&emsp;在这个示例中，dosomething()函数被提升至全局作用域，所以在if代码块外也可以访问到。ES6将这个行为标准化了，移除了之前存在于各浏览器间不兼容的行为，所以所有ES6的运行时环境都将执行这一标准

&nbsp;

### 箭头函数

&emsp;&emsp;在ES6中，箭头函数是其中最有趣的新增特性。顾名思义，箭头函数是一种使用箭头`=>`定义函数的新语法，但是它与传统的JS函数有些许不同，主要集中在以下方面&nbsp;

&emsp;&emsp;1、没有this、super、arguments和new.target

&emsp;&emsp;绑定箭头函数中的this、super、arguments和new.target这些值由外围最近一层非箭头函数决定

&emsp;&emsp;2、不能通过new关键字调用

&emsp;&emsp;箭头函数没有[[construct]]方法，不能被用作构造函数，如果通过new关键字调用箭头函数，程序抛出错误

&emsp;&emsp;3、没有原型

&emsp;&emsp;由于不可以通过new关键字调用箭头函数，因而没有构建原型的需求，所以箭头函数不存在prototype这个属性

&emsp;&emsp;4、不可以改变this绑定

&emsp;&emsp;函数内部的this值不可被改变，在函数的生命周期内始终保持一致

&emsp;&emsp;5、不支持arguments对象

&emsp;&emsp;箭头函数没有arguments绑定，必须通过命名参数和不定参数这两种形式访问函数的参数

&emsp;&emsp;6、不支持重复的命名参数

&emsp;&emsp;无论在严格还是非严格模式下，箭头函数都不支持重复的命名参数；而在传统函数的规定中，只有在严格模式下才不能有重复的命名参数

&emsp;&emsp;在箭头函数内，其余的差异主要是减少错误以及理清模糊不清的地方。这样一来，JS引擎就可以更好地优化箭头函数的执行过程

&emsp;&emsp;这些差异的产生有如下几个原因

&emsp;&emsp;1、最重要的是，this绑定是JS程序中一个常见的错误来源，在函数内很容易对this的值失去控制，其经常导致程序出现意想不到的行为，箭头函数消除了这方面的烦恼

&emsp;&emsp;2、如果限制箭头函数的this值，简化代码执行的过程，则JS引擎可以更轻松地优化这些操作，而常规函数往往同时会作为构造函数使用或者以其他方式对其进行修改

&emsp;&emsp;注意:箭头函数同样也有一个name属性，这与其他函数的规则相同

【语法】

&emsp;&emsp;箭头函数的语法多变，根据实际的使用场景有多种形式。所有变种都由函数参数、箭头、函数体组成，根据使用的需求，参数和函数体可以分别采取多种不同的形式

```
var reflect = value => value;
// 有效等价于：
var reflect = function(value) {
    return value;
};
```

&emsp;&emsp;当箭头函数只有一个参数时，可以直接写参数名，箭头紧随其后，箭头右侧的表达式被求值后便立即返回。即使没有显式的返回语句，这个箭头函数也可以返回传入的第一个参数

&emsp;&emsp;如果要传入两个或两个以上的参数，要在参数的两侧添加一对小括号

```
var sum = (num1, num2) => num1 + num2;
// 有效等价于：
var sum = function(num1, num2) {
    return num1 + num2;
};
```

&emsp;&emsp;这里的sum()函数接受两个参数，将它们简单相加后返回最终结果，它与reflect()函数唯一的不同是，它的参数被包裹在小括号中，并且用逗号进行分隔(类似传统函数)

&emsp;&emsp;如果函数没有参数，也要在声明的时候写一组没有内容的小括号

```
var getName = () => "huochai";
// 有效等价于：
var getName = function() {
    return "huochai";
};
```

&emsp;&emsp;如果希望为函数编写由多个表达式组成的更传统的函数体，那么需要用花括号包裹函数体，并显式地定义一个返回值

```
var sum = (num1, num2) => {
    return num1 + num2;
};
// 有效等价于：
var sum = function(num1, num2) {
    return num1 + num2;
};
```

&emsp;&emsp;除了arguments对象不可用以外，某种程度上都可以将花括号里的代码视作传统的函数体定义

&emsp;&emsp;如果想创建一个空函数，需要写一对没有内容的花括号

```
var doNothing = () => {};
// 有效等价于：
var doNothing = function() {};
```

&emsp;&emsp;花括号代表函数体的部分，但是如果想在箭头函数外返回一个对象字面量，则需要将该字面量包裹在小括号里

```
var getTempItem = id => ({ id: id, name: "Temp" });
// 有效等价于：
var getTempItem = function(id) {
    return {
        id: id,
        name: "Temp"
    };
};
```

&emsp;&emsp;将对象字面量包裹在小括号中是为了将其与函数体区分开来

【IIFE】

&emsp;&emsp;JS函数的一个流行的使用方式是创建立即执行函数表达式(IIFE)，可以定义一个匿名函数并立即调用，自始至终不保存对该函数的引用。当创建一个与其他程序隔离的作用域时，这种模式非常方便

```
let person = function(name) {
    return {
        getName: function() {
            return name;
        }
    };
}("huochai");
console.log(person.getName()); // "huochai"
```

&emsp;&emsp;在这段代码中，IIFE通过getName()方法创建了一个新对象，将参数name作为该对象的一个私有成员返回给函数的调用者

&emsp;&emsp;只要将箭头函数包裹在小括号里，就可以用它实现相同的功能

```
let person = ((name) => {
    return {
        getName: function() {
            return name;
        }
    };
})("huochai");
console.log(person.getName()); // "huochai"
```

&emsp;&emsp;注意:小括号只包裹箭头函数定义，没有包含("huochai")，这一点与正常函数有所不同，由正常函数定义的立即执行函数表达式既可以用小括号包裹函数体，也可以额外包裹函数调用的部分

【this】

&emsp;&emsp;函数内的this绑定是JS中最常出现错误的因素，函数内的this值可以根据函数调用的上下文而改变，这有可能错误地影响其他对象

```
var PageHandler = {
    id: "123456",
    init: function() {
        document.addEventListener("click", function(event) {
            this.doSomething(event.type); // 错误
        }, false);
    },
    doSomething: function(type) {
        console.log("Handling " + type + " for " + this.id);
    }
};
```

&emsp;&emsp;在这段代码中，对象pageHandler的设计初衷是用来处理页面上的交互，通过调用init()方法设置交互，依次分配事件处理程序来调用this.dosomething()。然而，这段代码并没有如预期的正常运行

&emsp;&emsp;实际上，因为this绑定的是事件目标对象的引用(在这段代码中引用的是document)，而没有绑定pageHandler，且由于this.dosonething()在目标document中不存在，所以无法正常执行，尝试运行这段代码只会使程序在触发事件处理程序时抛出错误

&emsp;&emsp;可以使用bind()方法显式地将this绑定到pageHandler函数上来修正这个问题

```
var PageHandler = {
    id: "123456",
    init: function() {
        document.addEventListener("click", (function(event) {
            this.doSomething(event.type); // 错误
        }).bind(this), false);
    },
    doSomething: function(type) {
        console.log("Handling " + type + " for " + this.id);
    }
};
```

&emsp;&emsp;现在代码如预期的运行，但可能看起来仍然有点奇怪。调用bind(this)后，事实上创建了一个新函数，它的this被绑定到当前的this，也就是page Handler

&emsp;&emsp;可以通过一个更好的方式来修正这段代码：使用箭头函数

&emsp;&emsp;箭头函数中没有this绑定，必须通过查找作用城链来决定其值。如果箭头函数被非箭头函数包含，则this绑定的是最近一层非箭头函数的this；否则，this的值会被设置为undefined

```
var PageHandler = {
    id: "123456",
    init: function() {
        document.addEventListener("click",
            event => this.doSomething(event.type), false);
        },
    doSomething: function(type) {
        console.log("Handling " + type + " for " + this.id);
    }
};
```

&emsp;&emsp;这个示例中的事件处理程序是一个调用了this.doSomething()的箭头函数，此处的this与init()函数里的this一致，所以此版本代码的运行结果与使用bind(this)一致。虽然dosomething()方法不返回值，但是它仍是函数体内唯一的一条执行语句，所以不必用花括号将它包裹起来

&emsp;&emsp;箭头函数缺少正常函数所拥有的prototype属性，它的设计初衷是即用即弃，所以不能用它来定义新的类型。如果尝试通过new关键字调用一个箭头函数，会导致程序抛出错误

```
var MyType = () => {},
object = new MyType(); // 错误：不能对箭头函数使用 'new'
```

&emsp;&emsp;在这段代码中，MyType是一个没有[[Construct]]方法的箭头函数，所以不能正常执行new MyType()。也正因为箭头函数不能与new关键字混用，所以JS引擎可以进一步优化它们的行为。同样，箭头函数中的this值取决于该函数外部非箭头函数的this值，且不能通过call()、apply()或bind()方法来改变this的值

【数组】&nbsp;

&emsp;&emsp;箭头函数的语法简洁，非常适用于数组处理。如果想给数组排序，通常需要写一个自定义的比较器

```
var result = values.sort(function(a, b) {
    return a - b;
});
```

&emsp;&emsp;只想实现一个简单功能，但这些代码实在太多了。用箭头函数简化如下

```
var result = values.sort((a, b) => a - b);
```

&emsp;&emsp;诸如sort()、map()及reduce()这些可以接受回调函数的数组方法，都可以通过箭头函数语法简化编码过程并减少编码量

```
// 正常函数写法
[1,2,3].map(function (x) {
  return x * x;
});

// 箭头函数写法
[1,2,3].map(x => x * x);
```

【arguments】

&emsp;&emsp;箭头函数没有自己的arguments对象，且未来无论函数在哪个上下文中执行，箭头函数始终可以访问外围函数的arguments对象

```
function createArrowFunctionReturningFirstArg() {
    return () => arguments[0];
}
var arrowFunction = createArrowFunctionReturningFirstArg(5);
console.log(arrowFunction()); // 5
```

&emsp;&emsp;在createArrowFunctionReturningFirstArg()中，箭头函数引用了外围函数传入的第一个参数arguments[0]，也就是后续执行过程中传入的数字5。即使函数箭头此时已不再处于创建它的函数的作用域中，却依然可以访问当时的arguments对象，这是arguments标识符的作用域链解决方案所规定的

【辨识方法】

&emsp;&emsp;尽管箭头函数与传统函数的语法不同，但它同样可以被识别出来

```
var comparator = (a, b) => a - b;
console.log(typeof comparator); // "function"
console.log(comparator instanceof Function); // true
```

&emsp;&emsp;同样地，仍然可以在箭头函数上调用call()、apply()及bind()方法，但与其他函数不同的是，箭头函数的this值不会受这些方法的影响

```
var sum = (num1, num2) => num1 + num2;
console.log(sum.call(null, 1, 2)); // 3
console.log(sum.apply(null, [1, 2])); // 3
var boundSum = sum.bind(null, 1, 2);
console.log(boundSum()); // 3
```

&emsp;&emsp;包括回调函数在内所有使用匿名函数表达式的地方都适合用箭头函数来改写

【函数柯里化】

&emsp;&emsp;柯里化是一种把接受多个参数的函数变换成接受一个单一参数的函数，并且返回（接受余下的参数而且返回结果的）新函数的技术

&emsp;&emsp;如果使用ES5的语法来写，如下所示

```
function add(x){
  return function(y){
    return y + x;
  };
}

var addTwo = add(2);
addTwo(3);          // => 5
add(10)(11);        // => 21
```

&emsp;&emsp;使用ES6的语法来写，如下所示

```
var add = (x) => (y) => x+y
```

&emsp;&emsp;一般来说，出现连续地箭头函数调用的情况，就是在使用函数柯里化的技术

&nbsp;

### 尾调用优化

&emsp;&emsp;ES6关于函数最有趣的变化可能是尾调用系统的引擎优化。尾调用指的是函数作为另一个函数的最后一条语句被调用

```
function doSomething() {
    return doSomethingElse(); // 尾调用
}
```

&emsp;&emsp;尾调用之所以与其他调用不同，就在于它的特殊的调用位置

&emsp;&emsp;我们知道，函数调用会在内存形成一个&ldquo;调用记录&rdquo;，又称&ldquo;调用帧&rdquo;（call frame），保存调用位置和内部变量等信息。如果在函数`A`的内部调用函数`B`，那么在`A`的调用帧上方，还会形成一个`B`的调用帧。等到`B`运行结束，将结果返回到`A`，`B`的调用帧才会消失。如果函数`B`内部还调用函数`C`，那就还有一个`C`的调用帧，以此类推。所有的调用帧，就形成一个&ldquo;调用栈&rdquo;（call stack）

&emsp;&emsp;尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了

&emsp;&emsp;尾调用优化（Tail call optimization），即只保留内层函数的调用帧。如果所有函数都是尾调用，那么完全可以做到每次执行时，调用帧只有一项，这将大大节省内存

&emsp;&emsp;ES6缩减了严格模式下尾调用栈的大小(非严格模式下不受影响)，如果满足以下条件，尾调用不再创建新的栈帧，而是清除并重用当前栈帧

&emsp;&emsp;1、尾调用不访问当前栈帧的变量(也就是说函数不是一个闭包)

&emsp;&emsp;2、在函数内部，尾调用是最后一条语句

&emsp;&emsp;3、尾调用的结果作为函数值返回

&emsp;&emsp;以下这段示例代码满足上述的三个条件，可以被JS引擎自动优化

```
"use strict";
function doSomething() {
    // 被优化
    return doSomethingElse();
}
```

&emsp;&emsp;在这个函数中，尾调用doSomethingElse()的结果立即返回，不调用任何局部作用域变量。如果做一个小改动，不返回最终结果，那么引擎就无法优化当前函数

```
"use strict";
function doSomething() {
    // 未被优化：缺少 return
    doSomethingElse();
}
```

&emsp;&emsp;同样地，如果定义了一个函数，在尾调用返回后执行其他操作，则函数也无法得到优化

```
"use strict";
function doSomething() {
    // 未被优化：在返回之后还要执行加法
    return 1 + doSomethingElse();
}
```

&emsp;&emsp;如果把函数调用的结果存储在一个变量里，最后再返回这个变量，则可能导致引擎无法优化

```
"use strict";
function doSomething() {
    // 未被优化：调用并不在尾部
    var result = doSomethingElse();
    return result;
}
```

&emsp;&emsp;可能最难避免的情况是闭包的使用，它可以访问作用域中所有变量，因而导致尾调用优化失效

```
"use strict";
function doSomething() {
    var num = 1,
    func = () => num;
    // 未被优化：此函数是闭包
    return func();
}
```

&emsp;&emsp;在示例中，闭包func()可以访问局部变量num，即使调用func()后立即返回结果，也无法对代码进行优化

【应用】

&emsp;&emsp;实际上，尾调用的优化发生在引擎背后，除非尝试优化一个函数，否则无须思考此类问题。递归函数是其最主要的应用场景，此时尾调用优化的效果最显著

```
function factorial(n) {
    if (n <= 1) {
        return 1;
    } else {
        // 未被优化：在返回之后还要执行乘法
        return n * factorial(n - 1);
    }
}
```

&emsp;&emsp;由于在递归调用前执行了乘法操作，因而当前版本的阶乘函数无法被引擎优化。如果n是一个非常大的数，则调用栈的尺寸就会不断增长并存在最终导致栈溢出的潜在风险

&emsp;&emsp;优化这个函数，首先要确保乘法不会在函数调用后执行，可以通过默认参数来将乘法操作移出return语句，结果函数可以携带着临时结果进入到下一个迭代中

```
function factorial(n, p = 1) {
    if (n <= 1) {
        return 1 * p;
    } else {
        let result = n * p;
        // 被优化
        return factorial(n - 1, result);
    }
}
```

&emsp;&emsp;在这个重写后的factorial()函数中，第一个参数p的默认值为1，用它来保存乘法结果，下一次迭代中可以取出它用于计算，不再需要额外的函数调用。当n大于1时，先执行一轮乘法计算，然后将结果传给第二次factorial()调用的参数。现在，ES6引擎就可以优化递归调用了

&emsp;&emsp;写递归函数时，最好得用尾递归优化的特性，如果递归函数的计算量足够大，则尾递归优化可以大幅提升程序的性能

&emsp;&emsp;另一个常见的事例是Fibonacci数列

```
function Fibonacci (n) {
  if ( n <= 1 ) {return 1};
  return Fibonacci(n - 1) + Fibonacci(n - 2);
}

Fibonacci(10) // 89
Fibonacci(100) // 堆栈溢出
Fibonacci(500) // 堆栈溢出
```

&emsp;&emsp;尾递归优化过的 Fibonacci 数列实现如下

```
function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
  if( n <= 1 ) {return ac2};
  return Fibonacci2 (n - 1, ac2, ac1 + ac2);
}

Fibonacci2(100) // 573147844013817200000
Fibonacci2(1000) // 7.0330367711422765e+208
Fibonacci2(10000) // Infinity
```

&emsp;&emsp;由此可见，&ldquo;尾调用优化&rdquo;对递归操作意义重大，所以一些函数式编程语言将其写入了语言规格。ES6 是如此，第一次明确规定，所有 ECMAScript 的实现，都必须部署&ldquo;尾调用优化&rdquo;。这就是说，ES6 中只要使用尾递归，就不会发生栈溢出，相对节省内存

