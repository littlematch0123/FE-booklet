# 理解CSS边框border和阴影shadow

&emsp;&emsp;边框是CSS盒模型属性中默默无闻的一个普通属性，CSS3的到来，但得边框属性重新焕发了光彩。本文将详细介绍CSS边框


<p>&nbsp;</p>

### 基础样式

&emsp;&emsp;边框是一条以空格分隔的集合样式，包括边框粗细(边框宽度)、边框颜色和边框样式，且先后顺序无关

        border: border-width border-color border-style
        border: 1px solid red;
 
【边框样式】

&emsp;&emsp;如果一个边框没有样式，边框将根本不会存在

&emsp;&emsp;关于虚线dashed，在chrome/firefox下，虚线宽高比是3/1；而在IE下，虚线宽高比为2/1。所以在IE下虚线显得比较密

&emsp;&emsp;关于点线dotted，在chrome下，点线是方点；而在IE/firefox下，点线是圆点

    border-style:none(默认)
    border-style:hidden/dotted/dashed/solid/double/groove/ridge/inset/outset(共9种)
 
【边框宽度】

&emsp;&emsp;边框的宽度不能为负，不能指定为百分比值。这是因为，边框并不会因为设备尺寸变大，所以百分比单位并不符合语义。类似地，还有outline、box-shadow、text-shadow等

&emsp;&emsp;边框宽度支持3个关键字：this/medium/thick，分别是1px、3px、5px，且medium为默认值。medium为3px是因为边框样式double至少为3px为有效果

        border-width: thin/medium(默认)/thick/<length>
 
【边框颜色】

&emsp;&emsp;默认的边框颜色是元素本身的前景色，即元素的文本颜色；如果元素没有任何文本，则边框颜色是其父元素的文本颜色。但是，在表格中，若只设置border-style，而不设置border,则边框颜色为黑色，而不与文本颜色相同。类似地，还有text-shadow、box-shadow等

        border-color: transparent/<color>

&emsp;&emsp;注意：在CSS2.1中，背景定位background-position只能相对于左上角定位。如果需要是相对于右侧，则可以使用一个右侧的透明边框来实现类似的效果

&emsp;&emsp;<演示框>点击下列相应属性值可进行演示

<p><iframe style="width: 100%; height: 297px;" src="https://demo.xiaohuochai.site/css/border/b11.html" frameborder="0" width="320" height="240"></iframe></p>



<p>&nbsp;</p>


### 边框要点

【注意事项】

&emsp;&emsp;边框有以下几个要点需要特别注意：

&emsp;&emsp;1、边框绘制在元素背景之上，如果边框样式有某种缝隙，可以通过这些缝隙看到元素的背景(有兼容问题)

&emsp;&emsp;2、同一元素的边框相交处是斜线，可以用边框实现三角形

&emsp;&emsp;3、行内元素的上下边框由于不影响行高，不影响布局；左右边框会影响布局

&emsp;&emsp;4、在CSS2.1中，背景定位background-position只能相对于左上角定位。如果需要是相对于右侧，则可以使用一个右侧的透明边框来实现类似的效果

【边框单边】

            border-top/border-right/border-bottom/border-left
 

【边框属性】

        border-width:
            border-top-width    border-right-width
            border-bottom-width    border-left-width

        border-style:
            border-top-style    border-right-style
            border-bottom-style    border-left-style

        border-color：
            border-top-color    border-right-color
            border-bottom-color    border-left-color


【四值顺序】

        border-width: 1px 2px 3px 4px;//上右下左
        border-width: 1px 2px 3px;//上(左右)下
        border-width: 1px 2px;//(上下)(左右)
        border-width: 1px;//(上下左右)
 


<p>&nbsp;</p>


### 多色边框

&emsp;&emsp;多色边框border-colors可以在一条边框上设置多种颜色

&emsp;&emsp;注意：只有firefox支持，需要加-moz-前缀，且只能四条边分开写，否则无效

        border-colors:<color><color>……

        border: 10px solid black;
        -moz-border-top-colors: red green;
        -moz-border-right-colors: green yellow;
        -moz-border-bottom-colors: yellow blue;
        -moz-border-left-colors: blue red;    


<div><img src="https://pic.xiaohuochai.site/blog/CSS_layout_borderColors.jpg" alt="border-colors" /></div>


### 圆角边框

&emsp;&emsp;圆角边框border-radius可以为边框设置圆角(IE8-不支持)，四值顺序是左上、右上、右下、左下

    border-radius: none(默认)
    border-radius: <length>{1,4}[/<length>{1,4}]?
    //如果反斜杠存在，前面的值是水平方向的半径，后面的值是垂直方向的半径。如果没有则水平和垂直方向相等

&emsp;&emsp;关于圆角边框有如下注意事项：

&emsp;&emsp;1、`<length>`可以是具体值，也可以是百分比，但不是负数

