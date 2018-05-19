# Bootstrap模态弹出框

&emsp;&emsp;在 Bootstrap 框架中把模态弹出框统一称为 Modal。这种弹出框效果在大多数 Web 网站的交互中都可见。比如点击一个按钮弹出一个框，弹出的框可能是一段文件描述，也可能带有按钮操作，也有可能弹出的是一张图片。本文将详细介绍Bootstrap模态弹出框

&nbsp;

### 结构分析

&emsp;&emsp;Bootstrap框架中的模态弹出框，分别运用了&ldquo;modal&rdquo;、&ldquo;modal-dialog&rdquo;和&ldquo;modal-content&rdquo;样式，而弹出窗真正的内容都放置在&ldquo;modal-content&rdquo;中，其主要又包括三个部分：

&emsp;&emsp;☑&nbsp;弹出框头部，一般使用&ldquo;modal-header&rdquo;表示，主要包括标题和关闭按钮

&emsp;&emsp;☑&nbsp;弹出框主体，一般使用&ldquo;modal-body&rdquo;表示，弹出框的主要内容

&emsp;&emsp;☑&nbsp;弹出框脚部，一般使用&ldquo;modal-footer&rdquo;表示，主要放置操作按钮

<div>
<pre>&lt;div class="modal show"&gt;
    &lt;div class="modal-dialog"&gt;
        &lt;div class="modal-content"&gt;
            &lt;div class="modal-header"&gt;
                &lt;button type="button" class="close" data-dismiss="modal"&gt;&lt;span aria-hidden="true"&gt;&amp;times;&lt;/span&gt;&lt;span class="sr-only"&gt;Close&lt;/span&gt;&lt;/button&gt;
                &lt;h4 class="modal-title"&gt;模态弹出窗标题&lt;/h4&gt;
            &lt;/div&gt;
            &lt;div class="modal-body"&gt;
                &lt;p&gt;模态弹出窗主体内容&lt;/p&gt;
            &lt;/div&gt;
            &lt;div class="modal-footer"&gt;
                &lt;button type="button" class="btn btn-default" data-dismiss="modal"&gt;关闭&lt;/button&gt;
                &lt;button type="button" class="btn btn-primary"&gt;保存&lt;/button&gt;
            &lt;/div&gt;
        &lt;/div&gt;&lt;!-- /.modal-content --&gt;
    &lt;/div&gt;&lt;!-- /.modal-dialog --&gt;
&lt;/div&gt;&lt;!-- /.modal --&gt;</pre>
</div>

<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/bootstrap/module/m1.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;对于弹窗而言，modal-content是样式的关键。主要设置了弹窗的边框、边距、背景色和阴影等样式&nbsp;

<div>
<pre>.modal-content {
  position: relative;
  background-color: #fff;
  -webkit-background-clip: padding-box;
          background-clip: padding-box;
  border: 1px solid #999;
  border: 1px solid rgba(0, 0, 0, .2);
  border-radius: 6px;
  outline: 0;
  -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, .5);
          box-shadow: 0 3px 9px rgba(0, 0, 0, .5);
}</pre>
</div>

&emsp;&emsp;除此之外，modal-content中的modal-header、modal-body和modal-footer三个部分样式设置如下

<div>
<pre>.modal-header {
  min-height: 16.42857143px;
  padding: 15px;
  border-bottom: 1px solid #e5e5e5;
}
.modal-header .close {
  margin-top: -2px;
}
.modal-title {
  margin: 0;
  line-height: 1.42857143;
}
.modal-body {
  position: relative;
  padding: 15px;
}
.modal-footer {
  padding: 15px;
  text-align: right;
  border-top: 1px solid #e5e5e5;
}</pre>
</div>

&emsp;&emsp;这三个部分主要控制一些间距的样式。而modal-footer都是用来放置按钮，所以底部还对包含的按钮做了一定的样式处理

<div>
<pre>.modal-footer .btn + .btn {
  margin-bottom: 0;
  margin-left: 5px;
}
.modal-footer .btn-group .btn + .btn {
  margin-left: -1px;
}
.modal-footer .btn-block + .btn-block {
  margin-left: 0;
}</pre>
</div>

&nbsp;

### 触发方式

&emsp;&emsp;众所周知，模态弹出窗在页面加载完成时，是被隐藏在页面中的，只有通过一定的动作（事件）才能触发模态弹出窗的显示。在Bootstrap框架中实现方法有2种

&emsp;&emsp;在介绍触发方式之前，首先要说明.show和.fade这两个方法。只有模态弹出窗默认是隐藏的，才能触发其显示

<div>
<pre>.fade {
    opacity: 0;
    -webkit-transition: opacity .15s linear;
    -o-transition: opacity .15s linear;
    transition: opacity .15s linear;
}
.show {
    display: block!important;
}</pre>
</div>

