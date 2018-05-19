# Bootstrap输入框组

&emsp;&emsp;有时，我们需要将文本输入框(input group)和文件或者小icon组合在一起进行显示， 我们称之为addon。也就是通过在文本输入框&nbsp;&lt;input&gt;&nbsp;前面、后面或是两边加上文字或按钮，来实现对表单控件的扩展。本文将详细介绍Bootstrap输入框组

&nbsp;

### 基本用法

&emsp;&emsp;在输入框的任意一侧添加额外元素或按钮。还可以在输入框的两侧同时添加额外元素

<div>
<pre>&lt;div class="input-group"&gt;
  &lt;span class="input-group-addon" id="basic-addon1"&gt;@&lt;/span&gt;
  &lt;input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1"&gt;
&lt;/div&gt;
&lt;div class="input-group"&gt;
  &lt;input type="text" class="form-control" placeholder="Recipient's username" aria-describedby="basic-addon2"&gt;
  &lt;span class="input-group-addon" id="basic-addon2"&gt;@example.com&lt;/span&gt;
&lt;/div&gt;
&lt;div class="input-group"&gt;
  &lt;span class="input-group-addon"&gt;$&lt;/span&gt;
  &lt;input type="text" class="form-control" aria-label="Amount (to the nearest dollar)"&gt;
  &lt;span class="input-group-addon"&gt;.00&lt;/span&gt;
&lt;/div&gt;
&lt;div class="input-group"&gt;
  &lt;span class="input-group-addon" id="basic-addon3"&gt;https://example.com/users/&lt;/span&gt;
  &lt;input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3"&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 166px;" src="https://demo.xiaohuochai.site/bootstrap/inputgroup/i1.html" frameborder="0" width="320" height="240"></iframe>

【注意事项】

&emsp;&emsp;1、避免使用&nbsp;&lt;select&gt;&nbsp;元素，因为 WebKit 浏览器不能完全绘制它的样式

&emsp;&emsp;2、避免使用&nbsp;&lt;textarea&gt;&nbsp;元素，由于它们的&nbsp;`rows`&nbsp;属性在某些情况下不被支持

&emsp;&emsp;3、不要将表单组或栅格列（column）类直接和输入框组混合使用。而是将输入框组嵌套到表单组或栅格相关元素的内部&nbsp;

<div>
<pre>&lt;h3&gt;错误示范&lt;/h3&gt;
&lt;div class="input-group col-xs-4"&gt;
  &lt;span class="input-group-addon" id="basic-addon1"&gt;@&lt;/span&gt;
  &lt;input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1"&gt;
&lt;/div&gt;
&lt;div class="input-group col-xs-8"&gt;
  &lt;span class="input-group-addon" id="basic-addon1"&gt;@&lt;/span&gt;
  &lt;input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1"&gt;
&lt;/div&gt;
&lt;h3&gt;正确示范&lt;/h3&gt;
&lt;div class="col-xs-4"&gt;
    &lt;div class="input-group"&gt;
      &lt;span class="input-group-addon" id="basic-addon1"&gt;@&lt;/span&gt;
      &lt;input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1"&gt;
    &lt;/div&gt;
&lt;/div&gt;
&lt;div class="col-xs-8"&gt;
    &lt;div class="input-group"&gt;
      &lt;span class="input-group-addon" id="basic-addon1"&gt;@&lt;/span&gt;
      &lt;input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1"&gt;
    &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 220px;" src="https://demo.xiaohuochai.site/bootstrap/inputgroup/i2.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;4、<span class="text-danger">可以添加多个（`.input-group-addon`&nbsp;或&nbsp;`.input-group-btn`）

<div>
<pre>&lt;div class="input-group"&gt;
  &lt;span class="input-group-addon" id="basic-addon1"&gt;@&lt;/span&gt;
  &lt;span class="input-group-addon" id="basic-addon1"&gt;@&lt;/span&gt;    
  &lt;input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1"&gt;
  &lt;span class="input-group-addon" id="basic-addon1"&gt;@&lt;/span&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 64px;" src="https://demo.xiaohuochai.site/bootstrap/inputgroup/i3.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;5、<span class="text-danger">不支持在单个输入框组中添加多个表单控件

<div>
<pre>&lt;div class="input-group"&gt;
  &lt;span class="input-group-addon" id="basic-addon1"&gt;@&lt;/span&gt;
  &lt;input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1"&gt;
  &lt;input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1"&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/bootstrap/inputgroup/i4.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 尺寸

