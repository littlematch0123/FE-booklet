# ES6对象扩展

&emsp;&emsp;随着JS应用复杂度的不断增加，开发者在程序中使用对象的数量也在持续增长，因此对象使用效率的提升就变得至关重要。ES6通过多种方式来加强对象的使用，通过简单的语法扩展，提供更多操作对象及与对象交互的方法。本章将详细介绍ES6对象扩展

&nbsp;

### 对象类别

&emsp;&emsp;在浏览器这样的执行环境中，对象没有统一的标准，在标准中又使用不同的术语描述对象，ES6规范清晰定义了每一个类别的对象，对象的类别如下

&emsp;&emsp;1、普通(Ordinary)对象

&emsp;&emsp;具有JS对象所有的默认内部行为

&emsp;&emsp;2、特异(Exotic)对象

&emsp;&emsp;具有某些与默认行为不符的内部行为

&emsp;&emsp;3、标准(Standard)对象

&emsp;&emsp;ES6规范中定义的对象，例如，Array、Date等。标准对象既可以是普通对象，也可以是特异对象

&emsp;&emsp;4、内建对象

&emsp;&emsp;脚本开始执行时存在于JS执行环境中的对象，所有标准对象都是内建对象

&nbsp;

### 对象简写

【属性初始值简写】

&emsp;&emsp;在ES5中，对象字面量只是简单的键值对集合，这意味着初始化属性值时会有一些重复

```
function createPerson(name, age) {
    return {
        name: name,
        age: age
    };
}
```


&emsp;&emsp;这段代码中的createPerson()函数创建了一个对象，其属性名称与函数的参数相同，在返回的结果中，name和age分别重复了两遍，只是其中一个是对象属性的名称，另外一个是为属性赋值的变量

&emsp;&emsp;在ES6中，通过使用属性初始化的简写语法，可以消除这种属性名称与局部变量之间的重复书写。当一个对象的属性与本地变量同名时，不必再写冒号和值，简单地只写属性名即可

```
function createPerson(name, age) {
    return {
        name,
        age
    };
}
```


&emsp;&emsp;当对象字面量里只有一个属性的名称时，JS引擎会在可访问作用域中查找其同名变量；如果找到，则该变量的值被赋给对象字面量里的同名属性。在本示例中，对象字面量属性name被赋予了局部变量name的值

&emsp;&emsp;在JS中，为对象字面量的属性赋同名局部变量的值是一种常见的做法，这种简写方法有助于消除命名错误

【对象方法简写】

&emsp;&emsp;在ES5中，如果为对象添加方法，必须通过指定名称并完整定义函数来实现

```
var person = {
    name: "Nicholas",
    sayName: function() {
        console.log(this.name);
    }
};
```


&emsp;&emsp;而在ES6中，语法更简洁，消除了冒号和function关键字

```
var person = {
    name: "Nicholas",
    sayName() {
        console.log(this.name);
    }
};
```


&emsp;&emsp;在这个示例中，通过对象方法简写语法，在person对象中创建一个sayName()方法，该属性被赋值为一个匿名函数表达式，它拥有在ES5中定义的对象方法所具有的全部特性

&emsp;&emsp;二者唯一的区别是，简写方法可以使用super关键字，而普通方法不可以

&emsp;&emsp;注意:通过对象方法简写语法创建的方法有一个name属性，其值为小括号前的名称

&nbsp;

### 可计算属性名

&emsp;&emsp;在ES5版本中，如果想要通过计算得到属性名，就需要用方括号代替点记法

```
var person = {},
lastName = "last name";
person["first name"] = "huochai";
person[lastName] = "match";
console.log(person["first name"]); // "huochai"
console.log(person[lastName]); // "match"
```


&emsp;&emsp;变量lastName被赋值为字符串"last name"，引用的两个属性名称中都含有空格，因而不可使用点记法引用这些属性，却可以使用方括号，因为它支持通过任何字符串值作为名称访问属性的值。此外，在对象字面量中，可以直接使用字符串字面量作为属性名称

