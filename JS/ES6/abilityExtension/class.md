# ES6中的类

&emsp;&emsp;大多数面向对象的编程语言都支持类和类继承的特性，而JS却不支持这些特性，只能通过其他方法定义并关联多个相似的对象，这种状态一直延续到了ES5。由于类似的库层出不穷，最终还是在ECMAScript 6中引入了类的特性。本文将详细介绍ES6中的类

&nbsp;

### ES5近似结构

&emsp;&emsp;在ES5中没有类的概念，最相近的思路是创建一个自定义类型：首先创建一个构造函数，然后定义另一个方法并赋值给构造函数的原型

<div>
<pre>function PersonType(name) {
    this.name = name;
}
PersonType.prototype.sayName = function() {
    console.log(this.name);
};
let person = new PersonType("huochai");
person.sayName(); // 输出 "huochai"
console.log(person instanceof PersonType); // true
console.log(person instanceof Object); // true</pre>
</div>

&emsp;&emsp;这段代码中的personType是一个构造函数，其执行后创建一个名为name的属性给personType的原型添加一个sayName()方法，所以PersonType对象的所有实例都将共享这个方法。然后使用new操作符创建一个personType的实例person，并最终证实了person对象确实是personType的实例，且由于存在原型继承的特性，因而它也是object的实例

&emsp;&emsp;许多模拟类的JS库都是基于这个模式进行开发，而且ES6中的类也借鉴了类似的方法

&nbsp;

### 类的声明

&emsp;&emsp;ES6有一种与其他语言中类似的类特性：类声明。同时，它也是ES6中最简单的类形式

【基本的类声明语法】

&emsp;&emsp;要声明一个类，首先编写class关键字，紧跟着的是类的名字，其他部分的语法类似于对象字面量方法的简写形式，但不需要在类的各元素之间使用逗号分隔

<div>
<pre>class PersonClass {
    // 等价于 PersonType 构造器
    constructor(name) {
        this.name = name;
    }
    // 等价于 PersonType.prototype.sayName
    sayName() {
        console.log(this.name);
    }
}
let person = new PersonClass("huochai");
person.sayName(); // 输出 "huochai"
console.log(person instanceof PersonClass); // true
console.log(person instanceof Object); // true
console.log(typeof PersonClass); // "function"
console.log(typeof PersonClass.prototype.sayName); // "function"</pre>
</div>

&emsp;&emsp;通过类声明语法定义PersonClass的行为与之前创建PersonType构造函数的过程相似，只是这里直接在类中通过特殊的constructor方法名来定义构造函数，且由于这种类使用简洁语法来定义方法，因而不需要添加function关键字。除constructor外没有其他保留的方法名，所以可以尽情添加方法

&emsp;&emsp;私有属性是实例中的属性，不会出现在原型上，且只能在类的构造函数或方法中创建，此例中的name就是一个私有属性。建议在构造函数中创建所有私有属性，从而只通过一处就可以控制类中的所有私有属性

&emsp;&emsp;类声明仅仅是基于已有自定义类型声明的语法糖。typeof PersonClass最终返回的结果是"function"，所以PersonClass声明实际上创建了一个具有构造函数方法行为的函数。此示例中的sayName()方法实际上是PersonClass.prototype上的一个方法；与之类似的是，在之前的示例中，sayName()也是personType.prototype上的一个方法。通过语法糖包装以后，类就可以代替自定义类型的功能，不必担心使用的是哪种方法，只需关注如何定义正确的类

&emsp;&emsp;注意：与函数不同的是，类属性不可被赋予新值，在之前的示例中，PersonClass.prototype就是这样一个只可读的类属性

【为何使用类语法】

&emsp;&emsp;尽管类与自定义类型之间有诸多相似之处，但是它们之间仍然有一些差异

&emsp;&emsp;1、函数声明可以被提升，而类声明与let声明类似，不能被提升真正执行声明语句之前，它们会一直存在于临时死区中

&emsp;&emsp;2、类声明中的所有代码将自动运行在严格模式下，而且无法强行让代码脱离严格模式执行

&emsp;&emsp;3、在自定义类型中，需要通过Object.defineProperty()方法手工指定某个方法为不可枚举；而在类中，所有方法都是不可枚举的

&emsp;&emsp;4、每个类都有一个名为[[Construct]]的内部方法，通过关键字new调用那些不含[[Construct]]的方法会导致程序抛出错误

