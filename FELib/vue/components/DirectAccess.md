# Vue组件实例间的直接访问

&emsp;&emsp;有时候需要父组件访问子组件，子组件访问父组件，或者是子组件访问根组件。 在组件实例中，Vue提供了相应的属性，包括$parent、$children、$refs和$root，这些属性都挂载在组件的this上。本文将详细介绍Vue组件实例间的直接访问

&nbsp;

### $parent

&emsp;&emsp;`$parent`表示父组件的实例，该属性只读

&emsp;&emsp;下面是一个简易实例
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;parent-component&gt;&lt;/parent-component&gt;
&lt;/div&gt;
&lt;template id="parent-component"&gt;
  &lt;div class="parent"&gt;
    &lt;h3&gt;我是父组件&lt;/h3&gt;
    &lt;input v-model="parentMsg"&gt;
    &lt;p&gt;{{parentMsg}}&lt;/p&gt;
    &lt;child-component&gt;&lt;/child-component&gt;    
  &lt;/div&gt;
&lt;/template&gt;
&lt;template id="child-component"&gt;
  &lt;div class="child"&gt;
    &lt;h3&gt;我是子组件&lt;/h3&gt;
    &lt;p&gt;{{msg}}&lt;/p&gt;
    &lt;button v-on:click="showData"&gt;显示父组件数据&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
