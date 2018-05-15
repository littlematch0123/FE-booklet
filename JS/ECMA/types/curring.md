# 深入理解javascript函数进阶系列第二篇——函数柯里化

&emsp;&emsp;函数柯里化currying的概念最早由俄国数学家Moses Sch&ouml;nfinkel发明，而后由著名的数理逻辑学家Haskell Curry将其丰富和发展，currying由此得名。本文将详细介绍函数柯里化(curring)

&nbsp;

### 定义

&emsp;&emsp;currying又称部分求值。一个currying的函数首先会接受一些参数，接受了这些参数之后，该函数并不会立即求值，而是继续返回另外一个函数，刚才传入的参数在函数形成的闭包中被保存起来。待到函数被真正需要求值的时候，之前传入的所有参数都会被一次性用于求值

&emsp;&emsp;从字面上理解currying并不太容易，下面通过编写一个计算每月开销的函数来解释函数柯里化currying

&nbsp;

### 每月开销函数

&emsp;&emsp;在每天结束之前，都要记录今天花掉了多少钱。代码如下：

<div>
<pre>var monthlyCost = 0;
var cost = function( money ){ 
  monthlyCost += money;
};
cost( 100 ); // 第 1 天开销 
cost( 200 ); // 第 2 天开销 
cost( 300 );   // 第 3 天开销
//...
cost( 700 );   // 第 30 天开销
alert ( monthlyCost );     // 输出1个月的总开销</pre>
</div>

&emsp;&emsp;每天结束后都会记录并计算到今天为止花掉的钱。但其实并不太关心每天花掉了多少钱，而只想知道到月底的时候会花掉多少钱。也就是说，实际上只需要在月底计算一次

&emsp;&emsp;如果在每个月的前29天，都只是保存好当天的开销，直到最后一天才进行求值计算，这样就达到了我们的要求，代码如下

<div>
<pre>  var cost = (function () {
    var args = [];
    return function () {
      //如果没有参数，则计算args数组中的和
      if (arguments.length === 0) {
        var money = 0;
        for (var i = 0, l = args.length; i &lt; l; i++) {
          money += args[i];
        }
        return money;
        //如果有参数，则只能是将数据传到args数组中
      } else {
        [].push.apply(args, arguments);
      }
    }
  })();
  cost(100); // 未真正求值 
  cost(200); // 未真正求值 
  cost(300); // 未真正求值
  console.log(cost()); // 求值并输出：600</pre>
</div>

&nbsp;

### 通用函数

&emsp;&emsp;下面来编写一个通用的柯里化函数currying，currying接受一个参数，即将要被currying的函数。如果和上面的例子结合，则这个函数的作用是遍历本月每天的开销并求出它们的总和

<div>
<pre>  var currying = function (fn) {
    var args = [];
    return function () {
      if (arguments.length === 0) {
        return fn.apply(this, args);
      } else {
        [].push.apply(args, arguments);
        return arguments.callee;
      }
    }
  };
  var cost = (function () {
    var money = 0;
    return function () {
      for (var i = 0, l = arguments.length; i &lt; l; i++) {
        money += arguments[i];
      }
      return money;
    }
  })();
  var cost = currying(cost); // 转化成 currying 函数
  cost(100); // 未真正求值 
  cost(200); // 未真正求值 
  cost(300);   // 未真正求值
  alert(cost());  // 求值并输出：600</pre>
</div>

&emsp;&emsp;至此，完成了一个currying函数的编写。当调用cost()时，如果明确地带上了一些参数，表示此时并不进行真正的求值计算，而是把这些参数保存起来，此时让cost函数返回另外一个函数。只有以不带参数的形式执行cost()时，才利用前面保存的所有参数，真正开始进行求值计算

&nbsp;

### 可传参函数

&emsp;&emsp;实际上，柯里化函数不仅可以接收要柯里化的函数作为参数，也可以接收一些必要参数，下面是函数柯里化(currying)的改进代码

