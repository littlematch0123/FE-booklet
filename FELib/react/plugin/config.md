# 基于create-react-app的再配置 

&emsp;&emsp;使用Facebook官方推出的create-react-app脚手架，我们基本可以零配置搭建基于webpack的React开发环境。但是，如果需要个性化定制，则还需要基于create-react-app进行再配置

 

&nbsp;

### 环境变量

&emsp;&emsp;在根目录下新建.env.local文件，可以用于本地环境变量覆盖

&emsp;&emsp;如在该文件中进行如下设置
```
PORT=2000
```
&emsp;&emsp;则开发服务器会在2000端口开启服务

 

&nbsp;

### 配置代理

&emsp;&emsp;在package.json中配置，与其他项目同级

```
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
  "proxy": {
    "/api": {
      "target": "https://m.weibo.cn",
      "changeOrigin": true,
      "pathRewrite":{"^/api":""}
    }
  }
```
&emsp;&emsp;由于create-react-app默认支持fetch，所以在组件中使用fetch获取数据，结果显示在了控制台中
```
fetch('api/comments/show?id=4199740256395164&page=1').then(res => {
  res.json().then(data => {
    console.log(data)
  })
})
```
 

&nbsp;

### 配置别名

&emsp;&emsp;使用react-app-rewired来进行react的再配置，首先使用npm安装
```
$ npm install react-app-rewired --save-dev
```
&emsp;&emsp;然后，更改package.json中的scripts部分

```
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test --env=jsdom",
    "eject": "react-app eject"
  },
```
&emsp;&emsp;然后，在根目录新建config-overrides.js文件，配置如下

```
const path = require('path');
function resolve(dir) {
    return path.join(__dirname, '.', dir)
}
module.exports = function override(config, env) {
    config.resolve.alias = {
        '@': resolve('src')
    }
    return config;
}
```
&emsp;&emsp;重启开发服务器后，就可以使用@来表示'src'的绝对路径了

 

&nbsp;

### 配置eslint

&emsp;&emsp;安装插件
```
npm install react-app-rewired react-app-rewire-eslint --save
```
&emsp;&emsp;在根目录下修改config-overrides.js文件

```
const rewireEslint = require('react-app-rewire-eslint');

function overrideEslintOptions(options) {
  // do stuff with the eslint options...
  return options;
}

/* config-overrides.js */
module.exports = function override(config, env) {
  config = rewireEslint(config, env, overrideEslintOptions);
  return config;
}
```