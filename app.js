const express = require('express')
const routes  = require('./routes/index')
const series  = require('./routes/series')
const google  = require('googleapis')
const youtube = google.youtube('v3')
const app     = express()

const params = {
  auth: 'AIzaSyBoSKnl0Bmp2Q8K5QhYBFs67Qd5AvGvenw',
  part: 'contentDetails',
  maxResults: 50,
  playlistId: 'PLVHlCYNvnqYouIVj3IgK3RmzpnWMaoqkw'
}

youtube.playlistItems.list(params, function(err, playlist) {
  console.log(playlist)
})

// Middleware
app.use(express.static('public'))
app.set('view engine', 'jade')

// Routes
app.use('/', routes)
app.use('/series', series)

app.listen(3000, () => {
  console.log('Example app listening at http://localhost:3000')
})

module.exports = app
