const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gearSchema = new Schema({
  name: String,
  att: Number,
  def: Number,
  spec: Number
})

module.exports = gearSchema