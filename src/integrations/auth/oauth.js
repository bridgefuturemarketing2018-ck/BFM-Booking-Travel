'use strict';

const { createProvider } = require('../provider-factory');

function createOAuthProvider(config) {
  const configured = Boolean(config.credentials.oauthClientId && config.credentials.oauthClientSecret);
  return createProvider({
    name: 'oauth',
    configured,
    actions: {
      exchangeToken: async (payload) => ({ success: true, provider: 'oauth', payload }),
    },
  });
}

module.exports = { createOAuthProvider };
