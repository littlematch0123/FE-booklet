# ES6中的模块

&emsp;&emsp;JS用"共享一切"的方法加载代码，这是该语言中最易出错且容易令人感到困惑的地方。在ES6以前，在应用程序的每一个JS中定义的一切都共享一个全局作用域。随着web应用程序变得更加复杂，JS代码的使用量也开始增长，这一做法会引起问题，如命名冲突和安全问题。ES6的一个目标是解决作用域问题，也为了使JS应用程序显得有序，于是引进了模块。本文将详细介绍ES6中的模块

&nbsp;

### 概述

&emsp;&emsp;模块是自动运行在严格模式下并且没有办法退出运行的JS代码。与共享一切架构相反的是，在模块顶部创建的变量不会自动被添加到全局共享作用域，这个变量仅在模块的顶级作用域中存在，而且模块必须导出一些外部代码可以访问的元素，如变量或函数。模块也可以从其他模块导入绑定

&emsp;&emsp;另外两个模块的特性与作用域关系不大，但也很重要。首先，在模块的顶部，this的值是undefined；其次，模块不支持HTML风格的代码注释，这是从早期浏览器残余下来的JS特性

&emsp;&emsp;脚本，也就是任何不是模块的JS代码，则缺少这些特性。模块和其他JS代码之间的差异可能乍一看不起眼，但是它们代表了JS代码加载和求值的一个重要变化。模块真正的魔力所在是仅导出和导入需要的绑定，而不是将所用东西都放到一个文件。只有很好地理解了导出和导入才能理解模块与脚本的区别

&nbsp;

### 导出

&emsp;&emsp;可以用export关键字将一部分己发布的代码暴露给其他模块，在最简单的用例中，可以将export放在任何变量、函数或类声明的前面，以将它们从模块导出

<div>
<pre>// 导出数据
export var color = "red";
export let name = "Nicholas";
export const magicNumber = 7;
// 导出函数
export function sum(num1, num2) {
    return num1 + num1;
}
// 导出类
export class Rectangle {
    constructor(length, width) {
        this.length = length;
        this.width = width;
    }
}
// 此函数为模块私有
function subtract(num1, num2) {
    return num1 - num2;
}
// 定义一个函数&hellip;&hellip;
function multiply(num1, num2) {
    return num1 * num2;
}
// &hellip;&hellip;稍后将其导出
export { multiply };</pre>
</div>

&emsp;&emsp;在这个示例中需要注意几个细节，除了export关键字外，每一个声明与脚本中的一模一样。因为导出的函数和类声明需要有一个名称，所以代码中的每一个函数或类也确实有这个名称。除非用default关键字，否则不能用这个语法导出匿名函数或类

&emsp;&emsp;另外，在定义multiply()函数时没有马上导出它。由于不必总是导出声明，可以导出引用，因此这段代码可以运行。此外，这个示例并未导出subtract()函数，任何未显式导出的变量、函数或类都是模块私有的，无法从模块外部访问

&nbsp;

### 导入

&emsp;&emsp;从模块中导出的功能可以通过import关键字在另一个模块中访问，import语句的两个部分分别是要导入的标识符和标识符应当从哪个模块导入

&emsp;&emsp;这是该语句的基本形式

<div>
<pre>import { identifier1, identifier2 } from "./example.js";</pre>
</div>

&emsp;&emsp;import后面的大括号表示从给定模块导入的绑定(binding)，关键字from表示从哪个模块导入给定的绑定，该模块由表示模块路径的字符串指定(被称作模块说明符)。浏览器使用的路径格式与传给&lt;script&gt;元素的相同，也就是说，必须把文件扩展名也加上。另一方面，Nodejs则遵循基于文件系统前缀区分本地文件和包的惯例。例如，example是一个包而./example.js是一个本地文件

&emsp;&emsp;当从模块中导入一个绑定时，它就好像使用const定义的一样。无法定义另一个同名变量(包括导入另一个同名绑定)，也无法在import语句前使用标识符或改变绑定的值

【导入单个绑定】

