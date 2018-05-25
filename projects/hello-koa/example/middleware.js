const Koa = require('koa')
const logger = require('koa-logger')
const app = new Koa()

app.use(logger())

const md1 = async (ctx, next) => {
  ctx.body = 'Hi '
  await next()
  ctx.body = ctx.body + ' There'
}

const md2 = async (ctx, next) => {
  ctx.type = 'text/html; charset=utf-8'
  await next()
}

const md3 = async (ctx, next) => {
  ctx.body = ctx.body + ' Kk'
  // await next()
}

app.use(md1)
app.use(md2)
app.use(md3)

app.listen(2333)