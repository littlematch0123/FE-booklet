# Bootstrap面板

&emsp;&emsp;面板（Panels）是Bootstrap框架新增的一个组件，某些时候可能需要将某些 DOM 内容放到一个盒子里。对于这种情况，可以使用面板组件。本文将详细介绍Bootstrap面板

&nbsp;

### 基础面板

&emsp;&emsp;基础面板非常简单，就是一个div容器运用了&ldquo;panel&rdquo;样式，产生一个具有边框的文本显示块，另外在里面添加了一个&ldquo;div.panel-body&rdquo;来放置面板主体内容

<div>
<pre>.panel {
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
          box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
}
.panel-body {
  padding: 15px;
}</pre>
</div>
<div>
<pre>&lt;div class="panel"&gt;
    &lt;div class="panel-body"&gt;我是一个基础面板&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 72px;" src="https://demo.xiaohuochai.site/bootstrap/panel/p1.html" frameborder="0" width="320" height="240"></iframe>

【部件】

&emsp;&emsp;基础面板看上去太简单了，Bootstrap为了丰富面板的功能，特意为面板增加&ldquo;面板头部&rdquo;和&ldquo;页面尾部&rdquo;的效果：

&emsp;&emsp;☑&nbsp;&nbsp;panel-heading：用来设置面板头部样式

&emsp;&emsp;☑&nbsp;panel-footer：用来设置面板尾部样式

&emsp;&emsp;panel-heading和panel-footer也仅仅间距和圆角等样式进行了设置

