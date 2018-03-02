var MyModules = (function Manager() {
  var modules = {};

  function define(name, deps, impl) {
    for (var i = 0; i < deps.length; i++) {
      // 对数组重新赋值，值为modules里对应的属性值
      // 不懂的话，在deps[i] = modules[deps[i]]前后打印一下deps,deps[i],modules,modules[deps[i]]即可明白
      deps[i] = modules[deps[i]];
    }
    // apply可以将多个参数以数组的形式传入
    modules[name] = impl.apply(impl, deps);
    console.log(modules)
  }

  function get(name) {
    return modules[name];
  }

  return {
    define,
    get
  }
})()

/**
 * 核心代码：modules[name] = impl.apply(impl, deps)
 * 为了模块的定义，引入了包装函数（可以传入任何依赖：deps），并且将返回值（如bar返回的{ hello: f hello(who) }）储存在一个
 * 根据名字来管理的模块列表（modules）中，和模块实例保持一致。
 */

MyModules.define('bar', [], function () {
  function hello(who) {
    return 'Let me introduce: ' + who;
  }
  return { hello }
})
// 此时Manager里的变量modules = { bar: { hello: f hello(who) }}

// foo 接收 bar 的实例作为依赖参数，并且能使用它
MyModules.define('foo', ['bar'], function (bar) {
  var hungry = 'hippo';

  function awesome(who) {
    console.log(bar.hello(hungry).toUpperCase())
    return 'Let me introduce ' + who + ' too';
  }
  return { awesome }
})
/**
 *此时Manager里的变量
 * modules = {
 *   bar: { hello: f hello(who) },
 *   foo: { awesome: f awesome(who) }
 * }
 */

MyModules.define('baz', ['bar', 'foo'], function (bar, foo) {
  var hungry = 'hippo';
  var hungry2 = 'hippo2'

  function wonder() {
    console.log(bar.hello(hungry).toUpperCase() + '\n' +foo.awesome(hungry2).toUpperCase())
  }
  return { wonder }
})
/**
 *此时Manager里的变量
 * modules = {
 *   bar: { hello: f hello(who) },
 *   foo: { awesome: f awesome(who) },
 *   baz: { wonder: f wonder() }
 * }
 */

 var bar = MyModules.get('bar')
 var foo = MyModules.get('foo')
 var baz = MyModules.get('baz')

 console.log(bar.hello('hippo'))
 foo.awesome()
 baz.wonder()
