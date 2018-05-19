# Bootstrap图片轮播

&emsp;&emsp;图片轮播效果在Web中常常能看到，很多人也称之为幻灯片。其主要显示的效果就是多幅图片轮流播放。鼠标悬停在图片时会暂停播放，如果鼠标悬停或单击右下角圆点时，会显示对应的图片。这种图片轮播效果，在Bootstrap框架中是通过Carousel插件来实现的。本文将详细介绍Bootstrap图片轮播

&nbsp;

### 结构

&emsp;&emsp;一个轮播图片主要包括三个部分：

&emsp;&emsp;&nbsp;☑&nbsp;轮播的图片

&emsp;&emsp;☑&nbsp;轮播图片的计数器

&emsp;&emsp;☑&nbsp;轮播图片的控制器

&emsp;&emsp;复杂一点的轮播图片，每个轮播区会带有对应的标题和描述内容。那么在 Bootstrap 框架中，轮播图是如何设计的呢？

&emsp;&emsp;第一步：设计轮播图片的容器。在 Bootstrap 框架中采用 carousel 样式，并且给这个容器定义一个 ID 值，方便后面采用 data 属性来声明触发

<div>
<pre>&lt;div id="slidershow" class="carousel"&gt;&lt;/div&gt;</pre>
</div>

&emsp;&emsp;第二步：设计轮播图片计数器。在容器 div.carousel 的内部添加轮播图片计算器，采用 carousel-indicators 样式，其主要功能是显示当前图片的播放顺序(有几张图片就放置几个li)，一般采用有序列表来制作：

<div>
<pre>&lt;div id="slidershow" class="carousel"&gt;
&lt;!-- 设置图片轮播的顺序 --&gt;
    &lt;ol class="carousel-indicators"&gt;
        &lt;li class="active"&gt;1&lt;/li&gt;
        &lt;li&gt;2&lt;/li&gt;
        &lt;li&gt;3&lt;/li&gt;
        &lt;li&gt;4&lt;/li&gt;
        &lt;li&gt;5&lt;/li&gt;
        ...
    &lt;/ol&gt;
&lt;/div&gt;</pre>
</div>

&emsp;&emsp;在 Bootstrap 框架中，轮播图片计数器，都是以圆点呈现

<div>
<pre>.carousel-indicators {
    position: absolute; /*整个计数区域绝对定位*/
    bottom: 10px; /*距容器carousel底部10px*/
    z-index: 15; /*设置其在Z轴的层级*/
    /*让整个计数区水平居中*/
    left: 50%;
    width: 60%;
    padding-left: 0;
    margin-left: -30%;
    text-align: center;
    list-style: none;
}
.carousel-indicators li {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin: 1px;
    text-indent: -999px;
    cursor: pointer;
    background-color: #000 \9;
    background-color: rgba(0, 0, 0, 0);
    border: 1px solid #fff;
    border-radius: 10px;
}
/*设置当前状态样式*/
.carousel-indicators .active {
    width: 12px;
    height: 12px;
    margin: 0;
    background-color: #fff;
}</pre>
</div>

&emsp;&emsp;第三步：设计轮播图片播放区。轮播图整个效果中，播放区是最关键的一个区域，这个区域主要用来放置需要轮播的图片。这个区域使用&nbsp;carousel-inner&nbsp;样式来控制，而且其同样放置在&nbsp;carousel&nbsp;容器内，并且通过&nbsp;item&nbsp;容器来放置每张轮播的图片

<div>
<pre>&lt;div id="slidershow" class="carousel"&gt;
    &lt;!-- 设置图片轮播的顺序 --&gt;
    &lt;ol class="carousel-indicators"&gt;
        &lt;li class="active"&gt;1&lt;/li&gt;
        &hellip;
    &lt;/ol&gt;
    &lt;!-- 设置轮播图片 --&gt;
    &lt;div class="carousel-inner"&gt;
        &lt;div class="item active"&gt;
            &lt;a href="##"&gt;&lt;img src="#" alt=""&gt;&lt;/a&gt;
        &lt;/div&gt;
        &lt;div class="item"&gt;
            &lt;a href="##"&gt;&lt;img src="#" alt=""&gt;&lt;/a&gt;
        &lt;/div&gt;
        &hellip;
        &lt;div class="item"&gt;
            &lt;a href="##"&gt;&lt;img src="#" alt=""&gt;&lt;/a&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

