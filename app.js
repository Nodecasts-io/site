const express     = require('express')
const compression = require('compression')
const routes      = require('./routes/index')
const video       = require('./routes/video')
const playlist    = require('./routes/playlist')
const app         = express()

// Middleware
app.use(compression())
app.use(express.static('public'))
app.set('view engine', 'jade')

// Routes
app.use('/', routes)
app.use('/video', video)
app.use('/playlist', playlist)

app.listen(3000, () => {
  console.log('Example app listening at http://localhost:3000')
})

module.exports = app