&emsp;&emsp;5、使用除关键字new以外的方式调用类的构造函数会导致程序抛出错误

&emsp;&emsp;6、在类中修改类名会导致程序报错

&emsp;&emsp;了解了这些差异之后，可以用除了类之外的语法为之前示例中的PersonClass声明编写等价代码

<div>
<pre>// 直接等价于 PersonClass
let PersonType2 = (function() {
    "use strict";
    const PersonType2 = function(name) {
        // 确认函数被调用时使用了 new
        if (typeof new.target === "undefined") {
            throw new Error("Constructor must be called with new.");
        }
        this.name = name;
    }
    Object.defineProperty(PersonType2.prototype, "sayName", {
        value: function() {
            // 确认函数被调用时没有使用 new
            if (typeof new.target !== "undefined") {
                throw new Error("Method cannot be called with new.");
            }
            console.log(this.name);
        },
        enumerable: false,
        writable: true,
        configurable: true
    });
    return PersonType2;
}());</pre>
</div>

&emsp;&emsp;这段代码中有两处personType2声明：一处是外部作用域中的let声明，一处是立即执行函数表达式(IIFE)中的const声明，这也从侧面说明了为什么可以在外部修改类名而内部却不可修改。在构造函数中，先检查new.target是否通过new调用，如果不是则抛出错误；紧接着，将sayName()方法定义为不可枚举，并再次检查new.target是否通过new调用，如果是则抛出错误；最后，返回这个构造函数

&emsp;&emsp;尽管可以在不使用new语法的前提下实现类的所有功能，但如此一来，代码变得极为复杂

【常量类名】

&emsp;&emsp;类的名称只在类中为常量，所以尽管不能在类的方法中修改类名，但可以在外部修改

<div>
<pre>class Foo {
    constructor() {
        Foo = "bar"; // 执行时抛出错误
    }
}
// 但在类声明之后没问题
Foo = "baz";</pre>
</div>

&emsp;&emsp;以上代码中，类的外部有一个Foo声明，而类构造函数里的Foo则是一个独立存在的绑定。内部的Foo就像是通过const声明的，修改它的值会导致程序抛出错误；而外部的Foo就像是通过let声明的，可以随时修改这个绑定值

&nbsp;

### 类表达式

&emsp;&emsp;类和函数都有两种存在形式：声明形式和表达式形式。声明形式的函数和类都由相应的关键字(分别为function和class)进行定义，随后紧跟一个标识符；表达式形式的函数和类与之类似，只是不需要在关键字后添加标识符

&emsp;&emsp;类表达式的设计初衷是为了声明相应变量或传入函数作为参数

【基本的类表达式语法】

&emsp;&emsp;下面这段代码等价于之前PersonClass示例的类表达式

<div>
<pre>let PersonClass = class {
    // 等价于 PersonType 构造器
    constructor(name) {
        this.name = name;
    }
    // 等价于 PersonType.prototype.sayName
    sayName() {
        console.log(this.name);
    }
};
let person = new PersonClass("huochai");
person.sayName(); // 输出 "huochai"
console.log(person instanceof PersonClass); // true
console.log(person instanceof Object); // true
console.log(typeof PersonClass); // "function"
console.log(typeof PersonClass.prototype.sayName); // "function"</pre>
</div>

&emsp;&emsp;类声明和类表达式仅在代码编写方式略有差异，二者均不会像函数声明和函数表达式一样被提升，所以在运行时状态下无论选择哪一种方式，代码最终的执行结果都没有太大差别

&emsp;&emsp;二者最重要的区别是name属性不同，匿名类表达式的name属性值是一个空字符串，而类声明的name属性值为类名，例如，通过声明方式定义一个类PersonClass，则PersonClass.name的值为"PersonClass"

【命名类表达式】

&emsp;&emsp;类与函数一样，都可以定义为命名表达式。声明时，在关键字class后添加一个标识符即可

<div>
<pre>let PersonClass = class PersonClass2 {
    // 等价于 PersonType 构造器
    constructor(name) {
        this.name = name;
    }
    // 等价于 PersonType.prototype.sayName
    sayName() {
        console.log(this.name);
    }
};
console.log(typeof PersonClass); // "function"
console.log(typeof PersonClass2); // "undefined"</pre>
</div>

&emsp;&emsp;上面的示例中，类表达式被命名为PersonClass2，由于标识符PersonClass2只存在于类定义中，因此它可被用在像sayName()这样的方法中。而在类的外部，由于不存在一个名为PersonClass2的绑定，因而typeof PersonClass2的值为"undefined"