&emsp;&emsp;在很多轮播图片效果中，在每个图片上还对应有自己的标题和描述内容。其实 Bootstrap 框架中的 Carousel 也提供类似的效果。只需要在 item 中图片底部添加对应的代码：

<div>
<pre>&lt;div id="slidershow" class="carousel"&gt;
    &lt;!-- 设置图片轮播的顺序 --&gt;
    &lt;ol class="carousel-indicators"&gt;
        &lt;li class="active"&gt;1&lt;/li&gt;
    &hellip;
    &lt;/ol&gt;
    &lt;!-- 设置轮播图片 --&gt;
    &lt;div class="carousel-inner"&gt;
        &lt;div class="item active"&gt;
            &lt;a href="##"&gt;&lt;img src="#" alt=""&gt;&lt;/a&gt;
            &lt;!-- 图片对应标题和描述内容 --&gt;
            &lt;div class="carousel-caption"&gt;
                &lt;h3&gt;图片标题&lt;/h3&gt;
                &lt;p&gt;描述内容...&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &hellip;
    &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

&emsp;&emsp;第四步：设计轮播图片控制器。很多时候轮播图片还具有一个向前播放和向后播放的控制器。在 Carousel 中通过&nbsp;carousel-control&nbsp;样式配合 left 和 right 来实现。其中left表示向前播放，right表示向后播放。其同样放在carousel容器内

<div>
<pre>&lt;div id="slidershow" class="carousel"&gt;
    &lt;!-- 设置图片轮播的顺序 --&gt;
    &lt;ol class="carousel-indicators"&gt;
       &hellip;
    &lt;/ol&gt;
    &lt;!-- 设置轮播图片 --&gt;
    &lt;div class="carousel-inner"&gt;
        &hellip;
    &lt;/div&gt;
    &lt;!-- 设置轮播图片控制器 --&gt;
    &lt;a class="left carousel-control" href="" &gt;
        &lt;span class="glyphicon glyphicon-chevron-left"&gt;&lt;/span&gt;
    &lt;/a&gt;
    &lt;a class="right carousel-control" href=""&gt;
        &lt;span class="glyphicon glyphicon-chevron-right"&gt;&lt;/span&gt;
    &lt;/a&gt;

&lt;/div&gt;</pre>
</div>

&emsp;&emsp;通过两个 a 链接在内部定义要显示的小图标，一个是向前，一个是向后。这两个图标都显示在图片容器的上面（z-index的值大于carousel-inner的）

&nbsp;

### 声明式触发

&emsp;&emsp;声明式方法是通过定义 data 属性来实现，data 属性可以很容易地控制轮播的位置。其主要包括以下几种：

&emsp;&emsp;1、data-ride 属性：取值 carousel，并且将其定义在 carousel 上

&emsp;&emsp;2、data-target 属性：取值 carousel 定义的 ID 名或者其他样式识别符，如前面示例所示，取值为&ldquo;#slidershow&rdquo;，并且将其定义在轮播图计数器的每个 li 上

&emsp;&emsp;3、_data-slide 属性：取值包括 prev，next。prev表示向后滚动，next 表示向前滚动。该属性值同样定义在轮播图控制器的 a 链接上，同时设置控制器 href 值为容器 carousel 的 ID 名或其他样式识别符

&emsp;&emsp;4、data-slide-to 属性：用来传递某个帧的下标，比如 data-slide-to="2"，可以直接跳转到这个指定的帧（下标从0开始计），同样定义在轮播图计数器的每个 li 上

&emsp;&emsp;注意：可以为 #slidershow 层添加 slide 样式，使用图片与图片切换效果有平滑感

&emsp;&emsp;除了data-ride="carousel"、data-slide、data-slide-to 以外，轮播组件还支持其他三个自定义属性

