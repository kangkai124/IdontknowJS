const cp = require('child_process')
const { resolve } = require('path')
const rp = require('request-promise-native')

async function fetchMovie (item) {
  const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`
  console.log(url);
  

  return await rp(url)
}

;(async () => {
  const script = resolve(__dirname, '../app')
  const child = cp.fork(script, [])
  let invoked = false

  child.on('error', err => {
    if (invoked) return

    invoked = true

    console.log(err)
  })

  child.on('exit', code => {
    if (invoked) return

    invoked = false

    let err = code === 0 ? null : new Error('exit code' + code)

    console.log(err)
  })

  child.on('message', data => {
    const movies = data.result.slice(0, 5)    

    movies.map(async movie => {
      let movieData = await fetchMovie(movie)

      try {
        movieData = JSON.parse(movieData)
        console.log(`${movieData.id}-${movieData.title}: ${movieData.summary}`)
      } catch (err) {
        console.log(err)
      }

    })
  })
})()