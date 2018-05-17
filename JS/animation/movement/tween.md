# tween.js的使用 

&emsp;&emsp;TweenJS提供了一个简单但强大的渐变界面。它支持渐变的数字对象属性&CSS样式属性，并允许链接补间动画和行动结合起来，创造出复杂的序列。本文将详细介绍tween.js的使用

 

&nbsp;

### 概述

&emsp;&emsp;tween.js允许以平滑的方式修改元素的属性值。只需要告诉tween想修改什么值，以及动画结束时它的最终值是什么，动画花费多少时间等信息，tween引擎就可以计算从开始动画点到结束动画点之间值，来产生平滑的动画效果

&emsp;&emsp;例如，假设有一个对象position，它的坐标为 x 和 y：
```
var position = { x: 100, y: 0 }
```
&emsp;&emsp;如果想改变 x 的值从100到200，只需要这样做：
```
// Create a tween for position first
var tween = new TWEEN.Tween(position);
 
// Then tell the tween we want to animate the x property over 1000 milliseconds
tween.to({ x: 200 }, 1000);
```
&emsp;&emsp;到这里只是创建了tween对象，需要激活它，让它开始动画：
```
// And set it to start
tween.start();
```
&emsp;&emsp;最后为了平滑动画效果，需要在同一个循环动画中调用TWEEN.update方法。代码如下：

```
animate();
 
function animate() {
    requestAnimationFrame(animate);
    // [...]
    TWEEN.update();
    // [...]
}
```
&emsp;&emsp;这个动作将会更新所有被激活的tweens，在1秒钟（例如1000ms）position.x 将变为200。

&emsp;&emsp;也可以使用onUpdate回调函数将结果打印到控制台上
```
tween.onUpdate(function() {
    console.log(this.x);
});
```
&emsp;&emsp;这个函数在每次tweens被更新时都被调用。它的出现频次依赖于很多因素。例如：依赖于你的电脑或设备的运行速度

 

&nbsp;

### 开始动画

&emsp;&emsp;Tween.js本身不会运行，需要通过update方法明确的告诉它什么时候开始运行。推荐在动画主循环中使用该方法。可以通过调用requestAnimationFrame方法来获得良好的图像性能

```
animate();
 
function animate() {
    requestAnimationFrame(animate);
    // [...]
    TWEEN.update();
    // [...]
}
```
&emsp;&emsp;这里使用无参数调用方式，update方法将明确当前时间，以便于获取上一次动画的执行时间。

&emsp;&emsp;也可以为update方法明确一个时间：
```
TWEEN.update(100);
```
&emsp;&emsp;上面语句的意思是说：update的时间=100毫秒。可以使用这种方法来明确代码中所有随时间变化的函数。例如，动画已经开始，想所有动画都同步进行，animate代码改成这样：
```
var currentTime = player.currentTime;
TWEEN.update(currentTime);
``` 

&nbsp;

### 控制动画

【start和stop】

&emsp;&emsp;Tween.start和Tween.stop分别用于控制tween动画的开始和结束

&emsp;&emsp;对于已经结束和没有开始的动画，Tween.stop方法不起作用。Tween.start方法同样接收一个时间参数。如果使用了该参数，tween动画将在延时该时间数后才开始动画。否则它将立刻开始动画

【update】

&emsp;&emsp;可以通过TWEEN.update方法来执行动画的更新

【chain】

&emsp;&emsp;如果你制作多个多行，例如：一个动画在另一个动画结束后开始。可以通过chain方法来使实现。如下代码，tweenB 在 tweenA 之后开始动画
```
tweenA.chain(tweenB);
```
&emsp;&emsp;可以像下面这样制作一个无限循环的动画：
```
tweenA.chain(tweenB);
tweenB.chain(tweenA);
```
【repeat】

&emsp;&emsp;如果你制作循环动画可以使用chain来实现，但是更好的方法是使用repeat方法。它接收一个用于描述想循环多少次的参数
```
tween.repeat(10); // repeats 10 times and stops
tween.repeat(Infinity); // repeats forever
```
【yoyo】

&emsp;&emsp;这个函数只在使用repeat方法时起作用。当它被激活时，tween的效果类似yoyo球效果。该效果是动画会在开始或结束处向反方向反弹

【delay】

&emsp;&emsp;delay方法用于控制动画之间的延时
```
tween.delay(1000);
tween.start();
``` 

&nbsp;

### 全局方法

&emsp;&emsp;以下的方法定义在 TWEEN 的全局对象中，其中大多数方法都用不上，除了update方法：

【TWEEN.update(time)】

&emsp;&emsp;该方法用于所有被激活的tweens，如果time没有被指定，将使用当前时间。

【TWEEN.getAll 和 TWEEN.removeAll】

&emsp;&emsp;这两个方法用于获取被激活的tweens数组的一个引用，或从数组中删除所有tweens。

【TWEEN.add(tween) 和 TWEEN.remove(tween)】

&emsp;&emsp;用于向被激活的tweens中添加一个tween，或移除一个tween

 

&nbsp;

### easing函数

&emsp;&emsp;tween.js提供了一些可用的easing函数。可用函数有：Linear, Quadratic, Cubic, Quartic, Quintic, Sinusoidal, Exponential, Circular, Elastic, Back 和 Bounce。easing 类型分为: In, Out 和 InOut

&emsp;&emsp;不但可以使用tween.js提供的easing函数，还可以自定义easing函数。但必须遵守下面的规则

&emsp;&emsp;1、它必须接收一个参数

&emsp;&emsp;2、它必须基于输入参数返回一个值

&emsp;&emsp;easing函数仅在每个tween每次被更新时调用，而不管有多少属性被改变。结果随后会被用于初始值
```
easedElapsed = easing(k);
for each property:
    newPropertyValue = initialPropertyValue + propertyDelta * easedElapsed;
```
&emsp;&emsp;下面是一个使用Math.floor来做easing效果的例子：
```
function tenStepEasing(k) {
    return Math.floor(k * 10) / 10;
}
```
&emsp;&emsp;可以在tween 这样使用它
```
tween.easing(tenStepEasing);
``` 

&nbsp;

### 回调函数

&emsp;&emsp;另外一个有用的特性是可以在每次tween循环周期的指定时间点调用自定义的函数。

&emsp;&emsp;例如：假设想使一些不能直接修改参数的对象执行动画，要访问该对象的参数只能通过setter方法，可以通过update方法的回调函数来设置新的setter值

```
var trickyObjTween = new TWEEN.Tween({
    propertyA: trickyObj.getPropertyA(),
    propertyB: trickyObj.getPropertyB()
})
    .to({ propertyA: 100, propertyB: 200 })
    .onUpdate(function() {
        this.setA( this.propertyA );
        this.setB( this.propertyB );
    });
```
&emsp;&emsp;或者如果想确认tween动画开始后某个对象指定状态下的某个值，可以通过start回调来获取它：
```
var tween = new TWEEN.Tween(obj)
    .to({ x: 100 })
    .onStart(function() {
        this.x = 0;
    });
```
【onStart】

&emsp;&emsp;tween开始动画前的回调函数。

【onStop】

&emsp;&emsp;tween结束动画后的回调函数。

【onUpdate】

&emsp;&emsp;在tween每次被更新后执行。

【onComplete】

&emsp;&emsp;在tween动画全部结束后执行。

 