# CSS文本方向

&emsp;&emsp;一般地，正常网页文本方向都是从上到下，从左到右。实际上，有多种设置文本方向的属性，前面已经详细介绍过text-align，HTML全局属性中有一个"dir"属性就是专门用来设置文本方向的，设置文本方向的CSS样式有direction、unicode-bidi和writing-mode。本文将详细介绍网页文本方向的设置方法

&nbsp;

### text-align

&emsp;&emsp;水平对齐实现上影响的是一个元素中的文本的水平对齐方式，[关于text-align的详细信息移步至此](http://www.cnblogs.com/xiaohuochai/p/5325063.html#anchor2)

&emsp;&emsp;值: left | center | right | justify | inherit

&emsp;&emsp;初始值: left

&emsp;&emsp;应用于: 块级元素(包括block和inline-block)

&emsp;&emsp;继承性: 有

<div>
<pre>//left: 1 23 456
//right: 1 23 456</pre>
</div>

<iframe style="width: 100%; height: 263px;" src="https://demo.xiaohuochai.site/css/dir/d1.html" frameborder="0" width="320" height="240"></iframe>

### writing-mode

&emsp;&emsp;writing-mode原先是IE的私有属性，原先的属性是lr-tb(左-右，上-下)和tb-rl(上-下，右-左)。其中writing-mode:tb-rl常用于触发haslayout。但W3C将writing-mode属性标准化后，其属性值也发生了变化

&emsp;&emsp;writing-mode属性与其他改变文本方向的属性非常不一样。它不仅改变文本的显示方向，更直接改变了文本流的方向。如果其属性值改为vertical-rl，则文本流改成了垂直方向，则text-align变成了垂直对齐，vertical-align变成了水平对齐

&emsp;&emsp;值: horizontal-tb | vertical-rl | vertical-lr

&emsp;&emsp;初始值: horizontal-tb

&emsp;&emsp;应用于: 除表格类元素之外的所有元素

&emsp;&emsp;继承性: 有

&emsp;&emsp;注意：safari和移动端IOS和android需要添加-webkit-前缀；IE浏览器只支持自己的私有属性值

<iframe style="width: 100%; height: 231px;" src="https://demo.xiaohuochai.site/css/dir/d2.html" frameborder="0" width="320" height="240"></iframe>

### dir

&emsp;&emsp;dir是HTML的全局属性，专门用来设置文本的方向

&emsp;&emsp;值: ltr | rtl | auto

<div>
<pre>//ltr: 1 23 456
//rtl: 456 23 1</pre>
</div>

<iframe style="width: 100%; height: 231px;" src="https://demo.xiaohuochai.site/css/dir/d3.html" frameborder="0" width="320" height="240"></iframe>

### direction

&emsp;&emsp;direction是设置文本方向的CSS样式

&emsp;&emsp;值: ltr | rtl | inherit

&emsp;&emsp;初始值: ltr

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 有

&emsp;&emsp;注意：想让direction样式在inline元素上起作用，需要unicode-bidi样式的相关设置

&emsp;&emsp;注意：设置direction样式时，HTML元素的全局属性dir无效

<div>
<pre>ltr: 从左到右(left to right)
rtl: 从右到左(right to left)</pre>
</div>
<div>
<pre>//ltr: 1 23 456
//rtl: 456 23 1</pre>
</div>

<iframe style="width: 100%; height: 326px;" src="https://demo.xiaohuochai.site/css/dir/d4.html" frameborder="0" width="320" height="240"></iframe>

### unicode-bidi

&emsp;&emsp;unicode-bidi是一种更健壮的处理文本方向的方式

&emsp;&emsp;值: normal | embed | bidi-override | isolate | isolate-override | plaintext | inherit

&emsp;&emsp;初始值: normal

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 无

&emsp;&emsp;注意：unicode-bidi属性应用于flex弹性盒模型上有问题，除非伸缩容器只包含一个匿名伸缩项目时有效，其余情况都无效

&emsp;&emsp;注意：isolate、isolate-override、plaintext是实验属性值，几乎没有浏览器支持

<div>
<pre>//display:inline-block/block
normal/embed: 456 23 1
bidi-override: 654 32 1

//display:inline
normal:1 23 456
embed: 456 23 1
bidi-override: 654 32 1</pre>
</div>

&emsp;&emsp;注意：只有当dir为rtl或direction为rtl时，unicode-bidi属性才起作用

<iframe style="width: 100%; height: 358px;" src="https://demo.xiaohuochai.site/css/dir/d5.html" frameborder="0" width="320" height="240"></iframe>

