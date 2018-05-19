# Bootstrap表单

&emsp;&emsp;表单是用来与用户做交流的一个网页控件，良好的表单设计能够让网页与用户更好的沟通。表单中常见的元素主要包括：文本输入框、下拉选择框、单选按钮、复选按钮、文本域和按钮等。其中每个控件所起的作用都各不相同，而且不同的浏览器对表单控件渲染的风格都各有不同。

&emsp;&emsp;同样，表单也是Bootstrap框架中的核心内容，本文将详细介绍Bootstrap的表单

&nbsp;

### 基础表单

&emsp;&emsp;对于基础表单，Bootstrap并未对其做太多的定制性效果设计，仅仅对表单内的fieldset、legend、label标签进行了定制

<div>
<pre>fieldset {
&emsp;&emsp;min-width: 0;
&emsp;&emsp;padding: 0;
&emsp;&emsp;margin: 0;
&emsp;&emsp;border: 0;
}
legend {
&emsp;&emsp;display: block;
&emsp;&emsp;width: 100%;
&emsp;&emsp;padding: 0;
&emsp;&emsp;margin-bottom: 20px;
&emsp;&emsp;font-size: 21px;
&emsp;&emsp;line-height: inherit;
&emsp;&emsp;color: #333;
&emsp;&emsp;border: 0;
&emsp;&emsp;border-bottom: 1px solid #e5e5e5;
}

label {
&emsp;&emsp;display: inline-block;
&emsp;&emsp;margin-bottom: 5px;
&emsp;&emsp;font-weight: bold;
}</pre>
</div>

&emsp;&emsp;主要将这些元素的margin、padding和border等进行了细化设置

&emsp;&emsp;当然表单除了这几个元素之外，还有input、select、textarea等元素，在Bootstrap框架中，通过定制了一个类名`form-control`，也就是说，如果这几个元素使用了类名&ldquo;form-control&rdquo;，将会实现一些设计上的定制效果

&emsp;&emsp;1、宽度变成了100%

&emsp;&emsp;2、设置了一个浅灰色（#ccc）的边框

&emsp;&emsp;3、具有4px的圆角

&emsp;&emsp;4、设置阴影效果，并且元素得到焦点之时，阴影和边框效果会有所变化

&emsp;&emsp;5、设置了placeholder的颜色为#999

<div>
<pre>&lt;form&gt;
  &lt;div class="form-group"&gt;
    &lt;label for="exampleInputEmail1"&gt;Email address&lt;/label&gt;
    &lt;input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email"&gt;
  &lt;/div&gt;
  &lt;div class="form-group"&gt;
    &lt;label for="exampleInputPassword1"&gt;Password&lt;/label&gt;
    &lt;input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"&gt;
  &lt;/div&gt;
  &lt;div class="form-group"&gt;
    &lt;label for="exampleInputFile"&gt;File input&lt;/label&gt;
    &lt;input type="file" id="exampleInputFile"&gt;
    &lt;p class="help-block"&gt;Example block-level help text here.&lt;/p&gt;
  &lt;/div&gt;
  &lt;div class="checkbox"&gt;
    &lt;label&gt;
      &lt;input type="checkbox"&gt; Check me out
    &lt;/label&gt;
  &lt;/div&gt;
  &lt;button type="submit" class="btn btn-default"&gt;Submit&lt;/button&gt;
&lt;/form&gt;</pre>
</div>

<iframe style="width: 100%; height: 332px;" src="https://demo.xiaohuochai.site/bootstrap/form/f1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 水平表单

&emsp;&emsp;Bootstrap框架默认的表单是垂直显示风格，但很多时候我们需要的水平表单风格

&emsp;&emsp;通过为表单添加 `.form-horizontal` 类，并联合使用 Bootstrap 预置的栅格类，可以将 `label` 标签和控件组水平并排布局。这样做将改变 `.form-group` 的行为，使其表现为栅格系统中的行（row），因此就无需再额外添加 `.row` 了

&emsp;&emsp;在&lt;form&gt;元素上使用类名&ldquo;form-horizontal&rdquo;主要有以下几个作用：

&emsp;&emsp;1、设置表单控件padding和margin值

&emsp;&emsp;2、改变&ldquo;form-group&rdquo;的表现形式，类似于网格系统的&ldquo;row&rdquo;

<div>
<pre>&lt;form class="form-horizontal"&gt;
  &lt;div class="form-group"&gt;
    &lt;label for="inputEmail3" class="col-sm-2 control-label"&gt;Email&lt;/label&gt;
    &lt;div class="col-sm-10"&gt;
      &lt;input type="email" class="form-control" id="inputEmail3" placeholder="Email"&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="form-group"&gt;
    &lt;label for="inputPassword3" class="col-sm-2 control-label"&gt;Password&lt;/label&gt;
    &lt;div class="col-sm-10"&gt;
      &lt;input type="password" class="form-control" id="inputPassword3" placeholder="Password"&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="form-group"&gt;
    &lt;div class="col-sm-offset-2 col-sm-10"&gt;
      &lt;div class="checkbox"&gt;
        &lt;label&gt;
          &lt;input type="checkbox"&gt; Remember me
        &lt;/label&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="form-group"&gt;
    &lt;div class="col-sm-offset-2 col-sm-10"&gt;
      &lt;button type="submit" class="btn btn-default"&gt;Sign in&lt;/button&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/form&gt;</pre>
</div>

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/bootstrap/form/f2.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 内联表单

