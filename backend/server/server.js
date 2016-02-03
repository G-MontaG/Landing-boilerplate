'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const config = require('../config.json');

class Server {
  constructor() {
    this._port = process.env.SERVER_PORT || config.port;
    this._server = express();
    this._init();
  }

  run() {
    this._server.listen(this._port, () => {
      console.log('Server started on port ' + this._port);
    });
  }

  addNamespace(namespace, router) {
    this._server.use(namespace, router);
  }

  _init() {
    this._server.use(bodyParser.urlencoded({extended: true}));
    this._server.use(bodyParser.json());
    this._server.use(compression());
    this._server.use('/', express.static(path.join(__dirname, '../../public')));
    this._server.disable('x-powered-by');
  }
}

module.exports = Server;