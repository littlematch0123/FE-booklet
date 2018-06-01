# vscode常用设置

&emsp;&emsp;本文是vscode使用中遇到问题的解决办法总结


&nbsp;

### CPU100%

&emsp;&emsp;有时，vscode会出现CPU利用率100%的情况，两个rg.exe占用了全部的CPU。解决办法如下

&emsp;&emsp;文件>首选项>设置, 搜索设置 "search.followSymlinks" ：false；

 

&nbsp;

### emmet

&emsp;&emsp;若想在jsx中使用emmet自动补全代码，解决办法如下

&emsp;&emsp;文件>首选项>设置, 进行下面两项设置

&emsp;&emsp;1、"emmet.triggerExpansionOnTab": true

&emsp;&emsp;2、"emmet.includeLanguages": {"javascript":"html"},

 

&nbsp;

### 自动分号

&emsp;&emsp;若安装了prettier插件，粘贴代码，或格式化文件时，会自动添加分号，并由双引号变成单引号，这是prettier插件的默认设置决定的。解决办法如下

&emsp;&emsp;文件>首选项>设置, 进行下面两项设置

&emsp;&emsp;1、"prettier.singleQuote": true

&emsp;&emsp;2、"prettier.semi": false

 

&nbsp;

### beauty

&emsp;&emsp;使用vscode，一般都会使用beauty插件来美化代码。如果，要美化.vue的代码，以及保存时自动美化代码，则需要进行如下设置

&emsp;&emsp;文件>首选项>设置, 进行下面两项设置

&emsp;&emsp;注意：由于VUE使用的是eslint，则需要把.jshintrc变成.eslintrc

```
    "editor.formatOnSave": true,
    "beautify.language": {
        "js": {
            "type": [
                "javascript",
                "json"
            ],
            "filename": [
                ".eslintrc",
                ".jsbeautify"
            ]
        },
        "css": [
            "css",
            "scss"
        ],
        "html": [
            "htm",
            "html",
            "vue"
        ]
    }
```
 

&nbsp;

### eslint

&emsp;&emsp;使用beauty美化代码之后，一般地，代码会符合eslint的校验要求。但是，禁止函数圆括号之前有一个空格(space-before-function-paren)和文件末尾保留一行空行(eol-last)这两个规则 ，在beauty中没有对应的匹配规则。如果，这两个要求不是非要遵守，可以在.eslintrc文件中，将其设置为0
```
    'eol-last': 0,
    'space-before-function-paren': 0
```    
&emsp;&emsp;这样，在编写代码时，不用考虑代码格式。保存时，自动被美化，且符合eslint的校验要求

&nbsp;

### 重装Node

&emsp;&emsp;在重装Node后，会出现无法识别node的情况，报错如下

```
无法将“node”项识别为 cmdlet、函数、脚本文件或可运行程序的名称。请检查名称的拼写，如果包括路径，请确保路径正确，然后再试一次。
```
&emsp;&emsp;解决办法非常简单，只要关闭所有的vscode窗口，重新打开即可