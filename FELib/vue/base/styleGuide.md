# Vue 精简版风格指南

&emsp;&emsp;Vue 官网的风格指南按照优先级（依次为必要、强烈推荐、推荐、谨慎使用）分类，且代码间隔较大，不易查询。本文按照类型分类，并对部分示例或解释进行缩减，是 Vue 风格指南的精简版

&nbsp;

### 组件名称

【组件名为多个单词】（必要）

&emsp;&emsp;组件名应该始终是多个单词的，根组件 App 除外。 这样做可以避免跟现有的以及未来的 HTML 元素相冲突，因为所有的 HTML 元素名称都是单个单词的

```
//bad
Vue.component('todo', {})
//good
Vue.component('todo-item', {})
```

【单文件组件文件名应该要么始终是单词大写开头 (PascalCase)，要么始终横线连接 (kebab-case)】（强烈推荐）

```
//bad
mycomponent.vue
//good
MyComponent.vue
//good
my-component.vue
```

【基础组件名要有一个特定前缀开头】（强烈推荐）

&emsp;&emsp;应用特定样式和约定的基础组件 (也就是展示类的、无逻辑的或无状态的组件) 应该全部以一个特定的前缀开头，比如 Base、App 或 V

```
//bad
components/
|- MyButton.vue
|- VueTable.vue
|- Icon.vue
//good
components/
|- BaseButton.vue
|- BaseTable.vue
|- BaseIcon.vue
```

【只应该拥有单个活跃实例的组件应该以 The 前缀命名，以示其唯一性】（强烈推荐）

&emsp;&emsp;这不意味着组件只可用于一个单页面，而是每个页面只使用一次，这些组件永远不接受任何 prop

```
//bad
components/
|- Heading.vue
|- MySidebar.vue
//good
components/
|- TheHeading.vue
|- TheSidebar.vue
```

【和父组件紧密耦合的子组件应该以父组件名作为前缀命名】（强烈推荐）

```
//bad
components/
|- TodoList.vue
|- TodoItem.vue
|- TodoButton.vue
//good
components/
|- SearchSidebar.vue
|- SearchSidebarNavigation.vue
```

【组件名应该以高级别的 (通常是一般化描述的) 单词开头，以描述性的修饰词结尾】（强烈推荐）

```
//bad
components/
|- ClearSearchButton.vue
|- ExcludeFromSearchInput.vue
|- LaunchOnStartupCheckbox.vue
|- RunSearchButton.vue
|- SearchInput.vue
|- TermsCheckbox.vue
//good
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue
|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue
```

【单文件组件和字符串模板中组件名应总是 PascalCase——但在 DOM 模板中总是 kebab-case】（强烈推荐）

```
//bad
<!-- 在单文件组件和字符串模板中 -->
<mycomponent/>
<myComponent/>
<!-- 在 DOM 模板中 -->
<MyComponent></MyComponent>
//good
<!-- 在单文件组件和字符串模板中 -->
<MyComponent/>
<!-- 在 DOM 模板中 -->
<my-component></my-component>
```

【组件名应该倾向于完整单词而不是缩写】（强烈推荐）

```
//bad
components/
|- SdSettings.vue
|- UProfOpts.vue
//good
components/
|- StudentDashboardSettings.vue
|- UserProfileOptions.vue
```

&nbsp;

### 组件相关

【单文件组件、字符串模板和 JSX 中没有内容的组件应该自闭合——但在 DOM 模板里不要这样做】（强烈推荐）

&emsp;&emsp;自闭合组件表示它们不仅没有内容，而且刻意没有内容

```
//bad
<!-- 在单文件组件、字符串模板和 JSX 中 -->
<MyComponent></MyComponent>
<!-- 在 DOM 模板中 -->
<my-component/>
//good
<!-- 在单文件组件、字符串模板和 JSX 中 -->
<MyComponent/>
<!-- 在 DOM 模板中 -->
<my-component></my-component>
```

【为组件样式设置作用域】（必要）

