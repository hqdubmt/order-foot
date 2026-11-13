const { before, after, test } = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');

const app = require('../src/app');
const Roles = require('../src/constants/roles.Constants');
const setupTestServer = require('./helpers/testServer');

const server = setupTestServer({ before, after }, app);
const TEST_SECRET = 'rbac-test-secret';
const originalJwtSecret = process.env.JWT_SECRET;

before(() => {
    process.env.JWT_SECRET = TEST_SECRET;
});

after(() => {
    if (originalJwtSecret === undefined) {
        delete process.env.JWT_SECRET;
    } else {
        process.env.JWT_SECRET = originalJwtSecret;
    }
});

function createToken(role) {
    const encode = (value) => Buffer.from(JSON.stringify(value)).toString('base64url');
    const content = `${encode({ alg: 'HS256', typ: 'JWT' })}.${encode({
        sub: 'test-user',
        role,
        exp: Math.floor(Date.now() / 1000) + 60
    })}`;
    const signature = crypto
        .createHmac('sha256', TEST_SECRET)
        .update(content)
        .digest('base64url');

    return `${content}.${signature}`;
}

function requestAs(role, url, options = {}) {
    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            authorization: `Bearer ${createToken(role)}`
        }
    });
}

// GET - Lấy danh sách User
test('Lấy danh sách User thành công', async () => {
    const response = await requestAs(Roles.OWNER, `${server.baseUrl}/api/v1/users`);

    assert.equal(response.status, 200);
});

// GET - Lấy User theo ID
test('Lấy User theo ID', async () => {
    const response = await requestAs(Roles.OWNER, `${server.baseUrl}/api/v1/users/1`);

    assert.ok([200, 404].includes(response.status));
});

test('Lỗi user không tồn tại trả mã lỗi chuẩn', async () => {
    const response = await requestAs(Roles.OWNER, `${server.baseUrl}/api/v1/users/not-found`);
    const body = await response.json();

    assert.equal(response.status, 404);
    assert.equal(body.code, 404000);
});

test('Từ chối truy cập users khi chưa đăng nhập', async () => {
    const response = await fetch(`${server.baseUrl}/api/v1/users`);

    assert.equal(response.status, 401);
});

test('Từ chối customer xem danh sách users', async () => {
    const response = await requestAs(Roles.CUSTOMER, `${server.baseUrl}/api/v1/users`);
    const body = await response.json();

    assert.equal(response.status, 403);
    assert.equal(body.code, 403000);
});

// POST - Tạo User
test('Tạo User mới', async () => {
    const response = await requestAs(Roles.OWNER, `${server.baseUrl}/api/v1/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'Test User',
            email: `test-${Date.now()}@example.com`,
            password: 'Test123456'
        })
    });

    assert.ok([200, 201].includes(response.status));
});

// PUT - Cập nhật User
test('Cập nhật User', async () => {
    const response = await requestAs(Roles.OWNER, `${server.baseUrl}/api/v1/users/1`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'Updated User'
        })
    });

    assert.ok([200, 404].includes(response.status));
});

// DELETE - Xóa User
test('Xóa User', async () => {
    const response = await requestAs(Roles.OWNER, `${server.baseUrl}/api/v1/users/1`, {
        method: 'DELETE'
    });

    assert.ok([200, 204, 404].includes(response.status));
});