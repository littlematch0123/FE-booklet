# Vuex的API详解

&emsp;&emsp;本文将详细介绍Vuex的API文档

&nbsp;

### 概述

<div>
<pre>import Vuex from 'vuex'
const store = new Vuex.Store({ ...options })</pre>
</div>

【构造器选项】

**state**

<div>
<pre>类型: Object</pre>
</div>

&emsp;&emsp;Vuex store 实例的根 state 对象

**mutations**

<div>
<pre>类型: { [type: string]: Function }</pre>
</div>

&emsp;&emsp;在 store 上注册 mutation，处理函数总是接受&nbsp;`state`&nbsp;作为第一个参数（如果定义在模块中，则为模块的局部状态），`payload`&nbsp;作为第二个参数（可选）

**actions**

<div>
<pre>类型: { [type: string]: Function }</pre>
</div>

&emsp;&emsp;在 store 上注册 action。处理函数接受一个&nbsp;`context`&nbsp;对象，包含以下属性：

<div>
<pre>{
  state,     // 等同于 store.state, 若在模块中则为局部状态
  rootState, // 等同于 store.state, 只存在于模块中
  commit,    // 等同于 store.commit
  dispatch,  // 等同于 store.dispatch
  getters    // 等同于 store.getters
}</pre>
</div>

**getters**

<div>
<pre>类型: { [key: string]: Function }</pre>
</div>

&emsp;&emsp;在 store 上注册 getter，getter 方法接受以下参数：

<div>
<pre> state,     // 如果在模块中定义则为模块的局部状态
 getters,   // 等同于 store.getters</pre>
</div>

&emsp;&emsp;当定义在一个模块里时会特别一些

<div>
<pre>  state,       // 如果在模块中定义则为模块的局部状态
  getters,     // 等同于 store.getters
  rootState    // 等同于 store.state
  rootGetters  // 所有 getters</pre>
</div>

&emsp;&emsp;注册的 getter 暴露为&nbsp;`store.getters`

**modules**

<div>
<pre>类型: Object</pre>
</div>

&emsp;&emsp;包含了子模块的对象，会被合并到 store

<div>
<pre>{
  key: {
    state,
    namespaced?,
    mutations,
    actions?,
    getters?,
    modules?
  },
  ...
}</pre>
</div>

&emsp;&emsp;与根模块的选项一样，每个模块也包含&nbsp;`state`&nbsp;和&nbsp;`mutations`&nbsp;选项。模块的状态使用 key 关联到 store 的根状态。模块的 mutation 和 getter 只会接收 module 的局部状态作为第一个参数，而不是根状态，并且模块 action 的&nbsp;`context.state`&nbsp;同样指向局部状态

**plugins**

<div>
<pre>类型: Array&lt;Function&gt;</pre>
</div>

&emsp;&emsp;一个数组，包含应用在 store 上的插件方法。这些插件直接接收 store 作为唯一参数，可以监听 mutation（用于外部地数据持久化、记录或调试）或者提交 mutation （用于内部数据，例如 websocket 或 某些观察者）

**strict**

<div>
<pre>类型: Boolean
默认值: false</pre>
</div>

&emsp;&emsp;使 Vuex store 进入严格模式，在严格模式下，任何 mutation 处理函数以外修改 Vuex state 都会抛出错误

&nbsp;

### 实例属性

**state**

<div>
<pre>类型: Object</pre>
</div>

&emsp;&emsp;根状态，只读

**getters**

<div>
<pre>类型: Object</pre>
</div>

&emsp;&emsp;暴露出注册的 getter，只读

&nbsp;

### 实例方法

<div>
<pre>commit(type: string, payload?: any, options?: Object) | commit(mutation: Object, options?: Object)</pre>
</div>

&emsp;&emsp;提交 mutation。`options`&nbsp;里可以有&nbsp;`root: true`，它允许在命名空间模块里提交根的 mutation

<div>
<pre>dispatch(type: string, payload?: any, options?: Object) | dispatch(action: Object, options?: Object)</pre>
</div>

&emsp;&emsp;分发 action。`options`&nbsp;里可以有&nbsp;`root: true`，它允许在命名空间模块里分发根的 action。返回一个解析所有被触发的 action 处理器的 Promise

<div>
<pre>replaceState(state: Object)</pre>
</div>

&emsp;&emsp;替换 store 的根状态，仅用状态合并或时光旅行调试

<div>
<pre>watch(getter: Function, cb: Function, options?: Object)</pre>
</div>

&emsp;&emsp;响应式地监测一个 getter 方法的返回值，当值改变时调用回调函数。getter 接收 store 的状态作为唯一参数。接收一个可选的对象参数表示 Vue 的&nbsp;`vm.$watch`&nbsp;方法的参数。

&emsp;&emsp;要停止监测，直接调用返回的处理函数

<div>
<pre>subscribe(handler: Function)</pre>
</div>

&emsp;&emsp;注册监听 store 的 mutation。`handler`&nbsp;会在每个 mutation 完成后调用，接收 mutation 和经过 mutation 后的状态作为参数

<div>
<pre>store.subscribe((mutation, state) =&gt; {
  console.log(mutation.type)
  console.log(mutation.payload)
})</pre>
</div>

&emsp;&emsp;通常用于插件

<div>
<pre>registerModule(path: string | Array&lt;string&gt;, module: Module)</pre>
</div>

&emsp;&emsp;注册一个动态模块

<div>
<pre>unregisterModule(path: string | Array&lt;string&gt;)</pre>
</div>

&emsp;&emsp;卸载一个动态模块

<div>
<pre>hotUpdate(newOptions: Object)</pre>
</div>

&emsp;&emsp;热替换新的 action 和 mutation

&nbsp;

### 辅助函数

<div>
<pre>mapState(namespace?: string, map: Array&lt;string&gt; | Object): Object</pre>
</div>

&emsp;&emsp;为组件创建计算属性以返回 Vuex store 中的状态。第一个参数是可选的，可以是一个命名空间字符串

<div>
<pre>mapGetters(namespace?: string, map: Array&lt;string&gt; | Object): Object</pre>
</div>

&emsp;&emsp;为组件创建计算属性以返回 getter 的返回值。第一个参数是可选的，可以是一个命名空间字符串

<div>
<pre>mapActions(namespace?: string, map: Array&lt;string&gt; | Object): Object</pre>
</div>

&emsp;&emsp;创建组件方法分发 action。第一个参数是可选的，可以是一个命名空间字符串

<div>
<pre>mapMutations(namespace?: string, map: Array&lt;string&gt; | Object): Object</pre>
</div>

&emsp;&emsp;创建组件方法提交 mutation。第一个参数是可选的，可以是一个命名空间字符串

<div>
<pre>createNamespacedHelpers(namespace: string): Object</pre>
</div>

&emsp;&emsp;创建基于命名空间的组件绑定辅助函数。其返回一个包含&nbsp;`mapState`、`mapGetters`、`mapActions`&nbsp;和&nbsp;`mapMutations`&nbsp;的对象。它们都已经绑定在了给定的命名空间上

