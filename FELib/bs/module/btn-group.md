# Bootstrap按钮组

&emsp;&emsp;单个按钮在Web页面中的运用有时候并不能满足我们的业务需求，常常会看到将多个按钮组合在一起使用，比如富文本编辑器里的一组小图标按钮等。本文将详细介绍Bootstrap按钮组

&nbsp;

### 使用方法

&emsp;&emsp;按钮组和下拉菜单组件一样，需要依赖于button.js插件才能正常运行。不过我们同样可以直接只调用bootstrap.js文件。因为这个文件已集成了button.js插件功能

&emsp;&emsp;同样地，因为Bootstrap的组件交互效果都是依赖于jQuery库写的插件，所以在使用bootstrap.js之前一定要先加载jquery.js才会产生效果

<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;title&gt;Document&lt;/title&gt;
&lt;link href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>

&nbsp;

### 基本用法

&emsp;&emsp;按钮组结构非常的简单。使用一个名为&ldquo;btn-group&rdquo;的容器，把多个按钮放到这个容器中

&emsp;&emsp;为了向屏幕阅读器的用户传达正确的按钮分组，需要提供一个合适的&nbsp;`role`&nbsp;属性。对于按钮组合，应该是&nbsp;`role="group"`，对于toolbar（工具栏）应该是&nbsp;`role="toolbar"`

&emsp;&emsp;此外，按钮组和工具栏应给定一个明确的label标签，尽管设置了正确的&nbsp;`role`&nbsp;属性，但是大多数辅助技术将不会正确的识读他们。可以使用&nbsp;`aria-label`，也可以使用aria-labelledby

&emsp;&emsp;除了可以使用&lt;button&gt;元素之外，还可以使用其他标签元素，比如&lt;a&gt;标签。唯一要保证的是：不管使用什么标签，&ldquo;.btn-group&rdquo;容器里的标签元素需要带有类名&ldquo;.btn&rdquo;

<div>
<pre>&lt;div class="btn-group"&gt;
    &lt;button type="button" class="btn btn-default"&gt;&lt;span class="glyphicon glyphicon-step-backward"&gt;&lt;/span&gt;&lt;/button&gt;
    &lt;button type="button" class="btn btn-default"&gt;&lt;span class="glyphicon glyphicon-fast-backward"&gt;&lt;/span&gt;&lt;/button&gt;
    &lt;button type="button" class="btn btn-default"&gt;&lt;span class="glyphicon glyphicon-backward"&gt;&lt;/span&gt;&lt;/button&gt;
    &lt;button type="button" class="btn btn-default"&gt;&lt;span class="glyphicon glyphicon-play"&gt;&lt;/span&gt;&lt;/button&gt;
    &lt;button type="button" class="btn btn-default"&gt;&lt;span class="glyphicon glyphicon-pause"&gt;&lt;/span&gt;&lt;/button&gt;
    &lt;button type="button" class="btn btn-default"&gt;&lt;span class="glyphicon glyphicon-stop"&gt;&lt;/span&gt;&lt;/button&gt;
    &lt;button type="button" class="btn btn-default"&gt;&lt;span class="glyphicon glyphicon-forward "&gt;&lt;/span&gt;&lt;/button&gt;
    &lt;button type="button" class="btn btn-default"&gt;&lt;span class="glyphicon glyphicon-fast-forward"&gt;&lt;/span&gt;&lt;/button&gt;
    &lt;button type="button" class="btn btn-default"&gt;&lt;span class="glyphicon glyphicon-step-forward"&gt;&lt;/span&gt;&lt;/button&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/bootstrap/btngroup/b1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 按钮工具栏

&emsp;&emsp;在富文本编辑器中，将按钮组分组排列在一起，比如说复制、剪切和粘贴一组；左对齐、中间对齐、右对齐和两端对齐一组。Bootstrap框架按钮工具栏也提供了这样的制作方法，只需要将按钮组&ldquo;btn-group&rdquo;按组放在一个大的容器&ldquo;btn-toolbar&rdquo;中

