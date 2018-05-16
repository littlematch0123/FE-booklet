# 深入理解ajax系列第七篇——传递JSON

&emsp;&emsp;虽然ajax全称是asynchronous javascript and XML。但目前使用ajax技术时，传递[JSON](http://www.cnblogs.com/xiaohuochai/p/5887754.html)已经成为事实上的标准。因为相较于XML而言，JSON简单且方便。本文将上一篇中的实例进行改写，以JSON的方式来进行数据传递

&nbsp;

### 前端页面

<div>
<pre>&lt;!-- 前端页面 --&gt;
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;title&gt;Document&lt;/title&gt;
&lt;style&gt;
body{font-size: 20px;margin: 0;line-height: 1.5;}
select,button,input{font-size: 20px;line-height: 1.5;}
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
                var data = JSON.parse(xhr.responseText);
                if(data.success){
                    document.getElementById('searchResult').innerHTML = data.msg;
                }else{
                    document.getElementById('searchResult').innerHTML = '出现错误：' +data.msg;
                }
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
                var data = JSON.parse(xhr.responseText);
                if(data.success){
                  document.getElementById('createResult').innerHTML = data.msg;  
              }else{
                  document.getElementById('createResult').innerHTML = '出现错误：'+data.msg;
              }
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

&nbsp;

### 后端页面

<div>
<pre>&lt;?php 
//用于过滤不安全的字符
function test_input($data) {
   $data = trim($data);
   $data = stripslashes($data);
   $data = htmlspecialchars($data);
   return $data;
}
//设置页面内容的html编码格式是utf-8
header("Content-Type:application/json;charset=utf-8");
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
        echo '{"success":false,"msg":"参数错误"}';
        return;
    }
    global $staff;
    $number = test_input($_GET['number']);
    $result = '{"success":false,"msg":"没有找到员工"}';
    //遍历$staff多维数组，查找key值为number的员工是否存在。如果存在，则修改返回结果
    foreach($staff as $value){
        if($value['number'] == $number){
            $result = '{"success":true,"msg":"找到员工：员工编号为' .$value["number"] .'，员工姓名为' .$value["name"] .'，员工性别为' .$value["sex"] .'，员工职位为' .$value["job"] .'"}';
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
        echo '{"success":false,"msg":"参数错误，员工信息填写不全"}';
        return;
    }
    echo '{"success":true,"msg":"员工' .test_input($_POST['name']) .'信息保存成功!"}';
}
?&gt;</pre>
</div>

&nbsp;

### 实例演示

<iframe src="https://www.xiaohuochai.site/test/passJson/p1.html" frameborder="0" width="500" height="550"></iframe>

