# ES6解构赋值

&emsp;&emsp;我们经常定义许多对象和数组，然后有组织地从中提取相关的信息片段。在ES6中添加了可以简化这种任务的新特性：解构。解构是一种打破数据结构，将其拆分为更小部分的过程。本文将详细介绍ES6解构赋值

&nbsp;

### 引入

&emsp;&emsp;在ES5中，开发者们为了从对象和数组中获取特定数据并赋值给变量，编写了许多看起来同质化的代码

<div>
<pre>let options = {
    repeat: true,
    save: false
};
// 从对象中提取数据
let repeat = options.repeat,
save = options.save;</pre>
</div>

&emsp;&emsp;这段代码从options对象中提取repeat和save的值，并将其存储为同名局部变量，提取的过程极为相似

&emsp;&emsp;如果要提取更多变量，则必须依次编写类似的代码来为变量赋值，如果其中还包含嵌套结构，只靠遍历是找不到真实信息的，必须要深入挖掘整个数据结构才能找到所需数据

&emsp;&emsp;所以ES6添加了解构功能，将数据结构打散的过程变得更加简单，可以从打散后更小的部分中获取所需信息

&nbsp;

### 对象解构

&emsp;&emsp;对象字面量的语法形式是在一个赋值操作符左边放置一个对象字面量

<div>
<pre>let node = {
    type: "Identifier",
    name: "foo"
};
let { type, name } = node;
console.log(type); // "Identifier"
console.log(name); // "foo"</pre>
</div>

&emsp;&emsp;在这段代码中，node.type的值被存储在名为type的变量中；node.name的值被存储在名为name的变量中

【解构赋值】

&emsp;&emsp;到目前为止，我们已经将对象解构应用到了变量的声明中。然而，我们同样可以在给变量赋值时使用解构语法

<div>
<pre>let node = {
    type: "Identifier",
    name: "foo"
},
type = "Literal",
name = 5;
// 使用解构来分配不同的值
({ type, name } = node);
console.log(type); // "Identifier"
console.log(name); // "foo"</pre>
</div>

&emsp;&emsp;在这个示例中，声明变量type和name时初始化了一个值，在后面几行中，通过解构赋值的方法，从node对象读取相应的值重新为这两个变量赋值

&emsp;&emsp;注意：一定要用一对小括号包裹解构赋值语句，JS引擎将一对开放的花括号视为一个代码块。语法规定，代码块语句不允许出现在赋值语句左侧，添加小括号后可以将块语句转化为一个表达式，从而实现整个解构赋值过程

&emsp;&emsp;解构赋值表达式的值与表达式右侧(也就是=右侧)的值相等，如此一来，在任何可以使用值的地方都可以使用解构赋值表达式

<div>
<pre>let node = {
    type: "Identifier",
    name: "foo"
},
type = "Literal",
name = 5;
function outputInfo(value) {
    console.log(value === node); // true
}
outputInfo({ type, name } = node);
console.log(type); // "Identifier"
console.log(name); // "foo"</pre>
</div>

&emsp;&emsp;调用outputlnfo()函数时传入了一个解构表达式，由于JS表达式的值为右侧的值，因而此处传入的参数等同于node，且变量type和name被重新赋值，最终将node传入outputlnfo()函数

&emsp;&emsp;注意：解构赋值表达式(也就是=右侧的表达式)如果为null或undefined会导致程序抛出错误。也就是说，任何尝试读取null或undefined的属性的行为都会触发运行时错误

【默认值】

&emsp;&emsp;使用解构赋值表达式时，如果指定的局部变量名称在对象中不存在，那么这个局部变量会被赋值为undefined

<div>
<pre>let node = {
    type: "Identifier",
    name: "foo"
};
let { type, name, value } = node;
console.log(type); // "Identifier"
console.log(name); // "foo"
console.log(value); // undefined</pre>
</div>

&emsp;&emsp;这段代码额外定义了一个局部变量value，然后尝试为它赋值，然而在node对象上，没有对应名称的属性值，所以像预期中的那样将它赋值为undefined

&emsp;&emsp;当指定的属性不存在时，可以随意定义一个默认值，在属性名称后添加一个等号(=)和相应的默认值即可

