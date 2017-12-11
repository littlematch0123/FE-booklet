# ES6关于Unicode的相关扩展

　　JS中的字符串类型是由引号括起来的一组由16位Unicode字符组成的字符序列。在过去，16位足以包含任何字符，直到Unicode引入了扩展字符集，编码规则不得不进行变更。本文将详细介绍ES6关于Unicode的相关扩展

&nbsp;

### 概述

　　Unicode的目标是为世界上每一个字符提供唯一标识符，唯一标识符称为码位或码点(code point)。而这些码位是用于表示字符的，又称为字符编码(character encode)&nbsp;

　　在ES6之前， JS 的字符串以 16 位字符编码(UTF-16)为基础。每个 16 位序列(相当于2个字节)是一个编码单元(code unit)，可简称为码元，用于表示一个字符。字符串所有的属性与方法(如length属性与charAt() 方法等)都是基于16位序列

【BMP】

　　最常用的Unicode字符使用16位序列编码字符，属于&ldquo;基本多语种平面&rdquo;(Basic Multilingual Plane BMP)，也称为&ldquo;零断面&rdquo;(plan 0)， 是Unicode中的一个编码区段，编码介于U+0000&mdash;&mdash;U+FFFF之间。超过这个范围的码位则要归属于某个辅助平面或称为扩展平面(supplementary plane)，其中的码位仅用16位就无法表示了

　　为此，UTF-16引入了代理对(surrogate pairs)，规定用两个16位编码来表示一个码位。这意味着，字符串里的字符有两种：一种由一个码元（共 16 位）来表示BMP字符，另一种用两个码元（共 32 位）来表示辅助平面字符

&nbsp;

### 大括号表示

　　JavaScript 允许采用`\uxxxx`形式表示一个字符，其中`xxxx`表示字符的 Unicode 码位

<div class="cnblogs_code">
<pre>// "a"
console.log("\u0061");</pre>
</div>

　　但是，这种表示法只限于码位在`\u0000`~`\uFFFF`之间的字符。超出这个范围的字符，必须用两个双字节的形式表示

<div class="cnblogs_code">
<pre>// "𠮷"
console.log("\uD842\uDFB7");

// "₻7"
console.log("\u20BB7");</pre>
</div>

　　上面代码表示，如果直接在`\u`后面跟上超过`0xFFFF`的数值（比如`\u20BB7`），JavaScript会理解成`\u20BB+7`。所以会显示一个特殊字符，后面跟着一个`7`

　　ES6 对这一点做出了改进，只要将码位放入大括号，就能正确解读该字符

<div class="cnblogs_code">
<pre>// "𠮷"
console.log("\u{20BB7}");

// "ABC"
console.log("\u{41}\u{42}\u{43}");

let hello = 123;
// 123
console.log(hell\u{6F}); 

// true
console.log('\u{1F680}' === '\uD83D\uDE80');</pre>
</div>

　　上面代码中，最后一个例子表明，大括号表示法与四字节的 UTF-16 编码是等价的。

　　有了这种表示法之后，JavaScript 共有6种方法可以表示一个字符

<div class="cnblogs_code">
<pre>'\z' === 'z'  // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' // true</pre>
</div>

&nbsp;

### 字符编解码

【codePointAt()】

　　ES6新增了完全支持UTF-16的方法codePointAt()，该方法接受编码单元的位置而非字符位置作为参数，返回与字符串中给定位置对应的码位，即一个整数值

<div class="cnblogs_code">
<pre>var text = "𠮷a" ;

console.log(text.charCodeAt(0)); // 55362
console.log(text.charCodeAt(1)); // 57271
console.log(text.charCodeAt(2)); // 97

console.log(text.codePointAt(0)); // 134071
console.log(text.codePointAt(1)); // 57271
console.log(text.codePointAt(2)); // 97
</pre>
</div>

　　对于BMP字符，codePointAt()方法的返回值与 charCodeAt() 相同，如'a'，都返回97

　　对于辅助平面的32位字符，如'𠮷'，charCodeAt()和codePointAt()方法都分为两部分返回

　　charCodeAt(0)和chatCodeAt(1)分别返回前16位和后16位的编码；而codePointAt(0)和codePointAt(1)分别返回32位编码及后16位的编码　

　　判断一个字符是否是BMP，对该字符调用 codePointAt() 方法就是最简单的方法

<div class="cnblogs_code">
<pre>function is32Bit(c) {
    return c.codePointAt(0) &gt; 0xFFFF;
}
console.log(is32Bit("𠮷" )); // true 
console.log(is32Bit("a")); // false</pre>
</div>

　　16位字符的上边界用十六进制表示就是FFFF ，因此任何大于该数字的码位必须用两个码元(共32位)表示

【String.fromCodePoint()】