&emsp;&emsp;假设前面的示例在一个名为"example.js"的模块中，我们可以导入并以多种方式使用这个模块中的绑定

<div>
<pre>// 单个导入
import { sum } from "./example.js";
console.log(sum(1, 2)); // 3
sum = 1; // 出错</pre>
</div>

&emsp;&emsp;尽管example.js导出的函数不止一个，但这个示例导入的却只有sum()函数。如果尝试给sum赋新值，结果是抛出一个错误，因为不能给导入的绑定重新赋值

&emsp;&emsp;为了最好地兼容多个浏览器和Node.js环境，一定要在字符串之前包含/、./或../来表示要导入的文件

【导入多个绑定】

&emsp;&emsp;如果想从示例模块导入多个绑定，则可以明确地将它们列出如下

<div>
<pre>// 多个导入
import { sum, multiply, magicNumber } from "./example.js";
console.log(sum(1, magicNumber)); // 8
console.log(multiply(1, 2)); // 2</pre>
</div>

&emsp;&emsp;在这段代码中，从example模块导入3个绑定sum、multiply和magicNumber。之后使用它们，就像它们在本地定义的一样

【导入整个模块】

&emsp;&emsp;特殊情况下，可以导入整个模块作为一个单一的对象。然后所有的导出都可以作为对象的属性使用

<div>
<pre>// 完全导入
import * as example from "./example.js";
console.log(example.sum(1,example.magicNumber)); // 8
console.log(example.multiply(1, 2)); // 2</pre>
</div>

&emsp;&emsp;在这段代码中，从example.js中导出的所有绑定被加载到一个被称作example的对象中。指定的导出(sum()函数、mutiply()函数和magicNumber)之后会作为example的属性被访问。这种导入格式被称作命名空间导入(namespaceimport)。因为example.js文件中不存在example对象，故而它作为example.js中所有导出成员的命名空间对象而被创建

&emsp;&emsp;但是，不管在import语句中把一个模块写了多少次，该模块将只执行一次。导入模块的代码执行后，实例化过的模块被保存在内存中，只要另一个import语句引用它就可以重复使用它

<div>
<pre>import { sum } from "./example.js";
import { multiply } from "./example.js";
import { magicNumber } from "./example.js";</pre>
</div>

&emsp;&emsp;尽管在这个模块中有3个import语句，但example加载只执行一次。如果同一个应用程序中的其他模块也从example.js导入绑定，那么那些模块与此代码将使用相同的模块实例

【导入绑定的一个微妙怪异之处】

&emsp;&emsp;ES6的import语句为变量、函数和类创建的是只读绑定，而不是像正常变量一样简单地引用原始绑定。标识符只有在被导出的模块中可以修改，即便是导入绑定的模块也无法更改绑定的值

<div>
<pre>export var name = "huochai";
export function setName(newName) {
    name = newName;
}</pre>
</div>

&emsp;&emsp;当导入这两个绑定后，setName()函数可以改变name的值

<div>
<pre>import { name, setName } from "./example.js";
console.log(name); // "huochai"
setName("match");
console.log(name); // "match"
name = "huochai"; // error</pre>
</div>

&emsp;&emsp;调用setName("match")时会回到导出setName()的模块中去执行，并将name设置为"match"。此更改会自动在导入的name绑定上体现。其原因是，name是导出的name标识符的本地名称。本段代码中所使用的name和模块中导入的name不是同一个

&nbsp;

### 重命名

&emsp;&emsp;有时候，从一个模块导入变量、函数或者类时，可能不希望使用它们的原始名称。幸运的是，可以在导出过程和导入过程中改变导出元素的名称

&emsp;&emsp;假设要使用不同的名称导出一个函数，则可以用as关键字来指定函数在模块外的名称

<div>
<pre>function sum(num1, num2) {
    return num1 + num2;
}
export { sum as add };</pre>
</div>

&emsp;&emsp;在这里，函数sum()是本地名称，add()是导出时使用的名称。也就是说，当另一个模块要导入这个函数时，必须使用add这个名称

