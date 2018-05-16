# 深入理解ajax系列第九篇——jQuery中的ajax

&emsp;&emsp;jQuery提供了一些日常开发中需要的快捷操作，例如load、ajax、get和post等，使用jQuery开发ajax将变得极其简单。这样开发人员就可以将程序开发集中在业务和用户体验上，而不需要理会那么繁琐的XMLHTTPRequest对象。jQuery对ajax操作进行了封装，在jQuery中$.ajax()属性最底层的方法，第2层是load()、$.get()和$.post()方法，第3层是$.getScript()和$.getJSON()方法。下面将详细介绍jQuery中的ajax

&nbsp;

### load()

&emsp;&emsp;load()方法是jQuery中最简单和常用的ajax方法，使用load()方法通过ajax请求加载服务器中的数据，并把返回的数据放置到指定的元素中

【调用格式】

&emsp;&emsp;load()方法的调用格式为如下所示，参数url为加载服务器地址，可选项data参数为请求时发送的数据，callback参数为数据请求成功后，执行的回调函数

<div>
<pre>load(url,[data],[callback])</pre>
</div>

【载入HTML文档】

<div>
<pre>$('#result').load('ajax/test.html');</pre>
</div>

&emsp;&emsp;注意：如果选择器没有匹配的元素，如document不包含id="result"的元素，这个Ajax请求将不会被发送出去

<div>
<pre>&lt;!-- 当前页面--&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.11.2/jquery.min.js"&gt;&lt;/script&gt;
&lt;style&gt;
h6{margin:4px;}
p{margin: 0;}
&lt;/style&gt;
&lt;body&gt;
&lt;input type="button" id="send" value="ajax获取"&gt;   
&lt;div class="comment"&gt;已有评论:&lt;/div&gt;
&lt;div id="resText"&gt;&lt;/div&gt;
&lt;script&gt;
$(function(){
    $('#send').click(function(){
        $('#resText').load('ajaxjQueryLoad.html')
    })
})
&lt;/script&gt;
&lt;!-- 要载入的页面 --&gt;
&lt;div class="comment"&gt;
    &lt;h6&gt;张三：&lt;/h6&gt;
    &lt;p class="para"&gt;沙发.&lt;/p&gt;
&lt;/div&gt;
&lt;div class="comment"&gt;
    &lt;h6&gt;李四：&lt;/h6&gt;
    &lt;p class="para"&gt;板凳.&lt;/p&gt;
&lt;/div&gt;
&lt;div class="comment"&gt;
    &lt;h6&gt;王五：&lt;/h6&gt;
    &lt;p class="para"&gt;地板.&lt;/p&gt;
&lt;/div&gt;</pre>
</div>

<iframe src="https://xiaohuochai.site/test/ajaxJq/a1.html" frameborder="0" width="320" height="200"></iframe>

【部分载入】

&emsp;&emsp;如果url参数的字符串中包含一个或多个空格，那么第一个空格后面的内容，会被当成是jQuery的选择器，从而决定应该加载返回结果中的哪部分内容

<div>
<pre>$('#result').load('ajax/test.html #container');</pre>
</div>

&emsp;&emsp;当这种方法执行, 它将检索ajax/test.html返回的页面内容，jQuery会获取ID为container元素的内容，并且插入到ID为result元素，而其他未被检索到的元素将被废弃

<div>
<pre>$(function(){
    $('#send').click(function(){
        $('#resText').load('ajaxjQueryLoad.html .para')
    })
})</pre>
</div>

<iframe src="https://xiaohuochai.site/test/ajaxJq/a2.html" frameborder="0" width="320" height="150"></iframe>

【传递方式】

&emsp;&emsp;load()方法默认使用GET方式，如果data参数提供一个对象，那么使用POST方式

<div>
<pre>//无参数传递，则是GET方式
$('#resText').load('tset.php')

//有参数传递，则是POST方式
 $('#resText').load('tset.php',{name:'rain',age:'22'})</pre>
</div>

【回调函数】

&emsp;&emsp;如果提供了"complete"回调函数，它将在函数处理完之后，并且HTML已经被插入完时被调用。回调函数会在每个匹配的元素上被调用一次，并且this始终指向当前正在处理的DOM元素

&emsp;&emsp;回调函数有3个参数，分别代表请求返回的内容、请求状态和XMLHTTPRequest对象