【方法一】

&emsp;&emsp;模态弹出窗声明，只需要自定义两个必要的属性：data-toggle和data-target（bootstrap中声明式触发方法一般依赖于这些自定义的data-xxx 属性。比如data-toggle="" 或者 data-dismiss=""）

&emsp;&emsp;data-toggle必须设置为modal(toggle中文翻译过来就是触发器)；

&emsp;&emsp;data-target可以设置为CSS的选择符，也可以设置为模态弹出窗的ID值，一般情况设置为模态弹出窗的ID值，因为ID值是唯一的值

<div>
<pre>&lt;!-- 触发模态弹出窗的元素 --&gt;
&lt;button type="button" data-toggle="modal" data-target="#mymodal" class="btn btn-primary"&gt;点击&lt;/button&gt;
&lt;!-- 模态弹出窗 --&gt;
&lt;div class="modal fade" id="mymodal"&gt;
    &lt;div class="modal-dialog"&gt;
        &lt;div class="modal-content"&gt;
            &lt;div class="modal-header"&gt;
                &lt;button type="button" class="close" data-dismiss="modal"&gt;&lt;span aria-hidden="true"&gt;&amp;times;&lt;/span&gt;&lt;span class="sr-only"&gt;Close&lt;/span&gt;&lt;/button&gt;
                &lt;h4 class="modal-title"&gt;模态弹出窗标题&lt;/h4&gt;
            &lt;/div&gt;
            &lt;div class="modal-body"&gt;
                &lt;p&gt;模态弹出窗主体内容&lt;/p&gt;
            &lt;/div&gt;
            &lt;div class="modal-footer"&gt;
                &lt;button type="button" class="btn btn-default" data-dismiss="modal"&gt;关闭&lt;/button&gt;
                &lt;button type="button" class="btn btn-primary"&gt;保存&lt;/button&gt;
            &lt;/div&gt;
        &lt;/div&gt;&lt;!-- /.modal-content --&gt;
    &lt;/div&gt;&lt;!-- /.modal-dialog --&gt;
&lt;/div&gt;&lt;!-- /.modal --&gt;</pre>
</div>

<iframe style="width: 100%; height: 213px;" src="https://demo.xiaohuochai.site/bootstrap/module/m2.html" frameborder="0" width="320" height="240"></iframe>

【方法二】

&emsp;&emsp;触发模态弹出窗也可以是一个链接&lt;a&gt;元素，那么可以使用链接元素自带的href属性替代data-target属性&nbsp;

&emsp;&emsp;不过建议还是使用统一使用data-target的方式来触发

<div>
<pre>&lt;!-- 触发模态弹出窗的元素 --&gt;
&lt;a data-toggle="modal" href="#mymodal" class=" btn btn-primary" &gt;点击&lt;/a&gt;
&lt;!-- 模态弹出窗 --&gt;
&lt;div class="modal fade" id="mymodal"&gt;
    &lt;div class="modal-dialog"&gt;
        &lt;div class="modal-content"&gt;
            &lt;div class="modal-header"&gt;
                &lt;button type="button" class="close" data-dismiss="modal"&gt;&lt;span aria-hidden="true"&gt;&amp;times;&lt;/span&gt;&lt;span class="sr-only"&gt;Close&lt;/span&gt;&lt;/button&gt;
                &lt;h4 class="modal-title"&gt;模态弹出窗标题&lt;/h4&gt;
            &lt;/div&gt;
            &lt;div class="modal-body"&gt;
                &lt;p&gt;模态弹出窗主体内容&lt;/p&gt;
            &lt;/div&gt;
            &lt;div class="modal-footer"&gt;
                &lt;button type="button" class="btn btn-default" data-dismiss="modal"&gt;关闭&lt;/button&gt;
                &lt;button type="button" class="btn btn-primary"&gt;保存&lt;/button&gt;
            &lt;/div&gt;
        &lt;/div&gt;&lt;!-- /.modal-content --&gt;
    &lt;/div&gt;&lt;!-- /.modal-dialog --&gt;
&lt;/div&gt;&lt;!-- /.modal --&gt;</pre>
</div>

<iframe style="width: 100%; height: 213px;" src="https://demo.xiaohuochai.site/bootstrap/module/m3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 尺寸

&emsp;&emsp;Bootstrap框架为模态弹出窗提供了不同尺寸，一个是大尺寸样式&ldquo;modal-lg&rdquo;，另一个是小尺寸样式&ldquo;modal-sm&rdquo;。其结构上稍做调整

&emsp;&emsp;注意：.bs-example-modal-lg和.bs-example-modal-sm是自定义的名称，而非必须

