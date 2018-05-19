# Bootstrap进度条

&emsp;&emsp;在网页中，进度条的效果并不少见，比如一个评分系统，比如加载状态等，通过简单、灵活的进度条，可以为当前工作流程或动作提供实时反馈。本文将详细介绍Bootstrap进度条

&nbsp;

### 基本样式

&emsp;&emsp;Bootstrap框架中对于进度条提供了一个基本样式，一个100%宽度的背景色，然后一个高亮的颜色表示完成进度。其实制作这样的进度条非常容易，一般是使用两个容器，外容器具有一定的宽度，并且设置一个背景颜色，子元素设置一个宽度，比如完成度是30%（也就是父容器的宽度比例值），同时给其设置一个高亮的背景色

&emsp;&emsp;Bootstrap框架中也是按这样的方式实现的，它提供了两个容器，外容器使用&ldquo;progress&rdquo;样式，子容器使用&ldquo;progress-bar&rdquo;样式。其中progress用来设置进度条的容器样式，而progress-bar用于限制进度条的进度

<div>
<pre>.progress {
  height: 20px;
  margin-bottom: 20px;
  overflow: hidden;
  background-color: #f5f5f5;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
}
.progress-bar {
  float: left;
  width: 0;
  height: 100%;
  font-size: 12px;
  line-height: 20px;
  color: #fff;
  text-align: center;
  background-color: #428bca;
  -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .15);
          box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .15);
  -webkit-transition: width .6s ease;
          transition: width .6s ease;
}</pre>
</div>
<div>
<pre>&lt;div class="progress"&gt;
       &lt;div class="progress-bar" style="width:40%"&gt;&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

&emsp;&emsp;无障碍性更好的写法如下

<div>
<pre>&lt;div class="progress"&gt;
    &lt;div class="progress-bar" style="width:40%;" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"&gt;
        &lt;span class="sr-only"&gt;40% Complete&lt;/span&gt;
    &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

&emsp;&emsp;role属性告诉搜索引擎这个div的作用是进度条；aria-valuenow="40"属性告知当前进度条的进度为40%；aria-valuemin="0"属性告知进度条的最小值为0%；aria-valuemax="100"属性告知进度条的最大值为100%

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/bootstrap/progress/p1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 彩色进度条

