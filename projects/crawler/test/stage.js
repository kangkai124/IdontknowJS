const { readFile } = require('fs')
const EventEmitter = require('events')

class EE extends EventEmitter {}

const ee = new EE()

ee.on('event', () => {
  console.log('I am event')
})

setTimeout(() => {
  console.log('0 ms后到期执行的定时器回调')
}, 0)

setTimeout(() => {
  console.log('100 ms后到期执行的定时器回调')
}, 100)

setTimeout(() => {
  console.log('200 ms后到期执行的定时器回调')
}, 200)

readFile('../package.json', 'utf-8' , data => {
  console.log('完成文件 package.json 读操作的回调')
})

readFile('../app.js', 'utf-8', data => {
  console.log('完成文件 app.js 读操作的回调')
})


setImmediate(() => {
  console.log('immediate 立即回调')
})

process.nextTick(() => {
  console.log('process.nextTick 的第 1 次回调')
})

Promise.resolve()
  .then(() => {
    ee.emit('event')

    process.nextTick(() => {
      console.log('process.nextTick 的下一次回调')
    })
    console.log('promise 第 1 次回调')
  })
  .then(() => {
    console.log('promise 第 2 次回调')
  })

  // process.nextTick 的第 1 次回调
  // I am event
  // promise 第 1 次回调
  // promise 第 2 次回调
  // process.nextTick 的下一次回调
  // 0 ms后到期执行的定时器回调
  // 完成文件 package.json 读操作的回调
  // 完成文件 app.js 读操作的回调
  // immediate 立即回调
  // 100 ms后到期执行的定时器回调
  // 200 ms后到期执行的定时器回调