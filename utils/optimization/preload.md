# 资源预加载preload和资源预读取prefetch简明学习

&emsp;&emsp;基于VUE的前端小站改造成SSR服务器端渲染后，HTML文档会自动使用preload和prefetch来预加载所需资源，本文将详细介绍preload和prefetch的使用

 

&nbsp;

### 资源优先级

&emsp;&emsp;在介绍preload和prefetch之前，首先要介绍浏览器的资源优先级

![property](https://pic.xiaohuochai.site/blog/property.png)

&emsp;&emsp;在Chrome浏览器中，不同的资源在浏览器渲染的不同阶段进行加载的优先级不同

&emsp;&emsp;一共分成五个级别
```
Highest 最高
Hight 高
Medium 中等
Low 低
Lowest 最低
```
&emsp;&emsp;其中主资源HTML和CSS的优先级最高，其他资源根据情况的不同优先级不一

&emsp;&emsp;JS脚本根据它们在文件中的位置是否异步、延迟或阻塞获得不同的优先级：

&emsp;&emsp;1、网络在第一个图片资源之前阻塞的脚本在网络优先级中是中级

&emsp;&emsp;2、网络在第一个图片资源之后阻塞的脚本在网络优先级中是低级

&emsp;&emsp;3、异步／延迟／插入的脚本（无论在什么位置）在网络优先级中是很低级

&emsp;&emsp;图片（视口可见）将会获得相对于视口不可见图片（低级）的更高的优先级（中级），所以某些程度上 Chrome 将会尽量懒加载这些图片。低优先级的图片在布局完成被视口发现时，将会获得优先级提升

&emsp;&emsp;preload 使用 “as” 属性加载的资源将会获得与资源 “type” 属性所拥有的相同的优先级。比如说，preload as="style" 将会获得比 as=“script” 更高的优先级

&emsp;&emsp;不带 “as” 属性的 preload 的优先级将会等同于异步请求

 

&nbsp;

### preload

【定义】

&emsp;&emsp;如下所示，preload是link元素中的rel属性值
```
<link rel="preload"> 
```
&emsp;&emsp;preload 提供了一种声明式的命令，让浏览器提前加载指定资源(加载后并不执行)，需要执行时再执行

&emsp;&emsp;这样做的好处在于：

&emsp;&emsp;1、将加载和执行分离开，不阻塞渲染和document的onload事件

&emsp;&emsp;2、提前加载指定资源，不再出现依赖的font字体隔了一段时间才刷出的情况

【创建】

&emsp;&emsp;使用 link 标签静态标记需要预加载的资源
```
<link rel="preload" href="/path/to/style.css" as="style">
```
&emsp;&emsp;也可以使用脚本动态创建一个 link 标签后插入到 head 头部

```
<script>
const link = document.createElement('link');
link.rel = 'preload';
link.as = 'style';
link.href = '/path/to/style.css';
document.head.appendChild(link);
</script>
```
【检测】

&emsp;&emsp;在不支持 preload 的浏览器环境中，会忽略对应的 link 标签，而若需要做特征检测的话，则可以使用如下代码

```
const isPreloadSupported = () => {
  const link = document.createElement('link');
  const relList = link.relList;
  if (!relList || !relList.supports) {
    return false;
  }
  return relList.supports('preload');
}
```
【特性】

&emsp;&emsp;使用 preload 后，不管资源是否使用都将提前加载。若不确定资源是必定会加载的，则不要错误使用 preload，以免本末导致，给页面带来更沉重的负担

&emsp;&emsp;Preload 有 as 属性，浏览器可以设置正确的资源加载优先级，这种方式可以确保资源根据其重要性依次加载， 所以，Preload既不会影响重要资源的加载，又不会让次要资源影响自身的加载；浏览器能根据 as 的值发送适当的 Accept 头部信息；浏览器通过 as 值能得知资源类型，因此当获取的资源相同时，浏览器能够判断前面获取的资源是否能重用

&emsp;&emsp;如果忽略 as 属性，或者错误的 as 属性会使 preload 等同于 XHR 请求，浏览器不知道加载的是什么，因此会赋予此类资源非常低的加载优先级

&emsp;&emsp;Preload 的与众不同还体现在 onload 事件上。也就是说可以定义资源加载完毕后的回调函数
```
<link rel="preload" href="..." as="..." onload="preloadFinished()">
```
&emsp;&emsp;比如，可以使用preload的样式表立即生效
```
<link rel="preload" href="style.css" onload="this.rel=stylesheet">
```
&emsp;&emsp;此外，preload 不会阻塞 windows 的 onload 事件

&emsp;&emsp;对跨域的文件进行preload时，必须加上 crossorigin 属性
```
<link rel="preload" as="font" crossorigin href="https://at.alicdn.com/t/font_zck90zmlh7hf47vi.woff">
```
【二次获取】

&emsp;&emsp;1、不使用as属性

&emsp;&emsp;如果对所 preload 的资源不使用明确的 “as” 属性，将会导致二次获取

&emsp;&emsp;2、字体文件

&emsp;&emsp;preload 字体不带 crossorigin 会二次获取！ 确保对 preload 的字体添加 crossorigin 属性，否则字体文件会被下载两次，这个请求使用匿名的跨域模式。这个建议也适用于字体文件在相同域名下，也适用于其他域名的获取(比如说默认的异步获取)

【警告】

&emsp;&emsp;没有用到的 preload 资源在 Chrome 的 console 里会在 onload 事件 3s 后发生警告

![warn](https://pic.xiaohuochai.site/blog/warn.png)

 

&nbsp;

### prefetch

&emsp;&emsp;如下所示，prefetch是link元素中的rel属性值
```
<link rel=“prefetch”>
```
&emsp;&emsp;它的作用是告诉浏览器加载下一页面可能会用到的资源，注意，是下一页面，而不是当前页面。因此该方法的加载优先级非常低，也就是说该方式的作用是加速下一个页面的加载速度

【区分】

&emsp;&emsp;preload 是告诉浏览器页面必定需要的资源，浏览器一定会加载这些资源

&emsp;&emsp;prefetch 是告诉浏览器页面可能需要的资源，浏览器不一定会加载这些资源

&emsp;&emsp;在VUE SSR生成的页面中，首页的资源均使用preload，而路由对应的资源，则使用prefetch

```
<link rel="preload" href="./manifest.js" as="script">
<link rel="preload" href="./vendor.js" as="script">
<link rel="preload" href="./app.js" as="script">
<link rel="prefetch" href="./vendor-async.js">
<link rel="prefetch" href="./user.js">
<link rel="prefetch" href="./comment.js">
<link rel="prefetch" href="./category.js">
<link rel="prefetch" href="./post.js">
<link rel="prefetch" href="./home.js">
```
&emsp;&emsp;所以，对于当前页面很有必要的资源使用 preload，对于可能在将来的页面中使用的资源使用 prefetch

【不要混用】

&emsp;&emsp;preload 和 prefetch 混用的话，并不会复用资源，而是会重复加载
```
<link rel="preload"   href="https://at.alicdn.com/t/font_zck90zmlh7hf47vi.woff" as="font">
<link rel="prefetch"  href="https://at.alicdn.com/t/font_zck90zmlh7hf47vi.woff" as="font">
```
&emsp;&emsp;使用 preload 和 prefetch 的逻辑可能不是写到一起，但一旦发生对用一资源 preload 或 prefetch 的话，会带来双倍的网络请求

![preload](https://pic.xiaohuochai.site/blog/v2-26c0270dc079e2de7a379c6c55fa01fe_hd.jpg)

 