const express        = require('express')
const google         = require('googleapis')
const router         = express.Router()
const youtube        = google.youtube('v3')
const defaultConfig  = require('../config')

router.get('/', (req, res) => {
  const vids = []

  const config = Object.assign({
    part: 'snippet',
    maxResults: 50,
    type: 'video'
  }, defaultConfig)

  youtube.search.list(config, (err, videos) => {
    videos.items.map((video) => {
      vids.push({
        title: video.snippet.title,
        id: video.id.videoId
      })
    })

    res.render('videos', {
      title: 'Nodecasts',
      videos: vids
    })
  })
})

module.exports = router