```
var person = {
    "first name": "huochai"
};
console.log(person["first name"]); // "huochai"
```


&emsp;&emsp;这种模式适用于属性名提前已知或可被字符串字面量表示的情况。然而，如果属性名称"first name"被包含在一个变量中，或者需要通过计算才能得到该变量的值，那么在ES5中是无法为一个对象字面量定义该属性的

&emsp;&emsp;在ES6中，可在对象字面量中使用可计算属性名称，其语法与引用对象实例的可计算属性名称相同，也是使用方括号

```
var lastName = "last name";
var person = {
    "first name": "huochai",
    [lastName]: "match"
};
console.log(person["first name"]); // "huochai"
console.log(person[lastName]); // "match"
```


&emsp;&emsp;在对象字面量中使用方括号表示的该属性名称是可计算的，它的内容将被名称求值并被最终转化为一个字符串，因而同样可以使用表达式作为属性的可计算名称

```
var suffix = " name";
var person = {
    ["first" + suffix]: "huochai",
    ["last" + suffix]: "match"
};
console.log(person["first name"]); // "huochai"
console.log(person["last name"]); // "match"
```


&emsp;&emsp;这些属性被求值后为字符串"first name"和"last name"，然后它们可用于属性引用。任何可用于对象实例括号记法的属性名，也可以作为字面量中的计算属性名

&nbsp;

### 判断相等

【Object.is()】

&emsp;&emsp;在JS中比较两个值时，可能习惯于使用相等运算符(==)或全等运算符(===)，使用后者可以避免触发强制类型转换的行为。但是，即使使用全等运算符也不完全准确

```
console.log(+0 === -0);//true
console.log(NaN === NaN);//false
```


&emsp;&emsp;ES6引入了Object.is()方法来弥补全等运算符的不准确运算。这个方法接受两个参数，如果这两个参数类型相等且具有相同的值，则返回true，否则返回false

```
console.log(+0 == -0); // true
console.log(+0 === -0); // true
console.log(Object.is(+0, -0)); // false
console.log(NaN == NaN); // false
console.log(NaN === NaN); // false
console.log(Object.is(NaN, NaN)); // true
console.log(5 == 5); // true
console.log(5 == "5"); // true
console.log(5 === 5); // true
console.log(5 === "5"); // false
console.log(Object.is(5, 5)); // true
console.log(Object.is(5, "5")); // false
```


&emsp;&emsp;对于Object.is()方法来说，其运行结果在大部分情况中与"==="运算符相同，唯一的区别在于+0和-0被识别为不相等并且NaN与NaN等价。但是大可不必抛弃等号运算符，是否选择用Object.is()方法而不是==或===取决于那些特殊情况如何影响代码

&nbsp;

### 对象合并

【Object.assign()】

&emsp;&emsp;混合(Mixin)是JS实现对象组合最流行的一种模式。在一个mixin方法中，一个对象接收来自另一个对象的属性和方法，许多JS库中都有类似的minix方法

```
function mixin(receiver, supplier) {
    Object.keys(supplier).forEach(function(key) {
        receiver[key] = supplier[key];
    });
    return receiver;
}
```


&emsp;&emsp;mixin()函数遍历supplier的自有属性并复制到receiver中(此处的复制行为是浅复制，当属性值为对象时只复制对象的引用)。这样一来，receiver不通过继承就可以获得新属性

```
function EventTarget() { /*...*/ }
EventTarget.prototype = {
    constructor: EventTarget,
    emit: function() { /*...*/ },
    on: function() { /*...*/ }
};
var myObject = {};
mixin(myObject, EventTarget.prototype);
myObject.emit("somethingChanged");
```


&emsp;&emsp;在这段代码中，myObject继承EventTarget.prototype对象的所有行为，从而使myObject可以分别通过emit()方法发布事件或通过on()方法订阅事件

&emsp;&emsp;这种混合模式非常流行，因而ES6添加了object.assign()方法来实现相同的功能，这个方法接受一个接收对象和任意数量的源对象，最终返回接收对象

