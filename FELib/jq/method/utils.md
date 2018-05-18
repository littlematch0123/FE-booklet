# jQuery工具方法

&emsp;&emsp;jQuery提供一些与元素无关的工具方法，不必选中元素，就可以直接使用这些方法。如果理解原生javascript的继承原理，那么就能理解工具方法的实质。它是定义在jQuery构造函数上的方法，即jQuery.method()，所以可以直接使用。而那些操作元素的方法，是定义在构造函数的prototype对象上的方法，即jQuery.prototype.method()，所以必须生成实例(即选中元素)后使用。把工具方法理解成像javascript原生函数那样可以直接使用的方法就行了。下面将详细介绍jQuery的常用工具方法

&nbsp;

### 元素相关

【each()】

&emsp;&emsp;它是一个通用的迭代函数，可以用来无缝迭代对象和数组。数组和类似数组的对象通过一个长度属性（如一个函数的参数对象）来迭代数字索引，从0到 length - 1。其他对象通过其属性名进行迭代

<div>
<pre>jQuery.each( collection, callback(indexInArray, valueOfElement) )</pre>
</div>

&emsp;&emsp;jQuery.each()函数和 jQuery(selector).each()不一样，后者专门用来遍历一个jQuery对象。jQuery.each()函数可用于迭代任何集合，无论是&ldquo;名/值&rdquo;对象（JavaScript对象）或数组。在迭代数组的情况下，回调函数每次传递一个数组索引和相应的数组值作为参数。（该值也可以通过访问this关键字得到，但是JavaScript将始终将this值作为一个Object ，即使它是一个简单的字符串或数字值。）该方法返回其第一个参数，这是迭代的对象

<div>
<pre>$.each( ['a','b','c'], function(index,value){
    //Index #0: a
    //Index #1: b
    //Index #2: c
    console.log( "Index #" + index + ": " + value );
});</pre>
</div>
<div>
<pre>$.each( { name: "John", lang: "JS" }, function(index,value){
    //Index #name: John
    //Index #lang: JS
    console.log( "Index #" + index + ": " + value );
});</pre>
</div>

【contains()】

&nbsp;&emsp;&emsp;检查一个DOM元素是另一个DOM元素的后代

<div>
<pre>jQuery.contains( container, contained )</pre>
</div>
<div>
<pre>$.contains( document.documentElement, document.body ); // true</pre>
</div>

【extend()】

&emsp;&emsp;将两个或更多对象的内容合并到第一个对象

<div>
<pre>jQuery.extend( target [, object1 ] [, objectN ] )

target: Object 一个对象，如果附加的对象被传递给这个方法将那么它将接收新的属性，如果它是唯一的参数将扩展jQuery的命名空间。
object1: Object 一个对象，它包含额外的属性合并到第一个参数
objectN: Object 包含额外的属性合并到第一个参数</pre>
</div>
<div>
<pre>$.extend({}, object1, object2);</pre>
</div>
<div>
<pre>jQuery.extend( [deep ], target, object1 [, objectN ] )
deep: Boolean 如果是true，合并成为递归（又叫做深拷贝）。
target: Object 对象扩展。这将接收新的属性。
object1: Object 一个对象，它包含额外的属性合并到第一个参数.
objectN: Object 包含额外的属性合并到第一个参数</pre>
</div>
<div>
<pre>$.extend(true, object1, object2);</pre>
</div>

&nbsp;

### 数据相关

【data()】

&emsp;&emsp;存储任意数据到指定的元素并且/或者返回设置的值

<div>
<pre>jQuery.data( element, key, value )
jQuery.data( element, key )
jQuery.data( element )</pre>
</div>
<div>
<pre>element:Element 要关联数据的DOM对象
key: String 存储的数据名
value:Object 新数据值</pre>
</div>
<div>
<pre>$.data(document.body, 'foo', 52);
$.data(document.body, 'bar', 'test');
console.log($.data( document.body, 'foo' ));//52
console.log($.data( document.body ));//{foo: 52, bar: "test"}</pre>
</div>

