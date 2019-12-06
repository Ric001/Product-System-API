'use strict'
const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')
const log4j = require('log4js')
const logger = log4j.getLogger()
logger.level = 'info'

mongoose.connect(config.db, (err, res) => {
    logger.info(`[TRYING TO CONNECT TO -> ${config.db}]`)
    if (err) console.log('Error Trying To Stablish Connection -> ' + err)
    
    app.listen(config.port, err => {
        if (err) throw err
        logger.info(`[TRYING TO RUN APP AT PORT-> ${config.port}]`)
        console.log(`==========> Running at Port ${config.port} <==========`)
    })
})