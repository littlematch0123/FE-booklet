# Vue内容分发slot

&emsp;&emsp;为了让组件可以组合，需要一种方式来混合父组件的内容与子组件自己的模板。这个过程被称为 **内容分发** (或 &ldquo;transclusion&rdquo; )。Vue实现了一个内容分发 API，参照了当前 Web 组件规范草案，使用特殊的 `<slot>` 元素作为原始内容的插槽。本文将详细介绍Vue内容分发slot

&nbsp;

### 编译作用域

&emsp;&emsp;在深入内容分发 API 之前，先明确内容在哪个作用域里编译。假定模板为
<!-- {% raw %} -->
<div>
<pre>&lt;child-component&gt;
  {{ message }}
&lt;/child-component&gt;</pre>
</div>
<!-- {% endraw %} -->

&emsp;&emsp;`message`应该绑定到父组件的数据，还是绑定到子组件的数据？答案是父组件。组件作用域简单地说是：父组件模板的内容在父组件作用域内编译；子组件模板的内容在子组件作用域内编译。

&emsp;&emsp;一个常见错误是试图在父组件模板内将一个指令绑定到子组件的属性/方法：

<div>
<pre>&lt;!-- 无效 --&gt;
&lt;child-component v-show="someChildProperty"&gt;&lt;/child-component&gt;</pre>
</div>

&emsp;&emsp;假定`someChildProperty`是子组件的属性，上例不会如预期工作。父组件模板不应该知道子组件的状态

&emsp;&emsp;如果要绑定作用域内的指令到一个组件的根节点，应当在组件自己的模板上做：

<div>
<pre>Vue.component('child-component', {
  // 有效，因为是在正确的作用域内
  template: '&lt;div v-show="someChildProperty"&gt;Child&lt;/div&gt;',
  data: function () {
    return {
      someChildProperty: true
    }
  }
})</pre>
</div>

&emsp;&emsp;类似地，分发内容是在父作用域内编译

&nbsp;

### 默认丢弃

&emsp;&emsp;一般地，如果子组件模板不包含`<slot>`插口，父组件的内容将会被**丢弃**

<div>
<pre>var parentNode = {
  template: `
  &lt;div class="parent"&gt;
    &lt;p&gt;父组件&lt;/p&gt;
    &lt;child&gt;
      &lt;p&gt;测试内容&lt;/p&gt;
    &lt;/child&gt;
  &lt;/div&gt;
  `,
  components: {
    'child': childNode
  },
};</pre>
</div>
<div>
<pre>&lt;div id="example"&gt;
  &lt;parent&gt;&lt;/parent&gt;