<div>
<pre>let node = {
    type: "Identifier",
    name: "foo"
};
let { type, name, value = true } = node;
console.log(type); // "Identifier"
console.log(name); // "foo"
console.log(value); // true</pre>
</div>

&emsp;&emsp;在此示例中，为变量value设置了默认值true，只有当node上没有该属性或者该属性值为undefined时该值才生效。此处没有node.value属性，因为value使用了预设的默认值

【为非同名局部变量赋值】

&emsp;&emsp;如果希望使用不同命名的局部变量来存储对象属性的值，ES6中的一个扩展语法可以满足需求，这个语法与完整的对象字面量属性初始化程序的很像

<div>
<pre>let node = {
    type: "Identifier",
    name: "foo"
};
let { type: localType, name: localName } = node;
console.log(localType); // "Identifier"
console.log(localName); // "foo"</pre>
</div>

&emsp;&emsp;这段代码使用了解构赋值来声明变量localType和localName，这两个变量分别包含node.type和node.name属性的值。type:localType语法的含义是读取名为type的属性并将其值存储在变量localType中，这种语法实际上与传统对象字面量的语法相悖，原来的语法名称在冒号左边，值在右边；现在值在冒号右边，而对象的属性名在左边

&emsp;&emsp;当使用其他变量名进行赋值时也可以添加默认值，只需在变量名后添加等号和默认值即可

<div>
<pre>let node = {
    type: "Identifier"
};
let { type: localType, name: localName = "bar" } = node;
console.log(localType); // "Identifier"
console.log(localName); // "bar"</pre>
</div>

&emsp;&emsp;在这段代码中，由于node.name属性不存在，变量被默认赋值为"bar"

【嵌套对象解构】

&emsp;&emsp;解构嵌套对象仍然与对象字面量的语法相似，可以将对象拆解以获取想要的信息

<div>
<pre>let node = {
    type: "Identifier",
    name: "foo",
    loc: {
        start: {
            line: 1,
            column: 1
        },
    end: {
        line: 1,
        column: 4
    }
}
};
let { loc: { start }} = node;
console.log(start.line); // 1
console.log(start.column); // 1</pre>
</div>

&emsp;&emsp;在这个示例中，我们在解构模式中使用了花括号，其含义为在找到node对象中的loc属性后，应当深入一层继续查找start属性。在上面的解构示例中，所有冒号前的标识符都代表在对象中的检索位置，其右侧为被赋值的变量名；如果冒号后是花括号，则意味着要赋予的最终值嵌套在对象内部更深的层级中

&emsp;&emsp;更进一步，也可以使用一个与对象属性名不同的局部变量名

<div>
<pre>let node = {
    type: "Identifier",
    name: "foo",
    loc: {
        start: {
            line: 1,
            column: 1
        },
        end: {
            line: 1,
            column: 4
        }
    }
};
// 提取 node.loc.start
let { loc: { start: localStart }} = node;
console.log(localStart.line); // 1
console.log(localStart.column); // 1</pre>
</div>

&emsp;&emsp;在这个版本中，node.loc.start被存储在了新的局部变量localStart中。解构模式可以应用于任意层级深度的对象，且每一层都具备同等的功能

&nbsp;

### 数组解构

&emsp;&emsp;与对象解构的语法相比，数组解构就简单多了，它使用的是数组字面量，且解构操作全部在数组内完成，而不是像对象字面量语法一样使用对象的命名属性

<div>
<pre>let colors = [ "red", "green", "blue" ];
let [ firstColor, secondColor ] = colors;
console.log(firstColor); // "red"
console.log(secondColor); // "green"</pre>
</div>

&emsp;&emsp;在这段代码中，我们从colors数组中解构出了"red"和"green"这两个值，并分别存储在变量firstColor和变量secondColor中。在数组解构语法中，我们通过值在数组中的位置进行选取，且可以将其存储在任意变量中，未显式声明的元素都会直接被忽略

&emsp;&emsp;在解构模式中，也可以直接省略元素，只为感兴趣的元素提供变量名

<div>
<pre>let colors = [ "red", "green", "blue" ];
let [ , , thirdColor ] = colors;
console.log(thirdColor); // "blue"</pre>
</div>

