'use strict'

const express = require('express')
const bookCTLR = require('../controllers/book-controller')
const api = express.Router()

api.get('/product', bookCTLR.toListBooks)

api.get('/product/:productId', bookCTLR.bookById)

api.post('/product', bookCTLR.create)

api.put('/product/:productId', bookCTLR.update)

api.delete('/product/:productId', bookCTLR.remove)

module.exports = api