# 数组复制

&emsp;&emsp;前面的博文中介绍了<a href="http://www.cnblogs.com/xiaohuochai/p/6354166.html" target="_blank">对象拷贝</a>，本文将详细介绍数组复制




<p>&nbsp;</p>


### push

    function copyArray(arr){
        var result = [];
        for(var i = 0; i < arr.length; i++){
            result.push(arr[i]);
        }
        return result;
    }

    var obj1=[1,2,3];
    var obj2=copyArray(obj1);
    console.log(obj1); //[1,2,3]
    console.log(obj2); //[1,2,3]
    obj2.push(4);
    console.log(obj1); //[1,2,3]
    console.log(obj2); //[1,2,3,4]

<p>&nbsp;</p>

### join

&emsp;&emsp;使用该方法的缺点是数组中的项全部变成了字符串形式


    function copyArray(arr){
        var result = [];
        result = arr.join().split(',');
        return result;
    }

    var obj1=[1,2,3];
    var obj2=copyArray(obj1);
    console.log(obj1); //[1,2,3]
    console.log(obj2); //['1','2','3']
    obj2.push(4);
    console.log(obj1); //[1,2,3]
    console.log(obj2); //['1','2','3',4]

<p>&nbsp;</p>

### concat

    function copyArray(arr){
        var result = [];
        result = arr.concat();
        return result;
    }

    var obj1=[1,2,3];
    var obj2=copyArray(obj1);
    console.log(obj1); //[1,2,3]
    console.log(obj2); //[1,2,3]
    obj2.push(4);
    console.log(obj1); //[1,2,3]
    console.log(obj2); //[1,2,3,4]

<p>&nbsp;</p>

### slice

    function copyArray(arr){
        var result = [];
        result = arr.slice();
        return result;
    }

    var obj1=[1,2,3];
    var obj2=copyArray(obj1);
    console.log(obj1); //[1,2,3]
    console.log(obj2); //[1,2,3]
    obj2.push(4);
    console.log(obj1); //[1,2,3]
    console.log(obj2); //[1,2,3,4]

<p>&nbsp;</p>

### 深拷贝

&emsp;&emsp;以上方法实现的仅是数组的浅拷贝，如果要实现数组的深拷贝，需要使用递归方法


    function copyArray(arr,result){
        var result = result || [];
        for(var i = 0; i < arr.length; i++){
            if(arr[i] instanceof Array){
                result[i] = [];
                copyArray(arr[i],result[i]);
            }else{
                result[i] = arr[i];
            }           
        }
        return result;
    }

    var obj1=[1,2,[3,4]];
    var obj2=copyArray(obj1);
    console.log(obj1[2]); //[3,4]
    console.log(obj2[2]); //[3,4]
    obj2[2].push(5);
    console.log(obj1[2]); //[3,4]
    console.log(obj2[2]); //[3,4,5]

