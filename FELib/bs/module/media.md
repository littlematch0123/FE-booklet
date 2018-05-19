# Bootstrap媒体对象

&emsp;&emsp;在Web页面或者说移动页面制作中，常常看到图文混排效果，图片居左（或居右），内容居右（或居左）排列。常常把这样的效果称为媒体对象。可以说它是一种抽象的样式，可以用来构建不同类型的组件。本文将详细介绍Bootstrap媒体对象

&nbsp;

### 默认样式

&emsp;&emsp;媒体对象一般是成组出现，而一组媒体对象常常包括以下几个部分：

&emsp;&emsp;☑ &nbsp;媒体对像的容器：常使用&ldquo;media&rdquo;类名表示，用来容纳媒体对象的所有内容

&emsp;&emsp;☑&nbsp; 媒体对像的对象：常使用&ldquo;media-object&rdquo;表示，就是媒体对象中的对象，常常是图片

&emsp;&emsp;☑&nbsp; 媒体对象的主体：常使用&ldquo;media-body&rdquo;表示，就是媒体对像中的主体内容，可以是任何元素，常常是图片侧边内容

&emsp;&emsp;☑&nbsp; 媒体对象的标题：常使用&ldquo;media-heading&rdquo;表示，就是用来描述对象的一个标题，此部分可选

&emsp;&emsp;除了上面四个部分之外，在Bootstrap框架中还常常使用&ldquo;media-left&rdquo;或者&ldquo;media-right&rdquo;来控制媒体对象中的对象浮动方式

&emsp;&emsp;注意：在 html 结构中，&nbsp;`.media-right`&nbsp;应当放在&nbsp;`.media-body`&nbsp;的后面

&emsp;&emsp;媒体对象样式相对来说比较简单，只是设置他们之间的间距

<div>
<pre>.media,
.media-body {
  overflow: hidden;
  zoom: 1;
}
.media,
.media .media {
  margin-top: 15px;
}
.media:first-child {
  margin-top: 0;
}
.media-object {
  display: block;
}
.media-heading {
  margin: 0 0 5px;
}
.media-left {
  margin-right: 10px;
}
.media-right {
  margin-left: 10px;
}</pre>
</div>
<div>
<pre>&lt;div class="media"&gt;
    &lt;a class="media-left" href="#"&gt;
        &lt;img class="media-object" width=100 src="http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/huochai.jpg" alt="..."&gt;
    &lt;/a&gt;
    &lt;div class="media-body"&gt;
        &lt;h4 class="media-heading"&gt;小火柴的蓝色理想&lt;/h4&gt;
        &lt;div&gt;好的代码像粥一样，都是用时间熬出来的&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 108px;" src="https://demo.xiaohuochai.site/bootstrap/media/m1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 嵌套

&emsp;&emsp;在评论系统中，经常会有媒体对象嵌套的需求。在Bootstrap框架中的媒体对象也具备这样的功能，只需要将另一个媒体对象结构放置在媒体对象的主体内&ldquo;media-body&rdquo;

<div>
<pre>&lt;div class="media"&gt;
    &lt;a class="media-left" href="#"&gt;
        &lt;img class="media-object" width=100 src="http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/huochai.jpg" alt="..."&gt;
    &lt;/a&gt;
    &lt;div class="media-body"&gt;
        &lt;h4 class="media-heading"&gt;小火柴的蓝色理想&lt;/h4&gt;
        &lt;div&gt;好的代码像粥一样，都是用时间熬出来的&lt;/div&gt;
        &lt;div class="media"&gt;
            &lt;a class="pull-left" href="#"&gt;
                &lt;img class="media-object" src="http://via.placeholder.com/100x100" alt="..."&gt;
            &lt;/a&gt;
            &lt;div class="media-body"&gt;
                &lt;h4 class="media-heading"&gt;我是小火柴&lt;/h4&gt;
                &lt;div&gt;好巧啊，我也叫小火柴&lt;/div&gt;
                &lt;div class="media"&gt;
                    &lt;a class="pull-left" href="#"&gt;
                        &lt;img class="media-object" width=100 src="http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/huochai.jpg" alt="..."&gt;
                    &lt;/a&gt;
                    &lt;div class="media-body"&gt;
                        &lt;h4 class="media-heading"&gt;小火柴的蓝色理想&lt;/h4&gt;
                        &lt;div&gt;是的&lt;/div&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
