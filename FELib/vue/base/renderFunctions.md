# Vue渲染函数

&emsp;&emsp;Vue 推荐在绝大多数情况下使用 template 来创建HTML。然而在一些场景中，真的需要 JavaScript 的完全编程的能力，这就是 **render 函数**，它比 template 更接近编译器。本文将详细介绍Vue渲染函数

&nbsp;

### 引入

&emsp;&emsp;下面是一个例子，如果要实现类似下面的效果。其中，H标签可替换

<div>
<pre>&lt;h1&gt;
  &lt;a name="hello-world" href="#hello-world"&gt;
    Hello world!
  &lt;/a&gt;
&lt;/h1&gt;</pre>
</div>

&emsp;&emsp;在 HTML 层，像下面这样定义来组件接口：

<div>
<pre>&lt;anchored-heading :level="1"&gt;Hello world!&lt;/anchored-heading&gt;</pre>
</div>

&emsp;&emsp;当开始写一个通过 `level` prop 动态生成 heading 标签的组件，可能很快想到这样实现：

<div>
<pre>&lt;script type="text/x-template" id="anchored-heading-template"&gt;
  &lt;h1 v-if="level === 1"&gt;
    &lt;slot&gt;&lt;/slot&gt;
  &lt;/h1&gt;
  &lt;h2 v-else-if="level === 2"&gt;
    &lt;slot&gt;&lt;/slot&gt;
  &lt;/h2&gt;
  &lt;h3 v-else-if="level === 3"&gt;
    &lt;slot&gt;&lt;/slot&gt;
  &lt;/h3&gt;
  &lt;h4 v-else-if="level === 4"&gt;
    &lt;slot&gt;&lt;/slot&gt;
  &lt;/h4&gt;
  &lt;h5 v-else-if="level === 5"&gt;
    &lt;slot&gt;&lt;/slot&gt;
  &lt;/h5&gt;
  &lt;h6 v-else-if="level === 6"&gt;
    &lt;slot&gt;&lt;/slot&gt;
  &lt;/h6&gt;
&lt;/script&gt;</pre>
</div>

&nbsp;&emsp;&emsp;JS代码如下

<div>
<pre>Vue.component('anchored-heading', {
  template: '#anchored-heading-template',
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})</pre>
</div>

&emsp;&emsp;在这种场景中使用 template 并不是最好的选择：首先代码冗长，为了在不同级别的标题中插入锚点元素，需要重复地使用 `<slot></slot>`

&emsp;&emsp;虽然模板在大多数组件中都非常好用，但是在这里它就不是很简洁的了。那么，来尝试使用 `render` 函数重写上面的例子：

<div>
<pre>&lt;div id="example"&gt;
  &lt;anchored-heading :level="2"&gt;&lt;a name="hello-world" href="#hello-world"&gt;Hello world!&lt;/a&gt;&lt;/anchored-heading&gt;
