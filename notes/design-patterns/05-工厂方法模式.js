/************************************
 * 工厂方法模式：
 * 通过对产品类的抽象使其创建业务主要负责用于创建多类产品的实例。
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
