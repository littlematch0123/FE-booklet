# Vue状态管理vuex

&emsp;&emsp;由于多个状态分散的跨越在许多组件和交互间各个角落，大型应用复杂度也经常逐渐增长。为了解决这个问题，Vue提供了vuex。本文将详细介绍Vue状态管理vuex

&nbsp;

### 引入

&emsp;&emsp;当访问数据对象时，一个 Vue 实例只是简单的代理访问。所以，如果有一处需要被多个实例间共享的状态，可以简单地通过维护一份数据来实现共享

<div>
<pre>const sourceOfTruth = {}
const vmA = new Vue({
  data: sourceOfTruth
})
const vmB = new Vue({
  data: sourceOfTruth
})</pre>
</div>

&emsp;&emsp;现在当&nbsp;`sourceOfTruth`&nbsp;发生变化，`vmA`&nbsp;和&nbsp;`vmB`&nbsp;都将自动的更新引用它们的视图。子组件们的每个实例也会通过&nbsp;`this.$root.$data`&nbsp;去访问。现在有了唯一的实际来源，但是，调试将会变为噩梦。任何时间，应用中的任何部分，在任何数据改变后，都不会留下变更过的记录。

&emsp;&emsp;为了解决这个问题，采用一个简单的&nbsp;**store 模式**：

<div>
<pre>var store = {
  debug: true,
  state: {
    message: 'Hello!'
  },
  setMessageAction (newValue) {
    if (this.debug) console.log('setMessageAction triggered with', newValue)
    this.state.message = newValue
  },
  clearMessageAction () {
    if (this.debug) console.log('clearMessageAction triggered')
    this.state.message = ''
  }
}</pre>
</div>

&emsp;&emsp;所有 store 中 state 的改变，都放置在 store 自身的 action 中去管理。这种集中式状态管理能够被更容易地理解哪种类型的 mutation 将会发生，以及它们是如何被触发。当错误出现时，现在也会有一个 log 记录 bug 之前发生了什么

&emsp;&emsp;此外，每个实例/组件仍然可以拥有和管理自己的私有状态：

<div>
<pre>var vmA = new Vue({
  data: {
    privateState: {},
    sharedState: store.state
  }
})
var vmB = new Vue({
  data: {
    privateState: {},
    sharedState: store.state
  }
})</pre>
</div>

![状态管理](https://pic.xiaohuochai.site/blog/vuex_state.png)


&emsp;&emsp;注意：不应该在action中替换原始的状态对象，组件和store需要引用同一个共享对象，mutation才能够被观察

&emsp;&emsp;接着继续延伸约定，组件不允许直接修改属于 store 实例的 state，而应执行 action 来分发 (dispatch) 事件通知 store 去改变，最终达成了 Flux 架构。这样约定的好处是，能够记录所有 store 中发生的 state 改变，同时实现能做到记录变更 (mutation)、保存状态快照、历史回滚/时光旅行的先进的调试工具

&nbsp;

### 概述

&emsp;&emsp;Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能

【状态管理模式】

&emsp;&emsp;下面以一个简单的计数应用为例，来说明状态管理模式
<!-- {% raw %} -->
<div>
<pre>new Vue({
  el: '#app',
  // state
  data () {
    return {
      count: 0
    }
  },
  // view
  template: `
  &lt;div&gt;
    &lt;span&gt;{{count}}&lt;/span&gt;
    &lt;input type="button" value="+" @click="increment"&gt;
  &lt;/div&gt;
  `,
  // actions
  methods: {
    increment () {
      this.count++
    }
  }
})</pre>
</div>
<!-- {% endraw %} -->
<iframe src="https://demo.xiaohuochai.site/vue/vuex/v1.html" frameborder="0" width="320" height="60"></iframe>

&emsp;&emsp;这个状态自管理应用包含以下几个部分：

<div>
<pre>state，驱动应用的数据源；
view，以声明方式将 state 映射到视图；
actions，响应在 view 上的用户输入导致的状态变化。</pre>
</div>

&emsp;&emsp;下面是一个表示&ldquo;单向数据流&rdquo;理念的极简示意：


![flow](https://pic.xiaohuochai.site/blog/vuex_flow.png)


&emsp;&emsp;但是，当应用遇到多个组件共享状态时，单向数据流的简洁性很容易被破坏，存在以下两个问题

&emsp;&emsp;1、多个视图依赖于同一状态

&emsp;&emsp;2、来自不同视图的行为需要变更同一状态

&emsp;&emsp;对于问题一，传参的方法对于多层嵌套的组件将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。对于问题二，经常会采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。以上的这些模式非常脆弱，通常会导致无法维护的代码。

&emsp;&emsp;因此，为什么不把组件的共享状态抽取出来，以一个全局单例模式管理呢？在这种模式下，组件树构成了一个巨大的&ldquo;视图&rdquo;，不管在树的哪个位置，任何组件都能获取状态或者触发行为

&emsp;&emsp;另外，通过定义和隔离状态管理中的各种概念并强制遵守一定的规则，代码将会变得更结构化且易维护。

&emsp;&emsp;这就是 Vuex 背后的基本思想，借鉴了&nbsp;Flux、Redux、和&nbsp;The Elm Architecture。与其他模式不同的是，Vuex 是专门为 Vue.js 设计的状态管理库，以利用 Vue.js 的细粒度数据响应机制来进行高效的状态更新


![vuex](https://pic.xiaohuochai.site/blog/vuex_vuex.png)


【使用情况】

&emsp;&emsp;虽然 Vuex 可以帮助管理共享状态，但也附带了更多的概念和框架。这需要对短期和长期效益进行权衡。

&emsp;&emsp;如果不打算开发大型单页应用，使用 Vuex 可能是繁琐冗余的。确实是如此&mdash;&mdash;如果应用够简单，最好不要使用 Vuex。一个简单的&nbsp;global event bus&nbsp;就足够所需了。但是，如果需要构建是一个中大型单页应用，很可能会考虑如何更好地在组件外部管理状态，Vuex 将会成为自然而然的选择

&nbsp;

### 开始

【安装】

<div>
<pre>npm install vuex --save</pre>
</div>

&emsp;&emsp;在一个模块化的打包系统中，必须显式地通过&nbsp;`Vue.use()`&nbsp;来安装 Vuex

<div>
<pre>import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)</pre>
</div>

&emsp;&emsp;当使用全局 script 标签引用 Vuex 时，不需要以上安装过程

【概述】

&emsp;&emsp;每一个 Vuex 应用的核心就是 store（仓库）。&ldquo;store&rdquo;基本上就是一个容器，它包含着应用中大部分的状态 (state)。Vuex 和单纯的全局对象有以下两点不同：

&emsp;&emsp;1、Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新

&emsp;&emsp;2、不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得可以方便地跟踪每一个状态的变化，从而能够实现一些工具帮助更好地了解应用

【最简单的store】

&emsp;&emsp;下面来创建一个 store。创建过程直截了当&mdash;&mdash;仅需要提供一个初始 state 对象和一些 mutation

<div>
<pre>// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})</pre>
</div>

&emsp;&emsp;现在，可以通过&nbsp;`store.state`&nbsp;来获取状态对象，以及通过&nbsp;`store.commit`&nbsp;方法触发状态变更：

<div>
<pre>store.commit('increment')
console.log(store.state.count) // -&gt; 1</pre>
</div>

&emsp;&emsp;通过提交 mutation 的方式，而非直接改变&nbsp;`store.state.count`，是因为想要更明确地追踪到状态的变化。这个简单的约定能够让意图更加明显，这样在阅读代码的时候能更容易地解读应用内部的状态改变。此外，这样也有机会去实现一些能记录每次状态改变，保存状态快照的调试工具。有了它，甚至可以实现如时间穿梭般的调试体验。

&emsp;&emsp;由于 store 中的状态是响应式的，在组件中调用 store 中的状态简单到仅需要在计算属性中返回即可。触发变化也仅仅是在组件的 methods 中提交 mutation

&emsp;&emsp;下面是一个使用vuex实现的简单计数器
<!-- {% raw %} -->
<div>
<pre>const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment: state =&gt; state.count++,
    decrement: state =&gt; state.count--,
  }
})
new Vue({
  el: '#app',
  computed: {
    count () {
      return store.state.count
    }
  },
  // view
  template: `
  &lt;div&gt;
    &lt;input type="button" value="-" @click="decrement"&gt;
    &lt;span&gt;{{count}}&lt;/span&gt;
    &lt;input type="button" value="+" @click="increment"&gt;
  &lt;/div&gt;
  `,
  // actions
  methods: {
    increment () {
      store.commit('increment')
    },
    decrement () {
      store.commit('decrement')
    },    
  }
})</pre>
</div>
<!-- {% endraw %} -->
<iframe src="https://demo.xiaohuochai.site/vue/vuex/v2.html" frameborder="0" width="320" height="60"></iframe>

