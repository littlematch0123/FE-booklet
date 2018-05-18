# jQuery事件绑定

&emsp;&emsp;javascript有[HTML](http://www.cnblogs.com/xiaohuochai/p/5859674.html#anchor1)、[DOM0级](http://www.cnblogs.com/xiaohuochai/p/5859674.html#anchor2)、[DOM2级](http://www.cnblogs.com/xiaohuochai/p/5859674.html#anchor3)和[IE](http://www.cnblogs.com/xiaohuochai/p/5859674.html#anchor4)这四种事件处理程序，而jQuery对这四种事件处理程序进行了兼容处理，以更简单的方式就可以实现事件绑定。本文将详细介绍jQuery事件绑定

&nbsp;

### bind()

&emsp;&emsp;bind()方法为一个元素绑定事件处理程序，有以下3种使用方法

**bind(eventType[,eventData],handler(eventObject))**

&emsp;&emsp;bind()方法可以接受3个参数：第一个参数是一个或多个事件类型的字符串，或自定义事件的名称；第二个参数是可选参数，作为event.data属性值传递给事件对象的额外数据对象；第三个参数是用来绑定的事件处理函数　

<div>
<pre>&lt;style&gt;
.entered{background-color:lightblue;}
&lt;/style&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').bind('mouseenter mouseleave', {msg:'123'},function(event) {
  $(this).toggleClass('entered');
  alert(event.data.msg)
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/event/e1.html" frameborder="0" width="320" height="240"></iframe>

**一般用法**

&emsp;&emsp;一般地，我们用bind()方法为元素绑定一个事件处理函数

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').bind('click',function(){
    alert(1);
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/event/e2.html" frameborder="0" width="320" height="240"></iframe>

**简化用法**

&emsp;&emsp;jQuery库提供了标准的事件类型绑定快捷方法，比如bind('click')的快捷方法click()

&emsp;&emsp;每一种类型都可以找到它的快捷方式

<div>
<pre>blur,focus,focusin,focusout,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error</pre>
</div>
<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    alert(1);
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/event/e3.html" frameborder="0" width="320" height="240"></iframe>

**命名空间**

&emsp;&emsp;如果eventType参数字符串包含一个点(.)，那么该事件是带命名空间的。这个点(.)将事件及其命名空间分隔开来。例如，在调用.bind('click.name', handler) ，字符串click是事件类型，而字符串name是命名空间。命名空间允许我们解除或绑定一些事件，而不会影响其他事件

&emsp;&emsp;注意：即使是同类型的事件，命名空间不同，就不会受到影响

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').bind('click.a',function(){alert(1);})
$('#btn').bind('click.b',function(){alert(2);})
$('#btn').mouseout(function(){$(this).unbind('.b')})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/event/e4.html" frameborder="0" width="320" height="240"></iframe>

**bind(eventType[,eventData],preventBubble)**

&emsp;&emsp;bind()方法的第二种用法是第三个参数设置为false，用于防止默认事件，阻止事件冒泡。默认值是true&emsp;&emsp;

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').bind('contextmenu',false);
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/event/e5.html" frameborder="0" width="320" height="240"></iframe>

**bind(events)**

&emsp;&emsp;bind()的第三种用法是只有一个参数，该参数是一个对象，包含一个或多个DOM事件类型和函数并执行它们　

<div>
<pre>&lt;style&gt;
.entered{background-color:lightblue;}
&lt;/style&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').bind({
  click: function() {
       alert(1);
  },
  mouseenter: function() {
    $(this).toggleClass('entered');
  },
  mouseleave: function(){
      $(this).toggleClass('entered');
  }
});
&lt;/script&gt;    </pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/event/e6.html" frameborder="0" width="320" height="240"></iframe>

【unbind()】

&emsp;&emsp;unbind()是bind()事件的对应事件，从元素上删除一个以前附加的事件处理程序。每个用bind()方法绑定的事件处理程序可以使用unbind()移除

