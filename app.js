require('dotenv').config()
const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

const app = express()

// mongoose.connect(process.env.MONGODB_URI)

// const db = mongoose.connection

// db.on('open', () => {
//   console.log('Successfully connected to mongoDB')
// })

// db.on('error', (err) => {
//   console.log(err)
// })
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
}
else {
  mongoose.connect('mongodb://localhost/project-2-version-2');
}
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
  }
);
mongoose.connection.once('open', function() {
  console.log("Mongoose has connected to MongoDB!");
});

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(methodOverride('_method'))

app.use(express.static(path.join(__dirname, 'public')))

const index = require('./controllers/index')
const charController = require('./controllers/charController')
const gearController = require('./controllers/gearController')

app.use('/', index)
app.use('/char', charController)
app.use('/char/:id/gear', gearController)

app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