&nbsp;

## 核心概念

### state

【单一状态树】

&emsp;&emsp;Vuex 使用单一状态树&mdash;&mdash;用一个对象就包含了全部的应用层级状态。至此它便作为一个&ldquo;唯一数据源 (SSOT)&rdquo;而存在。这也意味着，每个应用将仅仅包含一个 store 实例。单一状态树能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照

【在VUE组件中获得VUEX状态】

&emsp;&emsp;如何在 Vue 组件中展示状态呢？由于 Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在计算属性中返回某个状态
<!-- {% raw %} -->
<div>
<pre>// 创建一个 Counter 组件
const Counter = {
  template: `&lt;div&gt;{{ count }}&lt;/div&gt;`,
  computed: {
    count () {
      return store.state.count
    }
  }
}</pre>
</div>
<!-- {% endraw %} -->
&emsp;&emsp;每当&nbsp;`store.state.count`&nbsp;变化的时候, 都会重新求取计算属性，并且触发更新相关联的 DOM

&emsp;&emsp;然而，这种模式导致组件依赖全局状态单例。在模块化的构建系统中，在每个需要使用 state 的组件中需要频繁地导入，并且在测试组件时需要模拟状态。

&emsp;&emsp;Vuex 通过&nbsp;`store`&nbsp;选项，提供了一种机制将状态从根组件&ldquo;注入&rdquo;到每一个子组件中（需调用&nbsp;`Vue.use(Vuex)`）：

<div>
<pre>const app = new Vue({
  el: '#app',
  // 把 store 对象提供给 &ldquo;store&rdquo; 选项，这可以把 store 的实例注入所有的子组件
  store,
  components: { Counter },
  template: `
    &lt;div class="app"&gt;
      &lt;counter&gt;&lt;/counter&gt;
    &lt;/div&gt;
  `
})</pre>
</div>

&emsp;&emsp;通过在根实例中注册&nbsp;`store`&nbsp;选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过`this.$store`访问到。下面来更新下&nbsp;`Counter`&nbsp;的实现：
<!-- {% raw %} -->
<div>
<pre>const Counter = {
  template: `&lt;div&gt;{{ count }}&lt;/div&gt;`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}</pre>
</div>
<!-- {% endraw %} -->
【mapState辅助函数】

&emsp;&emsp;当一个组件需要获取多个状态时，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，可以使用`mapState`辅助函数帮助生成计算属性

<div>
<pre>// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'
export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state =&gt; state.count,
    // 传字符串参数 'count' 等同于 `state =&gt; state.count`
    countAlias: 'count',
    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}</pre>
</div>

&emsp;&emsp;当映射的计算属性的名称与 state 的子节点名称相同时，也可以给&nbsp;`mapState`&nbsp;传一个字符串数组

<div>
<pre>computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])</pre>
</div>

【对象展开运算符】

