# ES6中的Set和Map集合

&emsp;&emsp;在ES6标准制定以前，由于可选的集合类型有限，数组使用的又是数值型索引，因而经常被用于创建队列和栈。如果需要使用非数值型索引，就会用非数组对象创建所需的数据结构，而这就是Set集合与Map集合的早期实现。本文将详细介绍ES6中的set和map集合

&nbsp;

### 引入

&emsp;&emsp;Set集合是一种无重复元素的列表，开发者们一般不会逐一读取数组中的元素，也不太可能逐一访问Set集合中的每个元素，通常的做法是检测给定的值在某个集合中是否存在

&emsp;&emsp;Map集合内含多组键值对，集合中每个元素分别存放着可访问的键名和它对应的值，Map集合经常被用于缓存频繁取用的数据。在标准正式发布以前，开发者们已经在ES5中用非数组对象实现了类似的功能

&emsp;&emsp;ES6新标准将Set集合与Map集合添加到JS中

【ES5】

&emsp;&emsp;在ES5中，开发者们用对象属性来模拟这两种集合

```
let set = Object.create(null);
set.foo = true;
// 检查属性的存在性
if (set.foo) {
    // 一些操作
}
```

&emsp;&emsp;这里的变量set是一个原型为null的对象，不继承任何属性。在ES5中，开发者们经常用类似的方法检查对象的某个属性值是否存在。　在这个示例中，将set.foo赋值为true，通过if语句可以确认该值存在于当前对象中

&emsp;&emsp;模拟这两种集合对象的唯一区别是存储的值不同，以下这个示例是用对象模拟Map集合

```
let map = Object.create(null);
map.foo = "bar";
// 提取一个值
let value = map.foo;
console.log(value); // "bar"
```

&emsp;&emsp;这段代码将字符串"bar"储存在map.foo中。一般来说，Set集合常被用于检查对象中是否存在某个键名，而Map集合常被用于获取已存的信息

&emsp;&emsp;如果程序很简单，确实可以用对象来模拟Set集合与Map集合，但如果触碰到对象属性的某些限制，那么这个方法就会变得更加复杂。例如，所有对象的属性名必须是字符串类型，必须确保每个键名都是字符串类型且在对象中是唯一的

```
let map = Object.create(null);
map[5] = "foo";
console.log(map["5"]); // "foo"
```

&emsp;&emsp;本例中将对象的某个属性赋值为字符串"foo"，而这个属性的键名是数值型的5，它会被自动转换成字符串，所以map["5"]和map[5]引用的其实是同一个属性。如果想分别用数字和字符串作为对象属性的键名，则内部的自动转换机制会导致很多问题。当然，用对象作为属性的键名也会遇到类似的问题

```
let map = Object.create(null),
key1 = {},
key2 = {};
map[key1] = "foo";
console.log(map[key2]); // "foo"
```

&emsp;&emsp;由于对象属性的键名必须是字符串，因而这段代码中的key1和key2将被转换为对象对应的默认字符串"[object Object]"，所以map[key2]和map[key1]引用的是同一个属性。这种错误很难被发现，用不同对象作为对象属性的键名理论上应该指向多个属性，但实际上这种假设却不成立

&emsp;&emsp;由于对象会被转换为默认的字符串表达方式，因此其很难用作对象属性的键名

&emsp;&emsp;对于Map集合来说，如果它的属性值是假值，则在要求使用布尔值的情况下(例如在if语句中)会被自动转换成false。强制转换本身没有问题，但如果考虑这个值的使用场景，就有可能导致错误发生

```
let map = Object.create(null);
map.count = 1;
// 是想检查 "count" 属性的存在性，还是想检查非零值？
if (map.count) {
    // ...
}
```

&emsp;&emsp;这个示例中有一些模棱两可的地方，比如我们应该怎样使用map.count？if语句中，我们是检查map.count是否存在，还是检查值是否非零。在示例中，由于value的值是1，为真值，if语句中的代码将被执行。然而，如果map.count的值为0或者不存在，if语句中的代码块将不会被执行

&emsp;&emsp;在大型软件应用中，一旦发生此类问题将难以定位及调试，从而促使ES6在语言中加入Set集合与Map集合这两种新特性

