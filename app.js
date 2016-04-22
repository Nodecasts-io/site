const express     = require('express')
const compression = require('compression')
const routes      = require('./routes/index')
const search      = require('./routes/search')
const video       = require('./routes/video')
const videos      = require('./routes/videos')
const playlist    = require('./routes/playlist')
const playlists   = require('./routes/playlists')
const app         = express()

// Middleware
app.use(compression())
app.use(express.static('public'))
app.set('view engine', 'jade')

// Routes
app.use('/', routes)
app.use('/video', video)
app.use('/videos', videos)
app.use('/search', search)
app.use('/playlist', playlist)
app.use('/courses', playlists)

app.listen(3000, () => {
  console.log('Example app listening at http://localhost:3000')
})

module.exports = app
