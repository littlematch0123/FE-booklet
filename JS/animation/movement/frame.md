# javascript帧动画 

&emsp;&emsp;帧动画就是在“连续的关键帧”中分解动画动作，也就是在时间轴的每帧上逐帧绘制不同的内容，使其连续播放而成的动画。由于是一帧一帧的画，所以帧动画具有非常大的灵活性，几乎可以表现任何想表现的内容。本文将详细介绍javascript帧动画

 

&nbsp;

### 概述
【分类】

&emsp;&emsp;常见的帧动画的方式有三种，包括gif、CSS3 animation和javascript

&emsp;&emsp;git和CSS3 animation不能灵活地控制动画的暂停和播放、不能对帧动画做更加灵活地扩展。另外，gif图不能捕捉动画完成的事件。所以，一般地，使用javascript来实现帧动画

【原理】

&emsp;&emsp;js实现帧动画有两种实现方式

&emsp;&emsp;1、如果有多张帧动画图片，可以用一个image标签去承载图片，定时改变image的src属性(不推荐)

&emsp;&emsp;2、把所有的动画关键帧都绘制在一张图片里，把图片作为元素的background-image，定时改变元素的background-position属性(推荐)

&emsp;&emsp;因为第一种方式需要使用多个HTTP请求，所以一般地推荐使用第二种方式

【实例】

&emsp;&emsp;下面是使用帧动画制作的一个实例

```
<div id="rabbit" style="width:102px;height:80px"></div> 
<button id="btn">暂停运动</button> 
<script>
var url = 'rabbit-big.png';
var positions = ['0,-854','-174 -852','-349 -852','-524 -852','-698 -852','-873 -848'];
var ele = document.getElementById('rabbit');
var oTimer = null;
btn.onclick = function(){
  if(btn.innerHTML == '开始运动'){
    frameAnimation(ele,positions,url);
    btn.innerHTML = '暂停运动';
  }else{
    clearTimeout(oTimer);
    btn.innerHTML = '开始运动';
  } 
}
frameAnimation(ele,positions,url);
function frameAnimation(ele,positions,url){
  ele.style.backgroundImage = 'url(' + url + ')';
  ele.style.backgroundRepeat = 'no-repeat'; 
  var index = 0;
  function run(){
    var pos = positions[index].split(' ');
    ele.style.backgroundPosition = pos[0] + 'px ' + pos[1] + 'px';
    index++;
    if(index >= positions.length){
      index = 0;
    }
    oTimer = setTimeout(run,80);
  }
  run();
}  
</script>
```

<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/js/move/frame/f1.html" frameborder="0" width="230" height="240"></iframe>
 

&nbsp;

### 通用帧动画

&emsp;&emsp;下面来设计一个通用的帧动画库

【需求分析】

&emsp;&emsp;1、支持图片预加载

&emsp;&emsp;2、支持两种动画播放方式，及自定义每帧动画

&emsp;&emsp;3、支持单组动画控制循环次数(可支持无限次)

&emsp;&emsp;4、支持一组动画完成，进行下一组动画

&emsp;&emsp;5、支持每个动画完成后有等待时间

&emsp;&emsp;6、支持动画暂停和继续播放

&emsp;&emsp;7、支持动画完成后执行回调函数

【编程接口】

&emsp;&emsp;1、loadImage(imglist)//预加载图片

&emsp;&emsp;2、changePosition(ele,positions,imageUrl)//通过改变元素的background-position实现动画

&emsp;&emsp;3、changeSrc(ele,imglist)//通过改变image元素的src

&emsp;&emsp;4、enterFrame(callback)//每一帧动画执行的函数，相当于用户可以自定义每一帧动画的callback

&emsp;&emsp;5、repeat(times)//动画重复执行的次数，times为空时表示无限次

&emsp;&emsp;6、repeatForever()//无限重复上一次动画，相当于repeat()

&emsp;&emsp;7、wait(time)//每个动画执行完成后等待的时间

&emsp;&emsp;8、then(callback)//动画执行完成后的回调函数

