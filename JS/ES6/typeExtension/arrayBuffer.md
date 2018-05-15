# ES6定型数组

&emsp;&emsp;定型数组是一种用于处理数值类型(正如其名，不是所有类型)数据的专用数组，最早是在WebGL中使用的，WebGL是OpenGL ES 2.0的移植版，在Web 页面中通过 &lt;canvas&gt; 元素来呈现它。定型数组也被一同移植而来，其可为JS提供快速的按位运算。本文将详细介绍ES6定型数组

&nbsp;

### 概述

&emsp;&emsp;在JS中，数字是以64位浮点格式存储的，并按需转换为32位整数，所以算术运算非常慢，无法满足WebGL的需求。因此在ES6中引入定型数组来解决这个问题，并提供更高性能的算术运算。所谓定型数组，就是将任何数字转换为一个包含数字比特的数组，随后就可以通过我们熟悉的JS数组方法来进一步处理

&emsp;&emsp;ES6采用定型数组作为语言的正式格式来确保更好的跨JS引擎兼容性以及与JS数组的互操作性。尽管ES6版本的定型数组与WebGL中的不一样，但是仍保留了足够的相似之处，这使得ES6版本可以基于WebGL版本演化而不至于走向完全分化

【数值数据类型】

&emsp;&emsp;JS数字按照IEEE 754标准定义的格式存储，也就是用64个比特来存储一个浮点形式的数字。这个格式用于表示JS中的整数及浮点数，两种格式间经常伴随着数字改变发生相互转换。定型数组支持存储和操作以下8种不同的数值类型

<div>
<pre>有符号的8位整数(int8)
无符号的8位整数(uint8)
有符号的16位整数(int16)
无符号的16位整数(uint16)
有符号的32位整数(int32)
无符号的32位整数(uint32)
32位浮点数(float32)
64位浮点数(float64)</pre>
</div>

&emsp;&emsp;如果用普通的JS数字来存储8位整数，会浪费整整56个比特，这些比特原本可以存储其他8位整数或小于56比特的数字。这也正是定型数组的一个实际用例，即更有效地利用比特

&emsp;&emsp;所有与定型数组有关的操作和对象都集中在这8个数据类型上，但是在使用它们之前，需要创建一个数组缓冲区存储这些数据

【数组缓冲区】

&emsp;&emsp;数组缓冲区是所有定型数组的根基，它是一段可以包含特定数量字节的内存地址。创建数组缓冲区的过程类似于在C语言中调用malloc()来分配内存，只是不需指明内存块所包含的数据类型。可以通过ArrayBuffer构造函数来创建数组缓冲区

<div>
<pre>let buffer = New ArrayBuffer(10) // 分配10字节</pre>
</div>

&emsp;&emsp;调用构造函数时传入数组缓冲区应含的比特数量即可，此示例中的这条语句创建了一个10字节长度的数组缓冲区。创建完成后，可以通过byteLength属性查看缓冲区中的比特数量

<div>
<pre>let buffer = new ArrayBuffer(10); // 分配了 10 个字节
console.log(buffer.byteLength); // 10</pre>
</div>

&emsp;&emsp;可以通过slice()方法分割已有数组缓冲区来创建一个新的，这个slice()方法与数组上的slice()方法很像：传入开始索引和结束索引作为参数，然后返回一个新的ArrayBuffer实例，新实例由原始数组缓冲区的切片组成

<div>
<pre>let buffer = new ArrayBuffer(10); // 分配了 10 个字节
let buffer2 = buffer.slice(4, 6);
console.log(buffer2.byteLength); // 2</pre>
</div>

&emsp;&emsp;在这段代码中，buffer2创建从索引4和索引5提取的字节，此处slice()方法的调用与数组版本的类似，传入的第二个参数不包含在最终结果中

&emsp;&emsp;当然，仅创建存储单元用途不大，除非能够将数据写到那个单元中，还需要创建一个视图来实现写入的功能

&emsp;&emsp;注意：数组缓冲区包含的实际字节数量在创建时就已确定，可以修改缓冲区内的数据，但是不能改变缓冲区的尺寸大小

&nbsp;

### 视图操作