<div>
<pre>import { add } from "./example.js";</pre>
</div>

&emsp;&emsp;如果模块想使用不同的名称来导入函数，也可以使用as关键字

<div>
<pre>import { add as sum } from "./example.js";
console.log(typeof add); // "undefined"
console.log(sum(1, 2)); // 3</pre>
</div>

&emsp;&emsp;这段代码导入add()函数时使用了一个导入名称来重命名sum()函数(当前上下文中的本地名称)。导入时改变函数的本地名称意味着即使模块导入了add()函数，在当前模块中也没有add()标识符

&nbsp;

### 默认值

&emsp;&emsp;由于在诸如CommonJS的其他模块系统中，从模块中导出和导入默认值是一个常见的做法，该语法被进行了优化。模块的默认值指的是通过default关键字指定的单个变量、函数或类，只能为每个模块设置一个默认的导出值，导出时多次使用default关键字是一个语法错误

【导出默认值】

&emsp;&emsp;下面是一个使用default关键字的简单示例

<div>
<pre>export default function(num1, num2) {
    return num1 + num2;
}</pre>
</div>

&emsp;&emsp;这个模块导出了一个函数作为它的默认值，default关键字表示这是一个默认的导出，由于函数被模块所代表，因而它不需要一个名称

&emsp;&emsp;也可以在export default之后添加默认导出值的标识符，就像这样

<div>
<pre>function sum(num1, num2) {
    return num1 + num2;
}
export default sum;</pre>
</div>

&emsp;&emsp;先定义sum()函数，然后再将其导出为默认值，如果需要计算默认值，则可以使用这个方法。为默认导出值指定标识符的第三种方法是使用重命名语法，如下所示

<div>
<pre>function sum(num1, num2) {
    return num1 + num2;
}
export { sum as default };</pre>
</div>

&emsp;&emsp;在重命名导出时标识符default具有特殊含义，用来指示模块的默认值。由于default是JS中的默认关键字，因此不能将其用于变量、函数或类的名称；但是，可以将其用作属性名称。所以用default来重命名模块是为了尽可能与非默认导出的定义一致。如果想在一条导出语句中同时指定多个导出(包括默认导出)，这个语法非常有用

【导入默认值】

&emsp;&emsp;可以使用以下语法从一个模块导入一个默认值

<div>
<pre>// 导入默认值
import sum from "./example.js";
console.log(sum(1, 2)); // 3</pre>
</div>

&emsp;&emsp;这条import语句从模块example.js中导入了默认值，请注意，这里没有使用大括号，与非默认导入的情况不同。本地名称sum用于表示模块导出的任何默认函数，这种语法是最纯净的，ES6的创建者希望它能够成为web上主流的模块导入形式，并且可以使用已有的对象

&emsp;&emsp;对于导出默认值和一或多个非默认绑定的模块，可以用一条语句导入所有导出的绑定

<div>
<pre>export let color = "red";
export default function(num1, num2) {
    return num1 + num2;
}</pre>
</div>

&emsp;&emsp;可以用以下这条import语句导入color和默认函数

<div>
<pre>import sum, { color } from "./example.js";
console.log(sum(1, 2)); // 3
console.log(color); // "red"</pre>
</div>

&emsp;&emsp;用逗号将默认的本地名称与大括号包裹的非默认值分隔开

&emsp;&emsp;注意：在import语句中，默认值必须排在非默认值之前

&emsp;&emsp;与导出默认值一样，也可以在导入默认值时使用重命名语法

<div>
<pre>// 等价于上个例子
import { default as sum, color } from "example";
console.log(sum(1, 2)); // 3
console.log(color); // "red"</pre>
</div>

&emsp;&emsp;在这段代码中，默认导出(export)值被重命名为sum，并且还导入了color

&nbsp;

### 静态加载

&emsp;&emsp;ES6中的模块与node.js中的模块加载不同，nodeJS中的require语句是运行时加载，而ES6中的import是静态加载，所以有一些语法限制

&emsp;&emsp;1、不能使用表达式和变量等这些只有在运行时才能得到结果的语法结构

