const mongoose = require('mongoose')
const gearSchema = require('./gearSchema')
const Schema = mongoose.Schema

const charSchema = new Schema({
  name: String,
  age: Number,
  deity: String,
  alignment: String,
  gear: [gearSchema]
})

module.exports = charSchema
