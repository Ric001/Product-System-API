'use strict'

const jwt = require('jwt-simple')
const config = require('../config')
const moment = require('moment')
const logger = require('log4js').getLogger()
logger.level = 'info'

function createToken(user) {
    logger.info('[ENTERING createToken(user)]')
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    }

    return jwt.encode(payload, config.secret)
}

function decodeToken(token) {
    logger.info('[ENTERING decodeToken(token)-> Promise]')
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, config.secret)
    
            if (payload.exp <= moment().unix())
                reject({
                    status: 401, 
                    message: 'The Token has Expired'
                })
            
            resolve(payload.sub)
        } catch (err) {
            reject({
                status: 500,
                message: 'Invalid Token'
            })
        }
    }) 
    return decoded
}

module.exports = {
    createToken,
    decodeToken
}