&emsp;&emsp;数组缓冲区是内存中的一段地址，视图是用来操作内存的接口。视图可以操作数组缓冲区或缓冲区字节的子集，并按照其中一种数值型数据类型来读取和写入数据。DataView类型是一种通用的数组缓冲区视图，其支持所有8种数值型数据类型

&emsp;&emsp;要使用DataView，首先要创建一个ArrayBuffer实例，然后用这个实例来创建新的Dataview

<div>
<pre>let buffer = new ArrayBuffer(10),
    view = new DataView(buffer);</pre>
</div>

&emsp;&emsp;在此示例中的view对象可以访问缓冲区中所有10字节。如果提供一个表示比特偏移量的数值，那么可以基于缓冲区的其中一部分来创建视图，DataView将默认选取从偏移值开始到缓冲区末尾的所有比特。如果额外提供一个表示选取比特数量的可选参数，DataView则从偏移位置后选取该数量的比特

<div>
<pre>let buffer = new ArrayBuffer(10),
    view = new DataView(buffer, 5, 2); // 包含位置 5 与位置 6 的字节</pre>
</div>

&emsp;&emsp;这里的view只能操作位于索引5和索引6的字节。通过这种方法，可以基于同一个数组缓冲区创建多个view，因而可以为应用申请一整块独立的内存地址，而不是当需要空间时再动态分配

【获取视图信息】

&emsp;&emsp;可以通过以下几种只读属性来获取视图的信息

<div>
<pre>buffer 视图绑定的数组缓冲区
byteOffset DataView构造函数的第二个参数，默认是0，只有传入参数时才有值
byteLength DataView构造函数的第三个参数，默认是缓冲区的长度byteLength</pre>
</div>

&emsp;&emsp;通过这些属性，可以查看视图正在操作缓冲区的哪一部分

<div>
<pre>let buffer = new ArrayBuffer(10),
view1 = new DataView(buffer), // 包含所有字节
view2 = new DataView(buffer, 5, 2); // 包含位置 5 与位置 6 的字节
console.log(view1.buffer === buffer); // true
console.log(view2.buffer === buffer); // true
console.log(view1.byteOffset); // 0
console.log(view2.byteOffset); // 5
console.log(view1.byteLength); // 10
console.log(view2.byteLength); // 2</pre>
</div>

&emsp;&emsp;这段代码一共创建了两个视图，view1覆盖了整个数组缓冲区，view2只操作其中的一小部分。由于这些视图都是基于相同的数组缓冲区创建的，因此它们具有相同的buffer属性，但每个视图的byteOffset和byteLength属性又互不相同，这两个属性的值取决于视图操作数组缓冲区的哪一部分

&emsp;&emsp;当然，只从内存读取信息不是很有用，需要同时在内存中读写数据才能物尽其用

【读取和写入数据】

&emsp;&emsp;JS有8种数值型数据类型，对于其中的每一种，都能在DataView的原型上找到相应的在数组缓冲区中写入数据和读取数据的方法。这些方法名都以set或get打头，紧跟着的是每一种数据类型的缩写。例如，以下这个列表是用于读取和写入int8和unit8类型数据的方法

<div>
<pre>getInt8(byteOffset,littleEndian)读取位于byteOffset后的int8类型数据
setInt8(byteOffset, value, littleEndian) 在byteOffset 处写入int8类型数据
getUint8(byteOffset, littleEndian) 读取位于byteOffset 后的uint8类型数据
setUint8(byteOffset, value, littleEndian) 在byteOffset 处写入uint8类型数据</pre>
</div>

&emsp;&emsp;get方法接受两个参数：读取数据时偏移的字节数量和一个可选的布尔值，表示是否按照小端序进行读取(小端序是指最低有效字节位于字节0的字节顺序)。set方法接受三个参数：写入数据时偏移的比特数量、写入的值和一个可选的布尔值，表示是否按照小端序格式存储。尽管这里只展示了用于8位值的方法，但是有一些相同的方法也可用于操作16或32位的值，只需将每一个方法名中的8替换为16或32即可。除所有整数方法外，DataView同样支持以下读取和写入浮点数的方法

