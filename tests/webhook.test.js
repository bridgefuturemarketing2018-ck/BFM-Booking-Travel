'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { createWebhookHandler } = require('../src/webhooks/handler');

test('webhook handler returns normalized receipt', async () => {
  const handler = createWebhookHandler({ logger: () => {} });
  const result = await handler.handle({
    provider: 'stripe',
    event: { type: 'payment_intent.succeeded' },
  });

  assert.equal(result.received, true);
  assert.equal(result.provider, 'stripe');
  assert.equal(result.type, 'payment_intent.succeeded');
});
