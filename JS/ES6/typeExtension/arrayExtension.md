# ES6数组扩展

&emsp;&emsp;数组是一种基础的JS对象，随着时间推进，JS中的其他部分一直在演进，而直到ES5标准才为数组对象引入一些新方法来简化使用。ES6标准继续改进数组，添加了很多新功能。本文将详细介绍ES6数组扩展

&nbsp;

### 静态方法

&emsp;&emsp;在ES6以前，创建数组的方式主要有两种，一种是调用Array构造函数，另一种是用数组字面量语法，这两种方法均需列举数组中的元素，功能非常受限。如果想将一个类数组对象(具有数值型索引和length属性的对象)转换为数组，可选的方法也十分有限，经常需要编写额外的代码。为了进一步简化JS数组的创建过程，ES6新增了Array.of()和Array.from()两个方法

【Array.of()】

&emsp;&emsp;ES6之所以向JS添加新的创建方法，是要帮助开发者们规避通过Array构造函数创建数组时的怪异行为

<div>
<pre>let items = new Array(2);
console.log(items.length); // 2
console.log(items[0]); // undefined
console.log(items[1]); // undefined
items = new Array("2");
console.log(items.length); // 1
console.log(items[0]); // "2"
items = new Array(1, 2);
console.log(items.length); // 2
console.log(items[0]); // 1
console.log(items[1]); // 2
items = new Array(3, "2");
console.log(items.length); // 2
console.log(items[0]); // 3
console.log(items[1]); // "2"</pre>
</div>

&emsp;&emsp;如果给Array构造函数传入一个数值型的值，那么数组的length属性会被设为该值。如果传入多个值，此时无论这些值是不是数值型的，都会变为数组的元素。这个特性令人感到困惑，不可能总是注意传入数据的类型，所以存在一定的风险

&emsp;&emsp;ES6通过引入Array.of()方法来解决这个问题。Array.of()与Array构造函数的工作机制类似，只是不存在单一数值型参数值的特例，无论有多少参数，无论参数是什么类型的，Array.of()方法总会创建一个包含所有参数的数组

<div>
<pre>let items = Array.of(1, 2);
console.log(items.length); // 2
console.log(items[0]); // 1
console.log(items[1]); // 2
items = Array.of(2);
console.log(items.length); // 1
console.log(items[0]); // 2
items = Array.of("2");
console.log(items.length); // 1
console.log(items[0]); // "2"</pre>
</div>

&emsp;&emsp;要用Array.of()方法创建数组，只需传入希望在数组中包含的值。第一个示例创建了一个包含两个数字的数组；第二个数组包含一个数宇；最后一个数组包含一个字符串。这与数组字面量的使用方法很相似，在大多数时候，可以用数组字面量来创建原生数组，但如果需要给一个函数传入Array的构造函数，则可能更希望传入Array.of()来确保行为一致

<div>
<pre>function createArray(arrayCreator, value) {
    return arrayCreator(value);
}
let items = createArray(Array.of, value);</pre>
</div>

&emsp;&emsp;在这段代码中心createArray()函数接受两个参数，一个是数组创造者函数，另一个是要插入数组的值。可以传入Array.of()作为createArray()方法的第一个参数来创建新数组，如果不能保证传入的值一定不是数字，那么直接传入Array会非常危险

&emsp;&emsp;注意：Array.of()方法不通过Symbol.species属性确定返回值的类型，它使用当前构造函数(也就是of()方法中的this值)来确定正确的返回数据的类型

【Array.from()】

&emsp;&emsp;JS不支持直接将非数组对象转换为真实数组，arguments就是一种类数组对象，如果要把它当作数组使用则必须先转换该对象的类型。在ES5中，可能需要编写如下函数来把类数组对象转换为数组

<div>
<pre>function makeArray(arrayLike) {
    var result = [];
    for (var i = 0, len = arrayLike.length; i &lt; len; i++) {
        result.push(arrayLike[i]);
    }
    return result;
}
function doSomething() {
    var args = makeArray(arguments);
    // 使用 args
}</pre>
</div>

&emsp;&emsp;这种方法先是手动创建一个result数组，再将arguments对象里的每一个元素复制到新数组中。尽管这种方法有效，但需要编写很多代码才能完成如此简单的操作。最终，开发者们发现了一种只需编写极少代码的新方法，调用数组原生的slice()方法可以将非数组对象转换为数组

<div>
<pre>function makeArray(arrayLike) {
    return Array.prototype.slice.call(arrayLike);
}
function doSomething() {
    var args = makeArray(arguments);
    // 使用 args
}</pre>
</div>

&emsp;&emsp;这段代码的功能等价于之前的示例，将slice()方法执行时的this值设置为类数组对象，而slice()对象只需数值型索引和length属性就能够正确运行，所以任何类数组对象都能被转换为数组

&emsp;&emsp;尽管这项技术不需要编写很多代码，但是我们调用Array.prototype.slice.call(arrayLike)时不能直觉地想到这是在将arrayLike转换成一个数组。所幸，ES6添加了一个语义清晰、语法简洁的新方法Array.from()来将对象转化为数组

