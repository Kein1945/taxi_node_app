'use strict';

/**
 * Module dependencies.
 */

const client = require('./app/controllers/client');

/**
 * Expose
 */

module.exports = function (app) {

  app.post('/client/register', client.register);
  app.post('/client/requests', client.isAutenticated, client.requests);
  app.post('/client/request', client.isAutenticated, client.request);

};