&emsp;&emsp;`mapState`&nbsp;函数返回的是一个对象。如何将它与局部计算属性混合使用呢？通常，需要使用一个工具函数将多个对象合并为一个，将最终对象传给&nbsp;`computed`&nbsp;属性。但是自从有了对象展开运算符，可以极大地简化写法：

<div>
<pre>computed: {
  localComputed () { /* ... */ },
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
    // ...
  })
}</pre>
</div>

【组件仍然保有局部状态】

&emsp;&emsp;使用 Vuex 并不意味着需要将所有的状态放入 Vuex。虽然将所有的状态放到 Vuex 会使状态变化更显式和易调试，但也会使代码变得冗长和不直观。如果有些状态严格属于单个组件，最好还是作为组件的局部状态

&nbsp;

### Getter

&emsp;&emsp;有时候需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数：

<div>
<pre>computed: {
  doneTodosCount () {
    return this.$store.state.todos.filter(todo =&gt; todo.done).length
  }
}</pre>
</div>

&emsp;&emsp;如果有多个组件需要用到此属性，要么复制这个函数，或者抽取到一个共享函数然后在多处导入它&mdash;&mdash;无论哪种方式都不是很理想

&emsp;&emsp;Vuex 允许在 store 中定义&ldquo;getter&rdquo;（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算

&emsp;&emsp;Getter 接受 state 作为其第一个参数：

<div>
<pre>const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state =&gt; {
      return state.todos.filter(todo =&gt; todo.done)
    }
  }
})</pre>
</div>

&emsp;&emsp;Getter 会暴露为&nbsp;`store.getters`&nbsp;对象：

<div>
<pre>store.getters.doneTodos // -&gt; [{ id: 1, text: '...', done: true }]</pre>
</div>

&emsp;&emsp;Getter 也可以接受其他 getter 作为第二个参数：

<div>
<pre>getters: {
  // ...
  doneTodosCount: (state, getters) =&gt; {
    return getters.doneTodos.length
  }
}
store.getters.doneTodosCount // -&gt; 1</pre>
</div>

&emsp;&emsp;可以很容易地在任何组件中使用它：

<div>
<pre>computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}</pre>
</div>

&emsp;&emsp;也可以通过让 getter 返回一个函数，来实现给 getter 传参。在对 store 里的数组进行查询时非常有用

<div>
<pre>getters: {
  // ...
  getTodoById: (state, getters) =&gt; (id) =&gt; {
    return state.todos.find(todo =&gt; todo.id === id)
  }
}
store.getters.getTodoById(2) // -&gt; { id: 2, text: '...', done: false }</pre>
</div>

&emsp;&emsp;如果箭头函数不好理解，翻译成普通函数如下

<div>
<pre>var getTodoById = function(state,getters){
  return function(id){
    return state.todos.find(function(todo){
      return todo.id === id
    })
  }
}
store.getters.getTodoById(2) // -&gt; { id: 2, text: '...', done: false }</pre>
</div>

【mapGetters辅助函数】

&emsp;&emsp;mapGetters&nbsp;辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：

<div>
<pre>import { mapGetters } from 'vuex'
export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}</pre>
</div>

&emsp;&emsp;如果想将一个 getter 属性另取一个名字，使用对象形式：

<div>
<pre>mapGetters({
  // 映射 `this.doneCount` 为 `store.getters.doneTodosCount`
  doneCount: 'doneTodosCount'
})</pre>
</div>

&nbsp;

### mutation

&emsp;&emsp;更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的&nbsp;事件类型 (type)&nbsp;和 一个&nbsp;回调函数 (handler)。这个回调函数就是实际进行状态更改的地方，并且它会接受 state 作为第一个参数：

<div>
<pre>const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})</pre>
</div>

&emsp;&emsp;不能直接调用一个 mutation handler。这个选项更像是事件注册：&ldquo;当触发一个类型为&nbsp;`increment`&nbsp;的 mutation 时，调用此函数。&rdquo;要唤醒一个 mutation handler，需要以相应的 type 调用&nbsp;store.commit&nbsp;方法：

<div>
<pre>store.commit('increment')</pre>
</div>

【提交载荷(Payload)】

&emsp;&emsp;可以向&nbsp;`store.commit`&nbsp;传入额外的参数，即 mutation 的&nbsp;载荷（payload）

<div>
<pre>// ...
mutations: {
  increment (state, n) {
    state.count += n
  }
}
store.commit('increment', 10)</pre>
</div>

&emsp;&emsp;在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读：

<div>
<pre>// ...
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
store.commit('increment', {
  amount: 10
})</pre>
</div>

【对象风格的提交方式】

&emsp;&emsp;提交 mutation 的另一种方式是直接使用包含&nbsp;`type`&nbsp;属性的对象

<div>
<pre>store.commit({
  type: 'increment',
  amount: 10
})</pre>
</div>

&emsp;&emsp;当使用对象风格的提交方式，整个对象都作为载荷传给 mutation 函数，因此 handler 保持不变：

<div>
<pre>mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}</pre>
</div>

【遵守响应规则】

&emsp;&emsp;既然 Vuex 的 store 中的状态是响应式的，那么当变更状态时，监视状态的 Vue 组件也会自动更新。这也意味着 Vuex 中的 mutation 也需要与使用 Vue 一样遵守一些注意事项：

&emsp;&emsp;1、最好提前在store中初始化好所有所需属性

&emsp;&emsp;2、当需要在对象上添加新属性时，应该使用&nbsp;`Vue.set(obj, 'newProp', 123)`, 或者以新对象替换老对象

&emsp;&emsp;例如，利用对象展开运算符可以这样写：

<div>
<pre>state.obj = { ...state.obj, newProp: 123 }</pre>
</div>

【使用常量替代Mutation事件类型】

&emsp;&emsp;使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。这样可以使 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让代码合作者对整个 app 包含的 mutation 一目了然

