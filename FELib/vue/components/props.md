# Vue组件选项props

&emsp;&emsp;组件接受的选项大部分与Vue实例一样，而选项props是组件中非常重要的一个选项。在 Vue 中，父子组件的关系可以总结为&nbsp;props down, events up。父组件通过&nbsp;props&nbsp;向下传递数据给子组件，子组件通过&nbsp;events&nbsp;给父组件发送消息。本文将详细介绍Vue组件选项props


![vue_components_props1](https://pic.xiaohuochai.site/blog/vue_components_props1.png)


&nbsp;

### 父子级组件

&emsp;&emsp;在介绍props之前，先介绍父子级组件的写法

&emsp;&emsp;在一个良好定义的接口中尽可能将父子组件解耦是很重要的。这保证了每个组件可以在相对隔离的环境中书写和理解，也大幅提高了组件的可维护性和可重用性

【错误写法】

&emsp;&emsp;现在来介绍两种父子级组件的错误写法

&emsp;&emsp;下面这种形式的写法是错误的，因为当子组件注册到父组件时，Vue.js会编译好父组件的模板，模板的内容已经决定了父组件将要渲染的HTML

&emsp;&emsp;`<parent></parent>`运行时，它的一些子标签只会被当作普通的HTML来执行，&lt;child&gt;&lt;/child&gt;不是标准的HTML标签，会被浏览器直接忽视掉

<div>
<pre>&lt;div id="example"&gt;
  &lt;parent&gt;
    &lt;child&gt;&lt;/child&gt;
    &lt;child&gt;&lt;/child&gt;
  &lt;/parent&gt;
&lt;/div&gt;</pre>
</div>

&nbsp;&emsp;&emsp;在父组件标签之外使用子组件也是错误的

<div>
<pre>&lt;div id="example"&gt;
  &lt;parent&gt;&lt;/parent&gt;
  &lt;child&gt;&lt;/child&gt;
&lt;/div&gt;</pre>
</div>

【正确写法】

<div>
<pre>&lt;div id="example"&gt;
  &lt;parent&gt;&lt;/parent&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
var childNode = {
  template: '&lt;div&gt;childNode&lt;/div&gt;',
}
var parentNode = {
  template: `
  &lt;div class="parent"&gt;
    &lt;child&gt;&lt;/child&gt;
    &lt;child&gt;&lt;/child&gt;
  &lt;/div&gt;
  `,
  components: {
    'child': childNode
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

![vue_components_props2](https://pic.xiaohuochai.site/blog/vue_components_props2.png)


&nbsp;

### 静态props

&emsp;&emsp;组件实例的作用域是孤立的。这意味着不能 (也不应该) 在子组件的模板内直接引用父组件的数据。要让子组件使用父组件的数据，需要通过子组件的&nbsp;props&nbsp;选项

&emsp;&emsp;使用Prop传递数据包括静态和动态两种形式，下面先介绍静态props

&emsp;&emsp;子组件要显式地用&nbsp;`props`&nbsp;选项声明它期待获得的数据
<!-- {% raw %} -->
<div>
<pre>var childNode = {
  template: '&lt;div&gt;{{message}}&lt;/div&gt;',
  props:['message']
}</pre>
</div>
<!-- {% endraw %} -->
&emsp;&emsp;静态Prop通过为子组件在父组件中的占位符添加特性的方式来达到传值的目的

<div>
<pre>&lt;div id="example"&gt;
  &lt;parent&gt;&lt;/parent&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
var childNode = {
  template: '&lt;div&gt;{{message}}&lt;/div&gt;',
  props:['message']
}
var parentNode = {
  template: `
  &lt;div class="parent"&gt;
    &lt;child message="aaa"&gt;&lt;/child&gt;
    &lt;child message="bbb"&gt;&lt;/child&gt;
  &lt;/div&gt;`,
  components: {
    'child': childNode
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

![vue_components_props3](https://pic.xiaohuochai.site/blog/vue_components_props3.png)


&nbsp;

### 命名约定

&emsp;&emsp;对于props声明的属性来说，在父级HTML模板中，属性名需要使用中划线写法

<div>
<pre>var parentNode = {
  template: `
  &lt;div class="parent"&gt;
    &lt;child my-message="aaa"&gt;&lt;/child&gt;
    &lt;child my-message="bbb"&gt;&lt;/child&gt;
  &lt;/div&gt;`,
  components: {
    'child': childNode
  }
};</pre>
</div>

&emsp;&emsp;子级props属性声明时，使用小驼峰或者中划线写法都可以；而子级模板使用从父级传来的变量时，需要使用对应的小驼峰写法
<!-- {% raw %} -->
<div>
<pre>var childNode = {
  template: '&lt;div&gt;{{myMessage}}&lt;/div&gt;',
  props:['myMessage']
}</pre>
</div>
<div>
<pre>var childNode = {
  template: '&lt;div&gt;{{myMessage}}&lt;/div&gt;',
  props:['my-message']
}</pre>
</div>
<!-- {% endraw %} -->
&nbsp;

### 动态props

&emsp;&emsp;在模板中，要动态地绑定父组件的数据到子模板的 props，与绑定到任何普通的HTML特性相类似，就是用&nbsp;`v-bind`。每当父组件的数据变化时，该变化也会传导给子组件
<!-- {% raw %} -->
<div>
<pre>var childNode = {
  template: '&lt;div&gt;{{myMessage}}&lt;/div&gt;',
  props:['myMessage']
}</pre>
</div>
<div>
<pre>var parentNode = {
  template: `
  &lt;div class="parent"&gt;
    &lt;child :my-message="data1"&gt;&lt;/child&gt;
    &lt;child :my-message="data2"&gt;&lt;/child&gt;
  &lt;/div&gt;`,
  components: {
    'child': childNode
  },
  data(){
    return {
      'data1':'aaa',
      'data2':'bbb'
    }
  }
};</pre>
</div>
<!-- {% endraw %} -->

&nbsp;

### 传递数字

&emsp;&emsp;初学者常犯的一个错误是使用字面量语法传递数值
<!-- {% raw %} -->
<div>
<pre>&lt;!-- 传递了一个字符串 "1" --&gt;
&lt;comp some-prop="1"&gt;&lt;/comp&gt;</pre>
</div>
<div>
<pre>&lt;div id="example"&gt;
  &lt;my-parent&gt;&lt;/my-parent&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
var childNode = {
  template: '&lt;div&gt;{{myMessage}}的类型是{{type}}&lt;/div&gt;',
  props:['myMessage'],
  computed:{
    type(){
      return typeof this.myMessage
    }
  }
}
var parentNode = {
  template: `
  &lt;div class="parent"&gt;
    &lt;my-child my-message="1"&gt;&lt;/my-child&gt;
  &lt;/div&gt;`,
  components: {
    'myChild': childNode
  }
};
// 创建根实例
new Vue({
  el: '#example',
  components: {
    'MyParent': parentNode
  }
})
&lt;/script&gt;</pre>
</div>
<!-- {% endraw %} -->

![vue_components_props4](https://pic.xiaohuochai.site/blog/vue_components_props4.png)


&emsp;&emsp;因为它是一个字面 prop，它的值是字符串 `"1"` 而不是 number。如果想传递一个实际的 number，需要使用 `v-bind`，从而让它的值被当作JS表达式计算&nbsp;

<div>
<pre>&lt;!-- 传递实际的 number --&gt;
&lt;comp v-bind:some-prop="1"&gt;&lt;/comp&gt;</pre>
</div>
<div>
<pre>var parentNode = {
  template: `
  &lt;div class="parent"&gt;
    &lt;my-child :my-message="1"&gt;&lt;/my-child&gt;
  &lt;/div&gt;`,
  components: {
    'myChild': childNode
  }
};</pre>
</div>

![vue_components_props5](https://pic.xiaohuochai.site/blog/vue_components_props5.png)


&emsp;&emsp;或者可以使用动态props，在data属性中设置对应的数字1

<div>
<pre>var parentNode = {
  template: `
  &lt;div class="parent"&gt;
    &lt;my-child :my-message="data"&gt;&lt;/my-child&gt;
  &lt;/div&gt;`,
  components: {
    'myChild': childNode
  },
  data(){
    return {
      'data': 1
    }
  }
};</pre>
</div>

&nbsp;

### props验证

&emsp;&emsp;可以为组件的 props 指定验证规格。如果传入的数据不符合规格，Vue会发出警告。当组件给其他人使用时，这很有用

&emsp;&emsp;要指定验证规格，需要用对象的形式，而不能用字符串数组

<div>
<pre>Vue.component('example', {
  props: {
    // 基础类型检测 (`null` 意思是任何类型都可以)
    propA: Number,
    // 多种类型
    propB: [String, Number],
    // 必传且是字符串
    propC: {
      type: String,
      required: true
    },
    // 数字，有默认值
    propD: {
      type: Number,
      default: 100
    },
    // 数组/对象的默认值应当由一个工厂函数返回
    propE: {
      type: Object,
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        return value &gt; 10
      }
    }
  }
})</pre>
</div>

&emsp;&emsp;`type` 可以是下面原生构造器

<div>
<pre>String
Number
Boolean
Function
Object
Array
Symbol</pre>
</div>

&emsp;&emsp;`type` 也可以是一个自定义构造器函数，使用 `instanceof` 检测。

&emsp;&emsp;当 prop 验证失败，Vue 会在抛出警告 (如果使用的是开发版本)。props会在组件实例创建**之前**进行校验，所以在 `default` 或 `validator` 函数里，诸如 `data`、`computed` 或 `methods` 等实例属性还无法使用

&emsp;&emsp;下面是一个简单例子，如果传入子组件的message不是数字，则抛出警告
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;parent&gt;&lt;/parent&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
var childNode = {
  template: '&lt;div&gt;{{message}}&lt;/div&gt;',
  props:{
    'message':Number
  }
}
var parentNode = {
  template: `
  &lt;div class="parent"&gt;
    &lt;child :message="msg"&gt;&lt;/child&gt;
  &lt;/div&gt;`,
  components: {
    'child': childNode
  },
  data(){
    return{
      msg: '123'
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
&emsp;&emsp;传入数字123时，则无警告提示。传入字符串'123'时，结果如下所示


![vue_components_props6](https://pic.xiaohuochai.site/blog/vue_components_props6.png)


&emsp;&emsp;将上面代码中，子组件的内容修改如下，可自定义验证函数，当函数返回为false时，则输出警告提示
<!-- {% raw %} -->
<div>
<pre>var childNode = {
  template: '&lt;div&gt;{{message}}&lt;/div&gt;',
  props:{
    'message':{
      validator: function (value) {
        return value &gt; 10
      }
    }
  }
}</pre>
</div>
<!-- {% endraw %} -->
&emsp;&emsp;在父组件中传入msg值为1，由于小于10，则输出警告提示

<div>
<pre>var parentNode = {
  template: `
  &lt;div class="parent"&gt;
    &lt;child :message="msg"&gt;&lt;/child&gt;
  &lt;/div&gt;`,
  components: {
    'child': childNode
  },
  data(){
    return{
      msg:1
    }
  }
};</pre>
</div>

![vue_components_props7](https://pic.xiaohuochai.site/blog/vue_components_props7.png)


&nbsp;

### 单向数据流

&emsp;&emsp;prop 是单向绑定的：当父组件的属性变化时，将传导给子组件，但是不会反过来。这是为了防止子组件无意修改了父组件的状态&mdash;&mdash;这会让应用的数据流难以理解

&emsp;&emsp;另外，每次父组件更新时，子组件的所有 prop 都会更新为最新值。这意味着不应该在子组件内部改变 prop。如果这么做了，Vue 会在控制台给出警告

&emsp;&emsp;下面是一个典型例子
<!-- {% raw %} -->
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
      &lt;input v-model="childMsg"&gt;
    &lt;/div&gt;
    &lt;p&gt;{{childMsg}}&lt;/p&gt;
  &lt;/div&gt;
  `,
  props:['childMsg']
}
var parentNode = {
  template: `
  &lt;div class="parent"&gt;
    &lt;div&gt;
      &lt;span&gt;父组件数据&lt;/span&gt;
      &lt;input v-model="msg"&gt;
    &lt;/div&gt;
    &lt;p&gt;{{msg}}&lt;/p&gt;
    &lt;child :child-msg="msg"&gt;&lt;/child&gt;
  &lt;/div&gt;
  `,
  components: {
    'child': childNode
  },
  data(){
    return {
      'msg':'match'
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
&emsp;&emsp;父组件数据变化时，子组件数据会相应变化；而子组件数据变化时，父组件数据不变，并在控制台显示警告

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/vue/module/m6.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;修改子组件数据时，打开浏览器控制台会出现下图所示警告提示


![vue_components_props8](https://pic.xiaohuochai.site/blog/vue_components_props8.png)


&nbsp;

### 修改prop数据

&emsp;&emsp;修改prop中的数据，通常有以下两种原因

&emsp;&emsp;1、prop 作为初始值传入后，子组件想把它当作局部数据来用

&emsp;&emsp;2、prop 作为初始值传入，由子组件处理成其它数据输出

&emsp;&emsp;注意：JS中对象和数组是引用类型，指向同一个内存空间，如果 prop 是一个对象或数组，在子组件内部改变它**会影响**父组件的状态

&emsp;&emsp;对于这两种情况，正确的应对方式是

&emsp;&emsp;1、定义一个局部变量，并用 prop 的值初始化它

<div>
<pre>props: ['initialCounter'],
data: function () {
  return { counter: this.initialCounter }
}</pre>
</div>

&emsp;&emsp;但是，定义的局部变量counter只能接受initialCounter的初始值，当父组件要传递的值发生变化时，counter无法接收到最新值
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
    &lt;div&gt;
      &lt;span&gt;子组件数据&lt;/span&gt;
      &lt;input v-model="temp"&gt;
    &lt;/div&gt;
    &lt;p&gt;{{temp}}&lt;/p&gt;
  &lt;/div&gt;
  `,
  props:['childMsg'],
  data(){
    return{
      temp:this.childMsg
    }
  },
};
var parentNode = {
  template: `
  &lt;div class="parent"&gt;
    &lt;div&gt;
      &lt;span&gt;父组件数据&lt;/span&gt;
      &lt;input v-model="msg"&gt;
    &lt;/div&gt;
    &lt;p&gt;{{msg}}&lt;/p&gt;
    &lt;child :child-msg="msg"&gt;&lt;/child&gt;
  &lt;/div&gt;
  `,
  components: {
    'child': childNode
  },
  data(){
    return {
      'msg':'match'
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
&emsp;&emsp;下面示例中，除初始值外，父组件的值无法更新到子组件中

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/vue/module/m7.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;2、定义一个计算属性，处理 prop 的值并返回

<div>
<pre>props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}</pre>
</div>

&emsp;&emsp;但是，由于是计算属性，则只能显示值，而不能设置值
<!-- {% raw %} -->
<div>
<pre>&lt;script src="https://unpkg.com/vue"&gt;&lt;/script&gt;
&lt;script&gt;
var childNode = {
  template: `
  &lt;div class="child"&gt;
    &lt;div&gt;
      &lt;span&gt;子组件数据&lt;/span&gt;
      &lt;input v-model="temp"&gt;
    &lt;/div&gt;
    &lt;p&gt;{{temp}}&lt;/p&gt;
  &lt;/div&gt;
  `,
  props:['childMsg'],
  computed:{
      temp(){
        return this.childMsg
      }
  },
};
var parentNode = {
  template: `
  &lt;div class="parent"&gt;
    &lt;div&gt;
      &lt;span&gt;父组件数据&lt;/span&gt;
      &lt;input v-model="msg"&gt;
    &lt;/div&gt;
    &lt;p&gt;{{msg}}&lt;/p&gt;
    &lt;child :child-msg="msg"&gt;&lt;/child&gt;
  &lt;/div&gt;
  `,
  components: {
    'child': childNode
  },
  data(){
    return {
      'msg':'match'
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
&emsp;&emsp;下面示例中，由于子组件使用的是计算属性，所以，子组件的数据无法手动修改

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/vue/module/m8.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;3、更加妥帖的方案是，使用变量储存prop的初始值，并使用watch来观察prop的值的变化。发生变化时，更新变量的值
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
    &lt;div&gt;
      &lt;span&gt;子组件数据&lt;/span&gt;
      &lt;input v-model="temp"&gt;
    &lt;/div&gt;
    &lt;p&gt;{{temp}}&lt;/p&gt;
  &lt;/div&gt;
  `,
  props:['childMsg'],
  data(){
    return{
      temp:this.childMsg
    }
  },
  watch:{
    childMsg(){
      this.temp = this.childMsg
    }
  }
};
var parentNode = {
  template: `
  &lt;div class="parent"&gt;
    &lt;div&gt;
      &lt;span&gt;父组件数据&lt;/span&gt;
      &lt;input v-model="msg"&gt;
    &lt;/div&gt;
    &lt;p&gt;{{msg}}&lt;/p&gt;
    &lt;child :child-msg="msg"&gt;&lt;/child&gt;
  &lt;/div&gt;
  `,
  components: {
    'child': childNode
  },
  data(){
    return {
      'msg':'match'
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
<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/vue/module/m5.html" frameborder="0" width="320" height="240"></iframe>