&emsp;&emsp;有时候我们需要将表单的控件都在一行内显示。在Bootstrap框架中实现这样的表单效果是轻而易举的，只需要在&lt;form&gt;元素中添加类名&ldquo;form-inline&rdquo;即可。内联表单实现原理非常简单，欲将表单控件在一行显示，就需要将表单控件设置成内联块元素（display:inline-block）

&emsp;&emsp;为 &lt;form&gt; 元素添加 .form-inline 类可使其内容左对齐并且表现为 inline-block 级别的控件。只适用于视口（viewport）至少在 768px 宽度时（视口宽度再小的话就会使表单折叠）

&emsp;&emsp;在 Bootstrap 中，输入框和单选/多选框控件默认被设置为&nbsp;`width: 100%;`&nbsp;宽度。在内联表单，我们将这些元素的宽度设置为&nbsp;`width: auto;`，因此，多个控件可以排列在同一行。根据布局需求，可能需要一些额外的定制化组件

&emsp;&emsp;如果没有为每个输入控件设置&nbsp;`label`&nbsp;标签，屏幕阅读器将无法正确识别。对于这些内联表单，可以通过为&nbsp;`label`&nbsp;设置&nbsp;`.sr-only`&nbsp;类将其隐藏。还有一些辅助技术提供label标签的替代方案，比如&nbsp;`aria-label`、`aria-labelledby`&nbsp;或&nbsp;`title`&nbsp;属性。如果这些都不存在，屏幕阅读器可能会采取使用&nbsp;`placeholder`&nbsp;属性，如果存在的话，使用占位符来替代其他的标记，但要注意，这种方法是不妥当的

<div>
<pre>&lt;form class="form-inline"&gt;
  &lt;div class="form-group"&gt;
    &lt;label for="exampleInputName2"&gt;Name&lt;/label&gt;
    &lt;input type="text" class="form-control" id="exampleInputName2" placeholder="Jane Doe"&gt;
  &lt;/div&gt;
  &lt;div class="form-group"&gt;
    &lt;label for="exampleInputEmail2"&gt;Email&lt;/label&gt;
    &lt;input type="email" class="form-control" id="exampleInputEmail2" placeholder="jane.doe@example.com"&gt;
  &lt;/div&gt;
  &lt;button type="submit" class="btn btn-default"&gt;Send invitation&lt;/button&gt;
&lt;/form&gt;</pre>
</div>

<iframe style="width: 100%; height: 190px;" src="https://demo.xiaohuochai.site/bootstrap/form/f3.html" frameborder="0" width="320" height="240"></iframe>

<div>
<pre>&lt;form class="form-inline"&gt;
  &lt;div class="form-group"&gt;
    &lt;label class="sr-only" for="exampleInputEmail3"&gt;Email address&lt;/label&gt;
    &lt;input type="email" class="form-control" id="exampleInputEmail3" placeholder="Email"&gt;
  &lt;/div&gt;
  &lt;div class="form-group"&gt;
    &lt;label class="sr-only" for="exampleInputPassword3"&gt;Password&lt;/label&gt;
    &lt;input type="password" class="form-control" id="exampleInputPassword3" placeholder="Password"&gt;
  &lt;/div&gt;
  &lt;div class="checkbox"&gt;
    &lt;label&gt;
      &lt;input type="checkbox"&gt; Remember me
    &lt;/label&gt;
  &lt;/div&gt;
  &lt;button type="submit" class="btn btn-default"&gt;Sign in&lt;/button&gt;
&lt;/form&gt;</pre>
</div>

<iframe style="width: 100%; height: 190px;" src="https://demo.xiaohuochai.site/bootstrap/form/f4.html" frameborder="0" width="320" height="240"></iframe>

<div>
<pre>&lt;form class="form-inline"&gt;
  &lt;div class="form-group"&gt;
    &lt;label class="sr-only" for="exampleInputAmount"&gt;Amount (in dollars)&lt;/label&gt;
    &lt;div class="input-group"&gt;
      &lt;div class="input-group-addon"&gt;$&lt;/div&gt;
      &lt;input type="text" class="form-control" id="exampleInputAmount" placeholder="Amount"&gt;
      &lt;div class="input-group-addon"&gt;.00&lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;button type="submit" class="btn btn-primary"&gt;Transfer cash&lt;/button&gt;
&lt;/form&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/bootstrap/form/f5.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 表单控件

&emsp;&emsp;每一个表单都是由表单控件组成。离开了控件，表单就失去了意义

【输入框】

&emsp;&emsp;单行输入框，常见的文本输入框，也就是input的type属性值为text。在Bootstrap中使用input时也必须添加type类型，如果没有指定type类型，将无法得到正确的样式，因为Bootstrap框架都是通过`input[type="?"]`(其中?号代表type类型，比如说text类型，对应的是input[type=&ldquo;text&rdquo;])的形式来定义样式的

&emsp;&emsp;包括大部分表单控件、文本输入域控件，还支持所有 HTML5 类型的输入控件： `text`、`password`、`datetime`、`datetime-local`、`date`、`month`、`time`、`week`、`number`、`email`、`url`、`search`、`tel` 和 `color`

&emsp;&emsp;为了让控件在各种表单风格中样式不出错，需要添加类名&ldquo;form-control&rdquo;

<div>
<pre>&lt;input type="text" class="form-control" placeholder="Text input"&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/bootstrap/form/f6.html" frameborder="0" width="320" height="240"></iframe>

【下拉列表】

&emsp;&emsp;Bootstrap框架中的下拉选择框使用和原始的一致，多行选择设置multiple属性的值为multiple。Bootstrap框架会为这些元素提供统一的样式风格&nbsp;