<div>
<pre>// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'
// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'
const store = new Vuex.Store({
  state: { ... },
  mutations: {
    // 可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [SOME_MUTATION] (state) {
      // mutate state
    }
  }
})</pre>
</div>

【Mutation必须是同步函数】

&emsp;&emsp;一条重要的原则就是mutation必须是同步函数

<div>
<pre>mutations: {
  someMutation (state) {
    api.callAsyncMethod(() =&gt; {
      state.count++
    })
  }
}</pre>
</div>

&emsp;&emsp;假如正在debug 一个 app 并且观察 devtool 中的 mutation 日志。每一条 mutation 被记录，devtools 都需要捕捉到前一状态和后一状态的快照。然而，在上面的例子中 mutation 中的异步函数中的回调让这不可能完成：因为当 mutation 触发的时候，回调函数还没有被调用，devtools 不知道什么时候回调函数实际上被调用&mdash;&mdash;实质上任何在回调函数中进行的状态改变都是不可追踪的

【在组件中提交Mutation】

&emsp;&emsp;可以在组件中使用&nbsp;`this.$store.commit('xxx')`&nbsp;提交 mutation，或者使用&nbsp;`mapMutations`&nbsp;辅助函数将组件中的 methods 映射为&nbsp;`store.commit`&nbsp;调用（需要在根节点注入&nbsp;`store`）

<div>
<pre>import { mapMutations } from 'vuex'
export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}</pre>
</div>

&nbsp;

### action

&emsp;&emsp;在 mutation 中混合异步调用会导致程序很难调试。例如，当能调用了两个包含异步回调的 mutation 来改变状态，怎么知道什么时候回调和哪个先回调呢？这就是为什么要区分这两个概念。在 Vuex 中，mutation 都是同步事务：

<div>
<pre>store.commit('increment')
// 任何由 "increment" 导致的状态变更都应该在此刻完成。</pre>
</div>

&emsp;&emsp;Action类似于mutation，不同之处在于：

&emsp;&emsp;1、Action 提交的是 mutation，而不是直接变更状态

&emsp;&emsp;2、Action 可以包含任意异步操作

&emsp;&emsp;下面来注册一个简单的action

<div>
<pre>const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})</pre>
</div>

&emsp;&emsp;Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此可以调用&nbsp;`context.commit`&nbsp;提交一个 mutation，或者通过&nbsp;`context.state`&nbsp;和&nbsp;`context.getters`&nbsp;来获取 state 和 getters

&emsp;&emsp;实践中，会经常用到 ES2015 的&nbsp;参数解构&nbsp;来简化代码（特别是需要调用&nbsp;`commit`&nbsp;很多次的时候）

<div>
<pre>actions: {
  increment ({ commit }) {
    commit('increment')
  }
}</pre>
</div>

【分发Action】

&emsp;&emsp;Action 通过&nbsp;`store.dispatch`&nbsp;方法触发

<div>
<pre>store.dispatch('increment')</pre>
</div>

&emsp;&emsp;乍一眼看上去感觉多此一举，直接分发 mutation 岂不更方便？实际上并非如此，mutation必须同步执行这个限制，而Action 就不受约束，可以在 action 内部执行异步操作

<div>
<pre>actions: {
  incrementAsync ({ commit }) {
    setTimeout(() =&gt; {
      commit('increment')
    }, 1000)
  }
}</pre>
</div>

&emsp;&emsp;Actions 支持同样的载荷方式和对象方式进行分发

<div>
<pre>// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})
// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})</pre>
</div>

&emsp;&emsp;来看一个更加实际的购物车示例，涉及到调用异步 API&nbsp;和分发多重 mutation：

<div>
<pre>actions: {
  checkout ({ commit, state }, products) {
    // 把当前购物车的物品备份起来
    const savedCartItems = [...state.cart.added]
    // 发出结账请求，然后乐观地清空购物车
    commit(types.CHECKOUT_REQUEST)
    // 购物 API 接受一个成功回调和一个失败回调
    shop.buyProducts(
      products,
      // 成功操作
      () =&gt; commit(types.CHECKOUT_SUCCESS),
      // 失败操作
      () =&gt; commit(types.CHECKOUT_FAILURE, savedCartItems)
    )
  }
}</pre>
</div>

&emsp;&emsp;注意正在进行一系列的异步操作，并且通过提交 mutation 来记录 action 产生的副作用（即状态变更）

【在组件中分发Action】

&emsp;&emsp;在组件中使用&nbsp;`this.$store.dispatch('xxx')`&nbsp;分发 action，或者使用&nbsp;`mapActions`&nbsp;辅助函数将组件的 methods 映射为&nbsp;`store.dispatch`&nbsp;调用（需要先在根节点注入&nbsp;`store`）：

<div>
<pre>import { mapActions } from 'vuex'
export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}</pre>
</div>

【组合Action】

&emsp;&emsp;Action 通常是异步的，那么如何知道 action 什么时候结束呢？更重要的是，如何才能组合多个 action，以处理更加复杂的异步流程？

&emsp;&emsp;首先，需要明白&nbsp;`store.dispatch`&nbsp;可以处理被触发的 action 的处理函数返回的 Promise，并且&nbsp;`store.dispatch`&nbsp;仍旧返回 Promise：

<div>
<pre>actions: {
  actionA ({ commit }) {
    return new Promise((resolve, reject) =&gt; {
      setTimeout(() =&gt; {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}</pre>
</div>

&emsp;&emsp;现在可以

<div>
<pre>store.dispatch('actionA').then(() =&gt; {
  // ...
})</pre>
</div>

&emsp;&emsp;在另外一个 action 中也可以：

<div>
<pre>actions: {
  // ...
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() =&gt; {
      commit('someOtherMutation')
    })
  }
}</pre>
</div>

&emsp;&emsp;最后，如果利用&nbsp;async / await&nbsp;这个 JavaScript 新特性，可以像这样组合 action：

<div>
<pre>// 假设 getData() 和 getOtherData() 返回的是 Promise
actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}</pre>
</div>

&emsp;&emsp;一个&nbsp;`store.dispatch`&nbsp;在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行

&nbsp;

### module

&emsp;&emsp;由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

&emsp;&emsp;为了解决以上问题，Vuex 允许将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块&mdash;&mdash;从上至下进行同样方式的分割：

<div>
<pre>const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}
const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}
const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})
store.state.a // -&gt; moduleA 的状态
store.state.b // -&gt; moduleB 的状态</pre>
</div>

