# Bootstrap警告框

&emsp;&emsp;在网站中，网页总是需要和用户一起做沟通与交流。特别是当用户操作上下文为用户提供一些有效的警示框，比如说告诉用户操作成功、操作错误、提示或者警告等。在Bootstrap框架有一个独立的组件，实现类似的效果，这个组件被称为警示框。本文将详细介绍Bootstrap警告框

&nbsp;

### 默认用法

&emsp;&emsp;警告框组件通过提供一些灵活的预定义消息，为常见的用户动作提供反馈消息

&emsp;&emsp;将任意文本和一个可选的关闭按钮组合在一起就能组成一个警告框，`.alert`&nbsp;类是必须要设置的，另外还提供了有特殊意义的4个类（例如，`.alert-success`），代表不同的警告信息

<div>
<pre>.alert {
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid transparent;
  border-radius: 4px;
}
.alert h4 {
  margin-top: 0;
  color: inherit;
}
.alert .alert-link {
  font-weight: bold;
}
.alert &gt; p,
.alert &gt; ul {
  margin-bottom: 0;
}
.alert &gt; p + p {
  margin-top: 5px;
}</pre>
</div>

&emsp;&emsp;警告框没有默认类，只有基类和修饰类。默认的灰色警告框并没有多少意义。所以您使用一种有意义的警告类。目前提供了成功、消息、警告和危险

&emsp;&emsp;1、成功警示框：告诉用户操作成功，在&ldquo;alert&rdquo;样式基础上追加&ldquo;alert-success&rdquo;样式，具体呈现的是背景、边框和文本都是绿色；

&emsp;&emsp;2、信息警示框：给用户提供提示信息，在&ldquo;alert&rdquo;样式基础上追加&ldquo;alert-info&rdquo;样式，具体呈现的是背景、边框和文本都是浅蓝色；

&emsp;&emsp;3、警告警示框：提示用户小心操作（提供警告信息），在&ldquo;alert&rdquo;样式基础上追加&ldquo;alert-warning&rdquo;样式，具体呈现的是背景、边框、文本都是浅黄色；

&emsp;&emsp;4、错误警示框：提示用户操作错误，在&ldquo;alert&rdquo;样式基础上追加&ldquo;alert-danger&rdquo;样式，具体呈现的是背景、边框和文本都是浅红色

<div>
<pre>&lt;div class="alert" role="alert"&gt;基类&lt;/div&gt;
&lt;div class="alert alert-success" role="alert"&gt;成功&lt;/div&gt;
&lt;div class="alert alert-info" role="alert"&gt;信息提示&lt;/div&gt;
&lt;div class="alert alert-warning" role="alert"&gt;警告&lt;/div&gt;
&lt;div class="alert alert-danger" role="alert"&gt;错误&lt;/div&gt; </pre>
</div>

<iframe style="width: 100%; height: 390px;" src="https://demo.xiaohuochai.site/bootstrap/alert/a1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 可关闭

&emsp;&emsp;在平时浏览网页的时候，会发现一些警示框带有关闭按钮，用户一点击关闭按钮就能自动关闭显示的警示框（也就是让警示框隐藏不显示）。在Bootstrap框架中的警示框也具有这样的功能

&emsp;&emsp;只需要在默认的警示框里面添加一个关闭按钮。然后进行三个步骤：

&emsp;&emsp;1、需要在基本警示框&ldquo;alert&rdquo;的基础上添加&ldquo;alert-dismissable&rdquo;样式。

&emsp;&emsp;2、在button标签中加入class="close"类，实现警示框关闭按钮的样式。

&emsp;&emsp;3、要确保关闭按钮元素上设置了自定义属性：data-dismiss="alert"（因为可关闭警示框需要借助于Javascript来检测该属性，从而控制警示框的关闭）

