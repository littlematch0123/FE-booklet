# Bootstrap插件概述

&emsp;&emsp;Bootstrap除了包含丰富的Web组件之外，如下拉菜单、按钮组、导航、分页等，还包括一些JavaScript的插件。插件为 Bootstrap 的组件赋予了&ldquo;生命&rdquo;。Bootstrap的JavaScript插件可以单独导入到页面中，也可以一次性导入到页面中。因为在Bootstrap中的JavaScript插件都是依赖于jQuery库，所以不论是单独导入还一次性导入之前必须先导入jQuery库。本文将介绍Bootstrap插件概述

&nbsp;

### 导入

【一次性导入】

&emsp;&emsp;Bootstrap提供了一个单一的文件，这个文件包含了Bootstrap的所有JavaScript插件，即bootstrap.js（压缩版本：bootstrap.min.js）

【单独导入】

&emsp;&emsp;为方便单独导入特效文件，Bootstrap提供了12种JavaScript插件，他们分别是：

&emsp;&emsp;☑ 动画过渡（Transitions）:对应的插件文件&ldquo;transition.js&rdquo;

&emsp;&emsp;☑ 模态弹窗（Modal）:对应的插件文件&ldquo;modal.js&rdquo;

&emsp;&emsp;☑ 下拉菜单（Dropdown）：对应的插件文件&ldquo;dropdown.js&rdquo;

&emsp;&emsp;☑ 滚动侦测（Scrollspy）：对应的插件文件&ldquo;scrollspy.js&rdquo;

&emsp;&emsp;☑ 选项卡（Tab）：对应的插件文件&ldquo;tab.js&rdquo;

&emsp;&emsp;☑ 提示框（Tooltips）：对应的插件文件&ldquo;tooltop.js&rdquo;

&emsp;&emsp;☑ 弹出框（Popover）：对应的插件文件&ldquo;popover.js&rdquo;

&emsp;&emsp;☑ 警告框（Alert）：对应的插件文件&ldquo;alert.js&rdquo;

&emsp;&emsp;☑ 按钮（Buttons）：对应的插件文件&ldquo;button.js&rdquo;

&emsp;&emsp;☑ 折叠/手风琴（Collapse）：对应的插件文件&ldquo;collapse.js&rdquo;

&emsp;&emsp;☑ 图片轮播Carousel：对应的插件文件&ldquo;carousel.js&rdquo;

&emsp;&emsp;☑ 自动定位浮标Affix：对应的插件文件&ldquo;affix.js&rdquo;

&nbsp;

### data属性

&emsp;&emsp;可以仅仅通过 data 属性 API 就能使用所有的 Bootstrap 插件，无需写一行 JavaScript 代码。这是 Bootstrap 中的一等 API，也应该是首选方式。

&emsp;&emsp;话又说回来，在某些情况下可能需要将此功能关闭。因此，还提供了关闭 data 属性 API 的方法，即解除以&nbsp;`data-api`&nbsp;为命名空间并绑定在文档上的事件。就像下面这样：

<div>
<pre>$(document).off('.data-api')</pre>
</div>

&emsp;&emsp;另外，如果是针对某个特定的插件，只需在&nbsp;`data-api`&nbsp;前面添加那个插件的名称作为命名空间，如下：

<div>
<pre>$(document).off('.alert.data-api')</pre>
</div>

&nbsp;

### API

&emsp;&emsp;Bootstrap为所有插件提供了纯 JavaScript 方式的 API。所有公开的 API 都是支持单独或链式调用方式，并且返回其所操作的元素集合，和jQuery的调用形式一致

<div>
<pre>$('.btn.danger').button('toggle').addClass('fat')</pre>
</div>

&emsp;&emsp;所有方法都可以接受一个可选的 option 对象作为参数，或者一个代表特定方法的字符串，或者什么也不提供（在这种情况下，插件将会以默认值初始化）

