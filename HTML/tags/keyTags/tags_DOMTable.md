# DOM操作表格

&emsp;&emsp;表格table元素是HTML中最复杂的结构之一。要想创建表格，一般都必须涉及表示表格行、单元格、表头等方面的标签。由于涉及的标签多，因而使用核心DOM方法创建和修改表格往往都免不了要编写大量的代码。本文将详细介绍DOM操作表格的属性和方法

&nbsp;

### 需求

&emsp;&emsp;要通过DOM实现下列格式的表格结构

```
<table border = "1" width = "100%">
    <tbody>
        <tr>
            <td>Cell 1,1</td>
            <td>Cell 2,1</td>
        </tr>
        <tr>
            <td>Cell 1,2</td>
            <td>Cell 2,2</td>
        </tr>        
    </tbody>
</table>
```

&nbsp;

### DOMcore

&emsp;&emsp;如果通过DOMcore方法，则方法如下

```
//创建表格
var table = document.createElement("table");
table.border = "1";
table.width = "100%";

//创建tbody
var tbody = document.createElement("tbody");
table.appendChild(tbody);

//创建第一行
var row1 = document.createElement("tr");
tbody.appendChild(row1);
var cell1_1 = document.createElement("td");
cell1_1.appendChild(document.createTextNode("Cell 1,1"));
row1.appendChild(cell1_1);
var cell2_1 = document.createElement("td");
cell2_1.appendChild(document.createTextNode("Cell 2,1"));
row1.appendChild(cell2_1);

//创建第二行
var row2 = document.createElement("tr");
tbody.appendChild(row2);
var cell1_2 = document.createElement("td");
cell1_2.appendChild(document.createTextNode("Cell 1,2"));
row2.appendChild(cell1_2);
var cell2_2 = document.createElement("td");
cell2_2.appendChild(document.createTextNode("Cell 2,2"));
row2.appendChild(cell2_2);

//将表格添加到文档主体中
document.body.appendChild(table);
```

&nbsp;

### 属性和方法

&emsp;&emsp;显然DOM代码很长，为了方便构建表格，HTML DOM为&lt;table&gt;、&lt;tbody&gt;、&lt;tr&gt;元素添加了属性和方法。

&emsp;&emsp;【1】为&lt;table&gt;元素添加的属性和方法

<div>
<pre>caption:保存着对&lt;caption&gt;元素的指针
tBodies:是一个&lt;tbody&gt;元素的HTMLCollection
tFoot:保存着对&lt;tfoot&gt;元素的指针
tHead:保存着对&lt;thead&gt;元素的指针
createTHead():创建&lt;thead&gt;元素，将其放到表格中，返回引用
createTFoot():创建&lt;tfoot&gt;元素，将其放到表格中，返回引用
createCaption():创建&lt;caption&gt;元素，将其放到表格中，返回引用
deleteTHead():删除&lt;thead&gt;元素
deleteTFoot():删除&lt;tfoot&gt;元素
deleteCaption():删除&lt;caption&gt;元素</pre>
</div>

&emsp;&emsp;【2】为&lt;tbody&gt;元素添加的属性和方法

<div>
<pre>rows:保存着&lt;tbody&gt;元素中行的HTMLCollection
deleteRow(pos):删除指定位置的行
insertRow(pos):向rows集合中的指定位置插入一行，返回对新插入行的引用</pre>
</div>

&emsp;&emsp;【3】为&lt;tr&gt;元素添加的属性和方法

<div>
<pre>cells:保存着&lt;tr&gt;元素中单元格的HTMLCollection
deleteCell(pos):删除指定位置的单元格
insertCell(pos):向cells集合中的指定位置插入一个单元格，返回对新插入单元格的引用</pre>
</div>

&nbsp;

### 代码重写

```
//创建表格
var table = document.createElement("table");
table.border = "1";
table.width = "100%";

//创建tbody
var tbody = document.createElement("tbody");
table.appendChild(tbody);

//创建第一行
tbody.insertRow(0);
tbody.rows[0].insertCell(0);
tbody.rows[0].cells[0].appendChild(document.createTextNode("Cell 1,1"));
tbody.rows[0].insertCell(1);
tbody.rows[0].cells[1].appendChild(document.createTextNode("Cell 2,1"));

//创建第二行
tbody.insertRow(1);
tbody.rows[1].insertCell(0);
tbody.rows[1].cells[0].appendChild(document.createTextNode("Cell 1,2"));
tbody.rows[1].insertCell(1);
tbody.rows[1].cells[1].appendChild(document.createTextNode("Cell 2,2"));

//将表格添加到文档主体中
document.body.appendChild(table);
```

&nbsp;

### 效果展示

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/html/table/t88.html" frameborder="0" width="320" height="240"></iframe>

