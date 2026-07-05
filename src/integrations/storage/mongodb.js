'use strict';

const { createProvider } = require('../provider-factory');

function createMongoStorageProvider(config) {
  const configured = Boolean(config.credentials.mongodbUri);
  return createProvider({
    name: 'mongodb',
    configured,
    actions: {
      save: async (payload) => ({ success: true, provider: 'mongodb', payload }),
    },
  });
}

module.exports = { createMongoStorageProvider };
