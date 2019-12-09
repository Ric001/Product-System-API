'use strict'

const User = require('../models/user')
const service = require('../services/index')
const logger = require('log4js').getLogger()
logger.level = 'info'

function signUp(req, res) {
    logger.info('[ENTERING signUp(req, res)]')
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        displayName: req.body.displayName
    })  
    
    user.save( (err) => {
        if (err) return res.status(500).send({ message: `Fail trying to signup the user -> ${user}`})
        
        return res.status(200).send({ message: `User created succesfully With Token -> ${service.createToken(user)}`})
    })
}

function signIn(req, res, next) {
    logger.info('[ENTERING signIn(req, res)]')
    
    const tokenDecodingPromise = service.decodeToken(req.headers.token)
        .then(succesfullResult => {
            res.status(succesfullResult.status).send(succesfullResult)            
            next()
        }).catch(err => {
            res.status(err.status).send(err)
            next()
        })
}

module.exports = {
    signUp, signIn
}