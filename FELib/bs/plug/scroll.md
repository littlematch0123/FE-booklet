# Bootstrap滚动监控器

&emsp;&emsp;滚动监听插件是用来根据滚动条所处的位置来自动更新导航项的。滚动导航条下面的区域并关注导航项的变化，下拉菜单中的条目也会自动高亮显示。本文将详细介绍Bootstrap滚动监控器

&nbsp;

### 基本用法

&emsp;&emsp;滚动监听插件是根据滚动的位置自动更新导航条中相应的导航项的，该插件可自动检测到达哪个位置了，然后在需要高亮的菜单父元素上加了一个active样式

&emsp;&emsp;如果导航里有下拉菜单，并且滚动区域的内容到达下拉菜单子项所对应的区域，除了子菜单高亮之外，子菜单的父元素(dropdown按钮)也会高亮

&emsp;&emsp;在平时使用的过程中，滚动监听一般有两种用法，一种是固定一个元素的高度，进行滚动，然后对相应的菜单进行高亮显示；另外一种是对整个页面(body)进行滚动监听。两种方式的用法一样，都需要有如下3个步骤：

&emsp;&emsp;1、设置滚动容器，即在所要监听的元素上设置data-target="#selector" data-spy="scroll"属性

&emsp;&emsp;2、设置菜单链接容器，该容器的id(或样式)和data-target属性所对应的选择符要一致

&emsp;&emsp;3、在菜单容器内，必须有.nav样式的元素，并且在其内容有li元素，li内包含的a元素也是可以侦测高亮的菜单链接，即符合.nav li &gt; a这种选择符的条件

&emsp;&emsp;4、无论何种实现方式，滚动监听都需要被监听的组件是&nbsp;`position: relative;`&nbsp;即相对定位方式

【固定元素高度】

<div>
<pre>&lt;div id="myNavbar" class="navbar navbar-default navbar-fixed-top" role="navigation" style="position:relative"&gt;
     &lt;ul class="nav navbar-nav"&gt;
        &lt;li&gt;&lt;a href="#html" tabindex="-1"&gt;HTML&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#css" tabindex="-1"&gt;CSS&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#javascript" tabindex="-1"&gt;javascript&lt;/a&gt;&lt;/li&gt;
     &lt;/ul&gt;
&lt;/div&gt;
&lt;div data-spy="scroll" data-target="#myNavbar" style="margin-top:150px;height:250px;overflow:auto;position:relative"&gt;
    &lt;h4 id="html"&gt;Html&lt;/h4&gt;
    &lt;p&gt;Html内容&lt;/p&gt;
    &lt;br&gt;&lt;p&gt;...&lt;/p&gt;&lt;br&gt;&lt;p&gt;...&lt;/p&gt;&lt;br&gt;&lt;p&gt;...&lt;/p&gt;
    &lt;h4 id="css"&gt;CSS&lt;/h4&gt;
    &lt;p&gt;CSS内容&lt;/p&gt;
    &lt;br&gt;&lt;p&gt;...&lt;/p&gt;&lt;br&gt;&lt;p&gt;...&lt;/p&gt;&lt;br&gt;&lt;p&gt;...&lt;/p&gt;
    &lt;h4 id="javascript"&gt;javascript&lt;/h4&gt;
    &lt;p&gt;javascript内容&lt;/p&gt;
    &lt;br&gt;&lt;p&gt;...&lt;/p&gt;&lt;br&gt;&lt;p&gt;...&lt;/p&gt;&lt;br&gt;&lt;p&gt;...&lt;/p&gt;&lt;br&gt;&lt;p&gt;...&lt;/p&gt;&lt;br&gt;&lt;p&gt;...&lt;/p&gt;&lt;br&gt;&lt;p&gt;...&lt;/p&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 350px;" src="https://demo.xiaohuochai.site/bootstrap/scrollspy/s1.html" frameborder="0" width="320" height="240"></iframe>

【body元素】

