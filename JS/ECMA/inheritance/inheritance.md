# javascript面向对象系列第三篇——实现继承的3种形式

&emsp;&emsp;学习如何[创建对象](http://www.cnblogs.com/xiaohuochai/p/5754243.html)是理解面向对象编程的第一步，第二步是理解继承。开宗明义，继承是指在原有对象的基础上，略作修改，得到一个新的对象。javascript主要包括类式继承、原型继承和拷贝继承这三种继承方式。本文是javascript面向对象系列第三篇&mdash;&mdash;实现继承的3种形式

&nbsp;

### 类式继承

&emsp;&emsp;大多数面向对象的编程语言都支持类和类继承的特性，而JS却不支持这些特性，只能通过其他方法定义并关联多个相似的对象，如new和instanceof。不过在后来的ES6中新增了一些元素，比如class关键字，但这并不意味着javascript中是有类的，class只是构造函数的语法糖而已

&emsp;&emsp;类式继承的主要思路是，通过构造函数实例化对象，通过原型链将实例对象关联起来。下面将对类式继承进行详细解释

【原型链继承】

&emsp;&emsp;javascript使用原型链作为实现继承的主要方法，实现的本质是重写[原型对象](http://www.cnblogs.com/xiaohuochai/p/5753952.html)，代之以一个新类型的实例。下面的代码中，原来存在于SuperType的实例对象中的属性和方法，现在也存在于SubType.prototype中了

```
function Super(){
    this.value = true;
}
Super.prototype.getValue = function(){
    return this.value;
};
function Sub(){}
//Sub继承了Super
Sub.prototype = new Super();
Sub.prototype.constructor = Sub;

var instance = new Sub();
console.log(instance.getValue());//true
```
&emsp;&emsp;原型链最主要的问题在于包含引用类型值的原型属性会被所有实例共享，而这也正是为什么要在构造函数中，而不是在原型对象中定义属性的原因。在通过原型来实现继承时，原型实际上会变成另一个类型的实例。于是，原先的实例属性也就顺理成章地变成了现在的原型属性了

```
function Super(){
    this.colors = ['red','blue','green'];
}
function Sub(){};
//Sub继承了Super
Sub.prototype = new Super();
var instance1 = new Sub();
instance1.colors.push('black');
console.log(instance1.colors);//'red,blue,green,black'
var instance2 = new Sub();
console.log(instance2.colors);//'red,blue,green,black'
```
&emsp;&emsp;原型链的第二个问题是，在创建子类型的实例时，&nbsp;不能向超类型的构造函数中传递参数。实际上，应该说是没有办法在不影响所有对象实例的情况下，给超类型的构造函数传递参数。再加上包含引用类型值的原型属性会被所有实例共享的问题，在实践中很少会单独使用原型链继承

【借用构造函数继承】

&emsp;&emsp;借用[构造函数](http://www.cnblogs.com/xiaohuochai/p/5753952.html#anchor1)(constructor stealing)的技术(有时候也叫做伪类继承或经典继承)。基本思想相当简单，即在子类型构造函数的内部调用超类型构造函数，通过使用apply()和call()方法在新创建的对象上执行构造函数

```
function Super(){
    this.colors = ['red','blue','green'];
}
function Sub(){
    //继承了Super
    Super.call(this);
}
var instance1 = new Sub();
instance1.colors.push('black');
console.log(instance1.colors);// ['red','blue','green','black']
var instance2 = new Sub();
console.log(instance2.colors);// ['red','blue','green']
```
&emsp;&emsp;相对于原型链而言，借用构造函数有一个很大的优势，即可以在子类型构造函数中向超类型构造函数传递参数

```
function Super(name){
    this.name = name;
}
function Sub(){
    //继承了Super，同时还传递了参数
    Super.call(this,"bai");
    //实例属性
    this.age = 29;
}
var instance = new Sub();
console.log(instance.name);//"bai"
console.log(instance.age);//29  
```
&emsp;&emsp;但是，如果仅仅是借用构造函数，那么也将无法避免构造函数模式存在的问题&mdash;&mdash;方法都在构造函数中定义，因此函数复用就无从谈起了

【组合继承】

&emsp;&emsp;组合继承(combination inheritance)有时也叫伪经典继承，指的是将原型链和借用构造函数的技术组合到一块，从而发挥二者之长的一种继承模式。其背后的思路是使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。这样，既通过在原型上定义方法实现了函数复用，又能够保证每个实例都有它自己的属性

```
function Super(name){
    this.name = name;
    this.colors = ['red','blue','green'];
}
Super.prototype.sayName = function(){
    console.log(this.name);
};
function Sub(name,age){
    //继承属性
    Super.call(this,name);
    this.age = age;
}
//继承方法
Sub.prototype = new Super();
Sub.prototype.constructor = Sub;
Sub.prototype.sayAge = function(){
    console.log(this.age);
}
var instance1 = new Sub("bai",29);
instance1.colors.push("black");
console.log(instance1.colors);//['red','blue','green','black']
instance1.sayName();//"bai"
instance1.sayAge();//29

var instance2 = new Sub("hu",27);
console.log(instance2.colors);//['red','blue','green']
instance2.sayName();//"hu"
instance2.sayAge();//27
```
&emsp;&emsp;组合继承有它自己的问题。那就是无论什么情况下，都会调用两次父类型构造函数：一次是在创建子类型原型的时候，另一次是在子类型构造函数内部。子类型最终会包含父类型对象的全部实例属性，但不得不在调用子类型构造函数时重写这些属性

```
function Super(name){
    this.name = name;
    this.colors = ["red","blue","green"];
}
Super.prototype.sayName = function(){
    return this.name;
};
function Sub(name,age){
     // 第二次调用Super()，Sub.prototype又得到了name和colors两个属性，并对上次得到的属性值进行了覆盖
    Super.call(this,name);
    this.age = age;
}
//第一次调用Super()，Sub.prototype得到了name和colors两个属性
Sub.prototype = new Super(); 
Sub.prototype.constructor = Sub;
Sub.prototype.sayAge = function(){
    return this.age;
};  
```
【寄生组合继承】

&emsp;&emsp;解决两次调用的方法是使用寄生组合式继承。寄生组合式继承与组合继承相似，都是通过借用构造函数来继承不可共享的属性，通过原型链的混成形式来继承方法和可共享的属性。只不过把原型继承的形式变成了寄生式继承。使用寄生组合式继承可以不必为了指定子类型的原型而调用父类型的构造函数，从而寄生式继承只继承了父类型的原型属性，而父类型的实例属性是通过借用构造函数的方式来得到的

&emsp;&emsp;注意:下方中会对寄生继承进行详细说明

```
function Super(name){
    this.name = name;
    this.colors = ["red","blue","green"];
}
Super.prototype.sayName = function(){
    return this.name;
};

function Sub(name,age){
    Super.call(this,name);
    this.age = age;
}
if(!Object.create){
    Object.create = function(proto){
　　　　function F(){};
　　　　F.prototype = proto;
　　　　return new F;
　　}
}
Sub.prototype = Object.create(Super.prototype);
Sub.prototype.constructor = Sub;

var instance1 = new Sub("bai",29);
instance1.colors.push("black");
console.log(instance1.colors);//['red','blue','green','black']
instance1.sayName();//"bai"

var instance2 = new Sub("hu",27);
console.log(instance2.colors);//['red','blue','green']
instance2.sayName();//"hu"
```
&emsp;&emsp;这个例子的高效率体现在它只调用了一次Super构造函数，并且因此避免了在Sub.prototype上面创建不必要的、多余的属性。与此同时，原型链还保持不变

&emsp;&emsp;因此，开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式，YUI的YAHOO.lang.extend()方法就采用了这种继承模式

【ES6中的class】

&emsp;&emsp;如果使用ES6中的class语法，则上面代码修改如下

&emsp;&emsp;注意:关于关于ES6中的class语法，详细情况[移步至此](http://www.cnblogs.com/xiaohuochai/p/7256843.html)

```
class Super {
  constructor(name){
    this.name = name;
    this.colors = ["red","blue","green"];
  }
  sayName(){
    return this.name;
  }
}

class Sub extends Super{
  constructor(name,age){
    super(name);
    this.age = age;
  }
}

var instance1 = new Sub("bai",29);
instance1.colors.push("black");
console.log(instance1.colors);//['red','blue','green','black']
instance1.sayName();//"bai"

var instance2 = new Sub("hu",27);
console.log(instance2.colors);//['red','blue','green']
instance2.sayName();//"hu"
```
&emsp;&emsp;ES6的class语法糖隐藏了许多技术细节，在实现同样功能的前提下，代码却优雅不少

&nbsp;

### 原型继承

【原型继承】

&emsp;&emsp;原型继承，在《你不知道的javascript》中被翻译为委托继承

&emsp;&emsp;道格拉斯&middot;克罗克福德(Douglas Crockford)在2006年写了一篇文章，《javascript中的原型式继承》。在这篇文章中，他介绍了一种实现继承的方式，这种方式并没有使用严格意义上的构造函数。他的想法是借助原型可以基于已有的对象来创建新对象，同时不必因此创建自定义类型

&emsp;&emsp;原型继承的基础函数如下所示

```
function object(o){
    function F(){};
    F.prototype = o;
    return new F();
}
```
&emsp;&emsp;在object()函数内部，先创建了一个临时性的构造函数，然后将传入的对象作为这个构造函数的原型，最后返回了这个临时类型的一个新实例。从本质上讲，object()对传入其中的对象执行了一次浅复制

&emsp;&emsp;下面是一个例子

```
var superObj = {
  init: function(value){
    this.value = value;
  },
  getValue: function(){
    return this.value;
  }
}

var subObj = object(superObj);
subObj.init('sub');
console.log(subObj.getValue());//'sub'
```
&emsp;&emsp;ES5通过新增Object.create()方法规范化了原型式继承

&emsp;&emsp;注意:关于Object.create()方法的详细内容[移步至此](http://www.cnblogs.com/xiaohuochai/p/5741616.html#anchor2)

```
var superObj = {
  init: function(value){
    this.value = value;
  },
  getValue: function(){
    return this.value;
  }
}

var subObj = Object.create(superObj);
subObj.init('sub');
console.log(subObj.getValue());//'sub'
```
【与原型链继承的关系】

&emsp;&emsp;原型继承虽然只是看上去将原型链继承的一些程序性步骤包裹在函数里而已。但是，它们的一个重要区别是父类型的实例对象不再作为子类型的原型对象

&emsp;&emsp;1、使用原型链继承

```
function Super(){
    this.value = 1;
}
Super.prototype.value = 0;
function Sub(){};
//将父类型的实例对象作为子类型的原型对象
Sub.prototype = new Super();
Sub.prototype.constructor = Sub;

//创建子类型的实例对象
var instance = new Sub;
console.log(instance.value);//1
```
&emsp;&emsp;2、使用原型继承

```
function Super(){
    this.value = 1;
}
Super.prototype.value = 0;
function Sub(){};

Sub.prototype = Object.create(Super.prototype);
Sub.prototype.constructor = Sub;

//创建子类型的实例对象
var instance = new Sub;
console.log(instance.value);//0
```
&emsp;&emsp;上面的Object.create函数一行代码Sub.prototype = Object.create(Super.prototype)可以分解为

```
function F(){};
F.prototype = Super.prototype;
Sub.prototype = new F();
```
&emsp;&emsp;由上面代码看出，子类的原型对象是临时类F的实例对象，而临时类F的原型对象又指向父类的原型对象；所以，实际上，子类可以继承父类的原型上的属性，但不可以继承父类的实例上的属性

&emsp;&emsp;原型继承与原型链继承都存在着子例共享父例引用类型值的问题

```
var superObj = {
    colors: ['red','blue','green']
};
var subObj1 = object(superObj);
subObj1.colors.push("black");

var subObj2 = object(superObj);
subObj2.colors.push("white");

console.log(superObj.colors);//["red", "blue", "green", "black", "white"]
console.log(subObj1.colors);//["red", "blue", "green", "black", "white"]
```
【寄生式继承】

&emsp;&emsp;寄生式继承(parasitic)是与原型继承紧密相关的一种思路，并且同样是由道格拉斯&middot;克罗克福德推而广之的。寄生式继承的思路与寄生构造函数和工厂模式类似，即创建一个仅用于封装继承过程的函数，该函数内部以某种方式来增强对象，最后再返回对象

```
function parasite(original){
    var clone = Object.create(original);//通过调用函数创建一个新对象
    clone.sayHi = function(){ //以某种方式来增强这个对象
        console.log("hi");
    };
    return clone;//返回这个对象
}
var superObj = {
    colors: ['red','blue','green']
};
var subObj1 = parasite(superObj);
subObj1.colors.push('black');
var subObj2 = parasite(superObj);
subObj2.colors.push('white');

console.log(superObj.colors);//["red", "blue", "green", "black", "white"]
console.log(subObj1.colors);//["red", "blue", "green", "black", "white"]
```
&emsp;&emsp;由于原型继承存在着引用类型的值被共享的问题，所以使用得并不很多，只在一些简单应用场景下使用。如果需要解决该问题，则需要借用构造函数，与原型继承的初衷相违背，相当于使用了类式继承的终极写法&mdash;&mdash;寄生组合继承

&nbsp;

### 拷贝继承

&emsp;&emsp;拷贝继承在《javascript面向对象摘要》中翻译为混入继承，jQuery使用的就是拷贝继承

&emsp;&emsp;拷贝继承不需要改变原型链，通过拷贝函数将父例的属性和方法拷贝到子例即可

&emsp;&emsp;注意:关于对象拷贝的详细信息[移步至此](http://www.cnblogs.com/xiaohuochai/p/6354166.html)

【拷贝函数】

&emsp;&emsp;下面是一个深拷贝的拷贝函数

```
function extend(obj,cloneObj){
    if(typeof obj != 'object'){
        return false;
    }
    var cloneObj = cloneObj || {};
    for(var i in obj){
        if(typeof obj[i] === 'object'){
            cloneObj[i] = (obj[i] instanceof Array) ? [] : {};
            arguments.callee(obj[i],cloneObj[i]);
        }else{
            cloneObj[i] = obj[i]; 
        }  
    }
    return cloneObj;
}

var obj1={a:1,b:2,c:[1,2,3]};
var obj2=extend(obj1);
console.log(obj1.c); //[1,2,3]
console.log(obj2.c); //[1,2,3]
obj2.c.push(4);
console.log(obj2.c); //[1,2,3,4]
console.log(obj1.c); //[1,2,3]
```
【对象间的拷贝继承】

&emsp;&emsp;由于拷贝继承解决了引用类型值共享的问题，所以其完全可以脱离构造函数实现对象间的继承

```
function extend(obj,cloneObj){
    if(typeof obj != 'object'){
        return false;
    }
    var cloneObj = cloneObj || {};
    for(var i in obj){
        if(typeof obj[i] === 'object'){
            cloneObj[i] = (obj[i] instanceof Array) ? [] : {};
            arguments.callee(obj[i],cloneObj[i]);
        }else{
            cloneObj[i] = obj[i]; 
        }  
    }
    return cloneObj;
}

var superObj = {
  arrayValue:[1,2,3],
  init: function(value){
    this.value = value;
  },
  getValue: function(){
    return this.value;
  }
}
var subObj = extend(superObj);
subObj.arrayValue.push(4);
console.log(subObj.arrayValue);//[1,2,3,4]
console.log(superObj.arrayValue);//[1,2,3]
```
【使用构造函数的拷贝组合继承】

&emsp;&emsp;如果要使用构造函数，则属性可以使用借用构造函数的方法，而引用类型属性和方法使用拷贝继承。相当于不再通过原型链来建立对象之间的联系，而通过复制来得到对象的属性和方法

```
function extend(obj,cloneObj){
    if(typeof obj != 'object'){
        return false;
    }
    var cloneObj = cloneObj || {};
    for(var i in obj){
        if(typeof obj[i] === 'object'){
            cloneObj[i] = (obj[i] instanceof Array) ? [] : {};
            arguments.callee(obj[i],cloneObj[i]);
        }else{
            cloneObj[i] = obj[i]; 
        }  
    }
    return cloneObj;
}
function Super(name){
    this.name = name;
    this.colors = ["red","blue","green"];
}
Super.prototype.sayName = function(){
    return this.name;
};
function Sub(name,age){
    Super.call(this,name);
    this.age = age;
}
Sub.prototype = extend(Super.prototype);
var instance1 = new Sub("bai",29);
instance1.colors.push("black");
console.log(instance1.colors);//['red','blue','green','black']
instance1.sayName();//"bai"

var instance2 = new Sub("hu",27);
console.log(instance2.colors);//['red','blue','green']
instance2.sayName();//"hu"
```
&nbsp;

## 总结

&emsp;&emsp;本文介绍的类式继承、原型继承和拷贝继承这三种继承方式中，类式继承用的最普遍，由于ES6中的class的语法糖，使其代码复杂度大大降低；原型继承由于无法处理引用类型值共享的问题，使用较少，但由原型继承引申出的寄生组合继承是类式继承的范式方法；拷贝继承使用范围最广泛，不仅可以实现原型之间的继承，也可以脱离构造函数，直接实现对象间的继承

&emsp;&emsp;总之，继承主要就是处理父例和子例之间的两个问题，即是否使用构造函数，及如何建立联系

&emsp;&emsp;类式继承的核心就是使用构造函数，通过原型链来建立联系

&emsp;&emsp;原型继承不使用构造函数，通过Object.create()来建立联系

&emsp;&emsp;拷贝继承使不使用构造函数都可以，通过复制来建立联系

