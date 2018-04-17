# 表单美化

&emsp;&emsp;由于一些系统原生的表单控件在各个浏览器中显示效果不一致，且无法设置某些关键CSS样式，为了保证表单在各浏览器中的兼容性，表单美化就是不得不做的一件事了

&nbsp;

### 单选按钮

【实现效果】

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/html/beauty/b1.html" frameborder="0" width="320" height="240"></iframe>

【实现过程】

<div>
<pre>body{
    margin: 0;
    font: 16px/20px "宋体";
}
.box{
    width: 500px;
    height: 100px;
    line-height: 100px;
    margin: 0 auto;
    border: 1px solid black;
    text-align: center;
}
.box label{
    position:relative;
    padding-left: 20px;
}
.box input{
    visibility: hidden;
}    
.box i{
    position: absolute;
    top: -2px;
    left: -2px;
    height: 19px;
    width: 19px;
    background: url('https://demo.xiaohuochai.site/radiobutton.gif') no-repeat -14px -18px;
}
.box label:hover{
    color: red;
}
.box label:hover i{
    background-position: -14px -118px;
}
.box label.selected i{
    background-position: -14px -218px;
}</pre>
</div>
<div>
<pre>&lt;div class="box" id="box"&gt;https://demo.xiaohuochai.site
    选择一项游戏方式：
    &lt;label for="xiu"&gt;&lt;i&gt;&lt;/i&gt;咻一咻&lt;/label&gt;
    &lt;input id="xiu" type="radio" value="咻一咻"&gt;
    &lt;label for="yao"&gt;&lt;i&gt;&lt;/i&gt;摇一摇&lt;/label&gt;
    &lt;input id="yao" type="radio" value="摇一摇"&gt;
    &lt;label for="niu"&gt;&lt;i&gt;&lt;/i&gt;扭一扭&lt;/label&gt;
    &lt;input id="niu" type="radio" value="扭一扭"&gt;
&lt;/div&gt;
&lt;script&gt;
var oBox = document.getElementById('box');
var aLabel = oBox.getElementsByTagName('label');
for(var i = 0, leni = aLabel.length; i &lt; leni; i++){
    aLabel[i].onclick = function(){
        for(var j = 0,lenj = aLabel.length; j &lt; lenj; j++){
            aLabel[j].removeAttribute('class');
        }
        this.className = 'selected';
    }
}
&lt;/script&gt;</pre>
</div>

&nbsp;

### 多选按钮

【实现效果】

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/html/beauty/b2.html" frameborder="0" width="320" height="240"></iframe>

【实现过程】

<div>
<pre>body{
    margin: 0;
    font: 16px/20px "宋体";
}
.box{
    width: 600px;
    height: 100px;
    line-height: 100px;
    margin: 0 auto;
    border: 1px solid black;
    text-align: center;
}
.box label{
    position:relative;
    padding-left: 20px;
}
.box input{
    visibility: hidden;
}    
.box i{
    position: absolute;
    top: -2px;
    left: -2px;
    height: 19px;
    width: 19px;
    background: url('https://demo.xiaohuochai.site/checkbox.gif') no-repeat -14px -18px;
}
.box label:hover{
    color: red;
}
.box label:hover i{
    background-position: -14px -118px;
}
.box label.selected i{
    background-position: -14px -218px;
}</pre>
</div>
<div>
<pre>&lt;div class="box" id="box"&gt;https://demo.xiaohuochai.site
    选择日常手机交易方式(可多选)：
    &lt;label for="a"&gt;&lt;i&gt;&lt;/i&gt;支付宝&lt;/label&gt;
    &lt;input id="a" type="radio" value="支付宝"&gt;
    &lt;label for="t"&gt;&lt;i&gt;&lt;/i&gt;微信&lt;/label&gt;
    &lt;input id="t" type="radio" value="微信"&gt;
    &lt;label for="b"&gt;&lt;i&gt;&lt;/i&gt;百度钱包&lt;/label&gt;
    &lt;input id="b" type="radio" value="百度钱包"&gt;
&lt;/div&gt;
&lt;script&gt;
var oBox = document.getElementById('box');
var aLabel = oBox.getElementsByTagName('label');
for(var i = 0, leni = aLabel.length; i &lt; leni; i++){
    aLabel[i].onclick = function(){
        if(!this.className){
            this.className = 'selected';
        }else{
            this.removeAttribute('class');
        }
    }
}
&lt;/script&gt;</pre>
</div>