&emsp;&emsp;注意：许多原生选择菜单 - 即在 Safari 和 Chrome 中 - 的圆角是无法通过修改 `border-radius` 属性来改变的

<div>
<pre>&lt;select class="form-control"&gt;
  &lt;option&gt;1&lt;/option&gt;
  &lt;option&gt;2&lt;/option&gt;
  &lt;option&gt;3&lt;/option&gt;
  &lt;option&gt;4&lt;/option&gt;
  &lt;option&gt;5&lt;/option&gt;
&lt;/select&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/bootstrap/form/f7.html" frameborder="0" width="320" height="240"></iframe>

【文本域】

&emsp;&emsp;文本域和原始使用方法一样，设置rows可定义其高度，设置cols可以设置其宽度。但如果textarea元素中添加了类名&ldquo;form-control&rdquo;类名，则无需设置cols属性。因为Bootstrap框架中的&ldquo;form-control&rdquo;样式的表单控件宽度为100%或auto。&nbsp;当然，也可以根据需要改变 `rows` 属性

<div>
<pre>&lt;textarea class="form-control" rows="3"&gt;&lt;/textarea&gt;</pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/bootstrap/form/f8.html" frameborder="0" width="320" height="240"></iframe>

【多选和单选框】

&emsp;&emsp;多选框（checkbox）用于选择列表中的一个或多个选项，而单选框（radio）用于从多个选项中只选择一个

&emsp;&emsp;Bootstrap框架中checkbox和radio有点特殊，Bootstrap针对他们做了一些特殊化处理，主要是checkbox和radio与label标签配合使用会出现一些小问题（最头痛的是对齐问题）&nbsp;

&emsp;&emsp;在Bootstrap框架中，主要借助&ldquo;.checkbox&rdquo;和&ldquo;.radio&rdquo;样式，来处理复选框、单选按钮与标签的对齐方式

<div>
<pre>&lt;div class="checkbox"&gt;
  &lt;label&gt;
    &lt;input type="checkbox" value=""&gt;
    Option one is this and that&amp;mdash;be sure to include why it's great
  &lt;/label&gt;
&lt;/div&gt;
&lt;div class="checkbox disabled"&gt;
  &lt;label&gt;
    &lt;input type="checkbox" value="" disabled&gt;
    Option two is disabled
  &lt;/label&gt;
&lt;/div&gt;
&lt;div class="radio"&gt;
  &lt;label&gt;
    &lt;input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked&gt;
    Option one is this and that&amp;mdash;be sure to include why it's great
  &lt;/label&gt;
&lt;/div&gt;
&lt;div class="radio"&gt;
  &lt;label&gt;
    &lt;input type="radio" name="optionsRadios" id="optionsRadios2" value="option2"&gt;
    Option two can be something else and selecting it will deselect option one
  &lt;/label&gt;
&lt;/div&gt;
&lt;div class="radio disabled"&gt;
  &lt;label&gt;
    &lt;input type="radio" name="optionsRadios" id="optionsRadios3" value="option3" disabled&gt;
    Option three is disabled
  &lt;/label&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 145px;" src="https://demo.xiaohuochai.site/bootstrap/form/f9.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;通过将 `.checkbox-inline` 或 `.radio-inline` 类应用到一系列的多选框（checkbox）或单选框（radio）控件上，可以使这些控件排列在一行&nbsp;

<div>
<pre>&lt;label class="checkbox-inline"&gt;
  &lt;input type="checkbox" id="inlineCheckbox1" value="option1"&gt; 1
&lt;/label&gt;
&lt;label class="checkbox-inline"&gt;
  &lt;input type="checkbox" id="inlineCheckbox2" value="option2"&gt; 2
&lt;/label&gt;
&lt;label class="checkbox-inline"&gt;
  &lt;input type="checkbox" id="inlineCheckbox3" value="option3"&gt; 3
&lt;/label&gt;
&lt;label class="radio-inline"&gt;
  &lt;input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"&gt; 1
&lt;/label&gt;
&lt;label class="radio-inline"&gt;
  &lt;input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"&gt; 2
&lt;/label&gt;
&lt;label class="radio-inline"&gt;
  &lt;input type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3"&gt; 3
&lt;/label&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/bootstrap/form/f10.html" frameborder="0" width="320" height="240"></iframe>

【静态控件】

&emsp;&emsp;如果需要在表单中将一行纯文本和 `label` 元素放置于同一行，为 &lt;p&gt; 元素添加 `.form-control-static` 类即可

<div>
<pre>&lt;form class="form-horizontal"&gt;
  &lt;div class="form-group"&gt;
    &lt;label class="col-sm-2 control-label"&gt;Email&lt;/label&gt;
    &lt;div class="col-sm-10"&gt;
      &lt;p class="form-control-static"&gt;email@example.com&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="form-group"&gt;
    &lt;label for="inputPassword" class="col-sm-2 control-label"&gt;Password&lt;/label&gt;
    &lt;div class="col-sm-10"&gt;
      &lt;input type="password" class="form-control" id="inputPassword" placeholder="Password"&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/form&gt;</pre>
</div>

<iframe style="width: 100%; height: 160px;" src="https://demo.xiaohuochai.site/bootstrap/form/f11.html" frameborder="0" width="320" height="240"></iframe>

