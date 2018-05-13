# 文本溢出text-overflow和文本阴影text-shadow

&emsp;&emsp;CSS3新增了一些关于文本的样式，其中text-overflow文本溢出和text-shadow文本阴影有些特别。因为它们有对应的[overflow](http://www.cnblogs.com/xiaohuochai/p/5289653.html)溢出属性和[box-shadow](http://www.cnblogs.com/xiaohuochai/p/6244492.html#anchor5)盒子阴影属性。本文将详细介绍这两个作用在文本上的溢出和阴影属性

&nbsp;

### 文本溢出

&emsp;&emsp;一般地，人们一提到文本溢出，想到的就是文本溢出的经典代码

<div>
<pre>white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;</pre>
</div>

&emsp;&emsp;但实际上，文本换行不一定非要使用white-space；overflow属性值也不一定非要使用hidden

**定义**

text-overflow

&emsp;&emsp;值: clip | ellipsis

&emsp;&emsp;初始值: clip

&emsp;&emsp;应用于: 块级元素、替换元素、表单元格

&emsp;&emsp;继承性: 无

<div>
<pre>clip: 不显示省略标记(...)，只是简单的裁切，相当于无效果
ellipsis: 文本溢出时显示省略标记(...)，省略标记插入的位置是最后一个字符</pre>
</div>

&emsp;&emsp;注意：当文本溢出属性应用于表单元格时，需要设置table-layout:fixed

&emsp;&emsp;注意：该属性兼容性很好，兼容IE6+的主流浏览器及移动端iso和android

**实现**

【1】当存在长英文文本时，text-overflow属性起作用的前提是

<div>
<pre>overflow(或overflow-y或overflow-x):hidden | auto | scroll</pre>
</div>

【2】当文本为汉字时，text-overflow属性起作用的前提是

<div>
<pre>实现汉字不自动换行可使用word-break: keep-all; 或 white-space: nowrap;
overflow(或overflow-y或overflow-x):hidden | auto | scroll</pre>
</div>

<iframe style="width: 100%; height: 600px;" src="https://demo.xiaohuochai.site/css/textoverflow/t1.html" frameborder="0" width="320" height="240"></iframe>

【多行文本溢出】

&emsp;&emsp;在webkit浏览器中，有一个不规范的属性-webkit-line-clamp，它可以实现多行文本溢出。它的值是一个&lt;number&gt;，设置为几，便可以设置相应数字的文本溢出

&emsp;&emsp;设置多行文本溢出，还需要配合其他样式，样式如下

<div>
<pre>/*溢出隐藏*/
overflow:hidden;
/*旧版本flex*/
display:-webkit-box;
/*旧版伸缩流方向为垂直方向*/
-webkit-box-orient:vertical;
/*溢出隐藏3行*/
-webkit-line-clamp: 3;</pre>
</div>

&emsp;&emsp;实例如下

<div>
<pre>&lt;div style="width:300px;overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp: 3;"&gt;
    我是测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字
&lt;/div&gt;    </pre>
</div>

<iframe style="width: 100%; height: 90px;" src="https://demo.xiaohuochai.site/css/textoverflow/t2.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;注意：不要显式地设置高度，而应该让其自适应高度，否则会造成如下效果

<div>
<pre>&lt;div style="width:300px;height: 75px;overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp: 3;"&gt;
    我是测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字
&lt;/div&gt; </pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/css/textoverflow/t3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 文本阴影

&emsp;&emsp;类似于盒子阴影，文本阴影也有x轴偏移、y轴偏移、模糊半径和阴影颜色这四个值，但是并没有阴影尺寸和内部阴影这两个值

**定义**

text-shadow

&emsp;&emsp;值: none | (h-shadow v-shadow blur color)+

&emsp;&emsp;初始值: none

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 无

<div>
<pre>h-shadow: 水平阴影位置(必须)
v-shadow: 垂直阴影位置(必须)
blur:     模糊距离(该值不能为负值，可选)
color:    阴影颜色，默认和文本颜色一致(可选) </pre>
</div>

&emsp;&emsp;注意：该属性IE9-浏览器不支持

<iframe style="width: 100%; height: 320px;" src="https://demo.xiaohuochai.site/css/textoverflow/t4.html" frameborder="0" width="320" height="240"></iframe>

<div>
<pre>//多层阴影
text-shadow: 1px 1px blue,5px 5px 5px red;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/css/textoverflow/t5.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;注意：不要加太多层阴影，会有性能问题


**常见效果**

<iframe style="width: 100%; height: 400px;" src="https://demo.xiaohuochai.site/css/textoverflow/t6.html" frameborder="0" width="320" height="240"></iframe>

[【文字阴影代码查看】](http://runjs.cn/code/hvb4x6wt)

