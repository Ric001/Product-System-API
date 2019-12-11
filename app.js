'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')
const hbs4 = require('express-hbs')
const app = express()
const api = require('./routes/routes')
const views = require('./routes/view-routes')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.engine('.hbs', hbs4.express4({
    defaultLayout: __dirname + '/views/layouts/default',
    extname: '.hbs'
}))

app.set('view engine', '.hbs')

app.use('/api/v1/', api)
app.use('/app/', views)

module.exports = app

