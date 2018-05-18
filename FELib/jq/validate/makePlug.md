# 编写jQuery插件

&emsp;&emsp;编写插件的目的是给已经有的一系列方法或函数做一个封装，以便在其他地方重复使用，提高开发效率和方便后期维护。本文将详细介绍如何编写jQuery插件

&nbsp;

### 类型

&emsp;&emsp;jQuery的插件主要分为3种类型

&emsp;&emsp;1、封装对象方法

&emsp;&emsp;这种插件是将对象方法封装起来，用于对通过选择器获取的jQuery对象进行操作，是最常见的一种插件。此类插件可以发挥出jQuery选择器的强大优势，有相当一部分的jQuery的方法，都是在jQuery脚本库内部通过这种形式&ldquo;插&rdquo;在内核上的，例如：parent()方法、appendTo()方法等。这些方法在现在来看都是jQuery本身自带的方法了。平时，我们是可以直接拿来就用的，只需引入jQuery库就行

&emsp;&emsp;2、封装全局函数

&emsp;&emsp;可以将独立的函数加到jQuery命名空间下，如常用的jQuery.ajax()、去首尾空格的jQuery.trim()方法等，都是jQuery内部作为全局函数的插件附加到内核上去的

&emsp;&emsp;3、选择器插件

&emsp;&emsp;虽然jQuery的选择器十分强大，但是在少数情况下，还是会需要用到选择器插件来扩充一些自己喜欢的选择器

&nbsp;

### 要点

&emsp;&emsp;1、jQuery插件的文件名推荐命名为jQuery.[插件名].js，以免和其他JS库插件混淆

&emsp;&emsp;2、所有的对象方法都应当附加到jQuery.fn对象上，而所有的全局函数都应当附加到jQuery对象本身上

&emsp;&emsp;3、在插件内部的this指向的是当前通过选择器获取的jQuery对象，而不像一般方法那样，如click，内部的this指向的是DOM元素

&emsp;&emsp;4、可以通过this.each来遍历所有的元素

&emsp;&emsp;5、所有的方法或函数插件，都应当以分号结尾。否则压缩的时候可能出现问题。为了稳妥些，甚至可以在插件头部先加上一个分号，以免他人不规范的代码影响自身的插件代码

&emsp;&emsp;6、插件应该返回一个jQuery对象，以保证插件的可链式操作

&emsp;&emsp;7、避免在插件内部使用$作为jQuery对象的别名，而应使用完整的jQuery来表示，避免冲突。当然，也可以利用闭包来回避这种问题，使插件内部继续使用$作为jQuery的别名

&nbsp;

### 闭包

&emsp;&emsp;利用闭包的特性，即可以避免内部临时变量影响全局空间，又可以在插件内容继续使用$作为jQuery的别名。常见的jQuery插件都是以下这种形式的:

<div>
<pre>(function(){
   /*这里放置代码*/ 
})();</pre>
</div>

&emsp;&emsp;首先定义一个匿名函数`function(){/*这里放置代码*/}`，然后用括号括起来，变成`(function(){/*这里放置代码*/})`这种形式，最后通过()这个运算符来执行。可以传递参数进行，以供内部函数使用

<div>
<pre>//为了更好的兼容性，开始前有个分号
;(function($){        //此处将$作为匿名函数的形参
    /*这里放置代码，可以使用$作为jQuery的缩写别名*/
})(jQuery);            //这里就将jQuery作为实参传递给匿名函数了</pre>
</div>

&emsp;&emsp;上面的代码是一种常见的jQuery插件的结构

&nbsp;

### 插件机制

&emsp;&emsp;jQuery提供了两个用于拓展jQuery功能的方法，即jQuery.fn.extend()方法和jQuery.extend()方法。jQuery.fn.extend()方法用于拓展封装对象方法的插件，jQuery.extend()方法用于拓展封装全局函数的插件和选择器插件。这两个方法都接受一个参数，类型为Object。Object对象的"名/值对"分别代表"函数或方法名/函数主体"

【jQuery.fn.extend()】

&emsp;&emsp;jQuery.fn.extend()方法用于将一个对象的内容合并到jQuery的原型，以提供新的jQuery实例方法