```
function EventTarget() { /*...*/ }
EventTarget.prototype = {
    constructor: EventTarget,
    emit: function() { /*...*/ },
    on: function() { /*...*/ }
}
var myObject = {}
Object.assign(myObject, EventTarget.prototype);
myObject.emit("somethingChanged");
```


【对象合并】

&emsp;&emsp;Object.assign()方法不叫对象复制，或对象拷贝，而叫对象合并，是因为源对象本身的属性和方法仍然存在

```
var target = { a: 1 };
var source1 = { b: 2 };
var source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```


&emsp;&emsp;Object.assign()方法可以接受任意数量的源对象，并按指定的顺序将属性复制到接收对象中。如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性

```
var target = { a: 1, b: 1 };
var source1 = { b: 2, c: 2 };
var source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```


【浅拷贝】

&emsp;&emsp;在对象合并的过程中，`Object.assign()`拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（`enumerable: false`）

```
Object.assign({b: 'c'},
  Object.defineProperty({}, 'invisible', {
    enumerable: false,
    value: 'hello'
  })
)
// { b: 'c' }
```


&emsp;&emsp;`Object.assign()`方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用

```
var obj1 = {a: {b: 1}};
var obj2 = Object.assign({}, obj1);

obj1.a.b = 2;
obj2.a.b // 2
```

 【展开运算符】

&emsp;&emsp;在ES7中，支持对象展开运算符的写法，来替代Object.assign()
```
Object.assign({}, state, {visibilityFilter: action.filter})
//等同于
{ ...state, visibilityFilter: action.filter }
```
&emsp;&emsp;注意:在某些情况下，展开运行符的写法不生效

&emsp;&emsp;在nodejs中使用mongoose数据库筛选数据时要使用Object.assign()。如果使用...t，会输出一些无用的值，如下所示

```
"$__": {
    "strictMode": true,
    "selected": {
        "_id": 0,
        "content": 0
    },
    "getters": {},
    "wasPopulated": false,
    "activePaths": {
        "paths": {
            "title": "init",
            "categories": "default",
            "comments": "default",
            "likes": "default",
            "collections": "default",
            "createdAt": "init",
            "updatedAt": "init",
            "__v": "init"
        },
...
```
&nbsp;

### 属性名重复

&emsp;&emsp;ES5严格模式中加入了对象字面量重复属性的校验，当同时存在多个同名属性时会抛出错误

```
"use strict";
var person = {
    name: "huochai",
    name: "match" // 在 ES5 严格模式中是语法错误
};
```


&emsp;&emsp;当运行在ES5严格模式下时，第二个name属性会触发二个语法错误

&emsp;&emsp;但在ES6中，重复属性检查被移除了，无论是在严格模式还是非严格模式下，代码不再检查重复属性，对于每一组重复属性，都会选取最后一个取值

```
"use strict";
var person = {
    name: "huochai",
    name: "match" 
};
console.log(person.name); // "match"
```


&emsp;&emsp;在这个示例中，属性person.name取最后一次赋值"match"

&nbsp;

### 枚举顺序

&emsp;&emsp;ES5中未定义对象属性的枚举顺序，由JS引擎厂商自行决定。然而，ES6严格规定了对象的自有属性被枚举时的返回顺序，这会影响到Object.getOwnPropertyNames()方法及Reflect.ownKeys返回属性的方式，Object.assign()方法处理属性的顺序也将随之改变

&emsp;&emsp;自有属性枚举顺序的基本规则是

&emsp;&emsp;1、所有数字键按升序排序

&emsp;&emsp;2、所有字符串键按照它们被加入对象的顺序排序

&emsp;&emsp;3、所有symbol键按照它们被加入对象的顺序排序

```
var obj = {
    a: 1,
    0: 1,
    c: 1,
    2: 1,
    b: 1,
    1: 1
};
obj.d = 1;
console.log(Object.getOwnPropertyNames(obj).join("")); // "012acbd"
```


