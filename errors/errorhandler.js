'use strict'

// Dependancies
var ValidationError = require('express-validation').ValidationError;
var customError = require('./errors');
var httpStatus = require('../services/http-status');

exports.errorHandler = (err, req, res, next) => {
    console.log(err);
    if (err instanceof customError.AuthenticationError ||
        err instanceof customError.ForbiddenAccessError ||
        err instanceof customError.NotFoundError ||
        err instanceof customError.DuplicateResourceError) {
        res.json({
            statusCode: err.statusCode,
            statusName: httpStatus.getName(err.statusCode),
            message: err.message,
            err: {
                name: err.name,
                details: err.details
            }
        });
    } else if (err instanceof ValidationError) {
        res.json({
            statusCode: 400,
            statusName: httpStatus.getName(400),
            message: "Request object validation failed!",
            error: {
                name: "ValidationError",
                details: err.details
            }
        });
    } else {
        res.json({
            statusCode: 500,
            statusName: httpStatus.getName(500),
            message: "Internal Server Error!"
        });
    }
}