【模块的局部状态】

&emsp;&emsp;对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象

<div>
<pre>const moduleA = {
  state: { count: 0 },
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },
  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  }
}</pre>
</div>

&emsp;&emsp;同样，对于模块内部的 action，局部状态通过&nbsp;`context.state`&nbsp;暴露出来，根节点状态则为&nbsp;`context.rootState`：

<div>
<pre>const moduleA = {
  // ...
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}</pre>
</div>

&emsp;&emsp;对于模块内部的 getter，根节点状态会作为第三个参数暴露出来：

<div>
<pre>const moduleA = {
  // ...
  getters: {
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  }
}</pre>
</div>

【命名空间】

&emsp;&emsp;默认情况下，模块内部的 action、mutation 和 getter 是注册在全局命名空间的&mdash;&mdash;这样使得多个模块能够对同一 mutation 或 action 作出响应

&emsp;&emsp;如果希望模块具有更高的封装度和复用性，可以通过添加&nbsp;`namespaced: true`&nbsp;的方式使其成为命名空间模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。例如：

<div>
<pre>const store = new Vuex.Store({
  modules: {
    account: {
      namespaced: true,
      // 模块内容（module assets）
      state: { ... }, // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
      getters: {
        isAdmin () { ... } // -&gt; getters['account/isAdmin']
      },
      actions: {
        login () { ... } // -&gt; dispatch('account/login')
      },
      mutations: {
        login () { ... } // -&gt; commit('account/login')
      },
      // 嵌套模块
      modules: {
        // 继承父模块的命名空间
        myPage: {
          state: { ... },
          getters: {
            profile () { ... } // -&gt; getters['account/profile']
          }
        },
        // 进一步嵌套命名空间
        posts: {
          namespaced: true,
          state: { ... },
          getters: {
            popular () { ... } // -&gt; getters['account/posts/popular']
          }
        }
      }
    }
  }
})</pre>
</div>

&emsp;&emsp;启用了命名空间的 getter 和 action 会收到局部化的&nbsp;`getter`，`dispatch`&nbsp;和&nbsp;`commit`。换言之，在使用模块内容（module assets）时不需要在同一模块内额外添加空间名前缀。更改&nbsp;`namespaced`&nbsp;属性后不需要修改模块内的代码

【在命名空间模块内访问全局内容（Global Assets）】

&emsp;&emsp;如果希望使用全局 state 和 getter，`rootState`&nbsp;和&nbsp;`rootGetter`&nbsp;会作为第三和第四参数传入 getter，也会通过&nbsp;`context`&nbsp;对象的属性传入 action

&emsp;&emsp;若需要在全局命名空间内分发 action 或提交 mutation，将&nbsp;`{ root: true }`&nbsp;作为第三参数传给&nbsp;`dispatch`&nbsp;或&nbsp;`commit`即可

<div>
<pre>modules: {
  foo: {
    namespaced: true,
    getters: {
      // 在这个模块的 getter 中，`getters` 被局部化了
      // 你可以使用 getter 的第四个参数来调用 `rootGetters`
      someGetter (state, getters, rootState, rootGetters) {
        getters.someOtherGetter // -&gt; 'foo/someOtherGetter'
        rootGetters.someOtherGetter // -&gt; 'someOtherGetter'
      },
      someOtherGetter: state =&gt; { ... }
    },
    actions: {
      // 在这个模块中， dispatch 和 commit 也被局部化了
      // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
      someAction ({ dispatch, commit, getters, rootGetters }) {
        getters.someGetter // -&gt; 'foo/someGetter'
        rootGetters.someGetter // -&gt; 'someGetter'
        dispatch('someOtherAction') // -&gt; 'foo/someOtherAction'
        dispatch('someOtherAction', null, { root: true }) // -&gt; 'someOtherAction'
        commit('someMutation') // -&gt; 'foo/someMutation'
        commit('someMutation', null, { root: true }) // -&gt; 'someMutation'
      },
      someOtherAction (ctx, payload) { ... }
    }
  }
}</pre>
</div>

【带命名空间的绑定函数】

&emsp;&emsp;当使用&nbsp;`mapState`,&nbsp;`mapGetters`,&nbsp;`mapActions`&nbsp;和&nbsp;`mapMutations`&nbsp;这些函数来绑定命名空间模块时，写起来可能比较繁琐

<div>
<pre>computed: {
  ...mapState({
    a: state =&gt; state.some.nested.module.a,
    b: state =&gt; state.some.nested.module.b
  })
},
methods: {
  ...mapActions([
    'some/nested/module/foo',
    'some/nested/module/bar'
  ])
}</pre>
</div>

&emsp;&emsp;对于这种情况，可以将模块的空间名称字符串作为第一个参数传递给上述函数，这样所有绑定都会自动将该模块作为上下文。于是上面的例子可以简化为

<div>
<pre>computed: {
  ...mapState('some/nested/module', {
    a: state =&gt; state.a,
    b: state =&gt; state.b
  })
},
methods: {
  ...mapActions('some/nested/module', [
    'foo',
    'bar'
  ])
}</pre>
</div>

&emsp;&emsp;而且，可以通过使用&nbsp;`createNamespacedHelpers`&nbsp;创建基于某个命名空间辅助函数。它返回一个对象，对象里有新的绑定在给定命名空间值上的组件绑定辅助函数：

