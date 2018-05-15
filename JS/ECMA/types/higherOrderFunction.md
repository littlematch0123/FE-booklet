# 深入理解javascript函数进阶系列第一篇——高阶函数

&emsp;&emsp;前面的[函数系列](http://www.cnblogs.com/xiaohuochai/p/5702813.html)中介绍了函数的基础用法。从本文开始，将介绍javascript函数进阶系列，本文将详细介绍高阶函数

&nbsp;

### 定义

&emsp;&emsp;高阶函数(higher-order function)指操作函数的函数，一般地，有以下两种情况

&emsp;&emsp;1、函数可以作为参数被传递

&emsp;&emsp;2、函数可以作为返回值输出

&emsp;&emsp;javascript中的函数显然满足高阶函数的条件，在实际开发中，无论是将函数当作参数传递，还是让函数的执行结果返回另外一个函数，这两种情形都有很多应用场景。下面将对这两种情况进行详细介绍

&nbsp;

### 参数传递

&emsp;&emsp;把函数当作参数传递，代表可以抽离出一部分容易变化的业务逻辑，把这部分业务逻辑放在函数参数中，这样一来可以分离业务代码中变化与不变的部分。其中一个常见的应用场景就是回调函数

【回调函数】

&emsp;&emsp;在ajax异步请求的应用中，回调函数的使用非常频繁。想在ajax请求返回之后做一些事情，但又并不知道请求返回的确切时间时，最常见的方案就是把callback函数当作参数传入发起ajax请求的方法中，待请求完成之后执行callback函数

<div>
<pre>var getUserInfo = function( userId, callback ){
  $.ajax( 'http://xx.com/getUserInfo?' + userId, function( data ){
    if ( typeof callback === 'function' ){
      callback( data );
    }
  });
}
getUserInfo( 123, function( data ){ 
  alert ( data.userName );
});</pre>
</div>

&emsp;&emsp;回调函数的应用不仅只在异步请求中，当一个函数不适合执行一些请求时，也可以把这些请求封装成一个函数，并把它作为参数传递给另外一个函数，&ldquo;委托&rdquo;给另外一个函数来执行

&emsp;&emsp;比如，想在页面中创建100个div节点，然后把这些div节点都设置为隐藏。下面是一种编写代码的方式：

<div>
<pre>var appendDiv = function(){
  for ( var i = 0; i &lt; 100; i++ ){
    var div = document.createElement( 'div' );
    div.innerHTML = i;
    document.body.appendChild( div );
    div.style.display = 'none';
  }
};
appendDiv();</pre>
</div>

&emsp;&emsp;把div.style.display = 'none'的逻辑硬编码在appendDiv里显然是不合理的，appendDiv未免有点个性化，成为了一个难以复用的函数，并不是每个人创建了节点之后就希望它们立刻被隐藏

&emsp;&emsp;于是把div.style.display = 'none'这行代码抽出来，用回调函数的形式传入appendDiv方法

<div>
<pre>var appendDiv = function( callback ){
  for ( var i = 0; i &lt; 100; i++ ){
    var div = document.createElement( 'div' ); 
    div.innerHTML = i;
    document.body.appendChild( div );
    if ( typeof callback === 'function' ){
      callback( div );
    }
  }
};
appendDiv(function( node ){ 
  node.style.display = 'none';
});</pre>
</div>

&emsp;&emsp;可以看到，隐藏节点的请求实际上是由客户发起的，但是客户并不知道节点什么时候会创建好，于是把隐藏节点的逻辑放在回调函数中，&ldquo;委托&rdquo;给appendDiv方法。appendDiv方法当然知道节点什么时候创建好，所以在节点创建好的时候，appendDiv会执行之前客户传入的回调函数

【数组排序】

&emsp;&emsp;函数作为参数传递的另一个常见场景是数组排序函数sort()。Array.prototype.sort接受一个函数当作参数，这个函数里面封装了数组元素的排序方法。目的是对数组进行排序，这是不变的部分；而使用什么规则去排序，则是可变的部分。把可变的部分封装在函数参数里，动态传入Array.prototype.sort，使Array.prototype.sort方法成为了一个非常灵活的方法

<div>
<pre>// 从小到大排列，输出: [ 1, 3, 4 ]
[ 1, 4, 3 ].sort( function( a, b ){ 
  return a - b;
});
// 从大到小排列，输出: [ 4, 3, 1 ]
[ 1, 4, 3 ].sort( function( a, b ){ 
  return b - a;
});</pre>
</div>

&nbsp;

### 返回值输出

&emsp;&emsp;相比把函数当作参数传递，函数当作返回值输出的应用场景也有很多。让函数继续返回一个可执行的函数，意味着运算过程是可延续的

&emsp;&emsp;下面是使用Object,prototype.toString方法判断数据类型的一系列的isType函数

<div>
<pre>var isString = function( obj ){
  return Object.prototype.toString.call( obj ) === '[object String]';
};
var isArray = function( obj ){
  return Object.prototype.toString.call( obj ) === '[object Array]';
};
var isNumber = function( obj ){
  return Object.prototype.toString.call( obj ) === '[object Number]';
};</pre>
</div>

&emsp;&emsp;实际上，这些函数的大部分实现都是相同的，不同的只是Object.prototype.toString.call(obj)返回的字符串。为了避免多余的代码，可以把这些字符串作为参数提前传入isType函数。代码如下：

<div>
<pre>var isType = function( type ){ 
  return function( obj ){
    return Object.prototype.toString.call( obj ) === '[object '+ type +']';
  }
};
var isString = isType( 'String' ); 
var isArray = isType( 'Array' ); 
var isNumber = isType( 'Number' );
console.log( isArray( [ 1, 2, 3 ] ) );    // 输出：true</pre>
</div>

&emsp;&emsp;当然，还可以用循环语句，来批量注册这些 isType 函数：

<div>
<pre>var Type = {};
for ( var i = 0, type; type = [ 'String', 'Array', 'Number' ][ i++ ]; ){ 
  (function( type ){
    Type[ 'is' + type ] = function( obj ){
      return Object.prototype.toString.call( obj ) === '[object '+ type +']';
    }
  })( type )
};
Type.isArray( [] );    // 输出：true 
Type.isString( "str" ); // 输出：true</pre>
</div>

&nbsp;

### AOP

&emsp;&emsp;AOP（面向切面编程）的主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来，这些跟业务逻辑无关的功能通常包括日志统计、安全控制、异常处理等。把这些功能抽离出来之后，再通过&ldquo;动态织入&rdquo;的方式掺入业务逻辑模块中。这样做的好处首先是可以保持业务逻辑模块的纯净和高内聚性，其次是可以很方便地复用日志统计等功能模块

&emsp;&emsp;通常，在javascript中实现AOP，都是指把一个函数&ldquo;动态织入&rdquo;到另外一个函数之中。下面通过扩展Function.prototype来实现

<div>
<pre>  Function.prototype.before = function (beforefn) {
    var _this = this;    // 保存原函数的引用
    return function () {    // 返回包含了原函数和新函数的"代理"函数 
      beforefn.apply(this, arguments);    // 先执行新函数，修正this 
      return _this.apply(this, arguments);    // 再执行原函数
    }
  };
  Function.prototype.after = function (afterfn) {
    var _this = this;
    return function () {
      var ret = _this.apply(this, arguments); //先执行原函数
      afterfn.apply(this, arguments); //再执行新函数
      return ret;
    }
  };
  var func = function () {
    console.log(2);
  };
  func = func.before(function () {
    console.log(1);
  }).after(function () {
    console.log(3);
  });

  func();</pre>
</div>

&emsp;&emsp;把负责打印数字1和打印数字3的两个函数通过AOP的方式动态植入func函数。通过执行上面的代码，控制台顺利地返回了执行结果1、2、3

<div>
<pre>//1
//2
//3</pre>
</div>

&nbsp;

### 其他应用

【not】

&emsp;&emsp;下面的not函数用于返回参数的返回值的逻辑非

<div>
<pre>  function not(f) {
    return function () {
      return !(f.apply(this, arguments));
    };
  }
  //偶数时，返回true；奇数时，返回false
  var even = function (x) {
    return x % 2 === 0;
  }
  //偶数时，返回false；奇数时，返回true
  var odd = not(even);
  [1, 1, 3, 5, 5].every(odd);//true</pre>
</div>

【mapper】

&emsp;&emsp;下面的mapper()函数，返回的新函数将一个数组映射到另一个使用这个函数的数组上

<div>
<pre>//所返回的函数的参数应当是一个实参数组，并对每个数组元素执行函数f()，并返回所有计算结果组成的数组
function mapper(f){
    return function(a){
        return Array.prototype.map.call(a,f);
    }
}
var increment = function(x){
    return x+1;
}
var incrementer = mapper(increment);
increment([1,2,3]);//[2,3,4]</pre>
</div>

【squareofsum】

&emsp;&emsp;下面的函数接收两个函数f()和g()，并返回一个新函数用以计算f(g())

<div>
<pre>//返回一个新的可以计算f(g(...))的函数
//返回的函数h()将它所有的实参传入g()，然后将g()的返回值传入f()
//调用f()和g()时的this值和调用h()时的this值是同一个this
function compose(f,g){
    return function(){
        //需要给f()传入一个参数，所以使用f()的call()方法
        //需要给g()传入很多参数，所以使用g()的apply()方法
        return f.call(this,g.apply(this,arguments));
    };
}
var square = function(x){
    return x*x;
}
var sum = function(x,y){
    return x + y;
}
var squareofsum = compose(square,sum);
squareofsum(2,3);//25</pre>
</div>

&emsp;&emsp;上面代码中，首先执行compose(square,sum)。square传给f，sum传给g。然后执行f(g())。g作为f函数的参数，首先执行。即先执行sum(2,3)，结果为5。再执行square(5)，最终结果为25

&nbsp;

## 最后

&emsp;&emsp;本文介绍了高阶函数的基础使用，主要包括参数传递和返回值输出两种形式。其中，高阶函数的一个重要应用是函数柯里化(currying)，将在下篇博文中详细介绍

