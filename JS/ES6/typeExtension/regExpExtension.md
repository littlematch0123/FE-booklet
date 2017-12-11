# ES6正则表达式扩展

　　正则表达式是javascript操作字符串的一个重要组成部分，但在以往的版本中并未有太多改变。然而，在ES6中，随着字符串操作的变更， ES6也对正则表达式进行了一些更新。本文将详细介绍ES6正则表达式扩展

&nbsp;

### 构造函数

　　在 ES5 中，`RegExp`构造函数的参数有两种情况。

　　第一种情况是，参数是字符串，这时第二个参数表示正则表达式的修饰符（flag）

<div class="cnblogs_code">
<pre>var regex = new RegExp('xyz', 'i');
// 等价于
var regex = /xyz/i;</pre>
</div>

　　第二种情况是，参数是一个正则表示式，这时会返回一个原有正则表达式的拷贝

<div class="cnblogs_code">
<pre>var regex = new RegExp(/xyz/i);
// 等价于
var regex = /xyz/i;</pre>
</div>

　　但是，ES5 不允许此时使用第二个参数添加修饰符，否则会报错

<div class="cnblogs_code">
<pre>// Uncaught TypeError: Cannot supply flags when constructing one RegExp from another
var regex = new RegExp(/xyz/, 'i');</pre>
</div>

　　ES6 改变了这种行为。如果`RegExp`构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符。而且，返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符

<div class="cnblogs_code">
<pre>console.log(new RegExp(/abc/ig, 'i').flags);//i</pre>
</div>

　　上面代码中，原有正则对象的修饰符是`ig`，它会被第二个参数`i`覆盖

【flags】

　　ES6 为正则表达式新增了`flags`属性，会返回正则表达式的修饰符

<div class="cnblogs_code">
<pre>//ES5的source属性返回正则表达式的正文
/abc/ig.source//"abc"

// ES6的flags属性返回正则表达式的修饰符
/abc/ig.flags//'gi'</pre>
</div>

&nbsp;

### 正则方法

　　字符串对象共有4个方法，可以使用正则表达式：`match()`、`replace()`、`search()`和`split()`

　　ES6 将这4个方法，在语言内部全部调用`RegExp`的实例方法，从而做到所有与正则相关的方法，全都定义在`RegExp`对象上

<div class="cnblogs_code">
<pre>String.prototype.match 调用 RegExp.prototype[Symbol.match]
String.prototype.replace 调用 RegExp.prototype[Symbol.replace]
String.prototype.search 调用 RegExp.prototype[Symbol.search]
String.prototype.split 调用 RegExp.prototype[Symbol.split]</pre>
</div>

&nbsp;

### u修饰符

　　正则表达式可以完成简单的字符串操作，但默认将字符串中的每一个字符按照16位编码处理。为了解决这个问题，&nbsp;ES6 对正则表达式添加了`u`修饰符，含义为&ldquo;Unicode模式&rdquo;，用来正确处理大于`\uFFFF`的 Unicode 字符。也就是说，会正确处理四个字节的 UTF-16 编码

<div class="cnblogs_code">
<pre>/^\uD83D/u.test('\uD83D\uDC2A') // false
/^\uD83D/.test('\uD83D\uDC2A') // true</pre>
</div>

　　一旦为正则表达式设置了 u 修饰符，正则表达式将会识别32位的辅助平面字符为1个字符，而不是两个

【点号】

　　点（`.`）字符在正则表达式中，含义是除了换行符以外的任意单个字符。对于码位大于`0xFFFF`的 Unicode 字符，点字符不能识别，必须加上`u`修饰符

<div class="cnblogs_code">
<pre>var text = "𠮷" ;
console.log(text.length); // 2
console.log(/^.$/.test(text));//false
console.log(/^.$/u.test(text)); //true</pre>
</div>

【大括号】

　　ES6 新增了使用大括号表示 Unicode 字符，这种表示法在正则表达式中必须加上`u`修饰符，才能识别当中的大括号，否则会被解读为量词

<div class="cnblogs_code">
<pre>/\u{61}/.test('a') // false
/\u{61}/u.test('a') // true
/\u{20BB7}/u.test('𠮷') // true</pre>
</div>

【量词】

　　使用`u`修饰符后，所有量词都会正确识别码点大于`0xFFFF`的 Unicode 字符

<div class="cnblogs_code">
<pre>/a{2}/.test('aa') // true
/a{2}/u.test('aa') // true
/𠮷{2}/.test('𠮷𠮷') // false
/𠮷{2}/u.test('𠮷𠮷') // true</pre>
</div>

【预定义模式】

　　`u`修饰符也影响到预定义模式，能否正确识别码点大于`0xFFFF`的 Unicode 字符

<div class="cnblogs_code">
<pre>/^\S$/.test('𠮷') // false
/^\S$/u.test('𠮷') // true</pre>
</div>

【字符串长度】

　　上面代码的`\S`是预定义模式，匹配所有不是空格的字符。只有加了`u`修饰符，它才能正确匹配码点大于`0xFFFF`的 Unicode 字符

　　虽然ES6不支持字符串码位数量的检测，length属性仍然返回字符串编码单元的数量。利用[\s\S]，再加上u修饰符，就可以写出一个正确返回字符串长度的函数

