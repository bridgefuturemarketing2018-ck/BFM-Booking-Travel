'use strict';

function createWebhookHandler({ logger = console.log } = {}) {
  async function handle({ provider, event }) {
    logger(`[webhook] provider=${provider} type=${event.type || 'unknown'}`);

    return {
      received: true,
      provider,
      type: event.type || 'unknown',
    };
  }

  return {
    handle,
  };
}

module.exports = {
  createWebhookHandler,
};
