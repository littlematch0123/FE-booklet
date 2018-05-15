# ES6——块级作用域

&emsp;&emsp;过去，javascript缺乏块级[作用域](http://www.cnblogs.com/xiaohuochai/p/5699739.html)，var声明时的[声明提升](http://www.cnblogs.com/xiaohuochai/p/5549833.html#anchor6)、[属性变量](http://www.cnblogs.com/xiaohuochai/p/5549833.html#anchor7)等行为让人困惑。ES6的新语法可以帮助我们更好地控制作用域。本文将详细介绍ES6新引入的块级作用域绑定机制、let和const声明机制及最佳实践

&nbsp;

### var声明

【变量提升】

&emsp;&emsp;`var`声明会发生&rdquo;变量提升&ldquo;现象，即变量可以在声明之前使用，值为`undefined`&nbsp;

<div>
<pre>function getValue(condition){
    if(condition){
        var value = 'blue';
        return value;
    }else{
         //此处可访问变量value，值为undefined
        return null;
    }
　　　　//此处可访问变量value，值为undefined
}</pre>
</div>

&emsp;&emsp;如果没有javascript开发经验，可能会认为只有condition为true时，才会创建变量value

&emsp;&emsp;但实际上，在预编译阶段，javascript引擎会将上面的函数修改成下面这样

<div>
<pre>function getValue(condition){
    var value;
    if(condition){
        value = 'blue';
        return value;
    }else{
        return null;
    }
}</pre>
</div>

&emsp;&emsp;变量value的声明被提升到函数顶部，而初始化操作依然留在原处。如果不注意，很可能引起错误。为些，ES6引入了块级作用域来强化对变量生命周期的控制

【块级声明】

&emsp;&emsp;块级声明用于声明在指定块的作用域之外无法访问的变量，它存在于

&emsp;&emsp;1、函数内部

&emsp;&emsp;2、{}之间的块区域内

&nbsp;

### let声明

&emsp;&emsp;let声明的用法与var声明相同。用let代替var来声明变量，就可以把变量的作用域限制在当前代码块中

<div>
<pre>function getValue(condition){
    if(condition){
        let value = 'blue';
        return value;
    }else{
         //变量value在此处不存在
        return null;
    }
    //变量value在此处不存在
}</pre>
</div>

&emsp;&emsp;变量value改由关键字let进行声明后，不再被提升到函数顶部。执行流离开if块时，value立刻被销毁。如果condition的值为false，就永远不会声明并初始化value

【禁止重声明】

&emsp;&emsp;假设作用域中已经存在某个标识符，此时再使用let关键字声明它就会抛出错误

<div>
<pre>var count = 30;
//抛出语法错误
//Uncaught SyntaxError: Identifier 'count' has already been declared
let count = 40;</pre>
</div>

&nbsp;

### const声明

&emsp;&emsp;使用const声明的是常量，其值一旦被设定后不可更改。因此，每个通过const声明的常量必须进行初始化

<div>
<pre>const num = 30;
//抛出语法错误
//Uncaught SyntaxError: Missing initializer in const declaration
const name;</pre>
</div>

&emsp;&emsp;const与let声明老师块级标识符，所以常量也只在当前代码块中有效，一旦执行到块外会立即被销毁。常量同样也不会被提升到作用域顶部

<div>
<pre>if(condition){
    const num = 30;    
}
//此处无法访问num</pre>
</div>

【禁止重声明】

&emsp;&emsp;与let类似，在同一作用域内用const声明已经存在的标识符也会导致语法错误，无论该标识符是使用var，还是let声明的

<div>
<pre>var message = 'hello';
let num = 10;
//这两条语句都会抛出错误
const message = "goobye";
const num = 30;</pre>
</div>

【无法再赋值】

&emsp;&emsp;const与let声明最大的不同之处在于，const声明的常量无法再赋值

<div>
<pre>let num1 = 10;
num1= 20;
const num2 = 10;
//Uncaught TypeError: Assignment to constant variable.
num2 = 20;</pre>
</div>

【可修改对象属性】

&emsp;&emsp;const声明不允许修改绑定，但允许修改值。这也就意味着用const声明对象后，可以修改该对象的属性值

<div>
<pre>const person = {
    name: 'huochai'
};
//可以修改对象属性的值
person.name = 'match';
//Object {name: "match"}
console.log(person);
//抛出语法错误
//Uncaught TypeError: Assignment to constant variable.
person = {
    name: 'match'
}</pre>
</div>

&nbsp;

### 临时死区

&emsp;&emsp;与var不同，let和const声明的变量不会被提升到作用域顶部，如果在声明之前访问这些变量，会引发错误。而从作用域顶部到声明变量语句之前的这个区域，被称为临时死区(temporal dead zone)，简称为TDZ

<div>
<pre>if(true){
    //undefined
    console.log(typeof value);
    var value = "blue";
}
if(true){
    //Uncaught ReferenceError: value is not defined
    console.log(typeof value);
    let value = "blue";
}</pre>
</div>

&emsp;&emsp;但是，在let或const声明的作用域之外使用该变量就不会报错

<div>
<pre>//undefined
console.log(typeof value);
if(true){
    let value = "blue";
}</pre>
</div>

&nbsp;

### 循环绑定

【var声明】

&emsp;&emsp;长久以来，var声明使得在循环中创建函数异常困难，因为变量到了循环之外仍能访问

<div>
<pre>var funcs = [];
for(var i = 0; i &lt; 10; i++){
    funcs.push(function(){
        //输出10次10
        console.log(i);
    });
}
funcs.forEach(function(func){
    func();
})</pre>
</div>

&emsp;&emsp;上面代码中，预期的结果是输出数字0-9，但它却一连串输出了10次10，这是因为循环里的每次迭代同时共享着变量i，循环内部创建的函数全都保留了对相同变量的引用，循环结束时变量i的值为10，所以每次调用console.log(i)时就会输出10

【IIFE】

&emsp;&emsp;为解决这个问题，可以在循环中使用立即调用函数表达式(IIFE)，以强制生成计数器变量的副本

<div>
<pre>var funcs = [];
for(var i = 0; i &lt; 10; i++){
    funcs.push((function(value){
        return function(){
            //0
            //1
            //...
            //9
            console.log(value);
        }
    })(i));
}
funcs.forEach(function(func){
    func();
})</pre>
</div>

&emsp;&emsp;在循环内部，IIFE表达式为接受的每一个变量i都创建了一个副本并存储为变量value，这个变量的值就是相应迭代创建的函数所使用的值，因此调用每个函数都会像从0-9循环一样得到期望的值

【let】

&emsp;&emsp;let声明模仿上例中IIFE所做的一切来简化循环过程。每次迭代循环都会创建一个新变量，并以之前迭代中同名变量的值将其初始化

<div>
<pre>var funcs = [];
for(let i = 0; i &lt; 10; i++){
    funcs.push(function(){
        //0
        //1
        //...
        //9
        console.log(i);
    });
}
funcs.forEach(function(func){
    func();
})</pre>
</div>

&emsp;&emsp;以上这段循环相比之下更为简洁，每次循环时let声明都会创建一个新变量i，并将其初始化为i的当前值，所以循环内部创建的每个函数都能得到属性它们自己的i的副本

&emsp;&emsp;对于for-in循环和for-of循环来说也是一样的

<div>
<pre>var funcs = [];
obj = {
    a:true,
    b:true,
    c:true
}
for(let key in obj){
    funcs.push(function(){
        //a
        //b
        //c
        console.log(key);
    })
}
funcs.forEach(function(func){
    func();
})</pre>
</div>

【const】

&emsp;&emsp;对于const声明来说，由于其无法改变变量的值，所以无法使用普通的for循环

<div>
<pre>var funcs = [];
for(const i = 0; i &lt; 10; i++){
    funcs.push(function(){
            //Uncaught TypeError: Assignment to constant variable.
        console.log(i);
    });
}
funcs.forEach(function(func){
    func();
})</pre>
</div>

&emsp;&emsp;由于for-in循环中每次迭代不会修改已有绑定，而是创建一个新绑定，所以在for-in循环中可以使用const

<div>
<pre>var funcs = [];
obj = {
    a:true,
    b:true,
    c:true
}
for(const key in obj){
    funcs.push(function(){
        //a
        //b
        //c
        console.log(key);
    })
}
funcs.forEach(function(func){
    func();
})</pre>
</div>

&nbsp;

### 属性变量

&emsp;&emsp;对var声明的变量来说，如果处于全局作用域，它们会自动成为window对象的属性。这意味着用var很可能无意中覆盖一个已经存在的全局变量

<div>
<pre>//function RegExp() { [native code] }
console.log(RegExp);
var RegExp = "hello";
console.log(RegExp);//'hello'
console.log(window.RegExp);//'hello'</pre>
</div>

&emsp;&emsp;如果使用let或const声明的变量，不会成为window对象的属性

<div>
<pre>let RegExp = "hello";
console.log(RegExp);//'hello'
console.log(window.RegExp);//function RegExp() { [native code] }</pre>
</div>

&emsp;&emsp;因此，如果希望在window对象下定义变量，要使用var声明。如果不希望，则使得let或const

&nbsp;

### 最佳实践

&emsp;&emsp;默认使用const，只有确实需要改变变量的值时使用let

&emsp;&emsp;因为大部分变量的值在初始化后不应再改变，而预料外的变量值的改变是很多bug的源头