&lt;/div&gt;
&lt;script src="https://unpkg.com/vue"&gt;&lt;/script&gt;
&lt;script&gt;
var childNode = {
  template: `
  &lt;div class="child"&gt;
    &lt;p&gt;子组件&lt;/p&gt;
  &lt;/div&gt;
  `,
};
var parentNode = {
  template: `
  &lt;div class="parent"&gt;
    &lt;p&gt;父组件&lt;/p&gt;
    &lt;child&gt;
      &lt;p&gt;测试内容&lt;/p&gt;
    &lt;/child&gt;
  &lt;/div&gt;
  `,
  components: {
    'child': childNode
  },
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

&emsp;&emsp;如下图所示，&lt;child&gt;所包含的&lt;p&gt;测试内容&lt;/p&gt;被丢弃


![vue_components_slot1](https://pic.xiaohuochai.site/blog/vue_components_slot1.png)


&nbsp;

### 内联模板

&emsp;&emsp;如果子组件有 `inline-template` 特性，组件将把它的内容当作它的模板，而忽略真实的模板内容

&emsp;&emsp;但是 `inline-template` 让模板的作用域难以理解

<div>
<pre>var childNode = {
  template: `
  &lt;div class="child"&gt;
    &lt;p&gt;子组件&lt;/p&gt;
  &lt;/div&gt;
  `,
};</pre>
</div>
<div>
<pre>var parentNode = {
  template: `
  &lt;div class="parent"&gt;
    &lt;p&gt;父组件&lt;/p&gt;
    &lt;child inline-template&gt;
      &lt;p&gt;测试内容&lt;/p&gt;
    &lt;/child&gt;
  &lt;/div&gt;
  `,
  components: {
    'child': childNode
  },
};</pre>
</div>

![vue_components_slot2](https://pic.xiaohuochai.site/blog/vue_components_slot2.png)


&nbsp;

### 匿名slot

&emsp;&emsp;当子组件模板只有一个没有属性的 slot 时，父组件整个内容片段将插入到 slot 所在的 DOM 位置，并替换掉 slot 标签本身

<div>
<pre>var childNode = {
  template: `
  &lt;div class="child"&gt;
    &lt;p&gt;子组件&lt;/p&gt;
    &lt;slot&gt;&lt;/slot&gt;
  &lt;/div&gt;
  `,
};</pre>
</div>
<div>
<pre>var parentNode = {
  template: `
  &lt;div class="parent"&gt;
    &lt;p&gt;父组件&lt;/p&gt;
    &lt;child&gt;
      &lt;p&gt;测试内容&lt;/p&gt;
    &lt;/child&gt;
  &lt;/div&gt;
  `,
  components: {
    'child': childNode
  },
};</pre>
</div>

![vue_components_slot3](https://pic.xiaohuochai.site/blog/vue_components_slot3.png)


&emsp;&emsp;如果出现多于1个的匿名slot，vue将报错

<div>
<pre>var childNode = {
  template: `
  &lt;div class="child"&gt;
    &lt;p&gt;子组件&lt;/p&gt;
    &lt;slot&gt;&lt;/slot&gt;
    &lt;slot&gt;&lt;/slot&gt;
  &lt;/div&gt;
  `,
};</pre>
</div>

![vue_components_slot4](https://pic.xiaohuochai.site/blog/vue_components_slot4.png)


【默认值】

&emsp;&emsp;最初在 &lt;slot&gt; 标签中的任何内容都被视为**备用内容**，或者称为默认值。备用内容在子组件的作用域内编译，并且只有在宿主元素为空，且没有要插入的内容时才显示备用内容

&emsp;&emsp;当slot存在默认值，且父元素在&lt;child&gt;中没有要插入的内容时，显示默认值

<div>
<pre>var childNode = {
  template: `
  &lt;div class="child"&gt;
    &lt;p&gt;子组件&lt;/p&gt;
    &lt;slot&gt;&lt;p&gt;我是默认值&lt;/p&gt;&lt;/slot&gt;
  &lt;/div&gt;
  `,
};
var parentNode = {
  template: `
  &lt;div class="parent"&gt;
    &lt;p&gt;父组件&lt;/p&gt;
    &lt;child&gt;&lt;/child&gt;
  &lt;/div&gt;
  `,
  components: {
    'child': childNode
  },
};</pre>
</div>

![vue_components_slot5](https://pic.xiaohuochai.site/blog/vue_components_slot5.png)


&emsp;&emsp;当slot存在默认值，且父元素在&lt;child&gt;中存在要插入的内容时，则显示设置值

<div>
<pre>var childNode = {
  template: `
  &lt;div class="child"&gt;
    &lt;p&gt;子组件&lt;/p&gt;
    &lt;slot&gt;&lt;p&gt;我是默认值&lt;/p&gt;&lt;/slot&gt;
  &lt;/div&gt;
  `,
};
var parentNode = {
  template: `
  &lt;div class="parent"&gt;
    &lt;p&gt;父组件&lt;/p&gt;
    &lt;child&gt;
      &lt;p&gt;我是设置值&lt;/p&gt;
    &lt;/child&gt;
  &lt;/div&gt;
  `,
  components: {
    'child': childNode
  },
};</pre>
</div>

![vue_components_slot6](https://pic.xiaohuochai.site/blog/vue_components_slot6.png)


&nbsp;

### 具名Slot

&emsp;&emsp;&lt;slot&gt; 元素可以用一个特殊的属性 `name` 来配置如何分发内容。多个 slot 可以有不同的名字。具名 slot 将匹配内容片段中有对应 `slot` 特性的元素

<div>
<pre>var childNode = {
  template: `
  &lt;div class="child"&gt;
    &lt;p&gt;子组件&lt;/p&gt;
    &lt;slot name="my-header"&gt;头部默认值&lt;/slot&gt;
    &lt;slot name="my-body"&gt;主体默认值&lt;/slot&gt;
    &lt;slot name="my-footer"&gt;尾部默认值&lt;/slot&gt;
  &lt;/div&gt;
  `,
};</pre>
</div>
<div>
<pre>var parentNode = {
  template: `
  &lt;div class="parent"&gt;
    &lt;p&gt;父组件&lt;/p&gt;
    &lt;child&gt;
      &lt;p slot="my-header"&gt;我是头部&lt;/p&gt;
      &lt;p slot="my-footer"&gt;我是尾部&lt;/p&gt;
    &lt;/child&gt;
  &lt;/div&gt;
  `,
  components: {
    'child': childNode
  },
};</pre>
</div>

![vue_components_slot7](https://pic.xiaohuochai.site/blog/vue_components_slot7.png)


&emsp;&emsp;仍然可以有一个匿名 slot，它是**默认 slot**，作为找不到匹配的内容片段的备用插槽。匿名slot只能作为没有slot属性的元素的插槽，有slot属性的元素如果没有配置slot，则会被抛弃

<div>
<pre>var childNode = {
  template: `
  &lt;div class="child"&gt;
    &lt;p&gt;子组件&lt;/p&gt;
    &lt;slot name="my-body"&gt;主体默认值&lt;/slot&gt;
    &lt;slot&gt;&lt;/slot&gt;
  &lt;/div&gt;
  `,
};</pre>
</div>
<div>
<pre>var parentNode = {
  template: `
  &lt;div class="parent"&gt;
    &lt;p&gt;父组件&lt;/p&gt;
    &lt;child&gt;
      &lt;p slot="my-body"&gt;我是主体&lt;/p&gt;
      &lt;p&gt;我是其他内容&lt;/p&gt;
      &lt;p slot="my-footer"&gt;我是尾部&lt;/p&gt;
    &lt;/child&gt;
  &lt;/div&gt;
  `,
  components: {
    'child': childNode
  },
};</pre>
</div>

&emsp;&emsp;&lt;p slot="my-body"&gt;插入&lt;slot name="my-body"&gt;中，&lt;p&gt;我是其他内容&lt;/p&gt;插入&lt;slot&gt;中，而&lt;p slot="my-footer"&gt;被丢弃


![vue_components_slot8](https://pic.xiaohuochai.site/blog/vue_components_slot8.png)


&emsp;&emsp;如果没有默认的 slot，这些找不到匹配的内容片段也将被抛弃

<div>
<pre>var childNode = {
  template: `
  &lt;div class="child"&gt;
    &lt;p&gt;子组件&lt;/p&gt;
    &lt;slot name="my-body"&gt;主体默认值&lt;/slot&gt;
  &lt;/div&gt;
  `,
};</pre>
</div>
<div>
<pre>var parentNode = {
  template: `
  &lt;div class="parent"&gt;
    &lt;p&gt;父组件&lt;/p&gt;
    &lt;child&gt;
      &lt;p slot="my-body"&gt;我是主体&lt;/p&gt;
      &lt;p&gt;我是其他内容&lt;/p&gt;
      &lt;p slot="my-footer"&gt;我是尾部&lt;/p&gt;
    &lt;/child&gt;
  &lt;/div&gt;
  `,
  components: {
    'child': childNode
  },
};</pre>
</div>

&emsp;&emsp;&lt;p&gt;我是其他内容&lt;/p&gt;和&lt;p slot="my-footer"&gt;都被抛弃


![vue_components_slot9](https://pic.xiaohuochai.site/blog/vue_components_slot9.png)


&nbsp;

### 作用域插槽

&emsp;&emsp;作用域插槽是一种特殊类型的插槽，用作使用一个 (能够传递数据到) 可重用模板替换已渲染元素。

&emsp;&emsp;在子组件中，只需将数据传递到插槽，就像将 props 传递给组件一样

<div>
<pre>&lt;div class="child"&gt;
  &lt;slot text="hello from child"&gt;&lt;/slot&gt;
&lt;/div&gt;</pre>
</div>

&emsp;&emsp;在父级中，具有特殊属性 `scope` 的 &lt;template&gt; 元素必须存在，表示它是作用域插槽的模板。`scope` 的值对应一个临时变量名，此变量接收从子组件中传递的 props 对象
<!-- {% raw %} -->
<div>
<pre>var childNode = {
  template: `
  &lt;div class="child"&gt;
    &lt;p&gt;子组件&lt;/p&gt;
      &lt;slot xxx="hello from child"&gt;&lt;/slot&gt;
  &lt;/div&gt;
  `,
};
var parentNode = {
  template: `
  &lt;div class="parent"&gt;
    &lt;p&gt;父组件&lt;/p&gt;
    &lt;child&gt;
      &lt;template scope="props"&gt;
        &lt;p&gt;hello from parent&lt;/p&gt;
        &lt;p&gt;{{ props.xxx }}&lt;/p&gt;
      &lt;/template&gt;
    &lt;/child&gt;
  &lt;/div&gt;
  `,
  components: {
    'child': childNode
  },
};</pre>
</div>
<!-- {% endraw %} -->
&emsp;&emsp;如果渲染以上结果，得到的输出是


![vue_components_slot10](https://pic.xiaohuochai.site/blog/vue_components_slot10.png)


【列表组件】

&emsp;&emsp;作用域插槽更具代表性的用例是列表组件，允许组件自定义应该如何渲染列表每一项
<!-- {% raw %} -->
<div>
<pre>var childNode = {
  template: `
  &lt;ul&gt;
    &lt;slot name="item" v-for="item in items" :text="item.text"&gt;默认值&lt;/slot&gt;
  &lt;/ul&gt;
  `,
  data(){
    return{
      items:[
        {id:1,text:'第1段'},
        {id:2,text:'第2段'},
        {id:3,text:'第3段'},
      ]
    }
  }
};</pre>
</div>
<div>
<pre>var parentNode = {
  template: `
  &lt;div class="parent"&gt;
    &lt;p&gt;父组件&lt;/p&gt;
    &lt;child&gt;
      &lt;template slot="item" scope="props"&gt;
        &lt;li&gt;{{ props.text }}&lt;/li&gt;
      &lt;/template&gt;
    &lt;/child&gt;
  &lt;/div&gt;
  `,
  components: {
    'child': childNode
  },
};</pre>
</div>
<!-- {% endraw %} -->

![vue_components_slot11](https://pic.xiaohuochai.site/blog/vue_components_slot11.png)


