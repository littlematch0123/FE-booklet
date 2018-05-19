# Bootstrap弹出框

&emsp;&emsp;表面上看，弹出框其实就是一种特殊的[提示框](http://www.cnblogs.com/xiaohuochai/p/7147288.html)，只是多了一个标题而已。但实际上，还是有不同之处的。本文将详细介绍Bootstrap弹出框

&nbsp;

### 基本用法

&emsp;&emsp;在制作提示框（tooltip）时，可以使用&lt;button&gt;或者&lt;a&gt;标签元素，而且通过 data- 属性来声明提示框的信息。而弹出框popover和提示框tooltip相比，就多了一个content内容，那么在此使用 data-content 来定义弹出框中的内容。同样可以使用&lt;button&gt;或者&lt;a&gt;标签来制作

&emsp;&emsp;于是最基本的用法如下

&emsp;&emsp;1、通过&nbsp;title&nbsp;属性的值来定义标题(也可以使用自定义属性&nbsp;data-original-title&nbsp;来设置标题)，title优先级高

&emsp;&emsp;2、通过data-content属性来设置内容

&emsp;&emsp;3、设置data-toggle="popover"

&emsp;&emsp;4、使用如下js代码进行触发

<div>
<pre>$('[data-toggle="popover"]').popover();</pre>
</div>
<div>
<pre>&lt;body style="margin-top:50px"&gt;
&lt;button type="button" class="btn btn-danger" data-toggle="popover" title="标题" data-content="我是内容"&gt;点我弹出/隐藏弹出框&lt;/button&gt;
&lt;script&gt;
$(function(){
    $('[data-toggle="popover"]').popover();
});    
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/bootstrap/popover/p1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 属性参数

&emsp;&emsp;在弹出框制作时，可以在HTML中定义下表所列的自定义属性

&emsp;&emsp;注意：data-palcement默认居右显示，而不是居上显示

![bs_plug7](https://pic.xiaohuochai.site/blog/bs_plug7.jpg)

<div>
<pre>&lt;body style="margin-top:100px"&gt;
&lt;button type="button" class="btn btn-default" data-toggle="popover" data-placement="top" title="标题" data-content="上侧" &gt;上侧&lt;/button&gt;
&lt;button type="button" class="btn btn-default" data-toggle="popover" data-placement="bottom" title="标题" data-content="下侧" &gt;下侧&lt;/button&gt;
&lt;button type="button" class="btn btn-default" data-toggle="popover" title="标题" data-content="无动画" data-animation="false" &gt;无动画&lt;/button&gt;
&lt;button type="button" class="btn btn-default" data-toggle="popover" title="标题" data-content="有动画" &gt;有动画&lt;/button&gt;
&lt;button type="button" class="btn btn-default" data-toggle="popover" title="标题" data-content="hover触发" data-trigger="hover"&gt;hover触发&lt;/button&gt;
&lt;button type="button" class="btn btn-default" data-toggle="popover" title="标题" data-content="click触发" data-trigger="click"&gt;click触发&lt;/button&gt;
&lt;button type="button" class="btn btn-default" data-toggle="popover" title="标题" data-content="不延迟"&gt;不延迟&lt;/button&gt;
&lt;button type="button" class="btn btn-default" data-toggle="popover" title="标题" data-content="延迟500ms" data-delay="500"&gt;延迟500ms&lt;/button&gt;
&lt;script&gt;
$(function(){
    $('[data-toggle="popover"]').popover();
});    
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 250px;" src="https://demo.xiaohuochai.site/bootstrap/popover/p2.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### JS触发

&emsp;&emsp;popover的JS用法与tooltip的用法一样，支持使用options对象的方法来向popover()方法传参

<div>
<pre>$(element).popover(options);</pre>
</div>

&emsp;&emsp;options对象里的参数包括amimation、html、placement、selector、original-title、title、trigger、delay、container、template

&emsp;&emsp;详细情况[移步至此](http://www.cnblogs.com/xiaohuochai/p/7147288.html#anchor3)

<div>
<pre>&lt;body style="margin-top:50px"&gt;
&lt;button type="button" class="btn btn-default" data-toggle="popover" &gt;按钮&lt;/button&gt;
&lt;script&gt;
$(function(){
    $('[data-toggle="popover"]').popover({
        title:"我是标题",
        content:'我是内容'
    });
});    
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/bootstrap/popover/p3.html" frameborder="0" width="320" height="240"></iframe>

【关键字】

&emsp;&emsp;除了使用options对象，还可以使用关键字，'show'、'hide'、'toggle'、'destroy'

<div>
<pre>&lt;body style="margin-top:100px;"&gt;
&lt;button type="button" class="btn btn-default" data-toggle="popover" data-placement="top" title="标题" data-content="内容" id="btn1"&gt;按钮1&lt;/button&gt;
&lt;button type="button" class="btn btn-default" data-toggle="popover" data-placement="top" title="标题" data-content="内容"  id="btn2"&gt;按钮2&lt;/button&gt;
&lt;button type="button" class="btn btn-default" data-toggle="popover" data-placement="top" title="标题" data-content="内容"  id="btn3"&gt;按钮3&lt;/button&gt;
&lt;button type="button" class="btn btn-default" data-toggle="popover" data-placement="top" title="标题" data-content="内容"  id="btn4"&gt;按钮4&lt;/button&gt;
&lt;script&gt;
$(function(){
    $('#btn1').popover('show');//显示弹出框
    $('#btn2').popover('hide');//关闭弹出框
    $('#btn3').popover('toggle');//反转弹出框
    $('#btn4').popover('destroy');//隐藏并销毁弹出框
});    
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 150px;" src="https://demo.xiaohuochai.site/bootstrap/popover/p4.html" frameborder="0" width="320" height="240"></iframe>

【事件】

&emsp;&emsp;该插件支持5种类型的事件订阅

<div>
<pre>show.bs.tooltip        show方法调用之后立即触发该事件
shown.bs.tooltip   &emsp;&emsp; 此事件在tooltip已经显示出来（并且同时在 CSS 过渡效果完成）之后被触发
hide.bs.tooltip        hide方法调用之后立即触发该事件。
hidden.bs.tooltip    　此事件在tooltip被隐藏（并且同时在 CSS 过渡效果完成）之后被触发
inserted.bs.tooltip    当tooltip模板加载到DOM中上时，在show.bs.tooltip触发后，触发该事件</pre>
</div>
<div>
<pre>&lt;body style="margin-top:50px;"&gt;
&lt;button type="button" class="btn btn-default" data-toggle="popover" data-placement="right" title="标题" data-content="内容" id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$(function(){
    $('#btn').popover();
    $("#btn").on("show.bs.popover",function(e){
        $(this).html('关闭');    
    }).on("hide.bs.popover",function(e){
        $(this).html('打开');
    })
});    
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 150px;" src="https://demo.xiaohuochai.site/bootstrap/popover/p5.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 对比提示框

&emsp;&emsp;1、提示框 tooltip 的默认触发事件是&nbsp;hover&nbsp;和&nbsp;focus，而弹出框 popover 是&nbsp;click

&emsp;&emsp;2、提示框 tooltip 只有一个内容(title)，而弹出框不仅可以设置标题（title）还可以设置内容(content)

&emsp;&emsp;3、提示框 tooltip 默认居上显示，而弹出框 popover 默认居右显示

&emsp;&emsp;4、显示模板不同

&emsp;&emsp;提示框tooltip的模板：

<div>
<pre>&lt;div class="tooltip" role="tooltip"&gt;
    &lt;div class="tooltip-arrow"&gt;&lt;/div&gt;
    &lt;div class="tooltip-inner"&gt;&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

&emsp;&emsp;弹出框popover的模板：

<div>
<pre>&lt;div class="popover" role="tooltip"&gt;
    &lt;div class="arrow"&gt;&lt;/div&gt;
    &lt;h3 class="popover-title"&gt;&lt;/h3&gt;
    &lt;div class="popover-content"&gt;&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

