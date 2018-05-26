const Koa = require('koa')
// const views = require('koa-views')
// const { resolve } = require('path')
// const mongoose = require('mongoose')
const { connect, initSchemas } = require('./server/database/init')
const router = require('./routes')

;(async () => {
  await connect()

  initSchemas()

  // require('./tasks/movie')
  // require('./tasks/api')

})()

const app = new Koa()

app
  .use(router.routes())
  .use(router.allowedMethods())

// app.use(async (ctx, next) => {
//   ctx.body = 'hello koa'
//   next()
// })

app.listen(8080, () => {
  console.log('server running at localhost:8080...')
})