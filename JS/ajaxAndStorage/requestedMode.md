# 深入理解ajax系列第二篇——请求方式

&emsp;&emsp;在[上一篇](http://www.cnblogs.com/xiaohuochai/p/6036475.html)中，概要地介绍了XHR对象的使用。本文将详细介绍使用XHR对象发送请求的两种方式&mdash;&mdash;GET和POST。下面将以实例的形式来详细说明

&nbsp;

### GET

&emsp;&emsp;GET是最常见的请求类型，最常用于向服务器查询某些信息，它适用于当URL完全指定请求资源，当请求对服务器没有任何副作用以及当服务器的响应是可缓存的情况下

【数据发送】

&emsp;&emsp;使用GET方式发送请求时，数据被追加到open()方法中URL的末尾

&emsp;&emsp;数据以问号开始，名和值之间用等号链接，名值对之间用和号(&amp;)分隔。使用GET方式发送的数据常常被称为查询字符串

<div>
<pre>xhr.open("get","example.php?name1=value1&amp;name2=value2",true)</pre>
</div>

【编码】

&emsp;&emsp;由于URL无法识别特殊字符，所以如果数据中包含特殊字符(如中文)，则需要使用encodeURIComponent()进行编码

&emsp;&emsp;注意：encodeURIComponent()只是6种编解码方法的一种，关于它们的详细信息[移步至此](http://www.cnblogs.com/xiaohuochai/p/6144157.html#anchor4)

<div>
<pre>var url = 'test.php' +'?name='  + encodeURIComponent("小火柴");
xhr.open('get',url,true);</pre>
</div>

&emsp;&emsp;上面的URL被编码为

<div>
<pre>test.php?name=%E5%B0%8F%E7%81%AB%E6%9F%B4</pre>
</div>

【编码函数】

&emsp;&emsp;下面这个函数可以辅助向现有URL的末尾添加查询字符串参数

<div>
<pre>function addURLParam(url,name,value){
    url += (url.indexOf("?") == -1 ? "?" : "&amp;");
    url +=encodeURIComponent(name) + "=" + encodeURIComponent(value);
    return url;
}</pre>
</div>

&emsp;&emsp;这个addURLParam()函数接受三个参数：要添加参数的URL、参数的名称和参数的值。这个函数首先检查URL是否包含问号(以确定是否已经有参数存在)。如果没有，就添加一个问号；否则，就添加一个和号。然后，将参数名称和值进行编码，再添加到URL的末尾。最后返回添加参数之后的URL

<div>
<pre>var url = 'test.php';
url = addURLParam(url,'name','aaa');
url = addURLParam(url,'data','bbb');

xhr.open('get',url,true);</pre>
</div>

【缓存】

&emsp;&emsp;在GET请求中，为了避免缓存的影响，可以向URL添加一个随机数或时间戳

<div>
<pre>xhr.open('get',url+'&amp;'+Number(new Date()),true);
xhr.open('get',url+'&amp;'+Math.random(),true);</pre>
</div>

【封装函数】

&emsp;&emsp;下面把使用get方式发送ajax请求的操作封装为get()函数

<div>
<pre>function get(url,data,callback){
    //创建xhr对象
    var xhr;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    //异步接受响应
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                //实际操作
                callback &amp;&amp; callback(xhr.responseText);
            }
        }
    }
    for(var key in data){
        url += (url.indexOf("?") == -1 ? "?" : "&amp;");
        //编码特殊字符
        url += encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
    }
    //增加随机数，防止缓存    
    xhr.open('get',url+'&amp;'+Number(new Date()),true);
    //发送请求
    xhr.send();
}</pre>
</div>
<div>
<pre>//前端
&lt;script&gt;
get('form.php',{
    a:1,
    b:2,
    c:3
},function(data){
    //'a:1;b:2;c:3;'
    console.log(data);
})</pre>
</div>
<div>
<pre>//后端
&lt;?php
foreach($_GET as $key =&gt; $value){
    if(!empty($value)){
        echo $key. ":" .$value .";";        
    }
}
?&gt;    </pre>
</div>

&nbsp;

### POST

&emsp;&emsp;使用频率仅次于GET的是POST请求，通常用于服务器发送应该被保存的数据。"POST"方法常用于HTML表单。它在请求主体中包含额外数据且这些数据常存储到服务器上的数据库中。相同URL的重复POST请求从服务器得到的响应可能不同，同时不应该缓存使用这个方法的请求