<div>
<pre>import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')
export default {
  computed: {
    // 在 `some/nested/module` 中查找
    ...mapState({
      a: state =&gt; state.a,
      b: state =&gt; state.b
    })
  },
  methods: {
    // 在 `some/nested/module` 中查找
    ...mapActions([
      'foo',
      'bar'
    ])
  }
}</pre>
</div>

【注意事项】

&emsp;&emsp;如果开发的插件（Plugin）提供了模块并允许用户将其添加到 Vuex store，可能需要考虑模块的空间名称问题。对于这种情况，可以通过插件的参数对象来允许用户指定空间名称：

<div>
<pre>// 通过插件的参数对象得到空间名称
// 然后返回 Vuex 插件函数
export function createPlugin (options = {}) {
  return function (store) {
    // 把空间名字添加到插件模块的类型（type）中去
    const namespace = options.namespace || ''
    store.dispatch(namespace + 'pluginAction')
  }
}</pre>
</div>

【模块动态注册】

&emsp;&emsp;在 store 创建之后，可以使用&nbsp;`store.registerModule`&nbsp;方法注册模块：

<div>
<pre>// 注册模块 `myModule`
store.registerModule('myModule', {
  // ...
})
// 注册嵌套模块 `nested/myModule`
store.registerModule(['nested', 'myModule'], {
  // ...
})</pre>
</div>

&emsp;&emsp;之后就可以通过&nbsp;`store.state.myModule`&nbsp;和&nbsp;`store.state.nested.myModule`&nbsp;访问模块的状态。

&emsp;&emsp;模块动态注册功能使得其他 Vue 插件可以通过在 store 中附加新模块的方式来使用 Vuex 管理状态。例如，`vuex-router-sync`&nbsp;插件就是通过动态注册模块将 vue-router 和 vuex 结合在一起，实现应用的路由状态管理。

&emsp;&emsp;也可以使用&nbsp;`store.unregisterModule(moduleName)`&nbsp;来动态卸载模块。注意，不能使用此方法卸载静态模块（即创建 store 时声明的模块）

【模块重用】

&emsp;&emsp;有时可能需要创建一个模块的多个实例，例如：

&emsp;&emsp;1、创建多个 store，他们公用同一个模块 (例如当&nbsp;`runInNewContext`&nbsp;选项是&nbsp;`false`&nbsp;或&nbsp;`'once'`&nbsp;时，为了在服务端渲染中避免有状态的单例)

&emsp;&emsp;2、在一个 store 中多次注册同一个模块

&emsp;&emsp;如果使用一个纯对象来声明模块的状态，那么这个状态对象会通过引用被共享，导致状态对象被修改时 store 或模块间数据互相污染的问题。

&emsp;&emsp;实际上这和 Vue 组件内的&nbsp;`data`&nbsp;是同样的问题。因此解决办法也是相同的&mdash;&mdash;使用一个函数来声明模块状态（仅 2.3.0+ 支持）：

<div>
<pre>const MyReusableModule = {
  state () {
    return {
      foo: 'bar'
    }
  },
  // mutation, action 和 getter 等等...
}</pre>
</div>

&nbsp;

### 项目结构

&emsp;&emsp;Vuex 并不限制代码结构。但是，它规定了一些需要遵守的规则：

&emsp;&emsp;1、应用层级的状态应该集中到单个 store 对象中

&emsp;&emsp;2、提交&nbsp;mutation&nbsp;是更改状态的唯一方法，并且这个过程是同步的

&emsp;&emsp;3、异步逻辑都应该封装到&nbsp;action&nbsp;里面

&emsp;&emsp;只要遵守以上规则，可以随意组织代码。如果store文件太大，只需将 action、mutation 和 getter 分割到单独的文件

&emsp;&emsp;对于大型应用，希望把 Vuex 相关代码分割到模块中。下面是项目结构示例：

<div>
<pre>├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       # 购物车模块
        └── products.js   # 产品模块</pre>
</div>

&nbsp;

### 插件

&emsp;&emsp;Vuex 的 store 接受&nbsp;`plugins`&nbsp;选项，这个选项暴露出每次 mutation 的钩子。Vuex 插件就是一个函数，它接收 store 作为唯一参数：

<div>
<pre>const myPlugin = store =&gt; {
  // 当 store 初始化后调用
  store.subscribe((mutation, state) =&gt; {
    // 每次 mutation 之后调用
    // mutation 的格式为 { type, payload }
  })
}</pre>
</div>

&emsp;&emsp;然后像这样使用：

<div>
<pre>const store = new Vuex.Store({
  // ...
  plugins: [myPlugin]
})</pre>
</div>

【在插件中提交Mutation】

&emsp;&emsp;在插件中不允许直接修改状态&mdash;&mdash;类似于组件，只能通过提交 mutation 来触发变化。

&emsp;&emsp;通过提交 mutation，插件可以用来同步数据源到 store。例如，同步 websocket 数据源到 store（下面是个大概例子，实际上&nbsp;`createPlugin`&nbsp;方法可以有更多选项来完成复杂任务）：

<div>
<pre>export default function createWebSocketPlugin (socket) {
  return store =&gt; {
    socket.on('data', data =&gt; {
      store.commit('receiveData', data)
    })
    store.subscribe(mutation =&gt; {
      if (mutation.type === 'UPDATE_DATA') {
        socket.emit('update', mutation.payload)
      }
    })
  }
}
const plugin = createWebSocketPlugin(socket)
const store = new Vuex.Store({
  state,
  mutations,
  plugins: [plugin]
})</pre>
</div>

【生成State快照】

&emsp;&emsp;有时候插件需要获得状态的&ldquo;快照&rdquo;，比较改变的前后状态。想要实现这项功能，需要对状态对象进行深拷贝：

