# Bootstrap选项卡

&emsp;&emsp;选项卡Tabs是Web中一种非常常用的功能。用户点击对菜单项，能切换出对应的内容。本文将详细介绍Bootstrap选项卡

### 基本用法

&emsp;&emsp;Bootstrap框架中的选项卡主要有两部分内容组成：

&emsp;&emsp;1、选项卡菜单组件，对应的是 Bootstrap的&nbsp;nav-tabs

&emsp;&emsp;2、可以切换的选项卡面板组件，在 Bootstrap 中通常&nbsp;tab-pane&nbsp;来表示

&emsp;&emsp;在Bootstrap框架中选项卡nav-tabs已带有样式，而对于面板内容tab-pane都是隐藏的，只有当前面板内容才是显示的

<div>
<pre>.tab-content &gt; .tab-pane {
    display: none;
}
.tab-content &gt; .active {
    display: block;
}</pre>
</div>

&emsp;&emsp;选项卡定义data属性来触发切换效果。当然前提要先加载bootstrap.js或者是tab.js。声明式触发选项卡需要满足以下几点要求：

&emsp;&emsp;1、选项卡导航链接中要设置&nbsp;data-toggle="tab"

&emsp;&emsp;2、并且设置&nbsp;data-target="对应内容面板的选择符(一般是ID)"；如果是链接的话，还可以通过&nbsp;href="对应内容面板的选择符(一般是ID)"，主要作用是用户点击的时候能找到该选择符所对应的面板内容 tab-pane。

&emsp;&emsp;3、面板内容统一放在 tab-content 容器中，而且每个内容面板 tab-pane 都需要设置一个独立的选择符（最好是ID）与选项卡中的&nbsp;data-target&nbsp;或&nbsp;href&nbsp;的值匹配

<div>
<pre>&lt;!-- 选项卡菜单--&gt;
&lt;ul id="myTab" class="nav nav-tabs" role="tablist"&gt;
    &lt;li class="active"&gt;&lt;a href="#bulletin" role="tab" data-toggle="tab"&gt;公告&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#rule" role="tab" data-toggle="tab"&gt;规则&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#forum" role="tab" data-toggle="tab"&gt;论坛&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#security" role="tab"  data-toggle="tab"&gt;安全&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#welfare" role="tab" data-toggle="tab"&gt;公益&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;
&lt;!-- 选项卡面板 --&gt;
&lt;div id="myTabContent" class="tab-content"&gt;
    &lt;div class="tab-pane active" id="bulletin"&gt;公告内容面板&lt;/div&gt;
    &lt;div class="tab-pane " id="rule"&gt;规则内容面板&lt;/div&gt;
    &lt;div class="tab-pane " id="forum"&gt;论坛内容面板&lt;/div&gt;
    &lt;div class="tab-pane " id="security"&gt;安全内容面板&lt;/div&gt;
    &lt;div class="tab-pane " id="welfare"&gt;公益内容面板&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 82px;" src="https://demo.xiaohuochai.site/bootstrap/tab/t1.html" frameborder="0" width="320" height="240"></iframe>

【渐入效果】

&emsp;&emsp;为了让面板的隐藏与显示在切换的过程效果更流畅，可以在面板中添加类名&nbsp;fade，让其产生渐入的效果。

&emsp;&emsp;在添加 fade 样式时，最初的默认显示的内容面板一定要加上&nbsp;in&nbsp;类名，不然用户无法看到其内容

<div>
<pre>&lt;!-- 选项卡菜单--&gt;
&lt;ul id="myTab" class="nav nav-tabs" role="tablist"&gt;
    &lt;li class="active"&gt;&lt;a href="#bulletin" role="tab" data-toggle="tab"&gt;公告&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#rule" role="tab" data-toggle="tab"&gt;规则&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#forum" role="tab" data-toggle="tab"&gt;论坛&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#security" role="tab"  data-toggle="tab"&gt;安全&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#welfare" role="tab" data-toggle="tab"&gt;公益&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;
&lt;!-- 选项卡面板 --&gt;
&lt;div id="myTabContent" class="tab-content"&gt;
    &lt;div class="tab-pane fade in active" id="bulletin"&gt;公告内容面板&lt;/div&gt;
    &lt;div class="tab-pane fade" id="rule"&gt;规则内容面板&lt;/div&gt;
    &lt;div class="tab-pane fade" id="forum"&gt;论坛内容面板&lt;/div&gt;
    &lt;div class="tab-pane fade" id="security"&gt;安全内容面板&lt;/div&gt;
    &lt;div class="tab-pane fade" id="welfare"&gt;公益内容面板&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 82px;" src="https://demo.xiaohuochai.site/bootstrap/tab/t2.html" frameborder="0" width="320" height="240"></iframe>

