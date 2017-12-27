# 变量variable

　　一直以来，CSS中是没有变量而言的，要使用 CSS 变量，只能借助 SASS 或者 LESS 这类预编译器。新的草案发布之后，直接在 CSS 中定义和使用变量不再是幻想了。本文将详细介绍CSS变量variable

&nbsp;

### 基本用法

　　CSS 变量是由CSS作者定义的实体，其中包含要在整个文档中重复使用的特定值。使用自定义属性来设置变量名，并使用特定的&nbsp;var()&nbsp;来访问

　　兼容性：移动端和IE浏览器不兼容

【声明变量】

&nbsp;　　变量必须以`--`开头。例如--example-variable: 20px，意思是将20px赋值给--example-varibale变量

　　可以将声明变量的语句置于任何元素内，如果要设置全局变量，则可以设置为:root、body或html

<div class="cnblogs_code">
<pre>:root{
  --bgColor:#000;
}</pre>
</div>

　　变量声明就像变普通的样式声明语句一样，也可以使用内联样式

<div class="cnblogs_code">
<pre>&lt;body style="--bgColor:#000"&gt;</pre>
</div>

　　变量声明语句必须包含一个元素内，而不能随意放置

<div class="cnblogs_code">
<pre>//错误
&lt;style&gt;
--bgColor:#000;
&lt;/style&gt;</pre>
</div>

【使用变量】

　　使用var()函数使用变量，并且可以被使用在任意的地方。例如：var(--example-variable)会返回--example-variable所对应的值

<div class="cnblogs_code">
<pre>&lt;body style="--bgColor:#000;"&gt;
    &lt;div style="width: 100px;height: 100px;background-color: var(--bgColor)"&gt;&lt;/div&gt;    
&lt;/body&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src=" https://demo.xiaohuochai.site/css/base/b23.html" frameborder="0" width="320" height="240"></iframe>

　　var()函数还有一个可选参数，用来设置默认值，当变量无法取得值时，则使用默认值

<div class="cnblogs_code">
<pre>&lt;body&gt;
    &lt;div style="width: 100px;height: 100px;background-color: var(--bgColor,pink)"&gt;&lt;/div&gt;    
&lt;/body&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src=" https://demo.xiaohuochai.site/css/base/b24.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 继承和层叠

　　和普通的样式属性一样，变量属性也支持继承和层叠。下面示例中，body元素的变量值为green，div元素的变量值为red; 基于层叠的原理，最终div元素的背景颜色为红色

<div class="cnblogs_code">
<pre>&lt;body style="--bgColor:green;"&gt;
    &lt;div style="width: 100px;height: 100px;--bgColor: red;background-color: var(--bgColor,pink)"&gt;&lt;/div&gt;    
&lt;/body&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src=" https://demo.xiaohuochai.site/css/base/b25.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 组合和计算

【组合】

　　CSS 变量可以进行组合使用

<div class="cnblogs_code">
<pre>&lt;style&gt;
.box{
    --top:20%;
    --left:30%;
    width: 100px;
    height: 100px;
    background-image: url(img/24/xiaoshu.jpg);
    background-position: var(--left)  var(--top);
}
&lt;/style&gt;
&lt;div class="box"&gt;&lt;/div&gt;    </pre>
</div>

<iframe style="width: 100%; height: 120px;" src=" https://demo.xiaohuochai.site/css/base/b26.html" frameborder="0" width="320" height="240"></iframe>

　　但是，CSS变量不能进行如下形式的组合，var(--color1)var(--color2)不被浏览器识别，如果分开，如var(--color1) var(--color2)，则被解析为# 333，同样无法被浏览器识别

<div class="cnblogs_code">
<pre>&lt;style&gt;
.box{
    --color1:#;
    --color2:333;
    width: 100px;
    height: 100px;
    background-color: var(--color1)var(--color2);
}
&lt;/style&gt;
&lt;div class="box"&gt;&lt;/div&gt;    </pre>
</div>

【计算】

　　变量和普通样式值一样，除了组合，还可以使用calc进行计算

<div class="cnblogs_code">
<pre>&lt;style&gt;
.box{
    --borderWidth:2px;
    width: 100px;
    height: 100px;
    background-color:lightblue;
    border-left: calc(var(--borderWidth) * 2) solid black;
}
&lt;/style&gt;
&lt;div class="box"&gt;&lt;/div&gt;    </pre>
</div>

