##变量类型

###JS 的数据类型分类和判断

ECMAScript 定义了7种数据类型：

- 6 种**原始类型**：
  - Boolean
  - Null
  - Undefined
  - String
  - Number
  - Symbol
- 和 Object

> 类型判断用到哪些方法？

**typeof**   （undefined,boolean,number,string,object,function,symbol）

```js
typeof null    // 'object'
typeof [1, 2]  // 'object' 引用类型除了 function 其他都是 object
```

**instanceof**   用于实例和构造函数的对应

```js
[1, 2] instanceof Array    // true
```



## 原型和原型链

所有引用类型都具有对象特性

所有引用类型都有一个 `__proto__` 属性，属性值是一个普通的对象

所有的函数，都有一个 `prototype` 属性，属性值是一个普通的对象

所有引用类型，`__proto__` 属性值指向它的构造函数的 `prototype` 属性值

```js
// 要点一：自由扩展属性
var obj = {}; obj.a = 100;
var arr = []; arr.a = 100;
function fn () {}
fn.a = 100;

// 要点二：__proto__
console.log(obj.__proto__);
console.log(arr.__proto__);
console.log(fn.__proto__);

// 要点三：函数有 prototype
console.log(fn.prototype)

// 要点四：引用类型的 __proto__ 属性值指向它的构造函数的 prototype 属性值
console.log(obj.__proto__ === Object.prototype)
```

> 如何判断这个属性是不是对象本身的属性，而不是原型上的？

Object.prototype.hasOwnProperty()

### 原型链

> f.toString()

因为 `f` 本身没有 `toString()` ，并且 `f.__proto__` 中也没有 `toString`，那么继续去 `f.__proto__.__proto__` 中寻找（因为 `f.__proto__` 就是一个普通的对象而已）。

- `f.__proto__` 即 `Foo.prototype`，没有找到 `toString`，继续往上找
- `f.__proto__.__proto__` 即`Foo.prototype.__proto__` 。`Foo.prototype` 就是一个普通的对象，因此`Foo.prototype.__proto__` 就是`Object.prototype`，在这里可以找到 `toString`
- 因此 `f.toString` 最终对应到了 `Object.prototype.toString`

这样一直往上找，是一个链式的结构，所以叫做“原型链”。如果一直找到最上层都没有找到，那么就宣告失败，返回`undefined`。最上层是什么 —— `Object.prototype.__proto__ === null`





## 事件

事件绑定：

```js
// 通用的事件绑定函数
function bindEvent(elem, type, fn) {
    elem.addEventListener(type, fn)
}
```

### 事件冒泡

```html
<body>
    <div id="div1">
        <p id="p1">激活</p>
        <p id="p2">取消</p>
        <p id="p3">取消</p>
        <p id="p4">取消</p>
    </div>
    <div id="div2">
        <p id="p5">取消</p>
        <p id="p6">取消</p>
    </div>
</body>
```

对于以上 HTML 代码结构，要求点击`p1`时候进入激活状态，点击其他任何`<p>`都取消激活状态，如何实现？代码如下，注意看注释：

```js
var body = document.body
bindEvent(body, 'click', function (e) {
    // 所有 p 的点击都会冒泡到 body 上，因为 DOM 结构中 body 是 p 的上级节点，事件会沿着 DOM 树向上冒泡
    alert('取消')
})

var p1 = document.getElementById('p1')
bindEvent(p1, 'click', function (e) {
    e.stopPropagation() // 阻止冒泡
    alert('激活')
})
```

如果我们在`p1` `div1` `body`中都绑定了事件，它是会根据 DOM 的结构来冒泡，从下到上挨个执行的。但是我们使用`e.stopPropagation()`就可以阻止冒泡。



### 事件代理

- 代码简洁
- 减少浏览器内存占用

我们要监听`<a>`的事件，但要把具体的事件绑定到`<div>`上，然后看事件的触发点是不是`<a>`。

```js
function bindEvent(elem, type, selector, fn) {
    // 这样处理，可接收两种调用方式 bindEvent(div1, 'click', 'a', function () {...}) 和 bindEvent(div1, 'click', function () {...}) 这两种
    if (fn == null) {
        fn = selector
        selector = null
    }

    // 绑定事件
    elem.addEventListener(type, function (e) {
        var target
        if (selector) {
            // 有 selector 说明需要做事件代理
            // 获取触发时间的元素，即 e.target
            target = e.target
            // 看是否符合 selector 这个条件
            if (target.matches(selector)) {
                fn.call(target, e)
            }
        } else {
            // 无 selector ，说明不需要事件代理
            fn(e)
        }
    })
}

// 使用代理，bindEvent 多一个 'a' 参数
var div1 = document.getElementById('div1')
bindEvent(div1, 'click', 'a', function (e) {
    console.log(this.innerHTML)
})

// 不使用代理
var a = document.getElementById('a1')
bindEvent(div1, 'click', function (e) {
    console.log(a.innerHTML)
})
```

element.matches 用法：

```html
<div id="foo">This is the element!</div>
<script type="text/javascript">
    var el = document.getElementById("foo");
    if (el.mozMatchesSelector("div")) {
        alert("Match!");
    }
</script>
```



## HTTP

> HTTP 协议中，response 的状态码，常见的有哪些？

- 1xx 请求正在处理
- 2xx 成功
  - 200 OK
- 3xx 重定向
  - 301 永久重定向 http://example.com/sample	=> http://example.com/sample/
  - 302 临时重定向
  - 304 Not Modified
- 4xx 服务器无法处理请求
  - 400 Bad Request，应修改后再次请求
  - 403 权限
  - 404 Not Found
- 5xx 服务器出错



## 选择器的权重和优先级

1. 内联style
2. ID
3. class、属性选择器 `[attribute]`、伪类
4. 类型选择器 `div`、伪元素

*!important* 优先级最高，可覆盖行内样式。不可以添加到行内样式属性中。



## 清除浮动

> 手写 clearfix

```css
.clearfix:after {
    content: '';
    display: table;
    clear: both;
}
.clearfix {
    *zoom: 1; /* 兼容 IE 低版本 */
}
```



## 重绘与回流

**重绘**： 页面中样式的变化，如修改颜色、背景等，浏览器重新绘制样式

**回流**：DOM改变，浏览器重新渲染部分或全部文档

