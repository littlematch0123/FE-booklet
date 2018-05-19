# Bootstrap图标

&emsp;&emsp;小图标icon是一个优秀Web中不可缺少的一部分，起到画龙点睛的效果。在Bootstrap框架中也为大家提供了250多个不同的icon图片。本文将详细介绍Bootstrap图标

&nbsp;

### 原理分析

&emsp;&emsp;Bootstrap框架中的图标都是[字体图标](http://www.cnblogs.com/xiaohuochai/p/4986285.html#anchor9)，其实现原理就是通过@font-face属性加载了字体

<div>
<pre>@font-face {
font-family: 'Glyphicons Halflings';
src: url('../fonts/glyphicons-halflings-regular.eot');
src: url('../fonts/glyphicons-halflings-regular.eot?#iefix') format('embedded-opentype'), url('../fonts/glyphicons-halflings-regular.woff') format('woff'), url('../fonts/glyphicons-halflings-regular.ttf') format('truetype'), url('../fonts/glyphicons-halflings-regular.svg#glyphicons_halflingsregular') format('svg');
}</pre>
</div>

&emsp;&emsp;自定义完字体之后，需要对icon设置一个默认样式，在Bootstrap框架中是通过给元素添加&ldquo;glyphicon&rdquo;类名来实现，然后通过伪元素&ldquo;:before&rdquo;的&ldquo;content&rdquo;属性调取对应的icon编码

<div>
<pre>.glyphicon {
    position: relative;
    top: 1px;
    display: inline-block;
    font-family: 'Glyphicons Halflings';
    font-style: normal;
    font-weight: normal;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.glyphicon-asterisk:before {
    content: "\2a";
}</pre>
</div>

&nbsp;

### 使用

&emsp;&emsp;所有icon都是以&rdquo;glyphicon-&rdquo;前缀的类名开始，然后后缀表示图标的名称，详细情况[移步至此](http://getbootstrap.com/components/#glyphicons)，所有图标都需要一个基类和对应每个图标的类

&emsp;&emsp;在网页中使用图标非常的简单，在任何内联元素上应用所对应的样式即可

<div>
<pre>&lt;span class="glyphicon glyphicon-search"&gt;&lt;/span&gt;
&lt;span class="glyphicon glyphicon-ok"&gt;&lt;/span&gt;
&lt;span class="glyphicon glyphicon-remove"&gt;&lt;/span&gt;
&lt;span class="glyphicon glyphicon-plus"&gt;&lt;/span&gt;
&lt;span class="glyphicon glyphicon-cloud"&gt;&lt;/span&gt;
&lt;span class="glyphicon glyphicon-heart"&gt;&lt;/span&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/bootstrap/icon/i1.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;为了设置正确的内边距（padding），务必在图标和文本之间添加一个空格

<div>
<pre>&lt;button type="button" class="btn btn-default btn-lg"&gt;
  &lt;span class="glyphicon glyphicon-star" aria-hidden="true"&gt;&lt;/span&gt; Star
&lt;/button&gt;</pre>
</div>

<iframe style="width: 100%; height: 76px;" src="https://demo.xiaohuochai.site/bootstrap/icon/i2.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;注意：图标类最好应用在不包含任何文本内容或子元素的元素上。图标类不能和其它组件直接联合使用。它们不能在同一个元素上与其他类共同存在。应该创建一个嵌套的&nbsp;&lt;span&gt;&nbsp;标签，并将图标类应用到这个&nbsp;&lt;span&gt;&nbsp;标签上

&nbsp;

### 可访问性

&emsp;&emsp;现代的辅助技术能够识别并朗读由 CSS 生成的内容和特定的 Unicode 字符。为了避免屏幕识读设备抓取非故意的和可能产生混淆的输出内容（尤其是当图标纯粹作为装饰用途时），为这些图标设置了&nbsp;`aria-hidden="true"`&nbsp;属性。

&emsp;&emsp;如果使用图标是为了表达某些含义（不仅仅是为了装饰用），请确保所要表达的意思能够通过被辅助设备识别，例如，包含额外的内容并通过&nbsp;`.sr-only`&nbsp;类让其在视觉上表现出隐藏的效果。

&emsp;&emsp;如果所创建的组件不包含任何文本内容（例如，&nbsp;&lt;button&gt;&nbsp;内只包含了一个图标），应当提供其他的内容来表示这个控件的意图，这样就能让使用辅助设备的用户知道其作用了。这种情况下，可以为控件添加&nbsp;`aria-label`&nbsp;属性

<div>
<pre>&lt;div class="alert alert-danger" role="alert"&gt;
  &lt;span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"&gt;&lt;/span&gt;
  &lt;span class="sr-only"&gt;Error:&lt;/span&gt;
  Enter a valid email address
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 76px;" src="https://demo.xiaohuochai.site/bootstrap/icon/i3.html" frameborder="0" width="320" height="240"></iframe>

