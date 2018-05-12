# CSS轮廓outline

&emsp;&emsp;轮廓outline处在边框边界的外面，它不像边框那样参与到文档流中，因此轮廓出现或消失时不会影响文档流，即不会导致文档的重新显示。利用轮廓，浏览器可以合并部分轮廓，创建一个连续但非矩形的形状。默认地，轮廓是一个动态样式，只有元素获取到焦点或被激活时呈现

&emsp;&emsp;注意：IE7-浏览器不支持

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/css/outline/o1.html" frameborder="0" width="320" height="240"></iframe>

### 轮廓样式

&emsp;&emsp;与边框类似，轮廓最基本的方面是样式，如果一个轮廓没有样式，轮廓将根本不会存在。与边框不同的是，值少了一个hidden

outline-style

&emsp;&emsp;值: none | dotted | dashed | solid | double | groove | ridge | inset | outset | inherit

&emsp;&emsp;初始值: none

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 无

<iframe style="width: 100%; height: 240px;" src="https://demo.xiaohuochai.site/css/outline/o222.html" frameborder="0" width="320" height="240"></iframe>

### 轮廓宽度

&emsp;&emsp;与边框类似，轮廓宽度不能为负数，也不能指定为百分比值

outline-width

&emsp;&emsp;值: thin | medium | thick | &lt;length&gt; | inherit

&emsp;&emsp;初始值: medium

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 无

&emsp;&emsp;注意：如果轮廓的样式是none，则轮廓宽度计算值为0

<iframe style="width: 100%; height: 260px;" src="https://demo.xiaohuochai.site/css/outline/o333.html" frameborder="0" width="320" height="240"></iframe>

### 轮廓颜色

&emsp;&emsp;与边框不同，轮廓颜色有关键字invert反色轮廓，代表对轮廓所在的像素完全反色转换，使轮廓在不同的背景颜色中都可见。但实际上invert关键字只有IE浏览器支持，其他浏览器的轮廓颜色是元素本身的前景色

outline-color

&emsp;&emsp;值: &lt;color&gt; | invert | inherit

&emsp;&emsp;初始值:&nbsp;invert(IE)、前景色(其他浏览器)

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 无

<iframe style="width: 100%; height: 340px;" src="https://demo.xiaohuochai.site/css/outline/o44.html" frameborder="0" width="320" height="240"></iframe>

### 轮廓偏移

&emsp;&emsp;轮廓偏移用来定义轮廓的偏移位置的数值。当参数值为正数时，表示轮廓向外偏移；当参数值为负值时，表示轮廓向内偏移

&emsp;&emsp;注意：IE浏览器不支持

outline-offset

&emsp;&emsp;值: length | inherit

&emsp;&emsp;初始值: 0

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 无

<iframe style="width: 100%; height: 400px;" src="https://demo.xiaohuochai.site/css/outline/o55.html" frameborder="0" width="320" height="240"></iframe>

### 轮廓

&emsp;&emsp;轮廓outline类似于边框样式的border属性，允许一次完成轮廓样式、宽度和颜色的设置。由于给定轮廓必须采用某种统一的样式、宽度和颜色，所以outline是关于轮廓的唯一简写属性。对于轮廓没有诸如outline-top或outline-right之类的属性

&emsp;&emsp;注意：outline中并没有包括outline-offset，需要对outline-offset进行单独设置

outline

&emsp;&emsp;值: [&lt;outline-color&gt; || &lt;outline-style&gt; || &lt;outline-width&gt;] | inherit

&emsp;&emsp;初始值: 无

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 无

&nbsp;

### 应用

&emsp;&emsp;由于轮廓outline不影响元素的盒模型大小，不影响页面布局，所以可以用outline模仿border边框效果。但如果是圆角边框就不是那么好办了。

&emsp;&emsp;firefox浏览器支持私有属性-moz-outline-radius来设置轮廓圆角。该属性对应的js写法是MozOutlineRadius

<iframe style="width: 100%; height: 250px;" src="https://demo.xiaohuochai.site/css/outline/o66.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;对于其他浏览器，我们可以使用其他属性实现类似效果。box-shadow与border-radius属性一脉相承，也就是说如果border-radius是圆角，则box-shadow的投影也是圆角

<div class="cnblogs_code">
<pre>&lt;div class="show"&gt;测试内容&lt;/div&gt;</pre>
</div>
<div class="cnblogs_code">
<pre>.show{
    margin: 50px;
    width: 100px;
    height: 100px;
    background-color: pink;
    border-radius : 1px;
    box-shadow: 0 0 0 30px lightblue;
}</pre>
</div>

<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/css/outline/o7.html" frameborder="0" width="320" height="240"></iframe>

