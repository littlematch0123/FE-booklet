# jQuery插件validation

&emsp;&emsp;最常使用javascript的场合就是表单的验证，而jQuery作为一个优秀的javascript库，也提供了一个优秀的表单验证插件&mdash;&mdash;Validation。Validation是历史最悠久的jQuery插件之一，经过了全球范围内不同项目的验证，并得到了许多Web开发者的好评。本文将详细介绍validation插件

&nbsp;

### 概述

&emsp;&emsp;jQuery Validate插件为表单提供了强大的验证功能，让客户端表单验证变得更简单，同时提供了大量的定制选项，满足应用程序各种需求。该插件捆绑了一套有用的验证方法，包括 URL 和电子邮件验证，同时提供了一个用来编写用户自定义方法的 API。所有的捆绑方法默认使用英语作为错误信息，且已翻译成其他 37 种语言

&emsp;&emsp;作为一个标准的验证方法库，Validation拥有以下特点：

&emsp;&emsp;1、内置验证规则：拥有必填、数字、E-Mail、URL和信用卡号等19类内置验证规则

&emsp;&emsp;2、自定义验证规则：可以很方便地自定义验证规则

&emsp;&emsp;3、简单强大的验证信息提示：默认了验证信息提示，并提供自定义覆盖默认提示信息的功能

&emsp;&emsp;4、实时验证：可以通过keyup或blur事件触发验证

&emsp;&emsp;validation作为jQuery的一个插件，使用时需要同jQuery一起引入，注意要先引入jquery

<div>
<pre>&lt;script src="http://files.cnblogs.com/files/xiaohuochai/jquery-1.10.0.js"&gt;&lt;/script&gt;
&lt;script src="http://files.cnblogs.com/files/xiaohuochai/jquery.validate-1.13.1.js"&gt;&lt;/script&gt;</pre>
</div>

&nbsp;

### 快速上手

&emsp;&emsp;validation功能强大且API众多，如果要快速上手，只要掌握常用功能即可

<div>
<pre>&lt;form id="demoForm"&gt;
    &lt;p&gt;
        &lt;label for="username"&gt;用户名：&lt;/label&gt;
        &lt;input type="text" id="username" name="username"/&gt;
    &lt;/p&gt;
    &lt;p&gt;
        &lt;label for="password"&gt;密码：&lt;/label&gt;
        &lt;input type="password" id="password" name="password"/&gt;
    &lt;/p&gt;
    &lt;p&gt;
        &lt;input type="submit" value="登录"/&gt;
    &lt;/p&gt;
&lt;/form&gt; 
&lt;script&gt;
$('#demoForm').validate({
    rules:{
        username:{
            required: true,
            minlength: 2,
            maxlength: 10
        },
        password:{
            required: true,
            minlength: 2,
            maxlength:10
        }
    }
})
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;上述代码主要对name为'username'和'password'这两个input控件进行了校验，这两个控件必须填写内容，且字符长度必须在2-10之间

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/jquery/validate/v1.html" frameborder="0" width="320" height="240"></iframe>

### 校验规则

&emsp;&emsp;在快速上手的例子中，使用了required、minlength和maxlength这三个校验规则。实际上validation的校验规则有17个之多

<div>
<pre>序号           规则                       描述
1             required:true             必须输入的字段
2             remote:"check.php"        使用 ajax 方法调用 check.php 验证输入值
3             email:true                必须输入正确格式的电子邮件
4             url:true                  必须输入正确格式的网址
5             date:true                 必须输入正确格式的日期，内部调用Date.parse()方法进行校验
6             dateISO:true              必须输入正确格式的日期(ISO)，如：2009-06-23，1998/01/22
7             number:true               必须输入合法的数字(负数，小数)
8             digits:true               必须输入整数
9             creditcard:               必须输入合法的信用卡号
10            equalTo:"#field"          输入值必须和 #field 相同
11            accept:                   输入拥有合法后缀名的字符串(上传文件的后缀)
12            maxlength:5               输入长度最多是 5 的字符串(汉字算一个字符)
13            minlength:10              输入长度最小是 10 的字符串(汉字算一个字符)
14            rangelength:[5,10]        输入长度必须介于 5 和 10 之间的字符串(汉字算一个字符)
15            range:[5,10]              输入值必须介于 5 和 10 之间
16            max:5                     输入值不能大于 5
17            min:10                    输入值不能小于 10    </pre>
</div>

&emsp;&emsp;下面使用一个更详细的例子，对上面的17个规则进行应用&nbsp;

