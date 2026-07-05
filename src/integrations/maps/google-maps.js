'use strict';

const { createProvider } = require('../provider-factory');

function createGoogleMapsProvider(config) {
  const configured = Boolean(config.credentials.googleMapsApiKey);
  return createProvider({
    name: 'google-maps',
    configured,
    actions: {
      geocode: async (payload) => ({ success: true, provider: 'google-maps', payload }),
    },
  });
}

module.exports = { createGoogleMapsProvider };