&emsp;&emsp;Array.from()方法可以接受可迭代对象或类数组对象作为第一个参数，最终返回一个数组

<div>
<pre>function doSomething() {
    var args = Array.from(arguments);
    // 使用 args
}</pre>
</div>

&emsp;&emsp;Array.from()方法调用会基于arguments对象中的元素创建一个新数组，args是Array的一个实例，包含arguments对象中同位置的相同值

&emsp;&emsp;注意：Array.from()方法也是通过this来确定返回数组的类型的

**映射转换**

&emsp;&emsp;如果想要进一步转化数组，可以提供一个映射函数作为Array.from()的第二个参数，这个函数用来将类数组对象中的每一个值转换成其他形式，最后将这些结果储存在结果数组的相应索引中

<div>
<pre>function translate() {
    return Array.from(arguments, (value) =&gt; value + 1);
}
let numbers = translate(1, 2, 3);
console.log(numbers); // 2,3,4</pre>
</div>

&emsp;&emsp;在这段代码中，为Array.from()方法传入映射函数(value)=&gt;value+1，数组中的每个元素在储存前都会被加1。如果用映射函数处理对象，也可以给Array.from()方法传入第三个参数来表示映射函数的this值

<div>
<pre>let helper = {
    diff: 1,
    add(value) {
        return value + this.diff;
    }
};
function translate() {
    return Array.from(arguments, helper.add, helper);
}
let numbers = translate(1, 2, 3);
console.log(numbers); // 2,3,4</pre>
</div>

&emsp;&emsp;此示例传入helper.add()作为转换用的映射函数，由于该方法使用了this.diff属性，因此需要为Array.from()方法提供第三个参数来指定this的值，从而无须通过调用bind()方法或其他方式来指定this的值了

**用Array.from()转换可迭代对象**

&emsp;&emsp;Array.from()方法可以处理类数组对象和可迭代对象，也就是说该方法能够将所有含有Symbol.iterator属性的对象转换为数组

<div>
<pre>let numbers = {
    *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
    }
};
let numbers2 = Array.from(numbers, (value) =&gt; value + 1);
console.log(numbers2); // 2,3,4</pre>
</div>

&emsp;&emsp;由于numbers是一个可迭代对象，因此可以直接将它传入Array.from()来转换成数组。此处的映射函数将每一个数字加1，所以结果数组最终包含的值为2、3和4

&emsp;&emsp;注意：如果一个对象既是类数组又是可迭代的，那么Array.from()方法会根据迭代器来决定转换哪个值

&nbsp;

### 实例方法

&emsp;&emsp;ES6延续了ES5的一贯风格，也为数组添加了几个新的方法：includes()方法返回一个布尔值，表示数组是否包含给定的值；find()方法和findIndex()方法可以协助开发者在数组中查找任意值；fill()方法和copyWithin()方法的灵感则来自于定型数组的使用过程，定型数组也是ES6中的新特性，是一种只包含数字的数组

【includes()】

&emsp;&emsp;`Array.prototype.includes`方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的`includes`方法类似。ES2016 引入了该方法

