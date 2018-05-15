# 深入理解javascript函数系列第二篇——函数参数

&emsp;&emsp;javascript函数的参数与大多数其他语言的函数的参数有所不同。函数不介意传递进来多少个参数，也不在乎传进来的参数是什么数据类型，甚至可以不传参数。本文是深入理解javascript函数系列第二篇&mdash;&mdash;函数参数

&nbsp;

### arguments

&emsp;&emsp;javascript中的函数定义并未指定函数形参的类型，函数调用也未对传入的实参值做任何类型检查。实际上，javascript函数调用甚至不检查传入形参的个数

```
function add(x){
    return x+1;
}
console.log(add(1));//2
console.log(add('1'));//'11'
console.log(add());//NaN
console.log(add(1,2));//2
```

**同名形参**

&emsp;&emsp;在非严格模式下，函数中可以出现同名形参，且只能访问最后出现的该名称的形参

```
function add(x,x,x){
    return x;
}
console.log(add(1,2,3));//3
```

&emsp;&emsp;而在严格模式下，出现同名形参会抛出语法错误

```
function add(x,x,x){
    'use strict';
    return x;
}
console.log(add(1,2,3));//SyntaxError: Duplicate parameter name not allowed in this context
```

**参数个数**

&emsp;&emsp;当实参比函数声明指定的形参个数要少，剩下的形参都将设置为undefined值

```
function add(x,y){
    console.log(x,y);//1 undefined
}
add(1);
```

