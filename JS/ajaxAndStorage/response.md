# 深入理解ajax系列第三篇——响应解码

&emsp;&emsp;我们接收到的响应主体类型可以是多种形式的，包括字符串String、ArrayBuffer对象、二进制Blob对象、JSON对象、javascirpt文件及表示XML文档的Document对象等。下面将针对不同的主体类型，进行相应的响应解码

&nbsp;

### 属性

&emsp;&emsp;在介绍响应解码之前，要先了解[XHR对象](http://www.cnblogs.com/xiaohuochai/p/6036475.html)的属性。一般地，如果接受的数据是字符串，使用responseText即可，这也是最常用的用于接收数据的属性。但如果获取了其他类型的数据，使用responseText可能就不太合适了

【responseText】

&emsp;&emsp;responseText属性返回从服务器接收到的字符串，该属性为只读。如果本次请求没有成功或者数据不完整，该属性就会等于null。

&emsp;&emsp;如果服务器返回的数据格式是JSON、字符串、javascript或XML，都可以使用responseText属性

【response】

&emsp;&emsp;response属性为只读，返回接收到的数据体。它的类型可以是ArrayBuffer、Blob、Document、JSON对象、或者一个字符串，这由XMLHttpRequest.responseType属性的值决定

&emsp;&emsp;如果本次请求没有成功或者数据不完整，该属性就会等于null

&emsp;&emsp;注意：IE9-浏览器不支持

【responseType】

&emsp;&emsp;responseType属性用来指定服务器返回数据(xhr.response)的类型

<div>
<pre>&ldquo;&rdquo;：字符串(默认值)
&ldquo;arraybuffer&rdquo;：ArrayBuffer对象
&ldquo;blob&rdquo;：Blob对象
&ldquo;document&rdquo;：Document对象
&ldquo;json&rdquo;：JSON对象
&ldquo;text&rdquo;：字符串</pre>
</div>

【responseXML】

&emsp;&emsp;responseXML属性返回从服务器接收到的Document对象，该属性为只读。如果本次请求没有成功，或者数据不完整，或者不能被解析为XML或HTML，该属性等于null

【overrideMimeType()】

&emsp;&emsp;该方法用来指定服务器返回数据的MIME类型。该方法必须在send()之前调用

&emsp;&emsp;传统上，如果希望从服务器取回二进制数据，就要使用这个方法，人为将数据类型伪装成文本数据

&emsp;&emsp;但是，这种方法很麻烦，在XMLHttpRequest版本升级以后，一般采用指定responseType的方法

&nbsp;

### 字符串

&emsp;&emsp;如果服务器返回的结果是一个字符串，则直接使用responseText属性解析即可

&emsp;&emsp;关于ajax()函数的封装，已经在[上一篇博客](http://www.cnblogs.com/xiaohuochai/p/6486643.html#anchor3)中详细介绍过，这里就不再赘述。直接调用[ajax.js](http://files.cnblogs.com/files/xiaohuochai/ajax.js)使用

<div>
<pre>&lt;button id="btn"&gt;取得响应&lt;/button&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
btn.onclick = function(){
    ajax({
        url:'p1.php',
        callback:function(data){
            result.innerHTML = data;
        }
    })
}
&lt;/script&gt;</pre>
</div>
<div>
<pre>&lt;?php
    //设置页面内容的html编码格式是utf-8，内容是纯文本
    header("Content-Type:text/plain;charset=utf-8");    
    echo '你好，世界';
?&gt;</pre>
</div>

<iframe src="https://www.xiaohuochai.site/test/response/r1.html" frameborder="0" width="320" height="80"></iframe>

### JSON

&emsp;&emsp;使用ajax最常用的传输方式就是使用JSON字符串，直接使用responseText属性解析即可

<div>
<pre>&lt;button id="btn"&gt;取得响应&lt;/button&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
btn.onclick = function(){
    ajax({
        url:'p2.php',
        callback:function(data){
            var obj = JSON.parse(data);
            var html = '';
            for(var i = 0; i &lt; obj.length; i++){
                html+= '&lt;div&gt;' + obj[i].title + ':' + obj[i].data + '&lt;/div&gt;';
            }
            result.innerHTML = html;
            html = null;
        }
    })
}
&lt;/script&gt;</pre>
</div>
<div>
<pre>&lt;?php
    header("Content-Type:application/json;charset=utf-8");    
    $arr = [['title'=&gt;'颜色','data'=&gt;'红色'],['title'=&gt;'尺寸','data'=&gt;'英寸'],['title'=&gt;'重量','data'=&gt;'公斤']];
    echo json_encode($arr);
?&gt;</pre>
</div>

<iframe src="https://www.xiaohuochai.site/test/response/r2.html" frameborder="0" width="320" height="120"></iframe>

### XML

&emsp;&emsp;XML在JSON出现之前，是网络上常用的数据传输格式，但由于其格式较笨重，所以用的较少

&emsp;&emsp;接收XML文档时，使用responseXML来对数据进行解析

<div>
<pre>&lt;button id="btn"&gt;取得响应&lt;/button&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
btn.onclick = function(){
    ajax({
        url:'p3.xml',
        callback:function(data){
           var obj = data.getElementsByTagName('CD');
           var html = '';
           for(var i = 0; i &lt; obj.length; i++){
                html += '&lt;div&gt;唱片：' + obj[i].getElementsByTagName('TITLE')[0].innerHTML + '；歌手：' + obj[i].getElementsByTagName('ARTIST')[0].innerHTML  + '&lt;/div&gt;';
           }
           result.innerHTML = html;
           html = null;
        }
    })
}
function ajax(obj){
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
                obj.callback &amp;&amp; obj.callback(xhr.responseXML);
            }
        }
    }
    //创建数据字符串，用来保存要提交的数据
    var strData = '';
    obj.data = true;
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
}
&lt;/script&gt;</pre>
</div>
<div>
<pre>&lt;CATALOG data-livestyle-extension="available"&gt;
&lt;CD&gt;
    &lt;TITLE&gt;迷迭香&lt;/TITLE&gt;
    &lt;ARTIST&gt;周杰伦&lt;/ARTIST&gt;