<div>
<pre>// 直接等价于 PersonClass 具名的类表达式
let PersonClass = (function() {
    "use strict";
    const PersonClass2 = function(name) {
        // 确认函数被调用时使用了 new
        if (typeof new.target === "undefined") {
            throw new Error("Constructor must be called with new.");
        }
        this.name = name;
    }
    Object.defineProperty(PersonClass2.prototype, "sayName", {
        value: function() {
            // 确认函数被调用时没有使用 new
            if (typeof new.target !== "undefined") {
                throw new Error("Method cannot be called with new.");
            }
            console.log(this.name);
        },
        enumerable: false,
        writable: true,
        configurable: true
    });
    return PersonClass2;
}());</pre>
</div>

&emsp;&emsp;在JS引擎中，类表达式的实现与类声明稍有不同。对于类声明来说，通过let定义的外部绑定与通过const定义的内部绑定具有相同名称；而命名类表达式通过const定义名称，从而PersonClass2只能在类的内部使用

&emsp;&emsp;尽管命名类表达式与命名函数表达式有不同的表现，但二者间仍有许多相似之处，都可以在多个场景中作为值使用

&nbsp;

### 一等公民

&emsp;&emsp;在程序中，一等公民是指一个可以传入函数，可以从函数返回，并且可以赋值给变量的值。JS函数是一等公民(也被称作头等函数)，这也正是JS中的一个独特之处

&emsp;&emsp;ES6延续了这个传统，将类也设计为一等公民，允许通过多种方式使用类的特性。例如，可以将类作为参数传入函数中

<div>
<pre>function createObject(classDef) {
    return new classDef();
}
let obj = createObject(class {
    sayHi() {
        console.log("Hi!");
    }
});
obj.sayHi(); // "Hi!"</pre>
</div>

&emsp;&emsp;在这个示例中，调用createObject()函数时传入一个匿名类表达式作为参数，然后通过关键字new实例化这个类并返回实例，将其储存在变量obj中

&emsp;&emsp;类表达式还有另一种使用方式，通过立即调用类构造函数可以创建单例。用new调用类表达式，紧接着通过一对小括号调用这个表达式

<div>
<pre>let person = new class {
    constructor(name) {
        this.name = name;
    }
    sayName() {
        console.log(this.name);
    }
}("huochai");
person.sayName(); // "huochai"</pre>
</div>

&emsp;&emsp;这里先创建一个匿名类表达式，然后立即执行。依照这种模式可以使用类语法创建单例，并且不会在作用域中暴露类的引用，其后的小括号表明正在调用一个函数，而且可以传参数给这个函数

&emsp;&emsp;我们可以通过类似对象字面量的语法在类中创建访问器属性

&nbsp;

### 访问器属性

&emsp;&emsp;尽管应该在类构造函数中创建自己的属性，但是类也支持访问器属性。创建getter时，需要在关键字get后紧跟一个空格和相应的标识符；创建setter时，只需把关键字get替换为set即可

<div>
<pre>class CustomHTMLElement {
    constructor(element) {
        this.element = element;
    }
    get html() {
        return this.element.innerHTML;
    }
    set html(value) {
        this.element.innerHTML = value;
    }
}
var descriptor = Object.getOwnPropertyDescriptor(CustomHTMLElement.prototype, "html");
console.log("get" in descriptor); // true
console.log("set" in descriptor); // true
console.log(descriptor.enumerable); // false</pre>
</div>

&emsp;&emsp;这段代码中的CustomHTMLElement类是一个针对现有DOM元素的包装器，并通过getter和setter方法将这个元素的innerHTML方法委托给html属性，这个访问器属性是在CustomHTMLElement.prototype上创建的。与其他方法一样，创建时声明该属性不可枚举。下面这段代码是非类形式的等价实现

<div>
<pre>// 直接等价于上个范例
let CustomHTMLElement = (function() {
    "use strict";
    const CustomHTMLElement = function(element) {
        // 确认函数被调用时使用了 new
        if (typeof new.target === "undefined") {
            throw new Error("Constructor must be called with new.");
        }
        this.element = element;
    }
    Object.defineProperty(CustomHTMLElement.prototype, "html", {
        enumerable: false,
        configurable: true,
        get: function() {
            return this.element.innerHTML;
        },
        set: function(value) {
            this.element.innerHTML = value;
        }
    });
    return CustomHTMLElement;
}());</pre>
</div>