<div>
<pre>&lt;form class="form-inline"&gt;
  &lt;div class="form-group"&gt;
    &lt;label class="sr-only"&gt;Email&lt;/label&gt;
    &lt;p class="form-control-static"&gt;email@example.com&lt;/p&gt;
  &lt;/div&gt;
  &lt;div class="form-group"&gt;
    &lt;label for="inputPassword2" class="sr-only"&gt;Password&lt;/label&gt;
    &lt;input type="password" class="form-control" id="inputPassword2" placeholder="Password"&gt;
  &lt;/div&gt;
  &lt;button type="submit" class="btn btn-default"&gt;Confirm identity&lt;/button&gt;
&lt;/form&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/bootstrap/form/f12.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 控件尺寸

&emsp;&emsp;前面看到的表单控件都正常的大小。可以通过设置控件的height，line-height，padding和font-size等属性来实现控件的高度设置。不过Bootstrap框架还提供了两个不同的类名，用来控制表单控件的高度。这两个类名是：

&emsp;&emsp;1、input-sm:让控件比正常大小更小

&emsp;&emsp;2、input-lg:让控件比正常大小更大

&emsp;&emsp;这两个类适用于表单中的input，textarea和select控件

<div>
<pre>&lt;input class="form-control input-lg" type="text" placeholder=".input-lg"&gt;
&lt;input class="form-control" type="text" placeholder="Default input"&gt;
&lt;input class="form-control input-sm" type="text" placeholder=".input-sm"&gt;

&lt;select class="form-control input-lg"&gt;...&lt;/select&gt;
&lt;select class="form-control"&gt;...&lt;/select&gt;
&lt;select class="form-control input-sm"&gt;...&lt;/select&gt;</pre>
</div>

<iframe style="width: 100%; height: 250px;" src="https://demo.xiaohuochai.site/bootstrap/form/f13.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;通过添加 `.form-group-lg` 或 `.form-group-sm` 类，为 `.form-horizontal` 包裹的 `label` 元素和表单控件快速设置尺寸

<div>
<pre>&lt;form class="form-horizontal"&gt;
  &lt;div class="form-group form-group-lg"&gt;
    &lt;label class="col-sm-2 control-label" for="formGroupInputLarge"&gt;Large label&lt;/label&gt;
    &lt;div class="col-sm-10"&gt;
      &lt;input class="form-control" type="text" id="formGroupInputLarge" placeholder="Large input"&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="form-group form-group-sm"&gt;
    &lt;label class="col-sm-2 control-label" for="formGroupInputSmall"&gt;Small label&lt;/label&gt;
    &lt;div class="col-sm-10"&gt;
      &lt;input class="form-control" type="text" id="formGroupInputSmall" placeholder="Small input"&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/form&gt;</pre>
</div>

<iframe style="width: 100%; height: 170px;" src="https://demo.xiaohuochai.site/bootstrap/form/f14.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;用栅格系统中的列（column）包裹输入框或其任何父元素，都可很容易的为其设置宽度

<div>
<pre>&lt;div class="row"&gt;
  &lt;div class="col-xs-2"&gt;
    &lt;input type="text" class="form-control" placeholder=".col-xs-2"&gt;
  &lt;/div&gt;
  &lt;div class="col-xs-3"&gt;
    &lt;input type="text" class="form-control" placeholder=".col-xs-3"&gt;
  &lt;/div&gt;
  &lt;div class="col-xs-4"&gt;
    &lt;input type="text" class="form-control" placeholder=".col-xs-4"&gt;
  &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/bootstrap/form/f15.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 控件状态

&emsp;&emsp;表单主要用来与用户沟通，好的表单就能更好的与用户进行沟通，而好的表单一定离不开表单的控件状态。

&emsp;&emsp;每一种表单状态都能给用户传递不同的信息，比如表单有焦点的状态可以告诉用户可以输入或选择东西，禁用状态可以告诉用户不可以输入或选择东西，还有就是表单控件验证状态，可以告诉用户的操作是否正确等。Bootstrap框架中的表单控件也具备这些状态

【焦点状态】

&emsp;&emsp;焦点状态是通过伪类&ldquo;:focus&rdquo;来实现。Bootstrap框架中表单控件的焦点状态删除了outline的默认样式，重新添加阴影效果box-shadow

<div>
<pre>&lt;input class="form-control"&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/bootstrap/form/f16.html" frameborder="0" width="320" height="240"></iframe>

【禁用状态】

&emsp;&emsp;Bootstrap框架的表单控件的禁用状态和普通的表单禁用状态实现方法是一样的，在相应的表单控件上添加属性&ldquo;disabled&rdquo;。和其他表单的禁用状态不同的是，Bootstrap框架做了一些样式风格的处理&nbsp;，被禁用的输入框颜色更浅，并且还添加了 `not-allowed` 鼠标状态

<div>
<pre>.form-control[disabled],
.form-control[readonly],
fieldset[disabled] .form-control {
cursor: not-allowed;
background-color: #eee;
opacity: 1;
}</pre>
</div>
<div>
<pre>&lt;input class="form-control" disabled&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/bootstrap/form/f17.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;在Bootstrap框架中，如果fieldset设置了disabled属性，整个域都将处于被禁用状态&nbsp;

&emsp;&emsp;注意：对于整个禁用的域中，如果legend中有输入框的话，这个输入框是无法被禁用的

