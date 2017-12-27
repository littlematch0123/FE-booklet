# 表单控件

 　　input元素无疑是一个庞大和复杂的元素，但它并不是唯一的表单控件。还有button、select、option、label、optgroup、textarea、fieldset、legend这八个传统表单控件，datalist、progress、meter、output、keygen这五个新增表单控件

![formCont](https://pic.xiaohuochai.site/blog/HTML_tags_formCont.png)

&nbsp;

## 传统控件

　　button 　　　　　　定义一个按钮

　　select 　　　　　　&nbsp;定义一个下拉列表

　　option 　　　　　　定义下拉列表中的一个选项

　　optgroup 　　　　 &nbsp;定义选项组，用于组合选项

　　textarea 　　　　　定义多行的文本输入控件

　　fieldset 　　　　　 &nbsp;分组表单内的相关元素

　　legend 　　　　　　定义fieldset元素的标题

　　label 　　　　　　 &nbsp;定义input元素的标注

### button

　　button元素用来定义一个按钮，button元素内部可以放置文本或图像或其他多媒体内容。但唯一禁止使用的元素是图像映射，因为它对鼠标和键盘敏感的动作会干扰表单按钮的行为

　　始终为button元素设置type属性，IE7-浏览器的默认类型是button，而其他浏览器的默认类型是submit

　　IE7-提交button元素之间的文本，而其他浏览器则会提交value属性的内容

　　&lt;button&gt;元素比&lt;input&gt;元素更易样式化。可以添加内联HTML内容（如&lt;em&gt;<span style="font-family: 'Open Sans', sans-serif;">，&lt;strong&gt;&nbsp;甚至&lt;img&gt;），并使用:after和:before伪元素实现复杂的渲染，而&lt;input&gt;只有文本值属性

<div class="cnblogs_code">
<pre>//IE7-浏览器:按下提交按钮时，URL添加?btn=1
//其他浏览器:按下button按钮时，URL添加?btn=2
&lt;form action="#" &gt;
&lt;button value="2" name="btn"&gt;1&lt;/button&gt;
&lt;input type="submit"&gt;
&lt;/form&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/html/control/c1.html" frameborder="0" width="320" height="240"></iframe>

【默认样式】

<div class="cnblogs_code">
<pre>chrome/safari
    padding: 1px 6px;
    border-width:1px;
firefox
    padding: 0px 6px;
    border-width:2px;
IE8-IE11
    padding: 3px 10px;
    border-width:1px;
IE7-
    padding: 1px 0.5px;
    border-width:1px;</pre>
</div>

【属性】

　　[autofocus](http://www.cnblogs.com/xiaohuochai/p/5179917.html#anchor2-2) 　　　　规定当页面加载时按钮自动获得焦点

　　[disabled](http://www.cnblogs.com/xiaohuochai/p/5179917.html#anchor1-6) 　　 　　 规定应该禁用该按钮

　　[form](http://www.cnblogs.com/xiaohuochai/p/5179917.html#anchor2-14) 　　　　 　 &nbsp;规定按钮属性一个或多个表单

　　[formaction](http://www.cnblogs.com/xiaohuochai/p/5179917.html#anchor2-15) 　　 &nbsp; &nbsp; 覆盖form元素的action属性

　　[formenctype](http://www.cnblogs.com/xiaohuochai/p/5179917.html#anchor2-16)　　 &nbsp; 覆盖form元素的enctype属性

　　[formmethod](http://www.cnblogs.com/xiaohuochai/p/5179917.html#anchor2-17) 　　 &nbsp;覆盖form元素的method属性

　　[formnovaliadate](http://www.cnblogs.com/xiaohuochai/p/5179917.html#anchor2-18)&nbsp; &nbsp; 覆盖form元素的novalidate属性

　　[formtarget](http://www.cnblogs.com/xiaohuochai/p/5179917.html#anchor2-19) 　　 &nbsp; &nbsp;覆盖form元素的target属性

　　[name](http://www.cnblogs.com/xiaohuochai/p/5179917.html#anchor1-1) 　　　　 &nbsp; &nbsp; 规定按钮的名称

　　[type](http://www.cnblogs.com/xiaohuochai/p/5179917.html#anchor1-2) 　　　　　　 规定按钮的类型

　　[value](http://www.cnblogs.com/xiaohuochai/p/5179917.html#anchor1-11) 　　　　　　规定按钮的初始值

### select

 　　select元素用来定义一个下拉列表，包含任意数量的option和optgroup元素

【属性】

　　autofocus 　　　　规定在页面加载后文本区域自动获得焦点

　　disabled 　　　　&nbsp; 规定禁用该下拉列表

　　form 　　　　　　 规定文本区域所属的一个或多个表单

　　multiple 　　　　 &nbsp;规定可选择多个选项

　　name 　　　　　　规定下拉列表的名称

　　size 　　　　　　 &nbsp;规定下拉列表中可见选项的数目

　　[注意]size不可为0，默认为1

【默认样式】

<div class="cnblogs_code">
<pre>chrome/safari
    border: 1px solid;
    box-sizing: border-box;
firefox
    padding: 1px;
    box-sizing: border-box;
IE9+
    border: 1px solid;
    box-sizing: border-box;
IE8-
    border: 1px solid;</pre>
</div>

 　　[注意]IE8-浏览器box-sizing:content-box;而其他浏览器box-sizing:border-box

【默认宽高】

<div class="cnblogs_code">
<pre>chrome
    width:65px;
    height:16px;
firefox
    width:54px;
    height:21px;
safari
    width: 56px;
    height: 15px;
IE8+
    width:74px;
    height:17px;</pre>
</div>

 　　[注意]safari浏览器无法设置高度

### option

　　option元素定义下拉列表中的一个选项

　　option元素有两种应用场景，除了用于下拉列表select外，还可以用于选项列表datalist中


【属性】

　　disabled 　　　　　　规定此选项应在首次加载时被禁用

　　label 　　　　　　 　&nbsp;定义当使用optgroup时所使用的标注，替代option元素内容

 　　　　[注意]firefox不支持label属性

　　selected 　　　　　　规定选项在首次显示在列表中时表现为选中状态

　　value 　　　　　　&nbsp; &nbsp;&nbsp;定义送往服务器的选项值

 　　　　[注意]当设置value值时，服务器提交的是value的值；否则提交给服务器的是option的元素内容

【默认样式】

<div class="cnblogs_code">
<pre>chrome
    padding: 0 2px 1px;</pre>
</div>

 　　[注意]option无法设置margin、padding、border等盒模型样式

### optgroup

 　　optgroup元素定义选项组，用于组合选项

 　　[注意]optgroup无法设置margin、padding、border等盒模型样式

【属性】

　　label 　　　　　　　为选项组规定描述(必须)

　　disabled 　　　　 　规定禁用该选项组(可选)

<div class="cnblogs_code">
<pre>&lt;button id="btn1a" type="button"&gt;启用&lt;/button&gt;
&lt;button id="btn1b" type="button"&gt;禁用&lt;/button&gt;
&lt;button id="btn2a" type="button"&gt;可多选&lt;/button&gt;
&lt;button id="btn2b" type="button"&gt;不可多选&lt;/button&gt;
&lt;button id="btn3a" type="button"&gt;size=1&lt;/button&gt;
&lt;button id="btn3b" type="button"&gt;size=2&lt;/button&gt;
&lt;button id="btn3c" type="button"&gt;size=3&lt;/button&gt;
&lt;button id="btn3d" type="button"&gt;不设置size&lt;/button&gt;    
&lt;form action="#"&gt;
    &lt;br&gt;&lt;br&gt;
    &lt;select name="test" id="select"&gt; 
        &lt;optgroup label="num"&gt;
            &lt;option value="11" disabled&gt;1&lt;/option&gt;
            &lt;option value="22" selected&gt;2&lt;/option&gt;
            &lt;option value="33"&gt;3&lt;/option&gt;
            &lt;option value="44" label="word"&gt;4&lt;/option&gt;        
        &lt;/optgroup&gt;
        &lt;optgroup  label="word"&gt;
            &lt;option&gt;a&lt;/option&gt;
            &lt;option&gt;b&lt;/option&gt;
            &lt;option&gt;c&lt;/option&gt;
            &lt;option&gt;d&lt;/option&gt;        
        &lt;/optgroup&gt;
        &lt;optgroup  label="汉字" disabled&gt;
            &lt;option value="一个"&gt;一&lt;/option&gt;
            &lt;option value="二个"&gt;二&lt;/option&gt;
            &lt;option value="三个"&gt;三&lt;/option&gt;
            &lt;option value="四个"&gt;四&lt;/option&gt;        
        &lt;/optgroup&gt;    
    &lt;/select&gt;
    &lt;input type="submit"&gt;    
&lt;/form&gt;
&lt;script&gt;
var select = document.getElementById('select');
btn1a.onclick = function(){
    select.removeAttribute('disabled');
}    
btn1b.onclick = function(){
    select.setAttribute('disabled','');
}
btn2a.onclick = function(){
    select.setAttribute('multiple','');
}
btn2b.onclick = function(){
    select.removeAttribute('multiple');
}
btn3a.onclick = function(){
    select.setAttribute('size','1');
}
btn3b.onclick = function(){
    select.setAttribute('size','2');
}
btn3c.onclick = function(){
    select.setAttribute('size','3');
}
btn3d.onclick = function(){
    select.removeAttribute('size');
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/html/control/c2.html" frameborder="0" width="320" height="240"></iframe>

### textarea

 　　textarea定义多行的文本输入控件，文本区可容纳无限数量的文本

 　　[注意]浏览器不允许textarea嵌套textarea

【默认样式】

<div class="cnblogs_code">
<pre>chrome/firefox/safari/IE
    padding: 2px;
    border: 1px solid;</pre>
</div>

【默认宽高】

<div class="cnblogs_code">
<pre>chrome
    width: 137px;
    height: 30px;
firefox
    width: 181px;
    height: 51px;
safari
    width: 181px;
    height: 32px;
IE9+
    width: 160px;
    height: 30px;</pre>
</div>

 　　[注意]IE8-浏览器宽高设置不包含滚动条；其他浏览器宽高设置包含滚动条

【样式重置】

<div class="cnblogs_code">
<pre>overflow: auto;
resize: none;
float: left;
outline: none;</pre>
</div>

【属性】

　　name 　　　　 规定文本区的名称

　　value&nbsp;　　　　 表示文本区的值

　　disabled 　　　规定禁用该文本区&nbsp;&nbsp;&nbsp;&nbsp;

　　[注意]IE7-浏览器不支持通过setAttribute('disabled','')的写法，必须设置为setAttribute('disabled','disabled')

　　readonly 　　&nbsp;规定文本区为只读&nbsp;

 　　[注意]IE7-浏览器不支持通过javascript设置readonly属性

<div class="cnblogs_code">
<pre>&lt;input id="btn1" type="button" value="禁用"&gt;
&lt;input id="btn2" type="button" value="启用"&gt;
&lt;input id="btn3" type="button" value="只读"&gt;
&lt;input id="btn4" type="button" value="读写"&gt;
&lt;textarea id="test"&gt;测试内容&lt;/textarea&gt;
&lt;script&gt;
btn1.onclick = function(){
    test.setAttribute('disabled','');
};
btn2.onclick = function(){
    test.removeAttribute('disabled');
};    
btn3.onclick = function(){
    test.setAttribute('readonly','readonly');
};
btn4.onclick = function(){
    test.removeAttribute('readonly');
};
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/html/control/c3.html" frameborder="0" width="320" height="240"></iframe>

　　form 　　　 &nbsp;&nbsp;规定文本区域所属的一个或多个表单

 　　[注意]IE浏览器不支持该属性

　　autofous 　　规定在页面加载后文本区域自动获得焦点&nbsp;&nbsp;&nbsp;

 　　[注意]IE9-浏览器不支持该属性

　　required 　　 规定文本区域是必填的

 　　[注意]IE9-浏览器和safari浏览器不支持该属性

　　placeholder 　规定描述文本区域预期值的简短提示

 　　[注意]IE9-浏览器不支持该属性

<div class="cnblogs_code">
<pre>&lt;input id="btn1" type="button" value="placeholder='123'"&gt;
&lt;input id="btn2" type="button" value="placeholder='abc'"&gt;
&lt;input id="btn3" type="button" value="必填"&gt;
&lt;input id="btn4" type="button" value="可不填"&gt;
&lt;form action="#"&gt;
    &lt;textarea id="test" placeholder="测试内容"&gt;&lt;/textarea&gt;    
    &lt;input type="submit"&gt;
&lt;/form&gt;
&lt;script&gt;
var test = document.getElementById('test');
btn1.onclick = function(){
    test.setAttribute('placeholder','123');
};
btn2.onclick = function(){
    test.setAttribute('placeholder','abc');
};    
btn3.onclick = function(){
    test.setAttribute('required','');
};
btn4.onclick = function(){
    test.removeAttribute('required');
};
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/html/control/c4.html" frameborder="0" width="320" height="240"></iframe>

　　maxlength 　　 规定文本区域的最大字符数

 　　[注意]IE9-浏览器不支持该属性

<div class="cnblogs_code">
<pre>&lt;input id="btn1" type="button" value="0"&gt;
&lt;input id="btn2" type="button" value="1"&gt;
&lt;input id="btn3" type="button" value="6"&gt;
&lt;input id="btn4" type="button" value="默认"&gt;
&lt;textarea id="test"&gt;&lt;/textarea&gt;    
&lt;script&gt;
btn1.onclick = function(){
    test.setAttribute('maxlength','0');
};
btn2.onclick = function(){
    test.setAttribute('maxlength','1');
};    
btn3.onclick = function(){
    test.setAttribute('maxlength','6');
};
btn4.onclick = function(){
    test.removeAttribute('maxlength');
};
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/html/control/c5.html" frameborder="0" width="320" height="240"></iframe>

　　cols 　　&nbsp;规定文本区内的可见列数

　　rows 　　 规定文本区内的可见行数

 　　[注意]可以用cols和rows来规定textarea的尺寸，但更好的办法是使用CSS的height和width属性

<div class="cnblogs_code">
<pre>&lt;form action="#"&gt;
    cols:&lt;input id="cols" pattern="\d" placeholder="请输入0-9的数字"&gt;&lt;br&gt;
    rows:&lt;input id="rows" pattern="\d" placeholder="请输入0-9的数字"&gt;
    &lt;input id="set" type="submit" value="设置"&gt;    
    &lt;textarea id="test"&gt;&lt;/textarea&gt;        
&lt;/form&gt;

&lt;script&gt;
var cols = document.getElementById('cols');
var rows = document.getElementById('rows');
var test = document.getElementById('test');
var set = document.getElementById('set');
set.onclick = function(){
    test.setAttribute('cols',cols.value);
    test.setAttribute('rows',rows.value);
};
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/html/control/c6.html" frameborder="0" width="320" height="240"></iframe>

　　wrap&nbsp;&nbsp;　　规定当在表单中提交时，文本区域中折行如何处理

 　　当wrap="soft"，表示表单提交时，虽然文字在屏幕上折行，但提交的数据里不会有换行符(默认值)；而当wrap="hard"，表示表单提交时，提交的数据包含文本换行符%0D%0A

<div class="cnblogs_code">
<pre>//hard:?test=111111111111111111111%0D%0A1#
//soft:?test=1111111111111111111111111111#
&lt;form action="#"&gt;
    &lt;input id="hard" type="button" value="wrap:hard"&gt;
    &lt;input id="soft" type="button" value="wrap:soft(默认)"&gt;
    &lt;input id="set" type="submit" value="设置"&gt;    
    &lt;textarea id="test" name="test"&gt;&lt;/textarea&gt;        
&lt;/form&gt;
&lt;script&gt;
var hard = document.getElementById('hard');
var soft = document.getElementById('soft');
var test = document.getElementById('test');
var set = document.getElementById('set');
hard.onclick = function(){
    test.setAttribute('wrap','hard');
}
soft.onclick = function(){
    test.setAttribute('wrap','soft');
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/html/control/c7.html" frameborder="0" width="320" height="240"></iframe>

### fieldset

 　　fieldset元素用于将表单内的相关元素分组，提升可访问性，多数浏览器用一个简单的边框来显示fieldset

【默认样式】

<div class="cnblogs_code">
<pre>chrome/firefox/safari
    display:block;
    margin: 0 2px;
    border: 2px groove threedface;
    padding: 5px 12px 10px;
IE9+
    display: block;
    margin: 0 2px;
    border: 1px solid;
    padding: 3px 3px 4px;
IE8
    display: block;
    margin: 0 2px;
    border: 1px solid;
    padding: 1px 3px 4px;
IE7-
    display: block;
    border: 1px solid;
    padding: 1px 3px 4px;</pre>
</div>

【属性】

　　disabled　　　　  禁用fieldset

　　form 　　　　　　规定fieldset所属的一个或多个表单&nbsp;&nbsp;

　　name 　　　　 　规定fieldset的名称

### legend

 　　legend元素用于定义fieldset元素的标题

<div class="cnblogs_code">
<pre>&lt;fieldset&gt;
    &lt;legend&gt;健康信息&lt;/legend&gt;
    身高：&lt;input type="text" /&gt;
    体重：&lt;input type="text" /&gt;
&lt;/fieldset&gt;</pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/html/control/c8.html" frameborder="0" width="320" height="240"></iframe>

### label

　　label元素为input元素定义标注，建立文字标签与表单控件的关联。在label元素内点击文本会触发此控件，选择该文本时浏览器会自动把焦点转到和标签相关的表单控件上

　　label元素有两种用法：一种是使用for属性，另一种是将表单控件嵌套到label内部。但IE6浏览器只识别使用for属性的方法

【属性】

　　for 　　　　 规定label绑定到哪个表单元素

　　form 　　 　规定label字段所属的一个或多个表单

 　　[注意]label标签的for属性要与相关元素的id属性相同

<div class="cnblogs_code">
<pre>&lt;h4&gt;使用for方法&lt;/h4&gt;
&lt;label for="male"&gt;Male&lt;/label&gt;
&lt;input type="radio" name="sex1" id="male" /&gt;
&lt;br /&gt;
&lt;label for="female"&gt;Female&lt;/label&gt;
&lt;input type="radio" name="sex1" id="female" /&gt;
&lt;h4&gt;使用嵌套方法&lt;/h4&gt;
&lt;label&gt;Male&lt;input type="radio" name="sex2" /&gt;&lt;/label&gt;
&lt;br /&gt;
&lt;label&gt;Female&lt;input type="radio" name="sex2"  /&gt;&lt;/label&gt;</pre>
</div>

<iframe style="width: 100%; height: 220px;" src="https://demo.xiaohuochai.site/html/control/c9.html" frameborder="0" width="320" height="240"></iframe>

【js属性】

　　label控件有三个javascript属性，分别是form、htmlFor和control

　　form表示label控件所归属的表单

　　htmlFor表示label控件的for属性的字符串值

　　control表示label控件所指定的input控件(注意：IE浏览器不支持)

<div class="cnblogs_code">
<pre>&lt;form id="myForm"&gt;
  &lt;input type="file" id="myFile"&gt;
  &lt;label for="myFile" id="myLabel"&gt;我是label&lt;/label&gt;
&lt;/form&gt;
&lt;script&gt;
var myLabel = document.getElementById('myLabel');
console.log(myLabel.form);//&lt;form id="myForm"&gt;
console.log(myLabel.htmlFor);//'myFile'
console.log(myLabel.control);//&lt;input type="file" id="myFile"&gt;
&lt;/script&gt;</pre>
</div>

&nbsp;

## 新增控件

　　datalist 　　　　定义输入域的选项列表

　　keygen 　　　　定义密钥对生成器，用于生成密钥

　　output 　　　　用于显示计算的结果

　　progress 　　&nbsp; &nbsp;用于显示进度(前进量)

　　meter 　　　　 用于显示度量(剩余量)

### datalist

　　datalist元素规定输入域的选项列表，列表是通过datalist内的option元素创建的。如果需要把datalist绑定到输入域，需要把输入域的list属性引用datalist的id。option元素一定要设置value属性

　　[注意]IE9-浏览器及safari浏览器不支持

<div class="cnblogs_code">
<pre>&lt;form action="#"&gt;
    &lt;input list="list" name="input"&gt;
    &lt;datalist id="list"&gt;
        &lt;option value="1"&gt;
        &lt;option value="2"&gt;
        &lt;option value="3"&gt;
    &lt;/datalist&gt;
&lt;/form&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/html/control/c10.html" frameborder="0" width="320" height="240"></iframe>

### keygen

　　keygen规定用于表单的密钥生成器字段，当提交表单时，私钥存储在本地，公钥发送到服务器

　　[注意]safari和IE不支持该属性，chrome部分支持该属性

【属性】

　　autofocus 　　　　使用keygen字段在页面加载时获得焦点

　　challenge 　　 　 &nbsp;如果使用，则将keygen的值设置为在提交时询问

　　disabled 　　　　&nbsp; 禁用keygen字段

　　form 　　　　 　　定义该keygen字段所属的一个或多个表单

　　keytype 　　 　　 定义keytype，rsa生成RSA密钥(默认)

　　name 　　　　 　&nbsp;定义keygen元素的唯一名称

<div class="cnblogs_code">
<pre>//firefox: 1-&gt;usr_name=1&amp;security=MIIBOjCBpDCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA1HUwmm%2B75QTnuDXC%0D%0AnUsL8cD8KkncFnA6TRaJttYss0Oi6dVzOPOtdK0O7wxD4%2BIhjSMZRD%2FddKFciZw0%0D%0AURyAimXxe%2FlDKmR3Nb1SzmqA7RJnns%2FA%2BduiYeeIIiMSL2ydUOvQvVFYMtaDkWra%0D%0AtpQfeWv1Hjz9hb7HlGzOUbtGrAECAwEAARYAMA0GCSqGSIb3DQEBBAUAA4GBAJ0I%0D%0ATWv7CdcNzqkaq5OpN6GHWtrlIpD5UAL%2FOiFDICb%2F8PFgV7FQk0MaGwj5XzQfEu4B%0D%0A6YlAbyz2l91I9%2FJW6Oerru5wL646OpvnTvD2U%2FzByU%2FHWp0BRNeDqntMAsGvzl6D%0D%0AoNsHTwLjDUGYVILge4syfcQVRpFRZiyVRaNlIJT9#
&lt;form action="#"&gt;
    Username: &lt;input type="text" name="usr_name" /&gt;
    Encryption: &lt;keygen name="security"  /&gt;
    &lt;input type="submit" /&gt;
&lt;/form&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/control/c11.html" frameborder="0" width="320" height="240"></iframe>

### output

　　output元素用于显示计算的结果，这是一个语义化标签，定义不同类型的输出，比如脚本的输出

　　[注意]IE浏览器不支持该属性

【属性】

　　for 　　　　定义输出域相关的一个或多个元素

　　form 　　&nbsp; &nbsp;定义输入字段所属的一个或多个元素

　　name 　　&nbsp; 定义对象的唯一名称

<div class="cnblogs_code">
<pre>&lt;form oninput="x.value=parseInt(a.value)+parseInt(b.value)"&gt;
    0&lt;input type="range" id="a" value="50"&gt;100
    +&lt;input type="number" id="b" value="50"&gt;
    =&lt;output name="x" for="a b"&gt;&lt;/output&gt;
&lt;/form&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/control/c12.html" frameborder="0" width="320" height="240"></iframe>

### progress

　　progress元素用来标示任务的进度或进程(常用于表示过程)

　　[注意]IE9-浏览器及safari浏览器不支持

【属性】

　　max 　　　　 规定任务一共需要多少工作

　　value 　　 　&nbsp;规定已经完成多少工作

　　如果progress控件什么属性都不设置，则会有进度条左右往返运动的效果

<div class="cnblogs_code">
<pre>&lt;progress&gt;&lt;/progress&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/html/control/c13.html" frameborder="0" width="320" height="240"></iframe>

<div class="cnblogs_code">
<pre>&lt;input id="btn" type="button" value="开始下载"&gt;
下载进度：&lt;progress id="test" value="0" max="100"&gt;&lt;/progress&gt;
&lt;script&gt;
var oTimer;
btn.onclick = function(){
    if(oTimer){
        return;
    }
    oTimer = setInterval(function(){
        test.value++;
        if(test.value &gt;= test.max){
            clearInterval(oTimer);
        }
    },50);     
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/control/c14.html" frameborder="0" width="320" height="240"></iframe>

### meter

　　meter元素用于显示剩余容量或剩余库存(常用于表示状态)

　　[注意]IE浏览器及safari浏览器不支持

【属性】

　　form 　　　　 规定meter元素所属的一个或多个表单

　　high 　　　　 规定被视作高的值的范围

　　low 　　 　　&nbsp; 规定被视作低的值的范围

　　max 　　　　&nbsp;规定范围的最大值

　　min 　　　　&nbsp; 规定范围的最小值

　　optimum 　　规定度量的最优值

　　value 　　　 &nbsp;规定度量的当前值(必需)

 　　[注意]min 小于 low 小于 high 小于 max

<div class="cnblogs_code">
<pre>&lt;input id="btn" type="button" value="增加库存"&gt;
库存量：&lt;meter id="test" value="10" min="0" low="30" optimum="60" high="80" max="100" &gt;&lt;/meter&gt;
&lt;script&gt;
var oTimer;
btn.onclick = function(){
    if(oTimer){
        return;
    }
    oTimer = setInterval(function(){
        test.value++;
        if(test.value &gt;= test.max){
            clearInterval(oTimer);
        }
    },50);     
};
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/control/c15.html" frameborder="0" width="320" height="240"></iframe>

　　如果meter标签的value属性，取值为小数，如0.3，且没有max属性值时，则颜色块显示为宽高的30%

<div class="cnblogs_code">
<pre>&lt;meter value="0.3"&gt;&lt;/meter&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/html/control/c16.html" frameborder="0" width="320" height="240"></iframe>