<div>
<pre>&lt;!-- 大尺寸模态弹出窗 --&gt;
&lt;div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true"&gt;
    &lt;div class="modal-dialog modal-lg"&gt;
       &lt;div class="modal-content"&gt; ... &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
&lt;!-- 小尺寸模态弹出窗 --&gt;
&lt;div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true"&gt;
    &lt;div class="modal-dialog modal-sm"&gt;
       &lt;div class="modal-content"&gt; ... &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bs-example-modal-lg"&gt;大尺寸&lt;/button&gt;
&lt;button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal"&gt;默认尺寸&lt;/button&gt;
&lt;button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bs-example-modal-sm"&gt;小尺寸&lt;/button&gt;
&lt;div class="modal fade" id="myModal"&gt;
    &lt;div class="modal-dialog"&gt;
        &lt;div class="modal-content"&gt;
            &lt;div class="modal-body"&gt;
                &lt;p&gt;小火柴的蓝色理想&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
&lt;div class="modal fade bs-example-modal-lg"&gt;
    &lt;div class="modal-dialog modal-lg"&gt;
        &lt;div class="modal-content"&gt;
            &lt;div class="modal-body"&gt;
                &lt;p&gt;小火柴的蓝色理想&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
&lt;div class="modal fade bs-example-modal-sm"&gt;
    &lt;div class="modal-dialog modal-sm"&gt;
        &lt;div class="modal-content"&gt;
            &lt;div class="modal-body"&gt;
                &lt;p&gt;小火柴的蓝色理想&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/bootstrap/module/m4.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### CSS解析

&emsp;&emsp;bootstrap中的&ldquo;模态弹出框&rdquo;有以下几个特点：

&emsp;&emsp;1、模态弹出窗是固定在浏览器中的。

&emsp;&emsp;2、单击右侧全屏按钮，在全屏状态下，模态弹出窗宽度是自适应的，而且modal-dialog水平居中。

&emsp;&emsp;3、当浏览器视窗大于768px时，模态弹出窗的宽度为600px

&emsp;&emsp;4、模态弹出窗的背景常常有一个透明的蒙层效果

&emsp;&emsp;5、触发弹窗时，弹窗是从上到下、逐渐浮现到页面前的

【固定在浏览器实现】

<div>
<pre>.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1050;
  display: none;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
  outline: 0;
}</pre>
</div>

【水平居中实现】

<div>
<pre>.modal-dialog {
  position: relative;
  width: auto;
  margin: 10px;
}</pre>
</div>

【当浏览器视窗大于768px时，模态弹出窗的宽度为600px实现】

<div>
<pre>@media (min-width: 768px) {
  .modal-dialog {
    width: 600px;
    margin: 30px auto;
  }
  .modal-content {
    -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
            box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
  }
  .modal-sm {
    width: 300px;
  }
}</pre>
</div>

【蒙版】

&emsp;&emsp;弹窗弹出时为&nbsp;&lt;body&gt;&nbsp;元素添加&nbsp;`.modal-open`类，从而覆盖页面默认的滚动行为，并且还会自动生成一个&nbsp;`.modal-backdrop`&nbsp;元素用于提供一个可点击的区域，点击此区域就即可关闭模态框

<div>
<pre>.modal-open {
    overflow: hidden;
}</pre>
</div>
<div>
<pre>.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1040;
  background-color: #000;
}</pre>
</div>

&emsp;&emsp;给其添加了一个过渡动画，从fade到in，把opacity值从0变成了0.5

<div>
<pre>.modal-backdrop.fade {
  filter: alpha(opacity=0);
  opacity: 0;
}
.modal-backdrop.in {
  filter: alpha(opacity=50);
  opacity: .5;
}</pre>
</div>

【动画效果】

&emsp;&emsp;弹窗的动画内容是从-25%的top值位置到top:0的位置

<div>
<pre>.modal.fade .modal-dialog {
  -webkit-transition: -webkit-transform .3s ease-out;
       -o-transition:      -o-transform .3s ease-out;
          transition:         transform .3s ease-out;
  -webkit-transform: translate3d(0, -25%, 0);
       -o-transform: translate3d(0, -25%, 0);
          transform: translate3d(0, -25%, 0);
}

.modal.in .modal-dialog {
  -webkit-transform: translate3d(0, 0, 0);
       -o-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
}</pre>
</div>

&emsp;&emsp;如果不需要模态框弹出时的动画效果（淡入淡出效果），删掉&nbsp;`.fade`&nbsp;类即可

