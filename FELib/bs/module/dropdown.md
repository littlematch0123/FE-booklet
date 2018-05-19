# Bootstrap下拉菜单

&emsp;&emsp;网页交互的时候经常会需要上下文菜单或者隐藏/显示菜单项，Bootstrap默认提供了用于显示链接列表的可切换、有上下文的菜单。而且在各种交互状态下的菜单展示需要和javascript插件配合才能使用。本文将详细介绍Bootstrap下拉菜单

&nbsp;

### 使用方法

&emsp;&emsp;在使用Bootstrap框架的下拉菜单时，必须调用Bootstrap框架提供的bootstrap.js文件。当然，如果使用的是未编译版本，在js文件夹下能找到一个名为&ldquo;dropdown.js&rdquo;的文件，也可以调用这个js文件

&emsp;&emsp;因为Bootstrap的组件交互效果都是依赖于jQuery库写的插件，所以在使用bootstrap.js之前一定要先加载jquery.js才会产生效果

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

&emsp;&emsp;在使用Bootstrap框架中的下拉菜单组件时，其结构运用的正确与否非常的重要，如果结构和类名未使用正确，直接影响组件是否能正常运用

&emsp;&emsp;1、使用一个名为&ldquo;dropdown&rdquo;的容器包裹了整个下拉菜单元素

<div>
<pre>&lt;div class="dropdown"&gt;&lt;/div&gt;</pre>
</div>

&emsp;&emsp;2、使用了一个&lt;button&gt;按钮做为父菜单，并且定义类名&ldquo;dropdown-toggle&rdquo;和自定义&ldquo;data-toggle&rdquo;属性，且值必须和最外容器类名一致

<div>
<pre>&lt;button class="btn dropdown-toggle" type="button" data-toggle="dropdown"&gt;</pre>
</div>

&emsp;&emsp;3、下拉菜单项使用一个ul列表，并且定义一个类名为&ldquo;dropdown-menu&rdquo;

<div>
<pre>&lt;ul class="dropdown-menu" role="menu"&gt;</pre>
</div>
<div>
<pre>&lt;div class="dropdown"&gt;
  &lt;button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"&gt;
    Dropdown
    &lt;span class="caret"&gt;&lt;/span&gt;
  &lt;/button&gt;
  &lt;ul class="dropdown-menu" aria-labelledby="dropdownMenu1"&gt;
    &lt;li&gt;&lt;a href="#"&gt;Action&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;Another action&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;Something else here&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/div&gt;
</pre>
</div>

<iframe style="width: 100%; height: 150px;" src="https://demo.xiaohuochai.site/bootstrap/dropdown/d1.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;4、通过为下拉菜单的父元素设置&nbsp;`.dropup`&nbsp;类，可以让菜单向上弹出（默认是向下弹出的）

<div>
<pre>&lt;div class="dropup"&gt;
  &lt;button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"&gt;
    Dropup
    &lt;span class="caret"&gt;&lt;/span&gt;
  &lt;/button&gt;
  &lt;ul class="dropdown-menu" aria-labelledby="dropdownMenu1"&gt;
    &lt;li&gt;&lt;a href="#"&gt;Action&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;Another action&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;Something else here&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/bootstrap/dropdown/d2.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 原理分析

&emsp;&emsp;Bootstrap框架中的下拉菜单组件，其下拉菜单项默认是隐藏的，因为&ldquo;dropdown-menu&rdquo;默认样式设置了&ldquo;display:none&rdquo;；当用户点击父菜单项时，下拉菜单将会被显示出来；当用户再次点击时，下拉菜单将继续隐藏