&emsp;&emsp;这条规则只和单文件组件有关。不一定要使用 scoped 特性。设置作用域也可以通过 CSS Modules，或者使用其它的库或约定

```
//bad
<template><button class="btn btn-close">X</button></template>
<style>
.btn-close {background-color: red;}
</style>
//good
<template><button class="btn btn-close">X</button></template>
<style scoped>
.btn-close {background-color: red;}
</style>
//good
<template><button :class="[$style.button, $style.buttonClose]">X</button></template>
<style module>
.btn-close {background-color: red;}
</style>
```

【单文件组件应该总是让 script、template 和 style 标签的顺序保持一致】（推荐）

```
//good
<!-- ComponentA.vue -->
<script>/* ... */</script>
<template>...</template>
<style>/* ... */</style>

<!-- ComponentB.vue -->
<script>/* ... */</script>
<template>...</template>
<style>/* ... */</style>
```

【一个文件中只有一个组件】（强烈推荐）

```
//bad
Vue.component('TodoList', {})
Vue.component('TodoItem', {})
//good
components/
|- TodoList.vue
|- TodoItem.vue
```

【组件选项默认顺序】（推荐）

1、副作用 (触发组件外的影响)

```
el
```

2、全局感知 (要求组件以外的知识)

```
name
parent
```

3、组件类型 (更改组件的类型)

```
functional
```

4、模板修改器 (改变模板的编译方式)

```
delimiters
comments
```

5、模板依赖 (模板内使用的资源)

```
components
directives
filters
```

6、组合 (向选项里合并属性)

```
extends
mixins
```

7、接口 (组件的接口)

```
inheritAttrs
model
props/propsData
```

8、本地状态 (本地的响应式属性)

```
data
computed
```

9、事件 (通过响应式事件触发的回调)

```
watch
生命周期钩子 (按照它们被调用的顺序)
```

10、非响应式的属性 (不依赖响应系统的实例属性)

```
methods
```

11、渲染 (组件输出的声明式描述)

```
template/render
renderError
```

&nbsp;

### prop

【Prop 定义应该尽量详细】（必要）

&emsp;&emsp;细致的 prop 定义有两个好处：

&emsp;&emsp;1、它们写明了组件的 API，所以很容易看懂组件的用法

&emsp;&emsp;2、在开发环境下，如果向一个组件提供格式不正确的 prop，Vue 将会告警，以帮助你捕获潜在的错误来源

```
//bad
props: ['status']
//good
props: {
  status: String
}
//better
props: {
  status: {
    type: String,
    required: true
  }
}
```

【声明 prop 时，其命名应始终使用 camelCase，而在模板和 JSX 中应始终使用 kebab-case】（强烈推荐）

```
//bad
props: {'greeting-text': String}
<WelcomeMessage greetingText="hi"/>
//good
props: {greetingText: String}
<WelcomeMessage greeting-text="hi"/>
```

&nbsp;

### 指令及特性

【总是用 key 配合 v-for】（必要）

```
//bad
  <li v-for="todo in todos">
//good
  <li v-for="todo in todos":key="todo.id">
```

【不要把 v-if 和 v-for 同时用在同一个元素上】（必要）
<!-- {% raw %} -->
```
//bad
<li v-for="user in users" v-if="user.isActive" :key="user.id" > {{ user.name }} <li>
//good
<li v-for="user in users" v-if="shouldShowUsers" :key="user.id" > {{ user.name }} <li>
```
<!-- {% endraw %} -->
【多个特性的元素应该分多行撰写，每个特性一行】（强烈推荐）

```
//bad
<img src="https://vuejs.org/images/logo.png" alt="Vue Logo">
//good
<img
  src="https://vuejs.org/images/logo.png"
  alt="Vue Logo"
>
```

【元素特性默认顺序】（推荐）

1、定义 (提供组件的选项)

```
is
```

2、列表渲染 (创建多个变化的相同元素)

```
v-for
```

3、条件渲染 (元素是否渲染/显示)