&emsp;&emsp;Object.getOwnPropertyNames()方法按照0、1、2、a、c、b、d的顺序依次返回对象obj中定义的属性。对于数值键，尽管在对象字面量中的顺序是随意的，但在枚举时会被重新组合和排序。字符串键紧随数值键，并按照在对象obj中定义的顺序依次返回，所以随后动态加入的字符串键最后输出

&emsp;&emsp;注意:对于for-in循环，由于并非所有厂商都遵循相同的实现方式，因此仍未指定一个明确的枚举顺序而Object.keys()方法和JSON.stringify()方法都指明与for-in使用相同的枚举顺序，因此它们的枚举顺序目前也不明晰

&emsp;&emsp;对于JS，枚举顺序的改变其实微不足道，但是有很多程序都需要明确指定枚举顺序才能正确运行。ES6中通过明确定义枚举顺序，确保用到枚举的代码无论处于何处都可以正确地执行

&nbsp;

### 对象原型

&emsp;&emsp;原型是JS继承的基础，在早期版本中，JS严重限制了原型的使用。随着语言逐渐成熟，开发者们也更加熟悉原型的运行方式，他们希望获得更多对于原型的控制力，并以更简单的方式来操作原型。于是，ES6针对原型进行了改进

【__proto__】

&emsp;&emsp;`__proto__`属性（前后各两个下划线），用来读取或设置当前对象的`prototype`对象。目前，所有浏览器(包括IE11)都部署了这个属性

```
// es6的写法
var obj = {
  method: function() { ... }
};
obj.__proto__ = someOtherObj;

// es5的写法
var obj = Object.create(someOtherObj);
obj.method = function() { ... };
```


&emsp;&emsp;标准明确规定，只有浏览器必须部署这个属性，其他运行环境不一定需要部署，而且新的代码最好认为这个属性是不存在的。因此，无论从语义的角度，还是从兼容性的角度，都不要使用这个属性，而是使用下面的`Object.setPrototypeOf()`（写操作）、`Object.getPrototypeOf()`（读操作）、`Object.create()`（生成操作）代替

【Object.getPrototypeOf()】

&emsp;&emsp;该方法与`Object.setPrototypeOf()`方法配套，用于读取一个对象的原型对象

```
Object.getPrototypeOf(obj);
```


【Object.setPrototypeOf()】

&emsp;&emsp;ES6添加了Object.setPrototypeOf()方法，与__proto__作用相同，通过这个方法可以改变任意指定对象的原型，它接受两个参数：被改变原型的对象及替代第一个参数原型的对象，它是ES6正式推荐的设置原型对象的方法

```
// 格式
Object.setPrototypeOf(object, prototype)

// 用法
var o = Object.setPrototypeOf({}, null);
```


&emsp;&emsp;例子如下

```
let person = {
    getGreeting() {
        return "Hello";
    }
};
let dog = {
    getGreeting() {
        return "Woof";
    }
};
// 原型为 person
let friend = Object.create(person);
console.log(friend.getGreeting()); // "Hello"
console.log(Object.getPrototypeOf(friend) === person); // true
// 将原型设置为 dog
Object.setPrototypeOf(friend, dog);
console.log(friend.getGreeting()); // "Woof"
console.log(Object.getPrototypeOf(friend) === dog); // true
```


&emsp;&emsp;这段代码中定义了两个基对象：person和dog。二者都有getGreeting()方法，且都返回一个字符串。friend对象先继承person对象，调用getGreeting()方法输出"Hello"；当原型被变更为dog对象时，原先与person对象的关联被解除，调用person.getGreeting()方法时输出的内容就变为了"Woof"

&emsp;&emsp;对象原型的真实值被储存在内部专用属性[[protơtype]]中，调用Object.getPrototypeOf()方法返回储存在其中的值，调用Object.setPrototypeOf()方法改变其中的值。然而，这不是操作[[prototype]]值的唯一方法

【简化原型访问的Super引用】

&emsp;&emsp;ES6引入了Super引用，使用它可以更便捷地访问对象原型

