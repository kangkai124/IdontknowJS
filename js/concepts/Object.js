/**
 * instanceof
 * 语法：object instanceof constructor
 * instanceof 运算符用来检测 constructor.prototype 是否存在于参数 object 的原型链上。注意是constructor.prototype!!!
 */
function A () {}
function B () {}

var o = new A()

o instanceof A    // true, 因为Object.getPrototypeOf(o) === A.prototype
o instanceof B    // false
o instanceof Object  // true, 因为Object.prototype.isPrototypeOf(o)返回true

A.prototype = {}
var o2 = new A()

o2 instanceof A   // true
o instanceof A    // false, 因为A.prototype指向了一个空对象，这个空对象不在o的原型链上
