'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { configFromEnv } = require('../src/config');

test('configFromEnv loads provider selections and service defaults', () => {
  const config = configFromEnv({
    PORT: '4100',
    PAYMENT_PROVIDER: 'paystack',
    NOTIFICATION_PROVIDER: 'twilio',
    STORAGE_PROVIDER: 'mongodb',
  });

  assert.equal(config.service.port, 4100);
  assert.equal(config.providers.payment, 'paystack');
  assert.equal(config.providers.notification, 'twilio');
  assert.equal(config.providers.storage, 'mongodb');
});
