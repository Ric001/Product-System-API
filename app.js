'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const api = require('./routes/routes')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/api/v1/',api)

module.exports = app

