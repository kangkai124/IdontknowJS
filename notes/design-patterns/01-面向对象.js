/**
 * Object-oriented programming 12-02-2018 16:08
 */

/********************************************
 *
 * stage 1  多个全局变量
 *
 *******************************************/

function output1 () {
  console.log(1)
}

function output2 () {
  console.log(2)
}

function output3 () {
  console.log(3)
}

/********************************************
 *
 * stage 2  对象
 *
 *******************************************/
const OutputObject = {
  output1: function () { ... },
  output2: function () { ... },
  output3: function () { ... }
}

const OutputObject = () => ({
  output1: function () { ... },
  output2: function () { ... },
  output3: function () { ... }
})
const a = OutputObject()
// 每次return的对象都是新的，但是和OutputObject没有联系
a.output1()

/********************************************
 *
 * stage 3  类
 *
 *******************************************/
 const OutputObject = function () {
   this.output1 = function () { ... }
   this.output2 = function () { ... }
   this.output3 = function () { ... }
 }
 const a = new OutputObject()
 a.output1()

const OutputObject = function () {}
OutputObject.prototype.output1 = fucntion () { ... }
OutputObject.prototype.output2 = fucntion () { ... }
OutputObject.prototype.output3 = fucntion () { ... }
// or
const OutputObject = function () {}
OutputObject.prototype = {
  output1: function () { ... },
  output2: function () { ... },
  output3: function () { ... }
}

// 链式调用
const OutputObject = function () {}
OutputObject.prototype = {
  output1: function () {
    ...
    return this
  },
  output2: function () {
    ...
    return this
  },
  output3: function () {
    ...
    return this
  }
}
const a = new OutputObject()
a.output1().output2().output3()

/****************************
 * stage 3.1  原生对象的扩展
 ***************************/
Function.prototype.addMethod = function (name, fn) {
  // 函数式调用
  this[name] = fn
  return this
}
const methods = function () {}
methods.addMethod('output1', function () {
  ...
  return this
})
.addMethod('output2', function () {
 ...
 return this
})
.addMethod('output3', function () {
 ...
 return this
})
methods.output1().output2().output3()

Function.prototype.addMethod = function (name, fn) {
  // 类式调用
  this.prototype[name] = fn
  return this
}
const Methods = function () {}
Methods.addMethod('output1', function () {
  ...
  return this
})
.addMethod('output2', function () {
 ...
 return this
})
const m = new Methods()
m.output1().output2()
