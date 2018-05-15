# ES6字符串扩展

&emsp;&emsp;字符串是编程中重要的数据类型，只有熟练掌握字符串操作才能更高效地开发程序。JS字符串的特性总是落后于其它语言，例如，直到 ES5 中字符串才获得了 trim() 方法。而 ES6 则继续添加新功能以扩展 JS 解析字符串的能力。本文将详细介绍ES6中字符串扩展

&nbsp;

### 子串识别

&emsp;&emsp;自从 JS 引入了 indexOf() 方法，开发者们就使用它来识别字符串是否存在于其它字符串中。ES6 包含了以下三个方法来满足这类需求：includes()、startsWith()、endsWith()

【includes()】

&emsp;&emsp;该方法在给定文本存在于字符串中的任意位置时会返回 true ，否则返回false

【startsWith()】

&emsp;&emsp;该方法在给定文本出现在字符串起始处时返回 true ，否则返回 false

【endsWith()】

&emsp;&emsp;该方法在给定文本出现在字符串结尾处时返回 true ，否则返回 false&nbsp;

&emsp;&emsp;以上每个方法都接受两个参数：需要搜索的文本，以及可选的搜索起始位置索引

&emsp;&emsp;当提供了第二个参数(假设为n)时， includes() 与 startsWith() 方法会从该索引位置(n)开始尝试匹配；而endsWith() 方法则从字符串长度减去这个索引值的位置开始尝试匹配

&emsp;&emsp;当第二个参数未提供时， includes() 与 startsWith() 方法会从字符串起始处开始查找，而 endsWith() 方法则从尾部开始。实际上，第二个参数减少了搜索字符串的次数

```
var msg = "Hello world!";
console.log(msg.startsWith("Hello")); // true
console.log(msg.endsWith("!")); // true
console.log(msg.includes("o")); // true

console.log(msg.startsWith("o")); // false
console.log(msg.endsWith("world!")); // true
console.log(msg.includes("x")); // false

console.log(msg.startsWith("o", 4)); // true
console.log(msg.endsWith("o", 5)); // true
console.log(msg.includes("o", 8)); // false
```

&emsp;&emsp;虽然这三个方法使得判断子字符串是否存在变得更容易，但它们只返回了一个布尔值。若需要找到它们在字符串中的确切位置，则需要使用 [indexOf()](http://www.cnblogs.com/xiaohuochai/p/5612962.html#anchor7) 和 lastIndexOf()&nbsp;

&emsp;&emsp;注意:如果向 startsWith() 、 endsWith() 或 includes() 方法传入了正则表达式而不是字符串，会抛出错误。而对于indexOf()和lastIndexOf()这两个方法，它们会将正则表达式转换为字符串并搜索它

&nbsp;

### 字符串重复

【repeat()】

&emsp;&emsp;ES6为字符串添加了一个 repeat() 方法，它接受一个参数作为字符串的重复次数，返回一个将初始字符串重复指定次数的新字符串

```
console.log("x".repeat(3)); // "xxx"
console.log("hello".repeat(2)); // "hellohello"
console.log("abc".repeat(4)); // "abcabcabcabc"
```

&emsp;&emsp;参数如果是小数，会被取整

```
console.log('na'.repeat(2.9)); // "nana"
```

&emsp;&emsp;如果`repeat`的参数是负数或者`Infinity`，会报错

```
//Uncaught RangeError: Invalid count value
console.log('na'.repeat(Infinity));
//Uncaught RangeError: Invalid count value
console.log('na'.repeat(-1));
```

&emsp;&emsp;如果参数是0到-1之间的小数，则等同于0，这是因为会先进行取整运算。0到-1之间的小数，取整以后等于`-0`，`repeat`视同为0

```
console.log('na'.repeat(-0.9)); // ""
```

&emsp;&emsp;参数`NaN`等同于0

```
console.log('na'.repeat(NaN)); // ""
```

&emsp;&emsp;如果`repeat`的参数是字符串，则会先转换成数字

```
console.log('na'.repeat('na')); // ""
console.log('na'.repeat('3'));  // "nanana"
```

【创建缩进级别】

&emsp;&emsp;此方法比相同目的的其余方法更加方便，在操纵文本时特别有用，尤其是在需要产生缩进的代码格式化工具中

```
// 缩进指定数量的空格
var indent = " ".repeat(4),
indentLevel = 0;
// 需要增加缩进时
var newIndent = indent.repeat(++indentLevel);
```

&emsp;&emsp;调用第一个repeat()方法创建了一个包含四个空格的字符串，indentLevel变量用来持续追踪缩进的级别。此后，可以通过增加indentLevel的值来调用repeat() 方法，从而改变空格数量

&nbsp;

### 字符串补全

&emsp;&emsp;ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全

【padStart()】

&emsp;&emsp;头部补全

【padEnd()】

&emsp;&emsp;尾部补全

&emsp;&emsp;`padStart()`和`padEnd()`一共接受两个参数，第一个参数用来指定字符串的最小长度，第二个参数是用来补全的字符串

```
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'
```

&emsp;&emsp;如果省略第二个参数，默认使用空格补全长度

```
'x'.padStart(4) // '   x'
'x'.padEnd(4) // 'x   '
```

&emsp;&emsp;如果原字符串的长度，等于或大于指定的最小长度，则返回原字符串

```
'xxx'.padStart(2, 'ab') // 'xxx'
'xxx'.padEnd(2, 'ab') // 'xxx'
```

&emsp;&emsp;如果用来补全的字符串与原字符串，两者的长度之和超过了指定的最小长度，则会截去超出位数的补全字符串

```
'abc'.padStart(10, '0123456789')// '0123456abc'
```

【应用】

&emsp;&emsp;`padStart`的常见用途是为数值补全指定位数。下面代码生成10位的数值字符串

```
'1'.padStart(10, '0') // "0000000001"
'12'.padStart(10, '0') // "0000000012"
'123456'.padStart(10, '0') // "0000123456"
```

&emsp;&emsp;另一个用途是提示字符串格式

```
'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
```