<div>
<pre>&lt;label&gt;&lt;input type="checkbox" name="foo"&gt; Foo&lt;/label&gt;
&lt;label&gt;&lt;input type="checkbox" name="bar"&gt; Bar&lt;/label&gt;
&lt;button id="btn1"&gt;全选&lt;/button&gt;
&lt;button id="btn2"&gt;全不选&lt;/button&gt;
&lt;script&gt;
jQuery.fn.extend({
  check: function() {
    return this.each(function() { this.checked = true; });
  },
  uncheck: function() {
    return this.each(function() { this.checked = false; });
  }
});
$('#btn1').click(function(){
  $( "input[type='checkbox']" ).check();
});
$('#btn2').click(function(){
  $( "input[type='checkbox']" ).uncheck();
});
&lt;/script&gt;  </pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/extend/e1.html" frameborder="0" width="320" height="240"></iframe>

【jQuery.extend()】

&emsp;&emsp;jQuery.extend()方法用一个或多个其他对象来扩展一个对象，然后返回被扩展的对象

<div>
<pre>jQuery.extend( target [, object1 ] [, objectN ] )</pre>
</div>

&emsp;&emsp;例如，合并settings对象和options对象，修改并返回settings对象

<div>
<pre>var settings = {validate:false,limit:5,name:"foo"};
var options = {validate:true,name:"bar"};
var newOptions = jQuery.extend(settings,options);
console.log(newOptions);//Object {validate: true, limit: 5, name: "bar"}</pre>
</div>

&emsp;&emsp;jQuery.extend()方法经常被用于设置插件方法的一系列默认参数

<div>
<pre>function foo(options){
    options=jQuery.extend({
        name:"bar",
        length:5,
        dataType:"xml"
    },options);
}</pre>
</div>

&emsp;&emsp;如果用户调用foo()方法的时候，在传递的参数options对象设置了相应的值，那么就使用设置的值，否则使用默认值

&emsp;&emsp;通过使用jQuery.extend()方法，可以很方便地用传入的参数来覆盖默认值。此时，对方法的调用依旧保持一致，只不过要传入的是一个映射而不是一个参数列表。这种机制比传统的每个参数都去检测的方式不仅灵活而且更加简洁。此外使用命名参数意味着再添加新选项也不会影响过去编写的代码，从而使开发者使用起来更加直观明了

&nbsp;

### 编写插件

1、封装jQuery对象方法的插件

&emsp;&emsp;编写设置和获取颜色的插件color()，该插件用于实现以下两个功能:

&emsp;&emsp;(1)设置匹配元素的颜色

&emsp;&emsp;(2)获取匹配的元素(元素集合中的第一个)的颜色

&emsp;&emsp;由于是对jQuery对象的方法拓展，因此采用拓展第一类插件的方法jQuery.fn.extend()来编写，这里给这个方法提供了一个参数value，如果调用方法的时候传递了value这个参数，那么就是用这个值来设置字体颜色，否则就是获取匹配元素的字体颜色的值

<div>
<pre>;(function(){
    jQuery.fn.extend({
        "color":function(value){
            if(value == undefined){
                return this.css("color");
            }else{
                return this.css("color",value);
            }          
        }             
    }); 
})(jQuery);</pre>
</div>

&emsp;&emsp;实际上，CSS()方法内容已经有判断value是否为undefined的机制，所以才可以根据传递参数的不同而返回不同的值。因此，代码可以删减如下

<div>
<pre>;(function(){
    jQuery.fn.extend({
        "color":function(value){
            return this.css("color",value);      
        }             
    }); 
})(jQuery);</pre>
</div>
<div>
<pre>&lt;span id="test"&gt;测试文字&lt;/span&gt;
&lt;input type="color" id="color"&gt;
&lt;script&gt;
;(function($){
  $.fn.extend({
    "color":function(value){
      return this.css("color",value);      
    }             
  }); 
})(jQuery);
$('#color').on('change',function(){
  $('#test').color($(this).val());
})
&lt;/script&gt; </pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/extend/e2.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;另外，如果要定义一组插件，可以使用如下所示写法:

<div>
<pre>;(function(){
    jQuery.fn.extend({
        "color":function(value){
          //插件代码
        },
        "border":function(value){
          //插件代码
        },
        "background":function(value){
          //插件代码
        }              
    }); 
})(jQuery);</pre>
</div>

2、封装全局函数的插件

&emsp;&emsp;这类插件是在jQuery命名空间内部添加一个函数

&emsp;&emsp;例如新增两个函数，用于去除左侧和右侧空格。虽然jQuery已经提供了jQuery.trim()方法来去除两端空格，但在某些情况下，会只希望去除某一侧的空格

