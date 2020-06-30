'use strict'

// Dependancies
var jwt = require('jsonwebtoken');
var config = require('../config/config').vars;
var customError = require('../errors/errors');
var User = require('../models/user.model');

exports.signUser = (id, expiry) => {
    return jwt.sign({_id: id}, config.key, {expiresIn: expiry});
}

function decodeToken(token) {
    try {
        return jwt.verify(token, config.key);
    } catch(e) {
        return {err: e};
    }
}

exports.verfiyUser = async (req, res, next) => {
    try {
        console.log("hi");
        let token = req.get("Authorization");
        if (token) {
            token = token.substring(7);
        } else {
            throw new customError.ForbiddenAccessError("no token given");
        }

        let decodedObj = decodeToken(token);
        if(decodedObj.err) throw new customError.ForbiddenAccessError("invalid token");

        let reqUser = await User.findById(decodedObj._id);
        if (reqUser) {
            req.body._id = decodedObj._id;
        } else {
            throw new customError.ForbiddenAccessError("invalid token");
        }

        next();
    } catch(e) {
        next(e);
    }
}