const rp = require('request-promise-native')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')
const Category = mongoose.model('Category')

async function fetchMovie (item) {
  const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`

  return await rp(url)
}

(async () => {
  let movies = await Movie.find({
    $or: [
      { summary: { $exists: false } },
      { summary: null },
      { title: '' },
      { summary: '' },
      { category: [] }
    ]
  })
  
  for (let i = 0; i < movies.slice(0, 5).length; i++) {
    let movie = movies[i]
    let movieData = await fetchMovie(movie)
    
    try {
      movieData = JSON.parse(movieData)
    } catch (err) {
      console.log(err)
    }

    if (movieData) {
      movie.tags = movieData.tags || [] 
      movie.summary = movieData.summary || [] 
      movie.title = movieData.title || movieData.aka || [] 
      movie.rawTitle = movieData.original_title || movieData.title || ''
      movie.year = movieData.year || ''
      movie.movieTypes = movieData.genres || []

      // movie.movieTypes.forEach(async (item) => {
      for (let i = 0; i < movie.movieTypes.length; i++) {
        let item = movie.movieTypes[i]
        let cat = await Category.findOne({ name: item })

        if (!cat) {
          cat = new Category({ name: item, movies: [movie._id] })
        } else {
          if (!cat.movies.includes(movie._id)) cat.movies.push(movie._id)
        }

        await cat.save()

        if (!movie.category) {
          console.log('!movie category', movie.category)
          
          movie.category.push(cat._id)
        } else {
          if (!movie.category.includes(cat._id)) movie.category.push(cat._id)
        }
      }
      // })

      let dates = movieData.pubdates || []
      let pubdates = []
      dates.forEach(item => {
        const parts = item.split('(')
        if (item && parts.length > 0) {
          let date = parts[0]
          let country = '未知'

          if (parts[1]) country = parts[1].split(')')[0]
          pubdates.push({ country, date: new Date(date) })
        }

      })

      movie.pubdate = pubdates

      await movie.save()
    }
  }
})()