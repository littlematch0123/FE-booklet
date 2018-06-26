# 网站相关人员信息记录humans.txt

&emsp;&emsp;robots.txt文件告诉搜索引擎哪些页面可以抓取，哪些页面不能抓取。而humans.txt文件则是为人类准备的，包含参加该网页设计和建立的相关人员的信息。本文将详细介绍humans.txt

 

&nbsp;

### 概述

&emsp;&emsp;humans是一个TXT文件，其中包含参加该网页设计和建立的人们的信息。TXT是一种快速和容易建立的档案格式， 而且不是一种有侵扰性的格式，以这种方式可以从外部快速便利、经济实惠的显示证明网站的制作人员

&emsp;&emsp;可以使用meta标签来标识网站的制作人员
```
<meta name="author" content="littlematch">
```
&emsp;&emsp;但，更好的方式是在项目根目录建立humans.txt来记录更详细的信息，可以在网站上 `<head>` 部分引用以下文件链接：
```
<link rel="author" href="humans.txt" />
```
 

&nbsp;

### 语法

&emsp;&emsp;1、为了保持一个基本的视觉结​​构，将 humans 团队成员资料与网站数据信息用`/*TEAM*/``/*SITE*/`分开

&emsp;&emsp;2、输入每个 human 项目团队成员资料：职位，姓名，联系信息，地理位置，... ...（为避免垃圾邮件，电子账户邮件您可采用`[at]`，避免使用`@`。）

&emsp;&emsp;3、输入关于网站的信息，比如最近更新`（年 /月 /天）`，主要语言，Doctype及所采用的开发工具等数据

 

&nbsp;

### 实例

```
/* TEAM */
开发人员：小火柴
网站： webhuochai.com
电子邮件: 121631835@qq.com

/* SITE */
最后更新: 2017/07/13
语言： HTML5、CSS3、javascript
```
 