<div>
<pre>$('#result').load('ajax/test.html',function(responseText,textStatus,XMLHTTPRequest) {
  //responseText :请求返回的内容
  //testStatus: success、error、notmodified、timeout四种
  //XMLHTTPRequest: XMLHTTPRequest对象
});</pre>
</div>
<div>
<pre>&lt;style&gt;
h6{margin:4px;}
p{margin: 0;}
#test{border:1px solid black;}
&lt;/style&gt;
&lt;input type="button" id="send" value="ajax获取"&gt;   
&lt;div class="comment"&gt;已有评论:&lt;/div&gt;
&lt;div id="resText"&gt;&lt;/div&gt;
&lt;div id="test"&gt;&lt;/div&gt;
&lt;script&gt;
$(function(){
    $('#send').click(function(){
        $('#resText').load('ajaxjQueryLoad.html .para',function(a,b,c){
            $('#test').html('responseText:' + a + '&lt;br&gt;textStatus:' + b + '&lt;br&gt;XMLHTTPRequest:' + c);
        })
    })
})
&lt;/script&gt;</pre>
</div>
<iframe src="https://xiaohuochai.site/test/ajaxJq/a3.html" frameborder="0" width="320" height="300"></iframe>

&nbsp;

### getJSON()

&emsp;&emsp;getJSON()方法使用一个HTTP GET请求从服务器加载JSON编码的数据

【调用格式】

&emsp;&emsp;getJSON()方法的调用格式如下。其中，url参数为请求加载json格式文件的服务器地址，可选项data参数为请求时发送的数据，callback参数为数据请求成功后，执行的回调函数

<div>
<pre>$.getJSON(url,[data],[callback])</pre>
</div>

&emsp;&emsp;getJSON()方法相当于以下ajax()方法的缩写

<div>
<pre>$.ajax({
  dataType: "json",
  url: url,
  data: data,
  success: success
});</pre>
</div>

【回调函数】

&emsp;&emsp;回调函数中的第一个参数表示返回的数据

<div>
<pre>$.getJSON('test.json',function(data){
    //data :返回的数据
})</pre>
</div>

&emsp;&emsp;一般地，使用each()方法，来构建DOM结构

<div>
<pre>&lt;input id="btnShow" type="button" value="加载" /&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
$('#btnShow').click(function(){
    var $this = $(this);
    var $html = '';
    $.getJSON('sport.json',function(data){
        $this.attr('disabled','true');
        $.each(data,function(index,sport){
            $html += '&lt;div&gt;' + sport["name"] + '&lt;/div&gt;';
        });
        $('#result').html($html);
    })
})
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;json文件如下

<div>
<pre>[{ 
  "name": "足球"
},{ 
  "name": "散步"
},{ 
  "name": "篮球"
},{ 
  "name": "乒乓球"
},{ 
  "name": "骑自行车"
}]</pre>
</div>

<iframe src="https://xiaohuochai.site/test/ajaxJq/a4.html" frameborder="0" width="320" height="150"></iframe>

&nbsp;

### getScript()

&emsp;&emsp;getScript()方法使用一个HTTP GET请求从服务器加载并执行一个javascript文件

&emsp;&emsp;getScript()方法调用格式如下，参数url为服务器请求地址，可选项callback参数为请求成功后执行的回调函数

<div>
<pre>$.getScript(url,[callback])</pre>
</div>

&emsp;&emsp;相当于一个Ajax函数的缩写

<div>
<pre>$.ajax({
  url: url,
  dataType: "script",
  success: success
});</pre>
</div>
<div>
<pre>&lt;input id="btnShow" type="button" value="加载" /&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
$('#btnShow').click(function(){
    var $this = $(this);
    $.getScript('sport.js',function(){
        $this.attr('disabled','true');
        $('#result').html($html);
    })
})
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;js文件如下

<div>
<pre>var data = [{
    "name": "足球"
}, {
    "name": "散步"
}, {
    "name": "篮球"
}, {
    "name": "乒乓球"
}, {
    "name": "骑自行车"
}];
var $html = '';
$.each(data, function (index, sport) {
     $html += "&lt;div&gt;" + sport["name"] + "&lt;/div&gt;";
});</pre>
</div>

<iframe src="https://xiaohuochai.site/test/ajaxJq/a5.html" frameborder="0" width="320" height="150"></iframe>

&nbsp;

### get()

&emsp;&emsp;get()方法使用一个HTTP GET请求从服务器加载数据

【调用格式】

