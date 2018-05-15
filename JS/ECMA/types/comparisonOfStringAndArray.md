# javascript中数组和字符串的方法比较

&emsp;&emsp;[字符串](http://www.cnblogs.com/xiaohuochai/p/5612962.html)和[数组](http://www.cnblogs.com/xiaohuochai/p/5682621.html)有很多的相同之处，它们的方法众多，且相似度很高；但它们又有不同之处，字符串是不可变值，于是可以把其看作只读的数组。本文将对字符串和数组的类似方法进行比较

&nbsp;

### 可索引

&emsp;&emsp;ECMAScript5定义了一种访问字符的方法，使用方括号加数字索引来访问字符串中的特定字符

&emsp;&emsp;可索引的字符串的最大的好处就是简单，用方括号代替了charAt()调用，这样更加简洁、可读并且可能更高效。不仅如此，字符串的行为类似于数组的事实使得通用的数组方法可以应用到字符串上

&emsp;&emsp;如果参数超出范围或是NaN时，则输出undefined

```
var str = "hello";
console.log(str[0]);//h
console.log(str[[1]]);//e

console.log(str[false]);//undefined
console.log(str[-1]);//undefined
console.log(str[NaN]);//undefined
console.log(str[]);//报错
```
```
var arr = ['h','e','l','l','o'];
console.log(arr[0]);//h
console.log(arr[[1]]);//e

console.log(arr[false]);//undefined
console.log(arr[-1]);//undefined
console.log(arr[NaN]);//undefined
console.log(arr[]);//报错
```

&nbsp;

### 转换

&emsp;&emsp;字符串可以使用split()方法转换为数组；而数组可以使用join()方法转换为字符串

【split()】

&emsp;&emsp;split()方法基于指定的分隔符将一个字符串分割成多个字符串，并将结果放在一个数组中，分隔符可以是字符串，也可以是一个正则表达式

&emsp;&emsp;该方法可以接受(可选的)第二个参数用于指定数组的大小。如果第二个参数为0-array.length范围内的值时，按照指定参数输出，其他情况将所有结果都输出

&emsp;&emsp;若指定分隔符没有出现在字符串中，则以数组的形式返回原字符串的值

```
var colorText = 'red,blue,green,yellow';
console.log(colorText.split(''));//["r", "e", "d", ",", "b", "l", "u", "e", ",", "g", "r", "e", "e", "n", ",", "y", "e", "l", "l", "o", "w"]
console.log(colorText.split(','));//["red", "blue", "green", "yellow"]
console.log(colorText.split(',',2));//["red", "blue"]
console.log(colorText.split(',',6));//["red", "blue", "green", "yellow"]
console.log(colorText.split('-'));//["red,blue,green,yellow"]
console.log(colorText.split(/\,/));//["red", "blue", "green", "yellow"]
console.log(colorText.split(/e/));//["r", "d,blu", ",gr", "", "n,y", "llow"]
console.log(colorText.split(/[^\,]+/));//将除去逗号以外的字符串变为分隔符["", ",", ",", ",", ""],IE8-会识别为[",",",",","]
```

【join()】

&emsp;&emsp;join()方法可以使用不同的分隔符来构建这个字符串，join()方法只接收一个参数，用作分隔符的字符串，然后返回包含所有数组项的字符串

&emsp;&emsp;如果不给join()方法传入任何值，则使用逗号作为分隔符

```
var a = [1,2,3];
console.log(a.join());//'1,2,3'
console.log(a.join(' '));//'1 2 3'
console.log(a.join(''));//'123'

var b = new Array(10);
b.join('-');//'---------'，9个连字符组成的字符串
```

&emsp;&emsp;如果数组中的某一项的值是null或者undefined，则该值在join()方法返回的结果中以空字符串表示

```
var colors = [1,undefined,2,null,3];
console.log(colors.join());//'1,,2,,3'
```

&emsp;&emsp;由于字符串是类数组对象，所以，也可以使用join()方法

```
console.log(Array.prototype.join.call('hello', '-'));// "h-e-l-l-o"
```
```
var str = 'test';
var arr = str.split('')//["t", "e", "s", "t"]
console.log(arr.join('-'));//'t-e-s-t'
```

&nbsp;

### 拼接

&emsp;&emsp;字符串和数组共同拥有拼接方法concat()

```
var value = 'hello';
console.log(value.concat('world'));//'helloworld'
console.log(value.concat(['world']));//'helloworld'
console.log(value.concat([['world']]));//'helloworld'
```
```
var value = ['hello'];
console.log(value.concat('world'));//["hello", "world"]
console.log(value.concat(['world']));//["hello", "world"]
console.log(value.concat([['world']]));//["hello", ["world"]]
```

&nbsp;

### 创建

&emsp;&emsp;字符串和数组都拥有创建方法slice()，分别用于创建子字符串和子数组

&emsp;&emsp;slice()方法基于当前数组(或字符串)中的一个或多个项创建一个新数组(或字符串)，接受一个或两个参数，即要返回项的起始和结束位置，最后返回新数组(或字符串)

&emsp;&emsp;slice(start,end)方法需要两个参数start和end，返回这个数组(或字符串)中从start位置到(但不包含)end位置的一个子数组(或字符串)；如果end为undefined或不存在，则返回从start位置到数组(或字符串)结尾的所有项

&emsp;&emsp;如果start是负数，则start = max(length + start,0)

&emsp;&emsp;如果end是负数，则end = max(length + end,0)

&emsp;&emsp;start和end无法交换位置

```
var numbers = [1,2,3,4,5];
console.log(numbers.slice(2));//[3,4,5]
console.log(numbers.slice(2,undefined));//[3,4,5]
console.log(numbers.slice(2,3));//[3]
console.log(numbers.slice(2,1));//[]

console.log(numbers.slice(-3));//-3+5=2 -&gt; [3,4,5]
console.log(numbers.slice(-8));//max(5 + -8,0)=0 -&gt; [1,2,3,4,5]

console.log(numbers.slice(0,-3));//-3+5=2 -&gt; [1,2]
console.log(numbers.slice(-2,-1));//-2+5=3;-1+5=4; -&gt; [4]
```
```
var stringValue = 'hello world';
console.log(stringValue.slice());//'hello world'
console.log(stringValue.slice(2));//'llo world'
console.log(stringValue.slice(20));//''
console.log(stringValue.slice(2,undefined));//'llo world'

console.log(stringValue.slice(2,-5));//'llo '
console.log(stringValue.slice(2,-20));//''
console.log(stringValue.slice(-2,2));//''
console.log(stringValue.slice(-2,-20));//''            
console.log(stringValue.slice(-2,20));//'ld'
console.log(stringValue.slice(-20,2));//'he'
console.log(stringValue.slice(-20,-2));//'hello wor'
```

&nbsp;

### 位置

&emsp;&emsp;字符串和数组都拥有查找位置的两个方法：indexOf()和lastIndexOf()。位置方法和中括号[]读取方法正好相反，一个是通过项查找索引，一个是通过索引查找项

【indexOf()】

&emsp;&emsp;indexOf(search,start)方法接收search和start两个参数，返回search首次出现的位置，如果没有找到则返回-1

&emsp;&emsp;字符串中的search参数会调用String()转型函数，将该参数的非字符串值转换为字符串；而数组中的search参数则使用严格相等运算符（===）进行比较

&emsp;&emsp;不论是数组还是字符串，第二个参数start都会隐式调用Number()转型函数，将start非数字值(undefined除外)转换为数值；若忽略该参数或该参数为undefined、NaN时，start = 0

&emsp;&emsp;若start参数为负数，字符串的处理是将start=0；而数组的处理是start = max(0,start+length)

```
var string = 'hello world world';
console.log(string.indexOf('ld'));//9
console.log(string.indexOf('ld',undefined));//9
console.log(string.indexOf('ld',NaN));//9
console.log(string.indexOf('ld',-1));//9
console.log(string.indexOf('ld',10));//15
console.log(string.indexOf('ld',[10]));//15
console.log(string.indexOf('true',[10]));//-1
console.log(string.indexOf(false,[10]));//-1
```
```
var arr = ['a','b','c','d','e','a','b'];
console.log(arr.indexOf('a',undefined));//0
console.log(arr.indexOf('a',NaN));//0
console.log(arr.indexOf('a',1));//5
console.log(arr.indexOf('a',true));//5
console.log(arr.indexOf('a',-1));//max(0,-1+7)=6; -1
console.log(arr.indexOf('a',-5));//max(0,-5+7)=2; 5
console.log(arr.indexOf('a',-50));//max(0,-50+7)=0; 0
```

【lastIndexOf()】

&emsp;&emsp;与indexOf()方法相反，lastIndexOf()方法是从右向左查找

&emsp;&emsp;lastIndexOf(search,start)方法接收search和start两个参数，返回searchString第一次出现的位置，如果没有找到则返回-1

&emsp;&emsp;类似地，字符串中的search参数会调用String()转型函数，将该参数的非字符串值转换为字符串；而数组中的search参数则使用严格相等运算符（===）进行比较

&emsp;&emsp;不论是数组还是字符串，第二个参数start都会隐式调用Number()转型函数，将start非数字值(undefined除外)转换为数值

&emsp;&emsp;若忽略该参数或该参数为undefined、NaN时，字符串的处理是start = length - 1；而数组的处理是start = 0

&emsp;&emsp;若start参数为负数，字符串的处理是将start=0；而数组的处理是start = max(0,start+length)

```
var string = 'hello world world';
console.log(string.lastIndexOf('ld'));//15
console.log(string.lastIndexOf('ld',undefined));//15
console.log(string.lastIndexOf('ld',NaN));//15
console.log(string.lastIndexOf('ld',-1));//-1
console.log(string.lastIndexOf('h',-1));//0
console.log(string.lastIndexOf('w',undefined));//12

console.log(string.lastIndexOf('ld',10));//9
console.log(string.lastIndexOf('ld',[10]));//9
console.log(string.lastIndexOf('true',[10]));//-1
console.log(string.lastIndexOf(false,[10]));//-1
```
```
var arr = [1,2,3,'1','2','3'];
console.log(arr.lastIndexOf('2'));//4
console.log(arr.lastIndexOf(3));//2
console.log(arr.lastIndexOf(0));//-1

var arr = ['a','b','c','d','e','a','b'];
console.log(arr.lastIndexOf('b'));//6
console.log(arr.lastIndexOf('b',undefined));//-1
console.log(arr.lastIndexOf('a',undefined));//0
console.log(arr.lastIndexOf('b',NaN));//-1
console.log(arr.lastIndexOf('b',1));//1
console.log(arr.lastIndexOf('b',-1));//max(0,-1+7)=6; 6
console.log(arr.lastIndexOf('b',-5));//max(0,-5+7)=2; 1
console.log(arr.lastIndexOf('b',-50));//max(0,-50+7)=0; -1
```

&nbsp;

### 顺序

【反转】

&emsp;&emsp;在数组Array中存在reverse()方法来反转数组

```
var array = [1,2,4,3,5];
console.log(array,array.reverse());//[5,3,4,2,1] [5,3,4,2,1]
```

&emsp;&emsp;而字符串String也可以利用call()或apply()来实现反转

```
var str = '12435';
console.log(str,Array.prototype.reverse.apply(str.split('')).join(''));//'12435' '53421'
```

【排序】

&emsp;&emsp;在数组Array中存在sort()方法来对数组排序，默认按字符串升序排列数组项

```
var array = [1,2,4,3,5];
console.log(array,array.sort());//[1,2,3,4,5] [1,2,3,4,5]
```

&emsp;&emsp;而字符串String也可以利用call()或apply()来实现排序

```
var str = '12435';
console.log(str,Array.prototype.sort.apply(str.split('')).join(''));//'12435' '12345'
```