<div>
<pre>&lt;form id="demoForm"&gt;
    &lt;p&gt;
        &lt;label for="username"&gt;用户名：&lt;/label&gt;
        &lt;input type="text" id="username" name="username"/&gt;
    &lt;/p&gt;
    &lt;p&gt;
        &lt;label for="password"&gt;密码：&lt;/label&gt;
        &lt;input type="password" id="password" name="password"/&gt;
    &lt;/p&gt;
   &lt;p&gt;
        &lt;label for="confirm-password"&gt;确认密码&lt;/label&gt;
        &lt;input type="password" id="confirm-password" name="confirm-password"/&gt;
    &lt;/p&gt;
    &lt;p&gt;
        &lt;label for="email"&gt;电子邮件：&lt;/label&gt;
        &lt;input id="email" name="email"/&gt;
    &lt;/p&gt;
    &lt;p&gt;
        &lt;label for="url"&gt;网址：&lt;/label&gt;
        &lt;input id="url" name="url"/&gt;
    &lt;/p&gt;
    &lt;p&gt;
        &lt;label for="date"&gt;生日：&lt;/label&gt;
        &lt;input id="date" name="date"/&gt;
    &lt;/p&gt;
    &lt;p&gt;
        &lt;label for="num"&gt;随机数(0-9)：&lt;/label&gt;
        &lt;input id="num" name="num"/&gt;
    &lt;/p&gt;
    &lt;p&gt;
        &lt;label for="card"&gt;信用卡号：&lt;/label&gt;
        &lt;input id="card" name="card"/&gt;
    &lt;/p&gt;
    &lt;p&gt;
        &lt;input type="submit" value="登录"/&gt;
    &lt;/p&gt;
