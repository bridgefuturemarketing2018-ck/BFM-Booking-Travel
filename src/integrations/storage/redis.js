'use strict';

const { createProvider } = require('../provider-factory');

function createRedisStorageProvider(config) {
  const configured = Boolean(config.credentials.redisUrl);
  return createProvider({
    name: 'redis',
    configured,
    actions: {
      save: async (payload) => ({ success: true, provider: 'redis', payload }),
    },
  });
}

module.exports = { createRedisStorageProvider };
