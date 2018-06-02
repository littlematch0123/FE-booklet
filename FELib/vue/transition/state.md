# Vue过渡状态

&emsp;&emsp;Vue 的过渡系统提供了非常多简单的方法设置进入、离开和列表的动效。那么对于数据元素本身的动效呢？包括数字和运算、颜色的显示、SVG 节点的位置、元素的大小和其他的属性等。所有的原始数字都被事先存储起来，可以直接转换到数字。做到这一步，我们就可以结合 Vue 的响应式和组件系统，使用第三方库来实现切换元素的过渡状态

&nbsp;

### 状态动画

&emsp;&emsp;通过watcher，能监听到任何数值属性的数值更新
<!-- {% raw %} -->
<div>
<pre>&lt;div id="animated-number-demo"&gt;
  &lt;input v-model.number="number" type="number" step="20"&gt;
  &lt;p&gt;{{ animatedNumber }}&lt;/p&gt;
&lt;/div&gt;
&lt;script src="Tween.js"&gt;&lt;/script&gt;
&lt;script src="vue.js"&gt;&lt;/script&gt; 
&lt;script&gt;
new Vue({
  el: '#animated-number-demo',
  data: {
    number: 0,
    animatedNumber: 0
  },
  watch: {
    number: function(newValue, oldValue) {
      var vm = this;
      function animate () {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }
      new TWEEN.Tween({ tweeningNumber: oldValue })
        .easing(TWEEN.Easing.Quadratic.Out)
        .to({ tweeningNumber: newValue }, 500)
        .onUpdate(function () {
          vm.animatedNumber = this.tweeningNumber.toFixed(0)
        })
        .start();
      animate()
    }
  }
})    
&lt;/script&gt;  </pre>
</div>
<!-- {% endraw %} -->
<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/vue/transition/t33.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;当把数值更新时，就会触发动画。这个是一个不错的演示，但是对于不能直接像数字一样存储的值，比如 CSS 中的 color 的值，通过下面的例子来通过 Color.js 实现一个例子：
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;input v-model="colorQuery" @keyup.enter="updateColor" placeholder="Enter a color"&gt;
  &lt;button @click="updateColor"&gt;Update&lt;/button&gt;
  &lt;p&gt;Preview:&lt;/p&gt;
  &lt;span :style="{ backgroundColor: tweenedCSSColor }" style="display: inline-block;width: 50px;height: 50px;"&gt;&lt;/span&gt;
  &lt;p&gt;{{ tweenedCSSColor }}&lt;/p&gt;
&lt;/div&gt;
&lt;script src="Tween.js"&gt;&lt;/script&gt;
&lt;script src="vue.js"&gt;&lt;/script&gt; 
&lt;script src="color.js"&gt;&lt;/script&gt;
&lt;script&gt;
var Color = net.brehaut.Color
new Vue({
  el: '#example',
  data: {
    colorQuery: '',
    color: {
      red: 0,
      green: 0,
      blue: 0,
      alpha: 1
    },
    tweenedColor: {}
  },
  created: function () {
    this.tweenedColor = Object.assign({}, this.color)
  },
  watch: {
    color: function () {
      function animate () {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }
      new TWEEN.Tween(this.tweenedColor)
        .to(this.color, 750)
        .start()
      animate()
    }
  },
  computed: {
    tweenedCSSColor: function () {
      return new Color({
        red: this.tweenedColor.red,
        green: this.tweenedColor.green,
        blue: this.tweenedColor.blue,
        alpha: this.tweenedColor.alpha
      }).toCSS()
    }
  },
  methods: {
    updateColor: function () {
      this.color = new Color(this.colorQuery).toRGB()
      this.colorQuery = ''
    }
  }
})
&lt;/script&gt;  </pre>
</div>
<!-- {% endraw %} -->
<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/vue/transition/t34.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 动态状态转换

&emsp;&emsp;就像 Vue 的过渡组件一样，数据背后状态转换会实时更新，这对于原型设计十分有用。当修改一些变量，即使是一个简单的 SVG 多边形也可以实现很多难以想象的效果
<!-- {% raw %} -->
<div>
<pre>&lt;style&gt;
svg,input[type="range"]{display:block;}    
&lt;/style&gt;
&lt;div id="app"&gt;
  &lt;svg width="200" height="200"&gt;
    &lt;polygon :points="points" fill="#41B883"&gt;&lt;/polygon&gt;
    &lt;circle cx="100" cy="100" r="90" fill=" transparent" stroke="#35495E"&gt;&lt;/circle&gt;
  &lt;/svg&gt;
  &lt;label&gt;Sides: {{ sides }}&lt;/label&gt;
  &lt;input  type="range" min="3"  max="500" v-model.number="sides"&gt;
  &lt;label&gt;Minimum Radius: {{ minRadius }}%&lt;/label&gt;
  &lt;input  type="range"  min="0"  max="90"  v-model.number="minRadius"&gt;
  &lt;label&gt;Update Interval: {{ updateInterval }} milliseconds&lt;/label&gt;
  &lt;input  type="range"  min="10"  max="2000" v-model.number="updateInterval"&gt;
