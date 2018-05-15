# ES6数字扩展

&emsp;&emsp;本文将详细介绍ES6数字扩展

&nbsp;

### 指数运算符

&emsp;&emsp;ES2016引入的唯一一个JS语法变化是求幂运算符，它是一种将指数应用于基数的数学运算。JS已有的Math.pow()方法可以执行求幂运算，但它也是为数不多的需要通过方法而不是正式的运算符来进行求幂

&emsp;&emsp;求幂运算符是两个星号(**)左操作数是基数，右操作数是指数

```
let result = 5 ** 2;
console.log(result) // 25
console.log(result === Math.pow(5,2) ) // true
```

&emsp;&emsp;指数运算符可以与等号结合，形成一个新的赋值运算符（`**=`）

```
let a = 1.5;
a **= 2;
// 等同于 a = a * a;

let b = 4;
b **= 3;
// 等同于 b = b * b * b;
```

&emsp;&emsp;注意:在 V8 引擎中，指数运算符与`Math.pow`的实现不相同，对于特别大的运算结果，两者会有细微的差异

```
Math.pow(99, 99) // 3.697296376497263e+197

99 ** 99 // 3.697296376497268e+197
```

【运算顺序】

&emsp;&emsp;求幂运算符具有JS中所有二进制运算符的优先级(一元运算符的优先级高于**)，这意味着它首先应用于所有复合操作

```
let result = 2 * 5 ** 2
console.log(result) // 50
```

&emsp;&emsp;先计算5<sup>2</sup>，然后将得到的值乘以2，最终结果为50

【运算限制】

&emsp;&emsp;取幂运算符确实有其他运算符没有的一些不寻常的限制，它左侧的一元表达式只能使用++或--

```
//语法错误
let result =-5 ** 2
```

&emsp;&emsp;此示例中的-5的写法是一个语法错误，因为运算的顺序是不明确的。-是只适用于5呢，还是适用于表达式`5**2`的结果？禁用求幂运算符左侧的二元表达式可以消除歧义。要明确指明意图，需要用括号包裹-5或5**2

```
//可以包裹5**2
let result1 =-(5 ** 2) //-25

//也可以包裹-5
let result2 = (-5) ** 2 // 等于25
```

&emsp;&emsp;如果在表达式两端放置括号，则-将应用于整个表达式；如果在-5两端放置括号，则表明想计算-5的二次幕

&emsp;&emsp;在求幕运算符左侧无须用括号就可以使用++和--，因为这两个运算符都明确定义了作用于操作数的行为。前缀++或--会在其他所有操作发生之前更改操作数，而后缀版本直到整个表达式被计算过后才会进行改变。这两个用法在运算付左侧都是安全的

```
let num1 = 2,
    num2 = 2;
console.log(++num1 ** 2) // 9
console.log(num1) // 3
console.log(num2--** 2) // 4
console.log(num2) // 1
```

&emsp;&emsp;在这个示例中，num1在应用取幂运算符之前先加1，所以num1变为3，运算结果为9；而num2取幂运算的值保持为2，之后再减1

&nbsp;

### 不同进制

&emsp;&emsp;ES6 提供了二进制和八进制数值的新的写法，分别用前缀`0b`（或`0B`）和`0o`（或`0O`）表示

```
0b111110111 === 503 // true
0o767 === 503 // true
```

&emsp;&emsp;从 ES5 开始，在严格模式之中，八进制就不再允许使用前缀`0`表示，ES6 进一步明确，要使用前缀`0o`表示

```
// 非严格模式
(function(){
  console.log(0o11 === 011);
})() // true

// 严格模式
(function(){
  'use strict';
  console.log(0o11 === 011);
})() // Uncaught SyntaxError: Octal literals are not allowed in strict mode.
```

&emsp;&emsp;如果要将`0b`和`0o`前缀的字符串数值转为十进制，要使用`Number`方法

```
Number('0b111')  // 7
Number('0o10')  // 8
```

&nbsp;

### Number方法

&emsp;&emsp;ES6 在`Number`对象上，新提供了`Number.isFinite()`和`Number.isNaN()`两个方法

【`Number.isFinite()`】

&emsp;&emsp;`Number.isFinite()`用来检查一个数值是否为有限的（finite）

```
console.log( Number.isFinite(15)); // true
console.log( Number.isFinite(0.8)); // true
console.log( Number.isFinite(NaN)); // false
console.log( Number.isFinite(Infinity)); // false
console.log( Number.isFinite(-Infinity)); // false
console.log( Number.isFinite('foo')); // false
console.log( Number.isFinite('15')); // false
console.log( Number.isFinite(true)); // false
```