&emsp;&emsp;由上可见，比起非类等效实现，类语法可以节省很多代码。在非类等效实现中，仅html访问器属性定义的代码量就与类声明一样多

&nbsp;

### 可计算成员名称

&emsp;&emsp;类和对象字面量还有更多相似之处，类方法和访问器属性也支持使用可计算名称。就像在对象字面量中一样，用方括号包裹一个表达式即可使用可计算名称

<div>
<pre>let methodName = "sayName";
    class PersonClass {
        constructor(name) {
            this.name = name;
        }
    [methodName]() {
        console.log(this.name);
    }
}
let me = new PersonClass("huochai");
me.sayName(); // "huochai"</pre>
</div>

&emsp;&emsp;这个版本的PersonClass通过变量来给类定义中的方法命名，字符串"sayName"被赋值给methodName变量，然后methodName又被用于声明随后可直接访问的sayName()方法

&emsp;&emsp;通过相同的方式可以在访问器属性中应用可计算名称

<div>
<pre>let propertyName = "html";
    class CustomHTMLElement {
        constructor(element) {
            this.element = element;
        }
    get [propertyName]() {
        return this.element.innerHTML;
    }
    set [propertyName](value) {
        this.element.innerHTML = value;
    }
}</pre>
</div>

&emsp;&emsp;在这里通过propertyName变量并使用getter和setter方法为类添加html属性，并且可以像往常一样通过.html访问该属性

&emsp;&emsp;在类和对象字面量诸多的共同点中，除了方法、访问器属性及可计算名称上的共同点外，还需要了解另一个相似之处，也就是生成器方法

&nbsp;

### 生成器方法

&emsp;&emsp;在对象字面量中，可以通过在方法名前附加一个星号(*)的方式来定义生成器，在类中亦是如此，可以将任何方法定义成生成器

<div>
<pre>class MyClass {
    *createIterator() {
        yield 1;
        yield 2;
        yield 3;
    }
}
let instance = new MyClass();
let iterator = instance.createIterator();</pre>
</div>

&emsp;&emsp;这段代码创建了一个名为MyClass的类，它有一个生成器方法createIterator()，其返回值为一个硬编码在生成器中的迭代器。如果用对象来表示集合，又希望通过简单的方法迭代集合中的值，那么生成器方法就派上用场了。数组、Set集合及Map集合为开发者们提供了多个生成器方法来与集合中的元素交互

&emsp;&emsp;尽管生成器方法很实用，但如果类是用来表示值的集合的，那么为它定义一个默认迭代器会更有用。通过Symbol.iterator定义生成器方法即可为类定义默认迭代器

<div>
<pre>class Collection {
    constructor() {
        this.items = [];
    }
    *[Symbol.iterator]() {
        yield *this.items.values();
    }
}
var collection = new Collection();
collection.items.push(1);
collection.items.push(2);
collection.items.push(3);
for (let x of collection) {
    // 1
    // 2
    // 3
    console.log(x);
}</pre>
</div>

&emsp;&emsp;这个示例用可计算名称创建了一个代理this.items数组values()迭代器的生成器方法。任何管理一系列值的类都应该引入默认迭代器，因为一些与特定集合有关的操作需要所操作的集合含有一个迭代器。现在可以将collection的实例直接用于for-of循环中或用展开运算符操作它

&emsp;&emsp;如果不介意在对象的实例中出现添加的方法和访问器属性，则可以将它们添加到类的原型中；如果希望它们只出现在类中，那么需要使用静态成员

&nbsp;

### 静态成员

&emsp;&emsp;在ES5中，直接将方法添加到构造函数中来模拟静态成员是一种常见的模式

<div>
<pre>function PersonType(name) {
    this.name = name;
}
// 静态方法
PersonType.create = function(name) {
    return new PersonType(name);
};
// 实例方法
PersonType.prototype.sayName = function() {
    console.log(this.name);
};
var person = PersonType.create("huochai");</pre>
</div>

&emsp;&emsp;在其他编程语言中，由于工厂方法PersonType.create()使用的数据不依赖personType的实例，因而其会被认为是一个静态方法。ES6的类语法简化了创建静态成员的过程，在方法或访问器属性名前使用正式的静态注释即可

