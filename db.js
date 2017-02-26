const hash = require('hash.js');

let _clients = {};
let _requests = [];

exports.clients = () => _clients
exports.requests = (token) => _requests.filter( r => r.token === token)


const generate_user_hash = (seed) =>
    hash.sha256().update(seed).digest('hex');

exports.client_register = data => {
    const token = generate_user_hash(Date.now());
    _clients[token] = data;
    return token;
}

exports.client_exists = (token) =>
    typeof(_clients[token]) !== 'undefined';

exports.request_add = ({from, to, token, date}) =>
    _requests.push({from, to, token, date});
