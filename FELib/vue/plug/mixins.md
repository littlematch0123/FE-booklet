# Vue混合mixins

&emsp;&emsp;本文将详细介绍Vue混合mixins

&nbsp;

### 概述

&emsp;&emsp;混合 (mixins) 是一种分发 Vue 组件中可复用功能的非常灵活的方式。混合对象可以包含任意组件选项。以组件使用混合对象时，所有混合对象的选项将被混入该组件本身的选项

<div>
<pre>// 定义一个混合对象
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}
// 定义一个使用混合对象的组件
var Component = Vue.extend({
  mixins: [myMixin]
})
var component = new Component() // -&gt; "hello from mixin!"</pre>
</div>

&nbsp;

### 选项合并

&emsp;&emsp;当组件和混合对象含有同名选项时，这些选项将以恰当的方式混合。比如，同名钩子函数将混合为一个数组，因此都将被调用。另外，混合对象的钩子将在组件自身钩子**之前**调用 ：

<div>
<pre>var mixin = {
  created: function () {
    console.log('混合对象的钩子被调用')
  }
}
new Vue({
  mixins: [mixin],
  created: function () {
    console.log('组件钩子被调用')
  }
})
// -&gt; "混合对象的钩子被调用"
// -&gt; "组件钩子被调用"</pre>
</div>

&emsp;&emsp;值为对象的选项，例如 `methods`, `components` 和 `directives`，将被混合为同一个对象。 两个对象键名冲突时，取组件对象的键值对

<div>
<pre>var mixin = {
  methods: {
    foo: function () {
      console.log('foo')
    },
    conflicting: function () {
      console.log('from mixin')
    }
  }
}
var vm = new Vue({
  mixins: [mixin],
  methods: {
    bar: function () {
      console.log('bar')
    },
    conflicting: function () {
      console.log('from self')
    }
  }
})
vm.foo() // -&gt; "foo"
vm.bar() // -&gt; "bar"
vm.conflicting() // -&gt; "from self"</pre>
</div>

&emsp;&emsp;注意：&nbsp;`Vue.extend()` 也使用同样的策略进行合并

&nbsp;

### 全局混合

&emsp;&emsp;也可以全局注册混合对象。 一旦使用全局混合对象，将会影响到 **所有** 之后创建的 Vue 实例。使用恰当时，可以为自定义对象注入处理逻辑

<div>
<pre>// 为自定义的选项 'myOption' 注入一个处理器。 
Vue.mixin({
  created: function () {
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})
new Vue({
  myOption: 'hello!'
})
// -&gt; "hello!"</pre>
</div>

&emsp;&emsp;注意：一定要谨慎使用全局混合对象，因为会影响到每个单独创建的 Vue 实例（包括第三方模板）。大多数情况下，只应当应用于自定义选项，就像上面示例一样。 也可以将其用作插件以避免产生重复应用

&nbsp;

### 自定义选项混合策略

&emsp;&emsp;自定义选项将使用默认策略，即简单地覆盖已有值。 如果想让自定义选项以自定义逻辑混合，可以向`Vue.config.optionMergeStrategies` 添加一个函数：

<div>
<pre>Vue.config.optionMergeStrategies.myOption = function (toVal, fromVal) {
  // return mergedVal
}</pre>
</div>

&emsp;&emsp;对于大多数对象选项，可以使用 `methods` 的合并策略:

<div>
<pre>var strategies = Vue.config.optionMergeStrategies
strategies.myOption = strategies.methods</pre>
</div>