&emsp;&emsp;与原有的isFinite()方法的不同之处在于，Number.isFinite()方法没有隐式的Number()类型转换，对于非数值一律返回`false`

```
console.log(isFinite(15)); // true
console.log(isFinite(0.8)); // true
console.log(isFinite(NaN)); // false
console.log(isFinite(Infinity)); // false
console.log(isFinite(-Infinity)); // false
console.log(isFinite('foo')); // false
console.log(isFinite('15')); // true
console.log(isFinite(true)); // true
```

&emsp;&emsp;ES5 可以通过下面的代码，部署`Number.isFinite`方法

```
(function (global) {
  var global_isFinite = global.isFinite;

  Object.defineProperty(Number, 'isFinite', {
    value: function isFinite(value) {
      return typeof value === 'number' &amp;&amp; global_isFinite(value);
    },
    configurable: true,
    enumerable: false,
    writable: true
  });
})(this);
```

【`Number.isNaN()`】

&emsp;&emsp;`Number.isNaN()`用来检查一个值是否为`NaN`

```
console.log(Number.isNaN('true')); //false
console.log(Number.isNaN('hello')); //false
console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN(15)); // false
console.log(Number.isNaN('15')); // false
console.log(Number.isNaN(true)); // false
console.log(Number.isNaN('true'/0)); // true
```

&emsp;&emsp;与原有的isNaN()方法不同，不存在隐式的Number()类型转换，非`NaN`一律返回`false`

```
console.log(isNaN('true')); //true
console.log(isNaN('hello')); //true
console.log(isNaN(NaN)); // true
console.log(isNaN(15)); // false
console.log(isNaN('15')); // false
console.log(isNaN(true)); // false
console.log(isNaN('true'/0)); // true
```

&emsp;&emsp;ES6 将全局方法`parseInt()`和`parseFloat()`，移植到`Number`对象上面，行为完全保持不变

【parseInt()】

```
// ES5的写法
parseInt('12.34') // 12
parseFloat('123.45#') // 123.45

// ES6的写法
Number.parseInt('12.34') // 12
Number.parseFloat('123.45#') // 123.45
```

&emsp;&emsp;这样做的目的，是逐步减少全局性方法，使得语言逐步模块化

```
Number.parseInt === parseInt // true
Number.parseFloat === parseFloat // true
```

【`Number.isInteger()`】

&emsp;&emsp;`Number.isInteger()`用来判断一个值是否为整数。需要注意的是，在JS内部，整数和浮点数是同样的储存方法，所以3和3.0被视为同一个值

```
Number.isInteger(25) // true
Number.isInteger(25.0) // true
Number.isInteger(25.1) // false
Number.isInteger("15") // false
Number.isInteger(true) // false
```

&emsp;&emsp;ES5 可以通过下面的代码，部署`Number.isInteger()`

```
(function (global) {
  var floor = Math.floor,
    isFinite = global.isFinite;

  Object.defineProperty(Number, 'isInteger', {
    value: function isInteger(value) {
      return typeof value === 'number' &amp;&amp;
        isFinite(value) &amp;&amp;
        floor(value) === value;
    },
    configurable: true,
    enumerable: false,
    writable: true
  });
})(this);
```

&nbsp;

### Number常量

【Number.EPSILON】&nbsp;

&emsp;&emsp;ES6在Number对象上面，新增一个极小的常量`Number.EPSILON`

```
Number.EPSILON// 2.220446049250313e-16
Number.EPSILON.toFixed(20)// '0.00000000000000022204'
```

&emsp;&emsp;引入一个这么小的量的目的，在于为浮点数计算，设置一个误差范围

```
0.1 + 0.2// 0.30000000000000004

0.1 + 0.2 - 0.3// 5.551115123125783e-17

5.551115123125783e-17.toFixed(20)// '0.00000000000000005551'
```

&emsp;&emsp;但是如果这个误差能够小于`Number.EPSILON`，我们就可以认为得到了正确结果

```
5.551115123125783e-17 < Number.EPSILON // true
```

&emsp;&emsp;因此，`Number.EPSILON`的实质是一个可以接受的误差范围

```
function withinErrorMargin (left, right) {
  return Math.abs(left - right) < Number.EPSILON;
}
withinErrorMargin(0.1 + 0.2, 0.3)// true
withinErrorMargin(0.2 + 0.2, 0.3)// false
```

