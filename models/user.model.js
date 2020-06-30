'use strict'

// Dependancies
var mongoose = require('mongoose');
const Schema = mongoose.Schema

// User Schema
const userSchema = new Schema({
    email: {
        type: String,
        unqiue: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);