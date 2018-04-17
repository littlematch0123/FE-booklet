# HTML条件注释

&emsp;&emsp;IE条件注释是微软从IE5开始就提供的一种非标准逻辑语句，作用是可以灵活的为不同IE版本浏览器导入不同html元素。很显然这种方法的最大好处就在于属于微软官方给出的兼容解决办法而且还能通过W3C的效验

&nbsp;

### 识别IE

&emsp;&emsp;因为从IE10开始，IE浏览器已经不再支持条件注释。所以下面的写法，只能识别IE9-浏览器

&emsp;&emsp;注意：两个--和左中括号[之间不能有空格，否则无效

```
<!--[if IE]>
<div class="box" id="box"></div>
<![endif]-->
```

&nbsp;

### 识别单一IE

```
6    [if IE 6]
7    [if IE 7]
8    [if IE 8]
9    [if IE 9]
```
```
<!--[if IE 7]>
<div class="box" id="box"></div>
<![endif]-->
```

&nbsp;

### 识别范围IE

```
gt        　大于(greater than)
gte     　　大于等于(greater than or equal)
lt          小于(less than)
lte         小于等于(less than or equal) 
```
```
<!--[if lte IE 7]>
<div class="box" id="box"></div>
<![endif]-->
```

&nbsp;

### 识别非IE

&emsp;&emsp;实际上识别的是IE10+浏览器和其他非IE浏览器

```
<!--[if !IE]>
<div class="box" id="box"></div>
<![endif]-->
```