<div>
<pre>&lt;body data-spy="scroll" data-target="#myNavbar" style="height:300px;position:relative"&gt;
&lt;div id="myNavbar" class="navbar navbar-default navbar-fixed-top" role="navigation"&gt;
     &lt;ul class="nav navbar-nav"&gt;
        &lt;li&gt;&lt;a href="#html" tabindex="-1"&gt;HTML&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#css" tabindex="-1"&gt;CSS&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#javascript" tabindex="-1"&gt;javascript&lt;/a&gt;&lt;/li&gt;
     &lt;/ul&gt;
&lt;/div&gt;
&lt;h4 id="html" style="margin-top:150px"&gt;Html&lt;/h4&gt;
&lt;p&gt;Html内容&lt;/p&gt;
&lt;br&gt;&lt;p&gt;...&lt;/p&gt;&lt;br&gt;&lt;p&gt;...&lt;/p&gt;&lt;br&gt;&lt;p&gt;...&lt;/p&gt;
&lt;h4 id="css"&gt;CSS&lt;/h4&gt;
&lt;p&gt;CSS内容&lt;/p&gt;
&lt;br&gt;&lt;p&gt;...&lt;/p&gt;&lt;br&gt;&lt;p&gt;...&lt;/p&gt;&lt;br&gt;&lt;p&gt;...&lt;/p&gt;
&lt;h4 id="javascript"&gt;javascript&lt;/h4&gt;
&lt;p&gt;javascript内容&lt;/p&gt;
&lt;br&gt;&lt;p&gt;...&lt;/p&gt;&lt;br&gt;&lt;p&gt;...&lt;/p&gt;&lt;br&gt;&lt;p&gt;...&lt;/p&gt;&lt;br&gt;&lt;p&gt;...&lt;/p&gt;&lt;br&gt;&lt;p&gt;...&lt;/p&gt;&lt;br&gt;&lt;p&gt;...&lt;/p&gt;
&lt;/body&gt;</pre>
</div>

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/bootstrap/scrollspy/s2.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### JS调用

&emsp;&emsp;在Bootstrap框架中，使用JavaScript方法触发滚动监控器相对来说较为简单，只需要指定两个容器的名称即可

<div>
<pre>&lt;div id="myNavbar" class="navbar navbar-default navbar-fixed-top" role="navigation"&gt;
     &lt;ul class="nav navbar-nav"&gt;
        &lt;li&gt;&lt;a href="#html" tabindex="-1"&gt;HTML&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#css" tabindex="-1"&gt;CSS&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#javascript" tabindex="-1"&gt;javascript&lt;/a&gt;&lt;/li&gt;
     &lt;/ul&gt;
&lt;/div&gt;
&lt;div id="scrollspy"  style="margin-top:150px;height:250px;overflow:auto;position:relative"&gt;
    &lt;h4 id="html"&gt;Html&lt;/h4&gt;
    &lt;p&gt;Html内容&lt;/p&gt;
    &lt;br&gt;&lt;p&gt;...&lt;/p&gt;&lt;br&gt;&lt;p&gt;...&lt;/p&gt;&lt;br&gt;&lt;p&gt;...&lt;/p&gt;
    &lt;h4 id="css"&gt;CSS&lt;/h4&gt;
    &lt;p&gt;CSS内容&lt;/p&gt;
    &lt;br&gt;&lt;p&gt;...&lt;/p&gt;&lt;br&gt;&lt;p&gt;...&lt;/p&gt;&lt;br&gt;&lt;p&gt;...&lt;/p&gt;
    &lt;h4 id="javascript"&gt;javascript&lt;/h4&gt;
    &lt;p&gt;javascript内容&lt;/p&gt;
    &lt;br&gt;&lt;p&gt;...&lt;/p&gt;&lt;br&gt;&lt;p&gt;...&lt;/p&gt;&lt;br&gt;&lt;p&gt;...&lt;/p&gt;&lt;br&gt;&lt;p&gt;...&lt;/p&gt;&lt;br&gt;&lt;p&gt;...&lt;/p&gt;&lt;br&gt;&lt;p&gt;...&lt;/p&gt;
&lt;/div&gt;
&lt;script&gt;
$('#scrollspy').scrollspy({ target: '#myNavbar' })    
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 400px;" src="https://demo.xiaohuochai.site/bootstrap/scrollspy/s3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 方法

