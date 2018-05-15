# 关于javascript代码优化的8点建议

&emsp;&emsp;本文将详细介绍JS编程风格的几个要点

&nbsp;

### 松耦合

&emsp;&emsp;当修改一个组件而不需要更改其他组件时，就做到了松耦合

&emsp;&emsp;1、将JS从CSS中抽离：不要使用CSS表达式


```
//不好的做法
.box{width: expression(document.body.offsetWidth + &rsquo;px')}
```


&emsp;&emsp;2、将CSS从JS中抽离：通过JS修改CSS样式时，使用className或classList，不要逐条修改style样式


```
//不好的做法一
ele.style.color = 'red';
ele.style.left= '10px';
//不好的做法二
ele.style.cssText ='color:red;left:10px;';
```


```
.reveal{color:red;left:10px;}
//好的做法一
ele.className += 'reveal';
//好的做法二
ele.classList.add('reveal');
```


&emsp;&emsp;3、将JS从HTML中抽离：从JS文件放入外置文件中

&emsp;&emsp;4、将HTML从JS中抽离：不要在innerHTML中拼接DOM结构，而是使用字符串模板，如handlerbars

&nbsp;

### 全局变量

&emsp;&emsp;创建全局变量被认为是糟糕的实践，尤其在团队开发的大背景下更是问题多多。随着代码量的增长，全局变量会导致一些非常重要的可维护性难题，全局变量越多，引入错误的概率会变得越高

&emsp;&emsp;一般而言，有如下三种解决办法

&emsp;&emsp;1、零全局变量

