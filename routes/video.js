const express        = require('express')
const google         = require('googleapis')
const router         = express.Router()
const youtube        = google.youtube('v3')
const defaultConfig  = require('../config')

router.get('/:id', (req, res) => {
  const vids = []
  var videoTitle

  const config = Object.assign({
    id: req.params.id,
    part: 'player,snippet'
  }, defaultConfig)

  youtube.videos.list(config, (err, videos) => {
    videos.items.map((video) => {
      videoTitle = video.snippet.title

      vids.push({
        title: video.snippet.title,
        description: video.snippet.description,
        video: video.player.embedHtml
      })
    })

    res.render('video', {
      title: 'Nodecasts ' + videoTitle,
      identifier: req.params.id,
      fullUrl: 'https://nodecasts.io' + req.originalUrl.split("?").shift(),
      videos: vids
    })
  })
})

router.get('/getPlayer/:id', (req, res) => {

  const config = Object.assign({
    id: req.params.id,
    part: 'player,snippet'
  }, defaultConfig)

  youtube.videos.list(config, (err, videos) => {
    res.send(JSON.stringify({
      title: videos.items[0].snippet.localized.title,
      video: videos.items[0].player.embedHtml
    }))
  })
})

module.exports = router
