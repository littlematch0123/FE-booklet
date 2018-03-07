# 移动端中的陀螺仪 

　　本文将详细介绍移动端中的陀螺仪的概念及相关实现

 

&nbsp;

### 横竖屏

　　window下的orientation属性来表示移动端的横竖屏状态，chrome模拟器不支持该属性，只能在真机上测试
```
window.orientation
```
　　按照上右下左的顺序，该属性的结果分别是0、90、180、-90

　　[注意]手机头朝下的切换没有实现

　　window下的orientationchange事件来监测移动端的横竖屏状态

　　[注意]横竖屏切换也会触发resize事件
```
    window.addEventListener('orientationchange',()=>{
      alert(window.orientation)
    })
```
　　测试代码如下

```
<style>
#box{
  width: 100px;
　height: 100px;
  line-height: 100px;
  background: pink;
  margin: 30px auto 0;
  text-align: center;
}  
</style>
<div id="box"></div>
<script>
let oBox = document.getElementById('box')
  window.addEventListener('orientationchange',()=>{
    oBox.innerHTML = window.orientation
  })
</script>
```
　　[查看效果](https://demo.xiaohuochai.site/mobile/device/d1.html)

 

&nbsp;

### 设备方向

　　deviceorientation事件用来监听设备的方向

　　设备在三维空间中是靠x、y和z轴来定位的。当设备静止放在水平表面上时，这三个值都是0

　　x轴方向是从左往右，y轴方向是从下往上，z轴方向是从后往前

　　触发deviceorientation事件时，事件对象中包含着每个轴相对于设备静止状态下发生变化的信息，事件对象包含以下5个属性
```
alpha:在围绕z轴旋转时（即左右旋转时),y轴的度数差；是一个介于0到360之间的浮点数
beta:在围绕x轴旋转时（即前后旋转时）,z轴的度数差；是一个介于-180到180之间的浮点数
gamma:在围绕y轴旋转时（即扭转设备时)，z轴的度数差；是一个介于-90到90之间的浮点数
absolute:布尔值，表示设备是否返回—个绝对值
compassCalibrated:布尔值，表示设备的指南针是否校准过
```
　　手机放置在水平桌面上，android的alpha、beta、gamma值为90、0、0；IOS的alpha、beta、gamma值为0、0、0

　　测试代码如下

```
<style>
#box{
  width: 100px;
  line-height: 100px;
  height: 100px;
  background: pink;
  margin: 30px auto 0;
  text-align: center;
}  
</style>
<div id="box"></div>
<script>
let oBox = document.getElementById('box');
window.addEventListener('deviceorientation',(e)=>{
  oBox.innerHTML = Math.round(e.beta)
  oBox.style.transform = `rotate(${e.beta}deg)`
})
</script>
```
　　[查看效果](https://demo.xiaohuochai.site/mobile/device/d2.html)

 

&nbsp;

### 设备移动

　　window.devicemotion事件告诉开发人员设备什么时候移动，而不仅仅是设备方向如何改变

　　触发devicemotion事件时，事件对象包含以下属性
```
acceleration:一个包含X、y和z属性的对象，在不考虑重力的情况下，告诉你在每个方向上的加速度
accelerationIncludingGravity： 一个包含x、y和z属性的对象，在考虑z轴自然重力加速度的情况下，告诉你在每个方向上的加速度
interval:以毫秒表示的时间值，必须在另一个devicemotion事件触发前传入。这个值在每个事件中应该是一个常量
rotationRate: —个包含表示方向的alpha、beta和gamma属性的对象
```
　　手机在不同方向下，android和IOS的acceleration和accelerationlncludingGravity这两个属性的x、y、z的值表示不同

　　1、放置在水平桌面上
```
android x:0 y:0 z:10
IOS x:0 y:0 z:-10
```
　　2、屏幕朝右
```
android x:-10 y:0 z:0
IOS x:10 y:0 z:0
```
　　3、屏幕正对人
```
android x:0 y:10 z:0
IOS x:0 y:-10 z:0
```
　　所以，android和IOS下重力加速度的取值相反

【元素跟随手机移动】

　　下面利用accelerationlncludingGravity属性实现元素跟随手机移动的效果

　　测试代码如下

```
<style>
#box{
  width: 100px;
  height: 100px;
  background: pink;
  margin: 30px auto 0;
  text-align: center;
}  
</style>
<div id="box"></div>
<script>
let oBox = document.getElementById('box');
let lastX=0,lastY=0,lastZ=0;
window.addEventListener('devicemotion',(e)=>{
  requestAnimationFrame(()=>{
    let {x,y,z} = e.accelerationIncludingGravity
    x = 6*x
    y = 6*y
    z = 6*z
    oBox.style.transform = `translate3d(${x+lastX}px,${y+lastY}px,${z+lastZ}px)`
    lastX = x
    lastY = y
    lastZ = z    
  })
})
</script>
```
　　[查看效果](https://demo.xiaohuochai.site/mobile/device/d3.html)

【摇一摇】

　　摇一摇的原理非常简单，检测到手机的重力加速忽然有比较大的变化幅度即可。摇一摇时，元素颜色发生变化

　　测试代码如下

```
<style>
#box{
  width: 100px;
  height: 100px;
  background: pink;
  margin: 30px auto 0;
  text-align: center;
  transition: 1s;
}  
</style>
<div id="box"></div>
<script>
let oBox = document.getElementById('box');
let colorArr = ['orange','lightblue','lightgreen','pink','lightyellow']
let lastX,lastY,lastZ
let index = 0
window.addEventListener('devicemotion',(e)=>{
  requestAnimationFrame(()=>{
    let {x,y,z} = e.accelerationIncludingGravity
    let nowRange = Math.abs(lastX -x) + Math.abs(lastY - y) + Math.abs(lastZ - z) 
    if(nowRange > 80){
      index = (index+1)%colorArr.length
      oBox.style.background = colorArr[index]
    }
    lastX = x 
    lastY = y
    lastZ = z 
  })
})
</script>
```
　　[查看效果](https://demo.xiaohuochai.site/mobile/device/d4.html)