&emsp;&emsp;当然，在JS中有一个in运算符，不需要读取对象的值就可以判断属性在对象中是否存在，如果存在就返回true。但是，in运算符也会检索对象的原型，只有当对象原型为null时使用这个方法才比较稳妥

&nbsp;

### Set集合

&emsp;&emsp;ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。通过Set集合可以快速访问其中的数据，更有效地追踪各种离散值

&emsp;&emsp;Set 结构的实例有以下属性

```
Set.prototype.constructor：构造函数，默认就是Set函数
Set.prototype.size：返回Set实例的成员总数
```

&emsp;&emsp;Set 实例的操作方法（用于操作数据）包括以下4个

```
add(value)：添加某个值，返回Set结构本身
has(value)：返回一个布尔值，表示该值是否为Set的成员
delete(value)：删除某个值，返回一个布尔值，表示删除是否成功
clear()：清除所有成员，没有返回值
```

【创建Set集合、add()添加元素】

&emsp;&emsp;调用new Set()创建Set集合，调用add()方法向集合中添加元素，访问集合的size属性可以获取集合中目前的元素数量

```
let set = new Set();
set.add(5);
set.add("5");
console.log(set.size); // 2
```

&emsp;&emsp;在Set集合中，不会对所存值进行强制的类型转换，数字5和字符串"5"可以作为两个独立元素存在

```
const s = new Set();
[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
for (let i of s) {
  console.log(i);
}
// 2 3 5 4
```

&emsp;&emsp;上面代码通过`add`方法向 Set 结构加入成员，结果表明 Set 结构不会添加重复的值。

&emsp;&emsp;当然，如果向Set集合中添加多个对象，则它们之间彼此保持独立

```
let set = new Set(),
    key1 = {},
&emsp;&emsp;key2 = {};
set.add(key1);
set.add(key2);
console.log(set.size); // 2
```

&emsp;&emsp;由于key1和key2不会被转换成字符串，因而它们在Set集合中是两个独立的元素；如果被转换， 则二者的值都是'[object Object]'

&emsp;&emsp;如果多次调用add()方法并传入相同的值作为参数，那么后续的调用实际上会被忽略

```
let set = new Set();
set.add(5);
set.add("5");
set.add(5); // 重复了，该调用被忽略
console.log(set.size); // 2
```

&emsp;&emsp;由于第二次传入的数字5是一个重复值，因此其不会被添加到集合中，所以控制台最后输出的Set集合size属性值为2

&emsp;&emsp;可以使用数组来初始化一个 Set ，并且 Set 构造器会确保不重复地使用这些值

```
let set = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
console.log(set.size); // 5
```

&emsp;&emsp;在这个示例中，我们用一个含重复元素的数组来初始化Set集合，数组中有4个数字5，而在生成的集合中只有一个。自动去重的功能对于将已有代码或JSON结构转换为Set集合执行得非常好

&emsp;&emsp;实际上，Set构造函数可以接受所有可迭代对象作为参数，数组、Set集合、Map集合都是可迭代的，因而都可以作为Set构造函数的参数使用；构造函数通过迭代器从参数中提取值

【has()检测元素】

&emsp;&emsp;通过has()方法可以检测Set集合中是否存在某个值

```
let set = new Set();
set.add(5);
set.add("5");
console.log(set.has(5)); // true
console.log(set.has(6)); // false
```

&emsp;&emsp;在这段代码中，set集合里没有数字6这个值，所以set.has(6)调用返回false

【delete()和clear()移除元素】

&emsp;&emsp;调用delete()方法可以移除Set集合中的某一个元素，调用clear()方法会移除集合中的所有元素

```
let set = new Set();
set.add(5);
set.add("5");
console.log(set.has(5)); // true
set.delete(5);
console.log(set.has(5)); // false
console.log(set.size); // 1
set.clear();
console.log(set.has("5")); // false
console.log(set.size); // 0
```

&emsp;&emsp;调用delete(5)之后，只有数字5被移除；执行clear()方法后，Set集合中的所有元素都被清除了

【遍历操作】

&emsp;&emsp;Set 结构的实例有四个遍历方法，可以用于遍历成员

```
keys()：返回键名的遍历器
values()：返回键值的遍历器
entries()：返回键值对的遍历器
forEach()：使用回调函数遍历每个成员
```