&emsp;&emsp;如果想重写对象实例的方法，又需要调用与它同名的原型方法，则在ES5中可以这样实现

```
let person = {
    getGreeting() {
        return "Hello";
    }
};
let dog = {
    getGreeting() {
        return "Woof";
    }
};
let friend = {
    getGreeting() {
        return Object.getPrototypeOf(this).getGreeting.call(this) + ", hi!";
    }
};
// 将原型设置为 person
Object.setPrototypeOf(friend, person);
console.log(friend.getGreeting()); // "Hello, hi!"
console.log(Object.getPrototypeOf(friend) === person); // true
// 将原型设置为 dog
Object.setPrototypeOf(friend, dog);
console.log(friend.getGreeting()); // "Woof, hi!"
console.log(Object.getPrototypeOf(friend) === dog); // true
```


&emsp;&emsp;在这个示例中，friend对象的getGreeting()方法调用了同名的原型方法。object.getPrototypeOf()方法可以确保调用正确的原型，并向输出字符串叠加另一个字符串；后面的.call(this)可以确保正确设置原型方法中的this值

&emsp;&emsp;要准确记得如何使用Object.getPrototypeOf()方法和call(this)方法来调用原型上的方法实在有些复杂，所以ES6引入了Super关键字。简单来说，Super引用相当于指向对象原型的指针，实际上也就是Object.getPrototypeOf(this)的值。于是，可以这样简化上面的getGreeting()方法

```
let friend = {
    getGreeting() {
        // 这相当于上个例子中的：
        // Object.getPrototypeOf(this).getGreeting.call(this)
        return super.getGreeting() + ", hi!";
    }
};
```


&emsp;&emsp;调用super.getGreeting()方法相当于在当前上下文中调用Object.getPrototypeOf(this).getGreeting.call(this)。同样，可以通过Super引用调用对象原型上所有其他的方法。当然，必须要在使用简写方法的对象中使用Super引用，如果在其他方法声明中使用会导致语法错误

```
let friend = {
    getGreeting: function() {
        // 语法错误
        return super.getGreeting() + ", hi!";
    }
};
```


&emsp;&emsp;在这个示例中用匿名function定义一个属性，由于在当前上下文中Super引用是非法的，因此当调用super.getGreeting()方法时会抛出语法错误

&emsp;&emsp;Super引用在多重继承情况下非常有用，因为在这种情况下，使用Object.getPrototypeOf()方法将会出现问题

```
let person = {
    getGreeting() {
        return "Hello";
    }
};
// 原型为 person
let friend = {
    getGreeting() {
        return Object.getPrototypeOf(this).getGreeting.call(this) + ", hi!";
    }
};
Object.setPrototypeOf(friend, person);
// 原型为 friend
let relative = Object.create(friend);
console.log(person.getGreeting()); // "Hello"
console.log(friend.getGreeting()); // "Hello, hi!"
console.log(relative.getGreeting()); // error!
```


&emsp;&emsp;this是relative，relative的原型是friend对象，当执行relative的getGreeting()方法时，会调用friend的getGreeting()方法，而此时的this值为relative。object.getPrototypeOf(this)又会返回friend对象。所以就会进入递归调用直到触发栈溢出报错

&emsp;&emsp;在ES5中很难解决这个问题，但在ES6中，使用Super引用便可以迎刃而解

```
let person = {
    getGreeting() {
        return "Hello";
    }
};
// 原型为 person
let friend = {
    getGreeting() {
        return super.getGreeting() + ", hi!";
    }
};
Object.setPrototypeOf(friend, person);
// 原型为 friend
let relative = Object.create(friend);
console.log(person.getGreeting()); // "Hello"
console.log(friend.getGreeting()); // "Hello, hi!"
console.log(relative.getGreeting()); // "Hello, hi!"
```


&emsp;&emsp;Super引用不是动态变化的，它总是指向正确的对象，在这个示例中，无论有多少其他方法继承了getGreeting()方法，super.getGreeting()始终指向person.getGreeting()方法

&nbsp;

### 方法定义