&lt;/form&gt; 
&lt;script&gt;
$('#demoForm').validate({
    rules:{
        username:{
            required: true,
            maxlength: 10
        },
        password:{
            required: true,
            range:[5,10]
        },
        'confirm-password':{
            equalTo: "#password"
        },
        email:{
            email:true
        },
        url:{
            url:true
        },
        date:{
            dateISO:true
        },
        num:{
            min:0,
            max:9
        },
        card:{
            creditcard:true
        }
    }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 370px;" src="https://demo.xiaohuochai.site/jquery/validate/v2.html" frameborder="0" width="320" height="240"></iframe>

### 默认提示

&emsp;&emsp;由上面的例子中看出，validate的默认提示是英文的

<div>
<pre>messages: {
    required: "This field is required.",
    remote: "Please fix this field.",
    email: "Please enter a valid email address.",
    url: "Please enter a valid URL.",
    date: "Please enter a valid date.",
    dateISO: "Please enter a valid date ( ISO ).",
    number: "Please enter a valid number.",
    digits: "Please enter only digits.",
    creditcard: "Please enter a valid credit card number.",
    equalTo: "Please enter the same value again.",
    maxlength: $.validator.format( "Please enter no more than {0} characters." ),
    minlength: $.validator.format( "Please enter at least {0} characters." ),
    rangelength: $.validator.format( "Please enter a value between {0} and {1} characters long." ),
    range: $.validator.format( "Please enter a value between {0} and {1}." ),
    max: $.validator.format( "Please enter a value less than or equal to {0}." ),
    min: $.validator.format( "Please enter a value greater than or equal to {0}." )
}</pre>
</div>

&emsp;&emsp;不过可以将其修改为中文，只要加入以下代码

<div>
<pre>$.extend($.validator.messages, {
    required: "这是必填字段",
    remote: "请修正此字段",
    email: "请输入有效的电子邮件地址",
    url: "请输入有效的网址",
    date: "请输入有效的日期",
    dateISO: "请输入有效的日期 (YYYY-MM-DD)",
    number: "请输入有效的数字",
    digits: "只能输入数字",
    creditcard: "请输入有效的信用卡号码",
    equalTo: "你的输入不相同",
    extension: "请输入有效的后缀",
    maxlength: $.validator.format("最多可以输入 {0} 个字符"),
    minlength: $.validator.format("最少要输入 {0} 个字符"),
    rangelength: $.validator.format("请输入长度在 {0} 到 {1} 之间的字符串"),
    range: $.validator.format("请输入范围在 {0} 到 {1} 之间的数值"),
    max: $.validator.format("请输入不大于 {0} 的数值"),
    min: $.validator.format("请输入不小于 {0} 的数值")
});</pre>
</div>

<iframe style="width: 100%; height: 370px;" src="https://demo.xiaohuochai.site/jquery/validate/v3.html" frameborder="0" width="320" height="240"></iframe>

### 使用方式

&emsp;&emsp;上面的例子中，validate控件的使用，都是通过使用validate()方法完成的，由于这种方法将HTML结构和javascript逻辑分离，使得代码更加优化

&emsp;&emsp;实际上，还有另一种方法就是通过添加HTML属性的方式或添加class类名的方式来进行验证，类似于[HTML5新增的input类控件](http://www.cnblogs.com/xiaohuochai/p/5179909.html)的功能

&emsp;&emsp;由于已经将验证规则添加到HTML元素中，所以调用validate()方法时，参数为空

<div>
<pre>&lt;form id="demoForm"&gt;
    &lt;p&gt;
        &lt;label for="username"&gt;用户名：&lt;/label&gt;
        &lt;input type="text" id="username" name="username" class="required" minlength="2"/&gt;
    &lt;/p&gt;
    &lt;p&gt;
        &lt;label for="email"&gt;电子邮件：&lt;/label&gt;
        &lt;input id="email" name="email" class="required email"/&gt;
    &lt;/p&gt;
    &lt;p&gt;
        &lt;label for="url"&gt;网址：&lt;/label&gt;
        &lt;input id="url" name="url" class="url"/&gt;
    &lt;/p&gt;
    &lt;p&gt;
        &lt;input type="submit" value="登录"/&gt;
    &lt;/p&gt;
&lt;/form&gt; 
&lt;script&gt;
$('#demoForm').validate({})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/jquery/validate/v4.html" frameborder="0" width="320" height="240"></iframe>

### 更改提示

&emsp;&emsp;无论是validate插件自带的英文提示，或者是其扩展的中文提示，可能与实际项目的需求不相符。这时，就需要我们对错误提示进行更改

&emsp;&emsp;而更改错误提示的方法也很简单，只需要使用validate()函数里的，messages()方法即可。如果某个控件没有使用messages()方法，则使用默认的错误提示信息。如下所示

&emsp;&emsp;在messages()方法中，{0}代表rules()方法当前规则的属性值

<div>
<pre>&lt;form id="demoForm"&gt;
    &lt;p&gt;
        &lt;label for="username"&gt;用户名：&lt;/label&gt;
        &lt;input type="text" id="username" name="username" /&gt;
    &lt;/p&gt;
    &lt;p&gt;
        &lt;label for="email"&gt;电子邮件：&lt;/label&gt;
        &lt;input id="email" name="email" /&gt;
    &lt;/p&gt;
    &lt;p&gt;
        &lt;label for="url"&gt;网址：&lt;/label&gt;
        &lt;input id="url" name="url"/&gt;
    &lt;/p&gt;
    &lt;p&gt;
        &lt;input type="submit" value="登录"/&gt;
    &lt;/p&gt;
&lt;/form&gt; 
&lt;script&gt;
$('#demoForm').validate({
    rules:{
        username:{
            required: true,
            minlength: 2,
            maxlength: 10
        },
        email:{
            required: true,
            email:true
        },
        url:{
            required: true,
            url:true            
        }
    },
    messages:{
        username:{
            required:"请输入用户名",
            minlength:"至少输入{0}个字符"
        },
        email:{
            required:"请输入邮箱",
            email:"邮箱格式不正确"
        },
        url:{
            required:"请输入网址",
            url:"网址格式不正确(完整的网址应包括http://或https://)"
        }
    }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/jquery/validate/v5.html" frameborder="0" width="320" height="240"></iframe>

### 美化样式

&emsp;&emsp;实际上，validate插件输出错误信息的方式是通过增加一个label控件实现的，该label控件的id名为'输入控件的id名-error'，类名为'error'，且位于输入控件的右侧

![](http://images2015.cnblogs.com/blog/740839/201703/740839-20170328222238436-1661386155.png)

&emsp;&emsp;下表中列出了关于错误信息的相关属性的方法

<div>
<pre>参数                &emsp;&emsp;类型        &emsp;&emsp;默认值        &emsp;&emsp;描述    
errorClass             String        "error"        指定错误提示的css类名    
errorElement        &emsp;&emsp;String        "label"        用什么标签标记错误    
errorContainer         Selector   &emsp;&emsp; 无            显示或者隐藏验证信息，可以自动实现有错误信息出现时把容器属性变为显示，无错误时隐藏，用处不大。如errorContainer: "#messageBox1, #messageBox2"    
errorLabelContainer    Selector    &emsp;&emsp;无            把错误信息统一放在一个容器里面    
wrapper                String       　 无            用什么标签再把上边的errorELement包起来</pre>
</div>

【成功样式】

&emsp;&emsp;validate插件有一个success()方法，用来设置要验证的元素通过验证后的动作，如果跟一个字符串，会当作一个css类，也可跟一个函数

<div>
<pre>success：String,Callback</pre>
</div>
<div>
<pre>success: function(label) {
    label.html("&amp;nbsp;").addClass("success");
}    
success: "success"</pre>
</div>

&emsp;&emsp;但实际上，validate插件只是将label标签添加了一个'success'类，且原先的'error'类并没有删除。且经过实际测试，'error'类名无法删除，删除之后，每次验证成功时，validate插件都会自动再生成一个label标签

&emsp;&emsp;所以，success的效果无法正常使用，这应该是validate插件的一个bug

<div>
<pre>&lt;style&gt;
label.error{background: no-repeat 0 4px;background-image:url('unchecked.gif');margin-left:6px;padding-left:14px;color:red;}
&lt;/style&gt;
&lt;body&gt;
&lt;form id="demoForm"&gt;
    &lt;p&gt;
        &lt;label for="username"&gt;用户名：&lt;/label&gt;
        &lt;input type="text" id="username" name="username" /&gt;
    &lt;/p&gt;
    &lt;p&gt;
        &lt;label for="email"&gt;电子邮件：&lt;/label&gt;
        &lt;input id="email" name="email" /&gt;
    &lt;/p&gt;
    &lt;p&gt;
        &lt;label for="url"&gt;网址：&lt;/label&gt;
        &lt;input id="url" name="url"/&gt;
    &lt;/p&gt;
    &lt;p&gt;
        &lt;input type="submit" value="登录"/&gt;
    &lt;/p&gt;
&lt;/form&gt; 
&lt;script&gt;
$('#demoForm').validate({
    rules:{
        username:{
            required: true,
            minlength: 2,
            maxlength: 10
        },
        email:{
            required: true,
            email:true
        },
        url:{
            required: true,
            url:true            
        }
    },
    messages:{
        username:{
            required:"请输入用户名",
            minlength:"至少输入{0}个字符",
            maxlength:"最多输入{0}个字符"
        },
        email:{
            required:"请输入邮箱",
            email:"邮箱格式不正确"
        },
        url:{
            required:"请输入网址",
            url:"网址格式不正确(完整的网址应包括http://或https://)"
        }
    }   
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/jquery/validate/v6.html" frameborder="0" width="320" height="240"></iframe>

### 自定义验证

&emsp;&emsp;由于需求的需要，除提供的默认验证规则外，还需要自定义验证规则，满足业务需要。这时就需要使用addMethod()方法

【addMethod(】

&emsp;&emsp;addMethod(name,method,message)方法用来添加一个新的验证方法

&emsp;&emsp;参数 name 是添加的方法的名字。参数 method 是一个函数，接收三个参数 (value,element,param)。value 是元素的值，element 是元素本身，param 是参数

&emsp;&emsp;以验证手机号为例，手机号一般是11位，前3位是号段，后8位一般没有限制。而且，在手机开头很可能有0或+86

<div>
<pre>//开头
(0|\+86)?
//前3位
13\d|14[579]|15[0-35-9]|17[0135-8]|18\d
//后8位
\d{8}
//手机号码
var phone = /^(0|\+86)?(13\d|14[579]|15[0-35-9]|17[0135-8]|18\d)\d{8}$/;</pre>
</div>
<div>
<pre>$.validator.addMethod({
    'phone',
    function(value,element,param){
        var reg = /^(0|\+86)?(13\d|14[579]|15[0-35-9]|17[0135-8]|18\d)\d{8}$/;
        return value.test(reg);
    },
    '请输入正确的手机号码'
})</pre>
</div>
<div>
<pre>&lt;style&gt;
label.error{margin-left:6px;padding-left:14px;color:red;background: no-repeat 0 4px;background-image:url('data:image/gif;base64,R0lGODlhDgAOAMQAAOpSAPWpgPvf0O5zMPGIUPe+n////+tdEPjJsP718POecO1oIPrUwPzq4Pa0kPKTYPSof////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUABEALAAAAAAOAA4AAAVcYCQm0AAAA5SIbHGcMHAULazEJ528AGIsgADDIUsEYAYDopBsAAOmXDLpOkVPB0ETFxskpjeY6fD4GhrJBAF1zCYDBx/jFYi8DoEH9yAqcGM0fTwxMywsUFZ1LCEAOw==');}
&lt;/style&gt;
&lt;form id="demoForm"&gt;
    &lt;p&gt;
        &lt;label for="phone"&gt;手机号码：&lt;/label&gt;
        &lt;input type="text" id="phone" name="phone" /&gt;
    &lt;/p&gt;
    &lt;p&gt;
        &lt;input type="button" value="提交"&gt;
    &lt;/p&gt;
&lt;/form&gt; 
&lt;script&gt;
$.validator.addMethod(
    'phone',
    function(value,element,param){
        var reg = /^(0|\+86)?(13\d|14[579]|15[0-35-9]|17[0135-8]|18\d)\d{8}$/;
        return reg.test(value);
    },
    '请输入正确的手机号码'
);
$('#demoForm').validate({
    rules:{
        phone:{
            required: true,
            phone:true            
        }
    },
    messages:{
        phone:{
            required:"请输入手机号码"
        }
    }   
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/jquery/validate/v7.html" frameborder="0" width="320" height="240"></iframe>

### 修改触发方式

&emsp;&emsp;下面的虽然是 boolean 型的，但建议除非要改为 false，否则别乱添加

<div>
<pre>触发方式     类型    描述    默认值
onsubmit    　 Boolean    提交时验证。设置为 false 就用其他方法去验证    true
onfocusout     Boolean    失去焦点时验证（不包括复选框/单选按钮）  　 true
onkeyup    Boolean    在 keyup 时验证。   true
onclick    Boolean    在点击复选框和单选按钮时验证   　true
focusInvalid    　Boolean    提交表单后，未通过验证的表单会获得焦点    　 true
focusCleanup    　Boolean    如果是true，当未通过验证的元素获得焦点时，移除错误提示  false</pre>
</div>

&nbsp;

### 远程校验

&emsp;&emsp;使用 ajax 方式进行验证，默认会提交当前验证的值到远程地址，如果需要提交其他的值，可以使用 data 选项

&emsp;&emsp;注意：远程地址只能输出 "true" 或 "false"，不能有其他输出

<div>
<pre>remote: {
    url: "check-email.php",     //后台处理程序
    type: "post",               //数据发送方式
    dataType: "json",           //接受数据格式   
    data: {                     //要传递的数据
        username: function() {
            return $("#username").val();
        }
    }
}</pre>
</div>
<div>
<pre>&lt;style&gt;
label.error{margin-left:6px;padding-left:14px;color:red;background: no-repeat 0 4px;background-image:url('data:image/gif;base64,R0lGODlhDgAOAMQAAOpSAPWpgPvf0O5zMPGIUPe+n////+tdEPjJsP718POecO1oIPrUwPzq4Pa0kPKTYPSof////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUABEALAAAAAAOAA4AAAVcYCQm0AAAA5SIbHGcMHAULazEJ528AGIsgADDIUsEYAYDopBsAAOmXDLpOkVPB0ETFxskpjeY6fD4GhrJBAF1zCYDBx/jFYi8DoEH9yAqcGM0fTwxMywsUFZ1LCEAOw==');}
&lt;/style&gt;
&lt;form id="demoForm"&gt;
    &lt;p&gt;
        &lt;label for="num"&gt;请选择数字&lt;/label&gt;
        &lt;select name="num" id="num"&gt;
            &lt;option value="1"&gt;1&lt;/option&gt;
            &lt;option value="2"&gt;2&lt;/option&gt;
            &lt;option value="3"&gt;3&lt;/option&gt;
        &lt;/select&gt;
    &lt;/p&gt;
    &lt;p&gt;
        &lt;input type="button" value="提交"&gt;
    &lt;/p&gt;
&lt;/form&gt; 
&lt;script&gt;
$('#demoForm').validate({
    rules:{
        num:{
            remote:"validateTest.php"
        }
    },
    messages:{
        num:{
            remote:"选择的数字不正确"
        }
    }
});
&lt;/script&gt;</pre>
</div>
<div>
<pre>&lt;?php
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
$data = test_input($_REQUEST['num']);
if($data == '2'){
    echo "true";
}else{
    echo "false";
}
?&gt;</pre>
</div>

<iframe src="https://xiaohuochai.site/test/validate/test.html" frameborder="0" width="320" height="100"></iframe>

&nbsp;

## 最后

&emsp;&emsp;validation插件的功能不只于此，但本文基本上把常用的功能进行了详细的介绍。如果要了解validation更高级的功能，请移步[官方网站](https://jqueryvalidation.org/)

&emsp;&emsp;最后介绍一个比较有趣的知识&mdash;&mdash;validate、validation和validator，它们的中文意思是验证。validation插件的js文件名是validate.js，validation插件中最常用的方法就是validate()方法，基本上所有的验证操作都通过该方法进行。如果要进行自定义验证的话，则需要用到validator对象下的静态方法addMethod()

&emsp;&emsp;以上