&emsp;&emsp;为&nbsp;`.input-group`&nbsp;添加相应的尺寸类，其内部包含的元素将自动调整自身的尺寸。不需要为输入框组中的每个元素重复地添加控制尺寸的类。提供了.input-group-lg和.input-group-sm，未提供超小型的样式，也许作者认为不需要

<div>
<pre>&lt;div class="input-group input-group-lg"&gt;
  &lt;span class="input-group-addon" id="basic-addon1"&gt;@&lt;/span&gt;
  &lt;input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1"&gt;
&lt;/div&gt;
&lt;div class="input-group input-group-sm"&gt;
  &lt;span class="input-group-addon" id="basic-addon1"&gt;@&lt;/span&gt;
  &lt;input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1"&gt;
&lt;/div&gt;
&lt;div class="input-group"&gt;
  &lt;span class="input-group-addon" id="basic-addon1"&gt;@&lt;/span&gt;
  &lt;input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1"&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/bootstrap/inputgroup/i5.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 额外元素

【多选框或单选框】&nbsp;

&emsp;&emsp;可以将多选框或单选框作为额外元素添加到输入框组中

<div>
<pre>&lt;div class="input-group"&gt;
  &lt;span class="input-group-addon"&gt;
    &lt;input type="checkbox" aria-label="..."&gt;
  &lt;/span&gt;
  &lt;input type="text" class="form-control" aria-label="..."&gt;
&lt;/div&gt;
&lt;div class="input-group"&gt;
  &lt;span class="input-group-addon"&gt;
    &lt;input type="radio" aria-label="..."&gt;
  &lt;/span&gt;
  &lt;input type="text" class="form-control" aria-label="..."&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/bootstrap/inputgroup/i6.html" frameborder="0" width="320" height="240"></iframe>

【按钮】

&emsp;&emsp;为输入框组添加按钮需要额外添加一层嵌套，不是&nbsp;`.input-group-addon`，而是添加&nbsp;`.input-group-btn`&nbsp;来包裹按钮元素。由于.btn按钮样式定义了各种各样的样式，其不像checkbox、radio、label等直接放到.input-group-addon样式里就可以的。所以，为了避免冲突，作者为.btn样式又单独设置了一个.input-group-btn样式，用来替换.input-group-addon作为新的addon容器

<div>
<pre>&lt;div class="input-group"&gt;
  &lt;span class="input-group-btn"&gt;
    &lt;button class="btn btn-default" type="button"&gt;Go!&lt;/button&gt;
  &lt;/span&gt;
  &lt;input type="text" class="form-control" placeholder="Search for..."&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/bootstrap/inputgroup/i7.html" frameborder="0" width="320" height="240"></iframe>

【按钮式下拉菜单】

&nbsp;&emsp;&emsp;很自然，能支持按钮，也就能支持按钮式下拉菜单，不需要额外的样式支持，只需要在普通的.btn按钮上应用一个data-toggle="dropdown"属性即可

<div>
<pre>&lt;div class="input-group"&gt;
 &lt;div class="input-group-btn"&gt;
    &lt;button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"&gt;Action &lt;span class="caret"&gt;&lt;/span&gt;&lt;/button&gt;
    &lt;ul class="dropdown-menu"&gt;
      &lt;li&gt;&lt;a href="#"&gt;Action&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href="#"&gt;Another action&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href="#"&gt;Something else here&lt;/a&gt;&lt;/li&gt;
      &lt;li role="separator" class="divider"&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href="#"&gt;Separated link&lt;/a&gt;&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/div&gt;
  &lt;input type="text" class="form-control" aria-label="..."&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/bootstrap/inputgroup/i8.html" frameborder="0" width="320" height="240"></iframe>

【分裂式按钮下拉菜单】

<div>
<pre>&lt;div class="input-group"&gt;
 &lt;div class="input-group-btn"&gt;
     &lt;button class="btn btn-default" type="button"&gt;Action&lt;/button&gt;
    &lt;button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"&gt;&lt;span class="caret"&gt;&lt;/span&gt;&lt;/button&gt;
    &lt;ul class="dropdown-menu"&gt;
      &lt;li&gt;&lt;a href="#"&gt;Action&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href="#"&gt;Another action&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href="#"&gt;Something else here&lt;/a&gt;&lt;/li&gt;
      &lt;li role="separator" class="divider"&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href="#"&gt;Separated link&lt;/a&gt;&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/div&gt;
  &lt;input type="text" class="form-control" aria-label="..."&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/bootstrap/inputgroup/i9.html" frameborder="0" width="320" height="240"></iframe>

