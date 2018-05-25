const mongoose = require('mongoose')
const Mixed = mongoose.Schema.Types.Mixed

const movieSchema = new mongoose.Schema({
  doubanId: {
    type: String,
    required: true
  },
  rate: Number,
  title: String,
  summary: String,
  video: String,
  poster: String,
  cover: String,
  videoKey: String,
  posterKey: String,
  coverKey: String,
  rawTitle: String,
  movieTypes: [String],
  pubdate: Mixed,
  year: Number,
  tags: [String],
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

movieSchema.pre('save', next => {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})

mongoose.model('Movie', movieSchema)