# 深入理解闭包系列第五篇——闭包的8种形式

&emsp;&emsp;根据[闭包的定义](http://www.cnblogs.com/xiaohuochai/p/5728577.html)，我们知道，无论通过何种手段，只要将内部函数传递到所在的词法作用域以外，它都会持有对原始作用域的引用，无论在何处执行这个函数都会使用闭包。接下来，本文将详细介绍闭包的8种形式

&nbsp;

### 返回值

&emsp;&emsp;最常用的一种形式是函数作为返回值被返回

<div>
<pre>var F = function(){
    var b = 'local';
    var N = function(){
        return b;
    }
    return N;
}
console.log(F()());</pre>
</div>

&nbsp;

### 函数赋值

&emsp;&emsp;一种变形的形式是将内部函数赋值给一个外部变量

<div>
<pre>var inner;
var F = function(){
    var b = 'local';
    var N = function(){
        return b;
    };
    inner = N;
};
F();
console.log(inner());</pre>
</div>

&nbsp;

### 函数参数

&emsp;&emsp;闭包可以通过函数参数传递函数的形式来实现

<div>
<pre>var Inner = function(fn){
    console.log(fn());
}
var F = function(){
    var b = 'local';
    var N = function(){
        return b;
    }
    Inner(N);
}
F();</pre>
</div>

&nbsp;

### IIFE

&emsp;&emsp;由前面的示例代码可知，函数F()都是在声明后立即被调用，因此可以使用IIFE来替代。但是，要注意的是，这里的Inner()只能使用函数声明语句的形式，而不能使用函数表达式。详细原因[移步至此](http://www.cnblogs.com/xiaohuochai/p/5731016.html#anchor4)

<div>
<pre>function Inner(fn){
    console.log(fn());
}
(function(){
    var b = 'local';
    var N = function(){
        return b;
    }
    Inner(N);
})();</pre>
</div>

&nbsp;

### 循环赋值

&emsp;&emsp;在闭包问题上，最常见的一个错误就是循环赋值的错误。关于其错误原因的详细解释[移步至此](http://www.cnblogs.com/xiaohuochai/p/5731641.html)

<div>
<pre>function foo(){
    var arr = [];
    for(var i = 0; i &lt; 2; i++){
        arr[i] = function(){
            return i;
        }
    }
    return arr;
}
var bar = foo();
console.log(bar[0]());//2    </pre>
</div>

&emsp;&emsp;正确的写法如下

<div>
<pre>function foo(){
    var arr = [];
    for(var i = 0; i &lt; 2; i++){
        arr[i] = (function fn(j){
            return function test(){
                return j;
            }
        })(i);
    }
    return arr;
}
var bar = foo();
console.log(bar[0]());//0    </pre>
</div>

&nbsp;

### g(s)etter

&emsp;&emsp;我们通过提供getter()和setter()函数来将要操作的变量保存在函数内部，防止其暴露在外部

<div>
<pre>var getValue,setValue;
(function(){
    var secret = 0;
    getValue = function(){
        return secret;
    }
    setValue = function(v){
        if(typeof v === 'number'){
            secret = v;
        }
    }
})();
console.log(getValue());//0
setValue(1);
console.log(getValue());//1</pre>
</div>

&nbsp;

### 迭代器

&emsp;&emsp;我们经常使用闭包来实现一个累加器

<div>
<pre>var add = (function(){
    var counter = 0;
    return function(){
        return ++counter; 
    }
})();
console.log(add())//1
console.log(add())//2  </pre>
</div>

&emsp;&emsp;类似地，使用闭包可以很方便的实现一个迭代器

<div>
<pre>function setup(x){
    var i = 0;
    return function(){
        return x[i++];
    }
}
var next = setup(['a','b','c']);
console.log(next());//'a'
console.log(next());//'b'
console.log(next());//'c'</pre>
</div>

&nbsp;

### 区分首次

```
var firstLoad = (function(){
  var _list = [];
  return function(id){
    if(_list.indexOf(id) >= 0){
      return false;
    }else{
      _list.push(id);
      return true;
    }
  }
})();

firstLoad(10);//true
firstLoad(10);//false
firstLoad(20);//true
firstLoad(20);//false
```
&nbsp;

### 缓存机制

&emsp;&emsp;通过闭包加入缓存机制，使得相同的参数不用重复计算，来提高函数的性能

&emsp;&emsp;未加入缓存机制前的代码如下

```
var mult = function(){
  var a = 1;
  for(var i = 0,len = arguments.length; i<len; i++){
    a = a * arguments[i];
  }
  return a;
}
```
&emsp;&emsp;加入缓存机制后，代码如下

```
var mult = function(){
  var cache = {};
  var calculate = function(){
    var a = 1;
    for(var i = 0,len = arguments.length; i<len; i++){
      a = a * arguments[i];
    }
    return a;
  };
  return function(){
    var args = Array.prototype.join.call(arguments,',');
    if(args in cache){
      return cache[args];
    }
    return cache[args] = calculate.apply(null,arguments);
  }
}()
```

&nbsp;

### img对象

&emsp;&emsp;img对象经常用于数据上报

```
var report = function(src){
  var img = new Image();
  img.src = src;
}
report('http://xx.com/getUserInfo');
```

&emsp;&emsp;但是，在一些低版本浏览器中，使用report函数进行数据上报会丢失30%左右的数据，也就是说，report函数并不是每一次都成功地发起了HTTP请求

&emsp;&emsp;原因是img是report函数中的局部变量，当report函数的调用结束后，img局部变量随即被销毁，而此时或许还没来得及发出HTTP请求，所以此次请求就会丢失掉

&emsp;&emsp;现在把img变量用闭包封闭起来，就能解决请求丢失的问题

```
var report = (function(){
  var imgs = [];
  return function(src){
    var img = new Image();
    imgs.push(img);
    img.src = src;
  }
})()
report('http://xx.com/getUserInfo');
```

