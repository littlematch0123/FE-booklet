# Bootstrap缩略图

&emsp;&emsp;缩略图在网站中最常用的地方就是产品列表页面，一行显示几张图片，有的在图片底部（左侧或右侧）带有标题、描述等信息。Bootstrap框架将这一部独立成一个模块组件，本文将详细介绍Bootstrap缩略图

&nbsp;

### 概述

&emsp;&emsp;Boostrap 缩略图的默认设计仅需最少的标签就能展示带链接的图片，通过&ldquo;thumbnail&rdquo;样式配合bootstrap的网格系统来实现缩略图

&emsp;&emsp;thumbnail中文翻译是拇指指甲，确实有些像缩略图，中间是图片，图片周围是一小圈空白，外面是边框和圆角，下面是文字

<div>
<pre>.thumbnail {
  display: block;
  padding: 4px;
  margin-bottom: 20px;
  line-height: 1.42857143;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  -webkit-transition: all .2s ease-in-out;
          transition: all .2s ease-in-out;
}
.thumbnail &gt; img,
.thumbnail a &gt; img {
  margin-right: auto;
  margin-left: auto;
}
a.thumbnail:hover,
a.thumbnail:focus,
a.thumbnail.active {
  border-color: #428bca;
}
.thumbnail .caption {
  padding: 9px;
  color: #333;
}</pre>
</div>
<div>
<pre>&lt;div class="container"&gt;
    &lt;div class="row"&gt;
        &lt;div class="col-xs-6 col-md-3"&gt;
            &lt;a href="#" class="thumbnail"&gt;
                &lt;img src="http://via.placeholder.com/100x100"" alt="#"&gt;
            &lt;/a&gt;
        &lt;/div&gt;
        &lt;div class="col-xs-6 col-md-3"&gt;
            &lt;a href="#" class="thumbnail"&gt;
                &lt;img src="http://via.placeholder.com/100x100"" alt="#"&gt;
            &lt;/a&gt;
        &lt;/div&gt;
        &lt;div class="col-xs-6 col-md-3"&gt;
            &lt;a href="#" class="thumbnail"&gt;
                &lt;img src="http://via.placeholder.com/100x100"" alt="#"&gt;
            &lt;/a&gt;
        &lt;/div&gt;
        &lt;div class="col-xs-6 col-md-3"&gt;
            &lt;a href="#" class="thumbnail"&gt;
                &lt;img src="http://via.placeholder.com/100x100"" alt="#"&gt;
            &lt;/a&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 290px;" src="https://demo.xiaohuochai.site/bootstrap/thumb/t1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 自定义内容

&emsp;&emsp;在仅有缩略图的基础上，添加了一个div名为&ldquo;caption&ldquo;的容器，在这个容器中放置其他内容，比如标题，文本描述，按钮等

<div>
<pre>.thumbnail .caption {
  padding: 9px;
  color: #333;
}</pre>
</div>
<div>
<pre>&lt;div class="container"&gt;
    &lt;div class="row"&gt;
        &lt;div class="col-xs-6 col-md-3"&gt;
            &lt;a href="#" class="thumbnail"&gt;
                &lt;img src="http://via.placeholder.com/100x100"" alt="#"&gt;
            &lt;/a&gt;
            &lt;div class="caption"&gt;
                &lt;h3&gt;小火柴的蓝色理想&lt;/h3&gt;
                &lt;p&gt;好的代码像粥一样，都是用时间熬出来的&lt;/p&gt;
                &lt;p&gt;
                    &lt;a href="##" class="btn btn-primary"&gt;确认&lt;/a&gt;
                    &lt;a href="##" class="btn btn-info"&gt;取消&lt;/a&gt;
                &lt;/p&gt;
            &lt;/div&gt; 
        &lt;/div&gt;
        &lt;div class="col-xs-6 col-md-3"&gt;
            &lt;a href="#" class="thumbnail"&gt;
                &lt;img src="http://via.placeholder.com/100x100"" alt="#"&gt;
            &lt;/a&gt;
            &lt;div class="caption"&gt;
                &lt;h3&gt;小火柴的蓝色理想&lt;/h3&gt;
                &lt;p&gt;好的代码像粥一样，都是用时间熬出来的&lt;/p&gt;
                &lt;p&gt;
                    &lt;a href="##" class="btn btn-primary"&gt;确认&lt;/a&gt;
                    &lt;a href="##" class="btn btn-info"&gt;取消&lt;/a&gt;
                &lt;/p&gt;
            &lt;/div&gt; 
        &lt;/div&gt;
        &lt;div class="col-xs-6 col-md-3"&gt;
            &lt;a href="#" class="thumbnail"&gt;
                &lt;img src="http://via.placeholder.com/100x100"" alt="#"&gt;
            &lt;/a&gt;
            &lt;div class="caption"&gt;
                &lt;h3&gt;小火柴的蓝色理想&lt;/h3&gt;
                &lt;p&gt;好的代码像粥一样，都是用时间熬出来的&lt;/p&gt;
                &lt;p&gt;
                    &lt;a href="##" class="btn btn-primary"&gt;确认&lt;/a&gt;
                    &lt;a href="##" class="btn btn-info"&gt;取消&lt;/a&gt;
                &lt;/p&gt;
            &lt;/div&gt; 
        &lt;/div&gt;
        &lt;div class="col-xs-6 col-md-3"&gt;
            &lt;a href="#" class="thumbnail"&gt;
                &lt;img src="http://via.placeholder.com/100x100"" alt="#"&gt;
            &lt;/a&gt;
            &lt;div class="caption"&gt;
                &lt;h3&gt;小火柴的蓝色理想&lt;/h3&gt;
                &lt;p&gt;好的代码像粥一样，都是用时间熬出来的&lt;/p&gt;
                &lt;p&gt;
                    &lt;a href="##" class="btn btn-primary"&gt;确认&lt;/a&gt;
                    &lt;a href="##" class="btn btn-info"&gt;取消&lt;/a&gt;
                &lt;/p&gt;
            &lt;/div&gt; 
        &lt;/div&gt;                
    &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 510px;" src="https://demo.xiaohuochai.site/bootstrap/thumb/t2.html" frameborder="0" width="320" height="240"></iframe>

