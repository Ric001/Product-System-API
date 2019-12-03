'use strict'

const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.get('/', (request, response) => {
    response.send('hello world')
})

app.post('/', (request, response) => {
    response.send('Got a POST request')
})

app.put('/user', (request, response) => {
    response.send('Got a Put request at /user')
})

app.delete('/user', (request, response) => {
    response.send('Got a DELETE request at /user')
})

app.listen(3000, (error) => {
    if (error)
        throw new Error()
    mongoose.connect('', {useNewUrlParser: true})
    console.log('====> Running at Port ===> ' + 3000)
})