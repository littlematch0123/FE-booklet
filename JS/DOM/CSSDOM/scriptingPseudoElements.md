# 深入理解脚本化CSS系列第六篇——脚本化伪元素的6种方法

&emsp;&emsp;我们可以通过[计算样式](http://www.cnblogs.com/xiaohuochai/p/5838686.html)来读取[伪元素](http://www.cnblogs.com/xiaohuochai/p/5021121.html)的样式信息，但是却无法使用javascript来直接操作伪元素，本文以一个需求解决为例，详细介绍脚本化伪元素的6种方法

**需求说明**

&emsp;&emsp;【1】为id=box的div元素添加content="前缀"的:before伪元素

&emsp;&emsp;【2】为已经添加:before伪元素的div元素删除伪元素

&emsp;&emsp;注意：由于IE7-浏览器不支持:before伪元素，所以该需求兼容到IE8

&nbsp;

## 添加伪元素

### 动态样式

&emsp;&emsp;可以采用[动态样式](http://www.cnblogs.com/xiaohuochai/p/5851203.html)的方法，动态生成&lt;style&gt;标签及相关的伪元素样式内容

&emsp;&emsp;由于IE8-浏览器将&lt;style&gt;标签当作特殊的节点，不允许访问其子节点及设置[innerHTML](http://www.cnblogs.com/xiaohuochai/p/5823716.html#anchor1)属性，需要使用[CSSStyleSheet对象](http://www.cnblogs.com/xiaohuochai/p/5848335.html#anchor1)的cssText属性来实现兼容

<div>
<pre>&lt;div id="box"&gt;测试文字&lt;/div&gt;
&lt;button id="btn"&gt;添加伪元素&lt;/button&gt;
&lt;script&gt;
//添加伪元素
function loadStyles(str){
    //设置标记，防止重复添加
    loadStyles.mark = 'load';
    var style = document.createElement("style");
    style.type = "text/css";
    try{
        style.innerHTML = str;
    }catch(ex){
        //IE8-浏览器兼容
        style.styleSheet.cssText = str;
    }
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(style); 
}
btn.onclick = function(){
    //当样式表没有添加过时，添加
    if(loadStyles.mark != 'load'){
        loadStyles("#box:before{content:'前缀';color: red;}");        
    }
}
&lt;/script&gt;        </pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/js/scriptingPseudoElements/s1.html" frameborder="0" width="320" height="240"></iframe>

### 添加自带伪元素的类名

&emsp;&emsp;在处理大量CSS样式时，一般采用[脚本化CSS类](http://www.cnblogs.com/xiaohuochai/p/5847994.html)的方法。而添加伪元素，也可以使用类似的技术。把伪元素的样式挂在一个新类名上，然后把元素的className设置为新类名

<div>
<pre>&lt;style&gt;
.add:before{content: "前缀";color: blue;}    
&lt;/style&gt;
&lt;div id="box"&gt;测试文字&lt;/div&gt;
&lt;button id="btn"&gt;添加伪元素&lt;/button&gt;
&lt;script&gt;
btn.onclick = function(){
    box.className = 'add';
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/js/scriptingPseudoElements/s2.html" frameborder="0" width="320" height="240"></iframe>

### 利用setAttribute()方法实现自定义伪元素内容

&emsp;&emsp;若使用方法二，无法自定义伪元素的内容，拓展性不高

&emsp;&emsp;伪元素的content属性非常强大，它的值可以有以下选择，关于content属性的详细信息[移步至此](http://www.cnblogs.com/xiaohuochai/p/5021121.html#anchor3)

<div>
<pre>content:&lt;string&gt;|&lt;uri&gt;|attr(&lt;identifier&gt;)</pre>
</div>

&emsp;&emsp;使用content属性中的attr()值配合setAttribute()方法就可以实现自定义伪元素的内容

&emsp;&emsp;IE8-浏览器需要在元素特性中出现data-beforeData(设置为空字符串即可)，才有效果；其他浏览器无此问题

<div>
<pre>&lt;style&gt;
#box:before{content: attr(data-beforeData);color: red;}
&lt;/style&gt;
&lt;!--为了兼容IE8-，需要在元素特性中设置 data-beforeData=""--&gt;
&lt;div id="box"  data-beforeData=""&gt;测试文字&lt;/div&gt;
&lt;button id="btn"&gt;添加伪元素&lt;/button&gt;
&lt;script&gt;
btn.onclick = function(){
    box.setAttribute('data-beforeData','前缀');
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/js/scriptingPseudoElements/s3.html" frameborder="0" width="320" height="240"></iframe>

**dataset**

&emsp;&emsp;HTML5新增了[dateset数据集](http://www.cnblogs.com/xiaohuochai/p/5817608.html#anchor5)特性，将元素特性和对象属性联系在了一起

&emsp;&emsp;注意：IE10-浏览器不支持

&emsp;&emsp;如果不考虑兼容，同样可以实现dateset来实现，但是由于dataset的解释规则，元素特性的值不可以出现大写，需要进行局部修改

&emsp;&emsp;经测试，IE11浏览器不支持使用dateset动态修改伪元素

<div>
<pre>&lt;style&gt;
#box:before{content: attr(data-before);color: red;}
&lt;/style&gt;
&lt;div id="box"&gt;测试文字&lt;/div&gt;
&lt;button id="btn"&gt;添加伪元素&lt;/button&gt;
&lt;script&gt;
btn.onclick = function(){
    box.dataset.before = '前缀';
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/js/scriptingPseudoElements/s4.html" frameborder="0" width="320" height="240"></iframe>

### 通过CSSRule对象添加样式

&emsp;&emsp;虽然伪元素的样式无法通过操作[行间样式](http://www.cnblogs.com/xiaohuochai/p/5837478.html)来直接添加，但是可以通过CSSRule对象通过操作内部样式表实现

&emsp;&emsp;如果存在内部样式表，即存在&lt;style&gt;标签，则直接在&lt;style&gt;标签中添加样式；否则先新建&lt;style&gt;标签，再添加样式

<div>
<pre>&lt;div id="box"&gt;测试文字&lt;/div&gt;
&lt;button id="btn"&gt;添加伪元素&lt;/button&gt;
&lt;script&gt;
//作为存在&lt;style&gt;标签的标记，1表示存在，0表示不存在
var mark = 0;
var tags = document.getElementsByTagName('*');
function addStyle(obj){
    var str = '#box:before{content:"前缀";color: pink;}';
    var sheet = obj.sheet || obj.styleSheet;
    var rules = sheet.cssRules|| sheet.rules;
    for(var i = 0,len = rules.length; i &lt; len; i++){
        //如果已经设置了:before伪元素的样式，就不再重复添加
        if(/:before/.test(rules[i].selectorText)){
            //obj.mark表示是否设置了:before伪元素的样式，1为已设置，0为未设置
            obj.mark = 1;
            break;
        }
    }
    //如果未设置伪元素样式
    if(!obj.mark){
        if(sheet.insertRule){
            sheet.insertRule('#box:before{content:"前缀";color:green;}',0);
        }else{
            sheet.addRule('#box:before','content:"前缀";color:green;',0);
        }
    }
}
btn.onclick = function(){
    for(var i = 0; i &lt; tags.length; i++){
        if(tags[i].nodeName == 'STYLE'){
            mark = 1;
            //添加伪元素
            addStyle(tags[i]);
            break;
        }
    }
    if(!mark){
        //新建&lt;style&gt;标签
        var ele = document.createElement('style');
        document.getElementsByTagName('head')[0].appendChild(ele);
        //添加伪元素
        addStyle(ele);
    }    
}
&lt;/script&gt;    </pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/js/scriptingPseudoElements/s5.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

## 删除伪元素

&emsp;&emsp;相比于新增伪元素来说，删除伪元素要困难一些。因为&lt;style&gt;元素中可能还有许多其他的样式，所以只能通过覆盖或删除指定样式来实现

### 空样式覆盖

&emsp;&emsp;使用优先级更高的:before伪元素的空样式来覆盖原有样式

<div>
<pre>&lt;style&gt;
#box:before{content:"前缀";color:green;}    
.remove:before{content:""!important;}
&lt;/style&gt;
&lt;div id="box"&gt;测试文字&lt;/div&gt;
&lt;button id="btn"&gt;删除伪元素&lt;/button&gt;
&lt;script&gt;
btn.onclick = function(){
    box.className = 'remove';    
}
&lt;/script&gt;    </pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/js/scriptingPseudoElements/s6.html" frameborder="0" width="320" height="240"></iframe>

### 通过CSSRule对象删除指定

&emsp;&emsp;通过selectorText找出CSSRule对象中的:before伪元素的CSS规则

&emsp;&emsp;注意：在IE8浏览器中，:before伪元素选择器文本会自动将冒号置为单冒号，而其他浏览器会自动将冒号置为双冒号

&emsp;&emsp;然后使用deleteRule()方法或removeRule()方法删除指定样式

<div>
<pre>&lt;style&gt;
#box::before{content:"前缀";color:green;}    
&lt;/style&gt;
&lt;div id="box"&gt;测试文字&lt;/div&gt;
&lt;button id="btn"&gt;删除伪元素&lt;/button&gt;
&lt;script&gt;
function deleteStyles(){
    var sheet = document.styleSheets[0];
    var rules = sheet.cssRules || sheet.rules;
    for(var i = 0; i &lt; rules.length; i++){
        //找出伪元素
        if(/#box:(:)?before/.test(rules[i].selectorText)){
            if(sheet.deleteRule){
                sheet.deleteRule(i);
            //兼容IE8-浏览器
            }else{
                sheet.removeRule(i);
            }    
        }
    }
}
btn.onclick = function(){
    deleteStyles();    
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/js/scriptingPseudoElements/s7.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

## 最后

&emsp;&emsp;脚本化CSS系列终于完结了，基本上把使用javascript操作CSS的内容都囊括了

&emsp;&emsp;【1】[脚本化行间样式](http://www.cnblogs.com/xiaohuochai/p/5837478.html)

&emsp;&emsp;【2】[查询计算样式](http://www.cnblogs.com/xiaohuochai/p/5838686.html)

&emsp;&emsp;【3】[脚本化CSS类](http://www.cnblogs.com/xiaohuochai/p/5847994.html)

&emsp;&emsp;【4】[脚本化样式表](http://www.cnblogs.com/xiaohuochai/p/5848335.html)

&emsp;&emsp;【5】[动态样式](http://www.cnblogs.com/xiaohuochai/p/5851203.html)

&emsp;&emsp;【6】[脚本化伪元素](http://www.cnblogs.com/xiaohuochai/p/5851807.html)

&emsp;&emsp;欢迎交流