<div>
<pre>$('#myModal').modal()                      // 以默认值初始化
$('#myModal').modal({ keyboard: false })   // initialized with no keyboard
$('#myModal').modal('show')                // 初始化后立即调用 show 方法</pre>
</div>

&emsp;&emsp;每个插件还通过&nbsp;`Constructor`&nbsp;属性暴露了其原始的构造函数：`$.fn.popover.Constructor`。如果想获取某个插件的实例，可以直接通过页面元素获取：`$('[rel="popover"]').data('popover')`

【默认设置】

&emsp;&emsp;每个插件都可以通过修改其自身的&nbsp;`Constructor.DEFAULTS`&nbsp;对象从而改变插件的默认设置：

<div>
<pre>$.fn.modal.Constructor.DEFAULTS.keyboard = false // 将模态框插件的 `keyboard` 默认选参数置为 false</pre>
</div>

【避免命名空间冲突】

&emsp;&emsp;某些时候可能需要将 Bootstrap 插件与其他 UI 框架共同使用。在这种情况下，命名空间冲突随时可能发生。如果不幸发生了这种情况，可以通过调用插件的&nbsp;`.noConflict`&nbsp;方法恢复其原始值

<div>
<pre>var bootstrapButton = $.fn.button.noConflict() // return $.fn.button to previously assigned value
$.fn.bootstrapBtn = bootstrapButton            // give $().bootstrapBtn the Bootstrap functionality</pre>
</div>

【事件】

&emsp;&emsp;Bootstrap 为大部分插件所具有的动作提供了自定义事件。一般来说，这些事件都有不定式和过去式两种动词的命名形式，例如，不定式形式的动词（例如&nbsp;`show`）表示其在事件开始时被触发；而过去式动词(如`shown`)表示在动作执行完毕之后被触发。

&emsp;&emsp;所有 Bootstrap 事件的名称都采用命名空间方式。所有以不定式形式的动词命名的事件都提供了&nbsp;`preventDefault`&nbsp;功能。这就赋予在动作开始执行前将其停止的能力

<div>
<pre>$('#myModal').on('show.bs.modal', function (e) {
  if (!data) return e.preventDefault() // 阻止模态框的展示
})</pre>
</div>

&nbsp;

### 过渡效果

&emsp;&emsp;Bootstrap框架默认给各个组件提供了基本动画的过渡效果，如果要使用，有两种方法：

&emsp;&emsp;☑&nbsp;调用统一编译的bootstrap.js；

&emsp;&emsp;☑&nbsp;调用单一的过渡动画的JavaScript插件文件transition.js

&emsp;&emsp;transition.js文件为Bootstrap具有过渡动画效果的组件提供了动画过渡效果。不过需要注意的是，这些过渡动画都是采用CSS3来实现的，所以IE6-8浏览器是不具备这些过渡动画效果

&emsp;&emsp;默认情况之下，Bootstrap框架中以下组件使用了过渡动画效果：

&emsp;&emsp;☑&nbsp;模态弹出窗（Modal）的滑动和渐变效果；

&emsp;&emsp;☑&nbsp;选项卡（Tab）的渐变效果；

&emsp;&emsp;☑&nbsp;警告框（Alert）的渐变效果；

&emsp;&emsp;☑&nbsp;图片轮播（Carousel）的滑动效果

&emsp;&emsp;transition.js 是针对&nbsp;`transitionEnd`&nbsp;事件的一个基本辅助工具，也是对 CSS 过渡效果的模拟。它被其它插件用来检测当前浏览器对是否支持 CSS 的过渡效果

&emsp;&emsp;通过下面的代码可以在全局范围禁用过渡效果，并且必须将此代码放在`transition.js(`或`bootstrap.js`或`bootstrap.min.js`)后面，确保在js文件加载完毕后再执行下面代码

<div>
<pre>$.support.transition = false</pre>
</div>