<div>
<pre>// 报错
import { 'f' + 'oo' } from 'my_module';

// 报错
let module = 'my_module';
import { foo } from module;</pre>
</div>

&emsp;&emsp;2、`import`和`export`命令只能在模块的顶层，不能在代码块之中，如不能在if语句和函数内使用

<div>
<pre>if (flag) {
    export flag; // 语法错误
}
// 报错
if (x === 1) {
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}</pre>
</div>
<div>
<pre>function tryImport() {
    import flag from "./example.js"; // 语法错误
}</pre>
</div>

&emsp;&emsp;以上的写法会报错，是因为在静态分析阶段，这些语法都是没法得到值的

&emsp;&emsp;这样的设计，固然有利于编译器提高效率，但也导致无法在运行时加载模块。在语法上，条件加载就不可能实现。如果`import`命令要取代 Node 的`require`方法，这就形成了一个障碍。因为`require`是运行时加载模块，`import`命令无法取代`require`的动态加载功能

<div>
<pre>const path = './' + fileName;
const myModual = require(path);</pre>
</div>

&emsp;&emsp;上面的语句就是动态加载，`require`到底加载哪一个模块，只有运行时才知道。`import`语句做不到这一点

&nbsp;

### 重新导出

&emsp;&emsp;可能需要重新导出模块已经导入的内容

<div>
<pre>import { sum } from "./example.js";
export { sum }</pre>
</div>

&emsp;&emsp;虽然这样可以运行，但只通过一条语句也可以完成同样的任务

<div>
<pre>export { sum } from "./example.js";</pre>
</div>

&emsp;&emsp;这种形式的export在指定的模块中查找sum声明，然后将其导出。当然，对于同样的值也可以不同的名称导出

<div>
<pre>export { sum as add } from "./example.js";</pre>
</div>

&emsp;&emsp;这里的sum是从example.js导入的，然后再用add这个名字将其导出

&emsp;&emsp;如果想导出另一个模块中的所有值，则可以使用*模式

<div>
<pre>export * from "./example.js";</pre>
</div>

&emsp;&emsp;导出一切是指导出默认值及所有命名导出值，这可能会影响可以从模块导出的内容。例如，如果example.js有默认的导出值，则使用此语法时将无法定义一个新的默认导出

&nbsp;

### 无绑定导入

&emsp;&emsp;某些模块可能不导出任何东西，相反，它们可能只修改全局作用域中的对象。尽管模块中的顶层变量、函数和类不会自动地出现在全局作用域中，但这并不意味着模块无法访问全局作用域。内建对象(如Array和Object)的共享定义可以在模块中访问，对这些对象所做的更改将反映在其他模块中

&emsp;&emsp;例如，要向所有数组添加pushAll()方法，则可以定义如下所示的模块

<div>
<pre>// 没有导出与导入的模块
Array.prototype.pushAll = function(items) {
    // items 必须是一个数组
    if (!Array.isArray(items)) {
        throw new TypeError("Argument must be an array.");
    }
    // 使用内置的 push() 与扩展运算符
    return this.push(...items);
};</pre>
</div>

&emsp;&emsp;即使没有任何导出或导入的操作，这也是一个有效的模块。这段代码既可以用作模块也可以用作脚本。由于它不导出任何东西，因而可以使用简化的导入操作来执行模块代码，而且不导入任何的绑定

<div>
<pre>import "./example.js";
let colors = ["red", "green", "blue"];
let items = [];
items.pushAll(colors);</pre>
</div>

&emsp;&emsp;这段代码导入并执行了模块中包含的pushAll()方法，所以pushAll()被添加到数组的原型，也就是说现在模块中的所有数组都可以使用pushAll()方法了

&emsp;&emsp;注意：无绑定导入最有可能被应用于创建polyfill和Shim

&nbsp;

### 加载模块

