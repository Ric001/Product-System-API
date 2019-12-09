'use strict'

const moment = require('moment')
const service = require('../services/index')
const logger = require('log4js').getLogger()
logger.level = 'info'

function isAuth(request, response, next) {
    logger.info('[ENTERING isAuth(request, response, next)]')
    
    if (!request.headers.authorization)
        return response.status(403).send({ message: 'Acces Denied'})
    
    const token = request.headers.authorization.split(' ')[1]
    const payload = service.decodeToken(token)
    
    if (payload.exp <= moment().unix()) {
        response.status(401).sned({ message: 'Token Expired'})
    }

    request.user = payload.sub
    next()
}

module.exports = isAuth