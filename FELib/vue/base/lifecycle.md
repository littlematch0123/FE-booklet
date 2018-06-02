# Vue实例的生命周期

&emsp;&emsp;Vue实例在创建时有一系列的初始化步骤，例如建立数据观察，编译模板，创建数据绑定等。在此过程中，我们可以通过一些定义好的生命周期钩子函数来运行业务逻辑。本文将详细介绍Vue实例的生命周期

&nbsp;

### 图示

&emsp;&emsp;下图是Vue实例生命周期的图示


![vue_base_lifecycle1](https://pic.xiaohuochai.site/blog/vue_base_lifecycle1.png)

&nbsp;

### 解释

&emsp;&emsp;接下来，根据提供的生命周期钩子，对Vue实例各个阶段的情况进行详细说明

【beforeCreate】

&emsp;&emsp;在实例开始初始化时同步调用。此时数据观测、事件等都尚未初始化

【created】

&emsp;&emsp;在实例创建之后调用。此时已完成数据观测、事件方法，但尚未开始DOM编译，即未挂载到document中

【beforeMount】

&emsp;&emsp;在mounted之前运行

【mounted】

&emsp;&emsp;在编译结束时调用。此时所有指令已生效，数据变化已能触发DOM更新，但不保证$el已插入文档&emsp;&emsp;

【beforeUpdate】

&emsp;&emsp;在实例挂载之后，再次更新实例(例如更新 data)时会调用该方法，此时尚未更新DOM结构

【updated】

&emsp;&emsp;在实例挂载之后，再次更新实例并更新完DOM结构后调用

【beforeDestroy】

&emsp;&emsp;在开始销毁实例时调用，此刻实例仍然有效

【destroyed】

&emsp;&emsp;在实例被销毁之后调用。此时所有绑定和实例指令都已经解绑，子实例也被销毁

【activated】

&emsp;&emsp;需要配合动态组件keep-live属性使用。在动态组件初始化渲染的过程中调用该方法

【deactivated】

&emsp;&emsp;需要配合动态组件keep-live属性使用。在动态组件初始化移出的过程中调用该方法

&nbsp;

### 简单实例

&emsp;&emsp;下面写一个简单实例来更清楚地了解Vue实例内部的运行机制
<!-- {% raw %} -->
```
<div id="example">{{message}}</div>
```
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var vm = new Vue({
  el: '#example',
  data:{
    message:'match'
  },
  beforeCreate(){
    console.log('beforeCreate');
  },
  created(){
    console.log('created');
  },
  beforeMount(){
    console.log('beforeMount');
  },
  mounted(){
    console.log('mounted');
  },
  beforeUpdate(){
    console.log('beforeUpdate');
  },
  updated(){
    console.log('updated');
    //组件更新后调用$destroyed函数，进行销毁
    this.$destroy();    
  },
  beforeDestroy(){
    console.log('beforeDestroy');
  },
  destroyed(){
    console.log('destroyed');
  },
})
&lt;/script&gt;</pre>
</div>

![vue_base_lifecycle2](https://pic.xiaohuochai.site/blog/vue_base_lifecycle2.gif)

