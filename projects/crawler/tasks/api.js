const cp = require('child_process')
const rp = require('request-promise-native')
const { resolve } = require('path')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')
const Category = mongoose.model('Category')

async function fetchMovie (item) {
  const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`

  return await rp(url)
}

;(async () => {
  let movies = await Movie.find({
    $or: [
      { summary: { $exists: false } },
      { summary: null },
      { title: '' },
      { summary: '' }
    ]
  })
  
  for (let i = 0; i < movies.length; i++) {
    let movie = movies[i]
    let movieData = await fetchMovie(movie)

    if (movieData) {
      movie.tags = movieData.tags || [] 
      movie.summary = movieData.summary || [] 
      movie.title = movieData.title || movieData.aka || [] 
      movie.rawTitle = movieData.original_title || movieData.title || ''
      movie.year = movieData.year || ''

      movie.movieTypes = movieData.genres || []
      movieTypes.forEach((item, i) => {
        let cat = await Category.findOne({ name: item })

        if (!cat) {
          cat = new Category({ name: item, movies: [movie._id] })
        }
      })


      if (movieData.attrs) {
        movie.movieTypes = movieData.attrs.movie_type || []

        for (let i = 0; i < movie.movieTypes.length; i++) {
          let item = movie.movieTypes[i]
          let cat = await Category.findOne({ name: item })

          if (!cat) {
            cat = new Category({
              name: item,
              movies: [movie._id]
            })
          } else {
            if (cat.movies.indexOf(movie._id) === -1) {
              cat.movies.push(movie._id)
            }
          }

          await cat.save()

          if (!movie.category) {
            movie.category.push(cat._id)
          } else {
            if (movie.category.indexOf(cat._id) === -1) {
              movie.category.push(cat._id)
            }
          }
        }

        let dates = movieData.attrs.pubdate || []
        let pubdates = []

        dates.forEach(item => {
          if (item && item.split('(').length > 0) {
            let date = item.split('(')[0] 
            let country = '未知'

            if (item.split('(')[1]) {
              country = item.split('(')[1].split(')')[0]
            }

            pubdates.push({
              country,
              date: new Date(date)
            })
          }
        })

        movie.pubdate = pubdates
      }

      await movie.save()
    }
  }

})()