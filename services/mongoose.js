'use strict'

// Dependancies
var mongoose = require('mongoose');
var config = require('../config/config').vars;


mongoose.connection.on('connected', () => {
    console.log('MongoDB is connected')
})

mongoose.connection.on('error', (err) => {
    console.log(`Could not connect to MongoDB because of ${err}`)
    process.exit(1)
})

exports.connect = () => {
    // Variables:
    var mongoURI = 'mongodb://localhost:27017/' + config.dbName;
  
    // Connect With Mongoose:
    mongoose.connect(mongoURI, {
        keepAlive: 1,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
  
    // Set Mongoose Options:
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true)
  
    // Return Mongoose Connection Object
    return mongoose.connection
}