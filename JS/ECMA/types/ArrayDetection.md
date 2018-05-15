# 什么才是正确的javascript数组检测方式

&emsp;&emsp;对于确定某个对象是不是数组，一直是数组的一个经典问题。本文专门将该问题择出来，介绍什么才是正确的javascript数组检测方式

&nbsp;

### typeof

&emsp;&emsp;首先，使用最常用的类型检测工具&mdash;&mdash;typeof运算符

```
var arr = [1,2,3];
console.log(typeof arr);//'object'
```

&emsp;&emsp;前面已经介绍过，[数组的本质](http://www.cnblogs.com/xiaohuochai/p/5679605.html#anchor2)是一种特殊的对象，所以返回'object'。typeof运算符只能用来区分原始类型和对象类型，对于更具体的对象类型是无法鉴别出来的

&nbsp;

### instanceof

&emsp;&emsp;这时，该instanceof运算符出场了，instanceof运算符用来判断一个对象是否是特定构造函数的实例

```
var arr = [1,2,3];
console.log(arr instanceof Array);//true

var str = '123';
console.log(str instanceof Array);//false
```

&emsp;&emsp;看上去很实用。但，这时就引出了数组检测的经典场景&mdash;&mdash;网页中包含多个框架

&emsp;&emsp;【1】先创建一个父网页box.html和子网页in.html，其中父网页通过iframe包含子网页

```
//子网页为空
//父网页
<iframe name="child" src="in.html"></iframe>
```

&emsp;&emsp;【2】测试父网页和子网页的通信，注意一定要在服务器环境下测试

```
//子网页
var arr = [1,2,3];

//父网页
window.onload = function(){
    console.log(child.window.arr);// [1,2,3]
}
```

&emsp;&emsp;【3】测试成功，这时进行数组检测

```
//子网页
var arr = [1,2,3];
//父网页
function test(arr){
    return arr instanceof Array;
}
window.onload = function(){
    console.log(child.window.arr);// [1,2,3]
    console.log(test(child.window.arr));//false
}
```

&emsp;&emsp;测试后发现，数组检测的结果是false。这是因为网页中包含多个框架，那实际上就存在多个不同的全局环境，从而存在不同版本的Array构造函数。如果从一个框架向另一个框架传入一个数组，那么传入的数组与在第二个框架中原生创建的数组分别具有各自不同的构造函数

&nbsp;

### toString

&emsp;&emsp;typeof操作符在这里帮不上忙，而instanceof操作符只能用于简单的情形，这时就需要祭出大杀器&mdash;&mdash;[toString()](http://www.cnblogs.com/xiaohuochai/p/5557387.html)，通过引用Object的toString()方法来检查对象的类属性，对数组而言该属性的值总是"Array"

```
var arr = [1,2,3];
console.log(Object.prototype.toString.call(arr) === '[object Array]');//true
```

&emsp;&emsp;或者，可以自定义类型识别函数

```
function type(obj){
    return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase();
}
var arr = [1,2,3];
console.log(type(arr));//'array'
```

&emsp;&emsp;在多框架环境中测试，同样返回'array'

```
//子网页
var arr = [1,2,3];

//父网页
function test(arr){
    return arr instanceof Array;
}
function type(obj){
    return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase();
}
window.onload = function(){
    console.log(child.window.arr);// [1,2,3]
    console.log(test(child.window.arr));//false
    console.log(type(child.window.arr));//'array'
}
```

&nbsp;

### isArray

&emsp;&emsp;为了让数组检测更方便，ECMAScript5新增了Array.isArray()方法。该方法的目的是最终确定某个值到底是不是数组，而不管它在哪个全局环境中创建的&nbsp;

```
var arr = [1,2,3];
console.log(Array.isArray([]));//true
console.log(Array.isArray({}));//false
console.log(Array.isArray(arr));//true
```

&emsp;&emsp;在多框架环境中测试，同样返回true

```
//子网页
var arr = [1,2,3];

//父网页
console.log(Array.isArray(child.window.arr));//true
```

&nbsp;

## 完整测试代码

【子网页(in.html)】

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<script>
var arr = [1,2,3];
</script>    
</body>
</html>
```

【父网页(box.html)】

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<iframe name="child" src="in.html"></iframe>
<script>
function test(arr){
    return arr instanceof Array;
}
function type(obj){
    return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase();
}
window.onload = function(){
    console.log(child.window.arr);// [1,2,3]
    console.log(test(child.window.arr));//false
    console.log(type(child.window.arr));//'array'
    console.log(Array.isArray(child.window.arr));//true
}
</script>    
</body>
</html>
```

