# ES6中的Symbol类型

&emsp;&emsp;ES5中包含5种原始类型：[字符串](http://www.cnblogs.com/xiaohuochai/p/5599529.html)、[数字](http://www.cnblogs.com/xiaohuochai/p/5586166.html)、[布尔值](http://www.cnblogs.com/xiaohuochai/p/5616641.html)、[null](http://www.cnblogs.com/xiaohuochai/p/5665637.html#anchor3)和[undefined](http://www.cnblogs.com/xiaohuochai/p/5665637.html#anchor2)。ES6引入了第6种原始类型&mdash;&mdash;Symbol

&emsp;&emsp;ES5的对象属性名都是字符串，很容易造成属性名冲突。比如，使用了一个他人提供的对象，想为这个对象添加新的方法，新方法的名字就有可能与现有方法产生冲突。如果有一种机制，保证每个属性的名字都是独一无二的，这样就从根本上防止了属性名冲突。这就是ES6引入`Symbol`的原因，本文将详细介绍ES6中的Symbol类型

&nbsp;

### 创建

&emsp;&emsp;Symbol 值通过`Symbol`函数生成。这就是说，对象的属性名可以有两种类型：一种是字符串，另一种是Symbol类型。凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突

<div>
<pre>let firstName = Symbol();
let person = {};
person[firstName] = "huochai";
console.log(person[firstName]); // "huochai"</pre>
</div>

&emsp;&emsp;注意：`Symbol`函数前不能使用`new`命令，否则会报错。因为生成的 Symbol 是一个原始类型的值，不是对象

<div>
<pre>//Uncaught TypeError: Symbol is not a constructor
let firstName = new Symbol();</pre>
</div>

&emsp;&emsp;Symbol函数接受一个可选参数，可以添加一段文本来描述即将创建的Symbol，这段描述不可用于属性访问，但是建议在每次创建Symbol时都添加这样一段描述，以便于阅读代码和调试Symbol程序

<div>
<pre>let firstName = Symbol("first name");
let person = {};
person[firstName] = "huochai";
console.log("first name" in person); // false
console.log(person[firstName]); // "huochai"
console.log(firstName); // "Symbol(first name)"</pre>
</div>

&emsp;&emsp;Symbol的描述被存储在内部[[Description]]属性中，只有当调用Symbol的toString()方法时才可以读取这个属性。在执行console.log()时隐式调用了firstName的toString()方法，所以它的描述会被打印到日志中，但不能直接在代码里访问[[Description]]

【类型检测】

&emsp;&emsp;Symbol是原始值，ES6扩展了typeof操作符，返回"symbol"。所以可以用typeof来检测变量是否为symbol类型

<div>
<pre>let symbol = Symbol("test symbol");
console.log(typeof symbol); // "symbol"</pre>
</div>

&nbsp;

### 使用

&emsp;&emsp;由于每一个Symbol值都是不相等的，这意味着Symbol值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖

&emsp;&emsp;所有使用可计算属性名的地方，都可以使用Symbol

<div>
<pre>let firstName = Symbol("first name");
// 使用一个需计算字面量属性
let person = {
    [firstName]: "huochai"
};
// 让该属性变为只读
Object.defineProperty(person, firstName, { writable: false });
let lastName = Symbol("last name");
Object.defineProperties(person, {
    [lastName]: {
        value: "match",
        writable: false
    }
});
console.log(person[firstName]); // "huochai"
console.log(person[lastName]); // "match"</pre>
</div>

&emsp;&emsp;在此示例中，首先通过可计算对象字面量属性语法为person对象创建了个Symbol属性firstName。后面一行代码将这个属性设置为只读。随后，通过Object.defineProperties()方法创建一个只读的Symbol属性lastName，此处再次使用了对象字面量属性，但却是作为object.defineProperties()方法的第二个参数使用

&emsp;&emsp;注意：Symbol 值作为对象属性名时，不能用点运算符

<div>
<pre>var mySymbol = Symbol();
var a = {};
a.mySymbol = 'Hello!';
a[mySymbol] // undefined
a['mySymbol'] // "Hello!"</pre>
</div>

&emsp;&emsp;由上面结果看出，a.mySymbol和a['mySymbol']里的mySymbol是字符串类型的属性名，a[mySymbol]里的mySymbol才是Symbol类型的属性名。虽然都叫mySymbol，但值不相同

&emsp;&emsp;尽管在所有使用可计算属性名的地方，都可以使用Symbol来代替，但是为了在不同代码片段间有效地共享这些Symbol，需要建立一个体系

&nbsp;

### 共享体系

&emsp;&emsp;有时希望在不同的代码中共享同一个Symbol，例如，在应用中有两种不同的对象类型，但是希望它们使用同一个Symbol属性来表示一个独特的标识符。一般而言，在很大的代码库中或跨文件追踪Symbol非常困难而且容易出错，出于这些原因，ES6提供了一个可以随时访问的全局Symbol注册表

【Symbol.for()】

&emsp;&emsp;如果想创建一个可共享的Symbol，要使用Symbol.for()方法。它只接受一个参数，也就是即将创建的Symbol的字符串标识符，这个参数同样也被用作Symbol的描述

<div>
<pre>let uid = Symbol.for("uid");
let object = {};
object[uid] = "12345";
console.log(object[uid]); // "12345"
console.log(uid); // "Symbol(uid)"</pre>
</div>

&emsp;&emsp;Symbol.for()方法首先在全局Symbol注册表中搜索键为"uid"的Symbol是否存在。如果存在，直接返回已有的Symbol，否则，创建一个新的Symbol，并使用这个键在Symbol全局注册表中注册，随即返回新创建的Symbol

&emsp;&emsp;后续如果再传入同样的键调用Symbol.for()会返回相同的Symbol

<div>
<pre>let uid = Symbol.for("uid");
let object = {
    [uid]: "12345"
};
console.log(object[uid]); // "12345"
console.log(uid); // "Symbol(uid)"
let uid2 = Symbol.for("uid");
console.log(uid === uid2); // true
console.log(object[uid2]); // "12345"
console.log(uid2); // "Symbol(uid)</pre>
</div>

&emsp;&emsp;在这个示例中，uid和uid2包含相同的Symbol并且可以互换使用。第一次调用Symbol.for()方法创建这个Symbol，第二次调用可以直接从Symbol的全局注册表中检索到这个Symbol

【Symbol.keyFor()】

&emsp;&emsp;还有一个与Symbol共享有关的特性：可以使用Symbol.keyFor()方法在Symbol全局注册表中检索与Symbol有关的键

<div>
<pre>let uid = Symbol.for("uid");
console.log(Symbol.keyFor(uid)); // "uid"
let uid2 = Symbol.for("uid");
console.log(Symbol.keyFor(uid2)); // "uid"
let uid3 = Symbol("uid");
console.log(Symbol.keyFor(uid3)); // undefined</pre>
</div>

&emsp;&emsp;uid和uid2都返回了"uid"这个键，而在Symbol全局注册表中不存在uid3这个Symbol，也就是不存在与之有关的键，所以最终返回undefined

&emsp;&emsp;注意：`Symbol.for`为Symbol值登记的名字，是全局环境的，可以在不同的 iframe 或 service worker 中取到同一个值

<div>
<pre>let iframe = document.createElement('iframe');
iframe.src = String(window.location);
document.body.appendChild(iframe);
console.log(iframe.contentWindow.Symbol.for('foo') === Symbol.for('foo'));// true</pre>
</div>

&emsp;&emsp;上面代码中，iframe 窗口生成的 Symbol 值，可以在主页面得到

&emsp;&emsp;Symbol全局注册表是一个类似全局作用域的共享环境，也就是说不能假设目前环境中存在哪些键。当使用第三方组件时，尽量使用Symbol键的命名空间以减少命名冲突。例如，jQuery的代码可以为所有键添加"jquery"前缀，就像"jquery.element"或其他类似的键

&nbsp;

### 类型转换

&emsp;&emsp;类型转换是JS中的一个重要语言特性，然而其他类型没有与Symbol逻辑等价的值，因而Symbol使用起来不是很灵活

&emsp;&emsp;使用console.log()方法来输出Symbol的内容，它会调用Symbol的String()方法并输出有用的信息。也可以像这样直接调用string()方法来获得相同的内容

<div>
<pre>let uid = Symbol.for("uid"),
    desc = String(uid);
console.log(desc); // "Symbol(uid)"</pre>
</div>

&emsp;&emsp;String()函数调用了uid.toString()方法，返回字符串类型的Symbol描述里的内容。但是，如果尝试将Symbol与一个字符串拼接，会导致程序抛出错误

<div>
<pre>let uid = Symbol.for("uid"),
desc = uid + ""; // 引发错误！</pre>
</div>

&emsp;&emsp;将uid与空字符串拼接，首先要将uid强制转换为一个字符串，而Symbol不可以被转换为字符串，故程序直接抛出错误

&emsp;&emsp;同样，也不能将Symbol强制转换为数字类型。将Symbol与每一个数学运算符混合使用都会导致程序抛出错误

<div>
<pre>let uid = Symbol.for("uid"),
sum = uid / 1; // 引发错误！</pre>
</div>

&emsp;&emsp;尝试将Symbol除1，程序直接抛出错误。而且无论使用哪一个数学操作符，都无法正常运行

&emsp;&emsp;注意：布尔值除外，因为Symbol与JS中的非空值类似，其等价布尔值为true

<div>
<pre>let uid = Symbol.for("uid");
console.log(uid);//'Symbol(uid)'
console.log(!uid);//false
console.log(Boolean(uid));//true</pre>
</div>

&nbsp;

### 属性检索

&emsp;&emsp;Symbol作为属性名，该属性不会出现在for...in、for...of循环中，也不会被Object.getOwnPropertyNames()、Object.keys()、JSON.stringify()返回。于是，在ES6中添加了一个Object.getOwnpropertySymbols()方法来检索对象中的Symbol属性

&emsp;&emsp;Object.getOwnPropertySymbols()方法的返回值是一个包含所有Symbol自有属性的数组

<div>
<pre>let uid = Symbol.for("uid");
let object = {
    [uid]: "12345"
};
let symbols = Object.getOwnPropertySymbols(object);
console.log(symbols.length); // 1
console.log(symbols[0]); // "Symbol(uid)"
console.log(object[symbols[0]]); // "12345"</pre>
</div>

&emsp;&emsp;在这段代码中，object对象有一个名为uid的Symbol属性，object.getOwnPropertySymbols()方法返回了包含这个属性的数组

&emsp;&emsp;另一个新的API&mdash;&mdash;`Reflect.ownKeys()`方法可以返回所有类型的键名，包括常规键名和 Symbol 键名

<div>
<pre>let obj = {
  [Symbol('my_key')]: 1,
  enum: 2,
  nonEnum: 3
};
console.log(Reflect.ownKeys(obj));//  ["enum", "nonEnum", Symbol(my_key)]</pre>
</div>

&emsp;&emsp;由于以 Symbol 值作为名称的属性，不会被常规方法遍历得到。可以利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法

<div>
<pre>var size = Symbol('size');
class Collection {
  constructor() {
    this[size] = 0;
  }
  add(item) {
    this[this[size]] = item;
    this[size]++;
  }
  static sizeOf(instance) {
    return instance[size];
  }
}
var x = new Collection();
Collection.sizeOf(x) // 0
x.add('foo');
Collection.sizeOf(x) // 1
Object.keys(x) // ['0']
Object.getOwnPropertyNames(x) // ['0']
Object.getOwnPropertySymbols(x) // [Symbol(size)]</pre>
</div>

&emsp;&emsp;上面代码中，对象x的size属性是一个Symbol值，所以Object.keys(x)、Object.getOwnPropertyNames(x)都无法获取它。这就造成了一种非私有的内部方法的效果

&nbsp;

### 内置Symbol

&emsp;&emsp;除了定义自己使用的Symbol值以外，ES6还提供了11个内置的Symbol值，指向语言内部使用的方法

&emsp;&emsp;1、Symbol.haslnstance

&emsp;&emsp;一个在执行instanceof时调用的内部方法，用于检测对象的继承信息

&emsp;&emsp;2、Symbol.isConcatSpreadable

&emsp;&emsp;一个布尔值，用于表示当传递一个集合作为Array.prototype.concat()方法的参数时，是否应该将集合内的元素规整到同一层级

&emsp;&emsp;3、Symbol.iterator

&emsp;&emsp;一个返回迭代器的方法

&emsp;&emsp;4、Symbol.match

&emsp;&emsp;一个在调用String.prototype.match()方法时调用的方法，用于比较字符串

&emsp;&emsp;5、Symbol.replace

&emsp;&emsp;一个在调用String.prototype.replace()方法时调用的方法，用于替换字符串的子串

&emsp;&emsp;6、Symbol.search

&emsp;&emsp;一个在调用String.prototype.search()方法时调用的方法，用于在字符串中定位子串

&emsp;&emsp;7、Symbol.species

&emsp;&emsp;用于创建派生类的构造函数

&emsp;&emsp;8、Symbol.split

&emsp;&emsp;一个在调用String.prototype.split()方法时调用的方法，用于分割字符串

&emsp;&emsp;9、Symbol.toprimitive

&emsp;&emsp;一个返回对象原始值的方法

&emsp;&emsp;10、Symbol.ToStringTag

&emsp;&emsp;一个在调用Object.prototype.toString()方法时使用的字符串，用于创建对象描述

&emsp;&emsp;11、Symbol.unscopables

&emsp;&emsp;一个定义了一些不可被with语句引用的对象属性名称的对象集合

【Symbol.haslnstance】

&emsp;&emsp;每个函数都有一个Symbol.haslnstance方法，用于确定对象是否为函数的实例。该方法在Function.prototype中定义，所有函数都继承了instanceof属性的默认行为。为了确保Symbol.haslnstance不会被意外重写，该方法被定义为不可写、不可配置并且不可枚举

&emsp;&emsp;Symbol.haslnstance方法只接受一个参数，即要检查的值。如果传入的值是函数的实例，则返回true

<div>
<pre>obj instanceof Array;</pre>
</div>

&emsp;&emsp;以上这行代码等价于下面这行

<div>
<pre>Array[Symbol.hasInstance](obj);</pre>
</div>

&emsp;&emsp;本质上，ES6只是将instanceof操作符重新定义为此方法的简写语法。现在引入方法调用后，就可以随意改变instanceof的运行方式了

<div>
<pre>class MyClass {
  [Symbol.hasInstance](foo) {
    return foo instanceof Array;
  }
}
console.log([1, 2, 3] instanceof new MyClass()); // true</pre>
</div>

&emsp;&emsp;假设定义一个无实例的函数，就可以将Symbol.haslnstance的返回值硬编码为false

<div>
<pre>function MyObject() {
    // ...
}
Object.defineProperty(MyObject, Symbol.hasInstance, {
    value: function(v) {
        return false;
    }
});
let obj = new MyObject();
console.log(obj instanceof MyObject); // false</pre>
</div>

&emsp;&emsp;只有通过Object.defineProperty()方法才能够改写一个不可写属性，上面的示例调用这个方法来改写symbol.haslnstance，为其定义一个总是返回false的新函数，即使obj实际上确实是Myobject类的实例，在调用过object.defineProperty()方法之后，instanceof运算符返回的也是false

&emsp;&emsp;当然，也可以基于任意条件，通过值检查来确定被检测的是否为实例。例如，可以将1～100的数字定义为一个特殊数字类型的实例，具体实现的代码如下

<div>
<pre>function SpecialNumber() {
  // empty
}
Object.defineProperty(SpecialNumber, Symbol.hasInstance, {
    value: function(v) {
        return (v instanceof Number) &amp;&amp; (v &gt;=1 &amp;&amp; v &lt;= 100);
    }
});
let two = new Number(2),
zero = new Number(0);
console.log(two instanceof SpecialNumber); // true
console.log(zero instanceof SpecialNumber); // false</pre>
</div>

&emsp;&emsp;在这段代码中定义了一个symbol.hasInstance方法，当值为Number的实例且其值在1～100之间时返回true。所以即使SpecialNumber函数和变量two之间没有直接关系，变量two也被确认为specialNumber的实例

&emsp;&emsp;如果要触发Symbol.haslnstance调用，instanceof的左操作数必须是一个对象，如果左操作数为非对象会导致instanceof总是返回false

&emsp;&emsp;当然，可以重写所有内建函数(如Date和Error函数)默认的symbol.haslnstance属性。但是这样做的后果是代码的运行结果变得不可预期且有可能令人感到困惑，所以不推荐这样做，最好的做法是，只在必要情况下改写自己声明的函数的Symbol.haslnstance属性

【Symbol.isConcatSpreadable】

&emsp;&emsp;对象的Symbol.isConcatSpreadable属性是布尔值，表示该对象使用Array.prototype.concat()时，是否可以展开

<div>
<pre>let arr1 = ['c', 'd'];
['a', 'b'].concat(arr1, 'e') // ['a', 'b', 'c', 'd', 'e']
arr1[Symbol.isConcatSpreadable] // undefined
let arr2 = ['c', 'd'];
arr2[Symbol.isConcatSpreadable] = false;
['a', 'b'].concat(arr2, 'e') // ['a', 'b', ['c','d'], 'e']</pre>
</div>

&emsp;&emsp;上面代码说明，数组的默认行为是可以展开。`Symbol.isConcatSpreadable`属性等于undefined或true，都有这个效果

&emsp;&emsp;类数组对象也可以展开，但它的`Symbol.isConcatSpreadable`属性默认为`false`，必须手动打开

<div>
<pre>let obj = {length: 2, 0: 'c', 1: 'd'};
['a', 'b'].concat(obj, 'e') // ['a', 'b', obj, 'e']
obj[Symbol.isConcatSpreadable] = true;
['a', 'b'].concat(obj, 'e') // ['a', 'b', 'c', 'd', 'e']</pre>
</div>

&emsp;&emsp;对于一个类来说，`Symbol.isConcatSpreadable`属性必须写成实例的属性

<div>
<pre>class A1 extends Array {
  constructor(args) {
    super(args);
    this[Symbol.isConcatSpreadable] = true;
  }
}
class A2 extends Array {
  constructor(args) {
    super(args);
    this[Symbol.isConcatSpreadable] = false;
  }
}
let a1 = new A1();
a1[0] = 3;
a1[1] = 4;
let a2 = new A2();
a2[0] = 5;
a2[1] = 6;
[1, 2].concat(a1).concat(a2)
// [1, 2, 3, 4, [5, 6]]</pre>
</div>

&emsp;&emsp;上面代码中，类`A1`是可展开的，类`A2`是不可展开的，所以使用`concat`时有不一样的结果

【Symbol.species】

&emsp;&emsp;对象的`Symbol.species`属性，指向当前对象的构造函数。创造实例时，默认会调用这个方法，即使用这个属性返回的函数当作构造函数，来创造新的实例对象

<div>
<pre>class MyArray extends Array {
  // 覆盖父类 Array 的构造函数
  static get [Symbol.species]() { return Array; }
}</pre>
</div>

&emsp;&emsp;上面代码中，子类`MyArray`继承了父类`Array`。创建`MyArray`的实例对象时，本来会调用它自己的构造函数，但是由于定义了`Symbol.species`属性，所以会使用这个属性返回的的函数，创建`MyArray`的实例

&emsp;&emsp;这个例子也说明，定义`Symbol.species`属性要采用`get`读取器。默认的`Symbol.species`属性等同于下面的写法

<div>
<pre>static get [Symbol.species]() {
  return this;
}</pre>
</div>

&emsp;&emsp;下面是一个例子

<div>
<pre>class MyArray extends Array {
  static get [Symbol.species]() { return Array; }
}
var a = new MyArray(1,2,3);
var mapped = a.map(x =&gt; x * x);
mapped instanceof MyArray // false
mapped instanceof Array // true</pre>
</div>

&emsp;&emsp;上面代码中，由于构造函数被替换成了`Array`。所以，`mapped`对象不是`MyArray`的实例，而是`Array`的实例

【Symbol.match】

&emsp;&emsp;对象的`Symbol.match`属性，指向一个函数。当执行`str.match(myObject)`时，如果该属性存在，会调用它，返回该方法的返回值

<div>
<pre>String.prototype.match(regexp)
// 等同于
regexp[Symbol.match](this)
class MyMatcher {
  [Symbol.match](string) {
    return 'hello world'.indexOf(string);
  }
}
'e'.match(new MyMatcher()) // 1</pre>
</div>

【Symbol.replace】

&emsp;&emsp;对象的`Symbol.replace`属性，指向一个方法，当该对象被`String.prototype.replace`方法调用时，会返回该方法的返回值

<div>
<pre>String.prototype.replace(searchValue, replaceValue)
// 等同于
searchValue[Symbol.replace](this, replaceValue)</pre>
</div>

&emsp;&emsp;下面是一个例子

<div>
<pre>const x = {};
x[Symbol.replace] = (...s) =&gt; console.log(s);

'Hello'.replace(x, 'World') // ["Hello", "World"]</pre>
</div>

&emsp;&emsp;`Symbol.replace`方法会收到两个参数，第一个参数是`replace`方法正在作用的对象，上面例子是`Hello`，第二个参数是替换后的值，上面例子是`World`

【Symbol.search】

&emsp;&emsp;对象的`Symbol.search`属性，指向一个方法，当该对象被`String.prototype.search`方法调用时，会返回该方法的返回值

<div>
<pre>String.prototype.search(regexp)
// 等同于
regexp[Symbol.search](this)
class MySearch {
  constructor(value) {
    this.value = value;
  }
  [Symbol.search](string) {
    return string.indexOf(this.value);
  }
}
'foobar'.search(new MySearch('foo')) // 0</pre>
</div>

【Symbol.split】

&emsp;&emsp;对象的`Symbol.split`属性，指向一个方法，当该对象被`String.prototype.split`方法调用时，会返回该方法的返回值

<div>
<pre>String.prototype.split(separator, limit)
// 等同于
separator[Symbol.split](this, limit)</pre>
</div>

&emsp;&emsp;下面是一个例子

<div>
<pre>class MySplitter {
  constructor(value) {
    this.value = value;
  }
  [Symbol.split](string) {
    var index = string.indexOf(this.value);
    if (index === -1) {
      return string;
    }
    return [
      string.substr(0, index),
      string.substr(index + this.value.length)
    ];
  }
}
'foobar'.split(new MySplitter('foo'))// ['', 'bar']
'foobar'.split(new MySplitter('bar'))// ['foo', '']
'foobar'.split(new MySplitter('baz'))// 'foobar'</pre>
</div>

&emsp;&emsp;上面方法使用`Symbol.split`方法，重新定义了字符串对象的`split`方法的行为

【Symbol.iterator】

&emsp;&emsp;对象的`Symbol.iterator`属性，指向该对象的默认遍历器方法

<div>
<pre>var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};
[...myIterable] // [1, 2, 3]</pre>
</div>