&emsp;&emsp;若unbind()方法没有任何参数，可以删除元素上所有绑定的处理程序

<div>
<pre>&lt;style&gt;
.entered{background-color:lightblue;}
&lt;/style&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;button id="reset"&gt;删除事件&lt;/button&gt;
&lt;script&gt;
$('#btn').bind({
  click: function() {
       alert(1);
  },
  mouseenter: function() {
    $(this).toggleClass('entered');
  },
  mouseleave: function(){
      $(this).toggleClass('entered');
  }
});
$('#reset').click(function(){
    $('#btn').unbind();
})
&lt;/script&gt;    </pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/event/e7.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;unbind()方法可以接收一个表示事件类型的字符串，表示删除该类事件类型的所有处理函数

<div>
<pre>&lt;style&gt;
.entered{background-color:lightblue;}
&lt;/style&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;button id="reset"&gt;删除事件&lt;/button&gt;
&lt;script&gt;
$('#btn').bind({
  click: function() {
       alert(1);
  },
  mouseenter: function() {
    $(this).toggleClass('entered');
  },
  mouseleave: function(){
      $(this).toggleClass('entered');
  }
});
$('#reset').click(function(){
    $('#btn').unbind('click');
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/event/e8.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;unbind()方法也可以接受两个参数，第一个参数表示事件类型，第二个参数表示事件处理程序，表示删除该事件类型的该事件处理程序

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;button id="reset"&gt;删除事件&lt;/button&gt;
&lt;script&gt;
function handler(){
    alert(1);
}
$('#btn').bind('click',handler);
$('#btn').bind('click',function(){alert(2);});
$('#reset').click(function(){
    $('#btn').unbind('click',handler);
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/event/e9.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;注意：如下用法是无法正常工作的。尽管两个匿名函数的内容是一样的，但是它们是在不同的地方被创建的。因此，javascript会将它们当成是不同的函数对象。若要解除绑定特定的事件处理函数，需要的是指向该函数的引用，而不是内容相同的不同函数

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;button id="reset"&gt;删除事件&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    alert(1);
})
$('#reset').click(function(){
    $('#btn').unbind('click',function(){alert(1);});
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/event/e10.html
" frameborder="0" width="320" height="240"></iframe>

**命名空间**

<div>
<pre>$( "#foo" ).bind( "click.myEvents", handler );</pre>
</div>

&emsp;&emsp;上面的click事件可以以正常的方式解除：

<div>
<pre>$( "#foo" ).unbind( "click" );</pre>
</div>

&emsp;&emsp;但是，如果要避免影响其他处理程序，可以更具体

<div>
<pre>$( "#foo" ).unbind( "click.myEvents" );</pre>
</div>

&emsp;&emsp;也可以解除命名空间中所有的处理程序，无论是什么事件类型

<div>
<pre>$( "#foo" ).unbind( ".myEvents" );</pre>
</div>

**事件对象**

&emsp;&emsp;当解除自身内部处理程序时可以给unbind()方法传递event对象

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
var timesClicked = 0;
$( "#btn" ).bind( "click", function( event ) {
  alert(++timesClicked);
  if (timesClicked &gt;= 2 ) {
    $(this).unbind(event);
  }
});
$('#btn').click(function(){alert('a')});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/event/e11.html" frameborder="0" width="320" height="240"></iframe>

### trigger()

&emsp;&emsp;trigger()方法用来完成模拟操作，根据绑定到匹配元素的给定的事件类型执行所有的处理程序和行为

**trigger(eventType[,extraParameters])**

&emsp;&emsp;trigger()方法接受两个参数eventType和extraParameters。eventType表示事件类型，而extraParameters是可选参数，表示传递给事件处理程序的额外数组参数

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn1"&gt;按钮&lt;/button&gt;
&lt;button id="btn2"&gt;模拟按钮&lt;/button&gt;
&lt;script&gt;
$('#btn1').click(function(){
    alert(1);
})
$('#btn2').click(function(){
    $('#btn1').trigger('click');
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/event/e12.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;也可以直接用简化写法click()

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn1"&gt;按钮&lt;/button&gt;
&lt;button id="btn2"&gt;模拟按钮&lt;/button&gt;
&lt;script&gt;
$('#btn1').click(function(){
    alert(1);
})
$('#btn2').click(function(){
    $('#btn1').click();
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/event/e13.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;可以使用on()方法定义一个自定义事件

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').on('custom',function(event,param1,param2){
    alert(param1 + '\n' + param2);
});
$('#btn').click(function(){
    $('#btn').trigger('custom',['1','2']);
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/event/e14.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;注意：传入的extraParameters参数与传入到bind()方法中的eventData参数是不同的。它们的机制都是向事件处理函数中传入信息，但是传入trigger()中的extraParameters参数是在事件发生时传入的，而传入到bind()中的eventData参数要求在进行事件绑定时就要事先计算好

**trigger(event)**

&emsp;&emsp;trigger()方法的另一种使用方法是传入一个event对象

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    var event = jQuery.Event("click");
    event.user = "false";
    $(document).trigger(event);
    return false;
})
$(document).click(function(event){
    alert(event.user)
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/event/e15.html" frameborder="0" width="320" height="240"></iframe>

【triggerHandler()】

&emsp;&emsp;triggerHandler()方法的行为与trigger()相似，不同之处有如下几点：

&emsp;&emsp;1、triggerHandler()方法并不会触发事件的默认行为

&emsp;&emsp;2、trigger()会影响所有与jQuery对象相匹配的元素，而triggerHandler()仅影响第一个匹配到的元素

&emsp;&emsp;3、使用triggerHandler()创建的事件，并不会在DOM树中向上冒泡。如果事件没有被目标元素直接处理，那么它就不会进行任何处理

&emsp;&emsp;4、与普通的方法返回jQuery对象相反，triggerHandler()返回最后一个处理的事件的返回值。如果没有触发任何事件，会返回undefined

**triggerHandler(eventType[,extraParameters])**

&emsp;&emsp;triggerHandler()方法接受两个参数eventType和extraParameters。eventType表示事件类型，而extraParameters是可选参数，表示传递给事件处理程序的额外数组参数

&emsp;&emsp;如果使用trigger()触发focus事件，那么它不只触发绑定了该事件的处理函数，也会触发浏览器默认行为，即获得焦点

&emsp;&emsp;如果使用triggerHandler()触发focus事件，那么它只会触发绑定了该事件的处理函数，而浏览器的默认focus动作是不会被触发的

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;input id="test"&gt;
&lt;button id="btn1"&gt;按钮一&lt;/button&gt;
&lt;button id="btn2"&gt;按钮二&lt;/button&gt;
&lt;script&gt;
$('#test').focus(function(){
    $(this).val(1);
})
$('#btn1').click(function(){
    $('#test').trigger('focus');
})
$('#btn2').click(function(){
    $('#test').triggerHandler('focus');
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/event/e16.html" frameborder="0" width="320" height="240"></iframe>

### delegate()

&emsp;&emsp;delegate()方法为所有匹配选择器的元素绑定一个或多个事件处理函数，基于指定元素的子集，匹配的元素包括那些目前已经匹配到的元素，也包括那些今后可能匹配到的元素

**delegate(selector,eventType,eventData,handler(eventObject))**

&emsp;&emsp;delegate()方法包含4个参数：selector表示选择器字符串，用于过滤器触发事件的元素；eventType表示一个包含一个或多个用空格隔开的事件类型的字符串，比如"click"或"keydown"或自定义事件的名称；eventData表示一个对象，它包含的数据键值对映射将被传递给事件处理程序；handler(eventObject)表示事件触发时执行的函数

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('body').delegate('#btn','click',{a:1},function(event){
    alert(event.data.a)
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/event/e17.html" frameborder="0" width="320" height="240"></iframe>

**delegate(selector,events)**

&emsp;&emsp;delegate()方法的另一种用法是传递两个参数，selector参数表示选择器字符串，用于过滤器触发事件的元素；而events对象包含一个或多个DOM事件类型和函数&emsp;&emsp;

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('body').delegate('#btn',{
    'click':function(){alert(1)},
    'mouseover':function(){$(this).css('background','lightblue')},
    'mouseout':function(){$(this).css('background','transparent')}
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/event/e18.html" frameborder="0" width="320" height="240"></iframe>

【undelegate()】

&emsp;&emsp;undelegate()方法用于删除当前选择器匹配的所有元素的事件处理程序

1、&nbsp;解除绑定所有事件

**undelegate()**

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn1"&gt;按钮&lt;/button&gt;
&lt;button id="btn2"&gt;解绑事件&lt;/button&gt;
&lt;script&gt;
$('body').delegate('#btn1','click',{a:1},function(event){
    alert(event.data.a)
});
$('#btn2').click(function(){
    $('body').undelegate();    
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/event/e19.html" frameborder="0" width="320" height="240"></iframe>

2、解除某一类型事件

**undelegate(eventType)**

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn1"&gt;按钮&lt;/button&gt;
&lt;button id="btn2"&gt;解绑事件&lt;/button&gt;
&lt;script&gt;
$('body').delegate('#btn1',{
    'click':function(){alert(1)},
    'mouseover':function(){$(this).css('background','lightblue')},
    'mouseout':function(){$(this).css('background','transparent')}
});
$('#btn2').click(function(){
    $('body').undelegate('click');    
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/event/e20.html" frameborder="0" width="320" height="240"></iframe>

3、解除特定元素的事件

**undelegate(selector,eventType)**

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn1"&gt;按钮&lt;/button&gt;
&lt;button id="btn2"&gt;解绑事件&lt;/button&gt;
&lt;script&gt;
$('body').delegate('#btn1',{
    'click':function(){alert(1)},
    'mouseover':function(){$(this).css('background','lightblue')},
    'mouseout':function(){$(this).css('background','transparent')}
});
$('#btn2').click(function(){
    $('body').undelegate('#btn1','click');    
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/event/e21.html" frameborder="0" width="320" height="240"></iframe>

4、解除特定元素绑定的对象函数的特定类型的事件

**undelegate(selector,eventType,handler(eventObject))**

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn1"&gt;按钮&lt;/button&gt;
&lt;button id="btn2"&gt;解绑事件&lt;/button&gt;
&lt;script&gt;
var handler = function(){
    alert(1);
}
$('body').delegate('#btn1','click',handler);
$('#btn2').click(function(){
    $('body').undelegate('#btn1','click',handler);    
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/event/e22.html" frameborder="0" width="320" height="240"></iframe>

### on()

&emsp;&emsp;on()方法是bind()方法和delegate()方法的升级版

**on(events[,selector][,data],handler(eventObject))**

&emsp;&emsp;on()方法接受4个参数

&emsp;&emsp;第一个参数event表示一个或多个空格分隔的事件类型和可选的命名空间，或仅仅是命名空间，比如"click","keydown.myPlugin",或者".myPlugin"

&emsp;&emsp;第二个参数selector是可选参数，表示一个选择器字符串，用于过滤出被选中的元素中能触发事件的后代元素。如果选择器是null或者忽略了该选择器，那么被选中的元素总是能触发事件

&emsp;&emsp;第三个参数data是可选参数，表示当一个事件被触发时，要传递给事件处理函数的event.data

&emsp;&emsp;第四个参数handler表示事件被触发时，执行的函数。若该函数只是执行return false，那么该参数位置可以直接简写成 false

1、bind()写法

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('body').on('click',{a:1},function(event){
    alert(event.data.a)
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/event/e23.html" frameborder="0" width="320" height="240"></iframe>

2、delegate()写法

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('body').on('click','#btn',{a:1},function(event){
    alert(event.data.a)
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/event/e24.html" frameborder="0" width="320" height="240"></iframe>

**on(events[,selector][,data])**　

&emsp;&emsp;on()方法的另一种用法可以接受三个参数

&emsp;&emsp;第一个参数event表示一个对象，键是由一个或多个由空格分隔的事件类型及可选的名字空间，值是这些事件类型所对应的事件处理函数

&emsp;&emsp;第二个参数selector和第三个参数data与上一种用法一样，都是可选参数

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').on({
    'click':function(){alert(1)},
    'mouseover':function(){$(this).css('background','lightblue')},
    'mouseout':function(){$(this).css('background','transparent')}
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/event/e25.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;on()方法的最后一个参数不是函数，而是false时，表示取消默认事件并取消事件冒泡

<div>
<pre>$("#btn").on("click", false)</pre>
</div>

&emsp;&emsp;只取消默认事件

<div>
<pre>$("#btn").on("click", function(event) {
  event.preventDefault();
});</pre>
</div>

&emsp;&emsp;只取消冒泡

<div>
<pre>$("#btn").on("click", function(event) {
  event.stopPropagation();
});</pre>
</div>

【off()】

&emsp;&emsp;off()方法是on()方法对应的解绑事件的方法

1、移除所有事件

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn1"&gt;按钮一&lt;/button&gt;
&lt;button id="btn2"&gt;按钮二&lt;/button&gt;
&lt;script&gt;
$('#btn1').on('click',{a:1},function(event){
    alert(event.data.a)
});
$('#btn2').on('click',function(){
    $('#btn1').off();
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/event/e26.html" frameborder="0" width="320" height="240"></iframe>

2、移除特定类型的事件

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn1"&gt;按钮一&lt;/button&gt;
&lt;button id="btn2"&gt;按钮二&lt;/button&gt;
&lt;script&gt;
$('#btn1').on('click mouseover',{a:1},function(event){
    alert(event.data.a)
});
$('#btn2').on('click',function(){
    $('#btn1').off('click');
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/event/e27.html" frameborder="0" width="320" height="240"></iframe>

3、移除先前绑定的事件处理函数

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn1"&gt;按钮一&lt;/button&gt;
&lt;button id="btn2"&gt;按钮二&lt;/button&gt;
&lt;script&gt;
function handler(){
    alert(1);
}
$('#btn1').on('click',handler);
$('#btn2').on('click',function(){
    $('#btn1').off('click',handler);
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/event/e28.html" frameborder="0" width="320" height="240"></iframe>

### one()

&emsp;&emsp;对于只需要触发一次，随后就要立即解除绑定的情况，jQuery提供了一种简写方法&mdash;&mdash;one()方法。one方法可以为元素绑定处理函数，当处理函数触发一次后，立即被删除。即在每个对象上，事件处理函数只会被执行一次

&emsp;&emsp;one()方法的结构与on()方法类似，使用方法也相同

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('body').one('click','#btn',{a:1},function(event){
    alert(event.data.a)
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/event/e29.html" frameborder="0" width="320" height="240"></iframe>

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').one({
    'click':function(){alert(1)},
    'mouseover':function(){$(this).css('background','lightblue')},
    'mouseout':function(){$(this).css('background','transparent')}
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/event/e30.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

## 总结

&emsp;&emsp;bind()方法类似于原生javascript的addEventListener()方法，用于绑定事件；trigger()方法类似于原生javascript的dispatchEvent()方法，用于触发事件；delegate()方法则是事件绑定的升级版，利用事件代理，提高性能及降低代码复杂度；on()方法是bind()方法和delegate()方法的升级版，将两个方法的功能结合了起来；one()方法用于处理只触发一次的事件