&emsp;&emsp;当使用滚动监听插件的同时在 DOM 中添加或删除元素后，需要像下面这样调用此刷新（ refresh） 方法&nbsp;

<div>
<pre>$('[data-spy="scroll"]').each(function () {
  var $spy = $(this).scrollspy('refresh')
})</pre>
</div>

&emsp;&emsp;要注意的是，这种refresh方法只对声明式用法有效。如果使用的是JS触发，并且需要刷新DOM，则需要重新应用该插件；或者从data-scrollspy属性上获取该实例，然后再调用refresh方法

【参数】

&emsp;&emsp;可以通过 data 属性或 JavaScript 传递参数。对于 data 属性，其名称是将参数名附着到&nbsp;`data-`&nbsp;后面组成，例如&nbsp;`data-offset=""`

&emsp;&emsp;滚动监控提供了一个offset参数，此参数默认值为10。默认情况下，滚动内容距离滚动容器10px以内的话，就高亮显示所对应的菜单项

【事件】

&emsp;&emsp;滚动监控也支持事件的订阅和触发功能，目前只支持一个activate事件

<div>
<pre>activate.bs.scrollspy    每当一个新条目被激活后都将由滚动监听插件触发此事件。</pre>
</div>
<div>
<pre>&lt;div id="myNavbar" class="navbar navbar-default navbar-fixed-top" role="navigation"&gt;
     &lt;ul class="nav navbar-nav"&gt;
        &lt;li&gt;&lt;a href="#html" tabindex="-1"&gt;HTML&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#css" tabindex="-1"&gt;CSS&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#javascript" tabindex="-1"&gt;javascript&lt;/a&gt;&lt;/li&gt;
     &lt;/ul&gt;
&lt;/div&gt;
&lt;div id="scrollspy" data-spy="scroll" data-target="#myNavbar"  data-offset="0" style="margin-top:150px;height:250px;overflow:auto;position;relative"&gt;
    &lt;h4 id="html"&gt;Html&lt;/h4&gt;
    &lt;p&gt;Html内容&lt;/p&gt;
    &lt;br&gt;&lt;p&gt;...&lt;/p&gt;&lt;br&gt;&lt;p&gt;...&lt;/p&gt;&lt;br&gt;&lt;p&gt;...&lt;/p&gt;
    &lt;h4 id="css"&gt;CSS&lt;/h4&gt;
    &lt;p&gt;CSS内容&lt;/p&gt;
    &lt;br&gt;&lt;p&gt;...&lt;/p&gt;&lt;br&gt;&lt;p&gt;...&lt;/p&gt;&lt;br&gt;&lt;p&gt;...&lt;/p&gt;
    &lt;h4 id="javascript"&gt;javascript&lt;/h4&gt;
    &lt;p&gt;javascript内容&lt;/p&gt;
    &lt;br&gt;&lt;p&gt;...&lt;/p&gt;&lt;br&gt;&lt;p&gt;...&lt;/p&gt;&lt;br&gt;&lt;p&gt;...&lt;/p&gt;&lt;br&gt;&lt;p&gt;...&lt;/p&gt;&lt;br&gt;&lt;p&gt;...&lt;/p&gt;&lt;br&gt;&lt;p&gt;...&lt;/p&gt;
&lt;/div&gt;
&lt;script&gt;
$(function(){
    $("#myNavbar").on('activate.bs.scrollspy',function(e){
        $(e.target).siblings().css('outline','none')
            .end().css('outline','1px solid black');    
    })
})    
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 400px;" src="https://demo.xiaohuochai.site/bootstrap/scrollspy/s4.html" frameborder="0" width="320" height="240"></iframe>

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
<pre>  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    //判断滚动容器是否是body，如果是则使用window，如果不是则使用该元素本身
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    //将默认值和传进来的options参数合并，后者优先级高
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    //如果option里设置了target，即data-target有值，则优先使用
    //如果没有，则查找通过.nav样式的子元素，即.nav样式内的li子元素内的a链接，作为菜单容器
    this.selector       = (this.options.target || '') + ' .nav li &gt; a'
    this.offsets        = []
    this.targets        = []
    //高亮显示的菜单
    this.activeTarget   = null
    this.scrollHeight   = 0
    //给滚动容器绑定滚动事件
    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    //计算当前页面内所有滚动容器内的id集合和每个id元素距离浏览器顶部的像素距离
    this.refresh()
    //开始正式处理
    this.process()
  }
  //版本是3.3.7
  ScrollSpy.VERSION  = '3.3.7'
  //默认值为offset：10
  ScrollSpy.DEFAULTS = {
    offset: 10
  }</pre>
