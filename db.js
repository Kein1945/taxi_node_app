const hash = require('md5');

let _clients = {};
let _drivers = {};
let _requests = [];

exports.clients = () => _clients
exports.drivers = () => _drivers
exports.requests = (token) => _requests.filter( r => r.token === token)


const generate_user_hash = (seed) =>
    hash(seed+Math.random());

exports.client_register = data => {
    const token = generate_user_hash(Date.now());
    _clients[token] = data;
    return token;
}

exports.client_exists = (token) =>
    typeof(_clients[token]) !== 'undefined';

exports.request_add = ({from, to, token, date, driver}) =>
    _requests.push({id: _requests.length, from, to, token, date, driver});


exports.driver_register = data => {
    const token = generate_user_hash(Date.now());
    _drivers[token] = data;
    return token;
}

exports.driver_exists = (token) =>
    typeof(_drivers[token]) !== 'undefined';

exports.driver_position = ({token, x, y}) => {
    _drivers = Object.assign({}, _drivers, {
        [token]: Object.assign({}, _drivers[token], {
            x, y,
        })
    })
}

// We can add here more complicated algorithm based on routes
const get_distance = (x, y, driver) => (
    Math.sqrt(
        Math.pow(Math.abs(x - driver.x), 2) +
        Math.pow(Math.abs(y - driver.y), 2)
    )
)

const is_driver_free = driver =>
    !driver.busy && !!driver.x && !!driver.y

exports.find_nearest_driver = ({x,y}) => {
    const drivers = [];
    for(token in _drivers) {
        if(_drivers.hasOwnProperty(token)) {
            const driver = _drivers[token];
            if(is_driver_free(driver)) {
                drivers.push(Object.assign({}, _drivers[token], {token}))
            }
        }
    }
    return drivers
        .sort ((d1, d2) =>
            get_distance(x, y, d1) - get_distance(x, y, d2)
        )
        .shift()
}
