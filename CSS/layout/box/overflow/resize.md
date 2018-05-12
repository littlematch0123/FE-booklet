# CSS拉伸resize

&emsp;&emsp;CSS3新增了resize属性，该属性允许用户通过拖动的方式来修改元素的尺寸。本来resize应该翻译为缩放，但在实际测试中通过resize属性只可以在宽高基础上实现拉伸效果，而无法实现缩放到小于宽高的效果。

&emsp;&emsp;注意：IE浏览器不支持resize属性

**resize**

&emsp;&emsp;resize与overflow关系紧密，只有当元素的overflow属性值不是visible时，resize才会起作用

&emsp;&emsp;注意：因为文本框本身就具有overflow:auto的属性，所以自带resize属性

&emsp;&emsp;值: none | both | horizontal | vertical

&emsp;&emsp;初始值: none

&emsp;&emsp;应用于: 块级元素、替换元素、表单元格

&emsp;&emsp;继承性: 无

<div>
<pre>none: 用户无法调整元素尺寸
both: 用户可调整元素的宽度和高度
horizontal: 用户只可调整元素的宽度
vertical: 用户只可调整元素的高度</pre>
</div>

<iframe style="width: 100%; height: 220px;" src="https://demo.xiaohuochai.site/css/resize/r1.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;注意：在win7下resize拖拽区域的大小是17px*17px，实际上它就是滚动条尺寸