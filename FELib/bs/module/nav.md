# Bootstrap导航

&emsp;&emsp;导航对于一位前端人员来说并不陌生。可以说导航是一个网站重要的元素组件之一，便于用户查找网站所提供的各项功能服务。本文将详细介绍Bootstrap导航

&nbsp;

### 基础样式

&emsp;&emsp;Bootstrap框架中制作导航条主要通过&ldquo;.nav&rdquo;样式。默认的&ldquo;.nav&rdquo;样式不提供默认的导航样式，必须附加另外一个样式才会有效，比如&ldquo;nav-tabs&rdquo;、&ldquo;nav-pills&rdquo;之类

&emsp;&emsp;如果在使用导航组件实现导航条功能，务必在&nbsp;&lt;ul&gt;&nbsp;的最外侧的逻辑父元素上添加&nbsp;`role="navigation"`&nbsp;属性，或者用一个&nbsp;&lt;nav&gt;&nbsp;元素包裹整个导航组件。不要将 role 属性添加到&nbsp;&lt;ul&gt;&nbsp;上，因为这样可以被辅助设备（残疾人用的）上被识别为一个真正的列表

<div>
<pre>.nav {
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}
.nav&gt; li {
  position: relative;
  display: block;
}
.nav&gt; li &gt; a {
  position: relative;
  display: block;
  padding: 10px 15px;
}
.nav&gt; li &gt;a:hover,
.nav&gt; li &gt;a:focus {
  text-decoration: none;
  background-color: #eee;
}
.nav&gt;li.disabled&gt; a {
  color: #999;
}
.nav&gt;li.disabled&gt;a:hover,
.nav&gt;li.disabled&gt;a:focus {
  color: #999;
  text-decoration: none;
  cursor: not-allowed;
  background-color: transparent;
}
.nav .open &gt; a,
.nav .open &gt;a:hover,
.nav .open &gt;a:focus {
  background-color: #eee;
  border-color: #428bca;
}
.nav .nav-divider {
  height: 1px;
  margin: 9px 0;
  overflow: hidden;
  background-color: #e5e5e5;
}
.nav&gt; li &gt; a &gt;img {
  max-width: none;
}</pre>
</div>
<div>
<pre>&lt;ul class="nav"&gt;
  &lt;li&gt;&lt;a href="#"&gt;Home&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href="#"&gt;Profile&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href="#"&gt;Messages&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;</pre>
</div>

<iframe style="width: 100%; height: 150px;" src="https://demo.xiaohuochai.site/bootstrap/nav/n1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 选项卡

&emsp;&emsp;标签形导航，也称为选项卡导航。特别是在很多内容分块显示的时，使用这种选项卡来分组十分适合。标签形导航是通过&ldquo;nav-tabs&rdquo;样式来实现。在制作标签形导航时需要在原导航&ldquo;nav&rdquo;上追加此类名

&emsp;&emsp;实现原理非常的简单，将菜单项（li）按块显示，并且让他们在同一水平上排列，然后定义非高亮菜单的样式和鼠标悬浮效果

&emsp;&emsp;一般情况下，选项卡会有一个当前选中项。其实在Bootstrap框架也相应提供了，只需要在其标签上添加类名"active"。除了当前项之外，有的选项卡还带有禁用状态，实现这样的效果，只需要在标签项上添加类名"disabled"

<div>
<pre>&lt;ul class="nav nav-tabs"&gt;
    &lt;li class="active"&gt;&lt;a href="##"&gt;Home&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="##"&gt;CSS3&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="##"&gt;Sass&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="##"&gt;jQuery&lt;/a&gt;&lt;/li&gt;
    &lt;li class="disabled"&gt;&lt;a href="##"&gt;Responsive&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;</pre>
</div>

<iframe style="width: 100%; height: 72px;" src="https://demo.xiaohuochai.site/bootstrap/nav/n2.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 胶囊导航

&emsp;&emsp;胶囊形（pills）导航听起来有点别扭，因为其外形看起来有点像胶囊形状。但其更像我们平时看到的大众形导航。当前项高亮显示，并带有圆角效果。其实现方法和&ldquo;nav-tabs&rdquo;类似，同样的结构，只需要把类名&ldquo;nav-tabs&rdquo;换成&ldquo;nav-pills&rdquo;即可

<div>
<pre>.nav-pills &gt; li {
  float: left;
}
.nav-pills &gt; li &gt; a {
  border-radius: 4px;
}
.nav-pills &gt; li + li {
  margin-left: 2px;
}
.nav-pills &gt;li.active&gt; a,
.nav-pills &gt;li.active&gt;a:hover,
.nav-pills &gt;li.active&gt;a:focus {
color: #fff;
  background-color: #428bca;
}</pre>
</div>
<div>
<pre>&lt;ul class="nav nav-pills"&gt;
    &lt;li class="active"&gt;&lt;a href="##"&gt;Home&lt;/a&gt;&lt;/li&gt;
     &lt;li&gt;&lt;a href="##"&gt;CSS3&lt;/a&gt;&lt;/li&gt;
     &lt;li&gt;&lt;a href="##"&gt;Sass&lt;/a&gt;&lt;/li&gt;
     &lt;li&gt;&lt;a href="##"&gt;jQuery&lt;/a&gt;&lt;/li&gt;
     &lt;li class="disabled"&gt;&lt;a href="##"&gt;Responsive&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;</pre>
