# Bootstrap按钮插件

&emsp;&emsp;按钮插件提供了一组可以控制按钮多种状态的功能，比如按钮的禁用状态、正在加载状态、正常状态等。本文将详细介绍Bootstrap按钮插件

&nbsp;

### 加载状态

&emsp;&emsp;通过按钮可以设计状态提示，当单击按钮时，会显示loading状态信息。例如，点击&ldquo;加载&rdquo;按钮，会触发按钮的加载的状态

&emsp;&emsp;通过添加&nbsp;`data-loading-text="Loading..."`&nbsp;可以为按钮设置正在加载的状态，但从 v3.3.5 版本开始，此特性不再建议使用，并且已经在 v4 版本中删除了

&emsp;&emsp;注意：如果不设置`data-loading-text`，则按钮文本在Loading状态时，默认显示的是'loading...'

<div>
<pre>&lt;button class="btn btn-primary" data-loading-text="正在加载中,请稍等..." type="button" id="loaddingBtn"&gt;加载&lt;/button&gt;
&lt;script&gt;
$(function(){
    $("#loaddingBtn").click(function () {
        var $btn = $(this).button("loading");
        setTimeout(function(){
            $btn.button('reset')
        },1000);
      });
});    
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/bootstrap/button/b1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 模拟单选

&emsp;&emsp;模拟单选按钮是通过一组按钮来实现单选择操作。使用按钮组来模拟单选按钮组，能够让设计更具个性化，可以定制出更美观的单选按钮组

&emsp;&emsp;在Bootstrap框架中按钮插件中，可以通过给按钮组自定义属性`data-toggle="buttons"`

<div>
<pre>&lt;div class="btn-group" data-toggle="buttons"&gt;
    &lt;label class="btn btn-primary"&gt;
        &lt;input type="radio" name="options" id="options1"&gt;男
    &lt;/label&gt;
    &lt;label class="btn btn-primary"&gt;
        &lt;input type="radio" name="options" id="options2"&gt;女
    &lt;/label&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/bootstrap/button/b2.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 模拟多选

&emsp;&emsp;使用按钮组来模拟复选按钮和模拟单选按钮是一样的，具有同等效果，也是通过在按钮组上自定义`data-toggle="buttons"`来实现。唯一不同的是，将input[type="radio"]换成input[type="checkbox"]

<div>
<pre>&lt;div class="btn-group" data-toggle="buttons"&gt;
    &lt;label class="btn btn-primary"&gt;
        &lt;input type="checkbox" name="options" id="options1"&gt;电影
    &lt;/label&gt;
    &lt;label class="btn btn-primary"&gt;
        &lt;input type="checkbox" name="options" id="options2"&gt;音乐
    &lt;/label&gt;
    &lt;label class="btn btn-primary"&gt;
        &lt;input type="checkbox" name="options" id="options3"&gt;游戏
    &lt;/label&gt;
    &lt;label class="btn btn-primary"&gt;
        &lt;input type="checkbox" name="options" id="options4"&gt;摄影
    &lt;/label&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/bootstrap/button/b3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 按钮状态

&emsp;&emsp;使用&nbsp;data-toggle&nbsp;属性还可以激活按钮的行为状态，实现在激活和未激活之间进行状态切换。单击时将按钮激活，再单击可以让按钮恢复到默认状态

<div>
<pre>&lt;button type="button" data-toggle="button" class="btn btn-primary"&gt;有状态的按钮&lt;/button&gt;
&lt;button type="button" class="btn btn-primary"&gt;普通按钮&lt;/button&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/bootstrap/button/b4.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### JS触发

&emsp;&emsp;按钮插件可以通过调用button函数，然后给button函数传入具体的参数，实现不同的效果。而其中有两个参数是固定不变的，即toggle和reset。其他的都可以随意定义：

<div>
<pre>$("#mybutton").button("toggle");//反转按钮状态
$("#mybutton").button("reset");//重置按钮状态
$("#mybutton").button("任意字符参数名");//替换 data-任意字符参数名-text 的属性值为&ldquo;按钮上显示的文本值</pre>
</div>
<div>
<pre>&lt;button class="btn btn-primary" data-complete-text="加载完成" type="button" id="mybutton"&gt;加载&lt;/button&gt;
&lt;script&gt;
$(function(){
    $("#mybutton").click(function () {
        var $btn = $(this).button("loading");
        setTimeout(function(){
            $btn.button('complete');
        },1000);
      });
});    
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/bootstrap/button/b5.html" frameborder="0" width="320" height="240"></iframe>

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
<pre>  var Button = function (element, options) {
    //要触发的元素
    this.$element  = $(element)
    //合并参数
    this.options   = $.extend({}, Button.DEFAULTS, options)
    //是否是加载状态
    this.isLoading = false
  }
  //版本号为3.3.7
  Button.VERSION  = '3.3.7'
  //默认loadinf时的文本内容为'loading...'
  Button.DEFAULTS = {
    loadingText: 'loading...'
  }</pre>