<iframe style="width: 100%; height: 120px;" src=" https://demo.xiaohuochai.site/css/base/b27.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### JS

　　CSS 变量可以和 JS 互相交互。要注意的是，只能使用getPropertyValue()和setProperty()方法，而不能使用style属性

【style属性】

<div class="cnblogs_code">
<pre>&lt;div id="box" style="--color:lightgreen;background-color: var(--color)"&gt;&lt;/div&gt;    
&lt;script&gt;
　　var oBox = document.getElementById('box');
　　console.log(oBox.style['--color']);     https://demo.xiaohuochai.site// https://demo.xiaohuochai.siteundefined
&lt;/script&gt;</pre>
</div>

【getPropertyValue()】

<div class="cnblogs_code">
<pre>&lt;div id="box" style="--color:lightgreen;background-color: var(--color)"&gt;&lt;/div&gt;    
&lt;script&gt;
　　var oBox = document.getElementById('box');
　　console.log(oBox.style.getPropertyValue('--color')); https://demo.xiaohuochai.site// https://demo.xiaohuochai.site'lightgreen'
&lt;/script&gt;</pre>
</div>

【setProperty()】

<div class="cnblogs_code">
<pre>&lt;style&gt;
#box{    
    --color:lightgreen;
    background-color: var(--color);
    width: 100px;
    height: 100px;
    display:inline-block;
}
&lt;/style&gt;

&lt;button id="btn" type="button"&gt;变浅蓝&lt;/button&gt;
&lt;div id="box"&gt;&lt;/div&gt;    
&lt;script&gt;
var oBox = document.getElementById('box');
var oBtn = document.getElementById('btn');
oBtn.onclick = function(){
    oBox.style.setProperty('--color','lightblue');
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src=" https://demo.xiaohuochai.site/css/base/b28.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 不支持

　　有一点要特别注意的是，变量不支持!important

<div class="cnblogs_code">
<pre>.box{
    --color:red;
    width: 100px;
    height: 100px;
    background-color:--color !important;
}
&lt;/style&gt;
&lt;div class="box"&gt;&lt;/div&gt;    </pre>
</div>

　　chrome浏览器截图如下

![variable](https://pic.xiaohuochai.site/blog/CSS_grammer_variable.png)


&nbsp;

### 用途

　　1、可维护性

　　在网页中维护一个配色方案或尺寸方案，意味着一些样式在CSS文件中多次出现，并被重复使用。当修改方案时，不论是调整某个样式或完全修改整个方案，都会成为一个复杂的问题，而单纯查找替换是远远不够的，这时CSS变量就派上用场了

<div class="cnblogs_code">
<pre>:root{
  --mainColor:#fc0;
}
.div1{
  color:var(--mainColor);
}
.div2{
  color:var(--mainColor);
}</pre>
</div>

　　2、语义化

　　变量的第二个优势就是名称本身就包含了语义的信息。CSS 文件变得易读和理解。main-text-color比文档中的#fc0更容易理解，特别是同样的颜色出现在不同的文件中的时候

　　3、更方便的实现@media媒体查询

&nbsp;　　一般地，媒体查询如下所示

<div class="cnblogs_code">
<pre>&lt;style&gt;
.box{    
    width: 100px;
    height: 100px;
    padding: 20px;
    margin: 10px;
    background-color: red
}
@media screen and (max-width:600px) {
    .box{
        width: 50px;
        height: 50px;
        padding: 10px;
        margin: 5px;        
    }

}
&lt;/style&gt;
&lt;div class="box"&gt;&lt;/div&gt;    </pre>
</div>

　　但是，如果使用变量，则可以精简代码

<div class="cnblogs_code">
<pre>&lt;style&gt;
.box{    
    --base-size:10px;
    width: calc(var(--base-size) * 10);
    height: calc(var(--base-size) * 10);
    padding: calc(var(--base-size) * 2);
    margin: calc(var(--base-size) * 1);
    background-color: red;
}
@media screen and (max-width:600px) {
    .box{
        --base-size:5px;    
    }
}
&lt;/style&gt;
&lt;div class="box"&gt;&lt;/div&gt;    </pre>
</div>

