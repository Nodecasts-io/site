const express       = require('express')
const google        = require('googleapis')
const router        = express.Router()
const youtube       = google.youtube('v3')
const defaultConfig = require('../config')
const featured      = require('../data/featured_playlists.js')

router.get('/:id', (req, res) => {
  const videos = []
  let featuredImage, title, description

  if (featured.indexOf(req.params.id) == -1) {
    return 'Error'
  }

  // Get config object ready for this request
  const config = Object.assign({
    part: 'snippet,contentDetails',
    playlistId: req.params.id
  }, defaultConfig)

  youtube.playlists.list(config, (err, playlists) => {
    const series = playlists.items.filter((item) => {
      return item.id == req.params.id
    })

    title = series[0].snippet.title
    description = series[0].snippet.description

    youtube.playlistItems.list(config, (err, playlist) => {

      featuredImage = playlist.items[0].snippet.thumbnails.standard.url

      playlist.items.map((item) => {
        videos.push({
          id: item.contentDetails.videoId,
          title: item.snippet.title,
          description: item.snippet.description
        })
      })

      res.render('playlist', {
        title: 'Nodecasts',
        message: title,
        videos: videos,
        description: description,
        featuredImage: featuredImage
      })
    })
  })
})

module.exports = router
