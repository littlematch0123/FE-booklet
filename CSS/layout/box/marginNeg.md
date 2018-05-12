# 深入理解CSS中的margin负值

&emsp;&emsp;margin属性在实际中非常常用，也是平时踩坑较多的地方。margin折叠部分相信不少人都因为这样那样的原因中过招。margin负值也是很常用的功能，很多特殊的布局方法都依赖于它。它看似简单，实际上却蛮复杂，本文就margin负值作详细介绍和梳理

&emsp;&emsp;注意：[关于margin部分的基础知识移步至此](http://www.cnblogs.com/xiaohuochai/p/5202597.html#anchor3)

&nbsp;

### 表现

&emsp;&emsp;虽然margin可以应用到所有元素，但display属性不同时，表现也不同

&emsp;&emsp;【1】block元素可以使用四个方向的margin值

&emsp;&emsp;【2】inline元素使用上下方向的margin值无效

&emsp;&emsp;【3】inline-block使用上下方向的margin负值看上去无效

&emsp;&emsp;注意：inline-block使用上下方向的margin负值只是看上去无效，这与其默认的vertical-align:baseline有关系，当垂直对齐的属性值为其他值时，则会显示不同的视觉效果

<iframe style="width: 100%; height: 400px;" src="https://demo.xiaohuochai.site/css/margin/m999.html" frameborder="0" width="320" height="240"></iframe>

### 重叠

&emsp;&emsp;margin负值并不总是后面元素覆盖前面元素，它与元素display属性有关系

&emsp;&emsp;【1】两个block元素重叠时，后面元素可以覆盖前面元素的背景，但无法覆盖其内容

&emsp;&emsp;【2】当两个inline元素，或两个line-block元素，或inline与inline-block元素重叠时，后面元素可以覆盖前面元素的背景和内容

&emsp;&emsp;【3】当inline元素(或inline-block元素)与block元素重叠时，inline元素(或inline-block元素)覆盖block元素的背景，而内容的话， 后面的元素覆盖前面的元素

&emsp;&emsp;综上所述，个人理解，在普通流布局中，浏览器将页面布局分为内容和背景，内容的层叠显示始终高于背景。block元素分为内容和背景，而inline元素或inline-block元素，它本身就是内容(包括其背景等样式设置)

<iframe style="width: 100%; height: 438px;" src="https://demo.xiaohuochai.site/css/margin/m100.html" frameborder="0" width="320" height="240"></iframe>

### 浮动

&emsp;&emsp;【1】block元素与浮动元素重叠时，其边框和背景在该浮动元素之下显示，而内容在浮动元素之上显示

&emsp;&emsp;【2】inline或inline-block元素与浮动元素重叠时，其边框、背景和内容都在该浮动元素之上显示

<iframe style="width: 100%; height: 493px;" src="https://demo.xiaohuochai.site/css/margin/m111.html" frameborder="0" width="320" height="240"></iframe>

### 定位

&emsp;&emsp;【1】定位元素(position不为static)覆盖其他元素的背景和内容

&emsp;&emsp;【2】将relative属性值应用于inline元素，由于无法改变其行内元素的本质，所以其上下margin依然存在问题

<iframe style="width: 100%; height: 549px;" src="https://demo.xiaohuochai.site/css/margin/m122.html" frameborder="0" width="320" height="240"></iframe>

### 应用

【1】水平垂直居中

&emsp;&emsp;如果要居中的元素的宽/高是不变的或者说是确定的，比如width/height=100px，那么设置absolute的top/left=50%，然后margin-left/margin-top=-50px即可

&emsp;&emsp;如果要居中的元素的宽/高是不确定的，这时margin负值就不能使用具体的px了，可以使用百分比。但由于margin的百分比都是相对于包含块的宽度，所以这里限制了只能设置宽高相同的居中元素。包含块的宽度如何获得呢？利用absolute的包裹性，在需要居中的元素外面套一个空的&lt;div&gt;元素即可

<div>
<pre>.box{
    position:relative;
    width: 200px;
    height: 200px;
    background-color: lightgreen;
    border: 2px solid black;
}
.out{
    position: absolute;
    left: 50%;
    top: 50%;
}    
.in{
    height: 100px;
    width: 100px;
    background-color: pink;
    margin-left: -50%;
    margin-top: -50%;
}</pre>
</div>
<div>
<pre>&lt;div class="box"&gt;
    &lt;div class="out"&gt;
        &lt;div class="in"&gt;测试内容&lt;/div&gt;    
    &lt;/div&gt;    
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 220px;" src="https://demo.xiaohuochai.site/css/margin/m13.html" frameborder="0" width="320" height="240"></iframe>

【2】列表项两端对齐

&emsp;&emsp;比如外层元素宽度为200px，内层3个元素，宽度为60px，margin-right为10px。这里，正常流中块级元素框的水平总和总共为210px，超过了父元素的宽度200px，则第三个元素会被挤下来。当然可以给第三个元素设置margin-right=0。但，这种方法不优雅，为布局而布局，第三个元素并没有什么特殊的，却被设置了特殊的样式

&emsp;&emsp;优雅的方法应该是内层元素和外层元素之间包一层元素，设置margin-right=-10px，使块级元素框的水平总和总共为210px - 10px = 200x ，等于父元素的宽度即可

&emsp;&emsp;注意：设置overflow:hidden用于清除浮动

<div>
<pre>ul{
    margin: 0;
    padding: 0;
    list-style:none;
}
.box{
    width: 200px;
    background-color: pink;    
}
.list{
    overflow: hidden;
    margin-right: -10px;
}
.in{
    float: left;
    width: 60px;
    height: 100px;
    background-color: lightgreen;
    margin-right: 10px;
}</pre>
</div>
<div>
<pre>&lt;div class="box"&gt;
    &lt;ul class="list"&gt;
        &lt;li class="in"&gt;1&lt;/li&gt;
        &lt;li class="in"&gt;2&lt;/li&gt;
        &lt;li class="in"&gt;3&lt;/li&gt;
    &lt;/ul&gt;    
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/margin/m14.html" frameborder="0" width="320" height="240"></iframe>

【3】三栏自适应布局

&emsp;&emsp;中间的主体使用双层标签，外层&lt;div&gt;宽度100%显示，并且浮动，内层&lt;div&gt;为真正的主体内容，含有左右110px的margin值。左栏和右栏都采用margin负值。左栏左浮动，margin-left为-100%，正好使左栏位于页面左侧。右栏左浮动，大小为其本身的宽度100px

<div>
<pre>html,body{
    height: 100%;
}
body{
    margin: 0;
}
.main{
    width: 100%;
    height: 100%;
    float: left;
}
.main .in{
    margin: 0 110px;
    background-color: pink;
    height: 100%;
}
.left,.right{
    height: 100%;
    width: 100px;
    float: left;
    background-color: lightgreen;
}
.left{
    margin-left: -100%;
}
.right{
    margin-left: -100px;
}</pre>
</div>
<div>
<pre>&lt;body&gt;
&lt;div class="main"&gt;
    &lt;div class="in"&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;div class="left"&gt;&lt;/div&gt;
&lt;div class="right"&gt;&lt;/div&gt;
&lt;/body&gt;</pre>
</div>

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/margin/m15.html" frameborder="0" width="320" height="240"></iframe>

【4】三栏等高布局

&emsp;&emsp;给每栏设置大的底部内边距，然后用数值相同的负外边距消除这个高度，然后在外层容器中设置overflow为hidden

<div>
<pre>body{
    margin: 0;
    overflow: hidden;
}
ul{
    margin: 0;
    padding: 0;
    list-style: none;
}
.list{
    overflow: hidden;
    width: 100%;
    height: 100%;
}
.main{
    margin: 0 110px;
    background-color: lightgreen;
}
.left{
    width: 100px;
    float: left;
    background-color: pink;
}
.right{
    width: 100px;
    float: right;
    background-color: pink;
}
.main,.left,.right{
    margin-bottom: -9999px;
    padding-bottom: 9999px;
}</pre>
</div>
<div>
<pre>&lt;ul class="list"&gt;
    &lt;li class="left"&gt;左侧文字比较少&lt;/li&gt;
    &lt;li class="right"&gt;右侧文字比较多右侧文字比较多右侧文字比较多右侧文字比较多右侧文字比较多右侧文字比较多右侧文字比较多右侧文字比较多右侧文字比较多右侧文字比较多右侧文字比较多右侧文字比较多右侧文字比较多右侧文字比较多右侧文字比较多右侧文字比较多&lt;/li&gt;
    &lt;li class="main"&gt;中间文字比较少&lt;/li&gt;    
&lt;/ul&gt;
&lt;/body&gt;</pre>
</div>

<iframe style="line-height: 1.5; width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/margin/m16.html" frameborder="0" width="320" height="240"></iframe>