【胶囊式选项卡】

&emsp;&emsp;在Bootstrap除了可以让&nbsp;nav-tabs&nbsp;具有选项卡的切换功能之外，还可以让胶囊式&nbsp;nav-pills&nbsp;导航也具有选项卡的功能。只需要将 nav-tabs 换成 nav-pills，另外关键一点是将&nbsp;`data-toggle="tab"`换成`data-toggle="pill"`

<div>
<pre>&lt;!-- 选项卡菜单--&gt;
&lt;ul id="myTab" class="nav nav-pills" role="tablist"&gt;
    &lt;li class="active"&gt;&lt;a href="#bulletin" role="tab" data-toggle="pill"&gt;公告&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#rule" role="tab" data-toggle="pill"&gt;规则&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#forum" role="tab" data-toggle="pill"&gt;论坛&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#security" role="tab" data-toggle="pill"&gt;安全&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#welfare" role="tab" data-toggle="pill"&gt;公益&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;
&lt;!-- 选项卡面板 --&gt;
&lt;div id="myTabContent" class="tab-content"&gt;
    &lt;div class="tab-pane fade in active" id="bulletin"&gt;公告内容面板&lt;/div&gt;
    &lt;div class="tab-pane fade" id="rule"&gt;规则内容面板&lt;/div&gt;
    &lt;div class="tab-pane fade" id="forum"&gt;论坛内容面板&lt;/div&gt;
    &lt;div class="tab-pane fade" id="security"&gt;安全内容面板&lt;/div&gt;
    &lt;div class="tab-pane fade" id="welfare"&gt;公益内容面板&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 82px;" src="https://demo.xiaohuochai.site/bootstrap/tab/t3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### JS触发

&emsp;&emsp;除了在HTML设置 data-toggle 来触发选项卡之外，还可以通过JavaScript直接调用。

&emsp;&emsp;在每个链接的单击事件中调用`tab("show")`方法，显示对应的标签面板内容。针对上面的示例，删除HTML中自定义的 data-toggle="tab" 或 data-toggle="pill" 的属性，然后通过下面的脚本来调用

<div>
<pre>$(function(){
    $("#myTab a").click(function(e){
        e.preventDefault();
        $(this).tab("show");
    });
})</pre>
</div>
<div>
<pre>&lt;!-- 选项卡菜单--&gt;
&lt;ul id="myTab" class="nav nav-pills" role="tablist"&gt;
    &lt;li class="active"&gt;&lt;a href="#bulletin" role="tab"&gt;公告&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#rule" role="tab" &gt;规则&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#forum" role="tab" &gt;论坛&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#security" role="tab" &gt;安全&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#welfare" role="tab" &gt;公益&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;
&lt;!-- 选项卡面板 --&gt;
&lt;div id="myTabContent" class="tab-content"&gt;
    &lt;div class="tab-pane fade in active" id="bulletin"&gt;公告内容面板&lt;/div&gt;
    &lt;div class="tab-pane fade" id="rule"&gt;规则内容面板&lt;/div&gt;
    &lt;div class="tab-pane fade" id="forum"&gt;论坛内容面板&lt;/div&gt;
    &lt;div class="tab-pane fade" id="security"&gt;安全内容面板&lt;/div&gt;
    &lt;div class="tab-pane fade" id="welfare"&gt;公益内容面板&lt;/div&gt;