<div>
<pre>getFloat32(byteOffset, littleEndian) 读取位于byteOffset后的float32类型数据
setFloat32(byteOffset,value,littleEndian) 在byteOffset处写入float32类型数据
getFloat64(byteOffset,littleEndian) 读取位于byteOffset后的float64类型数据
setFloat64(byteOffset,value,littleEndian) 在byteOffset处写入float64类型数据</pre>
</div>

&emsp;&emsp;以下示例分别展示了set和get方法的实际运用

<div>
<pre>let buffer = new ArrayBuffer(2),
    view = new DataView(buffer);
view.setInt8(0, 5);
view.setInt8(1, -1);
console.log(view.getInt8(0)); // 5
console.log(view.getInt8(1)); // -1</pre>
</div>

&emsp;&emsp;这段代码使用两字节数组缓冲器来存储两个int8类型的值，分别位于偏移0和1，每个值都横跨一整个字节(8个比特)随后通过getlnt8()方法将这些值从它们所在的位置提取出来

&emsp;&emsp;视图是独立的，无论数据之前是通过何种方式存储的，都可在任意时刻读取或写入任意格式的数据。举个例子，写入两个int8类型的值，然后使用int16类型的方法也可以从缓冲区中读出这些值

<div>
<pre>let buffer = new ArrayBuffer(2),
    view = new DataView(buffer);
view.setInt8(0, 5);
view.setInt8(1, -1);
console.log(view.getInt16(0)); // 1535
console.log(view.getInt8(0)); // 5
console.log(view.getInt8(1)); // -1</pre>
</div>

&emsp;&emsp;调用view.getInt16(0)时会读取视图中的所有字节并将其解释为数字1535。如下所示，由每一行的setInt8()方法执行后数组缓冲区的变化，可以理解为何会得到这个结果

<div>
<pre>new ArrayBuffer(2)   0000000000000000
view.setInt8(0, 5);  0000010100000000
view.setInt8(1, -1); 0000010111111111</pre>
</div>

&emsp;&emsp;起初，数组缓冲区所有16个比特的值都是0，通过setInt8()方法将数字5写入第一个字节，其中两个数字0会变为数字1(8比特表示下的5是00000101)将-1写入第二个字节，所有比特都会变为1，这也是-1的二进制补码表示。第一次调用setInt8()后，数组缓冲区共包含16个比特，getInt16()会将这些比特读作一个16位整型数字，也就是十进制的1535

&emsp;&emsp;当混合使用不同数据类型时，DataView对象是一个完美的选择，然而，如果只使用某个特定的数据类型，那么特定类型的视图则是更好的选择

【定型数组是视图】

&emsp;&emsp;ES6定型数组实际上是用于数组缓冲区的特定类型的视图，可以强制使用特定的数据类型，而不是使用通用的DataView对象来操作数组缓冲区。8个特定类型的视图对应于8种数值型数据类型，uint8的值还有其他选择

