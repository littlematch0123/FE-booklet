# 深入理解JSON对象

&emsp;&emsp;json(javascript object notation)全称是javascript对象表示法，它是一种数据交换的文本格式，而不是一种编程语言，用于读取结构化数据。2001年由Douglas Crockford提出，目的是取代繁琐笨重的XML格式。本文将详细介绍JSON的相关内容

&nbsp;

### 语法规则

&emsp;&emsp;JSON的语法可以表示以下三种类型的值

【1】简单值

&emsp;&emsp;简单值使用与javascript相同的语法，可以在JSON中表示字符串、数值、布尔值和null

&emsp;&emsp;字符串必须使用双引号表示，不能使用单引号。数值必须以十进制表示，且不能使用NaN和Infinity

&emsp;&emsp;注意：JSON不支持javascript中的特殊值undefined

<div>
<pre>//合格的简单值
5
"hello world"
true
null</pre>
</div>
<div>
<pre>//不合格的简单值
+0x1
'hello world'
undefined
NaN
Infinity</pre>
</div>

【2】对象

&emsp;&emsp;对象作为一种复杂数据类型，表示的是一组有序的键值对儿。而每个键值对儿中的值可以是简单值，也可以是复杂数据类型的值

&emsp;&emsp;与javascript的对象字面量相比，JSON有三个不同的地方

&emsp;&emsp;1、JSON没有变量的概念

&emsp;&emsp;2、JSON中，对象的键名必须放在双引号里面

&emsp;&emsp;3、因为JSON不是javascript语句，所以没有末尾的分号

&emsp;&emsp;注意：同一个对象中不应该出现两个同名属性

<div>
<pre>//合格的对象
{
    "name":"huochai",
    "age":29,
    "school":{
        "name":"diankeyuan",
        "location":"beijing"
    }
}</pre>
</div>
<div>
<pre>//不合格的对象
{ name: "张三", 'age': 32 }//属性名必须使用双引号
{};//不需要末尾的分号
{ "birthday": new Date('Fri, 26 Aug 2011 07:13:10 GMT'),
  "getName": function() {
      return this.name;
  }
} // 不能使用函数和日期对象</pre>
</div>

【3】数组

&emsp;&emsp;数组也是一种复杂数据类型，表示一组有序的值的列表，可以通过数值索引来访问其中的值。数组的值也可以是任意类型&mdash;&mdash;简单值、对象或数组

&emsp;&emsp;JSON数组也没有变量和分号，把数组和对象结合起来，可以构成更复杂的数据集合

&emsp;&emsp;注意：数组或对象最后一个成员的后面，不能加逗号

&nbsp;

## JSON对象

&emsp;&emsp;JSON之所以流行，是因为可以把JSON数据结构解析为有用的javascript对象

&emsp;&emsp;ECMAScript5对解析JSON的行为进行了规范，定义了全局对象JSON

&emsp;&emsp;注意：IE7-浏览器不支持

