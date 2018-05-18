# 使用canvas进行图像编辑

&emsp;&emsp;本文将分为几个小功能的形式来详细介绍canvas图像编辑

 

&nbsp;

### 缩放

&emsp;&emsp;下面是一张分析图，假设默认情况下，图片和canvas宽高相同。图片的缩放(scale)范围为0.5到3，缩放时改变的是图片的大小和图片的坐标位置
```
W(宽) = canvas.width * scale
H(高) = canvas.height * scale
x坐标 = (W - canvas.width)/2;
y坐标 = (H - canvas.height)/2;
```
![](https://pic.xiaohuochai.site/blog/canvas_image1.png)

&emsp;&emsp;因此，代码如下

```
<canvas id="drawing" style="border:1px solid black">
    <p>The canvas element is not supported!</p>
</canvas>
<br>
<input id="scale-range" min="0.5" max="1.5" step="0.01" type="range" style="width:300px;">
<script>
var drawing = document.getElementById('drawing');
if(drawing.getContext){
  var context = drawing.getContext('2d');
  var slider = document.getElementById('scale-range');
  var W = 400;
  var H = 290;  
  drawing.width = W;  
  drawing.height = H;
  var image = new Image();
  image.src="http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/chunfen.jpg";
  image.onload = function(){
    drawImgByScale(slider.value);
    slider.onmousemove = function(){
      drawImgByScale(slider.value);
    }
  }
  function drawImgByScale(scale){
    var imgW = W * scale;
    var imgH = H * scale;
    var dx =(W - imgW)/2;
    var dy =(H - imgH)/2;
    context.clearRect(0,0,W,H);
    context.drawImage(image,dx,dy,imgW,imgH);
  }
} 
</script>
```


<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/js/canvas/image/i1.html" frameborder="0" width="230" height="240"></iframe> 

&nbsp;

### 水印

&emsp;&emsp;利用canvas可以实现向图片添加水印的功能，先通过file控件的reader选择图片，然后使用canvas添加图片及水印，并且使用toDataURL()和a标签实现添加水印后的图片的下载功能

```
<canvas id="drawing" style="width:300px;border:1px solid black">
    <p>The canvas element is not supported!</p>
</canvas>
<div>
  <span>
    <input type="file" id="addImgHelper" style="display:none">
    <button id="addImg">选择图片</button>
  </span>
  <span>
    <button id="addWaterMark" disabled>添加水印</button>  
    <span>水印文字为</span>
    <input id="waterMarkWords" type="text" value="小火柴的蓝色理想">      
  </span>
  <span>
    <button id="downloadImg" disabled>下载图片</button>
    <a id="downloadImgHelper" href="#" download="带水印图片" style="display:none"></a>   
  </span>
</div>
<script>
if(drawing.getContext){
  var cxt = drawing.getContext('2d');
  var W,H;  
  addImg.onclick = function(){
    addImgHelper.click();
  }
  addImgHelper.onchange = function(){
    addWaterMark.disabled = true;
    downloadImg.disabled = true;
    var file = addImgHelper.files[0];
    if(file && /image/.test(file.type)){
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(){
        var img = new Image();
        img.src= reader.result;
        img.onload = function(){
          addWaterMark.disabled = false;
          drawing.width = W = img.width;
          drawing.height = H = img.height;
          cxt.drawImage(img,0,0);
          addWaterMark.onclick = function(){
              downloadImg.disabled = false;
              cxt.clearRect(0,0,W,H);
              cxt.drawImage(img,0,0);    
              var str = waterMarkWords.value;
              cxt.font = "bold 50px Arial";
              cxt.lineWidth = '1';
              cxt.fillStyle = 'rgba(255,255,255,0.5)';
              cxt.textBaseline = "bottom";
              cxt.textAlign = 'end';
              cxt.fillText(str,W-10,H-10,W/2);   
              downloadImg.onclick = function(){
                downloadImgHelper.href  =  drawing.toDataURL('image/png');
                downloadImgHelper.click();       
              }   
          }  
        }
      }      
    }            
  }               
}
</script>
```

<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/js/canvas/image/i2.html" frameborder="0" width="230" height="240"></iframe> 
 

&nbsp;

### 放大镜

&emsp;&emsp;下面来实现一个放大镜的效果，鼠标按下并移动时，显示当前图片区域的放大效果，抬起后效果消失。放大镜效果主要使用离屏canvas的技术，离屏canvas放置的是图片的放大版，而普通canvas则放置图片的正常版

```
<canvas id="drawing" style="border:1px solid black">
    <p>The canvas element is not supported!</p>
</canvas>
<canvas id="drawingOff" style="display:none">
    <p>The canvas element is not supported!</p>
</canvas>
<script>
if(drawing.getContext){
  var cxt = drawing.getContext('2d');
  var cxtOff = drawingOff.getContext('2d');
  var W,H; 
  var scale = 1.5; 
  var img = new Image();
  img.src="http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/chunfen.jpg";
  img.onload = function(){
    W = img.width;
    H = img.height;
    drawing.width = W/scale;
    drawing.height = H/scale;
    drawingOff.width = W;
    drawingOff.height = H;
    cxt.drawImage(img,0,0,W/scale,H/scale);
    cxtOff.drawImage(img,0,0);
    drawing.onmousedown = function(e){
      e = e || event;
      var x0 = this.offsetLeft;
      var y0 = this.offsetTop; 
      drawMagnifier(e);
      drawing.onmousemove = function(e){
        drawMagnifier(e);
      }
      document.onmouseup = function(e){
        cxt.clearRect(0,0,W/scale,H/scale);
        cxt.drawImage(img,0,0,W/scale,H/scale);
        drawing.onmousemove = null;
      }        
      function drawMagnifier(e){
        cxt.clearRect(0,0,W/scale,H/scale);
        cxt.drawImage(img,0,0,W/scale,H/scale);
        var x = (e.clientX-x0);
        var y = (e.clientY-y0);        
        var r = 40;
        var dx = x - r;
        var dy = y - r;
        var sx = x*scale - r;
        var sy = y*scale - r;
        cxt.save();
        cxt.beginPath();
        cxt.arc(x,y,r,0,Math.PI*2);
        cxt.lineWidth = 4;
        cxt.strokeStyle = '#069';
        cxt.stroke();
        cxt.clip();
        cxt.drawImage(drawingOff,sx,sy,2*r,2*r,dx,dy,2*r,2*r);
        cxt.restore();         
      }
    }
  } 
}
</script>
```
&emsp;&emsp;按下鼠标后不松开，即可出现放大镜效果

<iframe style="width: 100%; height: 240px;" src="https://demo.xiaohuochai.site/js/canvas/image/i3.html" frameborder="0" width="230" height="240"></iframe> 

 

&nbsp;

### 滤镜

&emsp;&emsp;下面利用canvas的getImageData()方法，获取原始图像数据，通过对图像数据进行修改，然后输出修改后的图像数据

```
<canvas id="drawing1" style="border:1px solid black">
    <p>The canvas element is not supported!</p>
</canvas>
<canvas id="drawing2" style="border:1px solid black">
    <p>The canvas element is not supported!</p>
</canvas>
<br>
<button id="noGreen">无绿色</button>
<button id="noBlue">无蓝色</button>
<button id="toGrey">灰度</button>
<button id="toBlackWhite">黑白</button>
<button id="reverse">反色</button>
<script>
if(drawing1.getContext){
  var cxt1 = drawing1.getContext('2d');
  var cxt2 = drawing2.getContext('2d');
  var img = new Image();
  img.src="chunfen.jpg";
  img.onload = function(){
    cxt1.drawImage(img,0,0);
    function filter(fn){
      var imageData = cxt1.getImageData(0,0,img.width,img.height); 
      cxt2.clearRect(0,0,drawing2.width,drawing2.height); 
      var data = imageData.data;
      for(var i = 0, len = data.length; i < len; i+=4){
        fn(data,i)
      }
      imageData.data = data;
      cxt2.putImageData(imageData,0,0); 
    }
    function fnNoGreen(data,i){
      data[i+1] = 0;
    }
    function fnNoBlue(data,i){
      data[i+2] = 0;
    } 
    function fnReverse(data,i){
      var red = data[i];
      var green = data[i+1];
      var blue = data[i+2];
      var alpha = data[i+3];
      data[i] = 255 - red;
      data[i+1] = 255 - green;
      data[i+2] = 255 - blue;
    }       
    function fnToGrey(data,i){
      var red = data[i];
      var green = data[i+1];
      var blue = data[i+2];
      var alpha = data[i+3];
      var average = Math.floor((red+green+blue)/3);
      data[i] = data[i+1] = data[i+2] = average;      
    }    
    function fnToBlackWhite(data,i){
      var red = data[i];
      var green = data[i+1];
      var blue = data[i+2];
      var alpha = data[i+3];
      var average = Math.floor((red+green+blue)/3);
      if(average > 255/2){
        var result = 255;
      }else{
        var result = 0;
      }
      data[i] = data[i+1] = data[i+2] = result;        
    }
    toGrey.onclick = function(){
      filter(fnToGrey);
    }
    noGreen.onclick = function(){
      filter(fnNoGreen);
    }  
    noBlue.onclick = function(){
      filter(fnNoBlue);
    }  
    toBlackWhite.onclick = function(){
      filter(fnToBlackWhite);
    }
    reverse.onclick = function(){
      filter(fnReverse);
    }  
  }
}
</script>
```

<iframe style="width: 100%; height: 370px;" src="https://demo.xiaohuochai.site/js/canvas/image/i4.html" frameborder="0" width="230" height="240"></iframe> 
 

&nbsp;

### 马赛克效果

【普通模糊效果】

&emsp;&emsp;普通模糊效果不仅需要使用当前像素点，还需要使用周围的像素点，并把这些像素点都赋予平均值

```
   function fnToBlur(n){
      cxt2.clearRect(0,0,drawing2.width,drawing2.height); 
      var imageData = cxt1.getImageData(0,0,drawing2.width,drawing2.height); 
      var tempImageData = imageData;
      var data = imageData.data;
      var tempData = tempImageData.data;
      var blurR = n;
      var totalnum = (2*blurR + 1)*(2*blurR + 1);
      for(var i = blurR; i < drawing2.height - blurR; i++){
        for(var j = blurR; j < drawing2.width - blurR; j++){
          var totalr = 0, totalg = 0, totalb = 0;
          for(var dx = -blurR; dx <= blurR; dx++){
            for(var dy = -blurR; dy <= blurR; dy++){
              var x = i + dx;
              var y = j + dy;
              var p = x*drawing2.width + y;
              totalr += tempData[p*4+0];
              totalg += tempData[p*4+1];
              totalb += tempData[p*4+2];
            }
          }
          var p = i*drawing2.width + j;
          data[p*4+0] = totalr / totalnum;
          data[p*4+1] = totalg / totalnum;
          data[p*4+2] = totalb / totalnum;
        }
      }
      imageData.data = data;
      cxt2.putImageData(imageData,0,0); 
    }
```
【马赛克效果】

&emsp;&emsp;马赛克效果则是把一块区域的值，全部都赋予平均值

```
    function fnToMosaic(n){
      cxt2.clearRect(0,0,drawing2.width,drawing2.height); 
      var imageData = cxt1.getImageData(0,0,drawing2.width,drawing2.height); 
      var tempImageData = imageData;
      var data = imageData.data;
      var tempData = tempImageData.data;
      var size = n;
      var totalnum = size*size;
      for(var i = 0; i < drawing2.height; i+=size){
        for(var j = 0; j < drawing2.width; j+=size){
          var totalr = 0, totalg = 0, totalb = 0;
          for(var dx = 0; dx < size; dx++){
            for(var dy = 0; dy < size; dy++){
              var x = i + dx;
              var y = j + dy;
              var p = x*drawing2.width + y;
              totalr += tempData[p*4+0];
              totalg += tempData[p*4+1];
              totalb += tempData[p*4+2];
            }
          }
          var p = i*drawing2.width + j;
          var resr = totalr / totalnum;
          var resg = totalg / totalnum;
          var resb = totalb / totalnum;
          for(var dx = 0; dx < size; dx++){
            for(var dy = 0; dy < size; dy++){
              var x = i + dx;
              var y = j + dy;
              var p = x*drawing2.width + y;
              data[p*4+0]= resr;
              data[p*4+1]= resg;
              data[p*4+2]= resb;
            }
          }
        }
      }
      imageData.data = data;
      cxt2.putImageData(imageData,0,0); 
    }    
```
&emsp;&emsp;下面是一个实例

```
<canvas id="drawing1" style="border:1px solid black">
    <p>The canvas element is not supported!</p>
</canvas>
<canvas id="drawing2" style="border:1px solid black">
    <p>The canvas element is not supported!</p>
</canvas>
<br>
<button id="toLightBlur">轻度模糊</button>
<button id="toHeavyBlur">重度模糊</button>
<button id="toLightMosaic">轻度马赛克</button>
<button id="toHeavyMosaic">重度马赛克</button>
<script>
if(drawing1.getContext){
  var cxt1 = drawing1.getContext('2d');
  var cxt2 = drawing2.getContext('2d');
  var img = new Image();
  img.src="chunfen.jpg";
  img.onload = function(){
    cxt1.drawImage(img,0,0);
    toLightBlur.onclick = function(){
      fnToBlur(1);
    }
    toHeavyBlur.onclick = function(){
      fnToBlur(3);
    }   
    toLightMosaic.onclick = function(){
      fnToMosaic(4);
    } 
    toHeavyMosaic.onclick = function(){
      fnToMosaic(9);
    }     
    function fnToBlur(n){
      cxt2.clearRect(0,0,drawing2.width,drawing2.height); 
      var imageData = cxt1.getImageData(0,0,drawing2.width,drawing2.height); 
      var tempImageData = imageData;
      var data = imageData.data;
      var tempData = tempImageData.data;
      var blurR = n;
      var totalnum = (2*blurR + 1)*(2*blurR + 1);
      for(var i = blurR; i < drawing2.height - blurR; i++){
        for(var j = blurR; j < drawing2.width - blurR; j++){
          var totalr = 0, totalg = 0, totalb = 0;
          for(var dx = -blurR; dx <= blurR; dx++){
            for(var dy = -blurR; dy <= blurR; dy++){
              var x = i + dx;
              var y = j + dy;
              var p = x*drawing2.width + y;
              totalr += tempData[p*4+0];
              totalg += tempData[p*4+1];
              totalb += tempData[p*4+2];
            }
          }
          var p = i*drawing2.width + j;
          data[p*4+0] = totalr / totalnum;
          data[p*4+1] = totalg / totalnum;
          data[p*4+2] = totalb / totalnum;
        }
      }
      imageData.data = data;
      cxt2.putImageData(imageData,0,0); 
    }
    function fnToMosaic(n){
      cxt2.clearRect(0,0,drawing2.width,drawing2.height); 
      var imageData = cxt1.getImageData(0,0,drawing2.width,drawing2.height); 
      var tempImageData = imageData;
      var data = imageData.data;
      var tempData = tempImageData.data;
      var size = n;
      var totalnum = size*size;
      for(var i = 0; i < drawing2.height; i+=size){
        for(var j = 0; j < drawing2.width; j+=size){
          var totalr = 0, totalg = 0, totalb = 0;
          for(var dx = 0; dx < size; dx++){
            for(var dy = 0; dy < size; dy++){
              var x = i + dx;
              var y = j + dy;
              var p = x*drawing2.width + y;
              totalr += tempData[p*4+0];
              totalg += tempData[p*4+1];
              totalb += tempData[p*4+2];
            }
          }
          var p = i*drawing2.width + j;
          var resr = totalr / totalnum;
          var resg = totalg / totalnum;
          var resb = totalb / totalnum;
          for(var dx = 0; dx < size; dx++){
            for(var dy = 0; dy < size; dy++){
              var x = i + dx;
              var y = j + dy;
              var p = x*drawing2.width + y;
              data[p*4+0]= resr;
              data[p*4+1]= resg;
              data[p*4+2]= resb;
            }
          }
        }
      }
      imageData.data = data;
      cxt2.putImageData(imageData,0,0); 
    }    
  }
}
</script>
```

<iframe style="width: 100%; height: 370px;" src="https://demo.xiaohuochai.site/js/canvas/image/i5.html" frameborder="0" width="230" height="240"></iframe> 