&lt;div class="media"&gt;
    &lt;a class="media-left" href="#"&gt;
        &lt;img class="media-object" width=100 src="http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/huochai.jpg" alt="..."&gt;
    &lt;/a&gt;
    &lt;div class="media-body"&gt;
        &lt;h4 class="media-heading"&gt;小火柴的蓝色理想&lt;/h4&gt;
        &lt;div&gt;蓝色理想衰落了，前端却欣欣向荣起来&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 320px;" src="https://demo.xiaohuochai.site/bootstrap/media/m2.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 对齐方式

&emsp;&emsp;图片或其他媒体类型可以顶部、中部或底部对齐。默认顶部对齐。通过.media-middle或.media-bottom来设置

<div>
<pre>.media-middle {
    vertical-align: middle;
}
.media-bottom {
    vertical-align: bottom;
}</pre>
</div>
<div>
<pre>&lt;div class="media"&gt;
    &lt;a class="media-left" href="#"&gt;
        &lt;img class="media-object" width=30 src="http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/huochai.jpg" alt="..."&gt;
    &lt;/a&gt;
    &lt;div class="media-body"&gt;
        &lt;h4 class="media-heading"&gt;小火柴的蓝色理想&lt;/h4&gt;
        &lt;div&gt;蓝色理想衰落了，前端却欣欣向荣起来&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
&lt;div class="media"&gt;
    &lt;a class="media-left media-middle" href="#"&gt;
        &lt;img class="media-object" width=30 src="http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/huochai.jpg" alt="..."&gt;
    &lt;/a&gt;
    &lt;div class="media-body"&gt;
        &lt;h4 class="media-heading"&gt;小火柴的蓝色理想&lt;/h4&gt;
        &lt;div&gt;蓝色理想衰落了，前端却欣欣向荣起来&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
&lt;div class="media"&gt;
    &lt;a class="media-left media-bottom" href="#"&gt;
        &lt;img class="media-object" width=30 src="http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/huochai.jpg" alt="..."&gt;
    &lt;/a&gt;
    &lt;div class="media-body"&gt;
        &lt;h4 class="media-heading"&gt;小火柴的蓝色理想&lt;/h4&gt;
        &lt;div&gt;蓝色理想衰落了，前端却欣欣向荣起来&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 192px;" src="https://demo.xiaohuochai.site/bootstrap/media/m3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 媒体对象列表

&emsp;&emsp;媒体对象的嵌套仅是媒体对象中一个简单应用效果之一，在很多时候，我们还会碰到一个列表，每个列表项都和媒体对象长得差不多。Bootstrap框架提供了一个列表展示的效果，在写结构的时候可以使用ul，并且在ul上添加类名&ldquo;media-list&rdquo;，而在li上使用&ldquo;media&rdquo;

&emsp;&emsp;媒体对象列表，在样式上也并没有做过多的特殊处理，只是把列表的左间距置０以及去掉了项目列表符号

<div>
<pre>.media-list {
  padding-left: 0;
  list-style: none;
}</pre>
</div>
<div>
<pre>&lt;ul class="media-list"&gt;
  &lt;li class="media"&gt;
    &lt;a class="media-left" href="#"&gt;
        &lt;img class="media-object" width=30 src="http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/huochai.jpg" alt="..."&gt;
    &lt;/a&gt;
    &lt;div class="media-body"&gt;
        &lt;h4 class="media-heading"&gt;小火柴的蓝色理想&lt;/h4&gt;
        &lt;div&gt;蓝色理想衰落了，前端却欣欣向荣起来&lt;/div&gt;
    &lt;/div&gt;
  &lt;/li&gt;
  &lt;li class="media"&gt;
    &lt;a class="media-left" href="#"&gt;
        &lt;img class="media-object" width=30 src="http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/huochai.jpg" alt="..."&gt;
    &lt;/a&gt;
    &lt;div class="media-body"&gt;
        &lt;h4 class="media-heading"&gt;小火柴的蓝色理想&lt;/h4&gt;
        &lt;div&gt;好的代码像粥一样，都是用时间熬出来的&lt;/div&gt;
    &lt;/div&gt;
  &lt;/li&gt;  
&lt;/ul&gt;</pre>
</div>

<iframe style="width: 100%; height: 143px;" src="https://demo.xiaohuochai.site/bootstrap/media/m4.html" frameborder="0" width="320" height="240"></iframe>