<div>
<pre>.alert-dismissable {
  padding-right: 35px;
}
.alert-dismissable .close {
  position: relative;
  top: -2px;
  right: -21px;
  color: inherit;
}</pre>
</div>
<div>
<pre>&lt;div class="alert alert-success alert-dismissable" role="alert"&gt;
    &lt;button class="close" type="button" data-dismiss="alert"&gt;&times;&lt;/button&gt;
    恭喜您操作成功！
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/bootstrap/alert/a2.html" frameborder="0" width="320" height="240"></iframe>

【外部关闭】

&emsp;&emsp;如果把关闭按钮放置在警告框的外部，则需要设置data-target为'# + 警告框的id'

&emsp;&emsp;这个用法的弊端是按钮本身无法关闭，因为它已经不在警告框内了

<div>
<pre>&lt;button type="button" class="btn" data-dismiss="alert" data-target="#test"&gt;关闭&lt;/button&gt;
&lt;div id="test" class="alert alert-success alert-dismissable" role="alert"&gt;操作成功&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/bootstrap/alert/a3.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;如果想关闭警告框的同时，把按钮也从DOM中删除，如果按钮的class是'btn'，则设置data-target=".btn'则可以把按钮也删除

<div>
<pre>&lt;button type="button" class="btn" data-dismiss="alert" data-target="#test,.btn"&gt;关闭&lt;/button&gt;
&lt;div id="test" class="alert alert-success alert-dismissable" role="alert"&gt;操作成功&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/bootstrap/alert/a4.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 链接

&emsp;&emsp;有时可能想在警示框中加入链接地址，用来告诉用户跳到某一个地方或新的页面。而这个时候又想让用户能明显的看出来这是链接地址。在Bootstrap框架中对警示框里的链接样式做了一个高亮显示处理。为不同类型的警示框内的链接进行了加粗处理，并且颜色相应加深

&emsp;&emsp;Bootstrap框架是通过给警示框加的链接添加一个名为&ldquo;alert-link&rdquo;的类名，通过&ldquo;alert-link&rdquo;样式给链接提供高亮显示&nbsp;

<div>
<pre>.alert .alert-link {
  font-weight: bold;
}
.alert-success .alert-link {
  color: #2b542c;
}
.alert-info .alert-link {
  color: #245269;
}
.alert-warning .alert-link {
  color: #66512c;
}
.alert-danger .alert-link {
  color: #843534;
}</pre>
</div>
<div>
<pre>&lt;div class="alert alert-success" role="alert"&gt;成功 &lt;a href="#" class="alert-link"&gt;详情查看&lt;/a&gt;&lt;/div&gt;
&lt;div class="alert alert-info" role="alert"&gt;信息提示 &lt;a href="#" class="alert-link"&gt;详情查看&lt;/a&gt;&lt;/div&gt;
&lt;div class="alert alert-warning" role="alert"&gt;警告 &lt;a href="#" class="alert-link"&gt;详情查看&lt;/a&gt;&lt;/div&gt;
&lt;div class="alert alert-danger" role="alert"&gt;错误 &lt;a href="#" class="alert-link"&gt;详情查看&lt;/a&gt;&lt;/div&gt; </pre>
</div>

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/bootstrap/alert/a5.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### JS触发

【方法】

**$().alert('close')**

&emsp;&emsp;关闭警告框并从 DOM 中将其删除

<div>
<pre>&lt;div class="alert alert-success alert-dismissable" role="alert"&gt;
    &lt;button class="close" type="button"&gt;&times;&lt;/button&gt;
    恭喜您操作成功！
&lt;/div&gt;
&lt;script&gt;
 $('.close').click(function(){
     $('.alert').alert('close');
 }); 
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 72px;" src="https://demo.xiaohuochai.site/bootstrap/alert/a6.html" frameborder="0" width="320" height="240"></iframe>

【事件】

