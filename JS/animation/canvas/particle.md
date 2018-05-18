# canvas粒子系统的构建

&emsp;&emsp;本文将从最基本的imageData对象的理论知识说开去，详细介绍canvas粒子系统的构建

 

&nbsp;

### 效果演示

&emsp;&emsp;下面是实例效果演示，博文结尾有全部源码

<iframe style="width: 100%; height: 360px;" src="https://demo.xiaohuochai.site/js/canvas/particle/p1.html" frameborder="0" width="230" height="240"></iframe> 

 

&nbsp;

### imageData

&emsp;&emsp;关于图像数据imageData共有3个方法，包括getImageData()、putImageData()、createImageData()

【getImageData()】

&emsp;&emsp;2D上下文可以通过getImageData()取得原始图像数据。这个方法接收4个参数：画面区域的x和y坐标以及该区域的像素宽度和高度

&emsp;&emsp;例如，要取得左上角坐标为(10,5)、大小为`50*50`像素的区域的图像数据，可以使用以下代码：

```
var imageData = context.getImageData(10,5,50,50);
```
&emsp;&emsp;返回的对象是ImageData的实例，每个ImageData对象有3个属性：width\height\data

&emsp;&emsp;1、width：表示imageData对角的宽度

&emsp;&emsp;2、height：表示imageData对象的高度

&emsp;&emsp;3、data是一个数组，保存着图像中每一个像素的数据。在data数组中，每一个像素用4个元素来保存，分别表示red、green、blue、透明度

&emsp;&emsp;注意:图像中有多少像素，data的长度就等于像素个数乘以4

```
//第一个像素如下
var data = imageData.data;
var red = data[0];
var green = data[1]; 
var blue = data[2];
var alpha = data[3];
```
&emsp;&emsp;数组中每个元素的值是在0-255之间，能够直接访问到原始图像数据，就能够以各种方式来操作这些数据

&emsp;&emsp;注意:如果要使用getImageData()获取的canvas中包含drawImage()方法，则该方法中的URL不能跨域

【createImageData()】

&emsp;&emsp;createImageData(width,height)方法创建新的空白ImageData对象。新对象的默认像素值 transparent black，相当于rgba(0,0,0,0)

```
var imgData = context.createImageData(100,100);
【putImageData()】
```

&emsp;&emsp;putImageData()方法将图像数据从指定的ImageData对象放回画布上，该方法共有以下参数


```
imgData：要放回画布的ImageData对象(必须)
x：imageData对象的左上角的x坐标(必须)
y：imageData对象的左上角的y坐标(必须)
dirtyX：在画布上放置图像的水平位置(可选)
dirtyY：在画布上放置图像的垂直位置(可选)
dirtyWidth：在画布上绘制图像所使用的宽度(可选)
dirtyHeight：在画布上绘制图像所使用的高度(可选)
```

&emsp;&emsp;注意:参数3到7要么都没有，要么都存在
```
context.putImageData(imgData,0,0);    
context.putImageData(imgData,0,0,50,50,200,200);
``` 

&nbsp;

### 粒子写入

&emsp;&emsp;粒子，指图像数据imageData中的每一个像素点。下面以一个简易实例来说明完全写入与粒子写入

【完全写入】

&emsp;&emsp;200*200的canvas1中存在文字'小火柴'，并将canvas1整个作为图像数据写入同样尺寸的canvas2中

```
<canvas id="drawing1" style="border:1px solid black"></canvas>
<canvas id="drawing2" style="border:1px solid black"></canvas>
<script>
var drawing1 = document.getElementById('drawing1');
var drawing2 = document.getElementById('drawing2');
if(drawing1.getContext){
  var cxt = drawing1.getContext('2d');
  var cxt2 = drawing2.getContext('2d');
  var W = drawing1.width = drawing2.width = 200;
  var H = drawing1.height = drawing2.height = 200;
  var str = '小火柴';
  cxt.textBaseline = 'top';
  var sh = 60;
  cxt.font = sh + 'px  宋体'
  var sw = cxt.measureText(str).width;
  if(sw > W){
      sw = W;
  }
  cxt.fillText(str,(W - sw)/2,(H - sh)/2,W);
  //获取imageData
  var imageData = cxt.getImageData(0,0,W,H); 
  //写入drawing2中 
  cxt2.putImageData(imageData,0,0);
</script>  
```
<iframe style="width: 100%; height: 440px;" src="https://demo.xiaohuochai.site/js/canvas/particle/p2.html" frameborder="0" width="230" height="240"></iframe> 


【粒子写入】

&emsp;&emsp;对于完全写入而言，相当于只是简单的复制粘贴，如果要对每个像素点进行精细地控制，则需要使用粒子写入。canvas1中存在着大量的空白区域，只有'小火柴'这三个字的区域是有效的。于是，可以根据图像数据imageData中的透明度对粒子进行筛选，只筛选出透明度大于0的粒子