<div>
<pre>  &lt;fieldset disabled&gt;
    &lt;legend&gt;&lt;input type="text" class="form-control" placeholder="显然我颜色变灰了，但是我没被禁用，不信？单击试一下" /&gt;&lt;/legend&gt;
    &lt;div class="form-group"&gt;
      &lt;label for="disabledTextInput"&gt;Disabled input&lt;/label&gt;
      &lt;input type="text" id="disabledTextInput" class="form-control" placeholder="Disabled input"&gt;
    &lt;/div&gt;
    &lt;div class="form-group"&gt;
      &lt;label for="disabledSelect"&gt;Disabled select menu&lt;/label&gt;
      &lt;select id="disabledSelect" class="form-control"&gt;
        &lt;option&gt;Disabled select&lt;/option&gt;
      &lt;/select&gt;
    &lt;/div&gt;
    &lt;div class="checkbox"&gt;
      &lt;label&gt;
        &lt;input type="checkbox"&gt; Can't check this
      &lt;/label&gt;
    &lt;/div&gt;
    &lt;button type="submit" class="btn btn-primary"&gt;Submit&lt;/button&gt;
  &lt;/fieldset&gt;
&lt;/form&gt;</pre>
</div>

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/bootstrap/form/f18.html" frameborder="0" width="320" height="240"></iframe>

【只读状态】

&emsp;&emsp;为输入框设置 `readonly` 属性可以禁止用户修改输入框中的内容。处于只读状态的输入框颜色更浅（就像被禁用的输入框一样），但是仍然保留标准的鼠标状态

<div>
<pre>&lt;input class="form-control" type="text" placeholder="Readonly input here&hellip;" readonly&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/bootstrap/form/f19.html" frameborder="0" width="320" height="240"></iframe>

【校验状态】

&nbsp;&emsp;&emsp;在制作表单时，不免要做表单验证。同样也需要提供验证状态样式，在Bootstrap框架中同样提供这几种效果

&emsp;&emsp;1、.has-warning：警告状态（黄色）

&emsp;&emsp;2、.has-error：错误状态（红色）

&emsp;&emsp;3、.has-success：成功状态（绿色）

&emsp;&emsp;使用的时候只需要在form-group容器上或在其父级容器上对应添加状态类名

<div>
<pre>&lt;div class="form-group has-success"&gt;
  &lt;label class="control-label" for="inputSuccess1"&gt;Input with success&lt;/label&gt;
  &lt;input type="text" class="form-control" id="inputSuccess1" aria-describedby="helpBlock2"&gt;
  &lt;span id="helpBlock2" class="help-block"&gt;A block of help text that breaks onto a new line and may extend beyond one line.&lt;/span&gt;
&lt;/div&gt;
&lt;div class="form-group has-warning"&gt;
  &lt;label class="control-label" for="inputWarning1"&gt;Input with warning&lt;/label&gt;
  &lt;input type="text" class="form-control" id="inputWarning1"&gt;
&lt;/div&gt;
&lt;div class="form-group has-error"&gt;
  &lt;label class="control-label" for="inputError1"&gt;Input with error&lt;/label&gt;
  &lt;input type="text" class="form-control" id="inputError1"&gt;
&lt;/div&gt;
&lt;div class="has-success"&gt;
  &lt;div class="checkbox"&gt;
    &lt;label&gt;
      &lt;input type="checkbox" id="checkboxSuccess" value="option1"&gt;
      Checkbox with success
    &lt;/label&gt;
  &lt;/div&gt;
&lt;/div&gt;
&lt;div class="has-warning"&gt;
  &lt;div class="checkbox"&gt;
    &lt;label&gt;
      &lt;input type="checkbox" id="checkboxWarning" value="option1"&gt;
      Checkbox with warning
    &lt;/label&gt;
  &lt;/div&gt;
&lt;/div&gt;
&lt;div class="has-error"&gt;
  &lt;div class="checkbox"&gt;
    &lt;label&gt;
      &lt;input type="checkbox" id="checkboxError" value="option1"&gt;
      Checkbox with error
    &lt;/label&gt;
  &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 350px;" src="https://demo.xiaohuochai.site/bootstrap/form/f20.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;很多时候，在表单验证的时候，不同的状态会提供不同的 icon，比如成功是一个对号（&radic;），错误是一个叉号（&times;）等。在Bootstrap框中也提供了这样的效果。如果想让表单在对应的状态下显示 icon 出来，只需要在对应的状态下添加类名&ldquo;has-feedback&rdquo;

&emsp;&emsp;注意：此类名要与&ldquo;has-error&rdquo;、&ldquo;has-warning&rdquo;和&ldquo;has-success&rdquo;在一起使用，且只能使用在文本输入框 &lt;input class="form-control"&gt; 元素上

<div>
<pre>&lt;div class="form-group has-success has-feedback"&gt;
  &lt;label class="control-label" for="inputSuccess2"&gt;Input with success&lt;/label&gt;
  &lt;input type="text" class="form-control" id="inputSuccess2" aria-describedby="inputSuccess2Status"&gt;
  &lt;span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"&gt;&lt;/span&gt;
  &lt;span id="inputSuccess2Status" class="sr-only"&gt;(success)&lt;/span&gt;
&lt;/div&gt;
&lt;div class="form-group has-warning has-feedback"&gt;
  &lt;label class="control-label" for="inputWarning2"&gt;Input with warning&lt;/label&gt;
  &lt;input type="text" class="form-control" id="inputWarning2" aria-describedby="inputWarning2Status"&gt;
  &lt;span class="glyphicon glyphicon-warning-sign form-control-feedback" aria-hidden="true"&gt;&lt;/span&gt;
  &lt;span id="inputWarning2Status" class="sr-only"&gt;(warning)&lt;/span&gt;