<div>
<pre>class PersonClass {
    // 等价于 PersonType 构造器
    constructor(name) {
        this.name = name;
    }
    // 等价于 PersonType.prototype.sayName
    sayName() {
        console.log(this.name);
    }
    // 等价于 PersonType.create
    static create(name) {
        return new PersonClass(name);
    }
}
let person = PersonClass.create("huochai");</pre>
</div>

&emsp;&emsp;PersonClass定义只有一个静态方法create()，它的语法与sayName()的区别只在于是否使用static关键字。类中的所有方法和访问器属性都可以用static关键字来定义，唯一的限制是不能将static用于定义构造函数方法

&emsp;&emsp;注意：不可在实例中访问静态成员，必须要直接在类中访问静态成员

&nbsp;

### 继承与派生类

&emsp;&emsp;在ES6之前，实现继承与自定义类型是一个不小的工作。严格意义上的继承需要多个步骤实现

<div>
<pre>function Rectangle(length, width) {
    this.length = length;
    this.width = width;
}
Rectangle.prototype.getArea = function() {
    return this.length * this.width;
};
function Square(length) {
    Rectangle.call(this, length, length);
}
Square.prototype = Object.create(Rectangle.prototype, {
    constructor: {
        value:Square,
        enumerable: true,
        writable: true,
        configurable: true
    }
});
var square = new Square(3);
console.log(square.getArea()); // 9
console.log(square instanceof Square); // true
console.log(square instanceof Rectangle); // true</pre>
</div>

&emsp;&emsp;Square继承自Rectangle，为了这样做，必须用一个创建自Rectangle.prototype的新对象重写Square.prototype并调用Rectangle.call()方法。JS新手经常对这些步骤感到困惑，即使是经验丰富的开发者也常在这里出错

&emsp;&emsp;类的出现让我们可以更轻松地实现继承功能，使用熟悉的extends关键字可以指定类继承的函数。原型会自动调整，通过调用super()方法即可访问基类的构造函数

<div>
<pre>class Rectangle {
    constructor(length, width) {
        this.length = length;
        this.width = width;
    }
    getArea() {
        return this.length * this.width;
    }
}
class Square extends Rectangle {
    constructor(length) {
        // 与 Rectangle.call(this, length, length) 相同
        super(length, length);
    }
}
var square = new Square(3);
console.log(square.getArea()); // 9
console.log(square instanceof Square); // true
console.log(square instanceof Rectangle); // true</pre>
</div>

&emsp;&emsp;这一次，square类通过extends关键字继承Rectangle类，在square构造函数中通过super()调用Rectangle构造函数并传入相应参数。请注意，与ES5版本代码不同的是，标识符Rectangle只用于类声明(extends之后)

&emsp;&emsp;继承自其他类的类被称作派生类，如果在派生类中指定了构造函数则必须要调用super()，如果不这样做程序就会报错。如果选择不使用构造函数，则当创建新的类实例时会自动调用super()并传入所有参数

<div>
<pre>class Square extends Rectangle {
    // 没有构造器
}
// 等价于：
class Square extends Rectangle {
    constructor(...args) {
        super(...args);
    }
}</pre>
</div>

&emsp;&emsp;示例中的第二个类是所有派生类的等效默认构造函数，所有参数按顺序被传递给基类的构造函数。这里展示的功能不太正确，因为square的构造函数只需要一个参数，所以最好手动定义构造函数

**注意事项**

&emsp;&emsp;使用super()时有以下几个关键点

&emsp;&emsp;1、只可在派生类的构造函数中使用super()，如果尝试在非派生类(不是用extends声明的类)或函数中使用则会导致程序抛出错误

&emsp;&emsp;2、在构造函数中访问this之前一定要调用super()，它负责初始化this，如果在调用super()之前尝试访问this会导致程序出错

&emsp;&emsp;3、如果不想调用super()，则唯一的方法是让类的构造函数返回一个对象

【类方法遮蔽】

&emsp;&emsp;派生类中的方法总会覆盖基类中的同名方法。比如给square添加getArea()方法来重新定义这个方法的功能

<div>
<pre>class Square extends Rectangle {
    constructor(length) {
        super(length, length);
    }
    // 重写并屏蔽 Rectangle.prototype.getArea()
    getArea() {
        return this.length * this.length;
    }
}</pre>
</div>

&emsp;&emsp;由于为square定义了getArea()方法，便不能在square的实例中调用Rectangle.prototype.getArea()方法。当然，如果想调用基类中的该方法，则可以调用super.getArea()方法

