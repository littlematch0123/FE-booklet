# 深入理解脚本化CSS系列第二篇——查询计算样式

&emsp;&emsp;元素的渲染结果是多个CSS样式博弈后的最终结果，这也是CSS中的C(cascade)层叠的含义。访问[第一篇](http://www.cnblogs.com/xiaohuochai/p/5837478.html)中的style属性只能获取行间样式，这通常来说，并不是我们想要的结果。本文将详细介绍如何查询计算样式

&nbsp;

### getComputedStyle()

&emsp;&emsp;元素的计算样式(computedStyle)是一组在显示元素时实际使用的属性值，也是用一个 CSSStyleDeclaration对象来表示的，但计算样式是只读的，主要通过getComputedStyle()方法实现

&emsp;&emsp;getComputedStyle()方法接收两个参数：要取得计算样式的元素和一个伪元素字符串。如果不需要伪元素信息，第二个参数可以是null。getComputedStyle()方法返回一个CSSStyleDeclaration对象，其中包含当前元素的所有计算的样式

&emsp;&emsp;注意：IE8-浏览器不支持

&emsp;&emsp;getComputedStyle()方法原本是window对象下的方法，后来&ldquo;DOM2级样式&rdquo;增强了document.defaultView，也提供了getComputedStyle()方法。所以getComputedStyle()方法一共有下面3种写法

&emsp;&emsp;1、document.defaultView.getComputedStyle(div).width

&emsp;&emsp;2、window.getComputedStyle(div).width

&emsp;&emsp;3、getComputedStyle(div).width

&emsp;&emsp;其中第3种写法最简单

<div>
<pre>&lt;div id="test" style="width: 100px;"&gt;&lt;/div&gt;
&lt;script&gt;
//下面三行代码的结果都一样，IE8-浏览器报错，其他浏览器返回'100px'
console.log(document.defaultView.getComputedStyle(test).width);
console.log(window.getComputedStyle(test).width);
console.log(getComputedStyle(test).width);
&lt;/script&gt;</pre>
</div>

**伪元素**

&emsp;&emsp;第二个参数代表伪元素字符串，包括":before"、":after"、":first-line"等，如果设置为null或省略不写，则返回自身元素的CSSStyleDeclaration对象

&emsp;&emsp;注意：关于伪元素的详细内容[移步至此](http://www.cnblogs.com/xiaohuochai/p/5021121.html)

<div>
<pre>&lt;style&gt;
#test:before{
    content:'';
    width:20px;
    display:inline-block;
}
&lt;/style&gt;
&lt;div id="test" style="width: 100px;"&gt;&lt;/div&gt;
&lt;script&gt;
//IE8-浏览器报错，其他浏览器返回'20px'
console.log(getComputedStyle(test,':before').width);
&lt;/script&gt;</pre>
</div>

&nbsp;

### 注意事项

&emsp;&emsp;在使用getComputedStyle()方法的过程中，有如下注意事项：

&emsp;&emsp;【1】对于font、background、border等复合样式，各浏览器处理不一样。chrome会返回整个复合样式，而IE9+、firefox和safari则输出空字符串''

<div>
<pre>&lt;div id="test" style="font-size:20px"&gt;&lt;/div&gt;
&lt;script&gt;
//IE8-浏览器报错，chrome返回normal normal normal normal 20px / normal Simsun，其他浏览器返回''
console.log(getComputedStyle(test).font);
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;【2】不论以什么格式设置颜色，浏览器都以rgb()或rgba()的形式输出

<div>
<pre>&lt;div id="test" style="color:red"&gt;&lt;/div&gt;
&lt;script&gt;
//IE8-浏览器报错，其他浏览器返回rgb(255, 0, 0)
console.log(getComputedStyle(test).color);
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;【3】在计算样式中，类似百分比等相对单位会转换为绝对值

<div>
<pre>&lt;div id="test" style="width:20%;"&gt;&lt;/div&gt;
&lt;script&gt;
//IE8-浏览器报错，其他浏览器返回'304px'
console.log(getComputedStyle(test).width);
&lt;/script&gt;</pre>
</div>

&nbsp;

### currentStyle

&emsp;&emsp;IE8-浏览器不支持getComputedStyle()方法，但在IE中每个具有style属性的元素有一个currentStyle属性，这个属性是CSSStyleDeclaration的实例，包含当前元素全部计算后的样式

<div>
<pre>&lt;div id="test" style="font-size:20px;color:red;width:20%;"&gt;&lt;/div&gt;
&lt;script&gt;
//IE8-浏览器返回undefined，IE9+浏览器返回''
console.log(test.currentStyle.font);
//IE浏览器返回red
console.log(test.currentStyle.color);
//IE浏览器返回20%
console.log(test.currentStyle.width);
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;由以上结果看出，currentStyle属性中的计算样式并不会输出集合样式，对颜色、百分比设置不会进行相应转换，而是原样输出

**兼容**

<div>
<pre>function getCSS(obj,style){
    if(window.getComputedStyle){
        return getComputedStyle(obj)[style];
    }
    return obj.currentStyle[style];
}</pre>
</div>
<div>
<pre>&lt;div id="test" style="width:20px;"&gt;&lt;/div&gt;
&lt;script&gt;
function getCSS(obj,style){
    if(window.getComputedStyle){
        return getComputedStyle(obj)[style];
    }
    return obj.currentStyle[style];
}    
console.log(getCSS(test,'width'));//20px
&lt;/script&gt;</pre>
</div>

&nbsp;

### IE

&emsp;&emsp;IE9+浏览器的getComputedStyle()方法和IE浏览器的currentStyle属性有一个特别的地方，就是可以识别自定义样式的值，虽然无法正常渲染，但是可以取出值

<div>
<pre>&lt;div id="test" style="a:1"&gt;&lt;/div&gt;
&lt;script&gt;
//其他浏览器输出undefined，而IE9+浏览器输出1
console.log(getComputedStyle(test).a);
//其他浏览器输出undefined，而IE浏览器输出1
console.log(test.currentStyle.a);
&lt;/script&gt;</pre>
</div>

**opacity**

&emsp;&emsp;虽然IE8-浏览器无法对opacity属性进行正常渲染，但可以读出opacity属性的值。这对于opacity属性来说无疑是一个好消息

<div>
<pre>&lt;div id="test" style="opacity:0.5"&gt;&lt;/div&gt;
&lt;script&gt;
function getCSS(obj,style){
    if(window.getComputedStyle){
        return getComputedStyle(obj)[style];
    }
    return obj.currentStyle[style];
}    
console.log(getCSS(test,'opacity'));//0.5
&lt;/script&gt;    </pre>
</div>

&nbsp;

## 最后

&emsp;&emsp;一般地，我们通过getComputedStyle()方法或currentStyle属性获得元素的计算样式，但要获得元素精确的位置和尺寸信息，查询元素的计算样式并不是个好主意，因为类似padding、width等单一样式并不直接反映元素的位置和尺寸信息，这些信息是多个样式综合作用的结果。所以，最好使用前面介绍过的关于元素视图的[offset](http://www.cnblogs.com/xiaohuochai/p/5828369.html)、[client](http://www.cnblogs.com/xiaohuochai/p/5830053.html)、[scroll](http://www.cnblogs.com/xiaohuochai/p/5831640.html)和[getBoundingClientRect()](http://www.cnblogs.com/xiaohuochai/p/5832712.html)等来获取

&emsp;&emsp;欢迎交流

