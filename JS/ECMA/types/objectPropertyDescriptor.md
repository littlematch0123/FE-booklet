# 深入理解javascript对象系列第三篇——神秘的属性描述符

&emsp;&emsp;对于操作系统中的文件，我们可以驾轻就熟将其设置为只读、隐藏、系统文件或普通文件。于对象来说，属性描述符提供类似的功能，用来描述对象的值、是否可配置、是否可修改以及是否可枚举。本文就来介绍对象中神秘的属性描述符

&nbsp;

### 描述符类型

&emsp;&emsp;对象属性描述符的类型分为两种：数据属性和访问器属性

**数据属性**

&emsp;&emsp;数据属性(data property)包含一个数据值的位置，在这个位置可以读取和写入值。数据属性有4个特性

【1】[Configurable(可配置性)](#configurable)

&emsp;&emsp;可配置性决定是否可以使用delete删除属性，以及是否可以修改属性描述符的特性，默认值为true

【2】[Enumerable(可枚举性)](#enumerable)

&emsp;&emsp;可枚举性决定属性是否出现在对象的属性枚举中，比如是否可以通过for-in循环返回该属性，默认值为true

【3】[Writable(可写性)](#writable)

&emsp;&emsp;可写性决定是否可以修改属性的值，默认值为true

【4】Value(属性值)

&emsp;&emsp;属性值包含这个属性的数据值，读取属性值的时候，从这个位置读；写入属性值的时候，把新值保存在这个位置。默认值为undefined

&nbsp;

**访问器属性**

&emsp;&emsp;对象属性是名字、值和一组属性描述符构成的。而属性值可以用一个或两个方法替代，这两个方法就是getter和setter。而这种属性类型叫访问器属性(accessor property)

【1】[Configurable(可配置性)](#configurable)

&emsp;&emsp;可配置性决定是否可以使用delete删除属性，以及是否可以修改属性描述符的特性，默认值为true

【2】[Enumerable(可枚举性)](#enumerable)

&emsp;&emsp;可枚举性决定属性是否出现在对象的属性枚举中，比如是否可以通过for-in循环返回该属性，默认值为true

【3】[getter](#get)

&emsp;&emsp;在读取属性时调用的函数。默认值为undefined

【4】[setter](#get)

&emsp;&emsp;在写入属性时调用的函数。默认值为undefined

&emsp;&emsp;和数据属性不同，访问器属性不具有可写性(Writable)。如果属性同时具有getter和setter方法，那么它是一个读/写属性。如果它只有getter方法，那么它是一个只读属性。如果它只有setter方法，那么它是一个只写属性。读取只写属性总是返回undefined

&nbsp;

### 描述符方法

&emsp;&emsp;前面介绍了属性描述符，要想设置它们，就需要用到描述符方法。描述符方法总共有以下4个：

【1】Object.getOwnPropertyDescriptor()

&emsp;&emsp;Object.getOwnPropertyDescriptor(o,name)方法用于查询一个属性的描述符，并以对象的形式返回

&emsp;&emsp;查询obj.a属性时，可配置性、可枚举性、可写性都是默认的true，而value是a的属性值1

&emsp;&emsp;查询obj.b属性时，因为obj.b属性不存在，该方法返回undefined

<div>
<pre>var obj = {a:1};
//Object {value: 1, writable: true, enumerable: true, configurable: true}
console.log(Object.getOwnPropertyDescriptor(obj,'a'));
//undefined
console.log(Object.getOwnPropertyDescriptor(obj,'b'));</pre>
</div>

【2】Object.defineProperty()

&emsp;&emsp;Object.defineProperty(o,name,desc)方法用于创建或配置对象的一个属性的描述符，返回配置后的对象

&emsp;&emsp;使用该方法创建或配置对象属性的描述符时，如果不针对该属性进行描述符的配置，则该项描述符默认为false

<div>
<pre>var obj = {};
//{a:1}
console.log(Object.defineProperty(obj,'a',{
        value:1,
        writable: true
    }));

//由于没有配置enumerable和configurable，所以它们的值为false
//{value: 1, writable: true, enumerable: false, configurable: false}
console.log(Object.getOwnPropertyDescriptor(obj,'a'));</pre>
</div>

【3】Object.defineProperties()

&emsp;&emsp;Object.defineProperty(o,descriptors)方法用于创建或配置对象的多个属性的描述符，返回配置后的对象

<div>
<pre>var obj = {
    a:1
};
//{a: 1, b: 2}
console.log(Object.defineProperties(obj,{
        a:{writable:false},
        b:{value:2}
    }));

//{value: 1, writable: false, enumerable: true, configurable: true}
console.log(Object.getOwnPropertyDescriptor(obj,'a'));
//{value: 2, writable: false, enumerable: false, configurable: false}
console.log(Object.getOwnPropertyDescriptor(obj,'b'));</pre>
</div>

【4】Object.create()

&emsp;&emsp;Object.create(proto,descriptors)方法使用指定的原型和属性来创建一个对象

<div>
<pre>var o = Object.create(Object.prototype,{
    a:{writable: false,value:1,enumerable:true}
});
//{value: 1, writable: false, enumerable: true, configurable: true}
console.log(Object.getOwnPropertyDescriptor(obj,'a'));</pre>
</div>

&nbsp;

### 描述符详述

&emsp;&emsp;前面分别介绍了数据属性和访问器属性的描述符，但没有详细说明其含义及使用，接下来逐一进行说明&nbsp;

**可写性(writable)**

&emsp;&emsp;可写性决定是否可以修改属性的值，默认值为true

<div>
<pre>var o = {a:1};
o.a = 2;
console.log(o.a);//2</pre>
</div>

&emsp;&emsp;设置writable:false后，赋值语句会静默失效

<div>
<pre>var o = {a:1};
Object.defineProperty(o,'a',{
    writable:false
});
console.log(o.a);//1
//由于设置了writable为false，所以o.a=2这个语句会静默失效
o.a = 2;
console.log(o.a);//1
Object.defineProperty(o,'a',{
    writable:true
});
//由于writable设置为true，所以o.a可以被修改为2
o.a = 2;
console.log(o.a);//2</pre>
</div>

&emsp;&emsp;在严格模式下通过赋值语句为writable为false的属性赋值，会提示类型错误TypeError

<div>
<pre>'use strict';
var o = {a:1};
Object.defineProperty(o,'a',{
    writable:false
});
//Uncaught TypeError: Cannot assign to read only property 'a' of object '#&lt;Object&gt;'
o.a = 2;</pre>
</div>

&emsp;&emsp;注意：设置writable:false后，通过Object.defineProperty()方法改变属性value的值不会受影响，因为这也意味着在重置writable的属性值为false

<div>
<pre>var o = {a:1};
Object.defineProperty(o,'a',{
    writable:false
});
console.log(o.a);//1
Object.defineProperty(o,'a',{
    value:2
});
console.log(o.a);//2</pre>
</div>

&nbsp;

**可配置性(Configurable)**

&emsp;&emsp;可配置性决定是否可以使用delete删除属性，以及是否可以修改属性描述符的特性，默认值为true

&emsp;&emsp;【1】设置Configurable:false后，无法使用delete删除属性

<div>
<pre>var o = {a:1};
Object.defineProperty(o,'a',{
    configurable:false
});
delete o.a;//false
console.log(o.a);//1</pre>
</div>

&emsp;&emsp;在严格模式下删除为configurable为false的属性，会提示类型错误TypeError

<div>
<pre>'use strict';
var o = {a:1};
Object.defineProperty(o,'a',{
    configurable:false
});
//Uncaught TypeError: Cannot delete property 'a' of #&lt;Object&gt;
delete o.a;</pre>
</div>

&emsp;&emsp;注意：使用var命令声明变量时，变量的configurable为false

<div>
<pre>var a = 1;
//{value: 1, writable: true, enumerable: true, configurable: false}
Object.getOwnPropertyDescriptor(this,'a');</pre>
</div>

&emsp;&emsp;【2】一般地，设置Configurable:false后，将无法再使用defineProperty()方法来修改属性描述符

<div>
<pre>var o = {a:1};
Object.defineProperty(o,'a',{
    configurable:false
});
//Uncaught TypeError: Cannot redefine property: a
Object.defineProperty(o,'a',{
    configurable:true
});</pre>
</div>

&emsp;&emsp;有一个例外，设置Configurable:false后，只允许writable的状态从true变为false

<div>
<pre>var o = {a:1};
Object.defineProperty(o,'a',{
    configurable:false,
    writable:true
});
o.a = 2;
console.log(o.a);//2
Object.defineProperty(o,'a',{
    writable:false
});
//由于writable:false生效，对象a的o属性无法修改值，所以o.a=3的赋值语句静默失败
o.a = 3;
console.log(o.a);//2</pre>
</div>

&nbsp;

**可枚举性(Enumerable)**

&emsp;&emsp;可枚举性决定属性是否出现在对象的属性枚举中，具体来说，for-in循环、Object.keys方法、JSON.stringify方法是否会取到该属性

&emsp;&emsp;用户定义的普通属性默认是可枚举的，而原生继承的属性默认是不可枚举的

<div>
<pre>//由于原生继承的属性默认不可枚举，所以只取得自定义的属性a:1
var o = {a:1};
for(var i in o){
    console.log(o[i]);//1
}</pre>
</div>
<div>
<pre>//由于enumerable被设置为false，在for-in循环中a属性无法被枚举出来
var o = {a:1};
Object.defineProperty(o,'a',{enumerable:false});
for(var i in o){
    console.log(o[i]);//undefined
}</pre>
</div>

propertyIsEnumerable()

&emsp;&emsp;propertyIsEnumerable()方法用于判断对象的属性是否可枚举

<div>
<pre>var o = {a:1};
console.log(o.propertyIsEnumerable('a'));//true
Object.defineProperty(o,'a',{enumerable:false});
console.log(o.propertyIsEnumerable('a'));//false</pre>
</div>

&nbsp;

**get和set**

&emsp;&emsp;get是一个隐藏函数，在获取属性值时调用。set也是一个隐藏函数，在设置属性值时调用，它们的默认值都是undefined。Object.definedProperty()中的get和set对应于对象字面量中get和set方法

&emsp;&emsp;注意：getter和setter取代了数据属性中的value和writable属性

&emsp;&emsp;【1】给只设置get方法，没有设置set方法的对象赋值会静默失败，在严格模式下会报错

<div>
<pre>var o = {
    get a(){
        return 2;
    }
}    
console.log(o.a);//2
//由于没有设置set方法，所以o.a=3的赋值语句会静默失败
o.a = 3;
console.log(o.a);//2</pre>
</div>
<div>
<pre>Object.defineProperty(o,'a',{
    get: function(){
        return 2;
    }
})
console.log(o.a);//2
//由于没有设置set方法，所以o.a=3的赋值语句会静默失败
o.a = 3;
console.log(o.a);//2</pre>
</div>

&emsp;&emsp;在严格模式下，给没有设置set方法的访问器属性赋值会报错

<div>
<pre>'use strict';
var o = {
    get a(){
        return 2;
    }
}    
console.log(o.a);//2
//由于没有设置set方法，所以o.a=3的赋值语句会报错
//Uncaught TypeError: Cannot set property a of #&lt;Object&gt; which has only a getter
o.a = 3;</pre>
</div>
<div>
<pre>'use strict';
Object.defineProperty(o,'a',{
    get: function(){
        return 2;
    }
})
console.log(o.a);//2
//由于没有设置set方法，所以o.a=3的赋值语句会报错
//Uncaught TypeError: Cannot set property a of #&lt;Object&gt; which has only a getter
o.a = 3;</pre>
</div>

&emsp;&emsp;【2】只设置set方法，而不设置get方法，则对象属性值为undefined

<div>
<pre>var o = {
    set a(val){
        return 2;
    }
}    
o.a = 1;
console.log(o.a);//undefined</pre>
</div>
<div>
<pre>Object.defineProperty(o,'a',{
    set: function(){
        return 2;
    }
})
o.a = 1;
console.log(o.a);//undefined</pre>
</div>

&emsp;&emsp;【3】一般地，set和get方法是成对出现的

<div>
<pre>var o ={
    get a(){
        return this._a;
    },
    set a(val){
        this._a = val*2;
    }
}
o.a = 1;
console.log(o.a);//2</pre>
</div>
<div>
<pre>Object.defineProperty(o,'a',{
    get: function(){
        return this._a;
    },
    set :function(val){
        this._a = val*2;
    }
})
o.a = 1;
console.log(o.a);//2</pre>
</div>

&nbsp;

### 对象状态

&emsp;&emsp;属性描述符只能用来控制对象中一个属性的状态。而如果要控制对象的状态，就要用到下面的6种方法&nbsp;

**Object.preventExtensions()(禁止扩展)**

&emsp;&emsp;Object.preventExtensions()方法使一个对象无法再添加新的属性，并返回当前对象

**Object.isExtensible()(测试扩展)**

&emsp;&emsp;Object.isExtensible()方法用来检测该对象是否可以扩展

<div>
<pre>var o = {a:1};
console.log(Object.isExtensible(o));//true
o.b = 2;
console.log(o);//{a: 1, b: 2}
console.log(Object.preventExtensions(o));//{a: 1, b: 2}
//由于对象o禁止扩展，所以该赋值语句静默失败
o.c = 3;
console.log(Object.isExtensible(o));//false
console.log(o);//{a: 1, b: 2}</pre>
</div>

&emsp;&emsp;在严格模式下，给禁止扩展的对象添加属性会报TypeError错误

<div>
<pre>'use strict';
var o = {a:1};
console.log(Object.preventExtensions(o));//{a:1}
//Uncaught TypeError: Can't add property c, object is not extensible
o.c = 3;</pre>
</div>

&emsp;&emsp;Object.preventExtensions()方法并不改变对象中属性的描述符状态

<div>
<pre>var o = {a:1};
//{value: 1, writable: true, enumerable: true, configurable: true}
console.log(Object.getOwnPropertyDescriptor(o,'a'));
Object.preventExtensions(o);
//{value: 1, writable: true, enumerable: true, configurable: true}
console.log(Object.getOwnPropertyDescriptor(o,'a'));</pre>
</div>

&nbsp;

**Object.seal()(对象封印)**

&emsp;&emsp;对象封印又叫对象密封，使一个对象不可扩展并且所有属性不可配置，并返回当前对象

**Object.isSealed()(测试封印)**

&emsp;&emsp;Object.isSealed()方法用来检测该方法是否被封印

<div>
<pre>var o = {a:1,b:2};
console.log(Object.isSealed(o));//false
console.log(Object.seal(o));//{a:1,b:2}
console.log(Object.isSealed(o));//true
console.log(delete o.b);//false
o.c = 3;
console.log(o);//{a:1,b:2}</pre>
</div>

&emsp;&emsp;在严格模式下，删除旧属性或添加新属性都会报错

<div>
<pre>'use strict';
var o = {a:1,b:2};
console.log(Object.seal(o));//{a:1,b:2}
//Uncaught TypeError: Cannot delete property 'b' of #&lt;Object&gt;
delete o.b;</pre>
</div>

&emsp;&emsp;这个方法实际上会在现有对象上调用Object.preventExtensions()方法，并把所有现有属性的configurable描述符置为false

<div>
<pre>var o = {a:1,b:2};
//{value: 1, writable: true, enumerable: true, configurable: true}
console.log(Object.getOwnPropertyDescriptor(o,'a'));
console.log(Object.seal(o));//{a:1,b:2}
//{value: 1, writable: true, enumerable: true, configurable: false}
console.log(Object.getOwnPropertyDescriptor(o,'a'));</pre>
</div>

&nbsp;

**Object.freeze()(对象冻结)**

&emsp;&emsp;Object.freeze()方法使一个对象不可扩展，不可配置，也不可改写，变成一个仅可以枚举的只读常量，并返回当前对象

**Object.isFrozen()(检测冻结)**

&emsp;&emsp;Object.isFrozen()方法用来检测一个对象是否被冻结

<div>
<pre>var o = {a:1,b:2};
console.log(Object.isFrozen(o));//false
console.log(Object.freeze(o));//{a:1,b:2}
console.log(Object.isFrozen(o));//true
o.a = 3;
console.log(o);//{a:1,b:2}</pre>
</div>

&emsp;&emsp;在严格模式下，删除旧属性、添加新属性、更改现有属性都会报错

<div>
<pre>'use strict';
var o = {a:1,b:2};
console.log(Object.freeze(o));//{a:1,b:2}
//Uncaught TypeError: Cannot assign to read only property 'a' of object '#&lt;Object&gt;'
o.a = 3;</pre>
</div>

&emsp;&emsp;这个方法实际上会在现有对象上调用Object.seal()方法，并把所有现有属性的writable描述符置为false

<div>
<pre>var o = {a:1};
//{value: 1, writable: true, enumerable: true, configurable: true}
console.log(Object.getOwnPropertyDescriptor(o,'a'));
console.log(Object.freeze(o));//{a:1}
//{value: 1, writable: false, enumerable: true, configurable: false}
console.log(Object.getOwnPropertyDescriptor(o,'a'));</pre>
</div>

&nbsp;

## 参考资料

【1】 &nbsp;阮一峰Javascript标准参考教程&mdash;&mdash;属性描述对象 [http://javascript.ruanyifeng.com/stdlib/attributes.html](http://javascript.ruanyifeng.com/stdlib/attributes.html)

【2】《javascript权威指南(第6版)》第6章 对象

【3】《你不知道的javascript上卷》第3章 对象

【4】《javascript高级程序设计(第3版)》第6章 面向对象的程序设计

【5】《javascript面向对象精要》 第3章 理解对象