&emsp;&emsp;去除左侧、右侧的空格的函数分别写成如下jQuery代码。(text||"")部分是用于防止传递进来的text这个字符串变量处于未定义的特殊状态，如果text是undeined，则返回字符串""，否则返回字符串text。这个处理是为了保证接下来的字符串替换方法replace()方法不会出错

<div>
<pre>;(function($){
   $.extend({
      ltrim:function( text ){
            return (text || "").replace(/^\s+/g,"");
        },
        rtrim:function(     text ){
               return (text || "").replace(/\s+$/g,"");
        }
    }); 
})(jQuery);

var $str = "    test    ";
console.log($.trim($str));//'test'
console.log($.ltrim($str));//'test    '
console.log($.rtrim($str));//'    test'</pre>
</div>

3、自定义选择器

&emsp;&emsp;jQuery以其强大的选择器著称，那么jQuery的选择器的工作原理是什么呢？

&emsp;&emsp;jQuery的选择解析器首先会使用一组正则表达式来解析选择器，然后针对解析出的每一个选择符执行一个函数，称为选择函数。最后根据这个选择函数的返回值为true还是false来决定是否保留这个元素，这样就可以找到匹配的元素节点

&emsp;&emsp;如$("div:gl(1)")，该选择器首先会获取所有的&lt;div&gt;元素，然后隐式地遍历这些&lt;div&gt;元素，并逐个将这些&lt;div&gt;元素作为参数，连同括号里的&ldquo;1&rdquo;等一些参数一起传递给gt对应的选择器函数进行判断。如果返回true则保留，否则不保留，这样得到的结果就是一个符合要求的&lt;div&gt;元素的集合

&emsp;&emsp;选择器的函数一共接受3个参数，形式如下：

<div>
<pre>function (a,i,m){
         //...
}</pre>
</div>

&emsp;&emsp;第一个参数为a，指的是当前遍历到的DOM元素

&emsp;&emsp;第二个参数为i，指的是当前遍历到的DOM元素的索引值，从0开始

&emsp;&emsp;第三个参数是m，它是由jQuery正则解析引擎进一步解析后的产物，是一个数组：其中最重要的一个是m[3]，在$("div:gl(1)")中即为括号里的数字&ldquo;1&rdquo;。

&emsp;&emsp;在jQuery中已经有lt、gt和eq选择器，因此这里写一个介于两者之间(between)的选择器

&emsp;&emsp;思路：在上面的三个参数中，m[3]为"a,b"的形式，因此把m[3]用","分隔，然后跟索引值i进行对比，如果i在m[3]表示的范围之间就返回true，否则为false

<div>
<pre>;(function($){
    $.extend($.expr[":"],{
        between:function(a,i,m){
            var temp=m[3].split(",");
            return +temp[0]&lt;i&amp;&amp;i&lt;+temp[1];
        }
    });
})(jQuery);</pre>
</div>

&emsp;&emsp;注意：经测试，函数中第二个参数i的值始终为0，无法获取索引值，这时就需要自造索引，代码如下

<div>
<pre>;(function($){
    var $index = -1;
    $.extend($.expr[":"],{
        between:function(a,i,m){
            var temp=m[3].split(",");   
            $index++;      
            return +temp[0]&lt;$index&amp;&amp;$index&lt;+temp[1];
        }
    });
})(jQuery);</pre>
</div>
<div>
<pre>&lt;div&gt;
  &lt;i&gt;0&lt;/i&gt;
  &lt;i&gt;1&lt;/i&gt;
  &lt;i&gt;2&lt;/i&gt;
  &lt;i&gt;3&lt;/i&gt;
  &lt;i&gt;4&lt;/i&gt;
  &lt;i&gt;5&lt;/i&gt;
&lt;/div&gt;
&lt;button id="btn"&gt;测试&lt;/button&gt;
&lt;script&gt;
;(function($){
    var $index = -1;
    $.extend($.expr[":"],{
        between:function(a,i,m){
            var temp=m[3].split(",");   
            $index++;      
            return +temp[0]&lt;$index&amp;&amp;$index&lt;+temp[1];
        }
    });
})(jQuery);
$('#btn').click(function(){
  $('i:between(1,5)').css('background','lightblue');
});
&lt;/script&gt;  </pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/jquery/extend/e3.html" frameborder="0" width="320" height="240"></iframe>