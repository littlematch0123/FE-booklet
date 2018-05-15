# ES6模板字面量

&emsp;&emsp;JS 的字符串相对其他语言来说功能总是有限的，事实上，ES5中一直缺乏许多特性，如多行字符串、字符串格式化、HTML转义等。ES6通过模板字面量的方式进行了填补，模板字面量试着跳出JS已有的字符串体系，通过一些全新的方法来解决类似的问题。本文将详细介绍ES6模板字面量

&nbsp;

### 基本用法

&emsp;&emsp;模板字面量是增强版的字符串，它用反引号（`）标识

```
let message = `Hello world!`;
console.log(message); // "Hello world!"
console.log(typeof message); // "string"
console.log(message.length); // 12
```

&emsp;&emsp;以上代码中，使用模板字面量语法创建一个字符串，并赋值给message变量，这时变量的值与一个普通的字符串无异

&emsp;&emsp;如果想在字符串中包含反引号，只需使用反斜杠（ \ ）转义即可

```
let message = `\`Hello\` world!`;
console.log(message); // "`Hello` world!"
console.log(typeof message); // "string"
console.log(message.length); // 14
```

&nbsp;

### 多行字符串

&emsp;&emsp;自javascript诞生起，开发者们就一直在寻找一种能创建多行字符串的方法。如果使用双引号或单引号，字符串一定要在同一行才行

【反斜杠】

&emsp;&emsp;由于javascript长期以来一直存在一个语法bug，在换行之前的反斜线（ \ ）可以承接下一行的代码，于是可以利用这个bug来创建多行字符串

```
var message = "Multiline \
string";
console.log(message); // "Multiline string"
```

&emsp;&emsp;message 字符串打印输出时不会有换行，因为反斜线被视为延续符号而不是新行的符号。为了在输出中显示换行，需要手动加入换行符

```
var message = "Multiline \n\
string";
// "Multiline 
// string"
console.log(message); 
```

&emsp;&emsp;在所有主流的 JS 引擎中，此代码都会输出两行，但是该行为被认定为一个 bug ，并且许多开发者都建议应避免这么做

&emsp;&emsp;在ES6之前，通常都依靠数组或字符串的拼接来创建多行字符串

```
var message = ["Multiline ","string"].join("\n");
let message = "Multiline \n" +"string";
```

&emsp;&emsp;JS一直以来都不支持多行字符串，开发者的种种解决方法都不够完美

【反引号】

&emsp;&emsp;ES6 的模板字面量使多行字符串更易创建，因为它不需要特殊的语法，只需在想要的位置直接换行即可，此处的换行会同步出现在结果中

```
let message = `Multiline
string`;
// "Multiline
// string"
console.log(message); 
console.log(message.length); // 16
```

&emsp;&emsp;在反引号之内的所有空白符都是字符串的一部分，因此需要特别留意缩进

```
let message = `Multiline
                             string`;
// "Multiline
                            // string"
console.log(message); 
console.log(message.length); //24
```

&emsp;&emsp;以上代码中，模板字面量第二行前面的所有空白符都被视为字符串自身的一部分

&emsp;&emsp;如果一定要通过适当的缩进来对齐文本，可以考虑在多行模板字面量的第一行空置并在后面的几行缩进

```
let html = `
&lt;div&gt;
    &lt;h1&gt;Title&lt;/h1&gt;
&lt;/div&gt;`.trim();
```

&emsp;&emsp;以上代码中，模板字面量的第一行没有任何文本，第二行才有内容。 HTML标签的缩进增强了可读性，之后再调用trim()方法移除了起始的空行

&emsp;&emsp;当然，也可以在模板字面量中使用 \n 来指示换行的插入位置

```
let message = `Multiline\nstring`;
// "Multiline
// string" 
console.log(message); 
console.log(message.length); // 16
```

&nbsp;

### 变量占位符

&emsp;&emsp;模板字面量看上去仅仅是普通JS字符串的升级版，但二者之间真正的区别在于模板字面量的变量占位符。变量占位符允许将任何有效的JS表达式嵌入到模板字面量中，并将其结果输出为字符串的一部分

&emsp;&emsp;变量占位符由起始的&nbsp;${&nbsp;与结束的 } 来界定，之间允许放入任意的 JS 表达式。最简单的变量占位符允许将本地变量直接嵌入到结果字符串中

```
let name = "Nicholas",
message = `Hello, ${name}.`;
console.log(message); // "Hello, Nicholas."
```

&emsp;&emsp;占位符&nbsp;${name} 会访问本地变量 name ，并将其值插入到 message 字符串中。 message变量会立即保留该占位符的结果

&emsp;&emsp;既然占位符是JS表达式，那么可替换的就不仅仅是简单的变量名。可以轻易嵌入运算符、函数调用等

```
let count = 10,
price = 0.25,
message = `${count} items cost $${(count * price).toFixed(2)}.`;
console.log(message); // "10 items cost $2.50."
```
```
function fn() {
  return "Hello World";
}

