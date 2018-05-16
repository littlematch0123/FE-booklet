# 深入理解ajax系列第四篇——FormData

&emsp;&emsp;现代Web应用中频繁使用的一项功能就是表单数据的序列化，XMLHttpRequest 2级为此定义了FormData类型。FormData为序列化表单以及创建与表单格式相同的数据提供了便利。本文将先介绍表单编码，然后过渡到表单序列化，最后引出FormData的核心概念

&nbsp;

### 表单编码

&emsp;&emsp;当用户提交表单时，表单中的数据(每个表单元素的名字和值)编码到一个字符串中并随请求发送。默认情况下，HTML表单通过POST方法发送给服务器，而编码后的表单数据则用做请求主体

&emsp;&emsp;对表单数据使用的编码方案相对简单：对每个表单元素的名字和值执行普通的URL编码(使用十六进制转义码替换特殊字符)，使用等号把编码后的名字和值分开，并使用"&amp;"符号分开名/值对。一个简单表单的编码如下所示

<div>
<pre>find=pizza&amp;zipcode=01234&amp;radius=1km</pre>
</div>

&emsp;&emsp;表单数据编码格式有一个正式的MIME类型

<div>
<pre>application/x-www-form-urlencoded</pre>
</div>

&emsp;&emsp;当使用POST方法提交这种顺序的表单数据时，必须"Content-Type"请求头为这个值

&emsp;&emsp;注意：这种类型的编码并不需要HTML表单，在Ajax应用中，希望发送给服务器的很可能是一个javascript对象

&emsp;&emsp;前面展示的数据变成javascript对象的表单编码形式可能是：

<div>
<pre>{find: "pizza", zipcode: 01234, radius: "1km"}</pre>
</div>

&emsp;&emsp;表单编码在Web上如此广泛使用，同时所有服务器端的编程语言都能得到良好的支持，所以非表单数据的表单编码通常也是容易实现的事情

&emsp;&emsp;下面代码展示了如何实现对象属性的表单编码

<div>
<pre>function encodeFormData(data){
    if (!data) return "";    //一直返回字符串
    var pairs = [];            //用于保存名值对
    for(var name in data){ 
        if (!data.hasOwnProperty(name)){
            continue;        //跳过继承属性
        }
        if (typeof data[name] === "function"){
            continue;         //跳过方法 
        }
        var value = data[name].toString();    //把值转换成字符串
        name = encodeURIComponent(name.replace("%20", "+")); //编码名字
        value = encodeURIComponent(value.replace("%20", "+"));//编码值
        pairs.push(name + "=" + value); // 存入名值对 
    }
    return pairs.join('&amp;'); //返回使用'&amp;'连接的名值对
} </pre>
</div>
<div>
<pre>var data = {name:'小火柴',age:28,sender:'male'};
//name=%E5%B0%8F%E7%81%AB%E6%9F%B4&amp;age=28&amp;sender=male    
console.log(encodeFormData(data));    </pre>
</div>

&nbsp;

### 表单序列化

&emsp;&emsp;随着Ajax的出现，表单序列化已经成为一种常见需求。在javascript中，可以利用表单字段的type属性，连同name和value属性一起实现对表单的序列化。在编写代码之前，有必须先搞清楚在表单提交期间，浏览器是怎样将数据发送给服务器的

&emsp;&emsp;1、对表单字段的名称和值进行URL编码，使用和号(&amp;)分隔

&emsp;&emsp;2、不发送禁用的表单字段

&emsp;&emsp;3、只发送勾选的复选框和单选按钮

&emsp;&emsp;4、不发送type为"reset"和"button"的按钮

&emsp;&emsp;5、多选选择框中的每个选中的值単独一个条目

&emsp;&emsp;6、在单击提交按钮提交表单的情况下，也会发送提交按钮；否则，不发送提交按钮。也包括type为"image"的&lt;input&gt;元素

&emsp;&emsp;7、&lt;select&gt;元素的值，就是选中的&lt;option&gt;元素的value特性的值。如果&lt;option&gt;元素没有value特性，则是&lt;option&gt;元素的文本值