&emsp;&emsp;这段代码使用解构赋值语法从colors中获取第3个元素，thirdColor前的逗号是前方元素的占位符，无论数组中的元素有多少个，都可以通过这种方法提取想要的元素，不需要为每一个元素都指定变量名

【解构赋值】

&emsp;&emsp;数组解构也可用于赋值上下文，但不需要用小括号包裹表达式，这一点与对象解构不同

<div>
<pre>let colors = [ "red", "green", "blue" ],
firstColor = "black",
secondColor = "purple";
[ firstColor, secondColor ] = colors;
console.log(firstColor); // "red"
console.log(secondColor); // "green"</pre>
</div>

&emsp;&emsp;这段代码中的解构赋值与上一个数组解构示例相差无几，唯一的区别是此处的firstColor变量和secondColor变量已经被定义了

【变量交换】

&emsp;&emsp;数组解构语法还有一个独特的用例：交换两个变量的值。在排序算法中，值交换是一个非常常见的操作，如果要在ES5中交换两个变量的值，则须引入第三个临时变量

<div>
<pre>// 在 ES5 中互换值
let a = 1,
    b = 2,
    tmp;
tmp = a;
a = b;
b = tmp;
console.log(a); // 2
console.log(b); // 1</pre>
</div>

&emsp;&emsp;在这种变量交换的方式中，中间变量tmp不可或缺。如果使用数组解构赋值语法，就不再需要额外的变量了

<div>
<pre>// 在 ES6 中互换值
let a = 1,
    b = 2;
[ a, b ] = [ b, a ];
console.log(a); // 2
console.log(b); // 1</pre>
</div>

&emsp;&emsp;在这个示例中，数组解构赋值看起来像是一个镜像：赋值语句左侧(也就是等号左侧)与其他数组解构示例一样，是一个解构模式；右侧是一个为交换过程创建的临时数组字面量。代码执行过程中，先解构临时数组，将b和a的值复制到左侧数组的前两个位置，最终结果是变量互换了它们的值

&emsp;&emsp;注意：如果右侧数组解构赋值表达式的值为null或undefined，则会导致程序抛出错误

【默认值】

&emsp;&emsp;也可以在数组解构赋值表达式中为数组中的任意位置添加默认值，当指定位置的属性不存在或其值为undefined时使用默认值

<div>
<pre>let colors = [ "red" ];
let [ firstColor, secondColor = "green" ] = colors;
console.log(firstColor); // "red"
console.log(secondColor); // "green"</pre>
</div>

&emsp;&emsp;在这段代码中，colors数组中只有一个元素，secondColor没有对应的匹配值，但是它有一个默认值"green"，所以最终secondColor的输出结果不会是undefined

【嵌套数组解构】

&emsp;&emsp;嵌套数组解构与嵌套对象解构的语法类似，在原有的数组模式中插入另一个数组模式，即可将解构过程深入到下一个层级

<div>
<pre>let colors = [ "red", [ "green", "lightgreen" ], "blue" ];
// 随后
let [ firstColor, [ secondColor ] ] = colors;
console.log(firstColor); // "red"
console.log(secondColor); // "green"</pre>
</div>

&emsp;&emsp;在此示例中，变量secondColor引用的是colors数组中的值"green"，该元素包含在数组内部的另一个数组中，所以seconColor两侧的方括号是一个必要的解构模式。同样，在数组中也可以无限深入去解构，就像在对象中一样

【不定元素】

&emsp;&emsp;函数具有不定参数，而在数组解构语法中有一个相似的概念&mdash;&mdash;不定元素。在数组中，可以通过...语法将数组中的其余元素赋值给一个特定的变量

<div>
<pre>let colors = [ "red", "green", "blue" ];
let [ firstColor, ...restColors ] = colors;
console.log(firstColor); // "red"
console.log(restColors.length); // 2
console.log(restColors[0]); // "green"
console.log(restColors[1]); // "blue"</pre>
</div>

&emsp;&emsp;数组colors中的第一个元素被赋值给了firstColor，其余的元素被赋值给restColors数组，所以restColors中包含两个元素："green"和"blue"。不定元素语法有助于从数组中提取特定元素并保证其余元素可用

【数组复制】

&emsp;&emsp;在ES5中，开发者们经常使用concat()方法来克隆数组

