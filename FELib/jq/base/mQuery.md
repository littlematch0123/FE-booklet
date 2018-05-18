# 简易版jQuery——mQuery

&emsp;&emsp;虽然[jQuery](http://www.cnblogs.com/xiaohuochai/p/6489658.html)已经日渐式微，但它里面的许多思想，如选择器、链式调用、方法函数化、取赋值合体等，有的已经变成了标准，有的一直影响到现在。所以，jQuery是一个伟大的前端框架。前端世界日新月异，由于实在是没有时间去精读源码，于是自己封装一个简易版本的jQuery，来梳理jQuery的核心思路

&nbsp;

### 基本构架

&emsp;&emsp;由于火柴的英文是match，应该将这个简单框架称为mQuery。使用面向对象的写法来写mQuery，构造函数是Mquery()，调用$()方法，将根据Mquery()构造函数，创建一个实例对象

<div>
<pre>//构造函数
function Mquery(arg){}</pre>
</div>
<div>
<pre>function $(arg){
  return new Mquery(arg);
} </pre>
</div>

&emsp;&emsp;jquery几大特征：

&emsp;&emsp;1、通过$()选择的元素都是一个集合，即使仅仅是一个元素

&emsp;&emsp;因此，创建一个elements属性为一个数组，去接收获取的元素

<div>
<pre>//构造函数
function Mquery(arg){
  //保存所选择的元素
  this.elements = [];
}</pre>
</div>

&emsp;&emsp;2、链式调用

&emsp;&emsp;所以，原型函数要返回this，以实现链式调用的效果

&nbsp;

### $函数

&emsp;&emsp;$函数根据参数类型的不同，用途也不同

&emsp;&emsp;1、参数为函数时，则直接运行

<div>
<pre>$(function(){
    console.log(1)
})</pre>
</div>

&emsp;&emsp;2、参数为对象时，则把DOM对象转换为$对象

<div>
<pre>$(document.body)</pre>
</div>

&emsp;&emsp;3、参数为字符串时，则根据字符串选择出元素，并转换为$对象

<div>
<pre>$('#box')</pre>
</div>

&emsp;&emsp;下面根据以上三个分类，来编写Mquery构建函数

<div>
<pre>//事件绑定兼容写法
function _addEvent(target,type,handler){
    if(target.addEventListener){
        target.addEventListener(type,function(e){
          //如果事件函数中出现 return false;则阻止默认事件和阻止冒泡
          if(typeof handler == 'function' &amp;&amp; handler() === false){
            e.preventDefault();
            e.cancelBubble = true;
          }
        },false);
    }else{
        target.attachEvent('on'+type,function(event){
          if(typeof handler == 'function' &amp;&amp; handler() === false){
            event.cancelBubble = true;
            event.returnValue = false;
          }
            return handler.call(target,event);
        });
    }
}
//将类数组转换成数组
function _toArray(arrayLike){
  return Array.prototype.slice.call(arrayLike);
}</pre>
</div>
<div>
<pre>//构造函数
function Mquery(arg){
  //保存所选择的元素
  this.elements = [];
  switch(typeof arg){
    //当参数是函数时，如$(function(){})()，直接运行里面的代码
    case 'function':
      _addEvent(window,'load',arg);
      break;
    //当参数是字符串时，选择元素
    case 'string':
      this.elements = _toArray(document.querySelectorAll(arg));      
      break;
    //当参数是DOM对象时，将DOM对象转换为$对象  
    case 'object':
      if(arg.constructor == Array){
        this.elements = arg;
      }else{
        this.elements.push(arg);
      }      
      break;
  }
}</pre>
</div>

&nbsp;

### HTML、CSS及特性设置

&emsp;&emsp;下面来介绍常用的HTML、CSS及特性设置

【HTML】

&emsp;&emsp;对于文本内容来说，一般地，有三种方法：html()、text()和val()。本文只实现最常用的html()方法

&emsp;&emsp;当html()方法没有参数时，表示获取内容；有一个参数时，表示设置内容

<div>
<pre>//HTML获取与设置
Mquery.prototype.html = function(str){
  //设置
  if(str){
    for(var i = 0; i &lt; this.elements.length; i++){
      this.elements[i].innerHTML = str;
    }
  //获取
  }else{
    return this.elements[0].innerHTML;
  }  
  return this;
}</pre>
</div>

【CSS】

&emsp;&emsp;对于CSS来说，有两种参数格式：一种是json格式，一种是字符串格式

&emsp;&emsp;当第一个参数为对象时，则判断为json格式，否则为字符串格式

&emsp;&emsp;对于字符串格式来说，只有一个参数时，为获取样式，两个参数时，为设置样式

&emsp;&emsp;获取样式时，仅获取当前集合中第0个元素的样式；设置样式时，则设置当前集合中所有元素的样式

<div>
<pre>//获取计算样式兼容写法
function _getCSS(obj,style){
    if(window.getComputedStyle){
        return getComputedStyle(obj)[style];
    }
    return obj.currentStyle[style];
}</pre>
</div>
<div>
<pre>//CSS获取与设置
Mquery.prototype.css = function(attr,value){
  //如果是对象的形式，以对象的形式设置
  if(typeof attr == 'object'){
    for(var att in attr){
      for(var j = 0; j &lt; this.elements.length; j++){
        this.elements[j].style[att] = attr[att];
      }
    }
  //如果不是对象的形式
  }else{
    //设置
    if(arguments.length == 2){
      for(var i = 0; i &lt; this.elements.length; i++){
        this.elements[i].style[attr] = value;
      }
    //获取
    }else if(arguments.length == 1){
      return _getCSS(this.elements[0],attr)
    }
  }
  return this;
}</pre>
</div>

【attr】

&emsp;&emsp;特性设置与获取的思路与CSS类似，只是方法变成了setAttribute()和getAttribute()

<div>
<pre>//attr获取与设置
Mquery.prototype.attr = function(attr,value){
  //如果是对象的形式
  if(typeof attr == 'object'){
    for(var att in attr){
      for(var j = 0; j &lt; this.elements.length; j++){
        this.elements[j].setAttribute(att,attr[att]);
      }
    }
  //如果不是对象的形式
  }else{
    //设置
    if(arguments.length == 2){
      for(var i = 0; i &lt; this.elements.length; i++){
        this.elements[i].setAttribute(attr,value);
      }
    //获取
    }else if(arguments.length == 1){
      return this.elements[0].getAttribute(attr);
    }
  }
  return this;
}</pre>
</div>

&nbsp;

### 事件绑定

【on】

&emsp;&emsp;在jQuery中，最常用的事件绑定方法就是on方法。在on方法中要特别注意的是this的绑定，由于函数fn中的this实际上是window，所以应该将fn的this绑定到当前元素

<div>
<pre>//事件绑定
Mquery.prototype.on = function(eventType,fn){
  for(var i = 0; i &lt; this.elements.length; i++){
    _addEvent(this.elements[i],eventType,fn.bind(this.elements[i));
  }
  return this;
}</pre>
</div>

【click和hover】

&emsp;&emsp;click方法是一个简写方法

<div>
<pre>Mquery.prototype.click = function(fn){
  this.on('click',fn);
  return this;
}</pre>
</div>

&emsp;&emsp;hover方法是mouseover和mouseout的合成方法

<div>
<pre>Mquery.prototype.hover = function(fnOver,fnOut){
  this.on('mouseover',fnOver);
  this.on('mouseout',fnOut);
  return this;
}</pre>
</div>

【return false】

&emsp;&emsp;在jQuery中，使用return false可以同时阻止默认行为和阻止冒泡

<div>
<pre>//事件绑定兼容写法
function _addEvent(target,type,handler){
    if(target.addEventListener){
        target.addEventListener(type,function(e){
          //如果事件函数中出现 return false;则阻止默认事件和阻止冒泡
          if(typeof handler == 'function' &amp;&amp; handler() === false){
            e.preventDefault();
            e.cancelBubble = true;
          }
        },false);
    }else{
        target.attachEvent('on'+type,function(event){
          if(typeof handler == 'function' &amp;&amp; handler() === false){
            event.cancelBubble = true;
            event.returnValue = false;
          }
            return handler.call(target,event);
        });
    }
}</pre>
</div>

&nbsp;

### 其他设置

&emsp;&emsp;jQuery的功能非常强大。下面选择一些常用功能进行实现

【显示隐藏】

<div>
<pre>//隐藏
Mquery.prototype.hide = function(){
  for(var i = 0; i &lt; this.elements.length; i++){
    //保存当前元素的display值
    this.elements[i].displayValue = this.elements[i].style.display;
    this.elements[i].style.display = 'none';
  }
  return this;
}
//显示
Mquery.prototype.show = function(){
  for(var i = 0; i &lt; this.elements.length; i++){
   this.elements[i].style.display = this.elements[i].displayValue;
   //删除保存的元素的display值
   delete this.elements[i].displayValue;
  }
  return this;
}</pre>
</div>

【插件设置】

<div>
<pre>$.extend = function(json){ 
  for(var attr in json){
    $[attr] = json[attr];
  }
};
$.fn = {};
$.fn.extend = function(json){
  for(var attr in json){
    Mquery.prototype[attr] = json[attr];
  } 
};</pre>
</div>

【索引设置】

<div>
<pre>//根据索引选择元素
Mquery.prototype.eq = function(number){
  return $(this.elements[number]);
}
//根据元素获取索引
Mquery.prototype.index = function(){
  var elements = this.elements[0].parentNode.children;
  for(var i = 0; i &lt; elements.length; i++){
    if(elements[i] === this.elements[0]){
      return i;
    }
  }
}</pre>
</div>

【子级筛选】

<div>
<pre>//筛选出当前匹配的元素集合中每个元素的后代
Mquery.prototype.find = function(str){
  var arr = [];
  for(var i = 0; i &lt; this.elements.length; i++){
    Array.prototype.push.apply(arr,this.elements[i].querySelectorAll(str));
  }
  return $(arr);
}</pre>
</div>

&nbsp;

### 完整源码

&emsp;&emsp;下面是[mQuery](https://files.cnblogs.com/files/xiaohuochai/mQuery.js)的完整源码

<div>
<pre>//事件绑定兼容写法
function _addEvent(target,type,handler){
    if(target.addEventListener){
        target.addEventListener(type,function(e){
          //如果事件函数中出现 return false;则阻止默认事件和阻止冒泡
          if(typeof handler == 'function' &amp;&amp; handler() === false){
            e.preventDefault();
            e.cancelBubble = true;
          }
        },false);
    }else{
        target.attachEvent('on'+type,function(event){
          if(typeof handler == 'function' &amp;&amp; handler() === false){
            event.cancelBubble = true;
            event.returnValue = false;
          }
            return handler.call(target,event);
        });
    }
}
//获取计算样式兼容写法
function _getCSS(obj,style){
    if(window.getComputedStyle){
        return getComputedStyle(obj)[style];
    }
    return obj.currentStyle[style];
}
//将类数组转换成数组
function _toArray(arrayLike){
  return Array.prototype.slice.call(arrayLike);
}
//构造函数
function Mquery(arg){
  //保存所选择的元素
  this.elements = [];
  switch(typeof arg){
    //当参数是函数时，如$(function(){})()，直接运行里面的代码
    case 'function':
      _addEvent(window,'load',arg);
      break;
    //当参数是字符串时，选择元素
    case 'string':
      this.elements = _toArray(document.querySelectorAll(arg));              
      break;
    //当参数是DOM对象时，将DOM对象转换为$对象  
    case 'object':
      if(arg.constructor == Array){
        this.elements = arg;
      }else{
        this.elements.push(arg);
      }      
      break;
  }
}
//根据索引选择元素
Mquery.prototype.eq = function(number){
  return $(this.elements[number]);
}
//根据元素获取索引
Mquery.prototype.index = function(){
  var elements = this.elements[0].parentNode.children;
  for(var i = 0; i &lt; elements.length; i++){
    if(elements[i] === this.elements[0]){
      return i;
    }
  }
}
//筛选出当前匹配的元素集合中每个元素的后代
Mquery.prototype.find = function(str){
  var arr = [];
  for(var i = 0; i &lt; this.elements.length; i++){
    Array.prototype.push.apply(arr,this.elements[i].querySelectorAll(str));
  }
  return $(arr);
}
//CSS获取与设置
Mquery.prototype.css = function(attr,value){
  //如果是对象的形式，以对象的形式设置
  if(typeof attr == 'object'){
    for(var att in attr){
      for(var j = 0; j &lt; this.elements.length; j++){
        this.elements[j].style[att] = attr[att];
      }
    }
  //如果不是对象的形式
  }else{
    //设置
    if(arguments.length == 2){
      for(var i = 0; i &lt; this.elements.length; i++){
        this.elements[i].style[attr] = value;
      }
    //获取
    }else if(arguments.length == 1){
      return _getCSS(this.elements[0],attr)
    }
  }
  return this;
}
//attr获取与设置
Mquery.prototype.attr = function(attr,value){
  //如果是对象的形式
  if(typeof attr == 'object'){
    for(var att in attr){
      for(var j = 0; j &lt; this.elements.length; j++){
        this.elements[j].setAttribute(att,attr[att]);
      }
    }
  //如果不是对象的形式
  }else{
    //设置
    if(arguments.length == 2){
      for(var i = 0; i &lt; this.elements.length; i++){
        this.elements[i].setAttribute(attr,value);
      }
    //获取
    }else if(arguments.length == 1){
      return this.elements[0].getAttribute(attr);
    }
  }
  return this;
}
//HTML获取与设置
Mquery.prototype.html = function(str){
  //设置
  if(str){
    for(var i = 0; i &lt; this.elements.length; i++){
      this.elements[i].innerHTML = str;
    }
  //获取
  }else{
    return this.elements[0].innerHTML;
  }  
  return this;
}
//隐藏
Mquery.prototype.hide = function(){
  for(var i = 0; i &lt; this.elements.length; i++){
    //保存当前元素的display值
    this.elements[i].displayValue = this.elements[i].style.display;
    this.elements[i].style.display = 'none';
  }
  return this;
}
//显示
Mquery.prototype.show = function(){
  for(var i = 0; i &lt; this.elements.length; i++){
   this.elements[i].style.display = this.elements[i].displayValue;
   //删除保存的元素的display值
   delete this.elements[i].displayValue;
  }
  return this;
}
//事件绑定
Mquery.prototype.on = function(eventType,fn){
  for(var i = 0; i &lt; this.elements.length; i++){
    _addEvent(this.elements[i],eventType,fn.bind(this.elements[i]));
  }
  return this;
}
//click简写
Mquery.prototype.click = function(fn){
  this.on('click',fn);
  return this;
}
//鼠标移入移出
Mquery.prototype.hover = function(fnOver,fnOut){
  this.on('mouseover',fnOver);
  this.on('mouseout',fnOut);
  return this;
}
$.extend = function(json){ 
  for(var attr in json){
    $[attr] = json[attr];
  }
};
$.fn = {};
$.fn.extend = function(json){
  for(var attr in json){
    Mquery.prototype[attr] = json[attr];
  } 
};
function $(arg){
  return new Mquery(arg);
} </pre>
</div>

&nbsp;

### 实际应用

&emsp;&emsp;下面使用mQuery来实现一个简单的效果

<div>
<pre>&lt;style&gt;
div { width:60px; height:60px; margin:5px; float:left; }
&lt;/style&gt;
&lt;span id="result"&gt;&lt;/span&gt;
&lt;div style="background-color:blue;"&gt;&lt;/div&gt;
&lt;div style="background-color:rgb(15,99,30);"&gt;&lt;/div&gt;
&lt;div style="background-color:#123456;"&gt;&lt;/div&gt;
&lt;div style="background-color:#f11;"&gt;&lt;/div&gt;
&lt;script src="mQuery.js"&gt;&lt;/script&gt;
&lt;script&gt;
$("div").click(function(){
 $("#result").html("背景颜色是 " + $(this).css("background-color"));
})
&lt;/script&gt; </pre>
</div>

&emsp;&emsp;点击不同颜色的元素块，将在右侧显示具体的颜色值

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/jquery/base/b1.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;