 express = require('express')
const app = express()

app.use(express.static('public'))
app.set('view engine', 'jade')

app.get('/', (req, res) => {
  const series = require('./data/series.js')

  res.render('index', {
    title: 'Nodecasts',
    message: 'Welcome to Nodecasts',
    series: series
  })
})

app.listen(3000, () => {
  console.log('Example app listening at http://localhost:3000')
})