&lt;/div&gt;
&lt;script src="vue.js"&gt;&lt;/script&gt;
&lt;script&gt;
Vue.component('anchored-heading', {
  render: function (createElement) {
    return createElement(
      'h' + this.level,   // tag name 标签名称
      this.$slots.default // 子组件中的阵列
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})  
new Vue({
  el: '#example'
})
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;这样的代码精简很多，但是需要非常熟悉 Vue 的实例属性。在这个例子中，需要知道当不使用 `slot` 属性向组件中传递内容时，比如 `anchored-heading` 中的 `Hello world!`，这些子元素被存储在组件实例中的 `$slots.default`中

&nbsp;

### 虚拟DOM

&emsp;&emsp;在深入渲染函数之前，了解一些浏览器的工作原理是很重要的。以下面这段 HTML 为例：

<div>
<pre>&lt;div&gt;
  &lt;h1&gt;My title&lt;/h1&gt;
  Some text content
  &lt;!-- TODO: Add tagline --&gt;
&lt;/div&gt;</pre>
</div>

&emsp;&emsp;当浏览器读到这些代码时，它会建立一个[&ldquo;DOM 节点&rdquo;树](https://javascript.info/dom-nodes)来保持追踪，如同会画一张家谱树来追踪家庭成员的发展一样。HTML 的 DOM 节点树如下图所示：

![DOM Tree Visualization](https://pic.xiaohuochai.site/blog/vue_dom.png)

&emsp;&emsp;每个元素都是一个节点。每段文字也是一个节点。甚至注释也都是节点。一个节点就是页面的一个部分。就像家谱树一样，每个节点都可以有子节点 (也就是说每个部分可以包含其它的一些部分)

&emsp;&emsp;高效的更新所有这些节点会是比较困难的，不过所幸不必再手动完成这个工作了。只需要告诉 Vue 希望页面上的 HTML 是什么，这可以是在一个模板里：
<!-- {% raw %} -->
<div>
<pre>&lt;h1&gt;{{ blogTitle }}&lt;/h1&gt;</pre>
</div>
<!-- {% endraw %} -->
&emsp;&emsp;或者一个渲染函数里：

<div>
<pre>render: function (createElement) {
  return createElement('h1', this.blogTitle)
}</pre>
</div>

&emsp;&emsp;在这两种情况下，Vue 都会自动保持页面的更新，即便 `blogTitle` 发生了改变。

【虚拟DOM】

&emsp;&emsp;Vue 通过建立一个**虚拟 DOM** 对真实 DOM 发生的变化保持追踪

<div>
<pre>return createElement('h1', this.blogTitle)</pre>
</div>

&emsp;&emsp;createElement到底会返回什么呢？其实不是一个_实际的_ DOM 元素。它更准确的名字可能是 `createNodeDescription`，因为它所包含的信息会告诉 Vue 页面上需要渲染什么样的节点，及其子节点。我们把这样的节点描述为&ldquo;虚拟节点 (Virtual DOM)&rdquo;，也常简写它为&ldquo;VNode&rdquo;。&ldquo;虚拟 DOM&rdquo;是我们对由 Vue 组件树建立起来的整个 VNode 树的称呼

&nbsp;

### createElement

&emsp;&emsp;接下来需要熟悉的是如何在 `createElement` 函数中生成模板。这里是 `createElement` 接受的参数：

<div>
<pre>// @returns {VNode}
createElement(
  // {String | Object | Function}
  // 一个 HTML 标签字符串，组件选项对象，或者一个返回值类型为 String/Object 的函数，必要参数
  'div',
  // {Object}
  // 一个包含模板相关属性的数据对象
  // 这样，可以在 template 中使用这些属性。可选参数。
  {
  },
  // {String | Array}
  // 子节点 (VNodes)，由 `createElement()` 构建而成，
  // 或简单的使用字符串来生成&ldquo;文本节点&rdquo;。可选参数。
  [
    '先写一些文字',
    createElement('h1', '一则头条'),
    createElement(MyComponent, {
      props: {
        someProp: 'foobar'
      }
    })
  ]
)</pre>
</div>

【深入data对象】

&emsp;&emsp;正如在模板语法中，`v-bind:class` 和 `v-bind:style` ，会被特别对待一样，在 VNode 数据对象中，下列属性名是级别最高的字段。该对象也允许绑定普通的 HTML 特性，就像 DOM 属性一样，比如 `innerHTML` (这会取代 `v-html` 指令)

<div>
<pre>{
  // 和`v-bind:class`一样的 API
  'class': {
    foo: true,
    bar: false
  },
  // 和`v-bind:style`一样的 API
  style: {
    color: 'red',
    fontSize: '14px'
  },
  // 正常的 HTML 特性
  attrs: {
    id: 'foo'
  },
  // 组件 props
  props: {
    myProp: 'bar'
  },
  // DOM 属性
  domProps: {
    innerHTML: 'baz'
  },
  // 事件监听器基于 `on`
  // 所以不再支持如 `v-on:keyup.enter` 修饰器
  // 需要手动匹配 keyCode。
  on: {
    click: this.clickHandler
  },
  // 仅对于组件，用于监听原生事件，而不是组件内部使用 `vm.$emit` 触发的事件。
  nativeOn: {
    click: this.nativeClickHandler
  },
  // 自定义指令。注意事项：不能对绑定的旧值设值
  // Vue 会持续追踪
  directives: [
    {
      name: 'my-custom-directive',
      value: '2',
      expression: '1 + 1',
      arg: 'foo',
      modifiers: {
        bar: true
      }
    }
  ],
  // Scoped slots in the form of
  // { name: props =&gt; VNode | Array&lt;VNode&gt; }
  scopedSlots: {
    default: props =&gt; createElement('span', props.text)
  },
  // 如果组件是其他组件的子组件，需为插槽指定名称
  slot: 'name-of-slot',
  // 其他特殊顶层属性
  key: 'myKey',
  ref: 'myRef'
}</pre>
</div>

【完整示例】

&emsp;&emsp;有了这些知识，现在可以完成最开始想实现的组件：

<div>
<pre>var getChildrenTextContent = function (children) {
  return children.map(function (node) {
    return node.children
      ? getChildrenTextContent(node.children)
      : node.text
  }).join('')
}
Vue.component('anchored-heading', {
  render: function (createElement) {
    // create kebabCase id
    var headingId = getChildrenTextContent(this.$slots.default)
      .toLowerCase()
      .replace(/\W+/g, '-')
      .replace(/(^\-|\-$)/g, '')
    return createElement(
      'h' + this.level,
      [
        createElement('a', {
          attrs: {
            name: headingId,
            href: '#' + headingId
          }
        }, this.$slots.default)
      ]
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})</pre>
</div>

【约束】

&emsp;&emsp;组件树中的所有 VNodes 必须是唯一的。这意味着，下面的 render function 是无效的：

<div>
<pre>render: function (createElement) {
  var myParagraphVNode = createElement('p', 'hi')
  return createElement('div', [
    // 错误-重复的 VNodes
    myParagraphVNode, myParagraphVNode
  ])
}</pre>
</div>

&emsp;&emsp;如果真的需要重复很多次的元素/组件，可以使用工厂函数来实现。例如，下面这个例子 render 函数完美有效地渲染了 20 个重复的段落：

<div>
<pre>render: function (createElement) {
  return createElement('div',
    Array.apply(null, { length: 20 }).map(function () {
      return createElement('p', 'hi')
    })
  )
}</pre>
</div>

&nbsp;

### JS代替模板

【v-if和v-for】

&emsp;&emsp;由于使用原生的 JavaScript 来实现某些东西很简单，Vue 的 render 函数没有提供专用的 API。比如，template 中的 `v-if` 和 `v-for`：
<!-- {% raw %} -->
<div>
<pre>&lt;ul v-if="items.length"&gt;
  &lt;li v-for="item in items"&gt;{{ item.name }}&lt;/li&gt;
&lt;/ul&gt;
&lt;p v-else&gt;No items found.&lt;/p&gt;</pre>
</div>
<!-- {% endraw %} -->
&emsp;&emsp;这些都会在 render 函数中被 JavaScript 的 `if`/`else` 和 `map` 重写：

<div>
<pre>render: function (createElement) {
  if (this.items.length) {
    return createElement('ul', this.items.map(function (item) {
      return createElement('li', item.name)
    }))
  } else {
    return createElement('p', 'No items found.')
  }
}</pre>
</div>

【v-model】

&emsp;&emsp;render 函数中没有与 `v-model` 相应的 api，必须自己来实现相应的逻辑：

<div>
<pre>render: function (createElement) {
  var self = this
  return createElement('input', {
    domProps: {
      value: self.value
    },
    on: {
      input: function (event) {
        self.value = event.target.value
        self.$emit('input', event.target.value)
      }
    }
  })
}</pre>
</div>

&emsp;&emsp;这就是深入底层要付出的，尽管麻烦了一些，但相对于 `v-model` 来说，可以更灵活地控制

【事件&amp;按键修饰符】

&emsp;&emsp;对于 `.passive`、`.capture` 和 `.once`事件修饰符，Vue 提供了相应的前缀可以用于 `on`：

<div>
<pre>Modifier(s)     Prefix
.passive     &emsp;&emsp;&amp;
.capture     &emsp;&emsp;!
.once     &emsp;&emsp;&emsp;&emsp;~
.capture.once 　 or
.once.capture    ~!</pre>
</div>

&emsp;&emsp;下面是一个例子

<div>
<pre>on: {
  '!click': this.doThisInCapturingMode,
  '~keyup': this.doThisOnce,
  `~!mouseover`: this.doThisOnceInCapturingMode
}</pre>
</div>

&emsp;&emsp;对于其他的修饰符，前缀不是很重要，因为可以直接在事件处理函数中使用事件方法：

<div>
<pre>Modifier(s)     Equivalent in Handler
.stop     &emsp;&emsp;   event.stopPropagation()
.prevent        event.preventDefault()
.self    &emsp;&emsp;    if (event.target !== event.currentTarget) return
Keys:
.enter, .13     if (event.keyCode !== 13) return (...)
Modifiers Keys:
.ctrl, .alt, .shift, .meta     if (!event.ctrlKey) return (...)</pre>
</div>

&emsp;&emsp;下面是一个使用所有修饰符的例子：

<div>
<pre>on: {
  keyup: function (event) {
    // 如果触发事件的元素不是事件绑定的元素
    // 则返回
    if (event.target !== event.currentTarget) return
    // 如果按下去的不是 enter 键或者
    // 没有同时按下 shift 键
    // 则返回
    if (!event.shiftKey || event.keyCode !== 13) return
    // 阻止 事件冒泡
    event.stopPropagation()
    // 阻止该元素默认的 keyup 事件
    event.preventDefault()
    // ...
  }
}</pre>
</div>

【插槽】

&emsp;&emsp;可以从 `this.$slots` 获取 VNodes 列表中的静态内容：

<div>
<pre>render: function (createElement) {
  // `&lt;div&gt;&lt;slot&gt;&lt;/slot&gt;&lt;/div&gt;`
  return createElement('div', this.$slots.default)
}</pre>
</div>

&emsp;&emsp;还可以从 `this.$scopedSlots` 中获得能用作函数的作用域插槽，这个函数返回 VNodes：

<div>
<pre>render: function (createElement) {
  // `&lt;div&gt;&lt;slot :text="msg"&gt;&lt;/slot&gt;&lt;/div&gt;`
  return createElement('div', [
    this.$scopedSlots.default({
      text: this.msg
    })
  ])
}</pre>
</div>

&emsp;&emsp;如果要用渲染函数向子组件中传递作用域插槽，可以利用 VNode 数据中的 `scopedSlots` 域：

<div>
<pre>render (createElement) {
  return createElement('div', [
    createElement('child', {
      // pass `scopedSlots` in the data object
      // in the form of { name: props =&gt; VNode | Array&lt;VNode&gt; }
      scopedSlots: {
        default: function (props) {
          return createElement('span', props.text)
        }
      }
    })
  ])
}</pre>
</div>

&nbsp;

### JSX

&emsp;&emsp;如果写了很多 `render` 函数，可能会觉得痛苦

<div>
<pre>createElement(
  'anchored-heading', {
    props: {
      level: 1
    }
  }, [
    createElement('span', 'Hello'),
    ' world!'
  ]
)</pre>
</div>

&emsp;&emsp;特别是模板如此简单的情况下：

<div>
<pre>&lt;anchored-heading :level="1"&gt;
  &lt;span&gt;Hello&lt;/span&gt; world!
&lt;/anchored-heading&gt;</pre>
</div>

&emsp;&emsp;这就是为什么会有一个 [Babel 插件](https://github.com/vuejs/babel-plugin-transform-vue-jsx)，用于在 Vue 中使用 JSX 语法的原因，它可以让我们回到更接近于模板的语法上

<div>
<pre>import AnchoredHeading from './AnchoredHeading.vue'
new Vue({
  el: '#demo',
  render (h) {
    return (
      &lt;AnchoredHeading level={1}&gt;
        &lt;span&gt;Hello&lt;/span&gt; world!
      &lt;/AnchoredHeading&gt;
    )
  }
})</pre>
</div>

&emsp;&emsp;注意：将 `h` 作为 `createElement` 的别名是 Vue 生态系统中的一个通用惯例，实际上也是 JSX 所要求的，如果在作用域中 `h` 失去作用，在应用中会触发报错

&nbsp;

### 函数式组件

&emsp;&emsp;之前创建的锚点标题组件是比较简单，没有管理或者监听任何传递给它的状态，也没有生命周期方法。它只是一个接收参数的函数。在这个例子中，我们标记组件为 `functional`，这意味它是无状态 (没有 `data`)，无实例 (没有 `this` 上下文)

&emsp;&emsp;一个 **函数式组件** 就像这样：

<div>
<pre>Vue.component('my-component', {
  functional: true,
  // 为了弥补缺少的实例
  // 提供第二个参数作为上下文
  render: function (createElement, context) {
    // ...
  },
  // Props 可选
  props: {
    // ...
  }
})</pre>
</div>

&emsp;&emsp;注意：在 2.3.0 之前的版本中，如果一个函数式组件想要接受 props，则 `props` 选项是必须的。在 2.3.0 或以上的版本中，你可以省略 `props` 选项，所有组件上的属性都会被自动解析为 props

&emsp;&emsp;组件需要的一切都是通过上下文传递，包括：

<div>
<pre>props：提供 props 的对象
children: VNode 子节点的数组
slots: slots 对象
data：传递给组件的 data 对象
parent：对父组件的引用
listeners: (2.3.0+) 一个包含了组件上所注册的 v-on 侦听器的对象。这只是一个指向 data.on 的别名。
injections: (2.3.0+) 如果使用了 inject 选项，则该对象包含了应当被注入的属性。</pre>
</div>

&emsp;&emsp;在添加 `functional: true` 之后，锚点标题组件的 render 函数之间简单更新增加 `context` 参数，`this.$slots.default` 更新为 `context.children`，之后`this.level` 更新为 `context.props.level`。

&emsp;&emsp;因为函数式组件只是一个函数，所以渲染开销也低很多。然而，对持久化实例的缺乏也意味着函数式组件不会出现在 Vue devtools 的组件树里。

&emsp;&emsp;在作为包装组件时它们也同样非常有用，比如，当需要做这些时：

&emsp;&emsp;1、程序化地在多个组件中选择一个

&emsp;&emsp;2、在将 children, props, data 传递给子组件之前操作它们

&emsp;&emsp;下面是一个依赖传入 props 的值的 `smart-list` 组件例子，它能代表更多具体的组件：

<div>
<pre>var EmptyList = { /* ... */ }
var TableList = { /* ... */ }
var OrderedList = { /* ... */ }
var UnorderedList = { /* ... */ }
Vue.component('smart-list', {
  functional: true,
  render: function (createElement, context) {
    function appropriateListComponent () {
      var items = context.props.items
      if (items.length === 0)           return EmptyList
      if (typeof items[0] === 'object') return TableList
      if (context.props.isOrdered)      return OrderedList
      return UnorderedList
    }
    return createElement(
      appropriateListComponent(),
      context.data,
      context.children
    )
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    isOrdered: Boolean
  }
})</pre>
</div>

【slots()和children对比】

&emsp;&emsp;为什么同时需要 `slots()` 和 `children`。`slots().default` 不是和 `children` 类似的吗？在一些场景中，是这样，但是如果是函数式组件和下面这样的 children 呢？

<div>
<pre>&lt;my-functional-component&gt;
  &lt;p slot="foo"&gt;
    first
  &lt;/p&gt;
  &lt;p&gt;second&lt;/p&gt;
&lt;/my-functional-component&gt;</pre>
</div>

&emsp;&emsp;对于这个组件，`children` 会给两个段落标签，而 `slots().default` 只会传递第二个匿名段落标签，`slots().foo` 会传递第一个具名段落标签。同时拥有 `children` 和 `slots()` ，因此可以选择让组件通过 `slot()` 系统分发或者简单的通过 `children` 接收，让其他组件去处理

&nbsp;

### 模板编译

&emsp;&emsp;Vue 的模板实际是编译成了 render 函数。这是一个实现细节，通常不需要关心。下面是一个使用 `Vue.compile` 来实时编译模板字符串的简单 demo：
<!-- {% raw %} -->
<div>
<pre>&lt;div&gt;
  &lt;header&gt;
    &lt;h1&gt;I'm a template!&lt;/h1&gt;
  &lt;/header&gt;
  &lt;p v-if="message"&gt;
    {{ message }}
  &lt;/p&gt;
  &lt;p v-else&gt;
    No message.
  &lt;/p&gt;
&lt;/div&gt;    </pre>
</div>
<!-- {% endraw %} -->
&emsp;&emsp;render:

<div>
<pre>function anonymous(
) {
  with(this){return _c('div',[_m(0),(message)?_c('p',[_v(_s(message))]):_c('p',[_v("No message.")])])}
}</pre>
</div>

&emsp;&emsp;staticRenderFns:

<div>
<pre>_m(0): function anonymous(
) {
  with(this){return _c('header',[_c('h1',[_v("I'm a template!")])])}
}</pre>
</div>