<div>
<pre>.dropdown-menu {
  position: absolute;/*设置绝对定位，相对于父元素div.dropdown*/
  top: 100%;/*让下拉菜单项在父菜单项底部，如果父元素不设置相对定位，该元素相对于body元素*/
  left: 0;
  z-index: 1000;/*让下拉菜单项不被其他元素遮盖住*/
  display: none;/*默认隐藏下拉菜单项*/
  float: left;
  min-width: 160px;
  padding: 5px 0;
  margin: 2px 0 0;
  font-size: 14px;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ccc;
  border: 1px solid rgba(0, 0, 0, .15);
  border-radius: 4px;
  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
  box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
}</pre>
</div>

【实现原理】

&emsp;&emsp;1、Dropdown插件在网页加载的时候，对所有带有data-toggle="dropdown"样式的元素进行事件绑定

&emsp;&emsp;2、用户单击带有data-toggle="dropdown"样式的链接或按钮时，触发javascript事件代码

&emsp;&emsp;3、javascript事件代码在父容器上加一个.open样式

&emsp;&emsp;4、默认隐藏的.dropdown-menu菜单在外部有了.open样式后，即可显示出来，从而达到预期的效果

&emsp;&emsp;5、当用户再次点击时，&ldquo;div.dropdown&rdquo;容器中的类名&ldquo;open&rdquo;又会被移除

<div>
<pre>.open &gt; .dropdown-menu {
  display: block;
}</pre>
</div>

【其他用法】

&emsp;&emsp;还有一个有趣的用法，是触发元素可以放在菜单的父容器的外部

&emsp;&emsp;但是，这种用法有两点需要注意

&emsp;&emsp;1、要设置父容器的id值

&emsp;&emsp;2、要设置触发元素的data-toggle属性和data-target属性，data-target属性值是#id

<div>
<pre>&lt;button class="btn dropdown-toggle" type="button" data-toggle="dropdown" data-target="#dropdown1"&gt;外部触发器&lt;/button&gt;
&lt;div class="dropdown" id="dropdown1"&gt;
    &lt;ul class="dropdown-menu" role="menu" aria-labelledby="tutorial"&gt;
        &lt;li role="presentation"&gt;&lt;a href="##"&gt;HTML&lt;/a&gt;&lt;/li&gt;
        &lt;li role="presentation"&gt;&lt;a href="##"&gt;CSS&lt;/a&gt;&lt;/li&gt;
        &lt;li role="presentation"&gt;&lt;a href="##"&gt;javascript&lt;/a&gt;&lt;/li&gt;
    &lt;/ul&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 154px;" src="https://demo.xiaohuochai.site/bootstrap/dropdown/d3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 扩展用法

【分隔线】

&emsp;&emsp;在Bootstrap框架中的下拉菜单提供了下拉分隔线，假设下拉菜单有两个组，那么组与组之间可以通过添加一个空的&lt;li&gt;，并且给这个&lt;li&gt;添加类名&ldquo;divider&rdquo;来实现添加下拉分隔线的功能

<div>
<pre>.dropdown-menu .divider {
  height: 1px;
  margin: 9px 0;
  overflow: hidden;
  background-color: #e5e5e5;
}</pre>
</div>
<div>
<pre>&lt;li role="separator" class="divider"&gt;&lt;/li&gt;</pre>
</div>
<div>
<pre>&lt;div class="dropdown"&gt;
  &lt;button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"&gt;
    Dropdown
    &lt;span class="caret"&gt;&lt;/span&gt;
  &lt;/button&gt;
  &lt;ul class="dropdown-menu" aria-labelledby="dropdownMenu1"&gt;
    &lt;li&gt;&lt;a href="#"&gt;Action&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;Another action&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;Something else here&lt;/a&gt;&lt;/li&gt;
    &lt;li role="separator" class="divider"&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;Separated link&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/bootstrap/dropdown/d4.html" frameborder="0" width="320" height="240"></iframe>

【菜单标题】

&emsp;&emsp;在任何下拉菜单中均可通过添加标题来标明一组动作&nbsp;

