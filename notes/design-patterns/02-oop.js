/**
 * 面向对象编程  13-02-2018 10:39
 */

/************************************************************************
 * 封装
 * 1. 由于js的函数级作用域，声明在函数内部的变量和方法在外界是访问不到的，因此可以创建类的私有属性和方法。
 * 2. 内部通过this创建的属性和方法，实例化对象时，可以复制到新建的对象上，并可以在外部访问到，称为对象的公有属性和方法。
 * 3. 在公有方法中，其中的一些方法可以访问到类的私有属性和方法，因此看作是特权方法。
 * 4. 在实例化创建对象时，调用特权方法可以初始化实例对象的一些属性，因此可以看作是类的构造器。
 ***********************************************************************/
var Book = function (name, id, price) {
  // 1.私有属性和方法
  var privateNum
  var privateMethod = function () {
    console.log('I am private method')
  }
  // 2.公有属性和方法
  this.id = id
  this.price = price
  this.showPrice = function () {
    console.log(this.price)
  }
  // 3.特权方法
  this.getName = function () {
    console.log('get private name: ' + privateNum)
  }
  this.setName = function () {
    privateNum = 'private-' + name
  }
  this.showPrivateMethod = function () {
    privateMethod()
  }
  // 4.构造器
  this.setName(name)
}

/**
 * 5. 在类外面通过点语法定义的属性及名称叫做类的静态公有属性和静态公有方法，只能被类访问。
 * 6. 类通过prototype创建的属性和方法叫做公有属性和公有方法，可以被实例化的对象访问。
 */
 Book.isChinese = false
 Book.resetTime = function () {
   console.log('new time')
 }
Book.prototype = {
  isJsBook: false,
  display: function () {}
}

var book = new Book('js book', 1, 99 )
book.getName()                  // => get private name: private-js book
book.showPrice()                // => 99
book.showPrivateMethod()        // => I am private method
console.log(book.id)            // => 1
console.log(book.privateNum)    // => undefined
console.log(book.isJsBook)      // => undefined
console.log(Book.isJsBook)      // => false

/************************************************************************
 * 闭包
 ***********************************************************************/
var Book = (function () {
  var bookNum = 0
  function checkBook () {}

  function _book (newId, newName, newPrice) {
    // 安全模式
    if (this instanceof _book) {
      var name, price
      function checkId () {

      }

      this.getName = function () {}
      this.setName = function () {}
      this.getPrice = function () {}
      this.setPrice = function () {}

      this.id = newId

      bookNum++
      if (bookNum > 100) {
        throw new Error('>100')
      }

      this.setName(name)
      this.setPrice(price)
    } else {
      return new _book
    }
 }
 _book.prototype = {
   isJsBook: true,
   display: function () {}
 }
 return _book
})()
