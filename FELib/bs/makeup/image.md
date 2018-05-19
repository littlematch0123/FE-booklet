# Bootstrap图像

&emsp;&emsp;图像在网页制作中也是常要用到的元素，本文将详细介绍Bootstrap图像

&nbsp;

### 响应式图片

&emsp;&emsp;通过为图片添加&nbsp;`.img-responsive`&nbsp;类可以让图片支持响应式布局。其实质是为图片设置了&nbsp;`max-width: 100%;`、&nbsp;`height: auto;`&nbsp;和&nbsp;`display: block;`&nbsp;属性，从而让图片在其父元素中更好的缩放

<div>
<pre>img {
    vertical-align: middle;
}
.img-responsive,.thumbnail&gt;img,.thumbnail a &gt;img,.carousel-inner &gt; .item &gt;img,.carousel-inner &gt; .item &gt; a &gt;img {
    display: block;
    max-width: 100%;
    height: auto;
}</pre>
</div>

&emsp;&emsp;如果需要让使用了&nbsp;`.img-responsive`&nbsp;类的图片水平居中，请使用&nbsp;`.center-block`&nbsp;类，不要用&nbsp;`.text-center`

&emsp;&emsp;在IE8-10浏览器中，设置为&nbsp;`.img-responsive`&nbsp;的 SVG 图像显示出的尺寸不匀称。为了解决这个问题，在出问题的地方添加&nbsp;`width: 100% \9;`&nbsp;即可。Bootstrap 并没有自动为所有图像元素设置这一属性，因为这会导致其他图像格式出现错乱

<div>
<pre>&lt;div&gt;
    &lt;img src="http://via.placeholder.com/350x150" class="img-responsive" alt="Responsive image"&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/bootstrap/img/i1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 图片形状

&emsp;&emsp;通过为&nbsp;&lt;img&gt;&nbsp;元素添加以下相应的类，可以让图片呈现不同的形状

&emsp;&emsp;1、img-rounded：圆角图片

&emsp;&emsp;2、img-circle：圆形图片

&emsp;&emsp;3、img-thumbnail：缩略图片

&emsp;&emsp;对于圆角图片和圆形图片效果，因为是使用了CSS3的圆角样式border-radius来实现的，所以注意对于IE8以及其以下版本不支持，是没有圆角效果的。

<div>
<pre>.img-rounded {
    border-radius: 6px;
}
.img-thumbnail {
    display: inline-block;
    max-width: 100%;
    height: auto;
    padding: 4px;
    line-height: 1.42857143;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    -webkit-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
}
.img-circle {
    border-radius: 50%;
}</pre>
</div>
<div>
<pre>&lt;div&gt;
    &lt;img src="http://via.placeholder.com/140x140" alt="rounded" class="img-rounded"&gt;
    &lt;img src="http://via.placeholder.com/140x140" alt="circle" class="img-circle"&gt;
    &lt;img src="http://via.placeholder.com/140x140" alt="thumbnail" class="img-thumbnail"&gt;    
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/bootstrap/img/i2.html" frameborder="0" width="320" height="240"></iframe>
