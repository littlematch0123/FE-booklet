# javascript中的错误处理机制

&emsp;&emsp;错误处理对于web应用程序开发至关重要，不能提前预测到可能发生的错误，不能提前采取恢复策略，可能导致较差的用户体验。由于任何javascript错误都可能导致网页无法使用，因此作为开发人员，必须要知道何时可能出错，为什么会出错，以及会出什么错。本文将详细介绍javascript中的错误处理机制

&nbsp;

### error对象

&emsp;&emsp;error对象是包含错误信息的对象，是javascript的原生对象。当代码解析或运行时发生错误，javascript引擎就会自动产生并抛出一个error对象的实例，然后整个程序就中断在发生错误的地方

```
console.log(t);//Uncaught ReferenceError: t is not defined
```

&emsp;&emsp;ECMA-262规定了error对象包括两个属性：message和name。message属性保存着错误信息，而name属性保存错误类型

```
//一般地，使用try-catch语句来捕获错误
try{
    t;
}catch(ex){
    console.log(ex.message);//t is not defined 
    console.log(ex.name);//ReferenceError
}
```

&emsp;&emsp;浏览器还对error对象的属性做了扩展，添加了其他相关信息。其中各浏览器厂商实现最多的是stack属性，它表示栈跟踪信息(safari不支持)

```
try{
    t;
}catch(ex){
    console.log(ex.stack);//@file:///D:/wamp/www/form.html:12:2
}    
```

&emsp;&emsp;当然，可以使用error()构造函数来创建错误对象。如果指定message参数，则该error对象将把它用做它的message属性；若不指定，它将使用一个预定义的默认字符串作为该属性的值

```
new Error();
new Error(message);    
```
```
//一般地，使用throw语句来抛出错误
throw new Error('test');//Uncaught Error: test
throw new Error();//Uncaught Error
```
```
function UserError(message) {
   this.message = message;
   this.name = "UserError";
}
UserError.prototype = new Error();
UserError.prototype.constructor = UserError;
throw new UserError("errorMessage");//Uncaught UserError: errorMessage
```

&emsp;&emsp;当不使用new操作符，直接将Error()构造函数像一个函数一样调用时，它的行为和带new操作符调用时一样

```
Error();
Error(message);    
```
```
throw Error('test');//Uncaught Error: test
throw Error();//Uncaught Error
```

&emsp;&emsp;error对象有一个toString()方法，返回'Error:'+ error对象的message属性

```
var test = new Error('testError');
console.log(test.toString());//'Error: testError'
```

&nbsp;

### error类型

&emsp;&emsp;执行代码期间可能会发生的错误有多种类型。每种错误都有对应的错误类型，而当错误发生时，就会抛出相应类型的错误对象。ECMA-262定义了下列7种错误类型：

```
Error
EvalError(eval错误)
RangeError(范围错误)
ReferenceError(引用错误)
SyntaxError(语法错误)
TypeError(类型错误)
URIError(URI错误)
```

&emsp;&emsp;其中，Error是基类型，其他错误类型都继承自该类型。因此，所有错误类型共享了一组相同的属性。Error类型的错误很少见，如果有也是浏览器抛出的；这个基类型的主要目的是供开发人员抛出自定义错误

【EvalError(eval错误)】

&emsp;&emsp;eval函数没有被正确执行时，会抛出EvalError错误。该错误类型已经不再在ES5中出现了，只是为了保证与以前代码兼容，才继续保留

【RangeError(范围错误)】

&emsp;&emsp;RangeError类型的错误会在一个值超出相应范围时触发，主要包括超出数组长度范围以及超出数字取值范围等

```
new Array(-1);//Uncaught RangeError: Invalid array length
new Array(Number.MAX_VALUE);//Uncaught RangeError: Invalid array length

(1234).toExponential(21);//Uncaught RangeError: toExponential() argument must be between 0 and 20
(1234).toExponential(-1);////Uncaught RangeError: toExponential() argument must be between 0 and 20
```

【ReferenceError(引用错误)】