```
<canvas id="drawing1" style="border:1px solid black"></canvas>
<canvas id="drawing2" style="border:1px solid black"></canvas>
<script>
var drawing1 = document.getElementById('drawing1');
var drawing2 = document.getElementById('drawing2');
if(drawing1.getContext){
  var cxt = drawing1.getContext('2d');
  var cxt2 = drawing2.getContext('2d');
  var W = drawing1.width = drawing2.width = 200;
  var H = drawing1.height = drawing2.height = 200;
  var str = '小火柴';
  cxt.textBaseline = 'top';
  var sh = 60;
  cxt.font = sh + 'px  宋体'
  var sw = cxt.measureText(str).width;
  if(sw > W){
      sw = W;
  }
  cxt.fillText(str,(W - sw)/2,(H - sh)/2,W);
  //获取imageData
  var imageData = cxt.getImageData(0,0,W,H); 
  //写入drawing2中 
  cxt2.putImageData(setData(imageData),0,0);
  function setData(imageData){
    //从imageData对象中取得粒子，并存储到dots数组中
    var dots = [];
    for(var i = 0; i < W; i++){
      for(var j = 0; j < H ;j++){
        //data值中的红色值
        var k = 4*(i + j*W);
        //data值中的透明度
        if(imageData.data[k+3] > 0){
          //将透明度大于0的data中的红色值保存到dots数组中
          dots.push(k);
        }
      }
    }
    //40000 2336
    console.log(i*j,dots.length);
    //新建一个imageData，并将筛选后的粒子信息保存到新建的imageData中
    var oNewImage = cxt.createImageData(W,H);
    for(var i = 0; i < dots.length; i++){
      oNewImage.data[dots[i]+0] = imageData.data[dots[i]+0];
      oNewImage.data[dots[i]+1] = imageData.data[dots[i]+1];
      oNewImage.data[dots[i]+2] = imageData.data[dots[i]+2];
      oNewImage.data[dots[i]+3] = imageData.data[dots[i]+3];
    }
    return oNewImage;
  }
}
</script>  
```
&emsp;&emsp;虽然结果看上去相同，但canvas2只使用了canvas1中40000个粒子中的2336个

<iframe style="width: 100%; height: 440px;" src="https://demo.xiaohuochai.site/js/canvas/particle/p3.html" frameborder="0" width="230" height="240"></iframe> 

 

&nbsp;

### 粒子筛选
&emsp;&emsp;当粒子完全写入时，与canvas复制粘贴的效果相同。而当粒子有所筛选时，则会出现一些奇妙的效果

【按序筛选】

&emsp;&emsp;由于取得粒子时，使用的是宽度值*高度值的双重循环，且都以加1的形式递增。如果不是加1，而是加n，则可以实现按序筛选的效果

```
<canvas id="drawing1" style="border:1px solid black"></canvas>
<canvas id="drawing2" style="border:1px solid black"></canvas>
<div id="con">
  <button>1</button>
  <button>2</button>
  <button>3</button>
  <button>4</button>
  <button>5</button>
</div>
<script>
var oCon = document.getElementById('con');
oCon.onclick = function(e){
  e = e || event;
  var tempN = e.target.innerHTML;
  if(tempN){
    cxt2.clearRect(0,0,W,H);
    cxt2.putImageData(setData(imageData,Number(tempN)),0,0);
  }
}
var drawing1 = document.getElementById('drawing1');
var drawing2 = document.getElementById('drawing2');
if(drawing1.getContext){
  var cxt = drawing1.getContext('2d');
  var cxt2 = drawing2.getContext('2d');
  var W = drawing1.width = drawing2.width = 200;
  var H = drawing1.height = drawing2.height = 200;
  var str = '小火柴';
  cxt.textBaseline = 'top';
  var sh = 60;
  cxt.font = sh + 'px  宋体'
  var sw = cxt.measureText(str).width;
  if(sw > W){
      sw = W;
  }
  cxt.fillText(str,(W - sw)/2,(H - sh)/2,W);
  //获取imageData
  var imageData = cxt.getImageData(0,0,W,H); 
  //写入drawing2中 
  cxt2.putImageData(setData(imageData,1),0,0);
  function setData(imageData,n){
    //从imageData对象中取得粒子，并存储到dots数组中
    var dots = [];
    for(var i = 0; i < W; i+=n){
      for(var j = 0; j < H ;j+=n){
        //data值中的红色值
        var k = 4*(i + j*W);
        //data值中的透明度
        if(imageData.data[k+3] > 0){
          //将透明度大于0的data中的红色值保存到dots数组中
          dots.push(k);
        }
      }
    }
    //新建一个imageData，并将筛选后的粒子信息保存到新建的imageData中
    var oNewImage = cxt.createImageData(W,H);
    for(var i = 0; i < dots.length; i++){
      oNewImage.data[dots[i]+0] = imageData.data[dots[i]+0];
      oNewImage.data[dots[i]+1] = imageData.data[dots[i]+1];
      oNewImage.data[dots[i]+2] = imageData.data[dots[i]+2];
      oNewImage.data[dots[i]+3] = imageData.data[dots[i]+3];
    }
    return oNewImage;
  }
}
</script>  
```
&emsp;&emsp;点击下面的不同按钮，可以得到不同程度的粒子筛选


<iframe style="width: 100%; height: 480px;" src="https://demo.xiaohuochai.site/js/canvas/particle/p4.html" frameborder="0" width="230" height="240"></iframe> 

【随机筛选】

&emsp;&emsp;除了使用按序筛选，还可以使用随机筛选。 通过双重循环得到的粒子的位置信息，放到dots数组中。通过splice()方法进行筛选，将筛选后的位置信息放到新建的newDots数组中，然后再使用createImageData()，新建一个图像数据对象并返回

