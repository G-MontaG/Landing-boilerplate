'use strict';

const _ = require('lodash');
const mongoose = require('mongoose');
const config = require('../config.json');

var dbName = process.env.DB_NAME || config.db.db;
var dbUser = process.env.DB_USER;
var dbPassword = process.env.DB_PASSWORD;
var dbHost = process.env.DB_HOST || config.db.host;
var dbPort = process.env.DB_PORT || config.db.port;

// connection string format: 'mongodb://username:password@localhost:27017/test';
var connectionString = [];
connectionString.push('mongodb://');
if (dbUser && dbPassword) {
  connectionString.push(dbUser + ':' + dbPassword + '@');
}
connectionString.push(dbHost + ':' + dbPort + '/' + dbName);
connectionString = connectionString.join('');

var dbOptions = {
  server: {
    auto_reconnect: true,
    socketOptions: {keepAlive: 30000, connectTimeoutMS: 0, socketTimeoutMS: 0}
  }
};

subscribeToMongoEvents(mongoose.connection);
var connection = mongoose.connect(connectionString, dbOptions);

function subscribeToMongoEvents(connection) {
  connection.on('connected', () => {
    console.log('Mongoose connected');
  });
  connection.on('open', () => {
    console.log('Mongoose connection opened');
  });
  connection.on('disconnecting', () => {
    console.log('Mongoose disconnecting');
  });
  connection.on('db: disconnected', () => {
    console.log('Mongoose disconnected');
  });
  connection.on('close', () => {
    console.log('Mongoose connection closed');
  });
  connection.on('reconnected', () => {
    console.log('Mongoose reconnected');
  });
  connection.on('error', (error) => {
    console.error(error.message);
  });
}