<div>
<pre>[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
[1, 2, NaN].includes(NaN) // true</pre>
</div>

&emsp;&emsp;该方法的第二个参数表示搜索的起始位置，默认为`0`。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为`-4`，但数组长度为`3`），则会重置为从`0`开始

<div>
<pre>[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true</pre>
</div>

&emsp;&emsp;没有该方法之前，我们通常使用数组的`indexOf`方法，检查是否包含某个值

<div>
<pre>if (arr.indexOf(el) !== -1) {
  // ...
}</pre>
</div>

&emsp;&emsp;`indexOf`方法有两个缺点，一是不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于`-1`，表达起来不够直观。二是，它内部使用严格相等运算符（`===`）进行判断，这会导致对`NaN`的误判

<div>
<pre>[NaN].indexOf(NaN)// -1</pre>
</div>

&emsp;&emsp;`includes`使用的是不一样的判断算法，就没有这个问题

<div>
<pre>[NaN].includes(NaN)// true</pre>
</div>

&emsp;&emsp;下面代码用来检查当前环境是否支持该方法，如果不支持，部署一个简易的替代版本

<div>
<pre>const contains = (() =&gt;
  Array.prototype.includes
    ? (arr, value) =&gt; arr.includes(value)
    : (arr, value) =&gt; arr.some(el =&gt; el === value)
)();
contains(['foo', 'bar'], 'baz'); // =&gt; false</pre>
</div>

&emsp;&emsp;另外，Map 和 Set 数据结构有一个`has`方法，需要注意与`includes`区分

&emsp;&emsp;1、Map 结构的`has`方法，是用来查找键名的，比如`Map.prototype.has(key)`、`WeakMap.prototype.has(key)`、`Reflect.has(target, propertyKey)`

&emsp;&emsp;2、Set 结构的`has`方法，是用来查找值的，比如`Set.prototype.has(value)`、`WeakSet.prototype.has(value)`

【find()和findIndex()】

&emsp;&emsp;由于没有内建的数组搜索方法，因此ES5正式添加了indexOf()和lastIndexOf()两个方法，可以用它们在数组中查找特定的值。虽然这是一个巨大的进步，但这两种方法仍有局限之处，即每次只能查找一个值，如果想在系列数字中查找第一个偶数，则必须自己编写代码来实现。于是ES6引入了find()方法和findIndex()方法来解决这个问题

&emsp;&emsp;find()方法和findIndex()方法都接受两个参数：一个是回调函数；另一个是可选参数，用于指定回调函数中this的值。执行回调函数时，传入的参数分别为数组中的某个元素、该元素在数组中的索引和数组本身，与传入map()和forEach()方法的参数相同。如果给定的值满足定义的标准，回调函数应返回true。一旦回调函数返回true，find()方法和findIndex()方法都会立即停止搜索数组剩余的部分

&emsp;&emsp;二者间唯一的区别是，find()方法返回查找到的值，findIndex()方法返回查找到的值的索引

<div>
<pre>let numbers = [25, 30, 35, 40, 45];
console.log(numbers.find(n =&gt; n &gt; 33)); // 35
console.log(numbers.findIndex(n =&gt; n &gt; 33)); // 2</pre>
</div>

&emsp;&emsp;这段代码通过调用find()方法和findIndex()方法来定位numbers数组中第一个比33大的值，调用find()方法返回的是35，而调用findIndex()方法返回的是35在numbeps数组中的位置2

&emsp;&emsp;如果要在数组中根据某个条件查找匹配的元素，那么find()方法和findIndex()方法可以很好地完成任务；如果只想查找与某个值匹配的元素，则indexOf()方法和lastIndexOf()方法是更好的选择

【fill()】

&emsp;&emsp;fill()方法可以用指定的值填充一至多个数组元素。当传入一个值时，fill()方法会用这个值重写数组中的所有值

<div>
<pre>let numbers = [1, 2, 3, 4];
numbers.fill(1);
console.log(numbers.toString()); // 1,1,1,1</pre>
</div>

&emsp;&emsp;在此示例中，调用numbers.fill(1)方法后numbers中所有的值会变成1，如果只想改变数组某一部分的值，可以传入开始索引和不包含结束索引(不包含结束索引当前值)这两个可选参数

<div>
<pre>let numbers = [1, 2, 3, 4];
numbers.fill(1, 2);
console.log(numbers.toString()); // 1,2,1,1
numbers.fill(0, 1, 3);
console.log(numbers.toString()); // 1,0,0,1</pre>
</div>

&emsp;&emsp;在numbers.fill(1,2)调用中，参数2表示从索引2开始填充元素，由于未传入第三个参数作为不包含结束索引，因此使用numbers.length作为不包含结束索引，因而numbers数组的最后两个元素被填充为1。操作numbers.fill(0,1,3)会将数组中位于索引1和2的元素填充为0。调用fill()时若传入第二个和第三个参数则可以只填充数组中的部分元素

&emsp;&emsp;注意：如果开始索引或结束索引为负值，那么这些值会与数组的length属性相加来作为最终位置。例如，如果开始位置为-1，那么索引的值实际为array.length-1，array为调用fill()方法的数组

【copyWithin()】

&emsp;&emsp;copyWithin()方法与fill()方法相似，其也可以同时改变数组中的多个元素。fill()方法是将数组元素赋值为一个指定的值，而copyWithin()方法则是从数组中复制元素的值。调用copyWithin()方法时需要传入两个参数：一个是该方法开始填充值的索引位置，另一个是开始复制值的索引位置

&emsp;&emsp;比如复制数组前两个元素的值到后两个元素

<div>
<pre>let numbers = [1, 2, 3, 4];
// 从索引 2 的位置开始粘贴
// 从数组索引 0 的位置开始复制数据
numbers.copyWithin(2, 0);
console.log(numbers.toString()); // 1,2,1,2</pre>
</div>

&emsp;&emsp;这段代码从numbers的索引2开始粘贴值，所以索引2和3将被重写。给CopyWithin()传入第二个参数0表示，从索引0开始复制值并持续到没有更多可复制的值

&emsp;&emsp;默认情况下，copyWithin()会一直复制直到数组末尾的值，但是可以提供可选的第三个参数来限制被重写元素的数量。第三个参数是不包含结束索引，用于指定停止复制值的位置

<div>
<pre>let numbers = [1, 2, 3, 4];
// 从索引 2 的位置开始粘贴
// 从数组索引 0 的位置开始复制数据
// 在遇到索引 1 时停止复制
numbers.copyWithin(2, 0, 1);
console.log(numbers.toString()); // 1,2,1,4</pre>
</div>

&emsp;&emsp;在这个示例中，由于可选的结束索引被设置为了1，因此只有位于索引0的值被复制了，数组中的最后一个元素保持不变

&emsp;&emsp;注意：正如fill()方法一样，copyWithin()方法的所有参数都接受负数值，并且会自动与数组长度相加来作为最终使用的索引

&emsp;&emsp;fill()和copyWithin()这两个方法起源于[定型数组](http://www.cnblogs.com/xiaohuochai/p/7261022.html)，为了保持数组方法的一致性才添加到常规数组中的。如果使用定型数组来操作数字的比特，这些方法将大显身手

