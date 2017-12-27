# 理解CSS外边距margin

&emsp;&emsp;margin是盒模型几个属性中一个非常特殊的属性。简单举几个例子：只有margin不显示当前元素背景，只有margin可以设置为负值，margin和宽高支持auto，以及margin具有非常奇怪的重叠特性。之前的博文中已经分别详细地介绍了<a href="http://www.cnblogs.com/xiaohuochai/p/5202597.html#anchor3" target="_blank">margin的基础知识</a>和<a href="http://www.cnblogs.com/xiaohuochai/p/5314289.html" target="_blank">负margin的详细用法</a>。本文将详细介绍外边距margin的几个重点部分，包括重叠、auto和无效情况

<p>&nbsp;</p>

### 重叠

【前提】

&emsp;&emsp;margin重叠又叫margin合并，发生这种情况有两个前提

&emsp;&emsp;1、只发生在block元素上(不包括float、absolute、inline-block元素)

&emsp;&emsp;2、只发生在垂直方向上(不考虑writing-mode)

【分类】

&emsp;&emsp;margin重叠共包括以下3种情况

1、相邻的兄弟元素

    <style>
    p{
        line-height: 2em;
        margin:1em 0;
        background-color: lightblue;
        display:inline-block;
        width: 100%;
    }
    </style>
    <p>兄弟一</p>
    <p>兄弟二</p>

<p><iframe style="width: 100%; height: 120px" src="https://demo.xiaohuochai.site/css/margin/m1.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe></p>


2、父级元素和第一个或最后一个子元素，父子级的margin重叠又叫margin传递

    <style>
    .box{
        background-color: pink;
        height:30px;
    }
    .inner{
        margin-top: 1em;
        background-color: lightblue;
    }
    </style>
    <div class="box">
        <div class="inner">子级</div>
    </div>  

<iframe style="width: 100%; height: 60px" src="https://demo.xiaohuochai.site/css/margin/m2.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

<p><strong>条件</strong></p>

&emsp;&emsp;相对比相邻兄弟元素margin重叠来说，父子级margin重叠需要满足以下几个条件(以margin-top重叠为例)：

&emsp;&emsp;a、父元素不是<a href="http://www.cnblogs.com/xiaohuochai/p/5248536.html" target="_blank">BFC</a>元素

&emsp;&emsp;b、父元素没有padding-top值

&emsp;&emsp;c、父元素没有border-top值

&emsp;&emsp;d、父元素和第一个子元素之间没有inline元素分隔
    
&emsp;&emsp;如果是父子级的margin-bottom重叠，第d条改为父元素和最后一个子元素之间没有inline元素分隔，以及还需要满足父元素没有height、min-height、max-height限制

<iframe style="width: 100%; height: 350px" src="https://demo.xiaohuochai.site/css/margin/m33.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

3、空的block元素

    <style>
    .box{
        background-color: lightgreen;
        overflow: hidden;
    }   
    .void{
        margin: 1em 0;
    }
    </style>
    </head>
    <body>
    <div class="box">
        <div class="void"></div>
    </div>
    一行文字

&emsp;&emsp;从下面结果中，可以看出空block元素应该撑开父级margin-top+margin-bottom共2em的高度，但由于margin重叠，只有1em

<iframe style="width: 100%; height: 60px" src="https://demo.xiaohuochai.site/css/margin/m4.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

&emsp;&emsp;同样地，空block元素发生margin重叠也需要满足一些条件

&emsp;&emsp;a、元素没有border值

&emsp;&emsp;b、元素没有padding值

&emsp;&emsp;c、里面没有inline元素

&emsp;&emsp;d、没有height或min-height


【规则】

&emsp;&emsp;两个正垂直外边距，浏览器取大值；如果垂直外边距都设置为负值，浏览器会选取两个外边距的绝对值的最大值；如果一个正外边距与一个负外边距合并，会从正外边距减去这个负外边距的绝对值

&emsp;&emsp;简单点说，就是正正取大值、正负值相加、负负最负值

<p><iframe style="width: 100%; height: 384px;" src="https://demo.xiaohuochai.site/css/margin/m55.html" frameborder="0" width="320" height="240"></iframe></p>

【用途】

&emsp;&emsp;在网页布局中，因为margin重叠的原因，我们常常把margin作为一个“问题样式”而尽量少地使用它。但实际上，它是在很大的作用的

&emsp;&emsp;HTML文档创建的初衷只是用来展示信息的。HTML文档只使用默认样式的前提下，如果上下margin不发生重叠，则会出现以下几个问题：1、连续段落或列表之类，如果没有margin重叠，首尾项间距会和其他兄弟元素呈现1:2的关系，排版不自然；2、web中任何地方嵌套或直接放入任何裸div，都会影响原生的布局，与web设计原则相违背；3、遗落的空的任意多个p标签，会影响原来的阅读排版

