# Bootstrap按钮式下拉菜单

&emsp;&emsp;按钮式下拉菜单仅从外观上看，和[下拉菜单](http://www.cnblogs.com/xiaohuochai/p/7106649.html)效果基本上是一样的。不同的是普通的下拉菜单是block元素，而按钮式下拉菜单是inline-block元素。本文将详细介绍Bootstrap按钮式下拉菜单

&nbsp;

### 概述

&emsp;&emsp;按钮式下拉菜单其实就是普通的下拉菜单，唯一不同的是外部容器&ldquo;div.dropdown&rdquo;换成了&ldquo;div.btn-group&rdquo;，display从block换成了inline-block

<div>
<pre>&lt;div class="btn-group"&gt;
  &lt;button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"&gt;
    按钮式下拉菜单 &lt;span class="caret"&gt;&lt;/span&gt;
  &lt;/button&gt;
  &lt;ul class="dropdown-menu"&gt;
    &lt;li&gt;&lt;a href="#"&gt;Action&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;Another action&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;Something else here&lt;/a&gt;&lt;/li&gt;
    &lt;li role="separator" class="divider"&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;Separated link&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/div&gt;
&lt;div class="dropdown"&gt;
  &lt;button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"&gt;
    普通下拉菜单 &lt;span class="caret"&gt;&lt;/span&gt;
  &lt;/button&gt;
  &lt;ul class="dropdown-menu"&gt;
    &lt;li&gt;&lt;a href="#"&gt;Action&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;Another action&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;Something else here&lt;/a&gt;&lt;/li&gt;
    &lt;li role="separator" class="divider"&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;Separated link&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 210px;" src="https://demo.xiaohuochai.site/bootstrap/btndropdown/b1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 向上弹出

&emsp;&emsp;有些菜单是需要向上弹出的，比如，菜单在页面最底部，而这个菜单正好有一个下拉菜单，为了让用户有更好的体验，不得不让下拉菜单向上弹出。在Bootstrap框架中专门为这种效果提代了一个类名&ldquo;dropup&rdquo;，只需要在&ldquo;btn-group&rdquo;上添加这个类名即可

【三角形】

&emsp;&emsp;按钮默认向下的三角形，是通过在&lt;button&gt;标签中添加一个&ldquo;&lt;span&gt;&rdquo;标签元素，并且命名为&ldquo;caret&rdquo;

<div>
<pre>&lt;button class="btn btn-default dropdown-toggle" data-toggle="dropdown" type="button"&gt;
&emsp;&emsp;按钮下拉菜单
&emsp;&emsp;&lt;span class="caret"&gt;&lt;/span&gt;
&lt;/button&gt;</pre>
</div>

&emsp;&emsp;这个三角形完全是通过CSS代码来实现的

<div>
<pre>.caret {
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 2px;
  vertical-align: middle;
  border-top: 4px solid;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
}</pre>
</div>

&emsp;&emsp;另外在按钮中的三角形&ldquo;caret&rdquo;做了一定的样式处理：

<div>
<pre>.btn .caret {
  margin-left: 0;
}
.btn-lg .caret {
  border-width: 5px 5px 0;
  border-bottom-width: 0;
}
.dropup .btn-lg .caret {
  border-width: 0 5px 5px;
}</pre>
</div>

&emsp;&emsp;如果三角方向需要朝上显示，需要在&ldquo;.btn-group&rdquo;类上追加&ldquo;dropup&rdquo;类名，可以看出，向上三角与向下三角的区别：其实就是改变了一个border-bottom的值

<div>
<pre>.dropup .caret,
.navbar-fixed-bottom .dropdown .caret {
  content: "";
  border-top: 0;
  border-bottom: 4px solid;
}</pre>
</div>
<div>
<pre>&lt;div class="btn-group dropup" style="margin-top:140px"&gt;
    &lt;button class="btn btn-default dropdown-toggle" data-toggle="dropdown" type="button"&gt;按钮下拉菜单&lt;span class="caret"&gt;&lt;/span&gt;&lt;/button&gt;
    &lt;ul class="dropdown-menu"&gt;
        &lt;li&gt;&lt;a href="##"&gt;按钮下拉菜单项&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="##"&gt;按钮下拉菜单项&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="##"&gt;按钮下拉菜单项&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="##"&gt;按钮下拉菜单项&lt;/a&gt;&lt;/li&gt;
    &lt;/ul&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/bootstrap/btndropdown/b2.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 分裂式

&emsp;&emsp;分裂式按钮下拉菜单其实就是人为地将按钮和三角割裂开，使得最终多一个分开的按钮而已

<div>
<pre>&lt;div class="btn-group"&gt;
  &lt;button type="button" class="btn"&gt;Action&lt;/button&gt;
  &lt;button type="button" class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"&gt;
    &lt;span class="caret"&gt;&lt;/span&gt;
  &lt;/button&gt;
  &lt;ul class="dropdown-menu"&gt;
    &lt;li&gt;&lt;a href="#"&gt;Action&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;Another action&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;Something else here&lt;/a&gt;&lt;/li&gt;
    &lt;li role="separator" class="divider"&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;Separated link&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/bootstrap/btndropdown/b3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 尺寸

&emsp;&emsp;按钮式下拉菜单适用所有尺寸按钮，包括btn-xs、btn-lg、btn-sm等，当然普通下拉列表也支持改变按钮尺寸

<div>
<pre>&lt;div class="btn-group"&gt;
  &lt;button class="btn btn-default btn-xs dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"&gt;
    Extra small button &lt;span class="caret"&gt;&lt;/span&gt;
  &lt;/button&gt;
  &lt;ul class="dropdown-menu"&gt;
    &lt;li&gt;&lt;a href="#"&gt;Action&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;Another action&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;Something else here&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/div&gt;
&lt;div class="btn-group"&gt;
  &lt;button class="btn btn-default btn-lg dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"&gt;
    Large button &lt;span class="caret"&gt;&lt;/span&gt;
  &lt;/button&gt;
  &lt;ul class="dropdown-menu"&gt;
    &lt;li&gt;&lt;a href="#"&gt;Action&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;Another action&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;Something else here&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/div&gt;
&lt;div class="btn-group"&gt;
  &lt;button class="btn btn-default btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"&gt;
    small button &lt;span class="caret"&gt;&lt;/span&gt;
  &lt;/button&gt;
  &lt;ul class="dropdown-menu"&gt;
    &lt;li&gt;&lt;a href="#"&gt;Action&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;Another action&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;Something else here&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 160px;" src="https://demo.xiaohuochai.site/bootstrap/btndropdown/b4.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

## 最后

&emsp;&emsp;针对普通下拉列表的一些[扩展用法](http://www.cnblogs.com/xiaohuochai/p/7106649.html#anchor4)，如分隔线、分隔线、对齐方式、菜单项状态等，按钮式下拉菜单也支持。所以，个人对bootstrap设置按钮式下拉菜单组件觉得有点多余，仅仅是block和inline-block的区别，而在功能上却没有什么区分

