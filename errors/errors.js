'use strict'

class AuthenticationError extends Error {
    constructor(errDetails) {
        super();
        this.name = "AuthenticationError";
        this.statusCode = 401;
        this.message = "Invalid Credentials!";
        this.details = errDetails;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this);
        }
    }
}

class ForbiddenAccessError extends Error {
    constructor(errDetails) {
        super();
        this.name = "ForbiddenAccessError";
        this.statusCode = 403;
        this.message = "Invalid Permission To Access Resource!";
        this.details = errDetails;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this);
        }
    }
}

class NotFoundError extends Error {
    constructor(errDetails) {
        super();
        this.name = "NotFoundError";
        this.statusCode = 401;
        this.message = "Resource Not Found!";
        this.details = errDetails;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this);
        }
    }
}

class DuplicateResourceError extends Error {
    constructor(errDetails) {
        super();
        this.name = "DuplicateResourceError";
        this.statusCode = 400;
        this.message = "Duplicate Resource Not Supported!";
        this.details = errDetails;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this);
        }
    }
}

module.exports.AuthenticationError = AuthenticationError;
module.exports.ForbiddenAccessError = ForbiddenAccessError;
module.exports.NotFoundError = NotFoundError;
module.exports.DuplicateResourceError = DuplicateResourceError;