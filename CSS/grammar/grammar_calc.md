# 理解CSS中的数学表达式calc()

&emsp;&emsp;数学表达式calc()是CSS中的函数，主要用于数学运算。使用calc()为页面元素布局提供了便利和新的思路。本文将介绍calc()的相关内容

&nbsp;

### 定义

&emsp;&emsp;数学表达式calc()是calculate计算的缩写，它允许使用+、-、*、/这四种运算符，可以混合使用%、px、em、rem等单位进行计算

&emsp;&emsp;兼容性: IE8-、safari5.1-、ios5.1-、android4.3-不支持，android4.4-4.4.4只支持加法和减法。IE9不支持用于backround-position

&emsp;&emsp;注意：+和-运算符两边一定要有空白符

<div>
<pre>&lt;style&gt;
.test1{
    border: calc( 1px + 1px ) solid black;
    /* calc里面的运算遵循*、/优先于+、-的顺序 */
    width: calc(100%/3 - 2*1em - 2*1px);
    background-color: pink;
    font-style: toggle(italic, normal); 
}
.test2{
    /* 由于运算符+的左右两侧没有空白符，所以失效 */
    border: calc(1px+1px) solid black;
    /* 对于，不能小于0的属性值，当运算结果小于0时，按0处理 */
    width: calc(10px - 20px);
    padding-left: 10px;
    background-color: lightblue;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="test1"&gt;测试文字一&lt;/div&gt;    
&lt;div class="test2"&gt;测试文字二&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 150px;" src="https://demo.xiaohuochai.site/css/base/b10.html" frameborder="0" width="320" height="240"></iframe>

### 应用

&emsp;&emsp;数学表达式calc()常用于布局中的不同单位的数字运算

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{overflow: hidden;zoom: 1;}
.left{float: left;width: 100px;margin-right: 20px;}    
.right{float: left;width: calc(100% - 120px);}
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

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/base/b11.html" frameborder="0" width="320" height="240"></iframe>

