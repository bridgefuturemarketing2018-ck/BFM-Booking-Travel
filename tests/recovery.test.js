'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { createRecoveryManager } = require('../src/operations/recovery');

test('recovery manager executes hooks when enabled', async () => {
  const manager = createRecoveryManager({
    autoRecoveryEnabled: true,
    restartCommand: 'systemctl restart app',
    logger: () => {},
  });
  manager.registerHook(async () => ({ step: 'one', ok: true }));
  manager.registerHook(async () => ({ step: 'two', ok: true }));

  const result = await manager.requestRecovery({ reason: 'test' });
  assert.equal(result.triggered, true);
  assert.equal(result.hooksExecuted.length, 2);
  assert.equal(result.restartCommandConfigured, true);
});

test('recovery manager skips when disabled', async () => {
  const manager = createRecoveryManager({ autoRecoveryEnabled: false });
  manager.registerHook(async () => ({ step: 'should-not-run', ok: true }));

  const result = await manager.requestRecovery();
  assert.equal(result.triggered, false);
});