<div>
<pre>close.bs.alert    当 close 方法被调用后立即触发此事件。
closed.bs.alert    当警告框被关闭后（也即 CSS 过渡效果完毕之后）立即触发此事件。</pre>
</div>
<div>
<pre>&lt;div class="alert alert-success alert-dismissable fade in" data-dismiss="alert" role="alert"&gt;
    &lt;button class="close" type="button"&gt;&times;&lt;/button&gt;
    恭喜您操作成功！
&lt;/div&gt;
&lt;div id="intro"&gt;警告框处于打开状态&lt;/div&gt;
&lt;script&gt;
$('.alert').on('closed.bs.alert', function () {
    $('#intro').html('警告框被关闭了')
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 112px;" src="https://demo.xiaohuochai.site/bootstrap/alert/a7.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;&nbsp;

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
<pre>  //定义选择器，所有符合该自定义属性的元素都可以触发下面的事件
  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    //传入元素，如果元素内部有dismiss设置的自定义属性，则click事件会触发原型上的close方法
    $(el).on('click', dismiss, this.close)
  }
  //版本号为3.3.7
  Alert.VERSION = '3.3.7'
  //动画持续时间为150ms
  Alert.TRANSITION_DURATION = 150</pre>
</div>

【3】插件核心代码

<div>
<pre>  Alert.prototype.close = function (e) {
    //被单击元素的jQuery对象，临时赋值，防止this污染
    var $this    = $(this)
    //获取自定义属性data-target的值
    var selector = $this.attr('data-target')
    //获取没有data-target属性
    if (!selector) {
      //则获取href属性的值
      selector = $this.attr('href')
      //IE7浏览器特殊处理
      selector = selector &amp;&amp; selector.replace(/.*(?=#[^\s]*$)/, '') 
    }
    //获取jQuery对象
    var $parent = $(selector === '#' ? [] : selector)
    //阻止默认行为
    if (e) e.preventDefault()
    //如果该元素不存在
    if (!$parent.length) {
      //存在最近的样式为'.alert'的祖先元素
      $parent = $this.closest('.alert')
    }
    //删除元素前，执行close事件，可以通过自定义绑定来执行定义代码
    $parent.trigger(e = $.Event('close.bs.alert'))
    //如果回调函数中已经包含阻止默认行为的代码，则直接返回
    if (e.isDefaultPrevented()) return
    //删除元素上的in样式
    $parent.removeClass('in')
    function removeElement() {
      //触发closed事件后，删除该元素
      $parent.detach().trigger('closed.bs.alert').remove()
    }
    //如果支持动画，并且设置为fade样式
    $.support.transition &amp;&amp; $parent.hasClass('fade') ?
      //在执行动画过渡效果后，再删除元素
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      //否则直接删除元素
      removeElement()
  }</pre>
</div>

【4】jQuery插件定义

<div>
<pre>  function Plugin(option) {
    //根据选择器，遍历所有符合规则的元素
    return this.each(function () {
      var $this = $(this)
      //获取自定义属性bs.alert的值
      var data  = $this.data('bs.alert')
      //如果值不存在，则将Alert实例设置为bs.alert值
      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      //如果option传递了string，则表示要执行某个方法 
      if (typeof option == 'string') data[option].call($this)
    })
  }
  var old = $.fn.alert
  //保留其他库的$.fn.alert代码(如果定义的话)，以便在noConflict之后可以继续使用该老代码
  $.fn.alert             = Plugin
  //重设插件构造器，可以通过该属性获取插件的真实类函数
  $.fn.alert.Constructor = Alert</pre>
</div>

【5】防冲突处理

<div>
<pre>  $.fn.alert.noConflict = function () {
    //恢复以前的旧代码
    $.fn.alert = old
    //将$.fn.alert.noConflict()设置为Bootstrap的Tab插件
    return this
  }</pre>
</div>

【6】绑定触发事件

<div>
<pre>  //为声明式的HTML绑定单击事件
  //在整个document对象上，检测是否有自定义属性data-dismiss="alert"
  //如果有，则设置单击的时候，关闭指定的警告框元素
  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)</pre>
</div>

&nbsp;