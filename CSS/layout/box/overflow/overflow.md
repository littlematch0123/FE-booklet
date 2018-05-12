# 深入理解CSS溢出overflow

&emsp;&emsp;当一个元素固定为某个特定大小，但内容在元素中放不下。此时就可以利用overflow属性来控制这种情况

&nbsp;

### 定义

**overflow溢出**

&emsp;&emsp;值: visible | hidden | scroll | auto | inherit

&emsp;&emsp;初始值: visible

&emsp;&emsp;应用于: 块级元素、替换元素、表单元格

&emsp;&emsp;继承性: 无

&emsp;&emsp;注意：除了IE7-浏览器外，其他浏览器都不支持给table-cell元素设置overflow属性。firefox和IE11浏览器不支持给table-cell元素的设置100%高度的子元素设置overflow属性

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/overflow/o1.html" frameborder="0" width="320" height="240"></iframe>

**overflow-X | overflow-y**

&emsp;&emsp;overflow-x和overflow-y的属性原本是IE浏览器独自拓展的属性，后来被CSS3采用，并标准化。overflow-x主要用来定义对水平方向内容溢出的剪切，而overflow-y主要用来定义对垂直方向内容溢出的剪切

&emsp;&emsp;注意：如果overflow-x和overflow-y值相同则等同于overflow。如果overflow-x和overflow-y值不同，且其中一个值显式设置为visible或未设置默认为visible，而另外一个值是非visible的值。则visible值会被重置为auto

&emsp;&emsp;值: visible | hidden | scroll | auto | inherit | no-display | no-content

&emsp;&emsp;初始值: visible

&emsp;&emsp;应用于: 块级元素、替换元素、表单元格

&emsp;&emsp;继承性: 无

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/overflow/o2.html" frameborder="0" width="320" height="240"></iframe>

### 属性

**visible**

&emsp;&emsp;元素的内容在元素框之外也可见

&emsp;&emsp;注意1：IE6-浏览器中元素的包含块会延伸，使得可以包裹其超出的内容

<div>
<pre>.box{
    height: 200px;
    width: 200px;
    background-color: lightgreen;
}
.in{
    width: 300px;
    height: 100px;
    background-color: lightblue;
}</pre>
</div>
<div>
<pre>&lt;div class="box"&gt;
    &lt;div class="in"&gt;&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

&emsp;&emsp;左图为IE6-浏览器，右图为其他浏览器

<table border="0">
<tbody>
<tr>
<td><img src="https://pic.xiaohuochai.site/blog/CSS_render_visible1.jpg" alt="visible1"></td>
<td><img src="https://pic.xiaohuochai.site/blog/CSS_render_visible2.jpg" alt="visible2"></td>
</tr>
</tbody>
</table>

&emsp;&emsp;注意2：IE7-浏览器的按钮(包括&lt;button&gt;和&lt;input type="button"&gt;两种)存在bug，当按钮上的文字越多时，按钮两侧的padding就越大。通过设置overflow:visible就可解决该问题

&emsp;&emsp;左图为默认情况，右图为设置overflow后的情况

<img src="https://pic.xiaohuochai.site/blog/CSS_render_visible3.jpg" alt="visible3">
<img src="https://pic.xiaohuochai.site/blog/CSS_render_visible4.jpg" alt="visible4">


**auto**

&emsp;&emsp;如果内容被剪裁，则浏览器会显示滚动条以便查看其余的内容

&emsp;&emsp;注意：对于一般浏览器来说，&lt;html&gt;和&lt;textarea&gt;默认带有overflow:auto的属性。但IE7-浏览器则不同，默认存在纵向滚动条

<div>
<pre>//IE7-浏览器 
html{overflow-y: scroll;}
//其他浏览器
html{overflow: auto;}
//去除页面默认滚动条
html{overflow: hidden;}</pre>
</div>

**scroll**

&emsp;&emsp;元素的内容会在元素框的边界处剪裁，但浏览器会显示滚动条以便查看其余的内容

&emsp;&emsp;注意：firefox和IE8+浏览器在overflow:scroll或auto时，存在padding-bottom缺失现象

<div>
<pre>.box{
    width: 100px;
    height: 100px;
    padding: 50px;
    background-color: pink;
    overflow:scroll;
}
.in{
    width: 100px;
    height: 200px;
    background-color: lightgreen;
}</pre>
</div>
<div>
<pre>&lt;div class="box"&gt;
    &lt;div class="in"&gt;&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

&emsp;&emsp;左图为chrome浏览器的情况，右图为firefox浏览器的情况

<img src="https://pic.xiaohuochai.site/blog/CSS_render_visible5.jpg" alt="visible5">
<img src="https://pic.xiaohuochai.site/blog/CSS_render_visible6.jpg" alt="visible6">

**hidden**

&emsp;&emsp;元素的内容会在元素框的边界处剪裁，并且超出剪裁区域的内容不可见

**no-display**

