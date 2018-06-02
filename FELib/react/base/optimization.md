# react性能优化 
&emsp;&emsp;本文将详细介绍react性能优化

 

&nbsp;

### 避免重复渲染

&emsp;&emsp;当一个组件的props或者state改变时，React通过比较新返回的元素和之前渲染的元素来决定是否有必要更新实际的DOM。当他们不相等时，React会更新DOM。

&emsp;&emsp;在一些情况下，组件可以通过重写这个生命周期函数shouldComponentUpdate来提升速度， 它是在重新渲染过程开始前触发的。 这个函数默认返回true，可使React执行更新：
```
shouldComponentUpdate(nextProps, nextState) {
  return true;
}
```
&emsp;&emsp;如果知道在某些情况下组件不需要更新，可以在shouldComponentUpdate内返回false来跳过整个渲染进程，该进程包括了对该组件和之后的内容调用render()指令

&emsp;&emsp;如果想让组件只在props.color或者state.count的值变化时重新渲染，可以像下面这样设定shouldComponentUpdate

```
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color !== nextProps.color) {
      return true;
    }
    if (this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }
```
【pureComponent】

&emsp;&emsp;在以上代码中，shouldComponentUpdate只检查props.color和state.count的变化。如果这些值没有变化，组件就不会更新。当组件变得更加复杂时，可以使用类似的模式来做一个“浅比较”，用来比较属性和值以判定是否需要更新组件。这种模式十分常见，因此React提供了一个辅助对象来实现这个逻辑 - 继承自React.PureComponent。以下代码可以更简单的实现相同的操作：

```
class CounterButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}
```
&emsp;&emsp;大部分情况下，可以使用React.PureComponent而不必写自己的shouldComponentUpdate，它只做一个浅比较。但是由于浅比较会忽略属性或状态突变的情况，此时不能使用它

 

&nbsp;

### 避免突变

&emsp;&emsp;PureComponent将会在this.props.words的新旧值之间做一个简单的比较。由于代码中words数组在WordAdder的handleClick方法中被改变了，尽管数组中的实际单词已经改变，this.props.words的新旧值还是相等的，因此即便ListOfWords具有应该被渲染的新单词，它还是不会更新。

```
  handleClick() {
    // This section is bad style and causes a bug
    const words = this.state.words;
    words.push('marklar');
    this.setState({words: words});
  }
```
&emsp;&emsp;避免此类问题最简单的方式是避免使用值可能会突变的属性或状态。例如，上面例子中的handleClick应该用concat重写成：
```
handleClick() {
  this.setState(prevState => ({
    words: prevState.words.concat(['marklar'])
  }));
}
```
&emsp;&emsp;或者使用展开运算符
```
handleClick() {
  this.setState(prevState => ({
    words: [...prevState.words, 'marklar'],
  }));
};
```
&emsp;&emsp;也可以用相似的方式重写可以会突变的对象。例如，假设有一个叫colormap的对象，我们想写一个把colormap.right改变成'blue'的函数，我们应该写：
```
function updateColorMap(colormap) {
  colormap.right = 'blue';
}
```
&emsp;&emsp;想要实现代码而不污染原始对象，我们可以使用Object.assign方法
```
function updateColorMap(colormap) {
  return Object.assign({}, colormap, {right: 'blue'});
}
```
&emsp;&emsp;或者使用扩展运算符
```
function updateColorMap(colormap) {
  return {...colormap, right: 'blue'};
}
```
 

&nbsp;

### immutable

&emsp;&emsp;Immutable.js是解决这个问题的另一种方法。它通过结构共享提供不可突变的，持久的集合

&emsp;&emsp;1、不可突变:一旦创建，集合就不能在另一个时间点改变

&emsp;&emsp;2、持久性:可以使用原始集合和一个突变来创建新的集合。原始集合在新集合创建后仍然可用

&emsp;&emsp;3、结构共享:新集合尽可能多的使用原始集合的结构来创建，以便将复制操作降至最少从而提升性能

&emsp;&emsp;不可突变数据使得变化跟踪很方便。每个变化都会导致产生一个新的对象，因此只需检查索引对象是否改变。例如，在这个常见的JavaScript代码中：
```
const x = { foo: 'bar' };
const y = x;
y.foo = 'baz';
x === y; // true
```
&emsp;&emsp;虽然y被编辑了，但是由于它与x索引了相同的对象，这个比较会返回true。可以使用immutable.js实现类似效果：
```
const SomeRecord = Immutable.Record({ foo: null });
const x = new SomeRecord({ foo: 'bar' });
const y = x.set('foo', 'baz');
x === y; // false
```
&emsp;&emsp;在这个例子中，x突变后返回了一个新的索引，因此我们可以安全的确认x被改变了

&emsp;&emsp;还有两个库可以帮助我们使用不可突变数据：seamless-immutable 和immutability-helper。 实现shouldComponentUpdate时，不可突变的数据结构帮助我们轻松的追踪对象变化。这通常可以提供一个不错的性能提升

 