const test = require('tape');
const moment = require('moment');

const {
    api,
    register_client,
    client_create_request,
    register_driver,
    driver_position,
} = require('./api');


test('Request', async t => {
    try {
        const client_token = await register_client();
        const eddi_driver = await register_driver('Eddi', 'Frod');
        const john_driver = await register_driver('John', 'Ford');
        const troy_driver = await register_driver('Troy', 'Mustang');
        await driver_position({token: eddi_driver, x: 5, y: 7})
        await driver_position({token: john_driver, x: 1, y: 1})
        await driver_position({token: troy_driver, x: 20, y: 20})

        const request = await client_create_request({
            from: {x: 1, y: 1},
            to: {x: 9, y: 9},
            token: client_token,
        })
        t.equal(request.driver.token, john_driver, 'Get nearest driver');

    } catch (e) {
        t.fail(e)
    }

    t.end()
});