<div>
<pre>  var currying = function (fn) {
    var args = [];
    //储存传到curring函数中的除了fn之外的其他参数，并储存到args函数中
    args = args.concat([].slice.call(arguments,1));
    return function () {
      if (arguments.length === 0) {
        return fn.apply(this, args);
      } else {
        //将fn中的参数展开，然后再储存到args数组中
        [].push.apply(args, arguments);
      }
    }
  };
  var cost = (function () {
    var money = 0;
    return function () {
      for (var i = 0, l = arguments.length; i &lt; l; i++) {
        money += arguments[i];
      }
      return money;
    }
  })();
  var cost = currying(cost,100,200); // 转化成 currying 函数
  cost(100,200); // 未真正求值 
  cost(300);   // 未真正求值
  console.log((cost()));  // 求值并输出：900</pre>
</div>

&nbsp;

### 求值柯里化

&emsp;&emsp;如果函数柯里化(curring)之后，传参的同时伴随着求值的过程，则代码简化如下

<div>
<pre>  var currying = function (fn) {
    //获取除了fn之外的其他参数
    var args = [].slice.call(arguments, 1);
    return function () {
      //获取fn里的所有参数
      var innerArgs = [].slice.call(arguments);
      //最终的参数列表为args和innerArgs的结合
      var finalArgs = args.concat(innerArgs);
      //将finalArgs里的参数展开，传到fn中执行
      return fn.apply(null, finalArgs);
    };
  };
  var cost = (function () {
    var money = 0;
    return function () {
      for (var i = 0, l = arguments.length; i &lt; l; i++) {
        money += arguments[i];
      }
      return money;
    }
  })();
  var cost = currying(cost,100,200); // 转化成 currying 函数
  cost(300);//100+200+300=600
  cost(100,100);//(100+200+300)+(100+200+100+100)=1100</pre>
</div>

&nbsp;

### 反柯里化

&emsp;&emsp;Array.prototype上的方法原本只能用来操作array对象。但用call和apply可以把任意对象当作this传入某个方法，这样一来，方法中用到this的地方就不再局限于原来规定的对象，而是加以泛化并得到更广的适用性

&emsp;&emsp;有没有办法把泛化this的过程提取出来呢？反柯里化(uncurrying)就是用来解决这个问题的。反柯里化主要用于扩大适用范围，创建一个应用范围更广的函数。使本来只有特定对象才适用的方法，扩展到更多的对象。

&emsp;&emsp;uncurrying的话题来自JavaScript之父Brendan Eich在2011年发表的一篇文章。以下代码是 uncurrying 的实现方式之一：

<div>
<pre>Function.prototype.uncurrying = function () { 
  var _this = this;
  return function() {
    var obj = Array.prototype.shift.call( arguments );
    return _this.apply( obj, arguments );
  };
};</pre>
</div>

&emsp;&emsp;另一种实现方法如下

<div>
<pre>Function.prototype.currying = function() {
    var _this = this;
    return function() {
        return Function.prototype.call.apply(_this, arguments);
    }
}</pre>
</div>

&emsp;&emsp;最终是都把this.method转化成method(this,arg1,arg2....)以实现方法借用和this的泛化

&emsp;&emsp;下面是一个让普通对象具备push方法的例子

<div>
<pre> var push = Array.prototype.push.uncurrying(),
    obj = {};
  push(obj, 'first', 'two');
  console.log(obj);
/*obj {
    0 : "first",
    1 : "two"
}*/</pre>
</div>

&emsp;&emsp;通过uncurrying的方式，Array.prototype.push.call变成了一个通用的push函数。这样一来，push函数的作用就跟Array.prototype.push一样了，同样不仅仅局限于只能操作array对象。而对于使用者而言，调用push函数的方式也显得更加简洁和意图明了

&emsp;&emsp;最后，再看一个例子

<div>
<pre>var toUpperCase = String.prototype.toUpperCase.uncurrying();
console.log(toUpperCase('avd')); // AVD
function AryUpper(ary) {
    return ary.map(toUpperCase);
}
console.log(AryUpper(['a', 'b', 'c'])); // ["A", "B", "C"]</pre>
</div>