&emsp;&emsp;常常使用[逻辑或运算符](http://www.cnblogs.com/xiaohuochai/p/5616992.html#anchor3)给省略的参数设置一个合理的默认值

```
function add(x,y){
    y = y || 2;
    console.log(x,y);//1 2
}
add(1);
```

&emsp;&emsp;注意:实际上，使用y || 2是不严谨的，显式地设置假值(undefined、null、false、0、-0、''、NaN)也会得到相同的结果。所以应该根据实际场景进行合理设置

&emsp;&emsp;当实参比形参个数要多时，剩下的实参没有办法直接获得，需要使用即将提到的arguments对象

&emsp;&emsp;javascript中的参数在内部用一个数组表示。函数接收到的始终都是这个数组，而不关心数组中包含哪些参数。在函数体内可以通过arguments对象来访问这个参数数组，从而获取传递给函数的每一个参数。arguments对象并不是Array的实例，它是一个类数组对象，可以使用方括号语法访问它的每一个元素

```
function add(x){
    console.log(arguments[0],arguments[1],arguments[2])//1 2 3
    return x+1;
}
add(1,2,3);
```

&emsp;&emsp;arguments对象的length属性显示实参的个数，函数的length属性显示形参的个数

```
function add(x,y){
    console.log(arguments.length)//3
    return x+1;
}
add(1,2,3);
console.log(add.length);//2
```

&emsp;&emsp;形参只是提供便利，但不是必需的

```
function add(){
    return arguments[0] + arguments[1];
}
console.log(add(1,2));//3
```

**对象参数**

&emsp;&emsp;当一个函数包含超过3个形参时，要记住调用函数中实参的正确顺序实在让人头疼

```
function arraycopy(/*array*/from,/*index*/form_start,/*array*/to,/*index*/to_start,/*integer*/length){
    //todo
}
```

&emsp;&emsp;通过名/值对的形式来传入参数，这样参数的顺序就无关紧要了。定义函数的时候，传入的实参都写入一个单独的对象之中，在调用的时候传入一个对象，对象中的名/值对是真正需要的实参数据

```
function easycopy(args){
    arraycopy(args.from,args.from_start || 0,args.to,args.to_start || 0, args.length);
}
var a = [1,2,3,4],b =[];
easycopy({from:a,to:b,length:4});
```

**同步&nbsp;**

&emsp;&emsp;当形参与实参的个数相同时，arguments对象的值和对应形参的值保持同步

```
function test(num1,num2){
    console.log(num1,arguments[0]);//1 1
    arguments[0] = 2;
    console.log(num1,arguments[0]);//2 2
    num1 = 10;
    console.log(num1,arguments[0]);//10 10
}
test(1);
```

&emsp;&emsp;注意:虽然命名参数和对应arguments对象的值相同，但并不是相同的命名空间。它们的命名空间是独立的，但值是同步的

&emsp;&emsp;但在严格模式下，arguments对象的值和形参的值是独立的

```
function test(num1,num2){
    'use strict';
    console.log(num1,arguments[0]);//1 1
    arguments[0] = 2;
    console.log(num1,arguments[0]);//1 2
    num1 = 10;
    console.log(num1,arguments[0]);//10 2
}
test(1);
```

&emsp;&emsp;当形参并没有对应的实参时，arguments对象的值与形参的值并不对应

```
function test(num1,num2){
    console.log(num1,arguments[0]);//undefined,undefined
    num1 = 10;
    arguments[0] = 5;
    console.log(num1,arguments[0]);//10,5
}
test();
```

&nbsp;

### 内部属性

**【callee】**

　arguments对象有一个名为callee的属性，该属性是一个指针，指向拥有这个arguments对象的函数

&emsp;&emsp;下面是经典的阶乘函数

```
function factorial(num){
    if(num &lt;=1){
        return 1;
    }else{
        return num* factorial(num-1);
    }
}    
console.log(factorial(5));//120
```

&emsp;&emsp;但是，上面这个函数的执行与函数名紧紧耦合在了一起，可以使用arguments.callee可以消除函数解耦

```
function factorial(num){
    if(num &lt;=1){
        return 1;
    }else{
        return num* arguments.callee(num-1);
    }
}    
console.log(factorial(5));//120
```

&emsp;&emsp;但在严格模式下，访问这个属性会抛出TypeError错误

```
function factorial(num){
    'use strict';
    if(num &lt;=1){
        return 1;
    }else{
        return num* arguments.callee(num-1);
    }
}    
//TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
console.log(factorial(5));
```

&emsp;&emsp;这时，可以使用具名的函数表达式

```
var factorial = function fn(num){
    if(num &lt;=1){
        return 1;
    }else{
        return num*fn(num-1);
    }
};    
console.log(factorial(5));//120
```

**【caller】**

&emsp;&emsp;实际上有两个caller属性

【1】函数的caller

&emsp;&emsp;函数的caller属性保存着调用当前函数的函数的引用，如果是在全局作用域中调用当前函数，它的值是null

```
function outer(){
    inner();
}
function inner(){
    console.log(inner.caller);//outer(){inner();}
}
outer();
```
```
function inner(){
    console.log(inner.caller);//null
}
inner();
```

&emsp;&emsp;在严格模式下，访问这个属性会抛出TypeError错误

```
function inner(){
    'use strict';
    //TypeError: 'caller' and 'arguments' are restricted function properties and cannot be accessed in this context
    console.log(inner.caller);
}
inner();
```

【2】arguments对象的caller

&emsp;&emsp;该属性始终是undefined，定义这个属性是为了分清arguments.caller和函数的caller属性

```
function inner(x){
    console.log(arguments.caller);//undefined
}
inner(1);
```

&emsp;&emsp;同样地，在严格模式下，访问这个属性会抛出TypeError错误

```
function inner(x){
    'use strict';
    //TypeError: 'caller' and 'arguments' are restricted function properties and cannot be accessed in this context
    console.log(arguments.caller);
}
inner(1);
```

&nbsp;

### 函数重载

&emsp;&emsp;javascript函数不能像传统意义上那样实现重载。而在其他语言中，可以为一个函数编写两个定义，只要这两个定义的签名(接受的参数的类型和数量)不同即可

&emsp;&emsp;javascript函数没有签名，因为其参数是由包含0或多个值的数组来表示的。而没有函数签名，真正的重载是不可能做到的

```
//后面的声明覆盖了前面的声明
function addSomeNumber(num){
    return num + 100;
}
function addSomeNumber(num){
    return num + 200;
}
var result = addSomeNumber(100);//300
```

&emsp;&emsp;只能通过检查传入函数中参数的类型和数量并作出不同的反应，来模仿方法的重载

```
function doAdd(){
    if(arguments.length == 1){
        alert(arguments[0] + 10);
    }else if(arguments.length == 2){
        alert(arguments[0] + arguments[1]);
    }
}
doAdd(10);//20
doAdd(30,20);//50
```

&nbsp;

### 参数传递

&emsp;&emsp;javascript中所有函数的参数都是按值传递的。也就是说，把函数外部的值复制到函数内部的参数，就和把值从一个变量复制到另一个变量一样

【1】基本类型值

&emsp;&emsp;在向参数传递基本类型的值时，被传递的值会被复制给一个局部变量(命名参数或arguments对象的一个元素)

```
function addTen(num){
    num += 10;
    return num;
}
var count = 20;
var result = addTen(count);
console.log(count);//20，没有变化
console.log(result);//30
```

【2】引用类型值

&emsp;&emsp;在向参数传递引用类型的值时，会把这个值在内存中的地址复制给一个局部变量，因此这个局部变量的变化会反映在函数的外部

```
function setName(obj){
    obj.name = 'test';
}
var person = new Object();
setName(person);
console.log(person.name);//'test'
```

&emsp;&emsp;当在函数内部重写引用类型的形参时，这个变量引用的就是一个局部对象了。而这个局部对象会在函数执行完毕后立即被销毁

```
function setName(obj){
    obj.name = 'test';
    console.log(person.name);//'test'
    obj = new Object();
    obj.name = 'white';
    console.log(person.name);//'test'
}
var person = new Object();
setName(person);
```

&nbsp;

## 参考资料

【1】 W3School-Javascript高级教程&mdash;&mdash;arguments对象 [http://www.w3school.com.cn/js/](http://www.w3school.com.cn/js/pro_js_functions_arguments_object.asp)

【2】 阮一峰Javascript标准参考教程&mdash;&mdash;函数参数 [http://javascript.ruanyifeng.com/grammar/function.html](http://javascript.ruanyifeng.com/grammar/function.html#toc15)

【3】《javascript权威指南(第6版)》第8章 函数

【4】《javascript高级程序设计(第3版)》第3章 基本概念

【5】《javascript DOM编程艺术(第2版)》第2章 javascript语法

【6】《javascript语句精粹》第4章 函数