<div>
<pre>const myPluginWithSnapshot = store =&gt; {
  let prevState = _.cloneDeep(store.state)
  store.subscribe((mutation, state) =&gt; {
    let nextState = _.cloneDeep(state)
    // 比较 prevState 和 nextState...
    // 保存状态，用于下一次 mutation
    prevState = nextState
  })
}</pre>
</div>

&emsp;&emsp;生成状态快照的插件应该只在开发阶段使用，使用 webpack 或 Browserify，让构建工具帮助处理：

<div>
<pre>const store = new Vuex.Store({
  // ...
  plugins: process.env.NODE_ENV !== 'production'
    ? [myPluginWithSnapshot]
    : []
})</pre>
</div>

&emsp;&emsp;上面插件会默认启用。在发布阶段，需要使用 webpack 的&nbsp;DefinePlugin&nbsp;或者是 Browserify 的&nbsp;envify&nbsp;使&nbsp;`process.env.NODE_ENV !== 'production'`&nbsp;为&nbsp;`false`

【内置Logger插件】

&emsp;&emsp;Vuex 自带一个日志插件用于一般的调试:

<div>
<pre>import createLogger from 'vuex/dist/logger'
const store = new Vuex.Store({
  plugins: [createLogger()]
})</pre>
</div>

&emsp;&emsp;`createLogger`&nbsp;函数有几个配置项：

<div>
<pre>const logger = createLogger({
  collapsed: false, // 自动展开记录的 mutation
  filter (mutation, stateBefore, stateAfter) {
    // 若 mutation 需要被记录，就让它返回 true 即可
    // 顺便，`mutation` 是个 { type, payload } 对象
    return mutation.type !== "aBlacklistedMutation"
  },
  transformer (state) {
    // 在开始记录之前转换状态
    // 例如，只返回指定的子树
    return state.subTree
  },
  mutationTransformer (mutation) {
    // mutation 按照 { type, payload } 格式记录
    // 我们可以按任意方式格式化
    return mutation.type
  }
})</pre>
</div>

&emsp;&emsp;日志插件还可以直接通过script标签引入，它会提供全局方法&nbsp;`createVuexLogger`。

&emsp;&emsp;要注意，logger 插件会生成状态快照，所以仅在开发环境使用

&nbsp;

### 严格模式

&emsp;&emsp;开启严格模式，仅需在创建 store 的时候传入&nbsp;`strict: true`

<div>
<pre>const store = new Vuex.Store({
  // ...
  strict: true
})</pre>
</div>

&emsp;&emsp;在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到

【开发环境与发布环境】

&emsp;&emsp;不要在发布环境下启用严格模式！严格模式会深度监测状态树来检测不合规的状态变更&mdash;&mdash;请确保在发布环境下关闭严格模式，以避免性能损失。

&emsp;&emsp;类似于插件，可以让构建工具来处理这种情况：

<div>
<pre>const store = new Vuex.Store({
  // ...
  strict: process.env.NODE_ENV !== 'production'
})</pre>
</div>

&nbsp;

### 表单处理

&emsp;&emsp;当在严格模式中使用 Vuex 时，在属于 Vuex 的 state 上使用&nbsp;`v-model`&nbsp;会比较棘手：

<div>
<pre>&lt;input v-model="obj.message"&gt;</pre>
</div>

&emsp;&emsp;假设这里的&nbsp;`obj`&nbsp;是在计算属性中返回的一个属于 Vuex store 的对象，在用户输入时，`v-model`&nbsp;会试图直接修改&nbsp;`obj.message`。在严格模式中，由于这个修改不是在 mutation 函数中执行的, 这里会抛出一个错误。

&emsp;&emsp;用&ldquo;Vuex 的思维&rdquo;去解决这个问题的方法是：给input中绑定 value，然后侦听&nbsp;`input`&nbsp;或者&nbsp;`change`&nbsp;事件，在事件回调中调用 action:

<div>
<pre>&lt;input :value="message" @input="updateMessage"&gt;
// ...
computed: {
  ...mapState({
    message: state =&gt; state.obj.message
  })
},
methods: {
  updateMessage (e) {
    this.$store.commit('updateMessage', e.target.value)
  }
}</pre>
</div>

&emsp;&emsp;下面是 mutation 函数：

<div>
<pre>// ...
mutations: {
  updateMessage (state, message) {
    state.obj.message = message
  }
}</pre>
</div>

【双向绑定的计算属性】

&emsp;&emsp;必须承认，这样做比简单地使用&ldquo;`v-model`&nbsp;+ 局部状态&rdquo;要啰嗦得多，并且也损失了一些&nbsp;`v-model`&nbsp;中很有用的特性。另一个方法是使用带有 setter 的双向绑定计算属性：

<div>
<pre>&lt;input v-model="message"&gt;
// ...
computed: {
  message: {
    get () {
      return this.$store.state.obj.message
    },
    set (value) {
      this.$store.commit('updateMessage', value)
    }
  }
}</pre>
</div>

&nbsp;

### 测试

【测试Mutation】

&emsp;&emsp;Mutation 很容易被测试，因为它们仅仅是一些完全依赖参数的函数。这里有一个小技巧，如果在&nbsp;`store.js`&nbsp;文件中定义了 mutation，并且使用 ES2015 模块功能默认输出了 Vuex.Store 的实例，那么仍然可以给 mutation 取个变量名然后把它输出去：

<div>
<pre>const state = { ... }
// `mutations` 作为命名输出对象
export const mutations = { ... }
export default new Vuex.Store({
  state,
  mutations
})</pre>
</div>

&emsp;&emsp;下面是用 Mocha + Chai 测试一个 mutation 的例子

<div>
<pre>// mutations.js
export const mutations = {
  increment: state =&gt; state.count++
}
// mutations.spec.js
import { expect } from 'chai'
import { mutations } from './store'
// 解构 `mutations`
const { increment } = mutations
describe('mutations', () =&gt; {
  it('INCREMENT', () =&gt; {
    // 模拟状态
    const state = { count: 0 }
    // 应用 mutation
    increment(state)
    // 断言结果
    expect(state.count).to.equal(1)
  })
})</pre>
</div>

