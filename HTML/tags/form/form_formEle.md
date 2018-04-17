# 深入理解表单脚本系列第二篇——表单字段

&emsp;&emsp;表单字段又叫表单元素，表示表单所包含控件，如&lt;input&gt;、&lt;select&gt;等。本文将详细介绍表单字段的内容

&nbsp;

### 访问

&emsp;&emsp;每个表单都有elements属性，该属性是表单中所有元素的集合。这个elements集合是一个有序列表，其中包含着表单中的所有字段，如&lt;input&gt;、&lt;textarea&gt;、&lt;button&gt;和&lt;fieldset&gt;

&emsp;&emsp;注意：不包括图片按钮&lt;input type="image"&gt;

&emsp;&emsp;每个表单字段在elements集合中的顺序，与它们出现在标记中的顺序相同，可以按照位置和name特性来访问它们

<div>
<pre>&lt;form action="#"&gt;
    &lt;input type="text" name="a"&gt;
    &lt;textarea name="b"&gt;&lt;/textarea&gt;
    &lt;button name="c"&gt;&lt;/button&gt;
    &lt;fieldset name="d"&gt;&lt;/fieldset&gt;
&lt;/form&gt;
&lt;script&gt;
    var elements = document.forms[0].elements;
    //[input, textarea, button, fieldset, a: input, b: textarea, c: button, d: fieldset]
    console.log(elements);
    //&lt;input type="text" name="a"&gt;
    console.log(elements.a);
    //&lt;textarea name="b"&gt;&lt;/textarea&gt;
    console.log(elements[1])
    console.log(elements[3] === elements.d)//true
&lt;/script&gt;</pre>
</div>

【form[name]】

&emsp;&emsp;除了使用elements元素集合外，还可以使用form[name]来获取表单内的元素控件

<div>
<pre>&lt;form name="form" id="myForm"&gt;
  &lt;input type="text" id="a1" name="a" &gt;
&lt;/form&gt;
&lt;script&gt;
var myInput1 = myForm.a;
console.log(myInput1.id);//'a1'
&lt;/script&gt;</pre>
</div>

&nbsp;

### 属性

&emsp;&emsp;除了&lt;fieldset&gt;元素之外，所有表单字段都拥有相同的一组属性

<div>
<pre>disabled        布尔值，表示当前字段是否被禁用
form            指向当前字段所属表单的指针；只读
name            当前字段的名称
readOnly        布尔值，表示当前字段是否只读
tabIndex        表示当前字段的切换(tab)序号
type            当前字段的类型，如"checkbox"、"radio"等等
value           当前字段将被提交给服务器的值
defaultValue    表示该表单元素的初始值</pre>
</div>

&emsp;&emsp;除了form属性之外，可以通过javascript动态修改其他任何属性

<div>
<pre>&lt;form action="#"&gt;
    &lt;input value="123"&gt;
&lt;/form&gt;
&lt;script&gt;
    var input = document.forms[0].elements[0];
    console.log(input.disabled);//false
    console.log(input.form);//&lt;form action="#"&gt;&lt;/form&gt;
    console.log(input.name);//''
    console.log(input.readOnly);//false
    console.log(input.tabIndex);//0
    console.log(input.type);//text
    console.log(input.value);//123
    console.log(input.defaultValue);//123
&lt;/script&gt;</pre>
</div>
<div>
<pre>&lt;form action="#"&gt;
    &lt;input value="123"&gt;
&lt;/form&gt;
&lt;button id="btn1"&gt;禁用(启用)&lt;/button&gt;
&lt;button id="btn2"&gt;只读(读写)&lt;/button&gt;
&lt;script&gt;
    var input = document.forms[0].elements[0];
    btn1.onclick = function(){
        input.disabled = !input.disabled;
    }
    btn2.onclick = function(){
        input.readOnly = !input.readOnly;
    }
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/html/formobj/f4.html" frameborder="0" width="320" height="240"></iframe>

### 方法

&emsp;&emsp;每个表单字段都有两个方法：focus()和blur()

**focus()**

&emsp;&emsp;focus()方法用于将浏览器的焦点设置到表单字段，即激活表单字段，使其可以响应键盘事件　

&emsp;&emsp;注意：非表单元素设置tabIndex=-1，并设置focus()方法后，也可以获得焦点

**blur()**

&emsp;&emsp;与focus()方法相对的是blur()方法，它的作用是从元素中移走焦点。在调用blur()方法时，并不会把焦点转移到某个特定的元素上；仅仅是将焦点从调用这个方法的元素上面移走而已

<div>
<pre>&lt;input id="test" type="text" value="123"&gt;
&lt;button id="btn1"&gt;input元素获得焦点&lt;/button&gt;
&lt;button id="btn2"&gt;input元素失去焦点&lt;/button&gt;
&lt;script&gt;
btn1.onclick = function(){test.focus();}
btn2.onclick = function(){test.blur();}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/formobj/f5.html" frameborder="0" width="320" height="240"></iframe>

### 事件

&emsp;&emsp;除了支持鼠标、键盘、更改和HTML事件之外，所有表单字段都支持下列3个事件

**focus**

&emsp;&emsp;当前字段获得焦点时触发

**blur**

&emsp;&emsp;当前字段失去焦点时触发

**change**

&emsp;&emsp;对于&lt;input&gt;和&lt;textarea&gt;元素，在它们失去焦点且value值改变时触发；对于&lt;select&gt;元素，在其选项改变时触发

&emsp;&emsp;当然，也支持focusin和focusout事件，在[焦点管理](http://www.cnblogs.com/xiaohuochai/p/5874447.html)中已经做了详细介绍，就不再重复

<div>
<pre>&lt;input id="test" type="text" value="123"&gt;
&lt;script&gt;
    test.onchange = function(){
        this.style.backgroundColor = 'pink';
    }
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/html/formobj/f6.html" frameborder="0" width="320" height="240"></iframe>

**顺序**

&emsp;&emsp;当一个input元素的值改变并且失去焦点时，blur和change事件的顺序是怎么样的呢？　

&emsp;&emsp;所有的浏览器的触发顺序都是先change事件，再blur事件

<div>
<pre>&lt;input id="test" type="text" value="123"&gt;
&lt;script&gt;
    test.onblur=test.onchange = function(e){
        e = e || event;
        this.value += e.type + ';';
    }
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/formobj/f7.html" frameborder="0" width="320" height="240"></iframe>