&emsp;&emsp;虽然ES6定义了模块的语法，但它并没有定义如何加载这些模块。这正是规范复杂性的一个体现，应由不同的实现环境来决定。ES6没有尝试为所有JS环境创建一套统一的标准，它只规定了语法，并将加载机制抽象到一个未定义的内部方法HostResolveImportedModule中。Web浏览器和Node.js开发者可以通过对各自环境的认知来决定如何实现HostResolveImportedModule&nbsp;

【在Web浏览器中使用模块】

&emsp;&emsp;即使在ES6出现以前，Web浏览器也有多种方式可以将JS包含在Web应用程序中，这些脚本加载的方法分别是

&emsp;&emsp;1、在&lt;script&gt;元素中通过src属性指定一个加载代码的地址来加载JS代码文件

&emsp;&emsp;2、将JS代码内嵌到没有src属性的&lt;script&gt;元素中

&emsp;&emsp;3、通过Web Worker或Service Worker的方法加载并执行JS代码文件

&emsp;&emsp;为了完全支持模块功能，Web浏览器必须更新这些机制

**在&lt;script&gt;中使用模块**

&emsp;&emsp;&lt;script&gt;元素的默认行为是将JS文件作为脚本加载，而非作为模块加载，当type属性缺失或包含一个JS内容类型(如"text/javascript")时就会发生这种情况。&lt;script&gt;元素可以执行内联代码或加载src中指定的文件，当type属性的值为"module"时支持加载模块。将type设置为"module"可以让浏览器将所有内联代码或包含在src指定的文件中的代码按照模块而非脚本的方式加载

<div>
<pre>&lt;!-- load a module JavaScript file --&gt;
&lt;script type="module" src="module.js"&gt;&lt;/script&gt;
&lt;!-- include a module inline --&gt;
&lt;script type="module"&gt;
    import { sum } from "./example.js";
    let result = sum(1, 2);
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;此示例中的第一个&lt;script&gt;元素使用src属性加载了一个外部的模块文件，它与加载脚本之间的唯一区别是type的值是"module"。第二个&lt;script&gt;元素包含了直接嵌入在网页中的模块。变量result没有暴露到全局作用域，它只存在于模块中(由&lt;script&gt;元素定义)，因此不会被添加到window作为它的属性

&emsp;&emsp;在Web页面中引入模块的过程类似于引入脚本，相当简单。但是，模块实际的加载过程却有一些不同

&emsp;&emsp;"module"与"text/javascript"这样的内容类型并不相同。JS模块文件与JS脚本文件具有相同的内容类型，因此无法仅根据内容类型进行区分。此外，当无法识别type的值时，浏览器会忽略&lt;script&gt;元素，因此不支持模块的浏览器将自动忽略&lt;script type="module"&gt;来提供良好的向后兼容性

**Web浏览器中的模块加载顺序**

&emsp;&emsp;模块与脚本不同，它是独一无二的，可以通过import关键字来指明其所依赖的其他文件，并且这些文件必须被加载进该模块才能正确执行。为了支持该功能，&lt;script type="module"&gt;执行时自动应用defer属性

&emsp;&emsp;加载脚本文件时，defer是可选属性加载模块时，它就是必需属性。一旦HTML解析器遇到具有src属性的&lt;script type="module"&gt;，模块文件便开始下载，直到文档被完全解析模块才会执行。模块按照它们出现在HTML文件中的顺序执行，也就是说，无论模块中包含的是内联代码还是指定src属性，第一个&lt;scpipt type="module"&gt;总是在第二个之前执行

<div>
<pre>&lt;!-- this will execute first --&gt;
&lt;script type="module" src="module1.js"&gt;&lt;/script&gt;
&lt;!-- this will execute second --&gt;
&lt;script type="module"&gt;
import { sum } from "./example.js";
let result = sum(1, 2);
&lt;/script&gt;
&lt;!-- this will execute third --&gt;
&lt;script type="module" src="module2.js"&gt;&lt;/script&gt;</pre>
</div>

&emsp;&emsp;这3个&lt;script&gt;元素按照它们被指定的顺序执行，所以模块module1.js保证会在内联模块前执行，而内联模块保证会在module2.js模块之前执行