&emsp;&emsp;9、start(interval)//动画开始执行，interval表示动画执行的间隔

&emsp;&emsp;10、pause()//动画暂停

&emsp;&emsp;11、restart()//动画从上一交暂停处重新执行

&emsp;&emsp;12、dispose()//释放资源

【调用方式】

&emsp;&emsp;支持链式调用，用动词的方式描述接口

【代码设计】

&emsp;&emsp;1、把图片预加载 -> 动画执行 -> 动画结束等一系列操作看成一条任务链。任务链包括同步执行和异步定时执行两种任务

&emsp;&emsp;2、记录当前任务链的索引

&emsp;&emsp;3、每个任务执行完毕后，通过调用next方法，执行下一个任务，同时更新任务链索引值

![](https://pic.xiaohuochai.site/blog/js_frame2.png)

【接口定义】

```
'use strict';
/* 帧动画库类
 * @constructor
 */
function FrameAnimation(){}

/* 添加一个同步任务，去预加载图片
 * @param imglist 图片数组
 */
FrameAnimation.prototype.loadImage = function(imglist){}

/* 添加一个异步定时任务，通过定时改变图片背景位置，实现帧动画
 * @param ele dom对象
 * @param positions 背景位置数组
 * @param imageUrl 图片URL地址
 */
FrameAnimation.prototype.changePosition = function(ele,positions,imageUrl){}

/* 添加一个异步定时任务，通过定时改变image标签的src属性，实现帧动画
 * @param ele dom对象
 * @param imglist 图片数组
 */
FrameAnimation.prototype.changeSrc = function(ele,imglist){}

/* 添加一个异步定时任务，自定义动画每帧执行的任务函数
 * @param tastFn 自定义每帧执行的任务函数
 */
FrameAnimation.prototype.enterFrame = function(taskFn){}

/* 添加一个同步任务，在上一个任务完成后执行回调函数
 * @param callback 回调函数
 */
FrameAnimation.prototype.then = function(callback){}

/* 开始执行任务，异步定时任务执行的间隔
 * @param interval
 */
FrameAnimation.prototype.start = function(interval){}

/* 添加一个同步任务，回退到上一个任务，实现重复上一个任务的效果，可以定义重复的次数
 * @param times 重复次数
 */
FrameAnimation.prototype.repeat = function(times){}

/* 添加一个同步任务，相当于repeat()，无限循环上一次任务
 * 
 */
FrameAnimation.prototype.repeatForever = function(){}

/* 设置当前任务执行结束后到下一个任务开始前的等待时间
 * @param time 等待时长
 */
FrameAnimation.prototype.wait = function(time){}

/* 暂停当前异步定时任务
 * 
 */
FrameAnimation.prototype.pause = function(){}

/* 重新执行上一次暂停的异步定时任务
 * 
 */
FrameAnimation.prototype.restart = function(){}

/* 释放资源
 * 
 */
FrameAnimation.prototype.dispose = function(){}
```
 

&nbsp;

### 图片预加载

&emsp;&emsp;图片预加载是一个相对独立的功能，可以将其封装为一个模块imageloader.js

```
'use strict';
/**
 * 预加载图片函数
 * @param    images   加载图片的数组或者对象
 * @param    callback 全部图片加载完毕后调用的回调函数
 * @param    timeout  加载超时的时长
 */
function loadImage(images,callback,timeout){
  //加载完成图片的计数器
  var count = 0;
  //全部图片加载成功的标志位
  var success = true;
  //超时timer的id
  var timeoutId = 0;
  //是否加载超时的标志位
  var isTimeout = false;
  //对图片数组(或对象)进行遍历
  for(var key in images){
    //过滤prototype上的属性
    if(!images.hasOwnProperty(key)){
      continue;
    }
    //获得每个图片元素
    //期望格式是object:{src:xxx}
    var item = images[key];
    if(typeof item === 'string'){
      item = images[key] = {
        src:item
      };
    }
    //如果格式不满足期望，则丢弃此条数据，进行下一次遍历
    if(!item || !item.src){
      continue;
    }
    //计数+1
    count++;
    //设置图片元素的id
    item.id = '__img__' + key + getId();
    //设置图片元素的img，它是一个Image对象
    item.img = window[item.id] = new Image();
    doLoad(item);
  }
  //遍历完成如果计数为0，则直接调用callback
  if(!count){
    callback(success);
  }else if(timeout){
    timeoutId = setTimeout(onTimeout,timeout);
  }

  /**
   * 真正进行图片加载的函数
   * @param   item 图片元素对象
   */
  function doLoad(item){
    item.status = 'loading';
    var img = item.img;
    //定义图片加载成功的回调函数
    img.onload = function(){
      success = success && true;
      item.status = 'loaded';
      done();
    }
    //定义图片加载失败的回调函数
    img.onerror = function(){
      success = false;
      item.status = 'error';
      done();
    }
    //发起一个http(s)请求
    img.src = item.src;
    /**
     * 每张图片加载完成的回调函数
     */
    function done(){
      img.onload = img.onerror = null;
      try{
        delete window[item.id];
      }catch(e){

      }
      //每张图片加载完成，计数器减1，当所有图片加载完成，且没有超时的情况，清除超时计时器，且执行回调函数
      if(!--count && !isTimeout){
        clearTimeout(timeoutId);
        callback(success);
      }
    }
  }
  /**
   * 超时函数
   */
  function onTimeout(){
    isTimeout = true;
    callback(false);
  }
}
var __id = 0;
function getId(){
  return ++__id;
}
module.exports = loadImage;
```
 

&nbsp;

### 时间轴

&emsp;&emsp;在动画处理中，是通过迭代使用setTimeout()实现的，但是这个间隔时间并不准确。下面，来实现一个时间轴类timeline.js

```
'use strict';

var DEFAULT_INTERVAL = 1000/60;

//初始化状态
var STATE_INITIAL = 0;
//开始状态
var STATE_START = 1;
//停止状态
var STATE_STOP = 2;

var requestAnimationFrame = (function(){
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame|| window.mozRequestAnimationFrame || window.oRequestAnimationFrame  || function(callback){
          return window.setTimeout(callback,(callback.interval || DEFAULT_INTERVAL));
        }
})();

var cancelAnimationFrame = (function(){
  return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame   || function(id){
          return window.clearTimeout(id);
        }  
})();
/**
 * 时间轴类
 * @constructor
 */
function Timeline(){
  this.animationHandler = 0;
  this.state = STATE_INITIAL;
}
/**
 * 时间轴上每一次回调执行的函数
 * @param   time 从动画开始到当前执行的时间
 */
Timeline.prototype.onenterframe = function(time){

}
/**
 * 动画开始
 * @param interval 每一次回调的间隔时间
 */
Timeline.prototype.start = function(interval){
  if(this.state === STATE_START){
    return;
  }
  this.state = STATE_START;
  this.interval = interval || DEFAULT_INTERVAL;
  startTimeline(this,+new Date());
}

/**
 * 动画停止
 */
Timeline.prototype.stop = function(){
  if(this.state !== STATE_START){
    return;
  }
  this.state = STATE_STOP;
  //如果动画开始过，则记录动画从开始到现在所经历的时间
  if(this.startTime){
    this.dur = +new Date() - this.startTime;
  }
  cancelAnimationFrame(this.animationHandler);
}

/**
 * 重新开始动画
 */
Timeline.prototype.restart = function(){
  if(this.state === STATE_START){
    return;
  }
  if(!this.dur || !this.interval){
    return;
  }
  this.state = STATE_START;
  //无缝连接动画
  startTimeline(this,+new Date()-this.dur);
}

/**
 * 时间轴动画启动函数
 * @param   timeline  时间轴的实例
 * @param   startTime 动画开始时间戳          
 */
function startTimeline(timeline,startTime){
  //记录上一次回调的时间戳
  var lastTick = +new Date();
  timeline.startTime = startTime;
  nextTick.interval = timeline.interval;
  nextTick();
  /**
   * 每一帧执行的函数
   */
  function nextTick(){
    var now = +new Date();
    timeline.animationHandler = requestAnimationFrame(nextTick);
    //如果当前时间与上一次回调的时间戳大于设置的时间间隔，表示这一次可以执行回调函数
    if(now - lastTick >= timeline.interval){
      timeline.onenterframe(now - startTime);
      lastTick = now;
    }
  }
}
module.exports = Timeline;
```
 

&nbsp;

### 动画类实现

&emsp;&emsp;下面是动画类animation.js实现的完整代码

```
'use strict';

var loadImage = require('./imageloader');
var Timeline = require('./timeline');
//初始化状态
var STATE_INITIAL = 0;
//开始状态
var STATE_START = 1;
//停止状态
var STATE_STOP = 2;
//同步任务
var TASK_SYNC = 0;
//异步任务
var TASK_ASYNC = 1;

/**
 * 简单的函数封装，执行callback
 * @param   callback 执行函数
 */
function next(callback){
  callback && callback();
}
/* 帧动画库类
 * @constructor
 */
function FrameAnimation(){
  this.taskQueue = [];
  this.index = 0;
  this.timeline = new Timeline();
  this.state = STATE_INITIAL;
}

/* 添加一个同步任务，去预加载图片
 * @param imglist 图片数组
 */
FrameAnimation.prototype.loadImage = function(imglist){
  var taskFn = function(next){
    loadImage(imglist.slice(),next);
  };
  var type = TASK_SYNC;
  return this._add(taskFn,type);
}

/* 添加一个异步定时任务，通过定时改变图片背景位置，实现帧动画
 * @param ele dom对象
 * @param positions 背景位置数组
 * @param imageUrl 图片URL地址
 */
FrameAnimation.prototype.changePosition = function(ele,positions,imageUrl){
  var len = positions.length;
  var taskFn;
  var type;
  if(len){
    var me = this;
    taskFn = function(next,time){
      if(imageUrl){
        ele.style.backgroundImage = 'url(' + imageUrl + ')';
      }
      //获得当前背景图片位置索引
      var index = Math.min(time/me.interval|0,len);
      var position = positions[index-1].split(' ');
      //改变dom对象的背景图片位置
      ele.style.backgroundPosition = position[0] + 'px ' + position[1] + 'px';
      if(index === len){
        next();
      }
    }
    type = TASK_ASYNC;
  }else{
    taskFn = next;
    type = TASK_SYNC;
  }
  return this._add(taskFn,type);
}

/* 添加一个异步定时任务，通过定时改变image标签的src属性，实现帧动画
 * @param ele dom对象
 * @param imglist 图片数组
 */
FrameAnimation.prototype.changeSrc = function(ele,imglist){
  var len = imglist.length;
  var taskFn;
  var type;
  if(len){
    var me = this;
    taskFn = function(next,time){
      //获得当前背景图片位置索引
      var index = Math.min(time/me.interval|0,len);
      //改变image对象的背景图片位置
      ele.src = imglist[index-1];
      if(index === len){
        next();
      }
    }
    type = TASK_ASYNC;
  }else{
    taskFn = next;
    type = TASK_SYNC;
  }
  return this._add(taskFn,type);  
}

/* 添加一个异步定时任务，自定义动画每帧执行的任务函数
 * @param tastFn 自定义每帧执行的任务函数
 */
FrameAnimation.prototype.enterFrame = function(taskFn){
  return this._add(taskFn,TASK_ASYNC);
}

/* 添加一个同步任务，在上一个任务完成后执行回调函数
 * @param callback 回调函数
 */
FrameAnimation.prototype.then = function(callback){
  var taskFn = function(next){
    callback(this);
    next();
  };
  var type  = TASK_SYNC;
  return this._add(taskFn,type);
}

/* 开始执行任务，异步定义任务执行的间隔
 * @param interval
 */
FrameAnimation.prototype.start = function(interval){
  if(this.state === STATE_START){
    return this; 
  }
  //如果任务链中没有任务，则返回
  if(!this.taskQueue.length){
    return this;
  }
  this.state = STATE_START;
  this.interval = interval;
  this._runTask();
  return this;
    
}

/* 添加一个同步任务，回退到上一个任务，实现重复上一个任务的效果，可以定义重复的次数
 * @param times 重复次数
 */
FrameAnimation.prototype.repeat = function(times){
  var me = this;
  var taskFn = function(){
    if(typeof times === 'undefined'){
      //无限回退到上一个任务
      me.index--;
      me._runTask();
      return;
    }
    if(times){
      times--;
      //回退
      me.index--;
      me._runTask();
    }else{
      //达到重复次数，跳转到下一个任务
      var task = me.taskQueue[me.index];
      me._next(task);
    }
  }
  var type = TASK_SYNC;
  return this._add(taskFn,type);
}

/* 添加一个同步任务，相当于repeat()，无限循环上一次任务
 * 
 */
FrameAnimation.prototype.repeatForever = function(){
  return this.repeat();
}

/* 设置当前任务执行结束后到下一个任务开始前的等待时间
 * @param time 等待时长
 */
FrameAnimation.prototype.wait = function(time){
  if(this.taskQueue && this.taskQueue.length > 0){
    this.taskQueue[this.taskQueue.length - 1].wait = time;
  }
  return this;
}

/* 暂停当前异步定时任务
 * 
 */
FrameAnimation.prototype.pause = function(){
  if(this.state === STATE_START){
    this.state = STATE_STOP;
    this.timeline.stop();
    return this;
  }
  return this;
}

/* 重新执行上一次暂停的异步定时任务
 * 
 */
FrameAnimation.prototype.restart = function(){
  if(this.state === STATE_STOP){
    this.state = STATE_START;
    this.timeline.restart();
    return this;
  }
  return this;  
}

/* 释放资源
 * 
 */
FrameAnimation.prototype.dispose = function(){
  if(this.state !== STATE_INITIAL){
    this.state = STATE_INITIAL;
    this.taskQueue = null;
    this.timeline.stop();
    this.timeline = null;
    return this;
  }
  return this;    
}

/**
 * 添加一个任务到任务队列
 * @param taskFn 任务方法
 * @param type   任务类型
 * @private
 */
FrameAnimation.prototype._add = function(taskFn,type){
  this.taskQueue.push({
    taskFn:taskFn,
    type:type
  });
  return this;
}

/**
 * 执行任务
 * @private
 */
FrameAnimation.prototype._runTask = function(){
  if(!this.taskQueue || this.state !== STATE_START){
    return;
  }
  //任务执行完毕
  if(this.index === this.taskQueue.length){
    this.dispose();
    return;
  }
  //获得任务链上的当前任务
  var task = this.taskQueue[this.index];
  if(task.type === TASK_SYNC){
    this._syncTask(task);
  }else{
    this._asyncTask(task);
  }
}

/**
 * 同步任务
 * @param  task 执行的任务对象
 * @private
 */
FrameAnimation.prototype._syncTask = function(task){
  var me = this;
  var next = function(){
    //切换到下一个任务
    me._next(task);
  }
  var taskFn = task.taskFn;
  taskFn(next);
}

/**
 * 异步任务
 * @param  task 执行的任务对象
 * @private
 */
FrameAnimation.prototype._asyncTask = function(task){
  var me = this;
  //定义每一帧执行的回调函数
  var enterframe = function(time){
    var taskFn = task.taskFn;
    var next = function(){
      //停止当前任务
      me.timeline.stop();
      //执行下一个任务
      me._next(task);
    };
    taskFn(next,time);
  }
  this.timeline.onenterframe = enterframe;
  this.timeline.start(this.interval);
}

/**
 * 切换到下一个任务，支持如果当前任务需要等待，则延时执行
 * @private
 */
FrameAnimation.prototype._next = function(task){
  this.index++;
  var me = this;
  task.wait ? setTimeout(function(){
    me._runTask();
  },task.wait) :  this._runTask();
}

module.exports = function(){
&emsp;&emsp;return new FrameAnimation();
}
```
 

&nbsp;

### webpack配置

&emsp;&emsp;由于animation帧动画库的制作中应用了AMD模块规范，但由于浏览器层面不支持，需要使用webpack进行模块化管理，将animation.js、imageloader.js和timeline.js打包为一个文件

```
module.exports = {
  entry:{
    animation:"./src/animation.js"
  },
  output:{
    path:__dirname + "/build",
    filename:"[name].js",
    library:"animation",
    libraryTarget:"umd",
  }
}
```
&emsp;&emsp;下面是一个代码实例，通过创建的帧动画库实现博客开始的动画效果

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
<div id="rabbit" style="width:102px;height:80px;background-repeat:no-repeat"></div> 
<script src="../build/animation.js"></script> 
<script>var imgUrl = 'rabbit-big.png';
var positions = ['0,-854','-174 -852','-349 -852','-524 -852','-698 -852','-873 -848'];
var ele = document.getElementById('rabbit');
var animation = window.animation;
var repeatAnimation = animation().loadImage([imgUrl]).changePosition(ele,positions,imgUrl).repeatForever();
repeatAnimation.start(80); 
</script>
</body>
</html>
```
<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/js/move/frame/f2.html" frameborder="0" width="230" height="240"></iframe>

 

&nbsp;

### 更多实例

&emsp;&emsp;除了可以实现兔子推车的效果，还可以使用帧动画实现兔子胜利和兔子失败的效果

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Document</title>
<style>
div{position:absolute;width:102px;height:80px;background-repeat:no-repeat;}  
</style>
</head>
<body>
<div id="rabbit1" style="left:10px;top:50px;"></div>
<div id="rabbit2" style="left:120px;top:50px;"></div>
<div id="rabbit3" style="left:230px;top:50px;"></div> 
<script type="text/javascript" src="http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/animation.js"></script>
<script>
var baseUrl = 'http://7xpdkf.com1.z0.glb.clouddn.com/runjs/img/';
var images = ['rabbit-big.png','rabbit-lose.png','rabbit-win.png'];
for(var i = 0; i < images.length; i++){
  images[i] = baseUrl + images[i];
}
var rightRunningMap = ["0 -854", "-174 -852", "-349 -852", "-524 -852", "-698 -851", "-873 -848"];
var leftRunningMap = ["0 -373", "-175 -376", "-350 -377", "-524 -377", "-699 -377", "-873 -379"];
var rabbitWinMap = ["0 0", "-198 0", "-401 0", "-609 0", "-816 0", "0 -96", "-208 -97", "-415 -97", "-623 -97", "-831 -97", "0 -203", "-207 -203", "-415 -203", "-623 -203", "-831 -203", "0 -307", "-206 -307", "-414 -307", "-623 -307"];
var rabbitLoseMap = ["0 0", "-163 0", "-327 0", "-491 0", "-655 0", "-819 0", "0 -135", "-166 -135", "-333 -135", "-500 -135", "-668 -135", "-835 -135", "0 -262"];

var animation = window.animation;
function repeat(){
  var repeatAnimation = animation().loadImage(images).changePosition(rabbit1, rightRunningMap, images[0]).repeatForever();
  repeatAnimation.start(80); 
}
function win() {
  var winAnimation = animation().loadImage(images).changePosition(rabbit2, rabbitWinMap, images[2]).repeatForever();
  winAnimation.start(200);
}
function lose() {
  var loseAnimation = animation().loadImage(images).changePosition(rabbit3, rabbitLoseMap, images[1]).repeatForever();
  loseAnimation.start(200);
}
repeat();
win();
lose();
</script>
</body>
</html>
```
<iframe style="width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/js/move/frame/f3.html" frameborder="0" width="230" height="240"></iframe>