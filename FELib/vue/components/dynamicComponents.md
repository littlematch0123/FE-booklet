# Vue动态组件

&emsp;&emsp;让多个组件使用同一个挂载点，并动态切换，这就是动态组件。本文将详细介绍Vue动态组件

&nbsp;

### 概述

&emsp;&emsp;通过使用保留的 &lt;component&gt; 元素，动态地绑定到它的 `is` 特性，可以实现动态组件

<div>
<pre>&lt;div id="example"&gt;
  &lt;button @click="change"&gt;切换页面&lt;/button&gt;
  &lt;component :is="currentView"&gt;&lt;/component&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
var home = {template:'&lt;div&gt;我是主页&lt;/div&gt;'};
var post = {template:'&lt;div&gt;我是提交页&lt;/div&gt;'};
var archive = {template:'&lt;div&gt;我是存档页&lt;/div&gt;'};
new Vue({
  el: '#example',
  components: {
    home,
    post,
    archive,
  },
  data:{
    index:0,
    arr:['home','post','archive'],
  },
  computed:{
    currentView(){
        return this.arr[this.index];
    }
  },
  methods:{
    change(){
      this.index = (++this.index)%3;
    }
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/vue/module/m12.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;也可以直接绑定到组件对象上

<div>
<pre>&lt;div id="example"&gt;
  &lt;button @click="change"&gt;切换页面&lt;/button&gt;
  &lt;component :is="currentView"&gt;&lt;/component&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
new Vue({
  el: '#example',
  data:{
    index:0,
    arr:[
      {template:`&lt;div&gt;我是主页&lt;/div&gt;`},
      {template:`&lt;div&gt;我是提交页&lt;/div&gt;`},
      {template:`&lt;div&gt;我是存档页&lt;/div&gt;`}
    ],
  },
  computed:{
    currentView(){
        return this.arr[this.index];
    }
  },
  methods:{
    change(){
      this.index = (++this.index)%3;
    }
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/vue/module/m13.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 缓存

&emsp;&emsp;&lt;keep-alive&gt; 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。和 &lt;transition&gt; 相似，&lt;keep-alive&gt; 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中

【基础用法】

<div>
<pre>&lt;div id="example"&gt;
  &lt;button @click="change"&gt;切换页面&lt;/button&gt;
  &lt;keep-alive&gt;
    &lt;component :is="currentView"&gt;&lt;/component&gt;  
  &lt;/keep-alive&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
new Vue({
  el: '#example',
  data:{
    index:0,
    arr:[
      {template:`&lt;div&gt;我是主页&lt;/div&gt;`},
      {template:`&lt;div&gt;我是提交页&lt;/div&gt;`},
      {template:`&lt;div&gt;我是存档页&lt;/div&gt;`}
    ],
  },
  computed:{
    currentView(){
        return this.arr[this.index];
    }
  },
  methods:{
    change(){
      let len = this.arr.length;
      this.index = (++this.index)% len;
    }
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/vue/module/m14.html" frameborder="0" width="320" height="240"></iframe>

【条件判断】

&emsp;&emsp;如果有多个条件性的子元素，&lt;keep-alive&gt; 要求同时只有一个子元素被渲染

<div>
<pre>&lt;div id="example"&gt;
  &lt;button @click="change"&gt;切换页面&lt;/button&gt;
  &lt;keep-alive&gt;
    &lt;home v-if="index===0"&gt;&lt;/home&gt;
    &lt;posts v-else-if="index===1"&gt;&lt;/posts&gt;
    &lt;archive v-else&gt;&lt;/archive&gt;  
  &lt;/keep-alive&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
new Vue({
  el: '#example',
  components:{
    home:{template:`&lt;div&gt;我是主页&lt;/div&gt;`},
    posts:{template:`&lt;div&gt;我是提交页&lt;/div&gt;`},
    archive:{template:`&lt;div&gt;我是存档页&lt;/div&gt;`},
  },
  data:{
    index:0,
  },
  methods:{
    change(){
      let len = Object.keys(this.$options.components).length;
      this.index = (++this.index)%len;
    }
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/vue/module/m15.html" frameborder="0" width="320" height="240"></iframe>

【`activated`&nbsp;和&nbsp;`deactivated`】&nbsp;

&emsp;&emsp;`activated` 和 `deactivated`&nbsp;在 &lt;keep-alive&gt; 树内的所有嵌套组件中触发
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;button @click="change"&gt;切换页面&lt;/button&gt;
  &lt;keep-alive&gt;
    &lt;component :is="currentView" @pass-data="getData"&gt;&lt;/component&gt; 
  &lt;/keep-alive&gt;
  &lt;p&gt;{{msg}}&lt;/p&gt;
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
new Vue({
  el: '#example',
  data:{
    index:0,
    msg:'',    
    arr:[
      { 
        template:`&lt;div&gt;我是主页&lt;/div&gt;`,
        activated(){
          this.$emit('pass-data','主页被添加');
        },
        deactivated(){
          this.$emit('pass-data','主页被移除');
        },        
      },
      {template:`&lt;div&gt;我是提交页&lt;/div&gt;`},
      {template:`&lt;div&gt;我是存档页&lt;/div&gt;`}
    ],
  },
  computed:{
    currentView(){
        return this.arr[this.index];
    }
  },
  methods:{
    change(){
      var len = this.arr.length;
      this.index = (++this.index)% len;
    },
    getData(value){
      this.msg = value;
      setTimeout(()=&gt;{
        this.msg = '';
      },500)
    }
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/vue/module/m16.html" frameborder="0" width="320" height="240"></iframe>

【`include和``exclude`】

&emsp;&emsp;`include` 和 `exclude` 属性允许组件有条件地缓存。二者都可以用逗号分隔字符串、正则表达式或一个数组来表示

<div>
<pre>&lt;!-- 逗号分隔字符串 --&gt;
&lt;keep-alive include="a,b"&gt;
  &lt;component :is="view"&gt;&lt;/component&gt;
&lt;/keep-alive&gt;
&lt;!-- 正则表达式 (使用 v-bind) --&gt;
&lt;keep-alive :include="/a|b/"&gt;
  &lt;component :is="view"&gt;&lt;/component&gt;
&lt;/keep-alive&gt;
&lt;!-- Array (use v-bind) --&gt;
&lt;keep-alive :include="['a', 'b']"&gt;
  &lt;component :is="view"&gt;&lt;/component&gt;
&lt;/keep-alive&gt;</pre>
</div>

&emsp;&emsp;匹配首先检查组件自身的 `name` 选项，如果 `name` 选项不可用，则匹配它的局部注册名称（父组件 `components` 选项的键值）。匿名组件不能被匹配

<div>
<pre>  &lt;keep-alive include="home,archive"&gt;
    &lt;component :is="currentView"&gt;&lt;/component&gt; 
  &lt;/keep-alive&gt;</pre>
</div>

&emsp;&emsp;上面的代码，表示只缓存home和archive，不缓存posts

<div>
<pre>&lt;div id="example"&gt;
  &lt;button @click="change"&gt;切换页面&lt;/button&gt;
  &lt;keep-alive include="home,archive"&gt;
    &lt;component :is="currentView"&gt;&lt;/component&gt; 
  &lt;/keep-alive&gt;
&lt;/div&gt;
&lt;script src="https://unpkg.com/vue"&gt;&lt;/script&gt;
&lt;script&gt;
new Vue({
  el: '#example',
  data:{
    index:0,   
    arr:[
      {name:'home',template:`&lt;div&gt;我是主页&lt;/div&gt;`},
      {name:'posts',template:`&lt;div&gt;我是提交页&lt;/div&gt;`},
      {name:'archive',template:`&lt;div&gt;我是存档页&lt;/div&gt;`}
    ],
  },
  computed:{
    currentView(){
        return this.arr[this.index];
    }
  },
  methods:{
    change(){
      var len = this.arr.length;
      this.index = (++this.index)% len;
    },
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/vue/module/m17.html" frameborder="0" width="320" height="240"></iframe>

