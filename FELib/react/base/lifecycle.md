# react组件生命周期

&emsp;&emsp;为了理解React的工作过程，就必须要了解react组件的生命周期，如果人有生老病死，自然界有日月更替，每个组件在网页中也会被创建、更新和删除，如同有生命的机体一样。本文将详细介绍react组件生命周期

 
&nbsp;

### 概述

&emsp;&emsp;每一个组件都有几个可以重写以让代码在处理环节的特定时期运行的“生命周期方法”。方法中带有前缀 will 的在特定环节之前被调用，而带有前缀 did 的方法则会在特定环节之后被调用

【装配】

&emsp;&emsp;这些方法会在组件实例被创建和插入DOM中时被调用：
```
constructor()
static getDerivedStateFromProps()
componentWillMount()（版本17之后失效）
render()
componentDidMount()
```
【更新】

&emsp;&emsp;属性或状态的改变会触发一次更新。当一个组件在被重渲时，这些方法将会被调用：

```
componentWillReceiveProps()（版本17之后失效）
static getDerivedStateFromProps()
shouldComponentUpdate()
componentWillUpdate() （版本17之后失效）
render()
getSnapshotBeforeUpdate()
componentDidUpdate()
```
【卸载】

&emsp;&emsp;当一个组件被从DOM中移除时，该方法被调用：
```
componentWillUnmount()
```
【错误处理】

&emsp;&emsp;在渲染过程中发生错误时会被调用
```
componentDidCatch()
```

&nbsp;

### 装配过程
【render()】

&emsp;&emsp;render()函数应该纯净，意味着其不应该改变组件的状态，其每次调用都应返回相同的结果，同时不直接和浏览器交互。若需要和浏览器交互，将任务放在componentDidMount()阶段或其他的生命周期方法

&emsp;&emsp;render函数应该是一个纯函数，完全根据this.state和this.props来决定返回的结果，而且不要产生任何副作用。在render函数中调用this.setState毫无疑问是错误的，因为一个纯函数不应该引起状态的改变

【constructor(props)】

&emsp;&emsp;React组件的构造函数将会在装配之前被调用。当为一个React.Component子类定义构造函数时，应该在任何其他的表达式之前调用super(props)。否则，this.props在构造函数中将是未定义，并可能引发异常

【static getDerivedStateFromProps(nextProps, prevState)】

&emsp;&emsp;组件实例化后和接受新属性时将会调用getDerivedStateFromProps。它应该返回一个对象来更新状态，或者返回null来表明新属性不需要更新任何状态

&emsp;&emsp;注意1：如果父组件导致了组件的重新渲染，即使属性没有更新，这一方法也会被调用

&emsp;&emsp;注意2：调用this.setState() 通常不会触发 getDerivedStateFromProps()

&emsp;&emsp;典型用法如下所示：
```
  static getDerivedStateFromProps() {
    return { indexOfShowControl: -1 }
  }
```
【componentDidMount()】

&emsp;&emsp;componentDidMount()在组件被装配后立即调用。初始化使得DOM节点应该进行到这里。若需要从远端加载数据，这是一个适合实现网络请求的地方

&emsp;&emsp;在这个方法中调用setState()将会触发一次额外的渲染，但是它将在浏览器刷新屏幕之前发生。这保证了即使render()将会调用两次，但用户不会看到中间状态。谨慎使用这一模式，因为它常导致性能问题

 

&nbsp;

### 更新及卸载
【static getDerivedStateFromProps(nextProps, prevState)】

&emsp;&emsp;组件实例化后和接受新属性时将会调用getDerivedStateFromProps。它应该返回一个对象来更新状态，或者返回null来表明新属性不需要更新任何状态

&emsp;&emsp;注意1：如果父组件导致了组件的重新渲染，即使属性没有更新，这一方法也会被调用

&emsp;&emsp;注意2：调用this.setState() 通常不会触发 getDerivedStateFromProps()

【shouldComponentUpdate(nextProps, nextState)】

&emsp;&emsp;使用shouldComponentUpdate()可以让React知道当前状态或属性的改变是否不影响组件的输出。默认行为是在每一次状态的改变重渲，在大部分情况下应该依赖于默认行为

&emsp;&emsp;当接收到新属性或状态时，shouldComponentUpdate() 在渲染前被调用。默认为true

&emsp;&emsp;若该方法返回false，则componentWillUpdate()、componentDidUpdate()、render()将不会被调用

&emsp;&emsp;注意：该方法并不会在初始化渲染或当使用forceUpdate()时被调用

【render()】

&emsp;&emsp;render()函数应该纯净，意味着其不应该改变组件的状态，其每次调用都应返回相同的结果，同时不直接和浏览器交互。若需要和浏览器交互，将任务放在componentDidMount()阶段或其他的生命周期方法

&emsp;&emsp;render函数应该是一个纯函数，完全根据this.state和this.props来决定返回的结果，而且不要产生任何副作用。在render函数中调用this.setState毫无疑问是错误的，因为一个纯函数不应该引起状态的改变

【getSnapshotBeforeUpdate()】

&emsp;&emsp;getSnapshotBeforeUpdate()在最新的渲染输出提交给DOM前将会立即调用。它让组件能去获得当前的值在它们可能要改变前。这一生命周期返回的任何值将会作为参数被传递给componentDidUpdate()

&emsp;&emsp;注意：该方法必须与componentDidUpdate()方法一起使用

【componentDidUpate(prevProps, prevState)】

&emsp;&emsp;componentDidUpdate()会在更新发生后立即被调用。该方法并不会在初始化渲染时调用。当组件被更新时，使用该方法是操作DOM的一次机会。这也是一个适合发送请求的地方

【componentWillUnmount()】

&emsp;&emsp;componentWillUnmount()在组件被卸载和销毁之前立刻调用。可以在该方法里处理任何必要的清理工作，例如解绑定时器，取消网络请求，清理任何在componentDidMount环节创建的DOM元素

 

&nbsp;

### 强制渲染

【component.forceUpdate(callback)】

&emsp;&emsp;默认情况，当组件或状态发生改变，组件将会重渲。若render()方法依赖其他数据，可以通过调用forceUpdate()来告诉React组件需要重渲

&emsp;&emsp;调用forceUpdate()将会导致组件的 render()方法被调用，并忽略shouldComponentUpdate()。这将会触发每一个子组件的生命周期方法，涵盖每个子组件的shouldComponentUpdate() 方法。若当标签改变，React仅会更新DOM

&emsp;&emsp;通常应该尝试避免所有forceUpdate() 的用法并仅在render()函数里从this.props和this.state读取数据

&nbsp;

### 常见问题

&emsp;&emsp;1、使用getDerivedStateFromProps生命周期函数时，如果不设置constructor，会有如下警告
```
Did not properly initialize state during construction. Expected state to be an object, but it was undefined.
```
&emsp;&emsp;添加空state即可解决
```
  constructor(props) {
    super(props)
    this.state = {}
  }
```
&emsp;&emsp;2、使用componentDidMount生命周期函数时，如果在该函数中直接使用this.setState()，会有如下警告
```
Do not use setState in componentDidMount  react/no-did-mount-set-state
```
&emsp;&emsp;将state设置转移到then方法，或者另一个函数中即可

```
componentDidMount() {
  this.test()
}
test() {
  this.setState({ name: '' })
}
```