```
<canvas id="drawing1" style="border:1px solid black"></canvas>
<canvas id="drawing2" style="border:1px solid black"></canvas>
<div id="con">
  <button>1000</button>
  <button>2000</button>
  <button>3000</button>
  <button>4000</button>
</div>
<script>
var oCon = document.getElementById('con');
oCon.onclick = function(e){
  e = e || event;
  var tempN = e.target.innerHTML;
  if(tempN){
    cxt2.clearRect(0,0,W,H);
    cxt2.putImageData(setData(imageData,1,Number(tempN)),0,0);
  }
}
var drawing1 = document.getElementById('drawing1');
var drawing2 = document.getElementById('drawing2');
if(drawing1.getContext){
  var cxt = drawing1.getContext('2d');
  var cxt2 = drawing2.getContext('2d');
  var W = drawing1.width = drawing2.width = 200;
  var H = drawing1.height = drawing2.height = 200;
  var str = '小火柴';
  cxt.textBaseline = 'top';
  var sh = 60;
  cxt.font = sh + 'px  宋体'
  var sw = cxt.measureText(str).width;
  if(sw > W){
      sw = W;
  }
  cxt.fillText(str,(W - sw)/2,(H - sh)/2,W);
  //获取imageData
  var imageData = cxt.getImageData(0,0,W,H); 
  //写入drawing2中 
  cxt2.putImageData(setData(imageData,1),0,0);
  function setData(imageData,n,m){
    //从imageData对象中取得粒子，并存储到dots数组中
    var dots = [];
    for(var i = 0; i < W; i+=n){
      for(var j = 0; j < H ;j+=n){
        //data值中的红色值
        var k = 4*(i + j*W);
        //data值中的透明度
        if(imageData.data[k+3] > 0){
          //将透明度大于0的data中的红色值保存到dots数组中
          dots.push(k);
        }
      }
    }    
    //筛选粒子，仅保存m个到newDots数组中。如果不传入m，则不进行筛选
    var newDots = [];
    if(m && (dots.length > m)){
      for(var i = 0; i < m; i++){
        newDots.push(Number(dots.splice(Math.floor(Math.random()*dots.length),1)));
      }
    }else{
      newDots = dots;
    }    
    //新建一个imageData，并将筛选后的粒子信息保存到新建的imageData中
    var oNewImage = cxt.createImageData(W,H);
    for(var i = 0; i < newDots.length; i++){
      oNewImage.data[newDots[i]+0] = imageData.data[newDots[i]+0];
      oNewImage.data[newDots[i]+1] = imageData.data[newDots[i]+1];
      oNewImage.data[newDots[i]+2] = imageData.data[newDots[i]+2];
      oNewImage.data[newDots[i]+3] = imageData.data[newDots[i]+3];
    }
    return oNewImage;
  }
}
</script>  
```
&emsp;&emsp;点击下面的不同按钮，可以筛选出对应数量的随机的粒子


<iframe style="width: 100%; height: 480px;" src="https://demo.xiaohuochai.site/js/canvas/particle/p5.html" frameborder="0" width="230" height="240"></iframe> 
 

&nbsp;

### 像素显字

&emsp;&emsp;下面来使用粒子筛选来实现一个像素显字的效果。像素显字即从不清晰的效果逐步过渡到完全显示

【按序像素显字】

&emsp;&emsp;按序像素显字的实现原理非常简单，比如，共有2000个粒子，共10个程度的过渡效果。则使用10个数组，分别保存200、400、600、800、100、1200、1400、1600、1800和2000个粒子。然后使用定时器将其逐步显示出来即可

```
<canvas id="drawing1" style="border:1px solid black"></canvas>
<button id="btn">开始显字</button>
<script>
var drawing1 = document.getElementById('drawing1');
if(drawing1.getContext){
  var cxt = drawing1.getContext('2d');
  var W = drawing1.width = 200;
  var H = drawing1.height = 200;
  var str = '小火柴';
  cxt.textBaseline = 'top';
  var sh = 60;
  cxt.font = sh + 'px  宋体'
  var sw = cxt.measureText(str).width;
  if(sw > W){
      sw = W;
  }
  cxt.fillText(str,(W - sw)/2,(H - sh)/2,W);
  //获取imageData
  var imageData = cxt.getImageData(0,0,W,H); 
  cxt.clearRect(0,0,W,H);
  //获得10组粒子
  var imageDataArr = [];
  var n = 10;
  var index = 0;
  for(var i = n; i > 0; i--){
    imageDataArr.push(setData(imageData,i));
  }
  var oTimer = null;
  btn.onclick = function(){
    clearTimeout(oTimer);
    showData();
  }
  function showData(){
    oTimer = setTimeout(function(){
      cxt.clearRect(0,0,W,H);
      //写入drawing1中 
      cxt.putImageData(imageDataArr[index++],0,0); 
      //迭代函数       
      showData();      
      if(index == 10){
&emsp;&emsp;     index = 0;
        clearTimeout(oTimer);
      }      

    },100);      
  }    
  function setData(imageData,n,m){
    //从imageData对象中取得粒子，并存储到dots数组中
    var dots = [];
    for(var i = 0; i < W; i+=n){
      for(var j = 0; j < H ;j+=n){
        //data值中的红色值
        var k = 4*(i + j*W);
        //data值中的透明度
        if(imageData.data[k+3] > 0){
          //将透明度大于0的data中的红色值保存到dots数组中
          dots.push(k);
        }
      }
    }    
    //筛选粒子，仅保存m个到newDots数组中。如果不传入m，则不进行筛选
    var newDots = [];
    if(m && (dots.length > m)){
      for(var i = 0; i < m; i++){
        newDots.push(Number(dots.splice(Math.floor(Math.random()*dots.length),1)));
      }
    }else{
      newDots = dots;
    }    
    //新建一个imageData，并将筛选后的粒子信息保存到新建的imageData中
    var oNewImage = cxt.createImageData(W,H);
    for(var i = 0; i < newDots.length; i++){
      oNewImage.data[newDots[i]+0] = imageData.data[newDots[i]+0];
      oNewImage.data[newDots[i]+1] = imageData.data[newDots[i]+1];
      oNewImage.data[newDots[i]+2] = imageData.data[newDots[i]+2];
      oNewImage.data[newDots[i]+3] = imageData.data[newDots[i]+3];
    }
    return oNewImage;
  }
}
</script>  
```
&emsp;&emsp;点击开始显字，即可出现效果