&emsp;&emsp;get()方法的调用格式如下所示，url表示一个包含发送请求的URL字符串；data表示发送给服务器的字符串或Key/value键值对；success(data, textStatus, jqXHR)表示当请求成功后执行的回调函数；dataType表示从服务器返回的预期的数据类型。默认：智能猜测(xml, json, script, 或 html)

<div>
<pre>jQuery.get( url [, data ] [, success(data, textStatus, jqXHR) ] [, dataType ] )</pre>
</div>

&emsp;&emsp;相当于一个ajax功能的缩写

<div>
<pre>$.ajax({
  url: url,
  data: data,
  success: success,
  dataType: dataType
});</pre>
</div>

【使用参数】

&emsp;&emsp;通过get()方法发送给服务器的key/value数据会作为查询字符串最终附加到URL中

<div>
<pre>&lt;form action="#" id="form1"&gt;
    &lt;p&gt;评论:&lt;/p&gt;
    &lt;p&gt;姓名：&lt;input type="text" name="username" id="username"&gt;&lt;/p&gt;
    &lt;p&gt;内容：&lt;textarea  name="content" id="content" rows="2" cols="20"&gt;&lt;/textarea&gt;&lt;/p&gt;
    &lt;p&gt;&lt;input type="button" id="send" value="提交"&gt;&lt;/p&gt;
&lt;/form&gt;
&lt;div class="comment"&gt;已有评论：
    &lt;div id="resText"&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;script&gt;
$('#send').click(function(){
    $.get('jqGet.php',{
        username:$('#username').val(),
        content:$('#content').val()
    },function(data){
        //
    })
})
&lt;/script&gt;</pre>
</div>

【回调函数】

<div>
<pre>function(data,textStatus){
    //data: 返回的内容，可能是XML、JSON、HTML、JS
    //textStatus: success、error、notmodified、timeout四种
}</pre>
</div>

【数据格式】

&emsp;&emsp;1、HTML片段

<div>
<pre>function(data,textStatus){
    $('#resText').html(data);
}</pre>
</div>

&emsp;&emsp;2、XML文档

<div>
<pre>function(data,textStatus){
    var username = $(data).find('comment').attr('username');
    var content = $(data).find('comment content').text();
    var txtHtml = "&lt;div class='comment'&gt;&lt;h6&gt;" + username + ":&lt;/h6&gt;&lt;p class='para'&gt;" + content + "&lt;/p&gt;&lt;/div&gt;";
    $('#resText').html(txtHtml);
}</pre>
</div>

&emsp;&emsp;3、JSON&nbsp;

<div>
<pre>function(data,textStatus){
    var username = data.username;
    var content =  data.content;
    var txtHtml = "&lt;div class='comment'&gt;&lt;h6&gt;" + username + ":&lt;/h6&gt;&lt;p class='para'&gt;" + content + "&lt;/p&gt;&lt;/div&gt;";
    $('#resText').html(txtHtml);
}</pre>
</div>
<div>
<pre>&lt;!-- 前端页面 --&gt;
&lt;select id="num"&gt;
    &lt;option value="1"&gt;1&lt;/option&gt;
    &lt;option value="2"&gt;2&lt;/option&gt;
    &lt;option value="3"&gt;3&lt;/option&gt;
    &lt;option value="4"&gt;4&lt;/option&gt;
&lt;/select&gt;
&lt;button id="send"&gt;测试&lt;/button&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
$('#send').click(function(){
    $.get('jqRequest.php',{
        num: $('#num').val()
    },function(data){
        $('#result').html('您选择的数字' + $('#num').val() + '是' + data)
    })
})
&lt;/script&gt;
&lt;!-- 后端页面 --&gt;
&lt;?php 
$num = $_REQUEST['num'];
if($num % 2 == 0){
    echo '偶数';
}else{
    echo '奇数';
}
?&gt;</pre>
</div>

<iframe src="https://xiaohuochai.site/test/ajaxJq/a7.html" frameborder="0" width="320" height="100"></iframe>

