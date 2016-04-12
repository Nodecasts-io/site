const google  = require('googleapis')
const youtube = google.youtube('v3')
const express = require('express')
const config  = require('../config')
const router  = express.Router()


router.get('/', (req, res) => {
  const entries = [];

  youtube.playlists.list(config, (err, playlists) => {
    playlists.items.forEach((item) => {
      entries.push({
        id: item.id,
        title: item.snippet.localized.title,
        description: item.snippet.localized.description,
        count: item.contentDetails.itemCount,
        thumbnail: item.snippet.thumbnails.standard.url
      })
    })

    res.render('index', {
      title: 'Nodecasts',
      message: 'Our Series',
      entries: entries
    })
  })
})

module.exports = router
