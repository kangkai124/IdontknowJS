// 执行一次
function once (fn) {
  return function (...args) {
    if (fn) {
      var ret = fn.apply(this, args)
      fn = null
      return ret
    }
  }
}

// 节流
function throttle (fn, time = 500) {
  let timer
  return function (...args) {
    if (timer == null) {
      fn.apply(this, args)
      timer = setTimeout(() => {
        timer = nulll
      }, time)
    }
  }
}

// 限流
function limiting (fn, time = 500) {
  let timer = null
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, time)
  }
}
