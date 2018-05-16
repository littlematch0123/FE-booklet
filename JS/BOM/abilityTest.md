# 客户端检测之能力检测

&emsp;&emsp;浏览器提供商虽然在实现公共接口方面投入了很多精力，但结果仍然是每一种浏览器都有各自的长处，也都有各自的缺点。迄今为止，客户端检测仍然是Web开发领域中一个饱受争议的话题。一谈到这个话题，人们总会不约而同地提到浏览器应该支持一组最常用的公共功能。但是，在现实当中，浏览器之间的差异以及不同浏览器的&ldquo;怪癖&rdquo;(quirk)多得简直不胜枚举

&emsp;&emsp;检测Web客户端的手段很多，而且各有利弊。但不到万不得已，就不要使用客户端检测。只要能找到更通用的方法，就应该优先采用更通用的方法。最常用也最为人们广泛接受的客户端检测形式是能力检测(又称特性检测)。本文将详细介绍客户端检测之能力检测

&nbsp;

### 定义

&emsp;&emsp;能力检测的目标不是识别特定的浏览器，而是识别浏览器的能力。能力检测的基本模式如下：

<div>
<pre>if(Object.propertyInQuestion){
    //使用Object.propertyInQuestion
}</pre>
</div>

【注意事项】

&emsp;&emsp;使用能力检测时，要注意不应仅仅检测该特性是否存在。以检测sort排序为例

<div>
<pre>function isSortable(object){
    return !!object.sort;
}</pre>
</div>

&emsp;&emsp;上面这个函数通过检测对象是否存在sort()方法，来确定对象是否支持排序。但问题是任何包含sort属性的对象也会返回true

<div>
<pre>var result = isSortable({sort:true});</pre>
</div>

&emsp;&emsp;检测某个属性是否存在并不能确定对象是否支持排序，更好的方式是检测sort是不是一个函数

<div>
<pre>function isSortable(object){
    return typeof object.sort == "function";
}   </pre>
</div>

&emsp;&emsp;上面的typeof操作符用于确定sort的确是一个函数，因此可以调用它对数据进行排序

【BUG】

&emsp;&emsp;在IE中typeof xhr.open会返回"unknown"

<div>
<pre>if(window.ActiveXObject){
    var xhr = new ActiveXObject("Microsoft.XMLHttp");
    alert(typeof xhr.open)    
}</pre>
</div>

&emsp;&emsp;于是，在浏览器环境下测试任何对象的某个特性是否存在使用下面这个函数

<div>
<pre>function isHostMethod(object,property){
    var t = typeof object[property];
    return t == "function" || (!!(t == "object" &amp;&amp; object[property])) || t== "unknown";
}   </pre>
</div>

&emsp;&emsp;接下来，将针对不同浏览器的能力检测分别说明

&nbsp;

### 单版本IE