<div>
<pre>&lt;!-- 触发模态弹出窗的元素 --&gt;
&lt;button type="button" data-toggle="modal" data-target="#mymodal" class="btn btn-primary"&gt;点击&lt;/button&gt;
&lt;!-- 模态弹出窗 --&gt;
&lt;div class="modal" id="mymodal"&gt;
    &lt;div class="modal-dialog"&gt;
        &lt;div class="modal-content"&gt;
            &lt;div class="modal-header"&gt;
                &lt;button type="button" class="close" data-dismiss="modal"&gt;&lt;span aria-hidden="true"&gt;&amp;times;&lt;/span&gt;&lt;span class="sr-only"&gt;Close&lt;/span&gt;&lt;/button&gt;
                &lt;h4 class="modal-title"&gt;模态弹出窗标题&lt;/h4&gt;
            &lt;/div&gt;
            &lt;div class="modal-body"&gt;
                &lt;p&gt;模态弹出窗主体内容&lt;/p&gt;
            &lt;/div&gt;
            &lt;div class="modal-footer"&gt;
                &lt;button type="button" class="btn btn-default" data-dismiss="modal"&gt;关闭&lt;/button&gt;
                &lt;button type="button" class="btn btn-primary"&gt;保存&lt;/button&gt;
            &lt;/div&gt;
        &lt;/div&gt;&lt;!-- /.modal-content --&gt;
    &lt;/div&gt;&lt;!-- /.modal-dialog --&gt;
&lt;/div&gt;&lt;!-- /.modal --&gt;</pre>
</div>

<iframe style="width: 100%; height: 213px;" src="https://demo.xiaohuochai.site/bootstrap/module/m5.html" frameborder="0" width="320" height="240"></iframe>&nbsp;

### 参数说明

&emsp;&emsp;除了通过data-toggle和data-target来控制模态弹出窗之外，Bootstrap框架针对模态弹出框还提供了其他自定义data-属性，来控制模态弹出窗。有关Modal弹出窗自定义属性相关说明如下所示

&emsp;&emsp;该参数设置在按钮上，或者弹窗上都可以。出于方便，一般地，在按钮上设置

&emsp;&emsp;注意：属性值一定要加引号，如data-backdrop="false"

&emsp;&emsp;如果想要支持esc键关闭弹窗，需要在弹窗上设置tabindex="-1"