<div>
<pre>class Square extends Rectangle {
    constructor(length) {
        super(length, length);
    }
    // 重写、屏蔽并调用了 Rectangle.prototype.getArea()
    getArea() {
        return super.getArea();
    }
}</pre>
</div>

&emsp;&emsp;以这种方法使用Super，this值会被自动正确设置，然后就可以进行简单的方法调用了

【静态成员继承】

&emsp;&emsp;如果基类有静态成员，那么这些静态成员在派生类中也可用。JS中的继承与其他语言中的继承一样，只是在这里继承还是一个新概念

<div>
<pre>class Rectangle {
    constructor(length, width) {
        this.length = length;
        this.width = width;
    }
    getArea() {
        return this.length * this.width;
    }
    static create(length, width) {
        return new Rectangle(length, width);
    }
}
class Square extends Rectangle {
    constructor(length) {
        // 与 Rectangle.call(this, length, length) 相同
        super(length, length);
    }
}
var rect = Square.create(3, 4);
console.log(rect instanceof Rectangle); // true
console.log(rect.getArea()); // 12
console.log(rect instanceof Square); // false</pre>
</div>

&emsp;&emsp;在这段代码中，新的静态方法create()被添加到Rectangle类中，继承后的Square.create()与Rectangle.create()的行为很像

【派生自表达式的类】&nbsp;

