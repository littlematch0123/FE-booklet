# HTTP知识结构

　　除了HTML、CSS、javascript这三门前端基础知识之外，HTTP恐怕是前端工程师最需要掌握的知识了，它是前端和后端沟通的桥梁，前端工程师需要能够调试HTTP、修复网络传输中可能遇到的BUG，进而认识到HTTP协议的局限性，从而了解网络性能和安全性等

　　HTTP的内容主要参照《HTTP权威指南》和《图解HTTP》，小火柴将HTTP的知识体系进行了梳理和归纳，总结成以下目录

* 基础
    * [简明学习](base/base.md)
    * [网络基础](base/network.md)
    * [数据传输](base/transport.md)
    * [网站架构演化](base/WebArchitecture.md)
    * [连接管理](base/connect.md)
    * [缓存](base/cache.md) 
* 组成
    * [URL](composition/URL.md)
    * [报文起始行](composition/StartingLine.md)
    * [报文首部](composition/MessageHeader.md)  
* 结构
    * [Web服务器](structure/server.md)
    * [代理](structure/proxy.md)
    * [网关、隧道和中继](structure/others.md) 
* 安全
    * [Web攻击技术](security/webAttack.md)
    * [客户端识别及Cookie](security/cookie.md)
    * [基本认证](security/baseAuth.md) 
    * [摘要认证](security/summaryAuth.md) 
    * [安全HTTP](security/https.md) 
* 编码
    * [实体和编码](coding/coding.md)
    * [字符集](coding/charset.md)
    * [内容协商](coding/contentNegotiation.md) 
    * [使用javascript实现base64编码器](coding/base64Coding.md) 
* 内容发布
    * [Web主机托管](issue/hosting.md)
    * [重定向和负载均衡](issue/redirect.md)
    * [日志记录](issue/log.md)  