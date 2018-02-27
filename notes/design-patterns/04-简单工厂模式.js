/************************************
 * 简单工厂模式：
 * 又叫静态工厂模式，由一个工厂对象决定创建某一种产品对象类的实例。
 * 主要创建同一类对象。
 ***********************************/

/***********************************
 * before
 ***********************************/
var LoginAlert = function (text) {
  this.content = text
}
LoginAlert.prototype.show = function () {
  // alert logic
}
var userNameAlert = new LoginAlert('用户名不能超过12个字母')
userNameAlert.show()

var LoginConfirm = function (text) {
  this.content = text
}
LoginConfirm.prototype.show = function () {
  // confirm logic
}
var userNameConfirm = new LoginConfirm('改用户名不存在')
userNameConfirm.show()

var LoginPrompt = function (text) {
  this.content = text
}
LoginPrompt.prototype.show = function () {
  // prompt logic
}
var userNamePrompt = new LoginPrompt('欢迎回来')
userNamePrompt.show()

/***********************************
 * after
 * 需要什么告诉工厂函数即可，无需再找具体的类。
 * 优化：一下三个类有很多相似之处，仍然可以抽取出来共用，用简单工厂实现。
 ***********************************/
var PopFactory = function (name, text) {
  switch (name) {
    case 'alert':
      return new LoginAlert(text)
    case 'confirm':
      return new LoginConfirm(text)
    case 'prompt':
      return new LoginPrompt(text)
  }
}
var userNameAlert = PopFactory('alert', '用户名不能超过12个字母')
userNameAlert.show()
var userNameConfirm = PopFactory('confirm', '改用户名不存在')
userNameConfirm.show()
var userNamePrompt = PopFactory('prompt', '欢迎回来')
userNamePrompt.show()

var createPop = function (type, text) {
  var o = new Object ()
  o.content = text
  o.show = function () {
    // show
  }
  if (type === 'alert') {
    // alert
  }
  if (type === 'confirm') {
    // confirm
  }
  if (type === 'prompt') {
    // prompt
  }
  return o
}

var userNameAlert = createPop('alert', '用户名不能超过12个字母')
userNameAlert.show()

/***********************************
 * 如果需求随时在变，产品类也可能随时在增加，如果继续使用简单工厂，就不可避免的要去修改工厂类的代码。
 * 要解决这个问题，就需要工厂方法模式。
 ***********************************/