</div>

【3】插件核心代码

```
  //获取滚动容器的滚动高度
  ScrollSpy.prototype.getScrollHeight = function () {
    //获取特定滚动容器的滚动高度，如果没有则获取body元素的滚动高度
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }
  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0
    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)
        //返回一个二维数组，每个滚动容器内的id对象到页面顶部的距离以及高亮菜单容器里所对应的href值
        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        //收集所有的偏移值，也就是距离top的距离
        that.offsets.push(this[0])
        //收集菜单容器里的所有href值，也就是滚动容器里的id值
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    //获取滚动容器的scrollTop，再加上设置的offset值
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    //获取滚动高度
    var scrollHeight = this.getScrollHeight()
    //最大滚动=总scrollheight + 设置的offset值 - 设置高度height
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i
    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }
    //如果超过了最大滚动，说明已经滚动到底了
    if (scrollTop >= maxScroll) {
      //如果最后一个元素还没有高亮，则设置最后一个元素高亮
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }
    //倒序遍历所有元素的offset
    for (i = offsets.length; i--;) {
      //如果i元素不等于当前高亮元素
      activeTarget != targets[i]
        //滚动高度 大于 i元素的offsets
        && scrollTop >= offsets[i]
        //i+1元素不存在，或者i+1元素大于滚动高度
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        //则设置i为高亮元素
        && this.activate(targets[i])
    }
  }

  //设置高亮菜单元素
  ScrollSpy.prototype.activate = function (target) {
    //赋值实例属性
    this.activeTarget = target

    this.clear()
    //查找菜单中符合[data-target+"#' + 所高亮元素的id + '"]属性的元素
    //或者href值是#' +  所高亮元素的id + '的话，也可以
    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'
    //查找父元素li，然后添加active高亮样式
    var active = $(selector)
      .parents('li')
      .addClass('active')
    //如果li元素的父元素有dropdown-menu样式，则表示是一个dropdown下拉菜单
    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        //则需要给dropdown的li元素也加上active高亮样式
        .addClass('active')
    }
    //触发自定义高亮事件
    active.trigger('activate.bs.scrollspy')
  }
  
  //删除其他高亮元素的active样式
  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }
```


【4】jQuery插件定义

```
  function Plugin(option) {
    //根据选择器，遍历所有符合规则的元素
    return this.each(function () {
      var $this   = $(this)
      //获取自定义属性bs.scrollspy的值
      var data    = $this.data('bs.scrollspy')
      //如果option参数是对象，则作为ScrollSpy的参数传入
      var options = typeof option == 'object' && option
      //如果值不存在，则将ScrollSpy实例设置为bs.scrollSpy值
      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      //如果option传递了string，则表示要执行某个方法
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy
  //保留其他库的$.fn.scrollspy代码(如果定义的话)，以便在noConflict之后可以继续使用该老代码
  $.fn.scrollspy             = Plugin
  //重设插件构造器，可以通过该属性获取插件的真实类函数
  $.fn.scrollspy.Constructor = ScrollSpy
```

【5】防冲突处理

<div>
<pre>  $.fn.scrollspy.noConflict = function () {
     //恢复以前的旧代码
    $.fn.scrollspy = old
    //将$.fn.scrollspy.noConflict()设置为Bootstrap的Scrollspy插件
    return this
  }</pre>
</div>

【6】绑定触发事件

<div>
<pre>  $(window).on('load.bs.scrollspy.data-api', function () {
    //遍历所有符合条件的滚动容器
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      //执行scrollspy插件，并传入滚动容器上设置的自定义参数(data-开头)
      Plugin.call($spy, $spy.data())
    })
  })</pre>
</div>

