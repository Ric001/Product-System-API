'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const BookSchema = new Schema({
    name: String, 
    author: String,
    price: Float
})

mongoose.model('Book', BookSchema)

