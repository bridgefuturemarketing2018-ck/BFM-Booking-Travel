'use strict';

function createRecoveryManager({ restartCommand = '', autoRecoveryEnabled = true, logger = console.log } = {}) {
  const hooks = [];

  function registerHook(hook) {
    hooks.push(hook);
  }

  async function requestRecovery(context = {}) {
    if (!autoRecoveryEnabled) {
      return { triggered: false, reason: 'Auto recovery disabled' };
    }

    const results = [];
    for (const hook of hooks) {
      // hooks are injected extension points (e.g. PM2, Kubernetes, systemd, cloud runbook)
      // and intentionally provider-agnostic in this starter architecture.
      results.push(await hook(context));
    }

    if (restartCommand) {
      logger(`[recovery] restart command configured: ${restartCommand}`);
    }

    return {
      triggered: true,
      restartCommandConfigured: Boolean(restartCommand),
      hooksExecuted: results,
    };
  }

  return {
    registerHook,
    requestRecovery,
  };
}

module.exports = {
  createRecoveryManager,
};
