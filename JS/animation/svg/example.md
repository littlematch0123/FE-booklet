# 使用SVG基本操作API

&emsp;&emsp;本文将详细介绍SVG基本操作API，并使用这些API制作实例效果

 

&nbsp;

### 效果演示

&emsp;&emsp;下面是利用SVG基本操作API制作的一个前端开发学习目录。点击中间的元素，可随机旋转。点击目录内容，可进入相关页面。宽边框的元素表示为二级目录

<iframe style="width: 100%; height: 330px;" src="https://demo.xiaohuochai.site/js/svgapi/s1.html" frameborder="0" width="320" height="240"></iframe>

 

&nbsp;

### 基础API

&emsp;&emsp;在javascript中，可以使用一些基本的API来对SVG进行操作

【NS地址】

&emsp;&emsp;因为SVG定义在其自身的命令空间下，而不是HTML的命名空间下，可以作为单独的XML文件存在。所以需要使用自身的NS地址

&emsp;&emsp;有两个常用的NS地址
```
var SVG_NS = "http://www.w3.org/2000/svg";
var XLINK_NS = "http://www.w3.org/1999/xlink";
```
【创建图形】
```
document.createElementNS(SVG_NS,tagName);
```
【添加图形】
```
element.appendChild(childElement)
```
【设置/获取属性】
```
element.setAttribute(name,value);
element.getAttribute(name);
```
【设置xlink】

&emsp;&emsp;`<a>`、`<textPath>`等标签需要设置xlink属性
```
element.setAttributeNS(XLINK_NS,'xlink:href',value);
``` 

&nbsp;

### 封装函数

&emsp;&emsp;将创建标签及添加属性的操作封闭成一个函数，方便复用

```
function createTag(tag,objAttr){
  var oTag = document.createElementNS('http://www.w3.org/2000/svg',tag);
      for(var attr in objAttr){
        if(attr == 'xlink:href'){
            oTag.setAttributeNS("http://www.w3.org/1999/xlink",attr,objAttr[attr]);
        }else{
            oTag.setAttribute(attr,objAttr[attr]);
        }        
      }    
  return oTag;
} 
```
&emsp;&emsp;下面通过该函数，创建一个圆形

```
<script>
function createTag(tag,objAttr){
  var oTag = document.createElementNS('http://www.w3.org/2000/svg',tag);
      for(var attr in objAttr){
        if(attr == 'xlink:href'){
            oTag.setAttributeNS("http://www.w3.org/1999/xlink",attr,objAttr[attr]);
        }else{
            oTag.setAttribute(attr,objAttr[attr]);
        }        
      }    
  return oTag;
} 
var oSvg = createTag('svg',{'version':'1.1','xmls':'http://www.w3.org/2000/svg',height:'70'});
var oCircle = createTag('circle',{'cx':'25','cy':'25','r':20,'fill':'pink'});
oSvg.appendChild(oCircle);
document.body.appendChild(oSvg);
</script>
```
<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svgapi/s2.html" frameborder="0" width="320" height="240"></iframe>

 

&nbsp;

### 实例

&emsp;&emsp;下面通过SVG基本操作API，创建一个可交互的SVG实例

