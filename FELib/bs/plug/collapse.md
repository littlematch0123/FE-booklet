# Bootstrap手风琴效果

&emsp;&emsp;Bootstrap 框架中 Collapse插件(折叠)其实就是我们常见的手风琴效果。当单击一个触发元素时，在另外一个可折叠区域进行显示或隐藏，再次单击时可以反转显示状态。经典的场景是多个折叠区域的手风琴风格以及单一title/content的风格，本文将详细介绍Bootstrap手风琴效果

&nbsp;

### 结构

&emsp;&emsp;手风琴最关键的部分，就是每个标题对应有一个内容，在Bootstrap框架中将这两个部分组合起来称为一个panel面板，如下边效果所示，有三个panel面板，将这三个面板组合在一起，就是一个面板组合&nbsp;panel-group，也就是手风琴的结构

![bs_plug8](https://pic.xiaohuochai.site/blog/bs_plug8.png)

&emsp;&emsp;简单点就是一个触发器和一个折叠区&nbsp;

<div>
<pre>&lt;button type="button" class="btn btn-danger" data-toggle="collapse" data-target="#demo"&gt;触发器&lt;/button&gt;
&lt;div id="demo" class="collapse in"&gt;折叠区&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;div class="panel-group" id="accordion"&gt;
    &lt;div class="panel panel-default"&gt;
        &lt;div class="panel-heading"&gt;
            &lt;h4 class="panel-title"&gt;&lt;a data-toggle="collapse" data-parent="#accordion" href="#collapseOne"&gt;标题一&lt;/a&gt;&lt;/h4&gt;
        &lt;/div&gt;
        &lt;div id="collapseOne" class="panel-collapse collapse in"&gt;
            &lt;div class="panel-body"&gt;标题一对应的内容&lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="panel panel-default"&gt;
        &lt;div class="panel-heading"&gt;
            &lt;h4 class="panel-title"&gt;&lt;a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo"&gt;标题二&lt;/a&gt;&lt;/h4&gt;
        &lt;/div&gt;
        &lt;div id="collapseTwo" class="panel-collapse collapse"&gt;
            &lt;div class="panel-body"&gt;标题二对应的内容&lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="panel panel-default"&gt;
        &lt;div class="panel-heading"&gt;
            &lt;h4 class="panel-title"&gt;&lt;a data-toggle="collapse" data-parent="#accordion" href="#collapseThree"&gt;标题三&lt;/a&gt;&lt;/h4&gt;
        &lt;/div&gt;
        &lt;div id="collapseThree" class="panel-collapse collapse"&gt;
            &lt;div class="panel-body"&gt;标题三对应的内容&lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/bootstrap/collapse/c1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 声明式触发

&emsp;&emsp;触发手风琴可以通过自定义的&nbsp;data-toggle 属性来触发。其中data-toggle值设置为&nbsp;collapse，data-target="#折叠区标识符"。接下来我们来看一个简单的示例

&emsp;&emsp;第一步：设计一个面板组合，里面有三个折叠区

<div>
<pre>&lt;div class="panel-group" id="myAccordion"&gt;
    &lt;div class="panel panel-accordion panel-default"&gt;&lt;/div&gt;
    &lt;div class="panel panel-accordion panel-default"&gt;&lt;/div&gt;
    &lt;div class="panel panel-accordion panel-default"&gt;&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

&emsp;&emsp;第二步：给面板添加内容，每个面板包括两个部分，第一个是面板标题&nbsp;panel-heading，并且在这里面添加标题&nbsp;panel-title。第二部分是面板内容，也就是折叠区，使用&nbsp;panel-collapse&nbsp;样式

<div>
<pre>&lt;div class="panel panel-accordion panel-default"&gt;
    &lt;div class="panel-heading"&gt;
        &lt;h4 class="panel-title"&gt;标题一&lt;/h4&gt;
    &lt;/div&gt;
    &lt;div class="panel-collapse"&gt;
        &lt;div class="panel-body"&gt;折叠区内容...&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

&emsp;&emsp;第三步：为了把标题和内容区捆绑在一起，可以通过锚链接的方法，把标题区域和面板区连在一起

<div>
<pre>&lt;div class="panel-group" id="myAccordion"&gt;
    &lt;div class="panel panel-accordion panel-default"&gt;
        &lt;div class="panel-heading"&gt;
            &lt;h4 class="panel-title"&gt;&lt;a href="#panel1"&gt;标题一&lt;/a&gt;&lt;/h4&gt;
        &lt;/div&gt;
        &lt;div class="panel-collapse" id="panel1"&gt;
            &lt;div class="panel-body"&gt;折叠区内容...&lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="panel panel-accordion panel-default"&gt;
        &lt;div class="panel-heading"&gt;
            &lt;h4 class="panel-title"&gt;&lt;a href="#panel2"&gt;标题二&lt;/a&gt;&lt;/h4&gt;
        &lt;/div&gt;
        &lt;div class="panel-collapse" id="panel2"&gt;
            &lt;div class="panel-body"&gt;折叠区内容...&lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    ......
&lt;/div&gt;</pre>
</div>

&emsp;&emsp;第四步：控制面板内容区是否可视。在Bootstrap框架中，如果想让内容区域不可见，只需要在 panel-collapse 样式上添加&nbsp;collapse；如果想让内容区域默认可见，则需要添加样式collapse和in

<div>
<pre>&lt;div class="panel panel-accordion panel-default"&gt;
    &lt;div class="panel-heading"&gt;
        &lt;h4 class="panel-title"&gt;&lt;a href="#panel1"&gt;标题一&lt;/a&gt;&lt;/h4&gt;
    &lt;/div&gt;
    &lt;div class="panel-collapse collapse" id="panel1"&gt;
        &lt;div class="panel-body"&gt;折叠区内容...&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

&emsp;&emsp;第五步：激活手风琴交互行为。要完成交互行为，需要在标题链接中自定义两个属性，一个是data-toggle，并且取值为collapse；另一个是data-target，取值为各个面板内容区的标识符，比如说ID，在这个例子分别是#panel1、#panel2和#panel3：

&emsp;&emsp;注意：在这个案例中不加入`data-target="#panel1"`也可以，因为前面已经有了`href="#panel1"`，但如里是button按钮作为触发器就必须使用`data-target="#panel1"`语句

<div>
<pre>&lt;div class="panel panel-accordion panel-default"&gt;
    &lt;div class="panel-heading"&gt;
        &lt;h4 class="panel-title"&gt;&lt;a href="#panel1" data-toggle="collapse" data-target="#panel1"&gt;标题一&lt;/a&gt;&lt;/h4&gt;
    &lt;/div&gt;
    &lt;div class="panel-collapse collapse in" id="panel1"&gt;
        &lt;div class="panel-body"&gt;折叠区内容...&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

&emsp;&emsp;第六步：定义data-parent属性，实现点击一个其中一个元素时，关闭所有的折叠区，再打开所单击的区域（如果所单击区域是展示的，则会关闭）。这个data-parent取值与手风琴面板容器的标识符相匹配，比如这个例子是指&nbsp;#myAccordion

<div>
<pre>&lt;div class="panel-group" id="myAccordion"&gt;
    &lt;div class="panel panel-accordion panel-default"&gt;
        &lt;div class="panel-heading"&gt;
            &lt;h4 class="panel-title"&gt;
                &lt;a href="#panel1" data-toggle="collapse" data-target="#panel1" data-parent="#myAccordion"&gt;标题一&lt;/a&gt;
            &lt;/h4&gt;
        &lt;/div&gt;
&hellip;</pre>
</div>

&emsp;&emsp;通过以上6步，可以总结出以下要点

&emsp;&emsp;☑ 使用 panel 的 panel-title 作为触发元素，使用panel-body的父元素作为折叠区；

&emsp;&emsp;☑ 使用一个 panel-group 来包含多个 panel，从而实现手风琴效果；&nbsp;

&emsp;&emsp;☑ 每个 panel 里的触发元素都要指定data-parent属性，data-parent 属性的值对应 panel-group样式元素的ID或者其他样式标识符；

&emsp;&emsp;☑ 触发元素需要指定 data-toggle，并且值为 collapse；

&emsp;&emsp;☑ 触发元素需要指定 data-target属性，&nbsp;data-target属性的值对应 panel-body 的父元素的ID或者其他样式标识符；如果是a元素，可以指定href属性替代

<div>
<pre>&lt;div class="panel-group" id="accordion"&gt;
    &lt;div class="panel panel-default"&gt;
        &lt;div class="panel-heading"&gt;
            &lt;h4 class="panel-title"&gt;&lt;a data-toggle="collapse" data-parent="#accordion" href="#panel1"&gt;标题一&lt;/a&gt;&lt;/h4&gt;
        &lt;/div&gt;
        &lt;div id="panel1" class="panel-collapse collapse in"&gt;
            &lt;div class="panel-body"&gt;折叠区内容一&lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="panel panel-default"&gt;
        &lt;div class="panel-heading"&gt;
            &lt;h4 class="panel-title"&gt;&lt;a data-toggle="collapse" data-parent="#accordion" href="#panel2"&gt;标题二&lt;/a&gt;&lt;/h4&gt;
        &lt;/div&gt;
        &lt;div id="panel2" class="panel-collapse collapse"&gt;
            &lt;div class="panel-body"&gt;折叠区内容二&lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="panel panel-default"&gt;
        &lt;div class="panel-heading"&gt;
            &lt;h4 class="panel-title"&gt;&lt;a data-toggle="collapse" data-parent="#accordion" href="#panel3"&gt;标题三&lt;/a&gt;&lt;/h4&gt;
        &lt;/div&gt;
        &lt;div id="panel3" class="panel-collapse collapse"&gt;
            &lt;div class="panel-body"&gt;折叠区内容三&lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/bootstrap/collapse/c2.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### JS触发

【关键字】

<div>
<pre>$(element).collapse('show');//显示折叠区域
$(element).collapse('hide');//隐藏折叠区域
$(element).collapse('toggle');//反转折叠区域
</pre>
</div>
<div>
<pre>&lt;button type="button" class="btn btn-default" id="btn1"&gt;显示折叠区域&lt;/button&gt;
&lt;button type="button" class="btn btn-default" id="btn2"&gt;隐藏折叠区域&lt;/button&gt;
&lt;button type="button" class="btn btn-default" id="btn3"&gt;反转折叠区域&lt;/button&gt;
&lt;div class="panel-group" id="accordion"&gt;
    &lt;div class="panel panel-default"&gt;
        &lt;div class="panel-heading"&gt;
            &lt;h4 class="panel-title"&gt;&lt;a data-toggle="collapse" data-parent="#accordion" href="#panel1"&gt;标题一&lt;/a&gt;&lt;/h4&gt;
        &lt;/div&gt;
        &lt;div id="panel1" class="panel-collapse collapse in"&gt;
            &lt;div class="panel-body"&gt;折叠区内容一&lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="panel panel-default"&gt;
        &lt;div class="panel-heading"&gt;
            &lt;h4 class="panel-title"&gt;&lt;a data-toggle="collapse" data-parent="#accordion" href="#panel2"&gt;标题二&lt;/a&gt;&lt;/h4&gt;
        &lt;/div&gt;
        &lt;div id="panel2" class="panel-collapse collapse"&gt;
            &lt;div class="panel-body"&gt;折叠区内容二&lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="panel panel-default"&gt;
        &lt;div class="panel-heading"&gt;
            &lt;h4 class="panel-title"&gt;&lt;a data-toggle="collapse" data-parent="#accordion" href="#panel3"&gt;标题三&lt;/a&gt;&lt;/h4&gt;
        &lt;/div&gt;
        &lt;div id="panel3" class="panel-collapse collapse"&gt;
            &lt;div class="panel-body"&gt;折叠区内容三&lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
&lt;script&gt;
$(function(){
    $('#btn1').click(function(){
        $('.collapse').collapse('show');
    })
    $('#btn2').click(function(){
        $('.collapse').collapse('hide');
    })
    $('#btn3').click(function(){
        $('.collapse').collapse('toggle');
    })
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 344px;" src="https://demo.xiaohuochai.site/bootstrap/collapse/c3.html" frameborder="0" width="320" height="240"></iframe>

【事件】

&emsp;&emsp;该插件支持4种类型的事件订阅&nbsp;

<div>
<pre>show.bs.collapse        show方法调用之后立即触发该事件
shown.bs.collapse   &emsp;&emsp; 此事件在collapse已经显示出来（并且同时在 CSS 过渡效果完成）之后被触发
hide.bs.collapse        hide方法调用之后立即触发该事件。
hidden.bs.collapse    　此事件在collapse被隐藏（并且同时在 CSS 过渡效果完成）之后被触发</pre>
</div>
<div>
<pre>&lt;div class="panel-group" id="accordion"&gt;
    &lt;div class="panel panel-default"&gt;
        &lt;div class="panel-heading"&gt;
            &lt;h4 class="panel-title"&gt;&lt;a data-toggle="collapse" data-parent="#accordion" data-html="标题一" href="#panel1"&gt;标题一&lt;/a&gt;&lt;/h4&gt;
        &lt;/div&gt;
        &lt;div id="panel1" class="panel-collapse collapse in"&gt;
            &lt;div class="panel-body"&gt;折叠区内容一&lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="panel panel-default"&gt;
        &lt;div class="panel-heading"&gt;
            &lt;h4 class="panel-title"&gt;&lt;a data-toggle="collapse" data-parent="#accordion" data-html="标题二" href="#panel2"&gt;标题二&lt;/a&gt;&lt;/h4&gt;
        &lt;/div&gt;
        &lt;div id="panel2" class="panel-collapse collapse"&gt;
            &lt;div class="panel-body"&gt;折叠区内容二&lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="panel panel-default"&gt;
        &lt;div class="panel-heading"&gt;
            &lt;h4 class="panel-title"&gt;&lt;a data-toggle="collapse" data-parent="#accordion" data-html="标题三" href="#panel3"&gt;标题三&lt;/a&gt;&lt;/h4&gt;
        &lt;/div&gt;
        &lt;div id="panel3" class="panel-collapse collapse"&gt;
            &lt;div class="panel-body"&gt;折叠区内容三&lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
&lt;script&gt;
$(function(){
    $("#accordion").on("show.bs.collapse",function(e){
        var $element = $(e.target).siblings().first().find('a');
        $element.html($element.data('html') + '[折叠区已打开]');
    }).on("hide.bs.collapse",function(e){
        var $element = $(e.target).siblings().first().find('a');
        $element.html($element.data('html') + '[折叠区已关闭]');
    })

});    
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/bootstrap/collapse/c4.html" frameborder="0" width="320" height="240"></iframe>

