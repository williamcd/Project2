const mongoose = require('mongoose')
const gearSchema = require('../db/schemas/gearSchema')

const Gear = mongoose.model('gear', gearSchema)

module.exports = Gear
