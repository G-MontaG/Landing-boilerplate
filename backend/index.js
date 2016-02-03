'use strict';

require('./db');
require('./models');
const path = require('path');
const Server = require('./server');
const server = new Server();

server.addNamespace('/', (req, res, next) => {
  res.status(404);

  var rootDir = path.join(__dirname, '../public');
  if (req.accepts('html')) {
    res.sendFile('404.html', {root: rootDir}, function (err) {
      if (err) {
        console.log(err);
        res.status(err.status).end();
      }
    });
  } else if (req.accepts('json')) {
    res.json({
      errors: [
        {message: 'Not found'}
      ]
    });
  }
});

server.run();