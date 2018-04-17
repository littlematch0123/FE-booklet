# 深入理解表单脚本系列第四篇——选择框脚本

&emsp;&emsp;选择框是通过&lt;select&gt;和&lt;option&gt;元素创建的，又称为下拉列表框。为了方便与这个控件交互，除了所有表单字段共有的属性和方法外，javascript还提供了一些属性和方法。本文将详细介绍选择框脚本

&nbsp;

### select

&emsp;&emsp;select元素用来定义一个下拉列表，包含任意数量的option和optgroup元素。select元素包含以下javascript属性

&emsp;&emsp;autofocus&emsp;&emsp;是否在页面加载后文本区域自动获得焦点(IE9-浏览器不支持)

&emsp;&emsp;disabled&emsp;&emsp;是否禁用该下拉列表

&emsp;&emsp;form&emsp;&emsp;表示文本区域所属的一个或多个表单

&emsp;&emsp;multiple&emsp;&emsp;是否可选择多个选项

&emsp;&emsp;name&emsp;&emsp;表示下拉列表的名称

&emsp;&emsp;size&emsp;&emsp;表示下拉列表中可见选项的数目

&emsp;&emsp;options&emsp;&emsp;表示所包含的options的数组

&emsp;&emsp;selectedOptions&emsp;&emsp;表示所选择的options的数组(IE浏览器不支持)

&emsp;&emsp;selectedIndex&emsp;&emsp;表示所选择的第一个option的索引值

<div>
<pre>&lt;form id="myForm"&gt;
  &lt;select name="select" id="mySelect"&gt;
    &lt;option value="1" &gt;1&lt;/option&gt;
    &lt;option value="2" selected&gt;2&lt;/option&gt;
  &lt;/select&gt;
&lt;/form&gt;
&lt;script&gt;
var mySelect = document.getElementById('mySelect');
console.log(mySelect.form);//&lt;form id="myForm"&gt;
console.log(mySelect.name);//'select'
console.log(mySelect.value);//2
console.log(mySelect.options);//[option, option, selectedIndex: 1]
console.log(mySelect.selectedOptions);//[option]
console.log(mySelect.selectedIndex);//1
console.log(mySelect.multiple);//false
console.log(mySelect.size);//0
console.log(mySelect.autofocus);//false
console.log(mySelect.disabled);//false
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;下面对一些重要属性进行详细介绍

**multiple**

&emsp;&emsp;multiple属性表示是否允许多项选择

<div>
<pre>&lt;select name="test" id="test"&gt;
    &lt;option&gt;1&lt;/option&gt;
    &lt;option&gt;2&lt;/option&gt;
    &lt;option&gt;3&lt;/option&gt;
&lt;/select&gt;
&lt;button id="btn"&gt;是否多选&lt;/button&gt;
&lt;script&gt;
btn.onclick = function(){
    test.multiple = !test.multiple;
}    
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/html/formobj/f12.html" frameborder="0" width="320" height="240"></iframe>

**type**

&emsp;&emsp;选择框的type属性有两种，一种是'select-one'，表示单选；另一种是'select-multiple'，表示多选

<div>
<pre>&lt;select name="test" id="test"&gt;
    &lt;option&gt;1&lt;/option&gt;
    &lt;option&gt;2&lt;/option&gt;
    &lt;option&gt;3&lt;/option&gt;
&lt;/select&gt;
&lt;button id="btn"&gt;是否多选&lt;/button&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
btn.onclick = function(){
    test.multiple = !test.multiple;
    result.innerHTML = test.type;
}    
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/html/formobj/f13.html" frameborder="0" width="320" height="240"></iframe>

**value**

&emsp;&emsp;选择框的value属性由当前选中项决定

&emsp;&emsp;1、如果没有选中的项，则选择框的value属性保存空字符串

&emsp;&emsp;2、如果有一个选中项，而且该项的value特性已经在HTML中指定，则选择框的value属性等于选中项的value特性。即使value特性的值是空字符串，也同样遵循此条规则