<iframe style="width: 100%; height: 280px;" src="https://demo.xiaohuochai.site/js/canvas/particle/p6.html" frameborder="0" width="230" height="240"></iframe> 


【随机像素显字】

&emsp;&emsp;随机像素显字的原理类似，保存多个不同数量的随机像素的数组即可

```
<canvas id="drawing1" style="border:1px solid black"></canvas>
<button id="btn">开始显字</button>
<script>
var drawing1 = document.getElementById('drawing1');
if(drawing1.getContext){
  var cxt = drawing1.getContext('2d');
  var W = drawing1.width = 200;
  var H = drawing1.height = 200;
  var str = '小火柴';
  cxt.textBaseline = 'top';
  var sh = 60;
  cxt.font = sh + 'px  宋体'
  var sw = cxt.measureText(str).width;
  if(sw > W){
      sw = W;
  }
  cxt.fillText(str,(W - sw)/2,(H - sh)/2,W);
  //获取imageData
  var imageData = cxt.getImageData(0,0,W,H); 
  cxt.clearRect(0,0,W,H);
  //获得10组粒子
  var imageDataArr = [];
  var n = 10;
  var index = 0;
  for(var i = n; i > 0; i--){
    imageDataArr.push(setData(imageData,1,i));
  }
  var oTimer = null;
  btn.onclick = function(){
    clearTimeout(oTimer);
    showData();
  }
  function showData(){
    oTimer = setTimeout(function(){
      cxt.clearRect(0,0,W,H);
      //写入drawing1中 
      cxt.putImageData(imageDataArr[index++],0,0); 
      //迭代函数       
      showData();      
      if(index == 10){
        clearTimeout(oTimer);
        index = 0;
      }      
    },100);      
  }    
  function setData(imageData,n,m){
    //从imageData对象中取得粒子，并存储到dots数组中
    var dots = [];
    for(var i = 0; i < W; i+=n){
      for(var j = 0; j < H ;j+=n){
        //data值中的红色值
        var k = 4*(i + j*W);
        //data值中的透明度
        if(imageData.data[k+3] > 0){
          //将透明度大于0的data中的红色值保存到dots数组中
          dots.push(k);
        }
      }
    }    
    //筛选粒子，仅保存dots.length/m个到newDots数组中
    var newDots = [];
    var len = Math.floor(dots.length/m);
    for(var i = 0; i < len; i++){
      newDots.push(Number(dots.splice(Math.floor(Math.random()*dots.length),1)));
    }
    //新建一个imageData，并将筛选后的粒子信息保存到新建的imageData中
    var oNewImage = cxt.createImageData(W,H);
    for(var i = 0; i < newDots.length; i++){
      oNewImage.data[newDots[i]+0] = imageData.data[newDots[i]+0];
      oNewImage.data[newDots[i]+1] = imageData.data[newDots[i]+1];
      oNewImage.data[newDots[i]+2] = imageData.data[newDots[i]+2];
      oNewImage.data[newDots[i]+3] = imageData.data[newDots[i]+3];
    }
    return oNewImage;
  }
}
</script> 
```
<iframe style="width: 100%; height: 280px;" src="https://demo.xiaohuochai.site/js/canvas/particle/p7.html" frameborder="0" width="230" height="240"></iframe> 

 

&nbsp;

### 粒子动画

&emsp;&emsp;粒子动画并不是粒子在做动画，而是通过getImageData()方法获得粒子的随机坐标和最终坐标后，通过fillRect()方法绘制的小方块在做运动。使用定时器，不断的绘制坐标变化的小方块，以此来产生运动的效果

【随机位置】