![bs_plug1](https://pic.xiaohuochai.site/blog/bs_plug1.jpg)

<div>
<pre>&lt;button type="button" data-toggle="modal" data-target="#mymodal1" class="btn btn-primary"&gt;默认样式&lt;/button&gt;
&lt;button type="button" data-toggle="modal" data-target="#mymodal2" data-backdrop="false" class="btn btn-primary"&gt;无蒙版&lt;/button&gt;
&lt;button type="button" data-toggle="modal" data-target="#mymodal3" data-keyboard="false" class="btn btn-primary"&gt;ESC失效&lt;/button&gt;
&lt;button type="button" data-toggle="modal" data-target="#mymodal4" data-show="false" class="btn btn-primary"&gt;弹窗默认不显示&lt;/button&gt;
&lt;div class="modal fade"  tabindex="-1" id="mymodal1"&gt;
    &lt;div class="modal-dialog"&gt;
        &lt;div class="modal-content"&gt;
            &lt;div class="modal-header"&gt;
                &lt;button type="button" class="close" data-dismiss="modal"&gt;&lt;span aria-hidden="true"&gt;&amp;times;&lt;/span&gt;&lt;span class="sr-only"&gt;Close&lt;/span&gt;&lt;/button&gt;
                &lt;h4 class="modal-title"&gt;小火柴的蓝色理想&lt;/h4&gt;
            &lt;/div&gt;        
            &lt;div class="modal-body"&gt;
                &lt;p&gt;好的代码像粥一样，都是用时间熬出来的&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
&lt;div class="modal fade"  tabindex="-1" id="mymodal2"&gt;
    &lt;div class="modal-dialog"&gt;
        &lt;div class="modal-content"&gt;
            &lt;div class="modal-header"&gt;
                &lt;button type="button" class="close" data-dismiss="modal"&gt;&lt;span aria-hidden="true"&gt;&amp;times;&lt;/span&gt;&lt;span class="sr-only"&gt;Close&lt;/span&gt;&lt;/button&gt;
                &lt;h4 class="modal-title"&gt;小火柴的蓝色理想&lt;/h4&gt;
            &lt;/div&gt;        
            &lt;div class="modal-body"&gt;
                &lt;p&gt;好的代码像粥一样，都是用时间熬出来的&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
&lt;div class="modal fade"  tabindex="-1" id="mymodal3"&gt;
    &lt;div class="modal-dialog"&gt;
        &lt;div class="modal-content"&gt;
            &lt;div class="modal-header"&gt;
                &lt;button type="button" class="close" data-dismiss="modal"&gt;&lt;span aria-hidden="true"&gt;&amp;times;&lt;/span&gt;&lt;span class="sr-only"&gt;Close&lt;/span&gt;&lt;/button&gt;
                &lt;h4 class="modal-title"&gt;小火柴的蓝色理想&lt;/h4&gt;
            &lt;/div&gt;        
            &lt;div class="modal-body"&gt;
                &lt;p&gt;好的代码像粥一样，都是用时间熬出来的&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
&lt;div class="modal fade"  tabindex="-1" id="mymodal4"&gt;
    &lt;div class="modal-dialog"&gt;
        &lt;div class="modal-content"&gt;
            &lt;div class="modal-header"&gt;
                &lt;button type="button" class="close" data-dismiss="modal"&gt;&lt;span aria-hidden="true"&gt;&amp;times;&lt;/span&gt;&lt;span class="sr-only"&gt;Close&lt;/span&gt;&lt;/button&gt;
                &lt;h4 class="modal-title"&gt;小火柴的蓝色理想&lt;/h4&gt;
            &lt;/div&gt;        
            &lt;div class="modal-body"&gt;
                &lt;p&gt;好的代码像粥一样，都是用时间熬出来的&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 148px;" src="https://demo.xiaohuochai.site/bootstrap/module/m6.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### JS触发

&emsp;&emsp;除了使用自定义属性data-触发模态弹出框之外，还可以通过JavaScript方法来触发模态弹出窗。比如说给按钮设置一个单击事件，然后触发模态弹出窗&nbsp;

&emsp;&emsp;只需一行 JavaScript 代码，即可通过元素的 id&nbsp;`myModal`&nbsp;调用模态框

<div>
<pre>$('#myModal').modal()</pre>
</div>
<div>
<pre>&lt;button type="button" class="btn btn-primary"&gt;点击&lt;/button&gt;
&lt;div class="modal fade"  tabindex="-1" id="mymodal"&gt;
    &lt;div class="modal-dialog"&gt;
        &lt;div class="modal-content"&gt;
            &lt;div class="modal-header"&gt;
                &lt;button type="button" class="close" data-dismiss="modal"&gt;&lt;span aria-hidden="true"&gt;&amp;times;&lt;/span&gt;&lt;span class="sr-only"&gt;Close&lt;/span&gt;&lt;/button&gt;
                &lt;h4 class="modal-title"&gt;小火柴的蓝色理想&lt;/h4&gt;
            &lt;/div&gt;        
            &lt;div class="modal-body"&gt;
                &lt;p&gt;好的代码像粥一样，都是用时间熬出来的&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
&lt;script&gt;
$(function(){
    $(".btn").click(function(){
        $("#mymodal").modal();
    });
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 148px;" src="https://demo.xiaohuochai.site/bootstrap/module/m7.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;使用JavaScript触发模态弹出窗时，Bootstrap框架提供了一些设置，主要包括属性设置、参数设置和事件设置

【属性设置】

&emsp;&emsp;模态弹出窗默认支持的自定义属性主要有

![bs_plug2](https://pic.xiaohuochai.site/blog/bs_plug2.jpg)

&emsp;&emsp;不想让用户按ESC键关闭模态弹出窗，可以这样做&nbsp;

<div>
<pre>$(function(){
    $(".btn").click(function(){
        $("#mymodal").modal({
            keyboard:false
        });
    });
});</pre>
</div>

【参数设置】

&emsp;&emsp;在Bootstrap框架中还为模态弹出窗提供了三种参数设置，具体说明如下

![bs_plug3](https://pic.xiaohuochai.site/blog/bs_plug3.png)

<div>
<pre>&lt;button type="button" class="btn btn-primary" id="btn" style="position:absolute;z-index:9999"&gt;打开(关闭)&lt;/button&gt;
&lt;div class="modal"  tabindex="-1" id="mymodal" &gt;
    &lt;div class="modal-dialog"&gt;
        &lt;div class="modal-content"&gt;
            &lt;div class="modal-header"&gt;
                &lt;button type="button" class="close" data-dismiss="modal"&gt;&lt;span aria-hidden="true"&gt;&amp;times;&lt;/span&gt;&lt;span class="sr-only"&gt;Close&lt;/span&gt;&lt;/button&gt;
                &lt;h4 class="modal-title"&gt;小火柴的蓝色理想&lt;/h4&gt;
            &lt;/div&gt;        
            &lt;div class="modal-body"&gt;
                &lt;p&gt;好的代码像粥一样，都是用时间熬出来的&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
&lt;script&gt;
;$(function(){
    $("#btn").click(function(){
         $("#mymodal").modal("toggle");
    });
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 148px;" src="https://demo.xiaohuochai.site/bootstrap/module/m8.html" frameborder="0" width="320" height="240"></iframe>

【事件设置】

&emsp;&emsp;模态弹窗还支持五种类型的事件，分别是模态弹出窗的弹出前、弹出后，关闭前、关闭后及远端数据加载后，具体描述如下：&nbsp;

![bs_plug4](https://pic.xiaohuochai.site/blog/bs_plug4.png)

<div>
<pre>&lt;button type="button" class="btn btn-primary" id="btn" style="position:absolute;z-index:9999"&gt;打开&lt;/button&gt;
&lt;div class="modal"  tabindex="-1" id="mymodal" &gt;
    &lt;div class="modal-dialog"&gt;
        &lt;div class="modal-content"&gt;
            &lt;div class="modal-header"&gt;
                &lt;button type="button" class="close" data-dismiss="modal"&gt;&lt;span aria-hidden="true"&gt;&amp;times;&lt;/span&gt;&lt;span class="sr-only"&gt;Close&lt;/span&gt;&lt;/button&gt;
                &lt;h4 class="modal-title"&gt;小火柴的蓝色理想&lt;/h4&gt;
            &lt;/div&gt;        
            &lt;div class="modal-body"&gt;
                &lt;p&gt;好的代码像粥一样，都是用时间熬出来的&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
&lt;script&gt;
;$(function(){
    $("#btn").click(function(){
         $("#mymodal").modal("toggle");
    });
    $('#mymodal').on('hide.bs.modal', function(){
        $("#btn").html("打开");
    });
    $('#mymodal').on('show.bs.modal', function(){
        $("#btn").html("关闭");
    });    
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 148px;" src="https://demo.xiaohuochai.site/bootstrap/module/m9.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### JS解析

【1】IIFE

&emsp;&emsp;使用立即调用函数，防止插件内代码外泄，从而形成一个闭环，并且只能从jQuery的fn里进行扩展

<div>
<pre>+function ($) {
    //使用es5严格模式
    'use strict';
    //
}(window.jQuery);</pre>
</div>

【2】初始设置

<div>
<pre>  var Modal = function (element, options) {
    this.options             = options//options是设置选项
    this.$body               = $(document.body)//body元素
    this.$element            = $(element)////element表示modal弹出框容器及内容元素
    this.$dialog             = this.$element.find('.modal-dialog')//弹窗对象
    this.$backdrop           = null //蒙版对象
    this.isShown             = null //弹窗是否显示的标识
    this.originalBodyPad     = null //body的padding-right标识
    this.scrollbarWidth      = 0 //滚动条宽度为0
    this.ignoreBackdropClick = false //默认蒙板可点击
    //如果设置了remote，就加载remote指定url的内容到modal-content样式的元素内，并触发loaded.bs.modal事件
    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }
  //组件版本号3.3.7
  Modal.VERSION  = '3.3.7'
  //动画持续时间300ms
  Modal.TRANSITION_DURATION = 300
  //蒙版动画持续时间150ms
  Modal.BACKDROP_TRANSITION_DURATION = 150
  //默认设置
  Modal.DEFAULTS = {
    backdrop: true, //显示蒙版
    keyboard: true, //按ESC键关闭弹窗
    show: true //单击触发元素时打开弹窗
  }  </pre>
</div>

【3】插件核心代码

&emsp;&emsp;主要是Modal核心类函数的定义、默认参数的定义和9个原型方法的定义，这9个原型方法主要是处理弹窗的反转、打开、关闭和弹窗背景设置、取消等操作

<div>
<pre>  // 反转弹窗(打开或关闭)
  Modal.prototype.toggle = function (_relatedTarget) {
    //如果弹窗处于显示状态，则调用hide()方法，关闭它；否则，调用show()方法，打开弹窗
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }
  // 打开弹窗
  Modal.prototype.show = function (_relatedTarget) {
    //保存this值
    var that = this
    //定义弹窗前的触发事件
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })
    //打开弹窗前，触发事件
    this.$element.trigger(e)
    // 如果已经打开了（或者曾经被阻止过），则退出执行，后续代码不做处理
    if (this.isShown || e.isDefaultPrevented()) return
    //设置弹窗显示标识为true
    this.isShown = true
    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')
    //处理键盘事件，主要是设置按esc键时是否关闭弹窗
    this.escape()
    this.resize()
    // 如果单击了元素内的子元素（带有[data-dismiss="modal"]属性），则关闭弹窗
    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))
    //点击弹窗时，如果鼠标的目标是当前弹窗，则将默认蒙板不可点击的标识置为true，并不可再设置
    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })
    //绘制蒙版后，处理以下代码
    this.backdrop(function () {
      // 判断浏览器是否支持动画，并且弹窗是否设置了动画过渡效果（是否有fade样式）   
      var transition = $.support.transition &amp;&amp; that.$element.hasClass('fade')
      // 如果modal弹窗没有父容器，则将它附加到body上
      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body)
      }
      // 显示modal弹窗
      that.$element
        .show()
        .scrollTop(0)
      that.adjustDialog()
      // 如果支持动画，强制刷新UI现场，重绘弹窗
      if (transition) {
        that.$element[0].offsetWidth
      }
      // 给modal弹窗添加in样式，和modal样式一起
      that.$element.addClass('in')
      // 强制给弹窗设定焦点
      that.enforceFocus()
      // 打开弹窗显示后的触发事件
      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })
      transition ?
        that.$dialog //找到弹窗元素
          .one('bsTransitionEnd', function () {
            // 如果支持动画，则动画结束以后给弹窗内的元素设置焦点，并触发shown事件
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        // 否则直接设置焦点，并触发shown事件  
        that.$element.trigger('focus').trigger(e)
    })
  }
  // 关闭弹窗
  Modal.prototype.hide = function (e) {
    //阻止冒泡
    if (e) e.preventDefault()
    //定义关闭弹窗前的触发事件
    e = $.Event('hide.bs.modal')
    //关闭弹窗前触发事件
    this.$element.trigger(e)
    // 如果已经关闭了（或者曾经被阻止过），则退出执行，后续代码不做处理
    if (!this.isShown || e.isDefaultPrevented()) return
    //设置显示状态标识为false
    this.isShown = false
    //处理键盘事件，主要是设置按Esc键的时候是否关闭弹窗
    this.escape()
    this.resize()
    //取消所有的focusin.bs.modal事件
    $(document).off('focusin.bs.modal')
    this.$element
      .removeClass('in') //删除in样式
      .off('click.dismiss.bs.modal') //取消dismiss的单击事件
      .off('mouseup.dismiss.bs.modal')//取消dismiss的鼠标抬起事件
    //取消dismiss的鼠标放下事件
    this.$dialog.off('mousedown.dismiss.bs.modal')
    //如果支持动画，则动画结束以后再关闭，否则直接关闭
    $.support.transition &amp;&amp; this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }
  //强制弹窗处于焦点状态
  Modal.prototype.enforceFocus = function () {
    $(document)
      // 禁用所有的focusin事件，防止无限循环
      .off('focusin.bs.modal') 
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target &amp;&amp; !this.$element.has(e.target).length) {
          // 如果处于焦点的元素不是当前元素（或不包含当前元素），则强制给当前元素设置焦点
          this.$element.trigger('focus')
        }
      }, this))
  }
  //按Esc键是否退出的处理
  Modal.prototype.escape = function () {
    if (this.isShown &amp;&amp; this.options.keyboard) {
      //如果弹窗是打开状态，并且keyboard选项为true，则说明允许按ESC键可以关闭弹窗
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        //检测键盘事件，如果是ESC(keycode=27)，则关闭
        e.which == 27 &amp;&amp; this.hide()
      }, this))
    } else if (!this.isShown) {
      // 否则，取消键盘事件检测
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }
  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }
  //关闭弹窗
  Modal.prototype.hideModal = function () {
    var that = this
    //关闭弹窗
    this.$element.hide()
    this.backdrop(function () {
      //移除body上的modal-open样式
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      //关闭以后，触发hidden事件
      that.$element.trigger('hidden.bs.modal')
    })
  }    
  //删除蒙版，关闭弹窗时触发
  Modal.prototype.removeBackdrop = function () {
    // 删除蒙版
    this.$backdrop &amp;&amp; this.$backdrop.remove()
    // 设置蒙版对象为null
    this.$backdrop = null
  }  
  //添加蒙版，打开弹窗时触发
  Modal.prototype.backdrop = function (callback) {
    var that = this
    //是否设置了动画过渡效果，如果是则将animate设置为fade
    var animate = this.$element.hasClass('fade') ? 'fade' : ''
    //如果是打开状态，并且设置了backdrop参数
    if (this.isShown &amp;&amp; this.options.backdrop) {
      //定义动画标识
      var doAnimate = $.support.transition &amp;&amp; animate
      // 在body上定义蒙版div元素，并附加fade标识以支持动画
      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)
      //蒙版被单击时进行判断：如果backdrop参数为static，则强制将弹窗设置为售点；否则，关闭弹窗
      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))
      // 如果支持动画，强制刷新UI现场，重绘弹窗
      if (doAnimate) this.$backdrop[0].offsetWidth 
      //添加in样式
      this.$backdrop.addClass('in')
      //如果没有回调，则直接返回
      if (!callback) return
      // 如果支持动画，则动画结束执行回调函数；否则，直接执行回调函数
      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()
      //如果是关闭状态，但蒙版对象依然还存在  
    } else if (!this.isShown &amp;&amp; this.$backdrop) {
      //去除in样式
      this.$backdrop.removeClass('in')
      var callbackRemove = function () {
        that.removeBackdrop()
        callback &amp;&amp; callback()
      }
      // 如果支持动画，则动画结束执行回调函数；否则，直接执行回调函数
      $.support.transition &amp;&amp; this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()
    } else if (callback) {
      callback()
    }
  }  </pre>
