const express = require('express')
const router = express.Router()
const Char = require('../models/char')

router.get('/', (req, res) => {
  Char.find().then((char) => {
    res.render('char/index', {
      char: char
    })
  })
})

router.get('/new', (req, res) => {
  res.render('char/new', {
  })
})

router.post('/', (req, res) => {
  const newChar = new Char({
    name: req.body.name,
    age: req.body.age,
    deity: req.body.deity,
    alignment: req.body.alignment
  })
  newChar.save().then((savedChar) => {
    res.redirect(`/char/${savedChar._id}`)
  })
})

router.get('/:id', (req, res) => {
  Char.findById(req.params.id).then((char) => {
    res.render('char/show', {
      char: char
    })
  })
})

router.get('/:id/edit', (req, res) => {
  Char.findById(req.params.id).then((char) => {
    res.render('char/edit', {
      id: req.params.id,
      char: char
    })
  })
})

router.patch('/:id', (req, res) => {
  Char.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    age: req.body.age,
    deity: req.body.deity,
    alignment: req.body.alignment
  }, {new: true}).then((updatedChar) => {
    res.redirect(`/char/${updatedChar._id}`)
  })
})

router.delete('/:id', (req, res) => {
  Char.findByIdAndRemove(req.params.id).then(() => {
    res.redirect(`/char`)
  })
})

module.exports = router