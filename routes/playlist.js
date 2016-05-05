const express       = require('express')
const google        = require('googleapis')
const router        = express.Router()
const youtube       = google.youtube('v3')
const moment        = require('moment')
const defaultConfig = require('../config')

router.get('/:id', (req, res) => {
  const videos = []
  const ids = []
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
        ids.push(item.contentDetails.videoId)
      })

      // Get config object ready for this request
      config = Object.assign({
        id: ids.join(', '),
        part: 'snippet,player,contentDetails'
      }, defaultConfig)

      youtube.videos.list(config, (err, vids) => {
        player = vids.items[0].player.embedHtml
        vids.items.map((item) => {
          videos.push({
            id: item.id,
            title: item.snippet.title,
            duration: moment.duration(item.contentDetails.duration).humanize(),
            description: item.snippet.description
          })
        })

        res.render('playlist', {
          title: 'Nodecasts ' + title,
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