&emsp;&emsp;2、重置border-radius没有圆角，使用none无效，需要取值0

&emsp;&emsp;3、border-radius对`<img>`没有任何效果

&emsp;&emsp;4、如果取值为百分比，水平方向圆角百分比相对于宽度，垂直方向圆角百分比相对于高度

【圆角单角】

    border-top-left-radius/border-top-right-radius/border-bottom-right-radius/border-bottom-left-radius
    border-top-left-radius: 10px 20px;


&emsp;&emsp;注意：写圆角单角时不可加/

【四值顺序】

&emsp;&emsp;四值顺序是左上、右上、右下、左下

    border-radius: 10px 20px 30px 40px / 20px 30px 40px 50px;

【内径外径】

&emsp;&emsp;border-radius内径 = 外径 - 对应的边框宽度

&emsp;&emsp;当border-radius半径值小于等于边框宽度时，元素没有内径效果

【特殊图形】

<p><strong>圆形</strong></p>

&emsp;&emsp;元素的宽高相同，且圆角半径为宽高的一半

    div{
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }

<p><strong>半圆</strong></p>

&emsp;&emsp;元素宽高不同，且圆角半径与宽高要配合

    div{
        width: 100px;
        height: 50px;
        border-radius: 50px 50px 0 0;
    }

<p><strong>扇形</strong></p>

&emsp;&emsp;元素宽高及一个圆角半径相同

    div{
        width: 50px;
        height: 50px;
        border-radius: 50px 0 0 0;
    }    

<p><strong>椭圆</strong></p>

&emsp;&emsp;元素宽高不同，且水平和垂直半径分别对应宽高

    div{
        width: 120px;
        height: 80px;
        border-radius: 120px/80px;
    }            
 
<table border="0">
<tbody>
<tr>

<td><img src="https://pic.xiaohuochai.site/blog/CSS_layout_circle.jpg" alt="circle" /></td>
<td><img src="https://pic.xiaohuochai.site/blog/CSS_layout_elliptic.jpg" alt="elliptic" /></td>
<td><img src="https://pic.xiaohuochai.site/blog/CSS_layout_semiCircle.jpg" alt="semiCircle" /></td>
<td><img src="https://pic.xiaohuochai.site/blog/CSS_layout_oneFourthCircle.jpg" alt="oneFourthCircle" /></td>
</tr>
</tbody>
</table>


<p>&nbsp;</p>


### 盒子阴影

&emsp;&emsp;盒子阴影box-shadow可以为元素设置阴影(IE8-不支持)

    box-shadow: none(默认)
    box-shadow: (h-shadow v-shadow blur spread color inset)+;

    h-shadow: 水平阴影位置(必须)
    v-shadow: 垂直阴影位置(必须)
    blur:     模糊距离(可选)
    spread:   阴影尺寸(可选)
    color:    阴影颜色，默认和文本颜色一致(可选)
    inset:    内部阴影(可选)    
    box-shadow:10px 10px red,20px 20px blue;

&emsp;&emsp;使用盒子阴影box-shadow时，有如下几点注意事项：

&emsp;&emsp;1、可以使用多重阴影，但使用过多会造成性能差

&emsp;&emsp;2、边框在内阴影之上，内阴影在背景图片之上，背景图片在背景色之上，背景色在外阴影之上

&emsp;&emsp;3、内阴影对`<img>`元素没有任何效果

&emsp;&emsp;4、最先写的阴影在最顶层

&emsp;&emsp;5、该属性与border-radius一脉相承，若通过border-radius设置为圆角，则box-shadow的最终呈现也将是圆角

【模拟边框】

    box-shadow: 0 0 0 10px blue;

<p><img style="width: 100px; height: 100px;" src="https://pic.xiaohuochai.site/blog/CSS_layout_simulateBorder.jpg" alt="simulateBorder" /></p>

&emsp;&emsp;<演示框>点击下列相应属性值可进行演示

<p><iframe style="width: 100%; height: 429px;" src="https://demo.xiaohuochai.site/css/border/b22.html" frameborder="0" width="320" height="240"></iframe></p>

【单侧投影】

    box-shadow: 0 5px 4px -4px black;

<p><iframe style="width: 100%; height: 100px" src="https://demo.xiaohuochai.site/css/border/b3.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe></p>

【邻边投影】

    box-shadow: 3px 3px 6px -3px black;

<p><iframe style="width: 100%; height: 100px" src="https://demo.xiaohuochai.site/css/border/b4.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe></p>

【双侧投影】

    box-shadow: 5px 0 5px -5px black,-5px 0 5px -5px black;

<p><iframe style="width: 100%; height: 100px" src="https://demo.xiaohuochai.site/css/border/b5.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe></p>

<p>&nbsp;</p>

### 图片边框

&emsp;&emsp;图片边框border-image可以在边框位置设置图片(IE10-不支持)

    border-image: none(默认)
    border-image: border-image-source || border-image-slice [ / border-image-width? | / border-image-outset ]? || border-image-repeat;

