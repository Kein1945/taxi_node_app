const { app } = require('../app');
const test = require('tape');
const request = require('supertest');
const moment = require('moment');

const api = (url, data) => {
    return request(app)
        .post(url)
        .send(JSON.stringify(data))
        .type('json')
}

test('Client', t => {
    const from = {
            x: 59.456123,
            y: 60.345123,
        },
        to = {
            x: 59.926123,
            y: 60.467123,
        }
    let token = null;
    api('/client/register', {name: 'John'})
    .end((err, res) => {
        if (err) throw err;
        token = res.body.token;
        t.equal(token.length, 64, 'Get token on registration')

        api('/client/request', {})
            .end((err, res) => {
                t.equal(res.body.error, 'unknown token', 'Require user token on request')
            });

        const immediate_request = {
            from, to, token,
        }

        api('/client/request', immediate_request)
            .end((err, res) => {
                t.equal(typeof(res.body.id), 'number', 'Can register immediate request')
            });

        const defered_request = {
            from, to, token,
            date: moment().add(1, 'minute'),
        }
        api('/client/request', defered_request)
            .end((err, res) => {
                t.equal(typeof(res.body.id), 'number', 'Can register defered request')
            });

        api('/client/requests', {token})
            .end((err, res) => {
                const requests = res.body
                t.same(requests.length, 2, 'Can retrive created requests')
                t.same(requests[0].from.x, immediate_request.from.x, 'Request position should be same')
                t.same(moment(requests[1].date).inspect(), defered_request.date.inspect(), 'Request date should be same')
            })
    });
    t.end()
});

// test.onFinish(() => process.exit(0));
