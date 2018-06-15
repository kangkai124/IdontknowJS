const koa = require('./application')
const app = new koa()

app.use(async(ctx, next) => {
  ctx.body = '1'
  await next()
  ctx.body += '2'
})

app.use(async (ctx, next) => {
  ctx.body += '3'
  await delay()
  await next()
  ctx.body += '4'
})

app.use(async ctx => {
  ctx.body += '5'
})


function delay() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}

app.listen(9092, () => {
  console.log('server running on port 9092')
})