'use strict'

// Dependancies
var router = require('express').Router();
var validate = require('express-validation').validate;
var verifyUser = require('../services/jwt').verfiyUser;
var userController = require('../controllers/user.controller');
var userValidation = require('../validaitons/user.validation');

// API 1.1 Login:
router.post(
    '/login',
    validate(userValidation.login, { keyByField: true }),
    userController.login
);

// API 1.2 Change Password:
router.post(
    '/change-password',
    validate(userValidation.changePassword, { keyByField: true }),
    verifyUser,
    userController.changePassword
);

// API 1.3 Add User:
router.post(
    '/add',
    validate(userValidation.addUser, { keyByField: true }),
    verifyUser,
    userController.addUser
);

// API 1.4 Delete User:
router.post(
    '/del',
    validate(userValidation.delUser, { keyByField: true }),
    verifyUser,
    userController.delUser
);

// API 1.5 Get Users:
router.post(
    '/get',
    verifyUser,
    userController.getUsers
);

module.exports = router;