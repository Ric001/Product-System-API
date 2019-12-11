'use strict'

const express = require('express')
const bookCTLR = require('../controllers/book-controller')
const userCTRL = require('../controllers/user-controller')
const auth = require('../middlewares/index')
const api = express.Router()
 
api.get('/product/', auth, bookCTLR.toListBooks)

api.get('/product/:productId', auth, bookCTLR.bookById)

api.post('/product/', auth, bookCTLR.create)

api.put('/product/:productId', auth, bookCTLR.update)

api.delete('/product/:productId', auth, bookCTLR.remove)

api.delete('/product/', auth, bookCTLR.removeAll)

api.post('/signup/', userCTRL.signUp)

api.post('/signin/', userCTRL.signIn)

module.exports = api