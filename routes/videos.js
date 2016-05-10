const express        = require('express')
const google         = require('googleapis')
const router         = express.Router()
const youtube        = google.youtube('v3')
const defaultConfig  = require('../config')

router.get('/', (req, res) => {
  const vids = []
  var order, active, pageToken
 
  switch (req.query.sortBy) {
    case 'recent':
      order  = 'date'
      active = 'Video-Recent'
      break
    case 'name':
      order  = 'title'
      active = 'Video-Name'
      break
    default:
      order  = 'viewCount'
      active = 'Video-Popular'
  }

  if (req.query.token) {
    pageToken = req.query.token
  }

  const config = Object.assign({
    part: 'snippet',
    maxResults: 50,
    order,
    pageToken,
    type: 'video'
  }, defaultConfig)

  youtube.search.list(config, (err, videos) => {
    videos.items.map((video) => {
      vids.push({
        title: video.snippet.title,
        id: video.id.videoId
      })
    })

    var {nextPageToken, prevPageToken} = videos 

    res.render('videos', {
      title: 'Nodecasts, All Videos',
      videos: vids,
      nextPageToken,
      prevPageToken,
      activeClass: active
    })
  })
})

module.exports = router