**keys()、values()、entries()**

&emsp;&emsp;`keys`方法、`values`方法、`entries`方法返回的都是遍历器对象。由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以`keys`方法和`values`方法的行为完全一致

```
let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
```

&emsp;&emsp;上面代码中，`entries`方法返回的遍历器，同时包括键名和键值，所以每次输出一个数组，它的两个成员完全相等

&emsp;&emsp;Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的`values`方法

```
Set.prototype[Symbol.iterator] === Set.prototype.values// true
```

&emsp;&emsp;这意味着，可以省略`values`方法，直接用`for...of`循环遍历 Set

```
let set = new Set(['red', 'green', 'blue']);

for (let x of set) {
  console.log(x);
}
// red
// green
// blue
```

**forEach()**

&emsp;&emsp;Set结构的实例的`forEach`方法，用于对每个成员执行某种操作，没有返回值

```
let set = new Set(['a','b','c']);
set.forEach((key, value, set) => { console.log(key,value,set);} )
//a a ['a','b','c']
//b b ['a','b','c']
//c c ['a','b','c']
```

&emsp;&emsp;上面代码说明，`forEach`方法的参数就是一个处理函数。该函数的参数依次为键值、键名、集合本身

&emsp;&emsp;在Set集合的forEach()方法中，第二个参数也与数组的一样，如果需要在回调函数中使用this引用，则可以将它作为第二个参数传入forEach()函数

```
let set = new Set([1, 2]);
let processor = {
    output(value) {
        console.log(value);
    },
    process(dataSet) {
        dataSet.forEach(function(value) {
            this.output(value);
        }, this);
    }
};
processor.process(set);
```

&emsp;&emsp;以上示例中，processor.process()方法调用了Set集合的forEach()方法并将this传入作为回调函数的this值，从而this.output()方法可以正确调用processor.output()方法。forEach()方法的回调函数只使用了第一个参数value，所以直接省略了其他参数。在这里也可以使用箭头函数，这样就无须再将this作为第二个参数传入回调函数了

```
let set = new Set([1, 2]);
let processor = {
    output(value) {
        console.log(value);
    },
    process(dataSet) {
        dataSet.forEach((value) => this.output(value));
    }
};
processor.process(set);
```

&emsp;&emsp;在此示例中，箭头函数从外围的process()函数读取this值，所以可以正确地将this.output()方法解析为一次processor.output()调用

&emsp;&emsp;注意：尽管Set集合更适合用来跟踪多个值，而且又可以通过forEach()方法操作集合中的每一个元素，但是不能像访问数组元素那样直接通过索引访问集合中的元素。如有需要，最好先将Set集合转换成一个数组

【将Set集合转换为数组】

&emsp;&emsp;将数组转换为Set集合的过程很简单，只需给Set构造函数传入数组即可；将Set集合再转回数组的过程同样很简单，需要用到展开运算符(...)，它可以将数组中的元素分解为各自独立的函数参数。展开运算符也可以将诸如Set集合的可迭代对象转换为数组

```
let set = new Set([1, 2, 3, 3, 3, 4, 5]),
array = [...set];
console.log(array); // [1,2,3,4,5]
```

&emsp;&emsp;在这里，用一个含重复元素的数组初始化Set集合，集合会自动移除这些重复元素然后再用展开运算符将这些元素放到一个新的数组中。Set集合依然保留创建时接受的元素(1、2、3、4、5)，新数组中保存着这些元素的副本

&emsp;&emsp;如果已经创建过一个数组，想要复制它并创建一个无重复元素的新数组，则上述这个方法就非常有用

```
function eliminateDuplicates(items) {
    return [...new Set(items)];
}
let numbers = [1, 2, 3, 3, 3, 4, 5],
noDuplicates = eliminateDuplicates(numbers);
console.log(noDuplicates); // [1,2,3,4,5]
```

&emsp;&emsp;在以上函数中，Set集合仅是用来过滤重复值的临时中介，最后会输出新创建的无重复元素的数组

&nbsp;

### WeakSet

&emsp;&emsp;将对象存储在Set的实例与存储在变量中完全一样，只要Set实例中的引用存在，垃圾回收机制就不能释放该对象的内存空间，于是之前提到的Set类型可以被看作是一个强引用的Set集合

