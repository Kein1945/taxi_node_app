const { app } = require('../app');
const request = require('supertest');

const api = async function(url, data) {
    const res = await request(app)
        .post(url)
        .type('json')
        .send(JSON.stringify(data))
        .expect(200)
    return res.body
}
exports.api = api;

const register_client = async function(name = 'John'){
    const res = await api('/client/register', {name})
    return res.token
}
exports.register_client = register_client;

const client_create_request = async function({from, to, token, date}){
    const res = await api('/client/request', {from, to, token, date})
    return res
}
exports.client_create_request = client_create_request;


const register_driver = async function(name = 'John', car = 'Broken'){
    const res = await api('/driver/register', {name, car})
    return res.token
}
exports.register_driver = register_driver;

const driver_position = async function({token, x, y}){
    const res = await api('/driver/position', {token, x, y})
    return res.success
}
exports.driver_position = driver_position;