&emsp;&emsp;上面的代码为浮点数运算，部署了一个误差检查函数

【安全整数】

&emsp;&emsp;JS能够准确表示的整数范围在`-2^53`到`2^53`之间（不含两个端点），超过这个范围，无法精确表示这个值

```
Math.pow(2, 53) // 9007199254740992

9007199254740992  // 9007199254740992
9007199254740993  // 9007199254740992

Math.pow(2, 53) === Math.pow(2, 53) + 1 // true
```

&emsp;&emsp;上面代码中，超出2的53次方之后，一个数就不精确了

【Number.MAX_SAFE_INTEGER、Number.MIN_SAFE_INTEGER】

&emsp;&emsp;ES6引入了`Number.MAX_SAFE_INTEGER`和`Number.MIN_SAFE_INTEGER`这两个常量，用来表示这个范围的上下限

```
Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1 // true
Number.MAX_SAFE_INTEGER === 9007199254740991 // true

Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER // true
Number.MIN_SAFE_INTEGER === -9007199254740991 // true
```

&emsp;&emsp;上面代码中，可以看到JS能够精确表示的极限

【`Number.isSafeInteger()`】

&emsp;&emsp;`Number.isSafeInteger()`则是用来判断一个整数是否落在这个范围之内

```
Number.isSafeInteger('a') // false
Number.isSafeInteger(null) // false
Number.isSafeInteger(NaN) // false
Number.isSafeInteger(Infinity) // false
Number.isSafeInteger(-Infinity) // false

Number.isSafeInteger(3) // true
Number.isSafeInteger(1.2) // false
Number.isSafeInteger(9007199254740990) // true
Number.isSafeInteger(9007199254740992) // false

Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1) // false
Number.isSafeInteger(Number.MIN_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1) // false
```

&emsp;&emsp;这个函数的实现很简单，就是跟安全整数的两个边界值比较一下

```
Number.isSafeInteger = function (n) {
  return (typeof n === 'number' &amp;&amp;
    Math.round(n) === n &amp;&amp;
    Number.MIN_SAFE_INTEGER <= n &amp;&amp;
    n <= Number.MAX_SAFE_INTEGER);
}
```

&emsp;&emsp;实际使用这个函数时，需要注意验证运算结果是否落在安全整数的范围内，不要只验证运算结果，而要同时验证参与运算的每个值

```
Number.isSafeInteger(9007199254740993) // false
Number.isSafeInteger(990) // true
Number.isSafeInteger(9007199254740993 - 990)  // true

9007199254740993 - 990
// 返回结果 9007199254740002
// 正确答案应该是 9007199254740003
```

&emsp;&emsp;上面代码中，`9007199254740993`不是一个安全整数，但是`Number.isSafeInteger`会返回结果，显示计算结果是安全的。这是因为，这个数超出了精度范围，导致在计算机内部，以`9007199254740992`的形式储存

```
9007199254740993 === 9007199254740992 // true
```

&emsp;&emsp;所以，如果只验证运算结果是否为安全整数，很可能得到错误结果。下面的函数可以同时验证两个运算数和运算结果

```
function trusty (left, right, result) {
  if (
    Number.isSafeInteger(left) &amp;&amp;
    Number.isSafeInteger(right) &amp;&amp;
    Number.isSafeInteger(result)
  ) {
    return result;
  }
  throw new RangeError('Operation cannot be trusted!');
}
// RangeError: Operation cannot be trusted!
trusty(9007199254740993, 990, 9007199254740993 - 990)

trusty(1, 2, 3)// 3
```

&nbsp;

### Math对象

&emsp;&emsp;ES6在Math对象上新增了17个与数学相关的方法。所有这些方法都是静态方法，只能在Math对象上调用

【`Math.trunc`】

&emsp;&emsp;`Math.trunc`方法用于去除一个数的小数部分，返回整数部分

```
Math.trunc(4.1) // 4
Math.trunc(4.9) // 4
Math.trunc(-4.1) // -4
Math.trunc(-4.9) // -4
Math.trunc(-0.1234) // -0
```

&emsp;&emsp;对于非数值，`Math.trunc`内部使用`Number`方法将其先转为数值

```
Math.trunc('123.456')// 123
```

&emsp;&emsp;对于空值和无法截取整数的值，返回NaN

```
Math.trunc(NaN);      // NaN
Math.trunc('foo');    // NaN
Math.trunc();         // NaN
```

