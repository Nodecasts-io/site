const express       = require('express')
const google        = require('googleapis')
const router        = express.Router()
const youtube       = google.youtube('v3')
const defaultConfig = require('../config')

router.get('/:id', (req, res) => {
  const videos = []
  var title, description, player

  // Get config object ready for this request
  var config = Object.assign({
    part: 'snippet,contentDetails',
    playlistId: req.params.id,
    maxResults: 20
  }, defaultConfig)

  youtube.playlists.list(config, (err, playlists) => {
    const series = playlists.items.filter((item) => {
      return item.id == req.params.id
    })

    title = series[0].snippet.title
    description = series[0].snippet.description

    youtube.playlistItems.list(config, (err, playlist) => {
      playlist.items.map((item) => {
        videos.push({
          id: item.contentDetails.videoId,
          title: item.snippet.title,
          description: item.snippet.description
        })
      })

      // Get config object ready for this request
      config = Object.assign({
        id: videos[0].id,
        part: 'player'
      }, defaultConfig)

      youtube.videos.list(config, (err, vids) => {
        player = vids.items.map((video) => {
          return video.player.embedHtml
        })

        res.render('playlist', {
          title: 'Nodecasts',
          message: title,
          videos: videos,
          description: description,
          player: player
        })
      })
    })
  })
})

module.exports = router