&lt;/div&gt;
&lt;div class="form-group has-error has-feedback"&gt;
  &lt;label class="control-label" for="inputError2"&gt;Input with error&lt;/label&gt;
  &lt;input type="text" class="form-control" id="inputError2" aria-describedby="inputError2Status"&gt;
  &lt;span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"&gt;&lt;/span&gt;
  &lt;span id="inputError2Status" class="sr-only"&gt;(error)&lt;/span&gt;
&lt;/div&gt;
&lt;div class="form-group has-success has-feedback"&gt;
  &lt;label class="control-label" for="inputGroupSuccess1"&gt;Input group with success&lt;/label&gt;
  &lt;div class="input-group"&gt;
    &lt;span class="input-group-addon"&gt;@&lt;/span&gt;
    &lt;input type="text" class="form-control" id="inputGroupSuccess1" aria-describedby="inputGroupSuccess1Status"&gt;
  &lt;/div&gt;
  &lt;span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"&gt;&lt;/span&gt;
  &lt;span id="inputGroupSuccess1Status" class="sr-only"&gt;(success)&lt;/span&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 310px;" src="https://demo.xiaohuochai.site/bootstrap/form/f21.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;当然，也可以为水平排列的表单和内联表单设置可选的图标

<div>
<pre>&lt;form class="form-horizontal"&gt;
  &lt;div class="form-group has-success has-feedback"&gt;
    &lt;label class="control-label col-sm-3" for="inputSuccess3"&gt;Input with success&lt;/label&gt;
    &lt;div class="col-sm-9"&gt;
      &lt;input type="text" class="form-control" id="inputSuccess3" aria-describedby="inputSuccess3Status"&gt;
      &lt;span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"&gt;&lt;/span&gt;
      &lt;span id="inputSuccess3Status" class="sr-only"&gt;(success)&lt;/span&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="form-group has-success has-feedback"&gt;
    &lt;label class="control-label col-sm-3" for="inputGroupSuccess2"&gt;Input group with success&lt;/label&gt;
    &lt;div class="col-sm-9"&gt;
      &lt;div class="input-group"&gt;
        &lt;span class="input-group-addon"&gt;@&lt;/span&gt;
        &lt;input type="text" class="form-control" id="inputGroupSuccess2" aria-describedby="inputGroupSuccess2Status"&gt;
      &lt;/div&gt;
      &lt;span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"&gt;&lt;/span&gt;
      &lt;span id="inputGroupSuccess2Status" class="sr-only"&gt;(success)&lt;/span&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/form&gt;</pre>
</div>

<iframe style="width: 100%; height: 160px;" src="https://demo.xiaohuochai.site/bootstrap/form/f22.html" frameborder="0" width="320" height="240"></iframe>

<div>
<pre>&lt;form class="form-inline"&gt;
  &lt;div class="form-group has-success has-feedback"&gt;
    &lt;label class="control-label" for="inputSuccess4"&gt;Input with success&lt;/label&gt;
    &lt;input type="text" class="form-control" id="inputSuccess4" aria-describedby="inputSuccess4Status"&gt;
    &lt;span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"&gt;&lt;/span&gt;
    &lt;span id="inputSuccess4Status" class="sr-only"&gt;(success)&lt;/span&gt;
  &lt;/div&gt;
&lt;/form&gt;
&lt;form class="form-inline"&gt;
  &lt;div class="form-group has-success has-feedback"&gt;
    &lt;label class="control-label" for="inputGroupSuccess3"&gt;Input group with success&lt;/label&gt;
    &lt;div class="input-group"&gt;
      &lt;span class="input-group-addon"&gt;@&lt;/span&gt;
      &lt;input type="text" class="form-control" id="inputGroupSuccess3" aria-describedby="inputGroupSuccess3Status"&gt;
    &lt;/div&gt;
    &lt;span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"&gt;&lt;/span&gt;
    &lt;span id="inputGroupSuccess3Status" class="sr-only"&gt;(success)&lt;/span&gt;
  &lt;/div&gt;
&lt;/form&gt;</pre>
</div>

<iframe style="width: 100%; height: 160px;" src="https://demo.xiaohuochai.site/bootstrap/form/f23.html" frameborder="0" width="320" height="240"></iframe>

【提示信息】

&emsp;&emsp;在制作表单验证时，要提供不同的提示信息。在Bootstrap框架中也提供了这样的效果。使用了一个"help-block"样式，将提示信息以块状显示，并且显示在控件底部。

<div>
<pre>&lt;form role="form"&gt;
  &lt;div class="form-group has-success has-feedback"&gt;
    &lt;label class="control-label" for="inputSuccess1"&gt;成功状态&lt;/label&gt;
    &lt;input type="text" class="form-control" id="inputSuccess1" placeholder="成功状态" &gt;
    &lt;span class="help-block"&gt;你输入的信息是正确的&lt;/span&gt;
    &lt;span class="glyphicon glyphicon-ok form-control-feedback"&gt;&lt;/span&gt;
  &lt;/div&gt;
  &lt;div class="form-group has-warning has-feedback"&gt;
    &lt;label class="control-label" for="inputWarning1"&gt;警告状态&lt;/label&gt;
    &lt;input type="text" class="form-control" id="inputWarning1" placeholder="警告状态"&gt;
    &lt;span class="help-block"&gt;请输入正确信息&lt;/span&gt;
    &lt;span class="glyphicon glyphicon-warning-sign form-control-feedback"&gt;&lt;/span&gt;
  &lt;/div&gt;
  &lt;div class="form-group has-error has-feedback"&gt;
    &lt;label class="control-label" for="inputError1"&gt;错误状态&lt;/label&gt;
    &lt;input type="text" class="form-control" id="inputError1" placeholder="错误状态"&gt;
    &lt;span class="help-block"&gt;你输入的信息是错误的&lt;/span&gt;
    &lt;span class="glyphicon glyphicon-remove form-control-feedback"&gt;&lt;/span&gt;  
  &lt;/div&gt;
