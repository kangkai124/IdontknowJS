const mongoose = require('mongoose')
const db = 'mongodb://localhost/douban'
mongoose.Promise = global.Promise

exports.connect = () => {
  let maxConnectTimes = 0

  const handleDisconnect = () => {
    maxConnectTimes++

    if (maxConnectTimes < 5) {
      mongoose.connect(db)
    } else {
      throw new Error('database down...')
    } 
  }

  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }
  
    mongoose.connect(db)
  
    mongoose.connection.on('disconnected', () => {
      handleDisconnect()
    })
  
    mongoose.connection.on('error', err => {
      handleDisconnect()
    })

    mongoose.connection.once('open', () => {
      resolve()
      console.log('mongodb connect successfully...')
    })
  })
}