<div>
<pre>&lt;div class="btn-toolbar"&gt;
  &lt;div class="btn-group"&gt;
    &lt;button type="button" class="btn btn-default"&gt;&lt;span class="glyphicon glyphicon-align-left"&gt;&lt;/span&gt;&lt;/button&gt;
    &lt;button type="button" class="btn btn-default"&gt;&lt;span class="glyphicon glyphicon-align-center"&gt;&lt;/span&gt;&lt;/button&gt;
    &lt;button type="button" class="btn btn-default"&gt;&lt;span class="glyphicon glyphicon-align-right"&gt;&lt;/span&gt;&lt;/button&gt;
    &lt;button type="button" class="btn btn-default"&gt;&lt;span class="glyphicon glyphicon-align-justify"&gt;&lt;/span&gt;&lt;/button&gt;
  &lt;/div&gt;
  &lt;div class="btn-group"&gt;
    &lt;button type="button" class="btn btn-default"&gt;&lt;span class="glyphicon glyphicon-indent-left"&gt;&lt;/span&gt;&lt;/button&gt;
    &lt;button type="button" class="btn btn-default"&gt;&lt;span class="glyphicon glyphicon-indent-right"&gt;&lt;/span&gt;&lt;/button&gt;
  &lt;/div&gt;
  &lt;div class="btn-group"&gt;
    &lt;button type="button" class="btn btn-default"&gt;&lt;span class="glyphicon glyphicon-font"&gt;&lt;/span&gt;&lt;/button&gt;
    &lt;button type="button" class="btn btn-default"&gt;&lt;span class="glyphicon glyphicon-bold"&gt;&lt;/span&gt;&lt;/button&gt;
    &lt;button type="button" class="btn btn-default"&gt;&lt;span class="glyphicon glyphicon-italic"&gt;&lt;/span&gt;&lt;/button&gt;
  &lt;/div&gt;
  &lt;div class="btn-group"&gt;
    &lt;button type="button" class="btn btn-default"&gt;&lt;span class="glyphicon glyphicon-text-height"&gt;&lt;/span&gt;&lt;/button&gt;
    &lt;button type="button" class="btn btn-default"&gt;&lt;span class="glyphicon glyphicon-text-width"&gt;&lt;/span&gt;&lt;/button&gt;
  &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/bootstrap/btngroup/b2.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 按钮尺寸