　　ES5提供的`String.fromCharCode`方法，用于从码位返回对应字符，但是这个方法不能识别32位的UTF-16字符

　　ECMAScript通常会提供正反两种方法。可以使用codePointAt() 来提取字符串内中某个字符的码位，也可以借助String.fromCodePoint()根据给定的码位来生成一个字符

<div class="cnblogs_code">
<pre>console.log(String.fromCharCode(0x20bb7)); // "ஷ"
console.log(String.fromCodePoint(0x20bb7)); // "𠮷"
console.log(String.fromCharCode(0x0bb7)); // "ஷ"</pre>
</div>

　　上面代码中，`String.fromCharCode`不能识别大于`0xFFFF`的码位，所以`0x20BB7`就发生了溢出，最高位`2`被舍弃了，最后返回码位`U+0BB7`对应的字符，而不是码位`U+20BB7`对应的字符

　　如果`String.fromCodePoint()`方法有多个参数，则它们会被合并成一个字符串返回

<div class="cnblogs_code">
<pre>// true
String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y'</pre>
</div>

　　可以将 String.fromCodePoint() 视为 String.fromCharCode() 的完善版本。两者处理 BMP 字符时会返回相同结果，只有处理 BMP 范围之外的字符时才会有差异

&nbsp;

### for...of

　　对于32位的辅助平面字符来说，使用for或for in循环，可能得不到正确的结果

<div class="cnblogs_code">
<pre>var s = '𠮷a';
for (let ch in s) {
  console.log(s[ch]);
}
//�
//�
//a</pre>
</div>

　　而for...of循环可以正确的识别32位的UTF-16字符

<div class="cnblogs_code">
<pre>var s = '𠮷a';
for (let ch of s) {
  console.log(ch);
}
//𠮷
//a</pre>
</div>

&nbsp;

### normalize()

　　许多欧洲语言有语调符号和重音符号。为了表示它们，Unicode提供了两种方法。一种是直接提供带重音符号的字符，比如`Ǒ`(\u01D1)。另一种是提供合成符号(combining character)，即原字符与重音符号的合成，两个字符合成一个字符，比如`O`(\u004F)和`ˇ`(\u030C)合成`Ǒ`(\u004F\u030C)

　　这两种表示方法，在视觉和语义上都等价，但是JavaScript不能识别

<div class="cnblogs_code">
<pre>console.log('\u01D1'==='\u004F\u030C'); //false

console.log('\u01D1'.length); // 1
console.log('\u004F\u030C'.length); // 2</pre>
</div>

　　上面代码表示，JavaScript将合成字符视为两个字符，导致两种表示方法不相等。

　　ES6提供字符串实例的`normalize()`方法，用来将字符的不同表示方法统一为同样的形式，这称为Unicode正规化

<div class="cnblogs_code">
<pre>console.log('\u01D1'==='\u01D1'.normalize()); //true
console.log('\u01D1'=== '\u004F\u030C'.normalize()); //true</pre>
</div>

`　　normalize`方法可以接受一个参数来指定`normalize`的方式，参数的四个可选值如下

　　1、NFC，默认参数，表示&ldquo;标准等价合成&rdquo;（Normalization Form Canonical Composition），返回多个简单字符的合成字符。所谓&ldquo;标准等价&rdquo;指的是视觉和语义上的等价

<div class="cnblogs_code">
<pre>console.log('\u01D1'==='\u01D1'.normalize("NFC")); //true
console.log('\u01D1'=== '\u004F\u030C'.normalize("NFC")); //true</pre>
</div>

　　2、NFD，表示&ldquo;标准等价分解&rdquo;（Normalization Form Canonical Decomposition），即在标准等价的前提下，返回合成字符分解的多个简单字符

<div class="cnblogs_code">
<pre>console.log('\u004F\u030C'==='\u01D1'.normalize("NFD")); //true
console.log('\u004F\u030C'=== '\u004F\u030C'.normalize("NFD")); //true</pre>
</div>

　　3、NFKC，表示&ldquo;兼容等价合成&rdquo;（Normalization Form Compatibility Composition），返回合成字符。所谓&ldquo;兼容等价&rdquo;指的是语义上存在等价，但视觉上不等价，比如&ldquo;囍&rdquo;和&ldquo;喜喜&rdquo;。（这只是用来举例，normalize方法不能识别中文。）

　　4、NFKD，表示&ldquo;兼容等价分解&rdquo;（Normalization Form Compatibility Decomposition），即在兼容等价的前提下，返回合成字符分解的多个简单字符

　　在开发国际化应用时，normalize() 方法非常有用。但`normalize()`方法目前不能识别三个或三个以上字符的合成。这种情况下，还是只能使用正则表达式，通过Unicode编号区间判断

&nbsp;

### U修饰符

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

