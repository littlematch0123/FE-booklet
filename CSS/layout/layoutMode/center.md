# CSS实现水平居中的5种思路

&emsp;&emsp;水平居中是经常遇到的问题。看似方法较多，条条大路通罗马。但系统梳理下，其实都围绕着几个思路展开。本文将介绍关于水平居中的5种思路

&nbsp;

### text-align

【思路一】：在父元素中设置text-align:center实现行内元素水平居中

&emsp;&emsp;将子元素的display设置为[inline-block](http://www.cnblogs.com/xiaohuochai/p/5202761.html#anchor3)，使子元素变成行内元素

&emsp;&emsp;注意：若要兼容IE7-浏览器，可使用display:inline;zoom:1;来达到inline-block的效果

<div>
<pre>&lt;style&gt;
.parent{text-align: center;}    
.child{display: inline-block;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: gray;"&gt;
  &lt;div class="child" style="background-color: lightblue;"&gt;DEMO&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="line-height: 1.5; width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/css/xcenter/x1.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;这种方法的不足之处在于，子元素的text-align继承了父元素的center，文字也居中显示，所以需要在子元素中设置text-align:left

&nbsp;

### margin

【思路二】：在本身元素设置margin: 0 auto实现块级元素水平居中

【1】将子元素的display为[table](http://www.cnblogs.com/xiaohuochai/p/5202761.html#anchor7)，使子元素成为块级元素，同时table还具有包裹性，宽度由内容撑开

&emsp;&emsp;注意：若要兼容IE7-浏览器，可把child的结构换成&lt;table class="child"&gt;DEMO&lt;/table&gt;

<div>
<pre>&lt;style&gt;
.child{
    display: table;
    margin: 0 auto;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: gray;"&gt;
  &lt;div class="child" style="background-color: lightblue;"&gt;DEMO&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/css/xcenter/x2.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;该方案的优点在于，只设置父级元素即可实现居中效果

【2】若子元素定宽，则可以使用[绝对定位的盒模型属性](http://www.cnblogs.com/xiaohuochai/p/5289143.html#anchor5)，实现居中效果；若不设置宽度时，子元素被拉伸

<div>
<pre>&lt;style&gt;
.parent{
  position: relative;
}
.child{
 position: absolute;
 left: 0;
 right: 0;
 margin: 0 auto;
 width: 50px;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: gray;height: 20px;"&gt;
    &lt;div class="child" style="background-color: lightblue;"&gt;DEMO&lt;/div&gt;   
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/css/xcenter/x3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### absolute

【思路三】: 通过绝对定位的偏移属性实现水平居中

【1】配合translate()位移函数

&emsp;&emsp;[translate函数](http://www.cnblogs.com/xiaohuochai/p/5350254.html#anchor2)的百分比是相对于自身宽度的，所以left:50%配合translateX(-50%)可实现居中效果

&emsp;&emsp;[relative](http://www.cnblogs.com/xiaohuochai/p/5321487.html#anchor1)数值型的偏移属性是相对于自身的，但百分比却是相对于包含块的。因为子元素已经被设置为absolute，所以若使用relative，则需要增加一层&lt;div&gt;结构，使其宽度与子元素宽度相同
　　注意：IE9-浏览器不支持

<div>
<pre>&lt;style&gt;
.parent{
  position: relative;
}
.child{
  position: absolute;
  left: 50%;
  transform:translateX(-50%);
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: gray;height: 20px;"&gt;
  &lt;div class="child" style="background-color: lightblue;"&gt;DEMO&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/css/xcenter/x4.html" frameborder="0" width="320" height="240"></iframe>

【2】配合relative

&emsp;&emsp;[relative](http://www.cnblogs.com/xiaohuochai/p/5321487.html#anchor1)数值型的偏移属性是相对于自身的，但百分比却是相对于包含块的。因为子元素已经被设置为absolute，所以若使用relative，则需要增加一层&lt;div&gt;结构，使其宽度与子元素宽度相同

&emsp;&emsp;[relative](http://www.cnblogs.com/xiaohuochai/p/5321487.html#anchor1)数值型的偏移属性是相对于自身的，但百分比却是相对于包含块的。因为子元素已经被设置为absolute，所以若使用relative，则需要增加一层&lt;div&gt;结构，使其宽度与子元素宽度相同
　　注意：该方法全兼容，但是增加了html结构

<div>
<pre>&lt;style&gt;
.parent{
  position: relative;
}
.childWrap{
  position: absolute;
  left: 50%;
}
.child{
  position: relative;
  left: -50%;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: gray;height: 20px;"&gt;
  &lt;div class="childWrap"&gt;
    &lt;div class="child" style="background-color: lightblue;"&gt;DEMO&lt;/div&gt; 
  &lt;/div&gt;   
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/css/xcenter/x5.html" frameborder="0" width="320" height="240"></iframe>

【3】配合负margin

&emsp;&emsp;[relative](http://www.cnblogs.com/xiaohuochai/p/5321487.html#anchor1)数值型的偏移属性是相对于自身的，但百分比却是相对于包含块的。因为子元素已经被设置为absolute，所以若使用relative，则需要增加一层&lt;div&gt;结构，使其宽度与子元素宽度相同
　　margin的百分比是相对于包含块的，所以需要增加一层&lt;div&gt;结构。由于宽度width的默认值是auto，当设置[负margin](http://www.cnblogs.com/xiaohuochai/p/5314289.html)时，width也会随着变大。所以此时需要定宽处理

&emsp;&emsp;注意：虽然全兼容，但需要增加页面结构及定宽处理，所以限制了应用场景

<div>
<pre>&lt;style&gt;
.parent{
  position: relative;
}
.childWrap{
  position: absolute;
  left: 50%;
}
.child{
  width:50px;
  margin-left:-50%;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: gray;height: 20px;"&gt;
  &lt;div class="childWrap"&gt;
    &lt;div class="child" style="background-color: lightblue;"&gt;DEMO&lt;/div&gt; 
  &lt;/div&gt;   
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/css/xcenter/x6.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### flex

【思路四】: 使用弹性盒模型flex实现水平居中

&emsp;&emsp;[relative](http://www.cnblogs.com/xiaohuochai/p/5321487.html#anchor1)数值型的偏移属性是相对于自身的，但百分比却是相对于包含块的。因为子元素已经被设置为absolute，所以若使用relative，则需要增加一层&lt;div&gt;结构，使其宽度与子元素宽度相同

&emsp;&emsp;注意：IE9-浏览器不支持

【1】在[伸缩容器](http://www.cnblogs.com/xiaohuochai/p/5323146.html#anchor4)上设置主轴对齐方式justify-content:center

<div>
<pre>&lt;style&gt;
.parent{
  display: flex;
  justify-content: center;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: gray;"&gt;
    &lt;div class="child" style="background-color: lightblue;"&gt;DEMO&lt;/div&gt;   
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/css/xcenter/x7.html" frameborder="0" width="320" height="240"></iframe>

【2】在[伸缩项目](http://www.cnblogs.com/xiaohuochai/p/5323146.html#anchor5)上设置margin: 0 auto

<div>
<pre>&lt;style&gt;
.parent{display: flex;}
.child{margin: 0 auto;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: gray;"&gt;
    &lt;div class="child" style="background-color: lightblue;"&gt;DEMO&lt;/div&gt;   
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/css/xcenter/x8.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### grid

【思路五】: 使用栅格布局grid实现水平居中

&emsp;&emsp;[relative](http://www.cnblogs.com/xiaohuochai/p/5321487.html#anchor1)数值型的偏移属性是相对于自身的，但百分比却是相对于包含块的。因为子元素已经被设置为absolute，所以若使用relative，则需要增加一层&lt;div&gt;结构，使其宽度与子元素宽度相同

&emsp;&emsp;注意：IE10-浏览器不支持

【1】在网格容器上设置justify-items或justify-content

<div>
<pre>&lt;style&gt;
.parent{
  display:grid;
  justify-items:center;
 /*justify-content:center;*/
} 
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: gray;"&gt;
  &lt;div class="child" style="background-color: lightblue;"&gt;DEMO&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/css/xcenter/x9.html" frameborder="0" width="320" height="240"></iframe>

【2】在网格项目中设置justify-self或者margin: 0 auto

<div>
<pre>&lt;style&gt;
.parent{
  display:grid;
} 
.child{
  justify-self:center;
 /*margin: 0 auto;*/
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: gray;"&gt;
  &lt;div class="child" style="background-color: lightblue;"&gt;DEMO&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/css/xcenter/x10.html" frameborder="0" width="320" height="240"></iframe>

