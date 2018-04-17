# input元素的23种type类型

&emsp;&emsp;随着HTML5的出现，input元素新增了多种类型，用以接受各种类型的用户输入。其中，button、checkbox、file、hidden、image、password、radio、reset、submit、text这10个是传统的输入控件，新增的有color、date、datetime、datetime-local、email、month、number、range、search、tel、time、url、week共13个

![inputType](https://pic.xiaohuochai.site/blog/HTML_tags_inputType.png)



## 传统类型

&emsp;&emsp;text&emsp;&emsp;定义单行的输入字段，用户可在其中输入文本

&emsp;&emsp;password&emsp;&emsp;定义密码字段。该字段中的字符被掩码

&emsp;&emsp;file&emsp;&emsp;定义输入字段和 "浏览"按钮，供文件上传

&emsp;&emsp;radio&emsp;&emsp;定义单选按钮

&emsp;&emsp;checkbox&emsp;&emsp;定义复选框

&emsp;&emsp;hidden&emsp;&emsp;定义隐藏的输入字段

&emsp;&emsp;button&emsp;&emsp;定义可点击按钮（多数情况下，用于通过JavaScript启动脚本）

&emsp;&emsp;image&emsp;&emsp;定义图像形式的提交按钮

&emsp;&emsp;reset&emsp;&emsp;定义重置按钮。重置按钮会清除表单中的所有数据

&emsp;&emsp;submit&emsp;&emsp;定义提交按钮。提交按钮会把表单数据发送到服务器

### text

&emsp;&emsp;type="text"表示一个文本输入框，它是默认的输入类型，是一个单行的控件，一般是一个带有内嵌框的矩形

### password

&emsp;&emsp;type="password"表示一个密码输入框，它与文本输入框几乎一模一样，功能上唯一的不同的字母输入后会被隐藏，一般是一连串的点

【默认样式】

<div>
<pre>chrome/safari/opera
    padding: 1px 0px;
    border: 2px inset;
firefox
    padding: 2px;
    border-width: 1px;
ie
    padding: 2px 1px;
    border-width: 1px;</pre>
</div>

【默认宽高】

<div>
<pre>chrome
    height: 14px;
    width: 148px;
safari
    height: 15px;
    width: 148px;
firefox
    height: 17px;
    width: 137px;
IE9+
    height: 14px;
    width: 147px;
IE8-
    height: 16px;
    width: 149px;</pre>
</div>

【重置样式】

<div>
<pre>padding: 0;
border: 1px solid;</pre>
</div>

&emsp;&emsp;注意：IE6浏览器设置的type="text"或"password"的input元素的宽高为包含padding和border的宽高

&emsp;&emsp;&lt;演示框&gt;点击下列相应按钮可进行演示

<iframe style="width: 100%; height: 170px;" src="https://demo.xiaohuochai.site/html/type/t1.html" frameborder="0" width="320" height="240"></iframe>

【tips】模拟密码显示隐藏的功能

&emsp;&emsp;说明：现在很多软件在密码框右侧都有一个小眼睛，用于设置密码的显示和隐藏。通过更改input元素的type属性得以实现

<div>
<pre>&lt;style&gt;
body{
    margin: 0;
    font-size: 16px;
}    
#show{
    padding: 0;
    border: 1px solid black;
    height: 20px;
    width: 200px;
    line-height: 20px;
}
#set{
    display: inline-block;
    height: 22px;
    background-color: rgba(0,0,0,0.5);
    color: white;
    line-height: 18px;
    margin-left: -72px;
    cursor: pointer;
}
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;input id="show" type="password" maxlength="6"&gt;
&lt;span id="set"&gt;显示密码&lt;/span&gt;
&lt;script&gt;
set.onclick = function(){
    if(this.innerHTML == '显示密码'){
        this.innerHTML = '隐藏密码';
        show.type="text";
    }else{
        this.innerHTML = '显示密码';
        show.type="password";
    }
}    
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 30px;" src="https://demo.xiaohuochai.site/html/type/t2.html" frameborder="0" width="320" height="240"></iframe>

### file

&emsp;&emsp;type="file"定义输入字段和"浏览"按钮，用于文件上传

【重置样式】

<div>
<pre>    padding: 0;
    border: 0;</pre>
</div>

【默认宽高】

<div>
<pre>chrome
    height: 21px;
    width: 238px;
safari
    height: 21px;
    width: 238px;
firefox
    height: 27px;
    width: 222px;
IE9+
    height: 21px;
    width: 220px;