```
let set = new Set(),
key = {};
set.add(key);
console.log(set.size); // 1
// 取消原始引用
key = null;
console.log(set.size); // 1
// 重新获得原始引用
key = [...set][0];
```

&emsp;&emsp;在这个示例中，将变量key设置为null时便清除了对初始对象的引用，但是Set集合却保留了这个引用，仍然可以使用展开运算符将Set集合转换成数组格式并从数组的首个元素取出该引用

&emsp;&emsp;大部分情况下这段代码运行良好，但有时候会希望当其他所有引用都不再存在时，让Set集合中的这些引用随之消失。举个例子，如果在Web页面中通过JS代码记录了一些DOM元素，这些元素有可能被另一段脚本移除，而又不希望自己的代码保留这些DOM元素的最后一个引用

&emsp;&emsp;为了解决这个问题，ES6中引入了另外一个类型：WeakSet集合(弱引用Set集合)

【创建WeakSet集合】

&emsp;&emsp;用Weakset构造函数可以创建WeakSet集合，集合支持3个方法：add()、has()和delete()

```
let set = new WeakSet(),
key = {};
// 将对象加入 set
set.add(key);
console.log(set.has(key)); // true
set.delete(key);
console.log(set.has(key)); // false
```

&emsp;&emsp;WeakSet集合的使用方式与Set集合类似，可以向集合中添加引用，从中移除引用，也可以检査集合中是否存在指定对象的引用。也可以调用WeakSet构造函数并传入一个可迭代对象来创建WeakSet集合

```
let key1 = {},
key2 = {},
set = new WeakSet([key1, key2]);
console.log(set.has(key1)); // true
console.log(set.has(key2)); // true
```

&emsp;&emsp;以上示例中，向WeakSet构造函数传入一个含有两个对象的数组，最终创建包含这两个对象的WeakSet集合

【与Set集合的区别】

&emsp;&emsp;WeakSet与Set最大的区别是WeakSet中的对象都是弱引用，即垃圾回收机制不考虑WeakSet对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于WeakSet之中

```
let set = new WeakSet(),
key = {};
set.add(key);
console.log(set.has(key)); // true
// 取消原始引用
key = null;
console.log(set.has(key)); // false
```

&emsp;&emsp;由于上面这个特点，WeakSet的成员是不适合引用的，因为它会随时消失。另外，由于WeakSet内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此ES6规定WeakSet不可遍历

&emsp;&emsp;除了以上主要区别之外，它们之间还有下面几个差别

&emsp;&emsp;1、在Weakset的实例中，如果向add()、has()和delete()这3个方法传入非对象参数都会导致程序报错

&emsp;&emsp;2、WeakSet集合不可迭代，所以不能被用于for-of循环

&emsp;&emsp;3、WeakSet集合不暴露任何迭代器(例如keys()和values()方法)，所以无法通过程序本身来检测其中的内容

&emsp;&emsp;4、WeakSet集合不支持forEach()方法

&emsp;&emsp;5、WeakSet集合不支持size属性

&emsp;&emsp;WeakSet集合的功能看似受限，其实这是为了让它能够正确地处理内存中的数据。总之，如果只需要跟踪对象引用，更应该使用Weak Set集合而不是普通的Set集合

&emsp;&emsp;Set类型可以用来处理列表中的值，但是不适用于处理键值对这样的信息结构。ES6也添加了Map集合来解决类似的问题

&nbsp;

### Map集合

&emsp;&emsp;JS的对象(Object)，本质上是键值对的集合(Hash结构)，但是传统上只能用字符串当作键。这给它的使用带来了很大的限制

&emsp;&emsp;为了解决这个问题，ES6提供了Map数据结构。它类似于对象，也是键值对的集合，但是&ldquo;键&rdquo;的范围不限于字符串，各种类型的值(包括对象)都可以当作键。也就是说，Object结构提供了&ldquo;字符串&mdash;值&rdquo;的对应，Map结构提供了&ldquo;值&mdash;值&rdquo;的对应，是一种更完善的Hash结构实现

