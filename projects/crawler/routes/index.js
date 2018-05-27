const Router = require('koa-router')
const mongoose = require('mongoose')

const router = new Router()
// const router = new Router({ prefix: '/movies' })

// @controller('/api/v1/movies')

router.get('/', async (ctx, next) => {
  ctx.body = 'hello koa'
  next()
})

router.get('/movies', async (ctx, next) => {
  const Movie = mongoose.model('Movie')
  const movies = await Movie.find({}).sort({ 'rate': -1 })
  
  ctx.body = {
    code: 0,
    json: { movies },
    message: ''
  }
  next()
})

router.get('/movies/:id', async (ctx, next) => {
  const Movie = mongoose.model('Movie')
  const id = ctx.params.id
  const movie = await Movie.findOne({ doubanId: id })
    .sort({
      'meta.createAt': -1
    })

  ctx.body = { movie }
  next()
})

module.exports = router