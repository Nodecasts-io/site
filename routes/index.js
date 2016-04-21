const google   = require('googleapis')
const youtube  = google.youtube('v3')
const express  = require('express')
const router   = express.Router()
const defaultConfig     = require('../config')
const featuredPlaylists = require('../data/featured_playlists.js')
const featuredVideos    = require('../data/featured_videos.js').join(', ')


router.get('/', (req, res) => {
  const playlists = []
  const videos    = []

  let config = Object.assign({
    part: 'snippet,contentDetails',
    playlistId: req.params.id
  }, defaultConfig)

  youtube.playlists.list(config, (err, result) => {
    result.items
      .filter((item) => {
        return (featuredPlaylists.indexOf(item.id) != -1)
      })
      .forEach((item) => {
      playlists.push({
        id: item.id,
        title: item.snippet.localized.title,
        description: item.snippet.localized.description,
        count: item.contentDetails.itemCount,
        thumbnail: item.snippet.thumbnails.standard.url
      })
    })

    config = Object.assign({
      part: 'snippet,contentDetails',
      id: featuredVideos,
      maxResults: 4
    }, defaultConfig)

    youtube.videos.list(config, (err, result) => {
      result.items
        .forEach((item) => {
          videos.push({
            id: item.id,
            title: item.snippet.localized.title,
            thumbnail: item.snippet.thumbnails.standard.url
          })
        })

        res.render('index', {
          title: 'Nodecasts',
          playlists: playlists,
          videos: videos
        })
    })

  })
})

module.exports = router
