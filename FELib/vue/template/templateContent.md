# Vue模板内容

&emsp;&emsp;如果只使用Vue最基础的声明式渲染的功能，则完全可以把Vue当做一个模板引擎来使用。本文将详细介绍Vue模板内容

&nbsp;

### 概述

&emsp;&emsp;Vue.js使用了基于HTML的模板语法，允许声明式地将DOM绑定至底层Vue实例的数据。所有Vue.js的模板都是合法的HTML ，所以能被遵循规范的浏览器和HTML解析器解析

&emsp;&emsp;在底层的实现上，Vue将模板编译成虚拟DOM渲染函数。结合响应系统，在应用状态改变时， Vue能够智能地计算出重新渲染组件的最小代价并应用到DOM操作上

&emsp;&emsp;一般地，模板内容包括文本内容和元素特性

&nbsp;

### 文本渲染

【文本插值】

&emsp;&emsp;文本渲染最常见的形式是使用双大括号语法来进行文本插值，下面的message相当于一个变量或占位符，最终会表示为真正的文本内容　
<!-- {% raw %} -->
<div>
<pre>&lt;div id="app"&gt;
  {{ message }}
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
new Vue({
  el: '#app',
  data:{
      'message': '&lt;span&gt;测试内容&lt;/span&gt;'
  }
})
&lt;/script&gt;</pre>
</div>

