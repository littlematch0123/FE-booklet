# 文件File

&emsp;&emsp;不能直接访问用户计算机中的文件，一直都是Web应用开发中的一大障碍。2000年以前，处理文件的唯一方式就是在表单中加入&lt;input type="file"&gt;字段，仅此而已。FileAPI(文件API)的宗旨是为Web开发人员提供一种安全的方式，以便在客户端访问用户计算机中的文件，并更好地对这些文件执行操作。本文将详细介绍文件File API

&emsp;&emsp;注意：IE9-浏览器不支持

&nbsp;

### File

&emsp;&emsp;File API在表单中的文件输入字段的基础上，又添加了一些直接访问文件信息的接口。HTML5在DOM中为文件输入元素添加了一个files集合。在通过文件输入字段选择了一或多个文件时，files集合中将包含一组File对象，每个File对象对应着一个文件。每个File对象都有下列只读属性

&emsp;&emsp;name:本地文件系统中的文件名

&emsp;&emsp;size:文件的字节大小

&emsp;&emsp;type:字符串，文件的MIME类型

&emsp;&emsp;lastModifiedDate:字符串，文件上一次被修改的时间

&emsp;&emsp;通过侦听change事件并读取files集合就可以知道选择的每个文件的信息

<div>
<pre>&lt;input type="file" id="file1"&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
file1.onchange = function(){
    var data = file1.files[0];
    result.innerHTML = '类型：' + data.type  + '&lt;br&gt;大小：' + data.size + '(字节)&lt;br&gt;名称：' + data.name + '&lt;br&gt;修改时间：' + data.lastModifiedDate;
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 150px;" src="https://demo.xiaohuochai.site/js/file/f1.html" frameborder="0" width="320" height="240"></iframe>

【隐藏文件input】

&emsp;&emsp;现代浏览器支持隐藏掉默认的的文件输入框&lt;input&gt;元素，使用自定义的界面来充当打开文件选择对话框的按钮。实现起来很简单，只需要使用样式display:none把原本的文件输入框隐藏掉，然后在需要的时候调用它的click()方法就行了

&emsp;&emsp;注意：IE9-浏览器不支持

<div>
<pre>&lt;input type="file" id="file1" style="display:none"&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
btn.onclick = function(){
    file1.click();
}
file1.onchange = function(){
    result.innerHTML = file1.files[0].name;
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/js/file/f2.html" frameborder="0" width="320" height="240"></iframe>

### FileReader

&emsp;&emsp;File API的功能还不止于此，通过它提供的FileReader类型甚至还可以读取文件中的数据

【构造函数】

&emsp;&emsp;使用FileReader()构造函数来创建一个FileReader对象

<div>
<pre>var reader = new FileReader();</pre>
</div>

【属性】

&emsp;&emsp;error：表示在读取文件时发生的错误(只读)

&emsp;&emsp;readyState：表明FileReader对象的当前状态，值为状态常量中的一个(只读)

&emsp;&emsp;状态常量有以下三个

<div>
<pre>常量名      值    描述
EMPTY      0    还没有加载任何数据
LOADING    1    数据正在被加载
DONE       2    已完成全部的读取请求</pre>
</div>

&emsp;&emsp;result：表示读取到的文件内容，这个属性只在读取操作完成之后才有效，并且数据的格式取决于读取操作是由哪个方法发起的(只读)

【方法】

&emsp;&emsp;FileReader类型实现的是一种异步文件读取机制。可以把FileReader想象成XMLHttpRequest，区别只是它读取的是文件系统，而不是远程服务器。为了读取文件中的数据，FileReader提供了如下几个方法

&emsp;&emsp;abort()：中止该读取操作

&emsp;&emsp;readAsText(file或Blob,encoding)：以纯文本形式读取File或Blob对象的内容，将读取到的文本保存在result属性中。第二个参数(可选)用于指定编码类型，默认为UTF-8

&emsp;&emsp;readAsDataURL(file或Blob)：读取File或Blob对象的内容，并将文件以数据URI(进行Base64编码)的形式保存在result属性中

&emsp;&emsp;readAsBinaryString(file或Blob)：读取File或Blob对象的内容，并将一个字符串保存在result属性中，字符串中的每个字符表示一字节

&emsp;&emsp;readAsArrayBuffer(file或Blob)：读取File或Blob对象的内容，并将一个包含文件内容的ArrayBuffer保存在result属性中

&emsp;&emsp;注意：IE浏览器不支持readAsBinaryString()方法

&emsp;&emsp;这些读取文件的方法为灵活地处理文件数据提供了极大便利。例如，可以读取图像文件并将其保存为数据URI，以便将其显示给用户，或者为了解析方便，可以将文件读取为文本形式

【事件】

&emsp;&emsp;由于读取过程是异步的，因此FileReader也提供了几个事件

&emsp;&emsp;onabort：当读取操作被中止时调用

&emsp;&emsp;onerror：当读取操作发生错误时调用

&emsp;&emsp;onload：当读取操作成功完成时调用

&emsp;&emsp;onloadend：当读取操作完成时调用，不管是成功还是失败。该处理程序在onload或者onerror之后调用

&emsp;&emsp;onloadstart：当读取操作将要开始之前调用

&emsp;&emsp;onprogress：在读取数据过程中周期性调用

&emsp;&emsp;在正常情况下，读取文件时，首先触发loadstart事件，此时的readyState为1，result为空

&emsp;&emsp;接着，每过50ms左右，就会触发一次progress事件，通过事件对象可以获得与XHR的progress事件相同的信息(属性)：lengthComputable、loaded和total。另外，尽管可能没有包含全部数据，但每次progress事件中都可以通过FileReader的result属性读取到文件内容，readyState仍然是1

&emsp;&emsp;当文件读取完成时，触发load事件，此时的readyState为2，result为文件内容；如果发生了error事件，就不会发生load事件

<div>
<pre>&lt;input type="file" id="file1"&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
/*
[loadstart]readyState:1;result:
[progress]readyState:1;result:h3{color: #F44336;}
[load]readyState:2;result:h3{color: #F44336;}
[loadend]readyState:2;result:h3{color: #F44336;}
*/
file1.onchange = function(){
    var reader = new FileReader();
    reader.readAsText(file1.files[0]);
    reader.onloadstart = function(e){
        console.log('[loadstart]readyState:' + reader.readyState + ';result:' + reader.result);
    }
    reader.onload = function(e){
        console.log('[load]readyState:' + reader.readyState + ';result:' + reader.result);
    }
    reader.onloadend = function(e){
        console.log('[loadend]readyState:' + reader.readyState + ';result:' + reader.result);
    }
    reader.onprogress = function(e){
        console.log('[progress]readyState:' + reader.readyState + ';result:' + reader.result);
    }
}
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;由于种种原因无法读取文件，就会触发error事件。触发error事件时，相关的信息将保存到FileReader的error属性中。这个属性中将保存一个对象，该对象只有一个属性code，即错误码。这个错误码是1表示未找到文件，是2表示安全性错误，是3表示读取中断，是4表示文件不可读，是5表示编码错误

<div>
<pre>reader.onerror = function(){
    output.innerHTML = "Could not read file, error code is " + reader.error.code;
}; </pre>
</div>

&emsp;&emsp;如果想中断读取过程，可以调用abort()方法，这样就会触发abort事件

&emsp;&emsp;在触发load、error或abort事件后，会触发另一个事件loadend。loadend事件发生就意味着已经读取完整个文件，或者读取时发生了错误，或者读取过程被中断

&nbsp;

### 缩略图

&emsp;&emsp;使用FileReader对象的readAsDataURL()方法完成对文件的读取，再通过File对象的type属性筛选出图片

<div>
<pre>&lt;img id="uploadPreview" style="width: 100px; height: 100px;" src="data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%3F%3E%0A%3Csvg%20width%3D%22153%22%20height%3D%22153%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%20%3Cg%3E%0A%20%20%3Ctitle%3ENo%20image%3C/title%3E%0A%20%20%3Crect%20id%3D%22externRect%22%20height%3D%22150%22%20width%3D%22150%22%20y%3D%221.5%22%20x%3D%221.500024%22%20stroke-width%3D%223%22%20stroke%3D%22%23666666%22%20fill%3D%22%23e1e1e1%22/%3E%0A%20%20%3Ctext%20transform%3D%22matrix%286.66667%2C%200%2C%200%2C%206.66667%2C%20-960.5%2C%20-1099.33%29%22%20xml%3Aspace%3D%22preserve%22%20text-anchor%3D%22middle%22%20font-family%3D%22Fantasy%22%20font-size%3D%2214%22%20id%3D%22questionMark%22%20y%3D%22181.249569%22%20x%3D%22155.549819%22%20stroke-width%3D%220%22%20stroke%3D%22%23666666%22%20fill%3D%22%23000000%22%3E%3F%3C/text%3E%0A%20%3C/g%3E%0A%3C/svg%3E" alt="Image preview" /&gt;
&lt;input type="file" id="file1" style="display:none"&gt;
&lt;button id="btn"&gt;选择图片&lt;/button&gt;
&lt;span id="msgName"&gt;&lt;/span&gt;
&lt;script&gt;
btn.onclick = function(){
    file1.click();
}
file1.onchange = function(){
    var file = file1.files[0];
    //如果一个文件被选中
    if(file){
        //一张图片被选中
        if (/image/.test(file.type)){
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(){
                uploadPreview.src = reader.result;
                msgName.innerHTML = file.name;
            }
        //其他格式文件被选中
        } else {
            alert("You must select a valid image file!");
        }                
    }    
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/js/file/f3.html" frameborder="0" width="320" height="240"></iframe>

### Blob URL

&emsp;&emsp;使用[Blob URL](http://www.cnblogs.com/xiaohuochai/p/6535130.html#anchor5)，也可以用来显示缩略图

<div>
<pre>&lt;input id="file1" type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/x-icon"  style="display:none"&gt;
&lt;button id="btn"&gt;选择图片&lt;/button&gt;
&lt;div id="fileList"&gt;&lt;/div&gt;
&lt;script&gt;
btn.onclick = function(){file1.click();}
//保存图片的名称
var dataArr = [];
file1.onchange = function(){
    var file = file1.files[0];
    //如果一个文件被选中
    if(file){
        var name = file.name;
        var id = name.split('.').join('_');
        //检测图片是否已经被存储过
        if(dataArr.indexOf(id) &gt; -1){
            //将保存过的图片转移到最下方
            fileList.appendChild(document.getElementById(id));
        }else{
            if(/image/.test(file.type)){
                dataArr.push(id);
                var img = document.createElement('img');
                img.onload = function(){
                    URL.revokeObjectURL(img.src);
                }
                img.src= URL.createObjectURL(file);
                img.height = 60;
                var oDiv = document.createElement('div');
                oDiv.id = id;
                var oSpan = document.createElement('span');
                oSpan.innerHTML = name + ":" + file.size + " bytes";
                oDiv.appendChild(img);
                oDiv.appendChild(oSpan);
                fileList.appendChild(oDiv);                
            }
        }
    }    
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/js/file/f4.html" frameborder="0" width="320" height="240"></iframe>

### 文件内容

&emsp;&emsp;readAsText()可以以字符串形式读取并显示文件内容

<div>
<pre>&lt;input id="file1" type="file"  style="display:none"&gt;
&lt;button id="btn"&gt;选择文件&lt;/button&gt;
&lt;div id="fileData" style="border:1px solid black;width:300px;overflow:auto"&gt;&lt;/div&gt;
&lt;script&gt;
btn.onclick = function(){file1.click();}
file1.onchange = function(){
    var file = file1.files[0];
    //如果一个文件被选中
    if(file){
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(){
            fileData.innerHTML = reader.result;
        }
    }         
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/js/file/f5.html" frameborder="0" width="320" height="240"></iframe>

### 拖放选择

&emsp;&emsp;围绕读取文件信息，结合使用HTML5拖放API和文件API，能够创造出令人瞩目的用户界面：在页面上创建了自定义的放置目标之后，你可以从桌面上把文件拖放到该目标。与拖放一张图片或者一个链接类似，从桌面上把文件拖放到浏览器中也会触发drop事件。而且可以在event.dataTransfer.files中读取到被放置的文件，当然此时它是一个File对象，与通过文件输入字段取得的File对象一样

&emsp;&emsp;注意：IE9-浏览器不支持event.dataTransfer

&emsp;&emsp;从电脑上选择一个图片文件，并拖放到网页中指定区域，图片缩略图将显示到网页上

<div>
<pre>&lt;div id="targetArea" style="height:50px;line-height:50px;width:210px;background:lightblue;"&gt;请将图片文件拖放到该区域内&lt;/div&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
function addEvent(target,type,handler){
    if(target.addEventListener){
        target.addEventListener(type,handler,false);
    }else{
        target.attachEvent('on'+type,function(event){
            return handler.call(target,event);
        });
    }
}
function preventDefault(e){
    e = e || event;
    if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }
}
addEvent(document,'dragover',preventDefault);
addEvent(document,'drop',preventDefault);
addEvent(targetArea,'dragenter',preventDefault);
addEvent(targetArea,'dragover',preventDefault);
addEvent(targetArea,'dragleave',preventDefault);
addEvent(targetArea,'drop',preventDefault);
targetArea.ondragenter = function(e){this.style.outline = "1px solid black";}
targetArea.ondragleave = function(e){this.style.outline = "";}
targetArea.ondrop = function(e){
    e = e || event;
    this.style.outline = "";
    var file = e.dataTransfer.files[0];
    if(file){
        //一张图片被选中
        if (/image/.test(file.type)){
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(){
                var oDiv = document.createElement('div');
                oDiv.id = file.name.split('.').join('_')
                var img = new Image();
                img.src = reader.result;
                img.height = 60;
                var oName = document.createElement('span');
                oName.innerHTML = file.name;
                var oDel = document.createElement('button');
                oDel.innerHTML = '删除';
                oDel.onclick = function(){
                    result.removeChild(oDiv);
                }               
                oDiv.appendChild(img);
                oDiv.appendChild(oName);
                oDiv.appendChild(oDel);
                result.appendChild(oDiv);
            }
        //其他格式文件被选中
        } else {
            alert("You must select a valid image file!");
        }          
    }
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/js/file/f6.html" frameborder="0" width="320" height="240"></iframe>

### 文件进度

&emsp;&emsp;使用onprogress事件的loaded和total属性，可以实现文件进度显示

<div>
<pre>&lt;input id="file1" type="file"  style="display:none"&gt;
&lt;button id="btn"&gt;选择文件&lt;/button&gt;
&lt;div id="fileData"&gt;&lt;/div&gt;
&lt;script&gt;
btn.onclick = function(){file1.click();}
file1.onchange = function(){
    var file = file1.files[0];
    //如果一个文件被选中
    if(file){
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onprogress = function(e){
            e = e || event;
            fileData.innerHTML = '文件进度为：' + e.loaded + '/' + e.total;
        }
    }         
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/js/file/f7.html" frameborder="0" width="320" height="240"></iframe>

### 文件上传

方法一：使用表单提交实现文件上传

&emsp;&emsp;文件上传最基本的方法是使用HTML表单选择本地文件进行上传，在form表单中通过&lt;input type="file"&gt;标记选择本地文件。并且，必须在&lt;form&gt;元素中将enctype设置为"multipart/form-data"，将method设置为"post"

&emsp;&emsp;另外，需要在&lt;form&gt;表单中设置一个hidden类型的input框，其中name值为MAX_FILE_SIZE的隐藏值域，通过设置其value值限制上传文件的大小

<div>
<pre>&lt;form action="pp.php" method="post" enctype="multipart/form-data"&gt;
    &lt;input type="hidden" name="MAX_FILE_SIZE" value="1000000"&gt;
    &lt;input type="file" name="file1"&gt;
    &lt;button&gt;上传文件&lt;/button&gt;
&lt;/form&gt;</pre>
</div>

方法二：使用FormData实现文件上传

&emsp;&emsp;创建一个FormData()对象，通过它调用append()方法并传入相应的File对象作为参数。然后，再把FormData对象传递给XHR的send()方法

&emsp;&emsp;注意：IE9-浏览器不支持使用FormData()上传文件

<div>
<pre>&lt;input type="file" name="file1" id="file1"&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
var oFile = document.getElementById('file1');
oFile.onchange = function(e){
    //创建xhr对象
    var xhr;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    };
    var data = new FormData();
    data.append('file',oFile.files[0])
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
    xhr.open('post','pp.php',true);
    xhr.send(data);
}
&lt;/script&gt;</pre>
</div>

方法三：使用File API实现文件上传

&emsp;&emsp;通过File API传送二进制文件

&emsp;&emsp;注意：IE9-浏览器不支持

<div>
<pre>&lt;input type="file" name="file1" id="file1"&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
var oFile = document.getElementById('file1');
oFile.onchange = function(e){
    //创建xhr对象
    var xhr;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    };
    var data = oFile.files[0];
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
    xhr.open('post','pp.php',true);
    xhr.setRequestHeader("content-type",data.type);
    xhr.send(data);
}
&lt;/script&gt;</pre>
</div>
<div>
<pre>&lt;?php
$file = 'photo/test1.jpg';
touch($file);
function binary_to_file($file){
    $content = $GLOBALS['HTTP_RAW_POST_DATA'];  // 需要php.ini设置
    if(empty($content)){
        $content = file_get_contents('php://input'); //不需要php.ini设置，内存压力小
    }
    $ret = file_put_contents($file, $content, true);
    return $ret;
};echo '文件上传成功!';
?&gt;</pre>
</div>

&nbsp;

### 删除文件

&emsp;&emsp;最后，提一个小知识点，使用&lt;input type="file&gt;控件选择文件后，如何删除文件呢？一般地，有两种方法。一种是使用form表单的reset()方法，重置表单；另一种是将&lt;input type="file&gt;控件的value值置空，但第二种方法IE10-浏览器不支持

<div>
<pre>&lt;form id="myForm"&gt;
  &lt;input type="file" id="myFile"&gt;
&lt;/form&gt;
&lt;button id="btn1"&gt;删除文件方法1&lt;/button&gt;
&lt;button id="btn2"&gt;删除文件方法2&lt;/button&gt;
&lt;script&gt;
var myFile = document.getElementById('myFile');
var myForm = document.getElementById('myForm');
btn1.onclick = function(){
  myFile.value = '';
}
btn2.onclick = function(){
  myForm.reset();
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 90px;" src="https://demo.xiaohuochai.site/js/file/f8.html" frameborder="0" width="320" height="240"></iframe>

