'use strict';

/**
 * Module dependencies.
 */

const client = require('./app/controllers/client');
const driver = require('./app/controllers/driver');

/**
 * Expose
 */

module.exports = function (app) {

    app.post('/client/register', client.register);
    app.post('/client/requests', client.isAutenticated, client.requests);
    app.post('/client/request', client.isAutenticated, client.request);

    app.post('/driver/register', driver.register);
    app.post('/driver/position', driver.isAutenticated, driver.position);
    app.post('/driver/request', driver.isAutenticated, driver.request);

};
