import mongoose from 'mongoose'

const Movie = mongoose.model('Movie')

export const findAllMovies = async (type, year) => {
  let query = {}

  if (type) {
    query.movieTypes = {
      $in: [type]
    }
  }

  if (year) {
    query.year = year
  }

  const movies = await Movie.find(query)

  return movies
}

export const findOneMovie = async (id) => {
  const movie = await Movie.findOne({ doubanId: id })

  return movie
}

export const findRelativeMovies = async (movie) => {
  const relativesMovies = await Movie.find({
    movieTypes: {
      $in: movie.movieTypes
    }
  })

  return relativesMovies
}