# Vue过渡效果之JS过渡

&emsp;&emsp;与[CSS过渡](http://www.cnblogs.com/xiaohuochai/p/7383979.html)不同，JS过渡主要通过事件进行触发。本文将详细介绍Vue过渡效果之JS过渡

&nbsp;

### 事件钩子

&emsp;&emsp;JS过渡主要通过事件监听事件钩子来触发过渡，共包括如下的事件钩子

<div>
<pre>&lt;transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"
  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
&gt;
  &lt;!-- ... --&gt;
&lt;/transition&gt;</pre>
</div>

&emsp;&emsp;下面各个方法中，函数中的参数el表示要过渡的元素，可以设置不同情况下，el的位置、颜色等来控制其动画的改变

<div>
<pre>// ...
methods: {
  // --------
  // 进入中
  // --------
  beforeEnter: function (el) {
    // ...
  },
  // 此回调函数是可选项的设置
  // 与 CSS 结合时使用
  enter: function (el, done) {
    // ...
    done()
  },
  afterEnter: function (el) {
    // ...
  },
  enterCancelled: function (el) {
    // ...
  },
  // --------
  // 离开时
  // --------
  beforeLeave: function (el) {
    // ...
  },
  // 此回调函数是可选项的设置
  // 与 CSS 结合时使用
  leave: function (el, done) {
    // ...
    done()
  },
  afterLeave: function (el) {
    // ...
  },
  // leaveCancelled 只用于 v-show 中
  leaveCancelled: function (el) {
    // ...
  }
}</pre>
</div>

&emsp;&emsp;上面方法中，有两个方法比较特殊，是enter()和leave()方法，它们接受了第二个参数done。当进入完毕或离开完毕后，会调用done()方法来进行接下来的操作

&emsp;&emsp;注意：对于仅使用JS过渡的元素添加 `v-bind:css="false"`，Vue 会跳过 CSS 的检测。这也可以避免过渡过程中 CSS 的影响

【简单事例】

&emsp;&emsp;下面是一个JS过渡的简单事例

<div>
<pre>&lt;div id="demo"&gt;
  &lt;button @click="show = !show"&gt;Toggle&lt;/button&gt;
  &lt;transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave" :css="false"&gt;
    &lt;p v-if="show"&gt;Demo&lt;/p&gt;
  &lt;/transition&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
new Vue({
  el: '#demo',
  data: {
    show: false
  },
  methods: {
    beforeEnter: function (el) {
      el.style.opacity = 0
      el.style.transformOrigin = 'left'
    },
    enter: function (el, done) {
      Velocity(el, { opacity: 1, fontSize: '1.4em' }, { duration: 300 })
      Velocity(el, { fontSize: '1em' }, { complete: done })
    },
    leave: function (el, done) {
      Velocity(el, { translateX: '15px', rotateZ: '50deg' }, { duration: 600 })
      Velocity(el, { rotateZ: '100deg' }, { loop: 2 })
      Velocity(el, {rotateZ: '45deg',translateY: '30px',translateX: '30px',opacity: 0}, {complete: done })
    }
  }
})  
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 150px;" src="https://demo.xiaohuochai.site/vue/transition/t1222.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 初始渲染过渡

&emsp;&emsp;可以通过 `appear` 特性设置节点的在初始渲染的过渡，自定义 JavaScript 钩子

<div>
<pre>&lt;transition
  appear
  v-on:before-appear="customBeforeAppearHook"
  v-on:appear="customAppearHook"
  v-on:after-appear="customAfterAppearHook"
  v-on:appear-cancelled="customAppearCancelledHook"
&gt;
  &lt;!-- ... --&gt;
&lt;/transition&gt;</pre>
</div>

&emsp;&emsp;下面是一个例子

<div>
<pre>&lt;div id="demo"&gt;
  &lt;button @click="reset"&gt;还原&lt;/button&gt;
  &lt;transition appear  :appear="customAppearHook"&gt;
    &lt;p&gt;小火柴的蓝色理想&lt;/p&gt;
  &lt;/transition&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
new Vue({
  el: '#demo',
  methods:{
    reset(){
      history.go();
    }, 
    customAppearHook(el, done) {
      Velocity(el, {backgroundColor:"#ddd",translateX:200});
      Velocity(el,"reverse",{complete:done})
    }, 
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/vue/transition/t11.html" frameborder="0" width="320" height="240"></iframe>

