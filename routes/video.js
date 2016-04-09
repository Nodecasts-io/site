const google  = require('googleapis')
const youtube = google.youtube('v3')
const express = require('express')
const config  = require('../config')
const router  = express.Router()

router.get('/:id', (req, res, next) => {
  const vids = []

  // Get config object ready for this request
  config.id = req.params.id
  config.part = 'player,snippet'

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
      videos: vids
    })
  })
})

module.exports = router
