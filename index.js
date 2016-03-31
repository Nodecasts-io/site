const express = require('express')
const series  = require('./data/series.js')
const app     = express()

app.use(express.static('public'))
app.set('view engine', 'jade')

app.get('/', (req, res) => {
  const entries = series.map((entry) => {
    return {
      title: entry.name,
      count: entry.videos.length
    }
  })

  res.render('index', {
    title: 'Nodecasts',
    message: 'Welcome to Nodecasts',
    entries: entries
  })
})

app.listen(3000, () => {
  console.log('Example app listening at http://localhost:3000')
})
