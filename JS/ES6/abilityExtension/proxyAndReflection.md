# 代理(Proxy)和反射(Reflection)

&emsp;&emsp;ES5和ES6致力于为开发者提供JS已有却不可调用的功能。例如在ES5出现以前，JS环境中的对象包含许多不可枚举和不可写的属性，但开发者不能定义自己的不可枚举或不可写属性，于是ES5引入了Object.defineProperty()方法来支持开发者去做JS引擎早就可以实现的事情。ES6添加了一些内建对象，赋予开发者更多访问JS引擎的能力。代理(Proxy)是一种可以拦截并改变底层JS引擎操作的包装器，在新语言中通过它暴露内部运作的对象，从而让开发者可以创建内建的对象。本文将详细介绍代理(Proxy)和反射(Reflection)

&nbsp;

### 引入

【数组问题】

&emsp;&emsp;在ES6之前，开发者不能通过自己定义的对象模仿JS数组对象的行为方式。当给数组的特定元素赋值时，影响到该数组的length属性，也可以通过length属性修改数组元素

<div>
<pre>let colors = ["red", "green", "blue"];
console.log(colors.length); // 3
colors[3] = "black";
console.log(colors.length); // 4
console.log(colors[3]); // "black"
colors.length = 2;
console.log(colors.length); // 2
console.log(colors[3]); // undefined
console.log(colors[2]); // undefined
console.log(colors[1]); // "green"</pre>
</div>

&emsp;&emsp;&nbsp;colors数组一开始有3个元素，将colors[3]赋值为"black"时，length属性会自动增加到4，将length属性设置为2时，会移除数组的后两个元素而只保留前两个。在ES5之前开发者无法自己实现这些行为，现在通过代理可以实现

&nbsp;

### 代理和反射

&emsp;&emsp;调用new Proxy()可创建代替其他目标(target)对象的代理，它虚拟化了目标，所以二者看起来功能一致

&emsp;&emsp;代理可以拦截JS引擎内部目标的底层对象操作，这些底层操作被拦截后会触发响应特定操作的陷阱函数

&emsp;&emsp;反射API以Reflect对象的形式出现，对象中方法的默认特性与相同的底层操作一致，而代理可以覆写这些操作，每个代理陷阱对应一个命名和参数都相同的Reflect方法。下表总结了代理陷阱的特性

