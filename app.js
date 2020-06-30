'use strict'

// Dependancies
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('./services/mongoose');
var { errorHandler } = require('./errors/errorhandler');
var userRouter = require('./routes/user.route');
var { defaultUser } = require('./controllers/user.controller');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/user', userRouter);

app.use(errorHandler);

mongoose.connect();

defaultUser();

module.exports = app;