![vue_template_content1](https://pic.xiaohuochai.site/blog/vue_template_content1.png)


【表达式插值】
<!-- {% raw %} -->
<div>
<pre>{{ number + 1 }}
{{ ok ? 'YES' : 'NO' }}
{{ message.split('').reverse().join('') }}</pre>
</div>
<!-- {% endraw %} -->
&emsp;&emsp;上面这些表达式会在所属Vue实例的数据作用域下作为JS被解析。有个限制就是，每个绑定都只能包含单个表达式，所以下面的例子都不会生效
<!-- {% raw %} -->
<div>
<pre>&lt;!-- 这是语句，不是表达式 --&gt;
{{ var a = 1 }}
&lt;!-- 流控制也不会生效，请使用三元表达式 --&gt;
{{ if (ok) { return message } }}</pre>
</div>
<!-- {% endraw %} -->
&emsp;&emsp;模板表达式都被放在沙盒中，只能访问全局变量的一个白名单，如`Math`和`Date`。不应该在模板表达式中试图访问用户定义的全局变量

&emsp;&emsp;注意：关于表达式与语句的区别[移步至此](http://www.cnblogs.com/xiaohuochai/p/5613593.html#anchor1)
<!-- {% raw %} -->
<div>
<pre>&lt;div id="app"&gt;
  {{ num + 1 }}
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
new Vue({
  el: '#app',
  data:{
      'num': -1
  }
})
&lt;/script&gt;</pre>
</div>

![vue_template_content2](https://pic.xiaohuochai.site/blog/vue_template_content2.png)


【v-text】

&emsp;&emsp;实现插值类似效果的另一种写法是使用v-text指令，该指令用于更新元素的innerText。如果要更新部分的innerText，需要使用模板插值

&emsp;&emsp;注意：v-text优先级高于模板插值的优先级

<div>
<pre>&lt;div id="app" v-text="message"&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
new Vue({
  el: '#app',
  data:{
       message:"This is a &lt;i&gt;simple&lt;/i&gt; document"
  }
})
&lt;/script&gt;</pre>
</div>

![vue_template_content3](https://pic.xiaohuochai.site/blog/vue_template_content3.png)


【v-html】

&emsp;&emsp;如果要输出真正的 HTML ，需要使用&nbsp;`v-html`&nbsp;指令，该指令用于更新元素的&nbsp;`innerHTML`

&emsp;&emsp;注意：在网站上动态渲染任意 HTML 是非常危险的，因为容易导致&nbsp;XSS 攻击。只在可信内容上使用&nbsp;`v-html`，而不用在用户提交的内容上

<div>
<pre>&lt;div id="app" v-html="message"&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
new Vue({
  el: '#app',
  data:{
       message:"This is a &lt;i&gt;simple&lt;/i&gt; document"
  }
})
&lt;/script&gt;</pre>
</div>

![vue_template_content4](https://pic.xiaohuochai.site/blog/vue_template_content4.png)


&nbsp;

### 静态插值

&emsp;&emsp;上面介绍了模板插值，一般地，模板插值是动态插值。即无论何时，绑定的数据对象上的占位符内容发生了改变，插值处的内容都会更新
<!-- {% raw %} -->
<div>
<pre>&lt;div id="app"&gt;  {{ message }}&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var vm = new Vue({
  el: '#app',
  data:{
      'message': '测试内容'
  }
})
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;结果如下图所示，vm.message的内容发生了改变，DOM结构中的元素内容也相应地更新


![vue_template_content5](https://pic.xiaohuochai.site/blog/vue_template_content5.gif)


【v-once】

&emsp;&emsp;如果要实现静态插值，即执行一次性插值，数据改变时，插值处内容不会更新，这时需要用到v-once指令
<!-- {% raw %} -->
<div>
<pre>&lt;div id="app" v-once&gt;{{ message }}&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var vm = new Vue({
  el: '#app',
  data:{
      'message': '测试内容'
  }
})
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;由下图所示，vm.message改变为123时，DOM结构中元素内容仍然是&ldquo;测试内容&rdquo;


![vue_template_content6](https://pic.xiaohuochai.site/blog/vue_template_content6.gif)


&nbsp;

### 不渲染

【v-pre】

&emsp;&emsp;如果要跳过这个元素和它的子元素的编译过程，只用来显示原始大括号及标识符，则可以使用v-pre指令。这样，可以减少编译时间
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example" v-pre&gt;{{message}}&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var vm = new Vue({
  el: '#example',
  data:{
    //如果使用v-pre指令，则不会被表示为match
    message:'match'
  },
})
&lt;/script&gt;</pre>
</div>

![vue_template_content7](https://pic.xiaohuochai.site/blog/vue_template_content7.png)


&nbsp;

### 隐藏未编译

&emsp;&emsp;一般地，使用模板差值时，页面上会显示大括号及占位符。编译完成后，再转换为真正的值。如果在网络条件不好的情况下，这种现象更加明显
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;{{message}}&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script src="https://unpkg.com/vue"&gt;&lt;/script&gt;
&lt;script&gt;
var vm = new Vue({
  el: '#example',
  data:{
    message:'match'
  },
})
&lt;/script&gt;</pre>
</div>

![vue_template_content8](https://pic.xiaohuochai.site/blog/vue_template_content8.gif)


【v-cloak】

&emsp;&emsp;这个指令保持在元素上直到关联实例结束编译。和 CSS 规则如 `[v-cloak] { display: none }` 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕
<!-- {% raw %} -->
<div>
<pre>&lt;style&gt;
[v-cloak]{display:none;} 
&lt;/style&gt;
&lt;div id="example" v-cloak&gt;{{message}}&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script src="https://unpkg.com/vue"&gt;&lt;/script&gt;
&lt;script&gt;
var vm = new Vue({
  el: '#example',
  data:{
    message:'match'
  },
})
&lt;/script&gt;</pre>
</div>

![vue_template_content9](https://pic.xiaohuochai.site/blog/vue_template_content9.gif)


　&nbsp;

### 特性渲染

&emsp;&emsp;[HTML](http://www.cnblogs.com/xiaohuochai/p/5203223.html)共有16个[全局属性](http://www.cnblogs.com/xiaohuochai/p/5033039.html)(或称为特性)，Vue.js支持对特性的内容进行动态渲染

&emsp;&emsp;注意：对象属性(property)和元素特性(attribute)的区别[移步至此](http://www.cnblogs.com/xiaohuochai/p/5817608.html)

&emsp;&emsp;特性渲染时不能使用双大括号语法
<!-- {% raw %} -->
<div>
<pre>&lt;div id="app" title={{my-title}}&gt;&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var vm = new Vue({
  el: '#app',
  data:{
      'my-title': '测试内容'
  }
})
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;使用上面代码时，控制台会显示如下错误


![vue_template_content10](https://pic.xiaohuochai.site/blog/vue_template_content10.png)


【v-bind】

&emsp;&emsp;上面的错误提示中提到，应该使用v-bind指令，通过v-bind指令可以动态地绑定一个或多个特性

&emsp;&emsp;在这里title是参数，告知`v-bind`指令将该元素的title属性与表达式message的值绑定

<div>
<pre>&lt;div id="app" v-bind:title="message"&gt;&lt;/div&gt;</pre>
</div>

&emsp;&emsp;由于v-bind指令非常常用，可缩写如下

<div>
<pre>&lt;div id="app" :title="message"&gt;&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
new Vue({
  el: '#app',
  data:{
       message:"我是小火柴"
  }
})
&lt;/script&gt;</pre>
</div>

![vue_template_content11](https://pic.xiaohuochai.site/blog/vue_template_content11.png)


&emsp;&emsp;对布尔值的属性也有效&mdash;&mdash;如果条件被求值为false，该属性会被移除

<div>
<pre>&lt;button id="app" :disabled="isButtonDisabled"&gt;按钮&lt;/button&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
var vm = new Vue({
  el: '#app',
  data:{
      'isButtonDisabled': true
  }
})
&lt;/script&gt;</pre>
</div>

![vue_template_content12](https://pic.xiaohuochai.site/blog/vue_template_content12.gif)


&nbsp;

### class绑定

&emsp;&emsp;数据绑定一个常见需求是操作元素的class列表和它的内联样式。因为它们都是属性 ，可以用`v-bind`处理它们：只需要计算出表达式最终的字符串。不过，字符串拼接麻烦又易错。因此，在`v-bind`用于`class`和`style`时， Vue.js 专门增强了它。表达式的结果类型除了字符串之外，还可以是对象或数组

&emsp;&emsp;绑定class包括对象语法、数组语法和组件绑定

【对象语法】

&emsp;&emsp;可以传给&nbsp;`v-bind:class`&nbsp;一个对象，以动态地切换 class&nbsp;

<div>
<pre>&lt;div v-bind:class="{ active: isActive }"&gt;&lt;/div&gt;</pre>
</div>

&emsp;&emsp;上面的语法表示 class&nbsp;`active`&nbsp;的更新将取决于数据属性&nbsp;`isActive`&nbsp;是否为真值&nbsp;

&emsp;&emsp;可以在对象中传入更多属性来动态切换多个class。`v-bind:class`指令可以与普通的class属性共存

<div>
<pre>&lt;div id="app" class="static"
     v-bind:class="{ active: isActive, 'text-danger': hasError }"&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
var app = new Vue({
  el: '#app',
  data:{
       isActive:true,
       hasError:false
  }
})
&lt;/script&gt;</pre>
</div>

![vue_template_content13](https://pic.xiaohuochai.site/blog/vue_template_content13.png)


&emsp;&emsp;当&nbsp;`isActive`&nbsp;或者&nbsp;`hasError`&nbsp;变化时，class 列表将相应地更新。例如，如果&nbsp;`hasError`的值为&nbsp;`true`&nbsp;， class列表将变为&nbsp;`"static active text-danger"`


![vue_template_content14](https://pic.xiaohuochai.site/blog/vue_template_content14.gif)


&emsp;&emsp;也可以直接绑定数据里的一个对象

<div>
<pre>&lt;div id="app" :class="classObject"&gt;&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
var app = new Vue({
  el: '#app',
  data:{
    classObject: {
      active: true,
      'text-danger': false
    }
  }
})
&lt;/script&gt;</pre>
</div>

![vue_template_content15](https://pic.xiaohuochai.site/blog/vue_template_content15.png)


&emsp;&emsp;也可以在这里绑定返回对象的计算属性。这是一个常用且强大的模式

<div>
<pre>&lt;div id="app" :class="classObject"&gt;&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
var app = new Vue({
  el: '#app',
  data: {
    isActive: true,
    error: null
  },
  computed: {
    classObject: function () {
      return {
        active: this.isActive &amp;&amp; !this.error,
        'text-danger': this.error &amp;&amp; this.error.type === 'fatal',
      }
    }
  }
})
&lt;/script&gt;</pre>
</div>

![vue_template_content16](https://pic.xiaohuochai.site/blog/vue_template_content16.png)


【数组语法】

&emsp;&emsp;可以把一个数组传给&nbsp;`v-bind:class`&nbsp;，以应用一个 class 列表

<div>
<pre>&lt;div id="app" :class="[activeClass, errorClass]"&gt;&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
var app = new Vue({
  el: '#app',
  data: {
    activeClass: 'active',
    errorClass: 'text-danger'
  }
})
&lt;/script&gt;</pre>
</div>

![vue_template_content17](https://pic.xiaohuochai.site/blog/vue_template_content17.png)


&emsp;&emsp;如果要根据条件切换列表中的 class ，可以用三元表达式

<div>
<pre>&lt;div id="app" :class="[isActive ? activeClass : '', errorClass]"&gt;&lt;/div&gt;</pre>
</div>

&emsp;&emsp;此例始终添加&nbsp;`errorClass`&nbsp;，但是只有在&nbsp;`isActive`&nbsp;是 true 时添加&nbsp;`activeClass`

&emsp;&emsp;不过，当有多个条件 class 时这样写有些繁琐。可以在数组语法中使用对象语法

<div>
<pre>&lt;div id="app" :class="[{ active: isActive }, errorClass]"&gt;&lt;/div&gt;</pre>
</div>

【组件绑定】

&emsp;&emsp;在一个定制组件上用到`class`属性时，这些类将被添加到根元素上面，这个元素上已经存在的类不会被覆盖

<div>
<pre>&lt;div id="app" class="test"&gt;
  &lt;my-component class="baz boo"&gt;&lt;/my-component&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
Vue.component('my-component', {
  template: '&lt;p class="foo bar"&gt;Hi&lt;/p&gt;'
})
var app = new Vue({
  el: '#app'
})
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;HTML 最终将被渲染为如下所示


![vue_template_content18](https://pic.xiaohuochai.site/blog/vue_template_content18.png)


&emsp;&emsp;同样的适用于绑定 HTML class

<div>
<pre>&lt;div id="app" class="test"&gt;
  &lt;my-component :class="{ active: isActive }"&gt;&lt;/my-component&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
Vue.component('my-component', {
  template: '&lt;p class="foo bar"&gt;Hi&lt;/p&gt;'
})
var app = new Vue({
  el: '#app',
  data:{
    isActive:true
  }
})
&lt;/script&gt;</pre>
</div>

![vue_template_content19](https://pic.xiaohuochai.site/blog/vue_template_content19.png)


&nbsp;

### style绑定

【对象语法】

&emsp;&emsp;`v-bind:style`的对象语法十分直观&mdash;&mdash;看着非常像 CSS ，其实它是一个JS对象。 CSS属性名可以用驼峰式 (camelCase)或(配合引号的)短横分隔命名 (kebab-case)

<div>
<pre>&lt;div id="app" :style="{ color: activeColor, fontSize: fontSize + 'px' }"&gt;&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
var app = new Vue({
  el: '#app',
  data: {
    activeColor: 'red',
    fontSize: 30
  }
})
&lt;/script&gt;</pre>
</div>

![vue_template_content20](https://pic.xiaohuochai.site/blog/vue_template_content20.png)


&emsp;&emsp;直接绑定到一个样式对象通常更好，让模板更清晰

<div>
<pre>&lt;div id="app" :style="styleObject"&gt;&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
var app = new Vue({
  el: '#app',
  data: {
    styleObject: {
      color: 'red',
      fontSize: '13px'
    }
  }
})
&lt;/script&gt;</pre>
</div>

【数组语法】

&emsp;&emsp;`v-bind:style`&nbsp;的数组语法可以将多个样式对象应用到一个元素上

<div>
<pre>&lt;div id="app" :style="[baseStyles, overridingStyles]"&gt;&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
var app = new Vue({
  el: '#app',
  data: {
    baseStyles: {
      color: 'red',
      fontSize: '13px'
    },
    overridingStyles:{
      height:'100px',
      width:'100px'
    }
  }
})
&lt;/script&gt;</pre>
</div>

![vue_template_content21](https://pic.xiaohuochai.site/blog/vue_template_content21.png)


【前缀】

&emsp;&emsp;当`v-bind:style`使用需要特定前缀的CSS属性时，如`transform`，Vue.js会自动侦测并添加相应的前缀

&emsp;&emsp;可以为&nbsp;`style`&nbsp;绑定中的属性提供一个包含多个值的数组，常用于提供多个带前缀的值

<div>
<pre>&lt;div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"&gt;</pre>
</div>

&emsp;&emsp;这会渲染数组中最后一个被浏览器支持的值。在这个例子中，如果浏览器支持不带浏览器前缀的 flexbox，那么渲染结果会是&nbsp;`display: flex`

&nbsp;

### 过滤器

&emsp;&emsp;Vue.js允许自定义过滤器，可被用作一些常见的文本格式化。过滤器可以用在两个地方：模板插值和`v-bind`表达式。过滤器应该被添加在JS表达式的尾部，由&ldquo;管道&rdquo;符指示
<!-- {% raw %} -->
<div>
<pre>{{ message | capitalize }}
&lt;div v-bind:id="rawId | formatId"&gt;&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
&emsp;&emsp;过滤器设计目的是用于文本转换。为了在其他指令中实现更复杂的数据变换，应该使用计算属性

&emsp;&emsp;过滤器有两种注册形式

&emsp;&emsp;1、一种是使用Vue.filter()方法

<div>
<pre>// 注册
Vue.filter('my-filter', function (value) {
  // 返回处理后的值
})
// getter，返回已注册的过滤器
var myFilter = Vue.filter('my-filter')</pre>
</div>

&emsp;&emsp;2、另一种是在Vue构造函数或组件中使用filters参数

<div>
<pre>var app = new Vue({
  el: '#app',
  filters: {
    'my-filter': function (value) {
      //
    }
  }
})</pre>
</div>

&emsp;&emsp;过滤器函数总接受表达式的值 (之前的操作链的结果) 作为第一个参数。在这个例子中，`capitalize`&nbsp;过滤器函数将会收到&nbsp;`message`&nbsp;的值作为第一个参数
<!-- {% raw %} -->
<div>
<pre>&lt;div id="app"&gt;
  {{ message}} 
  {{ message | capitalize }}  
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var app = new Vue({
  el: '#app',
  data:{
    message: '小火柴'
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.split('').reverse().join('')
    }
  }
})
&lt;/script&gt;</pre>
</div>

![vue_template_content22](https://pic.xiaohuochai.site/blog/vue_template_content22.png)


&emsp;&emsp;过滤器可以串联
<!-- {% raw %} -->
<div>
<pre>{{ message | filterA | filterB }}</pre>
</div>
<!-- {% endraw %} -->
&emsp;&emsp;在这个例子中，`filterA`&nbsp;拥有单个参数，它会接收&nbsp;`message`&nbsp;的值，然后调用&nbsp;`filterB`，且&nbsp;`filterA`&nbsp;的处理结果将会作为&nbsp;`filterB`&nbsp;的单个参数传递进来
<!-- {% raw %} -->
<div>
<pre>&lt;div id="app"&gt;
  {{ message}} 
  {{ message | filterA | filterB }} 
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var app = new Vue({
  el: '#app',
  data:{
    message: '小火柴'
  },
  filters: {
    filterA: function (value) {
      return value.split('').reverse().join('')
    },
    filterB: function(value){
      return value.length
    }
  }
})
&lt;/script&gt;</pre>
</div>

![vue_template_content23](https://pic.xiaohuochai.site/blog/vue_template_content23.png)


&emsp;&emsp;过滤器是JS函数，因此可以接受参数
<!-- {% raw %} -->
<div>
<pre>{{ message | filterA('arg1', arg2) }}</pre>
</div>
<!-- {% endraw %} -->
&emsp;&emsp;这里，`filterA`&nbsp;是个拥有三个参数的函数。`message`&nbsp;的值将会作为第一个参数传入。字符串&nbsp;`'arg1'`&nbsp;将作为第二个参数传给&nbsp;`filterA`，表达式&nbsp;`arg2`&nbsp;的值将作为第三个参数
<!-- {% raw %} -->
<div>
<pre>&lt;div id="app"&gt;
  {{ message}} 
  {{ message | filterA('arg1', arg) }}
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var app = new Vue({
  el: '#app',
  data:{
    message: '小火柴',
    arg: 'abc'
  },
  filters: {
    filterA: function (value,arg1,arg2) {
      return value + arg1 + arg2
    }
  }
})
&lt;/script&gt;</pre>
</div>

![vue_template_content24](https://pic.xiaohuochai.site/blog/vue_template_content24.png)


&emsp;&emsp;下面是过滤器在v-bind表达式中使用的一个例子

<div>
<pre>&lt;div id="app" :class="raw | format"&gt;&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
var app = new Vue({
  el: '#app',
  data:{
    raw: 'active'
  },
  filters: {
    format: function (value) {
      return value.split('').reverse().join('')
    }
  }
})
&lt;/script&gt;</pre>
</div>

![vue_template_content25](https://pic.xiaohuochai.site/blog/vue_template_content25.png)