&nbsp;

### 下拉列表

【实现效果】

<iframe style="width: 100%; height: 230px;" src="https://demo.xiaohuochai.site/html/beauty/b3.html" frameborder="0" width="320" height="240"></iframe>

【实现过程】

<div>
<pre>body{
    margin: 0;
    font: 16px/20px "宋体";
}
ul{
    margin: 0;
    padding: 0;
    list-style: none;
}
.box{
    width: 300px;
    height: 40px;
    margin: 0 auto;
    border: 1px solid black;
}
.box .show{
    background-color: red;
    line-height: 30px;
    padding: 5px;
}
.box .show-area{
    color: white;
    vertical-align: middle;
}
.box .show-select{
    position: relative;
    display: inline-block;
    vertical-align: middle;
    width: 200px;
    height: 28px;
    border: 1px solid #999;
    background-color: white;
    text-indent: 20px;
    cursor: pointer;
}
.box .show-selectAdd{
    color: #999;
}
.box .show-select i{
    position: absolute;
    height: 0;
    width: 0;
    top: 0;
    right: 0;
    margin-top: 12px;
    margin-right: 5px;
    border: 5px solid transparent;
    border-top-color: black;
}
.box .show-selectAdd i{
    border: 5px solid transparent;
    border-bottom-color: black;
    margin-top: 8px;
}
.box .list{
    border: 1px solid #dfdfdf;
    border-top: none;
    display: none;
}
.box .list-in{
    height: 30px;
    line-height: 30px;
    text-indent: 74px;
    border-bottom: 1px solid #dfdfdf;    
    cursor: pointer;
}
.box .list-in:hover{
    color: red;
}</pre>
</div>
<div>
<pre>&lt;div class="box" id="box"&gt;
    &lt;div class="show"&gt;
        &lt;strong class="show-area"&gt;地址:&lt;/strong&gt;
        &lt;span class="show-select"&gt;朝阳区&lt;i&gt;&lt;/i&gt;&lt;/span&gt;
    &lt;/div&gt;
    &lt;ul class="list"&gt;
        &lt;li class="list-in"&gt;朝阳区&lt;/li&gt;
        &lt;li class="list-in"&gt;海淀区&lt;/li&gt;
        &lt;li class="list-in"&gt;东城区&lt;/li&gt;
        &lt;li class="list-in"&gt;西城区&lt;/li&gt;
        &lt;li class="list-in"&gt;丰台区&lt;/li&gt;
        &lt;li class="list-in"&gt;石景山区&lt;/li&gt;
    &lt;/ul&gt;
&lt;/div&gt;
&lt;script&gt;
var oBox = document.getElementById('box');
var oDiv = oBox.getElementsByTagName('div')[0];
var oShow = oDiv.getElementsByTagName('span')[0];
var oUl = oBox.getElementsByTagName('ul')[0];
var aLi = oUl.getElementsByTagName('li');
//简单思路
//[1]点击oDiv时，默认文字为黑色，三角向上，变成文字为#999，三角向下；简化为增加一个show-selectAdd类名；oUl从隐藏变成显示
oDiv.onclick = function(e){
    //阻止冒泡
    e = e || event;
    if(e.stopPropagation){
        e.stopPropagation();
    }else{
        e.cancelBubble = true;
    }
    oShow.className = 'show-select show-selectAdd';
    oUl.style.display = 'block';
}
//[2]点击oUl的li时，oUl从隐藏变成显示，文字和三角恢复到黑色和向上的默认样式；并且文字内容变成当前点击的li的内容
for(var i = 0,len=aLi.length; i &lt; len;i++){
    aLi[i].onclick = function(){
        oShow.innerHTML = this.innerHTML + '&lt;i&gt;&lt;/i&gt;';
    }
}
//[3]点击box以外的其他部分时，oUl从隐藏变成显示，文字和三角恢复到黑色和向上的默认样式
document.onclick = function(){
    this.getElementsByTagName('span')[0].className = 'show-select';
    oUl.style.display = 'none';    
}
&lt;/script&gt;</pre>
</div>
