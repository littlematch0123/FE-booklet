# 使用chrome开发者工具中的network面板测量网站网络性能

&emsp;&emsp;Chrome 开发者工具是一套内置于Google Chrome中的Web开发和调试工具，可用来对网站进行迭代、调试和分析。使用 Network 面板测量网站网络性能。本文将详细介绍chrome开发者工具中网络面板network的使用

 

&nbsp;

### 概述

【打开方式】

&emsp;&emsp;打开方式有以下三种

&emsp;&emsp;1、在Chrome菜单中选择 更多工具 > 开发者工具

&emsp;&emsp;2、在页面元素上右键点击，选择 “检查”

&emsp;&emsp;3、使用 快捷键 `Ctrl+Shift+I` (Windows) 或 `Cmd+Opt+I` (Mac)

 【作用】

&emsp;&emsp;Network 面板记录页面上每个网络操作的相关信息，包括详细的耗时数据、HTTP 请求与响应标头和 Cookie等等

&emsp;&emsp;它有如下作用

&emsp;&emsp;1、使用 Network 面板记录和分析网络活动

&emsp;&emsp;2、整体或单独查看资源的加载信息

&emsp;&emsp;3、过滤和排序资源的显示方式

&emsp;&emsp;4、保存、复制和清除网络记录

&emsp;&emsp;5、根据需求自定义 Network 面板

【组成】

&emsp;&emsp;Network 面板由五个窗格组成：

&emsp;&emsp;1、Controls。使用这些选项可以控制 Network 面板的外观和功能

&emsp;&emsp;2、Filters。 使用这些选项可以控制在 Requests Table 中显示哪些资源。提示：按住 Cmd (Mac) 或 Ctrl(Windows/Linux) 并点击过滤器可以同时选择多个过滤器

&emsp;&emsp;3、Overview。 此图表显示了资源检索时间的时间线。如果看到多条竖线堆叠在一起，则说明这些资源被同时检索

&emsp;&emsp;4、Requests Table。 此表格列出了检索的每一个资源。 默认情况下，此表格按时间顺序排序，最早的资源在顶部。点击资源的名称可以显示更多信息。 提示：右键点击 Timeline 以外的任何一个表格标题可以添加或移除信息列

&emsp;&emsp;5、Summary。 此窗格列出了请求总数、传输的数据量和加载时间