&emsp;&emsp;ES6中的Map类型是一种储存着许多键值对的有序列表，其中的键名和对应的值支持所有的数据类型。键名的等价性判断是通过调用Object.is()方法实现的，所以数字5与字符串"5"会被判定为两种类型，可以分别作为独立的两个键出现在程序中，这一点与对象不一样，因为对象的属性名总会被强制转换成字符串类型

&emsp;&emsp;注意：有一个例外，Map集合中将+0和-0视为相等，与Object.is()结果不同

&emsp;&emsp;如果需要&ldquo;键值对&rdquo;的数据结构，Map比Object更合适

【创建Map集合】

&emsp;&emsp;如果要向Map集合中添加新的元素，可以调用set()方法并分别传入键名和对应值作为两个参数；如果要从集合中获取信息，可以调用get()方法

```
let map = new Map();
map.set("title", "Understanding ES6");
map.set("year", 2017);
console.log(map.get("title")); // "Understanding ES6"
console.log(map.get("year")); // 2017
```

&emsp;&emsp;在这个示例中，两组键值对分别被存入了集合Map中，键名"title"对应的值是一个字符串，键名"year"对应的值是一个数字。调用get()方法可以获得两个键名对应的值。如果调用get()方法时传入的键名在Map集合中不存在，则会返回undefined

&emsp;&emsp;在对象中，无法用对象作为对象属性的键名。但是在Map集合中，却可以这样做

```
let map = new Map(),
    key1 = {},
    key2 = {};
map.set(key1, 5);
map.set(key2, 42);
console.log(map.get(key1)); // 5
console.log(map.get(key2)); // 42
```

&emsp;&emsp;在这段代码中，分别用对象key1和key2作为两个键名在Map集合里存储了不同的值。这些键名不会被强制转换成其他形式，所以这两个对象在集合中是独立存在的，也就是说，以后不再需要修改对象本身就可以为其添加一些附加信息

【Map集合支持的方法】

&emsp;&emsp;在设计语言新标准时，委员会为Map集合与Set集合设计了如下3个通用的方法

&emsp;&emsp;1、has(key)检测指定的键名在Map集合中是否已经存在

&emsp;&emsp;2、delete(key)从Map集合中移除指定键名及其对应的值

&emsp;&emsp;3、clear()移除Map集合中的所有键值对

&emsp;&emsp;Map集合同样支持size属性，其代表当前集合中包含的键值对数量

```
let map = new Map();
map.set("name", "huochai");
map.set("age", 25);
console.log(map.size); // 2
console.log(map.has("name")); // true
console.log(map.get("name")); // "huochai"
console.log(map.has("age")); // true
console.log(map.get("age")); // 25
map.delete("name");
console.log(map.has("name")); // false
console.log(map.get("name")); // undefined
console.log(map.size); // 1
map.clear();
console.log(map.has("name")); // false
console.log(map.get("name")); // undefined
console.log(map.has("age")); // false
console.log(map.get("age")); // undefined
console.log(map.size); // 0
```

&emsp;&emsp;Map集合的size属性与Set集合中的size属性类似，其值为集合中键值对的数量。在此示例中，首先为Map的实例添加"name"和"age"这两个键名；然后调用has()方法，分别传入两个键名，返回的结果为true；调用delete()方法移除"name"，再用has()方法检测返回false，且size的属性值减少1；最后调用clear()方法移除剩余的键值对，调用has()方法检测全部返回false，size属性的值变为0；clear()方法可以快速清除Map集合中的数据，同样，Map集合也支持批量添加数据

【传入数组来初始化Map集合】

&emsp;&emsp;可以向Map构造函数传入数组来初始化一个Map集合，这一点同样与Set集合相似。数组中的每个元素都是一个子数组，子数组中包含一个键值对的键名与值两个元素。因此，整个Map集合中包含的全是这样的两元素数组

```
let map = new Map([["name", "huochai"], ["age", 25]]);
console.log(map.has("name")); // true
console.log(map.get("name")); // "huochai"
console.log(map.has("age")); // true
console.log(map.get("age")); // 25
console.log(map.size); // 2
```

&emsp;&emsp;初始化构造函数之后，键名"name"和"age"分别被添加到Map集合中。数组包裹数组的模式看起来可能有点儿奇怪，但由于Map集合可以接受任意数据类型的键名，为了确保它们在被存储到Map集合中之前不会被强制转换为其他数据类型，因而只能将它们放在数组中，因为这是唯一一种可以准确地呈现键名类型的方式