&emsp;&emsp;POST请求应该把数据作为请求的主体提交，而GET请求传统上不是这样。POST请求的主体可以包含非常多的数据，而且格式不限。在open()方法第一个参数的位置传入"post"，就可以初始化一个POST请求

<div>
<pre>xhr.open("post","example.php",true);</pre>
</div>

【设置请求头】

&emsp;&emsp;发送POST请求的第二步就是向send()方法中传入某些数据。由于XHR最初的设计主要是为了处理XML，因此可以在此传入XML DOM文档，传入的文档经序列化之后将作为请求主体被提交到服务器。当然，也可以在此传入任何想发送到服务器的字符串

&emsp;&emsp;默认情况下，服务器对POST请求和提交Web表单的请求并不会一视同仁。因此，服务器端必须有程序来读取发送过来的原始数据，并从中解析出有用的部分。不过，可以使用XHR来模仿表单提交：首先将Content-Type头部信息设置为application/x-www-form-urlencoded，也就是表单提交时的内容类型

<div>
<pre>xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");</pre>
</div>

&emsp;&emsp;如果不设置Content-Type，发送给服务器的数据就不会出现在$_POSR超级全局变量中。这时要访问同样的数据，须借助$HTTP_RAW_POST_DATA

&emsp;&emsp;如果对相同的头调用多次setReQuestHeader()，新值不会取代之前指定的值。相反，HTTP请求将包含这个头的多个副本或这个头将指定多个值

【发送主体】

&emsp;&emsp;接下来要以适当的格式创建一个字符串，并使用send()方法发送

&emsp;&emsp;POST数据的格式与查询字符串格式相同，名和值之间用等号链接，名值对之间用和号(&amp;)分隔，如下所示

<div>
<pre>xhr.send('name="abc"&amp;num=123');</pre>
</div>

【编码和缓存】

&emsp;&emsp;由于使用POST方式传递数据时，需要设置请求头"content-type"，这一步骤已经能够自动对特殊字符(如中文)进行编码，所以就不再需要使用encodeURIComponent()方法了

&emsp;&emsp;POST请求主要用于数据提交，相同URL的重复POST请求从服务器得到的响应可能不同，所以不应该缓存使用POST方法的请求

【性能】

&emsp;&emsp;GET对所发送信息的数量有限制，一般在2000个字符。与GET请求相比，POST请求消耗的资源会更多一些。从性能角度来看，以发送相同的数据计，GET请求的速度最多可POST请求的两倍

【封装函数】

&emsp;&emsp;下面把使用post方式发送ajax请求的操作封装为post()函数

<div>
<pre>function post(url,data,callback){
    //创建xhr对象
    var xhr;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    //异步接受响应
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                //实际操作
                callback &amp;&amp; callback(xhr.responseText);
            }
        }
    }
    var strData = '';
    for(var key in data){
        strData += '&amp;' + key + "=" + data[key];
    }
    strData = strData.substring(1); 
    xhr.open('post',url,true);
    //设置请求头
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    //发送请求
    xhr.send(strData);    
}</pre>
</div>
<div>
<pre>//前端
&lt;script&gt;
post('form.php',{
    a:1,
    b:2,
    c:3
},function(data){
    //'a:1;b:2;c:3;'
    console.log(data);
})
&lt;/script&gt;    </pre>
</div>
<div>
<pre>//后端
&lt;?php
foreach($_POST as $key =&gt; $value){
    if(!empty($value)){
        echo $key. ":" .$value .";";        
    }
}
?&gt;</pre>
</div>

&nbsp;

### 函数封装

&emsp;&emsp;在get和post这两个段落中，分别对get和post这两种方式进行了函数封装。下面对它们进行整合，封装为一个可选择请求方式的ajax()函数，并储存为[ajax.js](http://files.cnblogs.com/files/xiaohuochai/ajax.js)文件

<div>
<pre>function ajax(obj){
    //method为ajax提交的方式，默认为'get'方法
    obj.method = obj.method || 'get';
    //创建xhr对象
    var xhr;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    //异步接受响应
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                //callback为回调函数，如果不设置则无回调
                obj.callback &amp;&amp; obj.callback(xhr.responseText);
            }
        }
    }
    //创建数据字符串，用来保存要提交的数据
    var strData = '';
    if(obj.method == 'post'){
        for(var key in obj.data){
            strData += '&amp;' + key + "=" + obj.data[key];
        }    
        //去掉多余的'&amp;'
        strData = strData.substring(1); 
        xhr.open('post',obj.url,true);
        //设置请求头
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        //发送请求
        xhr.send(strData);    
    }else{
        //如果是get方式，则对字符进行编成
        for(var key in obj.data){
            strData += '&amp;' + encodeURIComponent(key) + "=" + encodeURIComponent(obj.data[key]);
        }    
        //去掉多余的'&amp;'，并增加随机数，防止缓存
        strData = strData.substring(1) + '&amp;'+Number(new Date());   
        xhr.open('get',obj.url+'?'+strData,true);
        //发送请求
        xhr.send();    
    }
}</pre>
</div>
<div>
<pre>&lt;select name="year" id="year"&gt;
    &lt;option value="2016"&gt;2016&lt;/option&gt;
    &lt;option value="2017"&gt;2017&lt;/option&gt;
    &lt;option value="2018"&gt;2018&lt;/option&gt;
