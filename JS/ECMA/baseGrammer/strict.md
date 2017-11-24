# javascript严格模式下的8点规则

&nbsp;【作用】

　　[1]消除js语法的一些不合理、不严谨、不安全问题，减少怪异行为并保证代码运行安全

　　[2]提高编译器效率，增加运行速度

&nbsp;

【使用】

　　[1]整个脚本启用严格模式，在顶部执行："use strict";

　　[2]在指定函数中执行严格模式，在函数体第一行："use strict"

　　[3]不支持strict模式的浏览器把"use strict"当做一个字符串语句执行，支持strict模式的浏览器将开启strict模式

　　[4]支持严格模式的浏览器包括IE10+、Firefox4+、safari12+、opera12+、chrome

&nbsp;

【规则】

【1】变量

  [a]不允许意外创建全局变量

<div class="cnblogs_code">
<pre>"use strict";
message = 'hello world!';</pre>
</div>

  [b]不能对变量调用delete操作符

<div class="cnblogs_code">
<pre>"use strict";
var color = 'red';
delete color;</pre>
</div>

&nbsp;

【2】对象

  [a]不能为只读属性赋值

<div class="cnblogs_code">
<pre>"use strict";
var person = {
    name:'cook'
};
Object.defineProperty(person,'name',{
    writable: false
});
person.name = 'Nicholas';</pre>
</div>

  [b]不能为不可配置的属性使用delete操作

<div class="cnblogs_code">
<pre>"use strict";
var person = {
    name:'cook'
};
Object.defineProperty(person,'name',{
    configurable: false
});
delete person.name;</pre>
</div>

&nbsp;

【3】函数

  [a]参数必须唯一

<div class="cnblogs_code">
<pre>"use strict";
function sun(num,num){
    //TODO
}</pre>
</div>

　　[b]修改形参不会反映到arguments中

<div class="cnblogs_code">
<pre>function showValue(value){
    value = "Foo";
    alert(arguments[0]);
    //非严格模式:"Foo"
    //严格模式:"Hi"
}
showValue("Hi");</pre>
</div>

　　[c]不允许使用arguments.callee和arguments.caller

<div class="cnblogs_code">
<pre>"use strict";
function fn(num){
    return arguments.callee(num);
}
fn(2);</pre>
</div>
<div class="cnblogs_code">
<pre>"use strict";
function outer(){
    inner();
}
function inner(){
    alert(inner.caller());
}
outer();</pre>
</div>

&nbsp;

【4】不允许eval()在包含上下文中创建变量或函数

<div class="cnblogs_code">
<pre>"use strict";
function fn(){
    eval("var x=10");
    alert(x);
}
fn();</pre>
</div>
<div class="cnblogs_code">
<pre>//允许以下操作
var result = eval("var x = 10, y = 11; x+y");
alert(result);//21</pre>
</div>

&nbsp;

【5】不允许使用eval和arguments作为标识符，也不允许读写他们的值

<div class="cnblogs_code">
<pre>"use strict";
var eval = 10;
var arguments = 20;</pre>
</div>

&nbsp;

【6】不允许this值为null或undefined

<div class="cnblogs_code">
<pre>"use strict";
var color = "red";
function fn(){
    alert(this.color);
}
fn();</pre>
</div>

&nbsp;

【7】不允许使用with语句

<div class="cnblogs_code">
<pre>"use strict";
with(location){
    alert(href);
}</pre>
</div>

&nbsp;

【8】不允许使用八进制字面量

<div class="cnblogs_code">
<pre>"use strict";
var value = 010;</pre>
</div>

&nbsp;