&emsp;&emsp;实现方法是使用一个立即调用函数[IIFE](http://www.cnblogs.com/xiaohuochai/p/5731016.html)并将所有脚本放置其中


```
(function(){
  var doc = win.document;
})(window);
```


&emsp;&emsp;这种模式的使用场景有限，只要代码需要被其他的代码所依赖，或者需要在运行中被不断扩展或修改，就不能使用这种方式

&emsp;&emsp;2、单全局变量和[命名空间](http://www.cnblogs.com/xiaohuochai/p/8253544.html#anchor5)

&emsp;&emsp;依赖尽可能少的全局变量，即只创建一个全局变量，使用单变量模式，如YUI或jQuery

&emsp;&emsp;单全局变量，即所创建的这个唯一全局对象名是独一无二的，并将所有的功能代码都挂载到这个全局对象上。因此，每个可能的全局变量，都成为唯一全局变量的属性，从而不会创建多个全局变量

&emsp;&emsp;命名空间是简单的通过全局对象的单一属性表示的功能性分组。比如Y.DOM下的所有方法都是和DOM操作相关的，Y.Event下的所有方法都是和事件相关的。常见的约定是每个文件中都通过新的全局对象来声明自己的命名空间

&emsp;&emsp;3、使用[模块](http://www.cnblogs.com/xiaohuochai/p/7272324.html)

&emsp;&emsp;模块是一种通用的功能片段，它并没有创建新的全局变量或命名空间。相反，所有的这些代码都存放于一个表示执行一个任务或发布一个接口的单函数中。可以用一个名称来表示这个模块，同样这个模块可以依赖其他模块

&nbsp;

### 事件处理

&emsp;&emsp;将事件处理相关的代码和事件环境耦合在一起，导致可维护性很糟糕

&emsp;&emsp;1、隔离应用逻辑

&emsp;&emsp;将应用逻辑从所有事件处理程序中抽离出来是一种最佳实践，将应用逻辑和事件处理的代码拆分开来


```
//不好的做法
function handleClick(event){
  var popup = document.getElementById('popup');
  popup.style.left = event.clientX + 'px';
  popup.style.top = event.clientY + 'px';
  popup.className = 'reveal';
}
addListener(element,'click',handleClick);

//好的做法
var MyApplication = {
  handleClick: function(event){
    this.showPopup(event);
  },
  showPopup: function(event){
    var popup = document.getElementById('popup');
    popup.style.left = event.clientX + 'px';
    popup.style.top = event.clientY + 'px';
    popup.className = 'reveal';
  }
};
addListener(element,'click',function(event){
  MyApplication.handleClick(event);
});
```


&emsp;&emsp;2、不要分发事件对象

&emsp;&emsp;应用逻辑不应当依赖于event对象来正确完成功能，方法接口应该表明哪些数据是必要的。代码不清晰就会导致bug。最好的办法是让事件处理程序使用event对象来处理事件，然后拿到所有需要的数据传给应用逻辑


```
//改进的做法
var MyApplication = {
  handleClick: function(event){
    this.showPopup(event.clientX,event.clientY);
  },
  showPopup: function(x,y){
    var popup = document.getElementById('popup');
    popup.style.left = x + 'px';
    popup.style.top = y + 'px';
    popup.className = 'reveal';
  }
};
addListener(element,'click',function(event){
  MyApplication.handleClick(event);
});
```


&emsp;&emsp;当处理事件时，最好让事件程序成为接触到event对象的唯一的函数。事件处理程序应当在进入应用逻辑之前针对event对象执行任何必要的操作，包括阻止事件冒泡，都应当直接包含在事件处理程序中


```
//改进的做法
var MyApplication = {
  handleClick: function(event){
    event.preventDefault();
    event.stopPropagation();
    this.showPopup(event.clientX,event.clientY);
  },
  showPopup: function(x,y){
    var popup = document.getElementById('popup');
    popup.style.left = x + 'px';
    popup.style.top = y + 'px';
    popup.className = 'reveal';
  }
};
addListener(element,'click',function(event){
  MyApplication.handleClick(event);
});
```


&nbsp;

### 配置数据

&emsp;&emsp;代码无非是定义一些指令的集合让计算机来执行。我们常常将数据传入计算机，由指令对数据进行操作，并最终产生一个结果。当不得不修改数据时，可能会带来一些不必要的风险。应当将关键数据从代码中抽离出来&nbsp;

&emsp;&emsp;配置数据是指导在应用中写死的值，且将来可能会被修改，包括如下内容


```
1、URL
2、需要展现给用户的字符串
3、重复的值
4、配置项
5、任何可能发生变更的值
```


&emsp;&emsp;下面是未处理配置数据的做法


```
//不好的做法
function validate(value){
  if(!value){
    alert('Invalid value');
    location.href="/errors/invalid.php";
  }
}
function toggleSelected(element){
  if(hasClass(element,'selected')){
    removeClass(element,'selected');
  }else{
    addClass(element,'selected');
  }
}
```


&emsp;&emsp;下面代码中将配置数据保存在了config对象中，config对象的每个属性都保存了一个数据片段，每个属性名都有前缀，用以表明数据的类型(MSG表示展现给用户的信息，URL表示网络地址，CSS表示这是一个className)。当然，也可以将整个config对象放到单独的文件中，这样对配置数据的修改可以完全和使用这个数据的代码隔离开来


```
//好的做法
var config = {
  MSG_INVALID_VALUE: 'Invalid value',
  URL_INVALID:'/errors/invalid.php',
  CSS_SELECTED:'selected'
}
function validate(value){
  if(!value){
    alert(config.MSG_INVALID_VALUE);
    location.href=config.URL_INVALID;
  }
}
function toggleSelected(element){
  if(hasClass(element,config.CSS_SELECTED)){
    removeClass(element,config.CSS_SELECTED);
  }else{
    addClass(element,config.CSS_SELECTED);
  }
}
```


&nbsp;

### 选择器优化

&emsp;&emsp;将选择器选择到的元素作为对象的静态属性集中到一个地方统一管理


```
initializeElements: function() {
    var eles = app.Eles;
    for (var name in eles) {
        if (eles.hasOwnProperty(name)) {
            this[name] = $(eles[name]);
        }
    }
}
```


&emsp;&emsp;下面是一个例子


```
//好的做法
app.Eles = {
    widgetDiv: ".left-widget div",
    inputResize: '.input-resize',
    hr: '.hr',
    txt: '.input-group-btn button',
    cus: '#paper-type-cus',
    hid: '#hidden',
    mainCon: '#mainCon',
    rulerX: '.ruler-x',
    rulerY: '.ruler-y',
};
```


&nbsp;

### 函数优化

【提炼函数】

&emsp;&emsp;在javascript开发中，大部分时间都在与函数打交道，所以希望这些函数有着良好的命名，函数体内包含的逻辑清晰明了。如果一个函数过长，不得不加上若干注释才能让这个函数显得易读一些，那这些函数就很有必要进行重构

&emsp;&emsp;如果在函数中有一段代码可以被独立出来，那最好把这些代码放进另外一个独立的函数中。这是一种很常见的优化工作，这样做的好处主要有以下几点

&emsp;&emsp;1、避免出现超大函数

&emsp;&emsp;2、独立出来的函数有助于代码复用

&emsp;&emsp;3、独立出来的函数更容易被覆写

&emsp;&emsp;4、独立出来的函数如果拥有一个良好的命名，它本身就起到了注释的作用

&emsp;&emsp;比如在一个负责取得用户信息的函数里面，还需要打印跟用户信息有关的log，那么打印log的语句就可以被封装在一个独立的函数里：


```
var getUserInfo = function(){
    ajax( 'http:// xxx.com/userInfo', function( data ){
        console.log( 'userId: ' + data.userId );
        console.log( 'userName: ' + data.userName );
        console.log( 'nickName: ' + data.nickName );
    });
};
//改成：
var getUserInfo = function(){
    ajax( 'http:// xxx.com/userInfo', function( data ){
        printDetails( data );
    });
};
var printDetails = function( data ){
    console.log( 'userId: ' + data.userId );
    console.log( 'userName: ' + data.userName );
    console.log( 'nickName: ' + data.nickName );
};
```


【尽量减少参数数量】

&emsp;&emsp;如果调用一个函数时需要传入多个参数，那这个函数是让人望而生畏的，必须搞清楚这些参数代表的含义，必须小心翼翼地把它们按照顺序传入该函数。在实际开发中，向函数传递参数不可避免，但应该尽量减少函数接收的参数数量。下面举个非常简单的示例。有一个画图函数draw，它现在只能绘制正方形，接收了3个参数，分别是图形的width、heigth以及square：


```
var draw = function(width,height,square){};
```


&emsp;&emsp;但实际上正方形的面积是可以通过width和height计算出来的，于是我们可以把参数square从draw函数中去掉：


```
var draw = function( width, height ){
    var square = width * height;
};
```


&emsp;&emsp;假设以后这个draw函数开始支持绘制圆形，需要把参数width和height换成半径radius，但图形的面积square始终不应该由客户传入，而是应该在draw函数内部，由传入的参数加上一定的规则计算得来。此时，可以使用策略模式，让draw函数成为一个支持绘制多种图形的函数

【传递对象参数代替过长的参数列表】&nbsp;

&emsp;&emsp;有时候一个函数有可能接收多个参数，而参数的数量越多，函数就越难理解和使用。使用该函数的人首先得搞明白全部参数的含义，在使用的时候，还要小心翼翼，以免少传了某个参数或者把两个参数搞反了位置。如果想在第3个参数和第4个参数之中增加一个新的参数，就会涉及许多代码的修改，代码如下：


```
var setUserInfo = function( id, name, address, sex, mobile, qq ){
    console.log( 'id= ' + id );
    console.log( 'name= ' +name );
    console.log( 'address= ' + address );
    console.log( 'sex= ' + sex );
    console.log( 'mobile= ' + mobile );
    console.log( 'qq= ' + qq );
};
setUserInfo( 1314, 'xiaohuochai', 'beijing', 'male', '150********', 121631835 );
```


&emsp;&emsp;这时可以把参数都放入一个对象内，然后把该对象传入setUserInfo函数，setUserInfo函数需要的数据可以自行从该对象里获取。现在不用再关心参数的数量和顺序，只要保证参数对应的key值不变就可以了：


```
    var setUserInfo = function( obj ){
        console.log( 'id= ' + obj.id );
        console.log( 'name= ' + obj.name );
        console.log( 'address= ' + obj.address );
        console.log( 'sex= ' + obj.sex );
        console.log( 'mobile= ' + obj.mobile );
        console.log( 'qq= ' + obj.qq );
    };
    setUserInfo({
        id: 1314,
        name: 'xiaohuochai',
        address: 'beijing',
        sex: 'male',
        mobile: '150********',
        qq: 121631835
    });
    
  ```


&nbsp;

### 条件优化

【合并条件片段】

&emsp;&emsp;如果一个函数体内有一些条件分支语句，而这些条件分支语句内部散布了一些重复的代码，那么就有必要进行合并去重工作。假如有一个分页函数paging，该函数接收一个参数currPage，currPage表示即将跳转的页码。在跳转之前，为防止currPage传入过小或者过大的数字，要手动对它的值进行修正，详见如下伪代码：


```
var paging = function( currPage ){
    if ( currPage &lt;= 0 ){
        currPage = 0;
        jump( currPage ); // 跳转
    }else if ( currPage &gt;= totalPage ){
        currPage = totalPage;
        jump( currPage ); // 跳转
    }else{
        jump( currPage ); // 跳转
    }
};
```


&emsp;&emsp;可以看到，负责跳转的代码jump(currPage)在每个条件分支内都出现了，所以完全可以把这句代码独立出来：


```
var paging = function( currPage ){
    if ( currPage &lt;= 0 ){
        currPage = 0;
    }else if ( currPage &gt;= totalPage ){
        currPage = totalPage;
    }
    jump( currPage ); // 把jump 函数独立出来
};
```


【把条件分支语句提炼成函数】

&emsp;&emsp;在程序设计中，复杂的条件分支语句是导致程序难以阅读和理解的重要原因，而且容易导致一个庞大的函数。假设现在有一个需求是编写一个计算商品价格的getPrice函数，商品的计算只有一个规则：如果当前正处于夏季，那么全部商品将以8折出售。代码如下：


```
var getPrice = function( price ){
    var date = new Date();
    if ( date.getMonth() &gt;= 6 &amp;&amp; date.getMonth() &lt;= 9 ){ // 夏天
        return price * 0.8;
    }
    return price;
};
```


&emsp;&emsp;观察这句代码：


```
date.getMonth()&gt;=6&amp;&amp;date.getMonth()&lt;=9
```


&emsp;&emsp;这句代码要表达的意思很简单，就是判断当前是否正处于夏天（7~10月）。尽管这句代码很短小，但代码表达的意图和代码自身还存在一些距离，阅读代码的人必须要多花一些精力才能明白它传达的意图。其实可以把这句代码提炼成一个单独的函数，既能更准确地表达代码的意思，函数名本身又能起到注释的作用。代码如下：


```
var isSummer = function(){
    var date = new Date();
    return date.getMonth() &gt;= 6 &amp;&amp; date.getMonth() &lt;= 9;
};

var getPrice = function( price ){
    if ( isSummer() ){ // 夏天
        return price * 0.8;
    }
    return price;
};
```


【提前让函数退出代替嵌套条件分支】

&emsp;&emsp;许多程序员都有这样一种观念：&ldquo;每个函数只能有一个入口和一个出口。&rdquo;现代编程语言都会限制函数只有一个入口。但关于&ldquo;函数只有一个出口&rdquo;，往往会有一些不同的看法。下面这段伪代码是遵守&ldquo;函数只有一个出口的&rdquo;的典型代码：


```
var del = function( obj ){
    var ret;
    if ( !obj.isReadOnly ){ // 不为只读的才能被删除
        if ( obj.isFolder ){ // 如果是文件夹
            ret = deleteFolder( obj );
        }else if ( obj.isFile ){ // 如果是文件
            ret = deleteFile( obj );
        }
    }
    return ret;
};
```


&emsp;&emsp;嵌套的条件分支语句绝对是代码维护者的噩梦，对于阅读代码的人来说，嵌套的if、else语句相比平铺的if、else，在阅读和理解上更加困难。嵌套的条件分支往往是由一些深信&ldquo;每个函数只能有一个出口的&rdquo;程序员写出的。但实际上，如果对函数的剩余部分不感兴趣，那就应该立即退出。引导阅读者去看一些没有用的else片段，只会妨碍他们对程序的理解

&emsp;&emsp;于是可以挑选一些条件分支，在进入这些条件分支之后，就立即让这个函数退出。要做到这一点，有一个常见的技巧，即在面对一个嵌套的if分支时，可以把外层if表达式进行反转。重构后的del函数如下：


```
var del = function( obj ){
    if ( obj.isReadOnly ){ // 反转if 表达式
        return;
    }
    if ( obj.isFolder ){
        return deleteFolder( obj );
    }
    if ( obj.isFile ){
        return deleteFile( obj );
    }
};
```


### 循环优化

【合理使用循环】

&emsp;&emsp;在函数体内，如果有些代码实际上负责的是一些重复性的工作，那么合理利用循环不仅可以完成同样的功能，还可以使代码量更少。下面有一段创建XHR对象的代码，为了简化示例，只考虑版本9以下的IE浏览器，代码如下：


```
var createXHR = function(){
    var xhr;
    try{
        xhr = new ActiveXObject( 'MSXML2.XMLHttp.6.0' );
    }catch(e){
        try{
            xhr = new ActiveXObject( 'MSXML2.XMLHttp.3.0' );
        }catch(e){
            xhr = new ActiveXObject( 'MSXML2.XMLHttp' );
        }
    }
    return xhr;
};
var xhr = createXHR();

```


&emsp;&emsp;下面灵活地运用循环，可以得到跟上面代码一样的效果：


```
//下面我们灵活地运用循环，可以得到跟上面代码一样的效果：
var createXHR = function(){
    var versions= [ 'MSXML2.XMLHttp.6.0ddd', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp' ];
    for ( var i = 0, version; version = versions[ i++ ]; ){
        try{
            return new ActiveXObject( version );
        }catch(e){
        }
    }
};
var xhr = createXHR();
```


【用return退出多重循环】

&emsp;&emsp;假设在函数体内有一个两重循环语句，需要在内层循环中判断，当达到某个临界条件时退出外层的循环。大多数时候会引入一个控制标记变量：


```
var func = function(){
    var flag = false;
    for ( var i = 0; i &lt; 10; i++ ){
        for ( var j = 0; j &lt; 10; j++ ){
            if ( i * j &gt;30 ){
                flag = true;
                break;
            }
        }
        if ( flag === true ){
            break;
        }
    }
};
```


&emsp;&emsp;第二种做法是设置循环标记：


```
var func = function(){
    outerloop:
    for ( var i = 0; i &lt; 10; i++ ){
        innerloop:
        for ( var j = 0; j &lt; 10; j++ ){
            if ( i * j &gt;30 ){
                break outerloop;
            }
        }
    }
};
```


&emsp;&emsp;这两种做法无疑都让人头晕目眩，更简单的做法是在需要中止循环的时候直接退出整个方法：


```
var func = function(){
    for ( var i = 0; i &lt; 10; i++ ){
        for ( var j = 0; j &lt; 10; j++ ){
            if ( i * j &gt;30 ){
                return;
            }
        }
    }
};
```


&emsp;&emsp;当然用return直接退出方法会带来一个问题，如果在循环之后还有一些将被执行的代码呢？如果提前退出了整个方法，这些代码就得不到被执行的机会：


```
var func = function(){
    for ( var i = 0; i &lt; 10; i++ ){
        for ( var j = 0; j &lt; 10; j++ ){
            if ( i * j &gt;30 ){
                return;
            }
        }
    }
    console.log( i ); // 这句代码没有机会被执行
};
```


&emsp;&emsp;为了解决这个问题，可以把循环后面的代码放到return后面，如果代码比较多，就应该把它们提炼成一个单独的函数：


```
var print = function( i ){
    console.log( i );
};
var func = function(){
    for ( var i = 0; i &lt; 10; i++ ){
        for ( var j = 0; j &lt; 10; j++ ){
            if ( i * j &gt;30 ){
                return print( i );
            }
        }
    }
};
func();
```