```
<style>
#box{
    height: 300px;
    width: 300px;
    background: hsl(20,40%,90%);
    background-image:linear-gradient(90deg,#fb3 11px,transparent 0),
    linear-gradient(90deg,#ab4 23px,transparent 0),
    linear-gradient(90deg,#655 41px,transparent 0);
    background-size: 41px 100%,61px 100%,83px 100%;    
} 
</style>
<div id="box"></div>
<script>
var oSvg = createTag('svg',{'version':'1.1','xmls':'http://www.w3.org/2000/svg',height:'100%',width:'100%'});
var oBox = document.getElementById('box');
var W = parseInt(getComputedStyle(oBox).width);
var H = parseInt(getComputedStyle(oBox).height);
var appearance = {
    'dis':H/3,
    'r0':H/8,'r':H/10,
    'x0':W/2,'y0':H/2,
    'fontSize':H/20,
    'bg0':'hsla(0,0%,100%,.6)','bg':'hsla(0,0%,100%,.3)',
    'color0':'hsl(210,13%,30%)','color':'hsl(210,13%,30%)',
    'borderColor0':'rgba(0,0,0,0.3)','bordercolor':'rgba(0,0,0,0.3)',
    'strokWidth0':3,'strokWidth':2,
    'lineColor':'rgba(0,0,0,0.3)','lineWidth':1,'lineDashed':'5,5'
}
var data = {
    text:'前端开发',
    children:[
        {text:'HTML',url:'http://www.cnblogs.com/xiaohuochai/p/5203223.html'},
        {text:'CSS',url:'http://www.cnblogs.com/xiaohuochai/p/5249139.html'},
        {text:'JS',url:'http://www.cnblogs.com/xiaohuochai/p/5613593.html'},
        {text:'ES6',url:'http://www.cnblogs.com/xiaohuochai/p/7233392.html'},
        {text:'HTTP',url:'http://www.cnblogs.com/xiaohuochai/p/6392010.html'},
        {text:'NodeJS',url:'http://www.cnblogs.com/xiaohuochai/p/6940560.html'},
        {text:'前端工具',url:'http://www.cnblogs.com/xiaohuochai/p/6666415.html'},
    ],  
}
addChildenTags();
addCenterTag();
oBox.appendChild(oSvg);
function createTag(tag,objAttr){
  var oTag = document.createElementNS('http://www.w3.org/2000/svg',tag);
      for(var attr in objAttr){
        if(attr == 'xlink:href'){
            oTag.setAttributeNS("http://www.w3.org/1999/xlink",attr,objAttr[attr]);
        }else{
            oTag.setAttribute(attr,objAttr[attr]);
        }        
      }    
  return oTag;
} 
function addCenterTag(){
    var oG = createTag('g',{'style':'cursor:default'});
    var oCircle = createTag('circle',{'cx':appearance.x0,'cy':appearance.y0,'r':appearance.r0,'fill':appearance.bg0,'stroke':appearance.borderColor0,'stroke-width':appearance.strokWidth0});
    var oText = createTag('text',{'x':appearance.x0,'y':appearance.y0,'font-size':appearance.fontSize,'text-anchor':'middle','dominant-baseline':'middle','stroke-width':appearance.strokWidth0});
    oText.innerHTML = data.text;
    oG.appendChild(oCircle);
    oG.appendChild(oText);
    oSvg.appendChild(oG);
}
function addChildenTags(){
    var children = data.children;
    var length = children.length;
    var deg = (360/length)*(2*Math.PI)/360;
    for(var i = 0; i < children.length;i++){
        var cos = Math.cos(deg*i - 90);
        var sin = Math.sin(deg*i - 90);
        var x = appearance.x0  + appearance.dis*cos;
        var y = appearance.y0  + appearance.dis*sin;
        var oA = createTag('a',{'xlink:href':children[i].url,'target':'_black'}); 
        var oG = createTag('g',{'style':'cursor:pointer'}); 
        oG.index = i;               
        var oLine = createTag('line',{'x1':x-appearance.r*cos,y1:y-appearance.r*sin,x2:appearance.x0+appearance.r0*cos,y2:appearance.y0+appearance.r0*sin,'stroke':appearance.lineColor,'stroke-width':appearance.lineWidth,'stroke-dasharray':appearance.lineDashed,'style':'transition:.5s'});
        var oLineHelper = createTag('line',{'x1':x-appearance.r*cos,y1:y-appearance.r*sin,x2:appearance.x0+appearance.r0*cos,y2:appearance.y0+appearance.r0*sin,'stroke':'transparent','stroke-width':10});       
        var oCircle = createTag('circle',{'cx':x,'cy':y,'r':appearance.r,'fill':appearance.bg,'stroke':appearance.bordercolor,'stroke-width':appearance.strokWidth,'class':'frostedglass'});
        var oText = createTag('text',{'x':x,'y':y,'font-size':appearance.fontSize,'text-anchor':'middle','dominant-baseline':'middle','stroke-width':appearance.strokWidth,fill:appearance.color});
        oText.innerHTML = children[i].text;  
        oG.appendChild(oLine);
        oG.appendChild(oLineHelper);            
        oG.appendChild(oCircle);                  
        oG.appendChild(oText);
        oA.appendChild(oG);
        oSvg.appendChild(oA);
        oG.onmouseenter = function(){
            elasticMove(this,appearance.r*1.2);
            var line = this.children[0];
            line.removeAttribute('stroke-dasharray');
            line.setAttribute('stroke-width',appearance.lineWidth*3);
            line.setAttribute('x1',appearance.x0+(appearance.dis - appearance.r0)*Math.cos(deg*this.index - 90));
            line.setAttribute('y1',appearance.y0+(appearance.dis - appearance.r0)*Math.sin(deg*this.index - 90));
        }
        oG.onmouseleave = function(){
            elasticMove(this,appearance.r);
            var line = this.children[0];
            line.setAttribute('stroke-width',appearance.lineWidth);
            line.setAttribute('stroke-dasharray',appearance.lineDashed);
            line.setAttribute('x1',appearance.x0+(appearance.dis - appearance.r)*Math.cos(deg*this.index - 90));
            line.setAttribute('y1',appearance.y0+(appearance.dis - appearance.r)*Math.sin(deg*this.index - 90));          
        }         
    }
}
function elasticMove(obj,str){
    var circle = obj.getElementsByTagName('circle')[0];
    var r0 = circle.getAttribute('r');
    var r = Number(str);
    //声明步长值
    var step = 0;
    //声明弹性距离
    var len = r - r0;
    //声明弹性系数
    var k = 0.7;
    //声明损耗系数
    var z= 0.7;
    //声明当前值
    var cur = r0;
    clearInterval(circle.timer);
    circle.timer = setInterval(function(){
        //获取当前值cur
        cur =  circle.getAttribute('r');
        //更新弹性距离
        len = r - cur;
        //弹力影响
        step += len*k;
        //阻力影响
        step = step*z;
        //赋值
        circle.setAttribute('r',Number(cur) + step);
        //当元素的步长值接近于0，并且弹性距离接近于0时，停止定时器
        if(Math.round(step) == 0 && Math.round(len) == 0){
            circle.setAttribute('r',r);
            clearInterval(circle.timer); 
        }    
    },30);
}
</script>   
```
&emsp;&emsp;下面是效果演示

