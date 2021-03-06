const mongoose = require('mongoose')
const glob = require('glob')
const { resolve } = require('path')

const db = 'mongodb://localhost/douban'

mongoose.Promise = global.Promise

exports.initSchemas = () => {
  glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)
}
exports.connect = () => {
  let maxConnectTimes = 0

  const handleDisconnect = (reject, err) => {
    maxConnectTimes++

    if (maxConnectTimes < 5) {
      mongoose.connect(db)
    } else {
      if (err) reject(err)
      else throw new Error('database down...')
    } 
  }

  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }
  
    mongoose.connect(db)
  
    mongoose.connection.on('disconnected', () => {
      handleDisconnect(reject)
    })
  
    mongoose.connection.on('error', err => {
      handleDisconnect(reject, err)
    })

    mongoose.connection.once('open', () => {
      resolve()
      console.log('mongodb connect successfully...')
    })
  })
}