```
<canvas id="drawing1" style="border:1px solid black"></canvas>
<button id="btn1">开始显字</button>
<button id="btn2">重新混乱</button>
<script>
var drawing1 = document.getElementById('drawing1');
if(drawing1.getContext){
  var cxt = drawing1.getContext('2d');
  var W = drawing1.width = 200;
  var H = drawing1.height = 200;
  var str = '小火柴';
  cxt.textBaseline = 'top';
  var sh = 60;
  cxt.font = sh + 'px  宋体'
  var sw = cxt.measureText(str).width;
  if(sw > W){
      sw = W;
  }
  cxt.fillText(str,(W - sw)/2,(H - sh)/2,W);
  //获取imageData
  var imageData = cxt.getImageData(0,0,W,H); 
  cxt.clearRect(0,0,W,H);
  function setData(imageData,n,m){
    //从imageData对象中取得粒子，并存储到dots数组中
    var dots = [];
    //dots的索引
    var index = 0;
    for(var i = 0; i < W; i+=n){
      for(var j = 0; j < H ;j+=n){
        //data值中的红色值
        var k = 4*(i + j*W);
        //data值中的透明度
        if(imageData.data[k+3] > 0){
          //将透明度大于0的data中的红色值保存到dots数组中
          dots.push(k);
          dots[index++] = {
            'index':index,
            'x':i,
            'y':j,
            'red':k,
            'randomX':Math.random()*W,
            'randomY':Math.random()*H,
          }
        }
      }
    }    
    //筛选粒子，仅保存dots.length/m个到newDots数组中
    var newDots = [];
    var len = Math.floor(dots.length/m);
    for(var i = 0; i < len; i++){
      newDots.push(dots.splice(Math.floor(Math.random()*dots.length),1)[0]);
    }
    return newDots;
  }
  //获得粒子数组
  var dataArr = setData(imageData,1,1);
  var oTimer1 = null;
  var oTimer2 = null;
  btn1.onclick = function(){
    clearTimeout(oTimer1);
    showData(10);
  }  
  btn2.onclick = function(){
    clearTimeout(oTimer2);
    showRandom(10);
  }    
  function showData(n){
    oTimer1 = setTimeout(function(){
      cxt.clearRect(0,0,W,H);
      for(var i = 0; i < dataArr.length; i++){
        var temp = dataArr[i];
        var x0 = temp.randomX;
        var y0 = temp.randomY;
        var disX = temp.x - temp.randomX;
        var disY = temp.y - temp.randomY;
        cxt.fillRect(x0 + disX/n,y0 + disY/n,1,1);  
      }   
      showData(n-1);    
      if(n === 1){
        clearTimeout(oTimer1);
      }      
    },60);  
  } 
  function showRandom(n){
    oTimer2 = setTimeout(function fn(){
      cxt.clearRect(0,0,W,H);
      for(var i = 0; i < dataArr.length; i++){
        var temp = dataArr[i];
        var x0 = temp.x;
        var y0 = temp.y;
        var disX = temp.randomX - temp.x;
        var disY = temp.randomY - temp.y;
        cxt.fillRect(x0 + disX/n,y0 + disY/n,1,1);             
      }     
      showRandom(n-1);    
      if(n === 1){
        clearTimeout(oTimer2);
      }      
    },60);  
  } 
}
</script>  
```
<iframe style="width: 100%; height: 280px;" src="https://demo.xiaohuochai.site/js/canvas/particle/p8.html" frameborder="0" width="230" height="240"></iframe> 

【飘入效果】　

 &emsp;&emsp;飘入效果与随机显字的原理相似，不再赘述

```
<canvas id="drawing1" style="border:1px solid black"></canvas>
<button id="btn1">左上角飘入</button>
<script>
var drawing1 = document.getElementById('drawing1');
if(drawing1.getContext){
  var cxt = drawing1.getContext('2d');
  var W = drawing1.width = 200;
  var H = drawing1.height = 200;
  var str = '小火柴';
  cxt.textBaseline = 'top';
  var sh = 60;
  cxt.font = sh + 'px  宋体'
  var sw = cxt.measureText(str).width;
  if(sw > W){
      sw = W;
  }
  cxt.fillText(str,(W - sw)/2,(H - sh)/2,W);
  //获取imageData
  var imageData = cxt.getImageData(0,0,W,H); 
  cxt.clearRect(0,0,W,H);
  function setData(imageData,n,m){
    //从imageData对象中取得粒子，并存储到dots数组中
    var dots = [];
    //dots的索引
    var index = 0;
    for(var i = 0; i < W; i+=n){
      for(var j = 0; j < H ;j+=n){
        //data值中的红色值
        var k = 4*(i + j*W);
        //data值中的透明度
        if(imageData.data[k+3] > 0){
          //将透明度大于0的data中的红色值保存到dots数组中
          dots.push(k);
          dots[index++] = {
            'index':index,
            'x':i,
            'y':j,
            'red':k,
            'randomX':Math.random()*W,
            'randomY':Math.random()*H,
          }
        }
      }
    }    
    //筛选粒子，仅保存dots.length/m个到newDots数组中
    var newDots = [];
    var len = Math.floor(dots.length/m);
    for(var i = 0; i < len; i++){
      newDots.push(dots.splice(Math.floor(Math.random()*dots.length),1)[0]);
    }
    return newDots;
  }
  //获得粒子数组
  var dataArr = setData(imageData,1,1);
  var oTimer1 = null;
  btn1.onclick = function(){
    clearTimeout(oTimer1);
    showData(10);
  }    
  function showData(n){
    oTimer1 = setTimeout(function(){
      cxt.clearRect(0,0,W,H);
      for(var i = 0; i < dataArr.length; i++){
        var temp = dataArr[i];
        var x0 = 0;
        var y0 = 0;
        var disX = temp.x - 0;
        var disY = temp.y - 0;
        cxt.fillRect(x0 + disX/n,y0 + disY/n,1,1);  
      }   
      showData(n-1);    
      if(n === 1){
        clearTimeout(oTimer1);
      }      
    },60);  
  } 
}
</script>  
```
<iframe style="width: 100%; height: 280px;" src="https://demo.xiaohuochai.site/js/canvas/particle/p9.html" frameborder="0" width="230" height="240"></iframe> 

 

&nbsp;

### 鼠标交互

&emsp;&emsp;一般地，粒子的鼠标交互都与isPointInPath(x,y)方法有关

【移入变色】

&emsp;&emsp;当鼠标接近粒子时，该粒子变红。实现原理很简单。鼠标移动时，通过isPointInPath(x,y)方法检测，有哪些粒子处于当前指针范围内。如果处于，绘制1像素的红色矩形即可

