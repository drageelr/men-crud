'use strict'

// Dependancies
var jwt = require('../services/jwt');
var httpStatus = require('../services/http-status');
var customError = require('../errors/errors');
var User = require('../models/user.model');

exports.login = async (req, res, next) => {
    try {
        let params = req.body;

        let reqUser = await User.findOne({email: params.email, password: params.password});
        if (!reqUser) throw new customError.AuthenticationError("invalid username or password");

        let token = jwt.signUser(reqUser._id, '1h');

        res.json({
            statusCode: 200,
            statusName: httpStatus.getName(200),
            message: "Login Successful!",
            name: reqUser.name,
            token: token
        });
    } catch(e) {
        next(e);
    }
}

exports.changePassword = async (req, res, next) => {
    try {
        let params = req.body;

        let reqUser = await User.findById(params._id, 'password');
        if (reqUser.password != params.oldPassword) throw new customError.AuthenticationError("invalid oldPassword");

        await reqUser.update({password: params.newPassword});

        res.json({
            statusCode: 203,
            statusName: httpStatus.getName(203),
            message: "Password Changed Successfully!"
        });
    } catch(e) {
        next(e);
    }
}

exports.addUser = async (req, res, next) => {
    try {
        let params = req.body;

        if (await User.findOne({email: params.email})) throw new customError.DuplicateResourceError("user with email already exists");

        let newUser = new User({
            email: params.email,
            password: params.password,
            name: params.name
        });

        await newUser.save();

        res.json({
            statusCode: 203,
            statusName: httpStatus.getName(203),
            message: "Added User Successfully!"
        })
    } catch(e) {
        next(e);
    }
}

exports.delUser = async (req, res, next) => {
    try {
        let params = req.body;

        let reqUser = await User.findOne({email: params.email});
        if (!reqUser) throw new customError.NotFoundError("user with email not found");

        await reqUser.deleteOne();

        res.json({
            statusCode: 203,
            statusName: httpStatus.getName(203),
            message: "Deleted User Successfully!"
        })
    } catch(e) {
        next(e);
    }
}

exports.getUsers = async (req, res, next) => {
    try {
        let reqUsers = await User.find({}, 'email password name');
        
        let users = [];
        for (let i = 0; i < reqUsers.length; i++) {
            users.push({
                email: reqUsers[i].email,
                password: reqUsers[i].password,
                name: reqUsers[i].name
            });
        }

        res.json({
            statusCode: 200,
            statusName: httpStatus.getName(200),
            message: "Fetched User(s) Successfully!",
            users: users
        })
    } catch(e) {
        next(e);
    }
}

exports.defaultUser = async () => {
    let user = await User.findOne({});

    if(!user) {
        user = new User({
            email: "admin@mencrud.com",
            password: "Test12345",
            name: "Admin"
        })

        await user.save();

        console.log("Default User Created: admin@mencrud.com Test12345");
    } else {
        console.log("No need for default user!");
    }
}