const express        = require('express')
const google         = require('googleapis')
const router         = express.Router()
const youtube        = google.youtube('v3')
const defaultConfig  = require('../config')

router.get('/:id', (req, res) => {
  const vids = []

  const config = Object.assign({
    id: req.params.id,
    part: 'player,snippet'
  }, defaultConfig)

  youtube.videos.list(config, (err, videos) => {
    videos.items.map((video) => {
      vids.push({
        title: video.snippet.title,
        description: video.snippet.description,
        video: video.player.embedHtml
      })
    })

    res.render('video', {
      title: 'Nodecasts',
      identifier: req.params.id,
      videos: vids
    })
  })
})

module.exports = router