&lt;/select&gt;
&lt;select name="month" id="month"&gt;
    &lt;option value="1"&gt;1&lt;/option&gt;
    &lt;option value="2"&gt;2&lt;/option&gt;
    &lt;option value="3"&gt;3&lt;/option&gt;
&lt;/select&gt;
&lt;select name="day" id="day"&gt;
    &lt;option value="1"&gt;1&lt;/option&gt;
    &lt;option value="2"&gt;2&lt;/option&gt;
    &lt;option value="3"&gt;3&lt;/option&gt;
&lt;/select&gt;
&lt;button id="btn"&gt;发送&lt;/button&gt;
&lt;span id="result"&gt;&lt;/span&gt;
&lt;script&gt;
btn.onclick = function(){
    ajax({
        url:'form.php',
        data:{year:year.value,month:month.value,day:day.value},
        callback:function(data){
            result.innerHTML = data;
        }
    })    
}
&lt;/script&gt;    </pre>
</div>
<div>
<pre>&lt;?php
echo '你选择的日期是' .$_GET['year'] .'年' .$_GET['month'] .'月'.$_GET['day'] .'日';
?&gt;    </pre>
</div>

<iframe src="https://xiaohuochai.site/test/requestedMode/r1.html" frameborder="0" width="320" height="80"></iframe>

### 实例

&emsp;&emsp;下面以一个实例来说明GET和POST两种请求方式的应用

<div>
<pre>&lt;!-- 前端页面 --&gt;
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;title&gt;Document&lt;/title&gt;
&lt;style&gt;
body{font-size: 30px;margin: 0;line-height: 1.5;}
select,button,input{font-size: 30px;line-height: 1.5;}
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;h2&gt;员工查询&lt;/h2&gt;    
&lt;label&gt;请输入员工编号:&lt;/label&gt;
&lt;input type="text" id="keyword"&gt;
&lt;button id="search"&gt;查询&lt;/button&gt;
&lt;p id="searchResult"&gt;&lt;/p&gt;
&lt;h2&gt;员工创建&lt;/h2&gt;
&lt;form id="postForm"&gt;
    &lt;label&gt;请输入员工姓名：&lt;/label&gt;
    &lt;input type="text" name="name"&gt;&lt;br&gt;
    &lt;label&gt;请输入员工编号：&lt;/label&gt;
    &lt;input type="text" name="number"&gt;&lt;br&gt;
    &lt;label&gt;请输入员工性别：&lt;/label&gt;
    &lt;select name="sex"&gt;
    &lt;option value="男"&gt;男&lt;/option&gt;
    &lt;option value="女"&gt;女&lt;/option&gt;
    &lt;/select&gt;&lt;br&gt;
    &lt;label&gt;请输入员工职位：&lt;/label&gt;
    &lt;input type="text" name="job"&gt;&lt;br&gt;
    &lt;button id="save" type="button"&gt;保存&lt;/button&gt;    
