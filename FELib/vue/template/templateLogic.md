# Vue模板逻辑

&emsp;&emsp;[上一篇](http://www.cnblogs.com/xiaohuochai/p/7293881.html)介绍了Vue的模板内容，而对于一般的模板引擎来说，除了模板内容，还包括模板逻辑。常用的模板逻辑包括条件和循环。本文将详细介绍Vue模板逻辑

&nbsp;

### 条件渲染

&emsp;&emsp;在Vue中，实现条件逻辑依靠条件指令，包括v-if、v-else、v-else-if这三个

【v-if】

&emsp;&emsp;根据表达式的值的真假条件渲染元素。赋值为true时，将元素插入DOM中， 否则对应元素从DOM中移除

&emsp;&emsp;因此，Vue里的v-if指令类似于模板引擎的if条件语句
<!-- {% raw %} -->
<div>
<pre>&lt;div id="app" v-if="seen"&gt;
  {{ message }}
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
&emsp;&emsp;上面代码中，如果"seen"的值为true，则"#app"元素显示，否则将从DOM中移除

<div>
<pre>&lt;script&gt;
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    seen:true
  }
})
&lt;/script&gt;</pre>
</div>

![vue_template_logic1](https://pic.xiaohuochai.site/blog/vue_template_logic1.gif)


&emsp;&emsp;如果想切换多个元素，可以把一个`<template>`元素当做包装元素，并在上面使用`v-if`。最终的渲染结果不会包含`<template>`元素

<div>
<pre>&lt;div id="app"&gt;
  &lt;template v-if="ok"&gt;
    &lt;h1&gt;Title&lt;/h1&gt;
    &lt;p&gt;Paragraph 1&lt;/p&gt;
    &lt;p&gt;Paragraph 2&lt;/p&gt;
  &lt;/template&gt; 
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
var app = new Vue({
  el: '#app',
  data:{
    ok:true
  }
})
&lt;/script&gt;</pre>
</div>

![vue_template_logic2](https://pic.xiaohuochai.site/blog/vue_template_logic2.png)


【v-else-if】

&emsp;&emsp;表示&nbsp;`v-if`&nbsp;的 &ldquo;else if 块&rdquo;。可以链式调用。前一兄弟元素必须有&nbsp;`v-if`&nbsp;或&nbsp;`v-else-if`

【v-else】

&emsp;&emsp;为&nbsp;`v-if`&nbsp;或者&nbsp;`v-else-if`&nbsp;添加 &ldquo;else 块&rdquo;。&nbsp;前一兄弟元素必须有&nbsp;`v-if`&nbsp;或&nbsp;`v-else-if`

&emsp;&emsp;下面代码中，当type='A'时，显示内容为A的div；当type='B'时，显示内容为B的div；当type='C'时，显示内容为C的div；否则，显示内容为D的div

<div>
<pre>&lt;div v-if="type === 'A'"&gt;A&lt;/div&gt;
&lt;div v-else-if="type === 'B'"&gt;B&lt;/div&gt;
&lt;div v-else-if="type === 'C'"&gt;C&lt;/div&gt;
&lt;div v-else&gt;D&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
var app = new Vue({
    el: "#app",
  data: {
    type:'A'
  }
})
&lt;/script&gt;</pre>
</div>

![vue_template_logic3](https://pic.xiaohuochai.site/blog/vue_template_logic3.gif)


&nbsp;

### 元素不复用

&emsp;&emsp;Vue会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。这么做，除了使 Vue 变得非常快之外，还有一些有用的好处

&emsp;&emsp;例如，如果允许用户在不同的登录方式之间切换

<div>
<pre>&lt;div id="app"&gt;
  &lt;template v-if="loginType === 'username'"&gt;
    &lt;label&gt;Username&lt;/label&gt;
    &lt;input placeholder="输入用户名"&gt;
  &lt;/template&gt;
  &lt;template v-else&gt;
    &lt;label&gt;Email&lt;/label&gt;
    &lt;input placeholder="输入邮箱地址"&gt;
  &lt;/template&gt;
  &lt;div&gt;
    &lt;button @click="toggle"&gt;切换登录方式&lt;/button&gt;
  &lt;/div&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
var app = new Vue({
  el: '#app',
  data:{
    loginType:'username'
  },
  methods:{
    toggle(){
      if(this.loginType === 'username'){
        this.loginType = '';
      }else{
        this.loginType = 'username';
      }
    }
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/vue/template/t1.html" frameborder="0" width="320" height="240"></iframe>

【key属性】

&emsp;&emsp;这样也不总是符合实际需求，所以Vue提供了一种方式来声明&ldquo;这两个元素是完全独立的&mdash;&mdash;不要复用它们&rdquo;。只需添加一个具有唯一值的`key`属性即可

<div>
<pre>&lt;div id="app"&gt;
  &lt;template v-if="loginType === 'username'"&gt;
    &lt;label&gt;Username&lt;/label&gt;
    &lt;input placeholder="输入用户名" key="username-input"&gt;
  &lt;/template&gt;
  &lt;template v-else&gt;
    &lt;label&gt;Email&lt;/label&gt;
    &lt;input placeholder="输入邮箱地址" key="email-input"&gt;
  &lt;/template&gt;
  &lt;div&gt;
    &lt;button @click="toggle"&gt;切换登录方式&lt;/button&gt;
  &lt;/div&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
var app = new Vue({
  el: '#app',
  data:{
    loginType:'username'
  },
  methods:{
    toggle(){
      if(this.loginType === 'username'){
        this.loginType = '';
      }else{
        this.loginType = 'username';
      }
    }
  }
})
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;现在，每次切换时，输入框都将被重新渲染

&emsp;&emsp;注意：`<label>`&nbsp;元素仍然会被高效地复用，因为它们没有添加&nbsp;`key`&nbsp;属性

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/vue/template/t2.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 元素显隐

【v-show】

&emsp;&emsp;根据表达式的真假值，切换元素的`display`属性。当v-show被赋值为true时，元素显示；否则，元素被隐藏

&emsp;&emsp;v-show和v-if指令都有元素显隐的功能，但其原理并不相同。v-if的元素显隐会将元素从DOM删除或插入；而v-show则只是改变该元素的display是否为none

&emsp;&emsp;注意：`v-show`&nbsp;不支持&nbsp;`<template>`&nbsp;语法，也不支持&nbsp;`v-else`

**v-if vs v-show**

&emsp;&emsp;v-if是&ldquo;真正的&rdquo;条件渲染，因为它确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。v-if是惰性的：如果在初始渲染时条件为假，则什么也不做&mdash;&mdash;直到条件第一次变为真，才开始渲染条件块

&emsp;&emsp;而`v-show`就简单得多&mdash;&mdash;不管初始条件是什么，元素总是会被渲染，并且只是简单地基于CSS进行切换

&emsp;&emsp;一般来说，&nbsp;`v-if`有更高的切换开销，而`v-show`有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用`v-show`较好；如果在运行时条件不太可能改变，则使用`v-if`较好

<div>
<pre>&lt;div id="app"&gt;
    &lt;div v-if="num &gt; 0"&gt;if&lt;/div&gt;
    &lt;div v-show="num &gt; 0"&gt;show&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

&emsp;&emsp;上面代码中，如果num&gt;0，则内容为if和内容为show的div都显示；否则都不显示

<div>
<pre>&lt;script&gt;
var app = new Vue({
    el: "#app",
  data: {
    num: 1
  }
})
&lt;/script&gt;</pre>
</div>

![vue_template_logic4](https://pic.xiaohuochai.site/blog/vue_template_logic4.gif)


&emsp;&emsp;上图所示，当num=0时，内容为if的div直接从DOM移除，而内容为show的div的display为none

&nbsp;

### 循环渲染

【v-for】

&emsp;&emsp;v-for指令基于源数据多次渲染元素或模板块，包含以下用法

**数组迭代**

&emsp;&emsp;用&nbsp;`v-for`&nbsp;指令根据一组数组的选项列表进行渲染。&nbsp;`v-for`&nbsp;指令需要以&nbsp;`item in items`&nbsp;形式的特殊语法，&nbsp;`items`&nbsp;是源数据数组并且&nbsp;`item`&nbsp;是数组元素迭代的别名
<!-- {% raw %} -->
<div>
<pre>v-for="item in items"</pre>
</div>
<div>
<pre>&lt;ul id="example-1"&gt;
  &lt;li v-for="item in items"&gt;
    {{ item.message }}
  &lt;/li&gt;
&lt;/ul&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var example1 = new Vue({
  el: '#example-1',
  data: {
    items: [
      {message: 'Foo' },
      {message: 'Bar' }
    ]
  }
})
&lt;/script&gt;</pre>
</div>

![vue_template_logic5](https://pic.xiaohuochai.site/blog/vue_template_logic5.png)


&emsp;&emsp;在`v-for`块中，拥有对父作用域属性的完全访问权限。`v-for`还支持一个可选的第二个参数为当前项的索引
<!-- {% raw %} -->
<div>
<pre>v-for="(item, index) in items"</pre>
</div>
<div>
<pre>&lt;ul id="example-2"&gt;
  &lt;li v-for="(item, index) in items"&gt;
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  &lt;/li&gt;
&lt;/ul&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var example2 = new Vue({
  el: '#example-2',
  data: {
    parentMessage: 'Parent',
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
&lt;/script&gt;</pre>
</div>

![vue_template_logic6](https://pic.xiaohuochai.site/blog/vue_template_logic6.png)


&emsp;&emsp;也可以用&nbsp;`of`&nbsp;替代&nbsp;`in`&nbsp;作为分隔符，它是最接近JS迭代器的语法
<!-- {% raw %} -->
<div>
<pre>&lt;ul id="example-2"&gt;
  &lt;li v-for="(item, index) of items"&gt;
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  &lt;/li&gt;
&lt;/ul&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var example2 = new Vue({
  el: '#example-2',
  data: {
    parentMessage: 'Parent',
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
&lt;/script&gt;</pre>
</div>

![vue_template_logic7](https://pic.xiaohuochai.site/blog/vue_template_logic7.png)


&emsp;&emsp;和v-if模板一样，也可以用带有`v-for`的`<template>`标签来渲染多个元素块
<!-- {% raw %} -->
<div>
<pre>&lt;ul id="example-2"&gt;
  &lt;template v-for="item in items"&gt;
    &lt;li&gt;{{ item.message }}&lt;/li&gt;
    &lt;li&gt;abc&lt;/li&gt;
  &lt;/template&gt;
&lt;/ul&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var example2 = new Vue({
  el: '#example-2',
  data: {
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
&lt;/script&gt;</pre>
</div>

![vue_template_logic8](https://pic.xiaohuochai.site/blog/vue_template_logic8.png)


**对象迭代**

&emsp;&emsp;可以用&nbsp;`v-for`&nbsp;通过一个对象的属性来迭代，第二个参数为键名，第三个参数为索引
<!-- {% raw %} -->
<div>
<pre>v-for="(value, key, index) in object"</pre>
</div>
<div>
<pre>&lt;ul id="repeat-object" class="demo"&gt;
  &lt;li v-for="(value, key, index) in object"&gt;
    {{ index }}. {{ key }} : {{ value }}
  &lt;/li&gt;
&lt;/ul&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
new Vue({
  el: '#repeat-object',
  data: {
    object: {
      firstName: 'John',
      lastName: 'Doe',
      age: 30
    }
  }
})
&lt;/script&gt;</pre>
</div>

![vue_template_logic9](https://pic.xiaohuochai.site/blog/vue_template_logic9.png)


**整数迭代**

&emsp;&emsp;v-for&nbsp;也可以取整数。在这种情况下，它将重复多次模板

&emsp;&emsp;注意：整数迭代是从1开始，而不是从0开始的
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;span v-for="n in 10"&gt;{{ n }} &lt;/span&gt;
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var example = new Vue({
  el: '#example'
})
&lt;/script&gt;</pre>
</div>

![vue_template_logic10](https://pic.xiaohuochai.site/blog/vue_template_logic10.png)


【组件】

&emsp;&emsp;在自定义组件里，可以像任何普通元素一样用`v-for`

<div>
<pre>&lt;my-component v-for="item in items" :key="item.id"&gt;&lt;/my-component&gt;</pre>
</div>

&emsp;&emsp;注意：2.2.0+ 的版本里，当在组件中使用 `v-for` 时，`key` 现在是必须的

&emsp;&emsp;然而不能自动传递数据到组件里，因为组件有自己独立的作用域。为了传递迭代数据到组件里，要用 `props`

&emsp;&emsp;不自动注入 `item` 到组件里的原因是，因为这使得组件会紧密耦合到 `v-for` 如何运作。在一些情况下，明确数据的来源可以使组件可重用

<div>
<pre>&lt;div id="example"&gt;
  &lt;my-component v-for="(item,index) in items" :msg="item.message" :index="index" :key="item.id"&gt;&lt;/my-component&gt;
&lt;/div&gt;</pre>
</div>
<!-- {% raw %} -->
<div>
<pre>&lt;script&gt;
// 注册
Vue.component('my-component', {
  template: '&lt;div&gt;{{index}}.{{msg}}&lt;/div&gt;',
  props:['index','msg']
})
// 创建根实例
new Vue({
  el: '#example',
  data(){
    return {
      items: [
        {id:1, message: 'Foo' },
        {id:2, message: 'Bar' },
        {id:3, message: 'Baz' },
      ]
    }
  }
})
&lt;/script&gt;</pre>
</div>
<!-- {% endraw %} -->

![vue_template_logic11](https://pic.xiaohuochai.site/blog/vue_template_logic11.png)


【v-for with v-if】

&emsp;&emsp;当它们处于同一节点，`v-for`的优先级比`v-if`更高，这意味着`v-if`将分别重复运行于每个`v-for`循环中。当想为仅有的一些项渲染节点时，这种优先级的机制会十分有用
<!-- {% raw %} -->
<div>
<pre>&lt;ul id="example"&gt;
  &lt;li v-for="item in items" v-if="item.isShow"&gt;
    {{ item.message }}
  &lt;/li&gt;
&lt;/ul&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
var example = new Vue({
  el: '#example',
  data: {
    items: [
      {isShow: true,message: 'Foo' },
      {isShow: false,message: 'Bar' },
      {isShow: true,message: 'Baz' }
    ]
  }
})
&lt;/script&gt;</pre>
</div>
<!-- {% endraw %} -->

![vue_template_logic12](https://pic.xiaohuochai.site/blog/vue_template_logic12.png)


&emsp;&emsp;如果要有条件地跳过循环的执行，那么将 `v-if` 置于包装元素 (或 `<template>`)上
<!-- {% raw %} -->
<div>
<pre>&lt;ul id="example" v-if="isShow"&gt;
  &lt;li v-for="(item,index) in items" &gt;
    {{ item.message }}
  &lt;/li&gt;
&lt;/ul&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var example = new Vue({
  el: '#example',
  data: {
    isShow:true,
    items: [
      {message: 'Foo' },
      {message: 'Bar' },
      {message: 'Baz' }
    ]
  }
})
&lt;/script&gt;</pre>
</div>

![vue_template_logic13](https://pic.xiaohuochai.site/blog/vue_template_logic13.png)


【key】

&emsp;&emsp;当Vue.js用`v-for`正在更新已渲染过的元素列表时，它默认用 &ldquo;就地复用&rdquo; 策略。如果数据项的顺序被改变，Vue将不是移动DOM元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素

&emsp;&emsp;这个默认的模式是高效的，但是只适用于不依赖子组件状态或临时DOM状态(如表单输入值)的列表渲染输出

&emsp;&emsp;为了给Vue一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，需要为每项提供一个唯一`key`属性。理想的`key`值是每项都有唯一id。它的工作方式类似于一个属性，所以需要用 `v-bind` 来绑定动态值

<div>
<pre>&lt;div v-for="item in items" :key="item.id"&gt;
  &lt;!-- 内容 --&gt;
&lt;/div&gt;</pre>
</div>

&emsp;&emsp;建议尽可能使用`v-for`来提供 `key` ，除非迭代DOM内容足够简单，或者要依赖于默认行为来获得性能提升。key是Vue识别节点的一个通用机制，`key`并不特别与`v-for`关联

