# Vue响应式原理

&emsp;&emsp;Vue最显著的特性之一便是不太引人注意的响应式系统(reactivity system)。模型层(model)只是普通JS对象，修改它则更新视图(view)。这会让状态管理变得非常简单且直观，不过理解它的工作原理以避免一些常见的问题也是很重要的。本文将详细介绍Vue响应式系统的底层细节

&nbsp;

### 追踪变化

&emsp;&emsp;把一个普通JS对象传给Vue实例的`data`选项，Vue将遍历此对象所有的属性，并使用Object.defineProperty把这些属性全部转为getter/setter。Object.defineProperty是仅ES5支持，且无法shim的特性，这也就是为什么Vue不支持IE8浏览器的原因

&emsp;&emsp;用户看不到getter/setter，但是在内部它们让Vue追踪依赖，在属性被访问和修改时通知变化

&emsp;&emsp;每个组件实例都有相应的**watcher**实例对象，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的`setter`被调用时，会通知`watcher`重新计算，从而致使它关联的组件得以更新

![vue_base_reactivity1](https://pic.xiaohuochai.site/blog/vue_base_reactivity1.png)

&nbsp;

### 变化检测

&emsp;&emsp;受现代JS的限制（以及废弃 `Object.observe`），Vue**不能检测到对象属性的添加或删除**。由于Vue会在初始化实例时对属性执行 `getter/setter`转化过程，所以属性必须在`data`对象上存在才能让Vue转换它，这样才能让它是响应的

<div>
<pre>var vm = new Vue({
  data:{
  &emsp;&emsp;a:1
  }
})
// `vm.a` 是响应的
vm.b = 2
// `vm.b` 是非响应的</pre>
</div>

&emsp;&emsp;Vue不允许在已经创建的实例上动态添加新的根级响应式属性(root-level reactive property)。然而它可以使用 `Vue.set(object, key, value)` 方法将响应属性添加到嵌套的对象上

<div>
<pre>Vue.set(vm.someObject, 'b', 2)</pre>
</div>

&emsp;&emsp;也可以使用 `vm.$set` 实例方法，这也是全局 `Vue.set` 方法的别名

<div>
<pre>this.$set(this.someObject,'b',2)</pre>
</div>

&emsp;&emsp;有时想向已有对象上添加一些属性，例如使用`Object.assign()`或 `_.extend()`方法来添加属性。但是，添加到对象上的新属性不会触发更新。在这种情况下可以创建一个新的对象，让它包含原对象的属性和新的属性

<div>
<pre>// 代替 `Object.assign(this.someObject, { a: 1, b: 2 })`
this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })</pre>
</div>

&nbsp;

### 声明响应式属性

&emsp;&emsp;由于Vue不允许动态添加根级响应式属性，所以必须在初始化实例前声明根级响应式属性，哪怕只是一个空值
<!-- {% raw %} -->
<div>
<pre>var vm = new Vue({
  data: {
    // 声明 message 为一个空值字符串
    message: ''
  },
  template: '&lt;div&gt;{{ message }}&lt;/div&gt;'
})
// 之后设置 `message` 
vm.message = 'Hello!'</pre>
</div>
<!-- {% endraw %} -->
&emsp;&emsp;如果在data选项中未声明 `message`，Vue将警告渲染函数在试图访问的属性不存在

&emsp;&emsp;这样的限制在背后是有其技术原因的，它消除了在依赖项跟踪系统中的一类边界情况，也使Vue实例在类型检查系统的帮助下运行的更高效。而且在代码可维护性方面也有一点重要的考虑：`data` 对象就像组件状态的概要，提前声明所有的响应式属性，可以让组件代码在以后重新阅读或其他开发人员阅读时更易于被理解

&nbsp;

### 异步更新队列

&emsp;&emsp;Vue**异步**执行DOM更新。只要观察到数据变化，Vue将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。如果同一个watcher被多次触发，只会一次推入到队列中。这种在缓冲时去除重复数据对于避免不必要的计算和DOM操作上非常重要。然后，在下一个的事件循环&ldquo;tick&rdquo;中，Vue刷新队列并执行实际（已去重的）工作。Vue在内部尝试对异步队列使用原生的`Promise.then`和`MutationObserver`，如果执行环境不支持，会采用`setTimeout(fn, 0)`代替

&emsp;&emsp;例如，当设置`vm.someData='new value'`，该组件不会立即重新渲染。当刷新队列时，组件会在事件循环队列清空时的下一个&ldquo;tick&rdquo;更新。多数情况不需要关心这个过程，但是如果想在DOM状态更新后做点什么，这就可能会有些棘手。虽然Vue.js通常鼓励开发人员沿着&ldquo;数据驱动&rdquo;的方式思考，避免直接接触 DOM，但是有时确实要这么做。为了在数据变化之后等待Vue完成更新DOM ，可以在数据变化之后立即使用`Vue.nextTick(callback)` 。这样回调函数在DOM更新完成后就会调用
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;{{message}}&lt;/div&gt;</pre>
</div>
<div>
<pre>var vm = new Vue({
  el: '#example',
  data: {
    message: '123'
  }
})
vm.message = 'new message' // 更改数据
vm.$el.textContent === 'new message' // false
Vue.nextTick(function () {
  vm.$el.textContent === 'new message' // true
})</pre>
</div>
<!-- {% endraw %} -->
&emsp;&emsp;在组件内使用`vm.$nextTick()`实例方法特别方便，因为它不需要全局`Vue`，并且回调函数中的`this`将自动绑定到当前的Vue实例上：
<!-- {% raw %} -->
<div>
<pre>Vue.component('example', {
  template: '&lt;span&gt;{{ message }}&lt;/span&gt;',
  data: function () {
    return {
      message: '没有更新'
    }
  },
  methods: {
    updateMessage: function () {
      this.message = '更新完成'
      console.log(this.$el.textContent) // =&gt; '没有更新'
      this.$nextTick(function () {
        console.log(this.$el.textContent) // =&gt; '更新完成'
      })
    }
  }
})</pre>
</div>
<!-- {% endraw %} -->