```
v-if
v-else-if
v-else
v-show
v-cloak
```

4、渲染方式 (改变元素的渲染方式)

```
v-pre
v-once
```

5、全局感知 (需要超越组件的知识)

```
id
```

6、唯一的特性 (需要唯一值的特性)

```
ref
key
slot
```

7、双向绑定 (把绑定和事件结合起来)

```
v-model
```

8、其它特性 (所有普通的绑定或未绑定的特性)

9、事件 (组件事件监听器)

```
v-on
```

10、内容 (复写元素的内容)

```
v-html
v-text
```

&nbsp;

### 属性

【私有属性名】（必要）

&emsp;&emsp;在插件、混入等扩展中始终为自定义的私有属性使用 `$_` 前缀，并附带一个命名空间以回避和其它作者的冲突 (比如 `$\_yourPluginName_`)

```
//bad
  methods: {update: function () { }}
//bad
  methods: {_update: function () { } }
//bad
  methods: {$update: function () { }}
//bad
  methods: {$_update: function () { }}
//good
  methods: { $_myGreatMixin_update: function () { }}
```

【组件的 data 必须是一个函数】（必要）

&emsp;&emsp;当在组件中使用 data 属性的时候 (除了 new Vue 外的任何地方)，它的值必须是返回一个对象的函数

```
//bad
Vue.component('some-comp', {
  data: {
    foo: 'bar'
  }
})
//good
Vue.component('some-comp', {
  data: function () {
    return {
      foo: 'bar'
    }
  }
})
```

【组件模板应该只包含简单的表达式，复杂的表达式则应该重构为计算属性或方法】（强烈推荐）
<!-- {% raw %} -->
```
//bad
{{
  fullName.split(' ').map(function (word) {
    return word[0].toUpperCase() + word.slice(1)
  }).join(' ')
}}
//good
computed: {
  normalizedFullName: function () {
    return this.fullName.split(' ').map(function (word) {
      return word[0].toUpperCase() + word.slice(1)
    }).join(' ')
  }
}
```
<!-- {% endraw %} -->
【应该把复杂计算属性分割为尽可能多的更简单的属性】（强烈推荐）

```
//bad
computed: {
  price: function () {
    var basePrice = this.manufactureCost / (1 - this.profitMargin)
    return (
      basePrice -
      basePrice * (this.discountPercent || 0)
    )
  }
}
//good
computed: {
  basePrice: function () {
    return this.manufactureCost / (1 - this.profitMargin)
  },
  discount: function () {
    return this.basePrice * (this.discountPercent || 0)
  },
  finalPrice: function () {
    return this.basePrice - this.discount
  }
}
```

【当组件开始觉得密集或难以阅读时，在多个属性之间添加空行可以让其变得容易】（推荐）

```
//good
props: {
  value: {
    type: String,
    required: true
  },

  focused: {
    type: Boolean,
    default: false
  }
}
```

&nbsp;

### 谨慎使用

1、元素选择器应该避免在 scoped 中出现

&emsp;&emsp;在 scoped 样式中，类选择器比元素选择器更好，因为大量使用元素选择器是很慢的

```
//bad
<style scoped>
button {
  background-color: red;
}
</style>
//good
<style scoped>
.btn-close {
  background-color: red;
}
</style>
```

2、应该优先通过 prop 和事件进行父子组件之间的通信，而不是 this.$parent 或改变 prop

3、应该优先通过 Vuex 管理全局状态，而不是通过 this.$root 或一个全局事件总线

4、如果一组 v-if + v-else 的元素类型相同，最好使用 key (比如两个 `<div>` 元素)
<!-- {% raw %} -->
```
//bad
<div v-if="error">
  错误：{{ error }}
</div>
<div v-else>
  {{ results }}
</div>
//good
<div
  v-if="error"
  key="search-status"
>
  错误：{{ error }}
</div>
<div
  v-else
  key="search-results"
>
  {{ results }}
</div>
```
<!-- {% endraw %} -->