&emsp;&emsp;ES6最强大的一面或许是从表达式导出类的功能了。只要表达式可以被解析为一个函数并且具有[[Construct]属性和原型，那么就可以用extends进行派生

<div>
<pre>function Rectangle(length, width) {
    this.length = length;
    this.width = width;
}
Rectangle.prototype.getArea = function() {
    return this.length * this.width;
};
class Square extends Rectangle {
    constructor(length) {
        super(length, length);
    }
}
var x = new Square(3);
console.log(x.getArea()); // 9
console.log(x instanceof Rectangle); // true</pre>
</div>

&emsp;&emsp;Rectangle是一个ES5风格的构造函数，Square是一个类，由于Rectangle具有[[Construct]]属性和原型，因此Square类可以直接继承它

&emsp;&emsp;extends强大的功能使类可以继承自任意类型的表达式，从而创造更多可能性，例如动态地确定类的继承目标

<div>
<pre>function Rectangle(length, width) {
    this.length = length;
    this.width = width;
}
Rectangle.prototype.getArea = function() {
    return this.length * this.width;
};
function getBase() {
    return Rectangle;
}
class Square extends getBase() {
    constructor(length) {
        super(length, length);
    }
}
var x = new Square(3);
console.log(x.getArea()); // 9
console.log(x instanceof Rectangle); // true</pre>
</div>

&emsp;&emsp;getBase()函数是类声明的一部分，直接调用后返回Rectangıe，此示例实现的功能与之前的示例等价。由于可以动态确定使用哪个基类，因而可以创建不同的继承方法

<div>
<pre>let SerializableMixin = {
    serialize() {
        return JSON.stringify(this);
    }
};
let AreaMixin = {
    getArea() {
        return this.length * this.width;
    }
};
function mixin(...mixins) {
    var base = function() {};
    Object.assign(base.prototype, ...mixins);
    return base;
}
class Square extends mixin(AreaMixin, SerializableMixin) {
    constructor(length) {
        super();
        this.length = length;
        this.width = length;
    }
}
var x = new Square(3);
console.log(x.getArea()); // 9
console.log(x.serialize()); // "{"length":3,"width":3}"</pre>
</div>

&emsp;&emsp;这个示例使用了mixin函数代替传统的继承方法，它可以接受任意数量的mixin对象作为参数。首先创建一个函数base，再将每一个mixin对象的属性值赋值给base的原型，最后minxin函数返回这个base函数，所以Square类就可以基于这个返回的函数用extends进行扩展。由于使用了extends,因此在构造函数中需要调用super()

&emsp;&emsp;Square的实例拥有来自AreaMixin对象的getArea()方法和来自SerializableMixin对象的serialize方法，这都是通过原型继承实现的，mixin()函数会用所有mixin对象的自有属性动态填充新函数的原型。如果多个mixin对象具有相同属性，那么只有最后一个被添加的属性被保留

&emsp;&emsp;注意：在extends后可以使用任意表达式，但不是所有表达式最终都能生成合法的类。如果使用null或生成器函数会导致错误发生，类在这些情况下没有[[Consturct]]属性，尝试为其创建新的实例会导致程序无法调用[[Construct]]而报错

【内建对象的继承】

&emsp;&emsp;自JS数组诞生以来，一直都希望通过继承的方式创建属于自己的特殊数组。在ES5中这几乎是不可能的，用传统的继承方式无法实现这样的功能

<div>
<pre>// 内置数组的行为
var colors = [];
colors[0] = "red";
console.log(colors.length); // 1
colors.length = 0;
console.log(colors[0]); // undefined
// 在 ES5 中尝试继承数组
function MyArray() {
    Array.apply(this, arguments);
}
MyArray.prototype = Object.create(Array.prototype, {
    constructor: {
        value: MyArray,
        writable: true,
        configurable: true,
        enumerable: true
    }
});
var colors = new MyArray();
colors[0] = "red";
console.log(colors.length); // 0
colors.length = 0;
console.log(colors[0]); // "red"</pre>
</div>

&emsp;&emsp;这段代码最后console.log()的输出结果与预期不符，MyArray实例的length和数值型属性的行为与内建数组中的不一致，这是因为通过传统JS继承形式实现的数组继承没有从Array.apply()或原型赋值中继承相关功能

&emsp;&emsp;ES6类语法的一个目标是支持内建对象继承，因而ES6中的类继承模型与ES5稍有不同，主要体现在两个方面

&emsp;&emsp;在ES5的传统继承方式中，先由派生类型(如MyArray)创建this的值，然后调用基类型的构造函数(如Array.apply()方法)。这也意味着，this的值开始指向MyArray的实例，但是随后会被来自Array的其他属性修饰

&emsp;&emsp;ES6中的类继承则与之相反，先由基类(Array)创建this的值，然后派生类的构造函数(MyArray)再修改这个值。所以一开始可以通过this访问基类的所有内建功能，然后再正确地接收所有与之相关的功能

<div>
<pre>class MyArray extends Array {
    // 空代码块
}
var colors = new MyArray();
colors[0] = "red";
console.log(colors.length); // 1
colors.length = 0;
console.log(colors[0]); // undefined</pre>
</div>

&emsp;&emsp;MyArray直接继承自Array，其行为与Array也很相似，操作数值型属性会更新length属性，操作length属性也会更新数值型属性。于是，可以正确地继承Array对象来创建自己的派生数组类型，当然也可以继承其他的内建对象

【Symbol.species属性】

&emsp;&emsp;内建对象继承的一个实用之处是，原本在内建对象中返回实例自身的方法将自动返回派生类的实例。所以，如果有一个继承自Array的派生类MyArray，那么像slice()这样的方法也会返回一个MyArray的实例

<div>
<pre>class MyArray extends Array {
    // 空代码块
}
let items = new MyArray(1, 2, 3, 4),
    subitems = items.slice(1, 3);
console.log(items instanceof MyArray); // true
console.log(subitems instanceof MyArray); // true</pre>
</div>

&emsp;&emsp;正常情况下，继承自Array的slice()方法应该返回Array的实例，但是在这段代码中，slice()方法返回的是MyArray的实例。在浏览器引擎背后是通过Symbol.species属性实现这一行为

&emsp;&emsp;Symbol.species是诸多内部Symbol中的一个，它被用于定义返回函数的静态访问器属性。被返回的函数是一个构造函数，每当要在实例的方法中(不是在构造函数中)创建类的实例时必须使用这个构造函数。以下这些内建类型均己定义Symbol.species属性

<div>
<pre>Array
ArrayBuffer
Map
Promise
RegExp
Set
Typed arrays</pre>
</div>

&emsp;&emsp;列表中的每个类型都有一个默认的symbol.species属性，该属性的返回值为this，这也意味着该属性总会返回构造函数

<div>
<pre>// 几个内置类型使用 species 的方式类似于此
class MyClass {
    static get [Symbol.species]() {
        return this;
    }
    constructor(value) {
        this.value = value;
    }
    clone() {
        return new this.constructor[Symbol.species](this.value);
    }
}</pre>
</div>

&emsp;&emsp;在这个示例中，Symbol.species被用来给MyClass赋值静态访问器属性。这里只有一个getter方法却没有setter方法，这是因为在这里不可以改变类的种类。调用this.constructor[Symbol.species]会返回MyClass，clone()方法通过这个定义可以返回新的实例，从而允许派生类覆盖这个值

<div>
<pre>class MyClass {
    static get [Symbol.species]() {
        return this;
    }
    constructor(value) {
        this.value = value;
    }
    clone() {
        return new this.constructor[Symbol.species](this.value);
    }
}
class MyDerivedClass1 extends MyClass {
    // 空代码块
}
class MyDerivedClass2 extends MyClass {
    static get [Symbol.species]() {
        return MyClass;
    }
}
let instance1 = new MyDerivedClass1("foo"),
clone1 = instance1.clone(),
instance2 = new MyDerivedClass2("bar"),
clone2 = instance2.clone();
console.log(clone1 instanceof MyClass); // true
console.log(clone1 instanceof MyDerivedClass1); // true
console.log(clone2 instanceof MyClass); // true
console.log(clone2 instanceof MyDerivedClass2); // false</pre>
</div>

&emsp;&emsp;在这里，MyDerivedClass1继承MyClass时未改变Symbol.species属性，由于this.constructor[Symbol.species]的返回值是MyDerivedClass1，因此调用clone()返回的是MyDerivedClass1的实例；MyDerivedClass2继承MyClass时重写了Symbol.species让其返回MyClass，调用MyDerivedClass2实例的clone()方法时，返回值是一个MyClass的实例。通过Symbol.species可以定义当派生类的方法返回实例时，应该返回的值的类型

&emsp;&emsp;数组通过Symbol.species来指定那些返回数组的方法应当从哪个类中获取。在一个派生自数组的类中，可以决定继承的方法返回何种类型的对象

<div>
<pre>class MyArray extends Array {
    static get [Symbol.species]() {
        return Array;
    }
}
let items = new MyArray(1, 2, 3, 4),
subitems = items.slice(1, 3);
console.log(items instanceof MyArray); // true
console.log(subitems instanceof Array); // true
console.log(subitems instanceof MyArray); // false</pre>
</div>

&emsp;&emsp;这段代码重写了MyArray继承自Array的Symbol.species属性，所有返回数组的继承方法现在将使用Array的实例，而不使用MyArray的实例

&emsp;&emsp;一般来说，只要想在类方法中调用this.constructor，就应该使用Symbol.species属性，从而让派生类重写返回类型。而且如果正从一个已定义Symbol.species属性的类创建派生类，那么要确保使用那个值而不是使用构造函数

【在类的构造函数中使用new.target】

&emsp;&emsp;new.target及它的值根据函数被调用的方式而改变。在类的构造函数中也可以通过new.target来确定类是如何被调用的。简单情况下，new.target等于类的构造函数

<div>
<pre>class Rectangle {
    constructor(length, width) {
        console.log(new.target === Rectangle);
        this.length = length;
        this.width = width;
    }
}
// new.target 就是 Rectangle
var obj = new Rectangle(3, 4); // 输出 true</pre>
</div>

&emsp;&emsp;这段代码展示了当调用new Rectangle(3.4)时等价于Rectangle的new.target。类构造函数必须通过new关键字调用，所以总是在类的构造函数中定义new.target属性，但是其值有时会不同

<div>
<pre>class Rectangle {
    constructor(length, width) {
        console.log(new.target === Rectangle);
        this.length = length;
        this.width = width;
    }
}
class Square extends Rectangle {
    constructor(length) {
        super(length, length)
    }
}
// new.target 就是 Square
var obj = new Square(3); // 输出 false</pre>
</div>

&emsp;&emsp;Square调用Rectangle的构造函数，所以当调用发生时new.target等于Square。这一点非常重要，因为每个构造函数都可以根据自身被调用的方式改变自己的行为

<div>
<pre>// 静态的基类
class Shape {
    constructor() {
        if (new.target === Shape) {
            throw new Error("This class cannot be instantiated directly.")
        }
    }
}
class Rectangle extends Shape {
    constructor(length, width) {
        super();
        this.length = length;
        this.width = width;
    }
}
var x = new Shape(); // 抛出错误
var y = new Rectangle(3, 4); // 没有错误
console.log(y instanceof Shape); // true</pre>
</div>

&emsp;&emsp;在这个示例中，每当new.target是Shape时构造函数总会抛出错误，这相当于调用new Shape()时总会出错。但是，仍可用Shape作为基类派生其他类，示例中的Rectangle便是这样。super()调用执行了Shape的构造函数，new.target与Rectangle等价，所以构造函数继续执行不会抛出错误

&emsp;&emsp;注意：因为类必须通过new关键字才能调用，所以在类的构造函数中，new.target属性永远不会是undefined

