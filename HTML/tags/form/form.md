# 了解HTML表单之form元素

&emsp;&emsp;表单是网页与用户的交互工具，由一个&lt;form&gt;元素作为容器构成，封装其他任何数量的表单控件，还有其他任何&lt;body&gt;元素里可用的标签

&emsp;&emsp;表单能够包含&lt;input&gt;、&lt;menus&gt;、&lt;textarea&gt;、&lt;fieldset&gt;、&lt;legend&gt;、&lt;label&gt;等表单控件元素

&emsp;&emsp;注意：表单里嵌套表单是不允许的

&nbsp;

## form元素

&emsp;&emsp;form元素有accept-charset、action、autocomplete、enctype、method、name、novalidate、target共8个属性，其中action和name属性为必需项

&nbsp;

### 表单名称

&emsp;&emsp;name属性规定表单名称，如果name="test"，则Javascript可以使用document.forms.test来获取该表单

<div class="cnblogs_code">
<pre>&lt;form method="get" action="form.php" name="test"&gt;&lt;/form&gt;    
&lt;script&gt;
    var oForm = document.forms.test;
    console.log(oForm.method);//get
&lt;/script&gt;</pre>
</div>

&nbsp;

### 字符集

&emsp;&emsp;accept-charset 属性是一个空格分隔的字符集列表，规定了服务器处理表单数据所接受的字符集。accept-charset 属性允许指定一系列字符集，服务器必须支持这些字符集，从而得以正确解释表单中的数据。该属性的值是用引号包含字符集名称列表。如果可接受字符集与用户所使用的字符即不相匹配的话，浏览器可以选择忽略表单或是将该表单区别对待。此属性的默认值是 "unknown"，表示表单的字符集与包含表单的文档的字符集相同。在之前版本的HTML中，不同的字符编码可以用空格或逗号分隔。在HTML5中，只有空格可以允许作为分隔符

&nbsp;

### 提交地址

&emsp;&emsp;action属性规定提交表单时，向何处发送表单数据；如果忽略这个属性，表单会重定向到表单所在的URL。这个值可以被&nbsp;&lt;button&gt;&nbsp;或者&nbsp;&lt;input&gt;&nbsp;元素中的&nbsp;formaction属性重载(覆盖)

&nbsp;

### 打开方式

&emsp;&emsp;target属性规定在何处打开action URL。共5个值_blank、_self、_parent、_top、framename。