&emsp;&emsp;对于没有部署这个方法的环境，可以用下面的代码模拟

```
Math.trunc = Math.trunc || function(x) {
  return x < 0 ? Math.ceil(x) : Math.floor(x);
};
```

【`Math.sign`】

&emsp;&emsp;`Math.sign`方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值

&emsp;&emsp;它会返回以下五种值

```
参数为正数，返回+1；
参数为负数，返回-1；
参数为0，返回0；
参数为-0，返回-0;
其他值，返回NaN。
```
```
Math.sign(-5) // -1
Math.sign(5) // +1
Math.sign(0) // +0
Math.sign(-0) // -0
Math.sign(NaN) // NaN
Math.sign('9'); // +1
Math.sign('foo'); // NaN
Math.sign();      // NaN
```

&emsp;&emsp;对于没有部署这个方法的环境，可以用下面的代码模拟

```
Math.sign = Math.sign || function(x) {
  x = +x; // convert to a number
  if (x === 0 || isNaN(x)) {
    return x;
  }
  return x &gt; 0 ? 1 : -1;
};
```

【`Math.cbrt`】

&emsp;&emsp;`Math.cbrt`方法用于计算一个数的立方根

```
Math.cbrt(-1) // -1
Math.cbrt(0)  // 0
Math.cbrt(1)  // 1
Math.cbrt(2)  // 1.2599210498948734
```

&emsp;&emsp;对于非数值，`Math.cbrt`方法内部也是先使用`Number`方法将其转为数值

```
Math.cbrt('8') // 2
Math.cbrt('hello') // NaN
```

&emsp;&emsp;对于没有部署这个方法的环境，可以用下面的代码模拟

```
Math.cbrt = Math.cbrt || function(x) {
  var y = Math.pow(Math.abs(x), 1/3);
  return x < 0 ? -y : y;
};
```

【`Math.clz32`】

&emsp;&emsp;JS的整数使用32位二进制形式表示，`Math.clz32`方法返回一个数的32位无符号整数形式有多少个前导0

```
Math.clz32(0) // 32
Math.clz32(1) // 31
Math.clz32(1000) // 22
Math.clz32(0b01000000000000000000000000000000) // 1
Math.clz32(0b00100000000000000000000000000000) // 2
```

&emsp;&emsp;上面代码中，0的二进制形式全为0，所以有32个前导0；1的二进制形式是`0b1`，只占1位，所以32位之中有31个前导0；1000的二进制形式是`0b1111101000`，一共有10位，所以32位之中有22个前导0

&emsp;&emsp;左移运算符（`<`）与`Math.clz32`方法直接相关

```
Math.clz32(0) // 32
Math.clz32(1) // 31
Math.clz32(1 < 1) // 30
Math.clz32(1 < 2) // 29
Math.clz32(1 < 29) // 2
```

&emsp;&emsp;对于小数，`Math.clz32`方法只考虑整数部分

```
Math.clz32(3.2) // 30
Math.clz32(3.9) // 30
```

&emsp;&emsp;对于空值或其他类型的值，`Math.clz32`方法会将它们先转为数值，然后再计算

```
Math.clz32() // 32
Math.clz32(NaN) // 32
Math.clz32(Infinity) // 32
Math.clz32(null) // 32
Math.clz32('foo') // 32
Math.clz32([]) // 32
Math.clz32({}) // 32
Math.clz32(true) // 31
```

【`Math.imul`】

&emsp;&emsp;`Math.imul`方法返回两个数以32位带符号整数形式相乘的结果，返回的也是一个32位的带符号整数

```
Math.imul(2, 4)   // 8
Math.imul(-1, 8)  // -8
Math.imul(-2, -2) // 4
```

&emsp;&emsp;如果只考虑最后32位，大多数情况下，`Math.imul(a, b)`与`a * b`的结果是相同的，即该方法等同于`(a * b)|0`的效果（超过32位的部分溢出）。之所以需要部署这个方法，是因为JS有精度限制，超过2的53次方的值无法精确表示。这就是说，对于那些很大的数的乘法，低位数值往往都是不精确的，`Math.imul`方法可以返回正确的低位数值

```
(0x7fffffff * 0x7fffffff)|0 // 0
```

&emsp;&emsp;上面这个乘法算式，返回结果为0。但是由于这两个二进制数的最低位都是1，所以这个结果肯定是不正确的，因为根据二进制乘法，计算结果的二进制最低位应该也是1。这个错误就是因为它们的乘积超过了2的53次方，JS无法保存额外的精度，就把低位的值都变成了0。`Math.imul`方法可以返回正确的值1