&emsp;&emsp;对象进行`for...of`循环时，会调用`Symbol.iterator`方法，返回该对象的默认遍历器

<div>
<pre>class Collection {
  *[Symbol.iterator]() {
    let i = 0;
    while(this[i] !== undefined) {
      yield this[i];
      ++i;
    }
  }
}
let myCollection = new Collection();
myCollection[0] = 1;
myCollection[1] = 2;
for(let value of myCollection) {
  console.log(value);
}
// 1
// 2</pre>
</div>

【Symbol.toPrimitive】

&emsp;&emsp;对象的`Symbol.toPrimitive`属性，指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值

&emsp;&emsp;`Symbol.toPrimitive`被调用时，会接受一个字符串参数，表示当前运算的模式，一共有三种模式

&emsp;&emsp;1、Number：该场合需要转成数值

&emsp;&emsp;2、String：该场合需要转成字符串

&emsp;&emsp;3、Default：该场合可以转成数值，也可以转成字符串

<div>
<pre>let obj = {
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'number':
        return 123;
      case 'string':
        return 'str';
      case 'default':
        return 'default';
      default:
        throw new Error();
     }
   }
};
2 * obj // 246
3 + obj // '3default'
obj == 'default' // true
String(obj) // 'str'</pre>
</div>

【String.toStringTag】

