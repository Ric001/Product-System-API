'use strict'

const service = require('../services/index')
const logger = require('log4js').getLogger()
logger.level = 'info'

function isAuth(request, response, next) {
    logger.info('[ENTERING isAuth(request, response, next)]')
    
    if (!request.headers.authorization)
        return response.status(403).send({ message: 'Acces Denied'})
    
    const token = request.headers.authorization.split(' ')[1]
    service.decodeToken(token)
        .then( response => {
            request.user = response
            next()
        })
        .catch( response => {
            response.status(response.status)
            next()
        })
}

module.exports = isAuth