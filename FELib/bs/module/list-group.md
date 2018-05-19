# Bootstrap列表组

&emsp;&emsp;列表组是Bootstrap框架新增的一个组件，可以用来制作列表清单、垂直导航等效果，也可以配合其他的组件制作出更漂亮的组件。本文将详细介绍Bootstrap列表组

&nbsp;

### 基础列表组

&emsp;&emsp;基础列表组，看上去就是去掉了列表符号的列表项，并且配上一些特定的样式。在Bootstrap框架中的基础列表组主要包括两个部分：&nbsp;

&emsp;&emsp;☑&nbsp;&nbsp;list-group：列表组容器，常用的是ul元素，当然也可以是ol或者div元素

&emsp;&emsp;☑&nbsp;&nbsp;list-group-item：列表项，常用的是li元素，当然也可以是div元素

&emsp;&emsp;对于基础列表组并没有做过多的样式设置，主要设置了其间距，边框和圆角等

<div>
<pre>.list-group {
  padding-left: 0;
  margin-bottom: 20px;
}
.list-group-item {
  position: relative;
  display: block;
  padding: 10px 15px;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid #ddd;
}
.list-group-item:first-child {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.list-group-item:last-child {
  margin-bottom: 0;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
}</pre>
</div>
<div>
<pre>&lt;ul class="list-group"&gt;
    &lt;li class="list-group-item"&gt;HTML&lt;/li&gt;
    &lt;li class="list-group-item"&gt;CSS&lt;/li&gt;
    &lt;li class="list-group-item"&gt;javascript&lt;/li&gt;
    &lt;li class="list-group-item"&gt;bootstrap&lt;/li&gt;
    &lt;li class="list-group-item"&gt;jquery&lt;/li&gt;
&lt;/ul&gt;</pre>
</div>

<iframe style="width: 100%; height: 226px;" src="https://demo.xiaohuochai.site/bootstrap/listgroup/l1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 徽章

&emsp;&emsp;带徽章的列表组其实就是将Bootstrap框架中的[徽章组件](http://www.cnblogs.com/xiaohuochai/p/7113645.html#anchor2)和基础列表组结合在一起的一个效果。具体做法很简单，只需要在&ldquo;list-group-item&rdquo;中添加徽章组件&ldquo;badge&rdquo;

&emsp;&emsp;原理非常简单，就是给徽章设置了一个右浮动，当然如果有两个徽章同时在一个列表项中出现时，还设置了他们之间的距离

<div>
<pre>.list-group-item &gt; .badge {
  float: right;
}
.list-group-item &gt; .badge + .badge {
  margin-right: 5px;
}</pre>
</div>
<div>
<pre>&lt;ul class="list-group"&gt;
    &lt;li class="list-group-item"&gt;
        &lt;span class="badge"&gt;33&lt;/span&gt;HTML
    &lt;/li&gt;
    &lt;li class="list-group-item"&gt;
        &lt;span class="badge"&gt;60&lt;/span&gt;CSS
    &lt;/li&gt;
    &lt;li class="list-group-item"&gt;
        &lt;span class="badge"&gt;192&lt;/span&gt;javascript
    &lt;/li&gt;
    &lt;li class="list-group-item"&gt;
        &lt;span class="badge"&gt;20&lt;/span&gt;bootstrap
    &lt;/li&gt;
    &lt;li class="list-group-item"&gt;
        &lt;span class="badge"&gt;26&lt;/span&gt;jquery
    &lt;/li&gt;
&lt;/ul&gt;</pre>
</div>

<iframe style="width: 100%; height: 226px;" src="https://demo.xiaohuochai.site/bootstrap/listgroup/l2.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 链接

&emsp;&emsp;用&nbsp;&lt;a&gt;&nbsp;标签代替&nbsp;&lt;li&gt;&nbsp;标签可以组成一个全部是链接的列表组（还要注意的是，需要将&nbsp;&lt;ul&gt;&nbsp;标签替换为&nbsp;&lt;div&gt;&nbsp;标签）。没必要给列表组中的每个元素都加一个父元素

<div>
<pre>a.list-group-item {
  color: #555;
}
a.list-group-item .list-group-item-heading {
  color: #333;
}
a.list-group-item:hover,
a.list-group-item:focus {
  color: #555;
  text-decoration: none;
  background-color: #f5f5f5;
}</pre>
</div>
<div>
<pre>&lt;div class="list-group"&gt;
  &lt;a href="#" class="list-group-item "&gt;HTML&lt;/a&gt;
  &lt;a href="#" class="list-group-item"&gt;CSS&lt;/a&gt;
  &lt;a href="#" class="list-group-item"&gt;javascript&lt;/a&gt;
  &lt;a href="#" class="list-group-item active"&gt;bootstrap&lt;/a&gt;
  &lt;a href="#" class="list-group-item"&gt;jquery&lt;/a&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 226px;" src="https://demo.xiaohuochai.site/bootstrap/listgroup/l3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 按钮

&emsp;&emsp;列表组中的元素也可以直接就是按钮（也同时意味着父元素必须是&nbsp;&lt;div&gt;&nbsp;而不能用&nbsp;&lt;ul&gt;&nbsp;了），并且无需为每个按钮单独包裹一个父元素。<span class="text-danger">注意不要使用标准的&nbsp;`.btn`&nbsp;类

<div>
<pre>&lt;div class="list-group"&gt;
  &lt;button type="button" class="list-group-item "&gt;HTML&lt;/button&gt;
  &lt;button type="button" class="list-group-item"&gt;CSS&lt;/button&gt;
  &lt;button type="button" class="list-group-item"&gt;javascript&lt;/button&gt;
  &lt;button type="button" class="list-group-item"&gt;bootstrap&lt;/button&gt;
  &lt;button type="button" class="list-group-item"&gt;jquery&lt;/button&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 226px;" src="https://demo.xiaohuochai.site/bootstrap/listgroup/l4.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 定制内容

&emsp;&emsp;Bootstrap框加在链接列表组的基础上新增了两个样式：

&emsp;&emsp;☑&nbsp;&nbsp;list-group-item-heading：用来定义列表项头部样式

&emsp;&emsp;☑&nbsp;&nbsp;list-group-item-text：用来定义列表项主要内容

&emsp;&emsp;这两个样式最大的作用就是用来帮助开发者可以自定义列表项里的内容

<div>
<pre>&lt;div class="list-group"&gt;
    &lt;a href="##" class="list-group-item"&gt;
        &lt;h4 class="list-group-item-heading"&gt;HTML&lt;/h4&gt;
        &lt;p class="list-group-item-text"&gt;HTML被认为是前端知识体系里面最简单的知识，几年前，很多人都推荐在W3C上学习个几天就能够基本掌握。但随着HTML5和移动端的强势发展，HTML的技能点也越来越难。世上无难事，好学好总结...&lt;/p&gt;
    &lt;/a&gt;
    &lt;a href="##" class="list-group-item"&gt;
        &lt;h4 class="list-group-item-heading"&gt;CSS&lt;/h4&gt;
        &lt;p class="list-group-item-text"&gt;CSS是前端工程师的基本功，但好多执迷于学习javascript的人的基本功并不扎实。可能一些人从w3school网站匆匆过了一遍，只是对CSS常用概念有一些表面上的理解，就一头扎进javascript的深坑里跳不出来。实际上，javascript中比较复杂的逻辑很有可能使用CSS几行样式就能解决问题，而且性能还好。CSS之所以能成为一门优雅的语言，以及有其对应的重构工程师的岗位，是因为这本语言本身就有很强的存在价值，且真正要理解它并不容易。从CSS禅意花园开始，写CSS成为一种艺术。从CSS2.1到3再到4，CSS所涵盖的内容及可实现的功能得到了极大的丰富，使得CSS的学习成本也越来越高。再多的知识，一个知识点一个知识点去学，总能学明白...&lt;/p&gt;
    &lt;/a&gt;
    &lt;a href="##" class="list-group-item"&gt;
        &lt;h4 class="list-group-item-heading"&gt;javascript&lt;/h4&gt;
        &lt;p class="list-group-item-text"&gt;javascript就如同魔法一样，它是一门充满活力、简单易用的语言，又是一门具有许多复杂微妙技术的语言。即使是经验丰富的javascript开发者，如果没有认真学习的话，也无法真正理解它们，这就是javascript的矛盾之处。由于javascript不必理解就可以使用，因此通常来说很难真正理解语言本身，这就是我们面临的挑战。不满足于只是让代码正常工作，而是想要弄清楚为什么，勇于挑战这条崎岖颠簸的少有人走的路，拥抱整个javascript...&lt;/p&gt;
    &lt;/a&gt;    
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 410px;" src="https://demo.xiaohuochai.site/bootstrap/listgroup/l5.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 状态设置

&emsp;&emsp;Bootstrap框架给组合列表项提供了状态效果，特别是链接列表组。比如常见状态和禁用状态等。实现方法和前面介绍的组件类似，在列表组中只需要在对应的列表项中添加类名：

&emsp;&emsp;☑&nbsp;&nbsp;active：表示当前状态

&emsp;&emsp;☑&nbsp;&nbsp;disabled：表示禁用状态

<div>
<pre>.list-group-item.disabled,
.list-group-item.disabled:hover,
.list-group-item.disabled:focus {
  color: #777;
  background-color: #eee;
}
.list-group-item.active,
.list-group-item.active:hover,
.list-group-item.active:focus {
  z-index: 2;
  color: #fff;
  background-color: #428bca;
  border-color: #428bca;
}</pre>
</div>
<div>
<pre>&lt;div class="list-group"&gt;
  &lt;a href="#" class="list-group-item "&gt;HTML&lt;/a&gt;
  &lt;a href="#" class="list-group-item"&gt;CSS&lt;/a&gt;
  &lt;a href="#" class="list-group-item"&gt;javascript&lt;/a&gt;
  &lt;a href="#" class="list-group-item active"&gt;bootstrap&lt;/a&gt;
  &lt;a href="#" class="list-group-item disabled"&gt;jquery&lt;/a&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 226px;" src="https://demo.xiaohuochai.site/bootstrap/listgroup/l6.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 多彩列表组

&emsp;&emsp;列表组组件和警告组件一样，Bootstrap为不同的状态提供了不同的背景颜色和文本色，可以使用这几个类名定义不同背景色的列表项

&emsp;&emsp;☑&nbsp;&nbsp;list-group-item-success：成功，背景色绿色

&emsp;&emsp;☑&nbsp;&nbsp;list-group-item-info：信息，背景色蓝色

&emsp;&emsp;☑&nbsp;&nbsp;list-group-item-warning：警告，背景色为黄色

&emsp;&emsp;☑&nbsp;&nbsp;list-group-item-danger：错误，背景色为红色

&emsp;&emsp;如果想给列表项添加什么背景色，只需要在&ldquo;list-group-item&rdquo;基础上增加对应的类名

<div>
<pre>&lt;div class="list-group"&gt;
    &lt;a href="##" class="list-group-item"&gt;默认&lt;/a&gt;
    &lt;a href="##" class="list-group-item list-group-item-success"&gt;成功&lt;/a&gt;
    &lt;a href="##" class="list-group-item list-group-item-info"&gt;信息&lt;/a&gt;
    &lt;a href="##" class="list-group-item list-group-item-warning"&gt;警告&lt;/a&gt;
    &lt;a href="##" class="list-group-item list-group-item-danger"&gt;错误&lt;/a&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 226px;" src="https://demo.xiaohuochai.site/bootstrap/listgroup/l7.html" frameborder="0" width="320" height="240"></iframe>