`foo ${fn()} bar`
// foo Hello World bar
```

&emsp;&emsp;模板字面量本身也是 JS 表达式，因此可以将模板字面量嵌入到另一个模板字面量内部

```
let name = "Nicholas",
    message = `Hello, ${
        `my name is ${ name }`
    }.`;
console.log(message); // "Hello, my name is Nicholas."
```

&nbsp;

### 标签模板

&emsp;&emsp;模板字面量真正的威力来自于标签模板，每个模板标签都可以执行模板字面量上的转换并返回最终的字符串值。标签指的是在模板字面量第一个反引号'`'前方标注的字符串

```
let message = tag`Hello world`;
```

&emsp;&emsp;在这个示例中， tag 就是应用到 `Hello world` 模板字面量上的模板标签

【定义标签】

&emsp;&emsp;标签可以是一个函数，调用时传入加工过的模板字面量各部分数据，但必须结合每个部分来创建结果。第一个参数是一个数组，包含Javascript解释过后的字面量字符串，它之后的所有参数都是每一个占位符的解释值

&emsp;&emsp;标签函数通常使用不定参数特性来定义占位符，从而简化数据处理的过程

```
function tag(literals, ...substitutions) {
  // 返回一个字符串
}
```

&emsp;&emsp;为了进一步理解传递给tag函数的参数，查看以下代码

```
let count = 10,
price = 0.25,
message = passthru`${count} items cost $${(count * price).toFixed(2)}.`;
```

&emsp;&emsp;如果有一个名为passthru()的函数，那么作为一个模板字面量标签，它会接受3个参数首先是一个literals数组，包含以下元素

&emsp;&emsp;1、第一个占位符前的空字符串("")

&emsp;&emsp;2、第一、二个占位符之间的字符串(" items cost $")

&emsp;&emsp;3、第二个占位符后的字符串(".")

&emsp;&emsp;下一个参数是变量count的解释值，传参为10，它也成为了substitutions数组里的第一个元素

&emsp;&emsp;最后一个参数是(count*price).toFixed(2)的解释值，传参为2.50，它是substitutions数组里的第二个元素

&emsp;&emsp;注意:literals里的第一个元素是一个空字符串，这确保了literals[0]总是字符串的始端，就像literals[literals.length-1]总是字符串的结尾一样。substitutions的数量总比literals少一个，这也意味着表达式substitutions. Iength === literals. Iength-1的结果总为true

```
var a = 5;
var b = 10;

tag`Hello ${ a + b } world ${ a * b }`;
// 等同于
tag(['Hello ', ' world ', ''], 15, 50);
```

&emsp;&emsp;通过这种模式，我们可以将literals和substitutions两个数组交织在一起重组结果字符串。先取出literals中的首个元素，再取出substitution中的首个元素，然后交替继续取出每一个元素，直到字符串拼接完成。于是可以通过从两个数组中交替取值的方式模拟模板字面量的默认行为