<div>
<pre>&lt;li class="dropdown-header"&gt;Dropdown header&lt;/li&gt;</pre>
</div>
<div>
<pre>.dropdown-header {
  display: block;
  padding: 3px 20px;
  font-size: 12px;
  line-height: 1.42857143;
  color: #999;
}</pre>
</div>
<div>
<pre>&lt;div class="dropdown"&gt;
  &lt;button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"&gt;
    Dropdown
    &lt;span class="caret"&gt;&lt;/span&gt;
  &lt;/button&gt;
  &lt;ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1"&gt;
    &lt;li role="presentation" class="dropdown-header"&gt;第一部分菜单头部&lt;/li&gt;
    &lt;li role="presentation"&gt;&lt;a role="menuitem" tabindex="-1" href="#"&gt;下拉菜单项&lt;/a&gt;&lt;/li&gt;
    &lt;li role="presentation"&gt;&lt;a role="menuitem" tabindex="-1" href="#"&gt;下拉菜单项&lt;/a&gt;&lt;/li&gt;
    &lt;li role="presentation" class="divider"&gt;&lt;/li&gt;
    &lt;li role="presentation" class="dropdown-header"&gt;第二部分菜单头部&lt;/li&gt;
    &lt;li role="presentation"&gt;&lt;a role="menuitem" tabindex="-1" href="#"&gt;下拉菜单项&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/bootstrap/dropdown/d5.html" frameborder="0" width="320" height="240"></iframe>

【对齐方式】

&emsp;&emsp;Bootstrap框架中下拉菜单默认是左对齐，如果想让下拉菜单相对于父容器右对齐时，可以在&ldquo;dropdown-menu&rdquo;上添加一个&ldquo;dropdown-menu-right&rdquo;类名&nbsp;

<div>
<pre>.dropdown-menu-right {
  right: 0;
  left: auto;
}</pre>
</div>

&emsp;&emsp;由于&lt;div class="dropdown"&gt;默认是块级元素，撑满父级宽度。这里，需要为该元素设置inline-block和margin-left，使其内容撑开宽度，且距离左侧有一定距离

<div>
<pre>    display: inline-block;
    margin-left: 60px;</pre>
</div>
<div>
<pre>&lt;div class="dropdown" style="display: inline-block;margin-left: 60px;"&gt;
  &lt;button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"&gt;
    Dropdown
    &lt;span class="caret"&gt;&lt;/span&gt;
  &lt;/button&gt;
  &lt;ul class="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="dropdownMenu1"&gt;
    &lt;li role="presentation"&gt;&lt;a role="menuitem" tabindex="-1" href="#"&gt;下拉菜单项&lt;/a&gt;&lt;/li&gt;
    &lt;li role="presentation"&gt;&lt;a role="menuitem" tabindex="-1" href="#"&gt;下拉菜单项&lt;/a&gt;&lt;/li&gt;
    &lt;li role="presentation"&gt;&lt;a role="menuitem" tabindex="-1" href="#"&gt;下拉菜单项&lt;/a&gt;&lt;/li&gt;
    &lt;li role="presentation" class="divider"&gt;&lt;/li&gt;
    &lt;li role="presentation"&gt;&lt;a role="menuitem" tabindex="-1" href="#"&gt;下拉菜单项&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/bootstrap/dropdown/d6.html" frameborder="0" width="320" height="240"></iframe>

【菜单项状态】

&emsp;&emsp;下拉菜单项的默认的状态有悬浮状态（:hover）和焦点状态（:focus）

<div>
<pre>.dropdown-menu &gt; li &gt; a:hover,
.dropdown-menu &gt; li &gt; a:focus {
  color: #262626;
  text-decoration: none;
  background-color: #f5f5f5;
}</pre>
</div>

&emsp;&emsp;下拉菜单项除了上面两种状态，还有当前状态（.active）和禁用状态（.disabled）。这两种状态使用方法只需要在对应的菜单项上添加对应的类名