&lt;/form&gt;  </pre>
</div>

<iframe style="width: 100%; height: 310px;" src="https://demo.xiaohuochai.site/bootstrap/form/f24.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 按钮

&emsp;&emsp;按钮是Bootstrap框架核心内容之一。因为按钮是Web制作中不可缺少的东西。而且不同的Web页面具有不同的按钮风格，甚至说同一个Web网站或应用程序具有多种按钮风格，比如说不同的按钮颜色、大小和状态等

【基本按钮】

&emsp;&emsp;Bootstrap框架的基本按钮是通过类名&ldquo;btn&rdquo;来实现

<div>
<pre>&lt;button class="btn" type="button"&gt;我是一个基本按钮&lt;/button&gt; </pre>
</div>

<iframe style="width: 100%; height: 54px;" src="https://demo.xiaohuochai.site/bootstrap/form/f25.html" frameborder="0" width="320" height="240"></iframe>

【默认按钮】

&emsp;&emsp;Bootstrap框架首先通过基础类名&ldquo;.btn&rdquo;定义了一个基础的按钮风格，然后通过&ldquo;.btn-default&rdquo;定义了一个默认的按钮风格。默认按钮的风格就是在基础按钮的风格的基础上修改了按钮的背景颜色、边框颜色和文本颜色

<div>
<pre>.btn-default {
&emsp;&emsp;color: #333;
&emsp;&emsp;background-color: #fff;
&emsp;&emsp;border-color: #ccc;
}</pre>
</div>

<iframe style="width: 100%; height: 64px;" src="https://demo.xiaohuochai.site/bootstrap/form/f26.html" frameborder="0" width="320" height="240"></iframe>

【按钮元素】

&emsp;&emsp;可以为&nbsp;&lt;a&gt;、&lt;button&gt;&nbsp;或&nbsp;&lt;input&gt;&nbsp;元素添加按钮类（button class）即可使用 Bootstrap 提供的样式

&emsp;&emsp;制作按钮通常使用下面代码来实现：

&emsp;&emsp;☑ input[type=&ldquo;submit&rdquo;]

&emsp;&emsp;☑ input[type=&ldquo;button&rdquo;]

&emsp;&emsp;☑ input[type=&ldquo;reset&rdquo;]

&emsp;&emsp;☑ &lt;button&gt;

&emsp;&emsp;☑ &lt;a&gt;

&emsp;&emsp;当然了，还可以使用在其他的标签元素上，如&lt;div&gt;，只要在制作按钮的标签元素上添加类名&ldquo;btn&rdquo;即可

&emsp;&emsp;虽然按钮类可以应用到其他元素上，但是，导航和导航条组件只支持&nbsp;&lt;button&gt;&nbsp;元素。如果&nbsp;&lt;a&gt;&nbsp;元素被作为按钮使用，并用于在当前页面触发某些功能，而不是用于链接其他页面或链接当前页面中的其他部分，那么，务必为其设置&nbsp;`role="button"`&nbsp;属性。所以，最佳实践是：强烈建议尽可能使用&nbsp;&lt;button&gt;&nbsp;元素来获得在各个浏览器上获得相匹配的绘制效果

<div>
<pre>&lt;button class="btn btn-default" type="button"&gt;button标签按钮&lt;/button&gt;
&lt;input type="submit" class="btn btn-default" value="input标签按钮"/&gt;
&lt;a href="##" class="btn btn-default"&gt;a标签按钮&lt;/a&gt;
&lt;span class="btn btn-default"&gt;span标签按钮&lt;/span&gt;
&lt;div class="btn btn-default"&gt;div标签按钮&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/bootstrap/form/f27.html" frameborder="0" width="320" height="240"></iframe>

【按钮风格】

&emsp;&emsp;在Bootstrap框架中除了默认的按钮风格之外，还有其他六种按钮风格，每种风格的其实都一样，不同之处就是按钮的背景颜色、边框颜色和文本颜色

