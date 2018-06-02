# Vue自定义指令

&emsp;&emsp;除了默认设置的核心指令( `v-model` 和 `v-show` )，Vue 也允许注册自定义指令。在Vue里，代码复用的主要形式和抽象是组件。然而，有的情况下，仍然需要对纯 DOM 元素进行底层操作，这时候就会用到自定义指令。本文将详细介绍Vue自定义指令

&nbsp;

### 指令注册

&emsp;&emsp;以一个input元素自动获得焦点为例，当页面加载时，使用autofocus可以让元素将获得焦点 。但是autofocus在移动版Safari上不工作。现在注册一个使元素自动获取焦点的指令

&emsp;&emsp;指令注册类似于组件注册，包括全局指令和局部指令两种

【全局指令】

&emsp;&emsp;使用Vue.diretive()来全局注册指令

<div>
<pre>// 注册一个全局自定义指令 v-focus
Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})</pre>
</div>

【局部指令】

&emsp;&emsp;也可以注册局部指令，组件或Vue构造函数中接受一个 `directives` 的选项

<div>
<pre>var vm = new Vue({
  el: '#example',
  directives:{
    focus:{
      inserted: function (el) {
        el.focus()
      }      
    }
  }
})</pre>
</div>

&emsp;&emsp;然后可以在模板中任何元素上使用新的 `v-focus` 属性

<div>
<pre>&lt;div id="example"&gt;
  &lt;input v-focus&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
// 注册一个全局自定义指令 v-focus
Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
var vm = new Vue({
  el: '#example',
})
&lt;/script&gt;</pre>
</div>

![vue_base_customDirectives1](https://pic.xiaohuochai.site/blog/vue_base_customDirectives1.gif)


&nbsp;

### 钩子函数

&emsp;&emsp;指令定义函数提供了几个钩子函数（可选）

【bind】

&emsp;&emsp;只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作

【inserted】

&emsp;&emsp;被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）

【update】

&emsp;&emsp;所在组件的 VNode 更新时调用，**但是可能发生在其孩子的 VNode 更新之前**。指令的值可能发生了改变也可能没有。但是可以通过比较更新前后的值来忽略不必要的模板更新

【componentUpdated】

&emsp;&emsp;所在组件的 VNode **及其孩子的 VNode** 全部更新时调用

【unbind】

&emsp;&emsp;只调用一次， 指令与元素解绑时调用

&nbsp;

### 钩子函数参数

&emsp;&emsp;钩子函数被赋予了以下参数

【el】

&emsp;&emsp;指令所绑定的元素，可以用来直接操作 DOM

【binding】

&emsp;&emsp;一个对象，包含以下属性：

<div>
<pre>name: 指令名，不包括 v- 前缀。
value: 指令的绑定值， 例如： v-my-directive="1 + 1", value 的值是 2。
oldValue: 指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
expression: 绑定值的字符串形式。 例如 v-my-directive="1 + 1" ， expression 的值是 "1 + 1"。
arg: 传给指令的参数。例如 v-my-directive:foo， arg 的值是 "foo"。
modifiers: 一个包含修饰符的对象。 例如： v-my-directive.foo.bar, 修饰符对象 modifiers 的值是 { foo: true, bar: true }。</pre>
</div>

【vnode】

&emsp;&emsp;Vue 编译生成的虚拟节点

【oldVnode】

&emsp;&emsp;上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用

&emsp;&emsp;注意：除了 `el` 之外，其它参数都是只读的，尽量不要修改他们。如果需要在钩子之间共享数据，建议通过元素的 dataset 来进行

&emsp;&emsp;下面是一个使用了这些参数的自定义钩子样例

<div>
<pre>&lt;div id="example" v-demo:foo.a.b="message"&gt;&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
Vue.directive('demo', {
  bind: function (el, binding, vnode) {
    var s = JSON.stringify
    el.innerHTML =
      'name: '       + s(binding.name) + '&lt;br&gt;' +
      'value: '      + s(binding.value) + '&lt;br&gt;' +
      'expression: ' + s(binding.expression) + '&lt;br&gt;' +
      'argument: '   + s(binding.arg) + '&lt;br&gt;' +
      'modifiers: '  + s(binding.modifiers) + '&lt;br&gt;' +
      'vnode keys: ' + Object.keys(vnode).join(', ')
  }
})
new Vue({
  el: '#example',
  data: {
    message: 'hello!'
  }
})
&lt;/script&gt;</pre>
</div>

![vue_base_customDirectives2](https://pic.xiaohuochai.site/blog/vue_base_customDirectives2.png)


【函数简写】

&emsp;&emsp;大多数情况下，可能想在`bind`和`update`钩子上做重复动作，并且不想关心其它的钩子函数。可以这样写：

<div>
<pre>Vue.directive('color-swatch', function (el, binding) {
  el.style.backgroundColor = binding.value
})</pre>
</div>

【对象字面量】

&emsp;&emsp;如果指令需要多个值，可以传入一个JS对象字面量。指令函数能够接受所有合法类型的JS表达式

<div>
<pre>&lt;div v-demo="{ color: 'white', text: 'hello!' }"&gt;&lt;/div&gt;</pre>
</div>
<div>
<pre>Vue.directive('demo', function (el, binding) {
  console.log(binding.value.color) // =&gt; "white"
  console.log(binding.value.text)  // =&gt; "hello!"
})</pre>
</div>
