# Vue可复用过渡和动态过渡

&emsp;&emsp;本文将详细介绍Vue可复用过渡和动态过渡

&nbsp;

### 可复用过渡

&emsp;&emsp;过渡可以通过 Vue 的组件系统实现复用。要创建一个可复用过渡组件，需要做的就是将&nbsp;&lt;transition&gt;&nbsp;或者&nbsp;&lt;transition-group&gt;&nbsp;作为根组件，然后将任何子组件放置在其中就可以了

<div>
<pre>Vue.component('my-transition', {
  template: `
    &lt;transition name="transition1" mode="out-in" @before-enter="beforeEnter" @after-enter="afterEnter"&gt;
      &lt;slot&gt;&lt;/slot&gt;
    &lt;/transition&gt;
  `,
  methods: {
    beforeEnter: function (el) {
      // ...
    },
    afterEnter: function (el) {
      // ...
    }
  }
})</pre>
</div>

&emsp;&emsp;函数组件更适合完成这个任务

<div>
<pre>Vue.component('my-special-transition', {
  functional: true,
  render: function (createElement, context) {
    var data = {
      props: {
        name: 'very-special-transition',
        mode: 'out-in'
      },
      on: {
        beforeEnter: function (el) {
          // ...
        },
        afterEnter: function (el) {
          // ...
        }
      }
    }
    return createElement('transition', data, context.children)
  }
})</pre>
</div>

&nbsp;

### 动态过渡

&emsp;&emsp;在 Vue 中即使是过渡也是数据驱动的！动态过渡最基本的例子是通过&nbsp;`name`&nbsp;特性来绑定动态值

<div>
<pre>&lt;transition v-bind:name="transitionName"&gt;
  &lt;!-- ... --&gt;
&lt;/transition&gt;</pre>
</div>

&emsp;&emsp;用 Vue 的过渡系统来定义的 CSS 过渡/动画 在不同过渡间切换会非常有用

&emsp;&emsp;所有的过渡特性都是动态绑定。它不仅是简单的特性，通过事件的钩子函数方法，可以在获取到相应上下文数据。这意味着，可以根据组件的状态通过 JavaScript 过渡设置不同的过渡效果

<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div id="dynamic-fade-demo" class="demo"&gt;
  Fade In: &lt;input type="range" v-model="fadeInDuration" min="0" :max="maxFadeDuration"&gt;
  Fade Out: &lt;input type="range" v-model="fadeOutDuration" min="0" :max="maxFadeDuration"&gt;
  &lt;transition :css="false" @before-enter="beforeEnter" @enter="enter" @leave="leave"&gt;
    &lt;p v-if="show"&gt;小火柴的蓝色理想&lt;/p&gt;
  &lt;/transition&gt;
  &lt;button v-if="stop" @click="stop = show = false"&gt;运行动画&lt;/button&gt;
  &lt;button v-else @click="stop = true"&gt;停止动画&lt;/button&gt;
&lt;/div&gt;
&lt;script type="text/javascript" src="velocity.min.js"&gt;&lt;/script&gt;
&lt;script type="text/javascript" src="vue.js"&gt;&lt;/script&gt;
&lt;script&gt;
new Vue({
  el: '#dynamic-fade-demo',
  data: {
    show: true,
    fadeInDuration: 1000,
    fadeOutDuration: 1000,
    maxFadeDuration: 1500,
    stop: true
  },
  mounted() {
    this.show = false
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0
    },
    enter(el, done) {
      Velocity(el,{ opacity: 1 },{duration: this.fadeInDuration,complete:()=&gt;{
          done();
          if (!this.stop){
            this.show = false;
          }
        }
      })
    },
    leave(el, done) {
      Velocity(el,{ opacity: 0 },{duration: this.fadeOutDuration,complete:()=&gt;{
          done();
          this.show = true;
        }
      })
    },
  },
})
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/vue/transition/t32.html" frameborder="0" width="320" height="240"></iframe>

