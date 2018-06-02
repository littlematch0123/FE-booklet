# React中的DOM操作

&emsp;&emsp;某些情况下需要在典型数据流外强制修改子代。要修改的子代可以是 React 组件实例，也可以是 DOM 元素。这时就要用到refs来操作DOM

 

&nbsp;

### 使用场景

&emsp;&emsp;下面是几个适合使用 refs 的情况

&emsp;&emsp;1、处理焦点、文本选择或媒体控制

&emsp;&emsp;2、触发强制动画

&emsp;&emsp;3、集成第三方 DOM 库

&emsp;&emsp;如果可以通过声明式实现，则尽量避免使用 refs

&emsp;&emsp;注意：不要在 Dialog 组件上直接暴露 open() 和 close() 方法，最好传递 isOpen 属性

 

&nbsp;

### ref

&emsp;&emsp;React 支持给任意组件添加特殊属性。ref 属性接受一个回调函数，它在组件被加载或卸载时会立即执行

&emsp;&emsp;注意：在组件mount之后再去获取ref。componentWillMount和第一次render时都获取不到，在componentDidMount才能获取到

【HTML元素】

&emsp;&emsp;当给 HTML 元素添加 ref 属性时，ref 回调接收了底层的 DOM 元素作为参数

&emsp;&emsp;React 组件在加载时将 DOM 元素传入 ref 的回调函数，在卸载时则会传入 null。ref 回调会在componentDidMount 或 componentDidUpdate 这些生命周期回调之前执行。

```
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
  }
  focus() {
    this.textInput.focus();
  }
  render() {
    return (
      <div>
        <input
          type="text"
          ref={(input) => { this.textInput = input; }} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focus}
        />
      </div>
    );
  }
}
```
&emsp;&emsp;更简短的写法如下
```
ref={input => this.textInput = input}
```
【类组件】

&emsp;&emsp;当 ref 属性用于使用 class 声明的自定义组件时，ref 的回调接收的是已经加载的 React 实例

```
class AutoFocusTextInput extends React.Component {
  componentDidMount() {
    this.textInput.focusTextInput();
  }

  render() {
    return (
      <CustomTextInput
        ref={(input) => { this.textInput = input; }} />
    );
  }
}
```
&emsp;&emsp;注意：这种方法仅对 class 声明的 CustomTextInput 有效

【函数式组件】

&emsp;&emsp;不能在函数式组件上使用 ref 属性，因为它们没有实例

【对父组件暴露DOM节点】

&emsp;&emsp;在子节点上暴露一个特殊的属性。子节点将会获得一个函数属性，并将其作为 ref 属性附加到 DOM 节点。这允许父代通过中间件将 ref 回调给子代的 DOM 节点

&emsp;&emsp;该方法适用于类组件和函数式组件

```
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  render() {
    return (
      <CustomTextInput
        inputRef={el => this.inputElement = el}
      />
    );
  }
}
```
&emsp;&emsp;在上面的例子中，Parent 将它的 ref 回调作为一个特殊的 inputRef 传递给 CustomTextInput，然后 CustomTextInput 通过 ref 属性将其传递给 `<input>`。最终，Parent 中的 this.inputElement 将被设置为与 CustomTextInput 中的 `<input>` 元素相对应的 DOM 节点

 

&nbsp;

### 非受控组件

&emsp;&emsp;要编写一个非受控组件，而非为每个状态更新编写事件处理程序，可以使用 ref 从 DOM 获取表单值

&emsp;&emsp;注意：可能通过e.target.value取得DOM值，而不用绑定react

```
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={(input) => this.input = input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```
&emsp;&emsp;由于非受控组件将真实数据保存在 DOM 中，因此在使用非受控组件时，更容易同时集成React和非React代码

【默认值】

&emsp;&emsp;在 React 的生命周期中，表单元素上的 value 属性将会覆盖 DOM 中的值。使用非受控组件时，通常希望 React 可以为其指定初始值，但不再控制后续更新。要解决这个问题，可以指定一个 defaultValue 属性而不是 value

```
render() {
  return (
    <form onSubmit={this.handleSubmit}>
      <label>
        Name:
        <input
          defaultValue="Bob"
          type="text"
          ref={(input) => this.input = input} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```
&emsp;&emsp;同样，`<input type="checkbox">` 和 `<input type="radio">` 支持 defaultChecked，`<select>` 和 `<textarea>` 支持 defaultValue

 

&nbsp;

### ReactDOM

&emsp;&emsp;react-dom这个软件包提供了针对DOM的方法，可以在应用的顶级域中调用，也可以在有需要的情况下用作跳出React模型的出口。但大部分组件都不应该需要使用这个包
```
render()
unmountComponentAtNode()
findDOMNode()
```
【render()】
```
ReactDOM.render(
  element,
  container,
  [callback]
)
```
&emsp;&emsp;渲染一个React元素，添加到位于提供的container里的DOM元素中，并返回这个组件的一个 引用 (或者对于无状态组件返回null)

&emsp;&emsp;如果这个React元素之前已经被渲染到container里去了，这段代码就会进行一次更新，并且只会改变那些反映元素最新状态所必须的DOM元素

【unmountComponentAtNode()】
```
ReactDOM.unmountComponentAtNode(container)
```
&emsp;&emsp;从DOM元素中移除已挂载的React组件，清除它的事件处理器和state。如果容器内没有挂载任何组件，这个函数什么都不会干。 有组件被卸载的时候返回true，没有组件可供卸载时返回 false

【findDOMNode()】
```
ReactDOM.findDOMNode(component)
```
&emsp;&emsp;如果这个组件已经被挂载到DOM中，函数会返回对应的浏览器中生成的DOM元素 。需要从DOM中读取值时，比如表单的值，或者计算DOM元素的尺寸，这个函数会非常有用。 大多数情况下，可以添加一个指向DOM节点的引用，从而完全避免使用findDOMNode 这个函数。当 render 返回 null 或者 false 时, findDOMNode 也返回 null

 

&nbsp;

### 新ref

&emsp;&emsp;版本16.3 之前，React 有两种提供 ref 的方式：字符串和回调，因为字符串的方式有些问题，所以官方建议使用回调来使用 ref。而现在引入的 createRef API，据官方说是一种零缺点的使用 ref 的方式，回调方式也可以让让路了

```
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```
&emsp;&emsp;然后使用current属性，即可获得当前元素
```
this.myRef.current
```
&emsp;&emsp;典型应用如下所示

```
  constructor(props){
    super(props)
    this.Mask = React.createRef()
    this.MenuList = React.createRef()
  }
  handleClick = () => {
    ReactDOM.findDOMNode(this.MenuList.current).classList.toggle('transform-zero')
    ReactDOM.findDOMNode(this.Mask.current).classList.toggle('mask-show')
  }
```
&emsp;&emsp;注意：使用styledComponents样式化的元素暴露的接口是innerRef，而不是ref
```
<Wrap innerRef={this.itemRef}>
```