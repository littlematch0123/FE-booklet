# CSS两端对齐

&emsp;&emsp;两端对齐在导航Nav的制作中非常常用。本文将详细介绍CSS两端对齐的4种实现方式



<p>&nbsp;</p>


### flex

&emsp;&emsp;<a href="http://www.cnblogs.com/xiaohuochai/p/5323146.html" target="_blank">弹性盒模型flex</a>作为强大的弹性布局方式，可以hold住大部分的布局效果，当然也包括两端对齐。可以使用主轴对齐`justify-content`的两端对齐属性`space-between`

    justify-content: space-between;


&emsp;&emsp;如果要考虑flex三个版本的<a href="http://www.cnblogs.com/xiaohuochai/p/5334936.html" target="_blank">兼容</a>，则使用如下代码

&emsp;&emsp;注意：IE9-浏览器不支持

    .justify-content_flex-justify{
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        -webkit-justify-content: space-between;
        justify-content: space-between;
    }


    <style>
    body{margin: 0;}    
    ul{margin: 0;padding: 0;list-style: none;}
    .list{width: 200px;overflow: hidden;border: 1px solid gray;background-color: lightgreen;line-height: 30px;}
    .in{background-color: lightblue;padding: 0 10px;}
    .display_flex{display: -webkit-box;display: -ms-flexbox;display: -webkit-flex;display: flex;}
    .display_flex > *{display: block;}
    .justify-content_flex-justify{-webkit-box-pack: justify;-ms-flex-pack: justify;-webkit-justify-content: space-between;justify-content: space-between;}
    </style>
    <ul class="list display_flex justify-content_flex-justify">
        <li class="in">内容</li>
        <li class="in">样式</li>
        <li class="in">行为</li>
    </ul>

<iframe style="width: 100%; height: 40px" src="https://demo.xiaohuochai.site/css/justify/j1.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>



<p>&nbsp;</p>

### text-align

&emsp;&emsp;<a href="http://www.cnblogs.com/xiaohuochai/p/5325063.html#anchor2" target="_blank">水平对齐`text-align`</a>本身就有一个属性值是两端对齐`justify`。但是，要注意的是，使用它实现两端对齐，需要注意在元素之间添加空白符(包括空格、换行符、制表符)才起作用。由于HTML结构中，`<li>`元素之间存在换行，所以不需要额外添加空白符

&emsp;&emsp;但仅仅是这样，元素也无法实现两端对齐效果


<iframe style="width: 100%; height: 40px" src="https://demo.xiaohuochai.site/css/justify/j2.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


&emsp;&emsp;元素必须占满一行才行，如下所示。占满一行的元素可以实现两端对齐，没有占满的则无法实现

<iframe style="width: 100%; height: 70px" src="https://demo.xiaohuochai.site/css/justify/j3.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

【text-align-last】

&emsp;&emsp;显然，上面的情况都不符合要求，这时就需要使用属性`text-align-last`，该属性用来规定如何对齐文本的最后一行

&emsp;&emsp;于是把`text-align`属性替换成`text-align-last`。但是，要兼容IE浏览器需要同时设置`text-align:justify`

&emsp;&emsp;注意：safari浏览器、IOS、androis4.4-浏览器不支持

    <style>
    body{margin: 0;}    
    ul{margin: 0;padding: 0;list-style: none;}
    .list{width: 200px;overflow: hidden;border: 1px solid gray;background-color: lightgreen;line-height: 30px;text-align: justify;text-align-last: justify;}
    .in{background-color: lightblue;padding: 0 10px;display:inline-block;}
    </style>
    <ul class="list ">
        <li class="in">内容</li>
        <li class="in">样式</li>
        <li class="in">行为</li>  
    </ul>


<iframe style="width: 100%; height: 40px" src="https://demo.xiaohuochai.site/css/justify/j4.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>



【after伪元素】

