'use strict'

const express = require('express')

const bodyParser = require('body-parser')
const log4js = require('log4js')
const bookController = require('./controllers/book-controller')

const Book =  require('./models/book')
const app = express()
const staticFilesRoute = __dirname + '/public'
const api = require('./routes/routes')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/api/',api)


module.exports = app

