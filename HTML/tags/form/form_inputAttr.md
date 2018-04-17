# input元素的30个元素属性

&emsp;&emsp;form元素只是一个数据获取元素的容器，而容器内的元素称为表单控件。最常用的表单控件是input元素

&emsp;&emsp;accept、alt、checked、disabled、maxlength、name、readonly、size、src、type、value这11个属性是input元素的传统元素属性

&emsp;&emsp;autocomplete、autofocus、form、formaction、formenctype、formmethod、formnovalidate、formtarget、height、list、max、min、multiple、novalidate、pattern、placeholder、required、step、width这19个属性是HTML5新增的元素属性

![inputAttr](https://pic.xiaohuochai.site/blog/HTML_tags_inputAttr.png)

&nbsp;

## 传统属性

### name

&emsp;&emsp;name属性用于规定input元素的名称，用于对提交到服务器后的表单数据进行标识，或者在客户端通过javascript引用表单数据

&emsp;&emsp;注意：只有设置了name属性的表单元素才能在提交表单时传递它们的值

### type

&emsp;&emsp;type属性用来规定input元素的类型

&emsp;&emsp;注意：如果input元素没有设置type属性，或者设置的值在浏览器中不支持，那么输入类型会变成type="text"

&emsp;&emsp;详细情况[移步至此](http://www.cnblogs.com/xiaohuochai/p/5179909.html)

### accept

&emsp;&emsp;accept属性用来规定能够通过文件上传进行提交的文件类型。理论上可以用来限制上传文件类型，然而它只是建设性的，并很可能被忽略，它接受逗号分隔的MIME类型

&emsp;&emsp;注意：该属性只能与type="file"配合使用

<div>
<pre>&lt;input type="file" accept="image/gif,image/jpeg,image/jpg"&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/input/i1.html" frameborder="0" width="320" height="240"></iframe>

### alt

&emsp;&emsp;alt属性为图像输入规定替代文本，功能类似于image元素的alt属性，为用户由于某些原因无法查看图像时提供备选信息

&emsp;&emsp;注意：alt属性只能与type="image"的input元素配合使用

<div>
<pre>&lt;input type="image" src="#" alt="测试图片"&gt;</pre>
</div>

<div><iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/input/i2.html" frameborder="0" width="320" height="240"></iframe></div>

&nbsp;

### checked

&emsp;&emsp;checked属性规定在页面加载时应该被预先选定的input元素，也可以在页面加载后，通过javascript进行设置

&emsp;&emsp;注意：checked属性只能与type="radio"或type="checkbox"的input元素配合使用

<div>
<pre>&lt;input type="radio" name="radio" value="1" checked&gt;
&lt;input type="radio" name="radio" value="2"&gt;
&lt;input type="checkbox" name="checkbox" value="1"&gt;
&lt;input type="checkbox" name="checkbox" value="2"&gt;
&lt;script&gt;
var oInput = document.getElementsByTagName('input');
for(var i = 0,len = oInput.length; i &lt; len; i++){
    oInput[i].onmouseover = function(){
        this.checked = 'checked';
    }
}    
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/input/i3.html" frameborder="0" width="320" height="240"></iframe>

### disabled

&emsp;&emsp;disabled属性规定应该禁用input元素。被禁用的字段是不能修改的，也不可以使用tab按键切换到该字段，但可以选中或拷贝其文本

&emsp;&emsp;[注意1]disabled属性无法与type="hidden"的input元素一起使用

&emsp;&emsp;[注意2]对于IE7-浏览器必须设置为disabled="disabled"，而不可以直接设置disabled，否则使用javascript控制时将失效

<div>
<pre>&lt;button id="btn1"&gt;输入域可用&lt;/button&gt;
&lt;button id="btn2"&gt;输入域不可用&lt;/button&gt;
&lt;input id="test" disabled value="内容"&gt;
&lt;script&gt;
btn1.onclick = function(){
    test.removeAttribute('disabled');
}    
btn2.onclick = function(){
    test.setAttribute('disabled','disabled');
}    
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/input/i4.html" frameborder="0" width="320" height="240"></iframe>

### readonly

&emsp;&emsp;readonly属性规定输入字段为只读。只读字段是不能修改的，但用户仍然可以使用tab按键切换到该字段，还可以选中或拷贝其文本

&emsp;&emsp;readonly属性可与type="text"或"password"的input元素配合使用

&emsp;&emsp;注意：IE7-浏览器不支持使用javascript控制readonly属性

<div>
<pre>&lt;button id="btn1"&gt;输入域只读&lt;/button&gt;
&lt;button id="btn2"&gt;输入域可读写&lt;/button&gt;
&lt;input id="test" value="内容" readonly&gt;
&lt;script&gt;
btn1.onclick = function(){
    test.setAttribute('readonly','readonly');
}
btn2.onclick = function(){
    test.removeAttribute('readonly');
}    
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/input/i5.html" frameborder="0" width="320" height="240"></iframe>

### maxlength

&emsp;&emsp;maxlength属性规定输入字段的最大长度，以字符个数计

&emsp;&emsp;注意：该属性只能与type="text"或type="password"的input元素配合使用

<div>
<pre>&lt;input maxlength="6"&gt;
&lt;input type="password" maxlength="6"&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/input/i6.html" frameborder="0" width="320" height="240"></iframe>

### size

&emsp;&emsp;size属性对于type="text"或"password"的input元素是可见的字符数；而对于其他类型，是以像素为单位的输入字段宽度

&emsp;&emsp;注意：由于size属性是一个可视化的设计属性，推荐使用CSS来代替它

<div>
<pre>&lt;input size="1"&gt;
&lt;input type="password" size="2"&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/input/i7.html" frameborder="0" width="320" height="240"></iframe>

### src

&emsp;&emsp;src属性作为提交按钮显示的图像的URL

&emsp;&emsp;注意：src属性只能且必须与type="image"的input元素配合使用

<div>
<pre>&lt;form action="#"&gt;
    &lt;input name="test"&gt;
    &lt;input type="image" src="https://demo.xiaohuochai.site/submit.jpg" width="99" height="99" alt="测试图片"&gt;
&lt;/form&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/html/input/i8.html" frameborder="0" width="320" height="240"></iframe>

### value

&emsp;&emsp;value属性为input元素设定值。对于不同的输入类型，value属性的用法也不同：

&emsp;&emsp;type="button"、"reset"、"submit"用于定义按钮上的显示的文本

&emsp;&emsp;type="text"、"password"、"hidden"用于定义输入字段的初始值

&emsp;&emsp;type="checkbox"、"radio"、"image"用于定义与输入相关联的值

&emsp;&emsp;[注意1]type="checkbox"或"radio"必须设置value属性

&emsp;&emsp;[注意2]value属性无法与type="file"的input元素一起使用

<div>
<pre>&lt;button id="btn1"&gt;1&lt;/button&gt;
&lt;button id="btn2"&gt;2&lt;/button&gt;
&lt;input id="test"&gt;
&lt;script&gt;
btn1.onclick = btn2.onclick =function(){
    test.value=this.innerHTML;
}    
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/input/i9.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

## 新增属性

### autocomplete

&emsp;&emsp;autocomplete属性可以在个别元素或整个表单上开启或关闭浏览器的自动完成功能。当用户在字段开始键入时，浏览器基于之前键入过的值，显示出在字段中填写的选项

&emsp;&emsp;autocomplete属性适用form元素以及以下类型的input元素：text、search、url、telephone、email、password、date pickers、range、color

&emsp;&emsp;注意：IE浏览器不支持该属性，只有元素拥有name属性，该属性才有效

<div>
<pre>&lt;input name="test1" autocomplete="on"&gt;
&lt;input name="test2" autocomplete="off"&gt;    </pre>
</div>

&emsp;&emsp;详细情况[移步至此](http://www.cnblogs.com/xiaohuochai/p/5174891.html#anchor7)

### autofocus

&emsp;&emsp;autofocus属性规定在页面加载时，域自动地获得焦点

&emsp;&emsp;autofous属性适用于button、input、keygen、select和textarea元素

<div>
<pre>&lt;input name="test1"&gt;
&lt;input name="test2" autofocus&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/input/i10.html" frameborder="0" width="320" height="240"></iframe>

### novalidate

&emsp;&emsp;novalidate属性规定在提交表单时不验证form或input域

&emsp;&emsp;novalidate属性适用于form元素以及以下类型的input元素：text、search、url、telephone、email、password、date pickers、range、color

&emsp;&emsp;注意：IE9-浏览器不支持

&emsp;&emsp;详细情况[移步至此](http://www.cnblogs.com/xiaohuochai/p/5174891.html#anchor8)

### height

&emsp;&emsp;height属性用于规定image类型的input标签的图像高度

&emsp;&emsp;注意：该属性只适用于image类型的input标签

### width

&emsp;&emsp;width属性用于规定image类型的input标签的图像宽度

&emsp;&emsp;注意：该属性只适用于image类型的input标签

<div>
<pre>//http://127.0.0.1/form.html?test=123&amp;x=38&amp;y=57#
&lt;form action="#"&gt;
    &lt;input name="test"&gt;
    &lt;input type="image" src="submit.jpg" width="99" height="99"&gt;
&lt;/form&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/html/input/i11.html" frameborder="0" width="320" height="240"></iframe>

### list

&emsp;&emsp;大多数输入类型包含一个属性list，它和一个新元素datalist结合使用，这个元素定义当在表单控件输入数据时可用的一个选项列表。datalist元素自身不会在页面显示，而是为其他元素的list属性提供数据

&emsp;&emsp;list属性适用于form元素以及以下类型的input元素：text、search、url、telephone、email、password、date pickers、range、color

&emsp;&emsp;注意：IE9-浏览器及safari浏览器不支持

&emsp;&emsp;详细情况[移步至此](http://www.cnblogs.com/xiaohuochai/p/5180638.html#anchor2-1)

### min

&emsp;&emsp;min属性规定输入域所允许的最大值&nbsp;

### max

&emsp;&emsp;max属性规定输入域所允许的最小值

### step

&emsp;&emsp;step属性为输入域规定合法的数字间隔

&emsp;&emsp;min、max、step属性适用于以下类型的input元素:date pickers、number、range

<div>
<pre>&lt;input type="number" min="0" max="10" step="0.5" value="6" /&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/input/i12.html" frameborder="0" width="320" height="240"></iframe>

<div>
<pre>&lt;input type="range" min="0" max="10" step="0.5" value="6" /&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/input/i13.html" frameborder="0" width="320" height="240"></iframe>

### multiple

&emsp;&emsp;multiple属性规定按住ctrl按键，输入字段可以选择多个值

&emsp;&emsp;该属性适用于type="email"和"file"的input元素

&emsp;&emsp;注意：该属性IE9-浏览器不支持

<div>
<pre>&lt;button id="btn1"&gt;打开文件多选&lt;/button&gt;
&lt;button id="btn2"&gt;关闭文件多选&lt;/button&gt;
&lt;br&gt;&lt;br&gt;
&lt;input id="test" type="file" multiple&gt;
&lt;script&gt;
btn1.onclick = function(){
    test.setAttribute('multiple','');
};
btn2.onclick = function(){
    test.removeAttribute('multiple');
};
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/html/input/i14.html" frameborder="0" width="320" height="240"></iframe>

### pattern

&emsp;&emsp;pattern属性规定用于验证input域的模式。模型pattern是正则表达式

&emsp;&emsp;pattern属性适用于以下类型的input元素：text、search、url、tel、email、password

&emsp;&emsp;注意：IE9-浏览器及safari浏览器不支持

<div>
<pre>&lt;form action="#"&gt;
    &lt;input pattern="\d{3}"&gt;    
    &lt;input type="submit"&gt;
&lt;/form&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/input/i15.html" frameborder="0" width="320" height="240"></iframe>

### placeholder

&emsp;&emsp;placeholder属性提供占位符文字，描述输入域所期待的值。占位符会在输入域为空时显示出现，在输入域获得焦点时消失

&emsp;&emsp;placeholder属性适用于以下类型的input元素:text、search、url、tel、email、password

&emsp;&emsp;注意：IE9-浏览器不支持

<div>
<pre>&lt;form action="#"&gt;
    &lt;input type="tel" placeholder="请输入数字" pattern="\d{11}"&gt;    
    &lt;input type="submit"&gt;
&lt;/form&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/input/i16.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;要修改placeholder的颜色需要使用::placeholder

<div>
<pre>::placeholder{color:green;}</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/input/i17.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### required

&emsp;&emsp;required属性规定必须在提交之前填写输入域(不能为空)

&emsp;&emsp;required属性适用于以下类型的input元素：text、search、url、telephone、email、password、date pickers、number、checkbox、radio、file

&emsp;&emsp;注意：IE9-浏览器及safari浏览器不支持

<div>
<pre>&lt;form action="#"&gt;
    &lt;input required&gt;    
    &lt;input type="submit"&gt;
&lt;/form&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/input/i18.html" frameborder="0" width="320" height="240"></iframe>

### form

&emsp;&emsp;form属性规定输入域所属的一个或多个表单，form属性必须和所属表单的id

&emsp;&emsp;form属性适用于所有input标签的类型，若需要引用一个以上的表单时，用空格分隔

&emsp;&emsp;注意：IE浏览器不支持该属性，只有元素拥有name属性，该属性才有效

<div>
<pre>&lt;form id="form" action="#"&gt;
    &lt;input type="submit"&gt;
&lt;/form&gt;
&lt;input name="test" form="form"&gt;</pre>
</div>

<iframe style="width: 100%; height: 70px;" src="https://demo.xiaohuochai.site/html/input/i19.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

**表单重写属性**

&emsp;&emsp;表单重写属性允许重写form元素的某些属性设定。其中，formnovalidate适用于button或input元素，而其他属性适用于submit或reset的button或input元素

### formaction

&emsp;&emsp;重写表单的action属性

&emsp;&emsp;关于action的详细信息[移步至此](http://www.cnblogs.com/xiaohuochai/p/5174891.html#anchor3)

<div>
<pre>&lt;form action="#" &gt;
First name: &lt;input type="text" name="fname" /&gt;&lt;br /&gt;
Last name: &lt;input type="text" name="lname" /&gt;&lt;br /&gt;
&lt;input type="submit" value="提交" /&gt;&lt;br /&gt;
&lt;input type="submit" formaction="#" value="以管理员身份提交" /&gt;
&lt;/form&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/html/input/i20.html" frameborder="0" width="320" height="240"></iframe>

### formenctype

&emsp;&emsp;重写表单的enctype属性

&emsp;&emsp;关于enctype的详细信息[移步至此](http://www.cnblogs.com/xiaohuochai/p/5174891.html#anchor5)

<div>
<pre>&lt;form action="#" method="post"&gt;
  First name: &lt;input type="text" name="fname" /&gt;&lt;br /&gt;
  &lt;input type="submit" value="提交" /&gt;
  &lt;input type="submit" formenctype="multipart/form-data" value="以multipart/form-data编码提交" /&gt;
&lt;/form&gt;</pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/html/input/i21.html" frameborder="0" width="320" height="240"></iframe>

### formmethod

&emsp;&emsp;重写表单的method属性

&emsp;&emsp;关于method的详细信息[移步至此](http://www.cnblogs.com/xiaohuochai/p/5174891.html#anchor6)

<div>
<pre>&lt;form action="#" method="get"&gt;
  First name: &lt;input type="text" name="fname" /&gt;&lt;br /&gt;
  Last name: &lt;input type="text" name="lname" /&gt;&lt;br /&gt;
&lt;input type="submit" value="提交" /&gt;
&lt;input type="submit" formmethod="post" formaction="#" value="使用POST提交" /&gt;
&lt;/form&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/html/input/i22.html" frameborder="0" width="320" height="240"></iframe>

### formnovalidate

&emsp;&emsp;重写表单的novalidate属性

&emsp;&emsp;关于novalidate的详细信息[移步至此](http://www.cnblogs.com/xiaohuochai/p/5174891.html#anchor8)

<div>
<pre>&lt;form action="#" method="get"&gt;
E-mail: &lt;input type="email" name="userid" /&gt;&lt;br /&gt;
&lt;input type="submit" value="提交" /&gt;&lt;br /&gt;
&lt;input type="submit" formnovalidate="formnovalidate" value="进行没有验证的提交" /&gt;
&lt;/form&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/html/input/i23.html" frameborder="0" width="320" height="240"></iframe>

### formtarget

&emsp;&emsp;重写表单的target属性

&emsp;&emsp;关于target的详细信息[移步至此](http://www.cnblogs.com/xiaohuochai/p/5174891.html#anchor4)

<div>
<pre>&lt;form action="#"&gt;
  First name: &lt;input type="text" name="fname" /&gt;&lt;br /&gt;
  Last name: &lt;input type="text" name="lname" /&gt;&lt;br /&gt;
&lt;input type="submit" value="提交" /&gt;
&lt;input type="submit" formtarget="_blank" value="提交到新窗口/选项卡" /&gt;
&lt;/form&gt;    </pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/html/input/i24.html" frameborder="0" width="320" height="240"></iframe>

