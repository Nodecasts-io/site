const express = require('express')
const router  = express.Router()

router.get('/:id', (req, res, next) => {
  const entry = series.filter((entry) => {
    return entry.id == req.params.id
  })[0]

  res.render('single', {
    title: 'Nodecasts',
    message: entry.name,
    entry: entry
  })
})

module.exports = router