<div>
<pre>.panel-heading {
  padding: 10px 15px;
  border-bottom: 1px solid transparent;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
.panel-heading &gt; .dropdown .dropdown-toggle {
  color: inherit;
}
.panel-title {
  margin-top: 0;
  margin-bottom: 0;
  font-size: 16px;
  color: inherit;
}
.panel-title &gt; a {
  color: inherit;
}
.panel-footer {
  padding: 10px 15px;
  background-color: #f5f5f5;
  border-top: 1px solid #ddd;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
}</pre>
</div>
<div>
<pre>&lt;div class="panel"&gt;
    &lt;div class="panel-heading"&gt;小火柴的蓝色理想&lt;/div&gt;
    &lt;div class="panel-body"&gt;前端学习博客&lt;/div&gt;
    &lt;div class="panel-footer"&gt;作者：小火柴&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 154px;" src="https://demo.xiaohuochai.site/bootstrap/panel/p2.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 彩色面板

&emsp;&emsp;panel样式并没有对主题进行样式设置，而主题样式是通过panel-default来设置。在Bootstrap框架中面板组件除了默认的主题样式之外，还包括以下几种主题样式，构成了一个彩色面板：

&emsp;&emsp;☑&nbsp;&nbsp;panel-primary：重点蓝

&emsp;&emsp;☑&nbsp;&nbsp;panel-success：成功绿

&emsp;&emsp;☑&nbsp;panel-info:信息蓝

&emsp;&emsp;☑&nbsp;panel-warning：警告黄

&emsp;&emsp;☑&nbsp;panel-danger：危险红

&emsp;&emsp;使用方法很简单，只需要在panel的类名基础上增加自己需要的类名

<div>
<pre>&lt;div class="panel"&gt;
    &lt;div class="panel-heading"&gt;小火柴的蓝色理想&lt;/div&gt;
    &lt;div class="panel-body"&gt;前端学习博客&lt;/div&gt;
    &lt;div class="panel-footer"&gt;作者：小火柴&lt;/div&gt;
&lt;/div&gt;
&lt;div class="panel panel-default"&gt;
    &lt;div class="panel-heading"&gt;小火柴的蓝色理想&lt;/div&gt;
    &lt;div class="panel-body"&gt;前端学习博客&lt;/div&gt;
    &lt;div class="panel-footer"&gt;作者：小火柴&lt;/div&gt;
&lt;/div&gt;
&lt;div class="panel panel-primary"&gt;
    &lt;div class="panel-heading"&gt;小火柴的蓝色理想&lt;/div&gt;
    &lt;div class="panel-body"&gt;前端学习博客&lt;/div&gt;
    &lt;div class="panel-footer"&gt;作者：小火柴&lt;/div&gt;
&lt;/div&gt;
&lt;div class="panel panel-success"&gt;
    &lt;div class="panel-heading"&gt;小火柴的蓝色理想&lt;/div&gt;
    &lt;div class="panel-body"&gt;前端学习博客&lt;/div&gt;
    &lt;div class="panel-footer"&gt;作者：小火柴&lt;/div&gt;
&lt;/div&gt;
&lt;div class="panel panel-info"&gt;
    &lt;div class="panel-heading"&gt;小火柴的蓝色理想&lt;/div&gt;
    &lt;div class="panel-body"&gt;前端学习博客&lt;/div&gt;
    &lt;div class="panel-footer"&gt;作者：小火柴&lt;/div&gt;
&lt;/div&gt;
&lt;div class="panel panel-warning"&gt;
    &lt;div class="panel-heading"&gt;小火柴的蓝色理想&lt;/div&gt;
    &lt;div class="panel-body"&gt;前端学习博客&lt;/div&gt;
    &lt;div class="panel-footer"&gt;作者：小火柴&lt;/div&gt;
&lt;/div&gt;
&lt;div class="panel panel-danger"&gt;
    &lt;div class="panel-heading"&gt;小火柴的蓝色理想&lt;/div&gt;
    &lt;div class="panel-body"&gt;前端学习博客&lt;/div&gt;
    &lt;div class="panel-footer"&gt;作者：小火柴&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 1078px;" src="https://demo.xiaohuochai.site/bootstrap/panel/p3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 表格嵌套

&emsp;&emsp;一般情况下可以把面板理解为一个区域，在使用面板的时候，都会在panel-body放置需要的内容，可能是图片、表格或者列表等

&emsp;&emsp;为面板中不需要边框的表格添加&nbsp;`.table`&nbsp;类，使整个面板看上去更像是一个整体设计。如果是带有&nbsp;`.panel-body`&nbsp;的面板，我们为表格的上方添加一个边框，看上去有分隔效果

<div>
<pre>&lt;div class="panel panel-default"&gt;
    &lt;div class="panel-heading"&gt;小火柴的蓝色理想&lt;/div&gt;
    &lt;div class="panel-body"&gt;
        &lt;p&gt;前端学习博客&lt;/p&gt;
    &lt;/div&gt;
    &lt;table class="table"&gt;
    &lt;thead&gt;
      &lt;tr&gt;
        &lt;th&gt;#&lt;/th&gt;
        &lt;th&gt;名称&lt;/th&gt;
        &lt;th&gt;博客数量&lt;/th&gt;
        &lt;th&gt;难度&lt;/th&gt;
      &lt;/tr&gt;
    &lt;/thead&gt;
    &lt;tbody&gt;
      &lt;tr&gt;
        &lt;th scope="row"&gt;1&lt;/th&gt;
        &lt;td&gt;HTML&lt;/td&gt;
        &lt;td&gt;30&lt;/td&gt;
        &lt;td&gt;较难&lt;/td&gt;
      &lt;/tr&gt;
      &lt;tr&gt;
        &lt;th scope="row"&gt;2&lt;/th&gt;
        &lt;td&gt;CSS&lt;/td&gt;
        &lt;td&gt;60&lt;/td&gt;
        &lt;td&gt;较难&lt;/td&gt;
      &lt;/tr&gt;
      &lt;tr&gt;
        &lt;th scope="row"&gt;3&lt;/th&gt;
        &lt;td&gt;javascript&lt;/td&gt;
        &lt;td&gt;200&lt;/td&gt;
        &lt;td&gt;很难&lt;/td&gt;
      &lt;/tr&gt;
    &lt;/tbody&gt;
    &lt;/table&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 272px;" src="https://demo.xiaohuochai.site/bootstrap/panel/p4.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;如果没有&nbsp;`.panel-body`&nbsp;，面版标题会和表格连接起来，没有空隙&nbsp;

<iframe style="width: 100%; height: 211px;" src="https://demo.xiaohuochai.site/bootstrap/panel/p5.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 列表组嵌套

&emsp;&emsp;可以简单地在任何面板中加入具有最大宽度的列表组

<div>
<pre>&lt;div class="panel panel-default"&gt;
    &lt;div class="panel-heading"&gt;小火柴的蓝色理想&lt;/div&gt;
    &lt;div class="panel-body"&gt;
        &lt;p&gt;前端学习博客&lt;/p&gt;
    &lt;/div&gt;
    &lt;ul class="list-group"&gt;
        &lt;li class="list-group-item"&gt;HTML&lt;/li&gt;
        &lt;li class="list-group-item"&gt;CSS&lt;/li&gt;
        &lt;li class="list-group-item" &gt;javascript&lt;/li&gt;
        &lt;li class="list-group-item"&gt;bootstrap&lt;/li&gt;
        &lt;li class="list-group-item"&gt;jquery&lt;/li&gt;
    &lt;/ul&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 328px;" src="https://demo.xiaohuochai.site/bootstrap/panel/p6.html" frameborder="0" width="320" height="240"></iframe>

