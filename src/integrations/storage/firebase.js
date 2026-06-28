'use strict';

const { createProvider } = require('../provider-factory');

function createFirebaseStorageProvider(config) {
  const configured = Boolean(config.credentials.firebaseProjectId);
  return createProvider({
    name: 'firebase',
    configured,
    actions: {
      save: async (payload) => ({ success: true, provider: 'firebase', payload }),
    },
  });
}

module.exports = { createFirebaseStorageProvider };