【同名属性碰撞】

&emsp;&emsp;Map的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。这就解决了同名属性碰撞（clash）的问题，扩展别人的库的时候，如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名

```
const map = new Map();

map.set(['a'], 555);
map.get(['a']) // undefined
```

&emsp;&emsp;上面代码的`set`和`get`方法，表面是针对同一个键，但实际上这是两个值，内存地址是不一样的，因此`get`方法无法读取该键，返回`undefined`

```
const map = new Map();

const k1 = ['a'];
const k2 = ['a'];

map
.set(k1, 111)
.set(k2, 222);

map.get(k1) // 111
map.get(k2) // 222
```

&emsp;&emsp;上面代码中，变量`k1`和`k2`的值是一样的，但是它们在 Map 结构中被视为两个键

【遍历】

&emsp;&emsp;Map结构原生提供三个遍历器生成函数和一个遍历方法

```
keys()：返回键名的遍历器
values()：返回键值的遍历器
entries()：返回所有成员的遍历器
forEach()：遍历 Map 的所有成员
```

&emsp;&emsp;注意：Map的遍历顺序就是插入顺序

```
const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);

for (let key of map.keys()) {
  console.log(key);
}
// "F"
// "T"

for (let value of map.values()) {
  console.log(value);
}
// "no"
// "yes"

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"
```

&emsp;&emsp;上面代码最后的那个例子，表示Map结构的默认遍历器接口，就是`entries`方法

```
map[Symbol.iterator] === map.entries// true
```

**转为数组**

&emsp;&emsp;Map结构转为数组结构，比较快速的方法是使用扩展运算符（`...`）。

```
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

[...map.keys()]
// [1, 2, 3]

[...map.values()]
// ['one', 'two', 'three']

[...map.entries()]
// [[1,'one'], [2, 'two'], [3, 'three']]

[...map]
// [[1,'one'], [2, 'two'], [3, 'three']]
```

&emsp;&emsp;结合数组的`map`方法、`filter`方法，可以实现 Map 的遍历和过滤

```
const map0 = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');

const map1 = new Map(
  [...map0].filter(([k, v]) => k < 3)
);
// 产生 Map 结构 {1 => 'a', 2 => 'b'}

const map2 = new Map(
  [...map0].map(([k, v]) => [k * 2, '_' + v])
    );
// 产生 Map 结构 {2 => '_a', 4 => '_b', 6 => '_c'}
```

**forEach()**

&emsp;&emsp;Map还有一个`forEach`方法，与数组的`forEach`方法类似，也可以实现遍历

```
const map = new Map([[1, 'one'],[2, 'two'],[3, 'three']]);
map.forEach((value,key,map)=>{
    //one 1 {1 => "one", 2 => "two", 3 => "three"}
    //two 2 {1 => "one", 2 => "two", 3 => "three"}
    //three 3 {1 => "one", 2 => "two", 3 => "three"}
    console.log(value,key,map);
})
```

&emsp;&emsp;注意：遍历过程中，Map会按照键值对插入Map集合的顺序将相应信息传入forEach()方法的回调函数；而在数组中，会按照数值型索引值的顺序依次传入回调函数

&emsp;&emsp;`forEach`方法还可以接受第二个参数，用来绑定`this`

```
const reporter = {
  report: function(key, value) {
    console.log("Key: %s, Value: %s", key, value);
  }
};

map.forEach(function(value, key, map) {
  this.report(key, value);
}, reporter);
```

&emsp;&emsp;上面代码中，`forEach`方法的回调函数的`this`，就指向`reporter`

&nbsp;

### WeakMap

&emsp;&emsp;WeakSet是引用Set集合，相对地，WeakMap是弱引用Map集合，也用于存储对象的弱引用

&emsp;&emsp;WeakMap集合中的键名必须是一个对象，如果使用非对象键名会报错；集合中保存的是这些对象的弱引用，如果在弱引用之外不存在其他的强引用，引擎的垃圾回收机制会自动回收这个对象，同时也会移除WeakMap集合中的键值对。但是只有集合的键名遵从这个规则，键名对应的值如果是一个对象，则保存的是对象的强引用，不会触发垃圾回收机制

