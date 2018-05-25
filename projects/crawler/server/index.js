const Koa = require('koa')
const views = require('koa-views')
const { resolve } = require('path')
const { connect } = require('../database/init')

;(async () => {
  await connect()
})()

const app = new Koa()

app.use(async (ctx, next) => {
  ctx.body = 'hello koa'
  next()
})

app.listen(8080, () => {
  console.log('server running at localhost:8080...')
})