【测试Action】

&emsp;&emsp;Action 应对起来略微棘手，因为它们可能需要调用外部的 API。当测试 action 的时候，需要增加一个 mocking 服务层&mdash;&mdash;例如，可以把 API 调用抽象成服务，然后在测试文件中用 mock 服务回应 API 调用。为了便于解决 mock 依赖，可以用 webpack 和&nbsp;inject-loader&nbsp;打包测试文件。

&emsp;&emsp;下面是一个测试异步 action 的例子：

<div>
<pre>// actions.js
import shop from '../api/shop'
export const getAllProducts = ({ commit }) =&gt; {
  commit('REQUEST_PRODUCTS')
  shop.getProducts(products =&gt; {
    commit('RECEIVE_PRODUCTS', products)
  })
}
// actions.spec.js
// 使用 require 语法处理内联 loaders。
// inject-loader 返回一个允许我们注入 mock 依赖的模块工厂
import { expect } from 'chai'
const actionsInjector = require('inject-loader!./actions')
// 使用 mocks 创建模块
const actions = actionsInjector({
  '../api/shop': {
    getProducts (cb) {
      setTimeout(() =&gt; {
        cb([ /* mocked response */ ])
      }, 100)
    }
  }
})
// 用指定的 mutaions 测试 action 的辅助函数
const testAction = (action, args, state, expectedMutations, done) =&gt; {
  let count = 0
  // 模拟提交
  const commit = (type, payload) =&gt; {
    const mutation = expectedMutations[count]
    try {
      expect(mutation.type).to.equal(type)
      if (payload) {
        expect(mutation.payload).to.deep.equal(payload)
      }
    } catch (error) {
      done(error)
    }
    count++
    if (count &gt;= expectedMutations.length) {
      done()
    }
  }
  // 用模拟的 store 和参数调用 action
  action({ commit, state }, ...args)
  // 检查是否没有 mutation 被 dispatch
  if (expectedMutations.length === 0) {
    expect(count).to.equal(0)
    done()
  }
}
describe('actions', () =&gt; {
  it('getAllProducts', done =&gt; {
    testAction(actions.getAllProducts, [], {}, [
      { type: 'REQUEST_PRODUCTS' },
      { type: 'RECEIVE_PRODUCTS', payload: { /* mocked response */ } }
    ], done)
  })
})</pre>
</div>

【测试Getter】

&emsp;&emsp;如果getter 包含很复杂的计算过程，很有必要测试它们。Getter 的测试与 mutation 一样直截了当。

&emsp;&emsp;测试一个 getter 的示例：

<div>
<pre>// getters.js
export const getters = {
  filteredProducts (state, { filterCategory }) {
    return state.products.filter(product =&gt; {
      return product.category === filterCategory
    })
  }
}
// getters.spec.js
import { expect } from 'chai'
import { getters } from './getters'
describe('getters', () =&gt; {
  it('filteredProducts', () =&gt; {
    // 模拟状态
    const state = {
      products: [
        { id: 1, title: 'Apple', category: 'fruit' },
        { id: 2, title: 'Orange', category: 'fruit' },
        { id: 3, title: 'Carrot', category: 'vegetable' }
      ]
    }
    // 模拟 getter
    const filterCategory = 'fruit'
    // 获取 getter 的结果
    const result = getters.filteredProducts(state, { filterCategory })
    // 断言结果
    expect(result).to.deep.equal([
      { id: 1, title: 'Apple', category: 'fruit' },
      { id: 2, title: 'Orange', category: 'fruit' }
    ])
  })
})</pre>
</div>

【执行测试】

&emsp;&emsp;如果mutation 和 action 编写正确，经过合理地 mocking 处理之后这些测试应该不依赖任何浏览器 API，因此可以直接用 webpack 打包这些测试文件然后在 Node 中执行。换种方式，也可以用&nbsp;`mocha-loader`&nbsp;或 Karma +&nbsp;`karma-webpack`在真实浏览器环境中进行测试

**在Node中执行测试**

<div>
<pre>// webpack.config.js
module.exports = {
  entry: './test.js',
  output: {
    path: __dirname,
    filename: 'test-bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}</pre>
</div>

&emsp;&emsp;然后

<div>
<pre>webpack
mocha test-bundle.js</pre>
</div>

**在浏览器中测试**

&emsp;&emsp;1、安装&nbsp;`mocha-loader`

&emsp;&emsp;2、上述 webpack 配置中的&nbsp;`entry`&nbsp;改成&nbsp;`'mocha-loader!babel-loader!./test.js'`

&emsp;&emsp;3、用以上配置启动&nbsp;`webpack-dev-server`

&emsp;&emsp;4、访问&nbsp;`localhost:8080/webpack-dev-server/test-bundle`

&nbsp;

### 热加载

&emsp;&emsp;使用 webpack 的&nbsp;Hot Module Replacement API，Vuex 支持在开发过程中热重载 mutation、module、action 和 getter。也可以在 Browserify 中使用&nbsp;browserify-hmr&nbsp;插件。

&emsp;&emsp;对于 mutation 和模块，需要使用&nbsp;`store.hotUpdate()`&nbsp;方法：

<div>
<pre>// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import moduleA from './modules/a'
Vue.use(Vuex)
const state = { ... }
const store = new Vuex.Store({
  state,
  mutations,
  modules: {
    a: moduleA
  }
})
if (module.hot) {
  // 使 action 和 mutation 成为可热重载模块
  module.hot.accept(['./mutations', './modules/a'], () =&gt; {
    // 获取更新后的模块
    // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
    const newMutations = require('./mutations').default
    const newModuleA = require('./modules/a').default
    // 加载新模块
    store.hotUpdate({
      mutations: newMutations,
      modules: {
        a: newModuleA
      }
    })
  })
}</pre>
</div>