![proxy](https://pic.xiaohuochai.site/blog/ES6_proxy.png)

&emsp;&emsp;每个陷阱覆写JS对象的一些内建特性，可以用它们拦截并修改这些特性。如果仍需使用内建特性，则可以使用相应的反射API方法

【创建简单代理】

&emsp;&emsp;用Proxy构造函数创建代理需要传入两个参数：目标(target)和处理程序(handler)。处理程序用于定义一个或多个陷阱的对象，在代理中，除了专门为操作定义的陷阱外，其余操作均使用默认特性。不使用任何陷阱的处理程序等价于简单的转发代理

<div>
<pre>let target = {};
let proxy = new Proxy(target, {});
proxy.name = "proxy";
console.log(proxy.name); // "proxy"
console.log(target.name); // "proxy"
target.name = "target";
console.log(proxy.name); // "target"
console.log(target.name); // "target"</pre>
</div>

&emsp;&emsp;这个示例中的代理将所有操作直接转发到目标，将"proxy"赋值给proxy.name属性时会在目标上创建name，代理只是简单地将操作转发给目标，它不会储存这个属性。由于`proxy.name`和`target.name`引用的都是`target.name`，因此二者的值相同，从而为target.name设置新值后，proxy.name也一同变化

&nbsp;

### 陷阱代理

【使用set陷阱验证属性】

&emsp;&emsp;假设创建一个属性值是数字的对象，对象中每新增一个属性都要加以验证，如果不是数字必须抛出错误。为了实现这个任务，可以定义一个set陷阱来覆写设置值的默认特性

&emsp;&emsp;set陷阱接受4个参数

<div>
<pre>trapTaqget 用于接收属性(代理的目标)的对象
key 要写入的属性键(字符串或Symbol类型)
value 被写入属性的值
receiver 操作发生的对象(通常是代理)</pre>
</div>

&emsp;&emsp;Reflect.set()是set陷阱对应的反射方法和默认特性，它和set代理陷阱一样也接受相同的4个参数，以方便在陷阱中使用。如果属性已设置陷阱应该返回true，如果未设置则返回false。(Reflect.set()方法基于操作是否成功来返回恰当的值)

&emsp;&emsp;可以使用set陷阱并检查传入的值来验证属性值

<div>
<pre>let target = {
    name: "target"
};
let proxy = new Proxy(target, {
    set(trapTarget, key, value, receiver) {
        // 忽略已有属性，避免影响它们
        if (!trapTarget.hasOwnProperty(key)) {
            if (isNaN(value)) {
                throw new TypeError("Property must be a number.");
            }
        }
        // 添加属性
        return Reflect.set(trapTarget, key, value, receiver);
    }
});
// 添加一个新属性
proxy.count = 1;
console.log(proxy.count); // 1
console.log(target.count); // 1
// 你可以为 name 赋一个非数值类型的值，因为该属性已经存在
proxy.name = "proxy";
console.log(proxy.name); // "proxy"
console.log(target.name); // "proxy"
// 抛出错误
proxy.anotherName = "proxy";</pre>
</div>

&emsp;&emsp;这段代码定义了一个代理来验证添加到target的新属性，当执行proxy.count=1时，set陷阱被调用，此时trapTarget的值等于target，key等于"count"，value等于1，receiver等于proxy

&emsp;&emsp;由于target上没有count属性，因此代理继续将value值传入isNaN()，如果结果是NaN，则证明传入的属性值不是数字，同时也抛出一个错误。在这段代码中，count被设置为1，所以代理调用Reflect.set()方法并传入陷阱接受的4个参数来添加新属性

&emsp;&emsp;proxy.name可以成功被赋值为一个字符串，这是因为target已经拥有一个name属性，但通过调用trapTarget.hasownproperty()方法验证检查后被排除了，所以目标已有的非数字属性仍然可以被操作。

&emsp;&emsp;然而，将proxy.anotherName赋值为一个字符串时会抛出错误。目标上没有anotherName属性，所以它的值需要被验证，而由于"Proxy"不是一个数字值，因此抛出错误

&emsp;&emsp;set代理陷阱可以拦截写入属性的操作，get代理陷阱可以拦截读取属性的操作

【用get陷阱验证对象结构(Object Shape)】

&emsp;&emsp;JS有一个时常令人感到困惑的特殊行为，即读取不存在的属性时不会抛出错误，而是用undefined代替被读取属性的值

<div>
<pre>let target = {};
console.log(target.name); // undefined</pre>
</div>

&emsp;&emsp;在大多数其他语言中，如果target没有name属性，尝试读取target.name会抛出一个错误。但JS却用undefined来代替target.name属性的值。这个特性会导致重大问题，特别是当错误输入属性名称的时候，而代理可以通过检查对象结构来回避这个问题

&emsp;&emsp;对象结构是指对象中所有可用属性和方法的集合，JS引擎通过对象结构来优化代码，通常会创建类来表示对象，如果可以安全地假定一个对象将始终具有相同的属性和方法，那么当程序试图访问不存在的属性时会抛出错误。代理让对象结构检验变得简单

&emsp;&emsp;因为只有当读取属性时才会检验属性，所以无论对象中是否存在某个属性，都可以通过get陷阱来检测，它接受3个参数

<div>
<pre>trapTarget 被读取属性的源对象(代理的目标)
key 要读取的属性键(字符串或Symbol)
receiver 操作发生的对象(通常是代理)</pre>
</div>

&emsp;&emsp;由于get陷阱不写入值，所以它复刻了set陷阱中除value外的其他3个参数，Reflect.get()也接受同样3个参数并返回属性的默认值

&emsp;&emsp;如果属性在目标上不存在，则使用get陷阱和Reflect.get()时会抛出错误

<div>
<pre>let proxy = new Proxy({}, {
    get(trapTarget, key, receiver) {
        if (!(key in receiver)) {
            throw new TypeError("Property " + key + " doesn't exist.");
        }
        return Reflect.get(trapTarget, key, receiver);
    }
});
// 添加属性的功能正常
proxy.name = "proxy";
console.log(proxy.name); // "proxy"
// 读取不存在属性会抛出错误
console.log(proxy.nme); // 抛出错误</pre>
</div>

&emsp;&emsp;此示例中的get陷阱可以拦截属性读取操作，并通过in操作符来判断receiver上是否具有被读取的属性，这里之所以用in操作符检查receiver而不检查trapTarget，是为了防止receiver代理含有has陷阱。在这种情况下检查trapTarget可能会忽略掉has陷阱，从而得到错误结果。属性如果不存在会抛出一个错误，否则就使用默认行为

&emsp;&emsp;这段代码展示了如何在没有错误的情况下给proxy添加新属性name，并写入值和读取值。最后一行包含一个输入错误:proxy.nme有可能是proxy.namer，由于nme是一个不存在的属性，因而抛出错误

【使用has陷阱隐藏已有属性】

&emsp;&emsp;可用in操作符来检测给定对象是否含有某个属性，如果自有属性或原型属性匹配这个名称或Symbol返回true

<div>
<pre>let target = {
    value: 42;
}
console.log("value" in target); // true
console.log("toString" in target); // true</pre>
</div>

&emsp;&emsp;value是一个自有属性，tostring是一个继承自Object的原型属性，二者在对象上都存在，所以用in操作符检测二者都返回true。在代理中使用has陷阱可以拦截这些in操作并返回一个不同的值

&emsp;&emsp;每当使用in操作符时都会调用has陷阱，并传入两个参数

<div>
<pre>trapTaqget读取属性的对象(代理的目标)
key要检查的属性键(字符串或Symbol)</pre>
</div>

&emsp;&emsp;Reflect.has()方法也接受这些参数并返回in操作符的默认响应，同时使用has陷阱和Reflect.has()可以改变一部分属性被in检测时的行为，并恢复另外一些属性的默认行为。例如，可以像这样隐藏之前示例中的value属性

<div>
<pre>let target = {
    name: "target",
    value: 42
};
let proxy = new Proxy(target, {
    has(trapTarget, key) {
        if (key === "value") {
            return false;
        } else {
            return Reflect.has(trapTarget, key);
        }
    }
});
console.log("value" in proxy); // false
console.log("name" in proxy); // true
console.log("toString" in proxy); // true</pre>
</div>

&emsp;&emsp;代理中的has陷阱会检查key是否为"value"，如果是的话返回false，若不是则调用Reflect.has()方法返回默认行为。结果是即使target上实际存在value属性，但用in操作符检查还是会返回false，而对于name和tostring则正确返回true

【用deleteProperty陷阱防止删除属性】

&emsp;&emsp;delete操作符可以从对象中移除属性，如果成功则返回true，不成功则返回false。在严格模式下，如果尝试删除一个不可配置(nonconfigurable)属性则会导致程序抛出错误，而在非严格模式下只是返回false

<div>
<pre>let target = {
    name: "target",
    value: 42
};
Object.defineProperty(target, "name", { configurable: false });
console.log("value" in target); // true
let result1 = delete target.value;
console.log(result1); // true
console.log("value" in target); // false
// 注：下一行代码在严格模式下会抛出错误
let result2 = delete target.name;
console.log(result2); // false
console.log("name" in target); // true</pre>
</div>

&emsp;&emsp;用delete操作符删除value属性后，第三个console.log()调用中的in操作最终返回false。不可配置属性name无法被删除，所以delete操作返回false(如果这段代码运行在严格模式下会抛出错误)。在代理中，可以通过deleteProperty陷阱来改变这个行为

&emsp;&emsp;每当通过delete操作符删除对象属性时，deleteProperty陷阱都会被调用，它接受两个参数

<div>
<pre>trapTarget 要删除属性的对象(代理的目标)
key 要删除的属性键(字符串或Symbol)</pre>
</div>

&emsp;&emsp;Reflect.deleteProperty()方法为deleteProperty陷阱提供默认实现，并且接受同样的两个参数。结合二者可以改变delete的具体表现行为，例如，可以像这样来确保value属性不会被删除

<div>
<pre>let target = {
    name: "target",
    value: 42
};
let proxy = new Proxy(target, {
    deleteProperty(trapTarget, key) {
        if (key === "value") {
            return false;
        } else {
            return Reflect.deleteProperty(trapTarget, key);
        }
    }
});
// 尝试删除 proxy.value
console.log("value" in proxy); // true
let result1 = delete proxy.value;
console.log(result1); // false
console.log("value" in proxy); // true
// 尝试删除 proxy.name
console.log("name" in proxy); // true
let result2 = delete proxy.name;
console.log(result2); // true
console.log("name" in proxy); // false</pre>
</div>

&emsp;&emsp;这段代码与has陷阱的示例非常相似，deleteProperty陷阱检查key是否为"value"，如果是的话返回false，否则调用Reflect.deleteProperty()方法来使用默认行为。由于通过代理的操作被捕获，因此value属性无法被删除，但name属性就如期被删除了。如果希望保护属性不被删除，而且在严格模式下不抛出错误，那么这个方法非常使用

【原型代理陷阱】

&emsp;&emsp;Object.setPrototypeOf()方法被用于作为ES5中的Object.getPrototypeOf()方法的补充。通过代理中的setPrototypeOf陷阱和getPrototypeOf陷阱可以拦截这两个方法的执行过程，在这两种情况下，Object上的方法会调用代理中的同名陷阱来改变方法的行为

&emsp;&emsp;两个陷阱均与代理有关，但具体到方法只与每个陷阱的类型有关，setPrototypeOf陷阱接受以下这些参数

<div>
<pre>trapTarget 接受原型设置的对象(代理的目标)
proto 作为原型使用的对象</pre>
</div>

&emsp;&emsp;传入Object.setPrototypeOf()方法和Reflect.setPrototypeOf()方法的均是以上两个参数，另一方面，getPrototypeOf陷阱中的Object.getPrototypeOf()方法和Reflect.getPrototypeOf()方法只接受参数trapTarget

**原型代理陷阱的运行机制**

&emsp;&emsp;原型代理陷阱有一些限制。首先，getPrototypeOf陷阱必须返回对象或null，否则将导致运行时错误，返回值检查可以确保Object.getPrototypeOf()返回的总是预期的值；其次，在setPrototypeOf陷阱中，如果操作失败则返回的一定是false，此时Object.setPrototypeOf()会抛出错误，如果setPrototypeOf返回了任何不是false的值，那么Object.setPrototypeOf()便假设操作成功

&emsp;&emsp;以下示例通过总是返回null，且不允许改变原型的方式隐藏了代理的原型

<div>
<pre>let target = {};
let proxy = new Proxy(target, {
    getPrototypeOf(trapTarget) {
        return null;
    },
    setPrototypeOf(trapTarget, proto) {
        return false;
    }
});
let targetProto = Object.getPrototypeOf(target);
let proxyProto = Object.getPrototypeOf(proxy);
console.log(targetProto === Object.prototype); // true
console.log(proxyProto === Object.prototype); // false
console.log(proxyProto); // null
// 成功
Object.setPrototypeOf(target, {});
// 抛出错误
Object.setPrototypeOf(proxy, {});</pre>
</div>

&emsp;&emsp;这段代码强调了target和proxy的行为差异。Object.getPrototypeOf()给target返回的是值，而给proxy返回值时，由于getPrototypeOf陷阱被调用，返回的是null；同样，Object.setPrototypeOf()成功为target设置原型，而给proxy设置原型时，由于setPrototypeOf陷阱被调用，最终抛出一个错误

&emsp;&emsp;如果使用这两个陷阱的默认行为，则可以使用Reflect上的相应方法。例如，下面的代码实现了getPrototypeOf和setPrototypeOf陷阱的默认行为

<div>
<pre>let target = {};
let proxy = new Proxy(target, {
    getPrototypeOf(trapTarget) {
        return Reflect.getPrototypeOf(trapTarget);
    },
    setPrototypeOf(trapTarget, proto) {
        return Reflect.setPrototypeOf(trapTarget, proto);
    }
});
let targetProto = Object.getPrototypeOf(target);
let proxyProto = Object.getPrototypeOf(proxy);
console.log(targetProto === Object.prototype); // true
console.log(proxyProto === Object.prototype); // true
// 成功
Object.setPrototypeOf(target, {});
// 同样成功
Object.setPrototypeOf(proxy, {});</pre>
</div>

&emsp;&emsp;由于本示例中的getPrototypeOf陷阱和setPrototypeOf陷阱仅使用了默认行为，因此可以交换使用target和paro&times;y并得到相同结果。由于Reflect.getPrototypeOf()方法和Reflect.setPrototypeOf()方法与Object上的同名方法存在一些重要差异，因此使用它们是很重要的

**为什么有两组方法**

&emsp;&emsp;令人困惑的是，Reflect.getPrototypeOf()方法和Reflect.setPrototypeOf()方法疑似Object.getPrototypeOf()方法和Object.setPrototypeOf()方法，尽管两组方法执行相似的操作，但两者间仍有一些不同之处

&emsp;&emsp;Object.getPrototypeOf()和Object.setPrototypeOf()是给开发者使用的高级操作；而Reflect.getPrototypeOf()方法和Reflect.setprototypeOf()方法则是底层操作，其赋予开发者可以访问之前只在内部操作的[[GetPrototypeOf]]和[[setPrototypeOf]]的权限

&emsp;&emsp;Reflect.getPrototypeOf()方法是内部[[GetprototypeOf]]操作的包裹器，Reflect.setPrototypeOf()方法与[[setPrototypeOf]]的关系与之相同。Object上相应的方法虽然也调用了[[GetPrototypeOf]]和[[Setprototypeof]]，但在此之前会执行一些额外步骤，并通过检查返回值来决定下一步的操作

&emsp;&emsp;如果传入的参数不是对象，则Reflect.getPrototypeOf()方法会抛出错误，而Object.getPrototypeOf()方法则会在操作执行前先将参数强制转换为一个对象。给这两个方法传入一个数字，会得到不同的结果

<div>
<pre>let result1 = Object.getPrototypeOf(1);
console.log(result1 === Number.prototype); // true
// 抛出错误
Reflect.getPrototypeOf(1);</pre>
</div>

&emsp;&emsp;Object.getPrototypeOf()方法会强制让数字1变为Number对象，所以可以检索它的原型并得到返回值Number.prototype；而由于Reflect.getPrototypeOf()方法不强制转化值的类型，而且1又不是一个对象，故会抛出一个错误

&emsp;&emsp;Reflect.setPrototypeOf()方法与Object.setPrototypeOf()方法也不尽相同。具体而言，Reflect.setPrototypeOf()方法返回一个布尔值来表示操作是否成功，成功时返回true，失败则返回false；而Object.setPrototypeOf()方法一旦失败则会抛出一个错误

&emsp;&emsp;当setPrototypeOf代理陷阱返回false时会导致Object.setPrototypeOf()抛出一个错误。Object.setPrototypeOf()方法返回第一个参数作为它的值，因此其不适合用于实现setPrototypeOf代理陷阱的默认行为

<div>
<pre>let target1 = {};
let result1 = Object.setPrototypeOf(target1, {});
console.log(result1 === target1); // true
let target2 = {};
let result2 = Reflect.setPrototypeOf(target2, {});
console.log(result2 === target2); // false
console.log(result2); // true</pre>
</div>

&emsp;&emsp;在这个示例中，Object.setPrototypeOf()返回target1，但Reflect.setPrototypeOf()返回的是true。这种微妙的差异非常重要，在object和Reflect上还有更多看似重复的方法，但是在所有代理陷阱中一定要使用Reflect上的方法

【对象可扩展性陷阱】

&emsp;&emsp;ES5已经通过Object.preventExtensions()方法和Object.isExtensible()方法修正了对象的可扩展性，ES6可以通过代理中的preventExtensions和isExtensible陷阱拦截这两个方法并调用底层对象。两个陷阱都接受唯一参数trapTarget对象，并调用它上面的方法。isExtensible陷阱返回的一定是一个布尔值，表示对象是否可扩展；preventExtensions陷阱返回的也一定是布尔值，表示操作是否成功

&emsp;&emsp;Reflect.preventExtensions()方法和 Reflect.IsExtensible()方法实现相应陷阱中默认行为，二者都返回布尔值

**两个基础示例**

&emsp;&emsp;以下这段代码是对象可扩展性陷阱的实际应用，实现了isExtensible和preventExtensions陷阱的默认行为

<div>
<pre>let target = {};
let proxy = new Proxy(target, {
    isExtensible(trapTarget) {
        return Reflect.isExtensible(trapTarget);
    },
    preventExtensions(trapTarget) {
        return Reflect.preventExtensions(trapTarget);
    }
});
console.log(Object.isExtensible(target)); // true
console.log(Object.isExtensible(proxy)); // true
Object.preventExtensions(proxy);
console.log(Object.isExtensible(target)); // false
console.log(Object.isExtensible(proxy)); // false</pre>
</div>

&emsp;&emsp;此示例展示了Object.preventExtensions()方法和Object.isExtensible()方法直接从proxy传递到target的过程，当然，可以改变这种默认行为，例如，如果想让Object.preventExtensions()对于proxy失效，那么可以在preventExtensions陷阱中返回false

<div>
<pre>let target = {};
let proxy = new Proxy(target, {
    isExtensible(trapTarget) {
        return Reflect.isExtensible(trapTarget);
    },
    preventExtensions(trapTarget) {
        return false
    }
});
console.log(Object.isExtensible(target)); // true
console.log(Object.isExtensible(proxy)); // true
Object.preventExtensions(proxy);
console.log(Object.isExtensible(target)); // true
console.log(Object.isExtensible(proxy)); // true</pre>
</div>

&emsp;&emsp;这里的Object.preventExtensions(proxy)调用实际上被忽略了，这是因为preventExtensions陷阱返回了false，所以操作不会转发到底层目标，Object.isExtensible()最终返回true

【重复的可扩展性方法】

&emsp;&emsp;Object.isExtensible()方法和Reflect.isExtensible()方法非常相似，只有当传入非对象值时，Object.isExtensible()返回false，而Reflect.isExtensible()则抛出一个错误

<div>
<pre>let result1 = Object.isExtensible(2);
console.log(result1); // false
// 抛出错误
let result2 = Reflect.isExtensible(2);</pre>
</div>

&emsp;&emsp;这条限制类似于Object.getPrototypeOf()方法与Reflect.getPrototypeOf()方法之间的差异，因为相比高级功能方法而言，底层的具有更严格的错误检査

&emsp;&emsp;Object.preventExtensions()方法和Reflect.preventExtensions()方法同样非常相似。无论传入Object.preventExtensions()方法的参数是否为一个对象，它总是返回该参数；而如果Reflect.preventExtensions()方法的参数不是对象就会抛出错误；如果参数是一个对象，操作成功时Reflect.preventExtensions()会返回true，否则返回false

<div>
<pre>let result1 = Object.preventExtensions(2);
console.log(result1); // 2
let target = {};
let result2 = Reflect.preventExtensions(target);
console.log(result2); // true
// 抛出错误
let result3 = Reflect.preventExtensions(2);</pre>
</div>

&emsp;&emsp;在这里，即使值2不是一个对象，Object.preventExtensions()方法也将其透传作为返回值，而Reflect.preventExtensions()方法则会抛出错误，只有当传入对象时它才返回true

【属性描述符陷阱】

&emsp;&emsp;ES5最重要的特性之一是可以使用Object.defineProperty()方法定义属性特性(property attribute)。在早期版本的JS中无法定义访问器属性，无法将属性设置为只读或不可配置。直到Object.defineProperty()方法出现之后才支持这些功能，并且可以通过Object.getOwnPropertyDescriptor()方法来获取这些属性

&emsp;&emsp;在代理中可以分别用defineProperty陷阱和getOwnPropertyDescriptor陷阱拦截 Object.defineProperty()方法和Object.getOwnPropertyDescriptor()方法的调用。definePropepty陷阱接受以下参数

<div>
<pre>trapTarget 要定义属性的对象(代理的目标)
key 属性的键(字符串或Symbol)
descriptor 属性的描述符对象</pre>
</div>

&emsp;&emsp;defineProperty陷阱需要在操作成功后返回true，否则返回false。getOwnPropertyDescriptor陷阱只接受trapTarget和key两个参数，最终返回描述符。Reflect.defineProperty()方法和Reflect.getOwnPropertyDescriptor()方法与对应的陷阱接受相同参数。这个示例实现的是每个陷阱的默认行为

<div>
<pre>let proxy = new Proxy({}, {
    defineProperty(trapTarget, key, descriptor) {
        return Reflect.defineProperty(trapTarget, key, descriptor);
    },
    getOwnPropertyDescriptor(trapTarget, key) {
        return Reflect.getOwnPropertyDescriptor(trapTarget, key);
    }
});
Object.defineProperty(proxy, "name", {
    value: "proxy"
});
console.log(proxy.name); // "proxy"
let descriptor = Object.getOwnPropertyDescriptor(proxy, "name");
console.log(descriptor.value); // "proxy"</pre>
</div>

&emsp;&emsp;这段代码通过Object.defineProperty()方法在代理上定义了属性"name"，该属性的描述符可通过Object.getOwnPropertyDescriptor()方法来获取

**给Object.defineProperty()添加限制**

&emsp;&emsp;defineProperty陷阱返回布尔值来表示操作是否成功。返回true时，Object.defineProperty()方法成功执行；返回false时，Object.defineProperty()方法抛出错误。这个功能可以用来限制Object.defineProperty()方法可定义的属性类型，例如，如果希望阻止Symbol类型的属性，则可以当属性键为symbol时返回false

&emsp;&emsp;当key是Symbol类型时defineProperty代理陷阱返回false，否则执行默认行为。调用Object.defineProperty()并传入"name"，因此键的类型是字符串所以方法成功执行；调用Object.defineProperty()方法并传入nameSymbol，defineProperty陷阱返回false所以抛出错误

&emsp;&emsp;注意：如果让陷阱返回true并且不调用Reflect.defineProperty()方法，则可以让Object.defineProperty()方法静默失效，这既消除了错误又不会真正定义属性

**描述符对象限制**

&emsp;&emsp;为确保Object.defineProperty()方法和Object.getOwnPropertyDescriptor()方法的行为一致，传入defineProperty陷阱的描述符对象已规范化。从getOwnPropertyDescriptor陷阱返回的对象由于相同原因被验证

&emsp;&emsp;无论将什么对象作为第三个参数传递给Object.defineProperty()方法，都只有属性enumerable、configurable、value、writable、get和set将出现在传递给defineProperty陷阱的描述符对象中

<div>
<pre>let proxy = new Proxy({}, {
    defineProperty(trapTarget, key, descriptor) {
        console.log(descriptor.value); // "proxy"
        console.log(descriptor.name); // undefined
        return Reflect.defineProperty(trapTarget, key, descriptor);
    }
});
Object.defineProperty(proxy, "name", {
    value: "proxy",
    name: "custom"
});</pre>
</div>

&emsp;&emsp;在这段代码中，调用Object.defineProperty()时传入包含非标准name属性的对象作为第三个参数。当defineProperty陷阱被调用时，descriptor对象有value属性却没有name属性，这是因为descriptor不是实际传入Object.defineProperty()方法的第三个参数的引用，而是一个只包含那些被允许使用的属性的新对象。Reflect.defineProperty()方法同样也忽略了描述符上的所有非标准属性

&emsp;&emsp;getOwnPropertyDescriptor陷阱的限制条件稍有不同，它的返回值必须是null、undefined或一个对象。如果返回对象，则对象自己的属性只能是enumepable、configurable、value、writable、get和set，在返回的对象中使用不被允许的属性会抛出一个错误

<div>
<pre>let proxy = new Proxy({}, {
    getOwnPropertyDescriptor(trapTarget, key) {
        return {
            name: "proxy"
        };
    }
});
// 抛出错误
let descriptor = Object.getOwnPropertyDescriptor(proxy, "name");</pre>
</div>

&emsp;&emsp;属性描述符中不允许有name属性，当调用Object.getOwnPropertyDescriptor()时，getOwnPropertyDescriptor的返回值会触发一个错误。这条限制可以确保无论代理中使用了什么方法，Object.getOwnPropertyDescriptor()返回值的结构总是可靠的

**重复的描述符方法**

&emsp;&emsp;再一次在ES6中看到这些令人困惑的相似方法：看起来Object.defineProperty()方法和Object.getOwnPropertyDescriptor()方法分别与Reflect.defineProperty()方法和Reflect.getOwnPropertyDescriptor()方法做了同样的事情。这4个方法也有一些微妙但却很重要的差异

&emsp;&emsp;Object.defineProperty()方法和Reflect.defineProperty()方法只有返回值不同：Object.defineProperty()方法返回第一个参数，而Reflect.defineProperty()的返回值与操作有关，成功则返回true，失败则返回false

<div>
<pre>let target = {};
let result1 = Object.defineProperty(target, "name", { value: "target "});
console.log(target === result1); // true
let result2 = Reflect.defineProperty(target, "name", { value: "reflect" });
console.log(result2); // true</pre>
</div>

&emsp;&emsp;调用Object.defineProperty()时传入target，返回值是target；调用Reflect.defineProperty()时传入target，返回值是true，表示操作成功。由于defineProperty代理陷阱需要返回一个布尔值，因此必要时最好用Reflect.defineProperty()来实现默认行为

&emsp;&emsp;调用Object.getOwnPropertyDescriptor()方法时传入原始值作为第一个参数，内部将这个值强制转换为一个对象；另一方面，若调用Reflect.getOwnPropertyDescriptor()方法时传入原始值作为第一个参数，则抛出一个错误

<div>
<pre>let descriptor1 = Object.getOwnPropertyDescriptor(2, "name");
console.log(descriptor1); // undefined
// 抛出错误
let descriptor2 = Reflect.getOwnPropertyDescriptor(2, "name");</pre>
</div>

&emsp;&emsp;由于Object.getOwnPropertyDescriptor()方法将数值2强制转换为一个不含name属性的对象，因此它返回undefined，这是当对象中没有指定的name属性时的标准行为。然而当调用Reflect.getOwnPropertyDescriptor()时立即抛出一个错误，因为该方法不接受原始值作为第一个参数

【ownKeys陷阱】

&emsp;&emsp;ownKeys代理陷阱可以拦截内部方法[[OwnPropertyKeys]]，我们通过返回个数组的值可以覆写其行为。这个数组被用于Object.keys()、Object.getOwnPropertyNames()、Object.getOwnPropertySymbols()和Object.assign()4个方法，Object.assign()方法用数组来确定需要复制的属性

&emsp;&emsp;ownKeys陷阱通过Reflect.ownKeys()方法实现默认的行为，返回的数组中包含所有自有属性的键名，字符串类型和Symbol类型的都包含在内。Object.getOwnPropertyNames()方法和Object.keys()方法返回的结果将Symbol类型的属性名排除在外，Object.getOwnPropertySymbols()方法返回的结果将字符串类型的属性名排除在外。Object.assign()方法支持字符串和Symbol两种类型

&emsp;&emsp;ownKeys陷阱唯一接受的参数是操作的目标，返回值必须是一个数组或类数组对象，否则就抛出错误。当调用Object.keys()、Object.getOwnPropertyNames()、Object.getOwnPropertySymbols()或Object.assign()方法时，可以用ownKeys陷阱来过滤掉不想使用的属性键。假设不想引入任何以下划线字符(在JS中下划线符号表示字段是私有的)开头的属性名称，则可以用ownKeys陷阱过滤掉那些键

<div>
<pre>let proxy = new Proxy({}, {
    ownKeys(trapTarget) {
        return Reflect.ownKeys(trapTarget).filter(key =&gt; {
            return typeof key !== "string" || key[0] !== "_";
        });
    }
});
let nameSymbol = Symbol("name");
proxy.name = "proxy";
proxy._name = "private";
proxy[nameSymbol] = "symbol";
let names = Object.getOwnPropertyNames(proxy),
keys = Object.keys(proxy);
symbols = Object.getOwnPropertySymbols(proxy);
console.log(names.length); // 1
console.log(names[0]); // "name"
console.log(keys.length); // 1
console.log(keys[0]); // "name"
console.log(symbols.length); // 1
console.log(symbols[0]); // "Symbol(name)"</pre>
</div>

&emsp;&emsp;这个示例使用了一个ownKeys陷阱，它首先调用Reflect.ownKeys()获取目标的默认键列表；接下来，用filter()过滤掉以下划线字符开始的字符串。然后，将3个属性添加到proxy对象：name、_name和nameSymbol。调用Object.getOwnPropertyNames()和Object.Keys()时传入proxy， 只返回name属性；同样，调用Object.getOwnPropertySymbols()时传入proxy，只返回nameSymbol。由于_name属性被过滤掉了，因此它不出现在这两次结果中

&emsp;&emsp;尽管ownKeys代理陷阱可以修改一小部分操作返回的键，但不影响更常用的操作，例如for-of循环和Object.keys()方法，这些不能使用代理来更改。ownKeys陷阱也会影响for-in循环，当确定循环内部使用的键时会调用陷阱

【函数代理中的apply和construct陷阱】

&emsp;&emsp;所有代理陷阱中，只有apply和construct的代理目标是一个函数。函数有两个内部方法[[Call]]和[[Construct]]，apply陷阱和construct陷阱可以覆写这些内部方法。若使用new操作符调用函数，则执行[[Construct]]方法；若不用，则执行[[Construct]方法，此时会执行apply陷阱，它和Reflect.apply()都接受以下参数

<div>
<pre>trapTaqget 被执行的函数(代理的目标)
thisArg 函数被调用时内部this的值
argumentsList 传递给函数的参数数组</pre>
</div>

&emsp;&emsp;当使用new调用函数时调用的construct陷阱接受以下参数

<div>
<pre>trapTarget 被执行的函数(代理的目标)
argumentsList 传递给函数的参数数组</pre>
</div>

&emsp;&emsp;Reflect.construct()方法也接受这两个参数，其还有一个可选的第三个参数newTarget。若给定这个参数，则该参数用于指定函数内部new.target的值

&emsp;&emsp;有了apply和construct陷阱，可以完全控制任何代理目标函数的行为

<div>
<pre>let target = function() { return 42 },
proxy = new Proxy(target, {
    apply: function(trapTarget, thisArg, argumentList) {
        return Reflect.apply(trapTarget, thisArg, argumentList);
    },
    construct: function(trapTarget, argumentList) {
        return Reflect.construct(trapTarget, argumentList);
    }
});
// 使用了函数的代理，其目标对象会被视为函数
console.log(typeof proxy); // "function"
console.log(proxy()); // 42
var instance = new proxy();
console.log(instance instanceof proxy); // true
console.log(instance instanceof target); // true</pre>
</div>

&emsp;&emsp;在这里，有一个返回数字42的函数，该函数的代理分别使用apply陷阱和construct陷阱来将那些行为委托给Reflect.apply()方法和Reflect.construct()方法。最终结果是代理函数与目标函数完全相同，包括在使用typeof时将自己标识为函数。不用new调用代理时返回42，用new调用时创建一个instance对象，它同时是代理和目标的实例，因为instanceof通过原型链来确定此信息，而原型链查找不受代理影响，这也就是代理和目标好像有相同原型的原因

**验证函数参数**

&emsp;&emsp;apply陷阱和construct陷阱增加了一些可能改变函数执行方式的可能性，例如，假设验证所有参数都属于特定类型，则可以在apply陷阱中检查参数

<div>
<pre>// 将所有参数相加
function sum(...values) {
    return values.reduce((previous, current) =&gt; previous + current, 0);
}
let sumProxy = new Proxy(sum, {
    apply: function(trapTarget, thisArg, argumentList) {
        argumentList.forEach((arg) =&gt; {
        if (typeof arg !== "number") {
            throw new TypeError("All arguments must be numbers.");
        }
    });
        return Reflect.apply(trapTarget, thisArg, argumentList);
    },
    construct: function(trapTarget, argumentList) {
        throw new TypeError("This function can't be called with new.");
    }
});
console.log(sumProxy(1, 2, 3, 4)); // 10
// 抛出错误
console.log(sumProxy(1, "2", 3, 4));
// 同样抛出错误
let result = new sumProxy();</pre>
</div>

&emsp;&emsp;此示例使用apply陷阱来确保所有参数都是数字，sum()函数将所有传入的参数相加。如果传入非数字值，函数仍将尝试操作，可能导致意外结果发生。通过在sumProxy()代理中封装sum()，这段代码拦截了函数调用，并确保每个参数在被调用前一定是数字。为了安全起见，代码还使用construct陷阱来确保函数不会被new调用

&emsp;&emsp;还可以执行相反的操作，确保必须用new来调用函数并验证其参数为数字

<div>
<pre>function Numbers(...values) {
    this.values = values;
}
let NumbersProxy = new Proxy(Numbers, {
    apply: function(trapTarget, thisArg, argumentList) {
        throw new TypeError("This function must be called with new.");
    },
    construct: function(trapTarget, argumentList) {
        argumentList.forEach((arg) =&gt; {
            if (typeof arg !== "number") {
                throw new TypeError("All arguments must be numbers.");
            }
        });
        return Reflect.construct(trapTarget, argumentList);
    }
});
let instance = new NumbersProxy(1, 2, 3, 4);
console.log(instance.values); // [1,2,3,4]
// 抛出错误
NumbersProxy(1, 2, 3, 4);</pre>
</div>

&emsp;&emsp;在这个示例中，apply陷阱抛出一个错误，而construct陷阱使用Reflect.construct()方法来验证输入并返回一个新实例。当然，也可以不借助代理而用new.target来完成相同的事情

**不用new调用构造函数**

&emsp;&emsp;new.target元属性是用new调用函数时对该函数的引用，所以可以通过检查new.target的值来确定函数是否是通过new来调用的

<div>
<pre>function Numbers(...values) {
    if (typeof new.target === "undefined") {
        throw new TypeError("This function must be called with new.");
    }
    this.values = values;
}
let instance = new Numbers(1, 2, 3, 4);
console.log(instance.values); // [1,2,3,4]
// 抛出错误
Numbers(1, 2, 3, 4);</pre>
</div>

&emsp;&emsp;在这段代码中，不用new调用Numbers()会抛出一个错误。如果目标是防止用new调用函数，则这样编写代码比使用代理简单得多。但有时不能控制要修改行为的函数，在这种情况下，使用代理才有意义

&emsp;&emsp;假设Numbers()函数定义在无法修改的代码中，知道代码依赖new.target，希望函数避免检查却仍想调用函数。在这种情况下，用new调用时的行为已被设定，所以只能使用apply陷阱

<div>
<pre>function Numbers(...values) {
    if (typeof new.target === "undefined") {
        throw new TypeError("This function must be called with new.");
    }
    this.values = values;
}
let NumbersProxy = new Proxy(Numbers, {
    apply: function(trapTarget, thisArg, argumentsList) {
        return Reflect.construct(trapTarget, argumentsList);
    }
});
let instance = NumbersProxy(1, 2, 3, 4);
console.log(instance.values); // [1,2,3,4]</pre>
</div>

&emsp;&emsp;apply陷阱用传入的参数调用Reflect.construct()，就可以让Numbersproxy()函数无须使用new就能实现用new调用Numbers()的行为。Numbers()内部的new.target等于Numbers()，所以不会有错误抛出。尽管这个修改new.target的示例非常简单，但这样做显得更加直接

**覆写抽象基类构造函数**

&emsp;&emsp;进一步修改new.target，可以将第三个参数指定为Reflect.construct()作为赋值给new.target的特定值。这项技术在函数根据已知值检查new.target时很有用，例如创建抽象基类构造函数。在一个抽象基类构造函数中，new.target理应不同于类的构造函数，就像在这个示例中

<div>
<pre>class AbstractNumbers {
    constructor(...values) {
        if (new.target === AbstractNumbers) {
            throw new TypeError("This function must be inherited from.");
        }
        this.values = values;
    }
}
class Numbers extends AbstractNumbers {}
let instance = new Numbers(1, 2, 3, 4);
console.log(instance.values); // [1,2,3,4]
// 抛出错误
new AbstractNumbers(1, 2, 3, 4);</pre>
</div>

&emsp;&emsp;当调用new AbstractNumbers()时，new.Target等于AbstractNumbers并抛出一个错误。调用new Numbers()仍然有效，因为new.target等于Numbers。可以手动用代理给new.target赋值来绕过构造函数限制

<div>
<pre>class AbstractNumbers {
    constructor(...values) {
        if (new.target === AbstractNumbers) {
            throw new TypeError("This function must be inherited from.");
        }
        this.values = values;
    }
}
let AbstractNumbersProxy = new Proxy(AbstractNumbers, {
    construct: function(trapTarget, argumentList) {
        return Reflect.construct(trapTarget, argumentList, function() {});
    }
});
let instance = new AbstractNumbersProxy(1, 2, 3, 4);
console.log(instance.values); // [1,2,3,4]</pre>
</div>

&emsp;&emsp;AbstractNumbersProxy使用construct陷阱来拦截对new AbstractNumbersProxy()方法的调用。然后传入陷阱的参数来调用Reflect.construct()方法，并添加一个空函数作为第三个参数。这个空函数被用作构造函数内部new.target的值。由于new.target不等于AbstractNumbers，因此不会抛出错误，构造函数可以完全执行

**可调用的类构造函数**

&emsp;&emsp;必须用new来调用类构造函数，因为类构造函数的内部方法[[Call]]被指定来抛出一个错误。但是代理可以拦截对[[Call]]方法的调用，这意味着可以通过使用代理来有效地创建可调用类构造函数。例如，如果希望类构造函数不用new就可以运行，那么可以使用apply陷阱来创建一个新实例

<div>
<pre>class Person {
    constructor(name) {
        this.name = name;
    }
}
let PersonProxy = new Proxy(Person, {
    apply: function(trapTarget, thisArg, argumentList) {
        return new trapTarget(...argumentList);
    }
});
let me = PersonProxy("huochai");
console.log(me.name); // "huochai"
console.log(me instanceof Person); // true
console.log(me instanceof PersonProxy); // true</pre>
</div>

&emsp;&emsp;PersonProxy对象是Person类构造函数的代理，类构造函数是函数，所以当它们被用于代理时就像函数一样。apply陷阱覆写默认行为并返回trapTarget的新实例，该实例与pepson相等。用展开运算符将argumentList传递给trapTarget来分别传递每个参数。不使用new调用PersonProxy()可以返回一个person的实例，如果尝试不使用new调用person()，则构造函数将抛出一个错误。创建可调用类构造函数只能通过代理来进行

&nbsp;

### 可撤销代理

&emsp;&emsp;通常，在创建代理后，代理不能脱离其目标。但是可能存在希望撤销代理的情况，然后代理便失去效力。无论是出于安全目的通过API提供一个对象，还是在任意时间点切断访问，撤销代理都非常有用

&emsp;&emsp;可以使用proxy.revocable()方法创建可撤销的代理，该方法采用与Proxy构造函数相同的参数：目标对象和代理处理程序，返回值是具有以下属性的对象

<div>
<pre>proxy 可被撤销的代理对象
revoke 撤销代理要调用的函数</pre>
</div>

&emsp;&emsp;当调用revoke()函数时，不能通过proxy执行进一步的操作。任何与代理对象交互的尝试都会触发代理陷阱抛出错误

<div>
<pre>let target = {
    name: "target"
};
let { proxy, revoke } = Proxy.revocable(target, {});
console.log(proxy.name); // "target"
revoke();
// 抛出错误
console.log(proxy.name);</pre>
</div>

&emsp;&emsp;此示例创建一个可撤销代理，它使用解构功能将proxy和revoke变量赋值给Proxy.revocable()方法返回的对象上的同名属性。之后，proxy对象可以像不可撤销代理对象一样使用。因此proxy.name返回"target"，因为它直接透传了target.name的值。然而，一旦revoke()函数被调用，代理不再是函数，尝试访问proxy.name会抛出一个错误，正如任何会触发代理上陷阱的其他操作一样

&nbsp;

### 模仿数组

&emsp;&emsp;在ES6出现以前，开发者不能在JS中完全模仿数组的行为。而ES6中的代理和反射API可以用来创建一个对象，该对象的行为与添加和删除属性时内建数组类型的行为相同

<div>
<pre>let colors = ["red", "green", "blue"];
console.log(colors.length); // 3
colors[3] = "black";
console.log(colors.length); // 4
console.log(colors[3]); // "black"
colors.length = 2;
console.log(colors.length); // 2
console.log(colors[3]); // undefined
console.log(colors[2]); // undefined
console.log(colors[1]); // "green"</pre>
</div>

&emsp;&emsp;此示例中有两个特别重要的行为

&emsp;&emsp;1、当给colors[3]赋值时，length属性的值增加到4

&emsp;&emsp;2、当length属性被设置为2时，数组中最后两个元素被删除

&emsp;&emsp;要完全重造内建数组，只需模拟上述两种行为。下面=将讲解如何创建一个能正确模仿这些行为的对象

【检测数组索引】

&emsp;&emsp;为整数属性键赋值是数组才有的特例，因为它们与非整数键的处理方式不同。要判断一个属性是否是一个数组索引，可以参考ES6规范提供的以下说明

&emsp;&emsp;当且仅当ToString(ToUint32(P))等于P，并且ToUint32(P)不等于2<sup>32</sup>-1时，字符串属性名称P才是一个数组索引

&emsp;&emsp;此操作可以在JS中实现，如下所示

<div>
<pre>function toUint32(value) {
    return Math.floor(Math.abs(Number(value))) % Math.pow(2, 32);
}
function isArrayIndex(key) {
    let numericKey = toUint32(key);
    return String(numericKey) == key &amp;&amp; numericKey &lt; (Math.pow(2, 32) - 1);
}</pre>
</div>

&emsp;&emsp;toUint32()函数通过规范中描述的算法将给定的值转换为无符号32位整数；isArrayIndex()函数先将键转换为uint32结构，然后进行一次比较以确定这个键是否是数组索引。有了这两个实用函数，就可以开始实现一个模拟内建数组的对象

【添加新元素时增加length的值】

&emsp;&emsp;之前描述的数组行为都依赖属性赋值，只需用set代理陷阱即可实现之前提到的两个行为。请看以下这个示例，当操作的数组索引大于length-1时，length属性也一同增加，这实现了两个特性中的前一个

<div>
<pre>function toUint32(value) {
    return Math.floor(Math.abs(Number(value))) % Math.pow(2, 32);
}
function isArrayIndex(key) {
    let numericKey = toUint32(key);
    return String(numericKey) == key &amp;&amp; numericKey &lt; (Math.pow(2, 32) - 1);
}
function createMyArray(length=0) {
    return new Proxy({ length }, {
        set(trapTarget, key, value) {
            let currentLength = Reflect.get(trapTarget, "length");
            // 特殊情况
            if (isArrayIndex(key)) {
                let numericKey = Number(key);
                if (numericKey &gt;= currentLength) {
                    Reflect.set(trapTarget, "length", numericKey + 1);
                }
            }
            // 无论键的类型是什么，都要执行这行代码
            return Reflect.set(trapTarget, key, value);
        }
    });
}
let colors = createMyArray(3);
console.log(colors.length); // 3
colors[0] = "red";
colors[1] = "green";
colors[2] = "blue";
console.log(colors.length); // 3
colors[3] = "black";
console.log(colors.length); // 4
console.log(colors[3]); // "black"</pre>
</div>

&emsp;&emsp;这段代码用set代理陷阱来拦截数组索引的设置过程。如果键是数组索引，则将其转换为数字，因为键始终作为字符串传递。接下来，如果该数值大于或等于当前长度属性，则将length属性更新为比数字键多1(设置位置3意味着length必须是4)。然后，由于希望被设置的属性能够接收到指定的值，因此调用Reflect.set()通过默认行为来设置该属性

&emsp;&emsp;调用createMyArray()并传入3作为length的值来创建最初的自定义数组，然后立即添加这3个元素的值，在此之前length属性一直是3，直到把位置3赋值为值"black"时，length才被设置为4

【减少length的值来删除元素】

&emsp;&emsp;仅当数组索引大于等于length属性时才需要模拟第一个数组特性，第二个特性与之相反，即当length属性被设置为比之前还小的值时会移除数组元素。这不仅涉及长度属性的改变，还要删除原本可能存在的元素。例如有一个长度为4的数组，如果将length属性设置为2，则会删除位置2和3中的元素。同样可以在set代理陷阱中完成这个操作，这不会影响到第一个特性。以下示例在之前的基础上更新了createMyArray方法

<div>
<pre>function toUint32(value) {
    return Math.floor(Math.abs(Number(value))) % Math.pow(2, 32);
}
function isArrayIndex(key) {
    let numericKey = toUint32(key);
    return String(numericKey) == key &amp;&amp; numericKey &lt; (Math.pow(2, 32) - 1);
}
function createMyArray(length=0) {
    return new Proxy({ length }, {
        set(trapTarget, key, value) {
            let currentLength = Reflect.get(trapTarget, "length");
            // 特殊情况
            if (isArrayIndex(key)) {
                let numericKey = Number(key);
                if (numericKey &gt;= currentLength) {
                    Reflect.set(trapTarget, "length", numericKey + 1);
                }
            } else if (key === "length") {
                if (value &lt; currentLength) {
                    for (let index = currentLength - 1; index &gt;= value; index--) {
                        Reflect.deleteProperty(trapTarget, index);
                    }
                }
            }
            // 无论键的类型是什么，都要执行这行代码
            return Reflect.set(trapTarget, key, value);
        }
    });
}
let colors = createMyArray(3);
console.log(colors.length); // 3
colors[0] = "red";
colors[1] = "green";
colors[2] = "blue";
colors[3] = "black";
console.log(colors.length); // 4
colors.length = 2;
console.log(colors.length); // 2
console.log(colors[3]); // undefined
console.log(colors[2]); // undefined
console.log(colors[1]); // "green"
console.log(colors[0]); // "red"</pre>
</div>

&emsp;&emsp;该代码中的set代理陷阱检查key是否为"length"，以便正确调整对象的其余部分。当开始检查时，首先用Reflect.get()获取当前长度值，然后与新的值进行比较，如果新值比当前长度小，则通过一个for循环删除目标上所有不再可用的属性，fop循环从后往前从当前数组长度(current Length)处开始删除每个属性，直到到达新的数组长度(value)为止

&emsp;&emsp;此示例为colors添加了4种颜色，然后将它的length属性设置为2，位于位置2和3的元素被移除，因此尝试访问它们时返回的是undefined。length属性被正确设置为2，位置0和1中的元素仍可访问

&emsp;&emsp;实现了这两个特性，就可以很轻松地创建一个模仿内建数组特性的对象了。但创建一个类来封装这些特性是更好的选择，所以下一步用一个类来实现这个功能

【实现MyArray类】

&emsp;&emsp;想要创建使用代理的类，最简单的方法是像往常一样定义类，然后在构造函数中返回一个代理，那样的话，当类实例化时返回的对象是代理而不是实例(构造函数中this的值是该实例)。实例成为代理的目标，代理则像原本的实例那样被返回。实例完全私有化，除了通过代理间接访问外，无法直接访问它

&emsp;&emsp;下面是从一个类构造函数返回一个代理的简单示例

<div>
<pre>class Thing {
    constructor() {
        return new Proxy(this, {});
    }
}
let myThing = new Thing();
console.log(myThing instanceof Thing); // true</pre>
</div>

&emsp;&emsp;在这个示例中，类Thing从它的构造函数中返回一个代理，代理的目标是this，所以即使myThing是通过调用Thing构造函数创建的，但它实际上是一个代理。由于代理会将它们的特性透传给目标，因此myThing仍然被认为是Thing的一个实例，故对任何使用Thing类的人来说代理是完全透明的

&emsp;&emsp;从构造函数中可以返回一个代理，理解这个概念后，用代理创建一个自定义数组类就相对简单了。其代码与之前"减少length的值来删除元素"的代码大部分是一样的，可以使用相同的代理代码，但这次需要把它放在一个类构造函数中。下面是完整的示例

<div>
<pre>function toUint32(value) {
    return Math.floor(Math.abs(Number(value))) % Math.pow(2, 32);
}
function isArrayIndex(key) {
    let numericKey = toUint32(key);
    return String(numericKey) == key &amp;&amp; numericKey &lt; (Math.pow(2, 32) - 1);
}
class MyArray {
    constructor(length=0) {
        this.length = length;
        return new Proxy(this, {
            set(trapTarget, key, value) {
                let currentLength = Reflect.get(trapTarget, "length");
                // 特殊情况
                if (isArrayIndex(key)) {
                    let numericKey = Number(key);
                    if (numericKey &gt;= currentLength) {
                        Reflect.set(trapTarget, "length", numericKey + 1);
                    }
                } else if (key === "length") {
                    if (value &lt; currentLength) {
                        for (let index = currentLength - 1; index &gt;= value; index--) {
                            Reflect.deleteProperty(trapTarget, index);
                        }
                    }
                }
                // 无论键的类型是什么，都要执行这行代码
                return Reflect.set(trapTarget, key, value);
            }
        });
    }
}
let colors = new MyArray(3);
console.log(colors instanceof MyArray); // true
console.log(colors.length); // 3
colors[0] = "red";
colors[1] = "green";
colors[2] = "blue";
colors[3] = "black";
console.log(colors.length); // 4
colors.length = 2;
console.log(colors.length); // 2
console.log(colors[3]); // undefined
console.log(colors[2]); // undefined
console.log(colors[1]); // "green"
console.log(colors[0]); // "red"</pre>
</div>

&emsp;&emsp;这段代码创建了一个MyArray类，从它的构造函数返回一个代理。length属性被添加到构造函数中，初始化为传入的值或默认值0，然后创建代理并返回。colors变量看起来好像只是MyArray的一个实例，并实现了数组的两个关键特性

&emsp;&emsp;虽然从类构造函数返回代理很容易，但这也意味着每创建一个实例都要创建一个新代理。然而，有一种方法可以让所有实例共享一个代理：将代理用作原型

&nbsp;

### 将代理用作原型

&emsp;&emsp;如果代理是原型，仅当默认操作继续执行到原型上时才会调用代理陷阱，这会限制代理作为原型的能力

<div>
<pre>let target = {};
let newTarget = Object.create(new Proxy(target, {
    // 永远不会被调用
    defineProperty(trapTarget, name, descriptor) {
        // 如果被调用就会引发错误
        return false;
    }
}));
Object.defineProperty(newTarget, "name", {
    value: "newTarget"
});
console.log(newTarget.name); // "newTarget"
console.log(newTarget.hasOwnProperty("name")); // true</pre>
</div>

&emsp;&emsp;创建newTarget对象，它的原型是一个代理。由于代理是透明的，用target作为代理的目标实际上让target成为newTarget的原型。现在，仅当newTarget上的操作被透传给目标时才会调用代理陷阱

&emsp;&emsp;调用Object.defineProperty()方法并传入newTarget来创建一个名为name的自有属性。在对象上定义属性的操作不需要操作对象原型，所以代理中的defineProperty陷阱永远不会被调用，name作为自有属性被添加到newTarget上

&emsp;&emsp;尽管代理作为原型使用时极其受限，但有几个陷阱却仍然有用

【在原型上使用get陷阱】

&emsp;&emsp;调用内部方法[[Get]]读取属性的操作先查找自有属性，如果未找到指定名称的自有属性，则继续到原型中查找，直到没有更多可以查找的原型过程结束

&emsp;&emsp;如果设置一个get代理陷阱，则每当指定名称的自有属性不存在时，又由于存在以上过程，往往会调用原型上的陷阱。当访问我们不能保证存在的属性时，则可以用get陷阱来预防意外的行为。只需创建一个对象，在尝试访问不存在的属性时抛出错误即可

<div>
<pre>let target = {};
let thing = Object.create(new Proxy(target, {
    get(trapTarget, key, receiver) {
        throw new ReferenceError(`${key} doesn't exist`);
    }
}));
thing.name = "thing";
console.log(thing.name); // "thing"
// 抛出错误
let unknown = thing.unknown;</pre>
</div>

&emsp;&emsp;在这段代码中，用一个代理作为原型创建了thing对象，当调用它时，如果其上不存在给定的键，那么get陷阱会抛出错误。由于thing.name属性存在，故读取它的操作不会调用原型上的get陷阱，只有当访问不存在的thing.unknown属性时才会调用

&emsp;&emsp;当执行最后一行时，由于unknown不是thing的自有属性，因此该操作继续在原型上查找，之后get陷阱会抛出一个错误。在JS中，访问未知属性通常会静默返回undefined，这种抛出错误的特性(其他语言中的做法)非常有用

&emsp;&emsp;要明白，在这个示例中，理解trapTarget和receiver是不同的对象很重要。当代理被用作原型时，trapTarget是原型对象，receiver是实例对象。在这种情况下，trapTarget与target相等，receiver与thing相等，所以可以访问代理的原始目标和要操作的目标

【在原型上使用set陷阱】

&emsp;&emsp;内部方法[[Set]]同样会检查目标对象中是否含有某个自有属性，如果不存在则继续查找原型。当给对象属性赋值时，如果存在同名自有属性则赋值给它；如果不存在给定名称，则继续在原型上查找。最棘手的是，无论原型上是否存在同名属性，给该属性赋值时都将默认在实例(不是原型)中创建该属性

<div>
<pre>let target = {};
let thing = Object.create(new Proxy(target, {
    set(trapTarget, key, value, receiver) {
        return Reflect.set(trapTarget, key, value, receiver);
    }
}));
console.log(thing.hasOwnProperty("name")); // false
// 触发了 `set` 代理陷阱
thing.name = "thing";
console.log(thing.name); // "thing"
console.log(thing.hasOwnProperty("name")); // true
// 没有触发 `set` 代理陷阱
thing.name = "boo";
console.log(thing.name); // "boo"</pre>
</div>

&emsp;&emsp;在这个示例中，target一开始没有自有属性，对象thing的原型是一个代理，其定义了一个set陷阱来捕获任何新属性的创建。当thing.name被赋值为"thing"时，由于name不是thing的自有属性，故set代理陷阱会被调用。在陷阱中，trapTarget等于target，receiver等于thing。最终该操作会在thing上创建一个新属性，很幸运，如果传入receiver作为第4个参数，Reflect.set()就可以实现这个默认行为

&emsp;&emsp;一旦在thing上创建了name属性，那么在thing.name被设置为其他值时不再调用set代理陷阱，此时name是一个自有属性，所以[[Set]操作不会继续在原型上查找

【在原型上使用has陷阱】

&emsp;&emsp;回想一下has陷阱，它可以拦截对象中的in操作符。in操作符先根据给定名称搜索对象的自有属性，如果不存在，则沿着原型链依次搜索后续对象的自有属性，直到找到给定的名称或无更多原型为止

&emsp;&emsp;因此，只有在搜索原型链上的代理对象时才会调用has陷阱，而用代理作为原型时，只有当指定名称没有对应的自有属性时才会调用has陷阱

<div>
<pre>let target = {};
let thing = Object.create(new Proxy(target, {
    has(trapTarget, key) {
        return Reflect.has(trapTarget, key);
    }
}));
// 触发了 `has` 代理陷阱
console.log("name" in thing); // false
thing.name = "thing";
// 没有触发 `has` 代理陷阱
console.log("name" in thing); // true</pre>
</div>

&emsp;&emsp;这段代码在thing的原型上创建了一个has代理陷阱，由于使用in操作符时会自动搜索原型，因此这个has陷阱不像get陷阱和set陷阱一样再传递一个receiver对象，它只操作与target相等的trapTarget。在此示例中，第一次使用in操作符时会调用has陷阱，因为属性name不是thing的自有属性；而给thing.name赋值时会再次使用in操作符，这一次不会调用has陷阱，因为name已经是thing的自有属性了，故不会继续在原型中查找

【将代理用作类的原型】

&emsp;&emsp;由于类的prototype属性是不可写的，因此不能直接修改类来使用代理作为类的原型。然而，可以通过继承的方法来让类误以为自己可以将代理用作自己的原型。首先，需要用构造函数创建一个ES5风格的类型定义

<div>
<pre>function NoSuchProperty() {
    // empty
}
NoSuchProperty.prototype = new Proxy({}, {
    get(trapTarget, key, receiver) {
        throw new ReferenceError(`${key} doesn't exist`);
    }
});
let thing = new NoSuchProperty();
// 由于 `get` 代理陷阱而抛出了错误
let result = thing.name;</pre>
</div>

&emsp;&emsp;NoSuchProperty表示类将继承的基类，函数的prototype属性没有限制，于是可以用代理将它重写。当属性不存在时会通过get陷阱来抛出错误，thing对象作为NoSuchProperty的实例被创建，被访问的属性name不存在于是抛出错误

&emsp;&emsp;下一步是创建一个从NoSuchProperty继承的类

<div>
<pre>function NoSuchProperty() {
    // empty
}
NoSuchProperty.prototype = new Proxy({}, {
    get(trapTarget, key, receiver) {
        throw new ReferenceError(`${key} doesn't exist`);
    }
});
class Square extends NoSuchProperty {
    constructor(length, width) {
        super();
        this.length = length;
        this.width = width;
    }
}
let shape = new Square(2, 6);
let area1 = shape.length * shape.width;
console.log(area1); // 12
// 由于 "wdth" 不存在而抛出了错误
let area2 = shape.length * shape.wdth;</pre>
</div>

&emsp;&emsp;Square类继承自NoSuchProperty，所以它的原型链中包含代理。之后创建的shape对象是Square的新实例，它有两个自有属性length和width。读取这两个属性的值时不会调用get代理陷阱，只有当访问shape对象上不存在的属性时(例如shape.wdth，很明显这是一个错误拼写)才会触发get代理陷阱并抛出一个错误。另一方面这也说明代理确实在shape对象的原型链中。但是有一点不太明显的是，代理不是shape对象的直接原型，实际上它位于shape对象的原型链中，需要几个步骤才能到达

<div>
<pre>function NoSuchProperty() {
    // empty
}
// 对于将要用作原型的代理，存储对其的一个引用
let proxy = new Proxy({}, {
    get(trapTarget, key, receiver) {
        throw new ReferenceError(`${key} doesn't exist`);
    }
});
NoSuchProperty.prototype = proxy;
class Square extends NoSuchProperty {
    constructor(length, width) {
        super();
        this.length = length;
        this.width = width;
    }
}
let shape = new Square(2, 6);
let shapeProto = Object.getPrototypeOf(shape);
console.log(shapeProto === proxy); // false
let secondLevelProto = Object.getPrototypeOf(shapeProto);
console.log(secondLevelProto === proxy); // true</pre>
</div>

&emsp;&emsp;在这一版代码中，为了便于后续识别，代理被存储在变量proxy中。shape的原型Shape.prototype不是一个代理，但是shape.prototype的原型是继承自NoSuchProperty的代理

&emsp;&emsp;通过继承在原型链中额外增加另一个步骤非常重要，因为需要经过额外的一步才能触发代理中的get陷阱。如果Shape.prototype有一个属性，将会阻止get代理陷阱被调用

<div>
<pre>function NoSuchProperty() {
    // empty
}
NoSuchProperty.prototype = new Proxy({}, {
    get(trapTarget, key, receiver) {
        throw new ReferenceError(`${key} doesn't exist`);
    }
});
class Square extends NoSuchProperty {
    constructor(length, width) {
        super();
        this.length = length;
        this.width = width;
    }
    getArea() {
        return this.length * this.width;
    }
}
let shape = new Square(2, 6);
let area1 = shape.length * shape.width;
console.log(area1); // 12
let area2 = shape.getArea();
console.log(area2); // 12
// 由于 "wdth" 不存在而抛出了错误
let area3 = shape.length * shape.wdth;</pre>
</div>

&emsp;&emsp;在这里，Square类有一个getArea()方法，这个方法被自动地添加到Square.prototype，所以当调用shape.getArea()时，会先在shape实例搜索getArea()方法然后再继续在它的原型中搜索。由于getArea()是在原型中找到的，搜索结束，代理没有被调用

