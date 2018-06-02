# Vue数组更新及过滤排序

&emsp;&emsp;Vue为了增加列表渲染的功能，增加了一组观察数组的方法，而且可以显示一个数组的过滤或排序的副本。本文将详细介绍Vue数组更新及过滤排序

&nbsp;

### 变异方法

&emsp;&emsp;Vue 包含一组观察数组的变异方法，它们将会触发视图更新，包含以下方法

<div>
<pre>push() 接收任意数量的参数，把它们逐个添加到数组末尾，并返回修改后数组的长度
pop() 从数组末尾移除最后一项，减少数组的length值，然后返回移除的项
shift() 移除数组中的第一个项并返回该项，同时数组的长度减1
unshift() 在数组前端添加任意个项并返回新数组长度
splice() 删除原数组的一部分成员，并可以在被删除的位置添加入新的数组成员
sort() 调用每个数组项的toString()方法，然后比较得到的字符串排序，返回经过排序之后的数组
reverse() 用于反转数组的顺序，返回经过排序之后的数组</pre>
</div>
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;div&gt;
    &lt;button @click='push'&gt;push&lt;/button&gt;
    &lt;button @click='pop'&gt;pop&lt;/button&gt;
    &lt;button @click='shift'&gt;shift&lt;/button&gt;
    &lt;button @click='unshift'&gt;unshift&lt;/button&gt;
    &lt;button @click='splice'&gt;splice&lt;/button&gt;
    &lt;button @click='sort'&gt;sort&lt;/button&gt;
    &lt;button @click='reverse'&gt;reverse&lt;/button&gt;
  &lt;/div&gt;
  &lt;ul&gt;
    &lt;li v-for="item in items" &gt;
      {{ item.message }}
    &lt;/li&gt;
  &lt;/ul&gt;  
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var example = new Vue({
  el: '#example',
  data: {
    items: [
      {message: 'Foo' },
      {message: 'Bar' },
      {message: 'Baz' }
    ],
    addValue:{message:'match'}
  },
  methods:{
    push(){
      this.items.push(this.addValue)
    },
    pop(){
      this.items.pop()
    },
    shift(){
      this.items.shift()
    },
    unshift(){
      this.items.unshift(this.addValue)
    },
    splice(){
      this.items.splice(0,1)
    },
    sort(){
     this.items.sort()
    },
    reverse(){
      this.items.reverse()
    },
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 150px;" src="https://demo.xiaohuochai.site/vue/template/t3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 非变异方法

&emsp;&emsp;变异方法(mutation method)，顾名思义，会改变被这些方法调用的原始数组。相比之下，也有非变异(non-mutating method)方法，例如： `filter()`, `concat()`, `slice()` 。这些不会改变原始数组，但总是返回一个新数组。当使用非变异方法时，可以用新数组替换旧数组

<div>
<pre>concat() 先创建当前数组一个副本，然后将接收到的参数添加到这个副本的末尾，最后返回新构建的数组
slice() 基于当前数组中一个或多个项创建一个新数组，接受一个或两个参数，即要返回项的起始和结束位置，最后返回新数组
map() 对数组的每一项运行给定函数，返回每次函数调用的结果组成的数组
filter() 对数组中的每一项运行给定函数，该函数会返回true的项组成的数组
</pre>
</div>
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;div&gt;
    &lt;button @click='concat'&gt;concat&lt;/button&gt;
    &lt;button @click='slice'&gt;slice&lt;/button&gt;
    &lt;button @click='map'&gt;map&lt;/button&gt;
    &lt;button @click='filter'&gt;filter&lt;/button&gt;
  &lt;/div&gt;
  &lt;ul&gt;
    &lt;li v-for="item in items" &gt;
      {{ item }}
    &lt;/li&gt;
  &lt;/ul&gt;  
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var example = new Vue({
  el: '#example',
  data: {
    items: ['Foo','Bar','Baz'],
    addValue:'match'
  },
  methods:{
    concat(){
      this.items =  this.items.concat(this.addValue)
    },
    slice(){
      this.items =  this.items.slice(1)
    },
    map(){
      this.items =  this.items.map(function(item,index,arr){
        return index + item; 
      })
    },
    filter(){
      this.items =  this.items.filter(function(item,index,arr){
        return (index &gt; 0); 
      })
    }
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 150px;" src="https://demo.xiaohuochai.site/vue/template/t4.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;以上操作并不会导致Vue丢弃现有DOM并重新渲染整个列表。Vue实现了一些智能启发式方法来最大化DOM元素重用，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作

&nbsp;

### 无法检测

&emsp;&emsp;由于JS的限制， Vue 不能检测以下变动的数组：

&emsp;&emsp;1、利用索引直接设置一个项时，例如： `vm.items[indexOfItem] = newValue`

&emsp;&emsp;2、修改数组的长度时，例如： `vm.items.length = newLength`
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;div&gt;
    &lt;button @click='setVal'&gt;setVal&lt;/button&gt;
    &lt;button @click='setLength'&gt;setLength&lt;/button&gt;
    &lt;button @click='pop'&gt;pop&lt;/button&gt;
  &lt;/div&gt;
  &lt;ul&gt;
    &lt;li v-for="item in items" &gt;{{ item }}&lt;/li&gt;
  &lt;/ul&gt; 
  &lt;p&gt;{{ message }}&lt;/p&gt; 
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var watchFunc = function(){
  example.message = '数据发生变化';
  setTimeout(function(){
    example.message = '';
  },500); 
}
var example = new Vue({
  el: '#example',
  data: {
    items: ['Foo','Bar','Baz'],
    message:'',
  },
  watch:{
    items:watchFunc
  },
  methods:{
    pop(){
      this.items.pop()
    },
    setVal(){
      this.items[0]= 'match';
    },
    setLength(){
      this.items.length = 2;
    }
  }
})
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;以上代码中，直接设置值和长度使用watch不能检测到变化

<iframe style="width: 100%; height: 150px;" src="https://demo.xiaohuochai.site/vue/template/t5.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;以下两种方式都可以实现和`vm.items[indexOfItem]=newValue`相同的效果， 同时也将触发状态更新

<div>
<pre>// Vue.set
Vue.set(example1.items, indexOfItem, newValue)</pre>
</div>
<div>
<pre>// Array.prototype.splice
example1.items.splice(indexOfItem, 1, newValue)</pre>
</div>

&nbsp;&emsp;&emsp;为了解决第二类问题，可以使用 `splice`

<div>
<pre>example1.items.splice(newLength)</pre>
</div>
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;div&gt;
    &lt;button @click='setVal1'&gt;setVal1&lt;/button&gt;
    &lt;button @click='setVal2'&gt;setVal2&lt;/button&gt;
    &lt;button @click='setLength'&gt;setLength&lt;/button&gt;
  &lt;/div&gt;
  &lt;ul&gt;
    &lt;li v-for="item in items" &gt;{{ item }}&lt;/li&gt;
  &lt;/ul&gt; 
  &lt;p&gt;{{ message }}&lt;/p&gt; 
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var watchFunc = function(){
  example.message = '数据发生变化';
  setTimeout(function(){
    example.message = '';
  },500); 
}
var example = new Vue({
  el: '#example',
  data: {
    items: ['Foo','Bar','Baz'],
    message:'',
  },
  watch:{
    items:watchFunc
  },
  methods:{
    setVal1(){
      Vue.set(this.items, 0, 'match')
    },
    setVal2(){
      this.items.splice(1, 1, 'xiaohuochai')
    },    
    setLength(){
      this.items.splice(2)
    }
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 150px;" src="https://demo.xiaohuochai.site/vue/template/t6.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 过滤排序

&emsp;&emsp;有时，要显示一个数组的过滤或排序副本，而不实际改变或重置原始数据。在这种情况下，可以创建返回过滤或排序数组的计算属性

【computed】
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;ul&gt;
    &lt;li v-for="n in evenNumbers"&gt;{{ n }}&lt;/li&gt;
  &lt;/ul&gt; 
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var example = new Vue({
  el: '#example',
  data: {
    numbers: [ 1, 2, 3, 4, 5 ],
  },
  computed: {
    evenNumbers: function () {
      return this.numbers.filter(function (number) {
        return number % 2 === 0
      })
    }
  }
})
&lt;/script&gt;</pre>
</div>

【methods】

&emsp;&emsp;在计算属性不适用的情况下 (例如，在嵌套 `v-for` 循环中) 可以使用一个 method 方法
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;ul&gt;
    &lt;li v-for="n in even(numbers)"&gt;{{ n }}&lt;/li&gt;
  &lt;/ul&gt; 
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var example = new Vue({
  el: '#example',
  data: {
    numbers: [ 1, 2, 3, 4, 5 ],
  },
  methods: {
    even: function (numbers) {
      return numbers.filter(function (number) {
        return number % 2 === 0
      })
    }
  }
})
&lt;/script&gt;</pre>
</div>

![vue_template_array1](https://pic.xiaohuochai.site/blog/vue_template_array1.png)