&emsp;&emsp;对象的`Symbol.toStringTag`属性，指向一个方法。在该对象上面调用`Object.prototype.toString`方法时，如果这个属性存在，它的返回值会出现在`toString`方法返回的字符串之中，表示对象的类型。也就是说，这个属性可以用来定制`[object Object]`或`[object Array]`中`object`后面的那个字符串

<div>
<pre>// 例一
({[Symbol.toStringTag]: 'Foo'}.toString())
// "[object Foo]"
// 例二
class Collection {
  get [Symbol.toStringTag]() {
    return 'xxx';
  }
}
var x = new Collection();
Object.prototype.toString.call(x) // "[object xxx]"</pre>
</div>

&emsp;&emsp;ES6新增内置对象的`Symbol.toStringTag`属性值如下、

<div>
<pre>    JSON[Symbol.toStringTag]：'JSON'
    Math[Symbol.toStringTag]：'Math'
    Module[Symbol.toStringTag]：'Module'
    ArrayBuffer.prototype[Symbol.toStringTag]：'ArrayBuffer'
    DataView.prototype[Symbol.toStringTag]：'DataView'
    Map.prototype[Symbol.toStringTag]：'Map'
    Promise.prototype[Symbol.toStringTag]：'Promise'
    Set.prototype[Symbol.toStringTag]：'Set'
    %TypedArray%.prototype[Symbol.toStringTag]：'Uint8Array'
    WeakMap.prototype[Symbol.toStringTag]：'WeakMap'
    WeakSet.prototype[Symbol.toStringTag]：'WeakSet'
    %MapIteratorPrototype%[Symbol.toStringTag]：'Map Iterator'
    %SetIteratorPrototype%[Symbol.toStringTag]：'Set Iterator'
    %StringIteratorPrototype%[Symbol.toStringTag]：'String Iterator'
    Symbol.prototype[Symbol.toStringTag]：'Symbol'
    Generator.prototype[Symbol.toStringTag]：'Generator'
    GeneratorFunction.prototype[Symbol.toStringTag]：'GeneratorFunction'</pre>
