'use strict'

const viewCTLR = require('../controllers/views-controller')
const viewRouter = require('express').Router()

viewRouter.get('/login', viewCTLR.renderLoginView)

viewRouter.get('/product', viewCTLR.productView)

module.exports = viewRouter