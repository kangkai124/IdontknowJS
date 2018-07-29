const puppeteer = require('puppeteer')
const readlineSync = require('readline-sync')


// const url = 'http://my.kdslife.com/topic_547080809_1.html'

const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
})

const url = readlineSync.question('input url: \n')
if (!url) throw new Error('no valiated url')

;(async () => {
  console.log('Start visit the target page')
  console.log('waiting...')

  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false
  })

  const page = await browser.newPage()
  await page.goto(url, {
    waitUntil: 'networkidle2'
  })

  await sleep(1000)

  await page.waitForSelector('.mHthemeList')

  const result = await page.evaluate(() => {
    var $ = window.$
    var targets = $('.mHthemeList li h4 a')
    var list = []
    targets.each((index, item) => {
      list.push({
        url: item.href,
        text: item.innerHTML
      })
    })
    return list
  })
  browser.close()

  console.log(result)

  require('./image')(result, url)
})()