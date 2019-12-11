'use strict'

const BookModel = require('../models/book')
const logger = require('log4js').getLogger()
logger.level = 'info'

function bookById (req, res) {
    logger.info('[GET <bookById> : Book]')
    if (nonNull(req) && nonNull(res)) {
        let productId = req.params.productId
        BookModel.findById(productId, (err, product) => {
            if (err) return res.status(500).send({ message: 'Error Getting Product By Id'})
            if (!product) return res.status(404).send({ message: 'Product Not Found'})
            return res.status(200).send({product: product})
        })
    }
}

function toListBooks(req, res) {
    logger.info('[ENTERING GET <toListBooks> : Book[*] ]')
    if (nonNull(req) && nonNull(res)) {
        BookModel.find({}, (err, products) => {
            if (err) return res.status(500).send({message: 'Error Listing the products: ' + products})
            if (!products) return res.status(404).send({message: 'DB IS EMPTY'})
            res.status(200).send({products: products})
        })
    }
}

function create(req, res) {
    logger.info('[ENTERING POST <create> : Book]')
    if (nonNull(req) && nonNull(res)) {
        const book = new BookModel()
        book.name = req.body.name 
        book.author = req.body.author
        book.price = req.body.price
        
        book.save((err, producStored) => {
            if (err) res.status(500).send({message: 'Error Trying to save the book'})
            res.status(200).send({productStored: producStored})
        })
    }
}

function update(req, res) {
    logger.info('[ENTERING PUT <update> : Book]')
    if (nonNull(req) && nonNull(res)) {
        let productId = req.params.productId 
        let update = req.body 
        BookModel.findByIdAndUpdate(productId, update, (err, updatedBook) => {
            if (err) return res.status(500).send({message: 'Error Trying to update Product: ' + err})
            res.status(200).send({updatedProduct: updatedBook})
        })
    }
}

function remove(req, res) {
    logger.info('[ENTERING DELETE <remove> : Book]')
    let bookId = req.params.productId
    if (nonNull(req) && nonNull(res)) {
        BookModel.findById(bookId, (err, neededBook) => {
            if (err) return res.status.send({message: 'Error'})
            neededBook.remove(err => {
                if (err) return res.status.send({message: 'Error'})
                res.status(200).send({message: 'The Book with id -> ' + bookId + ' has been deleted'})
            })
        })
    }
}

function removeAll(req, res) {
    logger.info('[ENTERING <DELTE> removeAll(req, res)]')
    if (nonNull(req) && nonNull(res)) {
        BookModel.deleteMany({}, err => {
            if (err) return res.status(500).send({ message: `${err}`})

            return res.status(200).send({message: 'DB DROPPED DOWN Successfully'})
        })
    }
}

function nonNull(obj) {
    return (obj != null)
}

module.exports = {
    bookById,
    toListBooks,
    create,
    update,
    remove,
    removeAll
}