&emsp;&emsp;所以，我们要善用重叠，可以在列表项中同时使用margin-top和margin-bottom。这样，使页面结构更具有健壮性，最后一个元素移除或位置调换，都不会破坏原生的布局


【新属性】


<p><strong>-webkit-margin-collapse</strong></p>

    -webkit-margin-collapse: <collapse>(默认重叠) | <discard>(取消) | <separate>(分隔)

&emsp;&emsp;该属性用于设置margin是否重叠，作用于发生margin重叠的两个元素之一。如果，两个都使用该属性，一个设置为discard，一个设置为separate，则最终效果为重叠collase


<iframe style="width: 100%; height: 380px" src="https://demo.xiaohuochai.site/css/margin/m66.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>



### auto

&emsp;&emsp;只有width/height和margin可以设置auto。关于auto的详细信息，已经在<a href="http://www.cnblogs.com/xiaohuochai/p/6252163.html" target="_blank">CSS视觉格式化</a>中详细介绍过。下面仅介绍关于margin:auto的部分




【为什么margin:auto无法实现垂直居中】

&emsp;&emsp;水平方向可以居中是因为块级元素的宽度默认是撑满父级元素的，如果给宽度设置一个固定值，而左右margin设置为auto，则可以平分剩余空间

&emsp;&emsp;垂直方向不可以居中是因为块级元素的高度默认是内容高度，与父级元素的高度并没有直接的关系，而上下margin设置为auto，则被重置为0

【为什么图片使用margin:auto不能水平居中】

&emsp;&emsp;图片无法水平居中，类似于块级元素无法垂直居中。因为图片的宽度width默认是自身宽度，与父元素的宽度没有直接关系。左右margin设置为auto，会被重置为0

&emsp;&emsp;所以，图片要水平居中，需要设置为display:block元素

【实现垂直居中】

&emsp;&emsp;使用margin:auto实现垂直居中，有以下两种方法

&emsp;&emsp;1、使用writing-mode:vertical-lr;

&emsp;&emsp;writing-mode代表页面流方向，默认是水平方向。改为垂直方向后，可实现垂直居中，但水平不居中了


&emsp;&emsp;2、将元素变为绝对定位元素(IE7-浏览器不支持)

&emsp;&emsp;将元素变为绝对定位元素后，设置top:0;bottom:0;，使绝对定位元素与定位父级的高度有了直接的联系。再设置margin:0 auto;，使margin-top和margin-bottom平分剩余空间，达到垂直居中的效果





<p>&nbsp;</p>


 无效情形

&emsp;&emsp;1、行内元素垂直margin无效

&emsp;&emsp;因为行内元素垂直布局主要是通过行高line-height和垂直对齐vertical-align来影响的，垂直margin并不会影响它们，所以不会影响垂直布局。而在显示方式，margin区域不会显示元素背景，所以也不会影响自身元素的显示，所以行内元素垂直margin无效

&emsp;&emsp;[注意]不包括inline-block或设置writing-mode为vertical-lr的情况


&emsp;&emsp;2、某些表格类元素margin无效


&emsp;&emsp;`<thead>``<tbody>``<tfoot>``<tr>``<col>``<colgroup>``<td>``<th>`不可设置margin。对于display属性来说，display为table相关类型(不包括table-caption、table、inline-table)，margin声明无效


&emsp;&emsp;3、绝对定位元素非定位方向的margin值看似无效

&emsp;&emsp;绝对定位的margin值是一直有效的，只是因为绝对定位元素是脱离文档流的，与其他元素节点没有什么关系，所以看不出效果


&emsp;&emsp;4、BFC造成的margin看似无效

&emsp;&emsp;左侧元素使用浮动，右侧元素使用overflow-hidden实现两栏自适应的布局时，右侧元素的margin-left值只有足够大，才能看到效果。这是因为margin-left是相对于父元素左侧，而不是图片右侧

<iframe style="width: 100%; height: 170px" src="https://demo.xiaohuochai.site/css/margin/m7.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


&emsp;&emsp;5、内联特性导致的margin无效


&emsp;&emsp;一个div里面包着一张图片，当图片的margin-top小到一定值时，图片就不再接着向上移动了。这是因为图片是内联元素，它受制于内联元素vertical-align对齐特性的影响。默认基线对齐。以页面假想的大写X字符为例，X是不会因为图片margin-top足够小而跑到父元素外面的，所以图片移动到一定位置就不再接着向上移动了


<iframe style="width: 100%; height: 240px" src="https://demo.xiaohuochai.site/css/margin/m8.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