&lt;/div&gt;
&lt;script&gt;
$(function(){
    $("#myTab a").click(function(e){
        e.preventDefault();
        $(this).tab("show");
    });
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 82px;" src="https://demo.xiaohuochai.site/bootstrap/tab/t4.html" frameborder="0" width="320" height="240"></iframe>

【事件订阅】

<div>
<pre>show.bs.tab        show方法调用之后立即触发该事件
shown.bs.tab   &emsp;&emsp; 此事件在tab已经显示出来（并且同时在 CSS 过渡效果完成）之后被触发
hide.bs.tab        hide方法调用之后立即触发该事件。
hidden.bs.tab    　此事件在tab被隐藏（并且同时在 CSS 过渡效果完成）之后被触发</pre>
</div>
<div>
<pre>&lt;!-- 选项卡菜单--&gt;
&lt;ul id="myTab" class="nav nav-pills" role="tablist"&gt;
    &lt;li class="active"&gt;&lt;a href="#bulletin" role="tab"&gt;公告&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#rule" role="tab" &gt;规则&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#forum" role="tab" &gt;论坛&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#security" role="tab" &gt;安全&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#welfare" role="tab" &gt;公益&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;
&lt;!-- 选项卡面板 --&gt;
&lt;div id="myTabContent" class="tab-content"&gt;
    &lt;div class="tab-pane fade in active" id="bulletin"&gt;公告内容面板&lt;/div&gt;
    &lt;div class="tab-pane fade" id="rule"&gt;规则内容面板&lt;/div&gt;
    &lt;div class="tab-pane fade" id="forum"&gt;论坛内容面板&lt;/div&gt;
    &lt;div class="tab-pane fade" id="security"&gt;安全内容面板&lt;/div&gt;
    &lt;div class="tab-pane fade" id="welfare"&gt;公益内容面板&lt;/div&gt;
&lt;/div&gt;
&lt;script&gt;
$(function(){
    $("#myTab a").click(function(e){
        e.preventDefault();
        $(this).tab("show");
    });
    $("#myTab").on("show.bs.tab",function(e){
         $(e.target).css('outline','1px solid black');    
    }).on("hide.bs.tab",function(e){
        $(e.target).css('outline','none');  
    })
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 82px;" src="https://demo.xiaohuochai.site/bootstrap/tab/t5.html" frameborder="0" width="320" height="240"></iframe>

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
<pre>  var Tab = function (element) {
    //指定当前元素
    this.element = $(element)
  }
  //版本号为3.3.7
  Tab.VERSION = '3.3.7'
  //动画时间为150ms
  Tab.TRANSITION_DURATION = 150</pre>
</div>

【3】插件核心代码

```
  //show()方法用于触发show事件，调用activate原型方法，触发shown事件
  Tab.prototype.show = function () {
    //当前tab
    var $this    = this.element
    //找到最近的ul
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    //找到data-target值
    var selector = $this.data('target')
    //如果data-target值不存在，查找href值
    if (!selector) {
      selector = $this.attr('href')
      //IE7特殊处理
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') 
    }
    //如果当前tab已经是活动状态了，即父元素li上已经有active样式的话，直接返回
    if ($this.parent('li').hasClass('active')) return
    //找到上一个元素，即上一个带有active样式的li里的a元素
    var $previous = $ul.find('.active:last a')
    //设置hide事件
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    //设置show事件
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })
    //触发hide事件及show事件
    $previous.trigger(hideEvent)
    $this.trigger(showEvent)
    //如果自定义回调中阻止了默认行为，则不再继续处理
    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return
    //要激活显示的面板，即target或href里的值所对应的元素
    var $target = $(selector)
    //高亮显示当前tab
    this.activate($this.closest('li'), $ul)
    //显示对应的面板，并在回调里触发hidden及shown事件
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }
  //active样式的应用，面板的显示和隐藏，以及tab的高亮与反高亮
  Tab.prototype.activate = function (element, container, callback) {
    //查找当前容器所有有active样式的元素
    var $active    = container.find('> .active')
    //判断是使用回调还是动画
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        //去除其他元素的active样式
        .removeClass('active')
        //包括li元素里面的下拉菜单里的active样式也要去除
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        //给当前被单击的元素添加active高亮样式
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        //如果支持动画，就重绘页面
        element[0].offsetWidth 
        //并添加in样式，去除透明
        element.addClass('in')
      } else {
        //否则删除fade
        element.removeClass('fade')
      }
      //如果单击的是下拉菜单里的项目
      if (element.parent('.dropdown-menu').length) {
        element
          //打到最近的li.dropdown元素进行高亮
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }
      //如果有回调就执行回调
      callback && callback()
    }
    //如果支持动画
    $active.length && transition ?
      $active
        //在动画结束后执行next()
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }
```

【4】jQuery插件定义

<div>
<pre>  function Plugin(option) {
    //根据选择器，遍历所有符合规则的元素
    return this.each(function () {
      var $this = $(this)
      //获取自定义属性bs.tab的值
      var data  = $this.data('bs.tab')
      //如果值不存在，则将Tab实例设置为bs.tab值
      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      //如果option传递了string，则表示要执行某个方法  
      if (typeof option == 'string') data[option]()
    })
  }
  var old = $.fn.tab
  //保留其他库的$.fn.tab代码(如果定义的话)，以便在noConflict之后可以继续使用该老代码
  $.fn.tab             = Plugin
  //重设插件构造器，可以通过该属性获取插件的真实类函数
  $.fn.tab.Constructor = Tab</pre>
</div>

【5】防冲突处理

<div>
<pre>  $.fn.tab.noConflict = function () {
     //恢复以前的旧代码
    $.fn.tab = old
    //将$.fn.tab.noConflict()设置为Bootstrap的Tab插件
    return this
  }</pre>
</div>

【6】绑定触发事件

<div>
<pre>  var clickHandler = function (e) {
    //阻止默认行为
    e.preventDefault()
    //触发show()方法
    Plugin.call($(this), 'show')
  }
  $(document)
    //在document上绑定单击事件
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)</pre>
</div>