![ajaxJq1](https://pic.xiaohuochai.site/blog/js_ajax_jq1.png)

&nbsp;

### post()

&emsp;&emsp;post()方法使用一个HTTP POST 请求从服务器加载数据

<div>
<pre>jQuery.post( url [, data ] [, success(data, textStatus, jqXHR) ] [, dataType ] )</pre>
</div>

&emsp;&emsp;相当于一个 Ajax 函数的简写形式

<div>
<pre>$.ajax({
  type: "POST",
  url: url,
  data: data,
  success: success,
  dataType: dataType
});</pre>
</div>
<div>
<pre>&lt;!-- 前端页面 --&gt;
&lt;select id="num"&gt;
    &lt;option value="1"&gt;1&lt;/option&gt;
    &lt;option value="2"&gt;2&lt;/option&gt;
    &lt;option value="3"&gt;3&lt;/option&gt;
    &lt;option value="4"&gt;4&lt;/option&gt;
&lt;/select&gt;
&lt;button id="send"&gt;测试&lt;/button&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
$('#send').click(function(){
    $.post('jqRequest.php',{
        num: $('#num').val()
    },function(data){
        $('#result').html('您选择的数字' + $('#num').val() + '是' + data)
    })
})
&lt;/script&gt;
&lt;!-- 后端页面 --&gt;
&lt;?php 
$num = $_REQUEST['num'];
if($num % 2 == 0){
    echo '偶数';
}else{
    echo '奇数';
}
?&gt;</pre>
</div>

<iframe src="https://xiaohuochai.site/test/ajaxJq/a8.html" frameborder="0" width="320" height="100"></iframe>

![ajax_jq2](https://pic.xiaohuochai.site/blog/js_ajax_jq2.png)

&emsp;&emsp;post()方法和get()方法的结构和使用方式都相同。但要注意的是，当load()方法带有数据参数传递时，会使用POST方式发送请求

&nbsp;

### 序列化

&emsp;&emsp;当一个表单中字段较多，表单元素较复杂时，就需要一种方法来简化提取表单内部控件的值的操作，这一行为通常叫序列化，jQuery提供了param()、serialize()和serialzeArray()这三个方法

【param()】

&emsp;&emsp;param(obj)方法用来创建一个数组或对象序列化的字符串，适用于一个URL地址查询字符串或Ajax请求

<div>
<pre>console.log($.param({ width:1680, height:1050 }));//'width=1680&amp;height=1050'</pre>
</div>

【serialize()】

&emsp;&emsp;serialize()方法将用作提交的表单元素的值编译成字符串

&emsp;&emsp;注意：serialize()方法的一个额外好处是会自动对键值对儿中的特殊字符进行编码

<div>
<pre>&lt;form&gt;
  &lt;select name="single"&gt;
    &lt;option&gt;Single&lt;/option&gt;
    &lt;option&gt;Single2&lt;/option&gt;
  &lt;/select&gt;
  &lt;br /&gt;
  &lt;select name="multiple" multiple="multiple"&gt;
    &lt;option selected="selected"&gt;Multiple&lt;/option&gt;
    &lt;option&gt;Multiple2&lt;/option&gt;
    &lt;option selected="selected"&gt;Multiple3&lt;/option&gt;
  &lt;/select&gt;
  &lt;br/&gt;
  &lt;input type="checkbox" name="check" value="check1" id="ch1"/&gt;
  &lt;label for="ch1"&gt;check1&lt;/label&gt;
  &lt;input type="checkbox" name="check" value="check2" checked="checked" id="ch2"/&gt;
  &lt;label for="ch2"&gt;check2&lt;/label&gt;
  &lt;br /&gt;
  &lt;input type="radio" name="radio" value="radio1" checked="checked" id="r1"/&gt;
  &lt;label for="r1"&gt;radio1&lt;/label&gt;
  &lt;input type="radio" name="radio" value="radio2" id="r2"/&gt;
  &lt;label for="r2"&gt;radio2&lt;/label&gt;
&lt;/form&gt;
&lt;p&gt;&lt;tt id="results"&gt;&lt;/tt&gt;&lt;/p&gt;
&lt;script&gt;
    function showValues() {
      $("#results").text($("form").serialize());
    }
    $(":checkbox, :radio").click(showValues);
    $("select").change(showValues);
    showValues();
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 200px;" src="https://xiaohuochai.site/test/ajaxJq/a9.html" frameborder="0" width="320" height="240"></iframe>

【serializeArray()】

&emsp;&emsp;serializeArray()方法将用作提交的表单元素的值编译成拥有name和value对象组成的数组，即json格式的数据。例如[ { name: a value: 1 }, { name: b value: 2 },...]

<div>
<pre>&lt;form&gt;
  &lt;div&gt;&lt;input type="text" name="a" value="1" id="a" /&gt;&lt;/div&gt;
  &lt;div&gt;&lt;input type="text" name="b" value="2" id="b" /&gt;&lt;/div&gt;
  &lt;div&gt;&lt;input type="hidden" name="c" value="3" id="c" /&gt;&lt;/div&gt;
  &lt;div&gt;
    &lt;textarea name="d" rows="8" cols="40"&gt;4&lt;/textarea&gt;
  &lt;/div&gt;
  &lt;div&gt;&lt;select name="e"&gt;
    &lt;option value="5" selected="selected"&gt;5&lt;/option&gt;
    &lt;option value="6"&gt;6&lt;/option&gt;
    &lt;option value="7"&gt;7&lt;/option&gt;
  &lt;/select&gt;&lt;/div&gt;
  &lt;div&gt;
    &lt;input type="checkbox" name="f" value="8" id="f" /&gt;
  &lt;/div&gt;
  &lt;div&gt;
    &lt;input type="submit" name="g" value="Submit" id="g" /&gt;
  &lt;/div&gt;
&lt;/form&gt;
&lt;script&gt;
$('form').submit(function() {
  console.log($(this).serializeArray());
  return false;
});
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;结果如下&nbsp;

<div>
<pre>[
  {
    name: "a",
    value: "1"
  },
  {
    name: "b",
    value: "2"
  },
  {
    name: "c",
    value: "3"
  },
  {
    name: "d",
    value: "4"
  },
  {
    name: "e",
    value: "5"
  }
]</pre>
</div>

&emsp;&emsp;该对象可以使用each()函数对数据进行迭代输出

<div>
<pre>$dataArr = $('form').serializeArray();
$html = '';
$.each($dataArr,function(i,data){
    $html += data.name + ':' + data.value + ';';
})
console.log($html);//a:1;b:2;c:3;d:4;e:5;</pre>
</div>

&nbsp;

### ajax()

&emsp;&emsp;前面介绍的load()、get()、post()、getScript()、getJSON()等方法都是基于ajax()方法实现的

&emsp;&emsp;ajax()方法是最底层、功能最强大的请求服务器数据的方法，它不仅可以获取服务器返回的数据，还能向服务器发送请求并传递数值，它的调用格式如下：

<div>
<pre>$.ajax([settings])</pre>
</div>

&emsp;&emsp;其中参数settings为发送ajax请求时的配置对象，在该对象中，url表示服务器请求的路径，data为请求时传递的数据，dataType为服务器返回的数据类型，success为请求成功的执行的回调函数，type为发送数据请求的方式，默认为get

&emsp;&emsp;常用参数如下所示

<div>
<pre>名称                         值/描述
async                       布尔值，表示请求是否异步处理。默认是 true。
beforeSend(xhr)             发送请求前运行的函数。
cache                       布尔值，表示浏览器是否缓存被请求页面。默认是 true。
complete(xhr,status)        请求完成时运行的函数（在请求成功或失败之后均调用，即在success和error函数之后）
contentType                 发送数据时使用的内容类型。默认是"application/x-www-form-urlencoded"
context                     为所有 AJAX 相关的回调函数规定 "this" 值。
data                        规定要发送到服务器的数据。
dataFilter(data,type)       用于处理 XMLHttpRequest 原始响应数据的函数。
dataType                    预期的服务器响应的数据类型。
error(xhr,status,error)     如果请求失败要运行的函数。
global                      布尔值，规定是否为请求触发全局 AJAX 事件处理程序。默认是 true。
ifModified                  布尔值，规定是否仅在最后一次请求以来响应发生改变时才请求成功。默认是 false。
jsonp                       在一个 jsonp 中重写回调函数的字符串。
jsonpCallback               在一个 jsonp 中规定回调函数的名称。
password                    规定在 HTTP 访问认证请求中使用的密码。
processData                 布尔值，规定通过请求发送的数据是否转换为查询字符串。默认是 true。
scriptCharset               规定请求的字符集。
success(result,status,xhr)  当请求成功时运行的函数。
timeout                     设置本地的请求超时时间（以毫秒计）。
traditional                 布尔值，规定是否使用参数序列化的传统样式。
type                        规定请求的类型（GET 或 POST）。
url                         规定发送请求的 URL。默认是当前页面。
username                    规定在 HTTP 访问认证请求中使用的用户名。
xhr                         用于创建 XMLHttpRequest 对象的函数。</pre>
</div>
<div>
<pre>&lt;!-- 前端页面 --&gt;
&lt;select id="num"&gt;
    &lt;option value="1"&gt;1&lt;/option&gt;
    &lt;option value="2"&gt;2&lt;/option&gt;
    &lt;option value="3"&gt;3&lt;/option&gt;
    &lt;option value="4"&gt;4&lt;/option&gt;
&lt;/select&gt;
&lt;button id="send"&gt;测试&lt;/button&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
$('#send').click(function(){
    $.ajax({
      url:'jqRequest.php',
      type:'POST',
      data:{
        num:$('#num').val()
      },
      success:function(data){
        $('#result').html('您选择的数字' + $('#num').val() + '是' + data);
      }
    })
})
&lt;/script&gt; 
&lt;!-- 后端页面 --&gt;
&lt;?php 
$num = $_REQUEST['num'];
if($num % 2 == 0){
    echo '偶数';
}else{
    echo '奇数';
}
?&gt;</pre>
</div>

<iframe src="https://xiaohuochai.site/test/ajaxJq/a10.html" frameborder="0" width="320" height="100"></iframe>

### 全局事件

&emsp;&emsp;jQuery简化ajax操作不仅体现在调用ajax方法和处理响应方面，而且还体现在对调用ajax方法的过程中的HTTP请求的控制。通过jQuery提供的一些自定义全局函数，能够为各种与ajax相关的事件注册回调函数。例如，当ajax请求开始时，会触发ajaxStart()方法的回调函数；当ajax请求结束时，会触发ajaxStop()的回调函数。这些方法都是全局的方法，因此无论创建它们的代码位于何处，只要有ajax请求发生，就会触发它们

【ajaxSetup()】

&emsp;&emsp;ajaxSetup()方法为以后要用到的Ajax请求设置默认的值，设置完成后，后面的Ajax请求将不需要再添加这些选项值，它的调用格式为：

<div>
<pre>$.ajaxSetup([options])</pre>
</div>

&emsp;&emsp;例如，设置 AJAX 请求默认地址为 "/xmlhttp/"，用 POST 代替默认 GET 方法。其后的 AJAX 请求不再设置任何选项参数

<div>
<pre>$.ajaxSetup({
   url: "/xmlhttp/",
   type: "POST"

});
$.ajax({ data: myData });</pre>
</div>

&emsp;&emsp;如果想让某个ajax请求不受ajaxSetup()方法的影响，可以在使用ajax()方法时，将参数中的global设置为false

<div>
<pre>$.ajaxSetup({
   url: "/xmlhttp/",
   type: "POST"
});
$.ajax({
  global:false,
  url:"test",
  type:'GET'
})</pre>
</div>

【ajaxStart()和ajaxStop()】

&emsp;&emsp;ajaxStart()和ajaxStop()方法是绑定Ajax事件。ajaxStart()方法用于在Ajax请求发出前触发函数，ajaxStop()方法用于在Ajax请求完成后触发函数。它们的调用格式为

<div>
<pre>$(selector).ajaxStart(function())
$(selector).ajaxStop(function())</pre>
</div>

&emsp;&emsp;注意：从 jQuery 1.8 开始, ajaxStart()和ajaxStop()方法只能绑定到 document元素

&emsp;&emsp;例如，读取远程网站的图片速度可能会比较慢，如果在加载的过程中，不给用户提供一些提示和反馈信息，很容易让用户误认为按钮单击无用，使用户对网站失去信心。这时，ajaxStart()和ajaxStop()方法就派上用场了

<div>
<pre>&lt;!-- 前端页面 --&gt;
&lt;select id="num"&gt;
    &lt;option value="1"&gt;1&lt;/option&gt;
    &lt;option value="2"&gt;2&lt;/option&gt;
    &lt;option value="3"&gt;3&lt;/option&gt;
    &lt;option value="4"&gt;4&lt;/option&gt;
&lt;/select&gt;
&lt;button id="send"&gt;测试&lt;/button&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
$(document).ajaxStart(function(){
    $('#test').show()
}).ajaxStop(function(){
    $('#test').hide();
});
$('#send').click(function(){
    $.ajax({
      url:'jqRequest.php',
      type:'POST',
      data:{
        num:$('#num').val()
      },
      success:function(data){
        $('#result').html('您选择的数字' + $('#num').val() + '是' + data);
      }
    })
})
&lt;/script&gt; 
&lt;!-- 后端页面 --&gt;
&lt;?php 
$num = $_REQUEST['num'];
if($num % 2 == 0){
    echo '偶数';
}else{
    echo '奇数';
}
?&gt;</pre>
</div>

<iframe src="https://xiaohuochai.site/test/ajaxJq/a111.html" frameborder="0" width="320" height="100"></iframe>