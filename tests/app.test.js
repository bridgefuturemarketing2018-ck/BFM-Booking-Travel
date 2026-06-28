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