IE8
    height: 16px;
    width: 214px;
IE7-
    height: 15px;
    width: 210px;</pre>
</div>

&emsp;&emsp;注意：IE8-浏览器设置的type="file"的input元素的宽高为包含padding和border的宽高

&emsp;&emsp;该类型的input元素支持accept属性和multiple属性

&emsp;&emsp;[关于accept属性的详细信息移步至此](http://www.cnblogs.com/xiaohuochai/p/5179917.html#anchor1-3)

&emsp;&emsp;[关于multiple属性的详细信息移步至此](http://www.cnblogs.com/xiaohuochai/p/5179917.html#anchor2-10)

### radio

&emsp;&emsp;type="radio"定义单选按钮，允许用户从给定数目的选择中选一个选项。同一组按钮，name值一定要一致

&emsp;&emsp;注意：radio类型的input元素无法设置padding和border(除IE10-浏览器以外)

【默认样式】

<div>
<pre>chrome/safari/opera/firefox
    margin: 3px 3px 0 5px;
    box-sizing:border-box;
ie11
    margin: 3px 3px 3px 4px;
    box-sizing:border-box;
ie10-
    padding: 3px;
    box-sizing:border-box;</pre>
</div>

【默认宽高】

<div>
<pre>chrome/safari/IE
    height: 13px;
    width: 13px;
firefox
    height: 16px;
    width: 16px;</pre>
</div>

【重置样式】

<div>
<pre>    padding: 0;
    margin: 0;
    border: 0;</pre>
</div>

### checkbox

&emsp;&emsp;type="checkbox"定义多选按钮，允许用户在给定数目的选择中选择一个或多个选项。同一组的按钮，name取值一定要一致

&emsp;&emsp;注意：checkbox类型的input元素无法设置padding和border(除IE10-浏览器以外)

【默认样式】

<div>
<pre>chrome/safari/opera/firefox/ie11
    margin: 3px 3px 3px 4px;
    box-sizing:border-box;
ie10-
    padding: 3px;
    box-sizing:border-box;</pre>
</div>

【默认宽高】

<div>
<pre>chrome/safari/IE
    height: 13px;
    width: 13px;
firefox
    height: 16px;
    width: 16px;</pre>
</div>

【重置样式】

<div>
<pre>    padding: 0;
    margin: 0;
    border: 0;</pre>
</div>

&emsp;&emsp;type="radio"或"checkbox"的input元素支持checked属性

&emsp;&emsp;[关于checked属性的详细情况移步至此](http://www.cnblogs.com/xiaohuochai/p/5179917.html#anchor1-5)

### hidden

&emsp;&emsp;type="hidden"定义隐藏输入类型用于在表单中增加对用户不可见，但需要提交的额外数据

&emsp;&emsp;注意：disabled属性无法与type="hidden"的input元素一起使用

<div>
<pre>//点击提交按钮后，隐藏域的内容test=12会包含在URL中
&lt;form name="form" action="#"&gt;
    &lt;input type="hidden" name="test" value="12"&gt;
    &lt;input type="submit"&gt;
&lt;/form&gt;</pre>
</div>

### button

&emsp;&emsp;type="button"的input输入类型定义可点击的按钮，但没有任何行为，常用于在用户点击时启动javascript程序

【button、submit、reset的默认样式】

<div>
<pre>chrome/safari
    padding: 1px 6px;
    border: 2px outset buttonface;
    box-sizing:border-box;
firefox
    padding: 0 6px;
    border: 3px outset;
    box-sizing:border-box;
IE9+
    padding: 3px 10px;
    border: 1px outset;
    box-sizing:border-box;    
IE8
    padding: 3px 10px;
    border: 1px outset;
IE7-
    padding: 1px 0.5px;
    border: 1px outset;</pre>
</div>

&emsp;&emsp;注意：IE8-浏览器的box-sizing:content-box;而其他浏览器的box-sizing:border-box;

<div>
<pre>&lt;input type="button" value="Click me" onclick="alert(1)" /&gt;    </pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/html/type/t3.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;type="button"的input输入类型和button元素有很多重叠特性

&emsp;&emsp;[关于button元素的详细信息移步至此](http://www.cnblogs.com/xiaohuochai/p/5180638.html#anchor1-1)

### image

&emsp;&emsp;type="image"的input输入类型定义图像形式的提交按钮，该类型可以设置width、height、src、alt这四个属性

&emsp;&emsp;用图片作为提交按钮会一起发送点击在图片上的x和y坐标，这样可以与服务器端图片地图结合使用，如果图片有name属性，也会随坐标发送

<div>
<pre>&lt;form action="#"&gt;
    &lt;input name="test"&gt;
    &lt;input type="image" name="imagesubmit" src="https://demo.xiaohuochai.site/submit.jpg" width="99" height="99" alt="测试图片"&gt;
&lt;/form&gt;    </pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/html/type/t4.html" frameborder="0" width="320" height="240"></iframe>

### submit

&emsp;&emsp;type="submit"的input输入类型用于创建提交表单的按钮

### reset

&emsp;&emsp;type="reset"的input输入类型用于创建重置表单的按钮

<div>
<pre>&lt;form action="#" method="get"&gt;
    &lt;input&gt;
    &lt;input type="reset" value="Reset" /&gt;
    &lt;input type="submit" value="Submit" /&gt;
&lt;/form&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/type/t5.html" frameborder="0" width="320" height="240"></iframe>

## **新增类型**

&emsp;&emsp;color&emsp;&emsp;定义调色板

&emsp;&emsp;tel&emsp;&emsp;定义包含电话号码的输入域

&emsp;&emsp;email&emsp;&emsp;定义包含email地址的输入域

&emsp;&emsp;url&emsp;&emsp;定义包含URL地址的输入域 

&emsp;&emsp;search&emsp;&emsp;定义搜索域

&emsp;&emsp;number&emsp;&emsp;定义包含数值的输入域

&emsp;&emsp;range&emsp;&emsp;定义包含一定范围内数字值的输入域

&emsp;&emsp;date&emsp;&emsp;定义选取日、月、年的输入域 

&emsp;&emsp;month&emsp;&emsp;定义选取月、年的输入域

&emsp;&emsp;week&emsp;&emsp;定义选取周、年的输入域

&emsp;&emsp;time&emsp;&emsp;定义选取月、年的输入域

&emsp;&emsp;datetime&emsp;&emsp;定义选取时间、日 月、年的输入域(UTC时间)

&emsp;&emsp;datatime-local&emsp;&emsp;定义选取时间、日 月、年的输入域(本地时间)

### color

&emsp;&emsp;type="color"的input输入类型会创建一个调色板用来选择颜色，颜色值以URL编码后的十六进制数值提交。如黑色会以%23000000发送，其中%23是#的URL编码

&emsp;&emsp;注意：safari和IE不支持该类型

【默认样式】

<div>
<pre>chrome
    width:44px;
    height:23px;
    border: 1px solid rgb(169,169,169);
    padding: 1px 2px;
firefox
    width:46px;
    height:17px;
    border: 3px solid rgb(169,169,169);
    padding: 6px 0;    </pre>
</div>
<div>
<pre>&lt;input type="color"&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/type/t6.html" frameborder="0" width="320" height="240"></iframe>

### tel

&emsp;&emsp;type="tel"的input输入类型用于表示语义上的电话输入域，外观上与type="text"的input输入类型没有差异，在手机端会唤出数字键盘

<div>
<pre>&lt;form action="#"&gt;
    &lt;input type="tel" placeholder="请输入11位手机号码" pattern="\d{11}"&gt;    
    &lt;input type="submit"&gt;
&lt;/form&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/type/t7.html" frameborder="0" width="320" height="240"></iframe>

### email

&emsp;&emsp;type="email"的input输入类型用于表示语义上的e-mail地址输入域，会自动验证email域的值，外观上与type="text"的input输入类型没有差异，在手机端会唤出英文键盘

&emsp;&emsp;email类型的input元素支持multiple属性

&emsp;&emsp;注意：IE9-浏览器及safari浏览器不支持

<div>
<pre>&lt;form action="#" &gt;
    &lt;input type="email" name="email" multiple&gt;
    &lt;input type="submit"&gt;
&lt;/form&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/type/t8.html" frameborder="0" width="320" height="240"></iframe>

### url

&emsp;&emsp;type="url"的input输入类型用于表示语义上的url地址的输入域，会自动验证url域的值，外观上与type="text"的input输入类型没有差异

&emsp;&emsp;注意：IE9-浏览器及safari浏览器不支持

<div>
<pre>&lt;input type="url"&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/type/t9.html" frameborder="0" width="320" height="240"></iframe>

### search

&emsp;&emsp;type="search"的input输入类型用于表示语义上的搜索框，外观上与type="text"的input输入类型没有差异

<div>
<pre>&lt;input type="search"&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/type/t10.html" frameborder="0" width="320" height="240"></iframe>

### number

&emsp;&emsp;type="number"的input输入类型用于处理数字输入，在手机端会唤出数字键盘

&emsp;&emsp;注意：IE不支持该类型

【默认样式】

<div>
<pre>chrome/safari
    border: 2px inset;
    padding-left: 1px;
firefox
    border: 1px inset;
    padding: 2px;</pre>
</div>

【属性】

&emsp;&emsp;max&emsp;&emsp;规定允许的最大值

&emsp;&emsp;min&emsp;&emsp;规定允许的最小值

&emsp;&emsp;step&emsp;&emsp;规定合法的数字间隔

&emsp;&emsp;value&emsp;&emsp;规定默认值

&emsp;&emsp;注意：属性的取值可为小数

<div>
<pre>&lt;input type="number" min="0" max="10" step="0.5" value="6" /&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/type/t11.html" frameborder="0" width="320" height="240"></iframe>

### range

&emsp;&emsp;type="range"的input输入类型用于处理包含在一定范围内的数字输入，类似于type="number"的input类型

&emsp;&emsp;注意：IE9-不支持该类型

【默认样式】

<div>
<pre>chrome/safari
    margin: 2px;
firefox
    border: 1px inset;
    padding: 1px;
    margin: 0 9.3px;
IE10+
    padding: 17px 0 32px;</pre>
</div>

【属性】

&emsp;&emsp;max&emsp;&emsp;规定允许的最大值

&emsp;&emsp;min&emsp;&emsp;规定允许的最小值

&emsp;&emsp;step&emsp;&emsp;规定合法的数字间隔

&emsp;&emsp;value&emsp;&emsp;规定默认值

&emsp;&emsp;注意：属性的取值可为小数

<div>
<pre>&lt;input type="range" min="0" max="10" step="0.5" value="6" /&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/type/t12.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;注意：如果不设置min和max属性，则默认min=0，max=100

&emsp;&emsp;HTML5拥有多个可供选取日期和时间的新输入类型

### date

&emsp;&emsp;type="date"的input输入类型用于选取日、月、年

### month

&emsp;&emsp;type="month"的input输入类型用于选取月、年

### week

&emsp;&emsp;type="week"的input输入类型用于选取周、年

### time

&emsp;&emsp;type="time"的input输入类型用于选取时、分

### datetime

&emsp;&emsp;type="datetime"的input输入类型用于选取时、日、月、年(UTC时间)

### datetime-local

&emsp;&emsp;type="datetime-local"的input输入类型用于选取时、日、月、年(本地时间)

&emsp;&emsp;注意：IE和firefox这6种日期类型都不支持，chrome不支持datetime类型

【默认样式】

<div>
<pre>chrome/safari
    border: 2px inset;
    padding-left: 1px;</pre>
</div>
<div>
<pre>&lt;input type="date"&gt;&lt;br&gt;&lt;br&gt;
&lt;input type="month"&gt;&lt;br&gt;&lt;br&gt;
&lt;input type="week"&gt;&lt;br&gt;&lt;br&gt;
&lt;input type="time"&gt;&lt;br&gt;&lt;br&gt;
&lt;input type="datetime"&gt;&lt;br&gt;&lt;br&gt;
&lt;input type="datetime-local"&gt;</pre>
</div>

<iframe style="width: 100%; height: 270px;" src="https://demo.xiaohuochai.site/html/type/t13.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;要预设控件的日期和时间，可以用字符串设置value属性

【value属性格式】

<div>
<pre>date                　　 YYYY-MM-DD
time                 　　hh:mm:ss.s
datetime            　　 YYYY-MM-DDThh:mm:ss:sZ
datetime-local           YYYY-MM-DDThh:mm:ss:s
month            　　　　 YYYY-MM
week                　　 YYYY-Wnn</pre>
</div>
<div>
<pre>YYYY=年
MM=月
DD=日
hh=小时
mm=分钟
ss=秒
s=0.1秒
T=日期与时间之间的分隔符
Z=Zulu时间的时区
Wnn=W周数，从1月的第一周开始是1，直到52</pre>
</div>

&emsp;&emsp;该类型的value属性格式还可以用在min和max的属性里，用来创建时间跨度；step可以用来设置移动的刻度

&emsp;&emsp;注意：chrome不支持该类型的step设置

<div>
<pre>&lt;input type="week" value="2015-W36" step="2" min="2015-W25" max="2015-W40"&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/type/t14.html" frameborder="0" width="320" height="240"></iframe>