```
<canvas id="drawing1" style="border:1px solid black"></canvas>
<script>
var drawing1 = document.getElementById('drawing1');
if(drawing1.getContext){
  var cxt = drawing1.getContext('2d');
  var W = drawing1.width = 200;
  var H = drawing1.height = 200;
  var str = '小火柴';
  cxt.textBaseline = 'top';
  var sh = 60;
  cxt.font = sh + 'px  宋体'
  var sw = cxt.measureText(str).width;
  if(sw > W){
      sw = W;
  }
  cxt.fillText(str,(W - sw)/2,(H - sh)/2,W);
  //获取imageData
  var imageData = cxt.getImageData(0,0,W,H); 
  function setData(imageData,n,m){
    //从imageData对象中取得粒子，并存储到dots数组中
    var dots = [];
    //dots的索引
    var index = 0;
    for(var i = 0; i < W; i+=n){
      for(var j = 0; j < H ;j+=n){
        //data值中的红色值
        var k = 4*(i + j*W);
        //data值中的透明度
        if(imageData.data[k+3] > 0){
          //将透明度大于0的data中的红色值保存到dots数组中
          dots.push(k);
          dots[index++] = {
            'index':index,
            'x':i,
            'y':j,
            'red':k,
            'randomX':Math.random()*W,
            'randomY':Math.random()*H,
          }
        }
      }
    }    
    //筛选粒子，仅保存dots.length/m个到newDots数组中
    var newDots = [];
    var len = Math.floor(dots.length/m);
    for(var i = 0; i < len; i++){
      newDots.push(dots.splice(Math.floor(Math.random()*dots.length),1)[0]);
    }
    return newDots;
  }
  //获得粒子数组
  var dataArr = setData(imageData,1,1);  
  //鼠标移动时，当粒子距离鼠标指针小于10时，则进行相关操作
  drawing1.onmousemove = function(e){
    e = e || event;
    var x = e.clientX - drawing1.getBoundingClientRect().left;
    var y = e.clientY - drawing1.getBoundingClientRect().top;
    cxt.beginPath();
    cxt.arc(x,y,10,0,Math.PI*2);
    for(var i = 0; i < dataArr.length; i++){
      var temp = dataArr[i];
      if(cxt.isPointInPath(temp.x,temp.y)){   
        cxt.fillStyle = 'red';
        cxt.fillRect(temp.x,temp.y,1,1);
      }        
    }   
  }
}
</script> 
```
&emsp;&emsp;鼠标靠近文字时，可将靠近文字的区域变成红色

<iframe style="width: 100%; height: 230px;" src="https://demo.xiaohuochai.site/js/canvas/particle/p10.html" frameborder="0" width="230" height="240"></iframe> 

【远离鼠标】

&emsp;&emsp;鼠标点击时，以鼠标指针为圆心的一定范围内的粒子需要移动到该范围以外。一段时间后，粒子回到原始位置

&emsp;&emsp;实现原理并不复杂，使用isPointInPath(x,y)方法即可，如果粒子处于当前路径中，则沿着鼠标指针与粒子坐标组成的直线方向，移动到路径的边缘

```
<canvas id="drawing1" style="border:1px solid black"></canvas>
<script>
var drawing1 = document.getElementById('drawing1');
if(drawing1.getContext){
  var cxt = drawing1.getContext('2d');
  var W = drawing1.width = 200;
  var H = drawing1.height = 200;
  var str = '小火柴';
  cxt.textBaseline = 'top';
  var sh = 60;
  cxt.font = sh + 'px  宋体'
  var sw = cxt.measureText(str).width;
  if(sw > W){
      sw = W;
  }
  //渲染文字
  cxt.fillText(str,(W - sw)/2,(H - sh)/2,W);
  //获取imageData
  var imageData = cxt.getImageData(0,0,W,H); 
  cxt.clearRect(0,0,W,H);
  function setData(imageData,n,m){
    //从imageData对象中取得粒子，并存储到dots数组中
    var dots = [];
    //dots的索引
    var index = 0;
    for(var i = 0; i < W; i+=n){
      for(var j = 0; j < H ;j+=n){
        //data值中的红色值
        var k = 4*(i + j*W);
        //data值中的透明度
        if(imageData.data[k+3] > 0){
          //将透明度大于0的data中的红色值保存到dots数组中
          dots.push(k);
          dots[index++] = {
            'index':index,
            'x':i,
            'y':j,
            'red':k,
            'randomX':Math.random()*W,
            'randomY':Math.random()*H,
            'mark':false
          }
        }
      }
    }    
    //筛选粒子，仅保存dots.length/m个到newDots数组中
    var newDots = [];
    var len = Math.floor(dots.length/m);
    for(var i = 0; i < len; i++){
      newDots.push(dots.splice(Math.floor(Math.random()*dots.length),1)[0]);
    }
    return newDots;
  }
  //获得粒子数组
  var dataArr = setData(imageData,2,1); 
  //将筛选后的粒子信息保存到新建的imageData中
  var oNewImage = cxt.createImageData(W,H);
  for(var i = 0; i < dataArr.length; i++){
    for(var j = 0; j < 4; j++){
      oNewImage.data[dataArr[i].red+j] = imageData.data[dataArr[i].red+j];
    }
  }    
  //写入canvas中
  cxt.putImageData(oNewImage,0,0);
  //设置鼠标检测半径为r
  var r = 20;
  //鼠标移动时，当粒子距离鼠标指针小于20时，则进行相关操作
  drawing1.onmousedown = function(e){
    e = e || event;
    var x = e.clientX - drawing1.getBoundingClientRect().left;
    var y = e.clientY - drawing1.getBoundingClientRect().top;
    cxt.beginPath();
    cxt.arc(x,y,r,0,Math.PI*2);
    for(var i = 0; i < dataArr.length; i++){
      var temp = dataArr[i];
      if(cxt.isPointInPath(temp.x,temp.y)){  
        temp.mark = true;
        var angle = Math.atan2((temp.y - y),(temp.x - x));
        temp.endX =  x - r*Math.cos(angle);
        temp.endY =  y - r*Math.sin(angle);
        var disX = temp.x - temp.endX;
        var disY = temp.y - temp.endY;
        cxt.fillStyle = '#fff';
        cxt.fillRect(temp.x,temp.y,1,1);
        cxt.fillStyle = '#000';
        cxt.fillRect(temp.endX,temp.endY,1,1);  
        dataRecovery(10);
      }else{
        temp.mark = false;
      }     
    }
    var oTimer = null;
    function dataRecovery(n){
      clearTimeout(oTimer);
      oTimer = setTimeout(function(){
        cxt.clearRect(0,0,W,H);
        for(var i = 0; i < dataArr.length; i++){
          var temp = dataArr[i];
          if(temp.mark){
            var x0 = temp.endX;
            var y0 = temp.endY;
            var disX = temp.x - x0;
            var disY = temp.y - y0;
            cxt.fillRect(x0 + disX/n,y0 + disY/n,1,1);  
          }else{
            cxt.fillRect(temp.x,temp.y,1,1);
          }
        }   
        dataRecovery(n-1);    
        if(n === 1){
          clearTimeout(oTimer);
        }      
      },17);
    } 
  }  
}
</script>  
```
&emsp;&emsp;使用鼠标点击canvas中的文字，出现效果

