const express        = require('express')
const google         = require('googleapis')
const router         = express.Router()
const youtube        = google.youtube('v3')
const defaultConfig  = require('../config')

router.get('/', (req, res) => {
  const vids = []
  let order, active
 
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

  const config = Object.assign({
    part: 'snippet',
    maxResults: 50,
    order: order,
    type: 'video'
  }, defaultConfig)

  youtube.search.list(config, (err, videos) => {
    videos.items.map((video) => {
      vids.push({
        title: video.snippet.title,
        id: video.id.videoId
      })
    })

    res.render('videos', {
      title: 'Nodecasts, All Videos',
      videos: vids,
      activeClass: active
    })
  })
})

module.exports = router