<div>
<pre>// 在 ES5 中克隆数组
var colors = [ "red", "green", "blue" ];
var clonedColors = colors.concat();
console.log(clonedColors); //"[red,green,blue]"</pre>
</div>

&emsp;&emsp;concat()方法的设计初衷是连接两个数组，如果调用时不传递参数就会返回当前函数的副本

&emsp;&emsp;在ES6中，可以通过不定元素的语法来实现相同的目标

<div>
<pre>// 在 ES6 中克隆数组
let colors = [ "red", "green", "blue" ];
let [ ...clonedColors ] = colors;
console.log(clonedColors); //"[red,green,blue]"</pre>
</div>

&emsp;&emsp;在这个示例中，我们通过不定元素的语法将colors数组中的值复制到clonedColors数组中

&emsp;&emsp;注意：在被解构的数组中，不定元素必须为最后一个条目，在后面继续添加逗号会导致程序抛出语法错误

&nbsp;

### 混合解构

&emsp;&emsp;可以混合使用对象解构和数组解构来创建更多复杂的表达式，如此一来，可以从任何混杂着对象和数组的数据解构中提取想要的信息

<div>
<pre>let node = {
    type: "Identifier",
    name: "foo",
    loc: {
        start: {
            line: 1,
            column: 1
        },
        end: {
            line: 1,
            column: 4
        }
    },
    range: [0, 3]
};
let {
    loc: { start },
    range: [ startIndex ]
} = node;
console.log(start.line); // 1
console.log(start.column); // 1
console.log(startIndex); // 0</pre>
</div>

&emsp;&emsp;这段代码分别将node.loc.start和node.range[0]提取到变量start和startlndex中

&emsp;&emsp;解构模式中的loc和range仅代表它们在node对象中所处的位置(也就是该对象的属性)。当使用混合解构的语法时，则可以从node提取任意想要的信息。这种方法极为有效，尤其是从JSON配置中提取信息时，不再需要遍历整个结构了

【解构参数】

&emsp;&emsp;解构可以用在函数参数的传递过程中，这种使用方式更特别。当定义一个接受大量可选参数的JS函数时，通常会创建一个可选对象，将额外的参数定义为这个对象的属性

<div>
<pre>// options 上的属性表示附加参数
function setCookie(name, value, options) {
    options = options || {};
    let secure = options.secure,
        path = options.path,
        domain = options.domain,
        expires = options.expires;
        // 设置 cookie 的代码
}
// 第三个参数映射到 options
setCookie("type", "js", {
    secure: true,
    expires: 60000
});</pre>
</div>

&emsp;&emsp;许多JS库中都有类似的setCookie()函数，而在示例函数中，name和value是必需参数，而secure、path、domain和expires则不然，这些参数相对而言没有优先级顺序，将它们列为额外的命名参数也不合适，此时为options对象设置同名的命名属性是一个很好的选择。现在的问题是，仅查看函数的声明部分，无法辨识函数的预期参数，必须通过阅读函数体才可以确定所有参数的情况

&emsp;&emsp;如果将options定义为解构参数，则可以更清晰地了解函数预期传入的参数。解构参数需要使用对象或数组解构模式代替命名参数

<div>
<pre>function setCookie(name, value, { secure, path, domain, expires }) {
// 设置 cookie 的代码
}
setCookie("type", "js", {
    secure: true,
    expires: 60000
});</pre>
</div>

&emsp;&emsp;这个函数与之前示例中的函数具有相似的特性，只是现在使用解构语法代替了第3个参数来提取必要的信息，其他参数保持不变，但是对于调用setCookie()函数的使用者而言，解构参数变得更清晰了

【必须传值的解构参数】

&emsp;&emsp;解构参数有一个奇怪的地方，默认情况下，如果调用函数时不提供被解构的参数会导致程序抛出错误

<div>
<pre>// 出错！
setCookie("type", "js");</pre>
</div>

&emsp;&emsp;缺失的第3个参数，其值为undefined，而解构参数只是将解构声明应用在函数参数的一个简写方法，其会导致程序抛出错误。当调用setCookie()函数时，JS引擎实际上做了以下这些事情

<div>
<pre>function setCookie(name, value, options) {
    let { secure, path, domain, expires } = options;
    // 设置 cookie 的代码
}</pre>
</div>