<iframe style="width: 100%; height: 230px;" src="https://demo.xiaohuochai.site/js/canvas/particle/p11.html" frameborder="0" width="230" height="240"></iframe> 


 

&nbsp;

### 综合实例

&emsp;&emsp;下面将上面的效果制作为一个可编辑的综合实例

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
<canvas id="drawing1" style="border:1px solid black"></canvas>
<br>
<div style="margin-bottom:10px">
  <span>粒子设置：</span>
  <input type="text" id="textValue" value="小火柴的蓝色理想">  
  <button id="btnSetText">文字设置确认</button>
  <button id="btnchoose2">按序筛选</button>
  <button id="btnchoose3">随机筛选</button>
  <button id="btnchoose1">不筛选</button>  
</div>
<div style="margin-bottom:10px">
  <span>粒子效果：</span>
  <button id="btn1">按序显字</button>
  <button id="btn2">随机显字</button>  
  <button id="btn3">混乱聚合</button>
  <button id="btn4">重新混乱</button>
</div>
<div>
  <span>鼠标效果：</span>
  <span>1、鼠标移到文字上时，文字颜色变红；</span>
  <span>2、鼠标在文字上点击时，粒子远离鼠标指针</span>
</div>
<script>
if(drawing1.getContext){
  var cxt = drawing1.getContext('2d');
  var W = drawing1.width = 300;
  var H = drawing1.height = 200; 
  var imageData;
  var dataArr;
  btnSetText.onclick = function(){
    fnSetText(textValue.value);
  }  
  function fnSetText(str){
    cxt.clearRect(0,0,W,H);
    cxt.textBaseline = 'top';
    var sh = 60;
    cxt.font = sh + 'px  宋体'
    var sw = cxt.measureText(str).width;
    if(sw > W){
        sw = W;
    }
    cxt.fillText(str,(W - sw)/2,(H - sh)/2,W);  
    imageData = cxt.getImageData(0,0,W,H); 
    dataArr = setData(imageData,1,1); 
  }
  fnSetText('小火柴');
  btnchoose1.onclick = function(){
    dataArr = setData(imageData,1,1);
    saveData(dataArr);  
  }
  btnchoose2.onclick = function(){
    dataArr = setData(imageData,2,1);
    saveData(dataArr); 
  }
  btnchoose3.onclick = function(){
    dataArr = setData(imageData,1,2);
    saveData(dataArr); 
  }    
  //筛选粒子
  function setData(imageData,n,m){
    //从imageData对象中取得粒子，并存储到dots数组中
    var dots = [];
    //dots的索引
    var index = 0;
    for(var i = 0; i < W; i+=n){
      for(var j = 0; j < H ;j+=n){
        //data值中的红色值
        var k = 4*(i + j*W);
        //data值中的透明度
        if(imageData.data[k+3] > 0){
          //将透明度大于0的data中的红色值保存到dots数组中
          dots.push(k);
          dots[index++] = {
            'index':index,
            'x':i,
            'y':j,
            'red':k,
            'green':k+1,
            'blue':k+2,
            'randomX':Math.random()*W,
            'randomY':Math.random()*H,
            'mark':false
          }
        }
      }
    }    
    //筛选粒子，仅保存dots.length/m个到newDots数组中
    var newDots = [];
    var len = Math.floor(dots.length/m);
    for(var i = 0; i < len; i++){
      newDots.push(dots.splice(Math.floor(Math.random()*dots.length),1)[0]);
    }
    return newDots;
  }
  function saveData(dataArr){
    //将筛选后的粒子信息保存到新建的imageData中
    var oNewImage = cxt.createImageData(W,H);
    for(var i = 0; i < dataArr.length; i++){
      for(var j = 0; j < 4; j++){
        oNewImage.data[dataArr[i].red+j] = imageData.data[dataArr[i].red+j];
      }
    }
    //写入canvas中
    cxt.putImageData(oNewImage,0,0);       
  }
  //显示粒子
  function showData(arr,oTimer,index,n){
    oTimer = setTimeout(function(){
      cxt.clearRect(0,0,W,H);
      //写入canvas中 
      saveData(arr[index++]); 
      if(index == n){
        clearTimeout(oTimer);
      }else{
        //迭代函数       
        showData(arr,oTimer,index,n);           
      }                     
    },60);      
  }   
  //重新混乱
  function showDataToRandom(dataArr,oTimer,n){
    oTimer = setTimeout(function fn(){
      cxt.clearRect(0,0,W,H);
      for(var i = 0; i < dataArr.length; i++){
        var temp = dataArr[i];
        var x0 = temp.x;
        var y0 = temp.y;
        var disX = temp.randomX - temp.x;
        var disY = temp.randomY - temp.y;
        cxt.fillRect(x0 + disX/n,y0 + disY/n,1,1);             
      } 
      n--;
      if(n === 0){
        clearTimeout(oTimer);
      }else{
        showDataToRandom(dataArr,oTimer,n); 
      }             
    },60);  
  } 
  //混乱聚合
  function showRandomToData(dataArr,oTimer,n){
    oTimer = setTimeout(function(){
      cxt.clearRect(0,0,W,H);
      for(var i = 0; i < dataArr.length; i++){
        var temp = dataArr[i];
        var x0 = temp.randomX;
        var y0 = temp.randomY;
        var disX = temp.x - temp.randomX;
        var disY = temp.y - temp.randomY;
        cxt.fillRect(x0 + disX/n,y0 + disY/n,1,1);  
      }   
      n--;
      if(n === 0){
        clearTimeout(oTimer);
      }else{
        showRandomToData(dataArr,oTimer,n); 
      }      
    },60);  
  }
  btn1.onclick = function(){
    btn1.arr = [];
    for(var i = 10; i > 1; i--){
      btn1.arr.push(setData(imageData,i,1));
    }
    showData(btn1.arr,btn1.oTimer,0,9);
  }
  btn2.onclick = function(){
    btn2.arr = [];
    for(var i = 10; i > 0; i--){
      btn2.arr.push(setData(imageData,2,i));
    }
    showData(btn2.arr,btn2.oTimer,0,10);
  }   
  btn3.onclick = function(){
    clearTimeout(btn3.oTimer);
    showRandomToData(dataArr,btn3.oTimer,10);
  }
  btn4.onclick = function(){
    clearTimeout(btn4.oTimer);
    showDataToRandom(dataArr,btn4.oTimer,10);
  }  
  //鼠标移动
  drawing1.onmousemove = function(e){
    e = e || event;
    var x = e.clientX - drawing1.getBoundingClientRect().left;
    var y = e.clientY - drawing1.getBoundingClientRect().top;
    cxt.beginPath();
    cxt.arc(x,y,10,0,Math.PI*2);
    for(var i = 0; i < dataArr.length; i++){
      var temp = dataArr[i];
      if(cxt.isPointInPath(temp.x,temp.y)){   
        cxt.fillStyle = 'red';
        cxt.fillRect(temp.x,temp.y,1,1);
      }        
    }
    cxt.fillStyle = 'black';   
  }    
  //鼠标点击
  drawing1.onmousedown = function(e){
    var r = 20;
    e = e || event;
    var x = e.clientX - drawing1.getBoundingClientRect().left;
    var y = e.clientY - drawing1.getBoundingClientRect().top;
    cxt.beginPath();
    cxt.arc(x,y,r,0,Math.PI*2);
    for(var i = 0; i < dataArr.length; i++){
      var temp = dataArr[i];
      if(cxt.isPointInPath(temp.x,temp.y)){  
        temp.mark = true;
        var angle = Math.atan2((temp.y - y),(temp.x - x));
        temp.endX =  x - r*Math.cos(angle);
        temp.endY =  y - r*Math.sin(angle);
        var disX = temp.x - temp.endX;
        var disY = temp.y - temp.endY;
        cxt.fillStyle = '#fff';
        cxt.fillRect(temp.x,temp.y,1,1);
        cxt.fillStyle = '#f00';
        cxt.fillRect(temp.endX,temp.endY,1,1);  
        cxt.fillStyle="#000";
        dataRecovery(10);
      }else{
        temp.mark = false;
      }     
    }
    var oTimer = null;
    function dataRecovery(n){
      clearTimeout(oTimer);
      oTimer = setTimeout(function(){
        cxt.clearRect(0,0,W,H);
        for(var i = 0; i < dataArr.length; i++){
          var temp = dataArr[i];
          if(temp.mark){
            var x0 = temp.endX;
            var y0 = temp.endY;
            var disX = temp.x - x0;
            var disY = temp.y - y0;
            cxt.fillRect(x0 + disX/n,y0 + disY/n,1,1);  
          }else{
            cxt.fillRect(temp.x,temp.y,1,1);
          }
        }   
        dataRecovery(n-1);    
        if(n === 1){
          clearTimeout(oTimer);
        }      
      },17);
    } 
  }  
}
</script> 
</body>
</html>
```
<iframe style="width: 100%; height: 360px;" src="https://demo.xiaohuochai.site/js/canvas/particle/p1.html" frameborder="0" width="230" height="240"></iframe> 