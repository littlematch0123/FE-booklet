# 两列自适应布局的4种思路

&emsp;&emsp;前面已经介绍过[单列定宽单列自适应](http://www.cnblogs.com/xiaohuochai/p/5452865.html)的两列布局，而两列自适应布局是指一列由内容撑开，另一列撑满剩余宽度的布局方式。本文将从[float](http://www.cnblogs.com/xiaohuochai/p/5243735.html)、[table](http://www.cnblogs.com/xiaohuochai/p/5008466.html)、[flex](http://www.cnblogs.com/xiaohuochai/p/5323146.html)和[grid](http://www.cnblogs.com/xiaohuochai/p/7083153.html)来介绍两列自适应布局的4种思路

&nbsp;

### float

【思路一】float

 &emsp;&emsp;在单列定宽单列自适应的两列布局中，经常用float和[负margin](http://www.cnblogs.com/xiaohuochai/p/5314289.html)配合实现布局效果。但由于margin取值只能是固定值，所以在两列都是自适应的布局中就不再适用。而float和[overflow](http://www.cnblogs.com/xiaohuochai/p/5289653.html)配合可实现两列自适应效果。使用overflow属性来触发[bfc](http://www.cnblogs.com/xiaohuochai/p/5248536.html)，来阻止浮动造成的文字环绕效果。由于设置overflow:hidden并不会触发IE6-浏览器的[haslayout](http://www.cnblogs.com/xiaohuochai/p/4845314.html)属性，所以需要设置zoom:1来兼容IE6-浏览器

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{overflow: hidden;zoom: 1;}
.left{float: left;margin-right: 20px;}    
.right{overflow: hidden;zoom: 1;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
        &lt;p&gt;left&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class="right"  style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;        
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju2/b1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### table

【思路二】table

&emsp;&emsp;若table元素不设置table-layout:fixed，则宽度由内容撑开。在某个table-cell元素的外层嵌套一层div，并设置足够小的宽度如width:0.1%

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{display:table;width:100%;}
.leftWrap{display:table-cell;width:0.1%;}
.left{margin-right: 20px;}    
.right{display:table-cell;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="leftWrap" style="background-color: pink;"&gt;
        &lt;div class="left" style="background-color: lightblue;"&gt;
            &lt;p&gt;left&lt;/p&gt;
        &lt;/div&gt;        
    &lt;/div&gt;
    &lt;div class="right"  style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;        
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju2/b2.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### flex

【思路三】flex

&emsp;&emsp;flex弹性盒模型是非常强大的布局方式。基本上，一般的布局方式都可以实现

&emsp;&emsp;注意：IE9-不支持

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{display:flex;}  
.right{margin-left:20px; flex:1;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
        &lt;p&gt;left&lt;/p&gt;
    &lt;/div&gt;        
    &lt;div class="right"  style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;        
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju2/b3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### grid

【思路四】grid

&emsp;&emsp;注意：IE10-浏览器不支持

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{display:grid;grid-template-columns:auto 1fr;grid-gap:20px}  
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
        &lt;p&gt;left&lt;/p&gt;
    &lt;/div&gt;        
    &lt;div class="right"  style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;        
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju2/b4.html" frameborder="0" width="320" height="240"></iframe>
