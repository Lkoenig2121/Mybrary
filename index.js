if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}        
// A process to check if we are running in production environment         
         
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')
         
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views') // Okay so for the sets the first part is from the second
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to Mongoose'))
         
app.use('/', indexRouter)
         
app.listen(process.env.PORT || 3000)  // process.env.PORT for when our project is actually runnning