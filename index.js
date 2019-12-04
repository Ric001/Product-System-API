'use strict'
const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, (err, res) => {
    if (err) console.log('Error Trying To Stablish Connection -> ' + err)
    
    app.listen(config.port, err => {
        if (err) throw err

        console.log('====> Running at Port <=== ' + config.port)
    })
})