
var batch = fn => (target, ...args) => {
  if (target.length >= 0) {
    return Array.from(target).map(item => fn.apply(this, [item, ...args]))
  } else {
    return fn.apply(this, [target, ...args])
  }
}

var setColor =  (el, color) => {
  el.style.color = color
}

var setFontSize = (el, fontSize) => {
  el.style.fontSize = fontSize
}

setColor = batch(setColor)
setFontSize = batch(setFontSize)

var items1 = document.querySelectorAll('ul >li:nth-child(2n + 1)')
var items2 = document.querySelectorAll('ul >li:nth-child(3n + 1)')

setColor(items1, 'red')
setColor(items2, 'green')
setFontSize(items3, '24px')
