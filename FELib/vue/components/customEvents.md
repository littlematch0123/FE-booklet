# Vue自定义事件

&emsp;&emsp;父组件使用[props](http://www.cnblogs.com/xiaohuochai/p/7388866.html)传递数据给子组件，子组件怎么跟父组件通信呢？这时，Vue的自定义事件就派上用场了。本文将详细介绍Vue自定义事件

&nbsp;

### 事件绑定

&emsp;&emsp;每个 Vue 实例都实现了事件接口 (Events interface)，即

<div>
<pre>使用 $on(eventName) 监听事件
使用 $emit(eventName) 触发事件</pre>
</div>

&emsp;&emsp;注意：Vue 的事件系统分离自浏览器的EventTarget API。尽管它们的运行类似，但是 `$on` 和 `$emit` **不是**`addEventListener` 和 `dispatchEvent` 的别名

&emsp;&emsp;另外，父组件可以在使用子组件的地方直接用 `v-on` 来监听子组件触发的事件

&emsp;&emsp;注意：不能用 `$on` 侦听子组件抛出的事件，而必须在模板里直接用 `v-on` 绑定
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;parent&gt;&lt;/parent&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
var childNode = {
  template: `&lt;button @click="incrementCounter"&gt;{{ counter }}&lt;/button&gt;`,
  data(){
    return {
      counter: 0
    }
  },
  methods:{
    incrementCounter(){
      this.counter ++;
      this.$emit('increment');
    }
  },
}
var parentNode = {
  template: `
  &lt;div class="parent"&gt;
    &lt;p&gt;{{total}}&lt;/p&gt;
    &lt;child @increment="incrementTotal"&gt;&lt;/child&gt;
    &lt;child @increment="incrementTotal"&gt;&lt;/child&gt;
  &lt;/div&gt;
  `,
  components: {
    'child': childNode
  },
  data(){
    return {
      'total':0
    }
  },
  methods:{
    incrementTotal(){
      this.total ++;
    }
  }
};
// 创建根实例
new Vue({
  el: '#example',
  components: {
    'parent': parentNode
  }
})
&lt;/script&gt;</pre>
</div>
<!-- {% endraw %} -->
<iframe style="width: 100%; height: 90px;" src="https://demo.xiaohuochai.site/vue/module/m9.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 命名约定

&emsp;&emsp;自定义事件的命名约定与[组件注册](http://www.cnblogs.com/xiaohuochai/p/7289430.html#anchor3)及[props](http://www.cnblogs.com/xiaohuochai/p/7388866.html#anchor2)的命名约定都不相同，由于自定义事件实质上也是属于HTML的属性，所以其在HTML模板中，最好使用中划线形式

<div>
<pre>&lt;child @pass-data="getData"&gt;&lt;/child&gt;</pre>
</div>

&emsp;&emsp;而子组件中触发事件时，同样使用中划线形式

<div>
<pre> this.$emit('pass-data',this.childMsg)</pre>
</div>

&nbsp;

### 数据传递

&emsp;&emsp;子组件通过$emit可以触发事件，第一个参数为要触发的事件，第二个事件为要传递的数据

<div>
<pre>this.$emit('pass-data',this.childMsg)</pre>
</div>

&emsp;&emsp;父组件通过$on监听事件，事件处理函数的参数则为接收的数据
<!-- {% raw %} -->
<div>
<pre>    getData(value){
      this.msg = value;
    }</pre>
</div>
<div>
<pre>&lt;div id="example"&gt;
  &lt;parent&gt;&lt;/parent&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
var childNode = {
  template: `
  &lt;div class="child"&gt;
    &lt;div&gt;
      &lt;span&gt;子组件数据&lt;/span&gt;
      &lt;input v-model="childMsg" @input="data"&gt;
    &lt;/div&gt;
    &lt;p&gt;{{childMsg}}&lt;/p&gt;
  &lt;/div&gt;
  `,
  data(){
    return{
      childMsg:''
    }
  },
  methods:{
    data(){
      this.$emit('pass-data',this.childMsg)
    }
  }
}
var parentNode = {
  template: `
  &lt;div class="parent"&gt;
    &lt;div&gt;
      &lt;span&gt;父组件数据&lt;/span&gt;
      &lt;input v-model="msg"&gt;
    &lt;/div&gt;
    &lt;p&gt;{{msg}}&lt;/p&gt;
    &lt;child @pass-data="getData"&gt;&lt;/child&gt;
  &lt;/div&gt;
  `,
  components: {
    'child': childNode
  },
  data(){
    return {
      'msg':'match'
    }
  },
  methods:{
    getData(value){
      this.msg = value;
    }
  }
};
// 创建根实例
new Vue({
  el: '#example',
  components: {
    'parent': parentNode
  }
})
&lt;/script&gt;</pre>
</div>
<!-- {% endraw %} -->
&emsp;&emsp;下面示例中，修改子组件中的input值，则父组件到接收到相同值，则显示出来

<iframe style="width: 100%; height: 160px;" src="https://demo.xiaohuochai.site/vue/module/m10.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### sync修饰符

&emsp;&emsp;在一些情况下，可能会需要对一个 prop 进行双向绑定。事实上，这正是Vue1.x中的 `.sync`修饰符所提供的功能。当一个子组件改变了一个 prop 的值时，这个变化也会同步到父组件中所绑定的值。这很方便，但也会导致问题，因为它破坏了单向数据流的假设。由于子组件改变 prop 的代码和普通的状态改动代码毫无区别，当光看子组件的代码时，完全不知道它何时悄悄地改变了父组件的状态。这在 debug 复杂结构的应用时会带来很高的维护成本，上面所说的正是在 2.0 中移除 `.sync` 的理由

&emsp;&emsp;从 2.3.0 起重新引入了 `.sync` 修饰符，但是这次它只是作为一个编译时的语法糖存在。它会被扩展为一个自动更新父组件属性的 `v-on` 侦听器

<div>
<pre>&lt;comp :foo.sync="bar"&gt;&lt;/comp&gt;</pre>
</div>

&emsp;&emsp;会被扩展为：

<div>
<pre>&lt;comp :foo="bar" @update:foo="val =&gt; bar = val"&gt;&lt;/comp&gt;</pre>
</div>

&emsp;&emsp;当子组件需要更新 `foo` 的值时，它需要显式地触发一个更新事件：

<div>
<pre>this.$emit('update:foo', newValue)</pre>
</div>

&emsp;&emsp;因此，可以使用.sync来简化自定义事件的操作，实现子组件向父组件的数据传递
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;parent&gt;&lt;/parent&gt;
&lt;/div&gt;
&lt;script src="https://unpkg.com/vue"&gt;&lt;/script&gt;
&lt;script&gt;
var childNode = {
  template: `
  &lt;div class="child"&gt;
    &lt;div&gt;子组件数据：{{childMsg}}&lt;/div&gt;
    &lt;input v-model="childMsg"&gt;
    &lt;button @click=add &gt;+1&lt;/button&gt;
  &lt;/div&gt;
  `,
  data(){
    return{
      childMsg: 0
    }
  },
  methods:{
    add(){
      this.childMsg++;
      this.$emit('update:foo',this.childMsg);
    }
  }
};
var parentNode = {
  template: `
  &lt;div class="parent"&gt;
    &lt;p&gt;父组件数据：{{msg}}&lt;/p&gt;
    &lt;child :foo.sync="msg"&gt;&lt;/child&gt;
  &lt;/div&gt;
  `,
  components: {
    'child': childNode
  },
  data(){
    return {
      'msg':0
    }
  }
};
// 创建根实例
new Vue({
  el: '#example',
  components: {
    'parent': parentNode
  }
})
&lt;/script&gt;</pre>
</div>
<!-- {% endraw %} -->
<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/vue/module/m11.html" frameborder="0" width="320" height="240"></iframe>

