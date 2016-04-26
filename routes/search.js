const express        = require('express')
const google         = require('googleapis')
const router         = express.Router()
const youtube        = google.youtube('v3')
const defaultConfig  = require('../config')

router.post('/', (req, res) => {
  const vids = []
  const query = req.body.query

  if (!query) {
    res.redirect('/videos')
  }

  const config = Object.assign({
    part: 'snippet',
    maxResults: 50,
    type: 'video',
    q: query
  }, defaultConfig)

  youtube.search.list(config, (err, videos) => {
    videos.items.map((video) => {
      vids.push({
        title: video.snippet.title,
        id: video.id.videoId
      })
    })

    res.render('results', {
      title: 'Nodecasts',
      query: query,
      videos: vids
    })
  })
})

module.exports = router