![bs_makeup3](https://pic.xiaohuochai.site/blog/bs_makeup3.jpg)

&emsp;&emsp;使用起来就很简单，就像前面介绍的默认按钮一样的使用方法，只需要在基础按钮&ldquo;.btn&rdquo;基础上追加对应的类名，就可以得到需要的按钮风格

<div>
<pre>&lt;button class="btn" type="button"&gt;基础按钮.btn&lt;/button&gt;
&lt;button class="btn btn-default" type="button"&gt;默认按钮.btn-default&lt;/button&gt;
&lt;button class="btn btn-primary" type="button"&gt;主要按钮.btn-primary&lt;/button&gt;
&lt;button class="btn btn-success" type="button"&gt;成功按钮.btn-success&lt;/button&gt;
&lt;button class="btn btn-info" type="button"&gt;信息按钮.btn-info&lt;/button&gt;
&lt;button class="btn btn-warning" type="button"&gt;警告按钮.btn-warning&lt;/button&gt;
&lt;button class="btn btn-danger" type="button"&gt;危险按钮.btn-danger&lt;/button&gt;
&lt;button class="btn btn-link" type="button"&gt;链接按钮.btn-link&lt;/button&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/bootstrap/form/f28.html" frameborder="0" width="320" height="240"></iframe>

【按钮尺寸】

&emsp;&emsp;使用&nbsp;`.btn-lg`、`.btn-sm`&nbsp;或&nbsp;`.btn-xs`&nbsp;就可以获得不同尺寸的按钮

&emsp;&emsp;通过给按钮添加&nbsp;`.btn-block`&nbsp;类可以将其拉伸至父元素100%的宽度，而且按钮也变为了块级（block）元素，并且这个按钮不会有任何的padding和margin值

![bs_makeup4](https://pic.xiaohuochai.site/blog/bs_makeup4.jpg)
<div>
<pre>&lt;p&gt;
  &lt;button type="button" class="btn btn-primary btn-lg"&gt;（大按钮）Large button&lt;/button&gt;
  &lt;button type="button" class="btn btn-default btn-lg"&gt;（大按钮）Large button&lt;/button&gt;
&lt;/p&gt;
&lt;p&gt;
  &lt;button type="button" class="btn btn-primary"&gt;（默认尺寸）Default button&lt;/button&gt;
  &lt;button type="button" class="btn btn-default"&gt;（默认尺寸）Default button&lt;/button&gt;
&lt;/p&gt;
&lt;p&gt;
  &lt;button type="button" class="btn btn-primary btn-sm"&gt;（小按钮）Small button&lt;/button&gt;
  &lt;button type="button" class="btn btn-default btn-sm"&gt;（小按钮）Small button&lt;/button&gt;
&lt;/p&gt;
&lt;p&gt;
  &lt;button type="button" class="btn btn-primary btn-xs"&gt;（超小尺寸）Extra small button&lt;/button&gt;
  &lt;button type="button" class="btn btn-default btn-xs"&gt;（超小尺寸）Extra small button&lt;/button&gt;
&lt;/p&gt;
&lt;button type="button" class="btn btn-primary btn-lg btn-block"&gt;（块级元素）Block level button&lt;/button&gt;
&lt;button type="button" class="btn btn-default btn-lg btn-block"&gt;（块级元素）Block level button&lt;/button&gt;</pre>
</div>

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/bootstrap/form/f29.html" frameborder="0" width="320" height="240"></iframe>

【按钮状态】

&emsp;&emsp;Bootstrap框架针对按钮的状态做了一些特殊处理。在Bootstrap框架中针对按钮的状态效果主要分为两种：活动状态和禁用状态。

&emsp;&emsp;Bootstrap按钮的活动状态主要包括按钮的悬浮状态(:hover)，点击状态(:active)和焦点状态（:focus）几种

&emsp;&emsp;当按钮处于激活状态时，其表现为被按压下去（底色更深、边框夜色更深、向内投射阴影）。对于&nbsp;&lt;button&gt;&nbsp;元素，是通过`:active`状态实现的。对于&lt;a&gt;元素，是通过`.active`类实现的。然而，还可以将`.active`&nbsp;应用到&lt;button&gt;上（包含&nbsp;`aria-pressed="true"`属性)），并通过编程的方式使其处于激活状态

&emsp;&emsp;由于&nbsp;`:active`&nbsp;是伪状态，因此无需额外添加，但是在需要让其表现出同样外观的时候可以添加&nbsp;`.active`&nbsp;类

<div>
<pre>&lt;button type="button" class="btn btn-default btn-lg active"&gt;Button1&lt;/button&gt;
&lt;button type="button" class="btn btn-default btn-lg"&gt;Button2&lt;/button&gt;
&lt;a href="#" class="btn btn-default btn-lg active" role="button"&gt;Link1&lt;/a&gt;
&lt;a href="#" class="btn btn-default btn-lg" role="button"&gt;Link2&lt;/a&gt;</pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/bootstrap/form/f30.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;和input等表单控件一样，在Bootstrap框架的按钮中也具有禁用状态的设置。禁用状态与其他状态按钮相比，就是背景颜色的透明度做了一定的处理，opcity的值从100%调整为65%。

&emsp;&emsp;在Bootstrap框架中，要禁用按钮有两种实现方式：

&emsp;&emsp;方法1：在标签中添加disabled属性

&emsp;&emsp;方法2：在元素标签中添加类名&ldquo;disabled&rdquo;

&emsp;&emsp;两者的主要区别是：

&emsp;&emsp;&ldquo;.disabled&rdquo;样式不会禁止按钮的默认行为，比如说提交和重置行为等。如果想要让这样的禁用按钮也能禁止按钮的默认行为，则需要通过JavaScript这样的语言来处理

&emsp;&emsp;对于&lt;a&gt;标签来说，它并不支持使用disable属性，只支持通过类名&ldquo;.disable&rdquo;来禁用按钮，可以禁止元素的链接跳转行为

<div>
<pre>&lt;form action="#"&gt;
    &lt;button class="btn" disabled&gt;通过disabled属性禁用按钮&lt;/button&gt; 
    &lt;button class="btn disabled"&gt;通过添加类名disabled禁用按钮&lt;/button&gt;
    &lt;button class="btn"&gt;未禁用的按钮&lt;/button&gt;
&lt;/form&gt;
&lt;div&gt;
    &lt;a href="#" class="btn" disabled&gt;通过disabled属性禁用按钮&lt;/a&gt; 
    &lt;a href="#" class="btn disabled"&gt;通过添加类名disabled禁用按钮&lt;/a&gt;
    &lt;a href="#" class="btn"&gt;未禁用的按钮&lt;/a&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/bootstrap/form/f31.html" frameborder="0" width="320" height="240"></iframe>