```
Math.imul(0x7fffffff, 0x7fffffff) // 1
```

【Math.fround】

&emsp;&emsp;Math.fround方法返回一个数的单精度浮点数形式

```
Math.fround(0)     // 0
Math.fround(1)     // 1
Math.fround(1.337) // 1.3370000123977661
Math.fround(1.5)   // 1.5
Math.fround(NaN)   // NaN
```

&emsp;&emsp;对于整数来说，`Math.fround`方法返回结果不会有任何不同，区别主要是那些无法用64个二进制位精确表示的小数。这时，`Math.fround`方法会返回最接近这个小数的单精度浮点数

&emsp;&emsp;对于没有部署这个方法的环境，可以用下面的代码模拟

```
Math.fround = Math.fround || function(x) {
  return new Float32Array([x])[0];
};
```

【`Math.hypot`】

&emsp;&emsp;`Math.hypot`方法返回所有参数的平方和的平方根

```
Math.hypot(3, 4);        // 5
Math.hypot(3, 4, 5);     // 7.0710678118654755
Math.hypot();            // 0
Math.hypot(NaN);         // NaN
Math.hypot(3, 4, 'foo'); // NaN
Math.hypot(3, 4, '5');   // 7.0710678118654755
Math.hypot(-3);          // 3
```

&emsp;&emsp;上面代码中，3的平方加上4的平方，等于5的平方

&emsp;&emsp;如果参数不是数值，`Math.hypot`方法会将其转为数值。只要有一个参数无法转为数值，就会返回NaN

&emsp;&emsp;ES6新增了4个对数相关方法

【`Math.expm1`】

&emsp;&emsp;`Math.expm1(x)`返回e<sup>x</sup> - 1，即`Math.exp(x) - 1`

```
Math.expm1(-1) // -0.6321205588285577
Math.expm1(0)  // 0
Math.expm1(1)  // 1.718281828459045
```

&emsp;&emsp;对于没有部署这个方法的环境，可以用下面的代码模拟

```
Math.expm1 = Math.expm1 || function(x) {
  return Math.exp(x) - 1;
};
```

【`Math.log1p(x)`】

&emsp;&emsp;`Math.log1p(x)`方法返回`1 + x`的自然对数，即`Math.log(1 + x)`。如果`x`小于-1，返回`NaN`

```
Math.log1p(1)  // 0.6931471805599453
Math.log1p(0)  // 0
Math.log1p(-1) // -Infinity
Math.log1p(-2) // NaN
```

&emsp;&emsp;对于没有部署这个方法的环境，可以用下面的代码模拟

```
Math.log1p = Math.log1p || function(x) {
  return Math.log(1 + x);
};
```

【`Math.log10(x)`】

&emsp;&emsp;`Math.log10(x)`返回以10为底的`x`的对数。如果`x`小于0，则返回NaN

```
Math.log10(2)      // 0.3010299956639812
Math.log10(1)      // 0
Math.log10(0)      // -Infinity
Math.log10(-2)     // NaN
Math.log10(100000) // 5
```

&emsp;&emsp;对于没有部署这个方法的环境，可以用下面的代码模拟

```
Math.log10 = Math.log10 || function(x) {
  return Math.log(x) / Math.LN10;
};
```

【Math.log2(x)】

&emsp;&emsp;`Math.log2(x)`返回以2为底的`x`的对数。如果`x`小于0，则返回NaN

```
Math.log2(3)       // 1.584962500721156
Math.log2(2)       // 1
Math.log2(1)       // 0
Math.log2(0)       // -Infinity
Math.log2(-2)      // NaN
Math.log2(1024)    // 10
Math.log2(1 < 29) // 29
```

&emsp;&emsp;对于没有部署这个方法的环境，可以用下面的代码模拟

```
Math.log2 = Math.log2 || function(x) {
  return Math.log(x) / Math.LN2;
};
```

&emsp;&emsp;ES6新增了6个双曲函数方法

```
Math.sinh(x) 返回x的双曲正弦（hyperbolic sine）
Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）
Math.tanh(x) 返回x的双曲正切（hyperbolic tangent）
Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine）
Math.acosh(x) 返回x的反双曲余弦（inverse hyperbolic cosine）
Math.atanh(x) 返回x的反双曲正切（inverse hyperbolic tangent）
```

