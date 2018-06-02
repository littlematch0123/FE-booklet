# Vue列表过渡

&emsp;&emsp;本文将详细介绍Vue列表过渡

&nbsp;

### 概述

&emsp;&emsp;前面分别介绍了单元素[CSS过渡](http://www.cnblogs.com/xiaohuochai/p/7383979.html)和[JS过渡](http://www.cnblogs.com/xiaohuochai/p/7398088.html)，以及[多元素过渡](http://www.cnblogs.com/xiaohuochai/p/7411864.html)。如何同时渲染整个列表呢？在这种情景中，需要使用&lt;transition-group&gt;组件

【&lt;transition-group&gt;】

&emsp;&emsp;&lt;transition-group&gt;不同于&nbsp;&lt;transition&gt;， 它会以一个真实元素呈现：默认为一个&nbsp;&lt;span&gt;。也可以通过&nbsp;`tag`&nbsp;特性更换为其他元素。而且其内部元素总是需要提供唯一的&nbsp;`key`&nbsp;属性值

<div>
<pre>&lt;transition-group name="list" tag="p"&gt;
    &lt;!-- ... --&gt;
  &lt;/transition-group&gt;</pre>
</div>

&nbsp;

### 普通过渡

&emsp;&emsp;下面是一个添加和删除列表项的例子
<!-- {% raw %} -->
<div>
<pre>&lt;style&gt;
.list-item {display: inline-block;margin-right: 10px;}
.list-enter-active, .list-leave-active {transition: all 1s;}
.list-enter, .list-leave-to{opacity: 0;transform: translateY(30px);}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div id="list-demo" class="demo"&gt;
  &lt;button @click="add"&gt;Add&lt;/button&gt;
  &lt;button @click="remove"&gt;Remove&lt;/button&gt;
  &lt;transition-group name="list" tag="p"&gt;
    &lt;span v-for="item in items" :key="item" class="list-item"&gt;{{item}}&lt;/span&gt;
  &lt;/transition-group&gt;
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
new Vue({
  el: '#list-demo',
  data: {
    items: [1,2,3,4,5,6,7,8,9],
    nextNum: 10
  },
  methods: {
    randomIndex() {
      return Math.floor(Math.random() * this.items.length)
    },
    add() {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove() {
      this.items.splice(this.randomIndex(), 1)
    },
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/vue/transition/t25.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 平滑过渡

&emsp;&emsp;上面这个例子有个问题，当添加和移除元素的时候，周围的元素会瞬间移动到他们的新布局的位置，而不是平滑的过渡

【v-move】

&emsp;&emsp;&lt;transition-group&gt;&nbsp;组件还有一个特殊之处。不仅可以进入和离开动画，还可以改变定位。要使用这个新功能只需了解新增的&nbsp;`v-move`&nbsp;特性，它会在元素的改变定位的过程中应用。像之前的类名一样，可以通过&nbsp;`name`&nbsp;属性来自定义前缀，也可以通过&nbsp;`move-class`&nbsp;属性手动设置

&emsp;&emsp;在上面代码中基础上，做出如下改进：

&emsp;&emsp;1、增加.list-move的样式，使元素在进入时实现过渡效果

&emsp;&emsp;2、在.list-leave-active中设置绝对定位，使元素在离开时实现过渡效果

<div>
<pre>&lt;style&gt;
.list-item {display: inline-block;margin-right: 10px;}
.list-move,.list-enter-active, .list-leave-active {transition: 1s;}
.list-leave-active{position:absolute;}
.list-enter, .list-leave-to{opacity: 0;transform: translateY(30px);}
&lt;/style&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/vue/transition/t26.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 变换过渡

&emsp;&emsp;下面接着利用move属性，进行变换过渡，即一个列表中的列表项既不增加也不减少，只是不断地变换其位置
<!-- {% raw %} -->
<div>
<pre>&lt;style&gt;
.list-move{transition: transform 1s;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div id="list-demo" class="demo"&gt;
  &lt;button @click="shuffle"&gt;shuffle&lt;/button&gt;
  &lt;transition-group name="list" tag="ul"&gt;
    &lt;li v-for="item in items" :key="item"&gt;{{item}}&lt;/li&gt;
  &lt;/transition-group&gt;
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
new Vue({
  el: '#list-demo',
  data: {
    items: [1,2,3,4,5,6,7,8,9],
  },
  methods: {
    shuffle(){
      this.items = this.items.sort(()=&gt;{return Math.random() - 0.5;})
    },
  }
})
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;下面的效果看起来很神奇，内部的实现，Vue 使用了一个叫&nbsp;[FLIP](https://aerotwist.com/blog/flip-your-animations/)&nbsp;简单的动画队列，使用 transforms 将元素从之前的位置平滑过渡新的位置

<iframe style="width: 100%; height: 250px;" src="https://demo.xiaohuochai.site/vue/transition/t27.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;下面将进入离开的例子和这个技术结合，&nbsp;使列表的一切变动都会有动画过渡

&emsp;&emsp;注意：使用 FLIP 过渡的元素不能设置为&nbsp;`display: inline`&nbsp;。作为替代方案，可以设置为&nbsp;`display: inline-block`&nbsp;或者放置于 flex 中

<div>
<pre>&lt;style&gt;
.list-item {display: inline-block;margin-right: 10px;}
.list-move,.list-enter-active, .list-leave-active {transition: 1s;}
.list-leave-active{position:absolute;}
.list-enter, .list-leave-to{opacity: 0;transform: translateY(30px);}
&lt;/style&gt;</pre>
</div>

&emsp;&emsp;以上代码中，由于move、enter和leave都需要设置transition。因此，直接在元素上设置transition即可

<div>
<pre>&lt;style&gt;
.list-item {display: inline-block;margin-right: 10px;transition: 1s;}
.list-leave-active{position:absolute;}
.list-enter, .list-leave-to{opacity: 0;transform: translateY(30px);}
&lt;/style&gt;</pre>
</div>

&emsp;&emsp;下面是完整代码
<!-- {% raw %} -->
<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;title&gt;Document&lt;/title&gt;
&lt;style&gt;
.list-item {display: inline-block;margin-right: 10px;transition: 1s;}
.list-leave-active{position:absolute;}
.list-enter, .list-leave-to{opacity: 0;transform: translateY(30px);}
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div id="list-demo" class="demo"&gt;
  &lt;button @click="shuffle"&gt;shuffle&lt;/button&gt;
  &lt;button @click="add"&gt;Add&lt;/button&gt;
  &lt;button @click="remove"&gt;Remove&lt;/button&gt;  
  &lt;transition-group name="list" tag="p"&gt;
    &lt;span v-for="item in items" :key="item" class="list-item"&gt;{{item}}&lt;/span&gt;
  &lt;/transition-group&gt;
&lt;/div&gt;
&lt;script type="text/javascript" src="http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/vue.js"&gt;&lt;/script&gt;
&lt;script&gt;
new Vue({
  el: '#list-demo',
  data: {
    items: [1,2,3,4,5,6,7,8,9],
    nextNum: 10
  },
  methods: {
    randomIndex() {
      return Math.floor(Math.random() * this.items.length)
    },
    add() {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove() {
      this.items.splice(this.randomIndex(), 1)
    },    
    shuffle(){
      this.items = this.items.sort(()=&gt;{return Math.random() - 0.5;})
    },
  }
})
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>
<!-- {% endraw %} -->
<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/vue/transition/t28.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 多维列表

&emsp;&emsp;FLIP 动画不仅可以实现单列过渡，多维网格的过渡也同样简单
<!-- {% raw %} -->
<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;title&gt;Document&lt;/title&gt;
&lt;style&gt;
.container {width: 270px;margin-top: 10px;line-height:30px;text-align:center;}
.cell {display: inline-block;width: 30px;height: 30px;outline: 1px solid #aaa;}
.cell-move {transition:1s;}
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div id="list-demo" class="demo"&gt;
  &lt;button @click="shuffle"&gt;shuffle&lt;/button&gt;
  &lt;transition-group name="cell" tag="div" class="container"&gt;
    &lt;span v-for="cell in cells" :key="cell.id" class="cell"&gt;{{ cell.number }}&lt;/span&gt;
  &lt;/transition-group&gt;
&lt;/div&gt;
&lt;script type="text/javascript" src="http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/vue.js"&gt;&lt;/script&gt;
&lt;script&gt;
new Vue({
  el: '#list-demo',
   data: {
      cells: Array.apply(null, { length: 81 })
        .map(function (_, index) { 
          return {
            id: index,
            number: index % 9 + 1
          }
        })
    },
  methods: {
    shuffle(){
      this.cells = this.cells.sort(()=&gt;{return Math.random() - 0.5;})
    },
  }
})
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>
<!-- {% endraw %} -->
<iframe style="width: 100%; height: 330px;" src="https://demo.xiaohuochai.site/vue/transition/t29.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 渐进过渡

&emsp;&emsp;通过 data 属性与 JavaScript 通信 ，就可以实现列表的渐进过渡

&emsp;&emsp;下面是使用CSS过渡实现的一个例子
<!-- {% raw %} -->
<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;title&gt;Document&lt;/title&gt;
&lt;style&gt;
.list-move,.list-enter-active, .list-leave-active {transition: 1s;}
.list-leave-active{position:absolute;}
.list-enter,.list-leave-to{opacity: 0;height:0;}
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div id="list-demo" class="demo"&gt;
  &lt;input v-model="query"&gt;
  &lt;transition-group name="list" tag="ul"&gt;
    &lt;li v-for="(item, index) in computedList" :key="item" :data-index="index"&gt;{{item}}&lt;/li&gt;
  &lt;/transition-group&gt;
&lt;/div&gt;
&lt;script type="text/javascript" src="http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/vue.js"&gt;&lt;/script&gt;
&lt;script&gt;
new Vue({
  el: '#list-demo',
  data: {
    query: '',
    list: ['HTML','CSS','Javascript','jQuery','Vue']
  },
  computed: {
    computedList() {
      return this.list.filter((item)=&gt;{
        return item.toLowerCase().indexOf(this.query.toLowerCase()) !== -1
      })
    }
  },  
})
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>
<!-- {% endraw %} -->
<iframe style="width: 100%; height: 170px;" src="https://demo.xiaohuochai.site/vue/transition/t30.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;上面的效果中，列表项是一齐运动的。如果要实现依次运动的效果，则需要使用JS过渡来实现
<!-- {% raw %} -->
<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div id="list-demo" class="demo"&gt;
  &lt;input v-model="query"&gt;
  &lt;transition-group name="list" tag="ul" :css="false" @before-enter="beforeEnter" @enter="enter" @leave="leave"&gt;
    &lt;li v-for="(item, index) in computedList" :key="item" :data-index="index"&gt;{{item}}&lt;/li&gt;
  &lt;/transition-group&gt;
&lt;/div&gt;
&lt;script type="text/javascript" src="http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/velocity.min.js"&gt;&lt;/script&gt;
&lt;script type="text/javascript" src="http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/vue.js"&gt;&lt;/script&gt;
&lt;script&gt;
new Vue({
  el: '#list-demo',
  data: {
    query: '',
    list: ['HTML','CSS','Javascript','jQuery','Vue']
  },
  computed: {
    computedList() {
      return this.list.filter((item)=&gt;{
        return item.toLowerCase().indexOf(this.query.toLowerCase()) !== -1
      })
    }
  },  
  methods: {
    beforeEnter(el) {
      el.style.opacity = el.style.height = 0
    },
    enter(el, done) {
      setTimeout(()=&gt;{
        Velocity(el,{ opacity: 1, height: '1.6em' },{ complete: done })
      }, el.dataset.index * 150)
    },
    leave(el, done) {
      setTimeout(()=&gt;{
        Velocity(el,{ opacity: 0, height: 0 },{ complete: done })
      }, el.dataset.index * 150)
    }
  },  
})
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>
<!-- {% endraw %} -->
<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/vue/transition/t31.html" frameborder="0" width="320" height="240"></iframe>
