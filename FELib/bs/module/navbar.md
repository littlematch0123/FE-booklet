# Bootstrap导航条

&emsp;&emsp;导航条（navbar）和[导航](http://www.cnblogs.com/xiaohuochai/p/7111581.html)（nav），就相差一个字，多了一个&ldquo;条&rdquo;字。其实在Bootstrap框架中他们还是明显的区别。在导航条(navbar)中有一个背景色、而且导航条可以是纯链接（类似导航），也可以是表单，还有就是表单和导航一起结合等多种形式。本文将详细介绍Bootstrap导航条

&nbsp;

### 基础导航条

&emsp;&emsp;在Bootstrap框架中，导航条和导航从外观上差别不是太多，但在实际使用中导航条要比导航复杂得多。

&emsp;&emsp;导航条是在应用或网站中作为导航页头的响应式基础组件。它们在移动设备上可以折叠（并且可开可关），且在视口（viewport）宽度增加时逐渐变为水平展开模式&nbsp;

&emsp;&emsp;在制作一个基础导航条时，主要分以下几步：

&emsp;&emsp;1、首先在制作导航的列表(&lt;ul class=&rdquo;nav&rdquo;&gt;)基础上添加类名&ldquo;navbar-nav&rdquo;

&emsp;&emsp;2、在列表外部添加一个容器（div），并且使用类名&ldquo;navbar&rdquo;和&ldquo;navbar-default&rdquo;

【原理分析】

&emsp;&emsp;&ldquo;.navbar&rdquo;样式的主要功能就是设置左右padding和圆角等效果，但它和颜色相关的样式没有进行任何的设置

<div>
<pre>.navbar {
  position: relative;
  min-height: 50px;
  margin-bottom: 20px;
  border: 1px solid transparent;
}</pre>
</div>

&emsp;&emsp;导航条的颜色都是通过&ldquo;.navbar-default&rdquo;来进行控制

<div>
<pre>.navbar-default {
  background-color: #f8f8f8;
  border-color: #e7e7e7;
}</pre>
</div>

&emsp;&emsp;navbar-nav样式是在导航.nav的基础上重新调整了菜单项的浮动与内外边距。同时也不包括颜色等样式设置，而颜色和其他样式是通过配合父容器&ldquo;navbar-default&rdquo;来一起实现

&emsp;&emsp;注意：最好使用&nbsp;&lt;nav&gt;&nbsp;元素，如果使用的是通用的&nbsp;&lt;div&gt;&nbsp;元素的话，务必为导航条设置&nbsp;`role="navigation"`&nbsp;属性，这样能够让使用辅助设备的用户明确知道这是一个导航区域

<div>
<pre>&lt;div class="navbar navbar-default" role="navigation"&gt;
     &lt;ul class="nav navbar-nav"&gt;
         &lt;li class="active"&gt;&lt;a href="##"&gt;网站首页&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="##"&gt;系列教程&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="##"&gt;名师介绍&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="##"&gt;成功案例&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="##"&gt;关于我们&lt;/a&gt;&lt;/li&gt;
     &lt;/ul&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 257px;" src="https://demo.xiaohuochai.site/bootstrap/navbar/n1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 导航条部件

【标题】

&emsp;&emsp;在Web页面制作中，常常在菜单前面都会有一个标题（文字字号比其它文字稍大一些），其实在Bootstrap框架也做了这方面考虑，其通过&ldquo;navbar-header&rdquo;和&ldquo;navbar-brand&rdquo;来实现

<div>
<pre>&lt;div class="navbar navbar-default" role="navigation"&gt;
  　&lt;div class="navbar-header"&gt;
  　    &lt;a href="##" class="navbar-brand"&gt;小火柴的蓝色理想&lt;/a&gt;
  　&lt;/div&gt;
    &lt;ul class="nav navbar-nav"&gt;
       &lt;li class="active"&gt;&lt;a href="##"&gt;HTML&lt;/a&gt;&lt;/li&gt;
       &lt;li&gt;&lt;a href="##"&gt;CSS&lt;/a&gt;&lt;/li&gt;
       &lt;li&gt;&lt;a href="##"&gt;Javascript&lt;/a&gt;&lt;/li&gt;
       &lt;li&gt;&lt;a href="##"&gt;Bootstrap&lt;/a&gt;&lt;/li&gt;
       &lt;li&gt;&lt;a href="##"&gt;jQuery&lt;/a&gt;&lt;/li&gt;
     &lt;/ul&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 320px;" src="https://demo.xiaohuochai.site/bootstrap/navbar/n2.html" frameborder="0" width="320" height="240"></iframe>

【品牌图标】

&emsp;&emsp;将导航条内放置品牌标志的地方替换为&nbsp;&lt;img&gt;&nbsp;元素即可展示自己的品牌图标。由于&nbsp;`.navbar-brand`&nbsp;已经被设置了内补（padding）和高度（height），需要根据自己的情况添加一些 CSS 代码从而覆盖默认设置

<div>
<pre>&lt;div class="navbar navbar-default" role="navigation"&gt;
   &lt;div class="navbar-header"&gt;
      &lt;a class="navbar-brand" style="margin-top:-10px" href="#"&gt;
        &lt;img alt="Brand" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAB+0lEQVR4AcyYg5LkUBhG+1X2PdZGaW3btm3btm3bHttWrPomd1r/2Jn/VJ02TpxcH4CQ/dsuazWgzbIdrm9dZVd4pBz4zx2igTaFHrhvjneVXNHCSqIlFEjiwMyyyOBilRgGSqLNF1jnwNQdIvAt48C3IlBmHCiLQHC2zoHDu6zG1iXn6+y62ScxY9AODO6w0pvAqf23oSE4joOfH6OxfMoRnoGUm+de8wykbFt6wZtA07QwtNOqKh3ZbS3Wzz2F+1c/QJY0UCJ/J3kXWJfv7VhxCRRV1jGw7XI+gcO7rEFFRvdYxydwcPsVsC0bQdKScngt4iUTD4Fy/8p7PoHzRu1DclwmgmiqgUXjD3oTKHbAt869qdJ7l98jNTEblPTkXMwetpvnftA0LLHb4X8kiY9Kx6Q+W7wJtG0HR7fdrtYz+x7iya0vkEtUULIzCjC21wY+W/GYXusRH5kGytWTLxgEEhePPwhKYb7EK3BQuxWwTBuUkd3X8goUn6fMHLyTT+DCsQdAEXNzSMeVPAJHdF2DmH8poCREp3uwm7HsGq9J9q69iuunX6EgrwQVObjpBt8z6rdPfvE8kiiyhsvHnomrQx6BxYUyYiNS8f75H1w4/ISepDZLoDhNJ9cdNUquhRsv+6EP9oNH7Iff2A9g8h8CLt1gH0Qf9NMQAFnO60BJFQe0AAAAAElFTkSuQmCC"&gt;
      &lt;/a&gt;
    &lt;/div&gt;
    &lt;ul class="nav navbar-nav"&gt;
       &lt;li class="active"&gt;&lt;a href="##"&gt;HTML&lt;/a&gt;&lt;/li&gt;
       &lt;li&gt;&lt;a href="##"&gt;CSS&lt;/a&gt;&lt;/li&gt;
       &lt;li&gt;&lt;a href="##"&gt;Javascript&lt;/a&gt;&lt;/li&gt;
       &lt;li&gt;&lt;a href="##"&gt;Bootstrap&lt;/a&gt;&lt;/li&gt;
       &lt;li&gt;&lt;a href="##"&gt;jQuery&lt;/a&gt;&lt;/li&gt;
     &lt;/ul&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 307px;" src="https://demo.xiaohuochai.site/bootstrap/navbar/n3.html" frameborder="0" width="320" height="240"></iframe>

【二级菜单】

&emsp;&emsp;在基础导航条中对菜单提供了当前状态，禁用状态，悬浮状态等效果，而且也可以带有二级菜单的导航条

<div>
<pre>&lt;div class="navbar navbar-default" role="navigation"&gt;
    &lt;ul class="nav navbar-nav"&gt;
         &lt;li class="active"&gt;&lt;a href="##"&gt;网站首页&lt;/a&gt;&lt;/li&gt;
        &lt;li class="dropdown"&gt;
          &lt;a href="##" data-toggle="dropdown" class="dropdown-toggle"&gt;系列教程&lt;span class="caret"&gt;&lt;/span&gt;&lt;/a&gt;
          &lt;ul class="dropdown-menu"&gt;
            &lt;li&gt;&lt;a href="##"&gt;CSS3&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a href="##"&gt;JavaScript&lt;/a&gt;&lt;/li&gt;
            &lt;li class="disabled"&gt;&lt;a href="##"&gt;PHP&lt;/a&gt;&lt;/li&gt;
          &lt;/ul&gt;
       &lt;/li&gt;
       &lt;li&gt;&lt;a href="##"&gt;关于我们&lt;/a&gt;&lt;/li&gt;
    &lt;/ul&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 270px;" src="https://demo.xiaohuochai.site/bootstrap/navbar/n4.html" frameborder="0" width="320" height="240"></iframe>

【部件排列】

&emsp;&emsp;通过添加&nbsp;.navbar-left&nbsp;和&nbsp;.navbar-right工具类让导航链接、表单、按钮或文本对齐。两个类都会通过 CSS 设置特定方向的浮动样式。例如，要对齐导航链接，就要把它们放在个分开的、应用了工具类的&lt;ul&gt;标签里

&emsp;&emsp;这些类是&nbsp;.pull-left&nbsp;和&nbsp;.pull-right&nbsp;的&nbsp;mixin 版本，但是他们被限定在了媒体查询（media query）中，这样可以更容易的在各种尺寸的屏幕上处理导航条组件

&emsp;&emsp;注意：导航条目前不支持多个`.navbar-right`类。为了让内容之间有合适的空隙，最后一个`.navbar-right`元素使用负边距(margin)。如果有多个元素使用这个类，它们的边距(margin)将不能按照预期正常展现

【表单】

&emsp;&emsp;有的导航条中会带有搜索表单，Bootstrap框架中提供了一个&ldquo;navbar-form&rdquo;，使用方法很简单，在navbar容器中放置一个带有navbar-form类名的表单即可

&emsp;&emsp;navbar-left实现左浮动，navbar-right实现右浮动

<div>
<pre>&lt;div class="navbar navbar-default" role="navigation"&gt;
    &lt;ul class="nav navbar-nav"&gt;
       &lt;li class="active"&gt;&lt;a href="##"&gt;HTML&lt;/a&gt;&lt;/li&gt;
       &lt;li&gt;&lt;a href="##"&gt;CSS&lt;/a&gt;&lt;/li&gt;
       &lt;li&gt;&lt;a href="##"&gt;Javascript&lt;/a&gt;&lt;/li&gt;
       &lt;li&gt;&lt;a href="##"&gt;Bootstrap&lt;/a&gt;&lt;/li&gt;
       &lt;li&gt;&lt;a href="##"&gt;jQuery&lt;/a&gt;&lt;/li&gt;
     &lt;/ul&gt;
     &lt;form action="##" class="navbar-form navbar-left" rol="search"&gt;
           &lt;div class="form-group"&gt;
              &lt;input type="text" class="form-control" placeholder="请输入关键词" /&gt;
           &lt;/div&gt;
        &lt;button type="submit" class="btn btn-default"&gt;搜索&lt;/button&gt;
     &lt;/form&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 370px;" src="https://demo.xiaohuochai.site/bootstrap/navbar/n5.html" frameborder="0" width="320" height="240"></iframe>

【按钮】

&emsp;&emsp;对于不包含在&nbsp;&lt;form&gt;&nbsp;中的&nbsp;&lt;button&gt;&nbsp;元素，加上&nbsp;`.navbar-btn`&nbsp;后，可以让它在导航条里垂直居中。有一些对于为辅助设备提供可识别标签的方法，例如，&nbsp;`aria-label`、`aria-labelledby`&nbsp;或者&nbsp;`title`&nbsp;属性。如果这些方法都没有，屏幕阅读器将使用&nbsp;`placeholder`&nbsp;属性（如果这个属性存在的话），但是请注意，使用&nbsp;`placeholder`&nbsp;代替其他识别标签的方式是不推荐的

&emsp;&emsp;注意：就像标准的&nbsp;按钮类&nbsp;一样，`.navbar-btn`&nbsp;可以被用在&nbsp;&lt;a&gt;&nbsp;和&nbsp;&lt;input&gt;&nbsp;元素上。然而，在&nbsp;`.navbar-nav`&nbsp;内，`.navbar-btn`&nbsp;和标准的按钮类都不应该被用在&nbsp;&lt;a&gt;&nbsp;元素上。

<div>
<pre>&lt;div class="navbar navbar-default" role="navigation"&gt;
    &lt;ul class="nav navbar-nav"&gt;
       &lt;li class="active"&gt;&lt;a href="##"&gt;HTML&lt;/a&gt;&lt;/li&gt;
       &lt;li&gt;&lt;a href="##"&gt;CSS&lt;/a&gt;&lt;/li&gt;
       &lt;li&gt;&lt;a href="##"&gt;Javascript&lt;/a&gt;&lt;/li&gt;
     &lt;/ul&gt;
    &lt;button type="button" class="btn btn-default navbar-btn"&gt;Sign in&lt;/button&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 240px;" src="https://demo.xiaohuochai.site/bootstrap/navbar/n6.html" frameborder="0" width="320" height="240"></iframe>

【文本】

&emsp;&emsp;把文本包裹在&nbsp;`.navbar-text`中时，为了有正确的行距和颜色，通常使用&nbsp;&lt;p&gt;&nbsp;标签

<div>
<pre>&lt;div class="navbar navbar-default" role="navigation"&gt;
    &lt;ul class="nav navbar-nav"&gt;
       &lt;li class="active"&gt;&lt;a href="##"&gt;HTML&lt;/a&gt;&lt;/li&gt;
       &lt;li&gt;&lt;a href="##"&gt;CSS&lt;/a&gt;&lt;/li&gt;
       &lt;li&gt;&lt;a href="##"&gt;Javascript&lt;/a&gt;&lt;/li&gt;
     &lt;/ul&gt;
    &lt;p class="navbar-text"&gt;Signed in as huochai&lt;/p&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 230px;" src="https://demo.xiaohuochai.site/bootstrap/navbar/n7.html" frameborder="0" width="320" height="240"></iframe>

【非导航链接】

&emsp;&emsp;可以在标准的导航组件之外添加标准链接，使用&nbsp;`.navbar-link`&nbsp;类可以让链接有正确的默认颜色和反色设置

<div>
<pre>&lt;div class="navbar navbar-default" role="navigation"&gt;
    &lt;ul class="nav navbar-nav"&gt;
       &lt;li class="active"&gt;&lt;a href="##"&gt;HTML&lt;/a&gt;&lt;/li&gt;
       &lt;li&gt;&lt;a href="##"&gt;CSS&lt;/a&gt;&lt;/li&gt;
       &lt;li&gt;&lt;a href="##"&gt;Javascript&lt;/a&gt;&lt;/li&gt;
     &lt;/ul&gt;
    &lt;p class="navbar-text navbar-left"&gt;Signed in as &lt;a href="#" class="navbar-link"&gt;huochai&lt;/a&gt;&lt;/p&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 230px;" src="https://demo.xiaohuochai.site/bootstrap/navbar/n8.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 导航条位置

&emsp;&emsp;很多情况下，设计师希望导航条固定在浏览器顶部或底部，这种固定式导航条的应用在移动端开发中更为常见。Bootstrap框架提供了g两种固定导航条的方式：

&nbsp; &nbsp;☑&nbsp;&nbsp;.navbar-fixed-top：导航条固定在浏览器窗口顶部

&nbsp;&nbsp; ☑&nbsp;&nbsp;.navbar-fixed-bottom：导航条固定在浏览器窗口底部

&emsp;&emsp;使用方法很简单，只需要在制作导航条最外部容器navbar上追加对应的类名即可

&emsp;&emsp;这个固定的导航条会遮住页面上的其它内容，除非给&nbsp;&lt;body&gt;&nbsp;元素底部设置了&nbsp;`padding`。提示：导航条的默认高度是 50px

<div>
<pre>body { padding-top: 70px; }</pre>
<pre>body { padding-bottom: 70px; }</pre>
</div>
<div>
<pre>&lt;body style="padding:70px 0;"&gt;
&lt;nav class="navbar navbar-default navbar-fixed-top"&gt;
    &lt;ul class="nav navbar-nav"&gt;
       &lt;li class="active"&gt;&lt;a href="##"&gt;HTML&lt;/a&gt;&lt;/li&gt;
       &lt;li&gt;&lt;a href="##"&gt;CSS&lt;/a&gt;&lt;/li&gt;
       &lt;li&gt;&lt;a href="##"&gt;Javascript&lt;/a&gt;&lt;/li&gt;
     &lt;/ul&gt;
&lt;/nav&gt;
&lt;p&gt;测试内容&lt;br&gt;&lt;br&gt;测试内容&lt;br&gt;&lt;br&gt;测试内容&lt;br&gt;&lt;br&gt;测试内容&lt;br&gt;&lt;br&gt;测试内容&lt;br&gt;&lt;br&gt;测试内容&lt;br&gt;&lt;br&gt;测试内容&lt;/p&gt;
&lt;nav class="navbar navbar-default navbar-fixed-bottom"&gt;
    &lt;ul class="nav navbar-nav"&gt;
       &lt;li class="active"&gt;&lt;a href="##"&gt;HTML&lt;/a&gt;&lt;/li&gt;
       &lt;li&gt;&lt;a href="##"&gt;CSS&lt;/a&gt;&lt;/li&gt;
       &lt;li&gt;&lt;a href="##"&gt;Javascript&lt;/a&gt;&lt;/li&gt;
     &lt;/ul&gt;
&lt;/nav&gt;</pre>
</div>

【静止在顶部】

&emsp;&emsp;通过添加&nbsp;`.navbar-static-top`&nbsp;类即可创建一个与页面等宽度的导航条，它会随着页面向下滚动而消失

<div>
<pre>&lt;nav class="navbar navbar-default navbar-static-top"&gt;
    &lt;ul class="nav navbar-nav"&gt;
       &lt;li class="active"&gt;&lt;a href="##"&gt;HTML&lt;/a&gt;&lt;/li&gt;
       &lt;li&gt;&lt;a href="##"&gt;CSS&lt;/a&gt;&lt;/li&gt;
       &lt;li&gt;&lt;a href="##"&gt;Javascript&lt;/a&gt;&lt;/li&gt;
     &lt;/ul&gt;
&lt;/nav&gt;
&lt;p&gt;测试内容&lt;br&gt;&lt;br&gt;&lt;br&gt;测试内容&lt;br&gt;&lt;br&gt;&lt;br&gt;测试内容&lt;br&gt;&lt;br&gt;&lt;br&gt;测试内容&lt;br&gt;&lt;br&gt;&lt;br&gt;测试内容&lt;br&gt;&lt;br&gt;&lt;br&gt;测试内容&lt;br&gt;&lt;br&gt;&lt;br&gt;测试内容&lt;/p&gt;</pre>
</div>

&nbsp;

### 响应式导航条

&emsp;&emsp;Bootstrap的响应式导航条实现如下：

&emsp;&emsp;1、保证在窄屏时需要折叠的内容必须包裹在带一个div内，并且为这个div加入collapse、navbar-collapse两个类名。最后为这个div添加一个class类名或者id名

<div>
<pre>&lt;div class="collapse navbar-collapse" id="example"&gt;
    &lt;ul class="nav navbar-nav"&gt;
       &lt;li class="active"&gt;&lt;a href="##"&gt;HTML&lt;/a&gt;&lt;/li&gt;
       &lt;li&gt;&lt;a href="##"&gt;CSS&lt;/a&gt;&lt;/li&gt;
       &lt;li&gt;&lt;a href="##"&gt;Javascript&lt;/a&gt;&lt;/li&gt;
     &lt;/ul&gt;
&lt;/div&gt;</pre>
</div>

&emsp;&emsp;或者

<div>
<pre>&lt;div class="collapse navbar-collapse example"&gt;
    &lt;ul class="nav navbar-nav"&gt;
       &lt;li class="active"&gt;&lt;a href="##"&gt;HTML&lt;/a&gt;&lt;/li&gt;
       &lt;li&gt;&lt;a href="##"&gt;CSS&lt;/a&gt;&lt;/li&gt;
       &lt;li&gt;&lt;a href="##"&gt;Javascript&lt;/a&gt;&lt;/li&gt;
     &lt;/ul&gt;
&lt;/div&gt;</pre>
</div>

&emsp;&emsp;2、保证在窄屏时要显示的图标样式（固定写法）：

<div>
<pre>&lt;button class="navbar-toggle" type="button" data-toggle="collapse"&gt;
  &lt;span class="sr-only"&gt;Toggle Navigation&lt;/span&gt;
  &lt;span class="icon-bar"&gt;&lt;/span&gt;
  &lt;span class="icon-bar"&gt;&lt;/span&gt;
  &lt;span class="icon-bar"&gt;&lt;/span&gt;
&lt;/button&gt;</pre>
</div>

&emsp;&emsp;3、并为button添加data-target=".类名/#id名"，究竞是类名还是id名呢？由需要折叠的div来决定。如

<div>
<pre>&lt;button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#example"&gt;
  &lt;span class="sr-only"&gt;Toggle Navigation&lt;/span&gt;
  &lt;span class="icon-bar"&gt;&lt;/span&gt;
  &lt;span class="icon-bar"&gt;&lt;/span&gt;
  &lt;span class="icon-bar"&gt;&lt;/span&gt;
&lt;/button&gt;</pre>
</div>

&emsp;&emsp;或者，对应class="example"

<div>
<pre>&lt;button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".example"&gt;
  &lt;span class="sr-only"&gt;Toggle Navigation&lt;/span&gt;
  &lt;span class="icon-bar"&gt;&lt;/span&gt;
  &lt;span class="icon-bar"&gt;&lt;/span&gt;
  &lt;span class="icon-bar"&gt;&lt;/span&gt;
&lt;/button&gt;</pre>
</div>
<div>
<pre>&lt;div class="navbar navbar-default" role="navigation"&gt;
  &lt;div class="navbar-header"&gt;
       &lt;button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-responsive-collapse"&gt;
         &lt;span class="sr-only"&gt;Toggle Navigation&lt;/span&gt;
         &lt;span class="icon-bar"&gt;&lt;/span&gt;
         &lt;span class="icon-bar"&gt;&lt;/span&gt;
         &lt;span class="icon-bar"&gt;&lt;/span&gt;
       &lt;/button&gt;
  &lt;/div&gt;
  &lt;div class="collapse navbar-collapse navbar-responsive-collapse"&gt;
    &lt;ul class="nav navbar-nav"&gt;
       &lt;li class="active"&gt;&lt;a href="##"&gt;HTML&lt;/a&gt;&lt;/li&gt;
       &lt;li&gt;&lt;a href="##"&gt;CSS&lt;/a&gt;&lt;/li&gt;
       &lt;li&gt;&lt;a href="##"&gt;Javascript&lt;/a&gt;&lt;/li&gt;
     &lt;/ul&gt;
  &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 238px;" src="https://demo.xiaohuochai.site/bootstrap/navbar/n9.html" frameborder="0" width="320" height="240"></iframe>

![bs_module1](https://pic.xiaohuochai.site/blog/bs_module1.gif)

&nbsp;

### 反色导航条

&emsp;&emsp;反色导航条其实是Bootstrap框架提供的第二种风格的导航条，与默认的导航条相比，使用方法并无区别，只是将navbar-deafult类名换成navbar-inverse。其变化只是导航条的背景色和文本做了修改

<div>
<pre>&lt;div class="navbar navbar-inverse" role="navigation"&gt;
    &lt;ul class="nav navbar-nav"&gt;
       &lt;li class="active"&gt;&lt;a href="##"&gt;HTML&lt;/a&gt;&lt;/li&gt;
       &lt;li&gt;&lt;a href="##"&gt;CSS&lt;/a&gt;&lt;/li&gt;
       &lt;li&gt;&lt;a href="##"&gt;Javascript&lt;/a&gt;&lt;/li&gt;
     &lt;/ul&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 187px;" src="https://demo.xiaohuochai.site/bootstrap/navbar/n10.html" frameborder="0" width="320" height="240"></iframe>

