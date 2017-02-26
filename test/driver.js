const test = require('tape');
const {api, register_driver, driver_position} = require('./api');


test('Driver', async t => {

    let res = null;
    const position = {
        x: 59.456123,
        y: 60.345123,
    };

    try{
        const token = await register_driver();
        t.equal(token.length, 32, 'Get token on registration')

        res = await api('/driver/position', {})
        t.equal(res.error, 'unknown token', 'Require user token on position update')

        res = await api('/driver/position', {token, x: position.x, y: position.y})
        t.equal(res.success, true, 'Can update position')
    } catch(e) {
        t.fail(e)
    }

    t.end()
});
