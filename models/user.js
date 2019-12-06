'use strict'

const moongose = require('mongoose')
const Schema = moongose.Schema
const bcrypt = require('bcrypt-nodejs')


const UserSchema = new Schema({
    name: {first: String, last: String},
    email: {unique: true, type: String, lowercase: true},
    password: { type: String, lowercase: true, select: false},
    displayName: { type: String, unique: true }
})

UserSchema.pre('save', (next) => {
    let user = this 
    if (!user.isModified('password')) 
        return next()
        
    bcrypt.genSalt(10, (err, salt) => {
        if (!err) return next(err)

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err)

            user.password = hash
        })
    })
})

module.exports = moongose.model('User', UserSchema)