&emsp;&emsp;注意：该属性的作用是用来替代border-style的，若border-image为none，则显示border-style的值

    border-image: url('img.img') 27 fill / 27 / 27px repeat;

【border-image-source】

&emsp;&emsp;边框的图片路径

    border-image-source:url('test.img');

【border-image-slice】

&emsp;&emsp;图片边框四条切割线的位置

    border-image-slice:  <number> | <percentage> fill

&emsp;&emsp;使用border-image-slice时，有如下几点注意事项：

&emsp;&emsp;1、若不写单位，具体值默认单位是px

&emsp;&emsp;2、fill表示图片边框的中间部分将保留下来

&emsp;&emsp;3、四值方向是上右下左，代表切割线的方向，切割的分别是高宽高宽

&emsp;&emsp;4、图片边框是在边框范围内显示的，若边框宽度不等于slice切片值，则图片边框会按比例放大缩小，以使图片边框正好显示在边框范围内

&emsp;&emsp;5、若slice值为负，或大于盒子的宽度或高度会被100%，四个角将显示整个背景图片

&emsp;&emsp;6、若右切和左切大于盒子宽度，则上中和下中部分为空；若上切和下切大于盒子高度，则左中和右中部分为空

<table border="0">
<tbody>
<tr>
<td><img src="https://pic.xiaohuochai.site/blog/CSS_layout_borderImageSlice1.png" alt="borderImageSlice1" /></td>
<td><img src="https://pic.xiaohuochai.site/blog/CSS_layout_borderImageSlice2.gif" alt="borderImageSlice2" /></td>
</tr>
</tbody>
</table>

    
【border-image-width】

&emsp;&emsp;边框宽度border-image-width。若指定该值，则边框图片宽度由该值确定，否则由盒子的边框宽度来确定。该值可以用具体像素、数字(表示几倍)以及百分比来表示，遵循四值顺序

    border-image-width: <length> | <percentage> | <number> | auto  


【border-image-outset】

&emsp;&emsp;border-image-outset表示边框图像区域超出边框的量，可以用具体像素和数字(表示几倍)表示，遵循四值顺序

    border-image-outset:0(默认)
    border-image-outset: <length> | <number>

【border-image-repeat】

&emsp;&emsp;边框图片的排列方式

    border-image-repeat: stretch(拉伸,默认) | repeat(重复) | round(平铺) [1,2]
    //第一个值表示水平方向的排列方式，第二个值表示垂直方向的排列方式

&emsp;&emsp;在上面的属性值中，repeat是边框中间向两端平铺，可能造成两端边缘被切的现象；而round会对边框背景图的切片进行缩放，使其正好显示


【按钮实现】

    div{
        display: inline-block;
        border-image: url('button.png') 16 fill/ auto / 5px;
    }

<div><img style="width: 100px;" src="https://pic.xiaohuochai.site/blog/CSS_layout_borderButton.jpg" alt="borderButton" /></div>

### 应用

【三道杠效果】

&emsp;&emsp;三道杠可以使用边框来实现，上面两道杠使用上边框的double样式，下面一道杠使用下边框的solid样式

    <style>
    .box{
        color: red;
        width: 60px;
        height: 10px;
        border-top: 30px double;
        border-bottom: 10px solid;
        transition: color 0.5s;
    }
    .box:hover{
        color:pink;
    }
    </style>
    <div class="box"></div>


<iframe style="width: 100%; height: 70px" src="https://demo.xiaohuochai.site/css/border/b6.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>



【十字效果】

    <style>
    .box{
        position: relative;
        color: blue;
        border: 4px solid;
        width: 40px;
        height: 40px;
        transition: color 0.2s;
    }
    .box:before{
        content:"";
        border-top:10px solid;  
        display: block;
        position: absolute;
        width: 30px;
        top:15px;
        left:5px;
    }
    .box:after{
        content:"";
        position: absolute;
        top: 5px;
        left: 15px;
        border-left:10px solid;
        height: 30px;
    } 
    .box:hover{
        color: lightblue;
    }
    </style>
    <div class="box"></div>


<iframe style="width: 100%; height: 70px" src="https://demo.xiaohuochai.site/css/border/b7.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

【信封效果】

&emsp;&emsp;可以使用图片边框border-image来实现航空信封的效果。图片边框使用线性渐变来实现

    <style>
    .box {
      width: 200px;
      height: 100px;
      padding: 10px;
      border: 10px solid;
      border-image: repeating-linear-gradient(-225deg, red 0, red 10px, transparent 10px, transparent 20px, #58a 20px, #58a 30px, transparent 30px, transparent 40px) 20;
    }
    </style>
    <div class="box" contenteditable ="true">请修改文字</div>    


<iframe style="width: 100%; height: 160px" src="https://demo.xiaohuochai.site/css/border/b8.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
