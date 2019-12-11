'use strict'

const moongose = require('mongoose')
const Schema = moongose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const UserSchema = new Schema({
    name: {first: String, last: String},
    email: {unique: true, type: String, lowercase: true},
    password: { type: String, lowercase: true, select: false},
    displayName: { type: String, unique: true },
    signupDate: { type: Date, default: Date.now() },
    lastLogin: Date
})


UserSchema.pre('save', (next) => {
    let user = this 
    
    bcrypt.genSalt(10, (err, salt) => {
        if (!err) return next(err)

        bcrypt.hash(user.password, salt, null,(err, hash) => {
            if (err) return next(err)

            user.password = hash
            next()
        })
    })
})

UserSchema.methods.gravatar = () => {
    if (!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`

    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports = moongose.model('User', UserSchema)