</div>

【Symbol.unscopables】

&emsp;&emsp;对象的`Symbol.unscopables`属性，指向一个对象。该对象指定了使用`with`关键字时，哪些属性会被`with`环境排除。

<div>
<pre>Array.prototype[Symbol.unscopables]
// {
//   copyWithin: true,
//   entries: true,
//   fill: true,
//   find: true,
//   findIndex: true,
//   includes: true,
//   keys: true
// }

Object.keys(Array.prototype[Symbol.unscopables])
// ['copyWithin', 'entries', 'fill', 'find', 'findIndex', 'includes', 'keys']</pre>
</div>

&emsp;&emsp;上面代码说明，数组有7个属性，会被`with`命令排除

<div>
<pre>// 没有 unscopables 时
class MyClass {
  foo() { return 1; }
}
var foo = function () { return 2; };
with (MyClass.prototype) {
  foo(); // 1
}
// 有 unscopables 时
class MyClass {
  foo() { return 1; }
  get [Symbol.unscopables]() {
    return { foo: true };
  }
}
var foo = function () { return 2; };

with (MyClass.prototype) {
  foo(); // 2
}</pre>
</div>

&emsp;&emsp;上面代码通过指定`Symbol.unscopables`属性，使得`with`语法块不会在当前作用域寻找`foo`属性，即`foo`将指向外层作用域的变量

