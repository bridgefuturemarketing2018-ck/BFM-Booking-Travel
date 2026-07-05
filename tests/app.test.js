'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { createApp } = require('../src/app');

test('createApp wires default providers and health status', async () => {
  const app = createApp({});

  assert.equal(app.integrations.payment.name, 'stripe');
  assert.equal(app.integrations.notification.name, 'sendgrid');
  assert.equal(app.integrations.storage.name, 'postgres');
  assert.equal(typeof app.recoveryManager.requestRecovery, 'function');
});

test('health endpoint responds with service status', async () => {
  const app = createApp({});
  await new Promise((resolve) => app.server.listen(0, '127.0.0.1', resolve));
  const address = app.server.address();

  try {
    const response = await fetch(`http://127.0.0.1:${address.port}/health`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.status, 'ok');
    assert.equal(body.service, 'bfm-booking-travel');
  } finally {
    await new Promise((resolve) => app.server.close(resolve));
  }
});

test('webhook endpoint rejects oversized payloads', async () => {
  const app = createApp({ WEBHOOK_MAX_BYTES: '10' });
  await new Promise((resolve) => app.server.listen(0, '127.0.0.1', resolve));
  const address = app.server.address();

  try {
    const response = await fetch(`http://127.0.0.1:${address.port}/webhooks/stripe`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ type: 'abcdefghijk' }),
    });

    assert.equal(response.status, 413);
  } finally {
    await new Promise((resolve) => app.server.close(resolve));
  }
});