![bs_plug9](https://pic.xiaohuochai.site/blog/bs_plug9.png)

<div>
<pre>  &lt;div id="slidershow" class="carousel slide" data-ride="carousel" style="width:300px"&gt;
    &lt;!-- 设置图片轮播的顺序 --&gt;
    &lt;ol class="carousel-indicators"&gt;
        &lt;li class="active" data-target="#slidershow" data-slide-to="0"&gt;1&lt;/li&gt;
        &lt;li data-target="#slidershow" data-slide-to="1"&gt;2&lt;/li&gt;
        &lt;li data-target="#slidershow" data-slide-to="2"&gt;3&lt;/li&gt;
    &lt;/ol&gt;
    &lt;!-- 设置轮播图片 --&gt;
    &lt;div class="carousel-inner"&gt;
        &lt;div class="item active"&gt;
            &lt;a href="##"&gt;&lt;img src="http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/img1.jpg" width=300 height=200  alt=""&gt;&lt;/a&gt;
            &lt;div class="carousel-caption"&gt;
                &lt;h3&gt;图片标题1&lt;/h3&gt;
                &lt;p&gt;描述内容1...&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="item"&gt;
            &lt;a href="##"&gt;&lt;img src="http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/img2.jpg" width=300 height=200 alt=""&gt;&lt;/a&gt;
            &lt;div class="carousel-caption"&gt;
                &lt;h3&gt;图片标题2&lt;/h3&gt;
                &lt;p&gt;描述内容2...&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="item"&gt;
            &lt;a href="##"&gt;&lt;img src="http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/img3.jpg" width=300 height=200  alt=""&gt;&lt;/a&gt;
            &lt;div class="carousel-caption"&gt;
                &lt;h3&gt;图片标题3&lt;/h3&gt;
                &lt;p&gt;描述内容3...&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;a class="left carousel-control " href="#slidershow" role="button" data-slide="prev"&gt;
        &lt;span class="glyphicon glyphicon-chevron-left"&gt;&lt;/span&gt;
    &lt;/a&gt;
    &lt;a class="right carousel-control" href="#slidershow" role="button" data-slide="next"&gt;
        &lt;span class="glyphicon glyphicon-chevron-right"&gt;&lt;/span&gt;
    &lt;/a&gt;
  &lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 220px;" src="https://demo.xiaohuochai.site/bootstrap/carousel/c1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### JS触发

&emsp;&emsp;默认情况下，如果 carousel 容器上定义了 data-ride="carousel" 属性，页面加载之后就会自动加载轮播图片切换效果。如果没有定义 data-ride 属性，可以通过 JavaScript 方法来触发轮播图片切换。具体使用方法如下

<div>
<pre>$(".carousel").carousel();</pre>
</div>

&emsp;&emsp;在 carousel() 方法中可以设置具体的参数，如

![bs_plug10](https://pic.xiaohuochai.site/blog/bs_plug10.png)

&nbsp;

<div>
<pre>  &lt;div id="slidershow" class="carousel slide" style="width:300px"&gt;
    &lt;!-- 设置图片轮播的顺序 --&gt;
    &lt;ol class="carousel-indicators"&gt;
        &lt;li class="active" data-target="#slidershow" data-slide-to="0"&gt;1&lt;/li&gt;
        &lt;li data-target="#slidershow" data-slide-to="1"&gt;2&lt;/li&gt;
        &lt;li data-target="#slidershow" data-slide-to="2"&gt;3&lt;/li&gt;
    &lt;/ol&gt;
    &lt;!-- 设置轮播图片 --&gt;
    &lt;div class="carousel-inner"&gt;
        &lt;div class="item active"&gt;
            &lt;a href="##"&gt;&lt;img src="http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/img1.jpg" width=300 height=200  alt=""&gt;&lt;/a&gt;
            &lt;div class="carousel-caption"&gt;
                &lt;h3&gt;图片标题1&lt;/h3&gt;
                &lt;p&gt;描述内容1...&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="item"&gt;
            &lt;a href="##"&gt;&lt;img src="http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/img2.jpg" width=300 height=200 alt=""&gt;&lt;/a&gt;
            &lt;div class="carousel-caption"&gt;
                &lt;h3&gt;图片标题2&lt;/h3&gt;
                &lt;p&gt;描述内容2...&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="item"&gt;
            &lt;a href="##"&gt;&lt;img src="http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/img3.jpg" width=300 height=200  alt=""&gt;&lt;/a&gt;
            &lt;div class="carousel-caption"&gt;
                &lt;h3&gt;图片标题3&lt;/h3&gt;
                &lt;p&gt;描述内容3...&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;a class="left carousel-control " href="#slidershow" role="button" data-slide="prev"&gt;
        &lt;span class="glyphicon glyphicon-chevron-left"&gt;&lt;/span&gt;
    &lt;/a&gt;
    &lt;a class="right carousel-control" href="#slidershow" role="button" data-slide="next"&gt;
        &lt;span class="glyphicon glyphicon-chevron-right"&gt;&lt;/span&gt;
    &lt;/a&gt;
  &lt;/div&gt;
&lt;script&gt;
$("#slidershow").carousel({
       interval: 1000
});    
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 220px;" src="https://demo.xiaohuochai.site/bootstrap/carousel/c2.html" frameborder="0" width="320" height="240"></iframe>

【关键字】

&emsp;&emsp;实际上，给carousel()方法配置参数之后，轮播效果就能自动切换。但 Bootstrap 框架中的 carousel 插件还提供了几种特殊的调用方法，简单说明如下：&nbsp;

<div>
<pre>.carousel("cycle")：从左向右循环播放；
.carousel("pause")：停止循环播放；
.carousel("number")：循环到指定的帧，下标从0开始，类似数组；
.carousel("prev")：返回到上一帧；
.carousel("next")：下一帧</pre>
</div>

【事件】

&emsp;&emsp;该插件只提供两种事件类型

<div>
<pre>slide.bs.carousel    此事件在slide方法被调用之后 ，但还没开始处理下一张图片之前触发
slid.bs.carousel      此事件在一张图片轮播之后触发</pre>
</div>
<div>
<pre>  &lt;div id="slidershow" class="carousel slide" data-ride="carousel" style="width:300px"&gt;
    &lt;!-- 设置图片轮播的顺序 --&gt;
    &lt;ol class="carousel-indicators"&gt;
        &lt;li class="active" data-target="#slidershow" data-slide-to="0"&gt;1&lt;/li&gt;
        &lt;li data-target="#slidershow" data-slide-to="1"&gt;2&lt;/li&gt;
        &lt;li data-target="#slidershow" data-slide-to="2"&gt;3&lt;/li&gt;
    &lt;/ol&gt;
    &lt;!-- 设置轮播图片 --&gt;
    &lt;div class="carousel-inner"&gt;
        &lt;div class="item active"&gt;
            &lt;a href="##"&gt;&lt;img src="http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/img1.jpg" width=300 height=200  alt=""&gt;&lt;/a&gt;
            &lt;div class="carousel-caption"&gt;
                &lt;h3&gt;图片标题1&lt;/h3&gt;
                &lt;p&gt;描述内容1...&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="item"&gt;
            &lt;a href="##"&gt;&lt;img src="http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/img2.jpg" width=300 height=200 alt=""&gt;&lt;/a&gt;
            &lt;div class="carousel-caption"&gt;
                &lt;h3&gt;图片标题2&lt;/h3&gt;
                &lt;p&gt;描述内容2...&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="item"&gt;
            &lt;a href="##"&gt;&lt;img src="http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/img3.jpg" width=300 height=200  alt=""&gt;&lt;/a&gt;
            &lt;div class="carousel-caption"&gt;
                &lt;h3&gt;图片标题3&lt;/h3&gt;
                &lt;p&gt;描述内容3...&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;a class="left carousel-control " href="#slidershow" role="button" data-slide="prev"&gt;
        &lt;span class="glyphicon glyphicon-chevron-left"&gt;&lt;/span&gt;
    &lt;/a&gt;
    &lt;a class="right carousel-control" href="#slidershow" role="button" data-slide="next"&gt;
        &lt;span class="glyphicon glyphicon-chevron-right"&gt;&lt;/span&gt;
    &lt;/a&gt;
  &lt;/div&gt;
&lt;button type="button" class="btn btn-default" id="btn1"&gt;播放&lt;/button&gt;
&lt;button type="button" class="btn btn-default" id="btn2"&gt;暂停&lt;/button&gt;
&lt;button type="button" class="btn btn-default" id="btn3"&gt;上一帧&lt;/button&gt;
&lt;button type="button" class="btn btn-default" id="btn4"&gt;下一帧&lt;/button&gt; 
&lt;div id="result"&gt;&lt;/div&gt; 
&lt;script&gt;
$(function(){
    $('#btn1').click(function(){
        $("#slidershow").carousel('cycle');
    });
    $('#btn2').click(function(){
        $("#slidershow").carousel('pause');
    });
    $('#btn3').click(function(){
        $("#slidershow").carousel('prev');
    });
    $('#btn4').click(function(){
        $("#slidershow").carousel('next');
    });    
    $("#slidershow").on("slid.bs.carousel",function(e){       
        $('#result').html('当前正在显示第' + ($(e.relatedTarget).index()+1) + '张图片');
    })        
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 284px;" src="https://demo.xiaohuochai.site/bootstrap/carousel/c3.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;