![arraybuffer](https://pic.xiaohuochai.site/blog/js_arraybuffer.png)

&emsp;&emsp;&ldquo;构造器名称&rdquo;一列列举了几个定型数组的构造函数，其他列描述了每一个定型数组可包含的数据。Uint8ClampedArray与uint8Array大致相同，唯一的区别在于数组缓冲区中的值如果小于0或大于255，uint8ClampedArray会分别将其转换为0或255，例如，-1会变为0，300会变为255

&emsp;&emsp;定型数组操作只能在特定的数据类型上进行，例如，所有Int8Array的操作都使用int8类型的值。定型数组中元素的尺寸也取决于数组的类型，Int8Array中的元素占一个字节，而Float64Array中的每个元素占8字节。所幸的是，可以像正常数组一样通过数值型索引来访问元素，从而避免了调用DataView的set和get方法时的尴尬场面

【创建特定类型的视图】

&emsp;&emsp;定型数组构造函数可以接受多种类型的参数，所以可以通过多种方法来创建定型数组。首先，可以传入DataView构造函数可接受的参数来创建新的定型数组，分别是数组缓冲区、可选的比特偏移量、可选的长度值

<div>
<pre>let buffer = new ArrayBuffer(10),
    view1 = new Int8Array(buffer),
    view2 = new Int8Array(buffer, 5, 2);
console.log(view1.buffer === buffer); // true
console.log(view2.buffer === buffer); // true
console.log(view1.byteOffset); // 0
console.log(view2.byteOffset); // 5
console.log(view1.byteLength); // 10
console.log(view2.byteLength); // 2</pre>
</div>

&emsp;&emsp;在这段代码中，两个视图均是通过buffer生成的Int8Array实例,view1和view2有相同的buffer、byteOffset和byteLength属性，DataView的实例包含这三种属性。当你使用DataView时，只要希望只处理一种数值类型，总是很容易切换到相应的定型数组

&emsp;&emsp;创建定型数组的第二种方法是调用构造函数时传入一个数字。这个数字表示分配给数组的元素数量(不是比特数量)，构造函数将创建一个新的缓冲区，并按照数组元素的数量来分配合理的比特数量，通过length属性可以访问数组中的元素数量

<div>
<pre>let ints = new Int16Array(2),
    floats = new Float32Array(5);
console.log(ints.byteLength); // 4
console.log(ints.length); // 2
console.log(floats.byteLength); // 20
console.log(floats.length); // 5</pre>
</div>

&emsp;&emsp;ints数组创建时含有两个空元素，每个16比特整型值需要两个字节，因而分配了4字节给该数组；floats数组创建时含有5个空元素，每个元素占4字节，所以共需要20字节。在这两种情况下，如果要访问新创建的缓冲区，则可以通过buffer属性来实现

&emsp;&emsp;注意：调用定型数组的构造函数时如果不传参数，会按照传入0来处理，这样由于缓冲区没有分配到任何比特，因而创建的定型数组不能用来保存数据

&emsp;&emsp;第三种创建定型数组的方法是调用构造函数时，将以下任一对象作为唯一的参数传入

&emsp;&emsp;1、一个定型数组

&emsp;&emsp;该数组中的每个元素会作为新的元素被复制到新的定型数组中。例如，如果将一个int8数组传入到Int16Array构造函数中，int8的值会被复制到一个新的int16数组中，新的定型数组使用新的数组缓冲区

&emsp;&emsp;2、一个可迭代对象

&emsp;&emsp;对象的迭代器会被调用，通过检索所有条目来选取插入到定型数组的元素，如果所有元素都是不适用于该视图类型的无效类型，构造函数将会抛出一个错误

&emsp;&emsp;3、一个数组

&emsp;&emsp;数组中的元素会被复制到一个新的定型数组中，如果所有元素都是不适用于该视图类型的无效类型，构造函数将会抛出一个错误

&emsp;&emsp;4、一个类数组对象

&emsp;&emsp;与传入数组的行为一致

&emsp;&emsp;在每个示例中，新创建的定型数组的数据均取自源对象，这在用一些值初始化定型数组时尤为有用

<div>
<pre>let ints1 = new Int16Array([25, 50]),
    ints2 = new Int32Array(ints1);
console.log(ints1.buffer === ints2.buffer); // false
console.log(ints1.byteLength); // 4
console.log(ints1.length); // 2
console.log(ints1[0]); // 25
console.log(ints1[1]); // 50
console.log(ints2.byteLength); // 8
console.log(ints2.length); // 2
console.log(ints2[0]); // 25
console.log(ints2[1]); // 50</pre>
</div>

&emsp;&emsp;在此示例中创建了一个Int16Array并用含两个值的数组进行初始化，然后用Int16Array作为参数创建一个Int32Arpay，由于两个定型数组的缓冲区完全独立，因此值25和50从ints1被复制到了ints2。在两个定型数组中有相同的数字，只是ints2用8字节来表示数据，而ints1只用4字节

&nbsp;

### 相同点

&emsp;&emsp;定型数组和普通数组有几个相似之处，在许多情况下可以按照普通数组的使用方式去使用定型数组。例如，通过length属性可以查看定型数组中含有的元素数量，通过数值型索引可以直接访问定型数组中的元素

<div>
<pre>let ints = new Int16Array([25, 50]);
console.log(ints.length); // 2
console.log(ints[0]); // 25
console.log(ints[1]); // 50
ints[0] = 1;
ints[1] = 2;
console.log(ints[0]); // 1
console.log(ints[1]); // 2</pre>
</div>

&emsp;&emsp;在这段代码中，新创建的Int16Array中有两个元素，这些元素均通过数值型索引来被读取和写入，那些值会自动储存并转换成int16类型的值。当然，定型数组与普通数组还有其他相似之处

&emsp;&emsp;注意：可以修改length属性来改变普通数组的大小，而定型数组的length属性是一个不可写属性，所以不能修改定型数组的大小，如果尝试修改这个值，在非严格模式下会直接忽略该操作，在严格模式下会抛出错误

【通用方法】

&emsp;&emsp;定型数组也包括许多在功能上与普通数组方法等效的方法，以下方法均可用于定型数组

<div>
<pre>copyWithin()
entries()
fill()
filter()
find()
findIndex()
forEach()
indexOf()
join()
keys()
lastIndexOf()
map()
reduce()
reduceRight()
reverse()
slice()
some()
sort()
values()</pre>
</div>

&emsp;&emsp;尽管这些方法与Array.prototype中的很像，但并非完全一致，定型数组中的方法会额外检查数值类型是否安全，也会通过Symbol.species确认方法的返回值是定型数组而非普通数组

<div>
<pre>let ints = new Int16Array([25, 50]),
    mapped = ints.map(v =&gt; v * 2);
console.log(mapped.length); // 2
console.log(mapped[0]); // 50
console.log(mapped[1]); // 100
console.log(mapped instanceof Int16Array); // true</pre>
</div>

&emsp;&emsp;这段代码使用map()方法创建一个存放整数的新数组，并通过map()方法将数组中的每个值乘以2，最后返回一个新的Int16Array类型的数组

【相同的迭代器】

&emsp;&emsp;定型数组与普通数组有3个相同的迭代器，分别是entries()方法、keys()方法和values()方法，这意味着可以把定型数组当作普通数组一样来使用展开运算符、for-of循环

<div>
<pre>let ints = new Int16Array([25, 50]),
    intsArray = [...ints];
console.log(intsArray instanceof Array); // true
console.log(intsArray[0]); // 25
console.log(intsArray[1]); // 50</pre>
</div>

&emsp;&emsp;这段代码创建了一个名为intsArray的新数组，包含与定型数组ints相同的数据。展开运算符能够将可迭代对象转换为普通数组，也能将定型数组转换为普通数组

【of()方法和from()方法】

&emsp;&emsp;所有定型数组都含有静态of()方法和from()方法，运行效果分别与Array.of()方法和Array.from()方法相似，区别是定型数组的方法返回定型数组，而普通数组的方法返回普通数组

<div>
<pre>let ints = Int16Array.of(25, 50),
    floats = Float32Array.from([1.5, 2.5]);
console.log(ints instanceof Int16Array); // true
console.log(floats instanceof Float32Array); // true
console.log(ints.length); // 2
console.log(ints[0]); // 25
console.log(ints[1]); // 50
console.log(floats.length); // 2
console.log(floats[0]); // 1.5
console.log(floats[1]); // 2.5</pre>
</div>

&emsp;&emsp;在此示例中，of()方法和from()方法分别创建Int16Array和Float32Array，通过这些方法可以确保定型数组的创建过程如普通数组一样简单

&nbsp;

### 不同点

&emsp;&emsp;定型数组与普通数组最重要的差别是：定型数组不是普通数组。它不继承自Array，通过Array.isArray()方法检查定型数组返回的是false

<div>
<pre>let ints = new Int16Array([25, 50]);
console.log(ints instanceof Array); // false
console.log(Array.isArray(ints)); // false</pre>
</div>

&emsp;&emsp;由于变量ints是一个定型数组，因此它既不是Array的实例，也不能被认作是一个数组。做此区分很重要，因为尽管定型数组与普通数组相似，但二者在很多方面的行为并不相同

【行为差异】

&emsp;&emsp;当操作普通数组时，其可以变大变小，但定型数组却始终保持相同的尺寸。给定型数组中不存在的数值索引赋值会被忽略，而在普通数组中就可以

<div>
<pre>let ints = new Int16Array([25, 50]);
console.log(ints.length); // 2
console.log(ints[0]); // 25
console.log(ints[1]); // 50
ints[2] = 5;
console.log(ints.length); // 2
console.log(ints[2]); // undefined</pre>
</div>

&emsp;&emsp;在这个示例中，尽管将数值索引2赋值为5，但ints数组尺寸并未增长，赋值被丢弃，length属性保持不变

&emsp;&emsp;定型数组同样会检查数据类型的合法性，0被用于代替所有非法值

<div>
<pre>let ints = new Int16Array(["hi"]);
console.log(ints.length); // 1
console.log(ints[0]); // 0</pre>
</div>

&emsp;&emsp;这段代码尝试向Int16Array数组中添加字符串值"hi"，字符串在定型数组中属于非法数据类型，所以该值被转换为0插入数组，数组的长度仍然为1，ints[0]包含的值为0

&emsp;&emsp;所有修改定型数组值的方法执行时都会受到相同限制，例如，如果给map()方法传入的函数返回非法值，则最终会用0来代替

<div>
<pre>let ints = new Int16Array([25, 50]),
    mapped = ints.map(v =&gt; "hi");
console.log(mapped.length); // 2
console.log(mapped[0]); // 0
console.log(mapped[1]); // 0
console.log(mapped instanceof Int16Array); // true
console.log(mapped instanceof Array); // false</pre>
</div>

&emsp;&emsp;这里的字符串"hi"不是16位整数，所以在结果数组中会用0来替代它。由于有了这种错误更正的特性，故非法数据将不会在数组中出现，即使混入非法数据也不会抛出错误

【缺失的方法】

&emsp;&emsp;尽管定型数组包含许多与普通数组相同的方法，但也缺失了几个。以下方法在定型数组中不可使用

<div>
<pre>concat()
pop()
push()
shift()
splice()
unshift()</pre>
</div>

&emsp;&emsp;除concat()方法外，这个列表中的方法都可以改变数组的尺寸，由于定型数组的尺寸不可更改，因而这些方法不适用于定型数组。定型数组不支持concat()方法是因为两个定型数组合并后的结果(尤其当两个数组分别处理不同数据类型时)会变得不确定，这直接违背了使用定型数组的初衷

【附加方法】

&emsp;&emsp;定型数组中还有两个没出现在普通数组中的方法set()和subarray()。这两个方法的功能相反，set()方法将其他数组复制到已有的定型数组，subarray()提取已有定型数组的一部分作为一个新的定型数组

&emsp;&emsp;set()方法接受两个参数：一个是数组(定型数组或普通数组都支持)；一个是可选的偏移量，表示开始插入数据的位置，如果什么都不传，默认的偏移量为0。合法数据从作为参数传入的数组复制至目标定型数组中

<div>
<pre>let ints = new Int16Array(4);
ints.set([25, 50]);
ints.set([75, 100], 2);
console.log(ints.toString()); // 25,50,75,100</pre>
</div>

&emsp;&emsp;这段代码创建了一个含有4个元素的数组Int16Array，先调用set()方法将两个值分别复制到前两个位置，再次调用set()方法并传入偏移量2，将另外两个值复制到数组的后两个位置

&emsp;&emsp;subarray()方法接受两个参数：一个是可选的开始位置，一个是可选的结束位置(与slice()方法的结束位置一样，不包含当前位置的数据)，最后返回一个新的定型数组。也可以省略这两个参数来克隆一个新的定型数组

<div>
<pre>let ints = new Int16Array([25, 50, 75, 100]),
    subints1 = ints.subarray(),
    subints2 = ints.subarray(2),
    subints3 = ints.subarray(1, 3);
console.log(subints1.toString()); // 25,50,75,100
console.log(subints2.toString()); // 75,100
console.log(subints3.toString()); // 50,75</pre>
</div>

&emsp;&emsp;以上示例中，分别通过原始数组ints创建了3个不同的定型数组。数组subints1是通过克隆ints得到的，故它们包含相同的信息；数组subints2从索引2开始复制数据，所以只包含数组ints的最后两个元素(75和100)；数组subints3由于调用subarray()方法时传入了起始和结束索引的位置，故subints3只包含数组ints中间的两个元素