&emsp;&emsp;IE7-浏览器可以通过使用[json2.js](http://files.cnblogs.com/files/xiaohuochai/json2.js)文件来使用JSON

&emsp;&emsp;JSON对象有两个方法：stringify()和parse()。这两个方法分别用于把JavaScript对象序列化为JSON字符串和把JSON字符串解析为原生JavaScript值

&nbsp;

### stringify()

&emsp;&emsp;JSON.stringify()方法用于将一个值转为字符串。该字符串应该符合JSON格式，并且可以被JSON.parse()方法还原　

&emsp;&emsp;默认情况下，JSON.stringify()输出的JSON字符串不包括任何空格字符或缩进

<div>
<pre>var jsonObj = {
    "title":"javascript",
    "group":{
        "name":"jia",
        "tel":12345
    }
};
//{"title":"javascript","group":{"name":"jia","tel":12345}}
JSON.stringify(jsonObj);</pre>
</div>

**具体转换**

<div>
<pre>JSON.stringify('abc') // ""abc""
JSON.stringify(1) // "1"
JSON.stringify(false) // "false"
JSON.stringify([]) // "[]"
JSON.stringify({}) // "{}"
JSON.stringify([1, "false", false])// '[1,"false",false]'
JSON.stringify({ name: "张三" })// '{"name":"张三"}'</pre>
</div>

&emsp;&emsp;stringify()方法把正则表达式和数学对象转换成空对象的字符串形式

<div>
<pre>JSON.stringify(/foo/) // "{}"
JSON.stringify(Math) // "{}"</pre>
</div>

&emsp;&emsp;stringify()方法把日期对象和包装对象转换成字符串

<div>
<pre>JSON.stringify(new Boolean(true)) //"true"
JSON.stringify(new String('123')) //""123""
JSON.stringify(new Number(1)) //"1"
JSON.stringify(new Date()) //""2016-09-20T02:26:38.294Z""</pre>
</div>

&emsp;&emsp;如果对象的成员是undefined或函数，这个成员会被省略

&emsp;&emsp;如果数组的成员是undefined或函数，则这些值被转成null

<div>
<pre>JSON.stringify({
  a: function(){},
  b: undefined,
  c: [ function(){}, undefined ]
});
// "{"c":[null,null]}"</pre>
</div>

&emsp;&emsp;如果对象成员或数组成员中出现NaN或Infinity，则这些值被转换成null

<div>
<pre>console.log(JSON.stringify({
  a: NaN,
  b: Infinity,
  c: [ NaN,Infinity]
}));
//{"a":null,"b":null,"c":[null,null]}</pre>
</div>

&emsp;&emsp;JSON.stringify()方法会忽略对象的不可遍历属性

<div>
<pre>var obj = {};
Object.defineProperties(obj, {
  'foo': {
    value: 1,
    enumerable: true
  },
  'bar': {
    value: 2,
    enumerable: false
  }
});
JSON.stringify(obj); // {"foo":1}]</pre>
</div>

**参数**

&emsp;&emsp;JSON.stringify()除了要序列化的javascript对象外，还可以接收另外两个参数，这两个参数用于指定以不同的方式序列化javascript对象。第一个参数是个过滤器，可以是一个数组，也可以是一个函数；第二个参数是一个选项，表示是否在JSON字符串中保留缩进

【数组过滤器】

&emsp;&emsp;当stringify()方法的第二个参数是一个数组时，这时相当于实现一个过滤器的功能

&emsp;&emsp;【1】过滤器只对对象的第一层属性有效

<div>
<pre>var jsonObj = {
    "title":"javascript",
    "group":{
        "a":1
    }
};
//{"group":{"a":1}}
console.log(JSON.stringify(jsonObj,["group","a"]))</pre>
</div>

&emsp;&emsp;【2】过滤器对数组无效

<div>
<pre>var jsonObj =[1,2];
JSON.stringify(jsonObj,["0"])//"[1,2]"</pre>
</div>

【函数参数】

&emsp;&emsp;stringify()方法的第二个参数也可以是一个函数。传入的函数接收两个参数，属性(键)名和属性值

<div>
<pre>JSON.stringify({a:1,b:2}, function(key, value){
  if (typeof value === "number") {
    value = 2 * value;
  }
  return value;    
})
// "{"a":2,"b":4}"</pre>
</div>

&emsp;&emsp;属性名只能是字符串，而在值并非键值对儿结构的值时，键名可以是空字符串

&emsp;&emsp;这个函数参数会递归处理所有的键

&emsp;&emsp;下面代码中，对象o一共会被f函数处理三次。第一次键名为空，键值是整个对象o；第二次键名为a，键值是{b:1}；第三次键名为b，键值为1

<div>
<pre>JSON.stringify({a: {b: 1}}, function (key, value) {
  console.log("["+ key +"]:" + value);
  return value;
})
// []:[object Object]
// [a]:[object Object]
// [b]:1
// '{"a":{"b":1}}'    </pre>
</div>

&emsp;&emsp;函数返回的值就是相应键的值。如果函数返回了undefined或没有返回值，那么相应的属性会被忽略

<div>
<pre>JSON.stringify({ a: "abc", b: 123 }, function (key, value) {
  if (typeof(value) === "string") {
    return undefined;
  }
  return value;
})
// '{"b": 123}'</pre>
</div>

【缩进】

&emsp;&emsp;stringify()方法还可以接受第三个参数，用于增加返回的JSON字符串的可读性

&emsp;&emsp;如果是数字，表示每个属性前面添加的空格(最多不超过10个)

&emsp;&emsp;如果是字符串(不超过10个字符)，则该字符串会添加在每行前面

<div>
<pre>/*"{
  "p1": 1,
  "p2": 2
}"*/
JSON.stringify({ p1: 1, p2: 2 }, null, 2);</pre>
</div>
<div>
<pre>//"{"p1":1,"p2":2}"
JSON.stringify({ p1: 1, p2: 2 }, null, 0);</pre>
</div>
<div>
<pre>/*"{
|-"p1": 1,
|-"p2": 2
}"*/
JSON.stringify({ p1:1, p2:2 }, null, '|-');</pre>
</div>

**toJSON()**

&emsp;&emsp;有时候，JSON.stringify()还是不能满足对某些对象进行自定义序列化的需求。在这些情况下， 可以通过在对象上调用toJSON()方法，返回其自身的JSON数据格式

<div>
<pre>JSON.stringify({
  toJSON: function () {
    return "Cool"
  }
})
// ""Cool""</pre>
</div>
<div>
<pre>var o = {
  foo: 'foo',
  toJSON: function() {
    return 'bar';
  }
};
JSON.stringify({x: o});// '{"x":"bar"}'</pre>
</div>

&emsp;&emsp;如果toJSON()方法返回undefined，此时如果包含它的对象嵌入在另一个对象中，会导致该对象的值变成null。而如果包含它的对象是顶级对象，结果就是undefined

<div>
<pre>JSON.stringify({
  toJSON: function () {
    return undefined
  }
})
//undefined</pre>
</div>

&emsp;&emsp;Date对象部署了一个自己的toJSON方法，自动将Date对象转换成日期字符串

<div>
<pre>JSON.stringify(new Date("2016-08-29"))
// "2016-08-29T00:00:00.000Z"</pre>
</div>

&emsp;&emsp;toJSON方法的一个应用是，可以将正则对象自动转为字符串

<div>
<pre>RegExp.prototype.toJSON =RegExp.prototype.toString;
JSON.stringify(/foo/)// ""/foo/""</pre>
</div>

&emsp;&emsp;toJSON()可以作为函数过滤器的补充，因此理解序列化的内部顺序十分重要。假设把一个对象传入JSON.stringify()，序列化该对象的顺序如下

&emsp;&emsp;1、如果存在toJSON()方法而且能通过它取得有效的值，则调用该方法。否则，按默认顺序执行序列化

&emsp;&emsp;2、如果提供了第二个参数，应用这个函数过滤器。传入函数过滤器的值是第一步返回的值

&emsp;&emsp;3、对第二步返回的每个值进行相应的序列化

&emsp;&emsp;4、如果提供了第三个参数，执行相应的格式化

&nbsp;

### parse()

&emsp;&emsp;JSON.parse方法用于将JSON字符串转化成对象

<div>
<pre>JSON.parse('{}') // {}
JSON.parse('true') // true
JSON.parse('"foo"') // "foo"
JSON.parse('[1, 5, "false"]') // [1, 5, "false"]
JSON.parse('null') // null
var o = JSON.parse('{"name": "张三"}');
o.name // 张三</pre>
</div>

&emsp;&emsp;如果传入的字符串不是有效的JSON格式，JSON.parse方法将报错

<div>
<pre>//Uncaught SyntaxError: Unexpected token u in JSON at position 0(&hellip;)
JSON.parse("'String'") 
//Uncaught SyntaxError: Unexpected token u in JSON at position 0(&hellip;)
JSON.parse("undefined")</pre>
</div>

&emsp;&emsp;JSON.parse()方法也可以接收一个函数参数，在每个键值对儿上调用，这个函数被称为还原函数(reviver)。该函数接收两个参数，一个键和一个值，返回一个值

&emsp;&emsp;如果还原函数返回undefined，则表示要从结果中删除相应的键；如果返回其他值，则将该值插入到结果中

<div>
<pre>var o = JSON.parse('{"a":1,"b":2}', function(key, value) {
  if (key === ''){
    return value;
  }
  if (key === 'a') {
    return value + 10;
  }
});
o.a // 11
o.b // undefined</pre>
</div>

&emsp;&emsp;在将日期字符串转换为Date对象时，经常要用到还原函数

<div>
<pre>var book = {
    "title": "javascript",
    "date": new Date(2016,9,1)
}
var jsonStr = JSON.stringify(book);
//'{"title":"javascript","date":"2016-09-30T16:00:00.000Z"}''
console.log(jsonStr)
var bookCopy = JSON.parse(jsonStr,function(key,value){
    if(key == 'date'){
        return new Date(value);
    }
    return value;
})
console.log(bookCopy.date.getFullYear());//2016</pre>
</div>
<div>&nbsp;</div>

### eval()

&emsp;&emsp;实际上，[eval()](http://www.cnblogs.com/xiaohuochai/p/5724899.html)类似于JSON.parse()方法，可以将json字符串转换为json对象

<div>
<pre>eval('(' + '{"a":1}'+')').a;//1
JSON.parse('{"a":1}').a;//1</pre>
</div>

&emsp;&emsp;但是，eval()可以执行不符合JSON格式的代码，有可能会包含恶意代码

<div>
<pre>eval('(' + '{"a":alert(1)}'+')').a;//弹出1
JSON.parse('{"a":alert(1)}').a;//报错</pre>
</div>

&emsp;&emsp;所以，还是要尽量少使用eval()

&nbsp;

### 校验

&emsp;&emsp;正确的JSON格式需要符合一定的语法规则，使用jsonlint.com网站可以对JSON进行格式校验

![json](https://pic.xiaohuochai.site/blog/JS_ajaxAndStorge_json.png)

