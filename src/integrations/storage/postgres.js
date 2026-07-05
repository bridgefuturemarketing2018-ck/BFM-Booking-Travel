'use strict';

const { createProvider } = require('../provider-factory');

function createPostgresStorageProvider(config) {
  const configured = Boolean(config.credentials.postgresUrl);
  return createProvider({
    name: 'postgres',
    configured,
    actions: {
      save: async (payload) => ({ success: true, provider: 'postgres', payload }),
    },
  });
}

module.exports = { createPostgresStorageProvider };