&emsp;&emsp;如果解构赋值表达式的右值为null或undefined，则程序会报错。同理，若调用setCookie()函数时不传入第3个参数，也会导致程序抛出错误

&emsp;&emsp;如果解构参数是必需的，大可忽略掉这些问题；但如果希望将解构参数定义为可选的，那么就必须为其提供默认值来解决这个问题

<div>
<pre>function setCookie(name, value, { secure, path, domain, expires } = {}) {
    // ...
}</pre>
</div>

&emsp;&emsp;这个示例中为解构参数添加了一个新对象作为默认值，secure、path、domain及expires这些变量的值全部为undefined，这样即使在调用setCookie()时未传递第3个参数，程序也不会报错

【默认值】

&emsp;&emsp;可以为解构参数指定默认值，就像在解构赋值语句中那样，只需在参数后添加等号并且指定一个默认值即可

<div>
<pre>function setCookie(name, value,
    {
        secure = false,
        path = "/",
        domain = "example.com",
        expires = new Date(Date.now() + 360000000)
    } = {}
) {
    // ...
}</pre>
</div>

&emsp;&emsp;在这段代码中，解构参数的每一个属性都有默认值，从而无须再逐一检查每一个属性是否都有默认值。然而，这种方法也有很多缺点。首先，函数声明变得比以前复杂了；其次，如果解构参数是可选的，那么仍然要给它添加一个空对象作为参数，否则像setCookie("type","js")这样的调用会导致程序抛出错误

&emsp;&emsp;对于对象类型的解构参数，最好为其赋予相同解构的默认参数

<div>
<pre>function setCookie(name, value,
    {
        secure = false,
        path = "/",
        domain = "example.com",
        expires = new Date(Date.now() + 360000000)
    } = {
        secure : false,
        path : "/",
        domain : "example.com",
        expires : new Date(Date.now() + 360000000)        
    }
) {
    // ...
}</pre>
</div>

&emsp;&emsp;现在函数变得更加完整了，第一个对象字面量是解构参数，第二个为默认值。但是这会造成非常多的代码冗余，可以将默认值提取到一个独立对象中，并且使用该对象作为解构和默认参数的一部分，从而消除这些冗余

<div>
<pre>const setCookieDefaults = {
    secure : false,
    path : "/",
    domain : "example.com",
    expires : new Date(Date.now() + 360000000)    
}
function setCookie(name, value,{
        secure = setCookieDefaults.secure,
        path = setCookieDefaults.path,
        domain = setCookieDefaults.domain,
        expires = setCookieDefaults.expires        
    }=setCookieDefaults) {
    // ...
}</pre>
</div>

&emsp;&emsp;在这段代码中，默认值已经被放到setCookieDefaults对象中，除了作为默认参数值外，在解构参数中可以直接使用这个对象来为每一个绑定设置默认参数。使用解构参数后，不得不面对处理默认参数的复杂逻辑，但它也有好的一面，如果要改变默认值，可以立即在setCookieDefaults中修改，改变的数据将自动同步到所有出现过的地方

&nbsp;

### 其他解构

【字符串解构】

&emsp;&emsp;字符串也可以解构赋值。这是因为，字符串被转换成了一个类似数组的对象

<div>
<pre>const [a, b, c, d, e] = 'hello';
console.log(a);//"h"
console.log(b);//"e"
console.log(c);//"l"
console.log(d);//"l"
console.log(e);//"o"</pre>
</div>

&emsp;&emsp;类似数组的对象都有一个`length`属性，因此还可以对这个属性解构赋值

<div>
<pre>const {length} = 'hello';
console.log(length);//5</pre>
</div>

【数值和布尔值解构】

&emsp;&emsp;解构赋值时，如果等号右边是数值和布尔值，则会先转为对象

<div>
<pre>let {toString:s1} = 123;
console.log(s1 === Number.prototype.toString);//true
let {toString:s2} = true;
console.log(s2 === Boolean.prototype.toString);//true</pre>
</div>

&emsp;&emsp;解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于`undefined`和`null`无法转为对象，所以对它们进行解构赋值，都会报错

<div>
<pre>let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError</pre>
</div>

