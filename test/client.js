const test = require('tape');
const moment = require('moment');

const {api, register_client, client_create_request} = require('./api');

test('Client', async t => {
    const from = {
            x: 59.456123,
            y: 60.345123,
        },
        to = {
            x: 59.926123,
            y: 60.467123,
        }
    let res = null;

    try {
        const token = await register_client();
        t.equal(token.length, 32, 'Get token on registration')

        res = await client_create_request({})
        t.equal(res.error, 'unknown token', 'Require user token on request')

        const immediate_request = {
            from, to, token,
        }
        res = await client_create_request(immediate_request)
        t.equal(typeof(res.id), 'number', 'Can register immediate request')

        const defered_request = {
            from, to, token,
            date: moment().add(1, 'minute'),
        }
        res = await client_create_request(defered_request)
        t.equal(typeof(res.id), 'number', 'Can register defered request')

        const requests = await api('/client/requests', {token})
        t.same(requests.length, 2, 'Can retrive created requests')
        t.same(requests[0].from.x, immediate_request.from.x, 'Request position should be same')
        t.same(moment(requests[1].date).inspect(), defered_request.date.inspect(), 'Request date should be same')
    } catch (e) {
        t.fail(e)
    }

    t.end()
});
