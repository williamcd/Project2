require('dotenv').config()

const mongoose = require('mongoose')

const Gear = require('../models/gear')
const Char = require('../models/char')

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
}
else {
  mongoose.connect('mongodb://localhost/express-movies');
}
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
  }
);
mongoose.connection.once('open', function() {
  console.log("Mongoose has connected to MongoDB!");
});

const sword = new Gear({
  name: 'Sword',
  att: 100,
  spec: 10
})
const spear = new Gear({
  name: 'Spear',
  att: 140,
  spec: 8
})
const bow = new Gear({
  name: 'Bow & Arrow',
  att: 240,
  spec: 4
})
const axe = new Gear({
  name: 'Axe',
  att: 160,
  spec: 7
})
const will = new Char({
  name: 'Will',
  age: 21,
  deity: 'none',
  alignment: 'Communist',
  gear: [sword, bow]
})
const james = new Char({
  name: 'James',
  age: 62,
  deity: 'Home Depot',
  alignment: 'Communist',
  gear: [axe]
})

Gear.remove().then(() => {
  return Char.remove()
}).then(() => {
  return Char.insertMany([will, james])
}).then(() => {
  console.log('Saved Successfully')
  db.close()
}).catch((err) => {
  console.log(err)
  db.close()
})