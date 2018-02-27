/************************************
 * 工厂方法模式：
 * 通过对产品类的抽象使其创建业务主要负责用于创建多类产品的实例。
 * 解释：将不同的产品交给对应的工厂子类（工厂原型中）去实现，每个产品由负责生产的子工厂来创造。
 * 如果添加新的产品，只需要在工厂原型中添加新的工厂子类，不需要修改其他的工厂。
 ***********************************/

var Factory = function (type, content) {
  if (this instanceof Factory) {
    var s = new this[type](content)
    return s
  } else {
    return new Factory(type, content)
  }
}

Factory.prototype = {
  Java: function (content) {
    // java
  },
  JavaScript: function (content) {
    // javascript
  },
  UI: function (content) {
    // UI
  }
}

var data = [
  { type: 'Java', content: 'I am Java'},
  { type: 'JavaScript', content: 'I am JavaScript'},
  { type: 'UI', content: 'I am UI'}
]

data.forEach(e => {
  Factory(e.type, e.content)
})