&lt;/div&gt;
&lt;script type="text/javascript" src="vue.js"&gt;&lt;/script&gt;
&lt;script src="TweenLite.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
new Vue({
  el: '#app',
  data: function () {
    //默认有10条边
    var defaultSides = 10;
    //默认地，stats = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
    var stats = Array.apply(null, { length: defaultSides })
        .map(function () { return 100 })
    return {
        stats: stats,
        points: generatePoints(stats),
        sides: defaultSides,
        minRadius: 50,
        interval: null,
        updateInterval: 500
    }
  },
  watch: {
    sides: function (newSides, oldSides) {
        //计算设置的边数与默认的边数的差值
        var sidesDifference = newSides - oldSides
        //如果大于默认边数
        if (sidesDifference &gt; 0) {
            //增加相应数量的随机值到stats数组中
            for (var i = 1; i &lt;= sidesDifference; i++) {
                this.stats.push(this.newRandomValue())
            }
        }else{
            //否则，计算出差值
            var absoluteSidesDifference = Math.abs(sidesDifference)
            //从stats数组末尾减少相应数量的数组值
            for (var i = 1; i &lt;= absoluteSidesDifference; i++) {
                this.stats.shift()
            }
        }
    },
    stats: function (newStats) {
        TweenLite.to(
            this.$data, 
            this.updateInterval / 1000, 
            { points: generatePoints(newStats) }
        )
    },
    updateInterval: function () {
        this.resetInterval()
    }
  },
  mounted: function () {
    this.resetInterval()
  },
  methods: {
    //将stats里面的值都变成50-100的随机值
    randomizeStats: function () {
        var vm = this
        this.stats = this.stats.map(function () {
        return vm.newRandomValue()
      })
    },
    newRandomValue: function () {
        //产生一个50-100的随机半径
        return Math.ceil(this.minRadius + Math.random() * (100 - this.minRadius))
    },
    //重启定时器
    resetInterval: function () {
        var vm = this;
        clearInterval(this.interval);
        this.randomizeStats();
        this.interval = setInterval(function () { 
         vm.randomizeStats();
        }, this.updateInterval)
    }
  }
})
function valueToPoint (value, index, total) {
  var x     = 0
  var y     = -value * 0.9
  var angle = Math.PI * 2 / total * index
  var cos   = Math.cos(angle)
  var sin   = Math.sin(angle)
  var tx    = x * cos - y * sin + 100
  var ty    = x * sin + y * cos + 100
  return { x: tx, y: ty }
}
//计算polygon中的路径点的值
function generatePoints (stats) {
    var total = stats.length
    return stats.map(function (stat, index) {
        var point = valueToPoint(stat, index, total)
        return point.x + ',' + point.y
  }).join(' ')
}
&lt;/script&gt;  </pre>
</div>
<!-- {% endraw %} -->
<iframe style="width: 100%; height: 360px;" src="https://demo.xiaohuochai.site/vue/transition/t35.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 组件组织过渡

&emsp;&emsp;管理太多的状态转换会很快的增加 Vue 实例或者组件的复杂性，幸好很多的动画可以提取到专用的子组件
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;input v-model.number="firstNumber" type="number" step="20"&gt; +
  &lt;input v-model.number="secondNumber" type="number" step="20"&gt; =
  {{ result }}
  &lt;p&gt;
    &lt;animated-integer :value="firstNumber"&gt;&lt;/animated-integer&gt; +
    &lt;animated-integer :value="secondNumber"&gt;&lt;/animated-integer&gt; =
    &lt;animated-integer :value="result"&gt;&lt;/animated-integer&gt;
  &lt;/p&gt;
&lt;/div&gt;
&lt;script type="text/javascript" src="vue.js"&gt;&lt;/script&gt;
&lt;script type="text/javascript" src="Tween.js"&gt;&lt;/script&gt;
&lt;script&gt;
Vue.component('animated-integer', {
  template: '&lt;span&gt;{{ tweeningValue }}&lt;/span&gt;',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data: function () {
    return {
      tweeningValue: 0
    }
  },
  watch: {
    value: function (newValue, oldValue) {
      this.tween(oldValue, newValue)
    }
  },
  mounted: function () {
    this.tween(0, this.value)
  },
  methods: {
    tween: function (startValue, endValue) {
      var vm = this;
      function animate () {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }
      new TWEEN.Tween({ tweeningValue: startValue })
        .to({ tweeningValue: endValue }, 500)
        .onUpdate(function () {
          vm.tweeningValue = this.tweeningValue.toFixed(0)
        })
        .start()
      animate()
    }
  }
})
new Vue({
  el: '#example',
  data: {
    firstNumber: 20,
    secondNumber: 40
  },
  computed: {
    result: function () {
      return this.firstNumber + this.secondNumber
    }
  }
})
&lt;/script&gt;  </pre>
</div>
<!-- {% endraw %} -->
<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/vue/transition/t36.html" frameborder="0" width="320" height="240"></iframe>