&emsp;&emsp;3、如果有一个选中项，但该项的value特性在HTML中未指定，则选择框的value属性等于该项的文本

&emsp;&emsp;4、如果有多个选中项，则选择框的value属性将依据前两条规则取得第一个选中项的值

&emsp;&emsp;注意：IE8-浏览器只支持value属性的值，不支持选择的文本值

<div>
<pre>&lt;select name="test" id="test"&gt;
    &lt;option value="a"&gt;1&lt;/option&gt;
    &lt;option value="b"&gt;2&lt;/option&gt;
    &lt;option&gt;3&lt;/option&gt;
&lt;/select&gt;
&lt;button id="btn1"&gt;是否多选&lt;/button&gt;
&lt;button id="btn2"&gt;获取value值&lt;/button&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
btn1.onclick = function(){
    test.multiple = !test.multiple;
}    
btn2.onclick = function(){
    result.innerHTML = test.value;
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/html/formobj/f14.html" frameborder="0" width="320" height="240"></iframe>

**selectedIndex**

&emsp;&emsp;selectedIndex属性返回基于0的选中项的索引，如果没有选中项，则值为-1。对于支持多选的控件，只保存选中项中第一项的索引

<div>
<pre>&lt;select name="test" id="test"&gt;
    &lt;option value="a"&gt;1&lt;/option&gt;
    &lt;option value="b"&gt;2&lt;/option&gt;
    &lt;option&gt;3&lt;/option&gt;
&lt;/select&gt;
&lt;button id="btn1"&gt;是否多选&lt;/button&gt;
&lt;button id="btn2"&gt;获取索引&lt;/button&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
btn1.onclick = function(){
    test.multiple = !test.multiple;
}    
btn2.onclick = function(){
    result.innerHTML = test.selectedIndex;
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/html/formobj/f15.html" frameborder="0" width="320" height="240"></iframe>

**size**

&emsp;&emsp;size属性表示选择框的可见行数

<div>
<pre>&lt;select name="test" id="test"&gt;
    &lt;option value="a"&gt;1&lt;/option&gt;
    &lt;option value="b"&gt;2&lt;/option&gt;
    &lt;option&gt;3&lt;/option&gt;
&lt;/select&gt;
&lt;button id="btn1"&gt;可见1行&lt;/button&gt;
&lt;button id="btn2"&gt;可见2行&lt;/button&gt;
&lt;button id="btn3"&gt;可见3行&lt;/button&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
btn1.onclick = function(){
    test.size = 1;
}    
btn2.onclick = function(){
    test.size = 2;
}
btn3.onclick = function(){
    test.size = 3;
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/html/formobj/f16.html" frameborder="0" width="320" height="240"></iframe>

**options**

&emsp;&emsp;options属性表示控件中所有的&lt;option&gt;元素

<div>
<pre>&lt;select name="test" id="test"&gt;
    &lt;option value="a"&gt;1&lt;/option&gt;
    &lt;option value="b"&gt;2&lt;/option&gt;
    &lt;option&gt;3&lt;/option&gt;
&lt;/select&gt;
&lt;script&gt;
//[option, option, option, selectedIndex: 0]
console.log(test.options)
&lt;/script&gt;</pre>
</div>

&nbsp;

### option

&emsp;&emsp;在DOM中，每个&lt;option&gt;元素都有一个HTMLOptionElement对象表示。为便于访问数据， HTMLOptionElement对象也定义了一些属性

&emsp;&emsp;注意：IE浏览器不支持为&lt;option&gt;元素设置display:none

**index**

&emsp;&emsp;index属性表示当前选项在options集合中的索引

**label**

&emsp;&emsp;label属性表示当前选项的标签

&emsp;&emsp;注意：IE9-浏览器不支持

**selected**

&emsp;&emsp;selected属性表示当前选项是否被选中。将这个属性设置为true可以选中当前选项

**text**

&emsp;&emsp;text属性表示选项的文本

**value**

&emsp;&emsp;value属性表示选项的值

&emsp;&emsp;注意：在未指定value特性的情况下，IE8会返回空字符串；而其他浏览器返回text属性的值

<div>
<pre>&lt;select name="test" id="test"&gt;
    &lt;option value="a" selected&gt;1&lt;/option&gt;
    &lt;option value="b"&gt;2&lt;/option&gt;
    &lt;option&gt;3&lt;/option&gt;
&lt;/select&gt;
&lt;script&gt;
var option = test.options[0];
console.log(option.index);//0
console.log(option.label);//1，IE9-浏览器返回空字符串''
console.log(option.selected);//true
console.log(option.text);//1
console.log(option.value);//a
&lt;/script&gt;</pre>
</div>

&nbsp;

### 添加选项

&emsp;&emsp;【1】添加选项可以使用DOM的appendChild()或insertBefore()方法

<div>
<pre>&lt;select name="test" id="test"&gt;
    &lt;option&gt;1&lt;/option&gt;
    &lt;option&gt;3&lt;/option&gt;
&lt;/select&gt;
&lt;button id="btn"&gt;增加选项2&lt;/button&gt;
&lt;script&gt;
btn.onclick = function(){
    var newOption = document.createElement('option');
    newOption.innerHTML = 2;
    test.insertBefore(newOption,test.options[1]);
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/formobj/f17.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;【2】可以使用选择框的add()方法，add(newoption,reloption)方法向控件中插入新&lt;option&gt;元素，其位置在相关项(reloption)之前

&emsp;&emsp;使用Option构造函数来创建新选项，接受两个参数：文本(text)和值(value)，第二个参数可选

<div>
<pre>&lt;select name="test" id="test"&gt;
    &lt;option&gt;1&lt;/option&gt;
    &lt;option&gt;3&lt;/option&gt;
&lt;/select&gt;
&lt;button id="btn"&gt;增加选项2&lt;/button&gt;
&lt;script&gt;
btn.onclick = function(){
    var newOption = new Option('2');
    test.add(newOption,1);
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/formobj/f18.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 移除选项

&emsp;&emsp;与添加选项类似，移除选项的方式也有很多种

&emsp;&emsp;【1】使用DOM的removeChild()方法

<div>
<pre>&lt;select name="test" id="test"&gt;
    &lt;option&gt;1&lt;/option&gt;
    &lt;option&gt;2&lt;/option&gt;
    &lt;option&gt;3&lt;/option&gt;
&lt;/select&gt;
&lt;button id="btn"&gt;移除选项2&lt;/button&gt;
&lt;script&gt;
btn.onclick = function(){
    test.removeChild(test.options[1]);
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/formobj/f19.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;【2】使用选择框的remove()方法。这个方法接受一个参数，即要移除选项的索引

&emsp;&emsp;注意：使用该方法的好处是，若不存在被移除选项的索引，不会报错，只是静默失败

<div>
<pre>&lt;select name="test" id="test"&gt;
    &lt;option&gt;1&lt;/option&gt;
    &lt;option&gt;2&lt;/option&gt;
    &lt;option&gt;3&lt;/option&gt;
&lt;/select&gt;
&lt;button id="btn"&gt;移除选项2&lt;/button&gt;
&lt;script&gt;
btn.onclick = function(){
    test.remove(1);
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/formobj/f20.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;【3】将相应选项设置为null

&emsp;&emsp;注意：该方法同样不会报错

<div>
<pre>&lt;select name="test" id="test"&gt;
    &lt;option&gt;1&lt;/option&gt;
    &lt;option&gt;2&lt;/option&gt;
    &lt;option&gt;3&lt;/option&gt;
&lt;/select&gt;
&lt;button id="btn"&gt;移除选项2&lt;/button&gt;
&lt;script&gt;
btn.onclick = function(){
    test.options[1] = null;
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/formobj/f21.html" frameborder="0" width="320" height="240"></iframe>

