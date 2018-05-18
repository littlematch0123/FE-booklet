# jQuery样式操作

&emsp;&emsp;使用javascript脚本化CSS是一个系列，包括[行间样式](http://www.cnblogs.com/xiaohuochai/p/5837478.html)、[计算样式](http://www.cnblogs.com/xiaohuochai/p/5838686.html)、[CSS类](http://www.cnblogs.com/xiaohuochai/p/5847994.html)、[样式表](http://www.cnblogs.com/xiaohuochai/p/5848335.html)、[动态样式](http://www.cnblogs.com/xiaohuochai/p/5851203.html)和[伪元素](http://www.cnblogs.com/xiaohuochai/p/5851807.html)这六部分。而jQuery也实现了脚本化CSS的功能，提供了更为简单易用的方法

&nbsp;

### 设置样式

&emsp;&emsp;前面介绍过jQuery的特性操作，可以通过[attr()方法](http://www.cnblogs.com/xiaohuochai/p/5916009.html)进行样式设置

<div>
<pre>&lt;style&gt;
.cB{color: blue;}
&lt;/style&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="test"&gt;测试文字&lt;/div&gt;
&lt;button id="btn1"&gt;按钮&lt;/button&gt;
&lt;script&gt;
btn1.onclick = function(){
    $('#test').attr('class','cB')
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/attr/a1.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;注意：jQuery对象无法直接使用className属性设置类名，需要转换为javascript对象才可以使用

<div>
<pre>&lt;style&gt;
.cB{color: blue;}
&lt;/style&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="test"&gt;测试文字&lt;/div&gt;
&lt;button id="btn1"&gt;按钮&lt;/button&gt;
&lt;script&gt;
btn1.onclick = function(){
    $('#test')[0].className = 'cB';
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/attr/a2.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 增加样式

**addClass(className)**

&emsp;&emsp;addClass(className)方法为每个匹配元素增加一个或多个样式名，如果值已存在，则不添加　

<div>
<pre>&lt;style&gt;
.cB{color: blue;}
.bgO{background-color:orange;}
&lt;/style&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="test"&gt;测试文字&lt;/div&gt;
&lt;button id="btn1"&gt;按钮&lt;/button&gt;
&lt;script&gt;
btn1.onclick = function(){
    $('#test').addClass('cB bgO')
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/attr/a3.html" frameborder="0" width="320" height="240"></iframe>

addClass(function(index, currentClass))

&emsp;&emsp;addClass()方法可以接受一个函数作为参数，这个函数返回一个或更多用空格隔开的要增加的样式名。接收index参数表示元素在匹配集合中的索引位置和currentClass参数表示元素上原来的className。在函数中this指向匹配元素集合中的当前元素

<div>
<pre>&lt;style&gt;
.cB{color: blue;}
.bgO{background-color:orange;}
&lt;/style&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="test" class="cB"&gt;测试文字&lt;/div&gt;
&lt;button id="btn1"&gt;按钮&lt;/button&gt;
&lt;script&gt;
btn1.onclick = function(){
    $('#test').addClass(function(index,currentClass){
        alert('' + index + currentClass );//'0cB'
        return 'bgO';
    })
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/attr/a4.html" frameborder="0" width="320" height="240"></iframe>

### 删除样式

**removeClass()**

&emsp;&emsp;removeClass()方法不带参数时，将删除全部类名

<div>
<pre>&lt;style&gt;
.cB{color: blue;}
.bgO{background-color:orange;}
&lt;/style&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="test" class="cB bgO"&gt;测试文字&lt;/div&gt;
&lt;button id="btn1"&gt;按钮&lt;/button&gt;
&lt;script&gt;
btn1.onclick = function(){
    $('#test').removeClass();
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/attr/a5.html" frameborder="0" width="320" height="240"></iframe>

**removeClass([className])**

&emsp;&emsp;removeClass([className])方法用来删除参数中指定的一个或多个类名

<div>
<pre>&lt;style&gt;
.cB{color: blue;}
.bgO{background-color:orange;}
&lt;/style&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="test" class="cB bgO"&gt;测试文字&lt;/div&gt;
&lt;button id="btn1"&gt;按钮&lt;/button&gt;
&lt;script&gt;
btn1.onclick = function(){
    $('#test').removeClass('cB bgO');
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/attr/a6.html" frameborder="0" width="320" height="240"></iframe>

**removeClass(function(index, currentClass))**

&emsp;&emsp;removeClass()方法可以接收一个函数为参数，该函数返回一个或多个将要被移除的样式名。index参数表示在所有匹配元素的集合中当前元素的索引位置，currentClass参数表示原有的样式名

&emsp;&emsp;注意：由于class是保留字，所以形参名设置为class时，会导致错误

<div>
<pre>&lt;style&gt;
.cB{color: blue;}
.bgO{background-color:orange;}
&lt;/style&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="test" class="cB bgO"&gt;测试文字&lt;/div&gt;
&lt;button id="btn1"&gt;按钮&lt;/button&gt;
&lt;script&gt;
btn1.onclick = function(){
    $('#test').removeClass(function(index,currentClass){
        alert('' + index + currentClass);//0cB bgO
        return 'bgO';
    });
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/attr/a7.html" frameborder="0" width="320" height="240"></iframe>

### 切换样式

**toggleClass()**

&emsp;&emsp;在做某些效果的时候，可能会针对同一节点的某一个样式不断的切换，也就是addClass与removeClass的互斥切换，比如隔行换色效果

&emsp;&emsp;jQuery提供一个toggleClass()方法用于简化这种互斥的逻辑，通过toggleClass()方法动态添加删除Class，一次执行相当于addClass，再次执行相当于removeClass

&emsp;&emsp;toggleClass()有以下4种用法

【1】toggleClass()

&emsp;&emsp;当toggleClass()方法没有参数时，将删除或还原全部类名

<div>
<pre>&lt;style&gt;
.cB{color: blue;}
.bgO{background-color:orange;}
&lt;/style&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="test" class="cB bgO"&gt;测试文字&lt;/div&gt;
&lt;button id="btn1"&gt;按钮&lt;/button&gt;
&lt;script&gt;
btn1.onclick = function(){
    $('#test').toggleClass();
}
&lt;/script&gt;    </pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/attr/a8.html" frameborder="0" width="320" height="240"></iframe>

【2】toggleClass(className)

&emsp;&emsp;toggleClass(className)方法在匹配的元素集合中的每个元素上切换的一个或多个(用空格隔开)样式类名

<div>
<pre>&lt;style&gt;
.cB{color: blue;}
.bgO{background-color:orange;}
&lt;/style&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="test" class="cB bgO"&gt;测试文字&lt;/div&gt;
&lt;button id="btn1"&gt;按钮&lt;/button&gt;
&lt;script&gt;
btn1.onclick = function(){
    $('#test').toggleClass('bgO');
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/attr/a9.html" frameborder="0" width="320" height="240"></iframe>

【3】toggleClass(className,switch)

&emsp;&emsp;toggleClass()方法可以接收第二个参数switch，用来判断样式类是否应该被添加或删除。如果这个参数的值是true，那么这个样式类将被添加，相当于addClass；如果这个参数的值是false，那么这个样式类将被移除，相当于removeClass

<div>
<pre>$('#foo').toggleClass(className, addOrRemove);
//等价于
if (addOrRemove){
    $('#foo').addClass(className);
}else{
    $('#foo').removeClass(className);
}</pre>
</div>
<div>
<pre>&lt;style&gt;
.cB{color: blue;}
.bgO{background-color:orange;}
&lt;/style&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="test" class="cB bgO"&gt;测试文字&lt;/div&gt;
&lt;button id="btn1"&gt;添加&lt;/button&gt;
&lt;button id="btn2"&gt;删除&lt;/button&gt;
&lt;script&gt;
btn1.onclick = function(){$('#test').toggleClass('bgO',true);}
btn2.onclick = function(){$('#test').toggleClass('bgO',false);}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/attr/a10.html" frameborder="0" width="320" height="240"></iframe>

【4】toggleClass(function(index,currentClass,switcher)[,switch])

&emsp;&emsp;toggleClass()可以接收一个函数作为参数，该函数用来返回在匹配的元素集合中的每个元素上用来切换的样式类名，接收元素的索引位置和元素旧的样式类作为参数　

<div>
<pre>&lt;style&gt;
.cB{color: blue;}
.bgO{background-color:orange;}
&lt;/style&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="test" class="cB bgO"&gt;测试文字&lt;/div&gt;
&lt;button id="btn1"&gt;添加&lt;/button&gt;
&lt;button id="btn2"&gt;删除&lt;/button&gt;
&lt;button id="btn3"&gt;变更&lt;/button&gt;
&lt;script&gt;
btn1.onclick = function(){$('#test').toggleClass(function(index,currentClass,switcher){
    alert('' + index + currentClass + switcher)
    return 'bgO'
},true)};
btn2.onclick = function(){$('#test').toggleClass(function(index,currentClass,switcher){
    alert('' + index + currentClass + switcher)
    return 'bgO'
},false)};
btn3.onclick = function(){$('#test').toggleClass(function(index,currentClass,switcher){
    alert('' + index + currentClass + switcher)
    return 'bgO'
})};
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/attr/a11.html" frameborder="0" width="320" height="240"></iframe>

### 判断样式

**hasClass(className)**

&emsp;&emsp;hasClass(className)方法用于确定任何一个匹配元素是否有被分配给定的类名，如果有则返回true；否则，返回false

<div>
<pre>&lt;style&gt;
.cB{color: blue;}
.bgO{background-color:orange;}
&lt;/style&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="test" class="cB bgO"&gt;测试文字&lt;/div&gt;
&lt;button id="btn1"&gt;按钮&lt;/button&gt;
&lt;button id="btn2"&gt;是否存在指定样式&lt;/button&gt;
&lt;script&gt;
btn1.onclick = function(){$('#test').toggleClass('bgO');}
btn2.onclick = function(){alert($('#test').hasClass('bgO'))}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/attr/a12.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;注意：该方法实际是为了增强代码可读性产生的。在jQuery()内部实际上是调用了is()方法来完成这个功能的

&emsp;&emsp;在javascript中，HTML5为所有元素添加了classList属性，这个classList属性是新集合类型DOMTokenList的实例，它也有类似的方法

<div>
<pre>add(value)              将给定的字符串值添加到列表中，如果值已存在，则不添加
contains(value)         表示列表中是否存在给定的值，如果存在则返回true,否则返回false
remove(val，e)          从列表中删除给定的字符串
toggle(value)           如果列表中已经存在给定的值，删除它；如果列表中没有给定的值，添加它</pre>
</div>

&emsp;&emsp;由于IE9-浏览器不支持classList属性，也就不支持add()、contains()、remove()和toggle()这四个方法

&emsp;&emsp;关于classList属性的类似的4个方法及兼容写法的详细信息[移步至此](http://www.cnblogs.com/xiaohuochai/p/5797111.html#anchor2)

&nbsp;

### 样式操作

&emsp;&emsp;在javascript中，查询计算样式需要处理getComputedStyle()方法和currentStyle属性的兼容；设置行间样式需要对style属性赋值

&emsp;&emsp;而在jQuery中，使用CSS()方法就可以解决以上的问题

**【获取样式】**

**css(propertyName)**

&emsp;&emsp;css(propertyName)方法用来获取匹配元素集合中的第一个元素的样式属性的计算值。要注意的是，这里获取的是计算样式，即类似于原生javascript的getComputedStyle或currentStyle

<div>
<pre>&lt;style&gt;
div { width:60px; height:60px; margin:5px; float:left; }
&lt;/style&gt;
&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;span id="result"&gt;&lt;/span&gt;
&lt;div style="background-color:blue;"&gt;&lt;/div&gt;
&lt;div style="background-color:rgb(15,99,30);"&gt;&lt;/div&gt;
&lt;div style="background-color:#123456;"&gt;&lt;/div&gt;
&lt;div style="background-color:#f11;"&gt;&lt;/div&gt;
&lt;script&gt;
$("div").click(function () {
  $("#result").html("背景颜色是 " + $(this).css("background-color"));
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/jquery/attr/a13.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;注意：简写速写的CSS属性(如：margin,background,border)不支持

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="test" style="margin-top:10px;"&gt;测试文字&lt;/div&gt;
&lt;script&gt;
//chrome浏览器输出10px 0px 0px
//firefox和IE浏览器输出空字符串''
console.log( $('#test').css('margin'));
&lt;/script&gt;</pre>
</div>

**css(propertyNames)**

&emsp;&emsp;css(propertyNames)方法也可以接受一个或多个CSS属性组成的数组作为参数

&emsp;&emsp;从jQuery 1.9开始, 传递一个CSS的样式属性的数组给.css()将返回属性-值配对的对象

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="test" style="margin-top:10px;"&gt;测试文字&lt;/div&gt;
&lt;script&gt;
//{width: "1904px", height: "18px", font-size: "16px"}
console.log( $('#test').css(['width','height','font-size']));
&lt;/script&gt;</pre>
</div>

**【设置样式】**

**css(propertyName,value)**

&emsp;&emsp;可以通过css(propertyName,value)方法进行样式设置

&emsp;&emsp;注意：从jQuery1.6开始，css()接受类似于animate()的相对值。相对值时以+=或者-=开头的字符串，表示递增或递减当前的值。如果一个元素的左padding是10px，.css( "padding-left", "+=15" )将返回总的左padding为25px

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="test" style="width:100px;background-color:grey"&gt;测试文字&lt;/div&gt;
&lt;script&gt;
$('#test').mouseover(function(){
    $(this).css('color','red');
    $(this).css('width','+=100');
})
$('#test').mouseout(function(){
    $(this).css('color','green');
    $(this).css('width','-=100');
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/attr/a14.html" frameborder="0" width="320" height="240"></iframe>

**css(properties)**

&emsp;&emsp;css()方法设置样式时，允许以一个属性-值配对的对象作为参数

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="test" style="width:100px;background-color:grey"&gt;测试文字&lt;/div&gt;
&lt;script&gt;
$('#test').mouseover(function(){
    $(this).css({'color':'red','width':'+=100'});
})
$('#test').mouseout(function(){
    $(this).css({'color':'green','width':'-=100'});
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/attr/a15.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;注意：css()方法支持驼峰写法与中划线写法，内部做了容错的处理

&emsp;&emsp;在驼峰写法中，属性名可以不使用引号包裹；但是在中划线写法中，必须用引号包裹

<div>
<pre>.css({'background-color': '#ffe', 'border-left': '5px solid #ccc'}) 
//等价于
.css({backgroundColor: '#ffe', borderLeft: '5px solid #ccc'})</pre>
</div>

**css(propertyName,function(index, value))**

&emsp;&emsp;通过css()方法设置样式时，第二个参数可以是一个函数，this指向当前元素，index参数表示元素在匹配集合中的索引位置，html参数表示元素上原来的HTML内容。函数返回设置的值　

&emsp;&emsp;注意：当一个数只被作为值(value)的时候，jQuery会将其转换为一个字符串，并添在字符串的结尾处添加px，例如.css("width",50})与.css("width","50px"})一样

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="test" style="width:100px;background-color:grey"&gt;测试文字&lt;/div&gt;
&lt;script&gt;
$('#test').mouseover(function(){
    $(this).css({width:function(index ,value){
        return parseFloat(value) * 1.2;
    },color: 'red'
});
})
$('#test').mouseout(function(){
    $(this).css({width:function(index ,value){
        return parseFloat(value) / 1.2;
    },color: 'green'});
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/attr/a16.html" frameborder="0" width="320" height="240"></iframe>

**删除样式**

&emsp;&emsp;使用css()方法也可以删除样式，当css()方法的样式属性的值为空字符串时，会从元素上移除该样式(若该属性存在的话)

&emsp;&emsp;注意：IE8-浏览器中，删除的简写属性，如border或background将完全删除该元素样式，不管是在样式表或&lt;style&gt;元素中

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;style&gt;
div{border-left:3px solid black;}
&lt;/style&gt;
&lt;body&gt;
&lt;div id="test" style="border-left:3px solid green;"&gt;内容&lt;/div&gt;
&lt;script&gt;
$('#test').click(function(){
    $(this).css('border','');
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/attr/a17.html" frameborder="0" width="320" height="240"></iframe>