// 注册
Vue.component('parent-component', {
  template: '#parent-component',
  data(){
    return{
      parentMsg:'我是父组件的数据'
    }
  },
  components:{
    'child-component':{
      template:'#child-component',
      data(){
        return{
          msg:''
        }
      },
      methods:{
        showData(){
          this.msg = this.$parent.parentMsg;
        }
      }
    }
  }
})
// 创建根实例
new Vue({
  el: '#example'
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 260px;" src="https://demo.xiaohuochai.site/vue/module/m19.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### $root

&emsp;&emsp;`$root`表示当前组件树的根 Vue 实例。如果当前实例没有父实例，此实例将会是其自己。该属性只读
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;h3&gt;我是根组件&lt;/h3&gt;
    &lt;input v-model="rootMsg"&gt;
    &lt;p&gt;{{rootMsg}}&lt;/p&gt;  
  &lt;parent-component&gt;&lt;/parent-component&gt;
&lt;/div&gt;
&lt;template id="parent-component"&gt;
  &lt;div class="parent"&gt;
    &lt;h3&gt;我是父组件&lt;/h3&gt;
    &lt;input v-model="parentMsg"&gt;
    &lt;p&gt;{{parentMsg}}&lt;/p&gt;
    &lt;child-component&gt;&lt;/child-component&gt;    
  &lt;/div&gt;
&lt;/template&gt;
&lt;template id="child-component"&gt;
  &lt;div class="child"&gt;
    &lt;h3&gt;我是子组件&lt;/h3&gt;
    &lt;p&gt;
      &lt;button v-on:click="showRootData"&gt;显示根组件数据&lt;/button&gt;&lt;span&gt;{{rootMsg}}&lt;/span&gt;
    &lt;/p&gt;      
    &lt;p&gt;
      &lt;button v-on:click="showParentData"&gt;显示父组件数据&lt;/button&gt;&lt;span&gt;{{parentMsg}}&lt;/span&gt;
    &lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
// 注册
Vue.component('parent-component', {
  template: '#parent-component',
  data(){
    return{
      parentMsg:'我是父组件的数据'
    }
  },
  components:{
    'child-component':{
      template:'#child-component',
      data(){
        return{
          parentMsg:'',
          rootMsg:''
        }
      },
      methods:{
        showParentData(){
          this.parentMsg = this.$parent.parentMsg;
        },
        showRootData(){
          this.rootMsg = this.$root.rootMsg;
        },        
      }
    }
  }
})
// 创建根实例
new Vue({
  el: '#example',
  data:{
    rootMsg:'我是根组件数据'
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 390px;" src="https://demo.xiaohuochai.site/vue/module/m20.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### $children

&emsp;&emsp;`$children`表示当前实例的直接子组件。需要注意`$children`并不保证顺序，也不是响应式的。如果正在尝试使用`$children`来进行数据绑定，考虑使用一个数组配合`v-for`来生成子组件，并且使用Array作为真正的来源
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;parent-component&gt;&lt;/parent-component&gt;
&lt;/div&gt;
&lt;template id="parent-component"&gt;
  &lt;div class="parent"&gt;
    &lt;h3&gt;我是父组件&lt;/h3&gt;
    &lt;button @click="getData"&gt;获取子组件数据&lt;/button&gt;
    &lt;br&gt;
    &lt;div v-html="msg"&gt;&lt;/div&gt;
    &lt;child-component1&gt;&lt;/child-component1&gt; 
    &lt;child-component2&gt;&lt;/child-component2&gt;   
  &lt;/div&gt;
&lt;/template&gt;
&lt;template id="child-component1"&gt;
  &lt;div class="child"&gt;
    &lt;h3&gt;我是子组件1&lt;/h3&gt;
    &lt;input v-model="msg"&gt;
    &lt;p&gt;{{msg}}&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;template id="child-component2"&gt;
  &lt;div class="child"&gt;
    &lt;h3&gt;我是子组件2&lt;/h3&gt;
    &lt;input v-model="msg"&gt;
    &lt;p&gt;{{msg}}&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
// 注册
Vue.component('parent-component', {
  template: '#parent-component',
  data(){
    return{
      msg:'',
    }
  },
  methods:{
    getData(){
      let html = '';
      let children = this.$children;
      for(var i = 0; i &lt; children.length;i++){
        html+= '&lt;div&gt;' + children[i].msg + '&lt;/div&gt;';
      }
      this.msg = html;
    }
  },
  components:{
    'child-component1':{
      template:'#child-component1',
      data(){
        return{
          msg:'',
        }
      },
    },
    'child-component2':{
      template:'#child-component2',
      data(){
        return{
          msg:'',
        }
      },
    }, 
  }   
})
// 创建根实例
new Vue({
  el: '#example',
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 400px;" src="https://demo.xiaohuochai.site/vue/module/m21.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### $refs

&emsp;&emsp;组件个数较多时，难以记住各个组件的顺序和位置，通过序号访问子组件不是很方便

&emsp;&emsp;在子组件上使用ref属性，可以给子组件指定一个索引ID：

<div>
<pre>&lt;child-component1 ref="c1"&gt;&lt;/child-component1&gt;
&lt;child-component2 ref="c2"&gt;&lt;/child-component2&gt;</pre>
</div>

&emsp;&emsp;在父组件中，则通过`$refs._索引ID_`访问子组件的实例
<!-- {% raw %} -->
<div>
<pre>this.$refs.c1
this.$refs.c2</pre>
</div>
<div>
<pre>&lt;div id="example"&gt;
  &lt;parent-component&gt;&lt;/parent-component&gt;
&lt;/div&gt;
&lt;template id="parent-component"&gt;
  &lt;div class="parent"&gt;
    &lt;h3&gt;我是父组件&lt;/h3&gt;
    &lt;div&gt;
      &lt;button @click="getData1"&gt;获取子组件c1的数据&lt;/button&gt;
      &lt;p&gt;{{msg1}}&lt;/p&gt;
    &lt;/div&gt;
    &lt;div&gt;
      &lt;button @click="getData2"&gt;获取子组件c2的数据&lt;/button&gt;
      &lt;p&gt;{{msg2}}&lt;/p&gt;
    &lt;/div&gt;
    &lt;child-component1 ref="c1"&gt;&lt;/child-component1&gt; 
    &lt;child-component2 ref="c2"&gt;&lt;/child-component2&gt;   
  &lt;/div&gt;
&lt;/template&gt;
&lt;template id="child-component1"&gt;
  &lt;div class="child"&gt;
    &lt;h3&gt;我是子组件1&lt;/h3&gt;
    &lt;input v-model="msg"&gt;
    &lt;p&gt;{{msg}}&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;template id="child-component2"&gt;
  &lt;div class="child"&gt;
    &lt;h3&gt;我是子组件2&lt;/h3&gt;
    &lt;input v-model="msg"&gt;
    &lt;p&gt;{{msg}}&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
// 注册
Vue.component('parent-component', {
  template: '#parent-component',
  data(){
    return{
      msg1:'',
      msg2:'',
    }
  },
  methods:{
    getData1(){
      this.msg1 = this.$refs.c1.msg;
    },
    getData2(){
      this.msg2 = this.$refs.c2.msg;
    },    
  },
  components:{
    'child-component1':{
      template:'#child-component1',
      data(){
        return{
          msg:'',
        }
      },
    },
    'child-component2':{
      template:'#child-component2',
      data(){
        return{
          msg:'',
        }
      },
    }, 
  }   
})
// 创建根实例
new Vue({
  el: '#example',
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 460px;" src="https://demo.xiaohuochai.site/vue/module/m18.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 总结

&emsp;&emsp;虽然vue提供了以上方式对组件实例进行直接访问，但并不推荐这么做。这会导致组件间紧密耦合，且自身状态难以理解，所以尽量使用[props](http://www.cnblogs.com/xiaohuochai/p/7388866.html)、[自定义事件](http://www.cnblogs.com/xiaohuochai/p/7389934.html)以及[内容分发slot](http://www.cnblogs.com/xiaohuochai/p/7392384.html)来传递数据

