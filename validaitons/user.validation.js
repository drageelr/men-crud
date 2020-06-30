'use strict'

// Dependancies
var Joi = require('@hapi/joi');

// API 1.1:
exports.login = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().regex(/[a-zA-Z0-9]/).min(8).max(30)
    })
};

// API 1.2:
exports.changePassword = {
    body: Joi.object({
        oldPassword: Joi.string().regex(/[a-zA-Z0-9]/).min(8).max(30),
        newPassword: Joi.string().regex(/[a-zA-Z0-9]/).min(8).max(30)
    })
};

// API 1.3:
exports.addUser = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().regex(/[a-zA-Z0-9]/).min(8).max(30),
        name: Joi.string().required()
    })
};

// API 1.4:
exports.delUser = {
    body: Joi.object({
        email: Joi.string().email().required(),
    })
};