&emsp;&emsp;在表单序列化过程中，一般不包含任何按钮字段，因为结果字符串很可能是通过其他方式提交的。除此之外的其他上述规则都应该遵循

&emsp;&emsp;在下面表单序列化serialize()函数中，首先定义了一个名为parts的数组，用于保存将要创建的字符串的各个部分。然后，通过for循环迭代每个表单字段，并将其保存在field变量中。在获得了一个字段的引用之后，使用switch语句检测其type属性

&emsp;&emsp;序列化过程中最麻烦的就是&lt;select&gt;元素，它可能是单选框也可能是多选框。为此，需要遍历控件中的每一个选项，并在相应选项被选中的情况下向数组中添加一个值。对于单选框，只可能有一个选中项，而多选框则可能有零或多个选中项。这里的代码适用于这两种选择框，至于可选项的数量则是由浏览器控制的。在找到一个选中项之后，需要确定使用什么值。如果不存在value特性，或者虽然存在该特性，但值为空字符串，都要使用选项的文本来代替。为检査这个特性，在DOM兼容的浏览器中需要使用hasAttribute()方法，而在IE7-中需要使用特性的specified属性

&emsp;&emsp;如果表单中包含&lt;fieldset&gt;元素，则该元素会出现在元素集合中，但没有type属性。因此，如果type属性未定义，则不需要对其进行序列化。同样，对于各种按钮以及文件输入字段也是如此(文件输入字段在表单提交过程中包含文件的内容；但是，这个字段是无法模仿的，序列化时一般都要忽略)

&emsp;&emsp;对于单选按钮和复选框，要检查其checked属性是否被设置为false，如果是则退出switch语句。如果checked属性为true，则继续执行default语句，即将当前字段的名称和值进行编码，然后添加到parts数组中。函数的最后一步，就是使用join()格式化整个字符串，也就是用和号来分隔每一个表单字段

&emsp;&emsp;最后，serialize()函数会以査询字符串的格式输出序列化之后的字符串

