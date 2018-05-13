# 实现CSS等分布局的5种方式

&emsp;&emsp;等分布局是指子元素平均分配父元素宽度的布局方式，本文将介绍实现等分布局的5种方式

&nbsp;

### float&nbsp;

【思路一】float

&emsp;&emsp;缺点:结构和样式存在耦合性，IE7-浏览器下对宽度百分比取值存在四舍五入的误差

【1】float + padding + background-clip

&emsp;&emsp;使用padding来实现子元素之间的间距，使用background-clip使子元素padding部分不显示背景

<div>
<pre>&lt;style&gt;
body,p{margin: 0;}
.parentWrap{
    overflow: hidden;
}
.parent{
    margin-right: -20px;
    overflow: hidden;
}
.child{
    float: left;
    height: 100px;
    width: 25%;
    padding-right: 20px;
    box-sizing: border-box;
    background-clip: content-box;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parentWrap"&gt;
    &lt;div class="parent" style="background-color: lightgrey;"&gt;
        &lt;div class="child" style="background-color: lightblue;"&gt;1&lt;/div&gt;
        &lt;div class="child" style="background-color: lightgreen;"&gt;2&lt;/div&gt;
        &lt;div class="child" style="background-color: lightsalmon;"&gt;3&lt;/div&gt;
        &lt;div class="child" style="background-color: pink;"&gt;4&lt;/div&gt;                
    &lt;/div&gt;    
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/dengfen/d1.html" frameborder="0" width="320" height="240"></iframe>

【2】float + margin + calc

&emsp;&emsp;使用margin实现子元素之间的间距，使用calc()函数计算子元素的宽度

<div>
<pre>&lt;style&gt;
body,p{margin: 0;}
.parentWrap{
    overflow: hidden;
}
.parent{
    overflow: hidden;
    margin-right: -20px;
}
.child{
    float: left;
    height: 100px;
    width: calc(25% - 20px);
    margin-right: 20px;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parentWrap"&gt;
    &lt;div class="parent" style="background-color: lightgrey;"&gt;
        &lt;div class="child" style="background-color: lightblue;"&gt;1&lt;/div&gt;
        &lt;div class="child" style="background-color: lightgreen;"&gt;2&lt;/div&gt;
        &lt;div class="child" style="background-color: lightsalmon;"&gt;3&lt;/div&gt;
        &lt;div class="child" style="background-color: pink;"&gt;4&lt;/div&gt;                
    &lt;/div&gt;    
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/dengfen/d2.html" frameborder="0" width="320" height="240"></iframe>

【3】float + margin + (fix)

&emsp;&emsp;使用margin实现子元素之间的间距，通过增加结构来实现兼容

<div>
<pre>&lt;style&gt;
body,p{margin: 0;}
.parentWrap{
    overflow: hidden;
}
.parent{
    overflow: hidden;
    margin-right: -20px;
}
.child{
    float: left;
    width: 25%;
}
.in{
    margin-right: 20px;
    height: 100px;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parentWrap"&gt;
    &lt;div class="parent" style="background-color: lightgrey;"&gt;
        &lt;div class="child" style="background-color: blue;"&gt;
            &lt;div class="in" style="background-color: lightblue;"&gt;1&lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="child" style="background-color: green;"&gt;
            &lt;div class="in" style="background-color: lightgreen;"&gt;2&lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="child" style="background-color: orange;"&gt;
            &lt;div class="in" style="background-color: lightsalmon;"&gt;3&lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="child" style="background-color: red;"&gt;
            &lt;div class="in" style="background-color: pink;"&gt;4&lt;/div&gt;
        &lt;/div&gt;                
    &lt;/div&gt;    
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/dengfen/d3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### inline-block

【思路二】inline-block

&emsp;&emsp;缺点：需要设置垂直对齐方式vertical-align，则需要处理换行符解析成空格的间隙问题。IE7-浏览器不支持给块级元素设置inline-block属性，兼容代码是display:inline;zoom:1;

【1】inline-block + padding + background-clip

<div>
<pre>&lt;style&gt;
body,p{margin: 0;}
.parentWrap{
    overflow: hidden;
}
.parent{
    font-size: 0;
    margin-right: -20px;
    overflow: hidden;
}
.child{
    display:inline-block;
    vertical-align: top;
    width: 25%;
    padding-right: 20px;
    box-sizing: border-box;
    background-clip: content-box;
    font-size: 16px;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parentWrap"&gt;
    &lt;div class="parent" style="background-color: lightgrey;"&gt;
        &lt;div class="child" style="background-color: lightblue;"&gt;1&lt;/div&gt;
        &lt;div class="child" style="background-color: lightgreen;"&gt;2&lt;/div&gt;
        &lt;div class="child" style="background-color: lightsalmon;"&gt;3&lt;/div&gt;
        &lt;div class="child" style="background-color: pink;"&gt;4&lt;/div&gt;                
    &lt;/div&gt;    
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/dengfen/d4.html" frameborder="0" width="320" height="240"></iframe>

【2】inline-block + margin + calc

<div>
<pre>&lt;style&gt;
body,p{margin: 0;}
.parentWrap{
    overflow: hidden;
}
.parent{
    margin-right: -20px;
    font-size: 0;
}
.child{
    display: inline-block;
    vertical-align: top;
    font-size: 16px;
    height: 100px;
    width: calc(25% - 20px);
    margin-right: 20px;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parentWrap"&gt;
    &lt;div class="parent" style="background-color: lightgrey;"&gt;
        &lt;div class="child" style="background-color: lightblue;"&gt;1&lt;/div&gt;
        &lt;div class="child" style="background-color: lightgreen;"&gt;2&lt;/div&gt;
        &lt;div class="child" style="background-color: lightsalmon;"&gt;3&lt;/div&gt;
        &lt;div class="child" style="background-color: pink;"&gt;4&lt;/div&gt;                
    &lt;/div&gt;    
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/dengfen/d5.html" frameborder="0" width="320" height="240"></iframe>

【3】inline-block + margin + (fix)

<div>
<pre>&lt;style&gt;
body,p{margin: 0;}
.parentWrap{
    overflow: hidden;
}
.parent{
    margin-right: -20px;
    font-size: 0;
}
.child{
    display: inline-block;
    vertical-align: top;
    font-size: 16px;
    width: 25%;
}
.in{
    margin-right: 20px;
    height: 100px;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parentWrap"&gt;
    &lt;div class="parent" style="background-color: lightgrey;"&gt;
        &lt;div class="child" style="background-color: blue;"&gt;
            &lt;div class="in" style="background-color: lightblue;"&gt;1&lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="child" style="background-color: green;"&gt;
            &lt;div class="in" style="background-color: lightgreen;"&gt;2&lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="child" style="background-color: orange;"&gt;
            &lt;div class="in" style="background-color: lightsalmon;"&gt;3&lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="child" style="background-color: red;"&gt;
            &lt;div class="in" style="background-color: pink;"&gt;4&lt;/div&gt;
        &lt;/div&gt;                
    &lt;/div&gt;    
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/dengfen/d6.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### table

【思路三】table

 &emsp;&emsp;缺点：元素被设置为table后，内容撑开宽度。若要兼容IE7-浏览器，需要改为&lt;table&gt;结构。table-cell元素无法设置margin，设置padding及background-clip也不可行

<div>
<pre>&lt;style&gt;
body,p{margin: 0;}
.parentWrap{
    overflow: hidden;
}
.parent{
    display: table;
    width: calc(100% + 20px);
    table-layout: fixed;
}
.child{
    display: table-cell;
    padding-right: 20px;
}
.in{
    height: 100px;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parentWrap"&gt;
    &lt;div class="parent" style="background-color: lightgrey;"&gt;
        &lt;div class="child" style="background-color: blue;"&gt;
            &lt;div class="in" style="background-color: lightblue;"&gt;1&lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="child" style="background-color: green;"&gt;
            &lt;div class="in" style="background-color: lightgreen;"&gt;2&lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="child" style="background-color: orange;"&gt;
            &lt;div class="in" style="background-color: lightsalmon;"&gt;3&lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="child" style="background-color: red;"&gt;
            &lt;div class="in" style="background-color: pink;"&gt;4&lt;/div&gt;
        &lt;/div&gt;                
    &lt;/div&gt;    
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/dengfen/d7.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### flex

【思路四】flex

<div>
<pre>&lt;style&gt;
body,p{margin: 0;}
.parent{
    display: flex;
}
.child{
    flex:1;
    height: 100px;
}
.child + .child{
    margin-left: 20px;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="child" style="background-color: lightblue;"&gt;1&lt;/div&gt;
    &lt;div class="child" style="background-color: lightgreen;"&gt;2&lt;/div&gt;
    &lt;div class="child" style="background-color: lightsalmon;"&gt;3&lt;/div&gt;
    &lt;div class="child" style="background-color: pink;"&gt;4&lt;/div&gt;                
&lt;/div&gt;    </pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/dengfen/d8.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### grid

【思路五】grid

<div>
<pre>&lt;style&gt;
body,p{margin: 0;}
.parent{
    display: grid;
    grid-template-columns:repeat(4,1fr);
    grid-gap:20px;
    height: 100px;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="child" style="background-color: lightblue;"&gt;1&lt;/div&gt;
    &lt;div class="child" style="background-color: lightgreen;"&gt;2&lt;/div&gt;
    &lt;div class="child" style="background-color: lightsalmon;"&gt;3&lt;/div&gt;
    &lt;div class="child" style="background-color: pink;"&gt;4&lt;/div&gt;                
&lt;/div&gt; </pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/dengfen/d99.html" frameborder="0" width="320" height="240"></iframe>