&emsp;&emsp;每个模块都可以从一个或多个其他的模块导入，这会使问题复杂化。因此，首先解析模块以识别所有导入语句；然后，每个导入语句都触发一次获取过程(从网络或从缓存)，并且在所有导入资源都被加载和执行后才会执行当前模块

&emsp;&emsp;用&lt;script type="module"&gt;显式引入和用import隐式导入的所有模块都是按需加载并执行的。在这个示例中，完整的加载顺序如下

&emsp;&emsp;1、下载并解析module1.js

&emsp;&emsp;2、递归下载并解析module1.js中导入的资源

&emsp;&emsp;3、解析内联模块

&emsp;&emsp;4、递归下载并解析内联模块中导入的资源

&emsp;&emsp;5、下载并解析module2.js

&emsp;&emsp;6、递归下载并解析module2.js中导入的资源

&emsp;&emsp;加载完成后，只有当文档完全被解析之后才会执行其他操作。文档解析完成后，会发生以下操作

&emsp;&emsp;1、递归执行module1.js中导入的资源

&emsp;&emsp;2、执行module1.js

&emsp;&emsp;3、递归执行内联模块中导入的资源

&emsp;&emsp;4、执行内联模块

&emsp;&emsp;5、递归执行module2.js中导入的资源

&emsp;&emsp;6、执行module2.js

&emsp;&emsp;内联模块与其他两个模块唯一的不同是，它不必先下载模块代码。否则，加载导入资源和执行模块的顺序就是一样的

&emsp;&emsp;注意：&lt;script type="module"&gt;元素会忽略defer属性，因为它执行时defer属性默认是存在的

**Web浏览器中的异步模块加载**

&emsp;&emsp;&lt;script&gt;元素上的async属性应用于脚本时，脚本文件将在文件完全下载并解析后执行。但是，文档中async脚本的顺序不会影响脚本执行的顺序，脚本在下载完成后立即执行，而不必等待包含的文档完成解析

&emsp;&emsp;async属性也可以应用在模块上，在&lt;script type="module"&gt;元素上应用async属性会让模块以类似于脚本的方式执行，唯一的区别是，在模块执行前，模块中所有的导入资源都必须下载下来。这可以确保只有当模块执行所需的所有资源都下载完成后才执行模块，但不能保证的是模块的执行时机

<div>
<pre>&lt;!-- no guarantee which one of these will execute first --&gt;
&lt;script type="module" async src="module1.js"&gt;&lt;/script&gt;
&lt;script type="module" async src="module2.js"&gt;&lt;/script&gt;</pre>
</div>

&emsp;&emsp;在这个示例中，两个模块文件被异步加载。只是简单地看这个代码判断不出哪个模块先执行，如果module1.js首先完成下载(包括其所有的导入资源)，它将先执行；如果module2.js首先完成下载，那么它将先执行

**将模块作为Woker加载**

&emsp;&emsp;Worker，例如Web Worker和Service Woker，可以在网页上下文之外执行JS代码。创建新Worker的步骤包括创建一个新的Worker实例(或其他的类)，传入JS文件的地址。默认的加载机制是按照脚本的方式加载文件

<div>
<pre>// 用脚本方式加载 script.js
let worker = new Worker("script.js");</pre>
</div>

&emsp;&emsp;为了支持加载模块，HTML标准的开发者向这些构造函数添加了第二个参数，第二个参数是一个对象，其type属性的默认值为"script"。可以将type设置为"module"来加载模块文件

<div>
<pre>// 用模块方式加载 module.js
let worker = new Worker("module.js", { type: "module" });</pre>
</div>

&emsp;&emsp;在此示例中，给第二个参数传入一个对象，其type属性的值为"module"，即按照模块而不是脚本的方式加载module.js。(这里的type属性是为了模仿&lt;script&gt;标签的type属性，用以区分模块和脚本)所有浏览器中的Worker类型都支持第二个参数

