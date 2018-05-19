# Bootstrap提示框

&emsp;&emsp;提示框是一个比较常见的功能，一般来说是鼠标移动到特定元素上时，显示相关的提示语。本文将详细介绍Bootstrap提示框

&nbsp;

### 基本用法

&emsp;&emsp;Bootstrap框架中的提示框，结构非常简单，常常使用的是按钮&lt;button&gt;标签或者链接&lt;a&gt;标签来制作。不管是使用按钮还是链接来制作提示框，他们都需要满足下列条件：

&emsp;&emsp;1、通过&nbsp;title&nbsp;属性的值来定义提示信息(也可以使用自定义属性&nbsp;data-original-title&nbsp;来设置提示信息)，title属性的优先级高

&emsp;&emsp;2、通过&nbsp;data-placement&nbsp;自定义属性来控制提示信息框的位置，根据四种不同的位置，data-placement具有四个值：top、right、bottom和left，分别表示提示框出现的位置在顶部、右边、底部和左边

&emsp;&emsp;3、还有一个最重要的参数不可缺少，data-toggle="tooltip"

【触发方式】

&emsp;&emsp;Bootstrap框架中的提示框的触发方式和前面介绍的插件略有不同。不能直接通过自定义的属性 data- 来触发。必须得依赖于JavaScript的代码触发

&emsp;&emsp;最简单的触发方式如下：

<div>
<pre>$(function(){
    $('[data-toggle="tooltip"]').tooltip();
});</pre>
</div>
<div>
<pre>&lt;body style="margin:80px;"&gt;
&lt;button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="left" data-original-title="提示框居左" title="左边提示框"&gt;提示框居左&lt;/button&gt;
&lt;button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="top" data-original-title="提示框在顶部"&gt;提示框在顶部&lt;/button&gt;
&lt;button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" data-original-title="提示框在底部"&gt;提示框在底部&lt;/button&gt;
&lt;button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="right" data-original-title="提示框居右"&gt;提示框居右&lt;/button&gt;
&lt;script&gt;
$(function(){
    $('[data-toggle="tooltip"]').tooltip();
});    
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/bootstrap/tooltip/t1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 属性参数

&emsp;&emsp;提示框组件提供了7个自定义属性参数，用来对提示框进行设置

![bs_plug5](https://pic.xiaohuochai.site/blog/bs_plug5.jpg)

<div>
<pre>&lt;body style="margin-top:80px;"&gt;
&lt;button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="top" data-original-title="无动画" data-animation="false" &gt;无动画&lt;/button&gt;
&lt;button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="top" data-original-title="有动画" &gt;有动画&lt;/button&gt;
&lt;button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="top" data-original-title="hover触发" data-trigger="hover"&gt;hover触发&lt;/button&gt;
&lt;button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="top" data-original-title="click触发" data-trigger="click"&gt;click触发&lt;/button&gt;
&lt;button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="top" data-original-title="不延迟"&gt;不延迟&lt;/button&gt;
&lt;button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="top" data-original-title="延迟500ms" data-delay="500"&gt;延迟500ms&lt;/button&gt;
&lt;script&gt;
$(function(){
    $('[data-toggle="tooltip"]').tooltip();
});    
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/bootstrap/tooltip/t2.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### JS触发

&emsp;&emsp;除了上面所说的最简单的一种触发方法，也可以单独指定一个元素，在该元素上调用Tooltip组件，并且还可以提供各种javascript形式的自定义参数，而无需使用以data-开头的元素自定义属性

<div>
<pre>$(element).tooltip(options);</pre>
</div>

![bs_plug6](https://pic.xiaohuochai.site/blog/bs_plug6.jpg)

<div>
<pre>&lt;button type="button" class="btn btn-default" data-toggle="tooltip" &gt;按钮&lt;/button&gt;
&lt;script&gt;
$(function(){
    $('[data-toggle="tooltip"]').tooltip({
        title:"我是提示语",
        placement:'right'
    });
});    
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/bootstrap/tooltip/t3.html" frameborder="0" width="320" height="240"></iframe>

【关键字】

&emsp;&emsp;除了使用options对象，还可以使用关键字，'show'、'hide'、'toggle'、'destroy'

<div>
<pre>&lt;body style="margin-top:50px;"&gt;
&lt;button type="button" class="btn btn-default" data-toggle="tooltip" title="提示信息" id="btn1"&gt;按钮1&lt;/button&gt;
&lt;button type="button" class="btn btn-default" data-toggle="tooltip" title="提示信息"  id="btn2"&gt;按钮2&lt;/button&gt;
&lt;button type="button" class="btn btn-default" data-toggle="tooltip" title="提示信息"  id="btn3"&gt;按钮3&lt;/button&gt;
&lt;button type="button" class="btn btn-default" data-toggle="tooltip" title="提示信息"  id="btn4"&gt;按钮4&lt;/button&gt;
&lt;script&gt;
$(function(){
    $('#btn1').tooltip('show');//显示提示语
    $('#btn2').tooltip('hide');//关闭提示语
    $('#btn3').tooltip('toggle');//反转提示语
    $('#btn4').tooltip('destroy');//隐藏并销毁提示语
});    
&lt;/script&gt;
&lt;/body&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/bootstrap/tooltip/t4.html" frameborder="0" width="320" height="240"></iframe>

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
<pre>&lt;button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="right" title="提示信息" id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$(function(){
    $('#btn').tooltip();
    $("#btn").on("show.bs.tooltip",function(e){
        $(this).html('关闭提示');    
    }).on("hide.bs.tooltip",function(e){
        $(this).html('打开提示');
    })
});    
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/bootstrap/tooltip/t5.html" frameborder="0" width="320" height="240"></iframe>

