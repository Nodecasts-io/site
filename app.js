const express     = require('express')
const compression = require('compression')
const bodyParser  = require('body-parser')
const favicon     = require('serve-favicon')
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
app.set('view engine', 'pug')

app.use(favicon(__dirname + '/public/img/favicon.png'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes
app.use('/', routes)
app.use('/video', video)
app.use('/videos', videos)
app.use('/search', search)
app.use('/playlist', playlist)
app.use('/courses', playlists)

app.listen(3000, () => {
  console.log('Application running on http://localhost:3000')
})

module.exports = app
