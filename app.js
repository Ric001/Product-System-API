'use strict'

const express = require('express')
const mongoose = require('mongoose')
const app = express()

//app.use(express.static('public'))
const staticFilesRoute = __dirname + '/public'

app.use('/files', express.static(staticFilesRoute))

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

app.all('/secret', (request, response) => {
    console.log('Accessing the secret section...')
    next()
})

app.listen(3000, (error) => {
    if (error)
        throw new Error()
   // mongoose.connect('', {useNewUrlParser: true})
    console.log('====> Running at Port ===> ' + 3000)
})