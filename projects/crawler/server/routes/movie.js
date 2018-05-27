import { controller, get } from '../lib/decorator'
import {
  findAllMovies,
  findOneMovie,
  findRelativeMovies } from '../service/movie'

// const router = new Router({ prefix: '/movies' })

@controller('/api/v1/movies')
export class movieController {
  @get('/')
  async getMovies (ctx, next) {
    const { type, year } = ctx.query
    const movies = await findAllMovies(type, year)

    ctx.body = {
      code: 0,
      json: { movies },
      message: ''
    }
    next()
  }

  @get('/:id')
  async getOneMovie (ctx, next) {
    const id = ctx.params.id
    const movie = await findOneMovie(id)
    const relativeMovies = await findRelativeMovies(movie)

    ctx.body = {
      code: 0,
      message: '',
      json: {
        movie,
        relativeMovies
      },
    }
    next()
  }

}