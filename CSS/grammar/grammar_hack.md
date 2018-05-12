# CSS Hack

&emsp;&emsp;CSS Hack是实现浏览器样式兼容的兜底办法，能不用就尽量不要使用。但是，针对一些浏览器的bug，比如老版本IE的bug，有时使用CSS Hack是不得已而为之的做法。本文将详细介绍CSS Hack。CSS Hack主要分为属性标记法和选择器前缀法两种

&nbsp;

### 属性标记法

【IE6-】

&emsp;&emsp;对于IE6-浏览器主要使用下划线_和中划线-这两种字符

<div>
<pre>_color:blue;
-color:blue;</pre>
</div>

【IE7-】

&emsp;&emsp;对于IE7-浏览器可以使用非常多的字符，包括`~!@#$%^&amp;*()=+{[]:&lt;&gt;,.?/

&emsp;&emsp;但是，比较常用的是加号+和星号*

<div>
<pre>+color:blue;
*color:blue;</pre>
</div>

【IE10-】

&emsp;&emsp;使用后缀\9可以识别出IE10-浏览器

<div>
<pre>color:blue\9;</pre>
</div>

【IE8+】

&emsp;&emsp;使用后缀\0可以识别出IE8+浏览器　

<div>
<pre>color:blue\0;</pre>
</div>

【IE9、IE10】

&emsp;&emsp;使用后缀\9\0可以识别出IE9、10浏览器

<div>
<pre>color:blue\9\0;</pre>
</div>

&nbsp;

### 选择器前缀法

【IE6-】

&emsp;&emsp;在选择器前面添加* html，可以识别IE6-浏览器

&emsp;&emsp;注意：*和html之间有无空格都可以生效

<div>
<pre>*html div{color:}</pre>
</div>

【IE7】

&emsp;&emsp;在选择器前面添加*+html，可以识别IE7浏览器

&emsp;&emsp;注意：*、+、html之间有无空格都可以生效

<div>
<pre>*+html div{color:}</pre>
</div>

【IE8】

&emsp;&emsp;在选择器外层使用@media \0，可以识别IE8浏览器

&emsp;&emsp;注意：@media和\0之间必须有空格

<div>
<pre>@media \0{
    div{color:}
}</pre>
</div>

【IE9+及其他非IE浏览器】

&emsp;&emsp;在选择器前面添加:root，可以识别IE9+及其他非IE浏览器

<div>
<pre>:root div{color:}</pre>
</div>