<iframe style="width: 100%; height: 330px;" src="https://demo.xiaohuochai.site/js/svgapi/s3.html" frameborder="0" width="320" height="240"></iframe>

【改进版】

&emsp;&emsp;下面的改进版增加了二级目录，并增加了一些动态效果

```
<style>
#box{
    height: 300px;
    width: 300px;
    background: hsl(20,40%,90%);
    background-image:linear-gradient(90deg,#fb3 11px,transparent 0),
    linear-gradient(90deg,#ab4 23px,transparent 0),
    linear-gradient(90deg,#655 41px,transparent 0);
    background-size: 41px 100%,61px 100%,83px 100%;    
} 
</style>
<div id="box"></div>
<script>
var oSvg = createTag('svg',{'version':'1.1','xmls':'http://www.w3.org/2000/svg',height:'100%',width:'100%'});
var oBox = document.getElementById('box');
var W = parseInt(getComputedStyle(oBox).width);
var H = parseInt(getComputedStyle(oBox).height);
var appearance = {
    'dis':H/3,
    'r0':H/8,'r':H/10,
    'x0':W/2,'y0':H/2,
    'fontSize':H/24,
    'bg0':'rgba(255,255,255,.6)','bg':'rgba(255,255,255,.6)',
    'borderColor0':'rgba(0,0,0,.3)','bordercolor':'rgba(0,0,0,.3)',
    'strokeWidth0':4,'strokeWidth1':2,'strokeWidth2':4,
    'lineColor':'rgba(0,0,0,0.3)','lineWidth':1,'lineDashed':'5,5',
    'backX':W/20,'backY':H/20,'backFill':'rgba(0,0,0,.3)','backScale':'0.4',
}
var data = {
    text:'前端开发',
    children:[
        {text:'PS',url:'http://www.cnblogs.com/xiaohuochai/p/5657404.html'},
        {text:'HTML',url:'http://www.cnblogs.com/xiaohuochai/p/5203223.html'},
        {text:'CSS',url:'http://www.cnblogs.com/xiaohuochai/p/5249139.html'},
        {text:'JS',url:'http://www.cnblogs.com/xiaohuochai/p/5613593.html'},
        {text:'ES6',url:'http://www.cnblogs.com/xiaohuochai/p/7233392.html'},
        {text:'HTTP',url:'http://www.cnblogs.com/xiaohuochai/p/6392010.html'},
        {text:'前端工具',url:'http://www.cnblogs.com/xiaohuochai/p/6666415.html'},
        {text:'前端框架',url:'#',children:[
            {text:'Bootstrap',url:'http://www.cnblogs.com/xiaohuochai/p/7097376.html'},
            {text:'jQuery',url:'http://www.cnblogs.com/xiaohuochai/p/6489658.html'},
            {text:'Vue',url:'http://www.cnblogs.com/xiaohuochai/p/7356084.html'},

        ]},
        {text:'后端相关',url:'#',children:[
            {text:'NodeJS',url:'http://www.cnblogs.com/xiaohuochai/p/6940560.html'},
            {text:'MongoDB',url:'http://www.cnblogs.com/xiaohuochai/p/7372243.html'},
            {text:'PHP',url:'http://www.cnblogs.com/xiaohuochai/p/6038637.html'},
            {text:'MySQL',url:'http://www.cnblogs.com/xiaohuochai/p/6081482.html'},
        ]},        
    ],  
}
function init(){
    addChildenTags(data.children);
    addCenterTag(data);
    oBox.appendChild(oSvg);    
}
init();function createTag(tag,objAttr){
  var oTag = document.createElementNS('http://www.w3.org/2000/svg',tag);
      for(var attr in objAttr){
        if(attr == 'xlink:href'){
            oTag.setAttributeNS("http://www.w3.org/1999/xlink",attr,objAttr[attr]);
        }else{
            oTag.setAttribute(attr,objAttr[attr]);
        }        
      }    
  return oTag;
} 
function addCenterTag(obj){
    var oG = createTag('g',{'style':'cursor:pointer'});
    var oCircle = createTag('circle',{'cx':appearance.x0,'cy':appearance.y0,'r':appearance.r0,'fill':appearance.bg0,'stroke':appearance.borderColor0,'stroke-width':appearance.strokeWidth0});
    var oText = createTag('text',{'x':appearance.x0,'y':appearance.y0,'font-size':appearance.fontSize,'text-anchor':'middle','dominant-baseline':'middle','stroke-width':appearance.strokeWidth0});
    oText.innerHTML = obj.text;
    oG.appendChild(oCircle);
    oG.appendChild(oText);
    oSvg.appendChild(oG);
    oG.onclick = function(e){
        e = e || event;
        oSvg.innerHTML = '';
        if(obj.url == '#'){
            addChildenTags(obj.children);
            addBackTag();
        }else{
            addChildenTags(data.children);
        }       
        addCenterTag(obj);        
    }
}
function addBackTag(){
    var oG = createTag('g',{'style':'cursor:pointer'});
    var oClipPath = createTag('clipPath',{'id':'clipPath1'});
    var oPolygon = createTag('polygon',{'points':'40 0, 40 20, 100 20, 100 80, 40 80, 40 100, 0 50'});
    var oRect = createTag('rect',{'x':0,'y':0,'width':100,'height':100,'fill':appearance.backFill,'clip-path':'url(#clipPath1)','transform':'scale(' + appearance.backScale + ') translate(' + appearance.backX + ','+appearance.backY + ')',});
    oClipPath.appendChild(oPolygon);
    oG.appendChild(oClipPath);
    oG.appendChild(oRect);
    oSvg.appendChild(oG);
    oG.onclick = function(){
        oSvg.innerHTML = '';
        addChildenTags(data.children);
        addCenterTag(data);
    }    
}
function randomArr(arr){
    return arr.sort(function(){return Math.random() - 0.5});
}
function addChildenTags(children){
    var length = children.length;
    var deg = (360/length)*(2*Math.PI)/360;
    var posArr = [];
    var randomRotate = Math.floor(360*Math.random());
    for(var i = 0; i < children.length;i++){
        var cos = Math.cos(deg*i - randomRotate);
        var sin = Math.sin(deg*i - randomRotate);
        var x = appearance.x0  + appearance.dis*cos;
        var y = appearance.y0  + appearance.dis*sin;        
        posArr[i] = {index:i,cos:cos,sin:sin,x:x,y:y};  
    }    
    randomArr(posArr);    
    for(var i = 0; i < children.length;i++){
        var oA = createTag('a',{'xlink:href':children[i].url,'target':'_black'}); 
        oA.obj = children[i];
        oA.index = posArr[i].index;
        var oG = createTag('g',{'style':'cursor:pointer'});        
        var oLine = createTag('line',{'x1':posArr[i].x-appearance.r*posArr[i].cos,y1:posArr[i].y-appearance.r*posArr[i].sin,x2:appearance.x0+appearance.r0*posArr[i].cos,y2:appearance.y0+appearance.r0*posArr[i].sin,'stroke':appearance.lineColor,'stroke-width':appearance.lineWidth,'stroke-dasharray':appearance.lineDashed,'style':'transition:.5s'});
        var oLineHelper = createTag('line',{'x1':posArr[i].x-appearance.r*posArr[i].cos,y1:posArr[i].y-appearance.r*posArr[i].sin,x2:appearance.x0+appearance.r0*posArr[i].cos,y2:appearance.y0+appearance.r0*posArr[i].sin,'stroke':'transparent','stroke-width':10});  
        if(oA.obj.url === '#'){
            var oCircle = createTag('circle',{'cx':posArr[i].x,'cy':posArr[i].y,'r':appearance.r,'fill':appearance.bg,'stroke':appearance.bordercolor,'stroke-width':appearance.strokeWidth2,'class':'frostedglass'});
        }else{
            var oCircle = createTag('circle',{'cx':posArr[i].x,'cy':posArr[i].y,'r':appearance.r,'fill':appearance.bg,'stroke':appearance.bordercolor,'stroke-width':appearance.strokeWidth1,'class':'frostedglass'});            
        }             

        var oText = createTag('text',{'x':posArr[i].x,'y':posArr[i].y,'font-size':appearance.fontSize,'text-anchor':'middle','dominant-baseline':'middle','stroke-width':appearance.strokeWidth1,fill:appearance.color});
        oText.innerHTML = children[i].text;  
        oG.appendChild(oLine);
        oG.appendChild(oLineHelper);            
        oG.appendChild(oCircle);                  
        oG.appendChild(oText);
        oA.appendChild(oG);
        oSvg.appendChild(oA);
        oA.onmouseenter = function(){
            elasticMove(this,appearance.r*1.2);
            var line = this.getElementsByTagName('line')[0];
            line.removeAttribute('stroke-dasharray');
            line.setAttribute('stroke-width',appearance.lineWidth*3);
            line.setAttribute('x1',appearance.x0+(appearance.dis - appearance.r0)*Math.cos(deg*this.index - randomRotate));
            line.setAttribute('y1',appearance.y0+(appearance.dis - appearance.r0)*Math.sin(deg*this.index - randomRotate));
        }
        oA.onmouseleave = function(){
            elasticMove(this,appearance.r);
            var line = this.getElementsByTagName('line')[0];
            line.setAttribute('stroke-width',appearance.lineWidth);
            line.setAttribute('stroke-dasharray',appearance.lineDashed);
            line.setAttribute('x1',appearance.x0+(appearance.dis - appearance.r)*Math.cos(deg*this.index - randomRotate));
            line.setAttribute('y1',appearance.y0+(appearance.dis - appearance.r)*Math.sin(deg*this.index - randomRotate));          
        } 
        oA.onclick = function(e){
            e = e || event;
            if(this.obj.url === '#'){
                e.preventDefault();
                oSvg.innerHTML = '';
                addCenterTag(this.obj);
                addChildenTags(this.obj.children);
                addBackTag();
            }
        }        
    }
}
function elasticMove(obj,str){
    var circle = obj.getElementsByTagName('circle')[0];
    var r0 = circle.getAttribute('r');
    var r = Number(str);
    //声明步长值
    var step = 0;
    //声明弹性距离
    var len = r - r0;
    //声明弹性系数
    var k = 0.7;
    //声明损耗系数
    var z= 0.7;
    //声明当前值
    var cur = r0;
    clearInterval(circle.timer);
    circle.timer = setInterval(function(){
        //获取当前值cur
        cur =  circle.getAttribute('r');
        //更新弹性距离
        len = r - cur;
        //弹力影响
        step += len*k;
        //阻力影响
        step = step*z;
        //赋值
        circle.setAttribute('r',Number(cur) + step);
        //当元素的步长值接近于0，并且弹性距离接近于0时，停止定时器
        if(Math.round(step) == 0 && Math.round(len) == 0){
            circle.setAttribute('r',r);
            clearInterval(circle.timer); 
        }    
    },30);
}
</script>    
```

<iframe style="width: 100%; height: 330px;" src="https://demo.xiaohuochai.site/js/svgapi/s1.html" frameborder="0" width="320" height="240"></iframe>