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
    return new Promise((resolve, reject) => {
        const payload = jwt.decode(token, con)
    })    
}