</div>

【3】插件核心代码

```
  //设置按钮状态的方法
  Button.prototype.setState = function (state) {
    //按钮需要禁用时使用它，先赋值一个临时变量
    var d    = 'disabled'
    //当前元素
    var $el  = this.$element
    //如果是input，则使用val获取值，否则，使用html获取值
    var val  = $el.is('input') ? 'val' : 'html'
    //获取当前元素的自定义属性，所有以data-开头的属性
    var data = $el.data()
    //组装需要用到的属性，如传入loading，则组装成loadingText
    state += 'Text'
    //如果data里不包含data-reset-text值，则将当前元素的值临时存放，以便过后再恢复使用它
    if (data.resetText == null) $el.data('resetText', $el[val]())

    //不阻止事件，以允许表单的提交
    setTimeout($.proxy(function () {
      //给元素赋值，如果是元素默认没有值，则从options里查询，否则，从自定义属性里查询
      $el[val](data[state] == null ? this.options[state] : data[state])
      //如果传入的是loading
      if (state == 'loadingText') {
        //设置加载状态为true
        this.isLoading = true
        //禁用该元素(即添加disabled样式和disabled属性)
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        //如果不是，则删除disabled样式和disabled属性
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }
  //切换按钮状态
  Button.prototype.toggle = function () {
    //设置change标记
    var changed = true
    //查找带有[data-toggle="buttons"]属性的最近父元素
    var $parent = this.$element.closest('[data-toggle="buttons"]')
    //如果父元素存在
    if ($parent.length) {
      //查找触发元素内是否存在input元素
      var $input = this.$element.find('input')
      //如果是单选按钮
      if ($input.prop('type') == 'radio') {
        //如果被选中，则设置changed为false
        if ($input.prop('checked')) changed = false
        //查找同级元素是否有active样式，如果有，则删除active样式
        $parent.find('.active').removeClass('active')
        //给当前元素添加active样式
        this.$element.addClass('active')
      //如果是多选按钮
      } else if ($input.prop('type') == 'checkbox') {
        //如果多选按钮选中了，但元素没有active样式
        //或者多选按钮没有选中，但元素却有active样式，则设置changed为false
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        //重置元素的active样式
        this.$element.toggleClass('active')
      }
      //将多选按钮的checked设置为是否有active样式
      $input.prop('checked', this.$element.hasClass('active'))
      //如果changed为true，则触发change事件
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      //重置元素的active样式
      this.$element.toggleClass('active')
    }
  }
```

【4】jQuery插件定义

<div>
<pre>  function Plugin(option) {
    //根据选择器，遍历所有符合规则的元素
    return this.each(function () {
      var $this   = $(this)
      //获取自定义属性bs.button的值
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' &amp;&amp; option
      //如果值不存在，则将Button实例设置为bs.button值
      if (!data) $this.data('bs.button', (data = new Button(this, options)))
      //如果option是toggle，则直接调用该方法  
      if (option == 'toggle') data.toggle()
      //否则调用setState()方法
      else if (option) data.setState(option)
    })
  }
  var old = $.fn.button
  //保留其他库的$.fn.button代码(如果定义的话)，以便在noConflict之后可以继续使用该老代码
  $.fn.button             = Plugin
  //重设插件构造器，可以通过该属性获取插件的真实类函数
  $.fn.button.Constructor = Button</pre>
</div>

【5】防冲突处理

<div>
<pre>  $.fn.button.noConflict = function () {
    //恢复以前的旧代码
    $.fn.button = old
    //将$.fn.button.noConflict()设置为Bootstrap的Tab插件
    return this
  }</pre>
</div>

【6】绑定触发事件

<div>
<pre>  $(document)
    //查询所有以button开头，data-toggle属性的值，绑定click事件
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      //查找当前单击对象的最近的有btn样式的父元素
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      //如果单击对象不是单选或多选按钮
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        //阻止默认行为
        e.preventDefault()
        //如果$btn是单选或多选按钮，触发focus事件
        if ($btn.is('input,button')) $btn.trigger('focus')
        //否则，找到子元素中的第一个具有visible状态的input或button，触发focus事件
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    //查询所有以button开头，data-toggle属性的值，绑定focus事件
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })</pre>
</div>

