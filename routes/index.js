const express = require('express')
const series  = require(__dirname + '/../data/series.js')
const router  = express.Router()

router.get('/', (req, res, next) => {
  const entries = series.map((entry) => {
    return {
      id:    entry.id,
      title: entry.name,
      image: entry.image,
      count: entry.videos.length
    }
  })

  res.render('index', {
    title: 'Nodecasts',
    message: 'Welcome to Nodecasts',
    entries: entries
  })
})

module.exports = router