【removeData()】

&emsp;&emsp;删除一个先前存储的数据片段

<div>
<pre>jQuery.removeData( element [, name ] )</pre>
</div>
<div>
<pre>var div = $("div");
$.data(div, "test1", "VALUE-1");
$.data(div, "test2", "VALUE-2");
console.log($.data(div));//{test1: "VALUE-1", test2: "VALUE-2"}
$.removeData(div, "test1");
console.log($.data(div));//{test2: "VALUE-2"}</pre>
</div>

&nbsp;

### 类型检测

【type()】

&emsp;&emsp;type()方法用于检测javascript对象的类型

&emsp;&emsp;如果对象是undefined或null，则返回相应的&ldquo;undefined&rdquo;或&ldquo;null&rdquo;

<div>
<pre>jQuery.type( undefined ) === "undefined"
jQuery.type() === "undefined"
jQuery.type( window.notDefined ) === "undefined"
jQuery.type( null ) === "null"</pre>
</div>

&emsp;&emsp;如果对象有一个内部的[[Class]]和一个浏览器的内置对象的 [[Class]] 相同，返回相应的 [[Class]] 名字

<div>
<pre>jQuery.type( true ) === "boolean"
jQuery.type( 3 ) === "number"
jQuery.type( "test" ) === "string"
jQuery.type( function(){} ) === "function"
jQuery.type( [] ) === "array"
jQuery.type( new Date() ) === "date"
jQuery.type( new Error() ) === "error" 
jQuery.type( /test/ ) === "regexp"</pre>
</div>