<div>
<pre>&lt;div class="dropdown"&gt;
  &lt;button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"&gt;
    Dropdown
    &lt;span class="caret"&gt;&lt;/span&gt;
  &lt;/button&gt;
  &lt;ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1"&gt;
    &lt;li role="presentation" class="active"&gt;&lt;a role="menuitem" tabindex="-1" href="#"&gt;下拉菜单项&lt;/a&gt;&lt;/li&gt;
    &lt;li role="presentation"&gt;&lt;a role="menuitem" tabindex="-1" href="#"&gt;下拉菜单项&lt;/a&gt;&lt;/li&gt;
    &lt;li role="presentation"&gt;&lt;a role="menuitem" tabindex="-1" href="#"&gt;下拉菜单项&lt;/a&gt;&lt;/li&gt;
    &lt;li role="presentation" class="divider"&gt;&lt;/li&gt;
    &lt;li role="presentation" class="disabled"&gt;&lt;a role="menuitem" tabindex="-1" href="#"&gt;下拉菜单项&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/bootstrap/dropdown/d7.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### JS触发

&emsp;&emsp;和[模态弹出窗](http://www.cnblogs.com/xiaohuochai/p/7130390.html)一样，Bootstrap框架中的下拉菜单也支持JavaScript方法触发下拉菜单显示。但是，要特点注意的是，即使使用JS触发，也不能去掉触发元素的data-toggle="dropdown"

<div>
<pre>&lt;div class="dropdown"&gt;
    &lt;button class="btn dropdown-toggle" data-toggle="dropdown" type="button"&gt;触发器&lt;/button&gt;
    &lt;ul class="dropdown-menu" role="menu" aria-labelledby="tutorial"&gt;
        &lt;li role="presentation"&gt;&lt;a href="##"&gt;HTML&lt;/a&gt;&lt;/li&gt;
        &lt;li role="presentation"&gt;&lt;a href="##"&gt;CSS&lt;/a&gt;&lt;/li&gt;
        &lt;li role="presentation"&gt;&lt;a href="##"&gt;javascript&lt;/a&gt;&lt;/li&gt;
    &lt;/ul&gt;
&lt;/div&gt;
&lt;script&gt;
;$(function(){
    $('.dropdown-toggle').dropdown()
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 154px;" src="https://demo.xiaohuochai.site/bootstrap/dropdown/d8.html" frameborder="0" width="320" height="240"></iframe>

【toggle】

&emsp;&emsp;和Modal一样，dropdown也接收字符串作为参数进行传递，参数可以是"toggle"

&emsp;&emsp;但是，这非常不好用。每次单击都要两次toggle，就会一直是一个不变的状态。所以，一般情况下，使用不带参数的方法。就算需要使用参数&ldquo;toggle&rdquo;，也建议使用jQuery的one方法&nbsp;

<div>
<pre>$(".dropdown-toggle").one("click",function(){
    $(this).dropdown("toggle");
})</pre>
</div>

【事件订阅】

&emsp;&emsp;与Modal类似，下拉菜单支持4种类型的事件订阅，分别对应下拉菜单的弹出前、弹出后、关闭前、关闭后

<div>
<pre>show.bs.dropdown 在show方法调用时立即触发(尚未显示之前)
shown.bs.dropdown 在下拉菜单完全显示给用户之后(并且等CSS动画完成之后)触发
hide.bs.dropdown 在hide方法调用时(但还未关闭隐藏)立即触发
hidden.bs.dropdown 在下拉菜单完全隐藏之后(并且等CSS动画完成之后)触发</pre>
</div>
<div>
<pre>&lt;div class="dropdown"&gt;
    &lt;button class="btn dropdown-toggle" data-toggle="dropdown" type="button"&gt;触发器&lt;/button&gt;
    &lt;ul class="dropdown-menu" role="menu" aria-labelledby="tutorial"&gt;
        &lt;li role="presentation"&gt;&lt;a href="##"&gt;HTML&lt;/a&gt;&lt;/li&gt;
        &lt;li role="presentation"&gt;&lt;a href="##"&gt;CSS&lt;/a&gt;&lt;/li&gt;
        &lt;li role="presentation"&gt;&lt;a href="##"&gt;javascript&lt;/a&gt;&lt;/li&gt;
    &lt;/ul&gt;
&lt;/div&gt;
&lt;script&gt;
;$(function(){
    $('.dropdown').on('show.bs.dropdown',function(){
        $('.dropdown-toggle').html('关闭');
    });
    $('.dropdown').on('hide.bs.dropdown',function(){
        $('.dropdown-toggle').html('打开');
    });

});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 154px;" src="https://demo.xiaohuochai.site/bootstrap/dropdown/d9.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### JS源码

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
<pre>  //弹出下拉菜单时的蒙版样式
  var backdrop = '.dropdown-backdrop'
  //dropdown触发元素的自定义属性
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    //插件类函数定义，一旦触发，就在click事件上绑定toggle，所以不能再用自定义代码进行toggle了
    $(element).on('click.bs.dropdown', this.toggle)
  }
  //版本号为'3.3.7'
  Dropdown.VERSION = '3.3.7'</pre>
</div>

【3】插件核心代码

<div>
<pre>  //获取下拉菜单的父元素容器
  function getParent($this) {
    //获取触发元素的'data-target'特性值，表示下拉菜单的父元素容器的选择器
    var selector = $this.attr('data-target')  
    //如果触发元素没有设置'data-target'
    if (!selector) {
      //获取触发元素的'href'特性值，表示下拉菜单的父元素容器的选择器
      selector = $this.attr('href')
      //该值是所弹出元素的id值
      selector = selector &amp;&amp; /#[A-Za-z]/.test(selector) &amp;&amp; selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }
    //通过选择器，来获取下拉菜单的父元素容器
    var $parent = selector &amp;&amp; $(selector)
    //如果找到，说明触发元素确实在下拉菜单外部，则返回找到的下拉菜单的父元素容器即可
    //如果没有找到，说明触发元素在下拉菜单内部，则返回它的直接父级元素
    return $parent &amp;&amp; $parent.length ? $parent : $this.parent()
  }
  //关闭所有的下拉菜单
  function clearMenus(e) {
    //如果点击的是鼠标右键，则直接返回
    if (e &amp;&amp; e.which === 3) return
    //删除用于移动设备的蒙版  
    $(backdrop).remove()
    //根据选择器，遍历所有的dropdown标记，然后全部关闭
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }
      //如果下拉菜单的父元素容器没有open类名，则直接返回
      if (!$parent.hasClass('open')) return
      //如果触发了鼠标单击事件，并且鼠标事件的目标元素是input或textarea，则直接返回
      if (e &amp;&amp; e.type == 'click' &amp;&amp; /input|textarea/i.test(e.target.tagName) &amp;&amp; $.contains($parent[0], e.target)) return
      //关闭前，触发hide事件
      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))
      //如果阻止了默认行为，则直接返回
      if (e.isDefaultPrevented()) return
      $this.attr('aria-expanded', 'false')
      //关闭后，触发hidden事件
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }
  //控制下拉菜单的打开、关闭操作
  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)
    //如果有禁用标记，则不处理
    if ($this.is('.disabled, :disabled')) return
    //获取下拉菜单的父元素容器
    var $parent  = getParent($this)
    //判断下拉菜单的父元素容器是否有open样式
    var isActive = $parent.hasClass('open')
    //关闭所有的下拉菜单
    clearMenus()
    //如果是，在clearMenus阶段已经关闭了，所以不需要再次关闭
    //如果不是，说明默认是关闭状态，则需要展开下拉菜单
    if (!isActive) {
      //如果是移动设置，则使用dropdown-backdrop样式，因为移动设备不支持click单击委托
      if ('ontouchstart' in document.documentElement &amp;&amp; !$parent.closest('.navbar-nav').length) {       
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }
      var relatedTarget = { relatedTarget: this }
      //展开下拉菜单前，触发show事件
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))
      //如果阻止了默认行为，则直接返回
      if (e.isDefaultPrevented()) return
      $this
        //设置focus样式
        .trigger('focus')
        .attr('aria-expanded', 'true')
      $parent
        //设置open样式
        .toggleClass('open')
        //展开下拉菜单后，触发shown事件
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }
    return false
  }
  //利用键盘控制下拉菜单
  Dropdown.prototype.keydown = function (e) {
    //如果按键不是esc、或上下方向键、或空格键，或者目标元素是input或textarea控件，则忽略处理
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return
    var $this = $(this)
    //阻止默认行为及冒泡
    e.preventDefault()
    e.stopPropagation()
    //如果有禁用标记，则不做处理
    if ($this.is('.disabled, :disabled')) return
    //获取下拉菜单的父元素容器
    var $parent  = getParent($this)
    //判断父元素是否有open样式
    var isActive = $parent.hasClass('open')
    //如果有open样式并且按键不是向下箭头，或者没有open样式并且按键是向下箭头，也打开下拉菜单
    if (!isActive &amp;&amp; e.which != 27 || isActive &amp;&amp; e.which == 27) {
      //如果按下向下箭头，则给触发元素加上焦点
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      //触发单击事件
      return $this.trigger('click')
    }
    //返回可以利用箭头选择的下拉菜单项
    //必须是可见的a链接，并且不包括分隔符
    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)
    //如果没有，则不做处理
    if (!$items.length) return
    //找出当前处理焦点状态的第一个下拉菜单项的索引
    var index = $items.index(e.target)
    //按向上箭头，index-1
    if (e.which == 38 &amp;&amp; index &gt; 0)                 index--        
    //按向下箭头，index+1 
    if (e.which == 40 &amp;&amp; index &lt; $items.length - 1) index++      
    //当index为-1时，置为0  
    if (!~index)                                    index = 0
    //给所选择的菜单项设置焦点
    $items.eq(index).trigger('focus')
  }</pre>
