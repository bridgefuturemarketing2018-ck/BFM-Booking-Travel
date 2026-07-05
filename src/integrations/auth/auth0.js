'use strict';

const { createProvider } = require('../provider-factory');

function createAuth0Provider(config) {
  const configured = Boolean(
    config.credentials.auth0Domain && config.credentials.auth0ClientId && config.credentials.auth0ClientSecret,
  );
  return createProvider({
    name: 'auth0',
    configured,
    actions: {
      exchangeToken: async (payload) => ({ success: true, provider: 'auth0', payload }),
    },
  });
}

module.exports = { createAuth0Provider };
