# 深入理解javascript选择器API系列第二篇——getElementsByClassName

&emsp;&emsp;既然有[getElementById()](http://www.cnblogs.com/xiaohuochai/p/5795796.html#anchor1)和[getElementsByTagName()](http://www.cnblogs.com/xiaohuochai/p/5795796.html#anchor2)方法，为什么没有getElementsByClassName()呢？id属性、标签名、class属性并没有什么优劣之分啊。终于，HTML5新增了getElementsByClassName()方法，由于在CSS布局中类名的广泛使用，该方法正好切中痛点，使得通过类名选取元素不再困难，成为最受欢迎的一个方法。接下来，本文将详细介绍该方法

&nbsp;

### 使用

&emsp;&emsp;HTML元素的class属性值是一个以空格隔开的列表，可以为空或包含多个标识符。在javascript中class是保留字，所以使用className属性来保存HTML的class属性值

&emsp;&emsp;getElementsByClassName()方法接收一个参数，即一个包含一个或多个类名的字符串，返回带有指定类的所有元素的类数组对象[HTMLCollection](http://www.cnblogs.com/xiaohuochai/p/5827389.html#anchor2)。传入多个类名时，类名的先后顺序不重要。与getElementsByTagName()类似，该方法既可以用于HTML文档对象，也可以用于element元素对象

&emsp;&emsp;注意：IE8-浏览器不支持

<div>
<pre>&lt;ul id="list"&gt;
    &lt;li class="a ab c"&gt;1&lt;/li&gt;
    &lt;li class="a"&gt;2&lt;/li&gt;
    &lt;li class="ac"&gt;3&lt;/li&gt;
    &lt;li class="a b c"&gt;4&lt;/li&gt;
    &lt;li class="a b"&gt;5&lt;/li&gt;
&lt;/ul&gt;
&lt;script&gt;
//类名中存在a成立
Array.prototype.forEach.call(list.getElementsByClassName('a'),function(item,index,arr){
    item.style.fontWeight = 'bold';
});
//只有类名中同时存在a和c才成立
Array.prototype.forEach.call(list.getElementsByClassName('a c'),function(item,index,arr){
    item.style.color = 'red';
});
&lt;/script&gt;</pre>
</div>

<iframe style="line-height: 1.5; width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/js/className/c1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### classList属性

&emsp;&emsp;在操作类名时，需要通过className属性添加、删除和替换类名。因为className是一个字符串，所以即使只修改字符串一部分，也必须每次都设置整个字符串的值。要从className字符串中删除一个类名，需要把类名拆开，删除不想要的那个，再重新拼成一个新字符串

&emsp;&emsp;HTML5为所有元素添加了classList属性，这个classList属性是新集合类型DOMTokenList的实例，它有一个表示自己包含多少元素的length属性，而要取得每个元素可以使用item()方法，也可以使用方括号法

&emsp;&emsp;注意：IE9-浏览器不支持

<div>
<pre>&lt;div id="test" class="a b c"&gt;&lt;/div&gt;
&lt;script&gt;
console.log(test.classList);//["a", "b", "c", value: "a b c"]
console.log(test.classList[0]);//a
console.log(test.classList.item(1));//b
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;此外，这个新类型还定义如下方法：

<div>
<pre>add(value)             将给定的字符串值添加到列表中，如果值已存在，则不添加
contains(value)        表示列表中是否存在给定的值，如果存在则返回true,否则返回false
remove(value)          从列表中删除给定的字符串
toggle(value)          如果列表中已经存在给定的值，删除它；如果列表中没有给定的值，添加它</pre>
</div>

&emsp;&emsp;有了classList属性，className属性基本没有什么用武之地了

<div>
<pre>&lt;style&gt;
.cB{color: blue;}
&lt;/style&gt;

&lt;body&gt;
&lt;div id="test"&gt;测试文字&lt;/div&gt;
&lt;button id="btn1" onclick = "test.classList.add('cB')"&gt;add&lt;/button&gt;
&lt;button id="btn2" onclick = "test.classList.contains('cB')?alert(true):alert(false)"&gt;contains&lt;/button&gt;
&lt;button id="btn3" onclick = "test.classList.remove('cB')"&gt;remove&lt;/button&gt;
&lt;button id="btn4" onclick = "test.classList.toggle('cB')"&gt;toggle&lt;/button&gt;
&lt;/body&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/js/className/c2.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 扩展

&emsp;&emsp;【1】由于原生的getElementsByClassName()方法不兼容IE8-浏览器，且该方法只能完全匹配参数中的类名列表。因此有如下扩展

&emsp;&emsp;扩展函数getElementsByClassName()，具有更丰富的功能。如果参数类名列表由空格分隔，则进行且匹配，即只有元素中的类名包含参数类名列表中的所有类名才算匹配成功；如果参数类名列表由逗号分隔，则进行或匹配，即只要元素中的类名包含参数类名列表中的其中一个类型就算匹配成功

<div>
<pre>Array.prototype.noRepeat = function(){
    var result = [];
    for(var i = 0; i &lt; this.length; i++){
        if(result.indexOf(this[i]) == -1){
            result.push(this[i]);
        }
    }
    return result;
}
Array.prototype.inArray = function(value){
    for(var i = 0; i &lt; this.length; i++){
        if(this[i] === value){
            return true;
        }
    }
    return false;
}
function getElementsByClassName(parentObj,classStr){
    var result = [];
    //获取parentObj下的所有子元素
    var objs = parentObj.getElementsByTagName('*');
    //条件一：如果classStr用空格分隔，则表示class必须同时满足才有效
    var targetArr1 = classStr.trim().split(/\s+/).noRepeat();
    //条件二：如果classStr用逗号分隔，则表示class只要有一个满足就有效
    var targetArr2 = classStr.trim().split(/\s*,\s*/).noRepeat();
    //只有一个class或者进行条件一测试
    if(classStr.indexOf(',') == -1 ){
        label: for(var i = 0; i &lt; objs.length; i++){
            //获取每一个子元素的类名，将其转换为数组后去重
            var arr = objs[i].className.trim().split(/\s+/).noRepeat();
            //进入循环，测试是否符合条件一
            for(var j = 0; j &lt; targetArr1.length; j++){
                //如果条件一中的某一项在arr数组中不存在，则跳过该子元素
                if(!arr.inArray(targetArr1[j])){
                    continue label;
                }
            }
            //将符合条件一的子元素对象放在结果数组中
            result.push(objs[i]);
        }
        //返回结果数组
        return result;
    //进行条件二测试
    }else{
        label: for(var i = 0; i &lt; objs.length; i++){
                //获取每一个子元素的类名，将其转换为数组后去重
                var arr =objs[i].className.trim().split(/\s+/).noRepeat();
                //进入循环，测试是否符合条件二
                for(var j = 0; j &lt; targetArr2.length; j++){
                    //只要条件二的中某一项在arr数组中存在，就符合
                    if(arr.inArray(targetArr2[j])){
                        //将符合条件二的子元素对象放在结果数组中
                        result.push(objs[i]);
                        //接着进入下一个子元素测试
                        continue label;
                    }
                }   
            }
        //返回结果数组
        return result;     
    }
}</pre>
</div>
<div>
<pre>&lt;ul id="list"&gt;
    &lt;li class="a ab c"&gt;1&lt;/li&gt;
    &lt;li class="a"&gt;2&lt;/li&gt;
    &lt;li class="ac"&gt;3&lt;/li&gt;
    &lt;li class="a b c"&gt;4&lt;/li&gt;
    &lt;li class="a b"&gt;5&lt;/li&gt;
&lt;/ul&gt;
&lt;script&gt;
//类名中存在a成立
getElementsByClassName(list,'a').forEach(function(item,index,arr){
    item.style.fontWeight = 'bold';
});
//只有类名中同时存在a和c才成立
getElementsByClassName(list,'a c').forEach(function(item,index,arr){
    item.style.color = 'red';
});
//只要类名中存在b或c即成立
getElementsByClassName(list,'b,c').forEach(function(item,index,arr){
    item.style.backgroundColor = 'pink';
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/js/className/c3.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;【2】由于IE9-浏览器不支持classList属性，也就不支持add()、contains()、remove()和toggle()这四个方法，下面是这四个方法的兼容写法

&emsp;&emsp;由于indexOf()和trim()方法都是ES5新增方法，在低版本IE浏览器中不支持，所以需要重新封装

<div>
<pre>//数组的indexOf方法封装
function indexOf(arr,value,start){
    //如果不设置start,则默认start为0
    if(arguments.length == 2){
        start = 0;
    }
    //如果数组中存在indexOf方法，则用原生的indexOf方法
    if(arr.indexOf){
        return arr.indexOf(value,start);
    }
    for(var i = start; i &lt; arr.length; i++){
        if(arr[i] === value){
            return i;
        }
    }
    return -1;
}
//数组去重方法封装
function noRepeat(arr){
    var result = [];
    for( var i = 0; i &lt; arr.length; i++){
        if(indexOf(result,arr[i]) == -1){
            result.push(arr[i]);
        }
    }
    return result;
}
//inArray方法封装
function inArray(arr,value){
    for(var i = 0; i &lt; arr.length; i++){
        if(arr[i] === value){
            return true;
        }
    }
    return false;
}
//去除首尾空格函数封装
function trim(arr){
    var result = arr.replace(/^\s+|\s+$/g,'');
    return result;
}</pre>
</div>

&emsp;&emsp;1、add函数封装

<div>
<pre>function addClass(obj,classStr){
    var array = noRepeat(trim(obj.className).split('\s+'));
    if(!inArray(array,classStr)){
        array.push(classStr);
    }
    obj.className = array.join(' ');
    return obj;
}</pre>
</div>

&emsp;&emsp;2、contains函数封装

<div>
<pre>function containsClass(obj,classStr){
    var array = noRepeat(trim(obj.className).split('\s+'));
    if(inArray(array,classStr)){
        return true;
    }
    return false;
}</pre>
</div>

&emsp;&emsp;3、remove函数封装

<div>
<pre>function removeClass(obj,classStr){
    var array = noRepeat(trim(obj.className).split('\s+'));
    var index = indexOf(array,classStr);
    if(index != -1){
        array.splice(index,1);
        obj.className = array.join(' ');
    }
    return obj;
}</pre>
</div>

&emsp;&emsp;4、toggle函数封装

<div>
<pre>function toggleClass(obj,classStr){
    var array = noRepeat(trim(obj.className).split('\s+'));
    if(inArray(array,classStr)){
        removeClass(obj,classStr);
    }else{
        addClass(obj,classStr);
    }
}</pre>
</div>
<div>
<pre>&lt;style&gt;
.cB{color: blue;}
&lt;/style&gt;

&lt;div id="test"&gt;测试文字&lt;/div&gt;
&lt;button id="btn1" onclick = "addClass(test,'cB')"&gt;add&lt;/button&gt;
&lt;button id="btn2" onclick = "containsClass(test,'cB')?alert(true):alert(false)"&gt;contains&lt;/button&gt;
&lt;button id="btn3" onclick = "removeClass(test,'cB')"&gt;remove&lt;/button&gt;
&lt;button id="btn4" onclick = "toggleClass(test,'cB')"&gt;toggle&lt;/button&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/js/className/c4.html" frameborder="0" width="320" height="240"></iframe>