<div>
<pre>function serialize(form){        
    var parts = [],field = null,option,optValue;
    for (var i=0, len=form.elements.length; i &lt; len; i++){
        field = form.elements[i];
        switch(field.type){
            //单选或多选的&lt;select&gt;控件
            case "select-one":
            case "select-multiple":
                //如果该&lt;select&gt;控件设置为name属性  
                if (field.name.length){
                    for (var j=0,optLen = field.options.length; j &lt; optLen; j++){
                        //选择&lt;option&gt;控件
                        option = field.options[j];
                        //如果该&lt;option&gt;控件被选中
                        if (option.selected){
                            optValue = "";
                            //测试&lt;option&gt;控件的value属性，如果没有设置，则读取其text属性
                            //IE7-浏览器不支持hasAttribute()
                            if (option.hasAttribute){
                                optValue = (option.hasAttribute("value") ? option.value : option.text);
                            } else {
                                optValue = (option.attributes["value"].specified ? option.value : option.text);
                            }
                            //将键和值分别进行编码并用'='连接起来
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
                //如果没有选中项
                if (!field.checked){
                    break;
                }                  
            default:              
                if (field.name.length){
                    parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
                }
        }
    }        
    return parts.join("&amp;");
}</pre>
</div>
<div>
<pre>&lt;form name="form" action="test.php"&gt;
    &lt;input type="text" value="123" name="text"&gt;
    &lt;select name="color"  multiple&gt;
        &lt;option&gt;红&lt;/option&gt;
        &lt;option&gt;绿&lt;/option&gt;
        &lt;option&gt;蓝&lt;/option&gt;
    &lt;/select&gt;
    &lt;input type="radio" name="gender" id="male" value="male"&gt;&lt;label for="male"&gt;男&lt;/label&gt;
    &lt;input type="radio" name="gender" id="female" value="female"&gt;&lt;label for="female"&gt;女&lt;/label&gt;
    &lt;input type="checkbox" name="time" value="12" id="t12"&gt;&lt;label for="t12"&gt;12小时&lt;/label&gt;
    &lt;input type="checkbox" name="time" value="24" id="t24"&gt;&lt;label for="t24"&gt;24小时&lt;/label&gt;
    &lt;button name="btn" type="button"&gt;按钮&lt;/button&gt;
&lt;/form&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
var oForm = document.forms.form;
oForm.onchange = function(e){
    e = e || event;
    result.innerHTML = serialize(form);
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://www.xiaohuochai.site/test/formdata/f1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### FormData

&emsp;&emsp;当HTML表单同时包含文件上传元素和其他元素时，浏览器不能使用普通的表单编码而必须使用称为&ldquo;multipart/form-data&rdquo;的特殊Content-Type来用POST方法提交表单。这种编码包括使用长&ldquo;边界&rdquo;字符串把请求主体分离成多个部分。对于文本数据，手动创建&ldquo;multipart/form-data&rdquo;请求主体是可能的，但很复杂

&emsp;&emsp;XMLHttpRequest 2级为此定义了FormData类型。FormData为序列化表单以及创建与表单格式相同的数据(用于通过XHR传输)提供了便利

&emsp;&emsp;注意：IE9-浏览器不支持

【构造函数】

<div>
<pre>new FormData (form? : HTMLFormElement)</pre>
</div>

&emsp;&emsp;可选参数form表示一个HTML表单元素，可以包含任何形式的表单控件，包括文件输入框

【append()】

&emsp;&emsp;append()方法用于给当前FormData对象添加一个键/值对

<div>
<pre>void append(DOMString name, Blob value, optional DOMString filename);
void append(DOMString name, DOMString value);</pre>
</div>

&emsp;&emsp;参数值name表示字段名称；参数值value表示字段值；参数值filename(可选)用于指定文件的文件名，当value参数被指定为一个Blob对象或者一个File对象时，该文件名会被发送到服务器上，对于Blob对象来说，这个值默认为"blob"

【其他不常用方法】

&emsp;&emsp;get()：通过get(key)/getAll(key)来获取对应的value

&emsp;&emsp;set()：通过set(key,value)修改数据，如果指定的key不存在则新增一条，如果存在，则修改对应的value值

&emsp;&emsp;has()：通过has(key)来判断是否对应的key值

&emsp;&emsp;delete()：通过delete(key)来删除数据

&emsp;&emsp;注意：以上4个不常用方法，IE浏览器都不支持

<div>
<pre>var oData1 = new FormData();
console.log(oData1.has('a'));//false
oData1.append('a',1);
console.log(oData1.has('a'));//true
console.log(oData1.get('a'));//1
oData1.set('a',2);
oData1.append('a',1);
console.log(oData1.get('a'));//2
console.log(oData1.getAll('a'));//["2", "1"]
oData1.delete('a');
console.log(oData1.get('a'));//null</pre>
</div>
<div>
<pre>&lt;form action="#" name="form1"&gt;
    &lt;input type="text" value="1" name="a"&gt;
&lt;/form&gt;
&lt;script&gt;
var oData1 = new FormData(document.forms.form1);
console.log(oData1.has('a'));//true
console.log(oData1.get('a'));//1
oData1.append('a',2);
console.log(oData1.get('a'));//1
console.log(oData1.getAll('a'));//['1','2']
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;一般地，我们使用FormData()构造函数创建FormData对象，然后按需多次调用这个对象的append()方法把个体&ldquo;部分&rdquo;(可以是字符串、File或Blob对象)添加到请求中。最后，把FormData对象传递给send()方法，通过XHR对象将其发送到服务器

&emsp;&emsp;注意：multipart/form-data只能用于post方式

<div>
<pre>&lt;form action="#" name="form1"&gt;
&lt;select name="a"&gt;
    &lt;option value="1"&gt;1&lt;/option&gt;
    &lt;option value="2"&gt;2&lt;/option&gt;
    &lt;option value="3"&gt;3&lt;/option&gt;
&lt;/select&gt;
&lt;/form&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
var oForm = document.forms.form1;
oForm.onchange = function(){
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
                result.innerHTML = xhr.responseText;
            }
        }
    }
    //发送请求
    xhr.open('post','t1.php' ,true);
    xhr.send(new FormData(form1)); 
}
&lt;/script&gt;</pre>
</div>

<iframe src="https://www.xiaohuochai.site/test/formdata/f2.html" frameborder="0" width="320" height="80"></iframe>

