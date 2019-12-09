'use strict'

const express = require('express')
const bookCTLR = require('../controllers/book-controller')
const auth = require('../middlewares/index')
const api = express.Router()

api.get('/product/', bookCTLR.toListBooks)

api.get('/product/:productId', bookCTLR.bookById)

api.post('/product/', bookCTLR.create)

api.put('/product/:productId', bookCTLR.update)

api.delete('/product/:productId', bookCTLR.remove)

api.get('/private', auth.isAuth, (req, res) => {
    res.status(200).send({ message: 'You Got Access' })
})

module.exports = api