'use strict';

const { createProvider } = require('../provider-factory');

function createFirebaseAuthProvider(config) {
  const configured = Boolean(config.credentials.firebaseAuthProjectId);
  return createProvider({
    name: 'firebase-auth',
    configured,
    actions: {
      verifyToken: async (payload) => ({ success: true, provider: 'firebase-auth', payload }),
    },
  });
}

module.exports = { createFirebaseAuthProvider };