&emsp;&emsp;所以该方法类似于原生javascript中经过封装的[Object.prototype.toString()方法](http://www.cnblogs.com/xiaohuochai/p/5744363.html#anchor4)

<div>
<pre>function type(obj){
    return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase();
}</pre>
</div>

【isArray()】

&emsp;&emsp;在原生javascript中，[数组检测](http://www.cnblogs.com/xiaohuochai/p/5680833.html)是一个经典问题，当出现网页中包含多个框架的场景时，数组检测就不再容易

&emsp;&emsp;jQuery提供了isArray()方法用来检测数组

<div>
<pre>console.log($.isArray([]));//true</pre>
</div>

【isFunction()】

&emsp;&emsp;isFunction()方法用来检测传入的参数是否为函数

<div>
<pre>console.log($.isFunction(function(){}));//true</pre>
</div>

&emsp;&emsp;如果使用原生javascript，使用[typeof](http://www.cnblogs.com/xiaohuochai/p/5744363.html#anchor1)即可实现

<div>
<pre>console.log(typeof function(){});//"function"</pre>
</div>

【isNumeric()】

&emsp;&emsp;isNumeric()方法用来检测传入的参数是否为数字

&emsp;&emsp;注意：参数为纯数字或数字字符串都可以

<div>
<pre>$.isNumeric("-10");  // true
$.isNumeric(-10);  // true</pre>
</div>

&emsp;&emsp;如果使用原生javascript，使用typeof即可实现，但结果稍有不同

<div>
<pre>console.log(typeof 10);//"number"
console.log(typeof '10');//"string"</pre>
</div>

【isEmptyObject()】

&emsp;&emsp;isEmptyObject()方法用来检测一个对象是否为空对象

<div>
<pre>jQuery.isEmptyObject({}) // true
jQuery.isEmptyObject({ foo: "bar" }) // false</pre>
</div>

【isPlainObject()】

&emsp;&emsp;isPlainObject()方法用来检测一个对象是否是原生对象，即通过 "{}" 或者 "new Object" 创建的对象

<div>
<pre>console.log($.isPlainObject({}));//true
console.log($.isPlainObject(document.documentElement));//false
console.log($.isPlainObject(new Boolean(true)));//false
console.log($.isPlainObject(true));//false</pre>
</div>

&nbsp;

### 数组相关

【inArray()】

&emsp;&emsp;inArray(value, array [, fromIndex ])方法类似于原生javascript的[indexOf()方法](http://www.cnblogs.com/xiaohuochai/p/5682621.html#anchor8)，没有找到匹配元素时它返回-1。如果数组第一个元素匹配参数，那么$.inArray()返回0

&emsp;&emsp;参数fromIndex是数组索引值，表示从哪里在开始查找。默认值是0

<div>
<pre>var arr = [1,2,3,'1','2','3'];
console.log(arr.indexOf('2'));//4
console.log(arr.indexOf(3));//2
console.log(arr.indexOf(0));//-1
var arr = [1,2,3,'1','2','3'];
console.log($.inArray('2',arr));//4
console.log($.inArray(3,arr));//2
console.log($.inArray(0,arr));//-1</pre>
</div>

【makeArray()】

&emsp;&emsp;makeArray()方法用于将一个类数组对象转换为真正的javascript数组

<div>
<pre>console.log($.isArray({ 0: 'a', 1: 'b', length: 2 }));//false
console.log($.isArray($.makeArray({ 0: 'a', 1: 'b', length: 2 })));//true</pre>
</div>

&emsp;&emsp;如果使用原生javascript，可以使用[slice()](http://www.cnblogs.com/xiaohuochai/p/5682621.html#anchor6)方法将类数组对象变成真正的数组

<div>
<pre>var arr = Array.prototype.slice.call(arrayLike);
Array.prototype.slice.call({ 0: 'a', 1: 'b', length: 2 })// ['a', 'b']
Array.prototype.slice.call(document.querySelectorAll("div"));
Array.prototype.slice.call(arguments);</pre>
</div>

【unique()】

&emsp;&emsp;unique()方法用于数组去重

<div>
<pre>var $arr = [document.body,document.body];
console.log($.unique($arr));//[body]
var $arr = [1,2,1];
console.log($.unique($arr));//[2,1]</pre>
</div>

&emsp;&emsp;使用原生javascript实现如下

<div>
<pre>Array.prototype.norepeat = function(){
    var result = [];
    for(var i = 0; i &lt; this.length; i++){
        if(result.indexOf(this[i]) == -1){
            result.push(this[i]);
        }
    }
    return result;
}</pre>
</div>
<div>
<pre>var arr = [1,2,1];
console.log(arr.norepeat());//[1,2]
var arr = [document.body,document.body];
console.log(arr.norepeat());//[body]</pre>
</div>

【grep()】

&emsp;&emsp;查找满足过滤函数的数组元素。原始数组不受影响

<div>
<pre>jQuery.grep( array, function(elementOfArray, indexInArray) [, invert ] )
array: Array 用于查询元素的数组。
function: Function() 该函数来处理每项元素的比对。第一个参数是正在被检查的数组的元素，第二个参数是该元素的索引值。该函数应返回一个布尔值。this将是全局的window对象。
invert: Boolean 如果&ldquo;invert&rdquo;为false，或没有提供，函数返回一个&ldquo;callback&rdquo;中返回true的所有元素组成的数组，。如果&ldquo;invert&rdquo;为true，函数返回一个&ldquo;callback&rdquo;中返回false的所有元素组成的数组。</pre>
</div>

&emsp;&emsp;$.grep()方法会删除数组必要的元素，以使所有剩余元素通过过滤函数的检查。该测试是一个函数传递一个数组元素和该数组内这个的索引值。只有当测试返回true，该数组元素将返回到结果数组中。

&emsp;&emsp;该过滤器的函数将被传递两个参数：当前正在被检查的数组中的元素，及该元素的索引值。该过滤器函数必须返回'true'以包含在结果数组项

<div>
<pre>var result = $.grep( [0,1,2], function(n,i){
   return n &gt; 0;
 });
console.log(result);//[1, 2]</pre>
</div>
<div>
<pre>var result = $.grep( [0,1,2], function(n,i){
   return n &gt; 0;
 },true);
console.log(result);//[0]</pre>
</div>

【merge()】

&emsp;&emsp;合并两个数组内容到第一个数组

<div>
<pre>jQuery.merge( first, second )</pre>
</div>
<div>
<pre>console.log($.merge( [0,1,2], [2,3,4] ));//[0, 1, 2, 2, 3, 4]</pre>
</div>

&nbsp;

### 其他

【proxy()】

&emsp;&emsp;proxy()方法接受一个函数，然后返回一个新函数，并且这个新函数使用指定的this

&emsp;&emsp;proxy()方法类似于bind()，但并不相同。区别在于，bind()方法是改变原函数的this指向，而proxy()方法是新建一个函数，并使用参数中的this指向，原函数的this指向并无变化

<div>
<pre>var a = 0;
function foo(){
    console.log(this.a);
}
var obj = {
    a:2
};
foo();//0
$.proxy(foo,obj)();//2
foo();//0</pre>
</div>

&emsp;&emsp;proxy()方法支持多种参数传递方式

<div>
<pre>function foo(a,b){
    console.log(a+b);   
}
$.proxy(foo,document)(1,2);//3
$.proxy(foo,document,1,2)();//3
$.proxy(foo,document,1)(2);//3</pre>
</div>

&emsp;&emsp;在绑定事件时一定要合理使用proxy()方法的参数传递方式，否则事件还没有发生，可能函数已经被调用了

<div>
<pre>$(document).click($.proxy(foo,window,1,2))</pre>
</div>

【trim()】

&emsp;&emsp;jQuery.trim()函数用于去除字符串两端的空白字符

&emsp;&emsp;这个函数很简单，没有多余的参数用法

<div>
<pre>console.log($.trim("    hello, how are you?    "));//'hello, how are you?'</pre>
</div>

&nbsp;【noop()】

&emsp;&emsp;一个空函数

<div>
<pre>jQuery.noop() 此方法不接受任何参数</pre>
</div>

&emsp;&emsp;当你仅仅想要传递一个空函数的时候，就用他吧

&emsp;&emsp;这对一些插件作者很有用，当插件提供了一个可选的回调函数接口，那么如果调用的时候没有传递这个回调函数，就用jQuery.noop来代替执行

【now()】

&emsp;&emsp;返回一个数字，表示当前时间

<div>
<pre>jQuery.now() 这个方法不接受任何参数</pre>
</div>

&emsp;&emsp;$.now()方法是表达式(new Date).getTime()返回数值的一个简写

【parseHTML()】

&emsp;&emsp;将字符串解析到一个DOM节点的数组中

<div>
<pre>jQuery.parseHTML( data [, context ] [, keepScripts ] )
data : String 用来解析的HTML字符串
context (默认: document): Element DOM元素的上下文，在这个上下文中将创建的HTML片段。
keepScripts (默认: false): Boolean 一个布尔值，表明是否在传递的HTML字符串中包含脚本。</pre>
</div>

&emsp;&emsp;`jQuery.parseHTML`&nbsp;使用原生的DOM元素的创建函数将字符串转换为一组DOM元素，然后，可以插入到文档中。

&emsp;&emsp;默认情况下，如果没有指定或给定`null`&nbsp;or&nbsp;`undefined`，`context`是当前的`document`。如果HTML被用在另一个document中，比如一个iframe，该frame的文件可以使用

<div>
<pre>var result = $.parseHTML( "hello, my name is jQuery");
$('div').append(result);</pre>
</div>

【parseJSON()】

&emsp;&emsp;接受一个标准格式的 JSON 字符串，并返回解析后的 JavaScript 对象

<div>
<pre>jQuery.parseJSON( json )</pre>
</div>
<div>
<pre>var obj = jQuery.parseJSON('{"name":"John"}');
console.log(obj.name === "John");//true</pre>
</div>

&nbsp;