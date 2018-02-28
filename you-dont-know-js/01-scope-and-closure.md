### 作用域

**作用域**是一套规则，用于确定在何处以及如何查找变量（标识符）。

LSH 查询（左），赋值操作

RSH 查询（右），获取变量的值

= 操作符和调用函数传参操作都会导致关联作用域的赋值操作。

LHS 和 RHS 查询都从当前作用域开始，没有的话向上级作用域查找，直到最顶层全局作用域，无论找没找到都停止。

失败的 LHS 导致隐式地创建一个全局变量（非严格模式，严格模式抛出 ReferenceError 错误）。

失败的 RHS 直接抛出 ReferenceError 错误。



 JavaScript 引擎首先会在代码执行前对其进行编译，例如 var a = 2

1. var a ，在其作用域中声明新变量，代码执行前进行。
2. a = 2 ，LSH 查询变量 a 并对其赋值。

### 函数作用域

外部作用域无法访问到函数内部的任何内容。

```js
 foo1 () {
   var a = 3;
   console.log(a);
 }
 foo1()
```

声明具名函数两个缺点：函数名污染所在作用域、需显式通过函数名调用。

但是 JavaScript 提供了解决方法：IIFE，立即执行函数表达式（Immediately Invoked Function Expression）如下：

```js
(function foo2 () {
    var a = 2;
    console.log(a);
})()
```

foo2 函数会被当做函数表达式来处理，而不是标准的函数声明。

如何区分函数声明和函数表达式：

看 function 关键字出现在声明中的位置（整个声明中的位置），如果 function 是第一个词，就是函数声明，否则就是函数表达式。

函数声明和函数表达式之间最重要的区别是**名称标识符将会绑定在何处**：

foo1 被绑定在所在作用域中，foo2 被绑定在函数表达式自身的函数中。

>  始终给函数表达式命名是一个最佳实践。

IIFE进阶用法，传参

```js
(function IIFE (global) {
  var a = 3;
  console.log(global.a);
})(window);
```

### 块作用域

let 关键字可以将变量绑定在任意的作用域中（通常是 { ... } 中）。

let 为其声明的变量隐式地创建了块作用域。

>  推荐显式地创建块作用域。

```js
{
  let a = 2;
  cosnole.log(a);   // 2
}
console.log(a);     // ReferenceError: a is not defined
```

块作用域有用的一点和 闭包和垃圾回收机制有关（见下面）。

### 提升

考虑一下两段代码

```js
// 代码1
 a = 2;
 var a;
 console.log(a);

// 代码2
 console.log(a);
 var a = 2;
```

答案：2、undefined

包括变量和函数在内的所有声明都会在任何代码被执行前首先被处理，函数优先提升。

第一个代码片段其实会被这样处理：

```js
var a;
a = 2;
console.log(2);
```

第二个代码片段：

```js
var a;
console.log(a);
a = 2;

```

函数声明会被提升，函数表达式不会被提升。

```js
foo();    // TypeError!!!
var foo = function () {
  //
}
```

变量标识符 foo 被提升，但是执行 foo() 时 foo = undefined，因此对undefined 进行函数调用而导致非法操作，抛出 TypeError 异常。

```js
foo();    // TypeError
bar();    // ReferenceError
var foo = function bar () { }
```

即使是具名的函数表达式，名称标识符在赋值之前也不能使用。