&emsp;&emsp;在介绍[表单按钮的博文](http://www.cnblogs.com/xiaohuochai/p/7068087.html#anchor7)中，我们知道按钮是通过btn-lg、btn-sm和btn-xs三个类名来调整padding、font-size、line-height和border-radius属性值来改变按钮大小。那么按钮组的大小，我们也可以通过类似的方法：

&nbsp;&emsp;&emsp; ☑&nbsp; .btn-group-lg:大按钮组

&nbsp;&emsp;&emsp; ☑&nbsp; .btn-group-sm:小按钮组

&nbsp;&emsp;&emsp; ☑&nbsp; .btn-group-xs:超小按钮组

&emsp;&emsp;只需要在&ldquo;.btn-group&rdquo;类名上追加对应的类名，就可以得到不同大小的按钮组

<div>
<pre>&lt;div class="btn-group btn-group-lg"&gt;
  &lt;button type="button" class="btn btn-default"&gt;1&lt;/button&gt;
  &lt;button type="button" class="btn btn-default"&gt;2&lt;/button&gt;
  &lt;button type="button" class="btn btn-default"&gt;3&lt;/button&gt;
&lt;/div&gt;
&lt;div class="btn-group"&gt;
  &lt;button type="button" class="btn btn-default"&gt;1&lt;/button&gt;
  &lt;button type="button" class="btn btn-default"&gt;2&lt;/button&gt;
  &lt;button type="button" class="btn btn-default"&gt;3&lt;/button&gt;
&lt;/div&gt;
&lt;div class="btn-group btn-group-sm"&gt;
  &lt;button type="button" class="btn btn-default"&gt;1&lt;/button&gt;
  &lt;button type="button" class="btn btn-default"&gt;2&lt;/button&gt;
  &lt;button type="button" class="btn btn-default"&gt;3&lt;/button&gt;
&lt;/div&gt;
&lt;div class="btn-group btn-group-xs"&gt;
  &lt;button type="button" class="btn btn-default"&gt;1&lt;/button&gt;
  &lt;button type="button" class="btn btn-default"&gt;2&lt;/button&gt;
  &lt;button type="button" class="btn btn-default"&gt;3&lt;/button&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 70px;" src="https://demo.xiaohuochai.site/bootstrap/btngroup/b3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 嵌套分组

&emsp;&emsp;很多时候，我们常把下拉菜单和普通的按钮组排列在一起，实现类似于导航菜单的效果。使用的时候，只需要把当初制作下拉菜单的&ldquo;dropdown&rdquo;的容器换成&ldquo;btn-group&rdquo;，并且和普通的按钮放在同一级

<div>
<pre>&lt;div class="btn-group"&gt;
  &lt;button class="btn btn-default" type="button"&gt;首页&lt;/button&gt;
  &lt;button class="btn btn-default" type="button"&gt;产品展示&lt;/button&gt;
  &lt;button class="btn btn-default" type="button"&gt;案例分析&lt;/button&gt;
  &lt;button class="btn btn-default" type="button"&gt;联系我们&lt;/button&gt;
  &lt;div class="btn-group"&gt;
      &lt;button class="btn btn-default dropdown-toggle" data-toggle="dropdown" type="button"&gt;关于我们 &lt;span class="caret"&gt;&lt;/span&gt;&lt;/button&gt;
    &lt;ul class="dropdown-menu"&gt;
        &lt;li&gt;&lt;a href="##"&gt;公司简介&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="##"&gt;企业文化&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="##"&gt;组织结构&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="##"&gt;客服服务&lt;/a&gt;&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/bootstrap/btngroup/b4.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 垂直排列

&emsp;&emsp;默认地，按钮组都是水平显示的。但在实际运用当中，总会碰到垂直显示的效果。在Bootstrap框架中也提供了这样的风格。只需要把水平分组的&ldquo;btn-group&rdquo;类名换成&ldquo;btn-group-vertical&rdquo;即可

<div>
<pre>&lt;div class="btn-group-vertical"&gt;
  &lt;button class="btn btn-default" type="button"&gt;首页&lt;/button&gt;
  &lt;button class="btn btn-default" type="button"&gt;产品展示&lt;/button&gt;
  &lt;button class="btn btn-default" type="button"&gt;案例分析&lt;/button&gt;
  &lt;button class="btn btn-default" type="button"&gt;联系我们&lt;/button&gt;
  &lt;div class="btn-group"&gt;
      &lt;button class="btn btn-default dropdown-toggle" data-toggle="dropdown" type="button"&gt;关于我们&lt;span class="caret"&gt;&lt;/span&gt;&lt;/button&gt;
    &lt;ul class="dropdown-menu"&gt;
        &lt;li&gt;&lt;a href="##"&gt;公司简介&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="##"&gt;企业文化&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="##"&gt;组织结构&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="##"&gt;客服服务&lt;/a&gt;&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/bootstrap/btngroup/b5.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 等分按钮

&emsp;&emsp;等分按钮的效果在移动端上特别的实用。整个按钮组宽度是容器的100%，而按钮组里面的每个按钮平分整个容器宽度。例如，如果按钮组里面有五个按钮，那么每个按钮是20%的宽度，如果有四个按钮，那么每个按钮是25%宽度，以此类推

&emsp;&emsp;等分按钮也常被称为是自适应分组按钮，其实现方法也非常的简单，只需要在按钮组&ldquo;btn-group&rdquo;上追加一个&ldquo;btn-group-justified&rdquo;类名

&emsp;&emsp;实现原理非常简单，把&ldquo;btn-group-justified&rdquo;模拟成表格（display:table），而且把里面的按钮模拟成表格单元格（display:table-cell）

&emsp;&emsp;注意：在制作等分按钮组时，尽量使用&lt;a&gt;标签元素来制作按钮，因为使用&lt;button&gt;标签元素时，使用display:table在部分浏览器下支持并不友好

<div>
<pre>.btn-group-justified {
  display: table;
  width: 100%;
  table-layout: fixed;
  border-collapse: separate;
}
.btn-group-justified &gt; .btn,
.btn-group-justified &gt; .btn-group {
  display: table-cell;
  float: none;
  width: 1%;
}
.btn-group-justified &gt; .btn-group .btn {
  width: 100%;
}</pre>
</div>

&emsp;&emsp;在上面的代码中，.btn-group-justified &gt; .btn设置了table-cell，而table-cell是不能设置margin的，而代码中设置了-margin值，用来去除边框，显然不会生效。因此，去除重复边框的代码应该是合并表格边框&mdash;&mdash;&nbsp;border-collapse: collapse

<div>
<pre>&lt;div class="btn-group btn-group-justified"&gt;
    &lt;a class="btn btn-default" href="#"&gt;首页&lt;/a&gt;
    &lt;a class="btn btn-default" href="#"&gt;产品展示&lt;/a&gt;
    &lt;a class="btn btn-default" href="#"&gt;案例分析&lt;/a&gt;
    &lt;a class="btn btn-default" href="#"&gt;联系我们&lt;/a&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/bootstrap/btngroup/b6.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;为了将&nbsp;&lt;button&gt;&nbsp;元素用于两端对齐的按钮组中，<span class="text-danger">必须将每个按钮包裹进一个按钮组中。因为大部分的浏览器不能将CSS 应用到对齐的&nbsp;&lt;button&gt;&nbsp;元素上，但是，可以用按钮式下拉菜单来解决这个问题

<div>
<pre>&lt;div class="btn-group btn-group-justified"&gt;
    &lt;div class="btn-group" role="group"&gt;
        &lt;button class="btn btn-default" &gt;首页&lt;/button&gt;
    &lt;/div&gt;    
    &lt;div class="btn-group" role="group"&gt;
        &lt;button class="btn btn-default" &gt;产品展示&lt;/button&gt;
    &lt;/div&gt;    
    &lt;div class="btn-group" role="group"&gt;
        &lt;button class="btn btn-default" &gt;案例分析&lt;/button&gt;
    &lt;/div&gt;    
    &lt;div class="btn-group" role="group"&gt;
        &lt;button class="btn btn-default" &gt;联系我们&lt;/button&gt;
    &lt;/div&gt;    
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/bootstrap/btngroup/b7.html" frameborder="0" width="320" height="240"></iframe>

