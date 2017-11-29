# javascript面向对象系列第三篇——实现继承的3种形式

　　学习如何[创建对象](http://www.cnblogs.com/xiaohuochai/p/5754243.html)是理解面向对象编程的第一步，第二步是理解继承。本文是javascript面向对象系列第三篇&mdash;&mdash;实现继承的3种形式

&nbsp;

### 原型链

　　javascript使用原型链作为实现继承的主要方法，实现的本质是重写[原型对象](http://www.cnblogs.com/xiaohuochai/p/5753952.html)，代之以一个新类型的实例

<div class="cnblogs_code">
<pre>function Super(){
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
console.log(instance.getValue());//true</pre>
</div>

　　原型链最主要的问题在于包含引用类型值的原型属性会被所有实例共享，而这也正是为什么要在构造函数中，而不是在原型对象中定义属性的原因。在通过原型来实现继承时，原型实际上会变成另一个类型的实例。于是，原先的实例属性也就顺理成章地变成了现在的原型属性了

<div class="cnblogs_code">
<pre>function Super(){
    this.colors = ['red','blue','green'];
}
function Sub(){};
//Sub继承了Super
Sub.prototype = new Super();
var instance1 = new Sub();
instance1.colors.push('black');
console.log(instance1.colors);//'red,blue,green,black'
var instance2 = new Sub();
console.log(instance2.colors);//'red,blue,green,black'</pre>
</div>

**原型式继承**

　　原型式继承借助原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型。从本质上讲，object()对传入其中的对象执行了一次浅复制

<div class="cnblogs_code">
<pre>function object(o){
    function F(){};
    F.prototype = o;
    return new F();
}
var superObj = {
    colors: ['red','blue','green']
};
var subObj1 = object(superObj);
subObj1.colors.push("black");

var subObj2 = object(superObj);
subObj2.colors.push("white");

console.log(superObj.colors);//["red", "blue", "green", "black", "white"]
console.log(subObj1.colors);//["red", "blue", "green", "black", "white"]</pre>
</div>

　　实际上，[Object.create()方法](http://www.cnblogs.com/xiaohuochai/p/5741616.html#anchor2)规范化了原型式继承

<div class="cnblogs_code">
<pre>var superObj = {
    colors: ['red','blue','green']
};
var subObj1 = Object.create(superObj);
subObj1.colors.push("black");

var subObj2 = object(superObj);
subObj2.colors.push("white");

console.log(superObj.colors);//["red", "blue", "green", "black", "white"]
console.log(subObj1.colors);//["red", "blue", "green", "black", "white"]</pre>
</div>

　　[注意]原型式继承虽然只是看上去将原型链继承的一些程序性步骤包裹在函数里而已，与原型链继承有着引用类型值的问题。但是，它们的一个重要区别是父类型的实例对象不再作为子类型的原型对象

　　1、使用原型链继承

<div class="cnblogs_code">
<pre>function Super(){
    this.value = 1;
}
Super.prototype.value = 0;
function Sub(){};
//将父类型的实例对象作为子类型的原型对象
Sub.prototype = new Super();
Sub.prototype.constructor = Sub;

//创建子类型的实例对象
var instance = new Sub;
console.log(instance.value);//1</pre>
</div>

　　2、使用原型式继承

<div class="cnblogs_code">
<pre>function Super(){
    this.value = 1;
}
Super.prototype.value = 0;
function Sub(){};

Sub.prototype = Object.create(Super.prototype);
Sub.prototype.constructor = Sub;

//创建子类型的实例对象
var instance = new Sub;
console.log(instance.value);//0</pre>
</div>

　　上面的Object.create函数一行代码Sub.prototype = Object.create(Super.prototype)可以分解为

<div class="cnblogs_code">
<pre>function F(){};
F.prototype = Super.prototype;
Sub.prototype = new F();</pre>
</div>

　　由上面代码看出，子类的原型对象是临时类F的实例对象，而临时类F的原型对象又指向父类的原型对象；所以，实际上，子类可以继承父类的原型上的属性，但不可以继承父类的实例上的属性

**寄生式继承**

　　寄生式继承创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后返回对象

<div class="cnblogs_code">
<pre>function parasite(original){
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
console.log(subObj1.colors);//["red", "blue", "green", "black", "white"]</pre>
</div>

　　[注意]寄生式继承实际上只是原型式继承的再包装，与原型式继承有着同样的问题，且由于不能做到函数复用而降低了效率

&nbsp;

### 借用构造函数

　　借用[构造函数](http://www.cnblogs.com/xiaohuochai/p/5753952.html#anchor1)(constructor stealing)的技术(有时候也叫做伪类继承或经典继承)。基本思想相当简单，即在子类型构造函数的内部调用超类型构造函数，通过使用apply()和call()方法在新创建的对象上执行构造函数

<div class="cnblogs_code">
<pre>function Super(){
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
console.log(instance2.colors);// ['red','blue','green']</pre>
</div>

　　相对于原型链而言，借用构造函数有一个很大的优势，即可以在子类型构造函数中向超类型构造函数传递参数

<div class="cnblogs_code">
<pre>function Super(name){
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
console.log(instance.age);//29  </pre>
</div>

　　但是，如果仅仅是借用构造函数，那么也将无法避免构造函数模式存在的问题&mdash;&mdash;方法都在构造函数中定义，因此函数复用就无从谈起了

&nbsp;

### 组合继承

　　组合继承(combination inheritance)有时也叫伪经典继承，指的是将原型链和借用构造函数的技术组合到一块，从而发挥二者之长的一种继承模式。其背后的思路是使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。这样，既通过在原型上定义方法实现了函数复用，又能够保证每个实例都有它自己的属性

<div class="cnblogs_code">
<pre>function Super(name){
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
instance2.sayAge();//27</pre>
</div>

　　组合继承有它自己的问题。那就是无论什么情况下，都会调用两次父类型构造函数：一次是在创建子类型原型的时候，另一次是在子类型构造函数内部。子类型最终会包含父类型对象的全部实例属性，但不得不在调用子类型构造函数时重写这些属性

<div class="cnblogs_code">
<pre>function Super(name){
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
};  </pre>
</div>

**寄生组合式继承**

　　寄生组合式继承与组合继承相似，都是通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。只不过把原型继承的形式变成了寄生式继承。使用寄生组合式继承可以不必为了指定子类型的原型而调用父类型的构造函数，从而寄生式继承只继承了父类型的原型属性，而父类型的实例属性是通过借用构造函数的方式来得到的

<div class="cnblogs_code">
<pre>
function parasite(original){
    var clone = Object.create(original);//通过调用函数创建一个新对象
    return clone;//返回这个对象
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
Sub.prototype = parasite(Super.prototype);
Sub.prototype.constructor = Sub;
Sub.prototype.sayAge = function(){
    return this.age;
}
var instance1 = new Sub("bai",29);
instance1.colors.push("black");
console.log(instance1.colors);//['red','blue','green','black']
instance1.sayName();//"bai"
instance1.sayAge();//29

var instance2 = new Sub("hu",27);
console.log(instance2.colors);//['red','blue','green']
instance2.sayName();//"hu"
instance2.sayAge();//27</pre>
</div>

　　精简一点，则如下所示：

<div class="cnblogs_code">
<pre>function Super(name){
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
instance2.sayName();//"hu"</pre>
</div>

&nbsp;

## 最后

　　继承这块可能是ECMAScript中最难理解的部分。如果说[作用域](http://www.cnblogs.com/xiaohuochai/p/5699739.html)和[this机制](http://www.cnblogs.com/xiaohuochai/p/5735901.html)的难在于绕，则这部分的难则在于混杂。每种模式都有自己的优点，而多个模式结合在一起就可能造成一些属性的重置，这是最需要注意的地方

　　更多的模式都是为了更好的解决问题。学习原理时学的深一点，解决问题时才能更顺利点

　　以上

