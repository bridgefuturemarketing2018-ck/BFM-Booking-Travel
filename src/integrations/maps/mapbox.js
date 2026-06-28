'use strict';

const { createProvider } = require('../provider-factory');

function createMapboxProvider(config) {
  const configured = Boolean(config.credentials.mapboxToken);
  return createProvider({
    name: 'mapbox',
    configured,
    actions: {
      geocode: async (payload) => ({ success: true, provider: 'mapbox', payload }),
    },
  });
}

module.exports = { createMapboxProvider };