&emsp;&emsp;使用`text-align-last`可以实现两端对齐的效果，但是兼容性并不好。通过给父元素设置<a href="http://www.cnblogs.com/xiaohuochai/p/5021121.html" target="_blank">伪元素`:after`</a>，并为伪元素设置`inline-block`，并设置宽度100%，相当于伪元素`:after`被挤到第二行。从而使原来的元素占满了第一行，触发了两端对齐的效果

&emsp;&emsp;这里要注意的是，因为空白会被解析为换行，所以可以通过设置父元素的高度`height`，并溢出隐藏，来解决多余的换行问题

    <style>
    body{margin: 0;}    
    ul{margin: 0;padding: 0;list-style: none;}
    .list{width: 200px;height: 30px;overflow: hidden;border: 1px solid gray;background-color: lightgreen;line-height: 30px;text-align: justify;}
    .in{background-color: lightblue;padding: 0 10px;display:inline-block;}
    .list:after{content:"";width:100%;display:inline-block;}
    </style>
    <ul class="list ">
        <li class="in">内容</li>
        <li class="in">样式</li>
        <li class="in">行为</li>  
    </ul>


<iframe style="width: 100%; height: 40px" src="https://demo.xiaohuochai.site/css/justify/j5.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>



<p>&nbsp;</p>

### column


&emsp;&emsp;使用<a href="http://www.cnblogs.com/xiaohuochai/p/5344541.html" target="_blank">多列布局`column`</a>也可以实现类似的效果。`column-count`定义了元素的列数，例子中有3个子元素，所以定义为3列。特别要注意的是，这时需要把子元素设置为block元素才会生效

&emsp;&emsp;注意：IE9-浏览器不支持

    <style>
    body{margin: 0;}    
    ul{margin: 0;padding: 0;list-style: none;}
    .list{width: 200px;overflow: hidden;border: 1px solid gray;background-color: lightgreen;line-height: 30px;text-align: center;}
    .col3{-webkit-column-count:3;-moz-column-count:3;column-count:3;}
    .in{background-color: lightblue;padding: 0 10px;display:block;}
    </style>
    <ul class="list col3">
        <li class="in">内容</li>
        <li class="in">样式</li>
        <li class="in">行为</li>  
    </ul>


<iframe style="width: 100%; height: 40px" src="https://demo.xiaohuochai.site/css/justify/j6.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

&emsp;&emsp;如果子元素之间需要使用竖线，且竖线高度与子元素高度相同时，使用`column-rule`可方便的实现需求

    <style>
    body{margin: 0;}    
    ul{margin: 0;padding: 0;list-style: none;}
    .list{width: 200px;overflow: hidden;border: 1px solid gray;background-color: lightgreen;line-height: 30px;text-align: center;}
    .col3{-webkit-column-count:3;-moz-column-count:3;column-count:3;}
    .col-rule{-webkit-column-rule: 1px solid black;-moz-column-rule: 1px solid black;column-rule: 1px solid black;}
    .in{background-color: lightblue;padding: 0 10px;display:block;}
    </style>
    <ul class="list col3 col-rule">
        <li class="in">内容</li>
        <li class="in">样式</li>
        <li class="in">行为</li>  
    </ul>

<iframe style="width: 100%; height: 40px" src="https://demo.xiaohuochai.site/css/justify/j7.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

<p>&nbsp;</p>

### grid

&emsp;&emsp;<a href="http://www.cnblogs.com/xiaohuochai/p/7083153.html" target="_blank">栅格布局</a>使用`justify-content`的两端对齐属性`space-between`

&emsp;&emsp;注意：IE10-浏览器不支持


	<style>
	body{margin: 0;}
	ul{margin: 0;padding: 0;list-style: none;}
	.list{width: 200px;overflow: hidden;border: 1px solid gray;background-color: lightgreen;line-height: 30px;display:grid;justify-content:space-between;grid-auto-flow:column;}
	.in{background-color: lightblue;padding: 0 10px;}
	</style>    
    <ul class="list">
        <li class="in">内容</li>
        <li class="in">样式</li>
        <li class="in">行为</li>
    </ul>

<iframe style="width: 100%; height: 40px" src="https://demo.xiaohuochai.site/css/justify/j8.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

