## 柯里化

把接收多个参数的函数变换成接收一个参数的函数，并且返回接收余下参数的新函数。

柯里化增加了函数的**适用性**，但也降低了函数的适用范围。

通用实现：

```js
function currying (fn) {
    var _args = [].slice.call(arguments, 1);
    return function () {
        var _inargs = [].slice.call(arguments);
        return fn.apply(null, _args.concat(_inargs));
    }
}
// es6
const currying = (fn, ...args) => (...newArgs) => fn(...args.concat(newArgs))
```

柯里化有三个常见的作用：**参数复用**、**延迟执行**、**提前返回**，如下：

### 参数复用

```js
var square = i => i * i;
var map = (handler, list) => list.map(handler);
// 普通函数
map(square, [1, 2, 3, 4, 5, 6]);
map(square, [10, 20, 30, 40, 50, 60]);

// 柯里化
var currying = (fn, ...args) => (...newArgs) => fn(...args.concat(newArgs))
var mapSquare = currying(map, square);
squareMap([1, 2, 3, 4, 5, 6]);
squareMap([10, 20, 30, 40, 50, 60]);
```

普通函数每次都需要执行 map 和 square 两个函数，而进行柯里化之后，复用了 map 和 square 两个参数。