![](https://pic.xiaohuochai.site/blog/panes.png)


&emsp;&emsp;默认情况下，Requests Table 会显示以下列。可以在表头栏上点击右键来添加和移除列

```
Name。资源的名称。
Status。HTTP 状态代码。
Type。已请求资源的 MIME 类型。
Initiator。发起请求的对象或进程。值为以下选项之一：
    Parser。Chrome 的 HTML 解析器发起请求。
    Redirect。HTTP 重定向发起请求。
    Script。脚本发起请求。
    Other。某些其他进程或操作发起请求，例如用户通过链接或者在地址栏中输入网址导航到页面。
Size。响应标头（通常为数百字节）加响应正文（由服务器提供）的组合大小。
Time。从请求开始至在响应中接收到最终字节的总持续时间。
Timeline。Timeline 列可以显示所有网络请求的可视瀑布。 点击此列的标题可以显示一个包含更多排序字段的菜单。
```
【记录】

&emsp;&emsp;在 Network 面板打开时，DevTools 在默认情况下会记录所有网络活动。 要记录活动，只需在面板打开时重新加载页面，或者等待当前加载页面上的网络活动

&emsp;&emsp;可以通过 record 按钮指示 DevTools 是否记录。 显示红色表明 DevTools 正在记录。 显示灰色 表明 DevTools 未在记录。 点击此按钮可以开始或停止记录，也可以按键盘快捷键 Cmd/Ctrl+e

【幻灯片】

&emsp;&emsp;Network 面板可以在页面加载期间捕捉屏幕截图。此功能称为幻灯片。点击摄影机图标可以启用幻灯片。图标为灰色时，幻灯片处于停用状态。如果图标为蓝色，则说明已启用。重新加载页面可以捕捉屏幕截图。屏幕截图显示在概览上方

&emsp;&emsp;将鼠标悬停在一个屏幕截图上时，Timeline 将显示一条黄色竖线，指示帧的捕捉时间

![timeline](https://pic.xiaohuochai.site/blog/filmstrip-timeline-overlay.png)

&emsp;&emsp;双击屏幕截图可查看放大版本。在屏幕截图处于放大状态时，使用键盘的向左和向右箭头可以在屏幕截图之间导航

 

&nbsp;

### 事件

&emsp;&emsp;Network 面板突出显示两种事件：DOMContentLoaded 和 load。 解析页面的初始标记时会触发 DOMContentLoaded。 此事件将在 Network 面板上的两个地方显示：

&emsp;&emsp;1、Overview 窗格中的蓝色竖线表示事件；

&emsp;&emsp;2、在 Summary 窗格中，可以看到事件的确切时间

![dom](https://pic.xiaohuochai.site/blog/domcontentloaded.png)

&emsp;&emsp;页面完全加载时将触发 load。此事件显示在三个地方：

&emsp;&emsp;1、Overview 窗格中的红色竖线表示事件

&emsp;&emsp;2、Requests Table 中的红色竖线也表示事件

&emsp;&emsp;3、在 Summary 窗格中，可以看到事件的确切时间

![load](https://pic.xiaohuochai.site/blog/load.png)

 

&nbsp;

### 详细信息

&emsp;&emsp;点击资源名称（位于 Requests Table 的 Name 列下）可以查看与该资源有关的更多信息

&emsp;&emsp;可用标签会因所选择资源类型的不同而不同，但下面四个标签最常见：
```
Headers。与资源关联的 HTTP 标头。
Preview。JSON、图像和文本资源的预览。
Response。HTTP 响应数据（如果存在）。
Timing。资源请求生命周期的精细分解
```
【网络耗时】

&emsp;&emsp;点击 Timing 标签可以查看单个资源请求生命周期的精细分解。

&emsp;&emsp;生命周期按照以下类别显示花费的时间：

```
Queuing
Stalled
如果适用：DNS lookup、initial connection、SSL handshake
Request sent
Waiting (TTFB)
Content Download
```
![time](https://pic.xiaohuochai.site/blog/timing-tab.png)

&emsp;&emsp;将鼠标悬停到 Timeline 图表内的资源上时，您也可以看到相同的信息

【查看HTTP标头】

&emsp;&emsp;点击 Headers 可以显示该资源的标头。

&emsp;&emsp;Headers 标签可以显示资源的请求网址、HTTP 方法以及响应状态代码。 此外，该标签还会列出 HTTP 响应和请求标头、它们的值以及任何查询字符串参数

&emsp;&emsp;点击每一部分旁边的 view source 或 view parsed 链接，您能够以源格式或者解析格式查看响应标头、请求标头或者查询字符串参数

【预览资源】

&emsp;&emsp;点击 Preview 标签可以查看该资源的预览。Preview 标签可能显示一些有用的信息，也可能不显示，具体取决于所选择资源的类型

【查看 HTTP 响应内容】

&emsp;&emsp;点击 Response 标签可以查看资源未格式化的 HTTP 响应内容。 Preview 标签可能包含一些有用的信息，也可能不包含，具体取决于所选择资源的类型

 

&nbsp;

### 生命周期

&emsp;&emsp;所有网络请求都被视为资源。通过网络对它们进行检索时，资源具有不同生命周期，以 Resource Timing 表示。Resource Timing API 提供了与接收各个资源的时间有关的大量详细信息。请求生命周期的主要阶段包括：

```
1、重定向
    立即开始 startTime。
    如果正在发生重定向，redirectStart 也会开始。
    如果重定向在本阶段末发生，将采集 redirectEnd。
2、应用缓存
    如果是应用缓存在实现请求，将采集 fetchStart 时间。
3、DNS
    domainLookupStart 时间在 DNS 请求开始时采集。
    domainLookupEnd 时间在 DNS 请求结束时采集。
4、TCP
    connectStart 在初始连接到服务器时采集。
    如果正在使用 TLS 或 SSL，secureConnectionStart 将在握手（确保连接安全）开始时开始。
    connectEnd 将在到服务器的连接完成时采集。
5、请求
    requestStart 会在对某个资源的请求被发送到服务器后立即采集。
6、响应
    responseStart 是服务器初始响应请求的时间。
    responseEnd 是请求结束并且数据完成检索的时间。
```
![resource](https://pic.xiaohuochai.site/blog/resource-timing-api.png)

&emsp;&emsp;Network 面板中有给定条目完整的耗时信息

![data](https://pic.xiaohuochai.site/blog/resource-timing-data.png)

【queueing】

&emsp;&emsp;如果某个请求正在排队，则指示：

&emsp;&emsp;1、请求已被渲染引擎推迟，因为该请求的优先级被视为低于关键资源（例如脚本/样式）的优先级。 图像经常发生这种情况

&emsp;&emsp;2、请求已被暂停，以等待将要释放的不可用 TCP 套接字

&emsp;&emsp;3、请求已被暂停，因为在 HTTP 1 上，浏览器仅允许每个源拥有六个 TCP 连接

&emsp;&emsp;4、生成磁盘缓存条目所用的时间（通常非常迅速）

【stalled】

&emsp;&emsp;请求等待发送所用的时间。 可以是等待 Queueing 中介绍的任何一个原因。 此外，此时间包含代理协商所用的任何时间

【proxy negotiaion】

&emsp;&emsp;与代理服务器连接协商所用的时间

【DNS lookup】

&emsp;&emsp;执行 DNS 查询所用的时间。 页面上的每一个新域都需要完整的往返才能执行 DNS 查询

【Initial Connection】

&emsp;&emsp;建立连接所用的时间，包括 TCP 握手/重试和协商 SSL 的时间

【SSL】

&emsp;&emsp;完成 SSL 握手所用的时间

【Request sent】

&emsp;&emsp;发出网络请求所用的时间。 通常不到一毫秒

【TTFB】

&emsp;&emsp;等待初始响应所用的时间，也称为至第一字节的时间。 此时间将捕捉到服务器往返的延迟时间，以及等待服务器传送响应所用的时间

【content Download】

&emsp;&emsp;接收响应数据所用的时间

 

&nbsp;

### 诊断问题

【queueing时间过长】

&emsp;&emsp;最常见问题是一系列已被加入队列或已被停止的条目。这表明正在从单个网域检索太多的资源。在 HTTP 1.0/1.1 连接上，Chrome 会将每个主机强制设置为最多六个 TCP 连接。如果一次请求十二个条目，前六个将开始，而后六个将被加入队列。最初的一半完成后，队列中的第一个条目将开始其请求流程

&emsp;&emsp;要为传统的 HTTP 1 流量解决此问题，需要实现域分片。也就是在应用上设置多个子域，以便提供资源。然后，在子域之间平均分配正在提供的资源

&emsp;&emsp;HTTP 1 连接的修复结果不会应用到 HTTP 2 连接上。事实上，前者的结果会影响后者。 如果部署了 HTTP 2，不要对资源进行域分片，因为它与 HTTP 2 的操作方式相反。在 HTTP 2 中，到服务器的单个 TCP 连接作为多路复用连接。这消除了 HTTP 1 中的六个连接限制，并且可以通过单个连接同时传输多个资源

【TTFB时间过长】

&emsp;&emsp;等待时间长表示至第一字节的时间 (TTFB) 漫长。建议将此值控制在 200 毫秒以下

&emsp;&emsp;主要有以下两个原因

&emsp;&emsp;1、客户端与服务器之间的网络条件较差

&emsp;&emsp;2、服务器应用的响应慢

【content Download时间过长】

&emsp;&emsp;如果Content Download 阶段花费了大量时间，则提高服务器响应或串联不会有任何帮助。首要的解决办法是减少发送的字节数