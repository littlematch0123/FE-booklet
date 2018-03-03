# Vue知识结构

　　近年来，前端框架发展火热，新的框架和名词不停地出现在开发者眼前，而且开发模式也产生了一定的变化。目前来看，前端MVVM框架的出现给开发者带来了不小的便利，其中的代表就有Angular.js、React.js以及Vue.js。这些框架的产生使得开发者能从过去手动维护DOM状态的繁琐操作中解脱出来，尽可能地让DOM的更新操作是自动的，状态变化的时候就自动更新到正确的状态

　　不过，新框架的引入不可避免的就是学习成本的增加以及框架普及性的问题，相对于Angular.js和React.js而言，Vue.js的学习曲线则比较平稳，上手比较简单，并且配合自身插件功能，成为了时下无论从实用性还是普遍性来说都是可靠的MVVM框架选择之一

　　小火柴将Vue的知识体系进行了梳理和归纳，总结成以下目录


  * 基础
      * [入门基础](vue/base/base.md) 
      * [实例对象的数据选项](vue/base/dataOption.md)
      * [实例生命周期](vue/base/lifecycle.md)
      * [自定义指令](vue/base/customDirectives.md)
      * [响应式原理](vue/base/reactivity.md)
      * [渲染函数](vue/base/renderFunctions.md)
      * [vue-cli](vue/base/vue-cli.md)
      * [风格指南](vue/base/styleGuide.md)
  * 模板语法
      * [模板内容](vue/template/templateContent.md)
      * [模板逻辑](vue/template/templateLogic.md)  
      * [数组更新及过滤排序](vue/template/listRendering.md)
      * [事件处理](vue/template/eventHandling.md)
      * [表单控件绑定](vue/template/formInputBindings.md)
  * 组件
      * [基础用法](vue/components/base.md)
      * [组件选项props](vue/components/props.md)
      * [自定义事件](vue/components/customEvents.md)
      * [内容分发slot](vue/components/slot.md)
      * [动态组件](vue/components/dynamicComponents.md)
      * [组件实例间的直接访问](vue/components/DirectAccess.md)
      * [单文件组件](vue/components/singleFile.md)
  * 过渡
      * [CSS过渡](vue/transition/css.md) 
      * [JS过渡](vue/transition/js.md) 
      * [多元素过渡](vue/transition/elements.md) 
      * [列表过渡](vue/transition/list.md) 
      * [可复用过渡和动态过渡](vue/transition/others.md) 
      * [过渡状态](vue/transition/state.md) 
  * 插件
      * [混合mixins](vue/plug/mixins.md) 
      * [基本操作](vue/plug/base.md) 
      * [Vue-router](vue/plug/Vue-router.md) 
      * [Vue-router的API](vue/plug/Vue-routerAPI.md) 
      * [Vuex](vue/plug/Vuex.md) 
      * [Vuex的API](vue/plug/VuexAPI.md) 
      * [axios](vue/plug/axios.md) 