</div>

【4】jQuery插件定义

<div>
<pre>  function Plugin(option) {
    //根据选择器，遍历所有符合规则的元素
    return this.each(function () {
      var $this = $(this)
      //获取自定义属性bs.dropdown的值
      var data  = $this.data('bs.dropdown')
      //如果值不存在，则将Dropdown实例设置为bs.dropdown值
      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      //如果option传递了string，则表示要执行某个方法  
      if (typeof option == 'string') data[option].call($this)
    })
  }
  var old = $.fn.dropdown
  //保留其他库的$.fn.modal代码(如果定义的话)，以便在noConflict之后可以继续使用该老代码
  $.fn.dropdown             = Plugin
  //重设插件构造器，可以通过该属性获取插件的真实类函数
  $.fn.dropdown.Constructor = Dropdown</pre>
</div>

【5】防冲突处理

<div>
<pre>  $.fn.dropdown.noConflict = function () {
    //恢复以前的旧代码
    $.fn.dropdown = old
    //将$.fn.dropdown.noConflict()设置为Bootstrap的Dropdown插件
    return this
  }</pre>
</div>

【6】绑定触发事件

<div>
<pre>  $(document)
    //为声明式的HTML绑定单击事件，在单击以后先关闭所有的下拉菜单
    .on('click.bs.dropdown.data-api', clearMenus)
    //如果内部有form元素，则阻止冒泡，不做其他处理
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    //绑定单击事件，执行toggle()方法
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    //绑定键盘keydown事件，执行keydown()方法
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    //为dropdown-menu绑定键盘keydown事件，执行keydown()方法
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)</pre>
</div>