</div>

【4】滚动条处理

&emsp;&emsp;在弹窗插件中，使用了大量的代码对滚动条进行处理

<div>
<pre>  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }
  //处理因为滚动条而使弹窗位置不固定问题
  Modal.prototype.adjustDialog = function () {
    //如果元素的高度大于页面的高度，即溢出屏幕，则modalIsOverflowing置为true
    var modalIsOverflowing = this.$element[0].scrollHeight &gt; document.documentElement.clientHeight
    //将元素的paddingLeft和paddingRight设置为scrollbarWidth
    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing &amp;&amp; modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing &amp;&amp; !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }
  //重置调节器
  Modal.prototype.resetAdjustments = function () {
    //将元素的paddingLeft和paddingRight置为空
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }
  //检查滚动条
  Modal.prototype.checkScrollbar = function () {
    //fullWindowWidth储存页面宽度
    var fullWindowWidth = window.innerWidth
    //IE8-浏览器不支持innerWidth属性
    if (!fullWindowWidth) {
      //使用getBoundingClientRect方法来获得页面宽度 
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    //如果有滚动条，则bodyIsOverflowing置为true
    this.bodyIsOverflowing = document.body.clientWidth &lt; fullWindowWidth
    //将scrollbarWidth置为实际的滚动条宽度
    this.scrollbarWidth = this.measureScrollbar()
  }
  //用来为body元素设置padding-right的值，防止body元素被scrollbar阻挡
  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    //如果页面存在滚动条，则body的padding-right设置为默认的padding-right加上滚动条的宽度
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }
  //重置滚动条
  Modal.prototype.resetScrollbar = function () {
    //将body的padding-right值设置为null
    this.$body.css('padding-right', this.originalBodyPad)
  } 
  //测量滚动条宽度
  Modal.prototype.measureScrollbar = function () {
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    //滚动条宽度等于offetWidth - clientWidth
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }</pre>
</div>