&lt;/form&gt;
&lt;p id="createResult"&gt;&lt;/p&gt;
&lt;script&gt;
/*get*/
//查询
var oSearch = document.getElementById('search');
//get方式添加数据
function addURLParam(url,name,value){
    url += (url.indexOf("?") == -1 ? "?" : "&amp;");
    url +=encodeURIComponent(name) + "=" + encodeURIComponent(value);
    return url;
}
oSearch.onclick = function(){
    //创建xhr对象
    var xhr;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    //异步接受响应
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                //实际操作
                document.getElementById('searchResult').innerHTML = xhr.responseText;
            }else{
                alert('发生错误：' + xhr.status);
            }
        }
    }
    //发送请求
    var url = 'service.php';
    url = addURLParam(url,'number',document.getElementById('keyword').value);
    xhr.open('get',url,true);
    xhr.send();
}
/*post*/
//创建
var oSave = document.getElementById('save');
//post方式添加数据
function serialize(form){        
    var parts = [],field = null,i,len,j,optLen,option,optValue;
    for (i=0, len=form.elements.length; i &lt; len; i++){
        field = form.elements[i];
        switch(field.type){
            case "select-one":
            case "select-multiple":
                if (field.name.length){
                    for (j=0, optLen = field.options.length; j &lt; optLen; j++){
                        option = field.options[j];
                        if (option.selected){
                            optValue = "";
                            if (option.hasAttribute){
                                optValue = (option.hasAttribute("value") ? option.value : option.text);
                            } else {
                                optValue = (option.attributes["value"].specified ? option.value : option.text);
                            }
                            parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(optValue));
                        }
                    }
                }
                break;              
            case undefined:     //fieldset
            case "file":        //file input
            case "submit":      //submit button
            case "reset":       //reset button
            case "button":      //custom button
                break;                
            case "radio":       //radio button
            case "checkbox":    //checkbox
                if (!field.checked){
                    break;
                }
                /* falls through */
            default:
                //don't include form fields without names
                if (field.name.length){
                    parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
                }
        }
    }        
    return parts.join("&amp;");
}
oSave.onclick = function(){
    //创建xhr对象
    var xhr;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    //异步接受响应
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                //实际操作
                document.getElementById('createResult').innerHTML = xhr.responseText;
            }else{
                alert('发生错误：' + xhr.status);
            }
        }
    }
    //发送请求
    xhr.open('post','service.php',true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    xhr.send(serialize(document.getElementById('postForm')));
}
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>
<div>
<pre>&lt;!-- 后端页面 --&gt;
&lt;?php 
//用于过滤不安全的字符
function test_input($data) {
   $data = trim($data);
   $data = stripslashes($data);
   $data = htmlspecialchars($data);
   return $data;
}
//设置页面内容的html编码格式是utf-8，内容是纯文本
header("Content-Type:text/plain;charset=utf-8");
//header("Content-Type:application/json;charset=utf-8");
//header("Content-Type:text/xml;charset=utf-8");
//header("Content-Type:text/html;charset=utf-8");
//header("Content-Type:application/javascript;charset=utf-8");
//定义一个多维数组，包含员工的信息，每条员工信息为一个数组
$staff = array(
    array("name"=&gt;"洪七","number"=&gt;"101","sex"=&gt;"男","job"=&gt;'总经理'),
    array("name"=&gt;"郭靖","number"=&gt;"102","sex"=&gt;"男","job"=&gt;'开发工程师'),
    array("name"=&gt;"黄蓉","number"=&gt;"103","sex"=&gt;"女","job"=&gt;'产品经理')
    );
//判断如果是get请求，则进行搜索；如果是POST请求，则进行新建
//$_SERVER["REQUEST_METHOD"]返回访问页面使用的请求方法
if($_SERVER["REQUEST_METHOD"] == "GET"){
    search();
}else if($_SERVER["REQUEST_METHOD"] == "POST"){
    create();
}
//通过员工编号搜索员工
function search(){
    //检查是否有员工编号的参数
    //isset检测变量是否设置；empty判断值是否为空
    if(!isset($_GET['number']) || empty($_GET['number'])){
        echo '参数错误';
        return;
    }
    global $staff;
    $number = test_input($_GET['number']);
    $result = '没有找到员工';
    //遍历$staff多维数组，查找key值为number的员工是否存在。如果存在，则修改返回结果
    foreach($staff as $value){
        if($value['number'] == $number){
            $result = "找到员工：员工编号为" .$value['number'] ."，员工姓名为" .$value['name'] ."，员工性别为" .$value['sex'] ."，员工职位为" .$value['job'];
            break;
        }
    }
    echo $result;
}
//创建员工
function create(){
    //判断信息是否填写完全
    if(!isset($_POST['name']) || empty($_POST['name']) || 
       !isset($_POST['number']) || empty($_POST['number']) ||
       !isset($_POST['sex']) || empty($_POST['sex']) ||
       !isset($_POST['job']) || empty($_POST['job']) 
        ){
        echo "参数错误，员工信息填写不全";
        return;
    }
    echo "员工" .test_input($_POST['name']) ."信息保存成功!";
}
?&gt;</pre>
</div>

<iframe src="https://xiaohuochai.site/test/requestedMode/r2.html" frameborder="0" width="500" height="550"></iframe>

