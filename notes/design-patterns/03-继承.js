/**
 * 每个类有三部分组成
 * 1. 构造函数内的，供实例化对象复制用
 * 2. 构造函数外的，点语法添加，供类使用
 * 3. 类的原型中，实例化对象通过原型链访问
 */

 /**
 * 类式继承
 * 方式：子类的prototype为父类的实例
 * why: 类的原型对象作用是为类的原型添加公有方法，单类不能直接访问，必须通过prototype访问。
 * 我们实例化父类时，新建的对象复制了父类构造函数的属性方法，并且通过原型访问到了父类原型上的属性方法。
 * 把这个新建的对象赋值给子类的原型，那么子类原型就能访问父类的原型属性和方法，和父类构造器中的属性和方法。
 *
 * 类式继承的缺点：
 * 1. 父类的公有属性如果是引用类型，子类的一个实例更改了父类的该属性，另一个子类的实例也会受到影响。如下。
 * 2. 实例化父类时无法对父类构造函数内的属性初始化。
 */
function F () {
  this.books = ['js', 'html', 'css']
}
function C () {}
C.prototype = new F()
var o1 = new C()
var o2 = new C()
o2.books   // ['js', 'html', 'css']
o1.books.push('added')
o2.books   // ['js', 'html', 'css', 'added']

/**
 * 构造函数式继承
 * F.call(this, id)是构造函数式继承的精华。
 * call可以改变函数的作用环境，在子类中，对F调用call就是将子类的变量在父类中执行了一遍。
 * 由于父类中给this绑定属性，因此子类就继承了父类的公有属性。
 * 缺点：没有涉及原型，因此父类的原型方法不会被继承。
 */
function F (id) {
  this.books = ['js', 'html', 'css']
  this.id = id
}
F.prototype.showBooks = function () { console.log(this.books) }
function C (id) {
  F.call(this, id)
}

var o1 = new C(0)
var o2 = new C(1)
o1.books.push('added')
o1.id     // 0
o1.books  // ['js', 'html', 'css', 'added']
o2.id     // 1
o2.books  // ['js', 'html', 'css']

/**
 * 组合式继承
 * 缺点：父类构造函数调用了两次：
 * 1. 构造函数式继承时
 * 2. 类式继承时
 */
function F (name) {
  this.name = name
  this.books = ['js', 'html', 'css']
}
F.prototype.getName = function () { console.log(this.name) }
function C (name, time) {
  F.call(this, name)
  this.time = time
}
C.prototype = new F()
C.prototype.getTime = function () { console.log(this.time) }

/**
 * 原型式继承
 * 过渡函数对象相当于类式继承中的子类，目的是为了创建要返回的新的实例化对象。
 * 随着对这种思想的深入，后来出现了Object.create()。
 * 缺点同样是父类对象中引用类型的属性被共用。
 */
function inheritObject (o) {
  // 过渡函数对象
  function F () {}
  F.prototype = o
  return new F()
}

/**
 * 寄生式继承
 * 对原型继承的二次封装，并且在此过程中对继承的对象进行了扩展。
 * 这样创建的对象不仅仅有父类中的属性和方法，还添加了新的属性和方法。
 */
function createBook (o) {
  var obj = new inheritObject(o)
  obj.getName = function () { console.log(name) }
  return obj
}


/**
 * 寄生组合式继承（寄生、构造函数）
 * C 子类
 * F 父类
 */
function inheritPrototype (C, F) {
  var p = inheritObject(F.prototype)
  p.constructor = C
  C.prototype = p
}
/**
 * 组合式继承中，通过构造函数继承的属性和方法是没有问题的，所以需要通过寄生继承父类的原型。
 * 我们需要的只是父类的原型，不需要父类的构造函数，因此拿到父类的原型副本即可。
 * 父类原型副本通过原型继承可以拿到，但是复制给p之后，p中的constructor指向的不是C子类对象。
 * 因此需要修复p的constructor为C,即p.constructor = C。
 * 然后将副本复制给C的原型，这样子类的原型就继承了父类的原型，并且没有执行父类的构造函数。
 */

// 定义父类
function F (name) {
  this.name = name
  this.books = ['js', 'html', 'css']
}
// 父类原型方法
F.prototype.getName = function () { console.log(this.naem) }
// 定义子类
function C (name, time) {
  F.call(this, name)
  this.time = time
}
// 寄生式继承父类原型
inheritPrototype(C, F)
// 子类新增原型方法
C.prototype.getTime = function () { console.log(this.time) }

var o1 = new C('o1', 'time1')
var o2 = new C('o2', 'time2')

o1.books.push('im new')
o1.books    // ["js", "html", "css", "im new"]
o2.books    // ["js", "html", "css"]
o2.getName  // 'o2'
o2.getTime  // 'time2'