```
function passthru(literals, ...substitutions) {
    let result = "";
    // 仅使用 substitution 的元素数量来进行循环
    for (let i = 0; i &lt; substitutions.length; i++) {
        result += literals[i];
        result += substitutions[i];
    }
    // 添加最后一个字面量
    result += literals[literals.length - 1];
    return result;
}
let count = 10,
price = 0.25,
message = passthru`${count} items cost $${(count * price).toFixed(2)}.`;
console.log(message); // "10 items cost $2.50."
```

&emsp;&emsp;这个示例定义了一个passthru标签，模拟模板字面量的默认行为，展示了一次转换过程。此处的小窍门是使用substitutions.length来为循环计数

【应用】

&emsp;&emsp;&ldquo;标签模板&rdquo;的一个重要应用，就是过滤HTML字符串，防止用户输入恶意内容

```
var message =
  SaferHTML`&lt;p&gt;${sender} has sent you a message.&lt;/p&gt;`;
function SaferHTML(templateData) {
  var s = templateData[0];
  for (var i = 1; i &lt; arguments.length; i++) {
    var arg = String(arguments[i]);
    // Escape special characters in the substitution.
    s += arg.replace(/&amp;/g, "&amp;amp;")
            .replace(/&lt;/g, "&amp;lt;")
            .replace(/&gt;/g, "&amp;gt;");
    // Don't escape special characters in the template.
    s += templateData[i];
  }
  return s;
}
```

&emsp;&emsp;上面代码中，`sender`变量往往是用户提供的，经过`SaferHTML`函数处理，里面的特殊字符都会被转义

```
var sender = '&lt;script&gt;alert("abc")&lt;/script&gt;'; // 恶意代码
var message = SaferHTML`&lt;p&gt;${sender} has sent you a message.&lt;/p&gt;`;

console.log(message);// &lt;p&gt;&amp;lt;script&amp;gt;alert("abc")&amp;lt;/script&amp;gt; has sent you a message.&lt;/p&gt;
```

&emsp;&emsp;标签模板的另一个应用，就是多语言转换（国际化处理）

```
i18n`Welcome to ${siteName}, you are visitor number ${visitorNumber}!`
// "欢迎访问xxx，您是第xxxx位访问者！"
```

&emsp;&emsp;模板字符串本身并不能取代模板引擎，因为没有条件判断和循环处理功能，但是通过标签函数，可以自己添加这些功能

```
// 下面的hashTemplate函数
// 是一个自定义的模板处理函数
var libraryHtml = hashTemplate`
  &lt;ul&gt;
    #for book in ${myBooks}
      &lt;li&gt;&lt;i&gt;#{book.title}&lt;/i&gt; by #{book.author}&lt;/li&gt;
    #end
  &lt;/ul&gt;
`;
```

&nbsp;

### raw()

&emsp;&emsp;`String.raw`方法，往往用来充当模板字面量的处理函数，返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，对应于替换变量后的模板字面量

```
let message1 = `Multiline\nstring`,
message2 = String.raw`Multiline\nstring`;
console.log(message1); // "Multiline
// string"
console.log(message2); // "Multiline\\nstring"
```
```
String.raw`Hi\n${2+3}!`;
// "Hi\\n5!"

String.raw`Hi\u000A!`;
// 'Hi\\u000A!'
```

&emsp;&emsp;如果原字符串的斜杠已经转义，那么`String.raw`不会做任何处理

```
String.raw`Hi\\n`// "Hi\\n"
```

&emsp;&emsp;`String.raw`方法可以作为处理模板字面量的基本方法，它会将所有变量替换，而且对斜杠进行转义，方便下一步作为字符串来使用。

&emsp;&emsp;`String.raw`方法也可以作为正常的函数使用。这时，它的第一个参数，应该是一个具有`raw`属性的对象，且`raw`属性的值应该是一个数组

```
String.raw({ raw: 'test' }, 0, 1, 2);// 't0e1s2t'

// 等同于
String.raw({ raw: ['t','e','s','t'] }, 0, 1, 2);
```

