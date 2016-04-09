const google  = require('googleapis')
const youtube = google.youtube('v3')
const express = require('express')
const config  = require('../config')
const router  = express.Router()

router.get('/:id', (req, res, next) => {
  const videos = []

  // Get config object ready for this request
  config.playlistId = req.params.id

  youtube.playlistItems.list(config, (err, playlist) => {
    playlist.items.map((item) => {
      videos.push({
        id: item.contentDetails.videoId,
        title: item.snippet.title,
        description: item.snippet.description
      })
    })

    res.render('playlist', {
      title: 'Nodecasts',
      message: 'foo',
      videos: videos
    })
  })
})

module.exports = router
