# CSS代码检查工具stylelint

&emsp;&emsp;CSS不能算是严格意义的编程语言，但是在前端体系中却不能小觑。 CSS 是以描述为主的样式表，如果描述得混乱、没有规则，对于其他开发者一定是一个定时炸弹，特别是有强迫症的人群。CSS 看似简单，想要写出漂亮的 CSS 还是相当困难。所以校验 CSS 规则的行动迫在眉睫。stylelint是一个强大的现代 CSS 检测器，可以让开发者在样式表中遵循一致的约定和避免错误。本文将详细介绍CSS代码检查工具stylelint

![](https://pic.xiaohuochai.site/blog/css_stylelint.png)

 

&nbsp;

### 概述

&emsp;&emsp;stylelint拥有超过150条的规则，包括捕捉错误、最佳实践、控制可以使用的语言特性和强制代码风格规范。它支持最新的CSS语法，并且灵活可配置

 

&nbsp;

### Vue

&emsp;&emsp;下面在Vue框架下安装使用stylelint

&emsp;&emsp;1、安装stylelint、stylint-config-standard和stylelint-order
```
npm install stylelint --save-dev
npm install stylelint-config-standard --save-dev
npm install stylelint-order --save-dev
```
&emsp;&emsp;其中，stylelint是运行工具，stylelint-config-standard是stylelint的推荐配置，stylelint-order是CSS属性排序插件

&emsp;&emsp;安装完成后，package.json文件中会自动添加如下字段

    "stylelint": "^9.1.3",
    "stylelint-config-standard": "^18.2.0",
    "stylelint-order": "^0.8.1",
&emsp;&emsp;2、在根目录下创建.stylelintrc配置文件

```
{ 
  "extends": "stylelint-config-standard", 
  "plugins": ["stylelint-order"],
  "rules": {
    "order/order": [
      "declarations",
      "custom-properties",
      "dollar-variables",
      "rules",
      "at-rules"
    ],
    "order/properties-order": [
      "position",
      "z-index",      
      "top",
      "bottom",
      "left",         
      "right",
      "float",
      "clear",
      "columns",
      "columns-width",
      "columns-count",
      "column-rule",
      "column-rule-width",
      "column-rule-style",
      "column-rule-color",
      "column-fill",
      "column-span",
      "column-gap",      
      "display",
      "grid",
      "grid-template-rows",
      "grid-template-columns",
      "grid-template-areas",
      "grid-auto-rows",
      "grid-auto-columns",
      "grid-auto-flow",
      "grid-column-gap",
      "grid-row-gap",
      "grid-template",
      "grid-template-rows",
      "grid-template-columns",
      "grid-template-areas",
      "grid-gap",
      "grid-row-gap",
      "grid-column-gap",
      "grid-area",
      "grid-row-start",
      "grid-row-end",
      "grid-column-start",
      "grid-column-end",
      "grid-column",
      "grid-column-start",
      "grid-column-end",
      "grid-row",
      "grid-row-start",
      "grid-row-end",      
      "flex",
      "flex-grow",
      "flex-shrink",
      "flex-basis",
      "flex-flow",
      "flex-direction",
      "flex-wrap",
      "justify-content",
      "align-content",
      "align-items",
      "align-self",
      "order",
      "table-layout",
      "empty-cells",
      "caption-side",
      "border-collapse",
      "border-spacing",
      "list-style",
      "list-style-type",
      "list-style-position",
      "list-style-image",
      "ruby-align",
      "ruby-merge",
      "ruby-position",
      "box-sizing",
      "width",
      "min-width",
      "max-width",
      "height",
      "min-height",
      "max-height",
      "padding",
      "padding-top",
      "padding-right",
      "padding-bottom",
      "padding-left",
      "margin",
      "margin-top",
      "margin-right",
      "margin-bottom",
      "margin-left",      
      "border",
      "border-width",
      "border-top-width",
      "border-right-width",
      "border-bottom-width",
      "border-left-width",
      "border-style",
      "border-top-style",
      "border-right-style",
      "border-bottom-style",
      "border-left-style",
      "border-color",
      "border-top-color",
      "border-right-color",
      "border-bottom-color",
      "border-left-color",
      "border-image",
      "border-image-source",
      "border-image-slice",
      "border-image-width",
      "border-image-outset",
      "border-image-repeat",
      "border-top",
      "border-top-width",
      "border-top-style",
      "border-top-color",
      "border-top",
      "border-right-width",
      "border-right-style",
      "border-right-color",
      "border-bottom",
      "border-bottom-width",
      "border-bottom-style",
      "border-bottom-color",
      "border-left",
      "border-left-width",
      "border-left-style",
      "border-left-color",
      "border-radius",
      "border-top-right-radius",
      "border-bottom-right-radius",
      "border-bottom-left-radius",
      "border-top-left-radius",
      "outline",
      "outline-width",
      "outline-color",
      "outline-style",
      "outline-offset",
      "overflow",
      "overflow-x",
      "overflow-y",
      "resize",
      "visibility",
      "font",
      "font-style",
      "font-variant",
      "font-weight",
      "font-stretch",
      "font-size",
      "font-family",
      "font-synthesis",
      "font-size-adjust",
      "font-kerning",        
      "line-height",
      "text-align",
      "text-align-last",
      "vertical-align",      
      "text-overflow",
      "text-justify",
      "text-transform",
      "text-indent",
      "text-emphasis",
      "text-emphasis-style",
      "text-emphasis-color",
      "text-emphasis-position",
      "text-decoration",
      "text-decoration-color",
      "text-decoration-style",
      "text-decoration-line",
      "text-underline-position",
      "text-shadow",      
      "white-space",
      "overflow-wrap",
      "word-wrap",
      "word-break",
      "line-break",
      "hyphens",
      "letter-spacing",
      "word-spacing",
      "quotes",
      "tab-size",
      "orphans",
      "writing-mode",
      "text-combine-upright",
      "unicode-bidi",
      "text-orientation",
      "direction",
      "text-rendering",
      "font-feature-settings",
      "font-language-override",
      "image-rendering",
      "image-orientation",
      "image-resolution",
      "shape-image-threshold",
      "shape-outside",
      "shape-margin",
      "color",
      "background",
      "background-image",
      "background-position",
      "background-size",
      "background-repeat",
      "background-origin",
      "background-clip",
      "background-attachment",
      "background-color",
      "background-blend-mode",
      "isolation",
      "clip-path",
      "mask",
      "mask-image",
      "mask-mode",
      "mask-position",
      "mask-size",
      "mask-repeat",
      "mask-origin",
      "mask-clip",
      "mask-composite",
      "mask-type",
      "filter",
      "box-shadow",
      "opacity",
      "transform-style",
      "transform",
      "transform-box",
      "transform-origin",
      "perspective",
      "perspective-origin",
      "backface-visibility",
      "transition",
      "transition-property",
      "transition-duration",
      "transition-timing-function",
      "transition-delay",
      "animation",
      "animation-name",
      "animation-duration",
      "animation-timing-function",
      "animation-delay",
      "animation-iteration-count",
      "animation-direction",
      "animation-fill-mode",
      "animation-play-state",
      "scroll-behavior",
      "scroll-snap-type",
      "scroll-snap-destination",
      "scroll-snap-coordinate",
      "cursor",
      "touch-action",
      "caret-color",
      "ime-mode",
      "object-fit",
      "object-position",
      "content",
      "counter-reset",
      "counter-increment",
      "will-change",
      "pointer-events",
      "all",
      "page-break-before",
      "page-break-after",
      "page-break-inside",
      "widows"
    ],    
    "no-empty-source": null,
    "property-no-vendor-prefix": [true, {"ignoreProperties": ["background-clip"]}],
    "number-leading-zero": "never",
    "number-no-trailing-zeros": true,
    "length-zero-no-unit": true,
    "value-list-comma-space-after": "always",
    "declaration-colon-space-after": "always",
    "value-list-max-empty-lines": 0,
    "shorthand-property-no-redundant-values": true,
    "declaration-block-no-duplicate-properties": true,
    "declaration-block-no-redundant-longhand-properties": true,
    "declaration-block-semicolon-newline-after": "always",
    "block-closing-brace-newline-after": "always",
    "media-feature-colon-space-after": "always",
    "media-feature-range-operator-space-after": "always",
    "at-rule-name-space-after": "always",
    "indentation": 2,
    "no-eol-whitespace": true,
    "string-no-newline": null
  }
}
```
&emsp;&emsp;3、使用stylelint验证CSS代码即可，如验证src目录下的所有vue文件

![](https://pic.xiaohuochai.site/blog/css_stylelint2.png)
 

&nbsp;

### react
&emsp;&emsp;react中使用styled-components来书写CSS代码，stylelint同样提供了插件来校验CSS

&emsp;&emsp;1、安装stylelint、stylelint-processor-styled-components、stylelint-config-styled-components、stylelint-config-recommend、stylelint-order
```
npm install --save-dev stylelint@9.1.3
npm install --save-dev stylelint-processor-styled-components
npm install --save-dev stylelint-config-styled-components
npm install --save-dev stylelint-config-recommended
npm install --save-dev stylelint-order
```
&emsp;&emsp;注意： 由于stylelint更新到9.2版本后，导致styled-components中的CSS代码无法正常校验，所以稳妥起见，使用9.1.3版本的stylelint

&emsp;&emsp;2、在根目录下新建配置文件.stylelintrc

```
{
  "processors": ["stylelint-processor-styled-components"],
  "extends": [
    "stylelint-config-recommended",
    "stylelint-config-styled-components"
  ],
  "plugins": ["stylelint-order"],
  "rules": {
    "order/order": [
      "declarations",
      "custom-properties",
      "dollar-variables",
      "rules",
      "at-rules"
    ],
...
}
```
&emsp;&emsp;3、同样地，使用stylelint命令即可校验

![](https://pic.xiaohuochai.site/blog/css_stylelint3.png)
 

&nbsp;

### 注意事项

&emsp;&emsp;1、fix命令

&emsp;&emsp;在stylelint的150多条规则中，使用fix命令，可以自动修复一些命令。但是，该fix命令一定要慎用。笔者在使用fix命令后，stylelint将React工程中的所有js文件里的代码全部清除，只留着了下可以识别的css部分
```
stylelint '**/*.js' --fix
```
&emsp;&emsp;2、配置scripts

&emsp;&emsp;可以在package.json中配置stylelint的快捷方式
```
  "scripts": {
    "lintcss": "stylelint 'src/**/*.js'"
  }
```  
&emsp;&emsp;这样，使用npm run lintcss 命令即可实现相同效果
