# 深入理解脚本化CSS系列第四篇——脚本化样式表

&emsp;&emsp;关于脚本化CSS，查询样式时，查询的是[计算样式](http://www.cnblogs.com/xiaohuochai/p/5838686.html)；设置单个样式时，设置的是[行间样式](http://www.cnblogs.com/xiaohuochai/p/5837478.html)；设置多个样式时，设置的是[CSS类名](http://www.cnblogs.com/xiaohuochai/p/5847994.html)。脚本化样式表当然也是一种脚本化CSS的技术，虽然不经常使用，但有时却非常有用。下面将详细介绍脚本化样式表的内容

![styleSheet](https://pic.xiaohuochai.site/blog/JS_DOM_CSSDOM_styleSheet.png)

&nbsp;

### CSSStyleSheet

&emsp;&emsp;CSSStyleSheet类型表示的是样式表。我们知道，[引入CSS](http://www.cnblogs.com/xiaohuochai/p/4842562.html)一共有3种方式，包括行间样式、内部样式和外部样式。其中，内部样式和外部样式分别通过&lt;style&gt;和&lt;link&gt;标签以样式表的形式引入，属于CSSStyleSheet类型

**styleSheet**

&emsp;&emsp;CSSStyleSheet对象只是一个类数组对象，它继承自Stylesheet

&emsp;&emsp;样式表CSSStyleSheet是通过document.styleSheets集合来表示的。通过集合的length属性可以获知样式表的数量，而通过方括号语法或item()方法可以访问毎一个样式表

<div>
<pre>&lt;style id="styleIn1"&gt;&lt;/style&gt;
&lt;script&gt;
console.log(document.styleSheets[0] instanceof StyleSheet);//true
console.log(document.styleSheets[0] instanceof CSSStyleSheet);//true
&lt;/script&gt;</pre>
</div>
<div>
<pre>&lt;style id="styleIn1"&gt;&lt;/style&gt;
&lt;link id="styleOut" rel="stylesheet" href="style.css"&gt;
&lt;style id="styleIn2"&gt;&lt;/style&gt;
&lt;script&gt;
console.log(document.styleSheets.length);//3
//CSSStyleSheet {ownerRule: null, cssRules: CSSRuleList, rules: CSSRuleList, type: "text/css", href: null&hellip;}
console.log(document.styleSheets[0]);
//CSSStyleSheet {ownerRule: null, cssRules: null, rules: null, type: "text/css", href: "file:///C:/inetpub/wwwroot/style.css"&hellip;}
console.log(document.styleSheets[1]);
&lt;/script&gt;</pre>
</div>

**引入**

&emsp;&emsp;除了使用document.styleSheets，还可以通过&lt;link&gt;或&lt;style&gt;元素的sheet属性，取得CSSStyleSheet对象

&emsp;&emsp;注意：IE8-浏览器不支持

<div>
<pre>&lt;style id="test"&gt;&lt;/style&gt;
&lt;script&gt;
//CSSStyleSheet {ownerRule: null, cssRules: CSSRuleList, rules: CSSRuleList, type: "text/css", href: null&hellip;}
console.log(test.sheet);
console.log(test.sheet=== document.styleSheets[0]);//true
&lt;/script&gt;    </pre>
</div>

&emsp;&emsp;IE10-浏览器支持&lt;link&gt;或&lt;style&gt;元素的styleSheet属性，来取得CSSStyleSheet对象

<div>
<pre>&lt;style id="test"&gt;&lt;/style&gt;
&lt;script&gt;
//[object CSSStyleSheet]
console.log(test.styleSheet);
&lt;/script&gt;</pre>
</div>

**兼容**　

<div>
<pre>function getSheet(element){
    return element.sheet || element.styleSheet;
}</pre>
</div>

**继承属性**

&emsp;&emsp;从Stylesheet接口继承而来的属性如下

【1】disabled

&emsp;&emsp;disabled表示样式表是否被禁用的布尔值。这个属性是可读/写的，将这个值设置为true可以禁用样式表

<div>
<pre>&lt;style id="styleIn1"&gt;
#test{background-color: red!important;}
&lt;/style&gt;
&lt;div id="test" style="width: 100px;height: 100px;background-color: black;"&gt;&lt;/div&gt;
&lt;button id="btn1"&gt;变色&lt;/button&gt;
&lt;script&gt;
btn1.onclick = function(){
    document.styleSheets[0].disabled = !document.styleSheets[0].disabled;
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/js/stylesheets/s1.html" frameborder="0" width="320" height="240"></iframe>

【2】href

&emsp;&emsp;如果样式表是通过&lt;link&gt;包含的，则表示样式表的URL；否则，是null

<div>
<pre>&lt;style id="styleIn1"&gt;&lt;/style&gt;
&lt;link id="styleOut" rel="stylesheet" href="style.css"&gt;
&lt;script&gt;
console.log(document.styleSheets[0].href);//null
//file:///C:/inetpub/wwwroot/style.css
console.log(document.styleSheets[1].href);
&lt;/script&gt;</pre>
</div>

【3】media

&emsp;&emsp;media属性表示当前样式表支持的所有[媒体类型](http://www.cnblogs.com/xiaohuochai/p/5848612.html#anchor1)的集合MediaList。与所有DOM集合一样，这个集合也有一个length属性和一个item()方法。也可以使用方括号语法取得集合中特定的项。如果集合是空列表，表示样式表适用于所有媒体。在IE8-浏览器中，media是一个反映&lt;link&gt;和&lt;style&gt;元素media特性值的字符串

<div>
<pre>&lt;style media="all and (min-width:100px)"&gt;
.box{height: 100px;width: 100px;background-color: pink;}
&lt;/style&gt;
&lt;script&gt;
//IE8-浏览器返回'all and (min-width:100px)'
//其他浏览器返回MediaList [ "all and (min-width: 100px)" ]
console.log(document.styleSheet[0].media);
&lt;/script&gt;</pre>
</div>

【4】ownerNode

&emsp;&emsp;ownerNode属性返回StyleSheet对象所在的DOM节点，通常是&lt;link&gt;或&lt;style&gt;。如果当前样式表是其他样式表通过@import导入的，则这个属性值为null

&emsp;&emsp;注意：IE8-浏览器不支持这个属性

<div>
<pre>&lt;style id="test"&gt;&lt;/style&gt;
&lt;script&gt;
//&lt;style id="test"&gt;&lt;/style&gt;，IE8-浏览器返回undefined
console.log(document.styleSheets[0].ownerNode);
&lt;/script&gt;</pre>
</div>

【5】parentStyleSheet

&emsp;&emsp;parentStyleSheet表示在当前样式表是通过@import导入的情况下，这个属性是一个指向导入它的样式表的指针；否则为null

<div>
<pre>&lt;style id="test"&gt;&lt;/style&gt;
&lt;script&gt;
console.log(document.styleSheets[0].parentStyleSheet);//null
&lt;/script&gt;</pre>
</div>

【6】title

&emsp;&emsp;title属性表示ownerNode中title属性的值

<div>
<pre>&lt;style title="test"&gt;&lt;/style&gt;
&lt;script&gt;
console.log(document.styleSheets[0].title);//test
&lt;/script&gt;</pre>
</div>

【7】type

&emsp;&emsp;type属性表示样式表类型的字符串。对CSS样式表而言，这个字符串是"type/css"

<div>
<pre>&lt;style type="text/css"&gt;&lt;/style&gt;
&lt;script&gt;
console.log(document.styleSheets[0].type);//'text/css'
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;注意：若省略type属性，默认为'text/css'，但IE8-浏览器输出''

<div>
<pre>&lt;style&gt;&lt;/style&gt;
&lt;script&gt;
//IE8-浏览器输出''，其他浏览器输出'text/css'
console.log(document.styleSheets[0].type);
&lt;/script&gt;</pre>
</div>

【8】cssText

&emsp;&emsp;cssText属性返回样式表中所有样式的字符串表示，该属性可读写，常常用于动态样式的IE浏览器兼容处理，详细情况[移步至此](http://www.cnblogs.com/xiaohuochai/p/5851203.html)

&emsp;&emsp;注意：该属性只有IE浏览器支持

<div>
<pre>&lt;style id="test"&gt;
.box{height: 100px;}
div{height: 100px;}
&lt;/style&gt;
&lt;script&gt;
var sheet = test.sheet || test.styleSheet;
//IE浏览器返回'.box{height: 100px;} div{height: 100px;}'
//firefox浏览器报错
//其他浏览器返回undefined
console.log(sheet.cssText);
&lt;/script&gt;    </pre>
</div>

&emsp;&emsp;上面8个属性中，除了disabled属性和cssText属性之外，其他属性都是只读的

**自有属性和方法**

【1】cssRules

&emsp;&emsp;cssRules属性表示样式表中包含的样式规则的集合

<div>
<pre>&lt;style&gt;
.box{height: 100px;width: 100px;background-color:pink;}
&lt;/style&gt;
&lt;script&gt;
//CSSRuleList {0: CSSStyleRule, length: 1}
console.log(document.styleSheets[0].cssRules);
&lt;/script&gt;    </pre>
</div>

&emsp;&emsp;IE8-浏览器不支持cssRules属性，但有一个类似的rules属性

&emsp;&emsp;注意：firefox不支持rules属性

<div>
<pre>&lt;style&gt;
.box{height: 100px;width: 100px;background-color:pink;}
&lt;/style&gt;
&lt;script&gt;
//CSSRuleList {0: CSSStyleRule, length: 1}
console.log(document.styleSheets[0].rules);
&lt;/script&gt;</pre>
</div>

**兼容**

<div>
<pre>function rules(sheet){
    return sheet.cssRules || sheet.rules;
} </pre>
</div>

【2】ownerRule

&emsp;&emsp;如果样式表是通过@import导入的，ownerRule属性就是一个指针，指向表示导入的规则；否则，值为null

&emsp;&emsp;注意：IE8-浏览器不支持这个属性

<div>
<pre>&lt;style&gt;
.box{height: 100px;width: 100px;background-color:pink;}
&lt;/style&gt;
&lt;script&gt;
console.log(document.styleSheets[0].ownerRule);//null
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;CSSStyleSheet对象的方法包括insertRule()、addRule()、deleteRule()和removeRule()，都用于操作CSSRule对象。于是把它们放在CSSRule对象的部分进行介绍

&nbsp;

### CSSRule对象

&emsp;&emsp;CSSRule对象表示样式表中的每一条规则。实际上，CSSRule是一个供其他多种类型继承的基类型，其中最常见的就是CSSStyleRule类型，表示样式信息。其他规则还包括@import、@font-face、@page和@charset

&emsp;&emsp;CSSRule对象的列表通过CSSStyleSheets对象的cssRules属性或ruls属性得到

<div>
<pre>&lt;style&gt;
.box{height: 100px;width: 100px;background-color:pink;}
&lt;/style&gt;
&lt;script&gt;
//CSSStyleRule {selectorText: ".box", style: CSSStyleDeclaration, type: 1, cssText: ".box { height: 100px; width: 100px; background-color: pink; }", parentRule: null&hellip;}
console.log(document.styleSheets[0].cssRules[0] || document.styleSheets[0].rules[0]);
&lt;/script&gt;</pre>
</div>

**属性**

&emsp;&emsp;CSSStyleRule对象包含下列属性

【1】cssText

&emsp;&emsp;cssText属性返回整条规则对应的文本

&emsp;&emsp;注意：IE8-浏览器不支持

<div>
<pre>&lt;style id="test"&gt;
.box{height: 100px;width: 100px;background-color:pink;}
&lt;/style&gt;
&lt;script&gt;
var sheet = test.sheet || test.styleSheet;
var rules = sheet.cssRules|| sheet.rules;
//'.box { height: 100px; width: 100px; background-color: pink; }'
console.log(rules[0].cssText);
&lt;/script&gt;</pre>
</div>

【2】style

&emsp;&emsp;style属性返回一个CSSStyleDeclaration对象，通过它设置和取得规则中特定的样式值

&emsp;&emsp;这个CSSStyleDeclaration对象与行内元素的style属性的CSSStyleDeclaration对象类似，具有相似的属性和方法，详细情况[移步至此](http://www.cnblogs.com/xiaohuochai/p/5837478.html)

<div>
<pre>&lt;style id="test"&gt;
.box{height: 100px;width: 100px;background-color:pink;}
&lt;/style&gt;
&lt;script&gt;
var sheet = test.sheet || test.styleSheet;
var rules = sheet.cssRules || sheet.rules;
//CSSStyleDeclaration {0: "height", 1: "width", 2: "background-color", alignContent: "", alignItems: "", alignSelf: "", alignmentBaseline: "", all: ""&hellip;}
console.log(rules[0].style);
/*注意：style属性下在cssText与CSSStyleRule对象下的cssText属性不同 ，前者只报包含样式信息，后者还包含选择符文本和围绕样式信息的花括号*/
//'height: 100px; width: 100px; background-color: pink;'
console.log(rules[0].style.cssText)
//'.box { height: 100px; width: 100px; background-color: pink; }'
console.log(rules[0].cssText)
&lt;/script&gt;    </pre>
</div>

【3】selectorText

&emsp;&emsp;selectorText属性返回当前规则的选择符文本

<div>
<pre>&lt;style id="test"&gt;
.box{height: 100px;width: 100px;background-color:pink;}
&lt;/style&gt;
&lt;script&gt;
var sheet = test.sheet || test.styleSheet;
var rules = sheet.cssRules|| sheet.rules;
console.log(rules[0].selectorText);//'.box'
&lt;/script&gt;</pre>
</div>

【4】parentRule

&emsp;&emsp;如果当前规则是导入的规则，这个属性引用的就是导入规则；否则，这个值为null

&emsp;&emsp;注意：IE8-浏览器不支持

<div>
<pre>&lt;style id="test"&gt;
.box{height: 100px;width: 100px;background-color:pink;}
&lt;/style&gt;
&lt;script&gt;
var sheet = test.sheet || test.styleSheet;
var rules = sheet.cssRules|| sheet.rules;
console.log(rules[0].parentRule);//null
&lt;/script&gt;</pre>
</div>

【5】parentStyleSheet

&emsp;&emsp;parentStyleSheet属性表示当前规则所属的样式表

&emsp;&emsp;注意：IE8-浏览器不支持

<div>
<pre>&lt;style&gt;
.box{width: 100px;height: 100px;background-color:pink;}
&lt;/style&gt;
&lt;script&gt;
var rules = document.styleSheets[0].cssRules|| document.styleSheets[0].rules;
//CSSStyleSheet {ownerRule: null, cssRules: CSSRuleList, rules: CSSRuleList, type: "text/css", href: null&hellip;}
console.log(rules[0].parentStyleSheet);
&lt;/script&gt;</pre>
</div>

【6】type

&emsp;&emsp;type属性返回有一个整数值，表示当前规则的类型

&emsp;&emsp;注意：IE8-浏览器不支持

&emsp;&emsp;最常见的类型有以下几种

<div>
<pre>1：样式规则，部署了CSSStyleRule接口
3：输入规则，部署了CSSImportRule接口
4：Media规则，部署了CSSMediaRule接口
5：字体规则，部署了CSSFontFaceRule接口</pre>
</div>
<div>
<pre>&lt;style&gt;
.box{width: 100px;height: 100px;background-color:pink;}
&lt;/style&gt;
&lt;script&gt;
var rules = document.styleSheets[0].cssRules|| document.styleSheets[0].rules;
console.log(rules[0].type);//1
&lt;/script&gt;</pre>
</div>

**方法**

&emsp;&emsp;CSSStyleRule对象本身并没有方法，操作CSSStyleRule对象的方法位于CSSStyleSheet对象中

【1】添加规则

**insertRule()**

&emsp;&emsp;insertRule(rule,index)方法表示向cssRules集合中指定的位置插入rule字符串，并返回当前样式表的索引值

&emsp;&emsp;注意：IE8-浏览器不支持

<div>
<pre>&lt;style&gt;
.box{height: 100px;width: 100px;background-color:pink;}
&lt;/style&gt;
&lt;div class="box"&gt;测试文字&lt;/div&gt;
&lt;button id="btn"&gt;文字变红&lt;/button&gt;
&lt;script&gt;
var rules = document.styleSheets[0].cssRules || document.styleSheets[0].rules;
//'.box { width: 100px; height: 100px; background-color: pink; }'
console.log(rules[0].cssText);
btn.onclick = function(){
    console.log(document.styleSheets[0].insertRule('div{color:red;}',0));//0
    console.log(rules[0].cssText);//'div { color: red; }'
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/js/stylesheets/s2.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;虽然，IE8-浏览器不支持insertRule()方法，但支持类似的addRule()方法

&emsp;&emsp;addRule(ruleKey,ruleValue,index)方法表示向cssRules集合中指定的位置插入rule字符串，并返回-1

&emsp;&emsp;注意：firefox不支持

<div>
<pre>&lt;style&gt;
.box{height: 100px;width: 100px;background-color:pink;}
&lt;/style&gt;
&lt;div class="box"&gt;测试文字&lt;/div&gt;
&lt;button id="btn"&gt;文字变红&lt;/button&gt;
&lt;script&gt;
var rules = document.styleSheets[0].cssRules || document.styleSheets[0].rules;
//'.box { width: 100px; height: 100px; background-color: pink; }'
console.log(rules[0].cssText);
btn.onclick = function(){
    console.log(document.styleSheets[0].addRule('div','color:red',0));//-1    
    console.log(rules[0].cssText);//'div { color: red; }'
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/js/stylesheets/s3.html" frameborder="0" width="320" height="240"></iframe>

**兼容**

<div>
<pre>function insertRule(sheet,ruleKey,ruleValue,index){
    return sheet.insertRule ? sheet.insertRule(ruleKey+ '{' + ruleValue + '}',index) : sheet.addRule(ruleKey,ruleValue,index);
}  </pre>
</div>

【2】删除规则

**deleteRule()**

&emsp;&emsp;deleteRule(index)方法删除cssRules集合中指定位置的规则，无返回值　

&emsp;&emsp;注意：IE8-浏览器不支持

<div>
<pre>&lt;style&gt;
.box{background-color:pink;}
.box{width: 100px;height: 100px;}
&lt;/style&gt;
&lt;div class="box"&gt;测试文字&lt;/div&gt;
&lt;button id="btn"&gt;删除颜色&lt;/button&gt;
&lt;script&gt;
var rules = document.styleSheets[0].cssRules || document.styleSheets[0].rules;
//'.box { background-color: pink; }'
console.log(rules[0].cssText);
btn.onclick = function(){
    console.log(document.styleSheets[0].deleteRule(0));//undefined
    //.box { width: 100px; height: 100px; }
    console.log(rules[0].cssText);
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/js/stylesheets/s4.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;虽然，IE8-浏览器不支持deleteRule()方法，但支持类似的removeRule()方法

&emsp;&emsp;removeRule(index)方法删除cssRules集合中指定位置的规则，无返回值

&emsp;&emsp;注意：firefox不支持

<div>
<pre>&lt;style&gt;
.box{background-color:pink;}
.box{width: 100px;height: 100px;}
&lt;/style&gt;
&lt;div class="box"&gt;测试文字&lt;/div&gt;
&lt;button id="btn"&gt;删除颜色&lt;/button&gt;
&lt;script&gt;
var rules = document.styleSheets[0].cssRules || document.styleSheets[0].rules;
//'.box { background-color: pink; }'
console.log(rules[0].cssText);
btn.onclick = function(){
    console.log(document.styleSheets[0].removeRule(0));//undefined
    //.box { width: 100px; height: 100px; }
    console.log(rules[0].cssText);
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/js/stylesheets/s5.html" frameborder="0" width="320" height="240"></iframe>

**兼容**

<div>
<pre>function deleteRule(sheet,index){
    (typeof sheet.deleteRule == "function")? sheet.deleteRule(index) : sheet.removeRule(index);
}   </pre>
</div>