<div class="cnblogs_code">
<pre>function codePointLength(text) {
  var result = text.match(/[\s\S]/gu);
  return result ? result.length : 0;
}

var s = '𠮷𠮷';

console.log(s.length); // 4
console.log(codePointLength(s)); // 2</pre>
</div>

【检测支持】

　　u修饰符是语法层面的变更，尝试在不兼容 ES6 的 JS 引擎中使用它会抛出语法错误。如果要检测当前引擎是否支持u修饰符，最安全的方式是通过以下函数来判断

<div class="cnblogs_code">
<pre>function hasRegExpU() {
    try {
        var pattern = new RegExp(".", "u");
        return true;
    } catch (ex) {
        return false;
    }
}</pre>
</div>

　　这个函数使用了RegExp构造函数并传入字符串'u'作为参数，该语法即使在旧版 JS 引擎中也是有效的。但是，如果当前引擎不支持u修饰符则会抛出错误

&nbsp;

### y修饰符

　　除了`u`修饰符，ES6 还为正则表达式添加了`y`修饰符，叫做&ldquo;粘连&rdquo;（sticky）修饰符

　　`y`修饰符的作用与`g`修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。不同之处在于，`g`修饰符只要剩余位置中存在匹配就可，而`y`修饰符确保匹配必须从剩余的第一个位置开始，这也就是&ldquo;粘连&rdquo;的涵义

【全局匹配】

`　　y`修饰符的设计本意，就是让头部匹配的标志`^`在全局匹配中都有效

<div class="cnblogs_code">
<pre>var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;

console.log(r1.exec(s)); // ["aaa"]
console.log(r2.exec(s)); // ["aaa"]

console.log(r1.exec(s)); // ["aa"]
console.log(r2.exec(s)); // null</pre>
</div>

　　上面代码有两个正则表达式，一个使用`g`修饰符，另一个使用`y`修饰符。这两个正则表达式各执行了两次，第一次执行的时候，两者行为相同，剩余字符串都是`_aa_a`。由于`g`修饰没有位置要求，所以第二次执行会返回结果，而`y`修饰符要求匹配必须从头部开始，所以返回`null`。

　　如果改一下正则表达式，保证每次都能头部匹配，`y`修饰符就会返回结果了

<div class="cnblogs_code">
<pre>var s = 'aaa_aa_a';
var r = /a+_/y;

console.log(r.exec(s)); // ["aaa_"]
console.log(r.exec(s)); // ["aa_"]</pre>
</div>

　　上面代码每次匹配，都是从剩余字符串的头部开始

【非全局匹配】

　　单单一个`y`修饰符使用`match`方法，只能返回第一个匹配，必须与`g`修饰符联用，才能返回所有匹配

<div class="cnblogs_code">
<pre>'a1a2a3'.match(/a\d/y) // ["a1"]
'a1a2a3'.match(/a\d/gy) // ["a1", "a2", "a3"]</pre>
</div>

　　[注意]y修饰符只有在调用 exec()和test()这两个正则匹配方法时，才会进行全局匹配；如果调用match()、replace()等字符串的方法时，不会进行全局匹配

【stiky属性】

　　与`y`修饰符相匹配，ES6 的正则对象多了`sticky`属性，表示是否设置了`y`修饰符

<div class="cnblogs_code">
<pre>var r = /hello\d/y;
r.sticky // true</pre>
</div>

【应用】

`　　y`修饰符的一个应用，是从字符串提取 token（词元），`y`修饰符确保了匹配之间不会有漏掉的字符

<div class="cnblogs_code">
<pre>const TOKEN_Y = /\s*(\+|[0-9]+)\s*/y;
const TOKEN_G  = /\s*(\+|[0-9]+)\s*/g;

tokenize(TOKEN_Y, '3 + 4')// [ '3', '+', '4' ]
tokenize(TOKEN_G, '3 + 4')// [ '3', '+', '4' ]

function tokenize(TOKEN_REGEX, str) {
  let result = [];
  let match;
  while (match = TOKEN_REGEX.exec(str)) {
    result.push(match[1]);
  }
  return result;
}</pre>
</div>

　　上面代码中，如果字符串里面没有非法字符，`y`修饰符与`g`修饰符的提取结果是一样的。但是，一旦出现非法字符，两者的行为就不一样了

<div class="cnblogs_code">
<pre>tokenize(TOKEN_Y, '3x + 4')
// [ '3' ]
tokenize(TOKEN_G, '3x + 4')
// [ '3', '+', '4' ]</pre>
</div>

　　上面代码中，`g`修饰符会忽略非法字符，而`y`修饰符不会，这样就很容易发现错误

【检测支持】

　　y修饰符与u修饰符类似，它也是一个语法层面的变更，尝试在不兼容 ES6 的 JS 引擎中使用它会抛出语法错误。如果要检测当前引擎是否支持y修饰符，可以通过以下函数来检测

<div class="cnblogs_code">
<pre>function hasRegExpY() {
    try {
        var pattern = new RegExp(".", "y");
        return true;
    } catch (ex) {
        return false;
    }
}</pre>
</div>

　　这个函数使用了RegExp构造函数并传入字符串'y'作为参数，该语法即使在旧版 JS 引擎中也是有效的。但是，如果当前引擎不支持y修饰符则会抛出错误

