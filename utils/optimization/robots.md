# 爬虫协议robots

&emsp;&emsp;Robots协议(也称为爬虫协议、机器人协议等)全称是“网络爬虫排除标准”(Robots Exclusion Protocol)，网站通过Robots协议告诉搜索引擎哪些页面可以抓取，哪些页面不能抓取。本文将详细介绍爬虫协议robots

 

&nbsp;

### 概述

&emsp;&emsp;robots.txt文件是一个文本文件，是搜索引擎中访问网站的时候要查看的第一个文件。robots.txt文件告诉蜘蛛程序在服务器上什么文件是可以被查看的

&emsp;&emsp;当一个搜索蜘蛛访问一个站点时，它会首先检查该站点根目录下是否存在robots.txt，如果存在，搜索机器人就会按照该文件中的内容来确定访问的范围；如果该文件不存在，所有的搜索蜘蛛将能够访问网站上所有没有被口令保护的页面

【原则】

&emsp;&emsp;Robots协议是国际互联网界通行的道德规范，基于以下原则建立：

&emsp;&emsp;1、搜索技术应服务于人类，同时尊重信息提供者的意愿，并维护其隐私权；

&emsp;&emsp;2、网站有义务保护其使用者的个人信息和隐私不被侵犯

&emsp;&emsp;注意:`robots.txt`必须放置在一个站点的根目录下，而且文件名必须全部小写

 

&nbsp;

### 写法

【User-agent】

&emsp;&emsp;下面代码中`*`代表的所有的搜索引擎种类，`*`是一个通配符，表示所有的搜索机器人
```
User-agent: * 
```
&emsp;&emsp;下面代码表示百度的搜索机器人
```
User-agent: Baiduspider
```
【Disallow】

&emsp;&emsp;下面代码表示禁止爬寻admin目录下面的目录
```
Disallow: /admin/
```
&emsp;&emsp;下面代码表示禁止抓取网页所有的.jpg格式的图片
```
Disallow: /.jpg$
```
&emsp;&emsp;下面代码表示禁止爬取ab文件夹下面的adc.html文件
```
Disallow:/ab/adc.html 
```
&emsp;&emsp;下面代码表示禁止访问网站中所有包含问号 (?) 的网址
```
Disallow: /*?* 
```
&emsp;&emsp;下面代码表示禁止访问网站中所有页面
```
Disallow: /
```
【Allow】

&emsp;&emsp;下面代码表示允许访问以".html"为后缀的URL
```
Allow: .html$
```
&emsp;&emsp;下面代码表示允许爬寻tmp的整个目录
```
Allow: /tmp
```
 

&nbsp;

### 用法

&emsp;&emsp;下面代码表示允许所有的robot访问网站所有的页面
```
User-agent: *
Allow:　/
```
&emsp;&emsp;下面代码表示禁止所有搜索引擎访问网站的任何部分
```
User-agent: *
Disallow: /
```
&emsp;&emsp;下面代码表示禁止百度的机器人访问其网站下其所有的目录
```
User-agent: Baiduspider
Disallow: /
```
&emsp;&emsp;下面代码表示禁止所有搜索引擎访问网站的cgi-bin、tmp、~joe这三个目录下的文件
```
User-agent: *
Disallow: /cgi-bin/
Disallow: /tmp/
Disallow: /~joe/
```

&nbsp;

### 误区

&emsp;&emsp;【误区一】：网站上的所有文件都需要蜘蛛抓取，那就没必要在添加robots.txt文件了。反正如果该文件不存在，所有的搜索蜘蛛将默认能够访问网站上所有没有被口令保护的页面

&emsp;&emsp;每当用户试图访问某个不存在的URL时，服务器都会在日志中记录404错误（无法找到文件）。每当搜索蜘蛛来寻找并不存在的robots.txt文件时，服务器也将在日志中记录一条404错误，所以应该在网站中添加一个robots.txt

&emsp;&emsp;【误区二】：在robots.txt文件中设置所有的文件都可以被搜索蜘蛛抓取，这样可以增加网站的收录率

&emsp;&emsp;网站中的程序脚本、样式表等文件即使被蜘蛛收录，也不会增加网站的收录率，还只会浪费服务器资源。因此必须在robots.txt文件里设置不要让搜索蜘蛛索引这些文件

 