&emsp;&emsp;在ES6以前从未正式定义过"方法"的概念，方法仅仅是一个具有功能而非数据的对象属性。而在ES6中正式将方法定义为一个函数，它会有一个内部的[[HomeObject]]属性来容纳这个方法从属的对象

```
let person = {
    // 方法
    getGreeting() {
        return "Hello";
    }
};
// 并非方法
function shareGreeting() {
    return "Hi!";
}
```


&emsp;&emsp;这个示例中定义了person对象，它有一个getGreeting()方法，由于直接把函数赋值给了person对象，因而getGreetingo方法的[[HomeObject]]属性值为person。而创建shareGreeting()函数时，由于未将其赋值给一个对象，因而该方法没有明确定义[[HomeObject]]属性。在大多数情况下这点小差别无关紧要，但是当使用Super引用时就变得非常重要了

&emsp;&emsp;Super的所有引用都通过[[HomeObject]]属性来确定后续运行过程。第一步是在[[HomeObject]]属性上调用Object.getprototypeof()方法来检索原型的引用，然后搜寻原型找到同名函数，最后设置this绑定并且调用相应方法

```
let person = {
    getGreeting() {
        return "Hello";
    }
};
// 原型为 person
let friend = {
    getGreeting() {
        return super.getGreeting() + ", hi!";
    }
};
Object.setPrototypeOf(friend, person);
console.log(friend.getGreeting()); // "Hello, hi!"
```


&emsp;&emsp;调用friend.getGreeting()方法会将person.getGreeting()的返回值与"，hi!"拼接成新的字符串并返回。friend.getGreeting()方法的[[HomeObject]]属性值是friend，friend的原型是person，所以super.getGreeting()等价于Person.getGreeting.call(this)&nbsp;

&nbsp;

### 对象遍历

【Object.keys()】

&emsp;&emsp;ES5 引入了`Object.keys()`方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名

```
var obj = { foo: 'bar', baz: 42 };
console.log(Object.keys(obj));// ["foo", "baz"]
```


&emsp;&emsp;ES2017 引入了跟`Object.keys`配套的`Object.values`和`Object.entries`，作为遍历一个对象的补充手段，供`for...of`循环使用

```
let {keys, values, entries} = Object;
let obj = { a: 1, b: 2, c: 3 };

for (let key of keys(obj)) {
  console.log(key); // 'a', 'b', 'c'
}

for (let value of values(obj)) {
  console.log(value); // 1, 2, 3
}

for (let [key, value] of entries(obj)) {
  console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
}
```


【Object.values()】

&emsp;&emsp;`Object.values()`方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值

```
var obj = { foo: 'bar', baz: 42 };
console.log(Object.values(obj));// ["bar", 42]
```


&emsp;&emsp;`Object.values()`只返回对象自身的可遍历属性

```
var obj = Object.create({}, {p: {value: 42}});
console.log(Object.values(obj)); // []
```


&emsp;&emsp;上面代码中，`Object.create()`方法的第二个参数添加的对象属性（属性`p`），如果不显式声明，默认是不可遍历的，因为`p`的属性描述对象的`enumerable`默认是`false`，`Object.values()`不会返回这个属性。只要把`enumerable`改成`true`，`Object.values`就会返回属性`p`的值

```
var obj = Object.create({}, {p:
  {
    value: 42,
    enumerable: true
  }
});
console.log(Object.values(obj)); // [42]
```


【Object.entries()】

&emsp;&emsp;`Object.entries()`方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组

```
var obj = { foo: 'bar', baz: 42 };
console.log(Object.entries(obj));// [ ["foo", "bar"], ["baz", 42] ]
```


&emsp;&emsp;除了返回值不一样，该方法的行为与`Object.values`基本一致

&emsp;&emsp;`Object.entries()`的基本用途是遍历对象的属性

```
let obj = { one: 1, two: 2 };
for (let [k, v] of Object.entries(obj)) {
  console.log(
    `${JSON.stringify(k)}: ${JSON.stringify(v)}`
  );
}
// "one": 1
// "two": 2
```


