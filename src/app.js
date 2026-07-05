'use strict';

const http = require('node:http');

const { configFromEnv } = require('./config');
const { createRestClient } = require('./clients/rest-client');
const { createPaymentProvider } = require('./integrations/payments');
const { createNotificationProvider } = require('./integrations/notifications');
const { createStorageProvider } = require('./integrations/storage');
const { createMediaProvider } = require('./integrations/media');
const { createMapsProvider } = require('./integrations/maps');
const { createAuthProvider } = require('./integrations/auth');
const { createWebhookHandler } = require('./webhooks/handler');
const { createRecoveryManager } = require('./operations/recovery');

function json(res, statusCode, payload) {
  res.writeHead(statusCode, { 'content-type': 'application/json' });
  res.end(JSON.stringify(payload));
}

function createApp(env = process.env) {
  const config = configFromEnv(env);
  const restClient = createRestClient(config.restClient);

  const integrations = {
    payment: createPaymentProvider(config),
    notification: createNotificationProvider(config),
    storage: createStorageProvider(config),
    media: createMediaProvider(config),
    maps: createMapsProvider(config),
    auth: createAuthProvider(config),
  };

  const webhookHandler = createWebhookHandler();
  const recoveryManager = createRecoveryManager(config.operations);
  recoveryManager.registerHook(async (context) => ({
    hook: 'default-ops-hook',
    acknowledged: true,
    context,
  }));

  const server = http.createServer(async (req, res) => {
    const requestUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

    if (req.method === 'GET' && requestUrl.pathname === '/health') {
      return json(res, 200, {
        status: 'ok',
        service: 'bfm-booking-travel',
        integrations: Object.fromEntries(
          Object.entries(integrations).map(([k, p]) => [k, { provider: p.name, configured: p.configured }]),
        ),
      });
    }

    if (req.method === 'POST' && requestUrl.pathname === '/operations/recover') {
      const result = await recoveryManager.requestRecovery({ reason: 'manual_trigger' });
      return json(res, 202, result);
    }

    if (req.method === 'POST' && requestUrl.pathname === '/callouts/ping') {
      if (!config.restClient.baseUrl) {
        return json(res, 400, { ok: false, message: 'EXTERNAL_API_BASE_URL is not configured' });
      }
      const result = await restClient.ping();
      return json(res, result.ok ? 200 : 502, result);
    }

    if (req.method === 'POST' && requestUrl.pathname.startsWith('/webhooks/')) {
      const provider = requestUrl.pathname.replace('/webhooks/', '');
      let body = '';
      let bodyTooLarge = false;
      let bodyBytes = 0;
      req.on('data', (chunk) => {
        if (bodyTooLarge) return;
        body += chunk;
        bodyBytes += chunk.length;
        if (bodyBytes > config.service.webhookMaxBytes) {
          bodyTooLarge = true;
          json(res, 413, { message: 'Payload too large' });
          req.destroy();
        }
      });
      req.on('end', async () => {
        if (bodyTooLarge) return;
        let parsed;
        try {
          parsed = body ? JSON.parse(body) : {};
        } catch (error) {
          console.error(`[webhook] invalid payload for provider=${provider}: ${error.message}`);
          return json(res, 400, { message: 'Invalid JSON payload' });
        }
        const result = await webhookHandler.handle({ provider, event: parsed });
        return json(res, 202, result);
      });
      return;
    }

    return json(res, 404, { message: 'Not found' });
  });

  return {
    server,
    config,
    integrations,
    recoveryManager,
    webhookHandler,
    restClient,
  };
}

module.exports = {
  createApp,
};
