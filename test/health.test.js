const { before, after, test } = require('node:test');
const assert = require('node:assert/strict');

const app = require('../src/app');
const setupTestServer = require('./helpers/testServer');

const server = setupTestServer({ before, after }, app);

test('Health API phải trả về OK', async () => {
    const response = await fetch(`${server.baseUrl}/api/v1`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.status, 'OK');
    assert.equal(body.code, 200000);
    assert.equal(body.description, 'Request completed successfully');
});

test('Swagger UI được phục vụ tại /api/docs', async () => {
    const response = await fetch(`${server.baseUrl}/api/docs`);
    const body = await response.text();

    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /text\/html/);
    assert.match(body, /Swagger UI/);
});

test('Swagger spec được phục vụ tại /api/docs.json', async () => {
    const response = await fetch(`${server.baseUrl}/api/docs.json`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.openapi, '3.0.3');
    assert.ok(body.paths['/users']);
});