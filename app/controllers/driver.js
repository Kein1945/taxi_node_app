const db = require('../../db');
const moment = require('moment');

exports.register = function (req, res, next) {
    const {name, car} = req.body;
    res.json({
        token: db.driver_register({name, car}),
    })
};

exports.isAutenticated = function ({body: {token}}, res, next) {
    if(!db.driver_exists(token)) {
        res.json({
            error: 'unknown token'
        })
    } else {
        return next()
    }
}

exports.request = function ({body:{token}}, res, next) {
    res.json(db.requests(token))
};

exports.position = function ({body: {token, x, y}}, res, next) {
    db.driver_position({token, x, y})
    res.json({
        success: true,
    })
};
