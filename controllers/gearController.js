const express = require('express')

const router = express.Router({mergeParams: true})

const Char = require('../models/char')
const Gear = require('../models/gear')

router.get('/', (req, res) => {
  Char.findById(req.params.id).then((char) => {
    const gear = char.gear
    res.render('gear/index', {
      char: char,
      gear: gear
    })
  })
})

router.get('/new', (req, res) => {
  res.render('gear/new', {
    charId: req.params.id
  })
})

router.post('/', (req, res) => {
  Char.findById(req.params.id).then((char) => {
    const newGear = new Gear({
      name: req.body.name,
      att: req.body.att,
      spec: req.body.spec
    })
    char.gear.push(newGear)
    return char.save()
  }).then((updatedChar) => {
    res.redirect(`/char/${req.params.id}/gear`)
  })
})

router.get('/:id', (req, res) => {
  Char.findById(req.params.id).then((char) => {
    res.render('gear/show', {
      char: char,
    })
  })
})

router.get('/:id/edit', (req, res) => {
  Char.findById(req.params.charId).then((char) => {
    const gear = char.gear.id(req.params.id)
    res.render('gear/edit', {
      charId: req.params.charId,
      gear: gear
    })
  })
})

router.patch('/:id', (req, res) => {
  Char.findById(req.params.charId).then((char) => {
    const gear = char.gear.id(req.params.id)
    gear.name = req.body.name
    gear.att = req.body.att
    gear.spec = req.body.spec
    return char.save()
  }).then((updatedChar) => {
    res.redirect(`/char/${updatedChar._id}/gear/${req.params.id}`)
  })
})

router.delete('/:id', (req, res) => {
  Char.findById(req.params.charId).then((char) => {
    const gear = char.gear.id(req.params.id)
    gear.remove()
    return char.save()
  }).then(() => {
    res.redirect(`/char/${req.params.charId}/gear`)
  })
})

module.exports = router