&emsp;&emsp;WeakMap集合最大的用途是保存Web页面中的DOM元素，例如，一些为Web页面打造的JS库，会通过自定义的对象保存每一个引用的DOM元素

&emsp;&emsp;使用这种方法最困难的是，一旦从Web页面中移除保存过的DOM元素，如何通过库本身将这些对象从集合中清除；否则，可能由于库过于庞大而导致内存泄露，最终程序不再正常执行。如果用WeakMap集合来跟踪DOM元素，这些库仍然可以通过自定义的对象整合每一个DOM元素，而且当DOM元素消失时，可以自动销毁集合中的相关对象

【使用WeakMap集合】

&emsp;&emsp;ES6中的Weak Map类型是一种存储着许多键值对的无序列表，列表的键名必须是非null类型的对象，键名对应的值则可以是任意类型。WeakMap的接口与Map非常相似，通过set()方法添加数据，通过get()方法获取数据

```
let map = new WeakMap(),
    element = document.querySelector(".element");
map.set(element, "Original");
let value = map.get(element);
console.log(value); // "Original"
// 移除元素
element.parentNode.removeChild(element);
element = null;
// 该 Weak Map 在此处为空
```

&emsp;&emsp;在这个示例中储存了一个键值对，键名element是一个DOM元素，其对应的值是一个字符串，将DOM元素传入get()方法即可获取之前存过的值。如果随后从document对象中移除DOM元素并将引用这个元素的变量设置为null，那么WeakMap集合中的数据也会被同步清除

&emsp;&emsp;与WeakSet集合相似的是，WeakMap集合也不支持size属性，从而无法验证集合是否为空；同样，由于没有键对应的引用，因而无法通过get()方法获取到相应的值，WeakMap集合自动切断了访问这个值的途径，当垃圾回收程序运行时，被这个值占用的内存将会被释放

【WeakMap集合的初始化方法】

&emsp;&emsp;WeakMap集合的初始化过程与Map集合类似，调用WeakMap构造函数并传入一个数组容器，容器内包含其他数组，每一个数组由两个元素构成：第一个元素是一个键名，传入的值必须是非null的对象；第二个元素是这个键对应的值(可以是任意类型)

```
let key1 = {},
    key2 = {},
    map = new WeakMap([[key1, "Hello"], [key2, 42]]);
console.log(map.has(key1)); // true
console.log(map.get(key1)); // "Hello"
console.log(map.has(key2)); // true
console.log(map.get(key2)); // 42
```

&emsp;&emsp;对象key1和key2被当作WeakMap集合的键使用，可以通过get()方法和has()方法去访问。如果给WeakMap构造函数传入的诸多键值对中含有非对象的键，会导致程序抛出错误

【WeakMap集合支持的方法】

&emsp;&emsp;WeakMap集合只支持两个可以操作键值对的方法：has()方法可以检测给定的键在集合中是否存在；delete()方法可移除指定的键值对。WeakMap集合与WeakSet集合一样，都不支持键名枚举，从而也不支持clear()方法

```
let map = new WeakMap(),
    element = document.querySelector(".element");
map.set(element, "Original");
console.log(map.has(element)); // true
console.log(map.get(element)); // "Original"
map.delete(element);
console.log(map.has(element)); // false
console.log(map.get(element)); // undefined
```

&emsp;&emsp;在这段代码中，我们还是用DOM元素作为Weak Map集合的键名。has()方法可以用于检查Weak Map集合中是否存在指定的引用；Weak Map集合的键名只支持非null的对象值；调用delete()方法可以从Weak Map集合中移除指定的键值对，此时如果再调用has()方法检查这个键名会返回false，调用get()方法返回undefined

【用途】

**储存DOM元素**

&emsp;&emsp;前面介绍过，WeakMap应用的典型场合就是 DOM 节点作为键名

```
let myElement = document.getElementById('logo');
let myWeakmap = new WeakMap();

myWeakmap.set(myElement, {timesClicked: 0});

myElement.addEventListener('click', function() {
  let logoData = myWeakmap.get(myElement);
  logoData.timesClicked++;
}, false);
```