</div>

<iframe style="width: 100%; height: 70px;" src="https://demo.xiaohuochai.site/bootstrap/nav/n3.html" frameborder="0" width="320" height="240"></iframe>

【垂直方向】

&emsp;&emsp;胶囊式标签页也是可以垂直方向堆叠排列的。只需添加&nbsp;`.nav-stacked`&nbsp;类

<div>
<pre>&lt;ul class="nav nav-pills nav-stacked"&gt;
    &lt;li class="active"&gt;&lt;a href="##"&gt;Home&lt;/a&gt;&lt;/li&gt;
     &lt;li&gt;&lt;a href="##"&gt;CSS3&lt;/a&gt;&lt;/li&gt;
     &lt;li&gt;&lt;a href="##"&gt;Sass&lt;/a&gt;&lt;/li&gt;
     &lt;li&gt;&lt;a href="##"&gt;jQuery&lt;/a&gt;&lt;/li&gt;
     &lt;li class="disabled"&gt;&lt;a href="##"&gt;Responsive&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;</pre>
</div>

<iframe style="width: 100%; height: 230px;" src="https://demo.xiaohuochai.site/bootstrap/nav/n4.html
" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 自适应导航

&emsp;&emsp;自适应导航指的是导航占据容器全部宽度，而且菜单项可以像表格的单元格一样自适应宽度。自适应导航和前面使用&ldquo;btn-group-justified&rdquo;制作的自适应按钮组是一样的。只不过在制作自适应导航时更换了另一个类名&ldquo;nav-justified&rdquo;。当然需要和&ldquo;nav-tabs&rdquo;或者&ldquo;nav-pills&rdquo;配合在一起使用

&emsp;&emsp;在大于 768px 的屏幕上，通过&nbsp;`.nav-justified`&nbsp;类可以很容易的让标签页或胶囊式标签呈现出同等宽度。在小屏幕上，导航链接呈现堆叠样式

&emsp;&emsp;实现原理并不难，列表（&lt;ul&gt;）上设置宽度为&ldquo;100%&rdquo;，然后每个菜单项(&lt;li&gt;)设置了&ldquo;display:table-cell&rdquo;，让列表项以模拟表格单元格的形式显示

<div>
<pre>&lt;ul class="nav nav-tabs nav-justified"&gt;
     &lt;li class="active"&gt;&lt;a href="##"&gt;Home&lt;/a&gt;&lt;/li&gt;
     &lt;li&gt;&lt;a href="##"&gt;CSS3&lt;/a&gt;&lt;/li&gt;
     &lt;li&gt;&lt;a href="##"&gt;Sass&lt;/a&gt;&lt;/li&gt;
     &lt;li&gt;&lt;a href="##"&gt;jQuery&lt;/a&gt;&lt;/li&gt;
     &lt;li&gt;&lt;a href="##"&gt;Responsive&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;</pre>
</div>

<iframe style="width: 100%; height: 260px;" src="https://demo.xiaohuochai.site/bootstrap/nav/n5.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 二级导航

&emsp;&emsp;很多时候，在Web页面中离不开二级导航的效果。在Bootstrap框架中制作二级导航就更容易了。只需要将li当作父容器，使用类名&ldquo;dropdown&rdquo;，同时在li中嵌套另一个列表ul。也就是添加一个下拉菜单

<div>
<pre>&lt;ul class="nav nav-pills"&gt;
     &lt;li class="active"&gt;&lt;a href="##"&gt;首页&lt;/a&gt;&lt;/li&gt;
     &lt;li class="dropdown"&gt;
        &lt;a href="##" class="dropdown-toggle" data-toggle="dropdown"&gt;教程 &lt;span class="caret"&gt;&lt;/span&gt;&lt;/a&gt;
        &lt;ul class="dropdown-menu"&gt;
            &lt;li&gt;&lt;a href="##"&gt;CSS3&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a href="##"&gt;Sass&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a href="##"&gt;jQuery&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a href="##"&gt;Responsive&lt;/a&gt;&lt;/li&gt;
       &lt;/ul&gt;
     &lt;/li&gt;
     &lt;li&gt;&lt;a href="##"&gt;关于我们&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;</pre>
</div>

<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/bootstrap/nav/n6.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 面包屑导航

&emsp;&emsp;面包屑(Breadcrumb)一般用于导航，主要作用是告诉用户现在所处页面的位置（当前位置），使用方式就很简单，为ol加入breadcrumb类：

&emsp;&emsp;面包屑导航(BreadcrumbNavigation)这个概念来自童话故事"汉赛尔和格莱特"，当汉赛尔和格莱特穿过森林时，不小心迷路了，但是他们发现在沿途走过的地方都撒下了面包屑，让这些面包屑来帮助他们找到回家的路。所以，面包屑导航的作用是告诉访问者他们目前在网站中的位置以及如何返回

<div>
<pre>&lt;ol class="breadcrumb"&gt;
  &lt;li&gt;&lt;a href="#"&gt;首页&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href="#"&gt;前端&lt;/a&gt;&lt;/li&gt;
  &lt;li class="active"&gt;CSS&lt;/li&gt;
&lt;/ol&gt; </pre>
</div>

<iframe style="width: 100%; height: 66px;" src="https://demo.xiaohuochai.site/bootstrap/nav/n7.html" frameborder="0" width="320" height="240"></iframe>

