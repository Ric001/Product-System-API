'use strict'

const logger = require('log4js').getLogger()
logger.level = 'info'

function renderLoginView(req, res) {
    logger.info('[ENTERING <GET> renderLoginView(req, res)]')
    res.render('login')
}

function productView(req, res) {
    logger.info('[ENTERING <GET> productView(req, res)]')
    res.render('product')
}

module.exports = {
    renderLoginView,
    productView
}