&emsp;&emsp;当内容溢出容器时不显示元素，类似于元素添加了display:none属性一样

**no-content**

&emsp;&emsp;当内容溢出窗口时不显示内容，类似于元素添加了visibility: hidden属性一样

&emsp;&emsp;注意：no-display和no-content这两个属性目前没有浏览器支持

&nbsp;

### 失效

&emsp;&emsp;绝对定位元素不总是被父级overflow属性剪裁，尤其是当overflow在绝对定位元素及其包含块之间的时候

&emsp;&emsp;注意：由于固定定位是相对于视窗定位的，所以固定定位元素无法被其所有的父级元素overflow属性剪裁&nbsp;

<iframe style="width: 100%; height: 230px;" src="https://demo.xiaohuochai.site/css/overflow/o3.html" frameborder="0" width="320" height="240"></iframe>

【解决办法】

【1】overflow元素自身为包含块

&emsp;&emsp;给父级设置position:absolute或fixed或relative

<iframe style="width: 100%; height: 260px;" src="https://demo.xiaohuochai.site/css/overflow/o4.html" frameborder="0" width="320" height="240"></iframe>

【2】overflow元素的子元素为包含块

&emsp;&emsp;在绝对定位元素和overflow元素之间增加一个元素并设置position:absolute或fixed或relative

<div>
<pre>&lt;div style="overflow:hidden;"&gt;
    &lt;div style="position:relative"&gt;
        &lt;div style="position:absolute"&gt;绝对定位元素&lt;/div&gt;    
    &lt;/div&gt;    
&lt;/div&gt;</pre>
</div>

&nbsp;

### 应用

&emsp;&emsp;当overflow设置为auto或scroll或hidden时可以触发BFC，使得overflow可以实现一些相关应用。[关于BFC的详细信息移步至此](http://www.cnblogs.com/xiaohuochai/p/5248536.html)

【1】清除浮动影响

<iframe style="width: 100%; height: 230px;" src="https://demo.xiaohuochai.site/css/overflow/o5.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;注意：IE6-浏览器使用overflow这种方式并不能清除浮动，常用的消除浮动的方法是

<div>
<pre>.clear{
    *zoom: 1;
}
.clear:after{
    content: '';
    display: block;
    clear: both;
}</pre>
</div>

&nbsp;

【2】避免margin穿透

<iframe style="width: 100%; height: 230px;" src="https://demo.xiaohuochai.site/css/overflow/o6.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;注意：使用overflow属性只是避免margin穿透的很多方法中的一个，其他的方法还有BFC化、设置padding、设置border等&nbsp;

&nbsp;

【3】两栏自适应布局

<iframe style="width: 100%; height: 230px;" src="https://demo.xiaohuochai.site/css/overflow/o7.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;注意：使用overflow属性的场景限制比较明显，常用的两栏自适应布局的方法:

<div>
<pre>.cell{
    display: table-cell; width: 2000px;
    *display: inline-block; *width:auto;
}</pre>
</div>

&nbsp;

【4】选项卡

 &emsp;&emsp;overflow选项卡主要用于单页应用

<div>
<pre>&lt;div class="box"&gt;
    &lt;ul class="show"&gt;
        &lt;li class="show-in" id="one"&gt;1&lt;/li&gt;
        &lt;li class="show-in" id="two"&gt;2&lt;/li&gt;
        &lt;li class="show-in" id="three"&gt;3&lt;/li&gt;
        &lt;li class="show-in" id="four"&gt;4&lt;/li&gt;
    &lt;/ul&gt;
    &lt;nav class="con"&gt;
        &lt;a class="con-in" href="#one"&gt;1&lt;/a&gt;
        &lt;a class="con-in" href="#two"&gt;2&lt;/a&gt;
        &lt;a class="con-in" href="#three"&gt;3&lt;/a&gt;
        &lt;a class="con-in" href="#four"&gt;4&lt;/a&gt;
    &lt;/nav&gt;    
&lt;/div&gt;    </pre>
</div>
<div>
<pre>body{
    margin: 0;
    text-align: center;
}
ul{
    margin: 0;
    padding: 0;
    list-style: none;
}
a{
    text-decoration: none;
    color: inherit;
}
.show{
    width: 100px;
    height: 100px;
    overflow: hidden;
    border: 1px solid black;
    line-height: 100px;
    font-size: 40px;
}    
.show-in{
    width: 100px;
    height: 100px;
}
#one{
    background-color: lightgreen;
}
#two{
    background-color: lightyellow;
}
#three{
    background-color: lightblue;
}
#four{
    background-color: pink;
}
.con{
    margin: 10px 0 0 10px;
    width: 100px;
}
.con-in{
    display:inline-block;
    width: 16px;
    line-height: 16px;
    border: 1px solid black;
    background-color: gray;
}</pre>
</div>

<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/css/overflow/o8.html" frameborder="0" width="320" height="240"></iframe>