&lt;/CD&gt;
&lt;CD&gt;
    &lt;TITLE&gt;成都&lt;/TITLE&gt;
    &lt;ARTIST&gt;赵雷&lt;/ARTIST&gt;
&lt;/CD&gt;
&lt;CD&gt;
    &lt;TITLE&gt;是时候&lt;/TITLE&gt;
    &lt;ARTIST&gt;孙燕姿&lt;/ARTIST&gt;
&lt;/CD&gt;
&lt;/CATALOG&gt;</pre>
</div>

<iframe src="https://www.xiaohuochai.site/test/response/r3.html" frameborder="0" width="320" height="120"></iframe>

### js

&emsp;&emsp;使用ajax也可以接收js文件。仍然使用responseText来接收数据，但要使用eval()来执行代码

<div>
<pre>&lt;button id="btn"&gt;取得响应&lt;/button&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
btn.onclick = function(){
    ajax({
        url:'p4.js',
        callback:function(data){
            eval(data);
            var html = '';
            for(var key in obj){
                html += '&lt;div&gt;' + key + ':' + obj[key] + '&lt;/div&gt;';
            }
            result.innerHTML = html;
            html = null;
        }
    })
}
&lt;/script&gt;</pre>
</div>
<div>
<pre>var obj = {
    '姓名':'小火柴',
    '年龄':28,
    '性别':'男'
}</pre>
</div>

<iframe src="https://www.xiaohuochai.site/test/response/r4.html" frameborder="0" width="320" height="120"></iframe>

### blob

&emsp;&emsp;在javascript中，[Blob](http://www.cnblogs.com/xiaohuochai/p/6535130.html)通常表示二进制数据。但在实际Web应用中，Blob更多是图片二进制形式的上传与下载，虽然其可以实现几乎任意文件的二进制传输

&emsp;&emsp;使用ajax接收blob数据，需要使用response来接收，并且将responseType设置为'blob'

&emsp;&emsp;注意：要完全兼容IE10+浏览器，需要将xhr.responseType设置在xhr.open()和xhr.send()方法之间

<div>
<pre>&lt;button id="btn"&gt;取得响应&lt;/button&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
btn.onclick = function(){
    ajax({
        url:'p5.gif',
        callback:function(data){
            var img = document.createElement('img');
            img.onload = function(){
                URL.revokeObjectURL(img.src);
            }
            img.src = URL.createObjectURL(data);
            if(!result.innerHTML){
                result.appendChild(img);
            }
        },
        method:'post'
    })
}
function ajax(obj){
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
                obj.callback &amp;&amp; obj.callback(xhr.response);
            }
        }
    }
    //创建数据字符串，用来保存要提交的数据
    var strData = '';
    obj.data = true;
    if(obj.method == 'post'){
        for(var key in obj.data){
            strData += '&amp;' + key + "=" + obj.data[key];
        }    
        //去掉多余的'&amp;'
        strData = strData.substring(1); 
        xhr.open('post',obj.url,true);
        xhr.responseType = 'blob';
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
        xhr.responseType = 'blob';
        //发送请求
        xhr.send();    
    }
}
&lt;/script&gt;</pre>
</div>

<iframe src="https://www.xiaohuochai.site/test/response/r5.html" frameborder="0" width="320" height="230"></iframe>

&nbsp;

### arraybuffer

&emsp;&emsp;[arraybuffer](http://www.cnblogs.com/xiaohuochai/p/6534621.html#anchor2)代表储存二进制数据的一段内存，而blob则用于表示二进制数据。通过ajax接收arraybuffer，然后将其转换为blob数据，从而进行进一步的操作

 &emsp;&emsp;responseType设置为arraybuffer，然后将response作为new Blob()构造函数的参数传递，生成blob对象

<div>
<pre>&lt;button id="btn"&gt;取得响应&lt;/button&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
btn.onclick = function(){
    ajax({
        url:'p5.gif',
        callback:function(data){
            var img = document.createElement('img');
            img.onload = function(){
                URL.revokeObjectURL(img.src);
            }
            img.src = URL.createObjectURL(new Blob([data]));
            if(!result.innerHTML){
                result.appendChild(img);
            }
       }
    })
}
function ajax(obj){
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
                obj.callback &amp;&amp; obj.callback(xhr.response);
            }
        }
    }
    //创建数据字符串，用来保存要提交的数据
    var strData = '';
    obj.data = true;
    if(obj.method == 'post'){
        for(var key in obj.data){
            strData += '&amp;' + key + "=" + obj.data[key];
        }    
        //去掉多余的'&amp;'
        strData = strData.substring(1); 
        xhr.open('post',obj.url,true);
        //设置请求头
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.responseType = 'arraybuffer';
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
        xhr.responseType = 'arraybuffer';
        //发送请求
        xhr.send();    
    }
}
&lt;/script&gt;</pre>
</div>

<iframe src="https://www.xiaohuochai.site/test/response/r6.html" frameborder="0" width="320" height="230"></iframe>