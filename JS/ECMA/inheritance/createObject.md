# javascript面向对象系列第二篇——创建对象的5种模式

&emsp;&emsp;如何创建对象，或者说如何更优雅的创建对象，一直是一个津津乐道的话题。本文将从最简单的创建对象的方式入手，逐步介绍5种创建对象的模式

&nbsp;

### 对象字面量

&emsp;&emsp;一般地，我们创建一个对象会使用对象字面量的形式

&emsp;&emsp;注意：有三种方式来创建对象，包括new构造函数、对象直接量和Object.create()函数，[详细情况移步至此](http://www.cnblogs.com/xiaohuochai/p/5741616.html#anchor2)

```
var person1 = {
    name: "bai",
    age : 29,
    job: "Software Engineer",
    sayName: function(){
        alert(this.name);
    }
};
```

&emsp;&emsp;如果我们要创建大量的对象，则如下所示：

```
var person1 = {
    name: "bai",
    age : 29,
    job: "Software Engineer",
    sayName: function(){
        alert(this.name);
    }
};
var person2 = {
    name: "hu",
    age : 25,
    job: "Software Engineer",
    sayName: function(){
        alert(this.name);
    }
};
/*
var person3 ...
*/
```

&emsp;&emsp;虽然对象字面量可以用来创建单个对象，但如果要创建多个对象，会产生大量的重复代码

&nbsp;

### 工厂模式

&emsp;&emsp;为了解决上述问题，人们开始使用工厂模式。该模式抽象了创建具体对象的过程，用函数来封装以特定接口创建对象的细节

```
function createPerson(name,age,job){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayname = function(){
        alert(this.name);
    }
    return o;
}
var person1 = createPerson('bai',29,'software Engineer');
var person2 = createPerson('hu',25,'software Engineer');
```

&emsp;&emsp;工厂模式虽然解决了创建多个相似对象的问题，但没有解决对象识别的问题，因为使用该模式并没有给出对象的类型

&nbsp;

### 构造函数模式

&emsp;&emsp;可以通过创建自定义的构造函数，来定义自定义对象类型的属性和方法。创建自定义的构造函数意味着可以将它的实例标识为一种特定的类型，而这正是构造函数模式胜过工厂模式的地方。该模式没有显式地创建对象，直接将属性和方法赋给了this对象，且没有return语句

```
function Person(name,age,job){
    this.name = name;
    this.age = age;
    this.jog = job;
    this.sayName = function(){
        alert(this.name);
    };
}
var person1 = new Person("bai",29,"software Engineer");
var person2 = new Person("hu",25,"software Engineer");
```

&emsp;&emsp;使用构造函数的主要问题是每个方法都要在每个实例上重新创建一遍，创建多个完成相同任务的方法完全没有必要，浪费内存空间

```
function Person(name,age,job){
    this.name = name;
    this.age = age;
    this.jog = job;
    this.sayName = function(){
        alert(this.name);
    };
}
var person1 = new Person("bai",29,"software Engineer");
var person2 = new Person("hu",25,"software Engineer");
//具有相同作用的sayName()方法在person1和person2这两个实例中却占用了不同的内存空间
console.log(person1.sayName === person2.sayName);//false
```

**构造函数拓展模式**

&emsp;&emsp;在构造函数模式的基础上，把方法定义转移到构造函数外部，可以解决方法被重复创建的问题

```
function Person(name,age,job){
    this.name = name;
    this.age = age;
    this.jog = job;
    this.sayName = sayName;
}
function sayName(){
    alert(this.name);
};
var person1 = new Person("bai",29,"software Engineer");
var person2 = new Person("hu",25,"software Engineer");
console.log(person1.sayName === person2.sayName);//true
```

&emsp;&emsp;现在，新问题又来了。在全局作用域中定义的函数实际上只能被某个对象调用，这让全局作用域有点名不副实。而且，如果对象需要定义很多方法，就要定义很多全局函数，严重污染全局空间，这个自定义的引用类型没有封装性可言了

**寄生构造函数模式**

&emsp;&emsp;该模式的基本思想是创建一个函数，该函数的作用仅仅是封装创建对象的代码，然后再返回新创建的对象。该模式是工厂模式和构造函数模式的结合

&emsp;&emsp;寄生构造函数模式与构造函数模式有相同的问题，每个方法都要在每个实例上重新创建一遍，创建多个完成相同任务的方法完全没有必要，浪费内存空间

```
function Person(name,age,job){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        console.log(this.name);
    };
    return o;
}
var person1 = new Person("bai",29,"software Engineer");
var person2 = new Person("hu",25,"software Engineer");
//具有相同作用的sayName()方法在person1和person2这两个实例中却占用了不同的内存空间
console.log(person1.sayName === person2.sayName);//false
```

&emsp;&emsp;还有一个问题是，使用该模式返回的对象与构造函数之间没有关系。因此，使用instanceof运算符和prototype属性都没有意义。所以，该模式要尽量避免使用

```
function Person(name,age,job){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        console.log(this.name);
    };
    return o;
}
var person1 = new Person("bai",29,"software Engineer");
console.log(person1 instanceof Person);//false
console.log(person1.__proto__ === Person.prototype);//false
```

**稳妥构造函数模式**

&emsp;&emsp;所谓稳妥对象指没有公共属性，而且其方法也不引用this的对象。稳妥对象最适合在一些安全环境中(这些环境会禁止使用this和new)或者在防止数据被其他应用程序改动时使用

&emsp;&emsp;稳妥构造函数与寄生构造函数模式相似，但有两点不同：一是新创建对象的实例方法不引用this；二是不使用new操作符调用构造函数

```
function Person(name,age,job){
    //创建要返回的对象
    var o = new Object();
    //可以在这里定义私有变量和函数
    //添加方法
    o.sayName = function(){
        console.log(name);
    };
    //返回对象
    return o;
}
//在稳妥模式创建的对象中，除了使用sayName()方法之外，没有其他方法访问name的值
var friend = Person("bai",29,"Software Engineer");
friend.sayName();//"bai"
```

&emsp;&emsp;与寄生构造函数模式相似，使用稳妥构造函数模式创建的对象与构造函数之间也没有什么关系，因此instanceof操作符对这种对象也没有什么意义

&nbsp;

### 原型模式

&emsp;&emsp;使用原型对象，可以让所有实例共享它的属性和方法。换句话说，不必在构造函数中定义对象实例的信息，而是可以将这些信息直接添加到原型对象中

```
function Person(){
    Person.prototype.name = "bai";
    Person.prototype.age = 29;
    Person.prototype.job = "software Engineer";
    Person.prototype.sayName = function(){
        console.log(this.name);
    }
}
var person1 = new Person();
person1.sayName();//"bai"
var person2 = new Person();
person2.sayName();//"bai"
alert(person1.sayName == person2.sayName);//true
```

**更简单的原型模式**

&emsp;&emsp;为了减少不必要的输入，也为了从视觉上更好地封装原型的功能，用一个包含所有属性和方法的对象字面量来重写整个原型对象

&emsp;&emsp;但是，经过对象字面量的改写后，constructor不再指向Person了。因为此方法完全重写了默认的prototype对象，使得Person.prototype的自有属性constructor属性不存在，只有从原型链中找到Object.prototype中的constructor属性

```
function Person(){};
Person.prototype = {
    name: "bai",
    age: 29,
    job: "software Engineer",
    sayName : function(){
        console.log(this.name);
    }
};
var person1 = new Person();
person1.sayName();//"bai"
console.log(person1.constructor === Person);//false
console.log(person1.constructor === Object);//true
```

&emsp;&emsp;可以显式地设置原型对象的constructor属性

```
function Person(){};
Person.prototype = {
    constructor:Person,
    name: "bai",
    age: 29,
    job: "software Engineer",
    sayName : function(){
        console.log(this.name);
    }
};
var person1 = new Person();
person1.sayName();//"bai"
console.log(person1.constructor === Person);//true
console.log(person1.constructor === Object);//false
```

&emsp;&emsp;由于默认情况下，原生的constructor属性是不可枚举的，更妥善的解决方法是使用Object.defineProperty()方法，改变其[属性描述符](http://www.cnblogs.com/xiaohuochai/p/5743821.html)中的[枚举性enumerable](http://www.cnblogs.com/xiaohuochai/p/5743821.html#anchor3)

```
function Person(){};
Person.prototype = {
    name: "bai",
    age: 29,
    job: "software Engineer",
    sayName : function(){
        console.log(this.name);
    }
};
Object.defineProperty(Person.prototype,'constructor',{
    enumerable: false,
    value: Person
});
var person1 = new Person();
person1.sayName();//"bai"
console.log(person1.constructor === Person);//true
console.log(person1.constructor === Object);//false
```

&emsp;&emsp;原型模式问题在于引用类型值属性会被所有的实例对象共享并修改，这也是很少有人单独使用原型模式的原因

```
function Person(){}
Person.prototype = {
    constructor: Person,
    name: "bai",
    age: 29,
    job: "Software Engineer",
    friend : ["shelby","Court"],
    sayName: function(){
        console.log(this.name);
    }
};
var person1 = new Person();
var person2 = new Person();
person1.friends.push("Van");
alert(person1.friends);//["shelby","Court","Van"];
alert(person2.friends);//["shelby","Court","Van"];
alert(person1.friends === person2.friends);//true
```

&nbsp;

### 组合模式

&emsp;&emsp;组合使用构造函数模式和原型模式是创建自定义类型的最常见方式。构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性，这种组合模式还支持向构造函数传递参数。实例对象都有自己的一份实例属性的副本，同时又共享对方法的引用，最大限度地节省了内存。该模式是目前使用最广泛、认同度最高的一种创建自定义对象的模式

```
function Person(name,age,job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ["shelby","Court"];
}
Person.prototype = {
    constructor: Person,
    sayName : function(){
        console.log(this.name);
    }    
}
var person1 = new Person("bai",29,"Software Engineer");
var person2 = new Person("hu",25,"Software Engineer");
person1.friends.push("Van");
alert(person1.friends);// ["shelby","Court","Van"];
alert(person2.friends);// ["shelby","Court"];
alert(person1.friends === person2.friends);//false
alert(person1.sayName === person2.sayName);//true
```

**动态原型模式**

&emsp;&emsp;动态原型模式将组合模式中分开使用的构造函数和原型对象都封装到了构造函数中，然后通过检查方法是否被创建，来决定是否初始化原型对象

&emsp;&emsp;使用这种方法将分开的构造函数和原型对象合并到了一起，使得代码更加整齐，也减少了全局空间的污染

&emsp;&emsp;注意：如果原型对象中包含多个语句，只需要检测其中一个语句即可

```
function Person(name,age,job){
    //属性
    this.name = name;
    this.age = age;
    this.job = job;
    //方法
    if(typeof this.sayName != "function"){
        Person.prototype.sayName = function(){
            console.log(this.name);
        };
    }
}
var friend = new Person("bai",29,"Software Engineer");
friend.sayName();//'bai'
```

&nbsp;

## 最后

&emsp;&emsp;本文从使用对象字面量形式创建一个对象开始说起，创建多个对象会造成代码冗余；使用工厂模式可以解决该问题，但存在对象识别的问题；接着介绍了构造函数模式，该模式解决了对象识别的问题，但存在关于方法的重复创建问题；接着介绍了原型模式，该模式的特点就在于共享，但引出了引用类型值属性会被所有的实例对象共享并修改的问题；最后，提出了构造函数和原型组合模式，构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性，这种组合模式还支持向构造函数传递参数，该模式是目前使用最广泛的一种模式

&emsp;&emsp;此外，一些模式下面还有一些解决特殊需求的拓展模式

&emsp;&emsp;以上