&emsp;&emsp;Worker模块通常与Worker脚本一起使用，但也有一些例外。首先，Worker脚本只能从与引用的网页相同的源加载，但是Worker模块不会完全受限，虽然Worker模块具有相同的默认限制，但它们还是可以加载并访问具有适当的跨域资源共享(CORS)头的文件；其次，尽管Worker脚本可以使用self.importScripts()方法将其他脚本加载到Worker中，但self.importScripts()却始终无法加载Worker模块，因为应该使用import来导入

【浏览器模块说明符解析】

&emsp;&emsp;浏览器要求模块说明符具有以下几种格式之一

&emsp;&emsp;1、以/开头的解析为从根目录开始

&emsp;&emsp;2、以./开头的解析为从当前目录开始

&emsp;&emsp;3、以../开头的解析为从父目录开始

&emsp;&emsp;4、URL格式

&emsp;&emsp;例如，假设有一个模块文件位于https://www.example.com/modules/modules.js，其中包含以下代码

<div>
<pre>// 从 https://www.example.com/modules/example1.js 导入
import { first } from "./example1.js";
// 从 from https://www.example.com/example2.js 导入
import { second } from "../example2.js";
// 从 from https://www.example.com/example3.js 导入
import { third } from "/example3.js";
// 从 from https://www2.example.com/example4.js 导入
import { fourth } from "https://www2.example.com/example4.js";</pre>
</div>

&emsp;&emsp;此示例中的每个模块说明符都适用于浏览器，包括最后一行中的那个完整的URL(为了支持跨域加载，只需确保www2.example.com的CORS头的配置是正确的)尽管尚未完成的模块加载器规范将提供解析其他格式的方法，但目前，这些是浏览器默认情况下唯一可以解析的模块说明符的格式

&emsp;&emsp;因此，一些看起来正常的模块说明符在浏览器中实际上是无效的，并且会导致错误

<div>
<pre>// 无效：没有以 / 、 ./ 或 ../ 开始
import { first } from "example.js";
// 无效：没有以 / 、 ./ 或 ../ 开始
import { second } from "example/index.js";</pre>
</div>

&emsp;&emsp;由于这两个模块说明符的格式不正确(缺少正确的起始字符)，因此它们无法被浏览器加载，即使在&lt;script&gt;标签中用作src的值时二者都可以正常工作。&lt;script&gt;标签和import之间的这种行为差异是有意为之

&nbsp;

### 总结

&emsp;&emsp;下面对AMD、CMD、CommonJS和ES6的module进行总结对比

&emsp;&emsp;AMD是requireJS在推广过程中对模块定义的规范化产出。AMD是一个规范，只定义语法API，而requireJS是具体的实现。类似于ECMAScript和javascript的关系

&emsp;&emsp;由下面代码可知，AMD的特点是依赖前置，对于依赖的模块提前执行

<div>
<pre>// AMD
define(['./a', './b'], function(a, b) {  // 依赖必须一开始就写好
    a.doSomething()    
    // 此处略去 n 行    
    b.doSomething()    
    ...
})</pre>
</div>

&emsp;&emsp;CMD 是 SeaJS 在推广过程中对模块定义的规范化产出，它的特点是依赖就近，对于依赖的模块延迟执行

<div>
<pre>// CMD
define(function(require, exports, module) { 
    var a = require('./a')
     a.doSomething()  
    // 此处略去 n 行   
    var b = require('./b') // 依赖可以就近书写  
    b.doSomething()   
    // ... 
})
</pre>
</div>

&emsp;&emsp;CommonJS规范主要在NodeJS后端使用，前端浏览器不支持该规范

<div>
<pre>// math.js
exports.add = function () {
    var sum = 0, i = 0,args = arguments, l = args.length;
    while (i &lt; l) {
        sum += args[i++];
    }
    return sum;
};
// program.js
var math = require('math');
exports.increment = function (val) {
    return math.add(val, 1);
};
</pre>
</div>

&emsp;&emsp;ES6的Module模块主要通过export和import来进行模块的导入和导出

<div>
<pre>//example.js
export default function(num1, num2) {
    return num1 + num2;
}
// 导入默认值
import sum from "./example.js";
console.log(sum(1, 2)); // 3
</pre>
</div>

