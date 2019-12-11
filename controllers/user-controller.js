'use strict'

const User = require('../models/user')
const service = require('../services/index')
const logger = require('log4js').getLogger()
logger.level = 'info'
 
function signUp(req, res) {
    logger.info('[ENTERING signUp(req, res)]')
    const user = new User({
        //name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        displayName: req.body.displayName
    })  
     
    user.save( err => {
        if (err) return res.status(500).send({ message: `Fail trying to signup the user -> ${user}\n ${err}`})
        return res.status(200).send({ message: `User created succesfully With Token -> ${service.createToken(user)}`})
    })
}

function signIn(req, res) {
    logger.info('[ENTERING signIn(req, res)]')
    User.find({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send(JSON.stringify({ message: err }))
        if (!user) return res.status(404).send(JSON.stringify({ message: 'No existe el usuario '}))

        req.user = user
        return res.status(200).send({
            message: 'You have logged in succesfully',
            token: service.createToken(user), 
        })
    })
}

module.exports = {
    signUp, signIn
}