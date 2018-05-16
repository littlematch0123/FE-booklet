# 深入理解ajax系列第五篇——进度事件

&emsp;&emsp;一般地，使用[readystatechange事件](http://www.cnblogs.com/xiaohuochai/p/6036475.html#anchor6)探测HTTP请求的完成。XHR2规范草案定义了进度事件Progress Events规范，XMLHttpRequest对象在请求的不同阶段触发不同类型的事件，所以它不再需要检査readyState属性。这个草案定义了与客户端服务器通信有关的事件。这些事件最早其实只针对XHR操作，但目前也被其他API(如File API)借鉴。本文将详细介绍进度事件

&nbsp;

### 基础

&emsp;&emsp;有以下6个进度事件

&emsp;&emsp;loadstart:在接收到响应数据的第一个字节时触发

&emsp;&emsp;progress:在接收响应期间持续不断地触

&emsp;&emsp;error:在请求发生错误时触发

&emsp;&emsp;abort:在因为调用abort()方法而终止连接时触发

&emsp;&emsp;load:在接收到完整的响应数据时触发

&emsp;&emsp;loadend:在通信完成或者触发error、abort或load事件后触发

&emsp;&emsp;timeout:超时发生时触发

&emsp;&emsp;注意：IE9-浏览器不支持以上事件(IE9浏览器仅支持load事件)

&emsp;&emsp;每个请求都从触发loadstart事件开始，接下来，通常每隔50毫秒左右触发一次progress事件，然后触发load、error、abort或timeout事件中的一个，最后以触发loadend事件结束

&emsp;&emsp;对于任何具体请求，浏览器将只会触发load、abort、timeout和error事件中的一个。XHR2规范草案指出一旦这些事件中的一个发生后，浏览器应该触发loadend事件

&nbsp;

### load

&emsp;&emsp;响应接收完毕后将触发load事件，因此也就没有必要去检查readyState属性了。但一个完成的请求不一定是成功的请求，例如，load事件的处理程序应该检查XMLHttpRequest对象的status状态码来确定收到的是&ldquo;200 OK&rdquo;而不是&ldquo;404 Not Found&rdquo;的HTTP响应

<div>
<pre>&lt;button id="btn"&gt;获取信息&lt;/button&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
btn.onclick = function(){
    //创建xhr对象
    var xhr;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    //进度事件
    xhr.onload = function(){
        if(xhr.status == 200){
            result.innerHTML += xhr.responseText;
        }
    }
    //发送请求
    xhr.open('get','message.xml',true);
    xhr.send();
}
&lt;/script&gt;        </pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/progress/p1.html" frameborder="0" width="320" height="240"></iframe>

### progress

&emsp;&emsp;progress事件会在浏览器接收新数据期间周期性地触发。而onprogress事件处理程序会接收到一个event对象，其target属性是XHR对象，但包含着三个额外的属性：lengthComputable、loaded和total。其中，lengthComputable是一个表示进度信息是否可用的布尔值，loaded表示已经接收的字节数，total表示根据Content-Length响应头部确定的预期字节数。有了这些信息，就可以为用户创建一个进度指示器了

<div>
<pre>&lt;button id="btn"&gt;获取信息&lt;/button&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;div id="music"&gt;&lt;/div&gt;
&lt;script&gt;
btn.onclick = function(){
    //创建xhr对象
    var xhr;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    //进度事件
    xhr.onprogress = function(e){
        e = e || event;
        if (e.lengthComputable){
            result.innerHTML = "Received " + e.loaded + " of " + e.total + " bytes";
        }
    };
    xhr.onload = function(e){
        var data = xhr.response;
        e = e || event;
        if(xhr.status == 200){
            var audio = document.createElement('audio');
            audio.onload = function(){
                URL.revokeObjectURL(audio.src);
            }
            audio.src = URL.createObjectURL(data);
             console.log(audio);
            audio.setAttribute('controls','');
            if(!music.innerHTML){
                music.appendChild(audio);
            }
        }
    };
    //发送请求
    xhr.open('get','myocean.mp3',true);
    xhr.responseType = 'blob';
    xhr.send();
}
&lt;/script&gt;    </pre>
</div>

<iframe src="https://demo.xiaohuochai.site/js/progress/p2.html" frameborder="0" width="320" height="120"></iframe>

### 上传进度

&emsp;&emsp;除了为监控HTTP响应的加载定义的这些有用的事件外，XHR2也给出了用于监控HTTP请求上传的事件。在实现这些特性的浏览器中，XMLHttpRequest对象将有upload属性。upload属性值是一个对象，它定义了addEventListener()方法和整个progress事件集合，比如onprogress和onload(但upload对象没有定义onreadystatechange属性，upload仅能触发新的事件类型)

&emsp;&emsp;能仅仅像使用常见的progress事件处理程序一样使用upload事件处理程序。对于XMLHttpRequest对象，设置XHR.onprogress以监控响应的下载进度，并且设置XHR.upload.onprogress以监控请求的上传进度

<div>
<pre>&lt;input type="file" name="file1" id="file1" style="display:none"&gt;
&lt;button id="btn"&gt;上传文件&lt;/button&gt;
&lt;div id="pro"&gt;&lt;/div&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
btn.onclick = function(){
    file1.click();
    pro.innerHTML = result.innerHTML = '';
}
file1.onchange = function(){
    //创建xhr对象
    var xhr;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    var data = file1.files[0];
    //上传事件
    xhr.upload.onprogress = function(e){
        e = e || event;
        if (e.lengthComputable){
            pro.innerHTML = "上传进度为：" + e.loaded + " of " + e.total + " bytes" + '；百分比为：' + e.loaded/e.total;
        }
    }
    xhr.onload = function(e){
        var data = xhr.responseText;
        e = e || event;
        if(xhr.status == 200){
            result.innerHTML =  data;
        }
    };
    //发送请求
    xhr.open('post','pp.php',true);
    xhr.setRequestHeader("content-type",data.type);
    xhr.send(data);
}
&lt;/script&gt;      </pre>
</div>
<div>
<pre>&lt;?php
error_reporting(E_ALL &amp; ~E_NOTICE);
touch($file);
if(preg_match('/image/',apache_request_headers()['content-type'])){
    $file = 'photo/test.jpg'; 
    binary_to_file($file);
    echo '文件上传成功!';
}else{
    echo '文件格式不正确，请选择图片文件';
}
function binary_to_file($file){
    $content = $GLOBALS['HTTP_RAW_POST_DATA'];  // 需要php.ini设置
    if(empty($content)){
        $content = file_get_contents('php://input'); //不需要php.ini设置，内存压力小
    }
    $ret = file_put_contents($file, $content, true);
    return $ret;
};
?&gt;</pre>
</div>

&nbsp;

### 其他事件

&emsp;&emsp;HTTP请求无法完成有3种情况，对应3种事件。如果请求超时，会触发timeout事件。如果请求中止，会触发abort事件。最后，像太多重定向这样的网络错误会阻止请求完成，但这些情况发生时会触发error事件

&emsp;&emsp;可以通过调用XMLHttpRequest对象的abort()方法来取消正在进行的HTTP请求。调用abort()方法在这个对象上触发abort事件

&emsp;&emsp;调用abort()的主要原因是完成取消或超时请求消耗的时间太长或当响应变得无关时。假如使用XMLHttpRequest为文本输入域请求自动完成推荐。如果用户在服务器的建议达到之前输入了新字符，这时等待请求不再有用，应该中止

&emsp;&emsp;XHR对象的timeout属性等于一个整数，表示多少毫秒后，如果请求仍然没有得到结果，就会自动终止。该属性默认等于0，表示没有时间限制

&emsp;&emsp;如果请求超时，将触发ontimeout事件

<div>
<pre>var xhr = new XMLHttpRequest();
btn.onclick = function(){
    xhr.abort();
};
xhr.ontimeout = function(){
    console.log('The request timed out.');
}
xhr.timeout = 100;
xhr.onabort = function(){
    console.log("The transfer has been canceled by the user.");
}
xhr.onerror = function(){
    console.log("An error occurred while transferring the file.");    
}
xhr.onloadend = function(){
    console.log("请求结束");    
}</pre>
</div>