&emsp;&emsp;Bootstrap框架中的进度条和[警告信息框](http://www.cnblogs.com/xiaohuochai/p/7120087.html)一样，为了能给用户一个更好的体验，也根据不同的状态配置了不同的进度条颜色。在此称为彩色进度条，其主要包括以下四种：

&emsp;&emsp;☑&nbsp;progress-bar-info：表示信息进度条，进度条颜色为蓝色

&emsp;&emsp;☑&nbsp;progress-bar-success：表示成功进度条，进度条颜色为绿色

&emsp;&emsp;☑&nbsp;progress-bar-warning：表示警告进度条，进度条颜色为黄色

&emsp;&emsp;☑&nbsp;progress-bar-danger：表示错误进度条，进度条颜色为红色

&emsp;&emsp;具体使用非常简单，只需要在基础的进度上增加对应的类名即可，彩色进度条与基本进度条相比，就是进度条颜色做了一定的变化

<div>
<pre>.progress-bar-success {
  background-color: #5cb85c;
}
.progress-bar-info {
  background-color: #5bc0de;
}
.progress-bar-warning {
  background-color: #f0ad4e;
}
.progress-bar-danger {
  background-color: #d9534f;
}</pre>
</div>
<div>
<pre>&lt;div class="progress"&gt;
    &lt;div class="progress-bar progress-bar-success" style="width:40%"&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;div class="progress"&gt;
    &lt;div class="progress-bar progress-bar-info" style="width:60%"&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;div class="progress"&gt;
    &lt;div class="progress-bar progress-bar-warning" style="width:80%"&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;div class="progress"&gt;
    &lt;div class="progress-bar progress-bar-danger" style="width:50%"&gt;&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 190px;" src="https://demo.xiaohuochai.site/bootstrap/progress/p2.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 条纹进度条

&emsp;&emsp;在Bootstrap框架中除了提供了彩色进度条之外，还提供了一种条纹进度条，这种条纹进度条采用CSS3的线性渐变来实现，并未借助任何图片。使用Bootstrap框架中的条纹进度条只需要在进度条的容器&ldquo;progress&rdquo;基础上增加类名&ldquo;progress-striped&rdquo;，当然，如果要让进度条条纹像彩色进度一样，具有彩色效果，只需要在进度条上增加相应的颜色类名

&emsp;&emsp;注意：通过渐变可以为进度条创建条纹效果，IE9-浏览器不支持

<div>
<pre>.progress-striped .progress-bar {
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
  background-image:linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
  background-size: 40px 40px;
}</pre>
</div>
<div>
<pre>.progress-striped .progress-bar-success {
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
  background-image:linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
}
.progress-striped .progress-bar-info {
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
  background-image:linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
}
.progress-striped .progress-bar-warning {
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
  background-image:linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
}
.progress-striped .progress-bar-danger {
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
  background-image:linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
}</pre>
</div>
<div>
<pre>&lt;div class="progress progress-striped"&gt;
    &lt;div class="progress-bar" style="width:70%"&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;div class="progress progress-striped"&gt;
    &lt;div class="progress-bar progress-bar-success" style="width:40%"&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;div class="progress progress-striped"&gt;
    &lt;div class="progress-bar progress-bar-info" style="width:60%"&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;div class="progress progress-striped"&gt;
    &lt;div class="progress-bar progress-bar-warning" style="width:80%"&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;div class="progress progress-striped"&gt;
    &lt;div class="progress-bar progress-bar-danger" style="width:50%"&gt;&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 230px;" src="https://demo.xiaohuochai.site/bootstrap/progress/p3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 动态条纹

&emsp;&emsp;为了让条纹进度条动起来，Bootstrap框架还提供了一种动态条纹进度条。其实现原理主要通过CSS3的animation来完成。首先通过@keyframes创建了一个progress-bar-stripes的动画，这个动画主要做了一件事，就是改变背景图像的位置，也就是background-position的值。因为条纹进度条是通过CSS3的线性渐变来制作的，而linear-gradient实现的正是对应背景中的背景图片

&emsp;&emsp;注意：IE9-浏览器不支持

<div>
<pre>@-webkit-keyframes progress-bar-stripes {
  from {
    background-position: 40px 0;
  }
  to {
    background-position: 0 0;
  }
}
@keyframes progress-bar-stripes {
  from {
    background-position: 40px 0;
  }
  to {
    background-position: 0 0;
  }
}</pre>
</div>

&emsp;&emsp;在Bootstrap框架中，通过给进度条容器&ldquo;progress&rdquo;添加一个类名&ldquo;active&rdquo;，并让文档加载完成就触&ldquo;progress-bar-stripes&rdquo;动画生效，使其呈现出由右向左运动的动画效果

<div>
<pre>.progress.active .progress-bar {
  -webkit-animation: progress-bar-stripes 2s linear infinite;
          animation: progress-bar-stripes 2s linear infinite;
}</pre>
</div>
<div>
<pre>&lt;div class="progress progress-striped active"&gt;
    &lt;div class="progress-bar" style="width:70%"&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;div class="progress progress-striped active"&gt;
    &lt;div class="progress-bar progress-bar-success" style="width:40%"&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;div class="progress progress-striped active"&gt;
    &lt;div class="progress-bar progress-bar-info" style="width:60%"&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;div class="progress progress-striped active"&gt;
    &lt;div class="progress-bar progress-bar-warning" style="width:80%"&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;div class="progress progress-striped active"&gt;
    &lt;div class="progress-bar progress-bar-danger" style="width:50%"&gt;&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 230px;" src="https://demo.xiaohuochai.site/bootstrap/progress/p4.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 层叠进度条

&emsp;&emsp;Bootstrap框架除了提供上述几种进度条之外，还提供了一种层叠进度条。层叠进度条可以将不同状态的进度条放置在一起，按水平方式排列

&emsp;&emsp;把多个进度条放入同一个&nbsp;`.progress`&nbsp;中，使它们呈现堆叠的效果

<div>
<pre>&lt;div class="progress"&gt;
  &lt;div class="progress-bar progress-bar-success" style="width: 35%"&gt;
    &lt;span class="sr-only"&gt;35% Complete (success)&lt;/span&gt;
  &lt;/div&gt;
  &lt;div class="progress-bar progress-bar-warning progress-bar-striped" style="width: 20%"&gt;
    &lt;span class="sr-only"&gt;20% Complete (warning)&lt;/span&gt;
  &lt;/div&gt;
  &lt;div class="progress-bar progress-bar-danger" style="width: 10%"&gt;
    &lt;span class="sr-only"&gt;10% Complete (danger)&lt;/span&gt;
  &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/bootstrap/progress/p5.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;注意：层叠的进度条之和不能大于100%

<div>
<pre>&lt;div class="progress"&gt;
  &lt;div class="progress-bar progress-bar-success" style="width: 30%"&gt;&lt;/div&gt;
  &lt;div class="progress-bar progress-bar-warning progress-bar-striped" style="width: 40%"&gt;&lt;/div&gt;
  &lt;div class="progress-bar progress-bar-danger" style="width: 40%"&gt;&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/bootstrap/progress/p6.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 提示标签

&emsp;&emsp;在实际开发中，有很多时候是需要在进度条中直接用相关的数值向用户传递完成的进度值，Bootstrap考虑了这种使用场景，只需要在进度条中添加需要的值

<div>
<pre>&lt;div class="progress"&gt;
    &lt;div class="progress-bar"  role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width:20%"&gt;20%&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/bootstrap/progress/p7.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;在展示很低的百分比时，如果需要让文本提示能够清晰可见，可以为进度条设置&nbsp;`min-width`&nbsp;属性&nbsp;

<div>
<pre>&lt;div class="progress"&gt;
    &lt;div class="progress-bar"  role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width:0%"&gt;0%&lt;/div&gt;
&lt;/div&gt;
&lt;div class="progress"&gt;
    &lt;div class="progress-bar"  role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="min-width: 2em;"&gt;0%&lt;/div&gt;
&lt;/div&gt;
&lt;div class="progress"&gt;
    &lt;div class="progress-bar"  role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width:1%"&gt;1%&lt;/div&gt;
&lt;/div&gt;
&lt;div class="progress"&gt;
    &lt;div class="progress-bar"  role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="min-width: 2em;"&gt;1%&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 190px;" src="https://demo.xiaohuochai.site/bootstrap/progress/p8.html" frameborder="0" width="320" height="240"></iframe>