&emsp;&emsp;关于target属性的使用[移步至此](http://www.cnblogs.com/xiaohuochai/p/5007282.html#anchor2)

&nbsp;

### 数据编码

&emsp;&emsp;enctype 属性规定在发送到服务器之前应该如何对表单数据进行编码。大多数情况下该属性不需要设置。这个值可以被&nbsp;&lt;button&gt;&nbsp;或者&nbsp;&lt;input&gt;&nbsp;元素中的&nbsp;formenctype属性重载(覆盖)。当 method属性值为 post时，&nbsp;enctype是提交form给服务器的内容的&nbsp;MIME 类型&nbsp;。可能的取值有:

&emsp;&emsp;application/x-www-form-urlencoded&emsp;&emsp;在发送前编码所有字符（默认）

&emsp;&emsp;multipart/form-data&emsp;&emsp;不对字符编码。在使用包含文件上传控件的表单时，必须使用该值

&emsp;&emsp;text/plain&emsp;&emsp;空格转换为 "+" 加号，但不对特殊字符编码

&nbsp;

### 数据发送

&emsp;&emsp;表单可以用两种方式(method)发送数据：GET和POST，默认为GET方法。这个值可以被&nbsp;&lt;button&gt;&nbsp;或者&nbsp;&lt;input&gt;&nbsp;元素中的&nbsp;formmethod属性重载(覆盖)

**POST方法**

&emsp;&emsp;如果采用POST方法，浏览器将会按照下面两步来发送数据。首先，浏览器将与action属性中指定的表单处理服务器建立联系，一旦建立连接之后，浏览器就会按分段传输的方法将数据发送给服务器

&emsp;&emsp;在服务器端，一旦POST样式的应用程序开始执行时，就应该从一个标志位置读取参数，而一旦读到参数，在应用程序能够使用这些表单值以前，必须对这些参数进行解码。用户特定的服务器会明确指定应用程序应该如何接受这些参数

【应用场景】

&emsp;&emsp;1、大数据处理，因为POST方法相比GET方法而言，处理更多字段

&emsp;&emsp;2、安全数据，因为GET方法将表单参数直接放在应用程序的 URL 中，这样网络窥探者可以很轻松地捕获它们，还可以从服务器的日志文件中进行摘录；而POST方法则没有这方面的漏洞

**GET方法** 

&emsp;&emsp;如果采用GET方法，浏览器会与表单处理服务器建立连接，然后直接在一个传输步骤中发送所有的表单数据：浏览器会将数据直接附在表单的action URL之后。这两者之间用问号进行分隔。

【应用场景】

&emsp;&emsp;1、获得最佳表单传输性能，因为GET发送只有少数简单字段

&emsp;&emsp;2、简单处理，因为GET方法无需处理编码解码方法

&emsp;&emsp;3、传参处理，因为GET方法允许把表单的参数包括进来作为 URL 的一部分

<div class="cnblogs_code">
<pre>&lt;h3&gt;get方法&lt;/h3&gt;
&lt;form method="get" action="form.php" target = "_blank"&gt;
    &lt;p&gt;&lt;label&gt;x:&lt;input name="x"&gt;&lt;/label&gt;&lt;/p&gt;
    &lt;p&gt;&lt;label&gt;y:&lt;input name="y"&gt;&lt;/label&gt;&lt;/p&gt;
    &lt;p&gt;&lt;button type="submit"&gt;Submit&lt;/button&gt;&lt;/p&gt;
&lt;/form&gt;    
&lt;a title="form.php?x=28&amp;y=66" href="form.php?x=28&amp;amp;y=66"&gt;a标签传参&lt;/a&gt;
&lt;h3&gt;post方法&lt;/h3&gt;
&lt;form method="post" action="form.php"  target = "_blank"&gt;
    &lt;p&gt;&lt;label&gt;x:&lt;input name="x"&gt;&lt;/label&gt;&lt;/p&gt;
    &lt;p&gt;&lt;label&gt;y:&lt;input name="y"&gt;&lt;/label&gt;&lt;/p&gt;
    &lt;p&gt;&lt;button type="submit"&gt;Submit&lt;/button&gt;&lt;/p&gt;
&lt;/form&gt;    </pre>
</div>
<div class="cnblogs_code">
<pre>//GET方法的URL显示为： http://127.0.0.1/form.php?x=1&amp;y=2
//POST方法的URL显示为：http://127.0.0.1/form.php
&lt;p&gt;
&lt;?php
if(isset($_REQUEST["x"]) &amp;&amp; isset($_REQUEST["y"])){
    echo "x: " .$_REQUEST["x"] ."&lt;br&gt;";
    echo "y: " .$_REQUEST["y"];
}
?&gt;    
&lt;/p&gt;</pre>
</div>

&nbsp;

### 自动完成

&emsp;&emsp;autocomplete是HTML5新增的一个属性，规定表单是否应该启用自动完成功能。当用户在字段开始键入时，浏览器基于之前键入过的值，应该显示出在字段中填写的选项

&emsp;&emsp;注意：IE浏览器不支持该属性，只有元素拥有name属性，该属性才有效

<div class="cnblogs_code">
<pre>&lt;form autocomplete="on | off"&gt; //该属性默认为on，当设置为off时，规定禁用自动完成功能</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;button id="btn1"&gt;打开自动完成&lt;/button&gt;
&lt;button id="btn2"&gt;关闭自动完成&lt;/button&gt;
&lt;form method="get" action="#" name="test"&gt;
    &lt;p&gt;&lt;label&gt;x:&lt;input name="x"&gt;&lt;/label&gt;&lt;/p&gt;
    &lt;p&gt;&lt;label&gt;y:&lt;input name="y"&gt;&lt;/label&gt;&lt;/p&gt;
    &lt;p&gt;&lt;button type="submit"&gt;Submit&lt;/button&gt;&lt;/p&gt;    
&lt;/form&gt;    
&lt;script&gt;
var oForm = document.forms.test;
btn1.onclick = function(){
    oForm.autocomplete = 'on';
};
btn2.onclick = function(){
    oForm.autocomplete = 'off';
};
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/html/form/f1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 表单验证

&emsp;&emsp;novalidate是HTML5新增的一个属性，规定当提交表单时不对其进行验证

&emsp;&emsp;注意：IE9-不支持

<div class="cnblogs_code">
<pre>&lt;button id="btn1"&gt;打开验证&lt;/button&gt;
&lt;button id="btn2"&gt;关闭验证&lt;/button&gt;
&lt;form method="get" action="#" name="test"&gt;
    E-mail: &lt;input type="email" name="user_email" /&gt;
    &lt;input type="submit" /&gt;
&lt;/form&gt;    
&lt;script&gt;
var oForm = document.forms.test;
btn1.onclick = function(){
    oForm.removeAttribute('novalidate');
};
btn2.onclick = function(){
    oForm.setAttribute('novalidate','');
};
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/html/form/f2.html" frameborder="0" width="320" height="240"></iframe>