&emsp;&emsp;引用一个不存在的变量或[左值](http://www.cnblogs.com/xiaohuochai/p/5666530.html#anchor4)(lvalue)类型错误时，会触发ReferenceError(引用错误)

```
a;//Uncaught ReferenceError: a is not defined
1++;//Uncaught ReferenceError: Invalid left-hand side expression in postfix operation
```

【SyntaxError(语法错误)】

&emsp;&emsp;当不符合语法规则时，会抛出SyntaxError(语法错误)

```
//变量名错误
var 1a;//Uncaught SyntaxError: Unexpected number

// 缺少括号
console.log 'hello');//Uncaught SyntaxError: Unexpected string
```

【TypeError(类型错误)】

&emsp;&emsp;在变量中保存着意外的类型时，或者在访问不存在的方法时，都会导致TypeError类型错误。错误的原因虽然多种多样，但归根结底还是由于在执行特定类型的操作时，变量的类型并不符合要求所致

```
var o = new 10;//Uncaught TypeError: 10 is not a constructor
alert('name' in true);//Uncaught TypeError: Cannot use 'in' operator to search for 'name' in true
Function.prototype.toString.call('name');//Uncaught TypeError: Function.prototype.toString is not generic
```

【URIError(URI错误)】

&emsp;&emsp;URIError是[URI](http://www.cnblogs.com/xiaohuochai/p/6144157.html)相关函数的参数不正确时抛出的错误，主要涉及encodeURI()、decodeURI()、encodeURIComponent()、decodeURIComponent()、escape()和unescape()这六个函数

```
decodeURI('%2');// URIError: URI malformed
```

&nbsp;

### error事件

&emsp;&emsp;任何没有通过try-catch处理的错误都会触发window对象的error事件

&emsp;&emsp;error事件可以接收三个参数：错误消息、错误所在的URL和行号。多数情况下，只有错误消息有用，因为URL只是给出了文档的位置，而行号所指的代码行既可能出自嵌入的javascript代码，也可能出自外部的文件

&emsp;&emsp;要指定onerror事件处理程序，可以使用DOM0级技术，也可以使用DOM2级事件的标准格式

```
//DOM0级
window.onerror = function(message,url,line){
    alert(message);
}
//DOM2级
window.addEventListener("error",function(message,url,line){
    alert(message);
});
```

&emsp;&emsp;浏览器是否显示标准的错误消息，取决于onerror的返回值。如果返回值为false，则在控制台中显示错误消息；如果返回值为true，则不显示

```
//控制台显示错误消息
window.onerror = function(message,url,line){
    alert(message);
    return false;
}
a;

//控制台不显示错误消息
window.onerror = function(message,url,line){
    alert(message);
    return true;
}
a;
```

&emsp;&emsp;这个事件处理程序是避免浏览器报告错误的最后一道防线。理想情况下，只要可能就不应该使用它。只要能够适当地使用try-catch语句，就不会有错误交给浏览器，也就不会触发error事件

&emsp;&emsp;图像也支持error事件。只要图像的src特性中的URL不能返回可以被识别的图像格式，就会触发error事件。此时的error事件遵循DOM格式，会返回一个以图像为目标的event对象

&emsp;&emsp;加载图像失败时会显示一个警告框。发生error事件时，图像下载过程已经结束，也就是不能再重新下载了

```
var image = new Image();
image.src = 'smilex.gif';
image.onerror = function(e){
    console.log(e);
}
```

&nbsp;

### throw语句与抛出错误

&emsp;&emsp;throw语句用于抛出错误。抛出错误时，必须要给throw语句指定一个值，这个值是什么类型，没有要求

&emsp;&emsp;注意：抛出错误的过程是阻塞的，后续代码将不会执行

```
throw 12345;
throw 'hello world';
throw true;
throw {name: 'javascript'};
```

&emsp;&emsp;可以使用throw语句手动抛出一个Error对象

```
throw new Error('something bad happened');

throw new SyntaxError('I don\'t like your syntax.');
throw new TypeError('what type of variable do you take me for?');
throw new RangeError('sorry,you just don\'t have the range.');
throw new EvalError('That doesn\'t evaluate.');
throw new URIError('URI, is that you?');
throw new ReferenceError('you didn\'t cite your references properly');
```

&emsp;&emsp;利用原型链还可以通过继承Error来创建自定义错误类型。此时，需要为新创建的错误类型指定name和message属性

&emsp;&emsp;浏览器对待继承自Error的自定义错误类型，就像对待其他错误类型一样。如果要捕获自己抛出的错误并且把它与浏览器错误区别对待的话，创建自定义错误是很有用的

```
function CustomError(message){
    this.name = 'CustomError';
    this.message = message;
}
CustomError.prototype = new Error();
throw new CustomError('my message');
```

&emsp;&emsp;在遇到throw语句时，代码会立即停止执行。仅当有try-catch语句捕获到被抛出的值时，代码才会继续执行

&emsp;&emsp;更详细的解释为：当抛出异常时，javascript解释器会立即停止当前正在执行的逻辑，并跳转到就近的异常处理程序。异常处理程序是用try-catch语句的catch从句编写的。如果抛出异常的代码块没有一条相关联的catch从句，解释器会检查更高层的闭合代码块，看它是否有相关联的异常处理程序。以此类推，直到找到一个异常处理程序为止。如果抛出异常的函数没有处理它的try-catch语句，异常将向上传播到调用该函数的代码。这样的话，异常就会沿着javascript方法的词法结构和调用栈向上传播。如果没有找到任何异常处理程序，javascript将把异常当成程序错误来处理，并报告给用户

&nbsp;

### try catch语句与捕获错误

&emsp;&emsp;ECMA-262第3版引入了try-catch语句，作为javascript中处理异常的一种标准方式，用于捕获和处理错误

&emsp;&emsp;其中，try从句定义了需要处理的异常所在的代码块。catch从句跟随在try从句之后，当try块内某处发生了异常时，调用catch内的代码逻辑。catch从句后跟随finally块，后者中放置清理代码，不管try块中是否产生异常，finally块内的逻辑总是会执行。尽管catch和finally都是可选的，但try从句需要至少二者之一与之组成完整的语句

&emsp;&emsp;try/catch/finally语句块都需要使用花括号括起来，这里的花括号是必需的，即使从句中只有一条语句也不能省略花括号

```
try{
    //通常来讲，这里的代码会从头到尾而不会产生任何问题
    //但有时会抛出一个异常，要么是由throw语句直接抛出，要么通过调用一个方法间接抛出
}catch(e){
    //当且仅当try语句块抛出了异常，才会执行这里的代码
    //这里可以通过局部变量e来获得对Error对象或者抛出的其他值的引用
    //这里的代码块可以基于某种原因处理这个异常，也可以忽略这个异常，还可以通过throw语句重新抛出异常
}finally{
    //不管try语句是否抛出了异常，finally里的逻辑总是会执行，终止try语句块的方式有：
    //1、正常终止，执行完语句块的最后一条语句
    //2、通过break、continue或return语句终止
    //3、抛出一个异常，异常被catch从句捕获
    //4、抛出一个异常，异常未被捕获，继续向上传播
}
```

&emsp;&emsp;一般地，把所有可能会抛出错误的代码都放在try语句块中，而把那些用于错误处理的代码放在catch块中

&emsp;&emsp;如果try块中的任何代码发生了错误，就会立即退出代码执行过程，然后接着执行catch块。此时，catch块会接收到一个错误信息的对象，这个对象中包含的实际信息会因浏览器而异，但共同的是有一个保存着错误消息的message属性

&emsp;&emsp;注意：一定要给error对象起个名字，置空会报语法错误

```
try{
    q;
}catch(error){
    alert(error.message);//q is not defined
}

//Uncaught SyntaxError: Unexpected token )
try{
    q;
}catch(){
    alert(error.message);
}
```

&emsp;&emsp;catch接受一个参数，表示try代码块抛出的值

```
function throwIt(exception) {
  try {
    throw exception;
  } catch (e) {
    console.log('Caught: '+ e);
  }
}

throwIt(3);// Caught: 3
throwIt('hello');// Caught: hello
throwIt(new Error('An error happened'));// Caught: Error: An error happened
```

&emsp;&emsp;catch代码块捕获错误之后，程序不会中断，会按照正常流程继续执行下去

```
try{
  throw "出错了";
} catch (e) {
  console.log(111);
}
console.log(222);
// 111
// 222
```

&emsp;&emsp;为了捕捉不同类型的错误，catch代码块之中可以加入判断语句

```
try {
  foo.bar();
} catch (e) {
  if (e instanceof EvalError) {
    console.log(e.name + ": " + e.message);
  } else if (e instanceof RangeError) {
    console.log(e.name + ": " + e.message);
  }
  // ...
}
```

&emsp;&emsp;虽然finally子句在try-catch语句中是可选的，但finally子句一经使用，其代码无论如何都会执行。换句话说，try语句块中的代码全部正常执行，finally子句会执行；如果因为出错而执行了catch语句块，finally子句照样还会执行。只要代码中包含finally子句，则无论try或catch语句块中包含什么代码&mdash;&mdash;甚至return语句，都不会阻止finally子句的执行

```
//由于没有catch语句块，所以错误没有捕获。执行finally代码块以后，程序就中断在错误抛出的地方
function cleansUp() {
  try {
    throw new Error('出错了&hellip;&hellip;');
    console.log('此行不会执行');
  } finally {
    console.log('完成清理工作');
  }
}
cleansUp();
// 完成清理工作
// Error: 出错了&hellip;&hellip;
```
```
function testFinnally(){
    try{
        return 2;
    }catch(error){
        return 1;
    }finally{
        return 0;
    }
}
testFinnally();//0
```

&emsp;&emsp;注意：return语句的count的值，是在finally代码块运行之前，就获取完成了

```
var count = 0;
function countUp() {
  try {
    return count;
  } finally {
    count++;
  }
}
countUp();// 0
console.log(count);// 1
```
```
function f() {
  try {
    console.log(0);
    throw "bug";
  } catch(e) {
    console.log(1);
    return true; // 这句原本会延迟到finally代码块结束再执行
    console.log(2); // 不会运行
  } finally {
    console.log(3);
    return false; // 这句会覆盖掉前面那句return
    console.log(4); // 不会运行
  }
  console.log(5); // 不会运行
}
var result = f();
// 0
// 1
// 3

console.log(result);// false
```

【tips】块级作用域

&emsp;&emsp;try-catch语句的一个常见用途是创建块级作用域，其中声明的变量仅仅在catch内部有效

&emsp;&emsp;ES6引入了let关键字，为其声明的变量创建块级作用域。但是，在目前ES3和ES5的情况下，常常使用try-catch语句来实现类似的效果

&emsp;&emsp;由下面代码可知，e仅存在于catch分句内部，当试图从别处引用它时会抛出错误

```
try{
    throw new Error();//抛出错误
}catch(e){
    console.log(e);//Error(&hellip;)
}
console.log(e);//Uncaught ReferenceError: e is not defined
```

&emsp;&emsp;在IE8-浏览器中，catch语句中捕获的错误对象会被添加到执行环境的变量对象，而不是catch语句的变量对象中。换句话说，即使是在catch块的外部也可以访问到错误对象。IE9修复了这个问题

```
try{
    a;
}catch(e){
    console.log(1);
}
//在标准浏览器中会提示未定义，而在IE8-浏览器会显示错误对象
console.log(e);
```

&nbsp;

### 常见错误

&emsp;&emsp;错误处理的核心是首先要知道代码里会发生什么错误。由于javaScript是松散类型的，而且也不会验证函数的参数，因此错误只会在代码期间出现。一般来说，需要关注三种错误：类型转换错误、数据类型错误、通信错误

【类型转换错误】

&emsp;&emsp;类型转换错误发生在使用某个操作符，或者使用其他可能自动转换值的数据类型的语言结构时

&emsp;&emsp;容易发生类型转换错误的地方是流控制语句。像if之类的语句在确定下一步操作之前，会自动把任何值转换成布尔值。尤其是if语句，如果使用不当，最容易出错

&emsp;&emsp;未使用过的命名变量会自动被赋予undefined值。而undefined值可以被转换成布尔值false，因此下面这个函数中的if语句实际上只适用于提供了第三个参数的情况。问题在于，并不是只有undefined才会被转换成false，也不是只有字符串值才可以转换为true。例如，假设第三个参数是数值0，那么if语句的测试就会失败，而对数值1的测试则会通过

```
function concat(str1,str2,str3){
    var result = str1 + str2;
    if(str3){ //绝对不要这样
        result += str3;
    }
    return result;
}
```

&emsp;&emsp;在流控制语句中使用非布尔值，是极为常见的一个错误来源。为避免此类错误，就要做到在条件比较时切实传入布尔值。实际上，执行某种形式的比较就可以达到这个目的

```
function concat(str1,str2,str3){
    var result = str1 + str2;
    if(typeof str3 == 'string'){ //更合适
        result += str3;
    }
    return result;
}
```

【数据类型错误】

&emsp;&emsp;javascript是松散类型的，在使用变量和函数参数之前，不会对它们进行比较以确保它们的数据类型正确。为了保证不会发生数据类型错误，只能编写适当的数据类型检测代码。在将预料之外的值传递给函数的情况下，最容易发生数据类型错误

```
//不安全的函数，任何非数组值都会导致错误
function reverseSort(values){
    if(values){
        values.sort();
        values.reverse();
    }
}
```

&emsp;&emsp;另一个常见的错误就是将参数与null值进行比较。与null进行比较只能确保相应的值不是null和undefined。要确保传入的值有效，仅检测null值是不够的

```
//不安全的函数，任何非数组值都会导致错误
function reverseSort(values){
    if(values != null){
        values.sort();
        values.reverse();
    }
}
```

&emsp;&emsp;如果传入一个包含sort()方法的对象（而不是数组）会通过检测，但调用reverse()函数时可能会出错

```
//不安全的函数，任何非数组值都会导致错误
function reverseSort(values){
    if(typeof values.sort == 'function'){
        values.sort();
        values.reverse();
    }
}
```

&emsp;&emsp;在确切知道应该传入什么类型的情况下，最好是使用instanceof来检测其数据类型

```
//安全，非数组值被忽略
function reverseSort(values){
    if(values instanceof Array){
        values.sort();
        values.reverse();
    }
}
```

【通信错误】

&emsp;&emsp;随着ajax编程的兴起，Web应用程序在其生命周期内动态加载信息或功能，已经成为一件司空见惯的事。不过，javascript与服务器之间的任何一次通信，都有可能会产生错误

&emsp;&emsp;最常见的问题是在将数据发送给服务器之前，没有使用encodeURIComponent()对数据进行编码

```
//错误
http://www.yourdomain.com/?redir=http://www.sometherdomain.com?a=b&amp;c=d
//针对'redir='后面的所有字符串调用encodeURIComponent()就可以解决这个问题
http://www.yourdomain.com/?redir=http:%3A%2F%2Fwww.sometherdomain.com%3Fa%3Db%26c%3Dd
```

&nbsp;

## 参考资料

【1】 ES5/errors [https://www.w3.org/html/ig/zh/wiki/ES5/errors](https://www.w3.org/html/ig/zh/wiki/ES5/errors)

【2】 阮一峰Javascript标准参考教程&mdash;&mdash;错误处理机制 [http://javascript.ruanyifeng.com/grammar/error.html](http://javascript.ruanyifeng.com/grammar/error.html)

【3】《javascript权威指南(第6版)》第三部分 javascript核心参考

【4】《javascript高级程序设计(第3版)》第17章 错误处理与调试

