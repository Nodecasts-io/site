const express = require('express')
const app     = express()

const routes = require('./routes/index')

app.use(express.static('public'))
app.set('view engine', 'jade')
app.use('/', routes)

app.listen(3000, () => {
  console.log('Example app listening at http://localhost:3000')
})
