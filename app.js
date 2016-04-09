const express = require('express')
const routes  = require('./routes/index')
const series  = require('./routes/series')
const app     = express()

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
