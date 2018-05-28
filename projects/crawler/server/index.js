import Koa from 'koa'
import { connect, initSchemas } from './database/init'
import R from 'ramda'
import { resolve } from 'path'

const MIDDLEWARES = ['router']

const useMiddlewares = app => {
  R.map(R.compose(
    R.forEachObjIndexed(
      initWith => initWith(app)
    ),
    require,
    name => resolve(__dirname, `./middlewares/${name}`)
  ))(MIDDLEWARES)
}



;(async () => {
  await connect()
  
  initSchemas()
  
  const app = new Koa()

  await useMiddlewares(app)

  app.listen(8080, () => {
    console.log('server running at localhost:8080...')
  })

})()