const db = require('../../db');
const moment = require('moment');

exports.register = function (req, res, next) {
    const {name} = req.body;
    res.json({
        token: db.client_register({name}),
    })
};

exports.isAutenticated = function (req, res, next) {
    const token = req.body.token
    if(!db.client_exists(token)) {
        res.json({
            error: 'unknown token'
        })
    } else {
        return next()
    }
}

exports.requests = function ({body:{token}}, res, next) {
    res.json(db.requests(token))
};

exports.request = function (req, res, next) {
    let {from, to, token, date} = req.body;

    const date_empty = !date,
        date_in_past = moment().diff(moment(date)) > 0;
    if(date_empty || date_in_past) {
        date = moment()
    }

    res.json({
        id: db.request_add({from, to, token, date}),
    })
};