&emsp;&emsp;如果要通过能力检测识别出单独的某一版本IE浏览器，[document](http://www.cnblogs.com/xiaohuochai/p/5821803.html).documentMode属性无疑非常合适。该属性只有IE浏览器支持，表示当前的文档模式&nbsp;

<div>
<pre>    //IE11返回11，IE10返回10，IE9返回9，IE8返回8，IE7返回7，IE6返回6
    console.log(document.documentMode);</pre>
</div>
<div>
<pre>    function isIE6(){
        return document.documentMode == 6;
    }</pre>
</div>

&emsp;&emsp;同样地，也可以识别出低版本IE，如IE7-浏览器

<div>
<pre>    function lteIE7(){
        return document.documentMode &lt;= 7;
    }</pre>
</div>

&nbsp;

### IE7-

&emsp;&emsp;除了使用document.documentMode属性外，还有其他方法

&emsp;&emsp;【1】IE7-浏览器中，获取[特性节点](http://www.cnblogs.com/xiaohuochai/p/5820076.html)将获得包括内置特性的所有特性，第0个特性节点是onmsanimationiteration，且其specified属性是false。而IE8+及其他浏览器仅仅可以获得经过设置的特性节点，且specified属性永远是true

<div>
<pre>function lteIE7(){
    var div = document.createElement('div');
    var temp = div.attributes[0];
    return (Boolean(temp) &amp;&amp; !temp.specified);
}</pre>
</div>

&emsp;&emsp;【2】IE7-浏览器不支持[querySelector()](http://www.cnblogs.com/xiaohuochai/p/5798014.html)和querySelectorAll()

<div>
<pre>function lteIE7(){
    var temp = typeof document.querySelector;
    if(temp == 'undefined'){
        return true;
    }
}</pre>
</div>

&emsp;&emsp;【3】IE7-浏览器不支持[JSON对象](http://www.cnblogs.com/xiaohuochai/p/5887754.html)

<div>
<pre>function lteIE7(){
    try{
        JSON;
    }catch(error){
        return true;
    }    
}</pre>
</div>

&nbsp;

### IE8-

&emsp;&emsp;【1】IE8-浏览器不支持[getComputedStyle()方法](http://www.cnblogs.com/xiaohuochai/p/5838686.html)，该方法是一组在显示元素时实际使用的属性值，用一个 CSSStyleDeclaration对象来表示的

<div>
<pre>function lteIE8(){
    var temp = typeof window.getComputedStyle;
    if(temp == 'undefined'){
        return true;
    }
}</pre>
</div>

&emsp;&emsp;【2】IE8-浏览器不支持[文档类型节点](http://www.cnblogs.com/xiaohuochai/p/5815801.html#anchor2)的快捷写法document.doctype

<div>
<pre>function lteIE8(){
    var temp = document.doctype;
    if(temp == null){
        return true;
    }
}</pre>
</div>

&emsp;&emsp;【3】IE8-的宿主对象是通过COM而非javascript实现的。因此，document.createElement()函数是一个COM对象，所以typeof才会返回"Object"

<div>
<pre>function lteIE8(){
    var temp = typeof document.createElement
    if(temp == "object"){
        return true;
    }
}</pre>
</div>

&nbsp;

### IE9-

&emsp;&emsp;【1】IE9-浏览器不支持HTML5新增的定时器[requestAnimationFrame](http://www.cnblogs.com/xiaohuochai/p/5777186.html)

<div>
<pre>function lteIE9(){
    try{
        requestAnimationFrame;
    }catch(error){
        return true;
    }    
}</pre>
</div>

&emsp;&emsp;【2】[async属性](http://www.cnblogs.com/xiaohuochai/p/6214015.html#anchor7)是HTML5新增的属性，IE9-浏览器不支持

<div>
<pre>function lteIE9(){
    var temp = document.createElement('script');
    if(!temp.async){
        return true;
    }
}</pre>
</div>

&emsp;&emsp;【3】window.matchMedia()方法用来检查CSS的[mediaQuery语句](http://www.cnblogs.com/xiaohuochai/p/5848612.html#anchor4)，IE9-浏览器不支持

<div>
<pre>function lteIE9(){
    var temp = window.matchMedia;
    if(!temp){
        return true;
    }
}</pre>
</div>

&nbsp;

### IE10-

&emsp;&emsp;【1】IE10-浏览器不支持[自定义属性dataset](http://www.cnblogs.com/xiaohuochai/p/5817608.html#anchor5)

<div>
<pre>function lteIE10(){
    var temp = document.createElement('div').dataset;
    if(!temp){
        return true;
    }
}</pre>
</div>

&emsp;&emsp;【2】IE10-浏览器不支持[navigator对象](http://www.cnblogs.com/xiaohuochai/p/6380737.html)的language属性

<div>
<pre>function lteIE10(){
    var temp = navigator.language;
    if(!temp){
        return true;
    }
}</pre>
</div>

&emsp;&emsp;【3】IE10-浏览器不支持navigator对象的product属性

<div>
<pre>function lteIE10(){
    var temp = navigator.product;
    if(!temp){
        return true;
    }
}</pre>
</div>

&nbsp;

### chrome

&emsp;&emsp;chrome浏览器在window对象下有一个专有的chrome属性，返回一个对象

<div>
<pre>function isChrome(){
    if(window.chrome){
        return true;
    }
}</pre>
</div>