【5】jQuery插件定义

&emsp;&emsp;在jQuery上定义插件，有点特殊的代码是options参数的收集和合并，主要收集了3个部分：插件的默认参数DEFAULTS、modal元素上的data-属性，执行插件时传入的option对象，这三个部分的优先级依次升高

<div>
<pre>  function Plugin(option, _relatedTarget) {
    //根据选择器，遍历所有符合规则的元素
    return this.each(function () {
      var $this   = $(this)
      //获取自定义属性bs.modal的值
      var data    = $this.data('bs.modal')
      //将插件的默认参数DEFAULTS、modal元素上的data-属性，执行插件时传入的option对象，这三种值合并到一起，作为options参数
      //后面的参数的优先级高于前面的参数
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' &amp;&amp; option)
      //如果值不存在，则将Modal实例设置为bs.modal值
      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      //如果option传递了string，则表示要执行某个方法
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }
  var old = $.fn.modal
  //保留其他库的$.fn.modal代码(如果定义的话)，以便在noConflict之后可以继续使用该老代码
  $.fn.modal             = Plugin
  //重设插件构造器，可以通过该属性获取插件的真实类函数
  $.fn.modal.Constructor = Modal</pre>
</div>

【6】防冲突处理

<div>
<pre>  $.fn.modal.noConflict = function () {
    //恢复以前的旧代码
    $.fn.modal = old
    //将$.fn.modal.noConflict()设置为Bootstrap的Modal插件
    return this
  }  </pre>
</div>

【7】绑定触发事件

<div>
<pre>  //监测所有拥有自定义属性data-toggle="modal"的元素上的单击事件
  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    //获取href属性值
    var href    = $this.attr('href')
    //获取data-target属性值，如果没有，则获取href值，该值是所弹出元素的id
    var $target = $($this.attr('data-target') || (href &amp;&amp; href.replace(/.*(?=#[^\s]+$)/, ''))) 
    //如果弹窗元素上已经弹窗实例(即弹出过一次了)，则设置option值为字符串toggle，否则将remote值(如果有的话)、弹窗元素上的自定义属性值集合、触发元素上的自定义属性值集合，合并为option对象
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) &amp;&amp; href }, $target.data(), $this.data())
    //如果是a链接，则阻止其默认行为
    if ($this.is('a')) e.preventDefault()
    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return 
      //定义一次hidden事件，给所单击元素设置focus
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') &amp;&amp; $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);  </pre>
</div>

