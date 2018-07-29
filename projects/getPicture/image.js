const puppeteer = require('puppeteer')
const download = require('download')

const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
})

module.exports = async (urls, title) => {
  console.log('go to image page...')

  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false
  })

  const page = await browser.newPage()

  for (let i = 0; i < urls.length; i++) {
    if (typeof urls[i].url !== 'string') continue
    await page.goto(urls[i].url, {
      waitUntil: 'networkidle2'
    })

    await sleep(1000)

    await page.waitForSelector('.reply_message')

    const result = await page.evaluate(() => {
      var $ = window.$
      var targets = $('.reply_message a')
      var list = []
      targets.each((index, item) => {
        var href = item.href
        var imageUrl = href.split('src=')[1]
        list.push(imageUrl)
      })
      return list
    })

    // console.log(result)

    result.forEach(r => {
      if (typeof r === 'string'){
        console.log(r)
      download(r, `./${title.split('com/')[1].split('.html')[0]}/a${i}`)
        .then(() => {
          console.log(r, '---done')
        })
      }
    })
  }

  console.log('done')

  
}