&emsp;&emsp;上面代码中，`myElement`是一个 DOM 节点，每当发生`click`事件，就更新一下状态。我们将这个状态作为键值放在WeakMap里，对应的键名就是`myElement`。一旦这个 DOM 节点删除，该状态就会自动消失，不存在内存泄漏风险

&emsp;&emsp;进一步说，注册监听事件的`listener`对象，就很合适用 WeakMap 实现

```
const listener = new WeakMap();

listener.set(element1, handler1);
listener.set(element2, handler2);

element1.addEventListener('click', listener.get(element1), false);
element2.addEventListener('click', listener.get(element2), false);
```

&emsp;&emsp;上面代码中，监听函数放在WeakMap里面。一旦 DOM 对象消失，跟它绑定的监听函数也会自动消失

**部署私有属性**

&emsp;&emsp;WeakMap的另一个用处是部署私有属性

```
function Person(name) {
    this._name = name;
}
Person.prototype.getName = function() {
    return this._name;
};
```

&emsp;&emsp;在这段代码中，约定前缀为下划线_的属性为私有属性，不允许在对象实例外改变这些属性。例如，只能通过getName()方法读取this._name属性，不允许改变它的值。然而没有任何标准规定如何写_name属性，所以它也有可能在无意间被覆写

&emsp;&emsp;在ES5中，可以通过以下这种模式创建一个对象接近真正的私有数据

```
var Person = (function() {
    var privateData = {},
        privateId = 0;
    function Person(name) {
        Object.defineProperty(this, "_id", { value: privateId++ });
        privateData[this._id] = {
            name: name
        };
    }
    Person.prototype.getName = function() {
        return privateData[this._id].name;
    };
    return Person;
}());
```

&emsp;&emsp;在上面的示例中，变量person由一个立即调用函数表达式(IIFE)生成，包括两个私有变量privateData和privateld。privateData对象储存的是每一个实例的私有信息，privateld则为每个实例生成一个独立ID。当调用person构造函数时，属性_id的值会被加1，这个属性不可枚举、不可配置并且不可写

&emsp;&emsp;然后，新的条目会被添加到privateData对象中，条目的键名是对象实例的ID；privateData对象中储存了所有实例对应的名称。调用getName()函数，即可通过this_id获得当前实例的ID，并以此从privateData对象中提取实例名称。在IIFE外无法访问privateData对象，即使可以访问this._id，数据实际上也很安全

&emsp;&emsp;这种方法最大的问题是，如果不主动管理，由于无法获知对象实例何时被销毁，因此privateData中的数据就永远不会消失。而使用WeakMap集合可以解决这个问题

```
let Person = (function() {
    let privateData = new WeakMap();
    function Person(name) {
        privateData.set(this, { name: name });
    }
    Person.prototype.getName = function() {
        return privateData.get(this).name;
    };
    return Person;
}());
```

&emsp;&emsp;经过改进后的Person构造函数选用一个WeakMap集合来存放私有数据。由于Person对象的实例可以直接作为集合的键使用，无须单独维护一套ID的体系来跟踪数据。调用Person构造函数时，新条目会被添加到WeakMap集合中，条目的键是this，值是对象包含的私有信息。在这个示例中，值是一个包含name属性的对象。调用getName()函数时会将this传入privateData.get()方法作为参数获取私有信息，亦即获取value对象并且访问name属性。只要对象实例被销毁，相关信息也会被销毁，从而保证了信息的私有性

【使用方式及使用限制】

&emsp;&emsp;要在WeakMap集合与普通的Map集合之间做出选择时，需要考虑的主要问题是，是否只用对象作为集合的键名。如果是，那么Weak Map集合是最好的选择。当数据再也不可访问后，集合中存储的相关引用和数据都会被自动回收，这有效地避免了内存泄露的问题，从而优化了内存的使用

&emsp;&emsp;相对Map集合而言，WeakMap集合对用户的可见度更低，其不支持通过forEach()方法、size属性及clear()方法来管理集合中的元素。如果非常需要这些特性，那么Map集合是一个更好的选择，只是一定要留意内存的使用情况

&emsp;&emsp;当然，如果只想使用非对象作为键名，那么普通的Map集合是唯一的选择

