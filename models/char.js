const mongoose = require('mongoose')
const charSchema = require('../db/schemas/charSchema')

const Char = mongoose.model('char', charSchema)

module.exports = Char
